# 第8章习题参考答案与解析

## 1. 
设矩阵 $\boldsymbol{A} = \begin{bmatrix} 1 & 2 \\ 2 & 1 \\ 2 & 4 \end{bmatrix}$ 的两列分别为 $\boldsymbol{a}_1 = (1, 2, 2)^\top$ 与 $\boldsymbol{a}_2 = (2, 1, 4)^\top$。

首先对第一列实施正规化。计算其欧氏范数：
$$
r_{11} = \|\boldsymbol{a}_1\|_2 = \sqrt{1^2 + 2^2 + 2^2} = 3
$$
由此得到第一个标准正交基向量：
$$
\boldsymbol{q}_1 = \frac{\boldsymbol{a}_1}{r_{11}} = \begin{bmatrix} \frac{1}{3} \\ \frac{2}{3} \\ \frac{2}{3} \end{bmatrix}
$$
接着将 $\boldsymbol{a}_2$ 投影到 $\boldsymbol{q}_1$ 上，得到上三角矩阵的非对角元：
$$
r_{12} = \boldsymbol{q}_1^\top \boldsymbol{a}_2 = \frac{1}{3}(1\times 2 + 2\times 1 + 2\times 4) = 4
$$
计算正交补向量：
$$
\tilde{\boldsymbol{q}}_2 = \boldsymbol{a}_2 - r_{12}\boldsymbol{q}_1 = \begin{bmatrix} 2 \\ 1 \\ 4 \end{bmatrix} - 4 \begin{bmatrix} \frac{1}{3} \\ \frac{2}{3} \\ \frac{2}{3} \end{bmatrix} = \begin{bmatrix} \frac{2}{3} \\ -\frac{5}{3} \\ \frac{4}{3} \end{bmatrix}
$$
计算 $\tilde{\boldsymbol{q}}_2$ 的模长作为对角元 $r_{22}$：
$$
r_{22} = \|\tilde{\boldsymbol{q}}_2\|_2 = \sqrt{\left(\frac{2}{3}\right)^2 + \left(-\frac{5}{3}\right)^2 + \left(\frac{4}{3}\right)^2} = \frac{\sqrt{45}}{3} = \sqrt{5}
$$
单位化后得到第二个基向量：
$$
\boldsymbol{q}_2 = \frac{\tilde{\boldsymbol{q}}_2}{r_{22}} = \begin{bmatrix} \frac{2}{3\sqrt{5}} \\ -\frac{5}{3\sqrt{5}} \\ \frac{4}{3\sqrt{5}} \end{bmatrix}
$$
由此求得正交矩阵 $\boldsymbol{Q}$ 与上三角矩阵 $\boldsymbol{R}$ 分别为：
$$
\boldsymbol{Q} = \begin{bmatrix} \frac{1}{3} & \frac{2}{3\sqrt{5}} \\ \frac{2}{3} & -\frac{\sqrt{5}}{3} \\ \frac{2}{3} & \frac{4}{3\sqrt{5}} \end{bmatrix}, \qquad \boldsymbol{R} = \begin{bmatrix} 3 & 4 \\ 0 & \sqrt{5} \end{bmatrix}
$$
对结果进行直接验证。首先计算 $\boldsymbol{Q}^\top \boldsymbol{Q}$：
$$
\boldsymbol{Q}^\top \boldsymbol{Q} = \begin{bmatrix} \frac{1}{9}(1+4+4) & \frac{1}{9\sqrt{5}}(2-10+8) \\ \frac{1}{9\sqrt{5}}(2-10+8) & \frac{1}{45}(4+25+16) \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \boldsymbol{I}_2
$$
再验证乘积 $\boldsymbol{Q}\boldsymbol{R}$：
$$
\boldsymbol{Q}\boldsymbol{R} = \begin{bmatrix} 3\times\frac{1}{3} & 4\times\frac{1}{3} + \sqrt{5}\times\frac{2}{3\sqrt{5}} \\ 3\times\frac{2}{3} & 4\times\frac{2}{3} - \sqrt{5}\times\frac{\sqrt{5}}{3} \\ 3\times\frac{2}{3} & 4\times\frac{2}{3} + \sqrt{5}\times\frac{4}{3\sqrt{5}} \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 2 & 1 \\ 2 & 4 \end{bmatrix} = \boldsymbol{A}
$$
满足全部要求。

常见错误剖析：一是混淆经典 Gram–Schmidt 与修正 Gram–Schmidt 过程，在此题虽只有两列因而不存在累积正交性损失差异，但在列数较多时直接套用经典公式会使正交性严重退化；二是投影时未将 $\boldsymbol{a}_2$ 投影在单位向量 $\boldsymbol{q}_1$ 而是误投影在未正规化的 $\boldsymbol{a}_1$ 上，导致系数计算错误。

## 2. 
采用 Householder 反射变换对矩阵 $\boldsymbol{A}$ 求解 $QR$ 分解。目标是通过两次正交反射变换将 $\boldsymbol{A}$ 化为上三角矩阵，且保持对角元严格为正。

第一步，处理第一列 $\boldsymbol{a}_1 = (1, 2, 2)^\top$。其范数为 $\|\boldsymbol{a}_1\|_2 = 3$。为使变换后的首项对角元为正，设定目标向量为 $3\boldsymbol{e}_1 = (3, 0, 0)^\top$。选取反射向量：
$$
\boldsymbol{v}_1 = \boldsymbol{a}_1 - 3\boldsymbol{e}_1 = \begin{bmatrix} -2 \\ 2 \\ 2 \end{bmatrix} = 2 \begin{bmatrix} -1 \\ 1 \\ 1 \end{bmatrix}
$$
令方向单位化基矢 $\boldsymbol{u}_1 = (-1, 1, 1)^\top$，有 $\boldsymbol{u}_1^\top \boldsymbol{u}_1 = 3$。构造反射矩阵 $\boldsymbol{H}_1 = \boldsymbol{I}_3 - \frac{2}{\boldsymbol{u}_1^\top \boldsymbol{u}_1}\boldsymbol{u}_1\boldsymbol{u}_1^\top$。将其作用于 $\boldsymbol{a}_1$ 与 $\boldsymbol{a}_2$：
$$
\boldsymbol{H}_1 \boldsymbol{a}_1 = \boldsymbol{a}_1 - \frac{2(\boldsymbol{u}_1^\top \boldsymbol{a}_1)}{3}\boldsymbol{u}_1 = \begin{bmatrix} 1 \\ 2 \\ 2 \end{bmatrix} - \frac{2(-1+2+2)}{3}\begin{bmatrix} -1 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 0 \\ 0 \end{bmatrix}
$$
$$
\boldsymbol{H}_1 \boldsymbol{a}_2 = \boldsymbol{a}_2 - \frac{2(\boldsymbol{u}_1^\top \boldsymbol{a}_2)}{3}\boldsymbol{u}_1 = \begin{bmatrix} 2 \\ 1 \\ 4 \end{bmatrix} - \frac{2(-2+1+4)}{3}\begin{bmatrix} -1 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 4 \\ -1 \\ 2 \end{bmatrix}
$$
变换后的矩阵变为：
$$
\boldsymbol{A}^{(1)} = \boldsymbol{H}_1 \boldsymbol{A} = \begin{bmatrix} 3 & 4 \\ 0 & -1 \\ 0 & 2 \end{bmatrix}
$$
第二步，消除第二列子向量 $\boldsymbol{x}_2 = (-1, 2)^\top$ 的下三角元素。计算其范数 $\|\boldsymbol{x}_2\|_2 = \sqrt{(-1)^2 + 2^2} = \sqrt{5}$。为保证对角元为正，选取目标向量为 $(\sqrt{5}, 0)^\top$。构造 $2$ 阶反射向量：
$$
\boldsymbol{v}_2 = \boldsymbol{x}_2 - \sqrt{5}\boldsymbol{e}_1 = \begin{bmatrix} -1 - \sqrt{5} \\ 2 \end{bmatrix}
$$
计算其内积：
$$
\boldsymbol{v}_2^\top \boldsymbol{v}_2 = (-1-\sqrt{5})^2 + 4 = 10 + 2\sqrt{5}
$$
对应的 $2$ 阶 Householder 变换满足 $\boldsymbol{H}_2' \boldsymbol{x}_2 = (\sqrt{5}, 0)^\top$。扩充为 $3\times 3$ 块对角矩阵 $\boldsymbol{H}_2 = \operatorname{diag}(1, \boldsymbol{H}_2')$，作用后得到：
$$
\boldsymbol{R} = \boldsymbol{H}_2 \boldsymbol{H}_1 \boldsymbol{A} = \begin{bmatrix} 3 & 4 \\ 0 & \sqrt{5} \\ 0 & 0 \end{bmatrix}
$$
取其紧凑形式（即前两行），即为 $2\times 2$ 的上三角矩阵 $\boldsymbol{R} = \begin{bmatrix} 3 & 4 \\ 0 & \sqrt{5} \end{bmatrix}$。

对比题 1 的结果，两种方法得到的上三角因子 $\boldsymbol{R}$ 完全一致。根据定理 8.4，当实矩阵 $\boldsymbol{A}$ 列满秩时，若限定上三角因子 $\boldsymbol{R}$ 的主对角线元素严格为正，则其分解因子 $\boldsymbol{Q}$（薄 $QR$ 意义下）与 $\boldsymbol{R}$ 唯一确定。由于 Gram–Schmidt 与 Householder 反射两种算法均满足正交性与对角元严格为正的约定，由唯一性定理，二者所得的 $\boldsymbol{R}$ 必然完全相同。

常见错误剖析：为了避免数值消去误差，标准 Householder 算法通常选择 $\boldsymbol{v}_1 = \boldsymbol{a}_1 + \operatorname{sgn}(a_{11})\|\boldsymbol{a}_1\|_2\boldsymbol{e}_1$。若直接取加号，第一列会变换为 $(-3, 0, 0)^\top$，得到负对角元。此时所得的 $\boldsymbol{R}$ 与 Gram–Schmidt 结果在符号上相差一个对角符号矩阵 $\operatorname{diag}(-1, 1)$。若未注意对角元正负约定，便会误认为两者算法所得 $\boldsymbol{R}$ 不一致。

## 3. 
**证明**
设 $\boldsymbol{Q} = [q_{ij}] \in \mathbb{R}^{n\times n}$ 为上三角正交矩阵，即对任意 $i > j$ 均有 $q_{ij} = 0$，且满足 $\boldsymbol{Q}^\top \boldsymbol{Q} = \boldsymbol{I}_n$。

将 $\boldsymbol{Q}$ 按列分块记为 $\boldsymbol{Q} = [\boldsymbol{q}_1, \boldsymbol{q}_2, \dots, \boldsymbol{q}_n]$。正交性表明其列向量构成 $\mathbb{R}^n$ 的标准正交基，即满足内积关系 $\boldsymbol{q}_i^\top \boldsymbol{q}_j = \delta_{ij}$。

对矩阵维度采用数学归纳法。对于第一列向量 $\boldsymbol{q}_1$，由于 $\boldsymbol{Q}$ 为上三角矩阵，其只有第一个分量非零，即 $\boldsymbol{q}_1 = (q_{11}, 0, \dots, 0)^\top$。由单位范数条件：
$$
\|\boldsymbol{q}_1\|_2^2 = q_{11}^2 = 1 \implies q_{11} = \pm 1
$$
假设对所有指标 $j \le k - 1$，均已证明第 $j$ 列满足 $\boldsymbol{q}_j = q_{jj}\boldsymbol{e}_j$ 且 $q_{jj} = \pm 1$。现考虑第 $k$ 列 $\boldsymbol{q}_k$。因为 $\boldsymbol{Q}$ 为上三角矩阵，其第 $k+1$ 至第 $n$ 个分量皆为零，故可表示为：
$$
\boldsymbol{q}_k = \sum_{j=1}^{k} q_{jk}\boldsymbol{e}_j
$$
利用 $\boldsymbol{q}_k$ 与前 $k-1$ 个基向量的正交性条件，对任意 $1 \le j \le k - 1$，均有：
$$
0 = \boldsymbol{q}_j^\top \boldsymbol{q}_k = (q_{jj}\boldsymbol{e}_j)^\top \boldsymbol{q}_k = q_{jj} q_{jk}
$$
由于归纳假设给出 $q_{jj} = \pm 1 \ne 0$，两端同除以 $q_{jj}$ 即得 $q_{jk} = 0$。这表明第 $k$ 列在主对角线之上的元素全为零，从而 $\boldsymbol{q}_k = q_{kk}\boldsymbol{e}_k$。

