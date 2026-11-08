# 第25章　鞅、停时与最优停止

概率论中最有力的思想之一，是把「公平博弈」这一直观概念严格化。所谓公平，不是说每一次的结果没有偏向，而是说在已经获得全部历史信息的条件下，下一步的期望增量恰好为零。把这一条件写成条件期望的形式，就得到鞅；把它写成「在何时停止下注」的可测性要求，就得到停时；把两者结合并允许观察者在信息流中做决策，就得到最优停止理论。因此鞅论本质上是条件期望在时间维度上的系统展开：第 4 章建立的条件期望公理化理论在此获得了它最重要的应用场景。

鞅同时是三块后续内容的共同基础。随机积分（第 26 章）被定义为对鞅的可预测被积函数求和，其等距性质完全依赖鞅的平方可加结构；衍生品定价（第 27 章）把无套利价格表示为风险中性测度下贴现收益的鞅期望；序贯决策与美式期权的执行策略则是停时上的最优化问题。掌握本章，就掌握了从测度论概率通向金融数学的主干道。

本章只讨论离散时间 $n = 0,1,2,\dots$ 上的鞅。连续时间鞅的右连续修正、Doob–Meyer 分解与 Itô 积分分别在第 26 章与第 27 章处理，那里的技术困难主要来自时间的不可数性，而思想根源全在本章。

## 25.1 滤波、鞅与停时

信息的数学模型是一个递增的 σ-代数序列。设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间。
一族子 σ-代数 $\{\mathcal F_n\}_{n\ge 0}$，$\mathcal F_n\subset\mathcal F$，若满足
$$
\mathcal F_0\subset\mathcal F_1\subset\cdots\subset\mathcal F_n\subset\mathcal F_{n+1}\subset\cdots\subset\mathcal F,
\tag{25.1}
$$
则称其为**滤波**（filtration），称 $(\Omega,\mathcal F,\{\mathcal F_n\},\mathbb P)$ 为**带滤波的概率空间**。直观上，$\mathcal F_n$ 表示「时刻 $n$ 结束时观察者已经知道的一切」：$\mathcal F_n$ 中的每个事件都是能够仅凭到 $n$ 为止的历史判定是否发生的陈述。单调性 (25.1) 表达的是信息不会遗忘——已经知道的事永远知道。若 $\mathcal F_0$ 只含零测集及其补集（即平凡 σ-代数），则称滤波是**平凡的起点**，此时任何 $\mathcal F_0$-可测随机变量几乎必然为常数。

随机过程 $X=\{X_n\}_{n\ge 0}$ 称为**适应**（adapted）于滤波 $\{\mathcal F_n\}$，若对每个 $n$，$X_n$ 是 $\mathcal F_n$-可测的。适应性是说：到时刻 $n$，观察者已经看到 $X_n$ 的取值。适应过程连同滤波一起，构成「信息逐步释放」这一场景的完整描述。

**定义 25.1（离散时间鞅、上鞅、下鞅）**

设 $\{\mathcal F_n\}$ 为滤波，$X=\{X_n\}_{n\ge 0}$ 为适应于 $\{\mathcal F_n\}$ 的实值随机过程。若对每个 $n\ge 0$ 有 $\mathbb E|X_n|<\infty$（可积性），并且：

1. 若几乎必然
$$
\mathbb E[X_{n+1}\mid\mathcal F_n]=X_n,
\tag{25.2}
$$
则称 $X$ 为**鞅**（martingale）；

2. 若几乎必然 $\mathbb E[X_{n+1}\mid\mathcal F_n]\ge X_n$，则称 $X$ 为**下鞅**（submartingale）；

3. 若几乎必然 $\mathbb E[X_{n+1}\mid\mathcal F_n]\le X_n$，则称 $X$ 为**上鞅**（supermartingale）。
三条要求各有其不可替代的作用。可积性 $\mathbb E|X_n|<\infty$ 保证条件期望 $\mathbb E[X_{n+1}\mid\mathcal F_n]$ 有意义：条件期望的定义（第 4 章）要求被条件化的随机变量至少属于 $L^1$，否则正负部分可能同时为无穷而使差式不确定。适应性保证 $X_n$ 本身是 $\mathcal F_n$-可测的，因而 (25.2) 右端是合法的比较对象；若 $X_n$ 含有未来信息，则等式无从谈起。核心条件 (25.2) 则断言：在已知全部历史的条件下，未来的期望值等于当前值，即**当前观测是对未来的最优（无偏）预报**。

「公平博弈」的含义可以这样读：把 $X_n$ 视为赌徒在时刻 $n$ 的财富。若 $X$ 是鞅，则在任一时刻，无论赌徒此前经历了怎样的输赢，他下一步的期望财富都恰好等于现有财富——博弈没有任何系统性偏向。若 $X$ 是下鞅，则 $\mathbb E[X_{n+1}\mid\mathcal F_n]\ge X_n$，博弈对赌徒有利（例如持有正漂移的资产）；上鞅则对赌徒不利，这正是一切公平博弈中「赌徒可采取的下注策略」所生成的过程类型——因为下注策略必须基于已知信息，它无法把上鞅变成下鞅。这一不对称性是 25.3 节可选停时定理的直觉来源。

**命题 25.2（鞅的基本性质）**

设 $X=\{X_n\}$ 适应于 $\{\mathcal F_n\}$，且各 $X_n$ 可积。则：

1. 若 $X$ 是鞅，则对一切 $n\ge 0$ 有 $\mathbb E X_n=\mathbb E X_0$；若 $X$ 是下鞅，则 $n\mapsto\mathbb E X_n$ 单调不减；若 $X$ 是上鞅，则 $n\mapsto\mathbb E X_n$ 单调不增。

2. 若 $X$ 是下鞅，$\varphi:\mathbb R\to\mathbb R$ 为凸的递增函数且 $\varphi(X_n)$ 可积，则 $\varphi(X)$ 是下鞅。特别地，若 $X$ 是鞅且 $\varphi$ 为凸函数、$\varphi(X_n)$ 可积，则 $\varphi(X)$ 是下鞅。

3. 若 $X$ 是上鞅，则 $-X$ 是下鞅；若 $X,Y$ 均为下鞅，$a,b\ge 0$，则 $aX+bY$ 是下鞅；若 $X,Y$ 均为下鞅，则 $X\vee Y$ 是下鞅。

4. 令 $D_n=X_n-X_{n-1}$（$n\ge 1$）。则 $X$ 是鞅当且仅当 $\mathbb E[D_{n+1}\mid\mathcal F_n]=0$ 对一切 $n\ge 0$ 成立；此时称 $\{D_n\}$ 为**鞅差序列**。反之，给定 $\mathcal F_0$-可测的可积随机变量 $\xi$ 与适应的鞅差序列 $\{D_n\}_{n\ge 1}$，令 $X_0=\xi$、$X_n=\xi+\sum_{k=1}^{n}D_k$，则 $X$ 是鞅。
**证明**

(1) 对 (25.2) 两端取无条件期望，并利用条件期望的保期望性（第 4 章定理：$\mathbb E[\mathbb E[Z\mid\mathcal G]]=\mathbb E Z$，当 $Z$ 可积），得
$$
\mathbb E X_{n+1}=\mathbb E\bigl[\mathbb E[X_{n+1}\mid\mathcal F_n]\bigr]=\mathbb E X_n.
$$
归纳即得 $\mathbb E X_n=\mathbb E X_0$。下鞅情形把等号换成不等号：$\mathbb E X_{n+1}\ge\mathbb E X_n$，故期望序列单调不减。上鞅同理，注意此处各量均为有限实数，可积性保证了不等式两侧不会出现 $\infty-\infty$。

(2) 设 $X$ 为下鞅，$\varphi$ 凸且递增。由条件 Jensen 不等式（第 4 章：$\varphi$ 凸且 $\varphi(Z)$ 可积时 $\varphi(\mathbb E[Z\mid\mathcal G])\le\mathbb E[\varphi(Z)\mid\mathcal G]$ 几乎必然成立），
$$
\varphi(X_n)=\varphi\bigl(\mathbb E[X_{n+1}\mid\mathcal F_n]\bigr)\le\mathbb E\bigl[\varphi(X_{n+1})\mid\mathcal F_n\bigr].
$$
第一个等号用到 $\varphi(X_n)=\varphi(\mathbb E[X_{n+1}\mid\mathcal F_n])$，这由下鞅性质给出；这里 $\varphi$ 的**递增性**是必需的，因为只能由 $X_n\le\mathbb E[X_{n+1}\mid\mathcal F_n]$ 推出 $\varphi(X_n)\le\varphi(\mathbb E[X_{n+1}\mid\mathcal F_n])$。可积性方面，$\mathbb E|\varphi(X_n)|<\infty$ 由假设保证，且适应性由 $\varphi$ 为 Borel 函数与 $X_n$ 的 $\mathcal F_n$-可测性复合而成，故 $\varphi(X)$ 是下鞅。

若 $X$ 为鞅，则 (25.2) 给出 $\mathbb E[X_{n+1}\mid\mathcal F_n]=X_n$，代入条件 Jensen 得
$$
\varphi(X_n)=\varphi\bigl(\mathbb E[X_{n+1}\mid\mathcal F_n]\bigr)\le\mathbb E\bigl[\varphi(X_{n+1})\mid\mathcal F_n\bigr],
$$
此时不需要 $\varphi$ 单调，因为等号已经把两侧对齐。故 $\varphi(X)$ 是下鞅。典型取法为 $\varphi(x)=|x|^p$（$p\ge 1$），它凸且非负部分单调，从而 $|X|^p$ 是下鞅；这一事实是 25.2 节极大不等式的关键输入。

(3) $\mathbb E[-X_{n+1}\mid\mathcal F_n]=-\mathbb E[X_{n+1}\mid\mathcal F_n]\le-X_n$，故 $-X$ 为下鞅。线性组合的可积性由三角不等式与 $\mathbb E|aX_n+bY_n|\le a\,\mathbb E|X_n|+b\,\mathbb E|Y_n|<\infty$ 得到，条件期望的线性性给出
$$
\mathbb E[aX_{n+1}+bY_{n+1}\mid\mathcal F_n]=a\,\mathbb E[X_{n+1}\mid\mathcal F_n]+b\,\mathbb E[Y_{n+1}\mid\mathcal F_n]\ge aX_n+bY_n.
$$
对最大值，利用恒等式 $x\vee y=\tfrac12(x+y+|x-y|)$。适应性显然。凸函数 $(x,y)\mapsto x\vee y$ 在 $\mathbb R^2$ 上凸，故由二维条件 Jensen 不等式，
$$
X_n\vee Y_n=\mathbb E[X_{n+1}\mid\mathcal F_n]\vee\mathbb E[Y_{n+1}\mid\mathcal F_n]\le\mathbb E[X_{n+1}\vee Y_{n+1}\mid\mathcal F_n],
$$
其中不等号来自「凸映射的条件 Jensen」：对凸的 $\Phi:\mathbb R^2\to\mathbb R$ 与可积的二维随机向量 $\boldsymbol Z$，有 $\Phi(\mathbb E[\boldsymbol Z\mid\mathcal F_n])\le\mathbb E[\Phi(\boldsymbol Z)\mid\mathcal F_n]$。可积性由 $|X_n\vee Y_n|\le|X_n|+|Y_n|$ 保证。故 $X\vee Y$ 为下鞅。
(4) 正向：若 $X$ 为鞅，则由条件期望的线性性，
$$
\mathbb E[D_{n+1}\mid\mathcal F_n]=\mathbb E[X_{n+1}\mid\mathcal F_n]-X_n=0,
$$
其中第二项可以直接提出，因为 $X_n$ 是 $\mathcal F_n$-可测的（条件期望的「已知量可提出」性质）。反向：设 $\{D_n\}_{n\ge 1}$ 适应且 $\mathbb E[D_{n+1}\mid\mathcal F_n]=0$，各 $D_n$ 可积，$\xi$ 为 $\mathcal F_0$-可测且可积。令 $X_0=\xi$，$X_n=\xi+\sum_{k=1}^{n}D_k$。首先 $\mathbb E|X_n|\le\mathbb E|\xi|+\sum_{k=1}^{n}\mathbb E|D_k|<\infty$，故可积；其次 $X_n$ 是 $\mathcal F_n$-可测的，因为 $\xi$ 为 $\mathcal F_0$-可测从而 $\mathcal F_n$-可测，每个 $D_k$（$k\le n$）为 $\mathcal F_k$-可测从而 $\mathcal F_n$-可测。最后，对 $k\le n$，$D_{k+1}$ 的可测性使
$$
\mathbb E[X_{n+1}\mid\mathcal F_n]=\xi+\sum_{k=1}^{n}D_k+\mathbb E[D_{n+1}\mid\mathcal F_n]=X_n+0=X_n.
$$
故 $X$ 为鞅。一一对应性是显然的：给定 $\mathcal F_0$ 与序列 $\{D_n\}_{n\ge 1}$，$X$ 由上式唯一确定；反之给定 $X$，$D_n=X_n-X_{n-1}$ 唯一确定。这一对应把「鞅」翻译为「增量的条件均值为零」，是随机积分的出发点：第 26 章把可预测过程对鞅差求和，其 $L^2$ 等距性质正是本节对应关系的平方版本。

□

**注记**　命题 25.2 第 2 条说明凸变换把鞅变为下鞅，这一「单向性」极为重要：它意味着 $|X_n|$、$X_n^2$、$\mathrm e^{\theta X_n}$（$\theta>0$）在 $X$ 为鞅时自动成为下鞅，于是所有针对非负下鞅的不等式（定理 25.5）都能直接套用到鞅本身。反之，下鞅经凹变换或经非单调凸变换后未必仍是下鞅。

**注记**　关于 $L^2$ 结构：若 $X$ 为平方可积鞅（$\mathbb E X_n^2<\infty$），则由增量正交性可得 $\mathbb E X_n^2=\mathbb E X_0^2+\sum_{k=1}^{n}\mathbb E D_k^2$，即鞅的方差等于增量方差之和。其证明只需展开 $X_n^2=X_0^2+2\sum_{k=1}^n X_{k-1}D_k+\sum_{k=1}^n D_k^2$，对每一项取条件期望 $\mathbb E[X_{k-1}D_k]=\mathbb E[X_{k-1}\,\mathbb E[D_k\mid\mathcal F_{k-1}]]=0$。这一「正交增量」性质是 Itô 等距的离散原型。
下面给出三个最重要的鞅，它们将贯穿全章与后续各章。

**（甲）对称简单随机游走。** 设 $\xi_1,\xi_2,\dots$ 为独立同分布随机变量，$\mathbb P(\xi_k=1)=\mathbb P(\xi_k=-1)=\tfrac12$，令 $S_0=0$，
$$
S_n=\sum_{k=1}^{n}\xi_k,\qquad \mathcal F_n=\sigma(\xi_1,\dots,\xi_n).
\tag{25.3}
$$
则 $\{S_n\}$ 关于自然滤波 $\{\mathcal F_n\}$ 是鞅。可积性：$|S_n|\le n$，故 $\mathbb E|S_n|\le n<\infty$。适应性：$S_n$ 是 $\xi_1,\dots,\xi_n$ 的 Borel 函数，故 $\mathcal F_n$-可测。鞅性：$\xi_{n+1}$ 与 $\mathcal F_n$ 独立（因为 $\xi_{n+1}$ 与 $\xi_1,\dots,\xi_n$ 相互独立，而 $\mathcal F_n$ 由它们生成），故 $\mathbb E[\xi_{n+1}\mid\mathcal F_n]=\mathbb E\xi_{n+1}=0$，从而
$$
\mathbb E[S_{n+1}\mid\mathcal F_n]=S_n+\mathbb E[\xi_{n+1}\mid\mathcal F_n]=S_n.
$$
若把 $\tfrac12$ 改为 $p\ne\tfrac12$，则 $\mathbb E[S_{n+1}\mid\mathcal F_n]=S_n+(2p-1)$，当 $p>\tfrac12$ 时 $S_n$ 为下鞅，$p<\tfrac12$ 时为上鞅；而 $S_n-(2p-1)n$ 恒为鞅，这就是「去掉漂移」的操作，也是 Doob 分解（定理 25.4）的最简单实例。

**（乙）指数鞅。** 设 $\xi_1,\xi_2,\dots$ 独立同分布，矩母函数 $\varphi(\theta)=\mathbb E\,\mathrm e^{\theta\xi_1}$ 在某区间内有限且非零，$S_n=\sum_{k=1}^n\xi_k$，$\mathcal F_n=\sigma(\xi_1,\dots,\xi_n)$。定义
$$
M_n=\frac{\mathrm e^{\theta S_n}}{\varphi(\theta)^n},\qquad n\ge 0.
\tag{25.4}
$$
则 $\{M_n\}$ 是鞅。可积性：$\mathbb E M_n=\mathrm e^0=1$（见下），故 $M_n\ge 0$ 且期望有限，从而 $\mathbb E|M_n|<\infty$。鞅性：$M_{n+1}=M_n\cdot\mathrm e^{\theta\xi_{n+1}}/\varphi(\theta)$，其中 $M_n$ 为 $\mathcal F_n$-可测，$\xi_{n+1}$ 与 $\mathcal F_n$ 独立，故
$$
\mathbb E[M_{n+1}\mid\mathcal F_n]=M_n\cdot\frac{\mathbb E[\mathrm e^{\theta\xi_{n+1}}]}{\varphi(\theta)}=M_n.
$$
对（甲）中的对称步长，$\varphi(\theta)=\tfrac12(\mathrm e^\theta+\mathrm e^{-\theta})=\cosh\theta$，故 $M_n=\mathrm e^{\theta S_n}/(\cosh\theta)^n$。指数鞅是随机游走中最重要的工具：例 25.3 用它求解不公平博弈的破产概率，第 26 章的 Girsanov 定理本质上是「用指数鞅改变测度」。

**（丙）Polya 瓮。** 瓮中原有 $r$ 个红球与 $b$ 个黑球（$r,b$ 为正整数）。每一步均匀随机取出一球，观察颜色后放回，并额外加入一个同色球。记 $R_n$ 为第 $n$ 步操作后瓮中红球数（$R_0=r$），总球数恒为 $r+b+n$，$\mathcal F_n=\sigma(R_0,\dots,R_n)$。则红球比例
$$
X_n=\frac{R_n}{r+b+n},\qquad n\ge 0
\tag{25.5}
$$
是鞅。事实上，给定 $\mathcal F_n$，有 $\mathbb P(R_{n+1}=R_n+1\mid\mathcal F_n)=R_n/(r+b+n)=X_n$，$\mathbb P(R_{n+1}=R_n\mid\mathcal F_n)=1-X_n$，故
$$
\mathbb E[R_{n+1}\mid\mathcal F_n]=R_n+X_n,
$$
从而
$$
\mathbb E[X_{n+1}\mid\mathcal F_n]=\frac{\mathbb E[R_{n+1}\mid\mathcal F_n]}{r+b+n+1}=\frac{R_n+\dfrac{R_n}{r+b+n}}{r+b+n+1}=\frac{R_n\left(1+\dfrac{1}{r+b+n}\right)}{r+b+n+1}=\frac{R_n\cdot\dfrac{r+b+n+1}{r+b+n}}{r+b+n+1}=\frac{R_n}{r+b+n}=X_n.
$$
可积性显然（$0\le X_n\le 1$）。Polya 瓮的鞅性质说明：比例过程无系统性漂移，但它几乎必然收敛到一个非退化的极限（Beta 分布），这一现象由后段的鞅收敛定理刻画。
**定义 25.3（停时）**

设 $\{\mathcal F_n\}_{n\ge 0}$ 为滤波。取值于 $\{0,1,2,\dots\}\cup\{+\infty\}$ 的映射 $\tau:\Omega\to\{0,1,2,\dots\}\cup\{+\infty\}$ 称为关于 $\{\mathcal F_n\}$ 的**停时**（stopping time），若对每个 $n\ge 0$，
$$
\{\tau\le n\}\in\mathcal F_n.
$$
若 $\mathbb P(\tau<\infty)=1$，称 $\tau$ **几乎必然有限**；若存在 $N$ 使 $\tau\le N$，称 $\tau$ **有界**。

停时的含义是「只依赖已实现信息的决策规则」：在时刻 $n$，观察者必须能够仅凭 $\mathcal F_n$ 判定「我是否已经停止」。等价的表述是 $\{\tau=n\}\in\mathcal F_n$（因为 $\{\tau=n\}=\{\tau\le n\}\setminus\{\tau\le n-1\}$，反向由 $\{\tau\le n\}=\bigcup_{k\le n}\{\tau=k\}$）；对可数无穷的滤波，$\{\tau\le n\}\in\mathcal F_n$ 与 $\{\tau=n\}\in\mathcal F_n$ 两种定义完全等价。定义中用 $\{\tau\le n\}$ 而非 $\{\tau=n\}$ 是为了与连续时间情形统一：那里右连续滤波下必须用 $\{\tau\le t\}$，否则结论失效。

