# 第6章　特征值、对角化与谱定理

矩阵 $A$ 把 $\boldsymbol{x}$ 映为 $A\boldsymbol{x}$，通常既旋转又拉伸；但空间中常有特殊方向，沿其作用只是伸缩，即 $A\boldsymbol{x}$ 与 $\boldsymbol{x}$ 共线。刻画它们正是本章的出发点：比率称为特征值，方向上的非零向量称为特征向量，二者均为相似不变量。本章先以特征多项式、代数重数与几何重数为语言建立特征值理论，证明不同特征值的特征向量线性无关；继而给出可对角化的充要条件与 Cayley–Hamilton 定理；6.3 节讨论对称矩阵的正交对角化即谱定理及其应用。在量化研究中，协方差矩阵的谱分解给出风险的方向分解，马尔可夫链的长期行为由主导特征值决定，矩阵幂的快速计算服务于多期递推。学完本章，读者应能计算特征值与特征空间，判断并完成对角化，准确陈述谱定理，并将其用于协方差分析与幂次递推。

## 6.1 特征值、特征向量与特征多项式

**定义 6.1（特征值与特征向量）**

设 $A$ 为数域 $\mathbb{F}$（通常取 $\mathbb{R}$ 或 $\mathbb{C}$）上的 $n$ 阶方阵。若存在 $\lambda\in\mathbb{F}$ 与非零向量 $\boldsymbol{x}\in\mathbb{F}^n$ 使

$$A\boldsymbol{x}=\lambda\boldsymbol{x}, \tag{6.1}$$

则称 $\lambda$ 为 $A$ 的特征值，$\boldsymbol{x}$ 为 $A$ 的属于 $\lambda$ 的特征向量。

式 (6.1) 表示直线 $\{t\boldsymbol{x}:t\in\mathbb{R}\}$ 在 $A$ 下不变，$A$ 在其上只作伸缩。

**定义 6.2（特征多项式与代数重数）**

设 $A$ 为 $n$ 阶方阵，称

$$p_A(\lambda)=\det(A-\lambda I) \tag{6.2}$$

为 $A$ 的特征多项式，方程 $p_A(\lambda)=0$ 为特征方程。若 $\lambda_0$ 是 $p_A$ 的 $m$ 重根，则 $\lambda_0$ 是 $A$ 的特征值，$m$ 称为其代数重数，记作 $m_a(\lambda_0)=m$。

由 Leibniz 展开，$p_A$ 是 $n$ 次多项式，首项为 $(-1)^n\lambda^n$；$\lambda_0$ 是特征值当且仅当 $A-\lambda_0 I$ 奇异，即 $p_A(\lambda_0)=0$。在 $\mathbb{C}$ 上 $p_A$ 完全分解，故 $A$ 恰有 $n$ 个特征值（计入重数）。

**定义 6.3（特征空间与几何重数）**

设 $\lambda_0$ 为 $A$ 的特征值，称

$$E_{\lambda_0}=\ker(A-\lambda_0 I)=\{\boldsymbol{x}\in\mathbb{F}^n:(A-\lambda_0 I)\boldsymbol{x}=\boldsymbol{0}\} \tag{6.3}$$

为属于 $\lambda_0$ 的特征空间，其维数 $m_g(\lambda_0)=\dim E_{\lambda_0}$ 称为几何重数。

$E_{\lambda_0}$ 是齐次方程组 $(A-\lambda_0 I)\boldsymbol{x}=\boldsymbol{0}$ 的解空间，由属于 $\lambda_0$ 的全部特征向量再添零向量构成。由秩—零化度定理，$m_g(\lambda_0)=n-\operatorname{rank}(A-\lambda_0 I)\ge 1$；又总有 $m_g(\lambda_0)\le m_a(\lambda_0)$，二者可严格不等（其证明需 Jordan 标准形）。

**定理 6.4（不同特征值的特征向量线性无关）**

设 $\lambda_1,\dots,\lambda_k$ 是 $A$ 的互不相同的特征值，$\boldsymbol{x}_1,\dots,\boldsymbol{x}_k$ 分别是属于它们的特征向量，则 $\boldsymbol{x}_1,\dots,\boldsymbol{x}_k$ 线性无关。

**证明**

对 $k$ 作归纳。$k=1$ 时 $\boldsymbol{x}_1\neq\boldsymbol{0}$，结论显然。设结论对 $k-1$ 成立，并设 $\sum_{i=1}^{k}c_i\boldsymbol{x}_i=\boldsymbol{0}$。左乘 $A$ 得 $\sum_{i=1}^{k}c_i\lambda_i\boldsymbol{x}_i=\boldsymbol{0}$；从中减去前一式的 $\lambda_k$ 倍，$\boldsymbol{x}_k$ 的项消去：

$$\sum_{i=1}^{k-1}c_i(\lambda_i-\lambda_k)\boldsymbol{x}_i=\boldsymbol{0}.$$

由归纳假设，$\boldsymbol{x}_1,\dots,\boldsymbol{x}_{k-1}$ 线性无关，故 $c_i(\lambda_i-\lambda_k)=0$；因 $\lambda_i\neq\lambda_k$，得 $c_i=0$（$i<k$）。代回原式有 $c_k\boldsymbol{x}_k=\boldsymbol{0}$，于是 $c_k=0$，归纳完成。

□

**命题 6.5（迹与行列式等于特征值之和与之积）**

设 $A$ 的全部特征值（按代数重数计入）为 $\lambda_1,\dots,\lambda_n$，则

$$\operatorname{tr}(A)=\sum_{i=1}^{n}\lambda_i,\qquad \det(A)=\prod_{i=1}^{n}\lambda_i. \tag{6.4}$$

**证明**

