# 第31章　因子模型、IC/RankIC 与研究有效性

因子研究把两个不同层次的问题联系在一起：一是用低维变量解释资产收益的条件均值与共同波动，二是判断一个候选信号是否含有样本外可重复的信息。前者主要是线性代数、回归与协方差建模问题，后者主要是统计推断、时间序列依赖和选择偏差问题。一个较高的样本内 $R^2$、一条向上的分组净值曲线或一个较小的普通 $t$ 检验 $p$ 值，都不能单独回答第二个问题。

本章先建立因子模型的回归表示，再推导主成分因子、IC、RankIC、ICIR、分组组合和换手成本的数学表达。随后把每日或每期截面指标放回时间序列中，分析序列相关对标准误的影响，并用多重检验和重采样方法处理“尝试很多模型后只报告最好一个”所造成的选择偏差。全章的核心不是给出一份因子研究流程清单，而是说明每项统计量的估计对象、成立条件和失效方式。

## 31.1 线性因子模型与回归分解

### 31.1.1 单资产模型与识别条件

设资产 $i$ 在时期 $t$ 的收益为 $R_{i,t}$，$K$ 个已知因子实现值组成随机向量 $\boldsymbol F_t\in\mathbb R^K$。线性因子模型写为

$$
R_{i,t}=\alpha_i+\boldsymbol\beta_i^\top\boldsymbol F_t+\varepsilon_{i,t},
\tag{31.1}
$$

其中 $\alpha_i$ 是截距，$\boldsymbol\beta_i$ 是因子暴露，$\varepsilon_{i,t}$ 是模型未解释部分。仅有式（31.1）并没有识别出唯一的 $\alpha_i$ 和 $\boldsymbol\beta_i$，因为把因子作可逆线性变换并相应变换暴露，仍可得到相同的收益表达式。若采用时间序列最小二乘，通常加入

$$
\mathbb E[\varepsilon_{i,t}]=0,\qquad
\operatorname{Cov}(\boldsymbol F_t,\varepsilon_{i,t})=\boldsymbol 0.
\tag{31.2}
$$

在 $\boldsymbol\Sigma_F=\operatorname{Var}(\boldsymbol F_t)$ 可逆时，式（31.2）唯一给出总体投影系数

$$
\boldsymbol\beta_i=\boldsymbol\Sigma_F^{-1}
\operatorname{Cov}(\boldsymbol F_t,R_{i,t}),\qquad
\alpha_i=\mathbb E[R_{i,t}]-\boldsymbol\beta_i^\top\mathbb E[\boldsymbol F_t].
\tag{31.3}
$$

这首先是**线性投影**，不必立即附加因果解释。若进一步假设在因子条件下 $\mathbb E[\varepsilon_{i,t}\mid\boldsymbol F_t]=0$，式（31.1）才给出条件均值模型 $\mathbb E[R_{i,t}\mid\boldsymbol F_t]=\alpha_i+\boldsymbol\beta_i^\top\boldsymbol F_t$。

**定义 31.1（因子模型的投影分解）**

对任意满足 $\operatorname{Var}(R_{i,t})<\infty$ 且 $\boldsymbol\Sigma_F$ 正定的收益与因子，称式（31.3）确定的 $\alpha_i+\boldsymbol\beta_i^\top\boldsymbol F_t$ 为 $R_{i,t}$ 在常数和 $\boldsymbol F_t$ 张成空间上的 $L^2$ 投影，$\varepsilon_{i,t}$ 为投影残差。

由投影的正交性可得方差分解

$$
\operatorname{Var}(R_{i,t})
=\boldsymbol\beta_i^\top\boldsymbol\Sigma_F\boldsymbol\beta_i
+\operatorname{Var}(\varepsilon_{i,t}).
\tag{31.4}
$$

若 $\boldsymbol\Sigma_F$ 奇异，则某些因子完全共线，$\boldsymbol\beta_i$ 不唯一；此时应在列空间上使用正交投影或删去冗余因子，而不是直接用普通逆矩阵。

**例 31.1**

设单因子模型中 $\operatorname{Var}(F_t)=0.04$，$\operatorname{Cov}(F_t,R_{i,t})=0.02$，$\mathbb E[F_t]=0.02$，$\mathbb E[R_{i,t}]=0.03$，$\operatorname{Var}(R_{i,t})=0.05$。求投影暴露、截距、因子解释方差和残差方差。

