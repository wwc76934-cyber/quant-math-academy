# 第15章习题参考答案与解析

## 1.

（a）是凸集。因为 $x>0$ 时 $y\geq1/x$，而 $1/x$ 在 $(0,+\infty)$ 上为凸函数，其上方图为凸集。也可直接计算：若 $(x_1,y_1),(x_2,y_2)$ 属于集合，$z_\theta=\theta x_1+(1-\theta)x_2$，则由 $1/x$ 的凸性，

$$
\frac1{z_\theta}\leq\frac\theta{x_1}+\frac{1-\theta}{x_2}
\leq\theta y_1+(1-\theta)y_2,
$$

故凸组合仍属于集合。

（b）不是凸集。点 $(1,0)$ 与 $(-1,0)$ 都属于集合，但其中点 $(0,0)$ 不属于集合。

（c）是凸集。由范数三角不等式和齐次性，

$$
\|\theta\boldsymbol x+(1-\theta)\boldsymbol y\|_1
\leq\theta\|\boldsymbol x\|_1+(1-\theta)\|\boldsymbol y\|_1\leq2.
$$

本题关键是不要把“凸函数的下水平集为凸集”误用于任意函数；但对凸函数，所有下水平集确实为凸集。

## 2.

任取 $\boldsymbol u=\boldsymbol x_1+\boldsymbol y_1$、$\boldsymbol v=\boldsymbol x_2+\boldsymbol y_2$，其中 $\boldsymbol x_i\in C$、$\boldsymbol y_i\in D$。则

$$
\theta\boldsymbol u+(1-\theta)\boldsymbol v
=[\theta\boldsymbol x_1+(1-\theta)\boldsymbol x_2]
+[\theta\boldsymbol y_1+(1-\theta)\boldsymbol y_2]
\in C+D.
$$

闭集之和不一定是闭集。取 $C=\{(x,y):x>0,\ xy\geq1\}$ 和 $D=\{(0,y):y\in\mathbb R\}$ 可构造水平方向趋于坐标轴的极限；更直接的实数例子是 $C=\mathbb Z$、$D=\sqrt2\mathbb Z$，两者均闭，但 $C+D$ 在 $\mathbb R$ 中稠密且不等于 $\mathbb R$，故不闭。若其中一个集合为紧集，则闭集与紧集之和在有限维中为闭集。

## 3.

投影为单位圆在 $\boldsymbol z$ 方向上的点：

$$
\boldsymbol p=\frac{\boldsymbol z}{\|\boldsymbol z\|}=(1,0).
$$

由投影变分不等式，对任意 $\boldsymbol x\in C$，

$$
(\boldsymbol z-\boldsymbol p)^\top(\boldsymbol x-\boldsymbol p)
=(1,0)^\top(\boldsymbol x-(1,0))=x_1-1\leq0.
$$

又 $\boldsymbol z-\boldsymbol p=(1,0)$，故 $\boldsymbol a^\top\boldsymbol z=2$。取 $b=3/2$，则超平面

$$
x_1=\frac32
$$

满足圆内点均有 $x_1\leq1<3/2$，而 $\boldsymbol z$ 处 $x_1=2>3/2$，实现严格分离。

## 4.

闭半空间 $H_i=\{\boldsymbol x:\boldsymbol a_i^\top\boldsymbol x\leq b_i\}$ 是连续函数 $g_i(\boldsymbol x)=\boldsymbol a_i^\top\boldsymbol x$ 的下水平集，故为闭集；其凸性由线性性直接得到。任意闭集之交为闭集，任意凸集之交为凸集。

概率单纯形

$$
\Delta_n=\left\{\boldsymbol x:\sum_i x_i=1,\ x_i\geq0\right\}
$$

是超平面 $\sum_i x_i=1$ 与 $n$ 个闭半空间 $x_i\geq0$ 的交集，故为闭凸集。又因为 $0\leq x_i\leq1$，它有界；在有限维中闭且有界即为紧集。

## 5.

对 $x\neq y$ 和 $\theta\in(0,1)$，

$$
\begin{aligned}
&\theta x^2+(1-\theta)y^2-[\theta x+(1-\theta)y]^2\\
&=\theta(1-\theta)x^2+\theta(1-\theta)y^2
-2\theta(1-\theta)xy\\
&=\theta(1-\theta)(x-y)^2>0.
\end{aligned}
$$

