# 第14章　随机变量收敛、大数定律与中心极限定理

第 10 章至第 13 章处理的对象是分布给定的随机变量：写出它的分布函数与密度，计算期望、方差、矩与协方差，讨论变量变换与条件期望。统计推断与随机模拟面对的却是另一类对象，即一列依赖于样本量 $n$ 的随机变量。样本均值 $\bar X_n$、样本方差 $S_n^2$、回归系数的最小二乘估计量、因子信息系数的样本值、Monte Carlo 定价的模拟误差，全都随 $n$ 变化。对它们提出的核心问题有三个：当 $n\to\infty$ 时 $X_n$ 是否趋于某个极限，趋于极限的速度有多快，极限的分布是什么。这三个问题分别由大数定律、收敛速率理论与中心极限定理回答，而它们共同的语言是收敛模式理论。

「$X_n$ 趋于 $X$」这句话在实分析中只有一个含义，在概率论中却至少有四个互不等价的含义。根本原因在于随机变量的双重身份。一方面它是样本空间 $\Omega$ 上的函数，可以对每个样本点 $\omega$ 讨论数列 $X_n(\omega)$ 是否收敛于 $X(\omega)$；另一方面它通过分布 $\mathbb P\circ X_n^{-1}$ 刻画可观测的统计规律，而实证工作中能获得的只有分布层面的信息。逐点身份给出几乎必然收敛，纯分布身份给出依分布收敛，介于两者之间的是只要求「偏差超过给定阈值的概率」趋于零的依概率收敛，而在均方意义下控制误差大小的是 $L^p$ 收敛。四种模式的强度不同、适用场合不同，混淆它们会直接导致错误结论：例如把依分布收敛当成依概率收敛使用，就无法解释为什么两个同分布的随机变量可以相距很远；又如把依概率收敛当成 $L^2$ 收敛使用，就会把「几乎从不出现但一旦出现就极大」的损失误判为风险已经消失。

极限定理之所以构成统计推断与随机模拟的理论基石，是因为几乎所有推断工具都可以还原为某个统计量的渐近性质：估计量的相合性就是依概率收敛，置信区间的宽度与检验的临界值来自中心极限定理给出的正态极限，Monte Carlo 方法的合法性来自大数定律，其误差量级 $O(n^{-1/2})$ 与误差分布来自中心极限定理，误差界的精确常数来自 Berry–Esseen 型不等式。量化研究中的对应关系同样清晰：因子 IC 的显著性检验依赖 IC 样本均值的渐近正态性，回测 Sharpe 比率的标准误依赖收益矩的联合渐近分布，波动率估计量的置信区间依赖样本二阶矩的渐近分布。更重要的是，实际使用的估计量往往不是单个样本矩，而是若干样本矩的连续函数；把已知的渐近分布组装成新的渐近分布，需要 Slutsky 定理与连续映射定理这类运算法则，这正是 14.2 节的主题，也是后续各节证明反复使用的技术引擎。

本章安排如下。14.1 节给出四种收敛模式的严格定义，建立它们之间的蕴含关系，并用反例说明每一条反向蕴含都不成立。14.2 节集中处理最弱也最常用的依分布收敛：Portmanteau 定理把它翻译成开集、闭集与测试函数三类等价语言，Lévy 连续性定理把它翻译成特征函数的逐点收敛，Slutsky 定理与连续映射定理给出极限运算的法则，例 14.3 用这些法则完整推导一个统计量的渐近分布。14.3 节至 14.6 节依次讨论大数定律、中心极限定理、收敛速率与 Berry–Esseen 界以及在量化研究中的应用。

## 14.1 四种收敛模式

本节固定概率空间 $(\Omega,\mathcal F,\mathbb P)$，并设 $X_1,X_2,\dots$ 与 $X$ 都是其上的随机变量；只有在定义 14.4 讨论依分布收敛时，才放宽这一要求，允许各 $X_n$ 定义在不同的概率空间上。记 $F_n(x)=\mathbb P(X_n\le x)$ 与 $F(x)=\mathbb P(X\le x)$ 为相应的分布函数，记 $C_F$ 为 $F$ 的连续点全体。

**定义 14.1（依概率收敛）**

若对每个 $\varepsilon>0$ 都有

$$
\lim_{n\to\infty}\mathbb P\left(|X_n-X|>\varepsilon\right)=0,
\tag{14.1}
$$

则称 $X_n$ 依概率收敛于 $X$，记作 $X_n\xrightarrow{\ \mathbb P\ }X$。

依概率收敛刻画的是「偏差超过任意给定阈值的概率」趋于零，它对单个样本点 $\omega$ 的行为不作任何承诺：对固定的 $\omega$，数列 $X_n(\omega)$ 完全可能不收敛，只要这样的 $\omega$ 所组成的集合在每个时刻 $n$ 的概率都很小，并且这些集合的位置可以随 $n$ 变动。定义中把 $>$ 换成 $\ge$ 不改变含义，因为对任意 $0<\varepsilon'<\varepsilon$ 有 $\mathbb P(|X_n-X|\ge\varepsilon)\le\mathbb P(|X_n-X|>\varepsilon')$。依概率收敛的极限在几乎必然相等的意义下唯一：若 $X_n\xrightarrow{\ \mathbb P\ }X$ 且 $X_n\xrightarrow{\ \mathbb P\ }Y$，则由三角不等式，对每个 $\varepsilon>0$，

$$
\mathbb P\left(|X-Y|>\varepsilon\right)\le\mathbb P\left(|X_n-X|>\frac{\varepsilon}{2}\right)+\mathbb P\left(|X_n-Y|>\frac{\varepsilon}{2}\right)\longrightarrow 0,
$$

故 $\mathbb P(|X-Y|>\varepsilon)=0$；再对 $\varepsilon=1/m$ 取可数并得 $\mathbb P(X\ne Y)=0$。

**定义 14.2（几乎必然收敛）**

若

$$
\mathbb P\left(\left\{\omega\in\Omega:\lim_{n\to\infty}X_n(\omega)=X(\omega)\right\}\right)=1,
\tag{14.2}
$$

则称 $X_n$ 几乎必然收敛于 $X$，记作 $X_n\to X$（几乎必然）。

几乎必然收敛是逐点收敛在「除去一个零测集」意义下的版本。它比依概率收敛强，因为它要求存在一个与 $n$ 无关的零测集 $N$，使得所有 $\omega\notin N$ 处的数列都收敛。用事件的极限可以把这一条件改写为可操作的形式：令 $A_n(\varepsilon)=\{|X_n-X|>\varepsilon\}$，则

$$
\left\{\omega:X_n(\omega)\not\to X(\omega)\right\}=\bigcup_{m\ge1}\limsup_{n\to\infty}A_n\left(\frac{1}{m}\right),
$$

其中 $\limsup_{n}A_n=\bigcap_{n\ge1}\bigcup_{m\ge n}A_m$ 表示「$A_n$ 中有无穷多个发生」的事件。因此 $X_n\to X$（几乎必然）等价于：对每个 $\varepsilon>0$，

$$
\lim_{n\to\infty}\mathbb P\left(\bigcup_{m\ge n}\{|X_m-X|>\varepsilon\}\right)=\mathbb P\left(\limsup_{n\to\infty}\{|X_n-X|>\varepsilon\}\right)=0.
$$

对照式（14.1）可以看出两种收敛的差别所在：依概率收敛只要求每个单独时刻的 $\mathbb P(A_n(\varepsilon))\to0$，几乎必然收敛要求整个尾部并集 $\bigcup_{m\ge n}A_m(\varepsilon)$ 的概率趋于零，也就是要求「坏点」不能无休止地在样本空间中变换位置。

**定义 14.3（$L^p$ 收敛）**

设 $p\ge1$，且 $X_n,X\in L^p$，即 $\mathbb E[|X_n|^p]<\infty$，$\mathbb E[|X|^p]<\infty$。若

$$
\lim_{n\to\infty}\mathbb E\left[|X_n-X|^{p}\right]=0,
\tag{14.3}
$$

则称 $X_n$ 在 $L^p$ 中收敛于 $X$，记作 $X_n\xrightarrow{L^p}X$。

$p=2$ 时称均方收敛，它等价于均方误差 $\mathbb E[(X_n-X)^2]$ 趋于零，因此是估计理论中最自然的收敛模式：均方误差同时惩罚偏差与方差，$L^2$ 收敛意味着估计量在二阶矩意义下把误差压到零。$L^p$ 收敛之间有嵌套关系：当 $p\ge q\ge1$ 时，$X_n\xrightarrow{L^p}X$ 蕴含 $X_n\xrightarrow{L^q}X$，这是对随机变量 $|X_n-X|^q$ 应用 Lyapunov 不等式（或由 Jensen 不等式得到的矩不等式）$\left(\mathbb E[|Y|^q]\right)^{1/q}\le\left(\mathbb E[|Y|^p]\right)^{1/p}$ 的直接结果。$L^p$ 收敛只在 $p\ge1$ 时定义，因为只有此时 $L^p$ 才是赋范空间，$\|Y\|_p=(\mathbb E[|Y|^p])^{1/p}$ 满足 Minkowski 不等式。

**定义 14.4（依分布收敛／弱收敛）**

若对 $F$ 的每个连续点 $x\in C_F$ 都有

$$
\lim_{n\to\infty}F_n(x)=F(x),
\tag{14.4}
$$

则称 $X_n$ 依分布收敛（或弱收敛）于 $X$，记作 $X_n\Rightarrow X$。

本章统一用 $\Rightarrow$ 表示依分布收敛，用「$\Longrightarrow$」或中文「蕴含」表示收敛模式之间的逻辑推出关系。定义 14.4 只涉及各随机变量的分布，而不涉及它们是否定义在同一概率空间上，也不涉及它们之间的相依结构，因此它比前三种模式都弱，同时也更灵活：允许 $X_n$ 与 $X$ 来自完全不同的概率空间。

为什么只要求在极限分布函数的连续点上收敛？因为在间断点上收敛可能失败，即使序列在直觉上「显然趋于极限」。取 $X_n\equiv 1/n$（退化随机变量）与 $X\equiv0$，则对每个 $x>0$，当 $n$ 充分大时 $F_n(x)=1=F(x)$；对每个 $x<0$，$F_n(x)=0=F(x)$。但在 $x=0$ 处 $F_n(0)=0$ 而 $F(0)=1$，收敛失败。这里的 $x=0$ 恰是 $F$ 的间断点。由于单调函数的间断点至多可数，$C_F$ 在 $\mathbb R$ 中稠密，式（14.4）已经包含了关于分布的全部信息。若要求在所有点上收敛，则连 $X_n\equiv1/n\to0$ 这样的基本事实都无法容纳，而这类「极限点上有原子」的情形在统计中极其常见，例如 $n$ 倍样本均值减去真值后的极限是正态分布，而许多检验统计量的极限是退化分布或带原子的分布。

注记　依分布收敛等价于对每个有界连续函数 $f$ 都有 $\mathbb E[f(X_n)]\to\mathbb E[f(X)]$，这是定理 14.6 的内容；也正因如此，依分布收敛常被称为分布（测度）的弱收敛，其中「弱」指测试对象是连续函数而非集合的示性函数。另一个重要特例是极限为常数的情形：$X_n\Rightarrow c$ 当且仅当 $X_n\xrightarrow{\ \mathbb P\ }c$，见定理 14.5 的第（iv）条。

**定理 14.5（收敛模式之间的关系）**

设 $X_1,X_2,\dots,X$ 是同一概率空间上的随机变量，$p\ge1$，且涉及的矩均有限。则

$$
\mathbb P\left(\lim_{n\to\infty}X_n=X\right)=1\ \Longrightarrow\ X_n\xrightarrow{\ \mathbb P\ }X\ \Longrightarrow\ X_n\Rightarrow X,
\qquad
X_n\xrightarrow{L^p}X\ \Longrightarrow\ X_n\xrightarrow{\ \mathbb P\ }X.
\tag{14.5}
$$

此外还有：

（iv）设 $c\in\mathbb R$ 为常数，则 $X_n\Rightarrow c$ 当且仅当 $X_n\xrightarrow{\ \mathbb P\ }c$。

式（14.5）中的所有反向蕴含均不成立，$L^p$ 收敛与几乎必然收敛之间也没有蕴含关系，具体反例见定理之后。

**证明**

第一步，证明几乎必然收敛蕴含依概率收敛。设 $X_n\to X$（几乎必然）。固定 $\varepsilon>0$，令 $A_n=\{|X_n-X|>\varepsilon\}$，$B_n=\bigcup_{m\ge n}A_m$。则 $B_1\supseteq B_2\supseteq\cdots$，且 $\bigcap_{n\ge1}B_n=\limsup_{n}A_n$。记 $N=\{\omega:X_n(\omega)\not\to X(\omega)\}$，则 $\mathbb P(N)=0$。若 $\omega\notin N$，则存在 $n_0$ 使得当 $n\ge n_0$ 时 $|X_n(\omega)-X(\omega)|\le\varepsilon$，即 $\omega\notin A_n$ 对所有 $n\ge n_0$ 成立，从而 $\omega\notin\bigcap_{n}B_n$。这说明 $\bigcap_nB_n\subseteq N$，故 $\mathbb P(\bigcap_nB_n)=0$。由测度的上连续性（递减事件列的概率趋于交集的概率），$\mathbb P(B_n)\downarrow0$。又 $A_n\subseteq B_n$，所以

$$
0\le\mathbb P\left(|X_n-X|>\varepsilon\right)=\mathbb P(A_n)\le\mathbb P(B_n)\longrightarrow 0,
$$

即 $X_n\xrightarrow{\ \mathbb P\ }X$。

第二步，证明 $L^p$ 收敛蕴含依概率收敛。设 $\mathbb E[|X_n-X|^p]\to0$。对 $\varepsilon>0$，由 Markov 不等式作用于非负随机变量 $|X_n-X|^p$，

$$
\mathbb P\left(|X_n-X|>\varepsilon\right)=\mathbb P\left(|X_n-X|^{p}>\varepsilon^{p}\right)\le\frac{\mathbb E\left[|X_n-X|^{p}\right]}{\varepsilon^{p}}\longrightarrow 0.
$$

这一步同时给出了收敛速率：若 $\mathbb E[|X_n-X|^p]=O(n^{-\alpha})$，则 $\mathbb P(|X_n-X|>\varepsilon)=O(n^{-\alpha})$，概率意义下的收敛速度与矩意义下一样快，常数被 $\varepsilon^{-p}$ 放大。

第三步，证明依概率收敛蕴含依分布收敛。设 $X_n\xrightarrow{\ \mathbb P\ }X$，取 $x\in C_F$ 与 $\delta>0$。由事件包含关系

$$
\{X_n\le x\}\subseteq\{X\le x+\delta\}\cup\{|X_n-X|>\delta\},
$$

因为若 $X_n(\omega)\le x$ 且 $|X_n(\omega)-X(\omega)|\le\delta$，则 $X(\omega)\le x+\delta$。取概率得

$$
F_n(x)\le F(x+\delta)+\mathbb P\left(|X_n-X|>\delta\right).
$$

同理，由 $\{X\le x-\delta\}\subseteq\{X_n\le x\}\cup\{|X_n-X|>\delta\}$ 得 $F(x-\delta)\le F_n(x)+\mathbb P\left(|X_n-X|>\delta\right)$，移项即

$$
F_n(x)\ge F(x-\delta)-\mathbb P\left(|X_n-X|>\delta\right).
$$

由于 $F$ 单调，其间断点至多可数，故可取一列 $\delta_m\downarrow0$ 使 $x\pm\delta_m$ 都是 $F$ 的连续点。对上述两式分别取上极限与下极限，并令 $m\to\infty$，得

$$
F(x)\le\liminf_{n\to\infty}F_n(x)\le\limsup_{n\to\infty}F_n(x)\le F(x),
$$

其中用到了 $x$ 是 $F$ 的连续点，故 $F(x-\delta_m)\to F(x)$ 且 $F(x+\delta_m)\to F(x)$。于是 $\lim_nF_n(x)=F(x)$，即 $X_n\Rightarrow X$。

第四步，证明第（iv）条。若 $X_n\xrightarrow{\ \mathbb P\ }c$，由第三步得 $X_n\Rightarrow c$。反之，设 $X_n\Rightarrow c$，此时极限分布函数为 $F(x)=\mathbf 1_{[c,\infty)}(x)$，它在 $x\ne c$ 处连续。对 $\varepsilon>0$，$c+\varepsilon$ 与 $c-\varepsilon$ 都是连续点，故

$$
\mathbb P\left(X_n>c+\varepsilon\right)=1-F_n(c+\varepsilon)\longrightarrow 1-F(c+\varepsilon)=0,
$$

$$
\mathbb P\left(X_n\le c-\varepsilon\right)=F_n(c-\varepsilon)\longrightarrow F(c-\varepsilon)=0.
$$

两式相加得 $\mathbb P(|X_n-c|>\varepsilon)\to0$，即 $X_n\xrightarrow{\ \mathbb P\ }c$。

□

以下说明式（14.5）中的每一条反向蕴含都不成立，同时说明几乎必然收敛与 $L^p$ 收敛互不蕴含。

反例一（依概率收敛与 $L^1$ 收敛都不蕴含几乎必然收敛：取值逃逸到无穷）。取 $\Omega=[0,1]$，$\mathcal F=\mathcal B([0,1])$，$\mathbb P$ 为 Lebesgue 测度。对每个 $k\ge1$，把 $[0,1]$ 等分为 $k^2$ 个区间 $A_{k,j}=\left[\frac{j-1}{k^2},\frac{j}{k^2}\right)$，$j=1,\dots,k^2$（最后一个区间的右端点取为 $1$）；按 $k$ 递增、同一 $k$ 内 $j$ 递增的顺序把这些区间排成一列 $A_1,A_2,\dots$，并令对应的随机变量为 $X_n=k\,\mathbf 1_{A_{k,j}}$，其中 $n$ 是 $A_{k,j}$ 在该列中的位置。因为 $n\to\infty$ 蕴含 $k\to\infty$，对任意 $\varepsilon>0$ 有

$$
\mathbb P\left(|X_n|>\varepsilon\right)\le\mathbb P(X_n\ne0)=\frac{1}{k^{2}}\longrightarrow 0,
\qquad
\mathbb E\left[|X_n|\right]=k\cdot\frac{1}{k^{2}}=\frac{1}{k}\longrightarrow 0,
$$

所以 $X_n\xrightarrow{\ \mathbb P\ }0$ 且 $X_n\xrightarrow{L^1}0$。但对每个 $\omega\in[0,1]$ 与每个 $k$，第 $k$ 组的 $k^2$ 个区间构成 $[0,1]$ 的划分，故恰有一个 $j$ 使 $\omega\in A_{k,j}$；于是 $X_n(\omega)$ 在无穷多个 $n$ 处取值 $k$，而 $k\to\infty$。也就是说，每个样本点都被无穷多次击中，且击中时的函数值逃逸到无穷，数列 $\{X_n(\omega)\}$ 对任何 $\omega$ 都发散，$\mathbb P(\lim_nX_n=0)=0$。这一反例同时说明：$L^p$ 收敛与依概率收敛都不蕴含几乎必然收敛，坏点集合可以在样本空间中不断移动，只要每处被击中的概率趋于零。

反例二（几乎必然收敛与依概率收敛都不蕴含 $L^p$ 收敛）。在同一概率空间上取 $X_n=n\,\mathbf 1_{(0,1/n]}$。对每个 $\omega\in(0,1]$，当 $n>1/\omega$ 时 $X_n(\omega)=0$，故 $X_n(\omega)\to0$；例外集只有 $\{0\}$，其测度为零，因此 $X_n\to0$（几乎必然）。又 $\mathbb P(|X_n|>\varepsilon)\le1/n\to0$，故 $X_n\xrightarrow{\ \mathbb P\ }0$。但 $\mathbb E[|X_n|]=n\cdot\frac1n=1$ 不趋于零，$\mathbb E[X_n^2]=n^2\cdot\frac1n=n\to\infty$，所以 $X_n$ 在任何 $L^p$（$p\ge1$）中都不收敛于 $0$。这里发生的是「概率越来越小、幅度越来越大」的相互抵消，$L^p$ 收敛失败的技术原因是 $\{|X_n|^p\}$ 不是一致可积的。

