# T09 知识关系图验收报告 (Knowledge Association Graph Acceptance)

- **任务编号**：T09
- **执行时间**：2026-11-09
- **状态**：验收通过 (Passed)
- **范围限制**：只修改 `tools/content/`、`web/`、`docs/audit/`；未修改 `src/` 教材正文；未伪造未标注章的边；未引入外部图数据库或新依赖。

---

## 1. 核心图指标与规模审计

静态知识关系图由 `tools/content/build-graph.mjs` 从 `content/generated/site/book.json` 及 `content/metadata/chapters/*.json` 构建生成，输出至 `content/generated/site/graph.json` 并同步至 `web/public/content/`。

| 指标项 | 规范要求 | 实际测量值 | 状态 |
|---|---|---|---|
| **全书节点覆盖** | 严格 219 节 (34 章) | **219 节点** (覆盖全部 34 章) | 通过 |
| **已评审标注节点** | 试点章及 T10 Batch 1/2 | **25 节点** (T10 Batch 1 为 44 节点；T10 Batch 2 当前为 **60 节点**，覆盖 10 章) | 通过 |
| **未标注留白节点** | 诚实留白，无伪造 | **194 节点** (T10 Batch 1 为 175 节点；T10 Batch 2 当前为 **159 节点**) | 通过 |
| **先修依赖边 (有向)** | 仅来自已标注节 | **47 条先修边** (T10 Batch 1 为 79 条；T10 Batch 2 当前为 **108 条先修边**) | 通过 |
| **横向关联边 (无向)** | 严格去重 (a < b) | **61 条无向关联边** (T10 Batch 1 为 87 条；T10 Batch 2 当前为 **124 条关联边**) | 通过 |
| **DAG 环路状态** | 必须为严格 DAG (0 环) | **0 环 (Strict DAG)**，深度优先三色法校验 | 通过 |
| **先修最大传递深度** | 最多 3 层 | **3 层** (直接先修 + 2层传递 + 3层传递，去重防环) | 通过 |
| **反向索引 (incoming)** | 记录每节被引用次数与明细 | **全量生成** (包含作为先修引用与横向相关引用) | 通过 |
| **产物文件体积** | 静态 JSON 瘦身 | **graph.json: 135.6 KB (gzip 24.5 KB)** (T09 初始为 115.5 KB) | 通过 |

---

## 2. 功能实现与收口缺陷治理

### 2.1 构建器与图算法 (`tools/content/build-graph.mjs`)
1. **全节点拓扑初始化**：遍历 `book.json` 抽取 219 节，保留章归属、节编号、DisplayTitle。
2. **元数据关联与权限门禁**：仅读取评审通过 (`reviewed: true`) 的试点章，未标注章绝不生成虚假先修或相关边。
3. **严格 DAG 环路检测**：采用 DFS 三色染色法（0: 未访问，1: 递归栈中，2: 访问完成）；若发现回边即抛出包含完整环路路径的异常（如 `Cycle detected: A -> B -> A`）。
4. **传递先修链 (Ancestors)**：以当前节为起点，广度/深度扩展计算深度 1、2、3 层的先修依赖节点，去重并过滤环。
5. **反向索引 (Incoming Citations)**：全量记录每个节点被哪些节引用（作为必要先修、有益先修或横向关联），并统计 `count`。
6. **校验防御**：未知 Section ID 报错、自引自身报错、无向关联重复边自动归一。

### 2.2 标题 LaTeX 泄漏治理 (`web/src/lib/format.ts`)
- **根因分析**：全书仅 C01 1.5 标题为 `数列极限与 $\varepsilon-N$ 语言`。在目录、图谱 chip、搜索结果标题等纯文本场景下 KaTeX 未解析，直接泄漏源码。
- **解决方案**：实现共享函数 `formatDisplayTitle`，将 `$\varepsilon-N$` 转换为规范的 `ε-N` 并去除多余 `$` 标记。
- **覆盖范围**：全面应用到 `ReaderBookToc`、`ReaderPageToc`、`ChapterList`、`GraphPage`、`SearchPage` 结果标题、`ReaderPage` 当前节标题、`ReaderSubnav` 顶栏章节标题；不修改教材原文与元数据。
- **测试覆盖**：新增 `web/tests/format.test.ts`（4 项测试），确保全部边界输入均正规化。

### 2.3 前端知识关系页 (`/graph` -> `web/src/routes/GraphPage.tsx`)
1. **顶栏核心指标**：展示 219 知识点、25 节已标注、47 条先修关系、61 条相关关联、0 环严格 DAG、最深 3 层。
2. **列表列头对齐**：
   - 章节列表新增可见的 4 列网格列头：`本节 / 先修 / 横向相关 / 引用`；
   - 桌面端（>960px）采用 `grid-template-columns: 280px 1fr 1fr 140px;` 与数据行精确对齐；
   - 移动端（<=960px）自动隐藏该列头，各行保持优雅折叠与标签自解释。
