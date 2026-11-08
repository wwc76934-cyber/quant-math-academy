# 第10章习题参考答案与解析

## 1.

**证明**

设 $(\Omega,\mathcal F,\mathbb P)$ 为底层的概率空间。随机变量是从 $\Omega$ 到 $\mathbb R$ 的映射 $X$，满足对任意 Borel 集 $B\in\mathcal B(\mathbb R)$ 都有 $X^{-1}(B)=\{\omega\in\Omega:X(\omega)\in B\}\in\mathcal F$；Borel 可测函数是满足对任意 $B\in\mathcal B(\mathbb R)$ 都有 $g^{-1}(B)=\{x\in\mathbb R:g(x)\in B\}\in\mathcal B(\mathbb R)$ 的映射 $g:\mathbb R\to\mathbb R$。

考虑复合映射 $g(X)=g\circ X:\Omega\to\mathbb R$。对任意 $B\in\mathcal B(\mathbb R)$，由复合映射的原像等于原像的复合，

$$
(g\circ X)^{-1}(B)=X^{-1}\bigl(g^{-1}(B)\bigr).
$$

逐元素验证这一等式：$\omega\in(g\circ X)^{-1}(B)$ 当且仅当 $g(X(\omega))\in B$，当且仅当 $X(\omega)\in g^{-1}(B)$，当且仅当 $\omega\in X^{-1}\bigl(g^{-1}(B)\bigr)$。由于 $g$ Borel 可测，$g^{-1}(B)$ 是 $\mathbb R$ 中的 Borel 集；由于 $X$ 是随机变量，$X^{-1}\bigl(g^{-1}(B)\bigr)\in\mathcal F$。于是对一切 $B\in\mathcal B(\mathbb R)$ 都有 $\{g(X)\in B\}\in\mathcal F$，即 $g(X)$ 是随机变量。

□

证明的关键依据是原像运算与复合的可交换性以及可测性对复合的封闭。实际操作中可以只在生成系上验证：要证 $g(X)$ 是随机变量，只需对每个 $a\in\mathbb R$ 检验 $\{g(X)\le a\}\in\mathcal F$，而 $\{g(X)\le a\}=X^{-1}\bigl(g^{-1}((-\infty,a])\bigr)$；集合族 $\mathcal G=\{B\subseteq\mathbb R:g^{-1}(B)\in\mathcal B(\mathbb R)\}$ 是一个 $\sigma$ 代数，且按 $g$ 可测性的常用定义它包含全部形如 $(-\infty,a]$ 的区间，而这些区间生成 $\mathcal B(\mathbb R)$，故 $\mathcal G\supseteq\mathcal B(\mathbb R)$。这说明上面的证明可以对任意 Borel 集进行，两种可测性定义是等价的。

常见错误之一是以为需要 $g$ 连续甚至可导才能保证结论成立——事实上 Borel 可测性已经足够，指示函数、$\max\{x,0\}$、$|x|$、$\lfloor x\rfloor$ 这类不连续函数都保持随机变量性质。另一常见错误是把 $\{g(X)\le a\}$ 写成 $\{X\le g^{-1}(a)\}$：当 $g$ 不是严格单调时逆函数 $g^{-1}$ 根本不存在，只能使用原像集 $g^{-1}((-\infty,a])$；例如取 $g(x)=x^2$，对 $a\ge0$ 有 $\{X^2\le a\}=\{-\sqrt a\le X\le\sqrt a\}$，是一个双侧区间而不是形如 $\{X\le c\}$ 的半直线。

## 2.

分布函数须满足三个条件：极限为 $0$ 与 $1$、单调不减、右连续。逐条验证如下。其一，$\lim_{x\to-\infty}F(x)=\lim_{x\to-\infty}0=0$，且 $\lim_{x\to+\infty}F(x)=\lim_{x\to+\infty}\bigl(1-e^{-2x}\bigr)=1$。其二，在 $(-\infty,0)$ 上 $F$ 恒为 $0$；在 $[0,+\infty)$ 上任取 $0\le x_1<x_2$，有 $F(x_2)-F(x_1)=e^{-2x_1}-e^{-2x_2}>0$，即 $F$ 在 $[0,+\infty)$ 上递增（等价地看导数 $F'(x)=2e^{-2x}>0$）；对 $x<0\le y$ 有 $F(x)=0\le F(y)$。故 $F$ 在整个实轴上单调不减。其三，两段表达式都是连续函数，且在衔接点 $x=0$ 处 $F(0)=1-e^{0}=0$，与左极限 $\lim_{x\to0^-}F(x)=0$ 和右极限 $\lim_{x\to0^+}F(x)=0$ 都一致，故 $F$ 在全直线上连续，特别地右连续。三个条件全部满足，$F$ 是合法的分布函数，它正是速率为 $2$ 的指数分布 $\operatorname{Exp}(2)$ 的分布函数。

由分布函数的区间概率公式，

$$
\mathbb P(1<X\le2)=F(2)-F(1)=\bigl(1-e^{-4}\bigr)-\bigl(1-e^{-2}\bigr)=e^{-2}-e^{-4}\approx0.1170.
$$

单点概率等于该点的跳跃高度：$\mathbb P(X=1)=F(1)-F(1^-)$，其中 $F(1^-)=\lim_{x\uparrow1}\bigl(1-e^{-2x}\bigr)=1-e^{-2}=F(1)$，故 $\mathbb P(X=1)=0$，这与连续型随机变量任一单点概率为零的一般事实一致。

