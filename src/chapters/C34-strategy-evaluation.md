# 第34章　量化策略的数学评估与回测

全书建立的概率论、随机过程、线性代数、最优化与统计推断工具，最终要在策略研究中形成一条可检验的闭环：先把原始价格、公司行动和交易成本转化为可复现的收益序列，再以风险调整指标压缩路径特征，以估计误差刻画结论的不稳定性，最后把收益来源分解为配置、选择、因子暴露与未解释部分。回测因此不是一条资金曲线的展示，而是从数据生成机制到统计证据、再到经济解释的完整研究流程。本章前两节集中讨论绩效度量与业绩归因；它们共同连接策略的预测假设、组合构造和事后检验，并为后续回测偏差与稳健性分析提供统一记号。

## 34.1 收益序列与绩效指标

### 34.1.1 收益、年化与相对表现

设资产或组合在时刻 $t$ 的含分红价值为 $V_t$，区间现金流已按再投资假设计入。简单收益与对数收益分别写为 $R_t$ 和 $r_t$。若一年包含 $m$ 个等长观测区间，则收益聚合与基本年化量定义如下。

**定义 34.1（收益序列与年化绩效指标）**

对 $t=1,\ldots,n$，定义
$$
R_t=\frac{V_t}{V_{t-1}}-1,\qquad r_t=\log(1+R_t),\qquad
\overline R=\frac1n\sum_{t=1}^nR_t,\qquad s_R^2=\frac1{n-1}\sum_{t=1}^n(R_t-\overline R)^2 .
\tag{34.1}
$$
组合累计简单收益为 $\prod_{t=1}^n(1+R_t)-1$，累计对数收益为 $\sum_{t=1}^nr_t$。算术平均年化为 $m\overline R$，几何年化为 $(\prod_{t=1}^n(1+R_t))^{m/n}-1$，对数收益年化为 $m\overline r$，波动率年化为 $\sqrt m\,s_R$。这些量回答的问题不同：算术均值描述单期期望的估计，几何年化描述复合增长速度，对数收益便于跨期相加，不能在没有说明口径时相互替换。
### 34.1.2 风险调整收益指标

以下记无风险收益、基准收益和市场组合收益分别为 $R_{f,t}$、$R_{B,t}$ 与 $R_{M,t}$，并令超额收益 $X_t=R_t-R_{f,t}$、主动收益 $A_t=R_t-R_{B,t}$。样本标准差沿用式（34.1）的约定，目标收益 $\tau$ 是单期常数。不同指标使用不同的风险分母，因而不是同一偏好的不同写法。

**定义 34.2（常用风险调整绩效指标）**

夏普比率、信息比率、Sortino 比率、Treynor 比率与 Jensen alpha 的样本估计定义为
$$
\widehat{SR}=\sqrt m\,\frac{\overline X}{s_X},\qquad
\widehat{IR}=\sqrt m\,\frac{\overline A}{s_A},\qquad
\widehat{\operatorname{Sortino}}=\sqrt m\,\frac{\overline R-\tau}
{\sqrt{n^{-1}\sum_{t=1}^n\min\{R_t-\tau,0\}^2}},
$$
$$
\widehat{\operatorname{Treynor}}=\frac{m(\overline R-\overline R_f)}{\widehat\beta},\qquad
\widehat\alpha_J=(\overline R-\overline R_f)-\widehat\beta(\overline R_M-\overline R_f),
\qquad
\widehat\beta=\frac{\sum_{t=1}^n(R_t-\overline R)(R_{M,t}-\overline R_M)}
{\sum_{t=1}^n(R_{M,t}-\overline R_M)^2}.
\tag{34.2}
$$
Jensen alpha 的单期口径乘以 $m$ 即得算术年化口径。夏普比率以自身总波动为风险价格，信息比率以跟踪误差衡量相对基准的稳定性，Sortino 比率只惩罚低于目标的偏差，Treynor 比率则用系统性风险作分母。Jensen alpha 是实际平均超额收益超出市场暴露所解释部分的差额，并不自动等同于因果意义上的管理能力。

若下行偏差为零而 $\overline R>\tau$，Sortino 比率记为正无穷；若分子也为零，则该比率没有定义。$\widehat\beta$ 接近零时 Treynor 比率极不稳定，负 $\widehat\beta$ 下也不能按通常的正风险溢价方式排序。信息比率中的 $s_A$ 必须使用主动收益序列计算，不能用 $s_R-s_B$ 替代，因为波动不满足这种减法。
### 34.1.3 夏普比率的渐近标准误

点估计没有反映收益样本的抽样波动。令 $\mu=\mathbb E[X_t]$、$\sigma^2=\operatorname{Var}(X_t)>0$，单期总体夏普比率为 $S=\mu/\sigma$，估计值 $\widehat S=\overline X/s_X$。再令 $\kappa_j=\mathbb E[(X_t-\mu)^j]$，偏度 $\gamma_1=\kappa_3/\sigma^3$，并记 $\boldsymbol Z_t=(X_t,(X_t-\mu)^2)^\top$。

**定理 34.3（夏普比率的渐近分布与标准误）**

设超额收益序列严格平稳、遍历，$\mathbb E[X_t^4]<\infty$，且 $\sqrt n$ 倍的样本均值与样本方差误差满足以 $\boldsymbol Z_t$ 为影响函数的联合中心极限定理。其长期协方差矩阵为
$\boldsymbol\Sigma=\sum_{h=-\infty}^{\infty}\operatorname{Cov}(\boldsymbol Z_0,\boldsymbol Z_h)$，级数绝对收敛。则
$$
\sqrt n(\widehat S-S)\xrightarrow{d}N(0,v_S),\qquad
v_S=\boldsymbol d^\top\boldsymbol\Sigma\boldsymbol d,\qquad
\boldsymbol d=\left(\frac1\sigma,-\frac{\mu}{2\sigma^2}\right)^\top .
$$
若各期超额收益独立同分布，则
$$
v_S=1-S\gamma_1+\frac{S^2}{4}\left(\frac{\kappa_4}{\sigma^4}-1\right),
\qquad v_S=1+\frac{S^2}{2}\quad\text{under}\quad X_t\sim N(\mu,\sigma^2).
$$
年化夏普比率 $\widehat{SR}=\sqrt m\,\widehat S$ 的一致标准误估计为
$$
\widehat{\operatorname{se}}(\widehat{SR})=
\sqrt{\frac mn\,\widehat{\boldsymbol d}^{\top}\widehat{\boldsymbol\Sigma}\widehat{\boldsymbol d}},
\qquad
\widehat{\operatorname{se}}_{\mathrm{iid},N}(\widehat{SR})=
\sqrt{\frac mn\left(1+\frac{\widehat S^2}{2}\right)} .
\tag{34.3}
$$

**证明**

先处理样本方差中以样本均值代替总体均值所造成的差异。记 $s_X^2$ 的分母为 $n-1$，代数展开给出
$$
s_X^2=\frac{n}{n-1}\left[\frac1n\sum_{t=1}^n(X_t-\mu)^2-(\overline X-\mu)^2\right].
$$由于 $\overline X-\mu=O_p(n^{-1/2})$，有 $\sqrt n(\overline X-\mu)^2=o_p(1)$，且 $n/(n-1)\to 1$，故
$$
\sqrt n(s_X^2-\sigma^2)=\frac1{\sqrt n}\sum_{t=1}^n[(X_t-\mu)^2-\sigma^2]+o_p(1).
$$
因此 $\widehat{\boldsymbol\theta}=(\overline X,s_X^2)^\top$ 的渐近协方差正是 $\boldsymbol\Sigma$。令 $g(\mu,v)=\mu v^{-1/2}$，其中 $v=\sigma^2$，则
$$
\frac{\partial g}{\partial\mu}=v^{-1/2}=\frac1\sigma,\qquad
\frac{\partial g}{\partial v}=-\frac{\mu}{2}v^{-3/2}=-\frac{\mu}{2\sigma^3}.
$$
这里第二个分量是对方差 $v$ 求导，而不是对标准差求导；式（34.3）中的 $\boldsymbol d$ 因而应统一读作 $(1/\sigma,-\mu/(2\sigma^3))^\top$，以下标准误均采用此梯度。由连续映射定理，$s_X$ 依概率收敛于 $\sigma$，再由 delta 方法得到 $\sqrt n(\widehat S-S)\xrightarrow{d}N(0,\boldsymbol d^\top\boldsymbol\Sigma\boldsymbol d)$，年化比率的标准误多出因子 $\sqrt m$，除以 $\sqrt n$ 后即得所报估计式。

若各期独立，则 $h\ne0$ 时的协方差全部消失，并且
$$
\boldsymbol\Sigma=
\begin{pmatrix}
\sigma^2&\kappa_3\\
\kappa_3&\kappa_4-\sigma^4
\end{pmatrix}.
$$
代入正确梯度，逐项计算为
$$
v_S=\frac{\sigma^2}{\sigma^2}
-2\frac1\sigma\frac{\mu}{2\sigma^3}\kappa_3
+\frac{\mu^2}{4\sigma^6}(\kappa_4-\sigma^4)
=1-\frac{\mu\kappa_3}{\sigma^4}
+\frac{\mu^2}{4\sigma^6}(\kappa_4-\sigma^4).
$$
利用 $S=\mu/\sigma$ 与 $\gamma_1=\kappa_3/\sigma^3$，即得独立同分布表达式。正态分布关于均值对称，所以 $\kappa_3=0$；直接计算 $\mathbb E[(X_t-\mu)^4]=3\sigma^4$，于是 $v_S=1+S^2/2$。以样本均值、样本方差、样本三阶和四阶中心矩替换相应总体量，连续映射定理给出一致的标准误估计。

□
实际估计长期协方差时，令 $\widehat{\boldsymbol z}_t=(X_t,(X_t-\overline X)^2)^\top$，$\overline{\boldsymbol z}=n^{-1}\sum_{t=1}^n\widehat{\boldsymbol z}_t$，并对 $h\ge0$ 定义
$$
\widehat{\boldsymbol\Gamma}_h=\frac1n\sum_{t=1}^{n-h}
(\widehat{\boldsymbol z}_t-\overline{\boldsymbol z})
(\widehat{\boldsymbol z}_{t+h}-\overline{\boldsymbol z})^\top .
$$
取截断滞后 $H$ 与 Bartlett 权重 $k_H(h)=1-h/(H+1)$，异方差自相关一致估计量为
$$
\widehat{\boldsymbol\Sigma}=\widehat{\boldsymbol\Gamma}_0+
\sum_{h=1}^Hk_H(h)(\widehat{\boldsymbol\Gamma}_h+\widehat{\boldsymbol\Gamma}_h^\top).
$$
同时代入 $\widehat{\boldsymbol d}=(1/s_X,-\overline X/(2s_X^3))^\top$。在通常的 $H\to\infty$、$H/n\to0$ 及矩和高阶弱相关条件下，该估计量保持一致。独立正态公式只是特例；收益自相关会改变 $\boldsymbol\Sigma$，负偏度通过 $-S\gamma_1$ 增大独立样本下的渐近方差，厚尾则通过峰度项进一步放大不确定性。相应的近似置信区间为 $\widehat{SR}\pm z_{1-\alpha/2}\widehat{\operatorname{se}}(\widehat{SR})$，不能把该区间解释为未来收益必然落入的范围。

### 34.1.4 最大回撤与恢复路径

波动率把向上和向下偏离同等计入，回撤则直接描述财富从历史高点下跌的幅度。它依赖观测顺序，不能由均值和方差唯一确定。

**定义 34.4（最大回撤）**

令 $W_0=1$，$W_t=\prod_{u=1}^t(1+R_u)$ 为含分红再投资的财富指数。历史峰值、时点回撤和样本最大回撤分别定义为
$$
H_t=\max_{0\le s\le t}W_s,\qquad
D_t=1-\frac{W_t}{H_t},\qquad
MDD=\max_{0\le t\le n}D_t .
\tag{34.4}
$$

由于 $W_t>0$，等价地有 $D_t=1-\exp(\log W_t-\max_{0\le s\le t}\log W_s)$。因此，对数收益的累计和足以确定回撤，但最大回撤并不是累计对数收益的单调函数。最大回撤对应的峰值时点与谷底时点可分别取为最后一次达到 $H_{t^*}$ 的时点和使 $D_t$ 最大的时点；若同一幅度出现多次，应事先约定取首次或最长持续期，避免回测报告歧义。

恢复时点是从谷底之后财富首次重新回到原历史峰值的时点；样本结束仍未恢复时记为 $+\infty$。峰值到谷底的长度称为下跌持续期，峰值到恢复的长度称为水下持续期。最大回撤为零意味着整条财富路径不下降，而年化波动率仍可能为正。对最大回撤不能简单乘以 $\sqrt m$ 年化，因为其极值分布还依赖路径长度、收益相关性和观测频率。

**例 34.1**

某策略有 $24$ 个月度超额收益，样本均值为 $0.006$，样本标准差为 $0.03$，样本偏度为 $-0.25$，样本峰度为 $4$。在独立同分布近似下，求年化夏普比率及其标准误，并与独立正态近似比较。

**解**

单期夏普估计为 $\widehat S=0.006/0.03=0.2$。一年有 $12$ 个月，由定理 34.3 的独立同分布方差公式，代入 $S=0.2$、$\gamma_1=-0.25$ 与 $\kappa_4/\sigma^4=4$，得到
$$
\widehat{SR}=\sqrt{12}\times0.2=0.69282,\qquad
\widehat v_S=1-0.2\times(-0.25)+\frac{0.2^2}{4}(4-1)=1.08,
$$
$$
\widehat{\operatorname{se}}(\widehat{SR})
=\sqrt{\frac{12}{24}\times1.08}=0.73485 .
\tag{34.5}
$$
若额外假设收益服从正态分布，则 $\widehat v_S=1+0.2^2/2=1.02$，对应标准误为 $\sqrt{(12/24)\times1.02}=0.71414$。偏度与峰度使本例标准误增大，但两种口径都显示抽样不确定性很大。采用非正态标准误，近似 $95\%$ 置信区间为
$0.69282\pm1.96\times0.73485=[-0.74748,2.13312]$。区间包含零并不证明真实夏普比率为零，只说明 $24$ 个观测不足以精确识别其符号。若月度收益存在自相关，上述两个标准误都不再适用，必须改用长期协方差矩阵的估计。

## 34.2 业绩归因

绩效指标给出策略表现的总体评价，业绩归因则把相对收益拆成可解释的经济来源。归因结果始终依赖于资产分类、基准权重、收益口径和时间链接方式；在这些口径固定之前，单个配置或选择数字没有独立含义。

### 34.2.1 Brinson 数学分解

考虑单期 $t$，资产被划分为 $K$ 个互不重叠且覆盖全组合的类别。组合与基准在类别 $i$ 的权重分别为 $w_{ti}$、$b_{ti}$，类别收益分别为 $r_{ti}^P$、$r_{ti}^B$。假设 $\sum_iw_{ti}=\sum_ib_{ti}=1$，类别收益与其成分资产的市值加权收益一致，现金流和费用也已按同一口径计入。

**定理 34.5（含交互项的 Brinson 归因恒等式）**

组合和基准总收益满足 $R_t^P=\sum_iw_{ti}r_{ti}^P$、$R_t^B=\sum_ib_{ti}r_{ti}^B$。定义类别配置、选择和交互贡献为
$$
A_{ti}=(w_{ti}-b_{ti})(r_{ti}^B-R_t^B),\qquad
S_{ti}=b_{ti}(r_{ti}^P-r_{ti}^B),\qquad
I_{ti}=(w_{ti}-b_{ti})(r_{ti}^P-r_{ti}^B),
$$
并令 $A_t=\sum_iA_{ti}$、$S_t=\sum_iS_{ti}$、$I_t=\sum_iI_{ti}$，则
$$
R_t^P-R_t^B=A_t+S_t+I_t .
\tag{34.6}
$$
配置项采用相对基准总收益的 Brinson--Fachler 形式：超配跑赢基准总收益的类别产生正贡献，低配跑输基准总收益的类别也产生正贡献。选择项在基准权重下衡量类别内收益差，交互项则同时包含权重偏离与类别内选择效果。

**证明**

由权重和均为一，$\sum_i(w_{ti}-b_{ti})R_t^B=0$。分别展开三项之和，得到
$$
A_t=\sum_iw_{ti}r_{ti}^B-\sum_ib_{ti}r_{ti}^B,
$$
$$
S_t=\sum_ib_{ti}r_{ti}^P-\sum_ib_{ti}r_{ti}^B,
$$
$$
I_t=\sum_iw_{ti}r_{ti}^P-\sum_iw_{ti}r_{ti}^B
-\sum_ib_{ti}r_{ti}^P+\sum_ib_{ti}r_{ti}^B .
$$
将三式相加，所有含 $r_{ti}^B$ 的项以及含 $b_{ti}r_{ti}^P$ 的项两两抵消，只剩 $\sum_iw_{ti}r_{ti}^P-\sum_ib_{ti}r_{ti}^B$，即 $R_t^P-R_t^B$。

□

若省略交互项而把选择项改为 $w_{ti}(r_{ti}^P-r_{ti}^B)$，总主动收益仍可分解，但此时选择项已经包含交互效应。两种口径不能在同一报告中混用。若权重不覆盖现金、期货保证金或费用，必须先增加相应类别或显式残差项，否则上述恒等式一般不成立。

### 34.2.2 多期链接与算术归因误差

单期贡献可以逐项相加，但组合与基准的多期收益分别复利，主动收益之和一般不等于几何相对收益。令 $a_t=R_t^P-R_t^B$，$q_t=1+R_t^B>0$，$x_t=a_t/q_t$。多期几何相对收益与算术主动收益分别记为
$G_n=\prod_{t=1}^n(1+R_t^P)/\prod_{t=1}^n(1+R_t^B)-1$ 和 $C_n=\sum_{t=1}^na_t$。定义链接误差 $E_n=G_n-C_n$，则有精确恒等式及误差界
$$
G_n=\prod_{t=1}^n(1+x_t)-1,\qquad
E_n=\sum_{t=1}^n\left(\frac1{q_t}-1\right)a_t
+\sum_{k=2}^n\sum_{|J|=k}\prod_{t\in J}x_t .
$$
若 $\max_t|1/q_t-1|\le\delta$ 且 $\max_t|x_t|\le u$，则
$$
|E_n|\le\delta\sum_{t=1}^n|a_t|+(1+u)^n-1-nu .
\tag{34.7}
$$
第一行由 $1+R_t^P=q_t(1+x_t)$ 直接得到。把乘积 $\prod_t(1+x_t)$ 按非空子集 $J\subseteq\{1,\ldots,n\}$ 展开，单元素子集给出 $\sum_tx_t$，其余子集给出所有跨期乘积；再减去 $C_n=\sum_tq_tx_t$，即得 $E_n$ 的精确表达式。误差界第一项由 $|a_t/q_t-a_t|\le\delta|a_t|$ 得到，第二项利用 $|J|=k$ 的子集共有 $\binom nk$ 个，并以二项式定理合并。

该分解把不一致量化为两部分：$\sum_t(1/q_t-1)a_t$ 是基准复利造成的尺度误差，跨期乘积项是主动收益之间的复合误差。即使每期基准收益均为零，$E_n=\sum_{|J|\ge2}\prod_{t\in J}a_t$ 仍不必为零。反之，若至多一期的 $x_t$ 非零且所有 $q_t=1$，两种口径才在该恒等式下完全一致。

算术链接报告 $C_n$ 及 $\sum_tA_t$、$\sum_tS_t$、$\sum_tI_t$，优点是每类贡献可直接相加，缺点是总额不等于 $G_n$。几何链接则必须选择链接系数或显式保留 $E_n$。若只用一个系数序列 $\lambda_t$ 令 $\sum_t\lambda_ta_t=G_n$，一般不能保证同一组系数还使每个类别的链接贡献等于预先指定的几何类别贡献。因此，报告中应说明误差如何分配；把 $E_n$ 静默塞入选择项会改变选择效应的经济含义。

### 34.2.3 多因子归因与回归残差

Brinson 分解依据离散步长中的类别权重，多因子归因则把收益投影到事先指定的系统性风险源。令 $y_t=R_t^P-R_{f,t}$，$\boldsymbol f_t=(f_{t1},\ldots,f_{tp})^\top$ 为可观测因子收益，$\boldsymbol\beta=(\beta_1,\ldots,\beta_p)^\top$ 为暴露。因子若是多空组合收益，其自身已是超额口径；若因子含不可交易的基本面变量，则必须先说明如何转化为收益或只把回归解释为统计关联。

**定理 34.6（多因子回归的收益归因）**

设单期模型为 $y_t=\alpha+\boldsymbol\beta^\top\boldsymbol f_t+\varepsilon_t$。在样本 $t=1,\ldots,n$ 上，定义 alpha、第 $j$ 个因子和残差的算术贡献为
$$
C_\alpha=n\alpha,\qquad C_j=\beta_j\sum_{t=1}^nf_{tj},\qquad
C_\varepsilon=\sum_{t=1}^n\varepsilon_t .
$$
则累计超额收益具有分解
$$
\sum_{t=1}^ny_t=C_\alpha+\sum_{j=1}^pC_j+C_\varepsilon .
\tag{34.8}
$$
若以带截距的最小二乘法估计参数，则样本残差贡献 $C_\varepsilon$ 为零，且每个因子的样本残差加权和也为零；因此拟合后的累计超额收益恰好等于估计 alpha 贡献与各因子贡献之和。