反例三（依分布收敛不蕴含依概率收敛）。设 $Z\sim N(0,1)$，令常数列 $X_n\equiv Z$（对所有 $n$），并令 $Y=-Z$。因为 $Y\sim N(0,1)$，$F_{X_n}$ 与 $F_Y$ 是同一个分布函数，于是 $F_{X_n}(x)\to F_Y(x)$ 在每个 $x$ 处成立（甚至无需限制在连续点），即 $X_n\Rightarrow Y$。但

$$
\mathbb P\left(|X_n-Y|>\varepsilon\right)=\mathbb P\left(|2Z|>\varepsilon\right)=2\left(1-\Phi\left(\frac{\varepsilon}{2}\right)\right)>0
$$

是与 $n$ 无关的正常数，故 $X_n$ 不依概率收敛于 $Y$。若把 $Z$ 换成 $X\sim N(\mu,\sigma^2)$ 并取 $Y=2\mu-X$（关于 $\mu$ 的反射，等价于先平移再取负再平移回来），结论完全相同。这一反例的实质是：常数列 $X_n\equiv X$ 的分布不随 $n$ 变化，因而它依分布收敛于每一个与 $X$ 同分布的随机变量；而依概率收敛还要求两个变量在同一概率空间上彼此靠近，这是分布层面的信息无法表达的。因此依分布收敛的极限只在同分布的意义下唯一。定理 14.5 的第（iv）条给出了唯一有意义的例外：当极限是常数时，同分布即意味着相等，依分布收敛确实等价于依概率收敛，这正是下一节 Slutsky 定理可以合法使用的前提。

注记（依概率收敛必有几乎必然收敛的子列）　若 $X_n\xrightarrow{\ \mathbb P\ }X$，则存在子列 $\{n_k\}$ 使 $X_{n_k}\to X$（几乎必然）。

**证明**

依次选取 $n_1<n_2<\cdots$，使 $\mathbb P\left(|X_{n_k}-X|>2^{-k}\right)<2^{-k}$；由依概率收敛的定义，这样的选取总是可行的。令 $B_k=\bigcup_{m\ge k}\{|X_{n_m}-X|>2^{-m}\}$，则 $B_1\supseteq B_2\supseteq\cdots$，且由次可加性

$$
\mathbb P(B_k)\le\sum_{m\ge k}\mathbb P\left(|X_{n_m}-X|>2^{-m}\right)\le\sum_{m\ge k}2^{-m}=2^{1-k}\longrightarrow 0.
$$

由测度的上连续性，$\mathbb P\left(\bigcap_{k\ge1}B_k\right)=\lim_{k}\mathbb P(B_k)=0$。若 $\omega\notin\bigcap_kB_k$，则存在 $k$ 使 $\omega\notin B_k$，从而对所有 $m\ge k$ 都有 $|X_{n_m}(\omega)-X(\omega)|\le2^{-m}$，于是 $X_{n_m}(\omega)\to X(\omega)$。因此在概率为一的集合上子列收敛。

□

这一注记精确地刻画了依概率收敛与几乎必然收敛的距离：前者允许坏点在样本空间中移动，但只要移动得足够「稀疏」，总能挑出一个不再移动的子列。反例一中的序列也有几乎必然收敛于零的子列（例如只保留每组第一个区间），但整个序列在任何一点都不收敛。

**例 14.1**

在 $\Omega=[0,1]$（配备 Borel $\sigma$ 代数与 Lebesgue 测度）上构造一列随机变量 $\{X_n\}$，使它依概率收敛于 $0$ 但不几乎必然收敛于 $0$；并验证它在 $L^2$ 与依分布意义下也收敛于 $0$。

**解**

构造。对每个正整数 $n$，把它唯一地写成 $n=\frac{k(k-1)}{2}+j$，其中 $k\ge1$，$1\le j\le k$：$k=1$ 对应 $n=1$；$k=2$ 对应 $n=2,3$；$k=3$ 对应 $n=4,5,6$；一般地，第 $k$ 组含 $k$ 个连续的 $n$。定义

$$
A_n=\left[\frac{j-1}{k},\frac{j}{k}\right),
\qquad
X_n=\mathbf 1_{A_n},
$$

其中当 $j=k$ 时把 $A_n$ 的右端点改为 $1$。于是第 $k$ 组由 $k$ 个长度均为 $1/k$ 的区间组成，它们构成 $[0,1]$ 的一个划分，从左到右依次滑动；随着 $k$ 增大，区块越来越短，但每一组都重新扫过整个样本空间。

验证依概率收敛。对任意 $\varepsilon>0$，因为 $X_n$ 只取 $0$ 与 $1$ 两个值，当 $\varepsilon\ge1$ 时 $\mathbb P(|X_n|>\varepsilon)=0$；当 $0<\varepsilon<1$ 时 $\{|X_n|>\varepsilon\}=A_n$。而 $\mathbb P(A_n)=1/k$，且 $n\to\infty$ 等价于 $k\to\infty$，故

$$
\lim_{n\to\infty}\mathbb P\left(|X_n-0|>\varepsilon\right)=\lim_{k\to\infty}\frac{1}{k}=0.
$$

所以 $X_n\xrightarrow{\ \mathbb P\ }0$。

验证几乎必然收敛失败。固定 $\omega\in[0,1]$ 与 $k\ge1$。第 $k$ 组的 $k$ 个区间 $A_{k,1},\dots,A_{k,k}$ 构成 $[0,1]$ 的划分，故恰有一个 $j$ 使 $\omega\in A_{k,j}$，也就是在第 $k$ 组对应的那些 $n$ 中恰有一个使 $X_n(\omega)=1$，其余 $k-1$ 个使 $X_n(\omega)=0$。因为 $k$ 可取任意大的值，集合 $\{n:X_n(\omega)=1\}$ 是无穷集，集合 $\{n:X_n(\omega)=0\}$ 同样是无穷集，故数列 $\{X_n(\omega)\}$ 在 $0$ 与 $1$ 之间无穷次往返，对每个 $\omega\in[0,1]$ 都发散。于是

$$
\mathbb P\left(\left\{\omega:\lim_{n\to\infty}X_n(\omega)=0\right\}\right)=0,
$$

几乎必然收敛不成立，而且失败得极为彻底：例外集不是零测集而是整个样本空间。这一现象与依概率收敛并不矛盾，因为「使 $X_n(\omega)=1$ 的那些 $\omega$」构成的集合 $A_n$ 随 $n$ 不断滑动，每个固定时刻它的测度只有 $1/k$。

验证 $L^2$ 收敛与依分布收敛。$\mathbb E[X_n^2]=\mathbb E[X_n]=\mathbb P(A_n)=1/k\to0$，故 $X_n\xrightarrow{L^2}0$，这也解释了 $L^2$ 收敛为何不蕴含几乎必然收敛。此时 $X_n$ 的分布函数为

$$
F_n(x)=
\begin{cases}
1-\dfrac{1}{k}, & x\in[0,1),\\[4pt]
1, & x\ge 1,\\[2pt]
0, & x<0,
\end{cases}
$$

极限 $X\equiv0$ 的分布函数为 $F(x)=\mathbf 1_{[0,\infty)}(x)$。当 $x<0$ 时 $F_n(x)=0=F(x)$；当 $x>0$ 时 $F_n(x)=1-1/k\to1=F(x)$；在唯一的间断点 $x=0$ 处 $F_n(0)=1-1/k\to1=F(0)$，此处恰好也收敛，但定义 14.4 并不要求这一点。故 $X_n\Rightarrow0$。

抽取几乎必然收敛的子列。取每组第一个区间对应的指标 $n_k=\frac{k(k-1)}{2}+1$，则 $X_{n_k}=\mathbf 1_{[0,1/k)}$。对每个 $\omega\in(0,1]$，当 $k>1/\omega$ 时 $X_{n_k}(\omega)=0$，故 $X_{n_k}\to0$ 在 $(0,1]$ 上逐点成立，例外集 $\{0\}$ 为零测集，即子列几乎必然收敛。这印证了前面的注记：依概率收敛的序列必有几乎必然收敛的子列，但子列的选取依赖序列本身，无法保证原序列收敛。

**例 14.2**

在 $\Omega=[0,1]$（Lebesgue 测度）上，对参数 $\alpha\in\mathbb R$ 定义 $X_n^{(\alpha)}(\omega)=n^{\alpha}\mathbf 1_{(0,1/n]}(\omega)$。讨论 $\alpha$ 取何值时 $X_n^{(\alpha)}$ 几乎必然、依概率、在 $L^2$ 中收敛于 $0$，并解释这一现象在风险度量与模拟误差中的含义。

**解**

几乎必然收敛。对每个 $\omega\in(0,1]$，取正整数 $N>\frac1\omega$，则当 $n\ge N$ 时 $\frac1n<\omega$，从而 $\omega\notin(0,1/n]$，$X_n^{(\alpha)}(\omega)=0$。因此 $X_n^{(\alpha)}(\omega)\to0$ 对所有 $\omega\in(0,1]$ 成立，而 $\mathbb P((0,1])=1$，故 $X_n^{(\alpha)}\to0$（几乎必然），且与 $\alpha$ 完全无关。

依概率收敛。对 $\varepsilon>0$，若 $n^{\alpha}\le\varepsilon$，则 $\mathbb P(|X_n^{(\alpha)}|>\varepsilon)=0$；若 $n^{\alpha}>\varepsilon$，则 $\{|X_n^{(\alpha)}|>\varepsilon\}=(0,1/n]$。两种情形都给出

$$
\mathbb P\left(|X_n^{(\alpha)}|>\varepsilon\right)\le\frac{1}{n}\longrightarrow 0,
$$

故对每个 $\alpha\in\mathbb R$ 都有 $X_n^{(\alpha)}\xrightarrow{\ \mathbb P\ }0$，同样与 $\alpha$ 无关。

$L^2$ 收敛。直接计算二阶矩：

$$
\mathbb E\left[\left(X_n^{(\alpha)}\right)^{2}\right]=\int_0^{1/n}n^{2\alpha}\,\mathrm d\omega=n^{2\alpha}\cdot\frac{1}{n}=n^{2\alpha-1}.
$$

当 $\alpha<\frac12$ 时 $2\alpha-1<0$，上式趋于零，$X_n^{(\alpha)}\xrightarrow{L^2}0$；当 $\alpha=\frac12$ 时上式恒等于 $1$，$L^2$ 收敛失败；当 $\alpha>\frac12$ 时上式趋于无穷，二阶矩甚至无界。类似地，$\mathbb E[|X_n^{(\alpha)}|]=n^{\alpha-1}$，故 $L^1$ 收敛当且仅当 $\alpha<1$。

综合以上三段可得：$\alpha<\frac12$ 时三种收敛全部成立；$\alpha\ge\frac12$ 时几乎必然收敛与依概率收敛仍然成立，但 $L^2$ 收敛失败。分界点 $\alpha=\frac12$ 来自「误差幅度 $n^{\alpha}$」与「误差出现概率 $1/n$」的乘积平衡：平方误差的期望是 $n^{2\alpha-1}$，只要幅度增长的指数超过概率衰减指数的一半，二阶矩就会失控。这与反例二是同一机制，但反例二取 $\alpha=1$，这里把临界指数显式地算了出来。

统计与量化含义。把 $X_n^{(\alpha)}$ 解释为某个估计量的误差，或某个策略的单期损失：它以概率 $1/n$ 出现幅度 $n^{\alpha}$ 的极端偏差，其余时间偏差为零。在回测样本路径上，这类事件随 $n$ 增大而越来越罕见，从依概率的意义看风险「消失」了；但当 $\alpha\ge\frac12$ 时，均方误差并不减小，$\alpha=\frac12$ 时它稳定在 $1$，$\alpha>\frac12$ 时它发散。这说明以样本频率衡量的安全性与以矩衡量的安全性可以给出相反结论，肥尾风险的样本不可见性正源于此。风险管理中若只依赖相合性（依概率收敛）论证，就会漏掉这一类模型；只有附加矩条件或一致可积性条件，样本结论才能推广到期望层面。同样的机制也解释了为什么中心极限定理采用 $\sqrt n$ 尺度：$\sqrt n(\bar X_n-\mu)$ 的二阶矩保持为 $\sigma^2$ 而不趋于零或发散，$\sqrt n$ 正是使涨落既不消失也不爆炸的唯一正确放大倍数。

对照计算：$L^2$ 收敛给出依概率收敛的显式速率。设 $Y_1,\dots,Y_n$ 独立同分布，$\mathbb E[Y_i]=\mu$，$\operatorname{Var}(Y_i)=\sigma^2<\infty$，$\bar Y_n=\frac1n\sum_{i=1}^nY_i$。由独立性，$\operatorname{Cov}(Y_i-\mu,Y_j-\mu)=0$（$i\ne j$），故

$$
\mathbb E\left[(\bar Y_n-\mu)^{2}\right]=\frac{1}{n^{2}}\sum_{i=1}^{n}\mathbb E\left[(Y_i-\mu)^{2}\right]=\frac{\sigma^{2}}{n}\longrightarrow 0,
$$

即 $\bar Y_n\xrightarrow{L^2}\mu$。再由 Markov 不等式（即 Chebyshev 不等式）得

$$
\mathbb P\left(|\bar Y_n-\mu|>\varepsilon\right)\le\frac{\mathbb E\left[(\bar Y_n-\mu)^{2}\right]}{\varepsilon^{2}}=\frac{\sigma^{2}}{n\varepsilon^{2}}.
$$

这一显式界说明了三件事：其一，$L^2$ 收敛是带速率的依概率收敛，速率可直接从二阶矩读出；其二，要使偏差超过 $\varepsilon$ 的概率小于给定水平 $\eta$，只需 $n\ge\sigma^2/(\varepsilon^2\eta)$，样本量需求与 $\sigma^2$ 成正比、与 $\varepsilon^2$ 成反比，这就是 Monte Carlo 模拟中「精度提高一倍、样本量需增为四倍」的来源；其三，14.3 节的大数定律将把上述结论中的 $\mathbb E[Y_i^2]<\infty$ 减弱为 $\mathbb E[|Y_i|]<\infty$，代价是失去这样简洁的速率界。

## 14.2 弱收敛的刻画与运算法则

依分布收敛只涉及分布，直接按定义 14.4 验证往往不便：需要逐个检查极限分布函数的连续点。本节给出三类等价刻画与一套运算法则，它们是把抽象收敛概念转化为可用工具的关键。为叙述方便，本节把随机变量与它在 $\mathbb R$ 上的分布（概率测度）等同看待，记 $\mu_n=\mathbb P\circ X_n^{-1}$，$\mu=\mathbb P\circ X^{-1}$，并允许各 $\mu_n$ 来自不同的概率空间。

**定理 14.6（Portmanteau 定理）**

设 $X_1,X_2,\dots,X$ 为随机变量，$\mu_n,\mu$ 为相应的分布，$F_n,F$ 为相应的分布函数。则下列五条互相等价：

（i）$X_n\Rightarrow X$，即 $F_n(x)\to F(x)$ 对 $F$ 的每个连续点成立；

（ii）对 $\mathbb R$ 的每个闭集 $C$，$\limsup_{n\to\infty}\mathbb P(X_n\in C)\le\mathbb P(X\in C)$；

（iii）对 $\mathbb R$ 的每个开集 $G$，$\liminf_{n\to\infty}\mathbb P(X_n\in G)\ge\mathbb P(X\in G)$；

（iv）对每个有界连续函数 $f:\mathbb R\to\mathbb R$，$\mathbb E[f(X_n)]\to\mathbb E[f(X)]$；

（v）对每个有界一致连续函数 $f:\mathbb R\to\mathbb R$，$\mathbb E[f(X_n)]\to\mathbb E[f(X)]$。

**证明**

（ii）与（iii）等价：对任意 Borel 集 $B$ 有 $\mathbb P(X_n\in B)=1-\mathbb P(X_n\in B^{c})$，闭集的补集是开集，开集的补集是闭集，把不等式中的 $\limsup$ 换成 $\liminf$ 只需在恒等式两边取负号并交换上下极限，故两条陈述逐字互推。

（iv）蕴含（v）：有界一致连续函数当然有界连续，条件集合变小，结论不变。

（v）蕴含（i）。取 $x\in C_F$ 与 $\delta>0$。定义两个有界一致连续函数

$$
h_\delta(t)=
\begin{cases}
1, & t\le x,\\
1-\dfrac{t-x}{\delta}, & x<t<x+\delta,\\
0, & t\ge x+\delta,
\end{cases}
\qquad
k_\delta(t)=
\begin{cases}
1, & t\le x-\delta,\\
1-\dfrac{x-t}{\delta}, & x-\delta<t<x,\\
0, & t\ge x.
\end{cases}
$$

两者都是 Lipschitz 常数为 $1/\delta$ 的 Lipschitz 函数，故有界一致连续，且满足 $k_\delta\le\mathbf 1_{(-\infty,x]}\le h_\delta$。于是对每个 $n$，

$$
\mathbb E\left[k_\delta(X_n)\right]\le F_n(x)\le\mathbb E\left[h_\delta(X_n)\right].
$$

由条件（v），两端的期望都收敛：$\mathbb E[k_\delta(X_n)]\to\mathbb E[k_\delta(X)]$，$\mathbb E[h_\delta(X_n)]\to\mathbb E[h_\delta(X)]$。取下极限与上极限得

$$
\mathbb E\left[k_\delta(X)\right]\ \le\ \liminf_{n\to\infty}F_n(x)\ \le\ \limsup_{n\to\infty}F_n(x)\ \le\ \mathbb E\left[h_\delta(X)\right].
\tag{14.6}
$$

现在令 $\delta\downarrow0$。因为 $k_\delta\uparrow\mathbf 1_{(-\infty,x)}$（在 $t<x$ 处趋于 $1$，在 $t\ge x$ 处恒为 $0$），由单调收敛定理，$\mathbb E[k_\delta(X)]\uparrow\mathbb P(X<x)=F(x^-)$；又 $x\in C_F$，故 $F(x^-)=F(x)$，式（14.6）左端趋于 $F(x)$。同理 $h_\delta\downarrow\mathbf 1_{(-\infty,x]}$，由控制收敛定理 $\mathbb E[h_\delta(X)]\downarrow F(x)$。夹逼得 $\lim_nF_n(x)=F(x)$，即（i）成立。

（i）蕴含（iv）。设 $f$ 有界连续，$|f|\le M$，取 $\varepsilon>0$。第一步，控制尾部。因为 $F$ 至多有可数个间断点，可选 $F$ 的连续点 $a<b$ 使 $F(a)<\varepsilon$ 且 $1-F(b)<\varepsilon$；由（i），$F_n(a)\to F(a)$，$F_n(b)\to F(b)$，故存在 $n_0$，当 $n\ge n_0$ 时 $\mathbb P(X_n\notin[a,b])<3\varepsilon$，同时 $\mathbb P(X\notin[a,b])<2\varepsilon$。第二步，在 $[a,b]$ 上作阶梯逼近。因为 $f$ 在紧集 $[a,b]$ 上一致连续，可选分点 $a=x_0<x_1<\cdots<x_m=b$（每个 $x_i$ 都是 $F$ 的连续点，这可以通过在原有分点附近微调实现，因为连续点在 $\mathbb R$ 中稠密），使 $f$ 在每个 $[x_{i-1},x_i]$ 上的振幅小于 $\varepsilon$。定义阶梯函数

$$
s(t)=\sum_{i=1}^{m}c_i\,\mathbf 1_{[x_{i-1},x_i)}(t)+f(b)\,\mathbf 1_{[b,\infty)}(t),
\qquad
c_i=\inf_{t\in[x_{i-1},x_i]}f(t).
$$