一般地必须区分 $\mathbb P(a<X\le b)=F(b)-F(a)$ 与 $\mathbb P(a\le X\le b)=F(b)-F(a^-)$，二者仅当 $F$ 在 $a$ 处连续时才相等。本题 $F$ 恰好连续，结果没有差别，但对带跳跃的分布函数（见第 3 题）混用两个公式就会出错。另一常见错误是把 $\mathbb P(X=1)$ 答成密度在该点的取值 $f(1)=2e^{-2}$：密度是概率的变化率而不是概率本身，连续分布下单点概率恒为零。

## 3.

点质量等于分布函数在该点的跳跃高度 $F(x)-F(x^-)$，故逐一检查分段定义的各个衔接点。在 $x=0$ 处，$F(0)=0/3=0$，$F(0^-)=0$，跳跃高度为 $0$，无点质量。在 $x=1$ 处，按定义应使用第三段，$F(1)=2/3$，而左极限 $F(1^-)=\lim_{x\uparrow1}x/3=1/3$，跳跃高度为 $2/3-1/3=1/3$，即 $\mathbb P(X=1)=1/3$。在 $x=2$ 处，$F(2)=1$，$F(2^-)=2/3$，跳跃高度为 $1/3$，即 $\mathbb P(X=2)=1/3$。其余各点 $F$ 连续，故不再有其他点质量。

绝对连续部分由导数给出密度。在 $(0,1)$ 上 $F'(x)=1/3$；在 $(-\infty,0)$、$[1,2)$ 与 $[2,+\infty)$ 上 $F$ 为常数，导数为零。因此绝对连续部分的密度为

$$
f(x)=\frac{1}{3}\,\mathbf 1_{(0,1)}(x),
$$

其总质量为 $\int_{-\infty}^{+\infty}f(x)\,dx=\int_0^1\frac13\,dx=\frac13$。

检验：离散部分总质量 $1/3+1/3=2/3$，加上连续部分质量 $1/3$，恰好为 $1$，与 $F$ 的极限性质一致。这个 $X$ 具有典型的混合结构：它可以看作以概率 $1/3$ 从均匀分布 $U(0,1)$ 中取值、以概率 $1/3$ 取定值 $1$、以概率 $1/3$ 取定值 $2$ 的混合分布。

最常见的错误是把 $F(1)$ 按 $0\le x<1$ 段的表达式算成 $1/3$，从而误判 $F$ 在 $x=1$ 处连续、没有点质量：分段函数在衔接点处的取值必须由包含该点的那一段定义决定，本题 $x=1$ 落在第三段 $1\le x<2$ 上，故 $F(1)=2/3$，跳跃高度是“该点取值减去左极限”。另一错误是把连续部分的总质量误算为 $2/3$ 甚至 $1$，忽视了常值区间不贡献任何连续质量，或者算完后忘记用三部分质量之和等于 $1$ 来检验。

## 4.

设 $S$ 为成功次数，试验相互独立且每次成功概率恒为 $0.2$，故 $S\sim\operatorname{Bin}(10,0.2)$。

$$
\mathbb P(S=2)=\binom{10}{2}(0.2)^2(0.8)^8=45\times0.04\times0.16777216\approx0.30199.
$$

“至少一次成功”是“一次都不成功”的对立事件，故

$$
\mathbb P(S\ge1)=1-\mathbb P(S=0)=1-(0.8)^{10}=1-0.10737\approx0.89263.
$$

常见错误之一是第一问漏掉组合数，写成 $(0.2)^2(0.8)^8\approx0.0067$：那只是“前两次成功后八次失败”这一种特定排列的概率，而两次成功可以出现在 $\binom{10}{2}=45$ 个不同位置，各位置互斥且等概率。第二问的常见错误是算成 $10\times0.2\times(0.8)^9\approx0.2684$，那只是恰好一次成功的概率 $\mathbb P(S=1)$，遗漏了两次及两次以上成功的全部情形；“至少一次”应始终优先考虑对立事件。

## 5.

设 $X$ 为抽到的次品件数。抽取是无放回的，总体 $N=20$ 件中次品 $6$ 件，抽取 $n=5$ 件，故 $X$ 服从超几何分布：

$$
\mathbb P(X=2)=\frac{\binom62\binom{14}{3}}{\binom{20}{5}}=\frac{15\times364}{15504}=\frac{5460}{15504}=\frac{455}{1292}\approx0.3522.
$$

不能直接使用二项分布独立乘积的原因：二项模型要求各次试验相互独立且每次成功概率恒为 $p$。无放回抽取时每抽出一件就改变了批内剩余产品的构成，下一次抽取的条件概率依赖于之前的结果——若第一件是次品，则第二件是次品的条件概率为 $5/19$；若第一件是正品，则为 $6/19$，二者不相等，故各次抽取不独立。虽然由对称性每一次抽取的无条件概率都等于 $6/20=0.3$，但独立性已被破坏，二项公式这一“独立乘积”模型不再适用。若强行套用，得

$$
\binom52(0.3)^2(0.7)^3=10\times0.09\times0.343=0.3087,
$$

比真实概率低约 $0.043$。正确的关系是：超几何分布与二项分布的均值同为 $np=5\times0.3=1.5$，但超几何方差多一个有限总体校正因子 $(N-n)/(N-1)=15/19$——无放回抽取产生的负相关性压低了波动。当抽样比 $n/N$ 充分小时超几何分布可以用二项分布近似，本题 $n/N=1/4$ 不够小，修正不可省略。

