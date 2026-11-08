# 第19章习题参考答案与解析

## 1.

由期望的线性性，

$$
\mathbb E[\bar X]
=\frac1n\sum_{i=1}^n\mathbb E[X_i]
=\frac1n\cdot n\mu=\mu,
$$

所以 $\bar X$ 无偏。进一步，

$$
\operatorname{Var}(\bar X)
=\frac1{n^2}\operatorname{Var}\left(\sum_{i=1}^nX_i\right)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)
=\frac{\sigma^2}{n}.
$$

第二个等号把方差的和写成各方差之和时使用了独立性；更一般地，两两不相关已足够。若观测存在相关，必须补上协方差项：

$$
\operatorname{Var}(\bar X)
=\frac1{n^2}\left[\sum_i\operatorname{Var}(X_i)
+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)\right].
$$

## 2.

展开平方：

$$
\begin{aligned}
\sum_{i=1}^n(X_i-\bar X)^2
&=\sum_i(X_i^2-2X_i\bar X+\bar X^2)\\
&=\sum_iX_i^2-2\bar X\sum_iX_i+n\bar X^2\\
&=\sum_iX_i^2-2n\bar X^2+n\bar X^2\\
&=\sum_iX_i^2-n\bar X^2.
\end{aligned}
$$

由于 $\mathbb E[X_i^2]=\sigma^2+\mu^2$，且

$$
\mathbb E[\bar X^2]
=\operatorname{Var}(\bar X)+(\mathbb E[\bar X])^2
=\frac{\sigma^2}{n}+\mu^2,
$$

所以

$$
\mathbb E\left[\sum_i(X_i-\bar X)^2\right]
=n(\sigma^2+\mu^2)-n\left(\frac{\sigma^2}{n}+\mu^2\right)
=(n-1)\sigma^2.
$$

除以 $n-1$ 即得 $\mathbb E[S^2]=\sigma^2$。关键不是死记 $n-1$，而是 $\mathbb E[\bar X^2]$ 中包含 $\sigma^2/n$。

## 3.

由正态样本的均值—方差分解，

$$
\bar X\sim N\left(\mu,\frac{\sigma^2}{10}\right),
\qquad
\frac{9S^2}{\sigma^2}\sim\chi_9^2,
\qquad
\frac{\sqrt{10}(\bar X-\mu)}{S}\sim t_9.
$$

并且 $\bar X$ 与 $S^2$ 相互独立。最后一个 $t$ 分布同时使用了分子的正态性、分母缩放后的卡方性以及二者独立性。

去掉正态假设但保留独立同分布和有限方差时，仍有

$$
\mathbb E[\bar X]=\mu,
\quad \operatorname{Var}(\bar X)=\sigma^2/10,
\quad \mathbb E[S^2]=\sigma^2.
$$

不能保留的是上述三个精确分布以及 $\bar X$ 与 $S^2$ 必然独立的结论。

## 4.

由 $F$ 分布定义，

$$
F=\frac{U/5}{V/10}\sim F(5,10).
$$

另取 $Z\sim N(0,1)$，并使 $Z$ 与 $V$ 独立，则

$$
T=\frac{Z}{\sqrt{V/10}}\sim t_{10}.
$$

分子分母的自由度不能颠倒，独立条件也不能省略。若 $Z$ 与 $V$ 相关，该比值一般不再服从定义中的 $t$ 分布。

## 5.

因为 $\mathbb E[\hat\theta]=2\theta$，偏差为 $\theta$。由偏差—方差分解，

$$
\operatorname{MSE}(\hat\theta)
=3\theta^2+\theta^2=4\theta^2.
$$

对 $c\hat\theta$,

$$
\mathbb E[c\hat\theta]=2c\theta,
\qquad
\operatorname{Var}(c\hat\theta)=3c^2\theta^2,
$$

故

$$
\begin{aligned}
\operatorname{MSE}(c\hat\theta)
&=\theta^2\left[3c^2+(2c-1)^2\right]\\
&=\theta^2(7c^2-4c+1).
\end{aligned}
$$

对 $c$ 求导得 $14c-4=0$，所以 $c=2/7$。二阶导数为 $14>0$，故为最小值。此时

$$
\mathbb E\left[\frac27\hat\theta\right]=\frac47\theta,
$$

偏差为 $-3\theta/7$。最优 MSE 估计量有偏，说明无偏性不总等同于最小均方误差。

## 6.

一种无偏但不一致的构造是

$$
\hat\theta_n=
\begin{cases}
0,&\text{概率 }1-1/n,\\
n\theta,&\text{概率 }1/n.
\end{cases}
$$

因为

