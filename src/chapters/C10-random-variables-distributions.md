# 第10章　随机变量、常见分布与变量变换

随机变量把样本空间中的结果映射为数值，使事件能够用分布函数、质量函数或密度函数描述。分布并不是随机变量本身：不同概率空间上的随机变量可以具有相同分布，而同一随机变量经过变换后通常具有不同分布。本章建立这些对象的严格定义，讨论常见分布的结构与适用条件，并系统处理变量变换、分位数、混合、截断和重尾现象。期望及其存在条件留到第11章专门讨论。

## 10.1 随机变量与分布测度

### 10.1.1 可测性为何不可省略

实数集上的 Borel $\sigma$-代数 $\mathcal B(\mathbb R)$ 是包含所有区间的最小 $\sigma$-代数。它是后续定义“$X$ 落在某集合中”的事件结构。

**定义 10.1（随机变量）**

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间。若函数 $X:\Omega\to\mathbb R$ 满足

$$
\{X\in B\}:=\{\omega\in\Omega:X(\omega)\in B\}\in\mathcal F,
\qquad \forall B\in\mathcal B(\mathbb R),
$$

则称 $X$ 为实值**随机变量**（random variable）。等价地，只需验证 $\{X\le x\}\in\mathcal F$ 对所有 $x\in\mathbb R$ 成立。

因此，$X$ 不是“随机变化的数”，而是满足可测性要求的函数。$\{X\in B\}$ 是 $\Omega$ 中的事件，$\mathbb P(X\in B)$ 是该事件的概率。

**定义 10.2（分布）**

随机变量 $X$ 的分布是 $\mathcal B(\mathbb R)$ 上的概率测度

$$
\mathbb P_X(B)=\mathbb P(X\in B)=\mathbb P\bigl(X^{-1}(B)\bigr).
\tag{10.1}
$$

它也称为 $X$ 的像测度或诱导测度。原概率空间往往很复杂，但 $\mathbb P_X$ 把与 $X$ 有关的概率压缩到实数线上。

### 10.1.2 分布函数

**定义 10.3（累积分布函数）**

随机变量 $X$ 的**累积分布函数**（cumulative distribution function，CDF）为

$$
F_X(x)=\mathbb P(X\le x),\qquad x\in\mathbb R.
\tag{10.2}
$$

**定理 10.4（CDF 的基本性质）**

任意 CDF $F$ 具有以下性质：

1. 单调不减；
2. 右连续；
3. $\lim_{x\to-\infty}F(x)=0$，$\lim_{x\to+\infty}F(x)=1$；
4. $\mathbb P(a<X\le b)=F(b)-F(a)$；
5. $\mathbb P(X=x)=F(x)-F(x-)$，其中 $F(x-)=\lim_{y\uparrow x}F(y)$。

**证明**

若 $x_1<x_2$，则 $\{X\le x_1\}\subseteq\{X\le x_2\}$，单调性由概率单调性得到。右连续来自事件递减：

$$
\{X\le x+1/n\}\downarrow\{X\le x\},
$$

利用概率从上连续即得 $F(x+1/n)\to F(x)$；再由单调性得到一般右极限。两端极限分别由 $\{X\le-n\}\downarrow\varnothing$ 与 $\{X\le n\}\uparrow\Omega$ 得到。第四条由事件差集得到。最后，

$$
\{X\le x-1/n\}\uparrow\{X<x\},
$$

故 $F(x-)=\mathbb P(X<x)$，从而 $F(x)-F(x-)=\mathbb P(X=x)$。

□

反之，任何满足前三条的函数都是某个随机变量的 CDF。这一构造可通过分位数函数完成，见 10.4 节。

## 10.2 离散分布与连续分布

### 10.2.1 概率质量函数

若存在至多可数集合 $S$ 使 $\mathbb P(X\in S)=1$，则称 $X$ 为离散随机变量。其**概率质量函数**（probability mass function，PMF）为

$$
p_X(x)=\mathbb P(X=x).
$$