常见错误包括：把无放回抽取当作有放回抽取而直接套用二项公式；组合计数时分子只写 $\binom62$ 而忘记其余 $3$ 件必须从 $14$ 件正品中选取；以及分子用组合、分母用排列等口径不一致的计数。

## 6.

设 $N$ 为总投掷次数，事件 $\{N=8\}$ 表示第三次正面恰好出现在第八次投掷。最后一次投掷必须是正面：若第八次是反面，则要在第八次或之前累计出三次正面，第三次正面只能出现在前七次之中，过程便会提前停止，总次数不可能是 $8$，矛盾。因此第八次为正面，且前七次中恰好出现两次正面。各次投掷独立且正面概率为 $1/2$，故

$$
\mathbb P(N=8)=\binom72\left(\frac12\right)^7\times\frac12=\frac{21}{256}\approx0.0820.
$$

这正是负二项分布 $\mathbb P(N=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r}$ 在 $r=3$、$p=1/2$、$k=8$ 时的特例：前 $k-1$ 次中恰好 $r-1$ 次成功、第 $k$ 次成功。

常见错误是写成 $\binom83(1/2)^8=56/256$：那是“八次投掷中恰有三次正面”的概率，其中包含第三次正面在第八次之前就已出现的序列（例如前三次全为正面，过程实际在第三次投掷就已停止），违背了停止规则，结果约为真实值的 $2.7$ 倍。正确计数必须把最后一次固定为正面，再在前 $k-1=7$ 次中安排其余 $r-1=2$ 次正面的位置，这正是负二项系数 $\binom{k-1}{r-1}$ 与二项系数 $\binom{k}{r}$ 的区别。

## 7.

**证明**

$N\sim\operatorname{Poisson}(\lambda)$ 的 PMF 为 $\mathbb P(N=k)=e^{-\lambda}\lambda^k/k!$，$k=0,1,2,\dots$，且对每个 $k$ 都有 $\mathbb P(N=k)>0$，故相邻比值有意义。对任意 $k\ge0$，

$$
\frac{\mathbb P(N=k+1)}{\mathbb P(N=k)}=\frac{e^{-\lambda}\lambda^{k+1}/(k+1)!}{e^{-\lambda}\lambda^k/k!}=\frac{\lambda^{k+1}}{\lambda^k}\cdot\frac{k!}{(k+1)!}=\frac{\lambda}{k+1}.
$$

□

把这一比值与 $1$ 比较即可读出全部单调性信息：$\mathbb P(N=k+1)>\mathbb P(N=k)$ 当且仅当 $k+1<\lambda$；相等当且仅当 $k+1=\lambda$；严格变小当且仅当 $k+1>\lambda$。因此 PMF 先增后减。具体地：当 $0<\lambda<1$ 时，对一切 $k\ge0$ 都有 $k+1>\lambda$，PMF 从 $k=0$ 起严格递减，众数为 $0$；当 $\lambda>1$ 且不是整数时，比值在 $k\le\lfloor\lambda\rfloor-1$ 时大于 $1$、在 $k\ge\lfloor\lambda\rfloor$ 时小于 $1$，故 PMF 在 $k=0,1,\dots,\lfloor\lambda\rfloor$ 上严格上升、在 $k\ge\lfloor\lambda\rfloor$ 上严格下降，唯一众数为 $\lfloor\lambda\rfloor$；当 $\lambda=m$ 为正整数时，$k=m-1$ 处比值为 $1$，即 $\mathbb P(N=m)=\mathbb P(N=m-1)$，PMF 严格上升至 $m-1$，在 $m-1$ 与 $m$ 处取相等的最大值，随后严格下降，众数有两个：$m-1$ 与 $m$。

常见错误包括：比值出现指标错位，写成 $\lambda/k$；以及不加区分地断言“众数等于 $\lambda$”——当 $\lambda$ 为正整数时分布是双峰的（$\lambda-1$ 与 $\lambda$），且当 $0<\lambda<1$ 时众数是 $0$ 而非 $\lambda$。比值法是求离散分布众数的通用技巧，对二项分布同样适用：$\mathbb P(S=k+1)/\mathbb P(S=k)=\frac{(n-k)p}{(k+1)(1-p)}$，与 $1$ 比较可得 $\operatorname{Bin}(n,p)$ 的众数为 $\lfloor(n+1)p\rfloor$，且当 $(n+1)p$ 为不超过 $n$ 的正整数时同样出现双峰。

## 8.

由 $n=100$ 且 $np=2$ 得 $p=0.02$，即 $S\sim\operatorname{Bin}(100,0.02)$。二项分布的精确值为

$$
\mathbb P(S=0)=(1-p)^{100}=0.98^{100}\approx0.13262.
$$

取 $\lambda=np=2$ 的 Poisson 近似值为

$$
\mathbb P(S=0)\approx e^{-\lambda}\frac{\lambda^0}{0!}=e^{-2}\approx0.13534.
$$

绝对误差约 $0.0027$，相对误差约 $2.0\%$，Poisson 值略偏大。这与一般事实相符：固定 $\lambda$ 时序列 $\bigl(1-\lambda/n\bigr)^n$ 随 $n$ 单调上升趋于 $e^{-\lambda}$，故有限 $n$ 下二项值总在 Poisson 值之下。Le Cam 不等式表明二项分布与 Poisson 分布之间的总变差距离由 $np^2=100\times0.0004=0.04$ 的量级控制，$n$ 大 $p$ 小时近似质量良好，这正是“稀有事件定律”的定量含义。

