# 第19章　抽样分布、点估计与极大似然

统计推断从概率模型出发，却面对一个与概率论方向相反的问题：概率论通常在模型和参数已知时计算数据的分布，统计学则要在观察到数据之后，对未知参数及其不确定性作出判断。一个样本均值、一个样本方差或一个极大似然估计量，本身都是随机变量；只有理解其抽样分布，才能进一步讨论误差、置信区间和检验。

本章首先建立统计模型、统计量和抽样分布的概念，推导正态样本中样本均值与样本方差的核心分解，再讨论无偏性、均方误差和一致性。随后研究矩估计与极大似然估计，并在明确的正则条件下证明 Fisher 信息的恒等式、Cramér–Rao 下界以及极大似然估计的渐近正态性。最后通过支撑集依赖参数等反例说明，这些经典结论并非对所有模型自动成立。

学习本章后，应能够从数据生成过程写出统计模型，判断一个统计量是否具有所需性质，独立完成常见模型的矩估计和极大似然估计，并说明标准误和渐近近似所依赖的假设。

## 19.1 统计模型、统计量与抽样分布

**定义 19.1（参数统计模型）**

设观测数据为 $X_1,\ldots,X_n$。参数统计模型是一族候选分布

$$
\mathcal P=\{P_\theta:\theta\in\Theta\},
$$

其中 $\Theta$ 为参数空间，$\theta$ 为未知参数。若数据被视为独立同分布样本，则进一步假设 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}P_\theta$。参数 $\theta$ 可以是标量，也可以是向量。

“独立同分布”是模型假设，不是由数据排列方式自动获得的性质。金融收益率的序列相关、横截面相关、波动率聚集和结构变化，都可能破坏最简单的独立同分布模型。模型的写法决定了随后哪些抽样分布与标准误公式可以使用。

**定义 19.2（统计量与抽样分布）**

若可测函数 $T(X_1,\ldots,X_n)$ 不依赖未知参数，则称其为统计量。在参数 $\theta$ 给定、数据按模型随机生成时，$T$ 的概率分布称为 $T$ 的**抽样分布**（sampling distribution）。

样本均值

$$
\bar X=\frac1n\sum_{i=1}^nX_i
$$

和样本最大值 $X_{(n)}=\max_iX_i$ 都是统计量，而 $\bar X/\sigma$ 在 $\sigma$ 未知时通常不是可直接计算的统计量。抽样分布与“从已有样本中再次抽样的经验分布”不是同一概念；后者属于第23章的重采样内容。

若 $X_1,\ldots,X_n$ 独立同分布，且 $\mathbb E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$，则由期望和方差的性质直接得到

$$
\mathbb E[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}.
$$

这里并不要求总体服从正态分布。正态假设将在需要 $\bar X$ 的精确分布或样本方差的卡方分布时另行加入。

## 19.2 样本方差与正态样本的精确分布

**定义 19.3（样本方差）**

对 $n\geq2$，定义无偏形式的样本方差

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2.
\tag{19.1}
$$

极大似然估计中还会出现除以 $n$ 的版本，两者的自由度和大样本性质必须区分。

**定理 19.4（样本方差的无偏性）**

设 $X_1,\ldots,X_n$ 独立同分布，$\mathbb E[X_i]=\mu$，$\operatorname{Var}(X_i)=\sigma^2<\infty$，则

$$
\mathbb E[S^2]=\sigma^2.
$$

**证明**

利用

$$
\sum_{i=1}^n(X_i-\bar X)^2
=\sum_{i=1}^nX_i^2-n\bar X^2,
$$

并注意 $\mathbb E[X_i^2]=\sigma^2+\mu^2$、$\mathbb E[\bar X^2]=\sigma^2/n+\mu^2$，可得

$$
\begin{aligned}
\mathbb E\left[\sum_{i=1}^n(X_i-\bar X)^2\right]
&=n(\sigma^2+\mu^2)-n\left(\frac{\sigma^2}{n}+\mu^2\right)\\
&=(n-1)\sigma^2.
\end{aligned}
$$

两边除以 $n-1$ 即得结论。证明只使用了有限二阶矩和独立同分布假设，没有使用正态性。

□

除以 $n-1$ 不是为了“让公式更好看”，而是因为中心化时使用了由相同样本估计出的均值，损失了一个独立方向。下面的正交分解会把这一点严格呈现出来。

**定义 19.5（卡方分布）**

若 $Z_1,\ldots,Z_r$ 相互独立且均服从 $N(0,1)$，则

$$
V=\sum_{j=1}^rZ_j^2
$$

服从自由度为 $r$ 的卡方分布，记作 $V\sim\chi_r^2$。其均值为 $r$，方差为 $2r$。

**定理 19.6（正态样本的均值—方差分解）**

设 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$，其中 $\sigma^2>0$，$n\geq2$，则

