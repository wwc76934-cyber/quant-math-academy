# 第14章习题参考答案与解析

## 1. 

首先分析依概率收敛性。对任意给定的常数 $\varepsilon > 0$，当正整数 $n > \varepsilon$ 时，事件 $\{|X_n - 0| \ge \varepsilon\}$ 等价于 $\{X_n = n\}$。根据定义，此时有
$$
\mathbb P(|X_n| \ge \varepsilon) = \mathbb P\left(U < \frac{1}{n}\right) = \frac{1}{n}
$$
当 $n \to \infty$ 时，$1/n \to 0$，故对任意 $\varepsilon > 0$ 均有 $\lim_{n \to \infty} \mathbb P(|X_n| \ge \varepsilon) = 0$。因此序列 $\{X_n\}$ 依概率收敛到 $0$。

其次分析几乎必然收敛性。考察随机变量在样本点上的逐点表现。样本空间为 $(0,1)$，任取 $\omega \in (0,1)$，必存在正整数 $N = \lfloor 1/\omega \rfloor + 1$。当 $n \ge N$ 时，满足 $1/n \le 1/N < \omega$，从而指示函数 $\mathbf 1\{U(\omega) < 1/n\} = 0$ 恒成立。由此得到对每一个满足 $U(\omega) \in (0,1)$ 的样本点，都有
$$
\lim_{n \to \infty} X_n(\omega) = 0
$$
由于 $U \sim U(0,1)$，集合 $\{\omega : U(\omega) \in (0,1)\}$ 的概率为 $1$。因此序列 $\{X_n\}$ 几乎必然收敛到 $0$。

再次分析 $L^1$ 空间的收敛性。直接计算 $X_n$ 的一阶绝对矩：
$$
\mathbb E[|X_n - 0|] = \mathbb E[X_n] = n \cdot \mathbb P\left(U < \frac{1}{n}\right) = n \cdot \frac{1}{n} = 1
$$
由于对所有正整数 $n$ 均有 $\mathbb E|X_n| = 1$，其极限为 $1$ 而非 $0$。因此序列 $\{X_n\}$ 不在 $L^1$ 中收敛到 $0$。

最后分析依分布收敛性。因为依概率收敛能够直接蕴含依分布收敛，或者由分布函数在非零连续点处的逐点极限直接判定，所以序列 $\{X_n\}$ 依分布收敛到退化在 $0$ 处的随机变量。

常见错误做法剖析：容易出现的错误是混淆了概率级数的敛散性与几乎必然收敛的判定条件。观察到 $\sum_{n=1}^\infty \mathbb P(U < 1/n) = \sum_{n=1}^\infty \frac{1}{n} = \infty$，部分读者误套用 Borel–Cantelli 第二引理断言事件 $\{U < 1/n\}$ 无穷次发生，从而得出不几乎必然收敛的错误推论。这一推导的漏洞在于事件序列 $\{U < 1/n\}$ 并不相互独立，而是单调递减序列，其极限事件为单点或空集，实际发生概率为零。另一个典型错误是由 $\mathbb E[X_n] \to 1 \ne 0$ 误断言序列不能几乎必然收敛到 $0$，遗漏了控制收敛定理的条件在此并不满足（缺乏可积控制变量）。

## 2. 

按照题设提示构造滑动的区间指示函数。在概率空间 $([0,1], \mathcal B, \lambda)$ 上，任意正整数 $n \ge 1$ 均可唯一分解为
$$
n = 2^k + j, \quad k = \lfloor \log_2 n \rfloor \ge 0, \quad j \in \{0, 1, \dots, 2^k - 1\}
$$
基于该分解定义区间 $I_n = [j 2^{-k}, (j+1) 2^{-k}]$，并令随机变量为该区间的指示函数：
$$
X_n(\omega) = \mathbf 1_{I_n}(\omega), \quad \omega \in [0,1]
$$

下面验证 $X_n \xrightarrow{\ \mathbb P\ } 0$。对任意 $\varepsilon \in (0,1)$，事件 $\{|X_n| > \varepsilon\}$ 即为 $\{X_n = 1\} = I_n$。计算其概率测度可得
$$
\mathbb P(|X_n| > \varepsilon) = \lambda(I_n) = \frac{1}{2^k}
$$
当 $n \to \infty$ 时，$k = \lfloor \log_2 n \rfloor \to \infty$，因此 $\lim_{n \to \infty} \mathbb P(|X_n| > \varepsilon) = \lim_{k \to \infty} 2^{-k} = 0$。根据依概率收敛的定义，命题 $X_n \xrightarrow{\ \mathbb P\ } 0$ 成立。

下面验证几乎必然收敛不成立。对任意固定的样本点 $\omega \in [0,1)$，在每一个阶数 $k \ge 0$ 下，闭区间族 $\{[j 2^{-k}, (j+1) 2^{-k}]\}_{j=0}^{2^k-1}$ 完整覆盖了区间 $[0,1]$。因此必然存在指标 $j_k \in \{0, 1, \dots, 2^k - 1\}$ 使得 $\omega \in I_{2^k + j_k}$，此时有 $X_{2^k + j_k}(\omega) = 1$。另一方面，当 $k \ge 1$ 时，总存在不包含 $\omega$ 的其他子区间，使得对应的随机变量取值为 $0$。由此可知，对任意 $\omega \in [0,1)$，数列 $\{X_n(\omega)\}$ 中均含有无穷多个 $1$ 与无穷多个 $0$，从而
$$
\limsup_{n \to \infty} X_n(\omega) = 1, \quad \liminf_{n \to \infty} X_n(\omega) = 0
$$
这意味着在除端点外的整个概率为 $1$ 的样本集上，数值序列 $\{X_n(\omega)\}$ 都不存在极限。因此 $X_n \to 0$ 几乎必然不成立。

常见错误做法剖析：此题为概率论中经典的“滑行阶梯”反例。常见错误在于只关注区间长度 $2^{-k} \to 0$，直观地认为点落在区间内的可能性越来越小，便轻率断言对于几乎所有点其取值最终都会稳定为 $0$。这种直观错误遗漏了区间并不是固定在某处缩小，而是在整个定义域上周期性地反复扫过，使得每一个点都被无限次扫中。严格分析必须通过上极限与下极限不相等来否定逐点收敛。

## 3. 

**证明**

首先证明依分布收敛。随机变量 $X$ 服从对称两点分布，其特征由概率质量决定：$\mathbb P(X=1) = \mathbb P(X=-1) = 1/2$。
当 $n$ 为偶数时，$X_n = (-1)^n X = X$，自然与 $X$ 同分布；
当 $n$ 为奇数时，$X_n = (-1)^n X = -X$。计算 $-X$ 的概率分布：
$$
\mathbb P(-X = 1) = \mathbb P(X = -1) = \frac{1}{2}, \quad \mathbb P(-X = -1) = \mathbb P(X = 1) = \frac{1}{2}
$$
可见对任意正整数 $n$，$X_n$ 与 $X$ 均具有完全相同的分布律。其累积分布函数满足 $F_{X_n}(x) = F_X(x)$ 对所有实数 $x$ 恒成立。因此在 $F_X$ 的所有连续点（实际上是全实轴除 $\{-1, 1\}$ 以外的所有点）处，平凡地有 $\lim_{n \to \infty} F_{X_n}(x) = F_X(x)$，由此严格证得 $X_n \xrightarrow{\ d\ } X$。

接下来用反证法证明 $\{X_n\}$ 不依概率收敛到任何随机变量。假设存在某个随机变量 $Y$ 使得 $X_n \xrightarrow{\ \mathbb P\ } Y$。根据依概率收敛的柯西准则，对任意常数 $\varepsilon > 0$，必有
$$
\lim_{n \to \infty} \mathbb P(|X_{n+1} - X_n| \ge \varepsilon) = 0
$$
然而对任意正整数 $n$，考察差值变量：
$$
|X_{n+1} - X_n| = |(-1)^{n+1}X - (-1)^n X| = 2|X|
$$
由于 $X$ 仅取值 $1$ 或 $-1$，恒有 $|X| = 1$，从而 $|X_{n+1} - X_n| = 2$ 恒成立。
取定 $\varepsilon = 1$，则对任意 $n$ 均有
$$
\mathbb P(|X_{n+1} - X_n| \ge 1) = \mathbb P(2 \ge 1) = 1
$$
上式极限为 $1$ 而非 $0$，与柯西准则产生不可调和的矛盾。因此不存在任何随机变量 $Y$ 使得 $X_n \xrightarrow{\ \mathbb P\ } Y$。

最后说明与极限定理的关系。依概率收敛蕴含依分布收敛是一条单向的判定定理，即命题“$Z_n \xrightarrow{\ \mathbb P\ } Z \implies Z_n \xrightarrow{\ d\ } Z$”为真。逆命题“依分布收敛蕴含依概率收敛”在极限分布非退化为常数时一般并不成立。这是因为依分布收敛仅刻画每个随机变量边际分布的渐近性质，完全脱离了随机变量之间的联合分布关系；而依概率收敛则要求序列与极限在同一样本空间上具备逐点的接近性。本例中 $X_n$ 与 $X$ 的边际分布完全静止不变，但两者在样本点上的符号不断振荡翻转，因而两者并不矛盾。

□

常见错误做法剖析：在否定依概率收敛时，许多解答仅证明了 $X_n$ 不依概率收敛到原变量 $X$，并草率得出结论。这种证明并不严密，因为题设要求证明“不依概率收敛到任何随机变量”，逻辑上必须排除收敛到某个与 $X$ 不同的随机变量 $Y$ 的可能性。采用依概率收敛序列必为概率柯西序列的性质，可以直接避开候选极限的具体构造，一步完成全局否定。

## 4. 

**证明**

因为序列 $\{X_n\}$ 依概率收敛到 $X$，所以根据依概率收敛的定义，对任意正数 $\delta > 0$，均有 $\lim_{n \to \infty} \mathbb P(|X_n - X| > \delta) = 0$。

