# 第26章　Brown 运动、二次变差与 Itô 积分

前面各章的离散时间框架用求和与条件期望处理随机序列。从本章起进入连续时间：时间取遍 $[0,\infty)$，资产价格成为连续的随机路径，求和让位于积分。连续时间量化金融的全部大厦——第27章的随机微分方程、第33章的风险中性定价——都建立在两块基石之上：一个随机过程，Brown 运动；一个基本事实，它在 $[0,T]$ 上的二次变差恰为 $T$。本部分（26.1–26.3 节）奠定地基：26.1 节给出 Brown 运动的严格定义，推导其分布性质、标度不变性与 Brown 桥，并完整证明路径的几乎必然不可微性；26.2 节引入一阶变差与二次变差，完整证明本章中心定理——Brown 运动一阶变差无穷而二次变差恰为 $T$；26.3 节说明 Riemann–Stieltjes 积分为何对 Brown 路径失效、被积函数为何必须取左端点，以及 Itô 与 Stratonovich 两种积分的差别。26.4–26.7 节（后段）完成 Itô 积分的构造、Itô 公式与量化应用。

全章的逻辑主线是：独立正态增量迫使路径以 $\sqrt{\Delta t}$ 的尺度抖动——粗糙到不可微、无界变差，其平方却累积成一个确定的量。这种「粗糙而平方可积」的结构，是随机微积分区别于经典微积分的一切差异的共同根源。

## 26.1 Brown 运动的定义与性质

Brown 运动的数学理论由 Bachelier（1900）研究期权定价时开创、Wiener（1923）以严格概率模型完成。现代观点下，Brown 运动是简单随机游走的标度极限（Donsker 不变原理，属弱收敛理论，本书不展开）：设 $\xi_1,\xi_2,\dots$ 独立且以概率 $1/2$ 取值 $\pm1$，$S_k=\xi_1+\cdots+\xi_k$，则步长与时间步长同按 $1/\sqrt n$ 尺度化后的过程

$$W^{(n)}_t=\frac{1}{\sqrt n}S_{\lfloor nt\rfloor},\qquad t\ge0,$$

当 $n\to\infty$ 时依分布收敛于标准 Brown 运动。归一化因子 $1/\sqrt n$ 正是第14章中心极限定理的 $\sqrt t$ 规律的体现，也预示了贯穿全章的基本量级关系 $|\Delta B|\sim\sqrt{\Delta t}$。

**定义 26.1（Brown 运动）**

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间。实值随机过程 $\{B_t\}_{t\ge0}$ 称为标准 Brown 运动（或 Wiener 过程），若满足以下四条：

1. $B_0=0$ 几乎必然；
2. 对任意 $0\le t_0<t_1<\cdots<t_n$，增量 $B_{t_1}-B_{t_0},\ B_{t_2}-B_{t_1},\ \dots,\ B_{t_n}-B_{t_{n-1}}$ 相互独立（独立增量）；
3. 对任意 $0\le s<t$，$B_t-B_s\sim N(0,t-s)$（增量服从平稳正态分布）；
4. 几乎每条样本路径 $t\mapsto B_t(\omega)$ 是 $[0,\infty)$ 上的连续函数（路径连续）。

条件 2 与 3 完全决定了过程的一切有限维分布，条件 4 是对路径的正则性要求。下面将看到，正是这一正则性引出 Brown 运动分析上的全部丰富性：连续，却几乎必然处处不可微。

为使定义不落于空集，先确认对象存在。

**定理 26.2（Brown 运动的存在性）**

存在概率空间 $(\Omega,\mathcal F,\mathbb P)$ 及定义其上的过程 $\{B_t\}_{t\ge0}$，满足定义 26.1 的四条性质。

**证明**

构造分两步，各引用一个测度论概率的深层结果；其完整证明见测度论概率标准教材（如 Karatzas–Shreve《Brownian Motion and Stochastic Calculus》第二章），此处给出构造骨架与可直接完成的验证，并明确标出两处引用。

第一步：有限维分布。对任意 $0=t_0<t_1<\cdots<t_n$，规定 $(B_{t_1},\dots,B_{t_n})$ 的联合分布为均值零、协方差矩阵 $\Sigma_{ij}=t_i\wedge t_j$ 的 $n$ 维正态分布。等价地，令 $X_1,\dots,X_n$ 独立、$X_i\sim N(0,t_i-t_{i-1})$，置 $B_{t_k}=X_1+\cdots+X_k$，则 $\operatorname{Cov}(B_{t_i},B_{t_j})=\sum_{l\le i\wedge j}\operatorname{Var}(X_l)=t_i\wedge t_j$，两种规定一致。这族规定满足相容性条件：对坐标子集取边缘分布恰得相应时间子集的规定，因为正态分布的边缘仍是正态且协方差按子矩阵截取。Kolmogorov 延拓定理（第一处引用）保证存在 $\mathbb R^{[0,\infty)}$ 上以之为有限维分布的过程 $\{B_t\}$，它自动满足定义 26.1 的第 1–3 条。

第二步：连续修正。第一步的过程路径先验任意，用 Lévy–Kolmogorov 连续性判据（第二处引用）：若存在常数 $\alpha,\beta,K>0$ 使对一切 $s,t$ 有

$$\mathbb E\bigl[|B_t-B_s|^{\alpha}\bigr]\le K|t-s|^{1+\beta},$$

则过程存在路径几乎必然局部 Hölder 连续（阶小于 $\beta/\alpha$）的修正。取 $\alpha=4$：由 $B_t-B_s\sim N(0,t-s)$ 与标准正态四阶矩 $\mathbb E[Z^4]=3$，得 $\mathbb E[|B_t-B_s|^4]=3|t-s|^2$，条件以 $\beta=1$、$K=3$ 成立。修正不改变有限维分布，故第 1–3 条保持，第 4 条由构造成立。

□

以下命题汇集 Brown 运动最基本的分布事实。记 $\Phi$ 为标准正态分布函数，$s\wedge t=\min\{s,t\}$。

**命题 26.3（一维分布、协方差与转移密度）**

设 $\{B_t\}$ 为标准 Brown 运动，则：

1. 对 $t>0$，$B_t\sim N(0,t)$，即对任意 Borel 集 $A$，

$$\mathbb P(B_t\in A)=\int_A\frac{1}{\sqrt{2\pi t}}\,e^{-x^2/(2t)}\,\mathrm dx. \tag{26.1}$$

2. 协方差函数为

$$\mathbb E[B_sB_t]=s\wedge t,\qquad s,t\ge0. \tag{26.2}$$

3. 对 $0\le s<t$ 与任意有界可测函数 $\varphi$，在 $B_s=x$ 的条件下（按正则条件分布理解），

$$\mathbb E\bigl[\varphi(B_t)\mid B_s=x\bigr]=\int_{\mathbb R}\varphi(y)\,p(t-s,x,y)\,\mathrm dy,\qquad p(\tau,x,y)=\frac{1}{\sqrt{2\pi\tau}}\,e^{-(y-x)^2/(2\tau)}. \tag{26.3}$$

$p$ 称为 Brown 运动的转移密度：它把「时刻 $s$ 取值 $x$」到「时刻 $t$ 的分布」的演化完全确定。

4. （对称性）$\{-B_t\}_{t\ge0}$ 也是标准 Brown 运动。

**证明**

第 1 条：取 $s=0$，由 $B_0=0$ 与定义 26.1 第 3 条得 $B_t=B_t-B_0\sim N(0,t)$，(26.1) 即其密度表达。

第 2 条：设 $s\le t$。写 $B_t=B_s+(B_t-B_s)$；增量 $B_t-B_s$ 落在区间 $(s,t]$ 上，与落在 $(0,s]$ 上的增量 $B_s$ 独立，故

$$\mathbb E[B_sB_t]=\mathbb E\bigl[B_s^2\bigr]+\mathbb E\bigl[B_s(B_t-B_s)\bigr]=\mathbb E\bigl[B_s^2\bigr]+\mathbb E[B_s]\,\mathbb E[B_t-B_s]=s+0=s=s\wedge t.$$

第 3 条：$B_t=B_s+(B_t-B_s)$，其中增量与 $B_s$ 独立且服从 $N(0,t-s)$。对独立随机变量之和，条件于 $B_s=x$ 即把 $x$ 代入：$B_t$ 的条件分布为 $N(x,t-s)$，其密度即 (26.3)，代入 $\varphi$ 的期望即得所式。

第 4 条：令 $X_t=-B_t$。$X_0=0$；对不相交区间，$X$ 的增量是 $B$ 相应增量的相反数，独立性保持，且 $-(B_t-B_s)\sim N(0,t-s)$（正态密度关于零对称）；路径是连续函数的常数倍，仍连续。四条逐一验证。

□

**例 26.1**

设 $\{B_t\}$ 为标准 Brown 运动。计算：(a) $\mathbb P(B_3>2)$；(b) $\mathbb P(B_1+B_2>2)$；(c) 在 $B_5=3$ 的条件下 $B_2$ 的条件分布。

**解**

(a) 由式 (26.1)，$B_3\sim N(0,3)$，故

$$\mathbb P(B_3>2)=1-\Phi\!\left(\frac{2}{\sqrt3}\right)=1-\Phi(1.1547)\approx 1-0.8759=0.1241.$$

(b) $(B_1,B_2)$ 是独立正态增量 $(B_1,\,B_2-B_1)$ 的线性变换，故为二元正态，其线性组合 $B_1+B_2$ 服从正态分布且均值为零。由式 (26.2)，$\operatorname{Cov}(B_1,B_2)=1$，于是

$$\operatorname{Var}(B_1+B_2)=\operatorname{Var}(B_1)+\operatorname{Var}(B_2)+2\operatorname{Cov}(B_1,B_2)=1+2+2=5,$$

即 $B_1+B_2\sim N(0,5)$，从而

$$\mathbb P(B_1+B_2>2)=1-\Phi\!\left(\frac{2}{\sqrt5}\right)=1-\Phi(0.8944)\approx 1-0.8144=0.1856.$$

(c) 写 $B_2=\frac25B_5+\bigl(B_2-\frac25B_5\bigr)$，令 $U=B_2-\frac25B_5$。$U$ 与 $B_5$ 都是 $(B_2,B_5)$ 的线性组合，故联合正态，且由式 (26.2)（$\operatorname{Cov}(B_2,B_5)=2$，$\operatorname{Var}(B_5)=5$）

$$\operatorname{Cov}(U,B_5)=\operatorname{Cov}(B_2,B_5)-\frac25\operatorname{Var}(B_5)=2-2=0,$$

$$\operatorname{Var}(U)=\operatorname{Var}(B_2)-\frac45\operatorname{Cov}(B_2,B_5)+\frac{4}{25}\operatorname{Var}(B_5)=2-\frac85+\frac45=\frac65.$$

第12章的多元正态理论表明，联合正态时不相关即独立，故 $U\sim N(0,6/5)$ 且与 $B_5$ 独立。于是在 $B_5=3$ 的条件下，

$$B_2=\frac25\times3+U\ \sim\ N\!\left(\frac65,\ \frac65\right).$$

条件均值 $\frac65=\frac25\times3$ 是端点值按时间比例的线性插值，条件方差 $\frac65$ 是「插值之外的桥形波动」。这一分解正是定义 26.5 的 Brown 桥的结构：知道两端，中间的不确定性由桥承担。

**命题 26.4（标度不变性与对称性）**

设 $\{B_t\}$ 为标准 Brown 运动，$c>0$。则

$$X_t=\frac{1}{\sqrt c}\,B_{ct},\qquad t\ge0 \tag{26.4}$$

也是标准 Brown 运动。特别地，Brown 运动在「时间放大 $c$ 倍、空间缩小 $\sqrt c$ 倍」下分布不变。

**证明**

$X_0=c^{-1/2}B_0=0$。对 $0\le s<t$，增量 $X_t-X_s=c^{-1/2}(B_{ct}-B_{cs})$ 是 $N(0,c(t-s))$ 的常数倍，即 $N(0,t-s)$；不相交区间上的 $X$ 增量对应时间轴上不相交区间 $[cs,ct]$ 上的 $B$ 增量，独立性保持；路径是连续路径与线性映射的复合，仍连续。定义 26.1 四条逐一成立。

□

标度不变性给出量级关系 $|\Delta B|\sim\sqrt{\Delta t}$ 的精确含义：无论把时间尺度怎样放大，路径的统计形态不变，因而「放大后变光滑」的期望永远落空——这与定理 26.6 的不可微性互为表里。与它相近的还有时间反演：令 $X_0=0$、$X_t=tB_{1/t}$（$t>0$），直接计算可得 $\mathbb E[X_sX_t]=st\,(1/s\wedge1/t)=s\wedge t$，且 $(X_{t_1},\dots,X_{t_n})$ 是正态向量的线性变换仍为正态，故 $X$ 与 Brown 运动有相同的有限维分布；要断言 $X$ 是 Brown 运动还需证 $\lim_{t\downarrow0}X_t=0$ 几乎必然，这等价于强大数律 $\lim_{t\to\infty}B_t/t=0$，其证明用 Borel–Cantelli 引理与正态尾界，本书不展开。

**定义 26.5（Brown 桥）**

设 $\{B_t\}_{0\le t\le1}$ 为标准 Brown 运动。过程

$$W_t=B_t-tB_1,\qquad 0\le t\le1$$

称为 Brown 桥。它满足 $W_0=W_1=0$，可直观理解为两端被钉住的 Brown 路径，即「条件于 $B_1=0$ 的 Brown 运动」的严格化（这一条件化按正则条件分布理解；例 26.1(c) 已展示了相应的高斯结构）。Brown 桥是零均值 Gauss 过程，因而是由其协方差函数完全决定的。

**例 26.2**

求 Brown 桥 $W_t=B_t-tB_1$ 的协方差函数，并证明 $W$ 的增量不独立。

**解**

对固定的 $s,t$，$(W_s,W_t)$ 是 $(B_s,B_t,B_1)$ 的线性变换，故为二元正态。由协方差双线性与式 (26.2)（注意 $\operatorname{Cov}(B_s,B_1)=s\wedge1=s$，$\operatorname{Cov}(B_t,B_1)=t$，$\operatorname{Var}(B_1)=1$），

$$\operatorname{Cov}(W_s,W_t)=\operatorname{Cov}(B_s,B_t)-t\operatorname{Cov}(B_s,B_1)-s\operatorname{Cov}(B_t,B_1)+st\operatorname{Var}(B_1)=s\wedge t-st. \tag{26.5}$$

取 $s=t$ 得 $\operatorname{Var}(W_t)=t(1-t)$：在两端为零，在 $t=1/2$ 处达到最大 $1/4$——桥在中间摆动最大，符合「两端钉住」的图像。

再验证增量不独立。取 $s=\frac14$、$t=\frac12$、$u=\frac34$，若增量独立则 $W_{1/2}-W_{1/4}$ 与 $W_{3/4}-W_{1/2}$ 应当不相关。由式 (26.5) 逐项计算：$\operatorname{Cov}(W_{1/2},W_{3/4})=\frac12-\frac38=\frac18$，$\operatorname{Var}(W_{1/2})=\frac14$，$\operatorname{Cov}(W_{1/4},W_{3/4})=\frac14-\frac{3}{16}=\frac{1}{16}$，$\operatorname{Cov}(W_{1/4},W_{1/2})=\frac14-\frac18=\frac18$，于是

$$\operatorname{Cov}\bigl(W_{1/2}-W_{1/4},\,W_{3/4}-W_{1/2}\bigr)=\frac18-\frac14-\frac{1}{16}+\frac18=-\frac{1}{16}\neq0.$$

