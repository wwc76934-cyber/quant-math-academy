# T14b — 公式收藏：store + 阅读页入口（最小第一步）

## 范围

**只改 5 个文件**：

1. `web/src/features/store/types.ts`
2. `web/src/features/store/storage.ts`
3. `web/src/features/store/store.tsx`
4. `web/src/routes/ReaderPage.tsx`
5. `web/src/styles/components.css`

**不要**做 `/bookmarks` 页面、路由、导航；不要改搜索/路径/练习；不要跑全量测试。

## 数据模型

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
  formulas: string[];
  formulaMeta: Record<string, FormulaBookmarkMeta>;
}
```

- `DEFAULT_STORE.bookmarks.formulaMeta = {}`。
- `loadStore` 清洗 `formulaMeta`：只保留有 `id/latex/chapterId/sectionId` 字符串的项；坏数据不阻塞。
- StoreContextValue 增加：
  ```ts
  toggleFormulaBookmark: (meta: Omit<FormulaBookmarkMeta, 'bookmarkedAt'>) => boolean;
  ```
- 实现：已收藏则从 `formulas` 与 `formulaMeta` 移除并返回 false；未收藏则加入并返回 true；`bookmarkedAt` 用 ISO。
- 不新增 activity 类型。

## 阅读页

- 在渲染 sections 后，用 `useEffect`（依赖 `loadedSections`、`store.bookmarks.formulas`）扫描 `.section-block` 内 `.equation[id]`：
  - 若没有 `.equation__bookmark`，创建一个 `<button type="button" class="equation__bookmark" data-eq-id=...>`；
  - 文案：已收藏 `★` / 未收藏 `☆`；`aria-label` 对应“收藏公式/取消收藏”；
  - `title` 同上；
  - 插入 `.equation` 内、`.equation__body` 之后（或公式尾部）。
- 事件：复用 ReaderPage 现有的 document click 委托（copy handler 附近），识别 `.equation__bookmark`：
  - `preventDefault`、`stopPropagation`，避免触发复制；
  - 从 `eq` 取 `id`、`data-latex`；从 `closest('.section-block')` 取 `id`（如 `c11-s1`）；`chapterId` 用当前路由参数；
  - `tag` 可取 equation 内 `.equation__number` 文本；没有则 undefined；
  - 调 `toggleFormulaBookmark(meta)`，toast `已收藏公式` / `已取消收藏`。
- 收藏状态刷新后保持；点击星标不应触发复制公式。
- CSS：`.equation` 需要相对定位；`.equation__bookmark` 绝对定位右上/公式旁，透明背景、无边框、accent hover；移动端不遮挡公式（可放在公式右下，字号 14px）。

## 验证

- 只跑 `npm --prefix web run build`；**不要跑全量测试**。
- 如需手动确认，可跑 `npm --prefix web test -- tests/ReaderPage.test.tsx`，但不要等待超过 120 秒。
- 完成后给终态：改动文件、build 结果、未完成项；不要让“等待测试”成为最后一句。

## 验收（DSH）

- build 0；刷新后收藏保留；点击星标不触发复制；旧数据可加载。
- `/bookmarks` 页面后续单独做。