它满足 $p_X(x)\ge0$ 和 $\sum_{x\in S}p_X(x)=1$，并且

$$
F_X(x)=\sum_{s\in S:s\le x}p_X(s).
$$

离散变量的 CDF 是阶梯函数，每个可取值处的跳跃高度就是该点的概率。

### 10.2.2 概率密度函数

若存在非负可积函数 $f_X$ 使

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt,\qquad x\in\mathbb R,
$$

则称 $X$ 为绝对连续随机变量，$f_X$ 称为其**概率密度函数**（probability density function，PDF）。此时

$$
\mathbb P(X\in[a,b])=\int_a^b f_X(x)\,dx,
\qquad
\int_{-\infty}^{\infty}f_X(x)\,dx=1.
$$

密度不是点概率。$f_X(x)$ 可以大于 $1$，只要总面积为 $1$；例如 $\operatorname{Uniform}(0,1/2)$ 的密度在区间内恒为 $2$。对绝对连续变量，$\mathbb P(X=x)=0$，但事件 $\{X=x\}$ 仍是可以发生的基本结果，只是概率为零。密度在单个点或零测集上的修改不改变分布。

**例 10.1（由 CDF 识别点质量与密度）**

设

$$
F(x)=\begin{cases}
0,&x<0,\\
x/2,&0\le x<1,\\
1,&x\ge1.
\end{cases}
$$

分析 $X$ 的分布并求 $\mathbb P(X=1)$。

**解**

在 $0<x<1$ 内，$F'(x)=1/2$，故该段密度为 $1/2$，其总质量为 $1/2$。在 $x=1$ 处，

$$
F(1)-F(1-)=1-\frac12=\frac12.
$$

因此 $X$ 是混合型随机变量：$[0,1)$ 上有密度 $1/2$，在 $x=1$ 有点质量 $1/2$。它既不是纯离散变量，也不是绝对连续变量。

## 10.3 常见离散分布

### 10.3.1 Bernoulli、二项与超几何分布

参数为 $p\in[0,1]$ 的 Bernoulli 变量 $X$ 满足

$$
\mathbb P(X=1)=p,\qquad \mathbb P(X=0)=1-p.
$$

它记录一次试验的成功或失败。若进行 $n$ 次独立试验，每次成功概率均为 $p$，成功总数 $S_n$ 服从二项分布：

$$
\boxed{\mathbb P(S_n=k)=\binom nkp^k(1-p)^{n-k},\qquad k=0,\ldots,n.}
\tag{10.3}
$$

组合数 $\binom nk$ 来自成功位置的计数，$p^k(1-p)^{n-k}$ 来自各次试验独立。若从含有 $K$ 个成功对象、$N-K$ 个失败对象的有限总体中无放回抽取 $n$ 个，则成功数 $H$ 服从超几何分布：

$$
\mathbb P(H=k)=\frac{\binom Kk\binom{N-K}{n-k}}{\binom Nn}.
$$

这里各次抽取不独立，但整个无序子集等可能。二项分布与超几何分布的关键区别正是有放回独立抽样与无放回抽样。

### 10.3.2 几何、负二项与 Poisson 分布

若独立重复 Bernoulli 试验直到首次成功，$T$ 表示所需试验次数，则

$$
\mathbb P(T=k)=(1-p)^{k-1}p,\qquad k=1,2,\ldots.
$$

这是“试验次数”口径的几何分布。另一口径令 $Y=T-1$ 表示首次成功前的失败次数，支持集从 $0$ 开始，二者不能混用。

第 $r$ 次成功所需的总试验数 $T_r$ 服从负二项分布：

$$
\mathbb P(T_r=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r},
\qquad k=r,r+1,\ldots.
$$

最后一个结果必须是第 $r$ 次成功，前 $k-1$ 次中恰有 $r-1$ 次成功，这解释了组合数。

参数为 $\lambda>0$ 的 Poisson 分布具有 PMF

