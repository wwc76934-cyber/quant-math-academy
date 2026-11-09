# T13 笔记、导入导出与阅读偏好完善验收报告 (Notes, Import/Export & Reading Preferences Acceptance)

- **任务编号**：T13（Phase 3 学习体验深化收官里程碑）
- **执行时间**：2026-11-09
- **状态**：验收通过 (Passed)
- **范围限制**：只修改 `web/` 与新建 `docs/audit/T13-notes-data-acceptance.md`；严禁修改 `src/` 教材正文；严禁修改已 reviewed 的 19 章 113 节元数据与学习路径数据；严禁安装外部依赖；用户笔记必须保持纯文本（防御 XSS）。

---

## 1. 核心设计原则与准则核验

| 原则条目 | 规范要求 | 实际实现与验证 | 状态 |
|---|---|---|---|
| **纯文本防 XSS** | 用户笔记开放输入，绝对杜绝 XSS 注入风险 | 严格遵循纯文本渲染，严禁使用 `dangerouslySetInnerHTML` 或未受控的 HTML 解析，换行通过 `white-space: pre-wrap` 展示 | ✅ 完全合规 |
| **纯本地零网络** | 本地优先，无云端账户与远程存储服务 | 导出备份基于前端 `Blob` + `<a download>` 本地生成；导入基于 `FileReader` 本地读取校验；无任何网络端点请求 | ✅ 完全合规 |
| **防御性校验导入** | 禁止 `JSON.parse` 后直接无条件覆盖已有 store | 严格验证 `schemaVersion === 1`、`settings` 完整性、各模块数据格式；先在模态框展示预览摘要并要求用户确认覆盖，非法数据绝不覆盖 | ✅ 完全合规 |
| **防误触清空机制** | 数据清空高危操作必须设置安全防线 | 重置所有学习记录前必须在输入框中准确输入“清空”，确认按钮方才解锁，彻底杜绝误触丢数据 | ✅ 完全合规 |
| **阅读偏好行距生效** | 行距设置持久化，CSS 变量动态同步 | 支持紧凑（1.75）、标准（1.9）、宽松（2.1），动态注入 `--prose-leading` 至 `document.documentElement` 并直接驱动 `.article-content` | ✅ 完全合规 |
| **节笔记隔离与留存** | 笔记与节绑定，防抖保存，切换节正确隔离 | 800ms 防抖自动落盘 + 手动“保存”按钮双保障；切换节互不干扰；空文本等同删除 | ✅ 完全合规 |

---

## 2. 数据模型与存储架构 (Store v1 扩展)

在 `web/src/features/store/types.ts` 中完成类型扩展：

```ts
export type LineHeightSetting = 'compact' | 'standard' | 'loose';

export interface UserSettings {
  theme: ThemeSetting;
  fontSize: FontSizeSetting;
  measure: MeasureSetting;
  lineHeight: LineHeightSetting;
  focus: boolean;
  proofDefault: ProofDefaultSetting;
}

export interface NoteRecord {
  text: string;
  updatedAt: string; // ISO 8601
}

export interface StoreV1 {
  schemaVersion: 1;
  settings: UserSettings;
  progress: Record<string, SectionProgressItem>;
  lastLocation?: LastLocation;
  exercises: Record<string, ExerciseRecord>;
  notes: Record<string, NoteRecord>; // key = sectionId
  bookmarks: UserBookmarks;
  review: Record<string, ReviewRecord>;
  path: PathSetting;
  activity: UserActivityItem[];
}
```

### 存储健壮性与向后兼容设计 (`storage.ts` & `store.tsx`)
- **坏笔记清洗 (`sanitizeNotes`)**：在 `loadStore()` 时，过滤非对象、非字符串 `text`、非合法 ISO 日期 `updatedAt` 的损坏条目，保留合法笔记；
- **排版白名单回退**：`lineHeight` 校验仅允许 `'compact' | 'standard' | 'loose'`，异常值平滑降级为默认 `'standard'`；
- **Store Actions 扩展**：
  - `setLineHeight(lineHeight)`：持久化并同步 `--prose-leading` CSS 变量；
  - `setNote(sectionId, text)`：空文本或纯空格自动判定为删除；正常文本更新 `updatedAt` 并记录 `activity` 流水；
  - `deleteNote(sectionId)`：删除指定节笔记，记录 `activity` 流水；
  - `importStore(raw)`：深层安全校验并返回导入摘要 `{ progressCount, exerciseCount, wrongCount, noteCount, activePath }`；
  - `resetStore()`：全量恢复至 `DEFAULT_STORE`。

---

## 3. 功能与页面实现详情

### 3.1 阅读页每节笔记区 (`ReaderNotes.tsx`)
- **位置**：位于各节正文末尾与环境块下方，保持简洁学术列表风格；
- **编辑体验**：
  - 800ms 防抖自动落盘保存 + “保存”按钮手动立即保存；
  - 状态指示（“已保存 HH:mm” / “未保存” / “自动保存”）；
  - 双击二次确认删除（“删除笔记” → “确认删除？”）；
  - 右上角直达“查看全部笔记 →”；
- **按节隔离**：切换当前节或滚动跳转时，组件基于 `sectionId` 动态同步内容，多节笔记互不污染；
- **侧边栏联动 (`ReaderSectionInfo.tsx`)**：当前节有笔记时，右侧信息栏展示“有笔记”状态徽章。