在 $\mathbb{C}$ 上有 $p_A(\lambda)=(-1)^n\prod_{i=1}^{n}(\lambda-\lambda_i)$。展开 $\det(A-\lambda I)$，含 $\lambda^{n-1}$ 的项只能来自主对角线元素之积 $\prod_{i=1}^{n}(a_{ii}-\lambda)$，其系数为 $(-1)^{n-1}\operatorname{tr}(A)$；与因式分解式的同次项系数 $(-1)^{n-1}\sum_{i=1}^{n}\lambda_i$ 比较得第一式。令 $\lambda=0$，左端为 $\det A$，右端为 $\prod_{i=1}^{n}\lambda_i$，得第二式。

□

**例 6.1**

求矩阵 $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ 的特征值与特征向量。

**解**

$$p_A(\lambda)=(4-\lambda)(3-\lambda)-2=\lambda^2-7\lambda+10=(\lambda-5)(\lambda-2),$$

故特征值为 $\lambda_1=5,\lambda_2=2$。

对 $\lambda_1=5$，$A-5I=\begin{pmatrix}-1&1\\2&-2\end{pmatrix}$，方程组化为 $x_1=x_2$，取 $\boldsymbol{x}_1=(1,1)^\top$，$E_5=\operatorname{span}\{\boldsymbol{x}_1\}$。对 $\lambda_2=2$，$A-2I=\begin{pmatrix}2&1\\2&1\end{pmatrix}$，方程组化为 $2x_1+x_2=0$，取 $\boldsymbol{x}_2=(1,-2)^\top$，$E_2=\operatorname{span}\{\boldsymbol{x}_2\}$。两个重数均为 $1$，故 $A$ 可对角化。

**例 6.2**

设 $B=\begin{pmatrix}2&1\\0&2\end{pmatrix}$，求其特征值与特征空间，并说明 $B$ 不可对角化。

**解**

$B$ 为上三角矩阵，$p_B(\lambda)=(2-\lambda)^2$，故唯一特征值为 $\lambda=2$，代数重数 $m_a(2)=2$。又

$$B-2I=\begin{pmatrix}0&1\\0&0\end{pmatrix}$$

的秩为 $1$，方程组等价于 $x_2=0$，于是 $E_2=\operatorname{span}\{(1,0)^\top\}$，几何重数 $m_g(2)=1<m_a(2)$。若 $B$ 可对角化，应有两个线性无关的特征向量，但全部特征向量都在一维空间 $E_2$ 中，矛盾，故 $B$ 不可对角化。

## 6.2 对角化

**定义 6.6（相似与对角化）**

设 $A,B$ 为 $n$ 阶方阵。若存在可逆矩阵 $P$ 使

$$B=P^{-1}AP, \tag{6.5}$$

则称 $A$ 与 $B$ 相似，记作 $A\sim B$；若 $A$ 相似于某个对角矩阵 $D=\operatorname{diag}(d_1,d_2,\dots,d_n)$，则称 $A$ 可对角化。

相似的含义是基的更换，故秩、行列式、迹、特征多项式、特征值及各重数均为相似不变量；对角化即选取由特征向量构成的基，使映射呈对角形，各坐标互不耦合。

**定理 6.7（可对角化的充要条件）**

设 $A$ 为 $n$ 阶方阵，则下列三条等价：（i）$A$ 可对角化；（ii）存在 $A$ 的 $n$ 个线性无关的特征向量；（iii）每个特征值的几何重数等于代数重数，即 $\sum_{\lambda}m_g(\lambda)=\sum_{\lambda}m_a(\lambda)=n$。

**证明**

(i)$\Rightarrow$(ii)：设 $D=P^{-1}AP=\operatorname{diag}(d_1,\dots,d_n)$。由 $AP=PD$ 逐列比较得 $A\boldsymbol{p}_j=d_j\boldsymbol{p}_j$；$P$ 可逆，故各列非零且线性无关。

(ii)$\Rightarrow$(i)：设 $A\boldsymbol{x}_j=\lambda_j\boldsymbol{x}_j$ 且 $\boldsymbol{x}_1,\dots,\boldsymbol{x}_n$ 线性无关。令 $P=(\boldsymbol{x}_1\ \cdots\ \boldsymbol{x}_n)$，$D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$，则 $AP=(\lambda_1\boldsymbol{x}_1\ \cdots\ \lambda_n\boldsymbol{x}_n)=PD$，于是

$$D=P^{-1}AP,\qquad A=PDP^{-1}. \tag{6.6}$$

(i)$\Rightarrow$(iii)：相似矩阵特征多项式相同，$p_A(\lambda)=\prod_{j=1}^{n}(d_j-\lambda)$，故 $m_a(\lambda_0)$ 等于对角元中取值 $\lambda_0$ 的个数 $r$，而 $m_g(D,\lambda_0)=r$。由 $A-\lambda_0 I=P(D-\lambda_0 I)P^{-1}$ 知两者秩相同，故 $m_g(A,\lambda_0)=m_a(\lambda_0)$。

(iii)$\Rightarrow$(ii)：在各 $E_{\lambda_i}$ 中取一组基，共得 $\sum_i m_g(\lambda_i)=n$ 个向量，由定理 6.4 它们线性无关。

□

**定理 6.8（Cayley–Hamilton 定理）**

设 $p_A(\lambda)=\det(A-\lambda I)=c_n\lambda^n+c_{n-1}\lambda^{n-1}+\cdots+c_1\lambda+c_0$，则

$$p_A(A)=c_nA^n+c_{n-1}A^{n-1}+\cdots+c_1A+c_0I=O. \tag{6.7}$$

**证明**

先设 $A$ 可对角化，$A=PDP^{-1}$，$D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。对任意多项式 $q$ 有 $q(A)=P\,q(D)\,P^{-1}$ 且 $q(D)=\operatorname{diag}(q(\lambda_1),\dots,q(\lambda_n))$；取 $q=p_A$，因 $p_A(\lambda_j)=0$，得 $p_A(A)=O$。

对不可对角化的矩阵此论证失效，严格证明需额外工具：或由伴随矩阵恒等式 $(A-\lambda I)\operatorname{adj}(A-\lambda I)=p_A(\lambda)I$，把 $\operatorname{adj}(A-\lambda I)$ 写成 $\lambda$ 的矩阵多项式后比较同次幂系数（不能草率地令 $\lambda=A$，乘法顺序需专门论证）；或由可对角化矩阵的稠密性取极限，而稠密性依赖 Jordan 标准形。两者均超出本节范围。

