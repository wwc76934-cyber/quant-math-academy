# 第27章　随机微分方程与 Itô 过程

第26章把 Brown 运动、二次变差与 Itô 积分连成一条完整的逻辑链：Brown 运动的路径连续却几乎必然无处可微，其一阶变差无穷而二次变差恰为 $t$，这使得经典的 Riemann–Stieltjes 积分无从定义，只能以左端点取值的方式重新构造 $\int_0^t H_s\,dB_s$。有了这个积分，「随机微分方程」才第一次获得严格意义：它并不是关于导数的等式（$dB_t/dt$ 这个对象根本不存在），而是一个积分等式。本章把这一线索推进到方程本身。第27.1节给出 Itô 过程与随机微分方程的定义，交代漂移与扩散系数的确切概率含义，并把 Itô 公式的启发式推导与严格陈述一并给出——它是求解一切随机微分方程的唯一有效工具，因为链式法则在这里多出一个由二次变差产生的二阶项。第27.2节讨论解的存在唯一性：给出 Lipschitz 条件与线性增长条件，用 Picard 迭代构造解，完整证明贯穿全章的 Gronwall 不等式，并在概念层面区分强解与弱解。第27.3节求解三类最重要的方程：几何 Brown 运动给出资产价格的对数正态模型，Ornstein–Uhlenbeck 过程用积分因子法求得显式解并算出均值与协方差函数，Cox–Ingersoll–Ross 过程以平方根扩散保证非负性并引出 Feller 条件。生成元、Feynman–Kac 公式、Girsanov 测度变换与多维情形在第27.4节至第27.7节讨论。

## 27.1 Itô 过程与随机微分方程的形式

### 27.1.1 Itô 过程的定义与漂移、扩散系数

设 $(\Omega,\mathcal F,(\mathcal F_t)_{t\ge 0},\mathbb P)$ 是满足通常条件的滤波概率空间，$B=(B_t)_{t\ge 0}$ 是其上关于 $(\mathcal F_t)$ 适应的标准 Brown 运动。我们关心的对象是那些「由一个确定性的漂移推动、又被 Brown 运动扰动」的连续过程。

**定义 27.1（Itô 过程）**

称连续适应过程 $X=(X_t)_{t\ge 0}$ 为一个 Itô 过程，若存在渐进可测过程 $b=(b_t)_{t\ge 0}$ 与 $\sigma=(\sigma_t)_{t\ge 0}$，使得对任意 $T>0$，

$$\int_0^T |b_s|\,ds<\infty,\qquad \int_0^T \sigma_s^2\,ds<\infty$$

几乎必然成立，并且对一切 $t\ge 0$，

$$X_t=X_0+\int_0^t b_s\,ds+\int_0^t \sigma_s\,dB_s$$

几乎必然成立。其中第一个积分是逐路径的 Lebesgue 积分，第二个积分是第26章构造的 Itô 积分，$X_0$ 是 $\mathcal F_0$-可测随机变量。这一等式通常缩写为随机微分形式

$$dX_t=b_t\,dt+\sigma_t\,dB_t \tag{27.1}$$

并称 $b$ 为漂移系数或漂移率，$\sigma$ 为扩散系数。若存在 Borel 函数 $\mu,\nu:[0,\infty)\times\mathbb R\to\mathbb R$ 使 $b_t=\mu(t,X_t)$、$\sigma_t=\nu(t,X_t)$ 几乎必然成立，则称 $X$ 为扩散型 Itô 过程。

式（27.1）右端的两项具有截然不同的分析性质。映射 $t\mapsto\int_0^t b_s\,ds$ 对几乎每一个 $\omega$ 都是绝对连续函数，因而是有限变差的；映射 $t\mapsto\int_0^t \sigma_s\,dB_s$ 在 $\mathbb E\int_0^T\sigma_s^2\,ds<\infty$ 时是连续平方可积鞅，在一般情况下是连续局部鞅。于是每个 Itô 过程都被写成一个有限变差过程与一个连续局部鞅之和。这一分解是第25章 Doob–Meyer 分解与第26章二次变差理论的交汇点，也是后文一切计算的出发点。

**注记（二次变差的表达）**　若 $X$ 由式（27.1）给出，则其二次变差为 $[X]_t=\int_0^t\sigma_s^2\,ds$。理由是：有限变差部分的二次变差恒为零，而 Itô 积分 $\int_0^t\sigma_s\,dB_s$ 的二次变差等于 $\int_0^t\sigma_s^2\,d[B]_s=\int_0^t\sigma_s^2\,ds$，其中用到 $[B]_t=t$。这一事实的重要性在于，扩散系数并不是路径一阶信息所能提供的量；相反，它完全由路径的二阶变差结构决定，因而能够从高频观测中被一致地估计出来。这正是第26章末已实现波动率作为二次变差估计量的理论基础。

漂移与扩散这两个名称来自它们对条件矩的瞬时贡献。下面的注记把这一说法变成严格结论。

**注记（漂移与扩散系数的概率含义）**　设 $X$ 为 Itô 过程，且对任意 $T>0$ 有 $\mathbb E\int_0^T\big(b_s^2+\sigma_s^2\big)\,ds<\infty$。把 $b$ 与 $\sigma^2$ 在 $[0,\infty)$ 外补零，则对 Lebesgue 几乎必然的 $t>0$，

$$\lim_{h\downarrow 0}\frac{1}{h}\,\mathbb E\big[X_{t+h}-X_t\mid\mathcal F_t\big]=b_t,\qquad \lim_{h\downarrow 0}\frac{1}{h}\,\mathbb E\big[(X_{t+h}-X_t)^2\mid\mathcal F_t\big]=\sigma_t^2$$

两个极限都在 $L^1$ 中成立。换言之，$b_t$ 是条件期望的瞬时变化率，$\sigma_t^2$ 是条件二阶矩的瞬时变化率，后者恰为瞬时方差率。

**证明**

记 $\Delta A_h=\int_t^{t+h}b_s\,ds$ 与 $\Delta M_h=\int_t^{t+h}\sigma_s\,dB_s$，则 $X_{t+h}-X_t=\Delta A_h+\Delta M_h$。

第一步处理条件期望。因为 $\big(\int_0^u\sigma_s\,dB_s\big)_{u\ge 0}$ 是平方可积鞅，其增量关于 $\mathcal F_t$ 的条件期望恰为零，所以

$$\mathbb E\big[X_{t+h}-X_t\mid\mathcal F_t\big]=\mathbb E\big[\Delta A_h\mid\mathcal F_t\big]$$

成立而没有余项。再由条件期望的 Jensen 不等式与全期望公式，

$$\mathbb E\Big|\frac{1}{h}\,\mathbb E\big[\Delta A_h\mid\mathcal F_t\big]-b_t\Big|\le\mathbb E\Big|\frac{1}{h}\,\Delta A_h-b_t\Big|$$

右端由 $L^1$ 中的 Lebesgue 微分定理趋于零，因为 $\mathbb E\int_0^T|b_s|\,ds<\infty$。第一个极限得证。

第二步处理条件二阶矩。展开平方得

$$(\Delta A_h+\Delta M_h)^2=(\Delta A_h)^2+2\,\Delta A_h\,\Delta M_h+(\Delta M_h)^2$$

以下逐项估计。对第一项，由 Cauchy–Schwarz 不等式有 $(\Delta A_h)^2\le h\int_t^{t+h}b_s^2\,ds$，从而

$$\mathbb E\Big[\frac{1}{h}\,(\Delta A_h)^2\,\Big|\,\mathcal F_t\Big]\le\int_t^{t+h}b_s^2\,ds$$

右端仍在 $L^1$ 中趋于零。对交叉项，用条件形式的 Cauchy–Schwarz 不等式：

$$\frac{1}{h}\,\Big|\mathbb E\big[\Delta A_h\,\Delta M_h\mid\mathcal F_t\big]\Big|\le\Big(\frac{1}{h}\,\mathbb E\big[(\Delta A_h)^2\mid\mathcal F_t\big]\Big)^{1/2}\Big(\frac{1}{h}\,\mathbb E\big[(\Delta M_h)^2\mid\mathcal F_t\big]\Big)^{1/2}$$

第一个因子在 $L^1$ 中趋于零，第二个因子在 $L^1$ 中对充分小的 $h$ 有界，因为 $\frac{1}{h}\mathbb E[(\Delta M_h)^2]=\frac{1}{h}\mathbb E\int_t^{t+h}\sigma_s^2\,ds$ 收敛到 $\mathbb E[\sigma_t^2]$。故交叉项的贡献在 $L^1$ 中消失。

对第三项，令 $M_u=\int_0^u\sigma_s\,dB_s$。$M$ 是平方可积鞅，$[M]_u=\int_0^u\sigma_s^2\,ds$，因而 $M_u^2-[M]_u$ 也是鞅。由 $\mathbb E[\Delta M_h\mid\mathcal F_t]=0$ 得

$$\mathbb E\big[(\Delta M_h)^2\mid\mathcal F_t\big]=\mathbb E\big[M_{t+h}^2-M_t^2\mid\mathcal F_t\big]=\mathbb E\big[[M]_{t+h}-[M]_t\mid\mathcal F_t\big]=\mathbb E\Big[\int_t^{t+h}\sigma_s^2\,ds\,\Big|\,\mathcal F_t\Big]$$

于是 $\frac{1}{h}$ 倍的这一项由 Lebesgue 微分定理在 $L^1$ 中收敛到 $\sigma_t^2$。三项合并即得第二个极限。

□

### 27.1.2 随机微分方程的严格含义

定义 27.1 刻画了一类过程。实践中我们面对的却是相反方向的问题：给定漂移与扩散两个系数函数，问是否存在具有这种形式的过程，它是否唯一，能否写出显式表达式。这就是随机微分方程要回答的三个问题。

**定义 27.2（随机微分方程与其解）**

设 $b,\sigma:[0,\infty)\times\mathbb R\to\mathbb R$ 是 Borel 可测函数，$\xi$ 是 $\mathcal F_0$-可测随机变量。形如

$$dX_t=b(t,X_t)\,dt+\sigma(t,X_t)\,dB_t,\qquad X_0=\xi$$

的表达式称为随机微分方程。它的严格含义是下面这个积分方程：对一切 $t\ge 0$，

$$X_t=\xi+\int_0^t b(s,X_s)\,ds+\int_0^t \sigma(s,X_s)\,dB_s \tag{27.2}$$

几乎必然成立。称连续适应过程 $X=(X_t)_{t\ge 0}$ 为该方程在区间 $[0,T]$ 上的解，如果

1. $X_0=\xi$ 几乎必然成立；
2. 对每个 $t\in[0,T]$，$\int_0^t\big(|b(s,X_s)|+\sigma(s,X_s)^2\big)\,ds<\infty$ 几乎必然成立，从而式（27.2）中的两个积分都有定义；
3. 式（27.2）对一切 $t\in[0,T]$ 同时成立，其外只有一个零测例外集。

若两个解作为过程不可区分，则视它们为同一个解。

定义 27.2 以积分等式而非微分等式作为方程的定义，这一点必须强调。第26章已经证明 Brown 运动的路径几乎必然无处可微，因此记号 $dB_t/dt$ 没有意义，$dX_t/dt$ 也随之不存在；等式 $dX_t=b\,dt+\sigma\,dB_t$ 只是一个便于运算的速记符号，它的全部内容都封装在式（27.2）之中。这也解释了为什么随机微分方程的求解手法与常微分方程不同：我们不能简单地「两边积分」了事，因为对 $\sigma(s,X_s)\,dB_s$ 的积分本身要求被积函数适应，而适应性与路径正则性必须在解的定义里被明确规定。

条件 2 中的可积性要求并非多余的技术假设。逐路径 Lebesgue 积分 $\int_0^t b(s,X_s)\,ds$ 需要 $b(\cdot,X_\cdot)$ 在 $[0,t]$ 上可积；Itô 积分在第26章的构造中要求 $\int_0^t\sigma(s,X_s)^2\,ds<\infty$。至于被积函数 $s\mapsto\sigma(s,X_s)$ 的渐进可测性，则由 $X$ 的连续适应性自动保证：连续适应过程必是渐进可测的，而渐进可测映射与 Borel 函数的复合仍是渐进可测的。

条件 3 中「对一切 $t$ 同时成立」的加强同样值得说明。若只逐点地对每个固定的 $t$ 要求几乎必然成立，得到的例外集依赖于 $t$，其并集未必为零测。由于式（27.2）的两端都是 $t$ 的连续函数——左端由定义，右端的 Lebesgue 积分绝对连续、Itô 积分取连续修正——等式在有理点上成立即可推出在全部 $t$ 上成立。因此这一加强不带来实质困难，却让「解」成为一个确定的对象，而不是一族随 $t$ 变化的等式。

**注记（不动点视角）**　把式（27.2）的右端看作作用于过程 $X$ 的映射 $\Phi$，即令

$$(\Phi X)_t=\xi+\int_0^t b(s,X_s)\,ds+\int_0^t \sigma(s,X_s)\,dB_s$$

则求解随机微分方程等价于求 $\Phi$ 的不动点。第27.2节的全部技术内容，就是说明在 Lipschitz 条件与线性增长条件下，$\Phi$ 的迭代序列收敛，其极限即为所求的解。

### 27.1.3 Itô 公式：启发式推导与严格陈述

求解随机微分方程的唯一有效工具是一条修正过的链式法则。在经典微积分中，若 $X$ 可微而 $f\in C^2$，则 $df(X_t)=f'(X_t)\,dX_t$，一阶项便已足够。根本差别在于：Itô 过程增量 $\Delta X$ 的主导量级是 $\sqrt{\Delta t}$ 而非 $\Delta t$，因为 Brown 运动增量满足 $\Delta B_t\sim\sqrt{\Delta t}\,Z$，$Z$ 为标准正态。于是二阶项 $\frac{1}{2}f''(X_t)(\Delta X_t)^2$ 的量级也是 $\Delta t$，与一阶项同阶，绝不能略去。这一项正是随机分析与经典分析的全部区别所在。

**启发式推导**　设 $X$ 为 Itô 过程，$dX_t=b_t\,dt+\sigma_t\,dB_t$，$f\in C^2(\mathbb R)$。在时刻 $t$ 处作二阶 Taylor 展开：

$$f(X_t+\Delta X_t)-f(X_t)=f'(X_t)\,\Delta X_t+\frac{1}{2}\,f''(X_t)\,(\Delta X_t)^2+o\big((\Delta X_t)^2\big)$$

把 $\Delta X_t=b_t\,\Delta t+\sigma_t\,\Delta B_t$ 代入一阶项，并把平方项展开：

$$(\Delta X_t)^2=b_t^2\,(\Delta t)^2+2\,b_t\sigma_t\,\Delta t\,\Delta B_t+\sigma_t^2\,(\Delta B_t)^2$$

接下来使用三条乘法规则，它们是随机微分运算表的全部内容：

$$(dt)^2=0,\qquad dt\,dB_t=0,\qquad (dB_t)^2=dt$$

也就是说，$(\Delta t)^2$ 与 $\Delta t\,\Delta B_t$ 在取极限后消失，而 $(\Delta B_t)^2$ 不消失，它的一阶近似恰为 $\Delta t$。代入后，$o((\Delta X_t)^2)$ 项量级高于 $\Delta t$ 因而消失，得到

