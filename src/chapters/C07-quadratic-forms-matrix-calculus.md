# 第7章　二次型、正定矩阵与矩阵微分

二次型刻画"向量如何变为一个数"，且该数关于向量二次齐次。实二次型与实对称双线性形式一一对应，"能否选一组基使双线性形式的矩阵对角化"就是对称矩阵的合同对角化问题；二次曲面分类、力学动能、统计马氏距离都是同一结构。第6章谱定理给出最强答案：实对称矩阵可经正交变换对角化，对角元即特征值。7.1 节把该结论放进更宽的合同关系中，说明对角元大小并非不变量而正、负号个数是（Sylvester 惯性定理），从而把实二次型的分类归结为 $(p,q,r)$。

正定性是第二个中心概念：优化中 Hessian 在驻点处正定即得严格局部极小、处处半正定等价于凸性（第15、16章），统计中协方差矩阵与 Fisher 信息矩阵必然半正定，其退化程度决定估计量是否存在、置信椭球是否有界；定理 7.6 给出正定的四种等价刻画。矩阵微分则是高维最优化与极大似然计算的工具：面对 $\boldsymbol\beta^\top X^\top X\boldsymbol\beta$、$\log\det\Sigma$、$\operatorname{tr}(A\Sigma^{-1})$ 一类表达式，逐分量求偏导繁琐易错，掌握迹的微分法则后可压缩为一两行，7.4 节建立演算，7.5 节用于最小二乘与多元正态似然。本章亦是第32章组合优化的代数基础——组合方差 $\boldsymbol w^\top\Sigma\boldsymbol w$ 的正定性决定最小方差权重是否唯一。学完应能：化实二次型为标准形并读出秩与符号差；用两种独立方法判定含参数对称矩阵的正定范围；计算含迹、行列式与逆的表达式梯度。

## 7.1 二次型与合同变换

称 $n$ 个实变量的二次齐次多项式 $f=\sum_i a_{ii}x_i^2+2\sum_{i<j}a_{ij}x_ix_j$（不含一次项与常数项）为 **$n$ 元二次型**。记 $\boldsymbol x=(x_1,\dots,x_n)^\top$，则 $f=\boldsymbol x^\top A\boldsymbol x$，$A=(a_{ij})$ 对称。

**定义 7.1（二次型与其唯一对称表示）**

设 $A\in\mathbb R^{n\times n}$，$f(\boldsymbol x)=\boldsymbol x^\top A\boldsymbol x$ 称为由 $A$ 给出的二次型。对任意方阵 $A$ 恒有

$$
f(\boldsymbol x)=\boldsymbol x^\top A\boldsymbol x=\boldsymbol x^\top\Big(\frac{A+A^\top}{2}\Big)\boldsymbol x,
\tag{7.1}
$$

其中 $\frac{A+A^\top}{2}$ 对称，称为 $f$ 的**对称表示**。规定二次型总与其对称表示对应，此对应在实二次型与实对称矩阵间是双射。

**证明**

$\boldsymbol x^\top A\boldsymbol x$ 是 $1\times1$ 矩阵，等于自身转置 $\boldsymbol x^\top A^\top\boldsymbol x$，相加除以二得式（7.1）。唯一性：设 $B,C$ 均对称且给出同一二次型，则 $D=B-C$ 对称且 $\boldsymbol x^\top D\boldsymbol x\equiv0$；取 $\boldsymbol x=\boldsymbol e_i$ 得 $d_{ii}=0$，取 $\boldsymbol x=\boldsymbol e_i+\boldsymbol e_j$ 得 $0=2d_{ij}$，故 $D=0$。

□

必须取 $\frac{A+A^\top}{2}$ 的理由有三。其一，不加此约定则对应多对一：$\begin{pmatrix}1&3\\-1&2\end{pmatrix}$ 与 $\begin{pmatrix}1&1\\1&2\end{pmatrix}$ 给出同一二次型 $x_1^2+2x_1x_2+2x_2^2$。其二，只有对称矩阵保证特征值为实并可正交对角化，"对角化二次型"才有几何意义；且梯度 $\nabla f=(A+A^\top)\boldsymbol x$ 在对称时退化为 $2A\boldsymbol x$，这是 7.4 节与全部优化计算的基础。其三，正定性与惯性指数只对对称表示有良好定义，否则"$A$ 正定"因表示不同而歧义。

**定义 7.2（合同）**

设 $A,B\in\mathbb R^{n\times n}$ 对称。若存在可逆 $P$ 使

$$
B=P^\top A P,
\tag{7.2}
$$

则称 $A$ 与 $B$ **合同**，记 $A\simeq B$。

合同是等价关系（自反取 $P=I$，对称由 $A=(P^{-1})^\top BP^{-1}$，传递由 $(P_1P_2)^\top A(P_1P_2)=P_2^\top(P_1^\top AP_1)P_2$）。令 $\boldsymbol x=P\boldsymbol y$ 得 $\boldsymbol x^\top A\boldsymbol x=\boldsymbol y^\top(P^\top AP)\boldsymbol y$，故**合同就是二次型的可逆线性变量替换**。须与相似区分：相似 $B=P^{-1}AP$ 刻画同一线性映射在不同基下的矩阵，保持特征值、迹与 Jordan 结构；合同刻画同一双线性形式在不同基下的矩阵，保持惯性指数。$P$ 正交时 $P^{-1}=P^\top$，二者重合；$P$ 非正交时分离，如 $I$ 与 $\operatorname{diag}(1,4)$ 合同（取 $P=\operatorname{diag}(1,2)$）却不相似。故一般合同化简所得对角元**不唯一**，问题是：哪些量在合同下不变？

**定理 7.3（Sylvester 惯性定理）**

设 $f$ 为 $n$ 元实二次型，则存在可逆替换 $\boldsymbol x=P\boldsymbol y$ 化为标准形

$$
f=y_1^2+\cdots+y_p^2-y_{p+1}^2-\cdots-y_{p+q}^2,
\tag{7.3}
$$

$p+q\le n$。$(p,q)$ 由 $f$ 唯一决定，与所用替换无关，分别称**正惯性指数**与**负惯性指数**。

**证明**

*存在性*（配方法，对 $n$ 归纳）。若某 $a_{ii}\ne0$，不妨 $a_{11}\ne0$，则 $f=a_{11}\big(x_1+\frac{1}{a_{11}}\sum_{j\ge2}a_{1j}x_j\big)^2+g(x_2,\dots,x_n)$，$g$ 为 $n-1$ 元二次型，用归纳假设。若全部 $a_{ii}=0$ 而 $f\not\equiv0$，取 $a_{ij}\ne0$（$i\ne j$），作可逆替换 $x_i=u_i+u_j$、$x_j=u_i-u_j$、余 $x_k=u_k$，产生非零平方项 $4a_{ij}u_i^2$，回到前一情形。最后以 $z_k=\lvert d_k\rvert^{-1/2}w_k$ 把非零对角元归一化为 $\pm w_k^2$。

