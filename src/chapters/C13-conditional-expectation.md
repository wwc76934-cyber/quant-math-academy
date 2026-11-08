# 第13章　条件期望、条件方差与最优预测

条件概率是概率论中最古老的观念之一。在得知某事件 $B$ 已经发生之后，样本空间被压缩为 $B$，各结果的相对可能性被重新分配，初等教材把这一观念写成 $\mathbb P(A\mid B)=\mathbb P(A\cap B)/\mathbb P(B)$，并要求 $\mathbb P(B)>0$；对期望的相应定义 $\mathbb E[X\mid B]=\mathbb E[X\mathbf 1_B]/\mathbb P(B)$ 同样依赖这个比值。然而量化研究中真正需要的条件对象几乎从不具备这种形式。我们要问的是「已知截至此刻的全部市场信息，明日超额收益的期望是多少」「已知标的资产到当前时刻的价格路径，某衍生品在下一时刻的价值几何」。这类问题中的「已知信息」既不是一个具有正概率的事件，也往往不是某个具有密度或离散分布的随机变量，而是一族随时间递增的 σ-代数。初等的比值定义在此完全失效：当 $Y$ 为连续型随机变量时 $\mathbb P(Y=y)=0$，比值无意义；即使借助条件密度绕过这一障碍，所得函数 $y\mapsto\mathbb E[X\mid Y=y]$ 在 $f_Y(y)=0$ 的点以及在一个零测集上仍然完全不受任何约束，逐点数值没有概率含义。

本章的核心工作是把条件期望重建为一个纯测度论的对象。关键的观念转变在于：条件期望不应当首先被理解为一个「数」，而应当被理解为一个「随机变量」。它需要满足的要求只有两条——关于所给信息可测，并且在信息所能分辨的每一个事件上与原变量具有相同的积分。这两条要求恰好是 Radon–Nikodym 导数的定义，因而存在性与几乎必然唯一性由该定理一次性给出。这一重构带来三重收益：它统一了离散、连续以及混合分布的情形，不再需要区分求和与积分；它允许以任意子 σ-代数、尤其是刻画信息流的滤子为条件，从而为随机过程理论提供语言；它使条件期望成为 $L^2$ 空间上的正交投影算子，把概率问题转化为 Hilbert 空间的几何问题。

投影观点是本章后半部分的组织原则。在 $L^2(\Omega,\mathcal F,\mathbb P)$ 中，所有 $\mathcal G$-可测的平方可积随机变量构成闭子空间 $L^2(\Omega,\mathcal G,\mathbb P)$，而 $\mathbb E[X\mid\mathcal G]$ 正是 $X$ 在该子空间上的正交投影：它使均方误差 $\mathbb E[(X-Z)^2]$ 在所有 $\mathcal G$-可测的 $Z$ 中达到最小，且残差 $X-\mathbb E[X\mid\mathcal G]$ 与整个 $L^2(\Omega,\mathcal G,\mathbb P)$ 正交。这就是「最优预测」的数学内容，也是最小二乘回归、因子模型、Kalman 滤波与最小方差对冲比率背后共同的原理。把投影残差的平方取条件期望，便得到条件方差；对它再取期望并与无条件方差比较，便得到全方差公式，后者把总风险分解为「信息可解释的部分」与「不可约的噪声部分」。

条件期望同时是鞅论的出发点。过程 $(M_t)_{t\ge 0}$ 是鞅，当且仅当 $\mathbb E[M_t\mid\mathcal F_s]=M_s$ 对一切 $s\le t$ 成立，即在现有信息下未来值的最佳预测就是当前值。Doob 停时定理、鞅收敛定理、Itô 积分的等距性质，以及风险中性定价中 $V_t=\mathbb E^{\mathbb Q}[\mathrm e^{-r(T-t)}\Phi\mid\mathcal F_t]$ 的定价公式，全部建立在条件期望的线性性、塔性质与提取已知量之上。因此本章既是第 12 章联合分布理论的自然延伸，也是第 25 章至第 27 章随机过程与随机分析、第 32 章与第 33 章组合优化与无套利定价的直接前置。

本章的推进路线如下。13.1 节从初等定义出发，说明「给定事件」「给定随机变量的取值」两个层次的内容与局限；13.2 节引入子 σ-代数与条件期望的一般定义，并验证初等定义是它的特例；13.3 节系统地建立条件期望的基本性质并给出完整证明；13.4 节定义条件方差并推导全方差公式；13.5 节证明条件期望就是 $L^2$ 正交投影，从而得到最优预测理论；13.6 节讨论正则条件分布的一般存在性并给出量化应用。读者需要熟悉测度论概率的基本语言：σ-代数、可测函数、Lebesgue 积分、单调收敛定理与控制收敛定理，以及 Radon–Nikodym 定理的陈述。

## 13.1 条件期望的层次

条件期望有三个逐步抽象的层次。第一层是给定事件 $B$ 的条件期望，它只要求 $\mathbb P(B)>0$，本质上是把概率测度替换为条件测度 $\mathbb P(\cdot\mid B)$ 后重新计算积分。第二层是给定随机变量取值 $Y=y$ 的条件期望 $\mathbb E[X\mid Y=y]$，它是 $y$ 的函数；当 $Y$ 离散时它由第一层逐点得到，当 $Y$ 连续时 $\mathbb P(Y=y)=0$，必须借助条件密度重新定义。第三层是给定 σ-代数 $\mathcal G$ 的条件期望 $\mathbb E[X\mid\mathcal G]$，它是一个随机变量，也是本章真正的工作对象。本节完整处理前两层，并指出它们为何不能替代第三层。

**定义 13.1（初等条件期望）**

设 $X$ 为可积随机变量（即 $\mathbb E\lvert X\rvert<\infty$），$Y$ 为另一随机变量。

（离散情形）若 $Y$ 为离散型，取值于可数集 $S$，且 $\mathbb P(Y=y)>0$，则定义
$$
\mathbb E[X\mid Y=y]=\sum_{x}x\,\mathbb P(X=x\mid Y=y)=\sum_{x}x\,\frac{\mathbb P(X=x,\,Y=y)}{\mathbb P(Y=y)},
$$
其中求和遍历 $X$ 的所有可能取值；当 $X$ 亦为连续型时，把上式中的求和与概率质量换成对条件分布的积分，即 $\mathbb E[X\mid Y=y]=\int_{\mathbb R}x\,\mathbb P(X\in dx\mid Y=y)$。

（连续情形）若 $(X,Y)$ 具有联合密度 $f_{X,Y}$，$Y$ 的边缘密度为 $f_Y(y)=\int_{\mathbb R}f_{X,Y}(x,y)\,dx$，且 $f_Y(y)>0$，则定义条件密度 $f_{X\mid Y}(x\mid y)=f_{X,Y}(x,y)/f_Y(y)$，并令
$$
\mathbb E[X\mid Y=y]=\int_{\mathbb R}x\,f_{X\mid Y}(x\mid y)\,dx=\frac{\displaystyle\int_{\mathbb R}x\,f_{X,Y}(x,y)\,dx}{f_Y(y)}.
\tag{13.1}
$$

（给定事件的情形）若 $B\in\mathcal F$ 且 $\mathbb P(B)>0$，则定义 $\mathbb E[X\mid B]=\mathbb E[X\mathbf 1_B]/\mathbb P(B)$，即 $\mathbb E[X\mid B]=\int_{\Omega}X\,d\mathbb P(\cdot\mid B)$。

公式 (13.1) 并非凭空规定，它可以由第一层定义通过收缩条件区间得到，这一推导也说明了为什么必须以条件密度为出发点。设 $f_Y$ 在 $y$ 处连续且 $f_Y(y)>0$，$x\mapsto x f_{X,Y}(x,\cdot)$ 关于第二个变量在 $y$ 处连续且被某个可积函数控制。对 $h>0$，令 $B_h=\{y\le Y\le y+h\}$，则 $\mathbb P(B_h)=\int_y^{y+h}f_Y(v)\,dv>0$（当 $h$ 充分小），由第一层定义
$$
\mathbb E[X\mid B_h]=\frac{\mathbb E\bigl[X\mathbf 1_{[y,\,y+h]}(Y)\bigr]}{\mathbb P(Y\in[y,\,y+h])}=\frac{\int_y^{y+h}\int_{\mathbb R}x\,f_{X,Y}(x,v)\,dx\,dv}{\int_y^{y+h}f_Y(v)\,dv}.
$$
分子分母同除以 $h$，令 $h\downarrow 0$，由积分中值定理（更一般地由 Lebesgue 微分定理）两个比值分别收敛到被积函数在 $v=y$ 处的值，于是
$$
\lim_{h\downarrow 0}\mathbb E[X\mid B_h]=\frac{\int_{\mathbb R}x\,f_{X,Y}(x,y)\,dx}{f_Y(y)}=\int_{\mathbb R}x\,\frac{f_{X,Y}(x,y)}{f_Y(y)}\,dx.
$$
最后一个表达式提示：函数 $x\mapsto f_{X,Y}(x,y)/f_Y(y)$ 恰好是「给定 $Y=y$ 时 $X$ 的密度」，因为它非负且对 $x$ 的积分为 $1$。这就导出了条件密度的定义，并把 $\mathbb E[X\mid Y=y]$ 写成 (13.1) 的形式。需要强调的是，上述极限在 $f_Y(y)=0$ 处不存在或依赖逼近方式，而即使 $f_Y(y)>0$，若 $y$ 落在 $f_Y$ 的一个零测集上，(13.1) 的取值也不会影响任何概率计算。因此函数 $g(y)=\mathbb E[X\mid Y=y]$ 只在 $Y$ 的分布 $\mathbb P_Y$-几乎必然的意义下被确定；任何两个满足 (13.1) 的函数在 $\mathbb P_Y$-几乎必然相等，而它们在零测集上的差异无法用初等定义加以区分。这一「零测集上的不确定性」不是技术瑕疵，而是初等层次的本质局限，它正是 13.2 节把条件期望定义为随机变量并只在几乎必然意义下谈论唯一性的根本原因。

给定事件与给定随机变量取值这两个层次之间存在一条重要的联系公式，它说明逐点条件期望的平均给出无条件期望。设 $X$ 可积，$g(y)=\mathbb E[X\mid Y=y]$，$C\subset\mathbb R$ 为 Borel 集且 $\mathbb P(Y\in C)>0$。在连续情形下，由 Fubini 定理（其适用性由 $\mathbb E\lvert X\rvert=\int\int\lvert x\rvert f_{X,Y}(x,y)\,dx\,dy<\infty$ 保证），
$$
\mathbb E\bigl[X\mathbf 1_C(Y)\bigr]=\int_C\int_{\mathbb R}x\,f_{X,Y}(x,y)\,dx\,dy=\int_C g(y)f_Y(y)\,dy,
$$
两边除以 $\mathbb P(Y\in C)=\int_C f_Y(y)\,dy$ 得
$$
\mathbb E[X\mid Y\in C]=\frac{\mathbb E\bigl[X\mathbf 1_C(Y)\bigr]}{\mathbb P(Y\in C)}=\frac{\int_C g(y)\,f_Y(y)\,dy}{\int_C f_Y(y)\,dy}.
\tag{13.2}
$$
即：给定事件 $\{Y\in C\}$ 的条件期望，等于逐点条件期望 $g(y)$ 按 $Y$ 限制在 $C$ 上的条件分布所作的加权平均。特别地取 $C=\mathbb R$，得到全期望公式 $\mathbb E\bigl[g(Y)\bigr]=\mathbb E[X]$ 的初等形式。离散情形完全类似，把积分换成对 $y\in C\cap S$ 的求和即可。式 (13.2) 还提示了一个记号约定：把 $g(Y)$ 视为一个随机变量，则 $\mathbb E[X\mid Y]$ 就应当指 $g(Y)$，而 $\mathbb E[X\mid Y=y]$ 指它在 $Y=y$ 处的取值 $g(y)$；前者是随机变量，后者是实数。这一区分在后文（尤其在鞅论中）至关重要，混淆二者是最常见的错误来源。

**定义 13.2（条件分布）**

设 $(X,Y)$ 为二维随机向量。

（离散情形）若 $\mathbb P(Y=y)>0$，则给定 $Y=y$ 时 $X$ 的条件分布由条件概率质量函数
$$
p_{X\mid Y}(x\mid y)=\mathbb P(X=x\mid Y=y)=\frac{\mathbb P(X=x,\,Y=y)}{\mathbb P(Y=y)}
$$
确定，相应的条件分布函数为 $F_{X\mid Y}(x\mid y)=\sum_{u\le x}p_{X\mid Y}(u\mid y)$。

（连续情形）若 $(X,Y)$ 有联合密度 $f_{X,Y}$，$f_Y(y)>0$，则给定 $Y=y$ 时 $X$ 的条件密度与条件分布函数分别为
$$
f_{X\mid Y}(x\mid y)=\frac{f_{X,Y}(x,y)}{f_Y(y)},\qquad F_{X\mid Y}(x\mid y)=\int_{-\infty}^{x}f_{X\mid Y}(u\mid y)\,du.
$$

条件分布一旦确定，条件期望不过是关于它的普通积分。更一般地，对任意 Borel 可测函数 $\varphi$，只要 $\varphi(X)$ 可积（或 $\varphi\ge 0$），在连续情形下就有
$$
\mathbb E[\varphi(X)\mid Y=y]=\int_{\mathbb R}\varphi(x)\,f_{X\mid Y}(x\mid y)\,dx,
$$
离散情形把积分换成对条件概率质量的求和。这一规则的证明与 (13.1) 的推导完全相同：先对指示函数 $\varphi=\mathbf 1_B$ 由条件密度的定义成立，再由线性性推广到简单函数，最后由单调收敛定理（$\varphi\ge 0$）或控制收敛定理（$\varphi(X)$ 可积）推广到一般 $\varphi$。取 $\varphi(x)=x$ 得条件期望，取 $\varphi(x)=(x-c)^2$ 得条件二阶矩，这正是 13.4 节定义条件方差 $\operatorname{Var}(X\mid Y=y)=\mathbb E[X^2\mid Y=y]-\bigl(\mathbb E[X\mid Y=y]\bigr)^2$ 的基础。

注记。定义 13.2 中的条件分布依赖于「$Y$ 恰好取值 $y$」这一零概率事件，因此严格说来它只在 $f_Y(y)>0$ 的点上有意义，并且作为 $y$ 的函数同样只在 $\mathbb P_Y$-几乎必然被确定。在一般概率空间上，「对每个 $y$ 给出一个概率测度 $K(y,\cdot)$，且 $y\mapsto K(y,B)$ 可测」这样的对象称为正则条件分布，它的存在性需要额外的结构假设（例如 Polish 空间上的 Borel 概率），并非对任意随机变量都自动成立。13.6 节将给出这一概念的准确陈述及其在量化建模中的作用。本章的绝大多数结论都不依赖正则条件分布，而只依赖定义 13.4 的条件期望，这也是采用测度论路径的重要优势。

**例 13.1**

设 $(X,Y)$ 服从二元正态分布，$\mathbb E[X]=\mu_X$，$\mathbb E[Y]=\mu_Y$，$\operatorname{Var}(X)=\sigma_X^2$，$\operatorname{Var}(Y)=\sigma_Y^2$，相关系数为 $\rho\in(-1,1)$。求给定 $Y=y$ 时 $X$ 的条件分布、条件期望与条件方差。

**解**

联合密度为
$$
f_{X,Y}(x,y)=\frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}\exp\left\{-\frac{1}{2(1-\rho^2)}\left[\frac{(x-\mu_X)^2}{\sigma_X^2}-\frac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y}+\frac{(y-\mu_Y)^2}{\sigma_Y^2}\right]\right\}.
$$
作标准化替换 $u=(x-\mu_X)/\sigma_X$，$v=(y-\mu_Y)/\sigma_Y$，方括号内为 $u^2-2\rho uv+v^2$。配方的关键恒等式是
$$
u^2-2\rho uv+v^2=(u-\rho v)^2+(1-\rho^2)v^2,
$$
它由展开右端立即验证。代入得
$$
f_{X,Y}(x,y)=\frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}\exp\left\{-\frac{(u-\rho v)^2}{2(1-\rho^2)}\right\}\exp\left\{-\frac{v^2}{2}\right\}.
$$
对 $x$ 积分求 $Y$ 的边缘密度。注意 $dx=\sigma_X\,du$，且
$$
\int_{\mathbb R}\frac{1}{\sqrt{2\pi}\sqrt{1-\rho^2}}\exp\left\{-\frac{(u-\rho v)^2}{2(1-\rho^2)}\right\}du=1,
$$
因为被积函数是均值 $\rho v$、方差 $1-\rho^2$ 的正态密度。于是
$$
f_Y(y)=\int_{\mathbb R}f_{X,Y}(x,y)\,dx=\frac{1}{\sqrt{2\pi}\,\sigma_Y}\exp\left\{-\frac{v^2}{2}\right\}=\frac{1}{\sqrt{2\pi}\,\sigma_Y}\exp\left\{-\frac{(y-\mu_Y)^2}{2\sigma_Y^2}\right\},
$$
即 $Y\sim N(\mu_Y,\sigma_Y^2)$，与已知一致。由定义 13.2，条件密度为二者之商：
$$
f_{X\mid Y}(x\mid y)=\frac{1}{\sqrt{2\pi}\,\sigma_X\sqrt{1-\rho^2}}\exp\left\{-\frac{(u-\rho v)^2}{2(1-\rho^2)}\right\}.
$$
把 $u-\rho v=\dfrac{x-\mu_X}{\sigma_X}-\rho\dfrac{y-\mu_Y}{\sigma_Y}$ 代回，指数部分化为
$$
\frac{(u-\rho v)^2}{2(1-\rho^2)}=\frac{\left[x-\mu_X-\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)\right]^2}{2\sigma_X^2(1-\rho^2)},
$$
因此
$$
f_{X\mid Y}(x\mid y)=\frac{1}{\sqrt{2\pi}\,\sigma_X\sqrt{1-\rho^2}}\exp\left\{-\frac{\left[x-\mu_X-\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)\right]^2}{2\sigma_X^2(1-\rho^2)}\right\},
$$
这正是正态密度。于是给定 $Y=y$ 时 $X$ 仍服从正态分布，其条件均值与条件方差为
$$
\mathbb E[X\mid Y=y]=\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y),\qquad \operatorname{Var}(X\mid Y=y)=\sigma_X^2(1-\rho^2).
\tag{13.3}
$$