常见错误包括：混淆参数，把 Poisson 近似的 $\lambda$ 取成 $p=0.02$ 或 $n=100$ 而不是 $np=2$；以及把近似当作恒等，意识不到 $0.98^{100}$ 与 $e^{-2}$ 之间存在方向确定的系统偏差。

## 9.

指数分布的生存函数为 $\mathbb P(T>t)=e^{-\lambda t}$（$t\ge0$，$\lambda>0$）。由条件概率定义并注意 $\{T>5\}\subseteq\{T>2\}$，

$$
\mathbb P(T>5\mid T>2)=\frac{\mathbb P(T>5,\ T>2)}{\mathbb P(T>2)}=\frac{\mathbb P(T>5)}{\mathbb P(T>2)}=\frac{e^{-5\lambda}}{e^{-2\lambda}}=e^{-3\lambda}.
$$

这正是指数分布的无记忆性 $\mathbb P(T>s+t\mid T>s)=\mathbb P(T>t)$ 在 $s=2$、$t=3$ 时的体现：已经等待了 $2$ 个单位时间这一事实不改变剩余寿命的分布。

再求截断分布。条件 $\{1\le T\le3\}$ 的规范化常数为

$$
\mathbb P(1\le T\le3)=F(3)-F(1)=\bigl(1-e^{-3\lambda}\bigr)-\bigl(1-e^{-\lambda}\bigr)=e^{-\lambda}-e^{-3\lambda},
$$

故截断后的条件密度等于原密度除以该常数，并把支撑限制在 $[1,3]$ 上：

$$
g(t)=\frac{f_T(t)}{\mathbb P(1\le T\le3)}\,\mathbf 1_{[1,3]}(t)=\frac{\lambda e^{-\lambda t}}{e^{-\lambda}-e^{-3\lambda}}\,\mathbf 1_{[1,3]}(t).
$$

验证归一化：$\int_1^3g(t)\,dt=\dfrac{\lambda\int_1^3e^{-\lambda t}\,dt}{e^{-\lambda}-e^{-3\lambda}}=\dfrac{\bigl[-e^{-\lambda t}\bigr]_1^3}{e^{-\lambda}-e^{-3\lambda}}=\dfrac{e^{-\lambda}-e^{-3\lambda}}{e^{-\lambda}-e^{-3\lambda}}=1$。

常见错误：第一问直接回答 $e^{-5\lambda}$（忽略条件事件），或把指数相减算成 $e^{-7\lambda}$；第二问规范化常数用错，例如除以 $\mathbb P(T\le3)=1-e^{-3\lambda}$ 或除以区间长度 $2$，或者忘记用指示函数把支撑限制在 $[1,3]$，使所得函数在区间外仍取正值。还需注意截断后的指数分布不再具有无记忆性：无记忆性只对形如 $\{T>s\}$ 的无条件上界事件成立，对有限区间 $\{1\le T\le3\}$ 的条件化会破坏它。

## 10.

$X\sim N(2,9)$ 表示 $\mu=2$、$\sigma^2=9$，标准差 $\sigma=3$。标准化 $Z=(X-2)/3\sim N(0,1)$，则

$$
\mathbb P(-1<X<5)=\mathbb P\left(\frac{-1-2}{3}<Z<\frac{5-2}{3}\right)=\mathbb P(-1<Z<1)=\Phi(1)-\Phi(-1)=2\Phi(1)-1\approx0.6827,
$$

其中用了对称性 $\Phi(-1)=1-\Phi(1)$。同理，

$$
\mathbb P(X>8)=\mathbb P\left(Z>\frac{8-2}{3}\right)=\mathbb P(Z>2)=1-\Phi(2)=\Phi(-2)\approx0.0228.
$$

最常见的错误是标准化时除以方差 $9$ 而不是标准差 $\sigma=3$，例如把第二个概率错算成 $1-\Phi(6/9)$；其次是处理负端点时符号出错，把 $\Phi(1)-\Phi(-1)$ 误写成 $\Phi(1)+\Phi(-1)$。第一问本质上是 $1\sigma$ 法则：任何正态变量落在均值一个标准差范围内的概率都约为 $68.27\%$，与具体的 $\mu$、$\sigma$ 取值无关，这可以作为快速核对手段。

## 11.

**证明**

采用速率口径，$X\sim\operatorname{Gamma}(\alpha,\beta)$ 的密度为

$$
f_X(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}\,x^{\alpha-1}e^{-\beta x},\quad x>0,
$$

在 $x\le0$ 上为 $0$。设 $c>0$，变换 $y=cx$ 在支撑 $(0,+\infty)$ 上严格单调递增，逆映射为 $x=y/c$，导数 $\frac{dx}{dy}=\frac1c$，且 $y$ 的支撑仍为 $(0,+\infty)$。由一维变量变换公式，对 $y>0$，

$$
f_Y(y)=f_X\!\left(\frac{y}{c}\right)\left|\frac{dx}{dy}\right|=\frac{\beta^\alpha}{\Gamma(\alpha)}\left(\frac{y}{c}\right)^{\alpha-1}e^{-\beta y/c}\cdot\frac{1}{c}=\frac{\beta^\alpha}{c^\alpha\,\Gamma(\alpha)}\,y^{\alpha-1}e^{-(\beta/c)y}=\frac{(\beta/c)^\alpha}{\Gamma(\alpha)}\,y^{\alpha-1}e^{-(\beta/c)y},
$$

