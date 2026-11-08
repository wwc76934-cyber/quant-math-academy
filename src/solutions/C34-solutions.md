# 第34章习题参考答案与解析

## 1. 

本题考查利用多元 Delta 法推导高斯假定下单期样本夏普比率的渐近分布。

**证明**

记单期样本均值为 $\bar R = \frac{1}{T} \sum_{t=1}^T R_t$，无偏样本方差为 $s^2 = \frac{1}{T-1} \sum_{t=1}^T (R_t - \bar R)^2$。由于 $R_t \sim \text{i.i.d. } \mathcal N(\mu, \sigma^2)$，由正态样本性质及 Cochran 定理，$\bar R$ 与 $s^2$ 相互独立，且有分布性质：
$$\bar R \sim \mathcal N\left(\mu, \frac{\sigma^2}{T}\right), \quad \frac{(T-1)s^2}{\sigma^2} \sim \chi^2(T-1)$$

根据中心极限定理，样本二阶矩估计量关于真实参数具备渐近正态性：
$$\sqrt{T} \left( \begin{pmatrix} \bar R \\ s^2 \end{pmatrix} - \begin{pmatrix} \mu \\ \sigma^2 \end{pmatrix} \right) \xrightarrow{\mathrm d} \mathcal N\left( \begin{pmatrix} 0 \\ 0 \end{pmatrix}, \boldsymbol \Sigma \right)$$
其中协方差矩阵为对角阵：
$$\boldsymbol \Sigma = \begin{pmatrix} \sigma^2 & 0 \\ 0 & 2 \sigma^4 \end{pmatrix}$$

定义从二维参数空间 $\mathbb R \times (0, \infty)$ 映射到实数集的连续可微函数 $g(x, y) = \frac{x}{\sqrt{y}}$。样本夏普比率满足 $\widehat{\mathrm{SR}} = g(\bar R, s^2)$，真实夏普比率为 $\mathrm{SR} = g(\mu, \sigma^2) = \frac{\mu}{\sigma}$。

计算函数 $g(x, y)$ 在真实参数点 $(\mu, \sigma^2)$ 处的梯度向量：
$$\nabla g(\mu, \sigma^2) = \left. \begin{pmatrix} \frac{\partial g}{\partial x} \\ \frac{\partial g}{\partial y} \end{pmatrix} \right|_{(\mu, \sigma^2)} = \begin{pmatrix} \frac{1}{\sigma} \\ -\frac{\mu}{2 \sigma^3} \end{pmatrix}$$

由多元 Delta 法，$\sqrt{T}(\widehat{\mathrm{SR}} - \mathrm{SR})$ 的渐近方差由二次型给出：
$$\sigma_{\mathrm{SR}}^2 = \nabla g(\mu, \sigma^2)^\top \boldsymbol \Sigma \nabla g(\mu, \sigma^2)$$

展开该二次型：
$$\sigma_{\mathrm{SR}}^2 = \left( \frac{1}{\sigma} \right)^2 \cdot \sigma^2 + \left( -\frac{\mu}{2 \sigma^3} \right)^2 \cdot 2 \sigma^4 = 1 + \frac{\mu^2}{4 \sigma^6} \cdot 2 \sigma^4 = 1 + \frac{1}{2} \left( \frac{\mu}{\sigma} \right)^2 = 1 + \frac{1}{2} \mathrm{SR}^2$$

由此得到当样本量 $T \to \infty$ 时的渐近分布：
$$\sqrt{T}(\widehat{\mathrm{SR}} - \mathrm{SR}) \xrightarrow{\mathrm d} \mathcal N\left(0, 1 + \frac{1}{2} \mathrm{SR}^2\right)$$

□

常见错误做法剖析：部分分析在推导夏普比率标准误时，错误地将分母上的样本标准差 $s$ 视为已知常数 $\sigma$，仅对分子 $\bar R$ 求方差，得出错误方差 $1/T$；或者忽略了卡方分布自由度对应的二阶矩渐近方差因子 $2 \sigma^4$。另一个易错点是将方差估计量与标准差估计量混淆而导致微商链式法则符号或系数错误。

## 2. 

本题考查一般非高斯收益率分布下样本夏普比率渐近方差的 Lo 公式推导。

**证明**

设单期超额收益率中心化随机变量为 $Y_t = R_t - \mu$。由条件可知 $\mathbb E[Y_t] = 0$，$\mathbb E[Y_t^2] = \sigma^2$，$\mathbb E[Y_t^3] = \gamma_3 \sigma^3$，$\mathbb E[Y_t^4] = \gamma_4 \sigma^4$。

考虑联合统计量向量 $\boldsymbol \theta_T = (\bar R, s^2)^\top$。利用样本均值与样本二阶中心矩的一阶大样本渐近等价性，有：
$$s^2 = \frac{1}{T} \sum_{t=1}^T Y_t^2 - (\bar R - \mu)^2 + \mathcal O_{\mathbb P}(T^{-1}) = \frac{1}{T} \sum_{t=1}^T Y_t^2 + o_{\mathbb P}(T^{-1/2})$$

构造和向量 $\frac{1}{T} \sum_{t=1}^T \begin{pmatrix} Y_t \\ Y_t^2 - \sigma^2 \end{pmatrix}$。根据多元中心极限定理，渐近协方差矩阵元素满足：
$$\operatorname{Var}\left(\frac{1}{\sqrt{T}} \sum_{t=1}^T Y_t\right) = \mathbb E[Y_t^2] = \sigma^2$$
$$\operatorname{Var}\left(\frac{1}{\sqrt{T}} \sum_{t=1}^T (Y_t^2 - \sigma^2)\right) = \mathbb E[(Y_t^2 - \sigma^2)^2] = \mathbb E[Y_t^4] - \sigma^4 = (\gamma_4 - 1) \sigma^4$$
$$\operatorname{Cov}\left(\frac{1}{\sqrt{T}} \sum_{t=1}^T Y_t, \frac{1}{\sqrt{T}} \sum_{t=1}^T (Y_t^2 - \sigma^2)\right) = \mathbb E[Y_t(Y_t^2 - \sigma^2)] = \mathbb E[Y_t^3] = \gamma_3 \sigma^3$$

联合渐近协方差矩阵为：
$$\boldsymbol \Sigma = \begin{pmatrix} \sigma^2 & \gamma_3 \sigma^3 \\ \gamma_3 \sigma^3 & (\gamma_4 - 1) \sigma^4 \end{pmatrix}$$

再次应用关于函数 $g(x, y) = \frac{x}{\sqrt{y}}$ 的梯度向量 $\nabla g(\mu, \sigma^2) = \begin{pmatrix} \frac{1}{\sigma} \\ -\frac{\mu}{2 \sigma^3} \end{pmatrix}$，计算渐近方差：
$$\operatorname{AVar}(\widehat{\mathrm{SR}}) = \nabla g^\top \boldsymbol \Sigma \nabla g = \begin{pmatrix} \frac{1}{\sigma} & -\frac{\mathrm{SR}}{2 \sigma^2} \end{pmatrix} \begin{pmatrix} \sigma^2 & \gamma_3 \sigma^3 \\ \gamma_3 \sigma^3 & (\gamma_4 - 1) \sigma^4 \end{pmatrix} \begin{pmatrix} \frac{1}{\sigma} \\ -\frac{\mathrm{SR}}{2 \sigma^2} \end{pmatrix}$$

展开矩阵乘积：
$$\operatorname{AVar}(\widehat{\mathrm{SR}}) = 1 - 2 \cdot \frac{\mathrm{SR}}{2 \sigma^3} (\gamma_3 \sigma^3) + \frac{\mathrm{SR}^2}{4 \sigma^4} (\gamma_4 - 1) \sigma^4 = 1 - \gamma_3 \mathrm{SR} + \frac{\gamma_4 - 1}{4} \mathrm{SR}^2$$

由于 $\operatorname{Var}(\widehat{\mathrm{SR}}) = \frac{1}{T} \operatorname{AVar}(\widehat{\mathrm{SR}}) + o\left(\frac{1}{T}\right)$，代入即得：
$$\operatorname{Var}(\widehat{\mathrm{SR}}) = \frac{1}{T} \left( 1 - \gamma_3 \mathrm{SR} + \frac{\gamma_4 - 1}{4} \mathrm{SR}^2 \right) + o\left(\frac{1}{T}\right)$$

□

常见错误做法剖析：最普遍的错误是假设均值估计与方差估计在非高斯分布下依旧保持正交，从而丢弃了协方差交叉项 $-\gamma_3 \mathrm{SR}$。在左偏收益率（例如期权做空策略或尾部风险策略，$\gamma_3 < 0$）场景下，该交叉项为正，会显著放大样本夏普比率的估计方差；若忽略此项将导致对策略统计显著性的严重高估。

## 3. 

本题考查主动管理基本定律框架下二次效用优化与信息比率最大化的代数与几何等价性。

**证明**

记资产预期主动收益向量为 $\boldsymbol \alpha \in \mathbb R^n$，残差协方差矩阵为正定对称阵 $\boldsymbol \Sigma \in \mathbb R^{n \times n}$。主动权重向量满足资金预算中性约束 $\boldsymbol 1^\top \Delta \boldsymbol w = 0$。

组合预期主动收益与主动方差分别为：
$$\mu_A = \Delta \boldsymbol w^\top \boldsymbol \alpha, \quad \sigma_A^2 = \Delta \boldsymbol w^\top \boldsymbol \Sigma \Delta \boldsymbol w$$
信息比率目标定义为：
$$\mathrm{IR}(\Delta \boldsymbol w) = \frac{\Delta \boldsymbol w^\top \boldsymbol \alpha}{\sqrt{\Delta \boldsymbol w^\top \boldsymbol \Sigma \Delta \boldsymbol w}}$$

注意到信息比率具有关于正标量缩放的零阶齐次性：对任意标量 $c > 0$，有 $\mathrm{IR}(c \Delta \boldsymbol w) = \mathrm{IR}(\Delta \boldsymbol w)$。因此最大化信息比率的问题等价于固定主动方差为常数 $\sigma_0^2 > 0$ 下极大化预期超额收益：
$$\max_{\Delta \boldsymbol w} \Delta \boldsymbol w^\top \boldsymbol \alpha \quad \text{s.t.} \quad \Delta \boldsymbol w^\top \boldsymbol \Sigma \Delta \boldsymbol w = \sigma_0^2, \quad \boldsymbol 1^\top \Delta \boldsymbol w = 0$$

引入拉格朗日乘子 $\theta > 0$ 与 $\nu \in \mathbb R$，一阶必要条件为：
$$\boldsymbol \alpha - 2 \theta \boldsymbol \Sigma \Delta \boldsymbol w - \nu \boldsymbol 1 = \boldsymbol 0 \implies \Delta \boldsymbol w = \frac{1}{2 \theta} \boldsymbol \Sigma^{-1} (\boldsymbol \alpha - \nu \boldsymbol 1)$$
代入约束 $\boldsymbol 1^\top \Delta \boldsymbol w = 0$ 可唯一解出标量 $\nu = \frac{\boldsymbol 1^\top \boldsymbol \Sigma^{-1} \boldsymbol \alpha}{\boldsymbol 1^\top \boldsymbol \Sigma^{-1} \boldsymbol 1}$。记中性化超额收益向量为 $\boldsymbol \alpha^* = \boldsymbol \alpha - \frac{\boldsymbol 1^\top \boldsymbol \Sigma^{-1} \boldsymbol \alpha}{\boldsymbol 1^\top \boldsymbol \Sigma^{-1} \boldsymbol 1} \boldsymbol 1$。则最优权重射线方向固定为：
$$\Delta \boldsymbol w \propto \boldsymbol \Sigma^{-1} \boldsymbol \alpha^*$$

另一方面，考虑具有风险厌恶系数 $\lambda > 0$ 的二次惩罚主动优化问题：
$$\max_{\Delta \boldsymbol w} \left( \Delta \boldsymbol w^\top \boldsymbol \alpha - \frac{\lambda}{2} \Delta \boldsymbol w^\top \boldsymbol \Sigma \Delta \boldsymbol w \right) \quad \text{s.t.} \quad \boldsymbol 1^\top \Delta \boldsymbol w = 0$$

建立拉格朗日函数 $L(\Delta \boldsymbol w, \kappa) = \Delta \boldsymbol w^\top \boldsymbol \alpha - \frac{\lambda}{2} \Delta \boldsymbol w^\top \boldsymbol \Sigma \Delta \boldsymbol w - \kappa \boldsymbol 1^\top \Delta \boldsymbol w$。求梯度令其为零：
$$\nabla_{\Delta \boldsymbol w} L = \boldsymbol \alpha - \lambda \boldsymbol \Sigma \Delta \boldsymbol w - \kappa \boldsymbol 1 = \boldsymbol 0 \implies \Delta \boldsymbol w^*(\lambda) = \frac{1}{\lambda} \boldsymbol \Sigma^{-1} (\boldsymbol \alpha - \kappa \boldsymbol 1)$$
结合约束解得相同的乘子项，从而有：
$$\Delta \boldsymbol w^*(\lambda) = \frac{1}{\lambda} \boldsymbol \Sigma^{-1} \boldsymbol \alpha^*$$