由 (13.3) 可以得到三点在量化中反复出现的观察。第一，条件均值是 $y$ 的仿射函数，斜率为 $\rho\sigma_X/\sigma_Y=\operatorname{Cov}(X,Y)/\operatorname{Var}(Y)$，这正是 $X$ 对 $Y$ 的最小二乘回归系数；换言之，对联合正态变量而言，最优的（可能非线性的）预测恰好落在仿射预测类中，这一事实在 13.5 节由投影理论给出一般解释。第二，条件方差 $\sigma_X^2(1-\rho^2)=\sigma_X^2-\operatorname{Cov}(X,Y)^2/\operatorname{Var}(Y)$ 不依赖 $y$，它是回归残差的方差，衡量「知道 $Y$ 之后仍无法消除的不确定性」；$\lvert\rho\rvert$ 越接近 $1$，信息越有效，$\rho=0$ 时条件方差退化为无条件方差，即 $Y$ 不提供任何预测能力。第三，对联合正态变量，$\rho=0$ 与独立性等价，因而此时 $\mathbb E[X\mid Y=y]=\mu_X$ 与 $y$ 无关，这与 13.3 节的命题 13.7 一致。

上述计算可推广到高维。设 $(X,Y)$ 联合正态，$X\in\mathbb R^p$，$Y\in\mathbb R^q$，均值向量 $(\mu_X,\mu_Y)$，协方差矩阵分块为
$$
\Sigma=\begin{pmatrix}\Sigma_{XX}&\Sigma_{XY}\\[2pt]\Sigma_{YX}&\Sigma_{YY}\end{pmatrix},\qquad \Sigma_{YX}=\Sigma_{XY}^\top,
$$
且 $\Sigma_{YY}$ 可逆。用分块矩阵求逆公式与 Schur 补行列式恒等式 $\det\Sigma=\det\Sigma_{YY}\cdot\det\bigl(\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}\bigr)$，联合密度中的二次型可分解为「只含 $y$ 的部分」与「给定 $y$ 后关于 $x$ 的部分」之和，于是相除即得
$$
X\mid Y=y\ \sim\ N\Bigl(\mu_X+\Sigma_{XY}\Sigma_{YY}^{-1}(y-\mu_Y),\ \Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}\Bigr).
$$
其中条件均值矩阵 $\Sigma_{XY}\Sigma_{YY}^{-1}$ 是多元回归系数矩阵，条件协方差 $\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX}$ 是残差协方差矩阵，也是 $\Sigma_{XX}$ 关于 $\Sigma_{YY}$ 的 Schur 补。一维情形 $p=q=1$ 时，$\Sigma_{XY}=\rho\sigma_X\sigma_Y$，$\Sigma_{YY}=\sigma_Y^2$，代入即恢复 (13.3)。

**例 13.2**

某资产的次日收益率（单位：%）记为 $X$，市场状态记为 $Y\in\{\text{衰退},\text{平稳},\text{扩张}\}$。二者的联合概率质量函数由下表给出，表中每个元素为 $\mathbb P(X=x,\,Y=y)$：

| $X\backslash Y$ | 衰退 | 平稳 | 扩张 | $\mathbb P(X=x)$ |
|:---:|:---:|:---:|:---:|:---:|
| $-4$ | $0.15$ | $0.05$ | $0.00$ | $0.20$ |
| $0$ | $0.08$ | $0.25$ | $0.10$ | $0.43$ |
| $3$ | $0.02$ | $0.15$ | $0.20$ | $0.37$ |
| $\mathbb P(Y=y)$ | $0.25$ | $0.45$ | $0.30$ | $1.00$ |

求 $\mathbb E[X\mid Y=y]$ 对三个状态 $y$ 的取值、$\mathbb E[X^2\mid Y=y]$、随机变量 $\mathbb E[X\mid Y]$ 的分布，并计算 $\mathbb E\bigl[X\mid Y\in\{\text{衰退},\text{平稳}\}\bigr]$。最后验证全期望公式。

**解**

边缘分布已由表的最后一行与最后一列给出：$\mathbb P(Y=\text{衰退})=0.15+0.08+0.02=0.25$，$\mathbb P(Y=\text{平稳})=0.05+0.25+0.15=0.45$，$\mathbb P(Y=\text{扩张})=0.00+0.10+0.20=0.30$；$\mathbb P(X=-4)=0.15+0.05+0.00=0.20$，$\mathbb P(X=0)=0.08+0.25+0.10=0.43$，$\mathbb P(X=3)=0.02+0.15+0.20=0.37$，三者之和为 $1$，说明表格给出的确是一个联合分布。

第一步，由定义 13.2 计算条件概率质量函数 $p_{X\mid Y}(x\mid y)=\mathbb P(X=x,Y=y)/\mathbb P(Y=y)$，即把每一列除以该列的和：

| $p_{X\mid Y}(x\mid y)$ | 衰退 | 平稳 | 扩张 |
|:---:|:---:|:---:|:---:|
| $x=-4$ | $0.15/0.25=0.60$ | $0.05/0.45=1/9$ | $0.00/0.30=0$ |
| $x=0$ | $0.08/0.25=0.32$ | $0.25/0.45=5/9$ | $0.10/0.30=1/3$ |
| $x=3$ | $0.02/0.25=0.08$ | $0.15/0.45=1/3$ | $0.20/0.30=2/3$ |
| 列和 | $1$ | $1$ | $1$ |

第二步，由定义 13.1 的离散公式 $\mathbb E[X\mid Y=y]=\sum_x x\,p_{X\mid Y}(x\mid y)$ 逐个状态计算：
$$
\mathbb E[X\mid Y=\text{衰退}]=(-4)(0.60)+0(0.32)+3(0.08)=-2.40+0+0.24=-2.16,
$$
$$
\mathbb E[X\mid Y=\text{平稳}]=(-4)\cdot\tfrac19+0\cdot\tfrac59+3\cdot\tfrac13=-\tfrac49+0+1=\tfrac59\approx 0.5556,
$$
$$
\mathbb E[X\mid Y=\text{扩张}]=(-4)(0)+0\cdot\tfrac13+3\cdot\tfrac23=0+0+2=2.
$$
等价的快速算法是先对每列计算 $\sum_x x\,\mathbb P(X=x,Y=y)$ 再除以列和：衰退列给出 $(-4)(0.15)+3(0.02)=-0.60+0.06=-0.54$，除以 $0.25$ 得 $-2.16$；平稳列给出 $(-4)(0.05)+3(0.15)=-0.20+0.45=0.25$，除以 $0.45$ 得 $5/9$；扩张列给出 $3(0.20)=0.60$，除以 $0.30$ 得 $2$，两种算法一致。

第三步，用同一规则计算条件二阶矩 $\mathbb E[X^2\mid Y=y]=\sum_x x^2 p_{X\mid Y}(x\mid y)$，其中 $x^2$ 取 $16,0,9$：
$$
\mathbb E[X^2\mid Y=\text{衰退}]=16(0.60)+0+9(0.08)=9.60+0.72=10.32,
$$
$$
\mathbb E[X^2\mid Y=\text{平稳}]=16\cdot\tfrac19+0+9\cdot\tfrac13=\tfrac{16}{9}+3=\tfrac{43}{9}\approx 4.7778,
$$
$$
\mathbb E[X^2\mid Y=\text{扩张}]=0+0+9\cdot\tfrac23=6.
$$
这些量将在 13.4 节用于计算 $\operatorname{Var}(X\mid Y=y)=\mathbb E[X^2\mid Y=y]-\bigl(\mathbb E[X\mid Y=y]\bigr)^2$，例如衰退状态下为 $10.32-(-2.16)^2=10.32-4.6656=5.6544$。

第四步，把 $\mathbb E[X\mid Y]$ 视为随机变量。它是 $g(Y)$，其中 $g(\text{衰退})=-2.16$，$g(\text{平稳})=5/9$，$g(\text{扩张})=2$，因此 $\mathbb E[X\mid Y]$ 的分布为
$$
\mathbb E[X\mid Y]=\begin{cases}-2.16,&\text{概率 }0.25,\\[2pt] 5/9,&\text{概率 }0.45,\\[2pt] 2,&\text{概率 }0.30.\end{cases}
$$
它只取三个值，因为它关于 $\sigma(Y)$ 可测，而 $\sigma(Y)$ 恰由三个原子 $\{Y=\text{衰退}\}$、$\{Y=\text{平稳}\}$、$\{Y=\text{扩张}\}$ 生成；这一「$\mathcal G$-可测函数在原子上是常数」的图像在 13.2 节会推广到一般 σ-代数。

第五步，计算给定事件 $\{Y\in\{\text{衰退},\text{平稳}\}\}$ 的条件期望，其概率为 $0.25+0.45=0.70$。直接用定义 13.1 的第三层：
$$
\mathbb E\bigl[X\mathbf 1_{\{Y\in\{\text{衰退},\text{平稳}\}\}}\bigr]=\bigl[(-4)(0.15)+0(0.08)+3(0.02)\bigr]+\bigl[(-4)(0.05)+0(0.25)+3(0.15)\bigr]
$$
$$
=(-0.60+0+0.06)+(-0.20+0+0.45)=-0.54+0.25=-0.29,
$$
故 $\mathbb E\bigl[X\mid Y\in\{\text{衰退},\text{平稳}\}\bigr]=-0.29/0.70=-29/70\approx-0.4143$。用联系公式 (13.2) 复核：
$$
\frac{(-2.16)(0.25)+(5/9)(0.45)}{0.70}=\frac{-0.54+0.25}{0.70}=\frac{-0.29}{0.70},
$$
两者一致。这个例子清楚地说明「给定事件的平均」与「逐点条件期望」不是同一个对象：$-0.4143$ 并不等于 $-2.16$ 与 $5/9$ 的简单平均，而是按 $0.25$ 与 $0.45$ 的权重加权。

第六步，验证全期望公式。一方面直接由 $X$ 的边缘分布，
$$
\mathbb E[X]=(-4)(0.20)+0(0.43)+3(0.37)=-0.80+0+1.11=0.31.
$$
另一方面，对随机变量 $\mathbb E[X\mid Y]$ 取期望，
$$
\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=(-2.16)(0.25)+\tfrac59(0.45)+2(0.30)=-0.54+0.25+0.60=0.31,
$$
与前者完全吻合。同理，$\mathbb E[X^2]=16(0.20)+0+9(0.37)=3.20+3.33=6.53$，而 $\mathbb E\bigl[\mathbb E[X^2\mid Y]\bigr]=10.32(0.25)+\tfrac{43}{9}(0.45)+6(0.30)=2.58+2.15+1.80=6.53$，亦吻合。这正是 13.3 节定理 13.6 中塔性质的初等体现。

注记。本例中若把状态理解为宏观情景，则 $\mathbb E[X\mid Y]$ 就是「在观测到宏观状态之后对收益率的最优预测」，而 $\mathbb E[X]=0.31$ 是无任何信息时的预测。预测误差的方差分解、以及在更细的信息集下预测如何改进，将在 13.4 节与 13.5 节系统讨论。这里已经可以看到一个定性结论：条件期望把三个不同的数值 $-2.16$、$5/9$、$2$ 分配给三个状态，其波动完全来自信息 $Y$；若信息更细（例如把每个状态再细分），条件期望的取值范围通常会进一步扩大，而其期望值恒为 $0.31$ 不变。

## 13.2 给定 σ-代数的条件期望

初等层次的两个局限促成了定义的重构。其一，定义 13.1 要求 $Y$ 离散或具有密度：若 $Y$ 的分布是混合型或奇异型（例如 $Y$ 为 Cantor 分布，或 $Y=\mathbf 1_{\{Z>0\}}+\mathrm e^{Z}$ 这类既有原子又有连续部分的变量），条件密度根本不存在。其二，也是更本质的，实际问题的「信息」常常不是由单个随机变量生成的。在过滤噪声、估计隐状态或定价路径依赖产品时，我们掌握的是截至时刻 $t$ 的全部可观测事件，这是一个 σ-代数而非一个随机变量；鞅的定义、Doob 分解、停时定理都必须直接以 σ-代数为条件。解决之道是抛弃「先求条件分布、再积分」的路径，转而用积分等式直接刻画条件期望本身。

**定义 13.3（子 σ-代数与 σ(Y)）**

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间。$\mathcal F$ 的一个子集族 $\mathcal G$ 称为 $\mathcal F$ 的子 σ-代数，若 $\mathcal G$ 自身是一个 σ-代数且 $\mathcal G\subset\mathcal F$，即 $\Omega\in\mathcal G$，$A\in\mathcal G\Rightarrow A^{\mathrm c}\in\mathcal G$，且 $A_1,A_2,\dots\in\mathcal G\Rightarrow\bigcup_{n\ge 1}A_n\in\mathcal G$。对随机变量 $Y:\Omega\to\mathbb R$，定义它生成的 σ-代数为
$$
\sigma(Y)=\bigl\{Y^{-1}(B):B\in\mathcal B(\mathbb R)\bigr\}=\bigl\{\{\omega\in\Omega:Y(\omega)\in B\}:B\in\mathcal B(\mathbb R)\bigr\},
\tag{13.4}
$$
其中 $\mathcal B(\mathbb R)$ 为 $\mathbb R$ 上的 Borel σ-代数。对随机向量 $Y=(Y_1,\dots,Y_n)$ 或随机过程 $Y=(Y_t)_{t\in T}$，$\sigma(Y)$ 定义为使全体分量可测的最小子 σ-代数，即 $\sigma(Y)=\sigma\bigl(\bigcup_i\sigma(Y_i)\bigr)$ 或 $\sigma\bigl(\bigcup_{t\in T}\sigma(Y_t)\bigr)$。

由 (13.4) 直接验证，$\sigma(Y)$ 确实是一个 σ-代数，并且它是使 $Y$ 可测的最小子 σ-代数：任何使 $Y$ 可测的 σ-代数都必须包含全部形如 $Y^{-1}(B)$ 的集合，因而包含 $\sigma(Y)$。

$\sigma(Y)$ 的直观含义是「观测 $Y$ 所获得的全部信息」。集合 $A\in\sigma(Y)$ 当且仅当仅凭 $Y$ 的取值就能判断 $A$ 是否发生，因此 $\sigma(Y)$ 恰是「$Y$ 能回答的所有问题」的集合。与之对应，一条基本事实是：随机变量 $Z$ 关于 $\sigma(Y)$ 可测，当且仅当存在 Borel 可测函数 $g:\mathbb R\to\mathbb R$ 使 $Z=g(Y)$。其论证分三步：若 $Z=\mathbf 1_A$ 且 $A\in\sigma(Y)$，则 $A=Y^{-1}(B)$，取 $g=\mathbf 1_B$ 即可；由线性性，结论对 $\sigma(Y)$-可测的简单函数成立；对一般的非负 $\sigma(Y)$-可测 $Z$，取递增简单函数列 $Z_n\uparrow Z$，每个 $Z_n=g_n(Y)$，令 $g=\sup_n g_n$，则 $g$ 为 Borel 可测且 $Z=g(Y)$；一般的 $Z$ 分解为 $Z^+-Z^-$ 处理。因此「$\sigma(Y)$-可测」与「$Y$ 的函数」是同一件事的两种说法，这就是为什么记号 $\mathbb E[X\mid Y]$ 与 $\mathbb E[X\mid\sigma(Y)]$ 可以互换。

信息的多少由 σ-代数的包含关系刻画。若 $\mathcal H\subset\mathcal G$，则 $\mathcal G$ 包含更多可观测事件，即信息更丰富；极端情形是平凡 σ-代数 $\mathcal G_0=\{\varnothing,\Omega\}$（无任何信息）与 $\mathcal G=\mathcal F$（完全信息）。一个递增的 σ-代数族 $(\mathcal F_t)_{t\ge 0}$，即满足 $s\le t\Rightarrow\mathcal F_s\subset\mathcal F_t$ 的族，称为滤子，它刻画了信息随时间的累积；在金融模型中 $\mathcal F_t=\sigma\bigl((S_u)_{0\le u\le t}\bigr)$ 表示到时刻 $t$ 为止由资产价格路径产生的信息。有限划分提供了最直观的图像：若 $\mathcal G$ 由两两不交、并为 $\Omega$ 的集合 $A_1,\dots,A_n$ 生成，则 $\mathcal G=\{\bigcup_{i\in I}A_i:I\subset\{1,\dots,n\}\}$，共 $2^n$ 个元素，每个 $A_i$ 称为 $\mathcal G$ 的一个原子，观测 $\mathcal G$ 等价于确定样本点落在哪一个原子上。

**定义 13.4（条件期望）**

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间，$\mathcal G\subset\mathcal F$ 为子 σ-代数，$X$ 为可积随机变量（$\mathbb E\lvert X\rvert<\infty$）。$X$ 关于 $\mathcal G$ 的条件期望是满足以下两条性质的随机变量 $Z$：

（i）$Z$ 是 $\mathcal G$-可测的；

