# 第21章习题参考答案与解析

## 1. 
在经典线性回归模型中，若条件均值假设成立，即满足
$$\mathbb E(\boldsymbol u\mid\boldsymbol X)=\boldsymbol 0$$
但误差项存在异方差，即 $\operatorname{Cov}(\boldsymbol u\mid\boldsymbol X)=\sigma^2\boldsymbol\Omega$ 且 $\boldsymbol\Omega\ne\boldsymbol I_n$，普通最小二乘估计量（OLS）仍然保持无偏性与一致性。这是因为
$$\mathbb E(\hat{\boldsymbol\beta}\mid\boldsymbol X)=\boldsymbol\beta+(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\mathbb E(\boldsymbol u\mid\boldsymbol X)=\boldsymbol\beta$$
其成立仅依赖于外生性条件与设计矩阵满秩，无需同方差假定。在大样本条件下，只要大数定律适用且设计矩阵满足极限正定条件，$\hat{\boldsymbol\beta}$ 依概率收敛于 $\boldsymbol\beta$ 的一致性依然成立。

然而，传统的统计推断在异方差下会彻底失效。常规标准误基于同方差假设下的协方差估计量 $s^2(\boldsymbol X^\top\boldsymbol X)^{-1}$，而异方差下真实的抽样协方差矩阵为三明治形式
$$\operatorname{Var}(\hat{\boldsymbol\beta}\mid\boldsymbol X)=(\boldsymbol X^\top\boldsymbol X)^{-1}(\boldsymbol X^\top\boldsymbol\Omega\boldsymbol X)(\boldsymbol X^\top\boldsymbol X)^{-1}\sigma^2$$
通常标准误是有偏且不一致的，在金融与宏观数据中往往严重低估真实标准误，从而虚增 $t$ 统计量的绝对值。同理，经典的 $F$ 检验依赖于二次型在球形正态扰动下的精确或渐近比值分布，在异方差下其分子与分母二次型无法抵消异方差权重，导致统计量不再服从理论 $F$ 分布，经验第一类错误率远高于名义显著性水平。

点估计一致性与推断有效性属于两个不同维度的统计性质。点估计一致性关注估计量本身随样本量趋于无穷时是否收敛到真值，其核心在于消除系统性偏差和内生性；而推断有效性关注围绕估计量构造的置信区间与假设检验是否具有正确的渐近覆盖率与拒绝概率。即使点估计完全一致，若采用了错误的协方差矩阵估计量，所作出的统计推断依然无效。

本题常见错误做法是混淆异方差与内生性，误认为存在异方差就导致 OLS 估计量产生偏误而盲目寻找工具变量；或者忽视异方差对推断的破坏，在异方差检验显著时仍直接汇报常规标准误与 $t$ 统计量。

## 2. 
由方差膨胀因子的定义，第 $j$ 个解释变量对其余解释变量回归的拟合优度为 $R_j^2=0.96$，故
$$\operatorname{VIF}_j=\frac{1}{1-R_j^2}=\frac{1}{1-0.96}=25$$
在同方差线性回归中，斜率估计量 $\hat\beta_j$ 的方差可表示为
$$\operatorname{Var}(\hat\beta_j\mid\boldsymbol X)=\frac{\sigma^2}{\sum_{i=1}^n(x_{ij}-\bar x_j)^2(1-R_j^2)}=\frac{\sigma^2}{(n-1)s_j^2(1-R_j^2)}$$
已知样本量 $n=51$，样本方差 $s_j^2=4$，可得离差平方和为
$$\sum_{i=1}^n(x_{ij}-\bar x_j)^2=(n-1)s_j^2=50\times 4=200$$
将其与容忍度 $1-R_j^2=0.04$ 代入分母，得
$$(n-1)s_j^2(1-R_j^2)=200\times 0.04=8$$
因此，$\operatorname{Var}(\hat\beta_j)$ 中 $\sigma^2$ 的乘数为
$$\frac{1}{8}=0.125$$
亦可通过方差膨胀因子直接计算：$25/200=0.125$。

若将该变量直接从回归模型中删除，必须检查遗漏变量偏误。当该变量在真实数据生成过程中系数不为零，且与其他保留的解释变量高度相关时（本题中 $R_j^2=0.96$ 说明其与其他变量高度共线），将其删除会导致保留变量的系数估计量产生严重偏误且不再具有一致性。

本题常见错误做法包括：看到 $\operatorname{VIF}_j=25>10$ 便机械式地剔除该变量，未权衡方差缩减与遗漏变量偏误的得失；在计算离差平方和时误用 $n s_j^2=204$ 替代 $(n-1)s_j^2=200$。

## 3. 
模型包含 $1$ 个截距和 $3$ 个斜率参数，故参数总数为 $p=1+3=4$。样本量 $n=40$，残差 $e_i=3$，杠杆值 $h_{ii}=0.25$，残差标准误 $s=2$。

内部学生化残差 $r_i$ 定义为普通残差除以其估计标准差：
$$r_i=\frac{e_i}{s\sqrt{1-h_{ii}}}=\frac{3}{2\sqrt{1-0.25}}=\frac{3}{2\times\frac{\sqrt{3}}{2}}=\sqrt{3}\approx 1.7321$$

Cook 距离度量删除第 $i$ 个观测点后对全体拟合值向量造成的扰动幅度，计算公式为
$$D_i=\frac{e_i^2}{p s^2}\frac{h_{ii}}{(1-h_{ii})^2}=\frac{r_i^2}{p}\frac{h_{ii}}{1-h_{ii}}$$
代入数值计算：
$$D_i=\frac{3^2}{4\times 2^2}\times\frac{0.25}{(1-0.25)^2}=\frac{9}{16}\times\frac{0.25}{0.5625}=\frac{9}{16}\times\frac{4}{9}=\frac{1}{4}=0.25$$

高杠杆与强影响具有本质区别。杠杆值 $h_{ii}$ 仅由设计矩阵 $\boldsymbol X$ 决定，反映观测在解释变量空间中的极值程度与孤立程度，完全不依赖因变量 $y_i$ 的取值。即使某观测处于极高杠杆位置，若其因变量取值恰好落在回归超平面附近（即 $e_i\approx 0$），该观测并不会扭曲估计结果。强影响点则是杠杆与残差的乘积效应，只有当观测同时具备较高的杠杆值与显著偏离回归关系的残差时，Cook 距离才会放大，对参数估计造成实质性改变。

本题常见错误做法是将参数总数 $p$ 误算为斜率个数 $3$ 从而漏计截距，算得错误结果 $D_i=1/3$；或者混淆内部学生化残差（使用全样本 $s$）与外部学生化残差（使用留一法标准误 $s_{(i)}$）。

## 4. 
在设计矩阵满足 $n^{-1}\boldsymbol X^\top\boldsymbol X$ 依概率收敛于非奇异正定矩阵的假定下，White 异方差稳健协方差估计量（即 $HC0$）表达式为
$$\widehat{\boldsymbol V}_{HC0}=(\boldsymbol X^\top\boldsymbol X)^{-1}\left(\sum_{i=1}^n e_i^2\boldsymbol x_i\boldsymbol x_i^\top\right)(\boldsymbol X^\top\boldsymbol X)^{-1}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\operatorname{diag}(e_1^2,\dots,e_n^2)\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}$$
为缓解小样本下残差平方对误差平方的下偏倾向，MacKinnon 与 White 提出的 $HC1$ 自由度修正估计量引入自由度缩放因子：
$$\widehat{\boldsymbol V}_{HC1}=\frac{n}{n-p}\widehat{\boldsymbol V}_{HC0}$$
其中 $p$ 为模型待估参数总数。

以 OLS 残差 $e_i$ 替代未观测的真实误差 $u_i$ 在大样本下不会改变渐近极限，其数学机理源于一致估计量的高阶收敛速度。残差满足
$$e_i=y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}=u_i-\boldsymbol x_i^\top(\hat{\boldsymbol\beta}-\boldsymbol\beta)$$
对其平方展开后，三明治中间项的样本均值可拆解为
$$\frac{1}{n}\sum_{i=1}^n e_i^2\boldsymbol x_i\boldsymbol x_i^\top=\frac{1}{n}\sum_{i=1}^n u_i^2\boldsymbol x_i\boldsymbol x_i^\top-\frac{2}{n}\sum_{i=1}^n u_i[\boldsymbol x_i^\top(\hat{\boldsymbol\beta}-\boldsymbol\beta)]\boldsymbol x_i\boldsymbol x_i^\top+\frac{1}{n}\sum_{i=1}^n[\boldsymbol x_i^\top(\hat{\boldsymbol\beta}-\boldsymbol\beta)]^2\boldsymbol x_i\boldsymbol x_i^\top$$
由于 $\hat{\boldsymbol\beta}-\boldsymbol\beta=O_p(n^{-1/2})$，后两项涉及参数估计误差的乘积，在大数定律与有界矩条件下均以比率 $O_p(n^{-1/2})$ 或 $O_p(n^{-1})$ 依概率收敛于零矩阵，从而该样本均值与以真实误差构建的项具有相同的渐近极限。

保证上述一致收敛性所必需的矩条件为：解释变量与扰动项的四阶矩存在且一致有界，即 $\mathbb E\lVert\boldsymbol x_i\rVert^4<\infty$ 以及 $\mathbb E(u_i^4)<\infty$（或等价的交叉四阶矩条件 $\mathbb E\lVert\boldsymbol x_i u_i\rVert^2<\infty$ 且满足一致可积性）。