由此可见，二次方差惩罚下的最优权重解 $\Delta \boldsymbol w^*(\lambda)$ 与最大化信息比率的最优解落在完全相同的半直线上，两者的组合权重仅相差全局标量因子 $\frac{1}{\lambda}$。代入信息比率目标函数，该标量因子在分子与分母中精确抵消，产生完全相同的最优信息比率：
$$\mathrm{IR}(\Delta \boldsymbol w^*(\lambda)) = \max_{\Delta \boldsymbol w} \mathrm{IR}(\Delta \boldsymbol w) = \sqrt{\boldsymbol \alpha^{*\top} \boldsymbol \Sigma^{-1} \boldsymbol \alpha^*}$$
因此，在二次方差惩罚下极大化主动收益与最大化信息比率完全等价。

□

常见错误做法剖析：常见错误是误认为风险厌恶系数 $\lambda$ 的不同取值会改变投资组合内部的相对资产配置结构。事实上，由二次效用问题的分离性质，$\lambda$ 仅仅控制整体主动风险敞口的大小，而不影响组合各资产之间的相对权重比例。此外，若推导中忽略了全额中性条件 $\boldsymbol 1^\top \Delta \boldsymbol w = 0$，将导致拉格朗日乘子 $\nu$ 的遗失。


## 4. 

本题考查单侧下偏半方差与索提诺比率目标函数关于投资组合权重的连续可微性。

**证明**

设证券收益率随机向量为 $\boldsymbol R \in \mathbb R^n$，投资组合权重为 $\boldsymbol w \in \mathbb R^n$。组合收益率为 $R(\boldsymbol w) = \boldsymbol w^\top \boldsymbol R$。记超额收益期望为 $\mu(\boldsymbol w) = \mathbb E[R(\boldsymbol w)] - \tau_{\mathrm{MAR}} = \boldsymbol w^\top \mathbb E[\boldsymbol R] - \tau_{\mathrm{MAR}}$。

考察二阶单侧下偏矩被积函数：
$$h(\boldsymbol w, \boldsymbol r) = \left( \max(0, \tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r) \right)^2 = (\tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r)^2 \cdot \mathbb I_{\{\boldsymbol w^\top \boldsymbol r \le \tau_{\mathrm{MAR}}\}}$$

对任意给定的收益率实现值 $\boldsymbol r$，考察 $h(\boldsymbol w, \boldsymbol r)$ 关于权重向量 $\boldsymbol w$ 的偏导数。当 $\boldsymbol w^\top \boldsymbol r < \tau_{\mathrm{MAR}}$ 时：
$$\nabla_{\boldsymbol w} h(\boldsymbol w, \boldsymbol r) = 2(\tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r) \cdot (-\boldsymbol r) = -2(\tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r) \boldsymbol r$$
当 $\boldsymbol w^\top \boldsymbol r > \tau_{\mathrm{MAR}}$ 时，函数恒为零，故 $\nabla_{\boldsymbol w} h(\boldsymbol w, \boldsymbol r) = \boldsymbol 0$。

在交界面 $\boldsymbol w^\top \boldsymbol r = \tau_{\mathrm{MAR}}$ 处，分别计算左侧与右侧极限：
$$\lim_{\boldsymbol w^\top \boldsymbol r \to \tau_{\mathrm{MAR}}^-} -2(\tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r) \boldsymbol r = \boldsymbol 0, \quad \lim_{\boldsymbol w^\top \boldsymbol r \to \tau_{\mathrm{MAR}}^+} \boldsymbol 0 = \boldsymbol 0$$
两极限处处重合且等于零。因此对任意确定的 $\boldsymbol r$，映射 $\boldsymbol w \mapsto h(\boldsymbol w, \boldsymbol r)$ 在全空间连续可微，且其梯度为：
$$\nabla_{\boldsymbol w} h(\boldsymbol w, \boldsymbol r) = -2 \max(0, \tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol r) \boldsymbol r$$

由于 $R$ 的二阶矩有限，且假定在阈值 $\tau_{\mathrm{MAR}}$ 附近分布连续（使得边界测度 $\mathbb P(\boldsymbol w^\top \boldsymbol R = \tau_{\mathrm{MAR}}) = 0$），由勒贝格控制收敛定理与积分号下求导法则，积分与梯度运算可交换次序：
$$\nabla_{\boldsymbol w} \operatorname{LPM}_2(\boldsymbol w) = \mathbb E[\nabla_{\boldsymbol w} h(\boldsymbol w, \boldsymbol R)] = -2 \mathbb E\left[ (\tau_{\mathrm{MAR}} - \boldsymbol w^\top \boldsymbol R)^+ \boldsymbol R \right]$$
该积分关于 $\boldsymbol w$ 处处连续。

索提诺比率表示为：
$$\operatorname{Sortino}(\boldsymbol w) = \frac{\mu(\boldsymbol w)}{\sqrt{\operatorname{LPM}_2(\boldsymbol w)}}$$
在有效投资域内，存在下行风险，即 $\operatorname{LPM}_2(\boldsymbol w) > 0$。根据商法则，梯度显式表达式为：
$$\nabla_{\boldsymbol w} \operatorname{Sortino}(\boldsymbol w) = \frac{\nabla \mu(\boldsymbol w) \sqrt{\operatorname{LPM}_2(\boldsymbol w)} - \mu(\boldsymbol w) \frac{\nabla_{\boldsymbol w} \operatorname{LPM}_2(\boldsymbol w)}{2 \sqrt{\operatorname{LPM}_2(\boldsymbol w)}}}{\operatorname{LPM}_2(\boldsymbol w)}$$
由于分子中各连续函数（$\mathbb E[\boldsymbol R]$、$\sqrt{\operatorname{LPM}_2(\boldsymbol w)}$、$\nabla \operatorname{LPM}_2(\boldsymbol w)$）进行代数运算且分母处处严格大于零，由此可知索提诺比率关于权重 $\boldsymbol w$ 的梯度不仅处处存在，而且处处连续。

□

常见错误做法剖析：常见错误是将一阶下偏矩 $\operatorname{LPM}_1$ 与二阶下偏矩 $\operatorname{LPM}_2$ 混淆。在 $\operatorname{LPM}_1 = \mathbb E[(\tau_{\mathrm{MAR}} - R)^+]$ 中，被积函数在分界点处导数存在第一类跳跃间断点，直接对样本版本求导会产生不可微的指示函数阶跃，导致基于梯度的优化算法震荡；而二阶下偏矩因二次平滑在边界处一阶导数连续为零，天然具备连续梯度。

## 5. 

本题考查算术布朗运动最大回撤（Maximum Drawdown, MDD）扩散过程偏微分方程的建立及长时渐近增长率的分析。

设标的对数价格过程为 $X_t = \mu t + \sigma W_t$，其中漂移率 $\mu > 0$，波动率 $\sigma > 0$。历史高点过程定义为 $M_t = \sup_{0 \le s \le t} X_s$，当前时刻回撤定义为 $D_t = M_t - X_t \ge 0$。区间 $[0, T]$ 内的最大回撤为：
$$\mathrm{MDD}(T) = \sup_{0 \le t \le T} D_t$$

**解析与推导**

第一部分：建立关于尺度参数 $\gamma_{\mathrm{drift}} = \mu / \sigma^2$ 的偏微分方程。
利用 Itô 乘子法则与局部时分析，在两次刷新高点之间（即 $D_t > 0$ 时），由于 $\mathrm d M_t = 0$，回撤过程服从如下反射扩散方程：
$$\mathrm d D_t = -\mu \, \mathrm d t - \sigma \, \mathrm d W_t + \mathrm d M_t$$
其中 $M_t$ 仅在 $D_t = 0$ 时增加，充当原点处的斜向反射壁。

考虑无条件回撤在阈值 $y > 0$ 内部存续的概率转移核。令 $u(t, z) = \mathbb P\left( \sup_{0 \le s \le t} D_s \le y \;\mid\; D_0 = z \right)$，其中 $z \in [0, y]$ 为初始回撤。根据扩散过程的后向 Kolmogorov 方程，微元算子作用于状态变量 $z$：
$$\frac{\partial u}{\partial t} = -\mu \frac{\partial u}{\partial z} + \frac{1}{2} \sigma^2 \frac{\partial^2 u}{\partial z^2}$$
将其除以 $\sigma^2$，以尺度漂移参数 $\gamma_{\mathrm{drift}} = \frac{\mu}{\sigma^2}$ 整理，得到偏微分方程：
$$\frac{1}{\sigma^2} \frac{\partial u}{\partial t} = \frac{1}{2} \frac{\partial^2 u}{\partial z^2} - \gamma_{\mathrm{drift}} \frac{\partial u}{\partial z}$$
其边界条件为：
$$\left. \frac{\partial u}{\partial z} \right|_{z=0} = 0, \qquad u(t, y) = 0$$

第二部分：推导渐近线性增长率 $\lim_{T \to \infty} \frac{\mathbb E[\mathrm{MDD}(T)]}{T}$。
由于 $\mu > 0$，漂移率为正，价格过程几乎必然趋向于正无穷大。此时反射过程 $D_t$ 具备遍历平稳分布。令生成元导数项为零：
$$\frac{1}{2} \sigma^2 p''(z) + \mu p'(z) = 0 \implies p(z) = 2 \gamma_{\mathrm{drift}} \mathrm e^{-2 \gamma_{\mathrm{drift}} z} = \frac{2\mu}{\sigma^2} \mathrm e^{-\frac{2\mu}{\sigma^2} z}$$
平稳回撤服从参数为 $2 \gamma_{\mathrm{drift}}$ 的指数分布，其期望瞬时回撤仅为常数 $\frac{\sigma^2}{2\mu}$。

区间 $[0, T]$ 内的最大回撤 $\mathrm{MDD}(T)$ 等价于强遍历马尔可夫过程在时间 $T$ 内达到的极值。根据极值理论对平稳扩散极值的解析展开，当 $T \to \infty$ 时，其期望增长渐近阶为对数阶而非线性阶：
$$\mathbb E[\mathrm{MDD}(T)] = \frac{\sigma^2}{2\mu} \left( \ln\left( \frac{2\mu^2 T}{\sigma^2} \right) + \gamma_{\mathrm{Euler}} \right) + o(1)$$
其中 $\gamma_{\mathrm{Euler}} \approx 0.5772$ 为 Euler--Mascheroni 常数。

因此，两边同除以 $T$ 并令 $T \to \infty$：
$$\lim_{T \to \infty} \frac{\mathbb E[\mathrm{MDD}(T)]}{T} = \lim_{T \to \infty} \frac{\frac{\sigma^2}{2\mu} \ln T}{T} = 0$$
即当资产具备正向稳态漂移时，最大回撤的长时期望渐近线性增长率严格为零。

常见错误做法剖析：常见错误是将正漂移过程（$\mu > 0$）与负漂移过程（$\mu < 0$）相混淆。当 $\mu < 0$ 时，标的价格持续下行崩塌，$X_T - X_0 \sim \mu T$，此时最大回撤才呈现线性增长且增长率为 $|\mu|$。在正漂移情形下，价格不断创新高，回撤被限制在有限尺度的局部波动中，若得出非零的线性增长率说明未能理解正漂移下反射布朗运动的平稳遍历收敛性。

## 6. 

本题考查 Calmar 比率与 Sterling 比率的抗噪性能对比，以及小样本下极值回撤对性能度量造成的抽样发散机制。

**解析与对比分析**

第一部分：定义与抗噪性能对比。
设年化平均收益率为 $\bar R_{\mathrm{ann}}$。区间 $[0, T]$ 内的 Calmar 比率定义为年化收益率与历史全局最大回撤的比值：
$$\operatorname{Calmar}(T) = \frac{\bar R_{\mathrm{ann}}}{\mathrm{MDD}(T)} = \frac{\bar R_{\mathrm{ann}}}{\sup_{0 \le s \le t \le T} (X_s - X_t)}$$
而广义 Sterling 比率通过将回撤风险测度替换为多个离散子周期（如按年度划分的 $N$ 个区间）最大回撤的样本均值：
$$\operatorname{Sterling} = \frac{\bar R_{\mathrm{ann}}}{\frac{1}{N} \sum_{i=1}^N \mathrm{MDD}_i}$$

从极值统计学视角分析二者的抗噪性能：
1. 样本路径极值敏感性：Calmar 比率的分母是一个单一极值统计量（样本全局极值），其样本影响函数（Influence Function）无界。若数据中存在单次流动性瞬时枯竭、除息除权错误标注或单日黑色天鹅事件，$\mathrm{MDD}(T)$ 将被不可逆地永久抬高，从而造成整个样本期内比率的显著坍塌；
2. 估计方差与有效性：Sterling 比率通过对 $N$ 个相对独立的子区间最大回撤进行等权平滑，利用大数定律，其分母估计量的抽样方差近似按 $\mathcal O(1/N)$ 速率衰减。因此，Sterling 比率对局部单点噪声具有天然的过滤平滑能力，展现出远高于 Calmar 比率的统计稳健性。

