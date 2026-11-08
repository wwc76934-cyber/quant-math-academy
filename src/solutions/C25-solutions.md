# 第25章习题参考答案与解析

## 1. 
**证明**

对任意 $n$，由并集与交集的可测性，
$$
\{\tau\wedge\sigma\le n\}=\{\tau\le n\}\cup\{\sigma\le n\}\in\mathcal F_n,
$$
$$
\{\tau\vee\sigma\le n\}=\{\tau\le n\}\cap\{\sigma\le n\}\in\mathcal F_n.
$$
又因停时只取非负整数值或无穷大，
$$
\{\tau+\sigma\le n\}=\bigcup_{k=0}^n\bigl(\{\tau=k\}\cap\{\sigma\le n-k\}\bigr)\in\mathcal F_n,
$$
其中 $\{\tau=k\}\in\mathcal F_k\subseteq\mathcal F_n$，而 $\{\sigma\le n-k\}\in\mathcal F_{n-k}\subseteq\mathcal F_n$。故三者都是停时。

若 $\tau\le\sigma$，取 $A\in\mathcal F_\tau$。对任意 $n$，
$$
A\cap\{\sigma\le n\}=A\cap\{\tau\le n\}\cap\{\sigma\le n\}\in\mathcal F_n,
$$
因为 $\{\sigma\le n\}\subseteq\{\tau\le n\}$。于是 $A\in\mathcal F_\sigma$，从而 $\mathcal F_\tau\subseteq\mathcal F_\sigma$。

反例可取自然信息流 $\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)$，其中 $\xi_i$ 为独立 Bernoulli 变量，$\mathcal F_0$ 平凡。令 $\tau=\inf\{n\ge1:\xi_n=1\}$，则 $\{\tau-1=0\}=\{\xi_1=1\}$ 不属于 $\mathcal F_0$，所以 $\tau-1$ 不是停时。常见错误是把停时看成普通确定性时间做代数运算，或验证 $\{\tau=n\}$ 时只检查 $n$ 而忘记同一信息流的包含关系。

□

## 2. 
**证明**

首个时刻必有 $|S_1|=1$。从 $S_1=\pm1$ 出发，下一步以概率 $1/2$ 到达 $\pm2$ 并停止，以概率 $1/2$ 回到 $0$。若回到 $0$，由马尔可夫性，之后的过程与最初独立同分布。因此把每两步分为一轮，各轮停止事件相互独立，且每轮停止概率均为 $1/2$。

设停止发生在第 $K$ 轮，则 $\tau=2K$，且
$$
\mathbb P(K=k)=\left(\frac12\right)^{k-1}\frac12=2^{-k},\qquad k\ge1.
$$
故 $\mathbb P(\tau<\infty)=\sum_{k=1}^{\infty}2^{-k}=1$，即 $\tau$ 几乎必然有限，并且
$$
\mathbb P(\tau=2k)=2^{-k}.
$$
奇数时刻因奇偶性不可能停止。由几何分布均值，
$$
\mathbb E\tau=2\mathbb EK=2\sum_{k=1}^{\infty}k2^{-k}=4.
$$
对 $0<s<1$，逐项求和可由非负项级数的单调收敛定理交换期望与求和，得到
$$
\mathbb E[s^\tau]=\sum_{k=1}^{\infty}s^{2k}2^{-k}
=\frac{s^2/2}{1-s^2/2}=\frac{s^2}{2-s^2}.
$$
常见错误是把各轮当成固定一条路径而漏乘返回 $0$ 的概率，或直接套用无记忆性却不说明回到 $0$ 后过程重新开始；把 $\mathbb EK$ 与 $\mathbb E\tau$ 混同也会使均值少一倍。

□

## 3. 
**证明**

记 $\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)$，$\mathcal F_0$ 为平凡 $\sigma$-代数。有限方差蕴含 $\mathbb E|\xi_i|<\infty$ 与 $\mathbb E\xi_i^2<\infty$，故 $S_n\in L^1$、$S_n^2\in L^1$，且两者均关于 $\mathcal F_n$ 可测。又 $\xi_{n+1}$ 独立于 $\mathcal F_n$，所以
$$
\mathbb E[S_{n+1}\mid\mathcal F_n]
=S_n+\mathbb E[\xi_{n+1}\mid\mathcal F_n]=S_n.
$$
这使用了 $S_n$ 的可测性、增量的独立性、零均值以及可积性。

对第二个过程展开条件期望：
$$
\begin{aligned}
&\mathbb E[S_{n+1}^2-(n+1)\sigma^2\mid\mathcal F_n]\\
&\quad=S_n^2+2S_n\mathbb E[\xi_{n+1}\mid\mathcal F_n]
+\mathbb E[\xi_{n+1}^2\mid\mathcal F_n]-(n+1)\sigma^2\\
&\quad=S_n^2+2S_n\mathbb E\xi_{n+1}+\mathbb E\xi_{n+1}^2-(n+1)\sigma^2
=S_n^2-n\sigma^2.
\end{aligned}
$$
除上述条件外，这里还使用了 $\operatorname{Var}(\xi_{n+1})=\sigma^2$ 以及条件期望对可测因子 $S_n$ 的提取性质。同分布保证各步参数相同，但推导真正关键的是新增量独立于过去。常见错误是仅以“两两不相关”替代独立性；不相关只能保证无条件交叉项消失，不能保证条件交叉项为零。

□

## 4. 
**证明**

取自然信息流 $\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)$，并令 $\mathcal F_0$ 为平凡 $\sigma$-代数。由于 $M(\lambda)$ 有限且为正，$Z_n$ 有定义、为适应过程，并且独立性给出
$$
\mathbb E|Z_n|=\frac{\prod_{i=1}^n\mathbb E[e^{\lambda\xi_i}]}{M(\lambda)^n}=1.
$$
故每个 $Z_n$ 可积。又因 $e^{\lambda S_n}$ 关于 $\mathcal F_n$ 可测，而 $\xi_{n+1}$ 独立于 $\mathcal F_n$，
$$
\begin{aligned}
\mathbb E[Z_{n+1}\mid\mathcal F_n]
&=\frac{e^{\lambda S_n}}{M(\lambda)^{n+1}}
\mathbb E[e^{\lambda\xi_{n+1}}\mid\mathcal F_n]\\
&=\frac{e^{\lambda S_n}}{M(\lambda)^{n+1}}M(\lambda)=Z_n.
\end{aligned}
$$
所以 $Z_n$ 是鞅。若停时 $\tau\le N$，有界停止结论给出
$$
\mathbb EZ_\tau=\mathbb EZ_0=1.
$$
直接使用该结论时，须核验固定的 $\lambda$ 使 $M(\lambda)<\infty$，从而每个 $Z_n$ 可积；核验 $Z_n$ 适应且增量满足上述条件期望关系；核验 $\tau$ 是相对同一信息流的停时，并存在确定的 $N$ 使 $\tau\le N$ 几乎必然。仅有 $\tau$ 几乎必然有限并不足以直接套用有界停止结论。

常见错误是未验证矩母函数有限便断言 $Z_n$ 可积，或把独立性误写成仅要求各 $\xi_i$ 不相关。条件期望中真正使用的是新增量与全部历史独立，而非不相关。

□

## 5. 
**证明**

将停止后的值展开为示性函数的线性组合，并利用事件关系的恒等式 $\mathbf 1_{\{\tau=n\}}=\mathbf 1_{\{\tau\ge n\}}-\mathbf 1_{\{\tau\ge n+1\}}$，可得
$$
M_\tau=\sum_{n=0}^N M_n\mathbf 1_{\{\tau=n\}}=M_0+\sum_{n=1}^N(M_n-M_{n-1})\mathbf 1_{\{\tau\ge n\}}.
$$
注意到事件 $\{\tau\ge n\}=\{\tau\le n-1\}^c$ 属于 $\mathcal F_{n-1}$，故示性函数 $\mathbf 1_{\{\tau\ge n\}}$ 是非负且关于 $\mathcal F_{n-1}$ 可测的有界随机变量。由条件期望的性质与鞅的定义，
$$
\mathbb E\bigl[(M_n-M_{n-1})\mathbf 1_{\{\tau\ge n\}}\bigr]=\mathbb E\Bigl[\mathbf 1_{\{\tau\ge n\}}\mathbb E[M_n-M_{n-1}\mid\mathcal F_{n-1}]\Bigr]=0.
$$
对有限项求和交换数学期望，即得
$$
\mathbb E M_\tau=\mathbb E M_0+\sum_{n=1}^N\mathbb E\bigl[(M_n-M_{n-1})\mathbf 1_{\{\tau\ge n\}}\bigr]=\mathbb E M_0.
$$
若 $M_n$ 仅为上鞅，则条件期望满足 $\mathbb E[M_n-M_{n-1}\mid\mathcal F_{n-1}]\le 0$。由于 $\mathbf 1_{\{\tau\ge n\}}\ge 0$，上述每一项满足
$$
\mathbb E\bigl[(M_n-M_{n-1})\mathbf 1_{\{\tau\ge n\}}\bigr]=\mathbb E\Bigl[\mathbf 1_{\{\tau\ge n\}}\mathbb E[M_n-M_{n-1}\mid\mathcal F_{n-1}]\Bigr]\le 0,
$$
从而求和得到 $\mathbb E M_\tau\le\mathbb E M_0$。