$$
\mathbb E_\theta[\hat\theta_n]
=0\left(1-\frac1n\right)+n\theta\frac1n=\theta,
$$

所以无偏。但固定 $\theta\neq0$，取 $0<\varepsilon<|\theta|$，当 $\hat\theta_n=0$ 时误差为 $|\theta|>\varepsilon$，于是

$$
\mathbb P(|\hat\theta_n-\theta|\geq\varepsilon)
\geq1-\frac1n,
$$

不趋于零，因此不一致。

若估计量无偏且 $\operatorname{Var}(\hat\theta_n)\to0$，则

$$
\operatorname{MSE}(\hat\theta_n)
=\operatorname{Var}(\hat\theta_n)\to0.
$$

再由 Chebyshev 不等式，

$$
\mathbb P(|\hat\theta_n-\theta|\geq\varepsilon)
\leq\frac{\operatorname{Var}(\hat\theta_n)}{\varepsilon^2}\to0,
$$

故其均方一致且依概率一致。这个充分条件比单纯无偏更强。

## 7.

均匀分布 $\operatorname{Uniform}(0,\theta)$ 的均值和二阶原点矩为

$$
\mathbb E[X]=\frac\theta2,
\qquad
\mathbb E[X^2]=\frac{\theta^2}{3}.
$$

用样本均值替代总体均值，得到

$$
\hat\theta_1=2\bar X.
$$

用 $\hat m_2=n^{-1}\sum_iX_i^2$ 替代二阶矩，得到

$$
\hat\theta_2=\sqrt{3\hat m_2}.
$$

均匀分布具有有限各阶矩，大数定律给出 $\bar X\xrightarrow{p}\theta/2$、$\hat m_2\xrightarrow{p}\theta^2/3$。连续映射定理随后给出

$$
\hat\theta_1\xrightarrow{p}\theta,
\qquad
\hat\theta_2\xrightarrow{p}\theta.
$$

两者都一致，但一致性不表示它们具有相同的有限样本方差或效率。

## 8.

矩方程为

$$
\hat\mu_{\mathrm{MM}}=\bar X,
\qquad
\hat\sigma^2_{\mathrm{MM}}=V_n
=\frac1n\sum_i(X_i-\bar X)^2.
$$

若总体为 $N(\mu,\sigma^2)$，正态模型的 MLE 也是

$$
\hat\mu_{\mathrm{MLE}}=\bar X,
\qquad
\hat\sigma^2_{\mathrm{MLE}}=V_n.
$$

因此二者在此模型中相同。这是一般指数族中若干自然矩与似然方程相联系的例子，不表示矩估计与 MLE 在所有模型中都相同。

## 9.

似然为

$$
L(p)=p^S(1-p)^{n-S}.
$$

- 若 $S=0$，$L(p)=(1-p)^n$，在 $[0,1]$ 上递减，故 $\hat p=0$。
- 若 $S=n$，$L(p)=p^n$，在 $[0,1]$ 上递增，故 $\hat p=1$。
- 若 $0<S<n$，对数似然可导且严格凹，一阶条件给出

  $$
  \frac Sp-\frac{n-S}{1-p}=0
  \quad\Longrightarrow\quad \hat p=\frac Sn.
  $$

因此三种情形统一为 $\hat p=S/n$。边界情形中导数不必在最大值处等于零，仍须检查参数空间端点或函数单调性。

## 10.

由正态对数似然先对 $\mu$ 最大化，得 $\hat\mu=\bar X$。代入后关于 $v=\sigma^2$ 最大化，得到

$$
\hat\sigma^2_{\mathrm{MLE}}
=\frac1n\sum_i(X_i-\bar X)^2
=\frac{n-1}{n}S^2.
$$

因此

$$
\mathbb E[\hat\sigma^2_{\mathrm{MLE}}]
=\frac{n-1}{n}\sigma^2,
\qquad
\operatorname{Bias}(\hat\sigma^2_{\mathrm{MLE}})
=-\frac{\sigma^2}{n}.
$$

由 MLE 不变性，$\sigma=\sqrt{\sigma^2}$ 的 MLE 为

$$
\hat\sigma_{\mathrm{MLE}}=\sqrt{\hat\sigma^2_{\mathrm{MLE}}}.
$$

不变性只保持“使似然最大”这一性质，不保持无偏性。事实上平方根是严格凹函数，不能将 $\mathbb E[\hat\sigma^2]$ 的无偏修正直接转化为 $\mathbb E[\hat\sigma]=\sigma$。

## 11.

Poisson 对数似然为

$$
\ell(\lambda)
=-n\lambda+S\log\lambda-\sum_i\log(x_i!),
\qquad S=\sum_ix_i.
$$