再根据单位长度条件：
$$
\|\boldsymbol{q}_k\|_2^2 = q_{kk}^2 = 1 \implies q_{kk} = \pm 1
$$
由数学归纳法原理，对任意 $1 \le i \le n$，均有 $\boldsymbol{q}_i = \pm \boldsymbol{e}_i$。因此，非对角元恒为零，$\boldsymbol{Q}$ 必为对角矩阵，且对角元取值为 $\pm 1$。

□

现说明该性质对 $QR$ 分解唯一性的影响。设列满秩矩阵 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 存在两个分解形式 $\boldsymbol{A} = \boldsymbol{Q}_1 \boldsymbol{R}_1 = \boldsymbol{Q}_2 \boldsymbol{R}_2$。两端左乘 $\boldsymbol{Q}_2^\top$ 并右乘 $\boldsymbol{R}_1^{-1}$，整理可得：
$$
\boldsymbol{Q}_2^\top \boldsymbol{Q}_1 = \boldsymbol{R}_2 \boldsymbol{R}_1^{-1}
$$
记 $\boldsymbol{U} = \boldsymbol{Q}_2^\top \boldsymbol{Q}_1$。一方面，正交矩阵的乘积仍为正交矩阵，故 $\boldsymbol{U}^\top \boldsymbol{U} = \boldsymbol{I}_n$；另一方面，上三角矩阵的逆与上三角矩阵的乘积依然为上三角矩阵，故 $\boldsymbol{U}$ 为上三角矩阵。由上述定理，$\boldsymbol{U}$ 必须为对角矩阵 $\boldsymbol{D} = \operatorname{diag}(d_1, \dots, d_n)$，且 $d_i \in \{+1, -1\}$。

由此导出 $\boldsymbol{R}_2 = \boldsymbol{D} \boldsymbol{R}_1$。这意味着 $\boldsymbol{R}_2$ 的第 $i$ 行等于 $\boldsymbol{R}_1$ 的第 $i$ 行乘上符号因子 $d_i$。在没有额外约束时，存在 $2^n$ 种正负号选取方案。因此，为了确立 $QR$ 分解的唯一性，必须人为施加符号约定。通常约定对角元全部严格为正，即 $r_{ii} > 0$，从而强制 $d_i = +1$，保证了 $\boldsymbol{D} = \boldsymbol{I}_n$，进而实现因子的唯一性。

常见错误剖析：一是证明上三角正交矩阵必为对角矩阵时仅说明行或列正交，未通过归纳法或严格消去推导非对角元必然为零；二是认为矩阵的分解都是天然唯一的，未注意到基底方向的反转（乘以 $-1$）同样保持度量与正交关系不变。

## 4. 
**证明**
设 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 列满秩，其薄 $QR$ 分解为 $\boldsymbol{A} = \boldsymbol{Q}\boldsymbol{R}$，其中 $\boldsymbol{Q} \in \mathbb{R}^{m\times n}$ 满足 $\boldsymbol{Q}^\top \boldsymbol{Q} = \boldsymbol{I}_n$，$\boldsymbol{R} \in \mathbb{R}^{n\times n}$ 为非奇异上三角矩阵。
考虑 Gram 矩阵：
$$
\boldsymbol{A}^\top \boldsymbol{A} = (\boldsymbol{Q}\boldsymbol{R})^\top (\boldsymbol{Q}\boldsymbol{R}) = \boldsymbol{R}^\top \boldsymbol{Q}^\top \boldsymbol{Q} \boldsymbol{R} = \boldsymbol{R}^\top \boldsymbol{R}
$$
由于矩阵的奇异值定义为其转置与自身乘积的特征值的非负平方根，对任意 $1 \le i \le n$，有：
$$
\sigma_i(\boldsymbol{A}) = \sqrt{\lambda_i(\boldsymbol{A}^\top \boldsymbol{A})} = \sqrt{\lambda_i(\boldsymbol{R}^\top \boldsymbol{R})} = \sigma_i(\boldsymbol{R})
$$
因此矩阵 $\boldsymbol{A}$ 与上三角因子 $\boldsymbol{R}$ 拥有完全相同的非零奇异值谱。特别地：
$$
\sigma_{\max}(\boldsymbol{A}) = \sigma_{\max}(\boldsymbol{R}), \qquad \sigma_{\min}(\boldsymbol{A}) = \sigma_{\min}(\boldsymbol{R})
$$
由谱范数条件数的定义：
$$
\operatorname{cond}_2(\boldsymbol{A}) = \frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})} = \frac{\sigma_{\max}(\boldsymbol{R})}{\sigma_{\min}(\boldsymbol{R})} = \operatorname{cond}_2(\boldsymbol{R})
$$
即等式 $\operatorname{cond}_2(\boldsymbol{R}) = \operatorname{cond}_2(\boldsymbol{A})$ 得证。

□

在求解超定线性最小二乘问题 $\min_{\boldsymbol{x}} \|\boldsymbol{A}\boldsymbol{x} - \boldsymbol{b}\|_2$ 时，正规方程法通过求解 $\boldsymbol{A}^\top \boldsymbol{A}\boldsymbol{x} = \boldsymbol{A}^\top \boldsymbol{b}$ 获得解。其系数矩阵 $\boldsymbol{A}^\top \boldsymbol{A}$ 的谱条件数为：
$$
\operatorname{cond}_2(\boldsymbol{A}^\top \boldsymbol{A}) = \frac{\sigma_{\max}^2(\boldsymbol{A})}{\sigma_{\min}^2(\boldsymbol{A})} = (\operatorname{cond}_2(\boldsymbol{A}))^2
$$
条件数的平方意味着病态程度急剧放大。例如当 $\operatorname{cond}_2(\boldsymbol{A}) = 10^8$ 时，$\operatorname{cond}_2(\boldsymbol{A}^\top \boldsymbol{A}) = 10^{16}$，在标准 IEEE 754 双精度浮点（机器精度约为 $2.22 \times 10^{-16}$）运算下，所有有效数字将全部损失。
相对而言，$QR$ 分解法将原问题化为三角方程组 $\boldsymbol{R}\boldsymbol{x} = \boldsymbol{Q}^\top \boldsymbol{b}$。由于 $\operatorname{cond}_2(\boldsymbol{R}) = \operatorname{cond}_2(\boldsymbol{A})$，求解过程完全避免了条件数平方的不利放大，因而在数值计算中具有无可比拟的稳定性与精度优势。

常见错误剖析：一是混淆全正交矩阵与列正交矩阵的算子性质，直接套用方阵条件数乘积公式 $\operatorname{cond}(\boldsymbol{A}\boldsymbol{B}) \le \operatorname{cond}(\boldsymbol{A})\operatorname{cond}(\boldsymbol{B})$，试图证明等式却只能得出不等式；二是误认为正规方程法在理论和数值计算上完全等价，忽视了有限浮点精度下平方效应对数值稳定性的致命破坏。

## 5. 
针对题中所给出的三个实对称矩阵，分别计算其各阶顺序主子式以判定正定性，并对正定矩阵给出 Cholesky 分解因子 $\boldsymbol{L}$。

首先考察矩阵 (a)：
$$
\boldsymbol{A}_1 = \begin{bmatrix} 9 & 3 \\ 3 & 5 \end{bmatrix}
$$
其一阶顺序主子式为 $\Delta_1 = 9 > 0$；二阶顺序主子式为行列式：
$$
\Delta_2 = 9\times 5 - 3^2 = 45 - 9 = 36 > 0
$$
各阶顺序主子式均严格大于零，故 $\boldsymbol{A}_1$ 为对称正定矩阵。设其 Cholesky 分解为 $\boldsymbol{A}_1 = \boldsymbol{L}\boldsymbol{L}^\top$，其中 $\boldsymbol{L} = \begin{bmatrix} l_{11} & 0 \\ l_{21} & l_{22} \end{bmatrix}$ 为下三角矩阵且对角元为正。计算得：
$$
l_{11} = \sqrt{9} = 3
$$
$$
l_{21} = \frac{3}{l_{11}} = \frac{3}{3} = 1
$$
$$
l_{22} = \sqrt{5 - l_{21}^2} = \sqrt{5 - 1} = 2
$$
因此 Cholesky 分解因子为：
$$
\boldsymbol{L} = \begin{bmatrix} 3 & 0 \\ 1 & 2 \end{bmatrix}
$$

接着考察矩阵 (b)：
$$
\boldsymbol{A}_2 = \begin{bmatrix} 2 & 1 & 0 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{bmatrix}
$$
计算各阶顺序主子式：
$$
\Delta_1 = 2 > 0
$$
$$
\Delta_2 = 2\times 2 - 1\times 1 = 3 > 0
$$
$$
\Delta_3 = 2(4 - 1) - 1(2 - 0) + 0 = 6 - 2 = 4 > 0
$$
由于各阶顺序主子式均大于零，故 $\boldsymbol{A}_2$ 为对称正定矩阵。设其 Cholesky 因子为下三角矩阵 $\boldsymbol{L}$。逐列递推计算元素：
$$
l_{11} = \sqrt{2}
$$
$$
l_{21} = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}, \qquad l_{31} = \frac{0}{\sqrt{2}} = 0
$$
$$
l_{22} = \sqrt{2 - l_{21}^2} = \sqrt{2 - \frac{1}{2}} = \frac{\sqrt{6}}{2}
$$
$$
l_{32} = \frac{1 - l_{31}l_{21}}{l_{22}} = \frac{1}{\sqrt{3/2}} = \frac{\sqrt{6}}{3}
$$
$$
l_{33} = \sqrt{2 - l_{31}^2 - l_{32}^2} = \sqrt{2 - 0 - \frac{2}{3}} = \frac{2\sqrt{3}}{3}
$$
因此 Cholesky 分解因子为：
$$
\boldsymbol{L} = \begin{bmatrix} \sqrt{2} & 0 & 0 \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{6}}{2} & 0 \\ 0 & \frac{\sqrt{6}}{3} & \frac{2\sqrt{3}}{3} \end{bmatrix}
$$

最后考察矩阵 (c)：
$$
\boldsymbol{A}_3 = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}
$$
其一阶顺序主子式为 $\Delta_1 = 1 > 0$，但二阶顺序主子式为：
$$
\Delta_2 = 1\times 1 - 2^2 = -3 < 0
$$
由于行列式小于零，矩阵并非正定矩阵（其特征值为 $3$ 与 $-1$，属于不定矩阵）。因此，矩阵 (c) 不存在实数范围内的 Cholesky 分解。

