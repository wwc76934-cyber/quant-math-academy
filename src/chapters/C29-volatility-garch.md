# 第29章　波动率建模与 GARCH

风险度量的核心输入是波动率，而金融收益率的波动率并非常数：它在时间上聚集，在冲击之后骤然放大，再用很长的时间缓慢回落到长期水平。经典线性时间序列模型把二阶矩当作给定的常数处理，这与经验事实严重不符。本章把条件方差本身作为建模对象：先梳理收益率数据的典型事实并给出定量刻画，再建立 ARCH 模型并完整证明其平稳性条件与无条件方差，最后处理 GARCH(1,1)，完整推导协方差平稳性条件、无条件方差与平方收益的自协方差结构，并给出极大似然估计的构造。

## 29.1 金融收益率的典型事实

设 $\{r_t\}_{t\in\mathbb Z}$ 为某资产的对数收益率序列，采样间隔为一日。围绕这样的序列，大量经验研究反复发现如下若干特征，它们共同构成波动率建模的出发点。

其一，收益本身的自相关极其微弱。对成熟市场的日收益，$\{r_t\}$ 的一阶至二十阶样本自相关系数通常落在抽样误差范围之内，把 $\{r_t\}$ 视作鞅差序列在统计上几乎无法拒绝。其二，绝对收益 $\{|r_t|\}$ 与平方收益 $\{r_t^2\}$ 的自相关却显著为正，且衰减十分缓慢：一阶自相关常达 $0.1$ 至 $0.3$，二十阶仍可测出显著正值。这一对比说明，收益的方向近乎不可预测，而收益的幅度高度可预测。其三，波动率聚集：大幅波动成簇出现，同一簇内既有正收益也有负收益，簇与簇之间由相对平静的时期分隔。

其四，尖峰厚尾：收益率的分布比同方差正态分布更尖、尾更厚，样本峰度常在 $4$ 至 $10$ 之间，极端事件的频率远高于正态近似给出的水平。其五，杠杆效应：负收益对后续波动率的抬升作用大于同等幅度的正收益，因此收益与未来波动率之间存在负相关。其六，长记忆与慢衰减：绝对收益的样本自相关函数呈近似双曲型衰减而非指数型衰减，即使滞后达到数百阶仍可测出正值，说明波动率冲击的影响消散得极慢。

上述特征无法用「收益独立同分布」的框架解释，却可以由一个共同的机制统一说明：条件方差 $\sigma_t^2$ 本身是一个随时间演化的随机过程。下面的定义把这一机制严格化，其中条件期望与条件方差的概念完全承接第13章。

**定义 29.1（信息集与条件矩）**

设 $\{\mathcal F_t\}_{t\in\mathbb Z}$ 为收益率序列的自然信息流，$\mathcal F_t=\sigma(r_s:s\le t)$，即由 $t$ 时刻及以前全部收益生成的 $\sigma$-代数。记条件均值、条件残差与条件方差为

$$\mu_t=\mathbb E[r_t\mid\mathcal F_{t-1}],\qquad \varepsilon_t=r_t-\mu_t,\qquad \sigma_t^2=\operatorname{Var}(r_t\mid\mathcal F_{t-1})=\mathbb E[\varepsilon_t^2\mid\mathcal F_{t-1}].\tag{29.1}$$

由条件期望的性质，$\mathbb E[\varepsilon_t\mid\mathcal F_{t-1}]=0$，故 $\{\varepsilon_t\}$ 是鞅差序列；$\sigma_t^2$ 是 $\mathcal F_{t-1}$-可测的随机变量而非常数。若对任何常数 $c$ 都有 $\mathbb P(\sigma_t^2=c)<1$，就称 $\{r_t\}$ 存在条件异方差。

**引理 29.2（方差分解与标准化残差）**

设 $\{r_t\}$ 满足定义 29.1，且 $\sigma_t^2>0$ 几乎必然。令 $z_t=\varepsilon_t/\sigma_t$，则下列结论成立。（1）$z_t$ 是 $\mathcal F_t$-可测的，且 $\mathbb E[z_t\mid\mathcal F_{t-1}]=0$，$\mathbb E[z_t^2\mid\mathcal F_{t-1}]=1$。（2）无条件二阶矩满足 $\mathbb E[\varepsilon_t^2]=\mathbb E[\sigma_t^2]$。（3）全方差分解给出

$$\operatorname{Var}(r_t)=\mathbb E[\sigma_t^2]+\operatorname{Var}(\mu_t).$$

（4）若进一步假定 $\{z_t\}$ 独立同分布、与 $\mathcal F_{t-1}$ 独立，且 $\mathbb E z_t=0$，$\mathbb E z_t^2=1$，则有表示式

$$\varepsilon_t=\sigma_t z_t,\qquad \sigma_t^2>0,\qquad \mathbb E z_t=0,\qquad \mathbb E z_t^2=1.\tag{29.2}$$

**证明**

（1）因为 $\varepsilon_t$ 与 $\sigma_t$ 都是 $\mathcal F_t$-可测的，$z_t=\varepsilon_t/\sigma_t$ 也是 $\mathcal F_t$-可测的。又 $\sigma_t^2$ 是 $\mathcal F_{t-1}$-可测且严格为正，可把 $1/\sigma_t$ 提到条件期望之外：

$$\mathbb E[z_t\mid\mathcal F_{t-1}]=\frac{1}{\sigma_t}\,\mathbb E[\varepsilon_t\mid\mathcal F_{t-1}]=0,\qquad \mathbb E[z_t^2\mid\mathcal F_{t-1}]=\frac{1}{\sigma_t^2}\,\mathbb E[\varepsilon_t^2\mid\mathcal F_{t-1}]=\frac{\sigma_t^2}{\sigma_t^2}=1.$$

（2）由迭代期望律，$\mathbb E[\varepsilon_t^2]=\mathbb E\bigl[\mathbb E[\varepsilon_t^2\mid\mathcal F_{t-1}]\bigr]=\mathbb E[\sigma_t^2]$。

（3）把 $r_t=\mu_t+\varepsilon_t$ 代入方差的定义，并用 $\mathbb E[\mu_t\varepsilon_t]=\mathbb E[\mu_t\,\mathbb E[\varepsilon_t\mid\mathcal F_{t-1}]]=0$，得 $\operatorname{Var}(r_t)=\operatorname{Var}(\mu_t)+\operatorname{Var}(\varepsilon_t)+2\operatorname{Cov}(\mu_t,\varepsilon_t)=\operatorname{Var}(\mu_t)+\mathbb E[\varepsilon_t^2]-\bigl(\mathbb E[\varepsilon_t]\bigr)^2$。而 $\mathbb E[\varepsilon_t]=\mathbb E[\mathbb E[\varepsilon_t\mid\mathcal F_{t-1}]]=0$，再由（2）即得结论。

（4）在这一附加假设下 $\varepsilon_t=\sigma_t z_t$ 是定义的重写；反过来验证它确实给出所要求的条件方差：$\mathbb E[\varepsilon_t^2\mid\mathcal F_{t-1}]=\sigma_t^2\,\mathbb E[z_t^2\mid\mathcal F_{t-1}]=\sigma_t^2\,\mathbb E[z_t^2]=\sigma_t^2$。

□

引理 29.2 把「条件异方差」这一机制与可观测的无条件矩联系起来：只要 $\sigma_t^2$ 是随机的，无条件分布就必然偏离同方差正态分布。下面的命题给出尖峰厚尾这一典型事实的定量来源。对均值为零的随机变量 $\varepsilon$，定义其峰度为 $\operatorname{Kurt}(\varepsilon)=\mathbb E[\varepsilon^4]/(\mathbb E[\varepsilon^2])^2$，超额峰度为 $\operatorname{Kurt}(\varepsilon)-3$，正态分布的峰度恰为 $3$。

**命题 29.3（方差混合产生超额峰度）**

设 $\varepsilon=\sigma z$，其中 $\sigma>0$ 是与 $z$ 独立的随机变量，$\mathbb E z=0$，$\mathbb E z^2=1$，$\mathbb E z^4=\kappa_z<\infty$，且 $\mathbb E\sigma^4<\infty$。则

$$\operatorname{Kurt}(\varepsilon)=\kappa_z\left(1+\frac{\operatorname{Var}(\sigma^2)}{(\mathbb E[\sigma^2])^2}\right)\ge \kappa_z,\tag{29.3}$$

等号成立当且仅当 $\sigma^2$ 几乎必然为常数。特别地，当 $z\sim N(0,1)$ 时 $\kappa_z=3$，超额峰度为 $3\operatorname{Var}(\sigma^2)/(\mathbb E[\sigma^2])^2$，只要条件方差随机就严格为正。

**证明**

由 $\sigma$ 与 $z$ 独立，$\mathbb E[\varepsilon^2]=\mathbb E[\sigma^2]\,\mathbb E[z^2]=\mathbb E[\sigma^2]$，$\mathbb E[\varepsilon^4]=\mathbb E[\sigma^4]\,\mathbb E[z^4]=\kappa_z\mathbb E[\sigma^4]$。于是

$$\operatorname{Kurt}(\varepsilon)=\frac{\mathbb E[\varepsilon^4]}{(\mathbb E[\varepsilon^2])^2}=\kappa_z\,\frac{\mathbb E[\sigma^4]}{(\mathbb E[\sigma^2])^2}.$$

把 $\mathbb E[\sigma^4]$ 按方差定义拆开，$\mathbb E[\sigma^4]=\operatorname{Var}(\sigma^2)+(\mathbb E[\sigma^2])^2$，代入即得式（29.3）。因为 $\operatorname{Var}(\sigma^2)\ge 0$，且 $\mathbb E[\sigma^2]>0$，故不等式成立；$\operatorname{Var}(\sigma^2)=0$ 等价于 $\sigma^2$ 几乎必然等于其期望，这正是等号成立的情形。

□

**例 29.1**

设 $\varepsilon_t=\sigma_t z_t$，其中 $\{z_t\}$ 独立同分布于 $N(0,1)$ 且与波动率过程独立，条件方差由平稳的一阶自回归方程驱动

$$\sigma_t^2=m+\phi\left(\sigma_{t-1}^2-m\right)+u_t,\qquad 0<\phi<1,$$

$\{u_t\}$ 独立同分布、均值为零、方差为 $\tau^2$，与 $\{z_t\}$ 独立，且参数使 $\sigma_t^2>0$ 几乎必然。求 $\{\varepsilon_t\}$ 与 $\{\varepsilon_t^2\}$ 的自相关函数，并取 $m=4\times 10^{-4}$、$\phi=0.85$、$\tau=2\times 10^{-4}$ 算出数值，讨论其与 29.1 节所列典型事实的对应关系。

**解**

第一步，求波动率过程的二阶矩。把方程改写为 $\sigma_t^2-m=\phi(\sigma_{t-1}^2-m)+u_t$，逐次向后代入得

$$\sigma_t^2-m=\sum_{j=0}^{n-1}\phi^j u_{t-j}+\phi^n\left(\sigma_{t-n}^2-m\right).$$

因为 $|\phi|<1$ 且 $\mathbb E u_t^2=\tau^2<\infty$，右边的级数在 $L^2$ 中收敛，余项 $\phi^n(\sigma_{t-n}^2-m)$ 在 $L^2$ 中趋于零，故 $\sigma_t^2=m+\sum_{j=0}^{\infty}\phi^j u_{t-j}$。由此

$$\mathbb E[\sigma_t^2]=m,\qquad \operatorname{Var}(\sigma_t^2)=\tau^2\sum_{j=0}^{\infty}\phi^{2j}=\frac{\tau^2}{1-\phi^2},\qquad \operatorname{Cov}(\sigma_t^2,\sigma_{t-k}^2)=\phi^k\frac{\tau^2}{1-\phi^2}.$$

第二步，收益本身的自相关。对 $k\ge 1$，$z_t$ 与 $(\sigma_t,\sigma_{t-k},z_{t-k})$ 独立，故

$$\mathbb E[\varepsilon_t\varepsilon_{t-k}]=\mathbb E[\sigma_t\sigma_{t-k}z_{t-k}]\,\mathbb E[z_t]=0,$$

即 $\operatorname{Cov}(\varepsilon_t,\varepsilon_{t-k})=0$，从而 $\rho_k(\varepsilon)=0$ 对一切 $k\ge1$ 成立。收益序列是鞅差序列，在二阶矩意义下完全不可预测，但它并不独立：下面的计算表明 $\{\varepsilon_t^2\}$ 存在显著的自相关。

第三步，平方收益的自相关。由 $\{z_t\}$ 与波动率过程独立且 $\mathbb E z_t^2=1$，$\mathbb E z_t^4=3$，

$$\operatorname{Cov}(\varepsilon_t^2,\varepsilon_{t-k}^2)=\mathbb E[\sigma_t^2\sigma_{t-k}^2z_t^2z_{t-k}^2]-\left(\mathbb E[\varepsilon_t^2]\right)^2=\mathbb E[\sigma_t^2\sigma_{t-k}^2]-m^2=\phi^k\frac{\tau^2}{1-\phi^2},$$

$$\operatorname{Var}(\varepsilon_t^2)=\mathbb E[\sigma_t^4]\,\mathbb E[z_t^4]-m^2=3\left(m^2+\frac{\tau^2}{1-\phi^2}\right)-m^2=2m^2+\frac{3\tau^2}{1-\phi^2}.$$

两式相除并约去 $1-\phi^2$，得

$$\rho_k(\varepsilon^2)=\phi^k\,\frac{\tau^2}{3\tau^2+2m^2(1-\phi^2)},\qquad k\ge 1.$$

第四步，绝对收益的自相关。$\mathbb E|\varepsilon_t|=\mathbb E[\sigma_t]\,\mathbb E|z_t|=\sqrt{2/\pi}\,\mathbb E[\sigma_t]$，且

$$\operatorname{Cov}(|\varepsilon_t|,|\varepsilon_{t-k}|)=\frac{2}{\pi}\operatorname{Cov}(\sigma_t,\sigma_{t-k}).$$

当 $\{u_t\}$ 为正态时 $(\sigma_t^2,\sigma_{t-k}^2)$ 服从二元正态分布且相关系数为 $\phi^k>0$；由 Hoeffding 协方差恒等式，正象限相依的两个随机变量经单调递增函数变换后协方差同号，故 $\operatorname{Cov}(\sigma_t,\sigma_{t-k})>0$，$\{|\varepsilon_t|\}$ 的自相关严格为正。

第五步，代入数值。$m=4\times10^{-4}$ 给出日均波动率 $\sqrt m=2\%$；$1-\phi^2=0.2775$，$\tau^2=4\times10^{-8}$，$\operatorname{Var}(\sigma_t^2)=1.4414\times10^{-7}$。于是

$$\rho_k(\varepsilon^2)=0.19157\times0.85^k,$$

即 $\rho_1=0.163$，$\rho_2=0.138$，$\rho_5=0.085$，$\rho_{10}=0.038$，$\rho_{20}=0.0074$；而 $\rho_k(\varepsilon)\equiv0$。由命题 29.3，超额峰度为 $3\operatorname{Var}(\sigma_t^2)/m^2=2.70$，峰度达 $5.70$，远高于正态的 $3$。

这个三参数的简单模型同时再现了三条典型事实：收益本身不相关、平方收益显著正相关且衰减缓慢、无条件分布尖峰厚尾。因此建模的关键不在于收益的均值方程，而在于条件方差方程的动力学形式。