1. $\bar X\sim N(\mu,\sigma^2/n)$；
2. $(n-1)S^2/\sigma^2\sim\chi_{n-1}^2$；
3. $\bar X$ 与 $S^2$ 相互独立。

**证明**

令 $Z_i=(X_i-\mu)/\sigma$，则 $\boldsymbol Z=(Z_1,\ldots,Z_n)^\top$ 服从标准多元正态分布。选取一个 $n\times n$ 正交矩阵 $\boldsymbol Q$，使其第一行为

$$
\frac1{\sqrt n}(1,1,\ldots,1),
$$

其余各行与第一行正交且彼此标准正交。这样的矩阵可由 Gram–Schmidt 正交化构造。令 $\boldsymbol Y=\boldsymbol Q\boldsymbol Z$。多元正态向量经线性变换仍服从正态分布，并且

$$
\mathbb E[\boldsymbol Y]=\boldsymbol0,
\qquad
\operatorname{Cov}(\boldsymbol Y)=\boldsymbol Q\boldsymbol I\boldsymbol Q^\top=\boldsymbol I,
$$

故 $Y_1,\ldots,Y_n$ 仍为相互独立的标准正态变量。

由第一行的构造，

$$
Y_1=\frac1{\sqrt n}\sum_{i=1}^nZ_i=\sqrt n\,\bar Z.
$$

同时，正交变换保持平方长度：

$$
\sum_{i=1}^nZ_i^2=\sum_{j=1}^nY_j^2.
$$

将左侧分解为

$$
\sum_{i=1}^nZ_i^2
=\sum_{i=1}^n(Z_i-\bar Z)^2+n\bar Z^2
=\sum_{i=1}^n(Z_i-\bar Z)^2+Y_1^2,
$$

于是

$$
\sum_{i=1}^n(Z_i-\bar Z)^2=\sum_{j=2}^nY_j^2.
\tag{19.2}
$$

式（19.2）左端正是 $(n-1)S^2/\sigma^2$，右端是 $n-1$ 个独立标准正态变量平方和，且完全不包含 $Y_1$。另一方面，

$$
\bar X=\mu+\sigma\bar Z=\mu+\frac{\sigma}{\sqrt n}Y_1.
$$

因此三条结论同时成立。样本均值只对应第一个正交方向，样本方差只对应其余 $n-1$ 个方向，这就是“自由度损失”的几何含义。

□

这一定理的第三条具有很强的分布假设。样本均值与样本方差独立并不是所有总体都具备的性质，不能仅凭二者在代数上由不同公式定义就断言独立。

**定义 19.7（Student $t$ 分布与 $F$ 分布）**

若 $Z\sim N(0,1)$、$V\sim\chi_\nu^2$，且 $Z$ 与 $V$ 独立，则

$$
T=\frac{Z}{\sqrt{V/\nu}}
$$

服从自由度为 $\nu$ 的 Student $t$ 分布，记作 $T\sim t_\nu$。

若 $U\sim\chi_p^2$、$V\sim\chi_q^2$ 且相互独立，则

$$
F=\frac{U/p}{V/q}
$$

服从自由度为 $(p,q)$ 的 $F$ 分布。

由定理19.6，在正态独立同分布样本下，

$$
\frac{\sqrt n(\bar X-\mu)}{S}
=
\frac{\sqrt n(\bar X-\mu)/\sigma}
{\sqrt{\bigl((n-1)S^2/\sigma^2\bigr)/(n-1)}}
\sim t_{n-1}.
\tag{19.3}
$$

这里用样本标准差 $S$ 替代未知的 $\sigma$ 后，分布由标准正态变为 $t_{n-1}$。$t$ 分布具有更厚的尾部，反映了估计 $\sigma$ 所带来的额外不确定性；当自由度趋于无穷时，它收敛到标准正态分布。

**例 19.1（样本方差计算的常见错误）**

某报告对三个观测值 $1,2,3$ 计算得到

$$
\frac{1+4+9}{3}-\left(\frac{1+2+3}{3}\right)^2=\frac23,
$$

并将 $2/3$ 称为“样本方差”。这个数值是

$$
\frac1n\sum_{i=1}^n(X_i-\bar X)^2,
$$

而不是式（19.1）定义的 $S^2$。本例中

$$
S^2=\frac{(1-2)^2+(2-2)^2+(3-2)^2}{2}=1.
$$

两者在大样本下差别很小，在小样本精确推断中却不可混用。使用 $t_{n-1}$ 公式时，应明确软件返回的是哪一种归一化。

## 19.3 点估计的评价：偏差、方差、均方误差与一致性

**定义 19.8（偏差与均方误差）**

设 $\hat\theta=T(X_1,\ldots,X_n)$ 是参数 $\theta$ 的估计量。其偏差和均方误差分别定义为

$$
\operatorname{Bias}_\theta(\hat\theta)
=\mathbb E_\theta[\hat\theta]-\theta,
$$

$$
\operatorname{MSE}_\theta(\hat\theta)
=\mathbb E_\theta[(\hat\theta-\theta)^2].
$$

