# 第8章　QR、Cholesky、SVD、PCA 与条件数

矩阵分解是数值线性代数的核心工具，也是量化研究中一切线性代数计算的实现基础。回归系数的估计、因子协方差矩阵的构造与求逆、组合权重的优化、主成分降维与风险模型的稳定性诊断，最终都归结为对某个矩阵施行适当的分解并在此基础上求解三角系统。本章系统讨论四种分解：$QR$ 分解、Cholesky 分解、奇异值分解以及由谱分解导出的主成分分析，并在此基础上给出条件数理论与数值稳定性分析。全章遵循统一的记号约定：$\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 表示实矩阵，$\boldsymbol{I}_n$ 表示 $n$ 阶单位矩阵，$\boldsymbol{e}_i$ 表示第 $i$ 个坐标单位向量，$\boldsymbol{A}^\top$ 表示转置，$\|\cdot\|_2$ 表示由欧氏向量范数诱导的谱范数，$\|\cdot\|_F$ 表示 Frobenius 范数，$\operatorname{rank}(\boldsymbol{A})$ 与 $\operatorname{cond}(\boldsymbol{A})$ 分别表示秩与条件数。

## 8.1 QR 分解

### 8.1.1 正交矩阵与分解的定义

**定义 8.1（正交矩阵）**　设 $\boldsymbol{Q}\in\mathbb{R}^{m\times m}$。若
$$
\boldsymbol{Q}^\top\boldsymbol{Q}=\boldsymbol{Q}\boldsymbol{Q}^\top=\boldsymbol{I}_m, \tag{8.1}
$$
则称 $\boldsymbol{Q}$ 为正交矩阵。等价地，$\boldsymbol{Q}$ 的列向量组构成 $\mathbb{R}^m$ 的一组标准正交基。此时 $\boldsymbol{Q}^{-1}=\boldsymbol{Q}^\top$，$|\det\boldsymbol{Q}|=1$，且对任意 $\boldsymbol{x}\in\mathbb{R}^m$ 有 $\|\boldsymbol{Q}\boldsymbol{x}\|_2=\|\boldsymbol{x}\|_2$，即正交变换保持欧氏长度与内积不变。

**定义 8.2（QR 分解）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 且 $m\geqslant n$。若存在列正交的矩阵 $\boldsymbol{Q}\in\mathbb{R}^{m\times n}$（即 $\boldsymbol{Q}^\top\boldsymbol{Q}=\boldsymbol{I}_n$）与上三角矩阵 $\boldsymbol{R}\in\mathbb{R}^{n\times n}$，使得
$$
\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}, \tag{8.2}
$$
则称式（8.2）为 $\boldsymbol{A}$ 的 $QR$ 分解（薄分解）。若进一步将 $\boldsymbol{Q}$ 扩充为 $m$ 阶正交矩阵 $\bar{\boldsymbol{Q}}=[\boldsymbol{Q},\boldsymbol{Q}_\perp]$，并令 $\bar{\boldsymbol{R}}=\begin{bmatrix}\boldsymbol{R}\\ \boldsymbol{0}\end{bmatrix}$，则 $\boldsymbol{A}=\bar{\boldsymbol{Q}}\bar{\boldsymbol{R}}$ 称为完全 $QR$ 分解。

式（8.2）的意义在于：正交因子 $\boldsymbol{Q}$ 在数值上完全良性（其条件数恒为 $1$），而全部的结构信息被压缩到三角形因子 $\boldsymbol{R}$ 中，从而线性方程组 $\boldsymbol{R}\boldsymbol{x}=\boldsymbol{c}$ 可用回代法在 $O(n^2)$ 次浮点运算内求解。

### 8.1.2 Gram–Schmidt 正交化

**定理 8.3（Gram–Schmidt 正交化）**　设 $\boldsymbol{a}_1,\dots,\boldsymbol{a}_n\in\mathbb{R}^m$ 线性无关。令
$$
\tilde{\boldsymbol{q}}_k=\boldsymbol{a}_k-\sum_{j=1}^{k-1}\bigl(\boldsymbol{q}_j^\top\boldsymbol{a}_k\bigr)\boldsymbol{q}_j,\qquad
\boldsymbol{q}_k=\frac{\tilde{\boldsymbol{q}}_k}{\|\tilde{\boldsymbol{q}}_k\|_2},\qquad k=1,\dots,n, \tag{8.3}
$$
则 $\boldsymbol{q}_1,\dots,\boldsymbol{q}_n$ 为标准正交向量组，且对每个 $k$ 有 $\operatorname{span}\{\boldsymbol{q}_1,\dots,\boldsymbol{q}_k\}=\operatorname{span}\{\boldsymbol{a}_1,\dots,\boldsymbol{a}_k\}$。若记
$$
r_{jk}=\boldsymbol{q}_j^\top\boldsymbol{a}_k\ (j<k),\qquad r_{kk}=\|\tilde{\boldsymbol{q}}_k\|_2>0,\qquad r_{jk}=0\ (j>k), \tag{8.4}
$$
并令 $\boldsymbol{Q}=[\boldsymbol{q}_1,\dots,\boldsymbol{q}_n]$，$\boldsymbol{R}=(r_{jk})$，则 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$，其中 $\boldsymbol{R}$ 为对角元全正的上三角矩阵。

**证明**

对 $k$ 归纳。$k=1$ 时 $\tilde{\boldsymbol{q}}_1=\boldsymbol{a}_1\neq\boldsymbol{0}$（线性无关性），故 $\boldsymbol{q}_1$ 有定义且 $\|\boldsymbol{q}_1\|_2=1$，张成空间显然相同。设结论对 $k-1$ 成立。由归纳假设，$\boldsymbol{q}_1,\dots,\boldsymbol{q}_{k-1}$ 标准正交，于是对 $j<k$，
$$
\boldsymbol{q}_j^\top\tilde{\boldsymbol{q}}_k=\boldsymbol{q}_j^\top\boldsymbol{a}_k-\sum_{i=1}^{k-1}\bigl(\boldsymbol{q}_i^\top\boldsymbol{a}_k\bigr)\boldsymbol{q}_j^\top\boldsymbol{q}_i=\boldsymbol{q}_j^\top\boldsymbol{a}_k-\boldsymbol{q}_j^\top\boldsymbol{a}_k=0,
$$
即 $\tilde{\boldsymbol{q}}_k$ 与 $\boldsymbol{q}_1,\dots,\boldsymbol{q}_{k-1}$ 均正交。若 $\tilde{\boldsymbol{q}}_k=\boldsymbol{0}$，则 $\boldsymbol{a}_k\in\operatorname{span}\{\boldsymbol{q}_1,\dots,\boldsymbol{q}_{k-1}\}=\operatorname{span}\{\boldsymbol{a}_1,\dots,\boldsymbol{a}_{k-1}\}$，与线性无关性矛盾，故 $\|\tilde{\boldsymbol{q}}_k\|_2=r_{kk}>0$，$\boldsymbol{q}_k$ 有定义并与前 $k-1$ 个向量正交。张成空间的等式由 $\tilde{\boldsymbol{q}}_k$ 的表达式直接得到。最后，式（8.3）可改写为
$$
\boldsymbol{a}_k=\sum_{j=1}^{k}r_{jk}\boldsymbol{q}_j,\qquad k=1,\dots,n,
$$
这恰是 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$ 的第 $k$ 列，而 $\boldsymbol{R}$ 的下三角部分为零、对角元为正，定理得证。

□

由定理 8.3 的构造过程可知，$r_{kk}$ 等于 $\boldsymbol{a}_k$ 到 $\operatorname{span}\{\boldsymbol{a}_1,\dots,\boldsymbol{a}_{k-1}\}$ 的正交补上的投影长度，因此 $|\det\boldsymbol{R}|=\prod_{k=1}^{n}r_{kk}$ 恰为以 $\boldsymbol{a}_1,\dots,\boldsymbol{a}_n$ 为棱的平行多面体的 $n$ 维体积。这一几何解释在因子模型的共线性诊断中有直接用途。

式（8.3）称为经典 Gram–Schmidt（CGS）。在浮点运算中，CGS 会因舍入误差的累积而严重丧失正交性：$\boldsymbol{Q}^\top\boldsymbol{Q}$ 偏离 $\boldsymbol{I}_n$ 的程度可达 $\kappa(\boldsymbol{A})^2 u$ 量级（$u$ 为机器精度）。实用中采用修正 Gram–Schmidt（MGS），即在每一步用当前已更新的向量重新投影：
$$
\boldsymbol{v}\leftarrow\boldsymbol{a}_k;\quad \text{对 } j=1,\dots,k-1:\ r_{jk}\leftarrow\boldsymbol{q}_j^\top\boldsymbol{v},\quad \boldsymbol{v}\leftarrow\boldsymbol{v}-r_{jk}\boldsymbol{q}_j.
$$
MGS 与 CGS 在精确算术下完全等价，但正交性损失降为 $O(\kappa(\boldsymbol{A})u)$。当 $\kappa(\boldsymbol{A})$ 较大时，还应对每个 $\tilde{\boldsymbol{q}}_k$ 施行一次再正交化（reorthogonalization），代价是运算量翻倍，正交性则恢复到机器精度水平。

**例 8.1**　用 Gram–Schmidt 过程求矩阵
$$
\boldsymbol{A}=\begin{bmatrix}1&1\\ 1&2\\ 1&3\end{bmatrix}
$$
的 $QR$ 分解，并验证 $\boldsymbol{Q}^\top\boldsymbol{Q}=\boldsymbol{I}_2$。

**解**　记 $\boldsymbol{a}_1=(1,1,1)^\top$，$\boldsymbol{a}_2=(1,2,3)^\top$。

第一步：$\tilde{\boldsymbol{q}}_1=\boldsymbol{a}_1$，$\|\tilde{\boldsymbol{q}}_1\|_2=\sqrt{3}$，故 $r_{11}=\sqrt{3}$，$\boldsymbol{q}_1=\frac{1}{\sqrt{3}}(1,1,1)^\top$。

第二步：由式（8.4）计算
$$
r_{12}=\boldsymbol{q}_1^\top\boldsymbol{a}_2=\frac{1+2+3}{\sqrt{3}}=\frac{6}{\sqrt{3}}=2\sqrt{3}.
$$
于是
$$
\tilde{\boldsymbol{q}}_2=\boldsymbol{a}_2-r_{12}\boldsymbol{q}_1=(1,2,3)^\top-2\sqrt{3}\cdot\frac{1}{\sqrt{3}}(1,1,1)^\top=(1,2,3)^\top-(2,2,2)^\top=(-1,0,1)^\top,
$$
$\|\tilde{\boldsymbol{q}}_2\|_2=\sqrt{2}$，故 $r_{22}=\sqrt{2}$，$\boldsymbol{q}_2=\frac{1}{\sqrt{2}}(-1,0,1)^\top$。因此
$$
\boldsymbol{Q}=\begin{bmatrix}\dfrac{1}{\sqrt{3}}&-\dfrac{1}{\sqrt{2}}\\[2mm] \dfrac{1}{\sqrt{3}}&0\\[2mm] \dfrac{1}{\sqrt{3}}&\dfrac{1}{\sqrt{2}}\end{bmatrix},\qquad
\boldsymbol{R}=\begin{bmatrix}\sqrt{3}&2\sqrt{3}\\ 0&\sqrt{2}\end{bmatrix}.
$$
验证正交性：$\boldsymbol{q}_1^\top\boldsymbol{q}_2=\frac{1}{\sqrt{6}}(-1+0+1)=0$，$\|\boldsymbol{q}_1\|_2=\|\boldsymbol{q}_2\|_2=1$，故 $\boldsymbol{Q}^\top\boldsymbol{Q}=\boldsymbol{I}_2$。验证乘积：$\boldsymbol{Q}\boldsymbol{R}$ 的第一列为 $\sqrt{3}\boldsymbol{q}_1=(1,1,1)^\top=\boldsymbol{a}_1$；第二列为 $2\sqrt{3}\boldsymbol{q}_1+\sqrt{2}\boldsymbol{q}_2=(2,2,2)^\top+(-1,0,1)^\top=(1,2,3)^\top=\boldsymbol{a}_2$。故分解正确。此外 $|\det\boldsymbol{R}|=\sqrt{3}\cdot\sqrt{2}=\sqrt{6}$，即以 $\boldsymbol{a}_1,\boldsymbol{a}_2$ 为边的平行四边形面积为 $\sqrt{6}$，与 $\|\boldsymbol{a}_1\times\boldsymbol{a}_2\|_2=\|(1,-2,1)^\top\|_2=\sqrt{6}$ 一致。

### 8.1.3 存在性与唯一性

**定理 8.4（列满秩矩阵 QR 分解的存在唯一性）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$m\geqslant n$。

（1）（存在性）$\boldsymbol{A}$ 总存在 $QR$ 分解；若 $\operatorname{rank}(\boldsymbol{A})=n$，则可取 $\boldsymbol{Q}$ 列正交、$\boldsymbol{R}$ 上三角且对角元全为正。

（2）（唯一性）若 $\operatorname{rank}(\boldsymbol{A})=n$，并附加要求 $r_{ii}>0\ (i=1,\dots,n)$，则式（8.2）中的 $\boldsymbol{Q}$ 与 $\boldsymbol{R}$ 唯一确定。

（3）若 $\operatorname{rank}(\boldsymbol{A})=r<n$，则存在正交矩阵 $\bar{\boldsymbol{Q}}\in\mathbb{R}^{m\times m}$ 与置换矩阵 $\boldsymbol{P}\in\mathbb{R}^{n\times n}$，使得
$$
\bar{\boldsymbol{Q}}^\top\boldsymbol{A}\boldsymbol{P}=\begin{bmatrix}\boldsymbol{R}_{11}&\boldsymbol{R}_{12}\\ \boldsymbol{0}&\boldsymbol{0}\end{bmatrix},
$$
其中 $\boldsymbol{R}_{11}\in\mathbb{R}^{r\times r}$ 为对角元全正的上三角矩阵。此为列主元 $QR$ 分解（QRCP）。

**证明**

（1）当 $\operatorname{rank}(\boldsymbol{A})=n$ 时，$\boldsymbol{A}$ 的列线性无关，定理 8.3 直接给出所需分解。当秩亏时，可对 $\boldsymbol{A}$ 施行列主元选取：在第 $k$ 步选择剩余列中范数最大者作为主元列，此时若所有剩余列在已生成子空间的正交补上的投影范数小于给定阈值，则判定秩为 $k-1$ 并停止，得到（3）中的分块形式。

（2）设 $\boldsymbol{A}=\boldsymbol{Q}_1\boldsymbol{R}_1=\boldsymbol{Q}_2\boldsymbol{R}_2$ 均满足要求。由于 $\operatorname{rank}(\boldsymbol{A})=n$，$\boldsymbol{R}_1,\boldsymbol{R}_2$ 均可逆，$\boldsymbol{Q}_1,\boldsymbol{Q}_2$ 均列正交，故
$$
\boldsymbol{Q}_1^\top\boldsymbol{Q}_2=\boldsymbol{R}_1\boldsymbol{R}_2^{-1}. \tag{8.5}
$$
式（8.5）左端满足 $(\boldsymbol{Q}_1^\top\boldsymbol{Q}_2)^\top(\boldsymbol{Q}_1^\top\boldsymbol{Q}_2)=\boldsymbol{Q}_2^\top\boldsymbol{Q}_1\boldsymbol{Q}_1^\top\boldsymbol{Q}_2=\boldsymbol{I}_n$，即为正交矩阵；右端为上三角矩阵之积，仍为上三角矩阵，且其对角元为 $r_{1,ii}/r_{2,ii}>0$。一个既是正交阵又是上三角阵的矩阵必为对角阵：设 $\boldsymbol{D}$ 上三角且正交，则由 $\boldsymbol{D}^\top\boldsymbol{D}=\boldsymbol{I}$ 得 $\boldsymbol{D}$ 的列标准正交，而第 $j$ 列只有前 $j$ 个分量非零，与前面各列正交迫使 $d_{ij}=0\ (i<j)$，故 $\boldsymbol{D}$ 为对角阵且对角元为 $\pm1$。结合对角元为正，得 $\boldsymbol{R}_1\boldsymbol{R}_2^{-1}=\boldsymbol{I}_n$，即 $\boldsymbol{R}_1=\boldsymbol{R}_2$，进而 $\boldsymbol{Q}_1=\boldsymbol{Q}_2$。唯一性得证。

□

定理 8.4 表明，唯一性完全依赖于对角元的符号约定。若不加限制，$\boldsymbol{Q}$ 与 $\boldsymbol{R}$ 可同时右乘、左乘任意符号对角矩阵 $\operatorname{diag}(\pm1,\dots,\pm1)$ 而保持 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$ 成立，故有 $2^n$ 种等价分解。

### 8.1.4 Householder 反射变换

**定义 8.5（Householder 反射）**　设 $\boldsymbol{u}\in\mathbb{R}^m$，$\boldsymbol{u}\neq\boldsymbol{0}$。称
$$
\boldsymbol{H}=\boldsymbol{I}_m-2\,\frac{\boldsymbol{u}\boldsymbol{u}^\top}{\boldsymbol{u}^\top\boldsymbol{u}} \tag{8.6}
$$
为由 $\boldsymbol{u}$ 确定的 Householder 反射（初等反射矩阵）。

**引理 8.6（Householder 反射的基本性质）**　式（8.6）定义的 $\boldsymbol{H}$ 满足：

（1）$\boldsymbol{H}$ 对称：$\boldsymbol{H}^\top=\boldsymbol{H}$；

（2）$\boldsymbol{H}$ 正交：$\boldsymbol{H}^\top\boldsymbol{H}=\boldsymbol{I}_m$；

（3）$\boldsymbol{H}$ 对合：$\boldsymbol{H}^2=\boldsymbol{I}_m$，从而 $\boldsymbol{H}^{-1}=\boldsymbol{H}$，$\det\boldsymbol{H}=-1$；

（4）$\boldsymbol{H}\boldsymbol{u}=-\boldsymbol{u}$，且对任意 $\boldsymbol{w}\perp\boldsymbol{u}$ 有 $\boldsymbol{H}\boldsymbol{w}=\boldsymbol{w}$。即 $\boldsymbol{H}$ 是关于超平面 $\boldsymbol{u}^\perp$ 的镜面反射。

**证明**

记 $\beta=2/(\boldsymbol{u}^\top\boldsymbol{u})$。（1）$(\boldsymbol{u}\boldsymbol{u}^\top)^\top=\boldsymbol{u}\boldsymbol{u}^\top$，故 $\boldsymbol{H}$ 对称。（2）$\boldsymbol{H}^\top\boldsymbol{H}=\boldsymbol{H}^2=(\boldsymbol{I}-\beta\boldsymbol{u}\boldsymbol{u}^\top)^2=\boldsymbol{I}-2\beta\boldsymbol{u}\boldsymbol{u}^\top+\beta^2\boldsymbol{u}(\boldsymbol{u}^\top\boldsymbol{u})\boldsymbol{u}^\top=\boldsymbol{I}-2\beta\boldsymbol{u}\boldsymbol{u}^\top+\beta\boldsymbol{u}\boldsymbol{u}^\top\cdot(\beta\boldsymbol{u}^\top\boldsymbol{u}/2)\cdot 2/\!1$。因 $\beta(\boldsymbol{u}^\top\boldsymbol{u})=2$，末式为 $\boldsymbol{I}-2\beta\boldsymbol{u}\boldsymbol{u}^\top+2\beta\boldsymbol{u}\boldsymbol{u}^\top=\boldsymbol{I}$。（3）由（2）与对称性即得 $\boldsymbol{H}^2=\boldsymbol{I}$；$\det\boldsymbol{H}=\pm1$，而 $\boldsymbol{H}\boldsymbol{u}=-\boldsymbol{u}$ 说明 $-1$ 是特征值，且在 $\boldsymbol{u}^\perp$ 上 $\boldsymbol{H}$ 为恒等映射，故特征值为 $-1,1,\dots,1$，行列式为 $-1$。（4）$\boldsymbol{H}\boldsymbol{u}=\boldsymbol{u}-\beta\boldsymbol{u}(\boldsymbol{u}^\top\boldsymbol{u})=\boldsymbol{u}-2\boldsymbol{u}=-\boldsymbol{u}$；若 $\boldsymbol{u}^\top\boldsymbol{w}=0$，则 $\boldsymbol{H}\boldsymbol{w}=\boldsymbol{w}$。

□

Householder 变换的关键用途是：给定 $\boldsymbol{x}\in\mathbb{R}^m$，$\boldsymbol{x}\neq\boldsymbol{0}$，可构造反射把 $\boldsymbol{x}$ 映到第一个坐标轴上。取 $\alpha=-\operatorname{sign}(x_1)\|\boldsymbol{x}\|_2$（约定 $\operatorname{sign}(0)=1$）与 $\boldsymbol{u}=\boldsymbol{x}-\alpha\boldsymbol{e}_1$，则由引理 8.6（4）可验证
$$
\boldsymbol{H}\boldsymbol{x}=\alpha\boldsymbol{e}_1=-\operatorname{sign}(x_1)\|\boldsymbol{x}\|_2\,\boldsymbol{e}_1. \tag{8.7}
$$
符号 $\alpha$ 取为与 $x_1$ 异号，是为了避免 $\boldsymbol{u}=\boldsymbol{x}-\alpha\boldsymbol{e}_1$ 发生相抵消（catastrophic cancellation），从而保证 $\|\boldsymbol{u}\|_2$ 与 $\|\boldsymbol{x}\|_2$ 同阶，这是算法数值稳定的关键设计。

**定理 8.7（Householder 三角化）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$m\geqslant n$。则存在有限个 Householder 反射 $\boldsymbol{H}_1,\dots,\boldsymbol{H}_p$（$p=\min\{n,m-1\}$），使得
$$
\boldsymbol{H}_p\cdots\boldsymbol{H}_1\boldsymbol{A}=\begin{bmatrix}\boldsymbol{R}\\ \boldsymbol{0}\end{bmatrix}=\bar{\boldsymbol{R}}, \tag{8.8}
$$
其中 $\boldsymbol{R}\in\mathbb{R}^{n\times n}$ 为上三角矩阵。令 $\boldsymbol{Q}=\boldsymbol{H}_1\cdots\boldsymbol{H}_p$，则 $\boldsymbol{Q}$ 为正交矩阵且 $\boldsymbol{A}=\boldsymbol{Q}\bar{\boldsymbol{R}}$，即得完全 $QR$ 分解。该算法的浮点运算量约为 $2mn^2-\frac{2}{3}n^3$。

**证明**