典型例子：首次到达时刻 $\tau_a=\min\{n\ge 0:S_n\ge a\}$（约定 $\min\varnothing=+\infty$）。验证：$\{\tau_a\le n\}=\bigcup_{k=0}^{n}\{S_k\ge a\}\in\mathcal F_n$，因为每个 $\{S_k\ge a\}$（$k\le n$）都属 $\mathcal F_n$。反之，「最后一次到达 $a$ 的时刻」不是停时，见下面的反例。

**停时的运算封闭性**　设 $\tau,\sigma$ 为关于 $\{\mathcal F_n\}$ 的停时，$\{\tau_k\}_{k\ge 1}$ 为一列停时。则下列均为停时：$\tau\wedge\sigma$、$\tau\vee\sigma$、$\tau+\sigma$、$\tau+m$（$m$ 为固定非负整数）；事件 $\{\tau\le\sigma\}$、$\{\tau<\sigma\}$、$\{\tau=\sigma\}$ 满足 $\{\tau\le\sigma\}\cap\{\sigma\le n\}\in\mathcal F_n$；$\inf_k\tau_k$ 是停时，$\sup_k\tau_k$ 是停时。

**证明**

对 $\tau\wedge\sigma$：$\{\tau\wedge\sigma\le n\}=\{\tau\le n\}\cup\{\sigma\le n\}\in\mathcal F_n$，因为 $\mathcal F_n$ 对有限并封闭。

对 $\tau\vee\sigma$：$\{\tau\vee\sigma\le n\}=\{\tau\le n\}\cap\{\sigma\le n\}\in\mathcal F_n$，因为 $\mathcal F_n$ 对有限交封闭。

对 $\tau+\sigma$：注意 $\{\tau+\sigma\le n\}=\bigcup_{k=0}^{n}\bigl(\{\tau=k\}\cap\{\sigma\le n-k\}\bigr)$。若 $\tau+\sigma\le n$，取 $k=\tau$，则 $\tau=k$ 且 $\sigma\le n-k$，故左端含于右端；反之若存在 $k\le n$ 使 $\tau=k$ 且 $\sigma\le n-k$，则 $\tau+\sigma\le k+(n-k)=n$。每个 $\{\tau=k\}\in\mathcal F_k\subset\mathcal F_n$，每个 $\{\sigma\le n-k\}\in\mathcal F_{n-k}\subset\mathcal F_n$，有限并仍在 $\mathcal F_n$ 中，故 $\{\tau+\sigma\le n\}\in\mathcal F_n$。这里**必须**用 $\{\tau=k\}$ 与 $\{\sigma\le n-k\}$ 的组合而不能写成 $\bigcup_k(\{\tau\le k\}\cap\{\sigma\le n-k\})$——后者会把 $\tau<k$ 的情形错误地包含进来。

对 $\tau+m$：$\{\tau+m\le n\}=\{\tau\le n-m\}$，当 $n<m$ 时为空集（属 $\mathcal F_n$），当 $n\ge m$ 时属 $\mathcal F_{n-m}\subset\mathcal F_n$。

对 $\{\tau\le\sigma\}$：写 $\{\tau\le\sigma\}\cap\{\sigma\le n\}=\bigcup_{k=0}^{n}\bigl(\{\tau\le k\}\cap\{\sigma=k\}\bigr)$。若 $\omega$ 属于左端，令 $k=\sigma(\omega)\le n$，则 $\tau(\omega)\le k$ 且 $\sigma(\omega)=k$，故属右端；反向包含同理。每个 $\{\tau\le k\}\in\mathcal F_k\subset\mathcal F_n$，$\{\sigma=k\}\in\mathcal F_k\subset\mathcal F_n$，故右端属 $\mathcal F_n$。这正是「$\{\tau\le\sigma\}$ 在时刻 $\sigma$ 之前是可判定事件」的严格表述。把 $\le$ 换成 $<$：$\{\tau<\sigma\}\cap\{\sigma\le n\}=\bigcup_{k=0}^{n}\bigl(\{\tau\le k-1\}\cap\{\sigma=k\}\bigr)\in\mathcal F_n$（约定 $\{\tau\le-1\}=\varnothing$）。而 $\{\tau=\sigma\}=\{\tau\le\sigma\}\cap\{\sigma\le\tau\}$，由 $\mathcal F_n$ 对交封闭即得。

对 $\inf_k\tau_k$：$\{\inf_k\tau_k\le n\}=\bigcup_k\{\tau_k\le n\}\in\mathcal F_n$（可数并）。对 $\sup_k\tau_k$：$\{\sup_k\tau_k\le n\}=\bigcap_k\{\tau_k\le n\}\in\mathcal F_n$（可数交）。注意 $\{\sup_k\tau_k<n\}=\bigcup_k\{\tau_k\le n-1\}$ 同样可测，但 $\{\inf_k\tau_k<n\}=\bigcup_k\{\tau_k<n\}$ 只保证 $\inf_k\tau_k$ 是「可选时刻」而非停时——在离散时间下两者一致，在连续时间下则有区别。

□
**非停时的反例。** 设 $S_n$ 为对称简单随机游走，$\mathcal F_n=\sigma(S_0,\dots,S_n)$，定义「最后一次返回原点的时刻」
$$
L=\sup\{n\ge 0:S_n=0\},
$$
其中上确界可取 $+\infty$（由对称随机游走以概率 1 无穷多次返回原点，实际上 $L=+\infty$ 几乎必然）。即便退一步考虑有限窗口版本
$$
L_N=\sup\{0\le n\le N:S_n=0\},
$$
$L_N$ 也不是停时。取 $N=4$，考察事件 $\{L_4\le 2\}$，即「时刻 2 之后再未回到原点」。要在时刻 2 判定该事件，必须知道 $S_3,S_4$ 的取值，而这两者不在 $\mathcal F_2$ 中。严格地：设 $A=\{S_0=S_1=S_2=0\}$ 的概率为正的路径族中，取两条在 $\mathcal F_2$ 上完全相同（即 $S_0=0,S_1=1,S_2=0$）、但在时刻 3 分岔的路径 $\omega_1,\omega_2$，令 $\omega_1$ 满足 $S_3(\omega_1)=1,S_4(\omega_1)=2$（于是 $L_4(\omega_1)=2$），$\omega_2$ 满足 $S_3(\omega_2)=-1,S_4(\omega_2)=0$（于是 $L_4(\omega_2)=4$）。则 $\omega_1\in\{L_4\le 2\}$ 而 $\omega_2\notin\{L_4\le 2\}$，但 $\omega_1,\omega_2$ 在 $\mathcal F_2$ 上不可区分（它们属于 $\mathcal F_2$ 的同一个原子 $\{S_0=0,S_1=1,S_2=0\}$）。若 $\{L_4\le 2\}\in\mathcal F_2$，则它必须同时包含或同时不包含这两个原子元素，矛盾。故 $L_4$ 不是停时。

这个反例揭示的要点是：**停时的定义域只能是「已经发生的历史」**。任何需要窥视未来的决策规则都不是停时，因而不能用于可选停时定理。在金融上，这意味着「在最高点卖出」不是一个可执行的策略——最高点是事后才能确认的。25.5 节（后段）将说明，即使限制在停时类中，最优执行时刻仍然存在且可由 Snell 包络刻画，这是美式期权定价的数学内容。

**例 25.1**

设 $S_n$ 为对称简单随机游走，$S_0=0$，$\mathcal F_n=\sigma(\xi_1,\dots,\xi_n)$。给定正整数 $a,b$，定义首次到达上界与首次到达下界的时刻
$$
\tau_a=\min\{n\ge 0:S_n=a\},\qquad \tau_{-b}=\min\{n\ge 0:S_n=-b\},\qquad \tau=\tau_a\wedge\tau_{-b},
$$
并求 $\mathbb P(\tau_a<\tau_{-b})$ 与 $\mathbb E\tau$。

**解**

第一步，验证 $\tau$ 是停时且几乎必然有限。对每个 $n$，$\{\tau_a\le n\}=\bigcup_{k=0}^{n}\{S_k=a\}\in\mathcal F_n$，故 $\tau_a$ 是停时；同理 $\tau_{-b}$ 是停时；由封闭性，$\tau=\tau_a\wedge\tau_{-b}$ 是停时。几乎必然有限性稍后由第二步的估计得到（也可由随机游走常返性推出）。

第二步，说明为何可以使用**有界停时版本**的可选停时定理。$\{S_n\}$ 是鞅，但 $\tau$ 只是几乎必然有限而无界，定理 25.8(i) 不直接适用。标准做法是先考虑截断停时 $\tau\wedge n$，它满足 $\tau\wedge n\le n$，是有界停时，故定理 25.8(i) 给出
$$
\mathbb E[S_{\tau\wedge n}]=\mathbb E S_0=0.
$$
这里使用有界版本而非一般版本是**必需且合法**的：$S_{\tau\wedge n}$ 有界（因为停止前 $|S_k|<\max(a,b)$，停止后 $S_\tau\in\{a,-b\}$，故 $|S_{\tau\wedge n}|\le a\vee b$），一致可积性自动满足，取极限时可用控制收敛定理。于是令 $n\to\infty$，
$$
0=\lim_{n\to\infty}\mathbb E[S_{\tau\wedge n}]=\mathbb E[S_\tau]=a\,\mathbb P(S_\tau=a)+(-b)\,\mathbb P(S_\tau=-b).
$$
注意 $\{S_\tau=a\}=\{\tau_a<\tau_{-b}\}$、$\{S_\tau=-b\}=\{\tau_{-b}<\tau_a\}$，且这两个事件互斥并为全集（因为随机游走在区间 $(-b,a)$ 内每一步只能移动 1，离开该区间时必恰好落在 $a$ 或 $-b$ 上，不可能跳过）。记 $p=\mathbb P(\tau_a<\tau_{-b})$，则 $ap-b(1-p)=0$，解得
$$
\mathbb P(\tau_a<\tau_{-b})=\frac{b}{a+b},\qquad \mathbb P(\tau_{-b}<\tau_a)=\frac{a}{a+b}.
$$
这被称为**赌徒破产公式**的公平情形：初始财富 $b$、目标财富 $a+b$ 的赌徒，在公平博弈中达成目标的概率恰为 $b/(a+b)$，与财富比例一致。特别地 $a=b$ 时概率为 $\tfrac12$。
第三步，求期望持续时间 $\mathbb E\tau$。$\{S_n\}$ 本身不足以给出时间信息，需要用平方鞅。验证 $\{S_n^2-n\}$ 是鞅：由 $\xi_{n+1}$ 与 $\mathcal F_n$ 独立、$\mathbb E\xi_{n+1}=0$、$\mathbb E\xi_{n+1}^2=1$，
$$
\mathbb E[S_{n+1}^2\mid\mathcal F_n]=\mathbb E[(S_n+\xi_{n+1})^2\mid\mathcal F_n]=S_n^2+2S_n\,\mathbb E[\xi_{n+1}\mid\mathcal F_n]+\mathbb E[\xi_{n+1}^2\mid\mathcal F_n]=S_n^2+0+1,
$$
故 $\mathbb E[S_{n+1}^2-(n+1)\mid\mathcal F_n]=S_n^2-n$，鞅性得证，可积性由 $\mathbb E S_n^2=n<\infty$ 保证。对**有界**停时 $\tau\wedge n$ 应用定理 25.8(i)：
$$
\mathbb E[S_{\tau\wedge n}^2-(\tau\wedge n)]=\mathbb E[S_0^2-0]=0,
$$
即 $\mathbb E[S_{\tau\wedge n}^2]=\mathbb E[\tau\wedge n]$。

第四步，令 $n\to\infty$。左端：$S_{\tau\wedge n}^2\le(a\vee b)^2$（停止前随机游走处于开区间 $(-b,a)$ 内，因步长为 1 故 $|S_k|\le a\vee b-1$；停止后 $S_\tau^2\in\{a^2,b^2\}\le(a\vee b)^2$），由有界控制收敛定理，$\mathbb E[S_{\tau\wedge n}^2]\to\mathbb E[S_\tau^2]$。右端：$\tau\wedge n$ 关于 $n$ 单调不减且趋于 $\tau$，由单调收敛定理 $\mathbb E[\tau\wedge n]\to\mathbb E\tau$（极限可为 $+\infty$）。故
$$
\mathbb E\tau=\mathbb E[S_\tau^2]=a^2\cdot\frac{b}{a+b}+b^2\cdot\frac{a}{a+b}=\frac{ab(a+b)}{a+b}=ab.
$$
$\mathbb E\tau=ab<\infty$ 反过来证明了 $\tau$ 几乎必然有限（若 $\mathbb P(\tau=\infty)>0$ 则 $\mathbb E\tau=\infty$），第一步留下的问题就此解决。

**注记**　本题的计算完全依赖「先截断、再用有界停时定理、最后取极限」这一三步模式，它是处理无界停时的标准技术。第二步中 $|S_{\tau\wedge n}|\le a\vee b$ 的一致有界性是本例能够取极限的关键；若换成 $\tau=\tau_a$（只设上界），则 $S_{\tau\wedge n}$ 无界，控制收敛定理不可用，事实上 $\mathbb E\tau_a=\infty$，见 25.3 节的反例。

## 25.2 Doob 分解与鞅不等式

鞅是「纯噪声」的过程：它的期望恒定，没有任何可预测的趋势。但实际应用中的过程几乎总带有趋势——资产价格有漂移，计数过程有强度。Doob 分解定理断言：任何可积适应过程都能唯一地拆成「鞅部分＋可预测趋势部分」，从而把对一般过程的分析归结为对鞅的分析加上对趋势的分析。这一分解在连续时间中的对应物是 Doob–Meyer 分解，它是随机积分、补偿泊松过程、信用风险强度模型（第 27 章）的共同起点。

**定理 25.4（Doob 分解）**

设 $X=\{X_n\}_{n\ge 0}$ 为适应于 $\{\mathcal F_n\}$ 的可积过程（每个 $X_n\in L^1$）。则存在过程 $M=\{M_n\}$ 与 $A=\{A_n\}$，使得对一切 $n\ge 0$，
$$
X_n=M_n+A_n,
\tag{25.6}
$$
其中 $M$ 是关于 $\{\mathcal F_n\}$ 的鞅，$A$ 是**可预测**过程（即 $A_0=0$ 且对每个 $n\ge 1$，$A_n$ 为 $\mathcal F_{n-1}$-可测），并且这样的分解在「几乎必然逐点相等」的意义下唯一。进一步，若 $X$ 是下鞅，则可取 $A$ 单调不减（即对每个 $n$，$A_{n+1}\ge A_n$ 几乎必然）；若 $X$ 是上鞅，则可取 $A$ 单调不增。
**证明**（构造与验证）

定义
$$
A_0=0,\qquad A_n=\sum_{k=1}^{n}\Bigl(\mathbb E[X_k\mid\mathcal F_{k-1}]-X_{k-1}\Bigr),\qquad n\ge 1,
\tag{25.7}
$$
并令 $M_n=X_n-A_n$。

先验证 $A_n$ 良定义且可积。每个 $\mathbb E[X_k\mid\mathcal F_{k-1}]$ 存在（$X_k\in L^1$）且属 $L^1$，因为 $\mathbb E|\mathbb E[X_k\mid\mathcal F_{k-1}]|\le\mathbb E[\mathbb E[|X_k|\mid\mathcal F_{k-1}]]=\mathbb E|X_k|<\infty$。有限和仍属 $L^1$，故 $A_n\in L^1$。可预测性：对 $k\le n$，$\mathbb E[X_k\mid\mathcal F_{k-1}]$ 是 $\mathcal F_{k-1}$-可测的，$X_{k-1}$ 是 $\mathcal F_{k-1}$-可测的（适应性），故每一项都是 $\mathcal F_{k-1}$-可测，从而也是 $\mathcal F_{n-1}$-可测的（因为 $k-1\le n-1$，滤波递增）。有限个 $\mathcal F_{n-1}$-可测函数之和仍为 $\mathcal F_{n-1}$-可测，故 $A_n$ 是 $\mathcal F_{n-1}$-可测的。这就是「可预测」的确切含义：$A_n$ 在时刻 $n-1$ 结束时已经完全确定，它不含任何时刻 $n$ 的新信息。

再验证 $M$ 是鞅。适应性：$M_n=X_n-A_n$，其中 $X_n$ 为 $\mathcal F_n$-可测，$A_n$ 为 $\mathcal F_{n-1}$-可测从而 $\mathcal F_n$-可测。可积性：$|M_n|\le|X_n|+|A_n|$，两者均属 $L^1$。鞅性：
$$
\mathbb E[M_{n+1}\mid\mathcal F_n]=\mathbb E[X_{n+1}\mid\mathcal F_n]-\mathbb E[A_{n+1}\mid\mathcal F_n].
$$
由 $A_{n+1}=A_n+\bigl(\mathbb E[X_{n+1}\mid\mathcal F_n]-X_n\bigr)$ 且右端整体 $\mathcal F_n$-可测（$A_n$ 为 $\mathcal F_{n-1}$-可测，$\mathbb E[X_{n+1}\mid\mathcal F_n]$ 与 $X_n$ 均 $\mathcal F_n$-可测），故 $A_{n+1}$ 本身 $\mathcal F_n$-可测，从而 $\mathbb E[A_{n+1}\mid\mathcal F_n]=A_{n+1}$。代入得
$$
\mathbb E[M_{n+1}\mid\mathcal F_n]=\mathbb E[X_{n+1}\mid\mathcal F_n]-A_{n+1}=\mathbb E[X_{n+1}\mid\mathcal F_n]-A_n-\mathbb E[X_{n+1}\mid\mathcal F_n]+X_n=X_n-A_n=M_n.
$$
鞅性得证。分解式 (25.6) 由 $M_n$ 的定义直接成立。

若 $X$ 是下鞅，则 (25.7) 中每一项 $\mathbb E[X_k\mid\mathcal F_{k-1}]-X_{k-1}\ge 0$ 几乎必然，故 $A_n\ge 0$ 且 $A_{n+1}-A_n=\mathbb E[X_{n+1}\mid\mathcal F_n]-X_n\ge 0$ 几乎必然，即 $A$ 单调不减。上鞅情形每项 $\le 0$，$A$ 单调不增。

**证明**（唯一性）

设另有 $X_n=M_n'+A_n'$，$M'$ 为鞅、$A'$ 可预测、$A_0'=0$。相减得 $M_n-M_n'=A_n'-A_n$，记 $Z_n=M_n-M_n'=A_n'-A_n$。一方面 $Z$ 是两个鞅之差，故为鞅（可积性与适应性由 $L^1$ 对减法封闭得到）；另一方面 $Z_n=A_n'-A_n$ 是两个 $\mathcal F_{n-1}$-可测函数之差，故 $Z_n$ 为 $\mathcal F_{n-1}$-可测。由鞅性，
$$
Z_n=\mathbb E[Z_{n+1}\mid\mathcal F_n]=Z_n,
$$
这本身是恒等式；关键的一步是对 $n\ge 1$ 用可测性反向推：
$$
Z_n=\mathbb E[Z_n\mid\mathcal F_{n-1}]=Z_{n-1},
$$
第一个等号因为 $Z_n$ 是 $\mathcal F_{n-1}$-可测的可积随机变量，其关于 $\mathcal F_{n-1}$ 的条件期望等于自身，同时由 $Z$ 为鞅又有 $\mathbb E[Z_n\mid\mathcal F_{n-1}]=Z_{n-1}$，两式合并即得 $Z_n=Z_{n-1}$ 几乎必然。归纳得 $Z_n=Z_0=A_0'-A_0=0$ 几乎必然。故 $M_n=M_n'$、$A_n=A_n'$ 对每个 $n$ 几乎必然成立，唯一性得证。

□

**注记**　可预测性的意义在于「决策必须基于已有信息」。在金融中，$A_n$ 对应可预期的趋势（例如利息的累积、股息的入账），$M_n$ 对应不可预测的价格波动。一个交易策略 $\{H_n\}$（时刻 $n-1$ 决定持有 $H_n$ 份资产）必须是可预测的，其收益过程 $\sum_{k=1}^n H_k(X_k-X_{k-1})$ 才是良定义的随机积分；这一积分对鞅保持鞅性、对下鞅保持下鞅性（当 $H\ge 0$），这是第 26 章的核心命题。Doob 分解还告诉我们：**任何过程都可以被「去趋势」化为鞅**，因此针对鞅建立的全部不等式与收敛定理，通过加上趋势项 $A_n$ 就能推广到一般适应过程。
**定理 25.5（Doob 极大不等式）**

