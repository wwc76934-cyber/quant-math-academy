# T10 全书 D/P 标注 Batch 10（C27 / C28）验收报告

- 任务：T10 Batch 10
- 日期：2026-11-10
- 状态：复核与验收通过
- 范围：C27 随机微分方程与 Itô 过程（8 节）；C28 平稳时间序列与 ARMA（7 节），共 15 节。

## 1. 规模

| 指标 | Batch 9 后 | 增量 | Batch 10 后 |
|---|---|---|---|
| 已评审章 | 27 | +2 | **29 章** |
| 已评审节 | 169 | +15 | **184 节** |
| 未标注留白 | 50 节 | -15 | **35 节（5 章）** |
| 先修边 | 401 | +40 | **441** |
| 相关边 | 355 | +25 | **380** |
| DAG | 0 环 | 保持 | **0 环** |
| graph.json | 250.8 KB | +15.3 KB | **266.1 KB（gzip 约 47 KB）** |

## 2. 批次 15 节分布

- 难度：D1 1 节（C28.1 时间序列/平稳性）；D2 11 节；D3 3 节（C27.2 存在唯一性、C27.7 数值解法、C27.8 生成元/Feynman–Kac/测度变换）。
- 必要性：P0 15 节。
- 考频：high 15 节。

## 3. DSH 复核

- 逐节核对 C27/C28 原文：Itô 过程形式、SDE 存在唯一性、线性 SDE、Itô 公式、多维/相关 Brown、量化 SDE、数值弱强收敛、生成元/Feynman–Kac/测度变换；时间序列平稳/白噪声、ACF/PACF、AR、MA/ARMA、估计定阶诊断、多步预测、量化误用。
- 先修/相关全部为真实节，无自指、无未知 ID，先修不指向未来章。
- keyFormulas 全部来自本章 equationIndex；C28.7 无独立公式，合理为空。
- 新 tags 已登记；rationale ≥139 字并引用实际定理/例题。
- 15 节置 reviewed:true / reviewedBy:DSH；top-level metadataStatus:reviewed。
- 测试收口：图测试更新为 29 章 / 184 节 / 441 先修 / 380 相关、未标注 5 章；未标注靶点改为 C29。

## 4. 实际运行

| 命令 | 结果 |
|---|---|
| metadata:validate | 29 章 / 184 节；0 error，0 warning |
| content:build | 0 error；4 个既有 >1MB warning |
| content:graph | 219 / 184 / 441 / 380 / 0 环 |
| content:validate | 0 error，4 warning |
| test:content | 58 / 58 |
| web test | 110 / 110 |
| web build | 0 error；主 JS gzip 69.68KB |

## 5. 已知限制

- 剩余 5 章 / 35 节仍为“标注完善中”，不生成假边。
- T14 公式收藏、Phase 6 开源准备仍为 backlog/待确认。
- 4 个 >1MB 单节未二次拆分。
- Batch 11 建议：C29/C30/C31（约 20 节）。
