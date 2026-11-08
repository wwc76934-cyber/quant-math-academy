# 第15章　凸集、凸函数与共轭工具

凸优化研究的不是“目标函数看起来像一个碗”这样一种表面形态，而是一组能够保证局部信息具有全局意义的数学结构。若一个极小化问题的目标函数为凸函数、可行域为凸集，则任何局部极小值都是全局极小值，而且最优性通常可以通过切平面、法向锥或对偶变量刻画。这一性质使凸分析成为约束优化、统计估计、投资组合构建和机器学习正则化的共同基础。

本章先建立凸集与凸函数的严格定义，再讨论分离超平面、一阶和二阶判别、Jensen 不等式以及 Fenchel 共轭。全章在有限维实向量空间 $\mathbb R^n$ 中展开；除特别说明外，函数均取实值，内积写为 $\boldsymbol x^\top\boldsymbol y$，范数 $\|\cdot\|$ 默认是欧氏范数。

## 15.1 凸集、锥与分离超平面

### 15.1.1 凸集与凸组合

**定义 15.1（凸集）**

集合 $C\subseteq\mathbb R^n$ 称为凸集，如果对任意 $\boldsymbol x,\boldsymbol y\in C$ 和任意 $\theta\in[0,1]$，都有

$$
\theta\boldsymbol x+(1-\theta)\boldsymbol y\in C.
\tag{15.1}
$$

式（15.1）表示连接集合中任意两点的线段仍完全位于集合内。进一步，若 $\boldsymbol x_1,\ldots,\boldsymbol x_m\in C$，$\lambda_i\geq0$ 且 $\sum_{i=1}^m\lambda_i=1$，则称 $\sum_{i=1}^m\lambda_i\boldsymbol x_i$ 为这些点的凸组合。对 $m$ 作归纳可知，凸集对任意有限凸组合封闭。

$m=2$ 时就是定义。假设 $m-1$ 个点的结论成立，且 $\lambda_m<1$，则

$$
\sum_{i=1}^m\lambda_i\boldsymbol x_i
=(1-\lambda_m)\sum_{i=1}^{m-1}\frac{\lambda_i}{1-\lambda_m}\boldsymbol x_i
+\lambda_m\boldsymbol x_m.
$$

括号内是 $m-1$ 个点的凸组合，故属于 $C$；再用两点凸性即得结论。若 $\lambda_m=1$，结论显然。

常见的凸集包括：

- 超平面 $\{\boldsymbol x:\boldsymbol a^\top\boldsymbol x=b\}$ 和半空间 $\{\boldsymbol x:\boldsymbol a^\top\boldsymbol x\leq b\}$；
- 欧氏球 $\{\boldsymbol x:\|\boldsymbol x-\boldsymbol x_0\|\leq r\}$；
- 椭球 $\{\boldsymbol x:(\boldsymbol x-\boldsymbol x_0)^\top\boldsymbol Q(\boldsymbol x-\boldsymbol x_0)\leq1\}$，其中 $\boldsymbol Q$ 对称正定；
- 概率单纯形 $\Delta_n=\{\boldsymbol x:x_i\geq0,\ \sum_i x_i=1\}$；
- 对称半正定矩阵锥 $\mathbb S_+^n$。

椭球的凸性可由 $\boldsymbol z\mapsto\boldsymbol z^\top\boldsymbol Q\boldsymbol z$ 的凸性推出，而不必依赖几何想象。概率单纯形是 $n$ 个半空间与一个超平面的交集，因此也是凸集。

**命题 15.2（凸集的运算）**

任意多个凸集的交集仍为凸集。凸集在线性映射下的像与逆像仍为凸集；凸集的 Minkowski 和 $C+D=\{\boldsymbol x+\boldsymbol y:\boldsymbol x\in C,\boldsymbol y\in D\}$ 仍为凸集。

**证明**

以线性映射 $\boldsymbol A$ 的像为例。若 $\boldsymbol u=\boldsymbol A\boldsymbol x$、$\boldsymbol v=\boldsymbol A\boldsymbol y$，其中 $\boldsymbol x,\boldsymbol y\in C$，则

$$
\theta\boldsymbol u+(1-\theta)\boldsymbol v
=\boldsymbol A[\theta\boldsymbol x+(1-\theta)\boldsymbol y]
\in\boldsymbol A C.
$$

其余结论由同样的代入得到。交集的情形允许任意指标族，因为凸组合只需在每个集合中分别验证。

□

集合的并通常不保持凸性。例如两个不相交闭球的并包含球心，却不包含两球心连线的中段。凸集的内积、逐点最大值也不是集合运算，不能与函数运算混淆。

**定义 15.3（凸包）**

