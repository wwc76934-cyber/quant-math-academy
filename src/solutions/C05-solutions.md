# 第5章习题参考答案与解析

## 1.

映射 $\langle\boldsymbol x,\boldsymbol y\rangle=2x_1y_1+3x_2y_2$ 需验证内积三条公理。

**对称性。** 由实数乘法交换律，$2x_1y_1+3x_2y_2=2y_1x_1+3y_2x_2$，故 $\langle\boldsymbol x,\boldsymbol y\rangle=\langle\boldsymbol y,\boldsymbol x\rangle$。

**第一变元线性。** 设 $\boldsymbol x,\boldsymbol x',\boldsymbol y\in\mathbb R^2$，$\alpha,\beta\in\mathbb R$，则

$$
\langle\alpha\boldsymbol x+\beta\boldsymbol x',\boldsymbol y\rangle
=2(\alpha x_1+\beta x_1')y_1+3(\alpha x_2+\beta x_2')y_2
=\alpha\langle\boldsymbol x,\boldsymbol y\rangle+\beta\langle\boldsymbol x',\boldsymbol y\rangle.
$$

结合对称性，第二变元也线性。

**正定性。** 取 $\boldsymbol y=\boldsymbol x$ 得 $\langle\boldsymbol x,\boldsymbol x\rangle=2x_1^2+3x_2^2$。由于 $2>0$、$3>0$，该式恒非负；且 $2x_1^2+3x_2^2=0$ 当且仅当 $x_1=x_2=0$，即 $\boldsymbol x=\boldsymbol 0$。

因此它是内积。它可写成 $\langle\boldsymbol x,\boldsymbol y\rangle=\boldsymbol x^\top\boldsymbol G\boldsymbol y$，其中 $\boldsymbol G=\operatorname{diag}(2,3)$ 对称正定，这正是第 16 题加权内积的特例。

诱导范数为 $\|\boldsymbol x\|=\sqrt{2\cdot1^2+3\cdot(-1)^2}=\sqrt{2+3}=\sqrt5$。注意它与标准范数 $\|(1,-1)^\top\|=\sqrt2$ 不同：内积结构改变了几何。

## 2.

**证明**

由内积的双线性与对称性展开

$$
\|\boldsymbol u+\boldsymbol v\|^2
=\langle\boldsymbol u+\boldsymbol v,\boldsymbol u+\boldsymbol v\rangle
=\|\boldsymbol u\|^2+2\langle\boldsymbol u,\boldsymbol v\rangle+\|\boldsymbol v\|^2,
$$

$$
\|\boldsymbol u-\boldsymbol v\|^2
=\langle\boldsymbol u-\boldsymbol v,\boldsymbol u-\boldsymbol v\rangle
=\|\boldsymbol u\|^2-2\langle\boldsymbol u,\boldsymbol v\rangle+\|\boldsymbol v\|^2.
$$

两式相加，交叉项 $+2\langle\boldsymbol u,\boldsymbol v\rangle$ 与 $-2\langle\boldsymbol u,\boldsymbol v\rangle$ 相消，得

$$
\|\boldsymbol u+\boldsymbol v\|^2+\|\boldsymbol u-\boldsymbol v\|^2=2\|\boldsymbol u\|^2+2\|\boldsymbol v\|^2.
$$

□

证明只用到双线性与对称性，因此对任意内积空间成立，不限于 $\mathbb R^n$。反过来，平行四边形恒等式也是刻画「范数来自某个内积」的充要条件（Jordan–von Neumann 定理）：若范数满足该恒等式，则 $\langle\boldsymbol u,\boldsymbol v\rangle=\tfrac14(\|\boldsymbol u+\boldsymbol v\|^2-\|\boldsymbol u-\boldsymbol v\|^2)$ 定义了产生该范数的内积。这解释了为什么 $\|\cdot\|_1$ 与 $\|\cdot\|_\infty$ 不是内积范数：取 $\boldsymbol u=(1,0)^\top$、$\boldsymbol v=(0,1)^\top$，则 $\|\boldsymbol u+\boldsymbol v\|_1^2+\|\boldsymbol u-\boldsymbol v\|_1^2=4+4=8\neq2+2=4$。

## 3.

Cauchy–Schwarz 不等式 $|\langle\boldsymbol u,\boldsymbol v\rangle|\le\|\boldsymbol u\|\,\|\boldsymbol v\|$ 取等号的充要条件是 $\boldsymbol u,\boldsymbol v$ 线性相关。

本题 $\boldsymbol u=(1,t)^\top$、$\boldsymbol v=(1,1)^\top$ 均非零向量，故线性相关等价于存在 $\lambda$ 使 $(1,t)^\top=\lambda(1,1)^\top$。比较第一个分量得 $\lambda=1$，再比较第二个分量得 $t=1$。

因此唯一解为 $t=1$。验证：$\langle\boldsymbol u,\boldsymbol v\rangle=1+1=2$，$\|\boldsymbol u\|\|\boldsymbol v\|=\sqrt2\cdot\sqrt2=2$，等号成立。

常见错误是把「相关系数为 $\pm1$」与「$\boldsymbol u=\boldsymbol v$」混淆。取 $t=1$ 时二者恰好重合，但若 $\boldsymbol v=(2,2)^\top$，则 $\boldsymbol u=(1,1)^\top$ 仍使等号成立而 $\boldsymbol u\ne\boldsymbol v$。等号刻画的是共线性，包含反向情形 $\lambda<0$。

