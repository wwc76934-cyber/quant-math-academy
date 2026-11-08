# Quant Math Academy 技术架构

- 版本：v1.0（Phase 0 定稿）
- 状态：Phase 1 实施依据
- 关联：`CONTENT_MODEL.md`、`../product/PRD.md`、`../product/INFORMATION_ARCHITECTURE.md`

---

## 1. 架构结论

采用**构建期内容编译 + 纯静态单页应用**：

```
Markdown 源文件（权威）
        │
        ▼
Node 内容编译器（parse + validate + KaTeX 预渲染）
        │
        ├── book.json            目录与统计
        ├── chapters/cXX.json    章 manifest：节/环境/公式索引 + 元数据
        ├── sections/cXX-sN.html 按节预渲染正文（懒加载）
        ├── exercises/cXX.json   按章习题与解析（懒加载）
        ├── search/index.json    检索索引（Phase 2）
        └── validation.json      构建校验报告
        │
        ▼
Vite + React + TypeScript 静态站点
        │
        ├── 阅读 / 目录 / 检索 / 路径 / 练习 / 进度
        └── localStorage 学习状态（无后端）
        │
        ▼
dist/（静态文件，可部署到 GitHub Pages / 任意静态托管）
```

核心取舍：

1. **不在浏览器里解析 Markdown、不跑 KaTeX。** 公式与正文结构在构建期渲染为 HTML，运行时只做注入与交互。这样首屏稳定、公式无闪烁、客户端体积小。
2. **内容与界面分离。** 教材源文件仍由 `src/` 管理；网站只消费编译产物。新增章节不需要改 React 代码。
3. **无后端。** 单用户、本地持久化、JSON 导入导出；只有未来确有多设备需求时才评估同步服务。
4. **阅读页以章为单位、节为锚点。** 避免 220 个路由页面与重复渲染，保留连续阅读与深链。

---

## 2. 技术栈

| 层 | 选择 | 理由 |
|---|---|---|
| 构建 | Vite 6/7 + TypeScript 5 | 快、静态、配置简单；不引入 SSR 复杂度 |
| UI | React 19 + React Router 7（library mode） | 生态成熟、组件化、路由可控 |
| 样式 | 原生 CSS + CSS Custom Properties + 分层文件 | 精确控制学术排版；避免 Tailwind 类名噪音与“AI 风”默认值 |
| 数学 | KaTeX 0.16.x（构建期渲染） | 与教材现有构建链一致；速度快、排版稳定 |
| Markdown | `marked` 15.x（构建期） | 已在仓库依赖中；支持 GFM 表格；自定义块解析由我们控制 |
| 检索 | MiniSearch（客户端，Phase 2） | 轻量、可自定义分词、无需服务端 |
| 状态 | React Context + `useSyncExternalStore` + 自定义 store | 数据量小；避免引入 Redux/Zustand 依赖 |
| 持久化 | localStorage（单键 JSON，版本化） | 可靠、可导出；无隐私外传 |
| 测试 | Vitest + Testing Library；Playwright（Phase 2/5） | 单元/集成/端到端分层 |
| 代码质量 | ESLint + Prettier + `tsc --noEmit` | 可重复检查 |
| 部署 | 静态 `dist/`；GitHub Pages（Phase 6） | 零后端成本 |

明确不引入：Next.js、Tailwind、数据库、ORM、账号系统、AI SDK、ECharts（首版）。

---

## 3. 仓库结构