两增量相关，从而不独立（联合正态下不相关与独立等价）。桥的相邻增量协方差恒为负：路径被 $W_1=0$ 的约束「拉回」，前段的正增量必然意味着后段的回落倾向，这正是条件化在 $B_1=0$ 留下的痕迹。Brown 桥在数理统计（经验过程与 Kolmogorov–Smirnov 检验的极限对象）与约束路径模拟中有广泛应用。

现在证明 Brown 路径的第一个深刻性质。直观上 $|\Delta B|$ 的典型量级是 $\sqrt{\Delta t}$，差商 $|\Delta B|/\Delta t$ 的量级是 $1/\sqrt{\Delta t}$，当 $\Delta t\downarrow0$ 时必然发散，故路径不应在任何点有切线。严格化的困难在于「一切时刻 $t$」构成不可数集，无法对每个 $t$ 分别取零概率事件再求并；标准手法是用二进分割把不可数的 $t$ 归入可数个「二进邻域」，再用增量的独立性控制概率。

**定理 26.6（Brown 运动几乎必然处处不可微，Paley–Wiener–Zygmund）**

设 $\{B_t\}_{t\ge0}$ 为标准 Brown 运动。则几乎必然，$t\mapsto B_t(\omega)$ 在任何 $t\ge0$ 处不可微；更强地，在任何 $t\ge0$ 处都不存在有限的单侧导数。

**证明**

第一步：归约为可数事件。对每个正整数 $n$ 定义

$$\Omega_n=\bigl\{\omega:\ \exists\, t\in[0,1),\ \ \forall h\in[0,1-t],\quad |B_{t+h}(\omega)-B_t(\omega)|\le nh\bigr\}. \tag{26.6}$$

设 $D$ 表示「$B$ 在 $[0,1)$ 内某点存在有限右导数」这一事件，则 $D\subseteq\bigcup_{n\ge1}\Omega_n$。验证如下：设 $\omega\in D$，右导点为 $t\in[0,1)$，右导数为 $D_+$，则存在 $\delta\in(0,1-t]$ 使 $h\in[0,\delta]$ 时 $|B_{t+h}(\omega)-B_t(\omega)|\le(|D_+|+1)h$。由路径连续，$M(\omega)=\sup_{0\le u\le1}|B_u(\omega)|<\infty$。取正整数 $n\ge\max\{|D_+|+1,\ 2M(\omega)/\delta\}$。当 $h\in[0,\delta]$ 时 $|B_{t+h}-B_t|\le(|D_+|+1)h\le nh$；当 $h\in(\delta,1-t]$ 时 $|B_{t+h}-B_t|\le2M(\omega)\le n\delta<nh$。故 $\omega\in\Omega_n$。由概率的可数次可加性，只需对每个固定的 $n$ 证明 $\mathbb P(\Omega_n)=0$。

第二步：二进三增量包含关系。固定 $n$。对整数 $k\ge2$ 与 $1\le j\le2^k-3$ 定义事件

$$A_{j,k}=\bigcap_{m=1}^{3}\Bigl\{\bigl|B_{(j+m)/2^k}-B_{(j+m-1)/2^k}\bigr|\le\frac{8n}{2^k}\Bigr\},\qquad\Lambda_k=\bigcup_{j=1}^{2^k-3}A_{j,k}.$$

断言：$\Omega_n\subseteq\liminf_{k\to\infty}\Lambda_k=\bigcup_{K\ge1}\bigcap_{k\ge K}\Lambda_k$。设 $\omega\in\Omega_n$，对应点为 $t\in[0,1)$。对每个 $k$ 取满足 $(j-1)/2^k\le t<j/2^k$ 的唯一整数 $j=j(k)\in\{1,\dots,2^k\}$。因 $t<1$，存在 $K(\omega)$ 使 $k\ge K(\omega)$ 时 $t<1-3/2^k$；此时 $j-1\le t\cdot2^k<2^k-3$，整数性给出 $j\le2^k-3$，故三个二进点 $(j+m)/2^k$（$m=1,2,3$）都落在 $[t,1]$ 内。令 $h_m=(j+m)/2^k-t\in[0,1-t]$，则 $h_m\le(j+3)/2^k-(j-1)/2^k=4/2^k$。由 (26.6)（分别取 $h=h_m$ 与 $h=h_{m-1}$，注意 $h_0=0$），对 $m=1,2,3$，

$$\bigl|B_{(j+m)/2^k}-B_{(j+m-1)/2^k}\bigr|\le|B_{t+h_m}-B_t|+|B_t-B_{t+h_{m-1}}|\le nh_m+nh_{m-1}\le\frac{8n}{2^k},$$

即 $\omega\in A_{j,k}\subseteq\Lambda_k$ 对一切 $k\ge K(\omega)$ 成立，断言得证。

第三步：概率估计。$A_{j,k}$ 中的三个增量位于三个互不重叠的时间区间，由定义 26.1 第 2 条相互独立，且各自服从 $N(0,2^{-k})$，即 $2^{-k/2}Z$，$Z\sim N(0,1)$。标准正态密度不超过 $(2\pi)^{-1/2}<1/2$，故对 $x>0$ 有 $\mathbb P(|Z|\le x)\le x\sqrt{2/\pi}\le x$，于是

$$\mathbb P(A_{j,k})=\bigl[\mathbb P(|Z|\le8n\,2^{-k/2})\bigr]^3\le(8n)^3\,2^{-3k/2}=512\,n^3\,2^{-3k/2}.$$

由并界 $\mathbb P(\Lambda_k)\le\sum_{j=1}^{2^k-3}\mathbb P(A_{j,k})\le512\,n^3\,2^{-k/2}$。又事件列 $\bigcap_{k\ge K}\Lambda_k$ 随 $K$ 递增且并为 $\liminf_k\Lambda_k$，由概率的下连续性（即 Fatou 引理的集合形式），

$$\mathbb P(\Omega_n)\le\mathbb P\bigl(\liminf_{k}\Lambda_k\bigr)=\lim_{K\to\infty}\mathbb P\Bigl(\bigcap_{k\ge K}\Lambda_k\Bigr)\le\liminf_{k\to\infty}\mathbb P(\Lambda_k)\le\lim_{k\to\infty}512\,n^3\,2^{-k/2}=0.$$

故 $\mathbb P(\Omega_n)=0$，由第一步 $\mathbb P(D)=0$：几乎必然，$B$ 在 $[0,1)$ 内任何点都没有有限右导数。

第四步：延拓到整个半轴与左导数。对每个整数 $m\ge0$，过程 $W^{(m)}_u=B_{m+u}-B_m$（$0\le u\le1$）满足定义 26.1 的四条（增量是 $B$ 的独立平稳正态增量，路径连续，$W^{(m)}_0=0$），仍是标准 Brown 运动，由第三步几乎必然在 $[0,1)$ 内无有限右导数。而 $B$ 在 $t\in[m,m+1)$ 处存在导数必蕴含右导数存在，后者对应 $W^{(m)}$ 在 $u=t-m$ 处右导数存在，概率为零；对 $m$ 取可数并，几乎必然 $B$ 在 $[0,\infty)$ 任何点不可微。对左导数，考虑 $\widetilde W^{(m)}_u=B_{m+1-u}-B_{m+1}$（$0\le u\le1$）：其增量是 $B$ 在反转区间上增量取负，$-N(0,\Delta u)$ 与 $N(0,\Delta u)$ 同分布，故它也是标准 Brown 运动；$B$ 在 $t\in(m,m+1]$ 处左导数存在对应 $\widetilde W^{(m)}$ 在 $u=m+1-t\in[0,1)$ 处右导数存在，由第三步概率为零。可数并后：几乎必然，任何 $t\ge0$ 处都不存在有限单侧导数，特别地不存在导数。

□

**注记** 定理 26.6 表明几乎每条 Brown 路径的可微点集为空，这与路径的连续性并不矛盾：路径其实比可微函数差得很少——它是任意阶 $\gamma<1/4$ 局部 Hölder 连续的（由定理 26.2 第二步的四阶矩估计与 Borel–Cantelli 引理可得；精细分析可把阶提到任意 $\gamma<1/2$，并由重对数律给出精确量级 $|B_{t+h}-B_t|\sim\sqrt{2h\log\log(1/h)}$，属更深结果，此处不展开）。换言之，Brown 路径的粗糙度精确卡在 $\sqrt h$ 尺度：比可微差半个阶，却仍保有接近 $1/2$ 阶的一切 Hölder 连续性。后面将看到，二次变差恰为 $T$ 正是这一 $\sqrt h$ 尺度的积分表达。

## 26.2 变差与二次变差

定理 26.6 排除了用经典导数描述 Brown 路径的可能。分析中对函数正则性还有一个更粗的分类：有界变差。有界变差函数可写成两个单调增函数之差，对连续被积函数的 Riemann–Stieltjes 积分存在，换元公式成立。若 Brown 路径有界变差，随机积分就只是逐路径的经典 Stieltjes 积分，无需新理论。本节证明这条退路被完全封死：Brown 运动的一阶变差无穷。但同时会发现，它的二阶累积量——二次变差——不仅有限，而且恰等于时间长度。这一「一阶无穷、二阶有限」的精确结构是随机微积分的基石。

**定义 26.7（总变差与二次变差）**

设 $f:[0,T]\to\mathbb R$，$\Pi=\{0=t_0<t_1<\cdots<t_m=T\}$ 为 $[0,T]$ 的一个分割，其细度 $|\Pi|=\max_k(t_{k+1}-t_k)$，记 $\Delta_k f=f(t_{k+1})-f(t_k)$。$f$ 在 $[0,T]$ 上的总变差（一阶变差）定义为

$$V_T(f)=\sup_{\Pi}\sum_{k=0}^{m-1}\bigl|\Delta_k f\bigr|, \tag{26.7}$$

上确界取遍一切分割；若 $V_T(f)<\infty$，称 $f$ 在 $[0,T]$ 上有界变差。$f$ 沿分割 $\Pi$ 的二次变差和定义为

$$Q_\Pi(f)=\sum_{k=0}^{m-1}\bigl(\Delta_k f\bigr)^2;$$

若当 $|\Pi|\to0$ 时 $Q_\Pi(f)$ 的极限存在（逐点意义或概率意义），称之为 $f$ 在 $[0,T]$ 上的二次变差，记

$$[f]_T=\lim_{|\Pi|\to0}\sum_{k=0}^{m-1}\bigl(f(t_{k+1})-f(t_k)\bigr)^2. \tag{26.8}$$

对随机过程，上述极限可对几乎每条路径理解（得几乎必然收敛），也可在 $L^2$ 或依概率意义下理解；对 Brown 运动，定理 26.9 将证明这些极限都存在且等于 $T$。

**引理 26.8（连续有界变差函数的二次变差为零）**

设 $f$ 在 $[0,T]$ 上连续且 $V_T(f)<\infty$，则对任意满足 $|\Pi_n|\to0$ 的分割列有 $Q_{\Pi_n}(f)\to0$，从而 $[f]_T=0$。

**证明**

对任意分割 $\Pi$，

$$Q_\Pi(f)=\sum_k(\Delta_k f)^2=\sum_k|\Delta_k f|\cdot|\Delta_k f|\le\max_k|\Delta_k f|\cdot\sum_k|\Delta_k f|\le\max_k|\Delta_k f|\cdot V_T(f). \tag{26.9}$$

$f$ 在紧区间 $[0,T]$ 上连续故一致连续：对任意 $\varepsilon>0$ 存在 $\delta>0$，使 $|s-t|<\delta$ 时 $|f(s)-f(t)|<\varepsilon$。于是当 $|\Pi_n|<\delta$ 时 $\max_k|\Delta_k f|\le\varepsilon$，由 (26.9) 得 $0\le Q_{\Pi_n}(f)\le\varepsilon\,V_T(f)$。令 $\varepsilon\to0$ 即得 $Q_{\Pi_n}(f)\to0$。

□

引理 26.8 的逆否形式是：连续函数若沿某分割列的二次变差为正，则必无界变差。因此，要证明 Brown 路径不是有界变差函数，只需证明其二次变差为正——而下一定理将给出精确值 $T$，这比「为正」强得多。

**例 26.3**

沿均匀分割 $t_k=k/n$ 计算 $f(t)=t$ 与 $g(t)=t^2$ 在 $[0,1]$ 上的总变差与二次变差。

**解**

对 $f(t)=t$：$f$ 单调增，任意分割下 $|\Delta_k f|=\Delta_k f$，故 $\sum_k|\Delta_k f|=\sum_k\Delta_k f=f(1)-f(0)=1$（伸缩求和），$V_1(f)=1<\infty$；二次变差和 $Q_{\Pi_n}(f)=\sum_{k=1}^n(1/n)^2=1/n\to0$，与引理 26.8 一致。

对 $g(t)=t^2$：$g$ 连续可微，由中值定理 $\Delta_k g=g'(\xi_k)\Delta t_k$ 对某 $\xi_k\in(t_{k-1},t_k)$ 成立，于是 $\sum_k|\Delta_k g|=\sum_k|g'(\xi_k)|\,\Delta t_k$ 是 $\int_0^1|g'(t)|\,\mathrm dt$ 的 Riemann 和，细度趋于零时收敛于该积分，故 $V_1(g)=\int_0^1 2t\,\mathrm dt=1$。二次变差和为

$$Q_{\Pi_n}(g)=\sum_{k=1}^n\Bigl[\Bigl(\frac kn\Bigr)^2-\Bigl(\frac{k-1}{n}\Bigr)^2\Bigr]^2=\sum_{k=1}^n\frac{(2k-1)^2}{n^4}=\frac{4n^2-1}{3n^3}\to0,$$

其中用到恒等式 $\sum_{k=1}^n(2k-1)^2=n(4n^2-1)/3$（把 $(2k-1)^2=4k^2-4k+1$ 拆开并对 $\sum k^2=\frac{n(n+1)(2n+1)}{6}$、$\sum k=\frac{n(n+1)}{2}$ 代入即得）。

两个例子印证了引理 26.8 的机制：光滑或有界变差函数的增量是 $O(\Delta t)$ 量级，平方后求和为 $O(|\Pi|)\to0$。反过来，若一个过程的增量是 $\sqrt{\Delta t}$ 量级，则 $\sum(\Delta)^2$ 的量级是 $\sum\Delta t_k=T$——既不消失也不发散。Brown 运动的增量恰是 $\sqrt{\Delta t}$ 量级（$B_t-B_s\sim N(0,t-s)$），这预示着它的二次变差应当是正的有限值；精确定值由下面的中心定理给出。

**定理 26.9（Brown 运动的二次变差与一阶变差）**

设 $\{B_t\}$ 为标准 Brown 运动，$T>0$。则：

1. 对任意满足 $|\Pi_n|\to0$ 的分割列 $\{\Pi_n\}$，$Q_{\Pi_n}(B)$ 依 $L^2$ 收敛于 $T$，从而也依概率收敛于 $T$；
2. 沿二进分割 $\Pi_n=\{kT/2^n:0\le k\le 2^n\}$，$Q_{\Pi_n}(B)$ 几乎必然收敛于 $T$；特别地，$[B]_T=T$ 几乎必然成立；
3. $V_T(B)=\infty$ 几乎必然；进而几乎必然，Brown 路径在任何长度正的区间上都无界变差。

**证明**

记 $Q_n=Q_{\Pi_n}(B)$，$\Delta_kB=B_{t_{k+1}}-B_{t_k}$，$\Delta t_k=t_{k+1}-t_k$。

第一步（$L^2$ 收敛）。由定义 26.1 第 3 条，$\Delta_kB\sim N(0,\Delta t_k)$，故 $\mathbb E[(\Delta_kB)^2]=\Delta t_k$，且

