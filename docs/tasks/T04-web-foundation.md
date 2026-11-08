# T04 — Web 应用基座、设计系统、首页与完整目录

## 1. 任务定位

在 T03 产出 `content/generated/site` 后，建立可运行的 React 应用骨架，完成设计系统、全局导航、首页与完整教材目录。阅读页在 T05 实现；本任务必须先把视觉与信息架构打牢。

执行者：AGY。验收者：DSH。

## 2. 输入

- `content/generated/site/book.json`、`chapters/cXX.json`（T03）。
- `docs/product/PRD.md`、`INFORMATION_ARCHITECTURE.md`。
- `docs/design/DESIGN_SYSTEM.md`。
- `design/prototype/`：首页、目录、阅读页原型与 `styles.css`；作为视觉基准，不直接复制 HTML 结构。
- `docs/ROADMAP.md` Phase 1 范围。

## 3. 技术栈与目录

```
web/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  public/content/          # 由 T03 sync 生成，gitignore
  src/
    main.tsx
    App.tsx
    routes/
      HomePage.tsx
      SyllabusPage.tsx
      ReaderPlaceholder.tsx
      NotFoundPage.tsx
    components/
      layout/AppHeader.tsx
      layout/AppFooter.tsx
      layout/MobileMenu.tsx
      layout/SkipLink.tsx
      toc/PartIndex.tsx
      toc/ChapterList.tsx
      metadata/DifficultyBadge.tsx
      metadata/PriorityBadge.tsx
      metadata/StatusDot.tsx
      ui/Button.tsx
      ui/Chip.tsx
      ui/ThemeToggle.tsx
      ui/EmptyState.tsx
      ui/ErrorState.tsx
    features/store/
      store.tsx
      types.ts
      storage.ts
    features/content/
      loadBook.ts
      loadChapter.ts
      types.ts
    lib/
      format.ts
      paths.ts
    styles/
      tokens.css
      base.css
      layout.css
      components.css
  tests/
```

依赖（以当前 npm 稳定版为准，安装后提交 lockfile）：

- `react`、`react-dom`、`react-router-dom`
- dev：`vite`、`@vitejs/plugin-react`、`typescript`、`@types/react`、`@types/react-dom`、`vitest`、`@testing-library/react`、`@testing-library/jest-dom`、`jsdom`

不引入 Tailwind、UI 组件库、图标库。图标用内联 SVG。

## 4. 设计系统实现

### 4.1 Token

把 `design/prototype/styles.css` 的 `:root` 与 `[data-theme="dark"]` 迁移为 `src/styles/tokens.css`。要求：

- 完整保留颜色、字体、间距、圆角 token。
- 增加 `--prose-size`、`--measure`，由阅读偏好控制（T05 使用）。
- 不新增未在规范中的品牌色。
- 深色模式用 `html[data-theme="dark"]`，不要用媒体查询硬切（需手动切换）。

### 4.2 基础样式

- `base.css`：reset、body 字体/行高、链接、选中、焦点可见、`prefers-reduced-motion`、打印基础。
- `layout.css`：顶栏 56px、内容最大宽 1440、页面 padding 32/20、阅读三栏网格（T05 用）。
- `components.css`：按钮 4 种、chip、D/P 徽标、状态点、卡片、空状态、错误状态、移动抽屉。
- 字体栈与 `design/prototype` 一致；Phase 1 不打包字体。

### 4.3 主题

- `ThemeProvider`/store 读取 `localStorage` 与 `prefers-color-scheme`；默认跟随系统。
- `index.html` 内联脚本在 React 前设置 `data-theme`，避免白闪。
- 主题切换按钮图标：浅色显示月亮，深色显示太阳；`aria-label` 随状态变化。

## 5. 数据加载

### 5.1 类型

在 `features/content/types.ts` 定义与 T03 schema 一致的：