**证明**

第一式只需把回归模型对 $t$ 求和，并按 $\alpha$、各 $\beta_j$ 与 $\varepsilon_t$ 分组，不依赖任何分布假设。为证明样本估计后的结论，构造设计矩阵 $\boldsymbol X\in\mathbb R^{n\times(p+1)}$，其第一列全为 $1$，第 $j+1$ 列为 $(f_{1j},\ldots,f_{nj})^\top$，并令 $\boldsymbol y=(y_1,\ldots,y_n)^\top$、$\boldsymbol\theta=(\alpha,\boldsymbol\beta^\top)^\top$。假设 $\boldsymbol X$ 列满秩。最小二乘目标为
$$
Q(\boldsymbol\theta)=(\boldsymbol y-\boldsymbol X\boldsymbol\theta)^\top
(\boldsymbol y-\boldsymbol X\boldsymbol\theta).
$$
展开并对 $\boldsymbol\theta$ 求导，得到梯度 $-2\boldsymbol X^\top\boldsymbol y+2\boldsymbol X^\top\boldsymbol X\boldsymbol\theta$。由于 $\boldsymbol X^\top\boldsymbol X$ 正定，目标严格凸，唯一驻点就是唯一全局最小值。
令梯度为零即得正规方程 $\boldsymbol X^\top\boldsymbol X\widehat{\boldsymbol\theta}=\boldsymbol X^\top\boldsymbol y$。列满秩保证矩阵可逆，所以估计量、残差投影矩阵和残差分别为
$$
\widehat{\boldsymbol\theta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y,\qquad
\boldsymbol M=\boldsymbol I-\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top,\qquad
\widehat{\boldsymbol\varepsilon}=\boldsymbol M\boldsymbol y .
$$
并且
$$
\boldsymbol X^\top\widehat{\boldsymbol\varepsilon}=\boldsymbol0,\qquad
\sum_{t=1}^n\widehat\varepsilon_t=0,\qquad
\sum_{t=1}^nf_{tj}\widehat\varepsilon_t=0 .
\tag{34.9}
$$
事实上，$\boldsymbol M$ 对称且幂等，因为 $\boldsymbol M\boldsymbol X=\boldsymbol0$；于是 $\boldsymbol y-\boldsymbol X\widehat{\boldsymbol\theta}=\boldsymbol M\boldsymbol y$，并且 $\boldsymbol X^\top\boldsymbol M=\boldsymbol0$。第一列给出残差和为零，第 $j+1$ 列给出第 $j$ 个因子与残差的样本内正交性。把 $\widehat{\boldsymbol\theta}$ 代入式（34.8），即得估计后的归因恒等式。

□

残差贡献在整个样本上为零，并不意味着每期残差为零，也不意味着残差风险可以忽略。残差平方和决定拟合优度，残差序列还可揭示波动聚集、结构突变和遗漏因子。样本内正交只是设计矩阵列空间与残差空间的几何关系，不能推出总体中 $\mathbb E[\varepsilon_t\mid\boldsymbol f_t]=0$，更不能推出残差与各因子独立。若误差同方差且无条件序列相关，条件于 $\boldsymbol X$ 的参数协方差为 $\sigma_\varepsilon^2(\boldsymbol X^\top\boldsymbol X)^{-1}$；存在异方差或自相关时，应使用相应的稳健协方差估计，而不是沿用该公式。

多因子贡献与 Brinson 贡献回答不同问题。$C_j$ 是恒定样本暴露乘以因子累计收益，$A_{ti}$ 和 $S_{ti}$ 则来自离散类别中的权重差和收益差。一个选择效应可能恰好是遗漏的行业因子暴露，一个显著的 $\widehat\alpha$ 也可能来自因子集合设定错误、非线性 payoff 或样本选择。式（34.8）仍是算术加总；若要把它转换为几何多期贡献，必须像式（34.7）那样显式处理复利和链接误差。

**例 34.2**

某单期组合与基准均含股票、债券两个类别。组合权重为 $w_{t1}=0.6$、$w_{t2}=0.4$，基准权重为 $b_{t1}=b_{t2}=0.5$。两类基准收益为 $r_{t1}^B=0.10$、$r_{t2}^B=0.04$，组合在两类资产上的收益为 $r_{t1}^P=0.12$、$r_{t2}^P=0.05$。求配置、选择和交互贡献，并验证主动收益分解。

**解**

先计算总收益：$R_t^B=0.5\times0.10+0.5\times0.04=0.07$，$R_t^P=0.6\times0.12+0.4\times0.05=0.092$，所以主动收益为 $0.022$。由定理 34.5，股票配置贡献为 $(0.6-0.5)(0.10-0.07)=0.003$；债券配置贡献为 $(0.4-0.5)(0.04-0.07)=0.003$。股票选择贡献为 $0.5(0.12-0.10)=0.01$，债券选择贡献为 $0.5(0.05-0.04)=0.005$。两个交互贡献分别为 $(0.6-0.5)(0.12-0.10)=0.002$ 与 $(0.4-0.5)(0.05-0.04)=-0.001$。汇总为
$$
R_t^B=0.07,\qquad R_t^P=0.092,\qquad
A_t=0.003+0.003=0.006,
$$
$$
S_t=0.01+0.005=0.015,\qquad
I_t=0.002-0.001=0.001,
$$
$$
R_t^P-R_t^B=0.092-0.07=0.022=0.006+0.015+0.001 .
\tag{34.10}
$$
因此，$2.2$ 个百分点的主动收益中，配置贡献 $0.6$ 个百分点，选择贡献 $1.5$ 个百分点，交互贡献 $0.1$ 个百分点。超配股票带来正配置和正交互，低配债券也因债券跑输基准总收益而产生正配置；债券选择虽为正，低配却使交互项为负。

再把该期作为第一期，假设第二期基准总收益为 $0.02$、主动收益为 $0.01$。两期算术主动收益为 $C_2=0.022+0.01=0.032$。取 $x_1=0.022/1.07$、$x_2=0.01/1.02$，几何相对收益为
$$
G_2=(1+x_1)(1+x_2)-1
=\frac{0.022}{1.07}+\frac{0.01}{1.02}
+\frac{0.022\times0.01}{1.07\times1.02}
=0.03056625 .
$$
故 $E_2=G_2-C_2=-0.00143375$。其中基准尺度误差为 $(1/1.07-1)0.022+(1/1.02-1)0.01=-0.00163533$，跨期复合误差为 $x_1x_2=0.00020158$，两者之和恰为总链接误差。这说明即使单期 Brinson 恒等式完全成立，多期算术贡献之和仍须经过链接才能与几何相对收益一致。

### 34.2.4 残差方差与因子贡献的误差传播

为了区分“样本内残差和为零”与“模型没有误差”，进一步假设设计矩阵列满秩，真实误差满足 $\mathbb E[\boldsymbol\varepsilon\mid\boldsymbol X]=\boldsymbol0$ 以及 $\operatorname{Var}(\boldsymbol\varepsilon\mid\boldsymbol X)=\sigma_\varepsilon^2\boldsymbol I$。由最小二乘估计式直接代入 $\boldsymbol y=\boldsymbol X\boldsymbol\theta+\boldsymbol\varepsilon$，得到
$$
\widehat{\boldsymbol\theta}-\boldsymbol\theta
=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\varepsilon,
\qquad
\operatorname{Var}(\widehat{\boldsymbol\theta}\mid\boldsymbol X)
=\sigma_\varepsilon^2(\boldsymbol X^\top\boldsymbol X)^{-1}.
$$
这里先取条件期望使误差项消失，再利用 $(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$ 与其转置夹出协方差矩阵。该结果说明，因子收益变异过小或因子之间高度共线，都会通过 $(\boldsymbol X^\top\boldsymbol X)^{-1}$ 放大 alpha 和暴露估计的不确定性。

残差还满足 $\widehat{\boldsymbol\varepsilon}=\boldsymbol M(\boldsymbol X\boldsymbol\theta+\boldsymbol\varepsilon)=\boldsymbol M\boldsymbol\varepsilon$。所以其条件均值为零，条件协方差为 $\sigma_\varepsilon^2\boldsymbol M$，而不是 $\sigma_\varepsilon^2\boldsymbol I$。由于 $\boldsymbol M$ 对称幂等，利用迹的循环性可得
$$
\operatorname{tr}(\boldsymbol M)
=n-\operatorname{tr}[\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top]
=n-\operatorname{tr}(\boldsymbol I_{p+1})=n-p-1.
$$
因此残差平方和的条件期望为
$$
\mathbb E[\widehat{\boldsymbol\varepsilon}^{\top}\widehat{\boldsymbol\varepsilon}\mid\boldsymbol X]
=\mathbb E[\boldsymbol\varepsilon^\top\boldsymbol M\boldsymbol\varepsilon\mid\boldsymbol X]
=\sigma_\varepsilon^2\operatorname{tr}(\boldsymbol M)
=\sigma_\varepsilon^2(n-p-1).
$$
故 $s_\varepsilon^2=(n-p-1)^{-1}\sum_t\widehat\varepsilon_t^2$ 是 $\sigma_\varepsilon^2$ 的无偏估计。分母减去 $p+1$ 并非任意自由度修正，而是残差投影矩阵秩的直接结果。

### 34.2.5 无偏估计的标准误与适用边界

上述无偏性必须条件于设计矩阵且以列满秩、条件零均值和条件同方差为前提。它既不是对每个实现都有 $s_\varepsilon^2=\sigma_\varepsilon^2$，也不是说单个残差具有方差 $\sigma_\varepsilon^2$。事实上，第 $t$ 个残差的条件方差为 $\sigma_\varepsilon^2m_{tt}$，其中 $m_{tt}$ 是 $\boldsymbol M$ 的第 $t$ 个对角元；不同残差通常相关。因此，不能先对每个残差套用独立同方差公式，再把所得标准误简单平均。

若进一步假设 $\boldsymbol\varepsilon\mid\boldsymbol X$ 服从均值 $\boldsymbol0$、协方差矩阵 $\sigma_\varepsilon^2\boldsymbol I$ 的正态分布，则可完整确定残差平方和的分布。令 $r=n-p-1$，由 $\boldsymbol M$ 对称幂等且秩为 $r$，存在 $n\times r$ 矩阵 $\boldsymbol Q$，使得
$$
\boldsymbol M=\boldsymbol Q\boldsymbol Q^\top,\qquad
\boldsymbol Q^\top\boldsymbol Q=\boldsymbol I_r .
$$
于是 $\boldsymbol z=\sigma_\varepsilon^{-1}\boldsymbol Q^\top\boldsymbol\varepsilon$ 条件于 $\boldsymbol X$ 服从 $r$ 维标准正态分布，并且
$$
\frac{\widehat{\boldsymbol\varepsilon}^{\top}\widehat{\boldsymbol\varepsilon}}{\sigma_\varepsilon^2}
=\frac{\boldsymbol\varepsilon^\top\boldsymbol Q\boldsymbol Q^\top\boldsymbol\varepsilon}{\sigma_\varepsilon^2}
=\boldsymbol z^\top\boldsymbol z\sim\chi_r^2 .
$$
卡方分布的均值为 $r$、方差为 $2r$，所以
$$
\mathbb E[s_\varepsilon^2\mid\boldsymbol X]=\sigma_\varepsilon^2,
\qquad
\operatorname{Var}(s_\varepsilon^2\mid\boldsymbol X)
=\frac{2\sigma_\varepsilon^4}{n-p-1}.
$$
这不仅再次证明无偏性，还量化了估计本身的抽样波动。若误差正态性不成立，卡方结论一般不再成立，但在相应矩条件下，由投影矩阵得到的自由度修正仍然成立。

将 $s_\varepsilon^2$ 代回条件协方差公式，便得到暴露估计的估计协方差矩阵
$$
\widehat{\operatorname{Var}}(\widehat{\boldsymbol\theta}\mid\boldsymbol X)
=s_\varepsilon^2(\boldsymbol X^\top\boldsymbol X)^{-1}.
$$
若截距位于参数向量首位，则 alpha 的标准误为
$$
\operatorname{se}(\widehat\alpha)
=s_\varepsilon\sqrt{[(\boldsymbol X^\top\boldsymbol X)^{-1}]_{11}},
$$
相应的 $t$ 统计量是 $\widehat\alpha/\operatorname{se}(\widehat\alpha)$。在正态误差下，它条件于 $\boldsymbol X$ 服从自由度 $n-p-1$ 的 $t$ 分布；放弃正态性后，大样本检验仍需正则条件，不能把上述有限样本分布直接沿用。

归因报告因而应同时给出贡献点估计、残差方差、参数标准误和模型设定诊断。因子贡献的置信区间还应计入因子收益与暴露估计的不确定性，不能只把残差标准误机械乘以样本暴露。若误差存在异方差或自相关，$\sigma_\varepsilon^2\boldsymbol I$ 的假设失效，前述无偏性和标准误均须重新论证；此时应明确条件协方差结构并采用一致的稳健估计。至此，样本内代数分解、残差投影和统计不确定性被区分开来，也为下一节讨论回测证据能否推广到样本外提供了基准。

## 34.3 统计显著性与回测偏差

回测把历史数据映射为策略收益，但映射中每一次参数选择、样本筛选和规则修改都可能消耗数据中的信息。因而，回测收益高并不等于策略具有可重复的超额收益，单个未修正的显著性检验也不能代表整个研究过程的证据强度。本节先明确回测的信息边界，再从次序统计量推导多策略择优造成的收益虚高，最后给出样本内外划分、时间序列交叉验证以及过拟合度量。

### 34.3.1 回测框架与信息边界

设离散时期为 $t=0,1,\ldots,T$，$\mathcal F_t$ 表示在时点 $t$ 收盘及既定执行时刻之前真正可获得的信息。它不仅包括行情，还包括当时已经公布的财务数据、证券名单、公司行动、交易制度和参数搜索记录。策略 $S$ 在时点 $t$ 先依据 $\mathcal F_t$ 中的数据估计参数 $\widehat{\boldsymbol\theta}_t$，再生成下一期持仓 $\boldsymbol w_t$。若资产下一期总收益向量为 $\boldsymbol r_{t+1}$，交易成本为 $c_{t+1}$，融资与现金收益为 $f_{t+1}$，则净收益写成
$$
R_{t+1}(S)
=\boldsymbol w_t^\top\boldsymbol r_{t+1}
-c_{t+1}(\boldsymbol w_t,\boldsymbol w_{t-1})+f_{t+1}.
$$
成本函数必须在看到 $\boldsymbol r_{t+1}$ 之前规定，并可依赖成交量、买卖价差和冲击模型。把事后才知道的成交价、指数成分或修订后财务值放进 $\mathcal F_t$，即使收益公式完全正确，也仍然构成前视偏差。

**定义 34.7（信息容许的回测与选择性推断）**

给定信息流 $\{\mathcal F_t\}$，若每个 $\widehat{\boldsymbol\theta}_t$ 和 $\boldsymbol w_t$ 都是 $\mathcal F_t$ 可测的，收益在 $t+1$ 实现，且证券存续、退市、公司行动、成交约束和成本均按当时可用信息处理，则称回测是信息容许的。若另有固定性能泛函 $\Psi$，回测输出为 $\widehat\Psi(S)=\Psi(R_1(S),\ldots,R_T(S))$。对候选集 $\mathcal S$ 计算这些输出，再依据其数值选择或修改策略，并继续对所选结果作统计判断，称为选择性推断。

信息容许首先要求研究决策与收益实现保持时间顺序。信号使用 $t$ 日收盘价而成交也假设发生在同一收盘价，必须证明订单在该价格形成前已经可执行；否则应推迟成交或建立可成交价格模型。幸存者偏差则来自用期末存续证券反推历史股票池，它会删除破产和退市路径。两者都不能靠增加样本长度消除。

候选集 $\mathcal S$ 不只包括最终保存的 $m$ 套程序。研究员试过的因子、参数、起止日期、风险模型和剔除规则，只要影响了后续选择，就属于实际搜索空间。设最终索引为
$$
i^*\in\arg\max_{1 \le i \le m}\widehat\Psi(S_i).
$$
由于 $i^*$ 依赖整段回测数据，$S_{i^*}$ 不再是事先固定的策略。对它直接套用固定策略的置信区间，会忽略分母和统计量分布已经因选择而改变。可审计的回测因此还应保存数据版本、候选规则、试验次数、失败结果和最终选择时间，以便重建真正的多重性。

### 34.3.2 数据窥探与最优次序统计量

数据窥探是反复使用同一数据评价并选择规则，却仍把最终结果当作单次预设检验。其关键不是候选策略一定相关，也不是样本均值一定有偏，而是“先取最大、再解释最大”的非线性运算。即使所有单个估计都无偏且策略彼此独立，最大值仍然通常有正偏差。

**定理 34.8（独立策略择优的期望虚高）**

设第 $i$ 个策略的真实期望收益为 $\mu_i$，样本内估计为 $\widehat\mu_i=\mu_i+\varepsilon_i$，其中 $\varepsilon_1,\ldots,\varepsilon_m$ 独立、均值为零且方差有限。令 $i^*$ 为使 $\widehat\mu_i$ 最大的索引，并令独立的样本外估计 $\widehat\mu_i^{O}$ 满足 $\mathbb E[\widehat\mu_i^{O}\mid i^*]=\mu_{i^*}$。则样本内最优值相对所选策略真实收益的期望虚高为
$$
B_m
=\mathbb E[\widehat\mu_{i^*}-\mu_{i^*}]
=\mathbb E[\max_{1 \le i \le m}\widehat\mu_i]-\max_{1 \le i \le m}\mu_i
+\max_{1 \le i \le m}\mu_i-\mathbb E[\mu_{i^*}]\ge 0.
\tag{34.11}
$$
而且还有
$$
0\le \mathbb E[\max_i\widehat\mu_i]-\max_i\mu_i
\le \mathbb E[\max_i\varepsilon_i].
$$
若所有 $\mu_i=\mu$，且 $\varepsilon_i$ 独立同分布于 $N(0,\sigma^2)$，则
$$
B_m=\sigma\mathbb E[Z_{(m)}],
\qquad
0\le B_m\le\sigma\sqrt{2\log m},
$$
其中 $Z_{(m)}=\max\{Z_1,\ldots,Z_m\}$，$Z_i$ 为独立标准正态变量。特别地，$B_1=0$，而 $B_2=\sigma/\sqrt{\pi}$。

**证明**

由 $i^*$ 的定义，$\widehat\mu_{i^*}=\max_i\widehat\mu_i$。独立性使样本外选择事件与新的噪声分离，故
$$
\mathbb E[\widehat\mu_{i^*}^{O}]
=\mathbb E[\mathbb E[\widehat\mu_{i^*}^{O}\mid i^*]]
=\mathbb E[\mu_{i^*}].
$$
所以 $B_m$ 也等于样本内最优估计减去样本外估计的期望。函数 $(x_1,\ldots,x_m)\mapsto\max_i x_i$ 是凸函数，Jensen 不等式给出
$$
\mathbb E[\max_i(\mu_i+\varepsilon_i)]
\ge \max_i\mathbb E[\mu_i+\varepsilon_i]
=\max_i\mu_i.
$$
另一方面，对每个样本路径都有
$$
\max_i(\mu_i+\varepsilon_i)
\le \max_i\mu_i+\max_i\varepsilon_i,
$$
取期望即得上界。又因 $\mu_{i^*}\le\max_i\mu_i$，式（34.11）右端后两项均非负，从而 $B_m\ge0$。当所有 $\mu_i=\mu$ 时，$\mu_{i^*}=\mu$，并且 $\max_i\widehat\mu_i=\mu+\max_i\varepsilon_i$，所以 $B_m=\mathbb E[\max_i\varepsilon_i]$。

在独立同方差正态情形下，$\max_i\varepsilon_i=\sigma Z_{(m)}$。为证明上界，对任意 $\lambda>0$ 使用指数矩的 Jensen 不等式：
$$
\exp(\lambda\mathbb E[Z_{(m)}])
\le \mathbb E[\exp(\lambda Z_{(m)})]
\le \sum_{i=1}^m\mathbb E[\exp(\lambda Z_i)]
=m\exp(\lambda^2/2).
$$
取对数并除以 $\lambda$，得到
$$
\mathbb E[Z_{(m)}]
\le \frac{\log m}{\lambda}+\frac{\lambda}{2}.
$$
当 $m>1$ 时取 $\lambda=\sqrt{2\log m}$，右端达到最小值 $\sqrt{2\log m}$；$m=1$ 时结论直接成立。

次序统计量还给出精确积分表示。独立性使 $\mathbb P(Z_{(m)}\le z)=\Phi(z)^m$，其中 $\Phi$ 为标准正态分布函数。对任意可积随机变量使用正负部期望公式，便有
$$
\mathbb E[Z_{(m)}]
=\int_0^\infty[1-\Phi(z)^m]\,dz
-\int_{-\infty}^0\Phi(z)^m\,dz .
$$
该式表明期望虚高来自整个分布函数被取 $m$ 次幂，而不只是显著性临界值的机械放大。对 $m\ge2$，又有
$$
Z_{(m)}\ge\frac{Z_1+Z_2}{2},
$$
且在 $Z_1\ne Z_2$ 时严格成立；该事件概率为一，故 $\mathbb E[Z_{(m)}]>0$，从而正态独立情形的偏差严格为正。

最后，当 $m=2$ 时，利用
$$
\max\{x_1,x_2\}=\frac{x_1+x_2+|x_1-x_2|}{2}
$$
以及 $\varepsilon_1-\varepsilon_2\sim N(0,2\sigma^2)$，得到
$$
B_2
=\frac12\mathbb E[|\varepsilon_1-\varepsilon_2|]
=\frac12\sqrt{\frac{2}{\pi}}\sqrt{2\sigma^2}
=\frac{\sigma}{\sqrt{\pi}}.
$$
$m=1$ 时没有选择，直接由无偏性得 $B_1=0$，全部结论成立。

□

这个证明不依赖策略真实收益全相等。真实均值不同，上界仍然成立；只是最优回测值同时包含噪声极值和选错策略的损失。策略相关时，独立正态的具体数值不再适用，但最大值的 Jensen 下界仍成立，上界中的独立性和共同方差则须替换为相应的联合极值控制。

选择性显著性必须与选择事件相容。若对固定策略有 $p$ 值 $U_i$，在全局零假设下每个 $U_i$ 服从或保守于均匀分布，则 Bonferroni 规则仅在 $U_i\le\alpha/m$ 时拒绝。由并集界，
$$
\mathbb P(\cup_{i=1}^m\{U_i\le\alpha/m\})
\le\sum_{i=1}^m\mathbb P(U_i\le\alpha/m)\le\alpha .
$$
该论证不需要候选策略独立，控制的是族错误率；其代价是搜索空间很大时功效降低。更一般的选择性 $p$ 值应使用 $\mathbb P(\cdot\mid i^*=i)$ 或对所有选择规则同时有效的分布，而不是把 $i^*$ 当作事先固定。样本外数据若被反复查看并用于改模，也已进入选择事件，不能继续视为独立验证。

**例 34.3**

有两个真实期望月收益均为零的策略，其样本内估计误差独立且均服从 $N(0,\sigma^2)$，其中 $\sigma=0.04$。研究员只报告回测收益较高者。求报告值的期望虚高，并说明一次性独立样本外估计的期望。

**解**

两个策略的真实均值相同，所以无论选中哪一个，都有 $\mu_{i^*}=0$。由定理 34.8 的两策略恒等式，
$$
B_2=\frac{0.04}{\sqrt{\pi}}=0.0225676 .
$$
因此，最优样本内估计的平均值约为每月 $2.25676\%$，而所选策略的真实期望月收益仍为零。该虚高不是每个回测都增加同一常数，而是对重复研究过程取期望后的结果。

若在未参与选择的新数据上得到 $\widehat\mu_{i^*}^{O}$，则由新数据与 $i^*$ 独立，
$$
\mathbb E[\widehat\mu_{i^*}^{O}]
=\mathbb E[\mu_{i^*}]=0,
\qquad
\mathbb E[\widehat\mu_{i^*}-\widehat\mu_{i^*}^{O}]=0.0225676 .
$$
若把候选数从 $2$ 增至 $m$ 且保持同一独立正态模型，则期望虚高变为 $0.04\mathbb E[Z_{(m)}]$，并有上界 $0.04\sqrt{2\log m}$。所以增加试验却不记录多重性，会使最高回测收益越来越难以解释为可实现的样本外收益。

### 34.3.3 样本内外划分与时间序列交叉验证

样本内数据用于估计参数、比较候选和形成研究假设，样本外数据用于评价已经冻结的全部规则。划分的依据不是给样本贴上不同名称，而是保持信息隔离：样本外结果在选择完成前不得影响因子、参数、成本模型或起止日期。只有满足这一条件，才有定理 34.8 中“给定所选索引，新估计仍以该策略真实均值为条件均值”的无偏性。若测试集被反复使用，它便会通过研究决策进入样本内，必须重新计入试验次数。

时间序列通常按时间先后划分，而不是随机打散。随机划分可能让训练集包含验证期之后的信息，也会因自相关、重叠持有期和共同市场状态而把邻近观测同时放入两侧，制造过于乐观的有效样本量。若训练样本的标签在验证起点之后才完全实现，应删除训练末端这些样本，称为清洗；在训练与验证之间另留间隔，称为隔离。两者处理的是信息重叠，不应被误认为能消除所有分布漂移。

保留样本外集还涉及估计效率与检验功效的权衡。训练期太短会使参数方差增大，测试期太短则无法区分真实收益与噪声； market regime 的覆盖也应事前说明。最可靠的最终检验仍是冻结模型后按时间积累的前瞻数据，而非在同一段历史上不断创造新的“样本外”切点。

为了在不触碰最终测试集的情况下比较参数，可在样本内进一步构造时间序列交叉验证。设第 $k$ 折训练终点为 $\tau_k$，隔离长度为 $h$，验证长度为 $v_k$。验证集统一写成
$$
V_k=\{\tau_k+h+1,\ldots,\tau_k+h+v_k\}.
$$
扩展窗口使用全部既往训练数据，滚动窗口只使用最近 $L$ 期：
$$
I_k^{E}=\{1,\ldots,\tau_k\},
\qquad
I_k^{R}=\{\tau_k-L+1,\ldots,\tau_k\}.
$$
两者都要求 $I_k$ 在 $V_k$ 之前，并在每一折重新执行数据清洗、特征构造、参数估计和交易规则，而不是先用全样本计算特征再切片。

记 $R_t(S;I_k)$ 为仅用 $I_k$ 训练后在验证期 $t\in V_k$ 获得的净收益，交叉验证性能为
$$
\widehat\Psi^{CV}(S)
=\sum_{k=1}^K\omega_k
\Psi\bigl(\{R_t(S;I_k):t\in V_k\}\bigr),
\qquad
\omega_k\ge0,
\qquad
\sum_{k=1}^K\omega_k=1 .
\tag{34.12}
$$
等权对应 $\omega_k=1/K$，按验证长度加权对应 $\omega_k=v_k/\sum_jv_j$。若 $\Psi$ 是夏普比率等非线性泛函，先逐折计算再加权与先拼接收益再计算通常不同，必须事前指定；拼接时还要保留跨折持仓和成本口径。

扩展窗口利用样本量随时间增长的优点，适合参数关系稳定、早期数据仍有信息的情形；其缺点是旧状态可能长期主导估计。滚动窗口能跟踪状态变化并降低陈旧数据权重，但窗口过短会增加参数方差，且不同折可能共同依赖有限的市场阶段。窗口长度因此是受检验的超参数，而不是根据最终验证表现反复调节的自由选项。

若研究目的包括选择超参数，应使用嵌套时间序列交叉验证。外层第 $k$ 折的 $V_k$ 只作评价，超参数则在 $I_k$ 内再用一组更早训练段和更晚验证段选定；随后冻结选择、在整个 $I_k$ 上重估，并只在 $V_k$ 上记录一次结果。若先对全部交叉验证折取最大性能，再把同一批折的平均值报告为所选策略的无偏评价，仍然发生了式（34.11）所示的择优偏差。

交叉验证也不会把相关收益变成独立观测。重叠训练集使各折估计相关，波动聚集和重叠标签又使验证误差相关，所以 $\widehat\Psi^{CV}$ 的标准误不能按 $K$ 个独立同分布结果计算。可根据持仓期和自相关长度使用时间块重抽样，或保留完整折间协方差；最终样本外集仍须保持未使用。这样，滚动与扩展窗口回答的是历史不同时间截面上的可重复性，而不是替代真实前瞻检验。

### 34.3.4 过拟合的定量度量与回测过拟合概率

过拟合首先表现为性能从样本内到样本外的衰减。设性能数值越大越好，且两侧采用相同费用、频率和年化口径。对策略 $S$ 定义过拟合缺口及标准化缺口为
$$
\operatorname{OG}(S)
=\widehat\Psi_{IS}(S)-\widehat\Psi_{OOS}(S),
\qquad
Z_{OF}(S)
=\frac{\operatorname{OG}(S)}
{\operatorname{se}(\widehat\Psi_{IS}(S)-\widehat\Psi_{OOS}(S))}.
\tag{34.13}
$$
正缺口表示样本外衰减，负缺口表示样本外反而改善。标准误必须包含两侧估计的协方差，不能把共享市场数据产生的相关误差当作独立。$Z_{OF}$ 用于比较缺口相对于噪声的大小；若策略由同一数据择优产生，其零假设分布也受选择影响，不能未经论证便套用普通正态临界值。

收益幅度之外，还可度量排名稳定性。令 $r_{IS}$ 与 $r_{OOS}$ 分别为该策略在 $m$ 个候选中的样本内、样本外名次，最好名次为 $1$，则排名衰减为
$$
\operatorname{RD}(S)=\frac{r_{OOS}-r_{IS}}{m-1}.
$$
其取值在 $[-1,1]$ 内；对样本内第一名而言，非负值越大，说明最优名次越难维持。缺口对量纲敏感，排名则忽略收益差的大小，两者应联合报告。

**定义 34.9（组合对称交叉验证的回测过拟合概率）**

将长度为 $T$ 的有序样本划分为偶数 $q$ 个连续时间块，保留每块内部顺序。每次选取其中 $q/2$ 块作为训练部分，其余块作为验证部分，共有 $C=\binom{q}{q/2}$ 种组合。在第 $c$ 种组合中，按训练性能选出最优策略 $i_c$，再计算它在所有 $m$ 个策略的验证性能中的名次 $r_c$，最好为 $1$。定义带连续性修正的验证相对名次及其 logit 为
$$
\omega_c=\frac{m-r_c+1/2}{m},
\qquad
\lambda_c=\log\frac{\omega_c}{1-\omega_c},
\qquad
\widehat{\operatorname{PBO}}
=\frac1C\sum_{c=1}^C\mathbf 1\{\lambda_c<0\}.
\tag{34.14}
$$
称 $\widehat{\operatorname{PBO}}$ 为回测过拟合概率的估计，即样本内最优策略在验证部分落入后半名次的组合比例。

由 $0<\omega_c<1$ 可知 logit 总有定义，且 $\lambda_c<0$ 等价于 $\omega_c<1/2$。连续性修正使最好和最坏名次也不会产生无穷 logit；并列名次应按统一规则分配，例如取平均名次。该统计量直接利用“训练最优是否在验证中失去优势”，而不是只比较某一条训练曲线和验证曲线。

若 $\widehat{\operatorname{PBO}}$ 接近 $1$，说明训练期最优策略在多数组合中跌落到验证后半区，选择结果缺乏稳健性；接近 $0$ 则说明这种名次反转较少。它不是策略未来亏损的概率，也不是对全部可能研究路径的普遍概率。其数值依赖时间块数、候选策略、性能泛函及数据状态，组合之间还共享数据而彼此相关，所以不能将 $C$ 当作独立重复试验次数。

组合对称交叉验证故意混合不同时间块，以对称地比较训练与验证名次，因此适合诊断选择不稳定性，却不等同于按时间向前的收益预测检验。实务中应同时报告式（34.13）的性能衰减、式（34.14）的 PBO，以及严格向前的滚动或扩展窗口结果；最终冻结后的样本外表现仍具有不可替代性。若需进一步校正收益显著性，还应把实际试验次数、收益偏度、峰度和序列相关纳入多重检验或重抽样，而不能仅凭一个较高的 PBO 或较低的 PBO 作机械决策。

为避免混淆固定策略与选择后策略的条件期望，定理 34.8 的样本外记号按如下方式理解：对固定的 $i,j$，独立新样本给出 $\mathbb E[\widehat\mu_i^O\mid i^*=j]=\mu_i$；将新样本估计的索引也取为所选索引，则
$$
\mathbb E[\widehat\mu_{i^*}^O\mid i^*]=\mu_{i^*},
\qquad
\mathbb E[\widehat\mu_{i^*}^O]=\mathbb E[\mu_{i^*}].
$$
这正是择优偏差证明所用的选择后条件无偏性；它不要求所选策略的真实均值等于候选集中的最大真实均值。

## 34.4 交易成本与市场冲击

回测中的毛收益假定资产能够按记录价格无障碍成交，而真实策略必须以资金、时间和风险换取成交。交易成本因此不是回测完成后的附属修正，而是信号、组合构建与执行共同面对的约束。相同的预测信号，在不同持有期、换手率和市场容量下，可能对应完全不同的净收益。本节先建立统一的成本核算口径，再比较线性与平方根冲击模型，随后在 Almgren--Chriss 框架中推导期望成本与成本方差之间的最优折中，最后把单笔执行成本连接到组合换手率与净收益。

### 34.4.1 成本分类与建模

设决策时刻为 $t_0$，决策时中间价为 $P_0$，母指令要求在 $N$ 个交易时段内完成。第 $t$ 个子指令的带符号成交数量为 $v_t$，买入时 $v_t>0$，卖出时 $v_t<0$，平均成交价为 $\widehat P_t$。带符号总数量记为 $Q=\sum_{t=1}^N v_t$，因而买入母指令有 $Q>0$，卖出母指令有 $Q<0$。所有成本先以现金计量，必要时再除以期初资产或成交名义金额转为收益率；现金成本、每股成本和基点成本不可在未换算时直接相加。

**定义 34.10（实施缺口与交易成本分解）**

从决策价格到实际组合财富之间的差额称为实施缺口。对已成交部分，以 $\sum_t v_t(\widehat P_t-P_0)$ 计量相对决策价的额外现金支出；另计佣金、税费等显性支出 $E$，以及未成交部分的机会成本 $C_{\mathrm{opp}}$。完整核算写成
$$
C_{\mathrm{IS}}
=\sum_{t=1}^N v_t(\widehat P_t-P_0)+E+C_{\mathrm{opp}}
=C_{\mathrm{spr}}+C_{\mathrm{exp}}+C_{\mathrm{tmp}}
+C_{\mathrm{perm}}+C_{\mathrm{mkt}}+C_{\mathrm{opp}}.
\tag{34.15}
$$
右端依次表示买卖价差、显性费用、暂时冲击、永久冲击和决策后无交易也会引起的价格运动所造成的成本。若到期尚有带符号数量 $D$ 未成交，并以期末中间价 $P_N$ 估值，可取 $C_{\mathrm{opp}}=D(P_N-P_0)$；强制补成交时，应改用实际补成交价格。各项可以因有利价格运动而为负，这表示节约而非修改定义。

价差成本来自以买价买入、以卖价卖出而不能按中间价成交。若第 $t$ 时段相对半价差为 $s_t/2$，仅计半价差时可用 $\sum_t |v_t|P_t^-s_t/2$ 估计，其中 $P_t^-$ 为交易前中间价。有效价差按实际成交价与同期中间价之差计算，适合事后核算；实现价差还扣除成交后的价格变化，更接近流动性提供者的收入，两者不可混作同一口径。
显性费用包括经纪佣金、交易所费用、监管征费、印花税以及可能的流动性返佣。费用常具有方向性，例如某些税费只对卖出征收；也可能设有单笔最低收费或阶梯费率。因此，即使冲击可以忽略，把所有交易统一设为双边同一基点费率也可能失真。融资利息、融券费和借券可得性属于持仓与可交易性成本，若策略需要杠杆或卖空，应与执行费用分列后共同从毛收益扣除。

暂时冲击是交易期间流动性被消耗造成的额外价格让步，订单结束后随挂单补充而衰减；永久冲击则反映交易传递的信息或持续性供需失衡，会保留在后续中间价中。二者在实证上难以完全分离。若冲击函数已由含半价差的成交价回归得到，再额外加入完整半价差便会重复计费；若模型输入是纯中间价，则应明确加入价差项。延迟成本来自信号形成至订单送达之间的价格变化，机会成本来自未成交，不能为了迎合某个成交算法而把这两项 silently 设为零。

式（34.15）是核算恒等式的组织方式，而非唯一不变的因果分解。建模时应先固定基准价格、费用方向、成交时间戳和未成交处理规则，再令各组成项互斥且穷尽。对买入订单，成本为正表示比决策价更差；对卖出订单，带符号写法使较低成交价同样转化为正成本。跨币种交易还须统一汇率时点，否则汇兑变动会与执行滑点混杂。

冲击建模的输入通常包括订单规模 $q=|v|$、同期市场成交量 $V$、参与率 $q/V$、价格波动率、价差、订单持续时间和市场方向。只用订单股数比较不同股票会忽略流动性差异，只用参与率又会忽略绝对耗时与信息泄露。训练成本模型时还应区分主动吃单与被动挂单：前者较确定地支付价差和冲击，后者存在排队、逆选择和未成交风险，不能简单把被动成交的负滑点外推为所有订单都能获得的返佣。
### 34.4.2 线性冲击与平方根冲击

线性模型以少量参数给出可优化的解析结构。考虑买入 $Q>0$ 股，$N$ 个时段的长度均为 $\Delta=T/N$，且 $v_t\ge 0$、$\sum_t v_t=Q$。令 $q_t=Q-\sum_{s=1}^t v_s$ 为第 $t$ 时段交易后的剩余数量，故 $q_0=Q$、$q_N=0$。设交易前中间价满足
$$
M_t=M_{t-1}+\sigma\sqrt{\Delta}\,\xi_t+\gamma v_t,
\qquad
\widehat P_t=M_{t-1}+\sigma\sqrt{\Delta}\,\xi_t+\eta v_t,
$$
其中 $\xi_t$ 相互独立，均值为零、方差为一；$\gamma\ge 0$ 为永久冲击系数，$\eta\ge 0$ 为暂时冲击系数。永久项进入后续中间价，暂时项只影响本次成交价。暂不计与路径无关的显性费用，并令 $\kappa=\eta-\gamma/2>0$。

**命题 34.11（离散线性冲击下的成本矩）**

在上述模型中，若交易数量在期初确定，实施成本 $C=\sum_{t=1}^N v_t(\widehat P_t-M_0)$ 的期望与方差为
$$
\mathbb E[C]
=\frac{\gamma}{2}Q^2+\kappa\sum_{t=1}^N v_t^2,
\qquad
\operatorname{Var}(C)
=\sigma^2\Delta\sum_{t=1}^N q_{t-1}^2.
\tag{34.16}
$$

**证明**

展开成交价，并记 $A_t=\sum_{s=1}^t v_s$，得到
$$
\widehat P_t-M_0
=\sum_{s=1}^t\sigma\sqrt{\Delta}\,\xi_s
+\gamma A_{t-1}+\eta v_t.
$$
因此 $C=C_{\xi}+C_{\gamma}+\eta\sum_t v_t^2$，其中
$$
C_{\xi}=\sigma\sqrt{\Delta}\sum_{t=1}^N v_t\sum_{s=1}^t\xi_s,
\qquad
C_{\gamma}=\gamma\sum_{t=1}^N v_tA_{t-1}.
$$
由于 $v_t$ 为确定性数量且 $\mathbb E[\xi_s]=0$，有 $\mathbb E[C_{\xi}]=0$。交换噪声项的求和次序，并利用 $Q-A_{s-1}=q_{s-1}$，可得
$$
C_{\xi}
=\sigma\sqrt{\Delta}\sum_{s=1}^N\xi_s\sum_{t=s}^N v_t
=\sigma\sqrt{\Delta}\sum_{s=1}^N q_{s-1}\xi_s.
$$
各 $\xi_s$ 独立且方差为一，所以 $C_{\xi}$ 的方差正是式（34.16）的右端第二式，确定性的永久冲击项不再增加方差。

对永久项使用恒等式 $A_t^2-A_{t-1}^2=2A_{t-1}v_t+v_t^2$，从 $t=1$ 到 $N$ 求和，并利用 $A_0=0$、$A_N=Q$，得到
$$
\sum_{t=1}^N v_tA_{t-1}
=\frac12\left(Q^2-\sum_{t=1}^N v_t^2\right).
$$
代入 $C_{\gamma}$，再与暂时项合并，便有
$$
\mathbb E[C]
=\frac{\gamma}{2}Q^2+
\left(\eta-\frac{\gamma}{2}\right)\sum_{t=1}^N v_t^2,
$$
即式（34.16）的第一式。两式共同得证。

□

永久冲击产生与路径无关的 $\gamma Q^2/2$，同时把暂时项的有效系数从 $\eta$ 修正为 $\kappa$。若 $\kappa\le 0$，离散目标可能不再具有本节所需的严格凸性，这通常意味着模型参数、价格时点或永久冲击定义需要重新核对，而不是直接把负系数解释为可无限制获利的执行策略。
式（34.16）还揭示了执行速度的两面性。由柯西不等式，在 $\sum_t v_t=Q$ 下，$\sum_t v_t^2\ge Q^2/N$，等号仅在等量拆单 $v_t=Q/N$ 时成立；所以只最小化期望成本会导致匀速交易。另一方面，剩余头寸越大、暴露越久，成本方差通常越高，提前成交能够降低价格风险。最优执行不是单纯追求最小滑点，而是在这两个方向相反的作用之间折中。若数量改由盘中信息自适应决定，则 $v_t$ 与 $\xi_t$ 未必独立，上述期望和方差公式不能未经重新推导便直接套用。

线性冲击便于求解析解，却不一定符合大参与率订单的实证形态。常见的平方根律把相对价格冲击写成参与率的二分之一次幂。令第 $t$ 时段市场总成交量为 $V_t>0$，相对波动率为 $\sigma_t>0$，无量纲尺度参数为 $Y>0$，则仅描述暂时冲击的一种规格为
$$
h_{\sqrt{\phantom{a}}}(v_t;t)
=Y P_t^-\sigma_t\operatorname{sgn}(v_t)
\left(\frac{|v_t|}{V_t}\right)^{1/2},
\qquad
C_{\mathrm{tmp}}^{\sqrt{\phantom{a}}}
=Y\sum_{t=1}^N P_t^-\sigma_t|v_t|
\left(\frac{|v_t|}{V_t}\right)^{1/2}.
\tag{34.17}
$$
这里 $h_{\sqrt{\phantom{a}}}$ 是每股带符号价格偏移，乘以 $v_t$ 后成为非负冲击支出。波动率和成交量必须与订单持续时间匹配：把日波动率直接用于一分钟订单，或把全市场日成交量用于单个短时段，都会系统性地错估冲击。

在 $P_t^-$、$\sigma_t$ 和 $V_t$ 相同的简化条件下，等额拆成 $N$ 笔、每笔数量为 $Q/N$ 的总冲击支出与 $N(Q/N)^{3/2}=Q^{3/2}/\sqrt N$ 成正比。因此总现金冲击仍随母订单规模凸增，但增速低于线性每股冲击所产生的二次总成本。这个结论依赖各时段流动性独立补给的假设；若前一笔交易持续消耗后续流动性，简单分段求和会低估成本。

平方根指数不是普适常数。更一般地可用指数 $\delta>0$，并通过成交前基准、订单方向和参与率进行估计。对非零冲击取对数可得到斜率 $\delta$ 的回归关系，但零冲击、被动成交和未成交样本不能随意删除，否则会产生选择偏差。尺度参数 $Y$ 会随市场、订单类型和样本期变化，模型残差还需按波动率与流动性状态分组检查。平方根模型适合校准和容量评估，线性模型适合透明优化；实际系统可以二者结合，但不能把描述同一暂时冲击的两个版本相加。
### 34.4.3 最优执行与 Almgren--Chriss 目标

最优执行首先是一个带信息约束的随机控制问题。设 $\{\mathcal F_t\}$ 记录价格和流动性信息，$v_t$ 在第 $t$ 时段交易前依据 $\mathcal F_{t-1}$ 决定。对买入母指令，可行集可要求 $v_t\ge 0$、$q_t=Q-\sum_{s\le t}v_s\ge 0$，并以 $\mathbb P(q_N=0)=1$ 保证期末完成；还可加入参与率上限 $0\le v_t\le \bar\rho_tV_t$、最小交易单位、涨跌停和禁交易时段。若允许未完成，则须用终端惩罚或明确的机会成本替代强制完成条件。

一般目标不仅惩罚平均成本，还惩罚成本的不确定性。一种数学表述为
$$
\inf_{v\in\mathcal A(Q)}
\left\{
\mathbb E[C(v)]
+\lambda\operatorname{Var}(C(v))
+\varrho\,\mathbb E[\Psi(C_{\mathrm{opp}}(v))]
\right\},
\qquad \lambda\ge 0,\quad \varrho\ge 0,
\tag{34.18}
$$
其中 $\mathcal A(Q)$ 是满足信息、成交与仓位约束的策略集，$\Psi$ 为未成交成本的凸惩罚。$\lambda$ 越大，策略越重视成本波动；$\varrho$ 越大，未成交风险越受惩罚。若强制全部成交，则可省略最后一项。式（34.18）还可扩展为对最大参与率、终端库存和尾部风险的约束，但均值—方差中的方差项一般不具备直接按时间分解的动态规划结构，不能不加处理地逐期最小化同一目标。

Almgren--Chriss 框架作出一组有意简化的假设：价格服从算术随机游走，冲击对数量线性，交易轨迹在期初确定，并以期望成本加成本方差衡量执行质量。这些假设把随机控制转化为确定性的凸二次规划。算术价格可能出现负值，但在短时间执行中，它往往比几何模型更便于刻画绝对价格风险；模型是否适用仍须依据执行期限和价格量级判断。

沿用命题 34.11 的记号，并暂时忽略与轨迹无关的显性费用。由式（34.16）直接得到离散均值—方差目标
$$
\begin{aligned}
J_{\mathrm{AC}}(v)
&=\mathbb E[C(v)]+\lambda\operatorname{Var}(C(v))\\
&=\frac{\gamma}{2}Q^2
+\kappa\sum_{t=1}^N v_t^2
+\lambda\sigma^2\Delta\sum_{t=1}^N q_{t-1}^2\\
&=\frac{\gamma}{2}Q^2
+\kappa\sum_{t=1}^N(q_{t-1}-q_t)^2
+\lambda\sigma^2\Delta\sum_{t=1}^N q_{t-1}^2 .
\end{aligned}
\tag{34.19}
$$
第一个等号后的各项分别对应永久冲击、有效暂时冲击和价格风险。常数 $\gamma Q^2/2$ 不影响最优点，因此求轨迹时可在目标中删去，但在比较不同母订单规模的总成本时必须保留。
**定理 34.12（离散 Almgren--Chriss 最优轨迹）**

设 $\kappa>0$。当 $\lambda>0$ 时，令
$\theta=\lambda\sigma^2\Delta/\kappa$，并取 $\omega=\operatorname{arcosh}(1+\theta/2)>0$。在 $q_0=Q$、$q_N=0$ 且 $v_t=q_{t-1}-q_t\ge 0$ 的可行轨迹中，式（34.19）的唯一最小化轨迹为
$$
q_t^*
=Q\frac{\sinh((N-t)\omega)}{\sinh(N\omega)},
\qquad
v_t^*
=\frac{2Q\sinh(\omega/2)\cosh((N-t+1/2)\omega)}
{\sinh(N\omega)},
\qquad 0<t\le N,
\tag{34.20}
$$
其中 $q_t^*$ 对 $0\le t\le N$ 成立，且 $v_t^*=q_{t-1}^*-q_t^*$。当 $\lambda=0$ 时，唯一最优轨迹为 $q_t^*=Q(N-t)/N$，即 $v_t^*=Q/N$；它也是式（34.20）在 $\omega\to 0$ 时的极限。

**证明**

删去常数 $\gamma Q^2/2$，只考虑关于 $q_1,\ldots,q_{N-1}$ 的函数
$$
F(\boldsymbol q)
=\kappa\sum_{t=1}^N(q_{t-1}-q_t)^2
+\lambda\sigma^2\Delta\sum_{t=1}^N q_{t-1}^2 .
$$
第一项的 Hessian 为 $2\kappa$ 乘以离散Dirichlet能量矩阵。若某个增量 $\boldsymbol d$ 使该二次项为零，则 $d_{t-1}=d_t$ 对所有 $t$ 成立；边界 $d_0=d_N=0$ 又迫使所有 $d_t=0$。故即使 $\lambda=0$，$F$ 在仿射可行集上也严格凸，驻点若存在便是唯一全局最小点。求得的无约束驻点若满足 $v_t^*\ge0$，也就是带禁止卖出约束的解。

对任意内部坐标 $q_t$，$1\le t\le N-1$，只有含 $q_t$ 的两个交易平方项和一个风险项参与求导，故
$$
\frac{\partial F}{\partial q_t}
=2\kappa(2q_t-q_{t-1}-q_{t+1})
+2\lambda\sigma^2\Delta q_t=0.
$$
整理后得到线性递推
$$
q_{t+1}-(2+\theta)q_t+q_{t-1}=0,
\qquad 1\le t\le N-1.
$$
当 $\lambda>0$ 时，$\theta>0$。特征方程
$r^2-(2+\theta)r+1=0$ 的两根乘积为一，并可写成 $r=e^{\pm\omega}$，因为
$$
2\cosh\omega=e^\omega+e^{-\omega}=2+\theta.
$$
所以递推的通解为 $q_t=Ae^{t\omega}+Be^{-t\omega}$。由 $q_0=Q$ 得 $A+B=Q$；由 $q_N=0$ 得 $Ae^{N\omega}+Be^{-N\omega}=0$。解这两个线性方程，
$$
A=-Q\frac{e^{-N\omega}}{2\sinh(N\omega)},
\qquad
B=Q\frac{e^{N\omega}}{2\sinh(N\omega)}.
$$
代回通解便得到式（34.20）的 $q_t^*$。再利用
$\sinh(x+y)-\sinh x=2\sinh(y/2)\cosh(x+y/2)$，取 $x=(N-t)\omega$、$y=\omega$，即得所示 $v_t^*$。
由于 $\omega>0$，且对 $1\le t\le N$ 有 $(N-t+1/2)\omega>0$，式（34.20）中的双曲余弦和双曲正弦均为正，所以 $v_t^*>0$。同时 $\sum_t v_t^*=q_0^*-q_N^*=Q$，故所得轨迹确实可行。严格凸性排除其他最小点，唯一性得证。

当 $\lambda=0$ 时，$\theta=0$，递推退化为 $q_{t+1}-2q_t+q_{t-1}=0$，即相邻交易量相等。结合两端边界可知 $q_t$ 是线性函数，故 $q_t^*=Q(N-t)/N$。此外，对 $0<t<N$ 使用双曲正弦的等价无穷小，有
$$
\lim_{\omega\to0}Q\frac{\sinh((N-t)\omega)}{\sinh(N\omega)}
=Q\frac{N-t}{N},
$$
所以两种情形连续衔接，定理全部得证。

□

式（34.20）给出了风险厌恶程度的清晰比较静态。$\lambda$ 增大使 $\omega$ 增大，而当 $t\ge1$ 时，剩余头寸比率近似按 $e^{-t\omega}$ 衰减，更多交易被安排在前段，以减少价格暴露。$\kappa$ 或 $\eta$ 增大则使 $\omega$ 减小，轨迹更接近匀速，因为频繁的大额子订单会付出更高暂时冲击。波动率 $\sigma$ 增大与 $\lambda$ 增大同向，说明高波动资产需要更积极地缩短执行暴露，但这并不消除冲击成本。

期限 $T$ 与时段数 $N$ 也会改变结论。增加可交易时段为拆单提供更多自由度，却不保证实际成本单调下降，因为更长的等待增加了价格风险和信息泄露；把 $N$ 固定而把 $\Delta$ 缩短，则式（34.16）的方差项随之缩小。最优期限若也作为决策变量，就必须在目标中加入机会成本、终端约束或信号衰减，不能仅凭本节的固定期限解推断“交易越慢越好”。

若存在参与率上限、价格限价或随机成交量，双曲正弦解未必可行。此时应在原凸约束集上求解，并用 Karush--Kuhn--Tucker 条件检验起作用的不等式约束。若成交量随机且策略根据其实时调整，命题 34.11 的确定性轨迹假设不再成立，需要条件期望、情景模拟或随机规划。解析解的价值在于提供基准轨迹和参数直觉，而不是免除这些市场约束。
在连续时间版本中，同一折中可写成变分问题，以核对离散解的形式。令 $x(t)$ 为时刻 $t$ 的剩余数量，$x(0)=Q$、$x(T)=0$，交易速率为 $-\dot x(t)$。若连续模型的有效暂时成本率为 $\eta_c\dot x(t)^2$，价格波动参数为 $\sigma_c$，则去掉常数后的目标为
$$
F_c[x]=\int_0^T\left(\eta_c\dot x(t)^2
+\lambda\sigma_c^2x(t)^2\right)\,\mathrm dt .
$$
这里的 $\eta_c$ 和 $\sigma_c$ 已吸收连续化所需的时间量纲，不能把离散模型的 $\eta$、$\sigma$ 不经换算便代入。对任意满足 $h(0)=h(T)=0$ 的光滑扰动 $h$，在 $x+\varepsilon h$ 下展开并保留一阶项，分部积分得到
$$
\left.\frac{\mathrm d}{\mathrm d\varepsilon}F_c[x+\varepsilon h]\right|_{\varepsilon=0}
=2\int_0^T\left(-\eta_c\ddot x+\lambda\sigma_c^2x\right)h\,\mathrm dt .
$$
由于该式须对所有 $h$ 为零，欧拉--拉格朗日方程为 $\ddot x=\nu^2x$，其中 $\nu=\sqrt{\lambda\sigma_c^2/\eta_c}$。代入两端边界，得到
$$
x^*(t)=Q\frac{\sinh(\nu(T-t))}{\sinh(\nu T)},
\qquad 0\le t\le T.
$$
这与式（34.20）同为双曲正弦轨迹，但一个是离散剩余量、一个是连续剩余量。连续目标关于 $(x,\dot x)$ 的二次项系数非负，且 $\eta_c>0$，所以上述驻点确实给出最小值；当 $\lambda\to0$ 时，其极限同样是直线 $Q(1-t/T)$。

均值—方差参数 $\lambda$ 不是可以跨策略直接比较的纯数字。成本以现金计量时，$\mathbb E[C]$ 与 $\lambda\operatorname{Var}(C)$ 的量纲必须一致，故 $\lambda$ 的单位随成本货币和数量单位改变。报告有效前沿时，应沿一组 $\lambda$ 同时列出期望成本、成本标准差、完成时间和最大参与率，而不能只报告最优轨迹。两个模型若使用不同价格基准或费用口径，即使 $\lambda$ 相同，其风险厌恶程度也不具有直接可比性。
### 34.4.4 换手率与净收益

执行模型描述一笔母指令如何在市场中完成，换手率则描述组合层面需要多少交易。两者连接的桥梁是成交名义金额。设第 $t$ 次调仓前资产净值为 $A_t^->0$，资产 $i$ 的调仓前、后权重分别为 $w_{t,i}^-$ 和 $w_{t,i}^+$，成交名义金额 $D_{t,i}=A_t^-(w_{t,i}^+-w_{t,i}^-)$。本节采用双边成交名义金额的一半定义单边换手率
$$
\mathcal T_t=\frac{1}{2A_t^-}\sum_{i=1}^m|D_{t,i}|
=\frac12\sum_{i=1}^m|w_{t,i}^+-w_{t,i}^-|.
$$
有些数据供应商把买入额、卖出额或二者较小值称为换手率；含现金、外部申赎和费用时，这些口径并不必然相等。因此，报告“年化换手率为多少”时必须同时说明分子、分母、是否计入现金以及调仓频率。权重差应使用价格漂移后的调仓前权重，而不能直接比较相邻两期的事后持仓权重，否则市场涨跌会被误计为主动交易。

**命题 34.13（换手率、成本拖累与净收益）**

若资产 $i$ 在第 $t$ 次调仓中每单位成交名义金额的成本为 $c_{t,i}\ge0$，总成本为 $K_t=\sum_i c_{t,i}|D_{t,i}|$，且毛简单收益率 $R_t^{\mathrm g}$ 与成本使用同一期初净值基准，则净简单收益率为
$$
R_t^{\mathrm n}
=R_t^{\mathrm g}-\sum_{i=1}^m c_{t,i}|w_{t,i}^+-w_{t,i}^-|
=R_t^{\mathrm g}-k_t,
\qquad
k_t=2\bar c_t\mathcal T_t
\quad\Longleftrightarrow\quad c_{t,i}=\bar c_t\ \forall i .
\tag{34.21}
$$

**证明**

支付交易成本前，组合按毛收益增长的净值为 $A_t^-(1+R_t^{\mathrm g})$。成本从同一组合财富中支付后，净值为 $A_t^-(1+R_t^{\mathrm g})-K_t$，故净简单收益率为
$$
R_t^{\mathrm n}
=\frac{A_t^-(1+R_t^{\mathrm g})-K_t-A_t^-}{A_t^-}
=R_t^{\mathrm g}-\frac{K_t}{A_t^-}.
$$
代入 $D_{t,i}$ 的定义，便有
$$
\frac{K_t}{A_t^-}
=\sum_{i=1}^m c_{t,i}\frac{|D_{t,i}|}{A_t^-}
=\sum_{i=1}^m c_{t,i}|w_{t,i}^+-w_{t,i}^-|,
$$
这就是式（34.21）的第一个等号。若所有资产在该期使用相同成本率 $\bar c_t$，则
$$
k_t=\bar c_t\sum_{i=1}^m|w_{t,i}^+-w_{t,i}^-|
=2\bar c_t\mathcal T_t.
$$
反向地，若 $k_t=2\bar c_t\mathcal T_t$ 被定义为共同成本率口径，就意味着各资产已按同一 $\bar c_t$ 计费；异质成本时只能用加权平均成本率还原。命题得证。

□
式（34.21）末尾的双箭头仅表示“统一费率假设”和“代入换手率后的表达式”之间的口径换算，不表示从某一期观察到的总成本等式可以反推出每项资产费率相同。异质费率下，可定义成交加权平均费率
$\widetilde c_t=K_t/(2A_t^-\mathcal T_t)$，从而仍有 $k_t=2\widetilde c_t\mathcal T_t$；但 $\widetilde c_t$ 本身随调仓结构变化，不能当作外生常数。

多期净收益必须逐期复利。由式（34.21），一段包含 $H$ 次调仓的样本满足
$$
1+R_{1:H}^{\mathrm n}
=\prod_{t=1}^H(1+R_t^{\mathrm n})
=\prod_{t=1}^H(1+R_t^{\mathrm g}-k_t).
$$
对数净收益相应为 $\sum_t\log(1+R_t^{\mathrm g}-k_t)$。因此，把每次交易成本从累计毛收益率末端一次性减去，一般并不精确；只有当成本与收益足够小、或明确采用一阶近似时，才可写成累计收益之差。若成本在期初支付，毛收益财富基数已经扣费，式中的 $R_t^{\mathrm g}$ 必须仍按约定的同一基准计算，避免同时缩小基数又重复扣费。

在共同成本率 $\bar c$ 不变、换手率为 $\mathcal T_t$ 的特殊情形下，年度成本拖累的一阶估计为 $2\bar c\sum_t\mathcal T_t$。若年换手定义为 $\mathcal T_{\mathrm{ann}}=\sum_t\mathcal T_t$，则净年化毛 alpha 的常用近似是
$$
\alpha_{\mathrm n}\approx\alpha_{\mathrm g}-2\bar c\,\mathcal T_{\mathrm{ann}}.
$$
例如单边成本以基点表示时，系数二来自一买一卖的双边成交，而不是把同一笔交易收费两次。若数据中的“换手率”已经是双边成交总额除以净值，就不能再乘二。近似式适合快速筛选策略，正式回测仍应逐笔计费并复利。

换手率相同并不意味着冲击成本相同。线性每股冲击下，总暂时支出与 $\sum_t v_t^2$ 有关；平方根冲击下，则与 $\sum_t |v_t|^{3/2}V_t^{-1/2}$ 有关。少量大额调仓和大量小额调仓可以有相同的 $\sum_t|v_t|$，却因成交集中度、市场成交量和波动率不同而产生不同成本。小盘股、事件驱动状态与开盘收盘时段尤其不能共用一个固定基点费率。因而“毛 alpha 减去换手率乘固定费率”只是线性成本近似，不是对市场冲击的普适定律。
在组合构建阶段，净收益关系可直接进入目标函数。若预期毛收益向量为 $\boldsymbol\mu_t$，调仓向量为 $\Delta\boldsymbol w_t=\boldsymbol w_t^+-\boldsymbol w_t^-$，共同线性成本率下的单期预期净收益可写成
$$
\boldsymbol w_t^{+\top}\boldsymbol\mu_t
-2\bar c_t\mathcal T_t
=\boldsymbol w_t^{+\top}\boldsymbol\mu_t
-\bar c_t\sum_{i=1}^m|\Delta w_{t,i}|.
$$
绝对值项是凸的，可用正负交易拆分转化为凸优化；加入风险惩罚后，它会产生不交易区间，使微弱信号不值得触发调仓。若把该项换成 $\sum_i(\Delta w_{t,i})^2$，得到的是便于求解的二次换手惩罚，但它不再等于实际现金成本，只适合作为抑制交易的正则化近似。

对非线性冲击，可将单资产成本函数 $f_{t,i}(|\Delta w_{t,i}|)$ 直接纳入目标，并用分段线性函数近似平方根律。由于每股平方根冲击对应总现金成本的 $3/2$ 次幂，拆单与调仓频率会共同改变净收益。若市场容量随时间随机， worst-case 成本或高置信度成本约束还可用于限制极端流动性状态下的仓位，但所用置信水平、持有期和压力情景必须单独披露。

净收益回测还需处理信号衰减。更快调仓可能在 alpha 消失前捕获收益，却增加换手；更慢执行可以节省冲击，却使成交价格偏离信号价格。正确比较应固定信号生成时点，对每种执行方案同时记录实施缺口、未成交比例和净组合收益。若只把实际成交价格替换进回测，而保留原本不可能成交的全部信号收益，便会高估执行算法的价值。税费、融资、借券、管理费与申赎现金流若属于评价口径，也应在净收益中另列，不能藏在冲击参数中。
**例 34.4**

某执行系统需要在两个等长时段内买入 $Q=12000$ 股。取 $\Delta=1$、$\sigma=0.20$、$\gamma=0.0002$、$\eta=0.0003$ 和 $\lambda=0.01$，所有参数均采用与现金成本相一致的单位。比较式（34.20）的最优轨迹与两笔等量交易。随后把平方根律作为另一种独立冲击校准，比较两种轨迹的暂时成本。最后，某组合期初净值为 $1000$ 万元，一次调仓的单边换手率为 $0.15$，所有成交的共同单边成本率为 $8$ 个基点，本期毛收益率为 $1.20\%$，求该期净收益率。

**解**

先求离散 Almgren--Chriss 轨迹。有效暂时冲击系数与无量纲风险参数分别为
$$
\kappa=\eta-\frac{\gamma}{2}=0.0002,
\qquad
\theta=\frac{\lambda\sigma^2\Delta}{\kappa}
=\frac{0.01\times0.20^2}{0.0002}=2.
$$
故 $\cosh\omega=1+\theta/2=2$。由 $N=2$ 和双曲角公式，
$$
q_1^*
=Q\frac{\sinh\omega}{\sinh(2\omega)}
=\frac{Q}{2\cosh\omega}
=\frac{12000}{4}=3000.
$$
因而最优两笔交易为 $v_1^*=12000-3000=9000$ 股、$v_2^*=3000$ 股，剩余头寸轨迹为 $(12000,3000,0)$。等量交易的轨迹则为 $(12000,6000,0)$，交易量均为 $6000$ 股。

对最优轨迹，永久冲击成本为 $\gamma Q^2/2=14400$，有效暂时冲击成本为
$$
\kappa(9000^2+3000^2)=18000,
$$
所以 $\mathbb E[C^*]=32400$。成本方差为
$$
\operatorname{Var}(C^*)
=0.20^2(12000^2+3000^2)
=6120000,
$$
从而 $J_{\mathrm{AC}}^*=32400+0.01\times6120000=93600$。对等量轨迹，同样计算得到
$$
\mathbb E[C^{\mathrm{eq}}]
=14400+0.0002(6000^2+6000^2)=28800,
$$
$$
\operatorname{Var}(C^{\mathrm{eq}})
=0.20^2(12000^2+6000^2)=7200000,
\qquad
J_{\mathrm{AC}}^{\mathrm{eq}}=28800+72000=100800.
$$
等量交易的期望成本低 $3600$，但成本方差更高；在给定 $\lambda$ 下，其目标值比最优轨迹高 $7200$。这与“降低风险需要支付一定期望成本”的解释一致。
再单独使用式（34.17）校准暂时冲击，不把结果叠加到刚才的线性成本上。设两个时段均有 $P_t^-=100$、$\sigma_t=0.02$、$V_t=30000$ 和 $Y=0.5$，则 $YP_t^-\sigma_t=1$。最优线性轨迹的两段参与率分别为 $0.3$ 和 $0.1$，平方根模型给出的总暂时成本为
$$
9000\sqrt{0.3}+3000\sqrt{0.1}
\approx5878.19.
$$
等量轨迹的两段参与率均为 $0.2$，相应成本为
$$
6000\sqrt{0.2}+6000\sqrt{0.2}
\approx5366.56.
$$
平方根模型同样显示前置交易增加暂时冲击，但两种模型的数值不应相加，因为它们是在替代性地描述同一成本来源。若要据此重选轨迹，应把平方根成本代入原优化问题重新求解，而不能继续沿用线性模型的最优权重。

最后计算组合净收益。共同成本率为 $\bar c=8/10000=0.0008$，由式（34.21）得
$$
k=2\times0.0008\times0.15=0.00024.
$$
这就是 $2.4$ 个基点，对应现金成本 $10000000\times0.00024=2400$ 元。因此
$$
R^{\mathrm n}=0.012-0.00024=0.01176,
$$
即净收益率为 $1.176\%$。毛收益金额为 $120000$ 元，扣除 $2400$ 元成本后为 $117600$ 元，与上述收益率一致。若把 $2400$ 元再从已经按扣费后净值计算的收益中减一次，就会重复计费。

本例的三个计算分别回答不同问题：双曲正弦轨迹在指定均值—方差偏好下安排交易，平方根律提供另一种非线性成本校准，换手率恒等式则把成交费用转换为组合收益拖累。只有把信号收益、实际成交、费用和逐期复利置于同一时间轴，才能得到可实施的策略净表现。
成本参数的估计应与交易数据的时间结构一致。永久冲击系数需要根据成交后的中间价路径估计，暂时冲击系数则依赖成交期间的价格让步与流动性恢复速度；若只记录每笔成交均价而没有后续报价，两者通常不能同时识别。平方根律中的 $Y$ 也会吸收价差、订单类型与波动率定义的影响，跨数据源迁移前必须重新校准。对自成交、异常成交、停牌前后和报价缺失，应制定统一的数据清洗规则，并保留规则对成本估计的敏感性分析。

事后评价执行算法时，可把实际实施缺口与同基准下的匀速轨迹、最优解析轨迹和风险限额比较，但不能把事后才知道的最佳成交时点当作可实现基准。合理基准只能使用决策时可得的信息，并满足相同完成期限和参与率约束。若实际订单因价格触及限价而未完成，应同时报告成交率与机会成本；只统计已成交子单的滑点，会系统性偏爱那些迟迟不成交的算法。

容量分析则应把策略收益和成本放在同一规模网格上。随着管理规模增加，目标仓位与成交名义金额上升，参与率和冲击通常随之增加，信号之间还可能争抢同一流动性。对每一规模重新计算成交计划、净收益和完成概率，得到的净 alpha 衰减曲线比单一“最大容量”数字更可靠。压力测试至少应同时改变波动率、成交量、价差和冲击参数，因为这些变量在流动性紧张时往往共同恶化。若策略只有在成本长期维持历史低位时才盈利，其样本外稳健性应被判为不足，而不能以平均成本估计掩盖尾部执行风险。
组合发生申购、赎回或分红时，换手率还需区分被动现金流交易与主动信号调仓。申购带来的买入虽然可能不是 alpha 信号所致，仍会真实支付价差和冲击；完全从成本计算中删除会高估投资者净收益，把它全部归因于策略信号又可能扭曲策略比较。较清晰的做法是分别报告总交易换手、主动调仓换手及其各自成本，再在基金层面合并全部实际支出。对跨资产组合，还应把期货保证金变化与合约成交名义金额区分开，不能用保证金占用代替交易规模。

最后，净收益评价应保持费用方向与税务主体一致。同一交易所费用可能按成交、按笔或按日合并收取，最低收费会使小额高频拆单承担更高的有效费率；卖方税费与买方费用也不能简单互换。若回测使用不含费用的信号权重，而实盘采用费用后自融资权重，两者的仓位路径会逐步偏离。将实际现金账、持仓账和成本账逐期对账，才能确认式（34.21）所用权重与净值确实来自同一条财富路径。
上述费用口径也决定了执行优化的比较基准。以下把 Almgren--Chriss 目标写成同一财富口径下的期望成本与成本方差之和。设初始需要卖出 $Q>0$ 股，共有 $N$ 个等长交易时段，$x_j$ 为第 $j$ 个时段末的剩余头寸，$v_j=x_{j-1}-x_j$。永久冲击只取决于总成交量，价格增量均值为零且各时段独立，单位头寸在一个时段内的成本波动为 $\sigma$，暂时冲击系数 $\kappa>0$，风险厌恶系数 $\lambda\ge0$。于是优化变量为 $x_1,\ldots,x_{N-1}$，目标为
$$
\begin{aligned}
x_0&=Q,\qquad x_N=0,\qquad v_j=x_{j-1}-x_j,\\
J_\lambda(x_1,\ldots,x_{N-1})
&=\frac{\gamma Q^2}{2}
+\kappa\sum_{j=1}^N(x_{j-1}-x_j)^2
+\lambda\sigma^2\sum_{j=0}^{N-1}x_j^2 .
\end{aligned}
\tag{34.22}
$$
这里永久冲击项与轨迹无关，但保留它能避免在比较不同完成数量时漏计成本。

**定理 34.14（离散 Almgren--Chriss 最优轨迹的补充证明）**

令 $\rho=\lambda\sigma^2/\kappa$，并令 $\theta=\operatorname{arcosh}(1+\rho/2)$。当 $\rho>0$ 时，式（34.22）的唯一最优解及其交易量为
$$
x_j^*=Q\frac{\sinh((N-j)\theta)}{\sinh(N\theta)},\qquad
v_j^*=\frac{2Q\sinh(\theta/2)}{\sinh(N\theta)}
\cosh\!\left(\left(N-j+\frac12\right)\theta\right),
\qquad 0\le j\le N .
\tag{34.23}
$$
当 $\rho=0$ 时，唯一最优轨迹为 $x_j^*=Q(1-j/N)$。此外，所有 $v_j^*$ 均为正；当 $\lambda$ 趋于无穷时，$v_1^*$ 趋于 $Q$，其余交易量趋于零，即极限轨迹在首个时段完成交易。
**证明**

先证明解唯一。任取不全为零的方向 $d_1,\ldots,d_{N-1}$，并补令 $d_0=d_N=0$。目标函数沿该方向的二阶方向导数与
$$\kappa\left[\sum_{j=1}^{N-1}(d_j-d_{j-1})^2+d_{N-1}^2\right]+\lambda\sigma^2\sum_{j=1}^{N-1}d_j^2$$
只相差一个正常数因子。若前一括号为零，则 $d_1=d_0=0$，再由 $d_j=d_{j-1}$ 逐次得到所有 $d_j$ 为零，矛盾。因此 $J_\lambda$ 严格凸；又因交易平方项使其趋于强制，最小值存在且唯一。

在一阶最优条件中，$x_j$ 同时出现在第 $j$ 笔、第 $j+1$ 笔交易成本以及风险项中。对 $1\le j\le N-1$ 求导并除以 $2\kappa$，得到
$2x_j-x_{j-1}-x_{j+1}+\rho x_j=0$，即 $x_{j+1}-(2+\rho)x_j+x_{j-1}=0$。由 $2\cosh\theta=2+\rho$，式（34.23）的剩余头寸满足这一递推；同时 $x_0^*=Q$、$x_N^*=0$，故它就是唯一驻点和全局最小点。风险中性时 $\rho=\theta=0$，对双曲正弦比取 $\theta$ 趋于零的极限，得到 $x_j^*=Q(N-j)/N$，其每笔交易量均为 $Q/N$。

再由恒等式 $\sinh a-\sinh b=2\sinh((a-b)/2)\cosh((a+b)/2)$，直接计算 $x_{j-1}^*-x_j^*$ 即得式（34.23）中的 $v_j^*$。由于 $\theta>0$ 且双曲余弦为正，$1\le j\le N$ 时 $v_j^*>0$，所以最优解自动满足不反向交易及剩余头寸非负的要求。

最后，固定 $j\ge1$，当 $\theta$ 趋于无穷时，$\sinh((N-j)\theta)/\sinh(N\theta)$ 与 $e^{-j\theta}$ 的比趋于一，故 $x_j^*$ 趋于零。于是 $v_1^*=Q-x_1^*$ 趋于 $Q$；对 $j\ge2$，由 $0<v_j^*<x_{j-1}^*$ 可知 $v_j^*$ 趋于零。这证明了风险极度厌恶时的前置完成结论。

□

定理中的方差项取决于剩余风险敞口，而不是已成交金额。因而提高 $\lambda$ 并不等同于任意提前所有子单：双曲正弦轨迹同时考虑每个时段的暂时冲击增量与提前交易所节省的持仓风险。若价格波动、冲击系数或参与率上限随时段变化，则常系数递推不再适用，应在每个时段使用相应参数重新求解凸优化问题。

## 34.5 容量、约束与实际可行性

在量化投资的工程实践中，回测净值的优异表现并不自动保证策略在资金规模扩大后的可落地性。当策略管理的资产规模从数千万元上升到数亿元乃至更高时，资产价格对交易行为的逆向移动、各类硬性交易约束以及资金流动性限制将显著削弱组合的实际收益。策略容量并非单一的经验阈值，而是一个由超额收益信号结构、标的资产流动性分布、调仓频率与风险约束共同决定的经济学与最优化边界。本节承接第 15 章与第 31 章关于约束优化与动态投资组合的数学框架，建立容量估计、可行投资组合构建以及杠杆保证金约束的严格表述。

### 34.5.1 容量估计的数学依据

策略的资金容量是指在保持特定收益率目标或夏普比率底线的前提下，该策略所能容纳的最大管理资产规模（Assets Under Management，记为 $A$）。当规模 $A$ 增大时，组合为了维持目标权重必须执行更大的名义成交量，进而在市场中引发更高的暂时冲击与永久冲击。

**定义 34.15（策略资金容量与边际收益衰减）**

设策略在零市场冲击下的理论预期毛超额收益率为 $\alpha_0 > 0$，单期单边换手率为 $\tau \in (0, 1]$。管理资产规模为 $A > 0$。根据第 34.4 节的市场冲击规律，单位资金承担的单期总冲击成本率表示为规模 $A$ 与换手率 $\tau$ 的增函数 $c(A, \tau) > 0$。策略的单期期望净超额收益率为
$$
\alpha_{\mathrm{net}}(A) = \alpha_0 - c(A, \tau).
$$
总期望净超额收益金额为 $\Pi(A) = A \alpha_{\mathrm{net}}(A) = A \alpha_0 - A c(A, \tau)$。
1. 若投资人要求的最低净超额收益率为 $\alpha_{\min} \ge 0$，则策略的保本（或达标）极限容量 $A_{\max}$ 定义为满足 $\alpha_{\mathrm{net}}(A) \ge \alpha_{\min}$ 的最大规模：
$$
A_{\max} = \sup \{A > 0 : \alpha_0 - c(A, \tau) \ge \alpha_{\min}\}.
$$
2. 策略的最优经济容量 $A^*$ 定义为使总期望净超额收益金额达到极大化的规模：
$$
A^* = \arg\max_{A > 0} \Pi(A) = \arg\max_{A > 0} A\left(\alpha_0 - c(A, \tau)\right).
\tag{34.24}
$$

当总交易成本可局部参数化为 $c(A, \tau) = \kappa_0 \tau^{1+\beta} A^\gamma$（其中 $\kappa_0 > 0$，$\beta \ge 0$，$\gamma > 0$ 分别为流动性常数、换手弹性与规模冲击弹性）时，函数 $\Pi(A) = A \alpha_0 - \kappa_0 \tau^{1+\beta} A^{1+\gamma}$ 具有明确的凹性极值。由于 $\gamma > 0$，一阶驻点导数满足
$$
\frac{\mathrm d \Pi}{\mathrm d A} = \alpha_0 - (1+\gamma)\kappa_0 \tau^{1+\beta} A^\gamma = 0,
$$
从而唯一极值点由解析表达式给出：
$$
A^* = \left(\frac{\alpha_0}{(1+\gamma)\kappa_0 \tau^{1+\beta}}\right)^{1/\gamma}.
$$
在典型的线性冲击假定下，$\gamma = 1$，此时边际冲击成本是平均冲击成本的两倍，最大收益规模为 $A^* = \alpha_0 / (2 \kappa_0 \tau^{1+\beta})$，而净收益降至零的极限容量为 $A_{\max} = \alpha_0 / (\kappa_0 \tau^{1+\beta}) = 2 A^*$。这表明，当追求策略的总超额收益绝对值最大化时，管理规模应当严格控制在极限容量的一半；若进一步扩大规模至 $A^*$ 以上，边际新增资金带来的冲击成本将超过其带来的理论 alpha，导致总收益金额反而下降。

### 34.5.2 约束优化下的可实现组合

在第 15 章与第 31 章中，无摩擦市场的均值—方差优化给出了无约束或仅含预算约束的解析解。但在实际交易执行中，组合经理必须在每一期调仓中面对由头寸上限、行业中性化、换手率惩罚及交易成本共同构成的非平庸约束集合。若脱离这些现实摩擦，模型计算出的理论最优权重往往包含极端的多空头寸或引发毁灭性的换手成本，导致理论组合无法在实盘中复现。

考虑具有 $n$ 个风险资产的单期再平衡问题。设期初已持有权重向量为 $\boldsymbol w_0 = (w_{0,1}, \ldots, w_{0,n})^\top \in \mathbb R^n$，且满足资金预算约束 $\boldsymbol 1^\top \boldsymbol w_0 = 1$。设资产收益率的期望向量为 $\boldsymbol \mu \in \mathbb R^n$，协方差矩阵为 $\boldsymbol \Sigma \in \mathbb R^{n \times n}$，假定 $\boldsymbol \Sigma$ 为对称正定矩阵。投资者风险厌恶系数为 $\lambda_{\mathrm{risk}} > 0$。为了刻画从 $\boldsymbol w_0$ 调整至新权重 $\boldsymbol w$ 的二次交易冲击成本，引入对角正定成本矩阵 $\boldsymbol \Lambda = \operatorname{diag}(\lambda_1, \ldots, \lambda_n)$，其中 $\lambda_i > 0$ 反映了第 $i$ 只资产的市场冲击斜率。设上下界向量为 $\boldsymbol l, \boldsymbol u \in \mathbb R^n$，满足 $\boldsymbol l \le \boldsymbol u$ 且可行域非空。

**命题 34.16（考虑二次交易成本的约束均值—方差组合优化）**

考虑如下目标规划问题：
$$
\begin{aligned}
\min_{\boldsymbol w \in \mathbb R^n} \quad & f(\boldsymbol w) = \frac{\lambda_{\mathrm{risk}}}{2} \boldsymbol w^\top \boldsymbol \Sigma \boldsymbol w + \frac{1}{2} (\boldsymbol w - \boldsymbol w_0)^\top \boldsymbol \Lambda (\boldsymbol w - \boldsymbol w_0) - \boldsymbol \mu^\top \boldsymbol w \\
\text{s.t.} \quad & \boldsymbol 1^\top \boldsymbol w = 1, \\
& \boldsymbol l \le \boldsymbol w \le \boldsymbol u .
\end{aligned}
\tag{34.25}
$$
则上述优化问题存在唯一的全局最优解 $\boldsymbol w^*$。并且存在拉格朗日乘子 $\nu^* \in \mathbb R$ 以及乘子向量 $\boldsymbol \xi_-^*, \boldsymbol \xi_+^* \in \mathbb R_+^n$，使得一阶 Karush--Kuhn--Tucker（KKT）条件充要成立：
$$
(\lambda_{\mathrm{risk}} \boldsymbol \Sigma + \boldsymbol \Lambda) \boldsymbol w^* - \boldsymbol \mu - \boldsymbol \Lambda \boldsymbol w_0 + \nu^* \boldsymbol 1 - \boldsymbol \xi_-^* + \boldsymbol \xi_+^* = \boldsymbol 0 ,
$$
以及互补松弛条件：
$$
\xi_{-, i}^* (l_i - w_i^*) = 0, \quad \xi_{+, i}^* (w_i^* - u_i) = 0, \quad \xi_{-, i}^* \ge 0, \quad \xi_{+, i}^* \ge 0, \quad \forall i=1,\ldots,n .
$$

**证明**

首先分析目标函数 $f(\boldsymbol w)$ 的严格凸性。目标函数的二阶 Hessian 矩阵为
$$
\nabla^2 f(\boldsymbol w) = \lambda_{\mathrm{risk}} \boldsymbol \Sigma + \boldsymbol \Lambda .
$$
因为 $\boldsymbol \Sigma$ 对称正定，$\lambda_{\mathrm{risk}} > 0$，故 $\lambda_{\mathrm{risk}} \boldsymbol \Sigma$ 为正定矩阵；又因为 $\lambda_i > 0$，$\boldsymbol \Lambda$ 为对角元素全为正的对角矩阵，故 $\boldsymbol \Lambda$ 正定。两个对称正定矩阵之和严格正定，即对任意非零向量 $\boldsymbol z \in \mathbb R^n$，有
$$
\boldsymbol z^\top (\lambda_{\mathrm{risk}} \boldsymbol \Sigma + \boldsymbol \Lambda) \boldsymbol z = \lambda_{\mathrm{risk}} \boldsymbol z^\top \boldsymbol \Sigma \boldsymbol z + \boldsymbol z^\top \boldsymbol \Lambda \boldsymbol z > 0 .
$$
因此，目标函数 $f(\boldsymbol w)$ 在全空间 $\mathbb R^n$ 上是强凸函数，且为连续可微函数。

接下来考察可行域 $\mathcal W = \{\boldsymbol w \in \mathbb R^n : \boldsymbol 1^\top \boldsymbol w = 1, \boldsymbol l \le \boldsymbol w \le \boldsymbol u\}$。可行域由一组线性等式与线性不等式定义，因而是闭凸集。又因为上下界约束 $l_i \le w_i \le u_i$ 使得 $\mathcal W$ 有界，故 $\mathcal W$ 是 $\mathbb R^n$ 中的紧致凸集。由极值定理（Weierstrass 定理），连续函数在非空紧集上必能达到最小值；再由目标函数的强凸性，极小值点严格唯一，记为 $\boldsymbol w^*$。

最后，由于约束条件全部为仿射函数，线性独立约束规范（LICQ）或 Slater 条件对所有可行点自然成立。因此，一阶 KKT 条件是 $\boldsymbol w^*$ 为全局最小值的充分必要条件。引入拉格朗日函数：
$$
L(\boldsymbol w, \nu, \boldsymbol \xi_-, \boldsymbol \xi_+) = f(\boldsymbol w) + \nu (\boldsymbol 1^\top \boldsymbol w - 1) + (\boldsymbol \xi_-)^\top (\boldsymbol l - \boldsymbol w) + (\boldsymbol \xi_+)^\top (\boldsymbol w - \boldsymbol u) .
$$
对 $\boldsymbol w$ 求梯度并令其为零，即得
$$
\nabla_{\boldsymbol w} L(\boldsymbol w^*, \nu^*, \boldsymbol \xi_-^*, \boldsymbol \xi_+^*) = (\lambda_{\mathrm{risk}} \boldsymbol \Sigma + \boldsymbol \Lambda) \boldsymbol w^* + \boldsymbol \Lambda (\boldsymbol w^* - \boldsymbol w_0) - \boldsymbol \Lambda \boldsymbol w^* - \boldsymbol \mu + \nu^* \boldsymbol 1 - \boldsymbol \xi_-^* + \boldsymbol \xi_+^* = \boldsymbol 0 ,
$$
整理即得命题中的梯度等式。结合原始可行性 $\boldsymbol 1^\top \boldsymbol w^* = 1$、$\boldsymbol l \le \boldsymbol w^* \le \boldsymbol u$、对偶可行性 $\boldsymbol \xi_-^* \ge \boldsymbol 0$、$\boldsymbol \xi_+^* \ge \boldsymbol 0$ 以及互补松弛条件，证明完毕。

□

### 34.5.3 流动性约束与再平衡频率

当投资组合规模上升时，除了目标权重的绝对约束外，单期交易流量不能超过标的资产在交易窗口内的流动性承载极限。设第 $i$ 只资产在单位调仓周期内的平均日成交量（或周期平均交易量）为 $\operatorname{ADV}_i > 0$。为了避免造成严重的瞬时价格冲击并引发交易所异常交易监控，量化机构通常对单期参与率施加硬性上限 $\theta_i \in (0, 1)$（在股票市场中常取 $\theta_i \in [0.01, 0.10]$）。对于总资产规模为 $A$ 的投资组合，调仓交易量约束可写为
$$
A |w_i - w_{0,i}| \le \theta_i \operatorname{ADV}_i, \quad \forall i=1,\ldots,n .
$$
该约束将换手率的上限直接与资产的外部流动性绑定。当 $A$ 增大至某一阈值时，该不等式将成为紧约束，迫使组合无法在一个周期内直接调整到无约束最优权重，而必须在多个连续周期内分批完成建仓或调仓。

与流动性紧密相关的另一核心决策是再平衡频率。设调仓时间间隔为 $\Delta t > 0$。如果投资者试图在连续时间（$\Delta t \to 0$）内无限频繁地调整组合以紧跟最优信号，资产价格过程的半鞅性质将导致权重的全变差发散。在具有正固定成本或二次冲击的市场中，累积交易成本将以超线性速度耗尽全部资产；反之，若调仓间隔 $\Delta t$ 过长，由于各资产价格漂移，组合权重将发生被动偏离，导致跟踪误差方差以 $\mathcal O(\Delta t)$ 的速度累积。令单期均方跟踪误差惩罚系数为 $\eta > 0$，离散调仓的单期固定及比例成本总和记为 $C_{\mathrm{trade}}$，则单位时间内的总摩擦损失泛函为
$$
\mathcal L(\Delta t) = \frac{\eta}{2} \sigma_{\mathrm{drift}}^2 \Delta t + \frac{C_{\mathrm{trade}}}{\Delta t} .
$$
对 $\Delta t$ 求导并令导数为零，可得平衡跟踪风险与交易摩擦的最优调仓周期：
$$
\Delta t^* = \sqrt{\frac{2 C_{\mathrm{trade}}}{\eta \sigma_{\mathrm{drift}}^2}} .
$$
该平方根关系表明，当交易成本越高时，再平衡应越低频；当资产收益波动或信号衰减速度越快时，再平衡应越紧密。

### 34.5.4 杠杆与保证金约束的数学表述

在多空对冲策略、CTA 期货策略及统计套利中，杠杆的使用是放大微小超额收益的重要手段，但同时也直接引入了流动性破产与强行平仓的极值风险。

定义组合的总杠杆（Gross Leverage）与净杠杆（Net Leverage）分别为
$$
L_{\mathrm{gross}} = \sum_{i=1}^n |w_i|, \qquad L_{\mathrm{net}} = \sum_{i=1}^n w_i .
$$
在典型的多空市场中性策略中，通常要求净杠杆接近于零（$|L_{\mathrm{net}}| \le \epsilon_{\mathrm{neutral}}$），而总杠杆受限于融券与借贷额度，存在硬性上限：$L_{\mathrm{gross}} \le L_{\max}$。

对于衍生品与保证金交易品种，账户必须实时满足交易所与经纪商的保证金制度。设第 $i$ 种合约的初始保证金率为 $m_{0,i} \in (0, 1]$，维持保证金率为 $m_{\mathrm{m},i} \in (0, m_{0,i})$。在时刻 $t$，组合净资产值为 $A_t$。则组合的保证金占用不等式约束为
$$
\sum_{i=1}^n m_{0,i} |w_{i,t}| \le 1 - \delta_{\mathrm{buffer}} ,
\tag{34.26}
$$
其中 $\delta_{\mathrm{buffer}} \in (0, 1)$ 为风控预留的安全流动性缓冲比例。

若市场发生剧烈波动，净资产 $A_t$ 出现回撤，使得维持保证金总需求超过实时净资产，即
$$
\sum_{i=1}^n m_{\mathrm{m},i} |w_{i,t}| A_t > A_t,
$$
组合将触发追加保证金通知（Margin Call）或直接被经纪商强制平仓。在连续时间下，令 $\mathcal F_t$ 为市场信息流，组合净值 $A_t$ 的破产停时定义为
$$
\tau_{\mathrm{margin}} = \inf \left\{ t \ge 0 : A_t \le \sum_{i=1}^n m_{\mathrm{m},i} |w_{i,t}| A_t \right\} .
$$
防范保证金穿仓要求在策略评估时，不仅要测量静态的杠杆倍数，还必须通过极值理论计算在设定置信水平下 $\mathbb P(\tau_{\mathrm{margin}} \le T)$ 的上界。

**例 34.5**

某量化统计套利策略管理规模为 $A = 2 \times 10^8$ 元（2 亿元），持有 4 只配对资产，当前权重向量为 $\boldsymbol w_0 = (0.25, 0.25, -0.25, -0.25)^\top$。预测下一调仓周期的期望超额收益率为 $\boldsymbol \mu = (0.008, 0.006, -0.005, -0.007)^\top$，协方差矩阵为 $\boldsymbol \Sigma = \sigma_0^2 \boldsymbol I_4$，其中 $\sigma_0 = 0.04$。投资人风险厌恶系数 $\lambda_{\mathrm{risk}} = 2$。冲击成本矩阵为 $\boldsymbol \Lambda = \lambda_0 \boldsymbol I_4$，其中 $\lambda_0 = 0.001$。设每只资产的维持保证金率均为 $m_{\mathrm m} = 0.15$，总杠杆上限为 $L_{\max} = 1.5$，无空头限制，且满足资金平衡 $\boldsymbol 1^\top \boldsymbol w = 0$。

试求：（1）不考虑界限约束时的解析解；（2）检验该解是否满足杠杆与保证金约束。

**解**

（1）在此对称设定下，记 $\boldsymbol \Gamma = \lambda_{\mathrm{risk}} \boldsymbol \Sigma + \boldsymbol \Lambda = (2 \times 0.04^2 + 0.001) \boldsymbol I_4 = 0.0042 \boldsymbol I_4$。
根据命题 34.16 的一阶条件，在无不等式约束且等式约束为 $\boldsymbol 1^\top \boldsymbol w = 0$ 时，最优解满足
$$
\boldsymbol \Gamma \boldsymbol w^* - \boldsymbol \mu - \boldsymbol \Lambda \boldsymbol w_0 + \nu^* \boldsymbol 1 = \boldsymbol 0 .
$$
因为 $\boldsymbol \Gamma = 0.0042 \boldsymbol I_4$ 为纯量阵，两边左乘 $\boldsymbol 1^\top$ 并利用 $\boldsymbol 1^\top \boldsymbol w^* = 0$ 与 $\boldsymbol 1^\top \boldsymbol w_0 = 0$，得到
$$
0 - \boldsymbol 1^\top \boldsymbol \mu - 0 + 4 \nu^* = 0 \implies \nu^* = \frac{1}{4} \boldsymbol 1^\top \boldsymbol \mu = \frac{0.008 + 0.006 - 0.005 - 0.007}{4} = 0.0005 .
$$
将 $\nu^*$ 代回，得
$$
0.0042 \boldsymbol w^* = \boldsymbol \mu + 0.001 \boldsymbol w_0 - 0.0005 \boldsymbol 1 .
$$
逐分量计算：
对于第 1 维：$0.008 + 0.001 \times 0.25 - 0.0005 = 0.00775$，故 $w_1^* = 0.00775 / 0.0042 \approx 1.8452$；
对于第 2 维：$0.006 + 0.001 \times 0.25 - 0.0005 = 0.00575$，故 $w_2^* = 0.00575 / 0.0042 \approx 1.3690$；
对于第 3 维：$-0.005 - 0.001 \times 0.25 - 0.0005 = -0.00575$，故 $w_3^* = -0.00575 / 0.0042 \approx -1.3690$；
对于第 4 维：$-0.007 - 0.001 \times 0.25 - 0.0005 = -0.00775$，故 $w_4^* = -0.00775 / 0.0042 \approx -1.8452$。

（2）检验约束条件：
总杠杆计算为
$$
L_{\mathrm{gross}} = |1.8452| + |1.3690| + |-1.3690| + |-1.8452| = 6.4284 .
$$
由于 $L_{\mathrm{gross}} = 6.4284 > 1.5 = L_{\max}$，无约束解严重违背了总杠杆约束。同时，维持保证金总需求比例为
$$
\sum_{i=1}^4 m_{\mathrm m} |w_i^*| = 0.15 \times 6.4284 = 0.96426 ,
$$
已经接近全部净资产（$96.43\%$），完全无法保留安全缓冲 $\delta_{\mathrm{buffer}}$。因此在工程实现中必须显式引入杠杆罚项或投影算法，将 $\boldsymbol w^*$ 投影到有界紧集 $\mathcal W \cap \{\boldsymbol w : \|\boldsymbol w\|_1 \le L_{\max}\}$ 内部。

## 34.6 策略评估的完整流程与常见错误

量化投资研究的本质是对金融时间序列中的微弱统计信号进行假设检验与模型提取。然而，金融数据的低信噪比、非平稳性以及研究过程中不可避免的试错探索，使得回测结果极易沦为对历史噪声的过度拟合。一个在历史回测中呈现完美平滑净值曲线的策略，实盘上线后往往迅速失效。为了建立科学可证伪的研究范式，必须将策略评估置于严密的数理统计推断体系之中。

### 34.6.1 从假设到验证的统计流程

严谨的策略评估流程包含明确的信息隔离与假设检验链条。首先，研究者应当基于清晰的经济学或微观结构逻辑提出前置假设，而非通过盲目遍历数万个技术指标进行数据挖掘（Data Snooping）。在数据切分上，传统的机器学习随机 $K$ 折交叉验证在金融时序中彻底失效，因为金融资产收益率存在时间自相关性，且许多衍生标签（如跨期持有收益）存在时间跨度重叠，这会导致训练集与测试集之间产生严重的信息泄漏。

为了在时序结构下实现无污染的交叉验证，必须采用净化（Purging）与禁运（Embargoing）技术。设样本时间索引集为 $\mathcal T = \{1, 2, \ldots, T\}$。若训练集选择时段 $[t_1, t_2]$，测试集选择时段 $[t_3, t_4]$（其中 $t_2 < t_3$），若训练集中某些样本的持仓持有期跨越了 $t_2$，则必须将这些与测试集预测期产生重叠的样本从训练集中物理剔除，此为净化；而在测试集结束后的一段保护期内，由于资产价格的自回归记忆性，新启动的训练集样本仍可能通过时序相关性获取测试期信息，因此必须在测试集后强制插入一段长度为 $h_{\mathrm{embargo}}$ 的禁运缓冲区。只有经过净化与禁运处理的数据切分，才能提供渐近无偏的样本外泛化误差估计。

### 34.6.2 多重检验校正在策略筛选中的应用

在量化研发团队的日常工作中，研究人员往往会针对同一历史数据集尝试成百上千种参数组合、特征工程算子或交易规则，最终仅挑选回测表现最优的一个或少数几个策略进行展示。这种挑选机制构成了经典的多重假设检验问题。在零假设（所有被测策略均无真实预测能力）成立的条件下，单次检验在显著性水平 $\alpha = 0.05$ 下拒绝零假设的概率为 $0.05$；但若独立测试 $K = 100$ 个无效策略，至少有一个策略呈现出表面统计显著的概率高达 $1 - (1 - 0.05)^{100} \approx 0.994$。

承接第 20 章关于多重比较与假设检验的理论，必须对策略评估的统计量进行多重校正。

**定义 34.17（策略多重检验与伪发现率）**

设同时对 $K$ 个策略的超额收益能力进行检验，零假设 $H_{0,k} : \mu_k \le 0$（策略 $k$ 无真实超额收益），备择假设 $H_{1,k} : \mu_k > 0$。记真实零假设成立的集合为 $\mathcal K_0 \subseteq \{1, \ldots, K\}$，其中真正无效策略数为 $K_0 = |\mathcal K_0|$。设某决策规则做出了 $R$ 次拒绝决策（即宣称 $R$ 个策略有效），其中错误的拒绝（将无效策略误判为有效）次数记为随机变量 $V$。
1. 全族第一类错误率（Family-Wise Error Rate，FWER）定义为至少发生一次错误拒绝的概率：
$$
\operatorname{FWER} = \mathbb P(V \ge 1) .
$$
2. 伪发现率（False Discovery Rate，FDR）定义为错误拒绝次数占全部宣称有效次数比例的数学期望：
$$
\operatorname{FDR} = \mathbb E\left[ \frac{V}{\max(R, 1)} \right] .
\tag{34.27}
$$

经典的 Bonferroni 校正通过将每个独立检验的显著性阈值设为 $\alpha / K$ 来严格控制 $\operatorname{FWER} \le \alpha$；但在大规模因子挖掘（$K$ 达到数千）时，该方法过于保守，会导致第二类错误率（遗漏真实策略）大幅上升。相比之下，Benjamini--Hochberg（BH）过程通过将 $K$ 个单边 $p$ 值按升序排列 $p_{(1)} \le p_{(2)} \le \ldots \le p_{(K)}$，寻找满足
$$
k^* = \max \left\{ k : p_{(k)} \le \frac{k}{K} q^* \right\}
$$
的最大索引 $k^*$，并拒绝前 $k^*$ 个假设，能够在策略弱相关的条件下将 $\operatorname{FDR}$ 严格控制在预设水平 $q^*$ 之内。

**定理 34.18（最大夏普比率的渐近分布与过拟合惩罚）**

设研究人员独立检验了 $K$ 个不同的量化策略，每个策略的测试期均包含 $T$ 个独立同分布的单期收益率观测。在零假设成立的条件下，所有策略的真实均值均为零，即真实总体夏普比率 $\mathrm{SR}_k = 0$（$\forall k=1,\ldots,K$）。设各策略的单期收益率服从方差为 $\sigma_k^2$ 的正态分布，样本夏普比率定义为 $\widehat{\mathrm{SR}}_k = \bar R_k / s_k$。当样本容量 $T \to \infty$ 且策略数 $K \to \infty$ 时，令标度变量 $Z_k = \sqrt{T} \widehat{\mathrm{SR}}_k$。则有：
1. $Z_1, \ldots, Z_K$ 渐近服从标准正态分布 $\mathcal N(0, 1)$。
2. 最大统计量 $M_K = \max_{1 \le k \le K} Z_k$ 经过正规化后弱收敛于标准 Gumbel 极值分布：
$$
\lim_{K \to \infty} \mathbb P\left( a_K (M_K - b_K) \le x \right) = \exp(-e^{-x}) , \quad \forall x \in \mathbb R ,
$$
其中规范化常数序列由标准正态尾部逆函数确定：
$$
b_K = \sqrt{2 \ln K} - \frac{\ln(\ln K) + \ln(4\pi)}{2\sqrt{2\ln K}}, \qquad a_K = \sqrt{2 \ln K} .
$$
3. 在纯随机无预测能力的零假设下，回测挑出的最大样本夏普比率的期望值渐近满足：
$$
\mathbb E\left[\max_{1 \le k \le K} \widehat{\mathrm{SR}}_k\right] = \frac{1}{\sqrt{T}} \left( \sqrt{2 \ln K} - \frac{\ln(\ln K) + \ln(4\pi) - 2\gamma_{\mathrm{EM}}}{2\sqrt{2\ln K}} \right) + o\left(\frac{1}{\sqrt{T \ln K}}\right) ,
\tag{34.28}
$$
其中 $\gamma_{\mathrm{EM}} \approx 0.5772156649$ 为欧拉—马歇罗尼（Euler--Mascheroni）常数。

**证明**

首先证明第一部分。由大数定律与中心极限定理，对于正态样本，样本均值 $\bar R_k \sim \mathcal N(0, \sigma_k^2/T)$，样本标准差 $s_k$ 满足 $s_k \xrightarrow{\mathbb P} \sigma_k$。由 Slutsky 定理，
$$
Z_k = \sqrt{T} \frac{\bar R_k}{s_k} = \frac{\sqrt{T} \bar R_k / \sigma_k}{s_k / \sigma_k} \xrightarrow{\mathrm d} \mathcal N(0, 1) .
$$
因此，$Z_1, \ldots, Z_K$ 是一组渐近独立的标准正态随机变量。

接下来证明第二部分。标准正态分布的累积分布函数为 $\Phi(x)$，密度函数为 $\phi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$。根据极值理论中的 Fisher--Tippett--Gnedenko 定理，正态分布属于 Gumbel 吸引域。对于充分大的 $x$，正态尾部满足 Mill 比例近似：
$$
1 - \Phi(x) = \frac{\phi(x)}{x} \left( 1 - \mathcal O\left(\frac{1}{x^2}\right) \right) = \frac{1}{\sqrt{2\pi} x} \exp\left(-\frac{x^2}{2}\right) \left( 1 - \mathcal O\left(\frac{1}{x^2}\right) \right) .
$$
规范化序列 $b_K$ 满足 $1 - \Phi(b_K) = \frac{1}{K}$。将 $b_K$ 的渐近展开代入：
令 $b_K = \sqrt{2\ln K} - \delta_K$，经展开可得 $\delta_K = \frac{\ln(\ln K) + \ln(4\pi)}{2\sqrt{2\ln K}} + \mathcal O\left(\frac{1}{\ln K}\right)$。令 $a_K = \sqrt{2\ln K}$，考察随机变量 $Y_K = a_K(M_K - b_K)$ 的分布：
$$
\mathbb P(Y_K \le x) = \left( \Phi\left( b_K + \frac{x}{a_K} \right) \right)^K = \left( 1 - \left(1 - \Phi\left(b_K + \frac{x}{a_K}\right)\right) \right)^K .
$$
利用泰勒展开：
$$
1 - \Phi\left(b_K + \frac{x}{a_K}\right) \approx \frac{\phi(b_K + x/a_K)}{b_K + x/a_K} \approx \frac{\phi(b_K)}{b_K} \exp\left( - b_K \frac{x}{a_K} \right) .
$$
因为 $b_K / a_K \to 1$ 且 $1 - \Phi(b_K) \approx 1/K$，上式简化为 $\frac{1}{K} e^{-x}$。从而
$$
\lim_{K \to \infty} \mathbb P(Y_K \le x) = \lim_{K \to \infty} \left( 1 - \frac{e^{-x}}{K} \right)^K = \exp(-e^{-x}) .
$$
这证明了极值统计量 $M_K$ 弱收敛于参数为 $(b_K, 1/a_K)$ 的 Gumbel 极值分布。

最后计算期望值。标准 Gumbel 分布的期望值为欧拉常数 $\gamma_{\mathrm{EM}}$。由极值统计量的矩收敛定理，有
$$
\mathbb E[Y_K] = \mathbb E[a_K (M_K - b_K)] \to \gamma_{\mathrm{EM}} .
$$
因此，
$$
\mathbb E[M_K] = b_K + \frac{\gamma_{\mathrm{EM}}}{a_K} + o\left(\frac{1}{a_K}\right) = \sqrt{2 \ln K} - \frac{\ln(\ln K) + \ln(4\pi) - 2\gamma_{\mathrm{EM}}}{2\sqrt{2\ln K}} + o\left(\frac{1}{\sqrt{\ln K}}\right) .
$$
两边同除以 $\sqrt{T}$，即得式（34.28）。

□

**例 34.6**

某量化研究员在 2 年（$T = 504$ 个交易日）的历史日频数据上，网格搜索了 $K = 1000$ 组参数，选取了回测表现最好的参数组合，其日度样本夏普比率为 $\widehat{\mathrm{SR}}_{\max} = 0.103$（年化夏普比率约为 $0.103 \times \sqrt{252} \approx 1.635$）。假定所有试验策略的真实夏普比率均为零，且各策略日收益率服从独立正态分布。

试求：（1）由定理 34.18 计算在零假设下期望产生的最大样本夏普比率；（2）评价该研究员宣称的年化 1.635 夏普比率是否具有统计显著性。

**解**

（1）已知 $K = 1000$，$T = 504$。首先计算常数项：
$$
\ln K = \ln 1000 \approx 6.907755, \qquad \sqrt{2 \ln K} = \sqrt{2 \times 6.907755} \approx 3.71692 .
$$
$$
\ln(\ln K) \approx \ln(6.907755) \approx 1.93264, \qquad \ln(4\pi) \approx \ln(12.56637) \approx 2.53102 .
$$
分子中对数与欧拉常数修正项为
$$
\ln(\ln K) + \ln(4\pi) - 2\gamma_{\mathrm{EM}} \approx 1.93264 + 2.53102 - 2 \times 0.577216 \approx 3.30923 .
$$
分母为 $2 \sqrt{2 \ln K} \approx 2 \times 3.71692 = 7.43384$。两项相除得
$$
\frac{3.30923}{7.43384} \approx 0.44516 .
$$
由此得到极值均值项为
$$
\mathbb E[M_K] \approx 3.71692 - 0.44516 = 3.27176 .
$$
除以 $\sqrt{T} = \sqrt{504} \approx 22.4499$，得到零假设下单期样本夏普比率的最大期望值为
$$
\mathbb E\left[\max_{1 \le k \le 1000} \widehat{\mathrm{SR}}_k\right] \approx \frac{3.27176}{22.4499} \approx 0.14574 .
$$
将其年化（乘以 $\sqrt{252}$）：
$$
\mathrm{SR}_{\mathrm{annual}}^{\mathrm{expected}} = 0.14574 \times \sqrt{252} \approx 2.3135 .
$$

（2）分析统计显著性：
在完全由白噪声构成的 1000 次独立试验中，仅凭随机波动挑选出的最优策略，其期望年化夏普比率高达 2.3135。而该研究员挖掘出的策略年化夏普比率仅为 1.635（对应单期夏普比率 0.103，远低于期望最大值 0.14574）。这意味着该策略的表现完全落在纯随机数据挖掘产生的噪声区间之内，其高夏普比率完全是过拟合与数据窥视（Data Snooping）的虚假产物，其单侧检验 $p$ 值显著大于 $0.5$。若将其实盘上线，预期超额收益将迅速均值回归至零。

### 34.6.3 生存者偏差与前视偏差的数学后果

在策略构建与数据清洗过程中，两类最隐蔽且破坏力极强的数据错误是前视偏差（Look-ahead Bias）与生存者偏差（Survivorship Bias）。

前视偏差是指在计算 $t$ 时刻的交易决策时，错误地使用了在时刻 $t$ 尚未进入市场信息滤子 $\mathcal F_t$ 的未来随机变量。令参考概率空间为 $(\Omega, \mathcal F, \mathbb P)$，市场真实信息流为离散滤子 $\mathbb F = (\mathcal F_t)_{t \ge 0}$。一个在现实中可实现的投资组合权重过程 $\boldsymbol w_t$ 必须是 $\mathbb F$-可预测过程（Predictable Process），即 $\boldsymbol w_t$ 必须关于 $\mathcal F_{t-1}$ 可测。

**命题 34.19（过滤泄露与前视偏差的漂移膨胀）**

设资产收益率向量为 $\boldsymbol R_t \in \mathbb R^n$。若研究人员在构建策略权重时引入了微弱的未来信息泄露，即实际使用的决策权重 $\widetilde{\boldsymbol w}_t$ 关于扩大后的信息代数 $\mathcal G_t \supsetneq \mathcal F_{t-1}$ 可测，其中 $\mathcal G_t = \sigma(\mathcal F_{t-1} \vee \sigma(\boldsymbol \epsilon_t))$，且扰动项 $\boldsymbol \epsilon_t$ 与未来实际收益率 $\boldsymbol R_t$ 正相关：$\operatorname{Cov}(\boldsymbol \epsilon_t, \boldsymbol R_t \mid \mathcal F_{t-1}) = \boldsymbol \Sigma_{\epsilon R} > \boldsymbol 0$。则策略在回测中记录的条件期望收益率满足：
$$
\mathbb E[\widetilde{\boldsymbol w}_t^\top \boldsymbol R_t \mid \mathcal F_{t-1}] = \mathbb E[\boldsymbol w_t^\top \boldsymbol R_t \mid \mathcal F_{t-1}] + \operatorname{Tr}\left( \frac{\partial \widetilde{\boldsymbol w}_t}{\partial \boldsymbol \epsilon_t}^\top \boldsymbol \Sigma_{\epsilon R} \right) > \mathbb E[\boldsymbol w_t^\top \boldsymbol R_t \mid \mathcal F_{t-1}] ,
\tag{34.29}
$$
其中增量项严格为正，导致回测漂移项出现系统性人工抬升。

**证明**

将权重函数对泄露变量 $\boldsymbol \epsilon_t$ 作一阶展开：$\widetilde{\boldsymbol w}_t = \boldsymbol w_t + \boldsymbol J_\epsilon \boldsymbol \epsilon_t + \boldsymbol r_\epsilon$，其中 $\boldsymbol w_t$ 为仅依赖 $\mathcal F_{t-1}$ 的真实可测部分，$\boldsymbol J_\epsilon = \frac{\partial \widetilde{\boldsymbol w}_t}{\partial \boldsymbol \epsilon_t}$ 为雅可比矩阵。条件期望为
$$
\mathbb E[\widetilde{\boldsymbol w}_t^\top \boldsymbol R_t \mid \mathcal F_{t-1}] = \mathbb E[\boldsymbol w_t^\top \boldsymbol R_t \mid \mathcal F_{t-1}] + \mathbb E[(\boldsymbol J_\epsilon \boldsymbol \epsilon_t)^\top \boldsymbol R_t \mid \mathcal F_{t-1}] .
$$
因为 $\boldsymbol w_t$ 关于 $\mathcal F_{t-1}$ 可测，故第一项等于真实策略收益期望。对于第二项，利用矩阵内积与协方差性质：
$$
\mathbb E[(\boldsymbol J_\epsilon \boldsymbol \epsilon_t)^\top \boldsymbol R_t \mid \mathcal F_{t-1}] = \mathbb E[\operatorname{Tr}(\boldsymbol J_\epsilon \boldsymbol \epsilon_t \boldsymbol R_t^\top) \mid \mathcal F_{t-1}] = \operatorname{Tr}\left( \boldsymbol J_\epsilon \mathbb E[\boldsymbol \epsilon_t \boldsymbol R_t^\top \mid \mathcal F_{t-1}] \right) = \operatorname{Tr}\left( \boldsymbol J_\epsilon \boldsymbol \Sigma_{\epsilon R} \right) .
$$
由于量化策略对正向预测信号施加正权重（$\boldsymbol J_\epsilon > \boldsymbol 0$）且未来误差项与收益正相关（$\boldsymbol \Sigma_{\epsilon R} > \boldsymbol 0$），正定矩阵乘积的迹严格大于零。因此，前视偏差直接在回测收益中凭空注入了虚假正漂移。

□

生存者偏差的数学实质则是条件概率截断。若回测股票池仅选用当前时点仍然存续的成分股列表（例如使用今日的标普 500 或沪深 300 样本股去回测十年前的策略），该数据集合隐式对事件 $\mathcal S = \{\tau > T\}$（即标的公司在时段 $[0, T]$ 内未发生退市或破产）进行了条件化。设单个资产价值过程为 $V_t$，违约停时为 $\tau = \inf\{t \ge 0 : V_t \le V_{\mathrm{default}}\}$。由全期望公式，在全样本资产池上的真实期望收益率为
$$
\mathbb E[R_t] = \mathbb E[R_t \mid \tau > T] \mathbb P(\tau > T) + \mathbb E[R_t \mid \tau \le T] \mathbb P(\tau \le T) .
$$
因为发生破产重组或退市的资产在破产前的期望收益率极度为负（$\mathbb E[R_t \mid \tau \le T] \ll 0$），强制忽略破产样本将导致回测样本的平均收益率满足 $\mathbb E[R_t \mid \tau > T] > \mathbb E[R_t]$。这种系统性偏差通常会使股票多头策略的年化收益被虚高 2% 至 5% 不等。消除该偏差的唯一准则是采用具有严格时点快照（Point-in-Time）属性的历史可交易全样本。

### 34.6.4 参数敏感性分析

过度拟合不仅体现在策略维度的挑选，还体现在超参数的微调上。设策略依赖于参数向量 $\boldsymbol \theta = (\theta_1, \ldots, \theta_p)^\top \in \Theta \subset \mathbb R^p$（如移动平均窗口长度、止损阈值、波动率乘数等）。定义目标绩效泛函为 $J(\boldsymbol \theta)$（如策略夏普比率或信息比率）。

若在网格搜索中发现的最优参数 $\boldsymbol \theta^*$ 处于性能曲面的孤立尖峰上（即“悬崖形态”），其局部 Hessian 矩阵 $\nabla^2 J(\boldsymbol \theta^*)$ 具有极大的负特征值，则表明策略微小的环境扰动就会导致收益断崖式下跌。相反，一个具备泛化能力的优质策略应当落在宽阔平缓的“高原形态”中央。定量评估参数平稳性的指标之一是计算以 $\boldsymbol \theta^*$ 为中心的小球 $\mathcal B_\delta(\boldsymbol \theta^*)$ 内的期望绩效衰减：
$$
\Delta_{\delta} J(\boldsymbol \theta^*) = J(\boldsymbol \theta^*) - \frac{1}{\operatorname{Vol}(\mathcal B_\delta(\boldsymbol \theta^*))} \int_{\mathcal B_\delta(\boldsymbol \theta^*)} J(\boldsymbol \theta) \, \mathrm d \boldsymbol \theta .
$$
若 $\Delta_\delta J$ 远大于相邻网格的方差，则策略被判定为参数脆弱性过高。

**例 34.7**

某动量策略依赖两个时间窗口参数 $\boldsymbol \theta = (\theta_1, \theta_2)^\top$。在参数空间 $\Theta = [10, 60] \times [5, 30]$ 内，目标夏普比率在极大值点 $\boldsymbol \theta^* = (30, 15)^\top$ 处取得 $J(\boldsymbol \theta^*) = 1.80$。局部二阶泰勒展开表明，其 Hessian 矩阵为
$$
\boldsymbol H = \nabla^2 J(\boldsymbol \theta^*) = \begin{pmatrix} -0.012 & 0.008 \\ 0.008 & -0.016 \end{pmatrix} .
$$
试求：（1）计算 $\boldsymbol H$ 的特征值，并判断其极值性质；（2）若实盘中市场微观结构漂移导致实际最优参数发生偏移 $\Delta \boldsymbol \theta = (2, -1)^\top$，估算夏普比率的预期降幅。

**解**

（1）计算特征多项式 $\det(\lambda_{\mathrm{eig}} \boldsymbol I - \boldsymbol H) = 0$：
$$
\det \begin{pmatrix} \lambda_{\mathrm{eig}} + 0.012 & -0.008 \\ -0.008 & \lambda_{\mathrm{eig}} + 0.016 \end{pmatrix} = (\lambda_{\mathrm{eig}} + 0.012)(\lambda_{\mathrm{eig}} + 0.016) - 0.008^2 = 0 .
$$
展开得
$$
\lambda_{\mathrm{eig}}^2 + 0.028 \lambda_{\mathrm{eig}} + 0.000192 - 0.000064 = \lambda_{\mathrm{eig}}^2 + 0.028 \lambda_{\mathrm{eig}} + 0.000128 = 0 .
$$
解二次方程：
$$
\lambda_{\mathrm{eig}} = \frac{-0.028 \pm \sqrt{0.028^2 - 4 \times 0.000128}}{2} = \frac{-0.028 \pm \sqrt{0.000784 - 0.000512}}{2} = \frac{-0.028 \pm \sqrt{0.000272}}{2} .
$$
计算根号值 $\sqrt{0.000272} \approx 0.016492$，得到两个特征值为
$$
\lambda_1 = \frac{-0.028 + 0.016492}{2} \approx -0.00575, \qquad \lambda_2 = \frac{-0.028 - 0.016492}{2} \approx -0.02225 .
$$
因为两个特征值均严格为负，Hessian 矩阵负定，满足局部极大值的充分条件。最大特征值负得较多（$-0.02225$），表明沿对应特征向量方向曲率较为陡峭。

（2）利用二阶泰勒展开估算夏普比率降幅：
$$
\Delta J \approx \frac{1}{2} \Delta \boldsymbol \theta^\top \boldsymbol H \Delta \boldsymbol \theta = \frac{1}{2} \begin{pmatrix} 2 & -1 \end{pmatrix} \begin{pmatrix} -0.012 & 0.008 \\ 0.008 & -0.016 \end{pmatrix} \begin{pmatrix} 2 \\ -1 \end{pmatrix} .
$$
先算矩阵乘向量：
$$
\boldsymbol H \Delta \boldsymbol \theta = \begin{pmatrix} -0.012 \times 2 + 0.008 \times (-1) \\ 0.008 \times 2 + (-0.016) \times (-1) \end{pmatrix} = \begin{pmatrix} -0.024 - 0.008 \\ 0.016 + 0.016 \end{pmatrix} = \begin{pmatrix} -0.032 \\ 0.032 \end{pmatrix} .
$$
再算内积：
$$
\Delta \boldsymbol \theta^\top (\boldsymbol H \Delta \boldsymbol \theta) = 2 \times (-0.032) + (-1) \times 0.032 = -0.064 - 0.032 = -0.096 .
$$
由此得到夏普比率降幅为
$$
\Delta J \approx \frac{1}{2} (-0.096) = -0.048 .
$$
新的夏普比率预计衰减为 $1.80 - 0.048 = 1.752$。由于夏普比率仍保持在 1.75 以上，说明该最优区域在小幅偏移下仍具备较好的抗扰动能力。

### 34.6.5 蒙特卡洛与 Bootstrap 检验

在承接第 18 章与第 23 章关于蒙特卡洛模拟与非参数统计的理论中，策略表现的显著性推断必须克服传统正态假定对金融厚尾及波动率聚集现象的低估。在策略样本量有限且收益序列存在自相关性时，基于独立同分布假定的经典 $t$ 检验会导致严重的假阳性。

为了在重抽样中保持时间序列的依赖结构，平稳块自举法（Stationary Bootstrap）被广泛应用。设原始策略超额收益序列为 $\{X_t\}_{t=1}^T$。平稳块自举法的块长度服从参数为 $p \in (0, 1)$ 的几何分布，即每个数据块的长度 $L_m$ 满足 $\mathbb P(L_m = k) = (1-p)^{k-1} p$（$k = 1, 2, \ldots$），其期望块长为 $1/p$。在生成伪样本序列 $\{X_t^*\}_{t=1}^T$ 时，若上一时刻选取的样本在原始序列中的索引为 $t$，则下一时刻以概率 $1-p$ 选择紧接着的下一个时序数据 $t+1$（采用周期环绕边界条件），以概率 $p$ 从 $\{1, \ldots, T\}$ 中重新均匀离散抽样。

**命题 34.20（平稳块自举检验与策略置换分布）**

设原始收益率序列 $\{X_t\}_{t=1}^T$ 来自严平稳且强混合（$\alpha$-mixing）的随机过程，混合系数满足 $\sum_{k=1}^\infty k^2 \alpha(k)^{(\delta-2)/\delta} < \infty$（$\delta > 2$）。设期望块长随着样本量增长满足 $b_T = 1/p_T \to \infty$ 且 $b_T / \sqrt{T} \to 0$。为了检验零假设 $H_0 : \mu \le 0$，构造中心化的自举统计量：
$$
Z_b^* = \frac{\sqrt{T} (\bar X_b^* - \bar X_T)}{\hat{\sigma}_b^*} , \quad b=1,\ldots,B ,
$$
其中 $\bar X_b^*$ 与 $\hat{\sigma}_b^*$ 分别为第 $b$ 次平稳自举样本的均值与长记忆一致标准差估计。则在 $H_0$ 下，基于 $B$ 次模拟的渐近自举经验 $p$ 值定义为
$$
p_{\mathrm{boot}} = \frac{1}{B} \sum_{b=1}^B \mathbb I\left( Z_b^* \ge \frac{\sqrt{T} \bar X_T}{\hat{\sigma}_T} \right) .
\tag{34.30}
$$
该自举检验在水平 $\alpha$ 下具有渐近正确的第一类错误率控制：$\lim_{T \to \infty} \mathbb P(p_{\mathrm{boot}} \le \alpha \mid H_0) \le \alpha$。

**证明**

首先分析自举伪序列平稳性。根据 Politis 与 Romano（1994）的构造，在条件转移规则下，伪序列 $\{X_t^*\}$ 是一个齐次马尔可夫链。对于任意给定的 $t$，由于重抽样以固定概率 $p$ 均匀重置起点，转移核具有平移不变性。因此，在给定原始样本序列的条件下，伪时间序列 $\{X_t^*\}$ 几乎必然关于时间平移是严格平稳的。

其次分析自举均值统计量的渐近正态性。令长时方差为 $\sigma_\infty^2 = \sum_{k=-\infty}^\infty \operatorname{Cov}(X_0, X_k)$。由强混合假设与几何块长的渐近性质，自举样本的样本方差一致收敛于原始过程的长期方差：
$$
\operatorname{Var}^*\left(\sqrt{T} \bar X_b^*\right) \xrightarrow{\mathbb P} \sigma_\infty^2 .
$$
由非参数块自举中心极限定理，条件分布满足一致有界 Kolmorogov 距离收敛：
$$
\sup_{z \in \mathbb R} \left| \mathbb P^*\left( \frac{\sqrt{T}(\bar X_b^* - \bar X_T)}{\hat{\sigma}_b^*} \le z \right) - \Phi(z) \right| \xrightarrow{\mathbb P} 0 .
$$
同时，在原假设 $H_0$ 且 $\mu = 0$ 的边界条件下，原始样本枢轴量 $Z_T = \frac{\sqrt{T} \bar X_T}{\hat{\sigma}_T}$ 同样依分布弱收敛于标准正态分布 $\mathcal N(0, 1)$。

因此，自举经验累积分布函数 $\Phi_B^*(z) = \frac{1}{B} \sum_{b=1}^B \mathbb I(Z_b^* \le z)$ 弱收敛于标准正态累积分布函数 $\Phi(z)$。在统计量代入后，右侧经验尾部概率 $p_{\mathrm{boot}} = 1 - \Phi_B^*(Z_T)$ 渐近等价于连续均匀分布 $\mathcal U(0, 1)$。当真实均值 $\mu < 0$ 时，检验统计量漂向负无穷，拒绝概率严格小于 $\alpha$。综上可知，该检验在水平 $\alpha$ 下渐近无偏且控制第一类错误率。

□

### 34.6.6 模型风险与稳健性检验

量化策略的稳健性评估必须直面现实市场中的非平稳性与分布外漂移（Out-of-Distribution Shift）。模型风险（Model Risk）主要来源于三个层次：数学设定偏差（如强行假定收益线性）、参数估计不确定性（有限样本引起的估计方差）以及宏观体制转换（Regime Switching）。

为了量化策略在极端逆境下的生存概率，压力测试应超越历史行情的简单重放，采用参数扰动与极端情景合成。例如，通过在资产收益生成过程中注入重尾混合分布，或模拟流动性骤降（买卖价差扩大 5 倍、成交量萎缩至 $20\%$）、相关性击穿（资产在极端下跌时相关系数趋近于 1）等危机场景，重新测算策略的破产概率与最大回撤恢复时间（Drawdown Duration）。若策略在大多数压力场景下的亏损均超过初始风控预算，则表明该策略在常态下获取的所谓超额收益本质上只是承担尾部黑天鹅风险的风险溢价，而非真正的阿尔法。

### 34.6.7 评估报告的统计规范

一份合格的量化策略评估报告应当摒弃未经校正的纯样本指标，遵循严格的统计报告准则。报告的核心并非单一的年化收益率或静态夏普比率，而是包含收益分布矩特征、自由度扣除、过拟合校正与置信区间的全景统计量。

在非正态收益（具有偏度 $\hat\gamma_3$ 与峰度 $\hat\gamma_4$）条件下，单期样本夏普比率的渐近方差不再是经典的 $1/T$，而是依赖高阶矩。设目标基准夏普比率为 $\mathrm{SR}^*$。概率夏普比率（Probabilistic Sharpe Ratio，PSR）定义为在给定高阶矩修正下方差估计下，真实夏普比率超越基准的置信度：
$$
\operatorname{PSR}(\mathrm{SR}^*) = \Phi\left( \frac{(\widehat{\mathrm{SR}} - \mathrm{SR}^*) \sqrt{T - 1}}{\sqrt{1 - \hat\gamma_3 \widehat{\mathrm{SR}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}^2}} \right) .
\tag{34.31}
$$
当研究人员进行了 $K$ 次策略试验并选出最大样本夏普比率 $\widehat{\mathrm{SR}}$ 时，将式（34.28）中的期望过拟合夏普比率阈值 $\mathrm{SR}_0 = \mathbb E[\max_{1 \le k \le K} \widehat{\mathrm{SR}}_k]$ 作为基准代入式（34.31），即得到收缩夏普比率（Deflated Sharpe Ratio，DSR）：
$$
\operatorname{DSR} = \operatorname{PSR}(\mathrm{SR}_0) = \Phi\left( \frac{(\widehat{\mathrm{SR}} - \mathrm{SR}_0) \sqrt{T - 1}}{\sqrt{1 - \hat\gamma_3 \widehat{\mathrm{SR}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}^2}} \right) .
\tag{34.32}
$$
只有当 $\operatorname{DSR} \ge 0.95$ 时，该策略才能在统计意义上被认为超越了由多重测试噪声产生的最高虚假收益，具备实盘分配资金的基本资格。

**例 34.8**

某CTA量化策略在 5 年（$T = 1260$ 个交易日）的回测中，日频样本夏普比率为 $\widehat{\mathrm{SR}} = 0.08$（年化夏普比率约为 $0.08 \times \sqrt{252} \approx 1.27$）。收益率样本偏度为 $\hat\gamma_3 = -0.60$（呈现明显的左偏负不对称性），样本峰度为 $\hat\gamma_4 = 5.20$（显著肥尾）。研发过程中实际尝试了 $K = 50$ 种策略变体，经计算对应的零假设过拟合期望阈值为 $\mathrm{SR}_0 = 0.045$。

试求：（1）计算该策略的年化调整夏普标准误差；（2）计算该策略的概率夏普比率（取基准 $\mathrm{SR}^* = 0$）；（3）计算考虑多重检验后的收缩夏普比率 $\operatorname{DSR}$，并评价该策略的真实显著性。

**解**

（1）计算分母中的非正态方差修正系数：
$$
v = 1 - \hat\gamma_3 \widehat{\mathrm{SR}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}^2 .
$$
代入已知数值：
$$
v = 1 - (-0.60) \times 0.08 + \frac{5.20 - 1}{4} \times 0.08^2 = 1 + 0.048 + 1.05 \times 0.0064 = 1 + 0.048 + 0.00672 = 1.05472 .
$$
标准误差分母开方：$\sqrt{v} = \sqrt{1.05472} \approx 1.02699$。
样本量自由度因子：$\sqrt{T-1} = \sqrt{1259} \approx 35.4824$。
日频夏普比率的估计标准误为
$$
\operatorname{SE}(\widehat{\mathrm{SR}}) = \frac{\sqrt{v}}{\sqrt{T-1}} = \frac{1.02699}{35.4824} \approx 0.028943 .
$$

（2）计算概率夏普比率 $\operatorname{PSR}(0)$：
基准为零（$\mathrm{SR}^* = 0$），代入公式（34.31）：
$$
z_{\mathrm{PSR}} = \frac{\widehat{\mathrm{SR}} - 0}{\operatorname{SE}(\widehat{\mathrm{SR}})} = \frac{0.08}{0.028943} \approx 2.7640 .
$$
查标准正态分布表，$\Phi(2.7640) \approx 0.9971$。
在不考虑多重尝试时，$\operatorname{PSR}(0) = 99.71\% > 95\%$，表面上该策略的夏普比率显著异于零。

（3）计算收缩夏普比率 $\operatorname{DSR}$：
将多重检验阈值 $\mathrm{SR}_0 = 0.045$ 代入公式（34.32）：
$$
z_{\mathrm{DSR}} = \frac{\widehat{\mathrm{SR}} - \mathrm{SR}_0}{\operatorname{SE}(\widehat{\mathrm{SR}})} = \frac{0.08 - 0.045}{0.028943} = \frac{0.035}{0.028943} \approx 1.2093 .
$$
查标准正态分布表：
$$
\operatorname{DSR} = \Phi(1.2093) \approx 0.8867 = 88.67\% .
$$
因为 $\operatorname{DSR} = 88.67\% < 95\%$，在扣除 50 次尝试引发的过拟合与左偏肥尾风险后，该策略超越数据窥视基准的置信度不足以达到常用的 $95\%$ 显著性门槛。这表明虽然其名义夏普比率表现良好，但有超过 $11\%$ 的概率纯粹是由参数搜索与尾部运气的偶然性所贡献，应当暂缓实盘配置并做进一步收缩验证。

## 34.7 全书数学工具的整合

作为全书的收官篇章，本节旨在超越孤立的公式推导，以鸟瞰视角俯瞰贯穿全书三十四章的数学思想脉络。现代量化金融绝非互不相干的数学分支的简单拼盘，而是一个以测度论与分析学为基底、以线性代数与优化理论为骨架、以随机微积分与高维统计学为血肉、以数值计算与机器学习为演化机制的有机理论大厦。理解这些数学工具之间的内在逻辑依赖与协同机理，是构建具备鲁棒性与工业级生命力投资体系的根本保证。

### 34.7.1 从基础分析到现代随机分析的逻辑链条

纵观全书，各个数学支流沿着严密的逻辑公理体系向前推进并最终在量化建模中交汇。全书的第一条主线是概率与随机过程体系：从测度空间、Lebesgue 积分与条件期望的严格定义出发，构筑了离散鞅与连续半鞅理论；基于布朗运动的样本路径不可微性，引出伊藤等距同构与伊藤引理，从而将确定性的常微分方程拓展为随机微分方程与偏微分方程的双重刻画；进而借助 Girsanov 测度变换定理与 Feynman--Kac 公式，建立了无套利定价、风险中性测度与倒向随机微分方程的桥梁。这条理论链条直接承载了从衍生品定价、波动率曲面建模到连续时间随机最优控制（Hamilton--Jacobi--Bellman 方程）的全部核心动力学。

第二条主线是线性代数、优化与高维统计的交汇：从内积空间、希尔伯特空间投影定理与正定二次型出发，奠定了 Markowitz 均值—方差资产组合理论的代数根基；谱分解与奇异值分解直接衍生为主成分分析与因子模型的正交旋转；随机矩阵理论（如 Marchenko--Pastur 分布）修正了高维样本协方差矩阵的噪声虚增；凸分析、对偶理论与 KKT 条件则为引入各类现实硬约束（换手率、行业中性、杠杆边界）提供了通用的非线性规划求解器；而高维回归、收缩估计（Ridge、Lasso）与再生核希尔伯特空间方法，则构成了现代截面多因子选股与统计套利的核心推断工具。

第三条主线是平稳性、时间序列与非参数检验：从弱平稳与严平稳的严格刻画出发，ARIMA、GARCH 与协整模型捕捉了金融时序的自相关、波动率聚集与长期均衡关系；进而引入非参数核密度估计、极值理论与平稳块自举技术，使得研究者能够摆脱高斯分布的虚假假设，在重尾、非对称与结构突变的恶劣数据环境中进行无偏的假设检验与模型校准。这三条支流最终在第 34 章的交易成本建模、微观执行优化以及多重过拟合校正中完成全面闭环。

### 34.7.2 典型量化场景中的数学工具协同

在实际量化研究中，任何单一的工业级策略都必须同时调动上述多条知识链条的协同支持。

以现代截面多因子策略为例，因子挖掘阶段依赖高维统计假定检验、信息系数计算与 FDR 假阳性控制；因子去噪与正交化依赖广义奇异值分解与特征值收缩；收益预测与残差风险估计依赖时间序列波动率预测与随机矩阵滤波；目标组合构建依赖二次规划、锥规划及鲁棒优化；最终在挂机下单环节，由 Almgren--Chriss 框架下的随机最优控制与变分法计算最佳执行切片，并以平稳自举与 DSR 检验输出全流程统计审计。

又如高频做市与统计套利策略，其底层依赖标的资产配对利差的 Ornstein--Uhlenbeck 均值回复随机微分方程，微观订单流通过 Hawkes 自激点过程或泊松跳跃过程进行点位到达建模；买卖挂单报价的确定利用 Avellaneda--Stoikov 模型的 HJB 偏微分方程求解库存风险罚项；当订单穿透委托簿时，基于连续时间最优停时与布朗运动极值分布实时监控穿仓边界。数学工具不再是纸面上的抽象符号，而是直接转化为纳秒级与毫秒级决策算法中的稳健控制律。

### 34.7.3 进阶学习与研究路径

对于完成全书修习的研读者而言，本书建立的数学框架构成了坚实的专业起跑线。未来的前沿深入可沿着以下四个关键方向继续探索：

其一是随机控制与深度强化学习的深度交融。随着市场微观博弈的日趋复杂，经典线性二次高斯（LQG）控制逐渐向考虑对手方反作用力的高维平均场博弈（Mean Field Games）与非线性部分可观测马尔可夫决策过程（POMDP）拓展。

其二是粗糙波动率（Rough Volatility）与非马尔可夫随机分析。经验高频数据表明波动率样本路径的 Hurst 指数显著小于半，促使基于分数布朗运动的粗糙微积分与路径依赖偏微分方程成为波动率建模的新一代标准。

其三是高维非渐近统计与对称性几何深度学习。在复杂金融图谱与宏观多源异构数据中，基于黎曼流形、图神经网络与最优输运（Optimal Transport）的几何数据科学正在革新传统线性因子框架。

其四是模型的可解释性与因果推断（Causal Inference）。从纯粹的关联挖掘走向因果不变表征学习，利用结构因果模型（SCM）厘清宏观政策冲击与微观资金流动的因果传导网络，是彻底根除过拟合风险的终极数理途径。

## 本章小结

本章作为全书量化策略建模的收官环节，系统探讨了量化投资策略从历史回测到实盘落地的数理评估体系、微观执行机制与统计推断准则。任何策略的构建不仅依赖于信号预测的数学逻辑，更取决于对真实市场摩擦与统计泛化规律的敬畏。

在绩效度量层面，本章厘清了夏普比率、信息比率、索提诺比率及最大回撤的数理统计本质，强调样本统计量所固有的抽样方差与高阶矩偏误；在微观执行层面，建立了包含显性佣金、买卖价差、暂时冲击与永久冲击的完整交易成本框架，推导了 Almgren--Chriss 框架下的离散与连续最优变现轨迹，并将换手率损耗内生化为组合收益的确定性拖累；在现实约束层面，将资金容量定义为边际净收益的极值边界，并在二次交易成本与杠杆保证金不等式下刻画了凸优化解的存在唯一性与 KKT 条件；最后，在统计推断层面，剖析了多重检验、数据窥视、前视偏差与生存者偏差对回测有效性的侵蚀机制，引入了极值理论下的最大夏普比率渐近界限、平稳块自举检验与收缩夏普比率。科学的策略评估要求研究者将量化策略视为高噪声非平稳环境下的统计推断问题，唯有经历严格信息隔离、冲击摩擦扣除与过拟合惩罚的策略，才具备穿越市场周期的生命力。

## 习题

1. 设单期收益率序列 $R_1, \ldots, R_T$ 独立同分布于期望为 $\mu$、方差为 $\sigma^2$ 的正态分布，样本均值为 $\bar R$，样本标准差为 $s$。样本夏普比率定义为 $\widehat{\mathrm{SR}} = \bar R / s$，真实夏普比率为 $\mathrm{SR} = \mu / \sigma$。试利用多元 Delta 法证明：当样本量 $T \to \infty$ 时，$\sqrt{T}(\widehat{\mathrm{SR}} - \mathrm{SR}) \xrightarrow{\mathrm d} \mathcal N\left(0, 1 + \frac{1}{2} \mathrm{SR}^2\right)$。

2. 在非高斯收益率假定下，设单期超额收益率序列具有有限的前四阶中心矩，偏度为 $\gamma_3 = \mathbb E[(R_t - \mu)^3] / \sigma^3$，峰度为 $\gamma_4 = \mathbb E[(R_t - \mu)^4] / \sigma^4$。试证明样本夏普比率 $\widehat{\mathrm{SR}}$ 的渐近方差满足 $\operatorname{Var}(\widehat{\mathrm{SR}}) = \frac{1}{T}\left(1 - \gamma_3 \mathrm{SR} + \frac{\gamma_4 - 1}{4} \mathrm{SR}^2\right) + o\left(\frac{1}{T}\right)$。

3. 设基准组合单期收益率为 $R_{B,t}$，策略收益率为 $R_{P,t}$，超额收益为 $R_{A,t} = R_{P,t} - R_{B,t}$。信息比率定义为 $\mathrm{IR} = \mathbb E[R_{A,t}] / \sqrt{\operatorname{Var}(R_{A,t})}$。设主动权重为 $\Delta \boldsymbol w \in \mathbb R^n$ 且 $\boldsymbol 1^\top \Delta \boldsymbol w = 0$。证明在二次方差惩罚下极大化主动收益等价于最大化信息比率。

4. 设收益率随机变量为 $R$，目标最低可接受收益率为 $\tau_{\mathrm{MAR}}$。单侧下偏半方差定义为 $\operatorname{LPM}_2(\tau_{\mathrm{MAR}}) = \mathbb E[(\max(0, \tau_{\mathrm{MAR}} - R))^2]$，索提诺比率定义为 $\operatorname{Sortino} = (\mathbb E[R] - \tau_{\mathrm{MAR}}) / \sqrt{\operatorname{LPM}_2(\tau_{\mathrm{MAR}})}$。证明当 $R$ 的分布在 $\tau_{\mathrm{MAR}}$ 附近连续时，目标函数关于权重的梯度存在且连续。

5. 设资产对数价格过程服从具有常漂移 $\mu > 0$ 与常波动率 $\sigma > 0$ 的算术布朗运动 $X_t = \mu t + \sigma W_t$。区间 $[0, T]$ 上的最大回撤定义为 $\mathrm{MDD}(T) = \sup_{0 \le s \le t \le T} (X_s - X_t)$。写出关于尺度参数 $\gamma_{\mathrm{drift}} = \mu / \sigma^2$ 的偏微分方程，并推导当 $T \to \infty$ 时期望最大回撤的渐近线性增长率 $\lim_{T \to \infty} \mathbb E[\mathrm{MDD}(T)] / T$。

6. 比较 Calmar 比率（年化收益率除以历史最大回撤）与 Sterling 比率的抗噪性能。分析在样本量 $T$ 趋于有限小时，极值最大回撤统计量的负偏度对比率估计造成的抽样发散效应。

7. 设机构投资者下达指令在时段 $[0, T]$ 内买入 $Q$ 股股票，时刻 $0$ 的到达中间价为 $P_0$。交易分为 $M$ 笔子单执行，第 $k$ 笔成交量为 $q_k$，成交价格为 $P_k$，显性手续费为 $C_k$，期末未成交股数为 $Q_{\mathrm{unfilled}} = Q - \sum_{k=1}^M q_k$，时段末市场中间价为 $P_T$。严格推导实施缺口（Implementation Shortfall）恒等式，将其精确分解为执行滑点、未成交机会成本与显性费用之和。

8. 假定瞬时买卖价差为常数 $S > 0$，暂时冲击函数为线性形式 $g(v) = \eta v$（$\eta > 0$），永久冲击函数为 $h(v) = \gamma v$（$\gamma > 0$）。若交易员在时钟时间区间 $[0, T]$ 内采用匀速执行策略（TWAP），求整个执行过程的总期望交易摩擦金额，并与一次性市价单执行的总成本进行比较。

9. 在 Almgren--Chriss 连续时间最优执行模型中，设剩余头寸过程为 $x(t)$，满足边界条件 $x(0) = Q$ 与 $x(T) = 0$。标的资产价格服从漂移为零的布朗运动 $\mathrm d S_t = \sigma \, \mathrm d W_t - \gamma \dot{x}(t) \, \mathrm d t$。执行速度为 $v(t) = -\dot{x}(t) > 0$，瞬时暂时冲击为 $\eta v(t)$。投资人目标为极小化期望执行成本加上方差惩罚项：$\min_{x(\cdot)} \int_0^T \left( \eta \dot{x}(t)^2 + \lambda \sigma^2 x(t)^2 \right) \mathrm d t$。试利用变分法 Euler--Lagrange 方程完整推导最优路径 $x^*(t)$ 的双曲正弦解析表达式。

10. 考虑最优执行目标函数中引入风险价值（VaR）或绝对偏差惩罚而非方差惩罚的情形。设目标泛函为 $J(x) = \mathbb E[C] + \lambda \mathbb E[|C - \mathbb E[C]|]$。证明在正态增量假定下，该绝对离差目标与经典 Almgren--Chriss 均值—方差目标的一阶最优条件具有完全相同的微分方程结构。
11. 假定单笔成交比例为 $\nu = q / V$，暂时冲击函数服从经验平方根法则 $\Delta P = Y \sigma \sqrt{\nu}$，其中 $Y > 0$ 为无量纲常数，$\sigma$ 为标的日度波动率，$V$ 为日成交量。若交易员需在日内完成 $Q$ 股的建仓，将其等分为 $N$ 笔离散子单依次买入。试证明在平方根冲击下，子单规模完全均等是最小化总期望暂时冲击金额的唯一最优解。

12. 设策略单期总资产换手率为 $\tau_t$，单边平均综合费用率为 $c > 0$。连续 $T$ 期的单期名义毛收益率为 $R_t$。试严格写出多期几何净复合财富演化递推式 $V_T = V_0 \prod_{t=1}^T (1 + R_t - 2 c \tau_t)$，并利用一阶对数展开推导年化几何平均净收益率关于平均换手率的定量衰减敏感度。

13. 设某量化策略的单期毛超额收益率随资产管理规模 $A$ 呈现非线性幂律衰减：$\alpha(A) = \alpha_0 - \kappa A^\gamma$（其中 $\alpha_0 > 0, \kappa > 0, \gamma > 0$）。定义总净超额收益金额为 $\Pi(A) = A \alpha(A)$。求总利润最大化时的最优管理规模 $A^*$，以及边际超额收益归零时的盈亏平衡规模 $A_{\max}$，证明二者满足严格代数比例关系 $A^* / A_{\max} = (1+\gamma)^{-1/\gamma}$。

14. 考虑包含全额行业中性约束 $\boldsymbol B^\top \boldsymbol w = \boldsymbol 0$、个股持仓上下界 $\boldsymbol l \le \boldsymbol w \le \boldsymbol u$ 以及二次换手惩罚项 $\frac{1}{2}(\boldsymbol w - \boldsymbol w_0)^\top \boldsymbol \Lambda (\boldsymbol w - \boldsymbol w_0)$ 的组合优化问题。试写出该二次规划的拉格朗日函数，推导对应的拉格朗日对偶问题，并证明对偶目标函数具有全局严格凹性。

15. 设由于标的资产价格的随机漂移，离散调仓引起的组合跟踪误差方差以速率 $\sigma_{\Delta}^2$ 随时间线性增长，单次调仓固定交易成本为 $C_0 > 0$。在无穷期连续折现贴现率 $r > 0$ 的设定下，构建平衡跟踪误差惩罚与交易摩擦的目标泛函，推导最优静态调仓时间间隔 $\Delta t^*$ 的解析表达式。

16. 设多空对冲组合的净资产过程服从几何布朗运动 $\mathrm d A_t = \mu A_t \, \mathrm d t + \sigma A_t \, \mathrm d W_t$（$\sigma > 0$），初始净资产为 $A_0$。维持保证金比例占用为初始资产的常数比例 $m \in (0, 1)$。定义穿仓停时为 $\tau = \inf\{t \ge 0 : A_t \le m A_0\}$。利用尺度变换与高斯极值分布，推导在有限时间区间 $[0, T]$ 内穿仓发生概率 $\mathbb P(\tau \le T)$ 的正态积分显式解。

17. 某量化研究团队在 3 年（$T = 756$ 个交易日）的日频数据上独立测试了 $K = 5000$ 个彼此正交的候选量化信号。假定所有信号的真实预测能力均为零，单期收益率独立服从均值为零、方差为 $\sigma^2$ 的正态分布。利用极值理论渐近展开式，定量计算在纯噪声驱动下所能挖掘出的最大样本夏普比率的期望值 $\mathbb E[\max_{1 \le k \le K} \widehat{\mathrm{SR}}_k]$；并将其折算为年化夏普比率，论证为何在缺乏多重检验控制时，年化 1.8 的回测夏普比率完全不具备统计显著性。

18. 设同时检验 $K$ 个量化因子的显著性，单侧检验 $p$ 值序列在零假设下独立服从标准均匀分布 $\mathcal U(0, 1)$。试利用全概率公式与鞅停时定理，完整证明 Benjamini--Hochberg 算法能将伪发现率（FDR）严格控制在 $\frac{K_0}{K} q^* \le q^*$ 之下。

19. 设资产价格服从对数随机游走模型 $p_t = p_{t-1} + \epsilon_t$，其中 $\epsilon_t \sim \text{i.i.d. } \mathcal N(0, \sigma^2)$。某策略在计算时刻 $t$ 的交易信号时，由于代码中数组下标前移，错误地引用了未来价格 $p_{t+1}$，使得仓位权重设定为 $w_t = \operatorname{sign}(p_{t+1} - p_t)$。试推导该策略在单期的期望收益率与方差，并证明其表观年化夏普比率将随样本长度 $T$ 呈现何种异常爆炸行为。

20. 设标的资产池由于经营恶化导致退市的机制由几何布朗运动首达下界触发。利用反射原理与条件布朗桥分布，推导在给定历史存续条件 $\mathcal S = \{\tau > T\}$ 下，留存资产的样本平均收益率与总体无偏期望收益率之间的正偏置差值 $\Delta \mu_{\mathrm{surv}}$ 的数学解析式。

21. 考虑满足一阶自回归过程 $\mathrm{AR}(1)$（自相关系数为 $\rho \in (-1, 1)$）的收益率时间序列。设平稳块自举法的平均块长度为 $b_T$。试证明自举样本均值方差对总体长记忆方差的渐近偏差阶数为 $\mathcal O(1/b_T)$，方差阶数为 $\mathcal O(b_T / T)$，并由此推导使均方误差极小化的最优自举块长阶数 $b_T^* \propto T^{1/3}$。

22. 考虑同时校正数据挖掘试验次数 $K$ 与收益率非高斯性（样本偏度 $\hat\gamma_3$、样本峰度 $\hat\gamma_4$）的收缩夏普比率（Deflated Sharpe Ratio, DSR）。写出 DSR 检验统计量的完整闭式表达式，并推导在显著性水平 $\alpha = 0.05$ 下，判定策略具备真实阿尔法所必须达到的样本夏普比率临界值方程。
