# 第32章习题参考答案与解析

## 1. 
风险价值与预期短缺是现代金融量化风控中最为核心的两类下行风险度量工具。设损失随机变量 $L \in L^\infty(\Omega, \mathcal F, \mathbb P)$，给定置信水平 $p \in (0, 1)$，风险价值 $\operatorname{VaR}_p(L)$ 定义为损失分布的下 $p$-分位数：
$$
\operatorname{VaR}_p(L) = \inf\{x \in \mathbb R : \mathbb P(L \le x) \ge p\}
$$
预期短缺 $\operatorname{ES}_p(L)$ 则定义为超过 $p$ 分位的所有分位数的积分平均：
$$
\operatorname{ES}_p(L) = \frac{1}{1-p}\int_p^1 \operatorname{VaR}_u(L)\mathrm du
$$

**证明**

对于任意损失随机变量 $L$，分位数函数 $u \mapsto \operatorname{VaR}_u(L)$ 在开区间 $(0, 1)$ 上关于 $u$ 单调非减。因此，对任意满足 $u \in [p, 1)$ 的积分变量 $u$，恒有不等式：
$$
\operatorname{VaR}_u(L) \ge \operatorname{VaR}_p(L)
$$
将此单调性代入预期短缺的积分定义中，两端同时减去常数 $\operatorname{VaR}_p(L)$，可得：
$$
\operatorname{ES}_p(L) - \operatorname{VaR}_p(L) = \frac{1}{1-p}\int_p^1 (\operatorname{VaR}_u(L) - \operatorname{VaR}_p(L))\mathrm du \ge 0
$$
这证明了对任意连续分布损失 $L$ 恒有 $\operatorname{ES}_p(L) \ge \operatorname{VaR}_p(L)$。

下面考查等号成立的充分必要条件。由于被积函数 $u \mapsto \operatorname{VaR}_u(L) - \operatorname{VaR}_p(L)$ 在区间 $[p, 1)$ 上连续且处处非负，积分值为零充要于被积函数在 $[p, 1)$ 上处处等于零。这等价于对所有 $u \in [p, 1)$，均有：
$$
\operatorname{VaR}_u(L) = \operatorname{VaR}_p(L)
$$
由于假设 $L$ 的累积分布函数连续，分位数函数在区间 $[p, 1)$ 上保持为常数意味着：在事件 $\{L \ge \operatorname{VaR}_p(L)\}$ 发生的条件下，损失变量 $L$ 取值的条件支撑集退化为一个单点。换言之，损失 $L$ 在截断分位数右侧几乎必然退化为常数 $\operatorname{VaR}_p(L)$。充分性与必要性均获证。

□

在常见错误做法中，许多初学者容易忽略一般离散分布情形下 $\operatorname{ES}_p(L)$ 与简单条件期望 $\mathbb E[L \mid L > \operatorname{VaR}_p(L)]$ 的数学差异；若直接把两者混同并在概率测度存在原子点时应用条件期望定义，会导致不一致性。此外，有的推导忽视了被积函数的单调性，误认为分位数积分需要额外的可微性假设。

## 2. 
本题旨在通过离散信用违约损失模型展示风险价值违背次可加性的内在机理。设两笔贷款损失 $X_1, X_2 \sim \operatorname{Bernoulli}(q)$ 相互独立，其中违约概率 $q = 0.008$，违约损失额为 $100$ 万元，非违约损失额为 $0$。置信水平设定为 $p = 0.99$。

首先计算单个资产的风险价值。对于单笔贷款 $X_1$，其分布函数满足：
$$
\mathbb P(X_1 \le 0) = 1 - q = 0.992 \ge 0.99
$$
根据风险价值的下确界定义，累积概率达到 $0.99$ 的最小实数即为 $0$。因此单个资产的风险价值分别为：
$$
\operatorname{VaR}_{0.99}(X_1) = 0, \qquad \operatorname{VaR}_{0.99}(X_2) = 0
$$
两项资产风险价值之和为 $0$。

接下来考察等权重组合总损失 $S = X_1 + X_2$ 的概率分布。由于 $X_1$ 与 $X_2$ 相互独立，总损失 $S$ 可取的值为 $0, 100, 200$，对应的概率质量分别为：
$$
\mathbb P(S = 0) = (1-q)^2 = 0.992^2 = 0.984064
$$
$$
\mathbb P(S = 100) = 2q(1-q) = 2 \times 0.008 \times 0.992 = 0.015872
$$
$$
\mathbb P(S = 200) = q^2 = 0.008^2 = 0.000064
$$
由此可推导总损失 $S$ 的累积分布函数值：
$$
\mathbb P(S \le 0) = 0.984064 < 0.99
$$
$$
\mathbb P(S \le 100) = 0.984064 + 0.015872 = 0.999936 \ge 0.99
$$
依据风险价值的定义，使累积概率首次不小于 $0.99$ 的最小损失取值为 $100$ 万元，因此：
$$
\operatorname{VaR}_{0.99}(S) = 100
$$
对比单笔资产与组合资产的风险价值，容易得出：
$$
\operatorname{VaR}_{0.99}(S) = 100 > 0 + 0 = \operatorname{VaR}_{0.99}(X_1) + \operatorname{VaR}_{0.99}(X_2)
$$
从而严格证明了风险价值在该组合配置下不满足次可加性。

该题常见错误做法是误以为投资组合多样化必然降低风险价值，从而武断判定 $\operatorname{VaR}(S) \le \operatorname{VaR}(X_1) + \operatorname{VaR}(X_2)$。产生这一错误的本质在于没有认识到风险价值仅关注尾部某一特定分位点的位置，对尾部极值概率厚度完全不敏感，在小概率极端事件分散化聚合时反而容易跨越置信分位截断点。

## 3. 
本题探讨风险度量公理化体系中正齐次性、次可加性与凸性之间的逻辑等价关系。设映射 $\rho: \mathcal X \to \mathbb R$ 满足正齐次性公理，即对任意 $\lambda > 0$ 及 $X \in \mathcal X$ 均有 $\rho(\lambda X) = \lambda \rho(X)$。

**证明**

先证必要性。假设 $\rho$ 满足次可加性，即对任意 $X, Y \in \mathcal X$ 均有 $\rho(X+Y) \le \rho(X) + \rho(Y)$。任取 $\lambda \in [0, 1]$ 以及 $X, Y \in \mathcal X$。若 $\lambda = 0$ 或 $\lambda = 1$，凸不等式两端取值平凡相等。若 $\lambda \in (0, 1)$，利用次可加性与正齐次性可得：
$$
\rho(\lambda X + (1-\lambda)Y) \le \rho(\lambda X) + \rho((1-\lambda)Y) = \lambda \rho(X) + (1-\lambda)\rho(Y)
$$
由此证明 $\rho$ 为凸泛函。

再证充分性。假设 $\rho$ 为凸泛函，即对任意 $\lambda \in [0, 1]$ 与 $X, Y \in \mathcal X$ 均满足 $\rho(\lambda X + (1-\lambda)Y) \le \lambda \rho(X) + (1-\lambda)\rho(Y)$。任取 $X, Y \in \mathcal X$，考虑取凸组合参数 $\lambda = 1/2$。由于 $\rho$ 满足正齐次性，将自变量乘以常数 $2$ 后展开：
$$
\rho(X + Y) = \rho\left(2 \cdot \left(\frac{1}{2}X + \frac{1}{2}Y\right)\right) = 2\rho\left(\frac{1}{2}X + \frac{1}{2}Y\right)
$$
利用 $\rho$ 的凸性，有：
$$
2\rho\left(\frac{1}{2}X + \frac{1}{2}Y\right) \le 2\left(\frac{1}{2}\rho(X) + \frac{1}{2}\rho(Y)\right) = \rho(X) + \rho(Y)
$$
综合上述两式即得到 $\rho(X+Y) \le \rho(X) + \rho(Y)$，从而证明 $\rho$ 必然满足次可加性。

□

在常见错误做法中，部分解答会试图对 $\rho$ 的一阶或二阶导数形式展开分析，甚至引入类似实函数的 Hessian 矩阵半正定性来论证。这种证明方法错误地施加了函数可微性假设，脱离了现代测度与测度泛函的一般泛函分析框架。另一个典型疏漏是在利用正齐次性展开时遗漏了参数 $\lambda=0$ 与 $\lambda=1$ 的端点检验。

## 4. 
预期短缺的变分最小化表述由 Rockafellar 和 Uryasev 提出，是将尾部风险度量嵌入凸优化模型的基础数理工具。设损失随机变量 $L \in L^1(\Omega, \mathcal F, \mathbb P)$ 具有连续且严格单调递增的累积分布函数 $F_L$。定义关于实数 $s \in \mathbb R$ 的目标实值函数：
$$
g(s) = s + \frac{1}{1-p}\mathbb E\left[(L - s)^+\right]
$$

**证明**

首先利用非负随机变量期望的尾概率积分公式，展开超额损失的数学期望：
$$
\mathbb E\left[(L - s)^+\right] = \int_s^\infty (x - s)\mathrm dF_L(x) = \int_s^\infty (1 - F_L(x))\mathrm dx
$$
将此表达式代入 $g(s)$，得到：
$$
g(s) = s + \frac{1}{1-p}\int_s^\infty (1 - F_L(x))\mathrm dx
$$
依据微积分基本定理，函数 $g(s)$ 关于自变量 $s$ 处处连续可微，其一阶导数计算如下：
$$
g'(s) = 1 - \frac{1}{1-p}(1 - F_L(s))
$$
令一阶导数等于零，得到极值点的一阶最优性方程：
$$
1 - \frac{1}{1-p}(1 - F_L(s)) = 0 \iff 1 - F_L(s) = 1 - p \iff F_L(s) = p
$$
由于假设累积分布函数 $F_L$ 连续且严格单调递增，反函数 $F_L^{-1}$ 存在且单值，因此方程具有唯一的实数根：
$$
s^* = F_L^{-1}(p) = \operatorname{VaR}_p(L)
$$
进一步考察二阶导数性质。因 $F_L$ 严格单调递增，导函数 $g'(s)$ 在 $\mathbb R$ 上严格单调递增；当 $s < s^*$ 时有 $g'(s) < 0$，当 $s > s^*$ 时有 $g'(s) > 0$。因此 $g(s)$ 为严格凸函数，唯一驻点 $s^* = \operatorname{VaR}_p(L)$ 必为全局严格最小值点。