## 4.

令 $\boldsymbol v_1=(1,1,0)^\top$、$\boldsymbol v_2=(1,0,0)^\top$。

第一步，$\boldsymbol u_1=\boldsymbol v_1=(1,1,0)^\top$，$\|\boldsymbol u_1\|^2=2$。

第二步，减去 $\boldsymbol v_2$ 在 $\boldsymbol u_1$ 方向的分量。先算 $\langle\boldsymbol v_2,\boldsymbol u_1\rangle=1\cdot1+0\cdot1+0\cdot0=1$，于是

$$
\boldsymbol u_2
=\boldsymbol v_2-\frac{\langle\boldsymbol v_2,\boldsymbol u_1\rangle}{\|\boldsymbol u_1\|^2}\boldsymbol u_1
=(1,0,0)^\top-\frac12(1,1,0)^\top
=\left(\frac12,-\frac12,0\right)^{\!\top}.
$$

验证正交：$\langle\boldsymbol u_1,\boldsymbol u_2\rangle=\tfrac12-\tfrac12+0=0$。

归一化得标准正交组

$$
\boldsymbol e_1=\frac1{\sqrt2}(1,1,0)^\top,
\qquad
\boldsymbol e_2=\frac{\boldsymbol u_2}{\|\boldsymbol u_2\|}
=\frac{(1/2,-1/2,0)^\top}{1/\sqrt2}
=\left(\frac1{\sqrt2},-\frac1{\sqrt2},0\right)^{\!\top},
$$

其中 $\|\boldsymbol u_2\|=\sqrt{1/4+1/4}=1/\sqrt2$。

两个向量都落在 $xy$ 平面内，因此张成的是同一个二维子空间；Gram–Schmidt 没有改变张成空间，只更换了基的几何形态。这一性质在第 8 章 QR 分解中被推广为 $\boldsymbol A=\boldsymbol Q\boldsymbol R$。

## 5.

**证明**

设 $\boldsymbol Q$ 正交，即 $\boldsymbol Q^\top\boldsymbol Q=\boldsymbol I$。则

$$
\|\boldsymbol Q\boldsymbol x\|^2
=(\boldsymbol Q\boldsymbol x)^\top(\boldsymbol Q\boldsymbol x)
=\boldsymbol x^\top\boldsymbol Q^\top\boldsymbol Q\boldsymbol x
=\boldsymbol x^\top\boldsymbol I\boldsymbol x
=\boldsymbol x^\top\boldsymbol x
=\|\boldsymbol x\|^2.
$$

两边开方（范数非负）得 $\|\boldsymbol Q\boldsymbol x\|=\|\boldsymbol x\|$。

□

这说明正交变换保范数，从而保内积（由第 2 题的极化恒等式）、保角度、保距离，是刚体运动的代数刻画。

行列式为 $-1$ 的正交矩阵例子：

$$
\boldsymbol Q=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

检验 $\boldsymbol Q^\top\boldsymbol Q=\operatorname{diag}(1,1)=\boldsymbol I$，且 $\det\boldsymbol Q=-1$。它表示关于 $x$ 轴的反射。

一般地，$\det\boldsymbol Q=\pm1$，因为 $\det(\boldsymbol Q^\top\boldsymbol Q)=\det\boldsymbol I$ 给出 $(\det\boldsymbol Q)^2=1$。行列式为 $+1$ 的正交矩阵是旋转（保持定向），行列式为 $-1$ 的是反射或旋转与反射的复合（反转定向）。量化中这一区别体现在因子变换是否改变「手性」，但更常见的应用是：正交变换保持 $\|\boldsymbol x\|$，因此不改变风险的欧氏度量。

## 6.

设 $\boldsymbol a=(1,1,0)^\top$、$\boldsymbol b=(2,1,1)^\top$。一维子空间上的投影公式为

$$
\operatorname{proj}_{\boldsymbol a}\boldsymbol b
=\frac{\boldsymbol a^\top\boldsymbol b}{\boldsymbol a^\top\boldsymbol a}\boldsymbol a.
$$

计算 $\boldsymbol a^\top\boldsymbol b=2+1+0=3$，$\boldsymbol a^\top\boldsymbol a=1+1+0=2$，故

$$
\boldsymbol p=\frac32(1,1,0)^\top=\left(\frac32,\frac32,0\right)^{\!\top}.
$$

残差为

$$
\boldsymbol b-\boldsymbol p=\left(2-\frac32,\,1-\frac32,\,1-0\right)^{\!\top}
=\left(\frac12,-\frac12,1\right)^{\!\top}.
$$

验证正交性：$\boldsymbol a^\top(\boldsymbol b-\boldsymbol p)=\tfrac12-\tfrac12+0=0$。

距离即残差范数

$$
\|\boldsymbol b-\boldsymbol p\|
=\sqrt{\frac14+\frac14+1}
=\sqrt{\frac32}
=\frac{\sqrt6}{2}.
$$

交叉核对：$\|\boldsymbol b\|^2=4+1+1=6$，$\|\boldsymbol p\|^2=\tfrac94+\tfrac94=\tfrac92$，$6-\tfrac92=\tfrac32$，与勾股定理 $\|\boldsymbol b\|^2=\|\boldsymbol p\|^2+\|\boldsymbol b-\boldsymbol p\|^2$ 一致。

