# 第22章　Bayesian 推断与统计决策

第20章与第21章所代表的频率学派框架把未知参数视为固定而未知的常数，用估计量在重复抽样下的分布来评价推断的质量：无偏性、有效性、置信区间的覆盖率，都是关于抽样分布的陈述。本章转向另一条逻辑上同样自洽的路线，把参数本身看作随机变量，用一个概率分布刻画推断者在看到数据之前对它的不确定性，再依 Bayes 定理把数据携带的信息合并进去，得到后验分布。后验分布一次性给出点估计、区间估计与完整的不确定性信息，因而可以直接作为决策的输入；这正是量化研究中把参数不确定性与组合选择、风险预算衔接起来时最需要的数学形式。

本章前三节建立 Bayesian 推断的计算骨架：先验与似然如何合成后验，共轭族为何能把后验写成闭式，后验怎样汇总为均值、中位数、众数与可信区间，如何由后验导出预测分布，以及在缺乏先验信息时怎样构造无信息先验，特别是 Jeffreys 先验。后四节（22.4 至 22.7 节）进入统计决策理论，证明在平方损失、绝对损失与 0-1 损失下 Bayes 规则分别是后验均值、后验中位数与后验众数，比较 Bayesian 估计的频率性质，介绍 Metropolis–Hastings 与 Gibbs 抽样，最后落到协方差矩阵收缩、Black–Litterman 模型与因子先验等量化应用。

阅读本章需要第11章的常见分布与第12章的多元正态分布；22.2 节的预测分布计算反复使用第13章的条件期望与重期望公式；22.6 节的抽样方法与第18章蒙特卡洛模拟直接衔接；22.7 节的收缩估计将在第23章以正则化的语言重新出现。

## 22.1 先验、似然与后验

Bayesian 推断的出发点是在频率学派的统计模型之上再加一层概率结构。统计模型描述「给定参数时数据如何产生」，先验分布描述「在数据到来之前参数如何取值」，二者合起来确定参数与数据的联合分布，而推断的对象正是这个联合分布中参数关于数据的条件分布。

**定义 22.1（统计模型、先验分布、似然函数与后验分布）**

设 $\mathcal X$ 为样本空间，$\{p(x\mid\theta):\theta\in\Theta\}$ 是一族关于某个固定基准测度的密度函数或概率函数，构成参数统计模型，其中 $\Theta\subseteq\mathbb R^d$ 为参数空间。在 $\Theta$ 上给定一个概率分布 $\Pi$，其密度（或概率函数）记为 $\pi(\theta)$，称 $\pi$ 为 $\theta$ 的**先验分布**。对观测数据 $x$，函数 $L(\theta;x)=p(x\mid\theta)$ 称为**似然函数**；量

$$m(x)=\int_\Theta p(x\mid\theta)\,\pi(\theta)\,\mathrm d\theta$$

称为**边际似然**，也称**证据**。参数 $\theta$ 在给定 $X=x$ 条件下的分布称为**后验分布**，其密度记为 $\pi(\theta\mid x)$。

定义中先验与后验都是关于 $\theta$ 的概率分布，似然则是 $\theta$ 的函数但不必是密度；三者通过联合密度 $p(x,\theta)=p(x\mid\theta)\pi(\theta)$ 联系在一起。当 $\Theta$ 为可数集时，积分换成求和，以下全部结论的形式不变。

**定理 22.2（Bayes 定理）**

在定义 22.1 的设定下，若 $0<m(x)<\infty$，则后验密度存在，且

$$\pi(\theta\mid x)=\frac{p(x\mid\theta)\,\pi(\theta)}{m(x)}=\frac{p(x\mid\theta)\,\pi(\theta)}{\int_\Theta p(x\mid u)\,\pi(u)\,\mathrm d u},\tag{22.1}$$

等价地可写成比例形式

$$\pi(\theta\mid x)\propto p(x\mid\theta)\,\pi(\theta),\qquad \theta\in\Theta,\tag{22.2}$$

其中比例常数与 $\theta$ 无关，由归一化条件 $\int_\Theta \pi(\theta\mid x)\,\mathrm d\theta=1$ 唯一确定。

**证明**

参数与数据的联合密度为 $p(x,\theta)=p(x\mid\theta)\pi(\theta)$。按条件密度的定义，

$$\pi(\theta\mid x)=\frac{p(x,\theta)}{p_X(x)},$$

其中 $p_X(x)$ 是 $X$ 的边际密度。把联合密度关于 $\theta$ 积分，得

$$p_X(x)=\int_\Theta p(x,\theta)\,\mathrm d\theta=\int_\Theta p(x\mid\theta)\,\pi(\theta)\,\mathrm d\theta=m(x),$$

于是 $p_X(x)=m(x)$，代回前一式即得式（22.1）。在 $0<m(x)<\infty$ 时该比值有意义，并且

$$\int_\Theta \pi(\theta\mid x)\,\mathrm d\theta=\frac{1}{m(x)}\int_\Theta p(x\mid\theta)\,\pi(\theta)\,\mathrm d\theta=\frac{m(x)}{m(x)}=1,$$

故式（22.1）右端确为一个密度函数。把分母 $m(x)$ 看作与 $\theta$ 无关的正常数，式（22.1）立即化为式（22.2）；反之，若非负函数 $h(\theta)=p(x\mid\theta)\pi(\theta)$ 满足 $0<\int_\Theta h<\infty$，则 $\pi(\theta\mid x)=h(\theta)/\int_\Theta h$ 同时满足式（22.1）与式（22.2），两式等价。

□

式（22.2）是全部 Bayesian 计算的操作性形式：分母 $m(x)$ 只影响归一化而不影响后验的形状，因此实际计算中只需识别出 $p(x\mid\theta)\pi(\theta)$ 关于 $\theta$ 的函数形式。特别地，当这个乘积恰为某个已知分布族的核（即去掉归一化常数后的部分）时，后验便落在同一族内，归一化常数可由该族的公式直接写出，完全避免计算积分。这一性质称为共轭性，它是本节余下部分的主线。


**定义 22.3（共轭先验族）**

设似然族为 $\{p(x\mid\theta):\theta\in\Theta\}$，$\mathcal F=\{f(\cdot\mid\boldsymbol\eta):\boldsymbol\eta\in H\}$ 是参数空间 $\Theta$ 上的一族概率分布，$H$ 为超参数集。若对任意先验 $f(\theta\mid\boldsymbol\eta)\in\mathcal F$ 与任意样本 $x$，由式（22.2）确定的后验仍属于 $\mathcal F$，即存在映射 $\boldsymbol\eta\mapsto\boldsymbol\eta(x)$ 使得

$$\pi(\theta\mid x)=f\big(\theta\mid\boldsymbol\eta(x)\big),$$

则称 $\mathcal F$ 为该似然族（或该统计模型）的**共轭先验族**，$\boldsymbol\eta$ 称为**超参数**，$\boldsymbol\eta(x)$ 称为**后验超参数**。

共轭性的价值有三层。其一是计算上的：后验有闭式，无需数值积分或抽样。其二是解释上的：后验超参数通常是先验超参数与样本统计量的简单相加，先验被解读为「相当于若干个虚拟观测」，这在量化研究中极便于与从业者沟通。其三是序贯性：把本次后验当作下次分析的先验，超参数只需继续累加，这与实时更新的因子估计、动态风险预算天然契合。

**定理 22.4（正态—正态共轭）**

设 $X_1,\dots,X_n$ 在给定参数下条件独立同分布。

（i）（均值未知、方差已知）若 $X_i\mid\theta\sim N(\theta,\sigma^2)$，$\sigma^2$ 已知，先验取 $\theta\sim N(\mu_0,\tau_0^2)$，则后验仍为正态：

$$\theta\mid\boldsymbol x\sim N(\mu_n,\tau_n^2),\qquad \tau_n^2=\left(\frac{1}{\tau_0^2}+\frac{n}{\sigma^2}\right)^{-1},\qquad \mu_n=\tau_n^2\left(\frac{\mu_0}{\tau_0^2}+\frac{n\bar x}{\sigma^2}\right),\tag{22.3}$$

其中 $\bar x=n^{-1}\sum_{i=1}^n x_i$。后验均值还可写成样本均值与先验均值的凸组合

$$\mu_n=(1-\lambda)\,\bar x+\lambda\,\mu_0,\qquad \lambda=\frac{\sigma^2/n}{\tau_0^2+\sigma^2/n}\in(0,1),\tag{22.4}$$

且后验精度等于先验精度与数据精度之和：$\tau_n^{-2}=\tau_0^{-2}+n\sigma^{-2}$。

（ii）（均值已知、方差未知）若 $X_i\mid\sigma^2\sim N(\mu,\sigma^2)$，$\mu$ 已知，先验取 $\sigma^2\sim\mathrm{IG}(a_0,b_0)$，其中 $\mathrm{IG}(a,b)$ 表示密度为

$$f(t)=\frac{b^a}{\Gamma(a)}\,t^{-(a+1)}\exp\!\left(-\frac{b}{t}\right),\qquad t>0$$

的逆 Gamma 分布，则后验仍为逆 Gamma：

$$\sigma^2\mid\boldsymbol x\sim\mathrm{IG}\!\left(a_0+\frac n2,\;b_0+\frac12\sum_{i=1}^n(x_i-\mu)^2\right).\tag{22.5}$$

**证明**

先证（i）。似然函数为

$$p(\boldsymbol x\mid\theta)=\prod_{i=1}^n\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x_i-\theta)^2}{2\sigma^2}\right)=(2\pi\sigma^2)^{-n/2}\exp\!\left(-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\theta)^2\right),$$

先验密度为 $\pi(\theta)=(2\pi\tau_0^2)^{-1/2}\exp\{-(\theta-\mu_0)^2/(2\tau_0^2)\}$。由式（22.2），凡与 $\theta$ 无关的因子都可并入比例常数，于是

$$\pi(\theta\mid\boldsymbol x)\propto\exp\!\left\{-\frac{1}{2}\left[\frac{1}{\sigma^2}\sum_{i=1}^n(x_i-\theta)^2+\frac{(\theta-\mu_0)^2}{\tau_0^2}\right]\right\}.$$

对求和项作恒等分解（与第21章的平方和分解同一技巧）：

$$\sum_{i=1}^n(x_i-\theta)^2=\sum_{i=1}^n(x_i-\bar x)^2+n(\bar x-\theta)^2,$$

这是因为 $\sum_i(x_i-\theta)^2=\sum_i[(x_i-\bar x)+(\bar x-\theta)]^2=\sum_i(x_i-\bar x)^2+2(\bar x-\theta)\sum_i(x_i-\bar x)+n(\bar x-\theta)^2$，而 $\sum_i(x_i-\bar x)=0$。第一项与 $\theta$ 无关，可并入常数，故

$$\pi(\theta\mid\boldsymbol x)\propto\exp\!\left\{-\frac{1}{2}\left[\frac{n}{\sigma^2}(\theta-\bar x)^2+\frac{1}{\tau_0^2}(\theta-\mu_0)^2\right]\right\}.$$

展开指数中关于 $\theta$ 的二次型：

$$\frac{n}{\sigma^2}(\theta-\bar x)^2+\frac{1}{\tau_0^2}(\theta-\mu_0)^2=\left(\frac{n}{\sigma^2}+\frac{1}{\tau_0^2}\right)\theta^2-2\left(\frac{n\bar x}{\sigma^2}+\frac{\mu_0}{\tau_0^2}\right)\theta+\left(\frac{n\bar x^2}{\sigma^2}+\frac{\mu_0^2}{\tau_0^2}\right).$$

记 $A=\tau_0^{-2}+n\sigma^{-2}$，$B=\mu_0\tau_0^{-2}+n\bar x\sigma^{-2}$，配方得 $A\theta^2-2B\theta=A(\theta-B/A)^2-B^2/A$。末项与 $\theta$ 无关，于是

$$\pi(\theta\mid\boldsymbol x)\propto\exp\!\left\{-\frac{A}{2}\left(\theta-\frac{B}{A}\right)^2\right\},$$

这正是均值为 $B/A$、方差为 $1/A$ 的正态密度核。由归一化密度的唯一性，$\tau_n^2=1/A$、$\mu_n=B/A$，即式（22.3）。再验证式（22.4）：

$$\mu_n=\frac{\mu_0/\tau_0^2+n\bar x/\sigma^2}{1/\tau_0^2+n/\sigma^2}=\frac{\tau_0^2\sigma^2}{\sigma^2+n\tau_0^2}\left(\frac{\mu_0}{\tau_0^2}+\frac{n\bar x}{\sigma^2}\right)=\frac{n\tau_0^2}{\sigma^2+n\tau_0^2}\,\bar x+\frac{\sigma^2}{\sigma^2+n\tau_0^2}\,\mu_0,$$

而 $\lambda=\sigma^2/(\sigma^2+n\tau_0^2)=(\sigma^2/n)/(\tau_0^2+\sigma^2/n)$，$1-\lambda=n\tau_0^2/(\sigma^2+n\tau_0^2)$，两系数之和为一且均为正，故式（22.4）成立，$\mu_n$ 确为 $\bar x$ 与 $\mu_0$ 的凸组合。
再证（ii）。记 $S=\sum_{i=1}^n(x_i-\mu)^2$。似然函数关于 $\sigma^2$ 的依赖为

$$p(\boldsymbol x\mid\sigma^2)=(2\pi\sigma^2)^{-n/2}\exp\!\left(-\frac{S}{2\sigma^2}\right)\propto(\sigma^2)^{-n/2}\exp\!\left(-\frac{S}{2\sigma^2}\right),$$

先验密度的核为 $\pi(\sigma^2)\propto(\sigma^2)^{-(a_0+1)}\exp(-b_0/\sigma^2)$。二者相乘得后验的核

$$\pi(\sigma^2\mid\boldsymbol x)\propto(\sigma^2)^{-(a_0+n/2+1)}\exp\!\left\{-\frac{1}{\sigma^2}\left(b_0+\frac S2\right)\right\}.$$

把 $a_n=a_0+n/2$、$b_n=b_0+S/2$ 代入，上式恰为 $\mathrm{IG}(a_n,b_n)$ 密度的核 $(\sigma^2)^{-(a_n+1)}\exp(-b_n/\sigma^2)$。由于核唯一确定归一化后的密度（归一化常数必为 $\Gamma(a_n)^{-1}b_n^{a_n}$），故 $\sigma^2\mid\boldsymbol x\sim\mathrm{IG}(a_n,b_n)$，即式（22.5）。

□

**注记（均值与方差同时未知）**

当 $\mu$ 与 $\sigma^2$ 都未知时，共轭先验是正态—逆 Gamma 分布：取 $\sigma^2\sim\mathrm{IG}(a_0,b_0)$，$\mu\mid\sigma^2\sim N(\mu_0,\sigma^2/\kappa_0)$，其中 $\kappa_0>0$ 可解释为先验所代表的「虚拟观测个数」。此时联合后验满足：给定 $\sigma^2$ 时 $\mu$ 的条件后验由定理 22.4（i）给出，为 $N(\mu_n,\sigma^2/\kappa_n)$，其中 $\kappa_n=\kappa_0+n$、$\mu_n=(\kappa_0\mu_0+n\bar x)/\kappa_n$；给定 $\mu$ 时 $\sigma^2$ 的条件后验由定理 22.4（ii）给出。$\mu$ 的边际后验可完整算出。由重期望公式的思路，

$$\pi(\mu\mid\boldsymbol x)=\int_0^\infty\pi(\mu\mid\sigma^2,\boldsymbol x)\,\pi(\sigma^2\mid\boldsymbol x)\,\mathrm d\sigma^2,$$

其中 $\pi(\sigma^2\mid\boldsymbol x)=\mathrm{IG}(a_n,b_n)$，$a_n=a_0+n/2$，$b_n=b_0+\frac12\sum_i(x_i-\bar x)^2+\frac{\kappa_0 n(\bar x-\mu_0)^2}{2(\kappa_0+n)}$。被积函数正比于

$$(\sigma^2)^{-1/2}\exp\!\left(-\frac{\kappa_n(\mu-\mu_n)^2}{2\sigma^2}\right)(\sigma^2)^{-(a_n+1)}\exp\!\left(-\frac{b_n}{\sigma^2}\right)=(\sigma^2)^{-(a_n+3/2)}\exp\!\left(-\frac{c}{\sigma^2}\right),$$

其中 $c=b_n+\kappa_n(\mu-\mu_n)^2/2$。作变量替换 $u=1/\sigma^2$，$\mathrm d\sigma^2=-u^{-2}\mathrm d u$，积分化为

$$\int_0^\infty u^{a_n-1/2}e^{-cu}\,\mathrm d u=\Gamma\!\left(a_n+\frac12\right)c^{-(a_n+1/2)},$$

这里用到了 Gamma 积分 $\int_0^\infty u^{\alpha-1}e^{-cu}\mathrm d u=\Gamma(\alpha)c^{-\alpha}$，取 $\alpha=a_n+1/2$。因此

$$\pi(\mu\mid\boldsymbol x)\propto\left[b_n+\frac{\kappa_n(\mu-\mu_n)^2}{2}\right]^{-(a_n+1/2)}\propto\left[1+\frac{(\mu-\mu_n)^2}{(2a_n)\,b_n/(a_n\kappa_n)}\right]^{-\frac{2a_n+1}{2}},$$

这正是位置参数 $\mu_n$、尺度参数 $s_n=\sqrt{b_n/(a_n\kappa_n)}$、自由度 $\nu=2a_n$ 的 Student $t$ 密度核。换言之，$\dfrac{\mu-\mu_n}{s_n}\;\Big|\;\boldsymbol x\sim t_{2a_n}$。这与第20章中「方差未知时用 $t$ 区间」的频率结论形式一致，但含义不同：这里 $t$ 分布是参数的后验分布，可直接读出「$\mu$ 落入某区间的后验概率」，而置信区间只有重复抽样意义上的覆盖率。

**例 22.1**

某策略的日收益率近似正态，同类研究提示日波动率约为 $\sigma=1\%$，此处把 $\sigma$ 视为已知。分析师对日均收益 $\theta$ 的先验取 $N(\mu_0,\tau_0^2)$，其中 $\mu_0=0.02\%$，$\tau_0=0.05\%$。现观察到 $n=60$ 个交易日，样本均值 $\bar x=0.06\%$。求后验分布、$95\%$ 等尾可信区间与 $\mathbb P(\theta>0\mid\boldsymbol x)$，并与极大似然估计比较。

**解**

以百分点为单位，则 $\sigma^2=1$，$\tau_0^2=0.0025$，$\bar x=0.06$，$\mu_0=0.02$，$n=60$。先验精度为 $\tau_0^{-2}=400$，数据精度为 $n\sigma^{-2}=60$，后验精度为二者之和 $460$，故

$$\tau_n^2=\frac{1}{460}=0.0021739,\qquad \tau_n=0.046625,$$

$$\mu_n=\frac{400\times0.02+60\times0.06}{460}=\frac{8+3.6}{460}=0.025217.$$

后验为 $\theta\mid\boldsymbol x\sim N\big(0.0252\%,(0.0466\%)^2\big)$。由式（22.4），先验所占权重为 $\lambda=400/460=0.8696$，即后验均值约 $87\%$ 来自先验、$13\%$ 来自样本：本例中先验信息远强于 60 个交易日所提供的信息，因为数据精度只有 60，而先验精度相当于 400 个观测。$95\%$ 等尾可信区间为

$$0.025217\pm1.96\times0.046625=(-0.0662,\;0.1166),$$

以百分点计，年化（乘以 252）后约为 $(-16.7\%,\;29.4\%)$。又

$$\mathbb P(\theta>0\mid\boldsymbol x)=1-\Phi\!\left(\frac{0-0.025217}{0.046625}\right)=1-\Phi(-0.5409)=\Phi(0.5409)\approx0.706,$$

即数据支持日均收益为正的后验概率约 $70.6\%$。与之对照，频率学派的 $z$ 统计量为 $\bar x/(\sigma/\sqrt n)=0.06/0.1291=0.465$，在 $5\%$ 水平上远不显著；两种框架给出的实质判断一致：60 个观测不足以确认正收益。极大似然估计 $\hat\theta_{\mathrm{MLE}}=\bar x=0.06\%$（年化 $15.1\%$）约为后验均值的 2.4 倍，差异完全来自先验的收缩。若把先验精度降为 $\tau_0^{-2}=10$（即 $\tau_0=0.316\%$），则 $\lambda=10/70=0.1429$，$\mu_n=(10\times0.02+60\times0.06)/70=0.0543$，已十分接近样本均值；这一对照是 22.3 节先验敏感性分析的具体形态。

**定理 22.5（Beta—二项共轭）**

设 $X\mid\theta\sim B(n,\theta)$，即 $\mathbb P(X=k\mid\theta)=\binom nk\theta^k(1-\theta)^{n-k}$，$k=0,1,\dots,n$，先验取 $\theta\sim\mathrm{Beta}(\alpha_0,\beta_0)$，其密度为

$$\pi(\theta)=\frac{\Gamma(\alpha_0+\beta_0)}{\Gamma(\alpha_0)\Gamma(\beta_0)}\,\theta^{\alpha_0-1}(1-\theta)^{\beta_0-1},\qquad 0<\theta<1 .$$

则后验仍为 Beta 分布：

$$\theta\mid X=k\;\sim\;\mathrm{Beta}(\alpha_0+k,\;\beta_0+n-k),\tag{22.6}$$

其后验均值与后验方差分别为

$$\mathbb E[\theta\mid X=k]=\frac{\alpha_0+k}{\alpha_0+\beta_0+n},\qquad \operatorname{Var}(\theta\mid X=k)=\frac{(\alpha_0+k)(\beta_0+n-k)}{(\alpha_0+\beta_0+n)^2(\alpha_0+\beta_0+n+1)}.$$

若数据是 $n$ 个条件独立的 Bernoulli 观测 $x_1,\dots,x_n$ 而非其和 $k$，后验不变，因为此时似然 $\theta^{s}(1-\theta)^{n-s}$（$s=\sum_i x_i$）与二项似然只差一个与 $\theta$ 无关的因子 $\binom ns$ 的取值方式。