在 $[a,b)$ 上有 $0\le f(t)-s(t)\le\varepsilon$，且 $|s|\le M$。第三步，验证 $\mathbb E[s(X_n)]\to\mathbb E[s(X)]$。由线性性只需对每个 $i$ 证明 $\mathbb P(X_n\in[x_{i-1},x_i))\to\mathbb P(X\in[x_{i-1},x_i))$。因为 $x_{i-1}$ 与 $x_i$ 都是 $F$ 的连续点，$F_n(x_{i-1})\to F(x_{i-1})$ 且 $F_n(x_i)\to F(x_i)$；对左端点还需要左极限的信息，先证明一个一般事实：若 $y\in C_F$，则 $F_n(y^-)\to F(y^-)=F(y)$。事实上，由 $F_n(y^-)\le F_n(y)$ 取上极限得 $\limsup_nF_n(y^-)\le F(y)$；另一方面对任意 $z<y$ 且 $z\in C_F$，有 $F_n(z)\le F_n(y^-)$，取极限得 $F(z)\le\liminf_nF_n(y^-)$，再令 $z\uparrow y$ 通过 $C_F$ 中的点即得 $F(y^-)=F(y)\le\liminf_nF_n(y^-)$。于是

$$
\mathbb P\left(X_n\in[x_{i-1},x_i)\right)=F_n(x_i^-)-F_n(x_{i-1}^-)\longrightarrow F(x_i)-F(x_{i-1})=\mathbb P\left(X\in[x_{i-1},x_i)\right).
$$

第四步，合并估计。对 $n\ge n_0$，

$$
\begin{aligned}
\left|\mathbb E[f(X_n)]-\mathbb E[f(X)]\right|
&\le\left|\mathbb E[f(X_n)]-\mathbb E[s(X_n)]\right|+\left|\mathbb E[s(X_n)]-\mathbb E[s(X)]\right|+\left|\mathbb E[s(X)]-\mathbb E[f(X)]\right|\\
&\le\left(\varepsilon+2M\cdot3\varepsilon\right)+\left|\mathbb E[s(X_n)]-\mathbb E[s(X)]\right|+\left(\varepsilon+2M\cdot2\varepsilon\right).
\end{aligned}
$$

中间一项当 $n$ 充分大时小于 $\varepsilon$，故上极限不超过 $(10M+3)\varepsilon$。由 $\varepsilon$ 的任意性得 $\mathbb E[f(X_n)]\to\mathbb E[f(X)]$。

（i）蕴含（ii）。设 $C$ 为闭集，$\delta>0$。定义 $d(t,C)=\inf\{|t-s|:s\in C\}$（$C$ 非空时该下确界可达，$C=\varnothing$ 时令 $d\equiv+\infty$，结论平凡），并令

$$
f_\delta(t)=\max\left\{0,\,1-\frac{d(t,C)}{\delta}\right\}.
$$

$f_\delta$ 是 Lipschitz 常数为 $1/\delta$ 的有界连续函数，取值于 $[0,1]$，在 $C$ 上等于 $1$，在 $d(t,C)\ge\delta$ 处等于 $0$，因此 $\mathbf 1_C\le f_\delta$。由已证的（i）$\Rightarrow$（iv），

$$
\limsup_{n\to\infty}\mathbb P(X_n\in C)\le\lim_{n\to\infty}\mathbb E\left[f_\delta(X_n)\right]=\mathbb E\left[f_\delta(X)\right].
$$

再令 $\delta\downarrow0$：因为 $C$ 闭，$d(t,C)=0$ 当且仅当 $t\in C$，故 $f_\delta(t)\downarrow\mathbf 1_C(t)$ 对每个 $t$ 成立；由控制收敛定理（$0\le f_\delta\le1$）得 $\mathbb E[f_\delta(X)]\downarrow\mathbb P(X\in C)$。于是 $\limsup_n\mathbb P(X_n\in C)\le\mathbb P(X\in C)$。

（ii）蕴含（i）。取 $x\in\mathbb R$。集合 $[x,\infty)$ 是闭集，由（ii）得 $\limsup_n\left(1-F_n(x^-)\right)\le1-F(x^-)$，即 $\liminf_nF_n(x^-)\ge F(x^-)$。集合 $(-\infty,x]$ 也是闭集，由（ii）得 $\limsup_nF_n(x)\le F(x)$。若 $x\in C_F$，则 $F(x^-)=F(x)$，且 $F_n(x^-)\le F_n(x)$，故

$$
F(x)=F(x^-)\le\liminf_{n\to\infty}F_n(x^-)\le\liminf_{n\to\infty}F_n(x)\le\limsup_{n\to\infty}F_n(x)\le F(x),
$$

夹逼得 $F_n(x)\to F(x)$，即（i）成立。

至此五条陈述两两等价。

□

注记（弱收敛序列必为紧序列）　若 $X_n\Rightarrow X$，则分布列 $\{\mu_n\}$ 是紧的（tight）：对每个 $\varepsilon>0$ 存在紧集 $K\subset\mathbb R$ 使 $\sup_n\mathbb P(X_n\notin K)<\varepsilon$。证明如下。取 $F$ 的连续点 $a<b$ 使 $F(a)<\varepsilon/4$ 且 $1-F(b)<\varepsilon/4$，令闭集 $C=(-\infty,a]\cup[b,\infty)$，则由定理 14.6 的（ii），$\limsup_n\mathbb P(X_n\in C)\le\mathbb P(X\in C)<\varepsilon/2$，故存在 $n_0$ 使 $n\ge n_0$ 时 $\mathbb P(X_n\in C)<\varepsilon$；前 $n_0-1$ 个分布各自都是紧的（每个 $\mu_i$ 是概率测度，可取紧集 $K_i$ 使 $\mu_i(K_i^c)<\varepsilon$），取 $K=\bigcup_{i<n_0}K_i\cup[a,b]$ 的闭包即可。在 $\mathbb R$ 中紧集就是有界闭集，因此紧性就是「概率质量不会逃逸到无穷」的严格表述。

定理 14.6 的实用价值在于：验证弱收敛时可以自由选取最方便的语言。要证明某个统计量收敛到正态分布，用测试函数语言（iv）比逐个检查分布函数的连续点容易得多；要证明质量没有逃逸，用闭集语言（ii）最直接；而（v）中只需检验有界一致连续函数，这一弱化在下一节的 Lévy 定理与命题 14.8 的证明中都会被用到。

**定理 14.7（Lévy 连续性定理）**

设 $X_1,X_2,\dots$ 为随机变量，$\varphi_n(t)=\mathbb E\left[e^{\mathrm i tX_n}\right]$ 为 $X_n$ 的特征函数。

（i）若对每个 $t\in\mathbb R$，

$$
\varphi_n(t)=\mathbb E\left[e^{\mathrm i tX_n}\right]\longrightarrow\varphi(t),
\qquad t\in\mathbb R,
\tag{14.7}
$$

且极限函数 $\varphi$ 在 $t=0$ 处连续，则 $\varphi(0)=1$，且存在随机变量 $X$ 使 $\varphi=\varphi_X$（即 $\varphi$ 是某个概率分布的特征函数）并且 $X_n\Rightarrow X$。

（ii）反之，若 $X_n\Rightarrow X$，则式（14.7）对每个 $t\in\mathbb R$ 成立，其中 $\varphi=\varphi_X$；且这一收敛在 $\mathbb R$ 的每个有界区间上是一致的。

**证明思路与所依赖的定理**

本节给出完整证明思路并明确指出所依赖的两个较深层结果，定理本身的严格证明需要测度论中的 Helly 选择定理与紧性论证，属于本章范围之外。

第（ii）条是定理 14.6 的直接推论：$t$ 固定时 $f(x)=\cos(tx)$ 与 $g(x)=\sin(tx)$ 都是有界连续函数，由（iv）得 $\mathbb E[\cos(tX_n)]\to\mathbb E[\cos(tX)]$ 与 $\mathbb E[\sin(tX_n)]\to\mathbb E[\sin(tX)]$，合并即得 $\varphi_n(t)\to\varphi_X(t)$；一致性由 $\{X_n\}$ 的紧性与 $e^{\mathrm i tx}$ 在 $x$ 上的一致连续性得到。

第（i）条的关键在于：逐点极限 $\varphi$ 未必是某个概率分布的特征函数，除非排除质量逃逸到无穷的可能。若 $X_n\equiv n$，则 $\varphi_n(t)=e^{\mathrm i tn}$ 在 $t\ne0$ 处不收敛；若 $X_n$ 以概率 $1/2$ 取 $n$、以概率 $1/2$ 取 $-n$，则 $\varphi_n(t)=\cos(nt)$ 仍不收敛。也存在 $\varphi_n$ 收敛而极限在 $0$ 处间断的情形：令 $X_n$ 以概率 $1-1/n$ 集中在 $0$、以概率 $1/n$ 均匀散布在 $[n,2n]$ 上，则分布函数在每点趋于 $0$，质量全部逃逸，对应的极限函数在 $0$ 处取 $1$ 而在别处为零，不连续。$\varphi$ 在 $0$ 处的连续性正是排除这类退化的条件。

证明分三步。第一步，由 $\varphi$ 在 $0$ 处连续与 $\varphi_n(0)=1$ 得 $\varphi(0)=1$，并且对充分小的 $u>0$，$\frac{1}{2u}\int_{-u}^{u}\left(1-\varphi(t)\right)\mathrm dt$ 可以任意小。利用恒等式

$$
\frac{1}{2u}\int_{-u}^{u}e^{\mathrm i tx}\,\mathrm dt=\frac{\sin(ux)}{ux},
$$

其中约定 $x=0$ 时右端为 $1$，两边取期望并由 Fubini 定理交换积分次序（被积函数有界，积分区域有限，交换合法）得

$$
\frac{1}{2u}\int_{-u}^{u}\varphi_X(t)\,\mathrm dt=\mathbb E\left[\frac{\sin(uX)}{uX}\right],
\qquad
\frac{1}{2u}\int_{-u}^{u}\left(1-\varphi_X(t)\right)\mathrm dt=\mathbb E\left[1-\frac{\sin(uX)}{uX}\right].
$$

因为 $|\sin y|\le|y|$，被积函数 $1-\frac{\sin y}{y}$ 处处非负；又当 $|y|\ge2$ 时 $\left|\frac{\sin y}{y}\right|\le\frac12$，故 $1-\frac{\sin y}{y}\ge\frac12$。于是对任意随机变量 $X$ 与 $u>0$，

$$
\mathbb P\left(|X|>\frac{2}{u}\right)\ \le\ \frac{1}{u}\int_{-u}^{u}\left(1-\varphi_X(t)\right)\mathrm dt.
\tag{14.8}
$$

式（14.8）就是特征函数控制尾部概率的定量工具。把它用于 $X_n$：被积函数满足 $|1-\varphi_n(t)|\le2$，且逐点收敛到 $1-\varphi(t)$，由控制收敛定理得 $\int_{-u}^{u}(1-\varphi_n)\,\mathrm dt\to\int_{-u}^{u}(1-\varphi)\,\mathrm dt$；注意对每个 $n$，$\frac{1}{2u}\int_{-u}^{u}(1-\varphi_n)$ 都等于实数 $\mathbb E[1-\frac{\sin(uX_n)}{uX_n}]$，故极限 $\frac{1}{2u}\int_{-u}^{u}(1-\varphi)$ 也是非负实数。取 $u$ 充分小使它小于 $\varepsilon$，则由式（14.8），存在 $n_1$ 使当 $n\ge n_1$ 时 $\mathbb P(|X_n|>2/u)<2\varepsilon$；对前 $n_1-1$ 个指标逐个取有界区间即可。这就得到 $\{\mu_n\}$ 的紧性：概率质量不会逃逸到无穷。

第二步，应用 Helly 选择定理：任一分布函数列都有子列 $\{F_{n_k}\}$ 与一个非降右连续函数 $F_\infty$（取值于 $[0,1]$，未必满足 $F_\infty(-\infty)=0$、$F_\infty(+\infty)=1$），使 $F_{n_k}(x)\to F_\infty(x)$ 在 $F_\infty$ 的每个连续点成立。第一步得到的紧性排除了质量损失，保证 $F_\infty$ 是真正的分布函数，即 $F_\infty(+\infty)-F_\infty(-\infty)=1$；否则质量会从两端逃逸，与紧性矛盾。

第三步，证明子列的弱极限唯一，从而整列收敛。对第二步得到的子列，由定理 14.6 的（iv）与有界收敛定理，对每个 $t$，

$$
\varphi_\infty(t)=\lim_{k\to\infty}\mathbb E\left[e^{\mathrm i tX_{n_k}}\right]=\varphi(t),
$$

即任何子列极限的特征函数都等于 $\varphi$。由特征函数唯一决定分布（唯一性定理），所有子列极限都对应同一个分布 $\mu$，其分布函数记为 $F$。若原序列 $X_n$ 不弱收敛于 $\mu$，则存在 $\mu$ 的某个弱邻域之外的一列指标，从中再按 Helly 定理抽子列，其极限仍须是 $\mu$，矛盾。故 $X_n\Rightarrow X$，其中 $X$ 是分布为 $\mu$ 的随机变量。

□

定理 14.7 在本章后续部分处于中心位置。中心极限定理的证明将被完全转化为特征函数的逐点收敛：设 $Y_1,Y_2,\dots$ 独立同分布，$\mathbb E[Y_i]=0$，$\operatorname{Var}(Y_i)=\sigma^2$，$S_n=\sum_{i=1}^nY_i$，则由独立性与同分布性，$\varphi_{S_n/\sqrt n}(t)=\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^{n}$，而对 $\varphi_Y$ 在 $0$ 处作二阶 Taylor 展开可得 $\varphi_Y(s)=1-\frac{\sigma^2s^2}{2}+o(s^2)$，于是

$$
\left[\varphi_Y\left(\frac{t}{\sqrt n}\right)\right]^{n}=\left[1-\frac{\sigma^{2}t^{2}}{2n}+o\left(\frac{1}{n}\right)\right]^{n}\longrightarrow e^{-\sigma^{2}t^{2}/2},
$$

右端正是 $N(0,\sigma^2)$ 的特征函数，它在 $t=0$ 处连续。此时唯一缺少的环节就是「特征函数逐点收敛 $\Rightarrow$ 分布弱收敛」，而这恰是定理 14.7 的内容。换句话说，Lévy 连续性定理把概率论问题翻译成了纯分析问题，使得中心极限定理的证明只需 Taylor 展开与一个极限 $\left(1+\frac{x_n}{n}\right)^n\to e^{x}$；它也解释了为什么特征函数（而非矩或分布函数）是研究极限定理的首选工具。

**命题 14.8（Slutsky 定理与连续映射定理）**

设 $X_n\Rightarrow X$，$Y_n\Rightarrow c$，其中 $c\in\mathbb R$ 是常数。由定理 14.5 的第（iv）条，$Y_n\Rightarrow c$ 等价于 $Y_n\xrightarrow{\ \mathbb P\ }c$。则：

（i）$X_n+Y_n\Rightarrow X+c$；

（ii）$X_nY_n\Rightarrow cX$；

（iii）若 $c\ne0$，则 $\dfrac{X_n}{Y_n}\Rightarrow\dfrac{X}{c}$（当 $n$ 充分大时 $Y_n\ne0$ 的概率趋于 $1$，故商有意义）；

（iv）（连续映射定理）设 $g:\mathbb R\to\mathbb R$ 是 Borel 函数，且存在 Borel 集 $A$ 使 $\mathbb P(X\in A)=1$ 而 $g$ 在 $A$ 的每一点连续，则 $g(X_n)\Rightarrow g(X)$。

**证明**

先证一个联合收敛的引理，它是（i）至（iii）的共同基础。断言：在命题的条件下，二维随机向量满足 $(X_n,Y_n)\Rightarrow(X,c)$，其中 $(X,c)$ 表示取值为 $(X(\omega),c)$ 的常向量。按定理 14.6 的条件（v），只需对每个有界一致连续函数 $f:\mathbb R^2\to\mathbb R$ 证明 $\mathbb E[f(X_n,Y_n)]\to\mathbb E[f(X,c)]$。设 $|f|\le M$，并设 $f$ 的一致连续模为 $\rho$，即 $|f(u)-f(v)|\le\rho(|u-v|)$，其中 $\rho(\delta)\to0$（$\delta\to0$），$|\cdot|$ 取 $\mathbb R^2$ 上的欧氏距离。给定 $\eta>0$，取 $\delta>0$ 使 $\rho(\delta)<\eta$，则

$$
\left|f(X_n,Y_n)-f(X_n,c)\right|\le\rho\left(|Y_n-c|\right)\le\eta+2M\,\mathbf 1_{\{|Y_n-c|\ge\delta\}},
$$

因为当 $|Y_n-c|<\delta$ 时左端不超过 $\rho(\delta)<\eta$，否则用平凡界 $2M$。取期望并利用 $Y_n\xrightarrow{\ \mathbb P\ }c$，

$$
\limsup_{n\to\infty}\left|\mathbb E[f(X_n,Y_n)]-\mathbb E[f(X_n,c)]\right|
\le\limsup_{n\to\infty}\mathbb E\left[\left|f(X_n,Y_n)-f(X_n,c)\right|\right]\le\eta+2M\limsup_{n\to\infty}\mathbb P\left(|Y_n-c|\ge\delta\right)=\eta.
$$

由 $\eta$ 的任意性，$\mathbb E[f(X_n,Y_n)]-\mathbb E[f(X_n,c)]\to0$。另一方面，映射 $x\mapsto f(x,c)$ 是 $\mathbb R$ 上的有界一致连续函数，由 $X_n\Rightarrow X$ 与定理 14.6 的条件（v）得 $\mathbb E[f(X_n,c)]\to\mathbb E[f(X,c)]$。两项合并即得 $\mathbb E[f(X_n,Y_n)]\to\mathbb E[f(X,c)]$，引理得证。这里的关键是第二个分量的极限为常数：一致连续性对 $y$ 是一致的，与 $x$ 的取值无关，因此不需要 $(X_n,Y_n)$ 的联合分布收敛到任何特定的相依结构。

再证（iv）连续映射定理。设 $D\subset\mathbb R$ 为闭集，记 $g^{-1}(D)=\{x:g(x)\in D\}$。断言：$\overline{g^{-1}(D)}\cap A\subseteq g^{-1}(D)$。事实上，若 $x\in\overline{g^{-1}(D)}\cap A$，则存在 $x_k\in g^{-1}(D)$ 使 $x_k\to x$；因为 $x\in A$ 且 $g$ 在 $A$ 上连续，$g(x_k)\to g(x)$；又 $g(x_k)\in D$ 而 $D$ 闭，故 $g(x)\in D$，即 $x\in g^{-1}(D)$，断言成立。由此 $\overline{g^{-1}(D)}\subseteq g^{-1}(D)\cup A^{c}$。于是按定理 14.6 的条件（ii），对闭集 $\overline{g^{-1}(D)}$ 有

$$
\limsup_{n\to\infty}\mathbb P\left(g(X_n)\in D\right)
=\limsup_{n\to\infty}\mathbb P\left(X_n\in g^{-1}(D)\right)
\le\limsup_{n\to\infty}\mathbb P\left(X_n\in\overline{g^{-1}(D)}\right)
\le\mathbb P\left(X\in\overline{g^{-1}(D)}\right).
$$

最后一项不超过 $\mathbb P(X\in g^{-1}(D))+\mathbb P(X\notin A)=\mathbb P(g(X)\in D)$，因为 $\mathbb P(X\in A)=1$。这就验证了 $\mathbb P\circ g(X_n)^{-1}$ 满足定理 14.6 的条件（ii），故 $g(X_n)\Rightarrow g(X)$。

最后由引理与（iv）推出（i）（ii）（iii）。取 $g_1(x,y)=x+y$，它在 $\mathbb R^2$ 上处处连续，故由（iv）作用于已证的联合收敛 $(X_n,Y_n)\Rightarrow(X,c)$，得 $X_n+Y_n=g_1(X_n,Y_n)\Rightarrow g_1(X,c)=X+c$，即（i）。取 $g_2(x,y)=xy$，同样处处连续，得 $X_nY_n\Rightarrow cX$，即（ii）。取 $g_3(x,y)=x/y$，它在开集 $B=\{(x,y):y\ne0\}$ 上连续，而 $\mathbb P((X,c)\in B)=\mathbf 1_{\{c\ne0\}}=1$（当 $c\ne0$ 时），故由（iv）（取 $A=B$ 在 $g_3$ 定义域中的部分）得 $\frac{X_n}{Y_n}\Rightarrow\frac{X}{c}$，即（iii）。注意（iii）中分母为零的事件不需要事先排除：由 $Y_n\xrightarrow{\ \mathbb P\ }c\ne0$，$\mathbb P(|Y_n|<|c|/2)\le\mathbb P(|Y_n-c|>|c|/2)\to0$，因此在这些零概率事件上如何定义商都不影响极限分布。

