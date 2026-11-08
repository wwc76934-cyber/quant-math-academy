# 第4章　向量空间、线性映射与线性方程组

线性代数的研究对象并不只是排列成矩形数表的矩阵。矩阵之所以有效，是因为它记录了线性映射在指定基下的作用；方程组之所以可以被系统地求解，是因为其解集可以由核、像和维数描述。本章从向量空间的公理出发，建立张成、线性无关、基与维数的概念，再把这些概念用于线性映射和线性方程组。高斯消元不仅是计算步骤，也是揭示主元、自由变量和秩的过程；行列式则提供判断可逆性和研究线性变换体积效应的工具。

本章的理论主线是：向量空间给出讨论对象，基把抽象向量转化为坐标，线性映射在坐标中表现为矩阵，核与像分别描述映射丢失和覆盖的信息，秩—零化度定理则说明两者之间的守恒关系。后续的投影、特征值、谱定理、正定性和矩阵分解都建立在这套语言之上。

## 4.1 向量空间与子空间

**定义 4.1（向量空间）**

设 $\mathbb F$ 为实数域 $\mathbb R$ 或复数域 $\mathbb C$，$V$ 为非空集合。若 $V$ 上定义了加法 $+$ 和数乘，使得对任意 $\boldsymbol u,\boldsymbol v,\boldsymbol w\in V$ 及 $a,b\in\mathbb F$，满足：

1. $\boldsymbol u+\boldsymbol v=\boldsymbol v+\boldsymbol u$；
2. $(\boldsymbol u+\boldsymbol v)+\boldsymbol w=\boldsymbol u+(\boldsymbol v+\boldsymbol w)$；
3. 存在零向量 $\boldsymbol 0$，使 $\boldsymbol v+\boldsymbol 0=\boldsymbol v$；
4. 每个 $\boldsymbol v$ 都有加法逆元 $-\boldsymbol v$；
5. $a(\boldsymbol u+\boldsymbol v)=a\boldsymbol u+a\boldsymbol v$；
6. $(a+b)\boldsymbol v=a\boldsymbol v+b\boldsymbol v$；
7. $a(b\boldsymbol v)=(ab)\boldsymbol v$；
8. $1\boldsymbol v=\boldsymbol v$，

则称 $V$ 是域 $\mathbb F$ 上的**向量空间**（vector space），其元素称为向量。

向量不必是箭头或有序数组。$m\times n$ 实矩阵全体、次数不超过 $n$ 的实系数多项式全体 $P_n$、区间上的连续函数全体 $C([a,b])$，都构成向量空间。反之，非负实数全体在通常加法和实数乘法下不是实向量空间，因为一般没有加法逆元。

**定义 4.2（子空间）**

若 $W\subseteq V$ 非空，并且在 $V$ 的加法和数乘下自身构成向量空间，则称 $W$ 为 $V$ 的**子空间**（subspace）。

**定理 4.3（子空间判别法）**

非空集合 $W\subseteq V$ 是子空间，当且仅当对任意 $\boldsymbol u,\boldsymbol v\in W$ 和 $a,b\in\mathbb F$，都有

$$
a\boldsymbol u+b\boldsymbol v\in W.
$$

**证明**

若 $W$ 是子空间，它对数乘和加法封闭，因此结论显然成立。反之，取 $a=b=0$ 得 $\boldsymbol 0\in W$；取 $b=0,a=-1$ 并结合 $\boldsymbol v=\boldsymbol0$ 可得加法逆元；取 $a=b=1$ 得加法封闭；取 $b=0$ 得数乘封闭。其余公理由 $V$ 继承，故 $W$ 是子空间。

□

集合 $\{\boldsymbol x\in\mathbb R^n:A\boldsymbol x=\boldsymbol0\}$ 总是子空间，而 $\{\boldsymbol x:A\boldsymbol x=\boldsymbol b\}$ 在 $\boldsymbol b\ne\boldsymbol0$ 时不是子空间，因为零向量不属于它。这一区别对应齐次方程与非齐次方程解集的本质差异。

**定义 4.4（张成）**

给定向量 $\boldsymbol v_1,\ldots,\boldsymbol v_k\in V$，所有有限线性组合构成的集合称为它们的**张成空间**（span）：

$$
\operatorname{span}\{\boldsymbol v_1,\ldots,\boldsymbol v_k\}
=\left\{\sum_{i=1}^k a_i\boldsymbol v_i:a_i\in\mathbb F\right\}.
$$

