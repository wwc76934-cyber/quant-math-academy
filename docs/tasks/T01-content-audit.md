# T01 — 教材资产审计与结构化解析器（Phase 0）

## 1. 任务定位

这是 Quant Math Academy 项目的第一个执行任务，只做**教材理解、结构抽取与校验**，不做网站 UI。

执行者：AGY（Antigravity）。
验收者：DSH 主负责人。

目标：把现有 34 章 Markdown 教材从“可直接构建 PDF 的源文件”变成“可被网站稳定消费的结构化数据”，同时给出可信的资产审计报告。解析器必须**只读源文件、不重写正文**，任何内容修改都不在本任务范围内。

## 2. 必须先读的文件

1. `STYLE_GUIDE.md` — 全书写作与编号规范，是解析规则的权威依据。
2. `tasks/current-status.md` — 教材完成状态与已知问题。
3. `scripts/validate.mjs`、`scripts/lint-math.mjs`、`scripts/check-references.mjs` — 现有校验逻辑，可复用其判定口径，但不要修改。
4. `scripts/build.mjs`、`scripts/make-numbers.mjs` — 现有 Markdown → HTML/PDF 的处理方式，了解公式与编号处理。
5. `src/chapters/C01-mathematical-language.md`、`C11-expectation-moments-inequalities.md`、`C08-matrix-decompositions.md`、`C33-derivative-pricing.md` — 四类代表章节，逐段精读。
6. `src/solutions/C01-solutions.md` — 解析文件格式样本。
7. 其余 30 章正文与 33 个解析文件 — 用脚本统计后抽样核对，不要只读开头。

## 3. 交付物

### 3.1 审计报告 `docs/audit/textbook-audit.md`

必须包含真实数字，不得用“约”“若干”代替可从源文件计算的量。至少覆盖：

1. **资产清单**：34 章正文与 34 个解析文件的路径、字符数、字节数、SHA-256；章号与文件名映射；是否存在多余或缺失文件。
2. **篇章结构**：8 篇 34 章的归属；每章的一级节（`## x.y`）与二级节（`### x.y.z`）数量、标题清单（可放到附表或 JSON，正文给汇总）。
3. **数学环境清单**：定义、定理、引理、命题、推论、例、注记、证明、解各自的计数；章内编号连续性检查结果。注意定义/定理/引理/命题/推论共用一套章内序号，例题独立编号。
4. **公式体系**：行内公式与独立公式数量；`\tag{x.n}` 数量、连续性、重复/跳号；多行公式、矩阵、`aligned`、`cases`、表格的使用情况；是否使用自定义宏、`\newcommand`、`\def`、KaTeX 不支持的命令。列出 Top 20 高频命令。
5. **习题与解析**：每章习题数、解析条目数、题号一一对应检查；不匹配清单（章、题号、原因）；习题中是否嵌套小问或编号列表；解析文件标题格式是否有例外。
6. **表格与特殊块**：真正的 Markdown 表格位置与数量（注意区分以 `|` 开头的绝对值公式，不能误判）；`---` 分隔线、引用块、列表、代码块、图片、HTML、Mermaid 的实际使用情况。
7. **转换风险清单**：按严重程度排序，指出哪些写法会让网页解析出错或丢失内容，并给出建议处理方式。至少检查：
   - `$$` 与 `\tag` 的换行/位置变体；
   - 行内公式跨行、同一行多个公式；
   - 公式内部包含 `\$`、`\%`、`\\`、`&` 的情况；
   - 中文与公式紧邻时的断行；
   - 表格单元格内的公式与竖线；
   - 环境标题的括号、全角/半角、无编号变体；
   - 证明结束符 `□` 的变体；
   - 章节标题中的全角空格 `　`；
   - 文件 BOM、CRLF/LF、控制字符；
   - 解析文件的题号标题变体。
8. **准确性抽查**：从四类代表章节各抽 3 个环境（定义/定理/证明/例题/习题/解析）做源文件与解析器输出的逐字对照，记录是否丢字、错位、公式损坏。
9. **结论与建议**：结构化解析是否可行；需要网站渲染层特别处理的规则；建议的内容修复项（只记录，不修改）。

### 3.2 结构化数据 `content/generated/`

由解析器生成，目录结构：