还有两条典型事实值得在建模之前明确其定量含义。第一是长记忆与慢衰减。例 29.1 中的自相关按 $\phi^k$ 指数衰减，而实测的绝对收益自相关在很长的滞后范围内更接近双曲衰减 $c\,k^{2d-1}$，其中 $0<d<1/2$。当 $\phi$ 十分接近 $1$ 时，指数衰减在可观测的滞后阶数内与双曲衰减难以区分，这构成了「表观长记忆」；真正能给出双曲衰减的模型需要在条件方差方程中引入分式积分算子，将在 29.4 节讨论。第二是杠杆效应，其定量刻画是 $\operatorname{Cov}(\varepsilon_t,\sigma_{t+1}^2)<0$，即当期负收益抬高下一期波动率的幅度大于同幅度正收益。只要条件方差只通过 $\varepsilon_t^2$ 依赖过去，模型对正负冲击的反应就完全对称，无法产生这一负相关，因此需要引入对冲击符号敏感的项。

上述分析指明了一条建模路线：把条件方差写成过去平方残差的显式函数。最简单也最经典的实现就是 ARCH 模型。

## 29.2 条件异方差模型与 ARCH

**定义 29.4（ARCH(q) 模型）**

设 $\{z_t\}$ 为独立同分布序列，$\mathbb E z_t=0$，$\mathbb E z_t^2=1$。称 $\{r_t\}$ 服从 $q$ 阶自回归条件异方差模型，记作 ARCH($q$)，若

$$\varepsilon_t=\sigma_t z_t,\qquad \sigma_t^2=\omega+\sum_{i=1}^{q}\alpha_i\varepsilon_{t-i}^2,\tag{29.4}$$

其中 $\omega>0$，$\alpha_i\ge 0$（$i=1,\dots,q$），$\varepsilon_t=r_t-\mu_t$，而 $\mu_t=\mathbb E[r_t\mid\mathcal F_{t-1}]$ 由某个均值方程给出。

参数约束是定义的组成部分：因为 $\alpha_i\ge0$ 且 $\omega>0$，式（29.4）给出 $\sigma_t^2\ge\omega>0$，条件方差自动为正；若允许某个 $\alpha_i$ 取负值，则存在历史路径使 $\sigma_t^2\le0$，模型便失去意义。$\{z_t\}$ 的具体分布在此处不作限定，它可以是标准正态、标准化 Student-t 或标准化广义误差分布，条件分布的选择在 29.5 节单独讨论。
在 ARCH(1) 的特殊情形，记 $\alpha=\alpha_1$，条件方差递推为 $\sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2$。下面先区分严格平稳解的存在性与二阶矩的存在性，再计算各阶矩。

**定理 29.5（ARCH(1) 的平稳解与无条件方差）**

设 $\varepsilon_t=\sigma_t z_t$，$\sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2$，其中 $\omega>0$，$\alpha\ge0$，$\{z_t\}$ 独立同分布，$\mathbb E z_t=0$，$\mathbb E z_t^2=1$，且 $z_t$ 与 $\mathcal F_{t-1}$ 独立。若 $0\le\alpha<1$，则模型存在唯一的可积因果严格平稳解，该解具有有限二阶矩且协方差平稳。反之，任一具有有限方差的平稳解都必须满足 $\alpha<1$，其无条件方差为 $\omega/(1-\alpha)$，且收益在任意非零滞后处不相关。

**证明**

由 $\varepsilon_{t-1}^2=\sigma_{t-1}^2z_{t-1}^2$，条件方差可写成随机系数递推 $\sigma_t^2=\omega+\alpha z_{t-1}^2\sigma_{t-1}^2$。连续迭代 $n$ 次，得到

$$\begin{aligned}
S_{t,n}&=1+\sum_{j=1}^{n}\alpha^j\prod_{i=1}^{j}z_{t-i}^2,\\
\sigma_t^2&=\omega S_{t,n-1}+\alpha^n\left(\prod_{i=1}^{n}z_{t-i}^2\right)\sigma_{t-n}^2 .
\end{aligned}\tag{29.5}$$

这里 $S_{t,n}$ 只含时刻 $t-1$ 及更早的创新，因而给出因果构造。
由于各乘积项非负，且独立性给出 $\mathbb E(\alpha^j\prod_{i=1}^{j}z_{t-i}^2)=\alpha^j$，单调收敛定理推出 $\mathbb E S_{t,\infty}=\sum_{j=0}^{\infty}\alpha^j=1/(1-\alpha)<\infty$。所以 $S_{t,\infty}$ 几乎必然有限。定义 $\sigma_t^2=\omega S_{t,\infty}$，由 $S_{t,\infty}=1+\alpha z_{t-1}^2S_{t-1,\infty}$ 可知它满足原递推。它是同一份平稳创新序列的固定因果函数，故严格平稳，并且 $\mathbb E\sigma_t^2=\omega/(1-\alpha)$。

为证唯一性，设 $\widetilde\sigma_t^2$ 是另一可积因果平稳解，令 $\Delta_t=\sigma_t^2-\widetilde\sigma_t^2$。则 $\Delta_t=\alpha z_{t-1}^2\Delta_{t-1}$，迭代后取绝对值期望，利用 $\Delta_{t-n}$ 与随后创新的独立性以及平稳性，得 $\mathbb E|\Delta_t|\le\alpha^n\mathbb E|\Delta_{t-n}|=\alpha^n\mathbb E|\Delta_0|\to0$。故 $\Delta_t=0$ 几乎必然成立。

若平稳解的方差有限，记 $m=\mathbb E\varepsilon_t^2$。因为 $z_t$ 与 $\sigma_t$ 独立，$m=\mathbb E\sigma_t^2$；对递推式取期望，有 $m=\omega+\alpha m$，即 $(1-\alpha)m=\omega$。右端为正，故必有 $\alpha<1$。对 $k\ge1$，变量 $\sigma_t$ 与 $\varepsilon_{t-k}$ 都是 $\mathcal F_{t-1}$ 可测的，因此 $\mathbb E[\varepsilon_t\varepsilon_{t-k}\mid\mathcal F_{t-1}]=\sigma_t\varepsilon_{t-k}\mathbb E z_t=0$。于是

$$m=\operatorname{Var}(\varepsilon_t)=\frac{\omega}{1-\alpha},\qquad \mathbb E\varepsilon_t=0,\qquad \operatorname{Cov}(\varepsilon_t,\varepsilon_{t-k})=0,\quad k\ge1.\tag{29.6}$$

这同时证明了方差公式与不相关性。

□
**定理 29.6（ARCH(1) 的四阶矩条件）**

在定理 29.5 的平稳解中，设 $\kappa_z=\mathbb E z_t^4<\infty$，并记 $M=\mathbb E\varepsilon_t^4$。则 $M$ 有限当且仅当 $\kappa_z\alpha^2<1$。在此条件下，

$$M=\frac{\kappa_z\omega^2(1+\alpha)}{(1-\alpha)(1-\kappa_z\alpha^2)},\qquad \frac{M}{m^2}-3=\frac{\kappa_z-3+2\kappa_z\alpha^2}{1-\kappa_z\alpha^2}.\tag{29.7}$$

**证明**

先证充分性。令 $\sigma_{t,0}^2=\omega$，并递归定义 $\sigma_{t,n}^2=\omega+\alpha z_{t-1}^2\sigma_{t-1,n-1}^2$。直接迭代可得 $\sigma_{t,n}^2=\omega S_{t,n}$，故它逐点单调趋于平稳解的 $\sigma_t^2$。记 $Q_n=\mathbb E\sigma_{t,n}^4$、$m_n=\mathbb E\sigma_{t,n}^2$。将递推式平方，利用 $z_{t-1}$ 与 $\sigma_{t-1,n-1}$ 的独立性，得

$$Q_n=\omega^2+2\omega\alpha m_{n-1}+\kappa_z\alpha^2Q_{n-1}.$$

由于 $m_{n-1}\le m=\omega/(1-\alpha)$，置 $C=\omega^2+2\omega\alpha m$、$\rho=\kappa_z\alpha^2$，便有 $Q_n\le C+\rho Q_{n-1}$。递推这一不等式给出 $Q_n\le C\sum_{j=0}^{n-1}\rho^j+\rho^n\omega^2$。当 $\rho<1$ 时右端一致有界，单调收敛定理于是给出 $\mathbb E\sigma_t^4=\lim_nQ_n<\infty$，从而 $M=\kappa_z\mathbb E\sigma_t^4<\infty$。
再计算极限矩。对平稳递推式平方并取期望，独立性使交叉项只含 $\mathbb E z_{t-1}^2=1$，故 $Q=\mathbb E\sigma_t^4$ 满足 $Q=\omega^2+2\omega\alpha m+\rho Q$。若 $Q<\infty$，移项得到 $(1-\rho)Q=\omega^2+2\omega\alpha m>0$，所以 $\rho<1$，必要性成立；并且在充分性条件下，

$$Q=\frac{\omega^2+2\omega\alpha m}{1-\rho}=\frac{\omega^2(1+\alpha)}{(1-\alpha)(1-\rho)}.$$

代入 $M=\kappa_zQ$ 即得式（29.7）的第一式。再由 $m^2=\omega^2/(1-\alpha)^2$，有 $M/m^2=\kappa_z(1-\alpha^2)/(1-\kappa_z\alpha^2)$，减去 $3$ 并通分便得超额峰度公式。特别地，正态创新满足 $\kappa_z=3$，故四阶矩条件化为 $3\alpha^2<1$，超额峰度为 $6\alpha^2/(1-3\alpha^2)$，只要 $\alpha>0$ 就严格为正。

□

**例 29.2**

取日收益 ARCH(1) 模型的参数 $\omega=6\times10^{-5}$、$\alpha=0.4$，并设 $z_t$ 服从标准正态分布。求无条件波动率、四阶矩与超额峰度，并说明若 $\alpha=0.6$，二阶矩与四阶矩的结论有何不同。

**解**

由式（29.6），$m=6\times10^{-5}/0.6=10^{-4}$，所以无条件日波动率为 $\sqrt m=1\%$。四阶矩条件为 $3\alpha^2=0.48<1$。式（29.7）给出 $M=4.84615\times10^{-8}$，而 $m^2=10^{-8}$，故峰度 $M/m^2=4.84615$，超额峰度为 $0.96/0.52=1.84615$。若 $\alpha=0.6$，仍有 $\alpha<1$，无条件方差变为 $1.5\times10^{-4}$，对应日波动率约为 $1.225\%$；但 $3\alpha^2=1.08>1$，平稳解的四阶矩不再有限。这说明有限方差并不保证可定义峰度。
## 29.3 GARCH(1,1) 与波动率预测

ARCH($q$) 用较多滞后平方残差刻画波动的持续集聚，GARCH 则把滞后的条件方差也纳入递推，以很少参数产生更持久的波动记忆。

**定义 29.7（GARCH(1,1) 模型）**

设 $\{z_t\}$ 独立同分布，$\mathbb E z_t=0$，$\mathbb E z_t^2=1$，且 $z_t$ 与 $\mathcal F_{t-1}$ 独立。称 $\varepsilon_t=r_t-\mu_t$ 服从 GARCH(1,1) 模型，若 $\sigma_t$ 为 $\mathcal F_{t-1}$ 可测，并且

$$\varepsilon_t=\sigma_t z_t,\qquad \sigma_t^2=\omega+\alpha\varepsilon_{t-1}^2+\beta\sigma_{t-1}^2,\tag{29.8}$$

其中 $\omega>0$，$\alpha\ge0$，$\beta\ge0$，$\mu_t=\mathbb E[r_t\mid\mathcal F_{t-1}]$。

参数约束先保证模型在每一条历史路径上都有意义。给定正的初始条件方差，若 $\sigma_{t-1}^2\ge\omega$，则 $\varepsilon_{t-1}^2\ge0$ 与 $\alpha,\beta\ge0$ 推出 $\sigma_t^2\ge\omega>0$；归纳可知所有条件方差均为正。若 $\alpha$ 或 $\beta$ 为负，便可能选择足够大的相应滞后项使右端非正，因此非负约束不能省略。$\beta=0$ 时退化为 ARCH(1)，而 $\beta>0$ 使未观测的波动状态自身具有递推动力学。

**定理 29.8（GARCH(1,1) 的平稳条件与无条件方差）**

在定义 29.7 中令 $\phi=\alpha+\beta$。若 $0\le\phi<1$，模型存在唯一的可积因果严格平稳解，且该解协方差平稳。反之，任一具有有限方差的平稳解都满足 $\phi<1$。平稳解的无条件方差为 $\omega/(1-\phi)$，收益在所有非零滞后处不相关。
**证明**

把 $\varepsilon_{t-1}^2=\sigma_{t-1}^2z_{t-1}^2$ 代入式（29.8），得 $\sigma_t^2=\omega+A_{t-1}\sigma_{t-1}^2$，其中 $A_t=\alpha z_t^2+\beta$。连续迭代 $n$ 次，右端为 $\omega(1+\sum_{j=1}^{n-1}\prod_{i=1}^{j}A_{t-i})+(\prod_{i=1}^{n}A_{t-i})\sigma_{t-n}^2$。由于 $A_t$ 独立同分布且 $\mathbb E A_t=\phi$，有 $\mathbb E\prod_{i=1}^{j}A_{t-i}=\phi^j$。

构造 $H_t=\omega(1+\sum_{j=1}^{\infty}\prod_{i=1}^{j}A_{t-i})$。各项非负，单调收敛定理给出 $\mathbb E H_t=\omega\sum_{j=0}^{\infty}\phi^j=\omega/(1-\phi)<\infty$，故 $H_t$ 几乎必然有限。把首项 $A_{t-1}$ 从每个乘积中提出，可验证 $H_t=\omega+A_{t-1}H_{t-1}$。此外，$H_t$ 是同一独立同分布创新序列的固定因果函数，所以 $\sigma_t^2=H_t$ 给出严格平稳解。

任取另一可积因果平稳解 $\widetilde\sigma_t^2$，其迭代余项满足 $\mathbb E[(\prod_{i=1}^{n}A_{t-i})\widetilde\sigma_{t-n}^2]=\phi^n\mathbb E\widetilde\sigma_0^2\to0$；同时有限乘积和依 $L^1$ 收敛到 $H_t$。因此 $\widetilde\sigma_t^2=H_t$ 几乎必然成立，唯一性得证。

再从原式单独迭代 $\beta\sigma_{t-1}^2$，得到 $\sigma_t^2=\omega\sum_{j=0}^{n-1}\beta^j+\alpha\sum_{j=1}^{n}\beta^{j-1}\varepsilon_{t-j}^2+\beta^n\sigma_{t-n}^2$。因 $0\le\beta<1$，余项依 $L^1$ 趋于零，两个级数的部分和也非负单调并依 $L^1$ 收敛。综合两种展开，平稳解具有递归乘积表示与 ARCH($\infty$) 表示

$$\sigma_t^2=\omega\left(1+\sum_{j=1}^{\infty}\prod_{i=1}^{j}A_{t-i}\right)=\frac{\omega}{1-\beta}+\alpha\sum_{j=1}^{\infty}\beta^{j-1}\varepsilon_{t-j}^2 .\tag{29.9}$$

