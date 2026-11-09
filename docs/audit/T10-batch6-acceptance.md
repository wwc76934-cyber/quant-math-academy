# T10 全书 D/P 标注 Batch 6（C19 / C20）验收报告

- 任务：T10 Batch 6
- 日期：2026-11-10
- 状态：复核与验收通过
- 范围：C19 抽样分布、点估计与极大似然（8 节）；C20 置信区间、假设检验与多重检验（7 节），共 15 节。

## 1. 规模

| 指标 | Batch 5 后 | 增量 | Batch 6 后 |
|---|---|---|---|
| 已评审章 | 19 | +2（C19/C20） | **21 章** |
| 已评审节 | 113 | +15 | **128 节** |
| 未标注留白 | 106 节 | -15 | **91 节（13 章）** |
| 先修边 | 225 | +44 | **269** |
| 相关边 | 239 | +37 | **276** |
| DAG | 0 环 | 保持 | **0 环** |
| graph.json | 179.9 KB | +17.7 KB | **197.6 KB（gzip 约 35 KB）** |

## 2. 批次 15 节分布

- 难度：D1 1 节（C19.1）；D2 9 节；D3 5 节（C19.6/C19.7、C20.3/C20.4/C20.7）。
- 必要性：P0 13 节；P1 2 节（C19.4、C19.8）。
- 考频：high 13 节；medium 2 节。

## 3. DSH 复核

- 逐节核对 C19/C20 原文编号：19.4 样本方差无偏、19.6 均值—方差分解、19.9 偏差—方差、19.12 矩估计一致、19.14 MLE 不变性、19.16 信息恒等式、19.17 Cramér–Rao、19.18 MLE 渐近；20.3 枢轴量法、20.4–20.8 正态精确区间、20.11 Neyman–Pearson、20.12 Karlin–Rubin、20.14 对偶、20.17 FWER/FDR、20.18 BH。
- 先修/相关全部为真实节，无自指、无未知 ID，先修不指向未来章。
- keyFormulas 全部来自本章 equationIndex。
- 新 tags 已登记；rationale 均 ≥60 字并引用实际定理/例题。
- 15 节置 reviewed:true / reviewedBy:DSH；top-level metadataStatus:reviewed。
- 测试收口：图测试更新为 21 章 / 128 节 / 269 先修 / 276 相关、未标注 13 章；未标注靶点改为 C21。

## 4. 实际运行

| 命令 | 结果 |
|---|---|
| metadata:validate | 21 章 / 128 节；0 error，0 warning |
| content:build | 0 error；4 个既有 >1MB warning |
| content:graph | 219 / 128 / 269 / 276 / 0 环 |
| content:validate | 0 error，4 warning |
| test:content | 58 / 58 |
| web test | 110 / 110 |
| web build | 0 error；主 JS gzip 69.68KB |

## 5. 已知限制

- 剩余 13 章 / 91 节仍为“标注完善中”，不生成假边。
- T14 公式收藏、Phase 6 开源准备仍为 backlog/待确认。
- 4 个 >1MB 单节未二次拆分。
- Batch 7 建议：C21/C22/C23（约 22 节）。
