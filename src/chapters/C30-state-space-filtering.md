# 第30章　状态空间模型与滤波

金融时间序列中真正驱动价格的量往往不可直接观测：真实的期望收益、随时间漂移的因子载荷、瞬时波动率、市场对风险的定价水平。可观测的只是被测量噪声、非同步交易与聚合误差污染的价格、成交量与代理指标。状态空间模型把「不可观测的状态如何演化」与「可观测量如何依赖状态」拆成两个方程，于是全部推断问题都化为在一个递增信息流上不断修正的条件期望问题。本章建立在前面若干结果之上：第13章说明条件期望是均方误差意义下的最优预测，第5章给出 Hilbert 空间中的正交投影与投影定理，第25章的滤波概念规定了「$t$ 时刻可用信息」的确切含义，第12章给出多元正态分布在线性变换与条件化下的封闭性，第29章的随机波动率模型与第27章的线性随机微分方程则是本章要处理的典型系统。30.1 节给出模型的数学形式、把 ARMA 过程改写成状态空间形式的一般构造以及表示的非唯一性与可辨识性；30.2 节在平方可积随机变量构成的 Hilbert 空间中建立递推预测的结构，引出正交新息与一步预测误差协方差的递推；30.3 节由此完整推导 Kalman 滤波的预测步与更新步，说明增益公式究竟从何而来，并讨论滤波、预测与平滑三种估计的区别以及稳态滤波与代数 Riccati 方程。

## 30.1 状态空间表示

状态空间表示的核心思想是引入一个维度可以与可观测量完全不同的辅助向量，使它承载全部关于未来的信息，从而使过程具有 Markov 结构。一旦模型写成这种形式，任意多步预测、似然计算、缺失值处理与多指标混频融合都归结为同一套递推代数。

**定义 30.1（状态空间模型）**

设 $\{\boldsymbol y_t\}_{t\ge 1}$ 是取值于 $\mathbb R^p$ 的可观测过程，$\{\boldsymbol\alpha_t\}_{t\ge 0}$ 是取值于 $\mathbb R^m$ 的不可观测过程，称为状态向量。称 $(\{\boldsymbol\alpha_t\},\{\boldsymbol y_t\})$ 构成一个状态空间模型，若存在两列白噪声 $\{\boldsymbol\eta_t\}\subset\mathbb R^k$ 与 $\{\boldsymbol\varepsilon_t\}\subset\mathbb R^p$，以及可测映射 $f_t:\mathbb R^m\times\mathbb R^k\to\mathbb R^m$、$g_t:\mathbb R^m\times\mathbb R^p\to\mathbb R^p$，使得对每个 $t\ge 1$ 有

$$
\boldsymbol\alpha_t=f_t(\boldsymbol\alpha_{t-1},\boldsymbol\eta_t),\qquad \boldsymbol y_t=g_t(\boldsymbol\alpha_t,\boldsymbol\varepsilon_t),
\tag{30.1}
$$

并且 $\boldsymbol\eta_t$ 与 $\sigma(\boldsymbol\alpha_0,\boldsymbol\eta_1,\dots,\boldsymbol\eta_{t-1},\boldsymbol\varepsilon_1,\dots,\boldsymbol\varepsilon_{t-1})$ 独立，$\boldsymbol\varepsilon_t$ 与 $\sigma(\boldsymbol\alpha_0,\boldsymbol\eta_1,\dots,\boldsymbol\eta_t,\boldsymbol\varepsilon_1,\dots,\boldsymbol\varepsilon_{t-1})$ 独立。第一个方程称为状态方程，第二个方程称为观测方程；$\boldsymbol\eta_t$ 称为状态噪声或系统噪声，$\boldsymbol\varepsilon_t$ 称为观测噪声或测量误差。

由式（30.1）中的独立性假设可以直接读出两条结构性结论。其一，状态过程 $\{\boldsymbol\alpha_t\}$ 是 Markov 过程。事实上，逐次代入可知存在可测映射 $\Phi_t$ 使 $\boldsymbol\alpha_t=\Phi_t(\boldsymbol\alpha_0,\boldsymbol\eta_1,\dots,\boldsymbol\eta_t)$；而对任意 Borel 集 $B\subset\mathbb R^m$，由 $\boldsymbol\alpha_{t+1}=f_{t+1}(\boldsymbol\alpha_t,\boldsymbol\eta_{t+1})$ 与 $\boldsymbol\eta_{t+1}$ 独立于 $\sigma(\boldsymbol\alpha_0,\dots,\boldsymbol\alpha_t)$ 得

$$
\mathbb P\big(\boldsymbol\alpha_{t+1}\in B\mid \sigma(\boldsymbol\alpha_0,\dots,\boldsymbol\alpha_t)\big)=\mathbb P\big(\boldsymbol\alpha_{t+1}\in B\mid \sigma(\boldsymbol\alpha_t)\big).
$$

其二，给定 $\boldsymbol\alpha_t$，观测量 $\boldsymbol y_t$ 与 $\mathcal F_{t-1}$ 条件独立，因此状态携带了关于未来观测的全部信息。这正是 Markov 结构带来的建模便利：无论历史多长，一步预测只需要状态的当前后验分布。

记 $\mathcal F_t=\sigma(\boldsymbol y_1,\dots,\boldsymbol y_t)$ 为由观测生成的滤波（信息流），并约定 $\mathcal F_0$ 只含初始信息 $\sigma(\boldsymbol\alpha_0)$ 的平凡化部分。本章的核心计算对象是条件期望 $\mathbb E[\boldsymbol\alpha_t\mid\mathcal F_s]$ 与条件协方差矩阵。当 $s=t$ 时称为滤波，当 $s>t$ 时称为预测，当 $s<t$ 时称为平滑；三者的数学难度依次递增，30.3 节先解决前两种，平滑留待 30.4 节。
**定义 30.2（线性高斯状态空间模型）**

若式（30.1）中的映射 $f_t$ 与 $g_t$ 关于第一个变量是仿射的，噪声与初始状态都服从联合正态分布且互不相关，则称模型为线性高斯状态空间模型，其标准写法是

$$
\begin{aligned}
\boldsymbol\alpha_t&=\boldsymbol T_t\boldsymbol\alpha_{t-1}+\boldsymbol c_t+\boldsymbol R_t\boldsymbol\eta_t,&&\boldsymbol\eta_t\sim N(\boldsymbol 0,\boldsymbol Q_t),\\
\boldsymbol y_t&=\boldsymbol Z_t\boldsymbol\alpha_t+\boldsymbol d_t+\boldsymbol\varepsilon_t,&&\boldsymbol\varepsilon_t\sim N(\boldsymbol 0,\boldsymbol H_t),
\end{aligned}
\tag{30.2}
$$

其中初始状态 $\boldsymbol\alpha_0\sim N(\boldsymbol a_0,\boldsymbol P_0)$ 与全部噪声独立；$\{\boldsymbol\eta_t\}$ 与 $\{\boldsymbol\varepsilon_t\}$ 各自在时间上互不相关，两列之间也互不相关。矩阵 $\boldsymbol T_t$（$m\times m$）称为状态转移矩阵，$\boldsymbol R_t$（$m\times k$）称为状态噪声载入矩阵，$\boldsymbol Q_t$（$k\times k$，对称半正定）是状态噪声的协方差，$\boldsymbol Z_t$（$p\times m$）称为设计矩阵或载荷矩阵，$\boldsymbol H_t$（$p\times p$，对称半正定）是观测噪声协方差。若 $\boldsymbol T_t,\boldsymbol R_t,\boldsymbol Q_t,\boldsymbol Z_t,\boldsymbol H_t,\boldsymbol c_t,\boldsymbol d_t$ 均不依赖 $t$，则称模型为时不变模型，记作 $\boldsymbol T,\boldsymbol R,\boldsymbol Q,\boldsymbol Z,\boldsymbol H$。

线性高斯模型的决定性性质是：由式（30.2）生成的任意有限族 $(\boldsymbol\alpha_0,\dots,\boldsymbol\alpha_n,\boldsymbol y_1,\dots,\boldsymbol y_n)$ 都是联合正态向量，因为它们都是联合正态向量 $(\boldsymbol\alpha_0,\boldsymbol\eta_1,\dots,\boldsymbol\eta_n,\boldsymbol\varepsilon_1,\dots,\boldsymbol\varepsilon_n)$ 的线性变换，而联合正态性在线性变换下封闭（第12章）。于是任何条件分布仍然是正态的，条件期望是条件变量的线性函数，而由第13章，条件期望正是均方误差意义下的最优预测。这就是说，在线性高斯设定下，「最优线性预测」与「最优预测」重合，滤波问题有精确的闭式解，且解可以用递推方式逐步更新。本章其余部分的全部工作，就是把这一断言展开成可以计算的递推公式，并说明每一步的最优性来源。

注记。有三点约定与说明。其一，常数项可以吸收进状态：若 $\boldsymbol c_t\equiv\boldsymbol c$、$\boldsymbol d_t\equiv\boldsymbol d$，把状态增广为 $(\boldsymbol\alpha_t^\top,1)^\top$ 即得无常数项的等价表示，故下文一律取 $\boldsymbol c_t=\boldsymbol d_t=\boldsymbol 0$，这并不损失一般性。其二，$\boldsymbol Q_t$ 与 $\boldsymbol H_t$ 允许奇异：例如把 ARMA 过程写成状态空间形式时 $\boldsymbol H=\boldsymbol 0$（观测无噪声），而当噪声只进入部分状态方程时 $\boldsymbol R_t\boldsymbol Q_t\boldsymbol R_t^\top$ 秩亏。凡是出现求逆之处，我们只要求被求逆的矩阵正定，这一条件在 30.3 节会被明确列出。其三，时不变且谱半径 $\rho(\boldsymbol T)<1$ 时，状态方程有唯一的协方差平稳解

$$
\boldsymbol\alpha_t=\sum_{j=0}^{\infty}\boldsymbol T^j\boldsymbol R\boldsymbol\eta_{t-j},
$$

级数在 $L^2$ 中收敛：取任意 $\rho$ 满足 $\rho(\boldsymbol T)<\rho<1$，由 Jordan 标准形可知存在常数 $C$ 使 $\|\boldsymbol T^j\|\le C\rho^j$，于是部分和的均方尾部被 $C^2\rho^{2j}\operatorname{tr}(\boldsymbol R\boldsymbol Q\boldsymbol R^\top)$ 控制，由 Cauchy 准则收敛。其无条件协方差矩阵 $\boldsymbol\Sigma=\operatorname{Var}(\boldsymbol\alpha_t)=\sum_{j\ge 0}\boldsymbol T^j\boldsymbol R\boldsymbol Q\boldsymbol R^\top(\boldsymbol T^\top)^j$ 是 Lyapunov 方程 $\boldsymbol\Sigma=\boldsymbol T\boldsymbol\Sigma\boldsymbol T^\top+\boldsymbol R\boldsymbol Q\boldsymbol R^\top$ 的唯一解，唯一性同样来自 $\rho(\boldsymbol T)<1$ 时该级数表示的确定性。这一 Lyapunov 方程将在定理 30.9 的误差界证明中再次出现。
**例 30.1**

最简单也最重要的线性高斯模型是局部水平模型：状态是一维的、服从随机游走，观测是状态加上独立测量误差，即

$$
\boldsymbol\alpha_t=\boldsymbol\alpha_{t-1}+\boldsymbol\eta_t,\qquad y_t=\boldsymbol\alpha_t+\boldsymbol\varepsilon_t,
$$

其中 $\boldsymbol\eta_t\sim N(0,q)$、$\boldsymbol\varepsilon_t\sim N(0,h)$ 互不相关，$q>0$、$h>0$。用定义 30.2 的记号即 $\boldsymbol T=1$、$\boldsymbol R=1$、$\boldsymbol Z=1$、$\boldsymbol Q=q$、$\boldsymbol H=h$。证明这个模型诱导出的可观测量 $\{y_t\}$ 恰好是一阶差分后为 MA(1) 的过程，即 ARIMA$(0,1,1)$，并求出信噪比 $\lambda=q/h$ 与 MA 系数 $\theta$ 之间的对应关系。

**解**

对观测方程取一阶差分并把状态方程代入：

$$
\Delta y_t=y_t-y_{t-1}=(\boldsymbol\alpha_t+\boldsymbol\varepsilon_t)-(\boldsymbol\alpha_{t-1}+\boldsymbol\varepsilon_{t-1})=\boldsymbol\eta_t+\boldsymbol\varepsilon_t-\boldsymbol\varepsilon_{t-1}.
$$

于是 $\{\Delta y_t\}$ 是零均值的平稳过程，其自协方差为

$$
\gamma_0=\operatorname{Var}(\Delta y_t)=q+2h,\qquad \gamma_1=\operatorname{Cov}(\Delta y_t,\Delta y_{t-1})=\operatorname{Cov}(\boldsymbol\varepsilon_t-\boldsymbol\varepsilon_{t-1},\boldsymbol\varepsilon_{t-1}-\boldsymbol\varepsilon_{t-2})=-h,
$$

而对 $k\ge 2$，$\Delta y_t$ 与 $\Delta y_{t-k}$ 不共享任何噪声项，故 $\gamma_k=0$。自协方差函数在滞后 1 处截尾，这正是 MA(1) 过程的刻画，因此存在白噪声 $\{u_t\}$ 与 $\theta\in\mathbb R$、$\sigma_u^2>0$ 使 $\Delta y_t=u_t+\theta u_{t-1}$，$\operatorname{Var}(u_t)=\sigma_u^2$。比较自协方差得方程组

$$
\sigma_u^2(1+\theta^2)=q+2h,\qquad \sigma_u^2\theta=-h.
$$

两式相除消去 $\sigma_u^2$，并记 $\lambda=q/h$，得

$$
\frac{\theta}{1+\theta^2}=\frac{-h}{q+2h}=\frac{-1}{\lambda+2},
$$

即 $\theta^2+(\lambda+2)\theta+1=0$。由韦达定理，两根之积为 1、之和为 $-(\lambda+2)<-2$，故两根同为负且一根落在 $(-1,0)$、另一根落在 $(-\infty,-1)$。取落在 $(-1,0)$ 的可逆根：

$$
\theta=\frac{-(\lambda+2)+\sqrt{(\lambda+2)^2-4}}{2},\qquad \sigma_u^2=\frac{-h}{\theta}.
$$
反过来，给定任意可逆的 ARIMA$(0,1,1)$ 表示 $\Delta y_t=u_t+\theta u_{t-1}$，其中 $\theta\in(-1,0)$、$\operatorname{Var}(u_t)=\sigma_u^2$，也能唯一地还原出局部水平模型的参数。由 $\sigma_u^2\theta=-h$ 得

$$
h=-\theta\sigma_u^2>0,
$$

再由 $\theta/(\,1+\theta^2)=-1/(\lambda+2)$ 解出

$$
\lambda+2=-\frac{1+\theta^2}{\theta},\qquad \lambda=\frac{-(1+\theta)^2}{\theta},\qquad q=\lambda h=(1+\theta)^2\sigma_u^2>0.
$$

代回验证：$q+2h=(1+\theta)^2\sigma_u^2-2\theta\sigma_u^2=\sigma_u^2(1+\theta^2)$，$\gamma_1=-h=\theta\sigma_u^2$，与 MA(1) 的自协方差完全一致。由于 $\lambda\mapsto\theta$ 与 $\theta\mapsto\lambda$ 互为反函数且都是 $(0,\infty)$ 到 $(-1,0)$ 或反向的双射，局部水平模型的参数 $(q,h)$ 在相差一个共同正比例因子的意义下与 ARIMA$(0,1,1)$ 的可逆表示一一对应；比例因子不可辨识，因为它同时缩放 $q$ 与 $h$ 而不改变 $\Delta y_t$ 的分布形状，只改变其整体方差 $\sigma_u^2$。

两个极限情形值得记住。当 $\lambda=q/h\to 0$，即状态几乎不变而观测噪声占主导时，$\theta\to 0$，$\Delta y_t$ 退化为白噪声，$y_t$ 退化为围绕固定水平的纯噪声；此时 30.3 节将导出的稳态 Kalman 增益趋于 0，滤波器几乎不再更新。当 $\lambda\to\infty$，即观测几乎无噪声时，$\theta\to-1$，MA 表示落到可逆性边界上，$y_t$ 本身就是随机游走；稳态增益趋于 1，滤波值等于最新观测。这两个极端说明 Kalman 增益本质上是信噪比的函数，这一点在例 30.3 中会被精确验证：稳态增益恰为 $1+\theta$。

这个例子也揭示了状态空间表示相对于 ARIMA 表示的两点优势。第一，模型有结构性的可解释参数：$q$ 度量潜在水平的漂移速度，$h$ 度量测量精度，二者之比直接决定最优平滑强度，而 ARIMA 表示只给出一个难以解释的 $\theta$。第二，状态空间形式天然容纳缺失观测、外生解释变量、季节项与随时间变化的参数，ARIMA 形式则很难做到。
**命题 30.3（ARMA 过程的伴随形状态空间实现）**

设 $\{y_t\}$ 是零均值协方差平稳的 ARMA$(p,q)$ 过程

$$
\phi(B)y_t=\theta(B)\boldsymbol\eta_t,\qquad \phi(z)=1-\phi_1z-\cdots-\phi_pz^p,\qquad \theta(z)=1+\theta_1z+\cdots+\theta_qz^q,
$$

其中 $\phi(z)$ 的全部根都落在单位圆外，$\phi$ 与 $\theta$ 没有公共根，$\{\boldsymbol\eta_t\}$ 是方差为 $\sigma_\eta^2$ 的白噪声，$B$ 为后移算子。令 $m=\max(p,q+1)$，并约定当 $j>p$ 时 $\phi_j=0$、当 $j>q$ 时 $\theta_j=0$。定义

$$
\boldsymbol T=\begin{pmatrix}
\phi_1&1&0&\cdots&0\\
\phi_2&0&1&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
\phi_{m-1}&0&0&\cdots&1\\
\phi_m&0&0&\cdots&0
\end{pmatrix},\qquad
\boldsymbol R=\begin{pmatrix}1\\ \theta_1\\ \vdots\\ \theta_{m-1}\end{pmatrix},\qquad
\boldsymbol Z=\begin{pmatrix}1&0&\cdots&0\end{pmatrix},\qquad
\boldsymbol Q=\sigma_\eta^2,\qquad \boldsymbol H=0.
\tag{30.3}
$$

则状态方程 $\boldsymbol\alpha_t=\boldsymbol T\boldsymbol\alpha_{t-1}+\boldsymbol R\boldsymbol\eta_t$ 与观测方程 $y_t=\boldsymbol Z\boldsymbol\alpha_t$ 在 $\boldsymbol\alpha_0$ 取平稳初值时精确地生成原 ARMA 过程；即 $\boldsymbol\alpha_{1t}=y_t$，且状态维数 $m$ 是实现该传递函数所需的最小维数。

**证明**

第一步，验证观测方程确实给出 ARMA 递推。把状态方程按分量写出：对 $j\ge 2$，第 $j$ 行的噪声载入系数是 $\theta_{j-1}$，于是对 $j=2,\dots,m-1$，

$$
\alpha_{jt}=\phi_j\alpha_{1,t-1}+\alpha_{j+1,t-1}+\theta_{j-1}\boldsymbol\eta_t,
$$

而对 $j=m$，第 $m$ 行在超对角位置已无元素，故 $\alpha_{mt}=\phi_m\alpha_{1,t-1}+\theta_{m-1}\boldsymbol\eta_t$。由观测方程 $\alpha_{1t}=y_t$，把上述关系从 $j=1$ 开始逐层向后代入：

$$
\begin{aligned}
y_t=\alpha_{1t}&=\phi_1y_{t-1}+\alpha_{2,t-1}+\boldsymbol\eta_t\\
&=\phi_1y_{t-1}+\big(\phi_2y_{t-2}+\alpha_{3,t-2}+\theta_1\boldsymbol\eta_{t-1}\big)+\boldsymbol\eta_t\\
&=\cdots=\sum_{i=1}^{m}\phi_iy_{t-i}+\sum_{i=0}^{m-1}\theta_i\boldsymbol\eta_{t-i},
\end{aligned}
$$