□

**例 6.3**

设 $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$，求可逆矩阵 $P$ 与对角矩阵 $D$ 使 $D=P^{-1}AP$，并计算 $A^n$。

**解**

$$p_A(\lambda)=(1-\lambda)^2-4=\lambda^2-2\lambda-3=(\lambda-3)(\lambda+1),$$

特征值 $3,-1$ 互异，故 $A$ 可对角化。解 $(A-3I)\boldsymbol{x}=\boldsymbol{0}$ 得 $x_1=x_2$，取 $\boldsymbol{x}_1=(1,1)^\top$；解 $(A+I)\boldsymbol{x}=\boldsymbol{0}$ 得 $x_1=-x_2$，取 $\boldsymbol{x}_2=(1,-1)^\top$。令

$$P=\begin{pmatrix}1&1\\1&-1\end{pmatrix},\qquad D=\begin{pmatrix}3&0\\0&-1\end{pmatrix},\qquad P^{-1}=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},$$

其中 $\det P=-2$，$A=PDP^{-1}$，连乘时 $P^{-1}P$ 相消：

$$A^n=PD^nP^{-1}=P\begin{pmatrix}3^n&0\\0&(-1)^n\end{pmatrix}P^{-1}=\frac12\begin{pmatrix}3^n+(-1)^n&3^n-(-1)^n\\3^n-(-1)^n&3^n+(-1)^n\end{pmatrix}. \tag{6.8}$$

对角化把随 $n$ 增长的连乘化为两个标量幂的加减。这一结果在量化研究中最直接的用途是协方差矩阵的处理：设随机向量 $\boldsymbol{x}$ 的协方差矩阵 $\Sigma$ 为实对称半正定矩阵，若存在正交矩阵 $P$ 使

$$\Sigma=P\Lambda P^\top,\qquad \Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\ \lambda_i\ge 0, \tag{6.9}$$

则令 $\boldsymbol{y}=P^\top\boldsymbol{x}$ 有 $\operatorname{Cov}(\boldsymbol{y})=P^\top\Sigma P=\Lambda$ 为对角阵，即新坐标两两不相关，$\lambda_i$ 度量第 $i$ 个方向的方差贡献，按 $\lambda_i$ 排序保留前若干方向即得主成分分析。式 (6.9) 中分解的存在性与 $P$ 的正交性并非对一般矩阵成立，这正是 6.3 节谱定理的内容。

## 6.3 实对称矩阵的谱定理

一般可对角化矩阵的特征向量未必正交，过渡矩阵也未必好用。对称性带来本质改善：特征值必为实数，特征向量可取为正交的，对角化由正交矩阵完成。

**定理 6.9（实对称矩阵的谱性质）**

设 $A$ 为 $n$ 阶实对称矩阵（$A^\top = A$）。则（i）$A$ 的特征值全为实数；（ii）属于不同特征值的特征向量正交。

**证明**

（i）设 $A\boldsymbol{x} = \lambda\boldsymbol{x}$，$\boldsymbol{x} \ne \boldsymbol{0}$，$\boldsymbol{x}^*$ 表共轭转置。取共轭转置并用 $A^* = \bar{A}^\top = A^\top = A$，得 $\boldsymbol{x}^*A = \bar{\lambda}\boldsymbol{x}^*$；右乘 $\boldsymbol{x}$ 得 $\boldsymbol{x}^*A\boldsymbol{x} = \bar{\lambda}\,\boldsymbol{x}^*\boldsymbol{x}$，而左乘原式得 $\boldsymbol{x}^*A\boldsymbol{x} = \lambda\,\boldsymbol{x}^*\boldsymbol{x}$。相减有 $(\lambda - \bar{\lambda})\boldsymbol{x}^*\boldsymbol{x} = 0$，因 $\boldsymbol{x}^*\boldsymbol{x} = \sum_i |x_i|^2 > 0$，故 $\lambda \in \mathbb{R}$。

（ii）设 $A\boldsymbol{x} = \lambda\boldsymbol{x}$、$A\boldsymbol{y} = \mu\boldsymbol{y}$，$\lambda \ne \mu$，则

$$
\lambda\,\boldsymbol{x}^\top\boldsymbol{y} = (A\boldsymbol{x})^\top\boldsymbol{y} = \boldsymbol{x}^\top A^\top\boldsymbol{y} = \boldsymbol{x}^\top A\boldsymbol{y} = \mu\,\boldsymbol{x}^\top\boldsymbol{y},
$$

故 $(\lambda - \mu)\boldsymbol{x}^\top\boldsymbol{y} = 0$，即 $\boldsymbol{x}^\top\boldsymbol{y} = 0$。

□

**注记（Hermitian 情形）**　复矩阵中相应条件是 $A^* = \bar{A}^\top = A$，称为 Hermitian 矩阵。上述证明逐字成立：特征值仍为实数，不同特征值的特征向量在 $\boldsymbol{x}^*\boldsymbol{y}$ 意义下正交，谱定理中的正交矩阵换成酉矩阵，$A = U\Lambda U^*$，$\Lambda$ 为实对角矩阵。协方差矩阵与相关矩阵总是实对称的，故本书主要用实的情形。

**定理 6.10（谱定理）**

实矩阵 $A$ 对称的充分必要条件是：存在正交矩阵 $Q$ 与实对角矩阵 $\Lambda = \mathrm{diag}(\lambda_1,\dots,\lambda_n)$，使

$$
A = Q\Lambda Q^\top = \sum_{i=1}^n \lambda_i\,\boldsymbol{q}_i\boldsymbol{q}_i^\top , \tag{6.10}
$$

其中 $\boldsymbol{q}_1,\dots,\boldsymbol{q}_n$ 为 $Q$ 的列，构成 $\mathbb{R}^n$ 的标准正交特征向量组，$\lambda_i$ 为 $\boldsymbol{q}_i$ 所属特征值（按重数计）。