□

注记（Slutsky 定理中极限必须是常数）　条件 $Y_n\Rightarrow c$ 中的 $c$ 为常数不可省略。设 $Z\sim N(0,1)$，$Z'$ 是 $Z$ 的独立副本，令 $X_n\equiv Z$，$Y_n\equiv-Z$（对一切 $n$）。则 $X_n\Rightarrow Z$，$Y_n\Rightarrow-Z\stackrel{d}=Z'$，即两个边缘分布分别收敛。但 $X_n+Y_n\equiv0\Rightarrow0$，而按「极限可以逐项相加」的错误推理会得到 $Z+Z'\sim N(0,2)$。两者矛盾说明：仅有边缘分布的弱收敛不能决定和的极限分布，因为和还依赖联合分布（相依结构），而弱收敛根本不携带相依信息。这正是命题 14.8 的证明必须依赖「第二个分量的极限是常数」这一特殊结构的原因，也是在实际推导中把随机分母替换为常数极限时必须格外小心的原因。

**例 14.3**

设 $X_1,X_2,\dots$ 独立同分布，$\mathbb E[X_i]=\mu$，$\operatorname{Var}(X_i)=\sigma^2\in(0,\infty)$，并设四阶矩 $\mathbb E[X_i^4]<\infty$。记

$$
\bar X_n=\frac{1}{n}\sum_{i=1}^{n}X_i,
\qquad
S_n^{2}=\frac{1}{n-1}\sum_{i=1}^{n}\left(X_i-\bar X_n\right)^{2},
\qquad
T_n=\frac{\sqrt n\left(\bar X_n-\mu\right)}{S_n}.
$$

利用命题 14.8 推导 $T_n$ 与 $\sqrt n(S_n-\sigma)$ 的渐近分布。其中中心极限定理的结论 $\sqrt n(\bar X_n-\mu)/\sigma\Rightarrow N(0,1)$ 作为已知输入使用，它将在 14.4 节证明；本例的重点是展示 Slutsky 定理与连续映射定理如何把已知的渐近分布组装成新统计量的渐近分布。

**解**

第一步，证明 $S_n^{2}\xrightarrow{\ \mathbb P\ }\sigma^{2}$。展开平方和：

$$
\frac{1}{n}\sum_{i=1}^{n}\left(X_i-\bar X_n\right)^{2}
=\frac{1}{n}\sum_{i=1}^{n}X_i^{2}-2\bar X_n\cdot\frac{1}{n}\sum_{i=1}^{n}X_i+\bar X_n^{2}
=\frac{1}{n}\sum_{i=1}^{n}X_i^{2}-\bar X_n^{2}.
$$

对 $Y_i=X_i^{2}$，有 $\mathbb E[Y_i]=\mathbb E[X^2]<\infty$ 且 $\operatorname{Var}(Y_i)=\mathbb E[X^4]-(\mathbb E[X^2])^2<\infty$（这正是四阶矩假设的用途），故由例 14.2 末尾的 $L^2$ 计算，

$$
\mathbb E\left[\left(\frac{1}{n}\sum_{i=1}^{n}X_i^{2}-\mathbb E[X^{2}]\right)^{2}\right]=\frac{\operatorname{Var}(X^{2})}{n}\longrightarrow 0,
$$

即 $\frac1n\sum_{i=1}^nX_i^2\xrightarrow{L^2}\mathbb E[X^2]$，从而依概率收敛于 $\mathbb E[X^2]$。又由同一计算，$\bar X_n\xrightarrow{L^2}\mu$，故 $\bar X_n\xrightarrow{\ \mathbb P\ }\mu$；对连续函数 $g(x)=x^2$ 应用连续映射定理得 $\bar X_n^2\xrightarrow{\ \mathbb P\ }\mu^2$，再对 $g(x)=-x$ 应用一次得 $-\bar X_n^2\Rightarrow-\mu^2$。于是由命题 14.8 的第（i）条，

$$
\frac{1}{n}\sum_{i=1}^{n}X_i^{2}-\bar X_n^{2}\ \xrightarrow{\ \mathbb P\ }\ \mathbb E[X^{2}]-\mu^{2}=\sigma^{2}.
$$

最后 $S_n^2=\frac{n}{n-1}\left(\frac1n\sum_{i=1}^nX_i^2-\bar X_n^2\right)$，而常数列 $\frac{n}{n-1}\to1$，再用命题 14.8 的第（ii）条得 $S_n^2\xrightarrow{\ \mathbb P\ }\sigma^2$。

注：上述推导中 $\frac1n\sum X_i^2\xrightarrow{\ \mathbb P\ }\mathbb E[X^2]$ 与 $\bar X_n\xrightarrow{\ \mathbb P\ }\mu$ 都是大数定律的特殊情形；这里用四阶矩假设换取了完全自足的 $L^2$ 证明。14.3 节将证明只需一阶矩有限即可（弱大数定律），因此本例的全部结论在 $\mathbb E[X^4]=\infty$ 时对 $S_n^2$ 依然成立，只是第三步中 $\sqrt n(S_n-\sigma)$ 的极限分布需要四阶矩才有意义。

第二步，推导 $T_n$ 的渐近分布。由 $S_n^2\xrightarrow{\ \mathbb P\ }\sigma^2>0$ 与连续映射定理（取 $g(x)=\sqrt x$，它在 $[0,\infty)$ 上连续，而 $\mathbb P(S_n^2\in[0,\infty))=1$）得 $S_n=\sqrt{S_n^2}\xrightarrow{\ \mathbb P\ }\sigma$。再用 $g(x)=\sigma/x$，它在 $(0,\infty)$ 上连续且 $\mathbb P(S_n\in(0,\infty))\to1$，由连续映射定理得 $\frac{\sigma}{S_n}\xrightarrow{\ \mathbb P\ }1$。把 $T_n$ 改写为

$$
T_n=\frac{\sqrt n\left(\bar X_n-\mu\right)}{\sigma}\cdot\frac{\sigma}{S_n}=Z_nW_n,
\qquad
Z_n=\frac{\sqrt n\left(\bar X_n-\mu\right)}{\sigma},
\qquad
W_n=\frac{\sigma}{S_n}.
$$

已知（14.4 节的中心极限定理）$Z_n\Rightarrow Z$，其中 $Z\sim N(0,1)$；又 $W_n\xrightarrow{\ \mathbb P\ }1$，即 $W_n\Rightarrow1$。由命题 14.8 的第（ii）条得 $T_n=Z_nW_n\Rightarrow1\cdot Z=Z$，也就是

$$
T_n=\frac{\sqrt n\left(\bar X_n-\mu\right)}{S_n}\ \Rightarrow\ N(0,1).
\tag{14.9}
$$

式（14.9）中的记号 $\Rightarrow N(0,1)$ 表示弱收敛于标准正态分布。它的统计含义是：用样本标准差 $S_n$ 替换未知的总体标准差 $\sigma$ 不改变渐近分布，因此在大样本下不必知道 $\sigma$ 就能构造置信区间与检验。注意 $T_n$ 只有在总体为正态分布时才恰好服从自由度 $n-1$ 的 $t$ 分布；在一般总体下，$T_n$ 的精确分布未知且依赖总体形状，但它的渐近分布总是标准正态，这就是所谓渐近枢轴量。量化研究中对因子 IC 均值、对回测期收益均值做显著性检验时使用的 $t$ 统计量，其大样本合法性完全来自式（14.9），而与收益是否服从正态分布无关。

第三步，推导波动率估计量 $\sqrt n(S_n-\sigma)$ 的渐近分布。这是量化中样本波动率置信区间的理论基础。记 $Y_i=(X_i-\mu)^2$，则 $\mathbb E[Y_i]=\sigma^2$，$\operatorname{Var}(Y_i)=\mathbb E[(X-\mu)^4]-\sigma^4=\mu_4-\sigma^4$，其中 $\mu_4=\mathbb E[(X-\mu)^4]<\infty$。对 $\{Y_i\}$ 应用中心极限定理得

$$
\sqrt n\left(\bar Y_n-\sigma^{2}\right)=\sqrt n\left(\frac{1}{n}\sum_{i=1}^{n}\left(X_i-\mu\right)^{2}-\sigma^{2}\right)\ \Rightarrow\ N\left(0,\ \mu_4-\sigma^{4}\right).
$$

另一方面，$\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2=\bar Y_n-(\bar X_n-\mu)^2$，故

$$
\sqrt n\left(\frac{1}{n}\sum_{i=1}^{n}\left(X_i-\bar X_n\right)^{2}-\sigma^{2}\right)
=\sqrt n\left(\bar Y_n-\sigma^{2}\right)-\sqrt n\left(\bar X_n-\mu\right)^{2}
=\sqrt n\left(\bar Y_n-\sigma^{2}\right)-\frac{1}{\sqrt n}\left[\sqrt n\left(\bar X_n-\mu\right)\right]^{2}.
$$

上式右端第二项依概率趋于零：因为 $\sqrt n(\bar X_n-\mu)\Rightarrow N(0,\sigma^2)$，该序列是紧的（见定理 14.6 之后的注记），即对任意 $\eta>0$ 存在 $M$ 使 $\sup_n\mathbb P(|\sqrt n(\bar X_n-\mu)|>M)<\eta$，于是

$$
\mathbb P\left(\frac{1}{\sqrt n}\left|\sqrt n\left(\bar X_n-\mu\right)\right|^{2}>\delta\right)
\le\mathbb P\left(\left|\sqrt n\left(\bar X_n-\mu\right)\right|>\sqrt{\delta n}\right)\le\eta
$$

对一切满足 $\sqrt{\delta n}>M$ 的 $n$ 成立，故该概率趋于零。再由命题 14.8 的第（i）条（把依概率趋于零的序列视为弱收敛于常数 $0$），

$$
\sqrt n\left(\frac{1}{n}\sum_{i=1}^{n}\left(X_i-\bar X_n\right)^{2}-\sigma^{2}\right)\ \Rightarrow\ N\left(0,\ \mu_4-\sigma^{4}\right).
$$

把无偏样本方差写为 $S_n^2=\frac{n}{n-1}\hat\sigma_n^2$，其中 $\hat\sigma_n^2=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2$，则

$$
\sqrt n\left(S_n^{2}-\sigma^{2}\right)
=\frac{n}{n-1}\sqrt n\left(\hat\sigma_n^{2}-\sigma^{2}\right)+\sqrt n\left(\frac{n}{n-1}-1\right)\sigma^{2}
=\frac{n}{n-1}\sqrt n\left(\hat\sigma_n^{2}-\sigma^{2}\right)+\frac{\sqrt n}{n-1}\sigma^{2}.
$$

最后一项趋于零（它是确定性数列），第一项的系数 $\frac{n}{n-1}\to1$，故由命题 14.8 的第（i）（ii）条得 $\sqrt n(S_n^2-\sigma^2)\Rightarrow N(0,\mu_4-\sigma^4)$。最后利用恒等式

$$
S_n-\sigma=\frac{S_n^{2}-\sigma^{2}}{S_n+\sigma},
$$

其中分母 $S_n+\sigma\xrightarrow{\ \mathbb P\ }2\sigma\ne0$，由命题 14.8 的第（iii）条得

$$
\sqrt n\left(S_n-\sigma\right)=\frac{\sqrt n\left(S_n^{2}-\sigma^{2}\right)}{S_n+\sigma}\ \Rightarrow\ \frac{1}{2\sigma}N\left(0,\ \mu_4-\sigma^{4}\right)=N\left(0,\ \frac{\mu_4-\sigma^{4}}{4\sigma^{2}}\right).
$$

这一结论说明：样本标准差的渐近方差不只是 $\sigma^2/(2n)$（正态总体下的结果），而是 $(\mu_4-\sigma^4)/(4\sigma^2n)$，其中 $\mu_4-\sigma^4$ 是 $(X-\mu)^2$ 的方差，直接依赖总体的四阶矩即尾部厚度。对正态总体 $\mu_4=3\sigma^4$，代入得 $\frac{3\sigma^4-\sigma^4}{4\sigma^2}=\frac{\sigma^2}{2}$，与经典结论一致；对厚尾分布 $\mu_4$ 更大，样本波动率的抽样波动被显著放大。金融收益率的经验分布普遍具有厚尾特征，因此用正态假设下的 $\sigma^2/(2n)$ 计算波动率置信区间会系统性低估区间宽度，这一偏差正是本例第三步的公式所量化的。

回顾整个推导可以发现，真正需要新证明的只有大数定律与中心极限定理两个输入，其余步骤都是命题 14.8 的机械应用：把已知弱收敛的序列与已知依概率收敛于常数的序列做加、乘、除运算，再套上连续函数。这一「组装」模式在 14.6 节会反复出现，例如标准化 IC、Sharpe 比率的渐近方差与回归系数检验统计量的极限分布。

## 14.3 大数定律

大数定律是概率论从「单个随机变量的分布」走向「大量随机变量之和的确定性行为」的第一步，也是统计学中一切估计量一致性论证的出发点。它讨论的对象是部分和 $S_n=\sum_{k=1}^{n}X_k$ 的规范化序列 $S_n/n$：在适当条件下，$S_n/n$ 与其期望 $\mathbb E S_n/n$ 的偏差随 $n$ 增大而消失。按照 14.1 节建立的收敛模式，「消失」可以有强弱两种含义，分别对应弱大数定律与强大数定律。前者断言 $S_n/n-\mathbb E S_n/n$ 依概率收敛到零，后者断言它几乎必然收敛到零；由 14.1 节的蕴含关系，后者强于前者，因此它的证明也必须动用更强的工具。

**定理 14.9（独立同分布情形的弱大数定律）**

设 $X_1,X_2,\dots$ 是独立同分布的随机变量，$\mathbb E|X_1|<\infty$，记 $\mu=\mathbb E X_1$，$\bar X_n=S_n/n$。则

$$\bar X_n\xrightarrow{\ \mathbb P\ }\mu .\tag{14.10}$$

**证明**

令 $\varphi(u)=\mathbb E e^{iuX_1}$ 为公共特征函数。由独立性与同分布性，

$$\varphi_{\bar X_n}(t)=\mathbb E\exp\Bigl(it\frac1n\sum_{k=1}^{n}X_k\Bigr)=\prod_{k=1}^{n}\varphi\Bigl(\frac tn\Bigr)=\Bigl[\varphi\Bigl(\frac tn\Bigr)\Bigr]^{n}.\tag{14.11}$$

因为 $\mathbb E|X_1|<\infty$，可在积分号下对 $u$ 求导（被积函数的导数模为 $|X_1|$，可积），得 $\varphi'(u)=i\,\mathbb E[X_1e^{iuX_1}]$，特别 $\varphi'(0)=i\mu$。于是 $\varphi$ 在原点可微，

$$\varphi(u)=1+i\mu u+o(u),\qquad u\to0 .$$

固定 $t\in\mathbb R$，取 $u=t/n$ 得 $\varphi(t/n)=1+i\mu t/n+o(1/n)$。记 $z_n=i\mu t+n\cdot o(1/n)$，则 $z_n\to i\mu t$，且 $\varphi(t/n)=1+z_n/n$。因为 $\{z_n\}$ 有界，存在 $N$ 使 $n>N$ 时 $|z_n/n|\le1/2$，此时可取对数主支并利用 $\log(1+w)=w+O(|w|^2)$（$|w|\le1/2$）：

$$n\log\Bigl(1+\frac{z_n}{n}\Bigr)=z_n+O\Bigl(\frac{|z_n|^2}{n}\Bigr)\longrightarrow i\mu t .\tag{14.12}$$

从而对每个 $t$，$\varphi_{\bar X_n}(t)\to e^{i\mu t}$。极限函数在 $t=0$ 处连续，且它正是退化于 $\mu$ 的分布的特征函数。由定理 14.7（Lévy 连续性定理），$\bar X_n\xrightarrow{\ d\ }\mu$。最后，依分布收敛到常数即蕴含依概率收敛到该常数：设 $Y_n\xrightarrow{\ d\ }c$，则 $e^{-itc}\varphi_{Y_n}(t)\to1$ 对一切 $t$ 成立，再用一次定理 14.7 得 $Y_n-c\xrightarrow{\ d\ }0$；对闭集 $F=\mathbb R\setminus(-\varepsilon,\varepsilon)$ 应用 14.2 节的 Portmanteau 定理，

$$\limsup_{n\to\infty}\mathbb P(|Y_n-c|>\varepsilon)\le\mathbb P(0\in F)=0 ,$$

故 $Y_n\xrightarrow{\ \mathbb P\ }c$。取 $Y_n=\bar X_n$、$c=\mu$ 即得式（14.10）。

□

**注记（Khinchin 截断法：不用特征函数的完整证明）**

上述证明的关键是定理 14.7，它把「依概率收敛」翻译成「特征函数逐点收敛」。若希望完全绕开特征函数，可采用截断法。固定 $n$，令 $Y_k=X_k\mathbf 1\{|X_k|\le n\}$，$k=1,\dots,n$，并记 $\bar Y_n=\frac1n\sum_{k=1}^{n}Y_k$，$m_n=\mathbb E Y_1=\mathbb E[X_1\mathbf 1\{|X_1|\le n\}]$。

第一步，截断只影响小概率事件。由 $\mathbb E|X_1|<\infty$ 与 Markov 不等式，

$$\mathbb P(\bar X_n\ne\bar Y_n)\le\sum_{k=1}^{n}\mathbb P(|X_k|>n)=n\,\mathbb P(|X_1|>n)\le\mathbb E\bigl[|X_1|\mathbf 1\{|X_1|>n\}\bigr]\to0 .$$

第二步，截断后的期望趋于 $\mu$：$|m_n-\mu|\le\mathbb E[|X_1|\mathbf 1\{|X_1|>n\}]\to0$（控制收敛定理）。

第三步，控制方差。由独立性，

$$\operatorname{Var}(\bar Y_n)=\frac1{n^2}\sum_{k=1}^{n}\operatorname{Var}(Y_k)\le\frac1n\,\mathbb E[Y_1^2]=\frac1n\,\mathbb E\bigl[X_1^2\mathbf 1\{|X_1|\le n\}\bigr]\to0 ,\tag{14.13}$$

最后的极限成立是因为被 $|X_1|$ 控制的函数 $|X_1|\cdot(|X_1|/n)\mathbf 1\{|X_1|\le n\}$ 逐点趋于零，控制收敛定理给出期望趋于零。于是 Chebyshev 不等式给出 $\mathbb P(|\bar Y_n-m_n|>\varepsilon)\le\operatorname{Var}(\bar Y_n)/\varepsilon^2\to0$。

把三步合并：对任意 $\varepsilon>0$，

$$\mathbb P(|\bar X_n-\mu|>\varepsilon)\le\mathbb P(\bar X_n\ne\bar Y_n)+\mathbb P(|\bar Y_n-m_n|>\varepsilon/2)+\mathbf 1\{|m_n-\mu|>\varepsilon/2\}\to0 .$$

这一路线的代价是要对每个 $n$ 重新截断，因而只能得到依概率收敛；强大数定律需要与之不同的截断尺度 $Y_k=X_k\mathbf 1\{|X_k|\le k\}$，见下文。

**注记（Borel–Cantelli 引理）**

设 $\{A_n\}$ 为事件列。第一引理：若 $\sum_n\mathbb P(A_n)<\infty$，则 $\mathbb P(A_n\ \text{无穷多次发生})=0$。第二引理：若 $\{A_n\}$ 相互独立且 $\sum_n\mathbb P(A_n)=\infty$，则 $\mathbb P(A_n\ \text{无穷多次发生})=1$。第一引理的证明只需 $\mathbb P(\limsup A_n)\le\sum_{k\ge m}\mathbb P(A_k)$ 对每个 $m$ 成立再令 $m\to\infty$；第二引理的证明要用 $1-x\le e^{-x}$ 与独立性。下文只用第一引理。