它是包含这些向量的最小子空间。事实上，它由子空间判别法可知是子空间；任何包含全部 $\boldsymbol v_i$ 的子空间又必须包含它们的一切线性组合，因此不可能更小。

**例 4.1**

判断

$$
W=\left\{(x,y,z)\in\mathbb R^3:x+y+z=0\right\}
$$

是否为子空间，并将其写成张成空间。

**解**

若两个三元组满足坐标和为零，则它们任意线性组合的坐标和仍为零，故 $W$ 是子空间。由 $z=-x-y$，

$$
(x,y,z)=x(1,0,-1)+y(0,1,-1),
$$

所以

$$
W=\operatorname{span}\{(1,0,-1),(0,1,-1)\}.
$$

若把条件改为 $x+y+z=1$，则零向量不属于集合，因而不是子空间。

## 4.2 线性无关、基与维数

**定义 4.5（线性相关与线性无关）**

向量组 $\boldsymbol v_1,\ldots,\boldsymbol v_k$ 称为**线性无关**（linearly independent），若

$$
a_1\boldsymbol v_1+\cdots+a_k\boldsymbol v_k=\boldsymbol0
\quad\Longrightarrow\quad
a_1=\cdots=a_k=0.
$$

否则称为线性相关。

线性无关不是“任意两个向量都不共线”。三个向量可以两两不共线，却仍然线性相关，例如 $(1,0),(0,1),(1,1)$。

**命题 4.6（线性相关的组合判据）**

含至少两个向量的向量组线性相关，当且仅当其中至少一个向量可以表示为其余向量的线性组合。

**证明**

若线性相关，则存在不全为零的系数使 $\sum_i a_i\boldsymbol v_i=\boldsymbol0$。取 $a_j\ne0$，移项并除以 $a_j$，即得 $\boldsymbol v_j$ 是其余向量的线性组合。反之，若 $\boldsymbol v_j=\sum_{i\ne j}c_i\boldsymbol v_i$，则 $\sum_{i\ne j}c_i\boldsymbol v_i-\boldsymbol v_j=\boldsymbol0$，其中 $\boldsymbol v_j$ 的系数为 $-1\ne0$，故向量组线性相关。

□

**定义 4.7（基与维数）**

若向量组既线性无关，又张成 $V$，则称其为 $V$ 的一组**基**（basis）。若 $V$ 有一组含 $n$ 个向量的有限基，则称 $V$ 为 $n$ 维向量空间，记 $\dim V=n$。零空间的维数定义为 $0$。

**定理 4.8（坐标表示的唯一性）**

向量组 $\mathcal B=(\boldsymbol v_1,\ldots,\boldsymbol v_n)$ 是 $V$ 的基，当且仅当每个 $\boldsymbol x\in V$ 都能唯一地写成

$$
\boldsymbol x=\sum_{i=1}^n c_i\boldsymbol v_i.
$$

**证明**

基的张成性保证表示存在。若还有 $\boldsymbol x=\sum_i d_i\boldsymbol v_i$，两式相减得 $\sum_i(c_i-d_i)\boldsymbol v_i=\boldsymbol0$。线性无关迫使 $c_i=d_i$，故表示唯一。反之，唯一表示中的存在性给出张成性；对 $\boldsymbol x=\boldsymbol0$ 使用唯一性即得线性无关。

□

**引理 4.9（替换引理）**

若 $\boldsymbol u_1,\ldots,\boldsymbol u_m$ 线性无关，且每个 $\boldsymbol u_i$ 都属于 $\operatorname{span}\{\boldsymbol v_1,\ldots,\boldsymbol v_n\}$，则 $m\le n$。

**证明**

对 $m$ 使用归纳。$m=1$ 时，若 $n=0$ 则张成空间只有零向量，不可能含线性无关组，故 $n\ge1$。设结论对 $m-1$ 成立。写出

$$
\boldsymbol u_m=\sum_{j=1}^n a_j\boldsymbol v_j.
$$

线性无关保证 $\boldsymbol u_m\ne\boldsymbol0$，故至少一个 $a_j\ne0$。重排后设 $a_n\ne0$，于是 $\boldsymbol v_n$ 可由 $\boldsymbol v_1,\ldots,\boldsymbol v_{n-1},\boldsymbol u_m$ 线性表示。对每个 $i<m$，从 $\boldsymbol u_i$ 的表示中消去 $\boldsymbol v_n$，可写成

$$
\boldsymbol u_i-c_i\boldsymbol u_m\in
\operatorname{span}\{\boldsymbol v_1,\ldots,\boldsymbol v_{n-1}\}.
$$