## 7.

平面 $x-y=0$ 即 $\{(x,y,z):x=y\}$，它由

$$
\boldsymbol a_1=(1,1,0)^\top,\qquad \boldsymbol a_2=(0,0,1)^\top
$$

张成。注意 $\langle\boldsymbol a_1,\boldsymbol a_2\rangle=0$，二者已正交，因此可对每个方向分别投影后相加，无需先做 Gram–Schmidt。

对 $\boldsymbol b=(1,2,3)^\top$：

$$
\boldsymbol a_1^\top\boldsymbol b=1+2+0=3,\quad \boldsymbol a_1^\top\boldsymbol a_1=2,
\qquad
\boldsymbol a_2^\top\boldsymbol b=3,\quad \boldsymbol a_2^\top\boldsymbol a_2=1.
$$

于是

$$
\boldsymbol p=\frac32(1,1,0)^\top+3(0,0,1)^\top
=\left(\frac32,\frac32,3\right)^{\!\top}.
$$

残差 $\boldsymbol b-\boldsymbol p=(-\tfrac12,\tfrac12,0)^\top$，检验它垂直于平面法向量 $(1,-1,0)^\top$：$(-\tfrac12)-(\tfrac12)=-1\ne0$？重新检验——残差应与 $\boldsymbol a_1,\boldsymbol a_2$ 都正交：$\boldsymbol a_1^\top(\boldsymbol b-\boldsymbol p)=-\tfrac12+\tfrac12+0=0$，$\boldsymbol a_2^\top(\boldsymbol b-\boldsymbol p)=0$，成立。平面 $x-y=0$ 的法向量是 $(1,-1,0)^\top$，而残差 $(-\tfrac12,\tfrac12,0)^\top=-\tfrac12(1,-1,0)^\top$ 恰好沿法向，这与投影定理一致：残差属于正交补，即法方向。

若用正规方程验证，设计矩阵 $\boldsymbol A=(\boldsymbol a_1,\boldsymbol a_2)$ 满足 $\boldsymbol A^\top\boldsymbol A=\operatorname{diag}(2,1)$，$\boldsymbol A^\top\boldsymbol b=(3,3)^\top$，解得系数 $(3/2,3)^\top$，与上同。

## 8.

设 $\boldsymbol z=(x,y,z)^\top\in W^\perp$，则它与两个生成元都正交：

$$
\boldsymbol z^\top(1,1,0)^\top=x+y=0,
\qquad
\boldsymbol z^\top(0,1,1)^\top=y+z=0.
$$

由第一式 $y=-x$，代入第二式得 $z=-y=x$。因此

$$
\boldsymbol z=(x,-x,x)^\top=x(1,-1,1)^\top,
\qquad
W^\perp=\operatorname{span}\{(1,-1,1)^\top\}.
$$

一组基为 $\{(1,-1,1)^\top\}$，$\dim W^\perp=1$。

核对维数公式：$\dim W=2$（两个生成元线性无关，因不成比例），$\dim W+\dim W^\perp=2+1=3=\dim\mathbb R^3$，符合投影定理给出的直和分解。

## 9.

**证明**

先证 $W\subseteq(W^\perp)^\perp$。设 $\boldsymbol w\in W$。对任意 $\boldsymbol v\in W^\perp$，由正交补定义 $\langle\boldsymbol w,\boldsymbol v\rangle=0$，故 $\boldsymbol w$ 与 $W^\perp$ 中每个向量正交，即 $\boldsymbol w\in(W^\perp)^\perp$。

再证 $(W^\perp)^\perp\subseteq W$。设 $\boldsymbol x\in(W^\perp)^\perp$。由投影定理，有限维内积空间分解为直和 $V=W\oplus W^\perp$，故存在唯一的 $\boldsymbol w\in W$、$\boldsymbol w'\in W^\perp$ 使

$$
\boldsymbol x=\boldsymbol w+\boldsymbol w'.
$$

因为 $\boldsymbol x\in(W^\perp)^\perp$ 且已证 $\boldsymbol w\in W\subseteq(W^\perp)^\perp$，而 $(W^\perp)^\perp$ 是子空间（对减法封闭），所以

$$
\boldsymbol w'=\boldsymbol x-\boldsymbol w\in(W^\perp)^\perp.
$$

于是 $\boldsymbol w'$ 同时属于 $W^\perp$ 与 $(W^\perp)^\perp$，两者按定义正交，故 $\langle\boldsymbol w',\boldsymbol w'\rangle=0$，即 $\boldsymbol w'=\boldsymbol 0$。因此 $\boldsymbol x=\boldsymbol w\in W$。

□

**投影定理的使用位置。** 关键一步是把 $\boldsymbol x$ 分解为 $\boldsymbol w+\boldsymbol w'$，这依赖 $V=W\oplus W^\perp$，也就是投影定理。没有这一分解，无法把「$\boldsymbol x$ 与 $W^\perp$ 正交」转化为「$\boldsymbol x$ 属于 $W$」。

这也说明结论对无限维空间需要修正：若 $W$ 不是闭子空间，则 $(W^\perp)^\perp=\overline W$（$W$ 的闭包）而非 $W$ 本身。有限维子空间自动闭，故本题无需此顾虑。