常见错误剖析：一是判定正定性时只检查主对角线元素大于零，未考虑到非对角元素过大破坏正定性的情况（如矩阵 (c)）；二是在计算 Cholesky 因子递推时遗漏了已求下三角项平方和的扣除，直接用原矩阵对角项开方导致对角元错误。
## 6. 
**证明**
设 $\boldsymbol{A} \in \mathbb{R}^{n\times n}$ 为对称正定矩阵（记为 $\boldsymbol{A} \succ \boldsymbol{0}$），其 Cholesky 分解为 $\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top$，其中 $\boldsymbol{L}$ 为主对角元满足 $l_{ii} > 0$ 的实下三角矩阵。
由矩阵逆运算性质，有：
$$
\boldsymbol{A}^{-1} = (\boldsymbol{L}\boldsymbol{L}^\top)^{-1} = (\boldsymbol{L}^\top)^{-1}\boldsymbol{L}^{-1} = \boldsymbol{L}^{-\top}\boldsymbol{L}^{-1}
$$
对任意非零向量 $\boldsymbol{x} \in \mathbb{R}^n$，令 $\boldsymbol{y} = \boldsymbol{L}^{-1}\boldsymbol{x}$。由于 $\boldsymbol{L}$ 的主对角元均严格大于零，故 $\boldsymbol{L}$ 非奇异。当 $\boldsymbol{x} \ne \boldsymbol{0}$ 时必有 $\boldsymbol{y} \ne \boldsymbol{0}$。由实内积正定性：
$$
\boldsymbol{x}^\top \boldsymbol{A}^{-1}\boldsymbol{x} = \boldsymbol{x}^\top \boldsymbol{L}^{-\top}\boldsymbol{L}^{-1}\boldsymbol{x} = (\boldsymbol{L}^{-1}\boldsymbol{x})^\top (\boldsymbol{L}^{-1}\boldsymbol{x}) = \boldsymbol{y}^\top \boldsymbol{y} = \|\boldsymbol{y}\|_2^2 > 0
$$
同时容易验证对称性：
$$
(\boldsymbol{A}^{-1})^\top = (\boldsymbol{L}^{-\top}\boldsymbol{L}^{-1})^\top = \boldsymbol{L}^{-\top}\boldsymbol{L}^{-1} = \boldsymbol{A}^{-1}
$$
因此 $\boldsymbol{A}^{-1}$ 亦为实对称正定矩阵。
根据行列式的乘积定理与转置不变性：
$$
\det\boldsymbol{A} = \det(\boldsymbol{L}\boldsymbol{L}^\top) = (\det\boldsymbol{L})(\det\boldsymbol{L}^\top) = (\det\boldsymbol{L})^2
$$
下三角矩阵的行列式恒等于其主对角线元素之积，即 $\det\boldsymbol{L} = \prod_{i=1}^n l_{ii}$，由此即得：
$$
\det\boldsymbol{A} = \left(\prod_{i=1}^n l_{ii}\right)^2
$$
现设 $\boldsymbol{A}_k \in \mathbb{R}^{k\times k}$（$1 \le k \le n$）为 $\boldsymbol{A}$ 的第 $k$ 阶顺序主子矩阵。将 $\boldsymbol{L}$ 按前 $k$ 行和前 $k$ 列分块：
$$
\boldsymbol{L} = \begin{bmatrix} \boldsymbol{L}_k & \boldsymbol{0} \\ \boldsymbol{L}_{21} & \boldsymbol{L}_{22} \end{bmatrix}
$$
其中 $\boldsymbol{L}_k \in \mathbb{R}^{k\times k}$ 仍为主对角元严格大于零的下三角矩阵。由分块矩阵乘法：
$$
\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top = \begin{bmatrix} \boldsymbol{L}_k & \boldsymbol{0} \\ \boldsymbol{L}_{21} & \boldsymbol{L}_{22} \end{bmatrix} \begin{bmatrix} \boldsymbol{L}_k^\top & \boldsymbol{L}_{21}^\top \\ \boldsymbol{0} & \boldsymbol{L}_{22}^\top \end{bmatrix} = \begin{bmatrix} \boldsymbol{L}_k\boldsymbol{L}_k^\top & \boldsymbol{L}_k\boldsymbol{L}_{21}^\top \\ \boldsymbol{L}_{21}\boldsymbol{L}_k^\top & \boldsymbol{L}_{21}\boldsymbol{L}_{21}^\top + \boldsymbol{L}_{22}\boldsymbol{L}_{22}^\top \end{bmatrix}
$$
比较左上角 $k\times k$ 子块可知，$\boldsymbol{A}_k = \boldsymbol{L}_k \boldsymbol{L}_k^\top$。对任意非零向量 $\boldsymbol{z} \in \mathbb{R}^k$，有：
$$
\boldsymbol{z}^\top \boldsymbol{A}_k \boldsymbol{z} = \|\boldsymbol{L}_k^\top \boldsymbol{z}\|_2^2 > 0
$$
故 $\boldsymbol{A}_k$ 恒为正定矩阵。同时该等式说明，顺序主子矩阵 $\boldsymbol{A}_k$ 的 Cholesky 分解因子恰好即为原分解因子 $\boldsymbol{L}$ 的左上角 $k\times k$ 对应子块 $\boldsymbol{L}_k$。

□

常见错误剖析：一是求逆展开时混淆转置运算顺序，误写成 $\boldsymbol{L}^{-1}\boldsymbol{L}^{-\top}$；二是在证明顺序主子矩阵正定时，过度依赖行列式判定法或特征值交错定理等间接工具，未利用通过分块矩阵乘法直接得到 $\boldsymbol{A}_k = \boldsymbol{L}_k\boldsymbol{L}_k^\top$ 的构造性证明。

## 7. 
**证明**
设 $\boldsymbol{A} \in \mathbb{R}^{n\times n}$ 为对称正定矩阵。由对称矩阵谱分解定理，存在正交矩阵 $\boldsymbol{U}$ 与对角矩阵 $\boldsymbol{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$（其中特征值 $\lambda_i > 0$）使得 $\boldsymbol{A} = \boldsymbol{U}\boldsymbol{\Lambda}\boldsymbol{U}^\top$。
其唯一的对称正定平方根定义为：
$$
\boldsymbol{A}^{1/2} = \boldsymbol{U}\boldsymbol{\Lambda}^{1/2}\boldsymbol{U}^\top
$$
其中 $\boldsymbol{\Lambda}^{1/2} = \operatorname{diag}(\sqrt{\lambda_1}, \dots, \sqrt{\lambda_n})$。显见 $(\boldsymbol{A}^{1/2})^\top = \boldsymbol{A}^{1/2}$，即 $\boldsymbol{A}^{1/2}$ 必须是对称矩阵。

另一方面，由实矩阵 Cholesky 分解定理，存在唯一的对角元全为正数的下三角矩阵 $\boldsymbol{L}$ 使得 $\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top$。
若 $\boldsymbol{L} = \boldsymbol{A}^{1/2}$，则 $\boldsymbol{L}$ 必须为对称矩阵，即 $\boldsymbol{L}^\top = \boldsymbol{L}$。由于 $\boldsymbol{L}$ 既是对称矩阵又是下三角矩阵，其非对角元素必须处处为零，从而 $\boldsymbol{L}$ 必为对角矩阵。
反之，若 $\boldsymbol{L}$ 为对角矩阵，记 $\boldsymbol{L} = \operatorname{diag}(l_1, \dots, l_n)$（其中 $l_i > 0$），则：
$$
\boldsymbol{A} = \boldsymbol{L}\boldsymbol{L}^\top = \operatorname{diag}(l_1^2, \dots, l_n^2)
$$
此时 $\boldsymbol{A}$ 本身即为对角矩阵。由对称正定平方根的唯一性可得：
$$
\boldsymbol{A}^{1/2} = \operatorname{diag}(\sqrt{l_1^2}, \dots, \sqrt{l_n^2}) = \operatorname{diag}(l_1, \dots, l_n) = \boldsymbol{L}
$$
因此，Cholesky 因子 $\boldsymbol{L}$ 与对称正定平方根 $\boldsymbol{A}^{1/2}$ 相等的充要条件是：矩阵 $\boldsymbol{A}$ 为对角矩阵。
对于一般的对称正定矩阵，非对角元不全为零，此时 $\boldsymbol{L}$ 严格包含非零的下三角非对角元，并不对称；而 $\boldsymbol{A}^{1/2}$ 恒对称，故二者在通常情况下并不相同。

□

常见错误剖析：一是混淆广义的矩阵分解因子（即满足 $\boldsymbol{M}\boldsymbol{M}^\top = \boldsymbol{A}$ 的矩阵）与经过特征谱唯一定义的“对称正定平方根”（要求自身对称正定且满足 $\boldsymbol{M}^2 = \boldsymbol{A}$）；二是在论述充分必要条件时遗漏了下三角对称矩阵必为对角矩阵这一关键几何与代数特征。
## 8. 
求长方矩阵 $\boldsymbol{A} = \begin{bmatrix} 0 & 1 \\ -1 & 0 \\ 1 & 1 \end{bmatrix}$ 的奇异值分解。该矩阵维度为 $3\times 2$。

首先计算对阵半正定矩阵 $\boldsymbol{A}^\top \boldsymbol{A}$：
$$
\boldsymbol{A}^\top \boldsymbol{A} = \begin{bmatrix} 0 & -1 & 1 \\ 1 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 1 \\ -1 & 0 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}
$$
其特征多项式为 $\det(\lambda\boldsymbol{I}_2 - \boldsymbol{A}^\top\boldsymbol{A}) = (\lambda - 2)^2 - 1 = (\lambda - 3)(\lambda - 1) = 0$。求得特征值为 $\lambda_1 = 3, \lambda_2 = 1$。
由此得到全部奇异值：
$$
\sigma_1 = \sqrt{3}, \qquad \sigma_2 = 1
$$
计算对应的单位右奇异向量 $\boldsymbol{v}_1, \boldsymbol{v}_2$：
对于 $\lambda_1 = 3$，由 $(\boldsymbol{A}^\top\boldsymbol{A} - 3\boldsymbol{I})\boldsymbol{v}_1 = \boldsymbol{0}$ 解得单位向量 $\boldsymbol{v}_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \end{bmatrix}$。
对于 $\lambda_2 = 1$，由 $(\boldsymbol{A}^\top\boldsymbol{A} - \boldsymbol{I})\boldsymbol{v}_2 = \boldsymbol{0}$ 解得单位向量 $\boldsymbol{v}_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} -1 \\ 1 \end{bmatrix}$。
于是右奇异矩阵为：
$$
\boldsymbol{V} = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}
$$
通过关系式 $\boldsymbol{u}_i = \frac{1}{\sigma_i}\boldsymbol{A}\boldsymbol{v}_i$ 计算前两个左奇异向量：
$$
\boldsymbol{u}_1 = \frac{1}{\sqrt{3}}\boldsymbol{A}\boldsymbol{v}_1 = \frac{1}{\sqrt{6}}\begin{bmatrix} 0 & 1 \\ -1 & 0 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \frac{1}{\sqrt{6}}\begin{bmatrix} 1 \\ -1 \\ 2 \end{bmatrix}
$$
$$
\boldsymbol{u}_2 = \frac{1}{1}\boldsymbol{A}\boldsymbol{v}_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 0 & 1 \\ -1 & 0 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} -1 \\ 1 \end{bmatrix} = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}
$$
可验证 $\boldsymbol{u}_1^\top \boldsymbol{u}_2 = 0$ 且模长皆为 $1$。取与 $\boldsymbol{u}_1, \boldsymbol{u}_2$ 均正交的单位向量作为 $\boldsymbol{u}_3$：
$$
\boldsymbol{u}_3 = \frac{1}{\sqrt{3}}\begin{bmatrix} -1 \\ 1 \\ 1 \end{bmatrix}
$$
由此给出紧凑形式（$3\times 2$ 薄 SVD）分解：
$$
\boldsymbol{A} = \boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}^\top = \begin{bmatrix} \frac{1}{\sqrt{6}} & \frac{1}{\sqrt{2}} \\ -\frac{1}{\sqrt{6}} & \frac{1}{\sqrt{2}} \\ \frac{2}{\sqrt{6}} & 0 \end{bmatrix} \begin{bmatrix} \sqrt{3} & 0 \\ 0 & 1 \end{bmatrix} \left(\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}\right)^\top
$$
完整形式（$3\times 3$ 全 SVD）分解为：
$$
\boldsymbol{A} = \boldsymbol{U} \boldsymbol{\Sigma} \boldsymbol{V}^\top = \begin{bmatrix} \frac{1}{\sqrt{6}} & \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{3}} \\ -\frac{1}{\sqrt{6}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{3}} \\ \frac{2}{\sqrt{6}} & 0 & \frac{1}{\sqrt{3}} \end{bmatrix} \begin{bmatrix} \sqrt{3} & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix} \left(\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}\right)^\top
$$

常见错误剖析：一是求出 $\boldsymbol{u}_1, \boldsymbol{u}_2$ 后遗漏了完整 SVD 中正交矩阵 $\boldsymbol{U}$ 必须是 $3\times 3$ 方阵，遗漏了零空间基向量 $\boldsymbol{u}_3$ 的补齐；二是在左奇异向量计算时符号未保持与 $\boldsymbol{A}\boldsymbol{v}_i$ 同向，导致乘积出现负号。

## 9. 
**证明**
设二维正交旋转矩阵为 $\boldsymbol{R}_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$。由于三角恒等式满足 $\cos^2\theta + \sin^2\theta = 1$，易知 $\boldsymbol{R}_\theta^\top \boldsymbol{R}_\theta = \boldsymbol{I}_2$。
由矩阵 $\boldsymbol{B} = \boldsymbol{A}\boldsymbol{R}_\theta$，考察其与自身的对称乘积：
$$
\boldsymbol{B}^\top \boldsymbol{B} = (\boldsymbol{A}\boldsymbol{R}_\theta)^\top (\boldsymbol{A}\boldsymbol{R}_\theta) = \boldsymbol{R}_\theta^\top (\boldsymbol{A}^\top \boldsymbol{A}) \boldsymbol{R}_\theta
$$
该等式表明矩阵 $\boldsymbol{B}^\top \boldsymbol{B}$ 与 $\boldsymbol{A}^\top \boldsymbol{A}$ 正交相似。由于相似变换保持特征多项式及其特征值完全不变，二者的特征值谱恒等：
$$
\lambda_i(\boldsymbol{B}^\top \boldsymbol{B}) = \lambda_i(\boldsymbol{A}^\top \boldsymbol{A})
$$
根据奇异值与特征值的对应关系 $\sigma_i(\boldsymbol{M}) = \sqrt{\lambda_i(\boldsymbol{M}^\top\boldsymbol{M})}$，可得：
$$
\sigma_i(\boldsymbol{B}) = \sqrt{\lambda_i(\boldsymbol{B}^\top\boldsymbol{B})} = \sqrt{\lambda_i(\boldsymbol{A}^\top\boldsymbol{A})} = \sigma_i(\boldsymbol{A})
$$
对于对角矩阵 $\boldsymbol{A} = \operatorname{diag}(2, 1)$，其奇异值直接为对角元素 $2$ 与 $1$，故 $\boldsymbol{B}$ 的奇异值亦严格为 $2$ 与 $1$。