本题常见错误做法是误将 $HC1$ 自由度调整系数倒置为 $(n-p)/n$；或者遗漏四阶矩要求，误以为仅凭二阶矩存在就能推导出中间三明治核的一致性。

## 5. 
在时间序列回归分析中，三种经典处理方法的目标与分工各异：

Durbin–Watson 统计量用于筛查残差中是否存在一阶自回归自相关，其统计量近似等于 $2(1-\hat\rho)$，主要作为模型残差序列独立性假定的快速诊断工具。

Newey–West 协方差估计量属于异方差与自相关稳健（HAC）推断方法。在不改变普通最小二乘点估计量的前提下，通过对样本自协方差进行 Bartlett 核函数截断加权，构造渐近有效的标准误和协方差矩阵，旨在纠正推断失效。

AR(1) 广义差分变换（如 Cochrane–Orcutt 或 Prais–Winsten 方法）将误差项显式设定为一阶自回归过程，通过拟差分消除误差自相关，构建可行广义最小二乘（FGLS）估计量，旨在提高参数的点估计效率。

若自相关源于模型中遗漏了滞后因变量，上述三种处理中**没有任何一种能够单独修复条件均值**。因为遗漏滞后因变量属于结构性的动态设定偏误，使得当前扰动项包含未建模的历史信息，导致解释变量与扰动项相关，破坏了条件均值外生性假定 $\mathbb E(u_t\mid\boldsymbol x_t)=0$。Durbin–Watson 仅提供诊断信号；Newey–West 仅调整方差估计，无法修正已产生偏误且不一致的点估计；广义差分依赖于条件均值正确的先决条件，在内生性下其差分参数估计同样不一致。唯一能够修复条件均值的途径是重新设定模型结构，在解释变量中显式引入滞后因变量构建动态自回归分布滞后模型。

本题常见错误做法是混淆统计推断与模型设定，误以为采用 Newey–West 调整标准误或者使用 AR(1) 广义差分就能够化解由遗漏关键动态变量导致的内生性与点估计不一致问题。

## 6. 
在线性模型 $\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u$ 中，已知设计矩阵 $\boldsymbol X$ 列满秩，$\mathbb E(\boldsymbol u\mid\boldsymbol X)=\boldsymbol 0$，且条件协方差为 $\operatorname{Cov}(\boldsymbol u\mid\boldsymbol X)=\sigma^2\boldsymbol\Omega$（$\boldsymbol\Omega$ 为已知正定矩阵）。广义最小二乘估计量定义为
$$\hat{\boldsymbol\beta}_{GLS}=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol y$$

**证明**

考查任意线性无偏估计量 $\tilde{\boldsymbol\beta}=\boldsymbol C\boldsymbol y$，其中 $\boldsymbol C$ 为 $p\times n$ 的确定性矩阵（在给定 $\boldsymbol X$ 的条件下）。由无偏性条件
$$\mathbb E(\tilde{\boldsymbol\beta}\mid\boldsymbol X)=\boldsymbol C\mathbb E(\boldsymbol y\mid\boldsymbol X)=\boldsymbol C\boldsymbol X\boldsymbol\beta=\boldsymbol\beta$$
该式对所有可能的参数矢量 $\boldsymbol\beta$ 均成立，故必有矩阵约束
$$\boldsymbol C\boldsymbol X=\boldsymbol I_p$$
记 $\boldsymbol C_0=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}$ 为广义最小二乘估计量的加权矩阵，直接代入即得 $\boldsymbol C_0\boldsymbol X=\boldsymbol I_p$。定义差值矩阵 $\boldsymbol D=\boldsymbol C-\boldsymbol C_0$，则有
$$\boldsymbol D\boldsymbol X=\boldsymbol C\boldsymbol X-\boldsymbol C_0\boldsymbol X=\boldsymbol I_p-\boldsymbol I_p=\boldsymbol O$$
线性估计量 $\tilde{\boldsymbol\beta}$ 的条件协方差矩阵为
$$\operatorname{Cov}(\tilde{\boldsymbol\beta}\mid\boldsymbol X)=\boldsymbol C\operatorname{Cov}(\boldsymbol u\mid\boldsymbol X)\boldsymbol C^\top=\sigma^2\boldsymbol C\boldsymbol\Omega\boldsymbol C^\top$$
将 $\boldsymbol C=\boldsymbol C_0+\boldsymbol D$ 代入上式展开，得
$$\boldsymbol C\boldsymbol\Omega\boldsymbol C^\top=(\boldsymbol C_0+\boldsymbol D)\boldsymbol\Omega(\boldsymbol C_0+\boldsymbol D)^\top=\boldsymbol C_0\boldsymbol\Omega\boldsymbol C_0^\top+\boldsymbol D\boldsymbol\Omega\boldsymbol C_0^\top+\boldsymbol C_0\boldsymbol\Omega\boldsymbol D^\top+\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top$$
考查交叉项，代入 $\boldsymbol C_0$ 的定义：
$$\boldsymbol C_0\boldsymbol\Omega\boldsymbol D^\top=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol\Omega\boldsymbol D^\top=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}(\boldsymbol D\boldsymbol X)^\top$$
由于 $\boldsymbol D\boldsymbol X=\boldsymbol O$，故该交叉项恒等于零矩阵，其转置 $\boldsymbol D\boldsymbol\Omega\boldsymbol C_0^\top$ 亦为零矩阵。而首项为
$$\boldsymbol C_0\boldsymbol\Omega\boldsymbol C_0^\top=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol\Omega\boldsymbol\Omega^{-1}\boldsymbol X(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}$$
因此，任意线性无偏估计量的协方差矩阵可分解为
$$\operatorname{Cov}(\tilde{\boldsymbol\beta}\mid\boldsymbol X)=\sigma^2(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}+\sigma^2\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top=\operatorname{Cov}(\hat{\boldsymbol\beta}_{GLS}\mid\boldsymbol X)+\sigma^2\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top$$
由于 $\boldsymbol\Omega$ 为正定矩阵，对任意非零向量 $\boldsymbol a\in\mathbb R^p$，有
$$\boldsymbol a^\top(\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top)\boldsymbol a=(\boldsymbol D^\top\boldsymbol a)^\top\boldsymbol\Omega(\boldsymbol D^\top\boldsymbol a)\ge 0$$
即矩阵 $\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top$ 必为半正定矩阵。从而按半正定偏序关系有
$$\operatorname{Cov}(\tilde{\boldsymbol\beta}\mid\boldsymbol X)\ge\operatorname{Cov}(\hat{\boldsymbol\beta}_{GLS}\mid\boldsymbol X)$$
等号成立当且仅当 $\boldsymbol D=\boldsymbol O$。因此广义最小二乘估计量在线性无偏估计类中具有最小协方差矩阵，即为最佳线性无偏估计量（BLUE）。

该结论属于广义 Gauss–Markov 定理，推导过程仅用到了条件期望为零与条件协方差结构，完全不依赖误差项的正态分布假定。

□

本题常见错误做法是误认为 Gauss–Markov 定理与 BLUE 性质要求正态分布，混淆了线性无偏估计类中的最优性（BLUE）与全体无偏估计类中的 Cramér–Rao 下界有效性（BUE）；或在代数证明中遗漏交叉项 $\boldsymbol C_0\boldsymbol\Omega\boldsymbol D^\top=\boldsymbol O$ 的消去依据。
## 7. 
对于无截距单变量模型 $y_i=\beta x_i+u_i$，给定样本向量 $\boldsymbol x=(1,2,1)^\top$、$\boldsymbol y=(2,3,5)^\top$，误差协方差矩阵为 $\boldsymbol\Sigma=\operatorname{Cov}(\boldsymbol u\mid\boldsymbol x)=2\operatorname{diag}(1,4,1)=\operatorname{diag}(2,8,2)$。其逆矩阵为
$$\boldsymbol\Sigma^{-1}=\operatorname{diag}\left(\frac{1}{2},\frac{1}{8},\frac{1}{2}\right)$$
广义最小二乘（GLS）估计量计算公式为
$$\hat\beta_{GLS}=(\boldsymbol x^\top\boldsymbol\Sigma^{-1}\boldsymbol x)^{-1}\boldsymbol x^\top\boldsymbol\Sigma^{-1}\boldsymbol y$$
分别计算二次型与内积：
$$\boldsymbol x^\top\boldsymbol\Sigma^{-1}\boldsymbol x=1^2\times\frac{1}{2}+2^2\times\frac{1}{8}+1^2\times\frac{1}{2}=\frac{1}{2}+\frac{1}{2}+\frac{1}{2}=\frac{3}{2}$$
$$\boldsymbol x^\top\boldsymbol\Sigma^{-1}\boldsymbol y=1\times\frac{1}{2}\times 2+2\times\frac{1}{8}\times 3+1\times\frac{1}{2}\times 5=1+\frac{3}{4}+\frac{5}{2}=\frac{17}{4}$$
从而可得广义最小二乘估计值：
$$\hat\beta_{GLS}=\frac{17/4}{3/2}=\frac{17}{6}\approx 2.8333$$
其条件方差为
$$\operatorname{Var}(\hat\beta_{GLS}\mid\boldsymbol x)=(\boldsymbol x^\top\boldsymbol\Sigma^{-1}\boldsymbol x)^{-1}=\left(\frac{3}{2}\right)^{-1}=\frac{2}{3}\approx 0.6667$$