最后一步用到了链的末端 $\alpha_{m,t-m+1}=\phi_my_{t-m}+\theta_{m-1}\boldsymbol\eta_{t-m+1}$。移项即得 $\phi(B)y_t=\theta(B)\boldsymbol\eta_t$，其中超出 $p$ 与 $q$ 的系数已按约定补零。
第二步，计算传递函数并求出 $\det(\boldsymbol I-z\boldsymbol T)$。令 $\boldsymbol u(z)=(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol R$，即求解 $(\boldsymbol I-z\boldsymbol T)\boldsymbol u=\boldsymbol R$。注意 $\boldsymbol R$ 的第一个分量为 1、第 $j$ 个分量为 $\theta_{j-1}$（$j\ge 2$）。逐分量写出：第 $m$ 个方程为 $u_m-z\phi_mu_1=\theta_{m-1}$；第 $j$ 个方程（$2\le j\le m-1$）为 $u_j-z\phi_ju_1-zu_{j+1}=\theta_{j-1}$；第 1 个方程为 $(1-z\phi_1)u_1-zu_2=1$。自 $u_m$ 起逐层回代得

$$
u_j=\sum_{i=j-1}^{m-1}\theta_iz^{i-j+1}+\Big(\sum_{i=j}^{m}\phi_iz^{i-j+1}\Big)u_1,\qquad 2\le j\le m .
$$

把它代入第一个方程，$u_2=\sum_{i=1}^{m-1}\theta_iz^{i-1}+(\sum_{i=2}^{m}\phi_iz^{i-1})u_1$，于是

$$
(1-z\phi_1)u_1-\sum_{i=1}^{m-1}\theta_iz^{i}-z\Big(\sum_{i=2}^{m}\phi_iz^{i-1}\Big)u_1=1,
$$

整理得 $u_1(1-\sum_{i=1}^{m}\phi_iz^i)=1+\sum_{i=1}^{m-1}\theta_iz^i$。由于 $\theta_i=0$（$i>q$）且 $q\le m-1$，右端就是 $\theta(z)$，左端括号内就是 $\phi(z)$，故

$$
\boldsymbol Z(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol R=u_1(z)=\frac{\theta(z)}{\phi(z)},
$$

正是原 ARMA 过程的传递函数；这也说明由状态方程逐次代入得到的 moving-average 表示 $y_t=\sum_{j\ge 0}(\boldsymbol Z\boldsymbol T^j\boldsymbol R)\boldsymbol\eta_{t-j}$ 的系数生成函数与 ARMA 模型一致。

同一回代过程也给出 $\det(\boldsymbol I-z\boldsymbol T)=\phi(z)$。对 $m$ 归纳：沿最后一行展开，$(m,m)$ 位置的余子式恰是维数 $m-1$ 的同类行列式，由归纳假设等于 $1-\phi_1z-\cdots-\phi_{m-1}z^{m-1}$；$(m,1)$ 位置的余子式删去第 $m$ 行第 1 列后是下三角矩阵，其对角元全为 $-z$，故等于 $(-z)^{m-1}$，配上符号因子 $(-1)^{m+1}$ 与元素 $-z\phi_m$ 得 $(-1)^{m+1}(-1)^{m-1}z^{m-1}(-z\phi_m)=-\phi_mz^m$。两项相加即 $\phi(z)$。

第三步，说明初值的取法与状态的平稳性。由 $\det(\lambda\boldsymbol I-\boldsymbol T)=\lambda^m\phi(\lambda^{-1})$，$\boldsymbol T$ 的特征值是 $\phi(z)$ 的根的倒数；因为 $\phi$ 的根全在单位圆外，故 $\rho(\boldsymbol T)<1$，状态方程有唯一协方差平稳解，取

$$
\boldsymbol\alpha_0=\sum_{j=0}^{\infty}\boldsymbol T^j\boldsymbol R\boldsymbol\eta_{-j}
$$

即可，其协方差矩阵 $\boldsymbol P_0$ 是 Lyapunov 方程 $\boldsymbol P_0=\boldsymbol T\boldsymbol P_0\boldsymbol T^\top+\boldsymbol R\boldsymbol Q\boldsymbol R^\top$ 的唯一解。这样构造出的 $\{y_t\}$ 与由 ARMA 差分方程加平稳初值定义的 $\{y_t\}$ 是同一过程。
第四步，证明维数 $m$ 最小，即该实现既是能观的又是能控的。先记 $\boldsymbol T$ 的显式元素：$\boldsymbol T_{i1}=\phi_i$（$1\le i\le m$），$\boldsymbol T_{i,i+1}=1$（$1\le i\le m-1$），其余元素为零。于是对任意向量 $\boldsymbol v$，

$$
(\boldsymbol T\boldsymbol v)_1=\sum_{i=1}^{m}\phi_iv_i,\qquad (\boldsymbol T\boldsymbol v)_j=\phi_jv_1+v_{j-1}\quad(2\le j\le m).
$$

能观性：令 $\mathcal O_m$ 为 $m\times m$ 能观性矩阵，其第 $k+1$ 行是 $\boldsymbol Z\boldsymbol T^k$（$k=0,\dots,m-1$）。由上式，$(\boldsymbol Z\boldsymbol T^{k+1})_j=(\boldsymbol Z\boldsymbol T^k)_{j-1}$ 对 $j\ge 2$ 成立，而 $\boldsymbol Z\boldsymbol T^0=(1,0,\dots,0)$。归纳即得 $(\boldsymbol Z\boldsymbol T^k)_j=0$（$j>k+1$）且 $(\boldsymbol Z\boldsymbol T^k)_{k+1}=1$。故 $\mathcal O_m$ 是主对角元全为 1 的下三角矩阵，$\det\mathcal O_m=1$，秩为 $m$。

能控性：使用 Popov–Belevitch–Hautus 判据。设 $\mathcal R=\operatorname{span}\{\boldsymbol T^k\boldsymbol R:k\ge 0\}$ 为能控性子空间，则 $\operatorname{rank}(\boldsymbol R,\boldsymbol T\boldsymbol R,\dots,\boldsymbol T^{m-1}\boldsymbol R)=m$ 当且仅当 $\mathcal R=\mathbb R^m$。若 $\mathcal R\ne\mathbb R^m$，则 $\mathcal R$ 是 $\boldsymbol T$ 不变的真子空间，其正交补 $\mathcal R^\perp$ 在 $\boldsymbol T^\top$ 下不变：对 $\boldsymbol u\in\mathcal R^\perp$ 与 $\boldsymbol v\in\mathcal R$，$\langle\boldsymbol T^\top\boldsymbol u,\boldsymbol v\rangle=\langle\boldsymbol u,\boldsymbol T\boldsymbol v\rangle=0$。在复化空间上取 $\boldsymbol T^\top$ 限制在 $\mathcal R^\perp$ 上的特征向量 $\boldsymbol w$ 与特征值 $\lambda$，则 $\boldsymbol w^\top\boldsymbol T=\lambda\boldsymbol w^\top$ 且 $\boldsymbol w^\top\boldsymbol R=0$。反之，若存在非零 $\boldsymbol w$ 与 $\lambda$ 使 $\boldsymbol w^\top\boldsymbol T=\lambda\boldsymbol w^\top$、$\boldsymbol w^\top\boldsymbol R=0$，则 $\boldsymbol w^\top\boldsymbol T^k\boldsymbol R=\lambda^k\boldsymbol w^\top\boldsymbol R=0$ 对一切 $k$ 成立，故 $\mathcal R$ 落在 $\boldsymbol w$ 的正交补中，不是全空间。两种情形合起来说明：实现不能控当且仅当存在左特征向量与 $\boldsymbol R$ 正交。

对本题的伴随形，解 $\boldsymbol w^\top\boldsymbol T=\lambda\boldsymbol w^\top$：由 $(\boldsymbol w^\top\boldsymbol T)_j=w_{j-1}$（$j\ge2$）得 $w_{j-1}=\lambda w_j$，即 $\boldsymbol w$ 与 $(1,\lambda^{-1},\dots,\lambda^{-(m-1)})^\top$ 成比例；代入第 1 个分量方程 $\sum_{i}\phi_iw_i=\lambda w_1$ 并乘以 $\lambda^{m-1}$ 得 $\lambda^m-\phi_1\lambda^{m-1}-\cdots-\phi_m=0$，即 $\lambda$ 是 $\boldsymbol T$ 的特征值。此时

$$
\boldsymbol w^\top\boldsymbol R\ \propto\ \sum_{j=1}^{m}\lambda^{-(j-1)}\theta_{j-1}=\theta(\lambda^{-1}).
$$

因此实现不能控当且仅当存在 $\boldsymbol T$ 的特征值 $\lambda$ 使 $\theta(\lambda^{-1})=0$，也就是 $\phi$ 与 $\theta$ 有公共根 $z=\lambda^{-1}$。命题假设二者无公共根，故实现能控。

最后，能观且能控蕴含维数最小：若存在维数 $n<m$ 的实现给出同一脉冲响应 $g_k=\boldsymbol Z\boldsymbol T^k\boldsymbol R$，则 Hankel 矩阵 $H_m=(g_{i+j})_{0\le i,j\le m-1}$ 可分解为该实现的能观性矩阵与能控性矩阵之积，秩不超过 $n<m$；而对本实现 $H_m=\mathcal O_m(\boldsymbol R,\boldsymbol T\boldsymbol R,\dots,\boldsymbol T^{m-1}\boldsymbol R)$，两个因子都可逆，秩为 $m$，矛盾。

□
注记。命题 30.3 给出的是能观规范形：观测直接读出状态的第一个分量，$\boldsymbol Z=(1,0,\dots,0)$，转移矩阵的伴随结构把 AR 系数放在第一列。把它整体转置即得能控规范形，即 $\boldsymbol T$ 的伴随结构把 $\phi$ 放在最后一行、$\boldsymbol R=(1,0,\dots,0)^\top$、$\boldsymbol Z=(1,\theta_1,\dots,\theta_{m-1})$，两种形式互为对偶并给出同一传递函数。实际建模中更常用的是「状态即滞后观测」的写法，例如令 $\boldsymbol\alpha_t=(y_t,y_{t-1},\dots,y_{t-p+1})^\top$，这对纯 AR$(p)$ 模型足够，但对含 MA 项的模型必须像命题 30.3 那样把过去的冲击也放进状态，否则状态不再是 Markov 的。此外，若在观测方程中加入独立测量误差 $\boldsymbol H\ne\boldsymbol 0$，得到的是 ARMA 加上白噪声的过程，其自协方差函数在滞后 $q+1$ 之后才截尾，这类「信号加噪声」模型在量化研究中对应「真实因子收益加估计误差」的情形。

**例 30.2**

对 ARMA$(1,1)$ 过程 $y_t=\phi y_{t-1}+\boldsymbol\eta_t+\theta\boldsymbol\eta_{t-1}$（$|\phi|<1$，$\operatorname{Var}(\boldsymbol\eta_t)=\sigma^2$）写出命题 30.3 的实现，验证能观性与能控性，并求出平稳状态协方差矩阵。

**解**

此处 $p=q=1$，故 $m=\max(1,2)=2$，$\phi_1=\phi$、$\phi_2=0$、$\theta_1=\theta$。代入式（30.3）：

$$
\boldsymbol T=\begin{pmatrix}\phi&1\\0&0\end{pmatrix},\qquad \boldsymbol R=\begin{pmatrix}1\\\theta\end{pmatrix},\qquad \boldsymbol Z=\begin{pmatrix}1&0\end{pmatrix},\qquad \boldsymbol Q=\sigma^2,\qquad \boldsymbol H=0 .
$$

直接按分量验证。状态方程给出 $\alpha_{1t}=\phi\alpha_{1,t-1}+\alpha_{2,t-1}+\boldsymbol\eta_t$ 与 $\alpha_{2t}=\theta\boldsymbol\eta_t$，观测方程给出 $y_t=\alpha_{1t}$。把第二式滞后一期代入第一式：

$$
y_t=\phi y_{t-1}+\theta\boldsymbol\eta_{t-1}+\boldsymbol\eta_t,
$$

正是所给的 ARMA$(1,1)$ 方程。传递函数按命题 30.3 第二步的公式为

$$
\boldsymbol Z(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol R=\frac{1+\theta z}{1-\phi z},\qquad \det(\boldsymbol I-z\boldsymbol T)=1-\phi z,
$$

与 $y_t=\sum_{j\ge0}\psi_j\boldsymbol\eta_{t-j}$ 的系数生成函数一致，其中 $\psi_0=1$、$\psi_j=\phi^{j-1}(\phi+\theta)$（$j\ge1$）。

能观性矩阵与能控性矩阵分别为

$$
\mathcal O_2=\begin{pmatrix}1&0\\\phi&1\end{pmatrix},\qquad \mathcal C_2=\big(\boldsymbol R,\boldsymbol T\boldsymbol R\big)=\begin{pmatrix}1&\phi+\theta\\\theta&0\end{pmatrix},
$$

故 $\det\mathcal O_2=1$、$\det\mathcal C_2=-\theta(\phi+\theta)$。当 $\theta\ne0$ 且 $\phi+\theta\ne0$ 时二者都非奇异，实现是最小的；条件 $\phi+\theta\ne0$ 正是命题 30.3 中「$\phi$ 与 $\theta$ 无公共根」的具体形式，因为 $\phi(z)=1-\phi z$ 的根 $z=1/\phi$ 满足 $\theta(1/\phi)=0$ 当且仅当 $\phi+\theta=0$。当 $\theta=0$ 时传递函数退化为 $1/(1-\phi z)$，真实维数是 1 而实现用了 2 维，$\mathcal C_2$ 奇异，第二维是不可控的冗余分量。
平稳状态协方差矩阵 $\boldsymbol P_0=\operatorname{Var}(\boldsymbol\alpha_t)$ 由 Lyapunov 方程 $\boldsymbol P_0=\boldsymbol T\boldsymbol P_0\boldsymbol T^\top+\boldsymbol R\boldsymbol Q\boldsymbol R^\top$ 决定。先算

$$
\boldsymbol T\boldsymbol P_0\boldsymbol T^\top=\begin{pmatrix}\phi&1\\0&0\end{pmatrix}\begin{pmatrix}p_{11}&p_{12}\\p_{12}&p_{22}\end{pmatrix}\begin{pmatrix}\phi&0\\1&0\end{pmatrix}=\begin{pmatrix}\phi^2p_{11}+2\phi p_{12}+p_{22}&0\\0&0\end{pmatrix},
$$

而 $\boldsymbol R\boldsymbol Q\boldsymbol R^\top=\sigma^2\begin{pmatrix}1&\theta\\\theta&\theta^2\end{pmatrix}$。逐元素比较得 $p_{22}=\theta^2\sigma^2$、$p_{12}=\theta\sigma^2$、$p_{11}(1-\phi^2)=\sigma^2(1+2\phi\theta+\theta^2)$，即

$$
\boldsymbol P_0=\begin{pmatrix}\sigma^2\dfrac{1+2\phi\theta+\theta^2}{1-\phi^2}&\theta\sigma^2\\[2mm]\theta\sigma^2&\theta^2\sigma^2\end{pmatrix}.
$$

这三个数都可以不经过 Lyapunov 方程直接核验：$\alpha_{2t}=\theta\boldsymbol\eta_t$ 立即给出 $p_{22}=\theta^2\sigma^2$；$\operatorname{Cov}(y_t,\alpha_{2t})=\theta\operatorname{Cov}(y_t,\boldsymbol\eta_t)=\theta\sigma^2$，因为 $y_t$ 的 moving-average 表示中 $\boldsymbol\eta_t$ 的系数是 1；而 $p_{11}=\operatorname{Var}(y_t)=\sigma^2\sum_{j\ge0}\psi_j^2=\sigma^2\big[1+(\phi+\theta)^2/(1-\phi^2)\big]=\sigma^2(1+2\phi\theta+\theta^2)/(1-\phi^2)$。两条路径一致，说明实现的初值与 ARMA 过程的平稳分布吻合。

有了这个 $\boldsymbol P_0$，30.3 节的 Kalman 滤波就可以从 $t=1$ 开始运行；由于 $\boldsymbol H=0$，观测无噪声，滤波在第一步之后会退化为把 $y_t$ 直接当作状态的第一个分量，这是能观规范形的一个特点，也提醒我们：$\boldsymbol H$ 是否奇异会显著改变滤波的行为。

**命题 30.4（状态空间表示的非唯一性）**

设线性高斯模型由参数 $(\boldsymbol T,\boldsymbol R,\boldsymbol Q,\boldsymbol Z,\boldsymbol H,\boldsymbol a_0,\boldsymbol P_0)$ 给出，状态维数为 $m$。任取 $m\times m$ 可逆矩阵 $\boldsymbol A$，令

$$
\boldsymbol\alpha_t^*=\boldsymbol A^{-1}\boldsymbol\alpha_t,\qquad \boldsymbol T^*=\boldsymbol A^{-1}\boldsymbol T\boldsymbol A,\qquad \boldsymbol R^*=\boldsymbol A^{-1}\boldsymbol R,\qquad \boldsymbol Z^*=\boldsymbol Z\boldsymbol A,\qquad \boldsymbol Q^*=\boldsymbol Q,\qquad \boldsymbol H^*=\boldsymbol H,
$$

并令 $\boldsymbol a_0^*=\boldsymbol A^{-1}\boldsymbol a_0$、$\boldsymbol P_0^*=\boldsymbol A^{-1}\boldsymbol P_0(\boldsymbol A^{-1})^\top$。则：（一）$(\boldsymbol\alpha_t^*,\boldsymbol y_t)$ 满足同类型的新状态空间方程；（二）两种表示生成完全相同的观测联合分布，从而似然函数、任何基于观测的最优预测及其误差协方差都相同；（三）传递函数相同。反之，（四）若两组参数给出的实现都是能观且能控的（即最小的）且具有相同的脉冲响应序列 $\boldsymbol Z\boldsymbol T^k\boldsymbol R$，则二者必由某个可逆矩阵 $\boldsymbol A$ 通过上述相似变换相联系，且这样的 $\boldsymbol A$ 唯一。
**证明**

（一）把 $\boldsymbol\alpha_t=\boldsymbol A\boldsymbol\alpha_t^*$ 代入原状态方程，得 $\boldsymbol A\boldsymbol\alpha_t^*=\boldsymbol T\boldsymbol A\boldsymbol\alpha_{t-1}^*+\boldsymbol R\boldsymbol\eta_t$，左乘 $\boldsymbol A^{-1}$ 即 $\boldsymbol\alpha_t^*=\boldsymbol A^{-1}\boldsymbol T\boldsymbol A\boldsymbol\alpha_{t-1}^*+\boldsymbol A^{-1}\boldsymbol R\boldsymbol\eta_t=\boldsymbol T^*\boldsymbol\alpha_{t-1}^*+\boldsymbol R^*\boldsymbol\eta_t$。观测方程给出 $\boldsymbol y_t=\boldsymbol Z\boldsymbol A\boldsymbol\alpha_t^*+\boldsymbol\varepsilon_t=\boldsymbol Z^*\boldsymbol\alpha_t^*+\boldsymbol\varepsilon_t$。初值方面，由联合正态向量在线性变换下的封闭性（第12章），$\boldsymbol\alpha_0^*=\boldsymbol A^{-1}\boldsymbol\alpha_0\sim N(\boldsymbol A^{-1}\boldsymbol a_0,\boldsymbol A^{-1}\boldsymbol P_0(\boldsymbol A^{-1})^\top)=N(\boldsymbol a_0^*,\boldsymbol P_0^*)$。噪声协方差未作任何改动，故新参数确实定义了一个同类型的线性高斯状态空间模型。

（二）固定一列噪声实现 $(\boldsymbol\alpha_0,\boldsymbol\eta_1,\boldsymbol\eta_2,\dots,\boldsymbol\varepsilon_1,\boldsymbol\varepsilon_2,\dots)$。对 $t$ 归纳证明 $\boldsymbol\alpha_t=\boldsymbol A\boldsymbol\alpha_t^*$：$t=0$ 时由 $\boldsymbol\alpha_0^*$ 的定义成立；若对 $t$ 成立，则

$$
\boldsymbol\alpha_{t+1}=\boldsymbol T\boldsymbol\alpha_t+\boldsymbol R\boldsymbol\eta_{t+1}=\boldsymbol T\boldsymbol A\boldsymbol\alpha_t^*+\boldsymbol R\boldsymbol\eta_{t+1}=\boldsymbol A\big(\boldsymbol A^{-1}\boldsymbol T\boldsymbol A\boldsymbol\alpha_t^*+\boldsymbol A^{-1}\boldsymbol R\boldsymbol\eta_{t+1}\big)=\boldsymbol A\big(\boldsymbol T^*\boldsymbol\alpha_t^*+\boldsymbol R^*\boldsymbol\eta_{t+1}\big)=\boldsymbol A\boldsymbol\alpha_{t+1}^* .
$$

于是观测路径逐点相同：$\boldsymbol y_t=\boldsymbol Z\boldsymbol\alpha_t+\boldsymbol\varepsilon_t=\boldsymbol Z^*\boldsymbol\alpha_t^*+\boldsymbol\varepsilon_t$。既然同一噪声实现给出同一观测序列，两种表示诱导的 $(\boldsymbol y_1,\dots,\boldsymbol y_n)$ 的联合分布、从而似然函数完全一致。关于状态的推断则按 $\boldsymbol A$ 相应地变换：对任意常向量 $\boldsymbol b$，$\mathbb E[\boldsymbol b^\top\boldsymbol\alpha_t\mid\mathcal F_s]=\boldsymbol b^\top\boldsymbol A\,\mathbb E[\boldsymbol\alpha_t^*\mid\mathcal F_s]$，误差协方差满足 $\operatorname{Var}(\boldsymbol\alpha_t-\hat{\boldsymbol\alpha}_t\mid\mathcal F_s)=\boldsymbol A\operatorname{Var}(\boldsymbol\alpha_t^*-\hat{\boldsymbol\alpha}_t^*\mid\mathcal F_s)\boldsymbol A^\top$。

（三）由 $\boldsymbol I-z\boldsymbol T^*=\boldsymbol I-z\boldsymbol A^{-1}\boldsymbol T\boldsymbol A=\boldsymbol A^{-1}(\boldsymbol I-z\boldsymbol T)\boldsymbol A$ 得 $(\boldsymbol I-z\boldsymbol T^*)^{-1}=\boldsymbol A^{-1}(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol A$，因此

$$
\boldsymbol Z^*(\boldsymbol I-z\boldsymbol T^*)^{-1}\boldsymbol R^*=\boldsymbol Z\boldsymbol A\cdot\boldsymbol A^{-1}(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol A\cdot\boldsymbol A^{-1}\boldsymbol R=\boldsymbol Z(\boldsymbol I-z\boldsymbol T)^{-1}\boldsymbol R .
$$
（四）设两组参数给出的实现都最小，且脉冲响应相同：$g_k=\boldsymbol Z\boldsymbol T^k\boldsymbol R=\boldsymbol Z^*\boldsymbol T^{*k}\boldsymbol R^*$（$k\ge0$）。分五步证明它们相似。

第一步，维数必然相同。记 Hankel 矩阵 $H_n=(g_{i+j})_{0\le i,j\le n-1}$，记 $\mathcal O_n$ 为行是 $\boldsymbol Z\boldsymbol T^k$（$k=0,\dots,n-1$）的 $n\times m$ 能观性矩阵，$\mathcal C_n$ 为列是 $\boldsymbol T^k\boldsymbol R$（$k=0,\dots,n-1$）的 $m\times n$ 能控性矩阵，则 $H_n=\mathcal O_n\mathcal C_n$，故 $\operatorname{rank}H_n\le m$。因实现最小，$\mathcal O_m$ 与 $\mathcal C_m$ 都是秩 $m$ 的方阵，于是 $\operatorname{rank}H_m=m$；而 $H_m$ 是 $H_n$（$n\ge m$）的子矩阵，故 $\operatorname{rank}H_n=m$ 对一切 $n\ge m$ 成立。对带星号的实现同理得 $\operatorname{rank}H_n=m^*$，故 $m=m^*$。

第二步，确定唯一的递推关系。由第一步，$\operatorname{rank}H_{m+1}=m$，而 $H_{m+1}$ 的前 $m$ 行线性无关（它们含 $H_m$ 的行），故 $H_{m+1}$ 的 $m+1$ 行之间恰有一个（相差常数倍的）线性关系。取 $n$ 充分大使任意固定的列指标都被包含，可知存在唯一的、相差标量倍的非零向量 $\boldsymbol d=(d_0,\dots,d_m)$ 满足

$$
\sum_{k=0}^{m}d_kg_{j+k}=0\qquad(j\ge 0),
$$

且 $d_m\ne0$（否则前 $m$ 行线性相关）。以 $d_m=1$ 归一，得到唯一由脉冲响应决定的系数 $c_0,\dots,c_{m-1}$，使 $g_{j+m}=\sum_{k=0}^{m-1}c_kg_{j+k}$ 对一切 $j\ge0$ 成立。

第三步，把这个标量递推提升为矩阵恒等式。令 $\boldsymbol w^\top=\boldsymbol Z\boldsymbol T^m-\sum_{k=0}^{m-1}c_k\boldsymbol Z\boldsymbol T^k$。对任意 $j\ge0$，$\boldsymbol w^\top\boldsymbol T^j\boldsymbol R=g_{j+m}-\sum_kc_kg_{j+k}=0$，故 $\boldsymbol w^\top\mathcal C_m=0$。因实现能控，$\mathcal C_m$ 可逆，从而 $\boldsymbol w=\boldsymbol 0$，即

$$
\boldsymbol Z\boldsymbol T^m=\sum_{k=0}^{m-1}c_k\boldsymbol Z\boldsymbol T^k .
$$
第四步，把标量递推写成矩阵形式。定义 $m\times m$ 矩阵 $\boldsymbol S$：其超对角元 $\boldsymbol S_{k,k+1}=1$（$k=0,\dots,m-2$），最后一行为 $(c_0,\dots,c_{m-1})$，其余元素为零。逐行验证 $\mathcal O_m\boldsymbol T=\boldsymbol S\mathcal O_m$：对 $k\le m-2$，$\boldsymbol S\mathcal O_m$ 的第 $k$ 行等于 $\mathcal O_m$ 的第 $k+1$ 行，即 $\boldsymbol Z\boldsymbol T^{k+1}$，而 $\mathcal O_m\boldsymbol T$ 的第 $k$ 行也是 $\boldsymbol Z\boldsymbol T^{k+1}$；最后一行由第三步的恒等式给出 $\boldsymbol Z\boldsymbol T^m$，两边一致。因为系数 $c_0,\dots,c_{m-1}$ 完全由脉冲响应决定，带星号的实现满足同一个 $\boldsymbol S$，即 $\mathcal O_m^*\boldsymbol T^*=\boldsymbol S\mathcal O_m^*$。

第五步，令 $\boldsymbol A=\mathcal O_m^{-1}\mathcal O_m^*$，这是可逆矩阵。由 $\mathcal O_m^*=\mathcal O_m\boldsymbol A$ 比较首行得 $\boldsymbol Z^*=\boldsymbol Z\boldsymbol A$。再由

$$
\mathcal O_m\boldsymbol A\boldsymbol T^*=\mathcal O_m^*\boldsymbol T^*=\boldsymbol S\mathcal O_m^*=\boldsymbol S\mathcal O_m\boldsymbol A=\mathcal O_m\boldsymbol T\boldsymbol A
$$

与 $\mathcal O_m$ 可逆得 $\boldsymbol A\boldsymbol T^*=\boldsymbol T\boldsymbol A$，即 $\boldsymbol T^*=\boldsymbol A^{-1}\boldsymbol T\boldsymbol A$。最后，$H_m=\mathcal O_m\mathcal C_m=\mathcal O_m^*\mathcal C_m^*=\mathcal O_m\boldsymbol A\mathcal C_m^*$ 给出 $\mathcal C_m=\boldsymbol A\mathcal C_m^*$，即 $\mathcal C_m^*=\boldsymbol A^{-1}\mathcal C_m$；比较首列得 $\boldsymbol R^*=\boldsymbol A^{-1}\boldsymbol R$。相似矩阵 $\boldsymbol A$ 由 $\mathcal O_m^{-1}\mathcal O_m^*$ 唯一确定，故表示在相似变换意义下唯一。

□

注记（可辨识性）。命题 30.4 的前三部分说明状态空间表示严重不唯一：维数相同的实现之间相差一个任意的可逆线性变换，而观测数据的分布对此完全无感。第四部分则给出反面：一旦限定实现为最小（能观且能控），表示就在相似变换意义下唯一。这两条合起来决定了统计估计的正确提法。可观测数据能识别的只是脉冲响应序列 $\{\boldsymbol Z\boldsymbol T^k\boldsymbol R\}$，或者说自协方差函数与噪声协方差所组成的等价类；直接对未加约束的参数做极大似然估计，似然面会在整条相似变换轨道上取到相同的最大值，Hessian 在该方向上奇异，数值优化既不稳定也不可解释。实践中的做法是固定一个规范形（例如命题 30.3 的能观规范形），或施加结构性约束（例如局部水平模型规定 $\boldsymbol T=\boldsymbol R=\boldsymbol Z=1$，只剩 $q$ 与 $h$ 两个参数）。更深一层的教训是方法论的：状态向量本身不可观测，它的维数、分量含义与坐标选取都是建模者的设定，而非数据的产物；不同的设定可以给出完全相同的拟合优度却导出完全不同的经济解释。30.4 节的似然计算与超参数估计都必须在固定规范形之后进行。
## 30.2 最优线性预测的递推结构

30.1 节给出了模型，本节解决估计问题的几何结构。目标是计算 $\mathbb E[\boldsymbol\alpha_t\mid\mathcal F_s]$ 与相应的条件协方差。笨办法是把 $(\boldsymbol\alpha_t,\boldsymbol y_1,\dots,\boldsymbol y_s)$ 的联合协方差矩阵写出来，再套用多元正态的条件化公式：这在数学上完全正确，但每一步都要处理维数随 $s$ 增长的矩阵求逆，计算量是 $s$ 的三次方，而且看不出任何递推结构。Kalman 滤波的全部价值在于它把同样的计算化成一串维数固定为 $m$ 与 $p$ 的矩阵运算，每来一个新观测只做一次常数规模的更新。要做到这一点，必须先理解「用 $t-1$ 期以前的信息预测」与「用 $t$ 期以前的信息预测」之间的关系，这正是正交投影与新息表示要解决的问题。

本节的工作分两层。第一层与模型无关：在平方可积随机变量构成的 Hilbert 空间中，证明最优线性预测由正交性唯一刻画，并证明把观测序列正交化得到的新息序列给出一个有限和形式的递推表示。第二层把这套几何套用到线性状态空间模型上，算出新息的协方差与状态—新息互协方差的显式表达，从而得到一步预测误差协方差的递推。30.3 节再补上高斯条件化，把「最优线性预测」升级为「条件期望」。

记 $L^2=L^2(\Omega,\mathcal F,\mathbb P)$ 为实值平方可积随机变量的集合，配内积 $\langle X,Y\rangle=\mathbb E[XY]$ 与范数 $\|X\|=(\mathbb E X^2)^{1/2}$；由 Riesz–Fischer 定理它是 Hilbert 空间（第4章）。向量值随机变量按分量处理，两个向量的内积理解为 $\mathbb E[\boldsymbol X\boldsymbol Y^\top]$。对每个 $t\ge0$，令 $\mathcal M_t$ 为集合 $\{1\}\cup\{y_{s,i}:1\le s\le t,\,1\le i\le p\}$ 在 $L^2$ 中的闭线性张成，并约定 $\mathcal M_0$ 只由常随机变量组成。$\mathcal M_t$ 是由观测能构造的全部平方可积的仿射组合，$\mathcal M_0\subset\mathcal M_1\subset\cdots$。对 $x\in L^2$，记 $\operatorname{proj}(x\mid\mathcal M_t)$ 为 $x$ 在 $\mathcal M_t$ 上的正交投影，它就是基于 $\boldsymbol y_1,\dots,\boldsymbol y_t$ 的最优（均方误差最小）仿射预测。

**引理 30.5（正交投影刻画最优预测）**

设 $\mathcal H$ 为 Hilbert 空间，$M\subset\mathcal H$ 为闭线性子空间，$x\in\mathcal H$。则存在唯一的 $\hat x\in M$ 使 $x-\hat x\perp M$；这个 $\hat x$ 恰是 $\|x-m\|$ 在 $m\in M$ 上的唯一最小值点，满足勾股等式 $\|x\|^2=\|\hat x\|^2+\|x-\hat x\|^2$，并且映射 $x\mapsto\hat x$ 是线性的、不扩张的，即 $\|\hat x-\hat y\|\le\|x-y\|$。
**证明**

先证存在性与正交性等价。由第5章的投影定理，闭凸集上存在唯一的最近点：取 $\hat x\in M$ 使 $\|x-\hat x\|=\inf_{m\in M}\|x-m\|$，它满足变分不等式 $\langle x-\hat x,m-\hat x\rangle\le0$（对一切 $m\in M$）。因 $M$ 是线性子空间，对任意 $u\in M$ 与 $s>0$，$m=\hat x\pm su\in M$，代入得 $\pm s\langle x-\hat x,u\rangle\le0$；两个符号同时成立只能是 $\langle x-\hat x,u\rangle=0$，故 $x-\hat x\perp M$。

再证正交性蕴含最优性与唯一性。设 $\hat x\in M$ 且 $x-\hat x\perp M$。对任意 $m\in M$，$\hat x-m\in M$，故与 $x-\hat x$ 正交，于是

$$
\|x-m\|^2=\|(x-\hat x)+(\hat x-m)\|^2=\|x-\hat x\|^2+2\langle x-\hat x,\hat x-m\rangle+\|\hat x-m\|^2=\|x-\hat x\|^2+\|\hat x-m\|^2\ge\|x-\hat x\|^2,
$$

等号成立当且仅当 $\hat x=m$。反过来，若 $\hat x$ 是最小值点，则对任意 $u\in M$，函数 $\varphi(s)=\|x-\hat x-su\|^2=\|x-\hat x\|^2-2s\langle x-\hat x,u\rangle+s^2\|u\|^2$ 在 $s=0$ 取最小值，故 $\varphi'(0)=-2\langle x-\hat x,u\rangle=0$，即正交性成立。取 $m=0$ 即得勾股等式 $\|x\|^2=\|\hat x\|^2+\|x-\hat x\|^2$。

线性性与不扩张性：设 $\hat x,\hat y$ 分别是 $x,y$ 的投影，$a,b\in\mathbb R$。则 $a\hat x+b\hat y\in M$，且 $(ax+by)-(a\hat x+b\hat y)=a(x-\hat x)+b(y-\hat y)$ 与 $M$ 中每个元素正交，由唯一性得 $\operatorname{proj}(ax+by\mid M)=a\hat x+b\hat y$。于是 $\hat x-\hat y=\operatorname{proj}(x-y\mid M)$，对 $x-y$ 用勾股等式得 $\|\hat x-\hat y\|^2\le\|x-y\|^2$。

□

引理 30.5 在实际计算中表现为正规方程组。设 $M=\operatorname{lin}\{1,Y_1,\dots,Y_n\}$，记 $\boldsymbol Y=(Y_1,\dots,Y_n)^\top$ 且 $\operatorname{Var}(\boldsymbol Y)$ 正定。对任意 $x\in L^2$，令

$$
\hat x=\mathbb E x+\operatorname{Cov}(x,\boldsymbol Y)\operatorname{Var}(\boldsymbol Y)^{-1}\big(\boldsymbol Y-\mathbb E\boldsymbol Y\big).
\tag{30.4}
$$

$\hat x$ 显然属于 $M$，且 $\mathbb E[x-\hat x]=0$；又

$$
\mathbb E\big[(x-\hat x)(\boldsymbol Y-\mathbb E\boldsymbol Y)^\top\big]=\operatorname{Cov}(x,\boldsymbol Y)-\operatorname{Cov}(x,\boldsymbol Y)\operatorname{Var}(\boldsymbol Y)^{-1}\operatorname{Var}(\boldsymbol Y)=\boldsymbol 0,
$$

而 $M$ 中元素都形如 $c+\boldsymbol b^\top\boldsymbol Y$，故 $\mathbb E[(x-\hat x)(c+\boldsymbol b^\top\boldsymbol Y)]=c\,\mathbb E[x-\hat x]+\boldsymbol b^\top\mathbb E[(x-\hat x)\boldsymbol Y]=0$。由引理 30.5，$\hat x=\operatorname{proj}(x\mid M)$。再由正交性，$\operatorname{Cov}(x-\hat x,\hat x)=0$，于是 $\operatorname{Var}(x)=\operatorname{Var}(\hat x)+\operatorname{Var}(x-\hat x)$，即预测误差方差为

$$
\operatorname{Var}\big(x-\operatorname{proj}(x\mid M)\big)=\operatorname{Var}(x)-\operatorname{Cov}(x,\boldsymbol Y)\operatorname{Var}(\boldsymbol Y)^{-1}\operatorname{Cov}(\boldsymbol Y,x).
$$

这两个式子对向量值 $x$ 逐分量成立，写成矩阵形式即 $\operatorname{proj}(\boldsymbol x\mid M)=\mathbb E\boldsymbol x+\operatorname{Cov}(\boldsymbol x,\boldsymbol Y)\operatorname{Var}(\boldsymbol Y)^{-1}(\boldsymbol Y-\mathbb E\boldsymbol Y)$ 与 $\operatorname{Var}(\boldsymbol x-\operatorname{proj}(\boldsymbol x\mid M))=\operatorname{Var}(\boldsymbol x)-\operatorname{Cov}(\boldsymbol x,\boldsymbol Y)\operatorname{Var}(\boldsymbol Y)^{-1}\operatorname{Cov}(\boldsymbol Y,\boldsymbol x)$。后一式是 30.3 节滤波误差协方差递推的出发点，值得记住：误差协方差等于先验协方差减去一个半正定的修正项。
把引理 30.5 反复施加到逐个到来的观测上，就得到递推预测的结构。关键在于：新到的观测 $\boldsymbol y_t$ 中，只有它不能被过去解释的那一部分才携带新信息。这一部分称为新息。

**定理 30.6（新息表示与递推预测）**

设 $\boldsymbol y_1,\boldsymbol y_2,\dots$ 各分量都属于 $L^2$，$\mathcal M_t$ 如前定义，且每个 $\operatorname{Var}(\boldsymbol\nu_t)$ 非奇异。定义新息

$$
\boldsymbol\nu_t=\boldsymbol y_t-\operatorname{proj}\big(\boldsymbol y_t\mid\mathcal M_{t-1}\big).
$$

则下列四条成立。

（一）$\mathbb E\boldsymbol\nu_t=\boldsymbol 0$，$\boldsymbol\nu_t\perp\mathcal M_{t-1}$，且不同期的新息互不相关：$\operatorname{Cov}(\boldsymbol\nu_s,\boldsymbol\nu_t)=\boldsymbol 0$（$s\ne t$）。

（二）$\mathcal M_t=\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_t\}$，即观测信息与逐步正交化得到的新息信息生成同一个闭子空间。

（三）对任意 $x\in L^2$，

$$
\operatorname{proj}\big(x\mid\mathcal M_t\big)=\mathbb E x+\sum_{s=1}^{t}\operatorname{Cov}(x,\boldsymbol\nu_s)\operatorname{Var}(\boldsymbol\nu_s)^{-1}\boldsymbol\nu_s,
$$

特别地有递推形式

$$
\operatorname{proj}\big(\boldsymbol x\mid\mathcal M_t\big)=\operatorname{proj}\big(\boldsymbol x\mid\mathcal M_{t-1}\big)+\operatorname{Cov}(\boldsymbol x,\boldsymbol\nu_t)\operatorname{Var}(\boldsymbol\nu_t)^{-1}\boldsymbol\nu_t .
$$

（四）预测误差协方差按

$$
\operatorname{Var}\big(\boldsymbol x-\operatorname{proj}(\boldsymbol x\mid\mathcal M_t)\big)=\operatorname{Var}\big(\boldsymbol x-\operatorname{proj}(\boldsymbol x\mid\mathcal M_{t-1})\big)-\operatorname{Cov}(\boldsymbol x,\boldsymbol\nu_t)\operatorname{Var}(\boldsymbol\nu_t)^{-1}\operatorname{Cov}(\boldsymbol\nu_t,\boldsymbol x)
$$

递推，因此误差协方差随信息增加在 Loewner 序下单调不增。
**证明**

（一）由引理 30.5，$\boldsymbol\nu_t=\boldsymbol y_t-\operatorname{proj}(\boldsymbol y_t\mid\mathcal M_{t-1})$ 与 $\mathcal M_{t-1}$ 中每个元素正交。常随机变量属于 $\mathcal M_{t-1}$，故 $\mathbb E\boldsymbol\nu_t=\langle\boldsymbol\nu_t,1\rangle=0$。若 $s<t$，则 $\boldsymbol\nu_s\in\mathcal M_s\subset\mathcal M_{t-1}$，故 $\operatorname{Cov}(\boldsymbol\nu_t,\boldsymbol\nu_s)=\mathbb E[\boldsymbol\nu_t\boldsymbol\nu_s^\top]=0$。

（二）包含关系 $\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_t\}\subset\mathcal M_t$ 是直接的：每个 $\boldsymbol\nu_s$（$s\le t$）都是 $\boldsymbol y_s$ 与 $\mathcal M_{s-1}$ 中某元素之差，故属于 $\mathcal M_s\subset\mathcal M_t$，而 $\mathcal M_t$ 是闭的。

反方向对 $t$ 归纳。$t=0$ 时两边都是常随机变量组成的空间。设结论对 $t-1$ 成立，即 $\mathcal M_{t-1}\subset\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_{t-1}\}$。由新息的定义，$\boldsymbol y_t=\operatorname{proj}(\boldsymbol y_t\mid\mathcal M_{t-1})+\boldsymbol\nu_t$；右端第一项属于 $\mathcal M_{t-1}$，由归纳假设落在 $\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_{t-1}\}$ 中，第二项属于 $\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_t\}$，故 $\boldsymbol y_t$ 的各分量也落在后者之中。后者是闭线性子空间，且已包含 $\mathcal M_{t-1}$ 与 $\boldsymbol y_t$ 的分量，而 $\mathcal M_t$ 按定义是包含这些元素的最小闭线性子空间，于是 $\mathcal M_t\subset\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_t\}$。两个包含合起来给出等式。