其中把 $\bigl(1/c\bigr)^{\alpha-1}$ 与 $1/c$ 合并成 $1/c^\alpha$，再用 $\beta^\alpha/c^\alpha=(\beta/c)^\alpha$。最后一式正是形状参数为 $\alpha$、速率为 $\beta/c$ 的 Gamma 密度，故 $Y=cX\sim\operatorname{Gamma}(\alpha,\beta/c)$。

□

替代证明（矩生成函数法）：$X$ 的 MGF 为 $M_X(t)=\bigl(1-t/\beta\bigr)^{-\alpha}$（$t<\beta$）。当 $t<\beta/c$ 时，

$$
M_Y(t)=\mathbb E\bigl[e^{tY}\bigr]=\mathbb E\bigl[e^{(tc)X}\bigr]=M_X(tc)=\left(1-\frac{tc}{\beta}\right)^{-\alpha}=\left(1-\frac{t}{\beta/c}\right)^{-\alpha},
$$

这正是 $\operatorname{Gamma}(\alpha,\beta/c)$ 的 MGF，由 MGF 在包含原点的区间上存在时的唯一性即得结论。概率上的直观解释是：Gamma 变量可视为速率为 $\beta$ 的 Poisson 过程中第 $\alpha$ 次事件的等待时间，把时间轴整体缩放 $c$ 倍等价于把事件速率改为 $\beta/c$，而事件次数 $\alpha$ 不变。

常见错误包括：遗漏雅可比因子 $1/c$，所得函数积分不为 $1$；只写变换公式而不说明支撑 $y>0$；混淆两种参数口径——速率口径下速率被 $c$ 除（$\beta\to\beta/c$），而尺度口径（$\theta=1/\beta$）下尺度被 $c$ 乘（$\theta\to c\theta$），方向记反就会得到 $Y\sim\operatorname{Gamma}(\alpha,c\beta)$ 的错误结论。

## 12.

用分布函数法。由于 $U\in(0,1)$，有 $1-U\in(0,1)$、$-\log(1-U)\in(0,+\infty)$，故 $Y$ 只取正值：当 $y\le0$ 时 $F_Y(y)=0$。当 $y>0$ 时，逐步解不等式（除以 $\lambda>0$ 方向不变，两边取指数保持方向，整理时移项使方向不变）：

$$
F_Y(y)=\mathbb P\left(\frac{-\log(1-U)}{\lambda}\le y\right)=\mathbb P\bigl(\log(1-U)\ge-\lambda y\bigr)=\mathbb P\bigl(1-U\ge e^{-\lambda y}\bigr)=\mathbb P\bigl(U\le1-e^{-\lambda y}\bigr).
$$

注意第一步除以 $\lambda$ 后移项时不等号方向反转了一次（$-\log(1-U)\le\lambda y$ 等价于 $\log(1-U)\ge-\lambda y$），第二步取指数保持方向，第三步移项再次反转。当 $y>0$ 时 $1-e^{-\lambda y}\in(0,1)$，由 $U\sim\operatorname{Uniform}(0,1)$ 的性质 $\mathbb P(U\le u)=u$（$0<u<1$）得

$$
F_Y(y)=1-e^{-\lambda y},\quad y>0.
$$

合并两段，$F_Y$ 正是速率 $\lambda$ 的指数分布函数，故 $Y\sim\operatorname{Exp}(\lambda)$，密度为 $\lambda e^{-\lambda y}$（$y>0$）。

关于用 $U$ 替换 $1-U$：因为 $U$ 与 $1-U$ 同分布——对 $0\le u\le1$，$\mathbb P(1-U\le u)=\mathbb P(U\ge1-u)=1-(1-u)=u$，即 $1-U\sim\operatorname{Uniform}(0,1)$——所以 $-\log U/\lambda$ 的分布同样是 $\operatorname{Exp}(\lambda)$，替换在分布意义下完全可行。但要明确这是“同分布”而不是“同一个随机变量”：对同一实现值 $u$，$-\log u/\lambda$ 与 $-\log(1-u)/\lambda$ 一般取不同数值（例如 $u=0.3$ 时分别约为 $1.204/\lambda$ 与 $0.357/\lambda$），只是 $U$ 的分布关于 $1/2$ 对称，使两种写法诱导出的 $Y$ 的分布相同。在随机模拟实践中两种形式可任选其一，这是逆变换法生成指数随机数的标准做法。

常见错误包括：处理 $-\log$ 这一单调减运算时不等号方向出错，得到 $F_Y(y)=e^{-\lambda y}$ 这类既非合法分布函数也与实际不符的答案；只对 $y>0$ 计算而不声明 $y\le0$ 时 $F_Y(y)=0$，使支撑交代不完整；以及断言 $-\log U/\lambda$ 与 $-\log(1-U)/\lambda$ 逐点相等。

## 13.

当 $y<0$ 时事件 $\{|Z|\le y\}$ 不可能发生，$F_Y(y)=0$。当 $y\ge0$ 时，

$$
F_Y(y)=\mathbb P(|Z|\le y)=\mathbb P(-y\le Z\le y)=\Phi(y)-\Phi(-y)=2\Phi(y)-1,
$$

其中用了 $\Phi(-y)=1-\Phi(y)$。对 $y$ 求导得密度

$$
f_Y(y)=2\varphi(y)=\frac{2}{\sqrt{2\pi}}\,e^{-y^2/2}=\sqrt{\frac{2}{\pi}}\,e^{-y^2/2},\quad y>0,
$$

