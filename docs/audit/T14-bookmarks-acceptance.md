# T14 公式收藏验收（T14b + T14c）

- 日期：2026-11-10
- 状态：**完成并上线**
- 执行：AGY（T14b `agy-t14`、T14c `agy-bookmarks`），DSH 复核/验收

## 1. 交付

### T14b：store + 阅读页星标

- `FormulaBookmarkMeta`：id/latex/tag/chapterId/sectionId/bookmarkedAt。
- `bookmarks.formulaMeta` 持久化；旧数据安全清洗。
- `toggleFormulaBookmark`：收藏/取消，返回 boolean。
- 阅读页每个 `.equation[id]` 注入 `☆/★` 按钮；点击不触发复制；刷新保留。
- 移动端 390：按钮不遮挡公式、无横向溢出。

### T14c：`/bookmarks`

- 导航“收藏”；路由 `/bookmarks`，懒加载。
- 按章分组：C11 第11章标题；显示 tag/ID、节标题、LaTeX `<code>`、跳转 `/learn/c11#c11-eq-11.1`、取消收藏。
- 旧 ID 无 meta 回退；空态“还没有收藏公式”。
- 不 fetch 章节；只用 store + `book.json`。

## 2. 实际验证

| 项 | 结果 |
|---|---|
| build | 0 error；BookmarksPage gzip 1.43KB |
| 目标测试 | BookmarksPage 4/4 |
| ReaderPage | 11/11 |
| 全量 Web | **123 / 123** |
| 内容 | 58 / 58 |
| 点击星标 | formulaMeta 写入；toast；copy activity 0 |
| 刷新 | 星标保持 |
| 取消收藏 | `/bookmarks` 条目移除并回空态 |
| 移动端 | 390 无溢出 |

## 3. AGY 终态情况

- T14b/T14c 两次都返回 SUCCESS 与终态报告；
- T14c 目标测试 4/4、build 0；
- DSH 独立重跑 build、目标测试、117 全量测试后接收。

## 4. 已知限制

- 旧收藏只有 ID、没有 LaTeX 时显示“请重新收藏”。
- 公式页不渲染 KaTeX，只显示 LaTeX 源码（构建期 KaTeX 之外不在客户端渲染）。
- 未做跨设备同步（产品本身无后端）。