**证明**

充分性由 $(Q\Lambda Q^\top)^\top = Q\Lambda^\top Q^\top = Q\Lambda Q^\top$ 立得。必要性对 $n$ 归纳：$n = 1$ 平凡，设结论对 $n-1$ 阶实对称矩阵成立。由定理 6.9 取实特征值 $\lambda_1$ 与实单位特征向量 $\boldsymbol{q}_1$（实系数齐次方程组 $(A - \lambda_1 I)\boldsymbol{x} = \boldsymbol{0}$ 有非零实解），并扩充为标准正交基，记 $U = [\boldsymbol{q}_1,\boldsymbol{u}_2,\dots,\boldsymbol{u}_n]$。关键是对称性保证 $\boldsymbol{q}_1$ 的正交补不变：若 $\boldsymbol{q}_1^\top\boldsymbol{y} = 0$，则 $\boldsymbol{q}_1^\top(A\boldsymbol{y}) = (A\boldsymbol{q}_1)^\top\boldsymbol{y} = \lambda_1\boldsymbol{q}_1^\top\boldsymbol{y} = 0$；一般矩阵无此性质，这正是可对角化与可正交对角化的分野。于是 $U^\top AU$ 的第一列为 $\lambda_1\boldsymbol{e}_1$，又它对称，故第一行为 $\lambda_1\boldsymbol{e}_1^\top$：

$$
U^\top AU = \begin{pmatrix} \lambda_1 & \boldsymbol{0}^\top \\ \boldsymbol{0} & B \end{pmatrix},
$$

其中 $B$ 是 $A$ 限制在 $\boldsymbol{q}_1^\perp$ 上的矩阵，为 $n-1$ 阶实对称矩阵。由归纳假设有正交矩阵 $V$ 使 $V^\top BV = \mathrm{diag}(\lambda_2,\dots,\lambda_n)$。取 $Q = U\,\mathrm{diag}(1,V)$，则 $Q$ 正交且 $Q^\top AQ = \Lambda$，即 $A = Q\Lambda Q^\top$，$Q$ 的列皆为单位特征向量且两两正交。归纳完成。

□

**例 6.4**

对 $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ 求正交对角化 $A = Q\Lambda Q^\top$。

**解**

$\det(A - \lambda I) = (2-\lambda)^2 - 1$，故 $\lambda_1 = 3$、$\lambda_2 = 1$。$\lambda_1 = 3$ 时方程为 $-x_1 + x_2 = 0$，取 $\boldsymbol{v}_1 = (1,1)^\top$，$\|\boldsymbol{v}_1\| = \sqrt{2}$，单位化得 $\boldsymbol{q}_1 = \tfrac{1}{\sqrt{2}}(1,1)^\top$；$\lambda_2 = 1$ 时 $x_1 + x_2 = 0$，取 $\boldsymbol{v}_2 = (1,-1)^\top$，得 $\boldsymbol{q}_2 = \tfrac{1}{\sqrt{2}}(1,-1)^\top$。特征值互异，正交性由定理 6.9 保证，直接验证亦有 $\boldsymbol{q}_1^\top\boldsymbol{q}_2 = 0$。于是

$$
Q = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \qquad \Lambda = \begin{pmatrix} 3 & 0 \\ 0 & 1 \end{pmatrix}, \qquad Q^{-1} = Q^\top = Q,
$$

且 $\mathrm{tr}\Lambda = 4 = \mathrm{tr}A$、$\det\Lambda = 3 = \det A$。两特征值皆正，由定理 6.11 知 $A$ 正定。

## 6.4 正定性的谱刻画

**定理 6.11（正定性的谱刻画）**

设 $A$ 为 $n$ 阶实对称矩阵，特征值为 $\lambda_1,\dots,\lambda_n$。则 $A$ 正定当且仅当所有 $\lambda_i > 0$；半正定当且仅当所有 $\lambda_i \ge 0$；负定（半负定）当且仅当所有 $\lambda_i < 0$（$\lambda_i \le 0$）。

**证明**

由定理 6.10，$A = Q\Lambda Q^\top$。令 $\boldsymbol{y} = Q^\top\boldsymbol{x}$，则 $\boldsymbol{x} = Q\boldsymbol{y}$，正交性给出 $\|\boldsymbol{y}\| = \|\boldsymbol{x}\|$，故 $\boldsymbol{x} \ne \boldsymbol{0}$ 当且仅当 $\boldsymbol{y} \ne \boldsymbol{0}$，且

$$
\boldsymbol{x}^\top A\boldsymbol{x} = \boldsymbol{y}^\top\Lambda\boldsymbol{y} = \sum_{i=1}^n \lambda_i y_i^2 . \tag{6.11}
$$

若各 $\lambda_i > 0$，则式（6.11）对一切 $\boldsymbol{x} \ne \boldsymbol{0}$ 严格为正，$A$ 正定；反之取 $\boldsymbol{x} = \boldsymbol{q}_i$，得 $\lambda_i = \boldsymbol{q}_i^\top A\boldsymbol{q}_i > 0$。把严格不等号换成非负号，同样两步给出半正定的刻画；对 $-A$（特征值为 $-\lambda_i$）应用已证结论即得负定与半负定情形。

□

式（6.11）的几何意义是：$\boldsymbol{x} = Q\boldsymbol{y}$ 是一次旋转，它把二次型化为标准形，等高面 $\boldsymbol{x}^\top A\boldsymbol{x} = c$ 成为半轴长 $\sqrt{c/\lambda_i}$、方向沿 $\boldsymbol{q}_i$ 的椭球面。

**推论 6.12（正定矩阵的基本性质）**

设 $A$ 为 $n$ 阶正定对称矩阵。则（i）$A$ 可逆且 $A^{-1}$ 正定；（ii）$\det A > 0$，各阶顺序主子式为正；（iii）存在唯一的正定对称矩阵 $A^{1/2}$ 使 $A = A^{1/2}A^{1/2}$，取 $B = A^{1/2}$ 即得 $A = BB^\top$ 型分解。

