# 第30章习题参考答案与解析

## 1. 

状态空间模型由状态方程 $\boldsymbol x_t=\boldsymbol F\boldsymbol x_{t-1}+\boldsymbol w_t$ 与观测方程 $\boldsymbol y_t=\boldsymbol H\boldsymbol x_t+\boldsymbol e_t$ 构成，其中过程噪声协方差为 $\boldsymbol Q$，观测噪声协方差为 $\boldsymbol R$。

在一步预测步中，预测协方差由 $\boldsymbol P_t^{-}=\boldsymbol F\boldsymbol P_{t-1}\boldsymbol F^\top+\boldsymbol Q$ 给出。过程噪声协方差 $\boldsymbol Q$ 的增大会直接按半正定序增大 $\boldsymbol P_t^{-}$，反映系统演化内生随机性增强导致先验不确定性上升；而当期观测噪声协方差 $\boldsymbol R$ 不出现在该递推式中，对 $\boldsymbol P_t^{-}$ 无当期直接影响。

在更新步中，Kalman 增益为 $\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H^\top(\boldsymbol H\boldsymbol P_t^{-}\boldsymbol H^\top+\boldsymbol R)^{-1}$。当 $\boldsymbol Q$ 增大时，$\boldsymbol P_t^{-}$ 增大使得增益矩阵 $\boldsymbol K_t$ 增大，滤波器赋予新观测更高的权重；反之，当 $\boldsymbol R$ 增大时，创新协方差分母变大，$\boldsymbol K_t$ 减小，滤波器更倾向于保留基于模型动力学的先验预测，抑制观测噪声干扰。滤波状态更新式为 $\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_t^{-}+\boldsymbol K_t(\boldsymbol y_t-\boldsymbol H\widehat{\boldsymbol x}_t^{-})$，因此 $\boldsymbol Q$ 增大会使滤波状态轨迹更敏锐地贴近新观测，而 $\boldsymbol R$ 增大会使滤波状态变化更加平滑、滞后。

对于一期拟合残差即创新向量 $\boldsymbol\nu_t=\boldsymbol y_t-\boldsymbol H\widehat{\boldsymbol x}_t^{-}$，其理论协方差为 $\boldsymbol V_t=\boldsymbol H\boldsymbol P_t^{-}\boldsymbol H^\top+\boldsymbol R$。由单期残差无法将 $\boldsymbol Q$（通过 $\boldsymbol P_t^{-}$ 体现）与 $\boldsymbol R$ 区分开，因为二者以线性组合形式合并在总方差中。只有借助跨期动态信息（如创新的自相关函数检验、不同预测步长的方差结构或平滑残差分解），才能有效辨识过程噪声与观测噪声。

若 $\boldsymbol H=\boldsymbol 0$，观测方程退化为 $\boldsymbol y_t=\boldsymbol e_t$，此时观测向量与状态向量相互独立。在此退化情形下，增益矩阵恒为 $\boldsymbol K_t=\boldsymbol 0$，观测不提供关于状态 $\boldsymbol x_t$ 的任何信息，后验分布完全退化为先验预测分布，即无法由观测学习到状态的均值或方差信息。

常见错误做法剖析：误将观测噪声 $\boldsymbol R$ 视为影响当期先验预测方差 $\boldsymbol P_t^{-}$ 的直接项，混淆了状态传播与观测更新的因果时序；或者在分析滤波状态变化时，误以为增大 $\boldsymbol Q$ 能使估计结果更平滑，实际上增大过程噪声会使增益加大，导致状态轨迹受观测噪声污染严重而产生虚假抖动。

## 2. 

对于标量模型 $x_t=x_{t-1}+w_t$ 与 $y_t=x_t+e_t$，参数为 $m_0=0$、$P_0=2$、$Q=1$、$R=2$，观测值为 $y_1=3$、$y_2=1$。

在 $t=1$ 期：
一步状态预测均值与方差为
$$m_1^{-}=m_0=0,\qquad P_1^{-}=P_0+Q=2+1=3$$
创新及其方差为
$$\nu_1=y_1-m_1^{-}=3-0=3,\qquad V_1=P_1^{-}+R=3+2=5$$
Kalman 增益为
$$K_1=\frac{P_1^{-}}{V_1}=\frac{3}{5}=0.6$$
滤波均值与滤波方差为
$$m_1=m_1^{-}+K_1\nu_1=0+0.6\times 3=1.8$$
$$P_1=(1-K_1)P_1^{-}=(1-0.6)\times 3=1.2$$

在 $t=2$ 期：
一步状态预测均值与方差为
$$m_2^{-}=m_1=1.8,\qquad P_2^{-}=P_1+Q=1.2+1=2.2$$
创新及其方差为
$$\nu_2=y_2-m_2^{-}=1-1.8=-0.8,\qquad V_2=P_2^{-}+R=2.2+2=4.2$$
Kalman 增益为
$$K_2=\frac{P_2^{-}}{V_2}=\frac{2.2}{4.2}=\frac{11}{21}\approx 0.5238$$
滤波均值与滤波方差为
$$m_2=m_2^{-}+K_2\nu_2=1.8+\frac{11}{21}\times(-0.8)=\frac{29}{21}\approx 1.3810$$
$$P_2=(1-K_2)P_2^{-}=\left(1-\frac{11}{21}\right)\times\frac{11}{5}=\frac{22}{21}\approx 1.0476$$

关于比值极限讨论：
当 $Q/R\to 0$ 时，若 $Q=0$ 且 $R>0$，系统转化为静态未知参数估计，$P_t^{-}$ 不累加过程扰动，增益 $K_t\approx 1/(t+R/P_0)$ 随样本容量增加渐近趋于 $0$，更新步趋近于递推最小二乘法；若 $R\to\infty$，则 $K_t\to 0$，更新量归零，滤波值恒等于初始先验。
当 $Q/R\to\infty$ 时，若 $R\to 0$ 或 $Q\to\infty$，增益 $K_t\to 1$，$P_t\to 0$，滤波状态完全由当期观测决定，即 $m_t\to y_t$，系统丧失记忆能力与平滑降噪效果。

常见错误做法剖析：计算第二期预测方差时遗漏过程噪声，误写为 $P_2^{-}=P_1$；在计算滤波方差时误用 $P_t=P_t^{-}-K_t^2$，漏乘创新方差因子 $V_t$。

## 3. 

**证明**

在给定信息集 $\mathcal F_{t-1}$ 条件下，状态预测满足 $\boldsymbol x_t\mid\mathcal F_{t-1}\sim N(\widehat{\boldsymbol x}_t^{-},\boldsymbol P_t^{-})$。由观测方程 $\boldsymbol y_t=\boldsymbol H_t\boldsymbol x_t+\boldsymbol d_t+\boldsymbol e_t$ 及 $\boldsymbol e_t\sim N(\boldsymbol 0,\boldsymbol R_t)$ 与状态误差条件独立，可得观测预测均值为
$$\widehat{\boldsymbol y}_t^{-}=\mathbb E[\boldsymbol y_t\mid\mathcal F_{t-1}]=\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}+\boldsymbol d_t$$
定义创新向量 $\boldsymbol\nu_t=\boldsymbol y_t-\widehat{\boldsymbol y}_t^{-}=\boldsymbol H_t(\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-})+\boldsymbol e_t$。计算条件协方差：
$$\operatorname{Cov}(\boldsymbol x_t,\boldsymbol y_t\mid\mathcal F_{t-1})=\mathbb E[(\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-})(\boldsymbol H_t(\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-})+\boldsymbol e_t)^\top\mid\mathcal F_{t-1}]=\boldsymbol P_t^{-}\boldsymbol H_t^\top$$
$$\boldsymbol V_t=\operatorname{Cov}(\boldsymbol y_t\mid\mathcal F_{t-1})=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t$$
因此，$(\boldsymbol x_t^\top,\boldsymbol y_t^\top)^\top$ 给定 $\mathcal F_{t-1}$ 服从联合高斯分布：
$$\begin{pmatrix}\boldsymbol x_t\\\boldsymbol y_t\end{pmatrix}\Bigg|\mathcal F_{t-1}\sim N\left(\begin{pmatrix}\widehat{\boldsymbol x}_t^{-}\\\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}+\boldsymbol d_t\end{pmatrix},\begin{pmatrix}\boldsymbol P_t^{-}&\boldsymbol P_t^{-}\boldsymbol H_t^\top\\\boldsymbol H_t\boldsymbol P_t^{-}&\boldsymbol V_t\end{pmatrix}\right)$$
利用多元高斯分布的条件分布定理，状态 $\boldsymbol x_t$ 在给定 $\mathcal F_t=\sigma(\mathcal F_{t-1},\boldsymbol y_t)$ 下的条件分布仍为高斯分布，其条件均值与条件协方差为
$$\widehat{\boldsymbol x}_t=\mathbb E[\boldsymbol x_t\mid\mathcal F_t]=\widehat{\boldsymbol x}_t^{-}+\boldsymbol K_t(\boldsymbol y_t-\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}-\boldsymbol d_t)$$
$$\boldsymbol P_t=\operatorname{Cov}(\boldsymbol x_t\mid\mathcal F_t)=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol H_t\boldsymbol P_t^{-}$$
其中增益矩阵定义为
$$\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol V_t^{-1}$$

下面验证条件均值同时使后验均方误差矩阵按半正定序最小。设 $\widetilde{\boldsymbol x}_t=g(\mathcal F_t)$ 为任意 $\mathcal F_t$-可测估计量。均方误差矩阵可分解为
$$\mathbb E[(\boldsymbol x_t-\widetilde{\boldsymbol x}_t)(\boldsymbol x_t-\widetilde{\boldsymbol x}_t)^\top\mid\mathcal F_t]=\mathbb E[(\boldsymbol x_t-\widehat{\boldsymbol x}_t+\widehat{\boldsymbol x}_t-\widetilde{\boldsymbol x}_t)(\boldsymbol x_t-\widehat{\boldsymbol x}_t+\widehat{\boldsymbol x}_t-\widetilde{\boldsymbol x}_t)^\top\mid\mathcal F_t]$$
展开交叉项，由于 $\widehat{\boldsymbol x}_t-\widetilde{\boldsymbol x}_t$ 关于 $\mathcal F_t$ 可测，且 $\mathbb E[\boldsymbol x_t-\widehat{\boldsymbol x}_t\mid\mathcal F_t]=\boldsymbol 0$，交叉项条件期望几乎必然为零。因此
$$\mathbb E[(\boldsymbol x_t-\widetilde{\boldsymbol x}_t)(\boldsymbol x_t-\widetilde{\boldsymbol x}_t)^\top\mid\mathcal F_t]=\boldsymbol P_t+(\widehat{\boldsymbol x}_t-\widetilde{\boldsymbol x}_t)(\widehat{\boldsymbol x}_t-\widetilde{\boldsymbol x}_t)^\top\succeq\boldsymbol P_t$$
上式第二项为外积矩阵，恒为半正定。取等号当且仅当 $\widetilde{\boldsymbol x}_t=\widehat{\boldsymbol x}_t$ 几乎必然成立，故条件均值使后验均方误差矩阵在半正定序下达到极小。

