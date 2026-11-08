# 第5章　内积、正交投影与最小二乘

第4章解决了线性方程是否有解以及解的自由度问题，但没有讨论“方向”“长度”和“最接近的近似”。内积为向量空间引入角度和距离，使我们可以定义正交性，并把一个向量唯一分解为某个子空间内的部分与垂直于该子空间的部分。正交投影是这一分解的核心，最小二乘则是它在超定线性系统中的直接表现。

本章先建立内积、范数和 Cauchy–Schwarz 不等式，再用 Gram–Schmidt 过程构造正交基，证明有限维子空间上的投影定理。随后从几何和代数两条路径推导正规方程，说明最小二乘解何时存在、何时唯一，以及拟合值为何不依赖冗余参数的选择。最后将中心化向量与相关系数、因子中性化联系起来，为谱定理、回归和主成分分析做准备。

## 5.1 内积、范数与 Cauchy–Schwarz 不等式

**定义 5.1（实内积空间）**

设 $V$ 为实向量空间。若函数 $\langle\cdot,\cdot\rangle:V\times V\to\mathbb R$ 对任意 $\boldsymbol u,\boldsymbol v,\boldsymbol w\in V$ 和 $a,b\in\mathbb R$ 满足：

1. 对称性：$\langle\boldsymbol u,\boldsymbol v\rangle=\langle\boldsymbol v,\boldsymbol u\rangle$；
2. 线性性：$\langle a\boldsymbol u+b\boldsymbol v,\boldsymbol w\rangle=a\langle\boldsymbol u,\boldsymbol w\rangle+b\langle\boldsymbol v,\boldsymbol w\rangle$；
3. 正定性：$\langle\boldsymbol v,\boldsymbol v\rangle\ge0$，且等号仅在 $\boldsymbol v=\boldsymbol0$ 时成立，

则称其为内积，$(V,\langle\cdot,\cdot\rangle)$ 称为实**内积空间**（inner product space）。

$\mathbb R^n$ 上的标准内积为 $\langle\boldsymbol x,\boldsymbol y\rangle=\boldsymbol x^\top\boldsymbol y$。若 $\boldsymbol G$ 为对称正定矩阵，则 $\langle\boldsymbol x,\boldsymbol y\rangle_{\boldsymbol G}=\boldsymbol x^\top\boldsymbol G\boldsymbol y$ 也定义内积；正定性保证了非零向量具有正的内积平方。连续函数空间上可使用 $\langle f,g\rangle=\int_a^bf(x)g(x)\,dx$。

**定义 5.2（由内积诱导的范数）**

内积诱导的长度或范数定义为

$$
\|\boldsymbol v\|=\sqrt{\langle\boldsymbol v,\boldsymbol v\rangle}.
\tag{5.1}
$$

两个非零向量的夹角 $\theta$ 定义为满足 $\cos\theta=\langle\boldsymbol u,\boldsymbol v\rangle/(\|\boldsymbol u\|\|\boldsymbol v\|)$ 的 $[0,\pi]$ 中角度。这个定义之所以合理，是因为右端的绝对值不超过 $1$。

**定理 5.3（Cauchy–Schwarz 不等式）**

对任意 $\boldsymbol u,\boldsymbol v\in V$，

$$
|\langle\boldsymbol u,\boldsymbol v\rangle|
\le \|\boldsymbol u\|\,\|\boldsymbol v\|.
\tag{5.2}
$$

等号成立当且仅当两个向量线性相关。

**证明**

若 $\boldsymbol v=\boldsymbol0$，结论显然。设 $\boldsymbol v\ne\boldsymbol0$，对任意 $t\in\mathbb R$，由正定性，

$$
0\le\|\boldsymbol u-t\boldsymbol v\|^2
=\|\boldsymbol u\|^2-2t\langle\boldsymbol u,\boldsymbol v\rangle+t^2\|\boldsymbol v\|^2.
$$

右端是关于 $t$ 的二次函数。取使其最小的 $t=\langle\boldsymbol u,\boldsymbol v\rangle/\|\boldsymbol v\|^2$，代入得到