$$
\boxed{\mathbb P(N=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots.}
\tag{10.4}
$$

它常用于固定时间或空间内稀有事件计数。Taylor 展开 $e^\lambda=\sum_{k=0}^{\infty}\lambda^k/k!$ 直接证明这些概率归一。

**定理 10.5（Poisson 极限）**

若 $n\to\infty$、$p_n\to0$ 且 $np_n\to\lambda\in(0,\infty)$，则对固定 $k\ge0$，

$$
\binom nk p_n^k(1-p_n)^{n-k}\longrightarrow e^{-\lambda}\frac{\lambda^k}{k!}.
$$

**证明思路**

固定 $k$，有 $\binom nk\sim n^k/k!$，且 $p_n^k\sim\lambda^k/n^k$，故前两部分之积趋于 $\lambda^k/k!$。又

$$
(n-k)\log(1-p_n)
=(n-k)(-p_n+o(p_n))\to-\lambda,
$$

所以 $(1-p_n)^{n-k}\to e^{-\lambda}$。这里使用了 $\log(1+x)=x+o(x)$（$x\to0$）。

□

该定理解释了 Poisson 分布与大量独立低概率试验之间的关系，但它不是“任何稀有事件都为 Poisson”的普遍结论；事件聚集、概率差异过大或依赖结构都可能破坏近似。

## 10.4 常见连续分布

### 10.4.1 均匀分布与指数分布

$\operatorname{Uniform}(a,b)$ 的密度为

$$
f(x)=\frac1{b-a}\mathbf1_{(a,b)}(x).
$$

落在某个子区间的概率只与其长度有关。区间端点的开闭不改变分布，因为单点概率为零。

参数为 $\lambda>0$ 的指数分布具有密度与生存函数

$$
f(x)=\lambda e^{-\lambda x}\mathbf1_{x\ge0},
\qquad
\boxed{\mathbb P(T>t)=e^{-\lambda t},\quad t\ge0.}
\tag{10.5}
$$

**定理 10.6（无记忆性）**

若 $T\sim\operatorname{Exp}(\lambda)$，则对任意 $s,t\ge0$，

$$
\mathbb P(T>s+t\mid T>s)=\mathbb P(T>t).
$$

**证明**

由于 $\{T>s+t\}\subseteq\{T>s\}$，条件概率为

$$
\frac{\mathbb P(T>s+t)}{\mathbb P(T>s)}
=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}
=e^{-\lambda t}.
$$

□

在连续分布中，指数分布的正半轴无记忆性具有特征意义。无记忆性并不表示已经等待的时间从未发生，而是剩余等待时间的条件分布不随已等待时间改变。

### 10.4.2 正态分布

标准正态分布的密度为

$$
\boxed{\varphi(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2},\qquad x\in\mathbb R.}
\tag{10.6}
$$

其归一化来自 Gauss 积分。令 $I=\int_{-\infty}^{\infty}e^{-x^2/2}dx$，则

$$
I^2=\iint_{\mathbb R^2}e^{-(x^2+y^2)/2}dx\,dy
=\int_0^{2\pi}\int_0^\infty e^{-r^2/2}r\,dr\,d\theta=2\pi.
$$

若 $Z$ 具有上述密度，则 $X=\mu+\sigma Z$（$\sigma>0$）称为服从 $N(\mu,\sigma^2)$，其密度由变量变换得到：

$$
f_X(x)=\frac1{\sqrt{2\pi}\sigma}
\exp\left[-\frac{(x-\mu)^2}{2\sigma^2}\right].
$$

记 $\Phi(z)=\mathbb P(Z\le z)$。对称性给出 $\Phi(-z)=1-\Phi(z)$，且

$$
\mathbb P(X\le x)=\Phi\left(\frac{x-\mu}{\sigma}\right).
$$

### 10.4.3 Gamma 与 Beta 分布

Gamma 函数定义为

$$
\Gamma(\alpha)=\int_0^\infty x^{\alpha-1}e^{-x}dx,
\qquad \alpha>0.
$$