□

常见错误做法剖析：在推导均方误差最小时仅对迹（标量方差和）求导，未考虑矩阵半正定序的强最优性；推导联合分布协方差时误将测量噪声 $\boldsymbol e_t$ 与状态预测误差设为相关。

## 4. 

在时变线性状态空间模型中，预测误差 $\boldsymbol e_t^{-}=\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-}$ 与滤波误差 $\boldsymbol e_t=\boldsymbol x_t-\widehat{\boldsymbol x}_t$ 的根本差异源自所依赖的条件信息集。预测均值 $\widehat{\boldsymbol x}_t^{-}=\mathbb E[\boldsymbol x_t\mid\mathcal F_{t-1}]$ 仅以滞后一期的历史观测信息集 $\mathcal F_{t-1}=\{\boldsymbol y_1,\dots,\boldsymbol y_{t-1}\}$ 为条件，其误差协方差矩阵为 $\boldsymbol P_t^{-}$；滤波均值 $\widehat{\boldsymbol x}_t=\mathbb E[\boldsymbol x_t\mid\mathcal F_t]$ 则以当期扩展信息集 $\mathcal F_t=\sigma(\mathcal F_{t-1},\boldsymbol y_t)$ 为条件。滤波更新吸收了当期新信息（即创新 $\boldsymbol\nu_t$），因而滤波误差协方差满足 $\boldsymbol P_t=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol V_t\boldsymbol K_t^\top\preceq\boldsymbol P_t^{-}$，即滤波估计精度在半正定序意义下严格不劣于先验预测。

当观测数据在某些日期存在部分或完全缺失时，设理论全维观测为 $\boldsymbol y_t^*=\boldsymbol H_t^*\boldsymbol x_t+\boldsymbol d_t^*+\boldsymbol e_t^*$（维度为 $p$）。引入时变选择矩阵 $\boldsymbol W_t\in\mathbb R^{p_t\times p}$（通过从 $p$ 阶单位矩阵中删去缺失分量对应的行得到），实际观测向量与观测方程修正为
$$\boldsymbol y_t=\boldsymbol W_t\boldsymbol y_t^*,\qquad \boldsymbol H_t=\boldsymbol W_t\boldsymbol H_t^*,\qquad \boldsymbol d_t=\boldsymbol W_t\boldsymbol d_t^*,\qquad \boldsymbol R_t=\boldsymbol W_t\boldsymbol R_t^*\boldsymbol W_t^\top$$
若在某一期出现整行全部缺失（$p_t=0$）：
其一，预测步不受缺失影响，依然遵循状态先验演化：
$$\widehat{\boldsymbol x}_t^{-}=\boldsymbol F_t\widehat{\boldsymbol x}_{t-1}+\boldsymbol c_t,\qquad \boldsymbol P_t^{-}=\boldsymbol F_t\boldsymbol P_{t-1}\boldsymbol F_t^\top+\boldsymbol Q_t$$
其二，更新步退化。由于当期没有任何可用观测，增益矩阵不定义（或设为零矩阵），滤波均值与协方差直接继承预测量：
$$\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_t^{-},\qquad \boldsymbol P_t=\boldsymbol P_t^{-}$$
其三，对数似然贡献为零。在对数似然求和中跳过该期，该时间点不贡献任何似然项。

常见错误做法剖析：将缺失观测填补为 $0$ 后强行代入标准 Kalman 滤波更新公式，导致将人为假想的“零观测”作为真实信号更新状态；误以为整行缺失时方差保持不变，实际上预测步会照常注入过程噪声 $\boldsymbol Q_t$，使得不确定性持续发散。

## 5. 

**证明**

考虑标量 $\operatorname{ARMA}(2,1)$ 模型 $y_t=\phi_1y_{t-1}+\phi_2y_{t-2}+\varepsilon_t+\theta\varepsilon_{t-1}$，其中 $\varepsilon_t\sim\operatorname{WN}(0,\sigma_\varepsilon^2)$。构建二维状态向量
$$\boldsymbol x_t=\begin{pmatrix}x_{1,t}\\x_{2,t}\end{pmatrix}=\begin{pmatrix}y_t\\\phi_2 y_{t-1}+\theta\varepsilon_t\end{pmatrix}$$
状态转移方程设定为
$$\boldsymbol x_t=\boldsymbol F\boldsymbol x_{t-1}+\boldsymbol w_t,\qquad \boldsymbol F=\begin{pmatrix}\phi_1&1\\\phi_2&0\end{pmatrix},\qquad \boldsymbol w_t=\begin{pmatrix}1\\\theta\end{pmatrix}\varepsilon_t$$
观测方程设定为
$$y_t=\boldsymbol H\boldsymbol x_t,\qquad \boldsymbol H=\begin{pmatrix}1&0\end{pmatrix}$$
过程噪声协方差矩阵为
$$\boldsymbol Q=\mathbb E[\boldsymbol w_t\boldsymbol w_t^\top]=\sigma_\varepsilon^2\begin{pmatrix}1&\theta\\\theta&\theta^2\end{pmatrix}$$
观测噪声方差为 $R=0$。

逐期展开验证原模型递推关系：
由状态转移方程第一行可得
$$x_{1,t}=\phi_1 x_{1,t-1}+x_{2,t-1}+\varepsilon_t$$
由第二行滞后一期可得
$$x_{2,t-1}=\phi_2 x_{1,t-2}+\theta\varepsilon_{t-1}$$
将第二行代入第一行，并结合观测方程 $y_t=x_{1,t}$ 与 $y_{t-2}=x_{1,t-2}$，得到
$$y_t=\phi_1 y_{t-1}+\phi_2 y_{t-2}+\theta\varepsilon_{t-1}+\varepsilon_t$$
上式与原 $\operatorname{ARMA}(2,1)$ 差分方程完全一致。

状态转移矩阵 $\boldsymbol F$ 的特征多项式为
$$\det(\lambda\boldsymbol I-\boldsymbol F)=\det\begin{pmatrix}\lambda-\phi_1&-1\\-\phi_2&\lambda\end{pmatrix}=\lambda^2-\phi_1\lambda-\phi_2$$
状态转移稳定的充分必要条件为其特征根均位于复平面单位圆内，即对所有根满足 $|\lambda|<1$。定义原 AR 多项式为 $\Phi(z)=1-\phi_1 z-\phi_2 z^2$，令 $z=\lambda^{-1}$，则方程转化为 $z^2-\phi_1 z-\phi_2=0$，其根满足 $|\lambda|<1$ 等价于 $\Phi(z)$ 的零点均落在单位圆外（$|z|>1$），因此状态转移稳定性与原 AR 过程的平稳因果性严格等价。

该状态空间坐标表示并不唯一。对于任意二阶可逆矩阵 $\boldsymbol T\in\mathbb R^{2\times 2}$，定义变换状态 $\widetilde{\boldsymbol x}_t=\boldsymbol T\boldsymbol x_t$，则新系统的参数为 $\widetilde{\boldsymbol F}=\boldsymbol T\boldsymbol F\boldsymbol T^{-1}$、$\widetilde{\boldsymbol H}=\boldsymbol H\boldsymbol T^{-1}$、$\widetilde{\boldsymbol w}_t=\boldsymbol T\boldsymbol w_t$。新系统与原系统具备完全一致的输入输出传递函数与脉冲响应，因此最小状态空间表示在相似变换群下不唯一。

□

常见错误做法剖析：将状态向量生硬设定为滞后项组合导致无法吸收一阶移动平均扰动；或者在论证坐标唯一性时忽视相似变换不变性。
## 6. 

**证明**

对于线性高斯状态空间模型，样本观测序列 $\boldsymbol y_{1:T}$ 给定模型参数向量 $\boldsymbol\psi$ 的联合概率密度可通过条件概率链式法则分解为
$$p(\boldsymbol y_{1:T}\mid\boldsymbol\psi)=\prod_{t=1}^T p(\boldsymbol y_t\mid\mathcal F_{t-1},\boldsymbol\psi)$$
其中 $\mathcal F_{t-1}=\sigma(\boldsymbol y_1,\dots,\boldsymbol y_{t-1})$（在 $t=1$ 时退化为空信息集）。在线性高斯假设下，一步条件预测分布严格服从高斯分布：
$$\boldsymbol y_t\mid\mathcal F_{t-1},\boldsymbol\psi\sim N(\widehat{\boldsymbol y}_t^{-},\boldsymbol V_t)$$
其预测均值与创新协方差由 Kalman 滤波前向递推给出：
$$\widehat{\boldsymbol y}_t^{-}=\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}+\boldsymbol d_t,\qquad \boldsymbol V_t=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t$$
定义创新向量 $\boldsymbol\nu_t=\boldsymbol y_t-\widehat{\boldsymbol y}_t^{-}$。设当期有效观测维度为 $p_t$，则单期条件概率密度为
$$p(\boldsymbol y_t\mid\mathcal F_{t-1},\boldsymbol\psi)=(2\pi)^{-p_t/2}\det(\boldsymbol V_t)^{-1/2}\exp\left(-\frac{1}{2}\boldsymbol\nu_t^\top\boldsymbol V_t^{-1}\boldsymbol\nu_t\right)$$
对其取自然对数并在时间区间 $t=1,\dots,T$ 上累加，得到对数似然函数的预测误差分解形式：
$$\ln L(\boldsymbol\psi)=-\frac{1}{2}\sum_{t=1}^T\left(p_t\ln(2\pi)+\ln\det(\boldsymbol V_t)+\boldsymbol\nu_t^\top\boldsymbol V_t^{-1}\boldsymbol\nu_t\right)$$

在实际计算中，各项要素的处理准则如下：
1. 初始状态分布：由先验设定 $\boldsymbol x_0\sim N(\boldsymbol m_0,\boldsymbol P_0)$ 启动递推。若系统为平稳因果系统，可令 $\boldsymbol m_0$ 与 $\boldsymbol P_0$ 满足无条件均值方程与离散 Lyapunov 方程；若为非平稳系统，则通过外生指定先验参数或采用极限散漫先验修正初始步的似然贡献。
2. 常数项与外生变量：外生控制项与确定性漂移项 $\boldsymbol c_t$ 与 $\boldsymbol d_t$ 分别进入状态一步预测 $\widehat{\boldsymbol x}_t^{-}=\boldsymbol F_t\widehat{\boldsymbol x}_{t-1}+\boldsymbol c_t$ 与观测预测 $\widehat{\boldsymbol y}_t^{-}=\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}+\boldsymbol d_t$，进而平移创新向量 $\boldsymbol\nu_t$。
3. 时变观测维数：标量常数项变为 $\sum_{t=1}^T p_t\ln(2\pi)$，各期行列式 $\det(\boldsymbol V_t)$ 对应 $p_t$ 阶方阵。
4. 缺失观测：若某期观测完全缺失（$p_t=0$），该期条件概率为 1，对数似然贡献为 0，即求和中直接跳过该期。

