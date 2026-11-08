# 第28章习题参考答案与解析

## 1. 

严格平稳与弱平稳（宽平稳、二阶平稳）是时间序列分析中两个内涵不同但在高斯假定下重合的核心概念。

第一种情形：严格平稳但非弱平稳。
考虑独立同分布（IID）柯西分布序列 $(X_t)_{t \in \mathbb Z}$，其单点概率密度函数为
$$f(x) = \frac{1}{\pi (1 + x^2)}$$
由于序列是独立同分布的，对任意时点集合 $\{t_1, \dots, t_n\}$ 和任意时间平移步长 $h \in \mathbb Z$，联合分布函数满足
$$\mathbb P(X_{t_1+h} \le x_1, \dots, X_{t_n+h} \le x_n) = \prod_{i=1}^n \mathbb P(X_{t_i+h} \le x_i) = \prod_{i=1}^n \mathbb P(X_{t_i} \le x_i)$$
因此该序列严格满足严格平稳的定义。然而，标准柯西分布的一阶绝对矩为
$$\mathbb E[|X_t|] = \int_{-\infty}^\infty \frac{|x|}{\pi (1 + x^2)} \, \mathrm{d}x = \infty$$
其一阶矩与二阶矩均不存在，自协方差函数 $\operatorname{Cov}(X_t, X_{t+h})$ 失去数学定义。该过程缺少弱平稳性所要求的有限二阶矩条件（即 $\mathbb E[X_t^2] < \infty$）。

第二种情形：弱平稳但非严格平稳。
构造独立随机变量序列 $(X_t)_{t \in \mathbb Z}$，其边缘分布随时间指标的奇偶性而变动：当 $t$ 为奇数时，$X_t \sim \mathcal N(0, 1)$；当 $t$ 为偶数时，$X_t$ 服从对称两点分布，即 $\mathbb P(X_t = 1) = \mathbb P(X_t = -1) = 1/2$。
验证矩条件：对任意 $t$，均有 $\mathbb E[X_t] = 0$ 且 $\operatorname{Var}(X_t) = 1$。由于各时点相互独立，当 $h \neq 0$ 时，$\operatorname{Cov}(X_t, X_{t+h}) = 0$；当 $h = 0$ 时，$\operatorname{Cov}(X_t, X_t) = 1$。因此，均值恒定且自协方差函数仅与时间间隔 $h$ 有关，该过程为弱平稳过程。但是，当 $t$ 为奇数时 $X_t$ 为连续型随机变量，而 $t$ 为偶数时 $X_t$ 为离散型随机变量，其一维边缘分布不随时间平移保持不变，因而不是严格平稳过程。该过程缺少有限维联合分布随时间平移不变的条件。

常见错误做法剖析：
初学者容易误认为“严格平稳必然蕴含弱平稳”，未注意到严格平稳对矩的存在性未作任何限制，二阶矩不存在时弱平稳根本无从谈起；或者误以为弱平稳加上各时点相互独立就能推导严格平稳，忽视了独立并不能保证各时点的边缘分布相同。

## 2. 

首先构造不相关但不独立的随机变量对 $(X, Y)$。
设随机变量 $X$ 服从连续型标准正态分布 $X \sim \mathcal N(0, 1)$。独立于 $X$ 引入对称随机正负号变量 $S$，满足 $\mathbb P(S = 1) = \mathbb P(S = -1) = 1/2$。令
$$Y = S X$$
计算 $Y$ 的均值与协方差：由 $S$ 与 $X$ 独立，有
$$\mathbb E[Y] = \mathbb E[S] \mathbb E[X] = 0 \times 0 = 0$$
$$\operatorname{Cov}(X, Y) = \mathbb E[X Y] - \mathbb E[X] \mathbb E[Y] = \mathbb E[S X^2] = \mathbb E[S] \mathbb E[X^2] = 0 \times 1 = 0$$
因此 $X$ 与 $Y$ 的协方差为零，二者线性不相关。
然而，$|Y| = |S| |X| = |X|$，即 $Y$ 的绝对值完全由 $X$ 决定。例如考察事件概率：
$$\mathbb P(|X| \le 1, |Y| > 1) = 0$$
但分别计算边缘概率时，$\mathbb P(|X| \le 1) > 0$ 且 $\mathbb P(|Y| > 1) = \mathbb P(|X| > 1) > 0$。联合概率不等于边缘概率乘积，故 $X$ 与 $Y$ 显著不独立。另一种离散构造是对称取值点对，如令 $X \in \{-1, 0, 1\}$ 等概率，并令 $Y = X^2 - 2/3$。

关于不能自动将“白噪声”替换为“IID 白噪声”的原因说明：
在二阶矩理论与 ARMA 建模中，白噪声序列 $(\varepsilon_t)$ 的标准数学定义仅要求零均值、同方差以及跨期不相关，即
$$\mathbb E[\varepsilon_t] = 0, \quad \operatorname{Var}(\varepsilon_t) = \sigma^2 < \infty, \quad \operatorname{Cov}(\varepsilon_t, \varepsilon_s) = 0 \quad (t \neq s)$$
它本质上是希尔伯特空间 $L^2$ 中的正交系概念，未假定高阶矩结构或独立性。
在金融时间序列与计量经济学中，资产收益率常具有“无自相关性但存在强波动率聚集”的特征（例如 ARCH/GARCH 过程）。这类过程的扰动项满足弱白噪声条件（自相关系数为零），但其平方序列 $\varepsilon_t^2$ 具有显著的跨期自相关性，说明扰动项之间存在高阶依赖性，并非独立同分布。若强制替换为 IID 白噪声，将引发若干严重后果：
第一，在线性投影理论下，弱白噪声能保证最优线性预测，但若假设 IID，研究者会误将条件均值预测与最优非线性条件期望混为一谈；
第二，许多统计推断（如中心极限定理、参数估计量渐近协方差矩阵的形式、似然函数的分解）在 IID 条件下极为简化，若实际数据仅为弱白噪声，强行采用 IID 标准误将严重低估真实参数估计方差，造成推断失效；
第三，金融风险度量（如 VaR、CVaR）高度依赖条件波动率，忽视非独立性将彻底抹杀风险的时间聚集特征。

常见错误做法剖析：
常见误区是套用正态分布的经验直觉，认为“协方差为零等价于独立”。在非联合正态环境下，不相关仅代表缺乏线性依从关系，高阶矩完全可以高度绑定。

## 3. 

对给定的随机过程 $X_t = Z$（对所有 $t \in \mathbb Z$ 成立），其中 $\mathbb P(Z = 1) = \mathbb P(Z = -1) = 1/2$。

**证明**
首先验证其弱平稳性。
第一，考察一阶矩：
$$\mathbb E[X_t] = \mathbb E[Z] = 1 \times \frac{1}{2} + (-1) \times \frac{1}{2} = 0$$
均值为与时间 $t$ 无关的常数。
第二，考察二阶矩与方差：
$$\mathbb E[X_t^2] = \mathbb E[Z^2] = 1^2 \times \frac{1}{2} + (-1)^2 \times \frac{1}{2} = 1 < \infty$$
故 $\operatorname{Var}(X_t) = 1$。
第三，考察自协方差函数：对任意时点 $t$ 与滞后阶数 $h \in \mathbb Z$，
$$\operatorname{Cov}(X_t, X_{t+h}) = \operatorname{Cov}(Z, Z) = \operatorname{Var}(Z) = 1$$
自协方差取值仅取决于滞后阶数（且对任意 $h$ 均为常数 1），不依赖具体基准时间 $t$。
综上三条，过程 $(X_t)_{t \in \mathbb Z}$ 满足弱平稳性的全部定义条件。

□

计算有限样本均值：
对任意样本容量 $n \ge 1$，样本均值为
$$\bar X_n = \frac{1}{n} \sum_{t=1}^n X_t = \frac{1}{n} \sum_{t=1}^n Z = \frac{1}{n} (n Z) = Z$$
即对任意样本长度 $n$，$\bar X_n$ 恒等于随机变量 $Z$。

