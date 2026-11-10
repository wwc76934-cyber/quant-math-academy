# T10 全书 D/P 标注 Batch 7（C21 / C22）验收报告

- 任务：T10 Batch 7
- 日期：2026-11-10
- 状态：复核与验收通过
- 范围：C21 线性回归、投影与统计推断（7 节）；C22 Bayesian 推断与统计决策（7 节），共 14 节。

## 1. 规模

| 指标 | Batch 6 后 | 增量 | Batch 7 后 |
|---|---|---|---|
| 已评审章 | 21 | +2 | **23 章** |
| 已评审节 | 128 | +14 | **142 节** |
| 未标注留白 | 91 节 | -14 | **77 节（11 章）** |
| 先修边 | 269 | +44 | **313** |
| 相关边 | 276 | +30 | **306** |
| DAG | 0 环 | 保持 | **0 环** |
| graph.json | 197.6 KB | +17.3 KB | **214.9 KB（gzip 约 38 KB）** |

## 2. 批次 14 节分布

- 难度：D2 10 节；D3 4 节（C21.4、C22.3、C22.5、C22.7）。
- 必要性：P0 12 节；P1 2 节（C21.6 GLS/BLUE、C22.6 MCMC）。
- 考频：high 13 节；medium 1 节（C21.6）。

## 3. DSH 复核

- 逐节核对 C21/C22 原文：最小二乘/投影、拟合优度、估计量抽样分布、线性约束检验、诊断、GLS/BLUE；先验/似然/后验、后验汇总、先验构造、决策理论、Bayes 与频率比较、MCMC/详细平衡、量化 Bayesian 应用。
- 先修/相关全部为真实节，无自指、无未知 ID，先修不指向未来章。
- keyFormulas 全部来自本章 equationIndex。
- 新 tags 已登记；rationale ≥100 字并引用实际定理/例题。
- 14 节置 reviewed:true / reviewedBy:DSH；top-level metadataStatus:reviewed。
- 测试收口：图测试更新为 23 章 / 142 节 / 313 先修 / 306 相关、未标注 11 章；未标注靶点改为 C23。

## 4. 实际运行

| 命令 | 结果 |
|---|---|
| metadata:validate | 23 章 / 142 节；0 error，0 warning |
| content:build | 0 error；4 个既有 >1MB warning |
| content:graph | 219 / 142 / 313 / 306 / 0 环 |
| content:validate | 0 error，4 warning |
| test:content | 58 / 58 |
| web test | 110 / 110 |
| web build | 0 error；主 JS gzip 69.68KB |

## 5. 已知限制

- 剩余 11 章 / 77 节仍为“标注完善中”，不生成假边。
- T14 公式收藏、Phase 6 开源准备仍为 backlog/待确认。
- 4 个 >1MB 单节未二次拆分。
- Batch 8 建议：C23/C24/C25（约 20 节）。