此外，预测值与新息正交，故新息协方差可写为

$$
\operatorname{Var}(\boldsymbol\nu_t)=\operatorname{Var}(\boldsymbol y_t)-\operatorname{Var}\!\left(\operatorname{proj}(\boldsymbol y_t\mid\mathcal M_{t-1})\right).
\tag{30.5}
$$

（三）由（二），只需在 $\overline{\operatorname{lin}}\{1,\boldsymbol\nu_1,\dots,\boldsymbol\nu_t\}$ 上计算投影。各新息均值为零且互不相关，每个新息协方差矩阵又非奇异，因此对各个 $\boldsymbol\nu_s$ 的投影可以相加。对 $x\in L^2$，这一投影正是定理中式（三）的第一个表达式；对向量值随机变量逐分量应用即得向量形式。把第 $t$ 项从前 $t-1$ 项之和中分离出来，并利用 $\boldsymbol\nu_t\perp\mathcal M_{t-1}$，便得到递推形式。

（四）记 $\boldsymbol e_{t-1}=\boldsymbol x-\operatorname{proj}(\boldsymbol x\mid\mathcal M_{t-1})$，以及 $\boldsymbol B_t=\operatorname{Cov}(\boldsymbol x,\boldsymbol\nu_t)\operatorname{Var}(\boldsymbol\nu_t)^{-1}$。由（三），两期投影误差满足 $\boldsymbol e_t=\boldsymbol e_{t-1}-\boldsymbol B_t\boldsymbol\nu_t$。由于 $\boldsymbol B_t\boldsymbol\nu_t$ 是 $\boldsymbol e_{t-1}$ 在新息子空间上的投影，它与 $\boldsymbol e_t$ 正交，故

$$
\operatorname{Var}(\boldsymbol e_{t-1})=\operatorname{Var}(\boldsymbol e_t)+\boldsymbol B_t\operatorname{Var}(\boldsymbol\nu_t)\boldsymbol B_t^\top.
$$

移项并代入 $\boldsymbol B_t$ 即得（四）中的递推式。减去的矩阵为半正定矩阵，所以误差协方差在 Loewner 序下单调不增。

□
## 30.3 Kalman 滤波的推导

定理 30.6 说明，序贯最优线性预测只依赖当期新息。线性高斯状态空间模型把这一抽象结构具体化：状态转移给出先验预测，观测方程把预测误差转化为新息，而条件协方差给出不依赖观测路径的更新权重。

**定义 30.7（线性高斯状态空间模型）**

设状态向量与观测向量分别为 $\boldsymbol x_t\in\mathbb R^n$ 和 $\boldsymbol y_t\in\mathbb R^m$，对 $t\ge 1$ 满足

$$
\begin{aligned}
\boldsymbol x_t&=\boldsymbol A_t\boldsymbol x_{t-1}+\boldsymbol w_t,\\
\boldsymbol y_t&=\boldsymbol C_t\boldsymbol x_t+\boldsymbol d_t+\boldsymbol v_t .
\end{aligned}
\tag{30.6}
$$

其中 $\boldsymbol A_t$、$\boldsymbol C_t$ 与 $\boldsymbol d_t$ 为已知确定性量，$\boldsymbol w_t\sim N(\boldsymbol 0,\boldsymbol Q_t)$，$\boldsymbol v_t\sim N(\boldsymbol 0,\boldsymbol R_t)$。初始状态 $\boldsymbol x_0\sim N(\boldsymbol m_0,\boldsymbol P_0)$，并且初始状态与全部状态噪声、观测噪声相互独立，各噪声在不同时期也相互独立。假定 $\boldsymbol Q_t$ 半正定、$\boldsymbol R_t$ 正定。式（30.6）的第一式称为状态方程，第二式称为观测方程；$\boldsymbol d_t$ 用来吸收已知截距或确定性输入。

记 $\mathcal Y_t=\sigma(\boldsymbol y_1,\dots,\boldsymbol y_t)$，$\mathcal Y_0$ 为平凡 $\sigma$-代数。滤波问题是在 $\mathcal Y_t$ 下估计 $\boldsymbol x_t$，预测问题则是在 $\mathcal Y_{t-1}$ 下估计 $\boldsymbol x_t$。
相应的估计量与误差协方差记为

$$
\widehat{\boldsymbol x}_{t\mid s}=\mathbb E(\boldsymbol x_t\mid\mathcal Y_s),\qquad
\boldsymbol P_{t\mid s}=\operatorname{Var}(\boldsymbol x_t\mid\mathcal Y_s),\qquad s\in\{t-1,t\}.
\tag{30.7}
$$