反例取从 $0$ 出发的对称简单随机游走 $S_n$，其增量独立同分布且期望为 $0$，故 $S_n$ 是初值为 $S_0=0$ 的鞅。令 $\tau=\inf\{n\ge 1:S_n=1\}$。由一维对称简单随机游走的常返性，游走以概率 $1$ 访问状态 $1$，故 $\tau$ 几乎必然有限。然而在停止时刻必有 $S_\tau=1$，于是 $\mathbb E S_\tau=1\ne 0=\mathbb E S_0$。此时 $\tau$ 无界，导致停止过程被大时间处的极大负值破坏了一致可积性，停止定理的等式不再成立。

常见错误是混淆事件 $\{\tau=n\}\in\mathcal F_n$ 与 $\{\tau\ge n\}\in\mathcal F_{n-1}$，试图直接把 $\mathbf 1_{\{\tau=n\}}$ 从 $\mathcal F_{n-1}$ 的条件期望中提出；或是误以为只要停时几乎必然有限，鞅在停止时的期望就一定守恒，忽略了有界性或一致可积性这一核心前提。

□

## 6. 
**证明**

先考察有界截断停时 $\tau_n=\tau\wedge n$。由于 $\tau_n\le n$ 几乎必然成立，$M_k=S_k-k\mu$ 是初值为 $0$ 的鞅。由有界可选停时定理，
$$
\mathbb E M_{\tau\wedge n}=\mathbb E M_0=0,
$$
由此解得
$$
\mathbb E S_{\tau\wedge n}=\mu\mathbb E[\tau\wedge n].
$$
对于等式右侧，当 $n\to \infty$ 时，非负随机变量序列 $\tau\wedge n$ 几乎必然单调不减地收敛于 $\tau$。由单调收敛定理，
$$
\lim_{n\to \infty}\mathbb E[\tau\wedge n]=\mathbb E\tau.
$$
对于等式左侧，因为 $\tau$ 几乎必然有限，当 $n\to \infty$ 时 $S_{\tau\wedge n}\to S_\tau$ 几乎必然成立。由题设条件，停止过程族 $\{S_{\tau\wedge n}\}_{n\ge 1}$ 一致可积，因而几乎必然收敛蕴含 $L^1$ 收敛，从而数学期望与极限可交换次序：
$$
\lim_{n\to \infty}\mathbb E S_{\tau\wedge n}=\mathbb E S_\tau.
$$
两端同时取极限，即证明了第一 Wald 恒等式 $\mathbb E S_\tau=\mu\mathbb E\tau$。

进一步，当 $\mu=0$ 且 $\operatorname{Var}(\xi_i)=\sigma^2<\infty$ 时，$N_k=S_k^2-k\sigma^2$ 是初值为 $0$ 的鞅。对有界停时 $\tau\wedge n$ 再次应用有界停时定理，得到
$$
\mathbb E\bigl[S_{\tau\wedge n}^2-(\tau\wedge n)\sigma^2\bigr]=0,
$$
即
$$
\mathbb E[S_{\tau\wedge n}^2]=\sigma^2\mathbb E[\tau\wedge n].
$$
由题设的二阶一致可积性条件，$\{S_{\tau\wedge n}^2\}_{n\ge 1}$ 一致可积，因而 $\lim_{n\to \infty}\mathbb E[S_{\tau\wedge n}^2]=\mathbb E[S_\tau^2]$。右端极限依单调收敛定理为 $\sigma^2\mathbb E\tau$，由此得出第二 Wald 恒等式 $\mathbb E S_\tau^2=\sigma^2\mathbb E\tau$。

从有界停时过渡到一般停时的核心步骤是：首先利用截断停时 $\tau\wedge n\le n$ 的绝对有界性建立有限期的精确代数平衡，然后令截断界限 $n\to \infty$；此时右端时间项借助单调收敛定理过渡，左端状态项则必须依赖一致可积性或控制收敛定理以保证期望与极限可交换。

常见错误是认为 $\mathbb E[\sum_{i=1}^\tau\xi_i]=\mathbb E\tau\cdot\mathbb E\xi_1$ 可以像常数项求和那样通过无条件独立性直接拆分展开，忽视了求和项数 $\tau$ 与各项随机变量之间的依赖关系；或者在推广到无界停时时省略了一致可积性的验证，直接令极限穿透期望符号。

□

## 7. 
**证明**

构造两个离散时间鞅：首先，$M_n=S_n$ 是初值为 $0$ 的鞅；其次，因增量方差为 $1$ 且均值为 $0$，$N_n=S_n^2-n$ 亦为初值为 $0$ 的鞅。停时 $\tau=\inf\{n\ge 0:S_n\in\{-a,b\}\}$ 满足 $\mathbb P(\tau<\infty)=1$ 且 $\mathbb E\tau<\infty$。

为了严格处理 $\tau$ 的无界性，引入有界截断停时 $\tau\wedge n$。由于游走在触及边界前始终受限于区间 $[-a,b]$，停止位置满足
$$
|S_{\tau\wedge n}|\le\max\{a,b\}.
$$
因此随机变量序列 $\{S_{\tau\wedge n}\}_{n\ge 1}$ 一致有界。根据有界可选停时定理，
$$
\mathbb E[S_{\tau\wedge n}]=\mathbb E S_0=0.
$$
当 $n\to \infty$ 时，$S_{\tau\wedge n}\to S_\tau$ 几乎必然成立。由于被常数 $\max\{a,b\}$ 控制，由控制收敛定理可交换数学期望与极限：
$$
\mathbb E S_\tau=\lim_{n\to \infty}\mathbb E[S_{\tau\wedge n}]=0.
$$
记触碰上边界的概率为 $\pi_b=\mathbb P(S_\tau=b)$，则触碰下边界的概率为 $\mathbb P(S_\tau=-a)=1-\pi_b$。代入期望表达式：
$$
\mathbb E S_\tau=b\pi_b+(-a)(1-\pi_b)=0,
$$
解得
$$
\mathbb P(S_\tau=b)=\frac{a}{a+b},\qquad\mathbb P(S_\tau=-a)=\frac{b}{a+b}.
$$

对于平均退出时间，对鞅 $N_n=S_n^2-n$ 应用有界截断停时 $\tau\wedge n$，有
$$
\mathbb E[S_{\tau\wedge n}^2-(\tau\wedge n)]=\mathbb E N_0=0,
$$
即
$$
\mathbb E[\tau\wedge n]=\mathbb E[S_{\tau\wedge n}^2].
$$
对于左侧，$\tau\wedge n$ 几乎必然非减地趋于 $\tau$，由单调收敛定理，
$$
\lim_{n\to \infty}\mathbb E[\tau\wedge n]=\mathbb E\tau.
$$
对于右侧，序列 $S_{\tau\wedge n}^2$ 同样被常数 $\max\{a^2,b^2\}$ 控制，再次应用控制收敛定理得到
$$
\lim_{n\to \infty}\mathbb E[S_{\tau\wedge n}^2]=\mathbb E[S_\tau^2]=b^2\pi_b+(-a)^2(1-\pi_b).
$$
将已求得的 $\pi_b$ 代入计算：
$$
\mathbb E[S_\tau^2]=b^2\left(\frac{a}{a+b}\right)+a^2\left(\frac{b}{a+b}\right)=\frac{ab(a+b)}{a+b}=ab.
$$
两端取极限即得出 $\mathbb E\tau=ab$。

常见错误是在推导中直接写出 $\mathbb E S_\tau=0$，却不建立有界截断 $\tau\wedge n$ 并不交代控制收敛定理的依据；或者在计算时间期望时误以为无界停时下不能应用停时定理，未能意识到单调收敛定理与控制收敛定理相结合可以严格完成从有限期到极限期的过渡。

□

## 8. 
**证明**

记每步增量为 $\xi_i$，满足 $\mathbb P(\xi_i=1)=p$ 且 $\mathbb P(\xi_i=-1)=q$。定义比值 $\rho=q/p\ne 1$。
考察过程 $M_n=\rho^{S_n}$。因为增量独立，
$$
\mathbb E[\rho^{\xi_{n+1}}\mid\mathcal F_n]=p\rho+q\rho^{-1}=p\left(\frac{q}{p}\right)+q\left(\frac{p}{q}\right)=q+p=1,
$$
故 $M_n$ 是初值为 $M_0=\rho^0=1$ 的鞅。此外，增量均值为 $\mathbb E\xi_i=p-q$，因此扣除漂移后的过程 $Y_n=S_n-(p-q)n$ 亦为初值为 $0$ 的鞅。