集合 $S\subseteq\mathbb R^n$ 的凸包 $\operatorname{conv}S$ 是 $S$ 中所有有限凸组合构成的集合，即

$$
\operatorname{conv}S
=\left\{\sum_{i=1}^m\lambda_i\boldsymbol x_i:
\boldsymbol x_i\in S,\ \lambda_i\geq0,\ \sum_i\lambda_i=1,\ m\in\mathbb N\right\}.
$$

它是包含 $S$ 的最小凸集。事实上，任何包含 $S$ 的凸集必须包含上述全部凸组合，而这些凸组合本身又构成凸集。

### 15.1.2 锥与凸锥

**定义 15.4（锥和凸锥）**

若集合 $K$ 对任意 $\boldsymbol x\in K$ 和 $\alpha\geq0$ 都满足 $\alpha\boldsymbol x\in K$，则称 $K$ 为锥。若 $K$ 同时为锥和凸集，则称其为凸锥。

非负象限 $\mathbb R_+^n$、二阶锥

$$
\{(\boldsymbol x,t)\in\mathbb R^n\times\mathbb R:\|\boldsymbol x\|\leq t\}
$$

以及 $\mathbb S_+^n$ 都是凸锥。锥只要求径向封闭，并不要求线段封闭。例如 $\mathbb R^2$ 中两条从原点出发的射线之并是锥，但一般不是凸锥。

若 $K$ 是闭凸锥，其对偶锥定义为

$$
K^*=\{\boldsymbol y:\boldsymbol y^\top\boldsymbol x\geq0,\ \forall\boldsymbol x\in K\}.
$$

它是一族闭半空间的交集，因而总是闭凸锥。对偶锥把“对所有可行方向的非负性”转化为一个几何对象，是锥约束对偶的基础。

### 15.1.3 投影与分离超平面

凸集之所以具有良好的最优性理论，一个关键原因是：位于凸集外的点可以用超平面与集合分开。这里先证明闭凸集外一点的严格分离，所用工具本身也十分重要。

**引理 15.5（闭凸集上的投影）**

设 $C\subseteq\mathbb R^n$ 是非空闭凸集，$\boldsymbol z\notin C$。则存在唯一的 $\boldsymbol p\in C$ 使 $\|\boldsymbol z-\boldsymbol p\|=\inf_{\boldsymbol x\in C}\|\boldsymbol z-\boldsymbol x\|$，并且对任意 $\boldsymbol x\in C$ 有

$$
(\boldsymbol z-\boldsymbol p)^\top(\boldsymbol x-\boldsymbol p)\leq0.
\tag{15.2}
$$

**证明**

取 $C$ 与以 $\boldsymbol z$ 为圆心的充分大闭球之交，得到一个非空紧集；连续函数 $\boldsymbol x\mapsto\|\boldsymbol z-\boldsymbol x\|^2$ 在其上取得最小值。若有两个不同最小点 $\boldsymbol p_1,\boldsymbol p_2$，令 $\boldsymbol p=(\boldsymbol p_1+\boldsymbol p_2)/2$。由平行四边形恒等式，

$$
\|\boldsymbol z-\boldsymbol p\|^2
=\frac12\|\boldsymbol z-\boldsymbol p_1\|^2
+\frac12\|\boldsymbol z-\boldsymbol p_2\|^2
-\frac14\|\boldsymbol p_1-\boldsymbol p_2\|^2,
$$

严格小于共同最小值，矛盾。因此最小点唯一。

对任意 $\boldsymbol x\in C$ 和 $t\in[0,1]$，点 $\boldsymbol p+t(\boldsymbol x-\boldsymbol p)$ 属于 $C$。由 $\boldsymbol p$ 的最优性，

$$
\|\boldsymbol z-\boldsymbol p-t(\boldsymbol x-\boldsymbol p)\|^2
\geq\|\boldsymbol z-\boldsymbol p\|^2.
$$

展开左边并消去共同项，得到

$$
-2t(\boldsymbol z-\boldsymbol p)^\top(\boldsymbol x-\boldsymbol p)
+t^2\|\boldsymbol x-\boldsymbol p\|^2\geq0.
$$

对 $t>0$ 除以 $t$ 后令 $t\downarrow0$，即得式（15.2）。

□

**定理 15.6（点与闭凸集的严格分离）**

设 $C$ 是非空闭凸集，$\boldsymbol z\notin C$，$\boldsymbol p$ 为 $\boldsymbol z$ 在 $C$ 上的投影。令 $\boldsymbol a=\boldsymbol z-\boldsymbol p$，则 $\boldsymbol a\neq\boldsymbol0$，且存在 $b$ 使

$$
\boldsymbol a^\top\boldsymbol x<b<\boldsymbol a^\top\boldsymbol z,
\qquad\forall\boldsymbol x\in C.
\tag{15.3}
$$