（ii）对每一个 $A\in\mathcal G$，都有
$$
\int_A Z\,d\mathbb P=\int_A X\,d\mathbb P,\qquad\text{即}\qquad \mathbb E\bigl[Z\mathbf 1_A\bigr]=\mathbb E\bigl[X\mathbf 1_A\bigr].
\tag{13.5}
$$

满足 (i)(ii) 的 $Z$ 记为 $\mathbb E[X\mid\mathcal G]$。当 $X\ge 0$ 但不必可积时，允许 $Z$ 取值 $+\infty$，条件 (ii) 中的积分按非负可测函数的积分理解（可能为 $+\infty$），此时同样存在满足 (i)(ii) 的 $Z$，仍记为 $\mathbb E[X\mid\mathcal G]$。

条件 (ii) 的含义值得仔细体会。它要求 $Z$ 与 $X$ 在「每一个 $\mathcal G$ 能够识别的事件上」具有相同的积分，也就是说，凡是信息 $\mathcal G$ 能够提出的问题，$Z$ 给出的答案与 $X$ 完全一致；$Z$ 与 $X$ 的区别只可能出现在 $\mathcal G$ 无法分辨的细节上，即出现在同一个原子的内部。条件 (i) 则要求 $Z$ 本身是可由 $\mathcal G$ 观测的，不允许它使用 $\mathcal G$ 之外的信息。当 $\mathcal G$ 由有限划分 $\{A_1,\dots,A_n\}$ 生成且各 $\mathbb P(A_i)>0$ 时，这两条完全确定了 $Z$：由 (i)，$Z$ 在每个 $A_i$ 上是常数，设为 $c_i$；把 (ii) 用于 $A=A_i$ 得 $c_i\mathbb P(A_i)=\int_{A_i}X\,d\mathbb P$，故
$$
\mathbb E[X\mid\mathcal G]=\sum_{i=1}^{n}\mathbb E[X\mid A_i]\,\mathbf 1_{A_i},\qquad \mathbb E[X\mid A_i]=\frac{\mathbb E[X\mathbf 1_{A_i}]}{\mathbb P(A_i)}.
$$
这个显式公式既是对定义 13.4 的一次直接验证（它满足 (i)，因为每个 $\mathbf 1_{A_i}$ 都是 $\mathcal G$-可测的，有限线性组合仍可测；(ii) 由 $A=\bigcup_{i\in I}A_i$ 与积分的可加性得到），也给出了条件期望最清晰的图像：条件期望就是把 $X$ 在信息的每个原子上取平均。若某个 $A_i$ 满足 $\mathbb P(A_i)=0$，则 $c_i$ 完全不受约束，通常约定取 $0$；这正预示了下面的一般唯一性结论。一般 σ-代数未必有原子（例如 $\mathcal G=\mathcal B([0,1])$ 配 Lebesgue 测度没有原子），此时 (ii) 就是上述「在每个可观测事件上积分相符」的原子平均性质的正确推广。

存在性与唯一性由 Radon–Nikodym 定理给出。这里陈述该定理而不加证明，它是测度论的标准结果。

（Radon–Nikodym 定理）设 $\mu$ 与 $\nu$ 为可测空间 $(\Omega,\mathcal G)$ 上的 σ-有限测度，且 $\nu\ll\mu$（即 $\mu(A)=0\Rightarrow\nu(A)=0$）。则存在非负 $\mathcal G$-可测函数 $f$，使得对一切 $A\in\mathcal G$ 有 $\nu(A)=\int_A f\,d\mu$；这样的 $f$ 在 $\mu$-几乎必然相等的意义下唯一，记为 $f=d\nu/d\mu$。

把它用于条件期望：固定可积的 $X$，在 $(\Omega,\mathcal G)$ 上定义集函数 $\nu(A)=\int_A X\,d\mathbb P$，$A\in\mathcal G$。由积分的可数可加性，$\nu$ 是 $(\Omega,\mathcal G)$ 上的有限符号测度（若 $X\ge 0$ 则为有限或 σ-有限的非负测度），且 $\nu\ll\mathbb P\vert_{\mathcal G}$：若 $\mathbb P(A)=0$ 则 $\int_A X\,d\mathbb P=0$。于是 Radon–Nikodym 定理给出 $\mathcal G$-可测的 $Z=d\nu/d(\mathbb P\vert_{\mathcal G})$，满足 $\int_A Z\,d\mathbb P=\nu(A)=\int_A X\,d\mathbb P$ 对一切 $A\in\mathcal G$ 成立，这正是 (i)(ii)。因此条件期望总是存在的，且它是 $\mathbb P\vert_{\mathcal G}$-几乎必然唯一的 Radon–Nikodym 导数。

唯一性部分可以不依赖 Radon–Nikodym 定理而直接证明，且这个简短论证揭示了「几乎必然唯一」的确切含义。

**证明**

设 $Z_1,Z_2$ 均满足 (i)(ii)，令 $W=Z_1-Z_2$。由 (i)，$W$ 为 $\mathcal G$-可测，故 $A^+=\{W>0\}$ 与 $A^-=\{W<0\}$ 都属于 $\mathcal G$。由 (ii) 相减，对任意 $A\in\mathcal G$ 有 $\int_A W\,d\mathbb P=0$。取 $A=A^+$ 得 $\int_{A^+}W\,d\mathbb P=0$，而被积函数在 $A^+$ 上严格为正，故必有 $\mathbb P(A^+)=0$；同理 $\mathbb P(A^-)=0$。于是 $\mathbb P(Z_1\ne Z_2)\le\mathbb P(A^+)+\mathbb P(A^-)=0$，即 $Z_1=Z_2$ 几乎必然。

□

由此得到本节的关键认识：$\mathbb E[X\mid\mathcal G]$ 是一个几乎必然唯一确定的等价类，而不是一个逐点确定的函数。这也彻底解释了 13.1 节遗留的问题：$\mathbb E[X\mid Y=y]$ 作为 $y$ 的函数只在 $\mathbb P_Y$-几乎必然有意义，因为在 $f_Y(y)=0$ 或 $y$ 落在某个 $\mathbb P_Y$-零测集上时，改变 $g$ 的值不影响随机变量 $g(Y)$，从而不影响任何概率结论。

由定义还可以立即得到可积性：若 $X$ 可积，则 $\mathbb E[X\mid\mathcal G]$ 也可积，且 $\mathbb E\bigl\lvert\mathbb E[X\mid\mathcal G]\bigr\rvert\le\mathbb E\lvert X\rvert$。论证如下：令 $A=\{\mathbb E[X\mid\mathcal G]\ge 0\}\in\mathcal G$，则
$$
\mathbb E\bigl\lvert\mathbb E[X\mid\mathcal G]\bigr\rvert=\int_A\mathbb E[X\mid\mathcal G]\,d\mathbb P-\int_{A^{\mathrm c}}\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_A X\,d\mathbb P-\int_{A^{\mathrm c}}X\,d\mathbb P\le\mathbb E\lvert X\rvert+\mathbb E\lvert X\rvert,
$$
更精确地，由 $\int_A X\,d\mathbb P\le\int_A\lvert X\rvert\,d\mathbb P$ 与 $-\int_{A^{\mathrm c}}X\,d\mathbb P\le\int_{A^{\mathrm c}}\lvert X\rvert\,d\mathbb P$ 相加即得 $\mathbb E\lvert\mathbb E[X\mid\mathcal G]\rvert\le\mathbb E\lvert X\rvert<\infty$。

在一般定义之下，与随机变量有关的记号约定如下：$\mathbb E[X\mid Y]$ 表示 $\mathbb E[X\mid\sigma(Y)]$；若 $g$ 为 Borel 函数且 $\mathbb E[X\mid\sigma(Y)]=g(Y)$ 几乎必然，则记 $\mathbb E[X\mid Y=y]=g(y)$，并称 $g$ 为条件期望的一个版本。由上一段的讨论，这样的 $g$ 在 $\mathbb P_Y$-几乎必然意义下唯一。类似地，$\mathbb E[X\mid Y_1,\dots,Y_n]$ 表示 $\mathbb E[X\mid\sigma(Y_1,\dots,Y_n)]$，$\mathbb E[X\mid\mathcal F_t]$ 表示以时刻 $t$ 的信息为条件。

命题 13.5 说明定义 13.4 确实推广了定义 13.1，即当初等条件期望存在时，它自动满足一般定义的两条性质。

**命题 13.5（初等定义是一般定义的特例）**

设 $X$ 可积，$Y$ 为随机变量，$\mathcal G=\sigma(Y)$。

（离散情形）若 $Y$ 取值于可数集 $S$，令 $g(y)=\mathbb E[X\mid Y=y]$（当 $\mathbb P(Y=y)=0$ 时任意规定，例如取 $g(y)=0$）。则 $Z=g(Y)$ 满足定义 13.4 的 (i)(ii)，从而 $\mathbb E[X\mid\sigma(Y)]=g(Y)$ 几乎必然。

（连续情形）若 $(X,Y)$ 有联合密度 $f_{X,Y}$，令 $g$ 由式 (13.1) 给出（当 $f_Y(y)=0$ 时取 $g(y)=0$）。则 $Z=g(Y)$ 同样满足 (i)(ii)，从而 $\mathbb E[X\mid\sigma(Y)]=g(Y)$ 几乎必然。

**证明**

（i）可测性。在两种情形下 $g$ 都是 Borel 可测函数：离散情形 $g$ 定义在可数集上，自然可测；连续情形由 (13.1)，$g(y)=h(y)/f_Y(y)$ 在 $\{f_Y>0\}$ 上，其中 $h(y)=\int x f_{X,Y}(x,y)\,dx$ 与 $f_Y$ 均为 Borel 可测（可测性由 Fubini 定理对非负与可积被积函数的标准结论给出），且在 $\{f_Y=0\}$ 上 $g\equiv 0$，故 $g$ 为两个可测函数的组合，可测。于是 $Z=g(Y)$ 是 $\sigma(Y)$-可测的。

（ii）积分等式。$\sigma(Y)$ 中的每个集合都具有 $A=\{Y\in B\}=\{\omega:Y(\omega)\in B\}$ 的形式，其中 $B\in\mathcal B(\mathbb R)$。

先设离散情形。由 $g$ 的定义，对每个满足 $\mathbb P(Y=y)>0$ 的 $y$ 有 $g(y)\mathbb P(Y=y)=\sum_x x\,\mathbb P(X=x,Y=y)$，而当 $\mathbb P(Y=y)=0$ 时两边同为 $0$（左边因含因子 $\mathbb P(Y=y)=0$，右边因为每个 $\mathbb P(X=x,Y=y)\le\mathbb P(Y=y)=0$）。于是对任意 Borel 集 $B$，
$$
\int_A Z\,d\mathbb P=\mathbb E\bigl[g(Y)\mathbf 1_B(Y)\bigr]=\sum_{y\in B\cap S}g(y)\mathbb P(Y=y)=\sum_{y\in B\cap S}\sum_{x}x\,\mathbb P(X=x,Y=y)=\mathbb E\bigl[X\mathbf 1_B(Y)\bigr]=\int_A X\,d\mathbb P,
$$
其中第三个等号用到绝对收敛（由 $\mathbb E\lvert X\rvert<\infty$，级数 $\sum_{y}\sum_x\lvert x\rvert\mathbb P(X=x,Y=y)=\mathbb E\lvert X\rvert<\infty$，故可任意交换求和次序），最后一个等号是离散型随机变量期望的定义。

再设连续情形。首先注意恒等式 $g(y)f_Y(y)=\int_{\mathbb R}x f_{X,Y}(x,y)\,dx$ 对 Lebesgue-几乎所有 $y$ 成立：在 $f_Y(y)>0$ 处它就是 (13.1)；在 $f_Y(y)=0$ 处，由 $f_{X,Y}\ge 0$ 且 $\int f_{X,Y}(x,y)\,dx=f_Y(y)=0$ 知 $f_{X,Y}(x,y)=0$ 对几乎所有 $x$ 成立，故右端亦为 $0$，而左端因 $f_Y(y)=0$ 也是 $0$。于是对任意 Borel 集 $B$，由 Fubini 定理（适用性由 $\int\int\lvert x\rvert f_{X,Y}(x,y)\,dx\,dy=\mathbb E\lvert X\rvert<\infty$ 保证），
$$
\int_A Z\,d\mathbb P=\int_{\mathbb R}\mathbf 1_B(y)g(y)f_Y(y)\,dy=\int_B\int_{\mathbb R}x f_{X,Y}(x,y)\,dx\,dy=\mathbb E\bigl[X\mathbf 1_B(Y)\bigr]=\int_A X\,d\mathbb P.
$$

两种情形都验证了 (ii)。由定义 13.4 的唯一性，$\mathbb E[X\mid\sigma(Y)]=g(Y)$ 几乎必然。若 $X\ge 0$ 而不可积，令 $X_n=X\wedge n$，对每个 $n$ 应用已证结论得 $\mathbb E[X_n\mid\sigma(Y)]=g_n(Y)$，其中 $g_n$ 由初等公式给出；由 $X_n\uparrow X$ 与非负情形的初等公式，$g_n(y)\uparrow g(y)$，再对 (ii) 用单调收敛定理即得结论。

□

命题 13.5 的意义不只是形式上的兼容。它说明测度论定义并没有改变任何初等计算的结果，只是把这些结果放置在一个不需要密度、不需要离散性、不需要 $\mathbb P(Y=y)>0$ 的框架中；同时它精确地指出了初等结果的效力范围——等式 $\mathbb E[X\mid Y]=g(Y)$ 是几乎必然成立的，而不是逐点成立的恒等式。

条件期望最贴切的解释是：$\mathbb E[X\mid\mathcal G]$ 是「用 $\mathcal G$ 中的信息所能看到的 $X$ 的最佳近似」。这句话有三层可以被严格化的含义。第一层是可观测性：$\mathbb E[X\mid\mathcal G]$ 关于 $\mathcal G$ 可测，因此它是一个可以由信息 $\mathcal G$ 计算出来的量，不含任何额外信息；这正是条件 (i) 的作用。第二层是无偏性：条件 (ii) 表明它在每一个可观测事件上与 $X$ 的积分相符，特别地取 $A=\Omega$ 得 $\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\bigr]=\mathbb E[X]$，即它没有系统性地高估或低估 $X$。第三层是最优性：若进一步假定 $X$ 平方可积，则 $\mathbb E[X\mid\mathcal G]$ 在所有 $\mathcal G$-可测的平方可积随机变量中使均方误差 $\mathbb E\bigl[(X-Z)^2\bigr]$ 最小，且残差 $X-\mathbb E[X\mid\mathcal G]$ 与任意 $\mathcal G$-可测平方可积变量不相关；这就是 $L^2$ 正交投影的刻画，13.5 节将给出完整证明。在 $L^1$ 意义下也有类似的最优性：$\mathbb E[X\mid\mathcal G]$ 使 $\mathbb E\lvert X-Z\rvert$ 最小。因此「条件期望 = 在信息约束下的最优预测」不是比喻，而是可以在 Hilbert 空间与 Banach 空间中分别严格证明的命题。

必须强调的是，这个「最佳近似」只在几乎必然意义下唯一。若 $Z_1$ 与 $Z_2$ 都满足 (i)(ii)，则它们在一个 $\mathbb P$-零测集之外完全相同，但在这个零测集上可以任意取值；同样，$\mathbb E[X\mid Y=y]$ 作为 $y$ 的函数在 $\mathbb P_Y$-零测集上不受约束。由此产生两条实践中必须遵守的纪律。其一，任何形如「$\mathbb E[X\mid\mathcal G]=\cdots$」的结论都应当被读作「几乎必然相等」，因此不能对条件期望作逐点的代数操作后再断言逐点结论，例如不能由 $\mathbb E[X\mid\mathcal G]=0$ 几乎必然推出 $X=0$。其二，涉及条件期望的不可数族（例如对每个 $t$ 都有 $\mathbb E[M_T\mid\mathcal F_t]=M_t$）时，每个 $t$ 各自有一个零测例外集，它们的并未必是零测集，因此需要额外选取「良好版本」（如右连左 lim 修正）才能得到逐点成立的轨道性质；这是鞅论中一个实质性的技术难点，将在第 25 章处理。

还有一个常见误区值得在此指出。$\mathbb E[X\mid\mathcal G]$ 是随机变量，$\mathbb E[X]$ 是常数，二者不可混用；写成 $\mathbb E[X\mid Y]$ 时结果是随机变量，写成 $\mathbb E[X\mid Y=y]$ 时结果是实数，而 $\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=\mathbb E[X]$ 是把两者联系起来的桥梁。另一个误区是认为「$\mathbb E[X\mid\mathcal G]$ 一定介于 $X$ 的最大值与最小值之间」——正确的说法是它介于 $X$ 的本性下确界与本性上确界之间（由 13.3 节的单调性可推出），而在具体样本点上它可能远离 $X(\omega)$，因为它反映的是同一原子上的平均，而非该点的取值。

## 13.3 条件期望的性质

本节建立条件期望的运算规则。这些规则看似平凡，但它们是后续所有计算的工具，且每一条的证明都必须落实到定义 13.4 的两条性质与唯一性上；这正是测度论概率的典型风格：所有性质都从一个积分恒等式出发。以下若不加说明，$X,X_1,X_2$ 均假定可积，$\mathcal G\subset\mathcal F$ 为子 σ-代数，所有等式与不等式均在几乎必然意义下成立。

**定理 13.6（条件期望的基本性质）**

（a）线性性：对任意实数 $a,b$，$\mathbb E[aX_1+bX_2\mid\mathcal G]=a\,\mathbb E[X_1\mid\mathcal G]+b\,\mathbb E[X_2\mid\mathcal G]$。

（b）单调性：若 $X_1\le X_2$ 几乎必然，则 $\mathbb E[X_1\mid\mathcal G]\le\mathbb E[X_2\mid\mathcal G]$ 几乎必然；特别地 $X\ge 0$ 几乎必然蕴含 $\mathbb E[X\mid\mathcal G]\ge 0$ 几乎必然。