**解**

由式（31.3），

$$
\beta_i=\frac{0.02}{0.04}=0.5,\qquad
\alpha_i=0.03-0.5\times0.02=0.02.
$$

因子解释方差为 $\beta_i^2\operatorname{Var}(F_t)=0.5^2\times0.04=0.01$。由式（31.4），残差方差为 $0.05-0.01=0.04$。这里的 $0.02$ 是投影截距，不是自动可以兑现的套利收益；其统计显著性和经济可交易性需要另行检验。

### 31.1.2 多资产形式与因子中性化

把 $N$ 个资产在同一时期的收益写成 $\boldsymbol R_t\in\mathbb R^N$，令 $\boldsymbol B=(\boldsymbol\beta_1,\ldots,\boldsymbol\beta_N)^\top$，则

$$
\boldsymbol R_t=\boldsymbol\alpha+\boldsymbol B\boldsymbol F_t+\boldsymbol\varepsilon_t.
\tag{31.5}
$$

若各资产残差协方差也由 $\boldsymbol\Sigma_\varepsilon$ 表示，则收益协方差为

$$
\boldsymbol\Sigma_R
=\boldsymbol B\boldsymbol\Sigma_F\boldsymbol B^\top+\boldsymbol\Sigma_\varepsilon,
\tag{31.6}
$$

其成立只需残差与因子的交叉协方差为零，并不要求资产之间残差独立。若再假设 $\boldsymbol\Sigma_\varepsilon$ 为对角矩阵，才得到通常的严格因子协方差结构。

因子中性化本质上是投影。设 $\boldsymbol x\in\mathbb R^N$ 是一个候选信号在同一截面上的取值，$\boldsymbol Z\in\mathbb R^{N\times K}$ 的各列是行业哑变量、风格暴露或截距项。若 $\boldsymbol Z^\top\boldsymbol Z$ 可逆，则信号对 $\boldsymbol Z$ 的残差化为

$$
\boldsymbol x_\perp
=\left[\boldsymbol I-\boldsymbol Z(\boldsymbol Z^\top\boldsymbol Z)^{-1}\boldsymbol Z^\top\right]\boldsymbol x.
\tag{31.7}
$$

由投影矩阵的幂等性和对称性，$\boldsymbol Z^\top\boldsymbol x_\perp=\boldsymbol0$。若存在权重约束，应把普通内积换成加权内积；否则“中性化”使用的几何结构与最终组合约束并不一致。

### 31.1.3 时间序列回归与截面回归估计的对象不同

时间序列回归固定资产 $i$，用时间变化估计 $\alpha_i,\boldsymbol\beta_i$。截面回归则固定时期 $t$，估计

$$
R_{i,t}=\lambda_{0,t}+\boldsymbol\beta_i^\top\boldsymbol\lambda_t+\eta_{i,t},
\qquad i=1,\ldots,N,
$$

其中 $\boldsymbol\lambda_t$ 是该期因子风险价格。若暴露随时间估计且误差不可忽略，截面回归会出现测量误差；若同一时期残差相关，普通截面标准误也会失真。Fama–MacBeth 方法先逐期估计 $\boldsymbol\lambda_t$，再对其时间序列求均值和标准误，因此关键假设转移到了 $\boldsymbol\lambda_t$ 的时间依赖结构上，而不是消除了统计问题。

## 31.2 主成分与统计因子

已知因子未必覆盖全部共同波动。主成分分析（PCA）从收益协方差矩阵中提取正交方向。设中心化收益向量 $\boldsymbol X$ 的协方差为 $\boldsymbol\Sigma$，对称半正定，其谱分解为

$$
\boldsymbol\Sigma=\boldsymbol Q\boldsymbol\Lambda\boldsymbol Q^\top,
\qquad \lambda_1\geq\cdots\geq\lambda_N\geq0.
$$

**定理 31.2（主成分的方差最大化性质）**

在单位欧氏范数和与前述方向正交的约束下，第 $k$ 个主成分方向 $\boldsymbol q_k$ 依次最大化 $\operatorname{Var}(\boldsymbol w^\top\boldsymbol X)=\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w$。