不能直接将滤波残差 $\boldsymbol e_t^{\mathrm{post}}=\boldsymbol y_t-\boldsymbol H_t\widehat{\boldsymbol x}_t$ 代入同一公式的原因在于：滤波状态 $\widehat{\boldsymbol x}_t$ 已经利用了当期观测 $\boldsymbol y_t$，使得 $\boldsymbol e_t^{\mathrm{post}}$ 的协方差缩小为 $\boldsymbol R_t-\boldsymbol H_t\boldsymbol P_t\boldsymbol H_t^\top\ne\boldsymbol V_t$；更重要的是，滤波残差序列跨期存在自相关性，违反了条件高斯密度独立乘积分解的理论前提，直接代入会导致方差估计虚假压缩与参数估计的严重偏误。

□

常见错误做法剖析：在计算对数似然时误用滤波后残差代替先验创新向量；在存在缺失值时未动态调整常数项维度 $p_t$，导致多变量模型在缺失观测日的对数似然惩罚项失真。

## 7. 

对于一维非线性系统 $x_t=\alpha x_{t-1}+w_t$ 与 $y_t=\beta x_t^2+e_t$（其中 $w_t\sim N(0,Q)$，$e_t\sim N(0,R)$）：

在扩展 Kalman 滤波（EKF）框架下，状态转移为线性映射，雅可比导数为
$$F_t=\frac{\partial (\alpha x_{t-1})}{\partial x_{t-1}}=\alpha$$
一步状态预测与预测方差为
$$\widehat x_t^{-}=\alpha\widehat x_{t-1},\qquad P_t^{-}=\alpha^2 P_{t-1}+Q$$
观测函数为标量非线性函数 $h(x)=\beta x^2$。在预测均值 $\widehat x_t^{-}$ 处展开，观测雅可比为
$$H_t=\left.\frac{\partial h(x)}{\partial x}\right|_{x=\widehat x_t^{-}}=2\beta\widehat x_t^{-}$$
观测的一阶 Taylor 预测值为
$$\widehat y_t^{-}=h(\widehat x_t^{-})=\beta(\widehat x_t^{-})^2$$
当期创新及其理论方差为
$$\nu_t=y_t-\beta(\widehat x_t^{-})^2,\qquad V_t=H_t^2 P_t^{-}+R=4\beta^2(\widehat x_t^{-})^2 P_t^{-}+R$$
Kalman 增益与滤波更新公式为
$$K_t=\frac{P_t^{-}H_t}{V_t}=\frac{2\beta\widehat x_t^{-}P_t^{-}}{4\beta^2(\widehat x_t^{-})^2 P_t^{-}+R}$$
$$\widehat x_t=\widehat x_t^{-}+K_t\nu_t,\qquad P_t=(1-K_t H_t)P_t^{-}=P_t^{-}-\frac{4\beta^2(\widehat x_t^{-})^2(P_t^{-})^2}{4\beta^2(\widehat x_t^{-})^2 P_t^{-}+R}$$

若 $\beta\ne 0$ 且预测均值处于原点 $\widehat x_t^{-}=0$，则雅可比矩阵退化为
$$H_t=2\beta\times 0=0$$
代入上述更新表达式可得
$$K_t=0,\qquad \widehat x_t=\widehat x_t^{-}=0,\qquad P_t=P_t^{-}$$
即无论观测值 $y_t$ 多大，增益恒为零，滤波均值完全不随观测更新，方差亦无法通过观测信息实现任何缩减。

该现象源自 EKF 局部一阶线性化的固有缺陷，而非模型不可辨识。在真实概率模型下，观测 $y_t=\beta x_t^2+e_t$ 提供了关于状态模长 $|x_t|$ 的明确信息（高阶矩信息），状态的后验方差必然小于先验方差。由于二次函数在极值点处一阶导数为零，一阶 EKF 丢失了二阶曲率项 $\beta P_t^{-}$，错误地判定观测对状态的变化率为零，从而导致增益锁死。

常见错误做法剖析：将增益为零误判为模型结构不可辨识；在构建 EKF 观测预测时误将二阶修正项 $\beta P_t^{-}$ 加入一阶 EKF 公式中，混淆了一阶 EKF 与二阶 EKF 或无迹变换的计算界限。
## 8. 

**证明**

对于一维状态变量 $x\sim N(m,P)$ 与标量非线性观测 $z=h(x)$，构造关于均值 $m$ 对称的三个 sigma 点：
$$\mathcal X_0=m,\qquad \mathcal X_1=m+\sigma,\qquad \mathcal X_2=m-\sigma$$
其中取对称扩展步长 $\sigma=\sqrt{(1+\lambda)P}$。设均值权重为 $\{W_i^{(m)}\}_{i=0}^2$，协方差权重为 $\{W_i^{(c)}\}_{i=0}^2$。由对称性设定 $W_1^{(m)}=W_2^{(m)}=W^{(m)}$ 且 $W_1^{(c)}=W_2^{(c)}=W^{(c)}$。

一阶矩匹配条件要求加权样本均值精确复原先验均值 $m$：
$$\sum_{i=0}^2 W_i^{(m)}\mathcal X_i=W_0^{(m)}m+W^{(m)}(m+\sigma)+W^{(m)}(m-\sigma)=(W_0^{(m)}+2W^{(m)})m=m$$
由此得到归一化约束条件：
$$W_0^{(m)}+2W^{(m)}=1$$
二阶矩匹配条件要求加权样本协方差精确匹配先验方差 $P$：
$$\sum_{i=0}^2 W_i^{(c)}(\mathcal X_i-m)^2=W_0^{(c)}\times 0+W^{(c)}\sigma^2+W^{(c)}(-\sigma)^2=2W^{(c)}\sigma^2=P$$
将 $\sigma^2=(1+\lambda)P$ 代入上式，解得非零点协方差权重：
$$W^{(c)}=\frac{1}{2(1+\lambda)}$$
为了保持一阶与二阶矩权重基础结构的一致性，取 $W^{(m)}=W^{(c)}=\frac{1}{2(1+\lambda)}$，进而由均值约束解得中心点均值权重：
$$W_0^{(m)}=1-2W^{(m)}=\frac{\lambda}{1+\lambda}$$
在标准无迹变换（UT）中，引入高阶矩调节参数 $\beta$，中心点协方差权重修正为
$$W_0^{(c)}=\frac{\lambda}{1+\lambda}+(1-\alpha^2+\beta)$$
其中参数设定满足 $\lambda=\alpha^2(1+\kappa)-1$。对于标量高斯先验，理论最优选择为 $\alpha\in(0,1]$、$\kappa=0$ 且 $\beta=2$。在该参数族下，由于中心点偏离量为零，附加项不改变 $2W^{(c)}\sigma^2=P$ 的匹配等式，因此一阶与二阶矩精确匹配条件始终成立。

非线性观测传播方程为
$$\mathcal Z_i=h(\mathcal X_i),\qquad i=0,1,2$$
由此得到观测预测均值、预测方差与交叉协方差的解析表达式：
$$\widehat z=\sum_{i=0}^2 W_i^{(m)}\mathcal Z_i=W_0^{(m)}h(m)+W^{(m)}[h(m+\sigma)+h(m-\sigma)]$$
$$P_{zz}=\sum_{i=0}^2 W_i^{(c)}(\mathcal Z_i-\widehat z)^2+R$$
$$P_{xz}=\sum_{i=0}^2 W_i^{(c)}(\mathcal X_i-m)(\mathcal Z_i-\widehat z)=\frac{\sqrt{(1+\lambda)P}}{2(1+\lambda)}[h(m+\sigma)-h(m-\sigma)]$$

附加参数 $\beta=2$ 能精确吸收一维高斯分布四阶矩（峰度为 3）的 Taylor 展开高阶余项，将均值与协方差的近似精度提升至三阶 Taylor 截断。然而，当观测函数 $h(x)$ 包含不连续阶跃跳跃、高频周期振荡，或概率质量分散在远离均值的局部极值点时，三个确定性采样点将完全错失非线性几何流形的核心支撑域，导致该高斯矩匹配近似彻底失效。

□

常见错误做法剖析：在推导方差匹配时混淆标量维数与采样点数，将非零点权重错误写为 $1/(2n)$（遗漏尺度参数 $\lambda$）；或误以为 UKF 能够无条件拟合强多峰后验分布。

## 9. 

对于对数变换非线性波动率状态与带制度跳变的观测过程，EKF 与 UKF 在算法机制上的核心差异体现于：
1. 线性化基准点：EKF 严格依赖后验均值单点处的局部一阶 Taylor 展开切线，若对数变换在极值点附近曲率剧烈变化，单点切线极易严重失真；UKF 则基于围绕预测均值分布的确定性 sigma 点集进行非局部统计线性化，能够天然捕捉二次曲率效应。
2. 协方差传播：EKF 通过雅可比矩阵夹逼计算 $\boldsymbol F_t\boldsymbol P_{t-1}\boldsymbol F_t^\top$，容易因局部导数过大或过小导致方差被过度缩放或低估；UKF 通过加权样本二阶矩重构协方差，数值条件数更为稳定。
3. 状态边界约束：对数变换虽然将正波动率映射至全实轴，但在均值反变换回原空间或进入极端波动区域时，EKF 的无约束加性高斯更新容易使状态越过物理合理边界；UKF 虽可在 sigma 点层面对变换施加几何投影，但两者的更新本质上仍受限于对称高斯框架。
4. 计算成本：对于低维波动率状态，EKF 需推导并计算解析一阶导数，UKF 需计算 $2n+1$ 个确定性变换点，计算复杂度差异极小；但在高频跳变期，两者均面临单模态高斯崩溃风险。

为区分“均值近似错误”与“分布非高斯”，设计如下对比数值实验：
实验步骤：
第一步，以超高粒子数（如 $N=20000$）的序列重要性重采样粒子滤波（SMC/PF）作为后验概率密度 $p(x_t\mid y_{1:t})$ 的无偏数值黄金基准。
第二步，在时间轴上同步运行 EKF、UKF 与基准 PF。提取各期 PF 样本经验分布的条件均值 $\mu_t^{\mathrm{PF}}$、条件方差 $\sigma_t^{2,\mathrm{PF}}$、偏度 $S_t^{\mathrm{PF}}$、超额峰度 $K_t^{\mathrm{PF}}$，并计算滤波估计分布与经验分布之间的离散化 Kullback–Leibler 散度 $D_{\mathrm{KL}}(p_t^{\mathrm{PF}}\parallel N(\widehat x_t, P_t))$，同时对各滤波器记录标准化预测误差。
第三步，判定与解耦标准：
- 若在平稳波动区间，$|S_t^{\mathrm{PF}}|\approx 0$ 且 $|K_t^{\mathrm{PF}}|\approx 0$（后验分布高度逼近对称高斯单峰），但 EKF 均值与 $\mu_t^{\mathrm{PF}}$ 存在显著系统性偏差，而 UKF 均值紧密贴合 $\mu_t^{\mathrm{PF}}$ 且其 KL 散度极小，这表明误差的主要根源在于 EKF 的“一阶均值近似错误”。
- 若在制度跳变发生日，PF 经验后验呈现强烈的双峰或重尾偏斜（$|S_t^{\mathrm{PF}}|\gg 1$ 或 $K_t^{\mathrm{PF}}\gg 3$），此时 UKF 与 EKF 的预测均值均与 $\mu_t^{\mathrm{PF}}$ 发生重大偏离，且两者的 KL 散度均出现数量级暴增，这表明高斯假设前提已被破坏，主导缺陷转变为“分布非高斯”。