这 $m-1$ 个向量线性无关，因为它们的零线性组合结合上式会给出原 $\boldsymbol u_i$ 的零线性组合。由归纳假设 $m-1\le n-1$，故 $m\le n$。

□

**定理 4.10（维数不依赖基的选择）**

同一有限维向量空间的任意两组基含有相同数量的向量。

**证明**

设两组基分别含 $m,n$ 个向量。第一组线性无关且由第二组张成，替换引理给出 $m\le n$；交换两组基的角色得 $n\le m$，故 $m=n$。

□

**例 4.2**

证明 $1,x,x^2$ 是 $P_2$ 的基，并求 $p(x)=2-3x+4x^2$ 在这组基下的坐标。

**解**

若 $a+bx+cx^2$ 是零多项式，则其所有系数均为零，故 $a=b=c=0$，三者线性无关。任意 $p\in P_2$ 都可写成 $a+bx+cx^2$，故它们张成 $P_2$。所求坐标向量为 $(2,-3,4)^\top$。同一个多项式在基 $(1,x+1,(x+1)^2)$ 下会有不同坐标，因此坐标必须相对于基来讨论。

## 4.3 线性映射与矩阵表示

**定义 4.11（线性映射）**

设 $V,W$ 为同一域上的向量空间。映射 $T:V\to W$ 若满足

$$
T(a\boldsymbol u+b\boldsymbol v)=aT(\boldsymbol u)+bT(\boldsymbol v),
$$

则称其为**线性映射**（linear map）。

线性映射必满足 $T(\boldsymbol0)=\boldsymbol0$。平移 $T(\boldsymbol x)=\boldsymbol x+\boldsymbol b$ 在 $\boldsymbol b\ne\boldsymbol0$ 时不是线性映射；它是仿射映射。

**定理 4.12（线性映射由基向量的像唯一确定）**

若 $\mathcal B=(\boldsymbol v_1,\ldots,\boldsymbol v_n)$ 是 $V$ 的基，则任意指定 $\boldsymbol w_1,\ldots,\boldsymbol w_n\in W$，都恰好存在一个线性映射 $T:V\to W$ 满足 $T(\boldsymbol v_i)=\boldsymbol w_i$。

**证明**

任意 $\boldsymbol x\in V$ 有唯一坐标表示 $\boldsymbol x=\sum_i c_i\boldsymbol v_i$。若 $T$ 线性，则必有

$$
T(\boldsymbol x)=\sum_{i=1}^n c_i\boldsymbol w_i.
$$

这证明唯一性。反过来，用此式定义 $T$，由坐标对加法和数乘的线性可知 $T$ 线性，且 $T(\boldsymbol v_i)=\boldsymbol w_i$，证明存在性。

□

若再给 $W$ 选基 $\mathcal C=(\boldsymbol w_1,\ldots,\boldsymbol w_m)$，把 $T(\boldsymbol v_j)$ 的 $\mathcal C$ 坐标作为第 $j$ 列，就得到 $T$ 的矩阵 $\boldsymbol A\in\mathbb F^{m\times n}$，满足

$$
[T(\boldsymbol x)]_{\mathcal C}=\boldsymbol A[\boldsymbol x]_{\mathcal B}.
\tag{4.1}
$$

矩阵的列不是随意排列的数字，而是定义域基向量映射后的坐标。两个线性映射的复合对应矩阵乘积，这正是矩阵乘法采用“行乘列”而非逐元素相乘的原因。

**定义 4.13（核与像）**

线性映射 $T:V\to W$ 的**核**与**像**分别定义为

$$
\ker T=\{\boldsymbol x\in V:T(\boldsymbol x)=\boldsymbol0\},\qquad
\operatorname{im}T=\{T(\boldsymbol x):\boldsymbol x\in V\}.
$$

它们分别是 $V$ 和 $W$ 的子空间。$T$ 为单射当且仅当 $\ker T=\{\boldsymbol0\}$：若 $T(\boldsymbol u)=T(\boldsymbol v)$，则 $\boldsymbol u-\boldsymbol v\in\ker T$；核为零便迫使二者相等，反向由线性立即得到。

**例 4.3**

设 $D:P_3\to P_3$ 为求导映射。求其核、像及在基 $(1,x,x^2,x^3)$ 下的矩阵。

**解**

$D(a+bx+cx^2+dx^3)=b+2cx+3dx^2$。核为常数多项式全体，像为 $P_2$。基向量的像依次为 $0,1,2x,3x^2$，故矩阵为