$$\mathbb E[Q_n]=\sum_k\mathbb E\bigl[(\Delta_kB)^2\bigr]=\sum_k\Delta t_k=T.$$

不相交区间上的增量独立，故 $\{(\Delta_kB)^2\}_k$ 相互独立。写 $\Delta_kB=\sqrt{\Delta t_k}\,Z_k$，其中 $Z_k\sim N(0,1)$ 且相互独立；由 $\mathbb E[Z^2]=1$、$\mathbb E[Z^4]=3$ 得 $\operatorname{Var}(Z_k^2)=3-1=2$，于是

$$\operatorname{Var}(Q_n)=\sum_k\operatorname{Var}\bigl((\Delta_kB)^2\bigr)=\sum_k(\Delta t_k)^2\operatorname{Var}(Z_k^2)=2\sum_k(\Delta t_k)^2\le2\,|\Pi_n|\sum_k\Delta t_k=2T\,|\Pi_n|. \tag{26.10}$$

因 $\mathbb E[Q_n]=T$，均方误差就是方差：

$$\mathbb E\bigl[(Q_n-T)^2\bigr]=\operatorname{Var}(Q_n)\le2T\,|\Pi_n|\to0, \tag{26.11}$$

即 $Q_n\to T$ 于 $L^2$。再由 Markov 不等式，$\mathbb P(|Q_n-T|>\varepsilon)\le\mathbb E[(Q_n-T)^2]/\varepsilon^2\to0$，故亦依概率收敛。第 1 条证毕。
第二步（由 $L^2$ 收敛得子列的几乎必然收敛）。先立一个一般事实：若随机变量列 $X_n$ 依 $L^2$ 收敛于 $X$，则存在子列 $\{X_{n_j}\}$ 几乎必然收敛于 $X$。确实，依 $L^2$ 收敛的定义可归纳地选出 $n_1<n_2<\cdots$ 使 $\mathbb E[(X_{n_j}-X)^2]\le2^{-j}$，于是

$$\mathbb E\Bigl[\sum_{j=1}^{\infty}(X_{n_j}-X)^2\Bigr]=\sum_{j=1}^{\infty}\mathbb E\bigl[(X_{n_j}-X)^2\bigr]\le\sum_{j=1}^{\infty}2^{-j}=1<\infty,$$

其中非负项级数与期望交换由单调收敛定理保证。期望有限的非负随机变量几乎必然有限，故 $\sum_j(X_{n_j}-X)^2<\infty$ 几乎必然；收敛级数的通项趋于零，即 $(X_{n_j}-X)^2\to0$，所以 $X_{n_j}\to X$ 几乎必然。把这一事实用于第一步：任何细度趋于零的分割列都有子列，沿之 $Q_{\Pi}(B)\to T$ 几乎必然。

第三步（二进列整个序列几乎必然收敛）。对二进分割，第 $n$ 层的 $\Delta t_k=T/2^n$（$k=0,\dots,2^n-1$），由 (26.10) 得精确方差

$$\mathbb E\bigl[(Q_n-T)^2\bigr]=\operatorname{Var}(Q_n)=2\sum_{k=0}^{2^n-1}\Bigl(\frac{T}{2^n}\Bigr)^2=\frac{2T^2}{2^n},$$

其对 $n$ 的级数收敛：$\sum_{n\ge1}2T^2/2^n=2T^2<\infty$。第二步的单调收敛论证逐字适用，得 $\sum_n(Q_n-T)^2<\infty$ 几乎必然，从而 $Q_n\to T$ 几乎必然——此处得到的是整个序列而非仅仅子列的几乎必然收敛，原因是 $L^2$ 误差本身可求和。同一结论也可由 Chebyshev 不等式与 Borel–Cantelli 引理得出：$\mathbb P(|Q_n-T|>\varepsilon)\le2T^2/(2^n\varepsilon^2)$ 对 $n$ 可和，故对每个 $\varepsilon>0$，事件 $\{|Q_n-T|>\varepsilon\}$ 几乎必然只发生有限次；对 $\varepsilon=1,1/2,1/3,\dots$ 取例外集的可数并，即得 $Q_n\to T$ 的几乎必然收敛。这就证明了

$$[B]_T=T. \tag{26.12}$$

第四步（一阶变差无穷）。记 $M_n=\max_k|\Delta_kB|$ 为二进第 $n$ 层分割的最大绝对增量。几乎每条 Brown 路径在 $[0,T]$ 上连续，从而一致连续，故 $M_n\to0$ 几乎必然：对任意 $\varepsilon>0$，一致连续性给出 $\delta>0$ 使 $|u-v|<\delta$ 时 $|B_u-B_v|<\varepsilon$；当 $n$ 大到 $T/2^n<\delta$ 时，一切二进子区间长度小于 $\delta$，于是 $M_n\le\varepsilon$。另一方面，总变差是上确界，不小于任何特定分割的和；再由初等不等式 $a^2\le(\max_j a_j)\cdot a$（$a\ge0$），对每个 $n$，

$$V_T(B)\ \ge\ \sum_{k=0}^{2^n-1}|\Delta_kB|\ \ge\ \frac{1}{M_n}\sum_{k=0}^{2^n-1}(\Delta_kB)^2\ =\ \frac{Q_n}{M_n}. \tag{26.13}$$

在 $Q_n\to T$ 且 $M_n\to0$ 同时成立的几乎必然事件上，$n$ 充分大时 $Q_n\ge T/2>0$（此时 $M_n>0$），于是 $V_T(B)\ge(T/2)/M_n\to\infty$。故 $V_T(B)=\infty$ 几乎必然。

最后延拓到任意区间。对每对有理数 $0\le q_1<q_2$，过程 $\{B_{q_1+u}-B_{q_1}\}_{0\le u\le q_2-q_1}$ 满足定义 26.1 的四条（增量是 $B$ 的独立平稳正态增量，路径连续，起点为零），仍是标准 Brown 运动，对它应用前半部分证明得 $V_{[q_1,q_2]}(B)=\infty$ 几乎必然。有理数对只有可数个，去掉一个零测集后可设上述结论对一切有理区间同时成立。而任何长度正的区间 $I$ 都包含某个有理区间 $[q_1,q_2]$，总变差对区间包含单调（且可加：$V_{[a,c]}=V_{[a,b]}+V_{[b,c]}$），故 $V_I(B)\ge V_{[q_1,q_2]}(B)=\infty$。于是几乎必然，Brown 路径在任何长度正的区间上都无界变差。

□

**注记（$[B]_T=T$ 的意义）** 定理 26.9 第 3 条表明 $\sum|\Delta B|$ 发散，且由例 26.3 的量级演算，发散速率约为 $T/\sqrt{|\Pi|}$；第 2 条表明 $\sum(\Delta B)^2$ 恰好稳定在 $T$。把这一事实写成微分形式的助记式，即

$$\mathrm dB_t\,\mathrm dB_t=\mathrm dt,$$

意思是「Brown 增量的平方是一阶无穷小」。两个直接推论。其一，与引理 26.8 合起来构成一个鲜明的二分：连续有界变差路径的二次变差为零，而 Brown 路径的二次变差为正，因而「最大程度地粗糙」；一切以有界变差分解或 Hölder 正则性为基础的积分理论（Riemann–Stieltjes、Young）都无法容纳 Brown 运动，必须另起炉灶。其二，经典链式法则必然失效：对二阶连续可微的 $F$，Taylor 展开给出

$$F(B_{t+\Delta t})-F(B_t)=F'(B_t)\,\Delta B+\frac12F''(B_t)\,(\Delta B)^2+o\bigl((\Delta B)^2\bigr).$$

对有界变差路径，二阶项求和随细度趋于零，可以丢弃，得到经典换元公式 $\mathrm dF(f_t)=F'(f_t)\,\mathrm df_t$；对 Brown 路径，$\sum(\Delta B)^2\to[B]_T=T$，二阶项累积成一阶量 $\frac12\int_0^TF''(B_t)\,\mathrm dt$，正确的公式应当是

$$\mathrm dF(B_t)=F'(B_t)\,\mathrm dB_t+\frac12F''(B_t)\,\mathrm dt.$$

这就是 Itô 公式，其严格陈述与证明见后段 26.5 节。用金融语言说，多出的 $\frac12F''(B_t)\,\mathrm dt$ 是波动带来的凸性修正：凸性收益（$F''>0$）在随机抖动下获得额外的期望增长率，这一 Itô 项是组合收益归因（26.7 节）与 Black–Scholes 方程推导（第33章）的核心。

## 26.3 随机积分的构造动机

定理 26.6 与定理 26.9 共同划定了 Brown 路径的分析地位：连续而处处不可微，一阶变差无穷而二次变差恰为时间长度。本节说明这些事实对构造积分 $\int_0^TH_t\,\mathrm dB_t$ 意味着什么：经典逐路径积分为何必然失效，失效之后为何必须规定新的取值点约定，以及 Itô 取左端点的选择为何在金融中是唯一自然的。