若对所有 $\theta\in\Theta$ 都有 $\mathbb E_\theta[\hat\theta]=\theta$，则称 $\hat\theta$ 无偏。

**定理 19.9（偏差—方差分解）**

若 $\hat\theta$ 具有有限二阶矩，则

$$
\operatorname{MSE}_\theta(\hat\theta)
=\operatorname{Var}_\theta(\hat\theta)
+\operatorname{Bias}_\theta(\hat\theta)^2.
\tag{19.4}
$$

**证明**

令 $b=\mathbb E_\theta[\hat\theta]-\theta$。则

$$
\hat\theta-\theta=(\hat\theta-\mathbb E[\hat\theta])+b.
$$

平方后取期望，交叉项为

$$
2b\,\mathbb E[\hat\theta-\mathbb E[\hat\theta]]=0,
$$

故得到式（19.4）。

□

无偏性只约束误差的平均水平，不保证单次估计接近真值，也不保证估计量的方差很小。极小化均方误差时，适度引入偏差有时可以显著降低方差，这正是第22章收缩估计与第23章正则化的统计基础。

**定义 19.10（一致性与渐近无偏性）**

若样本量 $n\to\infty$ 时，对每个固定的 $\theta\in\Theta$，

$$
\hat\theta_n\xrightarrow{p}_\theta\theta,
$$

则称估计序列 $\{\hat\theta_n\}$ 一致。若 $\mathbb E_\theta[\hat\theta_n]\to\theta$，则称其渐近无偏。

这两个概念互不蕴含。例如，在真值 $\theta=0$ 的模型中，令

$$
\hat\theta_n=
\begin{cases}
0,&\text{概率 }1-1/n,\\
n,&\text{概率 }1/n.
\end{cases}
$$

则 $\mathbb E[\hat\theta_n]=1$，故其并不渐近无偏；但对任意 $\varepsilon>0$,

$$
\mathbb P(|\hat\theta_n|\geq\varepsilon)\leq\frac1n\to0,
$$

所以它一致。反向地，若把取值 $n$ 改为 $n^2$、概率仍取 $1/n$ 并另加常数修正使期望为零，也可以构造无偏但不一致的估计。评价估计量时，不能用一个性质替代另一个性质。

依概率收敛描述的是估计量围绕固定真值聚集的速度，而不是参数本身“逐渐变成”某个值。真值在频率学派模型中固定，随机的是数据和估计量。

## 19.4 矩估计

**定义 19.11（矩估计）**

设总体的前 $k$ 阶矩存在，且参数 $\theta=(\theta_1,\ldots,\theta_k)$ 可由总体矩表示：

$$
\mathbb E_\theta[X^r]=m_r(\theta),\qquad r=1,\ldots,k.
$$

以样本矩 $\hat m_r=n^{-1}\sum_{i=1}^nX_i^r$ 替代总体矩，求解

$$
\hat m_r=m_r(\theta),\qquad r=1,\ldots,k,
\tag{19.5}
$$

所得解 $\hat\theta_{\mathrm{MM}}$ 称为矩估计量（method of moments estimator）。实际使用时，也可以混合使用原点矩与中心矩，只要方程能够识别参数。

**例 19.2（Gamma 分布的矩估计）**

设 $X_i$ 独立同分布，服从形状参数 $\alpha>0$、速率参数 $\beta>0$ 的 Gamma 分布，则

$$
\mathbb E[X]=\frac\alpha\beta,
\qquad
\operatorname{Var}(X)=\frac\alpha{\beta^2}.
$$

以 $\bar X$ 和 $V_n=n^{-1}\sum_i(X_i-\bar X)^2$ 分别替代均值和方差，方程为

$$
\bar X=\frac\alpha\beta,
\qquad
V_n=\frac\alpha{\beta^2}.
$$

第二式除以第一式的平方，得到 $\beta=\bar X/V_n$，再代回得到

$$
\hat\beta_{\mathrm{MM}}=\frac{\bar X}{V_n},
\qquad
\hat\alpha_{\mathrm{MM}}=\frac{\bar X^2}{V_n}.
$$

该计算要求 $V_n>0$。若样本全部相同，则方程无法按上述形式求解，这并不与渐近理论矛盾，而是有限样本中的边界事件。

**定理 19.12（矩估计一致性的充分条件）**

设相关总体矩存在，独立同分布样本的样本矩依概率收敛到相应总体矩。若在真实参数附近，矩到参数的映射 $\theta=g(m_1,\ldots,m_k)$ 连续，则由连续映射定理，

$$
\hat\theta_{\mathrm{MM}}
=g(\hat m_1,\ldots,\hat m_k)
\xrightarrow{p}\theta.
$$

证明只是大数定律与连续映射定理的直接组合，但两个条件都不能省略：总体矩不存在时，样本矩可能没有稳定极限；映射在边界不连续时，样本矩接近总体矩也不保证参数估计稳定。