$$
\boldsymbol A=
\begin{pmatrix}
0&1&0&0\\
0&0&2&0\\
0&0&0&3\\
0&0&0&0
\end{pmatrix}.
$$

求导使多项式次数信息中的常数项丢失，这正是核为非零子空间的直观表现。

## 4.4 线性方程组、高斯消元与 LU

对 $\boldsymbol A\in\mathbb F^{m\times n}$，方程组

$$
\boldsymbol A\boldsymbol x=\boldsymbol b
$$

的第 $j$ 个左边列系数对应 $\boldsymbol A$ 的第 $j$ 列，因此方程等价于

$$
x_1\boldsymbol a_1+\cdots+x_n\boldsymbol a_n=\boldsymbol b.
$$

由此立即得到：方程有解当且仅当 $\boldsymbol b$ 属于 $\boldsymbol A$ 的列空间 $\mathcal C(\boldsymbol A)$。

**定理 4.14（非齐次方程的通解结构）**

若 $\boldsymbol x_p$ 是 $\boldsymbol A\boldsymbol x=\boldsymbol b$ 的一个特解，则全部解为

$$
\boldsymbol x=\boldsymbol x_p+\boldsymbol z,
\qquad \boldsymbol z\in\mathcal N(\boldsymbol A).
\tag{4.2}
$$

**证明**

若 $\boldsymbol x$ 是任一解，则 $\boldsymbol A(\boldsymbol x-\boldsymbol x_p)=\boldsymbol b-\boldsymbol b=\boldsymbol0$，故 $\boldsymbol x-\boldsymbol x_p\in\mathcal N(\boldsymbol A)$。反之，对任意 $\boldsymbol z\in\mathcal N(\boldsymbol A)$，有 $\boldsymbol A(\boldsymbol x_p+\boldsymbol z)=\boldsymbol b$。

□

因此，非齐次方程的解集通常是仿射子空间，而非向量子空间。其自由度完全由零空间决定。

高斯消元使用三类初等行变换：交换两行、某行乘非零常数、某行加上另一行的倍数。每种变换都可逆，并且对方程两边同时施行，所以不会改变解集。

**命题 4.15（初等行变换保持解集）**

若增广矩阵 $(\boldsymbol A\mid\boldsymbol b)$ 经初等行变换变为 $(\boldsymbol A'\mid\boldsymbol b')$，则两个方程组具有相同解集。

**证明**

每次初等行变换等价于左乘一个可逆初等矩阵 $\boldsymbol E$，方程变为 $\boldsymbol E\boldsymbol A\boldsymbol x=\boldsymbol E\boldsymbol b$。左乘 $\boldsymbol E$ 保持原解；左乘 $\boldsymbol E^{-1}$ 又恢复原方程，故不会增加解。连续施行同样成立。

□

化为行最简阶梯形后，含主元的列对应主元变量，其余列对应自由变量。主元变量可逐个回代为自由变量和常数的表达式。秩就是主元个数，也就是列空间维数。

**例 4.4**

求解

$$
\begin{cases}
x+y+z=2,\\
2x+3y+z=5,\\
x+2y+2z=5.
\end{cases}
$$

**解**

增广矩阵经行变换：

$$
\left(\begin{array}{ccc|c}
1&1&1&2\\
2&3&1&5\\
1&2&2&5
\end{array}\right)
\to
\left(\begin{array}{ccc|c}
1&1&1&2\\
0&1&-1&1\\
0&1&1&3
\end{array}\right)
\to
\left(\begin{array}{ccc|c}
1&0&2&1\\
0&1&-1&1\\
0&0&2&2
\end{array}\right).
$$

由最后一行得 $z=1$，继而 $y=2$，$x=-1$。每步只使用可逆行变换，所以这是唯一解。

**定理 4.16（LU 分解）**

若高斯消元无需换行，且每次只用下三角倍加消元，则

$$
\boldsymbol A=\boldsymbol L\boldsymbol U,
\tag{4.3}
$$

其中 $\boldsymbol U$ 为消元得到的上三角矩阵，$\boldsymbol L$ 为对角线均为 $1$ 的下三角矩阵，其非对角元记录消元倍数。

**证明**