$$df(X_t)=\Big[f'(X_t)\,b_t+\frac{1}{2}\,f''(X_t)\,\sigma_t^2\Big]dt+f'(X_t)\,\sigma_t\,dB_t \tag{27.3}$$

三条乘法规则并非形式的把戏，而有精确的含义。取 $[0,t]$ 的一个分割 $\Pi:0=t_0<t_1<\cdots<t_n=t$，记 $\Delta t_i=t_i-t_{i-1}$，$\Delta B_i=B_{t_i}-B_{t_{i-1}}$，令 $|\Pi|=\max_i\Delta t_i$。第26章已证 $\sum_i(\Delta B_i)^2$ 在 $L^2$ 中收敛到 $t=[B]_t$，这正是第三条规则；另一方面 $\sum_i(\Delta t_i)^2\le|\Pi|\cdot t\to 0$，这是第一条；至于第二条，由 Brown 路径在 $[0,t]$ 上一致连续可知 $\max_i|\Delta B_i|\to 0$ 几乎必然，于是 $\big|\sum_i\Delta t_i\,\Delta B_i\big|\le t\max_i|\Delta B_i|\to 0$ 几乎必然。把 Taylor 展开沿分割求和并令 $|\Pi|\to0$，启发式论证就变成了式（27.3）所表达的严格恒等式，其精确形式即下面的定理。

**定理 27.3（Itô 公式）**

设 $X$ 为 Itô 过程，$dX_t=b_t\,dt+\sigma_t\,dB_t$，其中 $b$ 与 $\sigma$ 渐进可测，且对每个 $T>0$ 有 $\int_0^T|b_s|\,ds<\infty$ 与 $\int_0^T\sigma_s^2\,ds<\infty$ 几乎必然成立。设 $f:[0,\infty)\times\mathbb R\to\mathbb R$ 属于 $C^{1,2}$，即关于第一个变量一次连续可微、关于第二个变量二次连续可微。则过程 $\big(f(t,X_t)\big)_{t\ge 0}$ 仍为 Itô 过程，并且对一切 $t\ge 0$，

$$f(t,X_t)=f(0,X_0)+\int_0^t\Big[\partial_s f(s,X_s)+b_s\,\partial_x f(s,X_s)+\frac{1}{2}\,\sigma_s^2\,\partial_{xx}f(s,X_s)\Big]ds+\int_0^t \partial_x f(s,X_s)\,\sigma_s\,dB_s \tag{27.4}$$

几乎必然成立。等价的微分形式为

$$df(t,X_t)=\Big[\partial_t f(t,X_t)+b_t\,\partial_x f(t,X_t)+\frac{1}{2}\,\sigma_t^2\,\partial_{xx}f(t,X_t)\Big]dt+\partial_x f(t,X_t)\,\sigma_t\,dB_t$$

特别地，当 $f$ 不显含时间变量时 $\partial_t f\equiv0$，若再记 $X$ 的系数为 $b_t,\sigma_t$，式（27.4）就退化为式（27.3）。式（27.4）右端 $ds$ 积分中被加上的那一项 $\frac{1}{2}\sigma_s^2\,\partial_{xx}f$，通常称为 Itô 修正项或漂移修正项；它的全部来源就是二次变差非零，也是启发式推导中规则 $(dB_t)^2=dt$ 的严格对应物。

**注记（定理 27.3 的证明要点）**　证明分四步。其中两处收敛性直接引用第26章已建立的结果，分别是 Itô 积分作为简单过程积分的 $L^2$ 极限这一构造定理，以及 $[X]_t=\int_0^t\sigma_s^2\,ds$ 这一二次变差的刻画；除此之外全部是初等估计，下面逐步给出。

第一步是约化到紧支集情形。先设 $f$ 的支集紧，从而 $\partial_t f,\partial_x f,\partial_{xx}f$ 一致有界且一致连续。对一般的 $f\in C^{1,2}$，取停时 $\tau_n=\inf\{t\ge 0:|X_t|\ge n\}$，并规定空集的下确界为 $\infty$；再取一个在球 $\{|x|\le n+1\}$ 上与 $f$ 一致的紧支集 $C^{1,2}$ 函数 $f_n$，对停止过程 $X_{t\wedge\tau_n}$ 应用紧支集情形的结论。由于 $X$ 的路径连续，$\tau_n\to\infty$ 几乎必然，令 $n\to\infty$ 即得一般情形。以下都在紧支集假设下进行。

第二步是沿分割作 Taylor 分解。固定 $t>0$ 与分割 $\Pi:0=t_0<t_1<\cdots<t_m=t$，记 $\Delta X_i=X_{t_{i+1}}-X_{t_i}$，$\Delta t_i=t_{i+1}-t_i$，$|\Pi|=\max_i\Delta t_i$。逐段作带积分余项的二阶 Taylor 展开并求和：

$$f(t,X_t)-f(0,X_0)=S_1+S_2+\frac{1}{2}\,S_3+\sum_i R_i$$

其中

$$S_1=\sum_i\partial_t f(t_i,X_{t_i})\,\Delta t_i,\quad S_2=\sum_i\partial_x f(t_i,X_{t_i})\,\Delta X_i,\quad S_3=\sum_i\partial_{xx}f(t_i,X_{t_i})\,(\Delta X_i)^2$$

余项由 $\partial_t f$ 与 $\partial_{xx}f$ 在紧集上的一致连续性控制：存在满足 $\lim_{\delta\downarrow 0}\rho(\delta)=0$ 的函数 $\rho$，使

$$|R_i|\le\rho(|\Pi|)\,\big(\Delta t_i+(\Delta X_i)^2\big)$$

因为 $X$ 在 $[0,t]$ 上有界，$\sum_i\Delta t_i=t$ 而 $\sum_i(\Delta X_i)^2$ 收敛到有限的 $[X]_t$，故 $\sum_iR_i\to0$ 几乎必然。

第三步是逐一求 $S_1,S_2,S_3$ 的极限。$S_1$ 是连续函数 $s\mapsto\partial_t f(s,X_s)$ 的 Riemann 和，由路径的一致连续性收敛到 $\int_0^t\partial_s f(s,X_s)\,ds$。

$S_2$ 的处理需要先把 $\Delta X_i$ 拆开：

$$S_2=\sum_i\partial_x f(t_i,X_{t_i})\int_{t_i}^{t_{i+1}}b_s\,ds+\sum_i\partial_x f(t_i,X_{t_i})\int_{t_i}^{t_{i+1}}\sigma_s\,dB_s$$

前一部分与 $\int_0^t\partial_x f(s,X_s)\,b_s\,ds$ 之差的绝对值不超过 $\int_0^t\omega(|\Pi|,s)\,|b_s|\,ds$，其中 $\omega(\cdot,s)$ 是 $s\mapsto\partial_x f(s,X_s)$ 的一致连续模；由 $\int_0^t|b_s|\,ds<\infty$ 与控制收敛定理，它趋于零。后一部分等于 $\int_0^t H^{(\Pi)}_s\,\sigma_s\,dB_s$，其中 $H^{(\Pi)}_s=\partial_x f(t_i,X_{t_i})$ 当 $s\in[t_i,t_{i+1})$，这是一个左端点取值的简单过程。因为 $H^{(\Pi)}\to\partial_x f(s,X_s)$ 逐点且一致有界，由 Itô 等距性质与控制收敛定理，

$$\mathbb E\Big[\int_0^t\big(H^{(\Pi)}_s-\partial_x f(s,X_s)\big)^2\,\sigma_s^2\,ds\Big]\longrightarrow 0$$

故这一部分在 $L^2$ 中收敛到 $\int_0^t\partial_x f(s,X_s)\,\sigma_s\,dB_s$。此处引用的正是第26章的构造定理：以左端点取值的简单过程之极限定义 Itô 积分。

$S_3$ 是产生 Itô 修正项的地方，也是启发式规则 $(dB_t)^2=dt$ 的严格化。把它拆成两部分：

$$S_3=\sum_i\partial_{xx}f(t_i,X_{t_i})\,\sigma_{t_i}^2\,(\Delta B_i)^2+\sum_i\partial_{xx}f(t_i,X_{t_i})\,\big[(\Delta X_i)^2-\sigma_{t_i}^2\,(\Delta B_i)^2\big]$$

其中 $\Delta B_i=B_{t_{i+1}}-B_{t_i}$。第一个和式收敛到 $\int_0^t\partial_{xx}f(s,X_s)\,\sigma_s^2\,ds$，这是把第26章的二次变差刻画 $\sum_i(\Delta X_i)^2\to[X]_t=\int_0^t\sigma_s^2\,ds$ 与连续有界被积函数相结合的直接推论。对第二个和式，用恒等式

$$(\Delta X_i)^2-\sigma_{t_i}^2\,(\Delta B_i)^2=\big(\Delta X_i-\sigma_{t_i}\,\Delta B_i\big)\big(\Delta X_i+\sigma_{t_i}\,\Delta B_i\big)$$

而

$$\Delta X_i-\sigma_{t_i}\,\Delta B_i=\int_{t_i}^{t_{i+1}}b_s\,ds+\int_{t_i}^{t_{i+1}}\big(\sigma_s-\sigma_{t_i}\big)\,dB_s$$

由 Cauchy–Schwarz 不等式与 Itô 等距性质，其 $L^2$ 范数的平方不超过

$$2\,\Delta t_i\int_{t_i}^{t_{i+1}}b_s^2\,ds+2\,\mathbb E\int_{t_i}^{t_{i+1}}\big(\sigma_s-\sigma_{t_i}\big)^2\,ds$$

两项都随 $|\Pi|\to0$ 消失：前者由 $\int_0^tb_s^2\,ds<\infty$，后者由 $s\mapsto\sigma_s$ 在 $L^2$ 中的连续性与控制收敛定理。另一方面 $\Delta X_i+\sigma_{t_i}\,\Delta B_i$ 的 $L^2$ 范数关于 $i$ 与 $\Pi$ 一致有界，且 $\sum_i$ 只有有限项起实质作用，故第二个和式在 $L^1$ 中趋于零。

第四步是把收敛提升为连续修正下的恒等式。以上极限先在概率意义下成立，而等式两端都有连续修正，故可取子列得到几乎必然的一致收敛，从而式（27.4）对一切 $t\ge0$ 同时成立，且 $f(t,X_t)$ 确实具有定义 27.1 所要求的 Itô 过程形式。

**注记（多维形式）**　定理 27.3 是 Itô 公式的一维版本。设 $X=(X^1,\dots,X^d)$ 为 $d$ 维 Itô 过程，

$$dX_t^i=b_t^i\,dt+\sum_{j=1}^m\sigma_t^{ij}\,dB_t^j,\qquad i=1,\dots,d$$

其中 $B=(B^1,\dots,B^m)$ 为 $m$ 维相互独立的 Brown 运动，$f\in C^{1,2}\big([0,\infty)\times\mathbb R^d\big)$，则

$$df(t,X_t)=\partial_t f\,dt+\sum_{i=1}^d\partial_i f\,dX_t^i+\frac{1}{2}\sum_{i=1}^d\sum_{k=1}^d\partial_{ik}f\,d[X^i,X^k]_t$$

而交叉变差由 $d[X^i,X^k]_t=\sum_{j=1}^m\sigma_t^{ij}\sigma_t^{kj}\,dt$ 给出。多维形式中出现交叉变差项，其后果是各分量之间的相关结构直接进入漂移的修正，这一点在第27.6节讨论多资产模型时至关重要。本章第27.3节处理的三个模型都是一维的，因此只用到式（27.4）。

**例 27.1**　用 Itô 公式完成下列三项计算。

(i) 求 $d(B_t^4)$，并由此计算 $\mathbb E\big[B_T^4\big]$。

(ii) 求 $d(tB_t)$，并由此导出 $\int_0^T B_t\,dt$ 的 Itô 积分表示，进而计算其方差。

(iii) 设 $\alpha\in\mathbb R$，$Z_t=\exp\big(\alpha B_t-\frac{1}{2}\alpha^2t\big)$。证明 $dZ_t=\alpha Z_t\,dB_t$，由此说明 $Z$ 是鞅，并计算 $\mathbb E\big[e^{\alpha B_T}\big]$。

**解**

(i) 取 $f(x)=x^4$ 与 $X_t=B_t$，此时 $b_t\equiv0$，$\sigma_t\equiv1$。因 $f'(x)=4x^3$，$f''(x)=12x^2$，式（27.3）给出

$$d(B_t^4)=\Big[4B_t^3\cdot 0+\frac{1}{2}\cdot 12B_t^2\cdot 1\Big]dt+4B_t^3\cdot 1\cdot dB_t=6B_t^2\,dt+4B_t^3\,dB_t$$

在 $[0,T]$ 上积分得 $B_T^4=6\int_0^T B_t^2\,dt+4\int_0^T B_t^3\,dB_t$。取期望前须确认第二项的期望为零。由 Itô 等距性质，

$$\mathbb E\Big[\Big(4\int_0^T B_t^3\,dB_t\Big)^2\Big]=16\int_0^T\mathbb E\big[B_t^6\big]\,dt=16\int_0^T 15\,t^3\,dt=60\,T^4<\infty$$

其中用到 $\mathbb E[B_t^6]=15t^3$（第11章正态分布的六阶矩）。故该随机积分是平方可积鞅，其期望为零。于是

$$\mathbb E\big[B_T^4\big]=6\int_0^T\mathbb E\big[B_t^2\big]\,dt=6\int_0^T t\,dt=3T^2$$

这与直接对 $B_T\sim N(0,T)$ 求四阶矩所得的结果完全一致，但推导过程不依赖任何正态矩公式，只用到 Itô 公式与 Itô 等距性质。

(ii) 取 $f(t,x)=tx$，则 $\partial_t f=x$，$\partial_x f=t$，$\partial_{xx}f=0$。由定理 27.3，

$$d(tB_t)=\big[B_t+t\cdot 0+0\big]\,dt+t\,dB_t=B_t\,dt+t\,dB_t$$

在 $[0,T]$ 上积分，左端为 $TB_T-0\cdot B_0=TB_T$，于是

$$TB_T=\int_0^T B_t\,dt+\int_0^T t\,dB_t$$

移项并利用 $\int_0^T T\,dB_t=T\,B_T$，得到随机分部积分公式

$$\int_0^T B_t\,dt=TB_T-\int_0^T t\,dB_t=\int_0^T (T-t)\,dB_t$$

这一表示说明 $\int_0^T B_t\,dt$ 本身是一个 Itô 积分，从而是均值为零的正态随机变量。它的方差由 Itô 等距性质直接算出：

$$\operatorname{Var}\Big(\int_0^T B_t\,dt\Big)=\mathbb E\Big[\Big(\int_0^T (T-t)\,dB_t\Big)^2\Big]=\int_0^T (T-t)^2\,dt=\frac{T^3}{3}$$

顺带得到一个在第26章末讨论已实现波动率时有用的事实：$\int_0^T B_t\,dt\sim N\big(0,T^3/3\big)$，因此时间平均的标准差以 $T^{3/2}$ 增长，快于 $B_T$ 的标准差 $T^{1/2}$。

(iii) 取 $f(t,x)=\exp\big(\alpha x-\frac{1}{2}\alpha^2t\big)$，则 $\partial_t f=-\frac{1}{2}\alpha^2 f$，$\partial_x f=\alpha f$，$\partial_{xx}f=\alpha^2 f$。代入式（27.4）：

$$dZ_t=\Big[-\frac{1}{2}\alpha^2 Z_t+\frac{1}{2}\cdot 1\cdot\alpha^2 Z_t\Big]dt+\alpha Z_t\,dB_t=\alpha Z_t\,dB_t$$

时间项与 Itô 修正项恰好抵消，因此 $Z$ 是局部鞅。它还是真鞅：对 $s<t$，

$$Z_t=Z_s\exp\Big(\alpha(B_t-B_s)-\frac{1}{2}\alpha^2(t-s)\Big)$$

而 $B_t-B_s$ 与 $\mathcal F_s$ 独立且服从 $N(0,t-s)$，故

$$\mathbb E\big[Z_t\mid\mathcal F_s\big]=Z_s\,e^{-\frac{1}{2}\alpha^2(t-s)}\,\mathbb E\big[e^{\alpha(B_t-B_s)}\big]=Z_s\,e^{-\frac{1}{2}\alpha^2(t-s)}\,e^{\frac{1}{2}\alpha^2(t-s)}=Z_s$$

也可用矩判据验证：$\mathbb E[Z_t^2]=e^{-\alpha^2t}\,\mathbb E[e^{2\alpha B_t}]=e^{-\alpha^2t}e^{2\alpha^2t}=e^{\alpha^2t}<\infty$，故 $\mathbb E\int_0^T\alpha^2Z_t^2\,dt<\infty$，$Z$ 是平方可积鞅。由 $Z_0=1$ 与鞅性，$\mathbb E[Z_T]=1$，即

$$\mathbb E\big[e^{\alpha B_T}\big]=e^{\frac{1}{2}\alpha^2 T}$$

指数鞅的意义远不止于计算矩母函数。第27.5节的 Girsanov 定理正是以这类过程作为 Radon–Nikodym 导数来实现测度变换，而 Novikov 条件则给出一般情形下局部鞅仍为真鞅的充分判据。

### 27.1.4 三类基本模型及其金融含义

系数 $b$ 与 $\sigma$ 一旦具体给定，定义 27.2 中的方程就成为一个经济模型。以下三个方程贯穿本章乃至全书的连续时间部分，分别对应资产价格、围绕均衡波动的价差、以及必须保持非负的利率水平。

第一个是几何 Brown 运动，也称对数正态模型：

$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t,\qquad S_0=s_0>0 \tag{27.5}$$

其中 $\mu\in\mathbb R$ 与 $\sigma>0$ 为常数。漂移与扩散都与 $S_t$ 成正比，因而瞬时收益率 $dS_t/S_t=\mu\,dt+\sigma\,dB_t$ 具有恒定的均值 $\mu$ 与恒定的标准差 $\sigma$。这正是「收益率的波动幅度与价格水平无关」这一经验观察的数学表述；同时，由于扩散系数在 $S_t=0$ 处退化为零，价格不会穿越零点，$S_t$ 恒正，这对股票价格而言是必要的。$\mu$ 称为期望收益率，$\sigma$ 称为波动率。第27.3.1节将给出式（27.5）的完整求解，第33章的 Black–Scholes 公式即建立在这一模型之上。

第二个是 Ornstein–Uhlenbeck 过程，也称均值回复过程；取它作为利率模型时即 Vasicek 模型：

$$dX_t=\theta(\mu-X_t)\,dt+\sigma\,dB_t,\qquad X_0=\xi \tag{27.6}$$

其中 $\theta>0$，$\mu\in\mathbb R$，$\sigma>0$。漂移项 $\theta(\mu-X_t)$ 的方向总是把 $X_t$ 拉回水平 $\mu$：当 $X_t>\mu$ 时漂移为负，当 $X_t<\mu$ 时漂移为正，且偏离越大拉力越强。$\theta$ 称为回复速度，$1/\theta$ 是回复的特征时间尺度，$\mu$ 是长期均衡水平。扩散系数为常数，波动与水平无关。这一结构适合刻画围绕某个均衡上下波动、且不要求非负的量，例如配对交易中的价差统计量、因子收益对均值的偏离，或短期利率本身。作为利率模型的缺点是 $X_t$ 服从正态分布，可取负值，这在长期低利率环境下被认为不可接受，这正是下面第三个模型的动机。

第三个是 Cox–Ingersoll–Ross 过程：

$$dX_t=\kappa(\theta-X_t)\,dt+\xi\sqrt{X_t^+}\,dB_t,\qquad X_0=x_0\ge 0 \tag{27.7}$$

其中 $\kappa>0$，$\theta>0$，$\xi>0$，而 $x^+=\max\{x,0\}$。它保留了均值回复的漂移结构，但把扩散系数改为与 $\sqrt{X_t}$ 成正比：水平低时波动小，水平高时波动大，且当 $X_t$ 趋于零时波动率同步衰减到零，从而把过程挡在非负区域内。$\xi$ 称为波动率参数。参数之间满足 $2\kappa\theta\ge\xi^2$（Feller 条件）时，边界零永不可达，过程恒正；否则零是可达的，此后漂移项中的 $\kappa\theta>0$ 立即把过程推回正半轴，形成反射式的行为。式（27.7）是利率期限结构与随机波动率建模的标准构件：Heston 模型中的方差过程恰为这一形式，仿射期限结构模型的单因子版本也是如此。

**注记**　三个模型的系数都局部 Lipschitz，但整体性质有差别。式（27.5）与式（27.6）的系数是全局 Lipschitz 的线性函数，故第27.2节的存在唯一性定理直接适用。式（27.7）中 $\sqrt{x^+}$ 在零点只是 $\frac{1}{2}$-Hölder 连续而非 Lipschitz，其路径唯一性的证明需要 Yamada–Watanabe 型的专门论证，依赖于对一维扩散边界分类的理论，超出本章范围；因此第27.3.3节只处理它的矩、平稳分布与非负性条件，这些计算不需要唯一性定理。此外，把式（27.5）中的常数 $\sigma$ 换成时间或状态的函数，就得到局部波动率模型与随机波动率模型，见第27.7节。

## 27.2 解的存在唯一性

定义 27.2 只说明了「解」是什么意思，并没有回答解是否存在、是否唯一。这一节给出保证这两点的标准充分条件，并用 Picard 迭代把解构造出来。整个论证与常微分方程的 Picard–Lindelöf 定理在结构上完全平行，唯一的实质差别是：这里的工作空间由随机过程组成，度量要用 $L^2$ 范数而非上确界范数，而把 Lipschitz 条件传递到范数上时需要 Doob 极大不等式与 Itô 等距性质。

### 27.2.1 Lipschitz 条件与线性增长条件

**定义 27.4（Lipschitz 条件与线性增长条件）**　称 Borel 函数 $b,\sigma:[0,T]\times\mathbb R\to\mathbb R$ 满足常数为 $L>0$ 的 Lipschitz 条件与线性增长条件，若对一切 $t\in[0,T]$ 与一切 $x,y\in\mathbb R$，

$$|b(t,x)-b(t,y)|+|\sigma(t,x)-\sigma(t,y)|\le L\,|x-y|,\qquad |b(t,x)|+|\sigma(t,x)|\le L\,(1+|x|) \tag{27.8}$$

第一个不等式控制系数对状态的敏感度，它保证两个候选解之间的距离不会自我放大，是唯一性的来源。第二个不等式控制系数在无穷远处的增长速度，它保证解不会在有限时间内跑到无穷远，是全局存在性的来源。

**注记（两个条件都不可省）**

先看线性增长条件。考虑 $\sigma\equiv0$ 的退化情形，即常微分方程

$$dx_t=x_t^2\,dt,\qquad x_0=1$$

右端 $b(x)=x^2$ 在任意紧区间上 Lipschitz 连续，却不满足线性增长条件。直接验证 $x_t=(1-t)^{-1}$：其导数为 $(1-t)^{-2}$，恰等于 $x_t^2$，且 $x_0=1$，故它是一个解。但 $x_t\to+\infty$ 当 $t\uparrow1$，即解在有限时间爆破，方程在 $[0,\infty)$ 上不存在整体解。这说明只有局部 Lipschitz 条件时，一般只能得到局部解：存在爆炸时刻 $\zeta$，使解在 $[0,\zeta)$ 上存在且 $\lim_{t\uparrow\zeta}|X_t|=\infty$。

再看 Lipschitz 条件。考虑

$$dx_t=\sqrt{|x_t|}\,dt,\qquad x_0=0$$

它至少有两个不同的解。第一个是恒零解 $x_t\equiv0$。第二个是：对任意给定的 $c\ge0$，令

$$x_t=0\ \ (0\le t\le c),\qquad x_t=\frac{(t-c)^2}{4}\ \ (t>c)$$

当 $t>c$ 时导数为 $\frac{1}{2}(t-c)$，而 $\sqrt{|x_t|}=\sqrt{(t-c)^2/4}=\frac{1}{2}(t-c)$，二者相等；当 $t\le c$ 时两边同时为零；且 $x_0=0$。故它确实是解。由于 $c$ 可任取，这个方程有无穷多个解。根源在于 $\sqrt{|x|}$ 在原点不是 Lipschitz 的：比值 $\sqrt{|x|}/|x|=|x|^{-1/2}$ 当 $x\to0$ 时趋于无穷。

两个条件的作用因此很清楚：线性增长条件管住解「能走多远」，Lipschitz 条件管住解「是否只有一条路」。

**注记（基本模型的验证）**　式（27.5）中 $b(t,x)=\mu x$，$\sigma(t,x)=\sigma x$。对任意 $x,y$ 有 $|b(t,x)-b(t,y)|=|\mu|\,|x-y|$，$|\sigma(t,x)-\sigma(t,y)|=\sigma|x-y|$，且 $|b(t,x)|+|\sigma(t,x)|\le(|\mu|+\sigma)|x|\le(|\mu|+\sigma)(1+|x|)$，故取 $L=|\mu|+\sigma$ 即满足式（27.8）。式（27.6）中 $b(t,x)=\theta(\mu-x)$，$\sigma(t,x)\equiv\sigma$，有 $|b(t,x)-b(t,y)|=\theta|x-y|$，且 $|b(t,x)|+\sigma\le\theta|\mu|+\theta|x|+\sigma\le(\theta|\mu|+\theta+\sigma)(1+|x|)$，取 $L=\theta|\mu|+\theta+\sigma$ 即可。这两个方程因此都有唯一的全局强解，第27.3节将把它们显式写出。式（27.7）的扩散系数不满足 Lipschitz 条件，需另行处理。

### 27.2.2 Gronwall 不等式

下面的引理是唯一性论证的核心工具，也是矩估计的来源。它的作用是把一个「$u$ 被它自己的积分控制」的隐式不等式，转化为一个显式的指数上界。

**引理 27.5（Gronwall 不等式）**

设 $T>0$，$u:[0,T]\to[0,\infty)$ 可测且局部有界，$\beta:[0,T]\to[0,\infty)$ 可积，$\alpha:[0,T]\to[0,\infty)$ 单调不减且可积。若对一切 $t\in[0,T]$ 有

$$u(t)\le\alpha(t)+\int_0^t \beta(s)\,u(s)\,ds$$

则对一切 $t\in[0,T]$，

$$u(t)\le\alpha(t)\,\exp\Big(\int_0^t \beta(s)\,ds\Big) \tag{27.9}$$

特别地，若 $\alpha\equiv0$，则 $u\equiv0$。

**证明**

为书写简便，记 $B(t)=\int_0^t\beta(r)\,dr$，它是绝对连续且单调不减的函数。再令

$$v(t)=\int_0^t \beta(s)\,u(s)\,ds$$

由 $u$ 局部有界与 $\beta$ 可积，$v$ 是 $[0,T]$ 上的绝对连续非负函数，且对 Lebesgue 几乎必然的 $t$，

$$v'(t)=\beta(t)\,u(t)\le\beta(t)\,\big[\alpha(t)+v(t)\big]$$

现引入辅助函数 $w(t)=e^{-B(t)}\,v(t)$。它也是绝对连续的，且几乎必然有

$$w'(t)=e^{-B(t)}\big[v'(t)-\beta(t)\,v(t)\big]\le e^{-B(t)}\,\beta(t)\,\alpha(t)$$