关于能否从单条轨道估计 $\mathbb E[X_t]$ 的说明：
答案是否定的，无法仅从一条轨道一致地估计总体均值 $\mathbb E[X_t]$。
在时间序列分析中，从单一实现轨道（单条轨道）出发进行参数估计，必须依赖过程的遍历性（Ergodicity）。根据弱平稳过程的均值遍历定理，样本均值在均方意义下收敛到总体均值的充要条件是自协方差函数的时间平均趋于零，即
$$\lim_{n \to \infty} \frac{1}{n} \sum_{h=0}^{n-1} \gamma(h) = 0$$
但在本题中，自协方差 $\gamma(h) = 1$ 对所有 $h$ 恒成立，自相关性完全不随距离衰减，极限为 1 而非 0，该过程不具备均值遍历性。
从直观轨道表现来看，现实中我们只能观测到一条具体的轨道样本路径：一旦初始状态决定，$Z$ 的实现值只能是 $+1$ 或 $-1$。若观测到的轨道是 $Z = 1$，则所有样本观测值均为 1，沿时间轴求平均得到的 $\bar X_n \equiv 1$；若观测到的轨道是 $Z = -1$，则 $\bar X_n \equiv -1$。无论样本量 $n$ 增至多大，时间维度的平均值永远只能反映该单条轨道的特异性取值，永远无法收敛到系综平均（Ensemble Average）$\mathbb E[X_t] = 0$。

常见错误做法剖析：
常见错误是在计算 $\bar X_n$ 时盲目应用独立同分布情形下的大数定律，得出错误结论。此错误的根源在于混淆了“跨时间样本观测”与“独立重复试验”，忽视了同一轨道内部各时点之间的相关系数高达 1，有效样本容量并未随时间 $n$ 增加而增长。

## 4. 

对于一阶移动平均模型 MA(1)：
$$X_t = \varepsilon_t + \theta \varepsilon_{t-1}$$
其中参数 $\theta = 0.4$，白噪声方差为 $\sigma^2 = \operatorname{Var}(\varepsilon_t) = 2.5$，且对任意 $s \neq t$ 均有 $\operatorname{Cov}(\varepsilon_t, \varepsilon_s) = 0$。

计算自协方差函数与自相关系数：
第一，计算方差 $\gamma_0$：
$$\gamma_0 = \operatorname{Var}(X_t) = \operatorname{Var}(\varepsilon_t + 0.4\varepsilon_{t-1}) = \operatorname{Var}(\varepsilon_t) + 0.4^2 \operatorname{Var}(\varepsilon_{t-1}) = (1 + 0.16) \times 2.5 = 1.16 \times 2.5 = 2.9$$

第二，计算滞后一阶自协方差 $\gamma_1$：
$$\gamma_1 = \operatorname{Cov}(X_t, X_{t-1}) = \operatorname{Cov}(\varepsilon_t + 0.4\varepsilon_{t-1}, \, \varepsilon_{t-1} + 0.4\varepsilon_{t-2})$$
展开协方差双线性项，由于不同时点的白噪声正交，仅有公共项 $\varepsilon_{t-1}$ 的协方差非零：
$$\gamma_1 = 0.4 \operatorname{Var}(\varepsilon_{t-1}) = 0.4 \times 2.5 = 1.0$$

第三，计算滞后一阶自相关系数 $\rho_1$：
$$\rho_1 = \frac{\gamma_1}{\gamma_0} = \frac{1.0}{2.9} = \frac{10}{29} \approx 0.3448$$

第四，计算滞后二阶自协方差 $\gamma_2$ 与自相关系数 $\rho_2$：
$$\gamma_2 = \operatorname{Cov}(X_t, X_{t-2}) = \operatorname{Cov}(\varepsilon_t + 0.4\varepsilon_{t-1}, \, \varepsilon_{t-2} + 0.4\varepsilon_{t-3}) = 0$$
两表达式中的白噪声变量下标完全无重叠，协方差恒为零。因此
$$\rho_2 = \frac{\gamma_2}{\gamma_0} = 0$$
事实上，对所有滞后阶数 $|k| \ge 2$，均有 $\gamma_k = 0$ 及 $\rho_k = 0$。

常见错误做法剖析：
常见计算失误是在算 $\gamma_0$ 时误将方差系数写成 $(1 + \theta)^2 \sigma^2$（混淆了随机变量线性组合的方差与确定性代数平方），或者误认为 MA(1) 的自相关系数像 AR(1) 那样按几何级数缓慢衰减，从而错误地计算出非零的 $\rho_2$。牢记 MA(q) 过程自协方差在 $q$ 阶之后截尾是识别移动平均阶数的核心特征。

## 5. 

偏自相关函数（PACF）在滞后 2 阶处的取值 $\alpha_2$ 定义为在控制中间变量 $X_{t-1}$ 的线性影响后，$X_t$ 对 $X_{t-2}$ 的偏回归系数。

根据两阶 Yule–Walker 方程组或 Durbin–Levinson 递推公式：
$$\begin{pmatrix} 1 & \rho_1 \\ \rho_1 & 1 \end{pmatrix} \begin{pmatrix} \phi_{21} \\ \phi_{22} \end{pmatrix} = \begin{pmatrix} \rho_1 \\ \rho_2 \end{pmatrix}$$
其中 $\alpha_2 = \phi_{22}$。根据克莱姆法则（Cramer's rule），直接求解得：
$$\alpha_2 = \frac{\rho_2 - \rho_1^2}{1 - \rho_1^2}$$
将题给数值 $\rho_1 = 0.5$、$\rho_2 = 0.4$ 代入公式计算：
$$\alpha_2 = \frac{0.4 - 0.5^2}{1 - 0.5^2} = \frac{0.4 - 0.25}{1 - 0.25} = \frac{0.15}{0.75} = \frac{1}{5} = 0.2$$

关于能否仅由这两个数断定真实模型为 AR(2) 的分析：
结论是不能仅凭这两个数值断定真实模型为 AR(2)。
理由如下：
第一，模型阶数识别需要考察高阶衰减或截尾行为。理论上，平稳序列为 AR(2) 模型的充要条件是偏自相关函数在 2 阶之后截尾，即必须同时满足 $\alpha_2 \neq 0$ 且对所有 $k \ge 3$ 恒有 $\alpha_k = 0$。题目仅给出了 $\rho_1$ 与 $\rho_2$，由此只能计算出 $\alpha_1 = \rho_1 = 0.5$ 与 $\alpha_2 = 0.2$，完全无法获知更高阶偏自相关系数 $\alpha_3, \alpha_4, \dots$ 是否为零。
第二，参数代数匹配的非唯一性。任意一个弱平稳过程（例如高阶自回归模型 AR(p)、移动平均模型 MA(q) 或自回归滑动平均模型 ARMA(p, q)），只要通过合理选取其参数组合，均能够使其前两阶自相关系数恰好满足 $\rho_1 = 0.5$ 与 $\rho_2 = 0.4$。例如，一个适当参数的 ARMA(1, 1) 模型同样可以产生这一组自相关系数，但其偏自相关系数并不在 2 阶后截尾，而是呈指数或振荡衰减。
第三，$\alpha_2$ 是任何弱平稳序列在二阶矩意义下的固有数字特征（线性投影系数），它的存在与可计算性并不预设序列服从特定的自回归结构。

常见错误做法剖析：
常见误区是将“针对二阶滞后投影计算出的参数 $\phi_{22}$ 非零”等同于“系统遵循二阶自回归数据生成过程”。必须认识到，确认自回归模型阶数依赖的是 PACF 的截尾性质，仅凭有限前几阶参数的特定数值绝不能逆向唯一确定模型生成机制。

## 6. 

考虑一阶自回归方程 $(1 - \phi B)X_t = \varepsilon_t$，其中 $(\varepsilon_t)_{t \in \mathbb Z}$ 为均值为 0、方差为 $\sigma^2$ 的白噪声序列，$B$ 为滞后算子。

当 $|\phi| < 1$ 时，多项式 $\phi(z) = 1 - \phi z$ 的根为 $z_0 = 1/\phi$，满足 $|z_0| > 1$（根严格位于复平面单位圆外）。因此幂级数
$$(1 - \phi z)^{-1} = \sum_{j=0}^\infty \phi^j z^j$$
在单位圆盘及其闭包 $|z| \le 1$ 上绝对收敛。将算子应用于白噪声，得到过程唯一的因果平稳线性解（即因果表示）：
$$X_t = \sum_{j=0}^\infty \phi^j \varepsilon_{t-j}$$
由于 $\sum_{j=0}^\infty |\phi^j|^2 = \frac{1}{1 - \phi^2} < \infty$，该无穷级数在均方意义下收敛且几乎必然收敛。