第二式说明遥远的平方冲击以几何速度 $\beta^{j-1}$ 衰减，而每期新冲击又进入下一期的随机系数递推。
最后计算二阶矩。若平稳解具有有限方差，记 $m=\mathbb E\varepsilon_t^2$。由 $z_t$ 与 $\sigma_t$ 的独立性，$m=\mathbb E\sigma_t^2$。对式（29.8）取期望，得 $m=\omega+\alpha m+\beta m=\omega+\phi m$，即 $(1-\phi)m=\omega$。因为 $\omega>0$，所以必有 $\phi<1$；反之，前述构造已经给出有限二阶矩的平稳解。对 $k\ge1$，$\sigma_t$ 和 $\varepsilon_{t-k}$ 均为 $\mathcal F_{t-1}$ 可测，故 $\mathbb E[\varepsilon_t\varepsilon_{t-k}\mid\mathcal F_{t-1}]=\sigma_t\varepsilon_{t-k}\mathbb E z_t=0$。综上，

$$m=\operatorname{Var}(\varepsilon_t)=\frac{\omega}{1-\alpha-\beta},\qquad \mathbb E\varepsilon_t=0,\qquad \operatorname{Cov}(\varepsilon_t,\varepsilon_{t-k})=0,\quad k\ge1.\tag{29.10}$$

此外，$\mathbb E[\varepsilon_t^2\mid\mathcal F_{t-1}]=\sigma_t^2$，所以收益本身不相关并不意味着平方收益不相关。

□

### 29.3.1 协方差与相关结构

平方收益的自相关揭示了波动率集聚的时间尺度。为给出显式公式，以下设 $z_t$ 服从标准正态分布，记 $\phi=\alpha+\beta$、$\psi=\beta^2+2\alpha\beta+3\alpha^2$，并要求 $\phi<1$ 与 $\psi<1$。后一条件正是正态 GARCH(1,1) 的有限四阶矩条件，而不能由有限方差条件单独推出。

事实上，对 $\sigma_t^2=\omega+A_{t-1}\sigma_{t-1}^2$ 平方并取期望，由 $\mathbb E A_t=\phi$、$\mathbb E A_t^2=\psi$，得到 $Q=\mathbb E\sigma_t^4$ 的方程 $Q=\omega^2+2\omega\phi m+\psi Q$。若 $Q$ 有限，则 $(1-\psi)Q=\omega^2+2\omega\phi m>0$，故 $\psi<1$。反过来，令 $H_{t,0}=\omega$、$H_{t,n}=\omega+A_{t-1}H_{t-1,n-1}$，平方后取期望给出 $Q_n=\omega^2+2\omega\phi m_{n-1}+\psi Q_{n-1}$。因 $m_{n-1}\le m$，递推不等式 $Q_n\le\omega^2+2\omega\phi m+\psi Q_{n-1}$；当 $\psi<1$ 时 $Q_n$ 一致有界，单调收敛定理遂保证 $Q<\infty$。
**命题 29.9（平方收益的协方差与相关结构）**

在 $\phi<1$、$\psi<1$ 及正态创新的条件下，令 $Y_t=\varepsilon_t^2$，$\gamma_k=\operatorname{Cov}(Y_t,Y_{t-k})$，$\rho_k=\gamma_k/\gamma_0$，并记 $N=1-2\alpha\beta-\beta^2$。则

$$\gamma_0=\frac{2m^2N}{1-\psi},\qquad \gamma_k=\phi^{k-1}\frac{2\alpha m^2(1-\beta\phi)}{1-\psi},\qquad \rho_k=\phi^{k-1}\frac{\alpha(1-\beta\phi)}{N},\quad k\ge1.\tag{29.11}$$

**证明**

由 $Q=\omega^2+2\omega\phi m+\psi Q$ 与 $m=\omega/(1-\phi)$，移项并化简得 $Q=\omega^2(1+\phi)/[(1-\phi)(1-\psi)]$，故 $\mathbb E Y_t= m$，$\mathbb E Y_t^2=3Q$。令 $\nu_t=Y_t-\sigma_t^2=\sigma_t^2(z_t^2-1)$。因为 $z_t$ 与 $\mathcal F_{t-1}$ 独立，$\nu_t$ 是均值为零的鞅差，且与所有 $\mathcal F_{t-1}$ 可测变量不相关；正态性又给出 $\delta=\operatorname{Var}(\nu_t)=Q\mathbb E(z_t^2-1)^2=2Q$。

把 $\sigma_t^2=Y_t-\nu_t$ 代入式（29.8），得到 ARMA 表示 $Y_t=\omega+\phi Y_{t-1}+\nu_t-\beta\nu_{t-1}$。取方差时，$Y_{t-1}$ 与 $\nu_t$ 不相关，而 $\operatorname{Cov}(Y_{t-1},\nu_{t-1})=\delta$，所以 $(1-\phi^2)\gamma_0=(1+\beta^2-2\phi\beta)\delta=N\delta$。另一方面，$\gamma_0=3Q-m^2=m^2[3(1-\phi^2)-(1-\psi)]/(1-\psi)=2m^2N/(1-\psi)$，两式一致。

对 $k\ge1$，将 ARMA 式两边与 $Y_{t-k}$ 取协方差。$k=1$ 时得到 $\gamma_1=\phi\gamma_0-\beta\delta$；$k\ge2$ 时得到 $\gamma_k=\phi\gamma_{k-1}$。代入 $\delta=2Q=2m^2(1-\phi^2)/(1-\psi)$，有 $\gamma_1=2m^2[\phi N-\beta(1-\phi^2)]/(1-\psi)=2\alpha m^2(1-\beta\phi)/(1-\psi)$。递推即得 $\gamma_k$，再除以 $\gamma_0$ 得 $\rho_k$。

□

式（29.11）表明，在公式适用的参数区域内，平方收益相关函数从一阶滞后以后按 $\phi$ 几何衰减；$\phi$ 越接近 $1$，波动集聚的相关记忆越持久，而 $\alpha$ 决定新冲击进入这一持续机制的直接强度。
### 29.3.2 多步波动率预测

在信息集 $\mathcal F_t$ 下，一期条件方差 $\sigma_{t+1}^2$ 已由式（29.8）确定。对 $h\ge1$，定义 $f_{t,h}=\mathbb E[\sigma_{t+h}^2\mid\mathcal F_t]$，于是 $f_{t,1}=\sigma_{t+1}^2$。当 $h\ge2$ 时，对式（29.8）取条件期望，并对 $s=t+h-1>t$ 使用塔性质：

$$\begin{aligned}
\mathbb E[\varepsilon_s^2\mid\mathcal F_t]
&=\mathbb E\!\left[\mathbb E[\varepsilon_s^2\mid\mathcal F_{s-1}]\mid\mathcal F_t\right]
=\mathbb E[\sigma_s^2\mid\mathcal F_t],\\
f_{t,h}&=\omega+(\alpha+\beta)f_{t,h-1}=\omega+\phi f_{t,h-1}.
\end{aligned}$$

由 $f_{t,2}=\omega+\phi f_{t,1}=m+\phi(f_{t,1}-m)$ 开始归纳；若第 $h-1$ 步公式成立，则 $f_{t,h}=\omega+\phi[m+\phi^{h-2}(f_{t,1}-m)]=m+\phi^{h-1}(f_{t,1}-m)$。因此全部 horizons 的预测为

$$f_{t,h}=\omega\frac{1-\phi^{h-1}}{1-\phi}+\phi^{h-1}\sigma_{t+1}^2=m+\phi^{h-1}\left(\sigma_{t+1}^2-m\right),\qquad h\ge1.\tag{29.12}$$

同一塔性质还给出 $\mathbb E[\varepsilon_{t+h}^2\mid\mathcal F_t]=f_{t,h}$。因为 $0\le\phi<1$，当 $h\to\infty$ 时 $f_{t,h}\to m$：当前波动率偏高时预测向下回归，偏低时向上回归；$\phi$ 决定回归速度，而收敛值只由长期无条件方差决定。

**例 29.3**

设正态 GARCH(1,1) 模型的参数为 $\omega=2\times10^{-6}$、$\alpha=0.06$、$\beta=0.92$，并已知 $\sigma_{t+1}^2=1.44\times10^{-4}$。求长期方差以及 $5$ 期和 $20$ 期条件方差预测。

**解**

这里 $\phi=0.98<1$，长期方差 $m=2\times10^{-6}/0.02=10^{-4}$，对应长期日波动率 $1\%$。由式（29.12），$f_{t,5}=10^{-4}+0.98^4(1.44\times10^{-4}-10^{-4})=1.40584\times10^{-4}$，而 $f_{t,20}=10^{-4}+0.98^{19}(1.44\times10^{-4}-10^{-4})=1.29975\times10^{-4}$。两者均高于长期方差，但随着预测期增加而逐步靠近 $10^{-4}$；一期后的高波动状态仍具有较长影响。
### 29.3.3 News Impact Curve 与杠杆效应

News Impact Curve 固定 $\sigma_t^2=s^2$，把当期冲击 $x=\varepsilon_t$ 映射到下一期条件方差，用来分离冲击大小与冲击符号的作用。标准 GARCH 与 GJR 模型的曲线分别为

$$\begin{aligned}
N_{\mathrm G}(x)&=\omega+\beta s^2+\alpha x^2,\\
N_{\mathrm{GJR}}(x)&=\omega+\beta s^2+\alpha x^2+\gamma\mathbf 1_{\{x<0\}}x^2 .
\end{aligned}\tag{29.13}$$

第一式就是式（29.8）在固定 $s^2$ 后的图像：它是关于纵轴对称的抛物线，导数为 $2\alpha x$，二阶导数为 $2\alpha$。因此正、负同幅度冲击产生完全相同的方差增量，$\alpha$ 控制新闻影响强度，$\beta$ 控制已有波动状态的延续。若创新条件分布对称，则 $\mathbb E\varepsilon_t^3=\mathbb E\sigma_t^3\,\mathbb E z_t^3=0$，并且 $\mathbb E[\varepsilon_t\sigma_t^2]=0$，从而 $\operatorname{Cov}(\varepsilon_t,\sigma_{t+1}^2)=\alpha\mathbb E\varepsilon_t^3=0$。这从协方差角度解释了标准 GARCH 无法生成负收益后波动上升更多的杠杆效应。

GJR 模型在递推中加入负冲击指示项，即把 $\alpha\varepsilon_{t-1}^2$ 改为 $\alpha\varepsilon_{t-1}^2+\gamma\mathbf 1_{\{\varepsilon_{t-1}<0\}}\varepsilon_{t-1}^2$。取 $\omega>0$、$\alpha,\beta,\gamma\ge0$ 可继续保持条件方差为正。对 $a>0$，负冲击 $-a$ 相比正冲击 $a$ 多产生 $\gamma a^2$ 的方差增量；当 $\gamma>0$ 时，曲线左半支更陡，直接刻画利空消息与利好消息的不对称影响。

EGARCH 则在对数方差方程中分别放入标准化冲击的绝对值与符号：

$$\log\sigma_{t+1}^2=\omega+\beta\log\sigma_t^2+\alpha\left(|z_t|-\mathbb E|z_t|\right)+\gamma z_t,\qquad \varepsilon_t=\sigma_tz_t.\tag{29.14}$$

指数还原后条件方差自动为正，因此不必靠对 $\alpha,\beta$ 的非负限制维持正性。绝对值项刻画冲击规模，符号项刻画方向；对 $a>0$，比较 $z_t=-a$ 与 $z_t=a$，对数方差之差为 $-2\gamma a$。故 $\gamma<0$ 表示负冲击引起更强的波动反应。GJR 直接在方差水平上加惩罚项，EGARCH 则在对数尺度上乘法式地调整波动，两者都源于打破对称 News Impact Curve 的同一动机。
在实证比较中，还应同时考察非对称参数的显著性、样本外波动预测与尾部风险度量，避免仅凭样本内拟合判断杠杆机制的优劣。

### 29.3.4 条件高斯极大似然补充

GARCH 的参数不能由平方收益的一次回归直接得到，因为每期方差都由既有参数递推生成。条件高斯极大似然把这条递推与观测密度联合起来；真实创新并不正态时，它仍可作为准极大似然方法，但标准误必须采用稳健形式。

**定义 29.10（GARCH 条件高斯准似然）**

设收益分解为 $r_t=\mu_t(\theta)+\varepsilon_t$，其中 $\mu_t(\theta)$ 只依赖 $\mathcal F_{t-1}$，且 $\varepsilon_t=\sigma_t z_t$。在 GARCH(1,1) 下，参数向量 $\theta$ 包含均值参数以及 $\omega,\alpha,\beta$，从给定初值逐期计算方差，并定义条件高斯对数似然

$$\begin{aligned}
\sigma_t^2(\theta)&=\omega+\alpha\varepsilon_{t-1}^2(\theta)+\beta\sigma_{t-1}^2(\theta),\\
\ell_T(\theta)&=\sum_{t=1}^{T}\left[-\frac12\log(2\pi)-\frac12\log\sigma_t^2(\theta)-\frac{\varepsilon_t^2(\theta)}{2\sigma_t^2(\theta)}\right],\\
\sigma_0^2(\theta)&=\frac{\omega}{1-\alpha-\beta},\qquad \varepsilon_0(\theta)=0 .
\end{aligned}\tag{29.15}$$

式（29.15）的无条件方差初值只适用于 $\alpha+\beta<1$。实践中也可令 $\sigma_0^2$ 等于全样本方差，或用样本前段平方收益的指数加权反推值；关键是明确同一初始化规则如何随参数变化，并在估计前剔除预热期以减轻初值影响。条件正态只用于构造目标函数，并不要求标准化残差事后必然服从正态分布。

为保证每一期递推方差为正并产生通常的有限方差平稳解释，取约束参数空间与数值更新

$$\begin{aligned}
\widehat\theta&=\arg\max_{\theta\in\Theta}\ell_T(\theta),\qquad
\Theta=\{\theta:\omega>0,\ \alpha\ge0,\ \beta\ge0,\ \alpha+\beta<1\},\\
\theta^{(k+1)}&=\theta^{(k)}+\lambda_k H_k^{-1}\nabla\ell_T(\theta^{(k)}),\qquad 0<\lambda_k\le1 .
\end{aligned}\tag{29.16}$$

其中 $H_k$ 可取负 Hessian 或 BHHH 外积矩阵，步长 $\lambda_k$ 由回溯搜索确定，遇到不可行点或目标函数下降则缩短步长。实际计算宜以日方差量级重标定 $\omega$，对对数参数或对数比参数优化以实施约束，并从多个初值出发比较最终似然。收敛检查应同时覆盖梯度、参数位移与目标函数位移，而不能只依赖迭代次数。正态设定错误时， sandwich 协方差由得分外积与 Hessian 共同构成；仅报告普通高斯 Hessian 的标准误会忽略厚尾造成的修正。
## 29.4 GARCH 族扩展

式（29.13）与式（29.14）已说明 GJR 和 EGARCH 如何打破对称新闻影响曲线。本节不再重复其基本图形，而是考察正性、持续性、幂次变换与记忆结构。不同扩展并非单纯增加参数：有些改变冲击进入方差的方式，有些改变衰减速度，还有些放弃有限无条件方差以换取样本内的高持续性。

### 29.4.1 非对称与幂次模型

EGARCH 的对数方差表示适合冲击比例效应明显、且不希望以非负约束限制系数的情形。其平稳性应对对数方差递推判断，而不能直接套用 GARCH 的 $\alpha+\beta<1$。GJR 保留方差水平递推，便于解释新增方差与计算多步预测，但条件期望中的负冲击概率必须进入持续性参数。

**命题 29.11（GJR 的有限方差平稳条件）**