在 $[0,t]$ 上对 $w'$ 积分，并注意 $w(0)=e^{-B(0)}\,v(0)=0$，得

$$e^{-B(t)}\,v(t)=w(t)\le\int_0^t e^{-B(s)}\,\beta(s)\,\alpha(s)\,ds$$

由 $\alpha$ 单调不减，对一切 $s\le t$ 有 $\alpha(s)\le\alpha(t)$，故右端不超过

$$\alpha(t)\int_0^t e^{-B(s)}\,\beta(s)\,ds=\alpha(t)\int_0^t e^{-B(s)}\,dB(s)=\alpha(t)\,\big[1-e^{-B(t)}\big]$$

两边乘以 $e^{B(t)}$，得

$$v(t)\le\alpha(t)\,\big[e^{B(t)}-1\big]$$

代回假设 $u(t)\le\alpha(t)+v(t)$，即得

$$u(t)\le\alpha(t)+\alpha(t)\,\big[e^{B(t)}-1\big]=\alpha(t)\,e^{B(t)}$$

这正是式（27.9）。

若 $\alpha\equiv0$，上述推导给出 $v(t)\le0$；又 $v$ 非负，故 $v\equiv0$，从而 $u(t)\le\alpha(t)+v(t)=0$，即 $u\equiv0$。

□

**注记（常用特例）**　取 $\alpha(t)\equiv a\ge0$ 与 $\beta(s)\equiv b\ge0$ 为常数，式（27.9）化为：若 $u(t)\le a+b\int_0^t u(s)\,ds$ 对一切 $t\in[0,T]$ 成立，则 $u(t)\le a\,e^{bt}$。本节后面的所有矩估计都用这一形式。另一常用变体是反向的版本：若 $u(t)\le a+b\int_t^T u(s)\,ds$，则 $u(t)\le a\,e^{b(T-t)}$，证明完全平行，只需把积分区间换成 $[t,T]$ 并相应调整辅助函数中指数因子的方向。

### 27.2.3 Picard 迭代与存在唯一性定理

**定理 27.6（强解的存在唯一性）**

设 $b,\sigma:[0,T]\times\mathbb R\to\mathbb R$ 为 Borel 可测函数，满足式（27.8）中常数为 $L$ 的 Lipschitz 条件与线性增长条件；设 $\xi$ 为 $\mathcal F_0$-可测随机变量，$\mathbb E[\xi^2]<\infty$。则方程（27.2）在 $[0,T]$ 上存在唯一的连续适应解 $X$，并且：

(i) 存在只依赖于 $L$ 与 $T$ 的常数 $C$，使对一切 $t\in[0,T]$，

$$\mathbb E\Big[\sup_{0\le s\le t}|X_s|^2\Big]\le C\,\big(1+\mathbb E[\xi^2]\big)\,e^{Ct}$$

(ii) 若 $\eta$ 是另一个满足同样条件的初值，$Y$ 是以 $\eta$ 为初值的解，则

$$\mathbb E\Big[\sup_{0\le s\le t}|X_s-Y_s|^2\Big]\le C\,\mathbb E\big[|\xi-\eta|^2\big]\,e^{Ct}$$

即解关于初值在 $L^2$ 意义下连续依赖。

解可由 Picard 迭代构造：令 $X^{(0)}_t\equiv\xi$，并对 $n\ge0$ 递归定义

$$X^{(n+1)}_t=\xi+\int_0^t b\big(s,X^{(n)}_s\big)\,ds+\int_0^t \sigma\big(s,X^{(n)}_s\big)\,dB_s \tag{27.10}$$

则 $X^{(n)}$ 在 $[0,T]$ 上一致收敛到 $X$，收敛既在 $L^2$ 中成立，也在几乎必然的意义下成立。

**证明**

第一部分证明唯一性。设 $X$ 与 $Y$ 是方程（27.2）的两个连续适应解，记 $\Delta_t=X_t-Y_t$。定义停时

$$\tau_n=\inf\big\{t\ge 0:|X_t|\vee|Y_t|\ge n\big\}\wedge T$$

其中空集的下确界规定为 $\infty$。因为 $X$ 与 $Y$ 的路径连续，$\sup_{0\le s\le T}\big(|X_s|\vee|Y_s|\big)<\infty$ 几乎必然，故 $\tau_n\to T$ 几乎必然。在时刻 $t\wedge\tau_n$ 处使用式（27.2），

$$\Delta_{t\wedge\tau_n}=\int_0^{t\wedge\tau_n}\big[b(s,X_s)-b(s,Y_s)\big]\,ds+\int_0^{t\wedge\tau_n}\big[\sigma(s,X_s)-\sigma(s,Y_s)\big]\,dB_s$$

由不等式 $(a+b)^2\le 2a^2+2b^2$、Cauchy–Schwarz 不等式 $\big|\int_0^u f\,ds\big|^2\le u\int_0^u f^2\,ds$ 以及式（27.8）的 Lipschitz 部分，

$$\mathbb E\big|\Delta_{t\wedge\tau_n}\big|^2\le 2\,T\,L^2\,\mathbb E\int_0^{t\wedge\tau_n}|\Delta_s|^2\,ds+2\,\mathbb E\Big|\int_0^{t\wedge\tau_n}\big[\sigma(s,X_s)-\sigma(s,Y_s)\big]\,dB_s\Big|^2$$

对上式第二项使用 Itô 等距性质是合法的，因为被积函数在 $[0,t\wedge\tau_n]$ 上有界：当 $s<\tau_n$ 时 $|X_s|\vee|Y_s|<n$，故 $\big|\sigma(s,X_s)-\sigma(s,Y_s)\big|\le L|\Delta_s|\le 2Ln$，从而

$$\mathbb E\int_0^{t\wedge\tau_n}\big[\sigma(s,X_s)-\sigma(s,Y_s)\big]^2\,ds\le 4L^2n^2T<\infty$$

于是等距性质与 Lipschitz 条件给出

$$\mathbb E\Big|\int_0^{t\wedge\tau_n}\big[\sigma(s,X_s)-\sigma(s,Y_s)\big]\,dB_s\Big|^2=\mathbb E\int_0^{t\wedge\tau_n}\big[\sigma(s,X_s)-\sigma(s,Y_s)\big]^2\,ds\le L^2\,\mathbb E\int_0^{t\wedge\tau_n}|\Delta_s|^2\,ds$$

两项合并，记 $\psi_n(t)=\mathbb E\big|\Delta_{t\wedge\tau_n}\big|^2$，得

$$\psi_n(t)\le 2L^2(T+1)\,\mathbb E\int_0^{t\wedge\tau_n}|\Delta_s|^2\,ds$$

而 $\mathbb E\int_0^{t\wedge\tau_n}|\Delta_s|^2\,ds=\int_0^t\mathbb E\big[1_{\{s\le\tau_n\}}|\Delta_s|^2\big]\,ds\le\int_0^t\psi_n(s)\,ds$，这是因为在事件 $\{s\le\tau_n\}$ 上 $s\wedge\tau_n=s$ 从而两被积函数相同，在其补集上前者为零而后者非负。故

$$\psi_n(t)\le 2L^2(T+1)\int_0^t\psi_n(s)\,ds$$

这正是引理 27.5 中 $\alpha\equiv0$ 的情形，于是 $\psi_n\equiv0$。令 $n\to\infty$：对每个固定的 $t$，由 $\tau_n\to T\ge t$ 几乎必然得 $\Delta_{t\wedge\tau_n}\to\Delta_t$ 几乎必然，且 $\big|\Delta_{t\wedge\tau_n}\big|^2\le\sup_{0\le s\le T}|\Delta_s|^2$ 几乎必然有限，故控制收敛定理给出 $\mathbb E|\Delta_t|^2=\lim_n\psi_n(t)=0$，即 $X_t=Y_t$ 几乎必然。最后，把 $t$ 限制在 $[0,T]$ 中的有理数上，例外集是可数个零测集之并，仍为零测；在该零测集之外，两个连续函数在稠密的有理点集上相等，故在整个 $[0,T]$ 上恒等。所以 $X$ 与 $Y$ 不可区分，唯一性得证。

第二部分建立 Picard 迭代的一致矩界。由式（27.8）的线性增长部分，$|b(s,x)|\le L(1+|x|)$ 且 $|\sigma(s,x)|\le L(1+|x|)$，再由 $(p+q)^2\le2p^2+2q^2$ 得

$$|b(s,x)|^2\le 2L^2\big(1+|x|^2\big),\qquad |\sigma(s,x)|^2\le 2L^2\big(1+|x|^2\big)$$

记 $f_n(t)=\mathbb E\big[\sup_{0\le s\le t}\big|X^{(n)}_s\big|^2\big]$。先用归纳法确认 $f_n(t)<\infty$ 对一切 $n$ 与 $t$ 成立。$n=0$ 时 $X^{(0)}\equiv\xi$，$f_0(t)=\mathbb E[\xi^2]<\infty$。设 $f_n(t)<\infty$，则 $\mathbb E\int_0^t\sigma\big(s,X^{(n)}_s\big)^2\,ds\le2L^2\big(t+\int_0^t f_n(u)\,du\big)<\infty$，故式（27.10）中的 Itô 积分是平方可积鞅并有连续修正；Lebesgue 积分部分由 Cauchy–Schwarz 不等式同样有限。于是 $f_{n+1}(t)<\infty$。

对式（27.10）用不等式 $(a+b+c)^2\le3(a^2+b^2+c^2)$，

$$\sup_{0\le s\le t}\big|X^{(n+1)}_s\big|^2\le 3\xi^2+3\sup_{0\le s\le t}\Big|\int_0^s b\big(u,X^{(n)}_u\big)\,du\Big|^2+3\sup_{0\le s\le t}\Big|\int_0^s \sigma\big(u,X^{(n)}_u\big)\,dB_u\Big|^2$$

逐项取期望。第一项为 $3\,\mathbb E[\xi^2]$。第二项由 Cauchy–Schwarz 不等式估计为 $3t\int_0^t\big|b(u,X^{(n)}_u)\big|^2\,du$，其期望不超过 $3T\cdot2L^2\int_0^t\big(1+f_n(u)\big)\,du$。第三项用第25章的 Doob 极大不等式（$p=2$ 时常数为 4）与 Itô 等距性质，其期望不超过

$$12\,\mathbb E\int_0^t\sigma\big(u,X^{(n)}_u\big)^2\,du\le 24L^2\int_0^t\big(1+f_n(u)\big)\,du$$

三项合并，令 $C_1=3\,\mathbb E[\xi^2]+6L^2(T+4)\,T$ 与 $C_2=6L^2(T+4)$，得到递推不等式

$$f_{n+1}(t)\le C_1+C_2\int_0^t f_n(u)\,du$$

由于 $f_0(t)=\mathbb E[\xi^2]\le C_1$，对 $n$ 归纳并应用引理 27.5 即得，对一切 $n\ge0$ 与一切 $t\in[0,T]$，

$$f_n(t)\le C_1\,e^{C_2t}\le C_1\,e^{C_2T}$$

这一界与 $n$ 无关，是下面收敛性论证的基础。

第三部分证明迭代序列收敛。记 $\Delta^{(n)}_t=X^{(n+1)}_t-X^{(n)}_t$，并令 $g_n(t)=\mathbb E\big[\sup_{0\le s\le t}\big|\Delta^{(n)}_s\big|^2\big]$。把式（27.10）用于 $n+1$ 与 $n$ 并相减，

$$\Delta^{(n)}_t=\int_0^t\big[b\big(s,X^{(n)}_s\big)-b\big(s,X^{(n-1)}_s\big)\big]\,ds+\int_0^t\big[\sigma\big(s,X^{(n)}_s\big)-\sigma\big(s,X^{(n-1)}_s\big)\big]\,dB_s$$

初值项已经抵消，故第二部分中的三项估计在此完全平行地给出

$$g_n(t)\le C_2\int_0^t g_{n-1}(u)\,du,\qquad C_2=6L^2(T+4)$$

反复代入这一不等式 $n$ 次，得到

$$g_n(t)\le C_2^n\int_0^t\!\!\int_0^{u_1}\!\cdots\!\int_0^{u_{n-1}}g_0(u_n)\,du_n\cdots du_1$$

其中积分区域是单纯形 $\{0\le u_n\le\cdots\le u_1\le t\}$，其体积为 $t^n/n!$。由第二部分，$g_0(t)\le2\big(f_1(t)+f_0(t)\big)\le2\big(C_1e^{C_2T}+\mathbb E[\xi^2]\big)$，记此上界为 $M$，于是

$$g_n(t)\le M\,\frac{(C_2t)^n}{n!}\le M\,\frac{(C_2T)^n}{n!}$$

阶乘的出现是压缩性的来源。对级数求和，

$$\mathbb E\Big[\sum_{n\ge0}\sup_{0\le s\le T}\big|\Delta^{(n)}_s\big|\Big]\le\sum_{n\ge0}\big(g_n(T)\big)^{1/2}\le M^{1/2}\sum_{n\ge0}\frac{(C_2T)^{n/2}}{\sqrt{n!}}<\infty$$

第一个不等号用了 Jensen 不等式，第二个级数由比值判别法收敛，因为相邻项之比为 $\sqrt{C_2T/(n+1)}\to0$。期望有限推出被积函数几乎必然有限，故

$$\sum_{n\ge0}\sup_{0\le s\le T}\big|X^{(n+1)}_s-X^{(n)}_s\big|<\infty$$

几乎必然成立。于是望远镜级数 $X^{(n)}_t=\xi+\sum_{k=0}^{n-1}\Delta^{(k)}_t$ 在 $[0,T]$ 上一致收敛，其极限

$$X_t=\xi+\sum_{k\ge0}\Delta^{(k)}_t$$

作为一致收敛的连续函数列之极限仍具有连续路径。在一个零测集上把 $X$ 重新定义为常值 $\xi$，可保证 $X$ 处处连续且适应。

此外，由 Minkowski 不等式，对 $m>n$，

$$\Big(\mathbb E\Big[\sup_{0\le s\le T}\big|X^{(m)}_s-X^{(n)}_s\big|^2\Big]\Big)^{1/2}\le\sum_{k=n}^{m-1}\big(g_k(T)\big)^{1/2}\longrightarrow0$$

故 $\big(X^{(n)}\big)$ 是完备空间 $L^2\big(\Omega;C[0,T]\big)$ 中的 Cauchy 列，其 $L^2$ 极限必与上面几乎必然一致收敛所得的 $X$ 相同。因此 $X^{(n)}\to X$ 既在 $L^2\big(\Omega;C[0,T]\big)$ 中，也在 $[0,T]$ 上一致地几乎必然收敛。