```
quant-math-academy/
├── src/                            # 教材源文件（权威，不随网站改写）
│   ├── chapters/C01..C34.md
│   ├── solutions/C01..C34.md
│   └── frontmatter/
├── scripts/                        # 既有 PDF/DOCX 构建流水线（保持可用）
├── tools/content/                  # 网站内容编译器
│   ├── parse-book.mjs              # 解析、切片、校验（T01）
│   ├── render-html.mjs             # Markdown/KaTeX 渲染（Phase 1）
│   ├── build-search-index.mjs      # 检索索引（Phase 2）
│   ├── validate-content.mjs        # 覆盖率/公式/引用校验
│   └── lib/                        # 共用解析与渲染工具
├── content/
│   ├── metadata/                   # 人工策展：章节说明、D/P 标注
│   │   ├── chapters/c01.json
│   │   └── ...
│   ├── paths/                      # 学习路径定义
│   ├── search/aliases.json         # 中英文术语别名
│   └── generated/                  # 构建产物（gitignore）
│       ├── book.json
│       ├── chapters/c01.json
│       ├── search/index.json
│       └── validation.json
├── web/                            # 前端应用
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── public/
│   │   └── content/                # 构建时同步 generated（gitignore）
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── routes/
│   │   │   ├── HomePage.tsx
│   │   │   ├── SyllabusPage.tsx
│   │   │   ├── ReaderPage.tsx
│   │   │   ├── SearchPage.tsx
│   │   │   ├── PathsPage.tsx
│   │   │   ├── PracticePage.tsx
│   │   │   ├── ProgressPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── components/
│   │   │   ├── layout/             # Header, Footer, ReaderShell
│   │   │   ├── toc/                # BookToc, PageToc
│   │   │   ├── content/            # ArticleBody, Environment, Equation, Exercise
│   │   │   ├── metadata/           # DifficultyBadge, PriorityBadge, SectionMeta
│   │   │   ├── progress/           # StatusMenu, ProgressBar, ActivityList
│   │   │   └── ui/                 # Button, IconButton, Dialog, Tooltip, Toast
│   │   ├── features/
│   │   │   ├── reader/             # 阅读进度、滚动定位、复制、快捷键
│   │   │   ├── store/              # 本地状态、迁移、导入导出
│   │   │   ├── search/             # MiniSearch 封装
│   │   │   ├── paths/              # 路径生成与进度
│   │   │   └── review/             # 间隔重复调度
│   │   ├── lib/                    # 纯函数：id、时间、格式化、storage
│   │   ├── types/                  # 内容与状态类型
│   │   └── styles/
│   │       ├── tokens.css
│   │       ├── base.css
│   │       ├── layout.css
│   │       ├── prose.css
│   │       ├── components.css
│   │       └── print.css
│   └── tests/
├── docs/
└── package.json                    # 教材构建依赖 + 内容编译脚本
```

---

## 4. 内容编译管线

### 4.1 阶段

1. **解析（parse）**：读取 34 章正文与 34 个解析文件，按 `STYLE_GUIDE.md` 抽取篇/章/节/环境/公式/习题/解析，输出原始切片 JSON（T01）。
2. **渲染（render）**：把每个 Markdown 切片渲染为 HTML；行内与独立公式用 KaTeX 渲染；环境包装为带 ID 的 `<section>`；习题/解析转为题卡结构。
3. **合并元数据（merge）**：把 `content/metadata` 中的 D/P、时长、先修、标签等合并进章节数据；缺失时保留 `null` 与 `metadataStatus: "pending"`。
4. **检索索引（index）**：抽取纯文本，生成 MiniSearch 索引与分片（Phase 2）。
5. **校验（validate）**：文本覆盖率、KaTeX 错误、ID 唯一、引用完整、习题解析匹配；任一 error 使构建失败。
6. **同步（sync）**：把 `content/generated` 复制到 `web/public/content`，供 Vite 静态服务。

### 4.2 Markdown 渲染策略

教材方言有限（段落、标题、列表、表格、引用、行内/独立公式、粗体/斜体、分隔线），不使用图片、代码块、HTML、脚注。因此采用**自定义块解析 + `marked` 渲染文本块**：

- 按行扫描，识别：
  - `##` / `###` 标题；
  - `$$ ... $$` 独立公式（可跨行）；
  - `**定义 1.1（…）**` 等环境标题；
  - `**证明**`、`**解**`；
  - Markdown 表格（首行 + 分隔行）；
  - 有序/无序列表（连续行）；
  - `---` 分隔线；
  - 其余为段落。