## 10.

目标函数为

$$
S(c)=\sum_{i=1}^n(y_i-c)^2.
$$

它是 $c$ 的二次函数，$S'(c)=-2\sum_i(y_i-c)$，$S''(c)=2n>0$，故 $S$ 严格凸，驻点即唯一全局最小点。令 $S'(c)=0$：

$$
\sum_{i=1}^n(y_i-c)=0
\;\Longrightarrow\;
\sum_i y_i=nc
\;\Longrightarrow\;
c=\bar y.
$$

几何解释：这是把 $\boldsymbol y$ 投影到 $\operatorname{span}\{\boldsymbol1\}$。投影系数为

$$
\frac{\boldsymbol1^\top\boldsymbol y}{\boldsymbol1^\top\boldsymbol1}=\frac{\sum_i y_i}{n}=\bar y.
$$

因此「用常数拟合数据的最优常数是均值」不是一条孤立的算术事实，而是投影定理的直接推论。均值作为最优常数预测的地位，等价于它是 $\boldsymbol y$ 在一维常数子空间上的正交投影，这为第 11 题的截距项和第 21 章回归中「总平方和以均值为中心」提供了统一起点。

## 11.

设计矩阵与响应向量为

$$
\boldsymbol A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},
\qquad
\boldsymbol b=\begin{pmatrix}0\\1\\1\end{pmatrix}.
$$

计算

$$
\boldsymbol A^\top\boldsymbol A=\begin{pmatrix}3&3\\3&5\end{pmatrix},
\qquad
\boldsymbol A^\top\boldsymbol b=\begin{pmatrix}0+1+1\\0+1+2\end{pmatrix}
=\begin{pmatrix}2\\3\end{pmatrix}.
$$

正规方程为 $3a+3b=2$、$3a+5b=3$。相减得 $2b=1$，即 $b=1/2$；回代 $3a=2-\tfrac32=\tfrac12$，得 $a=1/6$。

（也可用行列式：$\det(\boldsymbol A^\top\boldsymbol A)=15-9=6\neq0$，故解唯一。）

拟合值为

$$
\widehat{\boldsymbol y}=\boldsymbol A\begin{pmatrix}1/6\\1/2\end{pmatrix}
=\begin{pmatrix}1/6\\1/6+1/2\\1/6+1\end{pmatrix}
=\begin{pmatrix}1/6\\2/3\\7/6\end{pmatrix},
$$

残差为

$$
\boldsymbol e=\boldsymbol b-\widehat{\boldsymbol y}
=\begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}.
$$

残差平方和 $\|\boldsymbol e\|^2=\tfrac1{36}+\tfrac19+\tfrac1{36}=\tfrac{6}{36}=\tfrac16$。

验证残差与设计矩阵两列正交：与截距列 $\boldsymbol1$ 的内积为 $-\tfrac16+\tfrac13-\tfrac16=0$；与 $t$ 列 $(0,1,2)^\top$ 的内积为 $0+\tfrac13+2(-\tfrac16)=\tfrac13-\tfrac13=0$。两者均为零，符合投影定理。

## 12.

设计矩阵 $\boldsymbol A=\begin{pmatrix}1&2\\1&2\\1&2\end{pmatrix}$ 的两列成比例（第二列是第一列的两倍），故列不满秩，$\operatorname{rank}\boldsymbol A=1$。

计算

$$
\boldsymbol A^\top\boldsymbol A=\begin{pmatrix}3&6\\6&12\end{pmatrix},
\qquad
\boldsymbol A^\top\boldsymbol b=\begin{pmatrix}1+0+1\\2+0+2\end{pmatrix}
=\begin{pmatrix}2\\4\end{pmatrix}.
$$

正规方程为

$$
3x_1+6x_2=2,
\qquad
6x_1+12x_2=4.
$$

第二个方程是第一个的两倍，二者等价，独立方程只有一个：

$$
x_1+2x_2=\frac23.
$$

全部解为

$$
\boldsymbol x=\begin{pmatrix}2/3-2t\\t\end{pmatrix},
\qquad t\in\mathbb R,
$$

即一条直线（一维仿射解集）。$\det(\boldsymbol A^\top\boldsymbol A)=36-36=0$ 与此一致。

拟合值为

$$
\boldsymbol A\boldsymbol x
=\begin{pmatrix}1&2\\1&2\\1&2\end{pmatrix}
\begin{pmatrix}2/3-2t\\t\end{pmatrix}
=(x_1+2x_2)\begin{pmatrix}1\\1\\1\end{pmatrix}
=\frac23\begin{pmatrix}1\\1\\1\end{pmatrix}
=\begin{pmatrix}2/3\\2/3\\2/3\end{pmatrix},
$$

其中最后一步用了约束 $x_1+2x_2=2/3$。因此对每一个参数解，拟合值都相同，验证成立。

**解释。** 列空间 $\operatorname{col}(\boldsymbol A)=\operatorname{span}\{(1,1,1)^\top\}$ 是一维的，投影到该子空间的向量唯一，故拟合值唯一；但把该投影「翻译」回参数坐标时，因为 $\boldsymbol A$ 的核非平凡（$\ker\boldsymbol A=\operatorname{span}\{(-2,1)^\top\}$），参数不唯一。这正是多重共线性的代数本质：可预测，不可识别。第 21 章的回归推断与第 23 章的岭回归都以此为背景——岭回归通过 $\lambda\boldsymbol I$ 使矩阵可逆，从而在共线情形下选出唯一解。

