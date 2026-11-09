# T12 练习、错题本与学习进度验收报告 (Practice, Mistakes Notebook & Progress Acceptance)

- **任务编号**：T12（Phase 3 学习体验深化第二项核心里程碑）
- **执行时间**：2026-11-09
- **状态**：验收通过 (Passed)
- **范围限制**：只修改 `web/` 与新建 `docs/audit/T12-practice-acceptance.md`；严禁修改 `src/` 教材正文；严禁修改已 reviewed 的 19 章 113 节元数据与路径数据；严禁安装外部依赖；严格杜绝伪造练习数据或正确率。

---

## 1. 核心设计原则与准则核验

| 原则条目 | 规范要求 | 实际实现与验证 | 状态 |
|---|---|---|---|
| **真实数据闭环** | 标记做对/加入错题不再是占位 Toast，真实持久化 | 阅读页与练习页均直接调用 store actions，400ms 防抖持久化至 LocalStorage，页面刷新后完整保留 | ✅ 完全合规 |
| **可解释的间隔复习** | 简单清晰的递增复习规则，不引入黑盒 SM-2 复杂度 | 答错进队（+1 天）；重练做对按 1/3/7 天递增；连续 3 次做对或手动标记掌握彻底移出；普通做对不进队 | ✅ 完全合规 |
| **全覆盖与零造假** | 全书 34 章 698 道习题全部可用，未练题目诚实展示 0 | 准确对齐全书 34 章全部 698 道习题；空态与 0 进度诚实展示，拒绝任何模拟伪造的虚假做题记录 | ✅ 完全合规 |
| **极简学术视觉** | 纯净学术排版，杜绝花哨卡片与夸张渐变 | 延续学院派列表式排版，紧凑统计卡片、清晰复习状态徽章与标准 KaTeX 数学渲染公式 | ✅ 完全合规 |
| **键盘无障碍操作** | 章节练习支持全键盘快速操作 | 支持 `←`/`→` 快速切题、`1` 标记做对、`2` 加入错题、`Space` 展开/收起解析，兼顾纯键盘练习流 | ✅ 完全合规 |

---

## 2. 数据模型与存储架构 (Store v1 扩展)

在 `web/src/features/store/types.ts` 中基于 Schema v1 进行向后兼容扩展，定义强类型数据结构：

```ts
export type ExerciseStatus = 'unseen' | 'correct' | 'wrong';

export interface ExerciseRecord {
  status: ExerciseStatus;
  chapterId: string;
  number: number;
  attempts: number;
  lastAt: string;
}

export interface ReviewRecord {
  kind: 'exercise';
  exerciseId: string;
  chapterId: string;
  number: number;
  dueAt: string;
  intervalDays: number;
  correctStreak: number;
  lastAt: string;
}
```

### 存储健壮性与向后兼容设计 (`storage.ts`)
- **防御性清洗 (`sanitizeExercises` / `sanitizeReview`)**：在 `loadStore()` 时，如果 LocalStorage 中存在旧版本坏数据、类型不匹配或损坏记录，自动过滤剔除无效项，绝不抛出异常阻塞前端应用加载，更不破坏用户的阅读进度 (`progress`)、偏好设置 (`settings`) 与已选路径 (`path`)。
- **活动日志集成 (`activity`)**：每次做题或标记掌握均记录流水到 `activity`（类型为 `exercise`，detail 记录 `correct` / `wrong` / `mastered`）。

---

## 3. 自适应间隔复习规则 (Review Algorithm)

采用轻量、可预测的自适应递增复习模型：

```
               [练习题 / 阅读页习题]
                       |
         +-------------+-------------+
         |                           |
     [答对/掌握]                  [答错/加入错题]
         |                           |
    status='correct'            status='wrong'
    attempts + 1                attempts + 1
    (不进入复习队列)            correctStreak = 0, intervalDays = 1
                                dueAt = 当前时间 + 1 天
                                进入复习队列 (store.review)
                                     |
                                     v
                           [错题本 / 会话重做此题]
                                     |
                     +---------------+---------------+
                     |                               |
                 [重练答错]                      [重练答对]
                     |                               |
              correctStreak = 0              correctStreak += 1
              intervalDays = 1               intervalDays = [1, 3, 7][streak]
              dueAt = +1 天                  dueAt = +[1, 3, 7] 天
                                                     |
                                            +--------+--------+
                                            |                 |
                                      streak < 3         streak >= 3 或 标记掌握
                                            |                 |
                                        继续在队列       彻底移出复习队列与错题本
```

