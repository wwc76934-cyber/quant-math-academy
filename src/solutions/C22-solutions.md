# 第22章习题参考答案与解析

## 1. 
**证明**
样本似然函数为
$$p(\boldsymbol x\mid\theta)=\prod_{i=1}^n\frac{1}{\sqrt{2\pi\sigma_0^2}}\exp\left(-\frac{(x_i-\theta)^2}{2\sigma_0^2}\right)=(2\pi\sigma_0^2)^{-n/2}\exp\left(-\frac{\sum_{i=1}^n(x_i-\bar x)^2+n(\bar x-\theta)^2}{2\sigma_0^2}\right)$$
先验分布为 $\theta\sim N(\mu_0,\tau_0^2)$，其概率密度为
$$\pi(\theta)=\frac{1}{\sqrt{2\pi\tau_0^2}}\exp\left(-\frac{(\theta-\mu_0)^2}{2\tau_0^2}\right)$$
由 Bayes 定理，后验密度满足
$$\pi(\theta\mid\boldsymbol x)\propto\pi(\theta)p(\boldsymbol x\mid\theta)\propto\exp\left(-\frac{1}{2}\left[\frac{(\theta-\mu_0)^2}{\tau_0^2}+\frac{n(\theta-\bar x)^2}{\sigma_0^2}\right]\right)$$
将指数项中关于 $\theta$ 的二次型展开并配方：
$$\frac{(\theta-\mu_0)^2}{\tau_0^2}+\frac{n(\theta-\bar x)^2}{\sigma_0^2}=\theta^2\left(\frac{1}{\tau_0^2}+\frac{n}{\sigma_0^2}\right)-2\theta\left(\frac{\mu_0}{\tau_0^2}+\frac{n\bar x}{\sigma_0^2}\right)+\left(\frac{\mu_0^2}{\tau_0^2}+\frac{n\bar x^2}{\sigma_0^2}\right)$$
令先验精度为 $\kappa_0=1/\tau_0^2$，样本数据精度为 $\kappa_{\text{data}}=n/\sigma_0^2$。定义后验精度为二者之和：
$$\kappa_n=\kappa_0+\kappa_{\text{data}}=\frac{1}{\tau_0^2}+\frac{n}{\sigma_0^2}$$
令后验方差 $\tau_n^2=1/\kappa_n$。定义后验均值 $\mu_n$ 为精度加权平均：
$$\mu_n=\frac{\kappa_0\mu_0+\kappa_{\text{data}}\bar x}{\kappa_0+\kappa_{\text{data}}}=\frac{\frac{\mu_0}{\tau_0^2}+\frac{n\bar x}{\sigma_0^2}}{\frac{1}{\tau_0^2}+\frac{n}{\sigma_0^2}}$$
则指数项可以写为
$$\kappa_n\theta^2-2\kappa_n\mu_n\theta+C=\frac{(\theta-\mu_n)^2}{\tau_n^2}+C'$$
其中 $C,C'$ 为与 $\theta$ 无关的常数。因此，后验分布仍为正态分布，即 $\theta\mid\boldsymbol x\sim N(\mu_n,\tau_n^2)$。

对于未来观测值 $X_{n+1}$，在给定 $\theta$ 时有 $X_{n+1}=\theta+\varepsilon_{n+1}$，其中 $\varepsilon_{n+1}\sim N(0,\sigma_0^2)$ 且与历史样本及 $\theta$ 在给定参数下条件独立。由于 $\theta\mid\boldsymbol x\sim N(\mu_n,\tau_n^2)$，新观测值 $X_{n+1}$ 是两个相互独立的正态随机变量之和：
$$X_{n+1}\mid\boldsymbol x\sim N(\mu_n,\sigma_0^2+\tau_n^2)$$
其后验预测均值为 $\mu_n$，后验预测方差为观测噪声方差 $\sigma_0^2$ 与参数不确定性方差 $\tau_n^2$ 之和。

□

本题常见错误做法包括：在计算后验预测分布时，仅代入点估计 $\mu_n$ 而忽略参数本身的后验波动，误认为预测方差仅为 $\sigma_0^2$；或者在精度加权中混淆样本总精度 $n/\sigma_0^2$ 与单观测精度 $1/\sigma_0^2$。

## 2. 
似然函数为二项分布：
$$p(k\mid\theta)=\binom{n}{k}\theta^k(1-\theta)^{n-k}$$
先验分布为 $\theta\sim\operatorname{Beta}(a,b)$，其密度为
$$\pi(\theta)=\frac{1}{\mathrm{B}(a,b)}\theta^{a-1}(1-\theta)^{b-1},\quad 0<\theta<1$$
由 Bayes 公式，后验核为
$$\pi(\theta\mid k)\propto p(k\mid\theta)\pi(\theta)\propto\theta^{(a+k)-1}(1-\theta)^{(b+n-k)-1}$$
此即参数为 $a'=a+k$ 和 $b'=b+n-k$ 的 Beta 分布核，故后验分布为 $\theta\mid k\sim\operatorname{Beta}(a+k,b+n-k)$。

利用 Beta 分布矩公式，后验均值为
$$\mathbb E[\theta\mid k]=\frac{a+k}{a+b+n}$$
后验方差为
$$\operatorname{Var}(\theta\mid k)=\frac{(a+k)(b+n-k)}{(a+b+n)^2(a+b+n+1)}$$

对于未来独立进行的 $m$ 次试验，成功次数记为 $K^\ast$。在给定 $\theta$ 时，$K^\ast\mid\theta\sim\operatorname{Binomial}(m,\theta)$。后验预测概率质量函数通过对参数后验分布积分得到：
$$\mathbb P(K^\ast=k^\ast\mid k)=\int_0^1\mathbb P(K^\ast=k^\ast\mid\theta)\pi(\theta\mid k)\mathrm{d}\theta=\binom{m}{k^\ast}\frac{1}{\mathrm{B}(a+k,b+n-k)}\int_0^1\theta^{k^\ast+a+k-1}(1-\theta)^{m-k^\ast+b+n-k-1}\mathrm{d}\theta$$
利用 Beta 积分定义，直接得到 Beta-Binomial 预测分布：
$$\mathbb P(K^\ast=k^\ast\mid k)=\binom{m}{k^\ast}\frac{\mathrm{B}(a+k+k^\ast,b+n-k+m-k^\ast)}{\mathrm{B}(a+k,b+n-k)},\quad k^\ast=0,1,\dots,m$$

共轭更新与预测更新所积分的对象具有本质不同：共轭更新求归一化常数（边际似然）时，积分对象是先验密度 $\pi(\theta)$ 与当前样本似然的乘积，其目标是对参数先验赋权以得到可观测数据的无条件边际概率；而预测更新所积分的对象是未来观测的条件生成分布与参数的后验密度 $\pi(\theta\mid k)$，其实质是将更新后的参数信念在全参数空间上边缘化，从而将参数不确定性内生吸纳进未来可观测量的预测分布中。

本题常见错误做法是直接使用后验均值 $\hat\theta=\mathbb E[\theta\mid k]$ 作为真值代入二项分布，得到 $\operatorname{Binomial}(m,\hat\theta)$，这种即插即用法抹杀了参数估计方差对预测区间展宽的必要贡献。

## 3. 
**证明**
设 $X_1,\dots,X_n$ 独立同分布于 $N(\mu,\sigma^2)$ 且 $\mu$ 已知。记样本离差平方和为 $S_\mu=\sum_{i=1}^n(X_i-\mu)^2$。观测样本似然函数为
$$p(\boldsymbol x\mid\sigma^2)=\prod_{i=1}^n\frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x_i-\mu)^2}{2\sigma^2}\right)=(2\pi)^{-n/2}(\sigma^2)^{-n/2}\exp\left(-\frac{S_\mu}{2\sigma^2}\right)$$
逆 Gamma 先验密度为
$$\pi(\sigma^2)=\frac{b^a}{\Gamma(a)}(\sigma^2)^{-a-1}\exp\left(-\frac{b}{\sigma^2}\right)$$
由 Bayes 公式，后验核为
$$\pi(\sigma^2\mid\boldsymbol x)\propto\pi(\sigma^2)p(\boldsymbol x\mid\sigma^2)\propto(\sigma^2)^{-\left(a+\frac{n}{2}\right)-1}\exp\left(-\frac{b+\frac{1}{2}S_\mu}{\sigma^2}\right)$$
该形式严格符合逆 Gamma 分布核。令后验形状参数与尺度参数分别为
$$a_n=a+\frac{n}{2},\quad b_n=b+\frac{1}{2}\sum_{i=1}^n(X_i-\mu)^2$$
故后验分布仍为逆 Gamma 分布，记作 $\sigma^2\mid\boldsymbol x\sim\operatorname{Inv-Gamma}(a_n,b_n)$。

在平方损失 $L(\sigma^2,d)=(d-\sigma^2)^2$ 下，Bayes 估计量为后验均值 $\mathbb E[\sigma^2\mid\boldsymbol x]$。
设 $Y\sim\operatorname{Inv-Gamma}(a_n,b_n)$，则 $1/Y\sim\operatorname{Gamma}(a_n,b_n)$。利用积分计算其一阶矩：
$$\mathbb E[\sigma^2\mid\boldsymbol x]=\int_0^\infty y\frac{b_n^{a_n}}{\Gamma(a_n)}y^{-a_n-1}\exp\left(-\frac{b_n}{y}\right)\mathrm{d}y=\frac{b_n^{a_n}}{\Gamma(a_n)}\int_0^\infty y^{-(a_n-1)-1}\exp\left(-\frac{b_n}{y}\right)\mathrm{d}y$$
当且仅当指数满足 $a_n-1>0$ 即 $a_n>1$ 时，上述积分收敛并等于 $\Gamma(a_n-1)/b_n^{a_n-1}$。由 Gamma 函数性质 $\Gamma(a_n)=(a_n-1)\Gamma(a_n-1)$，得
$$\mathbb E[\sigma^2\mid\boldsymbol x]=\frac{b_n}{a_n-1}=\frac{b+\frac{1}{2}\sum_{i=1}^n(X_i-\mu)^2}{a+\frac{n}{2}-1}$$
因此，平方损失下的 Bayes 估计量存在且有限的充分必要条件为 $a+n/2>1$。

□

本题常见错误做法包括：由于习惯样本方差除以 $n-1$，在已知均值 $\mu$ 时仍错误地使用样本均值 $\bar X$ 并扣除一个自由度；或者忽视逆 Gamma 分布均值存在对形状参数的限制条件 $a_n>1$，在 $a+n/2\le 1$ 时依然机械写出后验均值表达式。

## 4. 
**证明**
在单参数正则统计模型中，对数似然记为 $\ell(\theta;\boldsymbol x)$。关于参数 $\theta$ 的 Fisher 信息量定义为
$$I_\theta(\theta)=\mathbb E\left[\left(\frac{\partial\ell(\theta;\boldsymbol x)}{\partial\theta}\right)^2\right]$$
Jeffreys 先验正比于 Fisher 信息的平方根：$\pi_\theta(\theta)\propto\sqrt{I_\theta(\theta)}$。

现令 $\eta=g(\theta)$，其中 $g$ 为充分光滑的双射且处处满足 $g'(\theta)\ne 0$。由反函数存在定理，存在逆映射 $\theta=g^{-1}(\eta)$。若将 $\theta$ 视为随机变量并由常规概率密度变换法则诱导 $\eta$ 的先验密度，则有
$$\pi_\eta^{\text{trans}}(\eta)=\pi_\theta(g^{-1}(\eta))\left|\frac{\mathrm{d}\theta}{\mathrm{d}\eta}\right|\propto\sqrt{I_\theta(g^{-1}(\eta))}\left|\frac{\mathrm{d}\theta}{\mathrm{d}\eta}\right|$$