推导方差 $\gamma_0$ 与自协方差 $\gamma_k$：
由白噪声的正交性，当 $j \neq m$ 时 $\mathbb E[\varepsilon_{t-j} \varepsilon_{s-m}] = 0$，当 $t-j = s-m$ 时为 $\sigma^2$。
第一，推导方差 $\gamma_0$：
$$\gamma_0 = \operatorname{Cov}(X_t, X_t) = \operatorname{Cov}\left(\sum_{j=0}^\infty \phi^j \varepsilon_{t-j}, \, \sum_{m=0}^\infty \phi^m \varepsilon_{t-m}\right) = \sum_{j=0}^\infty \sum_{m=0}^\infty \phi^j \phi^m \operatorname{Cov}(\varepsilon_{t-j}, \varepsilon_{t-m})$$
双重求和中仅 $j = m$ 项非零：
$$\gamma_0 = \sum_{j=0}^\infty \phi^{2j} \operatorname{Var}(\varepsilon_{t-j}) = \sigma^2 \sum_{j=0}^\infty (\phi^2)^j = \frac{\sigma^2}{1 - \phi^2}$$

第二，推导自协方差 $\gamma_k$（设 $k \ge 0$）：
$$\gamma_k = \operatorname{Cov}(X_{t+k}, X_t) = \operatorname{Cov}\left(\sum_{j=0}^\infty \phi^j \varepsilon_{t+k-j}, \, \sum_{m=0}^\infty \phi^m \varepsilon_{t-m}\right)$$
令时点对齐 $t + k - j = t - m$，即 $j = m + k$。由于指标 $m \ge 0$，求和指标 $j$ 必须满足 $j \ge k$。利用正交性化简得：
$$\gamma_k = \sum_{m=0}^\infty \phi^{m+k} \phi^m \operatorname{Var}(\varepsilon_{t-m}) = \phi^k \sigma^2 \sum_{m=0}^\infty \phi^{2m} = \phi^k \frac{\sigma^2}{1 - \phi^2} = \phi^k \gamma_0$$
利用自协方差函数的偶对称性 $\gamma_{-k} = \gamma_k$，对任意整数 $k \in \mathbb Z$，统一表示为：
$$\gamma_k = \frac{\sigma^2 \phi^{|k|}}{1 - \phi^2}$$

第三，推导自相关系数 $\rho_k$：
$$\rho_k = \frac{\gamma_k}{\gamma_0} = \frac{\phi^{|k|} \gamma_0}{\gamma_0} = \phi^{|k|}$$

关于为什么必须要求 $|\phi| < 1$ 的论述：
第一，级数均方收敛与因果平稳解的存在性。因果表示 $X_t = \sum_{j=0}^\infty \phi^j \varepsilon_{t-j}$ 是将当前状态表达为历史冲击的累积。该无穷线性组合在希尔伯特空间 $L^2$ 中收敛的充要条件是权重系数平方可和，即 $\sum_{j=0}^\infty \phi^{2j} < \infty$，公比 $\phi^2 < 1$，等价于 $|\phi| < 1$。
第二，排除单位根非平稳爆炸。若 $|\phi| = 1$，模型退化为随机游走或带符号随机游走，方差随时间线性发散为无穷大（$\operatorname{Var}(X_t) \to \infty$），不再满足弱平稳性定义。
第三，排除非因果依赖。若 $|\phi| > 1$，差分方程虽然在双边无穷级数意义下存在平稳解，但该解必然向前依赖未来白噪声冲击 $\varepsilon_{t+1}, \varepsilon_{t+2}, \dots$，这在实际时间序列预测中属于不可实现的非因果系统。因此，为了获得依赖于过去和现在的因果平稳过程，必须严格约束 $|\phi| < 1$。

常见错误做法剖析：
一种常见错误是在未经因果平稳性证明的前提下，直接对原方程 $X_t = \phi X_{t-1} + \varepsilon_t$ 两端求方差得到 $\gamma_0 = \phi^2 \gamma_0 + \sigma^2$ 并移项求出 $\gamma_0 = \frac{\sigma^2}{1-\phi^2}$。这种做法逻辑上属于循环论证（预先假设了平稳解的存在以及 $\operatorname{Cov}(X_{t-1}, \varepsilon_t) = 0$）；若 $|\phi| > 1$，形式移项仍能算出数值，但该数值却为负数，暴露出前提假设的崩溃。正确的推导必须从因果表示的收敛性出发严格展开。
## 7. 

考虑给定的自回归方程：
$$(1 - 1.2B + 0.32B^2)X_t = \varepsilon_t$$
定义对应的自回归特征多项式为 $\phi(z) = 1 - 1.2z + 0.32z^2$，其中 $z \in \mathbb C$。

因式分解自回归多项式：
令特征方程 $\phi(z) = 0$，即
$$0.32z^2 - 1.2z + 1 = 0$$
计算一元二次方程判别式：
$$\Delta = (-1.2)^2 - 4 \times 0.32 \times 1 = 1.44 - 1.28 = 0.16 = (0.4)^2$$
求得方程的两个实根为：
$$z_1 = \frac{1.2 + 0.4}{2 \times 0.32} = \frac{1.6}{0.64} = 2.5$$
$$z_2 = \frac{1.2 - 0.4}{2 \times 0.32} = \frac{0.8}{0.64} = 1.25$$
由于常数项为 1，多项式可以唯一因式分解为根倒数形式：
$$\phi(B) = (1 - z_1^{-1} B)(1 - z_2^{-1} B) = (1 - 0.4B)(1 - 0.8B)$$
展开验算：$(1 - 0.4B)(1 - 0.8B) = 1 - 0.8B - 0.4B + 0.32B^2 = 1 - 1.2B + 0.32B^2$，因式分解完全正确。

因果平稳性判断：
AR 过程存在因果平稳解的充要条件是：自回归多项式 $\phi(z)$ 的所有复根均严格落在复平面单位圆盘外部，即对所有根满足 $|z_i| > 1$。
在本题中，两根分别为 $z_1 = 2.5$ 与 $z_2 = 1.25$。直接观察数值可知：
$$|z_1| = 2.5 > 1, \quad |z_2| = 1.25 > 1$$
两个特征根均严格位于单位圆之外。因此，该 AR(2) 模型存在唯一的因果平稳解，且该解可展开为绝对可和的单边因果无穷滑动平均过程：
$$X_t = \sum_{j=0}^\infty \psi_j \varepsilon_{t-j}$$
利用部分分式展开 $\frac{1}{(1-0.4B)(1-0.8B)} = \frac{2}{1-0.8B} - \frac{1}{1-0.4B}$，因果脉冲响应权重系数显式为 $\psi_j = 2 \times (0.8)^j - (0.4)^j$。

常见错误做法剖析：
初学者极易混淆“滞后多项式的根”与“伴随矩阵特征方程的特征值”。若设状态空间伴随特征多项式 $\lambda^2 - 1.2\lambda + 0.32 = 0$，其特征值为 $\lambda_1 = 0.8$、$\lambda_2 = 0.4$。稳定平稳要求伴随特征值模长严格小于 1（$|\lambda_i| < 1$），而对应到滞后多项式 $\phi(z) = 0$ 的根 $z_i = 1/\lambda_i$ 时，条件则严格变为模长大于 1（$|z_i| > 1$）。若混淆两套记号的内外准则，会导致平稳性判断完全颠倒。

## 8. 

考虑一阶自回归方程 $X_t = 2X_{t-1} + \varepsilon_t$，其中自回归系数 $\phi = 2$，$|\phi| > 1$。

为什么不能通过形式上反复向过去迭代得到因果平稳解：
若机械地沿时间轴向过去方向反复迭代：
$$X_t = 2(2X_{t-2} + \varepsilon_{t-1}) + \varepsilon_t = \varepsilon_t + 2\varepsilon_{t-1} + 4X_{t-2} = \dots = \sum_{j=0}^{k-1} 2^j \varepsilon_{t-j} + 2^k X_{t-k}$$
形式上令迭代步数 $k \to \infty$，试图得到因果级数 $\sum_{j=0}^\infty 2^j \varepsilon_{t-j}$。
然而在泛函分析与二阶矩时间序列理论中，线性无穷级数要在均方意义（$L^2$ 空间）下收敛，其线性组合权重必须平方可和。考察截断部分和的方差：
$$\operatorname{Var}\left(\sum_{j=0}^{k-1} 2^j \varepsilon_{t-j}\right) = \sigma^2 \sum_{j=0}^{k-1} (2^j)^2 = \sigma^2 \sum_{j=0}^{k-1} 4^j = \sigma^2 \frac{4^k - 1}{3} \xrightarrow{k \to \infty} \infty$$
方差发散至无穷大。此外，若假定存在平稳解，其余项方差 $\operatorname{Var}(2^k X_{t-k}) = 4^k \gamma_0$ 同样发散，无法趋于零。因此该级数几乎必然发散且在 $L^2$ 中不收敛，向过去迭代无法收敛为一个有限二阶矩的随机变量，因果平稳解根本不存在。