第四部分把极限通过积分号，验证 $X$ 确实满足式（27.2）。先处理 Lebesgue 积分部分。由 Lipschitz 条件蕴含的连续性，$X^{(n)}\to X$ 一致收敛推出 $b\big(s,X^{(n)}_s\big)\to b(s,X_s)$ 对 $ds\times d\mathbb P$-几乎处处的 $(s,\omega)$ 成立。令

$$W=\sup_{0\le u\le T}|X_u|+\sup_{n\ge0}\sup_{0\le u\le T}\big|X^{(n)}_u-X_u\big|$$

由第二部分的一致矩界与 Fatou 引理，$\mathbb E[\sup_{u\le T}|X_u|^2]\le C_1e^{C_2T}$；由第三部分与 Minkowski 不等式，

$$\Big\|\sup_{n\ge0}\sup_{0\le u\le T}\big|X^{(n)}_u-X_u\big|\Big\|_{L^2}\le\sum_{k\ge0}\big(g_k(T)\big)^{1/2}<\infty$$

故 $\mathbb E[W^2]<\infty$。于是 $\big|b(s,X^{(n)}_s)\big|\le L(1+W)$ 给出了一个属于 $L^2\big([0,T]\times\Omega\big)$、从而属于 $L^1$ 的控制函数，Lebesgue 控制收敛定理给出

$$\int_0^T\big|b\big(s,X^{(n)}_s\big)-b(s,X_s)\big|\,ds\longrightarrow 0$$

于 $L^1$ 中，因而对每个 $t\le T$，$\int_0^t b(s,X^{(n)}_s)\,ds\to\int_0^t b(s,X_s)\,ds$ 于 $L^1$ 中。

再处理 Itô 积分部分。由等距性质与 Lipschitz 条件，

$$\mathbb E\Big|\int_0^t \sigma\big(s,X^{(n)}_s\big)\,dB_s-\int_0^t \sigma(s,X_s)\,dB_s\Big|^2=\mathbb E\int_0^t\big|\sigma\big(s,X^{(n)}_s\big)-\sigma(s,X_s)\big|^2\,ds\le L^2\,T\,\mathbb E\Big[\sup_{0\le s\le T}\big|X^{(n)}_s-X_s\big|^2\Big]$$

右端由第三部分的 $L^2$ 收敛趋于零。于是式（27.10）的两端在 $n\to\infty$ 时分别收敛：左端一致地几乎必然收敛到 $X_t$，右端两项分别在 $L^1$ 与 $L^2$ 中收敛到对应的以 $X$ 为被积函数的积分。故极限等式在概率意义下成立，而两端都是连续过程，取子列即得式（27.2）对一切 $t\in[0,T]$ 同时几乎必然成立。同时，$|b(s,X_s)|\le L(1+W)$ 与 $\sigma(s,X_s)^2\le2L^2(1+W^2)$ 且 $\mathbb E[W^2]<\infty$，说明定义 27.2 中的条件 2 成立，$X$ 确为解。

第五部分导出结论 (i) 与 (ii)。对 (i)，在第二部分的一致界 $f_n(t)\le C_1e^{C_2t}$ 中令 $n\to\infty$ 并用 Fatou 引理：

$$\mathbb E\Big[\sup_{0\le s\le t}|X_s|^2\Big]\le\liminf_{n\to\infty}\mathbb E\Big[\sup_{0\le s\le t}\big|X^{(n)}_s\big|^2\Big]\le C_1\,e^{C_2t}$$

取 $C=\max\{3,6L^2(T+4)\,T,C_2\}$。由 $C_1=3\,\mathbb E[\xi^2]+6L^2(T+4)\,T\le C\big(1+\mathbb E[\xi^2]\big)$ 且 $C_2\le C$，即得 (i)。

对 (ii)，把 $\xi$ 换成 $\eta$ 重复第二至第四部分的全部论证，得到解 $Y$ 与其迭代序列 $\big(Y^{(n)}\big)$；过程中出现的常数 $C_1,C_2,L,T$ 完全相同，因为它们只依赖系数而不依赖初值。令

$$h_n(t)=\mathbb E\Big[\sup_{0\le s\le t}\big|X^{(n)}_s-Y^{(n)}_s\big|^2\Big]$$

把第三部分中对 $g_n$ 使用的三项估计照搬到 $X^{(n)}-Y^{(n)}$ 上，唯一的差别是初值项不再抵消，而是 $|\xi-\eta|$，于是

$$h_n(t)\le 3\,\mathbb E\big[|\xi-\eta|^2\big]+C_2\int_0^t h_{n-1}(u)\,du$$

对 $n$ 归纳并应用引理 27.5（此处 $\alpha$ 为常数、$\beta\equiv C_2$），得 $h_n(t)\le3\,\mathbb E[|\xi-\eta|^2]\,e^{C_2t}$。再用 Fatou 引理令 $n\to\infty$，即得 (ii)。

唯一性由第一部分给出，存在性由第三、四部分给出，两个估计由第五部分给出。定理证毕。

□

**注记**　定理 27.6 的证明结构与常微分方程的 Picard–Lindelöf 定理逐条对应，实质差别只在三处。第一，压缩性不是在一致范数下直接得到的，而是通过阶乘衰减 $M(C_2t)^n/n!$ 实现；这等价于对某个加权范数使用 Banach 不动点定理，而阶乘因子正是迭代积分在单纯形上累积的结果。第二，从 $L^2$ 收敛过渡到几乎必然收敛需要第三部分中的级数论证，经典情形则直接由一致收敛得到。第三，控制随机积分必须借助 Itô 等距性质与 Doob 极大不等式，这是确定性理论中没有的成分。

若把 Lipschitz 条件减弱为局部 Lipschitz，即对每个 $R>0$，$b$ 与 $\sigma$ 在区域 $\{(t,x):|x|\le R\}$ 上 Lipschitz 而常数依赖于 $R$，同时保留线性增长条件，则同样的论证配合停时截断给出唯一的全局解。若连线性增长条件也去掉，则一般只能得到定义在随机区间 $[0,\zeta)$ 上的局部解，其中 $\zeta$ 是爆炸时刻，正如第27.2.1节中 $dx_t=x_t^2\,dt$ 的例子所示。

### 27.2.4 弱解与强解

定理 27.6 所说的解是在一个事先给定的滤波概率空间上、以给定的 Brown 运动 $B$ 为驱动、并要求 $X$ 关于由 $\xi$ 与 $B$ 生成的滤波适应的解。这种解称为强解。但在扩散系数不够正则的情形下，强解可能并不存在；如果放宽要求，允许在求解的同时一并构造底层的概率空间与 Brown 运动，解就可能存在。这导致弱解的概念。

**定义 27.7（强解、弱解与两种唯一性）**

(i) 称四元组 $\big((\Omega,\mathcal F,(\mathcal F_t),\mathbb P),\,\xi,\,B,\,X\big)$ 为方程（27.2）的一个弱解，若 $(\Omega,\mathcal F,(\mathcal F_t),\mathbb P)$ 是满足通常条件的滤波概率空间，$B$ 是其上关于 $(\mathcal F_t)$ 适应的 Brown 运动，$\xi$ 是 $\mathcal F_0$-可测随机变量，$X$ 是连续适应过程，且式（27.2）对一切 $t\ge0$ 几乎必然成立。

(ii) 若在上述之外还要求 $X$ 关于增广滤波 $\big(\mathcal F_t^{\xi,B}\big)_{t\ge0}$ 适应，其中 $\mathcal F_t^{\xi,B}$ 是由 $\xi$ 与 $\{B_s:s\le t\}$ 生成并经通常条件增广的 $\sigma$-代数，则称 $X$ 为强解。等价的说法是：存在可测映射 $\Phi$ 使 $X=\Phi(\xi,B)$，即强解是初值与驱动噪声的泛函。

(iii) 称方程满足路径唯一性，若在任意给定的滤波概率空间上，任意两个以同一个 $B$ 与同一个 $\xi$ 为条件的解都不可区分。

(iv) 称方程满足依律唯一性，若任意两个弱解——它们可以定义在完全不同的概率空间上——的过程 $X$ 在 $C[0,\infty)$ 上具有相同的律，即有限维分布相同且路径连续。

**注记**　四个概念的关系如下。强解必是弱解，反之不然；路径唯一性蕴含依律唯一性，反之不然。定理 27.6 在 Lipschitz 与线性增长条件下同时给出强解的存在性与路径唯一性，因而是最强的结论。

弱解之所以必须引入，是因为确实存在只有弱解而没有强解的方程。经典的例子是 Tanaka 方程

$$dX_t=\operatorname{sgn}(X_t)\,dB_t,\qquad X_0=0$$

其中 $\operatorname{sgn}(x)=1$ 当 $x>0$，$\operatorname{sgn}(x)=-1$ 当 $x<0$，而 $\operatorname{sgn}(0)$ 的取值无关紧要。由于 $\operatorname{sgn}^2\equiv1$，Itô 等距性质立即给出任何弱解都满足 $[X]_t=t$；再由第26章末陈述的 Lévy 刻画，$X$ 本身就是一个标准 Brown 运动。这说明依律唯一性成立、弱解存在（取 $X=B$ 并令 $B_t=\int_0^t\operatorname{sgn}(X_s)\,dX_s$ 即可反向构造）。然而该方程没有强解：$X$ 生成的滤波严格小于 $B$ 生成的滤波，$\operatorname{sgn}(X_t)$ 这一符号信息无法从 $X$ 的历史中恢复。这个例子清楚地表明，扩散系数的正则性直接决定了解能否由驱动噪声唯一地确定。

Yamada–Watanabe 定理把两侧联系起来：若方程存在弱解且满足路径唯一性，则它存在强解且满足依律唯一性。反过来说，弱存在性加上路径唯一性就足以推出强存在性。该定理的证明需要在路径空间 $C[0,\infty)$ 上进行细致的测度论构造，超出本章范围，此处只给出陈述与用法。它的实际价值在于：对不满足全局 Lipschitz 条件的方程，可以先用紧性方法（例如鞅问题的相对紧论证）建立弱解的存在性，再单独证明路径唯一性，从而一举得到强解。

第27.3.3节讨论式（27.7）时会遇到一个中间情形：当 $2\kappa\theta<\xi^2$ 时，CIR 方程的扩散系数在边界零附近不是 Lipschitz 的，其路径唯一性需要借助一维扩散的边界分类理论才能得到，此时通常只在弱解的意义下讨论该模型。

## 27.3 线性随机微分方程与显式解

上一节保证了解的存在与唯一，却没有给出解的表达式。绝大多数非线性方程没有闭式解，只能依赖数值离散化，见第27.7节。但有三类方程可以完全求解，而它们恰好覆盖了量化研究中最常用的连续时间模型。本节的全部工具只有两个：Itô 公式（定理 27.3）与积分因子法（即常微分方程中求解一阶线性方程的标准手法）。

### 27.3.1 几何 Brown 运动

**命题 27.8（几何 Brown 运动的显式解）**

设 $\mu\in\mathbb R$，$\sigma>0$，$s_0>0$。方程（27.5）

$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t,\qquad S_0=s_0$$

存在唯一的连续适应解，并且对一切 $t\ge0$，

$$S_t=s_0\exp\Big[\Big(\mu-\frac{1}{2}\,\sigma^2\Big)t+\sigma B_t\Big] \tag{27.11}$$

几乎必然成立。特别地，$S_t>0$ 恒成立，且

$$\ln S_t\sim N\Big(\ln s_0+\Big(\mu-\frac{1}{2}\,\sigma^2\Big)t,\ \ \sigma^2 t\Big)$$

**证明**

先处理存在唯一性。此处 $b(t,x)=\mu x$，$\sigma(t,x)=\sigma x$，由第27.2.1节的注记，取 $L=|\mu|+\sigma$ 即满足式（27.8），故定理 27.6 适用，方程存在唯一的连续适应解。于是只需验证式（27.11）给出的过程确为一个解，唯一性会自动把它认定为那个解。

令 $Y_t=\big(\mu-\frac{1}{2}\sigma^2\big)t+\sigma B_t$。$Y$ 是 Itô 过程，其系数为常值：

$$dY_t=\Big(\mu-\frac{1}{2}\,\sigma^2\Big)dt+\sigma\,dB_t$$

再令 $f(x)=s_0e^x$ 与 $S_t=f(Y_t)$。$f\in C^2(\mathbb R)$，且 $f'(x)=f''(x)=s_0e^x=f(x)$。由定理 27.3（$f$ 不显含时间变量，故 $\partial_t f\equiv0$），

$$dS_t=f'(Y_t)\,dY_t+\frac{1}{2}\,f''(Y_t)\,\sigma^2\,dt=f(Y_t)\Big[\Big(\mu-\frac{1}{2}\,\sigma^2\Big)dt+\sigma\,dB_t\Big]+\frac{1}{2}\,f(Y_t)\,\sigma^2\,dt$$

把 $dt$ 的系数合并：

$$\Big(\mu-\frac{1}{2}\,\sigma^2\Big)+\frac{1}{2}\,\sigma^2=\mu$$

于是

$$dS_t=\mu\,f(Y_t)\,dt+\sigma\,f(Y_t)\,dB_t=\mu S_t\,dt+\sigma S_t\,dB_t$$

而 $S_0=s_0e^0=s_0$。可见 $S$ 满足方程。$S$ 显然连续适应；又因为连续路径在 $[0,T]$ 上有界，$\int_0^T\big(|\mu S_t|+\sigma^2S_t^2\big)\,dt<\infty$ 几乎必然成立，故定义 27.2 的三个条件全部满足，$S$ 是解。

最后，式（27.11）给出 $\ln S_t=\ln s_0+\big(\mu-\frac{1}{2}\sigma^2\big)t+\sigma B_t$，而 $B_t\sim N(0,t)$，正态分布经仿射变换仍为正态，故 $\ln S_t$ 服从所述分布。$S_t=s_0e^{Y_t}$ 是两个正数之积，恒正。

□

**注记（$\frac{1}{2}\sigma^2$ 修正的来源）**　式（27.11）的指数是 $\big(\mu-\frac{1}{2}\sigma^2\big)t+\sigma B_t$，而不是直觉上可能期待的 $\mu t+\sigma B_t$。这一差别完全来自 Itô 修正项。把 $f(x)=\ln x$ 应用于 $S$：$f'(x)=1/x$，$f''(x)=-1/x^2$，故

$$d(\ln S_t)=\frac{1}{S_t}\,dS_t-\frac{1}{2S_t^2}\,d[S]_t$$

由命题 27.8，$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t$；又 Itô 过程的二次变差等于扩散系数平方的积分，故 $d[S]_t=\sigma^2S_t^2\,dt$。代入得

$$d(\ln S_t)=\Big(\mu-\frac{1}{2}\,\sigma^2\Big)dt+\sigma\,dB_t$$

负号与系数 $\frac{1}{2}$ 都出自 $f''(x)=-1/x^2<0$：对数是凹函数，波动本身就足以压低 $\ln S_t$ 的平均增长率。由此对数收益的期望 $\mu-\frac{1}{2}\sigma^2$ 严格小于算术收益的期望 $\mu$，二者之差 $\frac{1}{2}\sigma^2$ 称为波动率拖累，第34章讨论绩效指标的年化时会再次遇到它。

**注记（离散复合的极限）**　同一事实有纯离散的解释。把 $[0,t]$ 等分为 $n$ 段，$\Delta=t/n$，设想价格在每段上乘以 $1+\mu\Delta+\sigma\sqrt{\Delta}\,Z_i$，其中 $Z_1,\dots,Z_n$ 独立同分布于 $N(0,1)$。取对数并用 $\ln(1+x)=x-\frac{1}{2}x^2+o(x^2)$：

$$\ln S_t-\ln s_0=\sum_{i=1}^n\Big[\mu\Delta+\sigma\sqrt{\Delta}\,Z_i-\frac{1}{2}\big(\mu\Delta+\sigma\sqrt{\Delta}\,Z_i\big)^2+o(\Delta)\Big]$$

令 $n\to\infty$。第一项 $\sum_i\mu\Delta=\mu t$ 不变；第二项 $\sum_i\sigma\sqrt{\Delta}\,Z_i$ 收敛到 $\sigma B_t$；展开的二次项中只有 $-\frac{1}{2}\sum_i\sigma^2\Delta Z_i^2$ 存活，它收敛到 $-\frac{1}{2}\sigma^2t$，因为 $\sum_i\Delta Z_i^2\to t$ 正是 Brown 运动二次变差的离散表现（第26章）；其余如 $\sum_i\mu^2\Delta^2\le\mu^2t\Delta\to0$ 与 $\sum_i\mu\sigma\Delta^{3/2}Z_i$（方差为 $\mu^2\sigma^2\Delta^2t\to0$）都消失。极限恰为式（27.11）的指数。这说明 $\frac{1}{2}\sigma^2$ 并非某种记账约定，而是高频复合过程中二阶波动累积的必然结果。

**注记（矩、条件分布与鞅性质）**　由式（27.11）与例 27.1(iii) 中算得的矩母函数 $\mathbb E[e^{\alpha B_t}]=e^{\alpha^2t/2}$，对任意实数 $p$ 有

$$\mathbb E\big[S_t^p\big]=s_0^p\,e^{p(\mu-\frac{1}{2}\sigma^2)t}\,\mathbb E\big[e^{p\sigma B_t}\big]=s_0^p\exp\Big[p\mu t+\frac{1}{2}\,p(p-1)\,\sigma^2t\Big]$$

因为 $p\big(\mu-\frac{1}{2}\sigma^2\big)t+\frac{1}{2}p^2\sigma^2t=p\mu t+\frac{1}{2}(p^2-p)\sigma^2t$。取 $p=1$ 与 $p=2$，得

$$\mathbb E[S_t]=s_0\,e^{\mu t},\qquad \mathbb E\big[S_t^2\big]=s_0^2\,e^{(2\mu+\sigma^2)t},\qquad \operatorname{Var}(S_t)=s_0^2\,e^{2\mu t}\big(e^{\sigma^2t}-1\big) \tag{27.12}$$

条件形式同样直接。对 $s<t$，由式（27.11）可写成

$$S_t=S_s\exp\Big[\Big(\mu-\frac{1}{2}\,\sigma^2\Big)(t-s)+\sigma\big(B_t-B_s\big)\Big]$$

而 $B_t-B_s$ 与 $\mathcal F_s$ 独立且服从 $N(0,t-s)$，故

$$\mathbb E[S_t\mid\mathcal F_s]=S_s\,e^{(\mu-\frac{1}{2}\sigma^2)(t-s)}\,\mathbb E\big[e^{\sigma(B_t-B_s)}\big]=S_s\,e^{(\mu-\frac{1}{2}\sigma^2)(t-s)}\,e^{\frac{1}{2}\sigma^2(t-s)}=S_s\,e^{\mu(t-s)}$$

完全相同的计算给出 $\mathbb E\big[S_t^2\mid\mathcal F_s\big]=S_s^2\,e^{(2\mu+\sigma^2)(t-s)}$，从而

