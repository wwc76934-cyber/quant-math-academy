# T05 — 阅读页：三栏布局、数学正文、标注、进度与响应式

## 1. 任务定位

实现 Phase 1 的核心页面：`/learn/:chapterId`。它必须让四个试点章（C01、C08、C11、C33）在桌面与移动端都达到“显著优于 PDF”的阅读体验，并完成阅读位置、学习状态、主题与版式偏好的闭环。

执行者：AGY。验收者：DSH。

## 2. 输入

- T03 产出：`content/generated/site/book.json`、`chapters/cXX.json`（HTML 片段、环境索引、公式索引、习题）。
- T04 产出：Web 基座、设计系统、全局壳、store、内容加载器。
- `docs/design/DESIGN_SYSTEM.md`、`design/prototype/reader.html` 与 `styles.css`。
- `docs/product/INFORMATION_ARCHITECTURE.md` 第 3.3 节。

## 3. 路由与数据

- 路由：`/learn/:chapterId`，节/环境用 hash：`#c11-s4`、`#c11-thm-11.10`。
- 只允许 `book.json.pilotChapterIds` 进入正文；其他章显示“内容接入中”页（带返回目录）。
- 数据：`loadChapter(chapterId)`；`book.json` 用于左栏完整目录。
- 加载态：标题 + 骨架段落；错误态：说明 + 重试 + 返回目录；不渲染半截正文。

## 4. 页面结构

### 4.1 顶栏与子导航

- 全局 `AppHeader`（56px）保留。
- 阅读子导航（44px，sticky，top:56px）：
  - 面包屑：`教材 / 第 11 章`。
  - 章标题（单行省略）。
  - 本章进度条（2px，按已学习/已掌握节数计算）。
  - 控件：字号、宽度、专注、主题、上一章/下一章。
- 移动端：子导航只保留返回目录、章标题与“Aa”；其余进抽屉。

### 4.2 三栏

- ≥1280px：`264px / minmax(0,1fr) / 272px`，gap 48，内容最大宽 1440，padding 32。
- 1024–1279px：左栏 232 + 正文；右栏收进抽屉。
- <1024px：单栏；左栏/右栏为抽屉。
- 正文列 `max-width: 720px`，居中；`min-width:0`。
- 侧栏 sticky：`top:116px`，`max-height:calc(100vh-136px)`，细滚动条。

### 4.3 左栏：全书目录

- 篇 → 章 → 节；篇可折叠，默认展开当前篇。
- 当前章高亮；当前节左侧 2px 强调线 + 浅底。
- 状态点：未开始/学习中/已学习/已掌握/需复习，6px。
- 试点章可点击；非试点章显示“内容接入中”，不可进入。
- 点击节：滚动到目标并更新 hash；不整页刷新。
- 目录滚动到当前节可见；不自动折叠用户手动展开的篇。

### 4.4 中栏：章与正文

章首：

- kicker：`第 11 章`；h1 章标题；导言（若有 `introHtml`）；元信息：节数、预计总时长（节 meta 求和，缺失则“— ”）、P0 数、所属篇。
- 导言富文本用 `dangerouslySetInnerHTML`，样式与正文一致。

节：

- `<h2 id="c11-s4" data-section-id="c11-s4">`：节号（sans 12px，muted）+ 标题（serif 28px）。
- 节正文 HTML 来自 T03，直接注入；不得在客户端重新解析 Markdown。
- 节末尾可选一行“本节信息”移动端入口（桌面右栏已有）。
- 节与节之间 64px 留白；不插入广告/推荐。

本章小结：

- 特殊节，渲染 `summaryHtml`；不设学习状态；样式与正文一致，可加“小结”kicker。

习题：

- `## 习题` 标题；题卡列表。
- 每题：题号（sans 12px）、题干 HTML、操作行。
- 解析：`<details class="exercise__solution">` 或按钮展开；默认折叠；展开后完整 HTML。
- 操作：展开解析、标记做对、标记做错、收藏（Phase 3 前可只做“展开解析”；其余按钮禁用并说明“Phase 3 开放”）。不要伪装已保存。
- 章末：上一章/下一章；返回目录。

### 4.5 右栏：本页目录与本节信息

本页目录：

- 本章所有一级节 + 当前节的二级节；滚动高亮；点击滚动。
- 当前项左侧 2px 强调线；不改变字重。

本节信息（随当前节更新）：