非因果平稳表示及其所使用的信息：
虽然该模型不存在因果解，但在双边无穷时间轴 $\mathbb Z$ 上存在唯一的弱平稳非因果解。
将原方程改写为向前形式：
$$X_{t-1} = \frac{1}{2} X_t - \frac{1}{2} \varepsilon_t \implies X_t = \frac{1}{2} X_{t+1} - \frac{1}{2} \varepsilon_{t+1}$$
沿时间轴向前向未来迭代 $m$ 步：
$$X_t = -\sum_{j=1}^m \left(\frac{1}{2}\right)^j \varepsilon_{t+j} + \left(\frac{1}{2}\right)^m X_{t+m}$$
由于几何级数公比满足 $|1/2| < 1$，权重系数严格满足平方可和条件：
$$\sum_{j=1}^\infty \left(\left(\frac{1}{2}\right)^j\right)^2 = \sum_{j=1}^\infty \frac{1}{4^j} = \frac{1/4}{1 - 1/4} = \frac{1}{3} < \infty$$
当 $m \to \infty$ 时，余项在均方意义下趋于 0，得到收敛的平稳解：
$$X_t = -\sum_{j=1}^\infty 2^{-j} \varepsilon_{t+j} = -\frac{1}{2}\varepsilon_{t+1} - \frac{1}{4}\varepsilon_{t+2} - \frac{1}{8}\varepsilon_{t+3} - \dots$$
该非因果平稳表示所使用的信息是未来冲击信息，即时点 $t$ 之后的扰动集合 $\{\varepsilon_{t+1}, \varepsilon_{t+2}, \varepsilon_{t+3}, \dots\}$。此时当前状态 $X_t$ 完全由未来的白噪声冲击决定，具有预知未来的先导特征，因而无法用于常规因果在线单向时间预测。

常见错误做法剖析：
常见误解是断言“$|\phi| > 1$ 的 AR 过程完全没有平稳解”。这是混淆了因果平稳性与广义平稳性。数学上只要允许双边或前向表示，平稳解依然存在；但在实际计量中，非因果解依赖未来不可见冲击，如果不做特殊前瞻滤波处理，无法直接用于实时滤波和因果因果推断。
## 9. 

考虑零均值 AR(2) 过程：
$$X_t = \phi_1 X_{t-1} + \phi_2 X_{t-2} + \varepsilon_t$$
其中 $\operatorname{Var}(\varepsilon_t) = \sigma^2$。

建立并求解 Yule–Walker 方程组：
对 AR(2) 模型，自协方差矩阵满足方程：
$$\begin{pmatrix} \gamma_0 & \gamma_1 \\ \gamma_1 & \gamma_0 \end{pmatrix} \begin{pmatrix} \phi_1 \\ \phi_2 \end{pmatrix} = \begin{pmatrix} \gamma_1 \\ \gamma_2 \end{pmatrix}$$
用样本自协方差 $\hat\gamma_0 = 2$、$\hat\gamma_1 = 1$、$\hat\gamma_2 = 0.4$ 替换总体值，得到矩阵估计方程：
$$\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} \hat\phi_1 \\ \hat\phi_2 \end{pmatrix} = \begin{pmatrix} 1 \\ 0.4 \end{pmatrix}$$
系数矩阵行列式为：
$$\det \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} = 2 \times 2 - 1 \times 1 = 3$$
应用二阶矩阵求逆公式：
$$\begin{pmatrix} \hat\phi_1 \\ \hat\phi_2 \end{pmatrix} = \frac{1}{3} \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 0.4 \end{pmatrix} = \frac{1}{3} \begin{pmatrix} 2 \times 1 - 1 \times 0.4 \\ -1 \times 1 + 2 \times 0.4 \end{pmatrix} = \frac{1}{3} \begin{pmatrix} 1.6 \\ -0.2 \end{pmatrix} = \begin{pmatrix} \frac{8}{15} \\ -\frac{1}{15} \end{pmatrix}$$
因此参数点估计值为：
$$\hat\phi_1 = \frac{8}{15} \approx 0.5333, \quad \hat\phi_2 = -\frac{1}{15} \approx -0.0667$$

进一步计算白噪声方差估计量 $\hat\sigma^2$：
根据自协方差与扰动方差的关系式：
$$\hat\sigma^2 = \hat\gamma_0 - \hat\phi_1 \hat\gamma_1 - \hat\phi_2 \hat\gamma_2 = 2 - \frac{8}{15} \times 1 - \left(-\frac{1}{15}\right) \times 0.4 = 2 - \frac{8}{15} + \frac{0.4}{15} = 2 - \frac{7.6}{15} = \frac{112}{75} \approx 1.4933$$

平稳性三角检验：
验证估计所得参数是否落在 AR(2) 平稳域内：
第一，$\hat\phi_1 + \hat\phi_2 = \frac{8}{15} - \frac{1}{15} = \frac{7}{15} < 1$；
第二，$\hat\phi_2 - \hat\phi_1 = -\frac{1}{15} - \frac{8}{15} = -\frac{9}{15} = -0.6 < 1$；
第三，$|\hat\phi_2| = |-\frac{1}{15}| = \frac{1}{15} < 1$。
三条平稳性判据均严格满足，说明估计模型完全平稳。

常见错误做法剖析：
常见失误包括矩阵求逆运算符号出错，或者在完成自回归系数估计后遗漏了扰动项方差 $\hat\sigma^2$ 的估计；另外，若使用自相关系数计算时，误将 $\hat\rho_1$ 或 $\hat\rho_2$ 的除数写成 $\hat\gamma_1$ 而非 $\hat\gamma_0$。

## 10. 

对于一阶移动平均模型 $X_t = \varepsilon_t + \theta \varepsilon_{t-1}$，其中 $\theta \neq 0$ 且 $\operatorname{Var}(\varepsilon_t) = \sigma^2$。

**证明**
计算参数为 $\theta$ 时的一阶自相关系数。自协方差为 $\gamma_0 = (1 + \theta^2)\sigma^2$，$\gamma_1 = \theta \sigma^2$。由定义：
$$\rho_1(\theta) = \frac{\gamma_1}{\gamma_0} = \frac{\theta \sigma^2}{(1 + \theta^2)\sigma^2} = \frac{\theta}{1 + \theta^2}$$
对任意滞后阶数 $|k| \ge 2$，由于扰动项不重叠，均有 $\rho_k = 0$。
现考虑倒数参数 $\theta^* = \frac{1}{\theta}$。将其代入一阶自相关系数公式：
$$\rho_1(\theta^*) = \frac{\theta^*}{1 + (\theta^*)^2} = \frac{\frac{1}{\theta}}{1 + \left(\frac{1}{\theta}\right)^2} = \frac{\frac{1}{\theta}}{\frac{\theta^2 + 1}{\theta^2}} = \frac{1}{\theta} \times \frac{\theta^2}{\theta^2 + 1} = \frac{\theta}{1 + \theta^2} = \rho_1(\theta)$$
对任意 $|k| \ge 2$，同样有 $\rho_k(\theta^*) = 0$。
因此，参数 $\theta$ 与 $1/\theta$ 生成完全相同的一阶自相关系数及全部自相关结构序列 $\{\rho_k\}_{k \in \mathbb Z}$。

□

关于可逆性如何消除这一表示不唯一性的说明：
自相关函数相等意味着仅凭二阶相关结构无法唯一识别数据生成过程中的移动平均参数 $\theta$。若给定一个样本自相关系数满足 $|\rho_1| < 0.5$，方程 $\frac{\theta}{1+\theta^2} = \rho_1$ 即二次方程 $\rho_1 \theta^2 - \theta + \rho_1 = 0$ 必然有两个互为倒数的实数解：一个根的绝对值严格小于 1，另一个根的绝对值严格大于 1（当 $|\theta| = 1$ 时两根重合）。
引入可逆性（Invertibility）条件：要求滞后算子多项式 $\theta(z) = 1 + \theta z = 0$ 的复根 $z_0 = -1/\theta$ 严格位于复平面单位圆外，即
$$|z_0| = \left|-\frac{1}{\theta}\right| = \frac{1}{|\theta|} > 1 \iff |\theta| < 1$$
可逆性的经济学与统计学本质在于：
当且仅当 $|\theta| < 1$ 时，无穷多项式 $(1 + \theta B)^{-1} = \sum_{j=0}^\infty (-\theta)^j B^j$ 绝对收敛，扰动项可以写成历史观测值的因果线性组合：
$$\varepsilon_t = \sum_{j=0}^\infty (-\theta)^j X_{t-j}$$
这保证了研究者能够仅依据截至时点 $t$ 的可观测历史信息 $\{X_s\}_{s \le t}$ 唯一重构并过滤出当前真实冲击 $\varepsilon_t$，进而展开条件最大似然估计和实时一步预测。
反之，若选择 $|\theta| > 1$，将过程求逆展开会导致 $\varepsilon_t$ 依赖未来的观测值 $\{X_{t+j}\}_{j \ge 1}$，从历史可测信息集来看是不可逆的。
因此，强制施加可逆性条件 $|\theta| < 1$ 剔除了模长大于 1 的伪解，在互为倒数的解对中唯一锁定了绝对值小于 1 的参数，彻底消除了模型的识别不唯一性。