**定理 14.10（Kolmogorov 强大数定律）**

设 $X_1,X_2,\dots$ 独立同分布，$\mathbb E|X_1|<\infty$，$\mu=\mathbb E X_1$，$\bar X_n=S_n/n$。则

$$\bar X_n\longrightarrow\mu\quad\text{几乎必然}.\tag{14.14}$$

**证明思路**

第一步准备两件工具。其一是 Kolmogorov 极大不等式：若 $Y_1,\dots,Y_n$ 独立、$\mathbb E Y_k=0$、$\mathbb E Y_k^2<\infty$，则对任意 $\lambda>0$，

$$\mathbb P\Bigl(\max_{1\le m\le n}\Bigl|\sum_{k=1}^{m}Y_k\Bigr|\ge\lambda\Bigr)\le\frac1{\lambda^2}\sum_{k=1}^{n}\mathbb E Y_k^2 .$$

其二是 Kronecker 引理：若实数列 $\sum_k x_k$ 收敛且 $b_k\uparrow\infty$，则 $\frac1{b_n}\sum_{k=1}^{n}b_kx_k\to0$；取 $b_k=k$ 时，这就是「级数收敛蕴含 Cesàro 平均收敛」。

第二步，把 $L^2$ 情形的 Borel–Cantelli 论证写清楚。设 $\{Y_k\}$ 独立、$\mathbb E Y_k=0$、$\sum_k\mathbb E Y_k^2/k^2<\infty$，令 $Z_k=Y_k/k$，则 $\sum_k\operatorname{Var}(Z_k)<\infty$。对 $m<n$ 用 Kolmogorov 极大不等式于 $\{Z_m,\dots,Z_n\}$：

$$\mathbb P\Bigl(\max_{m\le j\le n}\Bigl|\sum_{k=m}^{j}Z_k\Bigr|\ge\varepsilon\Bigr)\le\frac1{\varepsilon^2}\sum_{k=m}^{n}\operatorname{Var}(Z_k)\le\frac1{\varepsilon^2}\sum_{k=m}^{\infty}\operatorname{Var}(Z_k)=:\frac{r_m}{\varepsilon^2},$$

其中 $r_m\to0$。令 $n\to\infty$ 得 $\mathbb P(\sup_{j\ge m}|\sum_{k=m}^{j}Z_k|\ge\varepsilon)\le r_m/\varepsilon^2$。选取 $m_1<m_2<\cdots$ 使 $r_{m_i}\le2^{-i}$，则事件 $A_i=\{\sup_{j\ge m_i}|\sum_{k=m_i}^{j}Z_k|\ge2^{-i}\}$ 满足 $\sum_i\mathbb P(A_i)<\infty$，由 Borel–Cantelli 第一引理，几乎必然只有有限个 $A_i$ 发生，即存在随机指标 $I$ 使 $i\ge I$ 时尾段振荡小于 $2^{-i}$。这正是级数 $\sum_k Z_k$ 的 Cauchy 准则，故 $\sum_k Y_k/k$ 几乎必然收敛。再用 Kronecker 引理得 $\frac1n\sum_{k=1}^{n}Y_k\to0$ 几乎必然。特别地，当 $\mathbb E X_1^2<\infty$ 时取 $Y_k=X_k-\mu$，有 $\sum_k\sigma^2/k^2<\infty$，于是 $L^2$ 情形的强大数定律成立。

第三步，用截断把二阶矩条件去掉。令 $Y_k=X_k\mathbf 1\{|X_k|\le k\}$。

(a) $\sum_k\mathbb P(X_k\ne Y_k)=\sum_k\mathbb P(|X_1|>k)\le\mathbb E|X_1|<\infty$（因为 $\mathbb E|X_1|=\int_0^\infty\mathbb P(|X_1|>t)\,dt$ 控制了该级数），Borel–Cantelli 第一引理给出：几乎必然地，$X_k=Y_k$ 对所有充分大的 $k$ 成立，从而 $\frac1n\sum_{k=1}^{n}(X_k-Y_k)\to0$ 几乎必然。

(b) 由 Tonelli 定理交换求和次序，

$$\sum_{k=1}^{\infty}\frac{\mathbb E Y_k^2}{k^2}=\mathbb E\Bigl[X_1^2\sum_{k\ge|X_1|}\frac1{k^2}\Bigr]\le\mathbb E\Bigl[X_1^2\cdot\frac2{|X_1|}\Bigr]=2\,\mathbb E|X_1|<\infty ,\tag{14.15}$$

其中用到 $\sum_{k\ge m}k^{-2}\le m^{-2}+\int_m^\infty x^{-2}dx\le2/m$。于是 $\sum_k\operatorname{Var}(Y_k)/k^2<\infty$，第二步应用于 $\tilde Y_k=Y_k-\mathbb E Y_k$ 得 $\frac1n\sum_{k=1}^{n}(Y_k-\mathbb E Y_k)\to0$ 几乎必然。

(c) $\mathbb E Y_k=\mathbb E[X_1\mathbf 1\{|X_1|\le k\}]\to\mu$，由 Cesàro 平均，$\frac1n\sum_{k=1}^{n}\mathbb E Y_k\to\mu$。

把 (a)(b)(c) 相加即得式（14.14）。需要强调的是，上述论证的完整性依赖两处更深的工具：Kolmogorov 极大不等式的证明要用「上穿越」计数或停时技术（第25章的 Doob 极大不等式将给出统一框架）；若放弃同分布假设，则第三步的截断尺度不再奏效，须改用 Kolmogorov 三级数定理，其证明超出本章范围。Etemadi（1981）证明了两两独立同分布且 $\mathbb E|X_1|<\infty$ 时式（14.14）仍成立，其方法是用一个较弱的极大不等式替代 Kolmogorov 不等式。

□

**命题 14.11（独立不同分布时的 Markov 条件）**

设 $X_1,X_2,\dots$ 两两不相关，$\mathbb E X_k=\mu_k$，$\operatorname{Var}(X_k)=\sigma_k^2<\infty$，$S_n=\sum_{k=1}^{n}X_k$。若 Markov 条件

$$\frac1{n^2}\operatorname{Var}(S_n)=\frac1{n^2}\sum_{k=1}^{n}\sigma_k^2\longrightarrow0\tag{14.16}$$

成立，则

$$\frac{S_n-\mathbb E S_n}{n}\xrightarrow{\ \mathbb P\ }0,\qquad\text{即}\quad\frac1n\sum_{k=1}^{n}(\mu_k-X_k)\xrightarrow{\ \mathbb P\ }0 .$$

**证明**

两两不相关保证方差可加：$\operatorname{Var}(S_n)=\sum_{k=1}^{n}\sigma_k^2$。对任意 $\varepsilon>0$，Chebyshev 不等式给出

$$\mathbb P\Bigl(\Bigl|\frac{S_n-\mathbb E S_n}{n}\Bigr|>\varepsilon\Bigr)\le\frac{\operatorname{Var}(S_n)}{n^2\varepsilon^2}\longrightarrow0 ,$$

由 Markov 条件即得结论。

□

命题 14.11 的适用范围远比定理 14.9 宽：它不要求同分布，甚至不要求独立（只要两两不相关），代价是必须假定二阶矩有限。例如取 $\sigma_k^2=k^{2\alpha}$，则式（14.16）左端约为 $n^{2\alpha+1}/(n^2(2\alpha+1))$，当且仅当 $\alpha<1/2$ 时趋于零；这就是「方差增长速度不超过 $n^{1-\delta}$」这一常见表述的来源。反之，存在 $\mathbb E|X_1|<\infty$ 而 $\mathbb E X_1^2=\infty$ 的分布（例如尾部满足 $\mathbb P(|X_1|>x)\asymp x^{-2}(\log x)^{-2}$ 者），此时 $\operatorname{Var}(S_n)=\infty$，Markov 条件无从谈起，而定理 14.9 依然给出弱大数定律。这说明在只有一阶矩的场合，Chebyshev 型论证原则上不够，特征函数法或截断法是必需的。
**例 14.4**

设 $f\in C[0,1]$。定义 Bernstein 多项式

$$B_n(f;x)=\sum_{k=0}^{n}f\Bigl(\frac kn\Bigr)\binom nk x^k(1-x)^{n-k},\qquad x\in[0,1].\tag{14.17}$$

证明 $B_n(f;\cdot)$ 在 $[0,1]$ 上一致收敛到 $f$，并由此得到 Weierstrass 逼近定理；再对 $f(x)=x^2$ 求出显式表达式并读出收敛速率。

**解**

关键是给式（14.17）一个概率解释。固定 $x\in[0,1]$，令 $S_n\sim\mathrm{Bin}(n,x)$，则 $\mathbb P(S_n=k)=\binom nkx^k(1-x)^{n-k}$，于是

$$B_n(f;x)=\mathbb E\Bigl[f\Bigl(\frac{S_n}{n}\Bigr)\Bigr].$$

而 $\mathbb E[S_n/n]=x$，$\operatorname{Var}(S_n/n)=x(1-x)/n\le1/(4n)$。这正是弱大数定律的场合：$S_n/n\xrightarrow{\ \mathbb P\ }x$。但我们要的是**一致**收敛，因此不能只取极限，必须把弱大数定律证明中的 Chebyshev 估计显式地保留下来。

因为 $[0,1]$ 紧致，$f$ 一致连续且有界。给定 $\varepsilon>0$，取 $\delta\in(0,1)$ 使 $|u-v|<\delta$ 时 $|f(u)-f(v)|<\varepsilon$；记 $M=\sup_{[0,1]}|f|<\infty$。对每个 $x$ 分解：

$$\begin{aligned}|B_n(f;x)-f(x)|&=\Bigl|\mathbb E\Bigl[f\Bigl(\frac{S_n}{n}\Bigr)-f(x)\Bigr]\Bigr|\le\mathbb E\Bigl|f\Bigl(\frac{S_n}{n}\Bigr)-f(x)\Bigr|\\&\le\varepsilon\,\mathbb P\Bigl(\Bigl|\frac{S_n}{n}-x\Bigr|<\delta\Bigr)+2M\,\mathbb P\Bigl(\Bigl|\frac{S_n}{n}-x\Bigr|\ge\delta\Bigr).\end{aligned}$$

对第二项用 Chebyshev 不等式，得到与 $x$ 无关的上界

$$|B_n(f;x)-f(x)|\le\varepsilon+2M\cdot\frac{x(1-x)}{n\delta^2}\le\varepsilon+\frac{M}{2n\delta^2}.\tag{14.18}$$

因为式（14.18）右端不含 $x$，取上确界得 $\sup_{x\in[0,1]}|B_n(f;x)-f(x)|\le\varepsilon+M/(2n\delta^2)$。再取 $n>M/(2\varepsilon\delta^2)$，即得 $\|B_n-f\|_\infty\le2\varepsilon$，故 $B_n(f;\cdot)\rightrightarrows f$。由于 $B_n(f;\cdot)$ 是次数不超过 $n$ 的代数多项式，这就给出了 Weierstrass 逼近定理的一个构造性证明。

对 $f(x)=x^2$ 可以直接算出期望：

$$B_n(f;x)=\mathbb E\Bigl[\Bigl(\frac{S_n}{n}\Bigr)^2\Bigr]=\operatorname{Var}\Bigl(\frac{S_n}{n}\Bigr)+\Bigl(\mathbb E\frac{S_n}{n}\Bigr)^2=\frac{x(1-x)}{n}+x^2 .$$

误差恰为 $x(1-x)/n$，在 $x=1/2$ 处取最大值 $1/(4n)$，与式（14.18）的量级一致，说明对光滑函数 Bernstein 算子的逼近阶是 $O(1/n)$；而对仅连续的函数，式（14.18）给出的是 $\varepsilon+M/(2n\delta^2)$，其中 $\delta$ 依赖 $\varepsilon$，速率由 $f$ 的连续模决定。这个例子展示了大数定律的一种典型用法：**把「平均值」改写为期望，再用方差的显式上界把依概率收敛强化为一致收敛。**

同一机制给出统计学中最基本的一致性结论。设 $X_1,\dots,X_n$ 独立同分布，$\mathbb E X_1=\mu$，$\operatorname{Var}(X_1)=\sigma^2<\infty$，样本方差 $S_n^2=\frac1{n-1}\sum_{k=1}^{n}(X_k-\bar X_n)^2$。恒等式 $\sum_{k=1}^{n}(X_k-\bar X_n)^2=\sum_{k=1}^{n}X_k^2-n\bar X_n^2$ 给出

$$S_n^2=\frac{n}{n-1}\Bigl[\frac1n\sum_{k=1}^{n}X_k^2-\bar X_n^2\Bigr].$$

由定理 14.9，$\frac1n\sum X_k^2\xrightarrow{\ \mathbb P\ }\mathbb E X_1^2$ 且 $\bar X_n\xrightarrow{\ \mathbb P\ }\mu$；由连续映射定理（$t\mapsto t^2$ 连续）$\bar X_n^2\xrightarrow{\ \mathbb P\ }\mu^2$；再由命题 14.8（Slutsky），$n/(n-1)\to1$ 是常数列，故 $S_n^2\xrightarrow{\ \mathbb P\ }\mathbb E X_1^2-\mu^2=\sigma^2$。这就是「样本方差是总体方差的一致估计量」的证明，其中一致性的含义是估计量依概率收敛到被估参数。矩估计量与许多极大似然估计量的一致性都循此模式：先由大数定律得到目标函数（对数似然的平均）逐点收敛到其期望，再由极值点的连续性把函数收敛翻译为参数估计的收敛。
## 14.4 中心极限定理

大数定律说明 $\bar X_n$ 与 $\mu$ 的偏差以概率趋于零，但它对偏差本身的分布保持沉默。中心极限定理正是补上这一空白：它刻画偏差 $S_n-\mathbb E S_n$ 在恰当标度下的分布极限。标度的选择由方差决定。若 $\operatorname{Var}(S_n)=n\sigma^2$，则 $\operatorname{Var}(S_n/n^a)=n^{1-2a}\sigma^2$：当 $a>1/2$ 时它趋于零，极限只能是退化分布；当 $a<1/2$ 时它趋于无穷，序列不可能紧；只有 $a=1/2$ 使方差恒为 $\sigma^2$，从而可能得到非退化的极限。这就是 $\sqrt n$ 标度的唯一性来源，也是「中心极限」与「大数」两种规范化之间的分界线。

**定理 14.12（Lindeberg–Lévy 中心极限定理）**

设 $X_1,X_2,\dots$ 独立同分布，$\mathbb E X_1=\mu$，$0<\operatorname{Var}(X_1)=\sigma^2<\infty$。则

$$Z_n:=\frac{\sqrt n\,(\bar X_n-\mu)}{\sigma}=\frac1{\sigma\sqrt n}\sum_{k=1}^{n}(X_k-\mu)\xrightarrow{\ d\ }\mathcal N(0,1).\tag{14.19}$$

**证明**

令 $Y_k=(X_k-\mu)/\sigma$，则 $\{Y_k\}$ 独立同分布，$\mathbb E Y_1=0$，$\mathbb E Y_1^2=1$，且 $Z_n=\frac1{\sqrt n}\sum_{k=1}^{n}Y_k$。记 $\psi(t)=\mathbb E e^{itY_1}$。由独立性，

$$\varphi_{Z_n}(t)=\mathbb E\exp\Bigl(\frac{it}{\sqrt n}\sum_{k=1}^{n}Y_k\Bigr)=\Bigl[\psi\Bigl(\frac t{\sqrt n}\Bigr)\Bigr]^{n}.$$

**第一步：二阶 Taylor 展开。** 我们断言

$$\psi(u)=1-\frac{u^2}{2}+o(u^2),\qquad u\to0 .$$

写成余项形式：$\psi(u)-1+u^2/2=\mathbb E\,g_u(Y_1)$，其中 $g_u(y)=e^{iuy}-1-iuy+u^2y^2/2$。由初等不等式 $|e^{ix}-1-ix+x^2/2|\le\min(|x|^3/6,\,x^2)$（它是 $|e^{ix}-\sum_{m=0}^{n}(ix)^m/m!|\le\min(|x|^{n+1}/(n+1)!,\,2|x|^n/n!)$ 在 $n=2$ 时的特例，证明用积分型余项），取 $x=uy$ 得

$$\frac{|g_u(y)|}{u^2}\le\min\Bigl(\frac{|u||y|^3}{6},\,y^2\Bigr)\longrightarrow0\quad(u\to0),$$

且右端被 $y^2$ 控制，而 $\mathbb E Y_1^2=1<\infty$。由控制收敛定理，$\mathbb E g_u(Y_1)/u^2\to0$，断言得证。这里**只用到二阶矩**，没有三阶矩的任何假定，这正是 Lindeberg–Lévy 定理的假设可以弱于 Berry–Esseen 定理的原因。

**第二步：取对数。** 由第一步，对固定的 $t$，

$$\psi\Bigl(\frac t{\sqrt n}\Bigr)=1-\frac{t^2}{2n}+\frac{\alpha_n}{n},\qquad\text{其中}\ \alpha_n=n\cdot o\Bigl(\frac1n\Bigr)\to0 .$$

记 $w_n=-t^2/2+\alpha_n$，则 $w_n\to-t^2/2$，且 $\psi(t/\sqrt n)=1+w_n/n$。$\{w_n\}$ 有界，故存在 $N$ 使 $n>N$ 时 $|w_n/n|\le1/2$，可取对数主支：

$$\log\varphi_{Z_n}(t)=n\log\Bigl(1+\frac{w_n}{n}\Bigr)=n\Bigl[\frac{w_n}{n}+O\Bigl(\frac{|w_n|^2}{n^2}\Bigr)\Bigr]=w_n+O\Bigl(\frac1n\Bigr)\longrightarrow-\frac{t^2}{2},$$

即

$$\varphi_{Z_n}(t)\longrightarrow e^{-t^2/2}\qquad(n\to\infty),\ \forall t\in\mathbb R.\tag{14.20}$$

**第三步：用 Lévy 连续性定理收尾。** 极限函数 $t\mapsto e^{-t^2/2}$ 在 $t=0$ 处连续，且它是标准正态分布 $\mathcal N(0,1)$ 的特征函数（第12章已用配方法算出）。由定理 14.7（Lévy 连续性定理），式（14.20）蕴含 $Z_n\xrightarrow{\ d\ }\mathcal N(0,1)$，即式（14.19）。

□

**注记（三点解读）**

其一，定理 14.12 是「依分布收敛＋特征函数」这一范式的标准样板：把和式的分布问题化为特征函数的乘积问题，用 Taylor 展开提取主导项，最后靠连续性定理把逐点收敛翻译回分布收敛。第二步的取对数是必要的技术环节——直接对 $(1+w_n/n)^n$ 用二项式展开会遇到组合数与高阶余项的繁琐估计，而对数把乘积变成和，只需 $|w_n/n|$ 充分小这一条件。

其二，定理 14.12 与定理 14.10 并不矛盾。$\bar X_n\to\mu$ 几乎必然，而 $\sqrt n(\bar X_n-\mu)$ 却依分布收敛到非退化的正态律：前者说的是路径逐点趋于常数，后者说的是偏差在放大 $\sqrt n$ 倍后仍有稳定的随机波动。两者共同构成「一阶确定性、二阶随机性」的完整图景。

其三，实践中 $\sigma$ 未知。由例 14.4 的结论 $S_n^2\xrightarrow{\ \mathbb P\ }\sigma^2$ 与连续映射定理，$S_n\xrightarrow{\ \mathbb P\ }\sigma$；再由命题 14.8（Slutsky），

$$T_n=\frac{\sqrt n(\bar X_n-\mu)}{S_n}=\frac{\sigma}{S_n}\cdot Z_n\xrightarrow{\ d\ }\mathcal N(0,1).$$

这就是大样本 $t$ 统计量渐近标准正态的依据（第20章），它把不可用的枢轴量 $\sqrt n(\bar X_n-\mu)/\sigma$ 替换为可计算的 $T_n$，代价是结论从精确的 $t$ 分布退化为渐近的正态分布。
**定理 14.13（Lindeberg–Feller 中心极限定理）**