```
content/generated/
  book.json                 # 目录级：篇、章、节元信息与统计，不含全文
  inventory.json            # 全量统计与校验结果（供审计与测试）
  validation.json           # 错误/警告清单，机器可读
  chapters/
    c01.json                # 单章完整结构化数据（含原文切片）
    ...
    c34.json
```

`book.json` 至少包含：

```json
{
  "schemaVersion": 1,
  "title": "量化数学进阶教材",
  "subtitle": "Quant Math Academy",
  "parts": [
    {
      "id": "part-1",
      "order": 1,
      "title": "数学语言与分析基础",
      "chapterIds": ["c01", "c02", "c03"]
    }
  ],
  "chapters": [
    {
      "id": "c01",
      "order": 1,
      "number": 1,
      "partId": "part-1",
      "title": "数学语言、证明方法与实数完备性",
      "slug": "mathematical-language",
      "sourcePath": "src/chapters/C01-mathematical-language.md",
      "solutionPath": "src/solutions/C01-solutions.md",
      "stats": {
        "chars": 0,
        "sections": 0,
        "subsections": 0,
        "environments": 0,
        "equations": 0,
        "exercises": 0
      },
      "sections": [
        {
          "id": "c01-s1",
          "number": "1.1",
          "title": "命题、逻辑联结词与量词",
          "anchor": "c01-s1",
          "subsections": [
            { "id": "c01-s1-1", "number": "1.1.1", "title": "命题与谓词", "anchor": "c01-s1-1" }
          ]
        }
      ]
    }
  ]
}
```

单章 `chapters/cXX.json` 至少包含：

```json
{
  "schemaVersion": 1,
  "id": "c01",
  "number": 1,
  "title": "第1章　数学语言、证明方法与实数完备性",
  "introMarkdown": "……章首无标题导言……",
  "sourcePath": "src/chapters/C01-mathematical-language.md",
  "sections": [
    {
      "id": "c01-s1",
      "number": "1.1",
      "title": "命题、逻辑联结词与量词",
      "anchor": "c01-s1",
      "markdown": "……本节原文，不含 ## 标题行……",
      "environmentIds": ["c01-def-1.1", "c01-thm-1.2", "c01-ex-1.1"],
      "exerciseIds": []
    }
  ],
  "summaryMarkdown": "……本章小结正文……",
  "exercisesMarkdown": "……习题区原文……",
  "environments": [
    {
      "id": "c01-def-1.1",
      "kind": "definition",
      "number": "1.1",
      "title": "命题与谓词",
      "chapterId": "c01",
      "sectionId": "c01-s1",
      "anchor": "c01-def-1.1",
      "markdown": "……环境完整原文，含标题行……",
      "proofMarkdown": null,
      "solutionMarkdown": null
    }
  ],
  "equations": [
    {
      "id": "c01-eq-1.1",
      "tag": "1.1",
      "chapterId": "c01",
      "sectionId": "c01-s1",
      "latex": "P\\Rightarrow Q\\quad\\equiv\\quad \\neg P\\lor Q",
      "display": true
    }
  ],
  "exercises": [
    {
      "id": "c01-ex-1",
      "number": 1,
      "chapterId": "c01",
      "sectionId": "c01-s1",
      "markdown": "……题干原文……",
      "solutionMarkdown": "……解析原文……"
    }
  ]
}
```

字段命名可按实现需要微调，但必须：**稳定 ID、原文切片、可追溯章节/节、习题与解析一一对应**。不得把正文压缩成摘要后作为 `markdown` 字段。

### 3.3 解析器 `tools/content/parse-book.mjs`

要求：

1. 仅使用 Node.js 内置模块（`node:fs`、`node:path`、`node:crypto` 等），**不要安装任何 npm 包**。
2. 从仓库根目录运行：`node tools/content/parse-book.mjs`。
3. 输出必须确定性：同样输入两次运行，除 `generatedAt` 外字节一致；`generatedAt` 可省略。
4. Windows 路径、UTF-8 无 BOM、CRLF/LF 混用都要正确处理。
5. 解析失败时必须报出 `文件:行号:原因` 并以非零码退出；不得静默跳过。
6. 在根 `package.json` 增加脚本：`"content:inventory": "node tools/content/parse-book.mjs"`，不删除或改写现有脚本。
7. 代码结构清晰：解析、校验、输出分离；关键规则写注释；不得为通过校验而吞掉异常。

### 3.4 测试 `tools/content/parse-book.test.mjs`

使用 Node 内置 `node:test` / `node:assert`，至少覆盖：