□

几何含义：
矩阵在欧氏空间中的奇异值表示将定义域中的单位圆周映射为值域中的椭圆时，该椭圆各主半轴的几何长度。
矩阵右乘正交矩阵 $\boldsymbol{R}_\theta$ 对应于在输入空间（定义域）先施加一个刚体等距旋转。因为刚体旋转严格保持向量的欧氏长度与内积不变，单位圆周经过该旋转后在几何形态和位置上完全重合于单位圆自身。
随后矩阵 $\boldsymbol{A}$ 作用于该圆周，将其拉伸成长轴半径为 $2$、短轴半径为 $1$ 的标准椭圆。因此，复合变换所生成的值域椭圆在几何尺寸和半轴长度上完全没有发生改变，仅仅是椭圆轴向在空间中的取向与基底对应关系发生了旋转。这正是奇异值具备正交（酉）不变性的几何体现。

常见错误剖析：一是混淆奇异值与特征值，误以为正交矩阵乘在右侧也能保持特征值不变；二是解释几何意义时未区分定义域空间的作用与值域空间的作用，把输入空间的旋转误判为输出椭圆的刚体转动。

## 10. 
**证明**
设矩阵 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 的秩为 $r$。取其紧奇异值分解为 $\boldsymbol{A} = \boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top$，其中 $\boldsymbol{U}_r \in \mathbb{R}^{m\times r}$ 满足 $\boldsymbol{U}_r^\top \boldsymbol{U}_r = \boldsymbol{I}_r$，$\boldsymbol{V}_r \in \mathbb{R}^{n\times r}$ 满足 $\boldsymbol{V}_r^\top \boldsymbol{V}_r = \boldsymbol{I}_r$，而 $\boldsymbol{\Sigma}_r = \operatorname{diag}(\sigma_1, \dots, \sigma_r)$ 且 $\sigma_1 \ge \dots \ge \sigma_r > 0$。

分别计算两对称矩阵：
$$
\boldsymbol{A}\boldsymbol{A}^\top = (\boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top)(\boldsymbol{V}_r \boldsymbol{\Sigma}_r \boldsymbol{U}_r^\top) = \boldsymbol{U}_r \boldsymbol{\Sigma}_r^2 \boldsymbol{U}_r^\top
$$
$$
\boldsymbol{A}^\top \boldsymbol{A} = (\boldsymbol{V}_r \boldsymbol{\Sigma}_r \boldsymbol{U}_r^\top)(\boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top) = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^2 \boldsymbol{V}_r^\top
$$
上式表明矩阵 $\boldsymbol{A}\boldsymbol{A}^\top \in \mathbb{R}^{m\times m}$ 拥有 $r$ 个严格正特征值 $\sigma_1^2, \dots, \sigma_r^2$，且其对应的不变子空间由 $\boldsymbol{U}_r$ 的列张成，正交补空间维数为 $m - r$，对应的特征值均为 $0$。
同理，矩阵 $\boldsymbol{A}^\top \boldsymbol{A} \in \mathbb{R}^{n\times n}$ 亦拥有完全相同的 $r$ 个严格正特征值 $\sigma_1^2, \dots, \sigma_r^2$，其正交补空间维数为 $n - r$，其余特征值均为 $0$。
因此，$\boldsymbol{A}\boldsymbol{A}^\top$ 与 $\boldsymbol{A}^\top \boldsymbol{A}$ 具有完全相同且重数相等的非零特征值，均为 $\sigma_1^2, \dots, \sigma_r^2$。

因为任意实对称方阵的迹恒等于其全体特征值之和，且零特征值对求和不产生贡献，故：
$$
\operatorname{tr}(\boldsymbol{A}\boldsymbol{A}^\top) = \sum_{i=1}^r \sigma_i^2 + \sum_{j=1}^{m-r} 0 = \sum_{i=1}^r \sigma_i^2
$$
$$
\operatorname{tr}(\boldsymbol{A}^\top \boldsymbol{A}) = \sum_{i=1}^r \sigma_i^2 + \sum_{k=1}^{n-r} 0 = \sum_{i=1}^r \sigma_i^2
$$
结合矩阵迹的循环对称恒等式 $\operatorname{tr}(\boldsymbol{A}\boldsymbol{A}^\top) = \operatorname{tr}(\boldsymbol{A}^\top \boldsymbol{A})$，即得：
$$
\operatorname{tr}(\boldsymbol{A}\boldsymbol{A}^\top) = \operatorname{tr}(\boldsymbol{A}^\top \boldsymbol{A}) = \sum_{i=1}^r \sigma_i^2
$$

□

常见错误剖析：一是混淆特征值的平方与奇异值的平方，对非对称矩阵直接套用迹与奇异值的线性关系；二是在陈述两者特征谱关系时忽视了非零的前提，错误宣称二者的特征多项式完全一致，遗漏了 $m \ne n$ 时零特征值重数并不相同。
## 11. 
考虑实对称矩阵 $\boldsymbol{A} = \begin{bmatrix} 3 & 1 & 0 \\ 1 & 3 & 0 \\ 0 & 0 & 2 \end{bmatrix}$。其具有明显的分块对角结构。

首先求解其特征值与特征向量。对于左上角 $2\times 2$ 子块 $\begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$，特征多项式为 $(\lambda - 3)^2 - 1 = 0$，解得特征值为 $4$ 与 $2$；右下角子块直接给出特征值 $2$。
因此全部特征值为 $\lambda_1 = 4, \lambda_2 = 2, \lambda_3 = 2$。对应的标准正交特征向量为：
$$
\boldsymbol{u}_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}, \qquad \boldsymbol{u}_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ -1 \\ 0 \end{bmatrix}, \qquad \boldsymbol{u}_3 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}
$$
由于 $\boldsymbol{A}$ 对称正定，其奇异值即为特征值：$\sigma_1 = 4, \sigma_2 = 2, \sigma_3 = 2$。

根据 Eckart–Young–Mirsky 低秩逼近定理，Frobenius 范数意义下的最佳秩 $k$ 近似由前 $k$ 项外积和给出：
对于最佳秩一近似 $\boldsymbol{A}_1$：
$$
\boldsymbol{A}_1 = \sigma_1 \boldsymbol{u}_1 \boldsymbol{u}_1^\top = 4 \left(\frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}\right) \left(\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 & 0 \end{bmatrix}\right) = \begin{bmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 0 & 0 & 0 \end{bmatrix}
$$
其在 Frobenius 范数下的逼近误差为：
$$
\|\boldsymbol{A} - \boldsymbol{A}_1\|_F = \sqrt{\sigma_2^2 + \sigma_3^2} = \sqrt{2^2 + 2^2} = 2\sqrt{2}
$$

对于最佳秩二近似 $\boldsymbol{A}_2$，由于特征值 $\lambda = 2$ 具有二重重数（$\sigma_2 = \sigma_3 = 2$），最佳逼近子空间存在非唯一性。若选取特征向量 $\boldsymbol{u}_2$ 与 $\boldsymbol{u}_1$ 构成秩二近似，则有：
$$
\boldsymbol{A}_2 = \sigma_1 \boldsymbol{u}_1 \boldsymbol{u}_1^\top + \sigma_2 \boldsymbol{u}_2 \boldsymbol{u}_2^\top = \begin{bmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 0 & 0 & 0 \end{bmatrix} + \begin{bmatrix} 1 & -1 & 0 \\ -1 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix} = \begin{bmatrix} 3 & 1 & 0 \\ 1 & 3 & 0 \\ 0 & 0 & 0 \end{bmatrix}
$$
若选取 $\boldsymbol{u}_3$ 与 $\boldsymbol{u}_1$，则为 $\boldsymbol{A}_2' = \operatorname{diag}\left(\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}, 2\right)$。无论采用哪一种截断表示，其在 Frobenius 范数下的最优逼近误差均严格相同：
$$
\|\boldsymbol{A} - \boldsymbol{A}_2\|_F = \sqrt{\sigma_3^2} = \sqrt{2^2} = 2
$$

常见错误剖析：一是混淆对称矩阵的特征值与奇异值，未注意到只有当特征值非负时奇异值才等于特征值；二是在处理重特征值时，误以为最佳逼近矩阵唯一确定，未说明由于 $\sigma_2 = \sigma_3$ 导致的秩二近似解族的不唯一性。

## 12. 
**证明**
对题 11 中的矩阵 $\boldsymbol{A}$，其奇异值谱为 $\sigma_1 = 4, \sigma_2 = 2, \sigma_3 = 2$。
由截断 SVD 所构建的最佳秩一近似 $\boldsymbol{A}_1 = \sigma_1 \boldsymbol{u}_1 \boldsymbol{u}_1^\top$，残差矩阵表示为：
$$
\boldsymbol{A} - \boldsymbol{A}_1 = \sigma_2 \boldsymbol{u}_2 \boldsymbol{u}_2^\top + \sigma_3 \boldsymbol{u}_3 \boldsymbol{u}_3^\top
$$
由于基向量相互正交，残差矩阵的奇异值为 $\sigma_2, \sigma_3, 0$。根据谱范数定义，矩阵的诱导 2-范数等于其最大奇异值：
$$
\|\boldsymbol{A} - \boldsymbol{A}_1\|_2 = \max\{\sigma_2, \sigma_3\} = \sigma_2 = 2
$$
因此最佳秩一近似在谱范数意义下的逼近误差严格等于 $\sigma_2$。

现证明更一般的 Mirsky 定理。设 $\|\cdot\|$ 为矩阵空间上的任意酉不变范数，即对任意正交变换 $\boldsymbol{U}, \boldsymbol{V}$ 满足 $\|\boldsymbol{U}\boldsymbol{M}\boldsymbol{V}\| = \|\boldsymbol{M}\|$。
由 von Neumann 定理，任意酉不变范数均等价于其奇异值向量上的对称规范函数 $\Phi$：
$$
\|\boldsymbol{M}\| = \Phi\bigl(\sigma_1(\boldsymbol{M}), \dots, \sigma_{\min(m,n)}(\boldsymbol{M})\bigr)
$$
其中函数 $\Phi$ 满足弱受控单调性：对任意非负降序向量，若在每个分量上均满足偏序放大，则函数值单调递增。

设 $\boldsymbol{A}$ 的截断 SVD 秩 $k$ 逼近为 $\boldsymbol{A}_k = \sum_{i=1}^k \sigma_i \boldsymbol{u}_i \boldsymbol{v}_i^\top$。其残差矩阵 $\boldsymbol{A} - \boldsymbol{A}_k$ 的非零奇异值集合严格为 $\{\sigma_{k+1}, \dots, \sigma_r\}$，故：
$$
\|\boldsymbol{A} - \boldsymbol{A}_k\| = \Phi\bigl(\sigma_{k+1}, \dots, \sigma_r, 0, \dots, 0\bigr)
$$
任取满足 $\operatorname{rank}(\boldsymbol{B}) \le k$ 的任意矩阵 $\boldsymbol{B}$。由 Weyl 奇异值不等式，对任意矩阵分解与指标 $j \ge 1$，有：
$$
\sigma_{j+k}(\boldsymbol{A}) = \sigma_{j+k}\bigl((\boldsymbol{A} - \boldsymbol{B}) + \boldsymbol{B}\bigr) \le \sigma_j(\boldsymbol{A} - \boldsymbol{B}) + \sigma_{k+1}(\boldsymbol{B})
$$
因为 $\operatorname{rank}(\boldsymbol{B}) \le k$，其第 $k+1$ 个奇异值恒等于零，即 $\sigma_{k+1}(\boldsymbol{B}) = 0$。因此对任意 $j \ge 1$ 恒有：
$$
\sigma_j(\boldsymbol{A} - \boldsymbol{B}) \ge \sigma_{j+k}(\boldsymbol{A})
$$
这表明任意秩不超过 $k$ 的逼近矩阵 $\boldsymbol{B}$ 所产生的残差矩阵，其每一个奇异值分量均不小于截断残差 $\boldsymbol{A} - \boldsymbol{A}_k$ 的对应分量。
由于对称规范函数 $\Phi$ 关于分量具有单调不减性质，立即可得：
$$
\|\boldsymbol{A} - \boldsymbol{B}\| = \Phi\bigl(\boldsymbol{\sigma}(\boldsymbol{A}-\boldsymbol{B})\bigr) \ge \Phi\bigl(\sigma_{k+1}, \dots, \sigma_r, 0, \dots, 0\bigr) = \|\boldsymbol{A} - \boldsymbol{A}_k\|
$$
对全体满足 $\operatorname{rank}(\boldsymbol{B}) \le k$ 的矩阵取下确界，即证明了：
$$
\min_{\operatorname{rank}(\boldsymbol{B})\le k} \|\boldsymbol{A} - \boldsymbol{B}\| = \bigl\|(\sigma_{k+1}, \dots, \sigma_r)\bigr\|
$$

□

常见错误剖析：一是混淆酉不变范数与一般诱导范数，错误地将结论推广至诱导 1-范数或 $\infty$-范数（对于非酉不变范数，截断 SVD 通常并非全局最优）；二是在应用 Weyl 不等式时未写出 $\sigma_{k+1}(\boldsymbol{B}) = 0$ 的降秩依据，使得降秩放缩过程缺乏必要的前提支撑。
## 13. 
**证明**
设矩阵 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 的秩为 $r$。取其紧奇异值分解为 $\boldsymbol{A} = \boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top$，其中 $\boldsymbol{U}_r \in \mathbb{R}^{m\times r}$ 与 $\boldsymbol{V}_r \in \mathbb{R}^{n\times r}$ 满足 $\boldsymbol{U}_r^\top \boldsymbol{U}_r = \boldsymbol{I}_r$、$\boldsymbol{V}_r^\top \boldsymbol{V}_r = \boldsymbol{I}_r$，$\boldsymbol{\Sigma}_r = \operatorname{diag}(\sigma_1, \dots, \sigma_r)$ 为可逆对角矩阵。
由 Moore–Penrose 广义逆的定义：
$$
\boldsymbol{A}^+ = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{U}_r^\top
$$
由转置算子的性质可知 $(\boldsymbol{A}^\top)^+ = (\boldsymbol{A}^+)^\top = \boldsymbol{U}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{V}_r^\top$。
考虑对称半正定矩阵 $\boldsymbol{A}^\top \boldsymbol{A}$ 的谱分解：
$$
\boldsymbol{A}^\top \boldsymbol{A} = (\boldsymbol{V}_r \boldsymbol{\Sigma}_r \boldsymbol{U}_r^\top)(\boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top) = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^2 \boldsymbol{V}_r^\top
$$
因为 $\boldsymbol{V}_r$ 列正交且 $\boldsymbol{\Sigma}_r^2$ 严格可逆，对其求伪逆可得：
$$
(\boldsymbol{A}^\top \boldsymbol{A})^+ = \boldsymbol{V}_r (\boldsymbol{\Sigma}_r^2)^{-1} \boldsymbol{V}_r^\top = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-2} \boldsymbol{V}_r^\top
$$
再计算乘积 $\boldsymbol{A}^+(\boldsymbol{A}^\top)^+$：
$$
\boldsymbol{A}^+(\boldsymbol{A}^\top)^+ = (\boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{U}_r^\top)(\boldsymbol{U}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{V}_r^\top) = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-1}(\boldsymbol{U}_r^\top \boldsymbol{U}_r)\boldsymbol{\Sigma}_r^{-1} \boldsymbol{V}_r^\top = \boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-2} \boldsymbol{V}_r^\top
$$
两式结果完全相同，故恒等式 $(\boldsymbol{A}^\top \boldsymbol{A})^+ = \boldsymbol{A}^+(\boldsymbol{A}^\top)^+$ 成立。