对每个 $n$，设 $X_{n,1},\dots,X_{n,n}$ 相互独立（不必同分布），$\mathbb E X_{n,k}=\mu_{n,k}$，$\operatorname{Var}(X_{n,k})=\sigma_{n,k}^2<\infty$。记 $Y_{n,k}=X_{n,k}-\mu_{n,k}$，$s_n^2=\sum_{k=1}^{n}\sigma_{n,k}^2$，$Z_n=\frac1{s_n}\sum_{k=1}^{n}Y_{n,k}$。若对每个 $\varepsilon>0$ 都有 Lindeberg 条件

$$L_n(\varepsilon):=\frac1{s_n^2}\sum_{k=1}^{n}\mathbb E\bigl[Y_{n,k}^2\mathbf 1\{|Y_{n,k}|>\varepsilon s_n\}\bigr]\longrightarrow0,\tag{14.21}$$

则 $Z_n\xrightarrow{\ d\ }\mathcal N(0,1)$。反之，若 $Z_n\xrightarrow{\ d\ }\mathcal N(0,1)$ 且 Feller 条件

$$\max_{1\le k\le n}\frac{\sigma_{n,k}^2}{s_n^2}\longrightarrow0\tag{14.22}$$

成立，则式（14.21）成立。于是 Lindeberg 条件与「中心极限定理加 Feller 条件」等价。

**证明思路**

正向部分的证明完全沿用定理 14.12 的特征函数范式，只是把「一个公共特征函数的 $n$ 次幂」换成「$n$ 个不同特征函数的乘积」。记 $\varphi_{n,k}(u)=\mathbb E e^{iuY_{n,k}}$，则 $\varphi_{Z_n}(t)=\prod_{k=1}^{n}\varphi_{n,k}(t/s_n)$。核心是初等不等式 $|e^{ix}-1-ix+x^2/2|\le\min(|x|^3/6,\,x^2)$，它给出：对任意截断水平 $a>0$，

$$\bigl|\varphi_{n,k}(u)-1+\tfrac{u^2}{2}\sigma_{n,k}^2\bigr|\le\frac{|u|^3}{6}\mathbb E\bigl[|Y_{n,k}|^3\mathbf 1\{|Y_{n,k}|\le a\}\bigr]+u^2\,\mathbb E\bigl[Y_{n,k}^2\mathbf 1\{|Y_{n,k}|>a\}\bigr].$$

取 $u=t/s_n$、$a=\varepsilon s_n$。在 $\{|Y_{n,k}|\le\varepsilon s_n\}$ 上 $|Y_{n,k}|\le\varepsilon s_n$，故第一项不超过 $(|t|^3\varepsilon/6)\cdot\mathbb E[Y_{n,k}^2/s_n^2]$。对 $k$ 求和并利用 $\sum_k\sigma_{n,k}^2/s_n^2=1$：

$$\sum_{k=1}^{n}\Bigl|\varphi_{n,k}\Bigl(\frac t{s_n}\Bigr)-1+\frac{t^2\sigma_{n,k}^2}{2s_n^2}\Bigr|\le\frac{|t|^3\varepsilon}{6}+t^2L_n(\varepsilon).$$

先取 $\varepsilon$ 充分小使 $|t|^3\varepsilon/6<\eta/2$，再取 $n$ 充分大使 $L_n(\varepsilon)<\eta/(2t^2)$，即得该和小于任意 $\eta>0$。由三角不等式，$\sum_k|\varphi_{n,k}(t/s_n)-1|\le\eta+t^2/2$，故每个因子都靠近 $1$。再用初等不等式「若 $|a_k|\le1$、$|b_k|\le1$，则 $|\prod a_k-\prod b_k|\le\sum|a_k-b_k|$」，取 $b_k=1-t^2\sigma_{n,k}^2/(2s_n^2)$，得

$$\Bigl|\varphi_{Z_n}(t)-\prod_{k=1}^{n}\Bigl(1-\frac{t^2\sigma_{n,k}^2}{2s_n^2}\Bigr)\Bigr|\le\eta .$$

注意到 Lindeberg 条件本身蕴含 Feller 条件：对每个 $k$，

$$\frac{\sigma_{n,k}^2}{s_n^2}\le\varepsilon^2+\frac1{s_n^2}\mathbb E\bigl[Y_{n,k}^2\mathbf 1\{|Y_{n,k}|>\varepsilon s_n\}\bigr]\le\varepsilon^2+L_n(\varepsilon),$$

令 $n\to\infty$ 再令 $\varepsilon\downarrow0$ 得式（14.22）。于是 $c_{n,k}:=t^2\sigma_{n,k}^2/(2s_n^2)$ 满足 $\max_k c_{n,k}\to0$、$\sum_k c_{n,k}=t^2/2$，从而 $\sum_k\log(1-c_{n,k})=-t^2/2+O(\max_k c_{n,k})\to-t^2/2$，乘积趋于 $e^{-t^2/2}$。由定理 14.7 完成正向证明。

反向部分（Feller 定理）的实质内容是：中心极限定理加上 Feller 条件可以排除「罕见巨跳」这一唯一可能破坏 Lindeberg 条件的机制。有一个立即可得的结论：由 Markov 不等式，

$$\mathbb P(|Y_{n,k}|>\varepsilon s_n)\le\frac{\sigma_{n,k}^2}{\varepsilon^2s_n^2},$$

故 Feller 条件单独就给出 $\max_k\mathbb P(|Y_{n,k}|>\varepsilon s_n)\to0$，即所谓**一致渐近可忽略性**。但从概率小推不出二阶矩贡献小，还需中心极限定理所提供的一致可积性。严格的完整证明要用子列论证与 $\{Z_n^2\}$ 的一致可积性（由 $Z_n^2\xrightarrow{\ d\ }\chi^2_1$ 且 $\mathbb E Z_n^2=1\to\mathbb E\chi_1^2=1$ 得到），细节见 Petrov《独立随机变量之和的极限定理》，此处只给出必要性为何不可省的直观论证，见本节后文例 14.6 的构造。

□

**注记（Lyapunov 条件及其蕴含 Lindeberg 条件）**

若在定理 14.13 的设定下存在某个 $\delta>0$，使 Lyapunov 条件

$$\frac1{s_n^{2+\delta}}\sum_{k=1}^{n}\mathbb E|Y_{n,k}|^{2+\delta}\longrightarrow0\tag{14.23}$$

成立，则 Lindeberg 条件式（14.21）成立，从而 $Z_n\xrightarrow{\ d\ }\mathcal N(0,1)$。

**证明**

在事件 $\{|Y_{n,k}|>\varepsilon s_n\}$ 上 $(|Y_{n,k}|/(\varepsilon s_n))^{\delta}>1$，故

$$\mathbb E\bigl[Y_{n,k}^2\mathbf 1\{|Y_{n,k}|>\varepsilon s_n\}\bigr]\le\mathbb E\Bigl[Y_{n,k}^2\Bigl(\frac{|Y_{n,k}|}{\varepsilon s_n}\Bigr)^{\!\delta}\Bigr]=\frac{\mathbb E|Y_{n,k}|^{2+\delta}}{\varepsilon^{\delta}s_n^{\delta}},$$

求和除以 $s_n^2$ 即得 $L_n(\varepsilon)\le\varepsilon^{-\delta}\cdot s_n^{-(2+\delta)}\sum_k\mathbb E|Y_{n,k}|^{2+\delta}\to0$。

□

Lyapunov 条件的优点是可直接计算（最常用 $\delta=1$，即三阶绝对矩），缺点是比 Lindeberg 条件强；实际验证时先试 Lyapunov，失败后再回到 Lindeberg 条件，因为后者才是刻画性的。在独立同分布且方差有限的情形，Lindeberg 条件自动成立：$L_n(\varepsilon)=\sigma^{-2}\mathbb E[Y^2\mathbf 1\{|Y|>\varepsilon\sigma\sqrt n\}]\to0$，由控制收敛定理（被 $Y^2/\sigma^2$ 控制）立即得到，这正是定理 14.12 是定理 14.13 特例的原因。
**例 14.5**

设 $X\sim\mathrm{Bin}(100,\tfrac12)$。用中心极限定理近似 $\mathbb P(X\ge55)$、$\mathbb P(X\ge60)$、$\mathbb P(X\ge65)$，分别在不作与作连续性校正两种做法下计算，并与精确值定量比较；再对 $Y\sim\mathrm{Poisson}(100)$ 重复 $\mathbb P(Y\ge110)$ 与 $\mathbb P(Y\ge115)$ 的计算。

**解**

把 $X$ 写成 $X=\sum_{i=1}^{100}B_i$，其中 $B_i$ 独立同分布，$\mathbb P(B_i=1)=\mathbb P(B_i=0)=\tfrac12$。则 $\mathbb E B_i=\tfrac12$，$\operatorname{Var}(B_i)=\tfrac14$，由定理 14.12，

$$\frac{X-50}{5}\xrightarrow{\ d\ }\mathcal N(0,1).$$

**不作校正。** 直接把 $X$ 当作连续变量，$\mathbb P(X\ge k)\approx1-\Phi\bigl((k-50)/5\bigr)$。三个值依次为 $1-\Phi(1)=0.158655$、$1-\Phi(2)=0.022750$、$1-\Phi(3)=0.001350$。精确值由二项概率直接求和得到：$0.184101$、$0.028444$、$0.001759$。相对误差分别为 $-13.8\%$、$-20.0\%$、$-23.3\%$，一律低估，且越往尾部低估越严重。

**作连续性校正。** $X$ 取值于格点 $\{0,1,\dots,100\}$，事件 $\{X\ge k\}$ 与 $\{X\ge k-\tfrac12\}$ 完全相同，而后者才对应连续近似中区间 $[k-\tfrac12,\infty)$ 的概率质量。因此正确的用法是

$$\mathbb P(X\ge k)=\mathbb P\Bigl(X\ge k-\tfrac12\Bigr)\approx1-\Phi\Bigl(\frac{k-\tfrac12-np}{\sqrt{np(1-p)}}\Bigr).$$

代入得：$\mathbb P(X\ge55)\approx1-\Phi(0.9)=0.184060$，精确值 $0.184101$，相对误差 $-0.02\%$；$\mathbb P(X\ge60)\approx1-\Phi(1.9)=0.028717$，精确值 $0.028444$，相对误差 $+0.96\%$；$\mathbb P(X\ge65)\approx1-\Phi(2.9)=0.001866$，精确值 $0.001759$，相对误差 $+6.1\%$。校正把误差的量级从 $O(n^{-1/2})$ 降到 $O(n^{-1})$：无校正时绝对误差约为 $0.399/\sqrt n$（见例 14.7 对格点分布锯齿项的分析），校正恰好抵消了这个主导项，剩下的是二阶项。

同理，$\mathbb P(X\le k)\approx\Phi\bigl((k+\tfrac12-np)/\sqrt{np(1-p)}\bigr)$，$\mathbb P(a\le X\le b)\approx\Phi\bigl((b+\tfrac12-np)/\sqrt{npq}\bigr)-\Phi\bigl((a-\tfrac12-np)/\sqrt{npq}\bigr)$。这些规则只对格点分布有意义；对连续分布作校正反而会人为引入 $O(n^{-1/2})$ 的偏差。

**Poisson 情形。** 令 $Y=\sum_{i=1}^{100}N_i$，$N_i$ 独立同分布于 $\mathrm{Poisson}(1)$，$\mathbb E N_i=\operatorname{Var}(N_i)=1$，故 $(Y-100)/10\xrightarrow{\ d\ }\mathcal N(0,1)$。精确值由 Poisson 概率求和给出：$\mathbb P(Y\ge110)=0.170560$，$\mathbb P(Y\ge115)=0.075897$。无校正的近似为 $1-\Phi(1)=0.158655$（相对误差 $-6.98\%$）与 $1-\Phi(1.5)=0.066807$（$-11.98\%$）；含校正的近似为 $1-\Phi(0.95)=0.171056$（$+0.29\%$）与 $1-\Phi(1.45)=0.073529$（$-3.12\%$）。Poisson 分布在 $\lambda=100$ 时的偏度为 $\lambda^{-1/2}=0.1$，其残余误差略大于对称二项情形，与 $\rho/\sigma^3$ 更大（收敛更慢）的预期一致。

这个例子给出三条实践结论。第一，只要 $np$ 与 $n(1-p)$ 都不小于 $10$，正态近似在中心区域（偏离均值 $1$ 到 $2$ 个标准差）已经相当好；第二，在尾部，尤其是相对误差被小分母放大的区域，无校正的正态近似可能错到 $20\%$ 以上，用它来设定 VaR 阈值或止损线是不可接受的；第三，尾部概率的绝对量级若小于 $10^{-3}$，应改用精确算法、递推公式或 Chernoff 型指数界（第11章），因为此时中心极限定理提供的 $O(n^{-1/2})$ 精度已经与待估量本身同阶。
**例 14.6**

（甲）设 $X_1,X_2,\dots$ 独立同分布于标准 Cauchy 分布，密度 $f(x)=1/[\pi(1+x^2)]$，特征函数 $\varphi(t)=e^{-|t|}$。证明 $\bar X_n$ 与 $X_1$ 同分布，说明弱大数定律与 $\sqrt n$ 标度的中心极限定理均失效，并指出正确的规范化与稳定分布。

（乙）设 $Y_1,Y_2,\dots$ 独立同分布，密度 $f(y)=1.1(1+|y|)^{-3.2}$。验证 $\mathbb E Y_1^2<\infty$ 而 $\mathbb E|Y_1|^3=\infty$，从而 Lyapunov 条件在 $\delta=1$ 时不成立；证明中心极限定理仍然成立，并直接验证 Lindeberg 条件。

（丙）构造一个满足 Feller 条件但不满足 Lindeberg 条件的三角阵，说明其部分和不收敛到正态分布，以此说明 Lindeberg 条件在定理 14.13 的反向断言中不可省去。

**解**

（甲）由独立同分布与 $\varphi(t)=e^{-|t|}$，

$$\varphi_{\bar X_n}(t)=\Bigl[\varphi\Bigl(\frac tn\Bigr)\Bigr]^{n}=\bigl[e^{-|t|/n}\bigr]^{n}=e^{-|t|}=\varphi_{X_1}(t),$$

由特征函数的唯一性，$\bar X_n\overset{d}{=}X_1$ 对每个 $n$ 成立。这立刻排除了弱大数定律：若 $\bar X_n\xrightarrow{\ \mathbb P\ }c$，则由 14.3 节的论证 $\bar X_n\xrightarrow{\ d\ }c$，与 $\bar X_n$ 恒等于非退化的 Cauchy 分布矛盾。这与定理 14.9 并不冲突，因为 Cauchy 分布的一阶矩不存在：$\mathbb E|X_1|=\int|x|/[\pi(1+x^2)]dx=\infty$，定理的假设被违反。

再看 $\sqrt n$ 标度：$\varphi_{S_n/\sqrt n}(t)=[\varphi(t/\sqrt n)]^n=e^{-\sqrt n|t|}$。对 $t\ne0$ 它趋于 $0$，而极限函数在 $t=0$ 处不连续，故由定理 14.7，$\{S_n/\sqrt n\}$ 根本不依分布收敛（序列不紧，质量逃逸到无穷）。正确的标度是 $n^{1/\alpha}$，此处 $\alpha=1$，即 $S_n/n$。一般地，若 $\varphi(t)=\exp(-|t|^{\alpha})$（$0<\alpha\le2$，称为对称 $\alpha$-稳定分布），则

$$\varphi_{S_n}(t)=e^{-n|t|^{\alpha}}=\exp\bigl(-|n^{1/\alpha}t|^{\alpha}\bigr)=\varphi_{n^{1/\alpha}X_1}(t),\qquad\text{即}\quad S_n\overset{d}{=}n^{1/\alpha}X_1 .$$

稳定分布族对求和封闭，规范化指数 $\alpha$ 直接决定和的增长速率：$\alpha=2$ 时 $S_n\overset{d}{=}\sqrt nX_1$，回到高斯情形；$\alpha<2$ 时增长快于 $\sqrt n$。由第11章的矩判据，$\alpha$-稳定分布满足 $\mathbb E|X|^p<\infty$ 当且仅当 $p<\alpha$，故 $\alpha<2$ 恰好等价于方差无穷。Gnedenko–Kolmogorov 广义中心极限定理断言：独立同分布随机变量之和经适当中心化与规范化后收敛到非退化极限，当且仅当极限是稳定分布，而 $\sqrt n$ 规范化对应 $\alpha=2$ 这一特例。因此「方差无穷」不是技术缺陷，而是换了一个极限律：Mandelbrot 对棉花价格与汇率收益的早期估计给出 $\alpha\in(1.2,1.8)$，日频股票收益的尾指数估计通常也落在 $2$ 到 $3$ 之间（意味着方差勉强有限而四阶矩不存在），这些经验事实将在第29章的厚尾条件分布与第32章的极值理论中重新出现。

（乙）密度关于原点对称，故 $\mathbb E Y_1=0$。二阶矩为

$$\mathbb E Y_1^2=2\cdot1.1\int_0^{\infty}\frac{y^2}{(1+y)^{3.2}}\,dy=2.2\,B(3,0.2)=2.2\cdot\frac{\Gamma(3)\Gamma(0.2)}{\Gamma(3.2)}=2.2\cdot\frac{2}{0.528}=\frac{25}{3},$$

其中用了 $\Gamma(3.2)=2.2\times1.2\times0.2\times\Gamma(0.2)=0.528\,\Gamma(0.2)$。三阶绝对矩发散：当 $y\to\infty$ 时被积函数 $1.1y^3(1+y)^{-3.2}\sim1.1y^{-0.2}$，而 $\int^{\infty}y^{-0.2}dy=\infty$。于是 $\rho:=\mathbb E|Y_1|^3=\infty$，$s_n^3=(25n/3)^{3/2}$，Lyapunov 条件（14.23）在 $\delta=1$ 时左端为 $\infty$，不成立。

但中心极限定理依然成立：$\mathbb E Y_1^2=25/3<\infty$，直接套用定理 14.12 得 $\sqrt n\,\bar Y_n/\sqrt{25/3}\xrightarrow{\ d\ }\mathcal N(0,1)$。若要在定理 14.13 的框架内验证，Lindeberg 条件退化为

$$L_n(\varepsilon)=\frac1{n\sigma^2}\sum_{k=1}^{n}\mathbb E\bigl[Y_k^2\mathbf 1\{|Y_k|>\varepsilon\sigma\sqrt n\}\bigr]=\frac1{\sigma^2}\,\mathbb E\bigl[Y_1^2\mathbf 1\{|Y_1|>\varepsilon\sigma\sqrt n\}\bigr]\longrightarrow0,$$

极限由控制收敛定理得到（被可积函数 $Y_1^2/\sigma^2$ 控制，且指示函数逐点趋于零）。这说明 Lyapunov 条件只是充分条件：它因三阶矩发散而失效，Lindeberg 条件却仍然成立。顺带指出，对 $\delta<0.2$，$\mathbb E|Y_1|^{2+\delta}<\infty$，此时 Lyapunov 条件成立，所以「Lyapunov 条件不成立」总是相对于某个具体的 $\delta$ 而言的。

（丙）对每个 $n$，令 $Y_{n,1},\dots,Y_{n,n}$ 独立同分布，取 $M_n\to\infty$，

$$\mathbb P(Y_{n,k}=\pm M_n)=\frac1{2nM_n^2},\qquad\mathbb P(Y_{n,k}=0)=1-\frac1{nM_n^2}.$$

则 $\sigma_{n,k}^2=M_n^2/(nM_n^2)=1/n$，$s_n^2=1$，故 Feller 条件（14.22）成立：$\max_k\sigma_{n,k}^2/s_n^2=1/n\to0$。但对任意 $\varepsilon<M_n$，

$$L_n(\varepsilon)=\sum_{k=1}^{n}\mathbb E\bigl[Y_{n,k}^2\mathbf 1\{|Y_{n,k}|>\varepsilon\}\bigr]=n\cdot M_n^2\cdot\frac1{nM_n^2}=1,$$