- D/P 徽标；预计时间；高频；学习状态；练习数。
- 学习目标（meta.learningObjective）。
- 先修：required/helpful；显示状态点；试点章可跳转，非试点禁用。
- 相关：最多 6 条；可跳转。
- 量化应用：1–4 条。
- “为什么这样标注”：折叠显示 rationale；无 meta 时显示“标注完善中”，不显示假徽标。

### 4.6 移动端

- 子导航：返回目录、章标题、Aa。
- 正文单栏；标题 30px；正文 17px；左右 padding 20px。
- 左栏/右栏：全屏抽屉，焦点陷阱，Esc 关闭，关闭后焦点回触发按钮。
- 底部固定操作栏：标记状态 / 上一节 / 下一节；高度 44px；`env(safe-area-inset-bottom)`；正文底部留 84px。
- 公式横向滚动，页面不横向滚动。
- 表格外层横向滚动。

## 5. 正文样式（按 T03 输出）

必须覆盖并风格化：

- `.env--definition`：左侧 2px `--line-strong`，padding-left 20px。
- `.env--theorem`：`--bg-subtle` 底、1px 边框、左侧 3px `--ink`、padding 20/24；深色下左边线改 `--ink-secondary`。
- `.env--example`：上横线 1px，padding-top 18px；标签“例”强调色。
- `.env--note`：左侧虚线，16px，次要色。
- `.proof`（`<details>`）：左侧虚线；`summary` 无默认 marker，显示“证明”+ 展开/收起指示；`[open]` 显示 body；QED 右对齐。
- `.proof-note`：证明思路/说明，弱化样式，不与正式证明混淆。
- `.solution`：例题内的解，无卡片，标签“解”。
- `.equation`：grid `1fr auto`；公式体居中，编号右对齐；横向滚动；悬停显示复制按钮（可用 CSS + 事件委托）。
- `.math-inline`：不抬高行距。
- `.table-wrap`：横向滚动；表格线细，表头 `--bg-subtle`。
- `.section-rule`：细分隔线。

## 6. 交互

### 6.1 阅读位置

- 首次进入：
  - 有 hash → 滚动到目标（环境/节），高亮 1.5 秒。
  - 无 hash 但有 `lastLocation` 且同章 → 滚动到上次节 + 偏移。
  - 否则章首。
- 滚动时：
  - IntersectionObserver 更新当前节与右栏目录；
  - 节流 500ms 保存 `lastLocation`（章、节、offsetRatio）与 `progress[sectionId].lastReadAt`；
  - 用 `history.replaceState` 更新 hash 到当前节，不产生历史记录。
- 切换到其他章：不保留滚动位置，从章首开始。

### 6.2 学习状态

- 5 态：未开始、学习中、已学习、已掌握、需要复习。
- 状态菜单（按钮 + popover）：
  - 键盘可达，`aria-expanded`；选择后关闭，toast 宣告。
  - 写入 store；更新左栏状态点、章进度、首页统计（T04 读取）。
  - 不因滚动/停留自动改“已学习/已掌握”。
- 首次进入某节 30 秒且状态为“未开始”：显示一条非模态提示“标记为学习中？”，可关闭，本会话不重复。
- “已学习/已掌握”的定义在菜单中用一句话说明。

### 6.3 复制

- 环境标签右侧 `#`：复制 `origin + pathname + '#' + id`；toast“已复制链接”。
- 公式编号/悬停按钮：复制 `data-latex`；toast“已复制 LaTeX”。
- 章标题右侧“复制本章链接”。
- 使用 `navigator.clipboard`；失败时回退 `document.execCommand('copy')`（可选），并提示手动复制。

### 6.4 阅读偏好

- 字号 4 档：16/17/18/20px（移动 16/17/18/19）；写入 store，刷新保留。
- 宽度 3 档：30/34/40em；移动不生效（单栏）。
- 专注模式：隐藏左右栏，正文居中；`Esc`/`f` 退出。
- 证明默认：展开/折叠；进入章节时应用；用户手动切换不写回默认（除非在设置中改）。
- 主题：浅/深/跟随系统；无白闪。

### 6.5 键盘

- `[` / `]` 上一节/下一节。
- `f` 专注模式。
- `t` 主题切换。
- `/` 搜索（Phase 2 前显示“搜索将在 Phase 2 开放”toast）。
- `?` 快捷键帮助。
- `Esc` 关闭浮层/抽屉/帮助。
- 输入框、textarea、contenteditable 内不触发。