分部积分给出 $\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$，并对正整数 $n$ 有 $\Gamma(n)=(n-1)!$。形状—速率参数化为 $(\alpha,\beta)$ 的 Gamma 密度为

$$
\boxed{f(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}\mathbf1_{x>0}.}
\tag{10.7}
$$

$\alpha=1$ 时退化为指数分布。另一常用口径以尺度 $\theta=1/\beta$ 参数化，代入时必须分清速率与尺度。

参数为 $\alpha,\beta>0$ 的 Beta 密度为

$$
\boxed{f(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}\mathbf1_{0<x<1},}
\tag{10.8}
$$

其中

$$
B(\alpha,\beta)=\int_0^1x^{\alpha-1}(1-x)^{\beta-1}dx
=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}.
$$

Beta 分布的支持集为 $(0,1)$，适合作为概率或比例变量的模型。归一化常数必须随 $\alpha,\beta$ 改变，不能省略为同一个常数。

## 10.5 一维随机变量变换

### 10.5.1 CDF 方法：优先处理事件

给定 $Y=g(X)$，最可靠的方法通常是先把 $\{Y\le y\}$ 转化为关于 $X$ 的事件，再求导或求和。

**例 10.2（平方变换）**

设 $Z\sim N(0,1)$，$Y=Z^2$。求 $Y$ 的密度。

**解**

当 $y<0$ 时，$F_Y(y)=0$。当 $y\ge0$ 时，

$$
F_Y(y)=\mathbb P(-\sqrt y\le Z\le\sqrt y)
=\Phi(\sqrt y)-\Phi(-\sqrt y)=2\Phi(\sqrt y)-1.
$$

对 $y>0$ 求导：

$$
f_Y(y)=2\varphi(\sqrt y)\frac1{2\sqrt y}
=\frac1{\sqrt{2\pi}}y^{-1/2}e^{-y/2}.
$$

因此 $Y$ 服从形状 $1/2$、速率 $1/2$ 的 Gamma 分布，也称自由度 $1$ 的卡方分布。平方不是一一映射，若只代入单侧反函数会漏掉另一支。

### 10.5.2 单调变换公式

**定理 10.7（严格单调变换）**

设 $X$ 在区间 $I$ 上具有密度 $f_X$，$g:I\to J$ 可微且严格单调，$g'(x)$ 在内部不为零，$Y=g(X)$。则

$$
\boxed{f_Y(y)=f_X\bigl(g^{-1}(y)\bigr)
\left|\frac{d}{dy}g^{-1}(y)\right|,\qquad y\in J.}
\tag{10.9}
$$

**证明**

先设 $g$ 严格递增，$h=g^{-1}$。则

$$
F_Y(y)=\mathbb P(X\le h(y))=F_X(h(y)).
$$

对 $y$ 求导得到 $f_Y(y)=f_X(h(y))h'(y)$。若 $g$ 严格递减，则

$$
F_Y(y)=\mathbb P(X\ge h(y))=1-F_X(h(y))
$$

（连续变量单点概率为零），求导得到 $-f_X(h(y))h'(y)$；此时 $h'(y)<0$，故仍可统一写成绝对值形式。

□

式（10.9）的 Jacobian 因子保证变换前后对应小区间的概率质量一致，而不是只把 $x$ 替换为 $h(y)$。对于多支映射，应分别求每支贡献后相加。

**例 10.3（对数正态变量）**

若 $X\sim N(\mu,\sigma^2)$，$Y=e^X$，求 $Y$ 的密度。

**解**

$Y>0$，反函数为 $x=\log y$，导数为 $1/y$。由式（10.9），

$$
f_Y(y)=\frac1{y\sigma\sqrt{2\pi}}
\exp\left[-\frac{(\log y-\mu)^2}{2\sigma^2}\right]\mathbf1_{y>0}.
$$

这就是对数正态分布。由于 $Y$ 必须为正，密度在 $y\le0$ 时为零。

