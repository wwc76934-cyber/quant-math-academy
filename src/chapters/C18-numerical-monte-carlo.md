# 第18章　数值方法与 Monte Carlo

数值计算研究的不只是“计算机能否给出一个数”，而是这个数与真实数学答案之间有多大差别、误差来自哪里、增加计算预算后是否按预期改善。浮点舍入、问题条件、离散截断和随机抽样是不同来源的误差，不能用同一种方式处理。

本章先讨论浮点与稳定性，再介绍求根、有限差分和数值积分，最后建立 Monte Carlo 的统计误差理论与方差缩减方法。所有误差阶都隐藏了对函数光滑性、网格或样本独立性的假设；大 $O$ 表达式只描述渐近主项，不代替实际误差验证。

## 18.1 浮点误差、条件数与稳定性

### 18.1.1 绝对误差、相对误差与机器精度

设真实值为 $x$，计算值为 $\widehat x$。绝对误差为 $|\widehat x-x|$；当 $x\neq0$ 时，相对误差为 $|\widehat x-x|/|x|$。在二进制浮点系统中，机器精度 $\varepsilon_{\mathrm{mach}}$ 大致描述单位 $1$ 附近相邻浮点数的相对间隔。单次正常舍入通常可写成

$$
\operatorname{fl}(x)=x(1+\delta),
\qquad|\delta|\leq\varepsilon_{\mathrm{mach}},
\tag{18.1}
$$

但整段计算的误差会随运算次数、中间量和算法结构放大。

**定义 18.1（条件数与数值稳定性）**

问题的条件数描述输入微小扰动对精确答案的放大程度。对可微标量函数 $y=f(x)$，在 $x,y\neq0$ 时，相对条件数近似为

$$
\kappa_f(x)=\left|\frac{x f'(x)}{f(x)}\right|.
\tag{18.2}
$$

因为 $|\Delta y|/|y|\approx\kappa_f(x)|\Delta x|/|x|$。条件数是问题本身的性质；数值稳定性则描述某个具体算法引入的额外误差是否受到控制。一个病态问题不能靠更换算法变得良态，但稳定算法能避免不必要的额外放大。

相近数相减会造成有效数字消失。例如 $x>0$ 很小时，直接计算 $\sqrt{1+x}-1$ 要先形成两个都接近 $1$ 的数。恒等变形

$$
\sqrt{1+x}-1=\frac{x}{\sqrt{1+x}+1}
\tag{18.3}
$$

避免了这种灾难性抵消。两种写法在实数中完全等价，在浮点中却可能精度悬殊。

### 18.1.2 线性系统与条件数

设 $\boldsymbol A$ 可逆，$\boldsymbol A\boldsymbol x=\boldsymbol b$，右端扰动为 $\boldsymbol b+\delta\boldsymbol b$，精确解相应变为 $\boldsymbol x+\delta\boldsymbol x$。则 $\boldsymbol A\delta\boldsymbol x=\delta\boldsymbol b$，所以

$$
\|\delta\boldsymbol x\|
\leq\|\boldsymbol A^{-1}\|\|\delta\boldsymbol b\|.
$$

又由 $\|\boldsymbol b\|\leq\|\boldsymbol A\|\|\boldsymbol x\|$，可得

$$
\frac{\|\delta\boldsymbol x\|}{\|\boldsymbol x\|}
\leq\kappa(\boldsymbol A)
\frac{\|\delta\boldsymbol b\|}{\|\boldsymbol b\|},
\qquad
\kappa(\boldsymbol A)=\|\boldsymbol A\|\|\boldsymbol A^{-1}\|.
\tag{18.4}
$$

因此，求解 $\boldsymbol A\boldsymbol x=\boldsymbol b$ 通常应使用 LU、QR 或 Cholesky 等分解，而不是显式计算 $\boldsymbol A^{-1}$ 后相乘。显式求逆增加工作量，也丢失利用矩阵结构控制误差的机会。残差 $\|\boldsymbol A\widehat{\boldsymbol x}-\boldsymbol b\|$ 很小也不必然意味着 $\widehat{\boldsymbol x}$ 接近真解；病态矩阵下还需结合条件数分析。

## 18.2 求根方法

### 18.2.1 二分法：可靠的一维包围

**定理 18.2（二分法误差）**

设 $f$ 在 $[a,b]$ 上连续且 $f(a)f(b)<0$。则区间内至少有一个根。每轮保留符号相异的一半区间，第 $k$ 轮后若取区间中点 $\widehat r_k$ 为近似，则

$$
|\widehat r_k-r|\leq\frac{b-a}{2^{k+1}},
\tag{18.5}
$$

其中 $r$ 为被包围的某个根。

**证明**

连续函数介值定理保证根存在。初始区间长度为 $b-a$，每轮减半。第 $k$ 轮区间长度为 $(b-a)/2^k$，中点到区间内任一根的距离不超过长度的一半，即式（18.5）。

□

要使中点误差不超过 $\eta$，只需

$$
k\geq\log_2\frac{b-a}{2\eta}.
$$

二分法只要求连续和初始异号，不需要导数，且不会漏掉被包围根；代价是线性收敛且通常不直接推广到高维。若 $f(a)f(b)>0$，不能据此断言区间内无根，因为函数可能两次穿越横轴。

### 18.2.2 Newton 与割线法

在近似根 $x_k$ 处作线性化

$$
f(x_k+d)\approx f(x_k)+f'(x_k)d.
$$

令右端为零，得到 Newton 迭代

$$
x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}.
\tag{18.6}
$$