在 $y<0$ 上 $f_Y(y)=0$，这就是半正态分布。验证归一化：$\int_0^\infty\sqrt{2/\pi}\,e^{-y^2/2}\,dy=\sqrt{2/\pi}\times\sqrt{\pi/2}=1$，其中用到 $\int_0^\infty e^{-y^2/2}\,dy=\sqrt{\pi/2}$。

同一结果可由变量变换公式得到，但必须注意 $y=|z|$ 在 $\mathbb R$ 上不是一一映射，应拆成两个单调分支：在 $(0,+\infty)$ 上 $y=z$，逆映射 $z=y$；在 $(-\infty,0)$ 上 $y=-z$，逆映射 $z=-y$；两个分支的 $\left|\frac{dz}{dy}\right|$ 都等于 $1$。把两个分支的密度贡献相加，对 $y>0$，

$$
f_Y(y)=\varphi(y)\cdot1+\varphi(-y)\cdot1=\varphi(y)+\varphi(-y)=2\varphi(y),
$$

最后一步用了标准正态密度是偶函数。顺带计算矩：$\mathbb E[Y]=\int_0^\infty y\sqrt{2/\pi}\,e^{-y^2/2}\,dy=\sqrt{2/\pi}\bigl[-e^{-y^2/2}\bigr]_0^\infty=\sqrt{2/\pi}\approx0.798$，而 $\mathbb E[Y^2]=\mathbb E[Z^2]=1$，故 $\operatorname{Var}(Y)=1-2/\pi\approx0.363$。

最典型的错误是忽略负半轴分支、直接套用单分支变换公式得到 $f_Y(y)=\varphi(y)$：漏掉因子 $2$ 后总积分只有 $1/2$，不是合法密度，这正是非一一变换中忽略单调分支的代价。另一错误是认为 $Y=|Z|$ 仍服从正态分布——$Y$ 只取非负值，其分布与 $N(0,1)$ 完全不同。

## 14.

$X$ 的支撑为 $(0,1)$，变换 $y=1/x$ 把它映到 $(1,+\infty)$。该变换在 $(0,1)$ 上严格单调递减，逆映射为 $x=1/y$，且 $\left|\frac{dx}{dy}\right|=\left|-\frac{1}{y^2}\right|=\frac{1}{y^2}$。由变量变换公式，对 $y>1$，

$$
f_Y(y)=f_X\!\left(\frac1y\right)\left|\frac{dx}{dy}\right|=\frac{2}{y}\cdot\frac{1}{y^2}=\frac{2}{y^3},
$$

在 $y\le1$ 上 $f_Y(y)=0$。检查归一化：

$$
\int_1^\infty\frac{2}{y^3}\,dy=2\left[-\frac{1}{2y^2}\right]_1^\infty=2\times\frac12=1,
$$

确为合法密度。这正是 $x_m=1$、$\alpha=2$ 的 Pareto 分布（一般形式 $\alpha x_m^\alpha/y^{\alpha+1}$）：密度为 $2x$ 的 $\operatorname{Beta}(2,1)$ 变量取倒数得到 Pareto 变量，这一联系在重尾建模中经常用到。

用分布函数法核验：对 $y>1$，由于 $1/x$ 单调减，$\{1/X\le y\}=\{X\ge1/y\}$，不等号方向必须反转，故

$$
F_Y(y)=\mathbb P\left(X\ge\frac1y\right)=\int_{1/y}^12x\,dx=\bigl[x^2\bigr]_{1/y}^1=1-\frac{1}{y^2},
$$

求导得 $f_Y(y)=2/y^3$，与公式法一致，且 $F_Y(1^+)=0$、$F_Y(\infty)=1$ 也验证了支撑判断。

常见错误包括：雅可比忘记取绝对值，得到负值 $-2/y^3$；支撑判断错误，把 $y$ 的范围写成 $(0,1)$——$x\in(0,1)$ 时 $1/x$ 恒大于 $1$，递减变换把区间端点“翻转”；忘记把 $1/y$ 代入 $f_X$ 而写成 $\frac{2x}{y^2}$；以及分布函数法中把 $\{1/X\le y\}$ 误写成 $\{X\le1/y\}$。

## 15.

参数为 $x_m=1$、$\alpha=3$ 的 Pareto 密度为

$$
f(x)=\frac{\alpha x_m^\alpha}{x^{\alpha+1}}\,\mathbf 1_{\{x\ge x_m\}}=\frac{3}{x^4},\quad x\ge1,
$$

在 $x<1$ 上为 $0$。验证归一化：$\int_1^\infty3x^{-4}\,dx=\bigl[-x^{-3}\bigr]_1^\infty=1$。对应的分布函数为 $F(x)=1-x^{-3}$（$x\ge1$）。设中位数为 $m$，由 $F(m)=1/2$ 得

$$
1-m^{-3}=\frac12\iff m^{-3}=\frac12\iff m=2^{1/3}\approx1.2599,
$$

与一般分位数公式 $m=x_m\,2^{1/\alpha}=2^{1/3}$ 的结果一致。顺带指出，均值为 $\mathbb E[X]=\frac{\alpha x_m}{\alpha-1}=\frac32$（$\alpha>1$ 时有限），大于中位数 $2^{1/3}\approx1.26$，这是 Pareto 分布右偏的典型表现。

常见错误包括：密度指数误写成 $3/x^3$，即把 $\alpha+1$ 混淆为 $\alpha$——此时 $\int_1^\infty3x^{-3}\,dx=3/2\ne1$，归一化检验立即暴露错误；解中位数时把方程误列为 $F(m)=m$；以及忽略支撑下限 $x\ge x_m=1$，把方程 $m^{-3}=1/2$ 之外的根或支撑外的值当作答案。