$$
0\le\|\boldsymbol u\|^2-\frac{\langle\boldsymbol u,\boldsymbol v\rangle^2}{\|\boldsymbol v\|^2}.
$$

整理并开方即得式（5.2）。等号成立当且仅当所取的 $t$ 使 $\|\boldsymbol u-t\boldsymbol v\|=0$，即 $\boldsymbol u=t\boldsymbol v$；结合 $\boldsymbol v=\boldsymbol0$ 的情形，等价于二者线性相关。

□

由该不等式还可证明三角不等式：

$$
\|\boldsymbol u+\boldsymbol v\|^2
=\|\boldsymbol u\|^2+2\langle\boldsymbol u,\boldsymbol v\rangle+\|\boldsymbol v\|^2
\le(\|\boldsymbol u\|+\|\boldsymbol v\|)^2.
$$

**例 5.1**

在 $\mathbb R^2$ 中采用内积 $\langle\boldsymbol x,\boldsymbol y\rangle_{\boldsymbol G}=2x_1y_1+3x_2y_2$，求 $\boldsymbol u=(1,1)^\top$ 与 $\boldsymbol v=(1,0)^\top$ 的夹角。

**解**

$\langle\boldsymbol u,\boldsymbol v\rangle_{\boldsymbol G}=2$，$\|\boldsymbol u\|_{\boldsymbol G}^2=5$，$\|\boldsymbol v\|_{\boldsymbol G}^2=2$，故

$$
\cos\theta=\frac2{\sqrt{10}},\qquad \theta=\arccos\sqrt{\frac25}.
$$

若改用标准内积，数值会不同。角度不是向量组单独固有的，它依赖于所选内积。

## 5.2 正交、Gram–Schmidt 与正交矩阵

**定义 5.4（正交与标准正交组）**

若 $\langle\boldsymbol u,\boldsymbol v\rangle=0$，称 $\boldsymbol u,\boldsymbol v$ **正交**（orthogonal）。若一组非零向量两两正交，则称其为正交组；若每个向量的范数还为 $1$，则称为标准正交组。

非零正交向量组必线性无关。事实上，若 $\sum_jc_j\boldsymbol v_j=\boldsymbol0$，与 $\boldsymbol v_i$ 作内积得 $c_i\|\boldsymbol v_i\|^2=0$，故 $c_i=0$。

**定理 5.5（Gram–Schmidt 正交化）**

任意有限维内积空间都有标准正交基。给定线性无关向量 $\boldsymbol v_1,\ldots,\boldsymbol v_k$，可构造正交向量 $\boldsymbol u_1,\ldots,\boldsymbol u_k$，使对每个 $j$ 都有相同的张成空间。

**证明**

依次构造 $\boldsymbol u_1=\boldsymbol v_1$，以及

$$
\boldsymbol u_j=\boldsymbol v_j-
\sum_{i=1}^{j-1}
\frac{\langle\boldsymbol v_j,\boldsymbol u_i\rangle}
{\langle\boldsymbol u_i,\boldsymbol u_i\rangle}\boldsymbol u_i,
\qquad j=2,\ldots,k.
\tag{5.3}
$$

归纳假设 $\boldsymbol u_1,\ldots,\boldsymbol u_{j-1}$ 两两正交。对任意 $i<j$，将式（5.3）与 $\boldsymbol u_i$ 作内积，减去项中只有第 $i$ 项保留，结果恰为零。若 $\boldsymbol u_j=\boldsymbol0$，则 $\boldsymbol v_j$ 是此前向量的线性组合，而这些向量与对应的 $\boldsymbol v_i$ 张成相同空间，这与原向量组线性无关矛盾。因此 $\boldsymbol u_j\ne0$，再令 $\boldsymbol e_j=\boldsymbol u_j/\|\boldsymbol u_j\|$ 即得标准正交组。对空间的一组基执行此过程便得到标准正交基。

□

**例 5.2**