对列指标归纳。设已完成 $k-1$ 步，$\boldsymbol{A}^{(k-1)}=\boldsymbol{H}_{k-1}\cdots\boldsymbol{H}_1\boldsymbol{A}$ 的前 $k-1$ 列已呈上三角形状。取 $\boldsymbol{x}$ 为 $\boldsymbol{A}^{(k-1)}$ 第 $k$ 列的第 $k$ 至第 $m$ 个分量构成的子向量，按式（8.7）构造 $m-k+1$ 阶反射 $\hat{\boldsymbol{H}}_k$，并令
$$
\boldsymbol{H}_k=\begin{bmatrix}\boldsymbol{I}_{k-1}&\boldsymbol{0}\\ \boldsymbol{0}&\hat{\boldsymbol{H}}_k\end{bmatrix}.
$$
则 $\boldsymbol{H}_k$ 仍为对称正交矩阵，且 $\boldsymbol{H}_k$ 不改变前 $k-1$ 列已有的零结构（因为它只混合第 $k$ 行及以下的行，而前 $k-1$ 列在第 $k$ 行以下已为零）。$\boldsymbol{H}_k\boldsymbol{A}^{(k-1)}$ 的第 $k$ 列在第 $k+1$ 行以下全为零。经 $p$ 步即得式（8.8）。由引理 8.6，$\boldsymbol{Q}=\boldsymbol{H}_1\cdots\boldsymbol{H}_p$ 为正交矩阵，且 $\boldsymbol{Q}^\top=\boldsymbol{H}_p\cdots\boldsymbol{H}_1$，故 $\boldsymbol{A}=\boldsymbol{Q}\bar{\boldsymbol{R}}$。运算量的估计来自每步对 $(m-k+1)\times(n-k+1)$ 子矩阵作秩一更新 $\boldsymbol{A}\leftarrow\boldsymbol{A}-\beta\boldsymbol{u}(\boldsymbol{u}^\top\boldsymbol{A})$，需约 $4(m-k+1)(n-k+1)$ 次运算，对 $k$ 求和即得。

□

Householder 方法的数值稳定性显著优于 Gram–Schmidt：每一步只引入 $O(u)$ 量级的相对误差，且 $\boldsymbol{Q}$ 由反射矩阵之积隐式表示，计算得到的 $\hat{\boldsymbol{Q}}$ 在机器精度意义下严格正交，$\hat{\boldsymbol{Q}}\hat{\boldsymbol{R}}$ 恰好等于某个邻近矩阵 $\boldsymbol{A}+\delta\boldsymbol{A}$ 的精确分解，其中 $\|\delta\boldsymbol{A}\|_F\leqslant c\,mn\,u\,\|\boldsymbol{A}\|_F$。这种性质称为向后稳定性（backward stability）。

**例 8.2**　用 Householder 反射求 $\boldsymbol{A}=\begin{bmatrix}3&1\\ 4&3\end{bmatrix}$ 的 $QR$ 分解，并使 $\boldsymbol{R}$ 的对角元为正。

**解**　取 $\boldsymbol{x}=(3,4)^\top$ 为第一列，$\|\boldsymbol{x}\|_2=5$，$x_1=3>0$，故 $\alpha=-5$，$\boldsymbol{u}=\boldsymbol{x}-\alpha\boldsymbol{e}_1=(3+5,4)^\top=(8,4)^\top$，$\boldsymbol{u}^\top\boldsymbol{u}=64+16=80$。由式（8.6），
$$
\boldsymbol{H}=\boldsymbol{I}_2-2\cdot\frac{1}{80}\begin{bmatrix}64&32\\ 32&16\end{bmatrix}
=\begin{bmatrix}1-1.6&-0.8\\ -0.8&1-0.4\end{bmatrix}
=\begin{bmatrix}-0.6&-0.8\\ -0.8&0.6\end{bmatrix}.
$$
由式（8.7）验算 $\boldsymbol{H}\boldsymbol{x}=(-0.6\times3-0.8\times4,\ -0.8\times3+0.6\times4)^\top=(-5,0)^\top$，符合预期。计算
$$
\boldsymbol{H}\boldsymbol{A}=\begin{bmatrix}-0.6&-0.8\\ -0.8&0.6\end{bmatrix}\begin{bmatrix}3&1\\ 4&3\end{bmatrix}
=\begin{bmatrix}-5&-3\\ 0&1\end{bmatrix}.
$$
因 $n=2$，$p=\min\{2,1\}=1$，三角化已完成。此时 $\boldsymbol{Q}=\boldsymbol{H}^\top=\boldsymbol{H}$（$\boldsymbol{H}$ 对称），$\boldsymbol{R}=\boldsymbol{H}\boldsymbol{A}$。但 $r_{11}=-5<0$，不满足定理 8.4 的符号约定。取 $\boldsymbol{D}=\operatorname{diag}(-1,1)$，令 $\boldsymbol{Q}'=\boldsymbol{Q}\boldsymbol{D}$，$\boldsymbol{R}'=\boldsymbol{D}\boldsymbol{R}$，则 $\boldsymbol{Q}'\boldsymbol{R}'=\boldsymbol{Q}\boldsymbol{D}\boldsymbol{D}\boldsymbol{R}=\boldsymbol{Q}\boldsymbol{R}=\boldsymbol{A}$，且
$$
\boldsymbol{Q}'=\begin{bmatrix}0.6&-0.8\\ 0.8&0.6\end{bmatrix},\qquad
\boldsymbol{R}'=\begin{bmatrix}5&3\\ 0&1\end{bmatrix}.
$$
直接验证：$\boldsymbol{Q}'\boldsymbol{R}'$ 第一列为 $(0.6\times5,\ 0.8\times5)^\top=(3,4)^\top$，第二列为 $(0.6\times3-0.8\times1,\ 0.8\times3+0.6\times1)^\top=(1,3)^\top$，与 $\boldsymbol{A}$ 一致。$\det\boldsymbol{Q}'=0.36+0.64=1$，$\boldsymbol{Q}'$ 为正交矩阵（实为旋转）。由唯一性定理 8.4（2），这就是满足 $r_{ii}>0$ 的唯一分解。

## 8.2 Cholesky 分解

### 8.2.1 对称正定矩阵

**定义 8.8（对称正定矩阵）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 且 $\boldsymbol{A}^\top=\boldsymbol{A}$。若对任意非零 $\boldsymbol{x}\in\mathbb{R}^n$ 均有
$$
\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}>0, \tag{8.9}
$$
则称 $\boldsymbol{A}$ 为正定矩阵，记 $\boldsymbol{A}\succ\boldsymbol{0}$；若 $\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}\geqslant0$，则称为半正定矩阵，记 $\boldsymbol{A}\succeq\boldsymbol{0}$。

**引理 8.9（正定的等价刻画）**　设 $\boldsymbol{A}$ 为 $n$ 阶实对称矩阵，$\lambda_1\geqslant\cdots\geqslant\lambda_n$ 为其全部特征值。则下列条件等价：

（1）$\boldsymbol{A}\succ\boldsymbol{0}$；（2）$\lambda_n>0$；（3）$\boldsymbol{A}$ 的各阶顺序主子式均大于零（Sylvester 判据）；（4）存在可逆矩阵 $\boldsymbol{M}$ 使 $\boldsymbol{A}=\boldsymbol{M}^\top\boldsymbol{M}$；（5）$\boldsymbol{A}$ 有正定平方根 $\boldsymbol{A}^{1/2}$。

**证明**

（1）$\Rightarrow$（2）：设 $\boldsymbol{A}\boldsymbol{v}=\lambda\boldsymbol{v}$，$\|\boldsymbol{v}\|_2=1$，则 $\lambda=\boldsymbol{v}^\top\boldsymbol{A}\boldsymbol{v}>0$，所有特征值为正。（2）$\Rightarrow$（4）：由谱分解 $\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Lambda}\boldsymbol{U}^\top$，取 $\boldsymbol{M}=\boldsymbol{\Lambda}^{1/2}\boldsymbol{U}^\top$，$\boldsymbol{M}$ 可逆且 $\boldsymbol{M}^\top\boldsymbol{M}=\boldsymbol{U}\boldsymbol{\Lambda}^{1/2}\boldsymbol{\Lambda}^{1/2}\boldsymbol{U}^\top=\boldsymbol{A}$。（4）$\Rightarrow$（1）：$\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}=\|\boldsymbol{M}\boldsymbol{x}\|_2^2>0$（$\boldsymbol{x}\neq\boldsymbol{0}$ 时 $\boldsymbol{M}\boldsymbol{x}\neq\boldsymbol{0}$）。（2）$\Rightarrow$（5）：取 $\boldsymbol{A}^{1/2}=\boldsymbol{U}\boldsymbol{\Lambda}^{1/2}\boldsymbol{U}^\top$。（1）$\Rightarrow$（3）：任一顺序主子式对应 $\boldsymbol{A}$ 限制在坐标子空间上的二次型，仍正定，其特征值之积为正。（3）$\Rightarrow$（1）：对 $n$ 归纳，利用分块消元与 Schur 补的正定性。

□

### 8.2.2 Cholesky 分解的存在唯一性

**定理 8.10（Cholesky 分解的存在唯一性）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 为对称正定矩阵。则存在唯一的下三角矩阵 $\boldsymbol{L}\in\mathbb{R}^{n\times n}$，其对角元 $l_{ii}>0\ (i=1,\dots,n)$，使得
$$
\boldsymbol{A}=\boldsymbol{L}\boldsymbol{L}^\top. \tag{8.10}
$$

**证明**

先证存在性，对 $n$ 归纳。

$n=1$ 时，$\boldsymbol{A}=[a_{11}]$，由式（8.9）取 $\boldsymbol{x}=1$ 得 $a_{11}>0$。令 $l_{11}=\sqrt{a_{11}}>0$，则 $\boldsymbol{A}=[l_{11}][l_{11}]$，结论成立。

设结论对一切 $n-1$ 阶对称正定矩阵成立。将 $n$ 阶矩阵分块为
$$
\boldsymbol{A}=\begin{bmatrix}\alpha&\boldsymbol{b}^\top\\ \boldsymbol{b}&\boldsymbol{A}_{22}\end{bmatrix},\qquad \alpha\in\mathbb{R},\ \boldsymbol{b}\in\mathbb{R}^{n-1},\ \boldsymbol{A}_{22}\in\mathbb{R}^{(n-1)\times(n-1)}. \tag{8.11}
$$
取 $\boldsymbol{x}=(1,\boldsymbol{0}^\top)^\top$ 代入式（8.9）得 $\alpha>0$。令 $l_{11}=\sqrt{\alpha}$，$\boldsymbol{l}=\boldsymbol{b}/l_{11}$，并考虑 Schur 补
$$
\boldsymbol{S}=\boldsymbol{A}_{22}-\boldsymbol{l}\boldsymbol{l}^\top=\boldsymbol{A}_{22}-\frac{1}{\alpha}\boldsymbol{b}\boldsymbol{b}^\top.
$$
$\boldsymbol{S}$ 显然对称。下证 $\boldsymbol{S}\succ\boldsymbol{0}$。对任意非零 $\boldsymbol{y}\in\mathbb{R}^{n-1}$，构造 $\boldsymbol{x}=(-\boldsymbol{l}^\top\boldsymbol{y}/l_{11},\ \boldsymbol{y}^\top)^\top\in\mathbb{R}^n$，则 $\boldsymbol{x}\neq\boldsymbol{0}$（因其后 $n-1$ 个分量为 $\boldsymbol{y}\neq\boldsymbol{0}$），且
$$
\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}
=\frac{(\boldsymbol{l}^\top\boldsymbol{y})^2}{l_{11}^2}\alpha-2\frac{\boldsymbol{l}^\top\boldsymbol{y}}{l_{11}}\boldsymbol{b}^\top\boldsymbol{y}+\boldsymbol{y}^\top\boldsymbol{A}_{22}\boldsymbol{y}
=(\boldsymbol{l}^\top\boldsymbol{y})^2-2(\boldsymbol{l}^\top\boldsymbol{y})(l_{11}\boldsymbol{l})^\top\boldsymbol{y}+\boldsymbol{y}^\top\boldsymbol{A}_{22}\boldsymbol{y}.
$$
由 $l_{11}\boldsymbol{l}=\boldsymbol{b}$，上式化为 $\boldsymbol{y}^\top\boldsymbol{A}_{22}\boldsymbol{y}-(\boldsymbol{l}^\top\boldsymbol{y})^2=\boldsymbol{y}^\top\boldsymbol{S}\boldsymbol{y}$。而 $\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}>0$，故 $\boldsymbol{y}^\top\boldsymbol{S}\boldsymbol{y}>0$，$\boldsymbol{S}\succ\boldsymbol{0}$。

由归纳假设，存在唯一的对角元为正的下三角矩阵 $\boldsymbol{L}_{22}\in\mathbb{R}^{(n-1)\times(n-1)}$ 使 $\boldsymbol{S}=\boldsymbol{L}_{22}\boldsymbol{L}_{22}^\top$。令
$$
\boldsymbol{L}=\begin{bmatrix}l_{11}&\boldsymbol{0}^\top\\ \boldsymbol{l}&\boldsymbol{L}_{22}\end{bmatrix},
$$
则 $\boldsymbol{L}$ 为下三角且对角元全正，并且
$$
\boldsymbol{L}\boldsymbol{L}^\top=\begin{bmatrix}l_{11}^2&l_{11}\boldsymbol{l}^\top\\ l_{11}\boldsymbol{l}&\boldsymbol{l}\boldsymbol{l}^\top+\boldsymbol{L}_{22}\boldsymbol{L}_{22}^\top\end{bmatrix}
=\begin{bmatrix}\alpha&\boldsymbol{b}^\top\\ \boldsymbol{b}&\boldsymbol{l}\boldsymbol{l}^\top+\boldsymbol{S}\end{bmatrix}
=\begin{bmatrix}\alpha&\boldsymbol{b}^\top\\ \boldsymbol{b}&\boldsymbol{A}_{22}\end{bmatrix}=\boldsymbol{A}.
$$
存在性得证。

再证唯一性。设 $\boldsymbol{A}=\boldsymbol{L}_1\boldsymbol{L}_1^\top=\boldsymbol{L}_2\boldsymbol{L}_2^\top$，其中 $\boldsymbol{L}_1,\boldsymbol{L}_2$ 均为对角元为正的下三角矩阵。因对角元为正的下三角矩阵必可逆，令 $\boldsymbol{G}=\boldsymbol{L}_2^{-1}\boldsymbol{L}_1$，则 $\boldsymbol{G}$ 仍为下三角矩阵（下三角矩阵之积与逆均下三角），且其对角元为 $l_{1,ii}/l_{2,ii}>0$。由 $\boldsymbol{L}_1\boldsymbol{L}_1^\top=\boldsymbol{L}_2\boldsymbol{L}_2^\top$ 得
$$
\boldsymbol{G}\boldsymbol{G}^\top=\boldsymbol{L}_2^{-1}\boldsymbol{L}_1\boldsymbol{L}_1^\top\boldsymbol{L}_2^{-\top}=\boldsymbol{L}_2^{-1}\boldsymbol{L}_2\boldsymbol{L}_2^\top\boldsymbol{L}_2^{-\top}=\boldsymbol{I}_n,
$$
即 $\boldsymbol{G}$ 为正交矩阵。与定理 8.4 的证明同理，一个既下三角又正交的矩阵必为对角阵且对角元为 $\pm1$；结合对角元为正得 $\boldsymbol{G}=\boldsymbol{I}_n$，即 $\boldsymbol{L}_1=\boldsymbol{L}_2$。

□

**推论 8.11（正定的判定）**　实对称矩阵 $\boldsymbol{A}$ 正定的充要条件是 Cholesky 算法能够在所有步骤中开出正平方根，即对每个 $j$ 有 $a_{jj}-\sum_{k<j}l_{jk}^2>0$。特别地，正定矩阵必可逆，$\det\boldsymbol{A}=\bigl(\prod_{i=1}^{n}l_{ii}\bigr)^2>0$，且 $\boldsymbol{A}^{-1}$ 亦对称正定。

**证明**

必要性由定理 8.10 得到。充分性：若算法给出 $\boldsymbol{A}=\boldsymbol{L}\boldsymbol{L}^\top$ 且 $l_{ii}>0$，则对 $\boldsymbol{x}\neq\boldsymbol{0}$，$\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}=\|\boldsymbol{L}^\top\boldsymbol{x}\|_2^2>0$（$\boldsymbol{L}^\top$ 可逆）。$\det\boldsymbol{A}=\det\boldsymbol{L}\det\boldsymbol{L}^\top=(\prod l_{ii})^2$。$\boldsymbol{A}^{-1}=\boldsymbol{L}^{-\top}\boldsymbol{L}^{-1}=(\boldsymbol{L}^{-1})^\top\boldsymbol{L}^{-1}$，由引理 8.9（4）知正定。

□

### 8.2.3 Cholesky 算法

将式（8.10）按元素展开，比较 $\boldsymbol{A}$ 与 $\boldsymbol{L}\boldsymbol{L}^\top$ 的 $(i,j)$ 元，注意 $l_{ik}=0\ (k>i)$，得
$$
a_{ij}=\sum_{k=1}^{\min\{i,j\}}l_{ik}l_{jk}.
$$
逐列求解即得 Cholesky 算法：对 $j=1,\dots,n$，
$$
l_{jj}=\sqrt{a_{jj}-\sum_{k=1}^{j-1}l_{jk}^2}, \tag{8.12}
$$
$$
l_{ij}=\frac{1}{l_{jj}}\Bigl(a_{ij}-\sum_{k=1}^{j-1}l_{ik}l_{jk}\Bigr),\qquad i=j+1,\dots,n. \tag{8.13}
$$
该算法只需读取 $\boldsymbol{A}$ 的下三角部分，浮点运算量为 $\frac{n^3}{6}+O(n^2)$（约为一般 $LU$ 分解的一半），且不需要选主元。若在式（8.12）中出现根号内为负或为零，则 $\boldsymbol{A}$ 不是正定矩阵（分别为不定与半正定或不定），算法应立即终止并报告失败。这一性质使 Cholesky 分解成为检验协方差矩阵正定性的最廉价手段。

数值稳定性方面，Cholesky 算法是向后稳定的：计算所得 $\hat{\boldsymbol{L}}$ 满足 $\hat{\boldsymbol{L}}\hat{\boldsymbol{L}}^\top=\boldsymbol{A}+\delta\boldsymbol{A}$，$\|\delta\boldsymbol{A}\|_F\leqslant c\,n\,u\,\|\boldsymbol{A}\|_F$，且 $\hat{\boldsymbol{L}}$ 的对角元自动为正，不会出现增长因子（growth factor）问题。这是 Cholesky 优于 $LU$ 分解的重要方面。

**例 8.3**　求 $\boldsymbol{A}=\begin{bmatrix}4&2&2\\ 2&5&3\\ 2&3&6\end{bmatrix}$ 的 Cholesky 分解，并用它求解 $\boldsymbol{A}\boldsymbol{x}=(16,14,15)^\top$。

**解**　按式（8.12）与式（8.13）逐列计算。

第一列：$l_{11}=\sqrt{a_{11}}=\sqrt{4}=2$；$l_{21}=a_{21}/l_{11}=2/2=1$；$l_{31}=a_{31}/l_{11}=2/2=1$。

第二列：$l_{22}=\sqrt{a_{22}-l_{21}^2}=\sqrt{5-1}=2$；$l_{32}=(a_{32}-l_{31}l_{21})/l_{22}=(3-1\times1)/2=1$。

第三列：$l_{33}=\sqrt{a_{33}-l_{31}^2-l_{32}^2}=\sqrt{6-1-1}=\sqrt{4}=2$。

故
$$
\boldsymbol{L}=\begin{bmatrix}2&0&0\\ 1&2&0\\ 1&1&2\end{bmatrix},\qquad
\boldsymbol{L}^\top=\begin{bmatrix}2&1&1\\ 0&2&1\\ 0&0&2\end{bmatrix}.
$$
验算：$\boldsymbol{L}\boldsymbol{L}^\top$ 的 $(1,1)$ 元为 $4$，$(2,1)$ 元为 $2$，$(3,1)$ 元为 $2$，$(2,2)$ 元为 $1+4=5$，$(3,2)$ 元为 $1+2=3$，$(3,3)$ 元为 $1+1+4=6$，与 $\boldsymbol{A}$ 完全一致。所有 $l_{ii}=2>0$，由推论 8.11 可知 $\boldsymbol{A}$ 正定。

解方程组：先前代求解 $\boldsymbol{L}\boldsymbol{y}=\boldsymbol{b}$，$\boldsymbol{b}=(16,14,15)^\top$：
$$
2y_1=16\Rightarrow y_1=8,\qquad y_1+2y_2=14\Rightarrow y_2=3,\qquad y_1+y_2+2y_3=15\Rightarrow y_3=2.
$$
再回代求解 $\boldsymbol{L}^\top\boldsymbol{x}=\boldsymbol{y}$：
$$
2x_3=y_3=2\Rightarrow x_3=1,\qquad 2x_2+x_3=y_2=3\Rightarrow x_2=1,\qquad 2x_1+x_2+x_3=y_1=8\Rightarrow x_1=3.
$$
故 $\boldsymbol{x}=(3,1,1)^\top$。检验：$\boldsymbol{A}\boldsymbol{x}$ 的三个分量依次为 $4\times3+2\times1+2\times1=16$，$2\times3+5\times1+3\times1=14$，$2\times3+3\times1+6\times1=15$，与右端完全一致。此外 $\det\boldsymbol{A}=(l_{11}l_{22}l_{33})^2=8^2=64>0$，与直接展开 $\det\boldsymbol{A}=4(30-9)-2(12-6)+2(6-10)=84-12-8=64$ 相符。

### 8.2.4 与 QR 分解的关系

设 $\boldsymbol{A}$ 对称正定。由定理 8.4，$\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$，$\boldsymbol{R}$ 对角元为正。于是 $\boldsymbol{A}=\boldsymbol{A}^\top=(\boldsymbol{Q}\boldsymbol{R})^\top=\boldsymbol{R}^\top\boldsymbol{Q}^\top$，而 $\boldsymbol{R}^\top$ 为下三角且对角元为正，由定理 8.10 的唯一性得 $\boldsymbol{L}=\boldsymbol{R}^\top$，$\boldsymbol{Q}=\boldsymbol{L}^{-\top}\boldsymbol{L}$。这说明 Cholesky 分解与 $QR$ 分解在正定情形下是同一结构的两种表述。反之，对任意 $\boldsymbol{X}\in\mathbb{R}^{m\times n}$（$m\geqslant n$，列满秩），Gram 矩阵 $\boldsymbol{X}^\top\boldsymbol{X}$ 对称正定，且由 $\boldsymbol{X}=\boldsymbol{Q}\boldsymbol{R}$ 得 $\boldsymbol{X}^\top\boldsymbol{X}=\boldsymbol{R}^\top\boldsymbol{Q}^\top\boldsymbol{Q}\boldsymbol{R}=\boldsymbol{R}^\top\boldsymbol{R}$，即 $\boldsymbol{X}^\top\boldsymbol{X}$ 的 Cholesky 因子恰为 $QR$ 分解的上三角因子的转置。这一恒等式在量化回归中尤为重要：设计矩阵的 Gram 矩阵的 Cholesky 分解可直接给出 $QR$ 因子，但如 8.5 节所述，经由 Gram 矩阵的计算路径会损失精度。

