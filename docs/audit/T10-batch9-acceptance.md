# T10 全书 D/P 标注 Batch 9（C25 / C26）验收报告

- 任务：T10 Batch 9
- 日期：2026-11-10
- 状态：复核与验收通过
- 范围：C25 鞅、停时与最优停止（7 节）；C26 Brown 运动、二次变差与 Itô 积分（7 节），共 14 节。

## 1. 规模

| 指标 | Batch 8 后 | 增量 | Batch 9 后 |
|---|---|---|---|
| 已评审章 | 25 | +2 | **27 章** |
| 已评审节 | 155 | +14 | **169 节** |
| 未标注留白 | 64 节 | -14 | **50 节（7 章）** |
| 先修边 | 360 | +41 | **401** |
| 相关边 | 330 | +25 | **355** |
| DAG | 0 环 | 保持 | **0 环** |
| graph.json | 232.9 KB | +17.9 KB | **250.8 KB（gzip 约 44 KB）** |

## 2. 批次 14 节分布

- 难度：D2 9 节；D3 5 节（C25.3 可选停时、C25.5 鞅收敛、C25.6 最优停止、C26.4 Itô 积分构造、C26.5 Itô 公式）。
- 必要性：P0 14 节。
- 考频：high 14 节。

## 3. DSH 复核

- 逐节核对 C25/C26 原文：滤波/鞅/停时、Doob 分解与不等式、可选停时定理、停时刻画、鞅收敛、最优停止、量化应用；Brown 运动、变差/二次变差、随机积分动机、Itô 积分构造、Itô 公式、重要结果、量化应用。
- 先修/相关全部为真实节，无自指、无未知 ID，先修不指向未来章。
- keyFormulas 全部来自本章 equationIndex。
- 新 tags 已登记；rationale ≥139 字并引用实际定理/例题。
- 14 节置 reviewed:true / reviewedBy:DSH；top-level metadataStatus:reviewed。
- 测试收口：图测试更新为 27 章 / 169 节 / 401 先修 / 355 相关、未标注 7 章；未标注靶点改为 C27。

## 4. 实际运行

| 命令 | 结果 |
|---|---|
| metadata:validate | 27 章 / 169 节；0 error，0 warning |
| content:build | 0 error；4 个既有 >1MB warning |
| content:graph | 219 / 169 / 401 / 355 / 0 环 |
| content:validate | 0 error，4 warning |
| test:content | 58 / 58 |
| web test | 110 / 110 |
| web build | 0 error；主 JS gzip 69.68KB |

## 5. 已知限制

- 剩余 7 章 / 50 节仍为“标注完善中”，不生成假边。
- T14 公式收藏、Phase 6 开源准备仍为 backlog/待确认。
- 4 个 >1MB 单节未二次拆分。
- Batch 10 建议：C27/C28/C29（约 20 节）。