最后计算函数在极小值点处的取值。将 $s^* = \operatorname{VaR}_p(L)$ 代回，并利用变量代换 $x = F_L^{-1}(u) = \operatorname{VaR}_u(L)$：
$$
\mathbb E\left[(L - s^*)^+\right] = \int_{s^*}^\infty (x - s^*)\mathrm dF_L(x) = \int_p^1 (\operatorname{VaR}_u(L) - s^*)\mathrm du = \int_p^1 \operatorname{VaR}_u(L)\mathrm du - (1-p)s^*
$$
将其代入 $g(s^*)$ 中可得：
$$
g(s^*) = s^* + \frac{1}{1-p}\left( \int_p^1 \operatorname{VaR}_u(L)\mathrm du - (1-p)s^* \right) = \frac{1}{1-p}\int_p^1 \operatorname{VaR}_u(L)\mathrm du = \operatorname{ES}_p(L)
$$
由此证明 $\operatorname{ES}_p(L) = \min_{s \in \mathbb R} g(s)$，且极值点集合仅包含单点 $\operatorname{VaR}_p(L)$。

□

该题常见错误做法是试图在微分算子与期望算子交换时直接应用逐点微分，而忽略了在不可导点 $L=s$ 处的测度零集处理或凸次微分概念。此外，部分推导在证明极小值时没有严格说明二阶充分条件或严格凸性，遗漏了极小值点唯一性的论证。

## 5. 
Fisher–Tippett–Gnedenko 定理是极值理论的基石，确立了样本极大值在仿射规范化变换下的渐近非退化极限分布形态。设 $X_1, X_2, \dots$ 为独立同分布的实值随机变量序列，记样本块极大值为 $M_n = \max_{1 \le i \le n} X_i$。该定理陈述如下：若存在归一化常数序列 $a_n > 0$ 与 $b_n \in \mathbb R$，以及非退化累积分布函数 $H$，使得当 $n \to \infty$ 时：
$$
\mathbb P\left( \frac{M_n - b_n}{a_n} \le x \right) \to H(x)
$$
在 $H(x)$ 的所有连续点处成立，则分布函数 $H(x)$ 必属于以下三类极值分布之一：Fréchet 分布、Weibull 分布或 Gumbel 分布。

**证明**

为了将三类分布族统一参数化，引入广义极值分布形式，参数化公式定义为：
$$
H_\xi(x) = \exp\left( -(1 + \xi x)^{-1/\xi} \right), \qquad 1 + \xi x > 0
$$
其中 $\xi \in \mathbb R$ 为形状参数。在仿射位置与尺度变换下，考察其分类对应关系：
当 $\xi > 0$ 时，令 $\alpha = 1/\xi > 0$ 并进行仿射变换 $x = (y^\alpha - 1)/\xi$，公式退化为重尾型 Fréchet 分布 $\Phi_\alpha(y) = \exp(-y^{-\alpha})$，支撑集为正半轴。
当 $\xi < 0$ 时，令 $\alpha = -1/\xi > 0$ 并进行对应仿射变换，公式退化为具有有限上界的 Weibull 分布 $\Psi_\alpha(y) = \exp(-(-y)^\alpha)$。

现在详细推导当 $\xi \to 0$ 时 $H_\xi(x)$ 的逐点极限。考察幂指数内部核心部分在 $x$ 固定时的极限行为。利用自然对数与指数函数的泰勒展开：
$$
\lim_{\xi \to 0} (1 + \xi x)^{-1/\xi} = \lim_{\xi \to 0} \exp\left( -\frac{\ln(1 + \xi x)}{\xi} \right)
$$
利用 L'Hôpital 法则或对数函数在零点的一阶微商展开 $\ln(1 + t) = t + O(t^2)$，可得：
$$
\lim_{\xi \to 0} \frac{\ln(1 + \xi x)}{\xi} = \lim_{\xi \to 0} \frac{x}{1 + \xi x} = x
$$
因此：
$$
\lim_{\xi \to 0} (1 + \xi x)^{-1/\xi} = \exp(-x) = \mathrm e^{-x}
$$
由于指数映射 $t \mapsto \exp(-t)$ 在实轴上处处连续，可将极限算子移入外层指数函数内部：
$$
\lim_{\xi \to 0} H_\xi(x) = \exp\left( -\lim_{\xi \to 0} (1 + \xi x)^{-1/\xi} \right) = \exp(-\mathrm e^{-x}) = H_0(x)
$$
极限分布精确重合为标准的 Gumbel 分布函数。

□

该题常见错误做法包括混淆形状参数的正负号含义，在推导 $\xi \to 0$ 极限时忽视连续映射定理的适用边界，以及在展开三类传统极值分布时忽略了不同定义域与仿射尺度变换的具体对应关系。

## 6. 
广义 Pareto 分布是阈值超越模型的核心分布。设连续随机变量 $Y$ 服从形状参数为 $\xi < 1$、尺度参数为 $\sigma > 0$ 的广义 Pareto 分布，累积分布函数为 $G_{\xi,\sigma}(y) = 1 - (1 + \xi y/\sigma)^{-1/\xi}$，其超额生存函数为 $\bar G_{\xi,\sigma}(y) = (1 + \xi y/\sigma)^{-1/\xi}$。

**证明**

对于任意正数 $z > 0$，超额变量 $Y - z$ 在给定 $Y > z$ 条件下的条件生存分布满足：
$$
\mathbb P(Y - z > t \mid Y > z) = \frac{\mathbb P(Y > z + t)}{\mathbb P(Y > z)} = \frac{\bar G_{\xi,\sigma}(z+t)}{\bar G_{\xi,\sigma}(z)} = \frac{(1 + \xi(z+t)/\sigma)^{-1/\xi}}{(1 + \xi z/\sigma)^{-1/\xi}}
$$
将分子项分拆并进行代数重组：
$$
1 + \frac{\xi(z+t)}{\sigma} = \left( 1 + \frac{\xi z}{\sigma} \right) \left( 1 + \frac{\xi t}{\sigma + \xi z} \right)
$$
因此，两项相除后可将幂指数化简为：
$$
\mathbb P(Y - z > t \mid Y > z) = \left( 1 + \frac{\xi t}{\sigma + \xi z} \right)^{-1/\xi}
$$
该条件生存函数恰好为参数更新后的广义 Pareto 分布，其形状参数仍为 $\xi$，新的有效尺度参数为 $\sigma_z = \sigma + \xi z$。利用非负随机变量期望的尾积分公式，计算平均超额函数：
$$
e(z) = \mathbb E[Y - z \mid Y > z] = \int_0^\infty \mathbb P(Y - z > t \mid Y > z)\mathrm dt = \int_0^\infty \left( 1 + \frac{\xi t}{\sigma + \xi z} \right)^{-1/\xi}\mathrm dt
$$
在 $\xi < 1$ 且 $\xi \ne 0$ 的条件下，直接求该反常积分的原函数：
$$
e(z) = \left[ \frac{\sigma + \xi z}{\xi(1 - 1/\xi)} \left( 1 + \frac{\xi t}{\sigma + \xi z} \right)^{1 - 1/\xi} \right]_0^\infty = \frac{\sigma + \xi z}{1 - \xi}
$$
这严格证明了平均超额函数 $e(z)$ 关于阈值 $z$ 呈严格线性关系，斜率为 $\xi / (1 - \xi)$，截距为 $\sigma / (1 - \xi)$。

□

在实际金融量化分析中，样本经验平均超额图将经验平均超额值绘制为关于截断阈值 $z$ 的折线图。由上述理论证明可知，若真实分布的尾部在某阈值 $u_0$ 之上渐近服从广义 Pareto 分布，则当 $z > u_0$ 时，经验平均超额点集将呈现出稳定的近似线性排列。这一特征为实务中粗选极值建模的阈值分界点提供了直观、稳健的图形诊断标准。

该题常见错误做法是直接使用积分定义展开条件期望密度积分，容易在繁琐的分部积分中遗漏归一化条件概率分母；另一常见缺陷是未说明积分收敛条件 $\xi < 1$，当 $\xi \ge 1$ 时均值积分发散，平均超额函数并不存在。
## 7. 
在超阈值极值理论框架下，预期短缺可以通过广义 Pareto 分布与分位数闭式形式精确推导。设连续损失随机变量 $X$ 的阈值超越量 $Y = X - u \mid X > u$ 服从形状参数为 $\xi \in (0, 1)$、尺度参数为 $\sigma > 0$ 的广义 Pareto 分布，超阈值概率记为 $\zeta_u = \mathbb P(X > u)$。已知在置信水平 $p > 1 - \zeta_u$ 下的高分位风险价值满足：
$$
\operatorname{VaR}_p(X) = u + \frac{\sigma}{\xi}\left( \left( \frac{1-p}{\zeta_u} \right)^{-\xi} - 1 \right)
$$
由于 $p > 1 - \zeta_u$，有 $\operatorname{VaR}_p(X) > u$。

**证明**