**证明**

对任意单位向量 $\boldsymbol w$，在标准正交特征向量基下写 $\boldsymbol w=\sum_{j=1}^Nc_j\boldsymbol q_j$，其中 $\sum_jc_j^2=1$。于是

$$
\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w
=\sum_{j=1}^N\lambda_jc_j^2\leq\lambda_1,
$$

且 $\boldsymbol w=\boldsymbol q_1$ 时等号成立。对第 $k$ 步，附加 $c_1=\cdots=c_{k-1}=0$，同理上界为 $\lambda_k$，由 $\boldsymbol q_k$ 达到。归纳即得。

□

前 $K$ 个主成分的累计解释方差比例为

$$
\operatorname{EVR}(K)=\frac{\sum_{j=1}^K\lambda_j}{\sum_{j=1}^N\lambda_j}
=\frac{\sum_{j=1}^K\lambda_j}{\operatorname{tr}(\boldsymbol\Sigma)}.
\tag{31.8}
$$

PCA 方向也可由收益矩阵的 SVD 得到，但 SVD 的右奇异向量是否对应协方差方向，取决于是否先中心化和采用何种缩放。对变量量纲不同的数据，直接使用协方差 PCA 会让高方差变量主导；使用相关矩阵则等价于先标准化，但估计对象已经改变，不能声称两种结果必然一致。

**例 31.2**

设

$$
\boldsymbol\Sigma=\begin{pmatrix}0.04&0.02\\0.02&0.04\end{pmatrix}.
$$

求主成分方向和第一主成分解释方差比例。

**解**

方向 $(1,1)^\top$ 与 $(1,-1)^\top$ 的特征值分别为 $0.06$ 和 $0.02$。单位化后

$$
\boldsymbol q_1=\frac1{\sqrt2}(1,1)^\top,\qquad
\boldsymbol q_2=\frac1{\sqrt2}(1,-1)^\top.
$$

因此 $\operatorname{EVR}(1)=0.06/(0.04+0.04)=0.75$。第一主成分是等权共同方向，第二主成分是多空差异方向；经济命名必须依赖额外信息，不能由特征向量本身唯一推出。

## 31.3 IC、RankIC 与截面回归

### 31.3.1 Pearson IC

设时期 $t$ 有 $N_t$ 个资产，信号值为 $x_{i,t}$，随后实现的收益为 $r_{i,t+1}$。样本信息系数（information coefficient, IC）定义为当期截面上的 Pearson 相关：

$$
\operatorname{IC}_t=
\frac{\sum_{i=1}^{N_t}(x_{i,t}-\bar x_t)(r_{i,t+1}-\bar r_{t+1})}
{\sqrt{\sum_{i=1}^{N_t}(x_{i,t}-\bar x_t)^2}
\sqrt{\sum_{i=1}^{N_t}(r_{i,t+1}-\bar r_{t+1})^2}}.
\tag{31.9}
$$

这里收益的时间下标必须与信号可交易时间一致。若把 $r_{i,t+1}$ 错配为信号形成前已经实现的收益，式（31.9）仍可能很高，但估计的不是预测相关。

当信号或收益截面方差为零时，IC 无定义，不能记为零后继续计算。IC 对信号和收益的仿射变换 $x\mapsto a+bx$（$b>0$）、$r\mapsto c+dr$（$d>0$）不变，但对一般非线性变换不保持不变。

### 31.3.2 RankIC 与并列秩

RankIC 是信号秩与收益秩之间的 Pearson 相关。若均无并列，令 $d_i=\operatorname{rank}(x_i)-\operatorname{rank}(r_i)$，则 Spearman 公式为

$$
\operatorname{RankIC}=1-\frac{6\sum_{i=1}^Nd_i^2}{N(N^2-1)}.
\tag{31.10}
$$

其证明利用 $1,\ldots,N$ 的均值、平方和公式。两组秩的离差平方和均为 $N(N^2-1)/12$，并且

$$
\sum_i d_i^2=2\sum_i(R_i-\bar R)^2-2\sum_i(R_i-\bar R)(S_i-\bar S).
$$

代入 Pearson 相关定义即得式（31.10）。有并列时必须使用平均秩，再直接计算 Pearson 相关，不能机械套用式（31.10）。