对 $\boldsymbol v_1=(1,1,0)^\top$、$\boldsymbol v_2=(1,0,1)^\top$ 作 Gram–Schmidt 正交化。

**解**

取 $\boldsymbol u_1=(1,1,0)^\top$，则 $\|\boldsymbol u_1\|^2=2$，$\langle\boldsymbol v_2,\boldsymbol u_1\rangle=1$，所以

$$
\boldsymbol u_2=(1,0,1)^\top-\frac12(1,1,0)^\top
=\left(\frac12,-\frac12,1\right)^\top.
$$

标准化可取

$$
\boldsymbol e_1=\frac1{\sqrt2}(1,1,0)^\top,
\qquad
\boldsymbol e_2=\sqrt{\frac23}\left(\frac12,-\frac12,1\right)^\top.
$$

**定义 5.6（正交矩阵）**

实方阵 $\boldsymbol Q$ 若满足 $\boldsymbol Q^\top\boldsymbol Q=\boldsymbol I$，则称为**正交矩阵**（orthogonal matrix）。

此时 $\boldsymbol Q^{-1}=\boldsymbol Q^\top$，其列向量构成标准正交基。对任意 $\boldsymbol x,\boldsymbol y$，

$$
(\boldsymbol Q\boldsymbol x)^\top(\boldsymbol Q\boldsymbol y)
=\boldsymbol x^\top\boldsymbol Q^\top\boldsymbol Q\boldsymbol y
=\boldsymbol x^\top\boldsymbol y,
$$

故正交矩阵保持内积、长度和角度。取 $\boldsymbol x=\boldsymbol y$ 即得 $\|\boldsymbol Q\boldsymbol x\|=\|\boldsymbol x\|$。此外，$\det(\boldsymbol Q^\top\boldsymbol Q)=(\det\boldsymbol Q)^2=1$，所以 $\det\boldsymbol Q=\pm1$；行列式为 $-1$ 的正交矩阵包含反射，不能把它误认为所有正交矩阵都是旋转。

## 5.3 正交补与投影定理

**定义 5.7（正交补）**

设 $W$ 是内积空间 $V$ 的子空间，其**正交补**（orthogonal complement）定义为

$$
W^\perp=\{\boldsymbol v\in V:\langle\boldsymbol v,\boldsymbol w\rangle=0\ \text{对所有 }\boldsymbol w\in W\}.
$$

$W^\perp$ 是子空间，并且 $W\cap W^\perp=\{\boldsymbol0\}$，因为同时属于二者的向量与自身正交。

**定理 5.8（正交投影定理）**

设 $V$ 为内积空间，$W\subseteq V$ 为有限维子空间。任意 $\boldsymbol x\in V$ 都可唯一分解为

$$
\boldsymbol x=\boldsymbol w+\boldsymbol z,
\qquad \boldsymbol w\in W,\quad \boldsymbol z\in W^\perp.
\tag{5.4}
$$

而且 $\boldsymbol w$ 是 $W$ 中离 $\boldsymbol x$ 最近的唯一向量。

**证明**

由定理 5.5，取 $W$ 的标准正交基 $\boldsymbol e_1,\ldots,\boldsymbol e_k$，定义

$$
\boldsymbol w=\sum_{i=1}^k\langle\boldsymbol x,\boldsymbol e_i\rangle\boldsymbol e_i,
\qquad \boldsymbol z=\boldsymbol x-\boldsymbol w.
$$

对每个 $\boldsymbol e_j$，有 $\langle\boldsymbol z,\boldsymbol e_j\rangle=\langle\boldsymbol x,\boldsymbol e_j\rangle-\langle\boldsymbol x,\boldsymbol e_j\rangle=0$，故 $\boldsymbol z\in W^\perp$，证明存在性。若还有 $\boldsymbol x=\boldsymbol w'+\boldsymbol z'$，则 $\boldsymbol w-\boldsymbol w'=\boldsymbol z'-\boldsymbol z$ 同时属于 $W$ 和 $W^\perp$，只能是零向量，故分解唯一。