从预期短缺的条件期望定义出发，将连续条件密度积分展开：
$$
\operatorname{ES}_p(X) = \mathbb E\left[ X \mid X > \operatorname{VaR}_p(X) \right] = \operatorname{VaR}_p(X) + \mathbb E\left[ X - \operatorname{VaR}_p(X) \mid X > \operatorname{VaR}_p(X) \right]
$$
记截断余量为 $z = \operatorname{VaR}_p(X) - u > 0$。由全概率公式与条件概率链式法则，考察事件包含关系 $\{X > \operatorname{VaR}_p(X)\} \subset \{X > u\}$，可知在给定 $X > \operatorname{VaR}_p(X)$ 时，必有 $X > u$。因此：
$$
\mathbb E\left[ X - \operatorname{VaR}_p(X) \mid X > \operatorname{VaR}_p(X) \right] = \mathbb E\left[ (X - u) - z \mid (X - u) > z, X > u \right]
$$
令超额变量 $Y = X - u \mid X > u$，上述条件期望等价于广义 Pareto 随机变量 $Y$ 在截断水平 $z$ 处的平均超额函数：
$$
\mathbb E\left[ Y - z \mid Y > z \right] = e(z)
$$
根据习题 6 已证结论，广义 Pareto 分布具有尺度更新保持性，其条件超额变量 $Y - z \mid Y > z$ 依然服从广义 Pareto 分布，形状参数保持为 $\xi$，有效尺度参数更新为 $\sigma_z = \sigma + \xi z$。在 $\xi \in (0, 1)$ 的前提下，该条件期望的闭式积分计算为：
$$
e(z) = \frac{\sigma + \xi z}{1 - \xi}
$$
将 $z = \operatorname{VaR}_p(X) - u$ 代入上式中：
$$
e\left( \operatorname{VaR}_p(X) - u \right) = \frac{\sigma + \xi(\operatorname{VaR}_p(X) - u)}{1 - \xi} = \frac{\xi \operatorname{VaR}_p(X) + \sigma - \xi u}{1 - \xi}
$$
将该平均超额函数代回预期短缺的最初表达式：
$$
\operatorname{ES}_p(X) = \operatorname{VaR}_p(X) + \frac{\xi \operatorname{VaR}_p(X) + \sigma - \xi u}{1 - \xi} = \frac{(1-\xi)\operatorname{VaR}_p(X) + \xi \operatorname{VaR}_p(X) + \sigma - \xi u}{1 - \xi}
$$
合并同类项，最终严格推得闭式解：
$$
\operatorname{ES}_p(X) = \frac{\operatorname{VaR}_p(X)}{1 - \xi} + \frac{\sigma - \xi u}{1 - \xi}
$$
证明完毕。

□

该题常见错误做法是直接采用无约束连续密度积分代换，由于未能识别出超额变量的无记忆尺度延伸性质，陷入复杂的积分上下限代换而推导受阻。另一常见失误是在利用平均超额公式时，误将阈值 $u$ 代替为 $0$，导致遗漏了分子中的常数修正项 $-\xi u$。

## 8. 
块极大值模型与超阈值模型是极值统计学中两套相辅相成的渐近建模范式。设母体分布属于极大值吸引场 $X \in \operatorname{MDA}(H_\xi)$，两类模型在理论性质与统计表现上呈现鲜明对比。

在样本利用率维度，块极大值模型将全样本按固定的时间区间（如年度、季度或月度）划分为若干互不重叠的数据块，在每个数据块内仅提取单一的极大值点进行 GEV 拟合，彻底舍弃了块内的所有其余观测值。当某一数据块内发生剧烈的连续崩盘时，该块内仅有最大的一笔极端损失被保留，其余次大但同样具有严重破坏性的极端损失全部被截断丢失；而在市场平静的数据块内，由于强制保留该块的最大值，反而可能引入大量不属于尾部极值的常规样本。相反，超阈值模型预先设定高阈值 $u$，保留全样本中所有超过该阈值的观测点。这种机制不仅完整保留了集群发生的极端事件信息，也彻底剔除了阈值下方的常规噪声，展现出显著更高的有效样本利用率。

在渐近偏差维度，块极大值模型的渐近偏差取决于单个块的长度 $m$。只有当块长 $m \to \infty$ 时，极大值分布才严格收敛于 GEV 分布；在有限样本下，选取过短的块长会导致严重的模型误设偏差。超阈值模型的渐近偏差则取决于阈值 $u$ 的选取高度。根据 Pickands–Balkema–de Haan 定理，只有当阈值 $u$ 趋向于母体分布端点时，条件超越分布才渐近趋向于广义 Pareto 分布。阈值选取过低会引入偏离极值渐近理论的非线性偏差，但超阈值模型允许分析师通过平均超额图和参数稳定性图进行精细连续调优。

在渐近估计方差维度，设总样本量为 $N$。块极大值模型仅能获得 $k = N/m$ 个极大值观测用于似然估计，较小的有效样本量导致极大似然估计量的渐近协方差矩阵较大，置信区间较宽。超阈值模型在合理阈值下所获得的超越量样本数通常远多于块极大值数目，极大似然估计量的渐近协方差矩阵更小，参数估计精度更高。

在金融量化风控实务中，金融崩盘或极端流动性冲击具有高度的时变集聚性与罕见性，历史深度数据本身极为宝贵。块极大值模型机械地按固定日历周期抽取数据，极易造成尾部关键信息的不可逆流失；超阈值模型能够高效捕捉时序中突发的群聚极端损失，因而成为现代极值度量的主流选择。

该题常见错误做法是将两类方法简单二元对立为非参数与参数方法，忽略了它们本质上均属于极值定理保证下的渐近参数逼近；此外，部分讨论仅停留在定性叙述，未从样本有效容量与信息论的角度说明方差压缩的统计学根源。

## 9. 
在重尾分布假设下，Hill 估计量是推断极值指数 $\xi$ 最经典且直观的半参数统计量。设样本 $X_1, \dots, X_n$ 独立同分布，其右尾满足 Pareto 型正规变化条件 $\mathbb P(X > x) = x^{-1/\xi} L(x)$，其中 $L(x)$ 为缓慢变化函数。降序排列的顺序统计量记为 $X_{(1:n)} \ge \dots \ge X_{(n:n)}$。基于前 $k$ 个最大顺序统计量的 Hill 估计量定义为：
$$
H_{k,n} = \frac{1}{k}\sum_{i=1}^k \ln X_{(i:n)} - \ln X_{(k+1:n)} = \frac{1}{k}\sum_{i=1}^k \ln\left( \frac{X_{(i:n)}}{X_{(k+1:n)}} \right)
$$

**证明**

当 $k \to \infty$ 且 $k/n \to 0$ 时，第 $k+1$ 个顺序统计量以概率收敛于分布的高阈值分位点。根据 Rényi 指数顺序统计量表示定理，对于标准 Pareto 尾部分布，条件对数比值 $\ln(X_{(i:n)}/X_{(k+1:n)})$ 的联合分布渐近等价于 $k$ 个独立同分布的均值为 $\xi = 1/\alpha$ 的指数随机变量。由弱大数定律，当有效样本容量 $k \to \infty$ 时，样本均值以概率收敛于母体数学期望：
$$
H_{k,n} \xrightarrow{\mathbb P} \xi
$$
由此证明了 Hill 估计量在条件 $k \to \infty$ 且 $k/n \to 0$ 下的弱相合性。

□

在截断阶数 $k$ 的选取准则上，存在经典的渐近偏差与渐近方差权衡关系。若设第二阶正规变化条件满足 $1 - F(x) = c x^{-1/\xi} (1 + d x^{-\beta} + o(x^{-\beta}))$，则 Hill 估计量的渐近方差由中心极限定理给出，呈反比衰减关系：
$$
\operatorname{Var}(H_{k,n}) \sim \frac{\xi^2}{k}
$$
而由于低阶样本引入了偏离严格 Pareto 幂律的低端分布形状，估计量的渐近偏差表现为随着 $k/n$ 幂次增长的函数：
$$
\operatorname{Bias}(H_{k,n}) \sim \frac{d}{1 + \xi \beta}\left( \frac{k}{n} \right)^{\xi \beta}
$$
定义渐近均方误差 $\operatorname{AMSE}(k) = \operatorname{Bias}^2(H_{k,n}) + \operatorname{Var}(H_{k,n}) = C_1 (k/n)^{2\xi\beta} + C_2 / k$。对 $k$ 求一阶微商并令其为零，即可解得极小化均方误差的理论最优阶数渐近阶为：
$$
k^* \propto n^{\frac{2\xi\beta}{2\xi\beta + 1}}
$$
在实践中，分析师通常绘制不同 $k$ 值下的 Hill 曲线（Hill Plot），通过寻找斜率接近平稳的水平平台区间来综合判定稳健的截断点。

该题常见错误做法是忽略条件 $k/n \to 0$ 的必要性，误以为包含全部样本（$k=n$）能够获得最小方差，从而引发由非尾部主体分布所主导的灾难性系统偏差；另一常见错误是混淆顺序统计量的升序与降序记号，导致对数差分的分子分母颠倒。
## 10. 
本题对比非参数经验分位数法与半参数极值外推在超高置信水平下的数理表现。设历史样本容量为 $N = 1000$，目标分位数水平为 $p = 0.999$。

若采用非参数经验分位数法，目标尾部超越概率仅为 $1 - p = 0.001$。在容量为 $N = 1000$ 的离散经验样本中，超出该阈值的理论期望样本数仅为：
$$
\mathbb E[N_{\text{exceed}}] = N(1-p) = 1000 \times 0.001 = 1
$$
此时经验分位数直接退化至样本最大值 $X_{(1:1000)}$。根据顺序统计量渐近理论，经验分位数估计量 $\hat q_p$ 的渐近方差公式为：
$$
\operatorname{Var}(\hat q_p) \approx \frac{p(1-p)}{N [f(q_p)]^2}
$$
在金融重尾损失分布下，当分位数向外层极限推进时，尾部密度函数值 $f(q_p)$ 以快于 $\sqrt{1-p}$ 的幂律速率极速衰减至零，导致分母项急剧收缩，渐近方差发生数值发散。更本质的统计学缺陷在于：当样本落入极度稀疏的泊松小样本区间（$N(1-p) \le 1$）时，中心极限定理赖以成立的大样本正态逼近完全失效，经验分布函数在最大观测值右侧赋予的概率测度恒为零，完全丧失了向样本边界之外进行连续推断的能力。

