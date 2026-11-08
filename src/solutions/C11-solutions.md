# 第11章习题参考答案与解析

## 1. 

由离散随机变量数学期望的定义，将各取值与其对应概率相乘并求和，得到
$$
\mathbb E[X] = (-2)\times\frac{1}{6} + 0\times\frac{1}{3} + 1\times\frac{1}{4} + 3\times\frac{1}{4} = -\frac{1}{3} + 0 + \frac{1}{4} + \frac{3}{4} = \frac{2}{3}.
$$
类似地，由无意识统计学家法则计算二阶原点矩：
$$
\mathbb E[X^2] = (-2)^2\times\frac{1}{6} + 0^2\times\frac{1}{3} + 1^2\times\frac{1}{4} + 3^2\times\frac{1}{4} = 4\times\frac{1}{6} + 0 + 1\times\frac{1}{4} + 9\times\frac{1}{4} = \frac{2}{3} + \frac{5}{2} = \frac{19}{6}.
$$
按方差的原始定义，方差为偏差平方的数学期望：
$$
\operatorname{Var}(X) = \mathbb E\bigl[(X - \mathbb E[X])^2\bigr] = \sum_{i} (x_i - \mathbb E[X])^2 p_i.
$$
代入具体数值逐项计算，各点的偏差平方与概率乘积分别为：
$$
\left(-2 - \frac{2}{3}\right)^2\times\frac{1}{6} = \frac{64}{9}\times\frac{1}{6} = \frac{32}{27},
$$
$$
\left(0 - \frac{2}{3}\right)^2\times\frac{1}{3} = \frac{4}{9}\times\frac{1}{3} = \frac{4}{27},
$$
$$
\left(1 - \frac{2}{3}\right)^2\times\frac{1}{4} = \frac{1}{9}\times\frac{1}{4} = \frac{1}{36},
$$
$$
\left(3 - \frac{2}{3}\right)^2\times\frac{1}{4} = \frac{49}{9}\times\frac{1}{4} = \frac{49}{36}.
$$
合并同分母项，
$$
\operatorname{Var}(X) = \left(\frac{32}{27} + \frac{4}{27}\right) + \left(\frac{1}{36} + \frac{49}{36}\right) = \frac{36}{27} + \frac{50}{36} = \frac{4}{3} + \frac{25}{18} = \frac{49}{18}.
$$
另一方面，利用计算公式 $\operatorname{Var}(X) = \mathbb E[X^2] - (\mathbb E[X])^2$ 计算：
$$
\mathbb E[X^2] - (\mathbb E[X])^2 = \frac{19}{6} - \left(\frac{2}{3}\right)^2 = \frac{19}{6} - \frac{4}{9} = \frac{57 - 8}{18} = \frac{49}{18}.
$$
两种途径所得结果完全一致，验证了方差计算公式的正确性。

常见错误做法分析：其一，在计算 $\mathbb E[X^2]$ 时误将负数的平方算成负数，例如将 $(-2)^2$ 算作 $-4$；其二，混淆偏差平方的期望与方差计算公式，在求 $\mathbb E[X^2] - (\mathbb E[X])^2$ 时遗漏均值的平方运算，误写为 $\mathbb E[X^2] - \mathbb E[X]$；其三，通分计算时发生算术失误。

## 2. 

随机变量 $X$ 在区间 $[1, 3]$ 上服从均匀分布，其概率密度函数为
$$
f(x) = \frac{1}{3 - 1}\,\mathbf 1_{[1, 3]}(x) = \frac{1}{2}\,\mathbf 1_{[1, 3]}(x).
$$
首先计算期望值 $\mathbb E[X]$ 与其倒数 $1/\mathbb E[X]$：
$$
\mathbb E[X] = \int_1^3 x\cdot\frac{1}{2}\,dx = \frac{1}{2}\left[\frac{x^2}{2}\right]_1^3 = \frac{9 - 1}{4} = 2,
$$
因此
$$
\frac{1}{\mathbb E[X]} = \frac{1}{2} = 0.5.
$$
接着由连续型随机变量函数的数学期望公式计算 $\mathbb E[1/X]$：
$$
\mathbb E\left[\frac{1}{X}\right] = \int_1^3 \frac{1}{x}\cdot\frac{1}{2}\,dx = \frac{1}{2}\bigl[\ln x\bigr]_1^3 = \frac{\ln 3 - \ln 1}{2} = \frac{\ln 3}{2} \approx \frac{1.09861}{2} \approx 0.54931.
$$
比较两者的数值可知：
$$
\mathbb E\left[\frac{1}{X}\right] = \frac{\ln 3}{2} > \frac{1}{2} = \frac{1}{\mathbb E[X]}.
$$
这一不等方向可用 Jensen 不等式严格解释。考察函数 $g(x) = 1/x$。在 $X$ 的取值范围 $(0, +\infty)$ 内，该函数的二阶导数为
$$
g''(x) = \frac{2}{x^3} > 0,
$$
故 $g(x) = 1/x$ 在正实轴上为严格凸函数。根据 Jensen 不等式，对于任意非常值的非退化随机变量 $X$ 以及严格凸函数 $g$，恒有严格不等式
$$
\mathbb E[g(X)] > g\bigl(\mathbb E[X]\bigr).
$$
将 $g(x) = 1/x$ 代入，即直接得到 $\mathbb E[1/X] > 1/\mathbb E[X]$。

常见错误做法分析：其一，直觉性地认为数学期望算子可与非线性函数互换，错误地推断 $\mathbb E[1/X] = 1/\mathbb E[X]$；其二，由于 $g(x) = 1/x$ 是单调递减函数，误将单调性与凹凸性混淆，误判其为凹函数从而得出相反的不等号；其三，在使用 Jensen 不等式时未说明 $g''(x) > 0$ 及随机变量非退化的前提条件，导致论证不完整。

## 3. 

**证明**

标准正态随机变量 $X \sim N(0, 1)$ 的概率密度函数为
$$
\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}, \quad x \in \mathbb R.
$$
对于偶数阶矩 $\mathbb E[X^{2k}]$（$k \ge 1$），按期望积分定义有
$$
\mathbb E[X^{2k}] = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{+\infty} x^{2k} e^{-x^2/2}\,dx.
$$
将被积表达式改写为 $x^{2k-1}\cdot\bigl(x e^{-x^2/2}\bigr)$，注意到 $d\bigl(-e^{-x^2/2}\bigr) = x e^{-x^2/2}\,dx$，应用分部积分法：
$$
\mathbb E[X^{2k}] = \frac{1}{\sqrt{2\pi}}\left( \Bigl[-x^{2k-1} e^{-x^2/2}\Bigr]_{-\infty}^{+\infty} + \int_{-\infty}^{+\infty} (2k-1) x^{2k-2} e^{-x^2/2}\,dx \right).
$$
由于指数衰减速度远快于任意多项式增长速度，对任意固定整数 $k \ge 1$，边界项满足
$$
\lim_{x \to +\infty} x^{2k-1} e^{-x^2/2} = 0, \quad \lim_{x \to -\infty} x^{2k-1} e^{-x^2/2} = 0,
$$
故边界项完全为零。积分项提取常数因子 $2k-1$ 后，剩余部分恰为 $X^{2k-2}$ 的期望，因此递推公式
$$
\mathbb E[X^{2k}] = (2k-1)\,\mathbb E[X^{2k-2}]
$$
成立。

□

从零阶矩 $\mathbb E[X^0] = \mathbb E[1] = 1$ 出发，依次应用上述递推关系：
$$
\mathbb E[X^2] = (2\times 1 - 1)\,\mathbb E[X^0] = 1\times 1 = 1,
$$
$$
\mathbb E[X^4] = (2\times 2 - 1)\,\mathbb E[X^2] = 3\times 1 = 3,
$$
$$
\mathbb E[X^6] = (2\times 3 - 1)\,\mathbb E[X^4] = 5\times 3 = 15.
$$
由此得出 $\mathbb E[X^6] = 15$。一般地，标准正态分布的偶数阶原点矩由双阶乘给出：$\mathbb E[X^{2k}] = (2k-1)!!$。

对于一切奇数阶矩 $\mathbb E[X^{2k+1}]$（$k \ge 0$），其积分表达式为
$$
\mathbb E[X^{2k+1}] = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{+\infty} x^{2k+1} e^{-x^2/2}\,dx.
$$
考察被积函数 $h(x) = x^{2k+1} e^{-x^2/2}$，易知 $h(-x) = (-x)^{2k+1} e^{-(-x)^2/2} = -x^{2k+1} e^{-x^2/2} = -h(x)$，即 $h(x)$ 为全实轴上的奇函数。同时，由积分收敛性检验：
$$
\int_0^{+\infty} |x^{2k+1}| e^{-x^2/2}\,dx = \int_0^{+\infty} x^{2k+1} e^{-x^2/2}\,dx < +\infty,
$$
积分在全实轴上绝对收敛。奇函数在关于原点对称区间上的绝对收敛积分必然为零，因此对所有整数 $k \ge 0$，一切奇数阶矩均严格为零。

常见错误做法分析：其一，在分部积分推导中未显式检验边界极限 $\lim_{x\to\pm\infty} x^{2k-1}e^{-x^2/2} = 0$，跳步默认边界项消失；其二，混淆双阶乘与普通阶乘，误将 $(2k-1)!!$ 算作 $(2k-1)!$；其三，在论证奇数阶矩为零时，仅根据被积函数为奇函数即断言积分为零，忽略了验证绝对收敛性（若积分不收敛，柯西主值即使为零，数学期望也不存在）。