对于普通最小二乘（OLS）估计量 $\hat\beta_{OLS}=(\boldsymbol x^\top\boldsymbol x)^{-1}\boldsymbol x^\top\boldsymbol y$，计算设计项：
$$\boldsymbol x^\top\boldsymbol x=1^2+2^2+1^2=6$$
$$\boldsymbol x^\top\boldsymbol y=1\times 2+2\times 3+1\times 5=13$$
故 $\hat\beta_{OLS}=13/6$。在真实异方差协方差 $\boldsymbol\Sigma$ 下，OLS 估计量的条件方差由三明治公式给出：
$$\operatorname{Var}(\hat\beta_{OLS}\mid\boldsymbol x)=(\boldsymbol x^\top\boldsymbol x)^{-1}\boldsymbol x^\top\boldsymbol\Sigma\boldsymbol x(\boldsymbol x^\top\boldsymbol x)^{-1}$$
计算分子二次型：
$$\boldsymbol x^\top\boldsymbol\Sigma\boldsymbol x=1^2\times 2+2^2\times 8+1^2\times 2=2+32+2=36$$
代入得
$$\operatorname{Var}(\hat\beta_{OLS}\mid\boldsymbol x)=\frac{36}{6^2}=\frac{36}{36}=1$$

比较两者效率：
$$\operatorname{Var}(\hat\beta_{GLS}\mid\boldsymbol x)=\frac{2}{3}<1=\operatorname{Var}(\hat\beta_{OLS}\mid\boldsymbol x)$$
广义最小二乘估计量的条件方差仅为普通最小二乘估计量的三分之二，相对效率比为 $1.5$。这数值化地验证了 Gauss–Markov 定理：在存在异方差时，对误差方差较大的第二观测赋予较低权重（$1/8$ 对比 $1/2$），有效压缩了估计量的抽样波动。

本题常见错误做法是在计算 OLS 条件方差时错误沿用同方差假定下的标量公式，未采用真实的异方差矩阵 $\boldsymbol\Sigma$ 进行三明治夹逼计算；或者在计算加权矩阵时将方差误当成权重而未取倒数。

## 8. 
模型为无截距一元线性回归，待估参数个数 $p=1$，样本量 $n=4$。设计向量为 $\boldsymbol x=(1,1,2,2)^\top$，残差向量为 $\boldsymbol e=(1,-1,2,-2)^\top$。计算样本平方和：
$$\boldsymbol x^\top\boldsymbol x=1^2+1^2+2^2+2^2=10$$
$$(\boldsymbol x^\top\boldsymbol x)^{-1}=\frac{1}{10}=0.1$$
残差平方分别为 $e_1^2=1$、$e_2^2=1$、$e_3^2=4$、$e_4^2=4$。中间加权和为
$$\sum_{i=1}^n e_i^2 x_i^2=1\times 1^2+1\times 1^2+4\times 2^2+4\times 2^2=1+1+16+16=34$$

计算 $HC0$ 协方差估计值与稳健标准误：
$$\widehat V_{HC0}=(\boldsymbol x^\top\boldsymbol x)^{-1}\left(\sum_{i=1}^n e_i^2 x_i^2\right)(\boldsymbol x^\top\boldsymbol x)^{-1}=\frac{34}{10^2}=0.34$$
$$SE_{HC0}=\sqrt{0.34}\approx 0.5831$$

计算 $HC1$ 自由度修正估计值与稳健标准误，自由度修正因子为 $n/(n-p)=4/(4-1)=4/3$：
$$\widehat V_{HC1}=\frac{4}{3}\times 0.34=\frac{34}{75}\approx 0.4533$$
$$SE_{HC1}=\sqrt{\frac{34}{75}}\approx 0.6733$$

计算同方差假设下的残差方差估计值 $s^2$ 与通常标准误：
$$s^2=\frac{1}{n-p}\sum_{i=1}^n e_i^2=\frac{1}{3}(1+1+4+4)=\frac{10}{3}\approx 3.3333$$
$$\widehat V_{OLS}=s^2(\boldsymbol x^\top\boldsymbol x)^{-1}=\frac{10}{3}\times\frac{1}{10}=\frac{1}{3}\approx 0.3333$$
$$SE_{OLS}=\sqrt{\frac{1}{3}}=\frac{\sqrt{3}}{3}\approx 0.5774$$

三者方差估计值与标准误的大小排序为
$$\widehat V_{OLS}\approx 0.3333<\widehat V_{HC0}=0.34<\widehat V_{HC1}\approx 0.4533$$
$$SE_{OLS}\approx 0.5774<SE_{HC0}\approx 0.5831<SE_{HC1}\approx 0.6733$$
比较可知，由于高杠杆点（$x_i=2$）处具有更大的扰动波动（残差平方达到 $4$），异方差与解释变量正相关，通常标准误低估了真实抽样变异；$HC0$ 捕捉到了该异方差结构，而 $HC1$ 在此基础上针对小样本自由度损失做了保守修正，给出了最谨慎的推断基准。

本题常见错误做法是因模型无截距而误将参数个数设为 $p=2$，导致自由度 $n-p$ 算错；或者在计算 $s^2$ 时分母漏减自由度直接除以 $n$。

## 9. 
设时间序列回归仅含截距项，各期得分序列为 $z_t=x_t e_t=e_t$（因截距项 $x_t\equiv 1$），数值依次为 $z_1=1$、$z_2=-2$、$z_3=3$、$z_4=0$，样本量 $n=4$。滞后阶数 $L=1$，采用题目规定的非中心化自协方差估计 $\hat\gamma_j=n^{-1}\sum_{t=j+1}^n z_t z_{t-j}$。

计算零阶样本方差：
$$\hat\gamma_0=\frac{1}{4}\sum_{t=1}^4 z_t^2=\frac{1}{4}[1^2+(-2)^2+3^2+0^2]=\frac{1+4+9+0}{4}=\frac{14}{4}=3.5$$
计算一阶样本自协方差：
$$\hat\gamma_1=\frac{1}{4}\sum_{t=2}^4 z_t z_{t-1}=\frac{1}{4}[(-2)\times 1+3\times(-2)+0\times 3]=\frac{-2-6+0}{4}=\frac{-8}{4}=-2$$
代入 Bartlett 权重，滞后一阶权重为 $1-1/(1+1)=1/2$，计算长期方差估计量：
$$\hat S=\hat\gamma_0+2\left(1-\frac{1}{2}\right)\hat\gamma_1=3.5+2\times\frac{1}{2}\times(-2)=3.5-2=1.5$$
由样本长期方差求截距的 Newey–West 稳健标准误：
$$SE_{HAC}=\sqrt{\frac{\hat S}{n}}=\sqrt{\frac{1.5}{4}}=\sqrt{0.375}\approx 0.6124$$

若该截距代表量化投资策略的平均超额收益（Alpha），其独立同分布假设下的标准误为
$$SE_{iid}=\sqrt{\frac{\hat\gamma_0}{n}}=\sqrt{\frac{3.5}{4}}\approx 0.9354$$
稳健标准误显著小于独立同分布标准误，两者的差异完全来自于一阶自协方差的显著负值（$\hat\gamma_1=-2$）。负自相关反映出策略收益序列存在均值回复特性，前后期的波动在跨期累积时相互对冲抵消，导致序列的长期变异性低于单期独立波动的线性累加。若错误沿用独立同分布标准误，将高估超额收益的不确定性，低估策略夏普比率检验的统计显著性。

本题常见错误做法是在计算自协方差 $\hat\gamma_1$ 时习惯性除以有效项数 $n-1=3$ 而非全局样本量 $n=4$，破坏了保证长期方差半正定性的 Newey–West 核估计标准形式；或者在出现负自相关时机械地以为稳健标准误必然大于通常标准误。
## 10. 
无受限模型包含参数总数 $p=6$，样本量 $n=50$。对 $q=3$ 个线性约束进行联合检验，受限残差平方和 $RSS_R=120$，无受限残差平方和 $RSS_U=96$。

经典 $F$ 统计量定义为
$$F=\frac{(RSS_R-RSS_U)/q}{RSS_U/(n-p)}$$
代入题目已知数值：
$$F=\frac{(120-96)/3}{96/(50-6)}=\frac{24/3}{96/44}=\frac{8}{24/11}=8\times\frac{11}{24}=\frac{11}{3}\approx 3.6667$$

在原假设成立的经典正态同方差假定下，该统计量服从分子自由度为 $q=3$、分母自由度为 $n-p=44$ 的 $F$ 分布，即 $F(3,44)$。

在 $\alpha=0.05$ 的显著性水平下，拒绝规则为：当计算得到的 $F$ 统计量大于临界值 $F_{0.05}(3,44)$ 时拒绝原假设。查表或数值积分可知 $F_{0.05}(3,44)\approx 2.818$。因为计算值 $3.6667>2.818$，故在 $5\%$ 的显著性水平下拒绝原假设，认为该 $3$ 个参数约束不成立。

若误差项存在自相关，经典残差平方和之比不再服从 $F$ 分布，经典 $F$ 检验会产生严重的过度拒绝（弃真误差失控）。此时拒绝规则必须调整为基于异方差自相关稳健（HAC/Newey–West）协方差矩阵的 Wald 统计量：
$$W=(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)^\top[\boldsymbol R\widehat{\boldsymbol V}_{HAC}\boldsymbol R^\top]^{-1}(\boldsymbol R\hat{\boldsymbol\beta}-\boldsymbol r)$$
渐近推断规则改为将 Wald 统计量与自由度为 $3$ 的卡方分布临界值 $\chi^2_{0.05}(3)\approx 7.815$ 比较（或使用自由度修正形式 $F_{HAC}=W/q$ 与 $F$ 分布临界值比较），当 $W>\chi^2_{0.05}(3)$ 时拒绝原假设。