设 $z_t$ 独立同分布、关于零对称，$\mathbb E z_t=0$，$\mathbb E z_t^2=1$，且 $\mathbb P(z_t<0)=1/2$。GJR(1,1) 的随机系数记为 $A_t=\beta+\alpha z_t^2+\gamma\mathbf 1_{\{z_t<0\}}z_t^2$。若 $\omega>0$、$\alpha,\beta,\gamma\ge0$，且 $\bar\phi=\alpha+\gamma/2+\beta<1$，则模型存在唯一的因果、有限二阶矩平稳解，其无条件方差为 $m=\omega/(1-\bar\phi)$。

**证明**

将模型写成 $\sigma_t^2=\omega+A_{t-1}\sigma_{t-1}^2$。由对称性和独立同分布假设，$\mathbb E A_t=\beta+\alpha\mathbb E z_t^2+\gamma\mathbb E z_t^2/2=\bar\phi$。从 $H_{t,0}=\omega$ 起，以 $H_{t,n}=\omega+A_{t-1}H_{t-1,n-1}$ 递推。所得过程均平稳，且 $H_{t,n}$ 单调不减；令 $m_n=\mathbb E H_{t,n}$，则 $m_n=\omega+\bar\phi m_{n-1}\le\omega/(1-\bar\phi)$，故单调收敛定理给出几乎必然极限 $H_t$，且 $\mathbb E H_t=\omega/(1-\bar\phi)$。$H_t$ 满足原递推并只依赖当前及过去的创新。

对任意另一可积因果平稳解 $\widetilde\sigma_t^2$，迭代 $n$ 次后的余项期望为 $\bar\phi^n\mathbb E\widetilde\sigma_{t-n}^2\to0$，而有限乘积部分依 $L^1$ 收敛到 $H_t$，故两解几乎必然相同。最后，由 $\varepsilon_t=\sigma_tz_t$ 及 $z_t$ 与 $\sigma_t$ 独立，$\mathbb E\varepsilon_t^2=\mathbb E\sigma_t^2$，从而得到所述 $m$。若有限二阶矩平稳解存在，取期望又迫使 $1-\bar\phi>0$，所以该条件在此类解中也是必要的。

□

非对称参数使有效持续性由平均负冲击贡献决定，而不是简单等于 $\alpha+\beta+\gamma$。若分布仍对称但 $\mathbb P(z_t=0)>0$，上述证明中的指示项期望仍可单独计算，结论只需把 $1/2$ 换成相应的加权平方冲击矩。
当冲击的幂次也需要由数据决定时，可分别在标准差与 $\delta$ 次幂尺度上采用 TGARCH 与 APARCH：

$$\begin{aligned}
\sigma_t&=\omega+\beta\sigma_{t-1}+\left(\alpha+\gamma\mathbf 1_{\{\varepsilon_{t-1}<0\}}\right)|\varepsilon_{t-1}|,\\
\sigma_t^\delta&=\omega+\beta\sigma_{t-1}^\delta+\alpha\left(|\varepsilon_{t-1}|-\gamma\varepsilon_{t-1}\right)^\delta,\qquad \delta>0 .
\end{aligned}\tag{29.17}$$

通常取 $\omega>0$、$\alpha,\beta\ge0$，TGARCH 再取 $\alpha+\gamma\ge0$，APARCH 取 $|\gamma|\le1$，从而保证递推量非负。APARCH 中 $\delta=2,\gamma=0$ 退化为标准 GARCH；$\delta<2$ 降低极端平方冲击的支配程度，适合绝对收益比平方收益更近似线性记忆的市场。TGARCH 直接建模标准差，便于把波动率的绝对变化解释为冲击幅度的函数；APARCH 则以额外参数联合估计非对称和幂次，计算成本更高，也更需要检查参数识别。

**例 29.4**

某对称创新的 GJR(1,1) 模型取 $\omega=10^{-6}$、$\alpha=0.03$、$\gamma=0.06$、$\beta=0.90$。已知 $\varepsilon_t=-0.02$、$\sigma_t^2=10^{-4}$，求下一期方差、同幅正冲击下的下一期方差以及长期方差。

**解**

负冲击满足指示条件，故 $\sigma_{t+1}^2=10^{-6}+0.03(0.0004)+0.06(0.0004)+0.90(0.0001)=1.27\times10^{-4}$。若 $\varepsilon_t=0.02$，指示项消失，下一期方差为 $1.03\times10^{-4}$。两者相差 $0.06(0.0004)=2.4\times10^{-5}$。有效持续性为 $\bar\phi=0.03+0.06/2+0.90=0.96<1$，由命题 29.11，长期方差为 $10^{-6}/(1-0.96)=2.5\times10^{-5}$。因此当期高波动预测可以与较低的长期方差并存。
### 29.4.2 积分与长记忆扩展

估计出的 $\alpha+\beta$ 常接近一，但“接近单位根”与“强制单位根”具有不同的概率含义。IGARCH 把两者之和固定为一；FIGARCH 则用分数差分产生双曲线衰减的 ARCH($\infty$) 权重。一种常用写法为

$$\begin{aligned}
\sigma_t^2&=\omega+\alpha\varepsilon_{t-1}^2+(1-\alpha)\sigma_{t-1}^2,\\
(1-\beta L)\sigma_t^2&=\omega+\left[1-\beta L-(1-\phi L)(1-L)^d\right]\varepsilon_t^2,\qquad 0<d<1 .
\end{aligned}\tag{29.18}$$

第一式是 IGARCH(1,1)。第二式中 $L$ 为滞后算子，$\phi$ 是短记忆多项式的局部参数，不应与前文 $\alpha+\beta$ 的记号混淆。系数非负与方差正性需结合 $\beta,\phi,d$ 另行验证，不能只检查 $d$ 的范围。

**定理 29.12（IGARCH 不存在有限方差平稳解）**

设 $\omega>0$，且 IGARCH(1,1) 中 $\alpha\ge0$、$\beta=1-\alpha\ge0$。则该递推不存在具有有限、严格正无条件二阶矩的因果协方差平稳解。

**证明**

反设存在这样的解，并令 $m=\mathbb E\varepsilon_t^2=\mathbb E\sigma_t^2$，其中 $0<m<\infty$。对任意 $t$，由 $z_t$ 与 $\mathcal F_{t-1}$ 独立以及 $\mathbb E z_t^2=1$，有 $\mathbb E[\varepsilon_{t-1}^2\mid\mathcal F_{t-2}]=\sigma_{t-1}^2$。对 IGARCH 递推取无条件期望，协方差平稳性给出 $m=\omega+\alpha m+(1-\alpha)m=\omega+m$，从而 $\omega=0$，与 $\omega>0$ 矛盾。等价地，从有限期望的初值 $m_0$ 向前递推会得到 $m_t=m_0+t\omega$，不可能等于有限常数。因此单位根在这里排除的是有限二阶矩平稳性，而不是逻辑上排除一切严格平稳、无限方差的解。

□

IGARCH 适合样本跨度内波动率水平漂移明显、预测不愿强制回归固定长期方差的情形；其多期方差预测保留当前水平，却也使长期风险资本解释更困难。若数据同时呈现快速短期衰减和极慢的远期衰减，FIGARCH 往往比强行提高 GARCH 持续性更灵活。

分数差分的核心可由下式看清：

$$\begin{aligned}
1-(1-L)^d&=\sum_{j=1}^{\infty}\psi_jL^j,\\
\psi_j&=\frac{d\Gamma(j-d)}{\Gamma(1-d)\Gamma(j+1)}
\sim \frac{d}{\Gamma(1-d)}j^{-(1+d)},\qquad j\to\infty .
\end{aligned}\tag{29.19}$$

系数按幂律而非几何速度衰减，因此较久远的冲击仍影响当前方差。完整 FIGARCH 还把这些系数与短记忆多项式复合；其适用性应通过权重非负、样本外预测及与局部水平漂移模型的比较来检验。幂律权重本身并不自动证明收益平方具有可求和性失败的自相关函数，后者还需相应矩条件。
## 29.5 条件分布与厚尾

条件方差刻画分散程度，却不决定尾部形状。高斯 GARCH 可以凭随机波动的混合产生无条件厚尾，但其一步向前标准化创新仍是正态；若极端标准化残差持续出现，就应直接调整条件分布。估计时只需把式（29.15）中每期高斯对数密度换成所选单位方差密度的对数，方差递推和数值约束仍可保留。

### 29.5.1 Student-t 与 GED 创新

**定义 29.13（单位方差厚尾创新）**

标准化 Student-t 与广义误差分布 GED 的密度分别定义为

$$\begin{aligned}
f_t(z;\nu)&=\frac{\Gamma((\nu+1)/2)}{\Gamma(\nu/2)\sqrt{\pi(\nu-2)}}
\left(1+\frac{z^2}{\nu-2}\right)^{-(\nu+1)/2},\qquad \nu>2,\\
f_G(z;\nu,\lambda)&=\frac{\nu}{\lambda 2^{1+1/\nu}\Gamma(1/\nu)}
\exp\left(-\frac12\left|\frac{z}{\lambda}\right|^\nu\right),\\
\lambda&=\left[2^{-2/\nu}\frac{\Gamma(1/\nu)}{\Gamma(3/\nu)}\right]^{1/2},\qquad \nu>0 .
\end{aligned}\tag{29.20}$$

这里两种分布都已缩放为单位方差，因而 $\sigma_t^2$ 始终表示条件方差，不会与分布的尺度参数混淆。Student-t 的 $\nu$ 是自由度，越小则幂律尾越重；GED 的 $\nu$ 是形状参数，$\nu=2$ 对应正态，$\nu<2$ 时密度峰度更高且尾部相对正态更厚。二者的参数角色不同，不能仅凭同一个符号比较数值。

**命题 29.14（标准化 Student-t 的矩与尾部）**

设 $Z$ 服从式（29.20）的标准化 Student-t 分布。则 $\mathbb E|Z|^q<\infty$ 当且仅当 $q<\nu$；当 $\nu>4$ 时，$\operatorname{Var}(Z)=1$，且

$$\mathbb E Z^4=\frac{3(\nu-2)}{\nu-4},\qquad \mathbb P(Z>z)\sim C_\nu z^{-\nu},\quad z\to\infty,$$

其中 $C_\nu>0$ 只依赖 $\nu$。

**证明**

由密度表达式，存在常数 $c_\nu>0$，使 $f_t(z;\nu)\sim c_\nu z^{-(\nu+1)}$。对 $q>0$，矩积分在无穷远处的被积函数满足 $|z|^qf_t(z;\nu)\sim c_\nu |z|^{q-\nu-1}$，而幂函数在无穷远可积当且仅当指数小于 $-1$，所以矩条件恰为 $q<\nu$。对称性给出零均值和零三阶矩。

令 $X=Z\sqrt{\nu/(\nu-2)}$，则 $X$ 是尺度为 $1$ 的通常 Student-t 变量。对密度乘以 $x^2$ 或 $x^4$ 后使用 $u=x^2$ 的 Beta 积分，分别得到 $\mathbb E X^2=\nu/(\nu-2)$ 与 $\mathbb E X^4=3\nu^2/[(\nu-2)(\nu-4)]$，后一式要求 $\nu>4$。代回缩放关系即得 $\operatorname{Var}(Z)=1$ 和所述四阶矩。最后，对尾部渐近式积分，

$$\mathbb P(Z>z)=\int_z^\infty f_t(x;\nu)\,dx\sim\frac{c_\nu}{\nu}z^{-\nu},$$

故取 $C_\nu=c_\nu/\nu$ 即可。幂律尾也解释了为何 $\nu\le4$ 时不能用有限峰度概括该分布。

□
### 29.5.2 极值尾部与标准化残差诊断

当关注点只是极高收益或极低收益时，可用广义 Pareto 分布 GPD 拟合标准化残差超过高阈值 $u$ 的部分，而不强迫中部观测服从同一参数形状。令超额量 $Y=Z-u\mid Z>u$，尺度 $\psi>0$、形状 $\xi>0$ 时，其生存函数、超额对数似然与高分位数为

$$\begin{aligned}
\mathbb P(Y>y)&=\left(1+\frac{\xi y}{\psi}\right)^{-1/\xi},\qquad y\ge0,\\
\ell(\psi,\xi)&=-n_u\log\psi-\left(1+\frac1\xi\right)\sum_{i=1}^{n_u}\log\left(1+\frac{\xi y_i}{\psi}\right),\\
Q_Z(p)&=u+\frac{\psi}{\xi}\left[\left(\frac{1-p}{n_u/n}\right)^{-\xi}-1\right],\qquad p>1-\frac{n_u}{n}.
\end{aligned}\tag{29.21}$$

这里 $n_u$ 是超过阈值的样本数，$\psi,\xi$ 可由极大似然估计，并需检查所有对数项均为正。$\xi>0$ 对应幂律尾，$\xi$ 越大，极远端分位数对形状参数越敏感。阈值过低会把中部偏差带入尾部拟合，过高则使 $n_u$ 太小；因此应结合超额均值图、参数稳定图和自助标准误选择，而不能只最大化单一阈值的拟合优度。

**例 29.5**

标准化残差的高端有 $n=2000$ 个观测，其中 $n_u=100$ 个超过 $u=1.5$。GPD 估计为 $\psi=0.20$、$\xi=0.25$。求高端 $99.9\%$ 分位数，并比较同一尺度下 $\xi=0.50$ 的结果。

**解**

由 $n_u/n=0.05$ 与 $1-p=0.001$，式（29.21）中的比值为 $0.02$。当 $\xi=0.25$ 时，$Q_Z(0.999)=1.5+(0.20/0.25)(0.02^{-0.25}-1)=2.8273$。当 $\xi=0.50$ 时，相应分位数为 $1.5+(0.20/0.50)(0.02^{-0.50}-1)=3.9284$。若日条件波动率为 $1.2\%$，两种高端损失尺度分别约为 $3.39\%$ 与 $4.71\%$。尾部形状的小幅变化因而会在极端置信水平下转化为显著的资本差异。

条件分布与方差递推是否正确，应通过标准化残差和概率积分变换共同诊断。计算 $\widehat z_t=\widehat\varepsilon_t/\widehat\sigma_t$ 与 $u_t=F_{\widehat\eta}(\widehat z_t)$，并对残差、平方残差或绝对残差使用

$$Q_T^*(m)=T(T+2)\sum_{k=1}^{m}\frac{\widehat\rho(k)^2}{T-k},\qquad \widehat\rho(k)=\frac{\sum_{t=k+1}^{T}(x_t-\bar x)(x_{t-k}-\bar x)}{\sum_{t=1}^{T}(x_t-\bar x)^2}.\tag{29.22}$$

若模型完全正确，$u_t$ 应近似独立均匀。平方残差仍有自相关，通常指向方差结构遗漏；$u_t$ 的直方图两端过高而残差平方已不相关，则更像条件分布设定错误。QQ 图、峰度和超越率可定位尾部偏差，但参数估计会改变检验的有限样本分布，正式推断宜采用参数自助法。
GED 的尾部机理与 Student-t 不同。对式（29.20）的密度作代换 $u=|z|^\nu/(2\lambda^\nu)$，Gamma 积分给出 $\mathbb E|Z|^q=\lambda^q2^{q/\nu}\Gamma((q+1)/\nu)/\Gamma(1/\nu)$，故每个有限的 $q>0$ 都有有限矩；同时 $\log\mathbb P(|Z|>z)$ 的主项是 $-|z|^\nu/(2\lambda^\nu)$。因此 GED 没有幂律尾，$\nu<2$ 所谓“厚尾”是相对于同方差正态的指数衰减速度而言，不能据此推断四阶矩不存在。估计时仍应检查 $\nu$ 的置信区间，因为小样本中的少数极端值会使 Student-t 与 GED 的似然曲面都很平坦。