设 $X=\{X_n\}_{n\ge 0}$ 为非负下鞅，$\lambda>0$，$n\ge 0$。记 $X_n^*=\max_{0\le k\le n}X_k$。则
$$
\mathbb P\bigl(X_n^*\ge\lambda\bigr)\le\frac{1}{\lambda}\,\mathbb E\bigl[X_n\,\mathbf 1_{\{X_n^*\ge\lambda\}}\bigr]\le\frac{1}{\lambda}\,\mathbb E X_n.
\tag{25.8}
$$
相应地，对非负上鞅有反向形式：若 $Y$ 为非负上鞅，则 $\lambda\,\mathbb P\bigl(\min_{k\le n}Y_k\le\lambda\bigr)\le\mathbb E Y_0$。

**证明**

定义**首次穿越时刻**
$$
\tau=\min\{k\ge 0:X_k\ge\lambda\}\wedge n,
$$
其中 $\min\varnothing=+\infty$，故当路径始终不超过 $\lambda$ 时 $\tau=n$。首先验证 $\tau$ 是停时：对每个 $m\le n$，
$$
\{\min\{k:X_k\ge\lambda\}\le m\}=\bigcup_{k=0}^{m}\{X_k\ge\lambda\}\in\mathcal F_m,
$$
而 $\{\tau\le m\}$ 在 $m<n$ 时等于上式，在 $m\ge n$ 时为全集 $\Omega\in\mathcal F_m$，故 $\tau$ 是**有界**停时（$\tau\le n$）。由命题 25.9（在 25.3 节陈述并证明）可知停止过程 $\{X_{\tau\wedge k}\}$ 仍是下鞅，特别地 $\mathbb E X_\tau\le\mathbb E X_n$。为了不依赖后文，此处直接给出该不等式的独立证明：因为 $\tau\le n$ 有界且 $X$ 为非负下鞅，可写
$$
X_n-X_\tau=\sum_{k=\tau}^{n-1}(X_{k+1}-X_k)=\sum_{k=0}^{n-1}(X_{k+1}-X_k)\,\mathbf 1_{\{\tau\le k\}},
$$
其中 $\{\tau\le k\}\in\mathcal F_k$。取期望并对每项用「$\mathcal F_k$-可测的指示函数可提出」与下鞅性质：
$$
\mathbb E\bigl[(X_{k+1}-X_k)\mathbf 1_{\{\tau\le k\}}\bigr]=\mathbb E\bigl[\mathbf 1_{\{\tau\le k\}}\,\mathbb E[X_{k+1}-X_k\mid\mathcal F_k]\bigr]\ge 0,
$$
故 $\mathbb E X_n\ge\mathbb E X_\tau$。

其次，把事件 $\{X_n^*\ge\lambda\}$ 与 $\tau$ 联系起来。若 $X_n^*(\omega)\ge\lambda$，则存在 $k\le n$ 使 $X_k(\omega)\ge\lambda$，故 $\min\{k:X_k\ge\lambda\}\le n$，于是 $\tau(\omega)<n$ 或 $\tau(\omega)=n$ 且 $X_n(\omega)\ge\lambda$；无论哪种，都有 $X_{\tau(\omega)}(\omega)\ge\lambda$（因为 $\tau$ 取到首个穿越时刻时 $X_\tau\ge\lambda$，而当 $\tau=n$ 且路径未曾穿越时 $X_n<\lambda$，这与 $X_n^*\ge\lambda$ 及 $\tau=n$ 的组合只可能发生在 $X_n\ge\lambda$ 时）。反之若 $X_\tau\ge\lambda$，则由 $\tau\le n$ 及最大值定义，$X_n^*\ge X_\tau\ge\lambda$。因此
$$
\{X_n^*\ge\lambda\}=\{X_\tau\ge\lambda\}.
$$
于是
$$
\lambda\,\mathbb P\bigl(X_n^*\ge\lambda\bigr)=\lambda\,\mathbb P(X_\tau\ge\lambda)=\mathbb E\bigl[\lambda\,\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr]\le\mathbb E\bigl[X_\tau\,\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr]\le\mathbb E X_\tau\le\mathbb E X_n,
$$
其中第三个不等号用到在 $\{X_\tau\ge\lambda\}$ 上有 $\lambda\le X_\tau$ 且示性函数非负，第四个用到 $X_\tau\ge 0$，第五个即上段所得。这给出 (25.8) 的第一个与第三个量之间的关系。

最后证明中间项的精细界。注意
$$
\mathbb E\bigl[X_n\mathbf 1_{\{X_n^*\ge\lambda\}}\bigr]=\mathbb E\bigl[X_n\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr],
$$
而 $\{X_\tau\ge\lambda\}=\{\tau\le n\}\cap\{X_\tau\ge\lambda\}$ 且 $\tau\le n$。由 $X$ 为下鞅与 $\{X_\tau\ge\lambda\}$ 的可测性（$\{X_\tau\ge\lambda\}=\{X_n^*\ge\lambda\}$，而 $X_n^*$ 是有限个 $\mathcal F_n$-可测函数的最大值，故 $\mathcal F_n$-可测），
$$
\mathbb E\bigl[X_\tau\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr]\le\mathbb E\bigl[\mathbb E[X_n\mid\mathcal F_\tau]\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr]=\mathbb E\bigl[X_n\mathbf 1_{\{X_\tau\ge\lambda\}}\bigr],
$$
此处用到「下鞅在停时处的条件期望被末端控制」：对 $\tau\le n$，$\mathbb E[X_n\mid\mathcal F_\tau]\ge X_\tau$ 几乎必然（该事实的证明与命题 25.9 相同，只需把固定时刻换成 $\mathcal F_\tau$，其中 $\mathcal F_\tau=\{B\in\mathcal F:B\cap\{\tau\le m\}\in\mathcal F_m,\ \forall m\}$）。结合 $\lambda\mathbb P(X_\tau\ge\lambda)\le\mathbb E[X_\tau\mathbf 1_{\{X_\tau\ge\lambda\}}]$，得
$$
\lambda\,\mathbb P\bigl(X_n^*\ge\lambda\bigr)\le\mathbb E\bigl[X_n\mathbf 1_{\{X_n^*\ge\lambda\}}\bigr]\le\mathbb E X_n,
$$
即 (25.8) 全部三项。

对非负上鞅 $Y$ 的反向形式：令 $\sigma=\min\{k:Y_k\le\lambda\}\wedge n$，同理 $\sigma$ 为有界停时，且 $\{\min_{k\le n}Y_k\le\lambda\}=\{Y_\sigma\le\lambda\}$。由上鞅性质 $\mathbb E Y_\sigma\le\mathbb E Y_0$（证明与上面对称，把 $\ge$ 换成 $\le$），故
$$
\lambda\,\mathbb P\bigl(Y_\sigma\le\lambda\bigr)=\mathbb E\bigl[\lambda\mathbf 1_{\{Y_\sigma\le\lambda\}}\bigr]\le\mathbb E\bigl[Y_\sigma\mathbf 1_{\{Y_\sigma\le\lambda\}}\bigr]\le\mathbb E Y_\sigma\le\mathbb E Y_0.
$$

□

**注记**　极大不等式 (25.8) 与 Markov 不等式 $\mathbb P(Z\ge\lambda)\le\mathbb E Z/\lambda$（$Z\ge 0$）形式相同，但左端换成了**路径最大值**的概率，右端仍只用末端 $X_n$ 的期望。这正是鞅论的威力所在：整个路径的极端行为被末端一个时刻的信息控制。若对一般过程套用 Markov 不等式，只能得到 $\mathbb P(X_n\ge\lambda)\le\mathbb E X_n/\lambda$，它完全不含最大值信息；例 25.2 将定量展示两者的差距。
**推论 25.6（$L^p$ 极大不等式）**

设 $1<p<\infty$，$M=\{M_n\}$ 为鞅或为非负下鞅，且 $M_n\in L^p$。记 $M_n^*=\max_{0\le k\le n}|M_k|$。则 $M_n^*\in L^p$，且
$$
\|M_n^*\|_p\le\frac{p}{p-1}\,\|M_n\|_p,
\tag{25.9}
$$
等价地 $\mathbb E\bigl[(M_n^*)^p\bigr]\le\bigl(\tfrac{p}{p-1}\bigr)^p\mathbb E|M_n|^p$。

**证明**

第一步，把问题化为非负下鞅。若 $M$ 是鞅，则 $|M|$ 是非负下鞅：由命题 25.2 第 2 条，$\varphi(x)=|x|$ 凸且 $\varphi(M_k)$ 可积（$|M_k|$ 的可积性由 $M_k\in L^1$ 得到，此处 $L^p\subset L^1$，因为概率空间有限测度下 $\mathbb E|M_k|\le(\mathbb E|M_k|^p)^{1/p}$ 由 Hölder 给出），故 $\mathbb E[|M_{k+1}|\mid\mathcal F_k]\ge|\mathbb E[M_{k+1}\mid\mathcal F_k]|=|M_k|$。若 $M$ 本身是非负下鞅，取 $\varphi$ 为恒等映射即可。总之 $Y_k:=|M_k|$ 是非负下鞅，且 $\max_{k\le n}|M_k|=\max_{k\le n}Y_k=Y_n^*$，于是可对 $Y$ 应用定理 25.5。

第二步，截断以保证所有积分有限。对 $K>0$ 令 $Z=Y_n^*\wedge K$，则 $0\le Z\le K$，故 $\mathbb E Z^p<\infty$，一切交换积分次序的操作均合法。由层饼表示（layer-cake representation，其本身是 Tonelli 定理的直接推论：对非负随机变量 $W$ 有 $\mathbb E W^p=\int_0^\infty p\lambda^{p-1}\mathbb P(W\ge\lambda)\,d\lambda$，因为 $W^p=\int_0^\infty p\lambda^{p-1}\mathbf 1_{\{W\ge\lambda\}}\,d\lambda$ 逐点成立），
$$
\mathbb E Z^p=\int_0^{\infty}p\lambda^{p-1}\mathbb P(Z\ge\lambda)\,d\lambda=\int_0^{K}p\lambda^{p-1}\mathbb P(Y_n^*\ge\lambda)\,d\lambda,
$$
其中第二个等号用到 $\lambda<K$ 时 $\{Z\ge\lambda\}=\{Y_n^*\ge\lambda\}$（因 $Z=Y_n^*\wedge K\ge\lambda\iff Y_n^*\ge\lambda$，当 $\lambda<K$），而 $\lambda\ge K$ 时被积项为零。

第三步，套用弱型界 (25.8) 并交换积分次序。由定理 25.5，$\lambda\,\mathbb P(Y_n^*\ge\lambda)\le\mathbb E[Y_n\mathbf 1_{\{Y_n^*\ge\lambda\}}]$，代入得
$$
\mathbb E Z^p\le\int_0^{K}p\lambda^{p-2}\,\mathbb E\bigl[Y_n\mathbf 1_{\{Y_n^*\ge\lambda\}}\bigr]\,d\lambda.
$$
被积函数非负，故由 Tonelli 定理可交换 $\lambda$-积分与期望：
$$
\mathbb E Z^p\le p\,\mathbb E\left[Y_n\int_0^{K}\lambda^{p-2}\mathbf 1_{\{Y_n^*\ge\lambda\}}\,d\lambda\right]=p\,\mathbb E\left[Y_n\int_0^{K\wedge Y_n^*}\lambda^{p-2}\,d\lambda\right].
$$
内层积分（$p>1$ 使 $\lambda^{p-2}$ 在 $0$ 处可积，因为 $p-2>-1$）等于 $\frac{(K\wedge Y_n^*)^{p-1}}{p-1}=\frac{Z^{p-1}}{p-1}$，故
$$
\mathbb E Z^p\le\frac{p}{p-1}\,\mathbb E\bigl[Y_n Z^{p-1}\bigr].
$$

第四步，Hölder 与消元。设 $q=\frac{p}{p-1}$（即 $\frac1p+\frac1q=1$），则 $(p-1)q=p$。由 Hölder 不等式，
$$
\mathbb E\bigl[Y_n Z^{p-1}\bigr]\le\|Y_n\|_p\,\|Z^{p-1}\|_q=\|M_n\|_p\,\bigl(\mathbb E Z^{(p-1)q}\bigr)^{1/q}=\|M_n\|_p\,\bigl(\mathbb E Z^p\bigr)^{1/q}.
$$
代入第三步：$\mathbb E Z^p\le\frac{p}{p-1}\|M_n\|_p(\mathbb E Z^p)^{1/q}$。若 $\mathbb E Z^p>0$，两端除以 $(\mathbb E Z^p)^{1/q}$（合法，因为 $Z$ 有界使该量有限且非零），利用 $1-\frac1q=\frac1p$ 得
$$
\bigl(\mathbb E Z^p\bigr)^{1/p}\le\frac{p}{p-1}\|M_n\|_p;
$$
若 $\mathbb E Z^p=0$，该不等式平凡成立。注意右端与 $K$ 无关。

第五步，令 $K\to\infty$。$Z=Y_n^*\wedge K$ 关于 $K$ 单调不减地趋于 $Y_n^*$，故 $Z^p$ 单调不减趋于 $(Y_n^*)^p$，由单调收敛定理，
$$
\|Y_n^*\|_p=\lim_{K\to\infty}\|Z\|_p\le\frac{p}{p-1}\|M_n\|_p.
$$
右端有限，故 $Y_n^*=\max_{k\le n}|M_k|\in L^p$，(25.9) 得证。

□

**注记**　常数 $\frac{p}{p-1}$ 是**最优**的（Doob），且当 $p\to 1^+$ 时趋于 $\infty$，这不是证明技术的缺陷而是事实本身：$p=1$ 时强型不等式不成立。反例见推论 25.7 的说明。另一个重要观察是 (25.9) 右端只含**末端** $M_n$ 的范数，而不是 $\max_k\|M_k\|_p$；对鞅而言两者可比（因为 $\|M_k\|_p\le\|M_n\|_p$ 当 $k\le n$，这是 $|M|^p$ 为下鞅的推论），但对一般下鞅则未必。

**推论 25.7（$p=1$ 的弱型界与对数可积条件下的强型界）**

设 $M=\{M_n\}$ 为鞅或非负下鞅，$Y_n=\max_{0\le k\le n}|M_k|$。则：

1. （弱型 $(1,1)$ 不等式）对一切 $\lambda>0$，
$$
\lambda\,\mathbb P(Y_n\ge\lambda)\le\mathbb E\bigl[|M_n|\mathbf 1_{\{Y_n\ge\lambda\}}\bigr]\le\mathbb E|M_n|.
\tag{25.10}
$$

2. （强型界的失效）不存在常数 $C$ 使 $\mathbb E Y_n\le C\,\mathbb E|M_n|$ 对所有 $L^1$ 鞅成立。

3. （$L\log L$ 条件下的强型界）若 $\mathbb E\bigl[|M_n|\log^+|M_n|\bigr]<\infty$，其中 $\log^+x=\max(\log x,0)$，则 $\mathbb E Y_n<\infty$，且
$$
\mathbb E Y_n\le\frac{\mathrm e}{\mathrm e-1}\Bigl(1+\mathbb E\bigl[|M_n|\log^+|M_n|\bigr]\Bigr).
$$
**证明**

第 1 条：由推论 25.6 的第一步，$Y_k=|M_k|$ 构成非负下鞅，且 $\max_{0\le k\le n}Y_k=Y_n$。对非负下鞅 $\{Y_k\}$ 应用定理 25.5 即得
$$
\mathbb P(Y_n\ge\lambda)\le\frac{1}{\lambda}\mathbb E\bigl[Y_n\mathbf 1_{\{Y_n\ge\lambda\}}\bigr],
$$
两端乘 $\lambda$ 即为 (25.10) 的第一个不等号；第二个不等号由 $Y_n\mathbf 1_{\{Y_n\ge\lambda\}}\le Y_n=|M_n|$ 与期望的单调性得到。

第 2 条：构造「双倍下注」鞅。设 $\eta_1,\eta_2,\dots$ 独立同分布，$\mathbb P(\eta_k=1)=\mathbb P(\eta_k=0)=\tfrac12$，$\mathcal F_n=\sigma(\eta_1,\dots,\eta_n)$，$\tau=\min\{k\ge 1:\eta_k=0\}$，定义
$$
M_n=2^n\,\mathbf 1_{\{\tau>n\}},\qquad n\ge 0.
$$
验证鞅性：$\mathbb E[M_{n+1}\mid\mathcal F_n]=2^{n+1}\mathbb E[\mathbf 1_{\{\tau>n+1\}}\mid\mathcal F_n]$。若 $\tau\le n$（$\mathcal F_n$-可测事件），则 $\mathbf 1_{\{\tau>n+1\}}=0$ 且 $M_n=0$，两端均为 $0$；若 $\tau>n$，则 $\{\tau>n+1\}=\{\tau>n\}\cap\{\eta_{n+1}=1\}$，故 $\mathbb E[\mathbf 1_{\{\tau>n+1\}}\mid\mathcal F_n]=\mathbf 1_{\{\tau>n\}}\cdot\tfrac12$，于是 $\mathbb E[M_{n+1}\mid\mathcal F_n]=2^{n+1}\cdot\tfrac12\mathbf 1_{\{\tau>n\}}=M_n$。可积性显然（$M_n$ 只取 $0$ 与 $2^n$ 两值）。且 $\mathbb E M_n=2^n\mathbb P(\tau>n)=2^n\cdot 2^{-n}=1$ 对一切 $n$ 成立。

另一方面，极大值 $Y_n=\max_{0\le k\le n}M_k$ 满足：在 $\{\tau>n\}$ 上 $Y_n=2^n$；在 $\{\tau=j\}$（$1\le j\le n$）上 $M_k=2^k$（$k<j$）而 $M_k=0$（$k\ge j$），故 $Y_n=2^{j-1}$。由 $\mathbb P(\tau>n)=2^{-n}$、$\mathbb P(\tau=j)=2^{-j}$，
$$
\mathbb E Y_n=2^n\cdot 2^{-n}+\sum_{j=1}^{n}2^{j-1}\cdot 2^{-j}=1+\frac{n}{2}\xrightarrow[n\to\infty]{}\infty,
$$
而 $\mathbb E|M_n|=1$ 恒定。故对任何常数 $C$，取 $n>2(C-1)$ 即得 $\mathbb E Y_n>C\,\mathbb E|M_n|$，强型 $(1,1)$ 不等式不成立。

第 3 条：设 $A_K=\mathbb E[Y_n\wedge K]$，$K>1$。由层饼表示与 (25.10)，
$$
A_K=\int_0^{K}\mathbb P(Y_n\ge\lambda)\,d\lambda\le\int_0^{1}1\,d\lambda+\int_1^{K}\frac{1}{\lambda}\,\mathbb E\bigl[|M_n|\mathbf 1_{\{Y_n\ge\lambda\}}\bigr]\,d\lambda,
$$
其中第一段用了 $\mathbb P\le 1$。第二段的被积函数非负，由 Tonelli 定理交换次序：
$$
\int_1^{K}\frac{1}{\lambda}\mathbb E\bigl[|M_n|\mathbf 1_{\{Y_n\ge\lambda\}}\bigr]d\lambda=\mathbb E\left[|M_n|\int_1^{K}\lambda^{-1}\mathbf 1_{\{Y_n\ge\lambda\}}\,d\lambda\right]=\mathbb E\bigl[|M_n|\log^+(Y_n\wedge K)\bigr],
$$
因为内层积分恰为 $\int_1^{K\wedge Y_n}\lambda^{-1}d\lambda=\log^+(K\wedge Y_n)$。于是
$$
A_K\le 1+\mathbb E\bigl[|M_n|\log^+(Y_n\wedge K)\bigr].
$$
现在用初等不等式：对 $a,b\ge 0$，$a\log^+ b\le a\log^+ a+\dfrac{b}{\mathrm e}$。其证明：当 $b\le 1$ 时左端为 $0$，右端非负，成立；当 $b>1$ 时，把 $f(a)=a\log b-a\log a$（约定 $0\cdot\log 0=0$）在 $a>0$ 上求极值，$f'(a)=\log b-\log a-1$，唯一驻点 $a=b/\mathrm e$，且 $f''(a)=-1/a<0$ 故为最大值，最大值为 $f(b/\mathrm e)=b/\mathrm e$。因此 $a\log b\le a\log a+b/\mathrm e\le a\log^+ a+b/\mathrm e$。取 $a=|M_n|$、$b=Y_n\wedge K$ 并取期望，
$$
A_K\le 1+\mathbb E\bigl[|M_n|\log^+|M_n|\bigr]+\frac{1}{\mathrm e}A_K,
$$
移项得 $(1-\mathrm e^{-1})A_K\le 1+\mathbb E[|M_n|\log^+|M_n|]$，即
$$
A_K\le\frac{\mathrm e}{\mathrm e-1}\Bigl(1+\mathbb E\bigl[|M_n|\log^+|M_n|\bigr]\Bigr).
$$
右端与 $K$ 无关。令 $K\to\infty$，$Y_n\wedge K$ 单调增至 $Y_n$，由单调收敛定理 $\mathbb E Y_n=\lim_K A_K$，故 $\mathbb E Y_n<\infty$ 且第 3 条的不等式成立。

□