本题常见错误做法是分母自由度误记为 $n-q=47$；或在面对自相关时仅尝试修改临界值自由度，而未改写统计量二次型核心的协方差加权阵。

## 11. 
在经典正态线性模型 $\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u$（其中 $\boldsymbol u\sim\mathcal N(\boldsymbol 0,\sigma^2\boldsymbol I_n)$）中，考虑单个线性约束 $H_0:\boldsymbol r^\top\boldsymbol\beta=r_0$（$\boldsymbol r$ 为非零常数向量）。

**证明**

普通最小二乘估计量满足 $\hat{\boldsymbol\beta}\sim\mathcal N(\boldsymbol\beta,\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1})$，残差方差估计量 $s^2=RSS_U/(n-p)$ 独立于 $\hat{\boldsymbol\beta}$，且 $(n-p)s^2/\sigma^2\sim\chi^2(n-p)$。检验该假设的单约束 $t$ 统计量为
$$t=\frac{\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0}{\sqrt{s^2\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}}$$
将其平方展开，可得
$$t^2=\frac{(\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0)^2}{s^2\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}=\frac{(\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0)[\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r]^{-1}(\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0)}{s^2}$$

另一方面，求解受约束最小二乘优化问题：在约束 $\boldsymbol r^\top\boldsymbol\beta=r_0$ 下极小化残差平方和，引入拉格朗日乘子 $\lambda$：
$$\mathcal L(\boldsymbol\beta,\lambda)=(\boldsymbol y-\boldsymbol X\boldsymbol\beta)^\top(\boldsymbol y-\boldsymbol X\boldsymbol\beta)+2\lambda(\boldsymbol r^\top\boldsymbol\beta-r_0)$$
对参数求导并令一阶条件为零：
$$-\boldsymbol X^\top(\boldsymbol y-\boldsymbol X\tilde{\boldsymbol\beta})+\lambda\boldsymbol r=\boldsymbol 0\implies \tilde{\boldsymbol\beta}=\hat{\boldsymbol\beta}-\lambda(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r$$
左乘约束向量 $\boldsymbol r^\top$ 并利用 $\boldsymbol r^\top\tilde{\boldsymbol\beta}=r_0$，解得乘子：
$$\lambda=\frac{\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0}{\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}$$
受限估计量与无受限估计量之差为
$$\tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta}=-\frac{\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0}{\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r$$
利用最小二乘投影的正交分解性，受限与无受限残差平方和之差恰等于参数增量的加权范数：
$$RSS_R-RSS_U=(\tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta})^\top(\boldsymbol X^\top\boldsymbol X)(\tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta})=\frac{(\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0)^2}{\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}$$
由于此约束个数 $q=1$，基于残差平方和构造的 $F$ 统计量为
$$F=\frac{(RSS_R-RSS_U)/1}{RSS_U/(n-p)}=\frac{RSS_R-RSS_U}{s^2}=\frac{(\boldsymbol r^\top\hat{\boldsymbol\beta}-r_0)^2}{s^2\boldsymbol r^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol r}$$
对比两式可知，恒有
$$F=t^2$$

由 $t$ 分布与 $F$ 分布的定义，若随机变量 $T\sim t(n-p)$，则其平方 $T^2\sim F(1,n-p)$。双侧 $t$ 检验的显著性水平 $\alpha$ 临界值满足
$$t_{\alpha/2}^2(n-p)=F_\alpha(1,n-p)$$
因此，双侧 $t$ 检验的拒绝域为
$$\{\lvert t\rvert>t_{\alpha/2}(n-p)\}\iff \{t^2>t_{\alpha/2}^2(n-p)\}\iff \{F>F_\alpha(1,n-p)\}$$
二者在相同显著性水平下给出的拒绝域完全等价。

□

本题常见错误做法是混淆单侧 $t$ 检验与双侧 $F$ 检验，忽视了 $F$ 检验无法识别对立假设符号方向的对称本质；或者未能给出受限最小二乘拉格朗日求解的完整代数步骤。

## 12. 
无受限模型包含 $1$ 个截距和 $4$ 个斜率参数，故参数总数 $p=1+4=5$。样本量 $n=30$。受限模型删除了 $2$ 个斜率变量，对应线性约束个数 $q=2$。无受限与受限模型的判定系数分别为 $R_U^2=0.80$ 和 $R_R^2=0.50$。

当两模型被解释变量相同且包含相同截距项时，样本总离差平方和 $TSS=\sum_{i=1}^n(y_i-\bar y)^2$ 完全相同。由 $RSS=TSS(1-R^2)$，联合显著性 $F$ 统计量可直接表示为
$$F=\frac{(R_U^2-R_R^2)/q}{(1-R_U^2)/(n-p)}$$
代入数值计算：
$$F=\frac{(0.80-0.50)/2}{(1-0.80)/(30-5)}=\frac{0.30/2}{0.20/25}=\frac{0.15}{0.008}=18.75$$
该统计量服从分子自由度为 $q=2$、分母自由度为 $n-p=25$ 的 $F(2,25)$ 分布。

若两个模型的被解释变量定义不同（例如受限模型采用原始水平值 $y_i$，而无受限模型采用对数变化率 $\Delta\ln y_i$ 或差分序列），这一计算公式将彻底失效。因为该公式依赖于 $TSS_U=TSS_R$ 的恒等代换，从而允许分子与分母中的 $TSS$ 精确对消。一旦被解释变量定义发生改变，两个回归的总离差平方和基准不再统一，$R^2$ 差异不再反映未解释变异的真实缩减幅度，残差平方和之差与 $R^2$ 差值脱钩，所算出的比值不再服从 $F$ 分布，检验丧失统计基础。

本题常见错误做法是将参数总数 $p$ 算为斜率个数 $4$ 而漏计截距，导致分母自由度错写为 $26$；或者在因变量发生对数或平稳化差分变换时，仍盲目套用 $R^2$ 差值公式进行嵌套模型检验。
## 13. 
设设计矩阵 $\boldsymbol X$ 为 $n\times p$ 列满秩矩阵，正交投影矩阵为 $\boldsymbol H=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$。

**证明**

首先证明对称性与幂等性：
$$\boldsymbol H^\top=[\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top]^\top=(\boldsymbol X^\top)^\top[(\boldsymbol X^\top\boldsymbol X)^{-1}]^\top\boldsymbol X^\top=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\boldsymbol H$$
故 $\boldsymbol H$ 为对称矩阵。再考查二次幂：
$$\boldsymbol H^2=\boldsymbol H\boldsymbol H=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol I_p\boldsymbol X^\top=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\boldsymbol H$$
故 $\boldsymbol H$ 为幂等矩阵。

考查投影矩阵的迹，利用矩阵迹的循环置换性质：
$$\operatorname{tr}(\boldsymbol H)=\operatorname{tr}(\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top)=\operatorname{tr}((\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X)=\operatorname{tr}(\boldsymbol I_p)=p$$
由于矩阵的迹等于主对角线元素之和，故杠杆值之和满足
$$\sum_{i=1}^n h_{ii}=\operatorname{tr}(\boldsymbol H)=p$$

证明对每个杠杆值有 $0\le h_{ii}\le 1$：由 $\boldsymbol H=\boldsymbol H^2$ 及对称性，第 $i$ 个对角元素满足
$$h_{ii}=\sum_{j=1}^n h_{ij} h_{ji}=\sum_{j=1}^n h_{ij}^2=h_{ii}^2+\sum_{j\ne i} h_{ij}^2$$
由实数平方的非负性，显有 $h_{ii}=\sum_{j=1}^n h_{ij}^2\ge 0$。同时移项整理得
$$h_{ii}(1-h_{ii})=\sum_{j\ne i} h_{ij}^2\ge 0$$
因 $h_{ii}\ge 0$ 且积非负，必有 $1-h_{ii}\ge 0$，即 $h_{ii}\le 1$。综合得到 $0\le h_{ii}\le 1$。

最后证明含截距模型下 $h_{ii}\ge 1/n$：当模型包含常数截距项时，全 $1$ 向量 $\boldsymbol 1_n=(1,1,\dots,1)^\top$ 位于设计矩阵 $\boldsymbol X$ 的列空间内，即 $\boldsymbol 1_n\in\mathcal C(\boldsymbol X)$。由于 $\boldsymbol H$ 为向列空间 $\mathcal C(\boldsymbol X)$ 的正交投影算子，它保持该子空间内任何向量不变：
$$\boldsymbol H\boldsymbol 1_n=\boldsymbol 1_n$$
写出第 $i$ 行的分量恒等式：
$$\sum_{j=1}^n h_{ij}\times 1=\sum_{j=1}^n h_{ij}=1$$
应用 Cauchy–Schwarz 不等式：
$$1=\left(\sum_{j=1}^n h_{ij}\times 1\right)^2\le\left(\sum_{j=1}^n h_{ij}^2\right)\left(\sum_{j=1}^n 1^2\right)=h_{ii}\times n$$
两边同除以 $n$，即证得
$$h_{ii}\ge\frac{1}{n}$$

□

本题常见错误做法是误将投影矩阵的特征值（仅为 $0$ 或 $1$）混同于对角线元素的值域，误以为 $h_{ii}$ 也只能取 $0$ 或 $1$；或者在证明含截距下界时未利用投影算子对常数向量的原像保持性质。

## 14. 
在含 $p$ 个参数的普通最小二乘回归中，记删除第 $i$ 个观测后的设计矩阵为 $\boldsymbol X_{(i)}$，响应向量为 $\boldsymbol y_{(i)}$，残差为 $e_i=y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}$。