RankIC 对分别作用于信号和收益的严格单调递增变换不变，因而对异常值和单调非线性更稳健；但这种稳健性也意味着它丢弃了间距信息。极端收益对 Pearson IC 的影响可能很大，对 RankIC 只通过秩顺序体现。二者没有普遍谁更“真实”的结论，它们对应不同的损失与评价准则。

**例 31.3**

四个资产的信号依次为 $(1,2,3,4)$，下一期收益为 $(0.02,-0.01,0.04,0.03)$。求 IC 与 RankIC。

**解**

信号和收益均值分别为 $2.5$ 与 $0.02$。离差交叉平方和、各自离差平方和为

$$
S_{xr}=0.04,\qquad S_{xx}=5,\qquad S_{rr}=0.0014.
$$

所以 $\operatorname{IC}=0.04/\sqrt{5\times0.0014}\approx0.4781$。收益秩依次为 $(2,1,4,3)$，与信号秩之差为 $(-1,1,-1,1)$，故

$$
\operatorname{RankIC}=1-\frac{6\times4}{4(16-1)}=0.6.
$$

两者数值不同并不矛盾，因为 Pearson IC 使用收益间距，而 RankIC 只使用排序。

### 31.3.3 IC 与截面斜率的关系

若截面回归写成 $r_i=a+bx_i+\eta_i$，则

$$
\widehat b=\frac{S_{xr}}{S_{xx}}
=\operatorname{IC}\frac{s_r}{s_x},
\tag{31.11}
$$

其中 $s_x,s_r$ 必须使用与 IC 相同的分母约定。若信号和收益都标准化到截面单位标准差，回归斜率就等于 IC。于是“相关显著”与“斜率显著”在标准普通最小二乘且假设一致时密切相关；但相关本身不含收益幅度，$0.01$ 的 IC 在很大的收益波动和头寸规模下也可能对应经济量级，反之亦然。

## 31.4 IC 时间序列、ICIR 与相关数据推断

设按固定规则得到序列 $\operatorname{IC}_1,\ldots,\operatorname{IC}_T$。常用汇总指标为

$$
\overline{\operatorname{IC}}=\frac1T\sum_{t=1}^T\operatorname{IC}_t,
\qquad
\operatorname{ICIR}=\frac{\overline{\operatorname{IC}}}{s_{\operatorname{IC}}},
\tag{31.12}
$$

其中 $s_{\operatorname{IC}}$ 是样本标准差。若一年有 $K$ 期，并且 IC 序列平稳、弱相关、均值和标准差稳定，才常用 $\sqrt K\operatorname{ICIR}$ 作年化信息比率近似。它不是无条件的定义，尤其不能把高度自相关的日频 IC 机械年化。

若暂时假设 $\operatorname{IC}_t$ 独立同分布，均值 $\mu$、有限方差 $\sigma^2$，则

$$
\operatorname{Var}(\overline{\operatorname{IC}})=\frac{\sigma^2}{T},
\qquad
t=\frac{\overline{\operatorname{IC}}}{s_{\operatorname{IC}}/\sqrt T}
\tag{31.13}
$$

在小样本正态假设下服从自由度 $T-1$ 的 $t$ 分布。金融 IC 通常存在自相关、条件异方差和横截面结构变化，独立假设常不成立。

对弱平稳序列，令 $\gamma_h=\operatorname{Cov}(\operatorname{IC}_t,\operatorname{IC}_{t-h})$，则

$$
\operatorname{Var}(\overline{\operatorname{IC}})
=\frac1T\left[\gamma_0+2\sum_{h=1}^{T-1}\left(1-\frac hT\right)\gamma_h\right].
\tag{31.14}
$$

Newey–West 估计用样本自协方差 $\widehat\gamma_h$ 和 Bartlett 权重构造

$$
\widehat{\operatorname{Var}}_{\mathrm{HAC}}(\overline{\operatorname{IC}})
=\frac1T\left[\widehat\gamma_0+
2\sum_{h=1}^{L}\left(1-\frac{h}{L+1}\right)\widehat\gamma_h\right].
\tag{31.15}
$$

滞后阶数 $L$ 不能根据哪个结果更显著来挑选。它应结合预测持有期、抽样频率和渐近规则预先确定。HAC 修正的是长期方差估计，不会修复前视偏差、错误标签或样本选择。

