# T14a — 公式收藏稳定版（Phase 4 backlog 重做）

## 1. 背景

上一版 T14 失败原因：`/bookmarks` 只存公式 ID，页面再异步加载章节 `equationIndex` 取 LaTeX；加载时序/失败时只剩编号，测试也不稳。

本版改为**收藏时直接写入公式元数据**，页面不再依赖章节加载。

## 2. 数据模型

```ts
export interface FormulaBookmarkMeta {
  id: string;
  latex: string;
  tag?: string;
  chapterId: string;
  sectionId: string;
  bookmarkedAt: string;
}

export interface UserBookmarks {
  sections: string[];
  formulas: string[]; // 保持兼容：只存 id
  formulaMeta: Record<string, FormulaBookmarkMeta>;
}
```

- 旧 localStorage 没有 `formulaMeta` → 默认空对象；旧 `formulas` 保留，页面回退显示 ID（不阻塞）。
- `toggleFormulaBookmark(meta)`：
  - 未收藏：加入 `formulas` 与 `formulaMeta[id]`；
  - 已收藏：从两者移除；
  - 返回 boolean（true=新增/false=移除），供 toast。
- `deleteFormulaBookmark(id)` 可选。
- 导出/导入包含 `formulaMeta`；坏数据清洗。

## 3. 阅读页

- 对每个 `.equation[id]` 注入“☆ 收藏”按钮（DOM 注入 + 事件委托，不改 T03 HTML/排版）。
- 元数据来源：
  - `id`：equation id；
  - `latex`：`.equation` 的 `data-latex`；
  - `chapterId`：当前 ReaderPage 参数；
  - `sectionId`：`eq.closest('.section-block')?.id` 或从 `section-heading` 取；
  - `tag`：equation 内 `.equation__number` 文本（如有）。
- 点击：`stopPropagation`，调用 store；按钮变“★ 已收藏”；toast；刷新后保持。
- 已收藏状态在 `loadedSections`/`bookmarks.formulas` 变化后重新同步。
- 事件委托与 T05 复制公式逻辑互不冲突（点击星标不触发复制）。

## 4. `/bookmarks`

- 只读 `store.bookmarks.formulas/formulaMeta`，不再 fetch 章节。
- 按章分组；显示 tag 或 ID、节号/标题（从 `book.json` 查）、LaTeX `<code>`（纯文本，不客户端 KaTeX）、收藏时间。
- 跳转 `/learn/{chapterId}#{id}`；取消收藏。
- `formulaMeta` 缺失的旧收藏：显示 ID + “（旧收藏，请重新收藏以保存公式）”提示，不隐藏。
- 节书签 tab 保留；若 `bookmarks.sections` 有值，从 book 解析标题；无则空态。
- 入口：`/progress` 公式收藏摘要卡 + 链接；阅读页星标即入口。

## 5. 测试

- store：新增/取消/重复收藏、formulaMeta 写入、旧数据清洗、导出含 formulaMeta。
- Reader：注入星标、点击后 store/按钮状态、刷新恢复、点击星标不触发复制。
- BookmarksPage：直接显示 meta latex（无 chapter fetch）、旧收藏回退、取消收藏、跳转链接。
- 既有 110 Web + 58 内容测试不回归；build 0。

## 6. 约束

- 只改 `web/`；不改 `src/`、metadata、paths；不装依赖；不客户端 KaTeX。
- 不做学习建议/搜索 chips（保留 backlog）。
- 不发布。

## 7. 验收

1. 阅读页公式可收藏/取消，刷新保留；按钮状态正确。
2. `/bookmarks` 不依赖章节请求，直接显示 LaTeX；旧收藏有回退。
3. 导出/导入包含 formulaMeta。
4. build/test/截图；报告真实数字与限制。