由于全部变量联合高斯，这些条件协方差不随观测实现改变。滤波初值取 $\widehat{\boldsymbol x}_{0\mid0}=\boldsymbol m_0$ 与 $\boldsymbol P_{0\mid0}=\boldsymbol P_0$。

**定理 30.8（Kalman 预测与更新）**

在定义 30.7 的假设下，对每个 $t\ge1$，预测步为

$$
\widehat{\boldsymbol x}_{t\mid t-1}=\boldsymbol A_t\widehat{\boldsymbol x}_{t-1\mid t-1},\qquad
\boldsymbol P_{t\mid t-1}=\boldsymbol A_t\boldsymbol P_{t-1\mid t-1}\boldsymbol A_t^\top+\boldsymbol Q_t .
\tag{30.8}
$$

定义新息及其协方差

$$
\boldsymbol\nu_t=\boldsymbol y_t-\boldsymbol C_t\widehat{\boldsymbol x}_{t\mid t-1}-\boldsymbol d_t,\qquad
\boldsymbol S_t=\boldsymbol C_t\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top+\boldsymbol R_t .
\tag{30.9}
$$

则 $\boldsymbol S_t$ 正定，更新步为

$$
\begin{aligned}
\boldsymbol K_t&=\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top\boldsymbol S_t^{-1},\\
\widehat{\boldsymbol x}_{t\mid t}&=\widehat{\boldsymbol x}_{t\mid t-1}+\boldsymbol K_t\boldsymbol\nu_t,\\
\boldsymbol P_{t\mid t}&=(\boldsymbol I-\boldsymbol K_t\boldsymbol C_t)\boldsymbol P_{t\mid t-1}
=\boldsymbol P_{t\mid t-1}-\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top\boldsymbol S_t^{-1}\boldsymbol C_t\boldsymbol P_{t\mid t-1}.
\end{aligned}
\tag{30.10}
$$

矩阵 $\boldsymbol K_t$ 称为 Kalman 增益。
**证明**

先推导预测步。给定 $\mathcal Y_{t-1}$，状态噪声 $\boldsymbol w_t$ 与过去独立，故对状态方程取条件期望即得式（30.8）的第一式。令预测误差 $\boldsymbol e_t^-=\boldsymbol x_t-\widehat{\boldsymbol x}_{t\mid t-1}$， filtered 误差记为 $\boldsymbol e_{t-1}=\boldsymbol x_{t-1}-\widehat{\boldsymbol x}_{t-1\mid t-1}$，则 $\boldsymbol e_t^-=\boldsymbol A_t\boldsymbol e_{t-1}+\boldsymbol w_t$。右端两项在给定 $\mathcal Y_{t-1}$ 时均值为零且相互独立，因此

$$
\boldsymbol P_{t\mid t-1}=\operatorname{Var}(\boldsymbol e_t^-\mid\mathcal Y_{t-1})
=\boldsymbol A_t\boldsymbol P_{t-1\mid t-1}\boldsymbol A_t^\top+\boldsymbol Q_t .
$$

再推导新息。由观测方程与预测估计的定义，$\boldsymbol\nu_t=\boldsymbol C_t\boldsymbol e_t^-+\boldsymbol v_t$。给定 $\mathcal Y_{t-1}$，$\boldsymbol e_t^-$ 与 $\boldsymbol v_t$ 独立且均值均为零，故 $\mathbb E(\boldsymbol\nu_t\mid\mathcal Y_{t-1})=\boldsymbol 0$，而式（30.9）的第二式正是两项协方差之和。由于 $\boldsymbol R_t$ 正定，$\boldsymbol S_t$ 正定并可逆。此外，$\boldsymbol\nu_t$ 是 $\boldsymbol y_t$ 减去一个 $\mathcal Y_{t-1}$ 可测向量，反过来 $\boldsymbol y_t$ 又可由 $\boldsymbol\nu_t$ 与 $\mathcal Y_{t-1}$ 复原，所以 $\sigma(\mathcal Y_{t-1},\boldsymbol\nu_t)=\mathcal Y_t$。
最后推导更新步。给定 $\mathcal Y_{t-1}$，状态与新息联合高斯，且

$$
\operatorname{Cov}(\boldsymbol x_t,\boldsymbol\nu_t\mid\mathcal Y_{t-1})
=\operatorname{Cov}(\boldsymbol e_t^-,\boldsymbol C_t\boldsymbol e_t^-+\boldsymbol v_t\mid\mathcal Y_{t-1})
=\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top .
$$

取 $\boldsymbol K_t$ 如式（30.10），并令 $\boldsymbol r_t=\boldsymbol x_t-\widehat{\boldsymbol x}_{t\mid t-1}-\boldsymbol K_t\boldsymbol\nu_t$。直接计算得 $\operatorname{Cov}(\boldsymbol r_t,\boldsymbol\nu_t\mid\mathcal Y_{t-1})=\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top-\boldsymbol K_t\boldsymbol S_t=\boldsymbol 0$。联合高斯且不相关的向量相互独立，因此

$$
\mathbb E(\boldsymbol r_t\mid\mathcal Y_{t-1},\boldsymbol\nu_t)
=\mathbb E(\boldsymbol r_t\mid\mathcal Y_{t-1})=\boldsymbol 0 .
$$

这正是正交投影：从状态中减去其在新息方向上的投影。于是 $\mathbb E(\boldsymbol x_t\mid\mathcal Y_t)=\widehat{\boldsymbol x}_{t\mid t-1}+\boldsymbol K_t\boldsymbol\nu_t$。

为计算更新误差协方差，利用 $\boldsymbol e_t^+=\boldsymbol x_t-\widehat{\boldsymbol x}_{t\mid t}=(\boldsymbol I-\boldsymbol K_t\boldsymbol C_t)\boldsymbol e_t^--\boldsymbol K_t\boldsymbol v_t$。右端两项条件独立，故 Joseph 形式给出

$$
\boldsymbol P_{t\mid t}=(\boldsymbol I-\boldsymbol K_t\boldsymbol C_t)\boldsymbol P_{t\mid t-1}(\boldsymbol I-\boldsymbol K_t\boldsymbol C_t)^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top .
$$

展开右端，并利用 $\boldsymbol K_t\boldsymbol S_t=\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top$，含增益的三次项与前两项之一相消，得到 $\boldsymbol P_{t\mid t}=\boldsymbol P_{t\mid t-1}-\boldsymbol K_t\boldsymbol C_t\boldsymbol P_{t\mid t-1}$。再代入增益便得式（30.10）的最后一个等式。

□

若状态与噪声不服从高斯分布，但保留均值、协方差及噪声不相关假设，同样的正交投影计算仍成立。此时递推给出以观测的仿射函数为限制的最小均方误差估计，即最优线性滤波；$\widehat{\boldsymbol x}_{t\mid t}$ 一般不再等于条件均值，$\boldsymbol P_{t\mid t}$ 也应理解为线性滤波误差协方差，而非条件协方差。
**定理 30.9（预测协方差的 Riccati 递推）**

在定义 30.7 的假设下，一步预测协方差满足

$$
\begin{aligned}
\boldsymbol P_{t+1\mid t}
={}&\boldsymbol A_{t+1}\Big[\boldsymbol P_{t\mid t-1}
-\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top
(\boldsymbol C_t\boldsymbol P_{t\mid t-1}\boldsymbol C_t^\top+\boldsymbol R_t)^{-1}
\boldsymbol C_t\boldsymbol P_{t\mid t-1}\Big]\boldsymbol A_{t+1}^\top
+\boldsymbol Q_{t+1}.
\end{aligned}
\tag{30.11}
$$

因此，从 $\boldsymbol P_{0\mid0}=\boldsymbol P_0$ 出发，全部预测与更新协方差均可离线递推，且不依赖观测值。

**证明**

在式（30.8）中将 $t$ 换成 $t+1$，再把式（30.10）的更新协方差代入，即得式（30.11）。右端只含模型矩阵与上一期预测协方差，所以协方差序列不依赖观测实现。半正定性则对 $t$ 归纳：$\boldsymbol P_0$ 半正定；若 $\boldsymbol P_{t\mid t-1}$ 半正定，则 Joseph 形式是两个半正定矩阵之和，故 $\boldsymbol P_{t\mid t}$ 半正定；再由式（30.8），$\boldsymbol P_{t+1\mid t}$ 也是两个半正定矩阵之和。归纳完成。

□

实际计算从 $\boldsymbol m_0$、$\boldsymbol P_0$ 开始，先执行预测步，再在第一个观测到达后执行更新步。$\boldsymbol m_0$ 给出初始状态的位置知识，$\boldsymbol P_0$ 给出不确定程度；较大的 $\boldsymbol P_0$ 会让早期观测获得较高权重，而精确已知的初始分量可配以零方差。递推并不要求 $\boldsymbol P_0$ 非奇异，只要求观测噪声协方差正定以保证式（30.9）中的新息协方差可逆。
当 $\boldsymbol A_t=\boldsymbol A$、$\boldsymbol C_t=\boldsymbol C$、$\boldsymbol Q_t=\boldsymbol Q$、$\boldsymbol R_t=\boldsymbol R$ 均不随时间变化时，可以考察稳态滤波。若一步预测协方差收敛到有限矩阵 $\overline{\boldsymbol P}$，在式（30.11）中取极限，得到离散代数 Riccati 方程

$$
\overline{\boldsymbol P}=\boldsymbol A\left[\overline{\boldsymbol P}
-\overline{\boldsymbol P}\boldsymbol C^\top
(\boldsymbol C\overline{\boldsymbol P}\boldsymbol C^\top+\boldsymbol R)^{-1}
\boldsymbol C\overline{\boldsymbol P}\right]\boldsymbol A^\top+\boldsymbol Q .
\tag{30.12}
$$

相应的稳态新息协方差与增益为 $\overline{\boldsymbol S}=\boldsymbol C\overline{\boldsymbol P}\boldsymbol C^\top+\boldsymbol R$ 和 $\overline{\boldsymbol K}=\overline{\boldsymbol P}\boldsymbol C^\top\overline{\boldsymbol S}^{-1}$。这里 $\overline{\boldsymbol P}$ 是预测协方差，更新后的稳态协方差为 $(\boldsymbol I-\overline{\boldsymbol K}\boldsymbol C)\overline{\boldsymbol P}$，两者不应混同。

若 $\boldsymbol R$ 正定，$(\boldsymbol A,\boldsymbol C)$ 可检测且 $(\boldsymbol A,\boldsymbol Q^{1/2})$ 可稳定，则代数 Riccati 方程存在唯一的稳定化半正定解，从半正定初值出发的 Riccati 迭代收敛到该解。所谓稳定化，是指 $\boldsymbol A(\boldsymbol I-\overline{\boldsymbol K}\boldsymbol C)$ 的特征值均位于单位圆内；由预测误差递推可知，这使旧误差的影响指数衰减。稳态滤波以常量增益替代每期矩阵求逆，适用于参数不变的长时间序列。若模型系数或噪声协方差随时间变化，则通常不存在单一稳态增益，仍须使用式（30.8）至式（30.11）的时变递推。
## 30.4 状态空间模型的量化应用

状态空间方法把不可直接观测的市场状态与带噪声的观测分开，并以新息驱动状态修正。与滚动窗口回归相比，滤波不必人为规定窗口长度，而由状态噪声与观测噪声的相对大小决定记忆长度；与一次性全样本估计相比，滤波只使用当期及过去信息，因而可直接嵌入实时预测与风险控制。

时变 beta 是最直接的例子。设资产或组合收益 $y_t$ 对若干风险暴露的敏感度为 $\boldsymbol\beta_t$，解释向量 $\boldsymbol z_t$ 在预测时已知，则

$$
\begin{aligned}
\boldsymbol\beta_t&=\boldsymbol\Phi\boldsymbol\beta_{t-1}+\boldsymbol\eta_t,\\
y_t&=\boldsymbol z_t^\top\boldsymbol\beta_t+\varepsilon_t .
\end{aligned}
\tag{30.13}
$$

取 $\boldsymbol\Phi=\boldsymbol I$ 即随机游走 beta；若要求敏感度围绕长期均值波动，也可用适当的稳定矩阵表示均值回复。观测矩阵是 $\boldsymbol C_t=\boldsymbol z_t^\top$，所以式（30.8）先按状态转移预测 beta，式（30.10）再依据收益预测误差修正 beta。当某一风险暴露方向上的预测协方差较大时，新观测在该方向获得更高增益；观测噪声较大时，修正则更谨慎。状态噪声协方差与观测噪声方差之比控制适应速度，而不能仅依据样本内拟合任意调小。

这一表示还可处理对冲比率的缓慢变化、因子载荷的结构性漂移以及时变风险溢价。用于交易时，$\widehat{\boldsymbol\beta}_{t\mid t-1}$ 对应事前暴露预测，$\widehat{\boldsymbol\beta}_{t\mid t}$ 则包含第 $t$ 期收益信息，两者的时间点必须区分，以避免把更新后的状态误用于同一期的事前决策。
局部水平与局部趋势模型用于从含噪价格、波动率或宏观金融序列中提取潜在状态。局部线性趋势模型写为

$$
\begin{aligned}
y_t&=\mu_t+\varepsilon_t,\\
\mu_t&=\mu_{t-1}+\delta_{t-1}+\eta_t,\\
\delta_t&=\delta_{t-1}+\zeta_t .
\end{aligned}
\tag{30.14}
$$

其中 $\mu_t$ 是局部水平，$\delta_t$ 是局部斜率。取 $\boldsymbol x_t=(\mu_t,\delta_t)^\top$ 后，状态转移矩阵和观测矩阵分别为

$$
\boldsymbol A=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad
\boldsymbol C=\begin{pmatrix}1&0\end{pmatrix}.
$$

若 $\delta_0=0$ 且斜率噪声恒为零，模型退化为局部水平模型；若水平噪声也为零，则观测只围绕固定趋势波动。把平稳周期分量或季节性分量加入状态向量，还可在同一框架中分离趋势、周期与不规则噪声。

信号提取的关键不是把每次观测跳动都解释为趋势变化，而是用误差协方差分配水平与斜率的修正。滤波分布给出实时状态估计，一步预测分布给出下一期风险基准，标准化新息 $\boldsymbol S_t^{-1/2}\boldsymbol\nu_t$ 则用于识别异常观测和检验模型是否漏掉了状态变化。参数可通过新息的预测误差分解进行极大似然估计，但估计参数后再滤波时，协方差递推并未自动包含参数估计误差，解释置信区间时应保留这一限制。
**例 30.3**

在局部水平模型中，设状态噪声方差为 $0.0001$，观测噪声方差为 $0.002$。已知第 $t-1$ 期更新后的水平估计为 $0.08$，更新协方差为 $0.0004$。第 $t$ 期观测为 $y_t=0.10$，求该期的预测、新息、Kalman 增益和更新结果。

**解**

状态不随确定性项漂移，故预测均值与预测方差为

$$
\widehat\mu_{t\mid t-1}=0.08,\qquad
P_{t\mid t-1}=0.0004+0.0001=0.0005.
$$

观测矩阵为 $1$，因此新息、新息方差与增益依次为

$$
\nu_t=0.10-0.08=0.02,\qquad
S_t=0.0005+0.002=0.0025,\qquad
K_t=\frac{0.0005}{0.0025}=0.2.
$$

更新后的水平和误差方差为

$$
\widehat\mu_{t\mid t}=0.08+0.2\times0.02=0.084,
$$

$$
P_{t\mid t}=(1-0.2)\times0.0005=0.0004.
$$

观测比预测高 $0.02$，滤波只把其中 $20\%$ 分配给水平修正，因为观测噪声方差显著大于状态预测方差。更新方差低于预测方差，反映新观测带来了额外信息。
状态空间滤波与 GARCH 模型处理的是不同但可互补的潜在量。前者主要递推不可观测的均值、水平或暴露状态，后者递推条件方差。若 GARCH 方程给出的波动率在 $t-1$ 期已经确定，可将其纳入观测噪声协方差 $\boldsymbol R_t$ 或状态噪声协方差 $\boldsymbol Q_t$，并把定义 30.7 中的固定矩阵推广为过去信息可测的矩阵。条件高斯假设仍成立时，预测与更新公式逐期适用，只是新息协方差会随波动率变化。高波动时期的观测因此可以自动获得较低增益。不过，标准 GARCH 的收益方程含有波动率与创新的乘积，并非天然的线性高斯状态方程，不能直接套用线性 Kalman 滤波来估计所有 GARCH 状态。

因子模型则提供另一种自然的状态空间表示。把共同因子作为状态，令因子按线性动态转移，资产收益对因子的观测关系由载荷矩阵给出，Kalman 滤波便能从截面收益中实时提取潜在因子，并同时利用因子的时间序列信息与资产间的截面信息。若因子或特异项的协方差由 GARCH 结构驱动，就得到时变噪声协方差的因子状态空间模型。若载荷本身也未知且需要与因子共同进入状态，观测方程会出现载荷与因子的乘积，模型随之变为非线性，不能再声称普通 Kalman 递推给出条件均值。

这些联系在实现时都应回到新息：新息既连接观测与状态修正，也提供预测表现和模型失配的诊断依据。时变 beta、趋势提取与潜在因子估计可以共用同一递推结构，而波动率模型可改变该结构中的协方差权重；各自的假设与信息时点则必须分别核验。

## 30.5 平滑与似然计算

滤波分布只利用当期及过去的信息，适合实时决策；样本终点之后还需估计历史状态时，则应让后续观测也进入条件分布。平滑不仅是把滤波曲线再做一次移动平均，而是对联合高斯状态序列进行精确的条件计算。本节沿用前文的线性高斯状态空间模型，并记 $\boldsymbol a_{t\mid s}=\mathbb E(\boldsymbol x_t\mid\boldsymbol y_{1:s})$，$\boldsymbol P_{t\mid s}=\operatorname{Var}(\boldsymbol x_t\mid\boldsymbol y_{1:s})$。

**定义 30.10（固定区间平滑）**

给定完整样本 $\boldsymbol y_{1:T}$，对 $t=0,1,\ldots,T$ 计算条件分布 $p(\boldsymbol x_t\mid\boldsymbol y_{1:T})$ 的过程称为固定区间平滑；其均值与协方差分别记为 $\boldsymbol a_{t\mid T}$ 和 $\boldsymbol P_{t\mid T}$。相应的联合平滑分布为 $p(\boldsymbol x_{0:T}\mid\boldsymbol y_{1:T})$。当 $T$ 固定而新增观测继续到达时，每次重新运行平滑所得的历史估计允许修订，这与只向前递推的滤波有本质区别。

**定理 30.11（RTS固定区间平滑递推）**

设状态方程为 $\boldsymbol x_{t+1}=\boldsymbol A_{t+1}\boldsymbol x_t+\boldsymbol b_{t+1}+\boldsymbol\eta_{t+1}$，预测与滤波量已由 Kalman 递推得到。令

$$
\boldsymbol J_t=\boldsymbol P_{t\mid t}\boldsymbol A_{t+1}^{\top}\boldsymbol P_{t+1\mid t}^{-1}.
\tag{30.15}
$$

从 $\boldsymbol a_{T\mid T}$ 与 $\boldsymbol P_{T\mid T}$ 出发，按 $t=T-1,T-2,\ldots,0$ 反向计算

$$
\begin{aligned}
\boldsymbol a_{t\mid T}&=\boldsymbol a_{t\mid t}+\boldsymbol J_t(\boldsymbol a_{t+1\mid T}-\boldsymbol a_{t+1\mid t}),\\
\boldsymbol P_{t\mid T}&=\boldsymbol P_{t\mid t}+\boldsymbol J_t(\boldsymbol P_{t+1\mid T}-\boldsymbol P_{t+1\mid t})\boldsymbol J_t^{\top}.
\end{aligned}
\tag{30.16}
$$

若预测协方差奇异，则以广义逆替代逆矩阵，并在由预测协方差支撑的状态子空间内解释递推。

**证明**
固定 $t$，先以 $\boldsymbol y_{1:t}$ 为条件。状态方程与 Kalman 预测公式给出 $(\boldsymbol x_t,\boldsymbol x_{t+1})$ 的联合高斯分布，其条件均值分别为 $\boldsymbol a_{t\mid t}$ 和 $\boldsymbol a_{t+1\mid t}$，并且

$$\operatorname{Cov}(\boldsymbol x_t,\boldsymbol x_{t+1}\mid\boldsymbol y_{1:t})=\boldsymbol P_{t\mid t}\boldsymbol A_{t+1}^{\top}.$$

由联合高斯向量的条件分布公式，给定 $\boldsymbol x_{t+1}$ 时，$\boldsymbol x_t$ 的条件均值是 $\boldsymbol a_{t\mid t}+\boldsymbol J_t(\boldsymbol x_{t+1}-\boldsymbol a_{t+1\mid t})$，条件协方差是 $\boldsymbol M_t=\boldsymbol P_{t\mid t}-\boldsymbol J_t\boldsymbol P_{t+1\mid t}\boldsymbol J_t^{\top}$。这里式（30.15）正是跨期协方差除以预测协方差所得的回归系数。

又因状态过程具有 Markov 性，给定 $\boldsymbol x_{t+1}$ 后，未来观测 $\boldsymbol y_{t+1:T}$ 与 $\boldsymbol x_t$ 及过去观测之间的额外依赖被切断。因此，把上述条件分布再对 $\boldsymbol y_{t+1:T}$ 取条件时，条件均值形式不变，只是 $\boldsymbol x_{t+1}$ 尚未被固定。对平滑均值使用迭代期望法则，便得到式（30.16）的第一行。

对平滑协方差使用全协方差公式。给定 $\boldsymbol x_{t+1}$ 与全部观测时的条件协方差仍为 $\boldsymbol M_t$，而条件均值中随机部分 $\boldsymbol J_t\boldsymbol x_{t+1}$ 的协方差为 $\boldsymbol J_t\boldsymbol P_{t+1\mid T}\boldsymbol J_t^{\top}$。两部分相加，得到

$$\boldsymbol P_{t\mid T}=\boldsymbol M_t+\boldsymbol J_t\boldsymbol P_{t+1\mid T}\boldsymbol J_t^{\top},$$

代入 $\boldsymbol M_t$ 即得第二行。终点条件分布就是滤波分布，故反向递推可以从 $T-1$ 逐步运行到 $0$，每一步均已使用全部观测。

□