**证明**

由式（15.2），对所有 $\boldsymbol x\in C$，

$$
\boldsymbol a^\top\boldsymbol x
\leq\boldsymbol a^\top\boldsymbol p.
$$

另一方面，

$$
\boldsymbol a^\top\boldsymbol z
=\boldsymbol a^\top\boldsymbol p+\|\boldsymbol a\|^2
>\boldsymbol a^\top\boldsymbol p.
$$

故取

$$
b=\boldsymbol a^\top\boldsymbol p+\frac12\|\boldsymbol a\|^2
$$

即可。

□

更一般的分离定理指出，两个不相交的非空凸集可以被超平面分离；在有限维中若还要求严格分离，则需附加闭性、紧性或其他条件。一般的非紧凸集未必能被严格分离，因此不能把式（15.3）无条件套用到任意两个凸集。

**例 15.1**

设 $C=\{\boldsymbol x:\boldsymbol A\boldsymbol x\leq\boldsymbol b\}$，其中不等式逐分量成立。证明 $C$ 为凸集，并解释其量化含义。

**解**

若 $\boldsymbol A\boldsymbol x\leq\boldsymbol b$、$\boldsymbol A\boldsymbol y\leq\boldsymbol b$，则对 $\theta\in[0,1]$，

$$
\boldsymbol A[\theta\boldsymbol x+(1-\theta)\boldsymbol y]
=\theta\boldsymbol A\boldsymbol x+(1-\theta)\boldsymbol A\boldsymbol y
\leq\theta\boldsymbol b+(1-\theta)\boldsymbol b
=\boldsymbol b.
$$

故 $C$ 为凸集。投资组合中的预算上下限、单个资产权重上下限、行业暴露上下限都可写成这种线性不等式；其交集仍是凸集。至于预期收益和协方差是否估计准确，是另一个统计问题，不能由可行域的凸性代替论证。

## 15.2 凸函数及其判别

### 15.2.1 定义、上方图与延拓

**定义 15.7（凸函数）**

设 $D\subseteq\mathbb R^n$ 为凸集。函数 $f:D\to\mathbb R$ 称为凸函数，如果对任意 $\boldsymbol x,\boldsymbol y\in D$ 和 $\theta\in[0,1]$，

$$
f(\theta\boldsymbol x+(1-\theta)\boldsymbol y)
\leq\theta f(\boldsymbol x)+(1-\theta)f(\boldsymbol y).
\tag{15.4}
$$

若 $\boldsymbol x\neq\boldsymbol y$ 且 $\theta\in(0,1)$ 时不等式严格成立，则称 $f$ 严格凸。若 $-f$ 为凸函数，则 $f$ 为凹函数。

定义要求 $D$ 为凸集，否则 $\theta\boldsymbol x+(1-\theta)\boldsymbol y$ 可能根本不在定义域内。线性函数同时是凸函数和凹函数，但不是严格凸函数。

函数的上方图（epigraph）定义为

$$
\operatorname{epi}f=\{(\boldsymbol x,t)\in D\times\mathbb R:f(\boldsymbol x)\leq t\}.
$$

$f$ 为凸函数当且仅当 $\operatorname{epi}f$ 为凸集。证明只需注意：若 $(\boldsymbol x,s)$、$(\boldsymbol y,t)$ 位于上方图中，则由式（15.4），

$$
f(\theta\boldsymbol x+(1-\theta)\boldsymbol y)
\leq\theta f(\boldsymbol x)+(1-\theta)f(\boldsymbol y)
\leq\theta s+(1-\theta)t.
$$

反向推导取 $s=f(\boldsymbol x)$、$t=f(\boldsymbol y)$ 即可。

在共轭和对偶理论中，常把 $f$ 延拓为 $\widetilde f:\mathbb R^n\to(-\infty,+\infty]$：在原定义域外令 $\widetilde f(\boldsymbol x)=+\infty$。这可以把显式定义域吸收到函数中，但 $+\infty$ 不参与普通实数运算，相关定理还需“proper”等条件。本章计算共轭时仍直接写出有效定义域。

### 15.2.2 一阶条件：凸函数位于切平面之上

**定理 15.8（可微凸函数的一阶判别）**

设 $D$ 为凸集，$f$ 在 $D$ 上可微。则 $f$ 为凸函数当且仅当对任意 $\boldsymbol x,\boldsymbol y\in D$，

$$
f(\boldsymbol y)\geq f(\boldsymbol x)+
\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x).
\tag{15.5}
$$

若 $\boldsymbol x\neq\boldsymbol y$ 时式（15.5）严格成立，则 $f$ 严格凸；反之，严格凸且可微也推出严格切线不等式。