## 4. 

**证明**

设随机变量 $X \sim \operatorname{Poisson}(\lambda)$，其分布律为 $\mathbb P(X = x) = e^{-\lambda} \frac{\lambda^x}{x!}$（$x = 0, 1, 2, \ldots$）。根据数学期望的定义，
$$
\mathbb E[X^{k+1}] = \sum_{x=0}^{\infty} x^{k+1} e^{-\lambda} \frac{\lambda^x}{x!}.
$$
当 $x = 0$ 时，被求和项为 $0\times e^{-\lambda} \lambda^0/0! = 0$，故求和下限可从 $x = 1$ 开始。利用 $x/x! = 1/(x-1)!$，得
$$
\mathbb E[X^{k+1}] = \sum_{x=1}^{\infty} x^k e^{-\lambda} \frac{\lambda^x}{(x-1)!} = \lambda \sum_{x=1}^{\infty} x^k e^{-\lambda} \frac{\lambda^{x-1}}{(x-1)!}.
$$
令求和指标作平移变换 $y = x - 1$。当 $x$ 从 $1$ 趋于 $\infty$ 时，$y$ 从 $0$ 趋于 $\infty$，且 $x = y + 1$。代入得
$$
\mathbb E[X^{k+1}] = \lambda \sum_{y=0}^{\infty} (y+1)^k e^{-\lambda} \frac{\lambda^y}{y!}.
$$
右侧级数的形式恰为随机变量 $Y \sim \operatorname{Poisson}(\lambda)$ 的函数 $(Y+1)^k$ 的数学期望，即
$$
\mathbb E[X^{k+1}] = \lambda\,\mathbb E[(X+1)^k].
$$

□

基于该递推关系以及零阶矩 $\mathbb E[X^0] = \mathbb E[1] = 1$，依次递推计算低阶矩：
取 $k = 0$，得到一阶矩：
$$
\mathbb E[X] = \lambda\,\mathbb E[(X+1)^0] = \lambda\,\mathbb E[1] = \lambda.
$$
取 $k = 1$，计算二阶矩 $\mathbb E[X^2]$：
$$
\mathbb E[X^2] = \lambda\,\mathbb E[X+1] = \lambda\bigl(\mathbb E[X] + 1\bigr) = \lambda(\lambda + 1) = \lambda^2 + \lambda.
$$
取 $k = 2$，展开二阶二项式后计算三阶矩 $\mathbb E[X^3]$：
$$
\mathbb E[X^3] = \lambda\,\mathbb E\bigl[(X+1)^2\bigr] = \lambda\,\mathbb E\bigl[X^2 + 2X + 1\bigr] = \lambda\bigl(\mathbb E[X^2] + 2\mathbb E[X] + 1\bigr).
$$
将已得的一阶矩与二阶矩结果代入，得
$$
\mathbb E[X^3] = \lambda\bigl((\lambda^2 + \lambda) + 2\lambda + 1\bigr) = \lambda\bigl(\lambda^2 + 3\lambda + 1\bigr) = \lambda^3 + 3\lambda^2 + \lambda.
$$

常见错误做法分析：其一，在约去分母 $x!$ 时未先分离 $x=0$ 的零项，导致形式上出现 $(-1)!$ 的无意义记号；其二，在指标平移 $y = x-1$ 时，遗漏对幂项 $x^k$ 的替换，误写成 $y^k$；其三，在计算 $\mathbb E[(X+1)^2]$ 时错误地线性拆分为 $(\mathbb E[X]+1)^2$，遗漏了非线性方差项。

## 5. 

矩生成函数定义为 $M(t) = \mathbb E[e^{tX}] = (1-2t)^{-3/2}$（$t < 1/2$）。

方法一（对数求导法）：
引入累积量生成函数 $K(t) = \ln M(t)$。由于
$$
K(t) = \ln\bigl((1-2t)^{-3/2}\bigr) = -\frac{3}{2}\ln(1-2t),
$$
对 $t$ 求一阶导数：
$$
K'(t) = -\frac{3}{2}\cdot\frac{-2}{1-2t} = \frac{3}{1-2t} = 3(1-2t)^{-1}.
$$
在 $t = 0$ 处取值，即得期望：
$$
\mathbb E[X] = K'(0) = 3.
$$
对 $K'(t)$ 继续求导：
$$
K''(t) = 3(-1)(1-2t)^{-2}(-2) = \frac{6}{(1-2t)^2} = 6(1-2t)^{-2}.
$$
在 $t = 0$ 处取值，即得方差：
$$
\operatorname{Var}(X) = K''(0) = 6.
$$

方法二（幂级数展开法）：
利用广义二项式展开公式 $(1-u)^{-\alpha} = 1 + \alpha u + \frac{\alpha(\alpha+1)}{2}u^2 + o(u^2)$，此处 $\alpha = 3/2$，$u = 2t$：
$$
M(t) = 1 + \frac{3}{2}(2t) + \frac{\frac{3}{2}\times\frac{5}{2}}{2}(2t)^2 + o(t^2) = 1 + 3t + \frac{15}{2}t^2 + o(t^2).
$$
将该展开式与矩生成函数的 Maclaurin 展开 $M(t) = 1 + \mathbb E[X]t + \frac{1}{2}\mathbb E[X^2]t^2 + o(t^2)$ 逐项对照：
$$
\mathbb E[X] = 3, \quad \frac{1}{2}\mathbb E[X^2] = \frac{15}{2} \implies \mathbb E[X^2] = 15.
$$
由此求得方差为 $\operatorname{Var}(X) = \mathbb E[X^2] - (\mathbb E[X])^2 = 15 - 3^2 = 6$。

分布识别：
自由度为 $k$ 的卡方分布 $\chi^2(k)$（等价于 Gamma 分布 $\operatorname{Gamma}(k/2, 1/2)$）的矩生成函数为
$$
M_{\chi^2(k)}(t) = (1-2t)^{-k/2}, \quad t < \frac{1}{2}.
$$
对比指数可知 $-k/2 = -3/2$，解得 $k = 3$。由矩生成函数与概率分布的一一对应性，随机变量 $X$ 严格服从自由度为 $3$ 的卡方分布，记作 $X \sim \chi^2(3)$。

常见错误做法分析：其一，使用复合函数求导时遗漏内层函数 $-2t$ 导数中的负号，导致一阶矩或方差出现负数；其二，混淆二阶导数值与方差，误将 $M''(0) = 15$ 直接当作方差，漏减均值的平方；其三，在对照卡方分布矩生成函数时将指数形式记反，误将自由度判定为 $3/2$ 或 $6$。

## 6. 

**证明**

对于泊松分布情形，设 $X_i \sim \operatorname{Poisson}(\lambda_i)$（$i = 1, \ldots, n$）相互独立。单个变量 $X_i$ 的矩生成函数为
$$
M_{X_i}(t) = \mathbb E[e^{t X_i}] = \sum_{x=0}^{\infty} e^{tx} e^{-\lambda_i} \frac{\lambda_i^x}{x!} = e^{-\lambda_i} \sum_{x=0}^{\infty} \frac{(\lambda_i e^t)^x}{x!} = \exp\bigl(\lambda_i(e^t - 1)\bigr).
$$
由独立性，独立和 $S = \sum_{i=1}^n X_i$ 的矩生成函数等于各分量矩生成函数的代数乘积：
$$
M_S(t) = \mathbb E\left[\exp\left(t\sum_{i=1}^n X_i\right)\right] = \prod_{i=1}^n M_{X_i}(t) = \prod_{i=1}^n \exp\bigl(\lambda_i(e^t - 1)\bigr) = \exp\left(\left(\sum_{i=1}^n \lambda_i\right)(e^t - 1)\right).
$$
上式形式为参数为 $\sum_{i=1}^n \lambda_i$ 的泊松分布矩生成函数。根据矩生成函数的唯一性定理，独立和 $S$ 仍服从泊松分布，即 $S \sim \operatorname{Poisson}\bigl(\sum_{i=1}^n \lambda_i\bigr)$。

□

**证明**

对于正态分布情形，设 $X_i \sim N(\mu_i, \sigma_i^2)$（$i = 1, \ldots, n$）相互独立。单个变量 $X_i$ 的特征函数为
$$
\varphi_{X_i}(t) = \mathbb E[e^{i t X_i}] = \exp\left(i \mu_i t - \frac{1}{2}\sigma_i^2 t^2\right).
$$
由相互独立性，独立和 $W = \sum_{i=1}^n X_i$ 的特征函数为
$$
\varphi_W(t) = \prod_{i=1}^n \varphi_{X_i}(t) = \prod_{i=1}^n \exp\left(i \mu_i t - \frac{1}{2}\sigma_i^2 t^2\right) = \exp\left(i \left(\sum_{i=1}^n \mu_i\right) t - \frac{1}{2}\left(\sum_{i=1}^n \sigma_i^2\right) t^2\right).
$$
上式形式恰为参数为均值 $\sum_{i=1}^n \mu_i$、方差 $\sum_{i=1}^n \sigma_i^2$ 的正态分布特征函数。根据特征函数的唯一性反演定理，独立和 $W$ 仍服从正态分布，即 $W \sim N\bigl(\sum_{i=1}^n \mu_i, \sum_{i=1}^n \sigma_i^2\bigr)$。

□