另一方面，在新参数 $\eta$ 下重新表示模型，对数似然写作 $\tilde\ell(\eta;\boldsymbol x)=\ell(g^{-1}(\eta);\boldsymbol x)$。由一元微分链式法则，对数似然对 $\eta$ 的导数为
$$\frac{\partial\tilde\ell(\eta;\boldsymbol x)}{\partial\eta}=\frac{\partial\ell(\theta;\boldsymbol x)}{\partial\theta}\frac{\mathrm{d}\theta}{\mathrm{d}\eta}$$
因此，直接在新参数化 $\eta$ 下计算的 Fisher 信息量为
$$I_\eta(\eta)=\mathbb E\left[\left(\frac{\partial\tilde\ell(\eta;\boldsymbol x)}{\partial\eta}\right)^2\right]=\mathbb E\left[\left(\frac{\partial\ell(\theta;\boldsymbol x)}{\partial\theta}\right)^2\right]\left(\frac{\mathrm{d}\theta}{\mathrm{d}\eta}\right)^2=I_\theta(g^{-1}(\eta))\left(\frac{\mathrm{d}\theta}{\mathrm{d}\eta}\right)^2$$
在新参数化下直接构造的 Jeffreys 先验为
$$\pi_\eta^{\text{Jeffreys}}(\eta)\propto\sqrt{I_\eta(\eta)}=\sqrt{I_\theta(g^{-1}(\eta))}\left|\frac{\mathrm{d}\theta}{\mathrm{d}\eta}\right|$$
对比两式可知，由变量变换法得到的先验密度 $\pi_\eta^{\text{trans}}(\eta)$ 与直接在 $\eta$ 空间构造的 Jeffreys 先验 $\pi_\eta^{\text{Jeffreys}}(\eta)$ 完全一致。

□

该结论在几何与测度意义上成立，但严格不同于日常语境中“先验密度函数形式与参数化无关”这一含混表述。若按后者理解，常被错误误导为均匀先验的形式不变性（即在 $\theta$ 上平庸赋均匀分布，则在 $\eta=\theta^2$ 上也为均匀分布，此即古典 Laplace 不充分理由原则的自相矛盾）。Jeffreys 先验的本质不变量是参数流形上的微分几何体积元，它保证了在不同坐标系下计算的概率测度是协变一致的，其密度函数本身必须依照雅可比行列式发生对应伸缩，而非函数解析表达式保持不变。

本题常见错误做法是误以为不变量是指 $\pi_\eta(\eta)=\pi_\theta(\eta)$；或者在推导复合函数 Fisher 信息时漏掉导数平方项，未严格应用链式法则。

## 5. 
设 $X\sim\operatorname{Bernoulli}(\theta)$，其概率质量函数为 $p(x\mid\theta)=\theta^x(1-\theta)^{1-x}$，对数似然为
$$\log p(x\mid\theta)=x\log\theta+(1-x)\log(1-\theta)$$
其二阶导数为
$$\frac{\partial^2\log p(x\mid\theta)}{\partial\theta^2}=-\frac{x}{\theta^2}-\frac{1-x}{(1-\theta)^2}$$
因为 $\mathbb E[X]=\theta$，所以单观测 Fisher 信息为
$$I(\theta)=-\mathbb E\left[\frac{\partial^2\log p(X\mid\theta)}{\partial\theta^2}\right]=\frac{\theta}{\theta^2}+\frac{1-\theta}{(1-\theta)^2}=\frac{1}{\theta(1-\theta)}$$
Jeffreys 先验密度正比于信息量的平方根：
$$\pi(\theta)\propto\sqrt{I(\theta)}=\theta^{-1/2}(1-\theta)^{-1/2}\propto\operatorname{Beta}(1/2,1/2)$$

观测 $n$ 次独立试验出现 $k$ 次成功后，结合二项似然，后验分布为
$$\theta\mid k\sim\operatorname{Beta}\left(k+\frac{1}{2},n-k+\frac{1}{2}\right)$$
由 Beta 分布性质，后验均值为
$$\mathbb E[\theta\mid k]=\frac{k+\frac{1}{2}}{n+1}$$
对于后验众数，当 $k>0$ 且 $n-k>0$ 时，两个参数均严格大于 $1/2$。当 $1\le k\le n-1$ 时，若 $k=1/2$ 且 $n=1$ 此时两参数均为 $1$ 产生平坦密度，一般 $n\ge 2$ 时若两参数均大于 $1$，众数为
$$\theta_{\text{mode}}=\frac{\left(k+\frac{1}{2}\right)-1}{\left(k+\frac{1}{2}\right)+\left(n-k+\frac{1}{2}\right)-2}=\frac{k-\frac{1}{2}}{n-1}$$
当 $k=0$ 时，后验参数为 $(1/2,n+1/2)$，密度在 $\theta\to 0^+$ 处发散到无穷，故后验众数为 $0$；同理当 $k=n$ 时，后验参数为 $(n+1/2,1/2)$，密度在 $\theta\to 1^-$ 处发散到无穷，后验众数为 $1$。

在预测下一次试验成功概率时，预测概率即为后验均值。若采用参数为 $a=b=1$ 的均匀先验（Laplace 演色律），后验预测概率为 $(k+1)/(n+2)$；而 Jeffreys 先验对应的后验预测概率为 $(k+1/2)/(n+1)$。
当 $k=0$ 时，均匀先验给出的下一次成功概率为 $1/(n+2)$，Jeffreys 先验给出的概率为 $1/(2n+2)$；当 $k=n$ 时，均匀先验给出的失败概率为 $1/(n+2)$，Jeffreys 先验给出的失败概率为 $1/(2n+2)$。这表明 Jeffreys 先验等价于在样本中仅加入了 $1$ 个等权重的伪观测（$1/2$ 次成功与 $1/2$ 次失败），而均匀先验加入了 $2$ 个伪观测；因此在极端边界处，Jeffreys 先验对观测数据的收缩惩罚更轻，对零成功或全成功现象给出的边界概率修正幅度小于 Laplace 平滑。

本题常见错误做法是直接套用 Beta 分布标准内部众数公式 $(\alpha-1)/(\alpha+\beta-2)$ 而在 $k=0$ 或 $k=n$ 时算出负数或大于 $1$ 的荒谬结果，忽略了参数小于 $1$ 时众数落在边界处。

## 6. 
**证明**
设一维参数 $\theta$ 的后验概率密度为 $\pi(\theta\mid\boldsymbol x)$，累积分布函数为 $F(\theta\mid\boldsymbol x)$。

第一，平方损失 $L(\theta,d)=(d-\theta)^2$。Bayes 风险为
$$R(d)=\mathbb E[(d-\theta)^2\mid\boldsymbol x]=d^2-2d\,\mathbb E[\theta\mid\boldsymbol x]+\mathbb E[\theta^2\mid\boldsymbol x]$$
关于决策 $d$ 求一阶导数并令其为零：
$$\frac{\mathrm{d}R(d)}{\mathrm{d}d}=2d-2\,\mathbb E[\theta\mid\boldsymbol x]=0\implies d^\ast=\mathbb E[\theta\mid\boldsymbol x]$$
二阶导数恒为 $2>0$，故最优决策严格为后验均值。

第二，绝对损失 $L(\theta,d)=|d-\theta|$。Bayes 风险写为
$$R(d)=\int_{-\infty}^d (d-\theta)\pi(\theta\mid\boldsymbol x)\mathrm{d}\theta+\int_d^\infty (\theta-d)\pi(\theta\mid\boldsymbol x)\mathrm{d}\theta$$
利用 Leibniz 积分求导法则：
$$\frac{\mathrm{d}R(d)}{\mathrm{d}d}=\int_{-\infty}^d \pi(\theta\mid\boldsymbol x)\mathrm{d}\theta-\int_d^\infty \pi(\theta\mid\boldsymbol x)\mathrm{d}\theta=F(d\mid\boldsymbol x)-(1-F(d\mid\boldsymbol x))=2F(d\mid\boldsymbol x)-1$$
令导数为零可得 $F(d^\ast\mid\boldsymbol x)=1/2$，即最优决策为后验中位数。

第三，线性非对称损失。设高估单位损失为 $c_1>0$，低估单位损失为 $c_2>0$，损失函数定义为
$$L(\theta,d)=c_1(d-\theta)\mathbb I_{\{d\ge\theta\}}+c_2(\theta-d)\mathbb I_{\{d<\theta\}}$$
此时后验风险为
$$R(d)=c_1\int_{-\infty}^d (d-\theta)\pi(\theta\mid\boldsymbol x)\mathrm{d}\theta+c_2\int_d^\infty (\theta-d)\pi(\theta\mid\boldsymbol x)\mathrm{d}\theta$$
对其求导：
$$\frac{\mathrm{d}R(d)}{\mathrm{d}d}=c_1 F(d\mid\boldsymbol x)-c_2(1-F(d\mid\boldsymbol x))=(c_1+c_2)F(d\mid\boldsymbol x)-c_2$$
令导数为零，解得最优分位水平为
$$F(d^\ast\mid\boldsymbol x)=\frac{c_2}{c_1+c_2}$$
即最优决策为后验分布的 $c_2/(c_1+c_2)$ 分位数。

若后验中位数不唯一，说明累积分布函数存在平坦台阶，即存在区间 $[m_1,m_2]$ 使得对任意 $\theta\in(m_1,m_2)$ 均有 $\pi(\theta\mid\boldsymbol x)=0$ 且 $F(\theta\mid\boldsymbol x)=1/2$。在此区间上，风险函数的一阶导数处处为零，因而风险函数在该区间上取常数最小值。因此，绝对损失下的最优决策集合由单点推广为整个闭区间 $[m_1,m_2]$，区间内每一个决策点均达到完全相同的最小 Bayes 风险。

□

本题常见错误做法包括：在推导绝对损失与非对称损失时，忽视积分端点含有变量 $d$ 而未正确应用变上限积分求导公式；或者把非对称损失的分位水平分子误写为 $c_1$ 而颠倒了高估与低估的惩罚方向。
## 7. 
**证明**
设有限参数空间为 $\Theta=\{\theta_1,\dots,\theta_K\}$，先验分布赋予各状态正概率：$\pi(\theta_k)>0$ 对所有 $k=1,\dots,K$ 均成立。
决策规则 $\delta$ 的频繁学派风险函数为 $R(\theta_k,\delta)$，对应的 Bayes 风险为
$$r(\pi,\delta)=\sum_{k=1}^K\pi(\theta_k)R(\theta_k,\delta)$$
设 $\delta^\pi$ 是唯一的 Bayes 规则，即对任意不同于 $\delta^\pi$ 的决策规则 $\delta$，均有 $r(\pi,\delta)>r(\pi,\delta^\pi)$。