**证明**

先设 $f$ 为凸函数。对 $t\in(0,1]$，由定义，

$$
f(\boldsymbol x+t(\boldsymbol y-\boldsymbol x))
\leq f(\boldsymbol x)+t[f(\boldsymbol y)-f(\boldsymbol x)].
$$

移项并除以 $t$，得

$$
\frac{f(\boldsymbol x+t(\boldsymbol y-\boldsymbol x))-f(\boldsymbol x)}{t}
\leq f(\boldsymbol y)-f(\boldsymbol x).
$$

令 $t\downarrow0$，左边趋于 $\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x)$，得到式（15.5）。

反之，设式（15.5）成立。令 $\boldsymbol z=\theta\boldsymbol x+(1-\theta)\boldsymbol y$。分别对 $(\boldsymbol z,\boldsymbol x)$ 和 $(\boldsymbol z,\boldsymbol y)$ 使用式（15.5）：

$$
f(\boldsymbol x)\geq f(\boldsymbol z)+\nabla f(\boldsymbol z)^\top(\boldsymbol x-\boldsymbol z),
$$

$$
f(\boldsymbol y)\geq f(\boldsymbol z)+\nabla f(\boldsymbol z)^\top(\boldsymbol y-\boldsymbol z).
$$

第一式乘 $\theta$、第二式乘 $1-\theta$ 后相加。由于

$$
\theta(\boldsymbol x-\boldsymbol z)+(1-\theta)(\boldsymbol y-\boldsymbol z)=\boldsymbol0,
$$

可得

$$
\theta f(\boldsymbol x)+(1-\theta)f(\boldsymbol y)\geq f(\boldsymbol z),
$$

即凸性定义。

□

式（15.5）表明，凸函数的任意一阶泰勒近似都是全局下估计。由此立即得到可微凸优化的核心事实：若 $\nabla f(\boldsymbol x^*)=\boldsymbol0$，则对所有 $\boldsymbol y$，

$$
f(\boldsymbol y)\geq f(\boldsymbol x^*)+
\nabla f(\boldsymbol x^*)^\top(\boldsymbol y-\boldsymbol x^*)
=f(\boldsymbol x^*),
$$

所以 $\boldsymbol x^*$ 是全局最小点。对非凸函数，驻点还可能只是局部极小、局部极大或鞍点。

### 15.2.3 二阶条件与标量化证明

**定理 15.9（二阶判别）**

设 $D$ 为开凸集，$f$ 在 $D$ 上二阶连续可微。则：

1. $f$ 为凸函数当且仅当 $\nabla^2f(\boldsymbol x)\succeq0$ 对所有 $\boldsymbol x\in D$ 成立；
2. 若 $\nabla^2f(\boldsymbol x)\succ0$ 对所有 $\boldsymbol x\in D$ 成立，则 $f$ 严格凸。

**证明**

对任意 $\boldsymbol x\in D$ 和方向 $\boldsymbol v$，在 $\boldsymbol x+t\boldsymbol v\in D$ 的区间上定义

$$
g(t)=f(\boldsymbol x+t\boldsymbol v).
$$

则

$$
g''(t)=\boldsymbol v^\top\nabla^2f(\boldsymbol x+t\boldsymbol v)\boldsymbol v.
$$

$f$ 为凸函数当且仅当每个这样的 $g$ 都是凸函数；一元二阶可微函数 $g$ 为凸函数当且仅当 $g''(t)\geq0$。若 Hessian 半正定，则 $g''(t)\geq0$，故 $f$ 凸。反之，若 $f$ 凸而某点存在 $\boldsymbol v$ 使 $\boldsymbol v^\top\nabla^2f(\boldsymbol x)\boldsymbol v<0$，则沿该方向有 $g''(0)<0$，与 $g$ 凸矛盾。正定情形下，对 $\boldsymbol v\neq\boldsymbol0$ 有 $g''(t)>0$，故 $g$ 严格凸，从而 $f$ 严格凸。

□

正定只是严格凸的充分条件，不是必要条件。例如 $f(x)=x^4$ 在 $\mathbb R$ 上严格凸，但 $f''(0)=0$。严格凸函数也可能没有最小值，例如 $f(x)=e^x$ 在 $\mathbb R$ 上严格凸，却有 $\inf_xe^x=0$，该下确界不在有限点取得。因此“严格凸”“最小点唯一”和“最小点存在”是三个不同命题。

**例 15.2**

判断 $f(\boldsymbol x)=\frac12\boldsymbol x^\top\boldsymbol Q\boldsymbol x+\boldsymbol b^\top\boldsymbol x$ 的凸性，其中 $\boldsymbol Q$ 为实对称矩阵。

**解**

