# T10 — 全书 D/P 标注 Batch 5（C16 / C17 / C18）

## 1. 前置

- Batch 1–4 已完成：C02–C07、C09、C10、C12、C13–C15；全量 16 章 / 94 节 reviewed。
- 当前图：219 节点、94 annotated、183 先修、202 相关、0 环。
- schema 与流程见 `docs/tasks/T10-metadata-batch4.md`。

## 2. 范围

- C16 Lagrange、KKT、对偶与敏感性（6 节）
- C17 迭代优化算法（7 节）
- C18 数值方法与 Monte Carlo（6 节）

共 **19 节**。完成后预计 19 章 / 113 节。

## 3. 要求

1. 逐章读 `src/chapters/C16-constrained-optimization.md`、`C17-iterative-optimization.md`、`C18-numerical-monte-carlo.md`；逐节判断，禁止关键词批量打标。
2. 字段完整：difficulty、priority、minutes、examFrequency、tags、coreConcepts、applications、prerequisites、related、learningObjective、keyFormulas、rationale。
3. rationale ≥60 字，引用实际定义/定理/例题；不写空话。
4. prerequisites 不自指、不指向未来章；related 可跨章但真实；ID 必须存在。
5. keyFormulas 只来自本章 equationIndex；新 tags 登记 tags.json，不堆泛词。
6. reviewed:false；DSH 复核后再置 true。

## 4. D/P 标准

- D1 定义/直接计算；D2 标准推导；D3 多步综合；D4 研究型；D5 前沿。
- P0 量化/面试/后续章节地基；P1 重要工具；P2 扩展；P3 背景。
- 考频 high/medium/low。

## 5. 工作流

1. 写 c16/c17/c18.json（draft）。
2. 运行 metadata:validate、content:build、content:graph、content:validate、test:content、web test、web build。
3. 报告 19 节 D/P 分布、先修/相关边、未知 ID/公式为 0、总标注 19 章/113 节。
4. 不改 src、不改已 reviewed 章、不新增依赖、不发布。

## 6. 验收

- 19 节字段完整、rationale 可追溯、先修/公式合法、DAG 0 环。
- 内容/图/Web 构建与测试通过。
- 新章仍显示“标注完善中”，直到 DSH 复核置 reviewed。
- 报告真实结果与待复核点。