$$\operatorname{Var}(S_t\mid\mathcal F_s)=S_s^2\,e^{2\mu(t-s)}\big(e^{\sigma^2(t-s)}-1\big)$$

由第一个条件期望立即可见，折现过程 $\big(e^{-\mu t}S_t\big)_{t\ge0}$ 是鞅。把 $\mu$ 换成无风险利率 $r$，$e^{-rt}S_t$ 便是风险中性测度下的鞅；第27.5节的 Girsanov 定理将说明如何把一般的 $\mu$ 变换到 $r$，第33章的 Black–Scholes 公式的全部结构由此而来。

还有一点值得强调。$S_t$ 的中位数为 $s_0e^{(\mu-\frac{1}{2}\sigma^2)t}$，严格小于其均值 $s_0e^{\mu t}$。对数正态分布的这一右偏性质意味着：用期望价格来评估一个长期多头头寸会系统性高估典型结果，中位数才是多数路径的落点，而均值被少数极端上涨的路径拉高。波动率越大，二者差距越大，差距的相对幅度正是 $e^{\sigma^2t/2}$。

**例 27.2**　设某资产价格服从几何 Brown 运动（27.5），当前价格 $S_0=100$，年化期望收益率 $\mu=0.08$，年化波动率 $\sigma=0.20$，时间以年为单位。计算下列各量。

(i) $\mathbb E[S_1]$、$\operatorname{Var}(S_1)$ 与 $\mathbb E[S_3]$。

(ii) $S_1$ 的中位数，以及概率 $\mathbb P(S_1<S_0)$。

(iii) 一年期对数收益 $\ln(S_1/S_0)$ 的分布，以及使 $\mathbb P(S_1\le K)\le0.01$ 成立的最大 $K$。

(iv) 若波动率提高到 $\sigma=0.40$ 而 $\mu$ 保持 $0.08$ 不变，重新计算 (ii) 中的中位数与概率，并解释结果的含义。

**解**

(i) 由式（27.12），

$$\mathbb E[S_1]=100\,e^{0.08}=100\times1.083287=108.33$$

$$\operatorname{Var}(S_1)=100^2\,e^{0.16}\big(e^{0.04}-1\big)=10000\times1.173511\times0.040811=478.9$$

标准差为 $\sqrt{478.9}=21.88$，约为均值的百分之二十。再取 $t=3$：

$$\mathbb E[S_3]=100\,e^{0.24}=100\times1.271249=127.12$$

注意 $\mathbb E[S_3]$ 并不等于 $\mathbb E[S_1]^3/100^2$ 之类的复合形式，而恰为 $100e^{0.08\times3}$，因为折现过程 $e^{-\mu t}S_t$ 是鞅。

(ii) 由命题 27.8，$\ln S_1\sim N\big(\ln100+0.06,\ 0.04\big)$，其中指数中的漂移为 $\mu-\frac{1}{2}\sigma^2=0.08-0.02=0.06$，方差为 $\sigma^2=0.04$。中位数是对数正态分布的 $e^{\text{均值}}$，故

$$\operatorname{median}(S_1)=100\,e^{0.06}=100\times1.061837=106.18$$

而

$$\mathbb P(S_1<S_0)=\mathbb P\Big(\ln\frac{S_1}{S_0}<0\Big)=\Phi\Big(\frac{0-0.06}{0.2}\Big)=\Phi(-0.3)=1-\Phi(0.3)=1-0.6179=0.3821$$

其中 $\Phi$ 为标准正态分布函数，$\Phi(0.3)=0.6179$ 取自标准正态表（第11章）。

(iii) 由 (ii) 已得 $\ln(S_1/S_0)\sim N(0.06,\,0.2^2)$，即均值为 $0.06$、标准差为 $0.2$ 的正态分布。要求 $\mathbb P(S_1\le K)\le0.01$，等价于

$$\Phi\Big(\frac{\ln(K/100)-0.06}{0.2}\Big)\le0.01$$

由 $\Phi$ 单调递增且标准正态的 $0.01$ 分位数为 $z_{0.01}=-2.3263$，这要求

$$\frac{\ln(K/100)-0.06}{0.2}\le-2.3263,\qquad \ln\frac{K}{100}\le0.06-0.46526=-0.40526$$

故 $K\le100\,e^{-0.40526}=100\times0.6668=66.68$。最大的 $K$ 就是 $S_1$ 的百分之一分位数 $66.68$，比当前价格低约三分之一。这个数是一年期 $99\%$ 置信水平的价格下界，第32章的 VaR 与 ES 将在此基础上讨论尾部度量。

(iv) 当 $\sigma=0.40$ 时，指数中的漂移变为 $\mu-\frac{1}{2}\sigma^2=0.08-0.08=0$。于是

$$\operatorname{median}(S_1)=100\,e^{0}=100,\qquad \mathbb P(S_1<S_0)=\Phi\Big(\frac{0-0}{0.4}\Big)=\Phi(0)=0.5$$

方差则由式（27.12）得

$$\operatorname{Var}(S_1)=100^2\,e^{0.16}\big(e^{0.16}-1\big)=10000\times1.173511\times0.173511=2036.2$$

标准差为 $45.12$。而期望价格 $\mathbb E[S_1]=100e^{0.08}=108.33$ 与 $\sigma=0.20$ 时完全相同，因为式（27.12）的第一式不含 $\sigma$。

把这四个数字放在一起，结论十分清楚：波动率翻倍没有改变期望价格，却把典型路径的终点从上涨百分之六点二压到零，把亏损概率从 $0.3821$ 抬到 $0.5$，并把标准差从 $21.88$ 扩大到 $45.12$。其机理是波动率拖累 $\frac{1}{2}\sigma^2$ 由 $0.02$ 增至 $0.08$，恰好吞掉了全部的期望收益率。期望之所以保持不变，是因为分布的右尾变得更厚：极少数大幅上涨的路径承担了全部期望，而多数路径的结局反而恶化。

这对绩效评估与风险管理有直接教训。在对数正态模型下，用算术期望衡量长期收益是误导性的，因为它对尾部极端值高度敏感；几何平均 $\mu-\frac{1}{2}\sigma^2$ 才是复利增长的典型速率。第34章将把这一差别形式化为算术收益与对数收益的年化区别，并解释为什么夏普比率的分子宜取对数收益而分母必须取波动率。

### 27.3.2 Ornstein–Uhlenbeck 过程

几何 Brown 运动的求解依赖一个技巧：换元到对数尺度，把方程化为系数为常数的形式。Ornstein–Uhlenbeck 过程的求解依赖另一个技巧，即积分因子法。它与常微分方程中求解 $x'+\theta x=g(t)$ 的手法完全一致，唯一的区别是乘积法则必须用 Itô 公式而不是 Leibniz 法则。

**命题 27.9（Ornstein–Uhlenbeck 过程的显式解）**

设 $\theta>0$，$\mu\in\mathbb R$，$\sigma>0$，$\xi$ 为 $\mathcal F_0$-可测且 $\mathbb E[\xi^2]<\infty$。方程（27.6）

$$dX_t=\theta(\mu-X_t)\,dt+\sigma\,dB_t,\qquad X_0=\xi$$

存在唯一的连续适应解，并且对一切 $t\ge0$，

$$X_t=\mu+e^{-\theta t}\,(\xi-\mu)+\sigma\int_0^t e^{-\theta(t-s)}\,dB_s \tag{27.13}$$

几乎必然成立。若 $\xi$ 与 $B$ 独立，则

$$\mathbb E[X_t]=\mu+e^{-\theta t}\,\big(\mathbb E[\xi]-\mu\big),\qquad \operatorname{Var}(X_t)=e^{-2\theta t}\,\operatorname{Var}(\xi)+\frac{\sigma^2}{2\theta}\,\big(1-e^{-2\theta t}\big)$$

若进一步假定 $\xi$ 服从正态分布，则每个 $X_t$ 也服从正态分布。

**证明**

存在唯一性由定理 27.6 给出：此处 $b(t,x)=\theta(\mu-x)$，$\sigma(t,x)\equiv\sigma$，取 $L=\theta|\mu|+\theta+\sigma$ 即满足式（27.8）。

以下用积分因子法求解。先证必要性，即任何解都必具式（27.13）的形式。设 $X$ 是解，令

$$Y_t=e^{\theta t}\,\big(X_t-\mu\big)$$

$Y$ 是含时函数 $f(t,x)=e^{\theta t}(x-\mu)$ 与 Itô 过程 $X$ 的复合。$f$ 的三个偏导数为 $\partial_t f(t,x)=\theta e^{\theta t}(x-\mu)$，$\partial_x f(t,x)=e^{\theta t}$，$\partial_{xx}f(t,x)=0$，故由定理 27.3，Itô 修正项为零：

$$dY_t=\theta e^{\theta t}\big(X_t-\mu\big)\,dt+e^{\theta t}\,dX_t=e^{\theta t}\Big[\theta\big(X_t-\mu\big)\,dt+dX_t\Big]$$

把 $dX_t=\theta(\mu-X_t)\,dt+\sigma\,dB_t$ 代入方括号，前两项恰好抵消：

$$\theta\big(X_t-\mu\big)\,dt+\theta\big(\mu-X_t\big)\,dt+\sigma\,dB_t=\sigma\,dB_t$$

于是 $dY_t=\sigma e^{\theta t}\,dB_t$。在 $[0,t]$ 上积分，

$$Y_t=Y_0+\sigma\int_0^t e^{\theta s}\,dB_s=(\xi-\mu)+\sigma\int_0^t e^{\theta s}\,dB_s$$

回代 $X_t=\mu+e^{-\theta t}Y_t$，并把因子 $e^{-\theta t}$ 移入被积函数，即得式（27.13）。

再证充分性。令 $X$ 由式（27.13）定义，并把因子 $e^{\theta t}$ 乘回去：

$$e^{\theta t}\,\big(X_t-\mu\big)=(\xi-\mu)+\sigma\int_0^t e^{\theta s}\,dB_s$$

记右端为 $Y_t$。$Y$ 是 Itô 过程，且 $dY_t=\sigma e^{\theta t}\,dB_t$。另一方面 $X_t=g(t,Y_t)$，其中 $g(t,y)=\mu+e^{-\theta t}y$，其偏导数为 $\partial_t g=-\theta e^{-\theta t}y$，$\partial_y g=e^{-\theta t}$，$\partial_{yy}g=0$。再由定理 27.3，

$$dX_t=-\theta e^{-\theta t}Y_t\,dt+e^{-\theta t}\,dY_t=-\theta\big(X_t-\mu\big)\,dt+e^{-\theta t}\cdot\sigma e^{\theta t}\,dB_t=\theta\big(\mu-X_t\big)\,dt+\sigma\,dB_t$$

并且 $X_0=\mu+(\xi-\mu)=\xi$。故 $X$ 满足方程（27.6）。它的路径连续，因为 Itô 积分取连续修正而其余两项连续；它适应，因为被积函数 $e^{-\theta(t-s)}$ 是确定性的。由唯一性，式（27.13）给出的正是那个唯一的解。

以下计算矩。记 $I_t=\int_0^t e^{-\theta(t-s)}\,dB_s$。被积函数关于 $(s,\omega)$ 是确定性的且平方可积，故由第26章的构造，$I_t$ 是均值为零的正态随机变量，其方差由 Itô 等距性质给出：

$$\mathbb E\big[I_t^2\big]=\int_0^t e^{-2\theta(t-s)}\,ds=e^{-2\theta t}\cdot\frac{e^{2\theta t}-1}{2\theta}=\frac{1-e^{-2\theta t}}{2\theta}$$

于是

$$\mathbb E[X_t]=\mu+e^{-\theta t}\,\big(\mathbb E[\xi]-\mu\big)+\sigma\,\mathbb E[I_t]=\mu+e^{-\theta t}\,\big(\mathbb E[\xi]-\mu\big)$$

对方差，先写成中心化的形式

$$X_t-\mathbb E[X_t]=e^{-\theta t}\,\big(\xi-\mathbb E[\xi]\big)+\sigma I_t$$

两项均值都为零，故

$$\operatorname{Var}(X_t)=e^{-2\theta t}\,\operatorname{Var}(\xi)+2\sigma e^{-\theta t}\,\mathbb E\Big[\big(\xi-\mathbb E[\xi]\big)I_t\Big]+\sigma^2\,\mathbb E\big[I_t^2\big]$$

交叉项为零：由 $\xi$ 与 $B$ 独立，$\xi-\mathbb E[\xi]$ 与 $I_t$ 独立，从而 $\mathbb E[(\xi-\mathbb E[\xi])I_t]=\mathbb E[\xi-\mathbb E[\xi]]\,\mathbb E[I_t]=0$。代入 $\mathbb E[I_t^2]$ 即得所述方差公式。

若进一步假定 $\xi\sim N(m_0,v_0)$ 且与 $B$ 独立，则式（27.13）把 $X_t$ 写成常数 $\mu(1-e^{-\theta t})$ 与两个相互独立的正态变量 $e^{-\theta t}\xi$、$\sigma I_t$ 之和，故 $X_t$ 仍服从正态分布，其均值与方差即上面算出的两个表达式。

□

**注记（协方差函数）**　以下设初值 $\xi$ 为确定常数 $x_0$，则 $X$ 是高斯过程，其全部有限维分布由均值函数与协方差函数决定；均值函数已在命题 27.9 中给出。对协方差函数，取 $0\le s\le t$，由式（27.13），

$$X_s-\mathbb E[X_s]=\sigma\int_0^s e^{-\theta(s-u)}\,dB_u,\qquad X_t-\mathbb E[X_t]=\sigma\int_0^t e^{-\theta(t-v)}\,dB_v$$

两个 Itô 积分的协方差由等距性质的双线性推广给出，即对确定性平方可积函数 $H$ 与 $K$ 有 $\mathbb E\big[\int_0^T H\,dB\cdot\int_0^T K\,dB\big]=\int_0^T HK\,du$。把 $H$ 与 $K$ 分别取为在 $[0,s]$ 外为零的 $e^{-\theta(s-u)}$ 与在 $[0,t]$ 外为零的 $e^{-\theta(t-u)}$，得

$$\operatorname{Cov}(X_s,X_t)=\sigma^2\int_0^{s\wedge t}e^{-\theta(s-u)}\,e^{-\theta(t-u)}\,du$$

上限为 $s\wedge t$ 是因为两个被积函数中总有一个在更大的区间上为零。计算这一积分：

$$\int_0^s e^{-\theta(s+t-2u)}\,du=e^{-\theta(s+t)}\int_0^s e^{2\theta u}\,du=e^{-\theta(s+t)}\cdot\frac{e^{2\theta s}-1}{2\theta}=\frac{e^{-\theta(t-s)}-e^{-\theta(t+s)}}{2\theta}$$

于是

$$\operatorname{Cov}(X_s,X_t)=\frac{\sigma^2}{2\theta}\,\big(e^{-\theta|t-s|}-e^{-\theta(t+s)}\big),\qquad s,t\ge0 \tag{27.14}$$

对 $s>t$ 的情形由协方差的对称性得到同一表达式，故可以统一用 $|t-s|$ 书写。取 $s=t$ 即得 $\operatorname{Var}(X_t)=\frac{\sigma^2}{2\theta}\big(1-e^{-2\theta t}\big)$，与命题 27.9 在 $\xi$ 为常数时的结论一致。

式（27.14）中第二项 $e^{-\theta(t+s)}$ 是初值留下的记忆，它随 $s$ 与 $t$ 一同增大而以速率 $e^{-2\theta\min\{s,t\}}$ 指数衰减。因此固定滞后 $\tau\ge0$ 并令 $s\to\infty$，

$$\operatorname{Cov}(X_s,X_{s+\tau})\longrightarrow\frac{\sigma^2}{2\theta}\,e^{-\theta\tau}$$

与此同时 $\mathbb E[X_s]\to\mu$，$\operatorname{Var}(X_s)\to\sigma^2/(2\theta)$。这说明过程在长时间之后进入平稳状态：极限的均值与协方差只依赖时间差，不依赖绝对时刻。回复速度 $\theta$ 决定衰减快慢，半衰期为 $\ln 2/\theta$；$\sigma^2/(2\theta)$ 是平稳方差，它随噪声强度增大而增大、随回复速度加快而减小，这一权衡在第28章的离散时间 AR(1) 模型中会以 $\sigma_\varepsilon^2/(1-\phi^2)$ 的形式重现。

**注记（平稳解）**　若把初值取为 $\xi\sim N\big(\mu,\sigma^2/(2\theta)\big)$ 且与 $B$ 独立，则 $X$ 成为严格平稳的高斯过程。验证如下。均值恒为 $\mathbb E[X_t]=\mu+e^{-\theta t}(\mu-\mu)=\mu$，与 $t$ 无关。协方差则由命题 27.9 中初值项的贡献加上式（27.14）：当 $s\le t$ 时，

$$\operatorname{Cov}(X_s,X_t)=e^{-\theta(s+t)}\,\operatorname{Var}(\xi)+\frac{\sigma^2}{2\theta}\,\big(e^{-\theta(t-s)}-e^{-\theta(t+s)}\big)=\frac{\sigma^2}{2\theta}\,e^{-\theta(t-s)}$$

其中用到 $\operatorname{Var}(\xi)=\sigma^2/(2\theta)$ 使两个 $e^{-\theta(s+t)}$ 项恰好抵消。协方差只依赖时间差而均值恒定，故 $X$ 是协方差平稳的；又 $X$ 是高斯过程，协方差平稳即蕴含严格平稳。

平稳解还有一个完全不依赖初值的表示。取定义在整条实轴上的双边 Brown 运动 $\big(B_t\big)_{t\in\mathbb R}$，令

$$X_t=\mu+\sigma\int_{-\infty}^t e^{-\theta(t-s)}\,dB_s$$

该积分在 $L^2$ 中收敛，因为被积函数平方的积分为 $\int_{-\infty}^t e^{-2\theta(t-s)}\,ds=1/(2\theta)<\infty$。对任意平移量 $h\in\mathbb R$，换元 $u=s-h$ 得

$$X_{t+h}=\mu+\sigma\int_{-\infty}^{t}e^{-\theta(t-u)}\,dB_{u+h}$$

而过程 $\big(B_{u+h}\big)_{u\in\mathbb R}$ 与 $\big(B_u\big)_{u\in\mathbb R}$ 同律（双边 Brown 运动的平移不变性），故 $\big(X_{t+h}\big)_{t\in\mathbb R}$ 与 $\big(X_t\big)_{t\in\mathbb R}$ 同律。这就是严格平稳性的直接证明，同时说明方程（27.6）的平稳解在分布意义下是唯一的。

**注记（一般线性方程）**　积分因子法适用于一切形如

$$dX_t=\big(a(t)\,X_t+c(t)\big)\,dt+\big(g(t)\,X_t+h(t)\big)\,dB_t$$

的线性随机微分方程，其中 $a,c,g,h$ 为确定性的局部可积函数。做法分三步。第一步求解对应的齐次方程 $d\Phi_t=a(t)\,\Phi_t\,dt+g(t)\,\Phi_t\,dB_t$，$\Phi_0=1$：由命题 27.8 的同一论证，