式（30.16）显示，平滑方差不必机械地小于每一个滤波方差这一表述若指矩阵差的半正定性，则在高斯模型下确由条件化不增加协方差得到；若未来信息稀少，两者可以非常接近。计算时应先保存全部预测和滤波量，再反向运行，不能用平滑均值重新替代滤波均值而破坏递推的信息集。

**定理 30.12（预测误差分解与高斯似然）**

设第 $t$ 期观测维数为 $m_t$，新息及其协方差为 $\boldsymbol\nu_t=\boldsymbol y_t-\boldsymbol C_t\boldsymbol a_{t\mid t-1}-\boldsymbol d_t$ 与 $\boldsymbol S_t$。在初始分布和条件高斯假设下，观测密度满足

$$
p(\boldsymbol y_{1:T};\boldsymbol\theta)=\prod_{t=1}^{T}(2\pi)^{-m_t/2}\lvert\boldsymbol S_t\rvert^{-1/2}\exp\!\left(-\frac12\boldsymbol\nu_t^{\top}\boldsymbol S_t^{-1}\boldsymbol\nu_t\right).
\tag{30.17}
$$

等价地，负二倍对数似然为

$$
-2\log p(\boldsymbol y_{1:T};\boldsymbol\theta)=\sum_{t=1}^{T}\left(m_t\log(2\pi)+\log\lvert\boldsymbol S_t\rvert+\boldsymbol\nu_t^{\top}\boldsymbol S_t^{-1}\boldsymbol\nu_t\right).
\tag{30.18}
$$

**证明**
对联合密度反复使用乘法公式，可得 $p(\boldsymbol y_{1:T};\boldsymbol\theta)=\prod_{t=1}^{T}p(\boldsymbol y_t\mid\boldsymbol y_{1:t-1};\boldsymbol\theta)$，其中 $t=1$ 时的条件信息为空集。在线性高斯模型中，$\boldsymbol y_t$ 给定过去观测后的分布仍是高斯分布；Kalman 预测步骤恰好给出其均值 $\boldsymbol C_t\boldsymbol a_{t\mid t-1}+\boldsymbol d_t$ 与协方差 $\boldsymbol S_t$。因此第 $t$ 个条件密度就是以 $\boldsymbol\nu_t$ 为偏差、以 $\boldsymbol S_t$ 为协方差的高斯密度。将这些密度逐项代入并取对数，即得式（30.17）与式（30.18）。整个推导没有假定新息在误设模型下仍然独立；独立性是正确模型与正确参数下的结论，而非似然分解成立所额外要求的条件。

□

预测误差分解把一次高维联合密度计算转化为滤波递推中的小规模线性代数。实现时用 Cholesky 分解同时计算二次型与对数行列式，不应显式形成 $\boldsymbol S_t^{-1}$，也不应通过特征值连乘求行列式。若 $\boldsymbol S_t$ 接近奇异，应先检查观测共线性、噪声设定和尺度，而不是直接添加未经解释的常数。

**定义 30.13（超参数极大似然估计）**

把状态转移、观测方程、噪声协方差以及初始分布中的未知量统一记为 $\boldsymbol\theta\in\boldsymbol\Theta$。对每个候选参数运行一次 Kalman 滤波，并由式（30.18）定义 $\ell_T(\boldsymbol\theta)=-2\log p(\boldsymbol y_{1:T};\boldsymbol\theta)$，则超参数极大似然估计为

$$
\widehat{\boldsymbol\theta}_T\in\underset{\boldsymbol\theta\in\boldsymbol\Theta}{\operatorname{arg\,min}}\ \ell_T(\boldsymbol\theta).
\tag{30.19}
$$

其中参数空间必须同时表达模型约束，例如协方差半正定、稳定状态转移的谱半径约束以及可识别性约束。

数值优化通常把正定矩阵参数化为 Cholesky 因子，把无约束优化变量映射到有界参数，并用多组初值区分局部极小与全局极小。可对集中参数先求解析条件最优，再对余下参数做剖面似然优化；但每次剖面仍须运行完整滤波，因为改变噪声参数会改变所有新息协方差。尺度化有助于优化稳定，却必须在还原参数后重新核对似然。 Hessian 矩阵或得分外积可给出参数不确定性的近似度量，但不能把估计后的滤波协方差解释为已经包含参数估计误差。

**命题 30.14（扩散初始化的极限）**

将初始状态分解为固定部分、扩散部分与有限方差部分：

$$
\boldsymbol x_0=\boldsymbol a_0+\boldsymbol B\boldsymbol\delta+\boldsymbol G\boldsymbol\zeta,\qquad
\boldsymbol\delta\sim N(\boldsymbol 0,\kappa\boldsymbol I_q),\quad
\boldsymbol\zeta\sim N(\boldsymbol 0,\boldsymbol I_r),\quad
\boldsymbol P_0(\kappa)=\boldsymbol G\boldsymbol G^{\top}+\kappa\boldsymbol B\boldsymbol B^{\top}.
\tag{30.20}
$$

若后续观测能识别 $\boldsymbol\delta$，则 $\kappa\to\infty$ 时，状态与参数的适当条件后验收敛到对 $\boldsymbol\delta$ 施加平坦先验所得的形式；若不能识别，扩散极限不必是正常概率分布。

**证明**
先令 $\boldsymbol\delta=\kappa^{1/2}\boldsymbol u$，其中 $\boldsymbol u\sim N(\boldsymbol 0,\boldsymbol I_q)$。对任意有界的 $\boldsymbol\delta$ 区域，其密度中的指数因子趋于 $1$，而正常化常数只含 $\kappa^{-q/2}$ 这一总体尺度。于是，在与初始状态及后续状态联合的密度中，扩散方向除了共同的正常化因子外趋于常数，有限方差方向的高斯因子保持不变。

可识别性条件保证，把联合密度对扩散方向积分后，余下密度具有有限且非零的积分。对含 $\kappa$ 的二次型作 Schur 补分解，与 $\kappa$ 同阶的后验精度项趋于由观测确定的极限，交叉项和条件均值中的相应极限也存在；共同的 $\kappa$ 正常化因子在条件分布中约去。因此非扩散方向以及在观测下可估的扩散方向组合具有所述正常后验。若某个方向从未进入观测，沿该方向的二次型恒为零，平坦因子不能正常化，故不能得到正常后验。

□

实际计算不应把 $\kappa$ 简单设成一个巨大浮点数，因为这会使预测协方差病态并放大舍入误差。精确扩散滤波把初始状态中的扩散方向单独传播，在获得足够观测后化为普通 Kalman 递推。构造扩散似然时还要删去随 $\kappa$ 发散的常数与对数行列式项；只有采用同一初始化观测集合和同一扩散约定的似然值才可比较。若平稳状态的初始分布已知，应使用无条件均值和满足离散 Lyapunov 方程的无条件协方差，而把扩散先验留给单位根、未知固定水平等无法由平稳分布初始化的成分。

**例 30.4**

在局部水平模型中，沿用例 30.3 的数值，并设两期样本在第二期结束。已知 $\widehat\mu_{1\mid1}=0.08$，$P_{1\mid1}=0.0004$，状态噪声方差为 $0.0001$；第二期滤波均值与方差分别为 $0.084$ 和 $0.0004$。求第一期的平滑均值与方差。

**解**

状态转移系数为 $1$，故第二期预测方差为 $0.0004+0.0001=0.0005$，平滑增益为 $J_1=0.0004/0.0005=0.8$。第二期预测均值仍为 $0.08$。由式（30.16），第一期平滑均值为 $0.08+0.8(0.084-0.08)=0.0832$，平滑方差为 $0.0004+0.8^2(0.0004-0.0005)=0.000336$。第二期的正向新息使第一期水平也上修，但幅度只有平滑增益所决定的一部分；平滑方差则因利用未来观测而下降。

**例 30.5**

局部水平模型的初始均值为 $0$，初始方差为 $1$，状态噪声方差与观测噪声方差分别为 $0.1$ 和 $0.2$。两期观测为 $0.10$ 与 $0.15$。写出该参数组合对负二倍对数似然的贡献，省略各期共同的 $m_t\log(2\pi)$。

**解**

第一期新息与方差为 $0.10$ 和 $1.2$，故贡献为 $\log1.2+0.10^2/1.2$。第一期更新均值为 $1/12$，更新方差为 $1/6$。第二期预测方差为 $1/6+0.1=4/15$，新息方差为 $4/15+0.2=7/15$，新息为 $0.15-1/12=1/15$。第二期贡献为 $\log(7/15)+(1/15)^2/(7/15)$。两项相加约为 $-0.562$。换一组噪声参数时必须重算全部新息与协方差，不能只替换残差平方和。

## 30.6 非高斯与非线性滤波

线性高斯状态空间模型的闭式递推依赖条件分布仍为高斯分布。一旦状态转移或观测方程非线性，或者噪声具有厚尾、偏斜与多峰性，这一性质通常不再成立。先考虑加性噪声模型

$$
\boldsymbol x_t=\boldsymbol f_t(\boldsymbol x_{t-1})+\boldsymbol w_t,\qquad
\boldsymbol y_t=\boldsymbol h_t(\boldsymbol x_t)+\boldsymbol e_t,
$$

其中 $\boldsymbol w_t\sim N(\boldsymbol 0,\boldsymbol Q_t)$，$\boldsymbol e_t\sim N(\boldsymbol 0,\boldsymbol R_t)$，各噪声相互独立并独立于初始状态。对一般的非高斯模型，改由转移密度 $p_t(\boldsymbol x_t\mid\boldsymbol x_{t-1})$ 与观测密度 $g_t(\boldsymbol y_t\mid\boldsymbol x_t)$ 描述，并保留状态的一阶 Markov 性以及给定状态路径时观测的条件独立性。

记 $\pi_{s\mid t}$ 为 $\boldsymbol x_s$ 给定 $\boldsymbol y_{1:t}$ 的密度。Chapman–Kolmogorov 方程先传播状态的不确定性，Bayes 公式再用当前观测修正预测密度，故精确滤波满足

$$
\begin{aligned}
\pi_{t\mid t-1}(\boldsymbol x_t)
&=\int p_t(\boldsymbol x_t\mid\boldsymbol x_{t-1})
\pi_{t-1\mid t-1}(\boldsymbol x_{t-1})\,d\boldsymbol x_{t-1},\\
\pi_{t\mid t}(\boldsymbol x_t)
&=\frac{g_t(\boldsymbol y_t\mid\boldsymbol x_t)\pi_{t\mid t-1}(\boldsymbol x_t)}
{\int g_t(\boldsymbol y_t\mid\boldsymbol x)\pi_{t\mid t-1}(\boldsymbol x)\,d\boldsymbol x}.
\end{aligned}
\tag{30.21}
$$

分母就是 $p(\boldsymbol y_t\mid\boldsymbol y_{1:t-1})$。式（30.21）是所有非线性滤波器的共同起点；不同方法的差别在于如何表示预测密度、如何计算积分以及如何保留非高斯信息。单峰且接近高斯的后验可用局部线性化或确定采样近似，多峰后验则更需要随机粒子或离散 regimes 的混合表示。

### 30.6.1 扩展 Kalman 滤波

**定义 30.15（扩展 Kalman 滤波）**

扩展 Kalman 滤波在当前条件均值附近对 $\boldsymbol f_t$ 与 $\boldsymbol h_t$ 作一阶 Taylor 展开，并在每个预测步和更新步把条件分布近似为高斯分布。记预测均值为 $\widehat{\boldsymbol x}_{t\mid t-1}$，滤波均值为 $\widehat{\boldsymbol x}_{t\mid t}$，相应协方差为 $\boldsymbol P_{t\mid t-1}$ 与 $\boldsymbol P_{t\mid t}$，Jacobian 矩阵为

$$
\boldsymbol F_t=\left.\frac{\partial\boldsymbol f_t}{\partial\boldsymbol x}
\right|_{\widehat{\boldsymbol x}_{t-1\mid t-1}},\qquad
\boldsymbol H_t=\left.\frac{\partial\boldsymbol h_t}{\partial\boldsymbol x}
\right|_{\widehat{\boldsymbol x}_{t\mid t-1}}.
$$于是 EKF 的一步递推为