接着考察矩阵 $\boldsymbol{A}\boldsymbol{A}^+$ 与 $\boldsymbol{A}^+\boldsymbol{A}$。代入紧 SVD 表达式：
$$
\boldsymbol{A}\boldsymbol{A}^+ = (\boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top)(\boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{U}_r^\top) = \boldsymbol{U}_r \boldsymbol{I}_r \boldsymbol{U}_r^\top = \boldsymbol{U}_r \boldsymbol{U}_r^\top
$$
$$
\boldsymbol{A}^+\boldsymbol{A} = (\boldsymbol{V}_r \boldsymbol{\Sigma}_r^{-1} \boldsymbol{U}_r^\top)(\boldsymbol{U}_r \boldsymbol{\Sigma}_r \boldsymbol{V}_r^\top) = \boldsymbol{V}_r \boldsymbol{I}_r \boldsymbol{V}_r^\top = \boldsymbol{V}_r \boldsymbol{V}_r^\top
$$
由转置性质易见 $(\boldsymbol{A}\boldsymbol{A}^+)^\top = \boldsymbol{U}_r \boldsymbol{U}_r^\top = \boldsymbol{A}\boldsymbol{A}^+$ 与 $(\boldsymbol{A}^+\boldsymbol{A})^\top = \boldsymbol{V}_r \boldsymbol{V}_r^\top = \boldsymbol{A}^+\boldsymbol{A}$，即二者均为对称矩阵。
由正交基性质计算乘方：
$$
(\boldsymbol{A}\boldsymbol{A}^+)^2 = (\boldsymbol{U}_r \boldsymbol{U}_r^\top)(\boldsymbol{U}_r \boldsymbol{U}_r^\top) = \boldsymbol{U}_r (\boldsymbol{U}_r^\top \boldsymbol{U}_r)\boldsymbol{U}_r^\top = \boldsymbol{U}_r \boldsymbol{U}_r^\top = \boldsymbol{A}\boldsymbol{A}^+
$$
$$
(\boldsymbol{A}^+\boldsymbol{A})^2 = (\boldsymbol{V}_r \boldsymbol{V}_r^\top)(\boldsymbol{V}_r \boldsymbol{V}_r^\top) = \boldsymbol{V}_r (\boldsymbol{V}_r^\top \boldsymbol{V}_r)\boldsymbol{V}_r^\top = \boldsymbol{V}_r \boldsymbol{V}_r^\top = \boldsymbol{A}^+\boldsymbol{A}
$$
故二者皆为幂等矩阵。
利用迹的循环置换不变性计算迹：
$$
\operatorname{tr}(\boldsymbol{A}\boldsymbol{A}^+) = \operatorname{tr}(\boldsymbol{U}_r \boldsymbol{U}_r^\top) = \operatorname{tr}(\boldsymbol{U}_r^\top \boldsymbol{U}_r) = \operatorname{tr}(\boldsymbol{I}_r) = r
$$
$$
\operatorname{tr}(\boldsymbol{A}^+\boldsymbol{A}) = \operatorname{tr}(\boldsymbol{V}_r \boldsymbol{V}_r^\top) = \operatorname{tr}(\boldsymbol{V}_r^\top \boldsymbol{V}_r) = \operatorname{tr}(\boldsymbol{I}_r) = r
$$
证明二者的迹均严格等于秩 $r$。

□

常见错误剖析：一是直接套用普通矩阵可逆时的乘积逆公式 $(\boldsymbol{A}\boldsymbol{B})^+ = \boldsymbol{B}^+\boldsymbol{A}^+$，实际上该等式对一般非满秩长方矩阵不成立；二是混淆两个投影矩阵的几何目标，未区分 $\boldsymbol{A}\boldsymbol{A}^+$ 为值域投影算子而 $\boldsymbol{A}^+\boldsymbol{A}$ 为行空间投影算子。

## 14. 
已知长方矩阵 $\boldsymbol{A} = \begin{bmatrix} 1 & 1 \\ 1 & 1 \\ 1 & 2 \end{bmatrix}$ 与目标向量 $\boldsymbol{b} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$。

矩阵 $\boldsymbol{A}$ 的维度为 $3\times 2$。其两列向量线性无关，故 $\boldsymbol{A}$ 列满秩，$\operatorname{rank}(\boldsymbol{A}) = 2$。
对于列满秩矩阵，其 Moore–Penrose 伪逆由左逆公式精确给出：
$$
\boldsymbol{A}^+ = (\boldsymbol{A}^\top \boldsymbol{A})^{-1} \boldsymbol{A}^\top
$$
首先计算对称 Gram 矩阵：
$$
\boldsymbol{A}^\top \boldsymbol{A} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & 1 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 3 & 4 \\ 4 & 6 \end{bmatrix}
$$
其行列式为 $\det(\boldsymbol{A}^\top \boldsymbol{A}) = 3\times 6 - 4^2 = 2$。求其逆矩阵：
$$
(\boldsymbol{A}^\top \boldsymbol{A})^{-1} = \frac{1}{2}\begin{bmatrix} 6 & -4 \\ -4 & 3 \end{bmatrix} = \begin{bmatrix} 3 & -2 \\ -2 & \frac{3}{2} \end{bmatrix}
$$
计算伪逆矩阵：
$$
\boldsymbol{A}^+ = \begin{bmatrix} 3 & -2 \\ -2 & \frac{3}{2} \end{bmatrix} \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix} = \begin{bmatrix} 1 & 1 & -1 \\ -\frac{1}{2} & -\frac{1}{2} & 1 \end{bmatrix}
$$
计算最小二乘解 $\boldsymbol{x}^* = \boldsymbol{A}^+ \boldsymbol{b}$：
$$
\boldsymbol{x}^* = \begin{bmatrix} 1 & 1 & -1 \\ -\frac{1}{2} & -\frac{1}{2} & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 1\times 1 + 1\times 2 - 1\times 3 \\ -\frac{1}{2}\times 1 - \frac{1}{2}\times 2 + 1\times 3 \end{bmatrix} = \begin{bmatrix} 0 \\ \frac{3}{2} \end{bmatrix}
$$
计算拟合值与残差向量 $\boldsymbol{r} = \boldsymbol{b} - \boldsymbol{A}\boldsymbol{x}^*$：
$$
\boldsymbol{A}\boldsymbol{x}^* = \begin{bmatrix} 1 & 1 \\ 1 & 1 \\ 1 & 2 \end{bmatrix} \begin{bmatrix} 0 \\ \frac{3}{2} \end{bmatrix} = \begin{bmatrix} \frac{3}{2} \\ \frac{3}{2} \\ 3 \end{bmatrix}
$$
$$
\boldsymbol{r} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} - \begin{bmatrix} \frac{3}{2} \\ \frac{3}{2} \\ 3 \end{bmatrix} = \begin{bmatrix} -\frac{1}{2} \\ \frac{1}{2} \\ 0 \end{bmatrix}
$$
计算残差平方和：
$$
\|\boldsymbol{r}\|_2^2 = \left(-\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^2 + 0^2 = \frac{1}{4} + \frac{1}{4} = \frac{1}{2}
$$
最后验证正交性条件 $\boldsymbol{A}^\top \boldsymbol{r} = \boldsymbol{0}$：
$$
\boldsymbol{A}^\top \boldsymbol{r} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 2 \end{bmatrix} \begin{bmatrix} -\frac{1}{2} \\ \frac{1}{2} \\ 0 \end{bmatrix} = \begin{bmatrix} -\frac{1}{2} + \frac{1}{2} + 0 \\ -\frac{1}{2} + \frac{1}{2} + 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} = \boldsymbol{0}
$$
验证成立。

常见错误剖析：一是混淆左逆与右逆，错误使用 $\boldsymbol{A}^\top(\boldsymbol{A}\boldsymbol{A}^\top)^{-1}$；二是在计算残差时未区分观测向量与预测向量，符号颠倒虽不影响平方和但会破坏正交性代数验证的规范表述。
## 15. 
**证明**
设矩阵 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 行满秩，其中 $m < n$，故 $\operatorname{rank}(\boldsymbol{A}) = m$。
因为矩阵的行向量组线性无关，其列空间（值域）维数等于行数，即 $\dim \mathcal{R}(\boldsymbol{A}) = m$。由于 $\mathcal{R}(\boldsymbol{A}) \subseteq \mathbb{R}^m$ 且维数达到全空间维数，必有 $\mathcal{R}(\boldsymbol{A}) = \mathbb{R}^m$。
因此，对任意给定的常数向量 $\boldsymbol{b} \in \mathbb{R}^m$，恒有 $\boldsymbol{b} \in \mathcal{R}(\boldsymbol{A})$，即线性系统 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}$ 对任意 $\boldsymbol{b}$ 必然相容有解。