---

## 4. 功能与页面实现详情

### 4.1 阅读页章末习题改造 (`ReaderExercises.tsx`)
- 移除 Phase 3 占位 toast 与静态只读逻辑；
- 接入 `useStore()` 与 `markExercise`；
- 按钮状态实时联动：做对后高亮显示 `✓ 已做对`，做错后激活 `✕ 已在错题本`；
- 结合 `useToast()` 弹出即时反馈提示。

### 4.2 练习总览页 (`/practice` -> `PracticePage.tsx`)
- **全书习题大盘**：显示全书 34 章严格共有 **698 道习题**；
- **四维核心统计卡片**：全书总题数（698 题）、已练习数与覆盖率、当前错题记录数、今日到期待复习数；
- **错题本入口横幅**：快速显示当前错题概况，支持一键直达 `/practice/wrong`；
- **34 章练习卡片列表**：按 8 篇 34 章脉络展示各章题数、已练/正确统计、已练完徽章及“进入练习”入口。

### 4.3 章节演练会话页 (`/practice/:chapterId` -> `PracticeSessionPage.tsx`)
- **进度与定位**：顶部展示章节名称、当前题号/总题数进度条（如 `1 of 20`）；
- **公式与题干**：基于构建期预编译的 KaTeX HTML 渲染数学公式，无客户端二次编译卡顿；
- **解析折叠与展开**：默认折叠，支持按钮点击或按下 `Space` 展开详细推导与解答；
- **做题标记**：支持点击按钮或键盘快捷键 `1`（标记做对）、`2`（加入错题）；
- **全键盘切题**：支持 `←`（上一题）、`→`（下一题）、`Space`（展开解析），做完末题后引导前往错题本或返回目录；
- **URL Hash 定位**：支持深链直接锚定指定题目（如 `/practice/c01#c01-ex-3`）。

### 4.4 跨章错题本 (`/practice/wrong` -> `WrongBookPage.tsx`)
- **按章分组归集**：跨章聚合所有错题，按章节分组展示错误题号与详细信息；
- **复习状态指示**：标明到期状态（“今日待复习”红黄警示徽章 / “X 天复习周期”）；
- **操作能力**：
  - “重做此题”：带锚点深链直达对应章节演练模式；
  - “标记掌握”：连续做对达标或手动一键从错题本与复习队列移出；
  - “移出错题”：将该题重置为未练习状态并移出；
- **空态展示**：无错题时展示诚实友好的“错题本空空如也，状态极佳！”提示与去刷题入口。

### 4.5 学习进度与复习队列页 (`/progress` -> `ProgressPage.tsx`)
- **4 大核心 KPI 卡片**：
  1. 已学节数：`done / master` 知识点数 / 219 节（及总进度百分比）；
  2. 重点掌握：`master` 状态核心节数；
  3. 错题本题目：当前存留在错题本中的题目总数；
  4. 今日待复习：到期等待重新演练检验的题目数；
- **复习队列板块**：按 `dueAt` 升序排列展示最近 20 条待复习项目，提供连续正确次数（如 `1 / 3 次`）、到期状态及一键“练习”直达；空队列时友好提示；
- **全书 34 章节明细进度大表**：以表格化形式展现 34 章节名称、知识点完成度（含进度条）、习题练习题数、错题数，并提供“阅读”与“练习”直达链接。

### 4.6 首页联动 (`HomePage.tsx`)
- 今日面板“待复习”行从 Phase 3 占位文案升级为真实统计：动态展示今日到期题数与错题本总量，点击箭头直达 `/progress`；
- 今日面板“练习”行绑定真实练习数据：显示全书 698 题及已做题数，点击直达 `/practice`。