## 8.3 奇异值分解

### 8.3.1 谱分解回顾

**定理 8.12（实对称矩阵的谱分解）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 且 $\boldsymbol{A}^\top=\boldsymbol{A}$。则 $\boldsymbol{A}$ 的全部特征值为实数，存在标准正交特征向量组 $\boldsymbol{v}_1,\dots,\boldsymbol{v}_n$ 及正交矩阵 $\boldsymbol{V}=[\boldsymbol{v}_1,\dots,\boldsymbol{v}_n]$，使得
$$
\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Lambda}\boldsymbol{V}^\top,\qquad \boldsymbol{\Lambda}=\operatorname{diag}(\lambda_1,\dots,\lambda_n). \tag{8.14}
$$
若 $\boldsymbol{A}\succeq\boldsymbol{0}$，则 $\lambda_i\geqslant0$。

**证明**

设 $\lambda\in\mathbb{C}$ 为特征值，$\boldsymbol{z}\in\mathbb{C}^n$ 为对应非零特征向量，$\boldsymbol{A}\boldsymbol{z}=\lambda\boldsymbol{z}$。取共轭转置得 $\boldsymbol{z}^*\boldsymbol{A}=\bar{\lambda}\boldsymbol{z}^*$（用 $\boldsymbol{A}$ 实对称），两式相乘给出 $\boldsymbol{z}^*\boldsymbol{A}\boldsymbol{z}=\lambda\boldsymbol{z}^*\boldsymbol{z}=\bar{\lambda}\boldsymbol{z}^*\boldsymbol{z}$，因 $\boldsymbol{z}^*\boldsymbol{z}>0$，故 $\lambda=\bar{\lambda}$，$\lambda$ 为实数。不同特征值的特征向量正交：设 $\boldsymbol{A}\boldsymbol{v}_i=\lambda_i\boldsymbol{v}_i$，$\boldsymbol{A}\boldsymbol{v}_j=\lambda_j\boldsymbol{v}_j$，$\lambda_i\neq\lambda_j$，则 $\lambda_i\boldsymbol{v}_i^\top\boldsymbol{v}_j=(\boldsymbol{A}\boldsymbol{v}_i)^\top\boldsymbol{v}_j=\boldsymbol{v}_i^\top\boldsymbol{A}\boldsymbol{v}_j=\lambda_j\boldsymbol{v}_i^\top\boldsymbol{v}_j$，故 $\boldsymbol{v}_i^\top\boldsymbol{v}_j=0$。对重特征值，其 eigenspace 内可用 Gram–Schmidt（定理 8.3）正交化。归纳地，对 $n$ 阶矩阵取单位特征向量 $\boldsymbol{v}_1$，扩充为正交基得 $\boldsymbol{U}=[\boldsymbol{v}_1,\boldsymbol{U}_\perp]$，则 $\boldsymbol{U}^\top\boldsymbol{A}\boldsymbol{U}$ 的第一列为 $(\lambda_1,\boldsymbol{0}^\top)^\top$，由对称性第一行亦然，故 $\boldsymbol{U}^\top\boldsymbol{A}\boldsymbol{U}=\operatorname{diag}(\lambda_1,\boldsymbol{A}_1)$，对 $n-1$ 阶的 $\boldsymbol{A}_1$ 用归纳假设即得式（8.14）。半正定时，$\lambda_i=\boldsymbol{v}_i^\top\boldsymbol{A}\boldsymbol{v}_i\geqslant0$。

□

### 8.3.2 奇异值与 SVD 的存在性

**定义 8.13（奇异值与奇异值分解）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\operatorname{rank}(\boldsymbol{A})=r$。$\boldsymbol{A}$ 的奇异值定义为 $\boldsymbol{A}^\top\boldsymbol{A}$ 的特征值的非负平方根，按降序排列：
$$
\sigma_i=\sqrt{\lambda_i(\boldsymbol{A}^\top\boldsymbol{A})},\qquad \sigma_1\geqslant\sigma_2\geqslant\cdots\geqslant\sigma_r>0=\sigma_{r+1}=\cdots=\sigma_n. \tag{8.15}
$$
若存在正交矩阵 $\boldsymbol{U}\in\mathbb{R}^{m\times m}$、$\boldsymbol{V}\in\mathbb{R}^{n\times n}$ 及矩阵 $\boldsymbol{\Sigma}\in\mathbb{R}^{m\times n}$（其前 $r$ 个对角位置依次为 $\sigma_1,\dots,\sigma_r$，其余元素全为零），使得
$$
\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top, \tag{8.16}
$$
则称式（8.16）为 $\boldsymbol{A}$ 的奇异值分解（SVD）。$\boldsymbol{U}$ 的列称为左奇异向量，$\boldsymbol{V}$ 的列称为右奇异向量。

**定理 8.14（SVD 的存在性）**　任意 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 均存在奇异值分解，且 $\boldsymbol{U},\boldsymbol{\Sigma},\boldsymbol{V}$ 中的 $\boldsymbol{\Sigma}$ 由 $\boldsymbol{A}$ 唯一确定（奇异值唯一，重数计入）。

**证明**

设 $\operatorname{rank}(\boldsymbol{A})=r$。$\boldsymbol{A}^\top\boldsymbol{A}$ 为 $n$ 阶实对称矩阵且半正定：对任意 $\boldsymbol{x}$，$\boldsymbol{x}^\top(\boldsymbol{A}^\top\boldsymbol{A})\boldsymbol{x}=\|\boldsymbol{A}\boldsymbol{x}\|_2^2\geqslant0$。由定理 8.12，存在正交矩阵 $\boldsymbol{V}=[\boldsymbol{v}_1,\dots,\boldsymbol{v}_n]$ 与 $\lambda_1\geqslant\cdots\geqslant\lambda_n\geqslant0$ 使
$$
\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Lambda}\boldsymbol{V}^\top,\qquad \boldsymbol{\Lambda}=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$
首先证明 $\lambda_i>0$ 当且仅当 $i\leqslant r$。事实上，$\|\boldsymbol{A}\boldsymbol{v}_i\|_2^2=\boldsymbol{v}_i^\top\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{v}_i=\lambda_i$，故 $\boldsymbol{A}\boldsymbol{v}_i=\boldsymbol{0}\iff\lambda_i=0$。由于 $\{\boldsymbol{v}_i\}$ 是 $\mathbb{R}^n$ 的一组基，$\operatorname{rank}(\boldsymbol{A})=n-\dim\mathcal{N}(\boldsymbol{A})=n-\#\{i:\lambda_i=0\}=r$，即前 $r$ 个特征值为正、其余为零。

对 $i=1,\dots,r$，定义
$$
\boldsymbol{u}_i=\frac{1}{\sigma_i}\boldsymbol{A}\boldsymbol{v}_i,\qquad \sigma_i=\sqrt{\lambda_i}>0. \tag{8.17}
$$
则 $\{\boldsymbol{u}_1,\dots,\boldsymbol{u}_r\}$ 标准正交：对 $i,j\leqslant r$，
$$
\boldsymbol{u}_i^\top\boldsymbol{u}_j=\frac{1}{\sigma_i\sigma_j}\boldsymbol{v}_i^\top\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{v}_j=\frac{\lambda_j}{\sigma_i\sigma_j}\boldsymbol{v}_i^\top\boldsymbol{v}_j=\frac{\sigma_j^2}{\sigma_i\sigma_j}\delta_{ij}=\delta_{ij}.
$$
将 $\{\boldsymbol{u}_1,\dots,\boldsymbol{u}_r\}$ 扩充为 $\mathbb{R}^m$ 的一组标准正交基 $\boldsymbol{u}_1,\dots,\boldsymbol{u}_m$（例如用定理 8.3 的 Gram–Schmidt 过程），令 $\boldsymbol{U}=[\boldsymbol{u}_1,\dots,\boldsymbol{u}_m]$，并按定义 8.13 构造 $\boldsymbol{\Sigma}$。下面验证式（8.16）。由于 $\boldsymbol{V}$ 正交，只需验证 $\boldsymbol{A}\boldsymbol{V}=\boldsymbol{U}\boldsymbol{\Sigma}$，即逐列验证 $\boldsymbol{A}\boldsymbol{v}_i=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{e}_i=\sigma_i\boldsymbol{u}_i$（$i\leqslant r$）与 $\boldsymbol{A}\boldsymbol{v}_i=\boldsymbol{0}$（$i>r$）。前者即式（8.17）的定义，后者由 $\lambda_i=0$ 与 $\|\boldsymbol{A}\boldsymbol{v}_i\|_2^2=\lambda_i$ 得到；同时 $\boldsymbol{\Sigma}$ 的第 $i$ 列在 $i>r$ 时为零列，故 $\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{e}_i=\boldsymbol{0}$，两边一致。于是 $\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$。

$\boldsymbol{\Sigma}$ 的唯一性：设 $\boldsymbol{A}=\boldsymbol{U}_1\boldsymbol{\Sigma}_1\boldsymbol{V}_1^\top=\boldsymbol{U}_2\boldsymbol{\Sigma}_2\boldsymbol{V}_2^\top$，则 $\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}_1\boldsymbol{\Sigma}_1^\top\boldsymbol{\Sigma}_1\boldsymbol{V}_1^\top=\boldsymbol{V}_2\boldsymbol{\Sigma}_2^\top\boldsymbol{\Sigma}_2\boldsymbol{V}_2^\top$ 均为 $\boldsymbol{A}^\top\boldsymbol{A}$ 的谱分解，而对称矩阵的特征值（含重数）唯一，故 $\boldsymbol{\Sigma}_1^\top\boldsymbol{\Sigma}_1=\boldsymbol{\Sigma}_2^\top\boldsymbol{\Sigma}_2$，即 $\boldsymbol{\Sigma}_1=\boldsymbol{\Sigma}_2$（对角元非负）。

□

式（8.16）也可写为秩一分解的和式形式
$$
\boldsymbol{A}=\sum_{i=1}^{r}\sigma_i\boldsymbol{u}_i\boldsymbol{v}_i^\top,
$$
这一表示是低秩逼近理论（定理 8.19）的出发点。当 $r<n$ 或 $r<m$ 时，$\boldsymbol{U},\boldsymbol{V}$ 中对应于零奇异值的部分不唯一，故 SVD 的正交因子在奇异值有重根或为零时不唯一。

**推论 8.15（奇异值与特征值的关系）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，奇异值为 $\sigma_1\geqslant\cdots\geqslant\sigma_r>0$。则：

（1）$\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}\operatorname{diag}(\sigma_1^2,\dots,\sigma_r^2,0,\dots,0)\boldsymbol{V}^\top$，$\boldsymbol{A}\boldsymbol{A}^\top=\boldsymbol{U}\operatorname{diag}(\sigma_1^2,\dots,\sigma_r^2,0,\dots,0)\boldsymbol{U}^\top$，即 $\boldsymbol{A}^\top\boldsymbol{A}$ 与 $\boldsymbol{A}\boldsymbol{A}^\top$ 的非零特征值完全相同，均为 $\sigma_i^2$；

（2）$\boldsymbol{A}$ 的列空间 $\mathcal{R}(\boldsymbol{A})=\operatorname{span}\{\boldsymbol{u}_1,\dots,\boldsymbol{u}_r\}$，零空间 $\mathcal{N}(\boldsymbol{A})=\operatorname{span}\{\boldsymbol{v}_{r+1},\dots,\boldsymbol{v}_n\}$，行空间 $\mathcal{R}(\boldsymbol{A}^\top)=\operatorname{span}\{\boldsymbol{v}_1,\dots,\boldsymbol{v}_r\}$，左零空间 $\mathcal{N}(\boldsymbol{A}^\top)=\operatorname{span}\{\boldsymbol{u}_{r+1},\dots,\boldsymbol{u}_m\}$；

（3）$\|\boldsymbol{A}\|_2=\sigma_1$，$\|\boldsymbol{A}\|_F=\bigl(\sum_{i=1}^{r}\sigma_i^2\bigr)^{1/2}=\sqrt{\operatorname{tr}(\boldsymbol{A}^\top\boldsymbol{A})}$；

（4）若 $\boldsymbol{A}$ 为 $n$ 阶实对称矩阵，则其奇异值为 $|\lambda_i(\boldsymbol{A})|$，即特征值的绝对值；若 $\boldsymbol{A}\succeq\boldsymbol{0}$，则 $\sigma_i=\lambda_i$；

（5）$\operatorname{rank}(\boldsymbol{A})=\#\{i:\sigma_i>0\}$，$\det(\boldsymbol{A}^\top\boldsymbol{A})=\prod_{i=1}^{n}\sigma_i^2$（$m\geqslant n$ 时）。

**证明**

（1）由 $\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$ 直接计算 $\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Sigma}^\top\boldsymbol{U}^\top\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top=\boldsymbol{V}(\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma})\boldsymbol{V}^\top$ 与 $\boldsymbol{A}\boldsymbol{A}^\top=\boldsymbol{U}(\boldsymbol{\Sigma}\boldsymbol{\Sigma}^\top)\boldsymbol{U}^\top$。（2）由 $\boldsymbol{A}\boldsymbol{v}_i=\sigma_i\boldsymbol{u}_i$（$i\leqslant r$）与 $\boldsymbol{A}\boldsymbol{v}_i=\boldsymbol{0}$（$i>r$）即得。（3）$\|\boldsymbol{A}\boldsymbol{x}\|_2^2=\|\boldsymbol{\Sigma}\boldsymbol{V}^\top\boldsymbol{x}\|_2^2=\sum_i\sigma_i^2(\boldsymbol{v}_i^\top\boldsymbol{x})^2\leqslant\sigma_1^2\|\boldsymbol{x}\|_2^2$，取 $\boldsymbol{x}=\boldsymbol{v}_1$ 得等号；Frobenius 范数在正交变换下不变，故 $\|\boldsymbol{A}\|_F=\|\boldsymbol{\Sigma}\|_F$。（4）对称时 $\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Lambda}\boldsymbol{V}^\top$，$\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Lambda}^2\boldsymbol{V}^\top$，故 $\sigma_i=\sqrt{\lambda_i^2}=|\lambda_i|$。（5）由（1）与（2）显然。

□

**例 8.4**　求 $\boldsymbol{A}=\begin{bmatrix}1&2\\ 2&1\end{bmatrix}$ 的奇异值分解，并写出其秩一逼近。

**解**　$\boldsymbol{A}$ 对称，故 $\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{A}^2=\begin{bmatrix}5&4\\ 4&5\end{bmatrix}$。其特征多项式为 $\lambda^2-10\lambda+9=(\lambda-9)(\lambda-1)$，特征值 $\lambda_1=9$，$\lambda_2=1$，对应单位特征向量分别为 $\boldsymbol{v}_1=\frac{1}{\sqrt{2}}(1,1)^\top$，$\boldsymbol{v}_2=\frac{1}{\sqrt{2}}(1,-1)^\top$。由式（8.15），奇异值 $\sigma_1=3$，$\sigma_2=1$。

按式（8.17）计算左奇异向量：
$$
\boldsymbol{u}_1=\frac{1}{3}\boldsymbol{A}\boldsymbol{v}_1=\frac{1}{3\sqrt{2}}(1+2,\ 2+1)^\top=\frac{1}{\sqrt{2}}(1,1)^\top,
$$
$$
\boldsymbol{u}_2=\frac{1}{1}\boldsymbol{A}\boldsymbol{v}_2=\frac{1}{\sqrt{2}}(1-2,\ 2-1)^\top=\frac{1}{\sqrt{2}}(-1,1)^\top.
$$
于是
$$
\boldsymbol{U}=\frac{1}{\sqrt{2}}\begin{bmatrix}1&-1\\ 1&1\end{bmatrix},\qquad
\boldsymbol{\Sigma}=\begin{bmatrix}3&0\\ 0&1\end{bmatrix},\qquad
\boldsymbol{V}=\frac{1}{\sqrt{2}}\begin{bmatrix}1&1\\ 1&-1\end{bmatrix}.
$$
验证：$\sigma_1\boldsymbol{u}_1\boldsymbol{v}_1^\top=3\cdot\frac{1}{2}\begin{bmatrix}1&1\\ 1&1\end{bmatrix}=\begin{bmatrix}1.5&1.5\\ 1.5&1.5\end{bmatrix}$，$\sigma_2\boldsymbol{u}_2\boldsymbol{v}_2^\top=\frac{1}{2}\begin{bmatrix}-1&1\\ 1&-1\end{bmatrix}=\begin{bmatrix}-0.5&0.5\\ 0.5&-0.5\end{bmatrix}$，两者之和为 $\begin{bmatrix}1&2\\ 2&1\end{bmatrix}=\boldsymbol{A}$，正确。注意 $\boldsymbol{A}$ 的特征值为 $3$ 与 $-1$，而奇异值为 $3$ 与 $1$，与推论 8.15（4）一致：$\sigma_i=|\lambda_i|$。

秩一（最佳）逼近为 $\boldsymbol{A}_1=\sigma_1\boldsymbol{u}_1\boldsymbol{v}_1^\top=\begin{bmatrix}1.5&1.5\\ 1.5&1.5\end{bmatrix}$，由定理 8.19 可知它在一切秩不超过 $1$ 的矩阵中最优，且 $\|\boldsymbol{A}-\boldsymbol{A}_1\|_F=\sigma_2=1$，$\|\boldsymbol{A}-\boldsymbol{A}_1\|_2=\sigma_2=1$。

### 8.3.3 SVD 的几何意义

**定理 8.16（SVD 的几何刻画）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$。则：

（1）线性映射 $\boldsymbol{x}\mapsto\boldsymbol{A}\boldsymbol{x}$ 可分解为一个旋转（或反射）$\boldsymbol{V}^\top$、一个沿坐标轴的伸缩 $\boldsymbol{\Sigma}$ 与另一个旋转（或反射）$\boldsymbol{U}$ 的复合；

（2）$\mathbb{R}^n$ 中单位球面 $\{\boldsymbol{x}:\|\boldsymbol{x}\|_2=1\}$ 在 $\boldsymbol{A}$ 下的像为 $\mathbb{R}^m$ 中一个（可能退化的）半轴长为 $\sigma_1,\dots,\sigma_r$ 的椭球面，各半轴方向为 $\boldsymbol{u}_1,\dots,\boldsymbol{u}_r$；

（3）对任意 $\boldsymbol{x}\in\mathbb{R}^n$，
$$
\boldsymbol{A}\boldsymbol{x}=\sum_{i=1}^{r}\sigma_i(\boldsymbol{v}_i^\top\boldsymbol{x})\boldsymbol{u}_i, \tag{8.18}
$$
即在标准正交基 $\{\boldsymbol{v}_i\}$ 下的坐标经 $\sigma_i$ 缩放后成为基 $\{\boldsymbol{u}_i\}$ 下的坐标；

（4）$\sigma_1=\max_{\|\boldsymbol{x}\|_2=1}\|\boldsymbol{A}\boldsymbol{x}\|_2$，$\sigma_n=\min_{\|\boldsymbol{x}\|_2=1}\|\boldsymbol{A}\boldsymbol{x}\|_2$（$\boldsymbol{A}$ 方阵可逆时）。

**证明**

（1）由式（8.16）直接读出。（3）将 $\boldsymbol{x}=\sum_i(\boldsymbol{v}_i^\top\boldsymbol{x})\boldsymbol{v}_i$ 代入 $\boldsymbol{A}\boldsymbol{v}_i=\sigma_i\boldsymbol{u}_i$。（2）设 $\|\boldsymbol{x}\|_2=1$，令 $c_i=\boldsymbol{v}_i^\top\boldsymbol{x}$，则 $\sum_i c_i^2=1$，$\boldsymbol{A}\boldsymbol{x}=\sum_{i\leqslant r}\sigma_ic_i\boldsymbol{u}_i$。在基 $\{\boldsymbol{u}_i\}$ 下的坐标为 $(\sigma_1c_1,\dots,\sigma_rc_r)$，满足 $\sum_{i\leqslant r}(y_i/\sigma_i)^2=1$，这正是半轴为 $\sigma_i$ 的椭球面方程。（4）$\|\boldsymbol{A}\boldsymbol{x}\|_2^2=\sum_i\sigma_i^2c_i^2$，在 $\sum c_i^2=1$ 约束下最大值与最小值分别为 $\sigma_1^2$ 与 $\sigma_r^2$（$r=n$ 时）。

□

几何上，$\sigma_1$ 刻画映射的最大放大倍数，$\sigma_n$ 刻画最小放大倍数。当 $\sigma_n$ 接近零时，存在方向被强烈压缩，映射近乎退化，这正是矩阵病态的几何来源。在量化语境下，设计矩阵的最小奇异值 $\sigma_n$ 接近零意味着存在某些因子组合几乎不可辨识，相应的回归系数方差将被放大 $1/\sigma_n^2$ 倍；而比值 $\sigma_1/\sigma_n$ 正是谱条件数（见推论 8.28），它把这种放大效应量化为一个可直接计算的指标。

### 8.3.4 低秩逼近与 Eckart–Young 定理

低秩逼近是因子模型、协方差矩阵压缩与数据降维的数学基础。其最优性由 Eckart–Young 定理保证，证明需借助两个关于对称矩阵与奇异值的基本工具。

**引理 8.17（Courant–Fischer 极小极大原理）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 实对称，特征值 $\lambda_1\geqslant\lambda_2\geqslant\cdots\geqslant\lambda_n$，记 Rayleigh 商 $R(\boldsymbol{x})=\boldsymbol{x}^\top\boldsymbol{A}\boldsymbol{x}/(\boldsymbol{x}^\top\boldsymbol{x})$。则对 $k=1,\dots,n$，
$$
\lambda_k=\max_{\substack{S\subseteq\mathbb{R}^n\\ \dim S=k}}\ \min_{\boldsymbol{0}\neq\boldsymbol{x}\in S}R(\boldsymbol{x})=\min_{\substack{S\subseteq\mathbb{R}^n\\ \dim S=n-k+1}}\ \max_{\boldsymbol{0}\neq\boldsymbol{x}\in S}R(\boldsymbol{x}). \tag{8.19}
$$
将式（8.19）应用于半正定矩阵 $\boldsymbol{A}^\top\boldsymbol{A}$，即得奇异值的变分刻画
$$
\sigma_k^2=\max_{\dim S=k}\ \min_{\substack{\boldsymbol{x}\in S\\ \|\boldsymbol{x}\|_2=1}}\|\boldsymbol{A}\boldsymbol{x}\|_2^2. \tag{8.20}
$$

**证明**