1. 34 章、34 解析文件全部被读取；篇归属正确。
2. 每章一级节编号连续；二级节编号与所属一级节一致。
3. 环境 ID 全局唯一；章内环境序号无重复。
4. 公式 tag 章内连续且与章号匹配；独立公式全部被捕获。
5. 习题题号连续，解析题号与习题一一对应。
6. 至少 3 个代表章节（C01/C11/C33）的环境数量与源文件人工统计一致。
7. 原文切片保真：任取 20 个环境，其 `markdown` 必须能在源文件中按空白归一化后逐字找到。
8. 已知边界样例：含表格的章节、含 `\begin{aligned}` 的公式、含 `|` 开头绝对值公式的段落，不得误判为表格。

根 `package.json` 增加：`"test:content": "node --test tools/content/parse-book.test.mjs"`。

## 4. 解析规则（必须遵守）

### 4.1 章与节

- 章标题：文件首行 `# 第N章　标题`（全角空格分隔）。
- 篇归属以 `STYLE_GUIDE.md` 第一节为准，写死在解析器常量中，并允许通过 `content/metadata/parts.json` 覆盖（本任务可先生成常量）。
- 一级节：`## x.y 标题`；二级节：`### x.y.z 标题`。
- `## 本章小结`、`## 习题` 是保留节，不是知识点；`本章小结` 正文放入 `summaryMarkdown`，`习题` 区放入 `exercises`。
- `###` 标题不得被当作一级节；节号必须与章号一致。
- 章首导言：第一个 `##` 之前的非标题正文。

### 4.2 数学环境

- 标题行形如 `**定义 1.1（命题与谓词）**`、`**定理 1.2**`、`**例 1.1**`、`**注记 1.3**`。
- 证明：单独一行 `**证明**` 开始，到单独一行 `□` 结束；证明归属于前一个可证明环境（定理/命题/引理/推论），无前驱时记警告。
- 解：单独一行 `**解**` 开始，到下一个环境标题/节标题/文件末尾结束；归属于前一个例题。
- 环境正文的边界：下一个环境标题、下一个 `##`/`###` 标题、`---` 分隔线、文件尾。不要把后续普通段落吞进环境。
- 环境类型映射：定义→definition，定理→theorem，引理→lemma，命题→proposition，推论→corollary，例→example，注记→note。
- ID 规则（必须）：
  - 环境：`c{两位章号}-{kind缩写}-{章内编号}`，如 `c01-def-1.1`、`c11-thm-11.3`、`c11-ex-11.1`。
  - 公式：`c{章号}-eq-{tag}`，如 `c11-eq-11.2`。
  - 习题：`c{章号}-ex-{题号}`，如 `c11-ex-1`；解析：`c{章号}-sol-{题号}`。
- 环境标题中括号内的名称单独放到 `title`，`number` 只保留编号。无括号时 `title` 为空字符串。
- 环境原文 `markdown` 必须包含标题行；不要重新拼接或改写。

### 4.3 公式

- 独立公式 `$$ ... $$` 可跨多行；`\tag{x.n}` 可能在同一行或单独一行；捕获整个公式体与 tag。
- 行内公式 `$...$` 不在本任务做 HTML 渲染，但要在统计中计数，并检查未闭合。
- 公式 ID 由 tag 生成；无 tag 的独立公式不生成 ID，但计入统计，并保留 `sectionId`。
- 必须处理 `$$` 紧贴正文、同一行出现多个 `$$` 的情况；若无法安全解析，记录错误而不是猜测。

### 4.4 习题与解析

- 习题区从 `## 习题` 后开始；题号列表为行首 `1.`、`2.`……，允许题内多段、多行公式、缩进小问。
- 题目切分以“行首数字 + `.` + 空格”且数字等于期望的下一个题号为界；其他数字列表（如小问 `(1)`、`1)`）不得切断题目。
- 解析文件：`# 第N章习题参考答案与解析`，每题标题为 `## 1.`、`## 2.`……；允许标题后无正文（记警告）。
- 解析必须按题号匹配，而不是按顺序盲配；缺题、多题、重复题号都写入 `validation.json`。

### 4.5 校验输出格式

`validation.json`：

```json
{
  "errors": [
    { "code": "EXERCISE_SOLUTION_MISMATCH", "file": "src/solutions/C11-solutions.md", "line": 123, "message": "…", "chapterId": "c11" }
  ],
  "warnings": [],
  "summary": { "errors": 0, "warnings": 0 }
}
```