### 3.2 我的学习笔记页 (`/notes` -> `NotesPage.tsx`)
- **按章分组汇总**：全书 34 章所有记录了笔记的节按章节结构聚合，单章内按 `updatedAt` 倒序排列；
- **笔记摘要与元数据**：展示节编号（如 1.1）、节标题、更新时间，正文保持纯文本排版与自动换行；
- **正文直达**：点击“前往该节正文 →”直接深层跳转至对应阅读页章节锚点（`/learn/{chapterId}#{sectionId}`）；
- **单条删除**：支持二次点击确认删除，即时更新笔记列表与顶部统计；
- **诚实空态**：全书暂无笔记时展示引导卡片与教材目录跳转入口。

### 3.3 数据管理与备份 (`ProgressPage.tsx`)
在 `/progress` 底部扩展“数据管理与备份”专区：
- **导出备份 (JSON)**：
  - 点击本地生成 `qma-backup-YYYYMMDD-HHmm.json` 文件；
  - 文件标准规范：
    ```json
    {
      "schemaVersion": 1,
      "exportedAt": "2026-11-09T14:00:00.000Z",
      "app": "quant-math-academy",
      "store": { ... }
    }
    ```
- **导入备份**：
  - 隐藏式文件选择框，读取用户本地 `.json`；
  - 严格校验 `schemaVersion === 1` 与 `settings` 结构；
  - 弹出预览模态框（展示将恢复的已学节数、已练习题、错题本数、笔记条数与当前学习路径）；
  - 明确标红提示“确认后将完全覆盖当前本机的学习记录与笔记！”；
  - 用户点击“确认覆盖并恢复”后方才执行覆写并触发 Toast；
  - 非法格式或版本不匹配即时报警并完全保留原有数据。
- **清空本机记录**：
  - 高危操作防误触弹窗；
  - 必须在文本框中键入“清空”两字后，确认按钮方可解锁；
  - 确认后重置为 `DEFAULT_STORE` 并清空所有进度与笔记。
- **“我的笔记”区块入口**：
  - 在复习队列下方清晰展示“我的笔记”卡片，展示已累计记录节数与快速管理入口。

### 3.4 排版设置（正文行距）
- 在阅读页设置弹窗 (`ReaderSettingsModal.tsx`) 中新增“正文行距”单选条：
  - 紧凑（`1.75`）
  - 标准（`1.9`，默认）
  - 宽松（`2.1`）
- 在 `tokens.css` 中定义全局默认 `--prose-leading: 1.9;`，并在 `components.css` 的 `.article-content` 中接入；
- `StoreProvider` 在挂载与切换行距时自动更新 `document.documentElement.style.setProperty('--prose-leading', ...)`，实现全书正文毫秒级即时重排。

---

## 4. 自动化测试套件与执行验证

针对 T13 需求新增两组端到端与单元测试文件：
1. `web/tests/notesAndDataStore.test.tsx`（9 项测试）：
   - `setNote`：文本写入、ISO `updatedAt` 时间戳生成、`activity` 流水写入；
   - `setNote`：多版本更新与时间戳递增；
   - `setNote`：空字符串与纯空白文本自动判定为删除；
   - `deleteNote`：显式删除与流水记录；
   - `setLineHeight`：持久化与 `--prose-leading` CSS 变量动态同步；
   - `loadStore`：坏数据清洗（过滤非对象、非字符串、损坏时间戳的笔记条目，行距非法值安全降级）；
   - `importStore`：非法格式拦截、版本不符拦截（不破坏既有数据）；
   - `importStore`：合规数据导入并计算摘要预览；
   - `resetStore`：恢复 `DEFAULT_STORE`。
2. `web/tests/notesAndDataPages.test.tsx`（9 项测试）：
   - `ReaderNotes`：文本输入、手动保存、状态指示；
   - `ReaderNotes`：按节独立隔离与双击确认删除；
   - `NotesPage`：空态诚实展示与计数；
   - `NotesPage`：按章分组展示、摘要、锚点跳转链接、单条删除；
   - `ProgressPage`：导出 Blob 与下载触发；
   - `ProgressPage`：非法文件导入被拦截、报错且保留既有数据；
   - `ProgressPage`：合法备份导入弹窗预览与确认覆盖；
   - `ProgressPage`：高危清空输入“清空”二次确认防线；
   - `ReaderSettingsModal`：正文行距选择器与 CSS 变量实时联动。

### 测试运行真实结果
- **Web 测试**：
  - 命令：`npm --prefix web run test`
  - 结果：**18 个测试文件全部通过，共 110 项测试通过（0 失败，0 跳过）**；
- **内容测试**：
  - 命令：`npm run test:content`
  - 结果：**7 个测试套件全部通过，共 58 项测试通过（0 失败，0 跳过）**；
- **构建测试**：
  - 命令：`npm --prefix web run build`
  - 结果：**TypeScript 类型检查 0 错误，Vite 构建打包成功（dist 产物完整）**。

---

## 5. 已知限制与后续建议

1. **富文本与公式**：用户笔记当前定位为纯文本轻量思考草稿，不支持 Markdown/KaTeX 即时预览渲染（有效防御了跨站脚本注入与渲染开销）；后续如需支持公式，可引入受限的纯本地 KaTeX 宏白名单解析。
2. **多端同步**：当前备份依赖本地 JSON 文件的手动导出与导入，不依赖任何第三方云服务；建议用户在清理浏览器缓存或切换设备前通过 `/progress` 下载备份。
3. **撤销恢复**：清空本机记录后无法在本地撤销；建议用户清空前若有重要记录先点击“导出备份 (JSON)”。