常见错误做法剖析：仅使用单一的均方根误差（RMSE）指标作为评价标准，抹杀了局部非线性截断误差与全局多模态分布失效之间的本质机理差异。
## 10. 

**证明**

在线性高斯状态空间模型中，固定区间平滑旨在计算给定全样本信息集 $\mathcal F_T=\sigma(\boldsymbol y_1,\dots,\boldsymbol y_T)$ 下的状态条件分布 $p(\boldsymbol x_t\mid\mathcal F_T)$。

考虑给定历史观测 $\mathcal F_t$ 时 $\boldsymbol x_t$ 与 $\boldsymbol x_{t+1}$ 的联合条件分布。由 Kalman 滤波前向递推可知 $\boldsymbol x_t\mid\mathcal F_t\sim N(\widehat{\boldsymbol x}_t,\boldsymbol P_t)$。结合状态演化方程 $\boldsymbol x_{t+1}=\boldsymbol F_{t+1}\boldsymbol x_t+\boldsymbol w_{t+1}$（其中 $\boldsymbol w_{t+1}\sim N(\boldsymbol 0,\boldsymbol Q_{t+1})$ 与 $\mathcal F_t$ 及 $\boldsymbol x_t-\widehat{\boldsymbol x}_t$ 独立），可得
$$\mathbb E[\boldsymbol x_{t+1}\mid\mathcal F_t]=\boldsymbol F_{t+1}\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_{t+1}^{-}$$
$$\operatorname{Var}(\boldsymbol x_{t+1}\mid\mathcal F_t)=\boldsymbol F_{t+1}\boldsymbol P_t\boldsymbol F_{t+1}^\top+\boldsymbol Q_{t+1}=\boldsymbol P_{t+1}^{-}$$
$$\operatorname{Cov}(\boldsymbol x_t,\boldsymbol x_{t+1}\mid\mathcal F_t)=\mathbb E[(\boldsymbol x_t-\widehat{\boldsymbol x}_t)(\boldsymbol F_{t+1}(\boldsymbol x_t-\widehat{\boldsymbol x}_t)+\boldsymbol w_{t+1})^\top\mid\mathcal F_t]=\boldsymbol P_t\boldsymbol F_{t+1}^\top$$
由此构建 $(\boldsymbol x_t^\top,\boldsymbol x_{t+1}^\top)^\top\mid\mathcal F_t$ 的联合高斯分布：
$$\begin{pmatrix}\boldsymbol x_t\\\boldsymbol x_{t+1}\end{pmatrix}\Bigg|\mathcal F_t\sim N\left(\begin{pmatrix}\widehat{\boldsymbol x}_t\\\widehat{\boldsymbol x}_{t+1}^{-}\end{pmatrix},\begin{pmatrix}\boldsymbol P_t&\boldsymbol P_t\boldsymbol F_{t+1}^\top\\\boldsymbol F_{t+1}\boldsymbol P_t&\boldsymbol P_{t+1}^{-}\end{pmatrix}\right)$$
利用多元高斯分布的条件切片性质，$\boldsymbol x_t$ 给定 $\boldsymbol x_{t+1}$ 与 $\mathcal F_t$ 的条件分布仍为高斯分布：
$$\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_t\sim N\left(\widehat{\boldsymbol x}_t+\boldsymbol J_t(\boldsymbol x_{t+1}-\widehat{\boldsymbol x}_{t+1}^{-}),\boldsymbol P_t-\boldsymbol J_t\boldsymbol P_{t+1}^{-}\boldsymbol J_t^\top\right)$$
其中平滑增益矩阵定义为
$$\boldsymbol J_t=\boldsymbol P_t\boldsymbol F_{t+1}^\top(\boldsymbol P_{t+1}^{-})^{-1}$$
由系统的 Markov 性质，在给定 $\boldsymbol x_{t+1}$ 的条件下，未来观测序列 $\boldsymbol y_{t+1:T}$ 与历史状态 $\boldsymbol x_t$ 条件独立，从而有 $p(\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_T)=p(\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_t)$。应用全期望法则计算全样本平滑均值：
$$\widehat{\boldsymbol x}_{t\mid T}=\mathbb E[\boldsymbol x_t\mid\mathcal F_T]=\mathbb E[\mathbb E[\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_T]\mid\mathcal F_T]=\widehat{\boldsymbol x}_t+\boldsymbol J_t(\widehat{\boldsymbol x}_{t+1\mid T}-\widehat{\boldsymbol x}_{t+1}^{-})$$
应用全方差法则计算全样本平滑协方差：
$$\boldsymbol P_{t\mid T}=\operatorname{Var}(\boldsymbol x_t\mid\mathcal F_T)=\mathbb E[\operatorname{Var}(\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_T)\mid\mathcal F_T]+\operatorname{Var}(\mathbb E[\boldsymbol x_t\mid\boldsymbol x_{t+1},\mathcal F_T]\mid\mathcal F_T)$$
$$=(\boldsymbol P_t-\boldsymbol J_t\boldsymbol P_{t+1}^{-}\boldsymbol J_t^\top)+\boldsymbol J_t\operatorname{Var}(\boldsymbol x_{t+1}\mid\mathcal F_T)\boldsymbol J_t^\top=\boldsymbol P_t+\boldsymbol J_t(\boldsymbol P_{t+1\mid T}-\boldsymbol P_{t+1}^{-})\boldsymbol J_t^\top$$

递推必须依赖滤波量与一步预测量的原因在于：滤波量 $(\widehat{\boldsymbol x}_t,\boldsymbol P_t)$ 是基于截止到 $t$ 期信息的充分统计量，而预测量 $(\widehat{\boldsymbol x}_{t+1}^{-},\boldsymbol P_{t+1}^{-})$ 构成了向下一期外推的先验基准。

关于平滑协方差半正定性的证明：
全方差分解的第一项 $\boldsymbol P_t-\boldsymbol J_t\boldsymbol P_{t+1}^{-}\boldsymbol J_t^\top$ 恰为联合条件分布协方差矩阵关于 $\boldsymbol P_{t+1}^{-}$ 的 Schur 补。因联合协方差矩阵半正定且 $\boldsymbol P_{t+1}^{-}\succ\boldsymbol 0$，其 Schur 补必为对称半正定。在后向递推中，终端值 $\boldsymbol P_{T\mid T}=\boldsymbol P_T$ 由定义是对称半正定的；由数学归纳法，若 $\boldsymbol P_{t+1\mid T}\succeq\boldsymbol 0$，则第二项二次型 $\boldsymbol J_t\boldsymbol P_{t+1\mid T}\boldsymbol J_t^\top$ 亦必然是对称半正定矩阵。两个对称半正定矩阵相加的结果严格保持对称半正定性。

□

常见错误做法剖析：在定义平滑增益时混淆了一步预测方差与滤波方差，误写为 $\boldsymbol P_t\boldsymbol F_{t+1}^\top\boldsymbol P_{t+1}^{-1}$；在证明半正定时直接由最终化简式相减展开，因无法直接判断差值符号而陷入逻辑死循环。

## 11. 

**证明**

在序列 Monte Carlo（粒子滤波）中，目标分布为状态轨迹联合后验概率密度 $p(\boldsymbol x_{0:t}\mid\boldsymbol y_{1:t})=\frac{p(\boldsymbol x_{0:t},\boldsymbol y_{1:t})}{p(\boldsymbol y_{1:t})}$。根据 Markov 性质，联合分布因子分解为
$$p(\boldsymbol x_{0:t},\boldsymbol y_{1:t})=p(\boldsymbol x_{0:t-1},\boldsymbol y_{1:t-1})p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)$$
选取序贯因子化建议密度：
$$q(\boldsymbol x_{0:t}\mid\boldsymbol y_{1:t})=q(\boldsymbol x_{0:t-1}\mid\boldsymbol y_{1:t-1})q(\boldsymbol x_t\mid\boldsymbol x_{0:t-1},\boldsymbol y_{1:t})$$
未归一化轨迹重要性权重满足严格递推：
$$w_t^*(\boldsymbol x_{0:t})=\frac{p(\boldsymbol x_{0:t},\boldsymbol y_{1:t})}{q(\boldsymbol x_{0:t}\mid\boldsymbol y_{1:t})}=\frac{p(\boldsymbol x_{0:t-1},\boldsymbol y_{1:t-1})}{q(\boldsymbol x_{0:t-1}\mid\boldsymbol y_{1:t-1})}\frac{p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)}{q(\boldsymbol x_t\mid\boldsymbol x_{0:t-1},\boldsymbol y_{1:t})}=w_{t-1}^*(\boldsymbol x_{0:t-1})\alpha_t$$
其中增量重要性权重为
$$\alpha_t=\frac{p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)}{q(\boldsymbol x_t\mid\boldsymbol x_{0:t-1},\boldsymbol y_{1:t})}$$
对应 $N$ 个粒子样本的归一化权重为
$$W_t^{(i)}=\frac{w_t^{*(i)}}{\sum_{j=1}^N w_t^{*(j)}}=\frac{W_{t-1}^{(i)}\alpha_t^{(i)}}{\sum_{j=1}^N W_{t-1}^{(j)}\alpha_t^{(j)}}$$
任意可积状态函数 $f(\boldsymbol x_{0:t})$ 的后验期望经验估计量为
$$\widehat f_N=\sum_{i=1}^N W_t^{(i)}f(\boldsymbol x_{0:t}^{(i)})$$

建议密度必须满足的基础支撑集包含条件为
$$\operatorname{supp}(p(\boldsymbol x_{0:t}\mid\boldsymbol y_{1:t}))\subseteq\operatorname{supp}(q(\boldsymbol x_{0:t}\mid\boldsymbol y_{1:t}))$$
即只要真实后验概率密度大于零的区域，建议密度必须严格大于零，否则会导致未被覆盖区域的重要样本缺失并产生永久性估计偏倚。