第二部分：有限小样本下极值回撤的抽样发散效应。
当回测样本量 $T$ 趋于有限小时，极值最大回撤统计量表现出强烈的非对称性与抽样发散：
1. 极值低估与非负截断：由定义可知 $\mathrm{MDD}(T) \ge 0$ 且几乎必然关于 $T$ 单调非减。在小样本下，价格过程尚未充分经历长周期压力测试，$\mathrm{MDD}(T)$ 的抽样分布向原点 $0$ 严重左偏，存在极大的概率落在接近于 $0$ 的微小区间内；
2. Jensen 不等式与倒数凸性放大：由于函数 $f(x) = 1/x$ 在 $x > 0$ 上严格凸，由 Jensen 不等式有 $\mathbb E\left[\frac{1}{\mathrm{MDD}(T)}\right] > \frac{1}{\mathbb E[\mathrm{MDD}(T)]}$。当 $\mathrm{MDD}(T) \to 0$ 时，其倒数呈现超线性爆发。在小样本蒙特卡洛抽样中，只要有极小比例的路径回撤异常小，$\operatorname{Calmar}(T)$ 的经验期望与样本方差就会迅速发散，产生虚假的超高比率；
3. 生存偏差与过拟合发散：在策略回测中，优化器倾向于选择在短样本内“恰好未发生回撤”的脆弱参数，这一抽样发散效应使得短周期 Calmar 比率成为过拟合风险最高的统计量之一。

常见错误做法剖析：常见错误是将 Calmar 比率直接视为标准差型夏普比率的简单替代，忽略了极值统计量具有单调不减的时序累积效应与非线性倒数发散性；另外，在对比时将 Sterling 比率中分母的平均回撤误认为是常规单期回撤的算术平均，未能指出其基于子区间极值均值化的降噪机理。

## 7. 

本题考查机构交易中实施缺口（Implementation Shortfall, IS）的严格会计恒等式推导与微观结构成本分解。

**证明**

设基准纸面投资组合（Paper Portfolio）假定在交易决策下达时刻 $0$ 以到达中间价（Arrival Price）$P_0$ 瞬间全部无摩擦买入 $Q$ 股。在时段末时刻 $T$，标的资产市场中间价为 $P_T$。则纸面投资组合在时段 $[0, T]$ 内的名义收益金额为：
$$V_{\mathrm{paper}} = Q (P_T - P_0)$$

实际执行投资组合（Actual Portfolio）由 $M$ 笔离散子单构成，第 $k$ 笔子单成交量为 $q_k$，实际执行价格为 $P_k$，显性交易税费与佣金为 $C_k$。总累计成交股数为 $Q_{\mathrm{filled}} = \sum_{k=1}^M q_k$。期末持有股票在时刻 $T$ 的市值为 $Q_{\mathrm{filled}} P_T$，累计支付的实际资金本金与费用为 $\sum_{k=1}^M q_k P_k + \sum_{k=1}^M C_k$。实际投资组合在时段 $[0, T]$ 内实现的净利润为：
$$V_{\mathrm{actual}} = \sum_{k=1}^M q_k P_T - \sum_{k=1}^M q_k P_k - \sum_{k=1}^M C_k = \sum_{k=1}^M q_k (P_T - P_k) - \sum_{k=1}^M C_k$$

根据 Perold (1988) 的经典定义，实施缺口 $\mathrm{IS}$ 为纸面组合收益与实际组合净收益之间的差额损失：
$$\mathrm{IS} = V_{\mathrm{paper}} - V_{\mathrm{actual}} = Q (P_T - P_0) - \left[ \sum_{k=1}^M q_k (P_T - P_k) - \sum_{k=1}^M C_k \right]$$

利用总委托数量的守恒关系 $Q = \sum_{k=1}^M q_k + Q_{\mathrm{unfilled}}$，将纸面收益项展开：
$$Q (P_T - P_0) = \sum_{k=1}^M q_k (P_T - P_0) + Q_{\mathrm{unfilled}} (P_T - P_0)$$

将展开式代入实施缺口定义式中：
$$\mathrm{IS} = \sum_{k=1}^M q_k (P_T - P_0) + Q_{\mathrm{unfilled}} (P_T - P_0) - \sum_{k=1}^M q_k (P_T - P_k) + \sum_{k=1}^M C_k$$

合并已成交部分的项：
$$\sum_{k=1}^M q_k (P_T - P_0) - \sum_{k=1}^M q_k (P_T - P_k) = \sum_{k=1}^M q_k \left[ (P_T - P_0) - (P_T - P_k) \right] = \sum_{k=1}^M q_k (P_k - P_0)$$

整理可得实施缺口的精确代数分解恒等式：
$$\mathrm{IS} = \sum_{k=1}^M q_k (P_k - P_0) + Q_{\mathrm{unfilled}} (P_T - P_0) + \sum_{k=1}^M C_k$$

上述三项分别对应：
1. 执行滑点成本（Execution Slippage / Delay and Impact）：$\sum_{k=1}^M q_k (P_k - P_0)$，度量子单实际成交价相对于基准到达价的溢价支出；
2. 未成交机会成本（Opportunity Cost of Unfilled Order）：$Q_{\mathrm{unfilled}} (P_T - P_0)$，度量由于未完全执行而错失的市场单边上行收益；
3. 显性摩擦费用（Explicit Costs）：$\sum_{k=1}^M C_k$，包括经纪商佣金、交易所规费及印花税。

□

常见错误做法剖析：常见错误是将买入方向与卖出方向的符号颠倒。对于买入订单，实际价格高于基准价 $P_k > P_0$ 代表执行滑点亏损，市场上涨 $P_T > P_0$ 时未成交股数产生机会成本亏损；若误写为 $P_0 - P_k$ 则会导致成本项为负。另一常见错误是遗漏期末市价 $P_T$ 的交叉抵消过程，未能基于纸面投资组合与实际投资组合的收益差进行严格会计恒等推导。

## 8. 

本题考查微观结构交易摩擦下匀速执行（TWAP）的总期望成本推导，以及与集中市价执行在冲击维度上的解析对比。

**推导与解析**

第一部分：匀速执行（TWAP）总期望摩擦金额推导。
交易员在时间区间 $[0, T]$ 内匀速买入总量 $Q$ 的资产，执行速度恒定为：
$$v(t) = \frac{Q}{T}, \quad t \in [0, T]$$

标的资产在时刻 $t$ 的受扰动市场中间价受到线性永久冲击驱动：
$$\mathrm d P_t = h(v(t)) \, \mathrm d t + \sigma \, \mathrm d W_t = \gamma \frac{Q}{T} \, \mathrm d t + \sigma \, \mathrm d W_t$$
对两边取期望并积分，得到时刻 $t$ 的期望中间价：
$$\mathbb E[P_t] = P_0 + \int_0^t \gamma \frac{Q}{T} \, \mathrm d s = P_0 + \gamma \frac{Q}{T} t$$

在时刻 $t$ 执行买入时，实际成交价格包含半买卖价差与暂时市场冲击：
$$\tilde P_t = P_t + \frac{S}{2} + g(v(t)) = P_t + \frac{S}{2} + \eta \frac{Q}{T}$$
整个执行过程中支付的总资金期望为：
$$\mathbb E\left[\int_0^T v(t) \tilde P_t \, \mathrm d t\right] = \int_0^T \frac{Q}{T} \left( P_0 + \gamma \frac{Q}{T} t + \frac{S}{2} + \eta \frac{Q}{T} \right) \mathrm d t$$

分别对各项进行积分：
$$\int_0^T \frac{Q}{T} \left( P_0 + \frac{S}{2} + \eta \frac{Q}{T} \right) \mathrm d t = Q \left( P_0 + \frac{S}{2} + \frac{\eta Q}{T} \right)$$
$$\int_0^T \frac{Q}{T} \left( \gamma \frac{Q}{T} t \right) \mathrm d t = \frac{\gamma Q^2}{T^2} \left[ \frac{t^2}{2} \right]_0^T = \frac{1}{2} \gamma Q^2$$

相对于基准到达价市值 $Q P_0$ 的总期望交易摩擦成本为：
$$C_{\mathrm{TWAP}} = \frac{1}{2} S Q + \frac{\eta Q^2}{T} + \frac{1}{2} \gamma Q^2$$

第二部分：与一次性市价单执行的总成本对比。
设一次性市价单在微小时间窗 $\Delta t \to 0$ 内瞬间完成全部 $Q$ 股的买入：
1. 显性价差成本：仍为 $\frac{1}{2} S Q$，由盘口挂单静态宽度决定，与执行速度无关；
2. 永久市场冲击成本：由于永久冲击函数是线性的，价格总上移量为 $\gamma Q$。无论执行路径如何，买入过程承受的平均永久价格偏置均为 $\frac{1}{2} \gamma Q^2$。因此，永久冲击成本具有严格的路径无关性；
3. 暂时冲击成本：一次性市价单的瞬间执行速度 $v \approx Q / \Delta t$ 趋于无穷大，瞬时吃穿多档订单簿深度的暂时冲击为 $\eta \frac{Q^2}{\Delta t} \to \infty$。即使考虑离散订单簿离散撮合，单笔市价单亦会瞬间扫清盘口流动性，承担极高的流动性惩罚溢价。

相比之下，TWAP 策略通过在 $[0, T]$ 整个时段内均匀分散流动性需求，使凸函数形式的二次暂时冲击能量积分 $\int_0^T \eta v(t)^2 \, \mathrm d t$ 达到全局极小值 $\frac{\eta Q^2}{T}$，从而大幅降低了瞬时流动性挤兑风险。

常见错误做法剖析：常见错误是误以为 TWAP 能够降低永久冲击成本。数学推导表明，在线性冲击假定下，永久冲击项 $\frac{1}{2} \gamma Q^2$ 仅由最终净建仓量 $Q$ 决定，与分散程度完全无关。另一常见错误是在对永久冲击积分时遗漏了时间线性递增带来的积分系数 $1/2$。

## 9. 

本题考查连续时间 Almgren--Chriss 最优执行框架下泛函极值变分推导。

**证明**

设剩余未执行头寸过程为 $x(t)$，且在时限内严格满足端点边界条件：
$$x(0) = Q, \quad x(T) = 0$$
执行速度为 $v(t) = -\dot{x}(t)$。在时段 $[0, T]$ 内，投资者的目标泛函为极小化暂时流动性冲击惩罚与标的波动暴露方差惩罚之和：
$$\min_{x(\cdot)} J[x] = \int_0^T L(t, x(t), \dot{x}(t)) \, \mathrm d t = \int_0^T \left( \eta \dot{x}(t)^2 + \lambda \sigma^2 x(t)^2 \right) \mathrm d t$$

拉格朗日被积函数为 $L(t, x, \dot{x}) = \eta \dot{x}^2 + \lambda \sigma^2 x^2$。计算对应的一阶偏导数：
$$\frac{\partial L}{\partial x} = 2 \lambda \sigma^2 x, \quad \frac{\partial L}{\partial \dot{x}} = 2 \eta \dot{x}$$

应用变分法中的 Euler--Lagrange 必要极值方程：
$$\frac{\partial L}{\partial x} - \frac{\mathrm d}{\mathrm d t} \left( \frac{\partial L}{\partial \dot{x}} \right) = 0$$
代入偏导数项：
$$2 \lambda \sigma^2 x(t) - \frac{\mathrm d}{\mathrm d t} (2 \eta \dot{x}(t)) = 0 \implies 2 \lambda \sigma^2 x(t) - 2 \eta \ddot{x}(t) = 0$$

两边同除以 $2 \eta$，得到二阶常系数线性常微分方程：
$$\ddot{x}(t) - \frac{\lambda \sigma^2}{\eta} x(t) = 0$$

引入特征衰减率参数 $\kappa = \sqrt{\frac{\lambda \sigma^2}{\eta}} > 0$。上述方程可重写为：
$$\ddot{x}(t) - \kappa^2 x(t) = 0$$

其通解可选取双曲函数基底表示为：
$$x(t) = A \cosh(\kappa(T - t)) + B \sinh(\kappa(T - t))$$
其中 $A, B$ 为待定常数。

利用终端边界条件 $x(T) = 0$：
$$x(T) = A \cosh(0) + B \sinh(0) = A \cdot 1 + B \cdot 0 = A = 0$$
从而 $A = 0$，解退化为纯双曲正弦形式：
$$x(t) = B \sinh(\kappa(T - t))$$

再代入初始时刻边界条件 $x(0) = Q$：
$$x(0) = B \sinh(\kappa T) = Q \implies B = \frac{Q}{\sinh(\kappa T)}$$