直接计算得 $\nabla^2f(\boldsymbol x)=\boldsymbol Q$。故 $f$ 凸当且仅当 $\boldsymbol Q\succeq0$；若 $\boldsymbol Q\succ0$，则 $f$ 严格凸。若 $\boldsymbol Q$ 有负特征值 $\lambda$ 及对应单位特征向量 $\boldsymbol v$，沿 $\boldsymbol x=t\boldsymbol v$ 有

$$
f(t\boldsymbol v)=\frac12\lambda t^2+t\boldsymbol b^\top\boldsymbol v,
$$

其二阶导数为 $\lambda<0$，故函数非凸。这一判别正是均值—方差模型中组合方差目标是否凸的代数基础。

### 15.2.4 保持凸性的运算

以下运算是构造复杂凸模型的主要工具。

1. 若 $f_i$ 为凸函数，$\alpha_i\geq0$，则 $\sum_i\alpha_if_i$ 为凸函数；只要有一个严格凸函数且其系数为正，和函数严格凸。
2. 若 $f_i$ 为凸函数，则 $f(\boldsymbol x)=\sup_{i\in I}f_i(\boldsymbol x)$ 在函数有限的公共定义域上为凸函数。其上方图是 $\bigcap_i\operatorname{epi}f_i$，故为凸集。
3. 若 $f$ 为凸函数，$\boldsymbol A$ 为线性映射，则 $g(\boldsymbol x)=f(\boldsymbol A\boldsymbol x+\boldsymbol b)$ 为凸函数。
4. 若 $g$ 为凸函数，$h$ 为一元非减凸函数，则 $h\circ g$ 为凸函数。证明为
   $$
   h(g(\theta\boldsymbol x+(1-\theta)\boldsymbol y))
   \leq h(\theta g(\boldsymbol x)+(1-\theta)g(\boldsymbol y))
   \leq\theta h(g(\boldsymbol x))+(1-\theta)h(g(\boldsymbol y)),
   $$
   两个不等式分别使用 $g$ 的凸性、$h$ 的单调性以及 $h$ 的凸性。
5. 若 $f(\boldsymbol x,\boldsymbol y)$ 对联合变量 $(\boldsymbol x,\boldsymbol y)$ 为凸函数，$C$ 为凸集，则 $g(\boldsymbol x)=\inf_{\boldsymbol y\in C}f(\boldsymbol x,\boldsymbol y)$ 在其有限且下确界定义良好的区域上为凸函数。此结论可通过上方图投影证明，不能误以为“任意固定 $\boldsymbol y$ 后的最小化都自动保凸”而不检查联合凸性。

逐点最大值保凸，但逐点最小值通常不保凸。例如 $f_1(x)=x$ 与 $f_2(x)=-x$ 都是凸函数，而 $\min\{x,-x\}=-|x|$ 不是凸函数。

## 15.3 Jensen 不等式及其概率含义

**定理 15.10（Jensen 不等式）**

设 $f:D\to\mathbb R$ 为凸函数，$D\subseteq\mathbb R^n$ 为凸集，随机向量 $\boldsymbol X$ 以概率 $1$ 取值于 $D$。若 $\mathbb E[\boldsymbol X]$ 和 $\mathbb E[f(\boldsymbol X)]$ 均存在，则

$$
f(\mathbb E[\boldsymbol X])\leq\mathbb E[f(\boldsymbol X)].
\tag{15.6}
$$

若 $f$ 严格凸且 $\boldsymbol X$ 非常数随机向量，在相应可积条件下式（15.6）通常严格成立。

**证明**

离散情形的证明就是凸组合定义：若 $\mathbb P(\boldsymbol X=\boldsymbol x_i)=p_i$，则

$$
f(\mathbb E[\boldsymbol X])
=f\left(\sum_ip_i\boldsymbol x_i\right)
\leq\sum_ip_if(\boldsymbol x_i)
=\mathbb E[f(\boldsymbol X)].
$$

一般情形可使用支撑超平面。有限维凸函数在其定义域内部的每一点都有次梯度；在 $\boldsymbol\mu=\mathbb E[\boldsymbol X]$ 处取 $\boldsymbol g$ 使

$$
f(\boldsymbol X)\geq f(\boldsymbol\mu)+
\boldsymbol g^\top(\boldsymbol X-\boldsymbol\mu)
\quad\text{几乎必然}.
$$

两边取期望，末项期望为零，得到式（15.6）。若 $\boldsymbol\mu$ 位于边界，可用内部点逼近或扩展实值凸分析中的支撑结论处理；本章不展开该测度论细节。

□