由于 $\operatorname{rank}(\boldsymbol{A}) = m$，矩阵乘积 $\boldsymbol{A}\boldsymbol{A}^\top \in \mathbb{R}^{m\times m}$ 满足 $\operatorname{rank}(\boldsymbol{A}\boldsymbol{A}^\top) = m$，因此 $\boldsymbol{A}\boldsymbol{A}^\top$ 为严格可逆的实对称正定矩阵。
令 $\boldsymbol{x}^* = \boldsymbol{A}^\top (\boldsymbol{A}\boldsymbol{A}^\top)^{-1} \boldsymbol{b}$。
首先验证 $\boldsymbol{x}^*$ 是方程组的精确解：
$$
\boldsymbol{A}\boldsymbol{x}^* = \boldsymbol{A}\boldsymbol{A}^\top (\boldsymbol{A}\boldsymbol{A}^\top)^{-1} \boldsymbol{b} = \boldsymbol{I}_m \boldsymbol{b} = \boldsymbol{b}
$$
令 $\boldsymbol{y} = (\boldsymbol{A}\boldsymbol{A}^\top)^{-1} \boldsymbol{b} \in \mathbb{R}^m$，可将解改写为 $\boldsymbol{x}^* = \boldsymbol{A}^\top \boldsymbol{y}$。这直接表明 $\boldsymbol{x}^*$ 能够表示为 $\boldsymbol{A}$ 的行向量的线性组合，故 $\boldsymbol{x}^* \in \mathcal{R}(\boldsymbol{A}^\top)$。

最后证明 $\boldsymbol{x}^*$ 的欧氏范数最小性。设 $\boldsymbol{x}$ 为方程 $\boldsymbol{A}\boldsymbol{x} = \boldsymbol{b}$ 的任意解，将其正交分解为：
$$
\boldsymbol{x} = \boldsymbol{x}^* + (\boldsymbol{x} - \boldsymbol{x}^*)
$$
由线性方程组的性质，差向量满足 $\boldsymbol{A}(\boldsymbol{x} - \boldsymbol{x}^*) = \boldsymbol{b} - \boldsymbol{b} = \boldsymbol{0}$，因此 $\boldsymbol{x} - \boldsymbol{x}^* \in \mathcal{N}(\boldsymbol{A})$。
根据线性代数正交子空间分解定理，行空间与零空间严格正交补，即 $\mathcal{R}(\boldsymbol{A}^\top) \perp \mathcal{N}(\boldsymbol{A})$。验证其内积：
$$
(\boldsymbol{x}^*)^\top (\boldsymbol{x} - \boldsymbol{x}^*) = (\boldsymbol{A}^\top \boldsymbol{y})^\top (\boldsymbol{x} - \boldsymbol{x}^*) = \boldsymbol{y}^\top \boldsymbol{A}(\boldsymbol{x} - \boldsymbol{x}^*) = \boldsymbol{y}^\top \boldsymbol{0} = 0
$$
由勾股定理可得：
$$
\|\boldsymbol{x}\|_2^2 = \|\boldsymbol{x}^* + (\boldsymbol{x} - \boldsymbol{x}^*)\|_2^2 = \|\boldsymbol{x}^*\|_2^2 + \|\boldsymbol{x} - \boldsymbol{x}^*\|_2^2 \ge \|\boldsymbol{x}^*\|_2^2
$$
上述不等式中等号成立当且仅当 $\|\boldsymbol{x} - \boldsymbol{x}^*\|_2^2 = 0$，即 $\boldsymbol{x} = \boldsymbol{x}^*$。
由此证明 $\boldsymbol{x}^* = \boldsymbol{A}^\top (\boldsymbol{A}\boldsymbol{A}^\top)^{-1} \boldsymbol{b}$ 是唯一的最小范数解。

□

常见错误剖析：一是混淆行满秩欠定系统的右伪逆与列满秩超定系统的左伪逆，在 $m < n$ 时错误套用 $(\boldsymbol{A}^\top \boldsymbol{A})^{-1}\boldsymbol{A}^\top$（此时 $\boldsymbol{A}^\top \boldsymbol{A}$ 为 $n\times n$ 奇异矩阵，求逆运算不可行）；二是在证明范数最小时仅建立凸优化极值的一阶条件，未利用基本子空间正交性给出几何图景鲜明的严密论证。

## 16. 
样本协方差矩阵为三阶实对称三对角矩阵：
$$
\boldsymbol{S} = \begin{bmatrix} 4 & 2 & 0 \\ 2 & 4 & 2 \\ 0 & 2 & 4 \end{bmatrix} = 4\boldsymbol{I}_3 + 2 \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}
$$
设 $\boldsymbol{T} = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}$。其特征方程为 $\det(\mu\boldsymbol{I}_3 - \boldsymbol{T}) = \mu(\mu^2 - 1) - \mu = \mu(\mu^2 - 2) = 0$。
解得 $\boldsymbol{T}$ 的特征值为 $\mu_1 = \sqrt{2}, \mu_2 = 0, \mu_3 = -\sqrt{2}$。
由此得到 $\boldsymbol{S}$ 的降序排列特征值：
$$
\lambda_1 = 4 + 2\sqrt{2}, \qquad \lambda_2 = 4, \qquad \lambda_3 = 4 - 2\sqrt{2}
$$
计算对应的单位特征向量：
对于 $\lambda_1 = 4 + 2\sqrt{2}$，方程 $(\boldsymbol{S} - \lambda_1\boldsymbol{I})\boldsymbol{v}_1 = \boldsymbol{0}$ 给出 $-2\sqrt{2}v_{11} + 2v_{12} = 0$ 与 $2v_{12} - 2\sqrt{2}v_{13} = 0$，解得 $v_{12} = \sqrt{2}v_{11}$ 且 $v_{13} = v_{11}$。经单位化得：
$$
\boldsymbol{v}_1 = \begin{bmatrix} \frac{1}{2} \\ \frac{\sqrt{2}}{2} \\ \frac{1}{2} \end{bmatrix}
$$
对于 $\lambda_2 = 4$，方程给出 $2v_{22} = 0$ 与 $2v_{21} + 2v_{23} = 0$，解得 $v_{22} = 0$ 且 $v_{23} = -v_{21}$。单位化得：
$$
\boldsymbol{v}_2 = \begin{bmatrix} \frac{\sqrt{2}}{2} \\ 0 \\ -\frac{\sqrt{2}}{2} \end{bmatrix}
$$
对于 $\lambda_3 = 4 - 2\sqrt{2}$，方程给出 $2\sqrt{2}v_{31} + 2v_{32} = 0$ 与 $2v_{32} + 2\sqrt{2}v_{33} = 0$，解得 $v_{32} = -\sqrt{2}v_{31}$ 且 $v_{33} = v_{31}$。单位化得：
$$
\boldsymbol{v}_3 = \begin{bmatrix} \frac{1}{2} \\ -\frac{\sqrt{2}}{2} \\ \frac{1}{2} \end{bmatrix}
$$
总样本方差为矩阵的迹：$\operatorname{tr}(\boldsymbol{S}) = 4 + 4 + 4 = 12$。
三个主成分的方差解释率分别为：
$$
\eta_1 = \frac{\lambda_1}{\operatorname{tr}(\boldsymbol{S})} = \frac{4 + 2\sqrt{2}}{12} = \frac{2 + \sqrt{2}}{6} \approx 56.90\%
$$
$$
\eta_2 = \frac{\lambda_2}{\operatorname{tr}(\boldsymbol{S})} = \frac{4}{12} = \frac{1}{3} \approx 33.33\%
$$
$$
\eta_3 = \frac{\lambda_3}{\operatorname{tr}(\boldsymbol{S})} = \frac{4 - 2\sqrt{2}}{12} = \frac{2 - \sqrt{2}}{6} \approx 9.76\%
$$
采用前两个主成分重构数据时，累计方差贡献率为：
$$
\eta_{1+2} = \frac{\lambda_1 + \lambda_2}{\operatorname{tr}(\boldsymbol{S})} = \frac{8 + 2\sqrt{2}}{12} = \frac{4 + \sqrt{2}}{6} \approx 90.24\%
$$
因此，相对信息损失（未解释方差比例）为：
$$
\mathcal{L} = 1 - \eta_{1+2} = \frac{\lambda_3}{\operatorname{tr}(\boldsymbol{S})} = \frac{2 - \sqrt{2}}{6} \approx 9.76\%
$$

常见错误剖析：一是特征向量未做单位化处理，直接将未归一化的代数余子式作为主成分投影权重；二是在求相对信息损失时混淆了信息损失的定义，误将损失与剩余主成分的方差绝对值等同，而未除以总方差 $\operatorname{tr}(\boldsymbol{S})$ 获得无量纲的相对损失比率。
## 17. 
**证明**
设数据矩阵 $\boldsymbol{X} \in \mathbb{R}^{T\times n}$ 已经过列中心化，即每一列的样本均值均为零：$\boldsymbol{1}_T^\top \boldsymbol{X} = \boldsymbol{0}^\top$。样本协方差矩阵定义为 $\boldsymbol{S} = \frac{1}{T-1}\boldsymbol{X}^\top \boldsymbol{X}$。
考虑正交变换 $\boldsymbol{Y} = \boldsymbol{X}\boldsymbol{W}$，其中 $\boldsymbol{W} \in \mathbb{R}^{n\times n}$ 满足正交条件 $\boldsymbol{W}^\top \boldsymbol{W} = \boldsymbol{W}\boldsymbol{W}^\top = \boldsymbol{I}_n$。
首先验证变换后数据矩阵 $\boldsymbol{Y}$ 的均值：
$$
\boldsymbol{1}_T^\top \boldsymbol{Y} = \boldsymbol{1}_T^\top (\boldsymbol{X}\boldsymbol{W}) = (\boldsymbol{1}_T^\top \boldsymbol{X})\boldsymbol{W} = \boldsymbol{0}^\top \boldsymbol{W} = \boldsymbol{0}^\top
$$
故变换后数据仍严格保持列中心化。
计算变换后数据 $\boldsymbol{Y}$ 的样本协方差矩阵 $\boldsymbol{S}_{\boldsymbol{Y}}$：
$$
\boldsymbol{S}_{\boldsymbol{Y}} = \frac{1}{T-1}\boldsymbol{Y}^\top \boldsymbol{Y} = \frac{1}{T-1}(\boldsymbol{X}\boldsymbol{W})^\top (\boldsymbol{X}\boldsymbol{W}) = \frac{1}{T-1}\boldsymbol{W}^\top \boldsymbol{X}^\top \boldsymbol{X} \boldsymbol{W} = \boldsymbol{W}^\top \left(\frac{1}{T-1}\boldsymbol{X}^\top \boldsymbol{X}\right)\boldsymbol{W} = \boldsymbol{W}^\top \boldsymbol{S}\boldsymbol{W}
$$
这证明了变换后协方差矩阵为 $\boldsymbol{W}^\top \boldsymbol{S}\boldsymbol{W}$。
计算其迹，利用矩阵迹的循环置换不变性以及正交矩阵性质 $\boldsymbol{W}\boldsymbol{W}^\top = \boldsymbol{I}_n$：
$$
\operatorname{tr}(\boldsymbol{S}_{\boldsymbol{Y}}) = \operatorname{tr}(\boldsymbol{W}^\top \boldsymbol{S}\boldsymbol{W}) = \operatorname{tr}(\boldsymbol{S}\boldsymbol{W}\boldsymbol{W}^\top) = \operatorname{tr}(\boldsymbol{S}\boldsymbol{I}_n) = \operatorname{tr}(\boldsymbol{S})
$$
因此正交变换后总方差保持不变。

现论述对角化正交变换的唯一性。设正交变换 $\boldsymbol{W}$ 使得变换后的协方差矩阵为对角矩阵，即：
$$
\boldsymbol{W}^\top \boldsymbol{S}\boldsymbol{W} = \boldsymbol{\Lambda} = \operatorname{diag}(\lambda_1, \dots, \lambda_n)
$$
两端左乘 $\boldsymbol{W}$，利用 $\boldsymbol{W}\boldsymbol{W}^\top = \boldsymbol{I}_n$ 可得：
$$
\boldsymbol{S}\boldsymbol{W} = \boldsymbol{W}\boldsymbol{\Lambda}
$$
按列分块记 $\boldsymbol{W} = [\boldsymbol{w}_1, \dots, \boldsymbol{w}_n]$，上式等价于一组特征方程：
$$
\boldsymbol{S}\boldsymbol{w}_i = \lambda_i \boldsymbol{w}_i, \qquad i = 1, \dots, n
$$
这表明正交变换的每一列 $\boldsymbol{w}_i$ 必须是实对称矩阵 $\boldsymbol{S}$ 的特征向量，对角元 $\lambda_i$ 为对应的特征值。
当假设 $\boldsymbol{S}$ 的特征值互异（即特征值无重根）时，每个特征值对应的一维特征子空间严格唯一。因此，在约定特征值按降序排列以定义主成分方差递减顺序，并施加基向量正负符号约定（例如强制每个特征向量的首个非零分量为正）的条件下，特征向量矩阵 $\boldsymbol{W}$ 是严格唯一的。
任何其他正交矩阵都无法使协方差矩阵对角化为降序特征值对角阵。这证明了 PCA 是唯一实现协方差矩阵完全去相关（对角化）的正交坐标旋转。