**Riemann–Stieltjes 积分的失效。** 逐路径的 Riemann–Stieltjes 积分把 $\int_0^TH\,\mathrm dg$ 定义为和式 $\sum_kH_{\xi_k}\Delta_kg$ 当 $|\Pi|\to0$ 时的极限，取值点 $\xi_k\in[t_k,t_{k+1}]$ 任意。经典理论保证：当 $g$ 有界变差且 $H$ 连续时，该极限存在且与 $\{\xi_k\}$ 的选法无关，因为两套选法 $\{\xi_k\}$、$\{\xi'_k\}$ 对应的和式之差满足

$$\Bigl|\sum_k\bigl(H_{\xi_k}-H_{\xi'_k}\bigr)\Delta_kg\Bigr|\le\operatorname{osc}_{|\Pi|}(H)\cdot V_T(g),$$

其中 $\operatorname{osc}_{|\Pi|}(H)=\max_k\sup\{|H_u-H_v|:u,v\in[t_k,t_{k+1}]\}$ 由 $H$ 的一致连续性趋于零，而 $V_T(g)$ 是有限常数。对 Brown 运动，这一机制在两个层面同时失效。第一，$V_T(B)=\infty$ 几乎必然（定理 26.9 第 3 条），上述估计右端无意义；即便诉诸 Young 积分这类更精细的逐路径理论——它要求积分器与被积函数的 Hölder 阶 $\alpha,\beta$ 满足 $\alpha+\beta>1$——Brown 路径的 Hölder 阶至多为 $1/2$（定理 26.6 后的注记），对 $H=B$ 自身有 $\alpha+\beta\le1$，仍不适用。第二，也是更根本的：极限确实依赖取值点的选法，即使对被积函数最简单的情形 $H_t=B_t$ 也是如此。

记 $\Delta_kB=B_{t_{k+1}}-B_{t_k}$，$Q_\Pi=Q_\Pi(B)$。关键是代数恒等式

$$B_{t_{k+1}}^2-B_{t_k}^2=2B_{t_k}\,\Delta_kB+(\Delta_kB)^2=2B_{t_{k+1}}\,\Delta_kB-(\Delta_kB)^2,$$

两式都由 $(B_{t_k}+\Delta_kB)^2$ 展开即得。对 $k$ 求和，左端伸缩为 $B_T^2-B_0^2=B_T^2$，而 $\sum_k(\Delta_kB)^2=Q_\Pi$，于是

$$\sum_kB_{t_k}\,\Delta_kB=\frac{B_T^2-Q_\Pi}{2},\qquad\sum_kB_{t_{k+1}}\,\Delta_kB=\frac{B_T^2+Q_\Pi}{2}. \tag{26.14}$$

令 $|\Pi|\to0$，定理 26.9 第 1 条给出 $Q_\Pi\to T$（依概率），故左端点和式与右端点和式分别依概率收敛于 $\frac12(B_T^2-T)$ 与 $\frac12(B_T^2+T)$，二者之差恰为 $T=[B]_T$。因此不存在与取值点无关的逐路径积分 $\int_0^TB_t\,\mathrm dB_t$：随机积分必须先固定取值点约定。对照经典公式 $\int_0^Tf\,\mathrm df=\frac12(f(T)^2-f(0)^2)$——它对连续可微或有界变差的 $f$ 成立，对应 $[f]_T=0$——对 $f=B$ 必须修正 $\mp T/2$，修正量恰由二次变差控制。

**为何取左端点。** Itô 的约定是取值点恒取左端点，把 $\int_0^TH\,\mathrm dB$ 定义为 $\sum_kH_{t_k}\Delta_kB$ 的极限。这一选择有三个层面的必然性。第一是信息结构：设被积过程 $H$ 适应于 Brown 运动生成的滤波 $\{\mathcal F_t\}$（滤波与适应的概念见第25章 25.1 节），则 $H_{t_k}$ 为 $\mathcal F_{t_k}$-可测，其取值完全由时刻 $t_k$ 之前的信息决定，而增量 $\Delta_kB$ 独立于 $\mathcal F_{t_k}$。乘积 $H_{t_k}\Delta_kB$ 因此恰好模拟「先依据当前信息决定持仓，再经历价格变动」，其累积和就是自融资交易策略的总盈利，积分的金融含义由此天然成立。若取右端点 $H_{t_{k+1}}$，区间 $[t_k,t_{k+1}]$ 上的持仓用到了区间结束之后的信息，等于允许现实世界中不可实现的前视策略，基于它的一切统计性质都会失真——这正是回测中前视偏差（第34章将定量讨论其后果）的概率论形态。第二是鞅性质与零均值：由 $\mathbb E[\Delta_kB\mid\mathcal F_{t_k}]=0$ 与 $H_{t_k}$ 的 $\mathcal F_{t_k}$-可测性，

$$\mathbb E\bigl[H_{t_k}\Delta_kB\bigr]=\mathbb E\bigl[H_{t_k}\,\mathbb E[\Delta_kB\mid\mathcal F_{t_k}]\bigr]=0,$$

故部分和过程 $\bigl\{\sum_{t_k\le t}H_{t_k}\Delta_kB\bigr\}_t$ 是鞅，取极限后 $\mathbb E\bigl[\int_0^TH\,\mathrm dB\bigr]=0$。右端点或中点约定失去这一性质，积分的期望一般非零——式 (26.14) 的两个极限之差已经直观展示了这种差别。第三是分析上的可算性：独立性给出 $\mathbb E[(H_{t_k}\Delta_kB)^2]=\mathbb E[H_{t_k}^2]\,\Delta t_k$，且 $j<k$ 时交叉项的期望为零（条件于 $\mathcal F_{t_k}$ 后 $\Delta_kB$ 被湮灭），于是

$$\mathbb E\Bigl[\Bigl(\sum_kH_{t_k}\Delta_kB\Bigr)^2\Bigr]=\mathbb E\Bigl[\sum_kH_{t_k}^2\,\Delta t_k\Bigr],$$

即映射「简单被积过程 $\mapsto$ 积分和」保持 $L^2$ 范数，是一个等距。$L^2$ 空间的完备性使这一等距映射能唯一地延拓到更大的被积函数类上；这就是 26.4 节构造 Itô 积分的主线，等距性质将在那里被严格证明。

**Itô 与 Stratonovich。** 除左右端点外，第三种自然约定是取中点 $\hat B_k=B_{(t_k+t_{k+1})/2}$。对 $H_t=B_t$，中点约定的极限可以精确算出。记 $\bar B_k=(B_{t_k}+B_{t_{k+1}})/2$，$\Delta'_k=B_{(t_k+t_{k+1})/2}-B_{t_k}$，$\Delta''_k=B_{t_{k+1}}-B_{(t_k+t_{k+1})/2}$；则 $\Delta'_k$ 与 $\Delta''_k$ 独立且都服从 $N(0,\Delta t_k/2)$，$\Delta_kB=\Delta'_k+\Delta''_k$，且 $\hat B_k-\bar B_k=(\Delta'_k-\Delta''_k)/2$。一方面，

$$\sum_k\bar B_k\,\Delta_kB=\frac12\sum_k\bigl(B_{t_{k+1}}+B_{t_k}\bigr)\bigl(B_{t_{k+1}}-B_{t_k}\bigr)=\frac12\sum_k\bigl(B_{t_{k+1}}^2-B_{t_k}^2\bigr)=\frac{B_T^2}{2},$$

最后一步又是伸缩求和，且这一等式对每个分割精确成立。另一方面，交叉项

$$\bigl(\hat B_k-\bar B_k\bigr)\Delta_kB=\frac{(\Delta'_k)^2-(\Delta''_k)^2}{2}$$

的均值为零（$\mathbb E[(\Delta'_k)^2]=\mathbb E[(\Delta''_k)^2]=\Delta t_k/2$）；不同 $k$ 的交叉项涉及互不重叠区间上的增量因而相互独立，且二阶矩为

$$\mathbb E\Bigl[\Bigl(\frac{(\Delta'_k)^2-(\Delta''_k)^2}{2}\Bigr)^2\Bigr]=\frac{3(\Delta t_k/2)^2-2(\Delta t_k/2)^2+3(\Delta t_k/2)^2}{4}=\frac{(\Delta t_k)^2}{4},$$

故 $\sum_k(\hat B_k-\bar B_k)\Delta_kB$ 的二阶矩为 $\sum_k(\Delta t_k)^2/4\le|\Pi|\,T/4\to0$，即依 $L^2$ 收敛于零。两部分合并得

$$\sum_k\hat B_k\,\Delta_kB\ \to\ \frac{B_T^2}{2}\qquad(L^2),$$

恰为经典公式 $\int f\,\mathrm df=f^2/2$ 的形式，且正好位于式 (26.14) 两个极限的正中间。按中点（更一般地，对称）约定定义的积分称为 Stratonovich 积分，记作 $\int_0^TB_t\circ\mathrm dB_t=B_T^2/2$。对更一般的被积函数 $f(B_t)$，两种积分满足转换公式

$$\int_0^Tf(B_t)\circ\mathrm dB_t=\int_0^Tf(B_t)\,\mathrm dB_t+\frac12\int_0^Tf'(B_t)\,\mathrm dt,$$

其严格证明需要 26.4 节的完整 $L^2$ 理论与 26.5 节的 Itô 公式，此处记录结论；修正项 $\frac12\int_0^Tf'(B_t)\,\mathrm dt$ 的代数来源已在上面对 $f(x)=x$ 的计算中完全暴露——中点与左端点之差恰好累积了二次变差的一半。

两种积分的本质区别可概括为：Itô 积分保持适应性、鞅性质与零均值，是「无前视」的解析表达，代价是链式法则带上由二次变差决定的二阶修正（Itô 公式）；Stratonovich 积分服从经典链式法则、与光滑坐标变换相容，代价是被积函数一般需要预知未来、失去鞅性质。数学金融全盘采用 Itô 约定，因为非预见性正是自融资与无套利信息结构的数学形态，风险中性定价（第33章）完全建立在鞅性质之上；Stratonovich 积分多见于物理与微分几何，它也是用光滑噪声过程逼近 Brown 运动时的自然极限对象（Wong–Zakai 定理）。以下各节中，除非另行说明，$\int H\,\mathrm dB$ 一律指 Itô 积分；其严格构造自后段 26.4 节始。

## 26.4 Itô 积分的构造

定理 26.9 断言 Brown 运动的总变差无穷，式 (26.14) 又表明左端点与右端点 Riemann 和收敛到不同的随机变量。既然路径逐点的 Riemann–Stieltjes 积分根本不存在，就必须把「积分」的含义从对每条路径求极限，改为在均方意义下对随机变量求极限。这一改动的枢纽是 Itô 等距：它把随机积分的二阶矩化为一个普通的 Lebesgue 积分，于是我们可以在 Hilbert 空间 $L^2(\Omega)$ 中借助完备性完成扩张。

**定义 26.10（简单被积过程）**

设 $(\Omega,\mathcal F,\{\mathcal F_t\}_{t\ge 0},\mathbb P)$ 为带滤波的概率空间，$B$ 是其上的 Brown 运动。称适应过程 $H=\{H_t\}_{0\le t\le T}$ 为**简单过程**，若存在 $[0,T]$ 的分割 $0=t_0<t_1<\cdots<t_n=T$ 以及随机变量 $H_{t_0},\dots,H_{t_{n-1}}$，使得

$$H_t=\sum_{j=0}^{n-1}H_{t_j}\mathbf 1_{(t_j,t_{j+1}]}(t),\qquad 0\le t\le T,\tag{26.15}$$

其中每个 $H_{t_j}$ 都是 $\mathcal F_{t_j}$-可测的，并且满足 $\mathbb E[H_{t_j}^2]<\infty$。全体简单过程构成的集合记为 $\mathcal S_T$。
 
式（26.15）中的右端点表示并不重要，真正决定积分的是每个小区间上的取值都由该区间左端点以前的信息确定。以下把空集上的和约定为零。

**定义 26.11（简单过程的 Itô 积分）**

对式（26.15）给出的 $H\in\mathcal S_T$，记 $\Delta_j B=B_{t_{j+1}}-B_{t_j}$，定义

$$I_T(H)=\int_0^T H_s\,\mathrm dB_s=\sum_{j=0}^{n-1}H_{t_j}\Delta_j B.\tag{26.16}$$

对 $0\le t\le T$，再令

$$I_t(H)=\sum_{j=0}^{n-1}H_{t_j}\bigl(B_{t_{j+1}\wedge t}-B_{t_j\wedge t}\bigr).$$

若同一过程有两种分割表示，把两个分割合并后，各区间的左端点取值不变，而 Brown 运动增量在细分区间上相加，故式（26.16）与分割选取无关。由于 Brown 运动路径连续，$t\mapsto I_t(H)$ 也连续。

**例 26.4**

设 $0<a<T$，令 $H_s=2$ 当 $0\le s\le a$，令 $H_s=-1$ 当 $a<s\le T$。求 $I_T(H)$ 的均值与方差。

**解**

由定义 26.11，$I_T(H)=2B_a-(B_T-B_a)$。两个增量相互独立且均值均为零，所以 $\mathbb E[I_T(H)]=0$。由增量方差公式，

$$\operatorname{Var}(I_T(H))=4a+(T-a)=T+3a.$$

这与下面的 Itô 等距一致，因为 $\int_0^T H_s^2\,\mathrm ds=4a+(T-a)$。
**定理 26.12（简单过程的 Itô 等距）**

若 $H\in\mathcal S_T$，则 $I_T(H)\in L^2(\Omega)$，其均值为零，并且

$$\mathbb E\bigl[I_T(H)^2\bigr]=\mathbb E\left[\int_0^T H_s^2\,\mathrm ds\right].\tag{26.17}$$

**证明**

沿用定义 26.11 的记号。每个 $H_{t_j}$ 与 $\Delta_j B$ 独立，且二者均平方可积，故乘积可积并由条件期望得到

$$\mathbb E[H_{t_j}\Delta_j B]=\mathbb E\bigl[H_{t_j}\mathbb E[\Delta_j B\mid\mathcal F_{t_j}]\bigr]=0.$$

对平方展开，有

$$I_T(H)^2=\sum_{j=0}^{n-1}H_{t_j}^2(\Delta_j B)^2+2\sum_{0\le i<j\le n-1}H_{t_i}H_{t_j}\Delta_i B\Delta_j B.$$

对角项中，$H_{t_j}$ 是 $\mathcal F_{t_j}$-可测的，而 $\Delta_j B$ 独立于 $\mathcal F_{t_j}$，所以

$$\mathbb E[H_{t_j}^2(\Delta_j B)^2]=\mathbb E[H_{t_j}^2](t_{j+1}-t_j).$$

当 $i<j$ 时，$H_{t_i}$、$H_{t_j}$ 与 $\Delta_i B$ 都是 $\mathcal F_{t_j}$-可测的。由独立性及 Cauchy–Schwarz 不等式，

$$\mathbb E|H_{t_i}H_{t_j}\Delta_i B|
\le \bigl(\mathbb E[H_{t_i}^2]\mathbb E[(\Delta_i B)^2]\mathbb E[H_{t_j}^2]\bigr)^{1/2}<\infty.$$

又因 $\Delta_j B$ 独立于 $\mathcal F_{t_j}$，交叉项均可积，且
$$\begin{aligned}
\mathbb E[H_{t_i}H_{t_j}\Delta_i B\Delta_j B]
&=\mathbb E\bigl[H_{t_i}H_{t_j}\Delta_i B\,\mathbb E[\Delta_j B\mid\mathcal F_{t_j}]\bigr]\\
&=0.
\end{aligned}$$

因此全部交叉项的条件期望都为零。代回平方展开式，得到

$$\mathbb E[I_T(H)^2]
=\sum_{j=0}^{n-1}\mathbb E[H_{t_j}^2](t_{j+1}-t_j)
=\mathbb E\left[\int_0^T H_s^2\,\mathrm ds\right].$$

左端有限，故 $I_T(H)\in L^2(\Omega)$，定理得证。

□

式（26.17）说明 $I_T$ 是从简单过程空间到 $L^2(\Omega)$ 的线性等距。构造一般积分只需把定义域扩充为一个完备的 Hilbert 空间。

**定义 26.13（平方可积被积过程）**

以 $\lambda$ 记 Lebesgue 测度，在乘积空间 $\Omega\times[0,T]$ 上赋予测度 $\mathbb P\otimes\lambda$。设 $\mathcal L_T^2$ 为所有逐次可测且满足

$$\|H\|_{\mathcal L_T^2}=\left(\mathbb E\left[\int_0^T H_s^2\,\mathrm ds\right]\right)^{1/2}<\infty\tag{26.18}$$

的过程 $H$ 所成的空间，其中几乎必然相同的过程视为同一元素。这里的逐次可测性是指对每个 $t$，映射 $(\omega,s)\mapsto H_s(\omega)$ 在 $\Omega\times[0,t]$ 上关于 $\mathcal F_t\otimes\mathcal B([0,t])$ 可测；它特别保证 $H$ 是适应过程。

由 Fubini 定理，式（26.18）是 $L^2(\mathbb P\otimes\lambda)$ 的范数。简单过程都属于 $\mathcal L_T^2$，并且式（26.17）可写成 $\|I_T(H)\|_{L^2(\Omega)}=\|H\|_{\mathcal L_T^2}$。
**引理 26.14（简单过程的稠密性）**

简单过程在 $\mathcal L_T^2$ 中稠密，即对每个 $H\in\mathcal L_T^2$，存在 $H^{(n)}\in\mathcal S_T$，使 $\|H^{(n)}-H\|_{\mathcal L_T^2}\to 0$。

**证明**

先令 $H^{(N)}_s=H_s\mathbf 1_{\{|H_s|\le N\}}$。它仍是逐次可测的适应过程，且

$$\|H^{(N)}-H\|_{\mathcal L_T^2}^2
=\mathbb E\left[\int_0^T H_s^2\mathbf 1_{\{|H_s|>N\}}\,\mathrm ds\right]\to 0$$

由控制收敛定理成立，控制函数为 $H_s^2$。因此只需逼近有界过程。设 $|H_s|\le M$，并约定 $s<0$ 时 $H_s=0$。对 $\varepsilon>0$ 定义时间平均

$$H^\varepsilon_t=\varepsilon^{-1}\int_{t-\varepsilon}^{t}H_s\,\mathrm ds.$$

它由 $[0,t]$ 上的信息决定，故仍适应；其路径连续且 $|H^\varepsilon_t|\le M$。由 Fubini 定理，几乎必然有 $\int_0^T H_s^2\,\mathrm ds<\infty$。对这样的样本路径，Lebesgue 微分定理给出 $H^\varepsilon_t\to H_t$ 在 $[0,T]$ 中除一个 Lebesgue 零测集外成立。又因为

$$|H^\varepsilon_t-H_t|^2\le 4M^2,$$

逐路径使用控制收敛定理，再对样本空间使用同一 theorem 的常数控制，可得 $\|H^\varepsilon-H\|_{\mathcal L_T^2}\to 0$。
现在设 $K$ 是有界、适应且路径连续的过程，$|K_t|\le M$。取 $t_k=kT/n$，并定义简单过程

$$K_t^{(n)}=\sum_{k=0}^{n-1}K_{t_k}\mathbf 1_{(t_k,t_{k+1}]}(t),
\qquad K_0^{(n)}=K_0.\tag{26.19}$$

当 $n\to\infty$ 时，对每个不位于网格上的固定 $t$，包含 $t$ 的小区间的左端点收敛到 $t$，故路径连续性给出 $K_t^{(n)}\to K_t$。网格只有可数多个点，而 $|K_t^{(n)}-K_t|^2\le4M^2$，所以先对时间积分、再取期望，控制收敛定理给出 $\|K^{(n)}-K\|_{\mathcal L_T^2}\to0$。

对一般的 $H$，先选截断，再选时间平均，最后选式（26.19）的离散化，使每一步的范数误差都小于给定正数的三分之一。三角不等式即给出所需的简单过程序列。

□

**定理 26.15（Itô 积分的等距扩张）**

映射 $H\mapsto I_T(H)$ 唯一地扩张为从 $\mathcal L_T^2$ 到 $L^2(\Omega)$ 的连续线性等距。对 $H\in\mathcal L_T^2$，其积分定义为

$$I_T(H)=\lim_{n\to\infty}I_T(H^{(n)}),
\qquad H^{(n)}\in\mathcal S_T,\quad
\|H^{(n)}-H\|_{\mathcal L_T^2}\to 0,\tag{26.20}$$

其中极限在 $L^2(\Omega)$ 中取得，并且不依赖于逼近序列的选取。

**证明**

由引理 26.14，至少存在一个逼近序列。若 $H^{(n)}$ 是这样的序列，则它为 $\mathcal L_T^2$ 中的 Cauchy 序列。定理 26.12 与线性性给出

$$\|I_T(H^{(n)})-I_T(H^{(m)})\|_{L^2(\Omega)}
=\|H^{(n)}-H^{(m)}\|_{\mathcal L_T^2},$$

所以 $I_T(H^{(n)})$ 是 $L^2(\Omega)$ 中的 Cauchy 序列。由完备性，其极限存在，因而式（26.20）定义了一个随机变量。
若 $K^{(n)}$ 是另一逼近序列，则

$$\begin{aligned}
\|I_T(H^{(n)})-I_T(K^{(n)})\|_{L^2(\Omega)}
&=\|H^{(n)}-K^{(n)}\|_{\mathcal L_T^2}\\
&\le\|H^{(n)}-H\|_{\mathcal L_T^2}+\|K^{(n)}-H\|_{\mathcal L_T^2},
\end{aligned}$$

右端趋于零，故两个极限在 $L^2(\Omega)$ 中相同。对等距等式与线性等式分别取极限，即知扩张保持范数和线性运算。任何连续线性扩张都必须在简单过程上与 $I_T$ 一致，而逼近序列的 $L^2(\Omega)$ 极限唯一，所以扩张唯一。最后，对每个 $t\le T$，将上述构造用于 $H\mathbf 1_{[0,t]}$，就得到 $I_t(H)=\int_0^tH_s\,\mathrm dB_s$。

□

**定理 26.16（连续修正与极大值估计）**

对每个 $H\in\mathcal L_T^2$，过程 $(I_t(H))_{0\le t\le T}$ 有连续修正 $X$，并且

$$\mathbb E\left[\sup_{0\le t\le T}|X_t|^2\right]
\le4\,\mathbb E\left[\int_0^T H_s^2\,\mathrm ds\right].\tag{26.21}$$

连续修正在不可区分意义下唯一。

**证明**

先考察简单过程。把 $s<t$ 加入其分割后，$I_t(H)-I_s(H)$ 是形如 $G_j(B_{u_{j+1}}-B_{u_j})$ 的项之和，其中 $u_j\ge s$，$G_j$ 为 $\mathcal F_{u_j}$-可测。逐项先对 $\mathcal F_{u_j}$ 取条件期望，即得 $\mathbb E[I_t(H)-I_s(H)\mid\mathcal F_s]=0$。因此简单过程的积分是连续平方可积鞅，两个简单积分之差亦然。

对一般的 $H$，选取简单过程 $H^{(n)}$，使 $\|H^{(n)}-H\|_{\mathcal L_T^2}\le2^{-n}$，并令 $X_t^n=I_t(H^{(n)})$。对 $X^{n+1}-X^n$ 使用 Doob 的 $L^2$ 极大值不等式，得到

$$\mathbb E\left[\sup_{0\le t\le T}|X_t^{n+1}-X_t^n|^2\right]
\le4\|H^{(n+1)}-H^{(n)}\|_{\mathcal L_T^2}^2
\le C2^{-2n},$$

其中常数 $C$ 与 $n$ 无关。Chebyshev 不等式给出
对 $a_n=2^{-n/2}$，有
$$
\mathbb P\left(\sup_{0\le t\le T}|X_t^{n+1}-X_t^n|>a_n\right)
\le a_n^{-2}C2^{-2n}=C2^{-n}.\tag{26.22}
$$
右端关于 $n$ 可求和。Borel–Cantelli 引理表明，存在一个概率为 $1$ 的事件，在其上除有限多个 $n$ 外均有
$$
\sup_{0\le t\le T}|X_t^{n+1}-X_t^n|\le 2^{-n/2}.
$$
因此 $\sum_{n\ge1}\sup_{t\le T}|X_t^{n+1}-X_t^n|<\infty$，从而 $X^n$ 关于上确界范数是 Cauchy 序列。由于每个 $X^n$ 的路径连续，其一致极限 $X$ 的路径也连续。

固定 $t\in[0,T]$。由等距扩张，
$$
\mathbb E|X_t^n-I_t(H)|^2
=\int_0^t\mathbb E|H_s^{(n)}-H_s|^2\,\mathrm ds
\le\|H^{(n)}-H\|_{\mathcal L_T^2}^2\longrightarrow0.
$$
故 $X_t^n$ 依概率收敛到 $I_t(H)$；另一方面，它几乎必然收敛到 $X_t$。于是对每个固定的 $t$，都有 $X_t=I_t(H)$ 几乎必然成立，所以 $X$ 是积分过程的连续修正。

对 $s<t$，简单积分的鞅性给出 $\mathbb E[X_t^n\mid\mathcal F_s]=X_s^n$。由于 $X_t^n\to X_t$ 和 $X_s^n\to X_s$ 均在 $L^2(\Omega)$ 中成立，而条件期望是 $L^2(\Omega)$ 上的压缩，取极限便得 $\mathbb E[X_t\mid\mathcal F_s]=X_s$。因此 $X$ 是连续平方可积鞅。对它使用 Doob 的 $L^2$ 极大值不等式，再用等距性质，得到
$$
\mathbb E\left[\sup_{0\le t\le T}|X_t|^2\right]
\le4\,\mathbb E|X_T|^2
=4\,\mathbb E\left[\int_0^TH_s^2\,\mathrm ds\right],
$$
即式（26.21）。

最后设 $Y$ 是另一连续修正。取 $[0,T]$ 的可数稠密子集 $D$。对每个 $t\in D$，$X_t=Y_t$ 几乎必然成立；可数个零测事件的并仍为零测事件，故在概率为 $1$ 的事件上，$X_t=Y_t$ 对所有 $t\in D$ 同时成立。两条路径均连续，而 $D$ 稠密，因此它们对所有 $t\in[0,T]$ 都相等。这证明了不可区分意义下的唯一性。

□

连续修正使随机积分可以作为一个连续过程参与逐路径运算；式（26.21）则把整条路径的最大波动控制在被积过程的能量之内。此后总选取这一连续修正。

## 26.5 Itô 公式

Itô 积分改变了通常的链式法则。其根本原因不是导数定义发生变化，而是 Brown 运动在一阶尺度上具有不可忽略的二阶累积效应：无穷小增量的平方在线性时间尺度上贡献二次变差。

**定理 26.17（一元 Itô 公式）**

设一维 Itô 过程满足
$$
X_t=X_0+\int_0^ta_s\,\mathrm ds+\int_0^tb_s\,\mathrm dB_s,
$$
其中 $a$ 为适应过程且几乎必然具有局部可积路径，$b\in\mathcal L_T^2$。若 $f\in C^2(\mathbb R)$，则 $f(X)$ 仍为 Itô 过程，并且
$$
\begin{aligned}
f(X_t)=f(X_0)&+\int_0^tf'(X_s)a_s\,\mathrm ds
+\int_0^tf'(X_s)b_s\,\mathrm dB_s\\
&+\frac12\int_0^tf''(X_s)b_s^2\,\mathrm ds .
\end{aligned}\tag{26.23}
$$
等价地，$[X]_t=\int_0^tb_s^2\,\mathrm ds$，并可写成微分形式
$$
\mathrm df(X_t)=f'(X_t)\,\mathrm dX_t+\frac12f''(X_t)\,\mathrm d[X]_t.
$$

**证明**

先用停时把 $X$、$a$、$b$ 截断为有界过程，并在该有界范围内用与原函数一致的 $C^2$ 函数代替 $f$，因而可设 $f'$、$f''$ 有界且 $f''$ 一致连续。若已证明停止过程的公式，令停时趋于 $T$，各项分别按路径积分或随机积分的局部化定义收敛，即恢复原公式。

取分割 $0=t_0<\cdots<t_n=t$，记 $\Delta X_k=X_{t_{k+1}}-X_{t_k}$。二阶 Taylor 公式给出介于 $X_{t_k}$ 与 $X_{t_{k+1}}$ 之间的点 $\xi_k$，使
$$
\begin{aligned}
f(X_{t_{k+1}})-f(X_{t_k})
={}&f'(X_{t_k})\Delta X_k
+\frac12f''(X_{t_k})(\Delta X_k)^2+R_k,\\
R_k={}&\frac12\bigl(f''(\xi_k)-f''(X_{t_k})\bigr)(\Delta X_k)^2 .
\end{aligned}\tag{26.24}
$$
对 $k$ 求和时，左端望远镜化为 $f(X_t)-f(X_0)$。一阶项中，把 $\Delta X_k$ 分成漂移增量与随机积分增量。由 $X$ 的路径连续性及 $f'$ 的连续有界性，漂移部分的左端点黎曼和收敛到 $\int_0^tf'(X_s)a_s\,\mathrm ds$；随机积分部分按 $\mathcal L_t^2$ 范数收敛到 $\int_0^tf'(X_s)b_s\,\mathrm dB_s$，故至少沿子序列几乎必然收敛。

二阶项包含真正的 Itô 修正。对固定的 $k$，由 Itô 等距，
$$
\mathbb E\left[\left(\int_{t_k}^{t_{k+1}}b_s\,\mathrm dB_s\right)^2\right]
=\mathbb E\int_{t_k}^{t_{k+1}}b_s^2\,\mathrm ds .
$$
漂移增量的平方是二阶时间小量，漂移与随机积分的交叉项在求和后也由 Cauchy–Schwarz 不等式趋于零。先用简单过程逼近 $b$，再对 Brown 运动使用独立增量及 $\operatorname{Var}((\Delta B_k)^2)=2(\Delta t_k)^2$，可得
$$
\sum_{k=0}^{n-1}(\Delta X_k)^2\longrightarrow\int_0^tb_s^2\,\mathrm ds
$$
依概率成立。乘以左端点处连续、有界的 $f''(X_{t_k})$ 后，同一极限论证给出
$$
\sum_{k=0}^{n-1}f''(X_{t_k})(\Delta X_k)^2
\longrightarrow\int_0^tf''(X_s)b_s^2\,\mathrm ds .
$$
最后估计 Taylor 余项。设 $\omega$ 为 $f''$ 在截断范围内的一致连续模，$\delta_n=\max_k|\Delta X_k|$，则
$$
\sum_{k=0}^{n-1}|R_k|
\le\frac12\omega(\delta_n)\sum_{k=0}^{n-1}(\Delta X_k)^2 .
$$
路径连续性给出 $\delta_n\to0$，故 $\omega(\delta_n)\to0$；增量平方和依概率有有限极限，所以余项和依概率趋于零。合并一阶项、二阶项与余项即得式（26.23）。微分形式只是积分形式的简写。

□

若 $X$ 具有有限变差，则 $[X]=0$，式（26.23）退化为普通链式法则；若 $X=B$，则 $[B]_t=t$，多出的项正是 $\frac12\int_0^tf''(B_s)\,\mathrm ds$。

**定理 26.18（含时与多维 Itô 公式）**

若 $f\in C^{1,2}([0,T]\times\mathbb R)$，而 $X$ 与定理 26.17 中相同，则
$$
\begin{aligned}
f(t,X_t)=f(0,X_0)&+\int_0^t\left(\partial_tf+f'(X_s)a_s+\frac12f''(X_s)b_s^2\right)\mathrm ds\\
&+\int_0^tf'(X_s)b_s\,\mathrm dB_s ,
\end{aligned}\tag{26.25}
$$
其中 $f$ 及其偏导数均在 $(s,X_s)$ 处取值。

更一般地，设 $\boldsymbol X$ 为 $m$ 维 Itô 过程，$\boldsymbol B$ 为 $d$ 维 Brown 运动，并且
$$
\mathrm d\boldsymbol X_t=\boldsymbol a_t\,\mathrm dt+\boldsymbol b_t\,\mathrm d\boldsymbol B_t,
\qquad \boldsymbol\Sigma_t=\boldsymbol b_t\boldsymbol b_t^\top .
$$
若 $f\in C^{1,2}([0,T]\times\mathbb R^m)$，则
$$
\begin{aligned}
\mathrm df(t,\boldsymbol X_t)
={}&\left(\partial_tf+\nabla f^\top\boldsymbol a_t
+\frac12\operatorname{tr}(\boldsymbol\Sigma_t\nabla^2f)\right)\mathrm dt\\
&+\nabla f^\top\boldsymbol b_t\,\mathrm d\boldsymbol B_t .
\end{aligned}\tag{26.26}
$$
这里 $\operatorname{tr}(\boldsymbol\Sigma\nabla^2f)=\sum_{i,j=1}^m\Sigma^{ij}\partial_{ij}f$，而 $\mathrm d[X^i,X^j]_t=\Sigma_t^{ij}\,\mathrm dt$。

式（26.25）只需在 Taylor 展开中加入 $\partial_tf(t_k,X_{t_k})\Delta t_k$；式（26.26）则使用多元二阶 Taylor 公式，并以协变差 $\mathrm d[X^i,X^j]_t$ 替换二阶混合增量。各项收敛与余项估计同一元证明相同，仅将绝对值替换为向量范数，并用矩阵迹收集所有二阶项。

多维证明中的关键计算是
$$
\Delta X_k^i\Delta X_k^j
\approx\Sigma_{t_k}^{ij}\Delta t_k,
$$
其含义是左端求和后依概率收敛到 $[X^i,X^j]_t$。对非对角项使用极化恒等式 $2xy=(x+y)^2-x^2-y^2$，即把混合协变差化为三个二次变差；随后沿用一元情形的有界系数逼近与连续模估计，便可逐项得到式（26.26）。

对两个一维 Itô 过程 $X,Y$，取 $f(x,y)=xy$。由于 $\partial_{xx}f=\partial_{yy}f=0$ 且 $\partial_{xy}f=1$，式（26.26）立即给出乘积法则
$$
X_tY_t=X_0Y_0+\int_0^tX_s\,\mathrm dY_s
+\int_0^tY_s\,\mathrm dX_s+[X,Y]_t .\tag{26.27}
$$
若 $\mathrm dX_t=a_t\mathrm dt+b_t\mathrm dB_t$、$\mathrm dY_t=c_t\mathrm dt+d_t\mathrm dB_t$，则 $\mathrm d[X,Y]_t=b_td_t\mathrm dt$。因此，普通微积分中的分部积分公式只在二次协变差为零时无须修正。

Stratonovich 积分采用区间中点或被积过程增量的对称化，其与原 Itô 积分的关系为
$$
\int_0^tY_s\circ\mathrm dB_s
=\int_0^tY_s\,\mathrm dB_s+\frac12[Y,B]_t .
$$
在这一对称约定下，链式法则恢复为 $\mathrm df(X)=f'(X)\circ\mathrm dX$。Itô 形式把非预见性修正显式放入漂移，适合鞅与条件期望；Stratonovich 形式保持普通微积分外观，适合几何与随机微分方程的坐标表达，两者通过上述协变差项等价转换。
式（26.25）中的 $f'(X_s)$ 与 $f''(X_s)$ 分别简记 $\partial_xf(s,X_s)$ 与 $\partial_{xx}f(s,X_s)$。以下把时间变量全部写出，并给出定理 26.18 的完整证明；这样也补齐了含时公式、多维公式及其余项估计。

**证明**

先设 $\boldsymbol X$ 有界，$\boldsymbol a$、$\boldsymbol b$ 有界，且 $f$ 的一阶时间偏导数及至二阶的空间偏导数均有界并一致连续。一般情形可在证明末尾用停止与截断恢复。取分割 $0=t_0<\cdots<t_n=t$，记 $\Delta t_k=t_{k+1}-t_k$、$\Delta\boldsymbol X_k=\boldsymbol X_{t_{k+1}}-\boldsymbol X_{t_k}$。在空间变量上使用带积分余项的二阶 Taylor 公式，在时间变量上使用一阶中值公式，得到
$$
\begin{aligned}
\Delta f_k={}&\partial_tf(t_k,\boldsymbol X_{t_k})\Delta t_k
+\nabla f(t_k,\boldsymbol X_{t_k})^\top\Delta\boldsymbol X_k\\
&+\frac12\Delta\boldsymbol X_k^\top\nabla^2f(t_k,\boldsymbol X_{t_k})\Delta\boldsymbol X_k
+R_k^{(t)}+R_k^{(x)},
\end{aligned}
$$
其中 $\Delta f_k=f(t_{k+1},\boldsymbol X_{t_{k+1}})-f(t_k,\boldsymbol X_{t_k})$。时间余项来自中值点与 $(t_k,\boldsymbol X_{t_k})$ 之间的差，空间余项来自 Hessian 在连接两状态的线段上的变化。

令 $\delta_n$ 为最大时间步长与各分量最大增量中的较大者。路径连续性与一致连续性给出 $\varepsilon_n\to 0$ 几乎必然，使得
$$
|R_k^{(t)}|\le\varepsilon_n\Delta t_k,
\qquad
|R_k^{(x)}|\le\varepsilon_n\|\Delta\boldsymbol X_k\|^2 .
$$
因此 $\sum_k|R_k^{(t)}|\le\varepsilon_nt$。同时，$\sum_k\|\Delta\boldsymbol X_k\|^2$ 依概率收敛于 $\sum_i[X^i]_t$，故它有依概率有界的子列控制，而 $\varepsilon_n\to 0$，从而两类余项之和均依概率趋于零。事实上，依概率收敛到有限随机变量的数列必依概率有界：对任意 $\eta>0$，先取 $A$ 使极限落入 $[-A,A]$ 外的概率小于 $\eta/2$，再利用依概率收敛，便可为充分靠后的所有项统一选择界；有限个前项不影响结论。因而上述余项估计对整个分割序列成立，无须另取子列。

一阶时间项由 $\partial_tf$ 的连续轨线收敛到 $\int_0^t\partial_tf(s,\boldsymbol X_s)\,\mathrm ds$。将 $\Delta\boldsymbol X_k$ 写成漂移积分与随机积分在该小区间上的增量，左端点阶梯逼近分别给出
$$
\sum_k\nabla f_k^\top\boldsymbol a_{t_k}\Delta t_k
\to\int_0^t\nabla f^\top\boldsymbol a_s\,\mathrm ds,
\qquad
\sum_k\nabla f_k^\top\boldsymbol b_{t_k}\Delta\boldsymbol B_k
\to\int_0^t\nabla f^\top\boldsymbol b_s\,\mathrm d\boldsymbol B_s,
$$
其中 $\nabla f_k=\nabla f(t_k,\boldsymbol X_{t_k})$，极限均依概率成立。小区间内部系数的差分别被漂移的全变差和 Itô 等距控制。

对二阶项，固定 $i,j$，令 $U=X^i+X^j$、$V=X^i-X^j$。极化恒等式给出
$$
\Delta X_k^i\Delta X_k^j
=\frac14\big((\Delta U_k)^2-(\Delta V_k)^2\big).
$$
将定理 26.17 证明中已经建立的“左端点权重乘二次增量”的极限分别用于一维 Itô 过程 $U,V$，得到
$$
\sum_k\partial_{ij}f(t_k,\boldsymbol X_{t_k})\Delta X_k^i\Delta X_k^j
\to\int_0^t\partial_{ij}f(s,\boldsymbol X_s)\,\mathrm d[X^i,X^j]_s .
$$
这里 $[X^i,X^j]_t=\int_0^t\Sigma_s^{ij}\,\mathrm ds$。对 $i,j$ 求和，并利用 $\operatorname{tr}(\boldsymbol\Sigma\nabla^2f)=\sum_{i,j}\Sigma^{ij}\partial_{ij}f$，便得到式（26.26）的全部漂移项与随机积分项。

最后取停止时间 $\tau_R$ 与截断系数，使停止后的状态、漂移和扩散系数满足开头的有界假设，并令 $R\uparrow\infty$。连续 Itô 过程的这些停止时间几乎必然最终大于固定的 $t$；有界情形所得等式在 $\{\tau_R>t\}$ 上逐路径成立，两侧又分别依概率收敛到未截断的积分，故一般情形下式（26.26）成立。取 $m=d=1$ 即得式（26.25），其中 $\Sigma_s=b_s^2$。

□
式（26.27）的乘积法则也可直接核验如下。

**证明**

令 $\boldsymbol Z_t=(X_t,Y_t)^\top$，并把驱动两个过程的 Brown 运动按分量堆叠；若原式使用同一个 Brown 运动，则只需让相应的扩散系数行相同。于是 $\boldsymbol Z$ 是二维 Itô 过程。取 $f(x,y)=xy$，则
$$
\nabla f(x,y)=\begin{pmatrix}y\\x\end{pmatrix},
\qquad
\nabla^2f(x,y)=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$
式（26.26）中的漂移项因此由 $Y\,\mathrm dX$ 与 $X\,\mathrm dY$ 的漂移部分组成，而 Hessian 产生的唯一修正是
$$
\frac12\big(\mathrm d[X,Y]_t+\mathrm d[Y,X]_t\big)
=\mathrm d[X,Y]_t .
$$
随机积分部分同理为 $Y_t$ 与 $X_t$ 分别乘对方的扩散增量。合并并积分即得式（26.27）。若两个过程由不同的多维 Brown 运动驱动，设扩散系数矩阵分别为 $\boldsymbol b_t,\boldsymbol d_t$，则同一计算还给出
$$
[X,Y]_t=\int_0^t\boldsymbol b_s\boldsymbol d_s^\top\,\mathrm ds .
$$
在一维共同驱动情形，这就是 $[X,Y]_t=\int_0^tb_sd_s\,\mathrm ds$，所以乘积法则与普通分部积分之差恰好是二次协变差。

□
## 26.6 由 Itô 公式导出的重要结果

Itô 公式不仅是计算随机微分的规则，也把随机微分方程、鞅、局部时与 Brown 运动的结构联系起来。本节的四条主线都源于同一个观察：恰当选取函数后，随机积分项可以单独分离，而二阶项则给出可计算的漂移或二次变差。

### 26.6.1 几何 Brown 运动

设 $\mu\in\mathbb R$、$\sigma>0$，初值 $s_0>0$。几何 Brown 运动是随机微分方程
$$
\mathrm dS_t=\mu S_t\,\mathrm dt+\sigma S_t\,\mathrm dB_t,
\qquad S_0=s_0
$$
的正值解。由于 $S_t$ 为正，可对 $f(x)=\log x$ 使用 Itô 公式。此时 $f'(x)=1/x$、$f''(x)=-1/x^2$，故
$$
\begin{aligned}
\mathrm d\log S_t
&=\frac{1}{S_t}\,\mathrm dS_t
+\frac12\left(-\frac{1}{S_t^2}\right)(\mathrm dS_t)^2\\
&=\left(\mu-\frac12\sigma^2\right)\mathrm dt+\sigma\,\mathrm dB_t .
\end{aligned}
$$
从 $0$ 到 $t$ 积分并取指数，得到唯一候选解
$$
S_t=s_0\exp\left(\left(\mu-\frac12\sigma^2\right)t+\sigma B_t\right).
\tag{26.28}
$$
反向验证不可省略：式（26.28）定义的 $S_t$ 显然严格为正，对 $f(t,x)=s_0e^{(\mu-\sigma^2/2)t+\sigma x}$ 使用含时 Itô 公式，恰有 $\mathrm dS_t=(\mu-\sigma^2/2)S_t\,\mathrm dt+\frac12\sigma^2S_t\,\mathrm dt+\sigma S_t\,\mathrm dB_t$，即满足原方程。

唯一性也可直接说明。任一从 $s_0$ 出发的连续解在首次到达零之前都必须按上述对数计算等于式（26.28）；但指数式在有限时间内严格为正，不可能趋于零，因此首次到零时间几乎必然为无穷大。故式（26.28）是全局唯一正值解。特别地，$\log(S_t/s_0)$ 服从均值 $(\mu-\sigma^2/2)t$、方差 $\sigma^2t$ 的正态分布；参数 $\mu$ 是价格的瞬时漂移，而 $\mu-\sigma^2/2$ 是对数价格的漂移，两者的差正是 Itô 修正。
**例 26.5**

由式（26.28）计算 $S_t$ 的各阶矩、方差以及阈值概率 $\mathbb P(S_t>K)$，其中 $K>0$。

**解**

令 $Z=B_t/\sqrt t$，则 $Z$ 服从标准正态分布。其矩母函数由平方配方法得到：
$$
\mathbb E e^{\lambda Z}
=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}
e^{\lambda z-z^2/2}\,\mathrm dz
=e^{\lambda^2/2}.
$$
对任意正整数 $n$，在式（26.28）中取 $n$ 次幂并使用 $\lambda=n\sigma\sqrt t$，得到
$$
\mathbb E S_t^n
=s_0^n\exp\left(n\mu t+\frac12n(n-1)\sigma^2t\right).
$$
分别取 $n=1,2$，并用 $\operatorname{Var}(S_t)=\mathbb E S_t^2-(\mathbb E S_t)^2$，便有
$$
\mathbb E S_t=s_0e^{\mu t},
\qquad
\operatorname{Var}(S_t)=s_0^2e^{2\mu t}\left(e^{\sigma^2t}-1\right).
\tag{26.29}
$$
因此 $\mathbb E S_t$ 按漂移 $\mu$ 增长，而二阶 Itô 修正使 $\mathbb E S_t^2$ 中出现额外的 $\sigma^2$ 指数项。

再计算阈值概率。由对数正态表示，
$$
\begin{aligned}
\mathbb P(S_t>K)
&=\mathbb P\left(Z>\frac{\log(K/s_0)-(\mu-\sigma^2/2)t}{\sigma\sqrt t}\right)\\
&=\Phi\left(\frac{\log(s_0/K)+(\mu-\sigma^2/2)t}{\sigma\sqrt t}\right),
\end{aligned}
$$
其中 $\Phi$ 为标准正态分布函数，最后一步使用了 $\mathbb P(Z>z)=1-\Phi(z)=\Phi(-z)$。当 $\mu=0$ 时，式（26.28）还可写成 $S_t=s_0\exp(\sigma B_t-\sigma^2t/2)$；下面的指数鞅结论将说明 $S_t/s_0$ 是鞅，而不只是具有恒定均值。
### 26.6.2 指数鞅与 Novikov 条件

设 $M$ 是满足 $M_0=0$ 的连续局部鞅，其二次变差为 $\langle M\rangle$。定义随机指数
$$
\mathcal E(M)_t=\exp\left(M_t-\frac12\langle M\rangle_t\right).
$$
Itô 公式给出
$$
\mathrm d\mathcal E(M)_t
=\mathcal E(M)_t\,\mathrm dM_t,
$$
所以 $\mathcal E(M)$ 是非负连续局部鞅。取局部化停时列 $\tau_n\uparrow\infty$，对 $s<t$ 使用条件 Fatou 引理，得到
$$
\mathbb E[\mathcal E(M)_{t\wedge\tau_n}\mid\mathcal F_s]
=\mathcal E(M)_{s\wedge\tau_n},
\qquad
\mathbb E[\mathcal E(M)_t\mid\mathcal F_s]
\le \mathcal E(M)_s .
$$
因此随机指数总是非负上鞅，并且 $\mathbb E\mathcal E(M)_t\le1$。若它在每个有界区间上的期望恒为 $1$，则上式不能在任何正概率事件上严格成立，故它实际上是鞅。这一判别把随机指数的鞅性化为终端期望是否等于 $1$。

特别地，当 $M_t=\int_0^tH_s\,\mathrm dB_s$ 时，有
$$
\mathcal E(M)_t
=\exp\left(\int_0^tH_s\,\mathrm dB_s-\frac12\int_0^tH_s^2\,\mathrm ds\right).
$$
它一般只是局部鞅；二次变差的指数可积性给出如下充分条件，即 Novikov 判据：若
$$
C_T:=\mathbb E\exp\left(\frac12\langle M\rangle_T\right)<\infty ,
$$
则 $\mathcal E(M)$ 在 $[0,T]$ 上是真鞅。

**证明**

先固定 $0<a<1$，记 $Z=\mathcal E(M)$、$Z^{(a)}=\mathcal E(aM)$，并取局部化停时列 $\tau_n\uparrow T$，使 $M$ 与 $\langle M\rangle$ 在 $[0,\tau_n]$ 上有界。则有 $\mathbb E Z^{(a)}_{t\wedge\tau_n}=1$。下面证明这些随机变量关于 $n$ 一致可积。取 $1<p<a^{-1}$，再取充分大的 $r>1$，使得
$$
\gamma:=\frac{a^2p(rp-1)}{2(r-1)}\le\frac12 .
$$
对任意不超过 $T$ 的停时 $\tau$，代数恒等式
$$
\begin{aligned}
apM_\tau-\frac{a^2p}{2}\langle M\rangle_\tau
={}&\frac1r\left(rapM_\tau-\frac{r^2a^2p^2}{2}\langle M\rangle_\tau\right)\\
&+\left(1-\frac1r\right)\gamma\langle M\rangle_\tau
\end{aligned}
$$
与 Hölder 不等式给出
$$
\begin{aligned}
\mathbb E\bigl(Z^{(a)}_\tau\bigr)^p
&\le\left(\mathbb E\mathcal E(rapM)_\tau\right)^{1/r}
\left(\mathbb E e^{\gamma\langle M\rangle_\tau}\right)^{(r-1)/r}\\
&\le C_T^{(r-1)/r}.
\end{aligned}
$$
这里第一项不超过 $1$，因为随机指数是非负上鞅。故 $\{Z^{(a)}_{\tau_n}\}_n$ 的 $p$ 阶矩一致有界，从而一致可积；令 $n\to\infty$ 得 $\mathbb E Z^{(a)}_T=1$。

另一方面，$Z^{(a)}_T=Z_T^a\exp(a(1-a)\langle M\rangle_T/2)$。再次使用 Hölder 不等式，得到
$$
\begin{aligned}
1
&\le(\mathbb E Z_T)^a
\left(\mathbb E e^{a\langle M\rangle_T/2}\right)^{1-a}\\
&\le(\mathbb E Z_T)^aC_T^{1-a}.
\end{aligned}
$$
因而 $\mathbb E Z_T\ge C_T^{-(1-a)/a}$。令 $a\uparrow1$，右端趋于 $1$；结合 $\mathbb E Z_T\le1$，必有 $\mathbb E Z_T=1$。把 $M$ 换为在任意 $t\le T$ 停止的过程 $M^t$，同样的论证给出 $\mathbb E Z_t=1$。所以 $Z$ 的期望恒为 $1$，由证明前的判别可知 $Z$ 是 $[0,T]$ 上的鞅。

□

当 $\langle M\rangle_T$ 有界时，Novikov 条件自动成立。该条件只要求二次变差的指数可积性，并不要求 $M_T$ 本身具有正态分布，也不要求 $H$ 有界。
### 26.6.3 Tanaka 公式与 Brown 局部时

绝对值函数在零点不可微，不能直接使用二阶连续可微函数的 Itô 公式。对固定 $a\in\mathbb R$，Tanaka 公式断言：存在非负、连续、非减的适应过程 $L^a$，使得
$$
|B_t-a|=|a|+\int_0^t\operatorname{sgn}(B_s-a)\,\mathrm dB_s+L_t^a ,
$$
其中 $\operatorname{sgn}(x)$ 在 $x>0$、$x<0$、$x=0$ 时分别取 $1$、$-1$、$0$。过程 $L_t^a$ 称为 Brown 运动在水平 $a$ 的局部时，其测度 $\mathrm dL_t^a$ 仅由集合 $\{s\le t:B_s=a\}$ 承载。

**证明**

取对称、非负的光滑磨光核 $\rho_\varepsilon$，其支撑含于 $[-\varepsilon,\varepsilon]$，积分为 $1$，并令
$$
f_\varepsilon(x)=\int_{\mathbb R}|x-a-y|\rho_\varepsilon(y)\,\mathrm dy .
$$
则 $|f_\varepsilon(x)-|x-a||\le\varepsilon$，$|f_\varepsilon'|\le1$，并且当 $x\ne a$ 时 $f_\varepsilon'(x)\to\operatorname{sgn}(x-a)$，而 $f_\varepsilon'(a)=0$。此外 $f_\varepsilon''(x)=2\rho_\varepsilon(x-a)$。对 $f_\varepsilon(B_t)$ 使用 Itô 公式，得到
$$
\begin{aligned}
f_\varepsilon(B_t)
={}&f_\varepsilon(0)+\int_0^tf_\varepsilon'(B_s)\,\mathrm dB_s\\
&+\int_0^t\rho_\varepsilon(B_s-a)\,\mathrm ds .
\end{aligned}
$$
记最后一个积分为 $L_t^{a,\varepsilon}$。由于 Brown 运动在单点花费的时间期望为 $\int_0^t\mathbb P(B_s=a)\,\mathrm ds=0$，该时间几乎必然为零。于是被积函数 $f_\varepsilon'(B_s)-\operatorname{sgn}(B_s-a)$ 在乘积测度下几乎必然趋于零，且绝对值不超过 $2$。Doob 不等式和 Itô 等距因此给出
$$
\begin{aligned}
&\mathbb E\sup_{u\le t}\left|\int_0^u
(f_\varepsilon'(B_s)-\operatorname{sgn}(B_s-a))\,\mathrm dB_s\right|^2\\
&\qquad\le4\mathbb E\int_0^t
|f_\varepsilon'(B_s)-\operatorname{sgn}(B_s-a)|^2\,\mathrm ds
\longrightarrow0 .
\end{aligned}
$$
前两项随之在 $[0,t]$ 上一致收敛，所以 $L^{a,\varepsilon}$ 也在概率意义下一致收敛。其极限 $L^a$ 连续、适应且非减，并满足 Tanaka 公式。

若 $u<v$，且在 $[u,v]$ 上有 $|B_s-a|\ge\delta$，则当 $\varepsilon<\delta$ 时，$L_v^{a,\varepsilon}-L_u^{a,\varepsilon}=0$，取极限得 $L_v^a-L_u^a=0$。路径连续性保证任意不接触水平 $a$ 的开时间区间都能被这样的区间覆盖，故 $\mathrm dL^a$ 只在 $B_s=a$ 时增加。

局部时还满足占用时间恒等式：对每个有界连续函数 $g$，
$$
\int_0^tg(B_s)\,\mathrm ds
=\int_{\mathbb R}g(a)L_t^a\,\mathrm da .
$$
为证明这一点，令 $\mu_t$ 为路径占用测度，即 $\mu_t(A)=\int_0^t\mathbf1_A(B_s)\,\mathrm ds$。由 Fubini 定理，
$$
\int_{\mathbb R}g(a)L_t^{a,\varepsilon}\,\mathrm da
=\int_0^t\int_{\mathbb R}g(a)\rho_\varepsilon(B_s-a)
\,\mathrm da\,\mathrm ds .
$$
内层积分是 $g$ 的磨光，并一致趋于 $g$，故右端趋于 $\int_0^tg(B_s)\,\mathrm ds$。另一方面，密度为 $L^{a,\varepsilon}$ 的测度就是 $\mu_t*\rho_\varepsilon$。在固定样本路径上，Brown 运动在 $[0,t]$ 上的像有界，所以这些测度支撑于共同紧集且总质量均为 $t$。任取弱收敛子列，利用已证明的每个固定水平的收敛，并取对角子列，可使其密度在 Lebesgue 测度零集之外趋于 $L^a$；弱极限因而以 $L^a$ 为密度。由于 $\mu_t*\rho_\varepsilon$ 又弱收敛于 $\mu_t$，两个极限相同，这正给出占用时间恒等式。最后选取由上述构造得到的联合可测版本，即可对有界 Borel 函数用单调类定理推广该恒等式。

□

特别地，局部时不是以普通时间计的停留时长，而是占用测度关于水平变量的密度；它记录了路径在某一水平附近累积的局部访问强度。上述弱收敛步骤中的子列应在乘积空间上统一选取。事实上，由 $L^{a,\varepsilon}$ 的 Tanaka 表达式、
$$
|f_\varepsilon(B_t)-f_\varepsilon(0)|
\le |B_t|+2\varepsilon,
\qquad |f_\varepsilon'|\le1
$$
以及 Itô 等距，可得到不依赖 $a$ 与 $\varepsilon\in(0,1]$ 的估计
$$
\sup_{a,\varepsilon}\mathbb E|L_t^{a,\varepsilon}|^2
\le2\mathbb E(|B_t|+2)^2+2t<\infty .
$$
所以对每个有界区间 $I$，族 $\{L^{a,\varepsilon}\}$ 在 $L^2(\Omega\times I)$ 中有界，必有弱收敛子列。固定 $a$ 时，一致概率收敛与二阶矩界又给出 $L^1(\Omega)$ 收敛，故该弱极限在乘积测度的零测集之外必为 $L^a$。这就严格识别了占用测度弱极限的密度，而无需对不可数多个水平分别选取同一个对角子列。
### 26.6.4 Lévy 的 Brown 运动刻画

Lévy 刻画断言：若 $d$ 维过程 $X$ 关于滤过 $(\mathcal F_t)$ 是连续局部鞅，$X_0=0$，且其各分量的协变差满足
$$
\langle X^j,X^k\rangle_t=\delta_{jk}t,
\qquad 1\le j,k\le d,
$$
则 $X$ 是关于该滤过的 $d$ 维标准 Brown 运动。这里 $\delta_{jk}$ 在 $j=k$ 时为 $1$，否则为 $0$。因此，路径连续性加上正确的二次变差，已经完全决定了 Brown 运动的分布结构。

**证明**

任取 $\lambda\in\mathbb R^d$，令 $Y_t=\lambda^\top X_t$。由假设，$Y$ 是连续局部鞅，且 $\langle Y\rangle_t=|\lambda|^2t$。对复值函数 $e^{iy}$ 使用 Itô 公式，分别考察实部和虚部，得到
$$
\mathrm d e^{iY_t}
=ie^{iY_t}\,\mathrm dY_t-\frac{|\lambda|^2}{2}e^{iY_t}\,\mathrm dt .
$$
随机积分项的二次变差为 $|\lambda|^2t$，其期望有限，所以它实际上是有界区间上的平方可积鞅，而不只是局部鞅。

固定 $s<t$，对上式从 $s$ 到 $u$ 积分并取关于 $\mathcal F_s$ 的条件期望。由于指数函数有界，积分与条件期望可以交换，故
$$
\varphi(u)=e^{iY_s}-\frac{|\lambda|^2}{2}
\int_s^u\varphi(v)\,\mathrm dv,
\qquad
\varphi(u):=\mathbb E[e^{iY_u}\mid\mathcal F_s].
$$
函数 $\varphi$ 连续并满足 $\varphi'(u)=-|\lambda|^2\varphi(u)/2$，初值为 $\varphi(s)=e^{iY_s}$。该常微分方程的解唯一，因此
$$
\mathbb E[e^{iY_t}\mid\mathcal F_s]
=e^{iY_s}e^{-|\lambda|^2(t-s)/2}.
$$
两边乘以 $e^{-iY_s}$，便有
$$
\mathbb E\left[e^{i\lambda^\top(X_t-X_s)}\mid\mathcal F_s\right]
=e^{-|\lambda|^2(t-s)/2}.
$$
右端为确定性常数，所以 $X_t-X_s$ 与 $\mathcal F_s$ 独立；同时，其条件特征函数就是均值零、协方差矩阵 $(t-s)I_d$ 的正态特征函数，故增量服从该正态分布。对 $0=t_0<t_1<\cdots<t_n$ 逐段取条件期望，可得各增量的联合特征函数等于各自特征函数之积，因而各增量相互独立。结合 $X_0=0$ 与路径连续性，$X$ 满足 $d$ 维标准 Brown 运动的全部定义条件。

□

这一刻画把“是否为 Brown 运动”的问题转化为二次变差计算，在随机波动率模型、时间变换以及连续鞅的识别中尤为有效。
## 26.7 量化应用

### 26.7.1 对数价格模型

设正值价格过程 $S$ 在物理概率测度下满足
$$
\mathrm dS_t=\mu_tS_t\,\mathrm dt
+S_t\boldsymbol\sigma_t^\top\mathrm d\boldsymbol B_t,
$$
其中 $\boldsymbol B$ 为 $d$ 维 Brown 运动，$\mu$ 与 $\boldsymbol\sigma$ 为可料过程，并在所考察区间上满足 $\int_0^t(|\mu_s|+\|\boldsymbol\sigma_s\|^2)\,\mathrm ds<\infty$。对 $\log S_t$ 使用 Itô 公式，漂移中的二阶项为 $-\|\boldsymbol\sigma_t\|^2/2$，所以积分后得到
$$
\begin{aligned}
X_t:=\log\frac{S_t}{S_0}
&=\int_0^t\left(\mu_s-\frac12\|\boldsymbol\sigma_s\|^2\right)\mathrm ds
+\int_0^t\boldsymbol\sigma_s^\top\mathrm d\boldsymbol B_s,\\
S_t&=S_0\exp(X_t).
\end{aligned}
\tag{26.30}
$$
这里 $X$ 是累计对数收益。算术收益的瞬时漂移为 $\mu_t$，对数收益的瞬时漂移则为 $\mu_t-\|\boldsymbol\sigma_t\|^2/2$；两者不能混用。若市场处于风险中性测度下，且标的不支付红利，则无套利条件把漂移限定为短期利率，但式（26.30）中的 Itô 修正保持不变。

式（26.30）也说明，波动率既进入价格分布的扩散项，也通过二次变差进入漂移项。因而仅估计平均价格漂移并不足以描述复利收益，还必须估计路径上的累计方差。
### 26.7.2 已实现波动率及其收敛

高频数据给出的是离散观测，而式（26.30）的扩散风险由积分方差刻画。取区间 $[0,T]$ 的分划 $\Pi_n=\{0=t_0^n<\cdots<t_{m_n}^n=T\}$，令其网眼 $|\Pi_n|=\max_k(t_{k+1}^n-t_k^n)$ 趋于零。定义已实现方差、积分方差与已实现波动率为
$$
\mathrm{RV}_T^{(n)}
:=\sum_{k=0}^{m_n-1}(X_{t_{k+1}^n}-X_{t_k^n})^2,
\qquad
\mathrm{IV}_T:=\int_0^T\|\boldsymbol\sigma_s\|^2\,\mathrm ds,
\qquad
\mathrm{RVol}_T^{(n)}:=\sqrt{\mathrm{RV}_T^{(n)}} .
\tag{26.31}
$$
以下结论说明，在对数价格上计算已实现方差，可以直接消除有限变差漂移对极限的贡献。

**定理 26.19（已实现方差的收敛）**

设 $X=A+M$，其中 $A_t=\int_0^t(\mu_s-\|\boldsymbol\sigma_s\|^2/2)\,\mathrm ds$，$M_t=\int_0^t\boldsymbol\sigma_s^\top\mathrm d\boldsymbol B_s$，并且 $\int_0^T(|\mu_s|+\|\boldsymbol\sigma_s\|^2)\,\mathrm ds<\infty$ 几乎必然成立。若 $|\Pi_n|\to0$，则 $\mathrm{RV}_T^{(n)}\to\mathrm{IV}_T$ 依概率成立，且 $\mathrm{RVol}_T^{(n)}\to\sqrt{\mathrm{IV}_T}$ 依概率成立。

**证明**

记 $a_s=\mu_s-\|\boldsymbol\sigma_s\|^2/2$，并将分划上的增量写为 $\Delta_k^nY=Y_{t_{k+1}^n}-Y_{t_k^n}$。由平方展开，
$$
\sum_k(\Delta_k^nX)^2
=\sum_k(\Delta_k^nM)^2+2\sum_k\Delta_k^nA\,\Delta_k^nM
+\sum_k(\Delta_k^nA)^2 .
$$
路径 $A$ 在 $[0,T]$ 上连续，故其最大分划增量几乎必然趋于零，并且
$$
\sum_k(\Delta_k^nA)^2
\le\sup_k|\Delta_k^nA|\int_0^T|a_s|\,\mathrm ds\to0
$$
几乎必然成立。连续局部鞅的二次变差定理给出 $\sum_k(\Delta_k^nM)^2\to[M]_T$ 依概率成立，所以这些平方和依概率有界。由 Cauchy--Schwarz 不等式，
$$
\left|\sum_k\Delta_k^nA\,\Delta_k^nM\right|
\le\left(\sum_k(\Delta_k^nA)^2\right)^{1/2}
\left(\sum_k(\Delta_k^nM)^2\right)^{1/2}\to0
$$
依概率成立。合并三项便得 $\mathrm{RV}_T^{(n)}\to[M]_T=\mathrm{IV}_T$ 依概率成立。平方根在 $[0,\infty)$ 上连续，连续映射定理随即给出已实现波动率的收敛。

□

实际成交价还含买卖报价弹跳与舍入误差，观测噪声并不会随取样加密而消失。因此，式（26.31）是无噪声对数价格上的理论基准；处理逐笔数据时，应结合稀疏取样、预平均或其他噪声修正，而不能把无限加密直接等同于无限精确。

### 26.7.3 收益归因与分散化

设有 $m$ 种风险资产，第 $j$ 种资产的价格满足
$$
\mathrm dS_t^j=S_t^j\mu_t^j\,\mathrm dt
+S_t^j(\boldsymbol\sigma_t^j)^\top\mathrm d\boldsymbol B_t .
$$
以 $\boldsymbol\Sigma_t$ 表示第 $j$ 行为 $(\boldsymbol\sigma_t^j)^\top$ 的矩阵，以可料向量 $\boldsymbol\pi_t$ 表示财富投入各风险资产的比例，其余财富按短期利率 $r_t$ 投资。自融资财富 $V$ 满足
$$
\frac{\mathrm dV_t}{V_t}
=\bigl(r_t+\boldsymbol\pi_t^\top(\boldsymbol\mu_t-r_t\boldsymbol1)\bigr)\mathrm dt
+\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\,\mathrm d\boldsymbol B_t .
$$
对 $\log V_t$ 使用 Itô 公式，得到增长率的归因式
$$
\mathrm d\log V_t
=\left(r_t+\boldsymbol\pi_t^\top(\boldsymbol\mu_t-r_t\boldsymbol1)
-\frac12\|\boldsymbol\Sigma_t^\top\boldsymbol\pi_t\|^2\right)\mathrm dt
+\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\,\mathrm d\boldsymbol B_t .
\tag{26.32}
$$
右端漂移依次表示无风险收益、风险溢价与波动率拖累，扩散项的瞬时方差为 $\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\boldsymbol\Sigma_t^\top\boldsymbol\pi_t$。分散化通过该二次型降低方差，却不会自动提高漂移；评价组合变化时必须同时考察风险溢价和二次变差修正。
**例 26.6**

考虑 $N$ 种价格过程
$$
\frac{\mathrm dS_t^j}{S_t^j}
=\mu\,\mathrm dt+\sigma\sqrt\rho\,\mathrm dB_t^0
+\sigma\sqrt{1-\rho}\,\mathrm dB_t^j,
\qquad 1\le j\le N,
$$
其中各 Brown 运动相互独立，$0\le\rho\le1$。求等权组合的瞬时方差与对数财富漂移，并考察 $N\to\infty$ 的极限。

**解**

等权组合的扩散项为
$$
\sigma\sqrt\rho\,\mathrm dB_t^0
+\frac{\sigma\sqrt{1-\rho}}N\sum_{j=1}^N\mathrm dB_t^j .
$$
独立性使其瞬时方差等于
$$
v_N=\sigma^2\rho+\frac{\sigma^2(1-\rho)}N .
$$
由式（26.32），全部财富投入该等权组合时，对数财富漂移为 $\mu-v_N/2$。当 $N$ 增大时，个体噪声的方差按 $1/N$ 消失，但共同因子的方差始终为 $\sigma^2\rho$，故 $\lim_{N\to\infty}v_N=\sigma^2\rho$。当 $\rho=0$ 时极限方差为零；当 $\rho>0$ 时，共同风险不能靠增加资产数量消除。

### 26.7.4 离散对冲

在连续时间模型中，复制组合要求不断调整持仓；实际交易只能在离散时刻进行。设在风险中性测度下
$$
\mathrm dS_t=rS_t\,\mathrm dt+\sigma S_t\,\mathrm dW_t,
$$
期权价值 $C(t,S_t)$ 足够光滑，并满足 Black--Scholes 偏微分方程。再平衡时刻为 $0=t_0<\cdots<t_n=T$，记 $\delta_i=t_{i+1}-t_i$、$\Delta_iS=S_{t_{i+1}}-S_{t_i}$。在 $t_i$ 持有 $\Delta_i=C_S(t_i,S_{t_i})$ 份标的，其余组合价值 $H_{t_i}-\Delta_iS_{t_i}$ 存入银行账户，则下一时刻调整前
$$
H_{t_{i+1}}^-=\Delta_iS_{t_{i+1}}
+(H_{t_i}-\Delta_iS_{t_i})e^{r\delta_i}.
$$

**命题 26.20（离散对冲误差递推）**

记 $C_i=C(t_i,S_{t_i})$，$E_i=H_{t_i}-C_i$，则
$$
E_{i+1}=e^{r\delta_i}E_i+R_i,
\qquad
R_i=e^{r\delta_i}C_i+\Delta_i(S_{t_{i+1}}-e^{r\delta_i}S_{t_i})-C_{i+1}.
\tag{26.33}
$$

**证明**

把 $H_{t_i}=E_i+C_i$ 代入调整前组合价值，整理银行账户与股票持仓，得到
$$
H_{t_{i+1}}^-=e^{r\delta_i}E_i+e^{r\delta_i}C_i
+\Delta_i(S_{t_{i+1}}-e^{r\delta_i}S_{t_i}).
$$
两边减去 $C_{i+1}$，即得式（26.33）。

□
式（26.33）是精确恒等式。对 $C$ 在 $(t_i,S_{t_i})$ 作二阶 Taylor 展开，并利用 $\Delta_iS=O_p(\delta_i^{1/2})$，可得
$$
R_i=\left[r(C_i-S_{t_i}\Delta_i)-C_t(t_i,S_{t_i})\right]\delta_i
-\frac12C_{SS}(t_i,S_{t_i})(\Delta_iS)^2+O_p(\delta_i^{3/2}).
$$
Black--Scholes 方程把方括号中的项化为 $\sigma^2S_{t_i}^2C_{SS}(t_i,S_{t_i})/2$，故
$$
R_i=\frac12C_{SS}(t_i,S_{t_i})
\left(\sigma^2S_{t_i}^2\delta_i-(\Delta_iS)^2\right)
+O_p(\delta_i^{3/2}).
\tag{26.34}
$$
因此，离散对冲的一阶误差来自实际平方价格变化与连续对冲所假定二次变差之间的差。若 $E_0=0$，递推还给出
$$
E_n=\sum_{i=0}^{n-1}e^{r(T-t_{i+1})}R_i .
$$
进一步设 $S^2C_{SS}$ 有界，高阶余项满足一致的矩界，并令 $h_n=\max_i\delta_i$。GBM 的条件矩给出
$$
\mathbb E[(\Delta_iS)^2\mid\mathcal F_{t_i}]
=\sigma^2S_{t_i}^2\delta_i+O(S_{t_i}^2\delta_i^2),
\qquad
\operatorname{Var}((\Delta_iS)^2\mid\mathcal F_{t_i})=O(S_{t_i}^4\delta_i^2).
$$
将各 $R_i$ 减去其条件期望，不同区间的中心化误差正交；条件偏差之和用 Cauchy--Schwarz 不等式估计，连同融资因子的一致有界性，可得 $\mathbb E[E_n^2]=O(h_n)$。故 $E_n\to0$ 依概率成立，均方根对冲误差为 $O(h_n^{1/2})$。连续对冲是离散对冲在网眼趋于零时的极限，而不是有限频率交易中的无误差假设。

**例 26.7**

某再平衡时刻有 $S_{t_i}=100$、$\sigma=0.20$、$\delta_i=1/252$、$C_{SS}(t_i,S_{t_i})=0.02$，区间内价格变化为 $\Delta_iS=1.50$。用式（26.34）计算局部对冲误差的主项。

**解**

连续对冲对应的方差项为
$$
\sigma^2S_{t_i}^2\delta_i=0.20^2\times100^2\times\frac1{252}
\approx1.58730,
$$
而实际平方变化为 $2.25$。因此
$$
R_i\approx\frac12\times0.02\times(1.58730-2.25)
\approx-0.006627 .
$$
主项为负，说明初始误差为零时，该区间的大幅实际价格变化使复制组合落后于期权价值；正 Gamma 会把两种二次变差的差直接转化为对冲盈亏。
## 本章小结

本章以 Brown 运动为核心建立了连续时间随机分析的基本框架。随机积分从简单可料过程出发，通过 Itô 等距完成推广；可积性条件既决定积分是否有定义，也决定它成为局部鞅还是平方可积鞅。二次变差揭示了 Brown 路径与有限变差路径的根本差别，并为随机积分的运算规则提供了基础。

Itô 公式把函数变换、乘积分解和二次变差统一起来。对正价格过程取对数时出现的二阶修正，是几何 Brown 运动、指数鞅与复利收益分析的共同来源。Stratonovich 积分保留普通链式法则，但其与 Itô 积分之间的转换必须计入协变差；两种形式在漂移项上的差别不能忽略。

Tanaka 公式把绝对值函数的非光滑性转化为局部时，占用测度公式则说明局部时记录了路径在某一水平附近停留的时间。Lévy 刻画进一步表明，连续局部鞅若具有 Brown 运动所要求的协变差，就必然具有相应的独立正态增量结构。这使路径正则性、鞅性和二次变差成为识别 Brown 运动的完整依据。

在量化应用中，已实现方差依概率收敛到积分方差，漂移项在网眼缩小时不贡献极限。组合对数收益可分解为无风险收益、风险溢价、波动率拖累与扩散风险，分散化的效果则由组合二次型决定。离散对冲误差由 Gamma 加权的实际平方变化与理论二次变差之差主导，并在适当矩条件下以网眼平方根的均方根速度收敛。这些结论把随机分析的结构定理与波动率估计、组合构造及衍生品风险管理直接联系起来。
## 习题

1. 设 $H$ 是关于 Brown 运动滤过的简单可料过程，且 $\mathbb E\int_0^T H_s^2\,\mathrm ds<\infty$。从各区间上的条件期望出发，完整推导随机积分的 Itô 等距，并说明如何利用简单过程在 $L^2(\Omega\times[0,T])$ 中的稠密性，把等距推广到一般平方可积可料过程。

2. 设 $M_t=\int_0^tH_s\,\mathrm dB_s$。在 $\mathbb E\int_0^TH_s^2\,\mathrm ds<\infty$ 的条件下，完整证明 $M$ 是平方可积鞅，并推导 $\mathbb E[M_t^2]=\mathbb E\int_0^tH_s^2\,\mathrm ds$。若仅有 $\int_0^TH_s^2\,\mathrm ds<\infty$ 几乎必然成立，构造停时局部化序列并证明 $M$ 是连续局部鞅。

3. 设 $0=t_0^n<\cdots<t_{m_n}^n=t$ 的网眼趋于零，完整证明
$$
\sum_{k=0}^{m_n-1}(B_{t_{k+1}^n}-B_{t_k^n})^2\to t
$$
在 $L^2$ 中成立，并推出依概率收敛。推导中须计算平方和的二阶矩，并明确独立增量与正态四阶矩各自发挥的作用。

4. 设 $X=X_0+A+M$ 是一维连续半鞅，其中 $A$ 为连续有限变差过程，$M$ 为连续局部鞅，$f\in C^2(\mathbb R)$。从分划上的二阶 Taylor 展开出发，完整推导 Itô 公式
$$
f(X_t)=f(X_0)+\int_0^tf'(X_s)\,\mathrm dX_s
+\frac12\int_0^tf''(X_s)\,\mathrm d[M]_s,
$$
并说明各余项为何在依概率意义下消失。
5. 对几何 Brown 运动
$$
\mathrm dS_t=\mu S_t\,\mathrm dt+\sigma S_t\,\mathrm dB_t,
\qquad S_0>0,
$$
完整推导其显式解，并验证所得过程确实满足原方程。进一步推导 $\log(S_t/S_0)$ 的漂移，解释它与算术收益漂移 $\mu$ 之间的差额来源。

6. 设 $\sigma:[0,T]\to\mathbb R$ 为确定性可测函数，且 $\int_0^T\sigma_s^2\,\mathrm ds<\infty$。完整推导指数过程
$$
Z_t=\exp\left(\int_0^t\sigma_s\,\mathrm dB_s
-\frac12\int_0^t\sigma_s^2\,\mathrm ds\right)
$$
所满足的随机微分方程，并证明 $Z$ 是真鞅而不仅是局部鞅。把 $\sigma$ 推广为一般可料过程时，指出证明中不再自动成立的性质。

7. 对连续半鞅定义 Stratonovich 积分为
$$
\int_0^tY_s\circ\mathrm dX_s
:=\int_0^tY_s\,\mathrm dX_s+\frac12[Y,X]_t .
$$
若 $X$ 为连续半鞅且 $f\in C^3(\mathbb R)$，完整推导
$$
f(X_t)=f(X_0)+\int_0^tf'(X_s)\circ\mathrm dX_s,
$$
并明确协变差项如何抵消 Itô 二阶项。

8. 将 Stratonovich 几何价格方程
$$
\frac{\mathrm dS_t}{S_t}=\mu\,\mathrm dt+\sigma\circ\mathrm dB_t
$$
改写为 Itô 形式，求 $S_t$ 与 $\log(S_t/S_0)$ 的显式表达式，并比较同一参数 $\mu$ 在两种积分约定下的经济含义。
9. 用光滑凸函数逼近 $|x-a|$，完整推导 Brown 运动的 Tanaka 公式
$$
|B_t-a|=|B_0-a|+\int_0^t\operatorname{sgn}(B_s-a)\,\mathrm dB_s+L_t^a,
$$
并证明 $L^a$ 连续、非减，且只在集合 $\{s\le t:B_s=a\}$ 上增加。说明逼近参数的极限与随机积分极限如何交换。

10. 从 Tanaka 公式出发，推导有界 Borel 函数 $g$ 的占用测度公式
$$
\int_0^tg(B_s)\,\mathrm ds=\int_{\mathbb R}g(a)L_t^a\,\mathrm da,
$$
说明由光滑 $g$ 推广到一般可测 $g$ 所需的逼近步骤。再利用 $L_t^0=|B_t|-\int_0^t\operatorname{sgn}(B_s)\,\mathrm dB_s$ 计算 $\mathbb E[L_t^0]$。

11. 完整证明多维 Lévy 刻画：若 $X$ 是关于滤过 $(\mathcal F_t)$ 的 $d$ 维连续局部鞅，$X_0=0$，且 $\langle X^j,X^k\rangle_t=\delta_{jk}t$，则 $X$ 是该滤过下的标准 Brown 运动。要求从复指数的 Itô 展开推导条件特征函数，并论证增量独立性与正态性。

12. 设 $B$ 为一维标准 Brown 运动，定义 $X_t=\int_0^t\operatorname{sgn}(B_s)\,\mathrm dB_s$。计算 $[X]_t$，并用 Lévy 刻画证明 $X$ 是标准 Brown 运动。说明 $\operatorname{sgn}(0)$ 的取值为何不影响结论。

13. 对连续半鞅 $X,Y$ 完整推导乘积公式 $\mathrm d(XY)=X\,\mathrm dY+Y\,\mathrm dX+\mathrm d[X,Y]$。若两个正价格过程具有常数波动率 $\sigma_1,\sigma_2$ 和相关系数 $\rho$，推导 $\log(S_t^1/S_t^2)$ 的漂移与扩散系数，并给出其瞬时方差。
14. 对式（26.30）中的对数价格 $X=A+M$，完整证明网眼趋于零时 $\mathrm{RV}_T^{(n)}\to\int_0^T\|\boldsymbol\sigma_s\|^2\,\mathrm ds$ 依概率成立。证明须分别控制漂移平方和、漂移与鞅的交叉项以及鞅的平方增量，并推出已实现波动率的收敛。

15. 设高频观测为 $Y_{t_k}=X_{t_k}+\varepsilon_k$，其中 $X$ 为连续对数价格，$\varepsilon_k$ 独立同分布、均值零、方差 $\eta^2$，并与 $X$ 独立。展开 $\sum_k(\Delta_kY)^2$，推导固定观测数 $m$ 时噪声造成的期望偏差，并分析 $m\to\infty$ 时该偏差的量级。进一步说明稀疏取样为何会改变偏差与方差之间的权衡。

16. 从多资产自融资财富方程出发，完整推导式（26.32）。将漂移分解为无风险收益、风险溢价和波动率拖累，并推导瞬时方差 $\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\boldsymbol\Sigma_t^\top\boldsymbol\pi_t$。说明杠杆约束 $\boldsymbol1^\top\boldsymbol\pi_t=1$ 与允许持有银行账户时的表达式有何差别。

17. 对例 26.6 的单因子模型，把等权组合推广为权重 $w_j^{(N)}$，其中 $\sum_{j=1}^Nw_j^{(N)}=1$。推导组合瞬时方差
$$
v_N=\sigma^2\rho\left(\sum_{j=1}^Nw_j^{(N)}\right)^2
+\sigma^2(1-\rho)\sum_{j=1}^N(w_j^{(N)})^2,
$$
并给出个体风险随 $N$ 增大而消失的充分条件。比较等权、非负权重与允许卖空三种情形下的共同因子暴露。

18. 从离散再平衡后的股票与银行账户持仓出发，完整推导式（26.33）。再对 $C(t_{i+1},S_{t_{i+1}})$ 作二阶展开，结合 Black--Scholes 方程推导式（26.34），明确 $O_p(\delta_i^{3/2})$ 估计使用了 GBM 增量的哪些矩性质。
19. 在命题 26.20 的设定下，进一步假设 $S^2C_{SS}$ 有界且 Taylor 余项满足一致的矩界。利用
$$
\mathbb E[(\Delta_iS)^2\mid\mathcal F_{t_i}]
=\sigma^2S_{t_i}^2\delta_i+O(S_{t_i}^2\delta_i^2)
$$
及条件方差估计，完整推导总对冲误差的 $\mathbb E[E_n^2]=O(h_n)$。要求使用条件中心化处理跨区间项，并说明均方根误差为何为 $O(h_n^{1/2})$。

20. 对常数参数 GBM，利用显式解与指数鞅计算 $\mathbb E[S_T]$、$\operatorname{Var}(S_T)$、$\mathbb E[\log(S_T/S_0)]$ 和 $\operatorname{Var}(\log(S_T/S_0))$。比较价格期望的增长率与对数价格期望的增长率，并从 Itô 修正解释二者差异。

21. 设期权满足 $C_{SS}(t_i,S_{t_i})>0$。根据式（26.34），分析实际平方变化分别大于、等于和小于 $\sigma^2S_{t_i}^2\delta_i$ 时局部复制误差主项的符号。进一步推导“持有离散复制组合并卖空一份期权”的误差递推，说明融资因子如何跨区间累积误差。

22. 设风险中性测度下
$$
\frac{\mathrm dS_t}{S_t}=r_t\,\mathrm dt+\sigma_t\,\mathrm dW_t,
$$
其中 $\sigma$ 可料且积分方差有限。完整推导
$$
\int_0^T\sigma_t^2\,\mathrm dt
=2\int_0^T\frac{\mathrm dS_t}{S_t}-2\log\frac{S_T}{S_0},
$$
并构造相应的离散已实现方差估计。解释动态标的交易、对数合约与利率项在该恒等式中的作用，以及离散化为何会产生误差。