两种变换在“独立和识别”问题上的等价性与差异比较：
矩生成函数与特征函数的共同机制在于将卷积运算转化为简单的代数乘积，使得独立和的分布推导极其简洁。只要矩生成函数在包含原点的邻域内收敛，两者在分布识别上完全等价，且通过解析延拓满足 $\varphi_X(t) = M_X(i t)$。两者的核心区别在于适用范围：特征函数基于虚指数变换，由于被积模长 $|e^{itX}| \le 1$ 恒成立，对全实轴上任意概率测度皆处处存在且一致连续；而矩生成函数在重尾分布（如柯西分布、帕累托分布）下可能在原点以外处处发散。因此，在分析轻尾分布时矩生成函数更为直观，而在建立普遍极限理论时特征函数更具通用性。

常见错误做法分析：其一，在拆分期望乘积 $\mathbb E[\prod e^{tX_i}] = \prod \mathbb E[e^{tX_i}]$ 时未明确指明独立性前提；其二，在求得变换表达式后直接给出结论，未援引矩生成函数或特征函数的唯一性定理作为逻辑依据；其三，混淆特征函数的虚数单位 $i$ 与求导关系，在正态分布特征函数的方差项中误写为正号。
## 7. 

已知非负随机变量 $X \ge 0$ 满足 $\mathbb E[X] = 1$ 且 $\mathbb E[X^2] = 4$。其方差为
$$
\operatorname{Var}(X) = \mathbb E[X^2] - (\mathbb E[X])^2 = 4 - 1^2 = 3.
$$
现针对事件 $\{X \ge 3\}$ 分别应用三种不等式进行上界估计：

其一，一阶 Markov 不等式。由于 $X \ge 0$ 几乎必然成立，直接应用 Markov 不等式：
$$
\mathbb P(X \ge 3) \le \frac{\mathbb E[X]}{3} = \frac{1}{3} \approx 0.3333.
$$

其二，二阶矩形式的 Markov 不等式。由于 $X \ge 0$，事件 $\{X \ge 3\}$ 等价于 $\{X^2 \ge 3^2\} = \{X^2 \ge 9\}$。对非负随机变量 $X^2$ 应用 Markov 不等式：
$$
\mathbb P(X \ge 3) = \mathbb P(X^2 \ge 9) \le \frac{\mathbb E[X^2]}{9} = \frac{4}{9} \approx 0.4444.
$$

其三，双侧 Chebyshev 不等式。注意到偏差事件 $\{X \ge 3\} = \{X - 1 \ge 2\} \subseteq \{|X - 1| \ge 2\}$。应用 Chebyshev 不等式：
$$
\mathbb P(X \ge 3) \le \mathbb P(|X - 1| \ge 2) \le \frac{\operatorname{Var}(X)}{2^2} = \frac{3}{4} = 0.75.
$$

比较上述三个上界可知，一阶 Markov 不等式给出的界最紧（$1/3 < 4/9 < 3/4$）。

原因分析：
高阶矩不等式通常在极远尾部（即阈值 $a$ 显著大于均值且偏离多倍标准差时）具有更快的渐近衰减速度；但在本题所给的中等偏离位置（$a = 3$，偏离均值 $2$，仅约 $2/\sqrt{3} \approx 1.15$ 个标准差），一阶界表现最佳。一方面，Chebyshev 不等式控制的是双侧对称偏差 $\{|X-1| \ge 2\} = \{X \ge 3\} \cup \{X \le -1\}$，而由 $X \ge 0$ 可知左侧事件 $\{X \le -1\}$ 为不可能事件，双侧界将非对称的单侧问题对称化处理，包含了不存在的左尾概率，因而界最松弛；另一方面，二阶矩 $\mathbb E[X^2] = 4$ 相对于均值的平方 $(\mathbb E[X])^2 = 1$ 较大（方差占比高），在平方放大后比值 $4/9$ 超过了一阶比值 $1/3$。

常见错误做法分析：其一，思维定式地认为 Chebyshev 不等式利用了二阶信息就必然严于仅利用一阶信息的 Markov 不等式，未经验证直接断言 Chebyshev 界最紧；其二，在写 Chebyshev 不等式时混淆偏差距离，错误地写成 $\operatorname{Var}(X)/3^2 = 3/9 = 1/3$，忽略了均值 $\mu = 1$ 带来的中心平移；其三，遗漏 $X \ge 0$ 的非负性检验。

## 8. 

设样本均值为 $\bar X_n = \frac{1}{n} \sum_{i=1}^n X_i$。由数学期望的线性性与独立同分布下方差的可加性，样本均值的期望与方差分别为
$$
\mathbb E[\bar X_n] = \mu, \quad \operatorname{Var}(\bar X_n) = \frac{\operatorname{Var}(X_1)}{n} = \frac{\sigma^2}{n}.
$$
对任意给定允许偏差 $\varepsilon > 0$，应用 Chebyshev 不等式有
$$
\mathbb P(|\bar X_n - \mu| \ge \varepsilon) \le \frac{\operatorname{Var}(\bar X_n)}{\varepsilon^2} = \frac{\sigma^2}{n \varepsilon^2}.
$$
为保证该概率不超过容许上限 $0.01$，只需令上界满足
$$
\frac{\sigma^2}{n \varepsilon^2} \le 0.01.
$$
解得样本量所须满足的理论下限为
$$
n \ge \frac{\sigma^2}{0.01 \varepsilon^2} = \frac{100 \sigma^2}{\varepsilon^2}.
$$

第一种情形：取偏差水平 $\varepsilon = 0.1\sigma$。代入不等式得
$$
n \ge \frac{100 \sigma^2}{(0.1\sigma)^2} = \frac{100 \sigma^2}{0.01 \sigma^2} = 10\,000.
$$
故使不等式成立的最小整数样本量为 $n = 10\,000$。

第二种情形：将偏差水平调整为更严格的 $\varepsilon' = 0.01\sigma$。代入得
$$
n' \ge \frac{100 \sigma^2}{(0.01\sigma)^2} = \frac{100 \sigma^2}{0.0001 \sigma^2} = 1\,000\,000 = 10^6.
$$
最小整数样本量为 $n' = 1\,000\,000$。

样本量增长规律观察：
当允许的误差容限从 $0.1\sigma$ 缩小为 $0.01\sigma$（即测量精度提高为原先的 $10$ 倍，容限缩小为 $1/10$）时，所需的最少样本量从 $10^4$ 猛增至 $10^6$，扩大为原先的 $10^2 = 100$ 倍。这严格体现了样本量与精度平方呈反比的理论特征：$n \propto \varepsilon^{-2}$。这一二次方扩张规律是经典非参数概率界与中心极限定理中均方根收敛速率 $O(1/\sqrt{n})$ 的直接数学体现。

常见错误做法分析：其一，误将样本均值的方差写为 $\sigma^2$ 而遗漏除以 $n$，得出与样本量无关的荒谬结论；其二，在求 $(0.1)^2$ 与 $(0.01)^2$ 的幂次与倒数时算错数量级；其三，未明确说明解出的是使得 Chebyshev 保证成立的充分样本量界，而非精确概率对应的充要样本量。

## 9. 

设 $X \sim \operatorname{Exp}(\lambda)$，密度函数为 $f(x) = \lambda e^{-\lambda x}$（$x \ge 0$）。
当 $0 < t < \lambda$ 时，矩生成函数积分收敛：
$$
M_X(t) = \int_0^{+\infty} e^{tx} \lambda e^{-\lambda x}\,dx = \lambda \int_0^{+\infty} e^{-(\lambda - t)x}\,dx = \frac{\lambda}{\lambda - t}.
$$
Chernoff 界指出，对任意 $a > \mathbb E[X] = 1/\lambda$ 及参数 $t > 0$（要求 $t < \lambda$）：
$$
\mathbb P(X \ge a) \le \inf_{0 < t < \lambda} e^{-ta} M_X(t) = \inf_{0 < t < \lambda} \exp\bigl(-ta + \ln M_X(t)\bigr).
$$
定义对数矩生成函数 $\Lambda(t) = \ln M_X(t) = \ln \lambda - \ln(\lambda - t)$。目标函数为 $g(t) = -ta + \Lambda(t)$。求一阶导数并令其为零：
$$
g'(t) = -a + \Lambda'(t) = -a + \frac{1}{\lambda - t} = 0 \implies \lambda - t^* = \frac{1}{a} \implies t^* = \lambda - \frac{1}{a}.
$$
由于 $a > 1/\lambda$，最优参数满足 $0 < t^* < \lambda$。由于 $\Lambda''(t) = (\lambda - t)^{-2} > 0$，函数严格凸，$t^*$ 确为全局极小点。将最优参数 $t^*$ 代入 Chernoff 上界表达式：
$$
\mathbb P(X \ge a) \le e^{-t^* a} \frac{\lambda}{\lambda - t^*} = \exp\left(-\left(\lambda - \frac{1}{a}\right)a\right)\cdot(\lambda a) = \lambda a \exp(1 - \lambda a).
$$
这即为闭式 Chernoff 尾部上界。

在 $\lambda = 1$、$a = 5$ 处的数值比较：
其一，真实精确概率：
$$
\mathbb P(X \ge 5) = \int_5^{+\infty} e^{-x}\,dx = e^{-5} \approx 0.0067379.
$$
其二，Chernoff 界上界值：
$$
\lambda a e^{1 - \lambda a} = 1\times 5\times e^{1 - 5} = 5 e^{-4} \approx 5\times 0.0183156 \approx 0.0915782.
$$
其三，题目给出的二阶矩形式 Chebyshev 界 $\mathbb E[X^2]/a^2$：
由于指数分布二阶矩 $\mathbb E[X^2] = 2/\lambda^2 = 2$，界为
$$
\frac{\mathbb E[X^2]}{a^2} = \frac{2}{\lambda^2 a^2} = \frac{2}{1^2\times 5^2} = \frac{2}{25} = 0.0800000.
$$