对任意 $\boldsymbol y\in W$，有 $\boldsymbol w-\boldsymbol y\in W$，它与 $\boldsymbol x-\boldsymbol w=\boldsymbol z$ 正交，因此

$$
\|\boldsymbol x-\boldsymbol y\|^2
=\|\boldsymbol x-\boldsymbol w\|^2+\|\boldsymbol w-\boldsymbol y\|^2
\ge\|\boldsymbol x-\boldsymbol w\|^2.
\tag{5.5}
$$

等号当且仅当 $\boldsymbol y=\boldsymbol w$，故最近点唯一。

□

**命题 5.9（正交投影映射）**

上述 $\boldsymbol w$ 称为 $\boldsymbol x$ 在 $W$ 上的正交投影，记 $P_W\boldsymbol x$。$P_W$ 是线性映射，并满足：

1. $P_W^2=P_W$；
2. 在实标准内积坐标下，其矩阵对称；
3. $\boldsymbol x-P_W\boldsymbol x\in W^\perp$；
4. $P_W\boldsymbol x=\boldsymbol x$ 当且仅当 $\boldsymbol x\in W$。

**证明**

分解的唯一性保证投影对加法和数乘线性。因为 $P_W\boldsymbol x\in W$，再次投影不变，故幂等。对任意 $\boldsymbol x,\boldsymbol y$，利用分解可得

$$
\langle P_W\boldsymbol x,\boldsymbol y\rangle
=\langle P_W\boldsymbol x,P_W\boldsymbol y\rangle
=\langle\boldsymbol x,P_W\boldsymbol y\rangle,
$$

所以投影在标准内积下自伴随，其矩阵对称。其余两条由投影定理直接得到。

□

**例 5.3**

求 $\boldsymbol x=(1,0,0)^\top$ 在平面 $W=\{\boldsymbol v:x_1+x_2+x_3=0\}$ 上的投影及到平面的距离。

**解**

平面法向量为 $\boldsymbol n=(1,1,1)^\top$。先减去法向方向上的分量：

$$
P_W\boldsymbol x
=\boldsymbol x-\frac{\boldsymbol x^\top\boldsymbol n}{\boldsymbol n^\top\boldsymbol n}\boldsymbol n
=(1,0,0)^\top-\frac13(1,1,1)^\top
=\left(\frac23,-\frac13,-\frac13\right)^\top.
$$

残差 $\boldsymbol x-P_W\boldsymbol x=(1,1,1)^\top/3$，其范数为 $1/\sqrt3$，即所求距离。

## 5.4 最小二乘的几何与正规方程

当 $\boldsymbol A\boldsymbol x=\boldsymbol b$ 无解时，$\boldsymbol b$ 不在列空间 $\mathcal C(\boldsymbol A)$ 中。退而求其次，可以寻找列空间中离 $\boldsymbol b$ 最近的点。

**定义 5.10（最小二乘问题）**

给定 $\boldsymbol A\in\mathbb R^{m\times n}$ 和 $\boldsymbol b\in\mathbb R^m$，最小二乘问题为

$$
\min_{\boldsymbol x\in\mathbb R^n}
\|\boldsymbol A\boldsymbol x-\boldsymbol b\|_2^2.
$$

**定理 5.11（正规方程）**

向量 $\widehat{\boldsymbol x}$ 是最小二乘解，当且仅当

$$
\boldsymbol A^\top(\boldsymbol A\widehat{\boldsymbol x}-\boldsymbol b)=\boldsymbol0,
\tag{5.6}
$$

即 $\boldsymbol A^\top\boldsymbol A\widehat{\boldsymbol x}=\boldsymbol A^\top\boldsymbol b$。最小二乘解总存在。

**证明**

最小二乘等价于寻找 $\boldsymbol A\widehat{\boldsymbol x}=P_{\mathcal C(\boldsymbol A)}\boldsymbol b$。投影定理说明投影总存在，且残差 $\boldsymbol b-\boldsymbol A\widehat{\boldsymbol x}$ 与列空间正交。由于列空间由 $\boldsymbol A$ 的各列张成，这恰等价于每一列与残差的内积为零，即式（5.6）。反向地，若式（5.6）成立，则残差与整个列空间正交，由投影分解的唯一性，$\boldsymbol A\widehat{\boldsymbol x}$ 必为投影，故 $\widehat{\boldsymbol x}$ 最小化距离。