因此

$$
[\theta x+(1-\theta)y]^2<\theta x^2+(1-\theta)y^2,
$$

故 $f(x)=x^2$ 严格凸。恒等式 $\theta(1-\theta)(x-y)^2$ 也是证明二次函数凸性的常用工具。

## 6.

由可微凸函数的一阶条件，对任意 $\boldsymbol y\in D$，

$$
f(\boldsymbol y)\geq f(\boldsymbol x^*)+
\nabla f(\boldsymbol x^*)^\top(\boldsymbol y-\boldsymbol x^*)
=f(\boldsymbol x^*).
$$

故 $\boldsymbol x^*$ 为全局最小点。若 $f$ 严格凸且存在另一个最小点 $\boldsymbol y\neq\boldsymbol x^*$，则

$$
f\left(\frac{\boldsymbol x^*+\boldsymbol y}{2}\right)
<\frac12f(\boldsymbol x^*)+\frac12f(\boldsymbol y)
=f(\boldsymbol x^*),
$$

与最小性矛盾。因此严格凸时最小点唯一；但严格凸本身并不保证最小点存在，例如 $e^x$。

## 7.

两函数的 Hessian 分别为

$$
\nabla^2f=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
\nabla^2g=\begin{pmatrix}2&3\\3&2\end{pmatrix}.
$$

前者首项 $2>0$，行列式 $4-1=3>0$，故正定，$f$ 严格凸。后者特征值为 $2+3=5$ 和 $2-3=-1$，不定，故 $g$ 非凸。也可沿 $(1,-1)$ 方向观察 $g(t,-t)=-t^2$。

## 8.

每个仿射函数 $f_i(\boldsymbol x)=\boldsymbol a_i^\top\boldsymbol x+b_i$ 都是凸函数。对 $\theta\in[0,1]$，记 $\boldsymbol z_\theta=\theta\boldsymbol x+(1-\theta)\boldsymbol y$，则

$$
f_i(\boldsymbol z_\theta)
=\theta f_i(\boldsymbol x)+(1-\theta)f_i(\boldsymbol y)
\leq\theta f(\boldsymbol x)+(1-\theta)f(\boldsymbol y).
$$

对所有 $i$ 取最大值，左边仍不超过右端，故 $f$ 为凸函数。若分段线性损失是若干仿射损失的最大值，例如 $\max\{0,1-y(\boldsymbol w^\top\boldsymbol x+b)\}$，它就具有凸性；若取最小值则通常不成立。

## 9.

令 $\boldsymbol z_\theta=\theta\boldsymbol x+(1-\theta)\boldsymbol y$。由 $g$ 的凸性，

$$
g(\boldsymbol z_\theta)\leq\theta g(\boldsymbol x)+(1-\theta)g(\boldsymbol y).
$$

因 $h$ 非减，

$$
h(g(\boldsymbol z_\theta))
\leq h(\theta g(\boldsymbol x)+(1-\theta)g(\boldsymbol y))
\leq\theta h(g(\boldsymbol x))+(1-\theta)h(g(\boldsymbol y)),
$$

第二处使用 $h$ 的凸性。

若去掉单调性，取 $g(x)=x^2$、$h(t)=-t$。二者分别为凸函数和凸函数（线性），但 $h(g(x))=-x^2$ 为凹函数而非凸函数。

## 10.

函数 $f(x)=1/x$ 在 $x>0$ 上为凸函数，因为 $f''(x)=2/x^3>0$。由 Jensen 不等式，

$$
\mathbb E[1/X]\geq1/\mathbb EX.
$$

若 $X$ 几乎必然等于正常数 $c$，则两边均为 $1/c$，等号成立。若 $X$ 非退化且分布集中于 $(0,+\infty)$，由 $f$ 严格凸，通常有严格不等式。题设的有限期望避免了无意义的发散表达。

## 11.

$\log$ 为严格凹函数，故 $-\log$ 为严格凸函数。由 Jensen 不等式，

$$
\mathbb E[\log W]\leq\log\mathbb EW.
$$

指数函数单调递增，所以

$$
\exp(\mathbb E[\log W])\leq\mathbb EW.
$$