**注记**　第 3 条说明 $L\log L$ 是 $p=1$ 处强型不等式的**恰当替代条件**：条件略强于 $L^1$、略弱于 $L^p$（任何 $p>1$），它恰好补偿了 $\frac{p}{p-1}$ 在 $p\to 1^+$ 时的发散。在鞅收敛定理（后段 25.4 节）中，$L\log L$ 条件同样是保证 $L^1$ 收敛的最优条件之一。
**例 25.2**

设 $S_n$ 为对称简单随机游走，$\mathcal F_n=\sigma(\xi_1,\dots,\xi_n)$。对给定的 $\lambda>0$，比较以下三种对 $\mathbb P\bigl(\max_{1\le k\le n}|S_k|\ge\lambda\bigr)$ 的估计：逐时刻 Chebyshev 加并集界、Doob 极大不等式、以及基于指数鞅的 Doob 极大不等式。取 $n=100$、$\lambda=30=3\sqrt{n}$ 作数值比较。

**解**

**（一）Chebyshev 加并集界。** 由 $\mathbb E S_k=0$、$\operatorname{Var}(S_k)=k$（增量为 $\pm 1$ 的独立随机变量，方差为 1，独立性使方差可加），Chebyshev 不等式给出对每个固定的 $k$，
$$
\mathbb P(|S_k|\ge\lambda)\le\frac{\operatorname{Var}(S_k)}{\lambda^2}=\frac{k}{\lambda^2}.
$$
最大值事件等于各时刻事件的并：$\{\max_{k\le n}|S_k|\ge\lambda\}=\bigcup_{k=1}^{n}\{|S_k|\ge\lambda\}$，故由次可加性，
$$
\mathbb P\Bigl(\max_{1\le k\le n}|S_k|\ge\lambda\Bigr)\le\sum_{k=1}^{n}\frac{k}{\lambda^2}=\frac{n(n+1)}{2\lambda^2}.
$$
代入 $n=100,\lambda=30$：$\frac{100\cdot 101}{2\cdot 900}=\frac{10100}{1800}=5.611$。这是一个**平凡**的上界（大于 1），完全没有信息量。原因在于并集界对 $n$ 个高度相关的事件做了最坏情形的相加，而随机游走的各时刻取值强相关，重复计算极其严重。

**（二）Doob 极大不等式（二次形式）。** 关键观察：$\{S_k^2\}$ 是**非负下鞅**。事实上由命题 25.2 第 2 条，$\varphi(x)=x^2$ 凸且 $\varphi(S_k)=S_k^2$ 可积，故 $S^2$ 为下鞅；直接验证亦可：$\mathbb E[S_{k+1}^2\mid\mathcal F_k]=S_k^2+1\ge S_k^2$（见例 25.1 第三步）。又因为 $|S_k|$ 与 $S_k^2$ 的大小关系单调，事件 $\{\max_{k\le n}|S_k|\ge\lambda\}$ 恰等于 $\{\max_{k\le n}S_k^2\ge\lambda^2\}$。对非负下鞅 $\{S_k^2\}$ 应用定理 25.5，取 $\lambda^2$ 为阈值：
$$
\mathbb P\Bigl(\max_{1\le k\le n}|S_k|\ge\lambda\Bigr)=\mathbb P\Bigl(\max_{1\le k\le n}S_k^2\ge\lambda^2\Bigr)\le\frac{1}{\lambda^2}\,\mathbb E S_n^2=\frac{n}{\lambda^2}.
$$
代入 $n=100,\lambda=30$：$\frac{100}{900}=0.1111$。

这里出现了值得强调的对比：Doob 界的数值与「只对末端时刻 $n$ 用 Chebyshev」所得的 $\mathbb P(|S_n|\ge\lambda)\le n/\lambda^2$ **完全相同**，但它控制的是整条路径的最大值，而不是单个时刻。换言之，Doob 极大不等式以零额外代价把单时刻界升级为路径界，而并集界为此付出了 $\frac{n+1}{2}$ 倍的代价（本例中是 50.5 倍）。这一差距在 $n$ 大时是本质性的：并集界随 $n^2$ 增长，Doob 界随 $n$ 线性增长。

**（三）指数鞅给出的界。** 用 (25.4) 中的指数鞅，对对称步长 $\varphi(\theta)=\cosh\theta$，故 $M_k=\mathrm e^{\theta S_k}/(\cosh\theta)^k$ 是鞅，且为非负，从而是下鞅（也可由命题 25.2 第 2 条直接得到）。对非负下鞅 $\{M_k\}$ 应用定理 25.5，阈值为 $\mathrm e^{\theta\lambda}/(\cosh\theta)^n$：注意 $\max_{k\le n}S_k\ge\lambda$ 并不直接等于 $M$ 的穿越事件，因为 $(\cosh\theta)^{-k}$ 随 $k$ 变化。标准做法是对固定 $\theta$ 用
$$
\Bigl\{\max_{1\le k\le n}S_k\ge\lambda\Bigr\}=\bigcup_{k=1}^{n}\Bigl\{S_k\ge\lambda,\ \max_{1\le j<k}S_j<\lambda\Bigr\},
$$
并在每个 $k$ 上用 $\mathrm e^{\theta S_k}=(\cosh\theta)^k M_k$。更简洁的路径是：对下鞅 $\{\mathrm e^{\theta S_k}\}$（由命题 25.2 第 2 条，$\varphi(x)=\mathrm e^{\theta x}$ 凸递增，故 $\mathrm e^{\theta S}$ 为下鞅）应用定理 25.5 的弱型版本：
$$
\mathbb P\Bigl(\max_{1\le k\le n}S_k\ge\lambda\Bigr)=\mathbb P\Bigl(\max_{1\le k\le n}\mathrm e^{\theta S_k}\ge\mathrm e^{\theta\lambda}\Bigr)\le\mathrm e^{-\theta\lambda}\,\mathbb E\,\mathrm e^{\theta S_n}=\mathrm e^{-\theta\lambda}(\cosh\theta)^n,
$$
其中第一个等号由 $\theta>0$ 时 $x\mapsto\mathrm e^{\theta x}$ 严格递增，第二个不等号是 (25.8) 的第三段。这一推导对**每个** $\theta>0$ 成立，故可取最优 $\theta$。令 $g(\theta)=-\theta\lambda+n\log\cosh\theta$，$g'(\theta)=-\lambda+n\tanh\theta$，驻点满足 $\tanh\theta=\lambda/n$（要求 $\lambda<n$），且 $g''(\theta)=n\,\operatorname{sech}^2\theta>0$ 故为最小值。

代入 $n=100,\lambda=30$：$\tanh\theta=0.3$，$\theta=\operatorname{artanh}(0.3)=\tfrac12\log\frac{1.3}{0.7}=0.30952$；$\cosh\theta=(1-0.09)^{-1/2}=1.048285$，$\log\cosh\theta=0.047141$。于是
$$
g(\theta)=-0.30952\times 30+100\times 0.047141=-9.2856+4.7141=-4.5715,
$$
界为 $\mathrm e^{-4.5715}=0.01034$。

**（四）数值比较与真值。** 三种界分别为 $5.611$、$0.1111$、$0.01034$。真值可由反射原理精确算出：$\mathbb P(\max_{k\le n}S_k\ge\lambda)\le 2\,\mathbb P(S_n\ge\lambda)$，而 $S_{100}/10$ 近似标准正态，$\mathbb P(S_{100}\ge 30)\approx 1-\Phi(3)=0.00135$，故真值约为 $0.0027$ 量级。可见指数鞅界与真值同阶（差约 4 倍），二次 Doob 界差约 40 倍，而并集界完全失效。

**注记**　本例展示了鞅方法的层次：把过程通过凸函数变换成下鞅（命题 25.2），再套用统一的极大不等式（定理 25.5），得到的界的质量取决于所选取的凸变换。变换越「陡」（指数优于二次优于绝对值），大偏离事件的界越紧。第 26 章将把这一思想推向连续时间，得到 Brown 运动的指数型大偏离估计与 Freidlin–Wentzell 理论的雏形；量化应用中的风险度量（VaR 的鞅上界、路径依赖期权的价格界）都建立在同一模式之上。
## 25.3 可选停时定理：一致可积与受控形式

命题 25.2 第 1 条说鞅的期望恒定：$\mathbb E M_n=\mathbb E M_0$ 对每个**确定的**时刻 $n$ 成立。自然的推广是：把固定时刻换成停时 $\tau$，是否仍有 $\mathbb E M_\tau=\mathbb E M_0$？这就是**可选停时定理**（optional stopping / optional sampling theorem）的内容。答案是「有条件的是」：条件本质上都在保证 $\tau$ 不会让赌徒等到一个系统性有利的时刻才停手。直观地说，鞅的公平性是「逐条件」的，而停时允许观察者根据已实现的信息选择停止时机；若停止时刻无界，观察者可能通过「等到翻本为止」的策略把公平博弈变成必然盈利，例 25.3 与本节末尾的反例将展示这种失效。

在陈述定理前需要两个概念。第一，**停时处的 σ-代数**：对停时 $\tau$，定义
$$
\mathcal F_\tau=\bigl\{B\in\mathcal F:\ B\cap\{\tau\le n\}\in\mathcal F_n\ \text{对一切}\ n\ge 0\bigr\}.
$$
$\mathcal F_\tau$ 表示「到停止时刻为止所知道的信息」。可以验证 $\mathcal F_\tau$ 是 σ-代数（对补与可数并封闭，逐项用 $\mathcal F_n$ 的相应性质），且当 $\tau\equiv n$ 为常值时 $\mathcal F_\tau=\mathcal F_n$；若 $\tau\le\sigma$ 则 $\mathcal F_\tau\subset\mathcal F_\sigma$。第二，**停止过程**（stopped process）：对过程 $X$ 与停时 $\tau$，定义 $X^\tau_n=X_{\tau\wedge n}$。它在时刻 $n$ 的值是「若已在 $n$ 之前停止则取停止时的值，否则取当前值」，这正是执行了一个「到 $\tau$ 为止就平仓」策略后的财富过程。

**定理 25.8（可选停时定理）**

设 $M=\{M_n\}_{n\ge 0}$ 为关于 $\{\mathcal F_n\}$ 的鞅，$\tau$ 为停时。

1. （有界停时版本）若存在非负整数 $N$ 使 $\tau\le N$ 几乎必然，则
$$
\mathbb E M_\tau=\mathbb E M_0=\mathbb E M_N,
\tag{25.11}
$$
且对任意满足 $\tau\le\sigma\le N$ 的停时对 $(\tau,\sigma)$ 有 $\mathbb E[M_\sigma\mid\mathcal F_\tau]=M_\tau$ 几乎必然，特别地 $\mathbb E M_\tau=\mathbb E M_\sigma$。更一般地，若 $M$ 是下鞅，则 $\mathbb E M_\tau\le\mathbb E M_\sigma\le\mathbb E M_N$。

2. （一致可积版本）若 $M$ 是**一致可积**鞅（即 $\{M_n:n\ge 0\}$ 为 $L^1$ 中一致可积族），则 $M_\infty=\lim_{n\to\infty}M_n$ 几乎必然且在 $L^1$ 中存在，且对**任意**停时 $\tau$（允许 $\tau=+\infty$，此时约定 $M_\tau=M_\infty$）有
$$
\mathbb E M_\tau=\mathbb E M_0=\mathbb E M_\infty.
$$

3. （受控版本）若 $\tau<\infty$ 几乎必然，$M_\tau\in L^1$，且过程 $\{M_{\tau\wedge n}\}_{n\ge 0}$ 一致可积（或存在 $Y\in L^1$ 使 $|M_{\tau\wedge n}|\le Y$ 对一切 $n$ 几乎必然成立），则 $\mathbb E M_\tau=\mathbb E M_0$。
**证明**

先证有界停时版本。由 $\tau\le N$，事件 $\{\tau=k\}$ 属于 $\mathcal F_k$，故鞅性给出
$$
\mathbb E M_\tau=\sum_{k=0}^{N}\mathbb E[M_k\mathbf 1_{\{\tau=k\}}]=\sum_{k=0}^{N}\mathbb E[M_N\mathbf 1_{\{\tau=k\}}]=\mathbb E M_N=\mathbb E M_0.
$$
若 $\tau\le\sigma\le N$，取 $A\in\mathcal F_\tau$ 并令 $B_k=A\cap\{\tau=k\}$。由 $B_k=(A\cap\{\tau\le k\})\setminus\{\tau\le k-1\}$ 可知 $B_k\in\mathcal F_k$。在 $B_k$ 上有 $\sigma\ge k$，于是按 $\sigma$ 取值分解并再次使用鞅性，得到
$$
\mathbb E[M_\sigma\mathbf 1_A]
=\sum_{k=0}^{N}\sum_{j=k}^{N}\mathbb E[M_j\mathbf 1_{B_k\cap\{\sigma=j\}}]
=\sum_{k=0}^{N}\mathbb E[M_k\mathbf 1_{B_k}]
=\mathbb E[M_\tau\mathbf 1_A].
\tag{25.12}
$$
这正是 $\mathbb E[M_\sigma\mid\mathcal F_\tau]=M_\tau$ 几乎必然成立的定义。若 $M$ 只是下鞅，上述每个条件期望等号改为相应的不等号，即得 $\mathbb E[M_\sigma\mathbf 1_A]\ge\mathbb E[M_\tau\mathbf 1_A]$，从而 $\mathbb E[M_\sigma\mid\mathcal F_\tau]\ge M_\tau$ 几乎必然成立；取 $A$ 为全空间并按 $\tau\equiv0$、$\sigma$、$N$ 排列，便得到期望不等式。

再证一致可积版本。一致可积族的 $L^1$ 范数一致有界，因此定理 25.14 给出几乎必然极限 $M_\infty$；一致可积与几乎必然收敛又共同给出 $L^1$ 收敛，这一等价关系将在命题 25.12 中完整证明。对固定的 $n$，由有界停时版本及 $M_n=\mathbb E[M_\infty\mid\mathcal F_n]$，有
$$
M_{\tau\wedge n}=\mathbb E[M_n\mid\mathcal F_{\tau\wedge n}]
=\mathbb E[M_\infty\mid\mathcal F_{\tau\wedge n}].
\tag{25.13}
$$
所以每个停止值都是同一个可积随机变量的条件期望。一般地，若 $X\in L^1$，则
$$
\mathbb E\!\left[|\mathbb E[X\mid\mathcal G]|\mathbf 1_{\{|\mathbb E[X\mid\mathcal G]|>K\}}\right]
\le \mathbb E\!\left[|X|\mathbf 1_{\{|\mathbb E[X\mid\mathcal G]|>K\}}\right].
$$
右侧事件的测度被 $\mathbb E|X|/K$ 控制，故由 $|X|$ 的积分绝对连续性，这些条件期望构成一致可积族。当 $\tau<\infty$ 时，$\tau\wedge n$ 最终等于 $\tau$；当 $\tau=\infty$ 时，$M_{\tau\wedge n}\to M_\infty$ 几乎必然。两种情形都有 $M_{\tau\wedge n}\to M_\tau$ 几乎必然，故也在 $L^1$ 中收敛，进而
$$
\mathbb E M_\tau=\lim_{n\to\infty}\mathbb E M_{\tau\wedge n}=\mathbb E M_0.
$$
受控版本的推理更直接：题设已经假设停止族一致可积，而 $\tau<\infty$ 几乎必然保证 $M_{\tau\wedge n}\to M_\tau$ 几乎必然，于是同样可在有界停时等式中取 $L^1$ 极限。若存在可积控制变量 $Y$，则
$$
\sup_n\mathbb E\!\left[|M_{\tau\wedge n}|\mathbf 1_{\{|M_{\tau\wedge n}|>K\}}\right]
\le \mathbb E[Y\mathbf 1_{\{Y>K\}}]\longrightarrow0,
$$
所以控制条件确实蕴含所用的一致可积性。三个版本至此全部得证。

□

**命题 25.9（停止过程仍为鞅）**

设 $M=\{M_n\}_{n\ge 0}$ 是关于滤过 $\{\mathcal F_n\}_{n\ge 0}$ 的鞅，$\tau$ 是取值于 $\{0,1,\ldots,\infty\}$ 的停时。令 $M^\tau_n=M_{\tau\wedge n}$，则停止过程 $M^\tau=\{M^\tau_n\}_{n\ge 0}$ 仍是关于同一滤过的鞅。

**证明**

先验证适应性与可积性。对固定的 $n$，有
$$
M^\tau_n=\sum_{k=0}^{n}M_k\mathbf 1_{\{\tau=k\}}+M_n\mathbf 1_{\{\tau>n\}}.
$$
由于 $\{\tau=k\}\in\mathcal F_k\subset\mathcal F_n$（$0\le k\le n$）且 $\{\tau>n\}\in\mathcal F_n$，上式右端每一项都是 $\mathcal F_n$ 可测随机变量。它又只是有限个可积随机变量的线性组合，所以 $M^\tau_n$ 可积且为 $\mathcal F_n$ 可测。

再验证鞅等式。在事件 $\{\tau\le n\}$ 上，$\tau\wedge(n+1)=\tau\wedge n$；在事件 $\{\tau>n\}$ 上，$\tau\wedge(n+1)=n+1$。因此
$$
M^\tau_{n+1}=M^\tau_n\mathbf 1_{\{\tau\le n\}}+M_{n+1}\mathbf 1_{\{\tau>n\}}.
$$
右端第一项是 $\mathcal F_n$ 可测的。对第二项使用 $\{\tau>n\}\in\mathcal F_n$ 以及 $M$ 的鞅性，得到

$$
\begin{aligned}
\mathbb E[M^\tau_{n+1}\mid\mathcal F_n]
&=M^\tau_n\mathbf 1_{\{\tau\le n\}}
 +\mathbb E[M_{n+1}\mid\mathcal F_n]\mathbf 1_{\{\tau>n\}}\\
&=M^\tau_n\mathbf 1_{\{\tau\le n\}}+M_n\mathbf 1_{\{\tau>n\}}
=M^\tau_n .
\end{aligned}
\tag{25.14}
$$
最后一个等号是因为在 $\{\tau>n\}$ 上有 $\tau\wedge n=n$。于是 $M^\tau$ 满足适应性、可积性和鞅等式，故仍为鞅。

□

**例 25.3**

考虑公平赌徒破产问题。设初始赌本为整数 $x$，赌场的总赌本为整数 $N-x$，其中 $0<x<N$。每局独立地以概率 $1/2$ 赢一元或以概率 $1/2$ 输一元，任一方赌本归零时停止。求赌徒最终破产的概率，以及博弈持续的平均局数。

**解**

令 $\xi_1,\xi_2,\ldots$ 独立同分布，且 $\mathbb P(\xi_i=1)=\mathbb P(\xi_i=-1)=1/2$。记
$$
S_n=x+\sum_{i=1}^{n}\xi_i,\qquad
\tau=\inf\{n\ge 0:S_n=0\ \text{或}\ S_n=N\}.
$$
则 $S_n$ 表示第 $n$ 局后的赌本，$\tau$ 是博弈结束时刻，$\{S_n\}$ 关于自然滤过是鞅。由于 $S_{n+1}$ 与 $S_n$ 相差 $\pm1$，停止前始终有 $1\le S_n\le N-1$，从而 $0\le S_{\tau\wedge n}\le N$。

先证明 $\tau<\infty$ 几乎必然。对每个 $m\ge1$，考虑第 $m$ 个长度为 $N$ 的区间，并令 $A_m$ 表示该区间内所有 $\xi_i$ 都等于 $1$ 的事件。若博弈在第 $(m-1)N$ 局后尚未结束，且 $A_m$ 发生，则随后连续赢钱必使赌本最迟在第 $mN$ 局达到 $N$，所以博弈必定结束。各 $A_m$ 相互独立，且 $\mathbb P(A_m)=2^{-N}$，故

$$
\mathbb P(\tau>mN)
\le \mathbb P\!\left(\bigcap_{j=1}^{m}A_j^c\right)
=(1-2^{-N})^m\longrightarrow0 .
$$
因而 $\tau<\infty$ 几乎必然，并且 $S_{\tau\wedge n}\to S_\tau$ 几乎必然。由命题 25.9，停止过程 $\{S_{\tau\wedge n}\}_{n\ge0}$ 是鞅，所以对每个固定的 $n$ 都有 $\mathbb E S_{\tau\wedge n}=x$。又因为停止过程取值于 $[0,N]$，有界收敛定理给出
$$
\mathbb E S_\tau=\lim_{n\to\infty}\mathbb E S_{\tau\wedge n}=x.
$$
设 $p=\mathbb P(S_\tau=N)$ 为赌徒最终赢光赌场赌本的概率。由于 $S_\tau$ 只可能等于 $0$ 或 $N$，有 $\mathbb E S_\tau=Np$，故
$$
\mathbb P(S_\tau=0)=1-p=1-\frac{x}{N},\qquad
\mathbb P(S_\tau=N)=p=\frac{x}{N}.
\tag{25.15}
$$
这就是破产概率与全身而退概率的完整答案。