对于停时 $\tau=\inf\{n\ge 0:S_n\in\{-a,b\}\}$，截断状态 $S_{\tau\wedge n}$ 始终落在区间 $[-a,b]$ 内，从而鞅值序列
$$
M_{\tau\wedge n}=\rho^{S_{\tau\wedge n}}
$$
一致有界于 $\min\{\rho^{-a},\rho^b\}$ 与 $\max\{\rho^{-a},\rho^b\}$ 之间。对有界停时 $\tau\wedge n$ 应用可选停时定理得 $\mathbb E M_{\tau\wedge n}=1$。令 $n\to \infty$，由控制收敛定理，
$$
\mathbb E M_\tau=\lim_{n\to \infty}\mathbb E M_{\tau\wedge n}=1.
$$
设 $\pi_b=\mathbb P(S_\tau=b)$，则 $\mathbb P(S_\tau=-a)=1-\pi_b$。展开期望得
$$
\pi_b\rho^b+(1-\pi_b)\rho^{-a}=1,
$$
解得破产概率与胜出概率为
$$
\mathbb P(S_\tau=b)=\frac{1-\rho^{-a}}{\rho^b-\rho^{-a}}=\frac{\rho^a-1}{\rho^{a+b}-1}=\frac{1-(p/q)^a}{1-(p/q)^{a+b}}.
$$

对于时间期望，对鞅 $Y_n$ 应用截断停时 $\tau\wedge n$ 可得
$$
\mathbb E[S_{\tau\wedge n}]-(p-q)\mathbb E[\tau\wedge n]=0.
$$
由于 $S_{\tau\wedge n}$ 一致有界，控制收敛定理给出 $\mathbb E[S_{\tau\wedge n}]\to \mathbb E S_\tau=b\pi_b-a(1-\pi_b)$；由单调收敛定理，$\mathbb E[\tau\wedge n]\to \mathbb E\tau$。由此解得
$$
\mathbb E\tau=\frac{\mathbb E S_\tau}{p-q}=\frac{(a+b)\pi_b-a}{p-q}=\frac{1}{p-q}\left[(a+b)\frac{\rho^a-1}{\rho^{a+b}-1}-a\right].
$$

检查对称极限：当 $p\to 1/2$ 时，$\rho=q/p\to 1$。由洛必达法则，
$$
\lim_{\rho\to 1}\frac{\rho^a-1}{\rho^{a+b}-1}=\lim_{\rho\to 1}\frac{a\rho^{a-1}}{(a+b)\rho^{a+b-1}}=\frac{a}{a+b},
$$
这与对称赌徒破产的概率完全一致。对于期望时间，将 $\rho=(1-2\epsilon)/(1+2\epsilon)\approx 1-4\epsilon$ 代入泰勒展开，或者两次应用洛必达法则计算 $p\to 1/2$（此时分母 $p-q=2p-1\to 0$，分子亦趋于 $0$），可求得极限严格为 $ab$，完全回到第 7 题的结论。

常见错误是在有漂移情形下仍试图套用未修正的二次鞅 $S_n^2-n$，导致遗漏交叉项漂移；或者在对参数取极限 $p\to 1/2$ 时未识别出 $0/0$ 型不定式，简单代入导致分母为零。

□

## 9. 
**证明**

由于绝对值函数 $\phi(x)=|x|$ 在 $\mathbb R$ 上为凸函数，由条件 Jensen 不等式，
$$
\mathbb E[|M_{n+1}|\mid\mathcal F_n]\ge |\mathbb E[M_{n+1}\mid\mathcal F_n]|=|M_n|.
$$
故 $X_n=|M_n|$ 是关于信息流 $\mathcal F_n$ 的非负下鞅。这说明原问题可等价转化为非负下鞅的极大值估计。

记 $X_N^*=\max_{0\le n\le N}X_n$，考虑事件 $A=\{X_N^*\ge\lambda\}$。定义首次越过阈值 $\lambda$ 的停时：
$$
\tau=\inf\{0\le n\le N:X_n\ge\lambda\},
$$
并约定若对所有 $0\le n\le N$ 均有 $X_n<\lambda$，则令 $\tau=N$。由这一定义，$\tau$ 的取值要么是某个首次上穿时刻，要么是截断值 $N$，只能落在 $\{0,1,\ldots,N\}$ 中，故 $\tau$ 是有界停时。

注意到事件分解 $A=\bigcup_{n=0}^N\{\tau=n,X_n\ge\lambda\}$，且对每个 $n$，事件 $\{\tau=n\}\cap A=\{\tau=n\}$ 关于 $\mathcal F_n$ 可测。在集合 $\{\tau=n\}$ 上，依定义必有 $X_n=X_\tau\ge\lambda$。于是
$$
\lambda\mathbb P(A)=\lambda\sum_{n=0}^N\mathbb E[\mathbf 1_{\{\tau=n\}\cap A}]\le\sum_{n=0}^N\mathbb E[X_n\mathbf 1_{\{\tau=n\}\cap A}].
$$
由下鞅性质，$X_n\le\mathbb E[X_N\mid\mathcal F_n]$ 几乎必然成立。由于 $\mathbf 1_{\{\tau=n\}\cap A}$ 是非负且关于 $\mathcal F_n$ 可测的随机变量，利用条件期望的平滑性质，
$$
\mathbb E[X_n\mathbf 1_{\{\tau=n\}\cap A}]\le\mathbb E\Bigl[\mathbb E[X_N\mid\mathcal F_n]\mathbf 1_{\{\tau=n\}\cap A}\Bigr]=\mathbb E[X_N\mathbf 1_{\{\tau=n\}\cap A}].
$$
将各不相交事件求和：
$$
\lambda\mathbb P(A)\le\sum_{n=0}^N\mathbb E[X_N\mathbf 1_{\{\tau=n\}\cap A}]=\mathbb E[X_N\mathbf 1_A].
$$
再由非负性，$\mathbb E[X_N\mathbf 1_A]\le\mathbb E[X_N]=\mathbb E|M_N|$，由此完整证明了 Doob 极大值弱型不等式：
$$
\lambda\mathbb P\Bigl(\max_{0\le n\le N}|M_n|\ge\lambda\Bigr)\le\mathbb E|M_N|.
$$

常见错误是试图把最大值时刻当作一个确定性指标处理，忽略了最大值何时达到是随机的；或者在对事件划分求和时，漏掉验证 $\{\tau=n\}\in\mathcal F_n$ 这一提取条件期望的先决测度论条件。

□

## 10. 
**证明**

记 $X_N^*=\max_{0\le n\le N}|M_n|$。为了严格保证推导中各阶矩的有界性，避免无穷大循环论证，先引入常数截断 $X_{N,K}^*=\min\{X_N^*,K\}$（$K>0$）。此时 $0\le X_{N,K}^*\le K$，其任意阶矩均有限。

利用非负随机变量的分层积分公式（分布函数的 Fubini/Tonelli 展开）：
$$
\mathbb E[(X_{N,K}^*)^p]=\mathbb E\left[\int_0^K p\lambda^{p-1}\mathbf 1_{\{X_N^*\ge\lambda\}}d\lambda\right].
$$
由于被积函数非负，由 Tonelli 定理可交换数学期望与积分次序：
$$
\mathbb E[(X_{N,K}^*)^p]=\int_0^K p\lambda^{p-2}\cdot\lambda\mathbb P(X_N^*\ge\lambda)d\lambda.
$$
由第 9 题证明中的精细估计式 $\lambda\mathbb P(X_N^*\ge\lambda)\le\mathbb E[|M_N|\mathbf 1_{\{X_N^*\ge\lambda\}}]$，代入得到
$$
\mathbb E[(X_{N,K}^*)^p]\le\int_0^K p\lambda^{p-2}\mathbb E[|M_N|\mathbf 1_{\{X_N^*\ge\lambda\}}]d\lambda.
$$
再次应用 Tonelli 定理将期望移至外层：
$$
\mathbb E[(X_{N,K}^*)^p]\le\mathbb E\left[|M_N|\int_0^{\min\{X_N^*,K\}}p\lambda^{p-2}d\lambda\right]=\frac{p}{p-1}\mathbb E\bigl[|M_N|(X_{N,K}^*)^{p-1}\bigr].
$$
引入共轭指数 $q=p/(p-1)$，满足 $1/p+1/q=1$ 且 $(p-1)q=p$。由题设 $M_N\in L^p$ 且有界截断保证 $(X_{N,K}^*)^{p-1}\in L^q$，应用 Hölder 不等式：
$$
\mathbb E\bigl[|M_N|(X_{N,K}^*)^{p-1}\bigr]\le\bigl(\mathbb E|M_N|^p\bigr)^{1/p}\Bigl(\mathbb E\bigl[(X_{N,K}^*)^{(p-1)q}\bigr]\Bigr)^{1/q}=\|M_N\|_p\cdot\bigl(\mathbb E[(X_{N,K}^*)^p]\bigr)^{(p-1)/p}.
$$
综合上述两式，得到
$$
\mathbb E[(X_{N,K}^*)^p]\le\frac{p}{p-1}\|M_N\|_p\cdot\bigl(\mathbb E[(X_{N,K}^*)^p]\bigr)^{(p-1)/p}.
$$
因为截断后 $\mathbb E[(X_{N,K}^*)^p]\le K^p<\infty$，两端可以安全同除以 $\bigl(\mathbb E[(X_{N,K}^*)^p]\bigr)^{(p-1)/p}$（若该项为零，则左端为零而不等式右端亦为零，结论直接成立，无需相除），得到
$$
\bigl(\mathbb E[(X_{N,K}^*)^p]\bigr)^{1/p}\le\frac{p}{p-1}\|M_N\|_p.
$$
由于当 $K\to \infty$ 时，$X_{N,K}^*\uparrow X_N^*$ 几乎必然成立，且单调递增，根据单调收敛定理，
$$
\lim_{K\to \infty}\mathbb E[(X_{N,K}^*)^p]=\mathbb E[(X_N^*)^p].
$$
两端同时令 $K\to \infty$ 并取 $p$ 次方，即得出 Doob 极大值 $L^p$ 不等式：
$$
\mathbb E\Bigl[\max_{0\le n\le N}|M_n|^p\Bigr]\le\left(\frac{p}{p-1}\right)^p\mathbb E|M_N|^p.
$$

