# 第31章习题参考答案与解析

## 1.

由总体投影公式，

$$
\beta=\frac{\operatorname{Cov}(F,R)}{\operatorname{Var}(F)}
=\frac{0.018}{0.09}=0.2.
$$

截距为

$$
\alpha=\mathbb E[R]-\beta\mathbb E[F]
=0.025-0.2\times0.01=0.023.
$$

因子解释方差为

$$
\beta^2\operatorname{Var}(F)=0.2^2\times0.09=0.0036.
$$

由正交投影的方差分解，

$$
\operatorname{Var}(\varepsilon)=0.04-0.0036=0.0364.
$$

这里的 $\alpha$ 是线性投影截距。仅凭这些矩不能推出它在统计上显著，也不能推出存在无风险套利。

## 2.

式（31.7）中的矩阵

$$
\boldsymbol P=\boldsymbol I-\boldsymbol Z(\boldsymbol Z^\top\boldsymbol Z)^{-1}\boldsymbol Z^\top
$$

是对称幂等矩阵，即 $\boldsymbol P^\top=\boldsymbol P$、$\boldsymbol P^2=\boldsymbol P$。直接计算得

$$
\boldsymbol Z^\top\boldsymbol x_\perp
=\boldsymbol Z^\top\boldsymbol x-
\boldsymbol Z^\top\boldsymbol Z(\boldsymbol Z^\top\boldsymbol Z)^{-1}
\boldsymbol Z^\top\boldsymbol x=\boldsymbol0.
$$

因为 $\boldsymbol1$ 是 $\boldsymbol Z$ 的第一列，所以 $\boldsymbol1^\top\boldsymbol x_\perp=0$，即残差信号的截面均值为零。又因为 $\boldsymbol z$ 是第二列，$\boldsymbol z^\top\boldsymbol x_\perp=0$。结合均值为零，样本协方差的分子为

$$
(\boldsymbol z-\bar z\boldsymbol1)^\top\boldsymbol x_\perp
=\boldsymbol z^\top\boldsymbol x_\perp-\bar z\boldsymbol1^\top\boldsymbol x_\perp=0.
$$

若 $\boldsymbol Z^\top\boldsymbol Z$ 不可逆，则 $\boldsymbol1$ 与 $\boldsymbol z$ 共线，例如 $\boldsymbol z$ 为常数列。此时普通逆不存在，投影系数不唯一，但向 $\boldsymbol Z$ 列空间的正交投影仍然唯一，可通过删去冗余列、QR 或 Moore–Penrose 广义逆计算。

## 3.

原矩阵已经对角化，特征值为 $0.09$ 和 $0.01$，对应方向分别为 $\boldsymbol e_1=(1,0)^\top$ 与 $\boldsymbol e_2=(0,1)^\top$。第一主成分是 $\boldsymbol e_1$，其解释方差比例为

$$
\frac{0.09}{0.09+0.01}=0.9.
$$

若第二个变量扩大为原来的 $10$ 倍，新变量为 $\boldsymbol Y=\boldsymbol D\boldsymbol X$，其中 $\boldsymbol D=\operatorname{diag}(1,10)$。新协方差为

$$
\boldsymbol D\boldsymbol\Sigma\boldsymbol D
=\begin{pmatrix}0.09&0\\0&1\end{pmatrix}.
$$

第一主成分变为 $\boldsymbol e_2$，解释方差比例为 $1/1.09\approx0.9174$，另一方向解释比例约为 $0.0826$。变化完全来自尺度改变，而非变量间出现新的依赖结构。因此 PCA 前必须明确使用协方差还是相关矩阵。

## 4.

设原变量均值为 $\boldsymbol\mu$，标准差对角矩阵为

$$
\boldsymbol D=\operatorname{diag}(\sigma_1,\ldots,\sigma_N),
$$

且各 $\sigma_i>0$。标准化变量为

$$
\boldsymbol Y=\boldsymbol D^{-1}(\boldsymbol X-\boldsymbol\mu).
$$

其协方差为

$$
\operatorname{Var}(\boldsymbol Y)
=\boldsymbol D^{-1}\boldsymbol\Sigma\boldsymbol D^{-1}
=\boldsymbol C,
$$

即原变量的相关矩阵 $\boldsymbol C$。因此相关矩阵 PCA 与标准化变量协方差 PCA 完全相同。