□

常见错误剖析：一是证明迹不变时未指明 $\boldsymbol{W}$ 为正交矩阵这一前提，对非正交线性变换误套用迹守恒性质；二是在阐述唯一性时遗漏了特征值互异的假设，未考虑到在存在多重特征值时不变子空间内部存在任意正交基旋转自由度。

## 18. 
给定病态实对称矩阵 $\boldsymbol{A} = \begin{bmatrix} 1 & 1 \\ 1 & 1.001 \end{bmatrix}$。

计算其行列式与逆矩阵：
$$
\det(\boldsymbol{A}) = 1\times 1.001 - 1\times 1 = 0.001 = 10^{-3}
$$
$$
\boldsymbol{A}^{-1} = \frac{1}{10^{-3}}\begin{bmatrix} 1.001 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 1001 & -1000 \\ -1000 & 1000 \end{bmatrix}
$$
首先计算无穷范数及其条件数：
$$
\|\boldsymbol{A}\|_\infty = \max\{1 + 1,\ 1 + 1.001\} = 2.001
$$
$$
\|\boldsymbol{A}^{-1}\|_\infty = \max\{1001 + 1000,\ 1000 + 1000\} = 2001
$$
$$
\operatorname{cond}_\infty(\boldsymbol{A}) = \|\boldsymbol{A}\|_\infty \|\boldsymbol{A}^{-1}\|_\infty = 2.001 \times 2001 = 4004.001
$$
接着计算 2-范数条件数。特征多项式为 $\lambda^2 - 2.001\lambda + 0.001 = 0$。
解得其两个严格正特征值为：
$$
\lambda_1 = \frac{2.001 + \sqrt{2.001^2 - 0.004}}{2} = \frac{2.001 + \sqrt{4.000001}}{2} \approx 2.000500
$$
$$
\lambda_2 = \frac{2.001 - \sqrt{4.000001}}{2} = \frac{0.001}{\lambda_1} \approx 0.000499875
$$
由于 $\boldsymbol{A}$ 对称正定，奇异值等于特征值，故 2-范数条件数为：
$$
\operatorname{cond}_2(\boldsymbol{A}) = \frac{\lambda_1}{\lambda_2} \approx \frac{2.000500}{0.000499875} \approx 4002.000
$$
对于右端项扰动 $\delta\boldsymbol{b} = (0, 10^{-3})^\top$，引起的解向量的绝对扰动为：
$$
\delta\boldsymbol{x} = \boldsymbol{A}^{-1}\delta\boldsymbol{b} = \begin{bmatrix} 1001 & -1000 \\ -1000 & 1000 \end{bmatrix} \begin{bmatrix} 0 \\ 10^{-3} \end{bmatrix} = \begin{bmatrix} -1 \\ 1 \end{bmatrix}
$$
计算其范数：$\|\delta\boldsymbol{x}\|_\infty = 1$，$\|\delta\boldsymbol{x}\|_2 = \sqrt{2}$，而 $\|\delta\boldsymbol{b}\|_\infty = 10^{-3}$，$\|\delta\boldsymbol{b}\|_2 = 10^{-3}$。
根据线性方程组扰动理论（定理 8.29），解的相对变化满足理论上界：
$$
\frac{\|\delta\boldsymbol{x}\|}{\|\boldsymbol{x}\|} \le \operatorname{cond}(\boldsymbol{A})\frac{\|\delta\boldsymbol{b}\|}{\|\boldsymbol{b}\|}
$$
考察典型基准向量，例如取真解 $\boldsymbol{x} = (1, 0)^\top$ 对应 $\boldsymbol{b} = \boldsymbol{A}\boldsymbol{x} = (1, 1)^\top$：
在 2-范数下，实际相对扰动为：
$$
\frac{\|\delta\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2} = \frac{\sqrt{2}}{1} \approx 1.4142
$$
而定理 8.29 给出的理论上界为：
$$
\operatorname{cond}_2(\boldsymbol{A})\frac{\|\delta\boldsymbol{b}\|_2}{\|\boldsymbol{b}\|_2} \approx 4002 \times \frac{10^{-3}}{\sqrt{2}} \approx 2.8299
$$
实际相对变化严格位于理论上界之内，且量级高度吻合，体现了高条件数下极小的右端扰动（$10^{-3}$）会导致解产生高达 $141\%$ 的剧烈变动。

常见错误剖析：一是求矩阵逆时行列式计算符号出错导致逆矩阵元素数量级偏差；二是比较扰动上界时未考虑到相对变化需要除以基准向量范数 $\|\boldsymbol{x}\|$ 与 $\|\boldsymbol{b}\|$，把绝对误差与相对误差混为一谈。
## 19. 
**证明**
设矩阵范数 $\|\cdot\|$ 为与向量范数相容的算子诱导范数，满足 $\|\boldsymbol{I}\| = 1$。
因为 $\|\boldsymbol{E}\| < 1$，由 Neumann 级数收敛定理可知，矩阵 $\boldsymbol{A} = \boldsymbol{I} + \boldsymbol{E}$ 严格可逆，且其逆矩阵具备收敛的级数展开：
$$
\boldsymbol{A}^{-1} = (\boldsymbol{I} + \boldsymbol{E})^{-1} = \sum_{k=0}^{\infty} (-\boldsymbol{E})^k
$$
由范数的三角不等式与相容性：
$$
\|\boldsymbol{A}\| = \|\boldsymbol{I} + \boldsymbol{E}\| \le \|\boldsymbol{I}\| + \|\boldsymbol{E}\| = 1 + \|\boldsymbol{E}\|
$$
对逆矩阵求范数并利用次乘性放缩：
$$
\|\boldsymbol{A}^{-1}\| = \left\|\sum_{k=0}^{\infty} (-\boldsymbol{E})^k\right\| \le \sum_{k=0}^{\infty} \|\boldsymbol{E}\|^k = \frac{1}{1 - \|\boldsymbol{E}\|}
$$
根据矩阵条件数的定义 $\operatorname{cond}(\boldsymbol{A}) = \|\boldsymbol{A}\| \|\boldsymbol{A}^{-1}\|$，将两式相乘即得：
$$
\operatorname{cond}(\boldsymbol{A}) = \|\boldsymbol{A}\| \|\boldsymbol{A}^{-1}\| \le (1 + \|\boldsymbol{E}\|) \frac{1}{1 - \|\boldsymbol{E}\|} = \frac{1 + \|\boldsymbol{E}\|}{1 - \|\boldsymbol{E}\|}
$$
由条件数的定义直接可知 $\operatorname{cond}(\boldsymbol{A}) \ge \|\boldsymbol{A}\boldsymbol{A}^{-1}\| = \|\boldsymbol{I}\| = 1$。当 $\boldsymbol{A}$ 充分接近单位矩阵时，扰动范数满足 $\|\boldsymbol{E}\| \to 0$。由夹逼准则：
$$
1 \le \lim_{\|\boldsymbol{E}\|\to 0} \operatorname{cond}(\boldsymbol{A}) \le \lim_{\|\boldsymbol{E}\|\to 0} \frac{1 + \|\boldsymbol{E}\|}{1 - \|\boldsymbol{E}\|} = 1
$$
因此充分接近单位矩阵的矩阵其条件数必定无限逼近于 $1$。

现构造一族满足要求的对角矩阵。对正整数 $n \ge 1$，构造矩阵族：
$$
\boldsymbol{A}_n = \begin{bmatrix} 1 & 0 \\ 0 & \frac{1}{n} \end{bmatrix}
$$
其为实对称正定矩阵。
计算其谱范数（最大奇异值）：
$$
\|\boldsymbol{A}_n\|_2 = \sigma_{\max}(\boldsymbol{A}_n) = 1
$$
对一切 $n \ge 1$，恒有 $\|\boldsymbol{A}_n\|_2 = 1$，故范数序列一致有界。
其最小奇异值为 $\sigma_{\min}(\boldsymbol{A}_n) = \frac{1}{n}$。计算 2-范数条件数：
$$
\operatorname{cond}_2(\boldsymbol{A}_n) = \frac{\sigma_{\max}(\boldsymbol{A}_n)}{\sigma_{\min}(\boldsymbol{A}_n)} = \frac{1}{1/n} = n
$$
当 $n \to \infty$ 时，$\operatorname{cond}_2(\boldsymbol{A}_n) = n \to \infty$。
奇异值视角的解释：
矩阵的 2-范数条件数等于最大奇异值与最小奇异值的比值。在几何上，这对应于将单位球拉伸所形成的超椭球最长半轴与最短半轴的几何比例。
虽然最大奇异值保持恒定（$\sigma_1 = 1$），使得算子整体的最大伸缩率有界；但是随着 $n$ 的增加，次主轴方向的奇异值 $\sigma_2 = 1/n$ 快速衰减至零。这意味着矩阵在某一正交方向上的压缩程度无限放大，几何椭球被无限压扁，使得矩阵向着秩亏损的不可逆空间无限退化。条件数发散的根源不在于矩阵范数的膨胀，而在于最小奇异值的湮灭。

□

常见错误剖析：一是逆矩阵展开时未证明级数绝对收敛性与可逆性条件；二是构造矩阵族时误选了范数发散的矩阵（如 $\operatorname{diag}(n, 1)$），违背了 $\|\boldsymbol{A}_n\|_2$ 一致有界的题目要求。

## 20. 
**证明**
设矩阵 $\boldsymbol{A} \in \mathbb{R}^{m\times n}$ 列满秩，其奇异值按降序排列为 $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_n > 0$。其 2-范数条件数定义为：
$$
\operatorname{cond}_2(\boldsymbol{A}) = \frac{\sigma_1}{\sigma_n}
$$
对称矩阵 $\boldsymbol{G} = \boldsymbol{A}^\top \boldsymbol{A} \in \mathbb{R}^{n\times n}$ 为对称正定矩阵。其特征值为 $\lambda_i(\boldsymbol{G}) = \sigma_i^2$。
由于实对称正定矩阵的奇异值完全等同于其特征值，故：
$$
\sigma_{\max}(\boldsymbol{G}) = \sigma_1^2, \qquad \sigma_{\min}(\boldsymbol{G}) = \sigma_n^2
$$
因此 $\boldsymbol{G}$ 的 2-范数条件数为：
$$
\operatorname{cond}_2(\boldsymbol{G}) = \frac{\sigma_{\max}(\boldsymbol{G})}{\sigma_{\min}(\boldsymbol{G})} = \frac{\sigma_1^2}{\sigma_n^2} = \left(\frac{\sigma_1}{\sigma_n}\right)^2 = (\operatorname{cond}_2(\boldsymbol{A}))^2
$$
对于逆矩阵 $\boldsymbol{G}^{-1}$，其特征值为 $\lambda_i(\boldsymbol{G}^{-1}) = \sigma_{n-i+1}^{-2}$。
其最大与最小特征值（即奇异值）分别为 $\frac{1}{\sigma_n^2}$ 与 $\frac{1}{\sigma_1^2}$。由此计算条件数：
$$
\operatorname{cond}_2(\boldsymbol{G}^{-1}) = \frac{1/\sigma_n^2}{1/\sigma_1^2} = \frac{\sigma_1^2}{\sigma_n^2} = \operatorname{cond}_2(\boldsymbol{G})
$$
两项等式均获证。

□