再求平均持续局数。由独立性，$\mathbb E[\xi_{n+1}\mid\mathcal F_n]=0$ 且 $\mathbb E[\xi_{n+1}^2\mid\mathcal F_n]=1$，于是
$$
\begin{aligned}
\mathbb E[S_{n+1}^2-(n+1)\mid\mathcal F_n]
&=S_n^2+2S_n\mathbb E[\xi_{n+1}\mid\mathcal F_n]
 +\mathbb E[\xi_{n+1}^2\mid\mathcal F_n]-(n+1)\\
&=S_n^2-n .
\end{aligned}
$$
所以 $Q_n=S_n^2-n$ 是鞅。命题 25.9 表明 $Q_{\tau\wedge n}=S_{\tau\wedge n}^2-(\tau\wedge n)$ 也是鞅，从而
$$
\mathbb E S_{\tau\wedge n}^2-\mathbb E(\tau\wedge n)=x^2.
$$

令 $n\to\infty$。对有界随机变量 $S_{\tau\wedge n}^2$ 使用有界收敛定理，对非负单调随机变量 $\tau\wedge n$ 使用单调收敛定理，得到 $\mathbb E S_\tau^2-\mathbb E\tau=x^2$。另一方面，由式（25.15）可知
$$
\mathbb E S_\tau^2=N^2\mathbb P(S_\tau=N)=Nx .
$$
因此 $\mathbb E\tau$ 有限，并且
$$
\mathbb E\tau=Nx-x^2=x(N-x).
\tag{25.16}
$$
至此，破产概率、获胜概率和平均博弈长度均已求出。

## 25.4 停时的等价刻画与有界停时的直接证明

25.3 节已从一致可积与受控条件给出可选停时定理的一般形式；本节改用停时分解，给出有界停时情形的直接证明，便于在算法和数值递推中调用。固定时刻的鞅等式之所以能够推广到随机时刻，关键在于停止决策只能利用当时已经获得的信息。停时的若干等价写法分别便于验证适应性、分解样本空间和处理停止过程。下面先集中证明这些刻画，再分别讨论有界停时与无界停时；后者必须额外处理极限与期望的交换。

**命题 25.10（停时的等价刻画）**

设 $\tau:\Omega\to\{0,1,\ldots,\infty\}$，$\{\mathcal F_n\}_{n\ge0}$ 是滤过。以下三个条件等价：

1. 对每个 $n\ge0$，都有 $\{\tau\le n\}\in\mathcal F_n$；
2. 对每个 $n\ge0$，都有 $\{\tau=n\}\in\mathcal F_n$；
3. 对每个 $n\ge0$，都有 $\{\tau>n\}\in\mathcal F_n$。

**证明**

约定 $\{\tau\le-1\}=\varnothing$。对每个 $n\ge0$，有直接的事件恒等式
$$
\{\tau=n\}=\{\tau\le n\}\setminus\{\tau\le n-1\},\qquad
\{\tau\le n\}=\bigcup_{k=0}^{n}\{\tau=k\},\qquad
\{\tau>n\}=\{\tau\le n\}^c .
\tag{25.17}
$$

若第 1 条成立，则 $\{\tau\le n-1\}\in\mathcal F_{n-1}\subset\mathcal F_n$，而 $\mathcal F_n$ 对差运算封闭，所以第一式给出第 2 条。反之，若第 2 条成立，则对 $0\le k\le n$ 有 $\{\tau=k\}\in\mathcal F_k\subset\mathcal F_n$，第二式作为有限并仍属于 $\mathcal F_n$，故第 1 条成立。最后，$\mathcal F_n$ 对补运算封闭，第三式说明第 1 条与第 3 条等价。三个条件两两等价。

□

在实际验证中，若按停时的精确取值分解样本空间较方便，就使用第 2 条；若使用「尚未停止」的事件进行条件期望计算，就使用第 3 条。此外，对停时 $\tau$，停时处的 σ-代数仍记为
$$
\mathcal F_\tau=\{A\in\mathcal F:A\cap\{\tau\le n\}\in\mathcal F_n\ \text{对每个}\ n\ge0\}.
$$

**定理 25.11（有界停时的可选停时定理）**

设 $M$ 是关于 $\{\mathcal F_n\}$ 的鞅，$\tau,\sigma$ 是停时，且存在确定的非负整数 $N$，使得 $\tau\le\sigma\le N$ 几乎必然。则 $M_\tau,M_\sigma$ 可积，$M_\tau$ 为 $\mathcal F_\tau$ 可测，并且
$$
\mathbb E[M_\sigma\mid\mathcal F_\tau]=M_\tau
$$
几乎必然成立。特别地，$\mathbb E M_\tau=\mathbb E M_\sigma=\mathbb E M_0$。

**证明**

先处理只有一个停时的情形。设 $\rho$ 是满足 $\rho\le N$ 几乎必然的停时。因为 $M_{\rho\wedge N}$ 是有限个可积随机变量按照停时取值拼合而成，所以 $M_\rho=M_{\rho\wedge N}$ 几乎必然且可积。对任意 Borel 集 $B$，有
$$
\{M_\rho\in B\}\cap\{\rho\le n\}
=\bigcup_{k=0}^{n}\bigl(\{M_k\in B\}\cap\{\rho=k\}\bigr)\in\mathcal F_n,
$$
故 $M_\rho$ 是 $\mathcal F_\rho$ 可测随机变量。

取 $A\in\mathcal F_\rho$，并记 $A_k=A\cap\{\rho=k\}$。由
$$
A_k=\bigl(A\cap\{\rho\le k\}\bigr)\cap\{\rho>k-1\}
$$
以及 $\mathcal F_\rho$ 的定义，可知 $A_k\in\mathcal F_k$；当 $k=0$ 时，第二个事件理解为全空间。对 $k\le N$ 使用鞅性，再用全期望公式，得到
$$
\mathbb E[M_N\mathbf 1_{A_k}]
=\mathbb E\!\left[\mathbf 1_{A_k}\mathbb E[M_N\mid\mathcal F_k]\right]
=\mathbb E[M_k\mathbf 1_{A_k}].
$$
对 $k=0,\ldots,N$ 求和，便有
$$
\mathbb E[M_N\mathbf 1_A]=\mathbb E[M_\rho\mathbf 1_A].
$$
因为 $M_\rho$ 已经为 $\mathcal F_\rho$ 可测，上式正是 $\mathbb E[M_N\mid\mathcal F_\rho]=M_\rho$ 几乎必然成立的定义。取 $A=\Omega$，再分别取 $\rho\equiv0$ 与 $\rho\equiv N$，得到 $\mathbb E M_\rho=\mathbb E M_N=\mathbb E M_0$。

现在回到 $\tau\le\sigma\le N$ 的情形。取 $A\in\mathcal F_\tau$，令 $B_k=A\cap\{\tau=k\}$，则 $B_k\in\mathcal F_k$。对 $j\ge k$，有 $B_k\in\mathcal F_k\subset\mathcal F_j$ 且 $\{\sigma=j\}\in\mathcal F_j$，所以 $B_k\cap\{\sigma=j\}\in\mathcal F_j$。在该事件上使用 $M_j=\mathbb E[M_N\mid\mathcal F_j]$，再按 $0\le k\le j\le N$ 求和，得到
$$
\begin{aligned}
\mathbb E[M_\sigma\mathbf 1_A]
&=\sum_{k=0}^{N}\sum_{j=k}^{N}
 \mathbb E[M_j\mathbf 1_{B_k\cap\{\sigma=j\}}]\\
&=\sum_{k=0}^{N}\sum_{j=k}^{N}
 \mathbb E[M_N\mathbf 1_{B_k\cap\{\sigma=j\}}]
 =\mathbb E[M_N\mathbf 1_A]
 =\mathbb E[M_\tau\mathbf 1_A].
\end{aligned}
\tag{25.18}
$$

其中最后一个等号使用了前面已经证明的单停时结论。式（25.18）对所有 $A\in\mathcal F_\tau$ 成立，而 $M_\tau$ 为 $\mathcal F_\tau$ 可测，故 $\mathbb E[M_\sigma\mid\mathcal F_\tau]=M_\tau$ 几乎必然。取 $A=\Omega$ 得 $\mathbb E M_\sigma=\mathbb E M_\tau$；再取 $\tau\equiv0$，并将 $\sigma$ 分别取为原停时和常值 $N$，即得 $\mathbb E M_\sigma=\mathbb E M_0=\mathbb E M_N$。

□

有界性保证了上述求和只有有限项。若 $\tau$ 无界，即使它几乎必然有限，也不能直接把固定 $n$ 的期望等式推到 $n=\infty$。所需的分析条件正是停止过程的一致可积性，或与其等价的 $L^1$ 收敛。

**命题 25.12（停止过程的一致可积与 L1 收敛判别）**

设 $M$ 为鞅，$\tau$ 为停时且 $\tau<\infty$ 几乎必然，记 $X_n=M_{\tau\wedge n}$、$X=M_\tau$。若
$$
\lim_{K\to\infty}\sup_{n\ge0}
\mathbb E\!\left[|X_n|\mathbf 1_{\{|X_n|>K\}}\right]=0,
$$
即 $\{X_n\}_{n\ge0}$ 一致可积，则 $X\in L^1$ 且 $X_n\to X$ 于 $L^1$。反之，若 $X\in L^1$ 且 $X_n\to X$ 于 $L^1$，则 $\{X_n\}$ 一致可积。特别地，若存在 $Y\in L^1$，使 $|X_n|\le Y$ 对一切 $n$ 几乎必然成立，则上述条件全部成立。

**证明**

因为 $\tau<\infty$ 几乎必然，对每个样本点除去一个零测集，最终都有 $\tau\wedge n=\tau$，所以 $X_n\to X$ 几乎必然。先设 $\{X_n\}$ 一致可积。取 $K_0$ 使相应上确界不超过 $1$，则对每个 $n$，
$$
\mathbb E|X_n|
\le K_0+\mathbb E\!\left[|X_n|\mathbf 1_{\{|X_n|>K_0\}}\right]
\le K_0+1 .
$$
记 $\varphi_K$ 为在 $[-K,K]$ 上恒等、在区间外取 $\pm K$ 的连续截断函数，即
$$
\varphi_K(x)=x\mathbf 1_{\{|x|\le K\}}
+K\operatorname{sgn}(x)\mathbf 1_{\{|x|>K\}} .
$$
它满足
$$
|x-\varphi_K(x)|=(|x|-K)\mathbf 1_{\{|x|>K\}}
\le |x|\mathbf 1_{\{|x|>K\}} .
$$
给定 $\delta>0$，取 $K$ 使一致可积定义中的上确界小于 $\delta$。由于 $\varphi_K$ 连续且有界，$\varphi_K(X_n)\to\varphi_K(X)$ 几乎必然，有界收敛定理给出
$$
\lim_{n\to\infty}\mathbb E|\varphi_K(X_n)-\varphi_K(X)|=0.
$$
另一方面，由 Fatou 引理和上述截断误差估计，
$$
\begin{aligned}
\mathbb E|X-\varphi_K(X)|
&\le\liminf_{n\to\infty}\mathbb E|X_n-\varphi_K(X_n)|\\
&\le\liminf_{n\to\infty}
\mathbb E\!\left[|X_n|\mathbf 1_{\{|X_n|>K\}}\right]
<\delta .
\end{aligned}
$$
因此 $\mathbb E|X|\le K+\delta<\infty$，即 $X\in L^1$。再用三角不等式，
$$
\begin{aligned}
\mathbb E|X_n-X|
&\le\mathbb E|X_n-\varphi_K(X_n)|
+\mathbb E|\varphi_K(X_n)-\varphi_K(X)|\\
&\quad+\mathbb E|\varphi_K(X)-X| .
\end{aligned}
$$
先令 $n\to\infty$，中间一项消失，首项与末项分别不超过 $\delta$，故 $\limsup_n\mathbb E|X_n-X|\le2\delta$。再令 $\delta\downarrow0$，即得 $X_n\to X$ 于 $L^1$。反之，设 $X\in L^1$ 且 $X_n\to X$ 于 $L^1$。给定 $\varepsilon>0$，取 $n_0$ 使 $n>n_0$ 时 $\mathbb E|X_n-X|<\varepsilon/3$。此时
$$
C:=\sup_{n\ge0}\mathbb E|X_n|
\le\max_{0\le n\le n_0}\mathbb E|X_n|
+\mathbb E|X|+\frac{\varepsilon}{3}<\infty .
$$
再取 $R$ 使 $\mathbb E[|X|\mathbf 1_{\{|X|>R\}}]<\varepsilon/3$。对 $n>n_0$，由三角不等式、Markov 不等式以及
$$
\{|X_n|>K\}\subset
\bigl(\{|X_n|>K\}\cap\{|X|>R\}\bigr)
\cup\{|X|\le R\},
$$
得到
$$
\begin{aligned}
\mathbb E\!\left[|X_n|\mathbf 1_{\{|X_n|>K\}}\right]
&\le\mathbb E|X_n-X|
+\mathbb E\!\left[|X|\mathbf 1_{\{|X_n|>K\}}\right]\\
&<\frac{\varepsilon}{3}
+\mathbb E\!\left[|X|\mathbf 1_{\{|X|>R\}}\right]
+R\mathbb P(|X_n|>K)\\
&<\frac{2\varepsilon}{3}+\frac{RC}{K}.
\end{aligned}
$$
取充分大的 $K_1$，便使右端对一切 $n>n_0$ 小于 $\varepsilon$。有限个可积变量 $X_0,\ldots,X_{n_0}$ 的尾部可由有界收敛定理一致控制，故还能取 $K_2$，使 $K\ge K_2$ 时这些变量的相应尾部均小于 $\varepsilon$。于是 $K\ge\max\{K_1,K_2\}$ 时，对所有 $n$ 都有同一尾部估计，一致可积性得证。

若 $|X_n|\le Y$ 且 $Y\in L^1$，则
$$
\mathbb E\!\left[|X_n|\mathbf 1_{\{|X_n|>K\}}\right]
\le\mathbb E\!\left[Y\mathbf 1_{\{Y>K\}}\right],
$$
右端与 $n$ 无关并随 $K\to\infty$ 趋于零，所以支配条件蕴含一致可积性。

□

命题 25.12 给出了无界停时的可选期望公式。若 $\tau<\infty$ 几乎必然，且 $\{M_{\tau\wedge n}\}_{n\ge0}$ 一致可积，则对每个固定的 $n$，把定理 25.11 用于有界停时 $\tau\wedge n\le n$，得到 $\mathbb E M_{\tau\wedge n}=\mathbb E M_0$。由 $L^1$ 收敛保持期望，便有
$$
\mathbb E M_\tau
=\lim_{n\to\infty}\mathbb E M_{\tau\wedge n}
=\mathbb E M_0 .
$$
特别地，若停止过程被某个可积随机变量一致支配，此公式成立。仅有 $\tau<\infty$ 几乎必然与逐点极限存在，并不足以交换停止与取期望。下面的反例说明，无界停时条件下的一致可积性不能省略。设 $\xi_1,\xi_2,\ldots$ 独立，且
$$
\mathbb P(\xi_k=0)=\mathbb P(\xi_k=2)=\frac12,
\qquad \mathcal F_n=\sigma(\xi_1,\ldots,\xi_n).
$$
令 $M_0=1$，$M_n=\prod_{k=1}^n\xi_k$。因为 $\xi_n$ 独立于 $\mathcal F_{n-1}$ 且 $\mathbb E\xi_n=1$，所以
$$
\mathbb E[M_n\mid\mathcal F_{n-1}]
=M_{n-1}\mathbb E\xi_n=M_{n-1},
$$
故 $M$ 为非负鞅。定义首次出现零因子的时刻
$$
\tau=\inf\{n\ge1:\xi_n=0\}.
$$
由独立性，$\mathbb P(\tau>n)=2^{-n}$，因而 $\tau<\infty$ 几乎必然；同时每个 $\{\tau>n\}$ 都有正概率，所以 $\tau$ 不是有界停时。停止过程满足
$$
M_{\tau\wedge n}=2^n\mathbf 1_{\{\tau>n\}},
\qquad
\mathbb E M_{\tau\wedge n}=2^n\mathbb P(\tau>n)=1.
$$
在 $\tau$ 有限处，乘积含有零因子，故 $M_\tau=0$，并且 $M_{\tau\wedge n}\to M_\tau$ 几乎必然。如果该收敛还是 $L^1$ 收敛，则期望应收敛到 $0$，这与上式矛盾。更直接地，固定 $K>0$，只要 $2^n>K$，就有
$$
\mathbb E\!\left[M_{\tau\wedge n}
\mathbf 1_{\{M_{\tau\wedge n}>K\}}\right]=1.
$$
因此停止过程不一致可积，且 $\mathbb E M_\tau=0\ne1=\mathbb E M_0$。

## 25.5 鞅收敛定理

鞅的时间平均性质使其在适当的矩条件下具有稳定的极限。上穿次数把振荡转化为可积性的定量控制，是建立几乎必然收敛的关键；一致可积性则进一步把逐点极限提升为 $L^1$ 极限。给定 $a<b$，令 $S_1=\inf\{n\ge0:M_n\le a\}$，并归纳定义
$$
T_k=\inf\{n>S_k:M_n\ge b\},\qquad
S_{k+1}=\inf\{n>T_k:M_n\le a\},
$$
其中空集的下确界取为 $+\infty$。称区间 $(S_k,T_k]$ 为一次上穿过程，并记前 $N$ 步内完成的上穿次数为
$$
U_N=\sup\{k\ge1:T_k\le N\},
$$
空集的上确界取为 $0$。这些时刻均为停时，$U_N$ 是取非负整数值的随机变量。

**定理 25.13（Doob 上穿不等式）**

设 $M=\{M_n\}_{n\ge0}$ 为鞅，$a<b$，$U_N$ 是路径 $M_0,\ldots,M_N$ 对区间 $[a,b]$ 的完成上穿次数。则
$$
(b-a)\mathbb E U_N
\le\mathbb E\!\left[(M_N-a)^-\right]
\le\mathbb E|M_N|+|a| .
\tag{25.19}
$$

**证明**

构造一个只在等待上穿时持有的可预测策略。对每个 $j\ge1$，若存在 $k$ 使 $S_k<j\le T_k$，令 $H_j=1$，否则令 $H_j=0$。由于各区间 $(S_k,T_k]$ 两两不交，$H_j$ 只取 $0,1$ 两值。事件
$$
\{S_k<j\}\cap\{T_k\ge j\}
=\{S_k\le j-1\}\setminus\{T_k\le j-1\}
$$
属于 $\mathcal F_{j-1}$，故 $H_j$ 为 $\mathcal F_{j-1}$ 可测，即该策略可预测。

令 $\Delta M_j=M_j-M_{j-1}$，并定义策略在时刻 $N$ 的收益
$$
G_N=\sum_{j=1}^N H_j\Delta M_j.
$$
有界可预测过程的鞅变换仍保持零均值。具体而言，
$$
\mathbb E[H_j\Delta M_j]
=\mathbb E\!\left[H_j\mathbb E[\Delta M_j\mid\mathcal F_{j-1}]\right]=0,
$$
所以 $\mathbb E G_N=0$。若 $T_k\le N$，策略在第 $k$ 个区间的收益为
$$
\sum_{j=S_k+1}^{T_k}\Delta M_j
=M_{T_k}-M_{S_k}\ge b-a.
$$
至多还有一个在 $N$ 时尚未完成的上穿区间，即 $S_k<N<T_k$。其收益满足
$$
\sum_{j=S_k+1}^{N}\Delta M_j
=M_N-M_{S_k}\ge M_N-a\ge-(M_N-a)^-.
$$
其余持有区间对 $G_N$ 没有贡献。因此逐样本点有
$$
G_N\ge(b-a)U_N-(M_N-a)^-.
$$
取期望并利用 $\mathbb E G_N=0$，得到
$$
(b-a)\mathbb E U_N\le\mathbb E\!\left[(M_N-a)^-\right].
$$
又因为 $0\le(M_N-a)^-\le|M_N|+|a|$，第二个不等式也随之成立。

□

**定理 25.14（$L^1$ 有界鞅的几乎必然收敛）**

设 $M$ 为鞅，且
$$
C:=\sup_{n\ge0}\mathbb E|M_n|<\infty .
$$
则存在随机变量 $M_\infty\in L^1$，使 $M_n\to M_\infty$ 几乎必然，并且 $\mathbb E|M_\infty|\le C$。

**证明**