- 文本块内先保护行内公式 `$...$`（占位符），交给 `marked` 渲染，再替换为 KaTeX HTML。这样避免 `*`、`_`、`|` 等被 Markdown 误解析。
- 独立公式直接交 KaTeX，不经过 `marked`；先剥离 `\tag{...}`，由渲染器生成编号元素。
- 环境标题由解析器识别，正文作为环境内容；环境内部仍按上述块规则渲染。
- 表格单元格中的行内公式同样保护；表格不再二次解析公式。

关键风险与对策：

| 风险 | 对策 |
|---|---|
| `$$` 与 `\tag` 位置变体 | 解析器先做全量统计与边界测试；T01 报告列出所有变体 |
| 公式中含 `\$`、`\%` | 行内公式扫描用状态机，识别转义；不用简单正则 |
| 中文紧邻公式导致断行 | HTML 中公式为 inline-block；`word-break` 保持中文正常 |
| 表格中的 `|` 与公式冲突 | 仅当第二行是分隔行时识别为表格 |
| 环境中夹普通段落 | 环境边界明确；普通段落不吞入 |
| 习题内小问编号 | 只按顶层连续题号切分；小问保留在题内 |

### 4.3 公式渲染

```js
katex.renderToString(latex, {
  displayMode,
  throwOnError: true,     // 构建期必须暴露错误
  strict: 'warn',
  trust: false,
  output: 'htmlAndMathml',
});
```

- 构建期任一公式抛错 → 该章构建失败，列出 `章/行/公式片段`。
- 公式编号：`<span class="equation__number">(11.2)</span>`，`id="c11-eq-11.2"`；点击编号复制链接。
- 行内公式保留 KaTeX MathML；独立公式外层 `div.equation` 允许横向滚动。
- 复制：每个公式 `data-latex` 保存原文；点击复制按钮写剪贴板。
- 不在客户端加载 `katex` JS，仅加载 `katex.min.css` 与字体。

### 4.4 构建命令

根目录：

```json
{
  "scripts": {
    "content:inventory": "node tools/content/parse-book.mjs",
    "content:build": "node tools/content/build-content.mjs",
    "content:validate": "node tools/content/validate-content.mjs",
    "test:content": "node --test tools/content/*.test.mjs"
  }
}
```

`web/`：