反证法：假设 $\delta^\pi$ 不可容许。则存在另一决策规则 $\delta'$ 优于 $\delta^\pi$，即满足：
1. 对所有 $k=1,\dots,K$，均有 $R(\theta_k,\delta')\le R(\theta_k,\delta^\pi)$；
2. 至少存在某一个状态 $\theta_{k_0}\in\Theta$，使得严格不等式成立：
$$R(\theta_{k_0},\delta')<R(\theta_{k_0},\delta^\pi)$$
此时考察 $\delta'$ 的 Bayes 风险：
$$r(\pi,\delta')=\sum_{k=1}^K\pi(\theta_k)R(\theta_k,\delta')=\pi(\theta_{k_0})R(\theta_{k_0},\delta')+\sum_{k\ne k_0}\pi(\theta_k)R(\theta_k,\delta')$$
由于 $\pi(\theta_{k_0})>0$ 且其余各项系数 $\pi(\theta_k)>0$，代入上述两式可得严格不等式：
$$r(\pi,\delta')<\pi(\theta_{k_0})R(\theta_{k_0},\delta^\pi)+\sum_{k\ne k_0}\pi(\theta_k)R(\theta_k,\delta^\pi)=r(\pi,\delta^\pi)$$
这与 $\delta^\pi$ 最小化 Bayes 风险的定义产生直接矛盾。因此假设不成立，$\delta^\pi$ 必为可容许规则。

□

反例构造：若去掉唯一性条件，Bayes 规则未必可容许。
考虑参数空间 $\Theta=\{\theta_1,\theta_2\}$，决策空间 $\mathcal A=\{a_1,a_2\}$。设无样本观测，损失函数矩阵定义为：$L(\theta_1,a_1)=0, L(\theta_1,a_2)=0$；$L(\theta_2,a_1)=0, L(\theta_2,a_2)=1$。
若先验分布取为退化先验 $\pi(\theta_1)=1, \pi(\theta_2)=0$（即不满足处处正概率，或在具有零概率样本点时），则决策 $a_1$ 与 $a_2$ 的 Bayes 风险均为
$$r(\pi,a_1)=1\times 0+0\times 0=0,\quad r(\pi,a_2)=1\times 0+0\times 1=0$$
因此 $a_2$ 也是 Bayes 规则，但并非唯一（$a_1$ 同样是 Bayes 规则）。然而，比较其频繁学派风险，$R(\theta_1,a_1)=R(\theta_1,a_2)=0$，但在状态 $\theta_2$ 下有 $R(\theta_2,a_1)=0<1=R(\theta_2,a_2)$。故 $a_2$ 被 $a_1$ 严格一致优越，$a_2$ 是不可容许的。

这深刻揭示了严格 Bayes 风险改善与逐参数风险改善之间的本质区别：Bayes 风险是频繁学派风险关于先验测度的加权平均积分。逐参数风险改善要求在参数空间的每一个点上风险均不增加且至少在一点严格下降；而严格 Bayes 风险改善要求加权总风险严格减小。当先验在某些区域赋予零测度、或者观测样本在某子集上的边际发生概率为零时，在该零测度区域改变决策不会引发 Bayes 风险的任何变动，但却可能在该特定参数点上造成频繁学派风险的实质性恶化，从而导致非唯一的 Bayes 规则沦为不可容许规则。

本题常见错误做法是忽视反证法中 $\pi(\theta_{k_0})>0$ 的关键作用，误以为只要是 Bayes 规则就天然具备可容许性，混淆了先验支撑集与可容许性定理的前提条件。

## 8. 
**证明**
设目标概率密度为 $\pi(\theta)$，提议密度为 $q(\theta'\mid\theta)$，接受概率为
$$\alpha(\theta,\theta')=\min\left\{1,\frac{\pi(\theta')q(\theta\mid\theta')}{\pi(\theta)q(\theta'\mid\theta)}\right\}$$
对任意两不同状态 $\theta\ne\theta'$，从 $\theta$ 到 $\theta'$ 的转移核密度为 $T(\theta,\theta')=q(\theta'\mid\theta)\alpha(\theta,\theta')$。
详细平衡条件即证明：对任意 $\theta\ne\theta'$，恒有
$$\pi(\theta)T(\theta,\theta')=\pi(\theta')T(\theta',\theta)$$

分别讨论三种情形：
第一种情形：比值为零。即 $\pi(\theta')q(\theta\mid\theta')=0$ 或 $\pi(\theta)q(\theta'\mid\theta)=0$。
若 $\pi(\theta')q(\theta\mid\theta')=0$ 且 $\pi(\theta)q(\theta'\mid\theta)>0$，则接受率 $\alpha(\theta,\theta')=0$，左端 $\pi(\theta)T(\theta,\theta')=\pi(\theta)q(\theta'\mid\theta)\times 0=0$；右端因 $\pi(\theta')q(\theta\mid\theta')=0$，由 $0\le\alpha(\theta',\theta)\le 1$ 知 $\pi(\theta')T(\theta',\theta)=\pi(\theta')q(\theta\mid\theta')\alpha(\theta',\theta)=0$。两端严格相等且均为 $0$。若两项同时为 $0$，等式化为 $0=0$，同样成立。

第二种情形：比值有限且大于等于 $1$。即 $\pi(\theta')q(\theta\mid\theta')\ge\pi(\theta)q(\theta'\mid\theta)>0$。
此时从 $\theta$ 到 $\theta'$ 的接受概率达到上限：
$$\alpha(\theta,\theta')=1$$
而反向提议的比值为正向的倒数，故反向接受概率为
$$\alpha(\theta',\theta)=\frac{\pi(\theta)q(\theta'\mid\theta)}{\pi(\theta')q(\theta\mid\theta')}$$
计算两端通量：
左端为
$$\pi(\theta)T(\theta,\theta')=\pi(\theta)q(\theta'\mid\theta)\times 1=\pi(\theta)q(\theta'\mid\theta)$$
右端为
$$\pi(\theta')T(\theta',\theta)=\pi(\theta')q(\theta\mid\theta')\times\frac{\pi(\theta)q(\theta'\mid\theta)}{\pi(\theta')q(\theta\mid\theta')}=\pi(\theta)q(\theta'\mid\theta)$$
两端严格相等。

第三种情形：比值有限且严格小于 $1$。即 $0<\pi(\theta')q(\theta\mid\theta')<\pi(\theta)q(\theta'\mid\theta)$。
由对称性，此时正向接受概率为
$$\alpha(\theta,\theta')=\frac{\pi(\theta')q(\theta\mid\theta')}{\pi(\theta)q(\theta'\mid\theta)}$$
而反向接受概率为 $\alpha(\theta',\theta)=1$。
左端为
$$\pi(\theta)T(\theta,\theta')=\pi(\theta)q(\theta'\mid\theta)\times\frac{\pi(\theta')q(\theta\mid\theta')}{\pi(\theta)q(\theta'\mid\theta)}=\pi(\theta')q(\theta\mid\theta')$$
右端为
$$\pi(\theta')T(\theta',\theta)=\pi(\theta')q(\theta\mid\theta')\times 1=\pi(\theta')q(\theta\mid\theta')$$
两端同样严格相等。

拒绝概率不影响不同状态之间的等式：因为当提议被拒绝时，马尔可夫链停留在当前原状态 $\theta$。这对应于转移核在对角线处的自环测度 $r(\theta)=1-\int_{\theta'\ne\theta} q(\theta'\mid\theta)\alpha(\theta,\theta')\mathrm{d}\theta'$，它仅贡献于转移算子中的恒等测度部分 $r(\theta)\delta_\theta(\mathrm{d}\theta')$。对于任意两个不同的状态 $\theta\ne\theta'$，转移通量纯粹由发生状态跃迁的非对角部分提供，拒绝发生时在 $\theta\ne\theta'$ 之间不产生任何流动。

□

本题常见错误做法是遗漏比值为零的边界退化讨论，未证明分母趋于零或测度为零时的良定义性；或者误将拒绝概率纳入非对角转移密度中。

## 9. 
**证明**
设状态向量为 $\boldsymbol\theta=(\theta_i,\boldsymbol\theta_{-i})\in\mathbb R^p$。单点 Gibbs 转移核 $K_i(\boldsymbol\theta,\boldsymbol\theta')$ 保持其余分量 $\boldsymbol\theta_{-i}$ 不变，仅从全条件分布 $\pi(\theta_i'\mid\boldsymbol\theta_{-i})$ 中抽取第 $i$ 个分量的新值 $\theta_i'$。
若 $\boldsymbol\theta_{-i}'\ne\boldsymbol\theta_{-i}$，则转移核密度为 $0$，双向通量均为 $0$；
若 $\boldsymbol\theta_{-i}'=\boldsymbol\theta_{-i}$，由条件概率乘法法则，联合后验密度可因式分解为
$$\pi(\boldsymbol\theta)=\pi(\theta_i,\boldsymbol\theta_{-i})=\pi(\boldsymbol\theta_{-i})\pi(\theta_i\mid\boldsymbol\theta_{-i})$$
转移核密度为 $K_i(\boldsymbol\theta,\boldsymbol\theta')=\pi(\theta_i'\mid\boldsymbol\theta_{-i})$。
计算从 $\boldsymbol\theta$ 到 $\boldsymbol\theta'$ 的正向通量：
$$\pi(\boldsymbol\theta)K_i(\boldsymbol\theta,\boldsymbol\theta')=\pi(\boldsymbol\theta_{-i})\pi(\theta_i\mid\boldsymbol\theta_{-i})\pi(\theta_i'\mid\boldsymbol\theta_{-i})$$
反向转移核密度为从 $\boldsymbol\theta'$ 更新第 $i$ 维到 $\theta_i$：$K_i(\boldsymbol\theta',\boldsymbol\theta)=\pi(\theta_i\mid\boldsymbol\theta_{-i}')$。因为 $\boldsymbol\theta_{-i}'=\boldsymbol\theta_{-i}$，反向通量为
$$\pi(\boldsymbol\theta')K_i(\boldsymbol\theta',\boldsymbol\theta)=\pi(\theta_i',\boldsymbol\theta_{-i})\pi(\theta_i\mid\boldsymbol\theta_{-i})=\pi(\boldsymbol\theta_{-i})\pi(\theta_i'\mid\boldsymbol\theta_{-i})\pi(\theta_i\mid\boldsymbol\theta_{-i})$$
对比两式可知，对任意 $\boldsymbol\theta,\boldsymbol\theta'$ 恒有 $\pi(\boldsymbol\theta)K_i(\boldsymbol\theta,\boldsymbol\theta')=\pi(\boldsymbol\theta')K_i(\boldsymbol\theta',\boldsymbol\theta)$，即单点 Gibbs 核关于联合后验严格满足详细平衡。

□

对于确定性依次更新全部坐标的完整扫描 Gibbs 采样器，其单步复合转移核为各单点核的算子乘积：
$$K=K_1 K_2 \cdots K_p$$
由于每个单点核 $K_i$ 满足关于 $\pi$ 的详细平衡，详细平衡条件对积分求和直接推出该核保持目标分布不变（平稳性），即 $\pi K_i=\pi$。因此对复合核有
$$\pi K=\pi(K_1 K_2 \cdots K_p)=(\pi K_1)K_2\cdots K_p=\pi K_2\cdots K_p=\cdots=\pi$$
这直接断言了完整扫描保持目标分布不变。

然而，不能由单点详细平衡直接推出完整扫描的详细平衡。在泛函分析中，两个自伴算子（满足详细平衡即可逆算子）的复合算子保持自伴的充分必要条件是这两个算子相互对易（即乘积可交换）。在统计推断中，单点 Gibbs 转移核之间通常不对易：先沿第 $1$ 维更新再沿第 $2$ 维更新所形成的二步转移，与先沿第 $2$ 维再沿第 $1$ 维更新并不恒等，即 $K_1 K_2\ne K_2 K_1$。因此，复合核的反向算子满足
$$K^\ast=(K_1 K_2\cdots K_p)^\ast=K_p^\ast\cdots K_2^\ast K_1^\ast=K_p\cdots K_2 K_1\ne K$$
这表明确定性单向扫描的 Gibbs 采样器是一条非可逆（不可逆）马尔可夫链，它只保持平稳分布不变，却不满足详细平衡条件。若需满足详细平衡，必须改用随机扫描（Random Scan）或对称回环扫描（如 $1\to p\to 1$）。

本题常见错误做法是误以为“可逆转移核的复合仍然可逆”，混淆了平稳分布保持性（$\pi K=\pi$）与详细平衡时间可逆性（$\pi(x)K(x,y)=\pi(y)K(y,x)$）的充要条件差异。
## 10. 
**证明**
在给定精度 $\tau$ 与均值 $\mu$ 下，观测样本 $X_1,\dots,X_n\overset{\text{iid}}{\sim} N(\mu,\tau^{-1})$。共轭先验设定为 $\mu\mid\tau\sim N(\mu_0,(\kappa_0\tau)^{-1})$ 与 $\tau\sim\operatorname{Gamma}(a_0,b_0)$。
后验参数的标准更新公式为
$$\kappa_n=\kappa_0+n,\quad \mu_n=\frac{\kappa_0\mu_0+n\bar x}{\kappa_n},\quad a_n=a_0+\frac{n}{2}$$
$$b_n=b_0+\frac{1}{2}\sum_{i=1}^n(x_i-\bar x)^2+\frac{\kappa_0 n(\bar x-\mu_0)^2}{2\kappa_n}$$
后验联合分布为 Normal-Gamma 分布，即 $\mu\mid\tau,\boldsymbol x\sim N(\mu_n,(\kappa_n\tau)^{-1})$ 且 $\tau\mid\boldsymbol x\sim\operatorname{Gamma}(a_n,b_n)$。

考察未来新观测值 $X_{n+1}=\mu+\varepsilon_{n+1}$，其中 $\varepsilon_{n+1}\mid\tau\sim N(0,\tau^{-1})$ 且条件独立于 $\mu$。
首先在给定 $\tau$ 条件下对 $\mu$ 进行边缘化积分：新观测值在给定 $\tau$ 时的条件分布仍为两个独立正态变量之和：
$$\mathbb E[X_{n+1}\mid\tau,\boldsymbol x]=\mathbb E[\mu\mid\tau,\boldsymbol x]=\mu_n$$
$$\operatorname{Var}(X_{n+1}\mid\tau,\boldsymbol x)=\operatorname{Var}(\mu\mid\tau,\boldsymbol x)+\operatorname{Var}(\varepsilon_{n+1}\mid\tau)=\frac{1}{\kappa_n\tau}+\frac{1}{\tau}=\frac{\kappa_n+1}{\kappa_n\tau}$$
故 $X_{n+1}\mid\tau,\boldsymbol x\sim N\left(\mu_n,\tau^{-1}\frac{\kappa_n+1}{\kappa_n}\right)$。

令标准化残差为
$$Z=\frac{X_{n+1}-\mu_n}{\sqrt{\frac{\kappa_n+1}{\kappa_n}}}$$
则 $Z\mid\tau\sim N(0,\tau^{-1})$。对精度参数 $\tau\mid\boldsymbol x\sim\operatorname{Gamma}(a_n,b_n)$ 进行边缘积分，其概率密度为
$$p(z\mid\boldsymbol x)=\int_0^\infty \frac{\tau^{1/2}}{\sqrt{2\pi}}\exp\left(-\frac{\tau z^2}{2}\right)\frac{b_n^{a_n}}{\Gamma(a_n)}\tau^{a_n-1}\exp(-b_n\tau)\mathrm{d}\tau=\frac{b_n^{a_n}}{\sqrt{2\pi}\Gamma(a_n)}\int_0^\infty \tau^{\left(a_n+\frac{1}{2}\right)-1}\exp\left(-\tau\left(b_n+\frac{z^2}{2}\right)\right)\mathrm{d}\tau$$
利用 Gamma 积分公式，得
$$p(z\mid\boldsymbol x)=\frac{b_n^{a_n}}{\sqrt{2\pi}\Gamma(a_n)}\frac{\Gamma\left(a_n+\frac{1}{2}\right)}{\left(b_n+\frac{z^2}{2}\right)^{a_n+\frac{1}{2}}}=\frac{\Gamma\left(\frac{2a_n+1}{2}\right)}{\sqrt{2\pi a_n}\Gamma\left(\frac{2a_n}{2}\right)}\left(\frac{a_n}{b_n}\right)^{1/2}\left(1+\frac{z^2}{2b_n}\right)^{-\frac{2a_n+1}{2}}$$
令自由度 $\nu=2a_n=2a_0+n$，尺度参数的平方为
$$s_n^2=\frac{b_n}{a_n}\frac{\kappa_n+1}{\kappa_n}$$
还原回原始变量 $X_{n+1}=\mu_n+s_n T$，其中 $T\sim t(\nu)$ 服从标准 Student 分布。因此后验预测分布为三参数 Student 分布：
$$X_{n+1}\mid\boldsymbol x\sim t\left(\nu=2a_0+n,\,\mu_n,\,\text{scale}^2=\frac{b_n}{a_n}\frac{\kappa_n+1}{\kappa_n}\right)$$
位置参数为 $\mu_n$，自由度为 $2a_0+n$，尺度参数为 $\sqrt{\frac{b_n}{a_n}\frac{\kappa_n+1}{\kappa_n}}$。

Student 分布矩的存在性严格由自由度决定：
预测均值存在当且仅当自由度 $\nu>1$，即 $2a_0+n>1$。在满足此条件时，预测均值为 $\mathbb E[X_{n+1}\mid\boldsymbol x]=\mu_n$。
预测方差存在当且仅当自由度 $\nu>2$，即 $2a_0+n>2$。在满足此条件时，利用 Student 分布方差公式，预测方差为
$$\operatorname{Var}(X_{n+1}\mid\boldsymbol x)=\frac{\nu}{\nu-2}s_n^2=\frac{a_n}{a_n-1}\frac{b_n}{a_n}\frac{\kappa_n+1}{\kappa_n}=\frac{b_n}{a_n-1}\left(1+\frac{1}{\kappa_n}\right)$$

□

本题常见错误做法是忽略预测方差中包含的两项不确定性，漏乘因子 $(\kappa_n+1)/\kappa_n$；或者混淆位置尺度 Student 分布与标准 Student 分布的方差计算，直接将尺度参数误当作方差。

## 11. 
**证明**
在式（22.29）中，Bayes 协方差估计量为
$$\widehat{\boldsymbol\Sigma}_B=\lambda_T\boldsymbol F+(1-\lambda_T)\widetilde{\boldsymbol S}$$
其中 $\boldsymbol F$ 为正定对称矩阵，$\widetilde{\boldsymbol S}$ 为半正定对称矩阵，且收缩权重满足 $0<\lambda_T<1$。

对任意非零向量 $\boldsymbol z\in\mathbb R^p\setminus\{\boldsymbol 0\}$，考察二次型：
$$\boldsymbol z^\top\widehat{\boldsymbol\Sigma}_B\boldsymbol z=\lambda_T(\boldsymbol z^\top\boldsymbol F\boldsymbol z)+(1-\lambda_T)(\boldsymbol z^\top\widetilde{\boldsymbol S}\boldsymbol z)$$
因为 $\boldsymbol F$ 正定且 $\lambda_T>0$，恒有 $\boldsymbol z^\top\boldsymbol F\boldsymbol z>0$，从而 $\lambda_T(\boldsymbol z^\top\boldsymbol F\boldsymbol z)>0$；
因为 $\widetilde{\boldsymbol S}$ 半正定且 $1-\lambda_T>0$，恒有 $\boldsymbol z^\top\widetilde{\boldsymbol S}\boldsymbol z\ge 0$，从而 $(1-\lambda_T)(\boldsymbol z^\top\widetilde{\boldsymbol S}\boldsymbol z)\ge 0$。
两项相加得到严格不等式：
$$\boldsymbol z^\top\widehat{\boldsymbol\Sigma}_B\boldsymbol z>0$$
由正定矩阵的定义，$\widehat{\boldsymbol\Sigma}_B$ 严格正定。

利用 Rayleigh 商与 Weyl 特征值单调性定理，设矩阵 $\boldsymbol A$ 的特征值按升序排列为 $\rho_1(\boldsymbol A)\le\cdots\le \rho_p(\boldsymbol A)$。
对最小特征值：
$$\rho_{\min}(\widehat{\boldsymbol\Sigma}_B)=\min_{\|\boldsymbol z\|=1}\boldsymbol z^\top\widehat{\boldsymbol\Sigma}_B\boldsymbol z\ge \lambda_T\min_{\|\boldsymbol z\|=1}\boldsymbol z^\top\boldsymbol F\boldsymbol z+(1-\lambda_T)\min_{\|\boldsymbol z\|=1}\boldsymbol z^\top\widetilde{\boldsymbol S}\boldsymbol z=\lambda_T\rho_{\min}(\boldsymbol F)+(1-\lambda_T)\rho_{\min}(\widetilde{\boldsymbol S})$$
由于 $\widetilde{\boldsymbol S}$ 半正定，$\rho_{\min}(\widetilde{\boldsymbol S})\ge 0$，故特征值下界为 $\lambda_T\rho_{\min}(\boldsymbol F)>0$。
同理对最大特征值：
$$\rho_{\max}(\widehat{\boldsymbol\Sigma}_B)=\max_{\|\boldsymbol z\|=1}\boldsymbol z^\top\widehat{\boldsymbol\Sigma}_B\boldsymbol z\le \lambda_T\max_{\|\boldsymbol z\|=1}\boldsymbol z^\top\boldsymbol F\boldsymbol z+(1-\lambda_T)\max_{\|\boldsymbol z\|=1}\boldsymbol z^\top\widetilde{\boldsymbol S}\boldsymbol z=\lambda_T\rho_{\max}(\boldsymbol F)+(1-\lambda_T)\rho_{\max}(\widetilde{\boldsymbol S})$$
因此，$\widehat{\boldsymbol\Sigma}_B$ 的全体特征值均落在闭区间 $[\lambda_T\rho_{\min}(\boldsymbol F),\,\lambda_T\rho_{\max}(\boldsymbol F)+(1-\lambda_T)\rho_{\max}(\widetilde{\boldsymbol S})]$ 内。

在共轭逆 Wishart 模型中，收缩权重具有代数形式 $\lambda_T=\frac{\nu_0}{\nu_0+T}$（或 $\frac{\nu_0-p-1}{\nu_0+T-p-1}$）。当固定先验自由度 $\nu_0$ 并令样本量 $T\to\infty$ 时，分母以 $O(T)$ 阶线性发散，分子为有限正定常数，故收缩权重以 $1/T$ 的阶趋于零：
$$\lim_{T\to\infty}\lambda_T=\lim_{T\to\infty}\frac{\nu_0}{\nu_0+T}=0$$

该极限成立纯粹依赖于样本量增长导致数据信息相对于有限先验信息处于压倒性优势，属于先验权重权重的代数性质。它完全不依赖于样本协方差矩阵 $\widetilde{\boldsymbol S}$ 各元素向总体协方差的一致收敛性（例如在大维随机矩阵极限 $p/T\to c>0$ 或金融非平稳厚尾噪声下，$\widetilde{\boldsymbol S}$ 的单个元素可能产生持续漂移甚至不一致）。无论 $\widetilde{\boldsymbol S}$ 是否收敛，Bayes 更新机制均在先验与数据之间按相对有效样本量自动调节权重，确保在 $T\to\infty$ 时先验影响完全消退。

□

本题常见错误做法是在证明正定时仅验证对角线元素大于零，混淆了正定性与主对角元素为正的关系；或者将特征值下界错误写为零，忽视了正定矩阵 $\boldsymbol F$ 提供的严格正底界。

## 12. 
给定资产数 $p=2$，先验参数 $\boldsymbol\mu_0=\bar{\boldsymbol y}$、$\nu_0=6$、$\boldsymbol\Lambda_0=3\boldsymbol I_2$、样本量 $T=10$。数据离差阵为 $(T-1)S=\operatorname{diag}(18,9)$。
由于先验均值与样本均值完全重合（$\boldsymbol\mu_0=\bar{\boldsymbol y}$），均值差异修正项恒为零向量外积：
$$T\boldsymbol\mu_0\boldsymbol\mu_0^\top+\sum_{t=1}^T \boldsymbol y_t\boldsymbol y_t^\top-(\nu_0+T)\boldsymbol\mu_n\boldsymbol\mu_n^\top=(T-1)S+\boldsymbol 0=\operatorname{diag}(18,9)$$
后验自由度为
$$\nu_n=\nu_0+T=6+10=16$$
后验尺度矩阵为
$$\boldsymbol\Lambda_n=\boldsymbol\Lambda_0+(T-1)S=3\boldsymbol I_2+\operatorname{diag}(18,9)=\operatorname{diag}(3+18,\,3+9)=\operatorname{diag}(21,12)$$
对于逆 Wishart 分布 $W^{-1}(\boldsymbol\Lambda_n,\nu_n)$，后验协方差均值的解析计算公式为
$$\mathbb E[\boldsymbol\Sigma\mid\boldsymbol Y]=\frac{\boldsymbol\Lambda_n}{\nu_n-p-1}=\frac{1}{16-2-1}\operatorname{diag}(21,12)=\frac{1}{13}\operatorname{diag}(21,12)=\operatorname{diag}\left(\frac{21}{13},\frac{12}{13}\right)$$
在式（22.29）的凸组合表示中，若按先验协方差均值与无偏样本协方差均值的后验加权分解，先验尺度均值为 $\boldsymbol F=\boldsymbol\Lambda_0/(\nu_0-p-1)=3\boldsymbol I_2/3=\boldsymbol I_2$；样本协方差为 $S=(T-1)S/(T-1)=\operatorname{diag}(18/9,9/9)=\operatorname{diag}(2,1)$。
此时后验均值满足
$$\mathbb E[\boldsymbol\Sigma\mid\boldsymbol Y]=\frac{\nu_0-p-1}{\nu_n-p-1}\boldsymbol F+\frac{T-1}{\nu_n-p-1}S=\frac{3}{13}\boldsymbol I_2+\frac{9}{13}\operatorname{diag}(2,1)=\operatorname{diag}\left(\frac{21}{13},\frac{12}{13}\right)$$
因此收缩权重为 $\lambda_T=\frac{\nu_0-p-1}{\nu_n-p-1}=\frac{3}{13}\approx 0.2308$（若按名义自由度比值为 $\nu_0/(\nu_0+T)=6/16=0.375$）。

条件数定义为最大特征值与最小特征值之比：
对于样本协方差 $S=\operatorname{diag}(2,1)$，特征值为 $2$ 与 $1$，其条件数为
$$\kappa(S)=\frac{2}{1}=2.0$$
对于 Bayes 估计量 $\widehat{\boldsymbol\Sigma}_B=\operatorname{diag}(21/13,12/13)$，特征值为 $21/13$ 与 $12/13$，其条件数为
$$\kappa(\widehat{\boldsymbol\Sigma}_B)=\frac{21/13}{12/13}=\frac{21}{12}=\frac{7}{4}=1.75$$
可见 $\kappa(\widehat{\boldsymbol\Sigma}_B)=1.75<2.0=\kappa(S)$，Bayes 收缩将各向异性的样本特征值向球形先验（条件数为 $1$）拉拢，显著改善了矩阵的病态性。

计算中各自由度条件的用途如下：
1. $\nu_0>p-1=1$：保证先验逆 Wishart 分布具有良定义的正常概率密度核；
2. $\nu_0>p+1=3$（此处 $\nu_0=6>3$）：保证先验一阶矩（期望）存在且有限；
3. $\nu_n>p+1=3$（此处 $\nu_n=16>3$）：保证后验一阶矩存在，从而后验协方差期望的分母 $\nu_n-p-1=13>0$ 有效；
4. 若进一步要求二阶矩（后验方差）存在，则需满足更高阶条件 $\nu_n>p+3=5$。

本题常见错误做法是计算逆 Wishart 均值时分母误用 $\nu_n$ 或 $\nu_n-p$，忘记减去 $p+1$；或者在计算收缩权重时混淆了除数中的自由度修正项。
## 13. 
已知因子暴露模型的信息矩阵为 $\boldsymbol X^\top\boldsymbol X/\sigma^2=20$，数据投影量为 $\boldsymbol X^\top\boldsymbol y/\sigma^2=30$。
OLS 估计量为 $\hat\beta=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y=30/20=1.5$。数据提供的数据精度为
$$\kappa_{\text{data}}=\frac{\boldsymbol X^\top\boldsymbol X}{\sigma^2}=20$$
标量暴露的先验分布为 $\beta\sim N(\mu_0,\tau_0^2)=N(0.5,0.25)$，故先验均值为 $\mu_0=0.5$，先验方差为 $\tau_0^2=0.25$，先验精度为
$$\kappa_0=\frac{1}{\tau_0^2}=\frac{1}{0.25}=4$$
由正态共轭更新法则，后验精度为二者之和：
$$\kappa_n=\kappa_0+\kappa_{\text{data}}=4+20=24$$
后验方差为后验精度的倒数：
$$\tau_n^2=\frac{1}{\kappa_n}=\frac{1}{24}\approx 0.04167$$
后验标准差为 $\tau_n=1/\sqrt{24}\approx 0.20412$。
后验均值为精度加权平均：
$$\mu_n=\frac{\kappa_0\mu_0+\kappa_{\text{data}}\hat\beta}{\kappa_n}=\frac{4\times 0.5+20\times 1.5}{24}=\frac{2+30}{24}=\frac{32}{24}=\frac{4}{3}\approx 1.3333$$
标准正态分布的双侧 $95\%$ 分位数临界值为 $z_{0.975}\approx 1.960$。因此后验 $95\%$ 等尾可信区间为
$$\mu_n\pm 1.960\tau_n=\frac{4}{3}\pm 1.960\times 0.20412=1.3333\pm 0.4001=[0.9332,\,1.7334]$$

若保持先验中心 $\mu_0=0.5$ 不变，将先验标准差扩大为原来的两倍，即 $\tau_0'=2\times 0.5=1.0$。
此时先验方差变为 $\tau_0'^2=1.0$，先验精度下降为
$$\kappa_0'=\frac{1}{1.0}=1$$
新的后验精度与后验方差分别为
$$\kappa_n'=1+20=21,\quad \tau_n'^2=\frac{1}{21}\approx 0.04762$$
新的后验标准差为 $\tau_n'=1/\sqrt{21}\approx 0.21822$。
新的后验均值为
$$\mu_n'=\frac{1\times 0.5+20\times 1.5}{21}=\frac{0.5+30}{21}=\frac{30.5}{21}=\frac{61}{42}\approx 1.4524$$
对应的后验 $95\%$ 等尾区间更新为
$$\mu_n'\pm 1.960\tau_n'=1.4524\pm 1.960\times 0.21822=1.4524\pm 0.4277=[1.0247,\,1.8801]$$

数据精度与先验精度通过信噪比权重决定收缩机制：
收缩方向始终指向先验中心 $\mu_0$。后验均值可改写为向先验的收缩形式：
$$\mu_n=\hat\beta-\frac{\kappa_0}{\kappa_0+\kappa_{\text{data}}}(\hat\beta-\mu_0)$$
收缩幅度严格由先验精度占比 $\lambda=\kappa_0/(\kappa_0+\kappa_{\text{data}})$ 决定。在第一种情形下，先验精度占比为 $4/24=16.67\%$，将 OLS 估计值 $1.5$ 向先验中心 $0.5$ 显著拉低至 $1.3333$；当先验标准差扩大一倍时，先验精度缩水为原来的 $1/4$，先验权重骤降为 $1/21\approx 4.76\%$，收缩效应大幅削弱，后验均值向样本无偏估计 $1.5$ 靠拢至 $1.4524$。同时，后验方差从 $1/24$ 增至 $1/21$，区间宽度相应展宽。

本题常见错误做法是扩大先验标准差时误将先验方差当成 $2$ 倍而非 $4$ 倍（忽视平方关系）；或者在区间估计时混淆频数置信区间与后验等尾可信区间的概率解释。

## 14. 
**证明**
在预算约束 $\boldsymbol 1^\top\boldsymbol w=1$ 下，均值—方差效用最大化问题等价于极小化风险惩罚与收益之差：
$$\min_{\boldsymbol w}\frac{\gamma}{2}\boldsymbol w^\top\boldsymbol V\boldsymbol w-\boldsymbol w^\top\boldsymbol m\quad\text{s.t. }\boldsymbol 1^\top\boldsymbol w=1$$
引入 Lagrange 乘子 $\lambda$，构造 Lagrange 函数：
$$\mathcal L(\boldsymbol w,\lambda)=\frac{\gamma}{2}\boldsymbol w^\top\boldsymbol V\boldsymbol w-\boldsymbol w^\top\boldsymbol m-\lambda(\boldsymbol 1^\top\boldsymbol w-1)$$
目标函数为严格凸二次型，最优解满足一阶必要与充分条件：
$$\nabla_{\boldsymbol w}\mathcal L=\gamma\boldsymbol V\boldsymbol w-\boldsymbol m-\lambda\boldsymbol 1=\boldsymbol 0$$
两边左乘正定协方差的逆矩阵 $\boldsymbol V^{-1}$：
$$\boldsymbol w=\frac{1}{\gamma}\boldsymbol V^{-1}\boldsymbol m+\frac{\lambda}{\gamma}\boldsymbol V^{-1}\boldsymbol 1$$
将上式代入等式约束 $\boldsymbol 1^\top\boldsymbol w=1$：
$$1=\boldsymbol 1^\top\boldsymbol w=\frac{1}{\gamma}\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol m+\frac{\lambda}{\gamma}\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol 1$$
解出标量乘子项：
$$\frac{\lambda}{\gamma}=\frac{1-\frac{1}{\gamma}\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol m}{\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol 1}$$
将其回代到权重表达式中，并令全局最小方差组合为 $\boldsymbol w_{\min}=\frac{\boldsymbol V^{-1}\boldsymbol 1}{\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol 1}$，整理得
$$\boldsymbol w^\ast=\boldsymbol w_{\min}+\frac{1}{\gamma}\left[\boldsymbol V^{-1}\boldsymbol m-\frac{\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol m}{\boldsymbol 1^\top\boldsymbol V^{-1}\boldsymbol 1}\boldsymbol V^{-1}\boldsymbol 1\right]=\boldsymbol w_{\min}+\frac{1}{\gamma}\left(\boldsymbol I-\boldsymbol w_{\min}\boldsymbol 1^\top\right)\boldsymbol V^{-1}\boldsymbol m$$
定义斜投影算子 $\boldsymbol Q_{\boldsymbol V}=\boldsymbol I-\boldsymbol w_{\min}\boldsymbol 1^\top$，即完整证明了定理 22.20 的两基金分离解析解。

□

比较目标曲率：
Lagrange 函数关于权重向量 $\boldsymbol w$ 的 Hessian 矩阵为 $\nabla_{\boldsymbol w}^2\mathcal L=\gamma\boldsymbol V$。
插入法采用样本协方差 $\boldsymbol V_0$，其曲率为 $\gamma\boldsymbol V_0$；Bayes 后验预测协方差为 $\boldsymbol V_1=\boldsymbol V_0+\boldsymbol U$。因为 $\boldsymbol U$ 半正定，对任意非零向量 $\boldsymbol z$，有 $\boldsymbol z^\top(\gamma\boldsymbol V_1)\boldsymbol z=\boldsymbol z^\top(\gamma\boldsymbol V_0)\boldsymbol z+\gamma\boldsymbol z^\top\boldsymbol U\boldsymbol z\ge\boldsymbol z^\top(\gamma\boldsymbol V_0)\boldsymbol z$。
因此，后验预测协方差下的目标函数曲率系统性高于插入法，反映了 Bayes 决策者将参数估计不确定性内生转化为对投资组合方差的额外惩罚，使得目标函数对偏离最优权重表现出更陡峭的效用惩罚。

当预期收益无差异，即 $\boldsymbol m=\boldsymbol 0$ 时，主动配置成分 $\frac{1}{\gamma}\boldsymbol Q_{\boldsymbol V}\boldsymbol V^{-1}\boldsymbol m=\boldsymbol 0$。最优持仓完全退化为最小方差组合 $\boldsymbol w^\ast=\boldsymbol w_{\min}$。
在标准多元正态共轭后验中，由于均值不确定性引起的协方差膨胀满足正比关系 $\boldsymbol U=\frac{1}{T}\boldsymbol V_0$，即 $\boldsymbol V_1=(1+1/T)\boldsymbol V_0$。此时逆矩阵为 $\boldsymbol V_1^{-1}=\frac{1}{1+1/T}\boldsymbol V_0^{-1}$，代入最小方差公式中，标量倍数在分子与分母中精确抵消：
$$\boldsymbol w_{\min}(\boldsymbol V_1)=\frac{\left(1+\frac{1}{T}\right)^{-1}\boldsymbol V_0^{-1}\boldsymbol 1}{\boldsymbol 1^\top\left[\left(1+\frac{1}{T}\right)^{-1}\boldsymbol V_0^{-1}\right]\boldsymbol 1}=\frac{\boldsymbol V_0^{-1}\boldsymbol 1}{\boldsymbol 1^\top\boldsymbol V_0^{-1}\boldsymbol 1}=\boldsymbol w_{\min}(\boldsymbol V_0)$$
故两组合的最小方差解严格一致。
然而，当一般 $\boldsymbol m\ne\boldsymbol 0$ 时，即使在标量膨胀情形下，主动投资项中的乘子为 $\boldsymbol V_1^{-1}\boldsymbol m=\frac{1}{1+1/T}\boldsymbol V_0^{-1}\boldsymbol m$，因其分子含有线性收益项无法在比值中被分母抵消，导致 Bayes 持仓的主动配置比例被收缩惩罚因子 $(1+1/T)^{-1}$ 严格压缩；在更一般的非各向同性 $\boldsymbol U$ 结构下，正规化特征方向改变，两者的解更不可能保持一致。

本题常见错误做法是忽略 Lagrange 乘子的代数约束回代推导，跳步写出解向量；或者误以为协方差矩阵加上半正定阵后，最小方差组合在任何形式的 $\boldsymbol U$ 下都保持不变。

## 15. 
两个模型先验概率相等：$p(M_1)=p(M_2)=0.5$。
对数边际似然为 $\log p(\boldsymbol y\mid M_1)=-101.2$，$\log p(\boldsymbol y\mid M_2)=-100.0$。
对数 Bayes 因子为
$$\log B_{21}=\log p(\boldsymbol y\mid M_2)-\log p(\boldsymbol y\mid M_1)=-100.0-(-101.2)=1.2$$
后验几率为 $B_{21}=\exp(1.2)\approx 3.320117$。后验模型权重为
$$w_2=\frac{\exp(1.2)}{1+\exp(1.2)}=\frac{3.320117}{4.320117}\approx 0.768524\approx 0.7685$$
$$w_1=1-w_2\approx 0.231476\approx 0.2315$$

两模型预测为 $M_1: N(\mu_1=0.01,\sigma_1^2=0.0004)$ 与 $M_2: N(\mu_2=0.02,\sigma_2^2=0.0009)$。
模型平均预测的均值为
$$\mu_{\text{BMA}}=w_1\mu_1+w_2\mu_2=0.2315\times 0.01+0.7685\times 0.02=0.002315+0.015370=0.017685\approx 0.01769$$
由全方差公式，预测方差分解为模型内方差与模型间方差之和：
$$\sigma_{\text{BMA}}^2=\sum_{k=1}^2 w_k\sigma_k^2+\sum_{k=1}^2 w_k(\mu_k-\mu_{\text{BMA}})^2$$
模型内方差为
$$\sum_{k=1}^2 w_k\sigma_k^2=0.2315\times 0.0004+0.7685\times 0.0009=0.0000926+0.00069165=0.00078425$$
模型间方差利用恒等式 $\sum w_k(\mu_k-\bar\mu)^2=w_1 w_2(\mu_1-\mu_2)^2$ 计算：
$$w_1 w_2(\mu_1-\mu_2)^2=0.231476\times 0.768524\times (0.01-0.02)^2=0.177895\times 10^{-4}\approx 0.00001779$$
因此模型平均预测方差为
$$\sigma_{\text{BMA}}^2=0.00078425+0.00001779=0.00080204\approx 8.020\times 10^{-4}$$
对应的预测标准差为 $\sigma_{\text{BMA}}=\sqrt{0.00080204}\approx 0.02832$。

关于混合分布的偏度，单正态分量的三阶中心矩为零。混合分布的三阶中心矩公式为
$$\mu_3=\sum_{k=1}^2 w_k\left[3(\mu_k-\mu_{\text{BMA}})\sigma_k^2+(\mu_k-\mu_{\text{BMA}})^3\right]$$
代入数值：
对分量 $1$，$\mu_1-\mu_{\text{BMA}}=0.01-0.017685=-0.007685$：
$$3(-0.007685)(0.0004)+(-0.007685)^3=-9.222\times 10^{-6}-4.539\times 10^{-7}=-9.676\times 10^{-6}$$
加权贡献为 $0.2315\times(-9.676\times 10^{-6})\approx -2.240\times 10^{-6}$；
对分量 $2$，$\mu_2-\mu_{\text{BMA}}=0.02-0.017685=0.002315$：
$$3(0.002315)(0.0009)+(0.002315)^3=6.2505\times 10^{-6}+1.241\times 10^{-8}=6.263\times 10^{-6}$$
加权贡献为 $0.7685\times(6.263\times 10^{-6})\approx 4.813\times 10^{-6}$；
两项相加得三阶中心矩：
$$\mu_3=-2.240\times 10^{-6}+4.813\times 10^{-6}=2.573\times 10^{-6}$$
标准化偏度为
$$\operatorname{Skew}=\frac{\mu_3}{\sigma_{\text{BMA}}^3}=\frac{2.573\times 10^{-6}}{(0.02832)^3}=\frac{2.573\times 10^{-6}}{2.271\times 10^{-5}}\approx +0.1133$$

混合预测一般不再是正态分布：正态族在凸组合运算下不具备封闭性。当两个正态分布的均值或方差不相等时，混合密度是双峰（或不对称单峰）多参数族。均值不相等导致对称性破缺产生非零偏度（如上计算得到正偏），方差不相等导致重尾特征产生正超额峰度，因此混合后验预测具有典型的非正态厚尾和偏斜特征。

本题常见错误做法是计算预测方差时遗漏模型间方差 $w_1 w_2(\mu_1-\mu_2)^2$，将其等同于单纯的方差加权平均；或者错误断言两个正态分布的混合仍然服从正态分布。
## 16. 
已知后验样本量 $M=20000$，渐近方差膨胀因子 $\kappa_h=25$，平稳分布方差 $\sigma_h^2=4$。
有效样本量（ESS）衡量在自相关存在下等价的独立样本数量，计算公式为
$$\operatorname{ESS}=\frac{M}{\kappa_h}=\frac{20000}{25}=800$$
后验均值估计量 $\bar h_M=\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)})$ 的渐近方差为
$$\operatorname{Var}(\bar h_M)=\frac{\sigma_h^2\kappa_h}{M}=\frac{\sigma_h^2}{\operatorname{ESS}}=\frac{4}{800}=0.005$$
蒙特卡洛标准误（MCSE）为该方差的平方根：
$$\operatorname{MCSE}=\sqrt{\operatorname{Var}(\bar h_M)}=\sqrt{0.005}=\frac{\sqrt{2}}{20}\approx 0.07071$$

若保持链的自相关结构与提议机制不变，仅将迭代抽样数扩大四倍至 $M'=4M=80000$。
此时有效样本量线性增加四倍：$\operatorname{ESS}'=4\times 800=3200$。
蒙特卡洛标准误与样本量的平方根成反比：
$$\operatorname{MCSE}'=\frac{\sigma_h}{\sqrt{\operatorname{ESS}'}}=\frac{\sigma_h}{2\sqrt{\operatorname{ESS}}}=\frac{1}{2}\operatorname{MCSE}\approx 0.03536$$
即标准误严格减半，体现了马尔可夫链中心极限定理的 $O(M^{-1/2})$ 敛速。

有效样本量充足不能替代多链收敛诊断的原因在于：
ESS 的经验估计完全建立在“当前单条链已经进入全局平稳分布”的强假定前提下。在复杂高维或具有多模态（Multimodal）能量壁垒的后验空间中，单条 MCMC 链极易被困在某个局部极大值孤岛中。在该孤岛内部，提议接受率良好且局部自相关快速衰减，根据单链局部波动计算出的自相关时间 $\kappa_h$ 较小，从而报告出表面上极高且令人满意的有效样本量。然而，整条链完全没有探索到相隔遥远的其他高概率后验模态，使得后验均值与方差产生致命的系统性偏误。只有通过设定不同初始值运行多条相互独立的链，并结合 Gelman-Rubin 诊断（$\hat R$ 统计量比较链间方差与链内方差），才能有效检验马尔可夫链是否已消除对初值的依赖并完成对整个后验几何流形的充分遍历。

本题常见错误做法是在计算 MCSE 时混淆样本方差与后验均值方差，直接将平稳方差开根号 $\sqrt{4}=2$ 作为标准误；或者盲目迷信单链 ESS 报表而忽视局部滞留风险。

## 17. 
针对模型在样本内拟合均值与方差良好但系统性低估跨资产极端联合损失的问题，可构建后验预测检验（Posterior Predictive Check, PPC）。

检验统计量设计：
1. 衡量单资产厚尾的统计量：采用资产收益率的样本超额峰度或深尾分位数损失占比。设单资产收益为 $y_{it}$，样本均值为 $\bar y_i$，样本方差为 $s_i^2$，定义单资产四阶矩统计量：
$$T_1(\boldsymbol y)=\frac{1}{T}\sum_{t=1}^T \left(\frac{y_{it}-\bar y_i}{s_i}\right)^4-3$$
或定义单侧 $1\%$ 经验分位数以下的尾部期望缺口。该统计量对薄尾设定（如正态）下的极值低估高度敏感。
2. 衡量跨资产共同下跌的统计量：采用双资产联合极值超越概率或联合尾部协偏度。对资产 $1$ 与资产 $2$ 的历史 $\alpha$ 分位数（如 $\alpha=0.05$）记为 $\hat q_1,\hat q_2$，定义联合崩盘频数统计量：
$$T_2(\boldsymbol y)=\frac{1}{T}\sum_{t=1}^T \mathbb I_{\{y_{1t}\le \hat q_1,\, y_{2t}\le \hat q_2\}}$$
若模型采用独立假定或高斯 Copula，其渐近联合下尾相关系数为零，将显著低估同时击穿阈值的频率。

完整执行流程：
第一步，从联合后验分布 $\pi(\boldsymbol\theta\mid\boldsymbol y_{\text{obs}})$ 中抽取 $S$ 个参数样本 $\{\boldsymbol\theta^{(s)}\}_{s=1}^S$；
第二步，对每一个参数抽取 $\boldsymbol\theta^{(s)}$，基于模型的似然生成机制 $p(\boldsymbol y\mid\boldsymbol\theta^{(s)})$，独立模拟出一组与真实样本规模完全一致的复制数据集 $\boldsymbol y^{\text{rep},(s)}$；
第三步，在观测数据上计算检验值 $T(\boldsymbol y_{\text{obs}})$，并在每一组复制数据上计算对应检验值 $T(\boldsymbol y^{\text{rep},(s)})$；
第四步，计算后验预测 $p$ 值（PPP-value）：
$$p_B=\frac{1}{S}\sum_{s=1}^S \mathbb I_{\{T(\boldsymbol y^{\text{rep},(s)})\ge T(\boldsymbol y_{\text{obs}})\}}$$
第五步，模型修改判断：若 $p_B$ 极度接近 $0$（如 $p_B<0.01$），表明在模型后验认可的真实数据生成机制下，几乎不可能产生观测样本所具有的极端尾部协同特征，原模型结构存在严重系统性缺陷，必须进行模型升级（例如将薄尾扰动拓展为多元 Student 分布，或引入具有非零下尾相关性的 Clayton/t-Copula）。

与严格样本外预测评价的区别：
PPC 属于模型内部自洽性检验（Goodness-of-fit），它将同一份历史数据重复用于参数后验估计与统计量比对，核心关注“当前模型假设是否能生成在质上与观测现实相容的数据”，因此受内样本拟合优化的内在约束；而严格的样本外预测评价（如滚动前瞻预测、样本外对数预测得分、留一交叉验证 PSIS-LOO）将参数估计与模型评估在时间或样本维度严格隔离，直接衡量模型对未知未来数据的泛化预测能力，能有效惩罚过拟合，防止因过度参数化带来的外推崩溃。

本题常见错误做法是混淆 Bayesian $p$ 值的双向解释，误以为 $p_B$ 必须在双侧 $0.05$ 拒绝；或者在生成复制数据时仅固定后验均值点估计，忽略对后验参数分布的积分抽样。

## 18. 
超额收益后验预测分布为 $R\mid\mathcal D\sim N(\mu=0.01,\sigma^2=0.0004)$，标准差为 $\sigma=0.02$。
无卖空限制，初始持仓 $a_0=0.2$。均值—方差优化目标函数为
$$U(a)=\mathbb E[a R\mid\mathcal D]-\frac{\gamma}{2}\operatorname{Var}(a R\mid\mathcal D)-c(a-a_0)^2=a\mu-\frac{\gamma}{2}a^2\sigma^2-c(a-a_0)^2$$
代入参数 $\gamma=10$、$c=0.01$：
$$U(a)=0.01a-\frac{10}{2}(0.0004)a^2-0.01(a-0.2)^2=0.01a-0.002a^2-0.01(a-0.2)^2$$
求一阶导数并令其为零：
$$U'(a)=\mu-\gamma\sigma^2a-2c(a-a_0)=0.01-0.004a-0.02(a-0.2)=0\implies 0.024a=0.01+0.004=0.014$$
解得 Bayes 最优持仓为
$$a^\ast=\frac{0.014}{0.024}=\frac{7}{12}\approx 0.58333$$
将 $a^\ast=7/12$ 代入目标函数计算最优效用值：
$$a^\ast\mu=\frac{7}{12}\times 0.01=\frac{7}{1200}$$
$$\frac{\gamma}{2}(a^\ast)^2\sigma^2=5\times\left(\frac{7}{12}\right)^2\times 0.0004=\frac{5\times 49\times 0.0004}{144}=\frac{0.098}{144}=\frac{49}{72000}$$
$$c(a^\ast-a_0)^2=0.01\left(\frac{7}{12}-\frac{1}{5}\right)^2=0.01\left(\frac{23}{60}\right)^2=\frac{5.29}{3600}=\frac{529}{360000}$$
通分计算最优目标值：
$$U(a^\ast)=\frac{2100-245-529}{360000}=\frac{1326}{360000}=\frac{221}{60000}\approx 0.0036833$$

若插入法误把预测方差取为 $\sigma_0^2=0.0001$：
代入决策公式：
$$a_{\text{plug}}=\frac{\mu+2ca_0}{\gamma\sigma_0^2+2c}=\frac{0.014}{10\times 0.0001+0.02}=\frac{0.014}{0.001+0.02}=\frac{0.014}{0.021}=\frac{2}{3}\approx 0.66667$$
在真实后验预测目标（方差为 $0.0004$）下评估该持仓的效用：
$$a_{\text{plug}}\mu=\frac{2}{3}\times 0.01=\frac{2}{300}=\frac{2400}{360000}$$
$$\frac{\gamma}{2}a_{\text{plug}}^2\sigma^2=5\times\left(\frac{2}{3}\right)^2\times 0.0004=\frac{5\times 4\times 0.0004}{9}=\frac{0.008}{9}=\frac{320}{360000}$$
$$c(a_{\text{plug}}-a_0)^2=0.01\left(\frac{2}{3}-\frac{1}{5}\right)^2=0.01\left(\frac{7}{15}\right)^2=0.01\times\frac{49}{225}=\frac{0.49}{225}=\frac{784}{360000}$$
实际效用值为
$$U(a_{\text{plug}})=\frac{2400-320-784}{360000}=\frac{1296}{360000}=0.0036000$$
量化忽略参数不确定性的效用损失：
$$\Delta U=U(a^\ast)-U(a_{\text{plug}})=\frac{1326-1296}{360000}=\frac{30}{360000}=\frac{1}{12000}\approx 8.333\times 10^{-5}$$
由于二次目标函数的对称性，该差值亦精确等于 $\frac{1}{2}(\gamma\sigma^2+2c)(a_{\text{plug}}-a^\ast)^2=0.012\times(1/12)^2=1/12000$。

加入非负约束 $a\ge 0$ 与尾部风险约束 $\mathbb P(a R<-0.02\mid\mathcal D)\le 0.05$：
在 $a\ge 0$ 时，投资收益 $a R\sim N(0.01a,0.0004a^2)$，其标准差为 $0.02a$。
标准正态分布的 $5\%$ 分位数为 $-z_{0.95}\approx -1.64485$。
收益率在 $5\%$ 分位点处的水平为
$$0.01a-1.64485\times 0.02a=a(0.01-0.032897)=-0.022897a$$
尾部约束要求该极值水平不低于 $-0.02$：
$$-0.022897a\ge -0.02\implies 0.022897a\le 0.02\implies a\le \frac{0.02}{0.022897}\approx 0.87347$$
因此可行持仓区间为 $0\le a\le 0.8735$。
检验上述两个持仓：
$a^\ast=7/12\approx 0.5833\in[0,\,0.8735]$；
$a_{\text{plug}}=2/3\approx 0.6667\in[0,\,0.8735]$。
两持仓均严格落在可行域内，尾部风险约束与非负约束均未被击穿（约束不紧），最优决策无需边界投影。

本题常见错误做法是计算尾部约束时遗漏收益率均值项 $a\mu$，仅以方差倍数计算临界值；或者在评估插入法损失时误用错误目标函数进行比较。
## 19. 
目标分布为三状态离散概率向量 $\boldsymbol\pi=(\pi_1,\pi_2,\pi_3)=(1/2,\,1/3,\,1/6)$。
提议机制在当前状态下以等概率 $1/2$ 提议转移到另外两个状态之一，对应的提议转移概率矩阵为
$$\boldsymbol Q=\begin{pmatrix} 0 & 1/2 & 1/2 \\ 1/2 & 0 & 1/2 \\ 1/2 & 1/2 & 0 \end{pmatrix}$$
由于对所有 $i\ne j$ 恒有 $q(j\mid i)=q(i\mid j)=1/2$，提议核对称，提议比率为 $1$。
Metropolis–Hastings 接受概率简化为
$$\alpha(i,j)=\min\left\{1,\frac{\pi_j}{\pi_i}\right\}$$
逐对计算各状态间的接受概率：
$$\alpha(1,2)=\min\left\{1,\frac{1/3}{1/2}\right\}=\frac{2}{3},\quad \alpha(2,1)=\min\left\{1,\frac{1/2}{1/3}\right\}=1$$
$$\alpha(1,3)=\min\left\{1,\frac{1/6}{1/2}\right\}=\frac{1}{3},\quad \alpha(3,1)=\min\left\{1,\frac{1/2}{1/6}\right\}=1$$
$$\alpha(2,3)=\min\left\{1,\frac{1/6}{1/3}\right\}=\frac{1}{2},\quad \alpha(3,2)=\min\left\{1,\frac{1/3}{1/6}\right\}=1$$

非对角转移概率为 $P_{ij}=q(j\mid i)\alpha(i,j)$，对角自环概率为 $P_{ii}=1-\sum_{j\ne i}P_{ij}$：
第一行（状态 $1$ 出发）：
$$P_{12}=\frac{1}{2}\times\frac{2}{3}=\frac{1}{3},\quad P_{13}=\frac{1}{2}\times\frac{1}{3}=\frac{1}{6},\quad P_{11}=1-\left(\frac{1}{3}+\frac{1}{6}\right)=\frac{1}{2}$$
第二行（状态 $2$ 出发）：
$$P_{21}=\frac{1}{2}\times 1=\frac{1}{2},\quad P_{23}=\frac{1}{2}\times\frac{1}{2}=\frac{1}{4},\quad P_{22}=1-\left(\frac{1}{2}+\frac{1}{4}\right)=\frac{1}{4}$$
第三行（状态 $3$ 出发）：
$$P_{31}=\frac{1}{2}\times 1=\frac{1}{2},\quad P_{32}=\frac{1}{2}\times 1=\frac{1}{2},\quad P_{33}=1-\left(\frac{1}{2}+\frac{1}{2}\right)=0$$
得到完整的 $3\times 3$ 转移概率矩阵：
$$\boldsymbol P=\begin{pmatrix} 1/2 & 1/3 & 1/6 \\ 1/2 & 1/4 & 1/4 \\ 1/2 & 1/2 & 0 \end{pmatrix}$$

逐对验证不同状态间的详细平衡 $\pi_i P_{ij}=\pi_j P_{ji}$：
对状态对 $(1,2)$：
$$\pi_1 P_{12}=\frac{1}{2}\times\frac{1}{3}=\frac{1}{6},\quad \pi_2 P_{21}=\frac{1}{3}\times\frac{1}{2}=\frac{1}{6}\implies \pi_1 P_{12}=\pi_2 P_{21}=\frac{1}{6}$$
对状态对 $(1,3)$：
$$\pi_1 P_{13}=\frac{1}{2}\times\frac{1}{6}=\frac{1}{12},\quad \pi_3 P_{31}=\frac{1}{6}\times\frac{1}{2}=\frac{1}{12}\implies \pi_1 P_{13}=\pi_3 P_{31}=\frac{1}{12}$$
对状态对 $(2,3)$：
$$\pi_2 P_{23}=\frac{1}{3}\times\frac{1}{4}=\frac{1}{12},\quad \pi_3 P_{32}=\frac{1}{6}\times\frac{1}{2}=\frac{1}{12}\implies \pi_2 P_{23}=\pi_3 P_{32}=\frac{1}{12}$$
详细平衡在每一对状态间均严格以数值相等成立。

验证平稳分布不变性 $\boldsymbol\pi\boldsymbol P=\boldsymbol\pi$：
$$(\boldsymbol\pi\boldsymbol P)_1=\frac{1}{2}\times\frac{1}{2}+\frac{1}{3}\times\frac{1}{2}+\frac{1}{6}\times\frac{1}{2}=\frac{1}{4}+\frac{1}{6}+\frac{1}{12}=\frac{3+2+1}{12}=\frac{1}{2}=\pi_1$$
$$(\boldsymbol\pi\boldsymbol P)_2=\frac{1}{2}\times\frac{1}{3}+\frac{1}{3}\times\frac{1}{4}+\frac{1}{6}\times\frac{1}{2}=\frac{1}{6}+\frac{1}{12}+\frac{1}{12}=\frac{2+1+1}{12}=\frac{1}{3}=\pi_2$$
$$(\boldsymbol\pi\boldsymbol P)_3=\frac{1}{2}\times\frac{1}{6}+\frac{1}{3}\times\frac{1}{4}+\frac{1}{6}\times 0=\frac{1}{12}+\frac{1}{12}+0=\frac{2}{12}=\frac{1}{6}=\pi_3$$
等式 $\boldsymbol\pi\boldsymbol P=\boldsymbol\pi$ 严格成立。

若链从状态 $1$ 出发，初始分布为 $\boldsymbol p_0=(1,0,0)$。
一步后的状态分布为矩阵 $\boldsymbol P$ 的第一行：
$$\boldsymbol p_1=\boldsymbol p_0\boldsymbol P=(1/2,\,1/3,\,1/6)=\boldsymbol\pi$$
给定函数值 $h(1)=0, h(2)=1, h(3)=3$，一步后的条件期望为
$$\mathbb E_1[h(X_1)]=\sum_{j=1}^3 P_{1j}h(j)=\frac{1}{2}\times 0+\frac{1}{3}\times 1+\frac{1}{6}\times 3=\frac{1}{3}+\frac{1}{2}=\frac{5}{6}\approx 0.83333$$

有限状态计算能精确验证：MH 接受—拒绝机制在离散状态下如何通过精确调节通量比率消减不对称性，从而在微观层面上严格满足详细平衡，进而保证目标分布为平稳分布。
然而，该计算完全不能替代一般连续后验抽样中的收敛诊断：在实际连续参数空间中，状态集不可数，转移矩阵无法显式写出或求特征值；高维空间中几何瓶颈、尖锐漏斗（Funnel）或多模态能量壁垒会导致马尔可夫链的次大特征值极度逼近 $1$（谱间隙几乎为零），混合时间（Mixing Time）极其漫长。链绝不可能如本例单步就恰好达到平稳分布，而是必须经历未知的预热（Burn-in）过程，且单链易陷入局部极大。因此必须依赖多链并行与经验收敛统计量监控抽样有效性。

本题常见错误做法是计算自环转移概率时遗漏对角项，误将提议拒绝当成状态中止；或者把单步恰好达到平稳分布的特殊构造推广为普遍结论。

## 20. 
三个模型的先验概率为 $p_1=0.5, p_2=0.3, p_3=0.2$。
对数边际似然分别为 $\ell_1=-201.0, \ell_2=-202.0, \ell_3=-205.0$。
最大对数边际似然为 $\ell_{\max}=\max\{-201.0,-202.0,-205.0\}=-201.0$。
采用平移稳定化数值方法，各模型的平移对数似然为
$$\Delta\ell_1=0.0,\quad \Delta\ell_2=-1.0,\quad \Delta\ell_3=-4.0$$
未归一化的后验核为 $\tilde w_k=p_k\exp(\Delta\ell_k)$：
$$\tilde w_1=0.5\times\exp(0)=0.500000$$
$$\tilde w_2=0.3\times\exp(-1.0)=0.3\times 0.367879=0.110364$$
$$\tilde w_3=0.2\times\exp(-4.0)=0.2\times 0.018316=0.003663$$
求和得归一化分母：
$$S_w=\sum_{k=1}^3 \tilde w_k=0.500000+0.110364+0.003663=0.614027$$
归一化后的后验模型权重为
$$w_1=\frac{0.500000}{0.614027}\approx 0.81430\approx 81.43\%$$
$$w_2=\frac{0.110364}{0.614027}\approx 0.17974\approx 17.97\%$$
$$w_3=\frac{0.003663}{0.614027}\approx 0.00596\approx 0.60\%$$

三个模型的预测分布为
$$M_1: N(\mu_1=0.010,\sigma_1^2=0.0004),\quad M_2: N(\mu_2=0.014,\sigma_2^2=0.0009),\quad M_3: N(\mu_3=-0.006,\sigma_3^2=0.0025)$$
模型平均预测均值为
$$\mu_{\text{BMA}}=\sum_{k=1}^3 w_k\mu_k=0.81430(0.010)+0.17974(0.014)+0.00596(-0.006)=0.008143+0.002516-0.000036\approx 0.010623$$
预测方差由全方差公式给出：
模型内方差为
$$\sum_{k=1}^3 w_k\sigma_k^2=0.81430(0.0004)+0.17974(0.0009)+0.00596(0.0025)=0.0003257+0.0001618+0.0000149=0.0005024$$
模型间方差为
$$\sum_{k=1}^3 w_k(\mu_k-\mu_{\text{BMA}})^2=0.8143(-0.00062)^2+0.1797(0.00338)^2+0.0060(-0.01662)^2\approx 0.0000040$$
预测总方差为
$$\sigma_{\text{BMA}}^2=0.0005024+0.0000040=0.0005064$$
对应的综合标准差为 $\sigma_{\text{BMA}}=\sqrt{0.0005064}\approx 0.02250$。

混合预测的三阶中心矩为
$$\mu_3=\sum_{k=1}^3 w_k\left[3(\mu_k-\mu_{\text{BMA}})\sigma_k^2+(\mu_k-\mu_{\text{BMA}})^3\right]\approx 2.657\times 10^{-7}$$
标准化偏度为
$$\operatorname{Skew}=\frac{\mu_3}{\sigma_{\text{BMA}}^3}=\frac{2.657\times 10^{-7}}{(0.02250)^3}\approx +0.0233$$

混合预测累积分布函数为正态分布函数的加权和，其 $5\%$ 分位数 $q_{0.05}$ 满足一维非线性方程：
$$\sum_{k=1}^3 w_k\Phi\left(\frac{q-\mu_k}{\sigma_k}\right)=0.05$$
展开为具体的代数方程：
$$0.81430\,\Phi\left(\frac{q-0.010}{0.02}\right)+0.17974\,\Phi\left(\frac{q-0.014}{0.03}\right)+0.00596\,\Phi\left(\frac{q+0.006}{0.05}\right)-0.05=0$$

数值求解与比较：
若仅使用最高后验权重模型 $M_1$（单模型决策）：
$$q_1(0.05)=\mu_1-1.64485\sigma_1=0.010-1.64485\times 0.02=-0.022897\approx -0.02290$$
将 $q=-0.02290$ 代入混合分布函数检验：
$$F_{\text{mix}}(-0.02290)=0.81430(0.05)+0.17974\,\Phi(-1.23)+0.00596\,\Phi(-0.34)\approx 0.0407+0.0196+0.0022=0.0625>0.05$$
由于累积概率大于 $0.05$，混合分布的 $5\%$ 分位数必然位于更深邃的左侧负尾部。
在区间 $[-0.026,\,-0.023]$ 内采用二分迭代求根，解得混合预测的 $5\%$ 分位数为
$$q_{0.05}^{\text{mix}}\approx -0.02552\approx -0.0255$$
比较两分位数：单模型最高权重给出 $-0.0229$（损失为 $2.29\%$），而模型平均混合预测给出 $-0.0255$（损失为 $2.55\%$）。这是因为尽管模型 $M_2$ 与 $M_3$ 权重相对较小，但其波动率显著更高（分别为 $0.03$ 和 $0.05$）且 $M_3$ 带有负均值，使左侧深尾显著增厚。仅依赖单一最优模型会低估尾部风险约 $26$ 个基点。

本题常见错误做法是在对数似然指数化时直接求幂导致浮点下溢，未执行减去极大值的数值稳定化技巧；或者忽略模型不确定性，用最优模型的分位数直接替代模型平均分位数。
## 21. 
下一期资产收益率后验预测为位置—尺度 Student 分布：$R\sim t(\nu=5,\mu=0.004,s^2=0.015^2)$。
组合损失定义为 $L=-R$。由于 Student 分布关于位置参数对称，损失变量服从参数变换后的 Student 分布：
$$L\sim t(\nu=5,\,\mu_L=-0.004,\,s^2=0.015^2)$$
设 $Z\sim t(5)$ 为自由度为 $5$ 的标准 Student 随机变量，则 $L$ 可表示为 $L=\mu_L+s Z=-0.004+0.015 Z$。

已知标准 Student 分布在 $\alpha=0.99$ 处的分位数为 $z_{0.99}=3.365$，概率密度为 $f_5(z_{0.99})=0.0109$。
计算 $99\%$ 风险价值 $\operatorname{VaR}_{0.99}(L)$：
$$\operatorname{VaR}_{0.99}(L)=\mu_L+s\,z_{0.99}=-0.004+0.015\times 3.365=-0.004+0.050475=0.046475\approx 0.04648$$

计算 $99\%$ 期望缺口 $\operatorname{ES}_{0.99}(L)=\mathbb E[L\mid L\ge\operatorname{VaR}_{0.99}(L)]$。
由位置—尺度不变性，$\operatorname{ES}_\alpha(L)=\mu_L+s\operatorname{ES}_\alpha(Z)$。
对于标准 Student 分布，尾部条件期望具有解析积分公式：
$$\operatorname{ES}_\alpha(Z)=\frac{1}{1-\alpha}\int_{z_\alpha}^\infty z f_\nu(z)\mathrm{d}z=\frac{f_\nu(z_\alpha)}{1-\alpha}\frac{\nu+z_\alpha^2}{\nu-1}$$
代入自由度 $\nu=5$ 与数值条件：
$$\frac{\nu+z_{0.99}^2}{\nu-1}=\frac{5+3.365^2}{5-1}=\frac{5+11.323225}{4}=\frac{16.323225}{4}=4.080806$$
代入尾部概率 $1-\alpha=0.01$ 与密度值：
$$\operatorname{ES}_{0.99}(Z)=\frac{0.0109}{0.01}\times 4.080806=1.09\times 4.080806\approx 4.44808$$
因此，损失的期望缺口为
$$\operatorname{ES}_{0.99}(L)=-0.004+0.015\times 4.44808=-0.004+0.066721=0.062721\approx 0.06272$$

构造保持均值与方差相等的正态近似分布：
$L$ 的均值为 $\mathbb E[L]=\mu_L=-0.004$。
$L$ 的真实方差为
$$\operatorname{Var}(L)=\frac{\nu}{\nu-2}s^2=\frac{5}{5-2}(0.015)^2=\frac{5}{3}\times 0.000225=0.000375$$
等方差正态近似的标准差为 $\sigma_{\text{norm}}=\sqrt{0.000375}\approx 0.019365$。
利用标准正态 $99\%$ 分位数 $z_{\text{norm}}=2.326$ 及密度值 $\phi(2.326)=0.0267$：
$$\operatorname{VaR}_{0.99}^{\text{norm}}(L)=\mu_L+\sigma_{\text{norm}}\times 2.326=-0.004+0.019365\times 2.326=-0.004+0.045043=0.041043\approx 0.04104$$
正态分布的期望缺口公式为 $\operatorname{ES}_\alpha(Z_{\text{norm}})=\frac{\phi(z_\alpha)}{1-\alpha}=\frac{0.0267}{0.01}=2.67$：
$$\operatorname{ES}_{0.99}^{\text{norm}}(L)=\mu_L+\sigma_{\text{norm}}\times 2.67=-0.004+0.019365\times 2.67=-0.004+0.051705=0.047705\approx 0.04770$$

对于头寸倍数 $k>0$，头寸损失为 $k L$。由正齐次性，$\operatorname{ES}_{0.99}(k L)=k\operatorname{ES}_{0.99}(L)\le 0.06$。
最大正头寸倍数上界为 $k\le 0.06/\operatorname{ES}_{0.99}(L)$：
在真实 Student 预测下：
$$k_{\text{Student}}=\frac{0.06}{0.062721}\approx 0.9566$$
在正态近似下：
$$k_{\text{Normal}}=\frac{0.06}{0.047705}\approx 1.2577$$

尾部差异对杠杆限制具有决定性影响：
即使匹配了一阶矩与二阶矩，正态分布在深尾处的概率密度以指数衰减，严重低估极值尾部风险；相比之下，自由度为 $5$ 的 Student 分布呈幂律多项式厚尾，计算出的真实期望缺口高出正态近似约 $31.5\%$。正态近似误以为风险可控而允许开出 $1.26$ 倍杠杆（超过本金），而在厚尾现实约束下，为了防范极端连环暴跌，Bayes 决策者必须将持仓压缩至无杠杆的 $0.96$ 倍以下。忽视尾部厚度会导致杠杆限额严重失真。

本题常见错误做法是计算损失方差时忘记乘自由度修正因子 $\nu/(\nu-2)$；或者在计算 Student 分布期望缺口时直接套用正态分布的逆 Mills 比公式。

## 22. 
两个竞争模型的后验权重为 $w_1=0.6, w_2=0.4$。
预测分布分别为 $M_1: N(\mu_1=0.012,\sigma_1^2=0.0004)$ 与 $M_2: N(\mu_2=-0.004,\sigma_2^2=0.0016)$。
投资者目标为 $U(a)=a m-\frac{\gamma}{2}a^2 v-0.01(a-0.3)^2$，其中 $\gamma=8, a_0=0.3, c=0.01$。

第一，基于模型平均预测（BMA）：
综合预测均值为
$$m_{\text{BMA}}=0.6(0.012)+0.4(-0.004)=0.0072-0.0016=0.0056$$
模型内方差为 $0.6(0.0004)+0.4(0.0016)=0.00024+0.00064=0.00088$。
模型间方差为 $w_1 w_2(\mu_1-\mu_2)^2=0.6\times 0.4\times(0.012-(-0.004))^2=0.24\times(0.016)^2=0.00006144$。
综合预测方差为
$$v_{\text{BMA}}=0.00088+0.00006144=0.00094144$$
求最优持仓 $U'(a)=m-\gamma v a-2c(a-a_0)=0$：
$$a^\ast_{\text{BMA}}=\frac{m_{\text{BMA}}+2c a_0}{\gamma v_{\text{BMA}}+2c}=\frac{0.0056+2(0.01)(0.3)}{8(0.00094144)+0.02}=\frac{0.0056+0.0060}{0.0075315+0.02}=\frac{0.0116}{0.0275315}\approx 0.4213$$
计算最优目标值：
$$U(a^\ast_{\text{BMA}})=0.4213(0.0056)-4(0.4213)^2(0.00094144)-0.01(0.4213-0.3)^2\approx 0.002359-0.000669-0.000147=0.001543$$

第二，仅基于高权重模型 $M_1$：
$m_1=0.012, v_1=0.0004$。
$$a^\ast_{M_1}=\frac{m_1+2c a_0}{\gamma v_1+2c}=\frac{0.012+0.006}{8(0.0004)+0.02}=\frac{0.018}{0.0032+0.02}=\frac{0.018}{0.0232}=\frac{45}{58}\approx 0.7759$$
最优目标值为
$$U(a^\ast_{M_1})=0.7759(0.012)-4(0.7759)^2(0.0004)-0.01(0.7759-0.3)^2\approx 0.009310-0.000963-0.002264=0.006083$$
差异比较：单模型持仓 $0.7759$ 远高于模型平均持仓 $0.4213$。单模型策略完全无视模型 $M_2$ 提示的负收益与四倍高方差风险，导致投资过度冒进。

第三，在模型平均下引入尾部风险约束 $\mathbb P(a R\le -0.03\mid\mathcal D)\le 0.01$：
在 $a>0$ 时，该约束等价于 $\mathbb P\left(R\le -\frac{0.03}{a}\mid\mathcal D\right)\le 0.01$。
混合预测的累积分布函数为
$$F_{\text{mix}}(r)=0.6\,\Phi\left(\frac{r-0.012}{0.02}\right)+0.4\,\Phi\left(\frac{r+0.004}{0.04}\right)$$
令 $F_{\text{mix}}(r)=0.01$。由于 $r\le -0.07$ 时第一项 $\Phi\left(\frac{r-0.012}{0.02}\right)\le \Phi(-4.1)<2\times 10^{-5}\approx 0$，极值尾部完全由高波动分量 $M_2$ 支配：
$$0.4\,\Phi\left(\frac{r+0.004}{0.04}\right)\approx 0.01\implies \Phi\left(\frac{r+0.004}{0.04}\right)\approx 0.025$$
查标准正态分布表，$\Phi(-1.95996)=0.025$。解得 $1\%$ 分位数：
$$r_{0.01}=-0.004-1.95996\times 0.04=-0.004-0.07840=-0.08240$$
因此要求 $-\frac{0.03}{a}\le -0.08240\implies a\le \frac{0.03}{0.08240}\approx 0.36408\approx 0.3641$。
由于未受约束的最优持仓 $a^\ast_{\text{BMA}}=0.4213>0.3641$，该尾部约束紧致。
受约束的 Bayes 最优持仓被截断在边界：
$$a^\ast_{\text{constrained}}=0.3641$$

第四，后验预测检验与模型适用性：
最大回撤统计量的单边后验预测 $p$ 值分别为 $p_{B,1}=0.01$ 与 $p_{B,2}=0.40$。
模型 $M_1$ 的 $p$ 值极度接近 $0$（$1\%$），说明其实际观测到的最大回撤在 $M_1$ 抽样空间中属于极端小概率离群事件，$M_1$ 在动态尾部路径结构上存在系统性低估，尾部完全不适用；而模型 $M_2$ 的 $p$ 值为 $0.40$，落在标准统计容忍区间 $[0.05,0.95]$ 内，能够合理复现极端回撤路径。

模型平均不能替代对失效收益结构的修改：
BMA 权重分配由边际似然统揽，其数值主要由占样本绝大多数的常态样本点驱动。由于 $M_1$ 在中心均值处拟合较好，依然获得了 $60\%$ 的主导权重；然而由于 $M_1$ 尾部结构本身存在致命缺陷，对其赋予大权重直接污染了投资组合的下行保护机制。模型平均仅能在已给定的模型集合中做凸组合，它无法凭空创造出具有非线性跳跃或动态极值自回归的真实数据生成机制。面对结构性失效（如 $p_{B,1}=0.01$ 揭示的厚尾危机），唯一的严谨路径是重构底层物理机制（例如引入非高斯跳跃扩散、随机波动或极值理论），而不能寄希望于用加权平均掩盖劣质模型的系统性漏洞。

本题常见错误做法是计算混合分布分位数时直接对分位数进行加权平均，混淆了概率分布函数的凸组合与分位数函数变换；或者误以为后验权重高达 $0.6$ 的模型必定在风险指标上全面优越。