将常数 $B$ 代入通解，得到最优头寸路径 $x^*(t)$ 的唯一解析表达式：
$$x^*(t) = Q \frac{\sinh(\kappa(T - t))}{\sinh(\kappa T)}$$
其中 $\kappa = \sqrt{\frac{\lambda \sigma^2}{\eta}}$。

□

常见错误做法剖析：最常见的推导错误是 Euler--Lagrange 方程符号记错，将负号写为正号，导致特征方程变为 $\ddot{x} + \kappa^2 x = 0$，进而解出简谐振动的三角函数 $\sin(\kappa t)$ 与 $\cos(\kappa t)$，这违背了剩余持仓关于时间的单调凸衰减物理意义；另一错误是基底选择不便（如直接使用指数形式 $C_1 \mathrm e^{\kappa t} + C_2 \mathrm e^{-\kappa t}$），在联立解方程时代数变形复杂导致代数化简出错。

## 10. 

本题考查高斯扰动下绝对离差/VaR惩罚最优执行目标与经典均值—方差最优执行微分方程结构的一致性推导。

**证明**

在 Almgren--Chriss 框架下，连续买入执行过程的总成本由确定性冲击项与随机波动项构成：
$$C(x) = \int_0^T \eta \dot{x}(t)^2 \, \mathrm d t + \frac{1}{2} \gamma Q^2 + \sigma \int_0^T x(t) \, \mathrm d W_t$$
期望执行成本为：
$$\mathbb E[C] = \int_0^T \eta \dot{x}(t)^2 \, \mathrm d t + \frac{1}{2} \gamma Q^2$$

随机波动偏差项由 Itô 随机积分给出：
$$Z = C - \mathbb E[C] = \sigma \int_0^T x(t) \, \mathrm d W_t$$
根据 Itô 等距同构，该随机变量在正态增量假定下严格服从一维中心高斯分布：
$$Z \sim \mathcal N\left(0, \sigma^2 \int_0^T x(t)^2 \, \mathrm d t\right)$$

令未平仓时间方差积分泛函为 $I[x] = \int_0^T x(t)^2 \, \mathrm d t$。则 $Z = \sigma \sqrt{I[x]} \, \xi$，其中 $\xi \sim \mathcal N(0, 1)$ 为标准正态随机变量。计算绝对偏差期望值：
$$\mathbb E[|C - \mathbb E[C]|] = \mathbb E[|Z|] = \sigma \sqrt{I[x]} \cdot \mathbb E[|\xi|]$$
由一阶绝对矩公式，$\mathbb E[|\xi|] = 2 \int_0^\infty z \frac{1}{\sqrt{2\pi}} \mathrm e^{-z^2/2} \, \mathrm d z = \sqrt{\frac{2}{\pi}}$。因此目标泛函为：
$$J[x] = \int_0^T \eta \dot{x}(t)^2 \, \mathrm d t + \frac{1}{2} \gamma Q^2 + \lambda \sigma \sqrt{\frac{2}{\pi}} \sqrt{\int_0^T x(t)^2 \, \mathrm d t}$$

设最优路径为 $x^*(t)$，取满足端点扰动为零 $h(0) = h(T) = 0$ 的任意光滑变分函数 $h(t)$，考察一阶变分：
$$\left. \frac{\mathrm d}{\mathrm d \epsilon} J[x^* + \epsilon h] \right|_{\epsilon=0} = \int_0^T 2 \eta \dot{x}^*(t) \dot{h}(t) \, \mathrm d t + \frac{\lambda \sigma \sqrt{\frac{2}{\pi}}}{2 \sqrt{I[x^*]}} \int_0^T 2 x^*(t) h(t) \, \mathrm d t$$

对前项利用分部积分法化简：
$$\int_0^T \dot{x}^*(t) \dot{h}(t) \, \mathrm d t = \left[ \dot{x}^*(t) h(t) \right]_0^T - \int_0^T \ddot{x}^*(t) h(t) \, \mathrm d t = - \int_0^T \ddot{x}^*(t) h(t) \, \mathrm d t$$
合并两项并由变分法基本引理，一阶必要条件要求被积核处处为零：
$$-2 \eta \ddot{x}^*(t) + \frac{\lambda \sigma \sqrt{\frac{2}{\pi}}}{\sqrt{I[x^*]}} x^*(t) = 0$$

两边同除以 $2 \eta$，定义有效风险厌恶参数 $\lambda_{\mathrm{eff}} = \frac{\lambda \sqrt{2/\pi}}{2 \sigma \sqrt{I[x^*]}}$，以及常数 $\tilde\kappa = \sqrt{\frac{\lambda_{\mathrm{eff}} \sigma^2}{\eta}}$。上述方程变形为：
$$\ddot{x}^*(t) - \tilde\kappa^2 x^*(t) = 0$$

该二阶线性常微分方程与经典 Almgren--Chriss 均值—方差模型所得的 Euler--Lagrange 方程具有完全相同的代数结构与解空间形式（通解均由双曲正弦函数组成）。

□

常见错误做法剖析：最普遍的错误是认为绝对值函数不可导，因而在目标函数中试图套用次梯度方法；实际上，在期望算子作用下，高斯扰动的绝对偏差被平滑为 $L_2$ 范数 $\sqrt{\int x^2 \, \mathrm d t}$。另一个错误是在求泛函导数时漏掉了链式法则的分母平方根因子 $\frac{1}{2\sqrt{I[x]}}$。

## 11. 

本题考查经验平方根市场冲击定律下子单均匀分割最优性的严格凸性证明。

**证明**

设日内需要完成的总买入量为 $Q > 0$，日均成交量为 $V > 0$。交易员将其划分为 $N$ 笔连续执行的子单，各子单规模为 $q_k \ge 0$（$k = 1, \dots, N$），满足总量守恒约束：
$$\sum_{k=1}^N q_k = Q$$

第 $k$ 笔子单在成交时的瞬时市场参与率为 $\nu_k = \frac{q_k}{V}$。根据平方根冲击法则，第 $k$ 笔子单执行造成的暂时价格冲击为：
$$\Delta P_k = Y \sigma \sqrt{\nu_k} = Y \sigma \sqrt{\frac{q_k}{V}} = \frac{Y \sigma}{\sqrt{V}} q_k^{1/2}$$

第 $k$ 笔子单因暂时价格冲击而额外支付的现金金额为子单成交量与单价冲击之积：
$$C_k = q_k \Delta P_k = q_k \cdot \left( \frac{Y \sigma}{\sqrt{V}} q_k^{1/2} \right) = \frac{Y \sigma}{\sqrt{V}} q_k^{3/2}$$
因此，整个执行过程的总期望暂时冲击成本泛函为：
$$C_{\mathrm{total}}(q_1, \ldots, q_N) = \sum_{k=1}^N C_k = \frac{Y \sigma}{\sqrt{V}} \sum_{k=1}^N q_k^{3/2}$$

定义单变量标量函数 $f(x) = x^{3/2}$，定义域为 $x \in [0, \infty)$。对其求一阶与二阶导数：
$$f'(x) = \frac{3}{2} x^{1/2}, \quad f''(x) = \frac{3}{4} x^{-1/2}$$
对任意 $x > 0$，由于 $f''(x) > 0$，函数 $f(x)$ 在 $[0, \infty)$ 上严格凸。

由严格凸函数的离散 Jensen 不等式：
$$\frac{1}{N} \sum_{k=1}^N f(q_k) \ge f\left( \frac{1}{N} \sum_{k=1}^N q_k \right) = f\left(\frac{Q}{N}\right)$$
等号成立当且仅当所有自变量完全相等：
$$q_1 = q_2 = \cdots = q_N = \frac{Q}{N}$$

两边同乘正系数 $\frac{N Y \sigma}{\sqrt{V}}$，即得：
$$C_{\mathrm{total}}(q_1, \ldots, q_N) \ge \frac{Y \sigma}{\sqrt{V}} N \left(\frac{Q}{N}\right)^{3/2} = \frac{Y \sigma Q^{3/2}}{\sqrt{N V}}$$
等号当且仅当 $q_k = \frac{Q}{N}$（$\forall k$）时取得。

因此，在平方根冲击定律下，将订单完全均等划分为大小相等的子单是最小化总期望暂时冲击金额的唯一最优解。

□

常见错误做法剖析：极易混淆的错误是误将单位价格冲击 $\Delta P_k \propto q_k^{1/2}$ 当作目标函数来极小化。因为单价冲击函数是严格凹的，若以 $\sum q_k^{1/2}$ 为目标，Jensen 不等式反向成立，会推导出“单笔集中全仓执行最优”的荒谬结论；实际上，总冲击成本是单价冲击乘以成交数量 $q_k \Delta P_k \propto q_k^{3/2}$，幂次由 $1/2$ 提升至 $3/2$，使成本函数转化为严格超线性凸函数，从而保证了均匀分割的最优性。

## 12. 

本题考查摩擦成本下多期几何复合财富演化方程的递推推导，以及年化几何平均收益关于资产换手率的一阶敏感度分析。

**推导与解析**

第一部分：多期几何净复合财富递推式推导。
设策略在期初时刻 $t-1$ 的账户总资产净值为 $V_{t-1}$。在时段 $t$ 内，策略资产换手率为 $\tau_t$。若单边平均综合交易费用率（含佣金、印花税及冲击折让）为 $c > 0$，则一次完整的调仓调配涉及买入与卖出的双边周转，单期发生的交易摩擦总费用占资产净值的比例为 $2 c \tau_t$。

因此，期末资产毛增值扣减摩擦支出后的实际净资产变化为：
$$V_t = V_{t-1} + V_{t-1} R_t - V_{t-1} (2 c \tau_t) = V_{t-1} (1 + R_t - 2 c \tau_t)$$
单期净收益率为 $R_{t, \mathrm{net}} = R_t - 2 c \tau_t$。由数学归纳法，连续运行 $T$ 期后的期末财富演化式为：
$$V_T = V_0 \prod_{t=1}^T (1 + R_t - 2 c \tau_t)$$

第二部分：年化几何净收益率关于平均换手率的敏感度推导。
设每年包含 $M$ 个离散交易期（日频交易时 $M = 252$）。总期间年化几何平均净收益率 $g_{\mathrm{net}}$ 满足：
$$(1 + g_{\mathrm{net}})^{T/M} = \frac{V_T}{V_0} = \prod_{t=1}^T (1 + R_t - 2 c \tau_t)$$
对两端取自然对数：
$$\frac{T}{M} \ln(1 + g_{\mathrm{net}}) = \sum_{t=1}^T \ln(1 + R_t - 2 c \tau_t)$$

在实际量化交易中，单期收益率与单期费用满足 $|R_t - 2 c \tau_t| \ll 1$。利用一阶 Taylor 对数展开 $\ln(1 + x) = x + \mathcal O(x^2)$：
$$\ln(1 + R_t - 2 c \tau_t) = R_t - 2 c \tau_t + \mathcal O((R_t - 2 c \tau_t)^2)$$
求和得到：
$$\sum_{t=1}^T \ln(1 + R_t - 2 c \tau_t) \approx \sum_{t=1}^T R_t - 2 c \sum_{t=1}^T \tau_t = T \bar R - 2 c T \bar\tau$$
其中 $\bar R = \frac{1}{T} \sum_{t=1}^T R_t$ 为单期平均毛收益率，$\bar\tau = \frac{1}{T} \sum_{t=1}^T \tau_t$ 为单期平均换手率。

同时，对左端作一阶展开 $\ln(1 + g_{\mathrm{net}}) \approx g_{\mathrm{net}}$，代入得到：
$$\frac{T}{M} g_{\mathrm{net}} \approx T \bar R - 2 c T \bar\tau \implies g_{\mathrm{net}} \approx M \bar R - 2 c M \bar\tau$$
记年化平均换手率为 $\tau_{\mathrm{ann}} = M \bar\tau$，年化毛收益率为 $R_{\mathrm{ann}} = M \bar R$。则：
$$g_{\mathrm{net}} \approx R_{\mathrm{ann}} - 2 c \tau_{\mathrm{ann}}$$

对年化平均换手率 $\tau_{\mathrm{ann}}$ 求一阶偏导数，得到定量衰减敏感度：
$$\frac{\partial g_{\mathrm{net}}}{\partial \tau_{\mathrm{ann}}} = -2 c$$
即年化双边换手率每增加 $100\%$，年化几何净复合收益率将刚性衰减 $2 c$（等于双倍的单边综合费率）。

常见错误做法剖析：最常见的错误是在算术收益与几何复合收益之间混用，错误地认为几何复利的衰减系数会随着期数 $T$ 发生非线性倍增；事实上，在一阶对数近似下，几何复利损失率对平均换手率的边际敏感度严格保持为常数 $-2c$。另一错误是漏算买卖双边的“双倍”特征，误写为 $-c$。

## 13. 