考虑以当期观测为条件的一步最优建议密度。目标是最小化增量权重在给定 $(\boldsymbol x_{t-1},\boldsymbol y_t)$ 下的条件方差 $\operatorname{Var}_q(\alpha_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)$。增量权重的二阶矩为
$$\mathbb E_q[\alpha_t^2\mid\boldsymbol x_{t-1},\boldsymbol y_t]=\int\frac{(p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t))^2}{q(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)}d\boldsymbol x_t$$
由 Cauchy–Schwarz 不等式，积分下界在且仅在密度比恒定时达到，解得最优建议密度为真实一步状态转移与观测似然的乘积归一化分布：
$$q^*(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)=\frac{p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)}{\int p(\boldsymbol x_t'\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t')d\boldsymbol x_t'}=p(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)$$
将该最优密度代入增量权重表达式中，得到对应增量权重为
$$\alpha_t^*=\frac{p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)}{p(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)}=\int p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)d\boldsymbol x_t=p(\boldsymbol y_t\mid\boldsymbol x_{t-1})$$
该权重在给定历史粒子 $\boldsymbol x_{t-1}$ 时完全独立于当期采样点 $\boldsymbol x_t$，因而条件方差降为绝对零。

最优密度并非总能采样的原因在于：分母中的边际积分 $\int p(\boldsymbol x_t\mid\boldsymbol x_{t-1})p(\boldsymbol y_t\mid\boldsymbol x_t)d\boldsymbol x_t$ 在绝大多数非线性或非共轭高维系统中不存在闭式解析解，且条件密度 $p(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)$ 本身难以构造直接抽样器。

□

常见错误做法剖析：误以为最优建议分布能够彻底解决跨期退化（权重方差跨期仍会按指数速率累积增长）；忽视支撑集条件而直接使用局部紧支撑核进行重要性采样。
## 12. 

对于包含 $N=4$ 个粒子的滤波系统，已知上一期归一化权重均等：$W_{t-1}^{(i)}=1/4$（$i=1,2,3,4$）。当期增量比的对数向量为
$$\ln\boldsymbol\alpha_t=(-2,-3,-4,-5)^\top$$

利用 log-sum-exp（LSE）数值稳定技术计算当期对数似然增量。当期边际似然估计量为
$$\widehat p(\boldsymbol y_t\mid\boldsymbol y_{1:t-1})=\sum_{i=1}^4 W_{t-1}^{(i)}\alpha_t^{(i)}=\frac{1}{4}\sum_{i=1}^4\exp(\ln\alpha_t^{(i)})$$
取对数并提取最大对数值 $c=\max_i(\ln\alpha_t^{(i)})=-2$：
$$\ln\widehat p(\boldsymbol y_t\mid\boldsymbol y_{1:t-1})=-\ln 4+c+\ln\left(\sum_{i=1}^4\exp(\ln\alpha_t^{(i)}-c)\right)$$
计算括号内的数值和：
$$S=\sum_{i=1}^4\exp(\ln\alpha_t^{(i)}+2)=e^0+e^{-1}+e^{-2}+e^{-3}\approx 1+0.367879+0.135335+0.049787=1.553001$$
求得对数似然增量为
$$\ln\widehat p(\boldsymbol y_t\mid\boldsymbol y_{1:t-1})\approx -1.386294-2+\ln(1.553001)\approx -3.386294+0.440192=-2.946102$$
四个粒子的当期归一化权重计算为
$$W_t^{(i)}=\frac{W_{t-1}^{(i)}\alpha_t^{(i)}}{\sum_{j=1}^4 W_{t-1}^{(j)}\alpha_t^{(j)}}=\frac{\exp(\ln\alpha_t^{(i)}-c)}{S}$$
代入求得数值解：
$$W_t^{(1)}=\frac{1.000000}{1.553001}\approx 0.643914,\qquad W_t^{(2)}=\frac{0.367879}{1.553001}\approx 0.236883$$
$$W_t^{(3)}=\frac{0.135335}{1.553001}\approx 0.087144,\qquad W_t^{(4)}=\frac{0.049787}{1.553001}\approx 0.032059$$
计算有效样本量（ESS）：
$$\sum_{i=1}^4(W_t^{(i)})^2\approx 0.643914^2+0.236883^2+0.087144^2+0.032059^2\approx 0.414625+0.056114+0.007594+0.001028=0.479361$$
$$\operatorname{ESS}=\frac{1}{\sum_{i=1}^4(W_t^{(i)})^2}\approx\frac{1}{0.479361}\approx 2.0861$$
按照重采样阈值判定准则 $\operatorname{ESS}<N/2=2$，当前 $\operatorname{ESS}\approx 2.0861>2$，因而本期不触发重采样。

重采样后必须将全部粒子权重严格重置为 $1/N$ 的原因在于：重采样过程已通过依概率多项式或系统抽样，将粒子的重要性权重完全转换为在粒子群中的几何复制频数（即粒子数密度）。若不重置权重，高权重样本的概率测度将被二次重复加权放大，导致后验估计量产生致命系统偏差。

该操作不能提高原始目标分布覆盖范围的原因在于：重采样本质上是在已有 $N$ 个离散粒子点集上的有放回二次抽样，它无法凭空在未被采样的状态空间中生成新粒子；相反，它淘汰低权重粒子并复制高权重粒子，必然导致粒子多样性不可逆衰减（粒子耗尽），因而无法扩充目标支撑集的有效覆盖。

常见错误做法剖析：直接计算 $\exp(-5)$ 容易在极端情况下出现浮点下溢；误以为重采样能提高对状态空间未知盲区的探索能力。

## 13. 

当观测似然集中于状态左尾而建议密度仅覆盖右尾时，这严重违背了重要性采样的绝对连续性与支撑集覆盖公理：
$$\operatorname{supp}(p(\boldsymbol x_t\mid\boldsymbol y_{1:t}))\subseteq\operatorname{supp}(q(\boldsymbol x_t\mid\boldsymbol x_{0:t-1},\boldsymbol y_{1:t}))$$
在真实后验概率质量最密集的核心左尾区间，建议密度几乎为零（$q(\boldsymbol x_t)\approx 0$）。

分析三种试图修复手段的无效性：
1. 单纯增加粒子数：在建议密度尾部发生指数级衰减的情况下，左尾区域的抽样命中概率趋近于绝对零。即使将粒子数成百上千倍扩增，依然几乎所有粒子均被投射至不相干的右尾，无法解决测度零概率盲区问题。
2. 单纯提高重采样频率：重采样仅能从已有的离散粒子集合中进行有放回复制，其所能复制的全部是落在右尾的劣质样本，高频重采样只会加速整个粒子云坍缩为右尾的单一孤立点，加剧粒子枯竭。
3. 简单线性放大全部权重：根据归一化公式 $W_t^{(i)}=w_t^{*(i)}/\sum_j w_t^{*(j)}$，对权重乘以任意正标量因子会在分子分母中被完全恒等约除，完全不改变任何粒子的相对权重与退化程度。

多维协同排查步骤：
第一步，粒子几何位置检查。实时输出粒子空间先验分位数与当期观测对应的极大似然解位置，计算两者的标准化马氏距离。若二者距离超过 3 倍标准差且无几何重叠，判定为支撑集发生严重空间错位。
第二步，对数增量比统计监控。统计 $\max_i\ln\alpha_t^{(i)}$ 与样本方差。若全部粒子的增量比均异常跌落至极低水平（如低于正常均值 5 个标准差以上），且对数增量跨粒子方差极端巨大，说明粒子集体落入似然函数极尾。
第三步，有效样本量骤降检验。监测 $\operatorname{ESS}_t$，若其在单期内断崖式下跌逼近 $1.0$，确认发生单粒子垄断。

建议分布改进方案：
构建以当期观测为引导的适应性混合重尾建议分布。利用当期观测 $\boldsymbol y_t$，通过一阶 EKF 或 UKF 得到当期局部后验高斯近似 $N(\widehat{\boldsymbol x}_{t,\mathrm{local}},\boldsymbol P_{t,\mathrm{local}})$，并将建议分布构造为混合形式：
$$q(\boldsymbol x_t)=(1-\epsilon)N(\widehat{\boldsymbol x}_{t,\mathrm{local}},\boldsymbol P_{t,\mathrm{local}})+\epsilon q_{\mathrm{Student-}t}(\boldsymbol x_t;\nu)$$
其中 $\epsilon\in(0.05,0.15)$，重尾 Student-$t$ 分布提供全局宽支撑。
检验方案：在历史数据上通过滚动回测对比新旧建议分布下的有效样本量中位数、对数边际似然方差以及状态覆盖率。

常见错误做法剖析：误以为增加粒子数能突破建议分布零测度盲区；在重要性权重计算中遗漏支撑集有效性校验导致除以零。

## 14. 

给定两制度 Markov 链转移概率矩阵与上一期滤波概率：
$$\boldsymbol P=\begin{pmatrix}0.9&0.1\\0.2&0.8\end{pmatrix},\qquad \boldsymbol\pi_{t-1}=(0.8,0.2)$$
其中矩阵元素定义为 $P_{ij}=\mathbb P(s_t=j\mid s_{t-1}=i)$。

一步预测制度概率行向量通过全概率公式递推计算为
$$\boldsymbol\pi_t^{-}=\boldsymbol\pi_{t-1}\boldsymbol P=(0.8\times 0.9+0.2\times 0.2,\; 0.8\times 0.1+0.2\times 0.8)=(0.72+0.04,\; 0.08+0.16)=(0.76,0.24)$$
当期两种制度下的条件观测密度向量为 $\boldsymbol f_t=(f(y_t\mid s_t=1), f(y_t\mid s_t=2))=(0.4, 1.1)$。
当期全概率预测观测密度（边际似然）为
$$f(y_t\mid\mathcal F_{t-1})=\pi_{t,1}^{-}f(y_t\mid s_t=1)+\pi_{t,2}^{-}f(y_t\mid s_t=2)=0.76\times 0.4+0.24\times 1.1=0.304+0.264=0.568$$
应用 Bayes 定理计算更新后的后验滤波制度概率：
$$\pi_{t,1}=\frac{\pi_{t,1}^{-}f(y_t\mid s_t=1)}{f(y_t\mid\mathcal F_{t-1})}=\frac{0.304}{0.568}=\frac{38}{71}\approx 0.535211$$
$$\pi_{t,2}=\frac{\pi_{t,2}^{-}f(y_t\mid s_t=2)}{f(y_t\mid\mathcal F_{t-1})}=\frac{0.264}{0.568}=\frac{33}{71}\approx 0.464789$$

机制解释：
转移概率矩阵体现了系统的结构先验惯性。由于自保持概率很高（$P_{11}=0.9$），先验预测赋予制度 1 极高的基础权重（$0.76$）。而当期观测密度则提供了外生经验证据，观测密度比值为 $1.1/0.4=2.75$，显著倾向于制度 2。Bayes 更新促使后验判断发生剧烈修正，制度 2 的概率从先验的 $0.24$ 翻倍攀升至 $0.4648$。

常见错误做法剖析：计算预测概率时矩阵乘法顺序颠倒，写成 $\boldsymbol P\boldsymbol\pi_{t-1}^\top$；在计算更新概率时遗漏分母的预测观测密度归一化常数。
## 15. 

