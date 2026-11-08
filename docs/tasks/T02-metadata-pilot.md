# T02 — 四个试点章的知识点标注（Phase 1 内容）

## 1. 任务定位

在 T01 完成结构化解析后，为 Phase 1 的四个试点章逐节建立**难度 D1–D5、必要性 P0–P3、预计时间、先修、相关、标签、量化应用、学习目标与判定理由**。

这是一项**内容判断任务**，不是脚本批量打标任务。执行者必须实际阅读每一节的正文，理解其在全书中的位置，再作判断。产出先标为草稿（`reviewed:false`），由 DSH 逐节复核后才对外显示。

试点章：

- C01 数学语言、证明方法与实数完备性（6 节）
- C08 QR、Cholesky、SVD、PCA 与条件数（6 节）
- C11 期望、方差、矩与概率不等式（6 节）
- C33 无套利、风险中性定价与 Greeks（7 节）

合计 25 个一级节。

## 2. 必读

1. `docs/architecture/CONTENT_MODEL.md` — 第 5–11 节是标注规范与校准示例。
2. `docs/audit/textbook-audit.md` — T01 的章节/公式/环境清单。
3. `content/generated/chapters/c01.json`、`c08.json`、`c11.json`、`c33.json` — 结构化正文。
4. `src/chapters/` 对应四章原文 — 至少完整通读一遍；不能只看节标题。
5. `STYLE_GUIDE.md` — 章节结构与编号规范。
6. `docs/ROADMAP.md` — Phase 1 范围与验收。

## 3. 交付物

### 3.1 章节元数据

路径：

```
content/metadata/chapters/c01.json
content/metadata/chapters/c08.json
content/metadata/chapters/c11.json
content/metadata/chapters/c33.json
```

结构遵循 `CONTENT_MODEL.md` 第 5 节。示例（C11 片段）：

```json
{
  "schemaVersion": 1,
  "chapterId": "c11",
  "title": "期望、方差、矩与概率不等式",
  "partId": "part-3",
  "summary": "……章级摘要，2–3 句……",
  "whyStudy": "……为什么量化学习者应学本章，2 句以内……",
  "prerequisites": ["c09-s4", "c10-s2"],
  "metadataStatus": "draft",
  "reviewedBy": null,
  "reviewedAt": null,
  "sections": {
    "c11-s1": {
      "difficulty": "D2",
      "priority": "P0",
      "minutes": 45,
      "examFrequency": "high",
      "tags": ["概率论", "期望", "线性性"],
      "applications": ["组合收益归因", "风险度量基础"],
      "prerequisites": [
        { "id": "c09-s4", "strength": "required" }
      ],
      "related": ["c11-s2", "c12-s2"],
      "learningObjective": "能陈述期望的定义与线性性，并计算离散/连续随机变量的期望。",
      "keyFormulas": ["c11-eq-11.2"],
      "rationale": "本节以定义与线性性为主，计算直接但需要区分离散/连续与可积条件，故 D2；期望线性性是后续方差、协方差、回归与定价的共同基础，故 P0。",
      "reviewed": false,
      "reviewedBy": null,
      "reviewedAt": null
    }
  }
}
```

要求：

- 25 个一级节**全部覆盖**，不得遗漏。
- 只标注编号节（`x.1`–`x.n`）；`本章小结`、`习题` 不标。
- `difficulty`、`priority`、`minutes`、`examFrequency`、`tags`、`applications`、`learningObjective`、`rationale` 必填。
- `prerequisites` 可以为空数组，但必须真实判断；不能为了“看起来完整”硬塞。
- `related` 0–6 个，必须有实际教学关联。
- `keyFormulas` 0–4 个，必须是 T01 产出的公式 ID；不确定就留空，不猜。
- `reviewed:false`，`reviewedBy:null`，`reviewedAt:null`。
- `metadataStatus` 章级为 `"draft"`。

### 3.2 标签词表

`content/metadata/tags.json`：

```json
{
  "schemaVersion": 1,
  "branches": ["分析", "线性代数", "概率论", "数理统计", "优化", "随机过程", "随机分析", "时间序列", "数值计算", "金融数学", "组合数学"],
  "types": ["定义", "定理", "证明", "计算", "建模", "反例", "应用"],
  "quant": ["组合优化", "风险度量", "衍生品定价", "因子模型", "回测评估", "执行成本", "波动率", "统计推断", "机器学习"],
  "methods": ["矩阵分解", "特征值", "凸优化", "KKT", "MLE", "Bayes", "假设检验", "回归", "GARCH", "Kalman", "Monte Carlo", "Itô 积分"]
}
```

- 元数据中的标签必须来自以上四类之一；未登记标签校验器给 warning。
- 标签 2–6 个，每个 ≤12 字；不要使用“重要”“难点”“必考”。

### 3.3 校验器

`tools/content/validate-metadata.mjs`：