本题所用可积性依据包含四处：第一，Tonelli 定理交换非负被积式的期望与积分；第二，Doob 弱型精细估计；第三，利用有限截断 $K$ 确保有限性以合法除以右端幂次；第四，单调收敛定理完成 $K\to \infty$ 的无界过渡。

常见错误是在未做截断或未先验确定 $X_N^*\in L^p$ 的情况下，直接在两端约去无穷大量 $(\mathbb E[(X_N^*)^p])^{(p-1)/p}$，犯了数学推导中“假设待证量有限以证明其有限”的循环论证逻辑错误。

□

## 11. 
**证明**

为了构造上穿策略，定义停时序列：令 $\sigma_1=\inf\{n\ge 0:X_n\le a\}$，$\tau_1=\inf\{n\ge\sigma_1:X_n\ge b\}$；递推地，对 $k\ge 1$，令
$$
\sigma_{k+1}=\inf\{n\ge\tau_k:X_n\le a\},\qquad\tau_{k+1}=\inf\{n\ge\sigma_{k+1}:X_n\ge b\}.
$$
若指标超过 $N$ 则约定停时取为 $N$。定义投资头寸过程为
$$
C_n=\sum_{k=1}^\infty\mathbf 1_{\{\sigma_k<n\le\tau_k\}}.
$$
注意到事件 $\{\sigma_k<n\}=\{\sigma_k\le n-1\}\in\mathcal F_{n-1}$，且 $\{\tau_k\ge n\}=\{\tau_k\le n-1\}^c\in\mathcal F_{n-1}$，因此 $C_n\in\{0,1\}$ 是非负且关于 $\mathcal F_{n-1}$ 可测的可料过程。

考虑函数 $y(x)=(x-a)^+$，其为凸非减函数。由于 $X_n$ 是下鞅，非负过程 $Y_n=(X_n-a)^+$ 亦为非负下鞅。由 $(x-a)^+$ 的定义，$X_n\le a$ 当且仅当 $Y_n=0$，而 $X_n\ge b$ 当且仅当 $Y_n\ge b-a$，故 $X_n$ 对区间 $[a,b]$ 的每次上穿都与 $Y_n$ 对区间 $[0,b-a]$ 的一次上穿一一对应，两者的上穿次数相等。考察离散随机积分 $G_N=\sum_{n=1}^N C_n(Y_n-Y_{n-1})$。由可料性与下鞅性质，
$$
\mathbb E[C_n(Y_n-Y_{n-1})\mid\mathcal F_{n-1}]=C_n\mathbb E[Y_n-Y_{n-1}\mid\mathcal F_{n-1}]\ge 0,
$$
从而求和后的总期望收益满足 $\mathbb E G_N\ge 0$。

另一方面，每完成一次完整的上穿区间 $(\sigma_k,\tau_k]$，由于进入时 $Y_{\sigma_k}=0$ 且离开时 $Y_{\tau_k}\ge b-a$，单次区间收益至少为 $b-a$。截至时刻 $N$，共完成 $U_N([a,b])$ 次完整上穿，累计贡献不低于 $(b-a)U_N([a,b])$。若在最终时刻 $N$ 处系统仍处于某个未完成的上穿期内（即持仓 $C_N=1$），该段收益为 $Y_N-Y_{\sigma_k}=Y_N-0=Y_N\ge 0$；若未持仓则额外收益为 $0$。因此总收益恒满足
$$
G_N\ge (b-a)U_N([a,b])-Y_N.
$$
两端取数学期望并利用 $\mathbb E G_N\ge 0$，移项即得
$$
(b-a)\mathbb E U_N([a,b])\le\mathbb E Y_N-\mathbb E G_N\le\mathbb E[(X_N-a)^+].
$$
停止区间端点处的收益不仅不会破坏估计，反而由于 $Y_{\sigma_k}=0$ 锁死了入场亏损下界，使得不完整的末端持仓收益非负（$Y_N\ge 0$），从而天然保护了不等式方向。

常见错误是将持仓变量 $C_n$ 错误地写成关于 $\mathcal F_n$ 可测，使得策略包含了当期未知信息而丧失可料性；或是在分析末端未平仓收益时忽略了下界截断对负向风险的吸收，误认为可能产生负向冲击从而导致不等式反向。

□

## 12. 
**证明**

记实数列振荡发散的事件为 $E=\{\liminf_{n\to \infty}X_n<\limsup_{n\to \infty}X_n\}$。若某条样本轨道发散，则必存在一对有理数 $a<b$，使得该轨道在区间 $[a,b]$ 上完成无穷多次上穿。由第 11 题证明的 Doob 上穿不等式，对任意有理数 $a<b$ 与任意截断时刻 $N$，
$$
\mathbb E U_N([a,b])\le\frac{\mathbb E[(X_N-a)^+]}{b-a}\le\frac{\mathbb E|X_N|+|a|}{b-a}\le\frac{\sup_n\mathbb E|X_n|+|a|}{b-a}<\infty.
$$
因为上穿次数 $U_N([a,b])$ 随 $N$ 单调不减，由单调收敛定理，
$$
\mathbb E[U_\infty([a,b])]=\lim_{N\to \infty}\mathbb E U_N([a,b])\le\frac{\sup_n\mathbb E|X_n|+|a|}{b-a}<\infty.
$$
期望有限的非负随机变量几乎必然有限，故 $\mathbb P(U_\infty([a,b])=\infty)=0$。由于有理数对 $\mathbb Q\times\mathbb Q$ 是可数集，由测度的可数次可加性，
$$
\mathbb P(E)\le\sum_{a<b,a,b\in\mathbb Q}\mathbb P(U_\infty([a,b])=\infty)=0.
$$
这证明了极限 $\lim_{n\to \infty}X_n$ 几乎必然存在，记其为 $X_\infty$。再由 Fatou 引理，
$$
\mathbb E|X_\infty|=\mathbb E\Bigl[\lim_{n\to \infty}|X_n|\Bigr]\le\liminf_{n\to \infty}\mathbb E|X_n|\le\sup_n\mathbb E|X_n|<\infty,
$$
从而极限变量 $X_\infty$ 是可积的。

构造几乎必然收敛但不按 $L^1$ 收敛的鞅：设独立随机变量序列 $\xi_1,\xi_2,\ldots$ 满足 $\mathbb P(\xi_k=1)=\mathbb P(\xi_k=0)=1/2$。令 $M_0=1$，递推定义
$$
M_n=2^n\prod_{k=1}^n(1-\xi_k).
$$
易见 $M_{n+1}=2M_n(1-\xi_{n+1})$。由于 $\mathbb E[1-\xi_{n+1}\mid\mathcal F_n]=1/2$，直接验证知 $\mathbb E[M_{n+1}\mid\mathcal F_n]=M_n$，故 $M_n$ 是非负鞅，且 $\mathbb E|M_n|=\mathbb E M_n=1$ 对所有 $n$ 恒成立，满足 $\sup_n\mathbb E|M_n|=1<\infty$。由 Borel-Cantelli 引理，序列几乎必然最终出现 $\xi_k=1$，使得在此之后 $M_n=0$ 恒成立，因此 $M_n\to 0$ 几乎必然，即 $M_\infty=0$。然而其 $L^1$ 范数满足
$$
\|M_n-M_\infty\|_1=\mathbb E|M_n-0|=\mathbb E M_n=1\not\to 0.
$$
一致可积性失效的原因在于：对任意固定的截断阈值 $K>0$，只要 $2^n>K$，就有
$$
\mathbb E\bigl[|M_n|\mathbf 1_{\{|M_n|>K\}}\bigr]=2^n\cdot\mathbb P(M_n=2^n)=2^n\cdot 2^{-n}=1.
$$
这一截断期望的上确界恒为 $1$，质量在概率趋于零的同时以几何速率逃逸到无穷远，彻底破坏了一致可积性。

常见错误是将 $L^1$ 有界性与 $L^1$ 收敛性混为一谈，误以为几乎必然收敛加上 $\sup_n\mathbb E|X_n|<\infty$ 即可由控制收敛定理得出 $L^1$ 收敛，忽视了一致可积性才是保证极限与期望可交换的充分必要充要条件。

□

## 13. 
在两期二叉树模型中，每期无风险总回报为 $R=1.05$，股价上涨因子为 $u=1.2$，下跌因子为 $d=0.8$。根据无套利定价原理，单期风险中性上涨概率为
$$
q=\frac{R-d}{u-d}=\frac{1.05-0.8}{1.2-0.8}=\frac{0.25}{0.40}=\frac{5}{8}=0.625,
$$
下跌概率为 $1-q=0.375=3/8$。