**证明**

删除第 $i$ 个样本后的样本交叉乘积矩阵可写为秩一扣减形式：
$$\boldsymbol X_{(i)}^\top\boldsymbol X_{(i)}=\boldsymbol X^\top\boldsymbol X-\boldsymbol x_i\boldsymbol x_i^\top$$
$$\boldsymbol X_{(i)}^\top\boldsymbol y_{(i)}=\boldsymbol X^\top\boldsymbol y-\boldsymbol x_i y_i$$
应用 Sherman–Morrison 矩阵逆秩一更新公式，因 $h_{ii}=\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i<1$：
$$(\boldsymbol X_{(i)}^\top\boldsymbol X_{(i)})^{-1}=(\boldsymbol X^\top\boldsymbol X)^{-1}+\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}}{1-h_{ii}}$$
删除第 $i$ 个观测后的参数估计量为
$$\hat{\boldsymbol\beta}_{(i)}=(\boldsymbol X_{(i)}^\top\boldsymbol X_{(i)})^{-1}(\boldsymbol X^\top\boldsymbol y-\boldsymbol x_i y_i)$$
代入求逆更新式并展开各项：
$$\hat{\boldsymbol\beta}_{(i)}=\left[(\boldsymbol X^\top\boldsymbol X)^{-1}+\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}}{1-h_{ii}}\right](\boldsymbol X^\top\boldsymbol y-\boldsymbol x_i y_i)$$
利用 $\hat{\boldsymbol\beta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y$ 整理：
$$\hat{\boldsymbol\beta}_{(i)}=\hat{\boldsymbol\beta}-(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i y_i+\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i\boldsymbol x_i^\top\hat{\boldsymbol\beta}}{1-h_{ii}}-\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i(h_{ii} y_i)}{1-h_{ii}}$$
提公因式 $(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i$：
$$\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i\left[-y_i+\frac{\boldsymbol x_i^\top\hat{\boldsymbol\beta}-h_{ii} y_i}{1-h_{ii}}\right]$$
对中括号内部通分化简：
$$-y_i(1-h_{ii})+\boldsymbol x_i^\top\hat{\boldsymbol\beta}-h_{ii} y_i=-y_i+h_{ii} y_i+\boldsymbol x_i^\top\hat{\boldsymbol\beta}-h_{ii} y_i=-(y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta})=-e_i$$
代回即证得参数更新量公式：
$$\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta}=-\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i e_i}{1-h_{ii}}$$

Cook 距离度量删除第 $i$ 个观测后全体样本拟合值向量的二次型加权漂移：
$$D_i=\frac{(\hat{\boldsymbol y}_{(i)}-\hat{\boldsymbol y})^\top(\hat{\boldsymbol y}_{(i)}-\hat{\boldsymbol y})}{p s^2}=\frac{(\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta})^\top(\boldsymbol X^\top\boldsymbol X)(\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta})}{p s^2}$$
将上述参数更新量代入分子二次型：
$$(\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta})^\top(\boldsymbol X^\top\boldsymbol X)(\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta})=\left[-\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i e_i}{1-h_{ii}}\right]^\top(\boldsymbol X^\top\boldsymbol X)\left[-\frac{(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i e_i}{1-h_{ii}}\right]$$
$$=\frac{e_i^2}{(1-h_{ii})^2}\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}(\boldsymbol X^\top\boldsymbol X)(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i=\frac{e_i^2\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i}{(1-h_{ii})^2}=\frac{e_i^2 h_{ii}}{(1-h_{ii})^2}$$
代入分母 $p s^2$，即证得
$$D_i=\frac{e_i^2 h_{ii}}{p s^2(1-h_{ii})^2}$$

□

本题常见错误做法是在 Sherman–Morrison 公式展开中正负符号出现笔误；或者混淆全样本残差 $e_i$ 与留一残差 $e_{(i)}=y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}_{(i)}=e_i/(1-h_{ii})$，未能准确写出通分化简过程。

## 15. 

在事件研究法的市场模型设定下，日度正常收益率由资本资产定价模型给出。对于事件窗口内的各交易日，异常收益率定义为实际收益率减去基于估计参数计算的正常收益率期望值：
$$AR_t=R_t-(\hat\alpha+\hat\beta R_{mt})$$
代入题目所给估计值 $\hat\alpha=0.0005$ 与 $\hat\beta=0.8$，逐日计算事件日起连续三天的异常收益率：
第一天实际收益率为 $R_1=0.03$，市场超额收益率为 $R_{m1}=0.01$，正常收益率为
$$\hat\alpha+\hat\beta R_{m1}=0.0005+0.8\times 0.01=0.0085$$
对应第一天异常收益率为
$$AR_1=0.03-0.0085=0.0215$$
第二天实际收益率为 $R_2=-0.005$，市场超额收益率为 $R_{m2}=0.005$，正常收益率为
$$\hat\alpha+\hat\beta R_{m2}=0.0005+0.8\times 0.005=0.0045$$
对应第二天异常收益率为
$$AR_2=-0.005-0.0045=-0.0095$$
第三天实际收益率为 $R_3=0.02$，市场超额收益率为 $R_{m3}=-0.002$，正常收益率为
$$\hat\alpha+\hat\beta R_{m3}=0.0005+0.8\times(-0.002)=-0.0011$$
对应第三天异常收益率为
$$AR_3=0.02-(-0.0011)=0.0211$$
三日累计异常收益率为每日异常收益率的线性加总：
$$CAR=AR_1+AR_2+AR_3=0.0215-0.0095+0.0211=0.0331$$

在暂时忽略参数估计误差且每日异常收益方差均为 $\sigma^2=0.0004$、跨日互不相关的假定下，累计异常收益的方差等于各日方差之和：
$$\operatorname{Var}(CAR)=\sum_{t=1}^3\operatorname{Var}(AR_t)=3\times 0.0004=0.0012$$
其标准误为方差的算术平方根：
$$SE(CAR)=\sqrt{\operatorname{Var}(CAR)}=\sqrt{0.0012}\approx 0.034641$$
检验累计异常收益是否显著异于零的标准化统计量为
$$J=\frac{CAR}{SE(CAR)}=\frac{0.0331}{\sqrt{0.0012}}\approx 0.9555$$
该统计量在标准正态临界值下不显著。

若进一步纳入估计窗参数估计误差，设估计窗长度为 $L_1$，事件窗长度为 $L_2=3$。记估计窗设计矩阵为 $\boldsymbol X_{est}$，其行向量包含常数项与市场超额收益，事件窗对应向量为 $\boldsymbol x_t=(1, R_{mt})^\top$。由于参数估计量 $\hat{\boldsymbol\theta}=(\hat\alpha,\hat\beta)^\top$ 存在抽样变异，事件窗异常收益实为扰动项与估计误差的线性组合：
$$AR_t=\varepsilon_t-\boldsymbol x_t^\top(\hat{\boldsymbol\theta}-\boldsymbol\theta)$$
从而三日累计异常收益为
$$CAR=\sum_{t=1}^{L_2}\varepsilon_t-\left(\sum_{t=1}^{L_2}\boldsymbol x_t\right)^\top(\hat{\boldsymbol\theta}-\boldsymbol\theta)$$
由于估计窗扰动与事件窗扰动相互独立，参数估计误差引入的协方差项与事件期固有扰动方差正交。令 $\boldsymbol c=\sum_{t=1}^{L_2}\boldsymbol x_t$，则修正后的累计异常收益方差为
$$\operatorname{Var}(CAR)=L_2\sigma^2+\sigma^2\boldsymbol c^\top(\boldsymbol X_{est}^\top\boldsymbol X_{est})^{-1}\boldsymbol c=\sigma^2\left[L_2+\boldsymbol c^\top(\boldsymbol X_{est}^\top\boldsymbol X_{est})^{-1}\boldsymbol c\right]$$
该式表明，参数估计误差构成一个正定二次型附加项，使得真实方差扩大，标准误相应增大；若估计窗样本量 $L_1$ 充分大，该附加项趋于零，但在小样本或事件窗市场波动剧烈偏离估计窗均值时必须进行此项修正。

本题常见错误做法是忽略截距项 $\hat\alpha$ 的扣除，仅用 $\hat\beta R_{mt}$ 计算基准收益；或在计算标准误时错误地将每日标准误直接相加而非对方差求和后再开方；此外，常有推断忽视参数估计误差在较短估计窗下对检验统计量方差的膨胀作用。

## 16. 

对于包含 $N=100$ 家公司且事件日期完全重合（事件日历日聚类）的横截面样本，记第 $i$ 家公司的累计异常收益为 $CAR_i$，样本平均累计异常收益为
$$\overline{CAR}=\frac{1}{N}\sum_{i=1}^N CAR_i=0.006$$
单个公司累计异常收益的方差已知为 $\sigma^2=\operatorname{Var}(CAR_i)=0.0009$。

首先在横截面独立假设下，任意两家公司的协方差为零，即 $\operatorname{Cov}(CAR_i, CAR_j)=0$（$i\ne j$）。此时样本均值的方差为
$$\operatorname{Var}(\overline{CAR})=\frac{\sigma^2}{N}=\frac{0.0009}{100}=0.000009$$
对应的标准误为
$$SE_{ind}(\overline{CAR})=\sqrt{0.000009}=0.003$$
检验均值是否为零的标准化检验统计量为
$$Z_{ind}=\frac{\overline{CAR}}{SE_{ind}(\overline{CAR})}=\frac{0.006}{0.003}=2.0$$
在 $5\%$ 显著性水平下，双侧标准正态临界值为 $1.96$，因 $2.0>1.96$，独立假设下推断结果显著拒绝原假设。

