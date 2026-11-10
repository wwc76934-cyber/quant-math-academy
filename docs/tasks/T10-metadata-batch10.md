# T10 — 全书 D/P 标注 Batch 10（C27 / C28）

## 1. 前置

- Batch 1–9 已完成：27 章 / 169 节 reviewed。
- 图：219 节点、169 annotated、401 先修、355 相关、0 环。
- schema 与流程见 `docs/tasks/T10-metadata-batch9.md`。

## 2. 范围

- C27 随机微分方程与 Itô 过程（8 节）
- C28 平稳时间序列与 ARMA（7 节）

共 **15 节**。完成后预计 29 章 / 184 节。

## 3. 要求

1. 逐章读 `src/chapters/C27-sde-ito-processes.md`、`C28-stationary-arma.md`；逐节判断，禁止关键词批量打标。
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

1. 写 c27/c28.json（draft）。
2. 运行 metadata:validate、content:build、content:graph、content:validate、test:content、web test、web build。
3. 报告 15 节 D/P 分布、先修/相关边、未知 ID/公式为 0、总标注 29 章/184 节。
4. 不改 src、不改已 reviewed 章、不新增依赖、不发布。

## 6. 验收

- 15 节字段完整、rationale 可追溯、先修/公式合法、DAG 0 环。
- 内容/图/Web 构建与测试通过。
- 新章仍显示“标注完善中”，直到 DSH 复核置 reviewed。
- 报告真实结果与待复核点。