当 $S>0$ 时，一阶条件为 $-n+S/\lambda=0$，故 $\hat\lambda=S/n=\bar X$。当 $S=0$ 时，似然 $e^{-n\lambda}$ 在 $\lambda\geq0$ 上的最大值也在 $\lambda=0$，所以同一公式成立。

由不变性，$p_0=e^{-\lambda}$ 的 MLE 为

$$
\hat p_0=e^{-\bar X}.
$$

它一般不无偏。函数 $g(x)=e^{-x}$ 严格凸，且 $\lambda>0$ 时 $\bar X$ 非退化，Jensen 不等式给出

$$
\mathbb E[e^{-\bar X}]>e^{-\mathbb E[\bar X]}=e^{-\lambda}.
$$

因此它在小样本中向上有偏。还可以精确计算其期望，但判断无偏性并不需要该额外计算。

## 12.

单个观测的对数似然为 $\ell(\lambda;x)=\log\lambda-\lambda x$，故

$$
U(\lambda;x)=\frac1\lambda-x,
\qquad
\frac{\partial^2\ell}{\partial\lambda^2}=-\frac1{\lambda^2}.
$$

Fisher 信息为

$$
I(\lambda)
=-\mathbb E\left[-\frac1{\lambda^2}\right]
=\frac1{\lambda^2}.
$$

样本对数似然为 $\ell_n(\lambda)=n\log\lambda-\lambda\sum_iX_i$，一阶条件给出

$$
\hat\lambda=\frac{n}{\sum_iX_i}=\frac1{\bar X}.
$$

正则 MLE 渐近公式给出

$$
\sqrt n(\hat\lambda-\lambda)
\xrightarrow{d}N\left(0,\frac1{I(\lambda)}\right)
=N(0,\lambda^2).
$$

即 $\hat\lambda$ 的渐近方差为 $\lambda^2/n$。这是渐近结论，不应写成 $\hat\lambda$ 在有限样本中精确正态。

## 13.

单个 Bernoulli 观测的对数似然为

$$
\ell(p;x)=x\log p+(1-x)\log(1-p).
$$

得分为

$$
U(p;x)=\frac xp-\frac{1-x}{1-p}
=\frac{x-p}{p(1-p)}.
$$

因为 $\mathbb E[X]=p$，所以 $\mathbb E[U]=0$。又 $\operatorname{Var}(X)=p(1-p)$，故

$$
I(p)=\operatorname{Var}(U)
=\frac{p(1-p)}{p^2(1-p)^2}
=\frac1{p(1-p)}.
$$

另一方面，

$$
\ell''(p;x)=-\frac{x}{p^2}-\frac{1-x}{(1-p)^2},
$$

从而

$$
-\mathbb E[\ell'']
=\frac{p}{p^2}+\frac{1-p}{(1-p)^2}
=\frac1p+\frac1{1-p}
=\frac1{p(1-p)}.
$$

两种计算一致。$I(p)$ 在 $p\to0$ 或 $p\to1$ 时发散，反映的是参数化下的局部信息变化，不意味着边界处的所有估计问题都更简单。

## 14.

单个观测对数似然中依赖 $\mu$ 的部分为

$$
-\frac{(x-\mu)^2}{2\sigma_0^2}.
$$

因此

$$
\ell'(\mu;x)=\frac{x-\mu}{\sigma_0^2},
\qquad
\ell''(\mu;x)=-\frac1{\sigma_0^2},
$$

所以 $I(\mu)=1/\sigma_0^2$，总信息为 $n/\sigma_0^2$。

样本均值满足 $\mathbb E[\bar X]=\mu$，且

$$
\operatorname{Var}(\bar X)=\frac{\sigma_0^2}{n}
=\frac1{nI(\mu)}.
$$

故其方差恰好达到 Cramér–Rao 下界。这里“有效”是针对该正态位置模型中的无偏估计方差而言，不能脱离模型推广为所有准则下都最优。

## 15.

支撑集为 $(0,\theta)$ 时，归一化应写成

$$
\int_0^\theta f(x;\theta)\,dx=1.
$$

对 $\theta$ 求导时，除了被积函数的变化，积分上限也在变化。Leibniz 法则会产生边界项，不能简单写成 $\int_0^\theta\partial_\theta f\,dx=0$。因此得分均值为零的推导可能失效。

Cramér–Rao 证明中，对无偏性等式求导并把它写成 $\operatorname{Cov}(T,U_n)=g'(\theta)$ 使用了同样的交换和支撑集不变条件。若该恒等式不再成立，后续 Cauchy–Schwarz 推导就失去起点。均匀分布上界的 MLE 具有 $n$ 阶收敛速率，正是非正则结构的直接表现。