**证明**

$\det A = \prod_i \lambda_i > 0$，故可逆；$A^{-1} = Q\Lambda^{-1}Q^\top$ 的特征值为 $1/\lambda_i > 0$，由定理 6.11 仍正定；主子矩阵限制在坐标子空间上仍正定，故主子式为正。令 $A^{1/2} = Q\,\mathrm{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})Q^\top$，则它对称、特征值全正且平方为 $A$；唯一性来自 $A^{1/2}$ 必须与 $A$ 共享特征向量而特征值为 $\sqrt{\lambda_i}$。

□

**例 6.5**

设 $A(a) = \begin{pmatrix} a & 2 \\ 2 & a \end{pmatrix}$，$a \in \mathbb{R}$。求 $A(a)$ 正定与半正定时 $a$ 的范围。

**解**

$\det(A(a) - \lambda I) = (a-\lambda)^2 - 4$，故特征值为 $\lambda = a \pm 2$。由定理 6.11，正定当且仅当最小特征值 $a - 2 > 0$，即 $a > 2$；半正定当且仅当 $a \ge 2$。$a = 2$ 时 $\det A = 0$，矩阵奇异，恰为正定与半正定的分界。若改用顺序主子式，需 $a > 0$ 与 $a^2 - 4 > 0$，联立同得 $a > 2$。

## 6.5 幂迭代与矩阵指数

谱定理给出两条通道：数值上求主特征对的幂迭代，以及线性系统 $\boldsymbol{x}' = A\boldsymbol{x}$ 的解析解。幂迭代取 $\boldsymbol{x}_0 \ne \boldsymbol{0}$，令

$$
\boldsymbol{x}_{k+1} = \frac{A\boldsymbol{x}_k}{\|A\boldsymbol{x}_k\|}, \qquad \rho_k = \frac{\boldsymbol{x}_k^\top A\boldsymbol{x}_k}{\boldsymbol{x}_k^\top\boldsymbol{x}_k}, \tag{6.12}
$$

其中 $\rho_k$ 称为 Rayleigh 商，用作特征值的估计量。

**命题 6.13（幂迭代的收敛率）**

设 $A$ 为实对称矩阵，特征值按模排列 $|\lambda_1| > |\lambda_2| \ge \cdots \ge |\lambda_n|$，对应标准正交特征向量为 $\boldsymbol{q}_i$。若 $\boldsymbol{q}_1^\top\boldsymbol{x}_0 \ne 0$，则 $\boldsymbol{x}_k$ 收敛到 $\pm\boldsymbol{q}_1$、$\rho_k$ 收敛到 $\lambda_1$，且存在与 $k$ 无关的常数 $C, C' > 0$ 使

$$
\sin\angle(\boldsymbol{x}_k, \boldsymbol{q}_1) \le C\left|\frac{\lambda_2}{\lambda_1}\right|^{k}, \qquad |\rho_k - \lambda_1| \le C'\left|\frac{\lambda_2}{\lambda_1}\right|^{2k}. \tag{6.13}
$$

**证明**

按标准正交基展开 $\boldsymbol{x}_0 = \sum_i c_i\boldsymbol{q}_i$，$c_i = \boldsymbol{q}_i^\top\boldsymbol{x}_0$，$c_1 \ne 0$。由 $A^k\boldsymbol{q}_i = \lambda_i^k\boldsymbol{q}_i$ 提出主项，

$$
A^k\boldsymbol{x}_0 = \lambda_1^k c_1\left(\boldsymbol{q}_1 + \sum_{i\ge 2}\frac{c_i}{c_1}\left(\frac{\lambda_i}{\lambda_1}\right)^{k}\boldsymbol{q}_i\right) = \lambda_1^k c_1(\boldsymbol{q}_1 + \boldsymbol{\varepsilon}_k),
$$

其中 $\|\boldsymbol{\varepsilon}_k\|$ 被 $\big|\sum_{i\ge 2}c_i/c_1\big|\cdot|\lambda_2/\lambda_1|^k$ 控制。归一化只改变长度不改变方向，而 $\sin\angle(\boldsymbol{x}_k,\boldsymbol{q}_1) = \|\boldsymbol{\varepsilon}_k\|/\|\boldsymbol{q}_1 + \boldsymbol{\varepsilon}_k\|$，故得式（6.13）第一式。又 $\|\boldsymbol{x}_k\| = 1$ 时 $\rho_k - \lambda_1 = \sum_{i\ge 2}(\lambda_i - \lambda_1)(\boldsymbol{q}_i^\top\boldsymbol{x}_k)^2$ 是方向分量的二次量，故以 $|\lambda_2/\lambda_1|^{2k}$ 衰减。

□

收敛快慢由谱隙比值 $|\lambda_2/\lambda_1|$ 决定，比值接近 1 时极慢，这是 PageRank 一类算法必须加阻尼的原因。随机取初值时 $\boldsymbol{q}_1^\top\boldsymbol{x}_0 \ne 0$ 以概率 1 成立；若 $|\lambda_1| = |\lambda_2|$，迭代一般在两方向间振荡而不收敛。矩阵指数则由级数定义：

$$
\mathrm{e}^{At} = \sum_{k=0}^{\infty} \frac{(At)^k}{k!} = I + At + \frac{A^2 t^2}{2!} + \cdots , \tag{6.14}
$$

它对任意方阵与实数 $t$ 收敛，因为 $\|(At)^k/k!\| \le (\|A\|\,|t|)^k/k!$ 构成收敛的数值级数。

**命题 6.14（矩阵指数的谱计算）**

设实对称矩阵 $A = Q\Lambda Q^\top$，$\Lambda = \mathrm{diag}(\lambda_1,\dots,\lambda_n)$。则

