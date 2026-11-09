# T14 — 公式收藏、学习建议与搜索关联（Phase 4 体验增强）

## 1. 背景

- 阅读页公式可复制；`store.bookmarks.formulas` 已存在但未使用。
- 首页/路径页有推荐，但 `/progress` 没有“今天先做什么”的可解释建议。
- 搜索已有类型/章/P/D 过滤与历史；结果与知识关系未连接。

## 2. 目标

1. **公式收藏**：阅读页每个 display 公式可收藏/取消；`/bookmarks` 统一查看；持久化、可跳回原公式。
2. **学习建议**：`/progress` 增加“今日建议”卡，规则可解释：到期复习 → 错题重练 → 当前路径下一节 → 最近阅读下一节 → 从第一章开始；每条建议给出理由与直达链接。
3. **搜索关联**：搜索结果增加同节/相关知识 chips（来自 graph 或 metadata related），点击可搜索/跳转；不伪造关联。

## 3. 公式收藏

- 阅读页：对 `.equation[id]` 注入/渲染一个“☆ 收藏”按钮（不改变 T03 公式排版；可用 DOM 注入 + 事件委托）。
- 点击：`toggleFormulaBookmark(id)`；已收藏显示“★ 已收藏”；toast；刷新保留。
- 从 T03 HTML 的 `.equation[id]` 取公式 ID；不客户端跑 KaTeX。
- `/bookmarks` 页面：
  - Tab：公式 / 节；
  - 公式列表：按章分组，显示公式编号（tag/ID）、所在节、LaTeX 源码 `<code>`（纯文本，不渲染）、收藏时间（可选）、跳转 `/learn/{chapter}#{equationId}`；
  - 节书签：使用 `bookmarks.sections`；若暂无节收藏入口，可只展示为空态，或补阅读页节收藏按钮（可选）。
  - 空态诚实。
- store：`toggleFormulaBookmark(id)`、`toggleSectionBookmark(id)`；`bookmarks.formulas/sections` 去重；旧数据清洗。
- 入口：顶栏“学习进度”下方不加新导航；在 `/progress` 增加“公式收藏”入口；阅读页工具栏加“收藏公式”图标可选。

## 4. 学习建议（规则式、可解释）

在 `/progress` 顶部增加“今日建议”卡：

1. `review` 中 dueAt <= now 的数量 > 0 → “先复习 N 道到期错题”，理由“间隔复习到期”，链接 `/practice/wrong`；
2. 否则错题数 >0 → “重练 N 道错题”，链接 `/practice/wrong`；
3. 否则当前路径（store.path.active 非 free）有下一未完成节 → “继续 [路径名]：{节}”，理由“当前路径下一步”；
4. 否则 lastLocation 有下一节/当前章未完成 → “继续上次位置”；
5. 否则进度为 0 → “从第 1 章开始”；
6. 否则“全书已学完，复习巩固”。
- 建议卡只做推荐，不限制访问；每条有“开始 →”。
- 需要加载 paths/book 数据；失败时降级到最后阅读/第一章，不阻塞进度页。

## 5. 搜索关联

- 搜索结果卡片下增加最多 2 个“相关：{节号} {标题}” chips：
  - 数据来源：T09 graph 的 `relatedEdges`（按 sectionId 查），无则不显示；
  - 点击跳到 `/learn/{chapterId}#{sectionId}`；
  - 不显示未标注章的假 D/P。
- 搜索页懒加载 graph 数据失败时静默隐藏，不影响搜索。
- 相关 chips 不得使用用户输入拼接 HTML。

## 6. 测试

- store：公式收藏 toggle/去重/持久化/旧数据清洗；建议规则单元测试（due/错题/路径/lastLocation/空）。
- Reader：公式收藏按钮状态、toast、localStorage；刷新恢复。
- `/bookmarks`：公式分组、跳转、取消收藏、空态。
- `/progress`：建议卡的 5 种分支与链接。
- 搜索：相关 chips 出现/点击/失败降级。
- 既有 110 Web + 58 内容测试不回归；build 0。

## 7. 约束

- 只改 `web/` 与必要 `tools/content/`；不改 `src/` 教材、metadata、paths。
- 不安装新依赖；公式仍构建期 KaTeX；bookmarks 页不客户端渲染 KaTeX。
- 不伪造知识关联；不把建议做成强制门禁。
- 数据仍只存本机；导出/导入需包含 bookmarks。

## 8. 验收

1. 阅读页公式可收藏/取消，刷新保留；/bookmarks 可查看/跳转。
2. /progress 今日建议在 5 种状态下正确且可解释。
3. 搜索相关 chips 来自真实 graph，点击正确；无数据时不显示。
4. 导出/导入仍包含 bookmarks（T13 已导出全 store）。
5. build/test/截图；报告已知限制。