## 13.

**证明**

设 $\boldsymbol A$ 列满秩，故 $\boldsymbol A^\top\boldsymbol A$ 可逆（对 $\boldsymbol x\ne\boldsymbol0$，$\boldsymbol x^\top\boldsymbol A^\top\boldsymbol A\boldsymbol x=\|\boldsymbol A\boldsymbol x\|^2>0$）。记 $\boldsymbol P=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top$。

**幂等性。**

$$
\boldsymbol P^2
=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top
=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol I\,\boldsymbol A^\top
=\boldsymbol P,
$$

关键是中间的 $\boldsymbol A^\top\boldsymbol A$ 与其逆相消。

**对称性。** 利用 $(\boldsymbol X\boldsymbol Y)^\top=\boldsymbol Y^\top\boldsymbol X^\top$ 与「对称矩阵之逆仍对称」：

$$
\boldsymbol P^\top
=\bigl(\boldsymbol A^\top\bigr)^\top\bigl((\boldsymbol A^\top\boldsymbol A)^{-1}\bigr)^\top\boldsymbol A^\top
=\boldsymbol A(\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top
=\boldsymbol P,
$$

其中 $(\boldsymbol A^\top\boldsymbol A)^\top=\boldsymbol A^\top(\boldsymbol A^\top)^\top=\boldsymbol A^\top\boldsymbol A$ 说明它对称，故其逆也对称。

**$\boldsymbol I-\boldsymbol P$ 幂等。**

$$
(\boldsymbol I-\boldsymbol P)^2=\boldsymbol I-2\boldsymbol P+\boldsymbol P^2
=\boldsymbol I-2\boldsymbol P+\boldsymbol P
=\boldsymbol I-\boldsymbol P.
$$

□

幂等且对称正是正交投影矩阵的刻画：$\boldsymbol P$ 投影到 $\operatorname{col}(\boldsymbol A)$，$\boldsymbol I-\boldsymbol P$ 投影到其正交补。第 20 题将用这一对分解导出平方和恒等式。另外 $\operatorname{tr}\boldsymbol P=\operatorname{tr}\bigl((\boldsymbol A^\top\boldsymbol A)^{-1}\boldsymbol A^\top\boldsymbol A\bigr)=\operatorname{tr}\boldsymbol I_k=k$，即秩等于列数（用了 $\operatorname{tr}(\boldsymbol X\boldsymbol Y)=\operatorname{tr}(\boldsymbol Y\boldsymbol X)$）。

## 14.

例 5.4 拟合点 $(0,1),(1,2),(2,2)$，得 $\widehat y=7/6+t/2$，残差 $\boldsymbol e=(-1/6,\,1/3,\,-1/6)^\top$。

残差平方和为

$$
\|\boldsymbol e\|^2
=\left(-\frac16\right)^2+\left(\frac13\right)^2+\left(-\frac16\right)^2
=\frac1{36}+\frac19+\frac1{36}
=\frac{1+4+1}{36}
=\frac16.
$$

设计矩阵 $\boldsymbol A=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix}$ 的两列分别是 $\boldsymbol a_1=(1,1,1)^\top$ 与 $\boldsymbol a_2=(0,1,2)^\top$。直接计算内积：

$$
\boldsymbol a_1^\top\boldsymbol e=-\frac16+\frac13-\frac16=\frac{-1+2-1}{6}=0,
$$

$$
\boldsymbol a_2^\top\boldsymbol e=0\cdot\left(-\frac16\right)+1\cdot\frac13+2\cdot\left(-\frac16\right)
=\frac13-\frac13=0.
$$

两列都与残差正交，故 $\boldsymbol A^\top\boldsymbol e=\boldsymbol0$，即 $\boldsymbol e\perp\operatorname{col}(\boldsymbol A)$。

这与正规方程等价：$\boldsymbol A^\top(\boldsymbol b-\boldsymbol A\widehat{\boldsymbol x})=\boldsymbol0$ 正是 $\boldsymbol A^\top\boldsymbol A\widehat{\boldsymbol x}=\boldsymbol A^\top\boldsymbol b$。因此「残差垂直于设计矩阵列空间」与「参数满足正规方程」是同一事实的几何与代数两种表述。

另一核对：$\|\boldsymbol b\|^2=1+4+4=9$，$\|\widehat{\boldsymbol y}\|^2=(7/6)^2+(5/3)^2+(13/6)^2=\tfrac{49+100+169}{36}=\tfrac{318}{36}=\tfrac{53}{6}$，而 $9-\tfrac{53}{6}=\tfrac{54-53}{6}=\tfrac16$，与残差平方和一致（勾股定理）。

## 15.

**唯一性证明。** 设 $\boldsymbol w_1,\boldsymbol w_2\in W$ 都是 $\boldsymbol x$ 的最近点，记 $d=\inf_{\boldsymbol w\in W}\|\boldsymbol x-\boldsymbol w\|$，故 $\|\boldsymbol x-\boldsymbol w_1\|=\|\boldsymbol x-\boldsymbol w_2\|=d$。因 $W$ 是子空间，中点 $\boldsymbol m=(\boldsymbol w_1+\boldsymbol w_2)/2\in W$，于是 $\|\boldsymbol x-\boldsymbol m\|\ge d$。