$$
\begin{aligned}
\widehat{\boldsymbol x}_{t\mid t-1}
&=\boldsymbol f_t(\widehat{\boldsymbol x}_{t-1\mid t-1}),\\
\boldsymbol P_{t\mid t-1}
&=\boldsymbol F_t\boldsymbol P_{t-1\mid t-1}\boldsymbol F_t^\top+\boldsymbol Q_t,\\
\boldsymbol\nu_t&=\boldsymbol y_t-\boldsymbol h_t(\widehat{\boldsymbol x}_{t\mid t-1}),\\
\boldsymbol S_t&=\boldsymbol H_t\boldsymbol P_{t\mid t-1}\boldsymbol H_t^\top+\boldsymbol R_t,\\
\boldsymbol K_t&=\boldsymbol P_{t\mid t-1}\boldsymbol H_t^\top\boldsymbol S_t^{-1},\\
\widehat{\boldsymbol x}_{t\mid t}
&=\widehat{\boldsymbol x}_{t\mid t-1}+\boldsymbol K_t\boldsymbol\nu_t,\\
\boldsymbol P_{t\mid t}
&=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_{t\mid t-1}
(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top.
\end{aligned}
\tag{30.22}
$$

最后一式采用 Joseph 形式。代数上它也等于 $(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_{t\mid t-1}$，但前者对舍入误差更能保持对称性与半正定性。

为看清更新公式的来源，把预测步的随机向量 $(\boldsymbol x_t,\boldsymbol y_t)$ 近似为联合高斯向量。线性化给出观测均值 $\boldsymbol h_t(\widehat{\boldsymbol x}_{t\mid t-1})$，状态与观测的跨协方差为 $\boldsymbol P_{t\mid t-1}\boldsymbol H_t^\top$，观测协方差为 $\boldsymbol S_t$。对联合高斯向量的协方差作 Schur 补，条件均值与条件协方差分别为

$$
\widehat{\boldsymbol x}_{t\mid t-1}
+\boldsymbol P_{t\mid t-1}\boldsymbol H_t^\top\boldsymbol S_t^{-1}
\bigl(\boldsymbol y_t-\boldsymbol h_t(\widehat{\boldsymbol x}_{t\mid t-1})\bigr)
$$

与

$$
\boldsymbol P_{t\mid t-1}
-\boldsymbol P_{t\mid t-1}\boldsymbol H_t^\top\boldsymbol S_t^{-1}
\boldsymbol H_t\boldsymbol P_{t\mid t-1}.
$$

把 $\boldsymbol K_t\boldsymbol S_t\boldsymbol K_t^\top$ 展开并代入 Joseph 形式，就得到同一 Schur 补。因此 EKF 并非直接求解式（30.21），而是把每次近似后的联合分布当作高斯分布，再执行一次高斯条件化。

Taylor 展开的余项决定近似误差。若二阶导数在预测协方差覆盖的区域内很大，仅传播均值会产生明显的动态偏差；若观测函数在预测分布内近似平坦，Jacobian 又可能丢失重要的非线性信息。强非线性、多峰后验或厚尾噪声下，EKF 的高斯近似甚至可能在错误模式附近持续收缩。实现时应检查 Jacobian 的维数和计算点，使用 $\boldsymbol S_t$ 的分解求解增益，并监测新息与其近似协方差是否相容；这些检查不能替代对线性化误差本身的评估。
### 30.6.2 无迹 Kalman 滤波

EKF 用导数近似随机变量的变换，无迹 Kalman 滤波则用一组确定的 sigma 点直接传播均值与协方差。它仍对每次条件化作高斯和线性最小均方近似，但不需要计算状态函数或观测函数的 Jacobian。

**定义 30.16（无迹变换）**

设 $\boldsymbol x$ 的均值为 $\boldsymbol m$、协方差为 $\boldsymbol P$，维数为 $n$。选取 $\alpha>0$、$\kappa$ 与 $\beta$，令

$$
\lambda=\alpha^2(n+\kappa)-n,\qquad c=n+\lambda=\alpha^2(n+\kappa).
$$

取 $c\boldsymbol P$ 的 Cholesky 因子，以 $[\sqrt{c\boldsymbol P}]_i$ 表示其第 $i$ 列。无迹变换的 $2n+1$ 个 sigma 点及权重定义为

$$
\begin{aligned}
\boldsymbol\chi_0&=\boldsymbol m,\\
\boldsymbol\chi_i&=\boldsymbol m+[\sqrt{c\boldsymbol P}]_i,
\qquad i=1,\ldots,n,\\
\boldsymbol\chi_{i+n}&=\boldsymbol m-[\sqrt{c\boldsymbol P}]_i,
\qquad i=1,\ldots,n,\\
W_0^{(m)}&=\frac{\lambda}{c},\qquad
W_0^{(c)}=\frac{\lambda}{c}+1-\alpha^2+\beta,\\
W_i^{(m)}&=W_i^{(c)}=\frac{1}{2c},
\qquad i=1,\ldots,2n.
\end{aligned}
\tag{30.23}
$$

对任一可积非线性函数 $\boldsymbol\psi$，变换后的均值与协方差分别用 $\sum_{i=0}^{2n}W_i^{(m)}\boldsymbol\psi(\boldsymbol\chi_i)$ 和 $\sum_{i=0}^{2n}W_i^{(c)}(\boldsymbol\psi(\boldsymbol\chi_i)-\overline{\boldsymbol\psi})(\boldsymbol\psi(\boldsymbol\chi_i)-\overline{\boldsymbol\psi})^\top$ 近似，其中 $\overline{\boldsymbol\psi}$ 是前述 sigma 点均值。

这些权重并非任意选取。均值权重之和为 $\lambda/c+2n/(2c)=1$；正、负成对的 sigma 点使一阶加权偏差全部抵消。若 Cholesky 因子为 $\boldsymbol L$，则 $\boldsymbol L\boldsymbol L^\top=c\boldsymbol P$，并且

$$
\sum_{i=0}^{2n}W_i^{(c)}
(\boldsymbol\chi_i-\boldsymbol m)(\boldsymbol\chi_i-\boldsymbol m)^\top
=\frac{1}{c}\sum_{j=1}^{n}\boldsymbol\ell_j\boldsymbol\ell_j^\top
=\boldsymbol P,
$$

其中 $\boldsymbol\ell_j$ 是 $\boldsymbol L$ 的第 $j$ 列。中心点的偏差为零，所以 $W_0^{(c)}$ 与 $W_0^{(m)}$ 不同并不破坏这一协方差恒等式。对称构造还精确再现高斯分布的全部奇阶中心矩，因而对光滑变换通常能保留比直接一阶线性化更多的非线性信息；$\beta$ 可并入关于分布峰度的先验选择，高斯情形下常取 $\beta=2$。
将无迹变换嵌入式（30.21）的预测—更新结构。先由 $\widehat{\boldsymbol x}_{t-1\mid t-1}$ 与 $\boldsymbol P_{t-1\mid t-1}$ 构造 $\boldsymbol\chi_{t-1}^i$，再逐点通过状态方程和观测方程。加性噪声下，UKF 的完整一步为

$$
\begin{aligned}
\boldsymbol\chi_{t\mid t-1}^i&=\boldsymbol f_t(\boldsymbol\chi_{t-1}^i),\\
\widehat{\boldsymbol x}_{t\mid t-1}
&=\sum_{i=0}^{2n}W_i^{(m)}\boldsymbol\chi_{t\mid t-1}^i,\\
\boldsymbol P_{t\mid t-1}
&=\sum_{i=0}^{2n}W_i^{(c)}
\Delta\boldsymbol\chi_t^i(\Delta\boldsymbol\chi_t^i)^\top+\boldsymbol Q_t,\\
\Delta\boldsymbol\chi_t^i
&=\boldsymbol\chi_{t\mid t-1}^i-\widehat{\boldsymbol x}_{t\mid t-1},\\
\boldsymbol\zeta_t^i&=\boldsymbol h_t(\boldsymbol\chi_{t\mid t-1}^i),\qquad
\widehat{\boldsymbol y}_{t\mid t-1}
=\sum_{i=0}^{2n}W_i^{(m)}\boldsymbol\zeta_t^i,\\
\Delta\boldsymbol\zeta_t^i
&=\boldsymbol\zeta_t^i-\widehat{\boldsymbol y}_{t\mid t-1},\\
\boldsymbol S_t&=\sum_{i=0}^{2n}W_i^{(c)}
\Delta\boldsymbol\zeta_t^i(\Delta\boldsymbol\zeta_t^i)^\top+\boldsymbol R_t,\\
\boldsymbol C_t&=\sum_{i=0}^{2n}W_i^{(c)}
\Delta\boldsymbol\chi_t^i(\Delta\boldsymbol\zeta_t^i)^\top,\\
\boldsymbol K_t&=\boldsymbol C_t\boldsymbol S_t^{-1},\\
\widehat{\boldsymbol x}_{t\mid t}
&=\widehat{\boldsymbol x}_{t\mid t-1}
+\boldsymbol K_t(\boldsymbol y_t-\widehat{\boldsymbol y}_{t\mid t-1}),\\
\boldsymbol P_{t\mid t}
&=\boldsymbol P_{t\mid t-1}-\boldsymbol K_t\boldsymbol S_t\boldsymbol K_t^\top.
\end{aligned}
\tag{30.24}
$$
状态与观测使用同一组预测 sigma 点，因而 $\boldsymbol C_t$ 保留了两者的逐点对应关系；若分别独立构造 sigma 点，就不能正确识别跨协方差。非加性噪声可把噪声变量并入增广状态后再构造 sigma 点，已知均值不为零的噪声则必须在函数求值时显式加入，不能只在最后补一个协方差项。

更新步可以从最优仿射估计直接推出。把预测状态与观测近似为联合高斯向量，在仿射估计 $\boldsymbol a+\boldsymbol B\boldsymbol y_t$ 中最小化均方误差。关于 $\boldsymbol a$ 的一阶条件给出 $\boldsymbol a=\widehat{\boldsymbol x}_{t\mid t-1}-\boldsymbol B\widehat{\boldsymbol y}_{t\mid t-1}$；中心化后，目标函数关于 $\boldsymbol B$ 的一阶条件为 $\boldsymbol B\boldsymbol S_t=\boldsymbol C_t$，故 $\boldsymbol B=\boldsymbol C_t\boldsymbol S_t^{-1}$。误差与观测新息在这一近似下不相关，于是误差协方差等于 $\boldsymbol P_{t\mid t-1}-\boldsymbol K_t\boldsymbol S_t\boldsymbol K_t^\top$，正是式（30.24）的更新。

UKF 避免了 EKF 的解析或数值微分，也让状态函数的曲率通过 sigma 点直接进入矩计算，但它仍用单个均值—协方差对表示后验。若干预测 sigma 点落入不同的观测分支，平均后的高斯分布可能位于两个真实模式之间。负的中心协方差权重、过大的预测协方差及不适当的 $\alpha$ 还可能造成数值不稳定。因此应分解 $\boldsymbol S_t$ 而不是显式求逆，检查更新协方差的对称性和半正定性，并用观测预测诊断近似是否失真；对多峰或强厚尾问题，应转向粒子表示而不是继续调整局部高斯近似。
### 30.6.3 粒子滤波与序贯重要性抽样

局部高斯近似把每条轨迹压缩成均值和协方差，粒子滤波则直接用带权样本表示后验。令

$$
\overline\pi_{0:t}(\boldsymbol x_{0:t})
=\pi_0(\boldsymbol x_0)\prod_{s=1}^{t}
p_s(\boldsymbol x_s\mid\boldsymbol x_{s-1})
g_s(\boldsymbol y_s\mid\boldsymbol x_s),\qquad
Z_t=p(\boldsymbol y_{1:t}).
$$

目标轨迹后验为 $\pi_{0:t}=\overline\pi_{0:t}/Z_t$。选取可逐期抽样的建议密度

$$
q_{0:t}(\boldsymbol x_{0:t})
=q_0(\boldsymbol x_0)\prod_{s=1}^{t}
q_s(\boldsymbol x_s\mid\boldsymbol x_{0:s-1},\boldsymbol y_{1:s}),
$$

并要求只要 $\overline\pi_{0:t}(\boldsymbol x_{0:t})>0$，就有 $q_{0:t}(\boldsymbol x_{0:t})>0$。这个支撑条件保证目标密度绝对连续于建议密度，否则建议分布永远无法覆盖某些具有正后验质量的轨迹。

完整的未归一化重要性权重是目标未归一化密度与建议密度的 Radon–Nikodym 比。代入两种密度的因子分解，逐项约去相邻时点的公共因子，得到

$$
\begin{aligned}
\omega_t(\boldsymbol x_{0:t})
&=\frac{\overline\pi_{0:t}(\boldsymbol x_{0:t})}{q_{0:t}(\boldsymbol x_{0:t})}\\
&=\frac{\pi_0(\boldsymbol x_0)}{q_0(\boldsymbol x_0)}
\prod_{s=1}^{t}\frac{
 p_s(\boldsymbol x_s\mid\boldsymbol x_{s-1})g_s(\boldsymbol y_s\mid\boldsymbol x_s)}
 {q_s(\boldsymbol x_s\mid\boldsymbol x_{0:s-1},\boldsymbol y_{1:s})}\\
&=\omega_{t-1}(\boldsymbol x_{0:t-1})
\frac{p_t(\boldsymbol x_t\mid\boldsymbol x_{t-1})g_t(\boldsymbol y_t\mid\boldsymbol x_t)}
 {q_t(\boldsymbol x_t\mid\boldsymbol x_{0:t-1},\boldsymbol y_{1:t})},
\end{aligned}
\tag{30.25}
$$

初始权重为 $\omega_0=\pi_0/q_0$。因此，已有粒子只需按 $q_t$ 延伸一个状态，再乘以式（30.25）最后的增量权重，无须重算整条轨迹的两个密度。当前状态的滤波近似由轨迹粒子的最后一个坐标及其权重给出，过去的坐标仅记录路径与后续建议分布所需的信息。

**定理 30.17（自归一化序贯重要性估计的一致性）**

从 $q_{0:t}$ 独立抽取 $N$ 条轨迹 $\boldsymbol x_{0:t}^{i}$，按式（30.25）计算 $\omega_t^i$。设 $Z_t>0$，权重关于 $q_{0:t}$ 可积，且函数 $\varphi$ 满足 $\mathbb E_{\pi_{0:t}}|\varphi(\boldsymbol x_{0:t})|<\infty$。定义归一化权重、正常化常数估计、后验泛函估计和有效样本量为
$$
\begin{aligned}
W_t^i&=\frac{\omega_t^i}{\sum_{j=1}^{N}\omega_t^j},\qquad
\widehat Z_t^N=\frac1N\sum_{i=1}^{N}\omega_t^i,\\
\widehat I_t^N&=\sum_{i=1}^{N}W_t^i\varphi(\boldsymbol x_{0:t}^i),\qquad
N_{\mathrm{eff},t}=\frac{1}{\sum_{i=1}^{N}(W_t^i)^2}.
\end{aligned}
\tag{30.26}
$$

当 $N\to\infty$ 时，$\widehat Z_t^N\to Z_t$，并且 $\widehat I_t^N$ 收敛到 $\mathbb E_{\pi_{0:t}}\varphi(\boldsymbol x_{0:t})$，两个收敛结论均几乎必然成立。

**证明**

先计算未归一化权重的两个期望。利用支撑条件和权重定义，

$$
\begin{aligned}
\mathbb E_{q_{0:t}}\omega_t
&=\int q_{0:t}(\boldsymbol x_{0:t})
\frac{\overline\pi_{0:t}(\boldsymbol x_{0:t})}{q_{0:t}(\boldsymbol x_{0:t})}
\,d\boldsymbol x_{0:t}=Z_t,\\
\mathbb E_{q_{0:t}}[\omega_t\varphi]
&=\int \overline\pi_{0:t}(\boldsymbol x_{0:t})
\varphi(\boldsymbol x_{0:t})\,d\boldsymbol x_{0:t}\\
&=Z_t\mathbb E_{\pi_{0:t}}\varphi(\boldsymbol x_{0:t}).
\end{aligned}
$$

目标可积性与 $Z_t<\infty$ 保证上述积分有意义。对独立同分布的 $\omega_t^i$ 应用强大数定律，$N^{-1}\sum_i\omega_t^i$ 几乎必然收敛到 $Z_t$。同理，$N^{-1}\sum_i\omega_t^i\varphi(\boldsymbol x_{0:t}^i)$ 几乎必然收敛到 $Z_t\mathbb E_{\pi_{0:t}}\varphi$。把第二个平均量除以第一个平均量，未知的 $Z_t$ 恰好约去；由于 $Z_t>0$，连续映射保持极限，故归一化估计具有所述极限。这就证明了式（30.26）中两个估计的几乎必然一致性。

□

未归一化平均权重是 $Z_t$ 的无偏估计，而两个随机平均量之比通常不是有限样本无偏估计；一致性不能被表述成自归一化估计严格无偏。取 $\varphi$ 为集合的指示函数，就得到相应后验概率的估计；取 $\varphi(\boldsymbol x_{0:t})=\boldsymbol x_t$，就得到滤波均值估计。有效样本量介于 $1$ 与 $N$ 之间：全部权重相等时等于 $N$，全部质量集中于一个粒子时等于 $1$。它是权重集中程度的诊断量，而不是后验精度的直接度量。
建议密度决定增量权重的波动。最直接的选择是 $q_t=p_t$，称为 bootstrap 建议；此时转移密度在式（30.25）中约去，增量权重只剩 $g_t(\boldsymbol y_t\mid\boldsymbol x_t)$。它实现简单，却不利用当前观测来放置新粒子，观测似然很尖锐时，大量粒子会因权重过小而失效。

若固定历史轨迹与观测，把下一步建议取为

$$
q_t^{\star}(\boldsymbol x_t)
=p_t(\boldsymbol x_t\mid\boldsymbol x_{t-1},\boldsymbol y_t)
=\frac{g_t(\boldsymbol y_t\mid\boldsymbol x_t)p_t(\boldsymbol x_t\mid\boldsymbol x_{t-1})}
{\int g_t(\boldsymbol y_t\mid\boldsymbol x)p_t(\boldsymbol x\mid\boldsymbol x_{t-1})\,d\boldsymbol x},
$$

则式（30.25）的增量权重化为分母 $p(\boldsymbol y_t\mid\boldsymbol x_{t-1})$，不再依赖刚抽到的 $\boldsymbol x_t$。因此，在给定过去粒子的条件下，这一步新抽样不增加权重方差，故称一步最优建议。不同过去粒子仍对应不同的预测似然，所以它并不保证整条轨迹权重恒定；而且只有当该条件密度可抽样、分母可计算或另有精确近似时，这一选择才可直接实施。

序贯蒙特卡洛把上述递推组织为“传播、加权、选择”的循环。初始化时从 $q_0$ 抽取粒子并赋予 $\omega_0^i$；第 $t$ 期从 $q_t$ 为每个历史粒子抽取后继，乘以增量权重并归一化，随后即可用式（30.26）估计滤波泛函。若直接重复传播而不调整粒子，早期轨迹的权重会不断分化，后续抽样也无法修复已经失去代表性的祖先坐标，这就是路径退化。

重采样以当前归一化权重选择祖先。多项重采样在给定加权粒子后，独立抽取指标 $A_t^i$，使 $\mathbb P(A_t^i=j)=W_t^j$，再令 $\widetilde{\boldsymbol x}_{0:t}^i=\boldsymbol x_{0:t}^{A_t^j}$ 中相应指标为 $A_t^i$，新权重均设为 $1/N$。对任意可积的粒子函数，

$$
\mathbb E\!\left[\frac1N\sum_{i=1}^{N}
\varphi(\widetilde{\boldsymbol x}_{0:t}^i)\,\mid\,
\{\boldsymbol x_{0:t}^j,W_t^j\}_{j=1}^{N}\right]
=\sum_{j=1}^{N}W_t^j\varphi(\boldsymbol x_{0:t}^j),
$$

因为第 $i$ 个新粒子的条件期望就是被加权和，而 $N$ 个相同项再除以 $N$ 后不变。因此重采样保持当前粒子估计的条件无偏性。它会在当期增加 Monte Carlo 误差，并复制高权重轨迹、丢弃低权重轨迹；其价值在于把后续计算集中于有希望的区域，避免无效粒子继续传播。通常在 $N_{\mathrm{eff},t}$ 低于预设阈值时自适应重采样，而不是机械地每期执行。分层或系统重采样可在保持相同边际选择概率的同时降低指标抽样的方差，但不能消除长期祖先谱系坍缩。
逐粒子的复制关系写作 $\widetilde{\boldsymbol x}_{0:t}^i=\boldsymbol x_{0:t}^{A_t^i}$。若重采样后路径过度集中，可在保持 $\pi_{0:t}$ 不变的 Markov 核下做再生移动；该核只改变粒子的 Monte Carlo 表示，不应被误认为模型中的真实状态转移。

与第18章的联系可以从静态重要性抽样恒等式直接看出。对任意可积函数，

$$
\mathbb E_{\pi_{0:t}}\varphi
=\frac{\mathbb E_{q_{0:t}}(\omega_t\varphi)}
{\mathbb E_{q_{0:t}}\omega_t},
$$

而式（30.26）只是把分子和分母分别替换为 Monte Carlo 平均。第18章中关于抽样误差、无偏正常化常数估计与建议分布支撑条件的讨论，因而逐期进入状态空间滤波；新增的关键结构是目标分布随观测到达而变化，建议分布也按历史因子分解，并通过重采样进行自适应选择。

权重退化也可用渐近方差解释。记 $I_t=\mathbb E_{\pi_{0:t}}\varphi$，对自归一化估计的分子、分母在各自极限处作一阶展开，得到

$$
N\operatorname{Var}(\widehat I_t^N)
\approx \frac{1}{Z_t^2}\int
\omega_t^2(\boldsymbol x_{0:t})
\bigl(\varphi(\boldsymbol x_{0:t})-I_t\bigr)^2
q_{0:t}(\boldsymbol x_{0:t})\,d\boldsymbol x_{0:t}.
$$

若少数轨迹具有很大的 $\omega_t$，这些轨迹的平方权重支配积分，有效样本量随之下降。最优一步建议减少的是单期条件方差，重采样改善的是后续粒子的配置，两者都不能保证高维轨迹后验的全局近似误差很小。实际报告粒子结果时，应同时检查有效样本量、不同随机种子下的稳定性和粒子谱系，而不能只给出一条滤波均值曲线。

粒子滤波的计算量通常随粒子数线性增长，但达到固定精度所需的粒子数可能随状态维数与观测信息量增加而迅速上升。局部提议、辅助变量、分块传播以及 Rao–Blackwellization 都可缓解这一问题，其共同原则是尽可能解析计算可处理的条件结构，把随机抽样集中在真正难以积分的部分。
为使前面的近似滤波与上述粒子方法在同一组符号下闭合，先把实现中容易混淆的均值、协方差和权重逐步写明。考虑加性噪声模型
$$
\boldsymbol x_t=\boldsymbol f_t(\boldsymbol x_{t-1})+\boldsymbol u_t,\qquad
\boldsymbol y_t=\boldsymbol h_t(\boldsymbol x_t)+\boldsymbol v_t,
$$
其中 $\boldsymbol u_t$ 与 $\boldsymbol v_t$ 的均值均为零，协方差分别为 $\boldsymbol Q_t$ 与 $\boldsymbol R_t$，并与过去状态独立。EKF 在上一期滤波均值处展开状态转移，在当期预测均值处展开观测函数。记
$$
\boldsymbol F_t=D\boldsymbol f_t(\widehat{\boldsymbol x}_{t-1}),\qquad
\boldsymbol H_t=D\boldsymbol h_t(\widehat{\boldsymbol x}_{t}^{-}),
$$
则预测步骤为
$$
\widehat{\boldsymbol x}_{t}^{-}=\boldsymbol f_t(\widehat{\boldsymbol x}_{t-1}),\qquad
\boldsymbol P_t^{-}=\boldsymbol F_t\boldsymbol P_{t-1}\boldsymbol F_t^\top+\boldsymbol Q_t.
$$
观测更新必须同时使用预测均值与预测协方差：
$$
\widetilde{\boldsymbol y}_t=\boldsymbol y_t-\boldsymbol h_t(\widehat{\boldsymbol x}_{t}^{-}),\qquad
\boldsymbol S_t=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t,
$$
$$
\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol S_t^{-1},\qquad
\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_{t}^{-}+\boldsymbol K_t\widetilde{\boldsymbol y}_t,\qquad
\boldsymbol P_t=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}.
\tag{30.27}
$$
这里 $\boldsymbol H_t$ 不能在上一期滤波均值处取值后又与当期预测均值混用。线性化给出
$\boldsymbol x_t\approx\widehat{\boldsymbol x}_{t}^{-}+\boldsymbol F_t(\boldsymbol x_{t-1}-\widehat{\boldsymbol x}_{t-1})+\boldsymbol u_t$ 的协方差传播，而观测残差的一阶表示为 $\widetilde{\boldsymbol y}_t\approx\boldsymbol H_t(\boldsymbol x_t-\widehat{\boldsymbol x}_{t}^{-})+\boldsymbol v_t$。分别计算状态误差与观测残差的协方差和互协方差，再作最小均方误差线性校正，就得到式（30.27）。
数值实现宜用代数等价且对称的 Joseph 形式
$$
\boldsymbol P_t=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}
(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)^\top
+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top.
$$
展开右端并代入 $\boldsymbol K_t\boldsymbol S_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top$，便回到式（30.27）的协方差式。该形式保留了两个半正定项，可降低舍入造成非对称或负特征值的风险，但不能修复错误 Jacobian 所导致的统计偏差。

UKF 不再求 Jacobian，而是用确定性的 sigma 点传播均值与协方差。设被近似变量的维数为 $n$，均值为 $\boldsymbol m$，协方差为 $\boldsymbol P$，取 $\lambda=\alpha^2(n+\kappa)-n$，并令 $\boldsymbol L\boldsymbol L^\top=\boldsymbol P$。一组标准取点为
$$
\boldsymbol\chi_0=\boldsymbol m,\qquad
\boldsymbol\chi_i=\boldsymbol m+\sqrt{n+\lambda}\,\boldsymbol L_{:,i},\qquad
\boldsymbol\chi_{i+n}=\boldsymbol m-\sqrt{n+\lambda}\,\boldsymbol L_{:,i},
$$
其中 $i=1,\ldots,n$。相应权重为
$$
w_0^{(m)}=\frac{\lambda}{n+\lambda},\qquad
w_0^{(c)}=w_0^{(m)}+(1-\alpha^2+\beta),\qquad
w_i^{(m)}=w_i^{(c)}=\frac{1}{2(n+\lambda)}.
\tag{30.28}
$$
对任意均值 $\boldsymbol m$，点集的经验均值恰为 $\boldsymbol m$；由 $\boldsymbol L\boldsymbol L^\top=\boldsymbol P$，带均值权重的二阶中心矩恰为 $\boldsymbol P$。因此 UKF 对线性传播与 Kalman 更新完全一致。式（30.28）中的 $\beta$ 是sigma点构造参数，不是后文的时变回归系数；首权重可以为负，故实现时不能把 sigma 点权重误当成概率或强行归一化成非负权重。
在第 $t$ 期，先以 $(\widehat{\boldsymbol x}_{t-1},\boldsymbol P_{t-1})$ 构造 $\boldsymbol\chi_{t-1}^i$，传播 $\boldsymbol\chi_{t|t-1}^i=\boldsymbol f_t(\boldsymbol\chi_{t-1}^i)$，再计算
$$
\widehat{\boldsymbol x}_{t}^{-}=\sum_{i=0}^{2n}w_i^{(m)}\boldsymbol\chi_{t|t-1}^i,
$$
$$
\boldsymbol P_t^{-}=\boldsymbol Q_t+
\sum_{i=0}^{2n}w_i^{(c)}
(\boldsymbol\chi_{t|t-1}^i-\widehat{\boldsymbol x}_{t}^{-})
(\boldsymbol\chi_{t|t-1}^i-\widehat{\boldsymbol x}_{t}^{-})^\top.
$$
随后可以用预测分布重新构造 sigma 点 $\boldsymbol\chi_t^i$，并令 $\boldsymbol\eta_t^i=\boldsymbol h_t(\boldsymbol\chi_t^i)$。观测预测、创新协方差与互协方差分别为
$$
\widehat{\boldsymbol y}_t=\sum_iw_i^{(m)}\boldsymbol\eta_t^i,\qquad
\boldsymbol S_t=\boldsymbol R_t+\sum_iw_i^{(c)}
(\boldsymbol\eta_t^i-\widehat{\boldsymbol y}_t)
(\boldsymbol\eta_t^i-\widehat{\boldsymbol y}_t)^\top,
$$
$$
\boldsymbol C_t=\sum_iw_i^{(c)}
(\boldsymbol\chi_t^i-\widehat{\boldsymbol x}_{t}^{-})
(\boldsymbol\eta_t^i-\widehat{\boldsymbol y}_t)^\top.
$$
最后用 $\boldsymbol K_t=\boldsymbol C_t\boldsymbol S_t^{-1}$ 以及
$\widehat{\boldsymbol x}_t=\widehat{\boldsymbol x}_{t}^{-}+\boldsymbol K_t(\boldsymbol y_t-\widehat{\boldsymbol y}_t)$ 更新均值，并以 $\boldsymbol P_t=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol S_t\boldsymbol K_t^\top$ 更新协方差。这里的 $\boldsymbol Q_t$ 与 $\boldsymbol R_t$ 分别在传播后和观测协方差中加入，不能重复添加或遗漏。若噪声以非加性方式进入 $\boldsymbol f_t$ 或 $\boldsymbol h_t$，应把噪声坐标并入增广状态后重新计算 $n$、sigma 点和权重，而不是沿用原状态的 $2n+1$ 个点。
一般非高斯模型不必采用上述高斯矩近似，粒子权重仍由目标密度与建议密度之比决定。若保留上一期未归一化权重 $\omega_{t-1}^i$，则
$$
\omega_t^i=\omega_{t-1}^i
\frac{g_t(\boldsymbol y_t\mid\boldsymbol x_t^i)
p_t(\boldsymbol x_t^i\mid\boldsymbol x_{t-1}^i)}
{q_t(\boldsymbol x_t^i\mid\boldsymbol x_{t-1:i-1}^i,\boldsymbol y_{0:t})},\qquad
W_t^i=\frac{\omega_t^i}{\sum_{j=1}^{N}\omega_t^j}.
$$
若上一期使用的是归一化权重 $W_{t-1}^i$，增量权重必须先乘 $W_{t-1}^i$ 再重新归一化；若刚完成等权重重采样，则乘子统一为 $1/N$ 并可约去。三种记账方式不能混用，否则会把上一期权重重复平方或漏乘。建议密度的条件支撑必须覆盖“转移密度乘观测似然”的支撑；仅让 $q_t$ 覆盖 $p_t$ 的支撑，在观测似然于某些区域为零时仍不足以保证权重比有意义。

计算机上应保存对数权重。记增量对数权重为 $\ell_t^i$，未归一化对数权重为 $a_t^i=a_{t-1}^i+\ell_t^i$，令 $M_t=\max_i a_t^i$，则
$$
W_t^i=\frac{\exp(a_t^i-M_t)}{\sum_{j=1}^{N}\exp(a_t^j-M_t)},\qquad
\log Z_t\approx\log N+M_t+\log\!\left(\frac1N\sum_{j=1}^{N}\exp(a_t^j-M_t)\right).
$$
减最大值不改变归一化结果，却避免指数上溢；全零分子表示当前建议与目标在数值上完全脱节，不能通过强行赋予相等权重来掩盖。权重诊断仍用 $N_{\mathrm{eff},t}=(\sum_i(W_t^i)^2)^{-1}$，并结合对数权重偏斜度、最大权重及不同种子的结果判断退化。
SMC 的“选择”步骤还需明确祖先指标的逐粒子含义。第 $i$ 个子代独立抽取 $A_t^i$，并复制
$\widetilde{\boldsymbol x}_{0:t}^i=\boldsymbol x_{0:t}^{A_t^i}$；先前表达式中的 $A_t^j$ 应按这一逐粒子关系校正为 $A_t^i$，不能让不同子代共用与子代指标无关的祖先。这样，对每个 $i$ 都有
$$
\mathbb E\!\left[\varphi(\widetilde{\boldsymbol x}_{0:t}^i)
\,\mid\,\{\boldsymbol x_{0:t}^j,W_t^j\}_{j=1}^{N}\right]
=\sum_{j=1}^{N}W_t^j\varphi(\boldsymbol x_{0:t}^j),
$$
再对 $i$ 求平均才得到前述重采样后的条件无偏性。