□

也可直接展开平方范数验证：若 $\boldsymbol x$ 满足正规方程，对任意 $\boldsymbol y$，令 $\boldsymbol d=\boldsymbol y-\boldsymbol x$，则

$$
\|\boldsymbol A\boldsymbol y-\boldsymbol b\|^2
=\|\boldsymbol A\boldsymbol x-\boldsymbol b\|^2+\|\boldsymbol A\boldsymbol d\|^2
+2\boldsymbol d^\top\boldsymbol A^\top(\boldsymbol A\boldsymbol x-\boldsymbol b),
$$

最后一项为零，故不小于原目标值。这种代数证明与投影证明描述的是同一件事。

**定理 5.12（唯一性与投影矩阵）**

若 $\boldsymbol A$ 列满秩，则 $\boldsymbol A^\top\boldsymbol A$ 可逆，最小二乘解唯一，且

$$
\widehat{\boldsymbol x}
=(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top\boldsymbol b.
\tag{5.7}
$$

拟合值和投影矩阵分别为

$$
\widehat{\boldsymbol b}=\boldsymbol A\widehat{\boldsymbol x},\qquad
\boldsymbol P=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top.
\tag{5.8}
$$

若 $\boldsymbol A$ 列不满秩，参数解通常不唯一，但所有解给出相同的拟合值。

**证明**

若 $\boldsymbol A^\top\boldsymbol A\boldsymbol x=\boldsymbol0$，则 $\boldsymbol x^\top\boldsymbol A^\top\boldsymbol A\boldsymbol x=\|\boldsymbol A\boldsymbol x\|^2=0$。列满秩意味着 $\boldsymbol A$ 核为零，故 $\boldsymbol x=\boldsymbol0$，$\boldsymbol A^\top\boldsymbol A$ 可逆。正规方程于是给出唯一解。若列不满秩，任意两个正规方程解 $\boldsymbol x_1,\boldsymbol x_2$ 满足 $\boldsymbol A^\top\boldsymbol A(\boldsymbol x_1-\boldsymbol x_2)=\boldsymbol0$，同上得 $\boldsymbol A(\boldsymbol x_1-\boldsymbol x_2)=\boldsymbol0$，所以二者拟合值相同。

□

式（5.7）用于理论推导非常方便，但数值计算通常不直接形成并求逆 $\boldsymbol A^\top\boldsymbol A$，因为这可能放大条件数；第8章的 QR 方法会给出更稳定的途径。

**例 5.4**

用直线 $y=a+bt$ 对点 $(0,1),(1,2),(2,2)$ 作最小二乘拟合。

**解**

设计矩阵和响应向量为

$$
\boldsymbol A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},
\qquad \boldsymbol b=\begin{pmatrix}1\\2\\2\end{pmatrix}.
$$

正规方程为

$$
\begin{pmatrix}3&3\\3&5\end{pmatrix}
\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}5\\6\end{pmatrix}.
$$

两式相减得 $2b=1$，所以 $b=1/2$，$a=7/6$。拟合直线为 $\widehat y=7/6+t/2$。残差为 $(-1/6,1/3,-1/6)^\top$，它与 $\boldsymbol A$ 的两列分别正交：残差之和为零，且 $1/3+2(-1/6)=0$。

### 均方误差与参数解释的区别

列满秩保证 $\widehat{\boldsymbol x}$ 唯一，不保证模型正确、估计无偏或样本外预测有效。列不满秩时仍能唯一确定列空间中的拟合值，但不能把某一组参数解解释为唯一因果或结构关系。这些区别在因子共线时尤其重要：暴露组合可以预测收益，却不代表单个共线因子的系数能够被分别识别。