Lindeberg 条件以最大幅度失败（对任意固定的 $\varepsilon$，当 $M_n>\varepsilon$ 时上式即为 $1$）。取 $M_n=\sqrt n$，则 $\mathbb P(Y_{n,k}\ne0)=1/n^2$，故 $\mathbb P(Z_n=0)=(1-1/n^2)^n\to1$，其中 $Z_n=\sum_k Y_{n,k}$；于是 $Z_n\xrightarrow{\ \mathbb P\ }0$，$Z_n\xrightarrow{\ d\ }0$，尽管 $\operatorname{Var}(Z_n)=1$ 对每个 $n$ 都成立。这就是「罕见巨跳」：方差完全由概率极小的巨大取值贡献，正态极限被退化极限取代。它同时说明 Feller 条件不足以推出中心极限定理，也说明一旦中心极限定理成立，Lindeberg 条件就必须成立——这正是定理 14.13 反向断言的内容。
## 14.5 收敛速率与 Berry–Esseen 定理

定理 14.12 与定理 14.13 都是纯渐近结论：它们断言 $n\to\infty$ 时分布函数收敛，却对任何有限的 $n$ 不提供误差信息。而应用者关心的恰恰是有限 $n$：置信区间的覆盖率偏差、模拟所需的样本量、回测统计量的近似质量，都取决于「近似误差有多大」。Berry–Esseen 定理填补了这一空缺，它给出分布函数一致误差的显式上界，且上界只依赖可直接计算的矩。

**定理 14.14（Berry–Esseen）**

设对每个 $n$，$X_{n,1},\dots,X_{n,n}$ 相互独立，$\mathbb E X_{n,k}=\mu_{n,k}$，$\operatorname{Var}(X_{n,k})=\sigma_{n,k}^2$，$\rho_{n,k}=\mathbb E|X_{n,k}-\mu_{n,k}|^3<\infty$。记 $s_n^2=\sum_k\sigma_{n,k}^2>0$，$Z_n=s_n^{-1}\sum_k(X_{n,k}-\mu_{n,k})$，$F_n$ 为 $Z_n$ 的分布函数。则存在绝对常数 $C$，使

$$\sup_{x\in\mathbb R}\bigl|F_n(x)-\Phi(x)\bigr|\le C\,\frac{\sum_{k=1}^{n}\rho_{n,k}}{s_n^{3}}.\tag{14.24}$$

目前已知最好的普适常数满足 $C\le0.4748$（Shevtsova）；独立同分布情形可取 $C\le0.4690$，此时式（14.24）化为

$$\sup_{x\in\mathbb R}\Bigl|\mathbb P\Bigl(\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\le x\Bigr)-\Phi(x)\Bigr|\le C\,\frac{\mathbb E|X_1-\mu|^3}{\sigma^3\sqrt n}=O\Bigl(\frac{\rho}{\sigma^3\sqrt n}\Bigr),$$

其中 $\rho=\mathbb E|X_1-\mu|^3$。无量纲比值 $\rho/\sigma^3$ 称为分布的**Berry–Esseen 比**，它衡量该分布偏离正态的程度，因而决定收敛快慢。

**证明思路**

第一步是 Esseen 光滑化引理。设 $F$ 为任一分布函数，$G$ 为导数有界（$\sup|G'|\le M$）的分布函数，$\varphi$、$\gamma$ 分别为其特征函数，则对任意 $T>0$，

$$\sup_x|F(x)-G(x)|\le\frac1\pi\int_{-T}^{T}\frac{|\varphi(t)-\gamma(t)|}{|t|}\,dt+\frac{C_0M}{T},$$

$C_0$ 为绝对常数。引理的证明用一个非负核 $K_T(y)=(1-\cos Ty)/(\pi Ty^2)$（其积分为一、Fourier 变换支撑在 $[-T,T]$）把 $F-G$ 的逐点上确界转化为卷积量，再对卷积量作 Fourier 反演；核的支撑性质使积分截断在 $T$ 处，而 $G$ 的光滑性把「截断带来的尾部损失」控制在 $C_0M/T$。取 $G=\Phi$ 时 $M=1/\sqrt{2\pi}$。这一步是本定理与定理 14.12 的本质区别：Lévy 连续性定理只给出定性收敛，无法定量，而定量化必须绕道 Fourier 反演。

第二步是特征函数的三阶展开。因为 $\rho_{n,k}<\infty$，不必像定理 14.13 那样截断，直接由 $|e^{ix}-1-ix+x^2/2|\le|x|^3/6$ 得

$$\Bigl|\mathbb E e^{iuY_{n,k}}-1+\frac{u^2\sigma_{n,k}^2}{2}\Bigr|\le\frac{|u|^3\rho_{n,k}}{6},\qquad Y_{n,k}=X_{n,k}-\mu_{n,k}.$$

令 $u=t/s_n$ 并对 $k$ 求和，再沿定理 14.13 的乘积—对数路线，可得：当 $|t|\le T_0:=s_n^3/(4\sum_k\rho_{n,k})$ 时，

$$\bigl|\varphi_{Z_n}(t)-e^{-t^2/2}\bigr|\le e^{-t^2/4}\cdot\frac{|t|^3}{6}\cdot\frac{\sum_k\rho_{n,k}}{s_n^3}.$$

$T_0$ 的限制来自「$|w_n|$ 足够小才能展开对数」，这也解释了为什么误差界里出现的是三阶矩之和除以 $s_n^3$。

第三步把两步合并：取 $T=T_0$，光滑化引理的第一项由 $\int|t|^2e^{-t^2/4}dt<\infty$ 控制为常数倍的 $\sum\rho_{n,k}/s_n^3$，第二项为 $C_0M/T_0=C_0M\cdot4\sum\rho_{n,k}/s_n^3$，两者同阶，相加即得式（14.24）。

□

**注记（常数与阶的不可改进性）**

阶 $n^{-1/2}$ 不可改进。取 $X_k$ 为对称 Bernoulli（$\mathbb P(X_k=\pm1)=\tfrac12$），则 $\rho/\sigma^3=1$，且数值上 $\sqrt n\sup_x|F_n(x)-\Phi(x)|$ 稳定地趋于 $1/\sqrt{2\pi}=0.3989$（见例 14.7 的分析）。因此任何普适常数都必须满足 $C\ge0.3989$；更精细的分布构造把下界推到约 $0.4097$，而上界为 $0.4748$，两者之比约 $1.16$。这意味着 Berry–Esseen 定理在阶与常数两方面都已接近最优，任何实质改进都必须引入额外的分布假设。

需要强调的是，式（14.24）度量的是分布函数的一致（Kolmogorov）距离，它对**指示函数型泛函**是最坏情形的界。若关心的是光滑泛函，速率可以更快：Edgeworth 展开给出带 $1/n$ 阶修正项的渐近级数；对格点分布作连续性校正后，例 14.5 中的相对误差也确实从 $O(n^{-1/2})$ 降到 $O(n^{-1})$。反之，若只有二阶矩而无三阶矩，仍有一致收敛但**不存在统一速率**：对任何给定的趋于零的序列 $\{a_n\}$，都能构造方差有限的分布使误差大于 $a_n$ 无穷多次。这是「矩条件决定速率」这一原则的极端体现。

在样本量选择上，式（14.24）给出显式准则：要使正态近似的分布函数误差不超过 $\delta$，需

$$n\ge\Bigl(\frac{C\rho}{\sigma^3\delta}\Bigr)^{\!2}.$$

以对称 Bernoulli 为例（$\rho/\sigma^3=1$，$C=0.4748$），要求 $\delta=0.01$ 需 $n\ge(47.48)^2\approx2254$；要求 $\delta=0.005$ 需 $n\ge9016$。样本量与精度平方成反比，这一 $1/\delta^2$ 律将在 14.6 节以蒙特卡洛误差的形式反复出现。
**例 14.7**

对 Bernoulli 分布与指数分布计算 Berry–Esseen 比 $\rho/\sigma^3$，对 Bernoulli 情形算出精确的 Kolmogorov 距离并与定理 14.14 的上界比较，解释上界的紧致性与误差的几何来源。

**解**

**第一步，计算 $\rho/\sigma^3$。** 设 $X\sim\mathrm{Bernoulli}(p)$，$q=1-p$。则 $\sigma^2=pq$，

$$\rho=\mathbb E|X-p|^3=p\,q^3+q\,p^3=pq\bigl(p^2+q^2\bigr),\qquad\frac{\rho}{\sigma^3}=\frac{p^2+q^2}{\sqrt{pq}}.$$

代入得 $p=\tfrac12$ 时为 $(0.25+0.25)/0.5=1$；$p=0.1$ 时为 $(0.81+0.01)/0.3=2.7333$；$p=0.01$ 时为 $(0.9801+0.0001)/0.0995=9.851$。可见 $p\to0$ 时该比值以 $1/\sqrt p$ 的速率发散，这正是稀有事件场合（Poisson 近似区域）正态收敛缓慢的定量原因。对 $X\sim\mathrm{Exp}(1)$，$\mu=\sigma=1$，

$$\rho=\int_0^1(1-x)^3e^{-x}dx+\int_1^{\infty}(x-1)^3e^{-x}dx=e^{-1}(6-2e)+e^{-1}\Gamma(4)=\frac{12}{e}-2=2.4146,$$

故上界为 $0.4748\times2.4146/\sqrt n=1.1464/\sqrt n$；$n=30,100,300$ 时分别为 $0.2093$、$0.1146$、$0.0662$。指数分布是连续的，不存在下文将出现的格点锯齿项，其误差主要由偏度 $\gamma_1=2$ 驱动，上界因此偏保守，但它是一个不依赖任何未知量的显式保证。

**第二步，精确计算 Bernoulli 情形的 Kolmogorov 距离。** 令 $S_n\sim\mathrm{Bin}(n,p)$，$Z_n=(S_n-np)/\sqrt{npq}$，则 $Z_n$ 取值于格点 $z_k=(k-np)/\sqrt{npq}$，$k=0,\dots,n$，其分布函数为阶梯函数。由于 $\Phi$ 连续且单调，$|F_n(x)-\Phi(x)|$ 的上确界必在某个格点 $z_k$ 处（取 $F_n(z_k)$）或在其左极限处（取 $F_n(z_k^-)$）达到。逐一比较这 $2(n+1)$ 个候选值即可得到精确的 $d_n=\sup_x|F_n(x)-\Phi(x)|$。数值结果为：

$p=\tfrac12$ 时，$d_{10}=0.12305$，$d_{30}=0.07223$，$d_{100}=0.03979$，$d_{300}=0.02301$；相应地 $\sqrt n\,d_n=0.3891,\,0.3956,\,0.3979,\,0.3986$，单调升向 $1/\sqrt{2\pi}=0.39894$。定理 14.14 的上界为 $0.4748/\sqrt n$，即 $0.15014,\,0.08669,\,0.04748,\,0.02741$，与真实距离之比为 $1.22,\,1.20,\,1.19,\,1.19$。上界只比真实误差大约 $20\%$，说明定理在这一场合几乎不可再改进。

$p=0.1$ 时，$d_{10}=0.23610$，$d_{30}=0.14744$，$d_{100}=0.08316$，$d_{300}=0.04842$；$\sqrt n\,d_n=0.7466,\,0.8076,\,0.8316,\,0.8386$，趋于约 $0.84$。上界为 $0.4748\times2.7333/\sqrt n=1.2978/\sqrt n$，$n=100$ 时为 $0.12978$，真实值 $0.08316$，比值 $1.56$。

**第三步，解释误差的几何来源。** 对称 Bernoulli 情形标准化后的格点间距为 $h=1/\sigma=2$。由局部极限定理，格点处的概率质量约为 $p_k\approx h\varphi(z_k)/\sqrt n$。在 $z_k$ 处 $F_n$ 有一个高度约 $h\varphi(z_k)/\sqrt n$ 的跳跃，而 $\Phi$ 连续，因此在跳跃点左右两侧 $F_n-\Phi$ 分别偏离约半个跳跃高度，最大偏离发生在 $\varphi$ 最大处即 $z_k\approx0$：

$$d_n\approx\frac{h}{2}\cdot\frac{\varphi(0)}{\sqrt n}=\frac{2}{2}\cdot\frac{0.39894}{\sqrt n}=\frac{0.39894}{\sqrt n},$$

与数值极限完全吻合。这解释了为什么常数下界恰为 $1/\sqrt{2\pi}$：它来自格点分布的锯齿结构，而非分布的形状。$p=0.1$ 时 $h=1/\sqrt{0.09}=3.3333$，锯齿项给出 $0.6649/\sqrt n$；偏度 $\gamma_1=(1-2p)/\sqrt{pq}=2.6667$ 带来的一阶修正项量级为 $(\gamma_1/6)\sup_z|(z^2-1)\varphi(z)|=(0.4444)(0.39894)=0.1773/\sqrt n$；两项相加约 $0.842/\sqrt n$，与观测到的 $0.84$ 一致（这是量级估计而非严格界）。

**第四步，实践含义。** 在应用定理 14.14 时应先估计 $\rho/\sigma^3$：对称、轻尾的分布该比值接近 $1$，正态近似在 $n$ 达到几十时已相当可靠；偏斜或厚尾分布该比值迅速增大，所需样本量按平方增长。特别地，自由度为 $\nu$ 的 Student-$t$ 分布满足 $\mathbb E|X|^3<\infty$ 当且仅当 $\nu>3$，且 $\rho/\sigma^3$ 随 $\nu\downarrow3$ 急剧发散；当 $\nu\le3$ 时 Berry–Esseen 定理根本不适用，此时甚至连统一的收敛速率都不存在（14.5 节末尾的结论）。金融日收益的经验峰度常在 $5$ 到 $20$ 之间，对应的 $\rho/\sigma^3$ 远大于 $1$，因此「$n=30$ 就够大」这一常见说法在金融数据上通常过于乐观。
## 14.6 量化研究中的极限定理

极限定理在量化研究中的地位是双重的：它既是蒙特卡洛模拟与统计推断赖以成立的理论基础，也是实践中最容易被误用的地方。理解这种双重性，需要把本章的抽象结论翻译成关于误差、样本量与模型风险的具体陈述。

蒙特卡洛方法的一切数值实现都可以写成 $\hat\theta_N=\frac1N\sum_{i=1}^{N}g(X_i)$ 的形式，其中 $X_i$ 为独立抽样、$g$ 为待估泛函（期权 payoff、损失指示函数等）。由定理 14.10，$\hat\theta_N\to\theta=\mathbb E g(X)$ 几乎必然，这是模拟算法收敛性的根据；由定理 14.12，只要 $\operatorname{Var}(g(X))=\sigma_g^2<\infty$，就有 $\sqrt N(\hat\theta_N-\theta)/\sigma_g\xrightarrow{\ d\ }\mathcal N(0,1)$，从而得到标准误与置信区间

$$\hat\theta_N\pm z_{1-\alpha/2}\,\frac{S_N}{\sqrt N},\qquad S_N^2=\frac1{N-1}\sum_{i=1}^{N}(g(X_i)-\hat\theta_N)^2.\tag{14.25}$$

用 $S_N$ 替换未知的 $\sigma_g$ 由命题 14.8（Slutsky）保证不改变渐近分布，这一点与 14.4 节末尾的 $t$ 统计量论证完全相同。式（14.25）的核心信息是误差按 $1/\sqrt N$ 收缩：要把精度提高一倍须把模拟次数增至四倍，提高一个数量级须增至一百倍。方差缩减技术（对偶变量、控制变量、重要性采样）的作用是减小常数 $\sigma_g$ 而不改变 $1/\sqrt N$ 的阶；拟蒙特卡洛用低差异序列替代独立抽样，才能把阶改进到接近 $1/N$，但其误差分析不再由本章的经典中心极限定理给出。第18章将系统展开这些方法。

回测与因子研究中的统计量几乎都是样本矩的连续函数。信息系数 IC 是因子值与未来收益的样本相关系数，夏普比率是样本均值与样本标准差之比，回归系数是样本二阶矩矩阵的解。对这类统计量，标准做法是先由多元中心极限定理得到底层矩向量的渐近正态性，再由连续映射定理或 delta 方法把结果传递到统计量本身，得到形如 $\sqrt n(\hat\vartheta-\vartheta)\xrightarrow{\ d\ }\mathcal N(0,\tau^2)$ 的结论，进而构造 $t$ 检验与置信区间。第19章给出多元正态与 Wishart 分布的完整框架，第21章给出回归系数的精确与渐近分布，第34章给出夏普比率标准误的推导，它们全部以本章的定理 14.12 与命题 14.8 为出发点。

样本协方差矩阵的一致性同样由大数定律保证：$S_n=\frac1n\sum_k X_kX_k^\top\xrightarrow{\ \mathbb P\ }\Sigma$。多元中心极限定理进一步给出 $\sqrt n\,\mathrm{vec}(S_n-\Sigma)\xrightarrow{\ d\ }\mathcal N(0,V)$，其中 $V$ 由四阶矩构成。但在组合优化中，一致性的实际价值远低于理论上的安慰：最优权重正比于 $\Sigma^{-1}\mu$，求逆会把估计误差按条件数放大（第8章），当资产数 $p$ 与样本长度 $n$ 可比时，样本协方差矩阵的特征值系统性地偏离真值（Marchenko–Pastur 律），大特征值被高估、小特征值被低估。此时需要 $n,p\to\infty$ 的双重极限理论，经典中心极限定理已不适用；实践中则用收缩估计（第22、23章）替代直接求逆。

金融收益的经验分布远比正态分布厚尾，这直接冲击上述所有渐近论证。若尾指数大于 $2$（方差有限），中心极限定理成立，但 Berry–Esseen 比 $\rho/\sigma^3$ 很大，收敛极慢，$\sqrt n$ 律在可用样本量内往往尚未生效；若尾指数不超过 $2$（方差无穷），例 14.6 甲表明 $\sqrt n$ 标度是错误的，正确标度为 $n^{1/\alpha}$，极限是 $\alpha$-稳定分布，且方差、夏普比率这类二阶量在总体上根本不存在，样本方差也不收敛。此时式（14.25）给出的标准误公式失效，名义 $95\%$ 的区间实际覆盖率可能只有百分之七八十。

时间标度问题与此紧密相关。在收益独立同分布且方差有限的假设下，$t$ 期收益是 $t$ 个单期收益之和，故 $\operatorname{Var}(R_t)=t\,\sigma_1^2$，$\sigma_t=\sqrt t\,\sigma_1$，正态假设下 $\mathrm{VaR}_t=\sqrt t\,\mathrm{VaR}_1$。这就是业界通行的 $\sqrt t$ 规则，其依据是独立性加有限方差加中心极限定理。它的失效同样有明确的数学原因：波动率聚集（第29章）使收益不独立而平方收益正相关，多期方差增长快于线性，$\sqrt t$ 规则低估长期风险；均值回复使方差增长慢于线性，规则高估风险；厚尾情形下方差标度为 $t^{1/\alpha}$，由于 $\alpha<2$ 时 $t^{1/\alpha}>t^{1/2}$，规则系统性低估尾部风险；高频数据还叠加了微观结构噪声与非同步交易的影响。

小样本中滥用渐近结果是量化研究最常见的统计错误之一。渐近结论只在 $n\to\infty$ 时精确，而日频数据的典型样本量是几百到几千，且分布偏斜厚尾，Berry–Esseen 上界此时给出的数值（如例 14.7 中 $n=100$ 时的 $0.13$）远大于可接受的误差。因此任何依赖渐近分布的推断都应伴随有限样本校验：用蒙特卡洛模拟在假定或重采样分布下检验统计量的实际分布与名义分布的偏离，用 Bootstrap 与置换检验（第23章）替代解析标准误，用覆盖率模拟检验置信区间是否名副其实。原则是：**渐近定理用于说明方法的合理性，模拟用于确认它在当前样本量下的可用性。**