由定理 8.12，存在标准正交基 $\boldsymbol{v}_1,\dots,\boldsymbol{v}_n$ 使 $\boldsymbol{A}\boldsymbol{v}_i=\lambda_i\boldsymbol{v}_i$。对任意 $k$ 维子空间 $S$ 与任意 $n-k+1$ 维子空间 $T=\operatorname{span}\{\boldsymbol{v}_k,\dots,\boldsymbol{v}_n\}$，维数公式给出 $\dim(S\cap T)\geqslant k+(n-k+1)-n=1$，故存在单位向量 $\boldsymbol{z}\in S\cap T$。将 $\boldsymbol{z}$ 按 $\boldsymbol{v}_k,\dots,\boldsymbol{v}_n$ 展开为 $\boldsymbol{z}=\sum_{i\geqslant k}c_i\boldsymbol{v}_i$，$\sum c_i^2=1$，则 $R(\boldsymbol{z})=\sum_{i\geqslant k}\lambda_ic_i^2\leqslant\lambda_k$。因此 $\min_{\boldsymbol{x}\in S}R(\boldsymbol{x})\leqslant R(\boldsymbol{z})\leqslant\lambda_k$，对 $S$ 取上确界得第一个等式的「$\leqslant$」方向。反向不等式由取 $S_0=\operatorname{span}\{\boldsymbol{v}_1,\dots,\boldsymbol{v}_k\}$ 达到：对 $\boldsymbol{x}=\sum_{i\leqslant k}c_i\boldsymbol{v}_i$，$R(\boldsymbol{x})=\sum_{i\leqslant k}\lambda_ic_i^2\geqslant\lambda_k$。同理可证第二个等式。

□

**引理 8.18（奇异值的 Weyl 不等式）**　设 $\boldsymbol{X},\boldsymbol{Y}\in\mathbb{R}^{m\times n}$，奇异值均按降序排列。若正整数 $p,q$ 满足 $p+q-1\leqslant\min\{m,n\}$，则
$$
\sigma_{p+q-1}(\boldsymbol{X}+\boldsymbol{Y})\leqslant\sigma_p(\boldsymbol{X})+\sigma_q(\boldsymbol{Y}). \tag{8.21}
$$
特别地，取 $q=1$ 并以 $\boldsymbol{E}$ 代 $\boldsymbol{Y}$，得扰动估计
$$
\bigl|\sigma_i(\boldsymbol{X}+\boldsymbol{E})-\sigma_i(\boldsymbol{X})\bigr|\leqslant\sigma_1(\boldsymbol{E})=\|\boldsymbol{E}\|_2,\qquad i=1,\dots,\min\{m,n\},
$$
即奇异值关于谱范数是 Lipschitz 连续的，单个奇异值的绝对误差不超过扰动的谱范数。

**证明**

由引理 8.17 的第二个等式应用于 $\boldsymbol{X}^\top\boldsymbol{X}$，奇异值有极小极大刻画
$$
\sigma_k(\boldsymbol{X})=\min_{\dim S=n-k+1}\ \max_{\substack{\boldsymbol{x}\in S\\ \|\boldsymbol{x}\|_2=1}}\|\boldsymbol{X}\boldsymbol{x}\|_2 .
$$
任取子空间 $S_0,T_0\subseteq\mathbb{R}^n$，$\dim S_0=n-p+1$，$\dim T_0=n-q+1$，则
$$
\dim(S_0\cap T_0)\geqslant(n-p+1)+(n-q+1)-n=n-p-q+2.
$$
在 $S_0\cap T_0$ 中取 $n-p-q+1$ 维子空间 $S'$，由上式与三角不等式，
$$
\sigma_{p+q-1}(\boldsymbol{X}+\boldsymbol{Y})\leqslant\max_{\substack{\boldsymbol{x}\in S'\\ \|\boldsymbol{x}\|_2=1}}\|(\boldsymbol{X}+\boldsymbol{Y})\boldsymbol{x}\|_2
\leqslant\max_{\substack{\boldsymbol{x}\in S_0\\ \|\boldsymbol{x}\|_2=1}}\|\boldsymbol{X}\boldsymbol{x}\|_2+\max_{\substack{\boldsymbol{x}\in T_0\\ \|\boldsymbol{x}\|_2=1}}\|\boldsymbol{Y}\boldsymbol{x}\|_2 .
$$
右端对 $S_0$、$T_0$ 取下确界即得 $\sigma_p(\boldsymbol{X})+\sigma_q(\boldsymbol{Y})$，式（8.21）成立。将 $\boldsymbol{Y}$ 换为 $\boldsymbol{E}$、$\boldsymbol{X}$ 换为 $\boldsymbol{X}+\boldsymbol{E}$（并取 $p=i$、$q=1$）得 $\sigma_i(\boldsymbol{X})\leqslant\sigma_i(\boldsymbol{X}+\boldsymbol{E})+\|\boldsymbol{E}\|_2$；交换两者角色得反向不等式，相加即得 Lipschitz 估计。

□

**定理 8.19（Eckart–Young 低秩逼近定理）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\operatorname{rank}(\boldsymbol{A})=r$，$\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$，$0\leqslant k<r$。令
$$
\boldsymbol{A}_k=\sum_{i=1}^{k}\sigma_i\boldsymbol{u}_i\boldsymbol{v}_i^\top=\boldsymbol{U}\boldsymbol{\Sigma}_k\boldsymbol{V}^\top, \tag{8.22}
$$
其中 $\boldsymbol{\Sigma}_k$ 由 $\boldsymbol{\Sigma}$ 将第 $k+1$ 个及其后的对角元置零得到。则 $\operatorname{rank}(\boldsymbol{A}_k)=k$，且

（1）在 Frobenius 范数下
$$
\min_{\operatorname{rank}(\boldsymbol{B})\leqslant k}\|\boldsymbol{A}-\boldsymbol{B}\|_F=\|\boldsymbol{A}-\boldsymbol{A}_k\|_F=\Bigl(\sum_{i=k+1}^{r}\sigma_i^2\Bigr)^{1/2}; \tag{8.23}
$$

（2）在谱范数下
$$
\min_{\operatorname{rank}(\boldsymbol{B})\leqslant k}\|\boldsymbol{A}-\boldsymbol{B}\|_2=\|\boldsymbol{A}-\boldsymbol{A}_k\|_2=\sigma_{k+1}. \tag{8.24}
$$
两种范数下的最小值点均可取为 $\boldsymbol{B}=\boldsymbol{A}_k$；在 Frobenius 范数下，当 $\sigma_k>\sigma_{k+1}$ 时该最小值点唯一。

**证明**

（1）先验证 $\boldsymbol{A}_k$ 达到式（8.23）右端。因 $\boldsymbol{A}-\boldsymbol{A}_k=\sum_{i=k+1}^{r}\sigma_i\boldsymbol{u}_i\boldsymbol{v}_i^\top$，而秩一矩阵族 $\{\boldsymbol{u}_i\boldsymbol{v}_i^\top\}$ 在 Frobenius 内积 $\langle\boldsymbol{P},\boldsymbol{Q}\rangle=\operatorname{tr}(\boldsymbol{P}^\top\boldsymbol{Q})$ 下两两正交（$\langle\boldsymbol{u}_i\boldsymbol{v}_i^\top,\boldsymbol{u}_j\boldsymbol{v}_j^\top\rangle=(\boldsymbol{u}_i^\top\boldsymbol{u}_j)(\boldsymbol{v}_i^\top\boldsymbol{v}_j)=\delta_{ij}$）且范数为 $1$，故
$$
\|\boldsymbol{A}-\boldsymbol{A}_k\|_F^2=\sum_{i=k+1}^{r}\sigma_i^2.
$$
又 $\sigma_i>0\ (i\leqslant k)$ 保证 $\operatorname{rank}(\boldsymbol{A}_k)=k$。

再证下界。设 $\boldsymbol{B}$ 满足 $\operatorname{rank}(\boldsymbol{B})\leqslant k$，记 $\boldsymbol{E}=\boldsymbol{A}-\boldsymbol{B}$，则 $\boldsymbol{A}=\boldsymbol{E}+\boldsymbol{B}$，且 $\sigma_{k+1}(\boldsymbol{B})=0$。在式（8.21）中取 $p=j$、$q=k+1$ 得
$$
\sigma_{j+k}(\boldsymbol{A})\leqslant\sigma_j(\boldsymbol{E})+\sigma_{k+1}(\boldsymbol{B})=\sigma_j(\boldsymbol{E}),\qquad j=1,\dots,\min\{m,n\}-k.
$$
两边平方并对 $j=1,\dots,r-k$ 求和（注意 $j+k\leqslant r\leqslant\min\{m,n\}$），
$$
\sum_{i=k+1}^{r}\sigma_i^2(\boldsymbol{A})=\sum_{j=1}^{r-k}\sigma_{j+k}^2(\boldsymbol{A})\leqslant\sum_{j=1}^{r-k}\sigma_j^2(\boldsymbol{E})\leqslant\sum_{j}\sigma_j^2(\boldsymbol{E})=\|\boldsymbol{E}\|_F^2=\|\boldsymbol{A}-\boldsymbol{B}\|_F^2,
$$
即任意秩不超过 $k$ 的逼近误差均不小于式（8.23）右端，最优性得证。

（2）$\|\boldsymbol{A}-\boldsymbol{A}_k\|_2=\sigma_1(\boldsymbol{A}-\boldsymbol{A}_k)=\sigma_{k+1}(\boldsymbol{A})$。对任意秩不超过 $k$ 的 $\boldsymbol{B}$，在式（8.21）中取 $p=1$、$q=k+1$，得
$$
\sigma_{k+1}(\boldsymbol{A})=\sigma_{1+k}(\boldsymbol{E}+\boldsymbol{B})\leqslant\sigma_1(\boldsymbol{E})+\sigma_{k+1}(\boldsymbol{B})=\|\boldsymbol{E}\|_2=\|\boldsymbol{A}-\boldsymbol{B}\|_2,
$$
故下界亦成立。唯一性（Frobenius 情形）：若 $\boldsymbol{B}$ 亦为 Frobenius 意义下的最小值点，则等号必须在 Weyl 不等式与求和不等式中处处成立，可推出 $\boldsymbol{B}$ 与 $\boldsymbol{A}_k$ 在 $\operatorname{span}\{\boldsymbol{v}_1,\dots,\boldsymbol{v}_k\}$ 与 $\operatorname{span}\{\boldsymbol{u}_1,\dots,\boldsymbol{u}_k\}$ 上的作用一致；当 $\sigma_k>\sigma_{k+1}$ 时这两个子空间由 $\boldsymbol{A}$ 唯一确定，故 $\boldsymbol{B}=\boldsymbol{A}_k$。

□

定理 8.19 的证明思路可概括为一句话：秩不超过 $k$ 的矩阵 $\boldsymbol{B}$ 的零空间维数至少为 $n-k$，它必然与 $\boldsymbol{A}$ 的前 $k+1$ 个右奇异向量张成的子空间有非零交，于是存在被 $\boldsymbol{B}$ 湮灭而仍被 $\boldsymbol{A}$ 显著放大的方向，逼近误差无法小于 $\sigma_{k+1}$。这一直观的子空间相交论证与上述 Weyl 不等式论证在本质上等价。

### 8.3.5 Moore–Penrose 伪逆

**定义 8.20（Moore–Penrose 伪逆）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\operatorname{rank}(\boldsymbol{A})=r$，$\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$。令 $\boldsymbol{\Sigma}^+\in\mathbb{R}^{n\times m}$ 为把 $\boldsymbol{\Sigma}$ 中每个非零奇异值 $\sigma_i$ 替换为 $1/\sigma_i$、零保持不变后再转置所得的矩阵，定义
$$
\boldsymbol{A}^+=\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top=\sum_{i=1}^{r}\frac{1}{\sigma_i}\boldsymbol{v}_i\boldsymbol{u}_i^\top. \tag{8.25}
$$
称 $\boldsymbol{A}^+$ 为 $\boldsymbol{A}$ 的 Moore–Penrose 伪逆。等价地，$\boldsymbol{A}^+$ 是满足下列四个 Penrose 方程的唯一矩阵：
$$
\boldsymbol{A}\boldsymbol{A}^+\boldsymbol{A}=\boldsymbol{A},\qquad \boldsymbol{A}^+\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{A}^+,\qquad (\boldsymbol{A}\boldsymbol{A}^+)^\top=\boldsymbol{A}\boldsymbol{A}^+,\qquad (\boldsymbol{A}^+\boldsymbol{A})^\top=\boldsymbol{A}^+\boldsymbol{A}. \tag{8.26}
$$

**定理 8.21（伪逆的存在唯一性与基本性质）**　式（8.25）定义的 $\boldsymbol{A}^+$ 存在、唯一，并具有下列性质：

（1）$\operatorname{rank}(\boldsymbol{A}^+)=\operatorname{rank}(\boldsymbol{A})=r$，$(\boldsymbol{A}^+)^+=\boldsymbol{A}$，$(\boldsymbol{A}^\top)^+=(\boldsymbol{A}^+)^\top$；

（2）若 $\operatorname{rank}(\boldsymbol{A})=n$（列满秩），则 $\boldsymbol{A}^+=(\boldsymbol{A}^\top\boldsymbol{A})^{-1}\boldsymbol{A}^\top$，且 $\boldsymbol{A}^+\boldsymbol{A}=\boldsymbol{I}_n$；

（3）若 $\operatorname{rank}(\boldsymbol{A})=m$（行满秩），则 $\boldsymbol{A}^+=\boldsymbol{A}^\top(\boldsymbol{A}\boldsymbol{A}^\top)^{-1}$，且 $\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{I}_m$；

（4）$\boldsymbol{P}_{\mathcal{R}}=\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{U}_r\boldsymbol{U}_r^\top$ 为到列空间 $\mathcal{R}(\boldsymbol{A})$ 的正交投影，$\boldsymbol{P}_{\mathcal{R}^\top}=\boldsymbol{A}^+\boldsymbol{A}=\boldsymbol{V}_r\boldsymbol{V}_r^\top$ 为到行空间 $\mathcal{R}(\boldsymbol{A}^\top)$ 的正交投影；

（5）$\|\boldsymbol{A}^+\|_2=1/\sigma_r$；$\boldsymbol{A}$ 可逆时 $\boldsymbol{A}^+=\boldsymbol{A}^{-1}$，且 $\operatorname{cond}_2(\boldsymbol{A})=\sigma_1\|\boldsymbol{A}^+\|_2$。

**证明**

先证式（8.25）满足式（8.26）。因 $\boldsymbol{\Sigma}\boldsymbol{\Sigma}^+\boldsymbol{\Sigma}=\boldsymbol{\Sigma}$ 与 $\boldsymbol{\Sigma}^+\boldsymbol{\Sigma}\boldsymbol{\Sigma}^+=\boldsymbol{\Sigma}^+$ 对（可能非方的）对角矩阵可逐元素检验（非零元处 $\sigma\cdot\sigma^{-1}\cdot\sigma=\sigma$，零元处 $0\cdot0\cdot0=0$），且 $\boldsymbol{\Sigma}\boldsymbol{\Sigma}^+$、$\boldsymbol{\Sigma}^+\boldsymbol{\Sigma}$ 均为对角矩阵因而对称，代入 $\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$、$\boldsymbol{A}^+=\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top$ 并利用 $\boldsymbol{U},\boldsymbol{V}$ 的正交性，四个 Penrose 方程逐一成立。同时可得
$$
\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top=\boldsymbol{U}_r\boldsymbol{U}_r^\top,\qquad
\boldsymbol{A}^+\boldsymbol{A}=\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{\Sigma}\boldsymbol{V}^\top=\boldsymbol{V}_r\boldsymbol{V}_r^\top,
$$
其中 $\boldsymbol{U}_r=[\boldsymbol{u}_1,\dots,\boldsymbol{u}_r]$，$\boldsymbol{V}_r=[\boldsymbol{v}_1,\dots,\boldsymbol{v}_r]$。二者均为对称幂等矩阵，即正交投影算子，其值域分别为 $\operatorname{span}\{\boldsymbol{u}_1,\dots,\boldsymbol{u}_r\}=\mathcal{R}(\boldsymbol{A})$ 与 $\operatorname{span}\{\boldsymbol{v}_1,\dots,\boldsymbol{v}_r\}=\mathcal{R}(\boldsymbol{A}^\top)$，此即（4）。

再证唯一性。设 $\boldsymbol{G}\in\mathbb{R}^{n\times m}$ 亦满足式（8.26）。由 $\boldsymbol{A}\boldsymbol{G}\boldsymbol{A}=\boldsymbol{A}$ 知 $\mathcal{R}(\boldsymbol{A}\boldsymbol{G})\subseteq\mathcal{R}(\boldsymbol{A})$ 且 $\mathcal{R}(\boldsymbol{A})=\mathcal{R}((\boldsymbol{A}\boldsymbol{G})\boldsymbol{A})\subseteq\mathcal{R}(\boldsymbol{A}\boldsymbol{G})$，故 $\mathcal{R}(\boldsymbol{A}\boldsymbol{G})=\mathcal{R}(\boldsymbol{A})$；又 $(\boldsymbol{A}\boldsymbol{G})^2=\boldsymbol{A}(\boldsymbol{G}\boldsymbol{A})\boldsymbol{G}=\boldsymbol{A}\boldsymbol{G}$ 且 $\boldsymbol{A}\boldsymbol{G}$ 对称，因此 $\boldsymbol{A}\boldsymbol{G}$ 是到 $\mathcal{R}(\boldsymbol{A})$ 的正交投影。正交投影由值域唯一确定，故 $\boldsymbol{A}\boldsymbol{G}=\boldsymbol{A}\boldsymbol{A}^+$。同理，$\boldsymbol{G}\boldsymbol{A}$ 对称幂等，且对式 $\boldsymbol{A}\boldsymbol{G}\boldsymbol{A}=\boldsymbol{A}$ 取转置得 $\boldsymbol{A}^\top\boldsymbol{G}^\top\boldsymbol{A}^\top=\boldsymbol{A}^\top$，从而
$$
\mathcal{R}(\boldsymbol{A}^\top)\subseteq\mathcal{R}(\boldsymbol{A}^\top\boldsymbol{G}^\top)=\mathcal{R}\bigl((\boldsymbol{G}\boldsymbol{A})^\top\bigr)=\mathcal{R}(\boldsymbol{G}\boldsymbol{A})\subseteq\mathcal{R}(\boldsymbol{A}^\top),
$$
即 $\mathcal{R}(\boldsymbol{G}\boldsymbol{A})=\mathcal{R}(\boldsymbol{A}^\top)$，于是 $\boldsymbol{G}\boldsymbol{A}=\boldsymbol{A}^+\boldsymbol{A}$。最后，
$$
\boldsymbol{G}=\boldsymbol{G}\boldsymbol{A}\boldsymbol{G}=(\boldsymbol{A}^+\boldsymbol{A})\boldsymbol{G}=\boldsymbol{A}^+(\boldsymbol{A}\boldsymbol{G})=\boldsymbol{A}^+(\boldsymbol{A}\boldsymbol{A}^+)=(\boldsymbol{A}^+\boldsymbol{A})\boldsymbol{A}^+=\boldsymbol{A}^+\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{A}^+,
$$
唯一性得证。

（1）由式（8.25）的秩一展开式立即得到 $\operatorname{rank}(\boldsymbol{A}^+)=r$；$\boldsymbol{A}^+$ 的非零奇异值为 $1/\sigma_r\leqslant\cdots\leqslant1/\sigma_1$，其左、右奇异向量与 $\boldsymbol{A}$ 互换，故 $(\boldsymbol{A}^+)^+=\boldsymbol{A}$。又 $\boldsymbol{\Sigma}^\top=(\boldsymbol{\Sigma}^+)^+$ 且转置不改变奇异值结构，故 $(\boldsymbol{A}^\top)^+=(\boldsymbol{V}\boldsymbol{\Sigma}^\top\boldsymbol{U}^\top)^+=\boldsymbol{U}(\boldsymbol{\Sigma}^\top)^+\boldsymbol{V}^\top=(\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top)^\top=(\boldsymbol{A}^+)^\top$。（2）列满秩时 $\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma}$ 为 $n$ 阶正定对角阵，$\boldsymbol{A}^\top\boldsymbol{A}=\boldsymbol{V}(\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma})\boldsymbol{V}^\top$，故
$$
(\boldsymbol{A}^\top\boldsymbol{A})^{-1}\boldsymbol{A}^\top=\boldsymbol{V}(\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma})^{-1}\boldsymbol{V}^\top\boldsymbol{V}\boldsymbol{\Sigma}^\top\boldsymbol{U}^\top=\boldsymbol{V}(\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma})^{-1}\boldsymbol{\Sigma}^\top\boldsymbol{U}^\top=\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top=\boldsymbol{A}^+,
$$
最后一步用到 $(\boldsymbol{\Sigma}^\top\boldsymbol{\Sigma})^{-1}\boldsymbol{\Sigma}^\top=\boldsymbol{\Sigma}^+$；此时 $\boldsymbol{A}^+\boldsymbol{A}=\boldsymbol{V}_n\boldsymbol{V}_n^\top=\boldsymbol{I}_n$。（3）行满秩时同理，$\boldsymbol{A}\boldsymbol{A}^\top=\boldsymbol{U}(\boldsymbol{\Sigma}\boldsymbol{\Sigma}^\top)\boldsymbol{U}^\top$ 可逆，$\boldsymbol{A}^\top(\boldsymbol{A}\boldsymbol{A}^\top)^{-1}=\boldsymbol{V}\boldsymbol{\Sigma}^\top(\boldsymbol{\Sigma}\boldsymbol{\Sigma}^\top)^{-1}\boldsymbol{U}^\top=\boldsymbol{V}\boldsymbol{\Sigma}^+\boldsymbol{U}^\top$。（5）由（1）的奇异值刻画与 $\operatorname{cond}_2(\boldsymbol{A})=\sigma_1/\sigma_n$ 得到。

□

**推论 8.22（最小二乘问题的最小范数解）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\boldsymbol{b}\in\mathbb{R}^m$。则最小二乘问题
$$
\min_{\boldsymbol{x}\in\mathbb{R}^n}\|\boldsymbol{A}\boldsymbol{x}-\boldsymbol{b}\|_2^2 \tag{8.27}
$$
的解集为 $\boldsymbol{x}^*+\mathcal{N}(\boldsymbol{A})$，其中
$$
\boldsymbol{x}^*=\boldsymbol{A}^+\boldsymbol{b} \tag{8.28}
$$
是解集中欧氏范数最小的唯一元素；残差向量为 $\boldsymbol{r}=\boldsymbol{b}-\boldsymbol{A}\boldsymbol{x}^*=(\boldsymbol{I}_m-\boldsymbol{A}\boldsymbol{A}^+)\boldsymbol{b}$，恰为 $\boldsymbol{b}$ 到左零空间 $\mathcal{N}(\boldsymbol{A}^\top)$ 的正交投影，且 $\boldsymbol{A}^\top\boldsymbol{r}=\boldsymbol{0}$。

**证明**