其次考虑横截面相关情形，设任意两家不同公司的协方差均为 $\gamma=\operatorname{Cov}(CAR_i, CAR_j)=0.0002$（$i\ne j$）。根据方差的双重求和展开式：
$$\operatorname{Var}(\overline{CAR})=\frac{1}{N^2}\sum_{i=1}^N\operatorname{Var}(CAR_i)+\frac{1}{N^2}\sum_{i=1}^N\sum_{j\ne i}\operatorname{Cov}(CAR_i, CAR_j)$$
将对角项与非对角项分别代入：
$$\operatorname{Var}(\overline{CAR})=\frac{N\sigma^2+N(N-1)\gamma}{N^2}=\frac{\sigma^2}{N}+\frac{N-1}{N}\gamma$$
代入数值计算：
$$\operatorname{Var}(\overline{CAR})=\frac{0.0009}{100}+\frac{99}{100}\times 0.0002=0.000009+0.000198=0.000207$$
对应的稳健标准误为
$$SE_{clust}(\overline{CAR})=\sqrt{0.000207}\approx 0.014387$$
重新计算标准化检验统计量：
$$Z_{clust}=\frac{\overline{CAR}}{SE_{clust}(\overline{CAR})}=\frac{0.006}{\sqrt{0.000207}}\approx 0.4170$$
此时统计量远小于临界值 $1.96$，完全无法拒绝原假设。

按事件日期聚类之所以能够彻底改变推断结论，原因在于当所有观测共享同一日历日时，各资产在事件窗内不可避免地受到未被因子模型吸纳的宏观共同冲击或行业同板效应影响，导致异常收益呈现系统性的正横截面相关。在独立性假设下，均值方差以速度 $O(1/N)$ 衰减至零；但在等协方差结构下，非对角项的均值方差下界为 $\gamma$，并不随 $N$ 的增加而消失。若忽略聚类相关性，标准误被严重低估（在本例中被低估了近 $4.8$ 倍），进而导致检验统计量严重虚高，产生极端严重的伪显著性与第一类错误膨胀。

本题常见错误做法是在展开双重求和时遗漏非对角线项的数量 $N(N-1)$，误写为 $N-1$；或将协方差数值 $0.0002$ 与相关系数混淆；另外在解释聚类机理时，容易脱离经济现实中同日历日共享不可观测共同冲击的本质，未能指出相关性导致大样本方差不收敛到零的核心数理性质。
## 17. 

在 Fama–MacBeth 两步回归框架下，设某一因子在 $T=4$ 个时期的横截面风险价格估计依次为 $\hat\lambda_1=0.02$、$\hat\lambda_2=-0.01$、$\hat\lambda_3=0.03$、$\hat\lambda_4=0.00$。

时间平均风险价格为四个时期点估计的算术平均值：
$$\bar\lambda=\frac{1}{T}\sum_{t=1}^T\hat\lambda_t=\frac{0.02-0.01+0.03+0.00}{4}=\frac{0.04}{4}=0.01$$

按式（21.30），样本各期估计的时间序列无偏方差为
$$s_{\hat\lambda}^2=\frac{1}{T-1}\sum_{t=1}^T(\hat\lambda_t-\bar\lambda)^2$$
计算各期对均值的离差及其平方：
第一期离差为 $0.02-0.01=0.01$，平方为 $0.0001$；
第二期离差为 $-0.01-0.01=-0.02$，平方为 $0.0004$；
第三期离差为 $0.03-0.01=0.02$，平方为 $0.0004$；
第四期离差为 $0.00-0.01=-0.01$，平方为 $0.0001$。
离差平方和为
$$\sum_{t=1}^4(\hat\lambda_t-\bar\lambda)^2=0.0001+0.0004+0.0004+0.0001=0.0010$$
样本方差为
$$s_{\hat\lambda}^2=\frac{0.0010}{4-1}=\frac{0.0010}{3}=\frac{1}{3000}$$
时间平均估计量 $\bar\lambda$ 的方差估计等于样本方差除以时间序列长度 $T$：
$$\widehat{\operatorname{Var}}(\bar\lambda)=\frac{s_{\hat\lambda}^2}{T}=\frac{0.0010}{3\times 4}=\frac{0.0010}{12}=\frac{1}{12000}\approx 0.00008333$$
其标准误为
$$SE(\bar\lambda)=\sqrt{\widehat{\operatorname{Var}}(\bar\lambda)}=\sqrt{\frac{0.0010}{12}}=\frac{\sqrt{30}}{600}\approx 0.0091287$$

检验平均风险价格是否显著为零的 $t$ 统计量为
$$t=\frac{\bar\lambda}{SE(\bar\lambda)}=\frac{0.01}{\sqrt{0.0010/12}}=\sqrt{\frac{0.0001}{0.0010/12}}=\sqrt{1.2}\approx 1.0954$$

在四期估计独立同分布且服从正态分布的假定下，分子服从正态分布，分母在消除均值后由独立卡方变量开方构造，因此该检验统计量严格服从自由度为 $T-1=4-1=3$ 的学生氏 $t$ 分布，即 $t\sim t(3)$。在 $5\%$ 双侧显著性水平下，自由度为 $3$ 的临界值为 $3.182$，因 $1.0954<3.182$，不能拒绝该因子平均风险价格为零的原假设。

本题常见错误做法是在计算样本方差时将分母自由度误写为 $T=4$ 而非 $T-1=3$；或者混淆单个时期的估计标准差 $s_{\hat\lambda}$ 与时间均值的标准误 $SE(\bar\lambda)=s_{\hat\lambda}/\sqrt{T}$，漏除因子 $\sqrt{T}$；此外容易将自由度误判为横截面资产数 $N-1$。

## 18. 

**证明**

设各期 Fama–MacBeth 横截面风险价格估计序列 $\{\hat{\boldsymbol\lambda}_t\}_{t=1}^\infty$ 为严格平稳且遍历的随机过程，且满足一阶绝对矩可积条件 $\mathbb E\lVert\hat{\boldsymbol\lambda}_t\rVert<\infty$。

由 Birkhoff 遍历定理（平稳遍历过程的大数定律），对于任意满足绝对可积的平稳遍历序列，其时间序列样本平均几乎必然收敛于总体均值：
$$\lim_{T\to\infty}\frac{1}{T}\sum_{t=1}^T\hat{\boldsymbol\lambda}_t=\mathbb E(\hat{\boldsymbol\lambda}_t)$$
由于几乎必然收敛强于依概率收敛，上述极限几乎必然成立意味着对任意给定的常数 $\varepsilon>0$：
$$\lim_{T\to\infty}\mathbb P\left(\left\lVert\frac{1}{T}\sum_{t=1}^T\hat{\boldsymbol\lambda}_t-\mathbb E(\hat{\boldsymbol\lambda}_t)\right\rVert\ge\varepsilon\right)=0$$
因此时间平均在概率意义下收敛：
$$\frac{1}{T}\sum_{t=1}^T\hat{\boldsymbol\lambda}_t\xrightarrow{p}\mathbb E(\hat{\boldsymbol\lambda}_t)$$

□

要将上述极限 $\mathbb E(\hat{\boldsymbol\lambda}_t)$ 准确解释为真实的因子风险价格 $\boldsymbol\lambda$，还需满足以下三组核心条件：
第一，第一步时间序列估计载荷的测度误差渐近消失。实际操作中第一步估计的因子载荷 $\hat{\boldsymbol\beta}_i$ 含有抽样噪声，若横截面资产组合数有限或第一步时间窗口 $T_1$ 有限，第二步横截面回归将因自变量含测度误差产生衰减偏误（EIV 偏差），导致 $\mathbb E(\hat{\boldsymbol\lambda}_t)\ne\boldsymbol\lambda$。必须要求第一步时间序列长度 $T_1\to\infty$、采用大样本投资组合平滑个体噪声，或显式引入 Shanken 协方差修正。
第二，定价模型设定正确且条件期望为零。因子模型必须完整涵盖定价源，遗漏定价因子或非线性风险暴露会导致截距与残差项在横截面上与载荷相关，违背条件正交性条件 $\mathbb E(\alpha_{it}\mid\boldsymbol\beta_i)=\boldsymbol 0$。
第三，横截面识别条件。各资产真实因子载荷矩阵 $\boldsymbol\beta$ 的二阶交叉乘积矩阵在横截面极限下必须严格满秩且正定，避免横截面多重共线性导致风险价格无法识别。

若横截面估计量 $\hat{\boldsymbol\lambda}_t$ 存在序列相关，式（21.30）直接失效。式（21.30）的基础假定是各期估计量在时间序列上互不相关，其方差仅保留了同期方差项 $\operatorname{Var}(\hat{\boldsymbol\lambda}_t)$。当存在自相关时，均值的真实渐近方差等于谱密度在零频率处的长期协方差矩阵：
$$\boldsymbol\Omega_{LR}=\boldsymbol\Gamma_0+\sum_{j=1}^\infty(\boldsymbol\Gamma_j+\boldsymbol\Gamma_j^\top)$$
其中 $\boldsymbol\Gamma_j=\operatorname{Cov}(\hat{\boldsymbol\lambda}_t,\hat{\boldsymbol\lambda}_{t-j})$。在资产收益或宏观状态变量存在持续性冲击时，滞后自协方差通常显著为正，忽略这些项将导致式（21.30）大幅低估真实抽样方差，产生严重的虚假显著性。针对此问题，应采用 Newey–West（HAC）异方差自相关稳健协方差估计量，引入 Bartlett 核函数加权并选取适当的滞后截断阶数 $L$，以保证在有限样本下估计矩阵的正半定性与大样本下的一致性。