若转而采用半参数超阈值极值法，选定阈值 $u$ 使得超阈值样本量为 $N_u = 50$（对应阈值经验分位约为 $1 - 50/1000 = 0.95$）。基于广义 Pareto 分布的高分位外推估计量为：
$$
\hat q_p = u + \frac{\hat\sigma}{\hat\xi}\left( \left( \frac{N}{N_u}(1-p) \right)^{-\hat\xi} - 1 \right)
$$
利用 Delta 方法对参数向量 $(\hat\zeta_u, \hat\sigma, \hat\xi)^\top$ 展开，高分位点估计量的渐近方差具有如下形式：
$$
\operatorname{Var}(\hat q_p) \approx (\nabla_{\boldsymbol\theta} q_p)^\top \boldsymbol\Sigma_{\boldsymbol\theta} (\nabla_{\boldsymbol\theta} q_p)
$$
其中梯度向量中关于尺度和形状参数的微商均具有解析表达式，协方差矩阵 $\boldsymbol\Sigma_{\boldsymbol\theta}$ 的主要部分由 $N_u = 50$ 个超越量样本的极大似然 Fisher 信息阵反阵确定，收敛阶为 $O(1/N_u)$，方差保持有界稳定。

极值模型实现高分位外推的统计学根基在于 Pickands–Balkema–de Haan 极值渐近收敛定理。该定理保证了无论母体分布的具体非参数形态如何，只要属于极大值吸引场，其在充分高阈值之上的超额分布均渐近收敛于统一参数族的广义 Pareto 分布。极值模型将外推任务转化为对形状参数 $\xi$ 与尺度参数 $\sigma$ 的稳定参数估计，从而实现了从样本密集区（前 $5\%$ 尾部）向极端外推区（$0.1\%$ 罕见尾部）的数学平滑延伸。

该题常见错误做法是试图通过对经验分位数进行简单的样条插值来估算方差，忽视了样本外支撑集概率为零的根本缺陷；另一错误是未说明渐近方差对超阈值样本数 $N_u$ 的依赖关系。

## 11. 
稳定分布是刻画金融重尾性与自相似性的重要概率模型。设独立同分布损失序列 $X_1, \dots, X_n$ 服从对称 $\alpha$-稳定分布 $S_\alpha(\sigma, 0, 0)$，其中特征指数 $\alpha \in (1, 2)$。

**证明**

根据稳定分布的严格自相似公理，独立同分布的稳定随机变量之和依然服从同类稳定分布，且尺度参数按特征指数的倒数倍增长。对于聚合损失 $S_n = \sum_{i=1}^n X_i$，其特征函数满足：
$$
\mathbb E\left[\exp(\mathrm i t S_n)\right] = \prod_{i=1}^n \mathbb E\left[\exp(\mathrm i t X_i)\right] = \exp\left( -n |\sigma t|^\alpha \right) = \exp\left( -|\sigma n^{1/\alpha} t|^\alpha \right)
$$
这严格说明聚合损失与单期损失满足精确的分布恒等关系：
$$
S_n \stackrel{\mathrm d}{=} n^{1/\alpha} X_1
$$
由于风险价值具有位置—尺度协变性与正齐次性，对任意给定的置信水平 $p \in (0, 1)$，恒有标度变换律：
$$
\operatorname{VaR}_p(S_n) = \operatorname{VaR}_p\left( n^{1/\alpha} X_1 \right) = n^{1/\alpha} \operatorname{VaR}_p(X_1)
$$
标度关系得证。

□

在传统金融工程中，广泛使用的平方根时间法则基于独立同分布有限方差下的中心极限定理假定，认为多期风险价值按时间跨度的平方根放大：
$$
\operatorname{VaR}_p^{\text{SRT}}(S_n) = n^{1/2} \operatorname{VaR}_p(X_1)
$$
为了评估传统法则在重尾环境下的系统性低估偏差，计算真实风险价值相对于平方根法则的渐近相对误差：
$$
\operatorname{RE}(n) = \frac{\operatorname{VaR}_p(S_n) - \operatorname{VaR}_p^{\text{SRT}}(S_n)}{\operatorname{VaR}_p^{\text{SRT}}(S_n)} = \frac{n^{1/\alpha} \operatorname{VaR}_p(X_1) - n^{1/2} \operatorname{VaR}_p(X_1)}{n^{1/2} \operatorname{VaR}_p(X_1)} = n^{1/\alpha - 1/2} - 1
$$
由于特征指数 $\alpha \in (1, 2)$，幂指数满足：
$$
\frac{1}{\alpha} - \frac{1}{2} = \frac{2 - \alpha}{2\alpha} > 0
$$
当聚合时间跨度 $n \to \infty$ 时，易知：
$$
\lim_{n \to \infty} \operatorname{RE}(n) = \lim_{n \to \infty} \left( n^{\frac{2-\alpha}{2\alpha}} - 1 \right) = \infty
$$
这从数学上严格论证了：在重尾市场上，若机械套用正态分布的平方根时间规则，多期聚合风险的相对低估程度将随着时间跨度的延展呈幂律发散，引发极端资本不足风险。

该题常见错误做法是直接利用有限二阶矩方差线性相加的推导思路，而忽略了 $\alpha \in (1, 2)$ 时稳定分布的二阶矩发散，经典中心极限定理不再适用；另一错误是未对相对误差取极限，仅做有限期定性对比。

## 12. 
本题推导高斯分布下线性投资组合全局风险与边际风险贡献的解析公式。设 $d$ 维资产损失随机向量服从多元正态分布 $\boldsymbol X \sim \mathcal N(\boldsymbol\mu, \boldsymbol\Sigma)$，资产配置权重向量为 $\boldsymbol w = (w_1, \dots, w_d)^\top$。

组合总损失为线性组合 $L_{\boldsymbol w} = \boldsymbol w^\top \boldsymbol X$。由多元正态分布的线性不变性，组合损失服从一维单变量正态分布：
$$
L_{\boldsymbol w} \sim \mathcal N(\mu_{\boldsymbol w}, \sigma_{\boldsymbol w}^2)
$$
其中均值与方差分别由二次型给出：
$$
\mu_{\boldsymbol w} = \boldsymbol w^\top \boldsymbol\mu, \qquad \sigma_{\boldsymbol w} = \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}
$$
进行标准正态归一化代换 $Z = (L_{\boldsymbol w} - \mu_{\boldsymbol w})/\sigma_{\boldsymbol w} \sim \mathcal N(0, 1)$，风险价值定义为累积概率达到 $p$ 的分位数：
$$
\mathbb P\left( L_{\boldsymbol w} \le \operatorname{VaR}_p(L_{\boldsymbol w}) \right) = \Phi\left( \frac{\operatorname{VaR}_p(L_{\boldsymbol w}) - \mu_{\boldsymbol w}}{\sigma_{\boldsymbol w}} \right) = p
$$
由此解得风险价值显式表达式为：
$$
\operatorname{VaR}_p(L_{\boldsymbol w}) = \boldsymbol w^\top \boldsymbol\mu + \Phi^{-1}(p) \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}
$$
其中 $\Phi^{-1}$ 为标准正态累积分布函数的逆函数。

预期短缺定义为标准切尾期望：
$$
\operatorname{ES}_p(L_{\boldsymbol w}) = \mu_{\boldsymbol w} + \sigma_{\boldsymbol w} \mathbb E\left[ Z \mid Z > \Phi^{-1}(p) \right] = \boldsymbol w^\top \boldsymbol\mu + \sigma_{\boldsymbol w} \frac{1}{1-p}\int_{\Phi^{-1}(p)}^\infty z \phi(z)\mathrm dz
$$
由标准正态密度导数性质 $\phi'(z) = -z \phi(z)$，积分项直接可得 $\int_{\Phi^{-1}(p)}^\infty z \phi(z)\mathrm dz = \phi(\Phi^{-1}(p))$。因此预期短缺解析表达式为：
$$
\operatorname{ES}_p(L_{\boldsymbol w}) = \boldsymbol w^\top \boldsymbol\mu + \frac{\phi(\Phi^{-1}(p))}{1-p} \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}
$$

最后计算资产 $i$ 的边际风险价值 $\operatorname{MVaR}_i = \partial \operatorname{VaR}_p(L_{\boldsymbol w}) / \partial w_i$。对组合均值项求导：
$$
\frac{\partial (\boldsymbol w^\top \boldsymbol\mu)}{\partial w_i} = \mu_i
$$
对组合波动率二次型求导：
$$
\frac{\partial \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}}{\partial w_i} = \frac{1}{2\sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}} \frac{\partial (\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w)}{\partial w_i} = \frac{2(\boldsymbol\Sigma \boldsymbol w)_i}{2\sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}} = \frac{(\boldsymbol\Sigma \boldsymbol w)_i}{\sigma_{\boldsymbol w}}
$$
代入风险价值求导，得到资产 $i$ 的边际风险价值显式闭式解：
$$
\operatorname{MVaR}_i = \mu_i + \Phi^{-1}(p) \frac{(\boldsymbol\Sigma \boldsymbol w)_i}{\sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}} = \mu_i + \Phi^{-1}(p) \frac{\operatorname{Cov}(X_i, L_{\boldsymbol w})}{\sigma_{\boldsymbol w}}
$$

该题常见错误做法是在对二次型开方求偏导时遗漏了链式法则中的分母系数，导致常数项错写；另一常见错误是混淆边际风险价值 $\operatorname{MVaR}_i = \partial \operatorname{VaR}/\partial w_i$ 与成分风险价值 $\operatorname{CVaR}_i = w_i \operatorname{MVaR}_i$ 的定义。
## 13. 
本题研究基于 Euler 齐次函数定理的投资组合风险分解机制。设组合风险度量 $\rho(\boldsymbol w) = \operatorname{VaR}_p(L_{\boldsymbol w})$ 满足一阶正齐次性且关于投资权重向量 $\boldsymbol w = (w_1, \dots, w_d)^\top$ 连续可微。成分风险价值定义为权重与边际风险贡献的乘积：$\operatorname{CVaR}_i = w_i \frac{\partial \rho(\boldsymbol w)}{\partial w_i}$。