**证明**

由式（22.2），后验密度正比于似然与先验的乘积。二项概率中的组合数 $\binom nk$ 不含 $\theta$，故

$$\pi(\theta\mid X=k)\propto\theta^k(1-\theta)^{n-k}\cdot\theta^{\alpha_0-1}(1-\theta)^{\beta_0-1}=\theta^{\alpha_0+k-1}(1-\theta)^{\beta_0+n-k-1}.$$

右端正是 $\mathrm{Beta}(\alpha_0+k,\beta_0+n-k)$ 的密度核。核唯一确定归一化密度，故后验就是 $\mathrm{Beta}(\alpha_0+k,\beta_0+n-k)$，即式（22.6）。

再算后验均值。记 $\alpha=\alpha_0+k$，$\beta=\beta_0+n-k$，用 Beta 函数的定义 $B(\alpha,\beta)=\Gamma(\alpha)\Gamma(\beta)/\Gamma(\alpha+\beta)$：

$$\mathbb E[\theta\mid X=k]=\frac{1}{B(\alpha,\beta)}\int_0^1\theta^{\alpha}(1-\theta)^{\beta-1}\mathrm d\theta=\frac{B(\alpha+1,\beta)}{B(\alpha,\beta)}=\frac{\Gamma(\alpha+1)\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\alpha+\beta+1)}=\frac{\alpha}{\alpha+\beta},$$

其中用了 $\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$。同理，

$$\mathbb E[\theta^2\mid X=k]=\frac{B(\alpha+2,\beta)}{B(\alpha,\beta)}=\frac{\Gamma(\alpha+2)\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\alpha+\beta+2)}=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)},$$

于是

$$\operatorname{Var}(\theta\mid X=k)=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}-\frac{\alpha^2}{(\alpha+\beta)^2}=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)},$$

通分过程中分子为 $\alpha(\alpha+1)(\alpha+\beta)-\alpha^2(\alpha+\beta+1)=\alpha\beta$。把 $\alpha=\alpha_0+k$、$\beta=\beta_0+n-k$、$\alpha+\beta=\alpha_0+\beta_0+n$ 代回即得结论。

□

**注记（Beta—二项后验均值的收缩结构）**

把式（22.6）的后验均值改写为

$$\mathbb E[\theta\mid X=k]=\frac{\alpha_0+\beta_0}{\alpha_0+\beta_0+n}\cdot\frac{\alpha_0}{\alpha_0+\beta_0}+\frac{n}{\alpha_0+\beta_0+n}\cdot\frac{k}{n},\tag{22.7}$$

右端两项系数之和为一：第一项是先验均值 $\alpha_0/(\alpha_0+\beta_0)$，第二项是样本频率 $k/n$，权重分别为「先验等效样本量」$\alpha_0+\beta_0$ 与实际样本量 $n$。这与定理 22.4 中式（22.4）的精度加权结构完全平行：Beta 分布的 $\alpha_0+\beta_0$ 扮演精度的角色，$\alpha_0$、$\beta_0$ 则分别扮演先验中「成功次数」与「失败次数」的角色。当 $n\to\infty$ 时权重退化为 $k/n$，先验的影响消失，这是后验收敛于真实参数（Bernstein–von Mises 现象）在最简单情形的体现。

**定理 22.6（Gamma—Poisson 共轭）**

设 $X_1,\dots,X_n$ 在给定 $\theta$ 下条件独立且 $X_i\mid\theta\sim\mathrm{Poisson}(\theta)$，先验取 $\theta\sim\mathrm{Gamma}(a_0,b_0)$，即密度

$$\pi(\theta)=\frac{b_0^{a_0}}{\Gamma(a_0)}\,\theta^{a_0-1}e^{-b_0\theta},\qquad \theta>0 ,$$

其中 $a_0>0$ 为形状参数，$b_0>0$ 为率参数。则后验为

$$\theta\mid\boldsymbol x\sim\mathrm{Gamma}\!\left(a_0+\sum_{i=1}^n x_i,\;b_0+n\right),\tag{22.8}$$

后验均值与方差为

$$\mathbb E[\theta\mid\boldsymbol x]=\frac{a_0+\sum_i x_i}{b_0+n},\qquad \operatorname{Var}(\theta\mid\boldsymbol x)=\frac{a_0+\sum_i x_i}{(b_0+n)^2} .$$

**证明**

Poisson 概率函数为 $\mathbb P(X_i=x_i\mid\theta)=e^{-\theta}\theta^{x_i}/x_i!$，故似然

$$p(\boldsymbol x\mid\theta)=\prod_{i=1}^n\frac{e^{-\theta}\theta^{x_i}}{x_i!}=\left(\prod_{i=1}^n\frac{1}{x_i!}\right)\theta^{\sum_i x_i}e^{-n\theta}\propto\theta^{\sum_i x_i}e^{-n\theta}.$$

先验密度的核为 $\theta^{a_0-1}e^{-b_0\theta}$。相乘得

$$\pi(\theta\mid\boldsymbol x)\propto\theta^{a_0+\sum_i x_i-1}\exp\!\left\{-\left(b_0+n\right)\theta\right\},$$

这正是 $\mathrm{Gamma}(a_0+\sum_i x_i,\,b_0+n)$ 的核，归一化常数必为 $(b_0+n)^{a_0+\sum_i x_i}/\Gamma(a_0+\sum_i x_i)$，于是式（22.8）成立。

对一般 $\mathrm{Gamma}(a,b)$，其一阶与二阶矩由 Gamma 积分直接给出：

$$\mathbb E[\theta]=\frac{b^a}{\Gamma(a)}\int_0^\infty\theta^{a}e^{-b\theta}\mathrm d\theta=\frac{b^a}{\Gamma(a)}\cdot\frac{\Gamma(a+1)}{b^{a+1}}=\frac{a}{b},$$

$$\mathbb E[\theta^2]=\frac{b^a}{\Gamma(a)}\int_0^\infty\theta^{a+1}e^{-b\theta}\mathrm d\theta=\frac{b^a}{\Gamma(a)}\cdot\frac{\Gamma(a+2)}{b^{a+2}}=\frac{a(a+1)}{b^2},$$

其中用到了 $\int_0^\infty\theta^{c-1}e^{-b\theta}\mathrm d\theta=\Gamma(c)b^{-c}$。故 $\operatorname{Var}(\theta)=a(a+1)/b^2-a^2/b^2=a/b^2$。令 $a=a_0+\sum_i x_i$、$b=b_0+n$ 即得后验均值与方差。

□

**注记（Gamma—指数与 Gamma—正态）**

定理 22.6 中取 $n$ 个条件独立的指数观测（即 Poisson 过程的到达间隔），似然仍为 $\theta^ne^{-\theta\sum_i x_i}$，后验同为 $\mathrm{Gamma}(a_0+n,b_0+\sum_i x_i)$，可见共轭关系由似然的函数形式而非具体抽样方案决定。另外，若 $X_i\mid\sigma^2\sim N(0,\sigma^2)$ 而以精度 $\phi=1/\sigma^2$ 为参数，则似然 $\propto\phi^{n/2}\exp(-\phi\sum_i x_i^2/2)$，共轭先验为 $\phi\sim\mathrm{Gamma}(a_0,b_0)$，后验为 $\mathrm{Gamma}(a_0+n/2,\,b_0+\frac12\sum_i x_i^2)$；这与定理 22.4（ii）的逆 Gamma 结论是同一事实的两种参数化，因为 $\sigma^2\sim\mathrm{IG}(a,b)$ 等价于 $1/\sigma^2\sim\mathrm{Gamma}(a,b)$。

**例 22.2**

把某资产「极端波动日」（单日绝对收益超过 $2\%$）的月度发生次数记为 $X$，建模为 $X\mid\theta\sim\mathrm{Poisson}(\theta)$，$\theta$ 为月均次数。依据历史经验，先验取 $\mathrm{Gamma}(a_0,b_0)=\mathrm{Gamma}(2,1)$，即先验均值 $a_0/b_0=2$ 次、先验方差 $a_0/b_0^2=2$，率参数 $b_0=1$ 可解释为先验相当于 $1$ 个月的虚拟观测。现统计 $n=12$ 个月，共出现 $\sum_i x_i=31$ 个极端波动日。求后验分布、$95\%$ 等尾可信区间与 $\mathbb P(\theta>3\mid\boldsymbol x)$。

**解**

由定理 22.6，后验为

$$\theta\mid\boldsymbol x\sim\mathrm{Gamma}(2+31,\;1+12)=\mathrm{Gamma}(33,13),$$

后验均值 $\mathbb E[\theta\mid\boldsymbol x]=33/13=2.538$，后验方差 $33/13^2=0.1953$，后验标准差 $0.442$。用收缩形式检验：后验均值 $=\frac{1}{13}\times2+\frac{12}{13}\times\frac{31}{12}=0.154+2.385=2.538$，其中先验权重 $b_0/(b_0+n)=1/13\approx0.077$，样本权重 $12/13\approx0.923$，说明一年数据已足以压倒这条较弱的先验。极大似然估计为 $\hat\theta_{\mathrm{MLE}}=\bar x=31/12=2.583$，其频率标准误为 $\sqrt{\bar x/n}=\sqrt{2.583/12}=0.464$，与后验标准差 $0.442$ 接近但略大。

$\mathrm{Gamma}(33,13)$ 的 $0.025$ 与 $0.975$ 分位数无闭式，需数值求解不完全 Gamma 函数方程；计算给出 $95\%$ 等尾可信区间约为 $(1.75,\,3.47)$。同理，$\mathbb P(\theta>3\mid\boldsymbol x)=1-F_{\mathrm{Gamma}(33,13)}(3)\approx0.15$，即「月均极端波动日超过 $3$ 天」的后验概率约 $15\%$，尚不足以据此调整风险预算，但已足以引起警觉。若改用无信息先验 $\mathrm{Gamma}(\varepsilon,\varepsilon)$ 并令 $\varepsilon\to0$，后验均值趋于 $31/12=2.583$，与极大似然一致；两种选择的差别在本例中不足 $2\%$，这正是 22.3 节所说的先验影响随样本量衰减。

**定理 22.7（Dirichlet—多项共轭）**

设 $n$ 次独立试验中落入 $K$ 个互斥类别的计数为 $\boldsymbol X=(X_1,\dots,X_K)$，$\sum_{j=1}^K X_j=n$，类别概率为 $\boldsymbol\theta=(\theta_1,\dots,\theta_K)$，取值于开单纯形

$$S_K=\Big\{(\theta_1,\dots,\theta_K):\theta_j>0,\ \sum_{j=1}^K\theta_j=1\Big\} .$$

多项分布的概率函数为

$$\mathbb P(\boldsymbol X=(n_1,\dots,n_K)\mid\boldsymbol\theta)=\frac{n!}{n_1!\cdots n_K!}\prod_{j=1}^K\theta_j^{n_j},\qquad \sum_{j=1}^K n_j=n .$$

先验取 $\boldsymbol\theta\sim\mathrm{Dir}(\alpha_1,\dots,\alpha_K)$，即关于 $S_K$ 上的 $(K-1)$ 维 Lebesgue 测度有密度

$$\pi(\boldsymbol\theta)=\frac{\Gamma(\alpha_0)}{\Gamma(\alpha_1)\cdots\Gamma(\alpha_K)}\prod_{j=1}^K\theta_j^{\alpha_j-1},\qquad \alpha_0=\sum_{j=1}^K\alpha_j .$$

则后验仍为 Dirichlet 分布：

$$\boldsymbol\theta\mid\boldsymbol x\sim\mathrm{Dir}(\alpha_1+n_1,\dots,\alpha_K+n_K),\tag{22.9}$$

且对每个 $j$，边际后验 $\theta_j\mid\boldsymbol x\sim\mathrm{Beta}\big(\alpha_j+n_j,\ \alpha_0-\alpha_j+n-n_j\big)$，后验矩为

$$\mathbb E[\theta_j\mid\boldsymbol x]=\frac{\alpha_j+n_j}{\alpha_0+n},\qquad \operatorname{Var}(\theta_j\mid\boldsymbol x)=\frac{(\alpha_j+n_j)(\alpha_0+n-\alpha_j-n_j)}{(\alpha_0+n)^2(\alpha_0+n+1)},$$

$$\operatorname{Cov}(\theta_j,\theta_k\mid\boldsymbol x)=-\frac{(\alpha_j+n_j)(\alpha_k+n_k)}{(\alpha_0+n)^2(\alpha_0+n+1)},\qquad j\neq k .$$

**证明**

多项概率中的系数 $n!/(n_1!\cdots n_K!)$ 不含 $\boldsymbol\theta$，由式（22.2）得后验核

$$\pi(\boldsymbol\theta\mid\boldsymbol x)\propto\left(\prod_{j=1}^K\theta_j^{n_j}\right)\left(\prod_{j=1}^K\theta_j^{\alpha_j-1}\right)=\prod_{j=1}^K\theta_j^{\alpha_j+n_j-1}.$$

记 $\beta_j=\alpha_j+n_j$、$\beta_0=\sum_j\beta_j=\alpha_0+n$，则上式为 $\mathrm{Dir}(\beta_1,\dots,\beta_K)$ 的密度核，其归一化常数是 $\Gamma(\beta_0)/\prod_j\Gamma(\beta_j)$，故式（22.9）成立。

再求边际后验。Dirichlet 的归一化关系 $\int_{S_K}\prod_j\theta_j^{\beta_j-1}\mathrm d\boldsymbol\theta=\prod_j\Gamma(\beta_j)/\Gamma(\beta_0)$ 给出 $\theta_j$ 的边际密度（对固定的 $\theta_j$，其余分量在缩放单纯形 $\{\theta_l>0,\sum_{l\neq j}\theta_l=1-\theta_j\}$ 上）：令 $\theta_l=(1-\theta_j)u_l$，$l\neq j$，其中 $\boldsymbol u$ 属于 $K-1$ 个分量的单纯形，该替换的 Jacobi 行列式为 $(1-\theta_j)^{K-2}$，于是

$$\pi(\theta_j\mid\boldsymbol x)\propto\theta_j^{\beta_j-1}(1-\theta_j)^{\sum_{l\neq j}(\beta_l-1)}(1-\theta_j)^{K-2}\int\prod_{l\neq j}u_l^{\beta_l-1}\mathrm d\boldsymbol u .$$

末项积分是不含 $\theta_j$ 的常数，而指数 $\sum_{l\neq j}(\beta_l-1)+K-2=(\beta_0-\beta_j)-(K-1)+K-2=\beta_0-\beta_j-1$，故

$$\pi(\theta_j\mid\boldsymbol x)\propto\theta_j^{\beta_j-1}(1-\theta_j)^{\beta_0-\beta_j-1},$$

即 $\theta_j\mid\boldsymbol x\sim\mathrm{Beta}(\beta_j,\beta_0-\beta_j)$，代入 $\beta_j=\alpha_j+n_j$、$\beta_0-\beta_j=\alpha_0-\alpha_j+n-n_j$ 即为所断言。

最后计算后验矩。对 $j$ 固定，

$$\mathbb E[\theta_j\mid\boldsymbol x]=\frac{\Gamma(\beta_0)}{\prod_l\Gamma(\beta_l)}\int_{S_K}\theta_j\prod_l\theta_l^{\beta_l-1}\mathrm d\boldsymbol\theta=\frac{\Gamma(\beta_0)}{\prod_l\Gamma(\beta_l)}\cdot\frac{\Gamma(\beta_j+1)\prod_{l\neq j}\Gamma(\beta_l)}{\Gamma(\beta_0+1)}=\frac{\beta_j}{\beta_0},$$

其中把被积函数看成参数为 $\beta_j+1$、其余不变的 Dirichlet 核，并用 $\Gamma(\beta_j+1)=\beta_j\Gamma(\beta_j)$、$\Gamma(\beta_0+1)=\beta_0\Gamma(\beta_0)$。同理，对 $j\neq k$，

$$\mathbb E[\theta_j\theta_k\mid\boldsymbol x]=\frac{\Gamma(\beta_0)}{\Gamma(\beta_0+2)}\cdot\frac{\Gamma(\beta_j+1)\Gamma(\beta_k+1)}{\Gamma(\beta_j)\Gamma(\beta_k)}=\frac{\beta_j\beta_k}{\beta_0(\beta_0+1)},\qquad \mathbb E[\theta_j^2\mid\boldsymbol x]=\frac{\beta_j(\beta_j+1)}{\beta_0(\beta_0+1)} .$$

于是

$$\operatorname{Var}(\theta_j\mid\boldsymbol x)=\frac{\beta_j(\beta_j+1)}{\beta_0(\beta_0+1)}-\frac{\beta_j^2}{\beta_0^2}=\frac{\beta_j\big[\beta_0(\beta_j+1)-\beta_j(\beta_0+1)\big]}{\beta_0^2(\beta_0+1)}=\frac{\beta_j(\beta_0-\beta_j)}{\beta_0^2(\beta_0+1)},$$

$$\operatorname{Cov}(\theta_j,\theta_k\mid\boldsymbol x)=\frac{\beta_j\beta_k}{\beta_0(\beta_0+1)}-\frac{\beta_j\beta_k}{\beta_0^2}=\frac{\beta_j\beta_k\big[\beta_0-(\beta_0+1)\big]}{\beta_0^2(\beta_0+1)}=-\frac{\beta_j\beta_k}{\beta_0^2(\beta_0+1)} .$$

协方差为负是单纯形约束 $\sum_j\theta_j=1$ 的必然结果：某一类别概率上升，其余类别概率之和必须下降。

□

**注记（与共轭族的层次关系）**

$K=2$ 时 Dirichlet 退化为 Beta，多项分布退化为二项分布，定理 22.7 完全化为定理 22.5，可见 Beta—二项是 Dirichlet—多项的特例。在量化应用中，$K$ 类划分可以是收益率的「上涨／持平／下跌」三态、市场状态的多种区制，或组合中若干行业的配置权重；Dirichlet 先验的 $\alpha_j$ 解释为第 $j$ 类的先验虚拟计数，$\alpha_0$ 为总虚拟样本量，后验均值 $(\alpha_j+n_j)/(\alpha_0+n)$ 同样是先验均值与经验频率的加权平均。取 $\alpha_1=\cdots=\alpha_K=1$ 得到单纯形上的均匀先验；取 $\alpha_j=1/2$ 得到与多项模型 Fisher 信息相对应的 Jeffreys 先验，这一点将在 22.3 节严格导出。

## 22.2 后验计算与汇总

后验分布本身是完整的推断结果，但报告与决策通常只需要少量数字。汇总分两类：刻画参数最可能位置的点汇总，与刻画参数不确定范围的区间汇总；此外还有一类面向未来的量，即预测分布，它回答「下一次观测会落在哪里」，其中既包含数据的随机性，也包含参数的不确定性。

**定义 22.8（后验汇总量与可信区间）**

设后验密度为 $\pi(\theta\mid x)$，后验分布函数为 $F(\cdot\mid x)$，水平为 $1-\alpha$。

1. **后验均值**为 $\mathbb E[\theta\mid x]=\int_\Theta\theta\,\pi(\theta\mid x)\,\mathrm d\theta$；**后验中位数** $\mathrm{med}(\theta\mid x)$ 是任一满足 $F(m\mid x)\ge1/2$ 且 $\mathbb P(\theta\ge m\mid x)\ge1/2$ 的 $m$；**后验众数** $\mathrm{mode}(\theta\mid x)$ 是 $\pi(\cdot\mid x)$ 的极大值点。
2. 若可测集 $C$ 满足 $\mathbb P(\theta\in C\mid x)=\int_C\pi(\theta\mid x)\,\mathrm d\theta=1-\alpha$，称 $C$ 为 $1-\alpha$ **后验可信集**；若 $C=[l,u]$ 且 $F(l\mid x)=\alpha/2$、$F(u\mid x)=1-\alpha/2$，称 $C$ 为 $1-\alpha$ **等尾可信区间**。
3. 若存在常数 $\kappa>0$ 使 $C_\kappa=\{\theta:\pi(\theta\mid x)\ge\kappa\}$ 满足 $\mathbb P(\theta\in C_\kappa\mid x)=1-\alpha$，称 $C_\kappa$ 为 $1-\alpha$ **最高后验密度可信集**，简称 HPD 可信集。

当后验关于其众数对称且单峰时，均值、中位数、众数三者重合，等尾区间与 HPD 区间也重合，正态后验即属此类。一旦后验偏态，三者立即分离：对 $\mathrm{Beta}(\alpha,\beta)$（$\alpha,\beta>1$），众数为 $(\alpha-1)/(\alpha+\beta-2)$，均值为 $\alpha/(\alpha+\beta)$，中位数无闭式；当 $\alpha>\beta$ 时分布负偏，三者的典型次序为众数 $>$ 中位数 $>$ 均值，例 22.3 中的 $\mathrm{Beta}(14,10)$ 即属此例。对 $\mathrm{Gamma}(a,b)$（$a>1$），众数 $(a-1)/b$ 严格小于均值 $a/b$。因此在报告偏态后验时，必须说明用的是哪一种点汇总。

可信区间与第20章的置信区间在数学形式上可能相同，解释却根本不同。因为 $\theta$ 在本章是随机变量，$\mathbb P(\theta\in C\mid x)=1-\alpha$ 是关于后验分布的真实概率陈述，可以针对已算出的这一个区间来说；而置信区间的 $1-\alpha$ 只是重复抽样下的覆盖频率，不能对固定区间赋予概率。

**注记（HPD 可信集的最短性与变换行为）**