- `Book`、`BookPart`、`BookChapter`、`ChapterData`、`SectionData`、`SectionMeta`、`ExerciseData`、`EnvironmentIndex`、`EquationIndex`。
- 不要用 `any` 绕过；字段与 T03 对齐。

### 5.2 加载

- `loadBook()`：`fetch(`${import.meta.env.BASE_URL}content/book.json`)`，模块级缓存；失败抛 `ContentError`。
- `loadChapter(id)`：同章缓存；404/解析失败给明确错误。
- 加载态：静态骨架（标题、行占位），不用 shimmer 动画。
- 错误态：说明 + 重试 + 返回目录。
- 非试点章：数据可能存在，但 Phase 1 不开放阅读；UI 显示“内容接入中”，不请求章节 JSON。

### 5.3 试点范围

- `book.json.pilotChapterIds` 为 `c01/c08/c11/c33`。
- 目录中所有 34 章可见；只有试点章的节可点击进入阅读（T05 路由）。
- 非试点章不隐藏、不删除，显示状态文案；不伪造内容。

## 6. 全局壳

- `AppHeader`：品牌（中文 serif + 英文小字）、导航（教材 / 学习路径 / 练习 / 学习进度）、搜索按钮、主题切换、移动端菜单按钮。
- 当前路由高亮：2px 强调色下划线；`aria-current="page"`。
- `MobileMenu`：<900px 抽屉，含全部导航、搜索、主题；焦点陷阱、Esc 关闭、关闭后焦点回按钮。
- `SkipLink`：跳到主内容。
- `AppFooter`：仅首页/目录/路径/练习/进度显示；版权/数据说明；阅读页不显示（T05）。
- 404 页面：说明 + 返回首页/目录。

## 7. 首页

结构（对照原型）：

1. **Masthead**：产品名、一句定位、教材规模（篇/章/节/公式）。
   - 数字全部来自 `book.json` 统计，不硬编码。
   - 无数据时显示“—”，不显示假数字。
2. **继续学习**：
   - 有 `lastLocation` 且对应试点章：章号、节标题、上次位置、章进度、按钮“继续阅读”。
   - 无记录：空状态“从第一篇开始”/“查看完整目录”。
   - 不伪造“62%”等进度；没有数据就显示 0/空状态。
3. **今日面板**：
   - 下一节：Phase 1 取试点章中第一个未标记“已学习/已掌握”的节；没有则显示“已完成试点章”。
   - 待复习：Phase 3；显示“复习将在 Phase 3 开放”，不做假数字。
   - 练习：显示试点章题数；按钮“即将开放”（Phase 3）。
4. **学习路径**：A/B/C 三张卡；Phase 1 只展示目标/周期/说明；按钮“Phase 3 开放”禁用；不显示假进度。
5. **全书地图**：8 篇列表；每篇章数、节数、进度（来自 store；无数据为 0）；点击滚动/跳转目录对应篇。
6. **数据说明**：本地保存、可在学习进度导出（Phase 3 前说明）。

## 8. 目录页

- 左侧篇索引（8 项，粘性）；移动端横向滚动。
- 右侧 34 章列表：章号、标题、D/P 范围（仅已标注章）、节数、状态；点击展开/收起。
- 默认展开：当前 `lastLocation` 章；否则 C11；否则第一章。
- 节行：节号、标题、D/P（有则显示）、分钟、状态点、状态文案；“内容接入中”用于非试点。
- 筛选：
  - 全部 / 只看 P0/P1 / 只看未学 / 只看已标注。
  - 过滤后显示“已筛选 X / 34 章”；清除按钮。
  - 无标注的章在 P0/P1 筛选下隐藏，但显示说明“其余章标注完善中”。
- 交互：展开状态写入 URL query? 可选；至少写入 session state，刷新保留当前展开。T04 可只保留内存。
- 键盘：章行可聚焦，Enter 展开；节链接可 Tab。
- 可访问性：`aria-expanded`、`aria-controls`。

