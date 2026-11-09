# T11 学习路径（A/B/C/D）验收报告 (Learning Paths Acceptance)

- **任务编号**：T11（Phase 3 学习体验深化首项里程碑）
- **执行时间**：2026-11-09
- **状态**：验收通过 (Passed)
- **范围限制**：只修改 `content/paths/`、`tools/content/`、`web/`、`docs/audit/`；未修改 `src/` 教材正文；未伪造未标注章的难度与优先级；未引入新依赖；不做内容门禁或章节锁定。

---

## 1. 核心设计原则与准则核验

| 原则条目 | 规范要求 | 实际实现与验证 | 状态 |
|---|---|---|---|
| **无内容门禁** | 绝不锁定、隐藏或限制全书任何章节 | 全书 34 章 219 节在任何时候均可通过 `/syllabus` 或正文任意阅读，路径仅改变推荐顺序与节奏 | ✅ 完全合规 |
| **诚实标注** | 未标注章绝不伪造 D/P 数据 | 周计划中未标注章节的节（C19–C32、C34）统一展示浅灰斜体“标注完善中”徽章，不编造 D/P | ✅ 完全合规 |
| **进度无损迁移** | 切换主路径不丢失任何既有进度 | 用户在任意路径间切换时，本地 `store.progress` 状态（done / master）永久保留并重新按新路径拓扑折算百分比 | ✅ 完全合规 |
| **自适应推荐** | 首页与路径详情动态推荐下一节 | 优先匹配当前主路径的第一未完成节；路径学完或自由模式时智能回退到 `lastLocation` 与全书线性顺序 | ✅ 完全合规 |
| **视觉严谨度** | 学术列表式排版，拒绝花哨渐变与大色块卡片 | 继承学院派极简排版，清晰周次卡片、紧凑元信息、可展开折叠周计划与阶段里程碑（Checkpoints） | ✅ 完全合规 |

---

## 2. 路径规模与结构统计

4 条学习路径定义于 `content/paths/paths.json`，由构建工具 `tools/content/build-paths.mjs` 全面校验并同步输出到 `content/generated/site/paths.json` 和 `web/public/content/paths.json`：

| 路径标识 | 代号 | 路径名称 | 周期规划 | 知识点覆盖 | 预计总学时 | 阶段里程碑 (Checkpoints) | 核心定位与适配对象 |
|---|---|---|---|---|---|---|---|
| `internship` | **A** | **量化实习冲刺** | **8 周** | **56 节** (精选) | **约 44 小时** (2,640 分钟) | **2 处**（第 4 周、第 8 周） | 针对 2027 量化实习/校招面试，优先概率论、线性代数地基、凸优化与 CLT 核心防线；非必要证明后置 |
| `progression` | **B** | **系统数学进阶** | **20 周** | **219 节** (严格全量) | **约 164 小时** (9,855 分钟) | **4 处**（第 5、10、15、20 周） | 按教材 8 篇 34 章顺序系统精读，完整覆盖全书 219 节无重复、无遗漏，适合宽客系统深造 |
| `research` | **C** | **量化研究应用** | **14 周** | **98 节** (精选) | **约 75 小时** (4,495 分钟) | **3 处**（第 4、9、14 周） | 以因子研究、组合优化、时序建模、风险度量与定价为导向，由应用逆向补齐数学先修闭包 |
| `free` | **D** | **自由学习模式** | **自由节奏** | **219 节** (全书) | 自主掌握 | 无固定 | 无固定周任务，首页“今日”面板按最近一次阅读记录智能衔接，适合自主跳读与查阅 |

---

## 3. 功能实现与交付明细

### 3.1 数据层与构建工具
1. **数据源定义**：`content/paths/paths.json` 包含严谨的 4 条路径元数据、周目标、成果说明（outcome）、预计用时与节 ID 清单。
2. **构建与校验器 (`tools/content/build-paths.mjs`)**：
   - 检验 `paths.json` 是否包含且仅包含 A/B/C/D 四条规范路径；
   - 校验所有 `sectionIds` 必须真实存在于 `book.json`，杜绝任何未知或悬空节 ID；
   - 严格断言路径 B 的去重覆盖集合与 `book.json` 的 219 节完全恒等（219 节无重复、无遗漏）；
   - 校验 `checkpoints` 结构与 `afterWeek` 合法性；
   - 生产同步：构建时自动同步至 `content/generated/site/paths.json` 与 `web/public/content/paths.json`；
   - npm 脚本注册：`npm run content:paths`。
3. **构建单元测试 (`tools/content/build-paths.test.mjs`)**：
   - 包含 6 项自动化测试，覆盖结构合法性、全量覆盖度、不存在 ID 注入报错检测等，测试全部通过（6/6 pass）。

### 3.2 前端页面与交互实现
1. **路径数据加载与向后兼容 (`web/src/features/paths/loadPaths.ts`)**：
   - 支持浏览器内存缓存与并发请求去重；
   - 提供 `normalizePathId` 与 `canonicalToLegacyPathCode`，向后兼容旧 localStorage 中的 `'a' | 'b' | 'c' | 'free'`；
   - 导出 `getPathSectionIds` 辅助函数安全提取周计划各节 ID。
2. **状态管理扩展 (`web/src/features/store/store.tsx`)**：
   - 扩展 context 暴露 `setActivePath(pathId: string)`；
   - 兼容切换任意模式，保留 400ms 防抖持久化与无痕模式安全容错。
