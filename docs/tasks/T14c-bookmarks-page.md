# T14c — 公式收藏页 `/bookmarks`（最小第二步）

## 前置

T14b 已完成并提交：

- `store.bookmarks.formulaMeta` 已存在；
- 阅读页 `.equation__bookmark` 可收藏/取消；
- 导出/导入包含 bookmarks。

## 范围

**只改/新增 5 个文件**：

1. 新增 `web/src/routes/BookmarksPage.tsx`
2. `web/src/App.tsx`（lazy import + `/bookmarks` route）
3. `web/src/components/layout/AppHeader.tsx`（导航“收藏”）
4. `web/src/styles/components.css`（页面样式）
5. 新增 `web/tests/BookmarksPage.test.tsx`

**不要**改 store、ReaderPage、发布配置、src/metadata/paths；不要跑全量测试。

## 页面规格

- 路由 `/bookmarks`；页面 `<main className="content bookmarks-page shell" id="main-content">`。
- `<h1>学习收藏夹</h1>` + 简短说明“公式收藏保存在本机”。
- 读取 `store.bookmarks.formulas` / `formulaMeta`；用 `loadBook()` 解析章/节标题：
  - 按章分组；每章显示 `C11 第11章 标题`；
  - 每条：`tag` 或 ID、节号/标题、LaTeX `<code>`（纯文本，不渲染 KaTeX）、`取消收藏` 按钮、`跳转公式` 链接 `/learn/{chapterId}#{id}`；
  - `formulaMeta` 缺失的旧 ID：显示 ID + “旧收藏，请重新收藏以保存公式”，仍可取消。
- 空态：“还没有收藏公式”，链接到 `/syllabus` 或 `/search`。
- 取消：调用 `toggleFormulaBookmark({id,latex,chapterId,sectionId,tag})`（T14b 的 action 会移除），toast 可选。
- 导航：`AppHeader` 在“练习”和“学习进度”之间加 `NavLink to="/bookmarks"`，文本“收藏”。
- App.tsx 用 `React.lazy`，与现有页面一致。

## 测试

- 空态；
- 有 `formulaMeta` 时显示章/节/LaTeX/链接；
- 点击取消后条目消失；
- 旧 ID 无 meta 的回退；
- 断言 `#main-content`。
- 只跑 `npm --prefix web test -- tests/BookmarksPage.test.tsx`。

## 硬性执行约束

- 只跑 `npm --prefix web run build` 与目标测试；
- 不要 `manage_task`/`schedule`/后台等待/sleep/轮询；
- 命令 >120 秒就停止并报告；
- 最后必须给终态：文件、build、目标测试、未完成项；不要让“等待测试”成为最后一句。

## 验收（DSH）

- build 0；目标测试通过；全量测试 DSH 跑；
- `/bookmarks` 不 fetch 章节，只用 store + book；
- 刷新/取消/跳转正确。