## 9. Store 基座

本任务只实现 Phase 1 需要的部分，但 schema 要为 T05/T13 留好：

```ts
type StoreV1 = {
  schemaVersion: 1;
  settings: {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'sm' | 'md' | 'lg' | 'xl';
    measure: 'narrow' | 'standard' | 'wide';
    focus: boolean;
    proofDefault: 'open' | 'closed';
  };
  progress: Record<string, { status: ...; lastReadAt?: string; scrollOffset?: number; statusChangedAt?: string }>;
  lastLocation?: { chapterId: string; sectionId: string; at: string };
  exercises: Record<string, ...>;
  notes: Record<string, ...>;
  bookmarks: { sections: string[]; formulas: string[] };
  review: Record<string, ...>;
  path: { active: 'a'|'b'|'c'|'free'; startedAt?: string };
  activity: Array<{ at: string; type: string; targetId: string; detail?: string }>;
};
```

- 本任务实现 `settings`、`lastLocation`、`progress` 的读取/写入；其他字段保留空默认值。
- localStorage key：`qma:store:v1`；写入 400ms 防抖；页面隐藏/卸载 flush。
- 损坏 JSON：回退默认值，保留原始字符串到 `qma:store:corrupt:<timestamp>`（如可行），并 UI 提示。
- 存储不可用：`storageAvailable=false`，顶部提示；阅读功能不阻塞。
- 不实现导入导出（Phase 3），但 schema 要能导出。

## 10. 视觉验收

对照 `design/prototype/home.html`、`syllabus.html` 与 `DESIGN_SYSTEM.md`：

- 1440×900：顶栏 56px、内容两侧 32px；首页首屏见“继续学习”；目录左侧篇索引 200–210px。
- 390×844：单栏、无横向滚动；目录筛选可横向滚动；章行标题与徽标不挤压。
- 浅色/深色切换无白闪；深色下文字对比 ≥ 4.5:1。
- 不使用渐变、玻璃拟态、彩色卡片、emoji 图标、过大的圆角/阴影。
- 字体、间距、颜色与原型一致；允许合理微调，但需在报告中说明。

## 11. 测试

- `loadBook`：成功、404、JSON 损坏。
- `SyllabusPage`：渲染 34 章；筛选 P0/P1；展开 C11；非试点章显示“内容接入中”。
- `HomePage`：无数据空状态；有 lastLocation 时显示继续学习；统计来自 book.json。
- 主题切换持久化。
- 移动菜单打开/关闭/Esc/焦点回归。
- `npm --prefix web run build` 通过（tsc + vite）。

## 12. 明确不做

- 不实现阅读页正文渲染（T05）；只做占位路由。
- 不实现搜索后端/索引（Phase 2）；搜索按钮可打开占位页或提示“Phase 2 开放”。
- 不实现学习路径详情、练习、复习、笔记、导入导出（Phase 3）。
- 不修改 `src/`、`content/`、`tools/content/`。
- 不新增 Tailwind/UI 库/字体包。
- 不硬编码教材正文或章节统计。

## 13. 验收标准

1. `npm --prefix web install` 与 `npm --prefix web run build` 成功。
2. `npm --prefix web run dev` 可启动；首页/目录可访问；无控制台错误。
3. 34 章全部来自 `book.json`；统计与数据一致。
4. 设计对照通过；1440/390 截图无明显布局问题。
5. 主题、移动菜单、筛选、展开可用；状态持久化。
6. 测试通过；无 `any` 滥用；无死链（占位路由除外）。
7. 未修改教材源与内容管线。

## 14. 交付报告

- 新增/修改文件、依赖版本。
- 运行命令与结果（install/build/test/dev）。
- 1440/390 截图路径。
- 与原型/设计系统的差异及理由。
- 已知问题与 T05 需要接手的事项。
- 是否修改过 `src/`（必须是“否”）。
