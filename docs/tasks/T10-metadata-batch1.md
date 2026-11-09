# T10 — 全书 D/P 标注分批（Batch 1：C02–C04）

## 1. 前置

- 全书 34 章已可读；搜索、知识关系已上线。
- 目前 C01/C08/C11/C33 共 25 节有 reviewed 标注；其余 30 章保持“标注完善中”。
- 已有 schema：`content/metadata/chapters/cXX.json`，字段见 `content/metadata/chapters/c11.json`。
- 已有校验：`npm run metadata:validate`、`npm run content:build`、`npm run content:validate`。

## 2. 目标

为 **C02 一元微积分、C03 多元微积分、C04 向量空间与线性映射** 共约 19 节建立第一版 D/P 标注，逐节判断，不靠关键词自动打标，不冒充已复核。

## 3. 每节必须字段

```json
{
  "difficulty": "D1-D5",
  "priority": "P0-P3",
  "minutes": 20,
  "examFrequency": "high|medium|low",
  "tags": ["..."],
  "coreConcepts": ["..."],
  "applications": ["..."],
  "prerequisites": [{"id": "c01-s1", "strength": "required|helpful"}],
  "related": ["cXX-sN"],
  "learningObjective": "一句话，可检验。",
  "keyFormulas": ["cXX-eq-..."],
  "rationale": "≥60 字，引用本节实际定理/例题/证明结构，说明为什么是这个 D 和 P。",
  "reviewed": false,
  "reviewedBy": null,
  "reviewedAt": null
}
```

- `tags` 3–6 个，来自本节内容，不堆砌。
- `coreConcepts` 2–5 个。
- `applications` 1–3 条，仅当本节确有量化/金融/统计用途；没有则空数组，不硬编。
- `prerequisites` / `related` 只能引用 `book.json` 中存在的节 ID；不得自指；不得引用未来章。
- `keyFormulas` 只能引用本章 `equationIndex` 中存在的 `cXX-eq-...`；没有可空。
- `rationale` 必须可追溯：指出本节的关键定义/定理/证明/例题，不得写“很重要”“常考”等空话。

## 4. D/P 判定标准（必须按内容判断）

### Difficulty
- **D1**：只要求理解定义、记号、直接计算；无多步证明。
- **D2**：标准课程推导，2–3 步；能按模板应用。
- **D3**：多步分析/证明，需要组合多个工具；典型考试综合题。
- **D4**：研究型内容、较深结构证明、跨章综合；需要较强背景。
- **D5**：前沿/专门主题，通常只需知道结论与适用边界。

### Priority
- **P0**：量化实务/面试/后续章节的地基；不掌握会直接卡住。
- **P1**：重要工具或常见考点；应优先掌握。
- **P2**：扩展/进阶；有时间再学。
- **P3**：背景/选读；不影响主线。

### 考频
- **high**：面试/考试/后续章节反复使用；
- **medium**：常见但非每次必考；
- **low**：了解即可。

## 5. 工作流

1. 逐章读 `src/chapters/C02.md`、`C03.md`、`C04.md`（必要时对应 `src/solutions/`），列出每节的定义/定理/例题结构。
2. 对每节独立判断 D、P、时长、考频、先修、相关、应用、理由；不要先按关键词批量打标。
3. 写 `content/metadata/chapters/c02.json`、`c03.json`、`c04.json`；`reviewed:false`。
4. 校验：
   - `npm run metadata:validate` 0 error；
   - `npm run content:build` 0 error；
   - `npm run content:validate` 0 error；
   - `npm run test:content` 通过。
5. 报告：每章 D/P 分布、18/19 节清单、先修边、无依据的应用/公式数量（应为 0）、未复核标记。

## 6. 约束

- 只改 `content/metadata/chapters/c02.json|c03.json|c04.json` 和必要的校验测试；不改 `src/` 教材、不改已 reviewed 的 C01/C08/C11/C33。
- 不把 `reviewed` 设为 true；DSH 会逐节复核后再置 true。
- 不自动生成未核实先修/相关；不确定的边宁可不写。
- 不新增依赖、不发布。

## 7. 验收

1. C02–C04 每节都有完整字段；无空 rationale；无未知 ID/公式。
2. D/P 分布合理，逐节理由具体。
3. 先修 DAG 无环；不引用未来章。
4. 构建/校验/测试通过；内容站点仍显示 30 章“标注完善中”，新增 3 章仍显示“标注完善中”直到 DSH 复核。
5. 报告真实结果与待复核清单。