矩估计通常易于计算，却未必充分利用分布形状提供的信息。极大似然方法则从整个概率模型出发构造估计量。

## 19.5 似然函数与极大似然估计

**定义 19.13（似然与极大似然估计）**

在参数 $\theta$ 下，观测数据 $\boldsymbol x=(x_1,\ldots,x_n)$ 的联合密度或概率质量记为 $f(\boldsymbol x;\theta)$。把数据固定，将它看作 $\theta$ 的函数，称为似然函数：

$$
L_n(\theta;\boldsymbol x)=f(\boldsymbol x;\theta).
\tag{19.6}
$$

使似然达到最大值的参数称为极大似然估计（maximum likelihood estimate，MLE）：

$$
\hat\theta_{\mathrm{MLE}}\in\arg\max_{\theta\in\Theta}L_n(\theta;\boldsymbol x).
$$

对独立同分布样本，

$$
L_n(\theta)=\prod_{i=1}^nf(x_i;\theta),
\qquad
\ell_n(\theta)=\log L_n(\theta)=\sum_{i=1}^n\log f(x_i;\theta).
$$

由于对数函数严格递增，最大化 $L_n$ 与最大化 $\ell_n$ 等价。乘积转为求和，不仅便于求导，也便于应用大数定律和中心极限定理。

似然 $L_n(\theta)$ 不是“参数等于 $\theta$ 的概率”。在频率学派框架中，参数固定而数据随机；在连续模型中，密度值本身也不等于观测点的概率。将先验分布赋予参数并由此讨论参数的后验概率，是第22章的 Bayesian 模型。

**例 19.3（Bernoulli 参数的 MLE）**

设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Bernoulli}(p)$，$0\leq p\leq1$。令 $S=\sum_iX_i$，则

$$
L(p)=p^S(1-p)^{n-S},
\qquad
\ell(p)=S\log p+(n-S)\log(1-p).
$$

当 $0<S<n$ 时，

$$
\ell'(p)=\frac Sp-\frac{n-S}{1-p}.
$$

令其为零得 $S(1-p)=(n-S)p$，即 $S=np$，故 $\hat p=S/n$。又因

$$
\ell''(p)=-\frac{S}{p^2}-\frac{n-S}{(1-p)^2}<0,
$$

该点为唯一最大值。

若 $S=0$，则 $L(p)=(1-p)^n$ 在 $[0,1]$ 上递减，最大值在 $p=0$；若 $S=n$，最大值在 $p=1$。因此统一写成 $\hat p=\bar X$ 仍然正确，但边界处不能依赖内点一阶条件。

**例 19.4（正态分布两个参数的 MLE）**

设 $X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$，$\mu\in\mathbb R$、$\sigma^2>0$。对数似然为

$$
\ell(\mu,\sigma^2)
=-\frac n2\log(2\pi)-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2.
$$

对任意固定的 $\sigma^2>0$，最后一项是 $\mu$ 的二次函数。由平方分解，

$$
\sum_i(x_i-\mu)^2
=\sum_i(x_i-\bar x)^2+n(\bar x-\mu)^2,
$$

故最大化要求 $\hat\mu=\bar x$。将 $\hat\mu$ 代回，得到剖面对数似然

$$
\ell_p(\sigma^2)
=C-\frac n2\log\sigma^2-\frac{Q}{2\sigma^2},
\qquad Q=\sum_i(x_i-\bar x)^2.
$$

当 $Q>0$ 时，对 $v=\sigma^2$ 求导：

$$
\frac{d\ell_p}{dv}=-\frac n{2v}+\frac{Q}{2v^2}.
$$

令其为零得 $\hat v=Q/n$。并且 $v\to0$ 或 $v\to\infty$ 时 $\ell_p(v)\to-\infty$，所以该驻点给出全局最大值。因此

$$
\hat\mu_{\mathrm{MLE}}=\bar X,
\qquad
\hat\sigma^2_{\mathrm{MLE}}
=\frac1n\sum_i(X_i-\bar X)^2.
\tag{19.7}
$$

由定理19.4，

$$
\mathbb E[\hat\sigma^2_{\mathrm{MLE}}]
=\frac{n-1}{n}\sigma^2,
$$

故其有限样本下向下有偏，但偏差随 $n$ 增大而消失。$S^2$ 无偏并不意味着 $S$ 是 $\sigma$ 的无偏估计；非线性变换通常不保持无偏性。

**命题 19.14（MLE 的不变性）**

若 $\hat\theta$ 是 $\theta$ 的 MLE，$g$ 是参数空间上的函数，则 $\eta=g(\theta)$ 的诱导极大似然估计为 $\hat\eta=g(\hat\theta)$。若 $g$ 不是一一映射，则通过诱导似然

$$
L^*(\eta)=\sup_{\theta:g(\theta)=\eta}L(\theta)
\tag{19.8}
$$

定义这一结论。