本题常见错误做法是直接使用独立同分布大数定理而忽视遍历定理与平稳性条件；或未能阐明第一步估计载荷误差如何向第二步传导从而产生不可忽略的变量测度误差偏差；在讨论自相关修正时，常错误地建议直接进行简单自回归差分，从而破坏了两步法对风险溢价经济含义的直观度量。
## 19. 

在资产定价联合检验中，检验 $N=3$ 个资产的定价截距是否同时为零，其原假设为 $H_0:\boldsymbol\alpha=\boldsymbol 0$，备择假设为 $H_1:\boldsymbol\alpha\ne\boldsymbol 0$。

已知估计的截距向量为 $\hat{\boldsymbol\alpha}=(0.002,-0.001,0.003)^\top$，其估计协方差矩阵为对角阵 $\widehat{\boldsymbol V}_\alpha=\operatorname{diag}(0.000004,0.000001,0.000009)$。其逆矩阵直接由对角线元素的倒数构成：
$$\widehat{\boldsymbol V}_\alpha^{-1}=\operatorname{diag}\left(\frac{1}{0.000004},\frac{1}{0.000001},\frac{1}{0.000009}\right)=\operatorname{diag}(250000,1000000,111111.11)$$

检验 $\boldsymbol\alpha=\boldsymbol 0$ 的 Wald 统计量定义为如下二次型：
$$W=\hat{\boldsymbol\alpha}^\top\widehat{\boldsymbol V}_\alpha^{-1}\hat{\boldsymbol\alpha}$$
将对角阵二次型展开为各资产独立平方项的线性加总：
$$W=\frac{(0.002)^2}{0.000004}+\frac{(-0.001)^2}{0.000001}+\frac{(0.003)^2}{0.000009}=\frac{0.000004}{0.000004}+\frac{0.000001}{0.000001}+\frac{0.000009}{0.000009}$$
各分量均精确等于 $1$，求和得
$$W=1+1+1=3.0$$

在原假设成立且满足常规大样本正态性条件下，由于检验的线性约束维度为 $q=3$，Wald 统计量渐近服从自由度为 $3$ 的卡方分布：
$$W\xrightarrow{d}\chi^2(3)$$
在 $5\%$ 显著性水平下，自由度为 $3$ 的卡方临界值为 $\chi_{0.05}^2(3)\approx 7.815$。由于 $3.0<7.815$，不能拒绝三个资产截距联合为零的原假设。

若真实协方差矩阵包含非零的非对角元素，强行使用对角近似将导致以下严重推断后果：
其一，检验水准扭曲。当资产收益残差存在横截面相关性时，对角化加权矩阵并非真实协方差的渐近有效逆阵，二次型统计量不再服从标准卡方分布，其实际渐近分布是相互独立卡方变量的加权和，权重大于或小于 $1$，从而导致第一类错误概率严重偏离名义显著性水平。
其二，检验功效大幅损失或虚假放量。在资产定价的几何视角下，全协方差矩阵对应的 Wald 检验（与 GRS 检验等价）度量的是扩展测试资产后切点投资组合夏普比率的平方增量。残差非对角元反映了资产间的对冲与分散化能力。当两项资产具有高度正相关残差时，多空对冲组合能够大幅压缩未被因子解释的波动率；若忽略非对角项，就无法识别这类低风险的联合异常定价组合，导致检验对特定方向的定价偏误失去检验功效；反之，若各资产点估计符号同向且残差高度正相关，对角近似会将同一宏观噪声的重复体现当作独立证据进行无谓累加，导致统计量虚高。

本题常见错误做法是将协方差矩阵的对角元素直接开方作为标准差求和；或者将联合检验退化为对各单个资产 $t$ 统计量的绝对值进行简单比较；此外在讨论非对角元影响时，往往只笼统提及方差不准，未能联系到切点组合对冲效应与卡方检验水准失真的数理本质。

## 20. 

在样本外预测评估中，以训练集历史均值 $\bar y_{train}=0.001$ 作为基准预测，四个测试时期的实际收益率为 $y_1=0.02,y_2=-0.01,y_3=0.015,y_4=0.005$，模型预测值依次为 $\hat y_1=0.01,\hat y_2=0,\hat y_3=0.01,\hat y_4=0.01$。

计算预测模型的样本外预测误差及其平方和：
第一期误差为 $e_1=y_1-\hat y_1=0.02-0.01=0.01$，平方为 $e_1^2=0.000100$；
第二期误差为 $e_2=y_2-\hat y_2=-0.01-0=-0.01$，平方为 $e_2^2=0.000100$；
第三期误差为 $e_3=y_3-\hat y_3=0.015-0.01=0.005$，平方为 $e_3^2=0.000025$；
第四期误差为 $e_4=y_4-\hat y_4=0.005-0.01=-0.005$，平方为 $e_4^2=0.000025$。
模型预测误差平方和为
$$\sum_{t=1}^4(y_t-\hat y_t)^2=0.000100+0.000100+0.000025+0.000025=0.000250$$

计算基准预测（训练集均值）的样本外预测误差及其平方和：
第一期误差为 $e_{0,1}=y_1-\bar y_{train}=0.02-0.001=0.019$，平方为 $e_{0,1}^2=0.000361$；
第二期误差为 $e_{0,2}=y_2-\bar y_{train}=-0.01-0.001=-0.011$，平方为 $e_{0,2}^2=0.000121$；
第三期误差为 $e_{0,3}=y_3-\bar y_{train}=0.015-0.001=0.014$，平方为 $e_{0,3}^2=0.000196$；
第四期误差为 $e_{0,4}=y_4-\bar y_{train}=0.005-0.001=0.004$，平方为 $e_{0,4}^2=0.000016$。
基准预测误差平方和为
$$\sum_{t=1}^4(y_t-\bar y_{train})^2=0.000361+0.000121+0.000196+0.000016=0.000694$$

样本外可决系数定义为
$$R_{OOS}^2=1-\frac{\sum_{t=1}^4(y_t-\hat y_t)^2}{\sum_{t=1}^4(y_t-\bar y_{train})^2}=1-\frac{0.000250}{0.000694}=1-\frac{125}{347}=\frac{222}{347}\approx 0.639769$$
即约为 $63.98\%$。

关于其符号与大小的解释：
符号层面，$R_{OOS}^2$ 严格为正，表明该预测模型在测试集上的均方预测误差低于单纯依赖历史均值的朴素基准，证明模型包含真实的样本外增量预测信息。若该统计量为负，则意味着模型因过拟合导致样本外表现劣于历史均值。
大小层面，约 $64\%$ 的预测误差方差压缩在真实金融资产收益预测中属于极强的信息提升。在金融量化实践中，资产价格信噪比极低，月度预测的 $R_{OOS}^2$ 达到 $1\%$ 至 $2\%$ 即可带来显著的经济收益与组合夏普比率改善。本题在四期小样本测试中达到如此高的数值，反映了该模型在特定区间的强拟合。

若测试标签跨越两期重叠，在检验预测误差差异的统计显著性时（例如 Diebold–Mariano 检验），由于相邻两个测试区间的真实收益包含一个共同的时间窗口，区间重叠必然导致预测误差差值序列产生机械性的滞后一阶移动平均相关结构，即 MA(1) 过程。若采用假定序列独立的普通标准误，忽略正自相关项会极大地低估差异均值的抽样方差，导致检验统计量被虚假放大，产生严峻的过度拒绝。因此必须采用自相关稳健协方差估计量（如 Newey–West 估计量并设置截断滞后阶数 $L\ge 1$）来校准标准误。

本题常见错误做法是在基准误差计算中误用测试集的样本均值代替训练集均值，从而违背严格的样本外因果隔离原则；或误以为 $R_{OOS}^2$ 与样本内 $R^2$ 一样具有非负性；此外在解释重叠区间自相关时，未能说明构造重叠标签导致扰动项机械性共享信息的技术机制。
## 21. 

模型包含一个截距项和两个斜率参数，故参数总数为 $p=1+2=3$。样本量为 $n=25$，全样本回归标准误为 $s=2$。高杠杆值的经典经验参考线为
$$\frac{2p}{n}=\frac{2\times 3}{25}=\frac{6}{25}=0.24$$

对于观测 A：残差为 $e_A=3$，杠杆值为 $h_{AA}=0.20$，留一标准误为 $s_{(A)}=1.8$。
计算其内部学生化残差：
$$r_A=\frac{e_A}{s\sqrt{1-h_{AA}}}=\frac{3}{2\times\sqrt{1-0.20}}=\frac{3}{2\times\sqrt{0.80}}=\frac{3\sqrt{5}}{4}\approx 1.67705$$
计算其外部学生化残差：
$$t_A=\frac{e_A}{s_{(A)}\sqrt{1-h_{AA}}}=\frac{3}{1.8\times\sqrt{0.80}}=\frac{5\sqrt{5}}{6}\approx 1.86339$$
计算其 Cook 距离：
$$D_A=\frac{e_A^2 h_{AA}}{p s^2(1-h_{AA})^2}=\frac{3^2\times 0.20}{3\times 2^2\times(1-0.20)^2}=\frac{9\times 0.20}{12\times 0.64}=\frac{1.8}{7.68}=\frac{15}{64}\approx 0.234375$$

