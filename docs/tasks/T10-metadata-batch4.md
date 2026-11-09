# T10 — 全书 D/P 标注 Batch 4（C13 / C14 / C15）

## 1. 前置

- Batch 1–3 已完成：C02–C07、C09、C10、C12；全量 13 章 / 77 节 reviewed。
- 当前图：219 节点、77 annotated、144 先修、162 相关、0 环。
- schema 与流程见 `docs/tasks/T10-metadata-batch3.md`、`content/metadata/chapters/c12.json`。

## 2. 范围

- C13 条件期望、条件方差与最优预测（6 节）
- C14 随机变量收敛、大数定律与中心极限定理（6 节）
- C15 凸集、凸函数与共轭工具（5 节）

共 **17 节**。完成后预计 16 章 / 94 节。

## 3. 要求

1. 逐章读 `src/chapters/C13-conditional-expectation.md`、`C14-convergence-limit-theorems.md`、`C15-convex-analysis.md`；逐节独立判断，禁止关键词批量打标。
2. 每节完整字段：difficulty、priority、minutes、examFrequency、tags、coreConcepts、applications、prerequisites、related、learningObjective、keyFormulas、rationale。
3. rationale ≥60 字，引用本节实际定义/定理/例题；不得空话。
4. prerequisites 不得自指、不得指向未来章；related 可跨章但必须真实相关；全部 ID 存在于 book.json。
5. keyFormulas 只能来自本章 equationIndex。
6. 新 tags 登记到 `content/metadata/tags.json`，不要堆泛词。
7. reviewed:false，DSH 复核后再置 true。

## 4. D/P 标准

沿用 Batch 1–3：
- D1 定义/直接计算；D2 标准推导；D3 多步综合；D4 研究型；D5 前沿。
- P0 量化/面试/后续章节地基；P1 重要工具；P2 扩展；P3 背景。
- 考频 high/medium/low。

## 5. 工作流

1. 写 c13/c14/c15.json（draft）。
2. 运行 metadata:validate、content:build、content:graph、content:validate、test:content、web test、web build。
3. 报告 17 节 D/P 分布、先修/相关边、未知 ID/公式为 0、总标注 16 章/94 节。
4. 不改 src、不改已 reviewed 章、不新增依赖、不发布。

## 6. 验收

- 17 节字段完整、rationale 可追溯、先修/公式合法、DAG 0 环。
- 内容/图/Web 构建与测试通过。
- 新章仍显示“标注完善中”，直到 DSH 复核置 reviewed。
- 报告真实结果与待复核点。