常见错误做法剖析：
常见误区是误以为 $\theta$ 与 $1/\theta$ 具有完全相同的自协方差 $\gamma_0$。实际上，$\gamma_0 = (1+\theta^2)\sigma_\varepsilon^2$，若改变参数为 $1/\theta$，必须同时调整白噪声方差为 $(\sigma_\varepsilon^*)^2 = \theta^2 \sigma_\varepsilon^2$ 才能保持自协方差数值不变；另一个误区是混淆平稳性与可逆性，误以为 $|\theta| > 1$ 会导致过程非平稳，实际上任何有限阶 MA 过程无条件平稳，$|\theta| < 1$ 约束的纯粹是可逆性而非平稳性。
## 11. 
考虑自回归滑动平均模型 $(1 - 0.8B)X_t = (1 + 0.3B)\varepsilon_t$。这里自回归多项式为 $\phi(B) = 1 - 0.8B$，移动平均多项式为 $\theta(B) = 1 + 0.3B$。

求因果脉冲响应权重系数的递推与显式解：
由于自回归多项式根为 $z_0 = 1/0.8 = 1.25 > 1$，模型存在因果平稳解，可表示为无穷单边移动平均级数：
$$X_t = \psi(B)\varepsilon_t = \sum_{j=0}^\infty \psi_j \varepsilon_{t-j}$$
其中传递函数满足恒等式 $\phi(B)\psi(B) = \theta(B)$，展开为滞后算子幂级数方程：
$$(1 - 0.8B)(\psi_0 + \psi_1 B + \psi_2 B^2 + \psi_3 B^3 + \dots) = 1 + 0.3B$$
比较方程两端 $B$ 的同次项系数：
对于常数项 $B^0$：
$$\psi_0 = 1$$
对于一次项 $B^1$：
$$\psi_1 - 0.8\psi_0 = 0.3 \implies \psi_1 = 0.3 + 0.8 \times 1 = 1.1$$
对于二次项 $B^2$：
$$\psi_2 - 0.8\psi_1 = 0 \implies \psi_2 = 0.8\psi_1 = 0.8 \times 1.1 = 0.88$$
对于三次项 $B^3$：
$$\psi_3 - 0.8\psi_2 = 0 \implies \psi_3 = 0.8\psi_2 = 0.8 \times 0.88 = 0.704$$

对于任意 $j \ge 1$ 的一般通项公式：
当滞后阶数 $j \ge 2$ 时，方程右端无更高阶移动平均项，系数满足一阶齐次差分方程 $\psi_j - 0.8\psi_{j-1} = 0$。由一阶递推关系可知：
$$\psi_j = 0.8^{j-1} \psi_1 = 1.1 \times (0.8)^{j-1} \quad (j \ge 1)$$
验证 $j = 1$ 时 $1.1 \times (0.8)^0 = 1.1 = \psi_1$，完全符合。
另一种推导方式是直接展开几何级数：
$$\psi(B) = \frac{1 + 0.3B}{1 - 0.8B} = (1 + 0.3B) \sum_{k=0}^\infty (0.8)^k B^k = 1 + \sum_{j=1}^\infty (0.8^j + 0.3 \times 0.8^{j-1}) B^j = 1 + \sum_{j=1}^\infty (0.8 + 0.3)0.8^{j-1} B^j$$
同样导出 $\psi_j = 1.1 \times (0.8)^{j-1}$（对 $j \ge 1$）。

常见错误做法剖析：
常见失误是误将齐次递推关系 $\psi_j = 0.8\psi_{j-1}$ 直接套用到 $j=1$，得出错误的 $\psi_1 = 0.8\psi_0 = 0.8$。必须注意移动平均项 $0.3B$ 的存在破坏了 $j=1$ 处的齐次性，齐次递推仅对 $j \ge 2$ 成立。

## 12. 
考虑模型 $(1 - 0.5B)(1 - 0.2B)X_t = (1 - 0.2B)\varepsilon_t$。

识别问题分析：
该模型存在严重的零极点相消（Pole-Zero Cancellation）与参数冗余问题。
在给定的 ARMA(2, 1) 形式中，自回归算子多项式为 $\phi(B) = (1 - 0.5B)(1 - 0.2B)$，其根由 $(1 - 0.5z)(1 - 0.2z) = 0$ 解得为 $z_1 = 2$ 和 $z_2 = 5$；移动平均算子多项式为 $\theta(B) = 1 - 0.2B$，其根由 $1 - 0.2z = 0$ 解得为 $z = 5$。
两端的多项式包含完全相同的公共根因子 $(1 - 0.2B)$。这导致该 ARMA(2, 1) 过程的传递函数满足：
$$\frac{\theta(B)}{\phi(B)} = \frac{1 - 0.2B}{(1 - 0.5B)(1 - 0.2B)} = \frac{1}{1 - 0.5B}$$
这表明原本由 3 个参数描述的模型退化为仅由 1 个参数决定的 AR(1) 过程。在参数估计时，该公因子会导致 Fisher 信息矩阵奇异不可逆，似然函数曲面上出现一条平行于对角线的平坦山脊，导致数值优化算法无法收敛，参数点估计失去唯一可识别性。

化简后的模型及其因果性与可逆性：
约去两端公共因式 $(1 - 0.2B)$，得到简约模型（Minimal Representation）：
$$(1 - 0.5B)X_t = \varepsilon_t$$
即标准的 AR(1) 过程。
第一，因果性（Causality）：化简后自回归多项式为 $\phi^*(z) = 1 - 0.5z$。方程 $\phi^*(z) = 0$ 的根为 $z = 2$。因为 $|z| = 2 > 1$，根严格位于复平面单位圆外，因此化简后的模型具有唯一的因果平稳解，可展开为正时间轴方向历史冲击的线性组合 $X_t = \sum_{j=0}^\infty (0.5)^j \varepsilon_{t-j}$。
第二，可逆性（Invertibility）：化简后移动平均多项式为 $\theta^*(z) \equiv 1$（0 阶多项式，不存在有限复根）。因此扰动项直接表示为可测历史的有限线性组合 $\varepsilon_t = X_t - 0.5X_{t-1}$，过程天然满足可逆性条件。

常见错误做法剖析：
常见误区是在未化简前直接依据未约简的多项式讨论模型性质，误认为这是一个高阶 ARMA 模型；或者在做实际时间序列建模时，未加检验地同时增加 AR 和 MA 的阶数，引发由公因子导致的过参数化与估计崩溃。

## 13. 
对于零均值一阶自回归过程 $X_t = \phi X_{t-1} + \varepsilon_t$，样本观测值为 $t = 1, 2, \dots, 101$，有效滞后回归时点为 $t = 2, \dots, 101$（样本量 $T = 100$）。已知样本交叉和与平方和分别为 $\sum_{t=2}^{101}x_{t-1}x_t = 150$，$\sum_{t=2}^{101}x_{t-1}^2 = 200$。

求条件最小二乘估计：
条件最小二乘（CLS）在给定初始值 $x_1$ 的条件下，最小化一步向前预测误差平方和：
$$S(\phi) = \sum_{t=2}^{101} (x_t - \phi x_{t-1})^2$$
对 $\phi$ 求一阶导数并令其为 0：
$$\frac{\mathrm{d}S}{\mathrm{d}\phi} = -2 \sum_{t=2}^{101} x_{t-1}(x_t - \phi x_{t-1}) = 0 \implies \hat\phi_{\text{CLS}} = \frac{\sum_{t=2}^{101} x_{t-1} x_t}{\sum_{t=2}^{101} x_{t-1}^2}$$
代入题给数据计算：
$$\hat\phi_{\text{CLS}} = \frac{150}{200} = 0.75$$