## 5.5 中心化、相关角与因子中性化

对样本向量 $\boldsymbol x=(x_1,\ldots,x_n)^\top$，记 $\bar x=n^{-1}\sum_i x_i$，$\boldsymbol1$ 为全一向量。中心化向量为

$$
\widetilde{\boldsymbol x}=\boldsymbol x-\bar x\boldsymbol1.
$$

由于 $\boldsymbol1^\top\widetilde{\boldsymbol x}=0$，中心化就是把样本向量投影到 $\boldsymbol1^\perp$ 后取剩余部分。若两个样本的方差非零，则 Pearson 相关系数满足

$$
\rho_{xy}
=\frac{\widetilde{\boldsymbol x}^\top\widetilde{\boldsymbol y}}
{\|\widetilde{\boldsymbol x}\|\,\|\widetilde{\boldsymbol y}\|}
=\cos\theta.
\tag{5.9}
$$

因此 $\rho=0$ 表示中心化样本向量正交，$\rho=\pm1$ 表示二者共线。若某个样本为常数，则中心化后为零向量，相关系数没有定义，不能强行解释为 $0$。

**例 5.5**

计算 $\boldsymbol x=(1,2,3)^\top$ 与 $\boldsymbol y=(1,0,1)^\top$ 的样本相关系数。

**解**

$\bar x=2,\bar y=2/3$，故

$$
\widetilde{\boldsymbol x}=(-1,0,1)^\top,
\qquad
\widetilde{\boldsymbol y}=\left(\frac13,-\frac23,\frac13\right)^\top.
$$

二者点积为 $-1/3+0+1/3=0$，所以 $\rho_{xy}=0$。原始向量点积为 $4$，并不为零；相关性讨论的是中心化后的线性关系，而非原始向量是否正交。

**例 5.6（单因子中性化）**

将收益样本 $\boldsymbol r=(2,1,3)^\top$ 对因子暴露 $\boldsymbol f=(1,1,0)^\top$ 作无常数项的正交中性化。

**解**

在 $\operatorname{span}\{\boldsymbol f\}$ 上的投影系数为

$$
\widehat\beta=\frac{\boldsymbol f^\top\boldsymbol r}{\boldsymbol f^\top\boldsymbol f}=\frac32.
$$

中性化残差为

$$
\boldsymbol r_\perp=\boldsymbol r-\widehat\beta\boldsymbol f
=\left(\frac12,-\frac12,3\right)^\top.
$$

直接计算得 $\boldsymbol f^\top\boldsymbol r_\perp=0$。几何上，中性化是删去可由因子暴露方向解释的部分；统计上，后续还需判断这种样本内正交是否具有稳定的样本外含义。

## 本章小结

内积诱导范数和角度，Cauchy–Schwarz 不等式保证相关角的定义有效，并给出三角不等式。Gram–Schmidt 过程把线性无关组转化为标准正交组，正交矩阵则保持内积和长度。有限维子空间上的正交投影定理给出唯一的“子空间内分量 + 正交残差”分解，投影同时是最近点映射。

对超定系统 $\boldsymbol A\boldsymbol x\approx\boldsymbol b$，最小二乘解恰好使拟合值成为 $\boldsymbol b$ 在列空间上的投影，其充要条件是正规方程。列满秩保证参数解唯一，列不满秩时参数可冗余但拟合值仍唯一。中心化把样本向量投影到全一向量的正交补，相关系数因而是中心化向量夹角的余弦；同一投影思想也构成回归和因子中性化的基础。

## 习题

1. 在 $\mathbb R^2$ 上定义 $\langle\boldsymbol x,\boldsymbol y\rangle=2x_1y_1+3x_2y_2$。验证它是内积，并求 $\boldsymbol x=(1,-1)^\top$ 的诱导范数。
2. 证明任意内积空间满足平行四边形恒等式
   $$\|\boldsymbol u+\boldsymbol v\|^2+\|\boldsymbol u-\boldsymbol v\|^2=2\|\boldsymbol u\|^2+2\|\boldsymbol v\|^2.$$