若标准化主成分方向为 $\boldsymbol q$，得分为

$$
\boldsymbol q^\top\boldsymbol Y
=\boldsymbol q^\top\boldsymbol D^{-1}(\boldsymbol X-\boldsymbol\mu).
$$

写成原始变量的线性组合，权重是 $\boldsymbol D^{-1}\boldsymbol q$，一般不再是单位向量，也不再与 $\boldsymbol q$ 具有相同尺度。若直接把 $\boldsymbol q$ 当作原始收益组合权重，估计对象和方差都会改变。

## 5.

信号和收益均值为

$$
\bar x=0.5,\qquad \bar r=0.005.
$$

离差分别为

$$
(-1.5,-0.5,0.5,1.5),\qquad
(-0.025,0.005,-0.005,0.025).
$$

因此

$$
S_{xr}=1.5\times0.025-0.5\times0.005-0.5\times0.005+1.5\times0.025=0.07,
$$

$$
S_{xx}=5,\qquad S_{rr}=0.0013.
$$

所以

$$
\boxed{\operatorname{IC}=\frac{0.07}{\sqrt{5\times0.0013}}
=\frac{0.07}{\sqrt{0.0065}}\approx0.8682.}
$$

IC 接近 $1$ 不表示收益可以由信号无误差预测，只表示四个点的线性排列关系很强。

## 6.

秩差为

$$
\boldsymbol d=(-1,1,-1,1,0),\qquad \sum_i d_i^2=4.
$$

无并列时直接使用 Spearman 公式：

$$
\operatorname{RankIC}=1-\frac{6\times4}{5(25-1)}
=1-\frac{24}{120}=\boxed{0.8}.
$$

若收益有并列，应为同一并列组分配平均秩，然后把信号秩和收益秩当作两组数值，直接计算 Pearson 相关。此时不能再套用只适用于无并列秩的 $1-6\sum d_i^2/[N(N^2-1)]$ 公式。

## 7.

RankIC 在严格递增变换下不变，因为资产顺序及秩完全不变。Pearson IC 只对正斜率仿射变换保证不变，对一般非线性变换可能改变。

例如取等权样本

$$
X=(1,2,3),\qquad R=X^2=(1,4,9).
$$

变换 $x\mapsto x^2$ 在 $x>0$ 上严格递增，因此 RankIC 为 $1$。但 Pearson 相关为

$$
\operatorname{Corr}(X,X^2)
=\frac{\mathbb E[X^3]-\mathbb E[X]\mathbb E[X^2]}
{\sqrt{\operatorname{Var}(X)\operatorname{Var}(X^2)}}.
$$

用样本离差等价计算可得

$$
\operatorname{Corr}(X,X^2)
=\frac{8/3}{\sqrt{(2/3)(98/9)}}=\frac{2\sqrt3}{\sqrt{98}}\approx0.9899,
$$

并非 $1$。秩相关高不等于数值关系线性。

## 8.

由式（31.11），

$$
\widehat b=\operatorname{IC}\frac{s_r}{s_x}
=0.25\times\frac{0.06}{2}=\boxed{0.0075}.
$$

即信号每增加一个原单位，拟合收益增加 $0.0075$。若 $x,r$ 分别标准化为 $\tilde x=(x-\bar x)/s_x$、$\tilde r=(r-\bar r)/s_r$，则标准化变量标准差均为 $1$，于是

$$
\widehat b_{\mathrm{std}}
=\operatorname{IC}\frac{1}{1}=\operatorname{IC}.
$$

这说明 IC 是标准化截面回归的斜率，不是原始量纲下的收益弹性。

## 9.

信息比率为

$$
\operatorname{ICIR}=\frac{0.015}{0.10}=\boxed{0.15}.
$$

独立假设下，

$$
t=\frac{0.015}{0.10/\sqrt{100}}=\boxed{1.5}.
$$

若 AR(1) 近似中 $\rho=0.6$，有效样本量为

$$
T_{\mathrm{eff}}\approx100\frac{1-0.6}{1+0.6}=25.
$$

相应近似 $t$ 值为

$$
t_{\mathrm{adj}}\approx\frac{0.015}{0.10/\sqrt{25}}=\boxed{0.75}.
$$

样本量修正揭示了正自相关导致的信息量下降。实际推断仍应使用估计的 HAC 长期方差，而不是把 AR(1) 当作确定真模型。