QQ 图直接把这种形状差异定位到分位数。将标准化残差排序为 $\widehat z_{(1)}\le\cdots\le\widehat z_{(T)}$，取 $p_i=(i-1/2)/T$，绘制 $(F_{\widehat\eta}^{-1}(p_i),\widehat z_{(i)})$。若模型正确，点列应围绕四十五度线；左尾向下弯而中部贴近直线，说明实际左尾重于设定分布，两端均偏离而中部过陡则常表示峰度设定不当。Student-t 与 GED 已分别完成尺度和方差标准化，所以不能把系统性弯曲解释成又估计了一次均值或标准差。比较候选分布时，应使用同一批残差和同一组分位数，并以参数自助样本生成 QQ 包络，避免把排序造成的扇形离散误判为尾部失配。
超越率诊断把 QQ 图的形状检查转化为可回测的频率检查。对左尾水平 $\alpha$，令 $q_\alpha=F_{\widehat\eta}^{-1}(\alpha)$，记录 $I_t=\mathbf 1\{\widehat z_t<q_\alpha\}$，并计算 $\widehat\alpha=T^{-1}\sum_{t=1}^TI_t$。无条件覆盖率要求 $\widehat\alpha$ 接近 $\alpha$；在独立同分布且参数已知的基准下，$T\widehat\alpha$ 服从二项分布，可用精确二项区间而非只用正态近似。右尾可同法定义，双尾合计不能超过各自检验所隐含的整体错误率。更关键的是条件覆盖率：若极端残差仍成串出现，则 $I_t$ 对 $I_{t-1}$ 或波动率状态有可预测性，即使总超越率等于 $\alpha$，风险模型也没有正确刻画时变尾部。可将命中序列的独立性检验与残差平方自相关、$u_t$ 的均匀性检验联合报告，并用参数自助法处理估计方差参数和自由度所产生的自由度修正。
尾部诊断最终要落实到条件风险度量。设已去除条件均值的收益为 $r_{t+1}=\sigma_{t+1}Z_{t+1}$，单位多头头寸的损失为 $L_{t+1}=-r_{t+1}$，且创新分布连续并严格递增。以 $\mathcal F_t$ 表示时刻 $t$ 的公开信息，条件在险价值与预期缺口分别为

$$\begin{aligned}
\operatorname{VaR}_{t,p}
&=\sigma_{t+1}Q_{-Z}(p),\\
\operatorname{ES}_{t,p}
&=\frac{\sigma_{t+1}}{1-p}\int_p^1Q_{-Z}(u)\,du
=\sigma_{t+1}\mathbb E\!\left[-Z\mid -Z>Q_{-Z}(p)\right].
\end{aligned}\tag{29.23}$$

第一式来自损失事件的等价变形 $- \sigma_{t+1}Z>v$；第二式使用连续分布下超过分位数的概率恰为 $1-p$，并把尾部分布在分位数尺度上平均。创新对称时可把 $Q_{-Z}(p)$ 换成 $Q_Z(p)$，但有偏斜时必须保留损失符号。Student-t 在 $\nu>1$ 时有有限预期缺口，$\nu\le1$ 时虽可计算在险价值，尾部均值却不存在；GED 的所有阶矩有限。若尾部来自式（29.21）的 GPD，则 $\xi<1$ 时 $\operatorname{ES}_{t,p}=(\operatorname{VaR}_{t,p}+\psi-\xi u)/(1-\xi)$，而 $\xi\ge1$ 时尾部均值为无穷。在险价值回测可使用上述超越率；预期缺口还依赖极端损失的大小，不能仅凭超越次数合格就认定其估计可靠。
## 29.6 随机波动率模型

GARCH 族把条件方差写成历史可观测收益的确定函数，随机波动率模型则为波动率引入独立的状态创新。这样，收益冲击与波动率冲击不再必然重合，状态的不确定性也成为预测分布的一部分。本节的随机波动率专指由不可直接观测状态驱动的离散时间模型，并说明高频已实现测度如何为这类状态提供额外信息。

### 29.6.1 状态空间形式与信息集

**定义 29.15（对数正态随机波动率状态空间模型）**

设 $r_t$ 为资产收益，$\mu$ 为条件均值，潜在对数波动率为 $h_t$。模型由观测方程和状态方程组成：

$$\begin{aligned}
r_t&=\mu+\varepsilon_t,\qquad
\varepsilon_t=\exp(h_t/2)z_t,\qquad
\mathbb E z_t=0,\qquad \operatorname{Var}(z_t)=1,\\
h_{t+1}&=\alpha+\beta h_t+\sigma_\xi\xi_{t+1},\qquad
\sigma_\xi>0,\qquad |\beta|<1,
\end{aligned}\tag{29.24}$$

其中 $z_t$ 独立同分布，$\xi_{t+1}$ 为独立同分布标准正态变量，两个创新序列相互独立，并与相应时刻之前的信息独立。第一式是以 $h_t$ 为潜在状态的观测方程，第二式是状态转移方程；$\exp(h_t)$ 是状态已知时的条件方差，$\beta$ 控制波动率持续性，$\sigma_\xi$ 控制状态创新的强度。

平稳性来自状态方程的 AR(1) 结构。当初始状态取平稳分布时，$\mathbb E h_t=\alpha/(1-\beta)$，$\operatorname{Var}(h_t)=\sigma_\xi^2/(1-\beta^2)$，且 $\operatorname{Cov}(h_{t+k},h_t)=\beta^k\sigma_\xi^2/(1-\beta^2)$。这里必须固定 $\operatorname{Var}(z_t)=1$，否则把 $h_t$ 整体加上常数并相应缩小 $z_t$ 的尺度会得到相同观测，$\alpha$ 便不可识别。观测密度可取正态、Student-t 或 GED；基本模型中的独立性用于得到清晰的滤波递推，杠杆效应则需通过相关的状态与收益创新另行扩展。
令 $\mathcal G_t=\sigma(r_s:s\le t)$ 表示公开收益信息，$\mathcal F_t$ 表示包含截至时刻 $t$ 的全部状态与创新之信息，则 $\mathcal G_t\subseteq\mathcal F_t$。在 GARCH 中，$\sigma_t^2$ 关于 $\mathcal G_{t-1}$ 可测；在随机波动率模型中，给定 $\mathcal G_{t-1}$ 后 $h_t$ 通常仍是随机变量。下述命题把这一差别写成可检验的条件矩恒等式。

**命题 29.16（随机波动率下的信息集与可预测性）**

在定义 29.15 下，时刻 $t$ 的收益满足

$$\begin{aligned}
\mathbb E(r_t\mid\mathcal G_{t-1})&=\mu,\qquad
\operatorname{Var}(r_t\mid\mathcal G_{t-1})
=\mathbb E(e^{h_t}\mid\mathcal G_{t-1}),\\
\operatorname{Var}(r_t\mid\mathcal F_{t-1},h_t)&=e^{h_t},\qquad
\operatorname{Var}(e^{h_t}\mid\mathcal G_{t-1})\ge0 .
\end{aligned}\tag{29.25}$$

因此，历史收益能够预测潜在状态的分布，却一般不能把状态方差完全确定；只有额外知道 $h_t$ 时，$e^{h_t}$ 才是已知的单期条件方差。

**证明**

先对较小的公开信息集使用塔性质。由于 $z_t$ 与 $\mathcal F_{t-1}$ 及 $h_t$ 独立且均值为零，

$$\mathbb E(r_t\mid\mathcal G_{t-1})
=\mathbb E\!\left[\mathbb E(\mu+e^{h_t/2}z_t\mid\mathcal F_{t-1},h_t)\mid\mathcal G_{t-1}\right]=\mu .$$

同理，$z_t$ 的单位方差给出 $\mathbb E(\varepsilon_t^2\mid\mathcal F_{t-1},h_t)=e^{h_t}$，再次取条件期望便得到公开信息下的条件方差。条件全方差公式也给出相同分解：其第一部分是 $\mathbb E(e^{h_t}\mid\mathcal G_{t-1})$，第二部分是 $\operatorname{Var}(\mu\mid\mathcal G_{t-1})=0$。最后一项是随机变量的条件方差，故非负；若给定 $\mathcal G_{t-1}$ 后 $h_t$ 非退化，严格凸函数 $e^h$ 还使 $\mathbb E(e^{h_t}\mid\mathcal G_{t-1})>\exp[\mathbb E(h_t\mid\mathcal G_{t-1})]$。

□
命题 29.16 不表示公开信息下的波动率完全不可预测。只要 $\beta\ne0$，历史收益就通过状态转移含有未来波动率的信息；区别在于预测对象是 $h_t$ 的后验分布，而不是一个已知数值。于是预测密度是混合密度 $p_\theta(r_t\mid\mathcal G_{t-1})=\int f_\theta(r_t\mid h_t)p_\theta(h_t\mid\mathcal G_{t-1})\,dh_t$，其厚尾可同时来自创新分布与状态不确定性。GARCH 的新收益冲击会按确定递推改变下一期方差；随机波动率还允许独立的 $\xi_{t+1}$ 改变状态，所以即使过去收益相同，完整的未来状态路径也不必相同。

### 29.6.2 滤波与极大似然估计入口

令 $\theta=(\mu,\alpha,\beta,\sigma_\xi,\eta)^\top$，其中 $\eta$ 汇总观测创新的形状参数，$\mathcal G_0$ 为平凡信息集。滤波的目标是从 $p_\theta(h_{t-1}\mid\mathcal G_{t-1})$ 出发，依次求状态预测分布和观测到达后的更新分布。Chapman–Kolmogorov 方程与 Bayes 公式给出

$$\begin{aligned}
p_\theta(h_t\mid\mathcal G_{t-1})
&=\int p_\theta(h_t\mid h_{t-1})p_\theta(h_{t-1}\mid\mathcal G_{t-1})\,dh_{t-1},\\
p_\theta(h_t\mid\mathcal G_t)
&=\frac{f_\theta(r_t\mid h_t)p_\theta(h_t\mid\mathcal G_{t-1})}
{p_\theta(r_t\mid\mathcal G_{t-1})},\\
p_\theta(r_t\mid\mathcal G_{t-1})
&=\int f_\theta(r_t\mid h_t)p_\theta(h_t\mid\mathcal G_{t-1})\,dh_t,\\
\ell_T(\theta)&=\sum_{t=1}^T\log p_\theta(r_t\mid\mathcal G_{t-1}) .
\end{aligned}\tag{29.26}$$

第一式把上一期后验经状态转移传播，第二式用当期观测密度重新加权，第三式既是第二式的归一化常数，也是样本的逐步预测密度。由联合密度的条件分解 $p_\theta(r_{1:T})=\prod_{t=1}^Tp_\theta(r_t\mid\mathcal G_{t-1})$，第四式就是精确极大似然的入口；初始项使用 $h_1$ 的平稳密度，或者把初始状态参数纳入 $\theta$。
由于正态观测与非线性尺度 $\exp(h_t/2)$ 同时出现，上述积分一般没有闭式。粒子滤波用随机网格执行同一递推。给定上一期粒子 $h_{t-1}^{(j)}$ 及和为一的权重 $w_{t-1}^{(j)}$，先从 $p_\theta(h_t\mid h_{t-1}^{(j)})$ 抽取 $h_t^{(j)}$，再计算 $\omega_t^{(j)}=w_{t-1}^{(j)}f_\theta(r_t\mid h_t^{(j)})$。于是 $\widehat p_\theta(r_t\mid\mathcal G_{t-1})=\sum_{j=1}^J\omega_t^{(j)}$，归一化权重 $w_t^{(j)}=\omega_t^{(j)}/\sum_{k=1}^J\omega_t^{(k)}$ 给出状态后验近似。有效粒子数 $(\sum_j(w_t^{(j)})^2)^{-1}$ 过小时重采样，以免少数权重垄断似然。将各期预测密度近似取对数并求和，即可数值最大化 $\ell_T(\theta)$；优化时应使用共同随机数降低模拟噪声，并增加 $J$ 检查估计稳定性。

另一个入口是准极大似然。对去均值收益作对数平方变换，得到 $y_t=\log(r_t-\mu)^2=h_t+\zeta_t$，其中 $\zeta_t=\log z_t^2$。状态方程线性高斯，而 $\zeta_t$ 非高斯；以其真实均值和方差替换后使用 Kalman 滤波，可得到计算迅速的准似然。零收益或近零收益会使对数发散，任意加常数又会改变观测方程，因此不能隐瞒该处理的影响。准似然便于初始化 $\widehat\theta$ 和诊断参数，但最终若需要精确似然推断，应回到粒子滤波、模拟极大似然或 Bayesian 状态后验，并报告持续性与状态噪声参数的不确定性。
### 29.6.3 已实现波动率与高频数据

潜在状态并非只能依靠日收益识别。固定日内区间 $[0,1]$，将其等分为 $N$ 个小区间，并令 $r_{N,i}=X_{i/N}-X_{(i-1)/N}$ 为对数价格增量。当采样加密时，增量平方和估计的是积分方差，而不是某瞬时 $h_t$ 的精确值。

**定理 29.17（已实现方差的一致性与噪声偏差）**

设 $X_s=X_0+\int_0^s a_u\,du+\int_0^s\sigma_u\,dW_u$ 为连续半鞅，样本路径上的 $\int_0^1|a_u|\,du$ 与 $\int_0^1\sigma_u^2\,du$ 有限。则无噪声已实现方差满足

$$\begin{aligned}
IV&=\int_0^1\sigma_u^2\,du,\qquad
RV_N^{(X)}=\sum_{i=1}^Nr_{N,i}^2,\\
RV_N^{(X)}&\xrightarrow{p}IV,\qquad N\to\infty .
\end{aligned}\tag{29.27}$$

若实际观测为 $Y_{i/N}=X_{i/N}+\eta_i$，其中 $\eta_i$ 独立同分布、均值为零、方差为 $\sigma_\eta^2$，且与 $X$ 独立，则观测增量的平方和满足

$$\begin{aligned}
\widetilde r_{N,i}&=r_{N,i}+\eta_i-\eta_{i-1},\\
RV_N^{(Y)}&=RV_N^{(X)}
+2\sum_{i=1}^Nr_{N,i}(\eta_i-\eta_{i-1})
+\sum_{i=1}^N(\eta_i-\eta_{i-1})^2,\\
\mathbb E(RV_N^{(Y)}\mid X)&=RV_N^{(X)}+2N\sigma_\eta^2 .
\end{aligned}\tag{29.28}$$

**证明**

先把无噪声增量分解为漂移增量 $D_{N,i}$ 与连续鞅增量 $M_{N,i}$，则 $r_{N,i}^2=M_{N,i}^2+2D_{N,i}M_{N,i}+D_{N,i}^2$。漂移部分的总变差有限且连续性使 $\max_i|D_{N,i}|\to0$，所以 $\sum_iD_{N,i}^2\le\max_i|D_{N,i}|\sum_i|D_{N,i}|\to0$。Cauchy–Schwarz 不等式继而使交叉项被 $\sum_iD_{N,i}^2$ 与 $\sum_iM_{N,i}^2$ 的乘积控制并趋于零。连续鞅二次变差定理给出 $\sum_iM_{N,i}^2\xrightarrow{p}[M]_1=IV$，合起来即得式（29.27）。