```json
{
  "scripts": {
    "sync:content": "node ../tools/content/sync-web.mjs",
    "predev": "npm run sync:content",
    "dev": "vite",
    "prebuild": "npm run sync:content",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

一键构建（根）：`npm run content:build && npm --prefix web run build`。

### 4.5 内容校验

`validate-content.mjs` 必须检查：

1. 34 章、34 解析文件；章节集合与目录一致。
2. 每章一级节编号连续；每节至少有正文。
3. 环境 ID 全局唯一；证明有归属；例题有解（允许无解但警告）。
4. 公式 tag 章内连续；KaTeX 全部渲染成功；行内公式配对。
5. 习题题号连续；解析 1:1；解析无“略/显然/同前”（沿用既有规则）。
6. **文本覆盖率**：每节源 Markdown 去除 Markdown 标记与公式后得到的汉字/字母序列，必须与渲染后纯文本序列一致（允许空白差异）。这是防止“渲染吞正文”的硬闸门。
7. 全部锚点可解析：目录中的每个节/环境锚点都能在章节 HTML 中找到。
8. 元数据完整性：试点章每节有 D/P/时长/理由；先修 ID 存在；无自环。

---

## 5. 前端架构

### 5.1 路由与数据加载

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/syllabus" element={<SyllabusPage />} />
  <Route path="/learn/:chapterId" element={<ReaderPage />} />
  <Route path="/search" element={<SearchPage />} />
  <Route path="/paths" element={<PathsPage />} />
  <Route path="/paths/:mode" element={<PathDetailPage />} />
  <Route path="/practice" element={<PracticePage />} />
  <Route path="/practice/:chapterId" element={<PracticeChapterPage />} />
  <Route path="/progress" element={<ProgressPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

- `book.json` 在应用启动时加载一次（<150KB），用于全局目录与导航。
- 章节 manifest 在进入 `/learn/:id` 时 `fetch('/content/chapters/c11.json')`；模块级缓存，避免重复请求。
- 章节正文按节拆分为 `content/sections/c11-s4.html`，首屏只加载第一节；其余节并行请求并逐节注入。
- 习题拆分为 `content/exercises/c11.json`，接近视口时懒加载。
- 加载态显示骨架（标题、段落占位），不显示空白页。
- 章节不存在或加载失败显示错误页，不渲染半截内容。

### 5.2 阅读页组件树

```
ReaderPage
├── ReaderHeader (breadcrumb, progress, controls)
├── BookToc (left)
├── ChapterArticle
│   ├── ChapterIntro
│   ├── SectionBlock × n
│   │   ├── SectionHeading
│   │   ├── EnvironmentBlock (HTML)
│   │   ├── EquationBlock
│   │   └── MarkdownBlock
│   ├── SummaryBlock
│   └── ExerciseList
├── PageToc / SectionMeta (right)
└── MobileDrawers / BottomBar
```

- 静态正文以 `dangerouslySetInnerHTML` 注入，外层用 `React.memo`；状态变化（如标记）不重渲染正文。
- 公式复制、锚点高亮使用事件委托，避免为每个公式挂 React 事件。
- 滚动监听：`IntersectionObserver` 观察 `h2/h3` 与环境锚点；`scroll` 仅用于保存位置（passive + 500ms 节流）。

### 5.3 本地状态

```ts
interface Store {
  schemaVersion: 1;
  settings: Settings;
  progress: Record<SectionId, SectionProgress>;
  lastLocation?: LastLocation;
  exercises: Record<ExerciseId, ExerciseState>;
  notes: Record<SectionId, Note>;
  bookmarks: Bookmarks;
  review: Record<SectionId, ReviewState>;
  path: PathState;
  activity: ActivityEntry[];
}
```

- `StoreProvider` 在启动时读取 localStorage，执行迁移；无数据时创建默认值。
- 写入：`store.update()` 更新内存 → `queueSave()` 400ms 防抖 → `localStorage.setItem('qma:store:v1', JSON.stringify(store))`。
- 页面 `visibilitychange` 与 `beforeunload` 强制 flush。
- 写入失败（配额/隐私模式）设置 `storageAvailable=false`，UI 顶部提示，不阻塞阅读。
- 导出：JSON 含 `schemaVersion`、`exportedAt`、`appVersion`、`checksum`（简单 FNV/ SHA-256 via Web Crypto）。
- 导入：校验 schema、字段类型、ID 存在性；导入前把当前数据备份到 `qma:backup:<timestamp>`；提供覆盖/合并（Phase 3 先覆盖，合并后置）。

### 5.4 阅读定位

- URL hash 优先：`#c11-s4`、`#c11-thm-11.3`。
- 首次进入且无 hash：读取 `lastLocation`（若同章）→ 滚动到节；否则章首。
- 滚动时更新 `history.replaceState(null, '', '#current-section')`（节流 800ms），不产生历史记录。
- 保存 `lastLocation = {chapterId, sectionId, offsetRatio, at}`。
- 目录高亮：当前视口内最靠上的 `h2`；环境锚点用于分享，不驱动目录高亮。

### 5.5 主题与阅读偏好

- 主题：`light | dark | system`；`data-theme` 挂在 `<html>`；首屏内联脚本在 React 前设置，避免闪烁。
- 字号：`sm | md | lg | xl` → CSS 变量 `--prose-size`；正文 16/17/18/20px（移动端略小）。
- 宽度：`narrow | standard | wide` → `--measure` 30/34/40em。
- 证明：`open | closed`。
- 专注模式：隐藏左右栏，正文居中；`Esc` 或 `f` 退出。
- 偏好写入 store.settings，刷新保留。

### 5.6 检索（Phase 2）

- 构建期把每节、每个环境、每道题转为 search doc：
  ```json
  { "id": "c11-s4", "type": "section", "chapterId": "c11", "title": "11.4 概率不等式", "text": "……", "tags": ["不等式","尾部界"] }
  ```