若 IC 近似 AR(1)，$\operatorname{IC}_t-\mu=\rho(\operatorname{IC}_{t-1}-\mu)+u_t$，$|\rho|<1$ 且 $u_t$ 为不相关创新，则 $\gamma_h=\rho^{|h|}\gamma_0$，长期方差为

$$
\gamma_0\left(1+2\sum_{h=1}^{\infty}\rho^h\right)
=\gamma_0\frac{1+\rho}{1-\rho}.
$$

因此有效样本量近似为

$$
T_{\mathrm{eff}}\approx T\frac{1-\rho}{1+\rho}.
\tag{31.16}
$$

当 $\rho$ 接近 $1$ 时，名义观测数远大于有效信息量。

**例 31.4**

某因子有 $T=60$ 期 IC，均值 $0.04$，样本标准差 $0.08$。独立假设下的 $t$ 值为

$$
\frac{0.04}{0.08/\sqrt{60}}\approx3.873.
$$

若序列近似 AR(1) 且 $\rho=0.5$，则 $T_{\mathrm{eff}}\approx60(0.5/1.5)=20$，相应近似 $t$ 值降为 $0.04/(0.08/\sqrt{20})\approx2.236$。这只是基于 AR(1) 的近似，实际报告应估计长期方差，而不是把 $\rho$ 当作已知真值。

单个截面的资产收益也存在横截面相关。若把 $N$ 只高度相似的股票当作 $N$ 个独立证据，会低估截面回归或组合均值的不确定度。此时需要根据研究设计使用资产和时间双向聚类、横截面相关稳健方法或适当的区块重采样；“每期一个 IC”与“每期 $N$ 个独立样本”是两种不同的数据结构。

## 31.5 分组回测、组合收益与换手

### 31.5.1 分组是次序统计量上的组合规则

在时期 $t$ 按信号 $X_{i,t}$ 排序，第 $g$ 组选取秩位于指定区间的资产。若采用等权，第 $g$ 组下一期收益为

$$
R_{g,t+1}=\frac1{|G_{g,t}|}\sum_{i\in G_{g,t}}R_{i,t+1}.
$$

最高信号组与最低信号组的多空收益常写为

$$
R_{H-L,t+1}=R_{H,t+1}-R_{L,t+1}.
\tag{31.17}
$$

由于分组由当期信号决定，组内资产的未来收益不是事先独立的随机样本。分位点还受截面分布、并列值和资产池变化影响。若信号高度并列，强行按固定只数分组可能引入任意排序，应报告并列处理规则。

若分组使用未来才能知道的成分股、退市状态或标准化参数，即使 IC 公式正确，回测仍含前视或生存者偏差。数学上的随机变量必须对应当时信息集可测的决策规则。

### 31.5.2 从收益到净收益

设调仓前旧权重随价格漂移为 $\boldsymbol w_{t^-}$，调仓后目标权重为 $\boldsymbol w_t$。单边换手率的一种常见定义为

$$
\operatorname{TO}_t=\frac12\sum_{i=1}^N|w_{i,t}-w_{i,t^-}|.
\tag{31.18}
$$

若买卖每单位换手 proportional cost 均为 $c$，且暂时忽略非线性冲击，则成本近似为 $c\sum_i|w_{i,t}-w_{i,t^-}|=2c\operatorname{TO}_t$。有的数据供应商把 $\sum_i|\Delta w_i|$ 本身称为换手率，因此使用公式前必须统一口径。

若时期毛收益为 $R_{p,t}$，简化成本模型下净收益可写为

$$
R_{p,t}^{\mathrm{net}}\approx R_{p,t}-2c\operatorname{TO}_t,
\tag{31.19}
$$

更高精度应在现金流层面逐项扣除费用，而不是长期依赖一阶近似。

**例 31.5**

调仓前权重为 $(0.5,0.3,0.2)$，目标权重为 $(0.4,0.4,0.2)$。按式（31.18），

$$
\operatorname{TO}=\frac12(0.1+0.1+0)=0.1.
$$

若 $c=0.002$，则成本为 $2\times0.002\times0.1=0.0004$，即 $4$ 个基点。若误把 $c$ 直接乘式（31.18），会把成本低估一半。