数值结果对照与理论启示：
精确值为 $e^{-5} \approx 0.00674$；Chebyshev 估计值为 $0.08000$；Chernoff 估计值为 $0.09158$。在此特定点 $a = 5$ 处，Chebyshev 界略紧于 Chernoff 界，这是由于 Chernoff 界中含有一个未被渐近抵消的前置常数因子 $e^1 \approx 2.718$。然而从渐近行为考察，当 $a \to +\infty$ 时，Chebyshev 仅提供 $O(a^{-2})$ 的代数阶衰减，而 Chernoff 界提供 $O(a e^{-a})$ 的指数阶衰减。例如在 $a = 6$ 时，Chebyshev 界为 $2/36 \approx 0.0556$，而 Chernoff 界为 $6e^{-5} \approx 0.0404$ 开始反超；随着阈值继续增大，指数型衰减的 Chernoff 界将呈现压倒性优势。

常见错误做法分析：其一，在对对数矩生成函数求导时，混淆复合导数符号求错极值点 $t^*$；其二，将 $e^{-ta} M_X(t)$ 中的 $t$ 错代为非最优参数或未化简出简洁闭式；其三，误以为 Chernoff 界在任何有限点都必须严格数值小于 Chebyshev 界，忽视了短程常数因子的扰动。
## 10. 

**证明**

设 $a_1, \ldots, a_n > 0$，$p_1, \ldots, p_n \ge 0$ 且 $\sum_{i=1}^n p_i = 1$。
构造一个离散型随机变量 $X$，其取值空间为 $\{a_1, \ldots, a_n\}$，相应的概率分布律由权重确定：
$$
\mathbb P(X = a_i) = p_i, \quad i = 1, \ldots, n.
$$
由期望定义，该随机变量的数学期望为加权算术平均值：
$$
\mathbb E[X] = \sum_{i=1}^n p_i a_i.
$$
在正实轴 $(0, +\infty)$ 上考察自然对数函数 $g(x) = \ln x$。求其一阶导数与二阶导数：
$$
g'(x) = \frac{1}{x}, \quad g''(x) = -\frac{1}{x^2} < 0, \quad \forall x \in (0, +\infty).
$$
二阶导数恒为负表明 $g(x) = \ln x$ 在正实轴上是严格凹函数。对凹函数应用 Jensen 不等式，恒有
$$
\mathbb E[\ln X] \le \ln\bigl(\mathbb E[X]\bigr).
$$
将构造的随机变量 $X$ 的期望展开：
$$
\mathbb E[\ln X] = \sum_{i=1}^n p_i \ln a_i = \sum_{i=1}^n \ln\bigl(a_i^{p_i}\bigr) = \ln\left(\prod_{i=1}^n a_i^{p_i}\right).
$$
将两边代入 Jensen 不等式，得到
$$
\ln\left(\prod_{i=1}^n a_i^{p_i}\right) \le \ln\left(\sum_{i=1}^n p_i a_i\right).
$$
由于指数函数 $\exp(y)$ 在全实轴上单调严格递增，对不等式两端同时取指数函数保持不等号方向不变：
$$
\prod_{i=1}^n a_i^{p_i} \le \sum_{i=1}^n p_i a_i.
$$
加权算术—几何平均不等式证毕。

□

取等条件讨论：
由 $g(x) = \ln x$ 的严格凹性，Jensen 不等式取等号当且仅当随机变量 $X$ 为退化随机变量，即存在常数 $c$ 使得
$$
X = c
$$
几乎必然成立。这意味着在所有赋予正概率 $p_i > 0$ 的分量上，各个数值必须完全相等：对任意满足 $p_i > 0$ 与 $p_j > 0$ 的下标 $i, j$，恒有 $a_i = a_j$。特别地，若对所有 $i = 1, \ldots, n$ 都有 $p_i > 0$，则取等号的充要条件为 $a_1 = a_2 = \cdots = a_n$。

常见错误做法分析：其一，误用负对数函数 $-\ln x$ 时混淆不等号方向；其二，在得到对数不等式后未说明指数函数单调递增的前提即去对数；其三，在叙述取等条件时未限定 $p_i > 0$，忽略了若某些 $p_k = 0$，对应的 $a_k$ 可以取任意正值而不破坏等号成立。

## 11. 

**证明**

设随机变量 $X, Y$ 满足二阶矩有限：$\mathbb E[X^2] < \infty$ 且 $\mathbb E[Y^2] < \infty$。记均值为 $\mu_X = \mathbb E[X]$、$\mu_Y = \mathbb E[Y]$，并作中心化：
$$
\tilde X = X - \mu_X, \quad \tilde Y = Y - \mu_Y.
$$
此时 $\mathbb E[\tilde X] = 0$，$\mathbb E[\tilde Y] = 0$，方差为 $\sigma_X^2 = \mathbb E[\tilde X^2]$、$\sigma_Y^2 = \mathbb E[\tilde Y^2]$，协方差为 $\operatorname{Cov}(X, Y) = \mathbb E[\tilde X \tilde Y]$。

若 $\sigma_X = 0$，则 $\tilde X = 0$ 几乎必然，此时 $\operatorname{Cov}(X, Y) = \mathbb E[0\cdot \tilde Y] = 0$，不等式 $|\operatorname{Cov}(X, Y)| \le \sigma_X \sigma_Y$ 退化为 $0 \le 0$ 平凡成立。以下设 $\sigma_X > 0$ 且 $\sigma_Y > 0$。

对任意实参数 $\lambda \in \mathbb R$，考察非负实值随机变量 $(\lambda \tilde X + \tilde Y)^2 \ge 0$。根据数学期望的非负性与线性可加性：
$$
Q(\lambda) = \mathbb E\bigl[(\lambda \tilde X + \tilde Y)^2\bigr] = \lambda^2 \mathbb E[\tilde X^2] + 2\lambda \mathbb E[\tilde X \tilde Y] + \mathbb E[\tilde Y^2] = \sigma_X^2 \lambda^2 + 2\operatorname{Cov}(X, Y)\lambda + \sigma_Y^2 \ge 0.
$$
$Q(\lambda)$ 是关于实变量 $\lambda$ 的一元二次多项式，其最高次项系数 $\sigma_X^2 > 0$。由于对一切 $\lambda \in \mathbb R$ 恒有 $Q(\lambda) \ge 0$，该一元二次方程至多具有一个实根，因而判别式必须小于或等于零：
$$
\Delta = \bigl(2\operatorname{Cov}(X, Y)\bigr)^2 - 4\sigma_X^2 \sigma_Y^2 = 4\Bigl((\operatorname{Cov}(X, Y))^2 - \sigma_X^2 \sigma_Y^2\Bigr) \le 0.
$$
两端除以正数 $4$ 即得 $(\operatorname{Cov}(X, Y))^2 \le \sigma_X^2 \sigma_Y^2$。两边开非负平方根，得到
$$
|\operatorname{Cov}(X, Y)| \le \sigma_X \sigma_Y.
$$
当 $\sigma_X > 0$ 且 $\sigma_Y > 0$ 时，两端同时除以 $\sigma_X \sigma_Y$，由相关系数定义 $\rho_{XY} = \frac{\operatorname{Cov}(X, Y)}{\sigma_X \sigma_Y}$ 直接得出
$$
|\rho_{XY}| \le 1 \implies \rho_{XY} \in [-1, 1].
$$

现证明取等条件：$|\rho_{XY}| = 1$ 的充要条件是判别式 $\Delta = 0$。判别式为零等价于二次方程 $Q(\lambda) = 0$ 存在唯一实数重根 $\lambda_0 = -\frac{\operatorname{Cov}(X, Y)}{\sigma_X^2}$。此时取 $\lambda = \lambda_0$，代入得
$$
\mathbb E\bigl[(\lambda_0 \tilde X + \tilde Y)^2\bigr] = 0.
$$
由于被求期望的随机变量非负，非负变量期望为零蕴涵其自身几乎必然为零，即
$$
\lambda_0 \tilde X + \tilde Y = 0
$$
几乎必然成立。将中心化变量还原：$\lambda_0(X - \mu_X) + (Y - \mu_Y) = 0$，整理得
$$
\lambda_0 X + Y = \lambda_0 \mu_X + \mu_Y.
$$
令常数 $\alpha = \lambda_0$、$\beta = 1$、$\gamma = \lambda_0 \mu_X + \mu_Y$，由于 $\beta = 1 \ne 0$，直接满足 $\alpha^2 + \beta^2 > 0$，并且
$$
\alpha X + \beta Y = \gamma
$$
几乎必然成立。

反之，若存在不全为零的常数 $\alpha, \beta, \gamma$ 使得 $\alpha X + \beta Y = \gamma$ 几乎必然成立。对两端取期望得 $\alpha \mu_X + \beta \mu_Y = \gamma$，两式相减得到 $\alpha \tilde X + \beta \tilde Y = 0$ 几乎必然成立。若 $\beta \ne 0$，则 $\tilde Y = -\frac{\alpha}{\beta} \tilde X$ 几乎必然，此时 $\operatorname{Cov}(X, Y) = -\frac{\alpha}{\beta}\sigma_X^2$，$\sigma_Y = \left|\frac{\alpha}{\beta}\right|\sigma_X$，代入相关系数定义得到 $\rho_{XY} = -\operatorname{sgn}(\alpha/\beta) = \pm 1$，故 $|\rho_{XY}| = 1$；若 $\beta = 0$，则由 $\alpha \ne 0$ 得 $\tilde X = 0$ 几乎必然，此即退化情形。综上，$|\rho_{XY}| = 1$ 成立当且仅当存在不全为零的常数使线性关系几乎必然成立。