式（15.6）中的两个期望必须存在。例如对 $f(x)=1/x$（定义域 $x>0$）使用 Jensen 不等式时，需要 $\mathbb E X$ 与 $\mathbb E[1/X]$ 有意义，不能在发散时把 $+\infty$ 当作普通实数操作。

Jensen 不等式直接解释若干常见结论。取 $f(x)=x^2$，得到 $(\mathbb EX)^2\leq\mathbb E[X^2]$，即方差非负。取 $f(x)=-\log x$（$x>0$），得到

$$
-\log\mathbb EX\leq\mathbb E[-\log X],
$$

也就是 $\log\mathbb EX\geq\mathbb E[\log X]$。因此，随机收益的对数增长不能与期望收益直接互换；在 Kelly 准则中，最大化 $\mathbb E[\log W]$ 与最大化 $\mathbb E[W]$ 是不同的决策问题。

**例 15.3**

设简单总收益 $R>-1$，证明算术期望总收益不低于几何意义下的期望增长因子，并讨论等号条件。

**解**

令 $W=1+R>0$。由 $\log$ 的凹性，

$$
\mathbb E[\log W]\leq\log\mathbb E[W].
$$

两边取指数得

$$
\exp(\mathbb E[\log W])\leq\mathbb E[W].
$$

若 $W$ 为常数，等号成立；若 $W$ 非退化，由于 $\log$ 严格凹，通常有严格不等式。这说明正波动会使固定资本下的典型复合增长低于由算术均值直接推断的水平，但具体财富过程还需说明再平衡与下注规则。

## 15.4 Fenchel 共轭与对偶范数

### 15.4.1 共轭函数的定义与几何

**定义 15.11（Fenchel 共轭）**

函数 $f:\mathbb R^n\to(-\infty,+\infty]$ 的 Fenchel 共轭定义为

$$
f^*(\boldsymbol y)
=\sup_{\boldsymbol x}\{\boldsymbol y^\top\boldsymbol x-f(\boldsymbol x)\}.
\tag{15.7}
$$

对每个固定的 $\boldsymbol x$，式（15.7）右端关于 $\boldsymbol y$ 是仿射函数；共轭是这些仿射函数的逐点上确界，因此 $f^*$ 总是凸函数。若允许扩展实值，它还是闭凸函数（在适当拓扑意义下）。

当 $f$ 为一元可微凸函数且内点驻点能达到上确界时，可通过

$$
y=f'(x)
$$

求出 $x$，再代回 $f^*(y)=xy-f(x)$。但“直接令导数为零”并非永远充分：上确界可能在边界取得，也可能为 $+\infty$。

**例 15.4（二次函数的共轭）**

设 $\boldsymbol Q\succ0$，$f(\boldsymbol x)=\frac12\boldsymbol x^\top\boldsymbol Q\boldsymbol x$。求 $f^*$。

**解**

对固定 $\boldsymbol y$，函数

$$
\boldsymbol y^\top\boldsymbol x-\frac12\boldsymbol x^\top\boldsymbol Q\boldsymbol x
$$

为严格凹函数，驻点满足 $\boldsymbol y-\boldsymbol Q\boldsymbol x=\boldsymbol0$，故 $\boldsymbol x=\boldsymbol Q^{-1}\boldsymbol y$。代回：

$$
f^*(\boldsymbol y)
=\boldsymbol y^\top\boldsymbol Q^{-1}\boldsymbol y
-\frac12(\boldsymbol Q^{-1}\boldsymbol y)^\top
\boldsymbol Q(\boldsymbol Q^{-1}\boldsymbol y)
=\frac12\boldsymbol y^\top\boldsymbol Q^{-1}\boldsymbol y.
$$

这里 $\boldsymbol Q^{-1}$ 的存在和正定性保证了驻点确为全局最大点。

**例 15.5（绝对值的共轭）**

设 $f(x)=|x|$，则

$$
f^*(y)=\sup_x\{xy-|x|\}.
$$

若 $|y|\leq1$，当 $x>0$ 时表达式为 $(y-1)x\leq0$，当 $x<0$ 时为 $(y+1)x\leq0$，在 $x=0$ 处等于 $0$，故上确界为 $0$。若 $y>1$，沿 $x\to+\infty$ 有 $(y-1)x\to+\infty$；若 $y<-1$，沿 $x\to-\infty$ 同样发散。因此

$$
f^*(y)=
\begin{cases}
0,&|y|\leq1,\\
+\infty,&|y|>1.
\end{cases}
$$

这就是区间 $[-1,1]$ 的指示函数 $\iota_{[-1,1]}$，其中指示函数在集合内为 $0$、集合外为 $+\infty$。Lasso 的绝对值惩罚与对偶变量逐坐标界 $|y_i|\leq1$ 正来源于此。

### 15.4.2 Fenchel–Young 不等式与共轭二次定理