### 31.5.3 重叠持有期与绩效估计

若每天都构造未来 $h$ 日收益，则相邻标签共享 $h-1$ 个日期，收益序列通常呈现机械自相关。即使每日信号独立，重叠收益也不独立。此时普通独立样本 $t$ 检验的方差通常偏小，应采用与持有期相适应的 HAC、非重叠抽样或区块 Bootstrap。非重叠抽样减少依赖，却也减少样本数，不能无条件视为更优。

## 31.6 多重检验与回测过拟合

### 31.6.1 多重比较改变的是整个研究的错误率

对第 $j$ 个因子检验 $H_{0j}$，得到 $p$ 值 $p_j$。若研究者在 $m$ 个因子中只报告最小 $p$ 值，则实际统计量是 $p_{(1)}=\min_jp_j$，而不是随机预先指定的一次检验。若所有原假设为真且各 $p_j$ 独立并服从均匀分布，则

$$
\mathbb P(p_{(1)}\leq\alpha)=1-(1-\alpha)^m.
\tag{31.20}
$$

$m=20,\alpha=0.05$ 时，该概率约为 $64.2\%$。相关性会改变具体数值，但不会使选择问题自动消失。

Bonferroni 方法以 $\alpha/m$ 控制族错误率（family-wise error rate, FWER）：任一原假设被错误拒绝的概率不超过 $\alpha$，无需独立假设。Holm 方法将 $p_{(1)}\leq\cdots\leq p_{(m)}$ 排序，从 $j=1$ 起比较

$$
p_{(j)}\leq\frac{\alpha}{m-j+1},
$$

遇到第一个不通过即停止，之前的假设拒绝。它通常比统一 Bonferroni 更有效，同时仍控制 FWER。

Benjamini–Hochberg（BH）方法控制错误发现比例（false discovery proportion, FDP）的期望。令 $q$ 为目标 FDR，取

$$
k=\max\left\{j:p_{(j)}\leq\frac jq\alpha?\right\}
$$

时不应写出含混表达式；准确规则为：在显著性水平 $q$ 下，

$$
k=\max\left\{j:p_{(j)}\leq\frac{j}{m}q\right\},
\tag{31.21}
$$

若集合非空，则拒绝前 $k$ 个。BH 的经典控制结论要求独立或特定正相关条件；在任意依赖结构下不能无条件照搬标准 FDR 结论，可采用保守修正或重采样方法。

**例 31.6**

五个原假设的排序 $p$ 值为 $(0.001,0.008,0.02,0.04,0.2)$，取总体水平 $0.05$。Bonferroni 阈值为 $0.01$，拒绝前两个。BH 在 $q=0.05$ 下的五个阈值依次为

$$
(0.01,0.02,0.03,0.04,0.05).
$$

最大满足条件的秩为 $4$，故 BH 拒绝前四个。BH 允许部分错误发现，目标与 Bonferroni 不同，不能据此说它“更宽松所以更不严谨”。

### 31.6.2 最优绩效的选择偏差

设 $m$ 个策略在原假设下的估计 Sharpe 为 $\widehat S_1,\ldots,\widehat S_m$，研究者选择 $\widehat S_{(m)}=\max_j\widehat S_j$。即使每个单独估计都服从均值为零的对称分布，最大值也有正期望。独立性下，每个近似标准正态时，常用极值近似给出

$$
\mathbb E[\max_jZ_j]\approx\sqrt{2\log m}
\tag{31.22}
$$

的尺度直觉，但有限 $m$ 的精确期望并非此式，策略相关性也会改变极值分布。正确的零分布应尽量保留策略间相关性和时间依赖，而不是分别做独立正态校正。

White 的 Reality Check 思路是在统一原假设下，用 Bootstrap 重造整组策略的绩效分布，再以最大统计量校准；若各策略时间依赖明显，应使用适当区块 Bootstrap。其核心不是某个固定公式，而是**让零分布包含“搜索并取最大值”这一动作**。若参数、因子和窗口是陆续尝试的，试验日志中的 $m$ 不能只计算最后报告表格中的模型数。

### 31.6.3 前视、泄漏与验证集重复使用