## 16.

**证明**

由于 $F$ 连续、严格递增，且 $\lim_{x\to-\infty}F(x)=0$、$\lim_{x\to+\infty}F(x)=1$，$F$ 的值域恰为 $(0,1)$，从而存在严格递增的逆映射 $F^{-1}:(0,1)\to\mathbb R$，并有关键等价关系：对一切 $y\in\mathbb R$ 与 $u\in(0,1)$，

$$
F^{-1}(u)\le y\iff u\le F(y).
$$

其验证只用到严格单调递增：正向对 $F^{-1}(u)\le y$ 两边作用 $F$（递增保持不等号方向）得 $u=F\bigl(F^{-1}(u)\bigr)\le F(y)$；反向对 $u\le F(y)$ 两边作用 $F^{-1}$ 得 $F^{-1}(u)\le F^{-1}\bigl(F(y)\bigr)=y$。

第一部分：设 $Y=F^{-1}(U)$。对任意 $y\in\mathbb R$，$F(y)\in(0,1)$，由上述等价关系及均匀分布性质 $\mathbb P(U\le u)=u$（$0<u<1$），

$$
\mathbb P(Y\le y)=\mathbb P\bigl(F^{-1}(U)\le y\bigr)=\mathbb P\bigl(U\le F(y)\bigr)=F(y).
$$

即 $Y$ 的分布函数恰为 $F$，故 $Y$ 服从以 $F$ 为分布函数的分布。

第二部分：设 $V=F(X)$。由 $F$ 连续严格递增且 $X$ 取有限实值，$V\in(0,1)$。对任意 $v\in(0,1)$，取 $y=F^{-1}(v)$ 应用同一等价关系，得事件相等 $\{V\le v\}=\{F(X)\le v\}=\{X\le F^{-1}(v)\}$，故

$$
\mathbb P(V\le v)=\mathbb P\bigl(X\le F^{-1}(v)\bigr)=F\bigl(F^{-1}(v)\bigr)=v;
$$

当 $v\le0$ 时 $\mathbb P(V\le v)=0$，当 $v\ge1$ 时 $\mathbb P(V\le v)=1$。三段合起来正是 $\operatorname{Uniform}(0,1)$ 的分布函数，故 $F(X)\sim\operatorname{Uniform}(0,1)$。

□

两个结论合称概率积分变换。第一部分是逆变换法的理论基础：任何连续分布都可以由均匀随机数经 $F^{-1}$ 生成，第 12 题的 $-\log(1-U)/\lambda$ 正是 $\operatorname{Exp}(\lambda)$ 的实例；第二部分是分布拟合优度检验与 Copula 建模的基础——把任意连续样本经自身分布函数变换后应表现为均匀样本。题设条件不可去掉：对带跳跃或平段的分布函数，须改用广义逆 $F^{-1}(u)=\inf\{x:F(x)\ge u\}$，此时第一部分关于 $F^{-1}(U)$ 的结论仍然成立，但等价关系 $\{F(X)\le v\}=\{X\le F^{-1}(v)\}$ 在平段与跳跃点处失效，第二部分的证明会失效，需要更细致的处理。常见错误包括：对不等式两边作用 $F$ 或 $F^{-1}$ 时不说明依赖严格单调递增才能保持不等号方向；第二部分遗漏 $v\le0$ 与 $v\ge1$ 两端的验证，使分布函数的检验不完整；以及把“同分布”误当作“逐点相等”。

## 17.

设 $X_1\sim N(-1,1)$、$X_2\sim N(2,4)$，引入潜在选择变量 $B$：$\mathbb P(B=1)=1/3$、$\mathbb P(B=2)=2/3$，与成分独立；混合变量定义为 $M=X_B$，即先抽签决定成分，再从被选中的成分中取值。混合分布的分布函数与密度都是成分的加权（凸）组合：

$$
F_M(x)=\frac13\,\Phi(x+1)+\frac23\,\Phi\!\left(\frac{x-2}{2}\right),
$$

$$
f_M(x)=\frac13\cdot\frac{1}{\sqrt{2\pi}}\,e^{-(x+1)^2/2}+\frac23\cdot\frac{1}{2\sqrt{2\pi}}\,e^{-(x-2)^2/8}=\frac{1}{3\sqrt{2\pi}}\left(e^{-(x+1)^2/2}+e^{-(x-2)^2/8}\right),
$$

其中用了 $\frac23\times\frac{1}{2\sqrt{2\pi}}=\frac{1}{3\sqrt{2\pi}}$，两项系数恰好相同。每个成分密度各积分为 $1$，故 $\int_{-\infty}^{\infty}f_M(x)\,dx=\frac13+\frac23=1$，归一化成立。混合分布的均值与二阶矩为

$$
\mathbb E[M]=\frac13\times(-1)+\frac23\times2=1,\qquad \mathbb E[M^2]=\frac13\times(1^2+1)+\frac23\times(2^2+4)=\frac{2+16}{3}=6,
$$

故 $\operatorname{Var}(M)=6-1^2=5$。

与 $W=\frac13X_1+\frac23X_2$ 的本质区别在于随机性来源与分布形态。混合是“二选一”：随机性来自两个层次——成分选择与成分内取值；线性组合是“两者都取再求平均”：从两个成分同时取值后作加权和。当 $X_1,X_2$ 独立时，$W$ 仍是正态变量：