（c）塔性质（全期望公式）：
$$
\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\bigr]=\mathbb E[X];
$$
更一般地，若 $\mathcal H\subset\mathcal G$ 为子 σ-代数，则
$$
\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\mid\mathcal H\bigr]=\mathbb E[X\mid\mathcal H],\qquad \mathbb E\bigl[\mathbb E[X\mid\mathcal H]\mid\mathcal G\bigr]=\mathbb E[X\mid\mathcal H].
\tag{13.6}
$$

（d）提取已知量：若 $Y$ 为 $\mathcal G$-可测且有界的随机变量，则
$$
\mathbb E[XY\mid\mathcal G]=Y\,\mathbb E[X\mid\mathcal G].
\tag{13.7}
$$

（e）独立性：若 $X$ 与 $\mathcal G$ 独立（即 $\sigma(X)$ 与 $\mathcal G$ 独立），则 $\mathbb E[X\mid\mathcal G]=\mathbb E[X]$。

（f）条件 Jensen 不等式：若 $\varphi:\mathbb R\to\mathbb R$ 为凸函数且 $\varphi(X)$ 可积，则
$$
\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)\le\mathbb E[\varphi(X)\mid\mathcal G].
\tag{13.8}
$$

**证明**

（a）令 $Z=a\,\mathbb E[X_1\mid\mathcal G]+b\,\mathbb E[X_2\mid\mathcal G]$。两个 $\mathcal G$-可测函数的线性组合仍 $\mathcal G$-可测，故 $Z$ 满足 (i)；且 $Z$ 可积，因为 $\mathbb E\lvert Z\rvert\le\lvert a\rvert\mathbb E\lvert\mathbb E[X_1\mid\mathcal G]\rvert+\lvert b\rvert\mathbb E\lvert\mathbb E[X_2\mid\mathcal G]\rvert\le\lvert a\rvert\mathbb E\lvert X_1\rvert+\lvert b\rvert\mathbb E\lvert X_2\rvert<\infty$。对任意 $A\in\mathcal G$，由 Lebesgue 积分的线性性与 (13.5)，
$$
\int_A Z\,d\mathbb P=a\int_A\mathbb E[X_1\mid\mathcal G]\,d\mathbb P+b\int_A\mathbb E[X_2\mid\mathcal G]\,d\mathbb P=a\int_A X_1\,d\mathbb P+b\int_A X_2\,d\mathbb P=\int_A(aX_1+bX_2)\,d\mathbb P,
$$
即 $Z$ 满足 (ii)。由唯一性，$Z=\mathbb E[aX_1+bX_2\mid\mathcal G]$ 几乎必然。

（b）设 $X_1\le X_2$ 几乎必然，令 $W=\mathbb E[X_1\mid\mathcal G]-\mathbb E[X_2\mid\mathcal G]$，由 (a) 有 $W=\mathbb E[X_1-X_2\mid\mathcal G]$。考虑集合 $A=\{W>0\}$，它属于 $\mathcal G$，因为 $W$ 为 $\mathcal G$-可测。由 (ii)，
$$
\int_A W\,d\mathbb P=\int_A(X_1-X_2)\,d\mathbb P\le 0,
$$
最后一个不等号是因为 $X_1-X_2\le 0$ 几乎必然，故其在任何集合上的积分非正。但被积函数 $W$ 在 $A$ 上严格为正，若 $\mathbb P(A)>0$ 则 $\int_A W\,d\mathbb P>0$，矛盾。因此 $\mathbb P(A)=0$，即 $W\le 0$ 几乎必然。取 $X_1=0$、$X_2=X\ge 0$ 即得特别情形。

（c）在 (13.5) 中取 $A=\Omega\in\mathcal G$，得 $\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\bigr]=\int_{\Omega}\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_{\Omega}X\,d\mathbb P=\mathbb E[X]$，这就是塔性质。对一般的 $\mathcal H\subset\mathcal G$，先证第一个等式：令 $U=\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\mid\mathcal H\bigr]$。由于 $\mathbb E[X\mid\mathcal H]$ 是 $\mathcal H$-可测的，而 $\mathcal H\subset\mathcal G$，它也是 $\mathcal G$-可测的，故 $V:=\mathbb E[X\mid\mathcal H]$ 满足「$V$ 为 $\mathcal G$-可测」这一条；对任意 $A\in\mathcal H\subset\mathcal G$，由 (13.5) 用于 $\mathcal G$ 得 $\int_A V\,d\mathbb P=\int_A X\,d\mathbb P$，由唯一性 $V=\mathbb E[X\mid\mathcal G]$ 几乎必然，这就是 (13.6) 的第二个等式。另一方面，$U$ 是 $\mathcal H$-可测的，且对任意 $A\in\mathcal H$，
$$
\int_A U\,d\mathbb P=\int_A\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_A X\,d\mathbb P,
$$
其中第一个等号是 $\mathcal H$-条件期望的定义 (13.5)，第二个等号是 $\mathcal G$-条件期望的定义 (13.5)（这里用到了 $A\in\mathcal H\subset\mathcal G$）。故 $U$ 满足 $\mathbb E[X\mid\mathcal H]$ 的两条性质，由唯一性 $U=\mathbb E[X\mid\mathcal H]$ 几乎必然，即第一个等式成立。塔性质的直观含义是「先按更粗的信息平均，再按更细的信息平均，等于直接按更粗的信息平均」，也即条件期望算子构成一个投影族：信息越少，投影越粗，且粗投影可以先做。

（d）分三步。第一步，设 $Y=\mathbf 1_B$，$B\in\mathcal G$。则 $\mathbf 1_B\mathbb E[X\mid\mathcal G]$ 为 $\mathcal G$-可测且可积；对任意 $A\in\mathcal G$，$A\cap B\in\mathcal G$，故
$$
\int_A\mathbf 1_B\,\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_{A\cap B}\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_{A\cap B}X\,d\mathbb P=\int_A\mathbf 1_B X\,d\mathbb P,
$$
由唯一性得 $\mathbb E[\mathbf 1_B X\mid\mathcal G]=\mathbf 1_B\mathbb E[X\mid\mathcal G]$。第二步，由 (a) 的线性性，上式推广到任意 $\mathcal G$-可测的简单函数 $Y=\sum_{i=1}^{m}c_i\mathbf 1_{B_i}$，$B_i\in\mathcal G$：$\mathbb E[XY\mid\mathcal G]=\sum_i c_i\mathbb E[X\mathbf 1_{B_i}\mid\mathcal G]=\sum_i c_i\mathbf 1_{B_i}\mathbb E[X\mid\mathcal G]=Y\,\mathbb E[X\mid\mathcal G]$。第三步，设 $Y$ 为一般的 $\mathcal G$-可测有界函数，$\lvert Y\rvert\le M$。由可测函数的标准逼近定理，存在 $\mathcal G$-可测的简单函数列 $(Y_n)$ 满足 $\lvert Y_n\rvert\le M$ 且 $Y_n\to Y$ 逐点（例如取 $Y_n$ 为对 $Y$ 作 $2^{-n}$ 网格截断所得的逼近）。对每个 $A\in\mathcal G$，由第二步
$$
\int_A Y_n\,\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_A Y_n X\,d\mathbb P.
$$
右端被 $\lvert Y_nX\rvert\le M\lvert X\rvert$ 控制，左端被 $\lvert Y_n\mathbb E[X\mid\mathcal G]\rvert\le M\lvert\mathbb E[X\mid\mathcal G]\rvert$ 控制，两个控制函数都可积（后者由本节前段的可积性结论）。由控制收敛定理令 $n\to\infty$，得
$$
\int_A Y\,\mathbb E[X\mid\mathcal G]\,d\mathbb P=\int_A YX\,d\mathbb P,\qquad \forall A\in\mathcal G.
$$
而 $Y\,\mathbb E[X\mid\mathcal G]$ 是 $\mathcal G$-可测且可积的（$\lvert Y\mathbb E[X\mid\mathcal G]\rvert\le M\lvert\mathbb E[X\mid\mathcal G]\rvert$），故由唯一性得 (13.7)。

（e）常数 $\mathbb E[X]$ 关于任何 σ-代数都可测，故满足 (i)。对任意 $A\in\mathcal G$，事件 $A$ 属于 $\mathcal G$ 而 $X$ 与 $\mathcal G$ 独立，故随机变量 $X$ 与 $\mathbf 1_A$ 独立，由独立随机变量乘积的期望等于期望之积（第 12 章），$\int_A X\,d\mathbb P=\mathbb E[X\mathbf 1_A]=\mathbb E[X]\mathbb E[\mathbf 1_A]=\mathbb E[X]\mathbb P(A)=\int_A\mathbb E[X]\,d\mathbb P$，即 (ii) 成立。由唯一性得结论。

（f）凸函数 $\varphi$ 的关键性质是它可以写成可数个仿射函数的逐点上确界。具体地，对每个有理点 $q\in\mathbb Q$，凸性保证存在次梯度 $a_q\in\mathbb R$ 使 $\varphi(t)\ge\varphi(q)+a_q(t-q)$ 对一切 $t\in\mathbb R$ 成立；记 $\ell_q(t)=\varphi(q)+a_q(t-q)$，则 $\ell_q\le\varphi$。反过来，固定 $t$，取有理数列 $q_n\to t$；由 $\varphi$ 在 $\mathbb R$ 上连续且在紧区间上 Lipschitz，次梯度 $a_{q_n}$ 有界，故可取子列使 $a_{q_{n_k}}\to a$，于是 $\ell_{q_{n_k}}(t)=\varphi(q_{n_k})+a_{q_{n_k}}(t-q_{n_k})\to\varphi(t)$，从而 $\sup_{q\in\mathbb Q}\ell_q(t)\ge\varphi(t)$。综上
$$
\varphi(t)=\sup_{q\in\mathbb Q}\bigl(a_q t+b_q\bigr),\qquad b_q:=\varphi(q)-a_q q,
$$
即 $\varphi$ 是可数个仿射函数的上确界。对每个 $q$，由 $a_qX+b_q\le\varphi(X)$ 与 (b) 的单调性、(a) 的线性性，
$$
a_q\,\mathbb E[X\mid\mathcal G]+b_q=\mathbb E[a_qX+b_q\mid\mathcal G]\le\mathbb E[\varphi(X)\mid\mathcal G]\quad\text{几乎必然}.
$$
对每个 $q$ 存在一个零测例外集 $N_q$，令 $N=\bigcup_{q\in\mathbb Q}N_q$，由可数性 $\mathbb P(N)=0$。在 $N^{\mathrm c}$ 上对 $q$ 取上确界，得
$$
\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)=\sup_{q\in\mathbb Q}\bigl(a_q\mathbb E[X\mid\mathcal G]+b_q\bigr)\le\mathbb E[\varphi(X)\mid\mathcal G],
$$
这就是 (13.8)。可数性在此处不可省略：若对不可数个 $q$ 各自取例外集，其并可能不是零测集。最后，对 (13.8) 两边取期望并用塔性质 (c)，得 $\varphi(\mathbb E[X])\le\mathbb E[\varphi(X)]$，即普通的 Jensen 不等式是条件 Jensen 不等式的推论；同时 (13.8) 也表明 $\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)$ 可积，因为它的期望被 $\mathbb E[\varphi(X)]<\infty$ 控制。

□

注记。取 $\varphi(t)=\lvert t\rvert$（凸函数）代入 (13.8)，得 $\bigl\lvert\mathbb E[X\mid\mathcal G]\bigr\rvert\le\mathbb E\bigl[\lvert X\rvert\mid\mathcal G\bigr]$，这是最常用的估计。取 $\varphi(t)=t^2$（$X$ 平方可积时）得 $\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2\le\mathbb E[X^2\mid\mathcal G]$，它是 13.4 节条件方差非负性的来源。取 $\varphi(t)=\mathrm e^{t}$ 得 $\exp\bigl(\mathbb E[X\mid\mathcal G]\bigr)\le\mathbb E[\mathrm e^{X}\mid\mathcal G]$，在对数正态模型与矩母函数估计中经常使用。条件 Jensen 不等式的方向不可颠倒：$\mathbb E[\varphi(X)\mid\mathcal G]$ 一般严格大于 $\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)$，等号成立当且仅当 $\varphi$ 在 $X$ 的条件分布支撑上是仿射的，或 $X$ 关于 $\mathcal G$ 几乎是确定的。

注记。性质 (d) 中「$Y$ 有界」的假设可以放宽。为此先证明条件期望的单调收敛定理：若 $0\le X_n\uparrow X$ 且 $X$ 可积（或 $X_n,X\ge 0$ 不加可积性），则 $\mathbb E[X_n\mid\mathcal G]\uparrow\mathbb E[X\mid\mathcal G]$ 几乎必然。证明：由 (b)，$Z_n=\mathbb E[X_n\mid\mathcal G]$ 递增且非负，故逐点极限 $Z=\lim_n Z_n$（可能取 $+\infty$）存在且 $\mathcal G$-可测；对任意 $A\in\mathcal G$，由 (13.5) 与单调收敛定理，$\int_A Z_n\,d\mathbb P=\int_A X_n\,d\mathbb P\uparrow\int_A X\,d\mathbb P$，同时 $\int_A Z_n\,d\mathbb P\uparrow\int_A Z\,d\mathbb P$，故 $\int_A Z\,d\mathbb P=\int_A X\,d\mathbb P$，由唯一性 $Z=\mathbb E[X\mid\mathcal G]$ 几乎必然。有了这一工具，(d) 可推广为：若 $Y$ 为 $\mathcal G$-可测且 $X$、$XY$ 均可积，则 $\mathbb E[XY\mid\mathcal G]=Y\,\mathbb E[X\mid\mathcal G]$ 几乎必然。其证明思路是：先对 $X\ge 0$、$Y\ge 0$ 令 $Y_n=Y\wedge n$ 用有界情形与单调收敛定理得到 $\mathbb E[XY\mid\mathcal G]=Y\,\mathbb E[X\mid\mathcal G]$，同时取期望可得 $\mathbb E\bigl[Y\,\mathbb E[X\mid\mathcal G]\bigr]=\mathbb E[XY]<\infty$，说明右端可积；再由 $\bigl\lvert Y\,\mathbb E[X\mid\mathcal G]\bigr\rvert\le Y\,\mathbb E[X\mid\mathcal G]$（$X,Y\ge 0$）与一般情形的分解 $X=X^+-X^-$、$Y=Y^+-Y^-$ 配合控制收敛定理完成。这一推广在应用中必不可少，因为许多自然出现的 $\mathcal G$-可测因子（如随机波动率、随机强度）本身无界。

注记。性质 (c) 中的塔性质还有一个常用变体：若 $\mathcal H\subset\mathcal G$ 且 $Y$ 为 $\mathcal H$-可测有界，则 $\mathbb E[YX\mid\mathcal H]=Y\,\mathbb E[X\mid\mathcal H]$，而 $\mathbb E\bigl[\mathbb E[XY\mid\mathcal G]\mid\mathcal H\bigr]$ 一般不等于 $\mathbb E[YX\mid\mathcal H]$，除非 $Y$ 也关于 $\mathcal G$ 可测（此时由 (d) 提取后再用 (c) 即得相等）。这类「信息层级不能随意交换」的现象是鞅计算中最容易出错的地方，务必逐条回到定义 (13.5) 检验。

命题 13.7 把定理 13.6(e) 单独提出并加以强化，因为它在建模中出现的频率极高：当某个因子与信息来源独立时，条件期望退化为无条件期望，模型因此大幅简化。

**命题 13.7（独立性与条件期望）**

设 $X$ 可积，$\mathcal G\subset\mathcal F$ 为子 σ-代数，且 $X$ 与 $\mathcal G$ 独立，即对任意 Borel 集 $B$ 与任意 $A\in\mathcal G$ 有 $\mathbb P\bigl(\{X\in B\}\cap A\bigr)=\mathbb P(X\in B)\mathbb P(A)$。则：

（i）$\mathbb E[X\mid\mathcal G]=\mathbb E[X]$ 几乎必然；

（ii）若 $Y$ 为 $\mathcal G$-可测且 $XY$ 可积，则 $\mathbb E[XY\mid\mathcal G]=Y\,\mathbb E[X]$ 几乎必然。

**证明**

（i）令 $Z\equiv\mathbb E[X]$ 为常值随机变量。常值函数关于任何 σ-代数都可测，故定义 13.4 的条件 (i) 成立。对任意 $A\in\mathcal G$，由假设 $\sigma(X)$ 与 $\mathcal G$ 独立，而 $\sigma(\mathbf 1_A)\subset\mathcal G$，故随机变量 $X$ 与 $\mathbf 1_A$ 独立；由独立随机变量乘积的期望公式（$X\mathbf 1_A$ 可积，因为 $\lvert X\mathbf 1_A\rvert\le\lvert X\rvert$），
$$
\int_A X\,d\mathbb P=\mathbb E[X\mathbf 1_A]=\mathbb E[X]\,\mathbb E[\mathbf 1_A]=\mathbb E[X]\mathbb P(A)=\int_A Z\,d\mathbb P.
$$
由定义 13.4 的唯一性，$Z=\mathbb E[X\mid\mathcal G]$ 几乎必然。