对于观测 B：残差为 $e_B=-4$，杠杆值为 $h_{BB}=0.05$，留一标准误为 $s_{(B)}=1.8$。
计算其内部学生化残差：
$$r_B=\frac{e_B}{s\sqrt{1-h_{BB}}}=\frac{-4}{2\times\sqrt{1-0.05}}=\frac{-2}{\sqrt{0.95}}\approx -2.05196$$
计算其外部学生化残差：
$$t_B=\frac{e_B}{s_{(B)}\sqrt{1-h_{BB}}}=\frac{-4}{1.8\times\sqrt{0.95}}=\frac{-20}{9\times\sqrt{0.95}}\approx -2.27995$$
计算其 Cook 距离：
$$D_B=\frac{e_B^2 h_{BB}}{p s^2(1-h_{BB})^2}=\frac{(-4)^2\times 0.05}{3\times 2^2\times(1-0.05)^2}=\frac{16\times 0.05}{12\times 0.9025}=\frac{0.80}{10.83}=\frac{80}{1083}\approx 0.073869$$

结合杠杆参考线 $2p/n=0.24$ 综合对比：
在杠杆维度上，观测 A 的杠杆值为 $0.20$，远高于样本平均杠杆水平 $p/n=0.12$，非常接近高杠杆警戒线 $0.24$；而观测 B 的杠杆值仅为 $0.05$，处于自变量设计空间的中心区域。
在残差维度上，观测 B 的学生化残差绝对值 $|r_B|\approx 2.05>2$（外部学生化残差绝对值高达 $2.28$），在因变量响应维度属于典型的离群点；而观测 A 的残差处于两倍标准差之内。
在综合影响维度上，Cook 距离度量删除该观测对全体回归系数向量造成的扰动幅度。观测 A 的 Cook 距离为 $D_A\approx 0.2344$，是观测 B（$D_B\approx 0.0739$）的三倍以上。这是因为 Cook 距离由残差平方与杠杆权重比率 $h_{ii}/(1-h_{ii})^2$ 共同决定：观测 A 的较高杠杆产生了强大的放大杠杆臂效应。因此，从参数稳健性与模型拟合全局稳定性的角度考量，观测 A 更值得优先排查。

这种诊断检查绝不能自动等同于直接删除异常值。原因在于：
第一，极端观测值往往包含最关键的经济与市场结构信息，例如流动性危机、黑天鹅冲击或罕见的高波动市场状态，盲目删除会人为抹杀现实分布的厚尾特征，导致模型对尾部风险完全失明。
第二，机械删除残差偏大或杠杆偏高的样本会人为压低残差平方和，引入严重的数据窥探偏误与幸存者偏差，导致标准误被虚假压缩，造成过度乐观的统计推断。
正确的处理规程是：首先核查数据源是否存在录入错误、除权除息未复权等数据清洗瑕疵；若数据真实有效，应评估是否需要补充遗漏解释变量或引入机制转换模型，或转为采用稳健回归（如 Huber 损失估计或 M 估计量）对离群点施加降权，并在学术与实盘报告中同时呈现包含与剔除该观测的敏感性对比分析。

本题常见错误做法是将参数总数 $p$ 误判为仅含斜率项的 $2$ 而漏算截距项；或仅凭残差绝对值大小直观认定残差更大的观测 B 具有更大影响力，忽视了高杠杆对 Cook 距离的平方级放大效应；在计算公式时，容易混淆内部与外部学生化残差的分母标准误设定。
## 22. 

对于包含截距项与市场、规模、价值三个斜率因子的全模型，无受限模型参数总数为 $p=1+3=4$。样本量为 $n=240$。原假设为规模因子与价值因子的斜率系数联合为零，即施加 $q=2$ 个线性约束。无受限与受限模型的残差平方和分别为 $RSS_U=0.48$ 和 $RSS_R=0.60$。

经典联合检验的 $F$ 统计量定义为
$$F=\frac{(RSS_R-RSS_U)/q}{RSS_U/(n-p)}=\frac{(0.60-0.48)/2}{0.48/(240-4)}=\frac{0.12/2}{0.48/236}=\frac{0.06\times 236}{0.48}=\frac{236}{8}=29.5$$
该统计量在原假设下的第一自由度（分子自由度）为约束个数 $q=2$，第二自由度（分母自由度）为无受限模型的剩余自由度 $n-p=236$。在 $5\%$ 显著性水平下，临界值 $F_{0.05}(2,236)\approx 3.03$。因 $29.5>3.03$，统计上极显著拒绝规模与价值因子系数联合为零的原假设。

若回归残差存在异方差和滞后一阶自相关，经典 $F$ 检验不能直接使用。经典 $F$ 检验的推导严格依赖误差项的球形扰动假定，即协方差矩阵为数量阵 $\sigma^2\boldsymbol I$。在异方差与序列相关并存时，最小二乘估计量协方差的标准估计 $s^2(\boldsymbol X^\top\boldsymbol X)^{-1}$ 不再收敛于真实渐近方差，导致经典 $F$ 统计量不再服从 $F$ 分布，通常会导致第一类错误概率大幅偏高。此时必须改用稳健联合检验：构造基于 Newey–West（HAC）异方差自相关稳健协方差估计量的 Wald 检验。协方差矩阵设定中，长期协方差核矩阵应选取 Bartlett 核，截断滞后阶数需满足 $L\ge 1$（例如依据 Andrews 准则选取），稳健 Wald 统计量渐近服从自由度为 $2$ 的卡方分布。

当进一步可以建模并估计误差协方差结构时，可行广义最小二乘（FGLS）与普通最小二乘配合稳健标准误（OLS + HAC）具有完全不同的方法论目标：
OLS + HAC 的目标是推断稳健性。它维持 OLS 点估计不变（在严格外生性下 OLS 依然保持无偏和一致），通过在外层构造无需完全知晓真实扰动形式的稳健协方差阵，确保在分布未知或结构存在轻度误设时依然能够提供大样本下有效的置信区间与假设检验。
FGLS 的目标是点估计的最优效率。它通过对误差项的自相关与异方差结构进行参数化建模（如估计 AR(1) 自回归系数），求出误差协方差估计矩阵并实施准差分变换，力求达到高斯–马尔可夫与艾特肯定理下的渐近有效界，从而在无偏线性估计类中获得最小估计方差。但其代价是对模型设定的敏感性：若协方差结构误设，FGLS 不仅无法提升效率，还可能引入有限样本偏差与不稳定。

对于杠杆值高达 $h_{ii}=0.35$ 的极端观测（远超平均杠杆警戒线 $2p/n=8/240\approx 0.0333$ 的十倍以上），必须实施进一步的多维影响诊断：
首先计算 Cook 距离 $D_i$，诊断该样本是否对四维参数估计向量产生全局性剧烈牵引；
其次计算每个因子的局部影响指标 $\operatorname{DFBETAS}_{j(i)}$，重点核查截距项以及市场、规模、价值各因子斜率是否因该样本发生超过 $2/\sqrt{n}\approx 0.129$ 的大幅跳变，精确定位是哪一个因子暴露承受了异常扭曲；
再次计算拟合值变化量 $\operatorname{DFFITS}_i$，判断删除该观测后预测收益的变化幅度；
最后计算协方差比率 $\operatorname{COVRATIO}_i$，评估该点对整体参数估计精度的膨胀或压缩效应。

为了在样本外客观评估该多因子模型的预测能力，设计严格杜绝前视偏差的扩展窗口（Expanding Window）方案如下：
第一，时间序列递归设定。设定初始训练窗口长度为 $T_0$（如 $120$ 个交易日）。从时间点 $t=T_0$ 开始逐期步进至 $n-1$，每次仅使用历史区间 $[1, t]$ 内的信息。
第二，因子筛选的严格因果隔离。在每个步进截面 $t$ 上，因子有效性检验、特征打分筛选或降维降噪程序只能基于 $[1, t]$ 的已实现数据进行，严禁使用全样本回测指标或未来区间的相关系数来预先挑选因子。
第三，动态标准化防泄漏。各因子的去极值、均值中心化与方差标准化参数，必须严格仅由区间 $[1, t]$ 计算得出；预测期 $t+1$ 的因子暴露值必须使用历史均值与历史标准差实施变换，严禁使用全样本均值和标准差提前标准化。
第四，参数重估与单步预测。在截面 $t$ 使用区间 $[1, t]$ 的所有样本重估回归参数 $\hat{\boldsymbol\beta}_t$，并代入在 $t$ 时刻已完全确知的 $t+1$ 期因子暴露，生成纯样本外预测收益率 $\hat y_{t+1}=\boldsymbol x_{t+1}^\top\hat{\boldsymbol\beta}_t$。随后将窗口右端扩展一位纳入 $t+1$ 期的实际实现值，滚动重复直到全样本结束。

本题常见错误做法是在计算经典 $F$ 统计量时将无受限自由度误记为 $n-p=240-3=237$，遗漏了截距项所占用的自由度；或混淆 OLS+HAC 追求推断稳健性与 FGLS 追求估计效率的核心逻辑差异；在设计防前视偏差方案时，最典型的严重失误是在外层循环开始之前对全生命周期数据统一进行 Z-score 标准化或全样本因子相关性初筛，从而产生严重的信息泄露。