有噪声时，把 $(r_{N,i}+\eta_i-\eta_{i-1})^2$ 展开并对 $i$ 求和，便逐项得到式（29.28）的等式。给定整条 $X$ 路径后，交叉项因 $\mathbb E(\eta_i-\eta_{i-1})=0$ 而具有零条件均值；独立性还给出 $\mathbb E[(\eta_i-\eta_{i-1})^2\mid X]=2\sigma_\eta^2$。共有 $N$ 个增量，故条件期望中的噪声偏差恰为 $2N\sigma_\eta^2$，定理得证。

□
式（29.28）说明，直接提高采样频率未必改善估计：无噪声离散化误差减小的同时，噪声增量差分产生阶为 $N$ 的偏差。稀疏采样能降低噪声项数量，却增加积分方差的离散化误差；多网格子采样与双尺度估计利用这一权衡，预平均则在局部平滑价格后再计算变差。若价格含跳跃，二次变差还包含跳跃平方和，可用截尾已实现方差或双幂次变差分离连续部分。这些修正必须配合相应的渐近条件，不能把机械减去 $2N\widehat\sigma_\eta^2$ 当成普遍有效的解决方案。

对离散时间随机波动率模型，日度 $RV_d$ 或 $\sqrt{RV_d}$ 提供的是日内积分波动率的噪声测度。可把它作为额外观测方程，与收益方程共同滤波；若采用 $\log RV_d$ 的近似线性观测，还必须显式保留测度误差。这样既利用高频数据识别状态，又不把已实现测度误当作无误差的 $h_d$。已实现波动率的平方根估计积分波动率的平方根，而随机波动率状态往往对应瞬时或单日尺度，二者的时间聚合关系必须在模型中说明。

**例 29.6**

设定义 29.15 中 $\mu=0$、$\alpha=-0.4$、$\beta=0.96$、$\sigma_\xi=0.2$，某期滤波后近似有 $h_t\mid\mathcal G_t\sim N(-10.1,0.04)$。求下一期状态的预测均值与方差、公开信息下的条件收益波动率，并与只用预测均值代入 $e^{h_{t+1}/2}$ 的结果比较。另设某高频区间有 $N=288$ 个增量，微观结构噪声标准差为 $0.0005$，无噪声已实现方差为 $0.000096$，求原始含噪已实现方差的条件均值。**解**

由状态方程，下一期预测均值与方差分别为 $m_{t+1\mid t}=\alpha+\beta m_t=-0.4+0.96\times(-10.1)=-10.096$ 和 $v_{t+1\mid t}=\beta^2v_t+\sigma_\xi^2=0.96^2\times0.04+0.2^2=0.076864$。因此 $h_{t+1}\mid\mathcal G_t\sim N(-10.096,0.076864)$。条件收益为 $\mu+\exp(h_{t+1}/2)z_{t+1}$，所以公开信息下的条件收益波动率不是简单地代入状态均值，而是 $\{\mathbb E[\exp(h_{t+1})\mid\mathcal G_t]\}^{1/2}$。对数正态矩公式给出
$\sqrt{\mathbb E[\exp(h_{t+1})\mid\mathcal G_t]}=\exp(m_{t+1\mid t}/2+v_{t+1\mid t}/4)=\exp(-5.028784)\approx0.0065468$。
若只用预测均值代入，则得到 $\exp(-10.096/2)\approx0.0064222$。两者之比为 $\exp(v_{t+1\mid t}/4)=\exp(0.019216)\approx1.01940$，故均值代入法把条件波动率低估约 $1.902\%$；这一差异正是忽略状态预测不确定性的 Jensen 偏差。

对含噪已实现方差，式（29.28）中的条件偏差为 $2N\sigma_\eta^2=2\times288\times0.0005^2=0.000144$。于是
$\mathbb E(RV_N^{(Y)}\mid X)=0.000096+0.000144=0.000240$。
噪声偏差是无噪声已实现方差的 $1.5$ 倍，含噪测度的条件均值则是后者的 $2.5$ 倍；在该设定下，简单相减修正的期望值为 $0.000240-0.000144=0.000096$，但实际应用仍须估计 $\sigma_\eta^2$ 并检验噪声假设。

滤波实现中，预测密度必须在当期重采样之前计算；若上一期进行了重采样，下一期传播前所有权重应重置为 $1/J$，不能继续沿用重采样前的旧权重。用共同随机数最大化模拟对数似然时，各候选参数须使用同一组随机种子，并在最终估计处增加粒子数复查。准极大似然中的零收益不能被静默删除；若零值来自价格离散化，应采用能描述零值概率的观测模型或明确的截尾模型，并做敏感性分析。使用 $\log RV_d$ 辅助滤波时，同样应把测度误差的均值修正、方差和相关结构纳入观测方程，而非把平滑后的序列视为精确状态。
## 29.7 量化应用

波动率模型进入交易系统时，必须把统计预测转换成可执行且可检验的对象。风险价值使用损益分布的分位数，波动率目标化使用条件二阶矩，组合对冲还依赖条件协方差；三者不能由同一个未经区分的“波动率估计”替代。以下始终要求预测只使用决策时已公开的信息，并把参数估计误差、交易成本和回测中的前视偏差分别处理。

### 29.7.1 条件 VaR 与尾部预测

**定义 29.18（条件风险价值与期望损失）**

设 $V_t$ 为时点 $t$ 的组合价值，$L_{t+1}=V_t-V_{t+1}$ 为下一期损失，$\mathcal F_t$ 为决策信息集。给定置信水平 $p\in(0,1)$，记 $F_{L,t}$ 为 $L_{t+1}$ 在 $\mathcal F_t$ 下的条件分布函数。条件风险价值与条件期望损失定义为

$$\begin{aligned}
\operatorname{VaR}_{p,t+1\mid t}
&=\inf\{\ell\in\mathbb R:F_{L,t}(\ell)\ge p\},\\
\operatorname{ES}_{p,t+1\mid t}
&=\frac{1}{1-p}\int_p^1\operatorname{VaR}_{u,t+1\mid t}\,du .
\end{aligned}\tag{29.29}$$

若 $F_{L,t}$ 连续且严格递增，第一式等价于 $\mathbb P(L_{t+1}\le\operatorname{VaR}_{p,t+1\mid t}\mid\mathcal F_t)=p$，第二式等价于 $\mathbb E[L_{t+1}\mid L_{t+1}\ge\operatorname{VaR}_{p,t+1\mid t},\mathcal F_t]$。一般分布下仍应使用分位数平均定义，因为它不要求损失分布存在密度，也避免把不连续分布的尾部条件期望误写成恒等式。

若收益 $r_{t+1}$ 在 $\mathcal F_t$ 下服从 $N(\mu_{t+1\mid t},\sigma_{t+1\mid t}^2)$，且头寸在期内固定，则 $L_{t+1}=-V_tr_{t+1}$。令 $z_p=\Phi^{-1}(p)$，由 $\mathbb P(L_{t+1}\le\ell\mid\mathcal F_t)=\Phi((\ell/V_t+\mu_{t+1\mid t})/\sigma_{t+1\mid t})$ 可得 $\operatorname{VaR}_{p,t+1\mid t}=V_t(z_p\sigma_{t+1\mid t}-\mu_{t+1\mid t})$。又因标准正态密度满足 $\int_{z_p}^{\infty}x\varphi(x)\,dx=\varphi(z_p)$，式（29.29）的分位数积分给出 $\operatorname{ES}_{p,t+1\mid t}=V_t(\sigma_{t+1\mid t}\varphi(z_p)/(1-p)-\mu_{t+1\mid t})$。这两个量都使用损失为正号的约定；若改用收益左尾分位数，符号必须相应反转。

GARCH 或随机波动率模型提供 $\sigma_{t+1\mid t}$，但正态尺度混合通常仍有厚尾。因此实际预测应保留标准化创新的经验分布或拟合的厚尾分布，通过条件分位数而非固定正态乘子计算 VaR。多日风险也不能在收益自相关或波动率动态未知时机械套用平方根时间规则；应沿状态路径模拟组合损益，并重新计算相应期限的条件分布。
### 29.7.2 波动率目标化、杠杆与组合再平衡

设 $\boldsymbol b_t$ 为风险资产内部的归一化权重，满足 $\boldsymbol 1^\top\boldsymbol b_t=1$，其下一期条件收益波动率预测为 $\widehat\sigma_{b,t+1\mid t}$。总财富中投入该风险组合的比例为 $\ell_t$，其余比例 $1-\ell_t$ 投资或借入无风险资产，因此 $\ell_t>1$ 对应杠杆，$0\le\ell_t<1$ 对应持有现金。目标化不是改变风险资产内部权重，而是根据预测波动率调整总敞口。

**命题 29.19（目标化杠杆与再平衡恒等式）**

给定目标波动率 $\sigma_*>0$、杠杆上限 $\ell_{\max}>0$ 和风险组合预测波动率，令实际风险资产权重为 $\boldsymbol w_t=\ell_t\boldsymbol b_t$。记第 $t$ 期组合总收益为 $R_{p,t}$，再平衡前第 $i$ 个风险资产权重为 $w_{t,i}^{-}$，单位成交额成本为 $c_t$。采用

$$\begin{aligned}
\ell_t&=\min\left\{\ell_{\max},\frac{\sigma_*}{\widehat\sigma_{b,t+1\mid t}}\right\},
\qquad \boldsymbol w_t=\ell_t\boldsymbol b_t,\\
w_{t,i}^{-}&=\frac{w_{t-1,i}(1+R_{i,t})}{1+R_{p,t}},\qquad
\tau_t=\sum_{i=1}^n|w_{t,i}-w_{t,i}^{-}|,\\
R_{p,t+1}^{\mathrm{net}}
&=\ell_tR_{b,t+1}+(1-\ell_t)R_{f,t+1}-c_t\tau_t
\end{aligned}\tag{29.30}$$

的决策规则，其中 $\tau_t$ 为风险资产单边成交额占期初财富的比例。则无杠杆上限约束时，目标组合的条件波动率等于 $\sigma_*$；有上限约束时不超过 $\sigma_*$，且再平衡后的净收益满足式（29.30）。

**证明**

风险组合收益记为 $R_{b,t+1}=\boldsymbol b_t^\top\boldsymbol R_{t+1}$。无风险收益在 $\mathcal F_t$ 下已知，故它对条件方差的贡献为零。由条件协方差矩阵 $\boldsymbol\Sigma_{t+1\mid t}$ 的双线性性，$\operatorname{Var}(R_{p,t+1}\mid\mathcal F_t)=\ell_t^2\boldsymbol b_t^\top\boldsymbol\Sigma_{t+1\mid t}\boldsymbol b_t=\ell_t^2\sigma_{b,t+1\mid t}^2$。若 $\sigma_*/\widehat\sigma_{b,t+1\mid t}\le\ell_{\max}$，则 $\ell_t\widehat\sigma_{b,t+1\mid t}=\sigma_*$；否则 $\ell_t=\ell_{\max}$，从而 $\ell_t\widehat\sigma_{b,t+1\mid t}<\sigma_*$。以预测值作为条件波动率输入，即得目标关系。

再平衡前，第 $i$ 个头寸的市值由原市值乘以 $1+R_{i,t}$ 得到，组合总市值乘以 $1+R_{p,t}$，两式相除即得 $w_{t,i}^{-}$。每个风险头寸需要交易的财富比例为 $|w_{t,i}-w_{t,i}^{-}|$，求和得到 $\tau_t$，按单位成本扣除 $c_t\tau_t$。融资后的毛收益是风险组合收益与无风险收益按 $\ell_t$ 和 $1-\ell_t$ 加权的结果，减去该成本便得净收益恒等式。

□

式（29.30）说明，低波动率预测会提高杠杆，高波动率预测会降低杠杆；这能在统计意义上稳定条件方差，却可能在市场共同去风险时放大顺周期交易。杠杆上限、最小交易单位和波动率预测下界可防止无界敞口，而换手惩罚或交易带可避免微小预测变化触发频繁交易。日波动率与年化目标必须使用一致的期限换算，且第 $t$ 期杠杆只能使用当时可得的预测，不能用期末已实现波动率反推。
### 29.7.3 DCC-GARCH 与条件协方差

单资产波动率不足以决定组合风险。令 $\boldsymbol u_t=\boldsymbol r_t-\boldsymbol\mu_t$ 为 $n$ 维去均值收益，DCC-GARCH 将条件协方差矩阵分解为 $\boldsymbol H_t=\boldsymbol D_t\boldsymbol R_t\boldsymbol D_t$，其中 $\boldsymbol D_t=\operatorname{diag}(\sigma_{1,t},\ldots,\sigma_{n,t})$，每个 $\sigma_{i,t}^2$ 由单变量 GARCH 方程产生，$\boldsymbol R_t$ 为动态相关矩阵。标准化残差 $\boldsymbol\varepsilon_t=\boldsymbol D_t^{-1}\boldsymbol u_t$ 进入相关方程

$$\begin{aligned}
\boldsymbol Q_t&=(1-a-b)\overline{\boldsymbol Q}
+a\boldsymbol\varepsilon_{t-1}\boldsymbol\varepsilon_{t-1}^\top+b\boldsymbol Q_{t-1},\\
\boldsymbol R_t&=\operatorname{diag}(\boldsymbol Q_t)^{-1/2}
\boldsymbol Q_t\operatorname{diag}(\boldsymbol Q_t)^{-1/2},\qquad
\boldsymbol H_t=\boldsymbol D_t\boldsymbol R_t\boldsymbol D_t .
\end{aligned}\tag{29.31}$$

这里 $\overline{\boldsymbol Q}$ 是长期目标矩阵，$a$ 控制标准化收益共同冲击的影响，$b$ 控制相关状态的持续性。先估计 $\boldsymbol Q_t$ 再标准化，是为了使 $\boldsymbol R_t$ 的对角元严格等于一，避免直接把 $\boldsymbol Q_t$ 当作相关矩阵造成尺度混杂。
**定理 29.20（DCC 递归的正定性）**

设 $\overline{\boldsymbol Q}$ 与 $\boldsymbol Q_0$ 对称正定，$a\ge0$、$b\ge0$ 且 $a+b<1$。若各期 $\sigma_{i,t}$ 严格为正，则式（29.31）生成的 $\boldsymbol Q_t$、$\boldsymbol R_t$ 和 $\boldsymbol H_t$ 对所有 $t$ 均对称正定，并且 $\boldsymbol R_t$ 的每个对角元等于一。

**证明**

对 $t$ 作数学归纳。假设 $\boldsymbol Q_{t-1}$ 正定。对任意非零向量 $\boldsymbol x$，有 $\boldsymbol x^\top\overline{\boldsymbol Q}\boldsymbol x>0$、$\boldsymbol x^\top\boldsymbol Q_{t-1}\boldsymbol x>0$，同时 $\boldsymbol x^\top\boldsymbol\varepsilon_{t-1}\boldsymbol\varepsilon_{t-1}^\top\boldsymbol x=(\boldsymbol\varepsilon_{t-1}^\top\boldsymbol x)^2\ge0$。因 $1-a-b>0$，将三项按式（29.31）加权可得 $\boldsymbol x^\top\boldsymbol Q_t\boldsymbol x>0$，所以 $\boldsymbol Q_t$ 正定；其对称性由三项各自的对称性直接得到。归纳初值正定，故结论对所有期成立。