$$
\mathrm{e}^{At} = Q\,\mathrm{e}^{\Lambda t}Q^\top = Q\,\mathrm{diag}\big(\mathrm{e}^{\lambda_1 t},\dots,\mathrm{e}^{\lambda_n t}\big)Q^\top = \sum_{i=1}^n \mathrm{e}^{\lambda_i t}\boldsymbol{q}_i\boldsymbol{q}_i^\top , \tag{6.15}
$$

且初值问题 $\boldsymbol{x}'(t) = A\boldsymbol{x}(t)$、$\boldsymbol{x}(0) = \boldsymbol{x}_0$ 的唯一解为

$$
\boldsymbol{x}(t) = \mathrm{e}^{At}\boldsymbol{x}_0 = \sum_{i=1}^n \big(\boldsymbol{q}_i^\top\boldsymbol{x}_0\big)\,\mathrm{e}^{\lambda_i t}\,\boldsymbol{q}_i . \tag{6.16}
$$

**证明**

由 $Q^\top Q = I$ 逐项相消得 $(Q\Lambda Q^\top)^k = Q\Lambda^kQ^\top$。代入式（6.14）并利用绝对收敛交换求和与乘法：$\mathrm{e}^{At} = \sum_k Q\Lambda^kQ^\top t^k/k! = Q\big(\sum_k \Lambda^k t^k/k!\big)Q^\top = Q\,\mathrm{e}^{\Lambda t}Q^\top$。对角矩阵的幂仍为对角矩阵，故幂级数逐元素作用，$\mathrm{e}^{\Lambda t} = \mathrm{diag}(\mathrm{e}^{\lambda_i t})$。对式（6.14）逐项求导得 $\frac{\mathrm{d}}{\mathrm{d}t}\mathrm{e}^{At} = A\mathrm{e}^{At}$，且 $\mathrm{e}^{A\cdot 0} = I$，故 $\mathrm{e}^{At}\boldsymbol{x}_0$ 是解，唯一性由线性方程组理论给出。

□

式（6.16）说明解是 $n$ 个指数模态的叠加，初值只决定各模态权重：$\lambda_i < 0$ 者衰减，$\lambda_i > 0$ 者增长，$\lambda_i = 0$ 者守恒，长期行为由最大特征值支配。这与幂迭代选出主方向，是同一现象的连续与离散两个版本。

**例 6.6**

设 $A = \begin{pmatrix} -2 & 1 \\ 1 & -2 \end{pmatrix}$，$\boldsymbol{x}_0 = (1,0)^\top$。求 $\mathrm{e}^{At}$ 与 $\boldsymbol{x}' = A\boldsymbol{x}$、$\boldsymbol{x}(0) = \boldsymbol{x}_0$ 的解，并说明长期行为。

**解**

特征方程 $(\lambda + 2)^2 - 1 = 0$ 给出 $\lambda_1 = -1$、$\lambda_2 = -3$；单位特征向量为 $\boldsymbol{q}_1 = \tfrac{1}{\sqrt{2}}(1,1)^\top$、$\boldsymbol{q}_2 = \tfrac{1}{\sqrt{2}}(1,-1)^\top$。由式（6.15）与式（6.16），并利用 $\boldsymbol{q}_1^\top\boldsymbol{x}_0 = \boldsymbol{q}_2^\top\boldsymbol{x}_0 = \tfrac{1}{\sqrt{2}}$，得

$$
\mathrm{e}^{At} = \frac{1}{2}\begin{pmatrix} \mathrm{e}^{-t} + \mathrm{e}^{-3t} & \mathrm{e}^{-t} - \mathrm{e}^{-3t} \\ \mathrm{e}^{-t} - \mathrm{e}^{-3t} & \mathrm{e}^{-t} + \mathrm{e}^{-3t} \end{pmatrix}, \qquad
\boldsymbol{x}(t) = \frac{1}{2}\begin{pmatrix} \mathrm{e}^{-t} + \mathrm{e}^{-3t} \\ \mathrm{e}^{-t} - \mathrm{e}^{-3t} \end{pmatrix}.
$$

两特征值均为负，系统全局渐近稳定，$\boldsymbol{x}(t) \to \boldsymbol{0}$；$t \to \infty$ 时衰减最慢的模态 $\mathrm{e}^{-t}\boldsymbol{q}_1$ 支配，故 $x_2(t)/x_1(t) \to 1$，解的方向趋于 $\boldsymbol{q}_1$。这对应两个相互耦合的衰减过程；离散复利的极限 $\lim_{m\to\infty}\big(I + \tfrac{t}{m}A\big)^m = \mathrm{e}^{At}$ 给出同一矩阵形式。

## 6.6 量化金融中的谱分解

$n$ 项资产收益率 $\boldsymbol{r}$ 的协方差矩阵为 $\Sigma = \mathbb{E}\big[(\boldsymbol{r}-\boldsymbol{\mu})(\boldsymbol{r}-\boldsymbol{\mu})^\top\big]$，$\boldsymbol{\mu} = \mathbb{E}[\boldsymbol{r}]$。它天然对称，且对任意权重 $\boldsymbol{w}$ 有 $\boldsymbol{w}^\top\Sigma\boldsymbol{w} = \mathbb{E}\big[(\boldsymbol{w}^\top(\boldsymbol{r}-\boldsymbol{\mu}))^2\big] \ge 0$，故半正定——$\Sigma$ 正是组合方差这一非负量的矩阵编码，当不存在方差为零的确定性线性组合时它正定。定理 6.10 给出谱分解

$$
\Sigma = Q\Lambda Q^\top = \sum_{i=1}^n \lambda_i\,\boldsymbol{q}_i\boldsymbol{q}_i^\top, \qquad \lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_n \ge 0. \tag{6.17}
$$