### 4.7 路由注册与导航 (`App.tsx` & `AppHeader.tsx`)
- 严格遵循路由优先级顺序：`/practice/wrong` 注册在 `/practice/:chapterId` 之前，避免路由参数误捕获；
- 顶栏主导航“练习”激活指向 `/practice`，“学习进度”激活指向 `/progress`。

---

## 5. 测试覆盖与验证结果

### 5.1 自动化测试执行结果

1. **Practice Store 单元测试 (`web/tests/practiceStore.test.tsx`)**：
   - `marks exercise correct: sets status, attempts, lastAt, logs activity, not in review` ✅
   - `marks exercise wrong: enters review queue with dueAt ~+1 day and correctStreak 0` ✅
   - `increments attempts on repeated marks` ✅
   - `handles review schedule: 1 day -> 3 days -> 7 days -> removed on 3rd correct` ✅
   - `resets streak to 0 and interval to 1 on review mistake` ✅
   - `markExerciseMastered removes from review and marks status correct` ✅
   - `removeWrongExercise sets status unseen and removes from review` ✅
   - `cleans up legacy and corrupted exercise/review records safely on load` ✅
   - **8/8 通过**。

2. **Practice & Progress 页面集成测试 (`web/tests/PracticePages.test.tsx`)**：
   - `PracticePage > renders 698 total exercises and chapter cards` ✅
   - `PracticeSessionPage > renders questions, toggles solution, marks correct and wrong, and navigates` ✅
   - `WrongBookPage > shows empty state when no wrong exercises` ✅
   - `WrongBookPage > renders wrong exercises, allows marking mastered and removing` ✅
   - `ProgressPage > renders zero state with 0 learned and empty review queue` ✅
   - `ProgressPage > renders real stats and due queue when store has progress & mistakes` ✅
   - `ReaderExercises > renders exercises and writes marks to store without placeholder toast` ✅
   - **7/7 通过**。

3. **全量前端测试 (`npm --prefix web run test`)**：
   - **16 个测试文件，92 项测试全部通过（0 失败，0 错误）**。

4. **全量内容与工具测试 (`npm run test:content`)**：
   - **5 个测试套件，58 项测试全部通过（0 失败，0 错误）**。

5. **生产打包构建 (`npm --prefix web run build`)**：
   - `tsc -b && vite build` 编译成功，**0 Error, 0 Warning**，输出代码块大小良好（CSS 43.95 kB, JS 352.75 kB）。

### 5.2 界面与交互截图

| 页面 / 场景 | 分辨率 | 截图产物 | 核心呈现要点 |
|---|---|---|---|
| **章节练习总览 (`/practice`)** | 1440×900 | `web/screenshots/practice-1440.png` | 698 道总题数、四维统计卡片、错题本入口横幅、34 章列表 |
| **章节演练会话 (`/practice/:chapterId`)** | 1440×900 | `web/screenshots/practice-session-1440.png` | 进度条、预编译 KaTeX 题干、展开解析、做对/加入错题与切题控制 |
| **跨章错题本 (`/practice/wrong`)** | 1440×900 | `web/screenshots/practice-wrong-1440.png` | 按章分组错题、连续答对进度、到期状态徽章、重做深链与标记掌握 |
| **学习进度与复习队列 (`/progress`)** | 1440×900 | `web/screenshots/progress-1440.png` | 4 大核心 KPI 指标卡、今日到期待复习队列、全书 34 章节明细进度大表 |

---

## 6. 已知限制与后续规划

1. **题目交互类型**：当前练习题以问答题与证明推导题为主，采用“学生自主思考 → 展开参考答案 → 自主评定做对/做错”的开放模式。在 Phase 4 中可进一步引入单选、多选与数值填空的自动批改组件。
2. **富文本笔记**：目前习题只记录了正确/错误与复习状态，草稿纸与自定义解题笔记字段预留于 `StoreV1.notes`，后续将在深化版本中开放错题解析备注功能。
3. **数据跨端同步**：当前练习记录与复习队列完全保存在本地浏览器 LocalStorage 中，提供最高级别的离线可用性与隐私保护；数据导出/导入与跨设备备份功能可按需进一步扩展。
