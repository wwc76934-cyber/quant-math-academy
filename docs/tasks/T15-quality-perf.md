# T15 — Phase 5 质量优化：路由拆分、首屏预算与可访问性

## 1. 背景

- Phase 1/3 已完成；T14 公式收藏因连续超时回滚，作为 backlog。
- 当前 Web 构建：JS 380KB（gzip 111.9KB），CSS 44KB（gzip 8.5KB）。所有页面（Reader/Search/Graph/Paths/Practice/Progress/Notes）都在 `App.tsx` 静态 import，首屏加载了不该加载的代码。
- T03 已知 4 个 >1MB 单节；阅读页按节懒加载，但 `ReaderPage` 本身也被首屏打包。
- 需要一次真实质量审计：性能、移动端、打印、无障碍、数据安全、内容抽查。

## 2. 目标

1. **路由级代码拆分**：首屏只加载首页/目录/布局；阅读页、搜索、图谱、路径、练习、进度、笔记、错题按需 lazy load。
2. **首屏预算**：初始 JS gzip 目标 ≤90KB（不含按需 chunk），并记录拆分前后。
3. **加载态**：懒加载路由显示学术风格 skeleton/“正在载入…”，不白屏；失败可重试/返回。
4. **移动端与打印**：390/768/1024/1440 关键页无横向溢出；打印阅读页隐藏导航/工具栏、正文黑字白底、公式不裁切。
5. **无障碍快检**：键盘可达、skip link、焦点可见、模态焦点、图片 alt、按钮 aria-label、reduced motion；只修复实际发现的问题。
6. **数据安全**：导出→清空→导入 round-trip 校验（可手测/脚本）。
7. **内容抽查**：30 个环境/例题/习题解析，公式/编号/答案一致。

## 3. 代码拆分（重点）

- `web/src/App.tsx` 使用 `React.lazy` + `Suspense`：
  - eager：`HomePage`、`SyllabusPage`、`NotFoundPage`、布局组件；
  - lazy：`ReaderPage`、`SearchPage`、`GraphPage`、`PathsPage`、`PathDetailPage`、`PracticePage`、`PracticeSessionPage`、`WrongBookPage`、`ProgressPage`、`NotesPage`。
- 路由路径不变，深链 `#c11-s4` 必须仍可用。
- Suspense fallback：简洁的“正在载入页面…”（不新增依赖）。
- 可选：对阅读页/搜索页在 idle 时 `import()` 预取，但不得把 chunk 拉回首屏。
- 检查 CSS 是否被路由级 import 拉成首屏；必要时把页面专属 CSS 留在对应 chunk（Vite 会处理）。
- 不引入路由库/状态库。

## 4. 审计清单（必须实际跑）

### 性能
- `npm --prefix web run build` 记录拆分前后 JS/CSS/gzip。
- 首屏（`/`）请求数、首屏 JS gzip、DOMContentLoaded 粗略值。
- 阅读页 C11 首节可读时间（本地 preview + CDP/Performance API）。
- 4 个 >1MB 单节仍不进入首屏。

### 响应式
- 1440/1024/390 截取：首页、目录、阅读、路径、练习、进度、笔记、图谱、搜索。
- `scrollWidth <= clientWidth`；表格/公式/周计划不溢出。
- 移动端菜单、底部栏、模态不遮挡关键操作。

### 打印
- `@media print`：隐藏 topbar/subnav/rail/底部栏；正文黑字白底；链接不外露；公式不横向裁切；分页不截断定理。
- 用 Chrome `Page.printToPDF` 生成 1 份 PDF 做 smoke（可选）。

### 无障碍
- Tab 顺序、skip link、焦点环、按钮 aria-label、模态焦点陷阱/Esc、reduced motion。
- 用 axe-core？若未安装不新增依赖；用手工 + 浏览器可访问性树检查。
- 对比度抽查正文/次要文字/强调色。

### 数据安全
- 导出 JSON → 清空 → 导入，节/题/笔记/路径恢复；坏文件不覆盖。

### 内容
- 抽查 C01/C08/C11/C12/C25/C32/C34 共 30 个环境/例题/习题解析，公式/编号/参考答案一致。

## 5. 交付

- 代码改动（只 web/，必要 tools/content 测试）。
- 构建前后 bundle 对比；关键页截图；打印 PDF（可选）。
- 修复清单与未修复项（需明确原因）。
- 不修改 src/ 教材、metadata、paths。
- 不安装新依赖，不发布。

## 6. 验收

1. 路由拆分后首屏 JS gzip ≤90KB；按需 chunk 可加载；深链可用。
2. 390/1024/1440 无横向溢出；移动端操作可达。
3. 打印 smoke 通过，正文/公式可读。
4. 无障碍实际发现的问题已修复或记录。
5. 导出/导入 round-trip 通过。
6. build/test 全绿；报告真实数字。
