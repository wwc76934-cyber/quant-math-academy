# T02 元数据 DSH 复核记录

- 复核人：DSH
- 日期：2026-11-08
- 对象：`content/metadata/chapters/{c01,c08,c11,c33}.json`（25 个一级节）
- 结论：**通过，标记为 reviewed；在 AGY 草稿上做 5 处必要性校准**

## 1. 复核范围

逐节阅读 AGY 的 D/P、minutes、examFrequency、tags、applications、prerequisites、related、learningObjective、keyFormulas 与 rationale，并抽查正文依据。

- 25/25 节字段齐全，rationale 均引用正文特征。
- 先修图无环、无未来节、无自环；keyFormulas 均存在。
- 难度判断整体与 `CONTENT_MODEL.md` 校准示例一致；D 级不做改动。
- 必要性判断偏保守（P0 15/25，60%），对“实习冲刺”路径区分度不足，调整 5 节。

## 2. 五处优先级校准

| 节 | 原 | 新 | 理由 |
|---|---|---|---|
| c01-s1 命题、逻辑联结词与量词 | P0 / high | **P1 / medium** | 逻辑与量词是证明语言基础，但量化实习笔试很少直接考形式逻辑；冲刺期不应优先占用 P0 预算 |
| c01-s2 证明的基本方法 | P0 / high | **P1 / medium** | 证明范式是全书基础，但实习笔试以计算/概率题为主；保留为重点掌握即可 |
| c08-s6 量化金融中的应用 | P0 / high | **P1 / medium** | SMW/主元 Cholesky 是实用工具，但依赖 Cholesky/SVD，且可由实现库辅助；不宜与 SVD 同级 |
| c33-s1 无套利与定价基本定理 | P0 / high | **P1 / medium** | FTAP 的分离超平面证明抽象度高，对多数实习岗位不是首轮必考；衍生品方向可再升 P0 |
| c33-s5 Black–Scholes 模型与公式 | P1 / high | **P0 / high** | BS 公式、平价关系与对冲直觉是衍生品及量化面试核心；原 P1 与“面试必问”的 rationale 自相矛盾 |

调整后分布：

- P0：12 节（48%）
- P1：11 节（44%）
- P2：1 节（4%，c01-s6）
- P3：1 节（4%，c01-s4）
- D1 1 / D2 9 / D3 10 / D4 5 / D5 0

说明：

- D5 在四个试点章中确实没有；C33 的 FTAP/连续时间框架虽长，但教材已紧凑化，D4 更合适。D5 留给 C25/C27 等高级章。
- C01-s1/s2 的 `examFrequency` 由 high 改为 medium，与 P1 校准一致；C08-s6、C33-s1 同样改为 medium。
- 其余 20 节保持 AGY 判断。

## 3. 仍存不确定（Phase 2 可再校准）

1. C08-s1 QR 定为 P0：若目标岗位偏统计/因子，QR 可降 P1；当前按“线性代数核心 + 最小二乘标准解法”保留 P0。
2. C11-s6 量化应用定为 P0：夏普比率确属通用语言；若按纯理论路径，可降 P1。
3. C33-s6 希腊字母定为 P0：对衍生品方向成立；对纯因子岗位可降 P1。
4. C01-s5 ε-N 极限定为 P0：作为分析语言保留；若用户目标偏应用，可降 P1。
5. C01-s3 定为 D1/P1：确界概念本身简单，但它是 C01-s4 的前置；P1 合理。

这些不确定项记录在案，不阻塞 Phase 1；Phase 2 批量标注时结合用户反馈再统一校准。

## 4. 复核操作

- 25 节 `reviewed` 设为 `true`，`reviewedBy: "DSH"`，`reviewedAt: "2026-11-08"`。
- 4 章 `metadataStatus` 设为 `"reviewed"`。
- 运行 `npm run metadata:validate`：25/25 覆盖，0 error、0 warning；P0 12 / P1 11 / P2 1 / P3 1。
- 重跑 `npm run content:build` 合并元数据；`content:validate` 0 error、4 个单节 >1MB warning。
- `book.json` 的 `c11-s4` 已带 `D3/P0/75`，章节 manifest 的 `meta` 已带完整 rationale/先修/公式。

## 5. 复核结论

T02 通过。D/P 标注从“AGY 草稿”转为“DSH 已复核”，可用于 Phase 1 目录、阅读页右栏与后续路径生成。全书批量标注仍须逐章复核，不得把本记录当作其余 30 章的免检依据。