（ii）令 $W=Y\,\mathbb E[X]$。$Y$ 为 $\mathcal G$-可测而 $\mathbb E[X]$ 为常数，故 $W$ 为 $\mathcal G$-可测。先验证 $W$ 可积。由 $\sigma(Y)\subset\mathcal G$ 知 $X$ 与 $Y$ 独立，从而 $\lvert X\rvert$ 与 $\lvert Y\rvert$ 为非负的独立随机变量，由独立非负变量的乘积期望公式（Tonelli 定理），$\mathbb E\lvert XY\rvert=\mathbb E\lvert X\rvert\,\mathbb E\lvert Y\rvert$。左端有限，故当 $\mathbb E\lvert X\rvert>0$ 时 $\mathbb E\lvert Y\rvert<\infty$，于是 $\mathbb E\lvert W\rvert=\lvert\mathbb E[X]\rvert\,\mathbb E\lvert Y\rvert\le\mathbb E\lvert X\rvert\,\mathbb E\lvert Y\rvert=\mathbb E\lvert XY\rvert<\infty$；当 $\mathbb E\lvert X\rvert=0$ 时 $X=0$ 几乎必然，$W=0$，结论平凡。现对任意 $A\in\mathcal G$，随机变量 $Y\mathbf 1_A$ 为 $\mathcal G$-可测，故 $\sigma(Y\mathbf 1_A)\subset\mathcal G$，从而 $X$ 与 $Y\mathbf 1_A$ 独立；由独立性下的乘积期望公式（$X\cdot Y\mathbf 1_A$ 可积，因 $\lvert XY\mathbf 1_A\rvert\le\lvert XY\rvert$），
$$
\int_A XY\,d\mathbb P=\mathbb E\bigl[X\cdot(Y\mathbf 1_A)\bigr]=\mathbb E[X]\,\mathbb E[Y\mathbf 1_A]=\mathbb E[X]\int_A Y\,d\mathbb P=\int_A Y\,\mathbb E[X]\,d\mathbb P=\int_A W\,d\mathbb P.
$$
由唯一性得 $W=\mathbb E[XY\mid\mathcal G]$ 几乎必然。

□

注记。(ii) 的内容可以概括为一句话：独立的因子可以「穿过」条件期望符号。它与定理 13.6(d) 的「$\mathcal G$-可测的因子可以提到条件期望外面」是两条互补的规则，二者常常联合使用。例如在随机强度模型中，若 $\xi$ 与 $\mathcal G$ 独立而 $\Lambda$ 为 $\mathcal G$-可测，则 $\mathbb E[\Lambda\xi\mid\mathcal G]=\Lambda\,\mathbb E[\xi\mid\mathcal G]=\Lambda\,\mathbb E[\xi]$。

注记（逆命题不成立，常见误区）。由 $\mathbb E[X\mid\mathcal G]=\mathbb E[X]$ 几乎必然不能推出 $X$ 与 $\mathcal G$ 独立。反例：设 $X$ 取值 $-1,0,1$，概率分别为 $1/4,1/2,1/4$，则 $\mathbb E[X]=0$。令 $\mathcal G=\sigma(X^2)$，它由原子 $\{X=0\}$（概率 $1/2$）与 $\{X^2=1\}$（概率 $1/2$）生成。在 $\{X=0\}$ 上 $X$ 恒为 $0$，故条件期望为 $0$；在 $\{X^2=1\}$ 上，$\mathbb E\bigl[X\mid X^2=1\bigr]=\bigl[(-1)(1/4)+1(1/4)\bigr]/(1/2)=0$。因此 $\mathbb E[X\mid\mathcal G]\equiv 0=\mathbb E[X]$，但 $X$ 与 $\mathcal G$ 并不独立，例如 $\mathbb P(X=1,\,X^2=1)=1/4\ne\mathbb P(X=1)\mathbb P(X^2=1)=(1/4)(1/2)=1/8$。这个反例说明「条件期望不含信息」与「条件分布不含信息」是两回事：$\mathbb E[X\mid\mathcal G]$ 只捕捉条件分布的一阶矩，独立性则要求整个条件分布等于无条件分布。判断独立性必须检验 $\mathbb E[\varphi(X)\mid\mathcal G]=\mathbb E[\varphi(X)]$ 对足够多的 $\varphi$（例如一切有界连续函数）成立，而不能只检验 $\varphi(t)=t$。

**例 13.3**

设 $\Lambda$ 为正的随机变量，满足 $\mathbb E[\Lambda]=\mu$，$\mathbb E[\Lambda^2]<\infty$。给定 $\Lambda$ 时，计数变量 $N$ 服从参数为 $\Lambda$ 的 Poisson 分布，即 $\mathbb P(N=k\mid\Lambda)=\mathrm e^{-\Lambda}\Lambda^k/k!$，$k=0,1,2,\dots$。再给定 $(\Lambda,N)$ 时，令 $S=\sum_{i=1}^{N}\xi_i$，其中 $(\xi_i)_{i\ge 1}$ 为独立同分布的非负随机变量，与 $(\Lambda,N)$ 独立，$\mathbb E[\xi_1]=m$，$\mathbb E[\xi_1^2]=s^2$（约定 $N=0$ 时 $S=0$）。这是一个两层随机结构：$\Lambda$ 是随机强度，$N$ 是给定强度下的计数，$S$ 是随机个数的随机求和。求 $\mathbb E[S]$ 与 $\mathbb E[S^2]$，并取 $\Lambda\sim\operatorname{Exp}(\theta)$（密度 $\theta\mathrm e^{-\theta\lambda}$，$\lambda>0$）、$\xi_i\sim\operatorname{Exp}(1)$ 给出具体数值。

**解**

记 $\mathcal G=\sigma(\Lambda,N)$。整个计算的主线是：先用命题 13.7 与定理 13.6(d) 把关于 $\mathcal G$ 的条件期望化简为 $\Lambda$ 与 $N$ 的显式函数，再用塔性质 (13.6) 把无条件期望逐层剥离。

第一步，求 $\mathbb E[S\mid\mathcal G]$。由 $\xi_i\ge 0$，可用单调收敛定理处理有限和与无限和的交换。对任意 $A\in\mathcal G$，
$$
\mathbb E\bigl[S\mathbf 1_A\bigr]=\mathbb E\left[\sum_{i=1}^{N}\xi_i\,\mathbf 1_A\right]=\mathbb E\left[\sum_{i=1}^{\infty}\xi_i\,\mathbf 1_A\,\mathbf 1_{\{N\ge i\}}\right]=\sum_{i=1}^{\infty}\mathbb E\bigl[\xi_i\,\mathbf 1_A\,\mathbf 1_{\{N\ge i\}}\bigr],
$$
其中第二个等号把有限和写成带示性函数的无穷和（$\mathbf 1_{\{N\ge i\}}$ 在 $i>N$ 时为 $0$），第三个等号由非负项级数的单调收敛定理保证。由于 $A\in\mathcal G$ 且 $\{N\ge i\}\in\sigma(N)\subset\mathcal G$，随机变量 $\mathbf 1_A\mathbf 1_{\{N\ge i\}}$ 为 $\mathcal G$-可测，而 $\xi_i$ 与 $\mathcal G$ 独立，故由命题 13.7(ii)，
$$
\mathbb E\bigl[\xi_i\,\mathbf 1_A\,\mathbf 1_{\{N\ge i\}}\bigr]=\mathbb E[\xi_i]\,\mathbb E\bigl[\mathbf 1_A\mathbf 1_{\{N\ge i\}}\bigr]=m\,\mathbb P\bigl(A\cap\{N\ge i\}\bigr).
$$
代回并对 $i$ 求和，
$$
\mathbb E\bigl[S\mathbf 1_A\bigr]=m\sum_{i=1}^{\infty}\mathbb P\bigl(A\cap\{N\ge i\}\bigr)=m\,\mathbb E\bigl[\mathbf 1_A\sum_{i=1}^{\infty}\mathbf 1_{\{N\ge i\}}\bigr]=m\,\mathbb E\bigl[\mathbf 1_A N\bigr]=\mathbb E\bigl[mN\mathbf 1_A\bigr],
$$
其中用到 $\sum_{i\ge 1}\mathbf 1_{\{N\ge i\}}=N$。由于 $mN$ 为 $\mathcal G$-可测且非负，由定义 13.4 的唯一性（非负情形），
$$
\mathbb E[S\mid\mathcal G]=mN\quad\text{几乎必然}.
$$
这一步同时演示了两条规则的配合：与 $\mathcal G$ 独立的 $\xi_i$ 被替换为它的期望 $m$（命题 13.7），而 $\mathcal G$-可测的 $N$ 被原样保留（定理 13.6(d)）。

第二步，用塔性质求 $\mathbb E[S]$。由定理 13.6(c)，
$$
\mathbb E[S]=\mathbb E\bigl[\mathbb E[S\mid\mathcal G]\bigr]=\mathbb E[mN]=m\,\mathbb E[N].
$$
再对 $\mathbb E[N]$ 用塔性质，以 $\sigma(\Lambda)$ 为中间信息（注意 $\sigma(\Lambda)\subset\mathcal G$）：
$$
\mathbb E[N]=\mathbb E\bigl[\mathbb E[N\mid\Lambda]\bigr]=\mathbb E[\Lambda]=\mu,
$$
因为参数为 $\lambda$ 的 Poisson 分布均值为 $\lambda$，即 $\mathbb E[N\mid\Lambda]=\Lambda$。于是
$$
\mathbb E[S]=m\mu=m\,\mathbb E[\Lambda].
$$

第三步，求 $\mathbb E[S^2\mid\mathcal G]$。展开平方：
$$
S^2=\left(\sum_{i=1}^{N}\xi_i\right)^2=\sum_{i=1}^{N}\xi_i^2+2\sum_{1\le i<j\le N}\xi_i\xi_j=\sum_{i=1}^{\infty}\xi_i^2\mathbf 1_{\{N\ge i\}}+2\sum_{i=1}^{\infty}\sum_{j=i+1}^{\infty}\xi_i\xi_j\,\mathbf 1_{\{N\ge j\}}.
$$
对任意 $A\in\mathcal G$，重复第一步的论证（非负项，单调收敛定理允许逐项取期望；$\xi_i$ 与 $\mathcal G$ 及彼此独立），
$$
\mathbb E\bigl[S^2\mathbf 1_A\bigr]=\sum_{i=1}^{\infty}\mathbb E\bigl[\xi_i^2\bigr]\mathbb P\bigl(A\cap\{N\ge i\}\bigr)+2\sum_{i=1}^{\infty}\sum_{j=i+1}^{\infty}\mathbb E[\xi_i]\mathbb E[\xi_j]\,\mathbb P\bigl(A\cap\{N\ge j\}\bigr)
$$
$$
=s^2\,\mathbb E\bigl[\mathbf 1_A N\bigr]+2m^2\sum_{j=1}^{\infty}(j-1)\,\mathbb P\bigl(A\cap\{N=j\}\bigr)=\mathbb E\Bigl[\mathbf 1_A\bigl(s^2N+m^2N(N-1)\bigr)\Bigr].
$$
其中第二个求和用了 $\#\{i:1\le i<j\}=j-1$，随后 $\sum_{j}(j-1)\mathbb P(A\cap\{N=j\})=\mathbb E[\mathbf 1_A N(N-1)]$。由于 $s^2N+m^2N(N-1)$ 为 $\mathcal G$-可测且非负，由唯一性
$$
\mathbb E[S^2\mid\mathcal G]=s^2N+m^2N(N-1)\quad\text{几乎必然}.
$$

第四步，再次用塔性质求 $\mathbb E[S^2]$。需要 Poisson 分布的二阶阶乘矩：对参数 $\lambda$，
$$
\mathbb E\bigl[N(N-1)\mid\Lambda=\lambda\bigr]=\sum_{k=0}^{\infty}k(k-1)\mathrm e^{-\lambda}\frac{\lambda^k}{k!}=\mathrm e^{-\lambda}\lambda^2\sum_{j=0}^{\infty}\frac{\lambda^{j}}{j!}=\lambda^2,
$$
其中令 $j=k-2$，并用到 $\sum_{j\ge 0}\lambda^j/j!=\mathrm e^{\lambda}$。因此 $\mathbb E[N(N-1)\mid\Lambda]=\Lambda^2$，由塔性质
$$
\mathbb E\bigl[N(N-1)\bigr]=\mathbb E\bigl[\mathbb E[N(N-1)\mid\Lambda]\bigr]=\mathbb E[\Lambda^2].
$$
同理 $\mathbb E[N]=\mathbb E[\Lambda]$。代入第三步的结果，
$$
\mathbb E[S^2]=\mathbb E\bigl[\mathbb E[S^2\mid\mathcal G]\bigr]=s^2\,\mathbb E[N]+m^2\,\mathbb E\bigl[N(N-1)\bigr]=s^2\,\mathbb E[\Lambda]+m^2\,\mathbb E[\Lambda^2].
\tag{13.9}
$$
结合第二步，$\operatorname{Var}(S)=\mathbb E[S^2]-(\mathbb E[S])^2=s^2\mathbb E[\Lambda]+m^2\mathbb E[\Lambda^2]-m^2\bigl(\mathbb E[\Lambda]\bigr)^2=s^2\,\mathbb E[\Lambda]+m^2\operatorname{Var}(\Lambda)$。这一分解有很清楚的含义：总波动由两部分构成，第一部分 $s^2\mathbb E[\Lambda]$ 来自 individual 冲击 $\xi_i$ 的随机性以及计数的随机性（固定强度下的复合 Poisson 方差），第二部分 $m^2\operatorname{Var}(\Lambda)$ 来自强度 $\Lambda$ 本身的随机性，即「不确定性的不确定性」。13.4 节的全方差公式将给出得到同一分解的一般化路径，届时无需重复本例中的直接计算。

第五步，代入具体分布。设 $\Lambda\sim\operatorname{Exp}(\theta)$，则 $\mathbb E[\Lambda]=1/\theta=\mu$，$\mathbb E[\Lambda^2]=2/\theta^2$，$\operatorname{Var}(\Lambda)=1/\theta^2$。设 $\xi_i\sim\operatorname{Exp}(1)$，则 $m=1$，$s^2=\mathbb E[\xi^2]=\operatorname{Var}(\xi)+(\mathbb E\xi)^2=1+1=2$。取 $\theta=2$，得 $\mu=1/2$，$\mathbb E[\Lambda^2]=2/4=1/2$，于是
$$
\mathbb E[S]=m\mu=1\cdot\tfrac12=\tfrac12,\qquad \mathbb E[S^2]=s^2\mu+m^2\mathbb E[\Lambda^2]=2\cdot\tfrac12+1\cdot\tfrac12=1+\tfrac12=\tfrac32,
$$
$$
\operatorname{Var}(S)=\tfrac32-\left(\tfrac12\right)^2=\tfrac32-\tfrac14=\tfrac54,
$$
与公式 $s^2\mathbb E[\Lambda]+m^2\operatorname{Var}(\Lambda)=2\cdot\tfrac12+1\cdot\tfrac14=\tfrac54$ 一致。若忽略 $\Lambda$ 的随机性而错误地把它固定为均值 $\mu=1/2$，则得到的是参数为 $1/2$ 的普通复合 Poisson，其方差为 $s^2\mu=1$，比正确值 $5/4$ 小 $1/4$；差额 $m^2\operatorname{Var}(\Lambda)=1/4$ 正是被忽略的强度波动带来的风险。这在保险精算（索赔频数随环境波动）与量化交易（成交强度随市场状态波动）中都是低估风险的典型来源，也是混合分布比单一分布具有更厚尾部的原因之一。

注记。本例的第三步在 $\xi_i$ 不必非负时依然成立，只需把单调收敛定理换成控制收敛定理：若 $\mathbb E\lvert\xi_1\rvert<\infty$、$\mathbb E[\xi_1^2]$ 存在且 $\mathbb E[N^2]<\infty$，则 $\lvert S\rvert\le\sum_{i\le N}\lvert\xi_i\rvert$ 与 $\mathbb E\bigl[(\sum_{i\le N}\lvert\xi_i\rvert)^2\bigr]<\infty$（可由本例的计算对 $\lvert\xi_i\rvert$ 重复一次得到）保证了逐项交换的合法性。这类可积性检验在严格写作中不可省略，但在应用计算中通常由模型假设（非负冲击、有限二阶矩）自动满足。

## 13.4 条件方差与全方差公式

条件期望回答的是「在信息 $\mathcal G$ 下 $X$ 的最佳点估计是什么」，而条件方差回答的是「在这一信息水平下，围绕该最佳估计还剩多少不确定性」。二者共同构成风险度量的分解基础：总不确定性可以拆成信息内部无法消除的部分与信息之间差异带来的部分。

**定义 13.8（条件方差）**

设 $X$ 满足 $\mathbb E[X^2]<\infty$，$\mathcal G\subseteq\mathcal F$ 为子 $\sigma$-代数。$X$ 关于 $\mathcal G$ 的**条件方差**定义为

$$
\operatorname{Var}(X\mid\mathcal G)=\mathbb E\bigl[X^2\mid\mathcal G\bigr]-\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2.
\tag{13.10}
$$

条件方差是 $\mathcal G$-可测的非负随机变量，而不是一个数。

式（13.10）中的被减项与减项都是 $\mathcal G$-可测的，因此差仍 $\mathcal G$-可测。非负性并不来自定义式本身的代数形式，而来自条件 Jensen 不等式：取 $\varphi(u)=u^2$（凸函数），由定理 13.6 的条件 Jensen 性质得

$$
\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2=\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)\le \mathbb E\bigl[\varphi(X)\mid\mathcal G\bigr]=\mathbb E\bigl[X^2\mid\mathcal G\bigr],
$$

故 $\operatorname{Var}(X\mid\mathcal G)\ge 0$ 几乎必然。这一点必须明确交代：若不加论证地照搬初等方差的非负性，就会漏掉「条件方差是随机变量而非数值」这一本质区别。

与初等方差完全平行地，式（13.10）可改写为

$$
\operatorname{Var}(X\mid\mathcal G)=\mathbb E\Bigl[\bigl(X-\mathbb E[X\mid\mathcal G]\bigr)^2\ \Big|\ \mathcal G\Bigr],
\tag{13.11}
$$