*唯一性*（子空间维数交截）。设两种标准形对应 $\boldsymbol x=P\boldsymbol y$、$\boldsymbol x=P'\boldsymbol y'$，指数 $(p,q)$、$(p',q')$，且 $p+q=p'+q'=r$（下文说明 $r=\operatorname{rank}A$）。反设 $p>p'$，取 $V_+=\{\boldsymbol x:y_{p+1}=\cdots=y_n=0\}$、$W_-=\{\boldsymbol x:y_1'=\cdots=y_{p'}'=0\}$。$V_+$ 由第一个坐标系的全部正项方向张成，$\dim V_+=p$；$W_-$ 由第二个坐标系的全部负项方向与零空间方向张成，其上 $f\le0$，$\dim W_-=n-p'$。于是 $\dim V_++\dim W_-=n+(p-p')>n$，由维数公式

$$
\dim(V_+\cap W_-)=\dim V_++\dim W_--\dim(V_++W_-)\ge p-p'>0,
$$

存在非零 $\boldsymbol x_0\in V_+\cap W_-$。一方面 $f(\boldsymbol x_0)=y_1^2+\cdots+y_p^2>0$（若 $y_1=\cdots=y_p=0$ 则 $\boldsymbol x_0=\boldsymbol0$），另一方面 $f(\boldsymbol x_0)=-y_{p'+1}'^2-\cdots-y_{p'+q}'^2\le0$，矛盾。故 $p\le p'$，对称地 $p'\le p$，再由 $r$ 相同得 $q=q'$。

□

核心是**维数交截论证**：维数之和超过全空间的两个子空间必有非零交，而在交集上二次型被迫同时为正与非正。此手法在 Courant–Fischer 极小极大原理与第21章投影理论中反复出现。

注记　标准形**不唯一**，唯一的只是正负号个数：$x_1^2+x_2^2$ 与 $3z_1^2+\frac12z_2^2$ 惯性指数同为 $(2,0)$，由 $z_1=x_1/\sqrt3$、$z_2=\sqrt2x_2$ 相连。故对角元数值不是合同不变量，特征值只在正交变换这一特殊合同下才是不变量。

**定义 7.4（秩与符号差）**

设 $f=\boldsymbol x^\top A\boldsymbol x$ 的惯性指数为 $(p,q)$，定义

$$
\operatorname{rank}f:=p+q,\qquad \operatorname{sgn}f:=p-q,
\tag{7.4}
$$

称为**秩**与**符号差**。

此秩与矩阵秩一致：$\operatorname{diag}(I_p,-I_q,0)$ 与 $A$ 合同而合同不改秩。故 $(p,q,n-p-q)$ 是合同等价下的**完全不变量**，两个 $n$ 阶实对称矩阵合同当且仅当 $(p,q)$ 相同；秩已知时 $p=\frac{r+s}{2}$、$q=\frac{r-s}{2}$。

**例 7.1**

用配方法与正交变换两种途径把 $f=2x_1^2+5x_2^2+5x_3^2+4x_1x_2-4x_1x_3-8x_2x_3$ 化为标准形，并比较。

**解**

对称表示为 $A=\begin{pmatrix}2&2&-2\\2&5&-4\\-2&-4&5\end{pmatrix}$（$a_{12}=2$ 为 $4x_1x_2$ 系数之半，余同理）。

*途径一：配方法。* 对 $x_1$ 配方：$2x_1^2+4x_1x_2-4x_1x_3=2\big[x_1^2+2x_1(x_2-x_3)\big]=2(x_1+x_2-x_3)^2-2(x_2-x_3)^2$，故 $f=2(x_1+x_2-x_3)^2+3x_2^2+3x_3^2-4x_2x_3$。再对 $x_2$ 配方：

$$
3x_2^2-4x_2x_3=3\Big(x_2-\tfrac23x_3\Big)^2-\tfrac43x_3^2
\;\Longrightarrow\;
f=2z_1^2+3z_2^2+\tfrac53z_3^2,
$$

其中 $z_1=x_1+x_2-x_3$、$z_2=x_2-\frac23x_3$、$z_3=x_3$。由 $\boldsymbol z=C\boldsymbol x$，$C=\begin{pmatrix}1&1&-1\\0&1&-\frac23\\0&0&1\end{pmatrix}$，$\det C=1\ne0$，替换可逆。回解 $x_3=z_3$、$x_2=z_2+\frac23z_3$、$x_1=z_1-z_2+\frac13z_3$，即

$$
P=C^{-1}=\begin{pmatrix}1&-1&\frac13\\0&1&\frac23\\0&0&1\end{pmatrix},\qquad P^\top AP=\operatorname{diag}\Big(2,3,\tfrac53\Big).
$$

*途径二：正交变换。* 按第一行展开，三个二阶子式为 $(5-\lambda)^2-16$、$2-2\lambda$、$2-2\lambda$，故

$$
\det(A-\lambda I)=(2-\lambda)(\lambda^2-10\lambda+9)-4(2-2\lambda)=-\lambda^3+12\lambda^2-21\lambda+10=-(\lambda-1)^2(\lambda-10),
$$

特征值 $\lambda_1=\lambda_2=1$、$\lambda_3=10$（校验：迹 $12=1+1+10$，$\det A=2\cdot9-2\cdot2-2\cdot2=10$）。$\lambda=10$：$(A-10I)\boldsymbol v=\boldsymbol0$ 首行给 $v_2=4v_1+v_3$，代入第二行 $2v_1-5v_2-4v_3=0$ 得 $-18v_1-9v_3=0$，故 $\boldsymbol v_3=(1,2,-2)^\top$，单位化 $\boldsymbol q_3=\frac13(1,2,-2)^\top$。$\lambda=1$：$A-I$ 三行均平行于 $(1,2,-2)$，特征空间 $\{v_1+2v_2-2v_3=0\}$ 维数为 2；取 $\boldsymbol u_1=(-2,1,0)^\top$、$\boldsymbol u_2=(2,0,1)^\top$，二者不正交（$\boldsymbol u_1^\top\boldsymbol u_2=-4$），Schmidt 正交化

$$
\boldsymbol u_2'=\boldsymbol u_2-\frac{\boldsymbol u_1^\top\boldsymbol u_2}{\lVert\boldsymbol u_1\rVert^2}\boldsymbol u_1=(2,0,1)^\top+\tfrac45(-2,1,0)^\top=\tfrac15(2,4,5)^\top ,
$$

单位化得 $\boldsymbol q_1=\frac1{\sqrt5}(-2,1,0)^\top$、$\boldsymbol q_2=\frac1{3\sqrt5}(2,4,5)^\top$（因 $\lVert(2,4,5)\rVert=3\sqrt5$）。验证 $\boldsymbol q_2^\top\boldsymbol q_3=\frac1{9\sqrt5}(2+8-10)=0$、$\boldsymbol q_1^\top\boldsymbol q_3=0$。令 $Q=(\boldsymbol q_1,\boldsymbol q_2,\boldsymbol q_3)$，则 $Q^\top AQ=\operatorname{diag}(1,1,10)$，在 $\boldsymbol x=Q\boldsymbol y$ 下

$$
f=y_1^2+y_2^2+10y_3^2.
\tag{7.5}
$$

*比较。* 配方法得 $\operatorname{diag}(2,3,\frac53)$，正交变换得 $\operatorname{diag}(1,1,10)$，对角元完全不同，印证标准形不唯一；但 $(p,q,r)=(3,0,3)$ 一致，行列式互相印证：$\det(P^\top AP)=(\det P)^2\det A=10=2\cdot3\cdot\frac53$。几何上 $Q$ 正交，式（7.5）的等值面 $\{f=c\}$ 是椭球，主轴即特征向量，$\boldsymbol q_1,\boldsymbol q_2$ 张成的平面是二重特征值对应的各向同性方向；$P$ 是剪切型（上三角、非正交）变换，把椭球拉成另一椭球，保留正定性却破坏长度与角度。故需保距结构者（PCA、马氏距离、二次型抽样分布）必用正交变换，只需符号信息者（正定判定、凸性验证）用配方法更快。

**例 7.2**

讨论 $f_t=x_1^2+x_2^2+5x_3^2+2t\,x_1x_2-2x_1x_3+4x_2x_3$ 的秩与符号差随 $t\in\mathbb R$ 的变化。

**解**

$A_t=\begin{pmatrix}1&t&-1\\t&1&2\\-1&2&5\end{pmatrix}$，顺序主子式为

$$
\Delta_1=1,\qquad \Delta_2=1-t^2,\qquad \Delta_3=(5-4)-t(5t+2)-(2t+1)=-t(5t+4).
$$

$\Delta_1=1\ne0$ 恒成立，故 $\operatorname{rank}A_t\ge1$。分情形：

*（一）$-\frac45<t<0$。* $\lvert t\rvert<1$ 故 $\Delta_2>0$；$-t>0$、$5t+4>0$ 故 $\Delta_3>0$。三主子式全正，由定理 7.6 得 $A_t$ 正定，$(p,q)=(3,0)$，$\operatorname{rank}=3$，$\operatorname{sgn}=3$。

*（二）$t=0$。* $\Delta_3=0$、$\Delta_2=1\ne0$，秩恰为 2。配方 $f_0=(x_1-x_3)^2+(x_2+2x_3)^2+(5-1-4)x_3^2=(x_1-x_3)^2+(x_2+2x_3)^2$，得 $(p,q)=(2,0)$、$\operatorname{sgn}=2$。与主子式一致：$\Delta_2=1>0$ 说明限制在前两坐标平面已正定，$p\ge2$，秩为 2 迫使 $q=0$。

*（三）$t=-\frac45$。* $\Delta_2=\frac9{25}>0$、$\Delta_3=0$，秩为 2；二阶顺序主子式对应块正定给 $p\ge2$，故 $(p,q)=(2,0)$、$\operatorname{sgn}=2$。

*（四）$t\notin[-\frac45,0]$（含 $t=\pm1$）。* $\Delta_3=-t(5t+4)\ne0$，秩为 3。特征值之积 $\lambda_1\lambda_2\lambda_3=\Delta_3<0$，负特征值个数为奇数，$q\in\{1,3\}$；若 $q=3$ 则 $A_t$ 负定，需奇数阶顺序主子式为负，与 $\Delta_1=1>0$ 矛盾。故 $q=1$、$p=2$、$\operatorname{sgn}=1$。（$t=\pm1$ 虽使 $\Delta_2=0$，但 $\Delta_3\vert_{t=1}=-9$、$\Delta_3\vert_{t=-1}=-1$ 均非零，秩仍为 3。）

汇总：$t\in(-\frac45,0)$ 时 $(\operatorname{rank},\operatorname{sgn})=(3,3)$；$t\in\{0,-\frac45\}$ 时 $(2,2)$；其余 $t$ 时 $(3,1)$。秩只在 $\Delta_3=0$ 即 $t\in\{0,-\frac45\}$ 处下降，这两点是退化临界参数；跨越时 $f_t$ 由正定（三正平方项）跳变为不定（两正一负），符号差不连续。又 $p\ge2$ 恒成立，即 $A_t$ 至多一个负方向。若把 $t$ 理解为某模型的相关参数，则 $(-\frac45,0)$ 是唯一使二次型正定的区间，端点处矩阵奇异、二次曲面退化为柱面。

## 7.2 正定性与判定

**定义 7.5（正定、半正定、负定、不定）**

设 $A\in\mathbb R^{n\times n}$ 对称，$f(\boldsymbol x)=\boldsymbol x^\top A\boldsymbol x$。称 $A$（及 $f$）**正定**（$A\succ0$），若对一切 $\boldsymbol x\ne\boldsymbol0$ 有

$$
\boldsymbol x^\top A\boldsymbol x>0;
\tag{7.6}
$$

**半正定**（$A\succeq0$），若对一切 $\boldsymbol x$ 有 $\boldsymbol x^\top A\boldsymbol x\ge0$；**负定**（$A\prec0$），若 $-A\succ0$；**半负定**（$A\preceq0$），若 $-A\succeq0$；**不定**，若存在 $\boldsymbol x,\boldsymbol y$ 使 $\boldsymbol x^\top A\boldsymbol x>0>\boldsymbol y^\top A\boldsymbol y$。由惯性定理，五类恰由 $(p,q)$ 分类：正定 $\Leftrightarrow(p,q)=(n,0)$，半正定 $\Leftrightarrow q=0$，负定 $\Leftrightarrow(0,n)$，半负定 $\Leftrightarrow p=0$，不定 $\Leftrightarrow p\ge1$ 且 $q\ge1$。

注记　正定必可逆且对角元必正（取 $\boldsymbol x=\boldsymbol e_i$），但"对角元全正"不足以推出正定：$\begin{pmatrix}1&2\\2&1\end{pmatrix}$ 对角元均为 1 而有特征值 $3,-1$，是不定矩阵。另一误区是半正定**不能**只查顺序主子式非负：$\operatorname{diag}(0,-1)$ 的两个顺序主子式均为 0 却不是半正定；半正定的充要条件是全部 $2^n-1$ 个主子式非负，定理 7.6 的主子式刻画只对严格正定成立。

**定理 7.6（对称矩阵正定的等价刻画）**

设 $A\in\mathbb R^{n\times n}$ 对称，$\lambda_1,\dots,\lambda_n$ 为其实特征值，$\Delta_k$ 为 $k$ 阶顺序主子式。下列条件两两等价：(1) 对一切 $\boldsymbol x\ne\boldsymbol0$ 有 $\boldsymbol x^\top A\boldsymbol x>0$；(2) $\lambda_i>0$（$i=1,\dots,n$）；(3) $\Delta_k>0$（$k=1,\dots,n$）；(4) 存在可逆 $B$ 使 $A=BB^\top$。

**证明**

全程用第6章谱定理：存在正交阵 $Q$ 使 $A=Q\Lambda Q^\top$，$\Lambda=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$，$\lambda_i\in\mathbb R$。

*(1)$\Rightarrow$(2)。* 设 $A\boldsymbol u_i=\lambda_i\boldsymbol u_i$、$\lVert\boldsymbol u_i\rVert=1$，则 $\lambda_i=\lambda_i\boldsymbol u_i^\top\boldsymbol u_i=\boldsymbol u_i^\top A\boldsymbol u_i>0$。

*(2)$\Rightarrow$(1)。* 令 $\boldsymbol y=Q^\top\boldsymbol x$。$Q$ 正交故 $\boldsymbol x\ne\boldsymbol0\Leftrightarrow\boldsymbol y\ne\boldsymbol0$，且 $\boldsymbol x^\top A\boldsymbol x=\boldsymbol y^\top\Lambda\boldsymbol y=\sum_i\lambda_iy_i^2>0$：各项非负，至少一项 $y_i\ne0$ 而对应 $\lambda_i>0$。

*(2)$\Rightarrow$(4)。* 由谱分解取 $\Lambda^{1/2}=\operatorname{diag}(\sqrt{\lambda_i})$（$\lambda_i>0$ 时可逆），令 $B=Q\Lambda^{1/2}$，则 $BB^\top=Q\Lambda^{1/2}\Lambda^{1/2}Q^\top=Q\Lambda Q^\top=A$，且 $\det B=\det Q\prod_i\sqrt{\lambda_i}\ne0$。

*(4)$\Rightarrow$(1)。* $\boldsymbol x^\top A\boldsymbol x=\lVert B^\top\boldsymbol x\rVert^2\ge0$；若为 0 则 $B^\top\boldsymbol x=\boldsymbol0$，$B^\top$ 可逆给出 $\boldsymbol x=\boldsymbol0$，矛盾。

*(1)$\Rightarrow$(3)。* 对 $n$ 归纳。$n=1$ 时取 $\boldsymbol x=1$ 得 $\Delta_1=a_{11}>0$。设结论对 $n-1$ 阶成立，分块 $A=\begin{pmatrix}A_{n-1}&\boldsymbol b\\ \boldsymbol b^\top&a_{nn}\end{pmatrix}$。对 $(\boldsymbol u,0)^\top\ne\boldsymbol0$ 有 $\boldsymbol u^\top A_{n-1}\boldsymbol u=\boldsymbol x^\top A\boldsymbol x>0$，故 $A_{n-1}$ 正定，由归纳 $\Delta_k>0$（$k\le n-1$），特别地 $A_{n-1}$ 可逆。取 $P=\begin{pmatrix}I_{n-1}&\boldsymbol0\\ -\boldsymbol b^\top A_{n-1}^{-1}&1\end{pmatrix}$（$\det P=1$），直接计算得

$$
PAP^\top=\begin{pmatrix}A_{n-1}&\boldsymbol0\\ \boldsymbol0^\top&s\end{pmatrix},
\qquad s=a_{nn}-\boldsymbol b^\top A_{n-1}^{-1}\boldsymbol b=\frac{\Delta_n}{\Delta_{n-1}},
\tag{7.7}
$$

末式由 $\det(PAP^\top)=\Delta_n$、$\det A_{n-1}=\Delta_{n-1}$ 得到。式（7.7）是合同变换，故 $PAP^\top$ 仍正定；取 $\boldsymbol x=(\boldsymbol0,\dots,0,1)^\top$ 得 $s>0$，于是 $\Delta_n=s\Delta_{n-1}>0$。量 $s$ 称为 $A_{n-1}$ 在 $A$ 中的 **Schur 补**，见 7.3 节。

*(3)$\Rightarrow$(1)。* 同法归纳，沿用式（7.7）。$n=1$ 显然。设 $\Delta_k>0$（$k\le n$），则 $A_{n-1}$ 满足 $n-1$ 阶假设故正定，且 $s=\Delta_n/\Delta_{n-1}>0$，于是 $PAP^\top=\operatorname{diag}(A_{n-1},s)$ 正定：对 $\boldsymbol z=(\boldsymbol u,\alpha)^\top\ne\boldsymbol0$ 有 $\boldsymbol z^\top(PAP^\top)\boldsymbol z=\boldsymbol u^\top A_{n-1}\boldsymbol u+s\alpha^2>0$（$\boldsymbol u\ne\boldsymbol0$ 时首项为正，否则 $\alpha\ne0$ 使次项为正）。合同保持正定性（$\boldsymbol x^\top A\boldsymbol x=\boldsymbol y^\top(PAP^\top)\boldsymbol y$，$\boldsymbol y=P^{-\top}\boldsymbol x$），故 $A$ 正定。

□

注记　条件 (4) 可加强为存在**唯一**的对角元全正的下三角阵 $L$ 使 $A=LL^\top$，即 Cholesky 分解；把 (3)$\Rightarrow$(1) 的归纳写成逐列构造即得，第8章给出算法与稳定性分析。又因 $\boldsymbol x^\top A\boldsymbol x=\sum_i\lambda_iy_i^2$ 是 $\lambda_i$ 在单纯形 $\{y_i^2\ge0,\sum y_i^2=1\}$ 上的凸组合，得 $\lambda_{\min}(A)=\min_{\lVert\boldsymbol x\rVert=1}\boldsymbol x^\top A\boldsymbol x$，于是 $A\succ0\Leftrightarrow\lambda_{\min}>0$、$A\succeq0\Leftrightarrow\lambda_{\min}\ge0$，且 $\lambda_{\min}$ 度量 $A$ 距奇异边界的厚度，决定条件数 $\kappa=\lambda_{\max}/\lambda_{\min}$。

**命题 7.7（半正定锥的凸性与正定集合的开性）**

记 $\mathbb S^n$ 为 $n$ 阶实对称矩阵全体，$\mathbb S^n_+=\{A\in\mathbb S^n:A\succeq0\}$、$\mathbb S^n_{++}=\{A\in\mathbb S^n:A\succ0\}$。则 $\mathbb S^n_+$ 是凸锥，$\mathbb S^n_{++}$ 是凸锥且为 $\mathbb S^n$ 中的开集。

**证明**

*凸锥。* 设 $A,B\in\mathbb S^n_+$、$\theta\in[0,1]$，则对任意 $\boldsymbol x$

$$
\boldsymbol x^\top\big[(1-\theta)A+\theta B\big]\boldsymbol x=(1-\theta)\,\boldsymbol x^\top A\boldsymbol x+\theta\,\boldsymbol x^\top B\boldsymbol x\ge0,
\tag{7.8}
$$

故 $\mathbb S^n_+$ 凸；取 $\theta=0$ 并把 $A$ 换成 $tA$（$t\ge0$）得锥性。若 $A,B\succ0$，式（7.8）右端严格为正（$\theta\in(0,1)$ 时两项均正，$\theta=0,1$ 时退化为单个正项），且 $t>0$ 时 $\boldsymbol x^\top(tA)\boldsymbol x=t\,\boldsymbol x^\top A\boldsymbol x>0$，故 $\mathbb S^n_{++}$ 亦为凸锥；但 $t=0$ 给出零矩阵（半正定而非正定），故它不含顶点。

*开性。* 由 $\lambda_{\min}(A)=\min_{\lVert\boldsymbol x\rVert=1}\boldsymbol x^\top A\boldsymbol x$，右端是紧集（单位球面）上一族关于 $A$ 线性（故连续）的函数的逐点最小，因而连续；于是 $\mathbb S^n_{++}=\lambda_{\min}^{-1}((0,+\infty))$ 为开集。显式半径：设 $A\succ0$、$m=\lambda_{\min}(A)>0$，$E$ 对称且 $\lVert E\rVert_2<m$，则对 $\boldsymbol x\ne\boldsymbol0$

$$
\boldsymbol x^\top(A+E)\boldsymbol x\ge m\lVert\boldsymbol x\rVert^2-\lvert\boldsymbol x^\top E\boldsymbol x\rvert\ge\big(m-\lVert E\rVert_2\big)\lVert\boldsymbol x\rVert^2>0,
$$

即以 $A$ 为中心、半径 $m$ 的谱范数球整个落在 $\mathbb S^n_{++}$ 中。

□

几何上 $\mathbb S^n_+$ 是尖闭凸锥（不含直线，顶点在原点），$\mathbb S^n_{++}$ 是其内部。半定规划中形如 $F(\boldsymbol x)\succeq0$ 的约束（第16章）之所以有良好对偶理论，根源正是此锥的凸性；而严格可行域 $F(\boldsymbol x)\succ0$ 是开集，讨论 Slater 条件与内点法时须与之区分。

### Gram 矩阵与样本协方差矩阵

设 $X\in\mathbb R^{m\times n}$，列为 $\boldsymbol c_1,\dots,\boldsymbol c_n$，则 $G=X^\top X$（$g_{ij}=\boldsymbol c_i^\top\boldsymbol c_j$）称为 **Gram 矩阵**。对任意 $\boldsymbol z$ 有 $\boldsymbol z^\top G\boldsymbol z=\lVert X\boldsymbol z\rVert^2\ge0$，故 $G\succeq0$ **无条件成立**。进一步 $G\succ0$ 当且仅当 $X\boldsymbol z\ne\boldsymbol0$ 对一切 $\boldsymbol z\ne\boldsymbol0$ 成立，即 $\boldsymbol c_1,\dots,\boldsymbol c_n$ 线性无关（列满秩，$n\le m$）；列线性相关时存在非零 $\boldsymbol z$ 使 $X\boldsymbol z=\boldsymbol0$，$G$ 半正定但奇异。恒有 $\operatorname{rank}G=\operatorname{rank}X$。

结论直接迁移到统计。设样本 $\boldsymbol X_1,\dots,\boldsymbol X_n\in\mathbb R^p$，均值 $\bar{\boldsymbol X}$，$X_c$ 为以 $\boldsymbol X_i-\bar{\boldsymbol X}$ 为列的中心化矩阵，则样本协方差矩阵

$$
S=\frac{1}{n-1}X_cX_c^\top=\frac{1}{n-1}\sum_{i=1}^n(\boldsymbol X_i-\bar{\boldsymbol X})(\boldsymbol X_i-\bar{\boldsymbol X})^\top
$$

是 $p\times p$ 的 Gram 型矩阵（与 $X^\top X$ 仅差转置位置），故 $S\succeq0$ 是代数事实而非假设。退化条件为 $\operatorname{rank}S=\operatorname{rank}X_c\le\min(n-1,p)$；出现 $n-1$ 而非 $n$，是因恒等式 $\sum_i(\boldsymbol X_i-\bar{\boldsymbol X})=\boldsymbol0$ 使 $n$ 个中心化向量必然线性相关。故 $n>p+1$ 且样本处于一般位置时 $\operatorname{rank}S=p$、$S\succ0$；$n\le p+1$ 时 $\operatorname{rank}S\le n-1<p$，$S$ **必然奇异**，马氏距离 $(\boldsymbol x-\bar{\boldsymbol X})^\top S^{-1}(\boldsymbol x-\bar{\boldsymbol X})$ 无定义，最小方差组合权重解不唯一。后者在量化研究中极常见：用 60 个交易日收益估计 500 只股票的协方差矩阵，秩至多 59，故第32章须引入收缩估计、因子结构约束或对角加载 $S+\delta I$（$\delta>0$，即把半正定矩阵推入正定内部），第8章 PCA/SVD 则用前 $k$ 个正特征值方向张成的子空间替代全空间，把奇异问题降维成正定问题。反向地，$A\succeq0$ 当且仅当 $A$ 是某 Gram 矩阵，即存在 $X$ 使 $A=X^\top X$（由 $A=Q\Lambda Q^\top$、$\lambda_i\ge0$ 取 $X=\Lambda^{1/2}Q^\top$），故"协方差矩阵"与"内积结构"是同一事物的两种语言。

**例 7.3**

求 $t$ 的范围使 $A(t)=\begin{pmatrix}t&1&0\\1&t&1\\0&1&t\end{pmatrix}$ 正定，并讨论 $t=\sqrt2$ 时的退化。

**解**

按第一行展开得 $\Delta_3=t(t^2-1)-(t-0)=t^3-2t$，故顺序主子式条件为

$$
\Delta_1=t>0,\qquad \Delta_2=t^2-1>0,\qquad \Delta_3=t^3-2t=t(t^2-2)>0.
\tag{7.9}
$$

逐条求解：$\Delta_1>0$ 给 $t>0$；$\Delta_2>0$ 结合 $t>0$ 给 $t>1$；$\Delta_3>0$ 在 $t>0$ 下等价于 $t^2>2$ 即 $t>\sqrt2$。取交集得 $A(t)\succ0\iff t>\sqrt2$。

*边界 $t=\sqrt2$。* 此时 $\Delta_3=0$、$\Delta_2=1>0$，秩为 2；二阶顺序主子式对应块正定给 $p\ge2$，故 $(p,q)=(2,0)$、符号差 2，$A(\sqrt2)$ 半正定而非正定。零方向可取 $\boldsymbol v=(\frac{\sqrt2}2,-1,\frac{\sqrt2}2)^\top$，直接验证 $A(\sqrt2)\boldsymbol v=\boldsymbol0$；二次型 $f=\sqrt2(x_1^2+x_2^2+x_3^2)+2x_1x_2+2x_2x_3$ 在直线 $\{\alpha\boldsymbol v\}$ 上恒为 0，在其正交补上严格为正，等值面 $\{f=c\}$（$c>0$）由椭球退化为无限长椭圆柱面。统计上这对应协方差矩阵秩亏：组合 $\boldsymbol v^\top\boldsymbol X$ 方差为零，求逆或求最小方差权重须先在零空间的正交补上进行。当 $0<t<\sqrt2$ 时 $\Delta_1=t>0$ 而 $\Delta_3=t(t^2-2)<0$，特征值之积为负故 $q$ 为奇数，$q=3$ 又与 $\Delta_1>0$ 矛盾，故 $(p,q)=(2,1)$，矩阵不定；当 $t<-\sqrt2$ 时 $\Delta_1<0$、$\Delta_2>0$、$\Delta_3<0$，符号交替，$-A(t)$ 的顺序主子式全正，故 $A(t)$ 负定。

## 7.3 Schur 补及其应用

Schur 补把分块矩阵的正定判定递归化为低阶判定，是 Cholesky 分解与约束消元的代数根源。

**定义 7.8（Schur 补）**

设 $M=\begin{bmatrix}A & B\\ B^{\top} & C\end{bmatrix}$ 为 $p+q$ 阶实对称分块矩阵，$A$ 对称可逆，$C$ 对称，称
$$
M/A=C-B^{\top}A^{-1}B \tag{7.10}
$$
为 $C$ 关于 $A$ 的 Schur 补，记 $S=M/A$。

**定理 7.9（分块正定的 Schur 判据）**

$$
M\succ0\iff A\succ0\ \text{且}\ S\succ0. \tag{7.11}
$$

**证明**

取 $T=\begin{bmatrix}I_p & 0\\ -B^{\top}A^{-1} & I_q\end{bmatrix}$，$\det T=1$，逐块相乘得 $TM=\begin{bmatrix}A & B\\ 0 & S\end{bmatrix}$，右乘 $T^{\top}$ 得 $TMT^{\top}=\operatorname{diag}(A,S)$，故 $M$ 与之合同，由合同变换保持惯性指数（定理 7.3）得 $M\succ0\iff\operatorname{diag}(A,S)\succ0$。块对角阵的二次型为 $\boldsymbol{x}^{\top}A\boldsymbol{x}+\boldsymbol{y}^{\top}S\boldsymbol{y}$：取 $\boldsymbol{y}=\boldsymbol{0}$ 得 $A\succ0$，取 $\boldsymbol{x}=\boldsymbol{0}$ 得 $S\succ0$；反之两块正定时两项非负且至少一项为正。

□

**推论 7.10（行列式分解）**

$$
\det M=\det A\cdot\det(C-B^{\top}A^{-1}B). \tag{7.12}
$$

**证明**

由该合同分解与 $\det T=\det T^{\top}=1$ 得 $\det M=\det(TMT^{\top})=\det A\det S$。

□

反复用式 (7.12) 即见顺序主子式判定实为 Schur 补的递归检验。

**例 7.4**

用 Schur 补判定 $M=\begin{bmatrix}4 & 2 & 1\\ 2 & 5 & 2\\ 1 & 2 & 3\end{bmatrix}$ 的正定性并求 $\det M$。

**解**

取 $A=[4]$、$B=[2\ 1]$、$C=\begin{bmatrix}5 & 2\\ 2 & 3\end{bmatrix}$，则 $A>0$，且
$$
S=C-\tfrac14\begin{bmatrix}2\\ 1\end{bmatrix}[2\ 1]=\begin{bmatrix}4 & \tfrac32\\ \tfrac32 & \tfrac{11}{4}\end{bmatrix},\quad
\det S=11-\tfrac94=\tfrac{35}{4}>0,
$$
故 $S\succ0$，定理 7.9 给出 $M\succ0$；推论 7.10 给出 $\det M=35$，与展开式 $44-8-1=35$、主子式 $4,16,35$ 全正一致。

## 7.4 矩阵微分

**定义 7.11（梯度、雅可比与 Hessian）**

设 $f:\mathbb{R}^{n}\to\mathbb{R}$，梯度 $\nabla f=\partial f/\partial\boldsymbol{x}=(\partial f/\partial x_1,\dots,\partial f/\partial x_n)^{\top}$；$\boldsymbol{f}:\mathbb{R}^{n}\to\mathbb{R}^{m}$ 的雅可比 $J=\partial\boldsymbol{f}/\partial\boldsymbol{x}^{\top}$ 以 $J_{ij}=\partial f_i/\partial x_j$ 为元；$f$ 二阶偏导连续时 Hessian $\nabla^{2}f=\partial^{2}f/\partial\boldsymbol{x}\partial\boldsymbol{x}^{\top}$ 以 $\partial^{2}f/\partial x_i\partial x_j$ 为元。$f(X)$ 的 $\partial f/\partial X$ 与 $X$ 同型，全节用此分母布局。

**命题 7.12（迹微分法与二阶展开）**

若 $\mathrm{d}f=\operatorname{tr}(G^{\top}\mathrm{d}X)$ 对一切 $\mathrm{d}X$ 成立，则 $\partial f/\partial X=G$；向量情形即 $\mathrm{d}f=(\nabla f)^{\top}\mathrm{d}\boldsymbol{x}$。二阶偏导连续时有
$$
f(\boldsymbol{x}+\boldsymbol{h})=f(\boldsymbol{x})+(\nabla f)^{\top}\boldsymbol{h}+\tfrac12\boldsymbol{h}^{\top}(\nabla^{2}f)\boldsymbol{h}+o(\|\boldsymbol{h}\|^{2}). \tag{7.13}
$$

**证明**

$\operatorname{tr}(G^{\top}\mathrm{d}X)=\sum_{i,j}G_{ij}(\mathrm{d}X)_{ij}$ 与全微分 $\sum_{i,j}\frac{\partial f}{\partial X_{ij}}\mathrm{d}X_{ij}$ 逐项比较，取 $\mathrm{d}X=E_{ij}$ 即得 $G_{ij}=\partial f/\partial X_{ij}$。式 (7.13) 由 $\varphi(t)=f(\boldsymbol{x}+t\boldsymbol{h})$ 的一元 Taylor 展开给出，$\varphi''(t)=\boldsymbol{h}^{\top}(\nabla^{2}f)\boldsymbol{h}$，余项由二阶偏导连续性控制。

□

对 $XX^{-1}=I$ 用乘积规则 $\mathrm{d}(XY)=(\mathrm{d}X)Y+X\mathrm{d}Y$ 求微分得 $\mathrm{d}X X^{-1}+X\mathrm{d}(X^{-1})=0$；结合 Jacobi 公式 $\mathrm{d}\det X=\det X\operatorname{tr}(X^{-1}\mathrm{d}X)$ 与 $\mathrm{d}\log u=\mathrm{d}u/u$，得
$$
\mathrm{d}(X^{-1})=-X^{-1}(\mathrm{d}X)X^{-1},\quad
\mathrm{d}\log\det X=\operatorname{tr}(X^{-1}\mathrm{d}X). \tag{7.14}
$$

以下皆由"先求微分、再配成迹"导出。线性型 $\mathrm{d}(\boldsymbol{a}^{\top}\boldsymbol{x})=\boldsymbol{a}^{\top}\mathrm{d}\boldsymbol{x}$ 给出 $\partial(\boldsymbol{a}^{\top}\boldsymbol{x})/\partial\boldsymbol{x}=\boldsymbol{a}$。二次型由乘积规则及标量转置等于自身，$\mathrm{d}(\boldsymbol{x}^{\top}A\boldsymbol{x})=(\mathrm{d}\boldsymbol{x})^{\top}A\boldsymbol{x}+\boldsymbol{x}^{\top}A\mathrm{d}\boldsymbol{x}=(\mathrm{d}\boldsymbol{x})^{\top}(A+A^{\top})\boldsymbol{x}$，故
$$
\partial(\boldsymbol{x}^{\top}A\boldsymbol{x})/\partial\boldsymbol{x}=(A+A^{\top})\boldsymbol{x}=2A\boldsymbol{x}\ (A=A^{\top}),\quad
\nabla^{2}(\boldsymbol{x}^{\top}A\boldsymbol{x})=A+A^{\top}, \tag{7.15}
$$
后者恒对称。双线性型 $\mathrm{d}(\boldsymbol{a}^{\top}X\boldsymbol{b})=\operatorname{tr}(\boldsymbol{a}^{\top}\mathrm{d}X\boldsymbol{b})=\operatorname{tr}(\boldsymbol{b}\boldsymbol{a}^{\top}\mathrm{d}X)=\operatorname{tr}((\boldsymbol{a}\boldsymbol{b}^{\top})^{\top}\mathrm{d}X)$ 给出 $\partial(\boldsymbol{a}^{\top}X\boldsymbol{b})/\partial X=\boldsymbol{a}\boldsymbol{b}^{\top}$；$\mathrm{d}\operatorname{tr}(X)=\operatorname{tr}(I^{\top}\mathrm{d}X)$ 给出 $\partial\operatorname{tr}(X)/\partial X=I$。由式 (7.14) 得
$$
\partial\log\det X/\partial X=X^{-\top}\quad(X\ \text{对称时为}\ X^{-1}), \tag{7.16}
$$
$$
\partial\operatorname{tr}(X^{-1}A)/\partial X=-X^{-\top}A^{\top}X^{-\top}. \tag{7.17}
$$
式 (7.17) 源于 $\mathrm{d}\operatorname{tr}(X^{-1}A)=-\operatorname{tr}(X^{-1}(\mathrm{d}X)X^{-1}A)=-\operatorname{tr}(X^{-1}AX^{-1}\mathrm{d}X)$ 与 $(-X^{-\top}A^{\top}X^{-\top})^{\top}=-X^{-1}AX^{-1}$。

**例 7.5**

设 $\boldsymbol{y}_t$ 独立同分布于 $N_p(\boldsymbol{0},\Sigma)$，$S=\frac1N\sum_t\boldsymbol{y}_t\boldsymbol{y}_t^{\top}$，略去常数后 $\ell=-\frac N2\log\det\Sigma-\frac N2\operatorname{tr}(\Sigma^{-1}S)$。求 $\partial\ell/\partial\Sigma$ 与极大似然估计。

**解**

由 $\mathrm{d}\operatorname{tr}(\Sigma^{-1}S)=-\operatorname{tr}(\Sigma^{-1}S\Sigma^{-1}\mathrm{d}\Sigma)$ 得
$$
\mathrm{d}\ell=-\tfrac N2\operatorname{tr}[(\Sigma^{-1}-\Sigma^{-1}S\Sigma^{-1})\mathrm{d}\Sigma],\quad
\frac{\partial\ell}{\partial\Sigma}=-\tfrac N2\Sigma^{-1}+\tfrac N2\Sigma^{-1}S\Sigma^{-1},
$$
即式 (7.16)、(7.17) 之和。令其为零并左右乘 $\Sigma$ 得 $\hat\Sigma=S$。再求一次微分并在 $\Sigma=S$ 取值，三项合并为 $\mathrm{d}^{2}\ell=-\frac N2\|S^{-1/2}\mathrm{d}\Sigma S^{-1/2}\|_F^{2}\le0$，故为极大点。

**例 7.6**

设 $A=\begin{bmatrix}2 & 1\\ 1 & 3\end{bmatrix}$、$\boldsymbol{b}=(1,-2)^{\top}$，求 $f=\tfrac12\boldsymbol{x}^{\top}A\boldsymbol{x}+\boldsymbol{b}^{\top}\boldsymbol{x}$ 的梯度与 Hessian，验证对称性并求驻点。

**解**

$f=x_1^{2}+x_1x_2+\tfrac32x_2^{2}+x_1-2x_2$。由式 (7.15)，$\nabla f=A\boldsymbol{x}+\boldsymbol{b}=(2x_1+x_2+1,\ x_1+3x_2-2)^{\top}$，与逐分量求导一致；$\nabla^{2}f=\tfrac12(A+A^{\top})=A$，混合偏导皆为 $1$，故对称。解 $2x_1+x_2=-1$、$x_1+3x_2=2$ 得 $\boldsymbol{x}^{*}=(-1,1)^{\top}$；由 $2>0$、$\det A=5>0$ 知 $A\succ0$，故为全局极小点，$f(\boldsymbol{x}^{*})=-\tfrac32$。

## 7.5 量化研究中的二次型与矩阵微分

设 $\Sigma\succeq0$、$\boldsymbol{1}^{\top}\boldsymbol{w}=1$，则
$$
\sigma_p^{2}=\boldsymbol{w}^{\top}\Sigma\boldsymbol{w},\quad
\nabla_{\boldsymbol{w}}\sigma_p^{2}=2\Sigma\boldsymbol{w},\quad
\nabla^{2}_{\boldsymbol{w}}\sigma_p^{2}=2\Sigma, \tag{7.18}
$$
均由式 (7.15) 取 $A=\Sigma$ 得到。因 $\boldsymbol{x}^{\top}\Sigma\boldsymbol{x}=\operatorname{Var}(\boldsymbol{x}^{\top}\boldsymbol{r})\ge0$，Hessian 半正定，组合方差为凸函数；配合式 (7.13)，一阶条件即全局最优的充要条件，这是第 32 章马科维茨优化有解析解与稳定算法的基础。梯度分量 $\partial\sigma_p^{2}/\partial w_i=2(\Sigma\boldsymbol{w})_i=2\operatorname{Cov}(r_i,\boldsymbol{w}^{\top}\boldsymbol{r})$ 称为边际风险贡献，二次齐次性给出欧拉分解 $\sigma_p^{2}=\sum_iw_i(\Sigma\boldsymbol{w})_i$，把总方差精确分摊到各资产，是成分风险报告的基础。

例 7.5 已算出对数似然中 $\log\det\Sigma$ 与 $\operatorname{tr}(\Sigma^{-1}S)$ 的导数，得 $\hat\Sigma=S$。资产数接近样本长度时 $S$ 退化，$\log\det\Sigma$ 与 $\Sigma^{-1}$ 失去定义，故须加正定约束，常用收缩估计、因子加对角残差 $\Sigma=BB^{\top}+D$（$D\succ0$）或在 Cholesky 参数上做无约束优化，其正定性可用定理 7.9 递归检验。

在预算约束下极小化 $\boldsymbol{w}^{\top}\Sigma\boldsymbol{w}$，取 $L=\boldsymbol{w}^{\top}\Sigma\boldsymbol{w}-\lambda(\boldsymbol{1}^{\top}\boldsymbol{w}-1)$，一阶条件为 $2\Sigma\boldsymbol{w}=\lambda\boldsymbol{1}$、$\boldsymbol{1}^{\top}\boldsymbol{w}=1$；若 $\Sigma\succ0$，则
$$
\boldsymbol{w}^{*}=\frac{\Sigma^{-1}\boldsymbol{1}}{\boldsymbol{1}^{\top}\Sigma^{-1}\boldsymbol{1}},\quad
\sigma_{\min}^{2}=\frac{1}{\boldsymbol{1}^{\top}\Sigma^{-1}\boldsymbol{1}}=\frac{\lambda}{2}. \tag{7.19}
$$
目标凸、约束仿射，驻点即全局极小点，$\lambda=2\sigma_{\min}^{2}$ 是放松预算约束的边际代价。

**例 7.7**

两资产组合 $\Sigma=\begin{bmatrix}0.04 & 0.012\\ 0.012 & 0.09\end{bmatrix}$（$\sigma_1=0.20,\sigma_2=0.30,\rho_{12}=0.2$），写出方差二次型并求全局最小方差组合。

**解**

$\sigma_p^{2}=0.04w_1^{2}+0.024w_1w_2+0.09w_2^{2}$。由 $0.04>0$、$\det\Sigma=0.003456>0$ 知 $\Sigma\succ0$；$\Sigma^{-1}\boldsymbol{1}=(0.078,0.028)^{\top}/0.003456$，$\boldsymbol{1}^{\top}\Sigma^{-1}\boldsymbol{1}=0.106/0.003456\approx30.6713$，公因子在归一化中消去，式 (7.19) 给出
$$
w_1^{*}=\frac{0.078}{0.106}=\frac{39}{53}\approx0.7358,\quad
w_2^{*}=\frac{14}{53}\approx0.2642,\quad
\sigma_{\min}^{2}=\frac{0.003456}{0.106}\approx0.032604. \tag{7.20}
$$
一元验证：令 $w_2=1-w_1$，$g=0.106w_1^{2}-0.156w_1+0.09$，$g'=0$ 给同一权重，$g(39/53)=0.09-0.156^{2}/0.424=0.0326038$ 与式 (7.20) 相符；又 $2\Sigma\boldsymbol{w}^{*}=(0.0652,0.0652)^{\top}=\lambda\boldsymbol{1}$，验证了一阶条件。$\sigma_{\min}^{2}$ 小于两资产各自方差，体现分散化效应。

## 本章小结

实二次型唯一对应实对称矩阵 $A$ 使 $f=\boldsymbol{x}^{\top}A\boldsymbol{x}$，化简二次型即求可逆 $P$ 使 $P^{\top}AP$ 对角；惯性定理保证正、负惯性指数为合同不变量，故规范形唯一。正定性因此有一组等价判据：特征值全正、顺序主子式全正、$A=P^{\top}P$、$\boldsymbol{x}^{\top}A\boldsymbol{x}>0$。Schur 补把判定推广到分块结构，$M\succ0$ 当且仅当 $A\succ0$ 且 $S\succ0$，并有 $\det M=\det A\det S$，其证明只用一次合同变换，故与主子式判定同源。矩阵微分的核心是迹识别法：把 $\mathrm{d}f$ 配成 $\operatorname{tr}(G^{\top}\mathrm{d}X)$ 即得梯度，其中式 (7.15)、(7.16) 使用最频。应用上，$2\Sigma\boldsymbol{w}$ 给出边际风险贡献，$2\Sigma\succeq0$ 保证凸性，对数似然求导给出 $\hat\Sigma=S$，预算约束下的一阶条件给出式 (7.19)，这些结论将在第 32 章反复使用。

## 习题

1. 写出 $f=2x_1^{2}+3x_2^{2}-x_3^{2}+4x_1x_2-2x_1x_3+6x_2x_3$ 的对称矩阵并展开验证。
2. 用配方法把 $f=x_1^{2}+2x_2^{2}+5x_3^{2}+2x_1x_2+2x_1x_3-8x_2x_3$ 化为标准形，写出可逆变换与正负惯性指数。
3. 用正交变换把 $f=2x_1x_2+2x_1x_3+2x_2x_3$ 化为标准形，写出 $Q$ 并验证 $Q^{\top}AQ$ 对角。
4. 分别用特征值、顺序主子式与定义判定三阶对称三对角阵（对角元全为 $3$、次对角元全为 $1$）的正定性。
5. 求 $t$ 的范围，使对角元为 $2$、$(1,2)$ 元为 $t$、$(2,3)$ 元为 $1$ 的对称三对角阵正定。
6. 证明：$A\succ0$ 蕴含 $A^{-1}$、$A^{k}$、$A^{\top}$ 正定，且 $B\succeq0$ 时 $A+B\succ0$。
7. 证明：实对称 $A$ 正定当且仅当存在可逆 $P$ 使 $A=P^{\top}P$，并推出 $\det A>0$、对角元为正。
8. 证明半正定锥 $\mathcal{S}_{+}^{n}$ 是凸锥、$\{X:X\succeq A\}$ 是凸集，且 $X\succeq0$ 蕴含 $X_{ii}\ge0$、$X_{ij}^{2}\le X_{ii}X_{jj}$。
9. 用 Schur 补判定对角元 $2,3,4$、非对角元全为 $1$ 的三阶对称阵的正定性，并用推论 7.10 求其行列式。
10. 证明 $M\succeq0$、$A\succ0$ 蕴含 $S=C-B^{\top}A^{-1}B\succeq0$，并举例说明 $A$ 奇异时定理 7.9 失效。
11. 设 $A\succ0$，证明分块阵半正定当且仅当 $C\succeq B^{\top}A^{-1}B$，并说明这样的 $C$ 全体为凸集。
12. 对非对称 $A=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}$ 求 $\partial(\boldsymbol{x}^{\top}A\boldsymbol{x})/\partial\boldsymbol{x}$ 与 Hessian，并用分量展开验证。
13. 设 $f=\|\boldsymbol{x}\|^{2}+(\boldsymbol{a}^{\top}\boldsymbol{x})^{2}$，求 $\nabla f$、$\nabla^{2}f$ 并证明 Hessian 半正定。
14. 用迹微分法求 $\partial\operatorname{tr}(AXB)/\partial X$ 与 $\partial\operatorname{tr}(X^{\top}AX)/\partial X$（$A$ 对称）。
15. 求 $\partial\operatorname{tr}(X^{2})/\partial X$，说明对称时得 $2X$、非对称时得 $2X^{\top}$，并用二阶矩阵验证。
16. 设 $X$ 列满秩，求 $\partial\log\det(X^{\top}X)/\partial X$，并验证可逆方阵时退化为 $2X^{-\top}$。
17. 用式 (7.17) 证明 $\partial\operatorname{tr}(X^{-1})/\partial X=-X^{-\top}X^{-\top}$，并用二阶上三角阵分量验证。
18. 对等相关 $\rho=0.2$、波动率 $0.20,0.30,0.15$ 的三资产组合，写出 $\Sigma$，求等权点处 $\nabla_{\boldsymbol{w}}\sigma_p^{2}$。
19. 承上题，用 Lagrange 法求最小方差组合的权重与方差，验证 $2\Sigma\boldsymbol{w}^{*}=\lambda\boldsymbol{1}$，并与等权组合比较。
20. 对 $\boldsymbol{y}_t\sim N_p(\boldsymbol{\mu},\Sigma)$ 写出对数似然，用式 (7.16)、(7.17) 求其对 $\Sigma$、$\boldsymbol{\mu}$ 的导数，证明 $\hat{\boldsymbol{\mu}}=\bar{\boldsymbol{y}}$、$\hat\Sigma=\frac1N\sum_t(\boldsymbol{y}_t-\bar{\boldsymbol{y}})(\boldsymbol{y}_t-\bar{\boldsymbol{y}})^{\top}$，并说明 $N<p$ 时为何须加正定约束。