从初始价格 $S_0=100$ 出发，第 1 期节点股价为 $S_u=120$ 与 $S_d=80$。第 2 期末各节点股价为 $S_{uu}=144$、$S_{ud}=96$ 以及 $S_{dd}=64$。执行价为 $K=100$ 的看跌期权在第 2 期末的内在价值即到期收益为
$$
V_{2,uu}=(100-144)^+=0,\qquad V_{2,ud}=(100-96)^+=4,\qquad V_{2,dd}=(100-64)^+=36.
$$

利用逆向归纳法求解第 1 期各节点的美式期权价值：
对于上涨节点 $u$，若继续持有，其风险中性延续价值为
$$
C_u=\frac{1}{R}\bigl[q V_{2,uu}+(1-q)V_{2,ud}\bigr]=\frac{1}{1.05}\left[\frac{5}{8}\times 0+\frac{3}{8}\times 4\right]=\frac{1.5}{1.05}=\frac{10}{7}\approx 1.4286.
$$
立即行权的内在价值为 $(100-120)^+=0$。因此美式期权价值为 $V_u=\max\{0,10/7\}=10/7$，此时不应提前行权。
对于下跌节点 $d$，若继续持有，其延续价值为
$$
C_d=\frac{1}{R}\bigl[q V_{2,ud}+(1-q)V_{2,dd}\bigr]=\frac{1}{1.05}\left[\frac{5}{8}\times 4+\frac{3}{8}\times 36\right]=\frac{2.5+13.5}{1.05}=\frac{16}{1.05}=\frac{320}{21}\approx 15.2381.
$$
立即行权的内在价值为 $(100-80)^+=20$。因为 $20>320/21$，内在价值严格大于延续价值，故美式期权价值为 $V_d=\max\{20,320/21\}=20$，最优决策是在该节点提前行权。

在时刻 $0$，美式期权的延续价值为
$$
C_0=\frac{1}{R}\bigl[q V_u+(1-q)V_d\bigr]=\frac{1}{1.05}\left[\frac{5}{8}\times\frac{10}{7}+\frac{3}{8}\times 20\right]=\frac{1}{1.05}\left[\frac{25}{28}+\frac{15}{2}\right]=\frac{1175}{147}\approx 7.9932.
$$
时刻 $0$ 的内在价值为 $(100-100)^+=0$，故美式看跌期权当前价值为 $V_0=1175/147\approx 7.9932$。
由此确定的最早最优行权规则为停时
$$
\tau^*=\inf\{n\ge 0:V_n=(K-S_n)^+>0\},
$$
具体表现为：若第 1 期股价下跌至 $S_1=80$，则在时刻 $1$ 立即行权；若第 1 期股价上涨至 $120$，则在时刻 $1$ 继续持有，进入第 2 期后若股价为 $96$ 则行权，若为 $144$ 则放弃。

对比欧式看跌期权，欧式期权不可提前行权，其时刻 1 的价值即为延续价值 $V_{1,u}^{\mathrm{Eur}}=10/7$ 与 $V_{1,d}^{\mathrm{Eur}}=320/21$。折现至时刻 $0$ 得
$$
V_0^{\mathrm{Eur}}=\frac{1}{1.05}\left[\frac{5}{8}\times\frac{10}{7}+\frac{3}{8}\times\frac{320}{21}\right]=\frac{1}{1.05}\left[\frac{25}{28}+\frac{40}{7}\right]=\frac{925}{147}\approx 6.2925.
$$
由此得出提前行权溢价为
$$
V_0-V_0^{\mathrm{Eur}}=\frac{1175}{147}-\frac{925}{147}=\frac{250}{147}\approx 1.7007.
$$
该溢价恰好等于节点 $d$ 处提前行权产生的增益 $20-320/21=100/21$ 经过概率加权并折现到时刻 $0$ 的现值。

常见错误是在倒推节点 $d$ 时忽略比较内在价值与延续价值，直接沿用贴现期望导致将美式期权误算为欧式期权；或是在计算折现时混淆了无风险总回报 $R=1+r=1.05$ 与利率 $r$ 本身。

## 14. 
**证明**

首先证明 $Z_n$ 是控制 $Y_n$ 的最小上鞅。由递推定义，对每个 $0\le n\le N$ 均有 $Z_n\ge Y_n$，且 $Z_n\ge\mathbb E[Z_{n+1}\mid\mathcal F_n]$，故 $Z_n$ 是适应、可积且控制 $Y_n$ 的上鞅。设 $U_n$ 是任意满足 $U_n\ge Y_n$ 且 $U_n\ge\mathbb E[U_{n+1}\mid\mathcal F_n]$ 的上鞅。当 $n=N$ 时，$U_N\ge Y_N=Z_N$。假设对 $n+1$ 成立 $U_{n+1}\ge Z_{n+1}$，则由条件期望的单调性，
$$
U_n\ge\mathbb E[U_{n+1}\mid\mathcal F_n]\ge\mathbb E[Z_{n+1}\mid\mathcal F_n].
$$
结合 $U_n\ge Y_n$，必有 $U_n\ge\max\{Y_n,\mathbb E[Z_{n+1}\mid\mathcal F_n]\}=Z_n$。由逆向数学归纳法，$U_n\ge Z_n$ 对所有 $0\le n\le N$ 几乎必然成立，故 $Z_n$ 是控制 $Y_n$ 的最小上鞅（即 Snell 包络）。

考察随机时刻 $\tau^*=\inf\{0\le n\le N:Z_n=Y_n\}$。对任意 $k\in\{0,\ldots,N\}$，
$$
\{\tau^*=k\}=\{Z_k=Y_k\}\cap\bigcap_{j=0}^{k-1}\{Z_j>Y_j\}\in\mathcal F_k,
$$
因为每个 $Z_j,Y_j$ 均关于 $\mathcal F_j\subseteq\mathcal F_k$ 可测。又因 $Z_N=Y_N$，必有 $\tau^*\le N$，故 $\tau^*$ 是良定义的有界停时。

考察停止过程 $Z_{n\wedge\tau^*}$ 的增量条件期望：
$$
\mathbb E[Z_{(n+1)\wedge\tau^*}-Z_{n\wedge\tau^*}\mid\mathcal F_n].
$$
在事件 $\{\tau^*\le n\}\in\mathcal F_n$ 上，$(n+1)\wedge\tau^*=n\wedge\tau^*=\tau^*$，增量恒为 $0$。在事件 $\{\tau^*>n\}\in\mathcal F_n$ 上，根据定义有 $Z_n>Y_n$，由最大值选取规则必有 $Z_n=\mathbb E[Z_{n+1}\mid\mathcal F_n]$，此时 $(n+1)\wedge\tau^*=n+1$ 且 $n\wedge\tau^*=n$。因此
$$
\mathbb E\bigl[(Z_{(n+1)\wedge\tau^*}-Z_{n\wedge\tau^*})\mathbf 1_{\{\tau^*>n\}}\mid\mathcal F_n\bigr]=\mathbf 1_{\{\tau^*>n\}}\bigl(\mathbb E[Z_{n+1}\mid\mathcal F_n]-Z_n\bigr)=0.
$$
综上，$\mathbb E[Z_{(n+1)\wedge\tau^*}\mid\mathcal F_n]=Z_{n\wedge\tau^*}$，即 $Z_{n\wedge\tau^*}$ 是鞅。

由于 $Z_{n\wedge\tau^*}$ 是鞅且 $\tau^*\le N$，有
$$
\mathbb E Z_{\tau^*}=\mathbb E Z_{N\wedge\tau^*}=\mathbb E Z_0.
$$
在停止时刻 $\tau^*$，由定义 $Z_{\tau^*}=Y_{\tau^*}$，故 $\mathbb E Y_{\tau^*}=\mathbb E Z_0$。
另一方面，设 $\tau$ 为任意满足 $\tau\le N$ 的停时。由于 $Z_n$ 是上鞅，由有界可选停时定理，$\mathbb E Z_\tau\le\mathbb E Z_0$。又因 $Z$ 控制 $Y$，恒有 $Y_\tau\le Z_\tau$ 几乎必然，从而
$$
\mathbb E Y_\tau\le\mathbb E Z_\tau\le\mathbb E Z_0.
$$
这表明对任意停时 $\tau\le N$，$\mathbb E Y_\tau\le\mathbb E Z_0=\mathbb E Y_{\tau^*}$。因此 $\tau^*$ 达到了上确界，即
$$
\mathbb E Y_{\tau^*}=\sup_{\tau\le N}\mathbb E Y_\tau=\mathbb E Z_0.
$$

常见错误是在证明停止过程为鞅时，未利用示性函数拆分事件 $\{\tau^*\le n\}$ 与 $\{\tau^*>n\}$，忽略了必须通过严格不等式 $Z_n>Y_n$ 才能锁定 $Z_n=\mathbb E[Z_{n+1}\mid\mathcal F_n]$ 这一逻辑环扣；或是在上鞅可选停止时写反不等式方向。

□

## 15. 
**证明**