将 $\boldsymbol{b}$ 分解为 $\boldsymbol{b}=\boldsymbol{A}\boldsymbol{A}^+\boldsymbol{b}+(\boldsymbol{I}-\boldsymbol{A}\boldsymbol{A}^+)\boldsymbol{b}=\boldsymbol{b}_{\parallel}+\boldsymbol{b}_{\perp}$，其中 $\boldsymbol{b}_{\parallel}\in\mathcal{R}(\boldsymbol{A})$，$\boldsymbol{b}_{\perp}\in\mathcal{N}(\boldsymbol{A}^\top)$，两者正交。对任意 $\boldsymbol{x}$，$\boldsymbol{A}\boldsymbol{x}\in\mathcal{R}(\boldsymbol{A})$，故
$$
\|\boldsymbol{A}\boldsymbol{x}-\boldsymbol{b}\|_2^2=\|\boldsymbol{A}\boldsymbol{x}-\boldsymbol{b}_{\parallel}\|_2^2+\|\boldsymbol{b}_{\perp}\|_2^2\geqslant\|\boldsymbol{b}_{\perp}\|_2^2,
$$
等号成立当且仅当 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}_{\parallel}$。由 $\boldsymbol{A}\boldsymbol{A}^+\boldsymbol{b}=\boldsymbol{b}_{\parallel}$ 知 $\boldsymbol{x}=\boldsymbol{A}^+\boldsymbol{b}$ 是一个解，通解为 $\boldsymbol{A}^+\boldsymbol{b}+\mathcal{N}(\boldsymbol{A})$。又对任意 $\boldsymbol{z}\in\mathcal{N}(\boldsymbol{A})$，由定理 8.21（4），$\boldsymbol{A}^+\boldsymbol{b}=\boldsymbol{V}_r\boldsymbol{V}_r^\top(\boldsymbol{A}^+\boldsymbol{b})\in\mathcal{R}(\boldsymbol{A}^\top)=\mathcal{N}(\boldsymbol{A})^\perp$，故 $\boldsymbol{A}^+\boldsymbol{b}$ 与 $\boldsymbol{z}$ 正交，$\|\boldsymbol{A}^+\boldsymbol{b}+\boldsymbol{z}\|_2^2=\|\boldsymbol{A}^+\boldsymbol{b}\|_2^2+\|\boldsymbol{z}\|_2^2$ 在 $\boldsymbol{z}=\boldsymbol{0}$ 时最小。残差与 $\boldsymbol{A}^\top\boldsymbol{r}=\boldsymbol{A}^\top(\boldsymbol{I}-\boldsymbol{A}\boldsymbol{A}^+)\boldsymbol{b}=(\boldsymbol{A}^\top-\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{A}^+)\boldsymbol{b}=\boldsymbol{0}$（因 $\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{A}^+=\boldsymbol{A}^\top$，即式（8.26）第一式的转置）。

□

推论 8.22 表明，$\boldsymbol{A}^\top\boldsymbol{A}\boldsymbol{x}=\boldsymbol{A}^\top\boldsymbol{b}$（正规方程）的解集与式（8.27）的解集一致，但在秩亏时正规方程有无穷多解，而伪逆从中挑出唯一的最小范数解，这正是组合优化中「最小换手率解」或「最小名义暴露解」的数学表述。

**例 8.5**　设
$$
\boldsymbol{A}=\begin{bmatrix}1&1\\ 1&2\\ 1&3\end{bmatrix},\qquad \boldsymbol{b}=\begin{bmatrix}1\\ 2\\ 2\end{bmatrix}.
$$
求 $\boldsymbol{A}^+$，并求最小二乘问题 $\min\|\boldsymbol{A}\boldsymbol{x}-\boldsymbol{b}\|_2^2$ 的解、残差平方和，并计算 $\operatorname{cond}_2(\boldsymbol{A})$ 与 $\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})$。

**解**　$\boldsymbol{A}$ 列满秩（两列不成比例），故由定理 8.21（2），$\boldsymbol{A}^+=(\boldsymbol{A}^\top\boldsymbol{A})^{-1}\boldsymbol{A}^\top$。计算
$$
\boldsymbol{A}^\top\boldsymbol{A}=\begin{bmatrix}1&1&1\\ 1&2&3\end{bmatrix}\begin{bmatrix}1&1\\ 1&2\\ 1&3\end{bmatrix}=\begin{bmatrix}3&6\\ 6&14\end{bmatrix},\qquad
\boldsymbol{A}^\top\boldsymbol{b}=\begin{bmatrix}1+2+2\\ 1+4+6\end{bmatrix}=\begin{bmatrix}5\\ 11\end{bmatrix}.
$$
$\det(\boldsymbol{A}^\top\boldsymbol{A})=42-36=6$，故
$$
(\boldsymbol{A}^\top\boldsymbol{A})^{-1}=\frac{1}{6}\begin{bmatrix}14&-6\\ -6&3\end{bmatrix}=\begin{bmatrix}\dfrac{7}{3}&-1\\[1mm] -1&\dfrac{1}{2}\end{bmatrix}.
$$
于是
$$
\boldsymbol{A}^+=(\boldsymbol{A}^\top\boldsymbol{A})^{-1}\boldsymbol{A}^\top
=\begin{bmatrix}\dfrac{7}{3}&-1\\[1mm] -1&\dfrac{1}{2}\end{bmatrix}
\begin{bmatrix}1&1&1\\ 1&2&3\end{bmatrix}
=\begin{bmatrix}\dfrac{4}{3}&\dfrac{1}{3}&-\dfrac{2}{3}\\[2mm] -\dfrac{1}{2}&0&\dfrac{1}{2}\end{bmatrix}.
$$
（第一行：$\frac{7}{3}-1=\frac{4}{3}$，$\frac{7}{3}-2=\frac{1}{3}$，$\frac{7}{3}-3=-\frac{2}{3}$；第二行：$-1+\frac{1}{2}=-\frac{1}{2}$，$-1+1=0$，$-1+\frac{3}{2}=\frac{1}{2}$。）

最小二乘解为
$$
\boldsymbol{x}^*=\boldsymbol{A}^+\boldsymbol{b}=\begin{bmatrix}\dfrac{4}{3}\times1+\dfrac{1}{3}\times2-\dfrac{2}{3}\times2\\[2mm] -\dfrac{1}{2}\times1+0\times2+\dfrac{1}{2}\times2\end{bmatrix}
=\begin{bmatrix}\dfrac{4}{3}+\dfrac{2}{3}-\dfrac{4}{3}\\[2mm] -\dfrac{1}{2}+1\end{bmatrix}
=\begin{bmatrix}\dfrac{2}{3}\\[1mm] \dfrac{1}{2}\end{bmatrix}.
$$
这对应线性回归 $y=\beta_0+\beta_1 t$ 的估计 $\hat{\beta}_0=2/3$，$\hat{\beta}_1=1/2$。拟合值为 $(7/6,\ 5/3,\ 13/6)^\top$，残差为
$$
\boldsymbol{r}=\boldsymbol{b}-\boldsymbol{A}\boldsymbol{x}^*=\begin{bmatrix}1-\dfrac{7}{6}\\[1mm] 2-\dfrac{5}{3}\\[1mm] 2-\dfrac{13}{6}\end{bmatrix}=\begin{bmatrix}-\dfrac{1}{6}\\[1mm] \dfrac{1}{3}\\[1mm] -\dfrac{1}{6}\end{bmatrix},
$$
残差平方和 $\boldsymbol{r}^\top\boldsymbol{r}=\frac{1}{36}+\frac{1}{9}+\frac{1}{36}=\frac{6}{36}=\frac{1}{6}$。验证正交性：$\boldsymbol{A}^\top\boldsymbol{r}=(-\frac{1}{6}+\frac{1}{3}-\frac{1}{6},\ -\frac{1}{6}+\frac{2}{3}-\frac{3}{6})^\top=(0,0)^\top$，符合推论 8.22。

条件数：$\boldsymbol{A}^\top\boldsymbol{A}$ 的特征多项式为 $\lambda^2-17\lambda+6$，特征值 $\lambda_{1,2}=\frac{17\pm\sqrt{289-24}}{2}=\frac{17\pm\sqrt{265}}{2}$，即 $\lambda_1\approx16.6394$，$\lambda_2\approx0.3606$。故 $\sigma_1=\sqrt{\lambda_1}\approx4.0791$，$\sigma_2=\sqrt{\lambda_2}\approx0.6005$，
$$
\operatorname{cond}_2(\boldsymbol{A})=\frac{\sigma_1}{\sigma_2}\approx6.79,\qquad
\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})=\frac{\lambda_1}{\lambda_2}\approx46.1\approx(6.79)^2,
$$
与定理 8.31 的结论 $\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})=\operatorname{cond}_2(\boldsymbol{A})^2$ 完全一致。本例条件数很小，正规方程法与 $QR$ 法的差别可以忽略；但在多因子模型中 $\operatorname{cond}_2(\boldsymbol{A})$ 常达 $10^4$ 量级，此时正规方程法的条件数已达 $10^8$，误差将被放大到不可接受的程度。

## 8.4 主成分分析

### 8.4.1 由协方差矩阵的谱分解推导主成分

设 $\boldsymbol{x}_1,\dots,\boldsymbol{x}_T\in\mathbb{R}^n$ 为 $n$ 个资产在 $T$ 个时点上的收益率观测，样本均值 $\bar{\boldsymbol{x}}=\frac{1}{T}\sum_{t=1}^{T}\boldsymbol{x}_t$。构造列中心化数据矩阵与样本协方差矩阵
$$
\boldsymbol{X}=\begin{bmatrix}(\boldsymbol{x}_1-\bar{\boldsymbol{x}})^\top\\ \vdots\\ (\boldsymbol{x}_T-\bar{\boldsymbol{x}})^\top\end{bmatrix}\in\mathbb{R}^{T\times n},\qquad
\boldsymbol{S}=\frac{1}{T-1}\boldsymbol{X}^\top\boldsymbol{X}\in\mathbb{R}^{n\times n}. \tag{8.29}
$$
$\boldsymbol{X}$ 的列和为零，$\boldsymbol{S}$ 对称半正定：对任意 $\boldsymbol{w}$，$\boldsymbol{w}^\top\boldsymbol{S}\boldsymbol{w}=\frac{1}{T-1}\|\boldsymbol{X}\boldsymbol{w}\|_2^2\geqslant0$。当 $T>n$ 且 $\boldsymbol{X}$ 列满秩时 $\boldsymbol{S}\succ\boldsymbol{0}$。

主成分分析的目标是在原变量的所有单位长度线性组合中，寻找方差最大的方向，继而寻找与之正交的次优方向，如此递推。

**定义 8.23（主成分）**　第 $j$ 个主成分定义为随机向量 $\boldsymbol{x}$ 的线性组合 $y_j=\boldsymbol{w}_j^\top\boldsymbol{x}$，其权重向量由如下逐次约束极值问题确定：
$$
\boldsymbol{w}_1=\arg\max_{\|\boldsymbol{w}\|_2=1}\boldsymbol{w}^\top\boldsymbol{S}\boldsymbol{w},\qquad
\boldsymbol{w}_j=\arg\max_{\substack{\|\boldsymbol{w}\|_2=1\\ \boldsymbol{w}^\top\boldsymbol{w}_i=0,\ i<j}}\boldsymbol{w}^\top\boldsymbol{S}\boldsymbol{w},\qquad j=2,\dots,n. \tag{8.30}
$$
称 $\boldsymbol{w}_j$ 为第 $j$ 个主成分载荷（loading），$\boldsymbol{y}=\boldsymbol{X}\boldsymbol{w}_j\in\mathbb{R}^T$ 为对应的得分（score）序列。

**定理 8.24（主成分的极值刻画）**　设 $\boldsymbol{S}$ 的特征值为 $\lambda_1\geqslant\lambda_2\geqslant\cdots\geqslant\lambda_n\geqslant0$，对应的标准正交特征向量为 $\boldsymbol{w}_1,\dots,\boldsymbol{w}_n$。则：

（1）式（8.30）的第 $j$ 个问题的最大值恰为 $\lambda_j$，且 $\boldsymbol{w}_j$ 为一个极大值点；若 $\lambda_j$ 为单重特征值，则极大值点在相差符号的意义下唯一；

（2）各主成分两两不相关，且
$$
\operatorname{Var}(y_j)=\boldsymbol{w}_j^\top\boldsymbol{S}\boldsymbol{w}_j=\lambda_j,\qquad
\operatorname{Cov}(y_i,y_j)=\boldsymbol{w}_i^\top\boldsymbol{S}\boldsymbol{w}_j=\lambda_j\boldsymbol{w}_i^\top\boldsymbol{w}_j=0\quad(i\neq j); \tag{8.31}
$$

（3）总方差守恒：$\sum_{j=1}^{n}\lambda_j=\operatorname{tr}\boldsymbol{S}=\sum_{i=1}^{n}s_{ii}$，即主成分变换不改变数据的总方差，只是把它重新分配到互不相关的方向上；

（4）若记 $\boldsymbol{W}=[\boldsymbol{w}_1,\dots,\boldsymbol{w}_n]$，则得分矩阵 $\boldsymbol{Y}=\boldsymbol{X}\boldsymbol{W}$ 的样本协方差矩阵为对角阵 $\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。

**证明**

（1）设 $\boldsymbol{w}=\sum_{i=1}^{n}c_i\boldsymbol{w}_i$，$\|\boldsymbol{w}\|_2=1$ 即 $\sum c_i^2=1$。则
$$
\boldsymbol{w}^\top\boldsymbol{S}\boldsymbol{w}=\sum_{i=1}^{n}\lambda_ic_i^2\leqslant\lambda_1\sum_{i=1}^{n}c_i^2=\lambda_1,
$$
取 $c_1=1$ 时等号成立，故最大值为 $\lambda_1$，$\boldsymbol{w}_1$ 为极大值点。对 $j\geqslant2$，约束 $\boldsymbol{w}^\top\boldsymbol{w}_i=0\ (i<j)$ 等价于 $c_1=\cdots=c_{j-1}=0$，于是 $\boldsymbol{w}^\top\boldsymbol{S}\boldsymbol{w}=\sum_{i\geqslant j}\lambda_ic_i^2\leqslant\lambda_j\sum_{i\geqslant j}c_i^2=\lambda_j$，取 $c_j=1$ 达等号。这一结论亦为引理 8.17 的直接推论。若 $\lambda_j$ 单重，则等号要求 $c_j^2=1$，故极大值点为 $\pm\boldsymbol{w}_j$。（2）由 $\boldsymbol{S}\boldsymbol{w}_j=\lambda_j\boldsymbol{w}_j$ 与 $\boldsymbol{w}_i^\top\boldsymbol{w}_j=\delta_{ij}$ 直接得到。（3）$\operatorname{tr}\boldsymbol{S}=\operatorname{tr}(\boldsymbol{W}\boldsymbol{\Lambda}\boldsymbol{W}^\top)=\operatorname{tr}(\boldsymbol{\Lambda}\boldsymbol{W}^\top\boldsymbol{W})=\sum\lambda_j$。（4）$\frac{1}{T-1}\boldsymbol{Y}^\top\boldsymbol{Y}=\frac{1}{T-1}\boldsymbol{W}^\top\boldsymbol{X}^\top\boldsymbol{X}\boldsymbol{W}=\boldsymbol{W}^\top\boldsymbol{S}\boldsymbol{W}=\boldsymbol{\Lambda}$。

□

**定义 8.25（方差解释率）**　第 $j$ 个主成分的方差贡献率为 $\lambda_j/\operatorname{tr}\boldsymbol{S}$；前 $k$ 个主成分的累积方差解释率定义为
$$
\eta_k=\frac{\sum_{j=1}^{k}\lambda_j}{\sum_{j=1}^{n}\lambda_j}=\frac{\sum_{j=1}^{k}\lambda_j}{\operatorname{tr}\boldsymbol{S}},\qquad 0<\eta_1\leqslant\eta_2\leqslant\cdots\leqslant\eta_n=1. \tag{8.32}
$$
在降维应用中，通常选取使 $\eta_k$ 首次超过预设阈值（如 $0.90$ 或 $0.95$）的最小 $k$ 作为保留的主成分个数。由定理 8.24（3），$1-\eta_k$ 恰为丢弃后 $n-k$ 个方向所损失的方差比例。

### 8.4.2 PCA 与 SVD 的精确关系

**定理 8.26（PCA 与 SVD 的精确关系）**　设 $\boldsymbol{X}\in\mathbb{R}^{T\times n}$ 为列中心化数据矩阵，$\operatorname{rank}(\boldsymbol{X})=r$，其奇异值分解为 $\boldsymbol{X}=\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top$，$\boldsymbol{D}$ 的非零对角元为 $d_1\geqslant d_2\geqslant\cdots\geqslant d_r>0$。则：

（1）协方差矩阵的谱分解为
$$
\boldsymbol{S}=\frac{1}{T-1}\boldsymbol{X}^\top\boldsymbol{X}=\boldsymbol{V}\,\frac{\boldsymbol{D}^\top\boldsymbol{D}}{T-1}\,\boldsymbol{V}^\top, \tag{8.33}
$$
即 PCA 的载荷向量 $\boldsymbol{w}_j$ 恰为 $\boldsymbol{X}$ 的第 $j$ 个右奇异向量 $\boldsymbol{v}_j$，特征值 $\lambda_j=d_j^2/(T-1)$（$j\leqslant r$），$\lambda_{r+1}=\cdots=\lambda_n=0$；

（2）得分矩阵 $\boldsymbol{Y}=\boldsymbol{X}\boldsymbol{V}_r=\boldsymbol{U}_r\boldsymbol{D}_r$，其中下标 $r$ 表示取前 $r$ 列（块）；

（3）$\boldsymbol{X}\boldsymbol{X}^\top=(T-1)\boldsymbol{U}\boldsymbol{D}\boldsymbol{D}^\top\boldsymbol{U}^\top$，故 $\boldsymbol{U}$ 的列是 $T\times T$ 矩阵 $\boldsymbol{X}\boldsymbol{X}^\top$ 的特征向量；当 $T\gg n$ 时计算式（8.33）的 $n\times n$ 特征分解远比计算 $\boldsymbol{X}\boldsymbol{X}^\top$ 的特征分解经济；

（4）取前 $k$ 个主成分的降维重构
$$
\hat{\boldsymbol{X}}_k=\boldsymbol{X}\boldsymbol{V}_k\boldsymbol{V}_k^\top=\sum_{i=1}^{k}d_i\boldsymbol{u}_i\boldsymbol{v}_i^\top \tag{8.34}
$$
在所有秩不超过 $k$ 的矩阵中是 $\boldsymbol{X}$ 的最佳逼近（定理 8.19），其重构误差满足
$$
\|\boldsymbol{X}-\hat{\boldsymbol{X}}_k\|_F^2=\sum_{i=k+1}^{r}d_i^2=(T-1)\sum_{i=k+1}^{r}\lambda_i=(T-1)\operatorname{tr}\boldsymbol{S}\,(1-\eta_k),
$$
即 PCA 降维在 Frobenius 范数意义下最小化数据的信息损失，且损失比例精确等于 $1-\eta_k$。

**证明**

（1）$\boldsymbol{X}^\top\boldsymbol{X}=(\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top)^\top(\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top)=\boldsymbol{V}\boldsymbol{D}^\top\boldsymbol{U}^\top\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top=\boldsymbol{V}(\boldsymbol{D}^\top\boldsymbol{D})\boldsymbol{V}^\top$，由定理 8.12 的唯一性即得 $\lambda_j=d_j^2/(T-1)$ 与 $\boldsymbol{w}_j=\boldsymbol{v}_j$。（2）$\boldsymbol{X}\boldsymbol{V}=\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top\boldsymbol{V}=\boldsymbol{U}\boldsymbol{D}$。（3）$\boldsymbol{X}\boldsymbol{X}^\top=\boldsymbol{U}\boldsymbol{D}\boldsymbol{V}^\top\boldsymbol{V}\boldsymbol{D}^\top\boldsymbol{U}^\top=\boldsymbol{U}(\boldsymbol{D}\boldsymbol{D}^\top)\boldsymbol{U}^\top$。（4）由式（8.34）与式（8.22）形式一致，定理 8.19（1）给出最优性；误差平方和 $\sum_{i>k}d_i^2=(T-1)\sum_{i>k}\lambda_i$，再除以 $(T-1)\operatorname{tr}\boldsymbol{S}=\sum_i d_i^2$ 即得 $1-\eta_k$。

□

定理 8.26 揭示了一个在实务中极为重要的事实：主成分分析并不需要显式构造并分解协方差矩阵 $\boldsymbol{S}$，直接对中心化数据矩阵 $\boldsymbol{X}$ 施行 SVD 即可同时得到载荷、得分与方差。这不仅节省了计算量（当 $T\gg n$ 时避免形成 $n\times n$ 矩阵），而且在数值上更精确，原因见 8.5.3 节的讨论：形成 $\boldsymbol{X}^\top\boldsymbol{X}$ 会使条件数平方。

**例 8.6**　设四期两资产收益率数据（已中心化）为
$$
\boldsymbol{x}_1=(2,1)^\top,\quad \boldsymbol{x}_2=(-2,-1)^\top,\quad \boldsymbol{x}_3=(1,2)^\top,\quad \boldsymbol{x}_4=(-1,-2)^\top,
$$
求样本协方差矩阵、全部主成分载荷与方差解释率，并写出用第一主成分重构数据的最佳秩一逼近。

**解**　首先验证中心化：$\sum_{t}\boldsymbol{x}_t=(2-2+1-1,\ 1-1+2-2)^\top=(0,0)^\top$，均值确为零。数据矩阵为
$$
\boldsymbol{X}=\begin{bmatrix}2&1\\ -2&-1\\ 1&2\\ -1&-2\end{bmatrix}.
$$
计算 Gram 矩阵
$$
\boldsymbol{X}^\top\boldsymbol{X}=\sum_{t=1}^{4}\boldsymbol{x}_t\boldsymbol{x}_t^\top
=2\begin{bmatrix}4&2\\ 2&1\end{bmatrix}+2\begin{bmatrix}1&2\\ 2&4\end{bmatrix}
=\begin{bmatrix}10&8\\ 8&10\end{bmatrix},
$$
故由式（8.29），$\boldsymbol{S}=\frac{1}{3}\begin{bmatrix}10&8\\ 8&10\end{bmatrix}$。

求特征值：$\det(\boldsymbol{S}-\lambda\boldsymbol{I})=\bigl(\frac{10}{3}-\lambda\bigr)^2-\bigl(\frac{8}{3}\bigr)^2=0$，得 $\lambda_1=\frac{10}{3}+\frac{8}{3}=6$，$\lambda_2=\frac{10}{3}-\frac{8}{3}=\frac{2}{3}$。对应单位特征向量：$\lambda_1$ 满足 $(\frac{10}{3}-6)a+\frac{8}{3}b=0\Rightarrow-\frac{8}{3}a+\frac{8}{3}b=0\Rightarrow a=b$，取 $\boldsymbol{w}_1=\frac{1}{\sqrt{2}}(1,1)^\top$；$\lambda_2$ 给出 $a=-b$，取 $\boldsymbol{w}_2=\frac{1}{\sqrt{2}}(1,-1)^\top$。