$$\Phi_t=\exp\Big[\int_0^t\Big(a(u)-\frac{1}{2}\,g(u)^2\Big)\,du+\int_0^t g(u)\,dB_u\Big]$$

第二步令 $Z_t=X_t/\Phi_t$ 并对商应用 Itô 公式，可证 $dZ_t$ 中不再含有 $Z_t$ 本身，因而 $Z_t=Z_0+\int_0^t(\cdots)\,du+\int_0^t(\cdots)\,dB_u$ 可以直接积分。第三步回代 $X_t=\Phi_tZ_t$。当 $g\equiv0$ 时 $\Phi_t=\exp\big(\int_0^ta(u)\,du\big)$ 退化为确定性积分因子，命题 27.9 正是这一情形。当 $g\not\equiv0$ 时，$1/\Phi_t$ 的二阶项带来额外复杂度，其完整处理需要第27.6节的多维 Itô 公式。

### 27.3.3 CIR 过程与 Feller 条件

方程（27.7）无法像前两个模型那样写出闭式解，因为扩散系数 $\sqrt{x}$ 不是线性的，积分因子法失效。但它的矩与平稳分布都能显式算出，而非负性由参数之间的一个不等式刻画。这一小节给出这些计算，并说明 Feller 条件的确切来源。

首先解释为什么把 $\sqrt{X_t}$ 写成 $\sqrt{X_t^+}$。若过程能保持非负，两种写法完全等价；写成 $X_t^+$ 是为了让系数在整个实轴上都有定义，从而方程（27.7）在数学上始终良定，无论非负性是否已被证明。

**注记（非负性与 Feller 条件的来源）**　设 $x_0\ge0$，$\kappa,\theta,\xi>0$，并记 $a(x)=\xi^2x^+$ 与 $b(x)=\kappa(\theta-x)$。则下列结论成立。

(i) 方程（27.7）的解满足 $X_t\ge0$ 对一切 $t\ge0$ 几乎必然成立。

(ii) 若 Feller 条件 $2\kappa\theta\ge\xi^2$ 成立且 $x_0>0$，则 $X_t>0$ 对一切 $t>0$ 几乎必然成立，即边界零永不可达。

(iii) 若 $2\kappa\theta<\xi^2$，则零是可达的；过程触及零后，漂移在零点的取值 $\kappa\theta>0$ 立即把它推回正半轴，形成瞬时反射的行为。

Feller 条件的来源可以用尺度函数算清楚。一维扩散 $dX=b(X)\,dt+\sqrt{a(X)}\,dB$ 的尺度函数密度为

$$s'(x)=\exp\Big[-\int^x\frac{2\,b(z)}{a(z)}\,dz\Big]$$

此处

$$\frac{2\,b(z)}{a(z)}=\frac{2\kappa(\theta-z)}{\xi^2 z}=\frac{2\kappa\theta}{\xi^2}\cdot\frac{1}{z}-\frac{2\kappa}{\xi^2}$$

积分得

$$\int^x\frac{2\,b(z)}{a(z)}\,dz=\frac{2\kappa\theta}{\xi^2}\,\ln x-\frac{2\kappa}{\xi^2}\,x$$

取负指数，并记 $\nu=2\kappa\theta/\xi^2$，

$$s'(x)=x^{-\nu}\,e^{2\kappa x/\xi^2}$$

关键在于 $s'$ 在零附近的可积性。当 $x\downarrow0$ 时 $s'(x)\sim x^{-\nu}$，故 $\int_0^c s'(x)\,dx$ 有限当且仅当 $\nu<1$，即当且仅当 $2\kappa\theta<\xi^2$。按 Feller 的边界分类判据，左边界零不可达当且仅当上述积分发散，也就是当且仅当 $\nu\ge1$，即 $2\kappa\theta\ge\xi^2$。这正是 Feller 条件。

**关于严格性的说明**　上面给出的尺度函数计算是 Feller 条件的完整来源，但把「$\int_0^cs'(x)\,dx=\infty$」翻译成「零几乎必然不可达」这一步，属于一维扩散的边界分类理论；结论 (i) 的非负性也可由平方 Bessel 过程的表示得到，即令 $d=4\kappa\theta/\xi^2$ 维平方 Bessel 过程作时间变换后恰为 CIR 过程。这两处依赖的工具——尺度函数与速度测度的严格构造、平方 Bessel 过程的定义与性质——超出本章范围，属于随机过程进阶课程的内容。本章后续只使用 (i) 的结论以及下面的矩公式与平稳分布，它们都不依赖边界分类的完整证明。

**注记（CIR 过程的矩）**　设 $X$ 是方程（27.7）的解，$x_0\ge0$，并假定 Feller 条件 $2\kappa\theta\ge\xi^2$ 成立，于是 $X_t>0$ 恒成立，$X_t^+$ 可以省去。以下把矩的推导做成一个可复用的递推。

对 $k\ge1$ 令 $f(x)=x^k$，则 $f'(x)=kx^{k-1}$，$f''(x)=k(k-1)x^{k-2}$，而 $d[X]_t=\xi^2X_t\,dt$。由定理 27.3，

$$d(X_t^k)=\Big[k\kappa X_t^{k-1}(\theta-X_t)+\frac{1}{2}\,k(k-1)\,\xi^2X_t^{k-1}\Big]dt+k\,\xi\,X_t^{k-\frac{1}{2}}\,dB_t$$

即

$$d(X_t^k)=\Big[\Big(k\kappa\theta+\frac{1}{2}\,k(k-1)\,\xi^2\Big)X_t^{k-1}-k\kappa X_t^k\Big]dt+k\,\xi\,X_t^{k-\frac{1}{2}}\,dB_t$$

取期望前须确认随机积分的期望为零。取停时 $\tau_n=\inf\{t\ge0:X_t\ge n\}\wedge n$。由于 $X$ 路径连续且在 $[0,t]$ 上有界，$\tau_n\to\infty$ 几乎必然。对被停止的过程取期望，随机积分是鞅因而贡献为零；又因为在 $\{s\le\tau_n\}$ 上 $X_s\ge0$，漂移中的 $-k\kappa X_s^k$ 项非正，故

$$\mathbb E\big[X_{t\wedge\tau_n}^k\big]\le x_0^k+\Big(k\kappa\theta+\frac{1}{2}\,k(k-1)\,\xi^2\Big)\int_0^t\mathbb E\big[1_{\{s\le\tau_n\}}X_s^{k-1}\big]\,ds$$

对 $k=1$ 这给出 $\mathbb E[X_{t\wedge\tau_n}]\le x_0+\kappa\theta t$，与 $n$ 无关；由 Fatou 引理，$\mathbb E[X_t]\le x_0+\kappa\theta t$。逐次对 $k=2,3,\dots$ 重复这一论证（每次都可用已得的 $k-1$ 阶界），得到 $\sup_{0\le s\le t}\mathbb E[X_s^k]<\infty$ 对一切 $k$ 成立。于是 $\mathbb E\int_0^tX_s^{2k-1}\,ds<\infty$，随机积分 $\int_0^tX_s^{k-1/2}\,dB_s$ 是平方可积鞅，期望为零。令 $n\to\infty$ 并用控制收敛定理，得到矩的递推关系

$$\frac{d}{dt}\,\mathbb E\big[X_t^k\big]=\Big(k\kappa\theta+\frac{1}{2}\,k(k-1)\,\xi^2\Big)\mathbb E\big[X_t^{k-1}\big]-k\kappa\,\mathbb E\big[X_t^k\big]$$

取 $k=1$，记 $m(t)=\mathbb E[X_t]$，得 $m'(t)=\kappa\theta-\kappa m(t)$，$m(0)=x_0$。这是一阶线性常微分方程，其解为

$$m(t)=\theta+e^{-\kappa t}\,\big(x_0-\theta\big)$$

直接验证：$m'(t)=-\kappa e^{-\kappa t}(x_0-\theta)$，而 $\kappa\theta-\kappa m(t)=\kappa\theta-\kappa\theta-\kappa e^{-\kappa t}(x_0-\theta)$，二者相等。形式上这与 Ornstein–Uhlenbeck 过程的均值函数完全相同：CIR 与 Vasicek 有一样的期望轨迹，差别只在波动结构。
**例 27.3**

补足 Ornstein–Uhlenbeck 过程均值与方差的计算。设 $\kappa>0$，$\theta\in\mathbb R$，$\sigma>0$，且

$$X_t=x_0+\kappa\int_0^t(\theta-X_s)\,ds+\sigma B_t.$$

**解**

前段的线性方程解法给出

$$X_t=\theta+e^{-\kappa t}(x_0-\theta)+\sigma\int_0^te^{-\kappa(t-s)}\,dB_s.$$

确定性被积函数满足平方可积条件，故随机积分是零均值鞅。于是 $m(t)=\mathbb E[X_t]$ 满足 $m'(t)=\kappa[\theta-m(t)]$，$m(0)=x_0$，从而 $m(t)=\theta+e^{-\kappa t}(x_0-\theta)$。又由 Itô 等距，

$$\operatorname{Var}(X_t)=\sigma^2\int_0^te^{-2\kappa(t-s)}\,ds.$$

计算积分，得到均值与方差

$$m(t)=\theta+e^{-\kappa t}(x_0-\theta),\qquad \operatorname{Var}(X_t)=\frac{\sigma^2}{2\kappa}\big(1-e^{-2\kappa t}\big). \tag{27.15}$$

当 $t\to\infty$ 时，均值趋于 $\theta$，方差趋于 $\sigma^2/(2\kappa)$；初始条件的影响按指数速度消失。

## 27.4 Itô 公式

Itô 公式是随机微积分的链式法则。与普通微积分相比，二阶项不会消失，因为 Brown 运动在小区间上的增量具有 $\sqrt{dt}$ 的尺度。以下定理给出连续半鞅情形下的一般形式。

**定理 27.10（一维 Itô 公式）**

设 $X$ 是连续实值半鞅，$f:\mathbb R\to\mathbb R$ 二阶连续可微，则 $f(X)$ 仍为连续半鞅，并且

$$f(X_t)=f(X_0)+\int_0^tf'(X_s)\,dX_s+\frac12\int_0^tf''(X_s)\,d[X]_s. \tag{27.16}$$

特别地，若 $dX_t=b_t\,dt+\sigma_t\,dB_t$，其中 $b,\sigma$ 适应且相应积分存在，则 $d[X]_t=\sigma_t^2\,dt$，因而