3. **居中与横向溢出防御**：
   - 页面容器配置 `max-width: 1280px; margin: 0 auto; box-sizing: border-box;`；
   - 小屏（<=480px）统计横幅网格自适应为 `1fr 1fr`；
   - 实测 1440px / 1024px / 390px 视口无横向溢出（详见第 4 节实测数据）。
4. **多维筛选与交互**：
   - 范围筛选（全部 219 节 / 只看已标注 25 节）；
   - 34 章下拉筛选；
   - 优先级筛选（全部 / P0 核心必须 / P1 进阶推荐）；
   - 支持 `?section=c11-s4` 陶土红高亮并居中平滑滚动。

### 2.4 阅读页右栏增强 (`web/src/components/reader/ReaderSectionInfo.tsx`)
1. **先修知识链**：展示 2–3 层传递先修（标明“直接 · 必要”、“2层传递 · 必要”等深度标记）；点击直达对应小节。
2. **被引用情况**：展示有哪些后续章节将本节列为先修（如 C11.4 被 C11.6 列为先修）；无引用时诚实显示“暂无”。
3. **全局跳转**：底部提供 `<Link to={`/graph?section=${section.id}`}>查看完整知识关系 →</Link>`。
4. **未标注章节防护**：无元数据时不捏造任何先修链或被引用信息，仅显示“标注完善中”。

### 2.5 全站入口接入
- **目录页**：在 `SyllabusPage.tsx` 页面 header 副标题加入 `知识关系图 →` 文字链接；未改动主导航栏。
- **阅读页**：右栏“查看完整知识关系”直达 `/graph?section=...`。
- **直接访问**：全站支持 `/graph` 路由直达。

---

## 3. 测试与构建全绿验证

### 3.1 内容管线测试 (`npm run test:content`)
- `tools/content/build-graph.test.mjs`：9 项测试全部通过；
- 全书内容校验共 6 个测试套件，**52 项测试 100% 通过**（0 error，0 warning）。

### 3.2 Web 自动化测试 (`npm --prefix web test`)
- `web/tests/format.test.ts`：4 项测试全部通过；
- `web/tests/GraphPage.test.tsx`：7 项测试全部通过；
- `web/tests/ReaderSectionInfo.test.tsx`：3 项测试全部通过；
- 全站 Web 测试共 12 个测试套件，**69 项测试 100% 全部通过**（无回归、无失败）。

### 3.3 生产构建 (`npm --prefix web run build`)
- TypeScript 类型检查 (`tsc -b`)：0 错误；
- Vite 打包产物体积：`index.html` 1.26 KB，`index.css` 8.42 KB gzip，`index.js` **91.82 KB gzip**（远低于 250 KB 预算约束）。

---

## 4. 浏览器真实渲染与横向溢出实测

通过 Chrome CDP 驱动生产预览环境（`vite preview`），对 1440px、1024px、390px 视口进行了真实溢出检测与截屏：

### 4.1 横向溢出检测结果
```json
[overflow check] /graph (1440px): {"innerWidth":1440,"scrollWidth":1425,"bodyScrollWidth":1425,"hasOverflow":false}
[overflow check] /graph (1024px): {"innerWidth":1024,"scrollWidth":1009,"bodyScrollWidth":1009,"hasOverflow":false}
[overflow check] /graph (390px):  {"innerWidth":390, "scrollWidth":390, "bodyScrollWidth":390, "hasOverflow":false}
```
三档视口下 `scrollWidth <= innerWidth` 且 `hasOverflow === false`，完全无横向滚动条或溢出破损。

### 4.2 交付截图清单
1. **`web/screenshots/graph-desktop-1440.png`**：1440px 桌面端 `/graph`，展示 1280px 居中容器、5 项核心指标横幅、筛选条与对齐列头（`本节 / 先修 / 横向相关 / 引用`）；
2. **`web/screenshots/graph-mobile-390.png`**：390px 移动端 `/graph`，验证列头响应式隐藏、卡片自然折叠、无横向溢出；
3. **`web/screenshots/reader-rail-citations-1440.png`**：1440px `/learn/c11#c11-s4` 阅读页右侧栏，滚动聚焦展示完整的“先修知识链”、“被引用情况”卡片以及底部的“查看完整知识关系 →”跳转入口；
4. **`web/screenshots/graph-1024.png`**：1024px 平板视口 `/graph`，验证居中与布局对齐；
5. **`web/screenshots/graph-highlight-c11-s4-1440.png`**：带 `?section=c11-s4` 的高亮卡片。

---

## 5. 已知限制与后续建议 (T10)

1. **标注覆盖局限**：当前全书 219 节中仅 25 节完成 D/P/先修/相关复核，其余 194 节关系边为空（符合 Phase 2 阶段性规范）；
2. **后续任务衔接 (T10)**：Phase 2 T10 将以每批 2–3 章的节奏推进全书标注（按篇依次起草、复核、校验），逐步点亮其余 30 章的先修与相关边。
