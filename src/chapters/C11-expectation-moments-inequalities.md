# 第11章　期望、方差、矩与概率不等式

概率分布的完整刻画原则上需要无穷多个数字特征，但在理论研究与量化实践中被反复使用的，往往只是分布的前若干阶矩。矩之所以具有这样的地位，源于一个基本事实：在适当的可积性或尾部条件下，分布函数（或其等价的特征函数）由矩序列唯一确定，因而有限个矩便能在相当程度上概括分布的位置、尺度、对称性与尾部厚度。期望是这一切的起点。从泛函分析的观点看，期望是定义在可积随机变量空间 $L^1(\Omega,\mathcal F,\mathbb P)$ 上的一个正的线性泛函，其线性性不依赖任何独立性假设；正是这种"无条件线性"使期望成为处理随机过程、鞅与随机积分时最有力的工具——条件期望不过是该泛函在子 $\sigma$-代数上的投影，鞅性质不过是它沿时间的一致性表述。方差与更高阶矩则度量分布偏离中心的程度与形状，它们构成矩方法与广义矩估计（GMM）的基础，也直接对应金融资产收益率分布中广受关注的尖峰厚尾现象。

在统计推断一侧，矩是连接概率模型与样本数据的天然桥梁。矩估计以样本矩替换总体矩来求解未知参数，其思想由 Pearson 提出并经 Fisher 发展；Hansen 的广义矩估计进一步允许矩条件的个数超过参数个数，并以权重矩阵的最优选择获得渐近有效性，这一框架在资产定价因子模型、随机波动率模型与期限结构模型的估计中几乎是标准工具。所有这些方法的理论保证——一致性、渐近正态性、置信区间的覆盖率——都依赖大数定律与中心极限定理，而这两条定理的证明又完全建立在期望的线性性与概率不等式之上。因此本章的内容并非孤立的技巧汇编，它给出的是量化研究中一切参数估计与误差控制命题赖以成立的公理化底座。当矩根本不存在时（如例 11.3 所讨论的重尾情形），这套底座会失效，研究者必须转向分位数型风险度量、稳健统计或稳定分布理论，这也正是现代尾部风险管理的出发点。

概率不等式把矩的信息转化为概率的信息。Markov、Chebyshev、Chernoff、Hoeffding、Bernstein 等不等式表明，只要掌握随机变量的一阶或二阶矩，甚至只要掌握其矩生成函数在原点某邻域内的行为，就能对尾部概率 $\mathbb P(|X-\mathbb E[X]|\ge\varepsilon)$ 给出可计算的上界。这类不等式是收敛理论的引擎：弱大数定律的证明、Borel–Cantelli 引理的应用、依概率收敛与几乎必然收敛之间的桥梁，几乎都要借助某一形式的概率不等式；在统计与机器学习中，它们又是误差控制的基本手段，样本均值的集中性、经验分布对真实分布的一致逼近、回归系数的偏差界，都以不等式形式呈现。对量化研究而言，这意味着风险度量、回测显著性检验与置信区间的构造，本质上都建立在矩与不等式给出的尾部控制之上。本章前半部分建立期望、方差、矩、矩生成函数与特征函数的严格框架，后半部分系统讨论各类概率不等式及其在收敛定理中的应用。

## 11.1 期望的定义与性质

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间，$X:\Omega\to\mathbb R$ 为随机变量。在最初等的场合，$X$ 只取可列个值，或其分布具有密度，期望可分别用求和与积分给出。

**定义 11.1（期望）**

设 $X$ 为离散型随机变量，取值 $x_1,x_2,\dots$，$\mathbb P(X=x_k)=p_k$。若 $\sum_k|x_k|p_k<\infty$，则称

$$\mathbb E[X]=\sum_{k}x_kp_k\tag{11.1}$$

为 $X$ 的数学期望。设 $X$ 为连续型随机变量，密度为 $f$。若 $\int_{-\infty}^{\infty}|x|f(x)\,\mathrm dx<\infty$，则称

$$\mathbb E[X]=\int_{-\infty}^{\infty}xf(x)\,\mathrm dx\tag{11.2}$$

为 $X$ 的期望。

上述两种表述只是同一个抽象积分在不同测度下的具体化。令 $X^+=\max\{X,0\}$，$X^-=\max\{-X,0\}$，则 $X=X^+-X^-$，$|X|=X^++X^-$。对非负随机变量 $Y$，总存在单调递增的非负简单函数列 $Y_n\uparrow Y$，例如

$$Y_n=\sum_{k=0}^{n2^n-1}k2^{-n}\mathbf 1_{\{k2^{-n}\le Y<(k+1)2^{-n}\}}+n\mathbf 1_{\{Y\ge n\}},$$

据此定义 $\mathbb E[Y]=\lim_{n\to\infty}\mathbb E[Y_n]=\sup\{\mathbb E[Z]:0\le Z\le Y,\ Z\ \text{为简单函数}\}$，其中简单函数 $Z=\sum_kc_k\mathbf 1_{A_k}$ 的期望为 $\sum_kc_k\mathbb P(A_k)$。单调收敛定理保证该极限与逼近列的选取无关，且在离散与连续情形分别与 (11.1)、(11.2) 一致。对一般的 $X$，当 $\mathbb E[X^+]$ 与 $\mathbb E[X^-]$ 不同时为 $+\infty$ 时定义 $\mathbb E[X]=\mathbb E[X^+]-\mathbb E[X^-]$；若二者皆有限，则称 $X$ 可积，记为 $\mathbb E|X|<\infty$。由 $|X|=X^++X^-$ 立即得到变换公式 $\mathbb E[g(X)]=\int g(x)\,\mathrm dF_X(x)$，它在离散与连续情形分别退化为 $\sum_kg(x_k)p_k$ 与 $\int g(x)f(x)\,\mathrm dx$。

这一抽象视角带来两点值得强调的好处。其一，期望具有明确的物理意义：若把 $p_k$ 或 $f(x)\,\mathrm dx$ 理解为质量分布，则 $\mathbb E[X]$ 恰为该质量系统的质心坐标，而方差相当于关于质心的转动惯量，这解释了为何期望与方差总是成对出现。其二，Lebesgue 积分的极限定理（单调收敛定理、Fatou 引理、控制收敛定理）在同一框架下对离散型、连续型以及既无密度也无原子的奇异分布同样适用，Riemann 积分则做不到这一点；后文讨论随机过程的轨道积分、条件期望与鞅收敛时将反复依赖这些定理。还需注意，期望只是分布的一个数字概括，$\mathbb E[X]$ 相同而分布迥异的情形比比皆是，因此任何仅基于低阶矩的模型都隐含了额外的分布假设，而在金融应用中，这类假设往往正是风险被系统性低估的根源。

期望存在的条件是绝对可积，而非级数或积分的普通收敛。这一点的严格含义由下述命题给出。

**命题 11.2**

设 $X$ 为离散型随机变量，$\mathbb P(X=x_k)=p_k$。若 $\sum_k|x_k|p_k=+\infty$ 而 $\sum_kx_kp_k$ 条件收敛，则 $\mathbb E[X]$ 不能良定义：可以对原子重新标号而得到与 $X$ 同分布的随机变量 $X'$，使相应的级数和等于任意预先指定的实数。因此，只有 $\mathbb E|X|<\infty$ 才能保证期望与求和次序、极限交换无关。

**证明**

取 $p_k=\dfrac{6}{\pi^2}\dfrac{1}{k^2}$，$x_k=(-1)^{k+1}k$，$k\ge1$。由 $\sum_{k\ge1}k^{-2}=\pi^2/6$ 知 $\{p_k\}$ 构成一个概率分布，并且

$$\sum_{k=1}^{\infty}|x_k|p_k=\frac{6}{\pi^2}\sum_{k=1}^{\infty}\frac1k=+\infty,\qquad \sum_{k=1}^{\infty}x_kp_k=\frac{6}{\pi^2}\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{k}=\frac{6}{\pi^2}\ln2 .$$

级数 $\sum_k(-1)^{k+1}/k$ 条件收敛。由 Riemann 重排定理，对其项作适当重排，可使部分和收敛到任意给定的实数，甚至发散。重排等价于把原子 $\{X=x_k\}$ 重新标号，所得 $X'$ 与 $X$ 有相同的取值集合及对应概率，因而二者同分布，但 $\mathbb E[X']$ 可以是任意实数。这说明缺乏绝对可积性时，(11.1) 的值依赖于人为的排列次序，期望失去客观含义。反之，若 $\mathbb E|X|<\infty$，则任意重排不改变级数的和，积分与极限的交换也由控制收敛定理保证。

□

**定理 11.3**

设 $X,Y$ 为可积随机变量，$a,b\in\mathbb R$。则：(i)（线性性）$aX+bY$ 可积，且

$$\mathbb E[aX+bY]=a\mathbb E[X]+b\mathbb E[Y],\tag{11.3}$$

此处不要求 $X$ 与 $Y$ 独立；(ii)（单调性）若 $X\le Y$ 几乎必然成立，则 $\mathbb E[X]\le\mathbb E[Y]$；(iii)（保号性与三角不等式）若 $X\ge0$ 几乎必然成立，则 $\mathbb E[X]\ge0$，且 $|\mathbb E[X]|\le\mathbb E|X|$；(iv) 若 $X\ge0$ 几乎必然成立且 $\mathbb E[X]=0$，则 $X=0$ 几乎必然成立。

**证明**

先证线性性。设 $Z=\sum_{k=1}^{K}c_k\mathbf 1_{A_k}$，$W=\sum_{j=1}^{J}d_j\mathbf 1_{B_j}$ 为简单函数，$\{A_k\}$ 与 $\{B_j\}$ 各自构成互斥分割。取共同加细 $C_{kj}=A_k\cap B_j$，则 $Z=\sum_{k,j}c_k\mathbf 1_{C_{kj}}$，$W=\sum_{k,j}d_j\mathbf 1_{C_{kj}}$，且 $aZ+bW=\sum_{k,j}(ac_k+bd_j)\mathbf 1_{C_{kj}}$。由概率的有限可加性，

$$\mathbb E[aZ+bW]=\sum_{k,j}(ac_k+bd_j)\mathbb P(C_{kj})=a\sum_kc_k\mathbb P(A_k)+b\sum_jd_j\mathbb P(B_j)=a\mathbb E[Z]+b\mathbb E[W].$$

其次设 $X,Y\ge0$，$a,b\ge0$。取单调递增的非负简单函数列 $Z_n\uparrow X$，$W_n\uparrow Y$，则 $aZ_n+bW_n\uparrow aX+bY$，由单调收敛定理与上一步得 $\mathbb E[aX+bY]=a\mathbb E[X]+b\mathbb E[Y]$。对一般的 $a,b\in\mathbb R$ 与可积的 $X,Y$，由 $|aX+bY|\le|a||X|+|b||Y|$ 与非负情形的线性性得 $\mathbb E|aX+bY|\le|a|\mathbb E|X|+|b|\mathbb E|Y|<\infty$，故 $aX+bY$ 可积；再把 $aX$、$bY$ 各分解为正负部并对四个非负部分应用已证结论，即得 (11.3)。

(iii) 保号性直接来自非负简单函数逼近：$\mathbb E[X]=\sup\{\mathbb E[Z]:0\le Z\le X\}\ge0$。又 $-|X|\le X\le|X|$，由 (ii) 得 $-\mathbb E|X|\le\mathbb E[X]\le\mathbb E|X|$，即 $|\mathbb E[X]|\le\mathbb E|X|$。(ii) 由 $Y-X\ge0$ 几乎必然成立与 (iii) 得 $\mathbb E[Y-X]\ge0$，再用 (11.3)。(iv) 若 $\mathbb P(X>0)>0$，则存在 $n$ 使 $A_n=\{X\ge1/n\}$ 满足 $\mathbb P(A_n)>0$；于是 $X\ge\frac1n\mathbf 1_{A_n}$，由单调性 $\mathbb E[X]\ge\frac1n\mathbb P(A_n)>0$，与假设矛盾。

□

线性性 (11.3) 是期望最重要的性质，其力量在于完全不依赖独立性：对任意 $n$ 个可积随机变量与任意实系数，$\mathbb E\big[\sum_{k=1}^{n}a_kX_k\big]=\sum_{k=1}^{n}a_k\mathbb E[X_k]$ 恒成立。样本均值的无偏性、协方差的展开式 $\operatorname{Cov}\big(\sum_ia_iX_i,\sum_jb_jY_j\big)=\sum_{i,j}a_ib_j\operatorname{Cov}(X_i,Y_j)$、以及鞅论中大量初等恒等式的推导，都直接来自这一性质。与之相对，$\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]$ 一般需要独立性（至少是不相关），二者不可混为一谈。单调性与保号性则是构造不等式的基本工具：欲证 $\mathbb E[X]\le c$，只需找到一个从上方控制 $X$ 的常数或更简单的随机变量；而结论 (iv) 表明期望是"几乎必然"意义下的严格正泛函，这正是由 $\operatorname{Var}(X)=0$ 推出 $X$ 几乎必然等于常数的依据，也是均方收敛讨论中反复使用的判别手段。

**例 11.1**

设 $X\sim B(n,p)$，即 $\mathbb P(X=k)=\binom nk p^k(1-p)^{n-k}$，$k=0,1,\dots,n$；又设 $Y\sim\mathrm{Exp}(\lambda)$，密度 $f_Y(y)=\lambda e^{-\lambda y}$，$y>0$。求 $\mathbb E[X]$ 与 $\mathbb E[Y]$。

**解**

由 (11.1)，因 $k=0$ 项为零，

$$\mathbb E[X]=\sum_{k=1}^{n}k\frac{n!}{k!(n-k)!}p^k(1-p)^{n-k}=\sum_{k=1}^{n}\frac{n!}{(k-1)!(n-k)!}p^k(1-p)^{n-k}.$$

令 $j=k-1$，提出因子 $np$，得

$$\mathbb E[X]=np\sum_{j=0}^{n-1}\binom{n-1}{j}p^{j}(1-p)^{n-1-j}=np\,[p+(1-p)]^{n-1}=np,$$

其中用到二项式定理；求和项数有限，绝对可积性自然成立。对 $Y$，由 (11.2) 与分部积分，取 $u=y$，$\mathrm dv=\lambda e^{-\lambda y}\mathrm dy$，

$$\mathbb E[Y]=\int_0^{\infty}y\lambda e^{-\lambda y}\,\mathrm dy=\Big[-ye^{-\lambda y}\Big]_0^{\infty}+\int_0^{\infty}e^{-\lambda y}\,\mathrm dy=0+\frac1\lambda,$$