$$df(X_t)=\Big[f'(X_t)b_t+\frac12f''(X_t)\sigma_t^2\Big]dt+f'(X_t)\sigma_t\,dB_t.$$

这里随机积分是局部鞅，有限变差部分的漂移因二阶导数而增加修正项。

**证明**

先给启发式推导。取 $[0,t]$ 的分割 $0=t_0<\cdots<t_n=t$，记 $\Delta X_i=X_{t_{i+1}}-X_{t_i}$。Taylor 公式给出

$$f(X_{t_{i+1}})-f(X_{t_i})=f'(X_{t_i})\Delta X_i+\frac12f''(X_{t_i})(\Delta X_i)^2+R_i,$$

其中 $R_i=o((\Delta X_i)^2)$。一阶项之和趋向随机积分。若 $X=B$，则 $[B]_t=t$，二次变差使 $(\Delta B_i)^2$ 以 $\Delta t_i$ 为主项，故二阶项之和保留为 $\frac12\int_0^tf''(B_s)\,ds$；三阶及更高阶项在分割加细时趋于零。对一般半鞅，将 $[X]$ 替代 $t$ 即得相同结构。

严格证明先作局部化。取停时 $\tau_n$ 使停止后的 $X$、$[X]$ 有界，并使 $f',f''$ 在相应紧致区间上有界。先在停止过程上证明公式，再令 $n\to\infty$；由于 $\tau_n\to\infty$ 几乎必然，两边在固定 $t$ 上收敛到原过程的相应表达式。

当 $f(x)=x^2$ 时，恒等式

$$X_{t_{i+1}}^2-X_{t_i}^2=2X_{t_i}\Delta X_i+(\Delta X_i)^2$$

逐项求和并取极限，直接得到所求公式。对单项式 $x^k$ 利用 $x^{k+1}=x^k x$ 作归纳，离散乘积展开中的交叉项收敛到二次变差积分，故公式对所有多项式成立。

对一般 $f\in C^2$，在局部化后的紧致值域上用多项式 $p_m$ 一致逼近 $f$，并同时使 $p_m',p_m''$ 一致逼近 $f',f''$。对每个 $p_m$ 写出公式。固定分割时，一阶项与二阶项分别由上述一致逼近控制；再沿加细分割取极限，随机积分的局部化连续性给出 $\int p_m'(X)\,dX\to\int f'(X)\,dX$，而二次变差积分由有界收敛定理处理。

还需说明 Taylor 余项确实消失。由 $f''$ 在紧致集上的一致连续性，对任意 $\varepsilon>0$，当分割足够细时有 $|R_i|\le\varepsilon(\Delta X_i)^2$。于是

$$\Big|\sum_iR_i\Big|\le\varepsilon\sum_i(\Delta X_i)^2.$$

平方增量之和依概率收敛到 $[X]_t$，先令分割直径趋于零，再令 $\varepsilon\downarrow0$，即得余项依概率趋于零。将 $X$ 分解为连续局部鞅与有限变差过程后，有限变差部分与任何连续半鞅的二次协变差为零，因此一般 $X$ 的公式归结为局部鞅部分与有限变差部分的分别计算。最后去掉局部化，即得结论。

□

对时间依赖函数，设 $f\in C^{1,2}([0,T]\times\mathbb R)$，并把 $t$ 看作二次变差为零的分量，便有

$$df(t,X_t)=f_t(t,X_t)\,dt+f_x(t,X_t)\,dX_t+\frac12f_{xx}(t,X_t)\,d[X]_t. \tag{27.17}$$

若 $X$ 是 Itô 过程，则末项等于 $\frac12f_{xx}(t,X_t)\sigma_t^2\,dt$。这一形式直接连接 SDE 与偏微分方程，也是后续定价理论的计算基础。

**命题 27.11（乘积法则与商法则）**

设 $X,Y$ 为连续半鞅，则

$$d(X_tY_t)=X_t\,dY_t+Y_t\,dX_t+d[X,Y]_t. \tag{27.18}$$

若 $Y_t\ne0$ 对所有 $t$ 成立，则 $X/Y$ 是半鞅，并且

$$d\Big(\frac{X_t}{Y_t}\Big)=\frac1{Y_t}\,dX_t-\frac{X_t}{Y_t^2}\,dY_t-\frac1{Y_t^2}\,d[X,Y]_t+\frac{X_t}{Y_t^3}\,d[Y]_t. \tag{27.19}$$

**证明**

对分割上的乘积增量使用恒等式

$$\Delta(XY)_i=X_{t_i}\Delta Y_i+Y_{t_i}\Delta X_i+\Delta X_i\Delta Y_i.$$

求和时，前两项分别趋向 $\int X\,dY$ 与 $\int Y\,dX$；由二次协变差的定义，交叉增量之和趋向 $[X,Y]_t$，故式（27.18）成立。

再对 $g(y)=1/y$ 使用 Itô 公式。由于 $g'(y)=-y^{-2}$，$g''(y)=2y^{-3}$，

$$d\Big(\frac1{Y_t}\Big)=-\frac1{Y_t^2}\,dY_t+\frac1{Y_t^3}\,d[Y]_t.$$

并且

$$d\Big[X,\frac1Y\Big]_t=-\frac1{Y_t^2}\,d[X,Y]_t.$$

将 $X/Y=X(1/Y)$ 代入乘积法则，合并有限变差项即得式（27.19）。对 $Y$ 先局部化到远离零的区间，可保证上述积分存在，再由连续性去掉局部化。

□

**例 27.4**

求解几何 Brown 运动

$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t,\qquad S_0>0,$$

并验证所得过程确实满足方程。

**解**

若 $S_t>0$，对 $f(x)=\ln x$ 使用 Itô 公式。因 $f'(x)=1/x$，$f''(x)=-1/x^2$，且 $d[S]_t=\sigma^2S_t^2\,dt$，得到

$$d\ln S_t=\Big(\mu-\frac12\sigma^2\Big)dt+\sigma\,dB_t.$$

从 $0$ 到 $t$ 积分并取指数，候选解为

$$S_t=S_0\exp\Big[\Big(\mu-\frac12\sigma^2\Big)t+\sigma B_t\Big]. \tag{27.20}$$

该表达式严格为正，因此原先取对数的运算有效。反向验证时，对 $g(t,x)=S_0\exp[(\mu-\sigma^2/2)t+\sigma x]$ 使用时间依赖 Itô 公式，得

$$dg(t,B_t)=\Big(\mu-\frac12\sigma^2+\frac12\sigma^2\Big)g(t,B_t)\,dt+\sigma g(t,B_t)\,dB_t,$$

恰为原方程。线性 SDE 的解唯一，故式（27.20）就是唯一解。对数增量服从正态分布，这正是几何 Brown 运动具有对数正态边际分布的原因。

**例 27.5**

用 Itô 公式求解 OU 过程

$$dX_t=\kappa(\theta-X_t)\,dt+\sigma\,dB_t,\qquad X_0=x_0.$$

**解**

令 $Y_t=e^{\kappa t}(X_t-\theta)$。把时间依赖 Itô 公式用于 $f(t,x)=e^{\kappa t}(x-\theta)$，由于 $f_{xx}=0$，

$$dY_t=\kappa e^{\kappa t}(X_t-\theta)\,dt+e^{\kappa t}\,dX_t=\sigma e^{\kappa t}\,dB_t.$$

积分并乘以 $e^{-\kappa t}$，得到

$$X_t=\theta+e^{-\kappa t}(x_0-\theta)+\sigma\int_0^te^{-\kappa(t-s)}\,dB_t. \tag{27.21}$$

这验证了例 27.3 所用的显式表达式。反之，对右侧使用乘积法则，其有限变差项为 $\kappa(\theta-X_t)\,dt$，随机项为 $\sigma\,dB_t$，故它确实满足原方程。由于确定性被积函数的随机积分服从正态分布，$X_t$ 的边际分布完全由式（27.15）的均值和方差确定。

**定理 27.12（随机指数与指数鞅）**

设 $\lambda$ 是使随机积分存在的可料过程，则 SDE

$$dZ_t=\lambda_tZ_t\,dB_t,\qquad Z_0=1$$

的唯一正解为

$$Z_t=\exp\Big(\int_0^t\lambda_s\,dB_s-\frac12\int_0^t\lambda_s^2\,ds\Big), \tag{27.22}$$

称为 $\int\lambda\,dB$ 的随机指数。$Z$ 是连续正局部鞅。若 $\lambda$ 为确定性函数且 $\int_0^T\lambda_s^2\,ds<\infty$，则 $Z$ 在 $[0,T]$ 上为真正的平方可积鞅，且 $\mathbb E[Z_t]=1$。

**证明**

候选表达式始终为正，故可对其取对数。令

$$L_t=\int_0^t\lambda_s\,dB_s-\frac12\int_0^t\lambda_s^2\,ds,$$

则 $d[L]_t=\lambda_t^2\,dt$。对 $e^{L_t}$ 使用 Itô 公式，

$$dZ_t=Z_t\,dL_t+\frac12Z_t\,d[L]_t=\lambda_tZ_t\,dB_t.$$

初始值显然为 $1$，故候选过程满足方程。反之，任意正解 $Y$ 的随机积分 $\int(\lambda_sY_s)^{-1}\,dY_s$ 等于 $\int\lambda_s\,dB_s$；对 $\ln Y_t$ 使用 Itô 公式并作同样计算，可得 $Y=Z$，所以解唯一。

唯一性的直接写法不依赖 $\lambda$ 是否为零：对任意正解 $Y$ 计算

$$d\ln Y_t=\frac1{Y_t}\,dY_t-\frac1{2Y_t^2}\,d[Y]_t=\lambda_t\,dB_t-\frac12\lambda_t^2\,dt,$$

积分后取指数即得 $Y_t=Z_t$。

当 $\lambda$ 为确定性函数时，$\int_0^t\lambda_u\,dB_u$ 服从均值零、方差 $\int_0^t\lambda_u^2\,du$ 的正态分布。正态矩母函数给出 $\mathbb E[Z_t]=1$ 与 $\mathbb E[Z_t^2]=\exp(\int_0^t\lambda_u^2\,du)$。对 $s<t$，将 $Z_t$ 写成 $Z_s$ 与 $\mathcal F_s$ 独立的未来增量的乘积；未来增量的条件期望为 $1$，故 $\mathbb E[Z_t\mid\mathcal F_s]=Z_s$。平方可积鞅性质得证。

□

**例 27.6**

求常数 $\lambda$ 所对应指数鞅 $Z_t=\exp(\lambda B_t-\lambda^2t/2)$ 的各阶矩。

**解**

对任意实数 $p$，有 $Z_t^p=\exp(p\lambda B_t-p\lambda^2t/2)$。由于 $B_t$ 服从均值零、方差 $t$ 的正态分布，

$$\mathbb E[Z_t^p]=\exp\Big(\frac12p^2\lambda^2t-\frac12p\lambda^2t\Big)=\exp\Big[\frac12p(p-1)\lambda^2t\Big].$$

特别地，$p=1$ 时矩恒为 $1$，而更高阶矩随时间增长。这并不矛盾：较大的路径值以较小概率出现，仍保持鞅的均值为常数。

## 27.5 多维 Itô 公式与相关 Brown 运动

多个风险因子通常并不独立。相关结构既进入过程的协方差，也进入多维函数的 Itô 修正项。

**定义 27.13（相关 Brown 运动与二次协变差）**

设 $\boldsymbol\rho=(\rho_{ij})$ 为 $d\times d$ 对称半正定矩阵，且 $\rho_{ii}=1$。若 $d$ 维连续过程 $\boldsymbol W$ 的每个分量都是 Brown 运动，并且独立增量满足

$$\mathbb E[(W_t^i-W_s^i)(W_t^j-W_s^j)]=\rho_{ij}(t-s),\qquad s<t,$$

则称 $\boldsymbol W$ 为相关矩阵 $\boldsymbol\rho$ 的相关 Brown 运动。取 $d$ 个独立 Brown 运动组成 $\boldsymbol B$，令 $\boldsymbol W_t=\boldsymbol\rho^{1/2}\boldsymbol B_t$ 即得这种过程。其协方差与二次协变差为

$$\mathbb E[W_t^iW_s^j]=\rho_{ij}(t\wedge s),\qquad d[W^i,W^j]_t=\rho_{ij}\,dt. \tag{27.23}$$

事实上，$W_t^iW_t^j-\rho_{ij}t$ 是鞅，而连续局部鞅的二次协变差是使乘积减去该有限变差过程成为局部鞅的唯一连续适应有限变差过程，故第二式成立。独立分量对应 $\rho_{ij}=0$，其二次协变差为零。

**定理 27.14（多维 Itô 公式）**

设 $\boldsymbol X=(X^1,\ldots,X^d)^\top$ 为连续半鞅向量，$f\in C^2(\mathbb R^d)$，则

$$df(\boldsymbol X_t)=\sum_{i=1}^d\partial_if(\boldsymbol X_t)\,dX_t^i+\frac12\sum_{i,j=1}^d\partial_{ij}f(\boldsymbol X_t)\,d[X^i,X^j]_t. \tag{27.24}$$

若 $\boldsymbol X$ 还包含时间分量，只需补入相应的一阶时间导数，因为时间与任何连续半鞅的二次协变差均为零。对扩散 $\boldsymbol X$，令 $\boldsymbol a=\boldsymbol\sigma\boldsymbol\sigma^\top$，则有 $d[X^i,X^j]_t=a_{ij}(\boldsymbol X_t)\,dt$。

**证明**

沿用一维证明的局部化，把 $\boldsymbol X$ 停止在紧致球内。对二阶 Taylor 展开逐项求和，一阶项收敛到各坐标随机积分，二阶项由二次协变差的定义收敛到式（27.24）的双重和。余项满足 $|R_i|\le\varepsilon\|\Delta\boldsymbol X_i\|^2$；而

$$\|\Delta\boldsymbol X_i\|^2=\sum_{k=1}^d(\Delta X_i^k)^2,$$

其和收敛到 $\sum_k[X^k]_t$。先加细分割再令 $\varepsilon\downarrow0$，余项依概率消失。最后用多项式同时逼近 $f$ 及其一、二阶导数，并以随机积分和二次协变差积分的连续性取极限，再去掉局部化，即完成证明。

□

**命题 27.15（多维乘积法则）**

设 $\boldsymbol X,\boldsymbol Y$ 为 $d$ 维连续半鞅，则其内积满足

$$d(\boldsymbol X_t^\top\boldsymbol Y_t)=\boldsymbol X_t^\top\,d\boldsymbol Y_t+\boldsymbol Y_t^\top\,d\boldsymbol X_t+\sum_{i=1}^dd[X^i,Y^i]_t. \tag{27.25}$$

**证明**

对 $f(\boldsymbol x,\boldsymbol y)=\boldsymbol x^\top\boldsymbol y=\sum_ix_iy_i$ 应用定理 27.14。除 $\partial_{x_i}f=y_i$ 与 $\partial_{y_i}f=x_i$ 外，一阶导数均为零；二阶导数中只有 $\partial_{x_i y_i}f=1$，其余为零。因此二阶项恰为 $\sum_id[X^i,Y^i]_t$，得到式（27.25）。也可由

$$X^iY^i=\frac14\big[(X^i+Y^i)^2-(X^i-Y^i)^2\big]$$

逐坐标使用极化恒等式，再对 $i$ 求和，两种计算完全一致。

□

**例 27.7**

两个几何 Brown 运动满足

$$dS_t^i=\mu_iS_t^i\,dt+\sigma_iS_t^i\,dW_t^i,\qquad i=1,2,$$

且 $d[W^1,W^2]_t=\rho\,dt$。求 $P_t=S_t^1S_t^2$ 的 SDE。

**解**

由式（27.18），

$$dP_t=S_t^1\,dS_t^2+S_t^2\,dS_t^1+d[S^1,S^2]_t.$$

Itô 等距的协变差形式给出

$$d[S^1,S^2]_t=\sigma_1\sigma_2S_t^1S_t^2\,d[W^1,W^2]_t=\rho\sigma_1\sigma_2P_t\,dt.$$

代回并合并同类项，

$$dP_t=(\mu_1+\mu_2+\rho\sigma_1\sigma_2)P_t\,dt+\sigma_1P_t\,dW_t^1+\sigma_2P_t\,dW_t^2.$$

可见相关性通过二次协变差改变漂移。若 $\rho=0$，修正项消失；若 $\rho>0$ 且波动率为正，乘积获得正的漂移修正。这不是额外假设，而是 Itô 二阶项的直接结果。

## 27.6 量化金融中的 SDE

金融建模先选择状态变量及其风险来源，再由经济约束确定漂移与扩散的结构。同一类方程在不同测度下可以具有不同漂移，但扩散系数所描述的路径波动结构保持一致。

几何 Brown 运动是连续时间资产定价的起点。若 $S$ 为股票价格，$\beta$ 为短期利率恒等于 $r$ 的银行账户，则常数参数模型写成

$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t,\qquad d\beta_t=r\beta_t\,dt,\qquad \beta_0=1. \tag{27.26}$$

比例漂移与比例扩散保证 $S_t>0$，式（27.20）给出对数正态价格。这一模型便于估计和计算，却隐含波动率恒定、对数收益增量独立等强假设，无法直接产生常见的波动率微笑。

Vasicek 模型把瞬时短期利率 $r_t$ 设为 OU 过程：

$$dr_t=\kappa(\theta-r_t)\,dt+\sigma\,dB_t,\qquad r_0>0. \tag{27.27}$$

均值回复使利率围绕长期水平 $\theta$ 波动，显式高斯表示便于计算零息债券价格。然而正态分布给负利率分配正概率；这在某些市场环境中可以接受，在要求利率非负的模型中则需要改变扩散项。

CIR 模型将扩散系数改为利率水平的平方根：

$$dr_t=\kappa(\theta-r_t)\,dt+\xi\sqrt{r_t}\,dB_t,\qquad r_0>0. \tag{27.28}$$

当 $r_t$ 接近零时，扩散项趋于零而正漂移 $\kappa\theta$ 把过程推回内部。参数满足 $\kappa,\theta,\xi>0$ 时，过程保持非负；若再满足 $2\kappa\theta\ge\xi^2$，零点几乎必然不可达。平方根系数不满足全局 Lipschitz 条件，因此不能直接套用线性方程的标准估计，但正性与矩估计仍使均值回复计算有效。CIR 利率的条件分布是非中心卡方分布的时间与尺度变换，兼具非负性和可计算性。

固定波动率不能解释隐含波动率曲面，自然下一步是令波动率本身成为随机状态。Heston 模型写作

$$\begin{aligned}
dS_t&=\mu S_t\,dt+\sqrt{V_t}S_t\,dW_t^1,\\
dV_t&=\kappa(\theta-V_t)\,dt+\xi\sqrt{V_t}\,dW_t^2,\\
d[W^1,W^2]_t&=\rho\,dt .
\end{aligned} \tag{27.29}$$

这里 $V_t$ 是方差而非波动率。价格与方差的相关性控制收益分布的偏斜，CIR 方差过程则避免负方差。该系统已是多维扩散，其变换与矩计算依赖式（27.24）和式（27.25）。

定价还需要区分真实世界测度 $\mathbb P$ 与风险中性测度 $\mathbb Q$。在前者中，漂移 $\mu$ 描述实际期望收益；在后者中，无套利要求可交易资产的贴现价格成为局部鞅，并在适当可积条件下成为鞅。对式（27.26）的股票，风险中性动力学应为 $dS_t=rS_t\,dt+\sigma S_t\,dB_t^{\mathbb Q}$，所以衍生品价格通常不依赖真实漂移 $\mu$。

这种漂移改变并非随意替换。严格做法是构造等价测度，其密度常由式（27.22）的指数鞅给出；Girsanov 定理再说明测度变换如何给 Brown 运动加上漂移。相关论证涉及测度等价、密度鞅的一致可积性及新测度下的随机积分，留待测度变换部分系统展开。本章先确立计算入口：选定模型后，Itô 公式用于推导状态变量的函数与矩，风险中性测度用于定价，数值格式用于在难以显式求解时逼近相应期望。

## 27.7 数值解法与弱强收敛

考虑标量 SDE

$$dX_t=b(X_t)\,dt+\sigma(X_t)\,dB_t,\qquad 0\le t\le T.$$

取等距网格 $t_n=nh$，$h=T/N$，记 $\Delta B_n=B_{t_{n+1}}-B_{t_n}$。数值近似有两种不同目标：逐路径接近真解，或只使光滑函数的期望接近真值，两者对应不同的收敛标准。

**定义 27.16（Euler–Maruyama 格式）**

Euler–Maruyama 格式从 $Y_0=X_0$ 出发，递推定义为

$$Y_{n+1}=Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n. \tag{27.30}$$

它把 $[t_n,t_{n+1}]$ 上的漂移与扩散冻结在左端点。由于 $\Delta B_n$ 独立且服从均值零、方差 $h$ 的正态分布，该格式只需依次生成高斯随机变量，实现成本很低。

**定义 27.17（Milstein 格式）**

若 $\sigma$ 连续可微，Milstein 格式加入二阶 Itô–Taylor 项：

$$Y_{n+1}=Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n+\frac12\sigma(Y_n)\sigma'(Y_n)\big[(\Delta B_n)^2-h\big]. \tag{27.31}$$

多出的项来自 $\int_{t_n}^{t_{n+1}}\int_{t_n}^s\sigma\sigma'(X_u)\,dB_u\,dB_s$ 的左端点近似，其重随机积分恰为 $[(\Delta B_n)^2-h]/2$。

**定义 27.18（强收敛与弱收敛）**

设 $Y_N$ 是步长 $h$ 下对 $X_T$ 的近似。若对某常数 $C$ 与 $\gamma>0$，

$$\big(\mathbb E|X_T-Y_N|^2\big)^{1/2}\le Ch^\gamma,$$

则称格式具有 $\gamma$ 阶强收敛。若对一族足够光滑的测试函数 $g$，存在 $C_g$ 与 $\beta>0$ 使

$$\big|\mathbb E[g(X_T)]-\mathbb E[g(Y_N)]\big|\le C_g h^\beta, \tag{27.32}$$

则称格式具有 $\beta$ 阶弱收敛。强误差衡量同一 Brown 路径上的偏差，弱误差只衡量分布泛函的偏差。对 Lipschitz 的 $g$，强收敛可直接给出同阶弱收敛，但更精细的抵消通常使弱阶更高。

**定理 27.19（Euler–Maruyama 的强半阶）**

设 $b,\sigma$ 全局 Lipschitz 并满足线性增长，真解具有有限二阶矩，则 Euler–Maruyama 的连续时间插值满足

$$\sup_{0\le t\le T}\big(\mathbb E|X_t-Y_t|^2\big)^{1/2}\le Ch^{1/2},$$

其中 $C$ 与 $h$ 无关。

**证明**

把数值解插值为 Itô 过程

$$Y_t=X_0+\int_0^tb(Y_{\eta(s)})\,ds+\int_0^t\sigma(Y_{\eta(s)})\,dB_s,$$

其中 $\eta(s)=t_n$ 当 $s\in[t_n,t_{n+1})$。于是误差 $e_t=X_t-Y_t$ 满足

$$e_t=\int_0^t[b(X_s)-b(Y_{\eta(s)})]\,ds+\int_0^t[\sigma(X_s)-\sigma(Y_{\eta(s)})]\,dB_s.$$

先建立与步长无关的二阶矩界。对真解使用初等不等式、Jensen 不等式与 Itô 等距，得到

$$\mathbb E|X_t|^2\le 3\mathbb E|X_0|^2+3T\int_0^t\mathbb E|b(X_s)|^2\,ds+3\int_0^t\mathbb E|\sigma(X_s)|^2\,ds.$$

线性增长条件把右端控制在 $C(1+\int_0^t\mathbb E|X_s|^2\,ds)$ 以内，Gronwall 引理因而给出 $\sup_{0\le t\le T}\mathbb E|X_t|^2\le M_X$。

对数值解，记 $m_n=\mathbb E|Y_n|^2$，并取 $h\le 1$。在 $\mathcal F_{t_n}$ 条件下，Brown 增量的均值为零、方差为 $h$，所以递推式产生

$$m_{n+1}=m_n+2h\mathbb E[Y_nb(Y_n)]+h^2\mathbb E|b(Y_n)|^2+h\mathbb E|\sigma(Y_n)|^2.$$

利用 $2Y_nb(Y_n)\le |Y_n|^2+|b(Y_n)|^2$ 以及线性增长条件，可得 $m_{n+1}\le(1+Ch)m_n+Ch$。逐步递推并用 $1+Ch\le e^{Ch}$，得到 $m_n\le e^{CT}(m_0+CT)$，故所有格点上的二阶矩一致有界。
再估计数值插值在一个网格内的位移。当 $s\in[t_n,t_{n+1})$ 时，

$$Y_s-Y_{\eta(s)}=b(Y_n)(s-t_n)+\sigma(Y_n)(B_s-B_{t_n}).$$

条件期望使交叉项消失，线性增长条件与刚得到的格点矩界于是给出

$$\mathbb E|Y_s-Y_{\eta(s)}|^2\le 2h^2\mathbb E|b(Y_n)|^2+2h\mathbb E|\sigma(Y_n)|^2\le Ch.$$

令 $L$ 为 $b,\sigma$ 共同的 Lipschitz 常数。三角不等式和上述位移估计产生

$$\begin{aligned}
\mathbb E|b(X_s)-b(Y_{\eta(s)})|^2
&\le 2L^2\mathbb E|e_s|^2+Ch,\\
\mathbb E|\sigma(X_s)-\sigma(Y_{\eta(s)})|^2
&\le 2L^2\mathbb E|e_s|^2+Ch.
\end{aligned}$$

这里常数 $C$ 只依赖模型参数、初始矩与 $T$，不依赖 $h$。
最后处理误差方程。对漂移积分使用 Cauchy–Schwarz 不等式，对随机积分使用 Itô 等距，得到

$$\mathbb E|e_t|^2\le 2T\int_0^t\mathbb E|b(X_s)-b(Y_{\eta(s)})|^2\,ds+2\int_0^t\mathbb E|\sigma(X_s)-\sigma(Y_{\eta(s)})|^2\,ds.$$

代入两个系数估计，存在与 $h$ 无关的 $C_1,C_2$ 使

$$\mathbb E|e_t|^2\le C_1\int_0^t\mathbb E|e_s|^2\,ds+C_2h.$$

Gronwall 引理给出 $\mathbb E|e_t|^2\le C_2h e^{C_1t}$，且右端在 $0\le t\le T$ 上一致。取上确界再开平方，即得所求强半阶估计。

□

## 27.8 生成元、Feynman–Kac 公式与测度变换

SDE 既描述状态路径，也决定状态分布随时间的演化。无穷小生成元把路径的瞬时变化写成微分算子，Kolmogorov 方程再把这一算子转化为偏微分方程。Feynman–Kac 公式建立偏微分方程与贴现期望之间的联系，而 Girsanov 定理则说明测度变换如何改变漂移。这四类工具共同连接随机分析、偏微分方程与资产定价。

### 27.8.1 无穷小生成元

设 $B$ 是 $m$ 维 Brown 运动，$X$ 是 $d$ 维扩散过程，满足

$$dX_t=b(X_t)\,dt+\sigma(X_t)\,dB_t,\qquad X_0=x,\qquad a=\sigma\sigma^\top. \tag{27.33}$$

其中 $b$ 取值于 $\mathbb R^d$，$\sigma$ 是 $d\times m$ 矩阵，$a$ 称为扩散矩阵。假定系数足够规则，使方程对每个初始点都有唯一解并具备所需的矩。

**定义 27.20（无穷小生成元）**

记 $\mathbb E_x$ 为过程从 $x$ 出发时的期望。对实值函数 $f$，若下列极限存在，则定义

$$\mathcal Lf(x)=\lim_{t\downarrow0}\frac{\mathbb E_x[f(X_t)]-f(x)}{t}. \tag{27.34}$$

算子 $\mathcal L$ 称为 $X$ 的无穷小生成元，使该极限存在的函数组成其定义域。它刻画微小时间内函数期望的瞬时变化率。

**命题 27.21（扩散过程的生成元）**

在式（27.33）的系数连续且解唯一的条件下，对任意 $f\in C_c^2(\mathbb R^d)$，有

$$\mathcal Lf=b\cdot\nabla f+\frac12a:\nabla^2f=\sum_{i=1}^db_i\frac{\partial f}{\partial x_i}+\frac12\sum_{i,j=1}^da_{ij}\frac{\partial^2f}{\partial x_i\partial x_j}. \tag{27.35}$$

**证明**

对 $f(X_t)$ 使用多维 Itô 公式，得到

$$f(X_t)-f(x)=\int_0^t\mathcal Lf(X_s)\,ds+\int_0^t(\nabla f)^\top(X_s)\sigma(X_s)\,dB_s.$$

由于 $f$ 的一阶、二阶导数具有紧支撑，而 $b,\sigma$ 连续，$\mathcal Lf$ 与随机积分的被积过程均有界。因此随机积分的期望为零。取期望并除以 $t$，得到

$$\frac{\mathbb E_x[f(X_t)]-f(x)}{t}=\frac1t\int_0^t\mathbb E_x[\mathcal Lf(X_s)]\,ds.$$

路径连续性与 $\mathcal Lf$ 的连续有界性使被积函数在 $s\downarrow0$ 时收敛到 $\mathcal Lf(x)$。有界收敛定理给出时间平均的同一极限，令 $t\downarrow0$ 即得式（27.35）。

□

### 27.8.2 Kolmogorov 前向与后向方程

**定理 27.22（Kolmogorov 后向方程）**

设式（27.33）为时齐扩散，$g$ 足够光滑并满足适当的可积条件。若

$$u(t,x)=\mathbb E[g(X_T)\mid X_t=x],\qquad 0\le t\le T,$$

具有所需的连续导数，则它满足终值问题

$$\partial_tu+\mathcal Lu=0,\qquad 0\le t<T,\qquad u(T,x)=g(x). \tag{27.36}$$

这里 $\mathcal L$ 作用于变量 $x$。

**推导思路**

取充分小的 $h>0$。马尔可夫性与全期望公式给出 $u(t,x)=\mathbb E_x[u(t+h,X_h)]$。对 $u(t+h,X_h)$ 使用 Itô 公式，随机积分的期望为零，因而

$$0=\mathbb E_x[u(t+h,X_h)]-u(t,x)=h\big[\partial_tu(t,x)+\mathcal Lu(t,x)\big]+o(h).$$

除以 $h$ 并令 $h\downarrow0$，便得到后向方程。终端条件来自 $X_T=x$ 时条件期望退化为 $g(x)$。严格的可微性结论需要转移半群的正则性估计，上述推导说明了方程的形式来源。

**定理 27.23（Kolmogorov 前向方程）**

若式（27.33）的解具有关于终点 $y$ 足够光滑的转移密度 $p(t,x,y)$，则对固定起点 $x$，密度满足

$$\begin{aligned}
\partial_tp(t,x,y)&=\mathcal L_y^*p(t,x,y),\\
\mathcal L_y^*p&=-\sum_{i=1}^d\frac{\partial}{\partial y_i}\big(b_i(y)p\big)+\frac12\sum_{i,j=1}^d\frac{\partial^2}{\partial y_i\partial y_j}\big(a_{ij}(y)p\big),\\
p(0,x,y)&=\delta_x(y).
\end{aligned} \tag{27.37}$$

前向方程也称 Fokker–Planck 方程，其中初始条件按广义函数意义理解。

**推导思路**

对任意 $\varphi\in C_c^2(\mathbb R^d)$，生成元给出 $\frac{d}{dt}\mathbb E_x[\varphi(X_t)]=\mathbb E_x[\mathcal L\varphi(X_t)]$。用转移密度表示两侧，并对漂移项分部积分一次、对二阶项分部积分两次；紧支撑使边界项消失。于是

$$\int_{\mathbb R^d}\varphi(y)\partial_tp(t,x,y)\,dy=\int_{\mathbb R^d}\varphi(y)\mathcal L_y^*p(t,x,y)\,dy.$$

测试函数的任意性导出演化方程。路径连续性使 $\mathbb E_x[\varphi(X_t)]\to\varphi(x)$，所以初始密度集中于 $x$。后向方程固定终点并微分起点，前向方程固定起点并微分终点，两者通过伴随算子相互对应。

### 27.8.3 Feynman–Kac 公式

**定理 27.24（Feynman–Kac 公式）**

设 $b,\sigma$ 有界并保证式（27.33）存在唯一解，$V$ 连续有界，$g$ 有界可测。若 $u$ 是终值问题

$$\partial_tu+\mathcal Lu-Vu=0,\qquad 0\le t<T,\qquad u(T,x)=g(x) \tag{27.38}$$

的有界经典解，且一阶、二阶空间导数有界，则对 $X_t=x$，有

$$u(t,x)=\mathbb E_{t,x}\!\left[\exp\!\left(-\int_t^TV(X_s)\,ds\right)g(X_T)\right]. \tag{27.39}$$

**证明**

固定 $(t,x)$，对 $r\in[t,T]$ 定义

$$M_r=u(r,X_r)\exp\!\left(-\int_t^rV(X_s)\,ds\right). \tag{27.40}$$

指数因子是有界变差过程，因此对乘积使用 Itô 公式不会产生额外的二次变差项。先对 $u(r,X_r)$ 使用 Itô 公式，再乘上指数因子，得到

$$\begin{aligned}
dM_r
&=\exp\!\left(-\int_t^rV(X_s)\,ds\right)
\big[(\partial_ru+\mathcal Lu-Vu)(r,X_r)\,dr\\
&\qquad+(\nabla u)^\top(r,X_r)\sigma(X_r)\,dB_r\big].
\end{aligned}$$

将式（27.38）代入上式，$dr$ 项恒等于零，故

$$dM_r=Z_r(\nabla u)^\top(r,X_r)\sigma(X_r)\,dB_r,\qquad Z_r=\exp\!\left(-\int_t^rV(X_s)\,ds\right).$$

由于 $\nabla u$ 与 $\sigma$ 有界，且 $V$ 的有界性保证 $Z_r$ 在 $[t,T]$ 上一致有界，存在常数 $C$，使

$$\mathbb E_{t,x}\!\left[\int_t^T\left|Z_r(\nabla u)^\top(r,X_r)\sigma(X_r)\right|^2dr\right]\le C(T-t)<\infty.$$

所以上述随机积分是平方可积鞅，而不只是局部鞅。取期望后随机积分项消失。注意到 $M_t=u(t,x)$，并由终端条件得 $M_T=Z_Tg(X_T)$，于是

$$\begin{aligned}
u(t,x)
&=\mathbb E_{t,x}[M_t]=\mathbb E_{t,x}[M_T]\\
&=\mathbb E_{t,x}\!\left[\exp\!\left(-\int_t^TV(X_s)\,ds\right)g(X_T)\right].
\end{aligned}$$

这正是所求表示。

□

当 $V=0$ 时，式（27.39）退化为后向方程的终端 payoff 表示；当 $V$ 为常数时，指数因子只是确定性折现。一般情形下，$V$ 同时进入偏微分方程的低阶项和路径泛函，两者必须保持一致。
### 27.8.4 Girsanov 变换与漂移改写

生成元和 Feynman–Kac 公式固定概率测度研究路径泛函；Girsanov 变换则通过改变测度来改写漂移。在有限时限 $[0,T]$ 上，设 $B$ 是 $\mathbb P$ 下的布朗运动，$\theta$ 是有界适应过程。定义指数鞅

$$Z_t=\exp\!\left(\int_0^t\theta_s^\top dB_s-\frac12\int_0^t|\theta_s|^2ds\right),\qquad \frac{d\mathbb Q}{d\mathbb P}\bigg|_{\mathcal F_T}=Z_T.$$

有界性使 Novikov 条件成立。对 $\log Z_t$ 使用 Itô 公式，或直接对指数函数使用 Itô 公式，均得到

$$dZ_t=Z_t\theta_t^\top dB_t,\qquad Z_0=1.$$

因此被积过程平方可积，$Z$ 是期望恒为一的正鞅，$\mathbb Q$ 确实是概率测度。Girsanov 定理给出

$$\widetilde B_t=B_t-\int_0^t\theta_s\,ds$$

是 $\mathbb Q$ 下的布朗运动。其关键原因是 $\widetilde B$ 在 $\mathbb Q$ 下为连续局部鞅，而测度等价改变不改变二次变差，故仍可用 Lévy 特征化判定布朗运动。

若原过程满足 $dX_t=b(X_t)\,dt+\sigma(X_t)\,dB_t$，代入 $dB_t=d\widetilde B_t+\theta_t\,dt$ 得

$$dX_t=\big[b(X_t)+\sigma(X_t)\theta_t\big]dt+\sigma(X_t)\,d\widetilde B_t.$$

所以同一随机微分方程在 $\mathbb Q$ 下只改变漂移，扩散系数和二次变差保持不变。要把漂移改为给定的 $\widetilde b$，需选择 $\theta$ 满足 $\sigma(X_t)\theta_t=\widetilde b(X_t)-b(X_t)$。
当 $a=\sigma\sigma^\top$ 可逆时，一个可行选择是 $\theta=\sigma^\top a^{-1}(\widetilde b-b)$，它直接给出所需漂移修正。对有界随机变量 $Y$，条件期望的测度变换遵循 Bayes 公式

$$\mathbb E^{\mathbb Q}[Y\mid\mathcal F_t]=\frac{\mathbb E^{\mathbb P}[Z_TY\mid\mathcal F_t]}{Z_t},\qquad 0\le t\le T.$$

分母为正，故公式无歧义。这样，Feynman–Kac 表示中的期望也可在更便利的等价测度下计算，但漂移与密度权重必须同步改变，不能只替换其中一项。

## 本章小结

本章以随机微分方程为主线，将布朗运动驱动的时间演化、适应性与解的存在唯一性联系起来。Itô 公式通过保留二阶变差项，把普通微积分推广到扩散路径；乘积法则、指数过程与多维形式又成为求解 GBM、OU 过程以及推导后续恒等式的统一工具。

对光滑函数应用 Itô 公式并取期望，漂移项自然凝练为无穷小生成元。生成元连接路径与算子，进一步导出 Kolmogorov 后向、前向方程和 Feynman–Kac 表示：偏微分方程的解可写成带折现或吸收因子的条件期望。Girsanov 变换从另一方向改写这一结构，它以指数鞅变换概率测度，使布朗运动产生确定性平移，从而只改变扩散的漂移而不改变扩散系数。

数值方法把这些解析结构落实到可计算路径。Euler–Maruyama 以漂移和增量的局部冻结逼近 SDE，Milstein 修正进一步利用扩散导数；强误差衡量路径逼近，弱误差衡量分布泛函逼近， Monte Carlo 抽样误差则须与离散化误差分别控制。解析解、生成元恒等式和测度变换既提供算法设计依据，也为检验数值结果提供基准。
## 习题

1. 辨析 SDE 的强解与弱解、轨道唯一性与分布唯一性，并说明 Brownian 运动及滤子是解的给定部分还是构造对象。各组概念之间是否存在自动推出的关系，须依据本章定义作答。

2. 设 $b,\sigma$ 关于空间变量满足全局 Lipschitz 条件，并具有线性增长。完整推导 Picard 迭代构造强解的主要估计，证明迭代的 Cauchy 性、所得过程的适应性以及轨道唯一性，并说明有限时限条件用在何处。

3. 对几何布朗运动
$$dS_t=\mu S_t\,dt+\sigma S_t\,dB_t,\qquad S_0>0,$$
从 $\log S_t$ 的 Itô 展开开始完整推导其显式解，验证所得过程确实满足原方程，并计算 $\mathbb E[S_t]$ 与 $\operatorname{Var}(S_t)$。

4. 对 Ornstein–Uhlenbeck 过程
$$dX_t=\kappa(\theta-X_t)\,dt+\sigma\,dB_t,\qquad \kappa>0,$$
使用积分因子完整推导出 $X_t$ 的显式表示，计算条件均值与条件方差，并求 $t\to\infty$ 时的极限分布。
5. 设 $X$ 为一维连续半鞅，$f\in C^2(\mathbb R)$。从分割区间上的 Taylor 展开出发，完整推导 Itô 公式，逐项说明一阶和、二阶和及余项的极限，并指出为什么不能把 $dX_t$ 的平方项直接舍弃。

6. 对一维标准 Brownian 运动 $B$，分别计算 $d(B_t^4)$、$d(tB_t)$ 与
$$d\!\left(\exp\!\left(\lambda B_t-\frac12\lambda^2t\right)\right).$$
判断所得过程中哪些是局部鞅，并在可积性成立时利用第一式求 $\mathbb E[B_t^4]$。

7. 对连续半鞅 $X,Y$ 完整推导乘积法则；进一步设 $Y$ 恒正，推导 $X/Y$ 的 Itô 公式。将结果用于 $S_t=e^{\sigma B_t}$ 与 $Y_t=e^{rt}$，写出 $S_t/Y_t$ 的随机微分。

8. 设 $dX_t=b_t\,dt+\sigma_t\,dB_t$ 为 $d$ 维扩散，其中 $B$ 为 $m$ 维 Brownian 运动。对 $f(x)=x^\top Ax+c^\top x$ 推导 $df(X_t)$，明确矩阵 $\sigma_t\sigma_t^\top$ 如何进入二阶项，并给出 $f(X_t)-f(X_0)$ 为局部鞅的漂移条件。
9. 分别写出几何布朗运动与第4题 OU 过程的无穷小生成元。对几何布朗运动取 $f(x)=x^p$，对 OU 过程取 $f(x)=x$ 和 $f(x)=x^2$，计算 $\mathcal Lf$，并解释这些结果如何恢复条件均值与二阶矩的演化方程。

10. 设时齐扩散满足本章生成元定理的条件，$f\in C_c^2(\mathbb R^d)$。从 Itô 公式完整证明 Dynkin 公式
$$\mathbb E_x[f(X_t)]-f(x)=\mathbb E_x\!\left[\int_0^t\mathcal Lf(X_s)\,ds\right],$$
并验证随机积分的期望为零，不得仅以局部鞅性质代替该验证。

11. 设 $u(t,x)=\mathbb E[g(X_T)\mid X_t=x]$。在所需光滑性和可积性成立的假设下，利用 Markov 性与 Itô 公式完整推导 Kolmogorov 后向方程，并说明时间齐次时它为何可写成只依赖剩余期限的形式。

12. 令 $X=B$ 为一维标准 Brownian 运动，给定
$$u(t,x)=\exp\!\left(-\frac{T-t}{2}\right)\cos x,\qquad 0\le t\le T.$$
完整验证 $u$ 满足式（27.38）在 $V=0$ 时的终值问题，独立计算 $\mathbb E[\cos B_T\mid B_t=x]$ 以核对 Feynman–Kac 表示，并证明证明过程中出现的随机积分是真鞅。
13. 对第4题的 OU 过程写出 Kolmogorov 前向方程及其平稳形式。完整推导平稳密度，确定其均值和方差，并证明它与第4题直接计算得到的极限分布一致。

14. 设 $B$ 为 $\mathbb P$ 下的一维标准 Brownian 运动，$\theta$ 为有界适应过程，$Z$ 按本章 Girsanov 段落定义。完整推导 $dZ_t=Z_t\theta_t\,dB_t$，说明 $\widetilde B_t=B_t-\int_0^t\theta_s\,ds$ 为何在 $\mathbb Q$ 下是 Brownian 运动，并证明
$$dX_t=\mu\,dt+\sigma\,dB_t$$
在 $\mathbb Q$ 下的漂移为 $\mu+\sigma\theta_t$。

15. 设 $\theta$ 为确定性函数且 $\int_0^T|\theta_s|^2ds<\infty$。证明对应指数过程 $Z_t$ 是 $\mathbb P$ 下期望恒为一的鞅；进一步计算 $\mathbb E^{\mathbb P}[Z_T^2]$，并说明该结果如何依赖上述积分条件。

16. 设 $Y_t=\nu t+\sigma B_t$，其中 $\sigma>0$。选择常数 Girsanov 核使 $Y$ 在新测度 $\mathbb Q$ 下成为零漂移扩散，写出相应密度与 $\mathbb Q$ 下的 SDE，并用标准正态分布函数表示 $\mathbb Q(a\le Y_T\le b)$。
17. 对一般标量扩散写出步长为 $h$ 的 Euler–Maruyama 格式。利用 Itô–Taylor 展开完整分析从精确状态出发的一步误差，分别给出均方误差与弱误差的阶，并解释随机增量尺度 $\sqrt h$ 对估计的影响。

18. 设 $dX_t=b(X_t)\,dt+\sigma\,dB_t$，其中 $b$ 全局 Lipschitz，$\sigma$ 为常数，初值确定。对连续时间插值的 Euler–Maruyama 近似 $\widehat X_t$，完整证明
$$\mathbb E\!\left[\sup_{0\le t\le T}|X_t-\widehat X_t|^2\right]\le Ch.$$
推导须包含解与数值解的二阶矩界、单步增量估计、误差累积以及 Gronwall 型论证，并说明常数 $C$ 依赖于哪些量。

19. 在系数与 $f$ 足够光滑且各阶导数具有多项式增长的条件下，完整推导 Euler–Maruyama 的全局弱误差为一阶。要求从局部生成元展开出发，通过相邻时间层的条件期望递推控制误差累积，并明确区分该结论与第18题的强误差结论。
20. 对标量扩散 $dX_t=b(X_t)\,dt+\sigma(X_t)\,dB_t$，从 Itô–Taylor 展开完整推导 Milstein 格式，说明新增修正项对应的二重随机积分，并在适当光滑性、Lipschitz 与可积条件下证明其均方强误差阶高于 Euler–Maruyama。

21. 设 $\widehat X_T^{h,i}$ 为独立同分布的数值路径终端值，以 $N^{-1}\sum_{i=1}^Nf(\widehat X_T^{h,i})$ 估计 $\mathbb E[f(X_T)]$。将均方误差严格分解为离散化偏差与 Monte Carlo 方差，推导渐近置信区间，并在总计算量给定时讨论 $h$ 与 $N$ 的误差分配原则。

22. 设标的价格在 $\mathbb P$ 下服从 $dS_t=\mu S_t\,dt+\sigma S_t\,dB_t$。综合运用本章工具：选择 Girsanov 核使漂移在等价测度 $\mathbb Q$ 下变为 $rS_t$；用 Itô 公式求解新测度下的 SDE；推导折现终端 payoff 的 Feynman–Kac 偏微分方程；最后分别给出精确离散化与 Euler–Maruyama 离散化，并设计同时检验路径强误差和 payoff 弱误差的数值实验。