正定矩阵的对角元严格为正，因而 $\boldsymbol S_t=\operatorname{diag}(\boldsymbol Q_t)^{-1/2}$ 有定义且可逆。对任意 $\boldsymbol x\ne\boldsymbol0$，令 $\boldsymbol y=\boldsymbol S_t\boldsymbol x\ne\boldsymbol0$，则 $\boldsymbol x^\top\boldsymbol R_t\boldsymbol x=\boldsymbol y^\top\boldsymbol Q_t\boldsymbol y>0$，故 $\boldsymbol R_t$ 正定。其第 $i$ 个对角元为 $Q_{ii,t}/\sqrt{Q_{ii,t}Q_{ii,t}}=1$。最后，$\boldsymbol D_t$ 可逆，同样的合同变换论证给出 $\boldsymbol H_t$ 正定。

□
高斯条件对数似然可以精确拆分。利用 $|\boldsymbol H_t|=|\boldsymbol D_t|^2|\boldsymbol R_t|$ 和 $\boldsymbol u_t^\top\boldsymbol H_t^{-1}\boldsymbol u_t=\boldsymbol\varepsilon_t^\top\boldsymbol R_t^{-1}\boldsymbol\varepsilon_t$，总对数似然等于单变量部分 $-\tfrac12\sum_t(\log|\boldsymbol D_t|^2+\boldsymbol u_t^\top\boldsymbol D_t^{-2}\boldsymbol u_t)$ 加上相关部分 $-\tfrac12\sum_t(\log|\boldsymbol R_t|+\boldsymbol\varepsilon_t^\top\boldsymbol R_t^{-1}\boldsymbol\varepsilon_t-\boldsymbol\varepsilon_t^\top\boldsymbol\varepsilon_t)$。因此第一阶段分别拟合各资产的均值与 GARCH 方程，第二阶段固定标准化残差并估计 $a,b$。若以样本相关矩阵替代 $\overline{\boldsymbol Q}$ 实施相关目标化，须明确这会减少待估参数，但两阶段标准误仍应反映第一阶段估计误差，稳健推断通常采用相应的夹心协方差。

得到 $\boldsymbol H_{t+1\mid t}$ 后，无约束最小方差组合与 $\boldsymbol H_{t+1\mid t}^{-1}\boldsymbol1$ 成比例，资产 $j$ 对资产 $i$ 的条件对冲比率为 $H_{ij,t+1\mid t}/H_{jj,t+1\mid t}$。实际求解还应加入卖空、杠杆和换手约束，并把预测相关矩阵的变化计入再平衡成本。
### 29.7.4 波动率风险溢价

GARCH 与随机波动率模型通常在真实概率测度 $\mathbb P$ 下预测未来波动率，而期权隐含波动率反映风险中性测度 $\mathbb Q$ 下的定价信息，二者不能直接混同。固定期限 $\tau$，令 $RV_{t,t+\tau}$ 为与该期限一致定义的未来已实现方差。忽略贴现并把理想方差互换的公平行权价记为 $K_{t,\tau}^2$，定义方差形式的波动率风险溢价和空头方差互换收益为

$$\begin{aligned}
M_{t,\tau}&=\mathbb E^{\mathbb P}[RV_{t,t+\tau}\mid\mathcal F_t],
\qquad K_{t,\tau}^2=\mathbb E^{\mathbb Q}[RV_{t,t+\tau}\mid\mathcal F_t],\\
\Pi_{t,\tau}&=K_{t,\tau}^2-M_{t,\tau},\\
\mathrm{Payoff}_{t,\tau}^{\mathrm{short}}
&=N_{\mathrm{var}}(K_{t,\tau}^2-RV_{t,t+\tau}) .
\end{aligned}\tag{29.32}$$

对条件期望取差可得 $\mathbb E^{\mathbb P}[\mathrm{Payoff}_{t,\tau}^{\mathrm{short}}\mid\mathcal F_t]=N_{\mathrm{var}}\Pi_{t,\tau}$。因此，按这里的符号约定，正溢价表示卖出波动率保险在真实测度下具有正的条件期望收益。若把溢价定义为已实现方差期望减去隐含方差，则所有符号都应反转，报告中必须固定一种约定。

在实践中，$K_{t,\tau}^2$ 可由期权价格所隐含的方差互换行权价近似，$M_{t,\tau}$ 则可来自 GARCH、随机波动率或已实现波动率预测。行权价既包含物理波动率预期，也包含投资者对大幅下跌、跳跃和相关性恶化的补偿要求；正溢价不是无风险套利。方差互换空头在波动率激增时承受非线性损失，保证金、融资、离散对冲和期权流动性都会消耗账面溢价。

可用预测回归 $RV_{t,t+\tau}=a+bK_{t,\tau}^2+e_{t+\tau}$ 检查隐含方差是否包含样本外预测信息。若风险中性行权价恰好等于条件物理均值，则应出现 $a=0$、$b=1$；若溢价随 $K_{t,\tau}^2$ 系统性变化，斜率会偏离一，这并不自动意味着回归设定错误。期限重叠的已实现方差具有序列相关，参数检验必须使用与重叠长度相适应的 HAC 标准误或区块自助法。将期权变量加入物理波动率模型时，还应使用样本外损失比较确认其增量信息，而不是仅凭样本内显著性。
### 29.7.5 模型选择与样本外回测

模型选择必须围绕预测用途组织，而不能只比较样本内似然。固定初始估计窗口后，可采用滚动窗口或扩展窗口，在每个预测起点重新估计参数，只用当时信息生成下一期或多期预测。标准化创新分布、DCC 参数、杠杆上限和换手规则若由数据选择，也属于模型参数，必须在训练窗口内确定。多期收益、波动率和 VaR 的标签应按实际持有期构造；比较不同模型时，应保留相同的预测起点、信息集和可交易约束。

波动率预测可比较均值平方误差，但其结果对收益离群值敏感。若 $r_{t+1}^2$ 是条件方差 $h_{0,t}$ 的无条件无偏代理，即 $\mathbb E[r_{t+1}^2\mid\mathcal F_t]=h_{0,t}$，候选预测 $h_t>0$ 可使用 QLIKE 损失 $\ell(h_t,r_{t+1}^2)=\log h_t+r_{t+1}^2/h_t$。给定信息集后的期望损失为 $\log h_t+h_{0,t}/h_t$，对 $h_t$ 求导得到 $(h_t-h_{0,t})/h_t^2$，故唯一驻点在 $h_t=h_{0,t}$。更直接地，真实预测与候选预测的期望损失差为 $h_{0,t}/h_t-1-\log(h_{0,t}/h_t)$；由 $x-1-\log x\ge0$ 且等号仅在 $x=1$ 成立，可知真实条件方差使期望 QLIKE 最小。使用 $RV$ 替代 $r^2$ 时，则要求测度误差满足相应代理条件，不能把含噪 $RV$ 当成无误差真值。

VaR 应使用分位数损失。令 $q=1-p$ 为违约尾概率，损失变量 $L$ 的候选 VaR 为 $v$，定义检验损失 $\rho_q(L-v)=(q-\boldsymbol1_{\{L-v<0\}})(L-v)$。若条件分布连续，期望损失对 $v$ 的导数为 $F_{L,t}(v)-p$，因此在 $v=F_{L,t}^{-1}(p)$ 处为零，并由分位数函数的单调性达到最小。这说明 VaR 回测与波动率回测评价的是不同功能：一个关注尾部校准，另一个关注二阶矩预测，二者结论不必一致。

对两个模型的逐期损失差 $d_t=\ell_{A,t}-\ell_{B,t}$，Diebold–Mariano 检验考察 $\mathbb E d_t=0$，其标准误须包含损失差的自相关，多期重叠预测尤其如此。模型数量较多时，逐个检验会扩大族错误率，应使用模型置信集、现实检查或 SPA 等多重比较方法。统计损失胜出之后，仍须以式（29.30）构造自融资策略，报告扣除点差、冲击、融资和换手成本后的净收益及最大回撤；否则预测改进未必能转化为可交易收益。
为使分位数记号保持一致，前述 VaR 检验损失的权重应取置信水平 $p$，而不是尾概率 $q=1-p$；统一表达式为 $\rho_p(L-v)=(p-\boldsymbol1_{\{L-v<0\}})(L-v)$。其期望导数为 $F_{L,t}(v)-p$，故最小化解确为 $p$ 条件分位数。后文只用 $\alpha=1-p$ 表示例外概率，避免把两种水平混用。

VaR 的直接回测从例外指示变量 $I_{t+1}=\boldsymbol1_{\{L_{t+1}>\operatorname{VaR}_{p,t+1\mid t}\}}$ 开始。正确校准且例外独立时，$I_{t+1}$ 是参数为 $\alpha$ 的 Bernoulli 序列。设样本量为 $T$、例外数为 $x$、样本例外率为 $\widehat\alpha=x/T$，无条件覆盖检验的统计量为 $LR_{\mathrm{uc}}=-2\{(T-x)\log(1-\alpha)+x\log\alpha-(T-x)\log(1-\widehat\alpha)-x\log\widehat\alpha\}$。在原假设及常规大样本条件下，它近似服从自由度为一的卡方分布。$x$ 显著高于 $T\alpha$ 表示 VaR 偏小，显著低于 $T\alpha$ 则表示风险估计过于保守；但覆盖率正确并不排除例外成簇。

为检验独立性，令 $n_{ij}$ 表示例外状态从 $i$ 转移到 $j$ 的次数，其中 $i,j\in\{0,1\}$。两组转移概率估计为 $\pi_0=n_{01}/(n_{00}+n_{01})$ 与 $\pi_1=n_{11}/(n_{10}+n_{11})$，合并例外率为 $\widehat\alpha=(n_{01}+n_{11})/(n_{00}+n_{01}+n_{10}+n_{11})$。合并似然为 $(1-\widehat\alpha)^{n_{00}+n_{10}}\widehat\alpha^{n_{01}+n_{11}}$，独立转移似然为 $(1-\pi_0)^{n_{00}}\pi_0^{n_{01}}(1-\pi_1)^{n_{10}}\pi_1^{n_{11}}$。以负二倍二者对数似然之差构造 $LR_{\mathrm{ind}}$，原假设下近似服从自由度为一的卡方分布；条件覆盖统计量 $LR_{\mathrm{cc}}=LR_{\mathrm{uc}}+LR_{\mathrm{ind}}$ 近似服从自由度为二的卡方分布。短样本、稀少例外和参数估计误差会削弱这些渐近近似，必要时应采用有限样本模拟。

若模型给出完整预测分布 $F_t$，还可计算概率积分变换 $U_{t+1}=F_t(r_{t+1})$。正确的条件密度使该序列独立且服从 $(0,1)$ 均匀分布，因此既要检验均匀性，也要检验独立性；仅比较直方图不能发现动态错配。最终回测应把统计检验与经济结果并列呈现，因为一个覆盖率合格的模型仍可能产生过度保守的杠杆，而一个平均损失较低的模型也可能在危机期出现不可接受的例外成簇。
**例 29.7**

某组合价值为 $1{,}000{,}000$，下一日条件收益近似服从正态分布，条件均值为 $0.0002$、条件波动率为 $0.02$。风险经理采用 $99\%$ 置信水平，日目标波动率为 $0.012$，杠杆上限为 $1.5$。当前风险资产内部为多头归一化权重且保持不变，当前总杠杆为 $0.9$，再平衡前价格暂不变，单位交易成本为 $0.001$。另设 DCC 参数 $a=0.05$、$b=0.9$，$\overline{\boldsymbol Q}=\bigl(\begin{smallmatrix}1&0.5\\0.5&1\end{smallmatrix}\bigr)$，$\boldsymbol Q_{t-1}=\boldsymbol I$，$\boldsymbol\varepsilon_{t-1}=(2,1)^\top$。同一期限的隐含方差为 $0.0004$，物理测度下预期已实现方差为 $0.000324$，方差名义本金为 $N_{\mathrm{var}}=1{,}000{,}000$。最后，在 $500$ 个 $99\%$ VaR 样本外预测中出现 $10$ 次例外。分别计算 VaR、ES、目标杠杆、成交额与成本、DCC 新相关系数、波动率风险溢价及空头方差互换期望收益，并完成无条件覆盖检验。

**解**

对正态条件分布，$z_{0.99}=2.3263479$，$\varphi(z_{0.99})=0.0266521$。由式（29.29）的正态特例，一日条件 VaR 为
$1{,}000{,}000\times(2.3263479\times0.02-0.0002)=46{,}326.96$。
条件 ES 为
$1{,}000{,}000\times(0.02\times0.0266521/0.01-0.0002)\approx53{,}104.28$。
ES 高于 VaR，因为它对最坏的 $1\%$ 损失分位数继续取平均，而不是只取该尾部的起点。

目标杠杆为 $\min\{1.5,0.012/0.02\}=0.6$，未触及上限，故再平衡后的预测波动率为 $0.6\times0.02=0.012$。内部权重不变且均为非负数，杠杆由 $0.9$ 降至 $0.6$ 所需的风险资产成交额占财富比例为 $\sum_i|(0.6-0.9)b_i|=0.3$，即卖出 $300{,}000$ 的风险资产。交易成本为 $300{,}000\times0.001=300$，占财富 $0.0003$；该成本与融资后的投资收益应分别进入式（29.30），不能把目标波动率再按成本比例机械缩小。
对 DCC 方程，先计算 $1-a-b=0.05$ 和 $\boldsymbol\varepsilon_{t-1}\boldsymbol\varepsilon_{t-1}^\top=\bigl(\begin{smallmatrix}4&2\\2&1\end{smallmatrix}\bigr)$。代入式（29.31）得
$\boldsymbol Q_t=0.05\overline{\boldsymbol Q}+0.05\boldsymbol\varepsilon_{t-1}\boldsymbol\varepsilon_{t-1}^\top+0.9\boldsymbol I=\bigl(\begin{smallmatrix}1.15&0.125\\0.125&1\end{smallmatrix}\bigr)$。
因此 $\sqrt{Q_{11,t}Q_{22,t}}=\sqrt{1.15}$，新条件相关系数为 $R_{12,t}=0.125/\sqrt{1.15}\approx0.1165631$。两个对角元经标准化后均为一，不能直接把 $Q_{12,t}=0.125$ 当成相关系数。

按式（29.32）的方差口径，波动率风险溢价为 $\Pi_{t,\tau}=0.0004-0.000324=0.000076$。空头方差互换的条件期望收益为 $1{,}000{,}000\times0.000076=76$。这只是签约时用物理测度计算的期望，并非到期必然收入；若到期 $RV_{t,t+\tau}>0.0004$，空头仍会发生亏损。

覆盖检验中，例外概率为 $\alpha=0.01$，期望例外数为 $500\times0.01=5$，实际例外数为 $10$，样本例外率为 $\widehat\alpha=0.02$。因此无例外组有 $490$ 个观测，统计量为
$LR_{\mathrm{uc}}=-2[490\log(0.99)+10\log(0.01)-490\log(0.98)-10\log(0.02)]\approx3.91362$。
自由度为一的卡方分布在 $5\%$ 水平下的临界值约为 $3.84146$，故按该渐近检验拒绝无条件覆盖率为 $1\%$ 的原假设，对应 $p$ 值约为 $0.048$。这表明样本中的例外偏多，但仅凭总次数不能判断例外是否成簇；还须由相邻例外状态构造转移计数并实施独立性与条件覆盖检验。
**校勘与补充**