**证明**

根据正齐次性公理，对任意标量缩放因子 $\lambda > 0$，恒有恒等式：
$$
\rho(\lambda \boldsymbol w) = \lambda \rho(\boldsymbol w)
$$
由于 $\rho$ 连续可微，在上述等式两端关于变量 $\lambda$ 求一阶全导数。对左端复合函数应用多元微积分链式法则：
$$
\frac{\mathrm d}{\mathrm d\lambda}\rho(\lambda \boldsymbol w) = \sum_{i=1}^d \frac{\partial \rho(\lambda \boldsymbol w)}{\partial (\lambda w_i)} \frac{\mathrm d(\lambda w_i)}{\mathrm d\lambda} = \sum_{i=1}^d \frac{\partial \rho(\lambda \boldsymbol w)}{\partial (\lambda w_i)} w_i
$$
对等式右端求微商，直接可得：
$$
\frac{\mathrm d}{\mathrm d\lambda}(\lambda \rho(\boldsymbol w)) = \rho(\boldsymbol w)
$$
令缩放标量 $\lambda = 1$，两端导数必然相等，从而得到：
$$
\sum_{i=1}^d w_i \frac{\partial \rho(\boldsymbol w)}{\partial w_i} = \rho(\boldsymbol w)
$$
将成分风险价值定义代入，即严格证明了 Euler 风险分解恒等式：
$$
\sum_{i=1}^d \operatorname{CVaR}_i = \operatorname{VaR}_p(L_{\boldsymbol w})
$$
证明完毕。

□

在经济学与投资对冲层面，若在多头组合（$w_i > 0$）中某项资产呈现负的成分风险价值（$\operatorname{CVaR}_i < 0$），则意味着边际风险贡献 $\partial \rho/\partial w_i < 0$。这表明在该组合现有配置结构下，边际上继续增加该资产的投资权重，反而能够促使组合总风险价值下降。该资产在组合中扮演了强效对冲资产的角色，其价格变动与其他主力资产的极端损失之间存在显著的负协同或反向分散效应。

该资产完全可能产生正的期望损失（即平均意义上面临亏损）。在正态或椭圆分布框架下，边际风险价值为 $\mu_i + \Phi^{-1}(p)\operatorname{Cov}(X_i, L_{\boldsymbol w})/\sigma_{\boldsymbol w}$。即使期望损失 $\mu_i > 0$，只要协方差 $\operatorname{Cov}(X_i, L_{\boldsymbol w})$ 为绝对值足够大的负数，第二项强大的负对冲效应便足以压制正期望损失项，使得边际风险贡献与成分风险价值整体保持为负。

该题常见错误做法是将成分风险价值与条件风险价值（即预期短缺）的英文缩写混淆；另一常见错误是误以为产生对冲效应的资产在数学上必须具有负方差或负期望收益，忽视了资产配置中协方差结构的主导地位。

## 14. 
椭圆分布族拓展了经典高斯分布的对称几何性质，是均值—方差配置准则得以向广义风险度量推广的数学支撑。设资产收益向量服从严格椭圆分布族 $E_d(\boldsymbol\mu, \boldsymbol\Sigma, \psi)$。

**证明**

根据椭圆分布的特征性质，资产向量的任意非零线性组合均属于相同生成元的一维椭圆分布族。对于满足预算约束 $\boldsymbol w^\top \boldsymbol 1 = 1$ 的任意权重向量 $\boldsymbol w$，组合损失分布仅由其一维均值 $\mu_{\boldsymbol w} = \boldsymbol w^\top \boldsymbol\mu$ 与标度参数 $\sigma_{\boldsymbol w} = \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}$ 完全决定。

题目中给定的两类风险度量均满足正齐次性、平移不变性与位置—尺度协变性，因此分别表述为：
$$
\rho_1(L_{\boldsymbol w}) = -\boldsymbol w^\top \boldsymbol\mu + k_1 \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}
$$
$$
\rho_2(L_{\boldsymbol w}) = -\boldsymbol w^\top \boldsymbol\mu + k_2 \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}
$$
其中 $k_1, k_2 > 0$。现在考察任意两个满足预算约束的有效投资组合 $\boldsymbol w_A$ 与 $\boldsymbol w_B$。若它们具有相同的期望收益水平，即 $\boldsymbol w_A^\top \boldsymbol\mu = \boldsymbol w_B^\top \boldsymbol\mu$，则根据正系数单调性：
$$
\rho_1(L_{\boldsymbol w_A}) \le \rho_1(L_{\boldsymbol w_B}) \iff \sqrt{\boldsymbol w_A^\top \boldsymbol\Sigma \boldsymbol w_A} \le \sqrt{\boldsymbol w_B^\top \boldsymbol\Sigma \boldsymbol w_B} \iff \rho_2(L_{\boldsymbol w_A}) \le \rho_2(L_{\boldsymbol w_B})
$$
这意味着在固定期望收益下，极小化 $\rho_1$ 与极小化 $\rho_2$ 均完全等价于极小化椭圆尺度二次型 $\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w$。

更一般地，对于预算可行域上的任意两两均值—方差有效前沿组合，任选投资效用无差异曲线，由于均值与尺度标准差在两个度量中仅相差一个正的缩放常数比例因子 $k_1/k_2$，两类风险度量在 $(\mu, \sigma)$ 空间中诱导的等风险线均为严格直线族。因此，任何在 $\rho_1$ 意义下占优的组合在消除尺度变换后在 $\rho_2$ 意义下保持完全一致的几何切点与 Pareto 有效排序。由此证明两类度量诱导的最优资产配置排序完全一致。

□

该题常见错误做法是试图在任意一般非对称重尾分布下证明该结论，忽略了等价排序严格依赖于线性组合保持一维单参数分布族形态的椭圆几何假设；另一错误是没有明确区分预算约束下的有效前沿等价性与任意非有效组合的直接数值差异。

## 15. 
尾部相依系数衡量多元变量在极值区域同步发生极端事件的渐近概率。设双变量随机向量 $(X_1, X_2)$ 的相依结构由参数为 $\rho \in (-1, 1)$ 的高斯 Copula $C_\rho^{\text{Gauss}}$ 联结。

**证明**

根据对称性，上尾相依系数 $\lambda_U$ 与下尾相依系数 $\lambda_L$ 在高斯 Copula 下严格相等。上尾相依系数定义为：
$$
\lambda_U = \lim_{u \downarrow 0} \frac{1 - 2(1-u) + C_\rho^{\text{Gauss}}(1-u, 1-u)}{u} = \lim_{v \uparrow 1} \frac{\bar C_\rho^{\text{Gauss}}(v, v)}{1 - v}
$$
其中 $\bar C_\rho^{\text{Gauss}}(v, v) = \mathbb P(U_1 > v, U_2 > v)$ 为生存 Copula。设标准正态分位数变换 $x = \Phi^{-1}(v)$，当 $v \uparrow 1$ 时必有 $x \to \infty$。由连续变换，边缘尾概率为 $1 - v = 1 - \Phi(x) = \bar\Phi(x)$。由此可将比值极限转化为标准二元正态随机向量 $(Z_1, Z_2)^\top \sim \mathcal N(\boldsymbol 0, \boldsymbol\Sigma_\rho)$ 的极值条件概率：
$$
\lambda_U = \lim_{x \to \infty} \frac{\mathbb P(Z_1 > x, Z_2 > x)}{\mathbb P(Z_1 > x)} = \lim_{x \to \infty} \mathbb P(Z_2 > x \mid Z_1 > x)
$$
利用二元正态分布的条件高斯分布性质，在给定 $Z_1 = z$ 时，$Z_2$ 的条件分布为 $\mathcal N(\rho z, 1 - \rho^2)$。当 $z > x$ 且 $x \to \infty$ 时，利用条件正态变量的截断积分与 Mills 比率渐近展开：
$$
\mathbb P(Z_2 > x \mid Z_1 = x) = 1 - \Phi\left( \frac{x - \rho x}{\sqrt{1 - \rho^2}} \right) = \bar\Phi\left( x \sqrt{\frac{1-\rho}{1+\rho}} \right)
$$
由于假设相关系数 $|\rho| < 1$，根号项系数恒满足 $\sqrt{(1-\rho)/(1+\rho)} > 0$。因此当 $x \to \infty$ 时，正态自变量趋向正无穷大：
$$
\lim_{x \to \infty} \bar\Phi\left( x \sqrt{\frac{1-\rho}{1+\rho}} \right) = 0
$$
通过控制收敛定理对积分区域放缩，可严格推知条件概率极限必为零：
$$
\lambda_U = 0, \qquad \lambda_L = 0
$$
严格证明了只要相关系数不等于 $1$，高斯 Copula 的尾部相依系数处处为零。

□

这一数理结论深刻揭示了 2008 年金融危机中结构化衍生品模型失效的根本原因。高斯 Copula 具备渐近尾部独立性，即使设定的线性相关系数高达 $\rho = 0.95$，当损失分位数外推至极值深水区时，两项资产同时发生超大违约的渐近条件概率在数学上依然坍缩为零。基于高斯 Copula 的 CDO 定价与风控模型严重低估了极端系统性金融危机爆发时多资产联合崩盘的相依概率，诱发了灾难性的资本短缺。

该题常见错误做法是误将线性相关系数 $\rho > 0$ 当作存在尾部相依性的证据，混淆了中心相关性与渐近尾部相依性的本质界限。
## 16. 
本题解析 Archimedean Copula 族在极值尾部非对称相依建模中的数理性质。设双变量生存 Copula 属于 Clayton Copula 族：
$$
\widehat C_\theta(u_1, u_2) = (u_1^{-\theta} + u_2^{-\theta} - 1)^{-1/\theta}, \qquad \theta > 0
$$
其中生存 Copula 的概率测度定义为 $\widehat C_\theta(u, u) = \mathbb P(U_1 > 1-u, U_2 > 1-u)$。