边界项为零是因为 $ye^{-\lambda y}\to0$（$y\to\infty$）。由于 $\int_0^\infty|y|f_Y(y)\,\mathrm dy=\mathbb E[Y]<\infty$，期望确实存在。同样的分部积分重复一次可得 $\mathbb E[Y^2]=2/\lambda^2$，这在下一节用于计算方差。

这两个计算同时说明了使用定义时的两个要点。其一，求 $\mathbb E[g(X)]$ 时应当把 $g$ 直接代入 $X$ 的分布中积分，而不必先求 $g(X)$ 的密度，此即变换公式 $\mathbb E[g(X)]=\int g(x)\,\mathrm dF_X(x)$ 的实际用法；上面对 $\mathbb E[Y^2]$ 的处理便是一例。其二，期望一般不与非线性变换交换：$\mathbb E[g(X)]\ne g(\mathbb E[X])$。仍以指数分布为例，$\mathbb E[e^{-\lambda Y}]=\int_0^\infty e^{-\lambda y}\lambda e^{-\lambda y}\,\mathrm dy=\frac12$，而 $e^{-\lambda\mathbb E[Y]}=e^{-1}\approx0.368$，二者显著不同。凸函数情形下的这种偏差由 Jensen 不等式精确刻画，它是后文一切概率不等式的共同源头；在金融中它对应"波动率拖累"现象：由 $\ln$ 的凹性，$\mathbb E[\ln(1+R)]\le\ln(1+\mathbb E[R])$，故长期几何平均收益总是低于算术平均收益，且二者的差距随收益方差增大而扩大。

## 11.2 方差、矩与分布形态

**定义 11.4（方差与标准差）**

设 $X$ 可积，称 $\operatorname{Var}(X)=\mathbb E[(X-\mathbb E[X])^2]$（允许取值 $+\infty$）为 $X$ 的方差，$\sigma_X=\sqrt{\operatorname{Var}(X)}$ 为标准差。若 $\operatorname{Var}(X)<\infty$，即 $X$ 平方可积，则

$$\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2 .\tag{11.4}$$

**命题 11.5**

设 $X,Y$ 平方可积，$a,b\in\mathbb R$。则：(i) $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$；(ii) $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\{\mathbb E[XY]-\mathbb E[X]\mathbb E[Y]\}$；(iii) 若 $X$ 与 $Y$ 还相互独立，则

$$\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).\tag{11.5}$$

**证明**

(i) 由 $\mathbb E[aX+b]=a\mathbb E[X]+b$，得 $\operatorname{Var}(aX+b)=\mathbb E[(aX+b-a\mathbb E[X]-b)^2]=a^2\mathbb E[(X-\mathbb E[X])^2]$。

(ii) 展开 $(X+Y)^2$ 并应用 (11.3)：

$$\operatorname{Var}(X+Y)=\mathbb E[X^2]+2\mathbb E[XY]+\mathbb E[Y^2]-(\mathbb E[X]+\mathbb E[Y])^2=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\{\mathbb E[XY]-\mathbb E[X]\mathbb E[Y]\}.$$

(iii) 只需证独立且平方可积时 $\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]$。由独立性，$(X,Y)$ 的联合分布等于边缘分布的乘积测度。先设 $X,Y\ge0$：取非负简单函数列 $Z_n\uparrow X$，$W_n\uparrow Y$，则 $Z_nW_n\uparrow XY$，且对简单函数由乘积测度的性质有 $\mathbb E[Z_nW_n]=\mathbb E[Z_n]\mathbb E[W_n]$；令 $n\to\infty$，由单调收敛定理即得结论。对一般的 $X,Y$，分解正负部并应用已证的线性性，注意 $|XY|\le\frac12(X^2+Y^2)$ 保证可积。代入 (ii) 即得 (11.5)。

□

(ii) 中花括号内的量称为 $X$ 与 $Y$ 的协方差，记作 $\operatorname{Cov}(X,Y)=\mathbb E[(X-\mathbb E[X])(Y-\mathbb E[Y])]=\mathbb E[XY]-\mathbb E[X]\mathbb E[Y]$；当 $\operatorname{Var}(X)\operatorname{Var}(Y)>0$ 时，$\rho_{XY}=\operatorname{Cov}(X,Y)/(\sigma_X\sigma_Y)$ 称为相关系数，由 Cauchy–Schwarz 不等式知 $|\rho_{XY}|\le1$。协方差关于每个自变量都是线性的，独立蕴涵不相关，反之不然。对 $n$ 个平方可积随机变量有 $\operatorname{Var}\big(\sum_{k=1}^{n}X_k\big)=\sum_{k=1}^{n}\operatorname{Var}(X_k)+2\sum_{1\le i<j\le n}\operatorname{Cov}(X_i,X_j)$。在投资组合理论中，这正是"分散化降低风险"的数学表述：当各资产收益的两两相关系数严格小于 $1$ 时，等权组合的方差严格小于各资产方差的算术平均，且随资产数目增加趋于平均协方差水平。

方差刻画分布的离散程度，而更完整的形态信息需要更高阶矩。

**定义 11.6（矩）**

设 $k$ 为正整数。若 $\mathbb E|X|^k<\infty$，称

$$\alpha_k=\mathbb E[X^k],\qquad \mu_k=\mathbb E[(X-\mathbb E[X])^k]\tag{11.6}$$

分别为 $X$ 的 $k$ 阶原点矩与 $k$ 阶中心矩。显然 $\alpha_1=\mathbb E[X]$，$\mu_1=0$，$\mu_2=\operatorname{Var}(X)$。

当 $\sigma_X>0$ 且三、四阶矩存在时，定义偏度与超额峰度

$$\gamma_1=\frac{\mu_3}{\sigma_X^{3}},\qquad \gamma_2=\frac{\mu_4}{\sigma_X^{4}}-3 .\tag{11.7}$$

偏度度量分布的不对称性：$\gamma_1<0$ 表示左尾更长、众数偏右，对应资产收益率中"缓慢上涨、急速下跌"的杠杆式形态；超额峰度度量相对于正态分布的尾部厚度与峰尖程度，$\gamma_2>0$ 即所谓尖峰厚尾。经验上，日频股票指数收益率的超额峰度常在 $3$ 到 $10$ 之间，远高于正态分布的 $0$，这意味着极端波动的发生频率被正态假设严重低估。若风险模型仅用前两阶矩（如均值—方差框架或基于正态假设的 VaR），在厚尾环境中将系统性低估尾部损失；此时需要引入分位数型风险度量，或改用厚尾分布族与极值理论。从抽样角度看，峰度本身还是一个极不稳定的统计量：样本峰度依赖四阶矩，其抽样分布收敛缓慢，在有限样本（例如三年的日频数据，约 $750$ 个观测）中，少数几个极端交易日就能使估计值成倍变动。因此实证报告中的峰度应附带置信区间或辅以稳健替代量（分位数间距比、尾部指数的 Hill 估计等），不宜作为点估计直接使用；同理，基于四阶矩的矩估计量在重尾数据上的表现往往劣于极大似然或分位数型方法。关于矩能否唯一确定分布，Carleman 条件 $\sum_{m\ge1}\alpha_{2m}^{-1/(2m)}=\infty$ 给出了一个常用的充分条件；对数正态分布等反例则说明矩序列一般不足以完全决定分布。

**例 11.2**

设 $Z\sim N(0,1)$，$X=\mu+\sigma Z\sim N(\mu,\sigma^2)$，$\sigma>0$。求 $Z$ 与 $X$ 的各阶矩，并计算 $X$ 的偏度与超额峰度。

**解**

先建立递推关系。对 $k\ge2$，分部积分取 $u=z^{k-1}$，$\mathrm dv=ze^{-z^2/2}\mathrm dz$，$v=-e^{-z^2/2}$：

$$\mathbb E[Z^k]=\frac1{\sqrt{2\pi}}\int_{-\infty}^{\infty}z^{k-1}\cdot ze^{-z^2/2}\,\mathrm dz=\Big[-\frac{z^{k-1}e^{-z^2/2}}{\sqrt{2\pi}}\Big]_{-\infty}^{\infty}+(k-1)\mathbb E[Z^{k-2}]=(k-1)\mathbb E[Z^{k-2}].$$

由于 $ze^{-z^2/2}$ 为奇函数且绝对可积，$\mathbb E[Z]=0$；又 $\mathbb E[Z^0]=1$。递推立即给出全部奇数阶矩为零，而偶数阶矩为

$$\mathbb E[Z^{2m}]=\prod_{j=1}^{m}(2j-1)=(2m-1)!!=\frac{(2m)!}{2^{m}m!}.$$

特别地 $\mathbb E[Z^2]=1$，$\mathbb E[Z^4]=3$，$\mathbb E[Z^6]=15$。由 $X-\mu=\sigma Z$ 得中心矩 $\mu_k=\sigma^k\mathbb E[Z^k]$，故 $X$ 的一切奇数阶中心矩为零，$\mu_{2m}=(2m-1)!!\,\sigma^{2m}$，其中 $\mu_2=\sigma^2$，$\mu_4=3\sigma^4$。原点矩可由二项展开 $\mathbb E[X^k]=\sum_{j=0}^{k}\binom kj\mu^{k-j}\sigma^{j}\mathbb E[Z^{j}]$ 得到，例如 $\mathbb E[X]=\mu$，$\mathbb E[X^2]=\mu^2+\sigma^2$，$\mathbb E[X^3]=\mu^3+3\mu\sigma^2$，$\mathbb E[X^4]=\mu^4+6\mu^2\sigma^2+3\sigma^4$。上述结果也可由矩生成函数一次性导出。由 $M_X(t)=\exp(\mu t+\sigma^2t^2/2)$（其推导见例 11.4），逐次求导得 $M_X'(t)=(\mu+\sigma^2t)M_X(t)$，$M_X''(t)=[\sigma^2+(\mu+\sigma^2t)^2]M_X(t)$，$M_X'''(t)=[3\sigma^2(\mu+\sigma^2t)+(\mu+\sigma^2t)^3]M_X(t)$；令 $t=0$ 并用 $M_X(0)=1$，依次得 $\alpha_1=\mu$，$\alpha_2=\mu^2+\sigma^2$，$\alpha_3=\mu^3+3\mu\sigma^2$，与分部积分法完全一致。这一递推对任意阶均成立，因为 $M_X^{(k+1)}(t)$ 总可写成 $(\mu+\sigma^2t)$ 与 $\sigma^2$ 的多项式再乘以 $M_X(t)$。代入 (11.7) 得 $\gamma_1=0$，$\gamma_2=3\sigma^4/\sigma^4-3=0$。这正是"以正态为基准"的含义：任何 $\gamma_2>0$ 都表明实际分布的尾部厚于正态假设。更一般地，若分布关于 $\mu$ 对称且 $\mathbb E|X|^k<\infty$，则其奇数阶中心矩必为零，因为被积函数为奇函数。

正态矩的封闭形式在建模中有直接用途。设日收益率 $R_1,\dots,R_k$ 相互独立且同服从 $N(\mu,\sigma^2)$，则累计收益 $S_k=\sum_{i=1}^{k}R_i$ 服从 $N(k\mu,k\sigma^2)$，其标准差按 $\sqrt k$ 增长，这就是波动率年化规则 $\sigma_{\text{年}}=\sigma_{\text{日}}\sqrt{252}$ 的依据。必须强调，该规则的本质前提是增量不相关且方差有限：若收益存在序列相关，$\operatorname{Var}(S_k)$ 中将出现协方差交叉项，标度指数随之偏离 $0.5$；若方差无穷（如例 11.3 中 $1<\alpha\le2$ 的 Pareto 尾部），$\sqrt k$ 标度会被更慢的 $k^{1-1/\alpha}$ 取代。实证中观察到的波动率标度异常，通常正是长记忆或厚尾的信号，据此直接使用年化因子会低估长期风险。

**例 11.3**

（1）设 $X$ 服从标准 Cauchy 分布，密度 $f(x)=\dfrac{1}{\pi(1+x^2)}$，$x\in\mathbb R$。讨论 $\mathbb E[X]$ 与 $\operatorname{Var}(X)$ 的存在性。（2）设 $Y$ 服从尺度参数 $x_m>0$、尾指数 $\alpha>0$ 的 Pareto 分布，密度 $f_Y(y)=\alpha x_m^{\alpha}y^{-\alpha-1}$，$y\ge x_m$，求 $\mathbb E[Y]$ 与 $\operatorname{Var}(Y)$ 存在的条件，并说明其对风险度量的后果。

**解**

（1）计算绝对值积分：

$$\mathbb E|X|=\frac{2}{\pi}\int_0^{\infty}\frac{x}{1+x^2}\,\mathrm dx=\frac1\pi\lim_{R\to\infty}\ln(1+R^2)=+\infty .$$

故 $X$ 不可积，$\mathbb E[X]$ 无定义。虽然积分的 Cauchy 主值 $\lim_{R\to\infty}\int_{-R}^{R}\frac{x}{\pi(1+x^2)}\mathrm dx=0$，且分布关于零对称，但由命题 11.2 这不能视为期望：截断点取非对称的 $[-R,2R]$ 就会得到不同的极限。既然均值不存在，方差更无从谈起。后果十分具体：Cauchy 分布的样本均值 $\bar X_n$ 与单个观测同分布，不随 $n$ 增大而集中，弱大数定律与中心极限定理均失效；据此，用历史均值估计此类资产的期望收益是无意义的，波动率估计亦不收敛，风险度量必须直接建立在分位数（VaR）之上。

（2）对 $k>0$，

$$\mathbb E[Y^k]=\alpha x_m^{\alpha}\int_{x_m}^{\infty}y^{k-\alpha-1}\,\mathrm dy,$$

被积函数的原函数为 $\frac{y^{k-\alpha}}{k-\alpha}$，故该积分收敛当且仅当 $\alpha>k$，此时 $\mathbb E[Y^k]=\frac{\alpha x_m^{k}}{\alpha-k}$。于是均值存在的条件是 $\alpha>1$，且 $\mathbb E[Y]=\frac{\alpha x_m}{\alpha-1}$；方差存在的条件是 $\alpha>2$，此时 $\mathbb E[Y^2]=\frac{\alpha x_m^2}{\alpha-2}$，

$$\operatorname{Var}(Y)=\frac{\alpha x_m^{2}}{\alpha-2}-\Big(\frac{\alpha x_m}{\alpha-1}\Big)^{2}=\frac{\alpha x_m^{2}}{(\alpha-1)^{2}(\alpha-2)} .$$