若后验密度单峰连续，则 $1-\alpha$ 的 HPD 区间在所有满足 $\mathbb P(\theta\in C\mid x)\ge1-\alpha$ 的区间中 Lebesgue 长度最小。证明如下。记 HPD 区间为 $(a,b)=\{\theta:\pi(\theta\mid x)\ge\kappa\}$，其中 $\pi(\theta\mid x)$ 的众数 $m\in(a,b)$，$\pi(a\mid x)=\pi(b\mid x)=\kappa$，且 $\int_a^b\pi(\theta\mid x)\mathrm d\theta=1-\alpha$。任取区间 $C'=(a',b')$ 满足 $\int_{a'}^{b'}\pi\ge1-\alpha$。在 $(a,b)$ 内部密度不小于 $\kappa$，在其外部密度严格小于 $\kappa$，故

$$\int_{a'}^{b'}\pi=\int_{C'\cap(a,b)}\pi+\int_{C'\setminus(a,b)}\pi\le\left[(1-\alpha)-\kappa\,\big|(a,b)\setminus C'\big|\right]+\kappa\,\big|C'\setminus(a,b)\big| .$$

结合 $\int_{a'}^{b'}\pi\ge1-\alpha$，得 $\big|C'\setminus(a,b)\big|\ge\big|(a,b)\setminus C'\big|$，于是

$$|C'|=|C'\cap(a,b)|+\big|C'\setminus(a,b)\big|\ge|C'\cap(a,b)|+\big|(a,b)\setminus C'\big|=|(a,b)|,$$

即 HPD 区间最短。这一结论的直观含义是：为覆盖同样的后验概率，应当只取密度最高的那部分区域，而等尾区间在偏态情形下会把长度浪费在密度很低的一侧尾部。另一方面，等尾区间只依赖分布函数的分位数，在单调变换 $\theta\mapsto g(\theta)$ 下保持为对应水平的等尾区间；HPD 区间由密度阈值定义，而变换后的密度要乘以 Jacobi 因子，阈值集合随之改变，故 HPD 不具有这种变换等变性。实践中若对参数本身（如方差）还是其变换（如对数波动率）感兴趣，两种区间会给出不同答案，需明确声明。当后验多峰时，HPD 可信集是若干不相交区间的并，此时「区间」形式的可信集已不足以描述后验。

后验刻画参数，而实务中更常问的是「下一期观测会是多少」。设新观测 $\tilde X$ 在给定 $\theta$ 时与已有数据 $\boldsymbol X$ 条件独立，其条件密度为 $p(\tilde x\mid\theta)$。**后验预测密度**定义为 $\tilde X$ 在给定 $\boldsymbol X=\boldsymbol x$ 下的边际密度，由联合密度 $\pi(\theta\mid\boldsymbol x)p(\tilde x\mid\theta)$ 对 $\theta$ 积分得到：

$$p(\tilde x\mid\boldsymbol x)=\int_\Theta p(\tilde x\mid\theta)\,\pi(\theta\mid\boldsymbol x)\,\mathrm d\theta .\tag{22.10}$$

这个积分的意义值得强调：频率学派的预测只把参数替换为点估计，得到的分布忽略了参数不确定性；式（22.10）则对所有可能的参数值按后验权重求平均，因而预测分布总是比条件分布 $p(\tilde x\mid\theta)$ 更分散。由第13章的重期望公式，$\mathbb E[\tilde X\mid\boldsymbol x]=\mathbb E\big[\mathbb E[\tilde X\mid\theta]\,\big|\,\boldsymbol x\big]$；由全方差公式，

$$\operatorname{Var}(\tilde X\mid\boldsymbol x)=\mathbb E\big[\operatorname{Var}(\tilde X\mid\theta)\mid\boldsymbol x\big]+\operatorname{Var}\big(\mathbb E[\tilde X\mid\theta]\mid\boldsymbol x\big),$$

右端第二项正是参数不确定性对预测方差的贡献。

**注记（正态—正态模型的后验预测分布）**

沿定理 22.4（i）的设定，$\tilde X\mid\theta\sim N(\theta,\sigma^2)$，后验 $\theta\mid\boldsymbol x\sim N(\mu_n,\tau_n^2)$，则

$$\tilde X\mid\boldsymbol x\sim N\big(\mu_n,\;\sigma^2+\tau_n^2\big).\tag{22.11}$$

直接由式（22.10）验证：记 $c=\sigma^2$，$d=\tau_n^2$，$v=c+d$，被积函数的指数部分为

$$-\frac12\left[\frac{(\tilde x-\theta)^2}{c}+\frac{(\theta-\mu_n)^2}{d}\right]=-\frac12\left[A\left(\theta-\frac{B}{A}\right)^2+R\right],$$

其中 $A=c^{-1}+d^{-1}=v/(cd)$，$B=\tilde x/c+\mu_n/d=(\tilde x d+\mu_n c)/(cd)$，而配方后的余项经通分为

$$R=\frac{\tilde x^2}{c}+\frac{\mu_n^2}{d}-\frac{B^2}{A}=\frac{\tilde x^2dv+\mu_n^2cv-(\tilde x d+\mu_n c)^2}{cdv}=\frac{cd(\tilde x-\mu_n)^2}{cdv}=\frac{(\tilde x-\mu_n)^2}{v} .$$

于是

$$p(\tilde x\mid\boldsymbol x)=\frac{1}{2\pi\sqrt{cd}}\,e^{-R/2}\int_{-\infty}^{\infty}\exp\!\left\{-\frac{A}{2}\left(\theta-\frac BA\right)^2\right\}\mathrm d\theta=\frac{1}{2\pi\sqrt{cd}}\,e^{-R/2}\sqrt{\frac{2\pi}{A}}=\frac{1}{\sqrt{2\pi v}}\exp\!\left\{-\frac{(\tilde x-\mu_n)^2}{2v}\right\},$$

最后一步用了 $\sqrt{cd}\sqrt A=\sqrt{cd\cdot v/(cd)}=\sqrt v$。这正是 $N(\mu_n,v)$ 的密度。与全方差公式对照：$\mathbb E[\tilde X\mid\theta]=\theta$，$\operatorname{Var}(\tilde X\mid\theta)=\sigma^2$，故 $\mathbb E[\tilde X\mid\boldsymbol x]=\mathbb E[\theta\mid\boldsymbol x]=\mu_n$，$\operatorname{Var}(\tilde X\mid\boldsymbol x)=\sigma^2+\operatorname{Var}(\theta\mid\boldsymbol x)=\sigma^2+\tau_n^2$，与式（22.11）一致。预测方差严格大于条件方差 $\sigma^2$，其差额 $\tau_n^2$ 就是参数不确定性；当 $n\to\infty$ 时 $\tau_n^2\to0$，预测分布退化到以真参数为条件的分布。基于式（22.11）的区间 $\mu_n\pm z_{1-\alpha/2}\sqrt{\sigma^2+\tau_n^2}$ 称为后验预测区间，用于回答「下一期收益落在此区间的后验概率为 $1-\alpha$」，这与第20章的正态预测区间（用 $t$ 分布代替）在解释上属于同一族结果。

**注记（离散模型的后验预测分布）**

在定理 22.5 的设定下，设未来 $m$ 次试验条件独立且成功率仍为 $\theta$，其成功次数 $\tilde Y\mid\theta\sim B(m,\theta)$，后验为 $\theta\mid\boldsymbol x\sim\mathrm{Beta}(\alpha,\beta)$，其中 $\alpha=\alpha_0+k$，$\beta=\beta_0+n-k$。代入式（22.10），

$$\mathbb P(\tilde Y=j\mid\boldsymbol x)=\binom mj\frac{1}{B(\alpha,\beta)}\int_0^1\theta^{\alpha+j-1}(1-\theta)^{\beta+m-j-1}\mathrm d\theta=\binom mj\frac{B(\alpha+j,\beta+m-j)}{B(\alpha,\beta)},$$

$$=\binom mj\frac{(\alpha)_j\,(\beta)_{m-j}}{(\alpha+\beta)_m},\qquad j=0,1,\dots,m,\tag{22.12}$$

其中 $(c)_r=c(c+1)\cdots(c+r-1)$ 为上升阶乘。这正是 beta—二项分布：它比 $B(m,\alpha/(\alpha+\beta))$ 更分散，多出的分散度来自 $\theta$ 本身的后验不确定性。取 $m=1$ 得下一次试验成功的预测概率 $\alpha/(\alpha+\beta)=(\alpha_0+k)/(\alpha_0+\beta_0+n)$，恰为后验均值。

在定理 22.6 的设定下，后验 $\theta\mid\boldsymbol x\sim\mathrm{Gamma}(a,b)$（$a=a_0+\sum_i x_i$，$b=b_0+n$），下一次计数 $\tilde X\mid\theta\sim\mathrm{Poisson}(\theta)$，则

$$\mathbb P(\tilde X=y\mid\boldsymbol x)=\int_0^\infty\frac{e^{-\theta}\theta^y}{y!}\cdot\frac{b^a}{\Gamma(a)}\theta^{a-1}e^{-b\theta}\mathrm d\theta=\frac{b^a}{\Gamma(a)\,y!}\int_0^\infty\theta^{a+y-1}e^{-(b+1)\theta}\mathrm d\theta=\frac{\Gamma(a+y)}{\Gamma(a)\,y!}\left(\frac{b}{b+1}\right)^{a}\left(\frac{1}{b+1}\right)^{y},$$

即形如 $\mathbb P(\tilde X=y)=\frac{\Gamma(a+y)}{\Gamma(a)\,y!}\,p^{a}(1-p)^{y}$、$p=b/(b+1)$ 的负二项分布。用该分布的矩公式核对：均值为 $a(1-p)/p=a/b$，方差为 $a(1-p)/p^2=a(b+1)/b^2$。另一方面，由重期望公式与全方差公式，$\mathbb E[\tilde X\mid\boldsymbol x]=\mathbb E[\theta\mid\boldsymbol x]=a/b$，

$$\operatorname{Var}(\tilde X\mid\boldsymbol x)=\mathbb E\big[\operatorname{Var}(\tilde X\mid\theta)\mid\boldsymbol x\big]+\operatorname{Var}\big(\mathbb E[\tilde X\mid\theta]\mid\boldsymbol x\big)=\frac ab+\frac{a}{b^2}=\frac{a(b+1)}{b^2},$$

两法一致。预测方差比 Poisson 条件方差 $a/b$ 多出的 $a/b^2$ 恰是 $\theta$ 的后验方差，再次印证参数不确定性对预测分散度的放大作用。


**例 22.3**

某高频信号在过去 $n=20$ 次独立触发中盈利 $k=12$ 次。分析师取对称弱信息先验 $\theta\sim\mathrm{Beta}(2,2)$，其中 $\theta$ 为单次盈利概率。求后验的三种点汇总量、$95\%$ 等尾可信区间与 $95\%$ HPD 区间并比较，再求「真实胜率超过 $0.5$」的后验概率，以及未来 $5$ 次触发中至少 $4$ 次盈利的预测概率。

**解**

由定理 22.5，后验为 $\theta\mid\boldsymbol x\sim\mathrm{Beta}(14,10)$。三种点汇总量分别为

$$\text{后验均值}=\frac{14}{24}=\frac{7}{12}=0.5833,\qquad \text{后验众数}=\frac{14-1}{14+10-2}=\frac{13}{22}=0.5909,$$

$$\operatorname{Var}(\theta\mid\boldsymbol x)=\frac{14\times10}{24^2\times25}=\frac{7}{720}=0.009722,\qquad \text{后验标准差}=0.0986 .$$

中位数无闭式，需数值反演不完全 Beta 函数，得约 $0.586$。三者次序为均值 $<$ 中位数 $<$ 众数，与偏度公式 $\gamma=2(\beta-\alpha)\sqrt{\alpha+\beta+1}\big/\big[(\alpha+\beta+2)\sqrt{\alpha\beta}\big]=-40/(26\sqrt{140})=-0.130<0$ 一致：负偏意味着左侧长尾把均值拉低，众数最靠近右侧。若在平方损失、绝对损失与 0-1 损失下分别做决策，最优决策恰为这三个不同的数（定理见 22.4 节）。

$95\%$ 等尾可信区间由 $F(l\mid\boldsymbol x)=0.025$、$F(u\mid\boldsymbol x)=0.975$ 确定。由于超参数为整数，不完全 Beta 函数可化为二项尾概率：$I_x(14,10)=\mathbb P(Y\ge14)$，$Y\sim B(23,x)$，从而数值求解给出 $l\approx0.388$、$u\approx0.762$，区间长度 $0.374$。检验它是否为 HPD 区间，只需比较两端点处的后验密度。$\mathrm{Beta}(14,10)$ 的密度为 $f(x)=x^{13}(1-x)^9/B(14,10)$，$1/B(14,10)=\Gamma(24)/(\Gamma(14)\Gamma(10))=1.14407\times10^7$，于是

$$f(0.388)=1.14407\times10^7\times0.388^{13}\times0.612^{9}\approx0.622,\qquad f(0.762)\approx0.819 .$$

两端密度不相等，故等尾区间不是 HPD 区间。HPD 区间须同时满足 $f(l)=f(u)=\kappa$ 与 $\int_l^u f=0.95$，数值求解得 $l\approx0.395$、$u\approx0.768$，两端密度同为 $\kappa\approx0.71$，长度 $0.373$，比等尾区间略短且整体右移约 $0.007$。差别之所以微小，是因为本例偏度只有 $-0.13$；当后验高度偏态（例如计数数据的 Gamma 后验或小样本下的 Beta 后验）时，两种区间的差别会显著放大，报告中必须说明所用的是哪一种。

「胜率超过 $0.5$」的后验概率可精确算出：

$$\mathbb P(\theta>0.5\mid\boldsymbol x)=1-I_{0.5}(14,10)=1-\sum_{j=14}^{23}\binom{23}{j}0.5^{23}=1-\frac{1698160}{8388608}=0.7976 .$$

其中 $\sum_{j=14}^{23}\binom{23}{j}=\sum_{j=0}^{9}\binom{23}{j}=1698160$ 用了二项系数的对称性。可见数据给出的支持度约为 $80\%$，尚不足以在严格标准下断言信号有正胜率。

最后求预测概率。由式（22.12），未来 $m=5$ 次触发中盈利次数 $\tilde Y$ 服从 beta—二项分布，$\alpha=14$、$\beta=10$、$(\alpha+\beta)_5=24\times25\times26\times27\times28=11793600$，故

$$\mathbb P(\tilde Y=4\mid\boldsymbol x)=\binom54\frac{(14)_4(10)_1}{(24)_5}=5\times\frac{57120\times10}{11793600}=0.2422,$$

$$\mathbb P(\tilde Y=5\mid\boldsymbol x)=\frac{(14)_5}{(24)_5}=\frac{57120\times18}{11793600}=0.0872,\qquad \mathbb P(\tilde Y\ge4\mid\boldsymbol x)=0.3293 .$$

若直接以点估计 $\hat\theta=7/12=0.5833$ 代入二项分布，则 $\mathbb P(\tilde Y\ge4)=\binom54 0.5833^4\times0.4167+0.5833^5=0.2412+0.0675=0.3087$，比 Bayesian 预测概率 $0.3293$ 低约 $0.021$：把参数不确定性积分掉会使预测分布更分散，从而使尾部事件的预测概率上升，这在风险管理中是偏保守的方向。

## 22.3 先验的构造

先验有三个常见来源：历史数据（例如把上一段样本期的估计结果作为下一段的先验）、结构性约束或专家判断（例如「夏普比率极少超过 1」）、以及从数据本身学习的分层与经验 Bayes 方法（见 22.5 节与 22.7 节）。困难的情形是没有任何先验信息，此时希望选择一个「尽量不带主观成分」的先验，称为**无信息先验**。

朴素的做法是取常数密度，即「均匀先验」。但均匀性依赖参数化方式，这一点必须严格指出。设 $\theta\in(0,1)$ 为一个概率，先验取 $\pi(\theta)=1$。若改用对数几率 $\varphi=\log\frac{\theta}{1-\theta}$，则 $\theta=1/(1+e^{-\varphi})$，$\mathrm d\theta/\mathrm d\varphi=e^{\varphi}/(1+e^{\varphi})^2$，由变量替换公式，$\varphi$ 的先验密度为

$$\pi(\varphi)=\pi(\theta)\left|\frac{\mathrm d\theta}{\mathrm d\varphi}\right|=\frac{e^{\varphi}}{(1+e^{\varphi})^2},\qquad \varphi\in\mathbb R,$$

这是 logistic 密度而非常数。反过来，若坚持 $\varphi$ 上取均匀先验（一个不可归一化的无穷测度），则 $\theta$ 上的诱导密度正比于 $1/[\theta(1-\theta)]$，在两端发散。「$\theta$ 上均匀」与「$\varphi$ 上均匀」是两个互不相容的选择，因此无信息先验必须通过一个对参数化不敏感的规则来定义。Jeffreys 的规则正是为此设计的：用似然函数自身携带的信息量来定标。

**定义 22.9（Fisher 信息量与 Jeffreys 先验）**

设模型 $p(x\mid\theta)$ 关于 $\theta\in\Theta\subseteq\mathbb R^d$ 二阶可微，且满足可在积分号下求导的正则条件。**Fisher 信息矩阵**定义为

$$I(\theta)=\mathbb E_\theta\!\left[\nabla_\theta\log p(X\mid\theta)\,\nabla_\theta\log p(X\mid\theta)^\top\right],\qquad I_{jk}(\theta)=\mathbb E_\theta\!\left[\frac{\partial\log p}{\partial\theta_j}\frac{\partial\log p}{\partial\theta_k}\right],\tag{22.13}$$

在一维情形即 $I(\theta)=\mathbb E_\theta\big[(\partial\log p(X\mid\theta)/\partial\theta)^2\big]$，且在同一正则条件下有恒等式

$$I(\theta)=-\,\mathbb E_\theta\!\left[\frac{\partial^2}{\partial\theta^2}\log p(X\mid\theta)\right].$$

**Jeffreys 先验**定义为

$$\pi_J(\theta)\propto\sqrt{\det I(\theta)},\qquad \text{一维时}\quad \pi_J(\theta)\propto\sqrt{I(\theta)}.\tag{22.14}$$

当 $\int_\Theta\sqrt{\det I(\theta)}\,\mathrm d\theta<\infty$ 时，把式（22.14）归一化即得正常先验；否则称其为**非正常先验**（improper prior），此时只要后验积分 $\int_\Theta p(x\mid\theta)\sqrt{\det I(\theta)}\mathrm d\theta$ 有限，后验仍然是合法的概率分布，推断可以照常进行，但必须逐一验证后验的正常性。

**证明**

只需证 Fisher 信息的第二种表达。由 $\int p(x\mid\theta)\mathrm d x=1$ 对 $\theta$ 求导（正则条件允许交换次序），得

$$\int\frac{\partial p(x\mid\theta)}{\partial\theta}\mathrm d x=0,\qquad\text{即}\qquad \mathbb E_\theta\!\left[\frac{\partial}{\partial\theta}\log p(X\mid\theta)\right]=\int\frac{\partial\log p}{\partial\theta}\,p\,\mathrm d x=0 .$$

再对 $\theta$ 求一次导：

$$0=\int\frac{\partial^2 p}{\partial\theta^2}\mathrm d x=\int\left[\frac{\partial^2\log p}{\partial\theta^2}+\left(\frac{\partial\log p}{\partial\theta}\right)^2\right]p\,\mathrm d x=\mathbb E_\theta\!\left[\frac{\partial^2\log p}{\partial\theta^2}\right]+\mathbb E_\theta\!\left[\left(\frac{\partial\log p}{\partial\theta}\right)^2\right],$$

其中用了 $\partial^2 p/\partial\theta^2=\partial\big[(\partial\log p/\partial\theta)p\big]/\partial\theta=(\partial^2\log p/\partial\theta^2)p+(\partial\log p/\partial\theta)^2p$。移项即得 $I(\theta)=-\mathbb E_\theta[\partial^2\log p/\partial\theta^2]$。多维情形的证明逐分量相同。

□

**注记（Jeffreys 先验的参数变换不变性）**

设 $\varphi=g(\theta)$ 为严格单调可微的重新参数化，逆映射为 $\theta=h(\varphi)$。把 Jeffreys 规则分别用于 $\theta$ 与 $\varphi$，所得的是同一个概率测度。证明如下。对数似然在 $\varphi$ 参数化下为 $\log p(x\mid h(\varphi))$，由链式法则

$$\frac{\partial}{\partial\varphi}\log p(x\mid h(\varphi))=\frac{\partial}{\partial\theta}\log p(x\mid\theta)\cdot h'(\varphi),$$

两边平方取期望得 $I_\varphi(\varphi)=[h'(\varphi)]^2I_\theta(h(\varphi))$。于是在 $\varphi$ 上直接套用式（22.14）得

$$\pi_J^{\varphi}(\varphi)\propto\sqrt{I_\varphi(\varphi)}=\big|h'(\varphi)\big|\sqrt{I_\theta(h(\varphi))},$$

而把 $\theta$ 上的 Jeffreys 密度 $\pi_J^\theta(\theta)\propto\sqrt{I_\theta(\theta)}$ 按变量替换公式变换到 $\varphi$，得到 $\pi_J^\theta(h(\varphi))|h'(\varphi)|=|h'(\varphi)|\sqrt{I_\theta(h(\varphi))}$，两式完全相同。多维情形同理：若 $\boldsymbol\theta=h(\boldsymbol\varphi)$，Jacobi 矩阵 $J=\partial\boldsymbol\theta/\partial\boldsymbol\varphi$，则 $I_\varphi=J^\top I_\theta J$，$\det I_\varphi=(\det J)^2\det I_\theta$，故 $\sqrt{\det I_\varphi}=|\det J|\sqrt{\det I_\theta}$，正是密度变换所需的因子。这一不变性恰是均匀先验所不具备的，也是 Jeffreys 先验被称为「无信息」的严格依据：它由模型自身决定，不依赖研究者如何书写参数。

**例 22.4**

分别求下列模型的 Jeffreys 先验，并与相应的共轭先验对照：（i）Bernoulli—二项模型；（ii）Poisson 模型；（iii）均值已知的正态模型，分别以 $\sigma$ 与 $\sigma^2$ 为参数。

**解**

（i）设 $X_1,\dots,X_n$ 条件独立同分布于 $B(1,\theta)$。单个观测的对数似然为 $\ell=x\log\theta+(1-x)\log(1-\theta)$，一阶与二阶导数为

$$\frac{\partial\ell}{\partial\theta}=\frac x\theta-\frac{1-x}{1-\theta},\qquad \frac{\partial^2\ell}{\partial\theta^2}=-\frac{x}{\theta^2}-\frac{1-x}{(1-\theta)^2}.$$

由定义 22.9 中的恒等式，

$$I_1(\theta)=-\mathbb E_\theta\!\left[\frac{\partial^2\ell}{\partial\theta^2}\right]=\frac{\mathbb E_\theta[X]}{\theta^2}+\frac{1-\mathbb E_\theta[X]}{(1-\theta)^2}=\frac{\theta}{\theta^2}+\frac{1-\theta}{(1-\theta)^2}=\frac{1}{\theta(1-\theta)} .$$

$n$ 个独立观测的信息量为 $I(\theta)=n/[\theta(1-\theta)]$，其中 $\sqrt n$ 是与 $\theta$ 无关的常数，故

$$\pi_J(\theta)\propto\big[\theta(1-\theta)\big]^{-1/2}=\theta^{1/2-1}(1-\theta)^{1/2-1},$$

即 $\mathrm{Beta}(\tfrac12,\tfrac12)$，称 Jeffreys 先验或 arcsine 先验。它在 $(0,1)$ 上可积（$\int_0^1[\theta(1-\theta)]^{-1/2}\mathrm d\theta=B(\tfrac12,\tfrac12)=\pi$），因而是正常先验，归一化后密度为 $\pi(\theta)=\pi^{-1}[\theta(1-\theta)]^{-1/2}$。它与定理 22.5 的共轭族一致，只是取 $\alpha_0=\beta_0=\tfrac12$；该密度在两端发散，反映出「对极端概率值几乎不设防」的无信息立场。若观测到 $n=20$、$k=12$，后验为 $\mathrm{Beta}(12.5,8.5)$，后验均值 $12.5/21=0.5952$。

（ii）设 $X\mid\theta\sim\mathrm{Poisson}(\theta)$，$\ell=x\log\theta-\theta-\log x!$，$\partial^2\ell/\partial\theta^2=-x/\theta^2$，故

$$I(\theta)=-\mathbb E_\theta\!\left[-\frac{X}{\theta^2}\right]=\frac{\mathbb E_\theta[X]}{\theta^2}=\frac{\theta}{\theta^2}=\frac1\theta,\qquad \pi_J(\theta)\propto\theta^{-1/2},\qquad \theta>0 .$$

这是 $\mathrm{Gamma}(\tfrac12,b_0)$ 在 $b_0\to0$ 时的核，为非正常先验（$\int_0^\infty\theta^{-1/2}\mathrm d\theta=\infty$）。但由定理 22.6，后验为 $\mathrm{Gamma}(\tfrac12+\sum_i x_i,\,n)$，只要 $n\ge1$ 便正常，推断合法。这也说明非正常先验并非不可用，关键在于后验是否正常。

（iii）设 $X\mid\sigma\sim N(\mu,\sigma^2)$，$\mu$ 已知。先以 $\sigma$ 为参数：$\ell=-\log\sigma-\tfrac12\log(2\pi)-(x-\mu)^2/(2\sigma^2)$，

$$\frac{\partial\ell}{\partial\sigma}=-\frac1\sigma+\frac{(x-\mu)^2}{\sigma^3},\qquad \frac{\partial^2\ell}{\partial\sigma^2}=\frac1{\sigma^2}-\frac{3(x-\mu)^2}{\sigma^4}.$$

用 $\mathbb E_\theta[(X-\mu)^2]=\sigma^2$ 得

$$I(\sigma)=-\mathbb E\!\left[\frac1{\sigma^2}-\frac{3(X-\mu)^2}{\sigma^4}\right]=-\frac1{\sigma^2}+\frac{3\sigma^2}{\sigma^4}=\frac{2}{\sigma^2},\qquad \pi_J(\sigma)\propto\frac1\sigma .$$

再以 $v=\sigma^2$ 为参数直接计算：$\ell=-\tfrac12\log(2\pi v)-(x-\mu)^2/(2v)$，$\partial^2\ell/\partial v^2=\tfrac{1}{2v^2}-\tfrac{(x-\mu)^2}{v^3}$，故 $I(v)=-\tfrac{1}{2v^2}+\tfrac{v}{v^3}=\tfrac{1}{2v^2}$，$\pi_J(v)\propto1/v$。用不变性核对：由 $v=\sigma^2$ 得 $\sigma=\sqrt v$，$|\mathrm d\sigma/\mathrm d v|=1/(2\sigma)$，于是 $\pi_J(v)=\pi_J(\sigma)/(2\sigma)=1/(2\sigma^2)\propto1/v$，与直接计算一致。这正是注记所断言的不变性的具体验证；对比之下，若在 $\sigma$ 上取均匀先验 $\pi(\sigma)\propto1$，变换到 $v$ 会得到 $\pi(v)\propto v^{-1/2}$，与在 $v$ 上直接取均匀先验 $\pi(v)\propto1$ 矛盾。$\pi_J(v)\propto1/v$ 相当于逆 Gamma 分布在形状与尺度参数同时趋于零时的极限，对应第20章中「方差的 $1/\sigma^2$ 型无信息先验」。

**注记（双参数正态模型：Jeffreys 先验与独立性先验）**

当 $\mu$ 与 $\sigma$ 都未知时，对数似然的两个偏导为 $\partial\ell/\partial\mu=(x-\mu)/\sigma^2$ 与 $\partial\ell/\partial\sigma=-1/\sigma+(x-\mu)^2/\sigma^3$。由 $\mathbb E[(X-\mu)]=0$、$\mathbb E[(X-\mu)^2]=\sigma^2$、$\mathbb E[(X-\mu)^3]=0$、$\mathbb E[(X-\mu)^4]=3\sigma^4$ 得

$$I(\mu,\sigma)=\begin{pmatrix}1/\sigma^2 & 0\\ 0 & 2/\sigma^2\end{pmatrix},\qquad \det I=\frac{2}{\sigma^4},\qquad \sqrt{\det I}=\frac{\sqrt2}{\sigma^2},$$

其中交叉项 $\mathbb E\big[\frac{X-\mu}{\sigma^2}\big(-\frac1\sigma+\frac{(X-\mu)^2}{\sigma^3}\big)\big]=-\frac{\mathbb E[X-\mu]}{\sigma^3}+\frac{\mathbb E[(X-\mu)^3]}{\sigma^5}=0$，故信息矩阵对角，$\mu$ 与 $\sigma$ 正交。式（22.14）给出 $\pi_J(\mu,\sigma)\propto\sigma^{-2}$；换成 $v=\sigma^2$ 坐标则为 $\pi_J(\mu,v)\propto v^{-3/2}$。以此为先验，后验核为

$$\pi(\mu,\sigma^2\mid\boldsymbol x)\propto(\sigma^2)^{-n/2}\exp\!\left\{-\frac{1}{2\sigma^2}\left[S+n(\bar x-\mu)^2\right]\right\}(\sigma^2)^{-3/2},\qquad S=\sum_{i=1}^n(x_i-\bar x)^2 .$$

给定 $\sigma^2$ 时 $\mu$ 的条件后验为 $N(\bar x,\sigma^2/n)$；把 $\mu$ 积分掉（高斯积分给出因子 $\sqrt{2\pi\sigma^2/n}\propto(\sigma^2)^{1/2}$）得

$$\pi(\sigma^2\mid\boldsymbol x)\propto(\sigma^2)^{-(n/2+1)}\exp\!\left(-\frac{S}{2\sigma^2}\right),$$

即 $\sigma^2\mid\boldsymbol x\sim\mathrm{IG}(n/2,S/2)$。按 22.1 节末尾注记中已算出的边际公式（取 $\mu_n=\bar x$、$\kappa_n=n$、$a_n=n/2$、$b_n=S/2$），$\mu$ 的边际后验是自由度 $2a_n=n$、位置 $\bar x$、尺度 $\sqrt{b_n/(a_n\kappa_n)}=\sqrt S/n$ 的 $t$ 分布。

Jeffreys 本人建议：当模型含位置型冗余参数时，对位置参数取平坦先验、对尺度参数单独应用式（22.14），得到**独立性先验** $\pi(\mu,\sigma)\propto1/\sigma$，等价于 $\pi(\mu,\sigma^2)\propto(\sigma^2)^{-1}$。此时后验核中 $(\sigma^2)$ 的幂次为 $-n/2-1$，积分掉 $\mu$ 后得

$$\pi(\sigma^2\mid\boldsymbol x)\propto(\sigma^2)^{-(n-1)/2-1}\exp\!\left(-\frac{S}{2\sigma^2}\right),$$

即 $\sigma^2\mid\boldsymbol x\sim\mathrm{IG}\big(\tfrac{n-1}{2},\tfrac S2\big)$，从而

$$\frac{\mu-\bar x}{s/\sqrt n}\;\Big|\;\boldsymbol x\;\sim\;t_{n-1},\qquad s^2=\frac{S}{n-1} .$$

这与第20章由「样本均值与样本方差独立」得到的经典 $t$ 统计量分布完全同形，区间端点 $\bar x\pm t_{n-1,1-\alpha/2}s/\sqrt n$ 一模一样，解释却根本不同：在本章它是一个后验概率陈述 $\mathbb P(\mu\in\bar x\pm t_{n-1,1-\alpha/2}s/\sqrt n\mid\boldsymbol x)=1-\alpha$，而在第20章它只是重复抽样意义下的 $1-\alpha$ 覆盖率。这一巧合并非偶然：正态位置—尺度族是变换群，无信息先验取群的不变（Haar）测度时，Bayesian 与频率推断必然重合。

**注记（参考先验）**

Jeffreys 规则在多维情形有一个缺陷：$\sqrt{\det I(\theta)}$ 把所有参数同等对待，而实际推断往往只关心其中一部分，其余是冗余参数。Bernardo 的**参考先验**改进了这一点，其思想是让数据「说得最多」：定义先验 $\pi$ 的期望信息量为后验与先验之间 Kullback–Leibler 散度的数据平均

$$\mathcal K(\pi)=\int m(\boldsymbol x)\left[\int_\Theta\pi(\theta\mid\boldsymbol x)\log\frac{\pi(\theta\mid\boldsymbol x)}{\pi(\theta)}\,\mathrm d\theta\right]\mathrm d\boldsymbol x,\qquad m(\boldsymbol x)=\int_\Theta p(\boldsymbol x\mid\theta)\pi(\theta)\mathrm d\theta,$$

再取 $\mathcal K(\pi)$ 在渐近意义下的极大化序列的极限（严格构造需先把 $\Theta$ 截断到紧集再取极限，以避开非正常先验的困难）。在一维正则模型中，参考先验通常与 Jeffreys 先验重合；在多参数模型中，参考先验依赖于「哪个参数是关心对象」的排序。对正态模型，若关心 $\mu$ 而把 $\sigma$ 视为冗余参数，所得参考先验恰是 $\pi(\mu,\sigma)\propto1/\sigma$，即上一注记中的独立性先验，因而再次导出 $t_{n-1}$ 后验。这解释了为什么 $\pi\propto1/\sigma$ 而非 $\pi\propto\sigma^{-2}$ 在实际推断中被普遍采用：三种不同的无信息准则（Jeffreys 的独立性规则、Bernardo 的参考先验、位置—尺度群的不变测度）在此汇聚于同一选择。

必须强调非正常先验的风险：先验非正常并不自动保证后验正常，而一旦后验积分发散，全部推断都失去意义。例如对 Poisson 模型取尺度不变先验 $\pi(\theta)\propto1/\theta$（它是 $\theta\mapsto c\theta$ 变换下的不变测度，与 Jeffreys 先验 $\theta^{-1/2}$ 不同），若观测到 $n$ 个全为零的计数，则后验核为 $\theta^{-1}e^{-n\theta}$，而

$$\int_0^1\frac{e^{-n\theta}}{\theta}\,\mathrm d\theta\ge e^{-n}\int_0^1\frac{\mathrm d\theta}{\theta}=\infty ,$$

后验不正常，无法归一化。同样的数据在 Jeffreys 先验 $\theta^{-1/2}$ 下给出 $\mathrm{Gamma}(\tfrac12,n)$，完全正常。因此每次使用非正常先验，都应对实际观测到的数据验证后验积分有限。

共轭先验的超参数之所以便于沟通，是因为它们都能翻译成「虚拟观测」。在正态—正态模型中，令 $n_0=\sigma^2/\tau_0^2$，即先验精度与单个观测精度之比，则式（22.3）可改写为

$$\tau_n^2=\frac{\sigma^2}{n_0+n},\qquad \mu_n=\frac{n_0\mu_0+n\bar x}{n_0+n},$$

先验等价于「$n_0$ 个观测，其均值为 $\mu_0$」。在 Beta—二项模型中，$\alpha_0$ 与 $\beta_0$ 是先验假定的成功与失败次数，$\alpha_0+\beta_0$ 是等效样本量，后验均值 $(\alpha_0+k)/(\alpha_0+\beta_0+n)$ 就是把虚拟计数与真实计数直接相加再求比例。在 Gamma—Poisson 模型中，$a_0$ 是先验假定的事件总数，$b_0$ 是先验假定的观测时长（暴露量），后验均值 $(a_0+\sum_i x_i)/(b_0+n)$ 正是「总事件数除以总暴露」的强度估计。在 Dirichlet—多项模型中，$\alpha_j$ 是第 $j$ 类的虚拟计数，$\alpha_0$ 是虚拟总样本量。这种可加结构使 Bayesian 更新天然适合序贯场景：数据每天到达，超参数每天累加，无需重算历史。

纯粹的无信息先验在实务中并不总是最佳选择，因为它可能允许明显荒谬的参数值（例如夏普比率取到 50，或波动率取到 $10^{-6}$），使小样本下的后验被极端似然值主导。**弱信息先验**折中处理：保留共轭结构以便闭式计算，但把超参数设为量级合理而相当宽松的数值，例如对日均收益取 $\tau_0$ 为历史波动率的一半，对胜率取 $\mathrm{Beta}(2,2)$ 而非 $\mathrm{Beta}(\tfrac12,\tfrac12)$。它既起到「正则化」作用，又不至于让先验主导结论。

先验敏感性分析的目的，是量化「换一种合理先验会不会改变结论」。标准做法是：选取一组代表性先验（至少包含一个无信息先验、一个 Jeffreys 先验、以及若干强度与倾向不同的共轭先验），对每个先验计算关心的后验量，再比较这些量的散布与后验标准差的大小；若决策相关的概率（例如 $\mathbb P(\theta>0.5\mid\boldsymbol x)$）在所有先验下同侧越过阈值，即可宣称结论对先验稳健，否则必须在报告中说明结论依赖先验。在 Beta—二项模型中这一分析可完全解析化：记 $n_0=\alpha_0+\beta_0$、$m_0=\alpha_0/n_0$，则

$$\frac{\alpha_0+k}{\alpha_0+\beta_0+n}-\frac kn=\frac{n_0\big(m_0-\frac kn\big)}{n_0+n},$$

因为通分后分子为 $n(n_0m_0+k)-k(n_0+n)=n_0(nm_0-k)$。可见后验均值与频率估计 $k/n$ 的偏差以 $O(n_0/n)$ 的速率随样本量衰减，先验越强（$n_0$ 越大）或越偏离数据（$|m_0-k/n|$ 越大），偏差越大。以例 22.3 的数据 $n=20$、$k=12$ 为例：Jeffreys 先验 $\mathrm{Beta}(\tfrac12,\tfrac12)$ 给出后验均值 $12.5/21=0.5952$，均匀先验 $\mathrm{Beta}(1,1)$ 给出 $13/22=0.5909$，$\mathrm{Beta}(2,2)$ 给出 $14/24=0.5833$，强先验 $\mathrm{Beta}(5,5)$ 给出 $17/30=0.5667$，而悲观先验 $\mathrm{Beta}(1,3)$（先验均值 $0.25$）给出 $13/24=0.5417$；极大似然为 $0.6$。前四个先验的散布不足 $0.03$，而后验标准差约 $0.10$，故在标准弱先验之间结论稳健；但悲观先验把后验均值拉低 $0.05$，约半个标准差，这种量级的差异在实盘中足以改变仓位决策，必须显式披露。若只约束先验均值 $m_0\in[0.4,0.6]$ 且 $n_0\le10$，则由上式可解出后验均值的严格范围 $[0.533,0.600]$：下界在 $m_0=0.4$、$n_0=10$ 处取得，上界在 $m_0=0.6$ 处取得（此时后验均值恒等于 $0.6$，与 $n_0$ 无关）。这一「先验集合诱导后验集合」的做法是稳健 Bayesian 分析的起点。

至此，我们已经能够把先验与数据合成为后验，并把后验汇总为均值、中位数、众数与可信区间。但一个更基本的问题尚未回答：在众多汇总量中，哪一个是「正确的」估计？这个问题的答案不在推断框架内部，而取决于用错参数会带来多大损失。22.4 节引入损失函数、风险函数与 Bayes 风险，证明后验均值、后验中位数与后验众数分别是平方损失、绝对损失与 0-1 损失下的最优决策，从而把本章的推断部分与决策部分严格接合起来。

## 22.4 统计决策理论

前三节把全部推断信息压缩进后验分布：由定理 22.2，后验是先验与似然之积的归一化；由定义 22.8，后验均值、中位数、众数与可信区间都是这一分布的泛函。究竟应当报告哪一个泛函，并不由后验本身决定，而取决于犯错的代价结构。统计决策理论把这一取舍形式化：先声明行动空间与损失函数，再由损失的结构唯一地导出最优行动。本节的核心结论是：一旦承认先验，最优行动必然是后验期望损失的最小点；平方损失、绝对损失与 0-1 损失分别给出后验均值、后验中位数与后验众数。

**定义 22.10（决策问题与损失函数）**

设参数 $\theta$ 取值于参数空间 $\Theta$，决策者可选的行动 $a$ 取值于行动空间 $\mathcal A$。损失函数 $L:\Theta\times\mathcal A\to\mathbb R$ 满足：对每个固定的 $\theta\in\Theta$，映射 $a\mapsto L(\theta,a)$ 是下有界的可测函数。称三元组 $(\Theta,\mathcal A,L)$ 为一个决策问题。当 $\mathcal A\subseteq\mathbb R^p$ 且行动被解释为对参数的点估计时，称该决策问题为估计问题，此时习惯记 $a=\hat\theta$，并称 $L$ 为估计损失。

**定义 22.11（决策规则、风险函数与 Bayes 风险）**

决策规则 $\delta:\mathcal X\to\mathcal A$ 是一个可测映射，它把每一个可能的样本点映为一个行动；「估计量」在决策论语言中就是一个取值于 $\mathcal A$ 的决策规则。规则 $\delta$ 的风险函数定义为损失在抽样分布下的期望
$$R(\theta,\delta)=\int_{\mathcal X}L\bigl(\theta,\delta(x)\bigr)\,p(x\mid\theta)\,\mathrm d\mu(x)=\mathbb E_\theta\bigl[L(\theta,\delta(X))\bigr].\tag{22.15}$$
风险函数是一个以 $\theta$ 为自变量的确定性函数，它把「估计量在不同真值下的平均表现」并列地摆在决策者面前。给定 $\Theta$ 上的先验密度 $\pi$，规则 $\delta$ 的 Bayes 风险是风险函数在先验下的平均
$$r(\pi,\delta)=\int_\Theta R(\theta,\delta)\,\pi(\theta)\,\mathrm d\theta=\mathbb E^\pi\bigl[R(\theta,\delta)\bigr].\tag{22.16}$$
若规则 $\delta_\pi$ 满足 $r(\pi,\delta_\pi)=\inf_{\delta}r(\pi,\delta)$，则称 $\delta_\pi$ 为先验 $\pi$ 下的 Bayes 规则，并称这一公共值为先验 $\pi$ 的 Bayes 值，记作 $r(\pi)$。

**定理 22.12（Bayes 规则的后验期望刻画）**

设 $L$ 下有界，$m(x)=\int_\Theta p(x\mid\theta)\,\pi(\theta)\,\mathrm d\theta$ 为样本的边际密度，$\pi(\theta\mid x)$ 为定理 22.2 给出的后验密度。定义后验期望损失（亦称后验风险）
$$\rho(a\mid x)=\int_\Theta L(\theta,a)\,\pi(\theta\mid x)\,\mathrm d\theta.\tag{22.17}$$
若可测映射 $\delta^*:\mathcal X\to\mathcal A$ 满足
$$\rho\bigl(\delta^*(x)\mid x\bigr)=\inf_{a\in\mathcal A}\rho(a\mid x)$$
对关于测度 $m(x)\,\mathrm d\mu(x)$ 几乎所有 $x$ 成立，则 $\delta^*$ 是先验 $\pi$ 的 Bayes 规则；并且对任意决策规则 $\delta$ 都有恒等式
$$r(\pi,\delta)=\int_{\mathcal X}\rho\bigl(\delta(x)\mid x\bigr)\,m(x)\,\mathrm d\mu(x).$$
这一定理把「在所有规则中求最优」这一无穷维问题，降解为「对每个固定的 $x$，在 $\mathcal A$ 中求一个函数的最小点」这一逐点问题。

**证明**

由 $L$ 下有界，存在实数 $c$ 使 $L(\theta,a)+c\ge0$ 对一切 $(\theta,a)$ 成立。把损失换成 $L+c$ 后，每个规则的风险都增加同一个与 $\delta$ 无关的常数 $c$，因而 Bayes 规则的集合不变；故不妨设 $L\ge0$，此时被积函数非负，Tonelli 定理允许无条件交换积分次序。对任意规则 $\delta$，把式（22.15）代入式（22.16）得
$$r(\pi,\delta)=\int_\Theta\int_{\mathcal X}L\bigl(\theta,\delta(x)\bigr)\,p(x\mid\theta)\,\mathrm d\mu(x)\,\pi(\theta)\,\mathrm d\theta.$$
由 Tonelli 定理交换次序，
$$r(\pi,\delta)=\int_{\mathcal X}\int_\Theta L\bigl(\theta,\delta(x)\bigr)\,\pi(\theta)\,p(x\mid\theta)\,\mathrm d\theta\,\mathrm d\mu(x).$$
由定理 22.2 的 Bayes 公式，被积表达式中的乘积可改写为 $\pi(\theta)p(x\mid\theta)=\pi(\theta\mid x)\,m(x)$，于是内层积分化为
$$\int_\Theta L\bigl(\theta,\delta(x)\bigr)\,\pi(\theta\mid x)\,\mathrm d\theta\cdot m(x)=\rho\bigl(\delta(x)\mid x\bigr)\,m(x),$$
这就证明了恒等式 $r(\pi,\delta)=\int_{\mathcal X}\rho(\delta(x)\mid x)\,m(x)\,\mathrm d\mu(x)$。

现设 $\delta^*$ 满足逐点最小化条件，并令 $N=\{x:\rho(\delta^*(x)\mid x)>\inf_{a}\rho(a\mid x)\}$，则 $\int_N m(x)\,\mathrm d\mu(x)=0$。对任意规则 $\delta$ 与几乎所有 $x$，有 $\rho(\delta(x)\mid x)\ge\inf_a\rho(a\mid x)\ge\rho(\delta^*(x)\mid x)$；在零测集 $N$ 上该不等式可能失效，但由于 $\int_N m\,\mathrm d\mu=0$，它对积分没有影响。两边乘以非负函数 $m(x)$ 并在 $\mathcal X$ 上积分，得 $r(\pi,\delta)\ge r(\pi,\delta^*)$。由 $\delta$ 的任意性，$\delta^*$ 是 Bayes 规则。

□

**定理 22.13（三类常用损失下的 Bayes 估计）**

设待估参数 $\theta$ 为一维实数，观测为 $x$，后验分布函数记作 $F(\cdot\mid x)$，后验密度记作 $\pi(\cdot\mid x)$。

（i）若 $L(\theta,a)=(\theta-a)^2$ 且后验二阶矩 $\mathbb E[\theta^2\mid x]<\infty$，则最小化后验期望损失的行动唯一，且为后验均值
$$\delta^*(x)=\mathbb E[\theta\mid x].\tag{22.18}$$

（ii）若 $L(\theta,a)=|\theta-a|$ 且后验一阶矩 $\mathbb E[|\theta|\mid x]<\infty$，则 Bayes 估计为任一后验中位数，即满足下列两个不等式的 $\delta^*(x)$：
$$\mathbb P\bigl(\theta\le\delta^*(x)\mid x\bigr)\ge\tfrac12,\qquad \mathbb P\bigl(\theta\ge\delta^*(x)\mid x\bigr)\ge\tfrac12.\tag{22.19}$$
若后验分布函数在 $\mathbb R$ 上连续且严格递增，则该中位数唯一，且等于 $F^{-1}(\tfrac12\mid x)$。

（iii）若 $\Theta$ 为可数集，先验与后验均为概率质量函数，$L(\theta,a)=1-\mathbf 1\{a=\theta\}$，则最小化后验期望损失的行动唯一（在后验众数唯一时），且为后验众数
$$\delta^*(x)=\arg\max_{\theta\in\Theta}\pi(\theta\mid x).\tag{22.20}$$

**证明**

（i）记 $\mu=\mathbb E[\theta\mid x]$，$V=\operatorname{Var}(\theta\mid x)$。对任意 $a\in\mathbb R$，
$$\rho(a\mid x)=\mathbb E\bigl[(\theta-a)^2\mid x\bigr]=\mathbb E\bigl[(\theta-\mu+\mu-a)^2\mid x\bigr]=V+2(\mu-a)\,\mathbb E[\theta-\mu\mid x]+(\mu-a)^2.$$
交叉项中 $\mathbb E[\theta-\mu\mid x]=0$，故 $\rho(a\mid x)=V+(\mu-a)^2$。右端作为 $a$ 的函数是开口向上的抛物线，唯一最小点在 $a=\mu$，最小值为 $V$。这就证明了式（22.18）与唯一性。此分解同时给出一个重要解释：平方损失下的最小后验期望损失恰好等于后验方差，它度量了在承认不确定性之后仍无法消除的代价。

（ii）设后验一阶矩有限，则对每个 $a$，$\rho(a\mid x)=\mathbb E[|\theta-a|\mid x]<\infty$。把期望写成 Lebesgue–Stieltjes 积分并关于 $a$ 求导：对 $a$ 的任意取值，函数 $t\mapsto|t-a|$ 除 $t=a$ 外处处可导，导数为 $-\mathbf 1\{t<a\}+\mathbf 1\{t>a\}$，且被可积常函数 $1$ 控制，由控制收敛定理可交换导数与积分，得
$$\rho'(a\mid x)=\int_\Theta\bigl[\mathbf 1\{a<\theta\}-\mathbf 1\{a>\theta\}\bigr]\,\mathrm dF(\theta\mid x)=\mathbb P(\theta<a\mid x)-\mathbb P(\theta>a\mid x).$$
由后验分布函数的单调性，$\rho'(\cdot\mid x)$ 是单调不减函数，故 $\rho(\cdot\mid x)$ 是凸函数，其最小点集恰为 $\rho'$ 变号处，即满足 $\mathbb P(\theta<a\mid x)\le\tfrac12\le\mathbb P(\theta\le a\mid x)$ 的 $a$。用 $F(a^-\mid x)$ 与 $F(a\mid x)$ 分别表示左极限与右连续值，这一条件等价于
$$F(a^-\mid x)\le\tfrac12\le F(a\mid x),$$
它正是式（22.19）所刻画的「后验中位数」定义：第一个不等式给出 $\mathbb P(\theta<a\mid x)\le\tfrac12$，从而 $\mathbb P(\theta\ge a\mid x)\ge\tfrac12$；第二个不等式直接给出 $\mathbb P(\theta\le a\mid x)\ge\tfrac12$。若 $F(\cdot\mid x)$ 连续且严格递增，则 $F(a^-)=F(a)$，条件退化为唯一方程 $F(a)=\tfrac12$，解唯一。

（iii）此时后验期望损失为
$$\rho(a\mid x)=\sum_{\theta\in\Theta}\bigl[1-\mathbf 1\{a=\theta\}\bigr]\pi(\theta\mid x)=1-\pi(a\mid x),$$
故最小化 $\rho(\cdot\mid x)$ 等价于最大化后验概率质量 $\pi(\cdot\mid x)$，其解即后验众数，式（22.20）得证；当最大值唯一时行动唯一。

□

**注记**（连续参数下的 0-1 型损失）当 $\Theta$ 为连续集时，逐点 0-1 损失使后验期望损失恒等于 $1$，问题退化。常用的替代是「$\varepsilon$-球 0-1 损失」$L_\varepsilon(\theta,a)=\mathbf 1\{|\theta-a|>\varepsilon\}$，其后验期望损失为
$$\rho_\varepsilon(a\mid x)=1-\int_{a-\varepsilon}^{a+\varepsilon}\pi(\theta\mid x)\,\mathrm d\theta,$$
最小化它等价于在所有长度为 $2\varepsilon$ 的区间中选出后验概率最大者。若后验密度单峰，则该最优区间正是定义 22.8 中最高后验密度区间的定长版本：把区间左右端点处的密度记作 $c_\varepsilon$，则任何密度低于 $c_\varepsilon$ 的子段移入密度高于 $c_\varepsilon$ 的位置都会增加后验概率。令 $\varepsilon\to0$，区间长度收缩到一点，最优中心趋于使 $\pi(\cdot\mid x)$ 取最大值的点，即后验众数。这说明「众数是 0-1 损失的 Bayes 估计」在离散与连续两种情形下有统一的含义。

**注记**（Bayes 规则的非唯一性）定理 22.12 只要求逐点最小化在 $m$-几乎处处的 $x$ 上成立，因此凡是在一个零测样本集上改变取值的规则同样是 Bayes 规则。这一自由度在实际中无关紧要，但它提醒我们：Bayes 规则是等价类而非单个映射，比较两个规则时应以风险函数或 Bayes 风险为准。

**例 22.5**

某选股信号在 $n=20$ 个互不相关的横截面单元中命中 $y=14$ 次。按定义 22.9 取 Jeffreys 先验 $\theta\sim\mathrm{Beta}(\tfrac12,\tfrac12)$，其中 $\theta$ 为命中率。由定理 22.5，后验为 $\theta\mid y\sim\mathrm{Beta}(14.5,\,6.5)$。请分别在平方损失、绝对损失与 0-1 损失下给出 Bayes 估计，并讨论三者为何不同。

**解**

后验参数为 $a=14.5$，$b=6.5$，$a+b=21$。

平方损失下由式（22.18）取后验均值：
$$\delta_{\text{mean}}=\frac{a}{a+b}=\frac{14.5}{21}=0.69048.$$

绝对损失下由式（22.19）取后验中位数。Beta 中位数无闭式解，用标准近似 $\frac{a-1/3}{a+b-2/3}$ 得
$$\delta_{\text{med}}\approx\frac{14.1667}{20.3333}=0.69672,$$
该近似在 $a,b$ 均大于 $1$ 时误差在 $10^{-3}$ 量级；若要求更高精度，可对后验密度数值积分或求解 $F(t)=\tfrac12$。

0-1 型损失下由式（22.20）取后验众数：
$$\delta_{\text{mode}}=\frac{a-1}{a+b-2}=\frac{13.5}{19}=0.71053.$$
三个数字满足 $\delta_{\text{mean}}<\delta_{\text{med}}<\delta_{\text{mode}}$，次序源于后验密度的偏态：$a=14.5>b=6.5>1$ 使 $\mathrm{Beta}(a,b)$ 密度左偏，左侧长尾把均值向下拉，众数停在密度峰顶，中位数居中。极大似然估计 $y/n=0.70$ 恰落在中位数与众数之间，说明它与任何一个 Bayes 估计的差异都在后验标准差
$$\sqrt{\frac{ab}{(a+b)^2(a+b+1)}}=\sqrt{\frac{94.25}{441\times22}}=0.09856$$
的十分之一以内。平方损失下的最小后验期望损失等于后验方差 $0.009715$，这是承认不确定性后不可避免的代价。

若决策不是报一个数，而是二选一：行动 $a_1$ 表示对外宣称命中率高于 $0.7$，行动 $a_0$ 表示不宣称，损失为 $L(\theta,a_1)=\mathbf 1\{\theta\le0.7\}$、$L(\theta,a_0)=\mathbf 1\{\theta>0.7\}$。由后验标准差作正态近似，
$$\mathbb P(\theta>0.7\mid y)\approx1-\Phi\!\left(\frac{0.70-0.69048}{0.09856}\right)=1-\Phi(0.0966)=0.4614.$$
于是 $\rho(a_1\mid y)=0.5386>\rho(a_0\mid y)=0.4614$，最优行动是 $a_0$：即使点估计的三个版本都在 $0.69$ 至 $0.71$ 之间，在 0-1 代价结构下仍不应宣称命中率高于 $0.7$。这说明「估计值高于阈值」与「宣称高于阈值是最优决策」是两个不同命题，后者必须由后验概率而非点估计来判断。

## 22.5 Bayes 与频率性质的比较

定理 22.12 说明：承认先验之后，Bayes 规则是唯一合理的选择。但这一结论的前提是承认先验。频率学派不接受这一前提，他们要求估计量对每一个固定的真值 $\theta$ 都表现良好，即以风险函数 $R(\theta,\delta)$ 的逐点上界或整体形状作为评价标准。两套标准并不矛盾：Bayes 规则是先验加权意义下的最优，频率性质是真值固定意义下的表现。本节讨论二者的接合处，包括极小极大准则与最不利先验的对偶关系、Bayes 估计量的偏差与均方误差分解、James–Stein 收缩估计作为经验 Bayes 方法却能在频率意义下击败极大似然这一著名现象，以及容许性概念。

**定义 22.14（支配、容许性、极小极大规则与最不利先验）**

设 $\delta_1,\delta_2$ 为两个决策规则。若对一切 $\theta\in\Theta$ 有 $R(\theta,\delta_1)\le R(\theta,\delta_2)$，且存在某个 $\theta_0$ 使不等式严格，则称 $\delta_1$ 支配 $\delta_2$。若不存在支配 $\delta$ 的规则，则称 $\delta$ 是容许的；否则称其为不容许的。规则 $\delta_M$ 称为极小极大规则，若
$$\sup_{\theta\in\Theta}R(\theta,\delta_M)=\inf_\delta\sup_{\theta\in\Theta}R(\theta,\delta),$$
公共值称为极小极大风险。先验 $\pi_0$ 称为最不利先验，若它的 Bayes 值不小于任何其他先验的 Bayes 值，即
$$r(\pi_0)=\sup_{\pi}r(\pi).\tag{22.21}$$

**定理 22.15（Bayes 规则与极小极大规则、容许性的关系）**

（i）设 $\delta_\pi$ 是先验 $\pi$ 的 Bayes 规则，且其风险函数为常数，即存在 $c\ge0$ 使 $R(\theta,\delta_\pi)=c$ 对一切 $\theta\in\Theta$ 成立。则 $\delta_\pi$ 是极小极大规则，且 $c$ 为极小极大风险。

（ii）更一般地，若 $\delta_\pi$ 是先验 $\pi$ 的 Bayes 规则且 $\sup_{\theta}R(\theta,\delta_\pi)=r(\pi,\delta_\pi)$，则 $\delta_\pi$ 是极小极大规则。特别地，当 $\pi_0$ 是最不利先验、$\delta_{\pi_0}$ 是其 Bayes 规则且 $\delta_{\pi_0}$ 的风险为常数时，$\delta_{\pi_0}$ 极小极大。

（iii）若 $\delta_\pi$ 是先验 $\pi$ 的唯一 Bayes 规则（即任何其他 Bayes 规则都与它只在一个 $m$-零测样本集上不同），则 $\delta_\pi$ 是容许的。

**证明**

（ii）记 $c=\sup_\theta R(\theta,\delta_\pi)=r(\pi,\delta_\pi)$。对任意规则 $\delta'$，一方面极小极大风险的下界可由先验 $\pi$ 给出：
$$\sup_{\theta\in\Theta}R(\theta,\delta')\ge\int_\Theta R(\theta,\delta')\,\pi(\theta)\,\mathrm d\theta=r(\pi,\delta')\ge r(\pi,\delta_\pi)=c,$$
第一个不等式因为上确界不小于加权平均（被积函数非负时显然成立，一般情形由 $\sup$ 的定义直接得到），第二个不等式由 $\delta_\pi$ 的 Bayes 性。另一方面 $\sup_\theta R(\theta,\delta_\pi)=c$。故 $c\le\inf_{\delta'}\sup_\theta R(\theta,\delta')\le\sup_\theta R(\theta,\delta_\pi)=c$，两端相等，$\delta_\pi$ 达到下确界。

（i）是（ii）的特例：风险恒为 $c$ 时，$r(\pi,\delta_\pi)=\int c\,\pi(\theta)\mathrm d\theta=c=\sup_\theta R(\theta,\delta_\pi)$，条件成立。
（iii）此处附加两个标准正则性条件，它们在本章涉及的共轭模型与连续损失下都成立：先验 $\pi$ 具有满支撑，即 $\Theta$ 的每个非空开子集都有正先验质量；风险函数 $\theta\mapsto R(\theta,\delta)$ 关于 $\theta$ 连续。反证：设某规则 $\delta'$ 支配 $\delta_\pi$，即 $R(\theta,\delta')\le R(\theta,\delta_\pi)$ 对一切 $\theta$ 成立，且存在 $\theta_0$ 使严格不等。由 $\delta_\pi$ 的 Bayes 性，
$$0\le\int_\Theta\bigl[R(\theta,\delta_\pi)-R(\theta,\delta')\bigr]\pi(\theta)\,\mathrm d\theta=r(\pi,\delta_\pi)-r(\pi,\delta')\le0,$$
故积分为零；被积函数非负，因此它在 $\pi$-几乎处处的 $\theta$ 上等于零。另一方面，由连续性，存在 $\theta_0$ 的邻域 $U$ 与常数 $\eta>0$，使 $R(\theta,\delta_\pi)-R(\theta,\delta')\ge\eta$ 对一切 $\theta\in U$ 成立；由满支撑 $\pi(U)>0$，于是积分至少为 $\eta\,\pi(U)>0$，矛盾。故不存在支配 $\delta_\pi$ 的规则，$\delta_\pi$ 容许。

□

**注记**（唯一性不可省）定理 22.15(iii) 中的「唯一」不可去掉。存在非唯一的 Bayes 规则却不容许的例子：当先验退化为集中在一点 $\theta_1$ 时，恒取 $a=\theta_1$ 的规则是 Bayes 规则，但它显然被任何一致更好的规则支配。满支撑条件同样不可省：先验质量集中的区域之外的风险表现，Bayes 风险完全不予计较。

### 22.5.1 后验均值的偏差、方差与 Bayes 风险

考虑最简洁的正态—正态模型：$X_1,\dots,X_n$ 独立同分布于 $N(\theta,\sigma^2)$，$\sigma^2$ 已知，先验 $\theta\sim N(m_0,\tau^2)$。由定理 22.4，后验均值为
$$\delta^\pi(\bar X)=w\,\bar X+(1-w)\,m_0,\qquad w=\frac{n\tau^2}{n\tau^2+\sigma^2},$$
即样本均值向先验均值 $m_0$ 的加权平均，权重 $w$ 随样本量 $n$ 增大而趋于 $1$，随先验方差 $\tau^2$ 减小而趋于 $0$。把 $\delta^\pi$ 当作频率意义下的估计量来考察，固定真值 $\theta$，由 $\bar X\sim N(\theta,\sigma^2/n)$ 得
$$\mathbb E_\theta[\delta^\pi]=w\theta+(1-w)m_0,\qquad \operatorname{Var}_\theta(\delta^\pi)=w^2\frac{\sigma^2}{n},$$
偏差为 $\operatorname{bias}_\theta(\delta^\pi)=(1-w)(m_0-\theta)$，故均方误差为
$$\operatorname{MSE}_\theta(\delta^\pi)=(1-w)^2(m_0-\theta)^2+w^2\frac{\sigma^2}{n}.$$
与之相比，极大似然估计 $\bar X$ 无偏且 $\operatorname{MSE}_\theta(\bar X)=\sigma^2/n$。二者的比较取决于 $\theta$ 与 $m_0$ 的距离：当 $|m_0-\theta|$ 充分小时收缩有利，当 $\theta$ 远离 $m_0$ 时收缩有害，且 $\sup_\theta\operatorname{MSE}_\theta(\delta^\pi)=\infty$，而 $\sup_\theta\operatorname{MSE}_\theta(\bar X)=\sigma^2/n$。就最坏情形而言，收缩估计反而更差。
但若以先验 $\pi$ 加权平均，即考察 Bayes 风险，则由 $\mathbb E^\pi[(m_0-\theta)^2]=\tau^2$，
$$r(\pi,\delta^\pi)=(1-w)^2\tau^2+w^2\frac{\sigma^2}{n}=\frac{\sigma^4\tau^2}{(n\tau^2+\sigma^2)^2}+\frac{n\tau^4\sigma^2}{(n\tau^2+\sigma^2)^2}=\frac{\sigma^2\tau^2(\sigma^2+n\tau^2)}{(n\tau^2+\sigma^2)^2}=\frac{\sigma^2\tau^2}{n\tau^2+\sigma^2}=w\,\frac{\sigma^2}{n}.\tag{22.22}$$
极大似然估计的 Bayes 风险为 $r(\pi,\bar X)=\sigma^2/n$，故式（22.22）给出 $r(\pi,\delta^\pi)=w\,r(\pi,\bar X)<r(\pi,\bar X)$，收缩在先验平均意义下必然改进，改进比例正是 $1-w=\sigma^2/(n\tau^2+\sigma^2)$。

上述对比揭示了 Bayes 方法的核心权衡：以在 $\theta$ 远离 $m_0$ 时的最坏表现，换取先验集中区域内的平均改进。这一权衡是否值得，完全取决于先验是否可信。在一维正态位置问题中，极大似然估计 $\bar X$ 既是容许的又是极小极大的，因而不存在能在全部 $\theta$ 上一致击败它的估计量；收缩带来的改进只能是「平均意义」的。然而当维数 $p\ge3$ 时，情形发生质变：Stein 发现存在一个既不依赖任何先验、又能在每一个 $\theta$ 处都严格优于极大似然估计的收缩估计量。这一现象的动机恰可由经验 Bayes 观点解释，故放在本节讨论。

**定理 22.16（James–Stein 估计一致优于极大似然）**

设 $\boldsymbol X=(X_1,\dots,X_p)^\top$ 服从 $N_p(\boldsymbol\theta,\boldsymbol I_p)$，其中 $\boldsymbol\theta\in\mathbb R^p$ 未知，$p\ge3$，损失为 $L(\boldsymbol\theta,\boldsymbol a)=\|\boldsymbol a-\boldsymbol\theta\|^2$。定义 James–Stein 估计量
$$\delta^{JS}(\boldsymbol X)=\left(1-\frac{p-2}{\|\boldsymbol X\|^2}\right)\boldsymbol X.\tag{22.23}$$
则极大似然估计 $\boldsymbol X$ 的风险恒为 $R(\boldsymbol\theta,\boldsymbol X)=p$，而
$$R(\boldsymbol\theta,\delta^{JS})=p-(p-2)^2\,\mathbb E_{\boldsymbol\theta}\!\left[\frac{1}{\|\boldsymbol X\|^2}\right]<p\tag{22.24}$$
对每一个 $\boldsymbol\theta\in\mathbb R^p$ 成立。因此 $p\ge3$ 时极大似然估计在平方损失下不容许。

**证明**

第一步，建立 Stein 恒等式。设 $g:\mathbb R^p\to\mathbb R$ 在每个坐标方向上绝对连续，偏导数 $\partial g/\partial x_i$ 可积，且 $\lim_{|t|\to\infty}g(x_1,\dots,t,\dots,x_p)\,\varphi(t)=0$，其中 $\varphi$ 为标准正态密度。对 $\boldsymbol Z\sim N_p(\boldsymbol 0,\boldsymbol I_p)$ 与 $\boldsymbol X=\boldsymbol\theta+\boldsymbol Z$，作分部积分。利用 $z\varphi(z)=-\varphi'(z)$，并对除第 $i$ 个以外的 $p-1$ 个坐标逐层积分，得
$$\mathbb E\bigl[(X_i-\theta_i)\,g(\boldsymbol X)\bigr]=\int_{\mathbb R}z_i\,g(\boldsymbol\theta+z)\,\varphi(z_i)\,\mathrm dz_i,$$
$$=-\int_{\mathbb R}g(\boldsymbol\theta+z)\,\varphi'(z_i)\,\mathrm dz_i=\int_{\mathbb R}\frac{\partial g}{\partial z_i}(\boldsymbol\theta+z)\,\varphi(z_i)\,\mathrm dz_i=\mathbb E\left[\frac{\partial g}{\partial x_i}(\boldsymbol X)\right].$$
边界项为零由 $g\varphi$ 在无穷远衰减保证。这就是 Stein 恒等式。
第二步，展开风险。记 $S=\|\boldsymbol X\|^2=\sum_{i=1}^p X_i^2$，则
$$\|\delta^{JS}-\boldsymbol\theta\|^2=\left\|\boldsymbol X-\boldsymbol\theta-\frac{p-2}{S}\boldsymbol X\right\|^2=\|\boldsymbol X-\boldsymbol\theta\|^2-\frac{2(p-2)}{S}\sum_{i=1}^p(X_i-\theta_i)X_i+\frac{(p-2)^2}{S}.$$
第一项的期望为 $\sum_{i=1}^p\operatorname{Var}(X_i)=p$。对第二项，取 $g_i(\boldsymbol x)=(p-2)x_i/\|\boldsymbol x\|^2$。该函数在原点奇异，故先取正则化版本 $g_i^{(\epsilon)}(\boldsymbol x)=(p-2)x_i/(\|\boldsymbol x\|^2+\epsilon)$，$\epsilon>0$；它处处光滑、导数有界衰减，满足 Stein 恒等式的条件，因而
$$\mathbb E\bigl[(X_i-\theta_i)\,g_i^{(\epsilon)}(\boldsymbol X)\bigr]=\mathbb E\bigl[\partial_i g_i^{(\epsilon)}(\boldsymbol X)\bigr].$$
当 $\epsilon\downarrow0$ 时，$g_i^{(\epsilon)}(\boldsymbol X)\to g_i(\boldsymbol X)$ 几乎必然，且 $|g_i^{(\epsilon)}(\boldsymbol X)|\le(p-2)|X_i|/\|\boldsymbol X\|^2$ 在 $p\ge3$ 时期望有限（因为 $\mathbb E[1/\|\boldsymbol X\|]<\infty$）；导数一侧同样被可积函数控制。由控制收敛定理令 $\epsilon\downarrow0$，得 Stein 恒等式对 $g_i$ 成立：
$$\mathbb E\left[(X_i-\theta_i)\frac{(p-2)X_i}{S}\right]=(p-2)\,\mathbb E\left[\frac{1}{S}-\frac{2X_i^2}{S^2}\right].$$
对 $i$ 求和，
$$\mathbb E\left[\frac{2(p-2)}{S}\sum_{i=1}^p(X_i-\theta_i)X_i\right]=2(p-2)\,\mathbb E\left[\frac{p}{S}-\frac{2\sum_{i}X_i^2}{S^2}\right]=2(p-2)(p-2)\,\mathbb E\left[\frac{1}{S}\right].$$
于是
$$R(\boldsymbol\theta,\delta^{JS})=p-2(p-2)^2\,\mathbb E\left[\frac{1}{S}\right]+(p-2)^2\,\mathbb E\left[\frac{1}{S}\right]=p-(p-2)^2\,\mathbb E\left[\frac{1}{S}\right],$$
即式（22.24）。

第三步，验证改进严格为正。$S=\|\boldsymbol X\|^2$ 服从自由度 $p$、非中心参数 $\lambda=\|\boldsymbol\theta\|^2$ 的非中心卡方分布，故 $\mathbb E[S]=p+\lambda$。当 $p\ge3$ 时 $\mathbb P(S=0)=0$ 且 $\mathbb E[1/S]<\infty$，从而 $1/S>0$ 几乎必然给出 $\mathbb E[1/S]>0$。再由 $x\mapsto1/x$ 在正半轴上凸，Jensen 不等式给出下界 $\mathbb E[1/S]\ge1/(p+\lambda)$，于是
$$R(\boldsymbol\theta,\delta^{JS})\le p-\frac{(p-2)^2}{p+\|\boldsymbol\theta\|^2}<p=R(\boldsymbol\theta,\boldsymbol X)$$
对每一个 $\boldsymbol\theta$ 成立，且不等式严格。故极大似然估计被 $\delta^{JS}$ 支配，在 $p\ge3$ 时不容许。改进量在 $\boldsymbol\theta=\boldsymbol 0$ 附近最大，随 $\|\boldsymbol\theta\|$ 增大而衰减到零。$p\le2$ 时 $\mathbb E[1/S]=\infty$，上述推导失效，极大似然估计确实容许，维数条件不可放宽。

□

### 22.5.2 经验 Bayes 解释与横截面收缩

James–Stein 估计量不依赖任何先验，其形式却恰是 Bayesian 收缩的形式，这不是巧合。设先验为 $\boldsymbol\theta\sim N_p(\boldsymbol 0,\lambda\boldsymbol I_p)$，其中 $\lambda>0$ 未知，抽样模型仍为 $\boldsymbol X\sim N_p(\boldsymbol\theta,\boldsymbol I_p)$。由定理 22.4，后验均值为
$$\mathbb E[\boldsymbol\theta\mid\boldsymbol X]=\frac{\lambda}{1+\lambda}\,\boldsymbol X,$$
即向原点收缩，收缩系数 $\lambda/(1+\lambda)$ 由先验方差与抽样方差之比决定。边际分布为 $\boldsymbol X\sim N_p(\boldsymbol 0,(1+\lambda)\boldsymbol I_p)$，故 $S/(1+\lambda)\sim\chi^2_p$。经验 Bayes 的做法是用数据估计 $\lambda$ 再代回后验均值。当 $p\ge3$ 时，$\chi^2_p$ 变量的倒数的期望为 $1/(p-2)$，因此
$$\mathbb E\left[\frac{p-2}{S}\right]=\frac{1}{1+\lambda},\qquad \mathbb E\left[1-\frac{p-2}{S}\right]=\frac{\lambda}{1+\lambda},$$
即 $1-(p-2)/S$ 是收缩系数 $\lambda/(1+\lambda)$ 的无偏估计。把它代入后验均值，恰好得到式（22.23）。这就解释了定理 22.16 中神秘的 $p-2$：它来自卡方分布倒数矩的精确值，而非某种启发式修正。

当 $S$ 很小时，$1-(p-2)/S$ 为负，估计量会把 $\boldsymbol X$ 反向翻转过原点，这显然不合理。取正部
$$\delta^{JS+}(\boldsymbol X)=\max\left\{0,\,1-\frac{p-2}{S}\right\}\boldsymbol X$$
可以在每一个 $\boldsymbol\theta$ 处进一步改进 $\delta^{JS}$，因为在 $S<p-2$ 的区域里，把估计量拉到原点比反向翻转的损失更小。若方差不是单位阵而是 $\sigma^2\boldsymbol I_p$ 且 $\sigma^2$ 已知，则收缩系数变为 $1-(p-2)\sigma^2/S$；当 $\sigma^2$ 未知时，可用一个与横截面均值独立、自由度足够大的方差估计 $\hat\sigma^2$ 替换，得到实际可用的横截面收缩估计量。

**例 22.6**

设五个行业指数的月均超额收益估计值为 $\boldsymbol X=(2.4,\,1.6,\,0.8,\,0.3,\,-0.5)^\top$（单位：百分点），每个分量的抽样标准差已知为 $\sigma=1$ 个百分点，即 $\boldsymbol X\sim N_5(\boldsymbol\theta,\boldsymbol I_5)$。比较极大似然估计与 James–Stein 估计。

**解**

$p=5\ge3$，故定理 22.16 适用。先算 $S=\|\boldsymbol X\|^2=2.4^2+1.6^2+0.8^2+0.3^2+(-0.5)^2=5.76+2.56+0.64+0.09+0.25=9.30$。收缩因子为
$$c=1-\frac{(p-2)\sigma^2}{S}=1-\frac{3}{9.30}=1-0.32258=0.67742>0,$$
正部修正不起作用，$\delta^{JS}=c\boldsymbol X=(1.626,\,1.084,\,0.542,\,0.203,\,-0.339)^\top$。

风险方面，$R(\boldsymbol\theta,\boldsymbol X)=p\sigma^2=5$，而
$$R(\boldsymbol\theta,\delta^{JS})=5-9\,\mathbb E\left[\frac{1}{S}\right]\le5-\frac{9}{5+\|\boldsymbol\theta\|^2}.$$
用 $\mathbb E[S]=p+\|\boldsymbol\theta\|^2$ 把 $S$ 视作 $5+\|\boldsymbol\theta\|^2$ 的一次实现，得 $\|\boldsymbol\theta\|^2$ 的粗估为 $9.30-5=4.30$，代入得风险上界 $5-9/9.30=4.032$，即至少 $19.4\%$ 的风险削减，且这一削减对每一个 $\boldsymbol\theta$ 都成立，不是平均意义的改进。
值得注意的是收缩幅度的两种算法给出的结果不同。若按经验 Bayes 的朴素做法，先由 $\hat\lambda=S-p=4.30$ 估计先验方差，再代回 $\hat\lambda/(1+\hat\lambda)=4.30/5.30=0.8113$，收缩较温和；而 James–Stein 用的是 $\lambda/(1+\lambda)$ 的无偏估计 $1-(p-2)/S=0.6774$，收缩更激进。二者之差源于 $S$ 的非线性变换的期望不等于期望的变换，无偏版本在风险意义下更优。

从投资角度看，收缩把最高者 $2.4$ 压到 $1.63$、把最低者 $-0.5$ 抬到 $-0.34$，即把横截面上的极端观测向整体均值拉回。当五个行业的真实预期收益彼此接近时，样本极值大半是噪声；James–Stein 的风险改进正是把这一先验知识以完全非参数的形式嵌入估计量。这也解释了为什么在因子研究与行业配置中，直接用样本均值排序选资产往往表现不稳定，而经过收缩的期望收益能显著降低换手率与估计误差。

## 22.6 计算方法：MCMC 与详细平衡

定理 22.4 至定理 22.7 给出的四族共轭后验之所以有闭式解，是因为先验与似然的乘积恰好落回同一族。真实的量化模型很少具备这种结构：混合正态先验、带约束的参数、非正态似然、层次模型中的超参数，都会使后验密度已知到一个归一化常数、而该常数无法解析求出。设未归一化后验为 $\tilde\pi(\boldsymbol\theta\mid x)=L(x\mid\boldsymbol\theta)\pi(\boldsymbol\theta)$，则任何后验泛函都可写成比值
$$\mathbb E[h(\boldsymbol\theta)\mid x]=\frac{\int_\Theta h(\boldsymbol\theta)\,\tilde\pi(\boldsymbol\theta\mid x)\,\mathrm d\boldsymbol\theta}{\int_\Theta \tilde\pi(\boldsymbol\theta\mid x)\,\mathrm d\boldsymbol\theta}.$$
第18章的蒙特卡洛方法提示：若能从后验中独立抽样 $\boldsymbol\theta^{(1)},\dots,\boldsymbol\theta^{(M)}$，则用 $\frac1M\sum_m h(\boldsymbol\theta^{(m)})$ 逼近分子、分母同理，比值即得。困难在于直接从后验抽样通常与直接积分同样不可能。

Markov 链蒙特卡洛（MCMC）的关键转向是：放弃独立抽样，转而构造一条以目标后验为平稳分布的 Markov 链，用它的轨迹作样本。由遍历定理，只要链不可约、非周期且平稳分布存在，时间平均就收敛到后验期望，且由第14章的中心极限定理可给出误差的阶。这样，问题的全部难点被压缩为一个纯构造性问题：如何造出一条以给定 $\tilde\pi$ 为平稳分布的链。详细平衡条件正是回答这一问题的工具。

**定义 22.17（转移核、不变测度与详细平衡）**

设 $(\Theta,\mathcal B)$ 为可测空间。Markov 转移核 $P:\Theta\times\mathcal B\to[0,1]$ 满足：对每个 $\boldsymbol\theta$，$A\mapsto P(\boldsymbol\theta,A)$ 是概率测度；对每个 $A$，$\boldsymbol\theta\mapsto P(\boldsymbol\theta,A)$ 可测。测度 $\pi$ 称为 $P$ 的不变测度，若
$$\pi(A)=\int_\Theta P(\boldsymbol\theta,A)\,\pi(\mathrm d\boldsymbol\theta),\qquad \forall A\in\mathcal B.$$
若乘积测度满足对称性
$$\pi(\mathrm d\boldsymbol\theta)\,P(\boldsymbol\theta,\mathrm d\boldsymbol\theta')=\pi(\mathrm d\boldsymbol\theta')\,P(\boldsymbol\theta',\mathrm d\boldsymbol\theta)\tag{22.25}$$
（作为 $\Theta\times\Theta$ 上的测度相等），则称 $P$ 关于 $\pi$ 满足详细平衡，或称链是可逆的。

**定理 22.18（详细平衡蕴含不变性；Metropolis–Hastings 核的可逆性）**

（i）若转移核 $P$ 关于测度 $\pi$ 满足式（22.25），则 $\pi$ 是 $P$ 的不变测度。

（ii）设目标分布具有密度 $\pi(\boldsymbol\theta)\propto\tilde\pi(\boldsymbol\theta)$，$\tilde\pi$ 已知到一个正常数因子；设提议核具有密度 $q(\boldsymbol\theta,\boldsymbol\theta')$（关于同一支配测度），且满足 $q(\boldsymbol\theta,\boldsymbol\theta')>0$ 蕴含 $q(\boldsymbol\theta',\boldsymbol\theta)>0$。定义接受概率
$$\alpha(\boldsymbol\theta,\boldsymbol\theta')=\min\left\{1,\ \frac{\tilde\pi(\boldsymbol\theta')\,q(\boldsymbol\theta',\boldsymbol\theta)}{\tilde\pi(\boldsymbol\theta)\,q(\boldsymbol\theta,\boldsymbol\theta')}\right\}\tag{22.26}$$
并约定分母为零时 $\alpha=1$。定义 Metropolis–Hastings 转移核
$$P(\boldsymbol\theta,A)=\int_A q(\boldsymbol\theta,\boldsymbol\theta')\,\alpha(\boldsymbol\theta,\boldsymbol\theta')\,\mathrm d\boldsymbol\theta'+\mathbf 1\{\boldsymbol\theta\in A\}\,r(\boldsymbol\theta),\qquad r(\boldsymbol\theta)=1-\int_\Theta q(\boldsymbol\theta,\boldsymbol\theta')\,\alpha(\boldsymbol\theta,\boldsymbol\theta')\,\mathrm d\boldsymbol\theta'.$$
则 $P$ 是一个合法的转移核，且关于 $\pi$ 满足详细平衡，从而 $\pi$ 是 $P$ 的不变测度。

**证明**

（i）设 $A\in\mathcal B$。把式（22.25）两边同时与函数 $\mathbf 1_A(\boldsymbol\theta')$ 积分：左端为
$$\int_\Theta\int_\Theta\mathbf 1_A(\boldsymbol\theta')\,\pi(\mathrm d\boldsymbol\theta)\,P(\boldsymbol\theta,\mathrm d\boldsymbol\theta')=\int_\Theta P(\boldsymbol\theta,A)\,\pi(\mathrm d\boldsymbol\theta).$$
右端交换 $\boldsymbol\theta$ 与 $\boldsymbol\theta'$ 的角色后为
$$\int_\Theta\int_\Theta\mathbf 1_A(\boldsymbol\theta)\,\pi(\mathrm d\boldsymbol\theta')\,P(\boldsymbol\theta',\mathrm d\boldsymbol\theta)=\int_\Theta\mathbf 1_A(\boldsymbol\theta)\left[\int_\Theta P(\boldsymbol\theta',\mathrm d\boldsymbol\theta)\right]\pi(\mathrm d\boldsymbol\theta')=\int_A 1\cdot\pi(\mathrm d\boldsymbol\theta')=\pi(A),$$
其中用到 $P(\boldsymbol\theta',\Theta)=1$。两端相等即 $\int P(\boldsymbol\theta,A)\pi(\mathrm d\boldsymbol\theta)=\pi(A)$，$\pi$ 不变。

（ii）先验证合法性：由 $\alpha\le1$，$r(\boldsymbol\theta)=1-\int q\alpha\ge1-\int q=0$；又 $r\le1$，故 $P(\boldsymbol\theta,\cdot)$ 是两个非负测度之和且 $P(\boldsymbol\theta,\Theta)=\int q\alpha+r(\boldsymbol\theta)=1$。

再验证详细平衡。关键是证明函数
$$s(\boldsymbol\theta,\boldsymbol\theta')=\tilde\pi(\boldsymbol\theta)\,q(\boldsymbol\theta,\boldsymbol\theta')\,\alpha(\boldsymbol\theta,\boldsymbol\theta')$$
关于两个自变量对称。分两种情形。若 $\tilde\pi(\boldsymbol\theta')q(\boldsymbol\theta',\boldsymbol\theta)\le\tilde\pi(\boldsymbol\theta)q(\boldsymbol\theta,\boldsymbol\theta')$，则式（22.26）的比值不超过 $1$，故 $\alpha$ 就等于该比值，相乘后 $\tilde\pi(\boldsymbol\theta)q(\boldsymbol\theta,\boldsymbol\theta')$ 被约掉，得 $s(\boldsymbol\theta,\boldsymbol\theta')=\tilde\pi(\boldsymbol\theta')q(\boldsymbol\theta',\boldsymbol\theta)$，这正是二者中较小者。若反向不等式成立，同理得 $s(\boldsymbol\theta,\boldsymbol\theta')=\tilde\pi(\boldsymbol\theta)q(\boldsymbol\theta,\boldsymbol\theta')$，仍是二者中较小者。两种情形合并为
$$s(\boldsymbol\theta,\boldsymbol\theta')=\min\bigl\{\tilde\pi(\boldsymbol\theta)q(\boldsymbol\theta,\boldsymbol\theta'),\ \tilde\pi(\boldsymbol\theta')q(\boldsymbol\theta',\boldsymbol\theta)\bigr\}=s(\boldsymbol\theta',\boldsymbol\theta),$$
对称性得证，且归一化常数在此表达式中被完全消去，这正是 MH 算法只需未归一化密度的原因。
把 $P$ 拆成非对角部分与原子部分。对任意可测集 $A,B$，由 $\pi(\mathrm d\boldsymbol\theta)=\tilde\pi(\boldsymbol\theta)\,\mathrm d\boldsymbol\theta/C$ 与 $s$ 的对称性，
$$\int_A\pi(\mathrm d\boldsymbol\theta)\int_B q(\boldsymbol\theta,\boldsymbol\theta')\alpha(\boldsymbol\theta,\boldsymbol\theta')\,\mathrm d\boldsymbol\theta'=\frac1C\int_A\int_B s(\boldsymbol\theta,\boldsymbol\theta')\,\mathrm d\boldsymbol\theta'\,\mathrm d\boldsymbol\theta=\frac1C\int_B\int_A s(\boldsymbol\theta',\boldsymbol\theta)\,\mathrm d\boldsymbol\theta\,\mathrm d\boldsymbol\theta'=\int_B\pi(\mathrm d\boldsymbol\theta')\int_A q(\boldsymbol\theta',\boldsymbol\theta)\alpha(\boldsymbol\theta',\boldsymbol\theta)\,\mathrm d\boldsymbol\theta.$$
原子部分则给出
$$\int_A\pi(\mathrm d\boldsymbol\theta)\,\mathbf 1\{\boldsymbol\theta\in B\}\,r(\boldsymbol\theta)=\int_{A\cap B}\pi(\mathrm d\boldsymbol\theta)\,r(\boldsymbol\theta)=\int_B\pi(\mathrm d\boldsymbol\theta')\,\mathbf 1\{\boldsymbol\theta'\in A\}\,r(\boldsymbol\theta'),$$
它关于 $A,B$ 显然对称。两部分相加即得 $\pi(\mathrm d\boldsymbol\theta)P(\boldsymbol\theta,\mathrm d\boldsymbol\theta')=\pi(\mathrm d\boldsymbol\theta')P(\boldsymbol\theta',\mathrm d\boldsymbol\theta)$，即式（22.25）。由（i），$\pi$ 是不变测度。

□

**注记**（不变性不等于收敛）定理 22.18 只保证目标分布是链的不变测度，并不保证链会收敛到它。要由遍历平均得到后验期望，还需链关于 $\pi$ 不可约（任意正测度集合都能以正概率到达）且非周期；对连续状态空间上的随机游走 MH，只要 $\tilde\pi$ 在开集上为正且提议密度处处为正，这些条件即满足。此时 Markov 链遍历定理给出 $\frac1M\sum_{m=1}^M h(\boldsymbol\theta^{(m)})\to\mathbb E^\pi[h]$ 几乎必然。此外，详细平衡是可逆链的充分条件而非必要条件：不可逆链同样可以有 $\pi$ 为不变测度，且往往混合更快。

**命题 22.19（Gibbs 抽样是接受率恒为 1 的 Metropolis–Hastings）**

设 $\boldsymbol\theta=(\theta_1,\dots,\theta_d)$，后验密度为 $\pi(\boldsymbol\theta)$，全条件密度 $\pi(\theta_j\mid\boldsymbol\theta_{-j})$ 均可抽样，其中 $\boldsymbol\theta_{-j}$ 表示除第 $j$ 个分量外的全部分量。Gibbs 抽样第 $j$ 步的转移核为
$$P_j(\boldsymbol\theta,\mathrm d\boldsymbol\theta')=\pi(\theta_j'\mid\boldsymbol\theta_{-j})\,\mathrm d\theta_j'\cdot\delta_{\boldsymbol\theta_{-j}}(\mathrm d\boldsymbol\theta'_{-j}),\tag{22.27}$$
即保持其余分量不变、只从第 $j$ 个全条件分布中重新抽样。则 $P_j$ 关于 $\pi$ 满足详细平衡；等价地，$P_j$ 是以 $q(\boldsymbol\theta,\boldsymbol\theta')=\pi(\theta_j'\mid\boldsymbol\theta_{-j})$ 为提议、接受率恒为 $1$ 的 Metropolis–Hastings 核。

**证明**

先按 Metropolis–Hastings 的角度验证。提议密度 $q(\boldsymbol\theta,\boldsymbol\theta')=\pi(\theta_j'\mid\boldsymbol\theta_{-j})$ 不依赖于当前值 $\theta_j$，且 $q(\boldsymbol\theta',\boldsymbol\theta)=\pi(\theta_j\mid\boldsymbol\theta'_{-j})=\pi(\theta_j\mid\boldsymbol\theta_{-j})$，因为 $\boldsymbol\theta'_{-j}=\boldsymbol\theta_{-j}$。代入式（22.26），
$$\frac{\pi(\boldsymbol\theta')\,q(\boldsymbol\theta',\boldsymbol\theta)}{\pi(\boldsymbol\theta)\,q(\boldsymbol\theta,\boldsymbol\theta')}=\frac{\pi(\boldsymbol\theta')\,\pi(\theta_j\mid\boldsymbol\theta_{-j})}{\pi(\boldsymbol\theta)\,\pi(\theta_j'\mid\boldsymbol\theta_{-j})}=\frac{\pi(\theta_j'\mid\boldsymbol\theta_{-j})\,\pi(\boldsymbol\theta_{-j})\,\pi(\theta_j\mid\boldsymbol\theta_{-j})}{\pi(\theta_j\mid\boldsymbol\theta_{-j})\,\pi(\boldsymbol\theta_{-j})\,\pi(\theta_j'\mid\boldsymbol\theta_{-j})}=1,$$
其中用到了 $\pi(\boldsymbol\theta)=\pi(\theta_j\mid\boldsymbol\theta_{-j})\pi(\boldsymbol\theta_{-j})$ 与 $\pi(\boldsymbol\theta')=\pi(\theta_j'\mid\boldsymbol\theta_{-j})\pi(\boldsymbol\theta_{-j})$。故 $\alpha\equiv1$，接受率为 $1$。
再从测度角度直接验证对称性。设 $A,B$ 可测，把 $\boldsymbol\theta$ 写成 $(\boldsymbol\theta_{-j},\theta_j)$，则
$$\int_A\pi(\mathrm d\boldsymbol\theta)\,P_j(\boldsymbol\theta,B)=\int\mathbf 1_A(\boldsymbol\theta_{-j},\theta_j)\,\mathbf 1_B(\boldsymbol\theta_{-j},\theta_j')\,\pi(\theta_j\mid\boldsymbol\theta_{-j})\,\pi(\theta_j'\mid\boldsymbol\theta_{-j})\,\pi(\boldsymbol\theta_{-j})\,\mathrm d\theta_j'\,\mathrm d\theta_j\,\mathrm d\boldsymbol\theta_{-j}.$$
右端的被积函数在交换 $\theta_j$ 与 $\theta_j'$ 后不变，而交换积分变量即把上式化为 $\int_B\pi(\mathrm d\boldsymbol\theta')P_j(\boldsymbol\theta',A)$。故 $\pi(\mathrm d\boldsymbol\theta)P_j(\boldsymbol\theta,\mathrm d\boldsymbol\theta')$ 关于两个自变量对称，详细平衡成立，再由定理 22.18(i)，$\pi$ 是 $P_j$ 的不变测度。

□

**注记**（系统扫描与随机扫描）完整的 Gibbs 抽样通常按 $j=1,2,\dots,d$ 依次更新，其转移核为复合核 $P=P_d\circ\cdots\circ P_1$。每个 $P_j$ 都以 $\pi$ 为不变测度，故复合核亦然：$\pi P=\pi P_d\cdots P_1=\pi$。但复合核一般不再满足详细平衡，即整轮扫描的链不是可逆链。若在每步随机地等概率挑选一个坐标更新（随机扫描），则核为 $\frac1d\sum_j P_j$，它是可逆核的凸组合，仍满足详细平衡。两种方案在收敛速度上可以相差很大，坐标之间相关性越强，系统扫描越容易缓慢移动。

**注记**（Gibbs 与 MH 的取舍）Gibbs 抽样不需要调参、接受率为 $1$，但要求每个全条件分布都能直接抽样；当某个全条件是复杂的非标准分布时，就得对该坐标嵌入一步 Metropolis–Hastings，即所谓 Metropolis-within-Gibbs。反之，随机游走 MH 只需要未归一化后验的逐点求值，实现最简单，代价是必须调节步长：步长过大则接受率骤降、链在原地徘徊；步长过小则每步位移很小、自相关极高。高维随机游走的最优接受率约为 $0.234$，可作为调参的经验目标。

### 22.6.1 收敛诊断与蒙特卡洛误差

MCMC 的输出是一条相关序列，其误差分析不同于第18章的独立抽样。设链平稳且遍历，$h$ 满足 $\mathbb E^\pi[h^2]<\infty$，记 $\rho_k=\operatorname{Corr}\bigl(h(\boldsymbol\theta^{(0)}),h(\boldsymbol\theta^{(k)})\bigr)$，$\sigma_h^2=\operatorname{Var}_\pi(h)$。Markov 链中心极限定理给出
$$\sqrt{M}\left(\frac1M\sum_{m=1}^M h(\boldsymbol\theta^{(m)})-\mathbb E^\pi[h]\right)\ \xrightarrow{d}\ N\bigl(0,\ \sigma_h^2\,\kappa_h\bigr),\qquad \kappa_h=1+2\sum_{k=1}^{\infty}\rho_k,\tag{22.28}$$
其中级数在几何遍历条件下绝对收敛。因子 $\kappa_h\ge0$ 称为渐近方差膨胀因子，相应地定义有效样本量
$$\operatorname{ESS}=\frac{M}{\kappa_h}.$$
与第18章对照：独立抽样的蒙特卡洛误差方差为 $\sigma_h^2/M$，而 MCMC 为 $\sigma_h^2\kappa_h/M$，即用 $M$ 个相关样本只买到 $\operatorname{ESS}$ 个独立样本的信息量。当自相关缓慢衰减（例如多峰后验或强相关参数）时 $\kappa_h$ 可达数百甚至上千，此时盲目增加迭代次数远不如改进链的构造。实践上应报告 $\operatorname{ESS}$ 而非 $M$。

诊断手段有三层。第一层是可视化：轨迹图应呈现平稳的毛虫状，长期漂移或多条平行带提示未收敛；自相关图应快速衰减到零。第二层是多链比较：从分散的初值出发并行运行若干条链，Gelman–Rubin 统计量把链间方差与链内方差加权合并，其比值 $\hat R$ 接近 $1$（通常要求小于 $1.05$）是收敛的必要提示；若初值分散而链仍汇聚，说明混合良好。第三层是分段检验，如 Geweke 的前 $20\%$ 与后 $50\%$ 样本均值之差的标准化统计量。必须强调：所有诊断只能揭示失败，不能证明收敛；唯一可靠的保证来自对链的解析性质（不可约性、几何遍历性、漂移条件）的验证。为降低方差，可对能解析积分的坐标作 Rao–Blackwell 化，即用全条件的解析期望替代抽样值。

**例 22.7**

设收益 $X_1,\dots,X_5$ 独立同分布于 $N(\theta,1)$，样本均值 $\bar x=1.2$，其中波动率已知为 $1$。参数 $\theta$ 表示超额收益的漂移，经济上应为正，故取先验 $\theta\sim\mathrm{Exp}(1)$，即 $\pi(\theta)=e^{-\theta}\mathbf 1\{\theta>0\}$。这一模型不属定理 22.4 的正态—正态共轭族（先验不是正态），后验无闭式解，需用 Metropolis–Hastings 抽样。写出接受率并计算从 $\theta=1.0$ 出发的两步提议。

**解**

似然只通过 $\bar x$ 与 $n$ 进入：$L(\theta)\propto\exp\{-\frac n2(\theta-\bar x)^2\}=\exp\{-2.5(\theta-1.2)^2\}$。未归一化后验为
$$\tilde\pi(\theta)=\exp\left\{-\theta-2.5(\theta-1.2)^2\right\}\mathbf 1\{\theta>0\}.$$
采用对称随机游走提议 $\theta'=\theta+\epsilon$，$\epsilon\sim N(0,0.5^2)$，则 $q(\theta,\theta')=q(\theta',\theta)$，式（22.26）的接受率化简为 Metropolis 形式
$$\alpha(\theta,\theta')=\min\left\{1,\ \frac{\tilde\pi(\theta')}{\tilde\pi(\theta)}\right\}.$$

第一步：当前 $\theta=1.0$，抽得 $\epsilon=0.25$，故 $\theta'=1.25>0$。计算对数后验 $\ell(\theta)=-\theta-2.5(\theta-1.2)^2$：
$$\ell(1.0)=-1.0-2.5\times0.04=-1.1,\qquad \ell(1.25)=-1.25-2.5\times0.0025=-1.25625,$$
$$\alpha=\exp\{\ell(1.25)-\ell(1.0)\}=\exp(-0.15625)=0.8554.$$
抽取 $U\sim\mathrm{Uniform}(0,1)$；若 $U<0.8554$ 则接受，链移动到 $1.25$，否则原地不动。
第二步：设链已在 $\theta=1.25$，抽得 $\epsilon=-1.60$，则 $\theta''=-0.35<0$，落在先验支撑之外，$\tilde\pi(\theta'')=0$，故 $\alpha=0$，无条件拒绝，链保持在 $1.25$。这说明支撑边界的处理不需要特别设计：只要把先验写成带示性函数的形式，接受率自动为零。

本例的后验其实可以解析求出，正好用来检验抽样是否正确。展开 $\ell(\theta)=-2.5\theta^2+5\theta-3.6$，这是 $\theta$ 的二次函数，故未截断的后验恰为 $N(1.0,\,0.2)$，即 Laplace 近似在此是精确的；再加上 $\theta>0$ 的截断，后验为截断正态。截断点标准化为 $a=(0-1)/\sqrt{0.2}=-2.236$，$\Phi(a)=0.0127$，$\varphi(a)=0.0328$，由截断正态的矩公式，
$$\mathbb E[\theta\mid x]=1+\sqrt{0.2}\,\frac{\varphi(a)}{1-\Phi(a)}=1+0.4472\times0.0332=1.0148,$$
$$\operatorname{Var}(\theta\mid x)=0.2\left[1+a\,\frac{\varphi(a)}{1-\Phi(a)}-\left(\frac{\varphi(a)}{1-\Phi(a)}\right)^2\right]=0.2\times0.9247=0.1850.$$
中位数由 $\Phi\bigl((t-1)/\sqrt{0.2}\bigr)=\Phi(a)+0.5\times0.9873=0.5064$ 解出 $t=1.0071$。于是平方损失下的 Bayes 估计为 $1.0148$，绝对损失下为 $1.0071$，与例 22.5 的次序规律一致（此处后验近似对称，两者几乎相同）。MCMC 运行后，样本均值与样本标准差应分别在 $1.015$ 与 $0.430$ 附近，偏差量级由式（22.28）的有效样本量决定。

步长方面，提议标准差 $0.5$ 与后验标准差 $0.430$ 同量级，接受率通常在 $0.6$ 至 $0.8$，偏高。按 $0.234$ 的经验目标可把步长放大到 $1.0$ 左右，接受率降到 $0.3$ 附近而自相关下降，有效样本量提高。

## 22.7 量化研究中的 Bayesian 方法

前面六节建立的是通用理论，本节把它落到量化研究的四个具体问题上：协方差矩阵的收缩估计、Black–Litterman 模型的推导、参数不确定性对最优权重的影响、以及因子回归中的先验设定。这四处的共同背景是金融数据的两个特征：样本量小（月频数据二十年只有二百四十个观测），噪声大（横截面收益的方差远大于其系统性成分的方差）。在这种信噪比下，纯数据驱动的估计量方差极大，而先验信息的价值远高于在大样本渐近理论中的价值。

### 22.7.1 协方差矩阵的 Bayesian 收缩

设 $n$ 个资产的收益向量 $\boldsymbol y_1,\dots,\boldsymbol y_T$ 独立同分布于 $N_n(\boldsymbol\mu,\boldsymbol\Sigma)$，样本协方差为 $S=\frac{1}{T-1}\sum_{t=1}^T(\boldsymbol y_t-\bar{\boldsymbol y})(\boldsymbol y_t-\bar{\boldsymbol y})^\top$。当 $n$ 与 $T$ 同量级时，$S$ 的特征值分布严重失真：最大特征值被高估、最小特征值被低估，条件数远大于真值；当 $n\ge T$ 时 $S$ 甚至奇异，而均值—方差最优化恰要求 $\boldsymbol\Sigma$ 可逆。

采用正态—逆 Wishart 共轭先验：$\boldsymbol\mu\mid\boldsymbol\Sigma\sim N_n(\boldsymbol\mu_0,\boldsymbol\Sigma/\kappa_0)$，$\boldsymbol\Sigma\sim IW_{\nu_0}(\boldsymbol\Lambda_0)$。标准共轭计算给出后验 $\boldsymbol\mu\mid\boldsymbol\Sigma,\boldsymbol y\sim N_n(\boldsymbol\mu_T,\boldsymbol\Sigma/\kappa_T)$ 与 $\boldsymbol\Sigma\mid\boldsymbol y\sim IW_{\nu_T}(\boldsymbol\Lambda_T)$，其中
$$\kappa_T=\kappa_0+T,\quad \boldsymbol\mu_T=\frac{\kappa_0\boldsymbol\mu_0+T\bar{\boldsymbol y}}{\kappa_0+T},\quad \nu_T=\nu_0+T,$$
$$\boldsymbol\Lambda_T=\boldsymbol\Lambda_0+(T-1)S+\frac{\kappa_0 T}{\kappa_0+T}(\bar{\boldsymbol y}-\boldsymbol\mu_0)(\bar{\boldsymbol y}-\boldsymbol\mu_0)^\top.$$
在 $\nu_T>n+1$ 时，后验协方差均值为 $\mathbb E[\boldsymbol\Sigma\mid\boldsymbol y]=\boldsymbol\Lambda_T/(\nu_T-n-1)$，它是逐元素平方损失下的 Bayes 估计。若先验尺度满足 $\boldsymbol\Lambda_0=(\nu_0-n-1)\boldsymbol F$，并记
$$\widetilde S=\frac1T\left[(T-1)S+\frac{\kappa_0T}{\kappa_0+T}(\bar{\boldsymbol y}-\boldsymbol\mu_0)(\bar{\boldsymbol y}-\boldsymbol\mu_0)^\top\right],\qquad \lambda_T=\frac{\nu_0-n-1}{\nu_T-n-1},$$
则后验均值可写成精确的凸收缩形式
$$\widehat{\boldsymbol\Sigma}_B=\lambda_T\boldsymbol F+(1-\lambda_T)\widetilde S.\tag{22.29}$$
这里 $\boldsymbol F$ 是由基本面、历史相关性或因子模型给出的正定目标，$\lambda_T$ 随有效样本量增加而下降。与固定收缩强度不同，Bayesian 权重由先验自由度和样本量共同决定；均值偏离先验中心所产生的附加散布也被保留，而没有被误当作噪声删除。

若 $\boldsymbol F$ 正定且 $\nu_0>n+1$，则 $\boldsymbol\Lambda_T$ 正定，从而式（22.29）即使在 $n\ge T$ 时仍为正定矩阵。这一性质直接修复样本协方差奇异造成的组合不可计算问题。与此同时，精度矩阵的后验均值为 $\mathbb E[\boldsymbol\Sigma^{-1}\mid\boldsymbol y]=(\nu_T-n-1)\boldsymbol\Lambda_T^{-1}$，一般并不等于 $\widehat{\boldsymbol\Sigma}_B^{-1}$。因而必须先明确损失函数：估计协方差本身、估计精度矩阵与最大化后验预测效用是三个不同决策，不能用一个插入估计替代全部答案。

风险模型还要求不同资产的风险口径一致。对收益作标准化后，可在相关矩阵上设置先验，再把波动率与相关性分层建模；对具有行业结构的资产，可让同一行业的相关系数共享层级先验。这样既保留横截面聚集现象，又避免每一对相关系数独立估计造成的不稳定。后验样本还能直接给出单个资产风险贡献、组合条件数与特征值的分布，使风险模型输出从单一矩阵扩展为带不确定性的风险陈述。

### 22.7.2 因子暴露的 Bayesian 收缩

因子暴露的极端估计往往来自短暂样本中的共线性，而非真实的结构性暴露。对第 $i$ 个资产，写成 $\boldsymbol y_i=\boldsymbol X\boldsymbol\beta_i+\boldsymbol\varepsilon_i$，其中 $\boldsymbol X$ 包含截距、市场因子与风格因子，$\boldsymbol\varepsilon_i\sim N_T(\boldsymbol0,\sigma_i^2\boldsymbol I)$。取 $\boldsymbol\beta_i\sim N_p(\boldsymbol b_0,\tau^2\boldsymbol\Omega)$，在 $\sigma_i^2$ 已知时，正则方程给出后验均值
$$\widehat{\boldsymbol\beta}_{i,B}=\left(\frac{\boldsymbol X^\top\boldsymbol X}{\sigma_i^2}+\frac{\boldsymbol\Omega^{-1}}{\tau^2}\right)^{-1}\left(\frac{\boldsymbol X^\top\boldsymbol y_i}{\sigma_i^2}+\frac{\boldsymbol\Omega^{-1}\boldsymbol b_0}{\tau^2}\right).\tag{22.30}$$
该式同时揭示三个来源的作用：设计矩阵决定数据信息量，$\tau$ 控制向先验中心的收缩幅度，$\boldsymbol\Omega$ 决定不同因子方向上的相对收缩。对高度共线的因子，样本信息矩阵在弱识别方向上接近奇异，而先验精度仍使后验保持有限方差。
当 $\sigma_i^2$ 未知时，可配以逆 Gamma 先验并使用后验条件抽样。更稳妥的做法是把 $\boldsymbol b_0$ 与 $\tau^2$ 提升为上层参数，使各资产的暴露围绕共同的横截面中心部分汇聚。资产观测期较短时，其估计更多借用全样本信息；观测期较长且信号稳定时，后验更靠近自身回归结果。这里应对 $\tau^2$ 采用具有足够尾部质量的先验，避免把真实的风格突变过度压回历史均值。

因子先验中心不应机械地取零。市场暴露可以围绕同类资产的平均水平设定，价值或动量暴露可以围绕持仓特征隐含的数值设定；若研究目的恰是检验某暴露是否消失，则零先验具有明确的经济含义。先验尺度必须通过先验预测检查校准：在观察数据之前生成收益与暴露，检查其是否产生不可能的信噪比、波动率或横截面离散度。后验收缩不是把估计变得平滑这一技术动作，而是把可辩护的经济信息写入模型。

### 22.7.3 风险模型与风险分解

Bayesian 风险模型的核心对象是未来收益分布，而不只是历史协方差。若采用因子结构 $\boldsymbol\Sigma=\boldsymbol B\boldsymbol\Sigma_f\boldsymbol B^\top+\boldsymbol D$，可对因子暴露、因子协方差和特异方差分别设先验，并从联合后验中抽取整个风险模型。每次抽样的 $\boldsymbol B^{(m)}$、$\boldsymbol\Sigma_f^{(m)}$ 与 $\boldsymbol D^{(m)}$ 给出一个风险实现，因而组合方差、因子风险贡献和特异风险贡献都可形成后验分布。与只报告估计标准误相比，这种表示能保留参数之间的非线性依赖。

因子风险模型与式（22.29）的无结构收缩可以互补。因子模型把主要横截面变动压缩到少数可解释方向，剩余协方差再向对角阵或行业块阵收缩，可以降低弱特征方向上的估计方差。若因子数量随样本增加，应为因子载荷与因子数设置能抑制虚假维度的先验；若波动率具有时变性，则应让当期状态驱动风险预测，而不是用全期后验均值抹平风险聚集。

风险分解还应与决策损失一致。以权重 $\boldsymbol w$ 持有的组合，其后验方差可写成 $\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w$；平方损失下用后验均值汇总，尾部资本约束则需要保留整个后验与预测分布。仅仅把最可能的协方差矩阵代入风险公式，会低估小概率但高损失的状态。对压力情景，可以把情景变量作为条件因子更新后验，再比较同一组合在不同情景下的预测损失，而不是分别拟合互不兼容的模型。

### 22.7.4 参数不确定性与后验预测组合

设未来收益为 $\boldsymbol y^{\ast}$，全部已观测数据记为 $\mathcal D$。后验预测分布通过积分消去参数：
$$p(\boldsymbol y^{\ast}\mid\mathcal D)=\int p(\boldsymbol y^{\ast}\mid\boldsymbol\theta)\pi(\boldsymbol\theta\mid\mathcal D)\,d\boldsymbol\theta.$$
这一步把估计风险转化为预测分布的额外离散程度。对正态—逆 Wishart 模型，条件正态与未来噪声相加后得到多元 Student 预测分布，其均值和协方差分别为
$$\boldsymbol m_T=\boldsymbol\mu_T,\qquad \boldsymbol V_T=\frac{\kappa_T+1}{\kappa_T(\nu_T-n-1)}\boldsymbol\Lambda_T,$$
其中 $\nu_T>n+1$。与把 $\boldsymbol\mu_T$ 和 $\widehat{\boldsymbol\Sigma}_B$ 直接插入正态模型相比，$\boldsymbol V_T$ 多出均值未知带来的因子 $(\kappa_T+1)/\kappa_T$，Student 尾部还保留了尺度不确定性的影响。
**定理 22.20（后验预测均值—方差组合）**

设后验预测收益具有有限均值 $\boldsymbol m$ 与正定协方差 $\boldsymbol V$，风险厌恶系数为 $\gamma>0$。在预算约束 $\boldsymbol1^\top\boldsymbol w=1$ 下，目标为 $\boldsymbol m^\top\boldsymbol w-\frac\gamma2\boldsymbol w^\top\boldsymbol V\boldsymbol w$ 的 Bayes 决策唯一存在，并满足
$$\boldsymbol w_B=\frac1\gamma\boldsymbol V^{-1}\boldsymbol m+\frac{1-\gamma^{-1}\boldsymbol1^\top\boldsymbol V^{-1}\boldsymbol m}{\boldsymbol1^\top\boldsymbol V^{-1}\boldsymbol1}\boldsymbol V^{-1}\boldsymbol1.\tag{22.31}$$

**证明**

由于 $\boldsymbol V$ 正定，目标函数关于 $\boldsymbol w$ 严格凹；预算超平面与目标函数的任一水平集的交有界，故最大值至多一个且必然存在。引入 Lagrange 乘子 $\lambda$，一阶条件为 $\boldsymbol m-\gamma\boldsymbol V\boldsymbol w+\lambda\boldsymbol1=\boldsymbol0$，于是
$$\boldsymbol w=\frac1\gamma\boldsymbol V^{-1}(\boldsymbol m+\lambda\boldsymbol1).$$
记 $A=\boldsymbol1^\top\boldsymbol V^{-1}\boldsymbol m$，$C=\boldsymbol1^\top\boldsymbol V^{-1}\boldsymbol1$。正定性给出 $C>0$，代入预算约束得到 $1=(A+\lambda C)/\gamma$，从而 $\lambda=(\gamma-A)/C$。再代回一阶条件即得式（22.31）。严格凹性排除其他驻点，因此该可行点是唯一的整体最优解。

□

定理中的协方差必须使用预测协方差，而不能默认使用历史协方差。若先验有效样本量很小，均值与尺度的不确定性会同时进入 $\boldsymbol V$，最优权重因而自动降低对高估计噪声资产的依赖。若还有做空、杠杆、换手或行业约束，可在同一后验预测目标上加入这些约束；此时解析解未必存在，但严格凹性与数值最优化的逻辑不变。对一般效用 $u$，Bayes 组合应最大化 $\mathbb E[u(\boldsymbol w^\top\boldsymbol y^{\ast})\mid\mathcal D]$，而不是先选择参数点估计再最大化条件期望。

### 22.7.5 后验预测检验与投资决策

后验预测不仅用于给出权重，还用于检查模型能否重现投资上关键的特征。从后验抽取参数，再生成复制样本 $\boldsymbol y^{\mathrm{rep}}$，可比较实际数据与复制数据中的偏度、极端损失、横截面离散度和波动聚集。若实际数据持续出现模型难以生成的厚尾或联合暴跌，就应修改收益分布、波动动态或相关结构，而非只增加抽样次数。检验统计量的选择应由后续损失驱动，因为拟合均值良好并不意味着尾部组合风险可靠。

预测检验需要区分样本内诊断与样本外决策评估。样本内复制用于暴露模型结构缺陷；严格的样本外评估则必须在每个时点只用当时可得的信息更新后验，再预测下一期。先验、因子、模型集合与调参规则若使用了未来数据，均会造成信息泄漏。对每个历史时点保存预测样本，便能统一计算预测对数得分、区间覆盖率、组合收益与风险调整损失，并使模型比较与真实决策时序一致。
**例 22.8**

某资产对市场因子的超额收益回归为 $r_t=\beta f_t+\varepsilon_t$，其中 $\varepsilon_t$ 独立同分布于 $N(0,0.0004)$。样本给出 $\boldsymbol x^\top\boldsymbol x/\sigma^2=10$ 与 $\boldsymbol x^\top\boldsymbol r/\sigma^2=14$。先验为 $\beta\sim N(0.8,0.2)$，下一期因子实现为 $f^{\ast}=0.02$。求暴露的后验均值与方差，并比较插入估计与后验预测对下一期收益不确定性的处理。

**解**

先验精度为 $1/0.2=5$。由式（22.30），后验精度为 $10+5=15$，故 $\operatorname{Var}(\beta\mid\mathcal D)=1/15$；后验均值为
$$\mathbb E[\beta\mid\mathcal D]=\frac{14+5\times0.8}{15}=1.2.$$
普通最小二乘估计为 $14/10=1.4$，后验均值把它向先验中心 $0.8$ 收缩，但并未机械地取二者的简单平均，而是按各自精度加权。

下一期收益满足 $r^{\ast}=0.02\beta+\varepsilon^{\ast}$。在 $\beta\mid\mathcal D$ 与 $\varepsilon^{\ast}$ 独立的条件下，后验预测均值和方差分别为
$$\mathbb E[r^{\ast}\mid\mathcal D]=0.02\times1.2=0.024,$$
$$\operatorname{Var}(r^{\ast}\mid\mathcal D)=0.02^2\times\frac1{15}+0.0004=0.00042667.$$
因此后验预测为标准差约为 $0.02066$ 的正态分布。若直接用 $\widehat\beta=1.4$ 插入，则点预测为 $0.028$，预测方差只有新噪声的 $0.0004$；这种做法既未对暴露作收缩，也遗漏了暴露估计的不确定性。两种处理给出的收益区间和风险约束可行集可能不同，差异正来自参数后验方差 $0.02^2/15$。

### 22.7.6 Bayesian 模型平均

因子集合、波动动态和收益分布通常都存在多个竞争设定。把模型记为 $\mathcal M_k$，其先验概率为 $\mathbb P(\mathcal M_k)$，边际似然为 $p(\mathcal D\mid\mathcal M_k)=\int p(\mathcal D\mid\boldsymbol\theta_k,\mathcal M_k)\pi(\boldsymbol\theta_k\mid\mathcal M_k)\,d\boldsymbol\theta_k$。Bayes 定理直接给出
$$\omega_k=\mathbb P(\mathcal M_k\mid\mathcal D)=\frac{p(\mathcal D\mid\mathcal M_k)\mathbb P(\mathcal M_k)}{\sum_jp(\mathcal D\mid\mathcal M_j)\mathbb P(\mathcal M_j)},\qquad p(\boldsymbol y^{\ast}\mid\mathcal D)=\sum_k\omega_kp(\boldsymbol y^{\ast}\mid\mathcal D,\mathcal M_k).\tag{22.32}$$
因此模型平均不是对若干点估计作主观加权，而是对模型内部的参数不确定性已经积分后的预测作混合。边际似然会自动惩罚不能解释数据的额外复杂度，但这种惩罚依赖参数先验；过 diffuse 的先验可能使边际似然失去稳定意义，故各模型的先验必须放在可比较的预测尺度上。
模型平均用于组合时，还应区分预测平均与决策平均。对同一损失函数，应先按式（22.32）合并预测分布，再求一个最优组合；分别求各模型最优组合后按 $\omega_k$ 加权，只有在目标与约束具有相应线性结构时才等价。不同模型的参数含义可能并不一致，直接平均参数或因子暴露通常缺乏定义。预测层面的平均则始终有明确概率含义，并能表达多个模型各自合理的非对称风险。

实际计算中，边际似然可由桥接抽样、热力学积分或具有诊断的嵌套近似获得。不同模型的后验抽样必须检查有效样本量与链间稳定性，否则模型权重会被数值误差主导。若模型空间过大，可用可复现的搜索策略形成候选集合，但必须保留选择规则并评估其对预测的影响。模型平均并不免除模型检验：若所有候选模型都不能生成实际风险特征，归一化权重只是在不充分模型集合内部重新分配质量。

### 22.7.7 研究流程与后续章节衔接

完整的量化 Bayesian 研究从决策问题开始。先规定收益口径、信息集、可交易约束与损失函数，再写出收益生成过程和参数先验；先验预测检查用于确认模型在接触样本前不会隐含不合理的收益尺度。模型拟合后，需要同时检查计算收敛、后验敏感性与复制数据特征，最后在逐期滚动的信息集上评价预测与决策。先验敏感性应报告对最终权重、风险与效用的影响，而不只列出参数后验变化。

与第20章和第21章的衔接体现在目标与输入的分离：既有的组合构造、约束处理和风险分析可以保留，本章把其中的确定参数替换为后验预测分布，并把估计误差纳入同一决策。若既有问题具有凸性，在固定预测样本或固定模型后验实现后仍可复用相应求解器；跨参数与跨模型积分则交由 Monte Carlo 或 MCMC 完成。由此不需要为每一个先验重新建立一套最优化理论。

与第23章的衔接则在于预测样本和模型权重可作为后续研究的标准输出。后续讨论更复杂的动态策略、非线性决策或计算实现时，可以直接以本章的后验预测样本为输入，并继续使用同一信息集和损失定义。无论后续模型如何扩展，都必须区分参数后验、未来收益预测与最终动作三层对象；把三层混为一谈，会重新引入本章已经消除的插入偏差。

## 本章小结

本章以损失函数为起点建立统计决策理论。风险函数评价决策规则在不同参数状态下的表现，Bayes 风险则对参数后验积分；在给定数据后最小化后验期望损失，便得到 Bayes 决策。平方损失、绝对损失与区间决策分别对应后验均值、中位数和最高后验密度区域，而可容许性、最小最大性与频率性质回答的是不同问题，不能互相替代。

共轭先验使指数族中的后验更新保持闭式，Jeffreys 先验则由 Fisher 信息提供参数化不变的构造。二者都服务于后验推断，而不是免除先验论证。对不能解析积分的模型，Metropolis–Hastings 与 Gibbs 抽样通过详细平衡保证目标分布不变；不可约性、非周期性与遍历性进一步支撑后验遍历平均。相关抽样的误差由有效样本量而非迭代总数衡量，收敛诊断只能发现失败信号。

在量化研究中，正态—逆 Wishart 更新产生正定的协方差收缩，层级因子回归使暴露按数据精度部分汇聚。后验预测积分把参数不确定性传递到未来收益，再与效用、预算和交易约束结合，形成真正的 Bayes 组合。模型平均在预测层面整合竞争设定，后验复制与逐期样本外检验则检验模型能否支持实际风险决策。贯穿全章的原则是：先验表达信息，后验更新状态，预测服务决策，计算与诊断必须服从这三者的概率结构。
## 习题

1. 设 $X_1,\dots,X_n$ 在给定 $\theta$ 时独立同分布于 $N(\theta,\sigma_0^2)$，其中 $\sigma_0^2$ 已知，先验为 $\theta\sim N(\mu_0,\tau_0^2)$。证明后验仍为正态分布，并把后验精度写成先验精度与样本精度之和，把后验均值写成精度加权平均。进一步求 $X_{n+1}$ 的后验预测分布。

2. 设 $K\mid\theta\sim\operatorname{Binomial}(n,\theta)$，先验为 $\theta\sim\operatorname{Beta}(a,b)$。观测到 $K=k$ 后，求 $\theta$ 的后验分布、后验均值与后验方差。若继续独立进行 $m$ 次试验，求未来成功次数 $K^{\ast}$ 的后验预测概率质量函数，并说明共轭更新与预测更新所积分的对象有何不同。

3. 设 $X_1,\dots,X_n$ 独立同分布于 $N(\mu,\sigma^2)$，其中 $\mu$ 已知，$\sigma^2$ 服从参数为 $a,b$ 的逆 Gamma 先验，其密度正比于 $(\sigma^2)^{-a-1}\exp(-b/\sigma^2)$。证明后验仍为逆 Gamma 分布，并完整确定两个后验参数。再求平方损失下 $\sigma^2$ 的 Bayes 估计及其存在条件。

4. 考虑单参数正则模型，Fisher 信息为 $I(\theta)$，Jeffreys 先验为 $\pi(\theta)\propto\sqrt{I(\theta)}$。令 $\eta=g(\theta)$，其中 $g$ 为光滑双射且 $g'(\theta)\ne0$。证明由变量变换得到的 $\eta$ 的密度与在新参数化下直接构造的 Jeffreys 先验一致，并说明该结论为何不同于“先验与参数化无关”这一表述。

5. 对 $\operatorname{Bernoulli}(\theta)$ 模型推导 Jeffreys 先验。观测 $n$ 次试验中有 $k$ 次成功后，写出后验分布、后验均值和后验众数，并分别讨论 $k=0$、$k=n$ 以及 $a=b=1$ 的均匀先验与 Jeffreys 先验在预测下一次成功概率时的差别。

6. 对一维参数 $\theta$ 的连续后验分布，分别考虑平方损失、绝对损失和线性非对称损失。证明三种损失下的 Bayes 决策依次为后验均值、后验中位数和某个后验分位数，并对非对称损失完整确定该分位水平。说明若后验中位数不唯一，绝对损失的最优决策集合应如何描述。
7. 在有限参数空间上，设先验对每个参数状态都赋予正概率，且决策规则 $\delta^{\pi}$ 是唯一的 Bayes 规则。证明 $\delta^{\pi}$ 可容许。进一步构造一个反例，说明去掉唯一性条件后，Bayes 规则未必可容许，并解释严格 Bayes 风险改善与逐参数风险改善之间的差别。

8. 对目标密度 $\pi$、提议密度 $q(\theta'\mid\theta)$ 与接受概率 $\alpha(\theta,\theta')=\min\{1,\pi(\theta')q(\theta\mid\theta')/[\pi(\theta)q(\theta'\mid\theta)]\}$，证明 Metropolis–Hastings 转移核关于 $\pi$ 满足详细平衡。证明中须分别处理比值为零、有限和接受概率取 $1$ 的情形，并说明拒绝概率为何不影响不同状态之间的等式。

9. 设 $p$ 维状态为 $\boldsymbol\theta=(\theta_i,\boldsymbol\theta_{-i})$，单点 Gibbs 核在保持 $\boldsymbol\theta_{-i}$ 不变时从全条件分布抽取新的 $\theta_i$。证明该核关于联合后验满足详细平衡。再说明确定性依次更新全部坐标的完整扫描为何只可直接断言保持目标分布不变，而不能由单点详细平衡直接推出完整扫描的详细平衡。

10. 设观测在给定 $\mu,\tau$ 时独立同分布于 $N(\mu,\tau^{-1})$，先验为 $\mu\mid\tau\sim N(\mu_0,(\kappa_0\tau)^{-1})$ 与 $\tau\sim\operatorname{Gamma}(a_0,b_0)$，其中第二个参数为速率。证明新观测的后验预测分布为 Student 分布，完整确定其位置、自由度和尺度参数，并分别给出预测均值与预测方差的存在条件。

11. 在式（22.29）中，设 $\boldsymbol F$ 正定、$\widetilde S$ 半正定且 $0<\lambda_T<1$。证明 $\widehat{\boldsymbol\Sigma}_B$ 正定，并用 $\boldsymbol F$ 与 $\widetilde S$ 的最小、最大特征值给出其特征值上下界。固定先验自由度而令 $T\to\infty$ 时，证明 $\lambda_T\to0$，并解释该极限为何不要求 $\widetilde S$ 的每个元素都一致收敛。

12. 对两资产协方差模型，取 $\boldsymbol\mu_0=\bar{\boldsymbol y}$、$\nu_0=6$、$\boldsymbol\Lambda_0=3\boldsymbol I$、$T=10$，并设 $(T-1)S=\operatorname{diag}(18,9)$。求后验自由度、后验尺度矩阵、后验协方差均值和式（22.29）中的收缩权重。比较该估计与样本协方差的条件数，并指出计算中每个自由度条件的用途。
13. 某因子回归满足 $\boldsymbol X^\top\boldsymbol X/\sigma^2=20$ 与 $\boldsymbol X^\top\boldsymbol y/\sigma^2=30$，标量暴露的先验为 $\beta\sim N(0.5,0.25)$。求后验均值、后验方差与后验 $95\%$ 等尾区间。若保持先验中心不变而把先验标准差扩大为原来的两倍，重新计算后验，并解释数据精度和先验精度如何决定收缩方向与幅度。

14. 在预算约束 $\boldsymbol1^\top\boldsymbol w=1$ 下，从 Lagrange 条件出发完整证明定理 22.20。进一步设插入法使用协方差 $\boldsymbol V_0$，后验预测协方差为 $\boldsymbol V_1=\boldsymbol V_0+\boldsymbol U$，其中 $\boldsymbol U$ 半正定。比较两问题的目标曲率，并证明当 $\boldsymbol m=\boldsymbol0$ 时，两组合的最小方差解一致，而一般 $\boldsymbol m\ne\boldsymbol0$ 时不必一致。

15. 两个模型具有相同先验概率，其对数边际似然分别为 $-101.2$ 与 $-100.0$。求后验模型权重。若两模型的下一期收益预测均为正态，均值分别为 $0.01$、$0.02$，方差分别为 $0.0004$、$0.0009$，求模型平均预测的均值、方差与偏度，并说明混合预测为何一般不再是正态分布。

16. 某后验泛函的 MCMC 样本量为 $M=20000$，渐近方差膨胀因子为 $\kappa_h=25$，平稳方差为 $\sigma_h^2=4$。求有效样本量与后验均值的蒙特卡洛标准误。若只把迭代数扩大四倍而链的自相关结构不变，标准误如何变化？说明为何有效样本量充足仍不能替代多链收敛诊断。

17. 某收益模型在样本内能拟合均值与方差，却系统性低估联合极端损失。设计一个后验预测检验，分别给出衡量单资产厚尾和跨资产共同下跌的检验统计量，并说明从后验抽样、生成复制数据到作出模型修改判断的完整流程。进一步说明该检验与严格样本外预测评价的区别。
18. 某资产下一期超额收益的后验预测分布为 $N(0.01,0.0004)$。持仓 $a$ 不受卖空约束，初始持仓为 $a_0=0.2$，决策者最大化后验预测均值—方差目标 $\mathbb E[aR\mid\mathcal D]-\frac{\gamma}{2}\operatorname{Var}(aR\mid\mathcal D)-c(a-a_0)^2$，其中 $\gamma=10$、$c=0.01$。求 Bayes 持仓及最优目标值。若插入法误把预测方差取为 $0.0001$ 而保持其他量不变，重新计算持仓与在真实后验预测目标下的目标值，并量化忽略参数不确定性的损失。再加入 $a\ge0$ 与 $\mathbb P(aR<-0.02\mid\mathcal D)\le0.05$ 两个约束，求可行持仓上界并检验前述两个持仓是否仍可行。

19. 将低、中、高三种波动状态记为 $1,2,3$，目标分布为 $\pi=(1/2,1/3,1/6)$。Metropolis–Hastings 算法在每一状态下均以概率 $1/2$ 提议转移到另外两个状态之一。计算所有接受概率和完整的 $3\times3$ 转移矩阵，用数值等式逐对验证不同状态之间的详细平衡，并验证 $\pi P=\pi$。若链从状态 $1$ 出发，求一步后的状态分布及 $h(1)=0,h(2)=1,h(3)=3$ 的一步期望；说明这些有限状态计算能验证什么，以及为何不能据此替代一般后验抽样中的收敛诊断。
20. 三个收益模型的先验概率分别为 $0.5,0.3,0.2$，对数边际似然分别为 $-201.0,-202.0,-205.0$。采用减去最大对数边际似然的稳定化方法计算后验模型权重。三个模型的下一期收益预测依次为 $N(0.010,0.0004)$、$N(0.014,0.0009)$ 与 $N(-0.006,0.0025)$，求模型平均预测的均值、方差和偏度。再写出混合预测 $5\%$ 分位数所满足的一维求根方程并作数值求解，比较该分位数与仅使用最高后验权重模型所得的分位数。

21. 下一期收益率 $R$ 的后验预测为自由度 $\nu=5$、位置 $0.004$、尺度 $0.015$ 的 Student 分布，组合损失为 $L=-R$。对连续损失定义 $\operatorname{VaR}_\alpha(L)$ 为 $\alpha$ 分位数，$\operatorname{ES}_\alpha(L)=\mathbb E[L\mid L\ge\operatorname{VaR}_\alpha(L)]$。已知标准 Student 分布在 $99\%$ 分位处的分位数为 $3.365$、密度为 $0.0109$，计算 $\operatorname{VaR}_{0.99}(L)$ 与 $\operatorname{ES}_{0.99}(L)$。再构造与 $L$ 均值、方差均相同的正态近似，利用标准正态 $99\%$ 分位数 $2.326$ 及该点密度 $0.0267$ 重算两项风险度量。若头寸 $kR$ 的风险预算为 $\operatorname{ES}_{0.99}\le0.06$，分别求两种预测下允许的最大正头寸倍数 $k$，并解释尾部差异对杠杆限制的影响。
22. 两个竞争模型的后验权重为 $0.6$ 与 $0.4$，其下一期收益预测分别为 $N(0.012,0.0004)$ 与 $N(-0.004,0.0016)$。投资者选择持仓 $a\in[0,1]$，目标为 $a m-\frac{\gamma}{2}a^2v-0.01(a-0.3)^2$，其中 $m,v$ 是所用预测的均值与方差，$\gamma=8$。分别基于模型平均预测和仅保留高权重模型的预测，计算最优持仓与最优目标值，并比较二者的差异。对模型平均预测加入尾部约束 $\mathbb P(aR\le-0.03\mid\mathcal D)\le0.01$，写出以正态分布函数表示的求根方程，数值求出最大可行持仓及相应的受约束 Bayes 持仓。最后，若两个模型对历史最大回撤统计量的单边后验预测 $p$ 值分别为 $0.01$ 与 $0.40$，结合上述决策结果判断各模型的尾部适用性，并说明为何模型平均不能替代对失效收益结构的修改。