由式（15.7），对任意 $\boldsymbol x,\boldsymbol y$ 都有

$$
\boxed{
f(\boldsymbol x)+f^*(\boldsymbol y)
\geq\boldsymbol x^\top\boldsymbol y
}
\tag{15.8}
$$

式（15.8）称为 Fenchel–Young 不等式。它无需可微性，是把原问题与对偶问题联系起来的基本估计。若 $f$ 闭、proper、凸，则共轭二次定理给出

$$
f^{**}=f.
$$

这里的“闭”指上方图为闭集，等价于下半连续；“proper”指函数不恒为 $+\infty$，且任何处都不取 $-\infty$。这些条件不能随意省略。本章后续主要使用该定理于有限、连续凸函数，此时条件自动满足。

等号条件同样重要。若 $f$ 在 $\boldsymbol x$ 可微，并且上确界在 $\boldsymbol x$ 处取得，则通常有 $\boldsymbol y=\nabla f(\boldsymbol x)$；非可微情形需要用次微分 $\boldsymbol y\in\partial f(\boldsymbol x)$ 表达。第17章的近端算法将再次使用这一结构。

### 15.4.3 范数、对偶范数与支撑函数

**定义 15.12（对偶范数）**

设 $\|\cdot\|$ 为 $\mathbb R^n$ 上的范数，其对偶范数定义为

$$
\|\boldsymbol y\|_*=
\sup_{\|\boldsymbol x\|\leq1}\boldsymbol y^\top\boldsymbol x.
\tag{15.9}
$$

由定义立即得到广义 Cauchy–Schwarz 不等式

$$
\boldsymbol y^\top\boldsymbol x\leq\|\boldsymbol y\|_*\|\boldsymbol x\|.
\tag{15.10}
$$

因为 $\boldsymbol x=\boldsymbol0$ 时不等式显然；否则对 $\boldsymbol x/\|\boldsymbol x\|$ 使用式（15.9）。

**命题 15.13（范数的共轭）**

对任意范数 $f(\boldsymbol x)=\|\boldsymbol x\|$，有

$$
f^*(\boldsymbol y)=
\begin{cases}
0,&\|\boldsymbol y\|_*\leq1,\\
+\infty,&\|\boldsymbol y\|_*>1.
\end{cases}
$$

**证明**

若 $\|\boldsymbol y\|_*\leq1$，由式（15.10），$\boldsymbol y^\top\boldsymbol x-\|\boldsymbol x\|\leq0$，且在 $\boldsymbol x=\boldsymbol0$ 处取得 $0$。若 $\|\boldsymbol y\|_*>1$，则存在单位向量 $\boldsymbol u$ 使 $\boldsymbol y^\top\boldsymbol u>1$。沿 $\boldsymbol x=t\boldsymbol u$、$t\to+\infty$，有

$$
\boldsymbol y^\top(t\boldsymbol u)-\|t\boldsymbol u\|
=t(\boldsymbol y^\top\boldsymbol u-1)\to+\infty.
$$

□

特别地，$\ell_1$ 与 $\ell_\infty$ 互为对偶范数，$\ell_2$ 的对偶仍是 $\ell_2$。集合 $C$ 的指示函数 $\iota_C$ 的共轭

$$
\iota_C^*(\boldsymbol y)
=\sup_{\boldsymbol x\in C}\boldsymbol y^\top\boldsymbol x
$$

称为 $C$ 的支撑函数。它记录集合在方向 $\boldsymbol y$ 上最远能延伸到哪里，把几何信息转化为可用于对偶推导的函数。

## 15.5 凸结构在量化模型中的作用

凸性在量化模型中的价值主要体现在三个方面。

首先，它把局部最优提升为全局最优。若 $f$ 为凸函数、$C$ 为凸集，且 $\boldsymbol x^*$ 是 $f$ 在 $C$ 上的局部最小点，则对任意 $\boldsymbol y\in C$，考虑 $\boldsymbol x_t=\boldsymbol x^*+t(\boldsymbol y-\boldsymbol x^*)$。当 $t>0$ 足够小时，局部最优性给出 $f(\boldsymbol x_t)\geq f(\boldsymbol x^*)$；再由凸性，

$$
f(\boldsymbol x^*)
\leq(1-t)f(\boldsymbol x^*)+tf(\boldsymbol y).
$$

整理得 $f(\boldsymbol y)\geq f(\boldsymbol x^*)$，故 $\boldsymbol x^*$ 全局最优。若 $f$ 严格凸且 $\boldsymbol y\neq\boldsymbol x^*$，则最小点唯一。

其次，它给出稳定的对偶和敏感性理论。权重约束、风险预算、Lasso 惩罚和 CVaR 的辅助变量表达都可以通过凸结构转化为可计算问题。第16章将用 Lagrange 对偶精确说明“放松约束所付出的代价”。