若 $f(r)=0$、$f'(r)\neq0$，且 $f'$ 在根附近 Lipschitz 连续，则从足够接近 $r$ 的点出发，Newton 法局部二次收敛。推导与第17章一致：Taylor 展开中的线性主部被消去，下一步误差为当前误差的平方阶。若根为重根、初值不佳或导数接近零，迭代可能很慢、跳到远处或发散。

割线法用两点差商代替导数：

$$
x_{k+1}=x_k-f(x_k)
\frac{x_k-x_{k-1}}{f(x_k)-f(x_{k-1})}.
\tag{18.7}
$$

在单根和足够光滑等条件下，其局部收敛阶为 $(1+\sqrt5)/2\approx1.618$。它不需要显式导数，但两个函数值接近时会发生分母抵消。

金融中的隐含波动率可写成求根问题：给定模型价格 $V(\sigma)$ 与市场价格 $V_{\mathrm{mkt}}$，求 $V(\sigma)-V_{\mathrm{mkt}}=0$。在标准 Black–Scholes 假设下，普通期权价格通常随 $\sigma$ 严格增加，可先建立合法价格区间，再用二分或带保护的 Newton。若市场报价已违反无套利上下界，数值求解器找不到根并不是迭代公式的问题，而是输入与模型不一致。

**例 18.1**

用 Newton 法求 $f(x)=x^2-2$ 的正根，并写出从 $x_0=1$ 开始的前两步。

**解**

式（18.6）给出

$$
x_{k+1}=x_k-\frac{x_k^2-2}{2x_k}
=\frac12\left(x_k+\frac2{x_k}\right).
$$

所以

$$
x_1=\frac32,\qquad
x_2=\frac12\left(\frac32+\frac43\right)=\frac{17}{12}.
$$

$x_2\approx1.416667$，已接近 $\sqrt2\approx1.414214$。该迭代正是求平方根的 Babylon 方法。

## 18.3 有限差分：截断与舍入的平衡

由 Taylor 公式，

$$
f(x+h)=f(x)+hf'(x)+\frac{h^2}{2}f''(x)+O(h^3),
$$

所以前向差分满足

$$
\frac{f(x+h)-f(x)}h=f'(x)+O(h).
\tag{18.8}
$$

中心差分利用