第 $i$ 步消元对应左乘单位下三角初等矩阵 $\boldsymbol E_i$，故 $\boldsymbol E_k\cdots\boldsymbol E_1\boldsymbol A=\boldsymbol U$。于是 $\boldsymbol A=\boldsymbol E_1^{-1}\cdots\boldsymbol E_k^{-1}\boldsymbol U$。单位下三角矩阵的逆及乘积仍为单位下三角矩阵，记其为 $\boldsymbol L$ 即得结论。

□

需要换行时，通常写成 $P\boldsymbol A=\boldsymbol L\boldsymbol U$，其中 $P$ 为置换矩阵。LU 的价值在于：分解一次后，对多个右端项只需重复前代和回代，不必重新消元。

## 4.5 秩—零化度定理与四个基本子空间

**定理 4.17（秩—零化度定理）**

若 $T:V\to W$ 为线性映射且 $V$ 有限维，则

$$
\dim V=\dim(\ker T)+\dim(\operatorname{im}T).
\tag{4.4}
$$

对矩阵 $\boldsymbol A\in\mathbb F^{m\times n}$，写成

$$
n=\operatorname{rank}\boldsymbol A+\operatorname{nullity}\boldsymbol A.
$$

**证明**

取核的基 $\boldsymbol u_1,\ldots,\boldsymbol u_k$，并扩充为 $V$ 的基 $\boldsymbol u_1,\ldots,\boldsymbol u_k,\boldsymbol v_1,\ldots,\boldsymbol v_r$。只需证明 $T(\boldsymbol v_1),\ldots,T(\boldsymbol v_r)$ 是像的基。

任意 $T(\boldsymbol x)\in\operatorname{im}T$，将 $\boldsymbol x$ 用上述基展开。核向量经 $T$ 后消失，故 $T(\boldsymbol x)$ 是这些 $T(\boldsymbol v_j)$ 的线性组合，说明它们张成像。若 $\sum_j c_jT(\boldsymbol v_j)=\boldsymbol0$，则 $\sum_jc_j\boldsymbol v_j\in\ker T$，可由 $\boldsymbol u_i$ 表示。移项得到整个基向量组的零线性组合，故所有 $c_j=0$。因此它们线性无关，$\dim\operatorname{im}T=r=n-k$。

□

**定理 4.18（行秩等于列秩）**

对任意矩阵 $\boldsymbol A$，其行空间维数等于列空间维数，即 $\operatorname{rank}\boldsymbol A=\operatorname{rank}(\boldsymbol A^\top)$。

**证明**

设 $\boldsymbol A$ 经初等行变换化为行阶梯形 $\boldsymbol U$。行变换不改变行空间，故 $\boldsymbol A$ 的行秩等于 $\boldsymbol U$ 的非零行数 $r$。另一方面，主元列在原矩阵中的对应列构成列空间的基：阶梯形中每个主元列引入了此前行中未出现的新非零位置，因此主元列线性无关；非主元列只含更早主元对应的结构，可由主元列表示。故列秩也为 $r$。

□

对 $\boldsymbol A\in\mathbb R^{m\times n}$，四个基本子空间为：

- 列空间 $\mathcal C(\boldsymbol A)\subseteq\mathbb R^m$；
- 零空间 $\mathcal N(\boldsymbol A)\subseteq\mathbb R^n$；
- 行空间 $\mathcal C(\boldsymbol A^\top)\subseteq\mathbb R^n$；
- 左零空间 $\mathcal N(\boldsymbol A^\top)\subseteq\mathbb R^m$。

**定理 4.19（四个基本子空间的维数与正交关系）**

设 $r=\operatorname{rank}\boldsymbol A$，则

$$
\dim\mathcal C(\boldsymbol A)=\dim\mathcal C(\boldsymbol A^\top)=r,
$$

$$
\dim\mathcal N(\boldsymbol A)=n-r,\qquad
\dim\mathcal N(\boldsymbol A^\top)=m-r.
\tag{4.5}
$$

并且行空间与零空间正交，列空间与左零空间正交。

**证明**

维数结论由定理 4.17 和定理 4.18 得到。若 $\boldsymbol x\in\mathcal N(\boldsymbol A)$，则 $\boldsymbol A\boldsymbol x=\boldsymbol0$。其每个分量都是 $\boldsymbol A$ 的一行与 $\boldsymbol x$ 的点积，故 $\boldsymbol x$ 与所有行向量正交。若 $\boldsymbol y\in\mathcal N(\boldsymbol A^\top)$，则 $\boldsymbol A^\top\boldsymbol y=\boldsymbol0$；对任意列空间向量 $\boldsymbol A\boldsymbol x$，有