完整的序贯算法由此闭合：抽样后先更新并归一化权重，再计算当期滤波估计和有效样本量；只有触发重采样判据时才抽取祖先并把权重恢复为等权，下一期从恢复后的权重继续递推。若记录完整路径，重采样时必须同时复制 $0:t$ 的全部祖先坐标；若只关心当期滤波分布，则保存当前状态及足够的谱系标识即可。后者节省存储，却不能据此事后还原唯一的平滑路径。

重采样后的再生移动必须使用以当前目标分布为不变分布的 Markov 核。设核 $K_t$ 满足 $\pi_{0:t}K_t=\pi_{0:t}$，则从近似 $\pi_{0:t}$ 的粒子出发移动，不会改变目标本身，只会改变其 Monte Carlo 表示。若使用 Metropolis–Hastings 核，接受率须同时包含目标密度比与建议比，不能只按观测似然接受。若干期后绝大多数粒子共享同一早期祖先，说明谱系已经坍缩；增加当期粒子数或反复重采样不能自动恢复丢失的路径多样性。
当隐状态只取有限个值时，隐 Markov 模型给出无需 Monte Carlo 近似的精确滤波。设 $X_t\in\{1,\ldots,K\}$，转移矩阵 $\boldsymbol A_t$ 的元素为 $a_{t,ij}=\mathbb P(X_t=j\mid X_{t-1}=i)$，观测密度为 $g_{t,j}(\boldsymbol y_t)=p(\boldsymbol y_t\mid X_t=j)$。令滤波概率向量 $\boldsymbol\pi_t$ 的第 $j$ 个分量为 $\pi_{t,j}=\mathbb P(X_t=j\mid\boldsymbol y_{0:t})$，预测向量的第 $j$ 个分量为 $\pi_{t,j}^{-}=\mathbb P(X_t=j\mid\boldsymbol y_{0:t-1})$。全概率公式与 Markov 性给出
$$
\pi_{t,j}^{-}=\sum_{i=1}^{K}\pi_{t-1,i}a_{t,ij},
$$
而给定 $X_t=j$ 时，当前观测与过去观测条件独立，故 Bayes 公式给出
$$
\pi_{t,j}
=\frac{g_{t,j}(\boldsymbol y_t)\pi_{t,j}^{-}}
{\sum_{k=1}^{K}g_{t,k}(\boldsymbol y_t)\pi_{t,k}^{-}}
=\frac{g_{t,j}(\boldsymbol y_t)\sum_{i=1}^{K}\pi_{t-1,i}a_{t,ij}}
{\sum_{k=1}^{K}g_{t,k}(\boldsymbol y_t)\sum_{i=1}^{K}\pi_{t-1,i}a_{t,ik}}.
\tag{30.29}
$$
分母正是预测观测密度 $p(\boldsymbol y_t\mid\boldsymbol y_{0:t-1})$，因此每一期同时产生滤波分布与一步预测似然。若分母为零，则当前观测在模型下具有零预测密度，滤波条件分布无定义；这不是可用任意归一化绕过的数值问题。式（30.29）的矩阵写法是先算 $(\boldsymbol\pi_t^{-})^\top=\boldsymbol\pi_{t-1}^\top\boldsymbol A_t$，再将 $\boldsymbol\pi_t^{-}$ 与逐状态观测密度逐分量相乘并归一化。

该推导也澄清了粒子滤波与隐 Markov 滤波的关系：有限状态模型可直接求和，计算量为每期 $O(K^2)$；若转移矩阵稀疏，则计算量降为与状态边的数目同阶。连续状态模型把有限求和换成积分，粒子法正是用随机支撑点近似这些积分，并非改变了 Bayes 更新本身。
为得到隐 Markov 平滑分布，定义反向量 $\boldsymbol b_t$，其第 $i$ 个分量为
$b_{t,i}=p(\boldsymbol y_{t+1:T}\mid X_t=i)$，终点取 $b_{T,i}=1$。将未来观测按下一状态展开，得到
$$
b_{t,i}=\sum_{j=1}^{K}a_{t+1,ij}g_{t+1,j}(\boldsymbol y_{t+1})b_{t+1,j}.
$$
在已知 $\boldsymbol y_{0:T}$ 的条件下，$X_t$ 与 $X_{t+1}$ 的联合质量正比于
$\pi_{t,i}a_{t+1,ij}g_{t+1,j}(\boldsymbol y_{t+1})b_{t+1,j}$，对 $j$ 求和并归一化，便有
$\mathbb P(X_t=i\mid\boldsymbol y_{0:T})\propto\pi_{t,i}b_{t,i}$。因此，滤波使用前向信息，平滑还使用未来观测；把式（30.29）直接用于实时交易之外的回测而忘记其信息时点，会把两种估计混为一谈。

长序列上直接连乘预测似然会下溢。实现时可每期记录归一化常数
$c_t=\sum_k g_{t,k}(\boldsymbol y_t)\pi_{t,k}^{-}$，累加 $\log c_t$ 得到对数似然，或全程采用对数概率与 log-sum-exp。反向递推也应采用相同缩放。至此，EKF 与 UKF 提供高斯矩近似，SMC 提供一般密度近似，有限隐 Markov 模型提供离散精确递推；三者的共同核心仍是预测、以当期观测校正以及正确的信息集归一化。
## 30.7 滤波实现与量化诊断

滤波器用于量化系统时，输出的不只是状态点估计，还包括预测协方差、创新及其似然贡献。实现必须保持信息时点、观测时间戳和参数更新时点一致，并把系数变化、数据未发布和交易约束纳入同一状态空间表示。

### 30.7.1 时变 $\beta$ 与动态载荷

**定义 30.18（时变系数状态空间模型）**

对资产 $i$ 的超额收益 $r_{i,t}$，令 $\boldsymbol f_t$ 为因子向量，$\boldsymbol\beta_{i,t}$ 为时变暴露；对宏观或市场指标向量 $\boldsymbol y_t$，令 $\boldsymbol\Lambda_t$ 为动态载荷矩阵。模型写为
$$
r_{i,t}=\alpha_i+\boldsymbol\beta_{i,t}^\top\boldsymbol f_t+\varepsilon_{i,t},\qquad
\boldsymbol y_t=\boldsymbol\Lambda_t\boldsymbol f_t+\boldsymbol e_t,
\tag{30.30}
$$
并设 $\boldsymbol\beta_{i,t}=\boldsymbol\beta_{i,t-1}+\boldsymbol u_{i,t}$，$\boldsymbol f_t=\boldsymbol A\boldsymbol f_{t-1}+\boldsymbol v_t$，$\operatorname{vec}(\boldsymbol\Lambda_t)$ 服从已知系数的线性 Markov 转移。各扰动均值为零，协方差已给定且与相应的过去信息独立。

式（30.30）把回归系数与因子都看成含不确定性的状态，而不是每期重新截取窗口回归。若 $\boldsymbol f_t$ 在期初已知，则对 $\boldsymbol\beta_{i,t}$ 的观测矩阵就是 $\boldsymbol f_t^\top$，可直接使用线性 Kalman 更新；若 $\boldsymbol f_t$ 与 $\boldsymbol\beta_{i,t}$ 都是未知状态，其乘积使联合观测方程非线性，需要增广状态近似、条件分块更新或粒子滤波。动态载荷与潜因子的乘积也有同样的双线性结构，不能把“系数随时间变化”误当成观测方程仍然线性。

令预测状态为 $\widehat{\boldsymbol x}_t^{-}$、预测协方差为 $\boldsymbol P_t^{-}$。实现时应先形成当期观测矩阵，再计算创新与更新；下一期状态转移噪声才用于扩大预测协方差。若先用当期收益估计 $\beta_t$，再用同一 $\beta_t$ 解释该收益并宣称样本外拟合，就产生了信息重复。状态协方差较大表示暴露估计不稳定，不应只报告一条平滑的 $\widehat{\boldsymbol\beta}_{i,t}$ 曲线。
### 30.7.2 Nowcasting 与不规则数据发布

Nowcasting 的目标是在本期统计量尚未完整发布时，估计当前潜在状态及其已发布口径对应的总量。数据常在同一日历期内具有不同频率和不同发布日期，因而“当期观测向量”实际是完整观测向量的一个子集。把未发布项填成零、上期值或无条件均值后再按完整向量更新，会人为增加并不存在的观测信息。

**命题 30.19（部分发布数据的条件更新）**

设给定截至上一实际发布时刻的信息 $\mathcal F_{t-1}^{o}$ 后，潜状态满足
$\boldsymbol x_t\mid\mathcal F_{t-1}^{o}\sim N(\boldsymbol m_t^{-},\boldsymbol P_t^{-})$。完整观测方程为
$\boldsymbol y_t=\boldsymbol Z_t\boldsymbol x_t+\boldsymbol d_t+\boldsymbol e_t$，其中 $\boldsymbol e_t$ 的均值与协方差分别为零和 $\boldsymbol R_t$。当期仅发布由选择矩阵 $\boldsymbol S_t$ 选出的分量，且发布集合由过去信息决定。记
$$
\boldsymbol H_t=\boldsymbol S_t\boldsymbol Z_t,\qquad
\boldsymbol d_t^{o}=\boldsymbol S_t\boldsymbol d_t,\qquad
\boldsymbol R_t^{o}=\boldsymbol S_t\boldsymbol R_t\boldsymbol S_t^\top,
$$
则利用 $\boldsymbol y_t^{o}=\boldsymbol S_t\boldsymbol y_t$ 后的条件均值与条件协方差为
$$
\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top
(\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t^{o})^{-1},
$$
$$
\boldsymbol m_t=\boldsymbol m_t^{-}+\boldsymbol K_t
(\boldsymbol y_t^{o}-\boldsymbol H_t\boldsymbol m_t^{-}-\boldsymbol d_t^{o}),\qquad
\boldsymbol P_t=(\boldsymbol I-\boldsymbol K_t\boldsymbol H_t)\boldsymbol P_t^{-}.
$$

**证明**

在给定过去信息后，状态预测误差 $\boldsymbol x_t-\boldsymbol m_t^{-}$ 与观测噪声独立。将已发布观测对其预测值作中心化处理，得到
$$
\boldsymbol y_t^{o}-\boldsymbol H_t\boldsymbol m_t^{-}-\boldsymbol d_t^{o}
=\boldsymbol H_t(\boldsymbol x_t-\boldsymbol m_t^{-})+\boldsymbol S_t\boldsymbol e_t.
$$
因此该创新的协方差为
$\boldsymbol V_t=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t^{o}$，状态与创新的互协方差为 $\boldsymbol P_t^{-}\boldsymbol H_t^\top$。令 $\boldsymbol K_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top\boldsymbol V_t^{-1}$，并定义残差
$$
\boldsymbol\xi_t=\boldsymbol x_t-\boldsymbol m_t^{-}
-\boldsymbol K_t(\boldsymbol y_t^{o}-\boldsymbol H_t\boldsymbol m_t^{-}-\boldsymbol d_t^{o}).
$$
由 $\boldsymbol K_t$ 的取值，$\boldsymbol\xi_t$ 与上述创新的协方差为
$\boldsymbol P_t^{-}\boldsymbol H_t^\top-\boldsymbol K_t\boldsymbol V_t=\boldsymbol 0$。二者联合高斯且不相关，故相互独立；又因为 $\boldsymbol\xi_t$ 的均值为零，得到
$$
\mathbb E(\boldsymbol x_t\mid\boldsymbol y_t^{o},\mathcal F_{t-1}^{o})
=\boldsymbol m_t^{-}+\boldsymbol K_t
(\boldsymbol y_t^{o}-\boldsymbol H_t\boldsymbol m_t^{-}-\boldsymbol d_t^{o}).
$$
条件协方差等于 $\boldsymbol\xi_t$ 的无条件协方差。展开其平方并再次利用正交性，就有
$\boldsymbol P_t=\boldsymbol P_t^{-}-\boldsymbol K_t\boldsymbol V_t\boldsymbol K_t^\top$，代入 $\boldsymbol K_t\boldsymbol V_t=\boldsymbol P_t^{-}\boldsymbol H_t^\top$，即得命题中的更新式。

□

若当前目标量是 $\boldsymbol c_t=\boldsymbol C_t\boldsymbol x_t$，则其 Nowcast 为 $\boldsymbol C_t\boldsymbol m_t$，不确定性为 $\boldsymbol C_t\boldsymbol P_t\boldsymbol C_t^\top$。例如季度流量可以表示为季度内各月潜状态的线性聚合，月频指标、周频指标和已发布季度分项分别对应不同的 $\boldsymbol S_t$ 与 $\boldsymbol Z_t$。每次新发布只追加一个似然因子，未发布行不进入创新，也不会把后验协方差错误地压缩。

发布集合由过去信息决定这一条件不可省略。如果数据提供方会因当前状态大小而延迟或提前发布，那么“是否可见”本身含有状态信息，必须联合建模发布机制。实际系统还应保存每个序列的参考期、发布日期、修订版本和观测误差口径，以防把事后修订值用于原时点的 Nowcast。
**例 30.6**

某实时活动指数 $x_t$ 的预测分布为 $N(0.4,0.25)$。两个指标的完整观测方程为 $y_{1,t}=x_t+e_{1,t}$ 与 $y_{2,t}=0.8x_t+e_{2,t}$，噪声方差分别为 $0.16$ 与 $0.25$。第一次发布只有 $y_{1,t}=0.9$，随后才发布 $y_{2,t}=0.5$。求两次发布后的 Nowcast，并说明为何不能在第一次发布时把 $y_{2,t}$ 填成零。

**解**

第一次发布时，选择矩阵只保留第一行，故有效观测系数为 $1$，预测创新为 $0.9-0.4=0.5$，创新方差为 $0.25+0.16=0.41$。Kalman 增益及更新为
$$
K=\frac{0.25}{0.41}=0.609756,\qquad
\widehat x=0.4+K(0.5)=0.704878,
$$
$$
P=(1-K)0.25=0.097561.
$$
第二次发布到达时，以这一后验作为新的先验。指标预测值为 $0.8(0.704878)=0.563902$，创新为 $-0.063902$，创新方差为
$0.8^2(0.097561)+0.25=0.312439$。于是
$$
K_2=\frac{0.097561(0.8)}{0.312439}=0.249805,
$$
$$
\widehat x_2=0.704878+K_2(-0.063902)\approx0.688919,\qquad
P_2=(1-0.8K_2)0.097561\approx0.078064.
$$
第二次发布同时修正了点估计与不确定性。若第一次把未发布的 $y_{2,t}$ 填成零，就会制造创新 $-0.32$ 并额外压缩协方差；该更新把“尚无数据”错误转换为“指标显著偏低”。正确处理是第一次只使用第一行，第二次再使用新到达的观测行。
### 30.7.3 配对交易中的动态对冲

设两只资产的对数价格为 $p_t^A$ 与 $p_t^B$，价差写为 $s_t=p_t^A-a-\beta_t p_t^B$。把 $\beta_t$ 设为随机游走，可以在滤波中跟踪协整关系的变化；但用于降低组合收益方差的对冲比率，应由收益的条件协方差定义，不能机械等同于价差回归系数。若每持有一份 $A$ 就卖空 $h$ 份 $B$，对冲收益为 $\Delta p_t^A-h\Delta p_t^B$。在给定 $\mathcal F_{t-1}$ 且暂不计交易成本时，最小条件方差对冲比率为
$$
h_t^{\star}
=\frac{\operatorname{Cov}(\Delta p_t^A,\Delta p_t^B\mid\mathcal F_{t-1})}
{\operatorname{Var}(\Delta p_t^B\mid\mathcal F_{t-1})}.
\tag{30.31}
$$
事实上，对任意固定的 $h$，条件方差为
$$
\operatorname{Var}(\Delta p_t^A\mid\mathcal F_{t-1})
-2h\operatorname{Cov}(\Delta p_t^A,\Delta p_t^B\mid\mathcal F_{t-1})
+h^2\operatorname{Var}(\Delta p_t^B\mid\mathcal F_{t-1}).
$$
对 $h$ 求导并令导数为零，即得式（30.31）；二阶导数是两倍的非负条件方差，故该驻点给出最小值。

若进一步采用观测方程 $\Delta p_t^A=h_t\Delta p_t^B+\varepsilon_t$ 与状态方程 $h_t=h_{t-1}+u_t$，则 Kalman 预测均值正是基于过去信息对动态对冲比率的估计。令第 $t$ 期可交易估计为 $\widehat h_{t|t-1}$，当期收益实现后才用创新更新为 $\widehat h_t$。实际下单必须使用前者，使用后者会把当期已实现收益泄漏进当期仓位。状态噪声方差决定对冲比率适应市场变化的速度，观测噪声方差决定单次收益对估计的冲击。

交易实现还需把目标仓位写成 $-\widehat h_{t|t-1}$ 份 $B$，并在调仓时扣除买卖价差、冲击成本与借券成本。若直接最小化含二次调仓成本的条件目标，目标函数会增加 $c_t(h-\widehat h_{t|t-1})^2$，最优交易带随成本增大而变宽。此时应区分统计上的最优对冲比率与实际执行仓位，并报告残余价差创新、换手率和成本后收益。
**例 30.7**

设动态对冲比率满足 $h_t=h_{t-1}+u_t$，上一期滤波值为 $1.10$，方差为 $0.04$，状态噪声方差为 $0.01$。观测方程为 $\Delta p_t^A=h_t\Delta p_t^B+\varepsilon_t$，观测噪声方差为 $0.09$。当期实现 $\Delta p_t^B=0.8$ 与 $\Delta p_t^A=1.0$。求当期可执行仓位及观测到达后的滤波值。

**解**

状态预测给出 $h_{t|t-1}=1.10$ 与 $P_t^{-}=0.04+0.01=0.05$。因此，当期收益尚未实现时，每持有一份 $A$ 应卖空 $1.10$ 份 $B$，不能使用当期收益更新后的数值。观测到达后，
$$
\widetilde y_t=1.0-0.8(1.10)=0.12,\qquad
S_t=0.8^2(0.05)+0.09=0.122,
$$
$$
K_t=\frac{0.05(0.8)}{0.122}=0.327869.
$$
所以
$$
\widehat h_t=1.10+K_t(0.12)=1.139344,\qquad
P_t=(1-0.8K_t)0.05=0.036885.
$$
若下一期状态没有额外漂移，下一期对冲目标就从 $1.139344$ 出发。创新的标准化平方为 $0.12^2/0.122=0.118033$，单看这个数值并无异常，但仍需结合连续多期创新判断模型。

真实换手成本必须相对已执行的旧仓位计算。若旧实际仓位为 $h_{t-1}^{\mathrm{exec}}$，二次成本项应写成 $c_t(h-h_{t-1}^{\mathrm{exec}})^2$；以统计预测值为中心的二次项只能解释为目标偏离惩罚，不能冒充换手成本。执行时先比较目标仓位与实际仓位，再依据成本决定是否越过交易带。
### 30.7.4 滤波发散与模型误设诊断

滤波发散既可能表现为状态误差持续增长，也可能表现为滤波协方差很小而真实误差很大。前者容易从曲线上发现，后者更危险，因为系统会对错误状态表现出过度自信。诊断必须同时检查创新、状态误差与数值协方差，不能只用样本内拟合优度判断。

**定理 30.20（创新白噪声与归一化创新平方）**

设线性高斯状态空间模型的初值、状态噪声、观测噪声及全部已知矩阵均正确，滤波器从正确先验出发。令当期观测维数为 $m_t$，预测误差为 $\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-}$，并记
$$
\boldsymbol\nu_t=\boldsymbol y_t-\boldsymbol H_t\widehat{\boldsymbol x}_t^{-}-\boldsymbol d_t,\qquad
\boldsymbol V_t=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t.
$$
若 $\boldsymbol V_t$ 正定，则归一化创新平方
$$
D_t=\boldsymbol\nu_t^\top\boldsymbol V_t^{-1}\boldsymbol\nu_t
\tag{30.32}
$$
服从自由度为 $m_t$ 的卡方分布，并且 $\boldsymbol\nu_1,\ldots,\boldsymbol\nu_T$ 相互独立。

**证明**

观测方程减去其一步预测，得到
$$
\boldsymbol\nu_t=\boldsymbol H_t(\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-})+\boldsymbol e_t.
$$
预测误差在给定过去观测后的条件均值为零，观测噪声的条件均值也为零，故 $\mathbb E(\boldsymbol\nu_t\mid\mathcal F_{t-1})=\boldsymbol 0$。预测误差与当期观测噪声独立，分别计算两项协方差即得
$$
\mathbb E(\boldsymbol\nu_t\boldsymbol\nu_t^\top\mid\mathcal F_{t-1})
=\boldsymbol H_t\boldsymbol P_t^{-}\boldsymbol H_t^\top+\boldsymbol R_t
=\boldsymbol V_t.
$$
由于全部变量联合高斯，$\boldsymbol\nu_t$ 在给定过去信息后的分布为 $N(\boldsymbol 0,\boldsymbol V_t)$，该分布不随过去观测的具体取值改变，所以 $\boldsymbol\nu_t$ 与 $\mathcal F_{t-1}$ 独立。递推到 $1,\ldots,t-1$，即得整个创新序列相互独立。再取 Cholesky 分解 $\boldsymbol V_t=\boldsymbol L_t\boldsymbol L_t^\top$，令 $\boldsymbol z_t=\boldsymbol L_t^{-1}\boldsymbol\nu_t$。则
$$
\mathbb E(\boldsymbol z_t\boldsymbol z_t^\top)
=\boldsymbol L_t^{-1}\boldsymbol V_t(\boldsymbol L_t^{-1})^\top
=\boldsymbol I_{m_t},
$$
且 $\boldsymbol z_t$ 仍为高斯向量，故其各分量是独立标准正态变量。于是
$$
D_t=\boldsymbol\nu_t^\top(\boldsymbol L_t^\top)^{-1}
\boldsymbol L_t^{-1}\boldsymbol\nu_t
=\boldsymbol z_t^\top\boldsymbol z_t
=\sum_{j=1}^{m_t}z_{t,j}^2,
$$
右端服从自由度为 $m_t$ 的卡方分布。由于 $D_t$ 只是 $\boldsymbol\nu_t$ 的函数，创新序列的独立性也给出各期 $D_t$ 的独立性。

□

式（30.32）提供的是校准诊断而非单向拟合指标。$D_t$ 长期过大，可能来自创新偏差、观测噪声被低估、预测协方差被低估或异常值；长期过小则通常表示滤波器过度保守，或观测噪声与预测协方差被高估。创新均值显著非零指向观测截距、状态漂移或数据对齐错误；创新自相关则意味着仍有可预测的动态未进入状态模型。应结合 $D_t$ 的时序图、创新自相关和不同滚动窗口进行判断，不能只选一个异常阈值。