左边是期望对数增长对应的财富因子，右边是算术期望财富因子。若 $W$ 退化，等号成立；非退化时通常严格小于。该结论说明波动会影响复合增长，但不能单独推出任何具体交易策略一定亏损。

## 12.

由定义，

$$
f^*(y)=\sup_x\{xy-e^x\}.
$$

若 $y<0$，令 $x\to-\infty$，则 $xy\to+\infty$、$e^x\to0$，故上确界为 $+\infty$。

若 $y=0$，表达式为 $-e^x<0$，且 $x\to+\infty$ 时趋于 $0$，故上确界为 $0$，但不在有限点取得。

若 $y>0$，令导数 $y-e^x=0$，得 $x=\log y$；二阶导数 $-e^x<0$，且两端表达式趋于 $-\infty$，故该点为全局最大点。最大值为 $y\log y-y$。因此

$$
f^*(y)=
\begin{cases}
y\log y-y,&y>0,\\
0,&y=0,\\
+\infty,&y<0.
\end{cases}
$$

其有效定义域为 $[0,+\infty)$。

## 13.

当 $a>0$ 时，

$$
f^*(y)=\sup_x\{xy-\tfrac12ax^2\}.
$$

驻点为 $x=y/a$，且目标严格凹，故

$$
f^*(y)=\frac{y^2}{a}-\frac12a\frac{y^2}{a^2}
=\frac{y^2}{2a}.
$$

当 $a=0$ 时 $f(x)=0$，所以

$$
f^*(y)=\sup_x xy=
\begin{cases}
0,&y=0,\\
+\infty,&y\neq0.
\end{cases}
$$

$a=0$ 时共轭不是二次函数，说明不能机械套用 $a>0$ 的公式。

## 14.

由例15.5，$f^*=\iota_{[-1,1]}$。因此

$$
f^{**}(x)=\sup_{|y|\leq1}xy.
$$

若 $x\geq0$，取 $y=1$ 得最大值 $x$；若 $x<0$，取 $y=-1$ 得最大值 $-x$。故

$$
f^{**}(x)=|x|=f(x).
$$

这同时说明，共轭中的上确界可在对偶可行域边界取得。

## 15.

由定义，

$$
\|\boldsymbol y\|_{1,*}
=\sup_{\|\boldsymbol x\|_1\leq1}\boldsymbol y^\top\boldsymbol x.
$$

一方面，

$$
\boldsymbol y^\top\boldsymbol x
\leq\sum_i|y_i||x_i|
\leq\|\boldsymbol y\|_\infty\sum_i|x_i|
\leq\|\boldsymbol y\|_\infty.
$$

另一方面，设 $|y_j|=\|\boldsymbol y\|_\infty$。取 $x_j=\operatorname{sgn}(y_j)$，其余坐标为 $0$，则 $\|\boldsymbol x\|_1=1$ 且 $\boldsymbol y^\top\boldsymbol x=\|\boldsymbol y\|_\infty$。故对偶范数为 $\|\boldsymbol y\|_\infty$，并有

$$
\boldsymbol y^\top\boldsymbol x\leq
\|\boldsymbol y\|_\infty\|\boldsymbol x\|_1.
$$

## 16.

由于 $\iota_C$ 把定义域限制到 $C$，

$$
\begin{aligned}
f^*(\boldsymbol y)
&=\sup_{\boldsymbol x\in C}
\left\{\boldsymbol y^\top\boldsymbol x-\frac12\|\boldsymbol x\|^2\right\}.
\end{aligned}
$$

使用恒等式

$$
\boldsymbol y^\top\boldsymbol x-\frac12\|\boldsymbol x\|^2
=\frac12\|\boldsymbol y\|^2-\frac12\|\boldsymbol y-\boldsymbol x\|^2,
$$

可得

$$
f^*(\boldsymbol y)
=\frac12\|\boldsymbol y\|^2
-\frac12\inf_{\boldsymbol x\in C}\|\boldsymbol y-\boldsymbol x\|^2.
$$

$C$ 非空闭凸，故投影存在且距离下确界能够取得，于是

$$
f^*(\boldsymbol y)=\frac12\|\boldsymbol y\|^2-
\frac12\operatorname{dist}(\boldsymbol y,C)^2.
$$

关键步骤是配方，而不是先对含指示函数的目标直接求普通梯度。