3. 求所有实数 $t$，使 $\boldsymbol u=(1,t)^\top$ 与 $\boldsymbol v=(1,1)^\top$ 在标准内积下满足 Cauchy–Schwarz 等号。
4. 对 $\boldsymbol v_1=(1,1,0)^\top$、$\boldsymbol v_2=(1,0,0)^\top$ 作 Gram–Schmidt 正交化，并写出对应标准正交组。
5. 设 $\boldsymbol Q$ 为正交矩阵。证明 $\|\boldsymbol Q\boldsymbol x\|=\|\boldsymbol x\|$，并给出一个行列式为 $-1$ 的正交矩阵。
6. 求 $\boldsymbol b=(2,1,1)^\top$ 在 $\operatorname{span}\{(1,1,0)^\top\}$ 上的投影和距离。
7. 求 $\boldsymbol b=(1,2,3)^\top$ 在平面 $x-y=0$ 上的投影。
8. 设 $W=\operatorname{span}\{(1,1,0)^\top,(0,1,1)^\top\}$，求 $W^\perp$ 的一组基及 $\dim W^\perp$。
9. 设 $W$ 是有限维内积空间 $V$ 的子空间。证明 $(W^\perp)^\perp=W$，并说明证明在哪里使用了投影定理。
10. 证明用常数 $c$ 对样本 $y_1,\ldots,y_n$ 作最小二乘拟合时，唯一最优常数为样本均值 $\bar y$。
11. 用 $y=a+bt$ 拟合点 $(0,0),(1,1),(2,1)$，求参数、拟合值和残差。
12. 设 $\boldsymbol A=\begin{pmatrix}1&2\\1&2\\1&2\end{pmatrix}$，$\boldsymbol b=(1,0,1)^\top$。写出正规方程，求全部最小二乘参数解，并验证拟合值相同。
13. 设 $\boldsymbol P=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top$，其中 $\boldsymbol A$ 列满秩。证明 $\boldsymbol P^2=\boldsymbol P$、$\boldsymbol P^\top=\boldsymbol P$，且 $\boldsymbol I-\boldsymbol P$ 也幂等。
14. 对例5.4的拟合结果，计算残差平方和，并直接验证残差与设计矩阵两列正交。
15. 设 $W$ 是有限维子空间，$\boldsymbol x\notin W$。证明最近点唯一；若把“正交投影”改成“在一般仿射集合上取某一点”，为什么通常不能期待相同结论？
16. 在加权内积 $\langle\boldsymbol x,\boldsymbol y\rangle_{\boldsymbol G}=\boldsymbol x^\top\boldsymbol G\boldsymbol y$ 下，其中 $\boldsymbol G$ 对称正定，推导 $\min_{\boldsymbol x}\|\boldsymbol A\boldsymbol x-\boldsymbol b\|_{\boldsymbol G}^2$ 的正规方程。
17. 计算样本 $\boldsymbol x=(1,2,3)^\top$ 与 $\boldsymbol y=(3,2,1)^\top$ 的 Pearson 相关系数，并解释其几何意义。
18. 证明任何中心化样本向量都与 $\boldsymbol1$ 正交；若最小二乘设计矩阵含截距列 $\boldsymbol1$，证明普通最小二乘残差之和为零。
19. 将 $\boldsymbol r=(4,2,0)^\top$ 对 $\boldsymbol f=(1,1,1)^\top$ 作无常数项正交中性化，求投影系数和残差。
20. 设 $\boldsymbol A$ 列满秩，$\boldsymbol H=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top$，$\boldsymbol M=\boldsymbol I-\boldsymbol H$。证明对任意 $\boldsymbol b$ 都有 $\boldsymbol b=\boldsymbol H\boldsymbol b+\boldsymbol M\boldsymbol b$，两部分正交，并由此推出
   $$\|\boldsymbol b\|^2=\|\boldsymbol H\boldsymbol b\|^2+\|\boldsymbol M\boldsymbol b\|^2.$$
   解释这一分解在回归拟合中的含义。