- 索引字段：`title`（权重 3）、`text`（1）、`tags`（2）、`terms`（英文别名）。
- 分词：`Intl.Segmenter('zh-CN', { granularity: 'word' })`；对连续汉字额外生成 2-gram；英文转小写、去停用词。
- 查询：别名扩展（`期望` → `expectation`、`mean`），MiniSearch `combineWith: 'AND'`，短查询（1 字）回退子串扫描。
- 索引按章分片（`search/c01.json`…），搜索页首次加载合并；或单文件（预计 <2MB gzip）先单文件，Phase 2 实测后决定。
- 结果高亮：在纯文本片段上做区间标记，不直接注入 HTML，避免 XSS。

### 5.7 安全

- 内容是本地构建产物，但仍按不可信输入处理：渲染后的 HTML 由构建期生成，不使用用户输入拼接 HTML；笔记用 Markdown 渲染时禁用原始 HTML（`marked` 配置 `renderer.html = () => ''` 或 sanitize）。
- 导入 JSON 做结构校验，不执行任意代码。
- 不使用 `eval`、`new Function`、动态 `<script>`。
- 外部链接 `rel="noopener noreferrer"`。

---

## 6. 性能预算

| 指标 | 预算 | 验证 |
|---|---|---|
| 首屏 JS（gzip） | ≤ 250KB | `vite build` 报告 |
| 首屏 CSS（gzip） | ≤ 60KB（不含 KaTeX 字体） | 构建报告 |
| book.json | ≤ 80KB | 文件大小 |
| 单章 manifest | ≤ 300KB 原始 | 文件大小 |
| 单节 HTML | ≤ 900KB 原始 / ≤ 120KB gzip | 文件大小 + gzip |
| 单章习题 JSON | ≤ 3MB 原始 / ≤ 350KB gzip | 文件大小 + gzip |
| 首屏 | 只加载章 manifest + 第一节，不请求其他节/习题 | Network 面板 |
| 阅读页首次正文 | ≤ 1.5s（本地/宽带） | Lighthouse/手动 |
| 目录滚动高亮 | 无长任务 > 100ms | Performance 面板 |
| 移动端 360px | 无横向滚动 | Playwright/手动 |

优化手段：章节按路由懒加载；公式预渲染；静态正文 memo；搜索索引懒加载；KaTeX 字体按需；避免整章 React 状态。

---

## 7. 测试策略

### 7.1 单元

- 内容解析：章/节/环境/公式/习题/解析（T01 测试）。
- HTML 渲染：C01 全章快照；表格、公式、环境、习题各 1 个 golden 样本。
- 存储：默认值、迁移、损坏 JSON、配额异常、导入校验。
- 复习调度：盒子升降、到期计算、时区边界。
- 路径生成：P0 闭包、先修拓扑、无环。
- 搜索分词：中文词、英文、别名、单字。

### 7.2 集成

- 阅读页渲染：章节标题、环境、公式、习题解析展开。
- 标记状态：localStorage 写入、刷新恢复、进度统计更新。
- 目录：展开、当前项、跳转。
- 主题/字号/宽度持久化。

### 7.3 端到端（Phase 2/5）

- 首页 → 目录 → 阅读 → 标记 → 下一节。
- 深链 `#c11-thm-11.3` 定位。
- 移动端 360px 完整闭环。
- 搜索 → 结果 → 阅读 → 返回。
- 导出 → 清空 → 导入 → 状态恢复。

### 7.4 内容 QA（每次构建）

- `npm run content:validate` 必须 0 error。
- 抽查脚本：随机 20 个环境，源文 vs 渲染纯文本比对。
- 公式错误清单为空。
- 锚点完整性。

---

## 8. 部署

### 8.1 本地

```bash
# 根目录：生成内容
npm run content:build

# 前端
npm --prefix web install
npm --prefix web run dev
```

### 8.2 静态构建

```bash
npm run content:build
npm --prefix web run build
# 产物：web/dist/
```

`vite.config.ts`：

```ts
export default defineConfig({
  plugins: [react()],
  base: process.env.QMA_BASE ?? '/',
  build: { outDir: 'dist', sourcemap: false },
});
```

### 8.3 GitHub Pages（Phase 6）