令 $y_i = \boldsymbol{q}_i^\top(\boldsymbol{r}-\boldsymbol{\mu})$，即把去均值收益率投影到第 $i$ 个特征方向。由式（6.11）与正交性，$\mathrm{Var}(y_i) = \boldsymbol{q}_i^\top\Sigma\boldsymbol{q}_i = \lambda_i$，$\mathrm{Cov}(y_i,y_j) = \lambda_j\boldsymbol{q}_i^\top\boldsymbol{q}_j = 0$（$i \ne j$）。因此 $\boldsymbol{q}_i$ 是第 $i$ 个主成分方向，$\lambda_i$ 是其方差，$y_1,\dots,y_n$ 是一组互不相关的共同因子。几何上，$Q$ 是一次旋转，把与坐标轴斜交的协方差椭球转到主轴与坐标轴重合，$\sqrt{\lambda_i}$ 正比于第 $i$ 根半轴长度；去相关因而不是近似，而是坐标系的刚体变换，它把彼此纠缠的资产收益重写为独立波动的因子，这正是利率曲线「水平—斜率—曲率」三因子之所以有效的原因。方差解释比例为 $\lambda_i/\mathrm{tr}\Sigma$，因为旋转不改变迹，而 $\mathrm{tr}\Sigma = \sum_i\lambda_i$ 是全部资产方差之和，总风险被完整分配到各主成分上。因子风险模型 $\Sigma \approx BFB^\top + D$ 可由谱截断 $\Sigma_r = \sum_{i\le r}\lambda_i\boldsymbol{q}_i\boldsymbol{q}_i^\top$ 直接构造，它是 Frobenius 范数与谱范数意义下逼近 $\Sigma$ 的最优秩 $r$ 矩阵，误差为 $\sum_{i>r}\lambda_i$。截断同时使风险归因结构清晰，因为

$$
\boldsymbol{w}^\top\Sigma\boldsymbol{w} = \sum_{i=1}^n \lambda_i\big(\boldsymbol{q}_i^\top\boldsymbol{w}\big)^2, \tag{6.18}
$$

其中 $\boldsymbol{q}_i^\top\boldsymbol{w}$ 是组合在第 $i$ 个主成分上的暴露，$\lambda_i(\boldsymbol{q}_i^\top\boldsymbol{w})^2$ 是其绝对风险贡献，$\boldsymbol{w}^\top\Sigma\boldsymbol{q}_i$ 为边际风险贡献，风险平价策略即以此为依据。当资产数远超观测期数时，样本协方差的小特征值系统性偏低、大特征值系统性偏高，截断相当于一种正则化，能改善组合权重的稳定性与样本外表现。数值上须警惕 $\lambda_n$ 接近零时 $\Sigma$ 趋于病态：条件数 $\kappa(\Sigma) = \lambda_1/\lambda_n$ 极大，求解 $\Sigma\boldsymbol{w} = \boldsymbol{b}$（最优权重、风险归因方程）或求 $\Sigma^{-1}$（精度矩阵）会把样本误差放大 $\kappa$ 倍。实务中因此采用特征值截断、收缩估计或对角加载 $\Sigma + \epsilon I$（等价于全部特征值平移 $\epsilon$）；条件数与扰动分析见第 8 章。

**例 6.7**

设两资产协方差矩阵 $\Sigma = \begin{pmatrix} 5 & 2 \\ 2 & 2 \end{pmatrix}$。求主成分方向、方差解释比例；对等权组合 $\boldsymbol{w} = (0.5, 0.5)^\top$，把组合方差按主成分分解。

**解**

$\det(\Sigma - \lambda I) = (5-\lambda)(2-\lambda) - 4 = \lambda^2 - 7\lambda + 6 = (\lambda - 6)(\lambda - 1)$，故 $\lambda_1 = 6$、$\lambda_2 = 1$，两者皆正，$\Sigma$ 正定，说明两资产间不存在完全线性关系。$\lambda_1 = 6$ 时 $-x_1 + 2x_2 = 0$，取 $\boldsymbol{v}_1 = (2,1)^\top$，单位化得 $\boldsymbol{q}_1 = \tfrac{1}{\sqrt{5}}(2,1)^\top$；$\lambda_2 = 1$ 时 $4x_1 + 2x_2 = 0$，取 $\boldsymbol{v}_2 = (1,-2)^\top$，得 $\boldsymbol{q}_2 = \tfrac{1}{\sqrt{5}}(1,-2)^\top$，且 $\boldsymbol{q}_1^\top\boldsymbol{q}_2 = (2-2)/5 = 0$。于是 $\Sigma = 6\boldsymbol{q}_1\boldsymbol{q}_1^\top + \boldsymbol{q}_2\boldsymbol{q}_2^\top$。总方差 $\mathrm{tr}\Sigma = 7 = \lambda_1 + \lambda_2$，故第一主成分（同向的市场因子）解释 $6/7 \approx 85.7\%$，第二主成分（多空价差因子）解释 $1/7 \approx 14.3\%$；秩一近似 $\Sigma_1 = 6\boldsymbol{q}_1\boldsymbol{q}_1^\top$ 的逼近误差为 $\lambda_2 = 1$。等权组合方差为 $\boldsymbol{w}^\top\Sigma\boldsymbol{w} = 0.25\times 5 + 2\times 0.25\times 2 + 0.25\times 2 = 2.75$，暴露为 $\boldsymbol{q}_1^\top\boldsymbol{w} = 1.5/\sqrt{5}$、$\boldsymbol{q}_2^\top\boldsymbol{w} = -0.5/\sqrt{5}$，由式（6.18）得两项贡献 $6\times 2.25/5 = 2.70$（占 $98.2\%$）与 $1\times 0.25/5 = 0.05$（占 $1.8\%$）。可见等权组合几乎只暴露于市场因子，价差方向的暴露被大幅抵消，这正是主成分风险归因要揭示的信息。

## 本章小结