首先对任意固定正整数 $N$，考虑有限时间内的越界事件：
$$
\{\tau_\alpha\le N\}=\Bigl\{\max_{0\le n\le N}M_n\ge\alpha^{-1}\Bigr\}.
$$
由于 $M_n$ 在 $\mathbb P_0$ 下是非负鞅，应用 Doob 极大值不等式（即 Ville 极大不等式）：
$$
\mathbb P_0(\tau_\alpha\le N)=\mathbb P_0\Bigl(\max_{0\le n\le N}M_n\ge\alpha^{-1}\Bigr)\le\frac{\mathbb E_0 M_N}{\alpha^{-1}}=\alpha\mathbb E_0 M_N.
$$
由于鞅的期望守恒，$\mathbb E_0 M_N=\mathbb E_0 M_0=1$。故对所有 $N\ge 1$，均有
$$
\mathbb P_0(\tau_\alpha\le N)\le\alpha.
$$
注意到事件序列 $\{\tau_\alpha\le N\}$ 随 $N$ 单调递增，且 $\bigcup_{N=1}^\infty\{\tau_\alpha\le N\}=\{\tau_\alpha<\infty\}$。由概率测度的单调连续性，
$$
\mathbb P_0(\tau_\alpha<\infty)=\lim_{N\to \infty}\mathbb P_0(\tau_\alpha\le N)\le\alpha.
$$
这证明了在任意无限长实验期内，序贯拒绝规则的第一类错误概率严格不超过显著性水平 $\alpha$。

若只允许在某个随机但有界的观察期限 $T$ 之前拒绝，设存在确定性正整数 $K$ 使得 $T\le K$ 几乎必然成立。发生第一类错误的事件为 $\{\tau_\alpha\le T\}$。由于事件的包含关系：
$$
\{\tau_\alpha\le T\}\subseteq\{\tau_\alpha\le K\}\subseteq\{\tau_\alpha<\infty\},
$$
由测度的单调性，立即得出
$$
\mathbb P_0(\tau_\alpha\le T)\le\mathbb P_0(\tau_\alpha\le K)\le\alpha.
$$
该结论具有深远的统计学意义：无论实验者如何依赖已有数据动态决定提前停止或终止实验（即无论 $T$ 是何种停时或停止规则），只要基于鞅拒绝规则，第一类错误率始终被 $\alpha$ 一致控制，彻底免疫传统假设检验中因“窥视数据”（p-hacking）导致的第一类错误膨胀。

常见错误是将极大值不等式直接作用于无穷时间区间而未通过有限截断 $N$ 与单调事件极限完成过渡；或是误以为随机观察期 $T$ 必须独立于样本轨迹，忽略了 Ville 不等式在任意依样本决策的停止规则下均强一致成立的本质特征。

□

## 16. 
**证明**

将 $M_n(p)$ 展开为独立增量因子的乘积：
$$
M_n(p)=\prod_{i=1}^n\xi_i,\qquad \xi_i=2p^{Y_i}(1-p)^{1-Y_i}.
$$
在原假设 $\mathbb P_0$ 下，$Y_i$ 独立且服从参数 $1/2$ 的 Bernoulli 分布，故
$$
\mathbb E_0[\xi_i]=\frac{1}{2}\bigl(2p^1(1-p)^0\bigr)+\frac{1}{2}\bigl(2p^0(1-p)^1\bigr)=p+(1-p)=1.
$$
由于 $Y_{n+1}$ 独立于历史信息流 $\mathcal F_n=\sigma(Y_1,\ldots,Y_n)$，有
$$
\mathbb E_0[M_{n+1}(p)\mid\mathcal F_n]=M_n(p)\mathbb E_0[\xi_{n+1}\mid\mathcal F_n]=M_n(p)\mathbb E_0[\xi_{n+1}]=M_n(p).
$$
且 $M_n(p)\ge 0$ 可积，$M_0(p)=1$，故 $M_n(p)$ 是 $\mathbb P_0$ 下初值为 $1$ 的非负鞅（似然比鞅）。

对于越界条件 $M_n(p)\ge A$，两端取自然对数：
$$
n\ln 2+S_n\ln p+(n-S_n)\ln(1-p)\ge\ln A.
$$
合并同类项整理得
$$
S_n\ln\left(\frac{p}{1-p}\right)+n\ln\bigl(2(1-p)\bigr)\ge\ln A.
$$
记对数几率 $\theta=\ln[p/(1-p)]$。当 $p>1/2$ 时，$\theta>0$，两端同除以 $\theta$ 得线性阈值：
$$
S_n\ge\frac{\ln A}{\ln\frac{p}{1-p}}+n\cdot\frac{-\ln\bigl(2(1-p)\bigr)}{\ln\frac{p}{1-p}}.
$$
当 $p<1/2$ 时，$\theta<0$，不等号反向，阈值为 $S_n\le\frac{\ln A-n\ln(2(1-p))}{\ln[p/(1-p)]}$。

由于 $M_n(p)$ 是初值为 $1$ 的非负鞅，且 $A>1$，直接由第 15 题的 Ville 不等式：
$$
\mathbb P_0(\tau_A<\infty)=\mathbb P_0\Bigl(\sup_{n\ge 0}M_n(p)\ge A\Bigr)\le\frac{\mathbb E_0[M_0(p)]}{A}=A^{-1}.
$$

对于停止过程在时刻 $n$ 的期望值，注意到对任意固定的 $n$，截断停时 $n\wedge\tau_A$ 取值于 $\{0,1,\ldots,n\}$，是有界停时。根据有界可选停时定理，鞅在有界停时处的期望恒等于初值：
$$
\mathbb E_0 M_{n\wedge\tau_A}(p)=\mathbb E_0 M_0(p)=1.
$$
该式对所有 $n\ge 0$ 恒成立。

常见错误是在改写对数不等式为 $S_n$ 的线性界限时，未讨论 $p>1/2$ 与 $p<1/2$ 的区别，忽视了除以负数时不等号必须调向；或是在计算 $\mathbb E_0 M_{n\wedge\tau_A}(p)$ 时误认为由于 $\tau_A$ 可能无穷大而导致等式不成立，未能区分有限截断停时与无穷时间极限的本质差异。

□

## 17. 
**证明**

首先设 $M_n$ 为一致可积鞅。一致可积性蕴含在 $L^1$ 中有界：
$$
\sup_{n\ge 0}\mathbb E|M_n|<\infty.
$$
由第 12 题证明的 Doob 鞅收敛定理，存在可积随机变量 $M_\infty\in L^1$，使得 $M_n\to M_\infty$ 几乎必然成立。结合一致可积性与几乎必然收敛（进而依概率收敛），由 Vitali 收敛定理，序列在 $L^1$ 中强收敛：
$$
\lim_{n\to \infty}\mathbb E|M_n-M_\infty|=0.
$$
固定时刻 $n$，对任意 $m\ge n$ 及任意事件 $A\in\mathcal F_n$，因为 $M$ 是鞅且 $\mathcal F_n\subseteq\mathcal F_m$，有
$$
\mathbb E[M_m\mathbf 1_A]=\mathbb E\Bigl[\mathbb E[M_m\mid\mathcal F_n]\mathbf 1_A\Bigr]=\mathbb E[M_n\mathbf 1_A].
$$
两端考察 $m\to \infty$ 的极限。利用 $L^1$ 范数控制：
$$
\bigl|\mathbb E[M_m\mathbf 1_A]-\mathbb E[M_\infty\mathbf 1_A]\bigr|\le\mathbb E\bigl[|M_m-M_\infty|\mathbf 1_A\bigr]\le\mathbb E|M_m-M_\infty|\to 0.
$$
由此可知，对任意 $A\in\mathcal F_n$，恒有
$$
\mathbb E[M_n\mathbf 1_A]=\mathbb E[M_\infty\mathbf 1_A].
$$
由 $M_n$ 关于 $\mathcal F_n$ 可测及条件期望的 Radon-Nikodym 唯一性，即得 $M_n=\mathbb E[M_\infty\mid\mathcal F_n]$ 几乎必然成立。

反之，设存在 $X\in L^1$ 使得 $M_n=\mathbb E[X\mid\mathcal F_n]$。由条件 Jensen 不等式，
$$
|M_n|=|\mathbb E[X\mid\mathcal F_n]|\le\mathbb E[|X|\mid\mathcal F_n].
$$
对任意常数 $c>0$，事件 $\{|M_n|\ge c\}\in\mathcal F_n$。在该事件上取期望：
$$
\mathbb E\bigl[|M_n|\mathbf 1_{\{|M_n|\ge c\}}\bigr]\le\mathbb E\Bigl[\mathbb E[|X|\mid\mathcal F_n]\mathbf 1_{\{|M_n|\ge c\}}\Bigr]=\mathbb E\bigl[|X|\mathbf 1_{\{|M_n|\ge c\}}\bigr].
$$
由 Markov 不等式，
$$
\mathbb P(|M_n|\ge c)\le\frac{\mathbb E|M_n|}{c}\le\frac{\mathbb E|X|}{c}.
$$
因为 $X\in L^1$，其测度积分满足绝对连续性：对任意 $\varepsilon>0$，存在 $\delta>0$，只要事件 $B$ 满足 $\mathbb P(B)<\delta$，就有 $\mathbb E[|X|\mathbf 1_B]<\varepsilon$。选取足够大的 $c$ 使得 $\mathbb E|X|/c<\delta$，则对所有 $n$ 一致成立 $\mathbb P(|M_n|\ge c)<\delta$，从而
$$
\sup_{n\ge 0}\mathbb E\bigl[|M_n|\mathbf 1_{\{|M_n|\ge c\}}\bigr]\le\sup_{n\ge 0}\mathbb E\bigl[|X|\mathbf 1_{\{|M_n|\ge c\}}\bigr]<\varepsilon.
$$
这证明了族 $\{M_n\}$ 一致可积。