$$
(\boldsymbol A\boldsymbol x)^\top\boldsymbol y
=\boldsymbol x^\top\boldsymbol A^\top\boldsymbol y=0,
$$

故列空间与左零空间正交。

□

**例 4.5**

设

$$
\boldsymbol A=\begin{pmatrix}1&2&1\\0&1&1\\1&3&2\end{pmatrix}.
$$

求四个基本子空间的维数。

**解**

第三行等于前两行之和，前两行不成比例，故秩为 $2$。于是列空间和行空间维数均为 $2$，零空间维数为 $3-2=1$，左零空间维数为 $3-2=1$。进一步，$(-1,1,-1)^\top$ 属于零空间，$(1,2,1)^\top$ 与 $(0,1,1)^\top$ 张成行空间；左零空间由 $(1,1,-1)^\top$ 张成。零空间与左零空间分别由 $\boldsymbol A\boldsymbol x=\boldsymbol0$ 和 $\boldsymbol A^\top\boldsymbol y=\boldsymbol0$ 决定，即使维数相同也不能混为一谈。

**定理 4.20（方阵可逆的等价条件）**

对 $\boldsymbol A\in\mathbb F^{n\times n}$，下列条件等价：

1. $\boldsymbol A$ 可逆；
2. $\mathcal N(\boldsymbol A)=\{\boldsymbol0\}$；
3. $\boldsymbol A$ 的列向量构成 $\mathbb F^n$ 的基；
4. $\operatorname{rank}\boldsymbol A=n$；
5. 对任意 $\boldsymbol b\in\mathbb F^n$，$\boldsymbol A\boldsymbol x=\boldsymbol b$ 有唯一解；
6. $\boldsymbol A^\top$ 可逆。

**证明**

由秩—零化度定理，核为零等价于秩为 $n$；秩为 $n$ 等价于 $n$ 个列向量既线性无关又张成 $\mathbb F^n$，即构成基。若 $\boldsymbol A$ 可逆，则 $\boldsymbol x=\boldsymbol A^{-1}\boldsymbol b$ 是唯一解；若任意右端项均有唯一解，取 $\boldsymbol b$ 为标准基向量，所得解组成 $\boldsymbol A$ 的逆。最后，若 $\boldsymbol A\boldsymbol A^{-1}=\boldsymbol I$，转置得 $(\boldsymbol A^{-1})^\top\boldsymbol A^\top=\boldsymbol I$，故条件 1 与 6 等价。

□

**命题 4.21（乘积的秩不等式）**

若乘积 $\boldsymbol A\boldsymbol B$ 有定义，则

$$
\operatorname{rank}(\boldsymbol A\boldsymbol B)
\le \min\{\operatorname{rank}\boldsymbol A,\operatorname{rank}\boldsymbol B\}.
$$

**证明**

$\mathcal C(\boldsymbol A\boldsymbol B)\subseteq\mathcal C(\boldsymbol A)$，故秩不超过 $\operatorname{rank}\boldsymbol A$。另一方面，$\boldsymbol B$ 先把定义域映到 $\operatorname{im}\boldsymbol B$，再受 $\boldsymbol A$ 作用，最终像的维数不可能超过 $\dim\operatorname{im}\boldsymbol B$，故也不超过 $\operatorname{rank}\boldsymbol B$。

□

## 4.6 行列式与可逆性

**定义 4.22（行列式）**

方阵 $\boldsymbol A=(a_{ij})\in\mathbb F^{n\times n}$ 的**行列式**定义为

$$
\det\boldsymbol A
=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)
\prod_{i=1}^n a_{i,\sigma(i)},
\tag{4.6}
$$

其中 $S_n$ 是 $1,\ldots,n$ 的所有置换，$\operatorname{sgn}(\sigma)$ 为置换符号。

这个定义直接给出

$$
\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc.
$$

行列式对每一行和每一列都是多线性的，交换两行会改变符号，含两个相同行时行列式为零。由此可得初等行变换的影响：交换行使行列式变号，某行乘 $c$ 使行列式乘 $c$，某行加另一行的倍数不改变行列式。

**定理 4.23（行列式的主要性质）**

对方阵 $\boldsymbol A,\boldsymbol B$：

1. $\det(\boldsymbol A^\top)=\det\boldsymbol A$；
2. $\det(\boldsymbol A\boldsymbol B)=\det\boldsymbol A\det\boldsymbol B$；
3. $\boldsymbol A$ 可逆当且仅当 $\det\boldsymbol A\ne0$；
4. 若 $\boldsymbol A$ 可逆，则 $\det(\boldsymbol A^{-1})=(\det\boldsymbol A)^{-1}$。

