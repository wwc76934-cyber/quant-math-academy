# T10 — 全书 D/P 标注 Batch 2（C05–C07）

## 1. 前置

- Batch 1 已完成：C02–C04 共 19 节复核；全量 7 章 / 44 节 reviewed。
- 图数据当前：219 节点、44 annotated、79 先修、87 相关、0 环。
- 已有 schema 与校验流程见 `docs/tasks/T10-metadata-batch1.md` 和 `content/metadata/chapters/c04.json`。

## 2. 范围

- C05 内积、正交投影与最小二乘（5 节）
- C06 特征值、对角化与谱定理（6 节）
- C07 二次型、正定矩阵与矩阵微分（5 节）

共 **16 节**。

## 3. 要求

1. 逐章读 `src/chapters/C05-inner-products.md`、`C06-eigenvalues-spectral.md`、`C07-quadratic-forms-matrix-calculus.md`，逐节独立判断；禁止关键词批量打标。
2. 每节完整字段：difficulty、priority、minutes、examFrequency、tags、coreConcepts、applications、prerequisites、related、learningObjective、keyFormulas、rationale。
3. `rationale` ≥60 字，引用本节实际定义/定理/例题/证明结构；不得空话。
4. `prerequisites` / `related` 只能引用 book.json 存在的节；不得自指；先修不得引用未来章；related 可跨章但必须是真实知识关联。
5. `keyFormulas` 只能引用本章 equationIndex 中的 `cXX-eq-...`。
6. 新 tags 如未在 `content/metadata/tags.json` 登记，请登记；不要堆“定义/定理/证明”泛词。
7. `reviewed:false`、`reviewedBy:null`、`reviewedAt:null`；DSH 复核后再置 true。

## 4. D/P 标准

沿用 Batch 1：
- D1 定义/直接计算；D2 标准推导；D3 多步综合；D4 研究型；D5 前沿。
- P0 量化/面试/后续章节地基；P1 重要工具；P2 扩展；P3 背景。
- 考频 high/medium/low。

## 5. 工作流

1. 写 `content/metadata/chapters/c05.json|c06.json|c07.json`（draft）。
2. 运行 `npm run metadata:validate`、`npm run content:build`、`npm run content:graph`、`npm run content:validate`、`npm run test:content`、`npm --prefix web run test`、`npm --prefix web run build`。
3. 报告：16 节 D/P 分布、先修/相关边、未知 ID/公式为 0、总标注 60 节/10 章。
4. 不改 src、不改 Batch 1 与已 reviewed 章；不新增依赖；不发布。

## 6. 验收

- 16 节字段完整、rationale 可追溯、先修/公式全合法、DAG 0 环。
- 内容/图/Web 构建与测试通过。
- 新章仍显示“标注完善中”，直到 DSH 复核置 reviewed。
- 报告真实结果与待复核点。