$$
f(x\pm h)=f(x)\pm hf'(x)+\frac{h^2}{2}f''(x)
\pm\frac{h^3}{6}f'''(x)+O(h^4),
$$

两式相减，偶数阶首项中的 $h^2$ 项抵消，得到

$$
\frac{f(x+h)-f(x-h)}{2h}
=f'(x)+O(h^2).
\tag{18.9}
$$

但 $h$ 并非越小越好。前向差分的总误差可粗略表示为

$$
E(h)\approx C_1h+C_2\frac{\varepsilon_{\mathrm{mach}}}h,
$$

第一项为截断误差，第二项来自函数值舍入后除以 $h$。令两项同阶可得 $h=O(\varepsilon_{\mathrm{mach}}^{1/2})$。中心差分对应

$$
E(h)\approx C_1h^2+C_2\frac{\varepsilon_{\mathrm{mach}}}h,
$$

典型尺度为 $h=O(\varepsilon_{\mathrm{mach}}^{1/3})$。常数还依赖函数导数和函数值尺度，因此这些只是选步长的起点，不是普适固定值。

计算期权 Greeks 时，应通过多个 $h$ 检查估计是否处于截断误差主导的平台区。若差分结果随 $h$ 缩小先稳定、后剧烈抖动，通常意味着已进入舍入误差主导区。若模型价格本身由 Monte Carlo 得到，独立重新抽样的噪声也会进入差分；使用共同随机数可减少部分差分噪声，但同时改变误差结构。

## 18.4 数值积分与误差阶

把 $[a,b]$ 等分为 $n$ 个小区间，$h=(b-a)/n$，节点 $x_i=a+ih$。复合梯形公式为

$$
T_n=h\left[\frac12f(x_0)+f(x_1)+\cdots+f(x_{n-1})
+\frac12f(x_n)\right].
\tag{18.10}
$$

若 $f\in C^2[a,b]$，其误差满足

$$
\int_a^bf(x)dx-T_n
=-\frac{(b-a)h^2}{12}f''(\xi),
\qquad \xi\in(a,b).
\tag{18.11}
$$

因此一般光滑非周期函数的复合梯形误差为 $O(h^2)$。对每个小区间中点使用 Simpson 公式，复合形式在 $n$ 为偶数时为

$$
S_n=\frac h3\left[f(x_0)+f(x_n)
+4\sum_{\text{奇 }i}f(x_i)
+2\sum_{\text{偶 }i,\ 0<i<n}f(x_i)\right].
\tag{18.12}
$$

若 $f\in C^4[a,b]$，复合 Simpson 误差为 $O(h^4)$。Simpson 单个小区间对三次多项式精确，虽然其节点插值只是二次，这是对称节点带来的一次额外精度。

误差阶不表示对不光滑函数仍同样成立。若被积函数存在尖点、间断或端点奇异，应先分段、变量替换或采用专门公式。自适应积分根据局部误差估计细分困难区域，比全局盲目加密更节省计算。维数升高时，若每维使用 $m$ 个节点，张量网格需要 $m^d$ 个点，出现维数灾难；Monte Carlo 的 $N^{-1/2}$ 随机误差阶不显式依赖 $d$，但其方差常数仍可能随问题维度恶化。

**例 18.2**

分别用一区间梯形与 Simpson 公式近似 $\int_0^1x^3dx$，并与真值比较。

**解**

真值为 $1/4$。梯形公式给出

$$
T_1=\frac12[f(0)+f(1)]=\frac12,
$$

误差为 $1/4$。Simpson 公式给出

$$
S_2=\frac{1/2}{3}[f(0)+4f(1/2)+f(1)]
=\frac16\left[0+4\cdot\frac18+1\right]=\frac14,
$$

恰好精确。原因不是三次函数普遍容易，而是 Simpson 公式具有三次代数精度。

## 18.5 Monte Carlo 估计与统计误差

### 18.5.1 无偏性、标准误与置信区间

设 $X_1,\ldots,X_N$ 独立同分布，$\mathbb EX_i=\mu$、$\operatorname{Var}(X_i)=\sigma^2<\infty$。Monte Carlo 估计量

$$
\widehat\mu_N=\frac1N\sum_{i=1}^NX_i
\tag{18.13}
$$

满足 $\mathbb E\widehat\mu_N=\mu$，并且

$$
\operatorname{Var}(\widehat\mu_N)=\frac{\sigma^2}{N},
\qquad
\operatorname{se}(\widehat\mu_N)=\frac\sigma{\sqrt N}.
\tag{18.14}
$$

标准误通常用样本标准差 $\widehat\sigma$ 估计。由中心极限定理，在大样本下可构造近似区间

$$
\widehat\mu_N\pm z_{1-\alpha/2}\frac{\widehat\sigma}{\sqrt N}.
\tag{18.15}
$$

式（18.15）的覆盖保证来自渐近正态，不是任意 $N$ 下的严格区间。若 $X_i$ 重尾、方差极大或分布严重偏斜，正态近似可能在常见样本量下很差；若方差不存在，式（18.14）本身也不适用。

要把标准误缩小为原来的十分之一，样本量需增加一百倍。相对误差则还需除以 $|\mu|$。对概率很小的正事件 $\mu>0$，若使用指示变量 $X=\mathbf1_A$，则 $\sigma^2=\mu(1-\mu)$，相对标准误约为

$$
\frac{\sqrt{\mu(1-\mu)/N}}{\mu}
\approx\frac1{\sqrt{N\mu}}.
$$

若希望看到约 $R$ 次事件发生，需要 $N\mu\approx R$；若 $\mu=10^{-10}$，普通模拟可能需要极多样本才有稳定估计。

### 18.5.2 对偶变量

**命题 18.3（对偶变量的方差）**

设 $(X_i,X_i^a)$ 为 $N$ 对同分布变量，$\mathbb EX_i=\mathbb EX_i^a=\mu$，不同对之间独立。定义

$$
\widehat\mu_N^a=\frac1{2N}\sum_{i=1}^N(X_i+X_i^a).
$$

则其无偏，且

$$
\operatorname{Var}(\widehat\mu_N^a)
=\frac{\operatorname{Var}(X)+\operatorname{Cov}(X,X^a)}{2N}.
\tag{18.16}
$$

证明直接展开每对方差的 $\operatorname{Var}[(X+X^a)/2]$ 即可。与使用 $2N$ 个独立样本的方差 $\operatorname{Var}(X)/(2N)$ 相比，当 $\operatorname{Cov}(X,X^a)<0$ 时方差下降。正态路径中常用 $Z$ 与 $-Z$ 构造对偶样本；若 payoff 关于 $Z$ 单调，则两者通常负相关，但并非所有 payoff 都保证有效。

### 18.5.3 控制变量

设 $Y$ 与 $X$ 联合随机，且 $\mathbb EY$ 已知。对常数 $c$，构造

$$
Z_c=X-c(Y-\mathbb EY).
\tag{18.17}
$$

因为 $\mathbb E[Y-\mathbb EY]=0$，所以 $\mathbb EZ_c=\mu$。其方差为

$$
\operatorname{Var}(Z_c)
=\operatorname{Var}(X)-2c\operatorname{Cov}(X,Y)+c^2\operatorname{Var}(Y).
\tag{18.18}
$$

**命题 18.4（最优控制变量系数）**

当 $\operatorname{Var}(Y)>0$ 时，使式（18.18）最小的系数及最小方差为

$$
c^*=\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)},
\qquad
\operatorname{Var}(Z_{c^*})
=\operatorname{Var}(X)(1-\rho_{XY}^2),
\tag{18.19}
$$

其中 $\rho_{XY}$ 为相关系数。

**证明**

式（18.18）是关于 $c$ 的开口向上二次函数。令导数为零得

$$
-2\operatorname{Cov}(X,Y)+2c\operatorname{Var}(Y)=0,
$$

即 $c^*$。代回并用 $\operatorname{Cov}(X,Y)^2=\rho^2\operatorname{Var}(X)\operatorname{Var}(Y)$ 即得最小方差。

□

实际中 $c^*$ 往往用先导样本估计，再固定用于正式模拟，或用同一批样本估计并承认少量额外估计误差。控制变量不必与目标完全相关；$|\rho|$ 越接近 $1$，方差缩减越明显。若用解析可解的简化衍生品作为复杂衍生品的控制变量，必须确保简化模型的期望确实已知。

### 18.5.4 分层抽样

把样本空间分为互不重叠的层 $S_1,\ldots,S_H$，令 $p_h=\mathbb P(S_h)$。若每层内抽样条件分布正确，则

$$
\mu=\sum_{h=1}^Hp_h\mathbb E[X\mid S_h].
$$

按比例分层估计量为

$$
\widehat\mu_{\mathrm{str}}
=\sum_hp_h\widehat\mu_h,
\tag{18.20}
$$

其中 $\widehat\mu_h$ 是第 $h$ 层的样本均值。若各层样本量固定，则层间估计独立，

$$
\operatorname{Var}(\widehat\mu_{\mathrm{str}})
=\sum_hp_h^2\frac{\sigma_h^2}{N_h},
\qquad
\sigma_h^2=\operatorname{Var}(X\mid S_h).
\tag{18.21}
$$

在总样本量 $N=\sum_hN_h$ 固定时，使式（18.21）最小的整数化前分配为

$$
N_h\propto p_h\sigma_h,
$$

称为 Neyman 分配。比例分配 $N_h=Np_h$ 能消除层间差异造成的抽样波动；若某层方差很大，则偏离比例、给该层更多样本可能更优。

### 18.5.5 重要抽样

设目标为 $\mu=\mathbb E_p[h(X)]$，其中 $p,q$ 为密度。若 $p(x)>0$ 且 $h(x)\neq0$ 时必有 $q(x)>0$，则

$$
\mu=\int h(x)p(x)dx
=\int h(x)\frac{p(x)}{q(x)}q(x)dx
=\mathbb E_q\left[h(X)\frac{p(X)}{q(X)}\right].
\tag{18.22}
$$

因此从 $q$ 抽样并使用权重 $w(X)=p(X)/q(X)$ 可保持无偏。支撑条件不可省略，否则目标分布的某些区域永远无法被建议分布覆盖。

重要抽样的二阶矩为

$$
\mathbb E_q\left[h(X)^2\frac{p(X)^2}{q(X)^2}\right]
=\int h(x)^2\frac{p(x)^2}{q(x)}dx.
\tag{18.23}
$$

若 $h\geq0$，形式上的零方差建议密度为

$$
q^*(x)=\frac{h(x)p(x)}{\mu},
$$

因为此时 $h(x)p(x)/q^*(x)=\mu$ 为常数。但 $q^*$ 的归一化常数正是未知的 $\mu$，所以它主要提供方向：让建议分布集中于 $h(x)p(x)$ 较大的区域，而不是让权重毫无控制地重尾。

以估计 $N$ 次公平独立投掷中至少 $k$ 次正面的稀有右尾概率为例，普通模拟几乎观察不到事件。可提高正面概率到 $q$ 靠近条件均值区域；每条序列的权重为

$$
w(H)=\frac{(1/2)^N}{q^H(1-q)^{N-H}},
$$

其中 $H$ 为正面次数。权重与最终估计共同决定方差，并非把 $q$ 调到越极端越好。若权重退化的样本占主导，可用有效样本量

$$
N_{\mathrm{eff}}=\frac{(\sum_iw_i)^2}{\sum_iw_i^2}
$$

诊断，但它不能替代对具体估计量方差的分析。

## 18.6 数值结果的核验原则

可靠的数值实验应至少区分四类检查。首先，用闭式解或高精度基准验证实现，例如用解析 Black–Scholes 价格检查 Monte Carlo。其次，做收敛实验：网格减半时，二阶方法的误差应大致缩小为四分之一；样本量增加四倍时，Monte Carlo 标准误应大致减半。再次，报告误差条、随机种子和停止规则，使结果可复现。最后，检查输入是否满足模型条件，例如矩阵是否正定、根是否被包围、建议分布是否覆盖目标支撑。

解析验证与数值验证互相补充。模拟发现异常可能来自推导错误、程序错误或抽样误差；只有通过误差阶、独立基准和受控实验逐步区分，不能把一次相近结果当作证明，也不能把一次不一致直接归因于“随机波动”。

## 本章小结

条件数衡量问题对扰动的敏感性，稳定性衡量算法额外引入的误差。二分法以连续性获得可靠包围，Newton 与割线法以导数或差商换取更快的局部收敛。有限差分存在截断误差随步长下降、舍入误差随步长缩小的权衡；过小步长并不等于更高精度。

梯形和 Simpson 公式分别依赖二阶与四阶光滑性获得相应误差阶，高维张量网格则受到维数灾难限制。Monte Carlo 以 $N^{-1/2}$ 标准误估计期望，对偶变量利用负相关，控制变量利用已知期望和协方差，分层抽样消除层间波动，重要抽样通过 likelihood ratio 把样本移向关键区域。所有方差缩减都必须同时检查无偏性和实际方差，而不是只比较估计值是否“看起来更稳定”。

## 习题

1. 对 $f(x)=\sqrt{1+x}-1$，说明 $x$ 很小时直接计算的误差来源，并用恒等变形给出稳定形式。
2. 设 $\boldsymbol A=\operatorname{diag}(1,10^{-8})$，右端第二坐标产生 $10^{-8}$ 的绝对扰动。求精确解扰动，并解释小残差为何不必然意味着小解误差。
3. 二分法初始区间为 $[0,2]$。要求中点误差不超过 $10^{-6}$，至少需要进行多少次迭代？
4. 对 $f(x)=x^3-2x+2$，取 $x_0=0$，计算一步 Newton 迭代，并观察是否接近根。
5. 推导用 $x_{k+1}=\frac12(x_k+a/x_k)$ 求 $\sqrt a$（$a>0,x_k>0$）的 Newton 公式，并证明 $x_{k+1}\geq\sqrt a$。
6. 对 $f(x)=e^x$ 在 $x=0$ 处，分别写出前向和中心差分的主截断误差项。
7. 设某函数差分误差近似为 $E(h)=10^{-2}h^2+10^{-16}/h$。求使该模型误差最小的 $h$ 及最小误差。
8. 用 $n=2$ 的复合梯形公式计算 $\int_0^1x^2dx$ 的近似值，并与真值比较。
9. 证明单个 Simpson 公式对任意三次多项式在 $[-h,h]$ 上精确。
10. 设 $X_i$ 独立同分布，$\mathbb EX_i=\mu$、$\operatorname{Var}(X_i)=4$。若要标准误不超过 $0.01$，至少需多少样本？
11. 用指示变量估计概率 $p=10^{-4}$。若希望期望事件计数至少为 $20$，估算所需样本量，并说明“未观察到事件”不能推出 $p=0$。
12. 设 $X$ 与 $X^a$ 同分布，方差为 $4$、相关系数为 $-0.5$。比较使用一对变量的平均与两个独立同分布变量平均的方差。
13. 设 $\operatorname{Var}(X)=9$、$\operatorname{Var}(Y)=4$、$\operatorname{Cov}(X,Y)=3$，且 $\mathbb EY$ 已知。求最优控制变量系数及方差缩减比例。
14. 证明控制变量 $Z_c=X-c(Y-\mathbb EY)$ 对任意常数 $c$ 均无偏，并解释最优 $c$ 为什么与回归斜率形式相同。
15. 某分层总体有 $p_1=0.8,p_2=0.2$，层内标准差为 $\sigma_1=1,\sigma_2=4$，总样本量 $N=100$。按 Neyman 分配求两层的样本量，并与比例分配比较。
16. 设目标密度为 $p(x)$，建议密度为 $q(x)$。推导估计 $\mathbb E_p[h(X)]$ 的重要抽样权重，并说明支撑条件。
17. 对非负 $h$，证明形式建议密度 $q^*(x)=h(x)p(x)/\mu$ 使重要抽样估计量方差为零，并解释它为何通常不能直接使用。
18. 用 $100$ 次公平硬币投掷估计“至少 $80$ 次正面”的概率，改用正面概率 $q=0.8$ 的建议分布。写出含 $H$ 条序列权重，并指出选择 $q$ 时需要同时控制什么风险。