对每一个正整数 $k \ge 1$，取 $\delta = 2^{-k}$。根据极限定义，存在正整数 $N_k$ 使得当 $n \ge N_k$ 时，恒有
$$
\mathbb P\left(|X_n - X| > 2^{-k}\right) < 2^{-k}
$$
基于此构造子列指标序列 $\{n_k\}$。令 $n_1 = N_1$；当 $n_1 < n_2 < \dots < n_{k-1}$ 选定后，选取
$$
n_k = \max\{n_{k-1} + 1, N_k\}
$$
由此保证指标序列 $\{n_k\}$ 严格单调递增，且对每一个 $k \ge 1$ 均满足
$$
\mathbb P\left(|X_{n_k} - X| > 2^{-k}\right) < 2^{-k}
$$

记事件 $A_k = \{|X_{n_k} - X| > 2^{-k}\}$。计算概率级数：
$$
\sum_{k=1}^\infty \mathbb P(A_k) < \sum_{k=1}^\infty 2^{-k} = 1 < \infty
$$
由 Borel–Cantelli 第一引理，事件列 $\{A_k\}$ 的上极限发生概率为零，即
$$
\mathbb P\left(\limsup_{k \to \infty} A_k\right) = 0
$$
令 $\Omega_0 = (\limsup_{k \to \infty} A_k)^c = \liminf_{k \to \infty} A_k^c$，则其概率测度满足 $\mathbb P(\Omega_0) = 1$。根据下极限事件的性质，对任意样本点 $\omega \in \Omega_0$，存在仅依赖于 $\omega$ 的正整数 $K(\omega)$，使得当 $k \ge K(\omega)$ 时，$\omega \in A_k^c$ 恒成立，即
$$
|X_{n_k}(\omega) - X(\omega)| \le 2^{-k}
$$
任取实数 $\varepsilon > 0$，必存在正整数 $K' \ge K(\omega)$ 满足 $2^{-K'} < \varepsilon$。于是当 $k \ge K'$ 时，有
$$
|X_{n_k}(\omega) - X(\omega)| \le 2^{-k} \le 2^{-K'} < \varepsilon
$$
这证明了数值序列极限 $\lim_{k \to \infty} X_{n_k}(\omega) = X(\omega)$ 在 $\Omega_0$ 上处处成立。因为 $\mathbb P(\Omega_0) = 1$，所以子列满足 $X_{n_k} \to X$ 几乎必然。

□

常见错误做法剖析：最普遍的错误是在选取指标 $n_k$ 时仅简单要求 $n_k \ge N_k$，而没有强制约束 $n_k > n_{k-1}$，这可能导致选取的指标停滞不前甚至形成常数序列，无法构成合法的严格子列。另一常见错误是误以为原序列的概率之和 $\sum_{n=1}^\infty \mathbb P(|X_n - X| > \varepsilon)$ 收敛并直接应用 Borel–Cantelli 引理，然而依概率收敛只保证通项趋于零，该级数完全可能是发散的（如第 2 题的情形），必须通过快速几何衰减界构造子列。

## 5. 

**证明**

首先证明充分性：若 $X_n \xrightarrow{\ L^p\ } X$（其中 $p \ge 1$），则 $X_n \xrightarrow{\ \mathbb P\ } X$。
根据 $L^p$ 收敛的定义，当 $n \to \infty$ 时，有
$$
\lim_{n \to \infty} \mathbb E[|X_n - X|^p] = 0
$$
对任意给定的常数 $\varepsilon > 0$，利用马尔可夫不等式（或切比雪夫不等式的 $p$ 次推广形式），事件的概率满足
$$
\mathbb P(|X_n - X| \ge \varepsilon) = \mathbb P\left(|X_n - X|^p \ge \varepsilon^p\right) \le \frac{\mathbb E[|X_n - X|^p]}{\varepsilon^p}
$$
由于分母 $\varepsilon^p > 0$ 为固定常数，分子随着 $n \to \infty$ 趋近于 $0$，根据两边夹法则可得
$$
\lim_{n \to \infty} \mathbb P(|X_n - X| \ge \varepsilon) = 0
$$
根据依概率收敛的定义，证得 $X_n \xrightarrow{\ \mathbb P\ } X$。

□

反向不成立的反例构造如下：
在概率空间 $([0,1], \mathcal B, \lambda)$（$\lambda$ 为勒贝格测度）上，对任意正整数 $n \ge 1$，定义随机变量
$$
X_n(\omega) = n \cdot \mathbf 1_{[0, 1/n]}(\omega), \quad \omega \in [0,1]
$$
设候选极限为零随机变量 $X = 0$。对任意常数 $\varepsilon \in (0, 1)$，当 $n > 1$ 时，有
$$
\mathbb P(|X_n - 0| \ge \varepsilon) = \lambda\left(\left[0, \frac{1}{n}\right]\right) = \frac{1}{n}
$$
当 $n \to \infty$ 时，$1/n \to 0$，因此 $X_n \xrightarrow{\ \mathbb P\ } 0$ 成立。
然而计算其在 $L^1$ 范数下的期望：
$$
\mathbb E[|X_n - 0|] = \int_0^1 n \cdot \mathbf 1_{[0, 1/n]}(\omega) d\lambda(\omega) = n \cdot \frac{1}{n} = 1
$$
对任意正整数 $n$ 恒有 $\mathbb E|X_n| = 1 \ne 0$。若考虑 $p > 1$，则更有 $\mathbb E[|X_n|^p] = n^p \cdot (1/n) = n^{p-1} \ge 1$（当 $p>1$ 时趋于无穷大）。无论对何种 $p \ge 1$，均有 $\lim_{n \to \infty} \mathbb E[|X_n|^p] \ne 0$。因此 $X_n \xrightarrow{\ L^1\ } 0$ 不成立，逆向命题不成立。

常见错误做法剖析：部分推导在应用马尔可夫不等式时遗漏了 $p$ 次幂的变换，直接写出 $\mathbb P(|X_n-X| \ge \varepsilon) \le \mathbb E|X_n-X|/\varepsilon$，当 $p>1$ 时还需额外由 Hölder 不等式借道 $L^1$ 模长，徒增不必要的步骤。在构造反例时，易错点在于所选取的序列不仅在 $L^1$ 中不收敛，甚至使其概率测度 $\mathbb P(|X_n|>\varepsilon)$ 也不趋于零；反例的核心机理是“极小测度上的逃逸巨峰”，即让事件发生的概率随 $n$ 递减，但取值高度以更快的速度补偿积分面积。
## 6. 

**证明**

首先证明第一部分：利用 Portmanteau 定理中关于有界李普希茨函数的等价刻画。设 $f: \mathbb R \to \mathbb R$ 为任意有界且李普希茨连续的函数，即存在常数 $M > 0$ 和 $L > 0$，使得对任意实数 $x, y$ 满足 $|f(x)| \le M$ 且 $|f(x) - f(y)| \le L|x - y|$。

考虑期望之差，根据三角不等式进行拆分：
$$
|\mathbb E[f(X_n + Y_n)] - \mathbb E[f(X + c)]| \le \mathbb E[|f(X_n + Y_n) - f(X_n + c)|] + |\mathbb E[f(X_n + c)] - \mathbb E[f(X + c)]|
$$
对于第二项，定义平移函数 $g(x) = f(x + c)$。因为 $f$ 有界且连续，所以 $g$ 同样是有界连续函数。已知 $X_n \xrightarrow{\ d\ } X$，由 Portmanteau 定理直接可得
$$
\lim_{n \to \infty} |\mathbb E[f(X_n + c)] - \mathbb E[f(X + c)]| = 0
$$
对于第一项，对任意给定的常数 $\delta > 0$，利用全期望公式将样本空间划分为 $\{|Y_n - c| \le \delta\}$ 与 $\{|Y_n - c| > \delta\}$ 两部分：
$$
|f(X_n + Y_n) - f(X_n + c)| \le L|Y_n - c| \cdot \mathbf 1_{\{|Y_n - c| \le \delta\}} + 2M \cdot \mathbf 1_{\{|Y_n - c| > \delta\}} \le L\delta + 2M \cdot \mathbf 1_{\{|Y_n - c| > \delta\}}
$$
两端取数学期望：
$$
\mathbb E[|f(X_n + Y_n) - f(X_n + c)|] \le L\delta + 2M \mathbb P(|Y_n - c| > \delta)
$$
因为已知 $Y_n \xrightarrow{\ \mathbb P\ } c$，所以当 $n \to \infty$ 时，$\lim_{n \to \infty} \mathbb P(|Y_n - c| > \delta) = 0$。于是有
$$
\limsup_{n \to \infty} \mathbb E[|f(X_n + Y_n) - f(X_n + c)|] \le L\delta
$$
由于上式对任意 $\delta > 0$ 均成立，令 $\delta \downarrow 0$ 可得该极限上确界为 $0$。综合两项分析，可知对任意有界李普希茨函数 $f$，均有 $\lim_{n \to \infty} \mathbb E[f(X_n + Y_n)] = \mathbb E[f(X + c)]$。由 Portmanteau 定理，证得 $X_n + Y_n \xrightarrow{\ d\ } X + c$。

接下来证明第二部分：设 $h: \mathbb R^2 \to \mathbb R$ 在全平面连续，且关于第一个分量一致连续。对任意有界李普希茨函数 $\phi: \mathbb R \to \mathbb R$（界为 $M_\phi$，李普希茨常数为 $L_\phi$），我们只需证 $\mathbb E[\phi(h(X_n, Y_n))] \to \mathbb E[\phi(h(X, c))]$。
类似地分解为：
$$
|\mathbb E[\phi(h(X_n, Y_n))] - \mathbb E[\phi(h(X, c))]| \le \mathbb E[|\phi(h(X_n, Y_n)) - \phi(h(X_n, c))|] + |\mathbb E[\phi(h(X_n, c))] - \mathbb E[\phi(h(X, c))]|
$$
函数 $x \mapsto \phi(h(x, c))$ 为 $\mathbb R$ 上的有界连续函数，故右端第二项随 $n \to \infty$ 趋于 $0$。
对于第一项，因为 $h$ 关于第一个变量一致连续，且在点 $(x, c)$ 处连续，对任意 $\varepsilon > 0$，存在 $\delta > 0$，使得当 $|y - c| \le \delta$ 时，对所有 $x \in \mathbb R$ 均有 $|h(x, y) - h(x, c)| \le \varepsilon/L_\phi$。
于是当 $|Y_n - c| \le \delta$ 时，$|\phi(h(X_n, Y_n)) - \phi(h(X_n, c))| \le L_\phi |h(X_n, Y_n) - h(X_n, c)| \le \varepsilon$；
当 $|Y_n - c| > \delta$ 时，差值被直接控制在 $2M_\phi$ 之内。因此
$$
\mathbb E[|\phi(h(X_n, Y_n)) - \phi(h(X_n, c))|] \le \varepsilon + 2M_\phi \mathbb P(|Y_n - c| > \delta)
$$
由 $Y_n \xrightarrow{\ \mathbb P\ } c$ 及 $\varepsilon$ 的任意性，即得第一项极限为 $0$。由此证得 $h(X_n, Y_n) \xrightarrow{\ d\ } h(X, c)$。

□

常见错误做法剖析：常见错误是混淆了“弱收敛可由有界连续函数期望收敛刻画”与“直接将极限运算带入函数内部”。对于第一项期望差，若不能利用截断划分与一致连续性分离出概率小项，而直接声称由连续性求极限，就犯了循环论证的逻辑错误。

## 7. 

**证明**

常数列 $\{a_n\}$ 与 $\{b_n\}$ 可以视为退化在单点上的常数随机变量序列。因为实数列满足普通分析意义下的收敛性 $a_n \to a$ 及 $b_n \to b$，所以在平凡意义下，常数随机变量序列依概率收敛到常数：
$$
a_n \xrightarrow{\ \mathbb P\ } a, \quad b_n \xrightarrow{\ \mathbb P\ } b
$$
根据 Slutsky 定理（命题 14.8），设随机变量序列满足 $X_n \xrightarrow{\ d\ } X$，且有两个随机变量序列分别依概率收敛到有限常数 $a$ 和 $b$。则由乘法与加法的 Slutsky 性质：
首先，由 $a_n \xrightarrow{\ \mathbb P\ } a$ 及 $X_n \xrightarrow{\ d\ } X$，可得乘积满足 $a_n X_n \xrightarrow{\ d\ } aX$；
其次，由 $b_n \xrightarrow{\ \mathbb P\ } b$ 及上述中间结果，可得和满足 $a_n X_n + b_n \xrightarrow{\ d\ } aX + b$。
至此命题获证。

□

当序列换为一般的随机变量序列 $A_n \xrightarrow{\ d\ } A$ 时，结论一般不再成立。其根本原因在于：依分布收敛仅规范了边际分布的收敛性，丝毫没有约束随机变量 $A_n$ 与 $X_n$ 之间的联合分布（相依结构）。乘积项 $A_n X_n$ 的分布高度依赖于两者的联合耦合方式，单凭各自的边际弱极限无法唯一确定联合极限分布。

构造明确的反例如下：
设 $X \sim \mathcal N(0, 1)$。令 $X_n = X$ 对所有正整数 $n$ 恒成立，平凡地有 $X_n \xrightarrow{\ d\ } X$。
再设 $A \sim \mathcal N(0, 1)$。
构造情形一：取 $A_n = X$ 对所有 $n$ 恒成立。此时 $A_n \xrightarrow{\ d\ } X \sim \mathcal N(0, 1)$。两者的乘积为
$$
A_n X_n = X^2
$$
其极限分布为一个自由度的卡方分布 $\chi^2(1)$，该分布仅在非负实轴上有支撑，均值为 $1$。
构造情形二：取 $A_n = -X$ 对所有 $n$ 恒成立。由对称性可知 $-X \sim \mathcal N(0, 1)$，因此同样严格满足 $A_n \xrightarrow{\ d\ } A$。然而此时两者的乘积为
$$
A_n X_n = -X^2
$$
其极限分布为负卡方分布 $-\chi^2(1)$，支撑完全落在负实轴上，均值为 $-1$。
两种构造中边际收敛条件完全相同，但乘积序列所趋向的概率分布截然相反。这充分说明当系数仅为依分布收敛时，无法推出乘积项依分布收敛。

常见错误做法剖析：错误做法往往想当然地认为极限运算可以对任意代数运算分配，误以为“弱极限的乘积等于乘积的弱极限”。Slutsky 定理成立的关键命门在于其中至少有一个序列必须收敛到“确定性常数”（或至少依概率收敛），因为常数极限与任何随机变量的联合分布退化为独立的平凡乘积测度，相依结构的自由度被完全锁死。
## 8. 

**证明**

设随机变量序列 $\{X_n\}$ 同时依分布收敛到随机变量 $X$ 与随机变量 $Y$。
由 Lévy 连续性定理（定理 14.7），随机变量序列依分布收敛等价于其对应的特征函数在实数轴上处处逐点收敛到极限分布的特征函数。
因此，对任意实数 $t \in \mathbb R$，由 $X_n \xrightarrow{\ d\ } X$ 可得
$$
\lim_{n \to \infty} \mathbb E\left[e^{itX_n}\right] = \mathbb E\left[e^{itX}\right] = \varphi_X(t)
$$
同理，由 $X_n \xrightarrow{\ d\ } Y$ 可得
$$
\lim_{n \to \infty} \mathbb E\left[e^{itX_n}\right] = \mathbb E\left[e^{itY}\right] = \varphi_Y(t)
$$
根据复数域 $\mathbb C$ 中普通数列极限的唯一性，对于每一个 $t \in \mathbb R$，上述两式左侧为同一个复数列的极限，因此极限值必然相等：
$$
\varphi_X(t) = \varphi_Y(t)
$$
由特征函数的唯一性定理（傅里叶逆变换反演公式的推论），特征函数与概率测度之间存在一一对应关系。两特征函数在全实轴上完全重合，必然决定相同的概率分布测度，即对任意博雷尔集 $B \in \mathcal B(\mathbb R)$，均有 $\mathbb P(X \in B) = \mathbb P(Y \in B)$。
累积分布函数满足 $F_X(x) = F_Y(x)$ 对所有实数 $x \in \mathbb R$ 恒成立。因此 $X$ 与 $Y$ 同分布。

□

常见错误做法剖析：最典型的概念混淆是将“同分布”误推为“几乎必然相等（$X = Y$）”。依分布收敛只约束边际概率规律，完全不依赖两变量处于同一个概率空间；$X$ 与 $Y$ 甚至可以定义在互不相关的两个样本空间中，断言两随机变量逐点相等在测度论范畴上是未定义的。此外，若试图通过分布函数在连续点处的极限相等来直接论证，必须额外证明连续点稠密并利用右连续性填充全轴，远不如利用特征函数全轴逐点收敛来得简洁完备。

## 9. 

对于第一项 $nX_n$：已知 $X_n \sim \mathrm{Exp}(n)$，其累积分布函数为 $F_{X_n}(x) = 1 - e^{-nx}$（$x > 0$）。
令 $Z_n = nX_n$。对任意实数 $z > 0$，计算其分布函数：
$$
\mathbb P(Z_n \le z) = \mathbb P\left(X_n \le \frac{z}{n}\right) = 1 - \exp\left(-n \cdot \frac{z}{n}\right) = 1 - e^{-z}
$$
可见对任意正整数 $n$，$Z_n$ 的分布函数恒等于标准指数分布 $\mathrm{Exp}(1)$ 的分布函数。因此 $nX_n$ 的分布不随 $n$ 变化，适用的收敛模式为依分布收敛，极限分布为参数为 $1$ 的标准指数分布 $\mathrm{Exp}(1)$。

对于第二项 $X_n$：计算其均值与方差，$\mathbb E[X_n] = 1/n \to 0$，$\operatorname{Var}(X_n) = 1/n^2 \to 0$。对任意常数 $\varepsilon > 0$，利用马尔可夫不等式或直接积分，
$$
\mathbb P(|X_n| \ge \varepsilon) = \mathbb P(X_n \ge \varepsilon) = e^{-n\varepsilon} \to 0
$$
因此 $X_n \xrightarrow{\ \mathbb P\ } 0$ 依概率收敛到 $0$。并且对任意 $p \ge 1$，$\mathbb E[|X_n|^p] = \Gamma(p+1)/n^p \to 0$，故也在 $L^p$ 中收敛到 $0$；此外级数 $\sum_{n=1}^\infty \mathbb P(X_n \ge \varepsilon) = \sum_{n=1}^\infty e^{-n\varepsilon} < \infty$，若处于同一样本空间，由 Borel–Cantelli 引理还成立几乎必然收敛。极限分布为退化在 $0$ 点的单点分布 $\delta_0$。

对于第三项 $\sqrt n X_n$：可表示为 $\sqrt n X_n = \frac{1}{\sqrt n} (n X_n)$。已知 $n X_n \sim \mathrm{Exp}(1)$，对任意 $\varepsilon > 0$，
$$
\mathbb P(|\sqrt n X_n| \ge \varepsilon) = \mathbb P(n X_n \ge \sqrt n \varepsilon) = \exp(-\sqrt n \varepsilon) \to 0
$$
指数衰减速度极快，因此 $\sqrt n X_n$ 依概率收敛到 $0$（在同空间下亦几乎必然收敛，且在任意 $L^p$ 中收敛），极限分布同样为单点退化分布 $\delta_0$。

对于第四项 $X_n + Y_n$：已知 $X_n \xrightarrow{\ \mathbb P\ } 0$，且 $Y_n \sim \mathrm{Exp}(1)$，即 $Y_n \xrightarrow{\ d\ } Y \sim \mathrm{Exp}(1)$。根据 Slutsky 定理（加法形式），当一个序列弱收敛而另一个序列依概率收敛到常数时，
$$
X_n + Y_n \xrightarrow{\ d\ } 0 + Y = Y \sim \mathrm{Exp}(1)
$$
适用的收敛模式为依分布收敛，极限分布为标准指数分布 $\mathrm{Exp}(1)$。

常见错误做法剖析：处理 $nX_n$ 时容易直观地认为由于乘上了因子 $n \to \infty$，变量必然发散到无穷大，遗漏了指数分布参数 $n$ 自身具有的尺度缩放性质；对于 $X_n + Y_n$，常见错误是耗费大量篇幅尝试通过求两个独立变量的卷积密度极限进行硬算，实际上由于 $X_n$ 依概率坍缩至零常数，直接运用 Slutsky 定理即可瞬间化简。

## 10. 

根据连续映射定理（Continuous Mapping Theorem），若随机变量序列满足 $X_n \xrightarrow{\ d\ } X$（此处 $X \sim \mathcal N(0, 1)$），且实函数 $g: \mathbb R \to \mathbb R$ 连续，则 $g(X_n) \xrightarrow{\ d\ } g(X)$。

分别对五个函数计算极限分布：
对于 $g_1(x) = x^2$：映射 $g_1$ 在 $\mathbb R$ 上全域连续。极限分布为标准正态变量的平方 $X^2$，即自由度为 $1$ 的卡方分布 $\chi^2(1)$。
对于 $g_2(x) = |x|$：绝对值函数在全实轴上连续。极限分布为折叠正态分布（即半正态分布 Half-Normal），其概率密度函数在 $x \ge 0$ 时为 $f(x) = \sqrt{2/\pi} e^{-x^2/2}$，在 $x < 0$ 时为 $0$。
对于 $g_3(x) = e^x$：指数函数为全域连续映射。极限分布为标准对数正态分布 $\mathrm{LogNormal}(0, 1)$。
对于 $g_4(x) = 1/(1+x^2)$：分母处处不为零，函数在 $\mathbb R$ 上全域连续。极限分布为随机变量 $1/(1+X^2)$ 的分布，其取值范围严格落在半开区间 $(0, 1]$ 内。
对于 $g_5(x) = \arctan x$：反正切函数在全实轴上有界且连续。极限分布为随机变量 $\arctan X$ 的分布，其支撑集为开区间 $(-\pi/2, \pi/2)$。

关于连续性能否放宽到几乎必然连续：
连续映射定理的经典推广（Mann–Wald 定理）指出，映射 $g$ 并不需要处处连续，只要求其不连续点集 $D_g$ 在极限随机变量诱导的测度下发生概率为零，即满足
$$
\mathbb P(X \in D_g) = 0
$$
在本题中，极限变量 $X \sim \mathcal N(0, 1)$ 服从连续型分布，具有关于勒贝格测度绝对连续的概率密度函数。因此，任何勒贝格零测集（例如任意有限个点或可数个不连续点组成的离散集合）在该正态测度下的概率测度恒为零。
上述五个具体函数均为实数域上的处处连续函数，不连续点集为空集 $D_g = \emptyset$，自然无条件满足测度条件。因此，对于所有这五个函数，条件均可以完全放宽到“关于极限变量的分布几乎必然连续”。

常见错误做法剖析：容易误以为连续映射定理要求函数不仅处处连续，还必须有界（如混淆了弱收敛的定义性检验函数与连续映射定理）。实际上，弱收敛的保连续映射性质对任意无界连续函数（如 $x^2$ 与 $e^x$）均严格成立。另一常见盲点是不理解“几乎必然连续”的测度论含义，误以为只要函数在定义域内有跳跃点定理就失效，实际上只要跳跃点在极限分布中不被赋予正概率，结论依然完全成立。
## 11. 

**证明**

首先证明依概率相合性 $\hat\lambda_n \xrightarrow{\ \mathbb P\ } \lambda$。
设样本均值为 $\bar X_n = \frac{1}{n} \sum_{k=1}^n X_k$。因为 $X_1, \dots, X_n$ 独立同分布于参数为 $\lambda$ 的指数分布 $\mathrm{Exp}(\lambda)$，其总体数学期望与方差分别为
$$
\mathbb E[X_1] = \frac{1}{\lambda}, \quad \operatorname{Var}(X_1) = \frac{1}{\lambda^2}
$$
根据辛钦弱大数定律（Khinchin WLLN），样本均值依概率收敛于总体期望，即
$$
\bar X_n \xrightarrow{\ \mathbb P\ } \frac{1}{\lambda}
$$
定义实函数 $g(u) = 1/u$。因为 $\lambda > 0$，函数 $g(u)$ 在点 $u_0 = 1/\lambda$ 处有定义且连续。矩估计量可表示为 $\hat\lambda_n = g(\bar X_n)$。由连续映射定理，连续函数保持依概率收敛性：
$$
\hat\lambda_n = g(\bar X_n) \xrightarrow{\ \mathbb P\ } g\left(\frac{1}{\lambda}\right) = \lambda
$$
证毕。

□

接下来应用单变量 Delta 方法求 $\sqrt n(\hat\lambda_n - \lambda)$ 的极限分布。
由林德伯格–列维中心极限定理（CLT），样本均值满足渐近正态性：
$$
\sqrt n\left(\bar X_n - \frac{1}{\lambda}\right) \xrightarrow{\ d\ } \mathcal N\left(0, \operatorname{Var}(X_1)\right) = \mathcal N\left(0, \frac{1}{\lambda^2}\right)
$$
函数 $g(u) = 1/u$ 在 $u_0 = 1/\lambda$ 邻域内可微，其一阶导数为 $g'(u) = -1/u^2$。在均值点处的值为
$$
g'\left(\frac{1}{\lambda}\right) = -\frac{1}{(1/\lambda)^2} = -\lambda^2
$$
导数值不为零。根据一维 Delta 方法，若序列满足 $\sqrt n(T_n - \theta) \xrightarrow{\ d\ } \mathcal N(0, \sigma^2)$，则对一阶连续可导变换 $g$ 有 $\sqrt n(g(T_n) - g(\theta)) \xrightarrow{\ d\ } \mathcal N(0, [g'(\theta)]^2 \sigma^2)$。代入参数可得渐近方差为
$$
\sigma_{\text{asy}}^2 = \left[g'\left(\frac{1}{\lambda}\right)\right]^2 \cdot \operatorname{Var}(X_1) = (-\lambda^2)^2 \cdot \frac{1}{\lambda^2} = \lambda^4 \cdot \frac{1}{\lambda^2} = \lambda^2
$$
因此，估计量的极限分布为
$$
\sqrt n(\hat\lambda_n - \lambda) \xrightarrow{\ d\ } \mathcal N(0, \lambda^2)
$$

常见错误做法剖析：计算导数时易在符号或倒数次幂上疏漏，例如错误地得出导数为正；在求渐近方差时，有些解答误将总体方差遗漏，直接将 $[g']^2 = \lambda^4$ 当成极限方差。另一重要理论误区是试图通过直接计算有限样本期望 $\mathbb E[\hat\lambda_n]$ 来论证其无偏性，实际上 $\sum X_k \sim \mathrm{Gamma}(n, \lambda)$，倒数服从逆伽马分布，有限样本下为有偏估计（$\mathbb E[\hat\lambda_n] = \frac{n}{n-1}\lambda$），必须通过大数定律与 Delta 方法在渐近框架下建立相合性与渐近正态性。

## 12. 

随机变量 $X_k$ 相互独立，取对称两点分布，其期望为
$$
\mathbb E[X_k] = k^\alpha \cdot \frac{1}{2} + (-k^\alpha) \cdot \frac{1}{2} = 0
$$
其方差为
$$
\operatorname{Var}(X_k) = \mathbb E[X_k^2] - (\mathbb E[X_k])^2 = (k^\alpha)^2 = k^{2\alpha}
$$
设 $S_n = \sum_{k=1}^n X_k$。由独立性，和的方差等于各方差之和：
$$
\operatorname{Var}(S_n) = \sum_{k=1}^n \operatorname{Var}(X_k) = \sum_{k=1}^n k^{2\alpha}
$$
弱大数定律成立的切比雪夫/马尔可夫条件（命题 14.11）要求和的方差除以 $n^2$ 在 $n \to \infty$ 时极限为零：
$$
\lim_{n \to \infty} \frac{1}{n^2} \operatorname{Var}(S_n) = \lim_{n \to \infty} \frac{1}{n^2} \sum_{k=1}^n k^{2\alpha} = 0
$$
对幂和级数渐近阶进行分类讨论：
当 $2\alpha > -1$ 时，利用积分近似，$\sum_{k=1}^n k^{2\alpha} \sim \frac{n^{2\alpha+1}}{2\alpha+1}$。此时
$$
\frac{1}{n^2} \sum_{k=1}^n k^{2\alpha} \sim \frac{n^{2\alpha-1}}{2\alpha+1}
$$
要使该式趋于零，必须且只需幂次满足 $2\alpha - 1 < 0$，即 $\alpha < 1/2$。
当 $2\alpha = -1$ 即 $\alpha = -1/2$ 时，调和级数求和 $\sum_{k=1}^n k^{-1} \sim \ln n$，故 $\frac{\ln n}{n^2} \to 0$。
当 $2\alpha < -1$ 即 $\alpha < -1/2$ 时，$p$-级数收敛，$\sum_{k=1}^n k^{2\alpha} \le \zeta(-2\alpha) < \infty$，故 $\frac{1}{n^2} O(1) \to 0$。
综合以上三种情形，使马尔可夫条件成立的 $\alpha$ 取值范围为
$$
\alpha < \frac{1}{2}
$$

当 $\alpha \ge 1/2$ 时，弱大数定律失败的原因如下：
若 $\alpha = 1/2$，则 $\frac{1}{n^2}\operatorname{Var}(S_n) \to 1/2$。由于独立对称变量满足林德伯格条件，$S_n/n$ 依分布收敛到方差为 $1/2$ 的非退化正态分布 $\mathcal N(0, 1/2)$，其概率质量不会坍缩至单点 $0$；
若 $\alpha > 1/2$，则 $\frac{1}{n^2}\operatorname{Var}(S_n) \to \infty$。和序列的尺度扩展速度超过了除数 $n$ 的抑制能力。特别地，仅考察末项的波动大小：$|X_n|/n = n^{\alpha-1}$，当 $\alpha > 1$ 时单项自身的绝对值就发散到无穷；即使在 $1/2 < \alpha \le 1$ 时，前项累加波动的有效标准差为 $O(n^{\alpha+1/2})$，除以 $n$ 后阶数为 $O(n^{\alpha-1/2}) \to \infty$。因此概率质量向全实轴两侧极度扩散，依概率收敛到零必然失败。

常见错误做法剖析：常见疏漏是在使用积分估算时默认了 $2\alpha > -1$，遗漏了 $\alpha \le -1/2$ 时级数收敛或对数发散的区间；另一个逻辑错误在于将马尔可夫条件（充分条件）的失效直接等同于大数律失败，严谨的解答必须补充说明当 $\alpha \ge 1/2$ 时标准化变量方差非零导致收敛到非退化分布或发散的客观事实。

## 13. 

设二项随机变量 $S_n \sim \mathrm{Bin}(n, x)$，对应概率母函数或成功概率为 $x \in [0, 1]$。目标计算伯恩斯坦多项式
$$
B_n(f; x) = \mathbb E\left[\left(\frac{S_n}{n}\right)^3\right] = \frac{1}{n^3} \mathbb E[S_n^3]
$$
利用二项分布的阶乘矩展开计算三阶中心前矩。将普通单项式表示为下降阶乘幂的线性组合：
$$
s^3 = s(s-1)(s-2) + 3s(s-1) + s
$$
二项分布的各阶下降阶乘矩满足 $\mathbb E[S_n(S_n-1)\cdots(S_n-k+1)] = n(n-1)\cdots(n-k+1)x^k$。因此
$$
\mathbb E[S_n(S_n-1)(S_n-2)] = n(n-1)(n-2)x^3
$$
$$
\mathbb E[S_n(S_n-1)] = n(n-1)x^2, \quad \mathbb E[S_n] = nx
$$
代入展开式可得
$$
\mathbb E[S_n^3] = n(n-1)(n-2)x^3 + 3n(n-1)x^2 + nx
$$
两端除以 $n^3$，整理系数：
$$
B_n(f; x) = \frac{n(n-1)(n-2)}{n^3} x^3 + \frac{3n(n-1)}{n^3} x^2 + \frac{n}{n^3} x
$$
展开各项的有理系数：
$$
\frac{n(n-1)(n-2)}{n^3} = 1 - \frac{3}{n} + \frac{2}{n^2}, \quad \frac{3n(n-1)}{n^3} = \frac{3}{n} - \frac{3}{n^2}, \quad \frac{n}{n^3} = \frac{1}{n^2}
$$
代入化简可得伯恩斯坦多项式的显式表达式：
$$
B_n(f; x) = x^3 + \frac{3}{n} (x^2 - x^3) + \frac{1}{n^2} (2x^3 - 3x^2 + x)
$$
考察其逼近残差：
$$
B_n(f; x) - f(x) = \frac{3}{n} x^2(1 - x) + \frac{1}{n^2} x(1 - x)(1 - 2x)
$$
对于闭区间 $x \in [0, 1]$：
第一项中的二次函数因子 $x^2(1-x)$ 在 $[0, 1]$ 上非负连续，导数零点位于 $x = 2/3$，其区间极大值为 $(2/3)^2(1/3) = 4/27$；
第二项中的因子 $x(1-x)(1-2x)$ 在 $[0, 1]$ 上亦为有界多项式，其最大绝对值受常数 $1/(6\sqrt 3) \le 1/10$ 控制。
取上确界范数并应用三角不等式：
$$
\sup_{x \in [0, 1]} |B_n(f; x) - f(x)| \le \frac{3}{n} \cdot \frac{4}{27} + \frac{1}{n^2} \cdot \frac{1}{6\sqrt 3} = \frac{4}{9n} + O\left(\frac{1}{n^2}\right) = O\left(\frac{1}{n}\right)
$$
由此验证了一致逼近阶为 $O(1/n)$。

常见错误做法剖析：直接对二项概率公式 $\sum_{k=0}^n k^3 \binom{n}{k} x^k (1-x)^{n-k}$ 进行指标代换强行求和极易陷入繁琐代数泥潭并发生计算错误，采用下降阶乘矩转换是最严谨高效的标准工具；另一个易错点在于分析误差阶时仅验证了固定 $x$ 点的收敛阶，未对 $x \in [0, 1]$ 取上确界，遗漏了一致收敛性的严格论证。
## 14. 

设单次投掷均匀骰子的点数为随机变量 $X_i$（$i = 1, \dots, 240$），其独立同分布，分布律为 $\mathbb P(X_i = k) = 1/6$（$k \in \{1, 2, 3, 4, 5, 6\}$）。
计算单次点数的均值与方差：
$$
\mu = \mathbb E[X_i] = \frac{1+2+3+4+5+6}{6} = \frac{7}{2} = 3.5
$$
$$
\mathbb E[X_i^2] = \frac{1^2+2^2+3^2+4^2+5^2+6^2}{6} = \frac{91}{6}
$$
$$
\sigma^2 = \operatorname{Var}(X_i) = \frac{91}{6} - \left(\frac{7}{2}\right)^2 = \frac{35}{12} \approx 2.9167
$$
总点数 $S = \sum_{i=1}^{240} X_i$ 的总期望与总方差为
$$
\mu_S = n\mu = 240 \times 3.5 = 840
$$
$$
\sigma_S^2 = n\sigma^2 = 240 \times \frac{35}{12} = 700 \implies \sigma_S = \sqrt{700} = 10\sqrt 7 \approx 26.4575
$$

根据中心极限定理，离散整数和 $S$ 渐近服从正态分布 $\mathcal N(840, 700)$。
首先计算施加连续性校正的结果：
对于 $\mathbb P(S \ge 880)$，由于 $S$ 为整数，事件 $\{S \ge 880\}$ 对应连续化区间 $[879.5, \infty)$：
$$
\mathbb P(S \ge 880) \approx \mathbb P\left(Z \ge \frac{879.5 - 840}{\sqrt{700}}\right) = \mathbb P\left(Z \ge \frac{39.5}{26.4575}\right) \approx \mathbb P(Z \ge 1.493) = 1 - \Phi(1.493) \approx 0.0677
$$
对于 $\mathbb P(820 \le S \le 880)$，离散闭区间对应连续化区间 $[819.5, 880.5]$：
$$
\mathbb P(819.5 \le S \le 880.5) \approx \Phi\left(\frac{880.5 - 840}{\sqrt{700}}\right) - \Phi\left(\frac{819.5 - 840}{\sqrt{700}}\right)
$$
由于区间关于均值 $840$ 对称，标准化分位数为 $z = 40.5/26.4575 \approx 1.531$：
$$
\mathbb P(820 \le S \le 880) \approx 2\Phi(1.531) - 1 \approx 2 \times 0.9371 - 1 = 0.8742
$$

其次计算不作连续性校正的结果：
对于第一项，标准化值为 $z' = (880 - 840)/\sqrt{700} = 40/26.4575 \approx 1.512$：
$$
\mathbb P_{\text{uncorr}}(S \ge 880) \approx 1 - \Phi(1.512) \approx 1 - 0.9347 = 0.0653
$$
两者的相对偏差为
$$
\frac{0.0677 - 0.0653}{0.0677} \approx 3.55\%
$$
对于第二项，标准化边界为 $z' = 40/26.4575 \approx 1.512$：
$$
\mathbb P_{\text{uncorr}}(820 \le S \le 880) \approx 2\Phi(1.512) - 1 \approx 2 \times 0.9347 - 1 = 0.8694
$$
两者的相对偏差为
$$
\frac{0.8742 - 0.8694}{0.8742} \approx 0.55\%
$$

常见错误做法剖析：连续性校正中极易搞混加减 $0.5$ 的方向。在求单侧大于等于概率 $\mathbb P(S \ge k)$ 时，为了包含整数 $k$ 处的整根概率质量柱体，积分下限必须向左延伸至 $k - 0.5$；若错误地写成 $k + 0.5$，则将 $k$ 处的概率柱完全剔除，导致误差成倍放大。

## 15. 

泊松分布可看作独立同分布的泊松变量之和，具有独立增量可加性。对于 $N \sim \mathrm{Poisson}(\lambda)$，已知 $\lambda = 3600$。
其数学期望与方差分别为
$$
\mathbb E[N] = \lambda = 3600, \quad \operatorname{Var}(N) = \lambda = 3600 \implies \sigma_N = \sqrt{3600} = 60
$$
因为参数 $\lambda = 3600 \gg 20$，根据中心极限定理，变量 $N$ 极好地近似服从正态分布 $\mathcal N(3600, 60^2)$。

进行含连续性校正的正态近似计算：
对于上尾概率 $\mathbb P(N \ge 3700)$，连续性校正将离散边界扩展至 $3699.5$：
$$
\mathbb P(N \ge 3700) \approx \mathbb P\left(Z \ge \frac{3699.5 - 3600}{60}\right) = \mathbb P\left(Z \ge \frac{99.5}{60}\right) \approx \mathbb P(Z \ge 1.658)
$$
查标准正态分布函数表，$\Phi(1.658) \approx 0.9513$。故
$$
\mathbb P(N \ge 3700) \approx 1 - 0.9513 = 0.0487
$$
对于下尾概率 $\mathbb P(N \le 3500)$，连续性校正将离散边界向右扩展至 $3500.5$ 以涵盖 $N=3500$ 处的质量：
$$
\mathbb P(N \le 3500) \approx \mathbb P\left(Z \le \frac{3500.5 - 3600}{60}\right) = \mathbb P\left(Z \le -\frac{99.5}{60}\right) \approx \Phi(-1.658) = 1 - \Phi(1.658) \approx 0.0487
$$

若不作连续性校正：
两端的标准化分位数均为 $z_0 = 100/60 \approx 1.667$。此时
$$
\mathbb P_{\text{uncorr}}(N \ge 3700) = \mathbb P_{\text{uncorr}}(N \le 3500) \approx 1 - \Phi(1.667) \approx 1 - 0.9522 = 0.0478
$$

分析不作校正时误差的量级与符号：
连续性校正引入的分位数偏移量为 $\Delta z = 0.5/\sigma = 0.5/60 = 1/120 \approx 0.00833$。
由标准正态概率密度的一阶泰勒近似，未校正导致的绝对概率误差量级为
$$
|\Delta P| \approx \phi(z_0) \cdot \Delta z = \frac{1}{\sqrt{2\pi}} \exp\left(-\frac{1.667^2}{2}\right) \times \frac{1}{120} \approx 0.0989 \times 0.00833 \approx 8.24 \times 10^{-4}
$$
绝对误差量级在 $10^{-4}$ 到 $10^{-3}$ 之间。
关于误差符号：在未做校正时，积分区域从 $3700$（或 $3500$）处截断，这相当于丢失了端点处恰好半个柱体的积分面积。因此，未校正的近似值严格小于包含连续性校正的真实近似值。误差（未校正值减去校正值）的符号为负号，即不作校正会产生约 $1.85\%$ 的系统性低估。

常见错误做法剖析：在计算下尾 $\mathbb P(N \le 3500)$ 时，极易机械套用“减去 $0.5$”而写成 $3499.5$，从而使得积分区间人为缩窄。必须从柱状图面积的直观理解出发，明确闭区间两端都需要向外侧各扩充 $0.5$。
## 16. 

随机变量 $X_k \sim U(-k, k)$ 相互独立。由均匀分布的对称性，其数学期望为
$$
\mathbb E[X_k] = 0
$$
其方差为区间长度平方除以 $12$：
$$
\operatorname{Var}(X_k) = \frac{(k - (-k))^2}{12} = \frac{4k^2}{12} = \frac{k^2}{3}
$$
计算方差和 $s_n^2 = \sum_{k=1}^n \operatorname{Var}(X_k)$ 的显式表达式：
$$
s_n^2 = \sum_{k=1}^n \frac{k^2}{3} = \frac{1}{3} \cdot \frac{n(n+1)(2n+1)}{6} = \frac{n(n+1)(2n+1)}{18} = \frac{2n^3 + 3n^2 + n}{18}
$$
其最高次项渐近阶为
$$
s_n^2 \sim \frac{n^3}{9} \implies s_n = \sqrt{s_n^2} \sim \frac{n^{3/2}}{3}
$$
因此方差和的渐近阶为 $O(n^3)$。

下面验证在 $\delta = 1$ 时的 Lyapunov 条件。需要验证比值满足
$$
\lim_{n \to \infty} \frac{1}{s_n^3} \sum_{k=1}^n \mathbb E[|X_k|^3] = 0
$$
计算 $X_k$ 的三阶绝对矩：
$$
\mathbb E[|X_k|^3] = \int_{-k}^k |x|^3 \frac{1}{2k} dx = 2 \int_0^k \frac{x^3}{2k} dx = \frac{1}{k} \left[\frac{x^4}{4}\right]_0^k = \frac{k^3}{4}
$$
对其求和得到立方和公式：
$$
\sum_{k=1}^n \mathbb E[|X_k|^3] = \sum_{k=1}^n \frac{k^3}{4} = \frac{1}{4} \left(\frac{n(n+1)}{2}\right)^2 = \frac{n^2(n+1)^2}{16} \sim \frac{n^4}{16}
$$
将渐近项代入比值极限式：
$$
\frac{1}{s_n^3} \sum_{k=1}^n \mathbb E[|X_k|^3] \sim \frac{n^4/16}{(n^{3/2}/3)^3} = \frac{n^4/16}{n^{9/2}/27} = \frac{27}{16} n^{-1/2} = \frac{27}{16\sqrt n}
$$
当 $n \to \infty$ 时，$\lim_{n \to \infty} \frac{27}{16\sqrt n} = 0$。因此 Lyapunov 条件在 $\delta = 1$ 时严格成立。

根据 Lyapunov 中心极限定理，Lyapunov 条件蕴含 Lindeberg 条件。因此标准化和变量依分布收敛到标准正态分布：
$$
\frac{\sum_{k=1}^n X_k}{s_n} \xrightarrow{\ d\ } \mathcal N(0, 1)
$$

常见错误做法剖析：计算方差时容易遗漏均匀分布长度为 $2k$ 这一细节，误算为 $k^2/12$；在求 $s_n^3$ 的渐近阶时，容易将 $(n^{3/2})^3$ 误算为其他幂次；或者在三阶绝对矩积分时忘记被积函数为偶函数需乘以 $2$ 进行半轴积分，导致常数因子计算偏差。

## 17. 

已知随机变量 $X_k$ 相互独立，$\mathbb E X_k = 0$，方差满足 $\operatorname{Var}(X_k) = 4^k$。
计算总方差 $s_n^2$ 的显式等比数列和：
$$
s_n^2 = \sum_{k=1}^n \operatorname{Var}(X_k) = \sum_{k=1}^n 4^k = \frac{4(4^n - 1)}{4 - 1} = \frac{4}{3}(4^n - 1)
$$
Feller 一致渐近微弱性条件（UAN 条件，公式 14.22）表述为
$$
\lim_{n \to \infty} \max_{1 \le k \le n} \frac{\operatorname{Var}(X_k)}{s_n^2} = 0
$$
因为 $\operatorname{Var}(X_k) = 4^k$ 随 $k$ 严格单调指数增长，各项中的最大方差项必然由最后一项 $k = n$ 取得：
$$
\max_{1 \le k \le n} \frac{\operatorname{Var}(X_k)}{s_n^2} = \frac{\operatorname{Var}(X_n)}{s_n^2} = \frac{4^n}{\frac{4}{3}(4^n - 1)} = \frac{3}{4} \cdot \frac{4^n}{4^n - 1} = \frac{3}{4} \cdot \frac{1}{1 - 4^{-n}}
$$
取 $n \to \infty$ 的极限：
$$
\lim_{n \to \infty} \max_{1 \le k \le n} \frac{\operatorname{Var}(X_k)}{s_n^2} = \frac{3}{4} \ne 0
$$
该极限值为 $3/4$，非零，因此 Feller 条件不成立。

分析极限分布由末项主导且不可能是标准正态分布的原因：
将总和变量拆解为最后一项与前 $n-1$ 项之和：
$$
\frac{S_n}{s_n} = \frac{X_n}{s_n} + \frac{S_{n-1}}{s_n}
$$
由于各项独立，两部分的方差满足
$$
\operatorname{Var}\left(\frac{X_n}{s_n}\right) \to \frac{3}{4}, \quad \operatorname{Var}\left(\frac{S_{n-1}}{s_n}\right) = \frac{s_{n-1}^2}{s_n^2} = \frac{4^{n-1}-1}{4^n-1} \to \frac{1}{4}
$$
这表明末项 $X_n/s_n$ 独占了总和方差的整整 $75\%$，而此前所有项累加的总波动仅占 $25\%$。中心极限定理的核心机制在于“大量微小、独立的波动相互叠加抵消形成高斯钟形曲线”，其数学基石正是任何单项所占的方差比重必须趋于零（一致渐近微小性）。
若末项不服从正态分布（例如若 $X_k$ 为取值 $\pm 2^k$ 的两点分布），则 $X_n/s_n$ 的极限分布为取值 $\pm \sqrt{3}/2$ 的离散两点分布，即使加上微弱的前项扰动，极限分布依然具有多峰离散或奇异特征，绝不可能收敛到具有平滑密度的标准正态分布。即便各项本身服从正态分布，最终极限也是由单一主要正态项主导，违背了极限定理由和产生高斯性的统计意义。

常见错误做法剖析：最常见的错误是只检验了首项的极限 $\operatorname{Var}(X_1)/s_n^2 = 4/s_n^2 \to 0$，便草率判定微弱性成立，完全遗漏了公式中“对 $1 \le k \le n$ 取极大值”的关键要求；另一错误是未指出末项所占方差达 $75\%$ 的直观物理意义，缺乏对极限定理物理机制的深刻剖析。
## 18. 

**证明**

设随机变量序列 $\{Y_k\}$ 独立同分布，满足零均值 $\mathbb E Y_1 = 0$ 和有限正方差 $\mathbb E Y_1^2 = \sigma^2 \in (0, \infty)$。
根据同分布和独立性，前 $n$ 项和的方差为
$$
s_n^2 = \sum_{k=1}^n \operatorname{Var}(Y_k) = \sum_{k=1}^n \sigma^2 = n\sigma^2 \implies s_n = \sigma\sqrt n
$$
考虑 Lindeberg 条件（公式 14.21）：对任意给定的常数 $\varepsilon > 0$，验证截断期望和满足
$$
L_n(\varepsilon) = \frac{1}{s_n^2} \sum_{k=1}^n \mathbb E\left[Y_k^2 \cdot \mathbf 1_{\{|Y_k| > \varepsilon s_n\}}\right] \to 0 \quad (n \to \infty)
$$
由于随机变量 $\{Y_k\}$ 独立同分布，求和式中的每一项被积结构完全全同，均等于 $Y_1$ 的相应截断期望。因此求和式可直接合并化简为
$$
L_n(\varepsilon) = \frac{1}{n\sigma^2} \sum_{k=1}^n \mathbb E\left[Y_1^2 \cdot \mathbf 1_{\{|Y_1| > \varepsilon \sigma\sqrt n\}}\right] = \frac{1}{\sigma^2} \mathbb E\left[Y_1^2 \cdot \mathbf 1_{\{|Y_1| > \varepsilon \sigma\sqrt n\}}\right]
$$
考察被积随机变量序列 $Z_n = Y_1^2 \cdot \mathbf 1_{\{|Y_1| > \varepsilon \sigma\sqrt n\}}$ 的逐点性质：
对几乎所有样本点 $\omega$，由于随机变量取值 $Y_1(\omega)$ 为有限实数，当 $n \to \infty$ 时，门限 $\varepsilon \sigma \sqrt n \to \infty$。因此必然存在正整数 $N(\omega)$，使得当 $n \ge N(\omega)$ 时，恒有 $|Y_1(\omega)| \le \varepsilon \sigma \sqrt n$。
这表明指示函数逐点几乎必然收敛到零，即 $\lim_{n \to \infty} Z_n = 0$ 几乎必然。
此外，对所有正整数 $n$，被积函数受一致可积变量控制：
$$
0 \le Z_n \le Y_1^2
$$
上式对每个 $n$ 均成立。
并且已知主导变量具有有限数学期望 $\mathbb E[Y_1^2] = \sigma^2 < \infty$。
根据勒贝格控制收敛定理（DCT），极限与数学期望算子可以严格对易交换：
$$
\lim_{n \to \infty} \mathbb E\left[Y_1^2 \cdot \mathbf 1_{\{|Y_1| > \varepsilon \sigma\sqrt n\}}\right] = \mathbb E\left[\lim_{n \to \infty} Y_1^2 \cdot \mathbf 1_{\{|Y_1| > \varepsilon \sigma\sqrt n\}}\right] = \mathbb E[0] = 0
$$
由于常数因子 $1/\sigma^2$ 有限，立即得到对任意 $\varepsilon > 0$，$\lim_{n \to \infty} L_n(\varepsilon) = 0$。至此严格证得 Lindeberg 条件成立。

由 Lindeberg–Feller 中心极限定理（定理 14.13），标准化和变量收敛到标准正态分布：
$$
\frac{\sum_{k=1}^n Y_k}{s_n} = \frac{\sum_{k=1}^n Y_k}{\sigma\sqrt n} \xrightarrow{\ d\ } \mathcal N(0, 1)
$$
这便完全重现了独立同分布下的经典 Lindeberg–Lévy 中心极限定理（定理 14.12）。

□

常见错误做法剖析：常见缺陷是在说明期望趋于零时，仅以“积分区域缩成空集”作定性描述，未明确指明控制函数为 $Y_1^2 \in L^1$ 并援引勒贝格控制收敛定理；另一易错点是混淆了 $s_n$ 与固定界限，误将 $Y_1^2 \mathbf 1_{\{|Y_1| > \varepsilon\}}$ 当作通项，遗漏了截断界随着 $\sqrt n$ 动态外移的核心机制。

## 19. 

设 $X \sim \mathrm{Bernoulli}(p)$，记 $q = 1 - p$。
其数学期望为 $\mathbb E X = p$，方差为 $\sigma^2 = \operatorname{Var}(X) = pq \implies \sigma = \sqrt{pq}$。
中心化绝对差 $|X - p|$ 的分布为：以概率 $p$ 取值 $|1 - p| = q$，以概率 $q$ 取值 $|0 - p| = p$。
三阶中心绝对矩 $\rho = \mathbb E[|X - p|^3]$ 计算如下：
$$
\rho = q^3 \cdot p + p^3 \cdot q = pq(p^2 + q^2)
$$
由此给出 Berry–Esseen 比的显式表达式：
$$
\frac{\rho}{\sigma^3} = \frac{pq(p^2 + q^2)}{(pq)^{3/2}} = \frac{p^2 + q^2}{\sqrt{pq}}
$$
代入具体参数计算数值：
第一种情形（$p = 0.5$）：$q = 0.5$，$pq = 0.25$，$\sqrt{pq} = 0.5$。
$$
\frac{\rho}{\sigma^3} = \frac{0.5^2 + 0.5^2}{0.5} = \frac{0.5}{0.5} = 1
$$
第二种情形（$p = 0.05$）：$q = 0.95$，$pq = 0.0475$，$\sqrt{pq} \approx 0.217945$。
$$
p^2 + q^2 = 0.05^2 + 0.95^2 = 0.0025 + 0.9025 = 0.905 \implies \frac{\rho}{\sigma^3} = \frac{0.905}{0.217945} \approx 4.1524
$$
第三种情形（$p = 0.01$）：$q = 0.99$，$pq = 0.0099$，$\sqrt{pq} \approx 0.0994987$。
$$
p^2 + q^2 = 0.01^2 + 0.99^2 = 0.0001 + 0.9801 = 0.9802 \implies \frac{\rho}{\sigma^3} = \frac{0.9802}{0.0994987} \approx 9.8514
$$

取常数 $C = 0.4748$，样本量 $n = 200$，此时 $\sqrt n = \sqrt{200} = 10\sqrt 2 \approx 14.1421$。
定理 14.14 给出的分布函数均匀绝对误差上界公式为
$$
\Delta_n \le \frac{C}{\sqrt n} \cdot \frac{\rho}{\sigma^3} = \frac{0.4748}{14.1421} \cdot \frac{\rho}{\sigma^3} \approx 0.03357 \cdot \frac{\rho}{\sigma^3}
$$
代入计算三种情形下的误差上界：
当 $p = 0.5$ 时：误差上界为 $\Delta_n \le 0.03357 \times 1 \approx 0.0336$（约 $3.36\%$）；
当 $p = 0.05$ 时：误差上界为 $\Delta_n \le 0.03357 \times 4.1524 \approx 0.1394$（约 $13.94\%$）；
当 $p = 0.01$ 时：误差上界为 $\Delta_n \le 0.03357 \times 9.8514 \approx 0.3308$（约 $33.08\%$）。

解释稀有事件需要更大样本量的理论原因：
当 $p \to 0$ 时，分布呈现出极度的单侧不对称性，偏度满足 $\gamma_1 = (q - p)/\sqrt{pq} \sim 1/\sqrt p \to \infty$。Berry–Esseen 比 $\rho/\sigma^3 \approx 1/\sqrt p$ 随着罕见程度的提高而剧烈发散。
要使正态近似误差控制在预设容差 $\delta$ 之内，所需样本量由条件 $C/(\sqrt{np}) \le \delta$ 决定，即实质有效样本量取决于期望成功频数 $np$。在 $n = 200, p = 0.01$ 时，总体预期成功次数仅有 $np = 2$，整个概率绝大多数聚集在 $0, 1, 2$ 等极少数非负整数点上，分布形态呈现显著的泊松离散峰值而非对称的高斯钟形。因此，稀有事件下正态近似收敛极其缓慢，为了消除偏度影响并使正态近似有效，必须使样本量满足 $n \propto 1/p$ 甚至 $n \propto 1/p^2$。

常见错误做法剖析：计算三阶中心矩时误把绝对值丢弃写成 $(X-p)^3$，得出无绝对值的带符号偏度矩 $pq(q-p)$；另外在分析误差上界时遗漏了分母的 $\sqrt n$ 项导致误差结果大于 $1$；理论分析时未将 $np$ 较小所导致的强离散性与偏度作为本质原因加以阐发。
## 20. 

**证明**

对于问题（a）：
设随机变量序列 $X_1, \dots, X_n$ 独立同分布于标准柯西分布，其特征函数为 $\varphi_{X_1}(t) = e^{-|t|}$。
考察样本均值 $\bar X_n = \frac{1}{n} \sum_{k=1}^n X_k$ 的特征函数：
由独立同分布变量和的特征函数性质，
$$
\varphi_{\bar X_n}(t) = \mathbb E\left[\exp\left(it \cdot \frac{1}{n} \sum_{k=1}^n X_k\right)\right] = \prod_{k=1}^n \varphi_{X_k}\left(\frac{t}{n}\right) = \left[\exp\left(-\left|\frac{t}{n}\right|\right)\right]^n
$$
展开指数幂次可得
$$
\varphi_{\bar X_n}(t) = \exp\left(-n \cdot \frac{|t|}{n}\right) = e^{-|t|}
$$
对任意正整数 $n$ 和任意实数 $t \in \mathbb R$，均有 $\varphi_{\bar X_n}(t) = \varphi_{X_1}(t)$。由特征函数的唯一性定理，$\bar X_n$ 的分布律与单项 $X_1$ 完全全同，即 $\bar X_n$ 仍然严格服从标准柯西分布。
弱大数定律成立要求样本均值依概率收敛于某个确定性常数 $c$，进而要求 $\bar X_n \xrightarrow{\ d\ } c$（其退化极限的特征函数为 $e^{ict}$，模长恒为 $1$）。然而对任意 $n$，$\bar X_n$ 的分布完全静止为非退化的标准柯西分布，尺度参数始终保持为 $1$，在任何有限区间之外都有不可忽视的重尾概率质量，根本无法向任何常数点坍缩。因此弱大数定律不成立。

对于问题（b）：
考虑标准化变量 $W_n = \sqrt n \bar X_n = \frac{1}{\sqrt n} \sum_{k=1}^n X_k$。
利用尺度性质计算其特征函数：
$$
\varphi_{W_n}(t) = \varphi_{\bar X_n}(\sqrt n t) = \exp(-|\sqrt n t|) = \exp(-\sqrt n |t|)
$$
对实数 $t$ 逐点求 $n \to \infty$ 的极限：
当 $t = 0$ 时，$\varphi_{W_n}(0) = \exp(0) = 1$；
当 $t \ne 0$ 时，$\lim_{n \to \infty} \sqrt n |t| = \infty$，从而 $\lim_{n \to \infty} \exp(-\sqrt n |t|) = 0$。
因此特征函数的逐点极限函数为
$$
g(t) = \begin{cases} 1, & t = 0 \\ 0, & t \ne 0 \end{cases}
$$
根据 Lévy 连续性定理（定理 14.7），序列 $\{W_n\}$ 依分布收敛的充要条件是极限函数 $g(t)$ 在原点 $t = 0$ 处连续。
直接观察可知，$\lim_{t \to 0} g(t) = 0 \ne g(0) = 1$，$g(t)$ 在 $t = 0$ 处存在非零跳跃间断。因此序列 $\{\sqrt n \bar X_n\}$ 不依分布收敛。

对于问题（c）：
寻找常数 $c_n$ 使得 $S_n / c_n$ 与 $X_1$ 同分布。
计算 $S_n / c_n$ 的特征函数：
$$
\varphi_{S_n / c_n}(t) = \left[\varphi_{X_1}\left(\frac{t}{c_n}\right)\right]^n = \left[\exp\left(-\left|\frac{t}{c_n}\right|\right)\right]^n = \exp\left(-\frac{n}{c_n}|t|\right)
$$
要使该特征函数恒等于标准柯西特征函数 $e^{-|t|}$，只需指数系数满足
$$
\frac{n}{c_n} = 1 \implies c_n = n
$$
因此所求规范化常数为 $c_n = n$。

□

常见错误做法剖析：在判定弱大数律时，有些读者根据柯西主值误以为总体均值 $\mathbb E X_1 = 0$，并错误断言辛钦大数定律成立；实际上柯西分布在实轴上的勒贝格绝对积分发散，一阶矩根本不存在，大数定律的前提条件不满足。在问题（b）中，另一典型错误是误以为特征函数逐点收敛到狄拉克测度的傅里叶变换，遗漏了特征函数在原点连续是测度紧性的必要保障，间断极限意味着概率质量完全逃逸至无穷远（紧性丢失）。
## 21. 

考虑积分 $I = \int_0^1 e^{-x^2} dx$ 的蒙特卡洛估计。
误差函数的标准定义为 $\operatorname{erf}(z) = \frac{2}{\sqrt \pi} \int_0^z e^{-t^2} dt$。
令被积变换变量为 $Y_i = e^{-U_i^2}$，其中 $U_i \sim U(0, 1)$。估计量为样本均值 $\hat I_N = \frac{1}{N} \sum_{i=1}^N Y_i$。

对于问题（a）：
计算单项数学期望：
$$
\mathbb E[Y_1] = \int_0^1 e^{-u^2} \cdot 1 \, du = \frac{\sqrt \pi}{2} \operatorname{erf}(1) \approx 0.746824
$$
由期望的线性性，估计量为无偏估计：
$$
\mathbb E[\hat I_N] = \frac{1}{N} \sum_{i=1}^N \mathbb E[Y_i] = \mathbb E[Y_1] = \frac{\sqrt \pi}{2} \operatorname{erf}(1)
$$
计算二阶原点矩，作变量替换 $v = u\sqrt 2$（$du = dv/\sqrt 2$）：
$$
\mathbb E[Y_1^2] = \int_0^1 \left(e^{-u^2}\right)^2 du = \int_0^1 e^{-2u^2} du = \frac{1}{\sqrt 2} \int_0^{\sqrt 2} e^{-v^2} dv = \frac{\sqrt{2\pi}}{4} \operatorname{erf}(\sqrt 2) \approx 0.597700
$$
单项方差为
$$
\sigma_Y^2 = \operatorname{Var}(Y_1) = \mathbb E[Y_1^2] - (\mathbb E Y_1)^2 = \frac{\sqrt{2\pi}}{4} \operatorname{erf}(\sqrt 2) - \frac{\pi}{4} \left[\operatorname{erf}(1)\right]^2 \approx 0.597700 - 0.557746 \approx 0.039954
$$
因此样本均值的估计方差为
$$
\operatorname{Var}(\hat I_N) = \frac{\sigma_Y^2}{N} = \frac{1}{N} \left(\frac{\sqrt{2\pi}}{4} \operatorname{erf}(\sqrt 2) - \frac{\pi}{4} \left[\operatorname{erf}(1)\right]^2\right) \approx \frac{0.03995}{N}
$$

对于问题（b）：
由中心极限定理，$95\%$ 置信水平对应的标准正态双侧临界分位数为 $z_{0.975} \approx 1.96$。
置信区间半宽约束为
$$
z_{0.975} \cdot \frac{\sigma_Y}{\sqrt N} \le 10^{-3}
$$
代入 $\sigma_Y = \sqrt{0.039954} \approx 0.199885$：
$$
1.96 \times \frac{0.199885}{\sqrt N} \le 10^{-3} \implies \sqrt N \ge 1960 \times 0.199885 \approx 391.77
$$
两端平方：
$$
N \ge (391.77)^2 \approx 153488
$$
因此至少需要抽取 $153488$ 个样本（约 $1.53 \times 10^5$ 次模拟）。

对于问题（c）：
采用对偶变量法（Antithetic Variates）时，单次模拟构造成对负相关的样本，若方差降为原来的一半，即新方差满足 $\sigma_{\text{anti}}^2 = \sigma_Y^2 / 2$。
置信区间半宽正比于 $\sqrt{\operatorname{Var}(\hat I_N)} = \sigma/\sqrt N$。在保持预设误差容限 $10^{-3}$ 不变的前提下，所需模拟次数直接减半：
$$
N_{\text{anti}} = \left\lceil \frac{N}{2} \right\rceil \approx 76744
$$
即样本量缩减至约 $7.67 \times 10^4$。

对于问题（d）：
1. 估计量的一致性收敛：辛钦弱大数定律保证了 $\hat I_N \xrightarrow{\ \mathbb P\ } I$ 依概率收敛；柯尔莫哥洛夫强大数定律进一步保证了 $\hat I_N \to I$ 几乎必然成立。
2. 估计误差的分布形态与置信区间构造：由林德伯格–列维中心极限定理保证，给出了标准化估计误差的渐近正态性 $\sqrt N(\hat I_N - I) \xrightarrow{\ d\ } \mathcal N(0, \sigma_Y^2)$。

常见错误做法剖析：在计算二阶矩 $\int_0^1 e^{-2u^2}du$ 时，极易遗漏换元后微分项产生的系数 $1/\sqrt 2$；在估计样本量时，常有读者误用单侧显著性水平的临界值 $1.645$；对于理论依据，容易笼统泛称“由极限定理保证”，未能严格区分“大数定律保证相合性”与“中心极限定理提供区间构建”。

## 22. 

设单日策略收益率 $R_1, R_2, \dots$ 独立同分布，日均收益率 $\mu = \mathbb E R_1 = 0.03\% = 0.0003$，日收益率波动率 $\sigma = 1.2\% = 0.012$。

对于问题（a）：
日夏普比率（Daily Sharpe Ratio，假设无风险利率为 $0$）为
$$
SR_{\text{daily}} = \frac{\mu}{\sigma} = \frac{0.0003}{0.012} = 0.025
$$
一年以 $252$ 个交易日计，年化夏普比率按时间平方根法则折算：
$$
SR_{\text{annual}} = \sqrt{252} \cdot SR_{\text{daily}} = \sqrt{252} \times 0.025 \approx 15.8745 \times 0.025 \approx 0.3969
$$

对于问题（b）：
根据样本夏普比率的渐近正态分布理论（Lo 渐近公式），对于独立同分布收益率序列，当总体服从正态或对称分布时，样本夏普比率估计量 $\widehat{SR}$ 满足
$$
\sqrt n(\widehat{SR}_{\text{daily}} - SR_{\text{daily}}) \xrightarrow{\ d\ } \mathcal N\left(0, 1 + \frac{1}{2} SR_{\text{daily}}^2\right)
$$
因为 $SR_{\text{daily}} = 0.025$，其平方极小（$0.025^2 = 0.000625$），渐近方差几乎严格等于 $1$。
对于年化夏普比率估计量 $\widehat{SR}_{\text{annual}} = \sqrt{252} \widehat{SR}_{\text{daily}}$，其渐近分布为
$$
\sqrt n(\widehat{SR}_{\text{annual}} - SR_{\text{annual}}) \xrightarrow{\ d\ } \mathcal N\left(0, 252\left(1 + \frac{1}{2} SR_{\text{daily}}^2\right)\right)
$$
年化渐近标准差为 $\sigma_{\text{annual}} = \sqrt{252 \times (1 + 0.0003125)} \approx 15.877$。
要求 $95\%$ 置信区间半宽不超过 $0.5$：
$$
1.96 \times \frac{\sigma_{\text{annual}}}{\sqrt n} \le 0.5 \implies \sqrt n \ge \frac{1.96 \times 15.877}{0.5} \approx 62.238
$$
计算所需样本量：
$$
n \ge (62.238)^2 \approx 3873.5
$$
因此至少需要 $3874$ 个交易日（折合 $3874/252 \approx 15.37$ 个交易年）。

对于问题（c）：
若日收益率服从特征指数 $\alpha = 1.6$ 的对称稳定分布（Symmetric $\alpha$-Stable Distribution）：
1. 步骤失效点：由于稳定分布的尾部呈帕累托幂律衰减 $\mathbb P(|R_1| > x) \sim c x^{-\alpha}$，其有限阶矩仅存在于 $p < \alpha$ 范围内。因为 $\alpha = 1.6 \in (1, 2)$，虽然一阶矩 $\mu = \mathbb E R_1$ 存在，但二阶矩 $\mathbb E R_1^2 = \infty$，总体方差完全发散。由于二阶矩发散，建立在有限方差假设之上的经典林德伯格–列维中心极限定理和针对样本方差的 Delta 方法在根基上全部崩溃失效。
2. 正确的规范化指数：由广义中心极限定理（GCLT），该稳定分布吸引域内的和序列 $S_n - n\mu$ 必须除以 $n^{1/\alpha} = n^{1/1.6} = n^{5/8} = n^{0.625}$，而非经典扩散阶数 $\sqrt n = n^{0.5}$。因此正确的规范化指数为 $1/\alpha = 5/8 = 0.625$。
3. 夏普比率总体无定义：夏普比率的定义式为超额均值除以总体标准差。在 $\alpha = 1.6$ 下，分母总体标准差发散至正无穷大，使得总体夏普比率恒等于零或无定义。在经验样本中，样本标准差 $s_n$ 将随着样本量增长以 $n^{1/\alpha - 1/2} = n^{0.125}$ 的阶数无界发散，导致经验夏普比率剧烈振荡并趋于零，完全失去了量化业绩评价的统计基础。

常见错误做法剖析：计算年化夏普比率置信区间时，极容易误将样本量 $n$ 当作年数，或者忘记乘上因子 $\sqrt{252}$，导致低估所需样本量达两个数量级；在稳定分布的讨论中，容易将“二阶矩发散”与“一阶矩发散”混为一谈，必须明确指出当 $\alpha \in (1, 2)$ 时均值有限而方差发散的微妙区别。