前述分位数损失应统一为 $\rho_p(L-v)=(p-\boldsymbol1_{\{L-v<0\}})(L-v)$；以 $q=1-p$ 替代 $p$ 的写法对应 $q$ 分位数，不能用于此处置信水平为 $p$ 的 VaR。例 29.7 的 DCC 代入中，$\boldsymbol Q_t$ 的第二个对角元也应为 $0.05+0.05\times1+0.9=1.15$，故正确矩阵为 $\bigl(\begin{smallmatrix}1.15&0.125\\0.125&1.15\end{smallmatrix}\bigr)$。于是 $R_{12,t}=0.125/\sqrt{1.15\times1.15}=0.125/1.15\approx0.1086957$，而不是 $0.1165631$。对角标准化在这里不可省略，即使更新前 $\boldsymbol Q_{t-1}$ 是相关矩阵，更新后也仍须重新标准化。

例外率分析还应区分点估计、统计显著性与经济重要性。在独立同分布的原假设下，例外数 $X$ 服从参数为 $T$ 和 $\alpha$ 的二项分布，因此短样本可直接用二项分布计算精确置信区间或精确检验，而不必依赖卡方近似。若各期预测使用滚动估计得到的参数，例外序列还可能受到估计误差与公共市场状态影响，独立性不能仅由模型形式预先假定。对非重叠日度预测，可检查例外间隔与转移计数；对重叠持有期，则应先处理由标签重叠造成的机械相关，再解释条件覆盖检验。

完整的回测报告应固定置信水平、持有期、损失符号和估计窗口，同时披露例外总数、例外率、例外间隔、最大例外簇长度以及资本或杠杆后果。无条件覆盖、独立性和概率积分变换分别诊断平均尾概率、动态聚集与整体分布校准，任何一项都不能替代另外两项。只有当统计校准、样本外稳定性和交易成本后的经济表现均达到预定标准时，波动率与 VaR 模型才构成可用于风险决策的闭环。
## 本章小结

本章以条件异方差为主线，把收益分布的时变二阶矩转化为可估计、可预测并可检验的动态模型。ARCH 用滞后平方创新解释波动率聚集，GARCH 再加入滞后条件方差，以较小参数维度表示持续冲击。条件正态并不意味着无条件正态：随时间变化的方差本身即可产生厚尾与偏态等非正态特征。无条件矩、协方差平稳性与严格平稳性彼此相关却并不等价，参数约束必须针对所采用的矩条件和信息集分别说明。由条件递推得到的 $h$ 步预测，是把当前波动率状态向长期水平逐步折叠的结果，而不是把一步方差机械乘以期限。

标准化创新的分布决定了尾部风险与似然函数的具体形状。Student-t 分布在保持标准化方差口径的同时容纳厚尾，但其自由度影响峰度、分位数和尾部均值，不能只用正态临界值替换。EGARCH 在对数方差上建模，因而无需以非负约束保证方差为正，并能区分正负冲击；GJR 模型则通过指示项直接改变负冲击后的方差持续性。随机波动率模型把波动率视为含独立创新的潜在状态，与观测噪声共同构成状态空间系统，其滤波、平滑与参数估计因此不同于观测驱动的 GARCH 递推。

多资产风险不仅要求逐条方差方程，还要求合法且动态的相关结构。DCC 先由单变量模型得到标准化残差，再更新准相关矩阵并作对角标准化；相关目标化减少参数数目，却不免除对标准化、正定性及两阶段估计误差的检查。由此得到的条件协方差矩阵可进入最小方差组合、对冲和波动率目标化，但杠杆上限、融资、交易成本与换手约束会改变理论头寸的可实施性。期权隐含方差与物理测度下的预期已实现方差之差定义了特定符号约定下的波动率风险溢价，它包含风险补偿而非无风险套利。

风险管理最终依赖样本外检验。QLIKE 与分位数损失分别对应条件方差和条件分位数的功能评价，不能用同一种损失替代所有预测目标。VaR 回测须同时考察无条件覆盖与例外独立性，概率积分变换则进一步检验整个预测分布。滚动或扩展窗口、统一的预测起点、适合重叠标签的标准误、多重比较控制以及成本后的经济评价，共同决定模型比较是否可信。覆盖率合格并不意味着资本使用有效，统计损失占优也不自动意味着交易收益提高。
## 习题

1. 分别说明波动率聚集、收益无条件厚尾、杠杆效应和波动率持续性所描述的样本事实。为什么收益本身近似不相关并不能推出收益独立，而平方收益显著自相关也不能单独证明某一特定 ARCH 设定正确？给出一个能够区分“条件异方差”与“均值方程误设”的诊断思路。

2. 考虑 $r_t=\sigma_t z_t$ 与 $\sigma_t^2=\omega+\alpha r_{t-1}^2$，其中 $\omega>0$、$\alpha\ge0$，$z_t$ 独立同分布，均值为零、方差为一，且 $z_t$ 与 $\mathcal F_{t-1}$ 独立。假设存在非退化、具有限二阶矩的平稳解，完整推导其无条件方差，并证明 $0\le\alpha<1$ 是此类平稳解存在的充要条件。进一步说明 $\alpha<1$ 为何不足以保证无条件四阶矩有限。

3. 对均值方程残差 $e_t$ 建立辅助回归 $e_t^2=c_0+c_1e_{t-1}^2+\cdots+c_qe_{t-q}^2+v_t$。从条件同方差原假设出发，完整推导 ARCH-LM 统计量 $TR^2$ 的构造及其渐近原假设分布，明确自由度和拒绝方向。解释该检验为何不能单独区分 ARCH 与 GARCH，以及均值误设和异常值可能怎样导致虚假拒绝。
4. 对 GARCH$(1,1)$ 模型 $r_t=\sqrt{h_t}z_t$、$h_t=\omega+\alpha r_{t-1}^2+\beta h_{t-1}$，设 $\omega>0$、$\alpha,\beta\ge0$，创新均值为零、方差为一。把 $r_{t-1}^2$ 写成 $h_{t-1}z_{t-1}^2$，完整推导 $h_t$ 的随机递推及平稳解的均值方程，证明有限二阶矩平稳解要求 $\alpha+\beta<1$，并求 $\operatorname{Var}(r_t)$。说明该参数条件与严格平稳条件 $\mathbb E[\log(\alpha z_t^2+\beta)]<0$ 的强弱关系。

5. 在第 4 题模型中，令 $\kappa=\alpha+\beta$ 且 $\kappa<1$。从 $\mathbb E[h_{t+1}\mid\mathcal F_t]=\omega+\kappa h_t$ 出发，对任意整数 $h\ge2$ 完整推导 $\mathbb E[h_{t+h}\mid\mathcal F_t]$ 的有限和表达式及其极限，并说明为什么它同时是 $r_{t+h}^2$ 的条件预测。若条件均值为零，进一步推导从 $t+1$ 到 $t+H$ 的累计收益条件方差，指出横项消失所依赖的性质。

6. 设标准化 Student-t 创新的密度为 $f_\nu(z)=\frac{\Gamma((\nu+1)/2)}{\Gamma(\nu/2)\sqrt{(\nu-2)\pi}}[1+z^2/(\nu-2)]^{-(\nu+1)/2}$，$\nu>2$，观测为 $r_t=\mu_t+\sqrt{h_t}z_t$。利用变量变换完整推导单个观测及整个样本的条件对数似然，显式写出由 $r_t=\mu_t+\sqrt{h_t}z_t$ 产生的尺度项。再推导对任一决定 $\mu_t$ 或 $h_t$ 的参数之得分表达式，并说明 $\nu$ 与 $h_t$ 的识别为何要求采用方差为一的标准化密度。

7. 在第 6 题的分布下，完整推导标准化创新的四阶矩及其存在条件，并解释自由度如何影响峰度。若条件均值、条件方差和创新分布均正确，说明标准化残差及其平方、绝对值在理想情况下应呈现哪些序列相关特征；进一步说明仅凭残差直方图接近 Student-t 分布，为什么还不足以接受动态模型。
8. 考虑 EGARCH$(1,1)$ 方程 $\log h_t=\omega+\beta\log h_{t-1}+\alpha(|z_{t-1}|-\mathbb E|z_{t-1}|)+\gamma z_{t-1}$。完整推导其对任意有限参数均给出正方差的原因，并在固定 $h_{t-1}$ 时分别写出正、负标准化冲击对 $\log h_t$ 的边际作用。说明 $\gamma<0$ 如何产生杠杆效应，以及为什么多期条件方差预测不能简单等同于对 $\log h_{t+h}$ 的条件均值再取指数。

9. 对 GJR-GARCH$(1,1)$ 方程 $h_t=\omega+\alpha r_{t-1}^2+\gamma\boldsymbol1_{\{r_{t-1}<0\}}r_{t-1}^2+\beta h_{t-1}$，完整推导正冲击和负冲击进入下一期方差的系数。若创新分布关于零对称且各阶所需矩存在，推导平均持续性与无条件方差，并给出有限二阶矩平稳解的参数条件。解释 $\gamma$ 的符号与大小如何影响消息冲击曲线。

10. 考虑随机波动率模型 $r_t=\mu+\exp(s_t/2)\varepsilon_t$、$s_{t+1}=\phi_0+\phi_1s_t+\sigma_\eta\eta_{t+1}$，其中两个创新序列相互独立且各自独立同分布。完整推导 $|\phi_1|<1$ 时潜在对数波动率的无条件均值与方差，并把 $y_t=\log(r_t-\mu)^2$ 写成“潜在状态加观测噪声”的形式。说明观测噪声的分布、线性高斯近似的局限，以及粒子滤波相较普通卡尔曼滤波所针对的问题。

11. 从波动率状态的观测性、创新来源、似然可得性、严格平稳条件和杠杆效应建模方式比较 GARCH 与随机波动率模型。为什么 GARCH 的条件方差在给定初值和参数后是过去观测的确定函数，而随机波动率模型即使知道全部参数仍通常需要滤波？讨论两类模型在样本外预测比较中应如何保持信息集一致。
12. 设代理变量 $y_{t+1}$ 满足 $\mathbb E[y_{t+1}\mid\mathcal F_t]=h_{0,t}$，候选方差预测为 $h_t>0$。对 QLIKE 损失 $\ell(h_t,y_{t+1})=\log h_t+y_{t+1}/h_t$，完整推导真实预测与候选预测的条件期望损失差，并证明其在 $h_t=h_{0,t}$ 处取得唯一最小值。讨论以含噪已实现波动率替代 $r_{t+1}^2$ 时，无偏代理条件与损失排序之间需要补充哪些假设。

13. 由式（29.31）的 DCC 递推出发，证明只要 $\boldsymbol Q_t$ 对称正定，对角标准化所得 $\boldsymbol R_t$ 就是单位对角的正定相关矩阵。利用 $|\boldsymbol H_t|=|\boldsymbol D_t|^2|\boldsymbol R_t|$ 完整推导高斯对数似然的单变量部分与相关部分，并说明两阶段估计固定了哪些量。再设 $a,b\ge0$、$a+b<1$ 且标准化残差的无条件协方差为 $\overline{\boldsymbol Q}$，推导相关目标化下 $\mathbb E[\boldsymbol Q_t]=\overline{\boldsymbol Q}$，说明其减少参数的代价。

14. 令风险资产内部权重为 $\boldsymbol b_t$，条件协方差预测为 $\boldsymbol H_{t+1\mid t}$，总杠杆取 $\ell_t=\min\{L_{\max},\sigma^*/\sqrt{\boldsymbol b_t^\top\boldsymbol H_{t+1\mid t}\boldsymbol b_t}\}$。完整推导再平衡后的预测组合波动率，并分别在内部权重不变和发生变化时推导成交额公式。说明单位交易成本、融资利率和杠杆上限应如何进入自融资财富方程，为什么不能把成本简单从目标波动率中等比例扣除。

15. 某组合价值为 $5{,}000{,}000$，下一日条件收益服从均值为 $-0.0004$、标准差为 $0.018$ 的正态分布，置信水平为 $99\%$。以货币损失定义 VaR 与 ES，先推导二者关于条件均值、条件波动率、标准正态分位数及密度的公式，再计算数值。若其他条件不变而组合杠杆扩大一倍，分别说明均值项与波动率项如何改变 VaR 和 ES。
16. 设下一日收益为 $r=\mu+\sqrt h z$，其中 $z$ 服从第 6 题的标准化 Student-t 分布，$\nu>2$。对损失 $L=-Vr$ 和置信水平 $p$，令 $q_{\nu,p}$ 为 $z$ 的 $p$ 分位数，完整推导 VaR 与 ES 的闭式表达；在 ES 推导中必须计算尾积分并说明密度标准化与尾部均值存在条件。比较同一 $\nu$ 下直接缩放普通 Student-t 分位数与使用方差为一的分位数会造成什么差别。

17. 设 VaR 例外指示变量独立且服从参数为 $\alpha$ 的 Bernoulli 分布，样本量为 $T$、例外数为 $x$。分别写出覆盖率原假设与无约束备择下的似然，完整推导 $LR_{\mathrm{uc}}$，并说明其渐近自由度和拒绝方向。取 $T=1000$、$\alpha=0.01$、$x=17$，计算统计量并作渐近检验；再说明如何构造不依赖卡方近似的二项精确检验。

18. 对相邻例外状态定义转移计数 $n_{ij}$，$i,j\in\{0,1\}$。从独立一阶马尔可夫链与合并 Bernoulli 链的似然出发，完整推导 $LR_{\mathrm{ind}}$，并证明条件覆盖统计量可分解为 $LR_{\mathrm{cc}}=LR_{\mathrm{uc}}+LR_{\mathrm{ind}}$。说明各自的原假设、渐近自由度，以及没有例外或某一转移行没有观测时应如何处理似然项和渐近推断。

19. 若 $r_{t+1}$ 的条件分布 $F_t$ 连续且模型正确，证明 $U_{t+1}=F_t(r_{t+1})$ 服从 $(0,1)$ 均匀分布，并证明该序列在适当条件下相互独立。说明均匀性检验与独立性检验分别能发现什么错配，为什么直方图平坦仍不足以通过模型验证；再讨论离散或混合分布为何需要随机化概率积分变换。
20. 对模型 A 与 B 的样本外损失差 $d_t=\ell_{A,t}-\ell_{B,t}$，设其协方差平稳且满足常用混条件。从样本均值出发，写出 Diebold–Mariano 统计量，并完整推导长期方差为何包含各阶自协方差。分别说明一步非重叠预测与 $h$ 步重叠预测的标准误处理，以及同时比较大量模型时为何还需模型置信集、现实检查或 SPA 等多重比较方法。

21. 按式（29.32）的定义，完整推导空头方差互换在物理测度下的条件期望收益，并说明溢价符号改变时期望收益如何变化。若隐含方差恰好等于未来已实现方差的条件物理均值，推导预测回归 $RV_{t,t+\tau}=a+bK_{t,\tau}^2+e_{t+\tau}$ 应满足的参数限制；再解释风险溢价时变、测度误差和期限重叠为何会影响斜率估计与标准误。

22. 设计一项从原始收益到风险决策的完整样本外研究，比较高斯 GARCH、Student-t GJR、随机波动率与 DCC 波动率目标化组合。方案须明确滚动或扩展窗口、各期可用信息、参数与分布选择、QLIKE 和分位数损失、Diebold–Mariano 检验、多重比较、VaR 无条件覆盖与独立性、概率积分变换、杠杆和换手约束，以及交易成本后的净收益和最大回撤。说明若各模型在统计校准与经济评价上的排名不一致，应如何按预先指定的风险目标作结论，而不得事后选择有利指标。
**习题校勘**：第 20 题中的“常用混条件”应改为“常用混合条件”。