若有独立的真实状态或高精度事后估计 $\boldsymbol x_t^{\mathrm{ref}}$，还可将状态误差 $\widehat{\boldsymbol x}_t-\boldsymbol x_t^{\mathrm{ref}}$ 用 $\boldsymbol P_t$ 标准化。真实误差很大而 $D_t$ 正常，可能表示观测本身不足以识别错误状态；真实误差与 $D_t$ 同时异常，才更支持即期模型失配或更新失败。没有参考状态时，不应把滤波器自报的 $\boldsymbol P_t$ 当作真实误差的独立验证。
数值层面的排查应先于参数重估。每期检查 $\boldsymbol P_t^{-}$ 与 $\boldsymbol P_t$ 是否对称、特征值是否仍在容差允许的非负范围内，并检查 $\boldsymbol V_t$ 的条件数。线性高斯更新可采用 Joseph 形式或平方根滤波，EKF 与 UKF 还应检查线性化点、sigma 点权重以及过程和观测噪声是否各加入一次。若状态含波动率、载荷尺度或对冲上限，对状态施加约束后，原来的高斯条件分布已经改变，必须重新解释协方差，而不能只截断均值却保留原更新。

数据层面的发散常由时间戳错位触发。收益所属区间、宏观数据参考期、实际发布日期和可交易时刻必须分别保存；动态对冲中尤其要确认调仓使用的是上一信息集下的预测状态。对混频 Nowcasting，应确认选择矩阵只包含当时已发布且当时可用的版本。把修订后数据回灌到历史滤波，会使创新虚假减小，并掩盖真实实时误设。

模型层面的处理应与诊断原因对应。创新均值持续偏移时，应检查截距和漂移；创新出现持续相关时，应增加可识别状态或修改转移；极端离群创新集中出现时，可采用具有重尾观测噪声的滤波或稳健的广义更新，但必须重新计算相应的权重与协方差。过程噪声增大通常使滤波器更快遗忘旧状态，观测噪声增大则降低当期观测增益；二者对创新的影响不同，不能用一个任意乘数同时膨胀所有协方差来长期掩盖问题。

对时变 $\beta$ 和动态载荷，还应把参数时变与结构突变区分开。随机游走适合连续漂移，但若创新在已知制度变更后呈现台阶式偏移，则需要突变状态、制度转移或重新初始化相应状态块。任何重初始化都应记录触发规则及其信息时点，并在实时样本外序列上复核。滤波诊断的结论因而应落实到具体观测方程、状态块或数值步骤，而不是只报告“模型已经收敛”。
粒子权重与上述诊断衔接时，还需统一实现接口。30.6 中建议密度条件里的历史轨迹下标应统一读作 $\boldsymbol x_{0:t-1}^{i}$，不表示任何颠倒的区间。支撑条件也应精确表述为：凡 $g_t(\boldsymbol y_t\mid\boldsymbol x)p_t(\boldsymbol x\mid\boldsymbol x_{t-1}^{i})>0$ 处，建议密度必须为正。因此，若建议密度已经覆盖转移密度的整个支撑，它必然覆盖二者乘积的支撑；观测似然取零只会缩小目标支撑，不会破坏该条件。真正需要排查的是建议密度在目标乘积为正的区域为零，以及浮点下溢造成的数值零。出现后者时应回到对数权重和一步最优建议检查，而不是把支撑误设与舍入问题混为一谈。
### 30.7.5 粒子诊断与滤波接口的一致性

上述支撑条件必须与权重更新、重采样和似然贡献在同一组记号下实现。设 $W_{t-1}^i$ 是上一期归一化权重，若上一期刚完成重采样，则 $W_{t-1}^i=1/N$。令建议密度为 $q_t(\boldsymbol x_t\mid\boldsymbol x_{0:t-1}^i,\boldsymbol y_{1:t})$，定义增量比与本期权重
$$
a_t^i=\frac{g_t(\boldsymbol y_t\mid\boldsymbol x_t^i)p_t(\boldsymbol x_t^i\mid\boldsymbol x_{t-1}^i)}{q_t(\boldsymbol x_t^i\mid\boldsymbol x_{0:t-1}^i,\boldsymbol y_{1:t})},\qquad
\omega_t^i=W_{t-1}^i a_t^i,\qquad
W_t^i=\frac{\omega_t^i}{\sum_{j=1}^N\omega_t^j}.
\tag{30.33}
$$
这里的历史轨迹始终按时间递增排列，即 $\boldsymbol x_{0:t-1}^i=(\boldsymbol x_0^i,\ldots,\boldsymbol x_{t-1}^i)$。若实现中把最新状态放在数组首端，也必须在接口转换后使用同一时间顺序，不能把存储顺序误当作概率条件中的时间顺序。

支撑要求的完整含义是
$$
g_t(\boldsymbol y_t\mid\boldsymbol x)p_t(\boldsymbol x\mid\boldsymbol x_{t-1}^i)>0
\Longrightarrow
q_t(\boldsymbol x\mid\boldsymbol x_{0:t-1}^i,\boldsymbol y_{1:t})>0.
\tag{30.34}
$$
该条件须对每一个被抽取的历史轨迹成立。转移密度与建议密度具有相同支撑时，仍需检查浮点计算：两个正常密度相乘可能下溢，取对数后又可能因零概率而产生无穷值。程序应区分数学上的零、超出数值表示范围的零以及非法参数导致的缺失值，并分别记录。权重计算宜在对数尺度完成：
$$
\log a_t^i=\log g_t(\boldsymbol y_t\mid\boldsymbol x_t^i)
+\log p_t(\boldsymbol x_t^i\mid\boldsymbol x_{t-1}^i)
-\log q_t(\boldsymbol x_t^i\mid\boldsymbol x_{0:t-1}^i,\boldsymbol y_{1:t}),
\qquad
\log\omega_t^i=\log W_{t-1}^i+\log a_t^i.
\tag{30.35}
$$
若分子为正而建议密度为零，应报告支撑违反；若分子为零，则该粒子权重为零，不应通过对零取任意正数来保留它。令 $m_t=\max_i\log\omega_t^i$，则归一化常数的对数估计可写为
$$
\log\widehat c_t=m_t+\log\left[\sum_{i=1}^N
\exp(\log\omega_t^i-m_t)\right],\qquad
\widehat c_t=\sum_{i=1}^N\omega_t^i.
\tag{30.36}
$$
在式（30.33）的权重约定下，$\widehat c_t$ 估计当期观测的条件似然贡献，因而对数似然估计按 $\log\widehat c_t$ 累加。若所有对数权重都为负无穷，不能直接把该期似然设为一个任意小正数，而应检查数据、建议分布和状态支撑。

粒子诊断至少同时报告有效样本量、最大权重和权重熵。有效样本量为
$$
\operatorname{ESS}_t=\frac{1}{\sum_{i=1}^N(W_t^i)^2},
\qquad 1\le\operatorname{ESS}_t\le N.
\tag{30.37}
$$
$\operatorname{ESS}_t$ 接近 $1$ 表明权重高度集中，接近 $N$ 表明权重近似均匀；它衡量蒙特卡洛近似的退化程度，不等同于模型拟合优度。重采样后有效样本量恢复为 $N$，只说明粒子重新等权，并不说明误设已经消失。应把重采样前后的数值分别保存，否则接口会把算法干预误报为诊断改善。
### 30.7.6 联合诊断与实时审计

单项指标不能唯一识别故障来源。若归一化创新平方持续偏大，而有效样本量、协方差特征值和权重计算均正常，应优先检查观测方程、状态转移和噪声设定；若创新统计尚在校准范围内而有效样本量频繁崩塌，应优先改进建议密度、增加粒子或采用合适的重采样方案。两类指标同时异常时，则既可能存在模型误设，也可能因建议分布过窄而未覆盖高似然区域。此时仅增加粒子不能修复错误的支撑，仅扩大过程噪声也不能修复错误的数据时点。

滚动窗口诊断应保持维数信息。在定理 30.20 的条件下，若窗口内各期创新仍来自同一正确模型，则
$$
\sum_{r=t-s+1}^{t}D_r\sim
\chi^2_{\sum_{r=t-s+1}^{t}m_r}.
\tag{30.38}
$$
因此，观测维数随发布情况变化时，不能把不同期 $D_t$ 与同一个固定自由度分位数机械比较。窗口过长会掩盖短暂制度突变，窗口过短又会放大随机波动；正式监测应预先规定窗口、显著性水平和告警后的处理规则，并同时保留原始创新供追溯。

定理 30.20 的独立性与卡方分布依赖真实参数、正确先验和精确线性高斯更新。用同一样本估计参数后再代入滤波器，所得统计量通常只具有近似校准意义；EKF、UKF 和约束滤波还包含额外近似。较稳妥的做法是在估计样本内检查实现错误，在滚动样本外检查预测校准，并用不同制度下的分段结果检验结论是否稳定。参数重估后不能继续沿用旧创新序列计算全样本统计量。

实时审计记录应把信息时点与数值状态一并保存。每期至少保存数据版本、实际可用时刻、预测与滤波状态、创新及其协方差、对数似然增量、重采样标识和数值异常码。对时变 $\beta$，还需保存实际执行仓位与目标仓位，避免把交易带造成的偏离误判为滤波误差。对制度转移模型，应保存滤波制度概率与一步预测概率，以区分突发转移和长期概率漂移。

完整诊断的终点不是一张通过或未通过的报表，而是可复核的处置链条：先排除时间戳、版本和数值错误，再区分观测误设、动态误设与蒙特卡洛退化，最后才修改模型或算法。任何修改都应在新的实时样本外序列上重新验证；被修改模型解释过的历史创新不能充当独立确认证据。
## 本章小结

状态空间方法把不可观测的动态状态与带有噪声的观测区分开来，并通过预测、更新和平滑把两者联系起来。其核心不是某一组固定矩阵，而是信息集的严格构造：一步预测只能使用当时已经可得的信息，滤波分布吸收当期观测，平滑分布则利用完整样本重新评估历史状态。初值、状态噪声、观测噪声以及数据发布时间共同决定估计含义；把事后修订数据或未来信息放入实时滤波，即使数值拟合改善，也会破坏样本外解释。

线性高斯模型中，Kalman 滤波给出条件均值与条件协方差的精确递推。预测步传播状态不确定性，更新步依据创新协方差分配状态修正，增益因此同时反映状态可预测性与观测可靠性。同一递推产生预测误差分解，使状态估计与参数似然可以在一个算法中完成；平滑则把后续观测包含的信息传回历史时点。Joseph 形式、平方根实现、对称化和条件数检查不是附属技巧，而是保证协方差解释与长期递推稳定性的必要环节。

非线性系统需要在统计近似与计算成本之间作出选择。EKF 用局部导数近似转移和观测映射，实现简洁，但在强曲率、不连续约束或线性化点偏离真值时可能产生偏差。UKF 通过确定性 sigma 点传播均值和协方差，避免显式雅可比矩阵，却仍依赖有限阶矩近似，不能自动解决多峰性和支撑错误。粒子滤波以随机样本表示一般条件分布，重要性权重必须同时包含观测似然、状态转移和建议密度；支撑条件、对数权重、有效样本量与重采样记录共同决定近似是否可信。低有效样本量反映算法退化，不能直接解释为模型误设。

制度转移模型把离散制度概率与连续状态滤波结合起来，一步预测概率、滤波概率和平滑概率分别服务于实时预警、状态识别和事后研究。用于时变 $\beta$ 与动态对冲时，状态方程表达载荷的持续变化，观测方程连接资产收益和可交易暴露，滤波输出还须经过交易成本、执行约束与信息时点的转换。目标仓位不等于实际仓位，以预测值为中心的惩罚也不能冒充相对旧实际仓位的换手成本。

滤波诊断应形成从数据到模型再到算法的闭环。正确线性高斯模型下，创新具有条件零均值、既定协方差和跨期独立性，归一化创新平方提供校准检验；持续偏移、自相关或滚动窗口异常分别指向不同的动态与观测问题。与此同时，协方差特征值、创新协方差条件数、粒子权重集中度和数值异常码帮助区分模型失配与实现故障。所有诊断都应绑定数据版本、可用时刻和重采样状态，并在新的实时样本外序列上复核。可靠的滤波结果因此不仅是状态点估计，还包括可审计的不确定性、信息边界和处置记录。
## 习题

1. 设状态满足 $\boldsymbol x_t=\boldsymbol F\boldsymbol x_{t-1}+\boldsymbol w_t$，观测满足 $\boldsymbol y_t=\boldsymbol H\boldsymbol x_t+\boldsymbol e_t$。分别说明过程噪声与观测噪声增大对一步预测协方差、Kalman 增益和滤波状态的直接影响，并讨论仅由一期拟合残差能否区分这两种噪声。若 $\boldsymbol H=\boldsymbol 0$，指出状态中哪些信息仍可由观测学习。

2. 对纯量随机游走状态 $x_t=x_{t-1}+w_t$ 和观测 $y_t=x_t+e_t$，取 $m_0=0$、$P_0=2$、$Q=1$、$R=2$，并设 $y_1=3$、$y_2=1$。逐期计算预测均值与方差、Kalman 增益以及滤波均值与方差；再分别讨论 $Q/R\to 0$ 和 $Q/R\to\infty$ 时两期更新行为的极限。

3. **完整推导：Kalman 更新。** 在给定 $\mathcal F_{t-1}$ 后，设状态预测为 $N(\widehat{\boldsymbol x}_t^{-},\boldsymbol P_t^{-})$，观测为 $\boldsymbol y_t=\boldsymbol H_t\boldsymbol x_t+\boldsymbol d_t+\boldsymbol e_t$，且 $\boldsymbol e_t$ 与预测误差独立。由状态与创新的条件联合高斯分布出发，推导增益、滤波均值和滤波协方差，并验证所得条件均值同时使后验均方误差矩阵按半正定序最小。

4. 对时变线性模型，解释预测误差 $\boldsymbol x_t-\widehat{\boldsymbol x}_t^{-}$ 与滤波误差 $\boldsymbol x_t-\widehat{\boldsymbol x}_t$ 的信息集差异。若观测矩阵在某些日期整行缺失，写出选择矩阵应如何改变，并说明缺失观测日的预测步、更新步与对数似然贡献分别如何处理。

5. **完整推导：ARMA 状态空间表示。** 对 $y_t=\phi_1y_{t-1}+\phi_2y_{t-2}+\varepsilon_t+\theta\varepsilon_{t-1}$，构造一个二维最小状态表示，明确状态向量、转移矩阵、观测矩阵及噪声协方差；从所造表示逐期展开并验证原 ARMA 递推。进一步给出状态转移稳定与原 AR 多项式稳定之间的条件，并说明该状态坐标是否唯一。

6. **完整推导：预测误差似然。** 从 $p(\boldsymbol y_{1:T}\mid\boldsymbol\psi)$ 的条件密度乘积分解出发，推导线性高斯状态空间模型的对数似然，使其只含创新、创新协方差的对数行列式和二次型。说明初始状态分布、常数项、时变观测维数以及缺失观测如何进入该表达式，并解释为何不能直接把滤波残差 $\boldsymbol y_t-\boldsymbol H_t\widehat{\boldsymbol x}_t$ 代入同一公式。
7. 设非线性模型为 $x_t=\alpha x_{t-1}+w_t$、$y_t=\beta x_t^2+e_t$。给定上一期滤波均值、方差以及 $Q$、$R$，写出 EKF 的一步预测与当期更新所需的全部雅可比矩阵、创新协方差和增益表达式。取 $\beta\ne 0$，分析预测均值为零时观测更新会出现什么现象，并判断该现象来自模型不可辨识还是局部线性化。

8. **完整推导：UKF 矩传播。** 对纯量输入 $x\sim N(m,P)$ 和非线性观测 $z=h(x)$，采用关于 $m$ 对称的三个 sigma 点。由均值与方差匹配条件推导点位置及均值、协方差权重，再推导观测预测均值、预测方差以及状态与观测的交叉协方差；说明附加尺度参数改变高阶矩但不改变前两阶匹配的条件，并指出何种强非线性会使该近似失效。

9. 一个有界波动率状态经过对数变换后服从非线性转移，观测在制度切换日还可能出现跳变。比较 EKF 与 UKF 在该问题中的线性化点、协方差传播、约束处理和计算成本，设计一个能区分“均值近似错误”与“分布非高斯”的数值实验。不得以单一均方误差指标代替全部结论。

10. **完整推导：固定区间平滑。** 对线性高斯状态空间模型，从 $\boldsymbol x_t$ 与 $\boldsymbol x_{t+1}$ 给定 $\mathcal F_t$ 的联合高斯分布出发，推导 Rauch–Tung–Striebel 后向递推中的平滑增益、平滑均值和平滑协方差。说明递推为何使用滤波量与一步预测量，并证明在全部预测协方差半正定时，所得平滑协方差保持对称半正定。

11. **完整推导：粒子权重。** 给定目标轨迹后验与可逐期采样的建议密度，从轨迹重要性比出发推导未归一化权重的递推、归一化权重和状态函数估计量，并写出建议密度必须满足的支撑条件。进一步推导以当期观测为条件的一步最优建议密度及相应增量权重，解释其降低条件方差的原因及其并非总能精确采样的原因。

12. 四个粒子的上一期归一化权重均为 $1/4$，当期增量比的对数依次为 $-2,-3,-4,-5$。用 log-sum-exp 方法计算当期对数似然增量估计、四个归一化权重和有效样本量，并按阈值 $\operatorname{ESS}<N/2$ 判断是否重采样。说明重采样后为什么必须将权重重置，以及该操作为什么不能提高原始目标分布的覆盖范围。
13. 某粒子滤波的观测在状态左尾具有很高似然，而建议密度只覆盖状态分布的右尾。说明这会违反哪一个支撑条件，并分析单纯增加粒子数、单纯提高重采样频率和简单放大全部权重为何都不能修复问题。给出一套同时利用粒子位置、对数增量比和有效样本量的排查步骤，并提出一种可检验的建议分布改进方案。

14. 两制度 Markov 链的转移矩阵元素为 $P_{ij}=\mathbb P(s_t=j\mid s_{t-1}=i)$，矩阵为 $\begin{pmatrix}0.9&0.1\\0.2&0.8\end{pmatrix}$。上一期滤波概率为 $(0.8,0.2)$，当期两种制度下的观测密度分别为 $0.4$ 与 $1.1$。计算一步预测制度概率、当期预测观测密度和更新后的滤波概率，并解释观测密度与转移概率各自如何改变制度判断。

15. 对“离散制度加连续线性高斯状态”的模型，说明精确滤波密度为何会随时间形成项数增长的混合分布。比较只按最新制度传播的近似与保留制度历史路径的近似在均值、协方差和概率更新上的差别，并设计一个能够暴露混合分量过度合并的数值例子。

16. 令时变对冲系数满足 $\beta_t=\beta_{t-1}+\eta_t$，收益观测满足 $r_t^A=\beta_t r_t^B+\varepsilon_t$，其中 $Q=0.0004$、$R=0.0025$。某期预测均值为 $1.10$、预测方差为 $0.01$，当期 $r_t^B=0.02$、$r_t^A=0.025$。计算创新、创新方差、增益以及滤波后的 $\beta_t$ 与方差，并讨论把观测噪声误当成过程噪声后会如何改变后续对冲反应速度。

17. 滤波器给出的目标期货仓位为 $h_t^*=-0.85$，上一期实际执行仓位为 $h_{t-1}^{\mathrm{exec}}=-0.60$。以跟踪偏离 $\lambda(h-h_t^*)^2$ 与真实换手成本 $c(h-h_{t-1}^{\mathrm{exec}})^2$ 构造当期目标函数，求无交易带时的最优执行仓位，并推导存在以旧仓位为中心的交易带时保持原仓位不变的条件。说明为何不能用 $c(h-\widehat h_t^{-})^2$ 替代真实换手成本。
18. 某二维观测的创新为 $\boldsymbol\nu_t=(1,-1)^\top$，创新协方差为 $\boldsymbol V_t=\operatorname{diag}(2,0.5)$。计算 Cholesky 标准化创新及归一化创新平方 $D_t$，并以自由度为 2、显著性水平为 $5\%$ 的卡方临界值 $5.991$ 判断单期是否异常。若连续 20 期均为同维独立创新，说明应使用什么自由度检验窗口和，以及为何不能重复套用 20 次单期结论而不考虑多重检验。

19. 某实时系统分别出现创新均值持续为正、创新一阶自相关显著、$D_t$ 长期过小、滤波协方差出现小负特征值、粒子有效样本量骤降五种现象。为每种现象列出至少两类可能原因，并给出先检查数据时点与数值实现、再检查模型和算法的排查顺序。进一步说明哪些证据能够区分观测噪声高估、过程噪声低估与建议分布退化。

20. **证明：Joseph 协方差形式。** 对任意给定增益 $\boldsymbol K_t$，令 $\boldsymbol A_t=\boldsymbol I-\boldsymbol K_t\boldsymbol H_t$，从滤波误差定义推导 $\boldsymbol P_t=\boldsymbol A_t\boldsymbol P_t^{-}\boldsymbol A_t^\top+\boldsymbol K_t\boldsymbol R_t\boldsymbol K_t^\top$。在采用最优 Kalman 增益时证明它与常见简化形式等价，并说明任意增益下为何不能随意删去观测噪声项；最后证明 Joseph 形式保持对称半正定，并讨论其数值意义。

21. 设计一项基于预测误差似然的实时模型比较实验，用于比较固定载荷、随机游走载荷和两制度载荷三种模型。明确估计窗口、滚动预测时点、宏观数据发布日期与版本、缺失发布的选择矩阵、交易成本及评价指标，并说明如何避免修订后数据、未来制度和重复调参造成前视偏差。若两种模型的对数预测得分接近，给出进一步判断校准差异的方案。

22. 综合设计题：某资产的时变 $\beta$ 可能在平稳漂移与剧烈调整两种制度间切换，收益观测具有重尾，宏观解释变量按不同日期发布且交易带限制实际调仓。写出包含离散制度与连续状态的完整状态空间模型和实时信息时点，选择并说明 EKF、UKF 或粒子近似中的一种实现，给出制度概率与连续状态的更新接口、粒子权重支撑检查、换手成本处理及联合诊断方案。说明如何用真正样本外数据区分制度误设、厚尾误设和数值退化。