本题考查非线性幂律规模衰减模型下最优资产管理规模与容量极限的解析推导。

**证明**

策略的单期毛超额收益率随管理规模 $A$ 满足幂律衰减规律：
$$\alpha(A) = \alpha_0 - \kappa A^\gamma \quad (\alpha_0 > 0, \kappa > 0, \gamma > 0)$$
总净超额收益金额（绝对 Alpha 利润）为：
$$\Pi(A) = A \alpha(A) = \alpha_0 A - \kappa A^{1+\gamma}$$

第一部分：求总利润最大化时的最优管理规模 $A^*$。
对规模 $A > 0$ 求一阶导数：
$$\frac{\mathrm d \Pi}{\mathrm d A} = \alpha_0 - \kappa (1 + \gamma) A^\gamma$$
令一阶导数等于零，解得一阶驻点：
$$\alpha_0 - \kappa (1 + \gamma) A^{*\gamma} = 0 \implies A^{*\gamma} = \frac{\alpha_0}{\kappa (1 + \gamma)}$$
由于 $\gamma > 0$，解得唯一正实根：
$$A^* = \left( \frac{\alpha_0}{\kappa (1 + \gamma)} \right)^{\frac{1}{\gamma}}$$

检查二阶充分性条件：
$$\frac{\mathrm d^2 \Pi}{\mathrm d A^2} = -\kappa \gamma (1 + \gamma) A^{\gamma - 1} < 0 \quad (\forall A > 0)$$
二阶导数恒严格为负，目标函数 $\Pi(A)$ 为严格凹函数，故 $A^*$ 为全局唯一极大值点。

第二部分：求策略超额收益归零时的盈亏平衡规模 $A_{\max}$。
当管理规模扩张至边际超额收益率耗尽、策略收益退化至与基准持平（$\alpha(A) = 0$）时，达到容量极限：
$$\alpha(A_{\max}) = 0 \implies \alpha_0 - \kappa A_{\max}^\gamma = 0 \implies A_{\max}^\gamma = \frac{\alpha_0}{\kappa}$$
解得盈亏平衡容量：
$$A_{\max} = \left( \frac{\alpha_0}{\kappa} \right)^{\frac{1}{\gamma}}$$

第三部分：推导比例关系。
计算最优管理规模 $A^*$ 与最大盈亏平衡规模 $A_{\max}$ 之比：
$$\frac{A^*}{A_{\max}} = \frac{\left( \frac{\alpha_0}{\kappa (1 + \gamma)} \right)^{\frac{1}{\gamma}}}{\left( \frac{\alpha_0}{\kappa} \right)^{\frac{1}{\gamma}}} = \left( \frac{1}{1 + \gamma} \right)^{\frac{1}{\gamma}} = (1 + \gamma)^{-\frac{1}{\gamma}}$$
因此，二者严格满足代数比例关系：
$$\frac{A^*}{A_{\max}} = (1 + \gamma)^{-\frac{1}{\gamma}}$$

□

常见错误做法剖析：常见错误是将超额利润极大化规模 $A^*$ 与超额收益率归零规模 $A_{\max}$ 混同；基金管理人在实践中若盲目扩张规模至 $A_{\max}$，虽然资产管理费可能增加，但为投资者创造的超额 Alpha 净金额已在 $A^*$ 之后发生严重的边际负收益侵蚀。此外，在对 $A^{1+\gamma}$ 求导时容易漏掉系数中的加一因子 $(1+\gamma)$。

## 14. 

本题考查带有行业中性与仓位边界约束的二次换手惩罚投资组合优化的对偶推导及凹性证明。

**证明**

设组合预期超额收益向量为 $\boldsymbol \alpha \in \mathbb R^n$，风险协方差矩阵为对称正定阵 $\boldsymbol \Sigma \in \mathbb R^{n \times n}$，基准或期初持仓为 $\boldsymbol w_0 \in \mathbb R^n$。换手惩罚矩阵为对称正定阵 $\boldsymbol \Lambda \in \mathbb R^{n \times n}$。行业暴露暴露矩阵为 $\boldsymbol B \in \mathbb R^{n \times K}$，上下界为 $\boldsymbol l, \boldsymbol u \in \mathbb R^n$（$\boldsymbol l \le \boldsymbol u$）。

原凸优化问题表述为：
$$\min_{\boldsymbol w} \left\{ -\boldsymbol \alpha^\top \boldsymbol w + \frac{1}{2} \boldsymbol w^\top \boldsymbol \Sigma \boldsymbol w + \frac{1}{2} (\boldsymbol w - \boldsymbol w_0)^\top \boldsymbol \Lambda (\boldsymbol w - \boldsymbol w_0) \right\}$$
$$\text{s.t.} \quad \boldsymbol B^\top \boldsymbol w = \boldsymbol 0, \quad \boldsymbol w - \boldsymbol u \le \boldsymbol 0, \quad \boldsymbol l - \boldsymbol w \le \boldsymbol 0$$

合并二次项与一次项：
$$\boldsymbol H = \boldsymbol \Sigma + \boldsymbol \Lambda, \quad \boldsymbol c = \boldsymbol \alpha + \boldsymbol \Lambda \boldsymbol w_0$$
由于 $\boldsymbol \Sigma \succ 0$ 且 $\boldsymbol \Lambda \succ 0$，总 Hessian 矩阵 $\boldsymbol H$ 严格对称正定。原目标函数等价表示为：
$$f(\boldsymbol w) = \frac{1}{2} \boldsymbol w^\top \boldsymbol H \boldsymbol w - \boldsymbol c^\top \boldsymbol w + \frac{1}{2} \boldsymbol w_0^\top \boldsymbol \Lambda \boldsymbol w_0$$