**证明层级说明**

性质 1 可由置换与其逆具有相同符号证明。性质 2 的完整代数证明可由列多线性、交错性展开得到：把 $\boldsymbol A\boldsymbol B$ 的第 $j$ 列写成 $\sum_i b_{ij}\boldsymbol a_i$，展开后含重复列的项消失，剩余项恰好按置换组成 $\det\boldsymbol A\det\boldsymbol B$。性质 4 由性质 2 作用于 $\boldsymbol A\boldsymbol A^{-1}=\boldsymbol I$ 得到。

性质 3 可用消元证明。若 $\boldsymbol A$ 可逆，则消元最终得到 $n$ 个主元，行列式只经历非零倍数、换行换号和不变的倍加，故 $\det\boldsymbol A\ne0$。若不可逆，则秩小于 $n$，阶梯形出现零行，其行列式为零，故原行列式也为零。

□

**例 4.6**

讨论

$$
\boldsymbol A_t=\begin{pmatrix}1&t\\t&4\end{pmatrix}
$$

何时可逆。

**解**

$\det\boldsymbol A_t=4-t^2$，故 $t\ne\pm2$ 时可逆。$t=2$ 时第二行是第一行的 $2$ 倍；$t=-2$ 时第二行是第一行的 $-2$ 倍，秩均小于 $2$，与定理 4.20 一致。

行列式在几何上还测量线性变换的有向体积缩放。不过，$\det\boldsymbol A\ne0$ 只说明变换没有把所有方向压到更低维空间，并不说明数值计算一定稳定；接近奇异的矩阵仍可具有很大的条件数，这将在第 8 章讨论。

## 4.7 因子暴露约束中的秩与自由度

考虑 $n$ 个资产的权重向量 $\boldsymbol w$。若有 $k$ 个线性约束，例如总权重为 $1$、对某个因子的暴露为 $0$，可统一写为

$$
\boldsymbol B\boldsymbol w=\boldsymbol h,
\qquad \boldsymbol B\in\mathbb R^{k\times n}.
\tag{4.7}
$$

若约束相容且 $\operatorname{rank}\boldsymbol B=r$，则通解仍具有式（4.2）的形式，自由维数为 $n-r$。这说明增加一个约束未必减少一个自由度：若新约束是旧约束的线性组合，秩不变，它只是冗余约束；若新约束与旧约束矛盾，则可能使解集为空。

**例 4.7**

三个资产权重满足

$$
w_1+w_2+w_3=1,\qquad w_1-w_2=0.
$$

求可行权重集合及其自由维数。

**解**

约束矩阵

$$
\boldsymbol B=\begin{pmatrix}1&1&1\\1&-1&0\end{pmatrix}
$$

的秩为 $2$。由 $w_1=w_2$ 得 $2w_1+w_3=1$，故

$$
\boldsymbol w=(t,t,1-2t)^\top
=(0,0,1)^\top+t(1,1,-2)^\top.
$$

可行集是一条仿射直线，自由维数为 $3-2=1$。若再添加 $w_1+w_2-2w_3=0$，它与原约束独立，可行集缩为一个点；若添加 $2w_1+2w_2+2w_3=2$，则秩不变，自由度不变。

在因子模型中，这类计算用于判断中性化约束是否真正独立，以及组合在约束后还剩多少可调方向。秩不足也可能意味着因子暴露本身共线，从而使多个因子的独立贡献无法仅由线性系统识别。

## 本章小结

向量空间提供了研究线性结构的统一框架。线性无关与基把抽象空间转化为有限坐标，维数由替换引理保证不依赖基的选择。线性映射由其在基上的取值唯一确定，矩阵则是这种映射在指定基下的坐标记录。线性方程组的可解性由列空间决定，通解由特解与零空间之和给出；高斯消元通过可逆行变换揭示主元、自由变量和 LU 结构。

秩—零化度定理给出定义域维数在核与像之间的分解，行秩等于列秩进一步统一了四个基本子空间。方阵可逆等价于核为零、列向量构成基、满秩以及任意右端项均有唯一解，也等价于行列式非零。上述概念共同回答了量化线性系统中的三个基本问题：约束是否相容、解是否唯一、剩余自由度是多少。

## 习题