- 读取 `content/generated/book.json` 与四章 JSON、元数据文件。
- 检查：
  1. 25 个编号节全部有元数据；
  2. 字段齐全、枚举合法；
  3. `minutes` 为 5 的倍数且在 20–180；
  4. 标签数量/长度/词表；
  5. `prerequisites` / `related` 的 ID 存在、非自身；
  6. 先修必须在全书顺序中早于本节（章号小，或同章节号小）；
  7. 先修图无环（对四章子图与跨章先修边都检查）；
  8. `keyFormulas` 的 ID 存在；
  9. `reviewed:true` 时必须有 `reviewedBy/reviewedAt`（本任务全为 false，应通过）；
  10. 章级 `prerequisites` 存在。
- 输出 `content/generated/metadata-validation.json`，并在控制台打印 error/warning 数与明细。
- error 时退出码 1，warning 时退出码 0。
- 在根 `package.json` 增加 `"metadata:validate": "node tools/content/validate-metadata.mjs"`。
- 测试：`tools/content/validate-metadata.test.mjs`，使用 `node:test`，至少覆盖“缺节/非法枚举/先修不存在/先修未来/自环/公式不存在”六种错误。

### 3.4 试点报告

`docs/audit/metadata-pilot-report.md`：

1. 25 节总表：章、节、标题、D、P、分钟、高频、先修、一句话理由。
2. 8–10 个“难判断”的节：列出备选判断、最终选择、依据。
3. D/P 分布：D1–D5、P0–P3 各多少节；是否出现“全章同等级”的异常。
4. 先修图：列出跨章先修边；是否存在环；是否有“未来节”被误标。
5. 公式引用：keyFormulas 数量与缺失情况。
6. 校验结果：error/warning 数。
7. 给 DSH 的复核建议：最需要人工确认的 5 节。
8. 对全书批量标注的工作量估计与模板建议。

## 4. 标注方法（必须执行）

### 4.1 逐节流程

1. 先读该节完整正文（含定义、定理、证明、例题、应用），不要只读标题或首段。
2. 标出：核心概念、证明长度与抽象度、依赖的前置节、后续哪些节会用到它、是否含可计算/可证明的高频考点。
3. 按 `CONTENT_MODEL.md` 第 6 节判 D；按第 7 节判 P；两者独立。
4. 估时：按第 8 节；写 5 的倍数。
5. 选 2–6 个标签、1–4 个具体应用。
6. 写 `learningObjective`：用“能陈述/能推导/能计算/能判断/能证明”等可检验动词。
7. 写 `rationale`：60–180 字，必须引用本节的具体内容特征（证明方法、概念数量、依赖关系、考核用途），不能写“很重要”“比较难”。
8. 决定先修/相关：先修必须更早；相关可以跨章。
9. 标 `reviewed:false`。

### 4.2 判定纪律

- **难度 ≠ 必要性。** 一个 D5 的证明可以是 P2；一个 D2 的计算可以是 P0。
- **不以篇幅定难度。** 长节可能只是多个简单主题；短节可能极抽象。
- **不以章节标题打标。** 必须读正文。
- **不伪造考核来源。** 不写“某公司真题”；只写“高频考点/常见题型”。
- **不确定就降级并报告。** 先给保守判断，在报告中列为“待复核”，不要硬猜。
- **先修宁缺毋滥。** 不是所有前置章节都要列；只列不掌握会明显受阻的。
- **相关不凑数。** 每条 related 要能说出具体关联（同一工具、同一应用、互为对偶）。

### 4.3 校准

`CONTENT_MODEL.md` 第 6.2、7.3 节给了 8 个校准示例。它们用于对齐尺度，不是让你照抄。你必须独立判断每个节；如果与示例判断不同，在报告中说明理由。

## 5. 明确不做

- 不修改 `src/` 教材正文。
- 不修改 `docs/product`、`docs/architecture`、`docs/design`、`docs/ROADMAP.md`。
- 不做网页/UI。
- 不做学习路径数据（Phase 3）。
- 不批量生成全书 34 章标注；本任务只做 4 章。
- 不把 `reviewed` 设为 true；复核是 DSH 的职责。
- 不安装新依赖；校验器只用 Node 内置模块。

## 6. 验收标准

1. 4 个 JSON 文件存在，25 个编号节全部覆盖。
2. `npm run metadata:validate` 退出码 0；error = 0；warning 有清单且可解释。
3. `node --test tools/content/validate-metadata.test.mjs` 通过。
4. 每条 rationale 60–180 字，且引用具体内容；抽查 10 条，不能是套话。
5. D/P 分布合理：不能四章全部同一等级；至少出现 D1/D2/D3/D4/D5 中的 4 档、P0/P1/P2/P3 中的 4 档（若实际内容确实缺少某档，报告说明）。
6. 先修无未来节、无自环、无环。
7. keyFormulas 全部存在；没有猜测 ID。
8. 报告列出 8–10 个难判断节与 5 个最需复核节。
9. 未修改 `src/` 与负责人文档。

## 7. 交付报告格式

- 新增/修改文件清单。
- `metadata:validate` 与测试的运行命令、退出码、error/warning 数。
- 25 节总表（可放报告，消息里给摘要）。
- D/P 分布。
- 难判断节 Top 5（节号、两种判断、最终理由）。
- 已知不确定项。
- 是否修改过 `src/`（必须是“否”）。