引入对偶乘子向量：行业中性等式约束乘子 $\boldsymbol \nu \in \mathbb R^K$，上界不等式乘子 $\boldsymbol \mu_u \ge \boldsymbol 0$，下界不等式乘子 $\boldsymbol \mu_l \ge \boldsymbol 0$。构造拉格朗日函数：
$$L(\boldsymbol w, \boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = \frac{1}{2} \boldsymbol w^\top \boldsymbol H \boldsymbol w - \boldsymbol c^\top \boldsymbol w + \boldsymbol \nu^\top \boldsymbol B^\top \boldsymbol w + \boldsymbol \mu_u^\top (\boldsymbol w - \boldsymbol u) + \boldsymbol \mu_l^\top (\boldsymbol l - \boldsymbol w) + \frac{1}{2} \boldsymbol w_0^\top \boldsymbol \Lambda \boldsymbol w_0$$
整理同类项：
$$L(\boldsymbol w, \boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = \frac{1}{2} \boldsymbol w^\top \boldsymbol H \boldsymbol w - (\boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l)^\top \boldsymbol w - \boldsymbol u^\top \boldsymbol \mu_u + \boldsymbol l^\top \boldsymbol \mu_l + \frac{1}{2} \boldsymbol w_0^\top \boldsymbol \Lambda \boldsymbol w_0$$

求拉格朗日对偶函数 $g(\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = \inf_{\boldsymbol w \in \mathbb R^n} L(\boldsymbol w, \boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l)$。由 $\boldsymbol H \succ 0$，关于 $\boldsymbol w$ 的无约束二次极小值在梯度为零处取得：
$$\nabla_{\boldsymbol w} L = \boldsymbol H \boldsymbol w - (\boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l) = \boldsymbol 0$$
解得唯一最优原始解映射：
$$\boldsymbol w^*(\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = \boldsymbol H^{-1} (\boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l)$$

代回拉格朗日函数，得到对偶目标函数：
$$g(\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = -\frac{1}{2} (\boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l)^\top \boldsymbol H^{-1} (\boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l) - \boldsymbol u^\top \boldsymbol \mu_u + \boldsymbol l^\top \boldsymbol \mu_l + \frac{1}{2} \boldsymbol w_0^\top \boldsymbol \Lambda \boldsymbol w_0$$
对应的拉格朗日对偶问题为：
$$\max_{\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l} g(\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) \quad \text{s.t.} \quad \boldsymbol \mu_u \ge \boldsymbol 0, \quad \boldsymbol \mu_l \ge \boldsymbol 0$$

最后证明对偶目标函数 $g$ 的严格凹性。定义复合仿射映射：
$$\boldsymbol y(\boldsymbol \nu, \boldsymbol \mu_u, \boldsymbol \mu_l) = \boldsymbol c - \boldsymbol B \boldsymbol \nu - \boldsymbol \mu_u + \boldsymbol \mu_l$$
由于 $\boldsymbol H \succ 0$，其逆矩阵 $\boldsymbol H^{-1}$ 亦为严格对称正定阵。二次型函数 $\phi(\boldsymbol y) = -\frac{1}{2} \boldsymbol y^\top \boldsymbol H^{-1} \boldsymbol y$ 的 Hessian 矩阵为 $-\boldsymbol H^{-1} \prec 0$，因而在 $\boldsymbol y \in \mathbb R^n$ 上全局严格凹。加上关于乘子的线性项 $-\boldsymbol u^\top \boldsymbol \mu_u + \boldsymbol l^\top \boldsymbol \mu_l$，保持了凹性。因此对偶目标函数具有全局严格凹性，对偶极大值点唯一且与原问题强对偶性成立。

□

常见错误做法剖析：常见错误是将不等式乘子的符号约定弄混，导致对偶约束条件中漏掉非负约束 $\boldsymbol \mu \ge \boldsymbol 0$；此外，在化简对偶目标时遗漏上下界常数项 $-\boldsymbol u^\top \boldsymbol \mu_u + \boldsymbol l^\top \boldsymbol \mu_l$ 或对 $\boldsymbol H$ 正定性未作严格说明。

## 15. 

本题考查固定交易摩擦与连续跟踪误差权衡下的最优动态调仓周期的变分推导。

**解析与推导**

设组合跟踪误差方差以速率 $\sigma_\Delta^2$ 随未调仓时长线性发散。投资人对跟踪误差方差的惩罚系数为 $\lambda > 0$。在两次调仓之间的时间微元 $[s, s + \mathrm d s]$ 内，累积的方差惩罚流为 $\lambda \sigma_\Delta^2 s \, \mathrm d s$。每次静态调仓需支付固定交易成本 $C_0 > 0$。市场贴现率为常数 $r > 0$。

设固定的调仓时间间隔为 $\Delta t > 0$，离散调仓时点为 $t_k = k \Delta t$（$k = 1, 2, \ldots$）。考察单调仓周期 $[0, \Delta t]$ 内贴现到期初的综合成本现值：
$$J_{\mathrm{period}}(\Delta t) = \int_0^{\Delta t} \lambda \sigma_\Delta^2 s \mathrm e^{-r s} \, \mathrm d s + C_0 \mathrm e^{-r \Delta t}$$

在无穷期连续滚动下，由于每个周期的状态在调仓后完全重置，总贴现成本泛函为各周期折现的等比级数求和：
$$J_{\mathrm{total}}(\Delta t) = \sum_{k=0}^\infty \mathrm e^{-r k \Delta t} J_{\mathrm{period}}(\Delta t) = \frac{J_{\mathrm{period}}(\Delta t)}{1 - \mathrm e^{-r \Delta t}} = \frac{\int_0^{\Delta t} \lambda \sigma_\Delta^2 s \mathrm e^{-r s} \, \mathrm d s + C_0 \mathrm e^{-r \Delta t}}{1 - \mathrm e^{-r \Delta t}}$$

在实际量化调仓中，贴现率在调仓周期内的衰减极小，满足 $r \Delta t \ll 1$。对指数项作 Taylor 级数展开：
$$\mathrm e^{-r s} = 1 - r s + \mathcal O(s^2), \quad \mathrm e^{-r \Delta t} = 1 - r \Delta t + \mathcal O(\Delta t^2)$$
分母的一阶近似为：
$$1 - \mathrm e^{-r \Delta t} = r \Delta t - \frac{1}{2} r^2 \Delta t^2 + \mathcal O(\Delta t^3) \approx r \Delta t$$
分子被积项与固定成本的一阶近似为：
$$\int_0^{\Delta t} \lambda \sigma_\Delta^2 s (1 - r s) \, \mathrm d s = \frac{1}{2} \lambda \sigma_\Delta^2 \Delta t^2 + \mathcal O(\Delta t^3)$$
$$C_0 \mathrm e^{-r \Delta t} = C_0 (1 - r \Delta t) + \mathcal O(\Delta t^2)$$

将各项代入总贴现成本泛函，提取常数项后，等价于极小化时间平均成本流函数：
$$r J_{\mathrm{total}}(\Delta t) \approx \frac{\frac{1}{2} \lambda \sigma_\Delta^2 \Delta t^2 + C_0}{\Delta t} = \frac{1}{2} \lambda \sigma_\Delta^2 \Delta t + \frac{C_0}{\Delta t}$$

对时间间隔 $\Delta t > 0$ 求一阶导数：
$$\frac{\mathrm d}{\mathrm d \Delta t} \left( \frac{1}{2} \lambda \sigma_\Delta^2 \Delta t + \frac{C_0}{\Delta t} \right) = \frac{1}{2} \lambda \sigma_\Delta^2 - \frac{C_0}{\Delta t^2}$$
令一阶导数等于零：
$$\frac{1}{2} \lambda \sigma_\Delta^2 - \frac{C_0}{(\Delta t^*)^2} = 0 \implies (\Delta t^*)^2 = \frac{2 C_0}{\lambda \sigma_\Delta^2}$$
解得最优静态调仓时间间隔的解析解：
$$\Delta t^* = \sqrt{\frac{2 C_0}{\lambda \sigma_\Delta^2}}$$

检查二阶导数：
$$\frac{\mathrm d^2}{\mathrm d \Delta t^2} \left( \frac{1}{2} \lambda \sigma_\Delta^2 \Delta t + \frac{C_0}{\Delta t} \right) = \frac{2 C_0}{\Delta t^3} > 0 \quad (\forall \Delta t > 0)$$
二阶导数恒大于零，证明该驻点为全局严格极小值。

常见错误做法剖析：最普遍的错误是在积分方差惩罚时漏掉了积分系数 $1/2$，错误地认为区间内的方差惩罚是 $\lambda \sigma_\Delta^2 \Delta t$，从而导致结果中缺少因子 $\sqrt{2}$；另一个错误是直接忽略贴现率级数求和结构，未能建立严格的无穷期折现目标泛函。

## 16. 

本题考查几何布朗运动下资产首达停时分布及穿仓破产概率的正态积分显式推导。

**证明**

设多空组合净资产过程满足随机微分方程：
$$\mathrm d A_t = \mu A_t \, \mathrm d t + \sigma A_t \, \mathrm d W_t, \quad A_0 > 0$$
应用 Itô 引理，对数净资产过程 $X_t = \ln\left(\frac{A_t}{A_0}\right)$ 满足：
$$\mathrm d X_t = \left(\mu - \frac{1}{2} \sigma^2\right) \, \mathrm d t + \sigma \, \mathrm d W_t, \quad X_0 = 0$$

穿仓停时定义为资产首次跌穿比例 $m \in (0, 1)$ 的时刻：
$$\tau = \inf\{t \ge 0 : A_t \le m A_0\} = \inf\left\{t \ge 0 : X_t \le \ln m\right\}$$
由于 $m \in (0, 1)$，有 $\ln m < 0$。令吸收障碍常数 $b = -\ln m > 0$。则穿仓条件等价于对偶漂移过程上穿正边界：
$$\tau = \inf\{t \ge 0 : -X_t \ge b\}$$

记过程 $Y_t = -X_t$。则 $Y_t$ 服从具有常漂移的高斯过程：
$$Y_t = \nu t + \sigma \tilde W_t, \quad \nu = -\left(\mu - \frac{1}{2} \sigma^2\right) = \frac{1}{2} \sigma^2 - \mu$$
其中 $\tilde W_t = -W_t$ 仍为标准布朗运动。在有限区间 $[0, T]$ 内穿仓发生事件等价于运行最大值跨越边界：
$$\mathbb P(\tau \le T) = \mathbb P\left( \sup_{0 \le t \le T} Y_t \ge b \right)$$

利用带漂移布朗运动极值分布的 Girsanov 测度变换与反射原理，对任意 $b > 0$：
$$\mathbb P\left( \sup_{0 \le t \le T} (\nu t + \sigma \tilde W_t) \ge b \right) = \Phi\left( \frac{-b + \nu T}{\sigma \sqrt{T}} \right) + \mathrm e^{\frac{2 \nu b}{\sigma^2}} \Phi\left( \frac{-b - \nu T}{\sigma \sqrt{T}} \right)$$
其中 $\Phi(\cdot)$ 为标准正态累积分布函数。

将参数 $b = -\ln m$ 与 $\nu = \frac{1}{2}\sigma^2 - \mu$ 代入指数项：
$$\frac{2 \nu b}{\sigma^2} = \frac{2 \left(\frac{1}{2}\sigma^2 - \mu\right) (-\ln m)}{\sigma^2} = \left(\frac{2\mu}{\sigma^2} - 1\right) \ln m$$
因此：
$$\mathrm e^{\frac{2 \nu b}{\sigma^2}} = \exp\left( \ln\left( m^{\frac{2\mu}{\sigma^2} - 1} \right) \right) = m^{\frac{2\mu}{\sigma^2} - 1}$$

代入正态累积分布函数的各参数项：
$$\frac{-b + \nu T}{\sigma \sqrt{T}} = \frac{\ln m + \left(\frac{1}{2}\sigma^2 - \mu\right) T}{\sigma \sqrt{T}} = \frac{\ln m - \left(\mu - \frac{1}{2}\sigma^2\right) T}{\sigma \sqrt{T}}$$
$$\frac{-b - \nu T}{\sigma \sqrt{T}} = \frac{\ln m - \left(\frac{1}{2}\sigma^2 - \mu\right) T}{\sigma \sqrt{T}} = \frac{\ln m + \left(\mu - \frac{1}{2}\sigma^2\right) T}{\sigma \sqrt{T}}$$

定义无量纲变量：
$$d_1 = \frac{\ln m - \left(\mu - \frac{1}{2}\sigma^2\right) T}{\sigma \sqrt{T}}, \quad d_2 = \frac{\ln m + \left(\mu - \frac{1}{2}\sigma^2\right) T}{\sigma \sqrt{T}}$$
由此得到穿仓概率在有限区间 $[0, T]$ 内的正态积分精确显式解：
$$\mathbb P(\tau \le T) = \Phi(d_1) + m^{\frac{2\mu}{\sigma^2} - 1} \Phi(d_2)$$

□

常见错误做法剖析：最普遍的错误是忽略 Itô 引理引入的 Jensen 漂移修正项 $-\frac{1}{2}\sigma^2$，直接使用 $\mu t$ 替代对数价格漂移；另一错误是直接套用无漂移的标准布朗运动反射原理（得出形如 $2\Phi(\cdot)$ 的结果），漏掉了指数加权项 $m^{\frac{2\mu}{\sigma^2}-1} \Phi(d_2)$，这在资产存在长期正漂移时会对穿仓概率产生大幅高估。

## 17. 

本题考查多重假设检验下极值统计量分布展开，以及数据挖掘过拟合对夏普比率显著性的定量侵蚀推导。

**推导与论证**

第一部分：极大样本夏普比率的极值理论推导。
在零假设 $H_0$ 下，所有候选信号的真实 Alpha 均为零。第 $k$ 个信号在 $T = 756$ 个交易日上的日频收益率服从独立中心正态分布。由大样本性质，各信号的日频样本夏普比率满足：
$$Z_k = \sqrt{T} \widehat{\mathrm{SR}}_k \sim \text{i.i.d. } \mathcal N(0, 1), \quad k = 1, \ldots, K$$
其中信号间彼此正交保证了随机变量 $Z_1, \ldots, Z_K$ 的相互独立性。

考察 $K$ 个独立标准高斯随机变量的样本极大值 $M_K = \max_{1 \le k \le K} Z_k$。根据极值理论（Fisher--Tippett--Gnedenko 定理），标准正态分布的极大值属于 Gumbel 吸引域，其极值正规化常数序列满足：
$$a_K = \sqrt{2 \ln K} - \frac{\ln(\ln K) + \ln(4\pi)}{2 \sqrt{2 \ln K}}, \quad b_K = \frac{1}{\sqrt{2 \ln K}}$$
极值分布极限为：
$$\frac{M_K - a_K}{b_K} \xrightarrow{\mathrm d} \Lambda, \quad \mathbb P(\Lambda \le z) = \exp(-\mathrm e^{-z})$$
由 Gumbel 分布的期望性质，$\mathbb E[\Lambda] = \gamma_{\mathrm{Euler}} \approx 0.5772$。因此 $M_K$ 的渐近期望值为：
$$\mathbb E[M_K] = a_K + b_K \gamma_{\mathrm{Euler}} + o\left(\frac{1}{\sqrt{\ln K}}\right) = \sqrt{2 \ln K} + \frac{\gamma_{\mathrm{Euler}} - \frac{1}{2}(\ln(\ln K) + \ln(4\pi))}{\sqrt{2 \ln K}} + o(1)$$

第二部分：代入参数定量计算。
已知候选信号数量 $K = 5000$。计算对数项：
$$\ln(5000) \approx 8.5172, \quad \sqrt{2 \ln K} = \sqrt{17.0344} \approx 4.1273$$
$$\ln(\ln K) \approx \ln(8.5172) \approx 2.1421, \quad \ln(4\pi) \approx 2.5310$$
$$\frac{1}{2} (\ln(\ln K) + \ln(4\pi)) \approx \frac{2.1421 + 2.5310}{2} = 2.3366$$
代入期望渐近展开式：
$$\mathbb E[M_K] \approx 4.1273 + \frac{0.5772 - 2.3366}{4.1273} = 4.1273 - 0.4263 \approx 3.7010$$

日频最大样本夏普比率的期望值为：
$$\mathbb E\left[\max_{1 \le k \le K} \widehat{\mathrm{SR}}_k\right] = \frac{\mathbb E[M_K]}{\sqrt{T}} = \frac{3.7010}{\sqrt{756}} \approx \frac{3.7010}{27.4955} \approx 0.1346$$

第三部分：年化折算与显著性失效论证。
按每年 252 个交易日常规年化，样本年化夏普比率因子为 $\sqrt{252}$。由于 $T = 756 = 3 \times 252$，年化折算因子为：
$$\frac{\sqrt{252}}{\sqrt{T}} = \frac{\sqrt{252}}{\sqrt{3 \times 252}} = \frac{1}{\sqrt{3}} \approx 0.5774$$
纯噪声驱动下挖掘出的最大年化样本夏普比率期望值为：
$$\mathbb E\left[\widehat{\mathrm{SR}}_{\max, \mathrm{ann}}\right] = \frac{1}{\sqrt{3}} \mathbb E[M_K] \approx 0.5774 \times 3.7010 \approx 2.137$$

论证结论：在 5000 次独立尝试中，即使所有信号全部由纯高斯白噪声生成，仅凭数据挖掘的抽样极值，研究员期望能挖掘出的最高年化夏普比率高达约 $2.14$。回测中观察到的年化夏普比率 $1.8$ 甚至显著低于纯随机噪声极大值的数学期望值（$1.8 < 2.14$），其在极值零分布下的单侧显著性 $p$ 值接近 $0.8$。因此，在没有引入 Bonferroni、Benjamini--Hochberg 或 Deflated Sharpe Ratio 等多重检验截断控制的情形下，声称该年化 1.8 的策略具备统计显著性完全是数据窥探（Data Snooping）导致的虚假发现。

常见错误做法剖析：业界常见严重错误是使用单次检验的临界值（例如单次 $t$ 检验临界值 $1.96$，对应年化夏普约 $\frac{1.96}{\sqrt{3}} \approx 1.13$）去评估多重挖掘后的最优策略。当测试 $K = 5000$ 个因子时，假阳性发生概率几乎为 $100\%$。另一错误是在计算年化折算时未对样本总长度 $T$ 与年化因子 $\sqrt{252}$ 作平方根比例匹配。

## 18. 

本题考查多重假设检验中 Benjamini--Hochberg (BH) 算法控制伪发现率（False Discovery Rate, FDR）的严格鞅论与全概率推导。

**证明**

设共有 $K$ 个待检验的原假设 $H_1, \ldots, H_K$。记真实为真的零假设集合为 $I_0 \subset \{1, \ldots, K\}$，基数为 $|I_0| = K_0$。对任意 $i \in I_0$，单侧检验 $p$ 值 $P_i$ 独立同分布于标准均匀分布 $\mathcal U(0, 1)$，且与备择假设检验统计量相互独立。

将全部 $K$ 个 $p$ 值从小到大排序为 $P_{(1)} \le P_{(2)} \le \cdots \le P_{(K)}$。给定目标控制水平 $q^* \in (0, 1)$，BH 算法定义截断阶数为：
$$k^* = \max\left\{ k \in \{1, \ldots, K\} : P_{(k)} \le \frac{k}{K} q^* \right\}$$
若上述集合为空，则令 $k^* = 0$ 且不拒绝任何假设；若 $k^* \ge 1$，则拒绝前 $k^*$ 个假设。总拒绝数为 $R = k^*$。

记全部被拒绝的原假设索引集合为 $\mathcal R = \{j : P_j \le \frac{R}{K} q^*\}$，其中误拒的真零假设数量为 $V = \sum_{i \in I_0} \mathbb I_{\{i \in \mathcal R\}}$。伪发现率定义为：
$$\mathrm{FDR} = \mathbb E\left[ \frac{V}{\max(R, 1)} \right] = \mathbb E\left[ \frac{\sum_{i \in I_0} \mathbb I_{\{i \in \mathcal R\}}}{R} \mathbb I_{\{R > 0\}} \right] = \sum_{i \in I_0} \mathbb E\left[ \frac{\mathbb I_{\{i \in \mathcal R, R > 0\}}}{R} \right]$$

固定任意一个真实的真零假设 $i \in I_0$。记其余 $K-1$ 个检验 $p$ 值的实现向量为 $\boldsymbol P_{-i} = (P_j)_{j \neq i}$。根据假定，$P_i$ 与 $\boldsymbol P_{-i}$ 相互独立。

根据 BH 算法机制，总拒绝数 $R = R(P_i, \boldsymbol P_{-i})$ 是关于 $P_i$ 的单调非增阶梯函数。令 $u \in [0, 1]$ 代表 $P_i$ 的取值。假设 $P_i = 0$，此时前置给定量下能够取得的最大可能拒绝数记为 $k_{\max} = R(0, \boldsymbol P_{-i})$。根据 BH 判别准则，第 $i$ 个假设被拒绝（即 $i \in \mathcal R$）当且仅当：
$$P_i \le \frac{R(P_i, \boldsymbol P_{-i})}{K} q^*$$
这等价于 $P_i$ 落在连续区间 $\left[ 0, \frac{k_{\max}}{K} q^* \right]$ 内部。当且仅当 $u \in \left[ 0, \frac{k_{\max}}{K} q^* \right]$ 时，总拒绝数恒稳定维持为常数 $R(u, \boldsymbol P_{-i}) = k_{\max}$。

利用全期望公式，在给定 $\boldsymbol P_{-i}$ 的条件下对均匀分布的 $P_i$ 求条件期望：
$$\mathbb E\left[ \left. \frac{\mathbb I_{\{i \in \mathcal R, R > 0\}}}{R} \;\right|\; \boldsymbol P_{-i} \right] = \int_0^1 \frac{\mathbb I_{\left\{ u \le \frac{R(u, \boldsymbol P_{-i})}{K} q^*, R(u, \boldsymbol P_{-i}) > 0 \right\}}}{R(u, \boldsymbol P_{-i})} \, \mathrm d u$$
代入积分区间与被积函数值：
$$\int_0^{\frac{k_{\max}}{K} q^*} \frac{1}{k_{\max}} \, \mathrm d u = \frac{1}{k_{\max}} \cdot \left( \frac{k_{\max}}{K} q^* \right) = \frac{q^*}{K}$$

注意上述积分值与条件变量 $\boldsymbol P_{-i}$ 的具体实现值完全无关，阶数 $k_{\max}$ 在分子与分母中精确对消。再次对 $\boldsymbol P_{-i}$ 取无条件数学期望：
$$\mathbb E\left[ \frac{\mathbb I_{\{i \in \mathcal R, R > 0\}}}{R} \right] = \frac{q^*}{K}$$

将每个真零假设的期望值对所有 $i \in I_0$ 求和：
$$\mathrm{FDR} = \sum_{i \in I_0} \frac{q^*}{K} = \frac{K_0}{K} q^*$$
由于真零假设数量满足 $K_0 \le K$，故有：
$$\mathrm{FDR} = \frac{K_0}{K} q^* \le q^*$$

□

常见错误做法剖析：常见错误是误将分母中的随机变量 $R$ 当作常数提出期望算子之外；由于 $R$ 与指示变量 $\mathbb I_{\{i \in \mathcal R\}}$ 强相关，直接分离期望是严重的数学谬误。必须采用对除 $P_i$ 以外统计量进行正交条件分解的积分对消技巧。

## 19. 

本题考查前视偏差（Lookahead Bias）导致策略虚假异常暴利的量化数学机理推导。

**证明**

设对数资产价格服从随机游走 $p_t = p_{t-1} + \epsilon_t$，单期价格变动为 $\Delta p_{t+1} = p_{t+1} - p_t = \epsilon_{t+1}$，其中 $\epsilon_{t+1} \sim \text{i.i.d. } \mathcal N(0, \sigma^2)$。策略在时刻 $t$ 违规引用未来价格设定仓位为 $w_t = \operatorname{sign}(p_{t+1} - p_t) = \operatorname{sign}(\epsilon_{t+1})$。

第一部分：推导单期期望收益率与方差。
单期策略实际实现的收益额为：
$$R_t = w_t (p_{t+1} - p_t) = \operatorname{sign}(\epsilon_{t+1}) \cdot \epsilon_{t+1} = |\epsilon_{t+1}|$$
由于 $\epsilon_{t+1}$ 服从零均值正态分布，$R_t$ 服从半正态分布（Half-Normal Distribution），其概率密度函数为：
$$f(r) = \frac{2}{\sqrt{2\pi} \sigma} \mathrm e^{-\frac{r^2}{2\sigma^2}}, \quad r \ge 0$$

计算单期期望收益率：
$$\mathbb E[R_t] = \int_0^\infty r \frac{2}{\sqrt{2\pi} \sigma} \mathrm e^{-\frac{r^2}{2\sigma^2}} \, \mathrm d r = \sigma \sqrt{\frac{2}{\pi}}$$

计算单期二阶原点矩：
$$\mathbb E[R_t^2] = \mathbb E[|\epsilon_{t+1}|^2] = \mathbb E[\epsilon_{t+1}^2] = \sigma^2$$

计算单期方差：
$$\operatorname{Var}(R_t) = \mathbb E[R_t^2] - (\mathbb E[R_t])^2 = \sigma^2 - \left(\sigma \sqrt{\frac{2}{\pi}}\right)^2 = \sigma^2 \left( 1 - \frac{2}{\pi} \right)$$

单期真实夏普比率为恒正无量纲常数：
$$\mathrm{SR}_{\mathrm{period}} = \frac{\mathbb E[R_t]}{\sqrt{\operatorname{Var}(R_t)}} = \frac{\sqrt{\frac{2}{\pi}}}{\sqrt{1 - \frac{2}{\pi}}} = \sqrt{\frac{2}{\pi - 2}} \approx 1.3236$$

第二部分：表观年化夏普比率的异常爆炸行为证明。
设回测历史样本包含 $T$ 个时步。表观累计收益率为：
$$\sum_{t=1}^T R_t = \sum_{t=1}^T |\epsilon_{t+1}|$$
由于单期收益 $R_t \ge 0$ 几乎必然成立，该策略的单期胜率理论上达到 $100\%$，样本全局最大回撤恒为零（$\mathrm{MDD} = 0$）。

在金融业界，若将该高频信号在年化维度上统计，年化因子为时钟频率倍数 $M$（例如日内高频切片或按周期累积）。当样本窗口长度 $T$ 增大时，样本均值 $\bar R$ 的估计标准误以 $1/\sqrt{T}$ 收缩：
$$\widehat{\mathrm{SE}}(\bar R) = \frac{s_R}{\sqrt{T}} \approx \frac{\sigma \sqrt{1 - 2/\pi}}{\sqrt{T}}$$
其对应的 $t$ 检验统计量为：
$$t_{\mathrm{stat}} = \frac{\bar R}{\widehat{\mathrm{SE}}(\bar R)} = \sqrt{T} \cdot \mathrm{SR}_{\mathrm{period}} = \sqrt{\frac{2}{\pi - 2}} \sqrt{T} \approx 1.3236 \sqrt{T}$$

当样本长度 $T \to \infty$ 时，$t_{\mathrm{stat}} \propto \sqrt{T} \to \infty$。更严重的是，若回测引擎将单期夏普按年化样本量直接折算：
$$\widehat{\mathrm{SR}}_{\mathrm{ann}} = \sqrt{T_{\mathrm{year}}} \cdot \mathrm{SR}_{\mathrm{period}} \propto \sqrt{T_{\mathrm{year}}}$$
随着采样时序精细化（$T \to \infty$），表观年化夏普比率突破 10、20 甚至更高，且累积财富曲线呈现出没有哪怕一次单期亏损的近乎光滑对数直线，这就是前视偏差导致的典型表观性能超现实爆炸。

□

常见错误做法剖析：常见错误是在计算 $w_t (p_{t+1} - p_t)$ 时误认为期望仍为零；因为 $w_t$ 引用了 $p_{t+1}$，使得仓位与价格增量强正相关（协方差非零），破坏了适应过程（Adapted Process）的基本鞅性质。另一个错误是忽略了绝对值变换后半正态分布的方差修正项 $-2/\pi$。

## 20. 

本题考查退市吸收壁下条件布朗桥分布推导，以及生存偏差（Survivorship Bias）正偏置解析表达式的严格求解。

**证明**

设标的资产对数价格过程服从算术布朗运动 $X_t = \ln(S_t / S_0) = \mu t + \sigma W_t$。退市阈值设为常数 $S_{\mathrm{def}} = S_0 \mathrm e^{-b}$（$b > 0$）。定义违约停时为对数价格首次下触障碍壁 $-b$ 的时刻：
$$\tau = \inf\{t \ge 0 : X_t \le -b\}$$
在时段 $[0, T]$ 内资产存续的条件定义为事件 $\mathcal S = \{\tau > T\} = \left\{ \inf_{0 \le t \le T} X_t > -b \right\}$。

根据布朗桥性质，在给定终端位置 $X_T = x$（其中 $x > -b$）的条件下，漂移项 $\mu$ 发生分离，桥过程的局部极值条件概率与无漂移布朗桥完全相同。利用布朗运动运行极小值分布，桥过程在区间内不跌破 $-b$ 的条件概率为：
$$\mathbb P(\tau > T \mid X_T = x) = 1 - \exp\left( -\frac{2 b (b + x)}{\sigma^2 T} \right)$$

由 Bayes 定理，条件概率密度函数为：
$$f_{X_T \mid \tau > T}(x) = \frac{\left[ 1 - \exp\left( -\frac{2 b (b + x)}{\sigma^2 T} \right) \right] \phi\left( \frac{x - \mu T}{\sigma \sqrt{T}} \right)}{\sigma \sqrt{T} \, \mathbb P(\tau > T)} \mathbb I_{\{x > -b\}}$$
其中 $\phi(z) = \frac{1}{\sqrt{2\pi}} \mathrm e^{-z^2/2}$ 为标准正态概率密度函数。

计算分子上的加权积分：
$$\mathbb E\left[ X_T \mathbb I_{\{\tau > T\}} \right] = \int_{-b}^\infty x \phi\left( \frac{x - \mu T}{\sigma \sqrt{T}} \right) \frac{\mathrm d x}{\sigma \sqrt{T}} - \int_{-b}^\infty x \exp\left( -\frac{2 b (b + x)}{\sigma^2 T} \right) \phi\left( \frac{x - \mu T}{\sigma \sqrt{T}} \right) \frac{\mathrm d x}{\sigma \sqrt{T}}$$

对第二项中的指数组合配方：
$$-\frac{2 b (b + x)}{\sigma^2 T} - \frac{(x - \mu T)^2}{2 \sigma^2 T} = -\frac{2\mu b}{\sigma^2} - \frac{(x + 2b - \mu T)^2}{2 \sigma^2 T}$$
引入截断正态一阶矩公式。定义无量纲归一化常数：
$$\alpha = \frac{\mu T + b}{\sigma \sqrt{T}}, \quad \beta = \frac{\mu T - b}{\sigma \sqrt{T}}$$
两项积分分别展开为：
$$\int_{-b}^\infty x \phi\left( \frac{x - \mu T}{\sigma \sqrt{T}} \right) \frac{\mathrm d x}{\sigma \sqrt{T}} = \mu T \Phi(\alpha) + \sigma \sqrt{T} \phi(\alpha)$$
$$\int_{-b}^\infty x \mathrm e^{-\frac{2\mu b}{\sigma^2}} \phi\left( \frac{x + 2b - \mu T}{\sigma \sqrt{T}} \right) \frac{\mathrm d x}{\sigma \sqrt{T}} = \mathrm e^{-\frac{2\mu b}{\sigma^2}} \left[ (\mu T - 2b) \Phi(\beta) + \sigma \sqrt{T} \phi(\beta) \right]$$

注意到恒等式关系：
$$\alpha^2 - \beta^2 = \frac{(\mu T + b)^2 - (\mu T - b)^2}{\sigma^2 T} = \frac{4\mu b}{\sigma^2} \implies \phi(\alpha) = \mathrm e^{-\frac{2\mu b}{\sigma^2}} \phi(\beta)$$
因此高斯密度项 $\sigma \sqrt{T} \phi(\alpha)$ 与 $\sigma \sqrt{T} \mathrm e^{-\frac{2\mu b}{\sigma^2}} \phi(\beta)$ 精确抵消为零。

存续概率分母满足：
$$\mathbb P(\tau > T) = \Phi(\alpha) - \mathrm e^{-\frac{2\mu b}{\sigma^2}} \Phi(\beta)$$
分子整理后得到条件期望值：
$$\mathbb E[X_T \mid \tau > T] = \mu T + \frac{2b \, \mathrm e^{-\frac{2\mu b}{\sigma^2}} \Phi(\beta)}{\Phi(\alpha) - \mathrm e^{-\frac{2\mu b}{\sigma^2}} \Phi(\beta)}$$

由于总体无偏期望单期收益率为 $\mu = \frac{\mathbb E[X_T]}{T}$，两边同除以时间 $T$ 并相减，即解得生存偏差正偏置差值的精确数学解析式：
$$\Delta \mu_{\mathrm{surv}} = \frac{1}{T} \left( \mathbb E[X_T \mid \tau > T] - \mu T \right) = \frac{2b}{T} \frac{\mathrm e^{-\frac{2\mu b}{\sigma^2}} \Phi\left( \frac{\mu T - b}{\sigma \sqrt{T}} \right)}{\Phi\left( \frac{\mu T + b}{\sigma \sqrt{T}} \right) - \mathrm e^{-\frac{2\mu b}{\sigma^2}} \Phi\left( \frac{\mu T - b}{\sigma \sqrt{T}} \right)}$$
由于 $b > 0$，上述偏置项严格恒正（$\Delta \mu_{\mathrm{surv}} > 0$）。

□

常见错误做法剖析：常见错误是认为存续过滤只是简单地将积分区间从 $(-\infty, \infty)$ 截断为 $[-b, \infty)$，直接套用一维单点截断正态分布；这种错误忽视了连续路径违约具有强路径依赖性（即使期末价格 $X_T > -b$，中间过程只要触碰过边界亦被剔除），必须结合条件布朗桥极值定律引入反射补偿项。

## 21. 

本题考查时间序列平稳块自举法长记忆方差估计量的偏差—方差权衡及最优自举块长阶数推导。

**证明**

设收益率序列满足平稳一阶自回归过程 $X_t = \rho X_{t-1} + \epsilon_t$，其中自相关系数 $\rho \in (-1, 1)$，白噪声方差为 $\sigma_\epsilon^2$。自协方差函数满足：
$$\gamma(k) = \operatorname{Cov}(X_t, X_{t+k}) = \frac{\sigma_\epsilon^2}{1 - \rho^2} \rho^{|k|}, \quad k \in \mathbb Z$$
其总体长记忆方差（谱密度在零频率处的 $2\pi$ 倍）定义为自协方差全级数：
$$\sigma_\infty^2 = \sum_{k=-\infty}^\infty \gamma(k) = \gamma(0) + 2 \sum_{k=1}^\infty \gamma(k) = \frac{\sigma_\epsilon^2}{1 - \rho^2} \frac{1 + \rho}{1 - \rho}$$

设平稳块自举法的平均随机块长为 $b_T$（块长服从均值为 $b_T$ 的几何分布）。自举样本均值方差估计量 $\hat\sigma_{b_T}^2$ 对应于平滑核函数加权的谱估计量：
$$\hat\sigma_{b_T}^2 = \sum_{|k| < T} \omega\left( \frac{k}{b_T} \right) \hat\gamma(k)$$
其中核权重函数具有三角/指数衰减形式，在零点附近满足一阶展开：
$$1 - \omega\left( \frac{k}{b_T} \right) = \frac{|k|}{b_T} + \mathcal O\left( \frac{k^2}{b_T^2} \right)$$

第一部分：推导渐近偏差阶数。
对估计量取数学期望，利用样本协方差的无偏性：
$$\mathbb E[\hat\sigma_{b_T}^2] = \sum_{|k| < T} \omega\left( \frac{k}{b_T} \right) \gamma(k) + \mathcal O\left(\frac{1}{T}\right)$$
渐近偏差为：
$$\operatorname{Bias}(\hat\sigma_{b_T}^2) = \mathbb E[\hat\sigma_{b_T}^2] - \sigma_\infty^2 = -\sum_{k=-\infty}^\infty \left[ 1 - \omega\left( \frac{k}{b_T} \right) \right] \gamma(k) + o\left(\frac{1}{b_T}\right)$$
代入核函数展开式：
$$\operatorname{Bias}(\hat\sigma_{b_T}^2) \approx -\frac{1}{b_T} \sum_{k=-\infty}^\infty |k| \gamma(k) = -\frac{2}{b_T} \sum_{k=1}^\infty k \gamma(0) \rho^k$$
由于级数 $\sum_{k=1}^\infty k \rho^k = \frac{\rho}{(1-\rho)^2} < \infty$ 绝对收敛，故偏差阶数满足：
$$\operatorname{Bias}(\hat\sigma_{b_T}^2) = \mathcal O\left( \frac{1}{b_T} \right)$$

第二部分：推导估计量方差阶数。
根据平稳过程双线性型谱方差渐近定理，自举谱核估计量的抽样方差满足：
$$\operatorname{Var}(\hat\sigma_{b_T}^2) = \frac{1}{T} \sigma_\infty^4 \int_{-\infty}^\infty \omega^2(u) \, \mathrm d u \cdot b_T + o\left( \frac{b_T}{T} \right)$$
核函数的平方积分值为与 $T$ 无关的有限正标量常数。因此，抽样方差阶数严格满足：
$$\operatorname{Var}(\hat\sigma_{b_T}^2) = \mathcal O\left( \frac{b_T}{T} \right)$$

第三部分：推导最优自举块长阶数。
自举方差估计量的均方误差（Mean Squared Error, MSE）定义为偏差平方与方差之和：
$$\mathrm{MSE}(b_T) = \operatorname{Bias}^2(\hat\sigma_{b_T}^2) + \operatorname{Var}(\hat\sigma_{b_T}^2) = C_1 \left( \frac{1}{b_T} \right)^2 + C_2 \left( \frac{b_T}{T} \right)$$
其中 $C_1 > 0, C_2 > 0$ 为与样本容量 $T$ 无关的模型结构常数。

对平均块长 $b_T$ 求导令其等于零：
$$\frac{\mathrm d \, \mathrm{MSE}}{\mathrm d b_T} = -\frac{2 C_1}{b_T^3} + \frac{C_2}{T} = 0 \implies b_T^3 = \frac{2 C_1}{C_2} T$$
两边开三次方，解得使均方误差最小的最优自举块长阶数：
$$b_T^* = \left( \frac{2 C_1}{C_2} \right)^{1/3} T^{1/3} \propto T^{1/3}$$

□

常见错误做法剖析：常见错误是将平稳块自举估计方差时的最优块长阶数 $\mathcal O(T^{1/3})$ 与估计分布函数/分位数时的最优块长阶数 $\mathcal O(T^{1/5})$ 混淆；不同估计目标的核积分光滑度不同，导致均方误差的折中幂次存在本质区别。另一错误是忽略自协方差权重衰减的一阶导数特征，误将偏差阶数当作 $\mathcal O(1/b_T^2)$。

## 22. 

本题考查结合高阶矩偏度—峰度修正与多重试验极值膨胀的收缩夏普比率（Deflated Sharpe Ratio, DSR）统计量推导与临界值判定方程。

**推导与解析**

第一部分：DSR 检验统计量的完整闭式表达式。
设收益率序列长度为 $T$，样本夏普比率为 $\widehat{\mathrm{SR}}$，样本偏度为 $\hat\gamma_3$，样本峰度为 $\hat\gamma_4$。总独立（或有效）试验测试次数为 $K$。

根据非高斯渐近方差理论（习题 2 之推导），样本夏普比率的标准误估计量为：
$$\widehat{\sigma}_{\mathrm{SR}} = \sqrt{\frac{1}{T} \left( 1 - \hat\gamma_3 \widehat{\mathrm{SR}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}^2 \right)}$$

在零假设 $H_0$（所有候选策略的真实夏普比率均小于等于零）下，经过 $K$ 次独立数据挖掘试验后，纯噪声所能产生的最大样本夏普比率期望基准阈值 $\mathrm{SR}_0 = \mathbb E\left[\max_{1 \le k \le K} \widehat{\mathrm{SR}}_k\right]$ 由极值分布展开给出：
$$\mathrm{SR}_0 = \frac{1}{\sqrt{T}} \left( (1 - \gamma_{\mathrm{Euler}}) \Phi^{-1}\left( 1 - \frac{1}{K} \right) + \gamma_{\mathrm{Euler}} \Phi^{-1}\left( 1 - \frac{1}{K \mathrm e} \right) \right)$$
其中 $\gamma_{\mathrm{Euler}} \approx 0.5772$ 为欧拉常数，$\Phi^{-1}(\cdot)$ 为标准正态分位数函数。

收缩夏普比率统计量定义为观测样本夏普比率在扣除多重试验期望虚假基准 $\mathrm{SR}_0$ 并经过非高斯方差标准化后的置信度概率值：
$$\mathrm{DSR} = \Phi\left( \frac{\widehat{\mathrm{SR}} - \mathrm{SR}_0}{\widehat{\sigma}_{\mathrm{SR}}} \right) = \Phi\left( \frac{\widehat{\mathrm{SR}} - \mathrm{SR}_0}{\sqrt{\frac{1}{T} \left( 1 - \hat\gamma_3 \widehat{\mathrm{SR}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}^2 \right)}} \right)$$
该统计量取值介于 $(0, 1)$，度量了策略夏普比率超越纯数据挖掘极值噪声的后验非伪概率。

第二部分：推导显著性水平 $\alpha = 0.05$ 下的临界值方程。
在给定的单侧显著性水平 $\alpha = 0.05$ 下，判定策略具备真实统计显著阿尔法的置信度阈值为 $1 - \alpha = 0.95$。临界条件要求：
$$\mathrm{DSR} \ge 1 - \alpha \implies \Phi\left( \frac{\widehat{\mathrm{SR}}_{\mathrm{crit}} - \mathrm{SR}_0}{\widehat{\sigma}_{\mathrm{SR}}} \right) = 1 - \alpha$$
对两端施加标准正态反函数 $\Phi^{-1}(\cdot)$：
$$\frac{\widehat{\mathrm{SR}}_{\mathrm{crit}} - \mathrm{SR}_0}{\sqrt{\frac{1}{T} \left( 1 - \hat\gamma_3 \widehat{\mathrm{SR}}_{\mathrm{crit}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}_{\mathrm{crit}}^2 \right)}} = z_{1 - \alpha} = \Phi^{-1}(0.95) \approx 1.6449$$

由于必须满足 $\widehat{\mathrm{SR}}_{\mathrm{crit}} > \mathrm{SR}_0$，对等式两边平方展开：
$$(\widehat{\mathrm{SR}}_{\mathrm{crit}} - \mathrm{SR}_0)^2 = \frac{z_{1-\alpha}^2}{T} \left( 1 - \hat\gamma_3 \widehat{\mathrm{SR}}_{\mathrm{crit}} + \frac{\hat\gamma_4 - 1}{4} \widehat{\mathrm{SR}}_{\mathrm{crit}}^2 \right)$$

展开并合并关于未知临界值 $\widehat{\mathrm{SR}}_{\mathrm{crit}}$ 的二次同类项：
$$\left( 1 - \frac{z_{1-\alpha}^2 (\hat\gamma_4 - 1)}{4 T} \right) \widehat{\mathrm{SR}}_{\mathrm{crit}}^2 - 2 \left( \mathrm{SR}_0 - \frac{z_{1-\alpha}^2 \hat\gamma_3}{2 T} \right) \widehat{\mathrm{SR}}_{\mathrm{crit}} + \left( \mathrm{SR}_0^2 - \frac{z_{1-\alpha}^2}{T} \right) = 0$$

记二次方程系数：
$$A = 1 - \frac{z_{1-\alpha}^2 (\hat\gamma_4 - 1)}{4 T}, \quad B = -2 \left( \mathrm{SR}_0 - \frac{z_{1-\alpha}^2 \hat\gamma_3}{2 T} \right), \quad C = \mathrm{SR}_0^2 - \frac{z_{1-\alpha}^2}{T}$$
在常规样本量下（$T$ 充分大使得 $A > 0$），判别式 $\Delta = B^2 - 4 A C > 0$。判定策略具备真实统计显著阿尔法的样本夏普比率临界值方程及其显式实数根为：
$$\widehat{\mathrm{SR}}_{\mathrm{crit}} = \frac{-B + \sqrt{B^2 - 4 A C}}{2 A}$$
该方程严格刻画了试验次数 $K$（通过 $\mathrm{SR}_0$ 抬升基准）、负偏度 $\hat\gamma_3 < 0$ 以及超额厚尾峰度 $\hat\gamma_4 > 3$ 对合格阿尔法检验门槛的非线性抬升效应。

常见错误做法剖析：业界常见错误是将基准阈值 $\mathrm{SR}_0$ 简单设为零，退化为仅考虑非高斯性的概率夏普比率（PSR），从而完全丧失了对多重试验过拟合的防御能力；另一个错误是在求解临界值时将标准误中的未知参数 $\widehat{\mathrm{SR}}_{\mathrm{crit}}$ 错误地替换为无偏高斯方差 $1/\sqrt{T}$，忽略了非高斯方差膨胀与未知参数自身的耦合二次反馈。