**证明**

根据上尾相依系数的极限定义，利用生存 Copula 的对角线公式直接展开：
$$
\lambda_U = \lim_{u \downarrow 0} \frac{\mathbb P(U_1 > 1-u, U_2 > 1-u)}{u} = \lim_{u \downarrow 0} \frac{\widehat C_\theta(u, u)}{u}
$$
将对角线形式 $\widehat C_\theta(u, u) = (2u^{-\theta} - 1)^{-1/\theta}$ 代入分式中，提取公因子 $u$：
$$
\frac{\widehat C_\theta(u, u)}{u} = \frac{(2u^{-\theta} - 1)^{-1/\theta}}{u} = \left( \frac{2u^{-\theta} - 1}{u^{-\theta}} \right)^{-1/\theta} = \left( 2 - u^\theta \right)^{-1/\theta}
$$
由于参数 $\theta > 0$，当 $u \downarrow 0$ 时，必有 $u^\theta \to 0$。因此求极限可得：
$$
\lambda_U = \lim_{u \downarrow 0} \left( 2 - u^\theta \right)^{-1/\theta} = 2^{-1/\theta}
$$
这给出了 Clayton 生存 Copula 的上尾相依系数显式解析解。

接下来考察参数为 $\theta \ge 1$ 的 Gumbel Copula：
$$
C_\theta(u_1, u_2) = \exp\left( -\left( (-\ln u_1)^\theta + (-\ln u_2)^\theta \right)^{1/\theta} \right)
$$
其对角线表达式为：
$$
C_\theta(v, v) = \exp\left( -\left( 2(-\ln v)^\theta \right)^{1/\theta} \right) = \exp\left( -2^{1/\theta}(-\ln v) \right) = v^{2^{1/\theta}}
$$
在上尾相依系数公式中令 $v = 1-u$，当 $u \downarrow 0$ 时应用一阶泰勒展开：
$$
(1-u)^{2^{1/\theta}} = 1 - 2^{1/\theta} u + O(u^2)
$$
代入上尾相依极限式进行化简：
$$
\lambda_U = \lim_{u \downarrow 0} \frac{1 - 2(1-u) + C_\theta(1-u, 1-u)}{u} = \lim_{u \downarrow 0} \frac{2u - (1 - (1-u)^{2^{1/\theta}})}{u} = 2 - 2^{1/\theta}
$$
由此解得 Gumbel Copula 的上尾相依系数为 $2 - 2^{1/\theta}$。

□

在刻画金融资产协同下行非对称性方面，两类模型体现出截然不同的结构特性。在收益率坐标系下，金融危机表现为极端的联合下行（下尾聚集）。原始 Clayton Copula 具备严格正的下尾相依 $\lambda_L = 2^{-1/\theta} > 0$，但其上尾渐近独立 $\lambda_U = 0$，非常适合捕捉资产在暴跌时协同崩溃、而在牛市上涨时相依较弱的非对称崩盘现象。相反，原始 Gumbel Copula 具备强上尾相依 $\lambda_U = 2 - 2^{1/\theta} > 0$ 而下尾独立 $\lambda_L = 0$；若要用其刻画损失端协同下行，必须取其生存变换形态（Survival Gumbel）。

该题常见错误做法是混淆原始 Copula 与生存 Copula 的定义域变换，误将 Clayton 生存 Copula 的上尾系数计算公式套用到原始 Copula 上；另一常见错误是遗漏 Gumbel Copula 参数 $\theta \ge 1$ 的理论约束边界。

## 17. 
巴塞尔资本协议从巴塞尔 II 向巴塞尔 III 及 FRTB（交易账簿基础审查）的演进，标志着全球金融监管范式从单点分位数向切尾期望的重大转型。设资产头寸损失 $L$ 服从自由度为 $\nu = 4$ 的标准化 Student-t 分布，方差标准化为 $1$。

记标准 Student-t 随机变量为 $T \sim t_4$。根据 Student-t 分布的二阶矩性质，其方差为 $\operatorname{Var}(T) = \nu / (\nu - 2) = 4 / 2 = 2$。因此标准化单位方差损失变量为：
$$
L = \frac{1}{\sqrt{2}} T
$$
在巴塞尔 II 框架下，监管资本采用置信水平为 $99\%$ 的风险价值 $\operatorname{VaR}_{0.99}(L)$。利用自由度为 $4$ 的 Student-t 分布分位数值 $t_4^{-1}(0.99) \approx 3.747$，计算可得：
$$
\operatorname{VaR}_{0.99}(L) = \frac{1}{\sqrt{2}} t_4^{-1}(0.99) \approx \frac{3.747}{1.414} \approx 2.650
$$

在巴塞尔 III 与 FRTB 框架下，监管资本采用置信水平为 $97.5\%$ 的预期短缺 $\operatorname{ES}_{0.975}(L)$。根据 Student-t 分布切尾数学期望的积分恒等式：
$$
\operatorname{ES}_p(T) = \frac{f_\nu(t_p)}{1-p} \frac{\nu + t_p^2}{\nu - 1}
$$
其中 $t_p = t_4^{-1}(0.975) \approx 2.776$。代入自由度 $\nu = 4$ 及概率密度函数值 $f_4(2.776) \approx 0.02563$：
$$
\operatorname{ES}_{0.975}(T) \approx \frac{0.02563}{0.025} \times \frac{4 + (2.776)^2}{3} \approx 1.0252 \times 3.902 \approx 4.000
$$
由此折算至标准化变量 $L$：
$$
\operatorname{ES}_{0.975}(L) = \frac{1}{\sqrt{2}} \operatorname{ES}_{0.975}(T) \approx \frac{4.000}{1.414} \approx 2.829
$$
数值对比清晰表明：$\operatorname{ES}_{0.975}(L) \approx 2.829 > \operatorname{VaR}_{0.99}(L) \approx 2.650$。

在监管转型与资本配置的边际惩罚层面，若资产损失服从轻尾的标准正态分布，$\operatorname{VaR}_{0.99}(Z) = 2.326$，而 $\operatorname{ES}_{0.975}(Z) = \phi(1.96)/0.025 \approx 2.338$，两者资本要求近乎一致。然而对于厚尾资产（如本题中的 $t_4$ 分布），虽然 FRTB 将名义置信分位由 $99\%$ 下调至 $97.5\%$，但由于预期短缺吸收了整个极端尾部的厚度信息，资本要求不降反升，增幅高达约 $6.8\%$。这一机制从监管经济学上显著提高了金融机构持有厚尾高风险头寸的边际资本成本，根除了机构利用单点 VaR 盲区进行“尾部套利”的监管套利动机。

该题常见错误做法是未对 Student-t 分布做方差为 $1$ 的标准化缩放，直接使用未归一化的 $T$ 计算资本数额；另一常见失误是误套正态分布公式近似计算 Student-t 的切尾期望。

## 18. 
Kupiec 似然比检验（无条件覆盖检验）是量化回测风险价值模型准确性的标准统计工具。设模型违约指示变量序列为 $\{I_t\}_{t=1}^T$，其中在发生超额损失时 $I_t = 1$，否则 $I_t = 0$。原假设为超额违约事件相互独立且服从成功概率为 $\alpha = 1-p$ 的伯努利试验，即 $H_0: \mathbb E[I_t] = \alpha$。记样本违约总次数为 $x = \sum_{t=1}^T I_t$。

**证明**

全样本对数似然函数为：
$$
\ln L(\alpha) = x \ln \alpha + (T - x) \ln(1 - \alpha)
$$
对参数 $\alpha$ 求一阶微商得到得分函数：
$$
S(\alpha) = \frac{\partial \ln L(\alpha)}{\partial \alpha} = \frac{x}{\alpha} - \frac{T - x}{1 - \alpha} = \frac{x - T\alpha}{\alpha(1 - \alpha)}
$$
在原假设 $H_0$ 成立时，违约总数服从二项分布 $x \sim \operatorname{Binomial}(T, \alpha)$，期望为 $\mathbb E[x] = T\alpha$，方差为 $\operatorname{Var}(x) = T\alpha(1 - \alpha)$。因此得分函数的期望为零：$\mathbb E[S(\alpha)] = 0$。Fisher 信息量为二阶对数似然期望的相反数：
$$
\mathcal I(\alpha) = \mathbb E\left[ -\frac{\partial^2 \ln L(\alpha)}{\partial \alpha^2} \right] = \frac{T}{\alpha(1 - \alpha)}
$$
根据 Lindeberg–Lévy 中心极限定理，当样本量 $T \to \infty$ 时，归一化违约偏离量渐近服从标准正态分布：
$$
\frac{x - T\alpha}{\sqrt{T\alpha(1 - \alpha)}} \xrightarrow{\mathrm d} \mathcal N(0, 1)
$$
将得分函数代入并利用 Fisher 信息量标准化，直接推得得分统计量的渐近正态性：
$$
\frac{S(\alpha)}{\sqrt{\mathcal I(\alpha)}} = \frac{x - T\alpha}{\sqrt{T\alpha(1 - \alpha)}} \xrightarrow{\mathrm d} \mathcal N(0, 1)
$$