$$
W\sim N\left(\frac13\times(-1)+\frac23\times2,\ \left(\frac13\right)^2\times1+\left(\frac23\right)^2\times4\right)=N\left(1,\frac{17}{9}\right),
$$

方差 $17/9\approx1.89$，远小于混合分布的方差 $5$。差异的来源可用全方差公式解读：混合方差等于成分内方差的加权平均 $\frac13\times1+\frac23\times4=3$，加上成分均值之间的方差 $\frac13(-1-1)^2+\frac23(2-1)^2=2$，合计恰为 $5$；成分均值差异为混合分布贡献了额外的离散度 $2$，而加权平均把它部分抵消了。此外混合分布不再是正态：本例密度呈现两个峰，而任何正态密度都只有一个峰；独立正态的线性组合则永远是正态。

常见错误包括：把密度的凸组合与和的分布混为一谈，误以为 $\frac13X_1+\frac23X_2$ 的密度是 $\frac13f_1+\frac23f_2$——和或线性组合的密度要用卷积或特征函数处理，独立正态线性组合的均值按系数线性组合、方差按系数平方乘各自方差再求和；误以为两个正态的混合仍是正态；以及书写 $N(2,4)$ 的密度时忘记 $4$ 是方差、标准差为 $2$，规范化常数应为 $\frac{1}{2\sqrt{2\pi}}$、指数应为 $-\frac{(x-2)^2}{8}$。

## 18.

标准 Cauchy 分布的密度为 $f(x)=\frac{1}{\pi(1+x^2)}$。对 $t>0$，由密度关于 $0$ 对称，

$$
\mathbb P(|X|>t)=2\,\mathbb P(X>t)=2\int_t^\infty\frac{dx}{\pi(1+x^2)}=\frac{2}{\pi}\Bigl[\arctan x\Bigr]_t^\infty=\frac{2}{\pi}\left(\frac{\pi}{2}-\arctan t\right)=1-\frac{2}{\pi}\arctan t.
$$

利用恒等式 $\arctan t+\arctan\frac1t=\frac{\pi}{2}$（$t>0$），可改写为 $\mathbb P(|X|>t)=\frac{2}{\pi}\arctan\frac1t$。当 $t\to\infty$ 时 $\arctan\frac1t\sim\frac1t$，故

$$
\mathbb P(|X|>t)\sim\frac{2}{\pi t},
$$

即 Cauchy 尾部按幂律（多项式速率 $t^{-1}$）衰减。对标准正态，利用题设允许使用的渐近式 $\mathbb P(Z>t)\sim\varphi(t)/t$，

$$
\mathbb P(|Z|>t)=2\,\mathbb P(Z>t)\sim\frac{2}{t}\cdot\frac{1}{\sqrt{2\pi}}\,e^{-t^2/2}=\sqrt{\frac{2}{\pi}}\,\frac{e^{-t^2/2}}{t},
$$

主导因子是 $e^{-t^2/2}$，属高斯型衰减。两者之比

$$
\frac{\mathbb P(|X|>t)}{\mathbb P(|Z|>t)}\sim\frac{2}{\pi t}\cdot\frac{t}{\sqrt{2/\pi}\,e^{-t^2/2}}=\sqrt{\frac{2}{\pi}}\,e^{t^2/2}\to+\infty\quad(t\to\infty),
$$

即正态尾部比 Cauchy 尾部轻了一个指数级。数值对照十分鲜明：$t=3$ 时 $\mathbb P(|X|>3)=\frac2\pi\arctan\frac13\approx0.2048$，而 $\mathbb P(|Z|>3)\approx0.0027$，相差约 $76$ 倍；$t=5$ 时 Cauchy 的双侧尾概率仍约 $0.1257$，而正态已降至约 $5.7\times10^{-7}$，相差五个数量级以上。

重尾的后果是实质性的。对非负随机变量有 $\mathbb E[Y]=\int_0^\infty\mathbb P(Y>t)\,dt$；由 $\mathbb P(|X|>t)\sim\frac{2}{\pi t}$，存在 $t_0$ 使当 $t\ge t_0$ 时 $\mathbb P(|X|>t)\ge\frac{1}{\pi t}$，于是

$$
\mathbb E|X|=\int_0^\infty\mathbb P(|X|>t)\,dt\ge\int_{t_0}^\infty\frac{dt}{\pi t}=+\infty,
$$

即 Cauchy 分布连有限的一阶矩都没有，更谈不上方差；大数定律与中心极限定理均不适用，独立同分布 Cauchy 变量的样本均值仍服从同一 Cauchy 分布，完全不随样本量集中。相比之下正态分布各阶矩有限，样本均值以 $\sqrt n$ 速率集中。在量化建模中用 Cauchy 型重尾分布描述异常冲击，能刻画“极端事件的发生概率远高于正态假设的预测”这一经验特征，但代价是基于均值、方差的经典风险工具全部失效，须改用分位数或尾部概率等矩无关的度量。

常见错误包括：双侧尾概率 $\mathbb P(|X|>t)$ 忘记乘以 $2$；直接对 $1-\frac2\pi\arctan t$ 作渐近分析——这是两个都趋于 $1$ 的量相减，主项相互抵消，应改写成 $\frac2\pi\arctan\frac1t$ 再用 $\arctan u\sim u$（$u\to0^+$）；以及默认 Cauchy 分布有有限方差，套用依赖二阶矩的结论（如通常的中心极限定理或 Chebyshev 不等式给出的集中速率）。