## 10.

令 $\mu=\mathbb E[\operatorname{IC}_t]$，由弱平稳性，

$$
\begin{aligned}
\operatorname{Var}\left(\sum_{t=1}^T\operatorname{IC}_t\right)
&=\sum_{t=1}^T\sum_{s=1}^T
\operatorname{Cov}(\operatorname{IC}_t,\operatorname{IC}_s)\\
&=T\gamma_0+\sum_{h=1}^{T-1}2(T-h)\gamma_h.
\end{aligned}
$$

第一项来自 $T$ 个对角元素；对每个 $h\geq1$，$(t,s)$ 与 $(s,t)$ 两队位置各有 $T-h$ 个，因此系数为 $2(T-h)$。两边除以 $T^2$ 得

$$
\operatorname{Var}(\overline{\operatorname{IC}})
=\frac1T\left[\gamma_0+2\sum_{h=1}^{T-1}\left(1-\frac hT\right)\gamma_h\right].
$$

只保留 $h=1$ 会遗漏 $\gamma_2,\ldots,\gamma_{T-1}$。若 IC 有较长衰减、重叠持有期或季节性，这些项可能占总方差的重要部分。

## 11.

AR(1) 的长期方差为

$$
\gamma_0\frac{1+\rho}{1-\rho}
=0.0064\times\frac{1.25}{0.75}
=0.0106667.
$$

独立假设下，$T=80$ 时均值标准误为

$$
\sqrt{\frac{0.0064}{80}}\approx0.008944.
$$

相关情形下，使用长期方差的渐近标准误为

$$
\sqrt{\frac{0.0106667}{80}}\approx0.011547.
$$

后者约为前者的 $1.291$ 倍。若仍使用独立公式，会把 $t$ 值放大约 $1.291$ 倍。

## 12.

最高组等权收益为

$$
R_H=\frac{0.03+0.01-0.02}{3}=0.0066667.
$$

最低组等权收益为

$$
R_L=\frac{0.01-0.01+0.02}{3}=0.0066667.
$$

因此毛多空收益为

$$
R_{H-L}=R_H-R_L=\boxed{0}.
$$

每组各扣除 $0.001$ 后，两组净收益均为 $0.0056667$，多空净收益仍为零。这个题目说明：多空组合中多头和空头的成本可能部分抵消于收益差之外，但净多空收益是“两组净收益之差”，不是只从多头扣成本。

## 13.

权重变化绝对值为 $(0.15,0.15,0)$，故

$$
\operatorname{TO}=\frac12(0.15+0.15)=\boxed{0.15}.
$$

成本为

$$
2c\operatorname{TO}=2\times0.0015\times0.15=\boxed{0.00045},
$$

即 $4.5$ 个基点。

权重变化之和为 $-0.15+0.15+0=0$，它只反映全额投资组合的预算约束，不能衡量交易量。换手取决于绝对权重变化，而且调仓前权重应使用收益实现后漂移的 $\boldsymbol w_{t^-}$，不能长期沿用上一期的目标权重。

## 14.

第 $t$ 日和第 $t+1$ 日的未来 $5$ 日收益共享 $4$ 个日期。即使每日新增信息不相关，标签也因重叠而机械相关，通常呈现近似 MA(4) 的短程结构；若信号和收益本身还有动态依赖，相关可能持续更久。

- **HAC**：保留全部重叠观测，估计均值的长期方差。滞后阶数至少应反映机械重叠，但不能只机械固定为 $4$ 而忽略其他依赖。
- **非重叠抽样**：例如每 $5$ 日取一个标签，降低标签重叠造成的相关，但减少观测数，而且不同起点可能得到不同估计。其估计精度未必优于正确使用全部数据。
- **忽略相关性**：仍可能得到相同的样本均值，但通常低估正相关情形下的标准误，使置信区间过窄、检验过度拒绝。

三种方法改变的不是收益标签本身，而是方差估计和有效信息量处理。

## 15.

Bonferroni 的单因子阈值为

$$
\frac{0.05}{50}=\boxed{0.001}.
$$

Holm 方法逐步比较：

1. 最小 $p$ 值 $0.0004$ 与 $0.05/50=0.001$ 比较，拒绝第一个；
2. 第二小 $p$ 值 $0.0008$ 与 $0.05/49\approx0.0010204$ 比较，拒绝第二个；
3. 第三小 $p$ 值 $0.0012$ 与 $0.05/48\approx0.0010417$ 比较，不通过，停止。