为什么不能直接使用 IID 截面回归标准误：
在经典横截面普通最小二乘（OLS）回归中，估计量标准误的计算基于严格外生性假定 $\mathbb E[\varepsilon_i \mid \boldsymbol X] = 0$ 和样本观测值的独立同分布假定。在时间序列动态自回归模型中直接照搬该标准误是不恰当的，主要原因如下：
第一，自变量缺乏严格外生性。自回归元 $X_{t-1}$ 仅满足预定性（Predeterminedness，即正交于当前及未来扰动 $\mathbb E[\varepsilon_t \mid X_{t-1}, X_{t-2}, \dots] = 0$），但它与过去的扰动强相关（$\operatorname{Cov}(X_{t-1}, \varepsilon_{t-j}) \neq 0$，$j \ge 1$）。由于缺乏严格外生性，最小二乘估计量在有限样本下存在固有的下偏偏误（Hurwicz 偏误），即 $\mathbb E[\hat\phi] - \phi \approx -\frac{1 + 3\phi}{T}$，标准 OLS 的无偏性定理不再成立。
第二，信息矩阵与大样本分布机制不同。分母 $\sum_{t=2}^{101} x_{t-1}^2$ 是随机变量的时间累加，其收敛性依赖遍历定理。证明 $\sqrt{T}(\hat\phi - \phi) \xrightarrow{d} \mathcal N(0, 1 - \phi^2)$ 必须运用鞅差序列中心极限定理。在有限样本下，若套用横截面公式将自变量视为确定性常数矩阵，将严重歪曲真实的抽样离散度。
第三，金融时序的条件异方差性。若误差项存在 ARCH 效应（波动率聚集），误差方差虽为常数，但条件方差非恒定，传统截面标准误会系统性低估参数的不确定性，必须采用稳健的异方差自相关一致协方差估计量（HAC / Newey-West 标准误）。

常见错误做法剖析：
常见错误是在动态回归中直接套用统计软件默认的截面多元回归 $t$ 检验，忽视了动态滞后项内生于系统历史的事实，导致对参数显著性的置信区间过度狭窄和推断过于乐观。
## 14. 
在时间序列模型选择中，AIC（赤池信息准则）与 BIC（贝叶斯信息准则）是平衡模型拟合优度与参数复杂度的核心指标。

信息准则的数学定义与重算公式：
设候选 ARMA 模型的自由参数个数为 $k = p + q + 1$（包含自回归系数、移动平均系数以及扰动项方差或常数项），有效样本容量为 $n$，最大对数似然估计值为 $\ln \hat L$。准则定义为：
$$\text{AIC} = -2\ln \hat L + 2k$$
$$\text{BIC} = -2\ln \hat L + k \ln n$$
若采用残差平方和（方差估计值 $\hat\sigma_k^2$）的大样本高斯似然简化形式，省去与参数无关的常数项后等价表述为：
$$\text{AIC} = n \ln \hat\sigma_k^2 + 2k, \quad \text{BIC} = n \ln \hat\sigma_k^2 + k \ln n$$
惩罚项系数的差异是二者的本质区别：AIC 对每个额外自由参数施加固定的惩罚权重 2；BIC 对每个额外自由参数施加随样本容量对数增长的惩罚权重 $\ln n$。

讨论“BIC 选择较低阶模型”是否总能成立：
结论是：在嵌套模型（Nested Models）比较且样本量 $n \ge 8$ 时，该结论恒成立；但对于非嵌套模型或者超小样本（$n \le 7$），该结论并不总能成立。
具体分析如下：
第一，嵌套模型比较（如对比模型阶数 $k_1 < k_2$）。
两个模型的准则差值分别为：
$$\Delta\text{AIC} = \text{AIC}(k_2) - \text{AIC}(k_1) = -2(\ln \hat L_2 - \ln \hat L_1) + 2(k_2 - k_1)$$
$$\Delta\text{BIC} = \text{BIC}(k_2) - \text{BIC}(k_1) = -2(\ln \hat L_2 - \ln \hat L_1) + \ln n (k_2 - k_1)$$
两式相减得到：
$$\Delta\text{BIC} - \Delta\text{AIC} = (\ln n - 2)(k_2 - k_1)$$
当有效样本容量 $n \ge 8$ 时，$\ln n \ge \ln 8 \approx 2.0794 > 2$，因此 $\ln n - 2 > 0$。只要 $k_2 > k_1$，必然有 $\Delta\text{BIC} > \Delta\text{AIC}$。
若 AIC 选择较低阶模型 $k_1$（即 $\Delta\text{AIC} > 0$），则必有 $\Delta\text{BIC} > \Delta\text{AIC} > 0$，表明 BIC 必然同时选择较低阶模型 $k_1$。因此在嵌套模型中，BIC 选取的阶数绝不会高于 AIC，即 $k_{\text{BIC}} \le k_{\text{AIC}}$。
第二，例外情形：极小样本量。
若样本量极小，当 $n \le 7$ 时，$\ln n \le \ln 7 \approx 1.9459 < 2$。此时 BIC 对参数的惩罚项反而小于 AIC 的惩罚项（$\ln n < 2$），会导致 BIC 倾向于选择比 AIC 更高阶的模型。
第三，例外情形：非嵌套模型网格搜索。
若在多个非嵌套候选结构（例如 ARMA(3, 0) 与 ARMA(1, 2)，二者参数总数相同或不同但无法互相退化嵌套）中进行全局最优搜寻，似然增益的离散分布可能使得 BIC 选取的局部结构在某一单项维度上不构成 AIC 选中模型的子集。

常见错误做法剖析：
常见误区是无条件地断言“BIC 永远比 AIC 选出的参数少”，忽视了其成立必须依赖 $n \ge 8$ 以及嵌套对比的前提假设；另一个误区是混淆大样本性质，误以为 AIC 具有一致性（事实上在大样本下 AIC 倾向于轻微过参数化，而 BIC 具有阶数选择一致性）。

## 15. 
对于拟合后的 ARMA 残差序列，在滞后步数 $m = 10$ 时，Ljung–Box 检验的统计推断结果为 $p = 0.02$。

可以得出的统计结论：
在统计推断中，Ljung–Box 检验的原假设 $H_0$ 为：残差序列截至滞后 $m$ 阶不存在自相关性（即 $\rho_1 = \dots = \rho_m = 0$）；备择假设 $H_1$ 为：至少存在一个滞后阶数使得自相关系数显著不为零。
当给定显著性水平 $\alpha = 0.05$ 时，由于计算得到的伴随概率 $p = 0.02 < 0.05$，在统计学上应果断拒绝原假设 $H_0$。
据此可以得出的确定性结论是：该 ARMA 模型的残差在 1 到 10 阶滞后范围内仍然存在显著的线性自相关。这表明当前的 ARMA 模型未通过残差白噪声诊断，模型存在误设（Misspecification），未能充分提取时间序列中的线性时间依赖结构，通常需要增加滞后自回归或移动平均阶数，或者考虑季节性项。

不能据此得出的结论剖析：
第一，不能得出关于“独立性”的任何肯定或否定判断。Ljung–Box 检验本质上检验的是弱白噪声（二阶自相关系数是否为 0）。即使未来改进模型使得 $p > 0.05$（无法拒绝白噪声原假设），也绝不能推断残差相互独立。金融资产收益率中普遍存在波动率聚集（ARCH/GARCH 效应），即使序列线性不相关，高阶矩（如平方项）依然可能高度相关。
第二，不能据此得出“存在可预测未来收益”的结论。残差自相关表明样本内线性拟合不完全，但这绝不意味着未拟合部分能在样本外转化为稳健的未来收益预测。样本内的微弱自相关可能源于异常值脉冲、结构突变或微观结构噪声，在样本外往往表现为均值回归失效或快速衰减，样本外预测能力极低。
第三，不能据此得出“可以构建盈利交易方案”的结论。金融市场的统计显著性绝不等同于经济显著性。在真实量化交易中，基于微弱自相关构建的信号，其实际毛收益往往极低，很容易被实际交易中的买卖盘口价差（Bid-Ask Spread）、执行滑点（Slippage）、印花税与佣金等摩擦成本彻底蚕食，导致净收益为负。

常见错误做法剖析：
量化研究中的经典错误是混淆“统计检验显著”与“具有实盘可交易性”。看到检验拒绝 $H_0$ 就盲目宣称发现了市场异象或套利机会，完全忽视了交易成本与样本外过拟合风险。

## 16. 
考虑零均值一阶自回归过程 $X_t = \phi X_{t-1} + \varepsilon_t$，已知参数 $\phi = 0.6$，白噪声方差 $\sigma^2 = \operatorname{Var}(\varepsilon_t) = 0.25$，当前时点观测值 $x_t = 3$。