方差解释率：$\operatorname{tr}\boldsymbol{S}=\frac{20}{3}=6+\frac{2}{3}$，故
$$
\eta_1=\frac{6}{20/3}=\frac{18}{20}=0.90,\qquad \eta_2=1.
$$
即第一主成分解释了 $90\%$ 的总方差，第二主成分仅解释 $10\%$，降维到一维的信息损失为 $10\%$。

得分序列：$\boldsymbol{y}_1=\boldsymbol{X}\boldsymbol{w}_1=\frac{1}{\sqrt{2}}(3,-3,3,-3)^\top$，其样本方差为 $\frac{1}{3}\cdot4\cdot\frac{9}{2}=\frac{18}{3}=6=\lambda_1$，与定理 8.24（2）一致；$\boldsymbol{y}_2=\boldsymbol{X}\boldsymbol{w}_2=\frac{1}{\sqrt{2}}(1,-1,-1,1)^\top$，方差为 $\frac{1}{3}\cdot4\cdot\frac{1}{2}=\frac{2}{3}=\lambda_2$。两者内积 $\boldsymbol{y}_1^\top\boldsymbol{y}_2=\frac{1}{2}(3\cdot1+(-3)(-1)+3(-1)+(-3)(1))=\frac{1}{2}(3+3-3-3)=0$，验证不相关性。

由式（8.34），最佳秩一逼近为
$$
\hat{\boldsymbol{X}}_1=\boldsymbol{y}_1\boldsymbol{w}_1^\top=\frac{1}{\sqrt{2}}(3,-3,3,-3)^\top\cdot\frac{1}{\sqrt{2}}(1,1)=\begin{bmatrix}1.5&1.5\\ -1.5&-1.5\\ 1.5&1.5\\ -1.5&-1.5\end{bmatrix}.
$$
重构误差为
$$
\boldsymbol{X}-\hat{\boldsymbol{X}}_1=\begin{bmatrix}0.5&-0.5\\ -0.5&0.5\\ -0.5&0.5\\ 0.5&-0.5\end{bmatrix},\qquad
\|\boldsymbol{X}-\hat{\boldsymbol{X}}_1\|_F^2=8\times(0.5)^2=2.
$$
另一方面，由定理 8.26（4）应有 $(T-1)\lambda_2=3\times\frac{2}{3}=2$，二者完全吻合。相对信息损失为
$$
\frac{\|\boldsymbol{X}-\hat{\boldsymbol{X}}_1\|_F^2}{\|\boldsymbol{X}\|_F^2}=\frac{2}{4+1+4+1+1+4+1+4}=\frac{2}{20}=0.10=1-\eta_1,
$$
再次验证了「丢弃方向的方差占比等于重构误差占比」这一恒等关系。

本例说明：当两资产收益率高度相关时，第一主成分近似于「市场因子」，第二主成分刻画两资产的相对偏离（近似于配对交易的价差信号）。这正是收益率矩阵主成分分析在实务中的标准解释。

## 8.5 条件数与扰动分析

### 8.5.1 条件数的定义

**定义 8.27（矩阵的条件数）**　设 $\|\cdot\|$ 为 $\mathbb{R}^{n\times n}$ 上由向量范数诱导的算子范数，$\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 可逆。定义 $\boldsymbol{A}$ 的条件数为
$$
\operatorname{cond}(\boldsymbol{A})=\kappa(\boldsymbol{A})=\|\boldsymbol{A}\|\,\|\boldsymbol{A}^{-1}\|. \tag{8.35}
$$
若 $\boldsymbol{A}$ 奇异，规定 $\operatorname{cond}(\boldsymbol{A})=\infty$。取 $\|\cdot\|=\|\cdot\|_2$ 时称谱条件数 $\operatorname{cond}_2(\boldsymbol{A})$；取 $\|\cdot\|_1$、$\|\cdot\|_\infty$ 时分别称列和条件数与行和条件数。对非方阵或秩亏矩阵，定义 $\operatorname{cond}_2(\boldsymbol{A})=\sigma_1/\sigma_r$（$r=\operatorname{rank}\boldsymbol{A}$），或约定为 $\infty$。

由定义立即得到三条基本性质：（i）$\operatorname{cond}(\boldsymbol{A})\geqslant1$，因为 $1=\|\boldsymbol{I}\|=\|\boldsymbol{A}^{-1}\boldsymbol{A}\|\leqslant\|\boldsymbol{A}^{-1}\|\|\boldsymbol{A}\|$；（ii）$\operatorname{cond}(\alpha\boldsymbol{A})=\operatorname{cond}(\boldsymbol{A})$（$\alpha\neq0$），即条件数对尺度不变；（iii）$\operatorname{cond}(\boldsymbol{Q})=1$ 对任意正交矩阵 $\boldsymbol{Q}$ 成立，故正交变换是数值上最良性的运算。

**推论 8.28（谱条件数的显式表示）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 可逆，奇异值 $\sigma_1\geqslant\cdots\geqslant\sigma_n>0$。则
$$
\operatorname{cond}_2(\boldsymbol{A})=\frac{\sigma_1}{\sigma_n}=\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}. \tag{8.36}
$$
若 $\boldsymbol{A}$ 对称正定，特征值 $\lambda_1\geqslant\cdots\geqslant\lambda_n>0$，则 $\operatorname{cond}_2(\boldsymbol{A})=\lambda_1/\lambda_n$。

**证明**

由推论 8.15（3），$\|\boldsymbol{A}\|_2=\sigma_1$。又 $\boldsymbol{A}^{-1}=\boldsymbol{V}\boldsymbol{\Sigma}^{-1}\boldsymbol{U}^\top$ 的奇异值为 $1/\sigma_n\geqslant\cdots\geqslant1/\sigma_1$，故 $\|\boldsymbol{A}^{-1}\|_2=1/\sigma_n$，代入式（8.35）即得。对称正定时 $\sigma_i=\lambda_i$（推论 8.15（4））。

□

条件数的直观含义是「输入相对误差被放大为输出相对误差的最大倍数」。工程上常用的经验法则是：若 $\operatorname{cond}_{10}(\boldsymbol{A})\approx10^{p}$，则在求解 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$ 时最多可能损失约 $p$ 位十进制有效数字。双精度浮点运算的机器精度约为 $u=2.22\times10^{-16}$，因此当 $\operatorname{cond}(\boldsymbol{A})\geqslant10^{16}$ 时，计算结果在数值上已不含任何有效信息，矩阵被称为数值奇异（numerically singular）。

### 8.5.2 线性方程组的扰动界

**定理 8.29（右端项扰动的相对误差界）**　设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 可逆，$\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$，$\boldsymbol{b}\neq\boldsymbol{0}$，且受扰动的方程为 $\boldsymbol{A}(\boldsymbol{x}+\delta\boldsymbol{x})=\boldsymbol{b}+\delta\boldsymbol{b}$。则
$$
\frac{\|\delta\boldsymbol{x}\|}{\|\boldsymbol{x}\|}\leqslant\operatorname{cond}(\boldsymbol{A})\,\frac{\|\delta\boldsymbol{b}\|}{\|\boldsymbol{b}\|}. \tag{8.37}
$$
且对任意给定的 $\boldsymbol{A}$，存在右端项 $\boldsymbol{b}$ 与扰动 $\delta\boldsymbol{b}$ 使等号成立，故该界不可改进。

**证明**

两式相减得 $\boldsymbol{A}\,\delta\boldsymbol{x}=\delta\boldsymbol{b}$，由 $\boldsymbol{A}$ 可逆，
$$
\delta\boldsymbol{x}=\boldsymbol{A}^{-1}\delta\boldsymbol{b},\qquad \|\delta\boldsymbol{x}\|\leqslant\|\boldsymbol{A}^{-1}\|\,\|\delta\boldsymbol{b}\|. \tag{8.38}
$$
另一方面，由原方程 $\boldsymbol{b}=\boldsymbol{A}\boldsymbol{x}$ 得
$$
\|\boldsymbol{b}\|\leqslant\|\boldsymbol{A}\|\,\|\boldsymbol{x}\|,\qquad\text{即}\qquad \frac{1}{\|\boldsymbol{x}\|}\leqslant\frac{\|\boldsymbol{A}\|}{\|\boldsymbol{b}\|}. \tag{8.39}
$$
将式（8.38）与式（8.39）相乘：
$$
\frac{\|\delta\boldsymbol{x}\|}{\|\boldsymbol{x}\|}\leqslant\|\delta\boldsymbol{x}\|\cdot\frac{\|\boldsymbol{A}\|}{\|\boldsymbol{b}\|}
\leqslant\|\boldsymbol{A}^{-1}\|\,\|\delta\boldsymbol{b}\|\cdot\frac{\|\boldsymbol{A}\|}{\|\boldsymbol{b}\|}
=\|\boldsymbol{A}\|\,\|\boldsymbol{A}^{-1}\|\cdot\frac{\|\delta\boldsymbol{b}\|}{\|\boldsymbol{b}\|}
=\operatorname{cond}(\boldsymbol{A})\frac{\|\delta\boldsymbol{b}\|}{\|\boldsymbol{b}\|},
$$
即式（8.37）。为说明界的锐利性，取谱范数情形。设 $\boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^\top$ 可逆，令 $\boldsymbol{b}=\sigma_1\boldsymbol{u}_1$、$\delta\boldsymbol{b}=\varepsilon\boldsymbol{u}_n$（$\varepsilon>0$）。则 $\boldsymbol{x}=\boldsymbol{A}^{-1}\boldsymbol{b}=\boldsymbol{v}_1$，$\delta\boldsymbol{x}=\boldsymbol{A}^{-1}\delta\boldsymbol{b}=\frac{\varepsilon}{\sigma_n}\boldsymbol{v}_n$，$\|\boldsymbol{x}\|_2=1$，于是
$$
\frac{\|\delta\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}=\frac{\varepsilon}{\sigma_n},\qquad
\operatorname{cond}_2(\boldsymbol{A})\frac{\|\delta\boldsymbol{b}\|_2}{\|\boldsymbol{b}\|_2}=\frac{\sigma_1}{\sigma_n}\cdot\frac{\varepsilon}{\sigma_1}=\frac{\varepsilon}{\sigma_n},
$$
两者相等，故式（8.37）的界确不可改进。

□

**定理 8.30（系数矩阵扰动的相对误差界）**　设 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$，$\boldsymbol{x}\neq\boldsymbol{0}$，受扰动方程为 $(\boldsymbol{A}+\delta\boldsymbol{A})(\boldsymbol{x}+\delta\boldsymbol{x})=\boldsymbol{b}$。若
$$
\operatorname{cond}(\boldsymbol{A})\,\frac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}<1, \tag{8.40}
$$
则 $\boldsymbol{A}+\delta\boldsymbol{A}$ 可逆，且
$$
\frac{\|\delta\boldsymbol{x}\|}{\|\boldsymbol{x}\|}\leqslant\frac{\operatorname{cond}(\boldsymbol{A})}{1-\operatorname{cond}(\boldsymbol{A})\,\dfrac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}}\cdot\frac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}. \tag{8.41}
$$

**证明**

展开扰动方程并利用 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$：
$$
\boldsymbol{A}\boldsymbol{x}+\boldsymbol{A}\,\delta\boldsymbol{x}+\delta\boldsymbol{A}\,\boldsymbol{x}+\delta\boldsymbol{A}\,\delta\boldsymbol{x}=\boldsymbol{A}\boldsymbol{x}
\quad\Longrightarrow\quad
(\boldsymbol{A}+\delta\boldsymbol{A})\,\delta\boldsymbol{x}=-\delta\boldsymbol{A}\,\boldsymbol{x}.
$$
写 $\boldsymbol{A}+\delta\boldsymbol{A}=\boldsymbol{A}(\boldsymbol{I}+\boldsymbol{A}^{-1}\delta\boldsymbol{A})$。由式（8.40）与 $\|\boldsymbol{A}^{-1}\delta\boldsymbol{A}\|\leqslant\|\boldsymbol{A}^{-1}\|\|\delta\boldsymbol{A}\|=\operatorname{cond}(\boldsymbol{A})\frac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}<1$，Neumann 级数 $\sum_{k\geqslant0}(-\boldsymbol{A}^{-1}\delta\boldsymbol{A})^k$ 收敛，故 $\boldsymbol{I}+\boldsymbol{A}^{-1}\delta\boldsymbol{A}$ 可逆且
$$
\bigl\|(\boldsymbol{I}+\boldsymbol{A}^{-1}\delta\boldsymbol{A})^{-1}\bigr\|\leqslant\frac{1}{1-\|\boldsymbol{A}^{-1}\delta\boldsymbol{A}\|}.
$$
从而 $\boldsymbol{A}+\delta\boldsymbol{A}$ 可逆，且
$$
\delta\boldsymbol{x}=-(\boldsymbol{I}+\boldsymbol{A}^{-1}\delta\boldsymbol{A})^{-1}\boldsymbol{A}^{-1}\delta\boldsymbol{A}\,\boldsymbol{x},
$$
$$
\|\delta\boldsymbol{x}\|\leqslant\frac{\|\boldsymbol{A}^{-1}\|\,\|\delta\boldsymbol{A}\|\,\|\boldsymbol{x}\|}{1-\|\boldsymbol{A}^{-1}\|\,\|\delta\boldsymbol{A}\|}
=\frac{\operatorname{cond}(\boldsymbol{A})\dfrac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}}{1-\operatorname{cond}(\boldsymbol{A})\dfrac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}}\,\|\boldsymbol{x}\|,
$$
两边除以 $\|\boldsymbol{x}\|$ 即得式（8.41）。

□

定理 8.29 与定理 8.30 可合并为同时扰动界：当 $\boldsymbol{A}$、$\boldsymbol{b}$ 均受扰动时，
$$
\frac{\|\delta\boldsymbol{x}\|}{\|\boldsymbol{x}\|}\leqslant\frac{\operatorname{cond}(\boldsymbol{A})}{1-\operatorname{cond}(\boldsymbol{A})\frac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}}
\left(\frac{\|\delta\boldsymbol{b}\|}{\|\boldsymbol{b}\|}+\frac{\|\delta\boldsymbol{A}\|}{\|\boldsymbol{A}\|}\right),
$$
只要分母为正。这一不等式是数值实验中判断结果可信度的基本依据：它说明相对误差的放大倍数由 $\operatorname{cond}(\boldsymbol{A})$ 唯一决定，与所采用的算法无关；算法能改变的只是常数因子与「向后误差」的大小。

### 8.5.3 数值稳定性：正规方程、QR 与 SVD 的比较

考虑超定最小二乘问题 $\min_{\boldsymbol{x}}\|\boldsymbol{A}\boldsymbol{x}-\boldsymbol{b}\|_2^2$，$\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$m>n$，$\operatorname{rank}(\boldsymbol{A})=n$。三种主流算法的数值行为差异，完全由条件数的传播方式决定。

**定理 8.31（正规方程使条件数平方）**　设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 列满秩，正规方程为
$$
\boldsymbol{A}^\top\boldsymbol{A}\,\boldsymbol{x}=\boldsymbol{A}^\top\boldsymbol{b}, \tag{8.42}
$$
其系数矩阵 $\boldsymbol{G}=\boldsymbol{A}^\top\boldsymbol{A}$ 对称正定。则
$$
\operatorname{cond}_2(\boldsymbol{G})=\operatorname{cond}_2(\boldsymbol{A})^2=\left(\frac{\sigma_1}{\sigma_n}\right)^{2}. \tag{8.43}
$$
更一般地，对任意 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})=\operatorname{cond}_2(\boldsymbol{A}\boldsymbol{A}^\top)=\operatorname{cond}_2(\boldsymbol{A})^2$（以非零奇异值计）。

**证明**

由推论 8.15（1），$\boldsymbol{A}^\top\boldsymbol{A}$ 的特征值为 $\sigma_1^2\geqslant\cdots\geqslant\sigma_n^2>0$（列满秩保证全部为正）。$\boldsymbol{G}$ 对称正定，由推论 8.28，
$$
\operatorname{cond}_2(\boldsymbol{G})=\frac{\lambda_{\max}(\boldsymbol{G})}{\lambda_{\min}(\boldsymbol{G})}=\frac{\sigma_1^2}{\sigma_n^2}=\left(\frac{\sigma_1}{\sigma_n}\right)^2=\operatorname{cond}_2(\boldsymbol{A})^2.
$$
$\boldsymbol{A}\boldsymbol{A}^\top$ 的情形同理。

□

定理 8.31 的后果是严重的。在浮点运算中，形成 $\boldsymbol{A}^\top\boldsymbol{A}$ 的每个元素都是 $m$ 个乘积之和，其绝对舍入误差量级为 $u\|\boldsymbol{A}\|_F^2$，相对于 $\|\boldsymbol{A}^\top\boldsymbol{A}\|_2\approx\|\boldsymbol{A}\|_2^2$ 的相对误差约为 $u\bigl(\|\boldsymbol{A}\|_F/\|\boldsymbol{A}\|_2\bigr)^2$，在列数较多时可达 $u\,n$ 量级。更本质的困难在于：当 $\boldsymbol{A}$ 的最小奇异值 $\sigma_n$ 满足 $\sigma_n^2\lesssim u\sigma_1^2$，即 $\operatorname{cond}_2(\boldsymbol{A})\gtrsim u^{-1/2}\approx6.7\times10^{7}$（双精度）时，计算得到的 $\hat{\boldsymbol{G}}$ 在浮点意义下已不再是正定矩阵，Cholesky 分解会因根号内出现负数而失败，或给出完全错误的解。此时正规方程法彻底失效，而其失效阈值恰是 $\operatorname{cond}_2(\boldsymbol{A})$ 的平方根量级，这就是「条件数平方」在实践中的含义。

与之对照，$QR$ 方法与 SVD 方法的稳定性表现如下。

（1）**Householder QR**。由 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$，$\operatorname{cond}_2(\boldsymbol{R})=\operatorname{cond}_2(\boldsymbol{A})$，因为 $\boldsymbol{Q}$ 正交不改变奇异值：$\boldsymbol{R}=\boldsymbol{Q}^\top\boldsymbol{A}$ 的奇异值与 $\boldsymbol{A}$ 完全相同。算法向后稳定，计算所得 $\hat{\boldsymbol{Q}}$、$\hat{\boldsymbol{R}}$ 满足 $\hat{\boldsymbol{Q}}\hat{\boldsymbol{R}}=\boldsymbol{A}+\delta\boldsymbol{A}$，$\|\delta\boldsymbol{A}\|_F\leqslant c\,mnu\,\|\boldsymbol{A}\|_F$，且 $\hat{\boldsymbol{Q}}^\top\hat{\boldsymbol{Q}}=\boldsymbol{I}+O(u)$。最小二乘解的相对误差满足
$$
\frac{\|\hat{\boldsymbol{x}}-\boldsymbol{x}^*\|_2}{\|\boldsymbol{x}^*\|_2}\leqslant c\,u\left(\operatorname{cond}_2(\boldsymbol{A})+\operatorname{cond}_2(\boldsymbol{A})^2\frac{\|\boldsymbol{r}\|_2}{\|\boldsymbol{A}\|_2\|\boldsymbol{x}^*\|_2}\right),
$$
其中 $\boldsymbol{r}$ 为残差。当残差较小（拟合良好）时，第二项可忽略，误差仅按 $\operatorname{cond}_2(\boldsymbol{A})$ 一次方放大。

（2）**SVD 方法**。取 $\hat{\boldsymbol{x}}=\sum_{\sigma_i>\tau}\frac{\boldsymbol{u}_i^\top\boldsymbol{b}}{\sigma_i}\boldsymbol{v}_i$（$\tau$ 为截断阈值）。SVD 计算本身向后稳定，奇异值的绝对误差不超过 $cu\|\boldsymbol{A}\|_2$（引理 8.18 的 Lipschitz 性质），故小奇异值的相对误差可能很大，但绝对误差受控。这使得 SVD 是唯一能够稳健处理秩亏与近似秩亏问题的方法：通过阈值 $\tau$ 显式地实施秩截断，得到定理 8.19 意义下的最优低秩逼近与推论 8.22 意义下的最小范数解，从而在病态情形下实现 Tikhonov 型正则化（截断 SVD 等价于谱滤波）。

（3）**Cholesky 分解用于正定系统**。当 $\boldsymbol{A}$ 本身对称正定（如协方差矩阵）时，Cholesky 分解向后稳定，$\operatorname{cond}$ 不放大，是最优选择；但用 Cholesky 分解去解正规方程 $\boldsymbol{G}=\boldsymbol{A}^\top\boldsymbol{A}$（即 `chol(A'A)`）则继承了定理 8.31 的全部缺陷，属于典型的错误用法。

（4）**Gram–Schmidt**。经典 CGS 不稳定，正交性损失可达 $\operatorname{cond}_2(\boldsymbol{A})^2u$；修正 MGS 的正交性损失为 $O(\operatorname{cond}_2(\boldsymbol{A})u)$，最小二乘解的精度与 Householder 相当，但 $\hat{\boldsymbol{Q}}$ 的正交性略差。实务中若需要显式的正交基（例如构造正交化的因子），应使用 Householder 或带再正交化的 MGS。

**例 8.7**　设 $\varepsilon=10^{-4}$，
$$
\boldsymbol{A}=\begin{bmatrix}1&1\\ 1&1+\varepsilon\end{bmatrix},\qquad \boldsymbol{b}=\begin{bmatrix}2\\ 2\end{bmatrix}.
$$
求 $\operatorname{cond}_2(\boldsymbol{A})$ 与 $\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})$，解 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$，并考察右端项第二分量产生 $\delta b_2=2\times10^{-4}$ 的扰动时解的相对变化，与式（8.37）的上界作比较。

**解**　（1）条件数。计算
$$
\boldsymbol{A}^\top\boldsymbol{A}=\begin{bmatrix}2&2+\varepsilon\\ 2+\varepsilon&2+2\varepsilon+\varepsilon^2\end{bmatrix},\qquad
\operatorname{tr}(\boldsymbol{A}^\top\boldsymbol{A})=4+2\varepsilon+\varepsilon^2,\qquad
\det(\boldsymbol{A}^\top\boldsymbol{A})=2(2+2\varepsilon+\varepsilon^2)-(2+\varepsilon)^2=\varepsilon^2.
$$
特征值满足 $\lambda^2-(4+2\varepsilon+\varepsilon^2)\lambda+\varepsilon^2=0$。由韦达定理，$\lambda_1+\lambda_2=4+2\varepsilon+\varepsilon^2\approx4.0002$，$\lambda_1\lambda_2=\varepsilon^2=10^{-8}$。因 $\lambda_2\ll\lambda_1$，可取近似 $\lambda_1\approx4.0002$，$\lambda_2\approx\varepsilon^2/\lambda_1\approx2.5\times10^{-9}$。于是
$$
\sigma_1=\sqrt{\lambda_1}\approx2.0001,\qquad \sigma_2=\sqrt{\lambda_2}\approx5\times10^{-5}=\frac{\varepsilon}{2},
$$
$$
\operatorname{cond}_2(\boldsymbol{A})=\frac{\sigma_1}{\sigma_2}\approx\frac{2.0001}{5\times10^{-5}}\approx4.0\times10^{4},\qquad
\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})=\frac{\lambda_1}{\lambda_2}\approx1.6\times10^{9}=\operatorname{cond}_2(\boldsymbol{A})^2,
$$
与定理 8.31 一致。$\boldsymbol{A}$ 的两列 $(1,1)^\top$ 与 $(1,1+\varepsilon)^\top$ 几乎共线，这正是条件数巨大的根源。