综合上述双向证明，得到等价刻画：一个离散时间鞅是一致可积鞅，当且仅当它是右侧封闭的，即由某个终极可积随机变量的条件期望族所生成；且此时封闭元唯一对应于其几乎必然与 $L^1$ 极限。

常见错误是在从 $L^1$ 收敛导出条件期望等式时，未在任意事件 $A\in\mathcal F_n$ 上进行测试积分，直接将极限强行移入条件期望内部；或在验证条件期望族一致可积时，忽略了单随机变量积分的绝对连续性。

□

## 18. 
**证明**

记鞅差为 $d_k=M_k-M_{k-1}$（约定 $M_{-1}=0,d_0=M_0$）。对任意整数 $0\le j<k$，$d_j$ 关于 $\mathcal F_j\subseteq\mathcal F_{k-1}$ 可测。利用重期望公式并提出可测因子：
$$
\mathbb E[d_j d_k]=\mathbb E\Bigl[\mathbb E[d_j d_k\mid\mathcal F_{k-1}]\Bigr]=\mathbb E\Bigl[d_j\mathbb E[d_k\mid\mathcal F_{k-1}]\Bigr].
$$
由鞅的定义，$\mathbb E[d_k\mid\mathcal F_{k-1}]=\mathbb E[M_k-M_{k-1}\mid\mathcal F_{k-1}]=0$。因此
$$
\mathbb E[d_j d_k]=0\qquad (j\ne k).
$$
这证明了不同时刻的鞅差在 Hilbert 空间 $L^2$ 中彼此严格正交。

将 $M_n$ 表达为正交和 $M_n=M_0+\sum_{k=1}^n d_k$。由勾股定理，
$$
\mathbb E M_n^2=\mathbb E M_0^2+\sum_{k=1}^n\mathbb E d_k^2.
$$
由题设 $\sup_n\mathbb E M_n^2<\infty$，非负正项级数 $\sum_{k=1}^\infty\mathbb E d_k^2<\infty$ 收敛。对任意 $m>n$，
$$
\|M_m-M_n\|_2^2=\mathbb E\left[\left(\sum_{k=n+1}^m d_k\right)^2\right]=\sum_{k=n+1}^m\mathbb E d_k^2\to 0\quad (n,m\to \infty).
$$
因此 $\{M_n\}$ 是 $L^2$ 空间中的柯西序列。由 $L^2$ 完备性，存在 $M_\infty\in L^2$ 使得 $M_n\to M_\infty$ 在 $L^2$ 中收敛。
由柯西-施瓦茨不等式，$\mathbb E|M_n|\le(\mathbb E M_n^2)^{1/2}$，故 $\sup_n\mathbb E|M_n|<\infty$。结合 Doob 鞅收敛定理与 $L^2$ 收敛蕴含依概率收敛，极限一致，故 $M_n\to M_\infty$ 几乎必然成立。

由 $L^2$ 收敛蕴含 $L^1$ 收敛：$\mathbb E|M_n-M_\infty|\le\|M_n-M_\infty\|_2\to 0$，由第 17 题的测度测试法可知，$M_n=\mathbb E[M_\infty\mid\mathcal F_n]$ 几乎必然成立。

仅有几乎必然收敛时不能自动交换条件期望与极限的原因在于：若过程缺乏一致可积性或 $L^1$ 控制，质量可能在极限过程中逃逸到无穷远处（例如第 12 题中的倍投鞅，其样本轨道几乎必然收敛到 $0$，但无条件期望始终为 $1$）。此时极限变量 $M_\infty=0$ 生成的条件期望恒为 $0$，而 $M_n$ 自身不为 $0$，等式彻底破裂。

常见错误是认为正交性可以由简单的无条件不相关得出，忽略了鞅差正交的根源是强条件期望关系；或是误以为 Hilbert 空间的柯西完备性直接给出了全序列的几乎必然收敛，混淆了 $L^2$ 强收敛与点态轨道收敛的区别。

□

## 19. 
**证明**

记自然信息流为 $\mathcal F_{n,k}=\sigma(\xi_1,\ldots,\xi_k)$（$1\le k\le n$），$\mathcal F_{n,0}$ 为平凡 $\sigma$-代数。由于 $\xi_k$ 独立于 $\mathcal F_{n,k-1}$ 且 $\mathbb E\xi_k=0$，条件期望满足
$$
\mathbb E[D_{n,k}\mid\mathcal F_{n,k-1}]=\frac{1}{\sigma\sqrt n}\mathbb E[\xi_k\mid\mathcal F_{n,k-1}]=\frac{\mathbb E\xi_k}{\sigma\sqrt n}=0.
$$
且各分量在 $L^2$ 中可积，故 $\{D_{n,k},\mathcal F_{n,k}\}$ 构成良定义的鞅差阵列。

核验条件方差收敛条件：考察累积条件方差过程 $V_n=\sum_{k=1}^n\mathbb E[D_{n,k}^2\mid\mathcal F_{n,k-1}]$。利用 $\xi_k$ 与历史的独立性：
$$
\mathbb E[D_{n,k}^2\mid\mathcal F_{n,k-1}]=\frac{1}{n\sigma^2}\mathbb E[\xi_k^2\mid\mathcal F_{n,k-1}]=\frac{\mathbb E[\xi_k^2]}{n\sigma^2}=\frac{\sigma^2}{n\sigma^2}=\frac{1}{n}.
$$
对 $k=1,\ldots,n$ 求和得到
$$
V_n=\sum_{k=1}^n\frac{1}{n}=1.
$$
由于 $V_n$ 为确定性常数 $1$，自然依概率（乃至几乎必然）收敛于常数 $1$。

核验条件 Lindeberg 条件：对任意固定 $\varepsilon>0$，考察截断泛函
$$
L_n(\varepsilon)=\sum_{k=1}^n\mathbb E\bigl[D_{n,k}^2\mathbf 1_{\{|D_{n,k}|>\varepsilon\}}\mid\mathcal F_{n,k-1}\bigr].
$$
再次利用独立同分布性质，条件期望退化为无条件期望：
$$
L_n(\varepsilon)=\sum_{k=1}^n\frac{1}{n\sigma^2}\mathbb E\Bigl[\xi_k^2\mathbf 1_{\{|\xi_k|>\varepsilon\sigma\sqrt n\}}\Bigr]=\frac{1}{\sigma^2}\mathbb E\Bigl[\xi_1^2\mathbf 1_{\{|\xi_1|>\varepsilon\sigma\sqrt n\}}\Bigr].
$$
因 $\mathbb E\xi_1^2=\sigma^2<\infty$，当 $n\to \infty$ 时，示性函数 $\mathbf 1_{\{|\xi_1|>\varepsilon\sigma\sqrt n\}}\to 0$ 几乎必然成立，且被可积函数 $\xi_1^2$ 控制。由控制收敛定理，
$$
\lim_{n\to \infty}L_n(\varepsilon)=0.
$$
条件 Lindeberg 条件严格满足。由鞅差中心极限定理，累加和收敛于标准正态分布：
$$
\sum_{k=1}^n D_{n,k}=\frac{\sum_{k=1}^n\xi_k}{\sigma\sqrt n}\xrightarrow{d}\mathcal N(0,1).
$$

若将独立性弱化为两两不相关：首先，不相关仅保证无条件线性正交，不能保证 $\mathbb E[\xi_k\mid\mathcal F_{k-1}]=0$，鞅差性质通常直接破裂；其次，条件方差 $\mathbb E[\xi_k^2\mid\mathcal F_{k-1}]$ 将严重依赖过去路径而不再退化为常数 $\sigma^2$，其累加和 $V_n$ 可能收敛到某个非退化的随机变量，导致极限分布退化为随机方差混合正态，中心极限定理不再成立。

常见错误是混淆独立增量与鞅差的本质区别，在核验条件方差时未指明由独立性导致条件期望退化为常数无条件期望这一关键推论；或是将不相关误认为条件期望独立。

□

## 20. 
**证明**

首先核验适应性与可积性：因 $\theta_{k+1}$ 关于 $\mathcal F_k$ 可测且有界（设 $|\theta_{k+1}|\le C$），而 $S_k,S_{k+1}$ 关于 $\mathcal F_{k+1}$ 可测且可积，故每一项 $\theta_{k+1}(S_{k+1}-S_k)$ 关于 $\mathcal F_{k+1}$ 可测且可积。由有限求和的代数封闭性，$G_n$ 关于 $\mathcal F_n$ 可测，且 $\mathbb E|G_n|<\infty$。