固定 $a<b$。当 $N$ 增大时，前 $N$ 步的上穿次数 $U_N$ 单调不减，其极限 $U_\infty(a,b)$ 是整条路径对 $[a,b]$ 的完成上穿次数，允许取值 $+\infty$。由定理 25.13 与单调收敛定理，
$$
\mathbb E U_\infty(a,b)
=\lim_{N\to\infty}\mathbb E U_N
\le\frac{C+|a|}{b-a}<\infty .
\tag{25.20}
$$
所以 $U_\infty(a,b)<\infty$ 几乎必然。令 $a,b$ 遍历所有满足 $a<b$ 的有理数，这些区间的可数并仍为零测集；除去该零测集后，每个有理区间的完成上穿次数均有限。若一个实数序列在扩展实直线 $[-\infty,+\infty]$ 中没有极限，则其下极限严格小于上极限，因而可选取有理数 $a<b$ 使
$$
\liminf_{n\to\infty}M_n<a<b<\limsup_{n\to\infty}M_n .
$$
此时序列无限多次小于 $a$，也无限多次大于 $b$，每次交替都产生一次新的完成上穿，故 $U_\infty(a,b)=+\infty$。这与上述零测集之外的性质矛盾。因此 $M_n$ 在扩展实直线中几乎必然有极限，记为 $L$。

对 $|M_n|$ 使用 Fatou 引理，得到
$$
\mathbb E|L|
\le\liminf_{n\to\infty}\mathbb E|M_n|\le C .
\tag{25.21}
$$
故 $L$ 几乎必然有限，将其在该零测集上任意改为有限值并记为 $M_\infty$，便有 $M_\infty\in L^1$ 且 $M_n\to M_\infty$ 几乎必然。这里并未断言 $L^1$ 收敛；逐点收敛与 $L^1$ 收敛之间的差别正是一致可积性问题。

□

**定理 25.15（$L^2$ 有界鞅的收敛）**

设 $M$ 为二阶矩鞅，且 $\sup_{n\ge0}\mathbb E M_n^2<\infty$。则存在 $M_\infty\in L^2$，使 $M_n\to M_\infty$ 几乎必然且于 $L^2$ 收敛，并对每个 $n$ 有 $M_n=\mathbb E[M_\infty\mid\mathcal F_n]$ 几乎必然。

**证明**

记 $\Delta M_k=M_k-M_{k-1}$。对 $i<j$，变量 $\Delta M_i$ 为 $\mathcal F_{j-1}$ 可测，且二阶矩保证以下各乘积可积，因此
$$
\mathbb E[\Delta M_i\Delta M_j]
=\mathbb E\!\left[\Delta M_i
\mathbb E[\Delta M_j\mid\mathcal F_{j-1}]\right]=0 .
$$
即鞅增量相互正交。对 $m>n$ 展开平方并使用正交性，得到
$$
\mathbb E(M_m-M_n)^2
=\sum_{k=n+1}^m\mathbb E(\Delta M_k)^2
=\mathbb E M_m^2-\mathbb E M_n^2 .
\tag{25.22}
$$在式（25.22）中取 $n=0$，可得
$$
\mathbb E M_m^2
=\mathbb E M_0^2+\sum_{k=1}^m\mathbb E(\Delta M_k)^2 .
$$
左端一致有界，而右端各项非负，故级数 $\sum_{k\ge1}\mathbb E(\Delta M_k)^2$ 收敛。特别地，其尾部随 $n\to\infty$ 趋于零。

另一方面，由 Cauchy--Schwarz 不等式，
$$
\sup_{n\ge0}\mathbb E|M_n|
\le\sup_{n\ge0}\bigl(\mathbb E M_n^2\bigr)^{1/2}<\infty .
$$
定理 25.14 因而给出几乎必然极限 $M_\infty$。固定 $n$，对 $(M_m-M_n)^2$ 使用 Fatou 引理，再代入式（25.22），得到
$$
\mathbb E(M_\infty-M_n)^2
\le\liminf_{m\to\infty}\mathbb E(M_m-M_n)^2
=\sum_{k=n+1}^{\infty}\mathbb E(\Delta M_k)^2 .
\tag{25.23}
$$
右端是收敛级数的尾部，故趋于零。因为 $M_n\in L^2$，上式还表明 $M_\infty=M_n+(M_\infty-M_n)\in L^2$，并证明了 $L^2$ 收敛。

最后，对 $m\ge n$，鞅性给出 $M_n=\mathbb E[M_m\mid\mathcal F_n]$。条件期望在 $L^1$ 中是压缩，所以
$$
\begin{aligned}
&\mathbb E\left|\mathbb E[M_m\mid\mathcal F_n]
-\mathbb E[M_\infty\mid\mathcal F_n]\right|\\
&\qquad\le\mathbb E|M_m-M_\infty|
\le\bigl(\mathbb E(M_m-M_\infty)^2\bigr)^{1/2}\to0 .
\end{aligned}
$$
左端的另一项在 $m\ge n$ 时恒等于 $M_n$，取极限即得 $M_n=\mathbb E[M_\infty\mid\mathcal F_n]$ 几乎必然。

□

**定理 25.16（一致可积、$L^1$ 收敛与闭合性）**

设 $M$ 为鞅。以下三个命题等价：(i) $\{M_n\}_{n\ge0}$ 一致可积；(ii) 存在 $M_\infty\in L^1$，使 $M_n\to M_\infty$ 于 $L^1$；(iii) 存在 $Y\in L^1$，使 $M_n=\mathbb E[Y\mid\mathcal F_n]$ 对每个 $n$ 几乎必然成立。在这些条件下，$M_n\to M_\infty$ 几乎必然，并且可在 (iii) 中取 $Y=M_\infty$。

**证明**

先设 (i) 成立。由一致可积性，可取 $K$ 使所有超出 $K$ 的尾部期望不超过 $1$，从而
$$
\sup_{n\ge0}\mathbb E|M_n|
\le K+\sup_{n\ge0}\mathbb E\!\left[|M_n|
\mathbf 1_{\{|M_n|>K\}}\right]\le K+1 .
$$
定理 25.14 给出几乎必然极限 $M_\infty\in L^1$。命题 25.12 的证明中，从几乎必然收敛与一致可积性推出 $L^1$ 收敛的连续截断论证只涉及随机变量序列，并不依赖停时；将其用于 $M_n$ 即得 (ii)。

反之，若 (ii) 成立，则命题 25.12 反向部分的估计同样只涉及一个 $L^1$ 收敛序列及其极限，故 $\{M_n\}$ 一致可积。并且 $L^1$ 收敛蕴含 $L^1$ 范数有界，定理 25.14 给出几乎必然极限；该极限在概率意义下与 $M_\infty$ 一致，所以也有 $M_n\to M_\infty$ 几乎必然。

由 (ii) 还可推出闭合性。对 $m\ge n$，有 $M_n=\mathbb E[M_m\mid\mathcal F_n]$。条件期望的 $L^1$ 压缩性给出
$$
\mathbb E\left|M_n-\mathbb E[M_\infty\mid\mathcal F_n]\right|
\le\mathbb E|M_m-M_\infty|\to0,
$$
其中左端与 $m$ 无关，故只能为零。于是
$$
M_n=\mathbb E[M_\infty\mid\mathcal F_n],
\qquad n\ge0 .
\tag{25.24}
$$
这证明了 (iii)，并说明闭合变量可取为 $M_\infty$。最后设 (iii) 成立，证明一致可积性。条件 Jensen 不等式给出
$$
|M_n|\le\mathbb E[|Y|\mid\mathcal F_n].
$$
记 $A_{n,K}=\{|M_n|>K\}\in\mathcal F_n$。在该事件上对上一不等式积分，并用条件期望的定义，得到
$$
\mathbb E\!\left[|M_n|\mathbf 1_{A_{n,K}}\right]
\le\mathbb E\!\left[|Y|\mathbf 1_{A_{n,K}}\right].
$$
对任意 $R>0$，将右端按 $|Y|>R$ 与 $|Y|\le R$ 分开，得到
$$
\begin{aligned}
\mathbb E\!\left[|M_n|\mathbf 1_{A_{n,K}}\right]
&\le\mathbb E\!\left[|Y|\mathbf 1_{\{|Y|>R\}}\right]
+R\mathbb P(A_{n,K})\\
&\le\mathbb E\!\left[|Y|\mathbf 1_{\{|Y|>R\}}\right]
+\frac{R}{K}\mathbb E|Y|,
\end{aligned}
$$
其中使用了 $\mathbb E|M_n|\le\mathbb E|Y|$ 与 Markov 不等式。给定 $\varepsilon>0$，先取 $R$ 使第一项小于 $\varepsilon/2$，再取充分大的 $K$ 使第二项小于 $\varepsilon/2$。所得估计与 $n$ 无关，故 (i) 成立。至此三个命题的等价性全部得证。

□

**定理 25.17（Lévy 零一律）**

设 $Y\in L^1$，并令 $\mathcal F_\infty=\sigma\!\left(\bigcup_{n\ge0}\mathcal F_n\right)$。则
$$
\mathbb E[Y\mid\mathcal F_n]
\longrightarrow\mathbb E[Y\mid\mathcal F_\infty],
\qquad n\to\infty ,
\tag{25.25}
$$
这里的收敛既为几乎必然收敛，也为 $L^1$ 收敛。特别地，对任意 $A\in\mathcal F_\infty$，
$$
\mathbb P(A\mid\mathcal F_n)\longrightarrow\mathbf 1_A,
\qquad n\to\infty ,
\tag{25.26}
$$
同样既几乎必然收敛，也于 $L^1$ 收敛。因此，当全部历史信息逐步揭示时，关于最终可测事件的条件概率最终取到 $0$ 或 $1$。

**证明**

令 $M_n=\mathbb E[Y\mid\mathcal F_n]$，$M_\infty=\mathbb E[Y\mid\mathcal F_\infty]$。由条件期望的塔性质，对 $m\ge n$ 有
$$
\mathbb E[M_m\mid\mathcal F_n]
=\mathbb E\!\left[\mathbb E[Y\mid\mathcal F_m]\mid\mathcal F_n\right]
=\mathbb E[Y\mid\mathcal F_n]=M_n,
$$
所以 $M$ 是由 $Y$ 闭合的鞅。定理 25.16 给出某个极限变量 $Z\in L^1$，使 $M_n\to Z$ 几乎必然且于 $L^1$ 收敛。余下只需识别 $Z=M_\infty$ 几乎必然。由于每个 $M_n$ 都是 $\mathcal F_\infty$ 可测的，必要时在零测集上修改 $Z$，可使其为 $\mathcal F_\infty$ 可测。取 $A\in\mathcal F_m$。对一切 $n\ge m$，有 $A\in\mathcal F_n$，故条件期望的定义给出
$$
\mathbb E[M_n\mathbf 1_A]=\mathbb E[Y\mathbf 1_A].
$$
由 $L^1$ 收敛，
$$
\left|\mathbb E[M_n\mathbf 1_A]-\mathbb E[Z\mathbf 1_A]\right|
\le\mathbb E|M_n-Z|\to0,
$$
从而 $\mathbb E[Z\mathbf 1_A]=\mathbb E[Y\mathbf 1_A]$。这说明等式对所有 $A\in\bigcup_{m\ge0}\mathcal F_m$ 成立。

现在定义
$$
\mathcal D=\left\{A\in\mathcal F_\infty:
\mathbb E[Z\mathbf 1_A]=\mathbb E[Y\mathbf 1_A]\right\}.
$$
因为各 $\mathcal F_n$ 随 $n$ 递增，$\mathcal P:=\bigcup_{n\ge0}\mathcal F_n$ 对有限交封闭，是一个 $\pi$ 系。另一方面，$\Omega\in\mathcal D$；若 $A,B\in\mathcal D$ 且 $A\subset B$，则由积分线性性知 $B\setminus A\in\mathcal D$；若 $A_k\in\mathcal D$ 且 $A_k\uparrow A$，则 $\mathbf 1_{A_k}\uparrow\mathbf 1_A$，而 $Z$ 与 $Y$ 均可积，由控制收敛定理知 $A\in\mathcal D$。因此 $\mathcal D$ 是包含 $\mathcal P$ 的 $\lambda$ 系。

Dynkin 的 $\pi$--$\lambda$ 定理给出 $\sigma(\mathcal P)\subset\mathcal D$。但 $\sigma(\mathcal P)=\mathcal F_\infty$，且按定义 $\mathcal D\subset\mathcal F_\infty$，所以 $\mathcal D=\mathcal F_\infty$。于是对所有 $A\in\mathcal F_\infty$ 都有
$$
\mathbb E[Z\mathbf 1_A]=\mathbb E[Y\mathbf 1_A].
$$
结合 $Z$ 的 $\mathcal F_\infty$ 可测性，这正是 $Z=\mathbb E[Y\mid\mathcal F_\infty]$ 几乎必然成立的定义，故 $Z=M_\infty$ 几乎必然，式（25.25）的两种收敛均得证。

最后取 $Y=\mathbf 1_A$，其中 $A\in\mathcal F_\infty$。此时 $\mathbf 1_A$ 已为 $\mathcal F_\infty$ 可测，所以 $\mathbb E[\mathbf 1_A\mid\mathcal F_\infty]=\mathbf 1_A$ 几乎必然；将式（25.25）代入即得式（25.26）。

□

**例 25.4**

设 $\xi_1,\xi_2,\ldots$ 为独立 Rademacher 随机变量，$\mathbb P(\xi_k=1)=\mathbb P(\xi_k=-1)=1/2$，令 $S_n=\sum_{k=1}^n\xi_k$。定义
$$
\lambda=\log(\cosh 1),\qquad
M_0=1,\qquad M_n=\exp(S_n-n\lambda).
$$
研究 $M_n$ 的几乎必然收敛、$L^1$ 收敛、一致可积性以及二阶矩有界性。

**解**

因为 $\mathbb E e^{t\xi_k}=\cosh t$，所以 $\lambda>0$ 且
$$
\mathbb E\!\left[e^{\xi_n-\lambda}\right]
=e^{-\lambda}\cosh 1=1.
$$
又 $M_n=M_{n-1}e^{\xi_n-\lambda}$，而 $\xi_n$ 独立于 $\mathcal F_{n-1}$，故
$$
\mathbb E[M_n\mid\mathcal F_{n-1}]=M_{n-1}.
$$
因此 $M$ 是非负鞅，并且 $\mathbb E M_n=\mathbb E M_0=1$。特别地，$\sup_n\mathbb E|M_n|=1$，定理 25.14 的 $L^1$ 有界条件成立。

强大数定律给出 $S_n/n\to0$ 几乎必然，从而
$$
\frac{\log M_n}{n}=\frac{S_n}{n}-\lambda
\longrightarrow-\lambda<0
$$
几乎必然成立。于是 $M_n\to0$ 几乎必然。若 $M_n$ 于 $L^1$ 收敛，则其极限只能是 $0$，进而 $\mathbb E M_n\to0$；这与 $\mathbb E M_n\equiv1$ 矛盾。因此 $M_n$ 不于 $L^1$ 收敛。定理 25.16 进一步说明 $\{M_n\}$ 不一致可积。这一例表明，$L^1$ 有界只能保证几乎必然极限可积，不能保证期望传到极限。

最后，由独立性和双曲余弦恒等式，
$$
\mathbb E M_n^2
=e^{-2n\lambda}\mathbb E e^{2S_n}
=\left(\frac{\cosh 2}{(\cosh 1)^2}\right)^n
=\left(2-\frac1{(\cosh 1)^2}\right)^n .
$$
底数严格大于 $1$，故 $\mathbb E M_n^2$ 无界，$M$ 也不满足定理 25.15 的 $L^2$ 有界条件。**例 25.5**

取 $\Omega=[0,1)$，$\mathbb P$ 为 Lebesgue 测度，$\mathcal F_n$ 由二进区间
$$
D_{n,k}=\left[k2^{-n},(k+1)2^{-n}\right),
\qquad k=0,\ldots,2^n-1
$$
生成。对 $A\in\mathcal F_\infty$，写出 $\mathbb P(A\mid\mathcal F_n)$，并用 $A=[0,a)$、$0<a<1$ 验证 Lévy 零一律的两种收敛。

**解**

对 $\omega\in\Omega$，记包含 $\omega$ 的第 $n$ 代二进区间为 $D_n(\omega)$。由于 $D_n(\omega)$ 是 $\mathcal F_n$ 的原子且测度为 $2^{-n}$，条件期望在原子上等于平均积分，故
$$
Q_n(\omega):=\mathbb P(A\mid\mathcal F_n)(\omega)
=2^n\mathbb P\!\left(A\cap D_n(\omega)\right).
$$
二进区间生成 $[0,1)$ 上的 Borel $\sigma$-代数，所以 $\mathcal F_\infty$ 正是该 Borel $\sigma$-代数。定理 25.17 给出 $Q_n\to\mathbf 1_A$ 几乎必然且于 $L^1$ 收敛。

当 $A=[0,a)$ 时，可以直接检验。若 $\omega<a$，则当 $n$ 充分大时 $D_n(\omega)\subset A$，于是 $Q_n(\omega)=1$；若 $\omega>a$，则当 $n$ 充分大时 $D_n(\omega)\cap A=\varnothing$，于是 $Q_n(\omega)=0$。唯一的例外点 $\omega=a$ 组成零测集，所以 $Q_n\to\mathbf 1_A$ 几乎必然。

为直接估计 $L^1$ 误差，令
$$
k_n=\lfloor2^n a\rfloor,\qquad
r_n=2^n\left(a-k_n2^{-n}\right),
$$
则 $0\le r_n<1$，且在唯一可能跨越端点 $a$ 的区间 $D_{n,k_n}$ 上，$Q_n=r_n$。其余二进区间完全包含于 $A$ 或与 $A$ 不交，$Q_n$ 已分别等于 $1$ 或 $0$。因此
$$
\begin{aligned}
\mathbb E|Q_n-\mathbf 1_A|
&=r_n2^{-n}(1-r_n)+(1-r_n)2^{-n}r_n\\
&=2^{1-n}r_n(1-r_n)
\le2^{-n-1}\longrightarrow0 .
\end{aligned}
$$
这既具体展示了条件概率最终取 $0$ 或 $1$，也验证了相应的 $L^1$ 收敛。
## 25.6 最优停止

最优停止问题研究何时行使一项不可重复的权利，才能使期望收益达到最大。停止决策只能利用当时已经获得的信息，因而不能用事后才知道的未来收益代替停时。有限 horizon 的情形可以通过后向归纳完整求解，并为美式期权的定价与行权提供统一的数学框架。

固定概率空间 $(\Omega,\mathcal F,\mathbb P)$、离散时间 filtration $(\mathcal F_n)_{n=0}^N$ 以及适应收益过程 $X=(X_n)_{n=0}^N$，并假定每个 $X_n$ 可积。对 $0\le n\le N$，令 $\mathcal T_n$ 表示满足 $n\le\tau\le N$ 的全体停时。属于 $\mathcal T_n$ 的 $\tau$ 表示在时刻 $n$ 尚未停止时可采用的停止规则。由于 horizon 有限，$X_\tau=\sum_{k=n}^NX_k\mathbf 1_{\{\tau=k\}}$ 可积，无须另加一致可积条件。

### 25.6.1 后向归纳与 Snell 包络

在终端时刻 $N$，持有者只能停止并取得 $X_N$。在时刻 $n<N$，若立即停止，收益为 $X_n$；若继续，则下一时刻面对从 $n+1$ 开始的最优停止问题。后向归纳把这一比较写成如下定义。

**定义 25.18（Snell 包络）**

收益过程 $X$ 的 Snell 包络 $U=(U_n)_{n=0}^N$ 由终端条件与后向递推定义为
$$
U_N=X_N,\qquad
U_n=\max\left\{X_n,\mathbb E[U_{n+1}\mid\mathcal F_n]\right\},
\qquad n=N-1,\ldots,0.
\tag{25.27}
$$
其中 $X_n$ 是立即停损或行权的价值，条件期望是继续持有的价值，二者中的较大者就是时刻 $n$ 的最优价值。

与 Snell 包络相联系，定义首次达到立即收益的时刻
$$
\tau_n^*=\min\{k\in\{n,\ldots,N\}:U_k=X_k\},
\qquad 0\le n\le N.
\tag{25.28}
$$
集合必含 $N$，故最小值存在。若沿途继续价值严格大于立即收益，就不停止；首次二者相等时停止。这一规则将在定理 25.19 中被证明为最优规则。
### 25.6.2 值函数与最优停时

时刻 $n$ 的条件值函数与相应的非条件值分别记为
$$
V_n=\operatorname*{ess\,sup}_{\tau\in\mathcal T_n}
\mathbb E[X_\tau\mid\mathcal F_n],
\qquad
v_n=\sup_{\tau\in\mathcal T_n}\mathbb E[X_\tau].
\tag{25.29}
$$
条件值函数概括了在已有信息下所有可行停止规则的最好条件期望收益；非条件值则比较这些规则的总期望收益。

**定理 25.19（Snell 包络的性质与最优停时的存在性）**

设 $X$ 为适应可积收益过程，$U$ 和 $\tau_n^*$ 分别由式（25.27）与式（25.28）给出。则下列结论成立。

