# T03 — 内容 HTML 渲染管线与保真校验（Phase 1 核心工程）

## 1. 任务定位

把 T01 产出的结构化 Markdown 切片，渲染为网站可直接消费的 HTML + 元数据 + 索引，并建立**内容保真校验**。这是 Phase 1 阅读 MVP 的地基：后续 React 应用只负责布局与交互，不在浏览器里解析 Markdown、不跑 KaTeX。

执行者：AGY。验收者：DSH。

## 2. 输入与输出

### 2.1 输入

- `content/generated/book.json`、`content/generated/chapters/c01..c34.json`（T01）。
- `content/metadata/chapters/*.json`（T02；可能尚未完成，缺失时按 `null` 处理，不得伪造）。
- `src/chapters/*.md`、`src/solutions/*.md`（只读校验收据）。
- 现有依赖：`marked@15.0.12`、`katex@0.16.22`（已在根 `node_modules`，不得升级/新增依赖）。

### 2.2 输出

```
content/generated/site/
  book.json                     # 篇/章/节目录 + 标注状态 + 可用性 + 统计
  chapters/c01.json ... c34.json
  manifest.json                 # 构建统计、大小、耗时、版本
  validation.json               # 覆盖率/公式/锚点/匹配结果
  sections/                     # 仅当单章 JSON 超过阈值时按节拆分（见 6.4）
```

单章 JSON：

```json
{
  "schemaVersion": 1,
  "chapterId": "c11",
  "number": 11,
  "title": "期望、方差、矩与概率不等式",
  "partId": "part-3",
  "pilot": true,
  "metaStatus": "reviewed",
  "introHtml": "<p>……章首导言……</p>",
  "summaryHtml": "<h2 id=\"c11-summary\">本章小结</h2><p>……</p>",
  "sections": [
    {
      "id": "c11-s4",
      "number": "11.4",
      "title": "概率不等式",
      "anchor": "c11-s4",
      "html": "<p>……</p><section class=\"env env--theorem\" id=\"c11-thm-11.10\" ...>…</section>",
      "subsections": [
        { "id": "c11-s4-1", "number": "11.4.1", "title": "……", "anchor": "c11-s4-1" }
      ],
      "meta": {
        "difficulty": "D3",
        "priority": "P0",
        "minutes": 70,
        "examFrequency": "high",
        "tags": ["概率论", "不等式"],
        "applications": ["回测误差控制"],
        "prerequisites": [{ "id": "c11-s1", "strength": "required" }],
        "related": ["c11-s6"],
        "learningObjective": "……",
        "rationale": "……",
        "reviewed": true
      },
      "exerciseIds": ["c11-ex-7", "c11-ex-20"]
    }
  ],
  "exercises": [
    {
      "id": "c11-ex-7",
      "number": 7,
      "sectionId": "c11-s4",
      "questionHtml": "<p>……题干……</p>",
      "solutionHtml": "<p>……解析……</p>"
    }
  ],
  "environmentIndex": [
    { "id": "c11-thm-11.10", "kind": "theorem", "number": "11.10", "title": "Markov 不等式", "sectionId": "c11-s4", "anchor": "c11-thm-11.10" }
  ],
  "equationIndex": [
    { "id": "c11-eq-11.11", "tag": "11.11", "sectionId": "c11-s4", "latex": "\\mathbb P(X \\ge a) \\le \\frac{\\mathbb E[X]}{a}" }
  ],
  "stats": { "sections": 6, "environments": 24, "equations": 18, "exercises": 20, "htmlBytes": 0 }
}
```

- `meta` 缺失时为 `null`；`metaStatus` 为 `pending|draft|reviewed`。
- `html` 只含节正文，不含 `##` 节的 `<h2>`；节标题由 React 渲染，但 `html` 内可含 `###` 的 `<h3>`。
- `summaryHtml` 可含自己的 `<h2>`（阅读页按特殊节渲染）。
- 不重复存环境 HTML；环境在 `html` 内，索引只存元信息。
- `questionHtml` / `solutionHtml` 不含题号；题号由数据字段渲染。

## 3. 渲染管线

建议文件：

```
tools/content/
  render.mjs            # 纯函数：Markdown/KaTeX/环境 → HTML
  build-content.mjs     # 主流程：读取 → 渲染 → 合并元数据 → 输出 → 校验
  validate-content.mjs  # 覆盖率/锚点/公式校验
  sync-web.mjs          # 复制到 web/public/content
  render.test.mjs
  coverage.test.mjs
```