展开右端并利用提取已知量性质（$\mathbb E[X\mid\mathcal G]$ 是 $\mathcal G$-可测的，可从条件期望中提出）即得。式（13.11）说明条件方差就是「在信息 $\mathcal G$ 下度量的均方误差」。

**定理 13.9（全方差公式，又称方差分解公式或 Eve 法则）**

设 $\mathbb E[X^2]<\infty$，$\mathcal G\subseteq\mathcal F$ 为子 $\sigma$-代数。则

$$
\operatorname{Var}(X)=\mathbb E\bigl[\operatorname{Var}(X\mid\mathcal G)\bigr]+\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G]\bigr).
\tag{13.12}
$$

**证明**

由条件方差的定义式（13.10）取期望，并用塔性质（定理 13.6）把内层条件期望化为无条件期望：

$$
\mathbb E\bigl[\operatorname{Var}(X\mid\mathcal G)\bigr]=\mathbb E\bigl[\mathbb E[X^2\mid\mathcal G]\bigr]-\mathbb E\Bigl[\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2\Bigr]=\mathbb E[X^2]-\mathbb E\Bigl[\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2\Bigr].
$$

记 $Z=\mathbb E[X\mid\mathcal G]$。再次由塔性质，$\mathbb E[Z]=\mathbb E\bigl[\mathbb E[X\mid\mathcal G]\bigr]=\mathbb E[X]$，因此

$$
\operatorname{Var}(Z)=\mathbb E[Z^2]-(\mathbb E Z)^2=\mathbb E\Bigl[\bigl(\mathbb E[X\mid\mathcal G]\bigr)^2\Bigr]-(\mathbb E X)^2.
$$

两式相加，中间的 $\mathbb E\bigl[(\mathbb E[X\mid\mathcal G])^2\bigr]$ 恰好抵消：

$$
\mathbb E\bigl[\operatorname{Var}(X\mid\mathcal G)\bigr]+\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G]\bigr)=\mathbb E[X^2]-(\mathbb E X)^2=\operatorname{Var}(X).
$$

□

式（13.12）的两项有清晰的解释。第一项 $\mathbb E[\operatorname{Var}(X\mid\mathcal G)]$ 是**组内方差**的平均，代表即使完全掌握 $\mathcal G$ 中的信息也无法消除的固有随机性；第二项 $\operatorname{Var}(\mathbb E[X\mid\mathcal G])$ 是**组间方差**，代表信息 $\mathcal G$ 本身带来的差异。这一分解立即给出一条重要结论：

$$
\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G]\bigr)\le\operatorname{Var}(X),
\tag{13.13}
$$

等号成立当且仅当 $\operatorname{Var}(X\mid\mathcal G)=0$ 几乎必然，即 $X$ 本身就是 $\mathcal G$-可测的。式（13.13）的统计含义是：条件化（增加信息）不会增大条件均值本身的波动，反而通常使其变小。这正是「平滑效应」，在因子模型中表现为因子载荷的估计方差小于原始收益方差。

条件协方差的分解与全方差公式完全平行。

**命题 13.10（条件协方差分解）**

设 $\mathbb E[X^2]<\infty$、$\mathbb E[Y^2]<\infty$，$\mathcal G\subseteq\mathcal F$。定义条件协方差 $\operatorname{Cov}(X,Y\mid\mathcal G)=\mathbb E[XY\mid\mathcal G]-\mathbb E[X\mid\mathcal G]\,\mathbb E[Y\mid\mathcal G]$。则

$$
\operatorname{Cov}(X,Y)=\mathbb E\bigl[\operatorname{Cov}(X,Y\mid\mathcal G)\bigr]+\operatorname{Cov}\bigl(\mathbb E[X\mid\mathcal G],\ \mathbb E[Y\mid\mathcal G]\bigr).
\tag{13.14}
$$

**证明**

取期望并用塔性质，$\mathbb E[\operatorname{Cov}(X,Y\mid\mathcal G)]=\mathbb E[XY]-\mathbb E[Z_XZ_Y]$，其中 $Z_X=\mathbb E[X\mid\mathcal G]$、$Z_Y=\mathbb E[Y\mid\mathcal G]$。另一方面，由 $\mathbb E Z_X=\mathbb E X$ 与 $\mathbb E Z_Y=\mathbb E Y$ 得

$$
\operatorname{Cov}(Z_X,Z_Y)=\mathbb E[Z_XZ_Y]-(\mathbb E X)(\mathbb E Y).
$$

两式相加，$\mathbb E[Z_XZ_Y]$ 抵消，余下 $\mathbb E[XY]-(\mathbb E X)(\mathbb E Y)=\operatorname{Cov}(X,Y)$。

□

命题 13.10 的一个直接推论值得单独指出：若 $\operatorname{Cov}(X,Y\mid\mathcal G)=0$ 几乎必然（即在每个信息状态下二者不相关），$X$ 与 $Y$ 的无条件相关性仍然可能不为零，其全部来源是第二项——条件均值之间的相关。这解释了一个在实证研究中反复出现的陷阱：分组内看不到相关，合并后却出现相关（Simpson 悖论的协方差版本）。

**例 13.4**

设 $X_1,X_2,\dots$ 独立同分布，$\mathbb E X_1=\mu$、$\operatorname{Var}(X_1)=\sigma^2<\infty$；$N$ 为取正整数值的随机变量，$\mathbb E N<\infty$、$\operatorname{Var}(N)<\infty$。定义随机和 $S=\sum_{i=1}^{N}X_i$。求 $\mathbb E S$ 与 $\operatorname{Var}(S)$。

**解**

**第一步：情形一，$N$ 与序列 $\{X_i\}$ 独立。**

令 $\mathcal G=\sigma(N)$。条件于 $N=n$ 时，$S=\sum_{i=1}^{n}X_i$ 是 $n$ 个独立同分布变量之和，故

$$
\mathbb E[S\mid N=n]=n\mu,\qquad \operatorname{Var}(S\mid N=n)=n\sigma^2.
$$

写成随机变量形式即 $\mathbb E[S\mid\mathcal G]=N\mu$、$\operatorname{Var}(S\mid\mathcal G)=N\sigma^2$。这里必须强调：由于 $N$ 与 $\{X_i\}$ 独立，条件于 $N$ 不改变 $X_i$ 的分布，上述两式才成立；若 $N$ 依赖于 $X_i$，则 $\operatorname{Var}(S\mid N=n)$ 一般不等于 $n\sigma^2$。

由全期望公式（定理 11.16）：

$$
\mathbb E S=\mathbb E\bigl[\mathbb E[S\mid\mathcal G]\bigr]=\mathbb E[N\mu]=\mu\,\mathbb E N.
\tag{13.15}
$$

这就是 **Wald 等式**。由全方差公式（定理 13.9）：

$$
\operatorname{Var}(S)=\mathbb E\bigl[N\sigma^2\bigr]+\operatorname{Var}(N\mu)=\sigma^2\,\mathbb E N+\mu^2\operatorname{Var}(N).
\tag{13.16}
$$

式（13.16）的两项含义分明：第一项来自每笔金额 $X_i$ 自身的波动，第二项来自笔数 $N$ 的波动，并按均值 $\mu$ 的平方放大。当 $\mu=0$ 时第二项消失，$\operatorname{Var}(S)=\sigma^2\mathbb E N$ 只与期望笔数有关；当 $\sigma^2=0$（金额确定）时第一项消失，$\operatorname{Var}(S)=\mu^2\operatorname{Var}(N)$。

**第二步：具体数值。** 设 $N\sim\operatorname{Poisson}(\lambda)$，$X_i\sim\operatorname{Exp}(\beta)$（密度 $\beta e^{-\beta x}$，$x>0$），二者独立。则 $\mu=1/\beta$、$\sigma^2=1/\beta^2$、$\mathbb E N=\operatorname{Var}(N)=\lambda$，代入式（13.15）与式（13.16）：

$$
\mathbb E S=\frac{\lambda}{\beta},\qquad \operatorname{Var}(S)=\frac{\lambda}{\beta^2}+\frac{\lambda}{\beta^2}=\frac{2\lambda}{\beta^2}.
$$

此处 $\mu^2\operatorname{Var}(N)=\lambda/\beta^2$ 与 $\sigma^2\mathbb E N=\lambda/\beta^2$ 恰好相等，故方差是「金额确定、只有笔数随机」情形的两倍。事实上 $S$ 服从复合 Poisson 分布，其方差总是 $\lambda\,\mathbb E[X_1^2]=\lambda(\sigma^2+\mu^2)$，与式（13.16）一致——这一交叉验证说明两种途径（全方差公式与复合 Poisson 的矩公式）给出同一结果。

**第三步：情形二，$N$ 是 $\{X_i\}$ 的停时。**

若 $N$ 依赖于序列（例如 $N=\min\{n:X_n>c\}$），则第一步中的条件方差公式失效，但结论式（13.15）与式（13.16）在适当可积性条件下仍然成立，其依据是 Wald 的两个等式。令 $M_n=\sum_{i=1}^{n}(X_i-\mu)$，则 $\{M_n\}$ 是关于自然滤波的鞅（由 $\mathbb E[X_i-\mu]=0$ 与独立性）。当 $\mathbb E N<\infty$ 且 $X_i$ 独立同分布可积时，由可选停时定理（第25章）得 $\mathbb E M_N=0$，即 $\mathbb E[S_N]=\mu\,\mathbb E N$，恢复了式（13.15）。进一步，Wald 第二等式给出

$$
\mathbb E\bigl[(S_N-\mu N)^2\bigr]=\sigma^2\,\mathbb E N.
$$

将其代入 $\operatorname{Var}(S_N)=\mathbb E[(S_N-\mu\,\mathbb E N)^2]$ 的展开式：

$$
\operatorname{Var}(S_N)=\mathbb E\bigl[(S_N-\mu N)^2\bigr]+2\mu\,\mathbb E\bigl[(S_N-\mu N)(N-\mathbb E N)\bigr]+\mu^2\operatorname{Var}(N).
$$

中间的交叉项为零：$S_n-\mu n$ 是鞅而 $N$ 是其停时，在 $\mathbb E N<\infty$ 与二阶可积条件下，$\{(S_{N\wedge n}-\mu(N\wedge n))\}$ 一致可积，取极限得 $\mathbb E[(S_N-\mu N)(N-\mathbb E N)]=0$。于是仍有

$$
\operatorname{Var}(S_N)=\sigma^2\,\mathbb E N+\mu^2\operatorname{Var}(N).
$$

**这一结论的形式与独立情形相同，但成立的理由完全不同**：独立情形靠条件方差公式，停时情形靠鞅的可选停时定理。忽略这一区别是随机和计算中最常见的错误来源——直接对依赖情形套用 $\operatorname{Var}(S\mid N=n)=n\sigma^2$ 会得到错误答案。

## 13.5 最优预测与 L² 正交投影

本节给出条件期望最重要的解释：它是均方误差意义下的最优预测。这一结论把第5章的线性代数（正交投影）、第13章前半部分的测度论（条件期望的定义）与量化研究中的预测问题统一到同一个框架中。

**定理 13.11（条件期望是最优 $L^2$ 预测）**

设 $\mathbb E[X^2]<\infty$，$\mathcal G\subseteq\mathcal F$ 为子 $\sigma$-代数。在所有满足 $\mathbb E[g^2]<\infty$ 的 $\mathcal G$-可测随机变量 $g$ 中，

$$
\mathbb E\Bigl[\bigl(X-\mathbb E[X\mid\mathcal G]\bigr)^2\Bigr]\le\mathbb E\bigl[(X-g)^2\bigr],
\tag{13.17}
$$

且等号成立当且仅当 $g=\mathbb E[X\mid\mathcal G]$ 几乎必然。

**证明**

记 $Z=\mathbb E[X\mid\mathcal G]$。对任意 $\mathcal G$-可测且平方可积的 $g$，加零减零：

$$
X-g=(X-Z)+(Z-g).
$$

展开平方并取期望：

$$
\mathbb E[(X-g)^2]=\mathbb E[(X-Z)^2]+2\,\mathbb E\bigl[(X-Z)(Z-g)\bigr]+\mathbb E[(Z-g)^2].
$$

关键是证明交叉项为零。由于 $Z-g$ 是 $\mathcal G$-可测的（两个 $\mathcal G$-可测变量之差），由提取已知量性质（定理 13.6）：

$$
\mathbb E\bigl[(X-Z)(Z-g)\bigr]=\mathbb E\Bigl[\mathbb E\bigl[(X-Z)(Z-g)\mid\mathcal G\bigr]\Bigr]=\mathbb E\Bigl[(Z-g)\,\mathbb E[X-Z\mid\mathcal G]\Bigr].
$$

再由塔性质，$\mathbb E[X-Z\mid\mathcal G]=\mathbb E[X\mid\mathcal G]-\mathbb E[Z\mid\mathcal G]=Z-Z=0$（$Z$ 已 $\mathcal G$-可测，故 $\mathbb E[Z\mid\mathcal G]=Z$）。因此交叉项为零，余下

$$
\mathbb E[(X-g)^2]=\mathbb E[(X-Z)^2]+\mathbb E[(Z-g)^2]\ge\mathbb E[(X-Z)^2].
$$

等号成立当且仅当 $\mathbb E[(Z-g)^2]=0$，即 $Z=g$ 几乎必然。

□

定理 13.11 的证明结构与第5章最小二乘的正交分解一模一样：把误差拆成「垂直于子空间的部分」与「子空间内的偏差」，交叉项因正交性消失，于是偏差只会增大误差。交叉项为零这一事实即 $\mathbb E[(X-Z)h]=0$ 对一切 $\mathcal G$-可测平方可积 $h$ 成立，称为**正交性条件**，它是刻画质心投影的充要特征。

**命题 13.12（投影解释与最小均方误差）**

记 $L^2(\Omega,\mathcal G,\mathbb P)=\{g:\ g\ \text{是}\ \mathcal G\text{-可测且}\ \mathbb E[g^2]<\infty\}$（按几乎必然相等视为同一元素），它是 Hilbert 空间 $L^2(\Omega,\mathcal F,\mathbb P)$ 的闭子空间，内积为 $\langle U,V\rangle=\mathbb E[UV]$。则：

（i）$\mathbb E[X\mid\mathcal G]$ 是 $X$ 在 $L^2(\Omega,\mathcal G,\mathbb P)$ 上的正交投影；

（ii）最小均方误差为

$$
\inf_{g\in L^2(\Omega,\mathcal G,\mathbb P)}\mathbb E\bigl[(X-g)^2\bigr]=\mathbb E\bigl[\operatorname{Var}(X\mid\mathcal G)\bigr]=\operatorname{Var}(X)-\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G]\bigr);
\tag{13.18}
$$

（iii）若 $\mathcal G=\sigma(Y)$，则最优预测可写成 $g^*(Y)$ 的形式，其中 $g^*(y)=\mathbb E[X\mid Y=y]$。

**证明**

（i）正交投影的刻画是：$Z\in L^2(\Omega,\mathcal G,\mathbb P)$ 且 $X-Z$ 与该子空间中每个元素正交。$Z=\mathbb E[X\mid\mathcal G]$ 显然属于该子空间（$\mathcal G$-可测；由条件 Jensen，$Z^2\le\mathbb E[X^2\mid\mathcal G]$，取期望得 $\mathbb E Z^2\le\mathbb E X^2<\infty$）。正交性已在定理 13.11 的证明中验证。Hilbert 空间中正交投影唯一，故 $Z$ 就是投影。

（ii）在定理 13.11 中取 $g=Z$ 得最小值为 $\mathbb E[(X-Z)^2]$。由式（13.11）与塔性质，

$$
\mathbb E\bigl[(X-Z)^2\bigr]=\mathbb E\Bigl[\mathbb E\bigl[(X-Z)^2\mid\mathcal G\bigr]\Bigr]=\mathbb E\bigl[\operatorname{Var}(X\mid\mathcal G)\bigr].
$$

再代入全方差公式（13.12）即得式（13.18）的第二个等号。

（iii）当 $\mathcal G=\sigma(Y)$ 时，$\mathcal G$-可测函数恰是 $Y$ 的可测函数（Doob–Dynkin 引理），故存在可测 $g^*$ 使 $Z=g^*(Y)$；由定义 13.1，$g^*(y)=\mathbb E[X\mid Y=y]$ 在 $Y$ 的分布意义下几乎必然成立。

□

式（13.18）给出一个极其实用的判据：**最小均方误差等于条件方差的期望**。因此比较两种信息集 $\mathcal G_1\subseteq\mathcal G_2$ 的预测能力，只需比较 $\mathbb E[\operatorname{Var}(X\mid\mathcal G_1)]$ 与 $\mathbb E[\operatorname{Var}(X\mid\mathcal G_2)]$；信息越多，条件方差越小，可解释部分越大。这也正是 $R^2$ 的定义逻辑：$R^2=\operatorname{Var}(\mathbb E[X\mid\mathcal G])/\operatorname{Var}(X)$ 度量信息 $\mathcal G$ 解释掉的方差比例。

命题 13.12 与第5章最小二乘的关系需要说清。第5章中把 $X$ 投影到由若干回归元张成的**有限维线性子空间**，得到最佳线性预测；这里把 $X$ 投影到 $L^2(\Omega,\mathcal G,\mathbb P)$，这是一个**无穷维闭子空间**，包含 $\mathcal G$-可测变量的全部非线性函数。由于线性子空间是后者的子集，立即得到

$$
\inf_{g\ \text{为}\ \mathcal G\text{-可测}}\mathbb E[(X-g)^2]\ \le\ \inf_{a,\ \boldsymbol\beta}\ \mathbb E\Bigl[\bigl(X-a-\boldsymbol\beta^\top\boldsymbol Y\bigr)^2\Bigr],
$$