（i）每个 $U_n$ 可积，$U$ 是支配 $X$ 的适应上鞅，即 $U_n\ge X_n$ 且 $\mathbb E[U_{n+1}\mid\mathcal F_n]\le U_n$。若 $Y$ 是任意支配 $X$ 的适应可积上鞅，则 $U_n\le Y_n$ 对每个 $n$ 成立，因而 $U$ 是最小的这种上鞅。

（ii）$\tau_n^*\in\mathcal T_n$，且 $U_{\tau_n^*}=X_{\tau_n^*}$。过程 $\{U_{k\wedge\tau_n^*}\}_{k=n}^N$ 关于 $(\mathcal F_k)_{k=n}^N$ 是鞅。

（iii）对任意 $\tau\in\mathcal T_n$，都有 $\mathbb E[X_\tau\mid\mathcal F_n]\le U_n$ 几乎必然，而 $\tau_n^*$ 使等号成立。因此
$V_n=U_n$ 几乎必然，并且 $v_n=\mathbb E U_n=\mathbb E[X_{\tau_n^*}]$。特别地，最优停时存在，$\tau_0^*$ 给出从初始时刻开始的一个最优停止规则。

**证明**

先证明（i）。终端可积性由 $U_N=X_N$ 给出。假设 $U_{n+1}$ 可积，则 $\mathbb E[U_{n+1}\mid\mathcal F_n]$ 可积，且
$|U_n|\le |X_n|+\mathbb E[|U_{n+1}|\mid\mathcal F_n]$，所以 $U_n$ 可积。由后向归纳可知全部 $U_n$ 可积。适应性来自 $X$ 的适应性及条件期望的 $\mathcal F_n$ 可测性。递推式同时给出 $U_n\ge X_n$ 与 $U_n\ge\mathbb E[U_{n+1}\mid\mathcal F_n]$，故 $U$ 是支配 $X$ 的上鞅。
再证最小性。设 $Y$ 是支配 $X$ 的适应可积上鞅。终端时有 $Y_N\ge X_N=U_N$。假设 $Y_{n+1}\ge U_{n+1}$ 几乎必然。条件期望的单调性以及 $Y$ 的上鞅性给出
$$
Y_n\ge\mathbb E[Y_{n+1}\mid\mathcal F_n]
\ge\mathbb E[U_{n+1}\mid\mathcal F_n].
$$
又有 $Y_n\ge X_n$，故 $Y_n\ge\max\{X_n,\mathbb E[U_{n+1}\mid\mathcal F_n]\}=U_n$。由后向归纳，最小性成立。

现在证明（ii）。对 $n\le k\le N$，事件 $\{\tau_n^*=k\}$ 可写为
$$
\{\tau_n^*=k\}
=\left(\bigcap_{j=n}^{k-1}\{U_j>X_j\}\right)\cap\{U_k=X_k\},
$$
其中 $k=n$ 时交集部分为空积，等于全空间。由于 $U_j,X_j$ 都是 $\mathcal F_j$ 可测的，而 filtration 递增，上式右端属于 $\mathcal F_k$。因此 $\tau_n^*$ 是停时，且按定义属于 $\mathcal T_n$。在 $\{\tau_n^*=k\}$ 上有 $U_k=X_k$，对 $k$ 求和即得 $U_{\tau_n^*}=X_{\tau_n^*}$。

固定 $n$，令 $Z_k=U_{k\wedge\tau_n^*}$。每个 $Z_k$ 可积且为 $\mathcal F_k$ 可测。对 $n\le k<N$，在事件 $\{\tau_n^*\le k\}$ 上，$Z_{k+1}=Z_k$；在事件 $\{\tau_n^*>k\}$ 上，$Z_k=U_k$、$Z_{k+1}=U_{k+1}$，并且首次相等尚未出现意味着 $U_k>X_k$。于是由式（25.27），在 $\{\tau_n^*>k\}$ 上有 $U_k=\mathbb E[U_{k+1}\mid\mathcal F_k]$。两个事件都属于 $\mathcal F_k$，所以
$$
\begin{aligned}
\mathbb E[Z_{k+1}\mid\mathcal F_k]
&=\mathbf 1_{\{\tau_n^*\le k\}}Z_k
+\mathbf 1_{\{\tau_n^*>k\}}\mathbb E[U_{k+1}\mid\mathcal F_k]\\
&=\mathbf 1_{\{\tau_n^*\le k\}}Z_k
+\mathbf 1_{\{\tau_n^*>k\}}U_k
=Z_k .
\end{aligned}
$$
故 $Z$ 是鞅，（ii）得证。
最后证明（iii）。任取 $\tau\in\mathcal T_n$，令 $W_k=U_{k\wedge\tau}$，$n\le k\le N$。与上面相同，$W_k$ 适应且可积。在 $\{\tau\le k\}$ 上有 $W_{k+1}=W_k$；在 $\{\tau>k\}$ 上有 $W_k=U_k$ 和 $W_{k+1}=U_{k+1}$。利用 $U$ 的上鞅性，得到
$$
\begin{aligned}
\mathbb E[W_{k+1}\mid\mathcal F_k]
&=\mathbf 1_{\{\tau\le k\}}W_k
+\mathbf 1_{\{\tau>k\}}\mathbb E[U_{k+1}\mid\mathcal F_k]\\
&\le\mathbf 1_{\{\tau\le k\}}W_k
+\mathbf 1_{\{\tau>k\}}U_k
=W_k .
\end{aligned}
$$
所以 $W$ 是上鞅。从时刻 $n$ 起反复使用条件期望的塔性质，便有
$\mathbb E[W_N\mid\mathcal F_n]\le W_n$ 几乎必然。由于 $\tau\ge n$，有 $W_n=U_n$；由于 $\tau\le N$，有 $W_N=U_\tau$。再结合 $X_\tau\le U_\tau$，得到
$$
\mathbb E[X_\tau\mid\mathcal F_n]
\le\mathbb E[U_\tau\mid\mathcal F_n]\le U_n
$$
几乎必然成立。

对 $\tau_n^*$，由（ii）中的鞅性以及 $Z_n=U_n$、$Z_N=U_{\tau_n^*}$，可得
$\mathbb E[U_{\tau_n^*}\mid\mathcal F_n]=U_n$ 几乎必然。又因 $U_{\tau_n^*}=X_{\tau_n^*}$，故
$\mathbb E[X_{\tau_n^*}\mid\mathcal F_n]=U_n$ 几乎必然。因此所有条件期望收益都以 $U_n$ 为上界，而 $\tau_n^*$ 达到该上界。按本性上确界的定义，$V_n\le U_n$；取 $\tau=\tau_n^*$ 又给出 $V_n\ge U_n$，故 $V_n=U_n$ 几乎必然。对不等式取期望，得到任意 $\tau\in\mathcal T_n$ 都满足 $\mathbb E[X_\tau]\le\mathbb E U_n$，而 $\tau_n^*$ 达到等号，所以 $v_n=\mathbb E U_n=\mathbb E[X_{\tau_n^*}]$。

□

定理 25.19 同时给出了三条彼此等价的后向归纳信息：当前最优价值、继续价值以及首次最优停止时刻。由于每一步只涉及有限次条件期望与逐点取最大值，有限 horizon 的最优停止问题原则上可以沿 $N,N-1,\ldots,0$ 逐步计算，而不必逐一列举所有停时。
将定理 25.19 的恒等式 $V_n=U_n$ 代回定义 25.18，就得到值函数的 Bellman 递推
$$
V_N=X_N,\qquad
V_n=\max\left\{X_n,\mathbb E[V_{n+1}\mid\mathcal F_n]\right\},
\qquad n=N-1,\ldots,0.
\tag{25.30}
$$
事实上，终端时 $V_N=U_N=X_N$。若对某个 $n$ 已有 $V_{n+1}=U_{n+1}$，则由 $V_n=U_n$ 以及式（25.27）可知式（25.30）在该步成立，于是后向归纳覆盖所有时刻。这个递推不是额外假设，而是动态规划最优性原理在停时问题中的表达：继续到下一时刻后仍采用最优规则，与在当前时刻直接比较停止和最优继续完全等价。

实际计算中，常先构造一个候选上鞅和候选停时，再检验它们是否确实最优。下面的验证定理避免重新完成整个后向归纳。

**定理 25.20（最优停止的验证定理）**

固定 $0\le n\le N$。设 $\{Y_k\}_{k=n}^N$ 是适应可积上鞅，且 $Y_k\ge X_k$ 对每个 $k$ 成立。若某个 $\tau\in\mathcal T_n$ 满足 $Y_\tau=X_\tau$，并且停止过程 $\{Y_{k\wedge\tau}\}_{k=n}^N$ 是鞅，则 $Y_n=U_n=V_n$ 几乎必然，且 $\tau$ 是从时刻 $n$ 开始的最优停时，即
$\mathbb E[X_\tau\mid\mathcal F_n]=V_n$ 几乎必然。

**证明**

因为 $Y$ 是支配 $X$ 的适应可积上鞅，定理 25.19（i）的最小性给出 $U_k\le Y_k$ 对 $n\le k\le N$ 成立，特别有 $U_n\le Y_n$。另一方面，停止过程的鞅性给出
$\mathbb E[Y_\tau\mid\mathcal F_n]=Y_n$ 几乎必然。这里使用了 $\tau\ge n$ 和 $\tau\le N$，从而停止过程在初始时刻等于 $Y_n$、在终端时刻等于 $Y_\tau$。结合 $Y_\tau=X_\tau$、定理 25.19（iii）以及 $U_n\le Y_n$，得到
$$
\mathbb E[X_\tau\mid\mathcal F_n]
\le U_n\le Y_n
=\mathbb E[Y_\tau\mid\mathcal F_n]
=\mathbb E[X_\tau\mid\mathcal F_n].
$$
上式两端相同，故所有不等号都必须取等号。因此 $Y_n=U_n$，且 $\mathbb E[X_\tau\mid\mathcal F_n]=U_n$。又由定理 25.19 可知 $V_n=U_n$，所以候选过程确为值函数，候选停时达到条件最优值。取期望还得到 $\mathbb E[X_\tau]=v_n$，故它也是非条件意义下的最优停时。

□
**例 25.6**

设 $N=2$，随机变量 $\xi_1,\xi_2$ 独立，且 $\mathbb P(\xi_i=1)=\mathbb P(\xi_i=-1)=1/2$。令 $\mathcal F_0$ 为平凡 $\sigma$-代数，$\mathcal F_1=\sigma(\xi_1)$，$\mathcal F_2=\sigma(\xi_1,\xi_2)$。收益为 $X_0=1$、$X_1=2$、$X_2=2+\xi_1+\xi_2$。求 Snell 包络、最优停时与最优值。

**解**

终端时 $U_2=X_2$。在时刻 $1$，$\xi_1$ 已经可见而 $\xi_2$ 仍不可见，独立性给出
$\mathbb E[X_2\mid\mathcal F_1]=2+\xi_1$。因此
$$
U_1=\max\{2,2+\xi_1\}
=\begin{cases}
3,&\xi_1=1,\\
2,&\xi_1=-1.
\end{cases}
$$
当 $\xi_1=1$ 时继续价值为 $3$，严格大于停止收益 $2$，故应继续到时刻 $2$；当 $\xi_1=-1$ 时继续价值为 $1$，严格小于停止收益 $2$，故应在时刻 $1$ 停止。于是
$$
\tau_1^*=\begin{cases}
2,&\xi_1=1,\\
1,&\xi_1=-1.
\end{cases}
$$
在初始时刻，$\mathbb E U_1=(3+2)/2=5/2$，所以 $U_0=\max\{1,5/2\}=5/2$。初始立即停止并非最优，完整的最优规则为
$$
\tau_0^*=\begin{cases}
2,&\xi_1=1,\\
1,&\xi_1=-1.
\end{cases}
$$
该规则确实是一个停时，因为 $\{\tau_0^*=1\}=\{\xi_1=-1\}\in\mathcal F_1$，而 $\{\tau_0^*=2\}=\{\xi_1=1\}\in\mathcal F_2$。若 $\xi_1=-1$，则 $X_{\tau_0^*}=X_1=2$；若 $\xi_1=1$，则 $X_{\tau_0^*}=X_2$，且 $\mathbb E[X_2\mid\xi_1=1]=3$。故
$\mathbb E[X_{\tau_0^*}]=(2+3)/2=5/2=\mathbb E U_0$。这与定理 25.19 的最优性结论一致。相比之下，始终等到终端的期望收益为 $\mathbb E X_2=2$，固定在时刻 $1$ 停止的期望收益也为 $2$，二者都严格次于最优值 $5/2$。
### 25.6.3 美式期权的数学表述

考虑由银行存款与风险资产组成的有限 horizon 市场。记 $S_n^0>0$ 为 numeraire 资产价格，$\boldsymbol S_n=(S_n^1,\ldots,S_n^d)$ 为风险资产价格，并设所有价格过程均适应。设市场无套利且完备，$\mathbb Q$ 为等价鞅测度，使 $S_n^i/S_n^0$ 关于 $\mathbb Q$ 为鞅。美式期权赋予持有者在任一时刻 $n$ 获得收益 $h_n(S_n)$ 的权利，其中 $h_n(S_n)$ 适应，且折现收益关于 $\mathbb Q$ 可积。持有者只能选择停时 $\tau\in\mathcal T_0$，并在 $\tau$ 时刻行权。

若行权所得随即投资于 numeraire 并持有到终端，则折现后的终端收益保持不变。完备性保证该收益可以复制，所以采用规则 $\tau$ 的初始无套利价值为 $\mathbb E_{\mathbb Q}[\widetilde X_\tau]$，其中 $\widetilde X$ 是折现行权收益。对时刻 $n$ 尚未行权的期权，定义折现价值过程 $A_n$ 与非折现价格 $P_n$ 为
$$
\widetilde X_n=\frac{h_n(S_n)}{S_n^0},\qquad
A_n=\operatorname*{ess\,sup}_{\tau\in\mathcal T_n}
\mathbb E_{\mathbb Q}[\widetilde X_\tau\mid\mathcal F_n],
\qquad P_n=S_n^0A_n.
\tag{25.31}
$$
定理 25.19 表明，$A$ 正是 $\widetilde X$ 在测度 $\mathbb Q$ 下的 Snell 包络，最优行权时刻为首次满足 $A_k=\widetilde X_k$ 的时刻。区域 $\{A_n>\widetilde X_n\}$ 是继续持有区域，区域 $\{A_n=\widetilde X_n\}$ 是立即行权区域。这里的区域是随机事件；若状态过程具有 Markov 性，它们还可写成状态空间中的继续区域与行权区域。

把式（25.30）用于 $A$ 并乘以 $S_n^0$，可得非折现价格的递推
$$
P_N=h_N(S_N),\qquad
P_n=\max\left\{h_n(S_n),
S_n^0\mathbb E_{\mathbb Q}\left[\frac{P_{n+1}}{S_{n+1}^0}\mid\mathcal F_n\right]\right\}.
$$
括号中的第一项是当前行权价值，第二项是把下一时刻期权价格折现到当前时刻后的继续持有价值。因此，美式期权定价同时确定价格、最优行权规则和提前行权边界，而不能只在终端对 payoff 取条件期望。
在每期无风险总收益为 $1+r$ 的二叉树模型中，若当前股价为 $s$，下一期股价分别以风险中性概率 $q$ 和 $1-q$ 变为 $su$ 和 $sd$。无套利条件为 $0<d<1+r<u$。折现股价的鞅条件
$qu+(1-q)d=1+r$ 唯一确定
$q=(1+r-d)/(u-d)$，且该条件保证 $0<q<1$。若收益只依赖当前股价，则 Markov 性使值函数也只是当前股价的函数。由上述一般递推得到
$$
V_N(s)=h_N(s),\qquad
V_n(s)=\max\left\{h_n(s),
\frac{qV_{n+1}(su)+(1-q)V_{n+1}(sd)}{1+r}\right\},
\qquad n=N-1,\ldots,0.
\tag{25.32}
$$
这里条件期望已经化为两个后继节点上的加权平均。每个节点先计算两个后继价值，再与立即行权收益比较；若后者严格较大，该节点属于行权区域，若前者严格较大，该节点属于继续区域，二者相等时立即停止仍符合式（25.28）的最优规则。

**例 25.7**

在两期二叉树模型中取 $S_0=100$、$u=1.1$、$d=0.9$、$r=0.05$，考虑执行价 $K=100$ 的美式看跌期权，收益为 $h_n(s)=(100-s)^+$。求各节点价值、最优行权规则与初始价格，并计算提前行权溢价。

**解**

风险中性概率为 $q=(1.05-0.9)/(1.1-0.9)=3/4$。终端三个不同股价节点为 $121$、$99$、$81$，相应收益为 $0$、$1$、$19$，故 $V_2(121)=0$、$V_2(99)=1$、$V_2(81)=19$。

在时刻 $1$ 的上升节点，股价为 $110$，立即行权收益为 $0$，继续价值为
$$
\frac{qV_2(121)+(1-q)V_2(99)}{1.05}
=\frac{(3/4)\cdot0+(1/4)\cdot1}{21/20}
=\frac5{21}.
$$
因此 $V_1(110)=5/21$，应继续持有。在时刻 $1$ 的下降节点，股价为 $90$，立即行权收益为 $10$，继续价值为
$$
\frac{qV_2(99)+(1-q)V_2(81)}{1.05}
=\frac{(3/4)\cdot1+(1/4)\cdot19}{21/20}
=\frac{110}{21}.
$$
由于 $10>110/21$，有 $V_1(90)=10$，应立即行权。
最后在初始节点，立即行权收益为 $(100-100)^+=0$，继续价值为
$$
\frac{qV_1(110)+(1-q)V_1(90)}{1.05}
=\frac{(3/4)(5/21)+(1/4)10}{21/20}
=\frac{125}{49}.
$$
故初始美式看跌期权价格为 $V_0(100)=125/49\approx2.5510$。最优规则是在第一期股价下降为 $90$ 时立即行权；若第一期上升为 $110$，则继续持有到终端。第一期已经下降时继续价值仅为 $110/21$，小于立即行权所得 $10$，所以提前行权在这一节点严格优于等待。

也可以直接核对最优规则的折现期望收益。第一期下降的概率为 $1/4$，此时在时刻 $1$ 获得 $10$；先上升后下降的概率为 $q(1-q)=3/16$，此时在终端获得 $1$；连续两次上升的收益为 $0$。因此
$$
\frac14\frac{10}{1.05}
+q(1-q)\frac1{(1.05)^2}
=\frac{50}{21}+\frac{25}{147}
=\frac{125}{49},
$$
与后向归纳的价值完全一致。

作为比较，不允许提前行权的欧式看跌期权只在终端支付。终端收益为 $1$ 的总概率为 $2q(1-q)=3/8$，收益为 $19$ 的概率为 $(1-q)^2=1/16$，故其初始价格为
$$
\frac{2q(1-q)\cdot1+(1-q)^2\cdot19}{(1.05)^2}
=\frac{25/16}{(21/20)^2}
=\frac{625}{441}.
$$
提前行权溢价等于美式与欧式价格之差，即
$$
\frac{125}{49}-\frac{625}{441}
=\frac{500}{441}
\approx1.1338.
$$
溢价严格为正，其来源正是第一期下降节点上立即行权价值严格大于继续价值。
## 25.7 量化应用

停时与鞅把量化研究中的两类问题统一起来：一类询问在现有信息下未来收益是否仍含可系统利用的部分，另一类询问何时执行交易、行权或停止试验。本节始终区分客观概率与定价概率，并把每条交易规则明确写成关于既有信息的可测条件，以避免把事后才知道的数据带入决策。

### 25.7.1 有效市场与鞅

设在离散时刻 $0,1,\ldots,N$ 上，$\mathcal F_n$ 表示时刻 $n$ 已公开且可用于决策的信息。无风险账户为 $B_n>0$，风险资产价格为 $\boldsymbol S_n$，折现价格记为 $\widetilde{\boldsymbol S}_n=\boldsymbol S_n/B_n$。若 $\widetilde{\boldsymbol S}_n$ 是鞅，则其下一期条件期望等于当前值。这不是说价格不变，也不是说收益率没有波动，而是说折现价格增量在给定当前信息后没有方向性偏差。

考虑可允许策略 $\boldsymbol\theta_n$，其中 $\boldsymbol\theta_n$ 表示在时刻 $n$ 调整后持有至下一时刻的资产头寸。禁止使用未来信息意味着 $\boldsymbol\theta_n$ 关于 $\mathcal F_n$ 可测，即持仓序列关于价格 filtration 是可料的。自融资组合的折现价值满足
$$
\widetilde V_n=V_0+\sum_{k=0}^{n-1}\boldsymbol\theta_k^\top
(\widetilde{\boldsymbol S}_{k+1}-\widetilde{\boldsymbol S}_k).
$$
因此，组合价值是价格鞅的可料变换。以下结论正是“公平博弈中不能靠重新下注制造优势”的数学形式。