接下来考察似然比统计量。无约束极大似然估计量为样本发生频率 $\hat\alpha = x/T$。似然比检验统计量定义为：
$$
LR_{uc} = -2 \ln \frac{L(\alpha)}{L(\hat\alpha)} = 2\left[ \ln L(\hat\alpha) - \ln L(\alpha) \right]
$$
将对数似然函数 $\ln L(\alpha)$ 在极大似然估计点 $\hat\alpha$ 处作二阶泰勒级数展开：
$$
\ln L(\alpha) = \ln L(\hat\alpha) + S(\hat\alpha)(\alpha - \hat\alpha) + \frac{1}{2} S'(\tilde\alpha)(\alpha - \hat\alpha)^2
$$
其中 $\tilde\alpha$ 介于 $\alpha$ 与 $\hat\alpha$ 之间。因 $\hat\alpha$ 为极大似然驻点，得分函数满足一阶最优性条件 $S(\hat\alpha) = 0$。又由于极大似然估计量的一致性 $\hat\alpha \xrightarrow{\mathbb P} \alpha$，根据连续映射定理与大数定律，观测信息量依概率收敛于母体 Fisher 信息量：$-S'(\tilde\alpha)/T \xrightarrow{\mathbb P} \frac{1}{\alpha(1-\alpha)}$。因此将泰勒展开代回似然比统计量中：
$$
LR_{uc} \approx - S'(\hat\alpha)(\hat\alpha - \alpha)^2 \approx \mathcal I(\alpha)(\hat\alpha - \alpha)^2 = \frac{T}{\alpha(1 - \alpha)} \left( \frac{x}{T} - \alpha \right)^2 = \left( \frac{x - T\alpha}{\sqrt{T\alpha(1 - \alpha)}} \right)^2
$$
由连续映射定理，标准正态随机变量的平方严格服从自由度为 $1$ 的卡方分布。由此严格证明了：
$$
LR_{uc} \xrightarrow{\mathrm d} \chi^2(1)
$$
证明完毕。

□

该题常见错误做法是直接套用 Wilks 定理结论而未展开具体的泰勒展开推导过程；另一典型缺陷是没有说明得分统计量在有限样本下二项分布与渐近正态性成立的大样本前提条件，当 $T\alpha < 5$ 时卡方渐近分布会产生较大误差。

## 19. 
在风险价值模型的回测体系中，Christoffersen 独立性检验依赖于一阶两状态马尔可夫链来检验违约聚集性。设违约指示变量序列 $\{I_t\}_{t=1}^T$ 服从一阶两状态 Markov 过程，状态空间为 $\{0, 1\}$，转移概率矩阵参数为 $\boldsymbol\Pi = (\pi_{ij})_{2\times 2}$。其中转移概率定义为：
$$
\pi_{ij} = \mathbb P(I_t = j \mid I_{t-1} = i), \qquad i, j \in \{0, 1\}
$$
由概率归一化条件，直接可知 $\pi_{00} = 1 - \pi_{01}$ 以及 $\pi_{10} = 1 - \pi_{11}$。

给定样本观测序列 $I_1, \dots, I_T$，记由状态 $i$ 转移至状态 $j$ 的样本转移计数为：
$$
n_{ij} = \sum_{t=2}^T \mathbf{1}_{\{I_{t-1} = i, I_t = j\}}, \qquad i, j \in \{0, 1\}
$$
条件联合似然函数（以初始状态 $I_1$ 为条件）表示为四类二元转移概率的乘积：
$$
L(\boldsymbol\Pi \mid I_1, \dots, I_T) = \mathbb P(I_1) \pi_{00}^{n_{00}} \pi_{01}^{n_{01}} \pi_{10}^{n_{10}} \pi_{11}^{n_{11}} = \mathbb P(I_1) (1 - \pi_{01})^{n_{00}} \pi_{01}^{n_{01}} (1 - \pi_{11})^{n_{10}} \pi_{11}^{n_{11}}
$$
对似然函数取自然对数，得到对数似然表达式：
$$
\ln L(\boldsymbol\Pi) = \ln \mathbb P(I_1) + n_{00}\ln(1 - \pi_{01}) + n_{01}\ln \pi_{01} + n_{10}\ln(1 - \pi_{11}) + n_{11}\ln \pi_{11}
$$

对未知参数 $\pi_{01}$ 和 $\pi_{11}$ 分别求偏微商，构造一阶得分方程组：
$$
\frac{\partial \ln L}{\partial \pi_{01}} = -\frac{n_{00}}{1 - \pi_{01}} + \frac{n_{01}}{\pi_{01}} = \frac{n_{01}(1 - \pi_{01}) - n_{00}\pi_{01}}{\pi_{01}(1 - \pi_{01})} = \frac{n_{01} - (n_{00} + n_{01})\pi_{01}}{\pi_{01}(1 - \pi_{01})}
$$
$$
\frac{\partial \ln L}{\partial \pi_{11}} = -\frac{n_{10}}{1 - \pi_{11}} + \frac{n_{11}}{\pi_{11}} = \frac{n_{11}(1 - \pi_{11}) - n_{10}\pi_{11}}{\pi_{11}(1 - \pi_{11})} = \frac{n_{11} - (n_{10} + n_{11})\pi_{11}}{\pi_{11}(1 - \pi_{11})}
$$
令两式分别等于零，直接解得无约束极大似然估计量的闭式解析解：
$$
\hat\pi_{01} = \frac{n_{01}}{n_{00} + n_{01}}
$$
$$
\hat\pi_{11} = \frac{n_{11}}{n_{10} + n_{11}}
$$
计算对数似然函数的二阶导数：
$$
\frac{\partial^2 \ln L}{\partial \pi_{01}^2} = -\frac{n_{00}}{(1 - \pi_{01})^2} - \frac{n_{01}}{\pi_{01}^2} < 0
$$
$$
\frac{\partial^2 \ln L}{\partial \pi_{11}^2} = -\frac{n_{10}}{(1 - \pi_{11})^2} - \frac{n_{11}}{\pi_{11}^2} < 0
$$
由于交叉偏导为零且二阶对角元严格为负，Hessian 矩阵处处严格负定，证明了求得的驻点必为全局唯一极大值点。

该题常见错误做法是忽略初始状态条件分解，将序列整体按非条件独立同分布概率乘积处理；另一常见错误是将计数统计量 $n_{ij}$ 误写为无转移结构的边缘总次数 $n_i$ 与 $n_j$ 的简单乘积。

## 20. 
逆压力测试从目标风险结果出发，反向寻找诱发系统性灾难的最小可能市场扰动。设组合损失函数由 Delta-Gamma 二阶泰勒展开近似给出：
$$
L(\Delta\boldsymbol z) \approx \boldsymbol\delta^\top \Delta\boldsymbol z + \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Gamma \Delta\boldsymbol z
$$
扰动向量服从零均值多元高斯分布 $\Delta\boldsymbol Z \sim \mathcal N(\boldsymbol 0, \boldsymbol\Sigma)$。最小马氏距离逆压力测试寻求使损失超过临界阈值 $L_{\text{crit}}$ 的最可几扰动，优化问题形式化为：
$$
\min_{\Delta\boldsymbol z \in \mathbb R^n} \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Sigma^{-1} \Delta\boldsymbol z \qquad \text{s.t.} \quad \boldsymbol\delta^\top \Delta\boldsymbol z + \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Gamma \Delta\boldsymbol z \ge L_{\text{crit}}
$$

引入拉格朗日乘子 $\lambda \ge 0$，构造拉格朗日泛函：
$$
\mathcal L(\Delta\boldsymbol z, \lambda) = \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Sigma^{-1} \Delta\boldsymbol z - \lambda \left( \boldsymbol\delta^\top \Delta\boldsymbol z + \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Gamma \Delta\boldsymbol z - L_{\text{crit}} \right)
$$
根据非线性规划理论，最优解 $\Delta\boldsymbol z^*$ 与乘子 $\lambda^*$ 满足如下 Karush–Kuhn–Tucker（KKT）一阶条件：
1. 驻点一阶最优性条件：
$$
\nabla_{\Delta\boldsymbol z}\mathcal L = \boldsymbol\Sigma^{-1} \Delta\boldsymbol z^* - \lambda^* (\boldsymbol\delta + \boldsymbol\Gamma \Delta\boldsymbol z^*) = \boldsymbol 0
$$
2. 原问题可行性条件：
$$
\boldsymbol\delta^\top \Delta\boldsymbol z^* + \frac{1}{2} (\Delta\boldsymbol z^*)^\top \boldsymbol\Gamma \Delta\boldsymbol z^* \ge L_{\text{crit}}
$$
3. 对偶可行性条件：
$$
\lambda^* \ge 0
$$
4. 互补松弛条件：
$$
\lambda^* \left( \boldsymbol\delta^\top \Delta\boldsymbol z^* + \frac{1}{2} (\Delta\boldsymbol z^*)^\top \boldsymbol\Gamma \Delta\boldsymbol z^* - L_{\text{crit}} \right) = 0
$$

推导最优扰动向量的特征系统形式。由一阶条件重组各项：
$$
(\boldsymbol\Sigma^{-1} - \lambda^* \boldsymbol\Gamma) \Delta\boldsymbol z^* = \lambda^* \boldsymbol\delta
$$
当矩阵 $\boldsymbol\Sigma^{-1} - \lambda^* \boldsymbol\Gamma$ 严格正定时，求逆得到显式扰动解：
$$
\Delta\boldsymbol z^*(\lambda^*) = (\boldsymbol\Sigma^{-1} - \lambda^* \boldsymbol\Gamma)^{-1} (\lambda^* \boldsymbol\delta) = (\boldsymbol I - \lambda^* \boldsymbol\Sigma \boldsymbol\Gamma)^{-1} (\lambda^* \boldsymbol\Sigma \boldsymbol\delta)
$$
为了解构其谱特征，考虑广义特征值问题 $(\boldsymbol\Gamma - \kappa_i \boldsymbol\Sigma^{-1})\boldsymbol v_i = \boldsymbol 0$，或等价于对称化矩阵 $\boldsymbol\Sigma^{1/2} \boldsymbol\Gamma \boldsymbol\Sigma^{1/2}$ 的正交特征分解：
$$
\boldsymbol\Sigma^{1/2} \boldsymbol\Gamma \boldsymbol\Sigma^{1/2} = \boldsymbol V \boldsymbol\Lambda \boldsymbol V^\top
$$
令坐标代换 $\boldsymbol y = \boldsymbol\Sigma^{-1/2} \Delta\boldsymbol z$ 及 $\tilde{\boldsymbol\delta} = \boldsymbol\Sigma^{1/2} \boldsymbol\delta$，系统解耦为对角主轴形式：
$$
(\boldsymbol I - \lambda^* \boldsymbol\Lambda)\boldsymbol V^\top \boldsymbol y^* = \lambda^* \boldsymbol V^\top \tilde{\boldsymbol\delta}
$$
这表明最优扰动向量沿着 Gamma 凸曲率与波动率张成的广义主成分方向拉伸投影，最优乘子 $\lambda^*$ 由将 $\Delta\boldsymbol z^*(\lambda^*)$ 代入非线性代数边界方程 $\boldsymbol\delta^\top \Delta\boldsymbol z^* + \frac{1}{2} (\Delta\boldsymbol z^*)^\top \boldsymbol\Gamma \Delta\boldsymbol z^* = L_{\text{crit}}$ 唯一确定。