□

常见错误做法分析：其一，直接对未中心化的原始变量构造 $(\lambda X + Y)^2 \ge 0$，由此导出的是 Cauchy–Schwarz 不等式 $|\mathbb E[XY]| \le \sqrt{\mathbb E[X^2]\mathbb E[Y^2]}$，而非针对中心化矩与协方差的结论；其二，在由 $\mathbb E[Z^2] = 0$ 推导 $Z = 0$ 时忽略测度论严格性，未说明“几乎必然”；其三，证明充要条件时只证充分性或必要性的单向推导。
## 12. 

**证明**

第一部分：设非负随机变量 $X \ge 0$ 满足 $\mathbb E[X^2] < \infty$。
取常值随机变量 $Y = 1$。由随机变量的 Cauchy–Schwarz 不等式：
$$
|\mathbb E[X Y]| \le \sqrt{\mathbb E[X^2]}\sqrt{\mathbb E[Y^2]}.
$$
将 $Y = 1$ 代入，易知 $\mathbb E[Y^2] = \mathbb E[1^2] = 1$。由于 $X \ge 0$，其数学期望非负 $\mathbb E[X] \ge 0$，故绝对值可直接去掉，得到
$$
\mathbb E[X] = \mathbb E[X\cdot 1] \le \sqrt{\mathbb E[X^2]}\sqrt{1} = \sqrt{\mathbb E[X^2]}.
$$

第二部分：证明 Paley–Zygmund 型不等式。
对任意给定的 $0 < \theta < 1$，定义事件 $A = \{X > \theta\,\mathbb E[X]\}$，其对立事件为 $A^c = \{X \le \theta\,\mathbb E[X]\}$。
利用指示函数将随机变量 $X$ 分解为两部分的和：
$$
X = X\,\mathbf 1_A + X\,\mathbf 1_{A^c}.
$$
对两端取数学期望：
$$
\mathbb E[X] = \mathbb E\bigl[X\,\mathbf 1_A\bigr] + \mathbb E\bigl[X\,\mathbf 1_{A^c}\bigr].
$$
在对立事件 $A^c$ 上，由于 $X \ge 0$，恒有 $0 \le X \le \theta\,\mathbb E[X]$，因此
$$
\mathbb E\bigl[X\,\mathbf 1_{A^c}\bigr] \le \mathbb E\bigl[\theta\,\mathbb E[X]\,\mathbf 1_{A^c}\bigr] = \theta\,\mathbb E[X]\,\mathbb P(A^c) \le \theta\,\mathbb E[X],
$$
最后一步放缩利用了概率的有界性 $\mathbb P(A^c) \le 1$ 以及 $\mathbb E[X] \ge 0$。移项可得第一项的严格下界：
$$
\mathbb E\bigl[X\,\mathbf 1_A\bigr] = \mathbb E[X] - \mathbb E\bigl[X\,\mathbf 1_{A^c}\bigr] \ge \mathbb E[X] - \theta\,\mathbb E[X] = (1 - \theta)\,\mathbb E[X].
$$
另一方面，对乘积项 $X\,\mathbf 1_A$ 应用 Cauchy–Schwarz 不等式：
$$
\mathbb E\bigl[X\,\mathbf 1_A\bigr] \le \sqrt{\mathbb E[X^2]}\sqrt{\mathbb E[(\mathbf 1_A)^2]} = \sqrt{\mathbb E[X^2]}\sqrt{\mathbb P(A)},
$$
此处利用了指示函数的幂等性 $(\mathbf 1_A)^2 = \mathbf 1_A$ 以及 $\mathbb E[\mathbf 1_A] = \mathbb P(A)$。两端均为非负数，同时取平方：
$$
\bigl(\mathbb E[X\,\mathbf 1_A]\bigr)^2 \le \mathbb E[X^2]\,\mathbb P(A).
$$
将此前得到的下界代入：
$$
(1 - \theta)^2\bigl(\mathbb E[X]\bigr)^2 \le \bigl(\mathbb E[X\,\mathbf 1_A]\bigr)^2 \le \mathbb E[X^2]\,\mathbb P(A).
$$
若 $\mathbb E[X^2] > 0$，两端同除以 $\mathbb E[X^2]$，即得
$$
\mathbb P(A) \ge (1 - \theta)^2\frac{(\mathbb E[X])^2}{\mathbb E[X^2]}.
$$
将事件 $A$ 的定义代入，所证 Paley–Zygmund 下界
$$
\mathbb P(X > \theta\,\mathbb E[X]) \ge (1 - \theta)^2\frac{(\mathbb E[X])^2}{\mathbb E[X^2]}
$$
成立。（若 $\mathbb E[X^2] = 0$，由 $X \ge 0$ 可得 $X = 0$ 几乎必然，此时 $\mathbb E[X] = 0$，不等式两端皆为 $0$ 平凡成立）。

□

常见错误做法分析：其一，在对指示函数应用 Cauchy–Schwarz 不等式时，未注意到 $(\mathbf 1_A)^2 = \mathbf 1_A$，误引入多余的高阶项；其二，在控制 $\mathbb E[X\mathbf 1_{A^c}]$ 时保留 $\mathbb P(A^c) = 1 - \mathbb P(A)$ 并与后续不等式联立，推导繁琐且容易在符号整理中出错，不如直接利用 $\mathbb P(A^c) \le 1$ 简洁；其三，遗漏 $\theta \in (0, 1)$ 及 $X \ge 0$ 的非负性约束说明。

## 13. 

设 $X_i$（$i = 1, \ldots, n$）独立同分布，每次掷硬币出现正面记为 $1$、反面记为 $0$。则 $X_i \sim \operatorname{Bernoulli}(1/2)$，有界于闭区间 $[a_i, b_i] = [0, 1]$，区间长度 $b_i - a_i = 1$。
正面频率为样本均值 $\hat p = \frac{1}{n} \sum_{i=1}^n X_i$。其均值与方差为
$$
\mathbb E[\hat p] = \frac{1}{2}, \quad \operatorname{Var}(\hat p) = \frac{\operatorname{Var}(X_1)}{n} = \frac{\frac{1}{2}(1 - \frac{1}{2})}{n} = \frac{1}{4n}.
$$