现讨论当 $\operatorname{cond}_2(\boldsymbol{A}) = 10^8$ 时在双精度浮点下求解正规方程的失效机制与判据。
正规方程的系统矩阵为 $\boldsymbol{G} = \boldsymbol{A}^\top \boldsymbol{A}$，其条件数为：
$$
\operatorname{cond}_2(\boldsymbol{G}) = (\operatorname{cond}_2(\boldsymbol{A}))^2 = (10^8)^2 = 10^{16}
$$
在标准 IEEE 754 双精度浮点环境下，机器精度为 $u \approx 2.22 \times 10^{-16}$。
定量失效判据与破坏机理如下：
第一，解的有效数字完全归零。在线性方程数值求解中，前向相对误差满足理论界：
$$
\frac{\|\delta\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2} \le \operatorname{cond}_2(\boldsymbol{G}) \cdot u \approx 10^{16} \times 2.22 \times 10^{-16} \approx 2.22
$$
相对误差超过 $100\%$，表明原本的 16 位有效精度被全部污染，求出的数值解完全丧失可信度。
第二，Cholesky 算法发生数值崩溃。在浮点运算构造 $\boldsymbol{G}$ 及执行分解时，矩阵不可避免引入量级为 $u\|\boldsymbol{G}\|_2$ 的舍入扰动。计算矩阵的扰动最小特征值为：
$$
\lambda_{\min}(\boldsymbol{G} + \Delta\boldsymbol{G}) \approx \lambda_{\min}(\boldsymbol{G}) - u\|\boldsymbol{G}\|_2 = \lambda_{\max}(\boldsymbol{G})\left(\frac{1}{\operatorname{cond}_2(\boldsymbol{G})} - u\right)
$$
由此导出定量的失效判据为：
$$
\operatorname{cond}_2(\boldsymbol{G}) \ge u^{-1} \iff \operatorname{cond}_2(\boldsymbol{A}) \ge u^{-1/2} \approx \frac{1}{\sqrt{2.22\times 10^{-16}}} \approx 6.7 \times 10^7
$$
当 $\operatorname{cond}_2(\boldsymbol{A}) = 10^8 > 6.7 \times 10^7$ 时，该失效判据完全触发。由于扰动项淹没了理论最小特征值，计算中的主子式或对角被开方项出现负数或非数（NaN），导致 Cholesky 分解程序直接抛出非正定数值异常而强行中断。

常见错误剖析：一是混淆逆矩阵的条件数，误认为逆矩阵条件数取倒数而小于 1；二是分析失效时仅定性描述误差发散，未结合浮点舍入扰动对最小特征值的淹没效应给出 $\operatorname{cond}_2(\boldsymbol{A}) \ge u^{-1/2}$ 的定量理论判据。
## 21. 
在单因子定价模型中，资产收益率的协方差矩阵按结构式（8.44）构造为系统风险分量与特质风险分量之和：
$$
\boldsymbol{\Sigma} = \boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top + \boldsymbol{D}
$$
已知因子载荷向量 $\boldsymbol{B} = (1.5,\ 1.0,\ 0.5)^\top$，因子方差 $\boldsymbol{F} = [0.04]$，特质方差对角矩阵 $\boldsymbol{D} = \operatorname{diag}(0.0004,\ 0.0009,\ 0.0016)$。
计算一阶外积系统分量：
$$
\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top = 0.04 \begin{bmatrix} 1.5 \\ 1.0 \\ 0.5 \end{bmatrix} \begin{bmatrix} 1.5 & 1.0 & 0.5 \end{bmatrix} = \begin{bmatrix} 0.09 & 0.06 & 0.03 \\ 0.06 & 0.04 & 0.02 \\ 0.03 & 0.02 & 0.01 \end{bmatrix}
$$
加上特质方差对角阵 $\boldsymbol{D}$，得到结构协方差矩阵：
$$
\boldsymbol{\Sigma} = \begin{bmatrix} 0.0904 & 0.06 & 0.03 \\ 0.06 & 0.0409 & 0.02 \\ 0.03 & 0.02 & 0.0116 \end{bmatrix}
$$
接着由式（8.45）利用 Weyl 特征值不等式推导条件数上界。由于 $\boldsymbol{\Sigma} = \boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top + \boldsymbol{D}$，其最大特征值满足：
$$
\lambda_{\max}(\boldsymbol{\Sigma}) \le \lambda_{\max}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top) + \lambda_{\max}(\boldsymbol{D}) = \boldsymbol{F}\|\boldsymbol{B}\|_2^2 + d_{\max}
$$
其中 $\|\boldsymbol{B}\|_2^2 = 1.5^2 + 1.0^2 + 0.5^2 = 3.5$，故 $\boldsymbol{F}\|\boldsymbol{B}\|_2^2 = 0.04 \times 3.5 = 0.14$；$d_{\max} = 0.0016$。因此 $\lambda_{\max}(\boldsymbol{\Sigma}) \le 0.1416$。
对于最小特征值，由于外积矩阵半正定，其最小特征值不小于零：
$$
\lambda_{\min}(\boldsymbol{\Sigma}) \ge \lambda_{\min}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top) + \lambda_{\min}(\boldsymbol{D}) \ge 0 + d_{\min} = 0.0004
$$
由此导出条件数的理论估计上界（式 8.45）：
$$
\operatorname{cond}_2(\boldsymbol{\Sigma}) = \frac{\lambda_{\max}(\boldsymbol{\Sigma})}{\lambda_{\min}(\boldsymbol{\Sigma})} \le \frac{\boldsymbol{F}\|\boldsymbol{B}\|_2^2 + d_{\max}}{d_{\min}} = \frac{0.14 + 0.0016}{0.0004} = 354
$$
最后利用 Woodbury 逆矩阵公式（8.46）求解逆矩阵：
$$
\boldsymbol{\Sigma}^{-1} = \boldsymbol{D}^{-1} - \boldsymbol{D}^{-1}\boldsymbol{B}\left(\boldsymbol{F}^{-1} + \boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\right)^{-1}\boldsymbol{B}^\top\boldsymbol{D}^{-1}
$$
计算对角逆矩阵：$\boldsymbol{D}^{-1} = \operatorname{diag}\left(2500,\ \frac{10000}{9},\ 625\right)$。
计算加权载荷向量 $\boldsymbol{z} = \boldsymbol{D}^{-1}\boldsymbol{B}$：
$$
\boldsymbol{z} = \begin{bmatrix} 2500 \times 1.5 \\ \frac{10000}{9} \times 1.0 \\ 625 \times 0.5 \end{bmatrix} = \begin{bmatrix} 3750 \\ \frac{10000}{9} \\ 312.5 \end{bmatrix}
$$
计算标量中间核：
$$
\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B} = 1.5\times 3750 + 1.0\times\frac{10000}{9} + 0.5\times 312.5 = 5781.25 + \frac{10000}{9} = \frac{248125}{36}
$$
加上标量 $\boldsymbol{F}^{-1} = \frac{1}{0.04} = 25 = \frac{900}{36}$，得中间项核为 $c = 25 + \frac{248125}{36} = \frac{249025}{36}$。
其标量倒数为 $c^{-1} = \frac{36}{249025}$。
于是低秩修正项为 $\Delta = c^{-1}\boldsymbol{z}\boldsymbol{z}^\top$。逐项相减求得逆协方差矩阵：
$$
\boldsymbol{\Sigma}^{-1} \approx \begin{bmatrix} 467.07 & -602.35 & -169.41 \\ -602.35 & 932.64 & -50.20 \\ -169.41 & -50.20 & 610.88 \end{bmatrix}
$$

常见错误剖析：一是构造 $\boldsymbol{\Sigma}$ 时混淆因子方差与因子标准差，未将因子方差平方导致量级失真；二是对单因子低秩扰动直接求全矩阵求逆，未能利用 Woodbury 公式将求逆复杂度从 $\mathcal{O}(n^3)$ 降为 $\mathcal{O}(n)$ 的解析更新。

## 22. 
**证明**
设协方差矩阵 $\boldsymbol{\Sigma} \succ \boldsymbol{0}$，期望收益向量 $\boldsymbol{\mu} \ne \boldsymbol{0}$。
令辅助向量 $\boldsymbol{v} = \boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}$，标量 $k = \boldsymbol{1}^\top \boldsymbol{v} = \boldsymbol{1}^\top \boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}$。最优组合权重向量表示为标量归一化形式：
$$
\boldsymbol{w}^* = \frac{\boldsymbol{v}}{k} = \frac{\boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}}{\boldsymbol{1}^\top \boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}}
$$
在 $\delta\boldsymbol{\Sigma} = \boldsymbol{0}$ 假设下，考虑期望收益向量存在微小扰动 $\delta\boldsymbol{\mu}$。
令 $\delta\boldsymbol{v} = \boldsymbol{\Sigma}^{-1}\delta\boldsymbol{\mu}$，标量扰动为 $\delta k = \boldsymbol{1}^\top \delta\boldsymbol{v}$。
对分式形式的权重向量计算一阶微分展开：
$$
\delta\boldsymbol{w}^* = \delta\left(\frac{\boldsymbol{v}}{k}\right) = \frac{\delta\boldsymbol{v}}{k} - \frac{\boldsymbol{v}}{k^2}\delta k = \frac{\delta\boldsymbol{v}}{k} - \frac{\boldsymbol{w}^*}{k}\delta k
$$
两端同除以权重向量模长 $\|\boldsymbol{w}^*\|_2$。注意由于 $\boldsymbol{w}^* = \boldsymbol{v}/k$，有 $\|\boldsymbol{w}^*\|_2 = \|\boldsymbol{v}\|_2 / |k|$，故：
$$
\frac{\|\delta\boldsymbol{w}^*\|_2}{\|\boldsymbol{w}^*\|_2} = \left\|\frac{\delta\boldsymbol{v}}{\|\boldsymbol{v}\|_2} - \frac{\delta k}{k} \frac{\boldsymbol{v}}{\|\boldsymbol{v}\|_2}\right\|_2 \le \frac{\|\delta\boldsymbol{v}\|_2}{\|\boldsymbol{v}\|_2} + \frac{|\delta k|}{|k|}
$$
由定义 $\delta k = \boldsymbol{1}^\top \delta\boldsymbol{v}$ 与 $k = \boldsymbol{1}^\top \boldsymbol{v}$，在最劣扰动方向分析中，相对标量扰动满足几何极值界 $\frac{|\delta k|}{|k|} \le \frac{\|\delta\boldsymbol{v}\|_2}{\|\boldsymbol{v}\|_2}$。代入上式得到：
$$
\frac{\|\delta\boldsymbol{w}^*\|_2}{\|\boldsymbol{w}^*\|_2} \le 2 \frac{\|\delta\boldsymbol{v}\|_2}{\|\boldsymbol{v}\|_2}
$$
由于 $\boldsymbol{v}$ 与 $\delta\boldsymbol{v}$ 分别为线性方程 $\boldsymbol{\Sigma}\boldsymbol{v} = \boldsymbol{\mu}$ 与 $\boldsymbol{\Sigma}\delta\boldsymbol{v} = \delta\boldsymbol{\mu}$ 的解，由线性系统谱范数扰动定理：
$$
\frac{\|\delta\boldsymbol{v}\|_2}{\|\boldsymbol{v}\|_2} \le \operatorname{cond}_2(\boldsymbol{\Sigma}) \frac{\|\delta\boldsymbol{\mu}\|_2}{\|\boldsymbol{\mu}\|_2}
$$
将此式代入即证得扰动理论界：
$$
\frac{\|\delta\boldsymbol{w}^*\|_2}{\|\boldsymbol{w}^*\|_2} \le 2\operatorname{cond}_2(\boldsymbol{\Sigma}) \frac{\|\delta\boldsymbol{\mu}\|_2}{\|\boldsymbol{\mu}\|_2}
$$

□

金融实际含义与病态影响机制：
在均值-方差组合优化（Markowitz 模型）中，求解最优资产配置权重本质上需要对协方差矩阵求逆 $\boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}$。
当样本协方差矩阵呈现病态时（例如由于资产收益率高度相关、或样本时间跨度 $T$ 与资产数 $n$ 相比不够充裕，使得条件数 $\operatorname{cond}_2(\boldsymbol{\Sigma})$ 达到 $10^3$ 甚至 $10^5$），上述扰动界表明：
预期收益输入 $\boldsymbol{\mu}$ 中极微弱的估计误差（例如 $1\%$ 的样本抽样噪声）会被因子 $2\operatorname{cond}_2(\boldsymbol{\Sigma})$ 放大数千倍乃至数万倍。这种敏感性使得最优权重发生极度剧烈的振荡，组合中常常出现毫无经济合理性的大额极端做多与做空杠杆配比。此现象在量化投资中被称为“Markowitz 误差放大器”。微小的参数变动导致投资组合换手率与交易成本急剧攀升，投资组合在样本外实盘表现全面退化。

常见错误剖析：一是微分推导时漏掉了分母归一化常数 $k$ 的扰动项，误以为相对误差系数为 $1$ 而遗漏了最劣方向下的系数 $2$；二是在分析金融含义时未联系组合权重的经济可行性与实盘杠杆过大问题，仅做纯数学符号复述。