对 $\boldsymbol u=\boldsymbol x-\boldsymbol w_1$、$\boldsymbol v=\boldsymbol x-\boldsymbol w_2$ 用第 2 题的平行四边形恒等式。注意 $\boldsymbol u+\boldsymbol v=2(\boldsymbol x-\boldsymbol m)$、$\boldsymbol u-\boldsymbol v=\boldsymbol w_2-\boldsymbol w_1$，得

$$
2d^2
=2\|\boldsymbol x-\boldsymbol m\|^2+\frac12\|\boldsymbol w_1-\boldsymbol w_2\|^2
\ge 2d^2+\frac12\|\boldsymbol w_1-\boldsymbol w_2\|^2.
$$

两边消去 $2d^2$ 得 $\tfrac12\|\boldsymbol w_1-\boldsymbol w_2\|^2\le0$，故 $\boldsymbol w_1=\boldsymbol w_2$。

□

证明只用到 $W$ 的**凸性**（保证中点在内）与范数来自内积（保证平行四边形恒等式），并未用到正交性本身。

**关于「一般仿射集合」与更一般的集合。** 需要区分三种情形，结论并不相同：

*仿射集合。* 仿射集合是平移后的子空间，仍然凸且闭，因此最近点依然唯一。把上面证明中的 $W$ 换成仿射集 $\boldsymbol w_0+W$，中点仍属于该集合，论证逐字成立。所以仿射情形不会失去唯一性。

*非凸集合。* 唯一性可能失效。取单位球面 $S=\{\boldsymbol z:\|\boldsymbol z\|=1\}$ 与 $\boldsymbol x=\boldsymbol0$，则 $S$ 上每一点到原点的距离都是 $1$，最近点有无穷多个。几何原因是集合「向内弯」，中点掉出集合，平行四边形论证的 $\|\boldsymbol x-\boldsymbol m\|\ge d$ 不再成立。

*非闭集合。* 存在性可能失效。取 $W=\{(x,0):x\ne0\}$（去掉原点的直线）与 $\boldsymbol x=(0,1)$，则下确界距离为 $1$，但取不到：任何 $(x,0)$（$x\ne0$）的距离 $\sqrt{x^2+1}>1$。

在有限维中子空间自动闭，所以教材主线不会遇到第三种失败；但在无限维（如函数空间）与带约束的组合优化（非凸可行域）中，这两种失败都是真实存在的，也是优化理论必须显式声明「闭凸」假设的原因。第 15 章的凸集理论将系统处理这一问题。

## 16.

目标函数为

$$
S(\boldsymbol x)=\|\boldsymbol A\boldsymbol x-\boldsymbol b\|_{\boldsymbol G}^2
=(\boldsymbol A\boldsymbol x-\boldsymbol b)^\top\boldsymbol G(\boldsymbol A\boldsymbol x-\boldsymbol b),
$$

其中 $\boldsymbol G$ 对称正定。展开（记 $\boldsymbol r=\boldsymbol A\boldsymbol x-\boldsymbol b$）：

$$
S=\boldsymbol x^\top\boldsymbol A^\top\boldsymbol G\boldsymbol A\boldsymbol x
-2\boldsymbol b^\top\boldsymbol G\boldsymbol A\boldsymbol x
+\boldsymbol b^\top\boldsymbol G\boldsymbol b,
$$

其中交叉项合并用了 $\boldsymbol G$ 对称：$\boldsymbol x^\top\boldsymbol A^\top\boldsymbol G\boldsymbol b=(\boldsymbol b^\top\boldsymbol G\boldsymbol A\boldsymbol x)^\top=\boldsymbol b^\top\boldsymbol G\boldsymbol A\boldsymbol x$（标量等于自身转置）。

对 $\boldsymbol x$ 求梯度，用第 7 章的矩阵微分规则 $\nabla_{\boldsymbol x}(\boldsymbol x^\top\boldsymbol B\boldsymbol x)=(\boldsymbol B+\boldsymbol B^\top)\boldsymbol x$（$\boldsymbol B=\boldsymbol A^\top\boldsymbol G\boldsymbol A$ 对称时为 $2\boldsymbol B\boldsymbol x$）与 $\nabla_{\boldsymbol x}(\boldsymbol c^\top\boldsymbol x)=\boldsymbol c$：

$$
\nabla S=2\boldsymbol A^\top\boldsymbol G\boldsymbol A\boldsymbol x-2\boldsymbol A^\top\boldsymbol G\boldsymbol b.
$$

令其为零，得加权正规方程

$$
\boxed{\;\boldsymbol A^\top\boldsymbol G\boldsymbol A\,\boldsymbol x=\boldsymbol A^\top\boldsymbol G\boldsymbol b.\;}
$$

**可解性。** 若 $\boldsymbol A$ 列满秩且 $\boldsymbol G$ 正定，则 $\boldsymbol A^\top\boldsymbol G\boldsymbol A$ 正定：对 $\boldsymbol x\ne\boldsymbol0$，$\boldsymbol A\boldsymbol x\ne\boldsymbol0$，故

$$
\boldsymbol x^\top\boldsymbol A^\top\boldsymbol G\boldsymbol A\boldsymbol x=(\boldsymbol A\boldsymbol x)^\top\boldsymbol G(\boldsymbol A\boldsymbol x)>0.
$$