（2）求解。由方程组 $x_1+x_2=2$，$x_1+(1+\varepsilon)x_2=2$，两式相减得 $\varepsilon x_2=0$，故 $x_2=0$，$x_1=2$，即 $\boldsymbol{x}=(2,0)^\top$，$\|\boldsymbol{x}\|_2=2$。

（3）扰动分析。取 $\delta\boldsymbol{b}=(0,2\times10^{-4})^\top$，则新方程为 $x_1+x_2=2$，$x_1+(1+\varepsilon)x_2=2+2\times10^{-4}$，相减得 $\varepsilon x_2=2\times10^{-4}$，故 $x_2=\frac{2\times10^{-4}}{10^{-4}}=2$，$x_1=0$，即 $\hat{\boldsymbol{x}}=(0,2)^\top$。于是
$$
\delta\boldsymbol{x}=\hat{\boldsymbol{x}}-\boldsymbol{x}=(-2,2)^\top,\qquad \|\delta\boldsymbol{x}\|_2=2\sqrt{2},\qquad
\frac{\|\delta\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}=\frac{2\sqrt{2}}{2}=\sqrt{2}\approx1.414,
$$
$$
\|\boldsymbol{b}\|_2=2\sqrt{2},\qquad \|\delta\boldsymbol{b}\|_2=2\times10^{-4},\qquad
\frac{\|\delta\boldsymbol{b}\|_2}{\|\boldsymbol{b}\|_2}=\frac{2\times10^{-4}}{2\sqrt{2}}=\frac{10^{-4}}{\sqrt{2}}\approx7.07\times10^{-5}.
$$
实际放大倍数为
$$
\frac{\|\delta\boldsymbol{x}\|_2/\|\boldsymbol{x}\|_2}{\|\delta\boldsymbol{b}\|_2/\|\boldsymbol{b}\|_2}=\frac{\sqrt{2}}{10^{-4}/\sqrt{2}}=\frac{2}{10^{-4}}=2\times10^{4},
$$
而式（8.37）给出的上界为 $\operatorname{cond}_2(\boldsymbol{A})\approx4\times10^{4}$。可见界的量级完全正确，实际放大倍数约为上界的一半。值得注意的是：右端项仅发生 $0.007\%$ 的相对扰动，解却发生了 $141\%$ 的相对变化，甚至解的两个分量完全互换，这说明病态系统的输出对输入的微小噪声极度敏感。

（4）算法选择的含义。若用正规方程法求解本题，需面对 $\operatorname{cond}_2(\boldsymbol{A}^\top\boldsymbol{A})\approx1.6\times10^{9}$，双精度下有效数字损失约 $\log_{10}(1.6\times10^9)\approx9.2$ 位，且 $\boldsymbol{A}^\top\boldsymbol{A}$ 的最小特征值 $2.5\times10^{-9}$ 已与 $\varepsilon^2$ 的舍入误差同阶，Cholesky 分解可能失败。若用 Householder QR，条件数仅 $4\times10^{4}$，损失约 $4.6$ 位有效数字，仍可保留约 $11$ 位可靠数字。这解释了为何在量化回归的工业级实现中，正规方程法只被允许用于条件数已被确证很小的场合。

## 8.6 量化金融中的应用

### 8.6.1 因子协方差矩阵的低秩加对角结构

**定义 8.32（因子协方差模型）**　设 $n$ 个资产的超额收益率满足单期因子结构
$$
\boldsymbol{r}_t=\boldsymbol{\mu}+\boldsymbol{B}\boldsymbol{f}_t+\boldsymbol{\varepsilon}_t,\qquad t=1,\dots,T,
$$
其中 $\boldsymbol{B}\in\mathbb{R}^{n\times k}$ 为因子载荷（暴露）矩阵且 $k\ll n$，$\boldsymbol{f}_t\in\mathbb{R}^k$ 为公共因子收益，$\boldsymbol{\varepsilon}_t\in\mathbb{R}^n$ 为特异性收益。设 $\mathbb{E}[\boldsymbol{f}_t]=\mathbb{E}[\boldsymbol{\varepsilon}_t]=\boldsymbol{0}$，$\operatorname{Cov}(\boldsymbol{f}_t)=\boldsymbol{F}\succ\boldsymbol{0}$，$\operatorname{Cov}(\boldsymbol{\varepsilon}_t)=\boldsymbol{D}=\operatorname{diag}(d_1,\dots,d_n)\succ\boldsymbol{0}$，且 $\boldsymbol{f}_t$ 与 $\boldsymbol{\varepsilon}_s$ 对一切 $t,s$ 不相关，特异性收益之间亦不相关。则收益率协方差矩阵具有低秩加对角（low-rank plus diagonal）结构
$$
\boldsymbol{\Sigma}=\operatorname{Cov}(\boldsymbol{r}_t)=\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top+\boldsymbol{D}. \tag{8.44}
$$

**定理 8.33（因子模型的正定性、条件数控制与高效求逆）**　式（8.44）定义的 $\boldsymbol{\Sigma}$ 满足：

（1）$\boldsymbol{\Sigma}\succ\boldsymbol{0}$，且由对称矩阵特征值的 Weyl 不等式，
$$
\lambda_{\min}(\boldsymbol{\Sigma})\geqslant\lambda_{\min}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)+\lambda_{\min}(\boldsymbol{D})\geqslant\min_{1\leqslant i\leqslant n}d_i>0,
$$
$$
\lambda_{\max}(\boldsymbol{\Sigma})\leqslant\lambda_{\max}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)+\max_i d_i\leqslant\operatorname{tr}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)+\max_i d_i=\operatorname{tr}(\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{B})+\max_i d_i,
$$
从而谱条件数有上界
$$
\operatorname{cond}_2(\boldsymbol{\Sigma})\leqslant\frac{\operatorname{tr}(\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{B})+\max_i d_i}{\min_i d_i}; \tag{8.45}
$$

（2）$\operatorname{rank}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)\leqslant k$，故 $\boldsymbol{\Sigma}$ 至多有 $k$ 个特征值显著偏离对角元素 $\{d_i\}$ 的量级，其余 $n-k$ 个特征值由特异性方差主导；

（3）$\boldsymbol{\Sigma}^{-1}$ 可由 Sherman–Morrison–Woodbury 公式给出：
$$
\boldsymbol{\Sigma}^{-1}=\boldsymbol{D}^{-1}-\boldsymbol{D}^{-1}\boldsymbol{B}\bigl(\boldsymbol{F}^{-1}+\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\bigr)^{-1}\boldsymbol{B}^\top\boldsymbol{D}^{-1}, \tag{8.46}
$$
其中只需对 $k\times k$ 矩阵求逆，总运算量由 $O(n^3)$ 降至 $O(nk^2+k^3)$；当 $k\ll n$ 时加速比约为 $n/(3k)$；

（4）$\boldsymbol{\Sigma}$ 的 Cholesky 分解 $\boldsymbol{\Sigma}=\boldsymbol{L}\boldsymbol{L}^\top$ 存在且唯一，且对每个 $j=1,\dots,n$，
$$
\prod_{i=1}^{j}l_{ii}^2=\det\boldsymbol{\Sigma}_j\geqslant\det\boldsymbol{D}_j=\prod_{i=1}^{j}d_i,
$$
其中 $\boldsymbol{\Sigma}_j$、$\boldsymbol{D}_j$ 分别为 $\boldsymbol{\Sigma}$、$\boldsymbol{D}$ 的第 $j$ 阶顺序主子矩阵；对任意组合权重 $\boldsymbol{w}\in\mathbb{R}^n$，组合方差可用
$$
\boldsymbol{w}^\top\boldsymbol{\Sigma}\boldsymbol{w}=\|\boldsymbol{L}^\top\boldsymbol{w}\|_2^2=\boldsymbol{w}^\top\boldsymbol{D}\boldsymbol{w}+\bigl\|\boldsymbol{F}^{1/2}\boldsymbol{B}^\top\boldsymbol{w}\bigr\|_2^2 \tag{8.47}
$$
计算，两种写法均在浮点运算下严格非负，避免了直接按元素求和可能出现的负方差。

**证明**

（1）$\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\succeq\boldsymbol{0}$（因 $\boldsymbol{x}^\top\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{x}=\|\boldsymbol{F}^{1/2}\boldsymbol{B}^\top\boldsymbol{x}\|_2^2\geqslant0$），$\boldsymbol{D}\succ\boldsymbol{0}$，故 $\boldsymbol{x}^\top\boldsymbol{\Sigma}\boldsymbol{x}\geqslant\boldsymbol{x}^\top\boldsymbol{D}\boldsymbol{x}\geqslant(\min_i d_i)\|\boldsymbol{x}\|_2^2>0$。上界由 Weyl 不等式 $\lambda_{\max}(\boldsymbol{P}+\boldsymbol{Q})\leqslant\lambda_{\max}(\boldsymbol{P})+\lambda_{\max}(\boldsymbol{Q})$ 与 $\lambda_{\max}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)\leqslant\operatorname{tr}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)$（半正定矩阵的最大特征值不超过其迹）得到。两式相除即式（8.45）。

（2）$\operatorname{rank}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)\leqslant\min\{\operatorname{rank}\boldsymbol{B},\operatorname{rank}\boldsymbol{F}\}\leqslant k$，故 $\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top$ 至多有 $k$ 个非零特征值。

（3）直接验证。记 $\boldsymbol{M}=\boldsymbol{F}^{-1}+\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}$（$k\times k$ 正定，故可逆），则
$$
(\boldsymbol{D}+\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)\bigl(\boldsymbol{D}^{-1}-\boldsymbol{D}^{-1}\boldsymbol{B}\boldsymbol{M}^{-1}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\bigr)
=\boldsymbol{I}+\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}-\boldsymbol{B}\boldsymbol{M}^{-1}\boldsymbol{B}^\top\boldsymbol{D}^{-1}-\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\boldsymbol{M}^{-1}\boldsymbol{B}^\top\boldsymbol{D}^{-1}.
$$
提取公因子 $\boldsymbol{B}(\cdots)\boldsymbol{B}^\top\boldsymbol{D}^{-1}$，中间括号为
$$
\boldsymbol{F}-\boldsymbol{M}^{-1}-\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\boldsymbol{M}^{-1}
=\bigl(\boldsymbol{F}\boldsymbol{M}-\boldsymbol{I}-\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\bigr)\boldsymbol{M}^{-1}
=\bigl(\boldsymbol{F}\boldsymbol{F}^{-1}+\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}-\boldsymbol{I}-\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}\bigr)\boldsymbol{M}^{-1}=\boldsymbol{0},
$$
故乘积为 $\boldsymbol{I}$，式（8.46）成立。

（4）正定性已由（1）给出，唯一性由定理 8.10 得到。因 $\boldsymbol{\Sigma}-\boldsymbol{D}=\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\succeq\boldsymbol{0}$，其任意顺序主子矩阵之差亦半正定，故 $\boldsymbol{\Sigma}_j\succeq\boldsymbol{D}_j\succ\boldsymbol{0}$。由对称矩阵特征值的单调性（Weyl 不等式的推论）$\lambda_i(\boldsymbol{\Sigma}_j)\geqslant\lambda_i(\boldsymbol{D}_j)$，$i=1,\dots,j$，逐项相乘得 $\det\boldsymbol{\Sigma}_j\geqslant\det\boldsymbol{D}_j$。再由式（8.12）的递推可知 $\det\boldsymbol{\Sigma}_j=\prod_{i=1}^{j}l_{ii}^2$，而 $\det\boldsymbol{D}_j=\prod_{i=1}^{j}d_i$，结论得证。式（8.47）的第一个等号由 $\boldsymbol{w}^\top\boldsymbol{L}\boldsymbol{L}^\top\boldsymbol{w}=\|\boldsymbol{L}^\top\boldsymbol{w}\|_2^2$ 得到；第二个等号由式（8.44）直接展开：$\boldsymbol{w}^\top\boldsymbol{D}\boldsymbol{w}=\sum_{i=1}^{n}d_iw_i^2$，$\boldsymbol{w}^\top\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\boldsymbol{w}=(\boldsymbol{B}^\top\boldsymbol{w})^\top\boldsymbol{F}(\boldsymbol{B}^\top\boldsymbol{w})=\|\boldsymbol{F}^{1/2}\boldsymbol{B}^\top\boldsymbol{w}\|_2^2$，两项均非负。

□

式（8.45）的上界具有重要的建模含义：因子模型通过引入正的特异性方差 $d_i$ 给 $\boldsymbol{\Sigma}$ 的最小特征值设置了一个严格正的下界，从而从结构上抑制了条件数的爆炸。相比之下，样本协方差矩阵在 $n$ 接近 $T$ 时的最小特征值趋于零，条件数趋于无穷，这正是 8.6.4 节讨论的病态问题的根源。

**例 8.8**　设三资产单因子模型，因子载荷 $\boldsymbol{B}=(1.2,\ 0.8,\ 1.0)^\top$，因子方差 $\boldsymbol{F}=[0.01]$，特异性方差 $\boldsymbol{D}=\operatorname{diag}(0.0009,\ 0.0016,\ 0.0025)$。求协方差矩阵 $\boldsymbol{\Sigma}$、其条件数的上下界估计，并用式（8.46）求 $\boldsymbol{\Sigma}^{-1}$ 后验证 $\boldsymbol{\Sigma}\boldsymbol{\Sigma}^{-1}=\boldsymbol{I}_3$。

**解**　（1）构造 $\boldsymbol{\Sigma}$。首先
$$
\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top=0.01\times\begin{bmatrix}1.44&0.96&1.20\\ 0.96&0.64&0.80\\ 1.20&0.80&1.00\end{bmatrix}
=\begin{bmatrix}0.0144&0.0096&0.0120\\ 0.0096&0.0064&0.0080\\ 0.0120&0.0080&0.0100\end{bmatrix},
$$
加上 $\boldsymbol{D}$ 得
$$
\boldsymbol{\Sigma}=\begin{bmatrix}0.0153&0.0096&0.0120\\ 0.0096&0.0080&0.0080\\ 0.0120&0.0080&0.0125\end{bmatrix},\qquad
\operatorname{tr}\boldsymbol{\Sigma}=0.0153+0.0080+0.0125=0.0358.
$$
其中 $\operatorname{tr}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)=0.01\times(1.44+0.64+1.00)=0.01\times3.08=0.0308$，$\operatorname{tr}\boldsymbol{D}=0.0050$，两者之和为 $0.0358$，与 $\operatorname{tr}\boldsymbol{\Sigma}$ 一致。

（2）条件数估计。由 Weyl 不等式，$\lambda_{\max}(\boldsymbol{\Sigma})\geqslant\lambda_{\max}(\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top)+\lambda_{\min}(\boldsymbol{D})=0.0308+0.0009=0.0317$（因秩一矩阵 $\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top$ 的唯一非零特征值等于其迹 $0.0308$），且 $\lambda_{\max}(\boldsymbol{\Sigma})\leqslant0.0308+0.0025=0.0333$。于是
$$
\lambda_2+\lambda_3=\operatorname{tr}\boldsymbol{\Sigma}-\lambda_1\in[0.0358-0.0333,\ 0.0358-0.0317]=[0.0025,\ 0.0041].
$$
又 $\lambda_{\min}(\boldsymbol{\Sigma})\geqslant\min_i d_i=0.0009$，且 $\lambda_3\leqslant\frac{1}{2}(\lambda_2+\lambda_3)\leqslant0.00205$。综合得
$$
\operatorname{cond}_2(\boldsymbol{\Sigma})=\frac{\lambda_1}{\lambda_3}\in\left[\frac{0.0317}{0.00205},\ \frac{0.0333}{0.0009}\right]\subset[15,\ 38],
$$
与式（8.45）的上界 $\frac{0.0308+0.0025}{0.0009}=37.0$ 相符。条件数约 $10^{1.5}$，属良态问题，Cholesky 或特征分解均可稳定求解。

（3）Woodbury 求逆。计算
$$
\boldsymbol{D}^{-1}=\operatorname{diag}\left(\frac{1}{0.0009},\ \frac{1}{0.0016},\ \frac{1}{0.0025}\right)=\operatorname{diag}\left(\frac{10000}{9},\ 625,\ 400\right),
$$
$$
\boldsymbol{D}^{-1}\boldsymbol{B}=\left(\frac{1.2}{0.0009},\ \frac{0.8}{0.0016},\ \frac{1.0}{0.0025}\right)^\top=\left(\frac{4000}{3},\ 500,\ 400\right)^\top,
$$
$$
\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}=\frac{1.44}{0.0009}+\frac{0.64}{0.0016}+\frac{1.00}{0.0025}=1600+400+400=2400,
$$
$$
\boldsymbol{M}=\boldsymbol{F}^{-1}+\boldsymbol{B}^\top\boldsymbol{D}^{-1}\boldsymbol{B}=100+2400=2500,\qquad \boldsymbol{M}^{-1}=4\times10^{-4}.
$$
于是由式（8.46），
$$
\boldsymbol{\Sigma}^{-1}=\boldsymbol{D}^{-1}-4\times10^{-4}\begin{bmatrix}\dfrac{4000}{3}\\[1mm] 500\\[1mm] 400\end{bmatrix}
\begin{bmatrix}\dfrac{4000}{3}&500&400\end{bmatrix}
=\begin{bmatrix}400&-\dfrac{800}{3}&-\dfrac{640}{3}\\[2mm] -\dfrac{800}{3}&525&-80\\[2mm] -\dfrac{640}{3}&-80&336\end{bmatrix}.
$$
（逐项核对：$(1,1)$ 元 $\frac{10000}{9}-4\times10^{-4}\times\frac{16\times10^{6}}{9}=\frac{10000}{9}-\frac{6400}{9}=\frac{3600}{9}=400$；$(2,2)$ 元 $625-4\times10^{-4}\times250000=625-100=525$；$(3,3)$ 元 $400-4\times10^{-4}\times160000=400-64=336$；$(1,2)$ 元 $-4\times10^{-4}\times\frac{4000}{3}\times500=-\frac{800}{3}$；$(1,3)$ 元 $-4\times10^{-4}\times\frac{4000}{3}\times400=-\frac{640}{3}$；$(2,3)$ 元 $-4\times10^{-4}\times500\times400=-80$。）

（4）验证 $\boldsymbol{\Sigma}\boldsymbol{\Sigma}^{-1}=\boldsymbol{I}_3$。由对称性只需检验上三角六个元素：
$$
(1,1):\ 0.0153\times400+0.0096\times\Bigl(-\frac{800}{3}\Bigr)+0.0120\times\Bigl(-\frac{640}{3}\Bigr)=6.12-2.56-2.56=1,
$$
$$
(1,2):\ 0.0153\times\Bigl(-\frac{800}{3}\Bigr)+0.0096\times525+0.0120\times(-80)=-4.08+5.04-0.96=0,
$$
$$
(1,3):\ 0.0153\times\Bigl(-\frac{640}{3}\Bigr)+0.0096\times(-80)+0.0120\times336=-3.264-0.768+4.032=0,
$$
$$
(2,2):\ 0.0096\times\Bigl(-\frac{800}{3}\Bigr)+0.0080\times525+0.0080\times(-80)=-2.56+4.20-0.64=1,
$$
$$
(2,3):\ 0.0096\times\Bigl(-\frac{640}{3}\Bigr)+0.0080\times(-80)+0.0080\times336=-2.048-0.64+2.688=0,
$$
$$
(3,3):\ 0.0120\times\Bigl(-\frac{640}{3}\Bigr)+0.0080\times(-80)+0.0125\times336=-2.56-0.64+4.20=1.
$$
六个等式全部精确成立，故式（8.46）的计算无误。

（5）结构贡献的度量。若忽略因子项而只用对角近似 $\boldsymbol{\Sigma}\approx\boldsymbol{D}$，则由秩一矩阵的 Frobenius 范数 $\|\boldsymbol{B}\boldsymbol{B}^\top\|_F=\|\boldsymbol{B}\|_2^2=3.08$ 得
$$
\|\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top\|_F=0.01\times3.08=0.0308,
$$
而 $\|\boldsymbol{\Sigma}\|_F=\bigl(0.0153^2+0.0080^2+0.0125^2+2(0.0096^2+0.0120^2+0.0080^2)\bigr)^{1/2}\approx0.03248$，故相对误差
$$
\frac{\|\boldsymbol{\Sigma}-\boldsymbol{D}\|_F}{\|\boldsymbol{\Sigma}\|_F}=\frac{0.0308}{0.03248}\approx0.95.
$$
即对角近似丢失了约 $95\%$ 的协方差结构信息，说明在相关性显著的组合中，特异性方差模型完全不可用，低秩项必须保留。反之，若保留秩一因子项而忽略特异性协方差，即把 $\boldsymbol{B}\boldsymbol{F}\boldsymbol{B}^\top$ 视为 $\boldsymbol{\Sigma}$ 的秩一近似，则残差恰为 $\boldsymbol{D}$，其 Frobenius 范数为
$$
\|\boldsymbol{D}\|_F=\bigl(0.0009^2+0.0016^2+0.0025^2\bigr)^{1/2}=\bigl(9.62\times10^{-6}\bigr)^{1/2}\approx0.0031,
$$
相对误差约 $0.0031/0.03248\approx9.5\%$；由定理 8.19，最佳秩一近似的误差 $(\lambda_2^2+\lambda_3^2)^{1/2}\leqslant0.0031$ 还要更小。两种近似的相对误差 $95\%$ 与 $9.5\%$ 相差一个数量级，这一定量对比正是「低秩加对角」结构在风险模型中兼顾简约性与拟合精度的依据：公共因子项承载了绝大部分协方差信息，特异性方差项则以极小的秩代价保证了正定性与条件数的可控。

### 8.6.2 PCA 降维在收益率曲线与因子提取中的应用

利率期限结构的经验事实是：不同期限的即期利率或互换利率变动高度相关，其协方差矩阵的前三个主成分通常解释 $95\%$ 至 $99\%$ 的总方差，且三个载荷向量具有稳定的经济形态——第一主成分载荷各期限同号且量级相近，对应利率的整体平移（level）；第二主成分载荷呈单调递增或递减形态，对应曲线的倾斜（slope）；第三主成分载荷两端同号、中间反号，对应曲率（butterfly）。这一结构使风险管理可以用三个因子替代数十个期限节点，把对冲问题的维数从 $n$ 降至 $3$，同时由定理 8.26（4）保证信息损失恰为 $1-\eta_3$。