根 `package.json` 增加：

```json
{
  "scripts": {
    "content:build": "node tools/content/build-content.mjs",
    "content:validate": "node tools/content/validate-content.mjs",
    "content:sync": "node tools/content/sync-web.mjs",
    "test:content": "node --test tools/content/*.test.mjs"
  }
}
```

### 3.1 文本块与 KaTeX

- 使用 `marked` 渲染段落、列表、表格、引用、`###` 标题、粗体/斜体。
- **先保护行内公式**：扫描文本，遇到未转义的 `$` 找到配对 `$`，把 `$...$` 替换为 `@@QMA_MATH_0@@` 占位符；占位符只含字母数字下划线，避免被 Markdown 误解析。渲染完 marked 后替换为 KaTeX HTML。
- 行内公式必须处理 `\$` 转义；不得用简单正则 `/\$([^$]+)\$/` 直接切（教材虽少，仍要正确）。
- 独立公式 `$$ ... $$` 不经过 marked；由块级扫描器识别（可单行、可跨行），剥离 `\tag{...}`，渲染为：

```html
<div class="equation" id="c11-eq-11.11" data-latex="\mathbb P(...)\le ...">
  <div class="equation__body"><!--QMA_MATH_START-->KATEX<!--QMA_MATH_END--></div>
  <span class="equation__number">(11.11)</span>
</div>
```

- 无 tag 的公式：无 `id`、无编号，仍渲染为 `.equation`。
- 所有 KaTeX 调用：`throwOnError: true`、`strict: 'warn'`、`trust: false`、`output: 'htmlAndMathml'`。构建期任一失败立即报错，并给出章/节/公式片段；不得跳过。
- 行内公式包裹：`<span class="math math-inline" data-latex="..."><!--QMA_MATH_START-->KATEX<!--QMA_MATH_END--></span>`。
- 数学包裹的注释用于覆盖率校验时剥离公式，勿省略。

### 3.2 环境块

教材存在三种关键写法，必须全部支持：

1. **独立标题行**：`**定理 11.10（Markov 不等式）**`
2. **标题与正文同一行**（C08 全章，约 99 处）：
   `**定义 8.1（正交矩阵）**　设 ...`
   解析时以闭合 `**` 为界，前半为标题，后半（去掉一个全角空格/普通空格）为环境正文首段。
3. **无编号注记**：`**注记**`、`**注记（...）**`；`number` 为 `null`，ID 用 T01 的 `cXX-note-N`；不得伪造正式编号。

环境类型：`definition|theorem|lemma|proposition|corollary|axiom|example|note`。

输出结构：

```html
<section class="env env--theorem" id="c11-thm-11.10"
         data-env-kind="theorem" data-env-number="11.10">
  <div class="env__label">
    <span class="env__kind">定理</span>
    <b class="env__number">11.10</b>
    <span class="env__title">（Markov 不等式）</span>
    <a class="env__anchor" href="#c11-thm-11.10" aria-label="复制本节链接">#</a>
  </div>
  <div class="env__body">
    <p>……</p>
    <div class="equation">…</div>
  </div>
</section>
```

- 定义：`env--definition`；定理/引理/命题/推论/公理：`env--theorem`（用 `data-env-kind` 区分）；例题：`env--example`；注记：`env--note`。
- 定理类环境的 ID 必须与 T01 环境 ID 完全一致；若 T01 未生成，构建失败。
- 环境正文必须包含标题行之后的全部内容；不得吞掉后续普通段落，也不得漏掉同行正文。
- 环境边界：下一个环境标题、`###`/`##` 标题、`---`、文件/节尾。

### 3.3 证明与解

- 证明开始：单独一行 `**证明**`，或 `**证明**（...）`（括号内容作为说明）。使用原生 `<details>`，保证无 JS 也可展开、键盘可操作：

```html
<details class="proof" data-proof-of="c11-thm-11.10" open>
  <summary class="proof__label">证明<span class="proof__note">（...）</span></summary>
  <div class="proof__body">…</div>
  <p class="proof__qed">□</p>
</details>
```

- 证明结束：单独一行 `□` 或 `∎`；结束符保留在 `proof__qed`，不重复输出到正文。
- `**证明思路**`、`**证明范围与思路**` 等不是正式证明，渲染为 `<div class="proof-note">`，标签保留原文，不并入证明、不生成 `data-proof-of`。
- 解：单独一行 `**解**`，归属于前一个例题；输出 `<div class="solution">`，标签“解”，正文到下一个环境/节/`---`。
- 若证明/解无归属，照常渲染并记 warning；不得丢内容。