- `base: '/<repo>/'`；路由使用 `BrowserRouter` + `404.html` 复制 `index.html`，或改用 `HashRouter`。
- 决策：优先 `BrowserRouter` + 404 fallback（URL 更干净）；若 Pages 限制导致问题，再切 HashRouter。
- 构建产物不含 `src/` 内容源；若内容不公开，只发布 `dist/`（静态 HTML 仍包含正文，需内容许可确认）。
- 代码仓库与内容仓库可分离：`quant-math-academy`（代码）+ 私有内容包；开源版可附带 1–2 章示例内容。

### 8.4 环境变量

- `QMA_BASE`：部署子路径。
- `QMA_CONTENT_DIR`：内容编译输出目录（默认 `content/generated`）。
- 无密钥、无服务端配置。

---

## 9. 架构决策记录（ADR）

| ID | 决策 | 理由 | 代价 |
|---|---|---|---|
| ADR-01 | 纯静态 SPA，无后端 | 单用户、数据本地、部署简单、隐私好 | 无多设备同步；需导入导出 |
| ADR-02 | Vite 而非 Next.js | 34 个静态章节无需 SSR；构建链更轻；内容预渲染已解决首屏 | SEO 较弱（个人工具可接受） |
| ADR-03 | KaTeX 构建期预渲染 | 公式稳定、无闪烁、客户端小 | 构建变慢；需处理所有边界 |
| ADR-04 | 知识点 = 一级节 | 符合教学单元与复习粒度；避免 1,300 个状态点 | 节内细粒度进度不可见（用环境锚点补偿） |
| ADR-05 | 单一 localStorage 根对象 | 原子导出/导入、迁移简单、避免多 key 不一致 | 大对象写入；需防抖 |
| ADR-06 | 原生 CSS tokens，不用 Tailwind | 精确控制排版；避免同质化视觉 | 需自建组件样式 |
| ADR-07 | 客户端 MiniSearch | 无需服务端；教材规模可承受 | 首次搜索需加载索引 |
| ADR-08 | 元数据与正文分离 | 标注可校正、可追溯；不污染教材 | 需维护两套文件与校验 |

---

## 10. 风险与缓解

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| Markdown 边界导致渲染丢内容 | 中 | 高 | T01 全量审计；覆盖率硬校验；代表章逐字抽查 |
| KaTeX 对个别命令不支持 | 低 | 高 | 构建期 `throwOnError`；错误清单；必要时局部宏兼容 |
| 单章 HTML 过大 | 中 | 中 | 按章加载；gzip；Phase 2 实测后按节拆分 |
| 4 章标注工作量大 | 高 | 中 | 先试点 + 标注手册 + 校验器；全书分批 |
| AGY 实现偏离设计 | 中 | 高 | 任务书 + 验收清单 + 实际运行截图审查 |
| 本地数据丢失 | 低 | 高 | 自动保存 + 导出 + 导入备份 + 迁移测试 |
| 内容版权限制开源 | 中 | 高 | 代码/内容分离；Phase 6 独立审计；未经确认不发布 |

---

## 11. Phase 1 技术交付清单

1. `tools/content/`：解析 + HTML 渲染 + 校验 + 同步脚本。
2. `content/generated/`：34 章结构化数据（至少 4 章完整 HTML）。
3. `web/`：Vite 应用、设计系统 CSS、首页/目录/阅读页、状态存储、主题与响应式。
4. `content/metadata/chapters/{c01,c08,c11,c33}.json`：试点章标注。
5. 测试：解析器测试、渲染 golden、存储测试、阅读页集成测试。
6. `docs/`：本文件、内容模型、设计系统、验收记录。
7. 启动与构建说明：`README.md`（Phase 1 版本）。

---

## 12. 验收命令

```bash
npm run content:inventory      # 解析与统计
npm run content:build          # 生成站点内容
npm run content:validate       # 0 error 才通过
npm run test:content           # 解析/渲染测试
npm --prefix web run build     # 类型检查 + 生产构建
npm --prefix web run test      # 前端单元/集成测试
```

Phase 1 的“完成”以以上命令全部通过、且人工按验收清单检查为准，不以口头报告为准。