方法一：应用 Hoeffding 不等式。
对于独立有界随机变量序列，双侧 Hoeffding 不等式为
$$
\mathbb P\bigl(|\hat p - \mathbb E[\hat p]| \ge \varepsilon\bigr) \le 2\exp\left(-\frac{2n^2\varepsilon^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).
$$
将 $b_i - a_i = 1$ 与 $\sum_{i=1}^n (b_i - a_i)^2 = n$ 代入，得到
$$
\mathbb P\left(\left|\hat p - \frac{1}{2}\right| \ge \varepsilon\right) \le 2\exp\bigl(-2n\varepsilon^2\bigr).
$$
令允许误差 $\varepsilon = 0.05$。要求该尾概率不超过容限 $0.01$：
$$
2\exp\bigl(-2n(0.05)^2\bigr) \le 0.01 \iff \exp(-0.005 n) \le 0.005.
$$
两边取自然对数并变号：
$$
-0.005 n \le \ln(0.005) = -\ln(200) \iff 0.005 n \ge \ln(200).
$$
由于 $\ln(200) = \ln(2) + 2\ln(10) \approx 0.693147 + 4.605170 \approx 5.298317$，解得
$$
n \ge \frac{\ln(200)}{0.005} = 200 \ln(200) \approx 200\times 5.298317 \approx 1059.66.
$$
取最小整数，得 $n_{\text{Hoeffding}} = 1060$。

方法二：应用 Chebyshev 不等式。
对偏差水平 $\varepsilon = 0.05$，Chebyshev 不等式给出：
$$
\mathbb P\left(\left|\hat p - \frac{1}{2}\right| \ge \varepsilon\right) \le \frac{\operatorname{Var}(\hat p)}{\varepsilon^2} = \frac{1}{4n\varepsilon^2}.
$$
令上界满足不超过 $0.01$：
$$
\frac{1}{4n(0.05)^2} \le 0.01 \iff \frac{1}{4n\times 0.0025} \le 0.01 \iff \frac{1}{0.01 n} \le 0.01 \iff n \ge 10\,000.
$$
由此解得最小整数样本量为 $n_{\text{Chebyshev}} = 10\,000$。

样本量对比与本质原因分析：
Chebyshev 所需样本量（$10\,000$）是 Hoeffding 所需样本量（$1060$）的约 $9.43$ 倍。
导致这一巨大差异的根本原因在于两种不等式利用信息量的层次与渐近衰减机制截然不同：
Chebyshev 不等式仅利用了随机变量的二阶矩（方差），其尾部概率上界随样本量 $n$ 仅呈代数阶倒数衰减 $O(1/n)$；
而 Hoeffding 不等式充分利用了随机变量严格有界的紧支撑特性，等价于通过对矩生成函数进行最优化控制了全部高阶矩（次高斯特性），其尾部概率界随样本量 $n$ 呈指数阶加速衰减 $O(e^{-c n})$。当所要求的置信度较高、失效率极低（如本题中的 $0.01$）时，指数衰减的界能在远小于代数衰减所需的数据规模下迅速跨过精度阈值。

常见错误做法分析：其一，误用单侧 Hoeffding 不等式而漏掉前置系数 $2$，导致算出的样本量偏小；其二，在求 $\ln(0.005)$ 时遗漏负号或对数计算失误；其三，将单个样本方差 $1/4$ 与均值方差 $1/(4n)$ 混淆。
## 14. 

设随机变量 $M \in \{A, B\}$ 表示被选中的机器，其先验选择概率为
$$
\mathbb P(M = A) = \frac{2}{3}, \quad \mathbb P(M = B) = \frac{1}{3}.
$$
设随机变量 $Y$ 表示工厂的日产量。在给定机器条件下的条件分布为
$$
Y \mid (M = A) \sim N(100, 25), \quad Y \mid (M = B) \sim N(80, 36).
$$
其条件期望分别为 $\mathbb E[Y \mid M = A] = 100$、$\mathbb E[Y \mid M = B] = 80$。
应用全期望公式，日产量的总体数学期望为条件期望的加权平均：
$$
\mathbb E[Y] = \mathbb E\bigl[\mathbb E[Y \mid M]\bigr] = \mathbb E[Y \mid M = A]\,\mathbb P(M = A) + \mathbb E[Y \mid M = B]\,\mathbb P(M = B).
$$
代入数值计算：
$$
\mathbb E[Y] = 100\times\frac{2}{3} + 80\times\frac{1}{3} = \frac{200 + 80}{3} = \frac{280}{3} \approx 93.3333.
$$

日产量分布属于双成分高斯混合分布。由全概率公式的连续形式，日产量 $Y$ 的边缘概率密度函数 $f_Y(y)$ 等于各组分条件正态密度的概率凸组合：
$$
f_Y(y) = \mathbb P(M = A)\,\phi_A(y) + \mathbb P(M = B)\,\phi_B(y),
$$
其中机器 A 与 B 对应的正态密度分别为
$$
\phi_A(y) = \frac{1}{\sqrt{2\pi\times 25}}\exp\left(-\frac{(y - 100)^2}{2\times 25}\right) = \frac{1}{5\sqrt{2\pi}}\exp\left(-\frac{(y - 100)^2}{50}\right),
$$
$$
\phi_B(y) = \frac{1}{\sqrt{2\pi\times 36}}\exp\left(-\frac{(y - 80)^2}{2\times 36}\right) = \frac{1}{6\sqrt{2\pi}}\exp\left(-\frac{(y - 80)^2}{72}\right).
$$
将权重代入并合并常数系数，得到日产量的全概率密度表达式为
$$
f_Y(y) = \frac{2}{15\sqrt{2\pi}}\exp\left(-\frac{(y - 100)^2}{50}\right) + \frac{1}{18\sqrt{2\pi}}\exp\left(-\frac{(y - 80)^2}{72}\right), \quad y \in \mathbb R.
$$

常见错误做法分析：其一，误认为两个正态分布的凸组合依然服从正态分布，给出单一正态密度；其二，混淆正态密度的方差与标准差，在分母归一化系数中错写为方差 $\sigma^2$ 或在指数分母中漏乘常数 $2$；其三，遗漏选择概率权重 $2/3$ 与 $1/3$。

## 15. 

根据全方差公式，总体方差可严格正交分解为层内方差（条件方差的期望）与层间方差（条件期望的方差）：
$$
\operatorname{Var}(Y) = \mathbb E\bigl[\operatorname{Var}(Y \mid M)\bigr] + \operatorname{Var}\bigl(\mathbb E[Y \mid M]\bigr).
$$

第一部分：层内方差计算。
条件方差分别为 $\operatorname{Var}(Y \mid M = A) = 25$、$\operatorname{Var}(Y \mid M = B) = 36$。对其求期望：
$$
\mathbb E\bigl[\operatorname{Var}(Y \mid M)\bigr] = 25\times\frac{2}{3} + 36\times\frac{1}{3} = \frac{50}{3} + \frac{36}{3} = \frac{86}{3} \approx 28.6667.
$$

第二部分：层间方差计算。
条件期望离散随机变量 $\mathbb E[Y \mid M]$ 以概率 $2/3$ 取值 $100$、以概率 $1/3$ 取值 $80$，其均值为 $\mathbb E[Y] = 280/3$。
计算其相对于总均值的离差平方期望：
$$
\left(100 - \frac{280}{3}\right)^2 = \left(\frac{20}{3}\right)^2 = \frac{400}{9},
$$
$$
\left(80 - \frac{280}{3}\right)^2 = \left(-\frac{40}{3}\right)^2 = \frac{1600}{9}.
$$
加权求和得出层间方差：
$$
\operatorname{Var}\bigl(\mathbb E[Y \mid M]\bigr) = \frac{400}{9}\times\frac{2}{3} + \frac{1600}{9}\times\frac{1}{3} = \frac{800 + 1600}{27} = \frac{2400}{27} = \frac{800}{9} \approx 88.8889.
$$

第三部分：总体方差与结构占比。
将两部分相加：
$$
\operatorname{Var}(Y) = \frac{86}{3} + \frac{800}{9} = \frac{258}{9} + \frac{800}{9} = \frac{1058}{9} \approx 117.5556.
$$
各成分占比为：
层内方差占 $\frac{258/9}{1058/9} = \frac{258}{1058} \approx 24.39\%$；
层间方差占 $\frac{800/9}{1058/9} = \frac{800}{1058} \approx 75.61\%$。

总体方差大于加权平均的原因阐释：
数值 $25$ 与 $36$ 的加权平均值恰好就是层内方差 $\mathbb E[\operatorname{Var}(Y \mid M)] = 86/3 \approx 28.67$。总体方差（$117.56$）显著高于该加权平均的原因在于，除了机器内部固有的随机生产扰动外，生产系统还面临“选择哪台机器”的宏观系统性不确定性。由于两台机器的设计产能均值存在显著断层（$100$ 对 $80$），这种组间均值异质性产生了高达 $800/9 \approx 88.89$ 的层间方差。只要各子群体的期望值不同，层间方差就严格为正，从而总体方差必然严格大于各组方差的简单加权平均。

常见错误做法分析：其一，混淆全方差公式两项的次序与含义，将层内与层间混同；其二，误认为两分布混合后的总方差等于方差的加权平均，完全忽略层间方差项；其三，在计算两点分布的方差时遗漏权重系数计算错误。

## 16. 

设 $X_i$ 为第 $i$ 局的净收益，序列 $\{X_i\}$ 独立同分布，已知
$$
\mathbb E[X_1] = 0.1, \quad \operatorname{Var}(X_1) = 1.
$$
总局数 $N$ 与各局收益序列 $\{X_i\}$ 相互独立。总局数服从参数为 $p = 1/16$ 的几何分布，分布律为
$$
\mathbb P(N = k) = \left(1 - \frac{1}{16}\right)^{k-1}\left(\frac{1}{16}\right) = \left(\frac{15}{16}\right)^{k-1}\frac{1}{16}, \quad k = 1, 2, 3, \ldots
$$
由几何分布（以 $1$ 为起点的试验次数）的矩公式，其期望与方差分别为
$$
\mathbb E[N] = \frac{1}{p} = \frac{1}{1/16} = 16,
$$
$$
\operatorname{Var}(N) = \frac{1 - p}{p^2} = \frac{15/16}{(1/16)^2} = \frac{15}{16}\times 256 = 240.
$$
累计净收益为随机求和 $S_N = \sum_{i=1}^N X_i$。应用随机和矩公式（Wald 等式与 Blackwell–Girshick 方差公式）：

其一，计算累计净赢的数学期望：
由全期望公式，
$$
\mathbb E[S_N] = \mathbb E\bigl[\mathbb E[S_N \mid N]\bigr] = \mathbb E\bigl[N\,\mathbb E[X_1]\bigr] = \mathbb E[N]\,\mathbb E[X_1].
$$
代入具体数值：
$$
\mathbb E[S_N] = 16\times 0.1 = 1.6.
$$

其二，计算累计净赢的方差：
由全方差公式，
$$
\operatorname{Var}(S_N) = \mathbb E\bigl[\operatorname{Var}(S_N \mid N]\bigr] + \operatorname{Var}\bigl(\mathbb E[S_N \mid N]\bigr) = \mathbb E[N\,\operatorname{Var}(X_1)] + \operatorname{Var}(N\,\mathbb E[X_1]).
$$
提取常数项后展开：
$$
\operatorname{Var}(S_N) = \mathbb E[N]\,\operatorname{Var}(X_1) + \operatorname{Var}(N)\,\bigl(\mathbb E[X_1]\bigr)^2.
$$
代入数值逐项计算：
$$
\mathbb E[N]\,\operatorname{Var}(X_1) = 16\times 1 = 16,
$$
$$
\operatorname{Var}(N)\,\bigl(\mathbb E[X_1]\bigr)^2 = 240\times (0.1)^2 = 240\times 0.01 = 2.4.
$$
将两部分合并：
$$
\operatorname{Var}(S_N) = 16 + 2.4 = 18.4.
$$

常见错误做法分析：其一，误用非位移几何分布（从 $0$ 起算）的矩公式，将 $\mathbb E[N]$ 错算为 $(1-p)/p = 15$；其二，在计算随机和方差时，错误地照搬确定性常数项求和公式，得出 $\operatorname{Var}(S_N) = \mathbb E[N]\operatorname{Var}(X_1) = 16$，遗漏了局数随机波动带来的方差贡献项 $\operatorname{Var}(N)(\mathbb E[X_1])^2$；其三，将 $(\mathbb E[X_1])^2$ 误写为二阶矩 $\mathbb E[X_1^2]$。
## 17. 

设对数收益为 $Y = \ln(1+R)$，已知 $Y \sim N(\mu_Y, \sigma_Y^2)$，其中参数为
$$
\mu_Y = 0.04, \quad \sigma_Y = 0.15, \quad \sigma_Y^2 = 0.15^2 = 0.0225.
$$
由此可知总收益率因子 $1+R = e^Y$ 服从对数正态分布。

其一，计算几何平均收益 $R_g$：
根据定义，几何平均收益由对数收益的期望确定：
$$
R_g = e^{\mathbb E[\ln(1+R)]} - 1 = e^{\mu_Y} - 1 = e^{0.04} - 1 \approx 1.0408108 - 1 = 0.0408108 \approx 4.0811\%.
$$

其二，计算算术平均收益 $\mathbb E[R]$：
利用正态变量矩生成函数公式 $\mathbb E[e^{tY}] = \exp\bigl(t\mu_Y + \frac{1}{2}t^2\sigma_Y^2\bigr)$，取 $t = 1$：
$$
\mathbb E[1+R] = \mathbb E[e^Y] = \exp\left(\mu_Y + \frac{1}{2}\sigma_Y^2\right) = \exp\left(0.04 + \frac{0.0225}{2}\right) = \exp(0.05125).
$$
由此计算算术平均收益：
$$
\mathbb E[R] = \mathbb E[1+R] - 1 = e^{0.05125} - 1 \approx 1.0525853 - 1 = 0.0525853 \approx 5.2585\%.
$$

其三，计算收益率方差 $\operatorname{Var}(R)$：
常数平移不改变量方差，故 $\operatorname{Var}(R) = \operatorname{Var}(1+R) = \operatorname{Var}(e^Y)$。
取 $t = 2$，计算二阶矩：
$$
\mathbb E\bigl[(1+R)^2\bigr] = \mathbb E[e^{2Y}] = \exp\left(2\mu_Y + \frac{1}{2}(4)\sigma_Y^2\right) = \exp\bigl(2\mu_Y + 2\sigma_Y^2\bigr).
$$
应用方差计算公式：
$$
\operatorname{Var}(R) = \mathbb E\bigl[e^{2Y}\bigr] - \bigl(\mathbb E[e^Y]\bigr)^2 = \exp\bigl(2\mu_Y + 2\sigma_Y^2\bigr) - \exp\bigl(2\mu_Y + \sigma_Y^2\bigr) = \exp\bigl(2\mu_Y + \sigma_Y^2\bigr)\bigl(e^{\sigma_Y^2} - 1\bigr).
$$
代入具体数值：
$$
2\mu_Y + \sigma_Y^2 = 2\times 0.04 + 0.0225 = 0.1025,
$$
$$
\operatorname{Var}(R) = e^{0.1025}\bigl(e^{0.0225} - 1\bigr) \approx 1.107937\times 0.0227546 \approx 0.0252107.
$$
其标准差为 $\sigma_R = \sqrt{0.0252107} \approx 0.15878$（即波动率约 $15.88\%$）。

其四，算术均值与几何均值的差距及方差拖累分析：
两者的精确理论差值为
$$
\mathbb E[R] - R_g = \exp\left(\mu_Y + \frac{1}{2}\sigma_Y^2\right) - e^{\mu_Y} = e^{\mu_Y}\left(\exp\left(\frac{1}{2}\sigma_Y^2\right) - 1\right).
$$
数值差为 $0.0525853 - 0.0408108 = 0.0117745$（约 $1.1775\%$）。
利用 Taylor 展开近似：当 $\sigma_Y^2$ 较小时，$e^{\sigma_Y^2/2} - 1 \approx \frac{1}{2}\sigma_Y^2$，且 $e^{\mu_Y} \approx 1$。因此
$$
\mathbb E[R] - R_g \approx \frac{1}{2}\sigma_Y^2 = \frac{0.0225}{2} = 0.01125 \quad (1.125\%).
$$
在资产定价与投资组合理论中，这一经典近似对应于方差拖累公式：$R_g \approx \mathbb E[R] - \frac{1}{2}\sigma^2$。它深刻表明投资组合的几何复利增长率系统性低于单期期望算术收益，波动率的存在会造成复利损耗，损耗大小在一阶近似下恰好等于方差的一半。

常见错误做法分析：其一，直接将 $\mathbb E[R]$ 写成 $\mu_Y = 0.04$，遗漏了 Jensen 不等式对凸函数 $e^Y$ 引入的半方差修正项 $\sigma_Y^2/2$；其二，混淆 $R$ 的方差与 $\ln(1+R)$ 的方差，误将 $\operatorname{Var}(R)$ 记为 $\sigma_Y^2 = 0.0225$；其三，在计算收益率差值时遗漏减 $1$。

## 18. 

设随机变量 $X$ 服从 Pareto 分布，概率密度函数为
$$
f(x) = \alpha x^{-\alpha - 1}\,\mathbf 1_{[1, +\infty)}(x), \quad \alpha > 0.
$$

其一，直接积分计算 $\mathbb E[X]$ 与收敛区间：
$$
\mathbb E[X] = \int_1^{+\infty} x\cdot\bigl(\alpha x^{-\alpha - 1}\bigr)\,dx = \alpha \int_1^{+\infty} x^{-\alpha}\,dx.
$$
当 $\alpha > 1$ 时，积分收敛：
$$
\mathbb E[X] = \alpha\left[\frac{x^{-\alpha + 1}}{-\alpha + 1}\right]_1^{+\infty} = \alpha\left(0 - \frac{1}{1 - \alpha}\right) = \frac{\alpha}{\alpha - 1}.
$$
当 $0 < \alpha \le 1$ 时，原函数在无穷远处发散为无穷大。因此 $\mathbb E[X]$ 有限的充要条件为 $\alpha > 1$。

其二，直接积分计算 $\mathbb E[X^2]$ 与收敛区间：
$$
\mathbb E[X^2] = \int_1^{+\infty} x^2\cdot\bigl(\alpha x^{-\alpha - 1}\bigr)\,dx = \alpha \int_1^{+\infty} x^{-\alpha + 1}\,dx.
$$
当 $\alpha > 2$ 时，积分收敛：
$$
\mathbb E[X^2] = \alpha\left[\frac{x^{-\alpha + 2}}{-\alpha + 2}\right]_1^{+\infty} = \alpha\left(0 - \frac{1}{2 - \alpha}\right) = \frac{\alpha}{\alpha - 2}.
$$
当 $0 < \alpha \le 2$ 时，幂次 $-\alpha + 1 \ge -1$，被积函数积分发散。因此 $\mathbb E[X^2]$ 有限的充要条件为 $\alpha > 2$。

其三，针对 $\alpha = 1.5$ 时的不等式可用性分析：
在 $\alpha = 1.5$ 时，由于 $\alpha \in (1, 2]$，一阶矩存在且有限：$\mathbb E[X] = 1.5/(1.5 - 1) = 3$；然而二阶矩 $\mathbb E[X^2] = +\infty$，方差无限 $\operatorname{Var}(X) = +\infty$。
对于 Chebyshev 不等式：其数学前提是随机变量的方差有限。由于 $\operatorname{Var}(X) = +\infty$，Chebyshev 上界公式退化为 $\frac{\infty}{\varepsilon^2} = +\infty$，无法提供任何有效的非平凡界，因而 Chebyshev 不等式不可用。
对于 Chernoff 界：其核心基础是矩生成函数 $M_X(t) = \mathbb E[e^{tX}]$ 在 $t > 0$ 时存在。对于 Pareto 分布，对任意实数 $t > 0$：
$$
M_X(t) = \int_1^{+\infty} e^{tx} \alpha x^{-2.5}\,dx = +\infty,
$$
因为指数级增长速度远超任何代数幂律衰减速度，矩生成函数发散。因此 Chernoff 界完全不可用。

其四，尾概率计算与幂律衰减验证：
对任意 $x \ge 1$，直接对密度函数积分求右尾累积概率：
$$
\mathbb P(X \ge x) = \int_x^{+\infty} \alpha u^{-\alpha - 1}\,du = \left[-u^{-\alpha}\right]_x^{+\infty} = x^{-\alpha}.
$$
当 $\alpha = 1.5$ 时，
$$
\mathbb P(X \ge x) = x^{-1.5} = \frac{1}{x^{3/2}}, \quad x \ge 1.
$$
这严格展示了 Pareto 分布的幂律衰减特性（重尾特征）。尾部概率仅按 $x^{-1.5}$ 的代数速度缓慢衰减，衰减速度远慢于正态分布或指数分布的指数衰减，这正是其高阶矩发散且常规指数级浓度不等式失效的深层几何根源。

常见错误做法分析：其一，误认为只要期望有限就可以使用 Chebyshev 不等式，忽略了 Chebyshev 依赖有限二阶矩的根本前提；其二，在求导或积分时将积分下限代错为 $0$ 而导致积分在原点奇异；其三，混淆密度幂指数 $-\alpha-1$ 与尾概率幂指数 $-\alpha$。
## 19. 

无风险利率为 $r_f = 0.02$。

其一，计算组合 A 的夏普比率：
组合 A 服从单一正态分布 $R_A \sim N(0.08, 0.20^2)$。其期望收益率与标准差分别为
$$
\mathbb E[R_A] = 0.08, \quad \sigma_A = 0.20.
$$
由夏普比率公式（式（11.21）），
$$
\operatorname{SR}_A = \frac{\mathbb E[R_A] - r_f}{\sigma_A} = \frac{0.08 - 0.02}{0.20} = \frac{0.06}{0.20} = 0.30.
$$

其二，计算组合 B 的夏普比率：
组合 B 为双成分高斯混合分布，混合权重 $p_1 = p_2 = 1/2$，两成分参数分别为 $\mu_1 = 0.20, \sigma_1 = 0.10$ 与 $\mu_2 = -0.04, \sigma_2 = 0.10$。
首先应用全期望公式计算期望收益率：
$$
\mathbb E[R_B] = p_1 \mu_1 + p_2 \mu_2 = \frac{1}{2}(0.20) + \frac{1}{2}(-0.04) = 0.10 - 0.02 = 0.08.
$$
接着应用全方差公式正交分解总方差：
层内方差为各组分方差的期望：
$$
\mathbb E\bigl[\operatorname{Var}(R_B \mid M)\bigr] = \frac{1}{2}\sigma_1^2 + \frac{1}{2}\sigma_2^2 = \frac{1}{2}(0.10^2) + \frac{1}{2}(0.10^2) = 0.01.
$$
层间方差为均值离差的方差：
$$
\operatorname{Var}\bigl(\mathbb E[R_B \mid M]\bigr) = p_1 p_2 (\mu_1 - \mu_2)^2 = \frac{1}{2}\times\frac{1}{2}\times\bigl(0.20 - (-0.04)\bigr)^2 = \frac{1}{4}\times (0.24)^2 = \frac{0.0576}{4} = 0.0144.
$$
因此总方差为
$$
\operatorname{Var}(R_B) = 0.01 + 0.0144 = 0.0244.
$$
其波动率（标准差）为
$$
\sigma_B = \sqrt{0.0244} \approx 0.156205.
$$
计算组合 B 的夏普比率：
$$
\operatorname{SR}_B = \frac{\mathbb E[R_B] - r_f}{\sigma_B} = \frac{0.08 - 0.02}{\sqrt{0.0244}} = \frac{0.06}{0.156205} \approx 0.3841.
$$

其三，组合 B 的偏度方向分析：
对于等权双组分混合正态分布，两组分相对于总均值 $\mathbb E[R_B] = 0.08$ 的偏差分别为
$$
d_1 = \mu_1 - \mathbb E[R_B] = 0.20 - 0.08 = +0.12,
$$
$$
d_2 = \mu_2 - \mathbb E[R_B] = -0.04 - 0.08 = -0.12.
$$
由于 $p_1 = p_2 = 1/2$ 且 $\sigma_1 = \sigma_2 = 0.10$，两成分关于总均值 $0.08$ 严格对称（$d_1 = -d_2$）。正态组分自身三阶中心矩为零，总三阶中心矩计算为
$$
\mathbb E\bigl[(R_B - \mathbb E[R_B])^3\bigr] = \frac{1}{2}\bigl(3 d_1 \sigma_1^2 + d_1^3\bigr) + \frac{1}{2}\bigl(3 d_2 \sigma_2^2 + d_2^3\bigr) = 0.
$$
因此组合 B 的偏度严格为零（无偏/对称分布）。若权重不对称（例如 $p_1 \ne p_2$）或方差不同，则会产生明显的正偏或负偏。

其四，仅凭夏普比率排序可能忽略的风险维度：
夏普比率排序显示 $\operatorname{SR}_B \approx 0.3841 > \operatorname{SR}_A = 0.30$，表面上组合 B 显著优于组合 A。然而，夏普比率仅建立在均值与方差的前二阶矩分析框架上，完全忽略了以下关键风险特征：
1. 分布形态的模态差异：组合 A 为单峰正态分布，风险具有一致性；而组合 B 是具有显著双峰特征的状态转移分布（两峰分别位于 $-4\%$ 与 $+20\%$），两峰间距 $0.24$ 达单个组分标准差的 $2.4$ 倍，代表了截然不同的两种宏观经济状态（繁荣与衰退）。
2. 下行状态锁定风险：在组合 B 中，投资者有高达 $50\%$ 的概率陷入平均亏损 $-4\%$ 的衰退环境。虽然标准差因方差分解而显得较小，但其下行极端亏损体验对于具有损失厌恶特性的真实投资者而言远甚于单峰正态分布。
3. 峰度与高阶矩尾部风险：夏普比率假设波动率完全刻画了风险，无法衡量多模态跳跃或非正态尾部造成的非对称效用损失。

常见错误做法分析：其一，误用加权平均直接计算组合 B 的标准差为 $0.10$，完全遗漏层间方差；其二，由于看到负收益状态 $-0.04$，直觉性断言组合 B 为负偏态，忽略了由于对称权重和等距偏差导致偏度恰好平衡为零的事实；其三，在讨论夏普比率局限时只做宽泛议论，未指出双峰分布与状态依赖等具体数学机制。

## 20. 

**证明**

设随机变量序列 $X_1, X_2, \ldots$ 独立同分布，记数学期望为 $\mathbb E[X_1] = \mu$，方差为 $\operatorname{Var}(X_1) = \sigma^2 < \infty$。
考察前 $n$ 项的样本均值 $\bar X_n = \frac{1}{n} \sum_{i=1}^n X_i$。

第一步：由数学期望的线性性，计算样本均值的数学期望：
$$
\mathbb E[\bar X_n] = \mathbb E\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n \mathbb E[X_i] = \frac{1}{n}\sum_{i=1}^n \mu = \frac{1}{n}(n\mu) = \mu.
$$

第二步：由同分布性质与独立性下方差的可加性，计算样本均值的方差：
常数提至方差算子外须取平方：
$$
\operatorname{Var}(\bar X_n) = \operatorname{Var}\left(\frac{1}{n}\sum_{i=1}^n X_i\right) = \frac{1}{n^2}\operatorname{Var}\left(\sum_{i=1}^n X_i\right).
$$
由于 $X_1, \ldots, X_n$ 相互独立，各协方差为零，和的方差等于方差的和：
$$
\operatorname{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \operatorname{Var}(X_i) = \sum_{i=1}^n \sigma^2 = n\sigma^2.
$$
因此样本均值的方差为
$$
\operatorname{Var}(\bar X_n) = \frac{1}{n^2}(n\sigma^2) = \frac{\sigma^2}{n}.
$$

第三步：应用 Chebyshev 不等式进行尾概率控制。
对任意给定的常数 $\varepsilon > 0$，将随机变量 $\bar X_n$ 代入 Chebyshev 不等式：
$$
\mathbb P\bigl(|\bar X_n - \mu| \ge \varepsilon\bigr) = \mathbb P\bigl(|\bar X_n - \mathbb E[\bar X_n]| \ge \varepsilon\bigr) \le \frac{\operatorname{Var}(\bar X_n)}{\varepsilon^2} = \frac{\sigma^2}{n\varepsilon^2}.
$$

第四步：取 $n \to \infty$ 的极限。
由于方差有限 $\sigma^2 < \infty$，且 $\varepsilon > 0$ 固定，比值 $\frac{\sigma^2}{\varepsilon^2}$ 为有限常数。
两端同时令 $n \to \infty$，结合概率的非负性 $0 \le \mathbb P(|\bar X_n - \mu| \ge \varepsilon)$，得到
$$
0 \le \lim_{n\to\infty} \mathbb P\bigl(|\bar X_n - \mu| \ge \varepsilon\bigr) \le \lim_{n\to\infty} \frac{\sigma^2}{n\varepsilon^2} = 0.
$$
由两边夹准则（夹逼定理），
$$
\lim_{n\to\infty} \mathbb P\bigl(|\bar X_n - \mu| \ge \varepsilon\bigr) = 0.
$$
这表明样本均值 $\bar X_n$ 依概率收敛于总体期望 $\mu$，弱大数定律证毕。

□

方差有限假设的依赖性与论证断裂点剖析：
在上述证明中，对“方差有限（$\sigma^2 < \infty$）”的依赖集中在第二步和第三步：
1. 第二步中，必须保证每个变量的方差 $\operatorname{Var}(X_1) = \sigma^2$ 是一个有限实数，方差可加性求和与化简 $\operatorname{Var}(\bar X_n) = \sigma^2/n$ 才具有数学有效性；
2. 第三步中，Chebyshev 不等式要求方差必须有限。若方差无限（$\sigma^2 = \infty$），则 $\operatorname{Var}(\bar X_n) = \infty$，此时 Chebyshev 不等式的右端直接变成
$$
\frac{\operatorname{Var}(\bar X_n)}{\varepsilon^2} = \frac{\infty}{\varepsilon^2} = +\infty.
$$
一个小于等于 $+\infty$ 的概率上界是完全平凡且无效的，无法在第四步通过夹逼准则取极限推出上界为零。因此，整套基于二阶矩与 Chebyshev 不等式的论证在应用不等式与取极限这一步发生根本性断裂。
值得指出的是，数学上若仅有一阶矩存在（$\mathbb E[|X_1|] < \infty$），弱大数定律依然成立（辛钦弱大数定律），但必须采用特征函数展开或截断法进行证明，无法单纯通过 Chebyshev 不等式导出。

常见错误做法分析：其一，违反题目明确限制，擅自使用特征函数泰勒展开或中心极限定理来证明；其二，在求 $\operatorname{Var}(\bar X_n)$ 时写为 $\frac{1}{n}\operatorname{Var}(X_1)$ 而未展示从 $\frac{1}{n^2}\sum$ 到 $\frac{\sigma^2}{n}$ 的方差平方提取与可加性步骤；其三，误以为当方差无限时弱大数定律一定不成立，混淆了“该特定证明方法因条件不满足而失效”与“定理结论本身不成立”。