错误码至少包括：`MISSING_CHAPTER`、`MISSING_SOLUTION`、`SECTION_NUMBER_GAP`、`ENV_NUMBER_DUPLICATE`、`EQUATION_TAG_GAP`、`EQUATION_TAG_DUPLICATE`、`EXERCISE_NUMBER_GAP`、`EXERCISE_SOLUTION_MISMATCH`、`UNCLOSED_MATH`、`TABLE_PARSE_ERROR`、`UNKNOWN_ENVIRONMENT`、`PROOF_WITHOUT_TARGET`。

有 error 时解析器仍应输出已解析数据，但进程退出码为 1；仅有 warning 时退出码为 0。

## 5. 明确不做

- 不做任何网页、UI、路由、样式。
- 不修改 `src/`、`scripts/`、`assets/`、`build/` 中任何文件。
- 不自动生成难度/必要性标签（这是主负责人和后续内容任务的事）。
- 不修正教材数学内容；发现问题只记录。
- 不安装依赖、不提交 git、不创建远程仓库。
- 不把教材全文复制到新的“精简版”；所有切片必须来自原文。

## 6. 验收标准

1. `node tools/content/parse-book.mjs` 可重复运行，34 章全部产出。
2. `node --test tools/content/parse-book.test.mjs` 全部通过。
3. `docs/audit/textbook-audit.md` 的数字与解析器输出一致，且至少包含 10 个带 `文件:行号` 的真实边界样例。
4. 抽查 20 个环境切片，与源文件逐字一致（空白归一化后）。
5. 习题与解析匹配结果可解释；所有不匹配项都列在报告里，不隐藏。
6. 没有修改任何教材正文文件。
7. 最终报告说明：实际新增/修改文件、运行命令、统计数字、未解决问题、下一步建议。

## 7. 交付报告格式

在任务完成消息中按以下结构汇报：

- 实际新增/修改文件清单（绝对或仓库相对路径）。
- 运行命令与结果（退出码、耗时、输出摘要）。
- 全书统计（章/节/环境/公式/习题/解析数量）。
- 校验错误与警告数量，Top 10 问题。
- 解析器已知限制（明确说明哪些写法尚未覆盖）。
- 对 Phase 1 网站实现的 5 条以内建议。
- 是否修改过 `src/`（必须是“否”）。

## 8. DSH 预检补充（运行中发现，优先级最高）

以下是我在派单后独立扫描源文件发现的真实边界，T01 必须覆盖；若已开始实现，请在最终自查中逐条核对：

1. **环境标题与正文同行的写法（C08 全章）**：C08 大量使用
   `**定义 8.1（正交矩阵）**　设 ...`，即标题行闭合 `**` 后直接跟全角空格与正文。全书约 99 处。解析器必须把 `**...**` 识别为环境标题，把其后的正文作为环境内容，不能把整行当标题、也不能漏掉环境。
2. **`公理` 环境**：C01 第 260 行 `**公理 1.6（上确界完备性）**`。请增加 `axiom` 类型，与定义/定理等共用章内编号序列；不要当作普通段落。
3. **无编号注记**：全书约 91 处 `**注记**` 或 `**注记（...）**` 没有编号。允许 `number: null`，仍生成稳定 ID（可用章内出现序号，如 `c06-note-1`），但不得伪造章内正式编号。
4. **证明标题变体**：除 348 处独立 `**证明**` 外，还有约 30 处以 `**证明**（...）` 或 `**证明思路**` 开头。至少要求：
   - `**证明**（...）` 视为证明开始，括号内容作为说明；
   - `**证明思路**`、`**证明范围与思路**` 等视为“证明说明”块，不能被误判为新环境；
   - 证明块结束仍以单独一行 `□` 为优先，缺失时在 `validation.json` 记 warning。
5. **环境标题中的公式与全角标点**：标题括号内可能含数学公式或中英文混排；只切分编号与标题，不改写标题文本。
6. 上述情况必须在 `docs/audit/textbook-audit.md` 中给出计数与 `文件:行号` 样例；C08 的环境抽取必须完整，否则 Phase 1 的 C08 试点无法通过。

若当前实现无法在剩余时间内覆盖这些边界，请在报告中明确列为“未覆盖”，不要静默通过；DSH 会追加修复任务。