当 $1<\alpha\le2$ 时均值存在而方差无穷，样本均值的波动不再以 $n^{-1/2}$ 速率衰减，而是以 $n^{1-1/\alpha}$ 速率收敛到 $\alpha$-稳定律；当 $0<\alpha\le1$ 时连均值都不存在。许多实证研究表明资产损失尾部近似呈幂律，尾指数常落在 $2$ 到 $4$ 之间，这解释了为何基于二阶矩的组合优化在危机时期表现脆弱：模型所需的矩在总体中根本不存在，样本估计值被少数极端观测主导。

## 11.3 矩生成函数与特征函数

**定义 11.7（矩生成函数）**

设 $X$ 为随机变量，定义

$$M_X(t)=\mathbb E[e^{tX}],\qquad t\in D_M=\{t\in\mathbb R:M_X(t)<\infty\} .\tag{11.8}$$

$D_M$ 称为 $M_X$ 的存在域。

由 Hölder 不等式可知 $D_M$ 是包含 $0$ 的一个区间，且 $\ln M_X(t)$ 在该区间上是凸函数。若 $D_M$ 包含原点的一个邻域 $(-\delta,\delta)$，则 $X$ 的各阶矩全部有限，且 $M_X$ 在 $(-\delta,\delta)$ 内无穷次可导，求导与期望可以交换：因为当 $|t|\le\delta'<\delta$ 时 $|x|^ke^{tx}\le|x|^k(e^{\delta' x}+e^{-\delta' x})$，右端可积，控制收敛定理允许逐次求导，从而

$$M_X^{(k)}(0)=\mathbb E[X^k]=\alpha_k,\qquad k=1,2,\dots$$

等价地，$M_X(t)=\sum_{k=0}^{\infty}\frac{\alpha_k}{k!}t^k$ 在 $|t|<\delta$ 内成立。这提供了求矩的系统方法：先算出 $M_X$，再对 $t$ 求导并令 $t=0$。但 $D_M$ 可能退化为 $\{0\}$，例如对数正态分布或例 11.3 中的重尾分布，此时矩生成函数不可用，必须转向特征函数。

几个典型例子可以说明存在域的多样性。正态分布的 $M_X(t)=e^{\mu t+\sigma^2t^2/2}$ 对一切实数有限，$D_M=\mathbb R$；参数为 $\lambda$ 的指数分布满足 $M_X(t)=\lambda/(\lambda-t)$，仅当 $t<\lambda$ 时有限，故 $D_M=(-\infty,\lambda)$，但它仍包含原点邻域，各阶矩 $\alpha_k=k!/\lambda^{k}$ 可立即读出；而 Cauchy 分布与对数正态分布的 $D_M=\{0\}$，因为对任意 $t>0$，$e^{tx}$ 在幂律尾部或对数正态尾部之下的积分都发散。此外，$\ln M_X(t)$ 的凸性由 Hölder 不等式给出：对 $\theta\in[0,1]$ 与 $t_1,t_2\in D_M$，有 $M_X(\theta t_1+(1-\theta)t_2)\le M_X(t_1)^{\theta}M_X(t_2)^{1-\theta}$。函数 $\Lambda(t)=\ln M_X(t)$ 称为累积量生成函数，其在原点的各阶导数给出累积量，对正态分布而言除前两阶外全部为零；后文的 Chernoff 界正是通过对 $\Lambda$ 作 Legendre 变换得到的，这也是大偏差理论的起点。

**定义 11.8（特征函数）**

设 $X$ 为随机变量，称

$$\varphi_X(t)=\mathbb E[e^{\mathrm itX}]=\mathbb E[\cos(tX)]+\mathrm i\,\mathbb E[\sin(tX)],\qquad t\in\mathbb R\tag{11.9}$$

为 $X$ 的特征函数。

由于 $|e^{\mathrm itX}|=1$，(11.9) 对一切实数 $t$ 与一切随机变量 $X$ 都有意义，这是特征函数相对于矩生成函数的根本优势。特征函数满足 $\varphi_X(0)=1$，$|\varphi_X(t)|\le1$，在 $\mathbb R$ 上一致连续，且 $\varphi_{-X}(t)=\overline{\varphi_X(t)}$。若 $\mathbb E|X|^k<\infty$，则 $\varphi_X$ 有 $k$ 阶连续导数且 $\varphi_X^{(k)}(0)=\mathrm i^{k}\mathbb E[X^k]$。

关于特征函数，本章直接使用以下三个基本结果，均不加证明。唯一性定理断言：若 $\varphi_X(t)=\varphi_Y(t)$ 对一切 $t\in\mathbb R$ 成立，则 $X$ 与 $Y$ 同分布，因此特征函数与分布一一对应。反演公式指出，若分布函数 $F$ 在 $a,b$ 两点连续，则

$$F(b)-F(a)=\lim_{T\to\infty}\frac{1}{2\pi}\int_{-T}^{T}\frac{e^{-\mathrm itb}-e^{-\mathrm ita}}{-\mathrm it}\,\varphi_X(t)\,\mathrm dt ,$$

从而可由特征函数重构分布。Lévy 连续性定理断言：若 $\varphi_{X_n}(t)$ 对每个 $t$ 收敛于某函数 $\varphi(t)$，且 $\varphi$ 在 $t=0$ 处连续，则 $\varphi$ 必为某随机变量 $X$ 的特征函数，且 $X_n$ 依分布收敛于 $X$。这三条定理使"求极限分布"的问题化为"求特征函数的逐点极限"，是中心极限定理及其各种推广的标准证明路线。

值得指出，唯一性定理与反演公式共同表明特征函数是分布的完整"指纹"：分布的全部信息都编码在 $\varphi_X$ 之中，而不像矩那样在某些情形下会丢失（即矩问题中的 Hamburger 反例）。连续性定理的威力则在于，它把"分布收敛"这一涉及全体有界连续函数的弱收敛概念，转化为一个逐点的、往往只需初等极限运算的解析问题；对独立和而言，配合命题 11.9，特征函数化为乘积，取对数后又化为求和，这正是经典中心极限定理证明的核心步骤。在量化建模中，特征函数还是期权定价的数值工具：许多可解析处理的模型（Heston 随机波动率模型、CGMY 模型与各类 Lévy 过程模型）并不具有闭式密度，却有显式的特征函数，通过 Fourier 反演或 Carr–Madan 型公式即可高效计算期权价格与希腊字母。

**命题 11.9**

设 $X$ 与 $Y$ 相互独立，则对一切 $t\in\mathbb R$，

$$\varphi_{X+Y}(t)=\varphi_X(t)\,\varphi_Y(t).\tag{11.10}$$

更一般地，若 $X_1,\dots,X_n$ 相互独立，$a_1,\dots,a_n\in\mathbb R$，则 $\varphi_{\sum_ka_kX_k}(t)=\prod_k\varphi_{X_k}(a_kt)$。

**证明**

记 $U=\cos(tX)$，$V=\cos(tY)$，$U'=\sin(tX)$，$V'=\sin(tY)$，它们都是有界随机变量。由独立性，$(X,Y)$ 的联合分布为乘积测度，对乘积可测的有界函数可应用 Fubini 定理，于是

$$\mathbb E[UV]=\iint \cos(tx)\cos(ty)\,\mathrm dF_X(x)\,\mathrm dF_Y(y)=\mathbb E[U]\,\mathbb E[V],$$

同理 $\mathbb E[UV']=\mathbb E[U]\mathbb E[V']$，$\mathbb E[U'V]=\mathbb E[U']\mathbb E[V]$，$\mathbb E[U'V']=\mathbb E[U']\mathbb E[V']$。另一方面，

$$\varphi_{X+Y}(t)=\mathbb E[e^{\mathrm itX}e^{\mathrm itY}]=\mathbb E[(U+\mathrm iU')(V+\mathrm iV')]=\mathbb E[UV]-\mathbb E[U'V']+\mathrm i\{\mathbb E[UV']+\mathbb E[U'V]\}.$$

将上述四个等式代入，右端恰为 $(\mathbb E[U]+\mathrm i\mathbb E[U'])(\mathbb E[V]+\mathrm i\mathbb E[V'])=\varphi_X(t)\varphi_Y(t)$，即得 (11.10)。一般情形对 $a_kX_k$ 逐个应用同一论证，并用数学归纳法把两变量的乘积性质推广到 $n$ 个变量。

□

需要强调，(11.10) 的逆命题并不成立：特征函数相乘并不意味着独立，只有当联合特征函数能分解为边缘特征函数之积时才可推出独立性。

**例 11.4**

设 $X_1,\dots,X_n$ 相互独立，$X_k\sim N(\mu_k,\sigma_k^2)$，$a_1,\dots,a_n\in\mathbb R$ 不全为零。证明 $S=\sum_{k=1}^{n}a_kX_k$ 仍服从正态分布，并求其参数；再用特征函数证明独立 Poisson 随机变量之和的可加性。

**解**

第一部分用矩生成函数。对 $X\sim N(\mu,\sigma^2)$，令 $Z=(X-\mu)/\sigma\sim N(0,1)$，则

$$M_X(t)=e^{\mu t}\mathbb E[e^{\sigma tZ}]=\frac{e^{\mu t}}{\sqrt{2\pi}}\int_{-\infty}^{\infty}e^{\sigma tz-z^2/2}\,\mathrm dz .$$

配方 $\sigma tz-\frac{z^2}{2}=-\frac12(z-\sigma t)^2+\frac{\sigma^2t^2}{2}$，并作平移代换 $w=z-\sigma t$，得

$$M_X(t)=e^{\mu t+\sigma^2t^2/2}\cdot\frac1{\sqrt{2\pi}}\int_{-\infty}^{\infty}e^{-w^2/2}\,\mathrm dw=e^{\mu t+\sigma^{2}t^{2}/2},\qquad t\in\mathbb R .$$

该函数在整条实轴上有限，故 $D_M=\mathbb R$。由独立性，$e^{ta_kX_k}$ 相互独立，从而

$$M_S(t)=\prod_{k=1}^{n}\mathbb E[e^{ta_kX_k}]=\prod_{k=1}^{n}M_{X_k}(a_kt)=\exp\Big\{\Big(\sum_{k=1}^{n}a_k\mu_k\Big)t+\frac12\Big(\sum_{k=1}^{n}a_k^{2}\sigma_k^{2}\Big)t^{2}\Big\} .$$

右端恰是均值 $m=\sum_ka_k\mu_k$、方差 $v=\sum_ka_k^2\sigma_k^2$ 的正态分布的矩生成函数。由于矩生成函数在包含原点的区间上有限时唯一确定分布，得 $S\sim N(m,v)$。取 $a_k=1$ 即得独立正态变量之和仍为正态，且均值与方差分别相加；取 $a_k=1/n$ 即得样本均值 $\bar X\sim N(\mu,\sigma^2/n)$。

第二部分用特征函数。设 $X\sim\mathrm{Poisson}(\lambda_1)$，$Y\sim\mathrm{Poisson}(\lambda_2)$，且相互独立。直接计算

$$\varphi_X(t)=\sum_{k=0}^{\infty}e^{\mathrm itk}e^{-\lambda_1}\frac{\lambda_1^{k}}{k!}=e^{-\lambda_1}\sum_{k=0}^{\infty}\frac{(\lambda_1e^{\mathrm it})^{k}}{k!}=\exp\{\lambda_1(e^{\mathrm it}-1)\},$$

级数绝对收敛，故重排合法。同理 $\varphi_Y(t)=\exp\{\lambda_2(e^{\mathrm it}-1)\}$。由命题 11.9，

$$\varphi_{X+Y}(t)=\exp\{(\lambda_1+\lambda_2)(e^{\mathrm it}-1)\},$$

这正是参数为 $\lambda_1+\lambda_2$ 的 Poisson 分布的特征函数。由唯一性定理，$X+Y\sim\mathrm{Poisson}(\lambda_1+\lambda_2)$。这一论证避开了对二项系数恒等式 $\sum_{k}\binom{n}{k}p^k(1-p)^{n-k}$ 型卷积和的直接化简，展示了特征函数方法在处理分布卷积问题时的一般威力；同样的思路将在中心极限定理的证明中再次出现。

## 11.4 概率不等式

随机变量的分布函数或密度函数往往难以显式获得：独立变量之和的分布未必有初等表达式，高维联合分布更是几乎无法完全写出。相比之下，均值、方差这类矩信息通常容易计算或容易从数据中稳健地估计。概率不等式理论回答的核心问题是：仅凭有限的矩信息，能够对尾部概率给出多少保证？这一问题的答案支撑着大数定律与中心极限定理，也是统计估计、回测显著性检验与机器学习泛化分析中一切误差控制的理论起点。本节按 Markov、Chebyshev、Chernoff、Jensen、Cauchy–Schwarz 与 Hoeffding 的顺序给出最重要的概率不等式，每一条都配完整证明，并讨论其松紧程度与改进方向。

**定理 11.10（Markov 不等式）**

设 $X$ 为非负随机变量，即 $X \ge 0$ 几乎必然成立，且 $\mathbb E[X] < \infty$。则对任意实数 $a > 0$，

$$\mathbb P(X \ge a) \le \frac{\mathbb E[X]}{a}. \tag{11.11}$$

**证明**

记事件 $A = \{X \ge a\}$，并以 $\mathbf 1_A$ 表示其示性函数。把 $X$ 的期望按 $A$ 与其补事件 $A^c$ 分解为两部分：

$$\mathbb E[X] = \mathbb E[X \mathbf 1_A] + \mathbb E[X \mathbf 1_{A^c}].$$

由于 $X \ge 0$ 几乎必然，右端两项均非负，舍去第二项只会使值变小，故

$$\mathbb E[X] \ge \mathbb E[X \mathbf 1_A].$$

在事件 $A$ 上有 $X \ge a$，从而逐点地 $X \mathbf 1_A \ge a \mathbf 1_A$ 几乎必然成立；对这一逐点不等式两边取期望，并利用期望的线性性（定理 11.3），得

$$\mathbb E[X \mathbf 1_A] \ge a\,\mathbb E[\mathbf 1_A] = a\,\mathbb P(A).$$

将上述不等式串联起来即得 $\mathbb E[X] \ge a\,\mathbb P(X \ge a)$，两边同除以正数 $a$，便是式（11.11）。

□

Markov 不等式的证明有三个不可或缺的要素：非负性保证舍去 $A^c$ 上的贡献不会使不等号反向；阈值事件 $\{X \ge a\}$ 上可以用常数 $a$ 从下方控制 $X$；期望的单调性把逐点不等式提升为期望不等式。这一"构造非负变量、在事件上从下方控制、除以阈值"的模式是后续所有指数型不等式的共同骨架。

注记（可达性与推广形式）　式（11.11）的上界不可整体改进：若 $X$ 只取 $0$ 与 $a$ 两个值，$\mathbb P(X = a) = p$，则 $\mathbb E[X] = pa$，而 $\mathbb P(X \ge a) = p = \mathbb E[X]/a$，等号成立。另一方面，对任意严格递增的非负函数 $g$，事件 $\{X \ge a\}$ 与 $\{g(X) \ge g(a)\}$ 相同，把式（11.11）施加于非负变量 $g(X)$ 即得推广形式

$$\mathbb P(X \ge a) \le \frac{\mathbb E[g(X)]}{g(a)}.$$

取 $g(x) = x^k$（$k$ 为正整数）得到高阶矩界 $\mathbb P(X \ge a) \le \mathbb E[X^k]/a^k$；取 $g(x) = e^{tx}$（$t > 0$）便得到本节最重要的 Chernoff 界。换言之，选用越"陡峭"的变换 $g$，就能调动越高阶的矩信息，得到的尾界也越紧。

**定理 11.11（Chebyshev 不等式）**

设 $X$ 满足 $\mathbb E[X^2] < \infty$，记 $\mu = \mathbb E[X]$，$\operatorname{Var}(X) = \sigma^2$。则对任意 $\varepsilon > 0$，

$$\mathbb P\big(|X - \mu| \ge \varepsilon\big) \le \frac{\operatorname{Var}(X)}{\varepsilon^2}. \tag{11.12}$$

等价地，对任意 $k > 0$ 有 $\mathbb P(|X - \mu| \ge k\sigma) \le k^{-2}$。特别地，若 $X - \mu$ 的分布关于原点对称，则单侧形式 $\mathbb P(X - \mu \ge \varepsilon) \le \operatorname{Var}(X)/(2\varepsilon^2)$ 也成立。

**证明**

令 $Y = (X - \mu)^2$，则 $Y \ge 0$ 且 $\mathbb E[Y] = \operatorname{Var}(X) = \sigma^2$。注意事件恒等式

$$\{|X - \mu| \ge \varepsilon\} = \{(X - \mu)^2 \ge \varepsilon^2\} = \{Y \ge \varepsilon^2\},$$

对非负变量 $Y$ 与阈值 $a = \varepsilon^2$ 应用定理 11.10，得

$$\mathbb P(|X - \mu| \ge \varepsilon) = \mathbb P(Y \ge \varepsilon^2) \le \frac{\mathbb E[Y]}{\varepsilon^2} = \frac{\operatorname{Var}(X)}{\varepsilon^2},$$

此即式（11.12）。以 $\varepsilon = k\sigma$ 代入即得标准化形式。当 $X - \mu$ 与 $\mu - X$ 同分布时，对称性给出 $\mathbb P(X - \mu \ge \varepsilon) = \tfrac12 \mathbb P(|X - \mu| \ge \varepsilon)$，单侧形式随之成立。

□

注记（可达性与衰减率的局限）　Chebyshev 上界同样是可达的：设 $\sigma^2 \le \varepsilon^2$，令三点分布 $X$ 以概率 $q = \sigma^2/(2\varepsilon^2)$ 取值 $\mu - \varepsilon$ 与 $\mu + \varepsilon$，以概率 $1 - 2q$ 取值 $\mu$，则 $\operatorname{Var}(X) = 2q\varepsilon^2 = \sigma^2$，且 $\mathbb P(|X - \mu| \ge \varepsilon) = 2q = \sigma^2/\varepsilon^2$，等号成立。这说明在仅知均值与方差的条件下，$\varepsilon^{-2}$ 的多项式衰减率无法改进；然而对许多具体分布——正态、指数、有界变量——真实尾部按指数速率衰减，Chebyshev 界与真值之间可能存在若干数量级的差距。其根源在于：式（11.12）只动用了二阶矩，把高阶矩携带的信息全部丢弃了。由式（11.6）的幂级数展开可知，矩生成函数 $M_X(t)$ 在收敛域内编码了全部矩；定理 11.3 已证明 $\Lambda(t) = \ln M_X(t)$ 是凸函数，满足 $\Lambda(0) = 0$、$\Lambda'(0) = \mathbb E[X]$。把 Markov 不等式施加于指数变换 $e^{tX}$，就等于一次性动员所有阶的矩，其结果便是下面的 Chernoff 界：它把尾部衰减从多项式提升为指数，衰减速率恰由 $\Lambda$ 的 Legendre 变换给出。


**定理 11.12（Chernoff 界）**

设随机变量 $X$ 的矩生成函数 $M_X(t) = \mathbb E[e^{tX}]$ 在原点某邻域内有限，记 $\Lambda(t) = \ln M_X(t)$。则对任意实数 $a$ 与任意 $t > 0$，

$$\mathbb P(X \ge a) \le e^{-ta} M_X(t),$$

从而对 $t$ 取下确界，

$$\mathbb P(X \ge a) \le \inf_{t > 0} e^{-ta} M_X(t) = \exp\Big(-\sup_{t > 0}\{ta - \Lambda(t)\}\Big) = e^{-\Lambda^*(a)}, \tag{11.13}$$

其中 $\Lambda^*(a) = \sup_{t \ge 0}\{ta - \Lambda(t)\}$ 是 $\Lambda$ 的 Legendre 变换（Fenchel–Legendre 变换）。

**证明**

固定 $t > 0$。函数 $x \mapsto e^{tx}$ 严格递增，故事件恒等式 $\{X \ge a\} = \{e^{tX} \ge e^{ta}\}$ 成立。变量 $e^{tX}$ 非负且由假设 $\mathbb E[e^{tX}] = M_X(t) < \infty$，对其应用定理 11.10（即注记中取 $g(x) = e^{tx}$ 的推广形式），得

$$\mathbb P(X \ge a) = \mathbb P(e^{tX} \ge e^{ta}) \le \frac{\mathbb E[e^{tX}]}{e^{ta}} = e^{-ta} M_X(t).$$

上式对每个 $t > 0$ 都成立，右端是 $t$ 的函数，左端与 $t$ 无关，故左端不超过右端在 $t > 0$ 上的下确界。再把 $e^{-ta} M_X(t) = \exp\{ta - \Lambda(t)\}^{-1}$ 写开：由于指数函数严格递增，

$$\inf_{t > 0} \exp\{-[ta - \Lambda(t)]\} = \exp\Big\{-\sup_{t > 0}[ta - \Lambda(t)]\Big\},$$

并且把上确界扩展到 $t \ge 0$ 不会变小（$t = 0$ 时 $ta - \Lambda(t) = 0$，而当 $a > \mathbb E[X]$ 时上确界为正，端点不影响取值），于是得到式（11.13）中的 $\Lambda^*(a)$。

□

注记（最优参数与几何解释）　当 $\Lambda$ 在收敛域内部严格凸且可微时（定理 11.3 已给出凸性与 $\Lambda'(0) = \mathbb E[X]$），若 $a > \mathbb E[X]$，则函数 $t \mapsto ta - \Lambda(t)$ 在 $t = 0$ 处导数为 $a - \mathbb E[X] > 0$，其最大值在内点 $t^*$ 处取得，$t^*$ 由一阶条件

$$\Lambda'(t^*) = a$$

唯一确定；此时 $\Lambda^*(a) = t^* a - \Lambda(t^*)$。几何上，$\Lambda^*(a)$ 是斜率为 $a$ 的直线从下方支撑凸曲线 $\Lambda$ 时的截距的相反数，即 $\Lambda$ 与其支撑直线族之间的对偶配对。凸函数与其 Legendre 变换互相恢复：$(\Lambda^*)^* = \Lambda$，这对偶性在第 27 章讨论大偏差原理时将再次出现。

Chernoff 界为何常比 Chebyshev 界紧？第一，衰减速率不同。Chebyshev 界 $\sigma^2/\varepsilon^2$ 按偏差的平方反比衰减，属于多项式速率；而当 $a > \mathbb E[X]$ 时 $\Lambda^*(a) > 0$（因为 $\Lambda^*(a) \ge ta - \Lambda(t)$ 对某个 $t > 0$ 为正），Chernoff 界按 $e^{-\Lambda^*(a)}$ 指数衰减。以标准正态变量 $X \sim N(0,1)$ 为例，$M_X(t) = e^{t^2/2}$，$\Lambda(t) = t^2/2$，一阶条件 $t^* = a$ 给出 $\Lambda^*(a) = a^2/2$，于是 $\mathbb P(X \ge a) \le e^{-a^2/2}$；在 $a = 4$ 处 Chebyshev 给出 $1/16 \approx 6.3 \times 10^{-2}$，Chernoff 给出 $e^{-8} \approx 3.4 \times 10^{-4}$，相差近两个数量级，且差距随 $a$ 增大而指数式扩大。第二，信息利用不同。Chebyshev 只使用二阶矩，而 $M_X(t)$ 的幂级数展开表明 $e^{tX}$ 的期望浓缩了全部矩的信息；Chernoff 界等价于对每个 $t$ 同时使用所有 $k$ 阶矩界 $\mathbb P(X \ge a) \le \mathbb E[(X - c)^k]/(a - c)^k$ 的指数加权最优组合。第三，可组合性不同。对独立变量之和 $S_n = X_1 + \cdots + X_n$，$M_{S_n}(t) = \prod_i M_{X_i}(t)$，Chernoff 界直接因子化，配合对每个变量的逐点上界即可得到 $S_n$ 的指数尾界——这正是 Hoeffding 不等式的证明路线；而 Chebyshev 界只给出 $\operatorname{Var}(S_n)/\varepsilon^2$ 级别的粗糙控制。当然，Chernoff 界的代价是需要 $M_X(t)$ 在 $t > 0$ 处存在；对柯西分布这类矩生成函数不存在的重尾变量，Chernoff 方法失效，只能退回到 Chebyshev 型界，甚至更弱的分位数界。

**定理 11.13（Jensen 不等式）**

设 $\varphi: I \to \mathbb R$ 是区间 $I$ 上的凸函数，随机变量 $X$ 取值于 $I$，且 $\mathbb E|X| < \infty$、$\mathbb E|\varphi(X)| < \infty$。则

$$\varphi\big(\mathbb E[X]\big) \le \mathbb E\big[\varphi(X)\big]. \tag{11.14}$$

若 $\varphi$ 严格凸且式（11.14）取等号，则 $X = \mathbb E[X]$ 几乎必然成立。

**证明**

先给离散情形的证明。设 $X$ 只取有限个值 $x_1, \ldots, x_n \in I$，对应概率 $p_1, \ldots, p_n$（$p_i \ge 0$，$\sum_i p_i = 1$）。凸函数的定义即两点情形：对任意 $x, y \in I$ 与 $\lambda \in [0,1]$，

$$\varphi\big(\lambda x + (1-\lambda)y\big) \le \lambda \varphi(x) + (1-\lambda)\varphi(y).$$

对 $n$ 用数学归纳法。$n = 2$ 即上式。设结论对 $n-1$ 个点成立，考虑 $n$ 个点；若某个 $p_n = 0$ 则退化为 $n-1$ 点情形，否则令 $\lambda = p_n$，$y = x_n$，并把前 $n-1$ 个权重新归一化：记 $q_i = p_i/(1 - p_n)$，则 $\sum_{i=1}^{n-1} q_i = 1$，且 $\mathbb E[X] = (1-p_n)\sum_i q_i x_i + p_n x_n$。先用两点凸性，再对归一化后的点列用归纳假设：

$$\varphi\Big(\sum_{i=1}^n p_i x_i\Big) = \varphi\Big((1-p_n)\sum_{i=1}^{n-1} q_i x_i + p_n x_n\Big) \le (1-p_n)\,\varphi\Big(\sum_{i=1}^{n-1} q_i x_i\Big) + p_n \varphi(x_n) \le \sum_{i=1}^n p_i \varphi(x_i),$$

归纳完成。可列离散情形由单调收敛定理对部分和取极限即得，因为 $\varphi$ 连续（凸函数在区间内部连续），极限可以穿过 $\varphi$。

再给一般情形的证明，核心工具是凸函数的支撑超平面性质。注意 $\mathbb E[X]$ 是 $X$ 的取值按概率的加权平均，必落在区间 $I$ 内。先设 $\mathbb E[X] = x_0$ 是 $I$ 的内点。凸分析的基本事实是：凸函数在其定义区间的任一内点处存在支撑直线，即存在实数 $c$（次梯度），使得对一切 $x \in I$，

$$\varphi(x) \ge \varphi(x_0) + c\,(x - x_0).$$

（这一事实可从凸性直接推出：差商 $[\varphi(x) - \varphi(x_0)]/(x - x_0)$ 关于 $x$ 单调不减，取 $c$ 为该差商在 $x_0$ 两侧的公共极限即可，且左右极限存在有限。）把 $x = X(\omega)$ 逐点代入，得到几乎必然成立的随机不等式

$$\varphi(X) \ge \varphi(x_0) + c\,(X - x_0).$$

两边取期望（右端期望有限，左端由假设 $\mathbb E|\varphi(X)| < \infty$ 可积，不等号方向由期望的单调性保持），并利用期望的线性性：

$$\mathbb E[\varphi(X)] \ge \varphi(x_0) + c\,\big(\mathbb E[X] - x_0\big) = \varphi(x_0) = \varphi\big(\mathbb E[X]\big),$$

最后一步用到 $x_0 = \mathbb E[X]$。若 $x_0$ 是 $I$ 的端点（例如 $I = [0,\infty)$ 且 $\mathbb E[X] = 0$），则非负变量 $X$ 的期望为零迫使 $X = 0$ 几乎必然，不等式两边同为 $\varphi(0)$，结论平凡成立。

最后证取等条件。设 $\varphi$ 严格凸且 $\mathbb E[\varphi(X)] = \varphi(\mathbb E[X])$。上述推导中，取等号要求几乎必然地 $\varphi(X) = \varphi(x_0) + c(X - x_0)$，即 $X$ 几乎必然落在支撑直线与凸曲线的接触点上。严格凸函数与其任一支撑直线至多在一个点接触，故 $X = x_0 = \mathbb E[X]$ 几乎必然。

□

注记　Jensen 不等式是"非线性与期望不可交换"的定量表达：凸函数把波动向上推，凹函数把波动向下拉。取 $\varphi(x) = x^2$（严格凸）即得熟悉的 $\mathbb E[X^2] \ge (\mathbb E[X])^2$，也就是方差的非负性；取 $\varphi(x) = e^{tx}$ 即得 $\mathbb E[e^{tX}] \ge e^{t\,\mathbb E[X]}$，这正是定理 11.3 中 $\Lambda(0) = 0$、$\Lambda$ 在原点处不低于其切线这一事实的重新表述。对凹函数 $u$（即 $-u$ 凸），不等号反向：$u(\mathbb E[X]) \ge \mathbb E[u(X)]$，这一形式在经济学与金融中解释风险厌恶时最为常用，本章 11.6 节与例 11.6 将反复使用。

**命题 11.14（Cauchy–Schwarz 不等式）**

设 $X, Y$ 满足 $\mathbb E[X^2] < \infty$、$\mathbb E[Y^2] < \infty$。则 $\mathbb E|XY| < \infty$，且

$$\big|\mathbb E[XY]\big| \le \sqrt{\mathbb E[X^2]\;\mathbb E[Y^2]}. \tag{11.15}$$

等号成立当且仅当存在不全为零的实数 $\alpha, \beta$，使 $\alpha X + \beta Y = 0$ 几乎必然。

**证明**

先证可积性。由初等不等式 $|xy| \le (x^2 + y^2)/2$（它等价于 $(|x| - |y|)^2 \ge 0$）逐点代入 $x = X$、$y = Y$ 并取期望，得

$$\mathbb E|XY| \le \frac{\mathbb E[X^2] + \mathbb E[Y^2]}{2} < \infty.$$

再证不等式本身。若 $\mathbb E[Y^2] = 0$，则 $Y = 0$ 几乎必然，两边均为零，不等式以等号成立，且 $\beta = 1$、$\alpha = 0$ 满足取等条件。下设 $\mathbb E[Y^2] > 0$。对任意实数 $\lambda$，展开平方并利用期望的线性性：

$$f(\lambda) := \mathbb E\big[(X + \lambda Y)^2\big] = \mathbb E[X^2] + 2\lambda\,\mathbb E[XY] + \lambda^2\,\mathbb E[Y^2] \ge 0.$$

$f$ 是首项系数 $\mathbb E[Y^2] > 0$ 的二次多项式且处处非负，故其判别式非正：

$$4\,\mathbb E[XY]^2 - 4\,\mathbb E[Y^2]\,\mathbb E[X^2] \le 0,$$

整理得 $\mathbb E[XY]^2 \le \mathbb E[X^2]\,\mathbb E[Y^2]$。又由 $-\mathbb E[XY] = \mathbb E[(-X)Y]$，把同一论证用于 $-X$ 得 $|\mathbb E[XY]| \le \sqrt{\mathbb E[X^2]\,\mathbb E[Y^2]}$，即式（11.15）。

取等条件：等号成立等价于判别式为零，即 $f$ 有唯一实根 $\lambda_0 = -\mathbb E[XY]/\mathbb E[Y^2]$，从而 $\mathbb E[(X + \lambda_0 Y)^2] = 0$。非负变量期望为零意味着 $X + \lambda_0 Y = 0$ 几乎必然，取 $\alpha = 1$、$\beta = \lambda_0$ 即得必要性；反向代入验证充分性是直接的。

□

注记　把 $X, Y$ 换成中心化变量 $X - \mathbb E[X]$、$Y - \mathbb E[Y]$，式（11.15）立即给出 $|\operatorname{Cov}(X,Y)| \le \sigma_X \sigma_Y$，从而相关系数的定义 $\rho_{XY} = \operatorname{Cov}(X,Y)/(\sigma_X \sigma_Y)$ 合理且 $|\rho_{XY}| \le 1$——这是 11.2 节中相关系数取值范围的严格依据。此外，取 $Y \equiv 1$ 得 $|\mathbb E[X]| \le \sqrt{\mathbb E[X^2]}$，平方后再次得到 $\mathbb E[X^2] \ge (\mathbb E[X])^2$；可见 Cauchy–Schwarz 与 Jensen 在二阶矩层面互为表里。在 $L^2$ 空间中定义内积 $\langle X, Y \rangle = \mathbb E[XY]$，式（11.15）正是这一内积空间的 Cauchy–Schwarz 不等式，它保证了 $L^2$ 范数满足三角不等式，是第 14 章投影理论与最小二乘回归的出发点。

**定理 11.15（Hoeffding 不等式）**

设 $X_1, \ldots, X_n$ 相互独立，且对每个 $i$，$a_i \le X_i \le b_i$ 几乎必然成立，其中 $a_i < b_i$ 为已知常数。记 $S_n = X_1 + \cdots + X_n$。则对任意 $t > 0$，

$$\mathbb P\big(S_n - \mathbb E[S_n] \ge t\big) \le \exp\left(-\frac{2t^2}{\sum_{i=1}^n (b_i - a_i)^2}\right), \tag{11.16}$$

且双侧形式 $\mathbb P(|S_n - \mathbb E[S_n]| \ge t) \le 2\exp\big(-2t^2/\sum_i (b_i - a_i)^2\big)$ 成立。特别地，对样本均值 $\bar X_n = S_n/n$，

$$\mathbb P\big(\bar X_n - \mathbb E[\bar X_n] \ge \delta\big) \le \exp\left(-\frac{2n^2\delta^2}{\sum_{i=1}^n (b_i - a_i)^2}\right).$$

**证明**（思路）

证明分两步：先用引理控制单个有界变量的矩生成函数，再用 Chernoff 方法把因子化的界优化成一个指数尾界。

引理（Hoeffding 引理）　设 $X$ 满足 $\mathbb E[X] = 0$ 且 $a \le X \le b$ 几乎必然，则对一切实数 $s$，

$$\mathbb E[e^{sX}] \le \exp\left(\frac{s^2(b-a)^2}{8}\right).$$

引理的证明思路如下。因 $a \le X \le b$，可把 $X$ 逐点写成两端点的凸组合：$X = \theta b + (1-\theta) a$，其中 $\theta = (X - a)/(b - a) \in [0,1]$ 是随机权，且 $\mathbb E[\theta] = -a/(b-a)$（由 $\mathbb E[X] = 0$）。函数 $x \mapsto e^{sx}$ 是凸函数，故逐点地

$$e^{sX} = e^{s[\theta b + (1-\theta)a]} \le \theta e^{sb} + (1-\theta) e^{sa},$$

两边取期望并用 $\mathbb E[\theta]$ 的值得 $\mathbb E[e^{sX}] \le \psi(s)$，其中

$$\psi(s) = \frac{-a}{b-a} e^{sb} + \frac{b}{b-a} e^{sa}$$

恰是均值为零、取值于 $\{a, b\}$ 的两点分布的矩生成函数。剩下验证 $\Lambda_0(s) = \ln \psi(s)$ 满足 $\Lambda_0(0) = 0$、$\Lambda_0'(0) = 0$ 且 $\Lambda_0''(s) \le (b-a)^2/4$。记

$$p = \frac{-a}{b-a}, \qquad q = \frac{b}{b-a},$$

则 $p, q > 0$，$p + q = 1$，且 $pb + qa = (-ab + ba)/(b-a) = 0$，即 $\psi(s) = p e^{sb} + q e^{sa}$ 确实是均值为零的两点分布的矩生成函数。由 $\psi(0) = p + q = 1$ 得 $\Lambda_0(0) = 0$。对每个实数 $s$，定义指数倾斜权

$$p_s = \frac{p e^{sb}}{\psi(s)}, \qquad q_s = \frac{q e^{sa}}{\psi(s)},$$

则 $p_s + q_s = 1$ 且 $p_s, q_s > 0$。逐次求导：

$$\Lambda_0'(s) = \frac{\psi'(s)}{\psi(s)} = \frac{p b e^{sb} + q a e^{sa}}{\psi(s)} = p_s b + q_s a,$$