若每个 $\widetilde{\boldsymbol S}_n$ 可积，$\boldsymbol\theta_n$ 有界且关于 $\mathcal F_n$ 可测，并且各折现价格均为鞅，则 $\widetilde V_n$ 是鞅。

**证明**

初始值 $V_0$ 可积，且有界头寸与可积价格增量的乘积可积，故归纳可得每个 $\widetilde V_n$ 可积。由于求和式中的各项关于 $\mathcal F_n$ 可测，$\widetilde V_n$ 是适应过程。对任意 $0\le n<N$，由自融资恒等式，
$$
\mathbb E[\widetilde V_{n+1}\mid\mathcal F_n]
=\widetilde V_n+\mathbb E[\boldsymbol\theta_k^\top
(\widetilde{\boldsymbol S}_{k+1}-\widetilde{\boldsymbol S}_k)\mid\mathcal F_n],
$$
其中右端求和指标的准确写法为 $k=n$。因为 $\boldsymbol\theta_n$ 关于 $\mathcal F_n$ 可测且有界，可将其提出条件期望；再由折现价格的鞅性，价格增量的条件期望为零。于是 $\mathbb E[\widetilde V_{n+1}\mid\mathcal F_n]=\widetilde V_n$，所以 $\widetilde V_n$ 为鞅。

□

证明中的可料性不可改成一般的适应性：若允许用 $\mathcal F_{n+1}$ 决定 $\boldsymbol\theta_n$，条件期望就不能按上述方式提出，结论会包含并不存在的后见收益。可积性同样不可省略，因为无界策略可能使组合增量无法定义期望。
### 25.7.2 可料性的统一约定

上一小节把在时刻 $n$ 调整后持有至下一时刻的头寸记为 $\boldsymbol \theta_n$，并要求它关于 $\mathcal F_n$ 可测。这一条件本身足以保证鞅性，但按离散时间的通常索引约定，它描述的是适应持仓；可料持仓应把同一头寸改记为 $\boldsymbol \theta_{n+1}$。上一小节条件期望中的一般求和指标 $k$ 也应固定为 $n$。为消除这两种歧义，以下表述替换相应的指标写法。

将在区间 $(n,n+1]$ 内持有的头寸记为 $\boldsymbol \theta_{n+1}$，并要求它关于 $\mathcal F_n$ 可测。若各分量有界，则序列 $\{\boldsymbol \theta_{n+1}\}_{n\ge0}$ 是有界可料过程。相应的折现自融资恒等式为
$$
\widetilde V_n=\frac{V_0}{B_0}+\sum_{k=0}^{n-1}
\boldsymbol \theta_{k+1}^\top
(\widetilde{\boldsymbol S}_{k+1}-\widetilde{\boldsymbol S}_k),
\qquad 0\le n\le N .
\tag{25.33}
$$
当 $B_0=1$ 时，式（25.33）的初项就是 $V_0$。在这一约定下，有界可料策略的折现收益仍是鞅。

**证明**

由价格可积、头寸有界以及 $V_0$ 可积，归纳可知每个 $\widetilde V_n$ 可积。式（25.33）右端截至时刻 $n$ 的各项均为已知信息，因此 $\widetilde V_n$ 关于 $\mathcal F_n$ 可测。对任意 $0\le n<N$，由 $\boldsymbol \theta_{n+1}$ 关于 $\mathcal F_n$ 可测以及价格增量的条件期望为零，得到
$$
\mathbb E[\widetilde V_{n+1}-\widetilde V_n\mid \mathcal F_n]
=\boldsymbol \theta_{n+1}^\top
\mathbb E[\widetilde{\boldsymbol S}_{n+1}-\widetilde{\boldsymbol S}_n\mid \mathcal F_n]
=0 .
\tag{25.34}
$$
故 $\mathbb E[\widetilde V_{n+1}\mid \mathcal F_n]=\widetilde V_n$，从而 $\widetilde V_n$ 是鞅。

□

这一证明还说明，可料性、自融资性和可积性分别排除了后见交易、外部注资以及期望无定义的问题；三者不能相互替代。

### 25.7.3 回测与序贯停止

量化回测中的信息必须按时间重建。时刻 $n$ 的信号、参数和持仓只能由 $\mathcal F_n$ 中的数据决定；若参数先从全样本估计，再回头生成同一时期的交易，所得收益通常不再是任何真实信息结构下的可料变换。训练样本、验证样本与最终检验样本的时间顺序，因而不是操作细节，而是鞅论证能否适用的前提。

停时也描述了策略退出和风险限制。设 $R_n$ 为折现累计收益，$D_n$ 为截至时刻 $n$ 的回撤，预先给定 $a,b>0$，定义
$$
\tau=\inf\{0\le n\le N:R_n\le-a\ \mathrm{or}\ D_n\ge b\}\wedge N .
\tag{25.35}
$$
由于 $\{\tau=n\}$ 只取决于截至时刻 $n$ 的收益路径，$\tau$ 是停时。若阈值会调整，则每次调整所用的新阈值也必须由当时信息决定。式（25.35）只规定何时停止，并不保证亏损一定不超过 $a$；价格跳空和停止当期的收益仍可能越过阈值。

序贯检验允许研究者持续观察证据，而无需把显著性分析绑定在固定样本量上。设原假设下的 $M_n$ 是初值为 $1$ 的非负鞅，对 $0<\alpha<1$ 定义首次越界时刻 $\tau_\alpha=\inf\{n\ge0:M_n\ge\alpha^{-1}\}$。由非负鞅的极大不等式，
$$
\mathbb P_0(\tau_\alpha<\infty)\le\alpha .
\tag{25.36}
$$
因此，以 $M_n\ge\alpha^{-1}$ 为拒绝规则的序贯程序，在任意观察时刻都保持事先规定的错误概率上界。这里的 $\mathbb P_0$ 表示原假设下的概率；该结论控制的是第一类错误，并不自动给出检验功效或平均停止时间。

这一性质不能与普通固定样本检验的反复查看混同。如果每个时刻都套用只对固定样本设计的临界值，多次决策会改变总体错误概率。类似地，从大量候选策略中挑出回测收益最高者，再把它当作单一预先指定策略，也会破坏原有的概率解释。候选集合、选择规则和最终评估必须纳入同一信息结构，必要时使用独立样本外数据。

最后，可选停时定理只说明在满足有界停止、一致可积或其他可积条件时，停止不会凭空创造期望收益。它既不排除停止前的路径风险，也不把原假设下的鞅性质当作任意备选假设下的预测结论。

### 25.7.4 鞅差、交易成本与统计推断

鞅差为收益建模提供了比独立性更精确的语言。若 $D_n=X_n-X_{n-1}$ 可积且 $\mathbb E[D_n\mid \mathcal F_{n-1}]=0$，则 $D_n$ 是鞅差。它可以在不同时刻具有不同方差，也可以表现出波动率聚集；鞅差只排除基于既有信息的条件方向性偏差，并不要求边际分布相同，更不要求序列独立。

这一结构也支撑大样本推断。对鞅差阵列 $D_{n,k}$，若条件方差之和依概率收敛到常数 $\sigma^2>0$，并且标准化后的 Lindeberg 条件成立，则鞅差中心极限定理给出
$$
\frac{1}{\sigma}\sum_{k=1}^{m_n}D_{n,k}\xrightarrow{d}\mathcal N(0,1) .
\tag{25.37}
$$
实际使用时，必须分别核验条件均值为零、条件方差稳定和渐近可忽略性。仅由样本收益不相关，不能反推鞅差性质；仅由样本方差有限，也不能推出正态极限。若信息集或头寸随估计过程改变，还应重新检查相应条件期望与可料性。

交易成本进一步区分理论鞅与可实现损益。不计成本时，折现价格鞅的有界可料变换保持零条件漂移；计入手续费、买卖价差和冲击成本后，组合增量等于价格增益减去成本项，通常不再是鞅。成本越依赖于未来成交价或未来波动，越需要谨慎处理执行时刻的信息结构，不能用理论中间价掩盖不可成交的收益。

客观概率与定价概率在此承担不同任务。风险中性定价使用折现价格的鞅性计算无套利价值；实证研究则在客观概率下考察收益、风险和预测能力。某个资产在定价测度下折现后为鞅，并不意味着其客观收益没有风险溢价，也不意味着任意交易策略都能获得正期望。

因此，鞅方法在量化研究中的作用不是提供必然获利的规则，而是把信息限制、收益分解和概率误差写成可核验的条件。停时规定何时行动，可料性规定能够使用什么数据，一致可积与矩条件保证极限和期望可以交换；只有这些条件同时明确，回测、行权和序贯监控的结论才具有相应意义。

## 本章小结

本章以信息流为起点，把鞅、停时与最优停止放在同一框架中。适应性描述过程已经实现的信息，可料性描述决策在行动前能够获得的信息，停时则要求是否停止这一事件在当期即可判定。鞅的条件期望性质并不排除波动，也不意味着增量独立；它准确表达的是，在既定信息和可积条件下，未来增量没有可利用的条件方向性偏差。

可选停时定理说明，在有界停止或其他适当可积条件下，公平博弈不会因选择退出时刻而改变期望。Doob 极大不等式把终端矩转化为整条路径最大值的控制，上穿不等式则以有限区间穿越次数排除了持续振荡，并由此建立鞅收敛。$L^1$ 有界给出几乎必然收敛，一致可积进一步保证 $L^1$ 收敛和条件期望表示，平方可积鞅还可利用增量正交性研究 $L^2$ 收敛。这些结论各自依赖的条件不能省略，尤其不能把几乎必然有限停止直接当作有界停止。

Snell 包络把最优停止转化为后向递推：在每个节点比较立即收益与继续价值，取两者较大者，并由首次达到立即收益的停时构造最优规则。折现价格鞅使这一方法自然适用于美式期权，价值过程在尚未行权时保持鞅性，在整个可行行权集合上则提供上确界。提前行权溢价来自继续价值与立即收益之间的严格差异，而不是来自对未来价格的事后选择。

在量化应用中，自融资组合是折现价格鞅的可料变换，因而可料性、自融资性和可积性共同排除了后见收益、外部注资与期望无定义。回测必须保留时间顺序，序贯监控必须使用适用于持续观察的概率界，交易成本与执行约束也必须进入收益方程。鞅差中心极限定理进一步把条件均值为零、条件方差稳定和 Lindeberg 条件同渐正态推断联系起来。贯穿全章的核心原则是：任何关于停止、收敛、定价或交易优势的结论，都必须同时说明信息结构、概率测度和可积条件。

## 习题

1. 设 $\tau,\sigma$ 为同一信息流下的停时。证明 $\tau\wedge\sigma$、$\tau\vee\sigma$ 与 $\tau+\sigma$ 均为停时；若 $\tau\le\sigma$，再证明 $\mathcal F_\tau\subseteq\mathcal F_\sigma$。构造例子说明 $\tau-1$ 一般不必是停时。

2. 设 $S_n$ 是从 $0$ 出发的对称简单随机游走，$\tau=\inf\{n\ge1:|S_n|=2\}$。证明 $\tau$ 几乎必然有限，计算 $\mathbb P(\tau=2k)$（$k\ge1$）、$\mathbb E\tau$，并求 $0<s<1$ 时的生成函数 $\mathbb E[s^\tau]$。

3. 设 $\xi_1,\xi_2,\ldots$ 独立同分布，$\mathbb E\xi_i=0$，$\operatorname{Var}(\xi_i)=\sigma^2<\infty$，$S_n=\sum_{i=1}^n\xi_i$ 且 $S_0=0$。关于自然信息流验证 $S_n$ 与 $S_n^2-n\sigma^2$ 都是鞅，并说明每个结论分别使用了哪些独立性、可测性和可积性条件。

4. 设独立同分布随机变量 $\xi_i$ 的矩母函数 $M(\lambda)=\mathbb E[e^{\lambda\xi_i}]$ 对某个 $\lambda\ne0$ 有限，$S_n=\sum_{i=1}^n\xi_i$。验证 $Z_n=e^{\lambda S_n}/M(\lambda)^n$ 是鞅；对任意有界停时 $\tau$，计算 $\mathbb E Z_\tau$，并说明直接使用有界停止结论所需的核验步骤。

5. 设 $M_n$ 为鞅，停时 $\tau$ 满足 $\tau\le N$。不引用可选停时定理，利用 $M_\tau=\sum_{n=0}^N M_n\mathbf 1_{\{\tau=n\}}$ 完整证明 $\mathbb E M_\tau=\mathbb E M_0$。若 $M_n$ 只是上鞅，证明相应的不等式，并构造一个 $\tau$ 几乎必然有限但无界的例子，使鞅停止后的期望等式失效。

6. 设 $\xi_i$ 独立同分布，$\mathbb E\xi_i=\mu$，$S_n=\sum_{i=1}^n\xi_i$，停时 $\tau$ 满足 $\mathbb E\tau<\infty$，并设停止过程满足取极限所需的一致可积条件。证明 Wald 恒等式 $\mathbb E S_\tau=\mu\mathbb E\tau$；若再有 $\mu=0$ 且 $\operatorname{Var}(\xi_i)=\sigma^2<\infty$，证明 $\mathbb E S_\tau^2=\sigma^2\mathbb E\tau$。说明有界停止情形如何过渡到一般情形。

7. 对称随机游走 $S_n$ 从 $0$ 出发，每一步以相同概率移动 $1$ 或 $-1$。给定正整数 $a,b$，令 $\tau=\inf\{n\ge0:S_n\in\{-a,b\}\}$。计算 $\mathbb P(S_\tau=b)$ 与 $\mathbb E\tau$，并用鞅方法完整论证；推导中须处理 $\tau$ 无界以及停止过程取极限的问题。

8. 将第 7 题的随机游走改为向上概率 $p$、向下概率 $q=1-p$，其中 $p\ne q$。利用 $(q/p)^{S_n}$ 与 $S_n-(p-q)n$ 的鞅性，计算 $\mathbb P(S_\tau=b)$ 和 $\mathbb E\tau$，并检查 $p\to1/2$ 时的表达式是否趋于对称赌徒破产问题的结果。

9. 设 $M_0,\ldots,M_N$ 为鞅，$\lambda>0$。通过首次越过 $\lambda$ 的停时证明 Doob 极大不等式 $\lambda\mathbb P(\max_{0\le n\le N}|M_n|\ge\lambda)\le\mathbb E|M_N|$，并说明为何可先将问题化为非负下鞅的最大值估计。

10. 设 $M_0,\ldots,M_N$ 为鞅，$p>1$ 且 $M_N\in L^p$。利用第 9 题和分层积分证明 $\mathbb E[\max_{0\le n\le N}|M_n|^p]\le(p/(p-1))^p\mathbb E|M_N|^p$，并明确写出每一步所用的可积性依据。

11. 设 $X_0,\ldots,X_N$ 为下鞅，$a<b$，$U_N([a,b])$ 表示截至时刻 $N$ 完成的上穿次数。从可料的上穿投资策略出发，证明 Doob 上穿不等式 $(b-a)\mathbb E U_N([a,b])\le\mathbb E[(X_N-a)^+]$，并解释停止区间端点处的收益为何不会破坏估计。

12. 设 $X_n$ 为下鞅且 $\sup_n\mathbb E|X_n|<\infty$。利用第 11 题证明存在可积随机变量 $X_\infty$，使得 $X_n\to X_\infty$ 几乎必然。进一步构造满足这些条件的鞅，使其几乎必然收敛却不按 $L^1$ 收敛，并指出一致可积性在哪一步失效。

13. 两期二叉树模型的初始股价为 $S_0=100$，每期上涨因子为 $u=1.2$，下跌因子为 $d=0.8$，每期无风险总回报为 $1.05$，不支付红利。对执行价 $K=100$ 的美式看跌期权，计算风险中性概率、各节点的期权价值与最早最优行权规则；再计算相应欧式看跌期权价值及提前行权溢价。

14. 在有限期限 $0,\ldots,N$ 上，设 $Y_n$ 为适应且可积的行权收益，递推定义 $Z_N=Y_N$ 与 $Z_n=\max\{Y_n,\mathbb E[Z_{n+1}\mid \mathcal F_n]\}$。证明 $Z_n$ 是控制 $Y_n$ 的最小上鞅。令 $\tau^*=\inf\{n:Z_n=Y_n\}$，验证 $\tau^*$ 是停时，证明 $Z_{n\wedge\tau^*}$ 是鞅，并证明 $\mathbb E Y_{\tau^*}=\sup_{\tau\le N}\mathbb E Y_\tau$，其中上确界取遍所有停时。

15. 设原假设 $\mathbb P_0$ 下 $M_n$ 是初值为 $1$ 的非负鞅，给定 $0<\alpha<1$，定义 $\tau_\alpha=\inf\{n\ge0:M_n\ge\alpha^{-1}\}$。证明序贯拒绝规则满足 $\mathbb P_0(\tau_\alpha<\infty)\le\alpha$。再证明，即使只在某个随机但有界的观察期限之前允许拒绝，第一类错误概率仍不超过 $\alpha$。

16. 在原假设下，$Y_i$ 独立同分布且服从参数 $1/2$ 的 Bernoulli 分布，$S_n=\sum_{i=1}^nY_i$。对固定的 $p\in(0,1)$，验证 $M_n(p)=2^np^{S_n}(1-p)^{n-S_n}$ 是鞅。给定 $A>1$，将 $\tau_A=\inf\{n:M_n(p)\ge A\}$ 的越界条件改写成 $S_n$ 的线性阈值，证明 $\mathbb P_0(\tau_A<\infty)\le A^{-1}$，并计算 $\mathbb E_0M_{n\wedge\tau_A}(p)$。

17. 设 $M_n$ 为一致可积鞅。证明存在 $M_\infty\in L^1$，使得 $M_n\to M_\infty$ 几乎必然且按 $L^1$ 收敛，并有 $M_n=\mathbb E[M_\infty\mid \mathcal F_n]$。反之，若 $X\in L^1$ 且 $M_n=\mathbb E[X\mid \mathcal F_n]$，证明 $M_n$ 一致可积。由此给出封闭鞅与一致可积鞅的等价刻画。

18. 设 $M_n$ 为平方可积鞅且 $\sup_n\mathbb E M_n^2<\infty$。证明不同鞅差在 $L^2$ 中正交，并证明存在 $M_\infty\in L^2$，使得 $M_n\to M_\infty$ 按 $L^2$ 收敛且几乎必然收敛。再证明 $M_n=\mathbb E[M_\infty\mid \mathcal F_n]$，并说明仅有几乎必然收敛时为何不能自动交换条件期望与极限。

19. 设 $\xi_i$ 独立同分布，$\mathbb E\xi_i=0$，$\operatorname{Var}(\xi_i)=\sigma^2>0$。对 $1\le k\le n$ 定义鞅差阵列 $D_{n,k}=\xi_k/(\sigma\sqrt n)$。逐项核验鞅差中心极限定理的条件方差收敛条件与 Lindeberg 条件，并给出 $\sum_{k=1}^nD_{n,k}$ 的极限分布。若把独立性弱化为两两不相关，说明上述验证为何一般不再成立。

20. 设标量折现价格 $S_n$ 为鞅，$\theta_{k+1}$ 有界且关于 $\mathcal F_k$ 可测，定义 $G_n=\sum_{k=0}^{n-1}\theta_{k+1}(S_{k+1}-S_k)$。证明 $G_n$ 为鞅。再在单期非退化模型中构造一个依赖 $S_1$ 而非仅依赖 $\mathcal F_0$ 的头寸，使相应期末收益具有严格正期望，并解释这一构造为何不属于可料交易。

21. 沿用第 20 题的记号，证明对任意停时 $\tau$ 和固定期限 $N$，均有 $\mathbb E G_{\tau\wedge N}=0$。构造折现价格鞅、有界可料策略以及几乎必然有限但无界的 $\tau$，使 $\mathbb E G_\tau\ne0$。据此说明，为何“设置止损停时”本身不能推出停止后期望收益仍等于初始值。

22. 将 $D_k$ 解释为扣除可料补偿后的交易损益，设其为鞅差，$\sigma_k^2=\operatorname{Var}(D_k\mid \mathcal F_{k-1})$ 有限。令 $S_n=\sum_{k=1}^nD_k$，$V_n=\sum_{k=1}^n\sigma_k^2$，$v_n=\mathbb E V_n$，并设 $v_n\to\infty$、$V_n/v_n\to1$ 依概率成立，且对每个 $\varepsilon>0$，$v_n^{-1}\sum_{k=1}^n\mathbb E[D_k^2\mathbf 1_{\{|D_k|>\varepsilon\sqrt{v_n}\}}]\to0$。利用鞅差中心极限定理证明 $S_n/\sqrt{v_n}\xrightarrow{d}\mathcal N(0,1)$，并在 $V_n>0$ 几乎必然时推导自标准化形式。最后构造例子说明，把固定 $n$ 换成依赖全路径的随机停止时刻后，正态近似可能失效。