设样本内区间为 $\mathcal T_{\mathrm{train}}$，验证区间为 $\mathcal T_{\mathrm{val}}$，最终测试区间为 $\mathcal T_{\mathrm{test}}$。所有预处理参数，包括缺失值规则、截面标准化参数、特征筛选和模型超参数，都应只由当时可用训练数据确定。若先对全样本做特征选择再交叉验证，验证折的信息已通过选择步骤进入模型，产生泄漏。

当标签为 $[t,t+h]$ 的区间收益时，训练样本若与验证标签区间重叠，即使训练时间戳早于验证起点，也可能共享未来收益信息。purge 是删除这些重叠训练样本；embargo 是在边界后再留出一段间隔，用于降低信息通过更长持有期、公开滞后或序列结构渗透的风险。两者不能修复本身带有未来数据的特征。

最终测试集若被反复查看并用于修改模型，就已成为验证集。此时其 $p$ 值不再对应一个独立、一次性的确认实验。嵌套交叉验证把模型选择放在内层，把泛化评估放在外层；时间序列还需保持时间顺序并处理标签重叠。

## 31.7 一个可检验的因子研究数学结构

严谨的因子研究应把估计对象写清楚。例如，研究问题可以是“在既定资产池和交易成本模型下，信号排序对下一期条件均值是否有增量信息”，而不是笼统的“因子是否有效”。一种可检验结构是：

1. 用当时信息集定义信号 $X_t$、资产池 $\mathcal U_t$ 和收益标签 $R_{t+1}$；
2. 用投影或含控制变量的回归区分增量信息与已有暴露；
3. 分别报告 IC、RankIC、截面斜率和分组收益，因为它们估计不同泛函；
4. 对 IC 和收益时间序列使用与依赖结构相容的标准误；
5. 对全部尝试的因子、参数和窗口控制多重比较；
6. 通过时间外样本、purge/embargo 和最终未触碰测试集评估可重复性；
7. 把毛收益、换手、成本和容量放在同一决策规则下检验。

若信号在经济上有效但统计功效不足，可能得到不显著结果；若样本量大且选择偏差严重，也可能得到统计显著但不可交易的结果。统计证据、经济量级与研究设计需要同时成立。

## 本章小结

因子模型的基础是收益对因子的正交投影，暴露、截距和协方差分解都由投影条件确定。PCA 是在特定内积和缩放下的方差最大化方向，不自动等于有经济含义的因子。IC 与 RankIC 分别衡量截面线性相关和秩相关；ICIR 是 IC 时间序列的均值—波动比，其显著性取决于长期方差而非名义样本数 alone。分组回测把信号映射为次序统计量上的组合，净收益还必须扣除由权重变化决定的成本。

研究有效性的关键边界是：每个检验只针对预先说明的原假设，而多次搜索后的最佳结果必须按整个搜索过程校准。HAC、区块 Bootstrap、多重检验、purge/embargo 和嵌套验证处理的是不同问题，不能互相替代。把这些工具组合起来，才能把“样本内看起来有效”转化为可检验、可反驳的研究命题。

## 习题