实务中须注意三点。第一，主成分的符号与排序约定：定理 8.24 只确定载荷至多相差符号，跨期比较或对账时必须固定符号规则（例如令 $\boldsymbol{w}_j$ 的第一个非零分量为正，或令其与上一期估计的内积为正）。第二，是否标准化：若各期限的波动率量级差异大，应对数据先按标准差标准化再做 PCA，此时分析的是相关系数矩阵而非协方差矩阵，主成分解释的是相关性结构而非方差结构，两者结论可能不同。第三，样本长度：由式（8.29），$\boldsymbol{S}$ 的估计误差为 $O(T^{-1/2})$；当 $n$ 与 $T$ 同阶时，$\boldsymbol{S}$ 的最大特征值被系统性高估、最小特征值被系统性低估，其极限谱分布由 Marchenko–Pastur 定律刻画，此时直接使用样本主成分会严重高估降维的有效性，需以随机矩阵理论修正或采用收缩估计。

同样的 PCA 框架也用于股票横截面：对数百只股票的收益率矩阵做 SVD，第一主成分近似市场因子，其后若干主成分近似行业与风格因子。与显式因子模型（定义 8.32）相比，统计因子的优点是无需事先指定，缺点是经济解释性弱、载荷不稳定，实务中常将两者结合，即用 PCA 提取候选因子再做回归以赋予经济标签。

### 8.6.3 回归与组合优化的数值实现准则

对多元线性回归 $\boldsymbol{y}=\boldsymbol{A}\boldsymbol{\beta}+\boldsymbol{\epsilon}$，$\boldsymbol{A}\in\mathbb{R}^{T\times p}$（含截距列或已中心化），推荐的数值实现流程如下。

第一步，预处理。对因子做标准化（减去均值、除以标准差），使设计矩阵各列量级一致，避免条件数因量纲差异被人为放大。注意标准化不改变相关系数矩阵的条件数，但显著改善 $\boldsymbol{A}^\top\boldsymbol{A}$ 的条件数。

第二步，选择分解路径。若 $\operatorname{cond}_2(\boldsymbol{A})\lesssim10^{4}$ 且残差很小，正规方程加 Cholesky 是最快的选择（约 $\frac{1}{2}Tp^2+\frac{1}{6}p^3$ 次运算）；否则应采用 Householder QR（约 $2Tp^2-\frac{2}{3}p^3$ 次运算）；若怀疑秩亏或需要正则化，则用 SVD。

第三步，求解与推断。由 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$，$\hat{\boldsymbol{\beta}}$ 由 $\boldsymbol{R}\hat{\boldsymbol{\beta}}=\boldsymbol{Q}^\top\boldsymbol{y}$ 回代得到；残差 $\hat{\boldsymbol{\epsilon}}=\boldsymbol{y}-\boldsymbol{A}\hat{\boldsymbol{\beta}}=\boldsymbol{Q}_\perp\boldsymbol{Q}_\perp^\top\boldsymbol{y}$；系数协方差矩阵
$$
\operatorname{Cov}(\hat{\boldsymbol{\beta}})=s^2(\boldsymbol{A}^\top\boldsymbol{A})^{-1}=s^2\boldsymbol{R}^{-1}\boldsymbol{R}^{-\top},\qquad s^2=\frac{\|\hat{\boldsymbol{\epsilon}}\|_2^2}{T-p},
$$
应通过两次三角求解计算 $\boldsymbol{R}^{-1}$ 作用于单位阵的列，绝不显式构造 $(\boldsymbol{A}^\top\boldsymbol{A})^{-1}$。标准误即 $s\|\boldsymbol{R}^{-1}\boldsymbol{e}_j\|_2$。

第四步，诊断。计算 $\operatorname{cond}_2(\boldsymbol{R})=\operatorname{cond}_2(\boldsymbol{A})$ 并报告；若超过 $10^{6}$，检查方差膨胀因子 $\mathrm{VIF}_j=1/(1-R_j^2)$（$R_j^2$ 为第 $j$ 列对其余列回归的决定系数），或直接用列主元 QR 判定数值秩。

第五步，正则化。病态时可施行截断 SVD 或 Tikhonov 正则化，后者的解为
$$
\hat{\boldsymbol{\beta}}_\lambda=\sum_{i=1}^{r}\frac{\sigma_i}{\sigma_i^2+\lambda}\,(\boldsymbol{u}_i^\top\boldsymbol{y})\,\boldsymbol{v}_i
=(\boldsymbol{A}^\top\boldsymbol{A}+\lambda\boldsymbol{I})^{-1}\boldsymbol{A}^\top\boldsymbol{y},\qquad \lambda>0,
$$
它以引入偏差为代价，把正规方程矩阵的条件数从 $\sigma_1^2/\sigma_n^2$ 降至
$$
\operatorname{cond}_2\bigl(\boldsymbol{A}^\top\boldsymbol{A}+\lambda\boldsymbol{I}\bigr)=\frac{\sigma_1^2+\lambda}{\sigma_n^2+\lambda}<\frac{\sigma_1^2}{\sigma_n^2},
$$
当 $\lambda\geqslant\sigma_n^2$ 时该比值不超过 $(\sigma_1^2+\lambda)/(2\lambda)$，从而以可控的偏差换取估计方差的显著降低。

在组合优化中，Markowitz 均值方差问题的解 $\boldsymbol{w}\propto\boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}$ 对 $\boldsymbol{\Sigma}$ 与 $\boldsymbol{\mu}$ 的估计误差同样受定理 8.29 与定理 8.30 支配。由于期望收益 $\boldsymbol{\mu}$ 的估计相对误差常常高达 $50\%$ 以上，而 $\operatorname{cond}_2(\boldsymbol{\Sigma})$ 在样本协方差情形下可达 $10^{3}$ 至 $10^{5}$，未正则化的最优权重会呈现极端多头与极端空头的「误差最大化」形态。工程上的对策包括：使用因子结构（定义 8.32）替代满秩样本协方差、对协方差矩阵施加 Ledoit–Wolf 型收缩
$$
\boldsymbol{\Sigma}_{\text{shrink}}=\alpha\boldsymbol{F}_{\text{target}}+(1-\alpha)\boldsymbol{S},\qquad \alpha\in[0,1],
$$
以及对权重施加盒约束或换手率约束。收缩的实质是把 $\boldsymbol{\Sigma}$ 的特征值谱向中心压缩，从而降低条件数、提高逆矩阵的稳健性。

### 8.6.4 风险模型的病态问题与实现要点

样本协方差矩阵 $\boldsymbol{S}=\frac{1}{T-1}\boldsymbol{X}^\top\boldsymbol{X}$ 在 $T\leqslant n$ 时秩亏，$\lambda_{\min}(\boldsymbol{S})=0$，$\operatorname{cond}_2(\boldsymbol{S})=\infty$，逆矩阵不存在；即使 $T>n$，当 $T/n$ 接近 $1$ 时 $\lambda_{\min}(\boldsymbol{S})$ 也会接近零，Cholesky 分解可能在根号内出现微小负数而中断。稳健的实现要点如下。

（1）先做特征分解或 SVD 再判定正定性。计算 $\boldsymbol{S}=\boldsymbol{V}\boldsymbol{\Lambda}\boldsymbol{V}^\top$，检查 $\lambda_{\min}$；若 $\lambda_{\min}\leqslant\tau$（$\tau$ 取 $\varepsilon_{\text{mach}}\cdot\lambda_{\max}\cdot n$ 或业务给定的最小方差水平），则将负或过小的特征值截断为 $\tau$ 后再重构 $\tilde{\boldsymbol{S}}=\boldsymbol{V}\tilde{\boldsymbol{\Lambda}}\boldsymbol{V}^\top$，最后对 $\tilde{\boldsymbol{S}}$ 做 Cholesky。这一「特征值地板」处理保证了后续分解的存在性，代价是引入可控的偏差。

（2）模拟相关正态向量的生成必须使用 Cholesky 或对称平方根。若 $\boldsymbol{\xi}\sim N(\boldsymbol{0},\boldsymbol{I}_n)$，则 $\boldsymbol{L}\boldsymbol{\xi}\sim N(\boldsymbol{0},\boldsymbol{\Sigma})$，其中 $\boldsymbol{\Sigma}=\boldsymbol{L}\boldsymbol{L}^\top$。Cholesky 的运算量 $\frac{n^3}{6}$ 约为对称平方根（需完整特征分解，约 $\frac{4n^3}{3}$）的八分之一，是大规模蒙特卡洛模拟的首选。

（3）低秩近似可用带主元的 Cholesky（pivoted Cholesky）高效实现：它在每步选择剩余对角元最大者作主元，得到 $\boldsymbol{P}^\top\boldsymbol{\Sigma}\boldsymbol{P}=\boldsymbol{L}\boldsymbol{L}^\top$ 的秩 $k$ 截断，运算量仅 $O(n^2k)$，远小于完整特征分解的 $O(n^3)$，在 $n$ 达数千的风险系统中是唯一可行的方案。

（4）报告条件数与谱衰减。风险模型的健康度指标应包括 $\operatorname{cond}_2(\boldsymbol{\Sigma})$、$\lambda_1/\operatorname{tr}\boldsymbol{\Sigma}$（最大特征值占比）以及使 $\eta_k\geqslant0.95$ 的最小 $k$。若 $\operatorname{cond}_2(\boldsymbol{\Sigma})>10^{8}$，则 $\boldsymbol{\Sigma}^{-1}$ 在双精度下已无实用价值，一切依赖逆矩阵的量（最优权重、信息比率的可实现上界）均不可信。

## 本章小结

本章建立了矩阵分解与条件数理论的完整框架，四条主线相互贯通。

第一，$QR$ 分解。Gram–Schmidt 过程（定理 8.3）从几何上逐列正交化，给出 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$ 的构造性证明；Householder 反射（定义 8.5、引理 8.6）则以镜面反射把每一列的下部分量清零，得到向后稳定的三角化算法（定理 8.7）。列满秩时若规定 $r_{ii}>0$，分解唯一（定理 8.4），其证明核心是「既三角又正交的矩阵必为符号对角阵」。秩亏情形需列主元 QR。

第二，Cholesky 分解。对称正定矩阵存在唯一的对角元为正的下三角因子 $\boldsymbol{A}=\boldsymbol{L}\boldsymbol{L}^\top$（定理 8.10），证明依靠对阶数归纳与 Schur 补的正定性；唯一性依靠下三角正交阵必为符号对角阵。算法运算量 $\frac{n^3}{6}$，无需选主元，向后稳定，且开平方失败即等价于正定性检验失败。

第三，SVD 与低秩逼近。经由 $\boldsymbol{A}^\top\boldsymbol{A}$ 的谱分解构造右奇异向量与左奇异向量（定理 8.14），奇异值为 $\sigma_i=\sqrt{\lambda_i(\boldsymbol{A}^\top\boldsymbol{A})}$，$\boldsymbol{A}^\top\boldsymbol{A}$ 与 $\boldsymbol{A}\boldsymbol{A}^\top$ 共享非零谱（推论 8.15）。几何上，线性映射是「旋转—伸缩—旋转」，单位球映为半轴 $\sigma_i$ 的椭球（定理 8.16）。Eckart–Young 定理（定理 8.19）证明截断 SVD 是 Frobenius 与谱范数下的最佳低秩逼近，误差分别为 $(\sum_{i>k}\sigma_i^2)^{1/2}$ 与 $\sigma_{k+1}$。Moore–Penrose 伪逆（定义 8.20、定理 8.21）由 Penrose 四方程唯一刻画，给出最小二乘问题的最小范数解（推论 8.22）。

第四，PCA 与条件数。主成分是协方差矩阵谱分解的特征方向，方差为对应特征值，累积解释率 $\eta_k$ 度量降维的信息保留比例（定义 8.23、定理 8.24、定义 8.25）；PCA 与 SVD 的关系是精确的：载荷即右奇异向量，$\lambda_j=d_j^2/(T-1)$，得分即 $\boldsymbol{U}\boldsymbol{D}$，降维重构即最佳低秩逼近（定理 8.26）。条件数 $\operatorname{cond}(\boldsymbol{A})=\|\boldsymbol{A}\|\|\boldsymbol{A}^{-1}\|$（定义 8.27）给出相对误差放大的最优上界（定理 8.29、定理 8.30），谱条件数为 $\sigma_{\max}/\sigma_{\min}$（推论 8.28）。正规方程使条件数平方（定理 8.31），这是必须用 QR 或 SVD 替代它的根本原因。

在量化应用中，因子协方差模型的低秩加对角结构（定义 8.32、定理 8.33）以 $\lambda_{\min}\geqslant\min_i d_i$ 从结构上控制条件数，并借 Woodbury 公式把求逆代价从 $O(n^3)$ 降到 $O(nk^2)$；PCA 为收益率曲线与股票横截面提供经济可解释的少数风险因子；回归与组合优化的实现须遵循「不显式求逆、用三角求解、报告条件数、必要时正则化」的准则。分解的选择本质上是运算量、稳定性与结构信息三者的权衡，而条件数是衡量这一权衡的统一尺度。

## 习题

1. 设 $\boldsymbol{A}=\begin{bmatrix}1&2\\ 2&1\\ 2&4\end{bmatrix}$。用 Gram–Schmidt 过程求其 $QR$ 分解，使 $\boldsymbol{R}$ 的对角元为正，并验证 $\boldsymbol{Q}^\top\boldsymbol{Q}=\boldsymbol{I}_2$ 与 $\boldsymbol{Q}\boldsymbol{R}=\boldsymbol{A}$。

2. 对题 1 中的矩阵 $\boldsymbol{A}$，用 Householder 反射重新求 $QR$ 分解，比较两种方法所得 $\boldsymbol{R}$ 是否相同，并从定理 8.4 的唯一性说明原因。

3. 证明：若 $\boldsymbol{Q}\in\mathbb{R}^{n\times n}$ 既是上三角矩阵又是正交矩阵，则 $\boldsymbol{Q}$ 必为对角矩阵且对角元为 $\pm1$。由此说明为何 $QR$ 分解的唯一性必须依赖对角元的符号约定。

4. 设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 列满秩，$\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$。证明 $\operatorname{cond}_2(\boldsymbol{R})=\operatorname{cond}_2(\boldsymbol{A})$，并说明这一等式为何是 $QR$ 方法优于正规方程方法的关键。

5. 判定下列矩阵是否正定；若正定，求其 Cholesky 分解：
$$
\text{(a) }\begin{bmatrix}9&3\\ 3&5\end{bmatrix};\qquad
\text{(b) }\begin{bmatrix}2&1&0\\ 1&2&1\\ 0&1&2\end{bmatrix};\qquad
\text{(c) }\begin{bmatrix}1&2\\ 2&1\end{bmatrix}.
$$

6. 设 $\boldsymbol{A}\succ\boldsymbol{0}$，$\boldsymbol{A}=\boldsymbol{L}\boldsymbol{L}^\top$。证明 $\boldsymbol{A}^{-1}=\boldsymbol{L}^{-\top}\boldsymbol{L}^{-1}$ 亦正定，且 $\det\boldsymbol{A}=\bigl(\prod_{i}l_{ii}\bigr)^2$。再证明 $\boldsymbol{A}$ 的一切顺序主子矩阵均正定，并给出其 Cholesky 因子与 $\boldsymbol{L}$ 的对应子块的关系。

7. 设 $\boldsymbol{A}\in\mathbb{R}^{n\times n}$ 对称正定，$\boldsymbol{A}=\boldsymbol{L}\boldsymbol{L}^\top$。证明 $\boldsymbol{A}$ 的 Cholesky 因子与 $\boldsymbol{A}$ 的对称正定平方根 $\boldsymbol{A}^{1/2}$ 一般不相同，并给出两者相等的充要条件。

8. 求 $\boldsymbol{A}=\begin{bmatrix}0&1\\ -1&0\\ 1&1\end{bmatrix}$ 的全部奇异值，并写出其完整的 $3\times3$ 与 $3\times2$ 形式的奇异值分解。

9. 设 $\boldsymbol{A}=\begin{bmatrix}2&0\\ 0&1\end{bmatrix}$，$\boldsymbol{B}=\boldsymbol{A}\begin{bmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{bmatrix}$。证明 $\boldsymbol{B}$ 与 $\boldsymbol{A}$ 有相同的奇异值，并解释这一现象的几何含义。

10. 设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$，$\operatorname{rank}(\boldsymbol{A})=r$。证明 $\boldsymbol{A}\boldsymbol{A}^\top$ 与 $\boldsymbol{A}^\top\boldsymbol{A}$ 有相同的非零特征值（含重数），并由此推出 $\operatorname{tr}(\boldsymbol{A}\boldsymbol{A}^\top)=\operatorname{tr}(\boldsymbol{A}^\top\boldsymbol{A})=\sum_i\sigma_i^2$。

11. 设 $\boldsymbol{A}=\begin{bmatrix}3&1&0\\ 1&3&0\\ 0&0&2\end{bmatrix}$。求 $\boldsymbol{A}$ 的最佳秩一近似与最佳秩二近似（Frobenius 范数意义下），并给出相应的逼近误差。

12. 对题 11 的矩阵 $\boldsymbol{A}$，证明其最佳秩一近似在谱范数意义下的误差亦等于 $\sigma_2$；并证明截断 SVD 对任意酉不变范数均为最佳低秩逼近，即 $\min_{\operatorname{rank}(\boldsymbol{B})\leqslant k}\|\boldsymbol{A}-\boldsymbol{B}\|=\bigl\|(\sigma_{k+1},\dots,\sigma_r)\bigr\|$，右端为相应的对称规范函数范数。

13. 设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 秩为 $r$。证明 $(\boldsymbol{A}^\top\boldsymbol{A})^+=\boldsymbol{A}^+(\boldsymbol{A}^\top)^+$，并证明 $\boldsymbol{A}\boldsymbol{A}^+$ 与 $\boldsymbol{A}^+\boldsymbol{A}$ 均为对称幂等矩阵，其迹等于 $r$。

14. 设 $\boldsymbol{A}=\begin{bmatrix}1&1\\ 1&1\\ 1&2\end{bmatrix}$，$\boldsymbol{b}=(1,2,3)^\top$。求 $\boldsymbol{A}^+$，求最小二乘解 $\boldsymbol{x}^*=\boldsymbol{A}^+\boldsymbol{b}$，并计算残差向量与残差平方和，验证 $\boldsymbol{A}^\top\boldsymbol{r}=\boldsymbol{0}$。

15. 设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 行满秩（$m<n$）。证明方程 $\boldsymbol{A}\boldsymbol{x}=\boldsymbol{b}$ 对任意 $\boldsymbol{b}$ 相容，其最小范数解为 $\boldsymbol{x}^*=\boldsymbol{A}^\top(\boldsymbol{A}\boldsymbol{A}^\top)^{-1}\boldsymbol{b}$，且 $\boldsymbol{x}^*\in\mathcal{R}(\boldsymbol{A}^\top)$。

16. 设三资产收益率的样本协方差矩阵为
$$
\boldsymbol{S}=\begin{bmatrix}4&2&0\\ 2&4&2\\ 0&2&4\end{bmatrix}.
$$
求其全部特征值与单位特征向量，写出三个主成分的方差解释率，并给出用前两个主成分重构数据时的相对信息损失。

17. 设 $\boldsymbol{X}\in\mathbb{R}^{T\times n}$ 列中心化，$\boldsymbol{S}=\frac{1}{T-1}\boldsymbol{X}^\top\boldsymbol{X}$。证明：对任意正交矩阵 $\boldsymbol{W}\in\mathbb{R}^{n\times n}$，变换后数据 $\boldsymbol{X}\boldsymbol{W}$ 的协方差矩阵为 $\boldsymbol{W}^\top\boldsymbol{S}\boldsymbol{W}$，其迹与 $\boldsymbol{S}$ 相同；并说明为何 PCA 是唯一使协方差矩阵对角化的正交变换（在特征值互异时）。

18. 设 $\boldsymbol{A}=\begin{bmatrix}1&1\\ 1&1.001\end{bmatrix}$。计算 $\operatorname{cond}_2(\boldsymbol{A})$ 与 $\operatorname{cond}_\infty(\boldsymbol{A})$，并求右端项扰动 $\delta\boldsymbol{b}=(0,10^{-3})^\top$ 引起的解的相对变化，与定理 8.29 的上界比较。

19. 设 $\boldsymbol{A}=\boldsymbol{I}+\boldsymbol{E}$，$\|\boldsymbol{E}\|<1$。证明 $\operatorname{cond}(\boldsymbol{A})\leqslant\frac{1+\|\boldsymbol{E}\|}{1-\|\boldsymbol{E}\|}$，并由此说明接近单位矩阵的矩阵其条件数接近 $1$。再构造一族矩阵 $\{\boldsymbol{A}_n\}$，使 $\|\boldsymbol{A}_n\|_2$ 一致有界而 $\operatorname{cond}_2(\boldsymbol{A}_n)\to\infty$，并从奇异值的角度解释其原因。

20. 设 $\boldsymbol{A}\in\mathbb{R}^{m\times n}$ 列满秩，$\boldsymbol{G}=\boldsymbol{A}^\top\boldsymbol{A}$。证明 $\operatorname{cond}_2(\boldsymbol{G})=\operatorname{cond}_2(\boldsymbol{A})^2$，且 $\operatorname{cond}_2(\boldsymbol{G}^{-1})=\operatorname{cond}_2(\boldsymbol{G})$。再讨论：当 $\operatorname{cond}_2(\boldsymbol{A})=10^{8}$ 时，在双精度（$u\approx2.2\times10^{-16}$）下用 Cholesky 分解求解正规方程会发生什么，并给出定量的失效判据。

21. 设单因子模型中 $\boldsymbol{B}=(1.5,\ 1.0,\ 0.5)^\top$，$\boldsymbol{F}=[0.04]$，$\boldsymbol{D}=\operatorname{diag}(0.0004,\ 0.0009,\ 0.0016)$。按式（8.44）构造 $\boldsymbol{\Sigma}$，用式（8.45）给出 $\operatorname{cond}_2(\boldsymbol{\Sigma})$ 的上界，并用 Woodbury 公式（8.46）求 $\boldsymbol{\Sigma}^{-1}$。

22. 设 $\boldsymbol{\Sigma}\succ\boldsymbol{0}$，$\boldsymbol{\Sigma}=\boldsymbol{L}\boldsymbol{L}^\top$，期望收益向量为 $\boldsymbol{\mu}$。证明最小方差组合权重 $\boldsymbol{w}^*=\boldsymbol{\Sigma}^{-1}\boldsymbol{\mu}/(\boldsymbol{1}^\top\boldsymbol{\Sigma}^{-1}\boldsymbol{\mu})$ 满足
$$
\frac{\|\delta\boldsymbol{w}^*\|_2}{\|\boldsymbol{w}^*\|_2}\leqslant 2\operatorname{cond}_2(\boldsymbol{\Sigma})\frac{\|\delta\boldsymbol{\mu}\|_2}{\|\boldsymbol{\mu}\|_2}
$$
形式的扰动界（在 $\delta\boldsymbol{\Sigma}=\boldsymbol{0}$ 且扰动较小的假设下），并据此说明为何样本协方差矩阵的病态会导致最优组合权重剧烈波动。