1. 判断下列集合是否为 $\mathbb R^2$ 或 $\mathbb R^3$ 的子空间，并说明理由：
   （a）$\{(x,y):x+2y=0\}$；
   （b）$\{(x,y):x+2y=1\}$；
   （c）$\mathbb Z^2\subset\mathbb R^2$；
   （d）$\{(x,y,z):x=y\}\cap\{(x,y,z):y=z\}$。
2. 判断 $\boldsymbol b=(1,0,1)^\top$ 是否属于 $\operatorname{span}\{(1,1,0)^\top,(0,1,1)^\top\}$，若属于则写出全部表示。
3. 证明多项式 $1+x,1+x^2,2+x+x^2$ 在 $P_2$ 中线性相关，并写出它们的张成空间的一组基。
4. 证明 $\mathcal B=((1,1)^\top,(1,-1)^\top)$ 是 $\mathbb R^2$ 的基，并求 $(5,1)^\top$ 在该基下的坐标。
5. 线性映射 $T:\mathbb R^2\to\mathbb R^2$ 满足 $T(1,1)=(2,0)$，$T(1,-1)=(0,2)$。求 $T(x,y)$ 及其标准矩阵。
6. 对求导映射 $D:P_3\to P_3$，求 $\dim\ker D$、$\dim\operatorname{im}D$，并验证秩—零化度定理。
7. 讨论参数 $a$ 取何值时，方程组
   $$x+y=1,\qquad x+ay=2,\qquad 2x+(a+1)y=b$$
   有解，并在有解时说明解是否唯一。
8. 求矩阵
   $$\boldsymbol A=\begin{pmatrix}1&2&1&0\\2&4&0&2\\-1&-2&1&2\end{pmatrix}$$
   的秩、零空间的一组基和 $\boldsymbol A\boldsymbol x=\boldsymbol0$ 的通解。
9. 对 $\boldsymbol A=\begin{pmatrix}2&1\\4&3\end{pmatrix}$ 求不带换行的 LU 分解，并用它求解 $\boldsymbol A\boldsymbol x=(3,7)^\top$。
10. 一个 $7\times10$ 矩阵的秩为 $4$。求其列空间、行空间、零空间和左零空间的维数。
11. 证明线性映射 $T:V\to W$ 为单射，当且仅当 $\ker T=\{\boldsymbol0\}$；若 $\dim V>\dim W$，证明 $T$ 不可能单射。
12. 对 $\boldsymbol A=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$，分别求行空间、列空间、零空间和左零空间的一组基。
13. 讨论矩阵 $\begin{pmatrix}1&a&0\\0&1&a\\a&0&1\end{pmatrix}$ 的可逆性。
14. 利用行变换计算
   $$\det\begin{pmatrix}1&2&0&1\\0&1&3&0\\2&4&1&3\\0&0&2&1\end{pmatrix}.$$
15. 设 $\boldsymbol A,\boldsymbol B$ 为同阶方阵且 $\boldsymbol A\boldsymbol B=\boldsymbol0$。证明：若 $\boldsymbol A$ 可逆，则 $\boldsymbol B=\boldsymbol0$；并给出一个 $\boldsymbol A,\boldsymbol B$ 均非零而乘积为零的例子。
16. 证明 $\operatorname{rank}(\boldsymbol A+\boldsymbol B)\le\operatorname{rank}\boldsymbol A+\operatorname{rank}\boldsymbol B$，并举例说明等号可以成立。
17. 设 $\boldsymbol A$ 为 $m\times n$ 矩阵。证明 $\boldsymbol A\boldsymbol x=\boldsymbol b$ 对某个 $\boldsymbol b$ 有两个不同解，当且仅当 $\mathcal N(\boldsymbol A)\ne\{\boldsymbol0\}$。
18. 四个资产权重满足 $w_1+w_2+w_3+w_4=1$ 和 $w_1-w_2+w_3-w_4=0$。求可行集的自由维数及通解。
19. 设 $\boldsymbol B$ 为 $k\times n$ 矩阵，$\operatorname{rank}\boldsymbol B=k<n$。证明对任意 $\boldsymbol h$，方程 $\boldsymbol B\boldsymbol w=\boldsymbol h$ 都有解，且解集自由维数为 $n-k$。
20. 某组合需满足总权重约束、因子一暴露约束和因子二暴露约束：
   $$\begin{aligned}
   w_1+w_2+w_3&=1,\\
   w_1+2w_2+3w_3&=0,\\
   2w_1+4w_2+6w_3&=0.
   \end{aligned}$$
   判断各约束是否独立，求全部可行权重及自由维数，并解释为什么“列了三个约束”不等于“减少了三个自由度”。