本章把「矩阵作用于向量」几何化。特征方程 $\det(A - \lambda I) = 0$ 给出线性变换在特殊方向上的伸缩倍率与这些方向，特征多项式把谱与迹、行列式联系起来（6.1 节）；凑齐 $n$ 个线性无关的特征向量即得对角化 $A = P\Lambda P^{-1}$，从而 $A^k = P\Lambda^kP^{-1}$，判据归结为代数重数与几何重数的比较（6.2 节）。对称性是关键加强：定理 6.9 保证特征值为实、不同特征值的特征向量正交，定理 6.10 的核心步骤是「特征方向的正交补仍为不变子空间」，从而逐维降阶，并把矩阵写成秩一投影之和 $\sum_i\lambda_i\boldsymbol{q}_i\boldsymbol{q}_i^\top$。在此之上，二次型的定性被谱完全刻画：正定等价于特征值全正，半正定等价于非负（定理 6.11），并推出可逆性、行列式为正与 $A = BB^\top$ 型分解（推论 6.12）。算法上，幂迭代以比率 $|\lambda_2/\lambda_1|^k$ 收敛到主特征方向（命题 6.13）；连续时间上，$\mathrm{e}^{At} = Q\mathrm{e}^{\Lambda t}Q^\top$ 给出 $\boldsymbol{x}' = A\boldsymbol{x}$ 的模态叠加解（命题 6.14）。最后在金融中落地：协方差矩阵的对称半正定结构使主成分分析成为必然，特征向量是独立因子方向，特征值是因子方差，迹是总风险，低秩截断给出因子模型与正则化，而小特征值导致的病态指向条件数与数值稳定性（6.6 节，详见第 8 章）。一句话概括：一个对称变换，完全由一组正交方向和一串伸缩倍率刻画。

## 习题

1. 设 $\lambda$ 是 $A$ 的特征值、$\boldsymbol{x}$ 为对应特征向量，指出 $\lambda + 3$、$2\lambda$、$\lambda^2$、$1/\lambda$（$\lambda \ne 0$）分别是哪个矩阵的特征值，并说明为何要求 $\boldsymbol{x} \ne \boldsymbol{0}$ 而 $\lambda$ 可以为零。

2. 求 $A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}$ 的全部特征值与特征向量，并验证其和为 $\mathrm{tr}A$、积为 $\det A$。

3. 证明上三角矩阵的特征值恰为其对角元，据此写出 $\begin{pmatrix} 2 & 1 & 5 \\ 0 & -1 & 3 \\ 0 & 0 & 4 \end{pmatrix}$ 的特征值；它一定可对角化吗？

4. 设三阶矩阵 $A$ 的特征值为 $1, -2, 3$，求 $A^2 - 2A + I$ 的特征值、$\det A$、$\mathrm{tr}A$ 与 $\det(A^{-1})$。

5. 设 $A^2 = A$，证明 $A$ 的特征值只能是 $0$ 或 $1$，并说明 $\mathrm{tr}A$ 的几何含义。

6. 证明相似矩阵有相同的特征多项式，从而有相同特征值；并举例说明特征值相同的两个矩阵未必相似。

7. 判断 $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ 是否可对角化，用代数重数与几何重数的关系说明理由。

8. 对 $A = \begin{pmatrix} 5 & 2 \\ 2 & 2 \end{pmatrix}$，求可逆矩阵 $P$ 与对角矩阵 $\Lambda$ 使 $A = P\Lambda P^{-1}$，并计算 $A^{10}$。

9. 求 $A = \begin{pmatrix} 3 & 1 & 1 \\ 1 & 3 & 1 \\ 1 & 1 & 3 \end{pmatrix}$ 的全部特征值及其重数，并求出一组标准正交的特征向量。

10. 证明实对称矩阵的每个特征值的几何重数等于其代数重数。（提示：用定理 6.10 得到 $n$ 个两两正交的特征向量。）

11. 对习题 9 中的矩阵写出正交矩阵 $Q$ 使 $Q^\top AQ = \Lambda$，并用 $\sum_i\lambda_i\boldsymbol{q}_i\boldsymbol{q}_i^\top$ 的形式还原 $A$。

12. 不求特征值，判断 $\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$、$\begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$、$\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ 分别是正定、半正定还是不定。

13. 设 $A(a) = \begin{pmatrix} a & 3 \\ 3 & a \end{pmatrix}$，用定理 6.11 求其正定、半正定、负定时 $a$ 的范围，并与顺序主子式判别法对照。

14. 设 $A$、$B$ 均为正定对称矩阵，证明 $A + B$ 正定，并举二阶反例说明 $AB$ 未必对称、从而未必正定。

15. 设 $M$ 为 $m \times n$ 实矩阵，证明 $M^\top M$ 对称半正定，且 $M^\top M$ 正定当且仅当 $M$ 的列向量线性无关。

16. 对 $A = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$ 与 $\boldsymbol{x}_0 = (1,0)^\top$，用式（6.12）手算两步幂迭代，给出 $\boldsymbol{x}_1$、$\boldsymbol{x}_2$ 与 Rayleigh 商，并计算理论收敛率 $|\lambda_2/\lambda_1|$。

17. 设 $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$，求其特征值与特征向量，说明幂迭代从 $\boldsymbol{x}_0 = (1,0)^\top$ 出发为何不收敛，这与命题 6.13 的哪个假设有关；并解释归一化步骤为何不可省略。

18. 设 $A = \begin{pmatrix} -2 & 1 \\ 1 & -2 \end{pmatrix}$、$\boldsymbol{x}_0 = (0,1)^\top$，用命题 6.14 求 $\mathrm{e}^{At}$ 与 $\boldsymbol{x}(t)$，并求 $\lim_{t\to\infty}\boldsymbol{x}(t)$ 与 $\lim_{t\to\infty}x_1(t)/x_2(t)$。

19. 设 $A$ 为实对称矩阵，证明对任意实数 $t$，$\mathrm{e}^{At}$ 仍实对称，$(\mathrm{e}^{At})^{-1} = \mathrm{e}^{-At}$，且当 $t > 0$ 时 $\mathrm{e}^{At}$ 正定。

20. 设三资产协方差矩阵 $\Sigma = \begin{pmatrix} 2 & 1 & 0 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{pmatrix}$，求其特征值与各主成分的方差解释比例，写出只保留最大主成分的秩一近似及其 Frobenius 逼近误差，并解释 $\mathrm{tr}\Sigma = \sum_i\lambda_i$ 在总风险分配上的意义。