该题常见错误做法是忽略拉格朗日乘子非负约束，将不等式约束问题机械当作等式极值处理；另一严重错误是在求逆时未说明二阶充分条件要求 $\boldsymbol\Sigma^{-1} - \lambda^* \boldsymbol\Gamma \succ 0$，若该正定性被违背，驻点将退化为鞍点甚至局部最大值点。
## 21. 
风险平价配置旨在消除投资组合中的极端风险集聚，使各资产对组合总体波动率提供完全相等的风险贡献。在两资产配置中，设资产协方差矩阵为：
$$
\boldsymbol\Sigma = \begin{pmatrix}\sigma_1^2 & \rho\sigma_1\sigma_2 \\ \rho\sigma_1\sigma_2 & \sigma_2^2\end{pmatrix}, \qquad |\rho| < 1
$$
投资权重向量为 $\boldsymbol w = (w_1, w_2)^\top$。组合总体波动率度量为标准差 $\sigma(\boldsymbol w) = \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}$。

**证明**

资产 $i$ 的边际风险贡献为波动率关于权重的偏导数：
$$
\frac{\partial \sigma(\boldsymbol w)}{\partial w_i} = \frac{(\boldsymbol\Sigma \boldsymbol w)_i}{\sigma(\boldsymbol w)}
$$
资产 $i$ 的绝对风险贡献定义为权重与边际贡献的乘积：
$$
\operatorname{RC}_i = w_i \frac{\partial \sigma(\boldsymbol w)}{\partial w_i} = \frac{w_i (\boldsymbol\Sigma \boldsymbol w)_i}{\sigma(\boldsymbol w)}
$$
等风险贡献准则要求 $\operatorname{RC}_1 = \operatorname{RC}_2$。消除公分母 $\sigma(\boldsymbol w)$ 后，等式等价于：
$$
w_1 (\boldsymbol\Sigma \boldsymbol w)_1 = w_2 (\boldsymbol\Sigma \boldsymbol w)_2
$$
展开矩阵乘法各分量：
$$
(\boldsymbol\Sigma \boldsymbol w)_1 = w_1 \sigma_1^2 + w_2 \rho \sigma_1 \sigma_2
$$
$$
(\boldsymbol\Sigma \boldsymbol w)_2 = w_1 \rho \sigma_1 \sigma_2 + w_2 \sigma_2^2
$$
代入等风险贡献方程中：
$$
w_1 \left( w_1 \sigma_1^2 + w_2 \rho \sigma_1 \sigma_2 \right) = w_2 \left( w_1 \rho \sigma_1 \sigma_2 + w_2 \sigma_2^2 \right)
$$
展开两端多项式：
$$
w_1^2 \sigma_1^2 + w_1 w_2 \rho \sigma_1 \sigma_2 = w_1 w_2 \rho \sigma_1 \sigma_2 + w_2^2 \sigma_2^2
$$
等式两端同时消去完全相同的交叉相关项 $w_1 w_2 \rho \sigma_1 \sigma_2$，直接得到简洁的代数恒等式：
$$
w_1^2 \sigma_1^2 = w_2^2 \sigma_2^2
$$
在仅允许做多的投资组合中，权重均为正实数（$w_1, w_2 > 0$），两端开平方即得：
$$
w_1 \sigma_1 = w_2 \sigma_2 \implies \frac{w_1^*}{w_2^*} = \frac{\sigma_2}{\sigma_1}
$$
由于相关系数 $\rho$ 在消元过程中被完全抵消，该最优相对权重比率与资产间相关系数 $\rho$ 完全无关。

进一步推广至 $d$ 维资产协方差矩阵为严格对角阵的情形：$\boldsymbol\Sigma = \operatorname{diag}(\sigma_1^2, \dots, \sigma_d^2)$。此时各资产间完全不相关，矩阵向量积的第 $i$ 个分量退化为 $(\boldsymbol\Sigma \boldsymbol w)_i = w_i \sigma_i^2$。因此资产 $i$ 的风险贡献为：
$$
\operatorname{RC}_i = \frac{w_i^2 \sigma_i^2}{\sigma(\boldsymbol w)}
$$
由等风险贡献条件，对任意两项资产 $i$ 与 $j$，均有 $\operatorname{RC}_i = \operatorname{RC}_j$：
$$
\frac{w_i^2 \sigma_i^2}{\sigma(\boldsymbol w)} = \frac{w_j^2 \sigma_j^2}{\sigma(\boldsymbol w)} \iff w_i^2 \sigma_i^2 = w_j^2 \sigma_j^2 \iff w_i \sigma_i = w_j \sigma_j = C
$$
其中 $C > 0$ 为与资产标号无关的正实常数。解得最优权重满足：
$$
w_i^* = \frac{C}{\sigma_i} \propto \frac{1}{\sigma_i}
$$
由此严格证明了当协方差矩阵为对角阵时，等风险贡献权重恒严格反比于各资产的自身波动率。

□

该题常见错误做法是将风险平价（Equal Risk Contribution）等同于一般相关性下的波动率倒数加权（Inverse Volatility Weighting）；由上述推导可知，只有当资产两两对角不相关或具有完全相同的对称相关结构时，二者才在数学上严格等价。

## 22. 
分布鲁棒优化通过在名义测度周围设定不确定性扰动球，对冲概率模型误设与尾部极端黑天鹅风险。设名义参考损失分布为 $\mathbb P$，真实测度属于以名义分布为中心、半径为 $\eta > 0$ 的相对熵球（Kullback–Leibler 散度球）：
$$
\mathcal Q_\eta = \left\{ \mathbb Q \ll \mathbb P : \mathcal D_{KL}(\mathbb Q \parallel \mathbb P) \le \eta \right\}
$$
目标是求解最坏情景下的分布鲁棒期望损失优化问题：
$$
\sup_{\mathbb Q \in \mathcal Q_\eta} \mathbb E_{\mathbb Q}[L]
$$

**证明**

记 Radon–Nikodym 导数（密度变换核）为 $m = \frac{\mathrm d\mathbb Q}{\mathrm d\mathbb P} \ge 0$。根据测度概率归一化条件，必须满足 $\mathbb E_{\mathbb P}[m] = 1$。相对熵泛函定义为：
$$
\mathcal D_{KL}(\mathbb Q \parallel \mathbb P) = \mathbb E_{\mathbb P}[m \ln m]
$$
原优化问题转化为关于密度泛函 $m$ 的带约束变分优化问题：
$$
\sup_{m \ge 0} \mathbb E_{\mathbb P}[m L] \qquad \text{s.t.} \quad \mathbb E_{\mathbb P}[m \ln m] \le \eta, \quad \mathbb E_{\mathbb P}[m] = 1
$$
引入相对熵约束的拉格朗日乘子 $\beta > 0$ 以及概率归一化乘子 $\gamma \in \mathbb R$，建立拉格朗日泛函：
$$
\mathcal L(m, \beta, \gamma) = \mathbb E_{\mathbb P}[m L] - \frac{1}{\beta} \left( \mathbb E_{\mathbb P}[m \ln m] - \eta \right) - \gamma \left( \mathbb E_{\mathbb P}[m] - 1 \right)
$$
对密度函数 $m$ 求一阶变分导数（泛函导数）：
$$
\frac{\delta \mathcal L}{\delta m} = L - \frac{1}{\beta} (\ln m + 1) - \gamma = 0
$$
解此变分一阶方程：
$$
\ln m = \beta(L - \gamma) - 1 \implies m^* \propto \exp(\beta L)
$$
利用归一化条件 $\mathbb E_{\mathbb P}[m^*] = 1$，常数项因子被分母积分完全标准化，由此解出最坏情况测度 $\mathbb Q^*$ 的指数倾斜（Esscher 变换）显式解析形态：
$$
\frac{\mathrm d\mathbb Q^*}{\mathrm d\mathbb P} = \frac{\exp(\beta L)}{\mathbb E_{\mathbb P}[\exp(\beta L)]}
$$
这表明最坏情况测度通过以参数 $\beta$ 放大损失 $L$ 的指数权重，对尾部大额损失施加了极值倾斜加权。

将最优倾斜密度 $m^*$ 代回原目标与相对熵泛函中。根据 Donsker–Varadhan 凸对偶变分表示定理，相对熵约束下的对偶泛函具有紧凑的闭式解。原凸规划满足 Slater 强对偶性条件，原极大化问题严格等价于其对偶无约束单变量凸极小化问题：
$$
\sup_{\mathbb Q \in \mathcal Q_\eta} \mathbb E_{\mathbb Q}[L] = \inf_{\beta > 0} \left\{ \beta \eta + \frac{1}{\beta}\ln \mathbb E_{\mathbb P}[\exp(\beta L)] \right\}
$$
该对偶问题将无限维函数空间上的测度优化彻底降维为针对单标量 $\beta > 0$ 的一维光滑凸优化问题，目标函数包含线性罚项与累积母函数的缩放组合。证明完毕。

□

该题常见错误做法是混淆相对熵的方向，误写为 $\mathcal D_{KL}(\mathbb P \parallel \mathbb Q)$；正向与反向相对熵诱导的对偶测度截然不同，反向相对熵不会产生纯粹的指数倾斜形态。另一常见疏漏是未利用概率全测度为 $1$ 的归一化条件去消除拉格朗日乘子 $\gamma$。