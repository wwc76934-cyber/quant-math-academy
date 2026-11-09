# T13 — 笔记、导入导出与阅读偏好完善（Phase 3 收尾）

## 1. 背景

- 阅读页已有状态、习题、错题、复习、路径；`store.notes` 仍是 `Record<string, unknown>` 未使用。
- 学习数据只存在 localStorage，没有备份/迁移入口；用户换设备或清缓存会丢失。
- 阅读偏好已有主题/字号/宽度/专注/证明默认；可补一个行距选项。

## 2. 目标

1. **节笔记**：在阅读页为当前节写/改/删笔记，持久化；笔记页统一查看与跳转。
2. **导入导出**：导出完整 store JSON；导入时严格校验、明确覆盖提示、导入后恢复；支持清空本机学习记录。
3. **阅读偏好**：新增行距（紧凑/标准/宽松），持久化，CSS 变量生效；不破坏现有设置。
4. 不做云同步、不做账号、不装依赖。

## 3. 数据模型

```ts
export interface NoteRecord {
  text: string;
  updatedAt: string;
}

export type LineHeightSetting = 'compact' | 'standard' | 'loose';

export interface UserSettings {
  // 既有
  lineHeight: LineHeightSetting;
}

export interface StoreV1 {
  notes: Record<string, NoteRecord>; // key = sectionId
  // 既有
}
```

- 旧 localStorage 没有 `lineHeight`/notes 时补默认值；坏 notes 清洗，不阻塞启动。
- Actions：`setNote(sectionId, text)`、`deleteNote(sectionId)`、`importStore(raw)`、`resetStore()`。
- `setNote` 空文本等同删除；updatedAt ISO；activity 可记 `note`（可选）。
- 行距 CSS：`--prose-leading` compact 1.75 / standard 1.9 / loose 2.1；`.article-content` 使用该变量；设置弹窗加“行距”选项。

## 4. 阅读页笔记

- 在每节正文末尾增加“本节笔记”区域（学术列表式，不做浮夸卡片）：
  - textarea（自动保存 800ms 防抖 + “保存”按钮双重保障）；
  - 显示“已保存 HH:mm”/“未保存”；
  - 删除按钮（需确认或二次点击）；
  - 未输入时显示“记录推导、疑问或自己的例子……”占位。
- 笔记与 sectionId 绑定；切换节后正确加载各自笔记。
- 右栏“本节信息”增加“有笔记”小标识（可选）。

## 5. 笔记页 `/notes`

- 按章/节分组列出所有笔记；显示节编号/标题、更新时间、摘要 120 字；
- 点击跳 `/learn/{chapterId}#{sectionId}`；
- 空态：“还没有笔记”；
- 删除单条；不做富文本/Markdown 渲染，保持纯文本。
- 入口：`/progress` 增加“我的笔记”区块；阅读页笔记区有“查看全部笔记”链接。

## 6. 导入导出 / 数据管理

在 `/progress` 底部增加“学习数据”区块：

- **导出**：下载 `qma-backup-YYYYMMDD-HHmm.json`，内容：
  ```json
  {"schemaVersion":1,"exportedAt":"…","app":"quant-math-academy","store":{…}}
  ```
- **导入**：选择 JSON 文件 → 校验 `schemaVersion===1`、store 结构、settings/progress/exercises/review/notes/path 基本类型 → 预览摘要（节数/题数/笔记数/路径）→ 确认覆盖 → 写入并刷新 UI。
  - 无效文件：明确错误，不覆盖现有数据；
  - 覆盖前提示“当前本机记录将被替换”；
  - 导入成功后 toast 与统计刷新。
- **清空**：二次确认（输入“清空”或勾选确认）后 resetStore，回到默认设置；不得误触。
- 导出/导入不包含任何服务器请求；文件仅在本机生成/读取。

## 7. 测试

- store：notes set/update/delete、lineHeight 持久化、旧数据清洗；importStore 合法/非法/版本不符；resetStore。
- ReaderNotes：输入自动保存、刷新恢复、删除、切换节隔离。
- NotesPage：分组、摘要、跳转、空态、删除。
- ProgressPage 数据管理：导出触发 Blob/下载（mock URL.createObjectURL）、导入合法/非法、清空二次确认。
- 行距设置：选择后 CSS 变量/持久化。
- 既有 92 Web + 58 内容测试不回归；build 0。

## 8. 约束

- 只改 `web/` 与必要 `tools/content/`；不改 `src/` 教材、metadata、paths。
- 不安装新依赖；不做后端/云同步；不发布。
- 导入必须防御性校验，禁止 `JSON.parse` 后直接覆盖。
- 笔记纯文本，禁止 `dangerouslySetInnerHTML`。

## 9. 验收

1. 阅读页笔记可写/改/删、刷新保留、按节隔离。
2. `/notes` 可查看/跳转/删除；空态诚实。
3. 导出文件可再次导入；非法文件不覆盖；清空需二次确认。
4. 行距设置生效并持久化。
5. build/test/截图；报告已知限制。