考察增量的条件期望：
$$
\mathbb E[G_{n+1}-G_n\mid\mathcal F_n]=\mathbb E[\theta_{n+1}(S_{n+1}-S_n)\mid\mathcal F_n].
$$
由于 $\theta_{n+1}$ 有界且关于 $\mathcal F_n$ 可测，可将其从条件期望中作为已知因子提出：
$$
\mathbb E[\theta_{n+1}(S_{n+1}-S_n)\mid\mathcal F_n]=\theta_{n+1}\mathbb E[S_{n+1}-S_n\mid\mathcal F_n].
$$
因为价格过程 $S$ 是鞅，条件增量期望为零：$\mathbb E[S_{n+1}-S_n\mid\mathcal F_n]=0$。因此
$$
\mathbb E[G_{n+1}-G_n\mid\mathcal F_n]=0\implies\mathbb E[G_{n+1}\mid\mathcal F_n]=G_n.
$$
这证明了离散随机积分过程 $G_n$ 是鞅。

在单期模型中，设时刻 $0$ 信息流 $\mathcal F_0$ 平凡，$S_0=0$；时刻 $1$ 的价格以等概率 $1/2$ 分别取 $+1$ 与 $-1$。此时 $\mathbb E[S_1\mid\mathcal F_0]=\mathbb E S_1=0$，$S_n$ 是鞅。
构造一个依赖 $S_1$ 的非可料头寸：令
$$
\tilde\theta_1=\operatorname{sgn}(S_1)=\begin{cases}1,&S_1=1,\\-1,&S_1=-1.\end{cases}
$$
此时持仓绝对值满足 $|\tilde\theta_1|=1\le 1$ 有界。期末累计收益为
$$
G_1=\tilde\theta_1(S_1-S_0)=\operatorname{sgn}(S_1)\cdot S_1=|S_1|=1.
$$
其期望收益为 $\mathbb E G_1=1>0$，实现了确定性套利。

这一构造不属于可料交易的原因在于：金融市场的可料性（自洽无内幕）严格要求在交易周期 $(k,k+1]$ 内的持仓 $\theta_{k+1}$ 必须在进入该周期前（即时刻 $k$）就已确定，数学上表现为关于 $\mathcal F_k$ 可测。而上述构造中的 $\tilde\theta_1$ 包含了时刻 $1$ 的未来实现，属于 $\mathcal F_1$ 可测而非 $\mathcal F_0$ 可测，本质上是借由未来信息的“时间穿梭”交易，违反了物理因果律与可料性约束。

常见错误是在证明鞅变换时直接对无条件期望取期望，省略了条件期望提出可测因子的推导；或是误以为无套利定理排除了依赖未来信息的收益期望大于零的可能性。

□

## 21. 
**证明**

由第 20 题已证结论，$G_n$ 是初值为 $G_0=0$ 的鞅。对任意停时 $\tau$ 与任意给定的确定性期限 $N$，截断停时 $\tau_N=\tau\wedge N$ 取值受限于区间 $[0,N]$，是有界停时。根据有界可选停时定理，鞅在有界停时处的期望恒等于初始期望：
$$
\mathbb E G_{\tau\wedge N}=\mathbb E G_0=0.
$$

构造使 $\mathbb E G_\tau\ne 0$ 的反例：设折现价格过程 $S_n$ 为标准对称简单随机游走，即 $S_0=0$，$S_n=\sum_{i=1}^n\xi_i$，其中 $\mathbb P(\xi_i=1)=\mathbb P(\xi_i=-1)=1/2$。已知 $S_n$ 为鞅。选取恒为 1 的常量投资策略 $\theta_{k+1}\equiv 1$：由 $\sup_k|\theta_{k+1}|=1$ 知其有界；常值随机变量关于任何 $\sigma$-代数可测，故 $\theta_{k+1}$ 关于 $\mathcal F_k$ 可测，从而是可料的。此时累计交易收益退化为价格变动本身：
$$
G_n=\sum_{k=0}^{n-1}1\cdot(S_{k+1}-S_k)=S_n-S_0=S_n.
$$
定义止盈停时：
$$
\tau=\inf\{n\ge 1:S_n=1\}.
$$
由一维对称简单随机游走的常返性，游走以概率 1 访问状态 1，故 $\tau$ 几乎必然有限，即 $\mathbb P(\tau<\infty)=1$。但该停时的期望时间 $\mathbb E\tau=\infty$ 为无界停时。在停止时刻，按定义恒有 $S_\tau=1$，因此
$$
G_\tau=S_\tau=1\implies\mathbb E G_\tau=1\ne 0.
$$
若将策略反向改为做空，或将停止条件设为触及 $-1$ 止损，同理可得 $\mathbb E G_\tau=-1\ne 0$。

据此可知，“设置止损停时”本身绝不能推出停止后期望收益仍等于初始值。其数学机制在于：可选停时定理要求停止过程族 $\{G_{\tau\wedge n}\}_{n\ge 1}$ 满足一致可积性。在没有确定性到期期限（$N=\infty$）的止损规则下，虽然停止本身几乎必然发生，但未被停止的罕见极端亏损轨道随着时间推移向负无穷扩散，破坏了一致可积性，导致负向质量在无穷远处发生逃逸。因此，缺乏硬性期限兜底的动态止损停时不能保证期望收益守恒。

常见错误是将停时几乎必然有限（$\mathbb P(\tau<\infty)=1$）错误等同于有界停时，从而盲目套用可选停时定理；或是误以为可料投资策略只要有界就足以消除极端时间的尾部质量泄漏。

□

## 22. 
**证明**

对给定的正整数 $n$ 与 $1\le k\le n$，定义归一化鞅差阵列：
$$
X_{n,k}=\frac{D_k}{\sqrt{v_n}}.
$$
由于 $D_k$ 为鞅差且关于 $\mathcal F_k$ 可测，$\mathbb E[X_{n,k}\mid\mathcal F_{k-1}]=v_n^{-1/2}\mathbb E[D_k\mid\mathcal F_{k-1}]=0$。其条件方差求和满足
$$
\sum_{k=1}^n\mathbb E[X_{n,k}^2\mid\mathcal F_{k-1}]=\frac{1}{v_n}\sum_{k=1}^n\sigma_k^2=\frac{V_n}{v_n}.
$$
由题设条件，当 $n\to \infty$ 时，$V_n/v_n\xrightarrow{p}1$ 依概率成立。
再核验条件 Lindeberg 条件：题设条件给出，对任意 $\varepsilon>0$，
$$
\frac{1}{v_n}\sum_{k=1}^n\mathbb E\Bigl[D_k^2\mathbf 1_{\{|D_k|>\varepsilon\sqrt{v_n}\}}\Bigr]\to 0.
$$
无条件期望求和趋于零蕴含被积项在 $L^1$ 意义下收敛到零，进而依概率收敛到零。根据鞅差中心极限定理（McLeish-Brown 定理），
$$
\frac{S_n}{\sqrt{v_n}}=\sum_{k=1}^n X_{n,k}\xrightarrow{d}\mathcal N(0,1).
$$

在 $V_n>0$ 几乎必然时推导自标准化形式：将统计量作代数恒等分解：
$$
\frac{S_n}{\sqrt{V_n}}=\frac{S_n}{\sqrt{v_n}}\cdot\sqrt{\frac{v_n}{V_n}}.
$$
因为 $V_n/v_n\xrightarrow{p}1$，由连续映射定理（开方与取倒数在点 1 处连续），
$$
\sqrt{\frac{v_n}{V_n}}\xrightarrow{p}1.
$$
结合已证的 $S_n/\sqrt{v_n}\xrightarrow{d}\mathcal N(0,1)$，由 Slutsky 定理，乘积项的分布极限保持不变：
$$
\frac{S_n}{\sqrt{V_n}}\xrightarrow{d}\mathcal N(0,1).
$$

最后构造全路径依赖停时导致正态近似失效的反例：
设 $D_k$ 为独立同分布的对称 Rademacher 变量，$\mathbb P(D_k=1)=\mathbb P(D_k=-1)=1/2$。此时 $\sigma_k^2=1$ 恒成立，$V_n=n$，$v_n=n$。
对固定的较大规模期限 $N$，定义依赖全路径极值的提前停止时刻：
$$
\tau=\inf\bigl\{1\le k\le N:S_k=\lfloor c\sqrt N\rfloor\bigr\}\wedge N,
$$
其中 $c>0$ 为固定常数。由一维随机游走的极大值分布，事件 $\{\max_{1\le k\le N}S_k\ge\lfloor c\sqrt N\rfloor\}$ 发生的极限概率严格介于 $0$ 与 $1$ 之间（由反射原理渐近为 $2(1-\Phi(c))>0$）。在该事件上，停止时的分子被完全锁定在正阈值 $\lfloor c\sqrt N\rfloor$ 处，使得停止统计量 $S_\tau/\sqrt N$ 在正值处出现狄拉克质量尖峰，破坏了连续密度；同时未达阈值的轨道被选择性保留，其条件分布出现显著的负偏态与异方差。若将标准化分母换为 $\sqrt\tau$，极端停时选择还会导致分母在早期触碰时严重偏小，产生剧烈的人为厚尾与双峰结构，正态近似彻底失效。

常见错误是在推导自标准化形式时未说明连续映射定理与 Slutsky 定理的结合逻辑；或是误以为由于每个固定时刻的增量服从中心极限定理，对路径极值停时下的停止变量也可以直接套用高斯分布，混淆了固定时间渐近分布与自适应选择停时导致的样本偏误。

□