在“离散制度加连续线性高斯状态”的跳跃线性混合模型中，设离散制度状态为 $s_t\in\{1,\dots,S\}$。精确滤波密度随时间推移形成指数膨胀高斯混合分布的内在机制如下：
在 $t-1$ 期，若后验密度由对应所有历史制度路径 $s_{1:t-1}$ 的 $S^{t-1}$ 个高斯分量构成；当系统演化至 $t$ 期时，每一个历史分支均依据 Markov 转移矩阵分化出 $S$ 种可能的当期制度状态，进而产生 $S^t$ 条互不相同的完整历史路径。由于每条路径对应的系统转移矩阵与噪声协方差不同，其 Kalman 滤波增益与误差方差均不相同。因此真实后验密度表现为
$$p(\boldsymbol x_t\mid\boldsymbol y_{1:t})=\sum_{s_{1:t}}\mathbb P(s_{1:t}\mid\boldsymbol y_{1:t})N(\widehat{\boldsymbol x}_t(s_{1:t}),\boldsymbol P_t(s_{1:t}))$$
该高斯分量总数随时间指数级发散，使精确解析推导无法长期持续。

两种近似路径的机制对比：
1. 单步制度合并近似（如交互式多模型 IMM 算法）：在每一期开始前，将所有汇聚到当前制度 $s_t=j$ 的分量通过矩匹配强行折叠为一个合成高斯分布。其合成均值与协方差为
$$\widehat{\boldsymbol x}_{t-1}^{0j}=\sum_i \mu_{i\mid j}\widehat{\boldsymbol x}_{t-1}^i,\qquad \boldsymbol P_{t-1}^{0j}=\sum_i \mu_{i\mid j}\left[\boldsymbol P_{t-1}^i+(\widehat{\boldsymbol x}_{t-1}^i-\widehat{\boldsymbol x}_{t-1}^{0j})(\widehat{\boldsymbol x}_{t-1}^i-\widehat{\boldsymbol x}_{t-1}^{0j})^\top\right]$$
该方法将分量总数严格压制在 $S$ 个，但外积展宽项会将截然不同的历史模态差异全部粗暴吸收为单个分量的协方差膨胀。
2. 保留历史路径近似（如固定步长剪枝高斯和滤波或 Rao-Blackwellized 粒子滤波）：保留最近 $L$ 步的历史制度轨迹树（维持 $S^L$ 个分量），仅对更久远的历史分支进行聚类合并。该方法能有效维持多峰分布的真实几何形态，防止不同轨道过早被均值平均化。

暴露过度合并缺陷的数值设计：
设标量系统在制度 1 下无漂移且极度稳定：$x_t=x_{t-1}+w_{1,t}$（$Q_1=0.01$）；在制度 2 下具有大幅正漂移：$x_t=x_{t-1}+10+w_{2,t}$（$Q_2=0.01$）。观测方程为 $y_t=x_t+e_t$（$R=0.04$）。初始先验为 $x_0\sim N(0,0.01)$。
若在 $t=1$ 期观测完全缺失，真实状态形成相距为 10 的两个孤立狭窄高斯峰（分别位于 0 与 10 附近）。若采取过度单峰合并，所得合成均值为 $5$，合成方差因吸收外积差剧烈暴增至 $\approx 25$。在 $t=2$ 期若出现观测 $y_2=0$，多峰模型能够立即以极高后验概率锁定制度 1 分量，恢复高精度滤波；而过度合并模型由于先验均值被锚定在错误的中点 5 且方差过度膨胀，产生虚假大创新与过度增益抖动，彻底丧失对真实微观状态轨道的判别力。

常见错误做法剖析：误以为高斯混合的矩匹配合并是无损近似，遗漏了外积展宽项会导致方差膨胀进而使后续滤波增益严重失真。

## 16. 

对于时变资产对冲模型，状态为标量对冲系数 $\beta_t$：
$$\beta_t=\beta_{t-1}+\eta_t,\qquad \eta_t\sim N(0,Q),\quad Q=0.0004$$
观测方程为资产对冲收益关系：
$$r_t^A=\beta_t r_t^B+\varepsilon_t,\qquad \varepsilon_t\sim N(0,R),\quad R=0.0025$$
对应标量时变观测矩阵 $H_t=r_t^B=0.02$。已知当期预测均值 $\widehat\beta_t^{-}=1.10$，预测方差 $P_t^{-}=0.01$，当期观测为 $y_t=r_t^A=0.025$。

各项指标解析推导与计算如下：
1. 观测预测值：
$$\widehat y_t^{-}=H_t\widehat\beta_t^{-}=0.02\times 1.10=0.022$$
2. 创新（预测误差）：
$$\nu_t=y_t-\widehat y_t^{-}=0.025-0.022=0.003$$
3. 创新理论方差：
$$V_t=H_t^2 P_t^{-}+R=(0.02)^2\times 0.01+0.0025=0.000004+0.0025=0.002504$$
4. Kalman 增益：
$$K_t=\frac{P_t^{-}H_t}{V_t}=\frac{0.01\times 0.02}{0.002504}=\frac{0.0002}{0.002504}=\frac{25}{313}\approx 0.079872$$
5. 滤波后对冲系数均值：
$$\widehat\beta_t=\widehat\beta_t^{-}+K_t\nu_t=1.10+\frac{25}{313}\times 0.003=1.10+\frac{0.075}{313}\approx 1.100240$$
6. 滤波后状态方差：
$$P_t=(1-K_t H_t)P_t^{-}=\left(1-\frac{25}{313}\times 0.02\right)\times 0.01=\left(1-\frac{0.5}{313}\right)\times 0.01=\frac{312.5}{313}\times 0.01\approx 0.009984$$

噪声混淆影响讨论：
若在建模中错误地将观测噪声 $\varepsilon_t$ 归因为过程噪声 $\eta_t$（即设定了过大的 $Q$ 与过小的 $R$），比值 $Q/R$ 将被人为放大数倍。由此导致：
第一，Kalman 增益 $K_t$ 被异常放大，滤波器错误地将资产收益中的瞬时微观结构白噪声判定为对冲系数的永久性结构漂移；
第二，后续对冲反应速度虚假过敏，$\widehat\beta_t$ 随当期行情的微小扰动频繁剧烈摆动，引发交易组合的高频虚假调仓，大幅推升实际交易成本与换手滑点，破坏对冲稳定性。

常见错误做法剖析：计算创新时遗漏自变量 $r_t^B$，误写为 $r_t^A-1.10$；在计算创新方差时忘记对标量观测系数 $H_t$ 平方。
## 17. 

目标期货对冲仓位优化问题中，给定理论目标仓位 $h_t^*=-0.85$ 与上一期真实物理执行仓位 $h_{t-1}^{\mathrm{exec}}=-0.60$。目标损失函数由跟踪偏离二次惩罚与真实物理换手二次成本加权构成：
$$J(h)=\lambda(h-h_t^*)^2+c(h-h_{t-1}^{\mathrm{exec}})^2$$
其中 $\lambda>0$ 为跟踪误差厌恶系数，$c>0$ 为换手冲击惩罚系数。

求目标函数关于当前执行仓位 $h$ 的一阶最优条件：
$$\frac{\partial J(h)}{\partial h}=2\lambda(h-h_t^*)+2c(h-h_{t-1}^{\mathrm{exec}})=0$$
解得无交易带时的解析最优执行仓位为目标仓位与历史执行仓位的凸组合：
$$h_t^{\mathrm{exec}}=\frac{\lambda}{\lambda+c}h_t^*+\frac{c}{\lambda+c}h_{t-1}^{\mathrm{exec}}$$
代入数值可得
$$h_t^{\mathrm{exec}}=\frac{-0.85\lambda-0.60c}{\lambda+c}=-0.60-\frac{\lambda}{\lambda+c}\times 0.25$$

推导存在交易带时保持原仓位不变的条件：
在实际撮合交易中，交易摩擦通常包含线性佣金或固定买卖价差（即形如 $\gamma|h-h_{t-1}^{\mathrm{exec}}|$ 的一阶不可微惩罚）。此时复合目标函数变为
$$\widetilde J(h)=\lambda(h-h_t^*)^2+\gamma|h-h_{t-1}^{\mathrm{exec}}|$$
当且仅当次微分包含零点 $0\in\partial\widetilde J(h_{t-1}^{\mathrm{exec}})$ 时，系统最优选择保持原仓位不变。计算次微分集合：
$$\partial\widetilde J(h_{t-1}^{\mathrm{exec}})=2\lambda(h_{t-1}^{\mathrm{exec}}-h_t^*)+[-\gamma,\gamma]$$
由此得出保持原执行仓位不变的充分必要条件为
$$|h_t^*-h_{t-1}^{\mathrm{exec}}|\le\frac{\gamma}{2\lambda}$$
若定义交易带半宽为 $\Delta=\frac{\gamma}{2\lambda}$，代入实际数值 $|-0.85-(-0.60)|=0.25$，即要求系统设定的半宽满足 $\Delta\ge 0.25$（或等价于线性摩擦参数满足 $\gamma\ge 0.5\lambda$）。

不能用先验预测仓位误差 $c(h-\widehat h_t^{-})^2$ 替代真实换手成本的核心原因在于：
1. $\widehat h_t^{-}$ 是滤波器在未吸收当期观测时的内部数学预测量，不代表交易账户中真实持有的物理资产头寸；
2. 经纪商手续费、市场冲击与滑点摩擦完全由物理账户的实际调仓差额 $|h-h_{t-1}^{\mathrm{exec}}|$ 决定；
3. 若用先验预测值替代，不仅无法控制实际资金账户的交易摩擦，而且当模型预测自身发生波动时，会诱导出虚假的“摩擦项”，造成与真实交易成本脱节的错误资产配置。

常见错误做法剖析：混淆真实执行历史仓位与算法先验预测仓位；误以为纯二次成本函数能够产生不调仓的静止区间（二次成本只会按比例平滑缩小调仓幅度，必须依赖一阶不可微项或固定门槛才能生成无交易带）。

## 18. 

对于二维观测系统，给定当期创新向量与创新理论协方差矩阵：
$$\boldsymbol\nu_t=\begin{pmatrix}1\\-1\end{pmatrix},\qquad \boldsymbol V_t=\begin{pmatrix}2&0\\0&0.5\end{pmatrix}$$

计算过程如下：
1. 对称正定协方差矩阵的 Cholesky 分解满足 $\boldsymbol V_t=\boldsymbol L_t\boldsymbol L_t^\top$。由于 $\boldsymbol V_t$ 为对角阵，下三角因子为
$$\boldsymbol L_t=\begin{pmatrix}\sqrt{2}&0\\0&\frac{\sqrt{2}}{2}\end{pmatrix}$$
标准化创新向量为
$$\widetilde{\boldsymbol\nu}_t=\boldsymbol L_t^{-1}\boldsymbol\nu_t=\begin{pmatrix}\frac{1}{\sqrt{2}}&0\\0&\sqrt{2}\end{pmatrix}\begin{pmatrix}1\\-1\end{pmatrix}=\begin{pmatrix}\frac{\sqrt{2}}{2}\\-\sqrt{2}\end{pmatrix}$$
2. 归一化创新平方（Mahalanobis 统计量）为
$$D_t=\boldsymbol\nu_t^\top\boldsymbol V_t^{-1}\boldsymbol\nu_t=\widetilde{\boldsymbol\nu}_t^\top\widetilde{\boldsymbol\nu}_t=\left(\frac{\sqrt{2}}{2}\right)^2+(-\sqrt{2})^2=\frac{1}{2}+2=2.5$$
3. 单期显著性检验：
在线性高斯假设下，$D_t\sim\chi^2(2)$。在显著性水平 $\alpha=0.05$ 下，自由度为 2 的卡方分布右尾临界值为 $\chi_{0.05}^2(2)=5.991$。因为计算值 $D_t=2.5<5.991$，所以在 $5\%$ 显著性水平下不能拒绝原假设，表明当期创新处于正常统计波动范围内，未呈现异常跳变。