因而解唯一。且 $S$ 的 Hessian 为 $2\boldsymbol A^\top\boldsymbol G\boldsymbol A\succ0$，说明这是严格凸问题的唯一全局最小。

**几何意义。** 令 $\boldsymbol G=\boldsymbol C^\top\boldsymbol C$（Cholesky，见第 8 章），则 $\|\boldsymbol A\boldsymbol x-\boldsymbol b\|_{\boldsymbol G}=\|\boldsymbol C\boldsymbol A\boldsymbol x-\boldsymbol C\boldsymbol b\|_2$，即加权最小二乘等价于对变换后的数据做普通最小二乘。因此它仍是某个内积空间中的正交投影，只是「垂直」的标准由 $\boldsymbol G$ 决定。

**量化应用。** 当 $\boldsymbol G=\boldsymbol\Sigma^{-1}$（收益协方差矩阵之逆）时，该式就是广义最小二乘（第 21 章），它给出异方差或相关误差下的有效估计；在马科维茨框架中，$\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w$ 形式的目标同样以 $\boldsymbol G$-内积的投影结构出现（第 32 章）。

## 17.

样本 $\boldsymbol x=(1,2,3)^\top$、$\boldsymbol y=(3,2,1)^\top$，均值均为 $\bar x=\bar y=2$。中心化得

$$
\widetilde{\boldsymbol x}=(-1,0,1)^\top,
\qquad
\widetilde{\boldsymbol y}=(1,0,-1)^\top.
$$

内积与范数：

$$
\widetilde{\boldsymbol x}^\top\widetilde{\boldsymbol y}=-1+0-1=-2,
\qquad
\|\widetilde{\boldsymbol x}\|=\|\widetilde{\boldsymbol y}\|=\sqrt{1+0+1}=\sqrt2.
$$

由式（5.9）的几何表达，

$$
\rho_{xy}
=\frac{\widetilde{\boldsymbol x}^\top\widetilde{\boldsymbol y}}{\|\widetilde{\boldsymbol x}\|\,\|\widetilde{\boldsymbol y}\|}
=\frac{-2}{\sqrt2\cdot\sqrt2}
=\frac{-2}{2}
=-1.
$$

**几何意义。** 相关系数就是两个中心化向量夹角的余弦。$\rho=-1$ 意味着夹角为 $\pi$，两向量方向完全相反，即 $\widetilde{\boldsymbol y}=-\widetilde{\boldsymbol x}$。还原到原始数据：$y_i=4-x_i$，是完全负线性关系。

在二维散点图上，三点 $(1,3),(2,2),(3,1)$ 精确落在斜率为 $-1$ 的直线上。这也说明 $|\rho|=1$ 当且仅当中心化向量线性相关（第 3 题的 Cauchy–Schwarz 等号条件），即数据完全共线。

量化含义：$\rho=-1$ 的两资产可以构造出零方差组合（权重按 $1:1$ 且方向相反），这是完美对冲的数学条件；现实中相关系数极少达到 $\pm1$，且样本相关在厚尾数据下不稳定，因此第 32 章需要收缩估计。

## 18.

**第一部分。** 中心化向量 $\widetilde{\boldsymbol x}=\boldsymbol x-\bar x\boldsymbol1$，其中 $\bar x=\tfrac1n\sum_i x_i$。计算与全一向量的内积：

$$
\boldsymbol1^\top\widetilde{\boldsymbol x}
=\sum_{i=1}^n(x_i-\bar x)
=\sum_i x_i-n\bar x
=\sum_i x_i-n\cdot\frac1n\sum_i x_i
=0.
$$

故 $\widetilde{\boldsymbol x}\perp\boldsymbol1$。

几何上，中心化就是把 $\boldsymbol x$ 投影到 $\boldsymbol1$ 的正交补 $\boldsymbol1^\perp$：$\boldsymbol x=\bar x\boldsymbol1+\widetilde{\boldsymbol x}$，第一项是沿 $\boldsymbol1$ 的投影（分量 $\bar x$），第二项是残差。这说明「去均值」不是任意的数据预处理，而是一次正交投影。

**第二部分。** 设设计矩阵 $\boldsymbol A$ 含截距列，即某列为 $\boldsymbol1$。最小二乘残差 $\boldsymbol e=\boldsymbol b-\boldsymbol A\widehat{\boldsymbol\beta}$ 满足正规方程 $\boldsymbol A^\top\boldsymbol e=\boldsymbol0$，即残差与 $\boldsymbol A$ 的**每一列**正交。特别取截距列 $\boldsymbol1$：

$$
\boldsymbol1^\top\boldsymbol e=\sum_{i=1}^n e_i=0.
$$

故残差之和为零，从而残差均值为零。

**重要限定。** 该结论依赖模型含截距项。若回归强制过原点（无截距），残差之和一般不为零。这也解释了为什么样本方差用 $\sum(x_i-\bar x)^2$ 而非 $\sum x_i^2$：前者是投影到 $\boldsymbol1^\perp$ 后的范数平方，去掉了均值方向的贡献，与第 21 章的总平方和分解 $\mathrm{SST}=\mathrm{SSR}+\mathrm{SSE}$ 同源（第 20 题给出其矩阵形式）。

## 19.