求三步向前点预测：
根据最优均方误差准则，向前 $h$ 步的点预测为基于当前信息集 $\mathcal F_t$ 的条件期望 $\hat X_t(h) = \mathbb E[X_{t+h} \mid \mathcal F_t]$。
对于 AR(1) 过程，利用递归条件期望性质：
$$\hat X_t(1) = \mathbb E[\phi X_t + \varepsilon_{t+1} \mid \mathcal F_t] = \phi x_t = 0.6 \times 3 = 1.8$$
$$\hat X_t(2) = \mathbb E[\phi X_{t+1} + \varepsilon_{t+2} \mid \mathcal F_t] = \phi \hat X_t(1) = \phi^2 x_t = 0.6^2 \times 3 = 0.36 \times 3 = 1.08$$
$$\hat X_t(3) = \mathbb E[\phi X_{t+2} + \varepsilon_{t+3} \mid \mathcal F_t] = \phi \hat X_t(2) = \phi^3 x_t = 0.6^3 \times 3 = 0.216 \times 3 = 0.648$$
因此，三步向前点预测值为 $0.648$。

求三步向前预测方差：
将 $X_{t+3}$ 展开为当前状态与未来冲击的组合：
$$X_{t+3} = \phi^3 X_t + \varepsilon_{t+3} + \phi \varepsilon_{t+2} + \phi^2 \varepsilon_{t+1}$$
对应的三步预测误差为：
$$e_t(3) = X_{t+3} - \hat X_t(3) = \varepsilon_{t+3} + \phi \varepsilon_{t+2} + \phi^2 \varepsilon_{t+1}$$
由于未来的白噪声冲击彼此互不相关，预测误差方差为各项方差之和：
$$\operatorname{Var}(e_t(3)) = \sigma^2 (1 + \phi^2 + \phi^4)$$
代入数值计算：
$$\phi^2 = 0.36, \quad \phi^4 = 0.36^2 = 0.1296$$
$$1 + \phi^2 + \phi^4 = 1 + 0.36 + 0.1296 = 1.4896$$
$$\operatorname{Var}(e_t(3)) = 0.25 \times 1.4896 = 0.3724$$

求长期预测方差：
当预测步长 $h \to \infty$ 时，向前 $h$ 步的预测误差为无穷单边移动平均和 $e_t(h) = \sum_{j=0}^{h-1} \phi^j \varepsilon_{t+h-j}$。
长期极限预测方差为：
$$\lim_{h \to \infty} \operatorname{Var}(e_t(h)) = \sigma^2 \sum_{j=0}^\infty (\phi^2)^j = \frac{\sigma^2}{1 - \phi^2}$$
代入数值计算：
$$\lim_{h \to \infty} \operatorname{Var}(e_t(h)) = \frac{0.25}{1 - 0.6^2} = \frac{0.25}{1 - 0.36} = \frac{0.25}{0.64} = \frac{25}{64} = 0.390625$$
随着预测步长趋于无穷，点预测收敛于无条件均值 0，而预测误差方差单调递增并收敛于过程的无条件方差 $\gamma_0 = 0.390625$。

常见错误做法剖析：
常见计算失误是在算三步预测方差时遗漏平方项，误写成 $\sigma^2(1 + \phi + \phi^2)^2$；或者混淆预测误差方差与点预测本身的方差；在求长期方差时误认为方差会随步长发散到无穷，混淆了平稳自回归过程与非平稳单位根过程的预测极限行为。
## 17. 
考虑二阶移动平均过程 MA(2)：
$$X_t = \varepsilon_t + 0.5\varepsilon_{t-1} - 0.2\varepsilon_{t-2}$$
其中白噪声满足 $\mathbb E[\varepsilon_t] = 0$，$\operatorname{Var}(\varepsilon_t) = \sigma^2$，且当 $s \neq t$ 时 $\operatorname{Cov}(\varepsilon_t, \varepsilon_s) = 0$。

求在时点 $t$ 的三步向前点预测：
根据最优均方预测准则，点预测为时点 $t$ 可用信息集 $\mathcal F_t$ 下的条件期望：
$$\hat X_t(3) = \mathbb E[X_{t+3} \mid \mathcal F_t]$$
将 $t+3$ 时的状态按模型定义展开：
$$X_{t+3} = \varepsilon_{t+3} + 0.5\varepsilon_{t+2} - 0.2\varepsilon_{t+1}$$
观察式中包含的扰动项下标：$\varepsilon_{t+3}$、$\varepsilon_{t+2}$ 与 $\varepsilon_{t+1}$ 的时点均严格大于 $t$。
由于未来的白噪声冲击与当前及过去的信息集正交，其条件期望均为 0：
$$\mathbb E[\varepsilon_{t+3} \mid \mathcal F_t] = 0, \quad \mathbb E[\varepsilon_{t+2} \mid \mathcal F_t] = 0, \quad \mathbb E[\varepsilon_{t+1} \mid \mathcal F_t] = 0$$
代入计算得：
$$\hat X_t(3) = 0 + 0.5 \times 0 - 0.2 \times 0 = 0$$
对于一般的 MA(q) 过程，当预测步长 $h > q$ 时，系统历史冲击的记忆完全耗尽，最优点预测恒等于过程的无条件期望（此处为 0）。

求三步向前预测误差与预测方差：
三步向前预测误差为真实值与预测值的差：
$$e_t(3) = X_{t+3} - \hat X_t(3) = \varepsilon_{t+3} + 0.5\varepsilon_{t+2} - 0.2\varepsilon_{t+1}$$
计算预测误差方差：
$$\operatorname{Var}(e_t(3)) = \operatorname{Var}(\varepsilon_{t+3} + 0.5\varepsilon_{t+2} - 0.2\varepsilon_{t+1})$$
由于不同时点的白噪声相互正交，方差为各项方差的代数和：
$$\operatorname{Var}(e_t(3)) = \sigma^2 + 0.5^2 \sigma^2 + (-0.2)^2 \sigma^2 = (1 + 0.25 + 0.04)\sigma^2 = 1.29\sigma^2$$
当预测步长超过模型阶数（$h \ge 3$）时，预测误差方差达到上限，并等于该 MA(2) 过程本身的无条件方差 $\gamma_0 = 1.29\sigma^2$。

常见错误做法剖析：
常见错误是在计算多步预测时机械套用自回归递推，试图将 $X_t$ 或 $X_{t-1}$ 代入公式计算非零预测值；或者在计算方差时漏掉平方项，错误计算为 $(1 + 0.5 - 0.2)^2 \sigma^2$。

## 18. 
在时间序列建模中，经典的 plug-in 线性高斯预测区间通常形式化为 $\hat X_t(h) \pm z_{\alpha/2} \sqrt{\hat\sigma^2 \sum_{j=0}^{h-1} \hat\psi_j^2}$。在实际实证建模与量化实盘部署中，该公式计算出的理论置信区间几乎总是系统性地低估实际预测不确定性（即实际落在区间外的极端样本频率显著高于显著性水平 $\alpha$）。

导致低估预测不确定性的三项核心原因剖析：
第一，未计入参数估计误差与抽样不确定性（Parameter Estimation Uncertainty）。
经典预测区间公式属于代入式估计，它将样本估计出的参数值 $(\hat\phi, \hat\theta, \hat\sigma^2)$ 视为无误差的真实总体真值。然而在有限样本实证中，参数估计量自身具有抽样方差矩阵 $\operatorname{Var}(\hat{\boldsymbol\theta})$。真实的预测误差不仅来源于未来的白噪声冲击，还包含了参数估计偏差在多步递推预测中的放大累积。严格的预测误差分解为：
$$X_{t+h} - \hat X_t(h; \hat{\boldsymbol\theta}) = [X_{t+h} - \hat X_t(h; \boldsymbol\theta)] + [\hat X_t(h; \boldsymbol\theta) - \hat X_t(h; \hat{\boldsymbol\theta})]$$
右端第二项反映了参数不确定性引入的额外方差。标准区间完全遗漏了这一附加方差项，因而区间宽度被系统性压缩。
第二，模型设定与阶数选择风险（Model Specification and Selection Uncertainty）。
理论公式假定真实数据生成过程严格属于所拟合的线性 ARMA 家族且滞后阶数已知。但在现实建模中，模型结构往往存在误设（如遗漏高阶动态、未考虑潜在的结构突变或 regime 切换）。此外，先用 AIC/BIC 进行阶数筛选、再在选中模型上计算预测区间的两阶段流程存在预检验偏差（Pre-test Bias），模型选择的不确定性未被纳入最终区间方差中。
第三，金融扰动项的非正态厚尾与条件异方差（Fat Tails and ARCH Effects）。
标准预测区间依赖独立同分布高斯扰动假定，使用标准正态分位数 $z_{\alpha/2}$ 与恒定无条件方差 $\hat\sigma^2$。然而金融时序具有显著的厚尾（尖峰厚尾）特征以及波动率聚集效应（ARCH/GARCH）。当市场处于高波动时期时，真实的条件方差远大于无条件均方差；即便在平稳期，厚尾分布下的极端偏离概率也远超正态分布预估，使得基于正态假定的置信区间严重偏窄。