### 3.4 表格、列表、分隔线

- 表格：GFM 表格；外层 `<div class="table-wrap">`；单元格内行内公式照常渲染。
- 列表：`marked` 输出；不得把习题列表误渲染进节正文（习题单独处理）。
- `---`：输出 `<hr class="section-rule">`，并作为环境边界。
- 引用块：`<blockquote>`；教材少用，保留结构。
- 原始 HTML：内容中不应存在；若出现，转义为文本并记 warning（防注入）。

### 3.5 习题与解析

- 题号：T01 的 `number`；`questionHtml` 不包含 `1.` 前缀；若 T01 的 markdown 含前缀，渲染前剥离。
- 题干可含多段、公式、列表、小问；全部保留。
- 解析：`solutionHtml` 可含多段/公式；不得把解析混入题干。
- 输出 `<article class="exercise" data-exercise-number="7">` 由 React 包装；JSON 只存 HTML 片段，不存外层 article（避免重复）。
- 习题与解析数量/题号必须与 T01 一致；缺失解析为 error。

## 4. 元数据合并

- 读取 `content/metadata/chapters/cXX.json`（若存在）。
- 章级：`summary`、`whyStudy`、`prerequisites`、`metadataStatus`。
- 节级：`difficulty`、`priority`、`minutes`、`examFrequency`、`tags`、`applications`、`prerequisites`、`related`、`learningObjective`、`keyFormulas`、`rationale`、`reviewed`。
- 只合并存在的节；缺失为 `null`，`metaStatus` 为 `pending`。
- 不把 `reviewed:false` 的草稿伪装成正式标注：`metaStatus` 为 `draft`，UI 可显示“草稿”；T03 只透传。
- 元数据中的 ID 必须存在；不合法时记 error（T02 的校验器会查，T03 再查一次合并结果）。

## 5. 目录与索引

`book.json`：

```json
{
  "schemaVersion": 1,
  "title": "量化数学进阶教材",
  "subtitle": "Quant Math Academy",
  "parts": [{ "id": "part-1", "order": 1, "title": "数学语言与分析基础", "chapterIds": ["c01","c02","c03"] }],
  "chapters": [{
    "id": "c11", "number": 11, "title": "期望、方差、矩与概率不等式",
    "slug": "expectation-moments-inequalities", "partId": "part-3",
    "pilot": true, "metaStatus": "reviewed", "sectionCount": 6,
    "stats": { "sections": 6, "environments": 24, "equations": 18, "exercises": 20 }
  }],
  "pilotChapterIds": ["c01","c08","c11","c33"]
}
```

- `pilot` 由常量 `['c01','c08','c11','c33']` 决定。
- 不在此文件放全文；只放目录与统计。

`environmentIndex`、`equationIndex` 用于 Phase 2 搜索/关联与 Phase 1 复制链接；必须与 HTML 中的锚点一致。

## 6. 校验（硬闸门）

`validate-content.mjs` 必须检查并写 `validation.json`：

### 6.1 文本覆盖率

- 对每节：
  1. 源文本 = T01 `section.markdown`。
  2. 渲染文本 = 该节 `html`。
  3. 两边都去掉 Markdown 标记 / HTML 标签 / 公式（利用 `QMA_MATH_START/END` 注释剥离）/ 空白 / 标点，只保留 CJK + 字母 + 数字。
  4. 两个序列必须完全一致；差异记 error，输出首个差异位置与前后 40 字。
- 章首导言、本章小结、每道习题、每道解析同样做覆盖率校验。
- 允许的差异：无。若实现上只能做空白归一化，必须在报告中说明并给出理由，但不能放过整段丢失。

### 6.2 公式

- 所有行内/独立公式 KaTeX 渲染成功；error = 0。
- 独立公式数量、tag 数量与 T01 一致；tag 章内连续。
- 每个 `equationIndex.id` 在 HTML 中存在且唯一。
- 公式 `data-latex` 与 T01 原文一致（空白归一化）。

### 6.3 锚点

- 所有节/环境/公式/习题 ID 全局唯一。
- `book.json` 中每个节 anchor 在章节 HTML 中存在。
- 环境索引中的每个 ID 在 HTML 中存在。
- 重复 ID、缺失锚点、空 `id` 均为 error。

### 6.4 结构