最后，中心极限定理描述的是和的**中心**行为，而风险管理关心的是**尾部**。例 14.5 已经显示，正态近似在尾部的相对误差迅速放大到 $20\%$ 以上；在 $10^{-4}$ 量级的分位数上，任何基于中心极限定理的外推都不可信。极值理论提供了另一条极限定理路线：Fisher–Tippett–Gnedenko 定理刻画极大值的极限分布族，与中心极限定理并列而非从属；广义 Pareto 分布刻画超阈值损失的分布，可直接用于高分位 VaR 与期望短缺（第32章）。这两条路线在尾指数 $\alpha$ 处汇合：$\alpha$ 同时决定矩的存在性（第11章）、和的规范化指数（本章）与极值分布的形状参数（第32章）。次序统计量与极值分布的基础见第12章。
**例 14.8**

某资产的日收益 $R_1,R_2,\dots$ 独立同分布，$\mathbb E R_1=\mu$，标准差 $\sigma=1\%$。研究者用样本均值 $\bar R_n$ 估计 $\mu$。（1）导出使 $95\%$ 置信区间半宽不超过 $\varepsilon=0.05\%$（五个基点）所需的最小样本量的一般公式并求其值，换算为年数（每年 $252$ 个交易日）；（2）若真实 $\mu=0.02\%$（每日两个基点），讨论该精度设定能否支持「$\mu>0$」的结论，并求出检验 $\mu=0$ 达到 $5\%$ 显著性所需的样本量；（3）若收益实为 $\alpha=1.5$ 的对称稳定分布，说明 $1/\sqrt n$ 标度失效并求出达到同等精度所需的样本量；（4）另有一蒙特卡洛定价问题，payoff $g(X)$ 的标准差为 $2$ 元，要使 $95\%$ 置信区间半宽不超过 $0.05$ 元，求模拟次数 $N$；若方差缩减把标准差降到 $0.5$ 元，$N$ 变为多少。

**解**

（1）由定理 14.12 与命题 14.8，$\sqrt n(\bar R_n-\mu)/S_n\xrightarrow{\ d\ }\mathcal N(0,1)$，故大样本 $95\%$ 置信区间为 $\bar R_n\pm1.96\,S_n/\sqrt n$，其半宽约为 $1.96\sigma/\sqrt n$。要求半宽不超过 $\varepsilon$，即

$$n\ge\Bigl(\frac{z_{1-\alpha/2}\,\sigma}{\varepsilon}\Bigr)^{\!2}.\tag{14.26}$$

代入 $z_{0.975}=1.95996$、$\sigma=0.01$、$\varepsilon=0.0005$：$n\ge(1.95996\times0.01/0.0005)^2=(39.199)^2=1536.6$，故最小样本量为 $n=1537$ 个交易日，约合 $1537/252=6.1$ 年。式（14.26）显示的平方律值得记住：$n=250$（一年）时半宽为 $1.96\times0.01/\sqrt{250}=0.124\%$，$n=1000$（四年）时为 $0.062\%$，$n=6000$（约二十四年）时才降到 $0.025\%$。精度提高十倍需要样本量增加一百倍。

（2）真实 $\mu=0.0002$，而置信区间半宽为 $0.0005$，半宽是待估参数绝对值的 $2.5$ 倍，因此该区间必然包含零，无法支持「$\mu>0$」的结论。这不是计算的失误，而是信噪比 $\mu/\sigma=0.02$ 太低的必然结果。要拒绝 $\mu=0$，需 $t$ 统计量 $\sqrt n\,\bar R_n/S_n$ 超过 $1.96$；在真实均值恰为 $\mu$ 时其期望约为 $\sqrt n\,\mu/\sigma$，故需

$$\sqrt n\ge1.96\,\frac{\sigma}{\mu}=1.96\times\frac{0.01}{0.0002}=98,\qquad n\ge9604\ \text{个交易日}\approx38\ \text{年}.$$

这一结果的实践含义是：**估计风险（$\sigma$）所需的数据远少于估计收益（$\mu$）所需的数据**。$\sigma$ 是二阶量，样本方差以 $1/\sqrt n$ 的速率收敛且相对误差与 $\sigma$ 的大小无关；$\mu$ 是一阶量，其可辨识性完全取决于 $\mu/\sigma$ 这一极小的比值。因此量化研究中对波动率模型的投入通常比对收益预测模型的投入更有统计回报。

（3）设 $R_i$ 为对称 $\alpha$-稳定分布，特征函数 $\varphi(t)=e^{-\gamma|t|^{\alpha}}$，$\alpha=1.5$。由例 14.6 甲的推导，$\sum_{i=1}^{n}R_i$ 的特征函数为 $e^{-n\gamma|t|^{\alpha}}$，仍是 $\alpha$-稳定分布，其尺度参数为 $(n\gamma)^{1/\alpha}$；于是 $\bar R_n$ 的尺度参数为

$$\frac{(n\gamma)^{1/\alpha}}{n}=\gamma^{1/\alpha}\,n^{1/\alpha-1}=\gamma^{1/\alpha}\,n^{-1/3},$$

而不再是 $n^{-1/2}$。方差在此根本不存在，式（14.25）与式（14.26）都失去意义。若把「精度」理解为尺度参数按同一比例缩小，记所需缩小倍数为 $K=\gamma^{1/2}\cdot39.199/\gamma^{1/\alpha}$ 形式的等价量，则条件为 $n^{1-1/\alpha}\ge K$，即 $n\ge K^{\alpha/(\alpha-1)}=K^{3}$。与高斯情形的 $n\ge K^2$ 相比，样本量放大了 $K$ 倍。取与（1）中相同的 $K=39.199$，得 $n\ge39.199^3=60{,}232$ 个交易日，约 $239$ 年，是（1）中所需样本量的 $39$ 倍。这就是厚尾对推断成本的定量惩罚：$\alpha$ 越接近 $1$，指数 $\alpha/(\alpha-1)$ 越大，所需数据量呈爆炸式增长；当 $\alpha\le1$ 时连样本均值都不是位置的合适估计量，应改用样本中位数或其他稳健统计量。

（4）蒙特卡洛标准误为 $\sigma_g/\sqrt N$，要求 $1.96\sigma_g/\sqrt N\le0.05$，即 $N\ge(1.96\sigma_g/0.05)^2$。$\sigma_g=2$ 时 $N\ge(78.4)^2=6146.6$，取 $N=6147$；$\sigma_g=0.5$ 时 $N\ge(19.6)^2=384.2$，取 $N=385$。计算量下降为原来的 $1/16$，恰为 $(2/0.5)^2$，因为式（14.26）中 $N$ 与 $\sigma^2$ 成正比。这解释了为什么方差缩减技术的收益应以「等效样本量倍数」来衡量：把标准差降低 $4$ 倍等同于免费获得 $16$ 倍样本。

最后必须指出上述四问共同的隐含假设：独立性。日收益的绝对值存在显著正自相关（波动率聚集，第29章），此时 $\bar R_n$ 的方差不是 $\sigma^2/n$ 而是长期方差除以 $n$，

$$\operatorname{Var}(\bar R_n)\approx\frac{\sigma_{LR}^2}{n},\qquad\sigma_{LR}^2=\sigma^2\Bigl(1+2\sum_{k=1}^{\infty}\rho_k\Bigr),$$

其中 $\rho_k$ 为收益的自相关系数。若括号内因子为 $1.5$，则所需样本量按同比例增加 $50\%$；用名义样本量代入式（14.26）会低估区间宽度，导致过度自信。这也是实践中宁可改用 Newey–West 稳健标准误或 Bootstrap（第23章）的原因。
## 本章小结

本章从收敛模式出发，最终抵达概率论中最具普适性的两类结论：大数定律与中心极限定理。四种收敛模式（几乎必然、依概率、依 $L^p$、依分布）构成一个强度递减的层级，其中依分布收敛最弱却最有用，因为它只涉及分布而不涉及随机变量本身，从而允许在不同概率空间上定义的序列相互比较；它的代价是不能直接处理逐点行为，必须借助 Portmanteau 定理、连续映射定理与 Slutsky 定理这一整套运算法则。

贯穿全章的证明范式可以概括为一句话：**把依分布收敛问题翻译成特征函数的逐点收敛问题**。这个范式由三个不可替换的环节组成。第一个环节是特征函数把独立和的卷积化为乘积：$\varphi_{S_n}(t)=\prod_k\varphi_k(t)$，于是概率论中的加法结构变成了分析中的乘法结构，这是处理独立随机变量之和的根本手段。第二个环节是 Taylor 展开在原点提取矩信息：$\varphi(u)=1+iu\mathbb E X-\frac{u^2}2\mathbb E X^2+o(u^2)$，矩条件（一阶、二阶、三阶）正是通过这一展开进入结论的，因此「需要几阶矩」与「展开到几阶」是一一对应的。第三个环节是定理 14.7（Lévy 连续性定理）把逐点收敛翻译回分布收敛，其中最关键的技术条件是极限函数在 $t=0$ 处连续：它排除了概率质量逃逸到无穷的可能，是紧性（tightness）的解析表达。例 14.6 丙中 $\varphi_n(t)=e^{-\sqrt n|t|}\to0$（$t\ne0$）的构造清楚地表明，一旦丢掉这个连续性条件，逐点收敛就完全不携带概率信息。三个环节合起来解释了本章几乎所有定理的证明结构：定理 14.9 只需展开到一阶（故只要 $\mathbb E|X|<\infty$），定理 14.12 展开到二阶（故只要二阶矩），定理 14.14 展开到三阶（故需要三阶绝对矩，换来的是显式速率），定理 14.13 用截断处理矩条件不足的场合。

与之对照，大数定律还有另一条完全实变量的路线：截断加 Chebyshev 加 Borel–Cantelli。这条路线在弱大数定律上是自足的（14.3 节的注记给出了完整证明），在强大数定律上则要借助 Kolmogorov 极大不等式与 Kronecker 引理，其严格性依赖第25章的鞅技术。中心极限定理则几乎没有初等的替代路线，因为它断言的是分布**形状**的收敛，而形状信息只能由变换（特征函数或矩生成函数）承载。这是「依分布收敛＋特征函数」范式不可绕开的根本原因。

在结论层面，本章确立了三层图景。一阶层面：样本均值依概率乃至几乎必然收敛到期望，这是一切估计量一致性的基础，Markov 条件把它推广到独立不同分布的场合。二阶层面：$\sqrt n$ 标度的偏差依分布收敛到正态律，Lindeberg 条件给出了「无单个分量主导」这一最本质的充分必要条件；Lyapunov 条件便于验证但更强，Feller 条件则是刻画性的另一半。三阶层面：Berry–Esseen 定理给出 $O(n^{-1/2})$ 的一致误差界，且阶与常数都近乎不可改进，这把渐近理论转化为可操作的样本量准则。当方差无穷时，二阶层面整体崩塌，正态极限被稳定分布取代，$\sqrt n$ 被 $n^{1/\alpha}$ 取代，这一转变由例 14.6 完整呈现。

对量化研究而言，本章的价值在于提供了使用渐近结果的判别清单。任何形如「大样本下近似正态」的论断都建立在三项假设之上：足够的独立性或弱相依性、足够的矩条件、足够大的样本量。三者中任一项存疑时，就应当用蒙特卡洛模拟、Bootstrap 或置换检验替代解析的渐近公式，而不是把渐近结论直接外推。14.6 节讨论的 $\sqrt t$ 标度、蒙特卡洛 $1/\sqrt N$ 律、协方差矩阵估计误差的放大、厚尾下的标度失效，都是这一判别清单在具体问题上的应用。本章的结论将在后续各章反复被调用：第18章的蒙特卡洛误差、第19章的多元中心极限定理与 Wishart 分布、第20章的大样本区间与三大渐近检验、第21章的回归推断、第23章的 Bootstrap 一致性、第25章的鞅差中心极限定理、第29章的波动率聚集对标度规则的破坏、第32章的极值极限定理、第34章的回测统计量分布。
## 习题

1. 设 $U\sim U(0,1)$，定义 $X_n=n\,\mathbf 1\{U<1/n\}$。判断 $\{X_n\}$ 是否依概率收敛到 $0$、是否几乎必然收敛到 $0$、是否在 $L^1$ 中收敛到 $0$、是否依分布收敛到 $0$，并对每个判断给出理由。

2. 构造定义在 $([0,1],\mathcal B,\text{Lebesgue})$ 上的随机变量序列 $\{X_n\}$，取值为 $\{0,1\}$，使 $X_n\xrightarrow{\ \mathbb P\ }0$ 成立而 $X_n\to0$ 几乎必然不成立（提示：把指标 $n$ 写成 $n=2^k+j$ 并让取值区间在 $[0,1]$ 上游动）。验证这两种收敛行为的成立与不成立。

3. 设 $X$ 满足 $\mathbb P(X=1)=\mathbb P(X=-1)=\tfrac12$，令 $X_n=(-1)^nX$。证明 $X_n\xrightarrow{\ d\ }X$，但 $\{X_n\}$ 不依概率收敛到任何随机变量，并说明这与「依概率收敛蕴含依分布收敛」并不矛盾。

4. 证明：若 $X_n\xrightarrow{\ \mathbb P\ }X$，则存在子列 $\{X_{n_k}\}$ 使 $X_{n_k}\to X$ 几乎必然。（提示：先取出满足 $\mathbb P(|X_{n_k}-X|>2^{-k})<2^{-k}$ 的子列，再用 Borel–Cantelli 第一引理。）

5. 设 $p\ge1$。证明：若 $X_n\xrightarrow{\ L^p\ }X$，则 $X_n\xrightarrow{\ \mathbb P\ }X$；并构造一个依概率收敛但不在 $L^1$ 中收敛的例子，说明逆向不成立。

6. 设 $X_n\xrightarrow{\ d\ }X$，$Y_n\xrightarrow{\ \mathbb P\ }c$（$c$ 为常数）。用 Portmanteau 定理证明 $X_n+Y_n\xrightarrow{\ d\ }X+c$，并进一步证明对任意在 $\mathbb R^2$ 上连续、且关于第一个变量一致连续的函数 $h$，有 $h(X_n,Y_n)\xrightarrow{\ d\ }h(X,c)$。

7. 设 $X_n\xrightarrow{\ d\ }X$，$a_n\to a$，$b_n\to b$，其中 $\{a_n\}$、$\{b_n\}$ 为常数列。用命题 14.8（Slutsky）证明 $a_nX_n+b_n\xrightarrow{\ d\ }aX+b$。再说明当 $\{a_n\}$ 换为随机序列 $A_n\xrightarrow{\ d\ }A$ 时结论为何一般不再成立，并给出反例。

8. 证明依分布极限的唯一性：若 $X_n\xrightarrow{\ d\ }X$ 且 $X_n\xrightarrow{\ d\ }Y$，则 $X$ 与 $Y$ 同分布。（提示：用定理 14.7 与特征函数的唯一性。）

9. 设 $X_n\sim\mathrm{Exp}(n)$（密度 $ne^{-nx}$，$x>0$），$Y_n\sim\mathrm{Exp}(1)$ 且相互独立。分别求 $nX_n$、$X_n$、$\sqrt nX_n$、$X_n+Y_n$ 的极限分布，并指出各自适用的收敛模式。

10. 设 $X_n\xrightarrow{\ d\ }\mathcal N(0,1)$。用连续映射定理求 $X_n^2$、$|X_n|$、$e^{X_n}$、$1/(1+X_n^2)$、$\arctan X_n$ 的极限分布，并对每一个指明所用映射的连续性能否放宽到几乎必然连续。

11. 设 $X_1,\dots,X_n$ 独立同分布于 $\mathrm{Exp}(\lambda)$，考虑矩估计量 $\hat\lambda_n=n/\sum_{k=1}^{n}X_k$。证明 $\hat\lambda_n\xrightarrow{\ \mathbb P\ }\lambda$，并用 delta 方法求 $\sqrt n(\hat\lambda_n-\lambda)$ 的极限分布。

12. 设 $\{X_k\}$ 相互独立，$\mathbb P(X_k=k^{\alpha})=\mathbb P(X_k=-k^{\alpha})=\tfrac12$。用命题 14.11 的 Markov 条件求出使 $\frac1n\sum_{k=1}^{n}X_k\xrightarrow{\ \mathbb P\ }0$ 成立的 $\alpha$ 的取值范围，并说明 $\alpha$ 超出该范围时结论为何失败。

13. 对 $f(x)=x^3$ 显式计算 Bernstein 多项式 $B_n(f;x)=\mathbb E[(S_n/n)^3]$（$S_n\sim\mathrm{Bin}(n,x)$），并验证 $\sup_{x\in[0,1]}|B_n(f;x)-f(x)|=O(1/n)$。

14. 掷一枚均匀骰子 $240$ 次，记点数之和为 $S$。用中心极限定理并施加连续性校正，近似计算 $\mathbb P(S\ge880)$ 与 $\mathbb P(820\le S\le880)$；再给出不作校正的结果，并估计两者的相对偏差。

15. 某服务器每小时收到的请求数 $N\sim\mathrm{Poisson}(3600)$。用正态近似（含连续性校正）估计 $\mathbb P(N\ge3700)$ 与 $\mathbb P(N\le3500)$，并说明不作校正时误差的量级与符号。

16. 设 $\{X_k\}$ 相互独立，$X_k\sim U(-k,k)$。写出 $s_n^2=\sum_{k=1}^{n}\operatorname{Var}(X_k)$ 的显式表达式及其渐近阶，验证 Lyapunov 条件在 $\delta=1$ 时成立，并写出 $\sum_{k=1}^{n}X_k/s_n$ 的极限分布。
17. 设 $\{X_k\}$ 相互独立，$\mathbb E X_k=0$，$\operatorname{Var}(X_k)=4^k$。验证 Feller 条件（14.22）不成立，并说明为什么此时 $S_n/s_n$ 的极限分布由末项 $X_n/s_n$ 主导、不可能是标准正态分布。

18. 设 $\{Y_k\}$ 独立同分布，$\mathbb E Y_1=0$，$\mathbb E Y_1^2=\sigma^2\in(0,\infty)$。证明 Lindeberg 条件（14.21）成立，从而由定理 14.13 重新导出定理 14.12。

19. 对 $X\sim\mathrm{Bernoulli}(p)$ 计算 Berry–Esseen 比 $\rho/\sigma^3=(p^2+q^2)/\sqrt{pq}$（$q=1-p$）在 $p=0.5$、$p=0.05$、$p=0.01$ 时的值；再取 $C=0.4748$，求出 $n=200$ 时定理 14.14 对这三种情形分别给出的分布函数误差上界，并解释为什么稀有事件场合需要多得多的样本量。

20. 设 $X_1,X_2,\dots$ 独立同分布于标准 Cauchy 分布，特征函数 $\varphi(t)=e^{-|t|}$。证明：（a）$\bar X_n$ 与 $X_1$ 同分布，故弱大数定律不成立；（b）$\{\sqrt n\,\bar X_n\}$ 不依分布收敛（计算其特征函数并用定理 14.7 说明极限函数在 $t=0$ 处不连续）；（c）存在常数 $c_n$ 使 $S_n/c_n$ 与 $X_1$ 同分布，求出 $c_n$。

21. 用蒙特卡洛方法估计 $I=\int_0^1e^{-x^2}dx$：取 $U_1,\dots,U_N$ 独立同分布于 $U(0,1)$，令 $\hat I_N=\frac1N\sum_{i=1}^{N}e^{-U_i^2}$。（a）求 $\mathbb E\hat I_N$ 与 $\operatorname{Var}(\hat I_N)$（用误差函数表示）；（b）要使 $95\%$ 置信区间半宽不超过 $10^{-3}$，$N$ 至少为多少？（c）若采用对偶变量法使方差降为原来的一半，$N$ 变为多少？（d）说明 $\hat I_N$ 的收敛性分别由本章哪个定理保证。

22. 某策略的日收益 $R_1,R_2,\dots$ 独立同分布，$\mu=\mathbb E R_1=0.03\%$，$\sigma=1.2\%$。（a）写出日夏普比率与年化夏普比率（每年 $252$ 个交易日）的表达式并求值；（b）用渐近正态性说明 $\sqrt n(\widehat{SR}-SR)$ 的极限分布形态，并求使年化夏普比率的 $95\%$ 置信区间半宽不超过 $0.5$ 所需的最小样本量；（c）若日收益实为 $\alpha=1.6$ 的对称稳定分布，说明（b）的计算在哪一步失效，正确的规范化指数是多少，并解释为什么此时夏普比率在总体上没有定义。