对 $\boldsymbol r=(4,2,0)^\top$ 与 $\boldsymbol f=(1,1,1)^\top$ 作无常数项正交中性化，即把 $\boldsymbol r$ 投影到 $\operatorname{span}\{\boldsymbol f\}$ 并取残差。

投影系数（即例 5.6 的单因子暴露）为

$$
\beta=\frac{\boldsymbol f^\top\boldsymbol r}{\boldsymbol f^\top\boldsymbol f}
=\frac{4+2+0}{1+1+1}
=\frac63
=2.
$$

投影（可由 $\boldsymbol f$ 解释的部分）为

$$
\boldsymbol p=\beta\boldsymbol f=2(1,1,1)^\top=(2,2,2)^\top.
$$

残差（中性化后的部分）为

$$
\widetilde{\boldsymbol r}=\boldsymbol r-\boldsymbol p=(4-2,\,2-2,\,0-2)^\top=(2,0,-2)^\top.
$$

验证正交性：$\boldsymbol f^\top\widetilde{\boldsymbol r}=2+0-2=0$。

**解释。** 这里 $\boldsymbol f$ 是全一向量，所以「对 $\boldsymbol f$ 中性化」等价于去均值：$\beta=2=\bar r$，残差 $(2,0,-2)^\top$ 正是 $\boldsymbol r-\bar r\boldsymbol1$。这与第 18 题的结论一致。

若 $\boldsymbol f$ 换成行业哑变量或市值因子，同一公式就给出行业中性化或市值中性化后的因子暴露，是多因子研究的标准预处理步骤（第 31 章）。注意「无常数项」意味着不再单独扣除截距：若 $\boldsymbol f$ 本身不含常数分量，中性化后的残差未必均值为零，此时通常还需再对 $\boldsymbol1$ 正交化，或把 $\boldsymbol1$ 与 $\boldsymbol f$ 一起放入设计矩阵按第 12 题的方式联合投影。

## 20.

**分解。** 由 $\boldsymbol H+\boldsymbol M=\boldsymbol H+(\boldsymbol I-\boldsymbol H)=\boldsymbol I$，对任意 $\boldsymbol b$ 直接有

$$
\boldsymbol b=\boldsymbol I\boldsymbol b=(\boldsymbol H+\boldsymbol M)\boldsymbol b=\boldsymbol H\boldsymbol b+\boldsymbol M\boldsymbol b.
$$

**正交性。** 由第 13 题，$\boldsymbol H$ 对称幂等。计算内积：

$$
(\boldsymbol H\boldsymbol b)^\top(\boldsymbol M\boldsymbol b)
=\boldsymbol b^\top\boldsymbol H^\top\boldsymbol M\boldsymbol b
=\boldsymbol b^\top\boldsymbol H\boldsymbol M\boldsymbol b,
$$

而

$$
\boldsymbol H\boldsymbol M=\boldsymbol H(\boldsymbol I-\boldsymbol H)=\boldsymbol H-\boldsymbol H^2=\boldsymbol H-\boldsymbol H=\boldsymbol0.
$$

故内积为零，两部分正交。同理 $\boldsymbol M\boldsymbol H=\boldsymbol0$，且 $\boldsymbol M$ 也对称幂等。

**勾股恒等式。** 由正交性，

$$
\|\boldsymbol b\|^2
=\|\boldsymbol H\boldsymbol b+\boldsymbol M\boldsymbol b\|^2
=\|\boldsymbol H\boldsymbol b\|^2+2(\boldsymbol H\boldsymbol b)^\top(\boldsymbol M\boldsymbol b)+\|\boldsymbol M\boldsymbol b\|^2
=\|\boldsymbol H\boldsymbol b\|^2+\|\boldsymbol M\boldsymbol b\|^2.
$$

□

**回归中的含义。** 在线性模型中取 $\boldsymbol A$ 为含截距列的设计矩阵，则 $\boldsymbol H\boldsymbol b=\widehat{\boldsymbol y}$ 是拟合值，$\boldsymbol M\boldsymbol b=\boldsymbol b-\widehat{\boldsymbol y}=\boldsymbol e$ 是残差。上式给出

$$
\|\widehat{\boldsymbol y}\|^2+\|\boldsymbol e\|^2=\|\boldsymbol b\|^2.
$$

若进一步把 $\boldsymbol b$ 中心化（等价于分离出截距列的贡献），就得到第 21 章的核心恒等式

$$
\mathrm{SST}=\mathrm{SSR}+\mathrm{SSE},
$$

即总离差平方和 = 回归（已解释）平方和 + 残差（未解释）平方和。决定系数 $R^2=\mathrm{SSR}/\mathrm{SST}$ 因此可解释为 $\|\widehat{\boldsymbol y}\|/\|\boldsymbol b\|$ 的平方，也就是响应向量与其拟合值夹角余弦的平方——拟合优度是一个**角度**概念，而不只是误差大小的度量。

正交性 $\boldsymbol H\boldsymbol M=\boldsymbol0$ 还说明：增加解释变量只会把残差子空间进一步压缩，$\boldsymbol M$ 的秩（$n-p$）随参数个数 $p$ 减少，这正是第 21 章自由度与 $R^2$ 必然随变量增加而上升的几何原因，也是为什么需要用调整 $R^2$ 或信息准则惩罚复杂度（第 23 章）。