最后，凸性并不意味着估计结果天然可靠。一个严格凸的组合优化问题可能因预期收益或协方差矩阵估计误差而产生极端权重；一个全局唯一的 Lasso 解也可能在数据扰动下改变变量选择。凸性保证的是**给定数学模型后的优化性质**，而不是模型本身符合市场。

## 本章小结

凸集要求任意两点的连线仍在集合内，凸函数要求函数值不超过弦上的线性插值；上方图把两种观点统一起来。可微凸函数位于其任意切平面之上，二阶可微函数的凸性由 Hessian 半正定刻画。非负加权、逐点上确界、仿射复合以及适当的外函数复合保持凸性，而逐点最小值通常不保凸。

Jensen 不等式把凸组合推广到期望，揭示方差非负、对数增长与算术期望之间的差别。Fenchel 共轭 $f^*(\boldsymbol y)=\sup_{\boldsymbol x}\{\boldsymbol y^\top\boldsymbol x-f(\boldsymbol x)\}$ 则以仿射函数族重新描述凸函数，Fenchel–Young 不等式和共轭二次定理构成后续对偶推导的基础。对偶范数进一步说明，正则化惩罚的几何形状如何转化为对偶变量的约束。

## 习题

1. 判断下列集合是否为凸集，并给出证明或反例：
   （a）$\{(x,y):xy\geq1,\ x>0\}$；
   （b）$\{(x,y):x^2+y^2\geq1\}$；
   （c）$\{\boldsymbol x:\|\boldsymbol x\|_1\leq2\}$。
2. 设 $C,D\subseteq\mathbb R^n$ 为凸集，证明 $C+D$ 为凸集。若 $C,D$ 均为闭集，$C+D$ 是否必为闭集？
3. 设 $C=\{(x,y):x^2+y^2\leq1\}$，求点 $\boldsymbol z=(2,0)$ 在 $C$ 上的投影，并写出一个严格分离 $\boldsymbol z$ 与 $C$ 的超平面。
4. 证明有限个闭半空间的交集为闭凸集。由此说明 $\Delta_n$ 是紧凸集。
5. 不用 Hessian，直接由定义证明 $f(x)=x^2$ 在 $\mathbb R$ 上严格凸。
6. 设 $f$ 在凸集 $D$ 上可微且凸。证明：若 $\nabla f(\boldsymbol x^*)=\boldsymbol0$，则 $\boldsymbol x^*$ 为全局最小点。严格凸时最小点是否唯一？
7. 判断 $f(x,y)=x^2+xy+y^2$ 与 $g(x,y)=x^2+3xy+y^2$ 的凸性，并说明 Hessian 判据。
8. 证明 $f(\boldsymbol x)=\max\{a_1^\top\boldsymbol x+b_1,\ldots,a_m^\top\boldsymbol x+b_m\}$ 为凸函数，并解释分段线性回归损失为何可能具有凸性。
9. 设 $g$ 为凸函数，$h$ 为非减凸函数，证明 $h\circ g$ 为凸函数。若去掉 $h$ 非减条件，给出一个反例。
10. 设随机变量 $X>0$，且 $\mathbb EX$ 与 $\mathbb E[1/X]$ 有限。证明 $\mathbb E[1/X]\geq1/\mathbb EX$，并给出等号成立的充分条件。
11. 某财富因子 $W>0$ 满足 $\mathbb E[\log W]$ 有限。比较 $\exp(\mathbb E[\log W])$ 与 $\mathbb EW$，并说明其对复合收益解释的意义。
12. 求 $f(x)=e^x$ 的 Fenchel 共轭及其有效定义域。
13. 求 $f(x)=\frac12ax^2$ 的共轭，分别讨论 $a>0$ 与 $a=0$。
14. 不借助已知的共轭二次定理，直接对 $f(x)=|x|$ 验证 $f^{**}=f$。
15. 证明 $\|\boldsymbol y\|_{\infty}$ 是 $\|\boldsymbol x\|_1$ 的对偶范数，并写出相应的广义 Cauchy–Schwarz 不等式。
16. 设 $f(\boldsymbol x)=\frac12\|\boldsymbol x\|^2+\iota_C(\boldsymbol x)$，其中 $C$ 为非空闭凸集。利用共轭定义推导
   $$
   f^*(\boldsymbol y)=\frac12\|\boldsymbol y\|^2-\frac12\operatorname{dist}(\boldsymbol y,C)^2,
   $$
   其中 $\operatorname{dist}(\boldsymbol y,C)=\min_{\boldsymbol x\in C}\|\boldsymbol y-\boldsymbol x\|$。