1. **【基础】** 单因子投影中，$\operatorname{Var}(F)=0.09$、$\operatorname{Cov}(F,R)=0.018$、$\mathbb E[F]=0.01$、$\mathbb E[R]=0.025$、$\operatorname{Var}(R)=0.04$。求 $\beta,\alpha$、因子解释方差和残差方差。
2. **【基础】** 设 $\boldsymbol Z=(\boldsymbol1,\boldsymbol z)$，其中 $\boldsymbol1$ 为全一向量。证明按式（31.7）残差化后的信号同时满足截面均值为零及与 $\boldsymbol z$ 的样本协方差为零，并说明 $\boldsymbol Z^\top\boldsymbol Z$ 不可逆时为何不能直接使用该公式。
3. **【基础】** 对协方差矩阵 $\boldsymbol\Sigma=\begin{pmatrix}0.09&0\\0&0.01\end{pmatrix}$，求 PCA 方向和解释方差比例。若第二个变量扩大为原来的 $10$ 倍而第一个不变，重新计算并解释量纲影响。
4. **【核心】** 证明相关矩阵 PCA 等价于对原变量分别标准化后再做协方差 PCA，并说明为什么标准化后的主成分得分不能不加变换地解释为原始收益组合。
5. **【基础】** 四个资产信号为 $(-1,0,1,2)$，收益为 $(-0.02,0.01,0,0.03)$。计算 Pearson IC。
6. **【基础】** 五个资产的信号秩为 $(1,2,3,4,5)$，收益秩为 $(2,1,4,3,5)$。计算 RankIC。若收益中有两个并列，说明应如何修改计算。
7. **【核心】** 设收益 $R$ 是信号 $X$ 的严格递增非线性变换。分别讨论 Pearson IC 与 RankIC 是否必然不变，并构造一个 Pearson IC 改变的具体例子。
8. **【核心】** 某截面 $s_x=2$、$s_r=0.06$、IC $=0.25$。求收益对信号回归的斜率，并解释当信号和收益都标准化后斜率为何等于 IC。
9. **【核心】** 某因子有 $T=100$ 期 IC，均值 $0.015$、标准差 $0.10$。计算 ICIR 和独立假设下的 $t$ 值。若 AR(1) 近似中 $\rho=0.6$，求有效样本量及相应近似 $t$ 值。
10. **【推导】** 对弱平稳 IC 序列，从 $\operatorname{Var}(\sum_{t=1}^T\operatorname{IC}_t)$ 推导式（31.14），并说明只保留 $h=1$ 时会遗漏哪些协方差项。
11. **【核心】** 已知 AR(1) 的 $\gamma_0=0.0064$、$\rho=0.25$。用长期方差公式计算均值渐近方差 $\operatorname{Avar}(\overline{\operatorname{IC}})$ 中的长期方差，并比较 $T=80$ 时独立与相关情形的标准误。
12. **【基础】** 某期最高组等权收益为 $(0.03,0.01,-0.02)$，最低组等权收益为 $(0.01,-0.01,0.02)$。计算两组收益及多空收益。若每组还有 $0.001$ 的成本，分别扣除后多空净收益是多少？
13. **【核心】** 调仓前权重为 $(0.45,0.35,0.20)$，目标权重为 $(0.30,0.50,0.20)$。按式（31.18）计算换手率；若 $c=0.0015$，按式（31.19）计算成本。解释为何直接用目标权重与初始权重之和可能把换手率算错。
14. **【分析】** 每日形成未来 $5$ 日收益标签。说明为什么相邻标签通常相关，并比较多日 HAC、非重叠抽样和完全忽略相关性三种处理的估计对象或缺陷。
15. **【核心】** 同时检验 $50$ 个预先定义的因子，FWER 控制在 $0.05$。求 Bonferroni 单因子阈值。若最小三个 $p$ 值为 $0.0004,0.0008,0.0012$，Holm 方法依次如何判断？
16. **【核心】** 六个排序 $p$ 值为 $(0.001,0.006,0.012,0.02,0.04,0.09)$。在 BH 的 $q=0.05$ 下确定拒绝集合，并与 Bonferroni 在 $0.05$ 水平下的结果比较。
17. **【推导】** 假设 $20$ 个独立策略在各自原假设下的检验都是双侧标准正态近似，统计量为 $|Z_j|$。求至少一个 $|Z_j|>1.96$ 的概率，并解释为何它不是“最佳策略单独显著”的证据。可取 $\Phi(1.96)=0.975002$。
18. **【分析】** 训练标签为未来 $3$ 日收益，验证集从第 $101$ 日开始。训练样本时间戳到第 $100$ 日为止。指出至少哪些训练样本应与验证边界发生标签重叠而被 purge，并说明 embargo 与“直接使用未来数据”的区别。
19. **【分析】** 某研究者先用全样本计算 IC，保留表现最好的 $20$ 个特征，再做时间序列交叉验证。解释交叉验证分数为何仍可能乐观，并给出数学上更合理的选择结构。
20. **【综合】** 某信号经过 $m=30$ 个版本搜索后，最佳版本有 $T=80$ 期 IC，均值 $0.02$、标准差 $0.09$，AR(1) 近似 $\rho=0.5$；该版本毛多空收益均值为每期 $0.0012$，按既定成本模型每期成本 $0.0005$。分别计算净收益、独立与相关近似下的 IC $t$ 值，并说明即使相关近似下显著，为什么仍需处理 $30$ 次搜索和最终样本外验证。
