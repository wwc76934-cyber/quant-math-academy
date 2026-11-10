# T10 — 全书 D/P 标注 Batch 13（C34 收官）

## 1. 前置

- Batch 1–12 已完成：33 章 / 212 节 reviewed。
- 图：219 节点、212 annotated、530 先修、429 相关、0 环。
- 仅剩 C34 量化策略的数学评估与回测（7 节）。

## 2. 范围

C34 全部 7 节：

- 34.1 收益序列与绩效指标
- 34.2 业绩归因
- 34.3 统计显著性与回测偏差
- 34.4 交易成本与市场冲击
- 34.5 容量、约束与实际可行性
- 34.6 策略评估的完整流程与常见错误
- 34.7 全书数学工具的整合

完成后全书 **34 章 / 219 节** 全部标注。

## 3. 要求

1. 逐章读 `src/chapters/C34-strategy-evaluation.md`；逐节判断，禁止关键词批量打标。
2. 字段完整：difficulty、priority、minutes、examFrequency、tags、coreConcepts、applications、prerequisites、related、learningObjective、keyFormulas、rationale。
3. rationale ≥60 字，引用实际定义/定理/例题；不写空话。
4. prerequisites 不自指、不指向未来章；related 可跨章但真实；ID 必须存在。
5. keyFormulas 只来自本章 equationIndex；新 tags 登记 tags.json，不堆泛词。
6. reviewed:false；DSH 复核后再置 true。

## 4. 收官要求

- 全书不再有未标注章：`unannotatedNodes` 应为 0；所有节点有先修/相关边（至少入边或出边，孤立点需说明）。
- GraphPage 的“标注完善中”提示应为 0 个；“只看已标注”筛选等于全部。
- 图测试更新为 219 annotated / 0 unannotated / 最终边数。
- T09/T10 文档同步“全书完成”状态。

## 5. 工作流

1. 写 c34.json（draft）。
2. 运行 metadata:validate、content:build、content:graph、content:validate、test:content、web test、web build。
3. 报告 7 节分布、最终先修/相关边、0 未知 ID/公式、34 章/219 节。
4. 不改 src、不改已 reviewed 章、不新增依赖、不发布。

## 6. 验收

- 7 节字段完整、rationale 可追溯、先修/公式合法、DAG 0 环。
- 全书 219/219 标注；无“标注完善中”节点。
- build/test 全绿；报告真实结果与任何孤立节点。