连续 20 期独立创新的滚动窗口检验：
设各期创新统计量相互独立且同分布：$D_\tau\sim\chi^2(2)$（$\tau=t-19,\dots,t$）。根据卡方分布关于独立随机变量求和的保真可加性，20 期滑动窗口统计量之和服从：
$$S_{20}=\sum_{\tau=t-19}^t D_\tau\sim\chi^2(2\times 20)=\chi^2(40)$$
因此检验窗口总和应严格采用自由度为 40 的卡方分布进行上尾检验。

不能重复套用 20 次单期结论而不做多重检验校正的原因：
若在 20 个连续期上分别独立套用显著性水平为 $\alpha=0.05$ 的单期临界值检验，在模型完全正确的零假设下，20 期中至少出现一次误报异常（第一类错误）的总体族系错误率（FWER）为
$$\mathrm{FWER}=1-(1-\alpha)^{20}=1-0.95^{20}\approx 1-0.358486=0.641514$$
即发生虚警的总体概率高达 $64.15\%$。若不进行多重检验校正（如 Bonferroni 校正或 FDR 控制）或采用窗口联合卡方检验，单一阈值的高频套用将导致系统产生严重的虚假警报泛滥。

常见错误做法剖析：计算 $D_t$ 时未除以方差直接计算欧氏范数 $\boldsymbol\nu_t^\top\boldsymbol\nu_t$；计算窗口总自由度时误遗漏观测自身维度而将自由度错记为 20。
## 19. 

对于实时状态空间监控系统中出现的五类异常现象，其根源机理与排查逻辑解析如下：

各现象的可能成因（每类列举两类核心根源）：
1. 创新均值持续为正：其一，系统状态方程或观测方程遗漏了确定性漂移项、常数项或无风险基准利率；其二，数据采集存在时点对齐偏差，例如使用了滞后公布的价格或带有系统性结算偏差的报价。
2. 创新一阶自相关显著：其一，状态转移方程阶数欠拟合（例如将高阶自回归过程强行简化为一阶随机游走），遗漏了深层未建模状态动力学；其二，观测噪声序列本身存在序列自相关性（色噪声），违背了白噪声假设。
3. 归一化创新平方 $D_t$ 长期过小：其一，观测噪声协方差 $\boldsymbol R$ 或过程噪声协方差 $\boldsymbol Q$ 被大幅人为高估，导致理论创新协方差 $\boldsymbol V_t$ 虚高；其二，数据预处理中使用了过度平滑的人工构造插值，或产生了前向未来信息泄露。
4. 滤波协方差出现小负特征值：其一，采用代数简化的标准更新式 $(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}$，在有限精度浮点运算中发生灾难性数值消去；其二，各期更新后未强制实施对称化操作，或高维状态间存在极大多重共线性导致数值奇异。
5. 粒子有效样本量骤降：其一，观测似然方差极小而建议分布与高似然核心区域发生严重空间错位（离群值冲击）；其二，状态维度较高导致粒子云发生维度灾难，权重迅速坍缩至单个粒子。

系统化分层排查顺序：
第一阶段（数据时点与数据流核验）：核实时间戳时区是否一致、是否存在未来函数与数据偷价、宏观指标发布是否包含未经事实发生的事后修订、数据缺失时是否误填补为零。
第二阶段（数值实现与代数结构核验）：检查协方差更新是否使用保证正定性的 Joseph 稳定形式或 Cholesky 平方根滤波、是否每步执行对称化矩阵操作、粒子滤波增量权重是否基于 log-sum-exp 稳定算法计算。
第三阶段（模型设定与参数标定）：检验系统矩阵 $\boldsymbol F$ 与 $\boldsymbol H$ 的设定合理性、检验创新序列的正态性与正交性、基于样本残差重新校准 $\boldsymbol Q$ 与 $\boldsymbol R$。
第四阶段（算法机理与建议核调优）：针对非线性滤波器调整无迹变换参数，或针对粒子滤波构建融合当期观测信息的适应性混合建议核。

区分三类关键异常的实证证据：
- 观测噪声高估的判据：$D_t$ 均值持续显著低于理论自由度期望，且创新序列的一阶与高阶自相关系数均严格统计不显著（创新保持白噪声纯度），但滤波增益异常偏低，状态响应过度迟钝。
- 过程噪声低估的判据：创新序列表现出显著的正一阶自相关（系统对趋势跟踪严重滞后），平滑后验残差方差显著大于先验预测残差理论方差，且状态滤波轨迹呈现明显的系统性时延。
- 建议分布退化的判据：仅在非线性粒子滤波中出现有效样本量断崖式暴跌至 1，而在对应的局部高斯近似（EKF/UKF）中创新统计量基本保持平稳；对数增量权重方差极大且集中在极少数样本上。

常见错误做法剖析：协方差出现负特征值时仅在对角线上添加微小正数（jitter）掩盖，未从根本上采用 Joseph 对称算法消除数值消去；误将创新均值偏离判定为噪声方差标定问题。

## 20. 

**证明**

在一般线性滤波框架中，设状态先验预测误差为 $\boldsymbol e_t^{-}=\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-}$，其协方差为 $\boldsymbol P_t^{-}=\mathbb E[\boldsymbol e_t^{-}(\boldsymbol e_t^{-})^\top]$。给定任意实矩阵增益 $\boldsymbol K_t$，滤波状态更新式为
$$\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_t^{-}+\boldsymbol K_t(\boldsymbol y_t-\boldsymbol H_t\widehat{\boldsymbol x}_t^{-})$$
将观测方程 $\boldsymbol y_t=\boldsymbol H_t\boldsymbol x_t+\boldsymbol e_t$ 代入上式，并利用状态误差定义 $\boldsymbol x_t=\widehat{\boldsymbol x}_t^{-}+\boldsymbol e_t^{-}$，可得
$$\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_t^{-}+\boldsymbol K_t(\boldsymbol H_t(\widehat{\boldsymbol x}_t^{-}+\boldsymbol e_t^{-})+\boldsymbol e_t-\boldsymbol H_t\widehat{\boldsymbol x}_t^{-})=\widehat{\boldsymbol x}_t^{-}+\boldsymbol K_t\boldsymbol H_t\boldsymbol e_t^{-}+\boldsymbol K_t\boldsymbol e_t$$
由此推导出滤波状态估计误差向量为
$$\boldsymbol e_t=\boldsymbol x_t-\widehat{\boldsymbol x}_t=\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol H_t\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol e_t=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol e_t$$
令矩阵记号 $\boldsymbol A_t=\boldsymbol I-\boldsymbol K_t\boldsymbol H_t$，滤波误差可紧凑表述为
$$\boldsymbol e_t=\boldsymbol A_t\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol e_t$$
根据状态空间模型的基本假定，观测噪声 $\boldsymbol e_t$ 与先验状态误差 $\boldsymbol e_t^{-}$ 相互独立，因而交叉项外积的数学期望几乎必然为零，即 $\mathbb E[\boldsymbol e_t^{-}(\boldsymbol e_t)^\top]=\boldsymbol 0$。计算滤波协方差矩阵：
$$\boldsymbol P_t=\mathbb E[\boldsymbol e_t\boldsymbol e_t^\top]=\mathbb E[(\boldsymbol A_t\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol e_t)(\boldsymbol A_t\boldsymbol e_t^{-}-\boldsymbol K_t\boldsymbol e_t)^\top]$$
$$=\boldsymbol A_t\mathbb E[\boldsymbol e_t^{-}(\boldsymbol e_t^{-})^\top]\boldsymbol A_t^\top+\boldsymbol K_t\mathbb E[\boldsymbol e_t\boldsymbol e_t^\top]\boldsymbol K_t^\top=\boldsymbol A_t\boldsymbol P_t^{-}\boldsymbol A_t^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top$$
此即任意增益下的 Joseph 协方差表达形式。

最优 Kalman 增益下的等价性推导：
当采用理论最优 Kalman 增益 $\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol V_t^{-1}$（其中 $\boldsymbol V_t=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t$）时，展开 Joseph 形式：
$$\boldsymbol P_t=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top$$
$$=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol H_t\boldsymbol P_t^{-}-\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol K_t^\top+\boldsymbol K_t(\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t)\boldsymbol K_t^\top$$
$$=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol H_t\boldsymbol P_t^{-}-\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol K_t^\top+\boldsymbol K_t\boldsymbol V_t\boldsymbol K_t^\top$$
将最优增益性质 $\boldsymbol K_t\boldsymbol V_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top$ 代入最后一项中，得到
$$\boldsymbol K_t\boldsymbol V_t\boldsymbol K_t^\top=\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol K_t^\top$$
上式与第三项完全相消，最终化简为常见教科书形式：
$$\boldsymbol P_t=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol H_t\boldsymbol P_t^{-}=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}$$

在任意次优增益下不能随意删去观测噪声项的原因在于：若 $\boldsymbol K_t$ 未严格等于最优增益（如受控限幅增益、鲁棒稳健增益或固定常数增益），$\boldsymbol K_t\boldsymbol V_t\ne\boldsymbol P_t^{-}\boldsymbol H_t^\top$，后两项无法精确对消。删去 $\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top$ 将导致人为遗漏观测噪声注入的方差，严重低估估计误差，并使计算协方差失去正定性。

关于对称半正定性与数值意义的证明：
在 Joseph 形式 $\boldsymbol P_t=\boldsymbol A_t\boldsymbol P_t^{-}\boldsymbol A_t^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top$ 中，已知先验方差 $\boldsymbol P_t^{-}\succeq\boldsymbol 0$ 且噪声协方差 $\boldsymbol R_t\succeq\boldsymbol 0$。对任意非零向量 $\boldsymbol z$，二次型满足
$$\boldsymbol z^\top\boldsymbol P_t\boldsymbol z=(\boldsymbol A_t^\top\boldsymbol z)^\top\boldsymbol P_t^{-}(\boldsymbol A_t^\top\boldsymbol z)+(\boldsymbol K_t^\top\boldsymbol z)^\top\boldsymbol R_t(\boldsymbol K_t^\top\boldsymbol z)\ge 0$$
两项均为天然对称半正定的二次型，其和严格保持对称半正定性。在有限精度计算机实现中，简化形式 $(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}$ 本质为两正定矩阵之差，极易发生灾难性有效位丢失导致微小负特征值；而 Joseph 形式通过显式平方和结构，彻底消除了负特征值风险并保证了数值稳定性。