- 34 章、8 篇；篇归属与 T01 一致。
- 每章节数、环境数、公式数、习题数与 T01 统计一致；不一致为 error。
- 习题与解析 1:1；缺失/多余为 error。
- 环境类型、编号与 T01 一致；不得新增/删除。
- 若单章 JSON > 1.2MB（原始），允许把 `sections[].html` 拆到 `sections/cXX-sN.html`，章 JSON 中改为 `htmlPath`；但必须保持同一 schema 的读取兼容，并在 `manifest.json` 记录拆分。优先不拆，先报告实际大小。

### 6.5 输出

`validation.json`：

```json
{
  "errors": [{ "code": "TEXT_COVERAGE_MISMATCH", "chapterId": "c11", "sectionId": "c11-s4", "message": "…", "sample": "…" }],
  "warnings": [],
  "summary": { "chapters": 34, "sections": 0, "environments": 0, "equations": 0, "exercises": 0, "errors": 0, "warnings": 0 }
}
```

- error 阻断构建（进程退出码 1）；warning 允许通过但必须列出。
- 覆盖率 error 必须能定位到节与字符位置，不能只报“失败”。

## 7. 构建产物与前端同步

- `build-content.mjs` 生成 `content/generated/site`。
- `sync-web.mjs` 把 `content/generated/site` 复制到 `web/public/content`（若 `web/` 存在；不存在则创建目录并跳过）。
- 输出确定性：两次构建除耗时字段外一致；`manifest.json` 可含 `generatedAt`，但章节 JSON 不含时间戳。
- 构建日志打印：章节数、节数、环境数、公式数、习题数、总耗时、最大章 JSON 大小、error/warning 数。

## 8. 测试

`tools/content/render.test.mjs`：

1. C01 一段普通文本 + 行内公式 → 含 `.math-inline` 且文本完整。
2. C01 定理 1.2 + 证明 → 环境 ID、证明块、QED。
3. C08 同行环境定义 8.1 → `id="c08-def-8.1"`，正文“设 ...”在环境内。
4. C01 公理 1.6 → `id="c01-axiom-1.6"`，类型 `axiom`。
5. C06 无编号注记 → `number=null`，ID 存在。
6. 含 `\begin{bmatrix}` 的公式 → 渲染成功，无 KaTeX error。
7. 含 `\tag{11.11}` 的公式 → 编号 `(11.11)`，tag 不在 KaTeX 文本中重复。
8. 真实表格 → `<table>`、单元格文本完整。
9. 习题 + 解析 → 题号、题干、解析分离。
10. 原始 HTML 注入 → 被转义，不产生 `<script>`。

`tools/content/coverage.test.mjs`：

1. C01、C08、C11、C33 四章覆盖率 100%。
2. 所有 34 章公式渲染 error = 0。
3. 所有 34 章锚点唯一。
4. 习题解析 1:1（与 T01 一致）。

## 9. 明确不做

- 不做 React/UI/路由/样式。
- 不修改 `src/` 教材正文。
- 不修改 T01 的 `content/generated/chapters/*.json`（只读）；如需补字段，可新增 `content/generated/site`，或在 T01 解析器中向后兼容地新增字段并重跑。
- 不做搜索索引（Phase 2）。
- 不做全书标注（T02）。
- 不新增依赖、不升级 marked/katex。
- 不把正文压缩、摘要化或“优化”措辞。

## 10. 验收标准

1. `npm run content:build` 成功，34 章全部产出；`content:validate` 0 error。
2. 四章覆盖率 100%；34 章公式 error = 0；锚点唯一；习题解析 1:1。
3. C08 同行环境、C01 公理、无编号注记、表格、矩阵、tag 全部通过测试与人工抽查。
4. 输出确定性；两次构建章节 JSON 一致。
5. 运行 `npm run test:content` 全部通过。
6. `docs/audit/render-report.md` 报告：统计、构建耗时、最大章大小、error/warning、已知限制、抽查样本。
7. 未修改 `src/`；未新增依赖。

## 11. 交付报告格式

- 新增/修改文件清单。
- 运行命令与退出码。
- 34 章统计（节/环境/公式/习题）与总耗时。
- 最大章 JSON 大小（原始 + gzip 估算）。
- 覆盖率/公式/锚点/匹配结果。
- 5 个边界样例的渲染片段（C08 同行环境、公理、无编号注记、表格、tag）。
- 已知限制与 Phase 4/5 建议。
- 是否修改过 `src/`（必须是“否”）。