即**最佳一般预测不劣于最佳线性预测**。等号成立当且仅当 $\mathbb E[X\mid\mathcal G]$ 本身是 $\boldsymbol Y$ 的线性函数——二元正态正是这种情形（例 13.1）。当条件均值非线性时，线性回归会系统性地损失精度，例 13.5 给出定量刻画。这也解释了为什么线性回归在金融中如此常用却又常常不够：它是最优预测在「线性」约束下的投影，约束是否带来显著损失取决于条件均值的形状。

**例 13.5**

设 $(X,Y)$ 的联合密度为

$$
f(x,y)=\frac{1}{y^2},\qquad 0<x<y^2,\ 0<y<1,
$$

其余处为零。求最优预测函数 $g^*(Y)$、最小均方误差，并与最佳线性预测比较。

**解**

**第一步：边缘密度与条件分布。** 对 $x$ 积分：

$$
f_Y(y)=\int_0^{y^2}\frac{1}{y^2}\,\mathrm dx=1,\qquad 0<y<1,
$$

故 $Y\sim U(0,1)$。条件密度为 $f_{X\mid Y}(x\mid y)=f(x,y)/f_Y(y)=1/y^2$，$0<x<y^2$，即在给定 $Y=y$ 时 $X\sim U(0,y^2)$。注意此处的支撑集 $\{0<x<y^2\}$ 不是矩形，$X$ 与 $Y$ 显然不独立。

**第二步：条件均值与条件方差。** 由均匀分布的矩：

$$
\mathbb E[X\mid Y=y]=\frac{y^2}{2},\qquad \operatorname{Var}(X\mid Y=y)=\frac{y^4}{12}.
$$

于是最优预测函数为

$$
g^*(y)=\frac{y^2}{2},\qquad\text{即}\qquad \mathbb E[X\mid Y]=\frac{Y^2}{2}.
\tag{13.19}
$$

这是 $Y$ 的**非线性**函数，因此最佳线性预测不可能与之重合。

**第三步：最小均方误差。** 由式（13.18）：

$$
\mathbb E\bigl[\operatorname{Var}(X\mid Y)\bigr]=\int_0^1\frac{y^4}{12}\,\mathrm dy=\frac{1}{60}.
$$

为验证，用全方差公式核对。$\mathbb E X=\mathbb E[Y^2/2]=\frac12\int_0^1y^2\,\mathrm dy=\frac16$。$\mathbb E[X^2]=\mathbb E\bigl[\mathbb E[X^2\mid Y]\bigr]=\mathbb E\bigl[\operatorname{Var}(X\mid Y)+(\mathbb E[X\mid Y])^2\bigr]=\mathbb E\bigl[\frac{Y^4}{12}+\frac{Y^4}{4}\bigr]=\mathbb E\bigl[\frac{Y^4}{3}\bigr]=\frac{1}{3}\cdot\frac15=\frac{1}{15}$。故

$$
\operatorname{Var}(X)=\frac{1}{15}-\frac{1}{36}=\frac{12-5}{180}=\frac{7}{180}.
$$

另一方面 $\operatorname{Var}(\mathbb E[X\mid Y])=\operatorname{Var}(Y^2/2)=\frac14\operatorname{Var}(Y^2)$，而 $\mathbb E[Y^2]=\frac13$、$\mathbb E[Y^4]=\frac15$，故 $\operatorname{Var}(Y^2)=\frac15-\frac19=\frac{4}{45}$，得 $\operatorname{Var}(\mathbb E[X\mid Y])=\frac{1}{45}$。检验：

$$
\frac{1}{60}+\frac{1}{45}=\frac{3+4}{180}=\frac{7}{180}=\operatorname{Var}(X),
$$

与全方差公式一致。

**第四步：最佳线性预测。** 需要 $\operatorname{Cov}(X,Y)$。先求 $\mathbb E[XY]=\mathbb E\bigl[Y\,\mathbb E[X\mid Y]\bigr]=\mathbb E\bigl[\frac{Y^3}{2}\bigr]=\frac12\cdot\frac14=\frac18$。又 $\mathbb E Y=\frac12$，故

$$
\operatorname{Cov}(X,Y)=\frac18-\frac16\cdot\frac12=\frac18-\frac{1}{12}=\frac{1}{24}.
$$

$\operatorname{Var}(Y)=\frac{1}{12}$，于是斜率与截距为

$$
b=\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)}=\frac{1/24}{1/12}=\frac12,\qquad a=\mathbb E X-b\,\mathbb E Y=\frac16-\frac12\cdot\frac12=\frac16-\frac14=-\frac{1}{12}.
$$

最佳线性预测为 $\hat X_{\text{lin}}=-\frac{1}{12}+\frac12Y$，其均方误差为

$$
\mathbb E\bigl[(X-\hat X_{\text{lin}})^2\bigr]=\operatorname{Var}(X)-2b\operatorname{Cov}(X,Y)+b^2\operatorname{Var}(Y)=\frac{7}{180}-2\cdot\frac12\cdot\frac{1}{24}+\frac14\cdot\frac{1}{12}=\frac{7}{180}-\frac{1}{48}=\frac{13}{720}.
$$

**第五步：定量比较。** 二者之比为

$$
\frac{13/720}{1/60}=\frac{13}{720}\cdot 60=\frac{13}{12}\approx1.0833.
$$

即**最佳线性预测的均方误差比最优预测高约 $8.3\%$**（精确比值为 $13:12$）。这 $8.3\%$ 就是「坚持线性形式」所付出的代价，其来源是条件均值 $Y^2/2$ 的凸性：线性预测在 $Y$ 很小和很大时低估，在中间区间高估。若把条件均值换成线性函数（如二元正态情形），这一代价恰为零。

本例也说明一个常被忽略的技术要点：$X$ 与 $Y$ 的边缘分布都不是正态（$Y$ 均匀、$X$ 的密度为 $\int_{\sqrt x}^{1}y^{-2}\mathrm dy=1/\sqrt x-1$，$0<x<1$），但相关系数与线性预测仍然良定义——线性投影只要求二阶矩存在，不要求正态性。反过来，**即使两个边缘分布都正态，联合分布也未必是二元正态**，此时条件均值可以非线性，线性回归仍会有损（详见第12章）。

## 13.6 正则条件分布与量化应用

到目前为止，条件期望 $\mathbb E[X\mid Y=y]$ 只在「$y$ 使 $\mathbb P(Y=y)>0$」或「联合密度存在」时由初等公式定义。要在一般情形下把「先固定 $y$、再对 $x$ 积分」这一操作严格化，需要正则条件分布。

**定义 13.13（正则条件分布）**

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间，$Y:\Omega\to E$ 为取值于可测空间 $(E,\mathcal E)$ 的随机变量，$X$ 为随机变量。$X$ 关于 $Y$ 的**正则条件分布**是一个映射

$$
(y,\omega)\longmapsto \mu_{X\mid Y=y}(\cdot),
$$

满足：（i）对每个固定的 $y\in E$，$\mu_{X\mid Y=y}$ 是 $(X\ \text{的取值空间},\ \text{其 Borel }\sigma\text{-代数})$ 上的概率测度；（ii）对每个固定的 Borel 集 $B$，映射 $y\mapsto\mu_{X\mid Y=y}(B)$ 是 $\mathcal E$-可测的；（iii）对每个有界可测函数 $g$，

$$
\mathbb E\bigl[g(X)\mid Y\bigr]=\int g(x)\,\mu_{X\mid Y=y}(dx)\ \Big|_{y=Y}\quad\text{几乎必然}.
\tag{13.20}
$$

当 $X$ 的取值空间是 Polish 空间（可度量化且存在可数稠密子集的完备空间，例如 $\mathbb R^n$ 与 $\mathbb R^{\mathbb N}$）时，正则条件分布总存在，且在 $\mathbb P_Y$-几乎必然意义下唯一。这是测度论中的一条标准存在性定理，其证明依赖 Polish 空间上概率测度空间的紧性与可分性，本书不展开。

有了正则条件分布，式（13.20）使「先条件后积分」成为合法运算，从而可以谈论条件分布的分位数、条件矩、条件独立性等概念而无须假设密度存在。例如条件 VaR 可以定义为 $\mu_{X\mid Y=y}$ 的下分位数，这在密度不存在（如离散或混合分布）时依然有意义。

必须警惕的是**条件版本依赖**问题。条件期望 $\mathbb E[X\mid Y=y]$ 作为 $y$ 的函数只在 $\mathbb P_Y$-几乎必然唯一，不同的正则版本可能在零测集上取值不同。若对不同随机变量分别选取版本再组合，可能得到自相矛盾的结果。经典例子是 Borel 悖论：同一个条件概率，沿不同坐标方向条件化会得到不同答案。规避办法是始终通过一个统一的正则条件分布来定义所有相关的条件量，而不是逐个变量随意选版本。这一纪律在构造条件风险度量与滤波算法时尤为重要。

条件期望在量化研究中的核心应用是**在信息约束下最小化风险**。下面把这一思想落到对冲问题上。

**命题 13.14（最小方差对冲比）**

设 $S$ 为待对冲头寸的收益，$H$ 为对冲工具的收益，$\mathbb E[S^2]<\infty$、$\mathbb E[H^2]<\infty$，$\operatorname{Var}(H)>0$。

（i）在实数 $h$ 中最小化对冲误差的二阶矩 $\mathbb E[(S-hH)^2]$，唯一最小点为

$$
h^*=\frac{\operatorname{Cov}(S,H)}{\operatorname{Var}(H)}.
\tag{13.21}
$$

（ii）设 $\mathcal G\subseteq\mathcal F$ 为对冲决策时可获得的信息。在所有 $\mathcal G$-可测且平方可积的 $h$ 中最小化 $\mathbb E[(S-hH)^2]$，最优解为

$$
h^*(\mathcal G)=\frac{\operatorname{Cov}(S,H\mid\mathcal G)}{\operatorname{Var}(H\mid\mathcal G)},
\tag{13.22}
$$

在 $\operatorname{Var}(H\mid\mathcal G)>0$ 的集合上成立；相应最小误差为 $\mathbb E\bigl[\operatorname{Var}(S\mid\mathcal G)-\operatorname{Cov}(S,H\mid\mathcal G)^2/\operatorname{Var}(H\mid\mathcal G)\bigr]$。

**证明**

（i）把目标函数看作 $h$ 的二次函数：

$$
\mathbb E[(S-hH)^2]=\mathbb E[S^2]-2h\,\mathbb E[SH]+h^2\mathbb E[H^2].
$$

由 $\mathbb E[H^2]>0$（因 $\operatorname{Var}(H)>0$），这是开口向上的抛物线，导数为零处取唯一最小值：$-2\mathbb E[SH]+2h\mathbb E[H^2]=0$，解得 $h=\mathbb E[SH]/\mathbb E[H^2]$。若 $S$、$H$ 均已中心化（$\mathbb E S=\mathbb E H=0$），则 $\mathbb E[SH]=\operatorname{Cov}(S,H)$、$\mathbb E[H^2]=\operatorname{Var}(H)$，即得式（13.21）。未中心化时，允许对冲头寸带常数项 $a+hH$，则先由 $\partial/\partial a=0$ 得 $a=\mathbb E S-h\,\mathbb E H$，代回后同样化为式（13.21）。

（ii）对任意 $\mathcal G$-可测的 $h$，用全期望公式把目标写成条件形式：

$$
\mathbb E[(S-hH)^2]=\mathbb E\Bigl[\mathbb E\bigl[(S-hH)^2\mid\mathcal G\bigr]\Bigr].
$$

在内层条件期望中，$h$ 是 $\mathcal G$-可测的，可由提取已知量性质提出：

$$
\mathbb E\bigl[(S-hH)^2\mid\mathcal G\bigr]=\mathbb E[S^2\mid\mathcal G]-2h\,\mathbb E[SH\mid\mathcal G]+h^2\mathbb E[H^2\mid\mathcal G].
$$

对每个 $\omega$，这是 $h(\omega)$ 的二次函数，逐点最小化即得

$$
h(\omega)=\frac{\mathbb E[SH\mid\mathcal G](\omega)}{\mathbb E[H^2\mid\mathcal G](\omega)},
$$

在中心化情形即式（13.22）。由于外层期望是非负权重的积分，逐点最小化同时给出整体最小化。最小值代入即得所给表达式，其中用到 $\mathbb E[S^2\mid\mathcal G]=\operatorname{Var}(S\mid\mathcal G)+(\mathbb E[S\mid\mathcal G])^2$ 与相应的协方差展开。

□

式（13.21）与式（13.22）的差别正是命题 13.12 的差别在对冲问题上的体现：$h^*$ 是**静态**对冲比，$h^*(\mathcal G)$ 是随信息变化的**动态**对冲比。若 $(S,H)$ 的联合分布随状态而变，动态对冲严格优于静态对冲，误差降低的幅度由命题 13.10 的组间项度量。式（13.21）同时说明：最小方差对冲比就是用 $H$ 回归 $S$ 的斜率，即对冲本质上是回归问题。

条件方差还有另一类根本性应用：**波动率预测**。金融收益率的无条件方差近似恒定，但条件方差随时间剧烈变化（波动率聚集）。第29章的 GARCH 族正是把 $\operatorname{Var}(r_{t+1}\mid\mathcal F_t)$ 参数化为过去信息的函数，其理论基础就是本章的条件方差概念；式（13.12）则解释了为何条件方差模型能在不改变无条件方差的前提下刻画时变风险。同样，鞅的定义 $\mathbb E[M_{n+1}\mid\mathcal F_n]=M_n$ 直接建立在条件期望之上（第25章），而风险中性定价的核心公式 $V_t=\mathbb E^{\mathbb Q}[e^{-r(T-t)}V_T\mid\mathcal F_t]$ 就是一个条件期望（第33章）。信用风险中的违约强度模型亦以条件于历史信息的违约概率为基础。可以说，条件期望是连接测度论概率与全部量化金融动态模型的枢纽。

**例 13.6**

某头寸收益 $S$ 与期货收益 $H$ 的联合分布依赖一个可观测的市场状态 $\Theta\in\{1,2\}$，$\mathbb P(\Theta=1)=\mathbb P(\Theta=2)=\tfrac12$。已知（两种状态下均值均为零）：

$$
\begin{array}{c|ccc}
 & \operatorname{Var}(S\mid\Theta) & \operatorname{Var}(H\mid\Theta) & \operatorname{Cov}(S,H\mid\Theta)\\
\hline
\Theta=1 & 1 & 1 & 0.8\\
\Theta=2 & 1 & 4 & 1.6
\end{array}
$$

求静态最优对冲比、状态相关的最优对冲比，并比较二者的对冲误差。

**解**

**第一步：条件对冲比。** 由式（13.22），取 $\mathcal G=\sigma(\Theta)$：

$$
h^*(\Theta=1)=\frac{0.8}{1}=0.8,\qquad h^*(\Theta=2)=\frac{1.6}{4}=0.4.
$$

两种状态的对冲比相差一倍，说明静态对冲必然在至少一种状态下明显失配。

**第二步：无条件矩。** 由命题 13.10 与全方差公式（注意 $\mathbb E[S\mid\Theta]=\mathbb E[H\mid\Theta]=0$，故组间项为零）：

$$
\operatorname{Var}(H)=\mathbb E[\operatorname{Var}(H\mid\Theta)]=\tfrac12(1)+\tfrac12(4)=2.5,\qquad \operatorname{Cov}(S,H)=\mathbb E[\operatorname{Cov}(S,H\mid\Theta)]=\tfrac12(0.8)+\tfrac12(1.6)=1.2.
$$

由式（13.21），静态对冲比为

$$
h^*=\frac{1.2}{2.5}=0.48.
$$

**第三步：对冲误差比较。** 状态相关对冲的残差方差在两种状态下分别为

$$
\operatorname{Var}(S\mid\Theta=i)-\frac{\operatorname{Cov}(S,H\mid\Theta=i)^2}{\operatorname{Var}(H\mid\Theta=i)}=1-\frac{0.64}{1}=0.36\quad(i=1),\qquad 1-\frac{2.56}{4}=0.36\quad(i=2),
$$

故其期望为 $0.36$。静态对冲的误差为

$$
\operatorname{Var}(S)-\frac{\operatorname{Cov}(S,H)^2}{\operatorname{Var}(H)}=1-\frac{1.44}{2.5}=1-0.576=0.424.
$$

**第四步：结论。** 利用状态信息把对冲误差从 $0.424$ 降到 $0.36$，相对降幅为

$$
\frac{0.424-0.36}{0.424}=\frac{0.064}{0.424}\approx15.1\%.
$$

值得注意的是：尽管 $\operatorname{Var}(H\mid\Theta)$ 在两状态下相差四倍，条件残差方差却相同（均为 $0.36$），因为相关系数在两种状态下都是 $0.8$（$\Theta=1$ 时 $0.8/\sqrt{1\cdot1}=0.8$，$\Theta=2$ 时 $1.6/\sqrt{1\cdot4}=0.8$）。这说明**对冲效果的提升来自对冲比的自适应，而非相关结构的变化**；若相关系数在两状态下相同且对冲比也相同，则条件化不会带来任何收益。这一观察提示实务中应先检验条件相关是否真的随状态变化，再决定是否采用动态对冲。

**例 13.7**

设市场处于两种隐状态之一：$\Theta\in\{A,B\}$，$\mathbb P(\Theta=A)=0.3$、$\mathbb P(\Theta=B)=0.7$。下一期收益 $X$ 在给定状态下是确定的：$X=0$（状态 $A$）、$X=2$（状态 $B$）。当期可观测到一个信号 $S$，满足 $S\mid\Theta=A\sim N(0,1)$、$S\mid\Theta=B\sim N(2,1)$。求给定信号 $s$ 时的最优预测 $\mathbb E[X\mid S=s]$，并计算其最小均方误差。