常见错误做法剖析：
常见误区是认为只要样本量 $n$ 足够大，预测区间就会绝对精准，忽视了模型误设、结构突变与真实金融市场非正态非平稳性的冲击。
## 19. 
设日收益率序列 $(\varepsilon_t)_{t \in \mathbb Z}$ 为独立同分布（IID）白噪声，均值为 0，方差为 $\sigma^2$。定义重叠三日累积收益率为：
$$Y_t = \varepsilon_t + \varepsilon_{t-1} + \varepsilon_{t-2}$$
该过程形式上对应于一个二阶移动平均过程 MA(2)，系数均为 1。

求方差与各阶自相关系数：
第一，计算方差 $\operatorname{Var}(Y_t)$：
$$\operatorname{Var}(Y_t) = \operatorname{Var}(\varepsilon_t + \varepsilon_{t-1} + \varepsilon_{t-2})$$
由于日收益率独立同分布，协方差项均为 0：
$$\operatorname{Var}(Y_t) = \operatorname{Var}(\varepsilon_t) + \operatorname{Var}(\varepsilon_{t-1}) + \operatorname{Var}(\varepsilon_{t-2}) = 3\sigma^2$$
即自协方差零阶项 $\gamma_0 = 3\sigma^2$。

第二，计算滞后一阶自协方差 $\gamma_1$ 与自相关系数 $\rho_1$：
$$\gamma_1 = \operatorname{Cov}(Y_t, Y_{t-1}) = \operatorname{Cov}(\varepsilon_t + \varepsilon_{t-1} + \varepsilon_{t-2}, \, \varepsilon_{t-1} + \varepsilon_{t-2} + \varepsilon_{t-3})$$
展开后重叠项为 $\varepsilon_{t-1}$ 与 $\varepsilon_{t-2}$：
$$\gamma_1 = \operatorname{Var}(\varepsilon_{t-1}) + \operatorname{Var}(\varepsilon_{t-2}) = 2\sigma^2$$
$$\rho_1 = \frac{\gamma_1}{\gamma_0} = \frac{2\sigma^2}{3\sigma^2} = \frac{2}{3} \approx 0.6667$$

第三，计算滞后二阶自协方差 $\gamma_2$ 与自相关系数 $\rho_2$：
$$\gamma_2 = \operatorname{Cov}(Y_t, Y_{t-2}) = \operatorname{Cov}(\varepsilon_t + \varepsilon_{t-1} + \varepsilon_{t-2}, \, \varepsilon_{t-2} + \varepsilon_{t-3} + \varepsilon_{t-4})$$
唯一的重叠项为 $\varepsilon_{t-2}$：
$$\gamma_2 = \operatorname{Var}(\varepsilon_{t-2}) = \sigma^2$$
$$\rho_2 = \frac{\gamma_2}{\gamma_0} = \frac{\sigma^2}{3\sigma^2} = \frac{1}{3} \approx 0.3333$$

第四，计算滞后三阶自协方差 $\gamma_3$ 与自相关系数 $\rho_3$：
$$\gamma_3 = \operatorname{Cov}(Y_t, Y_{t-3}) = \operatorname{Cov}(\varepsilon_t + \varepsilon_{t-1} + \varepsilon_{t-2}, \, \varepsilon_{t-3} + \varepsilon_{t-4} + \varepsilon_{t-5}) = 0$$
两表达式中的时间下标完全不重叠，协方差恒为 0。因此：
$$\rho_3 = \frac{\gamma_3}{\gamma_0} = 0$$
对于所有 $|k| \ge 3$，均有 $\rho_k = 0$。

量化金融与实证研究含义：
第一，重叠构造机械性引入伪自相关。在资产定价实证中，若研究者为了扩大样本量而使用滚动重叠的多日或多月收益率，即使底层基础资产日收益完全独立（满足强式弱式有效市场假说），重叠采样也会在时间维度上机械地构造出一个 MA 结构，诱导出高达 0.67 的强烈正向自相关。
第二，经典统计推断失效与标准误低估。在针对跨期重叠收益构建的预测性回归（Predictive Regression）中，残差必然继承这种机械自相关性。若直接使用普通最小二乘法（OLS）默认的标准误，会严重低估估计量的真实方差，导致 $t$ 统计量虚假膨胀，得出虚假的可预测性结论。必须强制采用 Hansen–Hodrick 或 Newey–West（滞后阶数至少取重叠步长减 1）异方差自相关一致协方差估计量。

常见错误做法剖析：
常见计算失误是在算方差时误将随机变量求和写成 $(1+1+1)^2 \sigma^2 = 9\sigma^2$；或者看到重叠收益自相关显著就误认为市场存在动量效应，完全忽视了重叠区间的纯几何构造属性。

## 20. 
某资产收益率序列的自身自相关函数（ACF）接近于零，但其平方收益率序列的自相关函数长期显著为正。研究者据此拟合 ARMA(0,0) 并宣称“收益率独立且风险恒定”。

逻辑错误剖析：
该研究者的推断存在两项严重的逻辑混淆与理论错误：
第一，混淆了线性不相关与统计独立性。自身 ACF 接近于零，仅表明收益率之间缺乏一阶线性时间依赖性（即满足弱白噪声条件）。而统计独立性要求联合概率分布在任意时点均可因式分解为边缘分布的乘积，即对任意非线性函数变换 $g(\cdot)$ 与 $h(\cdot)$，均有 $\operatorname{Cov}(g(r_t), h(r_{t+k})) = 0$。平方收益率 ACF 长期显著为正，确凿地证明了高阶矩（二阶方差结构）存在跨期依赖性。因此，该过程是不相关的非独立过程，宣称“独立”在数学逻辑上彻底错误。
第二，混淆了无条件方差与条件风险。ARMA(0,0) 模型仅表示 $r_t = \mu + \varepsilon_t$，其假设扰动方差为常数 $\sigma^2$。平方收益率自相关具有长期正向记忆性，是金融计量学中经典的波动率聚集（Volatility Clustering）特征，即大幅度波动倾向于跟随大幅度波动。在金融风险管理中，市场真实承担的是条件风险 $\sigma_t^2 = \operatorname{Var}(r_t \mid \mathcal F_{t-1})$。在波动率聚集下，真实条件风险高度时变；若断言“风险恒定”，将导致风险价值（VaR）在平静期高估风险、在危机爆发期严重低估风险，引发致命的风险穿透。

更有层次的递进式诊断与建模方案：
第一层：一阶条件均值诊断。对收益率原序列 $r_t$ 进行自相关分析与 Ljung–Box 检验。若各阶自相关均处于 Bartlett 置信区间内且检验伴随概率 $p > 0.05$，确认条件均值可直接设定为常数或 ARMA(0,0)。
第二层：二阶非线性依赖与 ARCH 效应诊断。针对均值拟合后的残差序列 $\hat\varepsilon_t$，绘制平方残差 $\hat\varepsilon_t^2$ 与绝对残差 $|\hat\varepsilon_t|$ 的自相关图；执行 Engle 的 ARCH 拉格朗日乘子检验（ARCH LM Test）或 McLeod–Li 检验。在当前特征下，该检验将以极显著水平拒绝“条件同方差”原假设，证实存在条件异方差。
第三层：波动率动态建模。放弃恒定方差假设，引入自回归条件异方差模型族，如拟合 GARCH(1,1) 模型：
$$r_t = \mu + \varepsilon_t, \quad \varepsilon_t = \sigma_t z_t, \quad z_t \sim \operatorname{IID}(0, 1)$$
$$\sigma_t^2 = \omega + \alpha \varepsilon_{t-1}^2 + \beta \sigma_{t-1}^2$$
若存在杠杆效应（负冲击引发更剧烈的波动），可进一步扩展至 EGARCH 或 GJR-GARCH 模型。
第四层：标准化残差与极端厚尾诊断。考察标准化残差 $\hat z_t = \hat\varepsilon_t / \hat\sigma_t$ 的高阶统计特征。检验 $\hat z_t^2$ 的自相关性是否完全消失，并使用 Jarque–Bera 检验评估残差的正态性，必要时在模型中采用 Student-$t$ 分布或有偏 $t$ 分布刻画真实资产的尖峰厚尾特性。

常见错误做法剖析：
常见误区是看到 ACF 为零就机械地断定序列为独立同分布高斯白噪声，忽视了金融时间序列“低一阶自相关、高二阶自相关”的典型事实，导致波动率动态与下行尾部风险完全失控。