3. **学习路径总览页 (`/paths` -> `web/src/routes/PathsPage.tsx`)**：
   - 顶部核心原则提示栏：明确“路径仅决定推荐顺序，绝不做内容门禁或章节锁定”；
   - 4 张学术风格卡片展示路径代号、周期、学时、节数、适合对象与动态计算的学习进度条；
   - 支持一键“设为主路径”，当前激活主路径高亮并展示“当前进行中”徽章；
   - 提供“查看周计划与推荐 →”跳转入口。
4. **学习路径详情页 (`/paths/:mode` -> `web/src/routes/PathDetailPage.tsx`)**：
   - 顶栏路径信息与“设为当前主路径”操作（配合 Toast 提示反馈）；
   - **自适应“推荐下一节”区块**：动态定位当前周次，展示推荐学习节编号、标题、章归属、学时与难度/优先级（未标注章展示“标注完善中”），提供直达阅读页的“立即开始学习 →”深链按钮；
   - **周计划时间线（Weeks Timeline）**：支持一键展开/折叠全部周，展示每周主题、预期掌握成果（outcome）、预计学时与节列表；每节展示状态（已学/待学）、序号、标题、难度徽章、用时估算及进入阅读页链接；
   - **阶段复盘里程碑（Checkpoints）**：展示关键周期节点后的复盘建议与重点自测节列表。
5. **首页学习路径区块与“今日”推荐升级 (`web/src/routes/HomePage.tsx`)**：
   - 将原静态占位升级为 4 条真实路径网格卡片，当前主路径边框高亮并标注“当前主路径”徽章；
   - “今日”面板的“下一节”升级为：**优先推荐当前激活路径的下一未完成节**（带路径来源标识，如 `[量化实习冲刺] · 预计 35 分钟 · P0`）；路径完成或自由模式下自动回退到 `lastLocation` 与全书线性顺序。

---

## 4. 自动化测试与构建验收验证

### 4.1 内容端测试 (`npm run test:content`)
```bash
> quant-math-textbook@1.0.0 test:content
> node --test tools/content/*.test.mjs

# tests 58
# suites 5
# pass 58
# fail 0
# duration_ms 62592.06
```
- **T11 专属测试套件**：6 项全部通过（产物存在性、路径 A/B/C/D 结构、路径 B 219 节全量覆盖、错误 ID 注入拦截）。
- **T01/T02/T03/T08/T09 既有套件**：52 项全部通过，0 冲突。

### 4.2 Web 端单元测试 (`npm --prefix web run test`)
```bash
> quant-math-academy-web@1.0.0 test
> vitest run

 Test Files  14 passed (14)
      Tests  77 passed (77)
   Duration  124.65s
```
- **`PathsPage.test.tsx` (3 tests)**：4 卡渲染、学术列表布局、主路径切换、完成进度计算。
- **`PathDetailPage.test.tsx` (4 tests)**：实习冲刺路径详情与 Checkpoints 渲染、切换主路径无损保留进度、未标注章“标注完善中”诚实标签、不存在路径兜底回退。
- **`HomePage.test.tsx` (4 tests)**：新增 4 条真实路径渲染及主路径高亮断言。
- 既有 ReaderPage (11 tests)、GraphPage (7 tests)、SearchPage (7 tests)、SyllabusPage (4 tests) 全量通过。

### 4.3 生产构建与 TypeScript 检查 (`npm --prefix web run build`)
```bash
> quant-math-academy-web@1.0.0 build
> tsc -b && vite build

vite v6.4.5 building for production...
✓ 78 modules transformed.
dist/index.html                   1.26 kB │ gzip:  0.62 kB
dist/assets/index-CizgdWF8.css   43.95 kB │ gzip:  8.44 kB
dist/assets/index-DtuPgogI.js   313.86 kB │ gzip: 97.63 kB
✓ built in 5.09s
```
- TypeScript 类型检查：**0 error**（已补全 `BookSectionItem` 继承并清理无用引用）。
- 打包产物无异常，CSS 43.95 KB，JS 313.86 KB。

---

## 5. 真实环境截图验证

通过无头 Chrome CDP（1440×1200 视口）在生产预览环境拍摄截图：
1. **`web/screenshots/paths-1440.png` (201.8 KB)**：
   - `/paths` 路径总览页，展示核心原则声明框、4 条路径学术卡片、进度条及“设为主路径”按钮。
2. **`web/screenshots/paths-internship-1440.png` (166.7 KB)**：
   - `/paths/internship` 实习冲刺详情页，展示 8 周/56 节/约 44 小时概览、自适应“推荐下一节”高亮卡片、学习原则、周计划折叠列表与 Checkpoints 检查点卡片。

---

## 6. 已知限制与后续规划

1. **未标注章节的显示说明**：
   - 当前全书 34 章中已评审标注 19 章（113 节），剩余 15 章元数据在完善中。路径计划按原书大纲编排，对未标注章节严格展示“标注完善中”，预计用时与难度暂不计入或按章节均值预估；待后续 Batch 完成后自动补全。
2. **Phase 3 后续规划衔接**：
   - T12 练习题与解答系统（698 题关联与错题本）；
   - T13 学习统计与本地数据导入/导出（JSON Backup & Restore）。