□

常见错误做法剖析：在推导 Joseph 形式时遗漏噪声独立性交叉项为零的说明；误以为教科书简化公式在任何增益下均成立。
## 21. 

实时模型比较实验设计旨在基于样本外一步预测误差似然（Out-of-Sample Predictive Likelihood），客观评估固定载荷（模型 A）、随机游走载荷（模型 B）与两制度 Markov 载荷（模型 C）的动态拟合与风险预警能力。

实验全流程要素设计如下：
1. 模型架构设定：
- 模型 A（固定载荷）：假定状态恒定 $\boldsymbol\beta_t=\boldsymbol\beta$，过程噪声协方差 $\boldsymbol Q=\boldsymbol 0$。
- 模型 B（时变随机游走载荷）：设定 $\boldsymbol\beta_t=\boldsymbol\beta_{t-1}+\boldsymbol w_t$，其中 $\boldsymbol w_t\sim N(\boldsymbol 0,\boldsymbol Q)$。
- 模型 C（两制度切换载荷）：引入离散制度变量 $s_t\in\{1,2\}$，在平稳制度与冲击制度下分别具有不同的状态噪声协方差 $\boldsymbol Q(s_t)$。
2. 估计窗口与滚动时点：采用固定长度为 $W=252$ 个交易日的滑动窗口。在 $t-1$ 日交易收盘后，仅使用截止到 $t-1$ 日的信息集 $\mathcal F_{t-1}$ 通过最大似然估计（MLE）更新静态超参数，并在 $t$ 日开盘前基于前向递推生成 $t$ 日的一步预测观测均值 $\widehat{\boldsymbol y}_t^{-}$ 与创新协方差 $\boldsymbol V_t$。
3. 宏观数据发布日期与版本管理：严格采用点时间（Point-in-Time）宏观数据库。所有宏观经济指标（如 CPI、工业增加值）必须严格绑定其历史真实首发时间戳与未经事后修正的原始发布初值（vintage 1st release），严禁在历史回测中读入未来发布的统计修正值。
4. 缺失发布的选择矩阵处理：定义时变选择矩阵 $\boldsymbol W_t\in\mathbb R^{p_t\times p}$。在宏观数据未发布的绝大多数交易日，选择矩阵自动剔除对应行，仅对日频资产收益序列计算创新与更新状态；在宏观指标首发日，动态扩充选择矩阵行数以吸收新信息。
5. 交易摩擦与评价指标：
- 统计指标：累积样本外对数预测得分（Cumulative Out-of-Sample Log-Predictive Score, $\sum_{t=1}^T \ln p(\boldsymbol y_t\mid\mathcal F_{t-1})$）、标准化创新二次型卡方检验与各阶残差自相关系数。
- 经济指标：在设定 5 bps 线性佣金与二次市场冲击摩擦下，评估基于三种模型构建的时变对冲组合的净夏普比率、最大回撤与年化换手率。

杜绝前视偏差（Lookahead Bias）的关键准则：
- 数据库层面，严格隔离事后修订数据，坚持 Point-in-Time 真实版本切片；
- 算法层面，模型 C 的制度判断必须严格基于前向单向滤波概率 $\mathbb P(s_t\mid\mathcal F_{t-1})$，严禁在回测中引入包含未来全样本信息的平滑概率 $\mathbb P(s_t\mid\mathcal F_T)$；
- 调参层面，超参数寻优仅在滚动估计窗口内执行，严禁利用全周期数据进行超前全局优化。

对数预测得分接近时的校准差异检验方案：
若两模型的累积对数似然得分接近，应通过以下两步进行精细化分布校准判别：
第一步，概率积分变换（PIT）与 Berkowitz 检验。计算样本外观测的一步预测累积概率分布值 $u_t=F_t(y_t\mid\mathcal F_{t-1})$。若模型预测分布完美校准，序列 $\{u_t\}$ 必须在统计上独立且严格服从 $[0,1]$ 上的均匀分布。通过检验其逆正态变换的均值、方差及自相关性，判断预测区间是否存在系统性过窄（低估风险）或过宽（高估风险）。
第二步，Diebold–Mariano / Giacomini–White 显著性检验。检验两者预测得分差值序列在统计上是否显著偏离零，并进一步结合非对称分位数损失函数（Tick Loss），重点评估两模型在左侧极端市场暴跌时的尾部预警精确度。

常见错误做法剖析：使用经过去除噪音修订后的宏观终值数据作为历史输入造成未来信息泄露；在回测中误用平滑概率给历史定制度；仅凭单一对数得分无法辨识两模型是否具有相同的概率校准质量。

## 22. 

针对资产时变 $\beta$ 跨制度切换、收益重尾、宏观变量异步发布及调仓摩擦约束的多维量化环境，综合系统设计方案如下：

一、状态空间模型与实时信息架构：
1. 离散制度层：设定两状态 Markov 链 $s_t\in\{1,2\}$（1 为低频稳态漂移制度，2 为高频剧烈调整制度），具有转移概率矩阵 $\boldsymbol\Pi$。
2. 连续状态层：状态向量由时变对冲系数及其变化率构成 $\boldsymbol x_t=(\beta_t, \Delta\beta_t)^\top$。状态转移方程满足
$$\boldsymbol x_t=\boldsymbol F(s_t)\boldsymbol x_{t-1}+\boldsymbol w_t(s_t),\qquad \boldsymbol w_t(s_t)\sim N(\boldsymbol 0,\boldsymbol Q(s_t))$$
其中 $\boldsymbol Q(2)\gg\boldsymbol Q(1)$ 以表征调整制度下的高不确定性。
3. 观测方程与重尾机制：观测向量由资产日收益与宏观发布构成 $\boldsymbol y_t^*=(r_t, \boldsymbol z_{t,\mathrm{macro}}^\top)^\top$。为刻画金融收益的厚尾特征，收益观测误差服从具有自由度为 $\nu$ 的 Student-$t$ 分布（在状态空间中表述为尺度正态混合分布）：
$$r_t=\beta_t r_t^M+\boldsymbol H_{\mathrm{macro}}\boldsymbol x_t+e_t,\qquad e_t\sim t_\nu(0,\sigma_e^2(s_t))$$
结合时变选择矩阵 $\boldsymbol W_t$，当期有效观测为 $\boldsymbol y_t=\boldsymbol W_t\boldsymbol y_t^*$。

二、算法引擎选择与核心接口：
选用序列重要性重采样（SMC）粒子滤波作为推断核心。原因在于：观测具有显著非高斯厚尾特性（Student-$t$ 分布），传统 EKF/UKF 无法刻画厚尾似然在面对极端离群值时的红利饱和（redescending score）特征，而粒子滤波能够无偏逼近任意非线性非高斯混合后验。
- 递推接口：
在每一期，粒子 $i=1,\dots,N$ 首先依据转移概率矩阵抽样预测制度状态 $s_t^{(i)}\sim\mathbb P(s_t\mid s_{t-1}^{(i)})$，随后按对应制度演化连续状态 $\boldsymbol x_t^{(i)}\sim p(\boldsymbol x_t\mid\boldsymbol x_{t-1}^{(i)},s_t^{(i)})$。
计算每个粒子的未归一化对数增量权重：
$$\ln\alpha_t^{(i)}=\ln p(\boldsymbol y_t\mid\boldsymbol x_t^{(i)},s_t^{(i)})=c(\nu)-\frac{\nu+1}{2}\ln\left(1+\frac{(r_t-\beta_t^{(i)}r_t^M-\dots)^2}{\nu\sigma_e^2(s_t^{(i)})}\right)$$
利用 log-sum-exp 稳定技术计算归一化权重 $W_t^{(i)}$。
- 支撑集有效性监控：
定义极差指标 $\Delta\ln\alpha_t=\max_i\ln\alpha_t^{(i)}-\min_i\ln\alpha_t^{(i)}$。若该值超过阈值或 $\operatorname{ESS}_t<0.25N$，判定当前粒子云遭遇支撑集错位冲击，立即启动局部自适应混合建议分布，向粒子群注入具有宽方差的 Cauchy 扰动样本，保证概率支撑完全覆盖。

三、换手成本与交易带处理：
基于后验加权样本提取期望对冲系数 $\widehat\beta_t=\sum_{i=1}^N W_t^{(i)}\beta_t^{(i)}$，设定理论目标仓位 $h_t^*=-\widehat\beta_t$。
面对包含线性佣金 $\gamma$ 与平方冲击 $c$ 的真实执行函数，当期优化目标为
$$\min_h \lambda(h-h_t^*)^2+\gamma|h-h_{t-1}^{\mathrm{exec}}|+c(h-h_{t-1}^{\mathrm{exec}})^2$$
由此推导出以旧执行仓位为中心的动态不对称交易带 $[h_{t-1}^{\mathrm{exec}}-\Delta_t, h_{t-1}^{\mathrm{exec}}+\Delta_t]$，其中半宽满足 $\Delta_t=\frac{\gamma}{2\lambda}$。若 $|h_t^*-h_{t-1}^{\mathrm{exec}}|\le\Delta_t$，系统保持原物理仓位不变（$h_t^{\mathrm{exec}}=h_{t-1}^{\mathrm{exec}}$）；仅当目标穿透交易带边界时，向带边缘调仓，最大化压缩摩擦滑点。

四、真正样本外多维故障解耦诊断：
利用全新未参与训练的样本外测试流，通过正交统计特征严格区分三类误设：
1. 制度误设判据：系统在平稳期频繁虚警跳变至高波动制度，或在真实市场震荡发生后出现数天的迟钝滞后。实证上表现为 Markov 制度先验预测似然持续产生系统性惩罚，且粒子群的离散制度熵跨期大幅波动，但单期观测条件概率积分变换仍保持对称。
2. 厚尾误设判据：仅在孤立极端离群点发生日，若误设为高斯模型，增益会误将极端观测当作真实状态跃迁而引发滤波轨迹的大幅假跳，并在随后数日发生剧烈均值回归；若为 Student-$t$ 厚尾模型，单期极端创新的影响函数自动平抑，状态轨迹保持稳健。通过检验标准化创新残差在 $1\%$ 与 $99\%$ 极值分位数的超额穿透率，若穿透频数显著高于理论值且残差具备超额峰度，确认为厚尾误设。
3. 数值退化判据：在市场完全平稳且无任何极端行情的日常交易区间，粒子有效样本量 $\operatorname{ESS}$ 依然发生不可逆的单调衰减并趋向于 1，唯一互异粒子数比例（粒子多样性）跌破 $5\%$。此现象与市场行情无关，确认为离散重采样循环中的数值枯竭退化。

常见错误做法剖析：在具有厚尾非线性时强行使用高斯 EKF 导致离群值过度拉扯状态；调仓时误用算法先验预测仓位作为换手基准；将样本外离群值冲击简单归因于制度切换而忽视厚尾似然饱和机制。