## 10.6 分位数、混合、截断与重尾

### 10.6.1 分位数与广义逆

对 $0<p<1$，$p$ 分位数通常指满足

$$
F(x-)\le p\le F(x)
$$

的任意 $x$。为消除不唯一性，定义下分位数函数

$$
\boxed{F^{-1}(p)=\inf\{x\in\mathbb R:F(x)\ge p\},\qquad 0<p<1.}
\tag{10.10}
$$

若 $U\sim\operatorname{Uniform}(0,1)$，则 $X=F^{-1}(U)$ 的 CDF 为 $F$，这称为逆变换采样。对连续严格递增 CDF，它就是普通反函数；对离散或有平坦段的 CDF，广义逆仍然有效。

### 10.6.2 混合分布

若 $F_1,\ldots,F_k$ 为分布函数，$\pi_i\ge0$ 且 $\sum_i\pi_i=1$，则

$$
\boxed{F(x)=\sum_{i=1}^k\pi_iF_i(x)}
\tag{10.11}
$$

仍为分布函数。其含义是先用概率 $\pi_i$ 选择成分 $i$，再从 $F_i$ 抽样。若各成分都有密度，则混合密度为 $f=\sum_i\pi_if_i$。混合分布与随机变量求和不同：前者选择其中一个成分，后者把所有成分相加。

### 10.6.3 截断分布

若 $\mathbb P(X\in A)>0$，$X$ 在 $A$ 上的截断分布是条件分布 $\mathbb P(X\in\cdot\mid X\in A)$。对具有密度 $f$ 的变量，截断到区间 $[a,b]$ 后的密度为

$$
\boxed{f_{X\mid a\le X\le b}(x)=
\frac{f(x)\mathbf1_{[a,b]}(x)}{F(b)-F(a)}.}
\tag{10.12}
$$

截断改变支持集和归一化常数，并不等同于把原密度简单裁掉。

### 10.6.4 重尾分布

正态和指数分布的尾部呈指数衰减，而许多金融损益、极端保险赔付和网络规模变量表现出多项式尾部。参数为 $x_m>0,\alpha>0$ 的 Pareto 分布具有生存函数

$$
\boxed{\mathbb P(X>x)=(x_m/x)^\alpha,\qquad x\ge x_m.}
\tag{10.13}
$$

当 $x\to\infty$ 时，$\mathbb P(X>x)$ 仅按 $x^{-\alpha}$ 衰减，$\alpha$ 越小尾部越重。另一个典型重尾分布是标准 Cauchy 分布，密度为

$$
f(x)=\frac1{\pi(1+x^2)},\qquad x\in\mathbb R.
$$

其尾部密度按 $x^{-2}$ 衰减。重尾不只是“方差较大”，而是极端结果对分布结构和许多经典结论产生根本影响；矩的存在条件将在第11章严格讨论。

**例 10.4（混合与截断的区别）**

某收益模型以 $0.9$ 的概率取 $N(0,1)$，以 $0.1$ 的概率取 $N(0,10^2)$。写出密度，并说明它是否等于单个正态密度。

**解**

混合密度为

$$
f(x)=0.9\varphi(x)+0.1\frac1{10}\varphi\left(\frac{x}{10}\right).
$$

它是两个密度的凸组合，一般不是正态密度。混合结构使中心部分主要由第一成分贡献，而远尾部分第二成分的相对影响显著增大。若再截断到 $[-a,a]$，还需将整个混合密度除以 $\mathbb P(|X|\le a)$。

## 本章小结

随机变量是概率空间上的可测函数，其分布是实数 Borel 集上的像测度。CDF 统一描述离散、绝对连续和混合分布；PMF 描述点质量，PDF 描述区间概率密度而不是点概率。