**解**

**第一步：后验概率。** 记 $\phi$ 为标准正态密度。由 Bayes 公式（此处即定义 13.13 在离散隐状态下的具体形式）：

$$
\mathbb P(\Theta=A\mid S=s)=\frac{0.3\,\phi(s)}{0.3\,\phi(s)+0.7\,\phi(s-2)}.
$$

计算密度比：

$$
\frac{\phi(s)}{\phi(s-2)}=\exp\!\left(-\frac{s^2-(s-2)^2}{2}\right)=\exp\!\left(-\frac{4s-4}{2}\right)=e^{\,2-2s}.
$$

代入得

$$
p(s):=\mathbb P(\Theta=A\mid S=s)=\frac{1}{1+\frac{7}{3}e^{\,2(s-1)}}.
\tag{13.23}
$$

这是 $s$ 的 logistic 型函数，随 $s$ 增大而单调递减——信号越大，越倾向状态 $B$。

**第二步：最优预测。** 由 $X=2\cdot\mathbf 1_{\{\Theta=B\}}$：

$$
\mathbb E[X\mid S=s]=2\,\mathbb P(\Theta=B\mid S=s)=2\bigl(1-p(s)\bigr).
\tag{13.24}
$$

若干具体数值：$p(0)=\bigl(1+\tfrac73e^{-2}\bigr)^{-1}\approx0.760$，故预测为 $2(1-0.760)\approx0.481$；$p(1)=\bigl(1+\tfrac73\bigr)^{-1}=0.3$（恰等于先验，因为 $s=1$ 是两个状态均值的正中点，信号不含判别信息），预测为 $2(0.7)=1.4$；$p(2)=\bigl(1+\tfrac73e^{2}\bigr)^{-1}\approx0.055$，预测为 $2(0.945)\approx1.890$。三个数值表明滤波把先验 $1.4$ 分别向下修正到 $0.481$、保持不变、向上修正到 $1.890$。

**第三步：最小均方误差。** 给定 $S=s$ 时 $X$ 只取 $0$ 与 $2$ 两个值，故

$$
\operatorname{Var}(X\mid S=s)=4\,p(s)\bigl(1-p(s)\bigr).
$$

由式（13.18），最小均方误差为

$$
\mathbb E\bigl[\operatorname{Var}(X\mid S)\bigr]=4\,\mathbb E\bigl[p(S)(1-p(S))\bigr].
$$

作为对照，不使用信号时的误差为 $\operatorname{Var}(X)=4(0.3)(0.7)=0.84$。函数 $q(s)=p(s)(1-p(s))$ 关于 $s=1$ 对称（令 $k=\tfrac73e^{2(s-1)}$，则 $q=k/(1+k)^2$，而 $s=1\pm u$ 对应 $k$ 与 $1/k$ 互换，$q$ 不变），但 $S$ 的混合密度不对称，故需数值积分。以 $S$ 的密度 $0.3\phi(s)+0.7\phi(s-2)$ 加权积分得 $\mathbb E[q(S)]\approx0.070$，因此

$$
\mathbb E\bigl[\operatorname{Var}(X\mid S)\bigr]\approx4(0.070)=0.28,
$$

相对先验误差 $0.84$ 降低约 $67\%$。这一降幅定量说明了信号的价值：滤波（用观测推断隐状态）正是通过缩小条件方差来降低预测误差的，与式（13.13）的「平滑效应」一致。

**第四步：与线性滤波的比较。** 由命题 13.14 的讨论，最优预测（13.24）是 $s$ 的非线性（logistic）函数；若强行使用线性预测 $a+bs$，则由命题 13.12 知其误差不小于 $0.28$。此处 $X$ 与 $S$ 的联合分布非正态（$X$ 只取两值），条件均值必然非线性，线性滤波会有额外损失。Kalman 滤波（第30章）之所以在工程中被广泛使用，正是因为它假设线性高斯结构，使最优滤波恰为线性；一旦状态离散（如本例的 regime switching），就必须改用非线性滤波或粒子滤波。

## 本章小结

本章的主线可以概括为一句话：**条件期望是在给定信息约束下对随机变量的最优逼近**，而条件方差度量这一逼近的剩余不确定性。

出发点有二。其一是初等层面：由条件密度或条件概率质量函数定义 $\mathbb E[X\mid Y=y]$，它在离散与连续情形下都能直接计算，且二元正态的条件分布仍为正态，条件均值是 $y$ 的线性函数（例 13.1）。其二是测度论层面：定义 13.4 用「$\mathcal G$-可测」与「在 $\mathcal G$ 的每个集合上积分相等」两条性质刻画 $\mathbb E[X\mid\mathcal G]$，其存在唯一性由 Radon–Nikodym 定理保证。这一重构带来三重收益：不必假设密度存在、把条件期望纳入 $L^2$ 投影的框架、并使鞅与滤波得以严格定义。命题 13.5 验证了初等定义确是测度论定义的特例，从而两套语言可以无缝互换。

定理 13.6 汇总的六条性质构成了全部计算的工具箱，其中塔性质与提取已知量使用最频繁；条件 Jensen 不等式则保证凸变换与条件期望的次序不可随意交换。命题 13.7 给出独立性的判据：$X$ 与 $\mathcal G$ 独立等价于 $\mathbb E[X\mid\mathcal G]=\mathbb E X$，即信息不提供任何增量。

定义 13.8 的条件方差与定理 13.9 的全方差公式把总不确定性拆成组内与组间两部分。式（13.13）表明条件化不会增大条件均值的波动；命题 13.10 把同一分解推广到协方差，并揭示了 Simpson 悖论的协方差机制。例 13.4 的随机和计算展示了这一分解的威力，同时警示：Wald 等式的形式在独立情形与停时情形相同，但成立理由截然不同。

定理 13.11 与命题 13.12 是全章的理论高点：$\mathbb E[X\mid\mathcal G]$ 是 $X$ 在 $L^2(\Omega,\mathcal G,\mathbb P)$ 上的正交投影，最小均方误差恰为 $\mathbb E[\operatorname{Var}(X\mid\mathcal G)]$。这与第5章的有限维最小二乘是同一几何事实的两个尺度，并立即推出「最佳一般预测不劣于最佳线性预测」；例 13.5 用 $13:12$ 的精确比值量化了坚持线性形式所付出的代价。

定义 13.13 的正则条件分布把「先固定再积分」严格化，使条件分位数、条件 VaR 等概念在密度不存在时依然有意义；条件版本依赖的悖论则提醒我们必须通过统一的正则版本来定义相关的条件量。命题 13.14 把投影理论落到对冲问题上：最小方差对冲比就是回归斜率，其条件版本随信息自适应，例 13.6 显示这种自适应性可带来约 $15\%$ 的误差降低；例 13.7 的隐状态滤波则显示，通过观测推断隐状态可使预测误差降低约 $67\%$，并说明离散状态下线性滤波不再最优。

由此向后延伸的路线十分清晰：把 $\mathcal G$ 换成随时间增长的滤波 $\mathcal F_n$ 并要求 $\mathbb E[M_{n+1}\mid\mathcal F_n]=M_n$，就得到鞅（第25章）；把条件方差参数化为过去信息的函数，就得到 GARCH 族（第29章）；用状态空间模型递推地计算条件期望，就得到 Kalman 滤波（第30章）；在风险中性测度下取贴现收益的条件期望，就得到衍生品定价公式（第33章）。条件期望是这些主题共同的数学基座。

## 习题

1. 设 $(X,Y)$ 的联合概率质量函数为 $\mathbb P(X=0,Y=0)=0.1$、$\mathbb P(X=0,Y=1)=0.2$、$\mathbb P(X=1,Y=0)=0.3$、$\mathbb P(X=1,Y=1)=0.4$。求 $\mathbb E[X\mid Y=0]$、$\mathbb E[X\mid Y=1]$、随机变量 $\mathbb E[X\mid Y]$ 的分布，并用全期望公式验证 $\mathbb E[\mathbb E[X\mid Y]]=\mathbb E X$。

2. 设 $(X,Y)$ 在区域 $\{0<x<1,\ 0<y<1,\ x+y>1\}$ 上均匀分布。求边缘密度 $f_Y(y)$、条件密度 $f_{X\mid Y}(x\mid y)$ 与 $\mathbb E[X\mid Y=y]$，并判断 $X$ 与 $Y$ 是否独立。

3. 设 $(X,Y)$ 服从二元正态分布，均值向量为 $(\mu_X,\mu_Y)$，方差为 $\sigma_X^2,\sigma_Y^2$，相关系数为 $\rho$。用配方法从联合密度出发推导 $\mathbb E[X\mid Y=y]$ 与 $\operatorname{Var}(X\mid Y=y)$，并说明后者为何不依赖 $y$。

4. 设 $X\sim\operatorname{Exp}(1)$，且给定 $X=x$ 时 $Y\sim\operatorname{Poisson}(x)$。求 $\mathbb E[Y]$ 与 $\operatorname{Var}(Y)$，要求使用全期望公式与全方差公式，并与直接求 $Y$ 的边缘分布（几何分布）所得结果对照验证。

5. 设 $\mathcal G=\{A,A^c,\varnothing,\Omega\}$ 为由某个满足 $0<\mathbb P(A)<1$ 的事件 $A$ 生成的 $\sigma$-代数。证明：对可积随机变量 $X$，

$$
\mathbb E[X\mid\mathcal G]=\frac{\mathbb E[X\mathbf 1_A]}{\mathbb P(A)}\mathbf 1_A+\frac{\mathbb E[X\mathbf 1_{A^c}]}{\mathbb P(A^c)}\mathbf 1_{A^c},
$$

并解释这一表达式为何说明「条件期望是在信息原子上的平均」。

6. 设 $X$ 可积，$\mathcal G\subseteq\mathcal F$。**直接用定义 13.4 的两条性质**证明：$\mathbb E[X\mid\mathcal G]=\mathbb E X$ 几乎必然的充要条件是 $\mathbb E[X\mathbf 1_A]=\mathbb E X\cdot\mathbb P(A)$ 对一切 $A\in\mathcal G$ 成立。据此说明：$X$ 与 $\mathcal G$ 独立是充分条件，并构造一个例子说明它不是必要条件。

7. 设 $X,Y$ 独立同分布且平方可积。证明 $\mathbb E[X\mid X+Y]=\dfrac{X+Y}{2}$，并指出证明中何处用到 $X$ 与 $Y$ 的可交换性。

8. 设 $X$ 可积，$\mathcal G_1\subseteq\mathcal G_2\subseteq\mathcal F$。证明塔性质 $\mathbb E\bigl[\mathbb E[X\mid\mathcal G_2]\mid\mathcal G_1\bigr]=\mathbb E[X\mid\mathcal G_1]$ 几乎必然，并由此证明 $\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_2]\bigr)\ge\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_1]\bigr)$（信息越多，条件均值的波动越大）。

9. 设 $\varphi$ 为凸函数且 $\mathbb E|\varphi(X)|<\infty$。用条件 Jensen 不等式证明：对任意子 $\sigma$-代数 $\mathcal G$，$\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)\le\mathbb E[\varphi(X)\mid\mathcal G]$ 几乎必然；并取 $\varphi(u)=|u|$ 推出 $\bigl|\mathbb E[X\mid\mathcal G]\bigr|\le\mathbb E[|X|\mid\mathcal G]$。

10. 设 $N\sim\operatorname{Binomial}(n,p)$，且给定 $N=k$ 时 $S=\sum_{i=1}^{k}X_i$，其中 $X_i$ 独立同分布于 $N(0,\sigma^2)$ 且与 $N$ 独立。求 $\mathbb E[S]$、$\operatorname{Var}(S)$，并写出 $S$ 的边缘分布。

11. 保险理赔模型中，理赔次数 $N\mid\Lambda\sim\operatorname{Poisson}(\Lambda)$，其中 $\Lambda\sim\operatorname{Gamma}(\alpha,\beta)$（形状 $\alpha$、速率 $\beta$）反映投保人风险的异质性。用全期望与全方差公式求 $\mathbb E N$ 与 $\operatorname{Var}(N)$，并说明 $\operatorname{Var}(N)>\mathbb E N$（过度离散）的来源是组间方差，以及这对风险定价的含义。

12. 设 $\mathbb E[X^2]<\infty$、$\mathbb E[Y^2]<\infty$，$\mathcal G\subseteq\mathcal F$。由命题 13.10 证明：若 $\operatorname{Cov}(X,Y\mid\mathcal G)=0$ 几乎必然而 $\operatorname{Cov}(X,Y)\ne0$，则必有 $\operatorname{Cov}\bigl(\mathbb E[X\mid\mathcal G],\mathbb E[Y\mid\mathcal G]\bigr)\ne0$。构造一个具体的离散例子说明这一情形，并解释它与 Simpson 悖论的关系。

13. 设 $(X,Y)$ 的联合密度为 $f(x,y)=2$，$0<x<y<1$。求最优预测 $\mathbb E[X\mid Y]$ 与最小均方误差，并求最佳线性预测，验证二者在本例中重合，进而说明重合的原因。

14. 沿用例 13.5 的联合密度 $f(x,y)=y^{-2}$（$0<x<y^2$，$0<y<1$）。**证明**最优预测 $g^*(y)=y^2/2$ 的确满足定理 13.11 的正交性条件，即对任意 $Y$ 的可测函数 $h$ 满足 $\mathbb E[h(Y)^2]<\infty$，都有 $\mathbb E\bigl[(X-g^*(Y))h(Y)\bigr]=0$。

15. 设 $X$ 平方可积，$\mathcal G\subseteq\mathcal F$。证明 $\mathbb E[X\mid\mathcal G]$ 是 $L^2(\Omega,\mathcal G,\mathbb P)$ 中最接近 $X$ 的元素，且最小距离的平方等于 $\mathbb E[\operatorname{Var}(X\mid\mathcal G)]$；再由此推出 $\bigl\|\mathbb E[X\mid\mathcal G]\bigr\|_2\le\|X\|_2$（条件期望是 $L^2$ 上的压缩算子）。

16. 某资产组合收益 $S$ 与股指期货收益 $H$ 满足：在低波动状态下 $\operatorname{Var}(H)=0.01$、$\operatorname{Cov}(S,H)=0.006$，在高波动状态下 $\operatorname{Var}(H)=0.09$、$\operatorname{Cov}(S,H)=0.054$，两状态等概率且 $\operatorname{Var}(S\mid\Theta)=0.04$ 不随状态变化。求状态相关对冲比与静态对冲比，并计算采用状态信息后对冲误差的相对降幅。

17. 设 $S$、$H$ 均已中心化且平方可积，$\operatorname{Var}(H)>0$。证明：最小方差对冲比 $h^*$ 等于用 $H$ 回归 $S$ 的斜率，且对冲后残差与 $H$ 不相关（$\operatorname{Cov}(S-h^*H,\ H)=0$）。解释这一正交性为何是「对冲已用尽 $H$ 所含信息」的数学表述。

18. 设 $Y_1,\dots,Y_n$ 独立同分布，$Y_i\mid\Theta\sim N(\Theta,\sigma^2)$，$\Theta\sim N(\mu_0,\tau^2)$，$\sigma^2$ 已知。求后验分布 $\Theta\mid Y_1,\dots,Y_n$ 与后验均值 $\mathbb E[\Theta\mid Y_1,\dots,Y_n]$，并说明该后验均值是先验均值与样本均值的加权平均，权重如何随 $n$ 变化（这一计算是第22章 Bayesian 收缩的雏形）。

19. 沿用例 13.7 的两状态模型，但改为 $\mathbb P(\Theta=A)=\pi$（$0<\pi<1$），信号 $S\mid\Theta=A\sim N(0,1)$、$S\mid\Theta=B\sim N(m,1)$，$m>0$。推导后验概率 $p(s)=\mathbb P(\Theta=A\mid S=s)$ 的 logistic 表达式，并证明存在阈值 $s_0$ 使最优预测在 $s>s_0$ 时大于 $1$、在 $s<s_0$ 时小于 $1$，给出 $s_0$ 的显式公式。

20. 设 $X\ge0$ 且 $\mathbb E X<\infty$，$\mathcal G\subseteq\mathcal F$。用定义 13.4 证明：$\mathbb E[X\mid\mathcal G]=0$ 几乎必然当且仅当 $X=0$ 几乎必然。（提示：取 $A=\{\mathbb E[X\mid\mathcal G]=0\}$ 与 $A^c$ 分别讨论。）

21. 设 $X_1,\dots,X_n$ 独立同分布于 $U(0,\theta)$，$\theta>0$ 未知，$M=\max_i X_i$。求 $\mathbb E[X_1\mid M]$，并说明为何该条件期望在 $X_1\ne M$ 与 $X_1=M$ 两种情形下取不同形式；由此构造 $\theta$ 的一个无偏估计并验证其无偏性。

22. 设 $M_0,M_1,M_2,\dots$ 关于滤波 $\{\mathcal F_n\}$ 是鞅且 $\sup_n\mathbb E[M_n^2]<\infty$。（i）证明增量两两不相关：对 $m<n$ 有 $\mathbb E[(M_n-M_m)(M_m-M_0)]=0$；（ii）由此证明 $\mathbb E[M_n^2]=\mathbb E[M_0^2]+\sum_{k=1}^{n}\mathbb E\bigl[(M_k-M_{k-1})^2\bigr]$；（iii）用全方差公式说明 $\mathbb E[\operatorname{Var}(M_n\mid\mathcal F_{n-1})]=\mathbb E[(M_n-M_{n-1})^2]$，从而把鞅的 $L^2$ 有界性等价地表述为增量平方和的可和性（这是第25章鞅收敛定理的关键输入）。