所以 Holm 拒绝前两个，后续假设即使数值很小也不在本轮拒绝集合中。Holm 的逐步停止规则是 FWER 控制证明的一部分，不能越过失败项继续拒绝。

## 16.

BH 在 $m=6,q=0.05$ 下的阈值为

$$
\left(\frac16,\frac26,\frac36,\frac46,\frac56,\frac66\right)0.05
=(0.00833,0.01667,0.025,0.03333,0.04167,0.05).
$$

前五个 $p$ 值均不超过对应阈值，第六个 $0.09>0.05$，故最大合格秩 $k=5$。BH 拒绝前五个假设。

Bonferroni 阈值为 $0.05/6\approx0.00833$，只拒绝 $0.001$ 和 $0.006$ 对应的前两个。BH 控制的是期望错误发现比例，Bonferroni 控制至少一次错误拒绝的概率，目标不同。

## 17.

单个策略不超出阈值的概率为

$$
\mathbb P(|Z_j|\leq1.96)=2\Phi(1.96)-1=0.950004.
$$

由独立性，全部不超出阈值的概率为 $0.950004^{20}$，所以至少一个超出阈值的概率为

$$
\boxed{1-0.950004^{20}\approx0.6415.}
$$

因此，在所有策略都无效的原假设下，仍有约 $64\%$ 的概率出现至少一个名义显著结果。选择其中最小 $p$ 值或最大 $|Z|$ 后，其分布已不是单个标准正态。策略相关会改变精确概率，但搜索后的结果仍须按整个搜索族校准。

## 18.

若第 $t$ 日标签覆盖第 $t+1$ 至第 $t+3$ 日收益，验证集从第 $101$ 日开始，则：

- 第 $98$ 日训练标签覆盖第 $99$–$101$ 日；
- 第 $99$ 日标签覆盖第 $100$–$102$ 日；
- 第 $100$ 日标签覆盖第 $101$–$103$ 日。

它们都与验证标签的时间范围共享收益信息，因此至少应 purge 第 $98$、$99$、$100$ 日训练样本。第 $97$ 日标签在第 $100$ 日结束，不与第 $101$ 日开始的验证标签重叠。

embargo 是在 purge 之外再预留边界间隔，以防范更长的信息传播或依赖结构。二者都是验证设计，不是删除未来数据的替代方法；若特征计算本身使用了未来信息，purge 和 embargo 不能使其变为合法特征。

## 19.

全样本 IC 排名使用了各验证折的未来收益。即使后续交叉验证中模型参数只由训练折估计，输入特征集合已经由全样本标签决定，验证折信息通过特征筛选进入模型，因此评估不是对该完整建模流程的外样本模拟。

合理结构是把选择步骤放入训练过程：对每个外层训练折，仅在该折内计算 IC 并选择特征，再训练模型并在外层验证折评估。如果还要用 IC 阈值、特征数量等作为超参数，应在外层训练折内部再设内层时间验证完成选择。最终测试集在整个流程冻结前不参与任何筛选。

## 20.

每期净多空收益为

$$
0.0012-0.0005=\boxed{0.0007}.
$$

独立假设下，IC 的 $t$ 值约为

$$
t_{\mathrm{iid}}=\frac{0.02}{0.09/\sqrt{80}}\approx\boxed{1.988}.
$$

AR(1) 近似下，

$$
T_{\mathrm{eff}}=80\frac{1-0.5}{1+0.5}=\frac{80}{3}\approx26.667,
$$

$$
t_{\mathrm{adj}}\approx\frac{0.02}{0.09/\sqrt{26.667}}\approx\boxed{1.148}.
$$

所以本题的相关近似实际上已经使结果远低于通常的双侧 $5\%$ 显著临界值。即使某组数值使相关近似仍显著，也还不能直接确认研究有效：该版本是从 $30$ 个版本中选出的，检验分布必须包含搜索过程；应使用全部试验记录进行多重检验或保留相关性的最大值 Bootstrap，并在模型完全冻结后用未参与选择的时间外样本验证。净收益为正同样不是独立显著性证据，还需对收益序列本身的长期方差、成本敏感性和样本外稳定性进行分析。