**证明**

对任意可达到的 $\eta$，

$$
L^*(\eta)
=\sup_{\theta:g(\theta)=\eta}L(\theta)
\leq\sup_{\theta\in\Theta}L(\theta)
=L(\hat\theta).
$$

取 $\hat\eta=g(\hat\theta)$，则 $\hat\theta$ 属于约束集合 $\{\theta:g(\theta)=\hat\eta\}$，故 $L^*(\hat\eta)=L(\hat\theta)$。因此 $\hat\eta$ 使诱导似然达到最大值。

□

不变性不意味着无偏性不变。例如，$\hat p$ 是 $p$ 的 MLE，则 $\hat p^2$ 是 $p^2$ 的 MLE，但即使 $\hat p$ 无偏，通常也有 $\mathbb E[\hat p^2]\neq p^2$。

## 19.6 得分函数、Fisher 信息与 Cramér–Rao 下界

渐近方差和估计效率的核心是对数似然的局部曲率。以下先考虑单参数模型。

**定义 19.15（得分函数与 Fisher 信息）**

对单个观测，定义得分函数

$$
U(\theta;X)=\frac{\partial}{\partial\theta}\log f(X;\theta).
$$

在适当正则条件下，单个观测的 Fisher 信息定义为

$$
I(\theta)=\mathbb E_\theta[U(\theta;X)^2]
=\operatorname{Var}_\theta(U(\theta;X)).
$$

对独立同分布样本，总得分 $U_n=\sum_iU(\theta;X_i)$，总信息为 $I_n(\theta)=nI(\theta)$。

这些等式需要正则条件，而不是仅从符号求导自动得到。以下采用一组便于说明核心推导的条件：参数在讨论点附近为内点；密度对 $\theta$ 具有所需导数；密度支撑集不依赖 $\theta$；积分与求导可以交换；相关矩有限。

**命题 19.16（得分恒等式与信息恒等式）**

在上述正则条件下，

$$
\mathbb E_\theta[U(\theta;X)]=0,
\tag{19.9}
$$

且若对数似然二阶可微，

$$
I(\theta)
=-\mathbb E_\theta\left[
\frac{\partial^2}{\partial\theta^2}\log f(X;\theta)
\right].
\tag{19.10}
$$

**证明**

连续情形中，密度归一化给出 $\int f(x;\theta)\,dx=1$。对 $\theta$ 求导并交换积分与求导：

$$
0=\int\frac{\partial f(x;\theta)}{\partial\theta}\,dx
=\int\frac{\partial\log f(x;\theta)}{\partial\theta}f(x;\theta)\,dx,
$$

即式（19.9）。离散情形将积分替换为求和。

再次对归一化恒等式求导，注意