## 7. Store 扩展

在 T04 基础上实现：

```ts
progress: Record<SectionId, {
  status: 'unseen'|'learning'|'learned'|'mastered'|'needs_review';
  lastReadAt?: string;
  scrollOffset?: number;
  statusChangedAt?: string;
}>;

lastLocation?: { chapterId: string; sectionId: string; at: string };

activity: Array<{ at: string; type: 'status'|'read'|'copy'; targetId: string; detail?: string }>;
```

- 状态变更写入 `activity`（最近 200 条，超出裁剪）。
- 章进度 = 该章状态为 `learned|mastered` 的节数 / 总节数。
- 总进度 = 所有试点章（Phase 1）或全书（后续）的已学/已掌握节数 / 总节数。
- 写入防抖 400ms；页面隐藏 flush。
- 存储不可用时顶部提示，不阻塞阅读。

## 8. 可访问性

- 语义化：`main`、`article`、`nav`、`aside`、`h1/h2/h3` 不跳级。
- 跳转链接；焦点可见；抽屉焦点陷阱；`aria-current`；`details/summary` 原生键盘。
- 公式 KaTeX MathML；行内公式不破坏朗读。
- 表格 `aria-label`/caption（如有）。
- 触摸目标 ≥44px（移动端）。
- 对比度、reduced motion 按设计系统。

## 9. 性能

- 章节 JSON 按路由懒加载；模块级缓存。
- 正文 HTML 用 `React.memo` / `useMemo`；状态变化不重渲染整章。
- 事件委托处理复制/公式按钮；不为每个公式挂 React 事件。
- IntersectionObserver + 节流；滚动监听 passive。
- 首屏正文 ≤1.5s（本地）；无长任务 >100ms。
- 移动端 390px 无横向滚动。

## 10. 测试

- 渲染 C11：章标题、节标题、定理/证明/例题、公式、习题、解析折叠。
- 深链 `#c11-thm-11.10`：目标存在并成为当前节。
- 状态切换：写入 store、刷新恢复、章进度更新。
- 阅读位置：滚动后保存、刷新恢复（可用 mock IntersectionObserver）。
- 主题/字号/宽度/专注：持久化。
- 复制：mock clipboard，断言内容。
- 移动抽屉：打开/关闭/Esc/焦点回归。
- 键盘快捷键：`[`/`]`/`f`/`t`；输入框内不触发。
- 非试点章：显示“内容接入中”，不请求章节 JSON。
- `npm --prefix web run build` + `test` 通过。

## 11. 视觉验收

对照 `design/prototype/reader.html`、`reader-dark.html`：

- 1440×900：三栏；正文 680–720px；首屏≥18 行正文；左右栏不与正文争夺。
- 1280：三栏不拥挤；1024：右栏收起；390：单栏、标题换行、底部栏不遮操作。
- 定义/定理/证明/例题/解/注记可一眼区分，不花哨。
- 公式编号右对齐；长公式不撑破布局；行内公式不抬高行距。
- 深色下定理卡片、公式、表格对比足够。
- 无渐变、玻璃拟态、彩色卡片、emoji 图标。
- 打印阅读页：隐藏导航/按钮，保留正文与公式。

## 12. 明确不做

- 不做搜索索引/搜索页（Phase 2）。
- 不做学习路径、练习状态、错题本、笔记、复习（Phase 3）。
- 不做分步推导/可视化（Phase 4）。
- 不修改 `src/`、`content/`、`tools/content/`。
- 不新增 UI 库/图标库/字体包。

## 13. 验收标准

1. 4 个试点章全部可读；正文/公式/习题/解析完整；无 KaTeX 错误。
2. 三栏/两栏/单栏布局正确；1440、1280、1024、390 无横向滚动。
3. 深链、上一节/下一节、目录高亮、继续阅读可用。
4. 学习状态、阅读位置、主题、字号、宽度、专注模式刷新后保留。
5. 复制链接/公式可用；toast 反馈。
6. 键盘与移动抽屉可用；焦点管理正确。
7. 测试与构建通过。
8. 视觉对照原型通过；无禁止项。

## 14. 交付报告

- 新增/修改文件。
- 运行命令与结果（build/test）。
- 1440/1024/390 截图路径。
- 与原型/设计系统的差异及理由。
- 已知问题、性能数据（首屏、包体积、长任务）。
- 是否修改过 `src/`（必须是“否”）。