常见分布的区别来自生成机制和参数假设：二项分布对应独立重复试验，超几何分布对应无放回抽样，几何与负二项分布描述成功等待，Poisson 分布描述计数，指数分布具有无记忆性，正态、Gamma、Beta 与 Pareto 等连续模型具有不同支持集和尾部结构。变量变换的核心是事件映射与 Jacobian 因子；分位数广义逆连接 CDF 与抽样；混合、截断和重尾模型则要求分别处理成分权重、条件归一化与尾部衰减。

## 习题

1. 证明：若 $X$ 是随机变量，$g:\mathbb R\to\mathbb R$ 为 Borel 可测函数，则 $g(X)$ 也是随机变量。
2. 设 $F(x)=0$（$x<0$），$F(x)=1-e^{-2x}$（$x\ge0$）。验证 $F$ 是 CDF，并求 $\mathbb P(1<X\le2)$ 与 $\mathbb P(X=1)$。
3. 设 $F(x)=0$（$x<0$），$F(x)=x/3$（$0\le x<1$），$F(x)=2/3$（$1\le x<2$），$F(x)=1$（$x\ge2$）。求所有点质量及绝对连续部分的总质量。
4. 独立重复成功概率为 $0.2$ 的试验 $10$ 次。求恰好两次成功的概率，以及至少一次成功的概率。
5. 从 $20$ 件产品中有 $6$ 件次品，无放回抽取 $5$ 件。求恰好两件次品的概率，并说明为何不能直接使用二项分布的独立乘积而不作修正。
6. 公平硬币投掷到第三次正面出现为止。求总投掷次数为 $8$ 的概率，并说明最后一次投掷必须是什么结果。
7. 设 $N\sim\operatorname{Poisson}(\lambda)$。证明 $\mathbb P(N=k+1)/\mathbb P(N=k)=\lambda/(k+1)$，并据此讨论 PMF 的单调区间。
8. 当 $np=2$ 且 $n=100$ 时，分别计算二项分布 $\mathbb P(S=0)$ 与参数 $2$ 的 Poisson 近似值。
9. 设 $T\sim\operatorname{Exp}(\lambda)$。已知 $T>2$，求 $T>5$ 的条件概率，并求 $T$ 在 $[1,3]$ 上截断后的密度。
10. 设 $X\sim N(2,9)$。用 $\Phi$ 表示 $\mathbb P(-1<X<5)$ 与 $\mathbb P(X>8)$。
11. 证明：若 $X\sim\operatorname{Gamma}(\alpha,\beta)$（速率口径），则 $Y=cX$（$c>0$）服从 $\operatorname{Gamma}(\alpha,\beta/c)$。
12. 设 $U\sim\operatorname{Uniform}(0,1)$，$Y=-\log(1-U)/\lambda$。求 $Y$ 的分布，并解释 $1-U$ 可否替换为 $U$。
13. 设 $Z\sim N(0,1)$，$Y=|Z|$。求 $Y$ 的 CDF 与密度。
14. 设 $X$ 在 $(0,1)$ 上有密度 $f_X(x)=2x$，$Y=1/X$。求 $Y$ 的密度并检查归一化。
15. 写出参数为 $x_m=1,\alpha=3$ 的 Pareto 密度，并求其中位数。
16. 设 $F$ 连续且严格递增，$U\sim\operatorname{Uniform}(0,1)$。证明 $F^{-1}(U)$ 的 CDF 为 $F$，并证明若 $X$ 的 CDF 为 $F$，则 $F(X)\sim\operatorname{Uniform}(0,1)$。
17. 两个正态成分 $N(-1,1)$ 与 $N(2,4)$ 以权重 $1/3,2/3$ 混合。写出混合 CDF 和密度，并说明混合分布与 $\frac13X_1+\frac23X_2$ 的区别。
18. 某模型用标准 Cauchy 分布描述异常冲击。求 $\mathbb P(|X|>t)$（$t>0$），并比较其与标准正态尾部随 $t$ 增大的衰减形式。正态尾部的精确渐近式不要求证明，可使用 $\mathbb P(Z>t)\sim\varphi(t)/t$。