$$\Lambda_0''(s) = \frac{\psi''(s)}{\psi(s)} - \Big[\frac{\psi'(s)}{\psi(s)}\Big]^2 = \big(p_s b^2 + q_s a^2\big) - \big(p_s b + q_s a\big)^2 = p_s q_s (b - a)^2,$$

最后一步把平方展开即得两点分布的方差公式 $p_s q_s (b-a)^2$。由算术—几何平均不等式 $p_s q_s \le [(p_s + q_s)/2]^2 = 1/4$，故

$$0 \le \Lambda_0''(s) \le \frac{(b-a)^2}{4}, \qquad \Lambda_0'(0) = pb + qa = 0.$$

对 $\Lambda_0''(s) \le (b-a)^2/4$ 从 $0$ 到 $s$ 积分一次，利用 $\Lambda_0'(0) = 0$ 得 $\Lambda_0'(u) \le u(b-a)^2/4$；再积分一次，利用 $\Lambda_0(0) = 0$ 得 $\Lambda_0(s) \le s^2(b-a)^2/8$，引理证毕。

现在完成定理 11.15 的证明思路。记 $\tilde X_i = X_i - \mathbb E[X_i]$，则 $\mathbb E[\tilde X_i] = 0$ 且 $a_i - \mathbb E[X_i] \le \tilde X_i \le b_i - \mathbb E[X_i]$，区间长度仍为 $b_i - a_i$。对任意 $s > 0$，事件 $\{S_n - \mathbb E[S_n] \ge t\}$ 与 $\{e^{s(S_n - \mathbb E[S_n])} \ge e^{st}\}$ 相同，由 Chernoff 界（定理 11.12）：

$$\mathbb P\big(S_n - \mathbb E[S_n] \ge t\big) \le \inf_{s > 0} e^{-st}\, \mathbb E\Big[e^{s\sum_i \tilde X_i}\Big].$$

由独立性，期望因子化为 $\mathbb E[e^{s(S_n - \mathbb E S_n)}] = \prod_{i=1}^n \mathbb E[e^{s\tilde X_i}]$；对每个因子应用 Hoeffding 引理：

$$\prod_{i=1}^n \mathbb E[e^{s\tilde X_i}] \le \prod_{i=1}^n \exp\left(\frac{s^2(b_i-a_i)^2}{8}\right) = \exp\left(\frac{s^2}{8}\sum_{i=1}^n (b_i-a_i)^2\right).$$

记 $V = \sum_i (b_i - a_i)^2$，需要最小化的上界函数为 $\exp(s^2 V/8 - st)$。指数内是关于 $s$ 的开口向上二次函数，最小点在 $s^* = 4t/V$ 处取得，代入得指数为 $-2t^2/V$，即式（11.16）。双侧形式对 $-X_i$ 重复同一论证（$-\tilde X_i$ 同样有界、零均值），再用概率的次可加性合并两翼。

□

注记　Hoeffding 界的两个特征使它成为回测与统计学习中最常用的工具。其一，速率 $\exp(-cn\delta^2)$ 表明样本均值以 $1/\sqrt{n}$ 的尺度收敛，且偏离该尺度的概率按指数消亡，这与中心极限定理的预测一致，但后者只描述渐近行为，Hoeffding 界对每个有限的 $n$ 都严格成立。其二，界中只出现区间宽度 $b_i - a_i$，不依赖分布的任何其他细节，因此它对分布误设完全稳健——代价是当真实分布远小于区间宽度所暗示的波动时（例如变量实际接近常量），界会显著偏松。对亚高斯变量（满足 $\Lambda(t) \le \sigma^2 t^2/2$ 的变量）可得到形式相同、常数更优的界；对无界的重尾变量，Hoeffding 方法失效，需改用 Bernstein 型不等式（引入方差信息）或截断技巧，这些属于第 24 章统计学习理论的内容。

**例 11.5**

设 $X \sim N(0,1)$。分别用 Chebyshev 不等式与 Chernoff 界估计尾部概率 $\mathbb P(X \ge 3)$，并与精确值比较，定量说明两者的松紧。

**解**

精确值方面，$X$ 的密度关于原点对称，标准正态分布函数表给出 $\mathbb P(X \ge 3) = 1 - \Phi(3) \approx 0.00135$。

Chebyshev 估计：这里 $\mu = 0$、$\sigma^2 = 1$，由式（11.12），

$$\mathbb P(X \ge 3) \le \mathbb P(|X| \ge 3) \le \frac{\operatorname{Var}(X)}{3^2} = \frac{1}{9} \approx 0.1111.$$

若利用对称性使用定理 11.11 的单侧形式，可改进为 $\mathbb P(X \ge 3) \le 1/18 \approx 0.0556$，仍是真值的四十倍以上。

Chernoff 估计：由式（11.6），$X \sim N(0,1)$ 的矩生成函数为 $M_X(t) = e^{t^2/2}$，故 $\Lambda(t) = t^2/2$。对任意 $t > 0$，

$$\mathbb P(X \ge 3) \le e^{-3t} M_X(t) = \exp\Big(\frac{t^2}{2} - 3t\Big).$$

指数 $\frac{t^2}{2} - 3t$ 关于 $t$ 是开口向上的二次函数，最小点在 $t^* = 3$ 处取得（一阶条件 $\Lambda'(t^*) = t^* = a = 3$，与定理 11.12 注记中的方程一致），最小值为 $\frac{9}{2} - 9 = -\frac{9}{2}$，于是

$$\mathbb P(X \ge 3) \le e^{-9/2} \approx 0.0111.$$

Legendre 变换形式下同一结论写作 $\Lambda^*(3) = \sup_{t}\{3t - t^2/2\} = 9/2$。

定量比较：在 $a = 3$ 处，Chebyshev 界 $1/9$ 约是真值 $0.00135$ 的 $82$ 倍，Chernoff 界 $e^{-4.5}$ 约是真值的 $8.2$ 倍，Chernoff 比 Chebyshev 紧一个数量级。差距随阈值增大而急剧扩大：对一般的 $a > 0$，Chebyshev 界按 $a^{-2}$ 多项式衰减，Chernoff 界按 $e^{-a^2/2}$ 指数衰减；在 $a = 5$ 处两界分别为 $0.04$ 与 $3.7 \times 10^{-6}$，相差四个数量级以上。这正是 11.4 节开头所说"Chebyshev 浪费高阶矩信息、Chernoff 通过矩生成函数动员全部矩"的具体体现。

**例 11.6**

设 $X > 0$ 几乎必然且 $\mathbb E[X] < \infty$、$\mathbb E[|\log X|] < \infty$。用 Jensen 不等式证明

$$\mathbb E[\log X] \le \log \mathbb E[X],$$

等号成立当且仅当 $X$ 几乎必然为常数；并解释由此导出的几何平均与算术平均收益之差在金融上的含义。

**解**

函数 $\log x$ 在 $(0,\infty)$ 上二阶可导，$(\log x)'' = -1/x^2 < 0$，故 $\log$ 是严格凹函数，$-\log$ 是严格凸函数。对严格凸函数 $\varphi(x) = -\log x$ 应用定理 11.13（$X$ 取值于 $I = (0,\infty)$，可积性条件已设）：

$$-\log \mathbb E[X] = \varphi\big(\mathbb E[X]\big) \le \mathbb E[\varphi(X)] = \mathbb E[-\log X] = -\mathbb E[\log X],$$

两边乘以 $-1$ 即得 $\mathbb E[\log X] \le \log \mathbb E[X]$。由定理 11.13 的取等条件（严格凸情形），等号成立当且仅当 $X = \mathbb E[X]$ 几乎必然，即 $X$ 几乎必然为常数。对不等式两边取指数，得到等价形式

$$\exp\big(\mathbb E[\log X]\big) \le \mathbb E[X].$$

左端恰是 $X$ 的（对数）几何平均，右端是算术平均，这就是概率形式的"几何平均不超过算术平均"。

金融含义如下。设某资产各期总收益因子为 $G_1, \ldots, G_n$（$G_k = 1 + R_k > 0$，独立同分布，与 $G$ 同分布），初始财富 $W_0$，满仓持有 $n$ 期后 $W_n = W_0 \prod_{k=1}^n G_k$。长期复合增长率为

$$\frac{1}{n}\log\frac{W_n}{W_0} = \frac{1}{n}\sum_{k=1}^n \log G_k \;\longrightarrow\; \mathbb E[\log G] \quad (n \to \infty),$$

极限由大数定律保证（第 12 章），即长期增长率等于对数收益的期望，而非收益本身的期望。由上面证明的不等式，$\mathbb E[\log G] \le \log \mathbb E[G]$，即复合增长率系统性地低于算术平均收益的对数，两者之差正是波动带来的"方差拖累"。定量地看，若 $R$ 较小，对 $\log(1+R)$ 在 $\mathbb E[R]$ 处作二阶 Taylor 展开并取期望：

$$\mathbb E[\log(1+R)] \approx \log\big(1+\mathbb E[R]\big) - \frac{\operatorname{Var}(R)}{2\big(1+\mathbb E[R]\big)^2},$$

即几何收益约等于算术收益减去半个方差（小收益情形下约为 $\mathbb E[R] - \sigma^2/2$）。举例：策略 A 算术均值 $12\%$、波动率 $30\%$，策略 B 算术均值 $10\%$、波动率 $10\%$，则近似几何收益分别为 $0.12 - 0.045 = 7.5\%$ 与 $0.10 - 0.005 = 9.5\%$——按长期复合增长衡量，波动更小的 B 反而胜出。这解释了三个实践结论：其一，回测与业绩评价若只比较算术平均收益，会系统性高估高波动策略的长期表现，评价长期持有型策略应使用几何平均或对数收益均值；其二，杠杆放大收益的同时按平方放大方差拖累，超过某一点后加杠杆反而降低长期复合增长率，最优杠杆水平与 Kelly 准则一致，即最大化 $\mathbb E[\log G]$；其三，Jensen 不等式给出的差距方向是确定的——波动只会侵蚀而非增进长期复合增长，这是风险厌恶在复利世界中的数学形态。

## 11.5 全期望公式与条件分解

条件概率把"给定部分信息后"的随机性刻画出来，而条件期望 $\mathbb E[X \mid Y]$ 则是一个新的随机变量：它是 $Y$ 的函数，在每个事件 $\{Y = y\}$ 上取值为 $X$ 在该事件上的平均。以 $Y$ 为桥梁把全空间的平均分解为"逐层平均再汇总"，就是全期望公式；把方差作同样的两层分解，就得到全方差公式。这两个公式是处理混合分布、随机和、分层模型与一切"先抽环境、再在环境中抽样"结构的通用工具。本节的严格叙述限于离散与连续情形；对一般 $\sigma$-代数 $\mathcal G$ 的条件期望 $\mathbb E[X \mid \mathcal G]$ 及其塔性质，需要测度论的 Radon–Nikodym 定理作为存在性基础，统一处理放在第 13 章。

**定理 11.16（全期望公式，离散情形）**

设 $X$ 满足 $\mathbb E|X| < \infty$，$Y$ 为离散随机变量，取值于 $\{y_1, y_2, \ldots\}$。则

$$\mathbb E[X] = \mathbb E\big[\mathbb E[X \mid Y]\big] = \sum_{j} \mathbb E[X \mid Y = y_j]\;\mathbb P(Y = y_j), \tag{11.17}$$

其中右端的级数绝对收敛，且求和只需遍历 $\mathbb P(Y = y_j) > 0$ 的那些 $j$。

**证明**

第一步，说明 $\mathbb E[X \mid Y]$ 作为随机变量的含义。对每个 $\mathbb P(Y = y_j) > 0$ 的 $j$，条件期望 $\mathbb E[X \mid Y = y_j]$ 按定义是

$$\mathbb E[X \mid Y = y_j] = \sum_{i} x_i\, \mathbb P(X = x_i \mid Y = y_j)$$

（对一般的 $X$，该式理解为对条件分布的 Lebesgue 积分，绝对可积性由下面的估计保证）。定义随机变量 $Z(\omega) = \mathbb E[X \mid Y = Y(\omega)]$，即 $Z$ 在事件 $\{Y = y_j\}$ 上取常数值 $\mathbb E[X \mid Y = y_j]$；这就是 $\mathbb E[X \mid Y]$。

第二步，验证可积性并交换求和次序。由条件概率的定义 $\mathbb P(X = x_i, Y = y_j) = \mathbb P(X = x_i \mid Y = y_j)\,\mathbb P(Y = y_j)$，得

$$\sum_j \big|\mathbb E[X \mid Y = y_j]\big|\,\mathbb P(Y = y_j) \le \sum_j \sum_i |x_i|\,\mathbb P(X = x_i \mid Y = y_j)\,\mathbb P(Y = y_j) = \sum_j \sum_i |x_i|\,\mathbb P(X = x_i, Y = y_j).$$

右端对 $j$ 求和后化为 $\sum_i |x_i|\,\mathbb P(X = x_i) = \mathbb E|X| < \infty$。由于双重级数的项取绝对值后求和有限，重排定理允许我们任意交换求和次序而不改变和的值。

第三步，完成计算：

$$\mathbb E[Z] = \sum_j \mathbb E[X \mid Y = y_j]\,\mathbb P(Y = y_j) = \sum_j \sum_i x_i\,\mathbb P(X = x_i \mid Y = y_j)\,\mathbb P(Y = y_j) = \sum_j \sum_i x_i\,\mathbb P(X = x_i, Y = y_j) = \sum_i x_i\,\mathbb P(X = x_i) = \mathbb E[X].$$

第二个等号用条件概率定义，第三个等号用绝对收敛交换次序，第四个等号对 $j$ 求和得边缘概率。这就证明了式（11.17）。

□

连续情形的叙述与证明完全平行：设 $(X, Y)$ 有联合密度 $f(x,y)$，$Y$ 的边缘密度为 $f_Y(y)$，则条件密度 $f_{X|Y}(x|y) = f(x,y)/f_Y(y)$（在 $f_Y(y) > 0$ 处），条件期望 $\mathbb E[X \mid Y = y] = \int x\, f_{X|Y}(x|y)\,dx$，全期望公式变为

$$\mathbb E[X] = \int \mathbb E[X \mid Y = y]\, f_Y(y)\, dy = \mathbb E\big[\mathbb E[X \mid Y]\big],$$

证明同样是把 $\int\!\!\int x f(x,y)\,dx\,dy$ 按两种次序化为累次积分，正当性由 $\mathbb E|X| < \infty$ 与 Fubini 定理保证。混合情形（$Y$ 有离散与连续成分）把求和与积分并作对 $Y$ 分布的 Lebesgue–Stieltjes 积分即可。对一般 $\sigma$-代数 $\mathcal G$ 的条件期望，全期望公式即塔性质 $\mathbb E[\mathbb E[X \mid \mathcal G]] = \mathbb E[X]$，其存在性与证明见第 13 章。

**定理 11.17（全方差公式）**

设 $\mathbb E[X^2] < \infty$，$Y$ 为任意随机变量。记 $\mu(Y) = \mathbb E[X \mid Y]$。则

$$\operatorname{Var}(X) = \mathbb E\big[\operatorname{Var}(X \mid Y)\big] + \operatorname{Var}\big(\mathbb E[X \mid Y]\big). \tag{11.18}$$

即总方差分解为"层内方差的平均"与"层间均值的方差"两部分。

**证明**

由 $\mathbb E[X^2] < \infty$ 与定理 11.16 的证明中同样的可积性论证，$\mathbb E[\mu(Y)^2] < \infty$ 且一切期望均有限，可自由使用期望的线性性。条件方差的定义是 $\operatorname{Var}(X \mid Y) = \mathbb E[X^2 \mid Y] - \mu(Y)^2$。对第一项用定理 11.16：

$$\mathbb E\big[\operatorname{Var}(X \mid Y)\big] = \mathbb E\big[\mathbb E[X^2 \mid Y]\big] - \mathbb E\big[\mu(Y)^2\big] = \mathbb E[X^2] - \mathbb E\big[\mu(Y)^2\big].$$

对第二项，先由定理 11.16 得 $\mathbb E[\mu(Y)] = \mathbb E[\mathbb E[X \mid Y]] = \mathbb E[X]$，于是

$$\operatorname{Var}\big(\mu(Y)\big) = \mathbb E\big[\mu(Y)^2\big] - \big(\mathbb E[\mu(Y)]\big)^2 = \mathbb E\big[\mu(Y)^2\big] - \big(\mathbb E[X]\big)^2.$$

两式相加，中间项 $\mathbb E[\mu(Y)^2]$ 恰好抵消：

$$\mathbb E\big[\operatorname{Var}(X \mid Y)\big] + \operatorname{Var}\big(\mu(Y)\big) = \mathbb E[X^2] - \big(\mathbb E[X]\big)^2 = \operatorname{Var}(X).$$

这就是式（11.18）。

□

注记　全方差公式有一个直观的概率解释：把 $X$ 的波动分解为"知道了 $Y$ 之后仍然剩下的波动"（第一项，层内噪声）与"由 $Y$ 的取值不同所解释的波动"（第二项，层间差异）。由于两项均非负，立刻得到 $\operatorname{Var}(\mathbb E[X \mid Y]) \le \operatorname{Var}(X)$——条件化永远不会增加方差；这一事实是第 14 章最小二乘投影（$\mathbb E[X \mid Y]$ 是 $X$ 在 $Y$ 的可测函数空间中的投影）与方差分解分析（$R^2$ 的定义）的核心。

**推论 11.18（Wald 等式：随机和的均值与方差）**

设 $X_1, X_2, \ldots$ 独立同分布，$\mathbb E[X_1^2] < \infty$；$N$ 为非负整数值随机变量，与序列 $\{X_i\}$ 独立；令 $S_N = \sum_{i=1}^{N} X_i$（$N = 0$ 时 $S_N = 0$）。则

$$\mathbb E[S_N] = \mathbb E[N]\,\mathbb E[X_1], \tag{11.19}$$

$$\operatorname{Var}(S_N) = \mathbb E[N]\,\operatorname{Var}(X_1) + \operatorname{Var}(N)\,\big(\mathbb E[X_1]\big)^2. \tag{11.20}$$

**证明**

以 $Y = N$ 为条件变量。因 $N$ 与 $\{X_i\}$ 独立，在事件 $\{N = n\}$ 上 $S_N$ 就是 $n$ 个独立同分布变量之和，故由期望与方差对独立和的可加性：

$$\mathbb E[S_N \mid N = n] = n\,\mathbb E[X_1], \qquad \operatorname{Var}(S_N \mid N = n) = n\,\operatorname{Var}(X_1),$$

即作为随机变量，$\mu(N) = \mathbb E[S_N \mid N] = N\,\mathbb E[X_1]$，$\operatorname{Var}(S_N \mid N) = N\,\operatorname{Var}(X_1)$。对均值应用定理 11.16：

$$\mathbb E[S_N] = \mathbb E\big[N\,\mathbb E[X_1]\big] = \mathbb E[N]\,\mathbb E[X_1],$$

此即式（11.19）。对方差应用定理 11.17：

$$\operatorname{Var}(S_N) = \mathbb E\big[N \operatorname{Var}(X_1)\big] + \operatorname{Var}\big(N\,\mathbb E[X_1]\big) = \mathbb E[N]\operatorname{Var}(X_1) + \big(\mathbb E[X_1]\big)^2 \operatorname{Var}(N),$$

其中第二项用了常数倍方差公式 $\operatorname{Var}(cN) = c^2\operatorname{Var}(N)$。式（11.20）得证。

□

注记　式（11.20）的两项结构值得体会：即使每笔 $X_i$ 完全无波动（$\operatorname{Var}(X_1) = 0$），只要笔数 $N$ 随机，总和仍有方差 $\operatorname{Var}(N)\,(\mathbb E X_1)^2$；反之，即使 $N$ 确定，每笔的波动也会累积出 $\mathbb E[N]\operatorname{Var}(X_1)$。一般情形下，若 $N$ 只要求是关于 $\{X_i\}$ 的停时而非与序列独立，均值公式（11.19）仍然成立（Wald 等式的停时版本），但方差公式需附加修正项；停时的处理属于第 18 章鞅论的内容。

**例 11.7**

（甲）设资产收益率 $R$ 服从两状态混合模型：市场状态 $Y$ 以概率 $p$ 为牛市、以概率 $1-p$ 为熊市；牛市时 $R \sim N(\mu_1, \sigma_1^2)$，熊市时 $R \sim N(\mu_2, \sigma_2^2)$。用全期望与全方差公式求 $\mathbb E[R]$ 与 $\operatorname{Var}(R)$，并说明混合分布的方差为何大于各状态方差的加权平均。（乙）设保险索赔次数 $N \sim \operatorname{Poisson}(\lambda)$，各次索赔额 $X_i$ 独立同分布，均值 $m$、方差 $v$，且 $\{X_i\}$ 与 $N$ 独立，总索赔额 $S = \sum_{i=1}^N X_i$。求 $\mathbb E[S]$ 与 $\operatorname{Var}(S)$。

**解**

（甲）以 $Y$ 为条件变量。条件矩可以直接读出：

$$\mathbb E[R \mid Y = \text{牛}] = \mu_1, \quad \mathbb E[R \mid Y = \text{熊}] = \mu_2, \quad \operatorname{Var}(R \mid Y = \text{牛}) = \sigma_1^2, \quad \operatorname{Var}(R \mid Y = \text{熊}) = \sigma_2^2.$$

由定理 11.16，

$$\mathbb E[R] = p\mu_1 + (1-p)\mu_2 =: \bar\mu.$$

由定理 11.17，总方差分解为层内与层间两项：

$$\operatorname{Var}(R) = \underbrace{\big[p\sigma_1^2 + (1-p)\sigma_2^2\big]}_{\mathbb E[\operatorname{Var}(R \mid Y)]} + \underbrace{\big[p(\mu_1 - \bar\mu)^2 + (1-p)(\mu_2 - \bar\mu)^2\big]}_{\operatorname{Var}(\mathbb E[R \mid Y])}.$$

第二项是两点分布 $\mu(Y)$ 的方差，代入 $\bar\mu$ 化简：$\mu_1 - \bar\mu = (1-p)(\mu_1 - \mu_2)$，$\mu_2 - \bar\mu = -p(\mu_1 - \mu_2)$，于是

$$\operatorname{Var}\big(\mathbb E[R \mid Y]\big) = p(1-p)^2(\mu_1-\mu_2)^2 + (1-p)p^2(\mu_1-\mu_2)^2 = p(1-p)(\mu_1 - \mu_2)^2.$$

所以

$$\operatorname{Var}(R) = p\sigma_1^2 + (1-p)\sigma_2^2 + p(1-p)(\mu_1-\mu_2)^2.$$

由于 $p(1-p)(\mu_1-\mu_2)^2 \ge 0$，混合分布的方差总是不小于各状态方差的加权平均，且只要两个状态的均值不同（$\mu_1 \ne \mu_2$）并确有切换（$0 < p < 1$），不等号严格成立。金融解释是：状态切换本身注入了一层额外的不确定性——即使牛熊两市各自的波动都不大，"不知道处在哪个市"就足以让无条件收益呈现厚尾甚至双峰形态。这解释了为什么用单一正态分布拟合跨越市场状态的收益样本，往往会低估尾部风险：混合正态不是正态，其峰度大于三，式（11.12）这类仅依赖方差的不等式虽然仍然成立，但真实尾概率与正态假设下的计算结果可能相差悬殊。

（乙）这是推论 11.18 的直接应用。这里 $\mathbb E[N] = \operatorname{Var}(N) = \lambda$（Poisson 分布的均值与方差相同），$\mathbb E[X_1] = m$，$\operatorname{Var}(X_1) = v$。由式（11.19），

$$\mathbb E[S] = \mathbb E[N]\,\mathbb E[X_1] = \lambda m.$$

由式（11.20），

$$\operatorname{Var}(S) = \mathbb E[N]\operatorname{Var}(X_1) + \operatorname{Var}(N)\big(\mathbb E[X_1]\big)^2 = \lambda v + \lambda m^2 = \lambda\big(v + m^2\big) = \lambda\,\mathbb E[X_1^2],$$

最后一步用了 $\mathbb E[X_1^2] = v + m^2$。这一模型称为复合 Poisson 模型，是保险精算与操作风险度量的基础。值得注意的是方差的两个组成部分：$\lambda v$ 来自单次索赔额的波动，$\lambda m^2$ 来自索赔次数的随机性；当索赔额几乎确定（$v \approx 0$）而次数波动主导时，$\operatorname{Var}(S) \approx \lambda m^2$，即风险几乎全部由计数过程贡献。此外可以顺带写出 $S$ 的矩生成函数：由全期望公式与独立性，$\mathbb E[e^{tS}] = \mathbb E\big[\mathbb E[e^{tS} \mid N]\big] = \mathbb E\big[M_X(t)^N\big] = M_N(\ln M_X(t)) = \exp\{\lambda(M_X(t) - 1)\}$，这既是第 11.3 节矩生成函数方法处理随机和的示范，也说明 $S$ 的分布由 $X_1$ 的分布与 $\lambda$ 完全确定。

## 11.6 量化研究中的矩与不等式

现代资产组合理论把每项资产压缩成两个数字：期望收益 $\mu$ 与收益方差 $\sigma^2$，并在此"均值—方差"平面上求解有效前沿。这一框架的矩论依据可以精确陈述：当联合收益服从多元正态分布时，全部信息都在一二阶矩中，高阶矩不携带任何额外内容，均值—方差刻画是充分的；或者，当投资者的效用函数是二次的时，期望效用 $\mathbb E[u(R)]$ 只通过 $\mathbb E[R]$ 与 $\mathbb E[R^2]$ 依赖于分布，同样只需两个矩。把期望效用围绕均值作 Taylor 展开还能看到偏离充分性的代价：$\mathbb E[u(R)] \approx u(\mu) + \tfrac12 u''(\mu)\sigma^2 + \tfrac16 u'''(\mu)\mu_3 + \tfrac{1}{24}u^{(4)}(\mu)\mu_4$，三阶矩 $\mu_3$（偏度）与四阶矩 $\mu_4$（峰度）进入修正项。现实收益既不联合正态，投资者偏好也不恰好二次，因此当偏度显著非零（收益分布左偏，崩盘尾比上涨尾厚）或峰度显著大于三时，只比较均值与方差的两基金分离会给出误导性排序：两个均值方差全同的组合，左偏厚尾者的破产概率可以远高。这就是 11.2 节引入偏度与峰度的实践动机，也是"矩描述到几阶才够"成为实证资产定价持久争论的原因。

夏普比率是均值—方差框架最凝练的矩统计量。设组合超额收益为 $R - r_f$，其夏普比率定义为

$$\operatorname{SR} = \frac{\mathbb E[R] - r_f}{\sqrt{\operatorname{Var}(R)}}. \tag{11.21}$$

它的矩基础是：对均值—方差有效前沿上的组合，效用最大化的配置权重与超额均值成正比、与方差成反比，而式（11.21）恰是这条最优配置线的斜率——每承担一单位波动所换取的期望超额收益。夏普比率的深刻之处还在于它与效用近似的关系：由上面的 Taylor 展开，在收益接近正态的前提下，最大化 $\mathbb E[u(W)]$ 近似等价于最大化 $(\mu - r_f) - \tfrac{\gamma}{2}\sigma^2$（$\gamma$ 为相对风险厌恶系数），其无约束最优解正比于夏普比率。但式（11.21）同样继承了均值—方差框架的全部局限：它假设风险就是方差，从而对上行波动与下行波动一视同仁，对分布形状不敏感；两个夏普比率相同的策略，一个可能是光滑的正态型，另一个可能是"经常小赚、偶尔巨亏"的卖出尾部期权型，后者的真实风险远高于前者所显示的水平。

在参数模型中，矩与分布形状的耦合可以完全算清。对数正态模型假设对数收益 $\ln(1+R) \sim N(\mu, \sigma^2)$，这是 Black–Scholes 框架下几何布朗运动在固定期限上的分布。由矩生成函数（定理 11.3 与式（11.6）），对一切实数 $k$，

$$\mathbb E\big[(1+R)^k\big] = \mathbb E\big[e^{k \ln(1+R)}\big] = M_{\ln(1+R)}(k) = e^{k\mu + k^2\sigma^2/2},$$

取 $k = 1, 2, 3, 4$ 便得到全部低阶矩，进而偏度与峰度都是 $\sigma$ 的显式函数——例 11.8 将完整推导。这一模型定性上捕捉了收益右偏与尖峰厚尾的特征，但它的矩全部有限、尾部按 $e^{-(\ln x)^2}$ 速度衰减，比实证的幂律尾衰减更快，因此对极端事件的刻画仍然不足。

厚尾是矩方法真正的失效边界。若收益尾部服从幂律 $\mathbb P(|R| > x) \sim C x^{-\alpha}$，则 $\alpha \le 2$ 时方差发散、$\alpha \le 1$ 时期望发散、$\alpha \le 4$ 时峰度发散；对 $\alpha \in (0,2)$ 的稳定分布（如柯西分布，$\alpha = 1$），矩生成函数在任意 $t \ne 0$ 处都是无穷，Chernoff 方法整体失效，样本均值不再以 $1/\sqrt n$ 速率集中，样本方差甚至不收敛。此时"均值—方差"的语言本身失去意义：方差无限大的分布不能用 $\sigma$ 度量风险，Chebyshev 与 Hoeffding 型界或为空或不可用。实证研究表明日频收益的尾指数 $\alpha$ 常落在 $3$ 到 $5$ 之间，即方差存在但四阶矩接近或已经发散——这恰好处于矩方法的灰色地带：低阶矩尚可估计但样本矩的抽样误差巨大，峰度的样本估计几乎不收敛。对这种情形，量化实践转向分位数类工具（VaR、期望损失 ES）与极值理论，其数学基础是弱收敛与正则变化函数，见第 24 章与第 31 章。

概率不等式在回测分析中提供的是分布无关的样本误差控制。设策略日收益有界于 $[a, b]$，样本均值 $\bar R_n$ 估计真实均值 $\mu$，由定理 11.15 的双侧形式，

$$\mathbb P\big(|\bar R_n - \mu| \ge \delta\big) \le 2\exp\left(-\frac{2n\delta^2}{(b-a)^2}\right),$$

反解即得：要以置信水平 $1-\eta$ 保证估计误差不超过 $\delta$，样本量需满足 $n \ge (b-a)^2\ln(2/\eta)/(2\delta^2)$。这一"$1/\delta^2$ 加对数置信"的样本复杂度与分布细节无关，因此对模型误设稳健。回测显著性检验中的多重比较问题同样可以用 Chernoff 型界处理：若同时检验 $m$ 个策略，每个假策略的样本夏普超过阈值 $s$ 的概率由式（11.13）控制为 $e^{-\Lambda^*(s)}$，则由联合界，至少一个假策略"显著"的概率不超过 $m e^{-\Lambda^*(s)}$；要让这一族错误率控制在 $\eta$ 以下，阈值必须随 $\ln m$ 抬升——这就是回测过拟合调整（如 deflated Sharpe ratio）背后的浓度不等式思想。Chernoff 界以指数速率压制假阳性，Hoeffding 界给出有限的、非渐近的样本量要求，两者共同构成"回测结果有多少是运气"这一问题的定量回答框架。

尾部风险与矩之间存在原则性的紧张关系。矩是全局积分量：$\mathbb E[X^k]$ 对整个分布加权平均，任何有限阶矩都无法区分"尾部温和"与"尾部灾难性但概率极小"两种情形——给定任意有限个矩，仍存在尾部行为迥异的分布与之匹配（矩问题不确定的经典例子见 11.3 节注记）。因此仅凭有限阶矩构造的风险度量必然对尾部低估；反过来，VaR 与 ES 只盯住尾部而丢弃分布主体信息。成熟的量化风控体系两者并用：用矩刻画常态波动，用分位数与极值工具刻画尾部，用压力测试覆盖两者都无法外推的结构性断裂。最后，特征函数在本章是识别分布与证明收敛的工具，在定价中还有更直接的用途：当收益分布的密度无闭式而特征函数有闭式时（Heston 随机波动率模型、Merton 跳跃扩散模型、稳定分布模型皆如此），期权价格可以通过 Fourier 反演直接从特征函数算出，绕开密度函数这一中间环节；这一 Fourier 定价方法的完整展开见第 26 章，其在利率与信用衍生品中的推广见第 33 章。

**例 11.8**

设对数收益 $\ln(1+R) \sim N(\mu, \sigma^2)$。求 $R$ 的期望、方差、偏度与超额峰度（用 $\mu, \sigma$ 显式表示），并解释算术平均收益高于几何平均收益的原因。

**解**

记 $G = 1 + R = e^{Y}$，其中 $Y \sim N(\mu,\sigma^2)$。由正态矩生成函数 $M_Y(k) = e^{k\mu + k^2\sigma^2/2}$，对任意实数 $k$，

$$\mathbb E[G^k] = \mathbb E[e^{kY}] = e^{k\mu + k^2\sigma^2/2}. \tag{11.22}$$

**期望。** 取 $k = 1$：

$$\mathbb E[R] = \mathbb E[G] - 1 = e^{\mu + \sigma^2/2} - 1.$$

几何平均意义下的平均收益因子为 $\exp(\mathbb E[\ln G]) = e^{\mu}$，而算术平均收益因子为 $\mathbb E[G] = e^{\mu + \sigma^2/2}$，两者之比是 $e^{\sigma^2/2} > 1$（$\sigma > 0$ 时）。算术均值高于几何均值的原因有二重解释。分布层面：$x \mapsto e^x$ 是严格凸函数，由 Jensen 不等式（定理 11.13）$\mathbb E[e^Y] > e^{\mathbb E[Y]}$，凸性把 $Y$ 的波动向上转化为 $G$ 的均值抬升；直观地说，$Y$ 上行 $+\sigma$ 带来的乘数 $e^{\sigma}$ 大于下行 $-\sigma$ 带来的乘数 $e^{-\sigma}$ 的损失幅度（$e^\sigma - 1 > 1 - e^{-\sigma}$），波动对复利因子的正贡献压过负贡献。效用层面：这正是例 11.6 证明的 $\mathbb E[\log X] \le \log \mathbb E[X]$ 取严格不等号的情形，差距恰为 $\sigma^2/2$，即"方差拖累"在对数正态模型下有精确闭式。

**方差。** 由式（11.22）取 $k = 2$：$\mathbb E[G^2] = e^{2\mu + 2\sigma^2}$。于是

$$\operatorname{Var}(R) = \operatorname{Var}(G) = \mathbb E[G^2] - \mathbb E[G]^2 = e^{2\mu + 2\sigma^2} - e^{2\mu + \sigma^2} = e^{2\mu+\sigma^2}\big(e^{\sigma^2} - 1\big). \tag{11.23}$$

**偏度与峰度。** 记 $m = \mathbb E[G] = e^{\mu+\sigma^2/2}$，$W = e^{\sigma^2}$，则由式（11.22），$\mathbb E[G^k] = m^k W^{k(k-1)/2}$，特别地 $\mathbb E[G^2] = m^2 W$、$\mathbb E[G^3] = m^3 W^3$、$\mathbb E[G^4] = m^4 W^6$。三阶中心矩展开为

$$\mu_3 = \mathbb E[(G-m)^3] = \mathbb E[G^3] - 3m\mathbb E[G^2] + 3m^2\mathbb E[G] - m^3 = m^3(W^3 - 3W + 2).$$

因式分解 $W^3 - 3W + 2 = (W-1)^2(W+2)$，且二阶中心矩 $\mu_2 = \operatorname{Var}(G) = m^2(W-1)$，故偏度

$$\gamma_1 = \frac{\mu_3}{\mu_2^{3/2}} = \frac{m^3(W-1)^2(W+2)}{m^3(W-1)^{3/2}} = (W+2)\sqrt{W-1} = \big(e^{\sigma^2}+2\big)\sqrt{e^{\sigma^2}-1}. \tag{11.24}$$

四阶中心矩展开为

$$\mu_4 = \mathbb E[G^4] - 4m\mathbb E[G^3] + 6m^2\mathbb E[G^2] - 3m^4 = m^4(W^6 - 4W^3 + 6W - 3),$$

而 $(W^4 + 2W^3 + 3W^2 - 3)(W-1)^2 = W^6 - 4W^3 + 6W - 3$（逐项展开验证），故超额峰度

$$\gamma_2 = \frac{\mu_4}{\mu_2^2} - 3 = W^4 + 2W^3 + 3W^2 - 6 = e^{4\sigma^2} + 2e^{3\sigma^2} + 3e^{2\sigma^2} - 6.$$

**数值感受与结论。** 取年化 $\sigma = 0.20$：$W = e^{0.04} \approx 1.0408$，$\gamma_1 \approx (3.0408)(0.2020) \approx 0.614$，$\gamma_2 \approx 0.168$——偏度为正但不算极端。取 $\sigma = 0.50$：$W = e^{0.25} \approx 1.2840$，$\gamma_1 \approx 1.47$，$\gamma_2 \approx 1.31$，右偏与厚尾都显著。三点观察：其一，对数正态收益的偏度恒正（$W > 1$），峰度恒大于零，定性上复现了"上涨尾长、暴跌尾短"的复利效应，与股票收益实证的左偏特征方向相反——这是该模型用于长期（多年期）收益合理、用于短期（日频）收益不合理的根源之一，短期收益的左偏需要跳跃或随机波动率模型（第 26 章）来刻画。其二，$\gamma_1, \gamma_2$ 只依赖 $\sigma$ 而与 $\mu$ 无关：波动率同时控制分布的全部形状特征。其三，$\sigma \to \infty$ 时 $\gamma_2 \sim e^{4\sigma^2}$ 爆炸式增长，说明对数正态家族内部也能产生任意重的峰度，但其所有矩仍有限——峰度大不等于矩不存在，真正的矩失效只发生在幂律尾（$\alpha \le 4$）情形，这正是上一段所述灰色地带的分界。

## 本章小结

本章从测度论积分的初等形式出发，建立了随机变量数字特征的完整体系。期望被定义为对分布的加权平均，其线性性（定理 11.3）是全书使用频率最高的性质；单调收敛与支配收敛两条极限定理保证了"极限与期望可交换"的严格条件，使期望能够处理无穷级数与极限过程。方差刻画分布围绕均值的离散程度，协方差与相关系数把两个变量的线性联动纳入同一框架；偏度与峰度作为标准化后的三阶、四阶中心矩，进一步刻画分布的不对称性与尾部厚度，构成对正态偏离的两级度量。矩生成函数与特征函数把全部矩编码进一个解析对象：矩生成函数在收敛域内唯一决定分布并允许通过求导取矩，特征函数则对一切分布存在、同样唯一决定分布，并以逐点收敛刻画依分布收敛——Lévy 连续性定理把分析性质与概率收敛焊接起来，是中心极限定理证明的引擎。

概率不等式展示了"矩信息换尾部控制"的兑换率。Markov 不等式用一阶矩给出最粗糙的界，其"非负变量、事件上从下方控制、除以阈值"的证明骨架贯穿全部后续结果；Chebyshev 不等式通过平方变换动用二阶矩，得到 $\varepsilon^{-2}$ 的多项式尾界，且该速率在只知均值方差时不可改进；Chernoff 界通过指数变换 $e^{tX}$ 一次性动员全部矩，把衰减提升为指数速率 $e^{-\Lambda^*(a)}$，速率函数恰是对数矩母函数 $\Lambda$ 的 Legendre 变换，凸对偶结构在此首次显形，并将延伸至第 27 章的大偏差理论。Jensen 不等式刻画非线性函数与期望不可交换的方向，其支撑超平面证明把凸几何转化为期望不等式，是风险厌恶、方差拖累与复合增长分析的数学根源；Cauchy–Schwarz 不等式确立 $L^2$ 空间的内积几何，给出相关系数有界与投影理论的起点；Hoeffding 不等式把 Hoeffding 引理与 Chernoff 方法组合，为独立有界变量之和提供分布无关的指数集中界，是回测误差控制与统计学习理论的基本工具。

全期望公式与全方差公式给出条件分解的两层结构：总均值是条件均值的平均，总方差是层内方差的平均加层间均值的方差。Wald 等式作为其直接推论，把随机和的矩化为计数变量与单项变量的矩的组合，覆盖保险索赔、订单流与交易成本建模等应用。条件期望在一般 $\sigma$-代数下的严格理论、塔性质与停时版本的 Wald 等式分别在第 13 章与第 18 章展开。

最后，11.6 节把全部工具接入量化语境：均值—方差框架的充分性条件与其在偏度峰度显著时的失效、夏普比率的最优配置解释与形状盲区、对数正态收益的矩闭式、幂律厚尾导致的矩方法整体崩溃、浓度不等式给出的回测样本复杂度与多重检验阈值、以及特征函数通往 Fourier 定价的路线。贯穿全章的信息是：矩是分布的压缩表示，不等式是压缩损失的保险条款；知道一个模型"只用到了分布的哪些信息"，才知道它的结论在什么地方会失灵。

## 习题

1. 设离散随机变量 $X$ 以概率 $1/6$、$1/3$、$1/4$、$1/4$ 取值 $-2, 0, 1, 3$。计算 $\mathbb E[X]$、$\mathbb E[X^2]$、$\operatorname{Var}(X)$，并验证 $\operatorname{Var}(X) = \mathbb E[X^2] - (\mathbb E[X])^2$。

2. 设 $X$ 在 $[1, 3]$ 上服从均匀分布。计算 $\mathbb E[1/X]$ 并与 $1/\mathbb E[X]$ 比较大小，用 Jensen 不等式解释你得到的不等方向。

3. 设 $X \sim N(0,1)$。用分部积分证明矩递推公式 $\mathbb E[X^{2k}] = (2k-1)\,\mathbb E[X^{2k-2}]$（$k \ge 1$），并由 $\mathbb E[X^0] = 1$ 出发计算 $\mathbb E[X^6]$，同时说明为何一切奇数阶矩为零。

4. 设 $X \sim \operatorname{Poisson}(\lambda)$。证明矩递推公式 $\mathbb E[X^{k+1}] = \lambda\,\mathbb E[(X+1)^k]$（提示：从 $\mathbb E[X^{k+1}] = \sum_{x} x^{k+1} e^{-\lambda}\lambda^x/x!$ 出发，提取一个因子 $\lambda$ 并作指标平移），并用它依次计算 $\mathbb E[X^2]$ 与 $\mathbb E[X^3]$。

5. 某随机变量的矩生成函数为 $M(t) = (1-2t)^{-3/2}$（$t < 1/2$）。通过对数求导或级数展开计算 $\mathbb E[X]$ 与 $\operatorname{Var}(X)$，并指出 $X$ 服从什么分布（提示：与卡方分布的矩生成函数对照）。

6. 设 $X_1, \ldots, X_n$ 独立，$X_i \sim \operatorname{Poisson}(\lambda_i)$。用矩生成函数证明 $S = \sum_i X_i \sim \operatorname{Poisson}\big(\sum_i \lambda_i\big)$；再用特征函数对 $X_i \sim N(\mu_i, \sigma_i^2)$ 的情形重做一遍，比较两种变换在"独立和识别"问题上的等价性。

7. 设非负随机变量 $X$ 满足 $\mathbb E[X] = 1$、$\mathbb E[X^2] = 4$。分别用 Markov 不等式、二阶矩形式的 Markov 不等式（$\mathbb P(X \ge a) \le \mathbb E[X^2]/a^2$）与 Chebyshev 不等式估计 $\mathbb P(X \ge 3)$，并指出哪一个界最紧、为什么。

8. 设 $X_1, \ldots, X_n$ 独立同分布，$\mathbb E[X_1] = \mu$、$\operatorname{Var}(X_1) = \sigma^2$，$\bar X_n$ 为样本均值。用 Chebyshev 不等式求最小的 $n$，使 $\mathbb P(|\bar X_n - \mu| \ge 0.1\sigma) \le 0.01$；再把偏差水平改为 $0.01\sigma$，观察所需样本量如何随精度平方增长。

9. 设 $X \sim \operatorname{Exp}(\lambda)$，密度为 $\lambda e^{-\lambda x}$（$x \ge 0$）。对 $0 < t < \lambda$ 求 $M_X(t)$，用 Chernoff 界导出 $\mathbb P(X \ge a) \le \inf_{t>0} e^{-ta}M_X(t)$ 的闭式（注意最优 $t^*$ 满足 $\Lambda'(t^*) = a$），并与 Chebyshev 界 $\mathbb E[X^2]/a^2 = 2/(\lambda^2 a^2)$ 在 $\lambda = 1$、$a = 5$ 处作数值比较，同时给出精确值 $e^{-a}$。

10. 设 $a_1, \ldots, a_n > 0$，$p_1, \ldots, p_n \ge 0$ 且 $\sum_i p_i = 1$。构造合适的随机变量并应用 Jensen 不等式（定理 11.13），证明加权算术—几何平均不等式 $\prod_i a_i^{p_i} \le \sum_i p_i a_i$，并写出取等条件。
11. 设 $\mathbb E[X^2] < \infty$、$\mathbb E[Y^2] < \infty$。不直接引用命题 11.14，而是从 $\mathbb E[(\lambda X + Y)^2] \ge 0$ 出发独立证明 $|\operatorname{Cov}(X,Y)| \le \sigma_X \sigma_Y$，从而相关系数 $\rho_{XY} \in [-1,1]$；并证明 $|\rho_{XY}| = 1$ 当且仅当存在常数 $\alpha, \beta, \gamma$（$\alpha^2+\beta^2>0$）使 $\alpha X + \beta Y = \gamma$ 几乎必然。

12. 设 $X \ge 0$ 且 $\mathbb E[X^2] < \infty$。用 Cauchy–Schwarz 不等式（命题 11.14）证明 $\mathbb E[X] \le \sqrt{\mathbb E[X^2]}$，再证明更强的 Paley–Zygmund 型下界：对任意 $0 < \theta < 1$，

$$\mathbb P(X > \theta\,\mathbb E[X]) \ge (1-\theta)^2\,\frac{(\mathbb E[X])^2}{\mathbb E[X^2]}$$

（提示：把 $\mathbb E[X]$ 拆成 $\{X > \theta \mathbb E[X]\}$ 与其补集上的两部分，对第一部分的 $\mathbb E[X\mathbf 1_A]$ 用 Cauchy–Schwarz）。

13. 抛一枚质地均匀的硬币 $n$ 次，$\hat p$ 为正面频率。用 Hoeffding 不等式（定理 11.15，注意每次结果有界于 $[0,1]$）求最小的 $n$，使 $\mathbb P(|\hat p - 1/2| \ge 0.05) \le 0.01$；再用 Chebyshev 不等式求同样精度下的 $n$，比较两个样本量的差距并解释原因。

14. 某工厂有两台机器，以概率 $2/3$ 选中机器 A、以概率 $1/3$ 选中机器 B；机器 A 的日产量服从均值 $100$、方差 $25$ 的正态分布，机器 B 服从均值 $80$、方差 $36$ 的正态分布。用全期望公式（定理 11.16）求日产量的期望，并写出日产量分布的密度表达式。

15. 接第 14 题。用全方差公式（定理 11.17）求日产量的方差，指出层内方差与层间方差各占多少，并说明为何答案大于 $25$ 与 $36$ 的加权平均。

16. 赌徒连续下注，每局净赢 $X_i$ 独立同分布，$\mathbb E[X_1] = 0.1$、$\operatorname{Var}(X_1) = 1$；他计划玩到第一次连输两局为止，总局数 $N$ 与 $\{X_i\}$ 独立，且 $N$ 服从参数 $1/16$ 的几何分布（$\mathbb P(N=k) = (15/16)^{k-1}/16$）。用推论 11.18 求累计净赢 $S_N$ 的期望与方差。

17. 设对数收益 $\ln(1+R) \sim N(0.04, 0.15^2)$。计算算术平均收益 $\mathbb E[R]$、几何平均收益 $e^{\mathbb E[\ln(1+R)]} - 1$、方差 $\operatorname{Var}(R)$，并算出两者的差距与 $\sigma^2/2$ 的关系（对照例 11.8 的方差拖累公式）。

18. 设 $X$ 服从 Pareto 分布，密度 $f(x) = \alpha x^{-\alpha-1}$（$x \ge 1$，$\alpha > 0$）。直接积分计算 $\mathbb E[X]$ 与 $\mathbb E[X^2]$，指出它们分别在什么 $\alpha$ 范围内有限；对 $\alpha = 1.5$ 的情形，说明 Chebyshev 不等式与 Chernoff 界是否可用，并计算尾概率 $\mathbb P(X \ge x)$ 验证其幂律衰减。

19. 组合 A 的收益 $R_A \sim N(0.08, 0.20^2)$，组合 B 是例 11.7（甲）中 $p = 1/2$、$\mu_1 = 0.20$、$\sigma_1 = 0.10$、$\mu_2 = -0.04$、$\sigma_2 = 0.10$ 的混合分布，无风险利率 $r_f = 0.02$。计算两组合的夏普比率（式（11.21））；再用例 11.7 的结果算出 B 的偏度方向，讨论仅凭夏普比率排序两组合可能忽略什么。

20. 设 $X_1, X_2, \ldots$ 独立同分布，$\mathbb E[X_1] = \mu$、$\operatorname{Var}(X_1) = \sigma^2 < \infty$，$\bar X_n = \frac1n\sum_{i=1}^n X_i$。只使用期望的线性性、独立性下方差的可加性与 Chebyshev 不等式（不得使用特征函数或其他高级工具），完整证明弱大数定律：对任意 $\varepsilon > 0$，$\lim_{n\to\infty} \mathbb P(|\bar X_n - \mu| \ge \varepsilon) = 0$；并说明证明的哪一步依赖方差有限这一假设，若方差无限该论证在哪一步断裂。