$$
\frac{\partial^2 f}{\partial\theta^2}
=f\left[\ell''+(\ell')^2\right],
$$

其中 $\ell=\log f$。因此

$$
0=\int\frac{\partial^2 f}{\partial\theta^2}\,dx
=\mathbb E_\theta[\ell'']+\mathbb E_\theta[(\ell')^2],
$$

移项即得式（19.10）。

□

式（19.10）说明信息同时反映对数似然的平均曲率。曲率绝对值越大，参数附近的似然通常越尖，数据区分相邻参数的能力越强。但“观察到的曲率很大”与“估计必然无偏”仍是不同命题。

**定理 19.17（单参数 Cramér–Rao 下界）**

设正则条件成立，$T$ 是 $\theta$ 的无偏估计量且方差有限，则

$$
\operatorname{Var}_\theta(T)\geq\frac1{nI(\theta)},
\tag{19.11}
$$

其中 $I(\theta)>0$。更一般地，若 $T$ 无偏估计可微函数 $g(\theta)$，则右端改为 $[g'(\theta)]^2/[nI(\theta)]$。

**证明**

只证明较一般形式。无偏性为

$$
\int T(\boldsymbol x)f_n(\boldsymbol x;\theta)\,d\boldsymbol x=g(\theta).
$$

对 $\theta$ 求导，并交换积分与求导：

$$
\int T(\boldsymbol x)
\frac{\partial\log f_n(\boldsymbol x;\theta)}{\partial\theta}
f_n(\boldsymbol x;\theta)\,d\boldsymbol x
=g'(\theta).
$$

左端是 $\mathbb E[TU_n]$。由 $\mathbb E[U_n]=0$，它等于 $\operatorname{Cov}(T,U_n)$。由 Cauchy–Schwarz 不等式，

$$
[g'(\theta)]^2
=\operatorname{Cov}(T,U_n)^2
\leq\operatorname{Var}(T)\operatorname{Var}(U_n)
=\operatorname{Var}(T)\,nI(\theta).
$$

整理即得下界。

□

证明中的支撑集条件不可省略。如果哪些数据可能出现本身就依赖 $\theta$，对归一化条件直接求导会遗漏支撑集边界的变化。

**例 19.5（指数分布的信息与下界）**

设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$，密度为

$$
f(x;\lambda)=\lambda e^{-\lambda x},\qquad x>0,\ \lambda>0.
$$

单观测对数似然为 $\ell(\lambda;x)=\log\lambda-\lambda x$，故

$$
U(\lambda;x)=\frac1\lambda-x,
\qquad
\ell''(\lambda;x)=-\frac1{\lambda^2}.
$$

由式（19.10），$I(\lambda)=1/\lambda^2$。样本均值满足

$$
\mathbb E[\bar X]=\frac1\lambda,
\qquad
\operatorname{Var}(\bar X)=\frac1{n\lambda^2}.
$$

它估计的是 $g(\lambda)=1/\lambda$，且 $g'(\lambda)=-1/\lambda^2$。Cramér–Rao 下界为

$$
\frac{[g'(\lambda)]^2}{nI(\lambda)}
=\frac{1/\lambda^4}{n/\lambda^2}
=\frac1{n\lambda^2},
$$

恰好等于 $\bar X$ 的方差。因此 $\bar X$ 在该模型中达到 $1/\lambda$ 的无偏估计下界。

## 19.7 极大似然估计的渐近理论

有限样本中，MLE 可能有偏，也未必达到 Cramér–Rao 下界；但在一大类正则模型中，它在大样本下具有一致性、渐近正态性和渐近有效性。

**定理 19.18（正则模型下 MLE 的一致性与渐近正态性）**

设 $X_1,\ldots,X_n$ 独立同分布于 $f(x;\theta_0)$，$\theta_0$ 为参数空间内点。假设：

1. 模型可识别，即 $\theta\neq\theta_0$ 时相应分布不同；
2. 对数似然具有足够光滑性，期望对数似然在 $\theta_0$ 处有适当的唯一最大值，并具有保证一致性的紧致性或全局控制条件；
3. 支撑集不依赖参数，积分与求导可以交换；
4. 在 $\theta_0$ 的邻域内，三阶导数被可积函数控制，二阶导数满足一致的大数定律；
5. Fisher 信息 $I(\theta_0)$ 存在、有限且为正。

则存在一致的局部似然最大解 $\hat\theta_n$，并且

$$
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
N\left(0,\frac1{I(\theta_0)}\right).
\tag{19.12}
$$

**证明（在一致性已经建立后给出渐近正态性的核心推导）**

由大数定律和期望对数似然的唯一最大化条件可以得到一致性；完整全局证明需要上述第2条所概括的额外控制。以下集中推导局部渐近分布。

对一致的 MLE，当 $n$ 足够大时，$\hat\theta_n$ 以趋于1的概率落在 $\theta_0$ 的邻域内，并为内点，满足 $\ell_n'(\hat\theta_n)=0$。在 $\theta_0$ 与 $\hat\theta_n$ 之间作 Taylor 展开：

$$
0=\ell_n'(\hat\theta_n)
=\ell_n'(\theta_0)
+\ell_n''(\theta_0)(\hat\theta_n-\theta_0)
+R_n(\hat\theta_n-\theta_0),
$$

其中三阶导数控制与 $\hat\theta_n-\theta_0=o_p(1)$ 保证余项满足 $R_n=o_p(n)$。于是

$$
\sqrt n(\hat\theta_n-\theta_0)
=
\frac{n^{-1/2}\ell_n'(\theta_0)}
{-n^{-1}\ell_n''(\theta_0)-n^{-1}R_n}.
$$

由得分恒等式，单个得分均值为零、方差为 $I(\theta_0)$。中心极限定理给出

$$
n^{-1/2}\ell_n'(\theta_0)
\xrightarrow{d}N(0,I(\theta_0)).
$$

大数定律及信息恒等式给出

$$
-\frac1n\ell_n''(\theta_0)
\xrightarrow{p}I(\theta_0),
\qquad n^{-1}R_n\xrightarrow{p}0.
$$

最后由 Slutsky 定理，

$$
\sqrt n(\hat\theta_n-\theta_0)
\xrightarrow{d}
\frac1{I(\theta_0)}N(0,I(\theta_0))
\overset{d}=N(0,I(\theta_0)^{-1}).
$$

□

因此，在大样本且模型正确、正则条件成立时，可用

$$
\widehat{\operatorname{se}}(\hat\theta)
=\frac1{\sqrt{nI(\hat\theta)}}
$$

估计标准误。若期望信息难以计算，在满足相应一致性的条件下，也可使用观测信息

$$
J_n(\hat\theta)=-\ell_n''(\hat\theta)
$$

构造 $\widehat{\operatorname{se}}=J_n(\hat\theta)^{-1/2}$。二者在正则大样本下渐近等价，有限样本中却可能不同。

**例 19.6（指数速率参数的渐近分布）**

例19.3中的 Bernoulli 模型和例19.5中的指数模型都满足常见正则条件。对指数模型，

$$
\ell_n(\lambda)=n\log\lambda-\lambda\sum_iX_i,
$$

从而

$$
\hat\lambda=\frac1{\bar X},
\qquad I(\lambda)=\frac1{\lambda^2}.
$$

由式（19.12），

$$
\sqrt n(\hat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda^2).
$$

同一结论也可由 $\bar X$ 的 CLT 与函数 $g(x)=1/x$ 的 Delta 方法得到。两种推导相互印证，但 MLE 渐近公式适用于更广泛的没有闭式估计量的模型。

**例 19.7（支撑集依赖参数：正则理论失效）**

设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,\theta)$，$\theta>0$。其似然必须保留示性函数：

$$
L_n(\theta)
=\theta^{-n}\prod_{i=1}^n\mathbf1_{\{0\leq x_i\leq\theta\}}
=\theta^{-n}\mathbf1_{\{\theta\geq x_{(n)}\}},
$$

其中假定所有观测非负。$\theta^{-n}$ 随 $\theta$ 增大而下降，故

$$
\hat\theta_{\mathrm{MLE}}=X_{(n)}.
$$

这里支撑集 $[0,\theta]$ 依赖参数，密度在边界处也不光滑，不能直接套用式（19.11）和式（19.12）。事实上，对 $0\leq x\leq n\theta$,

$$
\begin{aligned}
\mathbb P\bigl(n(\theta-X_{(n)})\geq x\bigr)
&=\mathbb P\left(X_{(n)}\leq\theta-\frac xn\right)\\
&=\left(1-\frac{x}{n\theta}\right)^n
\to e^{-x/\theta}.
\end{aligned}
$$

因此 $n(\theta-\hat\theta)$ 收敛到均值为 $\theta$ 的指数分布。收敛速率是 $n$，极限也不是正态分布。这个例子说明，不能把“MLE 通常渐近正态”误解为无条件的定义性质。

在量化研究中，正态模型的对数似然和 Fisher 信息公式便于计算，但金融收益常具有厚尾、偏度和时变波动率。若真实分布并非指定的正态模型，基于正确模型推导的信息标准误可能失真；此时应重新指定条件分布，或采用后续章节讨论的稳健方差和重采样方法。极大似然并不能自动修复模型错误。

## 19.8 估计方法之间的联系与选择

矩估计使用若干矩方程，MLE 使用整个分布。若模型正确且正则，MLE 通常具有较好的大样本效率；若模型错误，它可能稳定地估计一个错误参数。矩估计有时更直观，也更容易在只愿意假设若干矩存在、不愿指定完整分布时使用，但估计方程的矩必须确实存在。

无偏性、有效性和一致性回答不同问题。$S^2$ 的无偏性是有限样本性质；$\bar X$ 的一致性是大样本性质；Cramér–Rao 下界比较的是特定模型下的方差。选择估计量时，还应考虑均方误差、稳健性和计算稳定性。例如，正态总体中方差 MLE 除以 $n$，无偏样本方差除以 $n-1$，二者均一致；有限样本正态推断使用后者更方便，而似然理论自然产生前者。

同样，标准误不是一个脱离模型的固定数字。$\sigma/\sqrt n$ 是独立同分布且方差有限时样本均值的标准差；$S/\sqrt n$ 是估计的标准误；$t_{n-1}$ 精确推断还需要正态性。把这三层条件混在一起，是后续置信区间和假设检验误用的根源。

## 本章小结

统计量是数据的函数，其抽样分布决定估计的不确定性。独立同分布且二阶矩有限时，样本均值无偏、方差为 $\sigma^2/n$，$S^2$ 是 $\sigma^2$ 的无偏估计。若进一步假设总体正态，则正交分解同时给出 $\bar X$ 的正态性、$(n-1)S^2/\sigma^2$ 的卡方分布以及二者独立性，并由此得到 $t$ 统计量。

点估计不能只凭“自然”或“常用”评价。偏差—方差分解揭示无偏性与均方误差的差别，一致性则要求估计量依概率聚集到真值。矩估计由样本矩方程构造，极大似然估计最大化观测数据在参数下的似然，并具有参数变换不变性。

在支撑集不依赖参数、可识别、光滑且可交换积分求导等正则条件下，得分均值为零，Fisher 信息既等于得分方差，也等于对数似然二阶导数期望的负值。Cramér–Rao 下界来自估计量与得分的协方差以及 Cauchy–Schwarz 不等式；MLE 的渐近正态性来自得分的一阶 Taylor 展开、CLT 和大数定律。均匀分布上界等例子表明，改变支撑集结构或边界条件会改变收敛速率和极限分布。

这些结论构成第20章置信区间与假设检验的基础，也将在线性回归、Bayesian 后验近似和正则化统计学习中反复出现。

## 习题

1. 设 $X_1,\ldots,X_n$ 独立同分布，$\mathbb E[X_i]=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$。不假设正态性，证明 $\bar X$ 无偏且 $\operatorname{Var}(\bar X)=\sigma^2/n$。说明独立性在证明中用于哪一步。

2. 证明恒等式 $\sum_{i=1}^n(X_i-\bar X)^2=\sum_iX_i^2-n\bar X^2$，并据此重新推导 $\mathbb E[S^2]=\sigma^2$。

3. 设 $X_1,\ldots,X_{10}\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$。写出 $\bar X$、$9S^2/\sigma^2$ 和 $\sqrt{10}(\bar X-\mu)/S$ 的精确分布，并说明 $\bar X$ 与 $S^2$ 的关系。若去掉正态假设，哪些结论仍可保留？

4. 设 $U\sim\chi_5^2$、$V\sim\chi_{10}^2$ 且独立。构造一个 $F(5,10)$ 变量和一个 $t_{10}$ 变量；后者还允许你自行引入合适的独立正态变量。

5. 对 $\theta>0$，估计量 $\hat\theta$ 的期望为 $2\theta$、方差为 $3\theta^2$。计算其 MSE。若改用 $c\hat\theta$，求使 MSE 最小的常数 $c$，并说明最优估计量是否有偏。

6. 构造一个估计序列，使其无偏但不一致，并验证你的构造。再解释为什么“无偏且方差趋于零”足以保证均方误差趋于零及依概率一致。

7. 设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,\theta)$。分别用样本均值和样本二阶原点矩构造 $\theta$ 的矩估计量，并讨论它们的一致性。

8. 设总体均值和方差分别为 $\mu$ 与 $\sigma^2$，使用 $\bar X$ 与 $V_n=n^{-1}\sum_i(X_i-\bar X)^2$ 写出 $(\mu,\sigma^2)$ 的矩估计。若总体为 $N(\mu,\sigma^2)$，与 MLE 有何关系？

9. 对 Bernoulli 样本，设 $S=\sum_iX_i$。分别在 $S=0$、$0<S<n$、$S=n$ 三种情形求 $p$ 的 MLE，并说明为什么不能只解内点一阶条件。

10. 对 $N(\mu,\sigma^2)$ 的独立同分布样本，求 $(\mu,\sigma^2)$ 的 MLE，并计算 $\hat\sigma^2_{\mathrm{MLE}}$ 的偏差。进一步求 $\sigma$ 的 MLE，并判断不变性能否推出其无偏性。

11. 设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Poisson}(\lambda)$，$\lambda>0$。求 $\lambda$ 的 MLE，并利用不变性求 $p_0=\mathbb P(X=0)=e^{-\lambda}$ 的 MLE。$\hat p_0=e^{-\bar X}$ 是否无偏？说明理由。

12. 对指数分布 $f(x;\lambda)=\lambda e^{-\lambda x}$，计算单观测得分、Fisher 信息及 $\lambda$ 的 MLE，并写出该 MLE 的渐近正态分布。

13. 设 $X_i\overset{\mathrm{iid}}{\sim}\operatorname{Bernoulli}(p)$，$0<p<1$。验证单观测得分均值为零，并用两种方法计算 $I(p)$：得分方差与二阶导数期望。

14. 对正态位置模型 $N(\mu,\sigma_0^2)$，其中 $\sigma_0^2$ 已知，计算 $I(\mu)$。证明 $\bar X$ 是 $\mu$ 的无偏估计并达到 Cramér–Rao 下界。

15. 某模型的支撑集为 $(0,\theta)$。解释为什么对 $\int f(x;\theta)\,dx=1$ 直接交换求导与积分可能遗漏边界效应，并说明 Cramér–Rao 证明中哪一步因此失去依据。

16. 对 $\operatorname{Uniform}(0,\theta)$ 样本，求 $\hat\theta=X_{(n)}$ 的精确期望，并给出一个无偏修正。判断修正前后的估计量是否一致。

17. 设 $X_i$ 独立同分布于均值为 $\theta^{-1}$ 的指数分布，$\theta>0$。利用 $\bar X$ 的渐近正态性和 Delta 方法，推导 $\log\hat\theta=-\log\bar X$ 的渐近分布，其中 $\hat\theta=1/\bar X$。

18. 判断下列说法并给出理由：若 $\hat\theta$ 为 MLE，则它必无偏、必达到 Cramér–Rao 下界，且 $n^{1/2}(\hat\theta-\theta_0)$ 必渐近正态。

19. 某研究员以正态独立同分布模型估计日收益均值和波动率，并直接使用 Fisher 信息标准误。列出至少三项可能使该标准误失效的金融数据特征，并区分“参数估计仍可能有用”与“标准误仍按原模型正确”这两个问题。

20. 设 $X_i$ 独立同分布于形状参数 $\alpha$ 已知、速率参数 $\beta>0$ 未知的 Gamma 分布。求 $\beta$ 的 MLE、Fisher 信息及渐近方差；再求均值 $m=\alpha/\beta$ 的 MLE，并比较其与 $\bar X$ 的关系。