## 16.

对 $0<t<\theta$,

$$
\mathbb P(X_{(n)}\leq t)=(t/\theta)^n,
$$

故密度为 $f(t)=nt^{n-1}/\theta^n$。于是

$$
\mathbb E[X_{(n)}]
=\int_0^\theta t\frac{nt^{n-1}}{\theta^n}\,dt
=\frac{n}{\theta^n}\frac{\theta^{n+1}}{n+1}
=\frac{n}{n+1}\theta.
$$

一个无偏修正为

$$
\tilde\theta=\frac{n+1}{n}X_{(n)}.
$$

由正文极限分布，$\theta-X_{(n)}=O_p(1/n)$，所以 $X_{(n)}\xrightarrow{p}\theta$。同时 $(n+1)/n\to1$，故 $\tilde\theta\xrightarrow{p}\theta$。两者都一致，区别是有限样本偏差不同。

## 17.

指数分布均值和方差分别为 $1/\theta$ 与 $1/\theta^2$。CLT 给出

$$
\sqrt n\left(\bar X-\frac1\theta\right)
\xrightarrow{d}N\left(0,\frac1{\theta^2}\right).
$$

令 $g(x)=-\log x$，则 $\log\hat\theta=g(\bar X)$，真值为 $g(1/\theta)=\log\theta$，且

$$
g'\left(\frac1\theta\right)=-\theta.
$$

Delta 方法给出

$$
\sqrt n(\log\hat\theta-\log\theta)
\xrightarrow{d}
N\left(0,\theta^2\frac1{\theta^2}\right)
=N(0,1).
$$

对数变换在此把依赖未知 $\theta$ 的渐近方差变为常数，是一种方差稳定化。这并不保证有限样本分布完全正态。

## 18.

三个说法都不成立。

第一，正态方差 MLE 为 $(n-1)S^2/n$，期望为 $(n-1)\sigma^2/n$，故有限样本有偏。

第二，Cramér–Rao 下界是正则模型中无偏估计的方差下界；MLE 可能有偏，也未必在有限样本达到下界。正则 MLE 通常只具有渐近有效性。

第三，均匀分布 $\operatorname{Uniform}(0,\theta)$ 的 MLE 为 $X_{(n)}$，真正成立的是 $n(\theta-X_{(n)})$ 收敛到指数分布，而不是 $n^{1/2}$ 缩放后渐近正态。MLE 的渐近性质必须连同模型正则条件一起陈述。

## 19.

可能失效的特征包括：

1. **厚尾和极端收益**：正态模型低估尾部概率，少量极端值会显著影响方差和似然曲率；
2. **偏度**：收益分布不对称，正态模型错误描述分布形状；
3. **序列相关**：样本得分和样本均值的真实方差不再等于独立模型公式；
4. **波动率聚集与时变方差**：独立同分布且恒定 $\sigma^2$ 的假设不成立；
5. **结构变化或状态转换**：整个样本不再来自同一个固定参数分布。

这两个问题必须分开。均值或波动率估计在某些更弱条件下仍可能接近一个有意义的总体量，例如样本均值仍可作为平均收益的估计；但基于“正确正态独立模型”的 Fisher 信息标准误可能严重偏小或偏大。参数估计有用并不自动证明原模型的标准误正确，后者需要重新推导稳健方差或采用适合相关数据的重采样方法。

## 20.

已知 $\alpha$ 时，单个 Gamma 观测的对数似然为

$$
\ell(\beta;x)=\alpha\log\beta-\beta x
+(\alpha-1)\log x-\log\Gamma(\alpha).
$$

样本对数似然关于 $\beta$ 的一阶条件为

$$
\frac{n\alpha}{\beta}-\sum_iX_i=0,
$$

所以

$$
\hat\beta=\frac{\alpha}{\bar X}.
$$

二阶导数为 $-n\alpha/\beta^2<0$，故该驻点为最大值。单观测 Fisher 信息为

$$
I(\beta)=\frac\alpha{\beta^2}.
$$

由 MLE 渐近正态性，

$$
\sqrt n(\hat\beta-\beta)
\xrightarrow{d}N\left(0,\frac{\beta^2}{\alpha}\right),
$$

故 $\hat\beta$ 的渐近方差为 $\beta^2/(n\alpha)$。

分布均值为 $m=\alpha/\beta$。由不变性，

$$
\hat m=\frac\alpha{\hat\beta}=\bar X.
$$

因此该参数的 MLE 与样本均值完全一致，并且 $\mathbb E[\bar X]=m$。与之相比，$\hat\beta=\alpha/\bar X$ 是均值的非线性变换，一般并非 $\beta$ 的有限样本无偏估计。
