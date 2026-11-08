# 第33章习题参考答案与解析

## 1. 

在单期有限离散状态空间金融市场模型中，设样本空间为 $\Omega = \{\omega_1, \omega_2, \dots, \omega_K\}$，其中每个状态的物理概率满足 $\mathbb P(\{\omega_k\}) > 0$（$k = 1, \dots, K$）。市场包含 $d+1$ 种基础资产，其时刻 $0$ 价格向量为 $\boldsymbol{S}_0 \in \mathbb R^{d+1}$，时刻 $1$ 随机支付向量为 $\boldsymbol{S}_1(\omega_k) \in \mathbb R^{d+1}$。投资组合策略用持仓向量 $\boldsymbol{\theta} \in \mathbb R^{d+1}$ 表示，其初始建立成本为 $V_0(\boldsymbol{\theta}) = \boldsymbol{\theta}^\top \boldsymbol{S}_0$，到期总支付为随机变量 $V_1(\boldsymbol{\theta}) = \boldsymbol{\theta}^\top \boldsymbol{S}_1$。

两类套利机会的形式化测度论定义如下：
第一类套利机会（Type I Arbitrage）是指存在投资策略 $\boldsymbol{\theta} \in \mathbb R^{d+1}$，满足：
$$V_0(\boldsymbol{\theta}) \le 0$$
并且到期支付满足
$$\mathbb P(V_1(\boldsymbol{\theta}) \ge 0) = 1, \quad \mathbb P(V_1(\boldsymbol{\theta}) > 0) > 0$$
第二类套利机会（Type II Arbitrage）是指存在投资策略 $\boldsymbol{\theta} \in \mathbb R^{d+1}$，满足：
$$V_0(\boldsymbol{\theta}) < 0$$
并且到期支付满足
$$\mathbb P(V_1(\boldsymbol{\theta}) \ge 0) = 1$$

**证明**

先证若存在第二类套利机会，则必然存在第一类套利机会。设 $\boldsymbol{\theta}$ 为第二类套利策略，即 $V_0(\boldsymbol{\theta}) < 0$ 且几乎必然有 $V_1(\boldsymbol{\theta}) \ge 0$。若 $\mathbb P(V_1(\boldsymbol{\theta}) > 0) > 0$，则由于 $V_0(\boldsymbol{\theta}) < 0 \le 0$，策略 $\boldsymbol{\theta}$ 本身直接满足第一类套利条件。若 $\mathbb P(V_1(\boldsymbol{\theta}) > 0) = 0$，则由状态概率全为正可知几乎必然有 $V_1(\boldsymbol{\theta}) = 0$。在无摩擦市场中，假设市场存在严格正价格的无风险储蓄资产或严格正收益资产（设其索引为第 $0$ 项，满足 $S_0^0 > 0$ 且到期 $S_1^0 > 0$），将负成本结余的资金 $-V_0(\boldsymbol{\theta}) > 0$ 全部投入该无风险资产，构造新策略 $\tilde{\boldsymbol{\theta}} = \boldsymbol{\theta} + \frac{-V_0(\boldsymbol{\theta})}{S_0^0} \boldsymbol{e}_0$。此时初始成本为 $V_0(\tilde{\boldsymbol{\theta}}) = 0 \le 0$，而到期支付为 $V_1(\tilde{\boldsymbol{\theta}}) = V_1(\boldsymbol{\theta}) + \frac{-V_0(\boldsymbol{\theta})}{S_0^0} S_1^0 > 0$ 几乎必然成立，故 $\tilde{\boldsymbol{\theta}}$ 为第一类套利机会。

再证若存在第一类套利机会，则必然存在第二类套利机会。设 $\boldsymbol{\theta}$ 为第一类套利策略，满足 $V_0(\boldsymbol{\theta}) \le 0$、$\mathbb P(V_1(\boldsymbol{\theta}) \ge 0) = 1$ 以及 $\mathbb P(V_1(\boldsymbol{\theta}) > 0) > 0$。若 $V_0(\boldsymbol{\theta}) < 0$，则 $\boldsymbol{\theta}$ 本身已是第二类套利机会。若 $V_0(\boldsymbol{\theta}) = 0$，由于 $\mathbb P(V_1(\boldsymbol{\theta}) > 0) > 0$，到期支付在某些状态严格为正而在所有状态非负。在无摩擦市场中卖空极小份额的基础资产或借入微量现金并立即买入 $\boldsymbol{\theta}$，或者直接在单期末以正概率为正的收益贴现到时刻 $0$（利用无风险借贷，令 $\hat{\boldsymbol{\theta}} = \boldsymbol{\theta} - \epsilon \boldsymbol{e}_0$ 取充分小的正数 $\epsilon > 0$ 使得到期即使扣除借贷本息后依然保持非负），可得到 $V_0(\hat{\boldsymbol{\theta}}) = -\epsilon S_0^0 < 0$ 且 $V_1(\hat{\boldsymbol{\theta}}) \ge 0$ 几乎必然成立，从而构造出第二类套利机会。综上，在具备基本无风险借贷的无摩擦市场中两类套利定义互相等价。

□

常见错误做法剖析：部分解答在证明两类套利等价时，忽视了无摩擦市场对无风险资产（或严格正价格资产）存在性与可无限分割买卖的依赖，仅仅简单声称两类不等式可以通过常数缩放直接转化，未注意到当 $V_0 = 0$ 时任何非零标量倍乘都无法改变初值为零的代数事实，必须借助正价值资产的微扰转移成本。

## 2. 

在有限离散状态空间 $(\Omega, \mathcal{F}, \mathbb P)$ 下，设样本点 $\Omega = \{\omega_1, \dots, \omega_K\}$ 且 $\mathbb P(\omega_k) > 0$。市场包含无风险资产 $S^0$（$S_0^0 = 1$，$S_1^0 = 1+r$，$r > -1$）以及 $d$ 种风险资产 $S^1, \dots, S^d$。记贴现支付矩阵为 $\boldsymbol{D} \in \mathbb R^{K \times (d+1)}$，其第 $k$ 行第 $i$ 列元素为 $\tilde{S}_1^i(\omega_k) = S_1^i(\omega_k)/(1+r)$。记贴现初始价格向量为 $\tilde{\boldsymbol{S}}_0 = \boldsymbol{S}_0 \in \mathbb R^{d+1}$。记收益增量矩阵为 $\boldsymbol{X} \in \mathbb R^{K \times (d+1)}$，其元素为 $X_k^i = \tilde{S}_1^i(\omega_k) - S_0^i$。对任意策略 $\boldsymbol{\theta} \in \mathbb R^{d+1}$，贴现财富增量为 $\boldsymbol{X} \boldsymbol{\theta} \in \mathbb R^K$。无套利条件等价于不存在 $\boldsymbol{\theta}$ 使得 $\boldsymbol{X}\boldsymbol{\theta} \ge \boldsymbol{0}$ 且 $\boldsymbol{X}\boldsymbol{\theta} \neq \boldsymbol{0}$（按分量不等式）。

**证明**

记 $\mathcal{K} = \{\boldsymbol{X}\boldsymbol{\theta} : \boldsymbol{\theta} \in \mathbb R^{d+1}\} \subset \mathbb R^K$ 为策略生成的贴现收益子空间。无套利条件等价于子空间 $\mathcal{K}$ 与非负凸锥 $\mathcal{C} = \{\boldsymbol{y} \in \mathbb R^K : \boldsymbol{y} \ge \boldsymbol{0}, \boldsymbol{y} \neq \boldsymbol{0}\}$ 不相交，即
$$\mathcal{K} \cap \mathcal{C} = \varnothing$$
设单纯形紧凸集 $\mathcal{S} = \{\boldsymbol{y} \in \mathbb R^K : \boldsymbol{y} \ge \boldsymbol{0}, \sum_{k=1}^K y_k = 1\}$，则 $\mathcal{C}$ 不相交于 $\mathcal{K}$ 等价于凸集 $\mathcal{S}$ 与闭凸集 $\mathcal{K}$ 互不相交，即 $\mathcal{K} \cap \mathcal{S} = \varnothing$。

根据凸分析中的严格超平面分离定理，存在非零向量 $\boldsymbol{q} = (q_1, \dots, q_K)^\top \in \mathbb R^K$ 以及常数 $\alpha \in \mathbb R$，使得对一切 $\boldsymbol{z} \in \mathcal{K}$ 和一切 $\boldsymbol{y} \in \mathcal{S}$，有
$$\boldsymbol{q}^\top \boldsymbol{z} < \alpha \le \boldsymbol{q}^\top \boldsymbol{y}$$
由于 $\mathcal{K}$ 是线性子空间，$\boldsymbol{0} \in \mathcal{K}$，若存在 $\boldsymbol{z} \in \mathcal{K}$ 使得 $\boldsymbol{q}^\top \boldsymbol{z} \neq 0$，则通过取标量 $\lambda \boldsymbol{z} \in \mathcal{K}$（$\lambda \to \pm \infty$）将导致内积无上界，与有上界矛盾。因此对一切 $\boldsymbol{z} \in \mathcal{K}$ 必有 $\boldsymbol{q}^\top \boldsymbol{z} = 0$，且分离阈值满足 $\alpha \le 0$。

又因为 $\boldsymbol{0} \in \mathcal{K}$，所以对一切 $\boldsymbol{y} \in \mathcal{S}$，有 $\boldsymbol{q}^\top \boldsymbol{y} \ge \alpha > \boldsymbol{q}^\top \boldsymbol{0} = 0$，即 $\boldsymbol{q}^\top \boldsymbol{y} > 0$。特别地，选取标准单位基向量 $\boldsymbol{e}_k \in \mathcal{S}$，可得
$$q_k = \boldsymbol{q}^\top \boldsymbol{e}_k > 0, \quad \forall k = 1, \dots, K$$
令 $Q(\omega_k) = q_k / \sum_{j=1}^K q_j$。由于每个 $q_k > 0$，故 $Q(\omega_k) > 0$，与原物理测度 $\mathbb P$ 等价（因为在有限样本空间上所有点概率均严格为正）。

由 $\boldsymbol{q}^\top \boldsymbol{z} = 0$ 对任意 $\boldsymbol{z} \in \mathcal{K}$ 成立，特别取 $\boldsymbol{z}$ 为第 $i$ 种资产的增量列向量，有
$$\sum_{k=1}^K Q(\omega_k) \left(\frac{S_1^i(\omega_k)}{1+r} - S_0^i\right) = 0$$
即
$$S_0^i = \mathbb E_{\mathbb Q}\left[\frac{S_1^i}{1+r}\right], \quad \forall i = 0, 1, \dots, d$$
这表明贴现资产价格在测度 $\mathbb Q$ 下构成鞅，即 $\mathbb Q$ 是等价鞅测度。反之，若存在等价鞅测度 $\mathbb Q$，假设存在套利组合 $\boldsymbol{\theta}$ 使得贴现净收益 $\Delta \tilde{V} \ge \boldsymbol{0}$ 且非零，则由 $\mathbb Q(\omega_k) > 0$ 必有 $\mathbb E_{\mathbb Q}[\Delta \tilde{V}] > 0$，与鞅性结论 $\mathbb E_{\mathbb Q}[\Delta \tilde{V}] = 0$ 产生矛盾。因此无套利等价于等价鞅测度的存在性。

□

常见错误做法剖析：常有推导直接套用普通分离定理得出非负分离向量 $\boldsymbol{q} \ge \boldsymbol{0}$，但未排除某些分量 $q_k = 0$ 的可能性。一旦某些分量为零，所得测度仅为鞅测度而非「等价」鞅测度（零概率状态破坏了测度等价性 $\mathbb Q \sim \mathbb P$）。必须通过分离基底单纯形 $\mathcal{S}$ 获得严格不等式 $\boldsymbol{q}^\top \boldsymbol{e}_k > 0$。

## 3. 

在无套利成立的前提下，由资产定价第一基本定理已知等价鞅测度集合 $\mathcal{M}^e \neq \varnothing$。考虑状态空间 $\mathbb R^K$ 上的任意或有索取权（或到期贴现支付向量）$\boldsymbol{H} \in \mathbb R^K$。金融市场完备性定义为：对任意 $\boldsymbol{H} \in \mathbb R^K$，均存在持仓策略 $\boldsymbol{\theta} \in \mathbb R^{d+1}$ 使得贴现到期支付满足 $\tilde{\boldsymbol{S}}_1 \boldsymbol{\theta} = \boldsymbol{H}$，其中 $\tilde{\boldsymbol{S}}_1 \in \mathbb R^{K \times (d+1)}$ 为贴现资产支付矩阵。

**证明**

先证充分性：若等价鞅测度 $\mathbb Q$ 唯一，证明市场是完备的。
等价鞅测度条件为：向量 $\boldsymbol{q} \in \mathbb R^K$ 满足
$$\tilde{\boldsymbol{S}}_1^\top \boldsymbol{q} = \boldsymbol{S}_0, \quad \boldsymbol{q} > \boldsymbol{0}, \quad \sum_{k=1}^K q_k = 1$$
已知无套利保证了存在至少一个满足条件的 $\boldsymbol{q}^*$。线性方程组 $\tilde{\boldsymbol{S}}_1^\top \boldsymbol{q} = \boldsymbol{S}_0$ 的所有解构成的仿射空间为 $\boldsymbol{q}^* + \operatorname{Ker}(\tilde{\boldsymbol{S}}_1^\top)$。由于 $\boldsymbol{q}^* > \boldsymbol{0}$ 处于正象限内部，如果核空间 $\operatorname{Ker}(\tilde{\boldsymbol{S}}_1^\top) \neq \{\boldsymbol{0}\}$，则存在非零向量 $\boldsymbol{v} \in \operatorname{Ker}(\tilde{\boldsymbol{S}}_1^\top)$。由于第 $0$ 种资产为无风险资产，其贴现支付列向量为全 $1$ 向量 $\boldsymbol{1}$，故由 $\tilde{\boldsymbol{S}}_1^\top \boldsymbol{v} = \boldsymbol{0}$ 推出 $\boldsymbol{1}^\top \boldsymbol{v} = \sum_{k=1}^K v_k = 0$。选取足够小的 $\epsilon > 0$，向量 $\boldsymbol{q}^* + \epsilon \boldsymbol{v}$ 依然严格正且分量和仍为 $1$，同时满足 $\tilde{\boldsymbol{S}}_1^\top (\boldsymbol{q}^* + \epsilon \boldsymbol{v}) = \boldsymbol{S}_0$，这给出了另一个互不相同的等价鞅测度，与 $\mathbb Q$ 的唯一性矛盾。因此必有 $\operatorname{Ker}(\tilde{\boldsymbol{S}}_1^\top) = \{\boldsymbol{0}\}$。
由线性代数基本定理，矩阵转置的核空间维数与列空间关系为 $\operatorname{dim}(\operatorname{Im}(\tilde{\boldsymbol{S}}_1)) = K - \operatorname{dim}(\operatorname{Ker}(\tilde{\boldsymbol{S}}_1^\top)) = K$。这意味着矩阵 $\tilde{\boldsymbol{S}}_1$ 的列向量张成整个欧几里得空间 $\mathbb R^K$。因此对任意或有索取权 $\boldsymbol{H} \in \mathbb R^K$，线性方程组 $\tilde{\boldsymbol{S}}_1 \boldsymbol{\theta} = \boldsymbol{H}$ 必然存在解 $\boldsymbol{\theta} \in \mathbb R^{d+1}$，即市场是完备的。

再证必要性：若市场是完备的，证明等价鞅测度 $\mathbb Q$ 唯一。
若市场完备，则 $\tilde{\boldsymbol{S}}_1$ 的列空间张成整个 $\mathbb R^K$。设存在两个等价鞅测度 $\mathbb Q_1$ 与 $\mathbb Q_2$，对应的概率向量分别为 $\boldsymbol{q}_1, \boldsymbol{q}_2$。由等价鞅测度定义，对一切可复制的贴现索取权 $\boldsymbol{H} = \tilde{\boldsymbol{S}}_1 \boldsymbol{\theta}$，均有
$$\boldsymbol{q}_1^\top \boldsymbol{H} = \boldsymbol{q}_1^\top \tilde{\boldsymbol{S}}_1 \boldsymbol{\theta} = \boldsymbol{S}_0^\top \boldsymbol{\theta} = \boldsymbol{q}_2^\top \tilde{\boldsymbol{S}}_1 \boldsymbol{\theta} = \boldsymbol{q}_2^\top \boldsymbol{H}$$
即对任意 $\boldsymbol{H} \in \mathbb R^K$，恒有 $(\boldsymbol{q}_1 - \boldsymbol{q}_2)^\top \boldsymbol{H} = 0$。令 $\boldsymbol{H} = \boldsymbol{e}_k$（$k = 1, \dots, K$），立即导出 $\boldsymbol{q}_1 = \boldsymbol{q}_2$。因此等价鞅测度必然唯一。

□

常见错误做法剖析：许多推导将完备性简单表述为资产个数 $d+1 = K$，忽略了可能存在冗余资产使得支付矩阵列向量线性相关的情形。完备性的数学本质是支付矩阵的秩 $\operatorname{rank}(\tilde{\boldsymbol{S}}_1) = K$，唯有通过商空间或正交补空间维数为零论证才能严密覆盖退化情形。

## 4. 

设单期金融市场包含两种基础资产：无风险储蓄资产 $S^0$（$S_0^0 = 1$，无风险利率 $r = 0$，故到期支付为 $\boldsymbol{S}_1^0 = (1, 1, 1)^\top$）与一种股票资产 $S^1$（初始价格 $S_0^1 = 100$）。市场存在三个可能的状态 $\Omega = \{\omega_1, \omega_2, \omega_3\}$，股票在三个状态下的到期价格分别为 $S_1^1(\omega_1) = 120$，$S_1^1(\omega_2) = 100$，$S_1^1(\omega_3) = 80$。初始价格向量为 $\boldsymbol{S}_0 = (1, 100)^\top$，到期支付矩阵为
$$\boldsymbol{D} = \begin{pmatrix} 1 & 120 \\ 1 & 100 \\ 1 & 80 \end{pmatrix}$$

考虑行权价为 $K = 100$ 的欧式看涨期权，其在三状态下的到期支付向量为 $\boldsymbol{H} = ((120 - 100)^+, (100 - 100)^+, (80 - 100)^+)^\top = (20, 0, 0)^\top$。
若该期权能由基础资产复制，则存在持仓 $\boldsymbol{\theta} = (\theta_0, \theta_1)^\top$ 满足 $\boldsymbol{D}\boldsymbol{\theta} = \boldsymbol{H}$，即
$$\theta_0 + 120 \theta_1 = 20, \quad \theta_0 + 100 \theta_1 = 0, \quad \theta_0 + 80 \theta_1 = 0$$
后两式相减立即得到 $20 \theta_1 = 0 \implies \theta_1 = 0$，进而 $\theta_0 = 0$；但代入第一式得到 $0 = 20$，矛盾。因此该欧式看涨期权无法由基础资产复制，市场是不完备的。

根据资产定价基本定理，未被复制资产的无套利价格集合由所有等价鞅测度 $\mathbb Q$ 下该资产贴现期望价值的开区间给出。设风险中性概率向量为 $\boldsymbol{q} = (q_1, q_2, q_3)^\top$。鞅测度条件为：
$$q_1 + q_2 + q_3 = 1$$
$$120 q_1 + 100 q_2 + 80 q_3 = 100$$
$$q_1 > 0, \quad q_2 > 0, \quad q_3 > 0$$
将第一个方程代入第二个方程整理得 $20 q_1 - 20 q_3 = 0$，故必有 $q_1 = q_3$。又由 $q_2 = 1 - 2q_1 > 0$，可得参数范围为 $q_1 \in (0, 0.5)$。
衍生品在等价鞅测度下的理论定价为：
$$C = \mathbb E_{\mathbb Q}[H] = 20 q_1 + 0 q_2 + 0 q_3 = 20 q_1$$
由于 $q_1 \in (0, 0.5)$，无套利价格的取值范围为开区间 $(0, 10)$。

在对偶线性规划形式下，期权的上界超复制问题可表述为：
$$C_{\max} = \inf_{\theta_0, \theta_1} (\theta_0 + 100 \theta_1) \quad \text{s.t.} \quad \theta_0 + 120 \theta_1 \ge 20, \; \theta_0 + 100 \theta_1 \ge 0, \; \theta_0 + 80 \theta_1 \ge 0$$
其对偶问题即为在闭鞅测度集合上求期望最大值：
$$\sup_{\boldsymbol{q} \ge \boldsymbol{0}} 20 q_1 \quad \text{s.t.} \quad q_1 + q_2 + q_3 = 1, \; 120 q_1 + 100 q_2 + 80 q_3 = 100$$
易得对偶最优解为 $q_1 = 0.5, q_2 = 0, q_3 = 0.5$，目标值上限为 $10$；同理下确界对偶最优解为 $q_1 = 0, q_2 = 1, q_3 = 0$，下限为 $0$。因此其无套利价格闭区间界限为 $[C_{\min}, C_{\max}] = [0, 10]$。在严格无套利要求下（等价鞅测度严格为正），期权开区间价格为 $(0, 10)$。

常见错误做法剖析：常有解答直接使用两状态二叉树公式代入计算，忽视了三状态下第三维方程与未知数不匹配导致定价非唯一；或者在建立对偶线性规划时未区分闭区间界限（弱对偶可行域边界）与严格等价鞅测度下的开区间有效定价范围。

## 5. 

设连续时间市场包含无风险账户 $B_t = e^{rt}$ 与 $d$ 维风险资产价格过程 $\boldsymbol{S}_t = (S_t^1, \dots, S_t^d)^\top$。投资策略由对偶过程 $(\theta_t^0, \boldsymbol{\theta}_t)$ 给出，其中 $\theta_t^0$ 为无风险资产持有量，$\boldsymbol{\theta}_t \in \mathbb R^d$ 为风险资产持仓向量。总财富过程定义为 $V_t = \theta_t^0 B_t + \boldsymbol{\theta}_t^\top \boldsymbol{S}_t$。策略满足自融资条件定义为总财富的微分满足
$$dV_t = \theta_t^0 dB_t + \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t = r \theta_t^0 B_t dt + \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t$$

**证明**

先证必要性：设策略满足自融资条件，推导贴现总财富过程的随机积分方程。
考虑贴现过程 $e^{-rt} = B_t^{-1}$。函数 $f(t) = e^{-rt}$ 为确定性有限变差函数，由 Itô 分部积分公式（或乘积法则），对两个半鞅的乘积 $e^{-rt} V_t$ 求微分：
$$d(e^{-rt} V_t) = e^{-rt} dV_t + V_t d(e^{-rt}) + d\langle e^{-rt}, V \rangle_t$$
因为 $e^{-rt}$ 关于时间 $t$ 连续可微，属于连续有限变差过程，其与任意半鞅的二次协变差恒为零，即 $d\langle e^{-rt}, V \rangle_t = 0$。同时有 $d(e^{-rt}) = -r e^{-rt} dt$。
将自融资条件 $dV_t = r \theta_t^0 B_t dt + \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t$ 以及总财富表达式 $V_t = \theta_t^0 B_t + \boldsymbol{\theta}_t^\top \boldsymbol{S}_t$ 代入展开式中：
$$d(e^{-rt} V_t) = e^{-rt}\left(r \theta_t^0 B_t dt + \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t\right) - r e^{-rt}\left(\theta_t^0 B_t + \boldsymbol{\theta}_t^\top \boldsymbol{S}_t\right) dt$$
化简同类项，无风险资产项互相抵消：
$$r e^{-rt} \theta_t^0 B_t dt - r e^{-rt} \theta_t^0 B_t dt = 0$$
从而得到
$$d(e^{-rt} V_t) = e^{-rt} \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t - r e^{-rt} \boldsymbol{\theta}_t^\top \boldsymbol{S}_t dt = \boldsymbol{\theta}_t^\top \left(e^{-rt} d\boldsymbol{S}_t - r e^{-rt} \boldsymbol{S}_t dt\right)$$
再次利用确定性函数 $e^{-rt}$ 与半鞅 $\boldsymbol{S}_t$ 的 Itô 分部积分公式，由于二次协变差项同样为零，有
$$d(e^{-rt}\boldsymbol{S}_t) = e^{-rt} d\boldsymbol{S}_t - r e^{-rt}\boldsymbol{S}_t dt$$
将其代入上式，立即得到
$$d(e^{-rt} V_t) = \boldsymbol{\theta}_t^\top d(e^{-rt}\boldsymbol{S}_t)$$
两端从 $0$ 到 $t$ 积分，即得
$$e^{-rt} V_t = V_0 + \int_0^t \boldsymbol{\theta}_u^\top d(e^{-ru}\boldsymbol{S}_u)$$
几乎必然成立。

再证充分性：若贴现财富过程满足上述积分方程，则对其求微分得到 $d(e^{-rt} V_t) = \boldsymbol{\theta}_t^\top d(e^{-rt}\boldsymbol{S}_t)$。
利用 $V_t = e^{rt}(e^{-rt} V_t)$，由乘积法则：
$$dV_t = d(e^{rt} \cdot e^{-rt} V_t) = e^{rt} d(e^{-rt} V_t) + (e^{-rt} V_t) d(e^{rt})$$
代入贴现财富微分：
$$dV_t = e^{rt} \boldsymbol{\theta}_t^\top d(e^{-rt}\boldsymbol{S}_t) + r e^{rt}(e^{-rt} V_t) dt = e^{rt} \boldsymbol{\theta}_t^\top \left(e^{-rt} d\boldsymbol{S}_t - r e^{-rt}\boldsymbol{S}_t dt\right) + r V_t dt$$
展开得
$$dV_t = \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t - r \boldsymbol{\theta}_t^\top \boldsymbol{S}_t dt + r(\theta_t^0 B_t + \boldsymbol{\theta}_t^\top \boldsymbol{S}_t) dt = \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t + r \theta_t^0 B_t dt = \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t + \theta_t^0 dB_t$$
这正是自融资条件的微分形式。因此充分性与必要性均获证。

□

常见错误做法剖析：常见错误是直接对 $V_t = \theta_t^0 B_t + \boldsymbol{\theta}_t^\top \boldsymbol{S}_t$ 应用普通微积分链式法则得到 $dV_t = \theta_t^0 dB_t + B_t d\theta_t^0 + \boldsymbol{\theta}_t^\top d\boldsymbol{S}_t + \boldsymbol{S}_t^\top d\boldsymbol{\theta}_t + \dots$，误以为自融资条件意味着 $B_t d\theta_t^0 + \boldsymbol{S}_t^\top d\boldsymbol{\theta}_t = 0$。在连续时间半鞅理论中，持仓过程 $\boldsymbol{\theta}_t$ 往往仅假定为可预测过程，通常不具备半鞅性质，因此直接对 $\boldsymbol{\theta}_t$ 写微分是缺乏数学严格性的；严谨的定义必须直接将自融资财富增量规定为对资产价格的随机积分。
## 6. 

设标的资产价格在物理测度 $\mathbb P$ 下遵循几何布朗运动：
$$dS_t = \mu S_t dt + \sigma S_t dW_t^{\mathbb P}$$
其中 $\mu \in \mathbb R$ 为瞬时漂移率，$\sigma > 0$ 为波动率，$W_t^{\mathbb P}$ 为标量标准布朗运动。市场无风险利率为常数 $r$。定义市场风险溢价（夏普比率）为 $\gamma = \frac{\mu - r}{\sigma}$。构造 Radon–Nikodym 导数过程（似然比过程）：
$$\eta_t = \exp\left(-\gamma W_t^{\mathbb P} - \frac{1}{2}\gamma^2 t\right), \quad t \in [0, T]$$

**证明**

首先验证 $\eta_t$ 满足 Novikov 条件。因为 $\gamma$ 为常数，积分 $\int_0^T \gamma^2 dt = \gamma^2 T$ 为确定性常数。直接计算其指数矩：
$$\mathbb E_{\mathbb P}\left[\exp\left(\frac{1}{2}\int_0^T \gamma^2 dt\right)\right] = \mathbb E_{\mathbb P}\left[\exp\left(\frac{1}{2}\gamma^2 T\right)\right] = \exp\left(\frac{1}{2}\gamma^2 T\right) < +\infty$$
由于该期望有限，Novikov 条件严格满足。因此由 Novikov 定理，随机指数过程 $\eta_t$ 在有限时间区间 $[0, T]$ 上是关于自然滤备的真实一致可积鞅，且 $\mathbb E_{\mathbb P}[\eta_T] = \eta_0 = 1$。于是可以通过 Radon–Nikodym 导数 $\frac{d\mathbb Q}{d\mathbb P} = \eta_T$ 在有限区间定义与 $\mathbb P$ 等价的概率测度 $\mathbb Q$。

其次应用 Girsanov 定理确定测度变换后的布朗运动。过程 $\eta_t$ 满足随机微分方程 $d\eta_t = -\gamma \eta_t dW_t^{\mathbb P}$。根据 Girsanov 测度变换定理，定义过程
$$W_t^{\mathbb Q} = W_t^{\mathbb P} + \int_0^t \gamma ds = W_t^{\mathbb P} + \gamma t$$
则 $W_t^{\mathbb Q}$ 在测度 $\mathbb Q$ 下几乎必然为标准布朗运动。将 $dW_t^{\mathbb P} = dW_t^{\mathbb Q} - \gamma dt$ 代入原标的资产的随机微分方程：
$$dS_t = \mu S_t dt + \sigma S_t \left(dW_t^{\mathbb Q} - \gamma dt\right) = (\mu - \sigma \gamma) S_t dt + \sigma S_t dW_t^{\mathbb Q}$$
代入 $\gamma = \frac{\mu - r}{\sigma}$，得到漂移项系数为 $\mu - \sigma \frac{\mu - r}{\sigma} = r$。因此在测度 $\mathbb Q$ 下资产价格满足
$$dS_t = r S_t dt + \sigma S_t dW_t^{\mathbb Q}$$

最后考察贴现价格过程 $\tilde{S}_t = e^{-rt} S_t$。由 Itô 分部积分公式：
$$d(e^{-rt} S_t) = -r e^{-rt} S_t dt + e^{-rt} dS_t + d\langle e^{-rt}, S \rangle_t$$
因为 $e^{-rt}$ 是有限变差确定性函数，其二次变差及互协变差项为零。将 $dS_t$ 代入：
$$d(e^{-rt} S_t) = -r e^{-rt} S_t dt + e^{-rt} \left(r S_t dt + \sigma S_t dW_t^{\mathbb Q}\right) = \sigma (e^{-rt} S_t) dW_t^{\mathbb Q}$$
由于漂移项为零且扩散系数连续，随机积分过程 $e^{-rt} S_t = S_0 + \int_0^t \sigma (e^{-ru} S_u) dW_u^{\mathbb Q}$ 几乎必然为局部鞅。进一步，由于其显式解为几何布朗运动 $e^{-rt}S_t = S_0 \exp\left(-\frac{1}{2}\sigma^2 t + \sigma W_t^{\mathbb Q}\right)$，其指数矩在任意有限区间有界，实际上是真实的鞅。

□

常见错误做法剖析：常有推导直接跳过 Novikov 条件的验证，默认形式上的 Doléans-Dade 随机指数自动是鞅。在一般局部波动率或非紧界漂移模型中，随机指数可能仅仅是局部鞅乃至严格上鞅，从而使测度变换失效；明确验证 Novikov 积分有限性是该证明不可省略的前提。

## 7. 

设欧式期权理论价值函数为 $V(S_t, t)$，已知其属于定义在 $(0, +\infty) \times [0, T]$ 上的 $C^{2,1}$ 类光滑函数。标的资产价格遵循几何布朗运动 $dS_t = \mu S_t dt + \sigma S_t dW_t$，无风险资产收益率恒为 $r$。

在时刻 $t$ 构建瞬时自融资对冲组合，包含一份多头期权以及 $\Delta_t$ 单位标的资产空头：
$$\Pi_t = V(S_t, t) - \Delta_t S_t$$
根据 Itô 公式，期权价格微分展开为：
$$dV = \frac{\partial V}{\partial t} dt + \frac{\partial V}{\partial S} dS_t + \frac{1}{2} \frac{\partial^2 V}{\partial S^2} d\langle S \rangle_t = \left(\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \frac{\partial V}{\partial S} dS_t$$
代入 $dS_t = \mu S_t dt + \sigma S_t dW_t$，得到
$$dV = \left(\frac{\partial V}{\partial t} + \mu S_t \frac{\partial V}{\partial S} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \sigma S_t \frac{\partial V}{\partial S} dW_t$$

在时间区间 $[t, t+dt]$ 内，组合在自融资持仓下的价值变动为：
$$d\Pi_t = dV - \Delta_t dS_t$$
将 $dV$ 与 $dS_t$ 的展开式代入，合并同类项：
$$d\Pi_t = \left(\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \left(\frac{\partial V}{\partial S} - \Delta_t\right) dS_t$$
展开 $dS_t$ 项分离确定性项与随机项：
$$d\Pi_t = \left(\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2} + \mu S_t \left(\frac{\partial V}{\partial S} - \Delta_t\right)\right) dt + \sigma S_t \left(\frac{\partial V}{\partial S} - \Delta_t\right) dW_t$$

为了消除整个对冲组合中的布朗运动不确定性（扩散项），选择对冲比率严格等于期权对标的资产的一阶偏导数：
$$\Delta_t = \frac{\partial V}{\partial S}(S_t, t)$$
此时 $dW_t$ 的系数恒为零，漂移项中带有 $\mu$ 的项也严格抵消。组合价值变动退化为完全无风险的确定性增量：
$$d\Pi_t = \left(\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt$$

由无摩擦金融市场的无套利原理，任何在时间区间 $[t, t+dt]$ 内完全不承担扩散风险的组合，其资本回报率必须精确等于无风险利率 $r$，否则将立即产生第一类或第二类套利机会。因此必有：
$$d\Pi_t = r \Pi_t dt$$
将组合定义 $\Pi_t = V - \Delta_t S_t = V - S_t \frac{\partial V}{\partial S}$ 代入上式：
$$d\Pi_t = r \left(V - S_t \frac{\partial V}{\partial S}\right) dt$$
将上述两式右侧的确定性微分系数联立相等：
$$\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} = r V - r S \frac{\partial V}{\partial S}$$
移项整理，即导出著名的 Black–Scholes 偏微分方程：
$$\frac{\partial V}{\partial t} + r S \frac{\partial V}{\partial S} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - r V = 0$$

常见错误做法剖析：许多推导错误地对组合微分使用全微分法则写成 $d\Pi_t = dV - \Delta_t dS_t - S_t d\Delta_t - d\langle \Delta, S \rangle_t$，误把持仓变动引入了组合价值变动的计算中。根据自融资定义，持仓调整发生在区间边缘，组合在微元区间的净收益完全来源于持有资产的价格增量，不包含持仓变动引起的资本注入或抽离。
## 8. 

设多元函数 $V(S, t)$ 在 $(0, +\infty) \times [0, T]$ 上属于 $C^{2,1}$ 类，并满足 Black–Scholes 偏微分方程：
$$\frac{\partial V}{\partial t} + r S \frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - r V = 0$$
且满足到期终值边界条件 $V(S, T) = h(S)$。考虑风险中性测度 $\mathbb Q$ 下的贴现期权价值过程 $Y_t = e^{-rt} V(S_t, t)$。已知在测度 $\mathbb Q$ 下，标的资产遵循 $dS_t = r S_t dt + \sigma S_t dW_t^{\mathbb Q}$。

**证明**

对二元复合随机过程 $Y_t = e^{-rt} V(S_t, t)$ 应用 Itô 公式。由于时间项 $e^{-rt}$ 具有连续一阶导数，展开微分得到：
$$dY_t = -r e^{-rt} V(S_t, t) dt + e^{-rt} dV(S_t, t)$$
其中 $V(S_t, t)$ 的 Itô 微分为：
$$dV(S_t, t) = \frac{\partial V}{\partial t} dt + \frac{\partial V}{\partial S} dS_t + \frac{1}{2} \frac{\partial^2 V}{\partial S^2} d\langle S \rangle_t$$
将标的资产在风险中性测度下的动力学方程 $dS_t = r S_t dt + \sigma S_t dW_t^{\mathbb Q}$ 以及二次变差 $d\langle S \rangle_t = \sigma^2 S_t^2 dt$ 代入：
$$dV(S_t, t) = \left(\frac{\partial V}{\partial t} + r S_t \frac{\partial V}{\partial S} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \sigma S_t \frac{\partial V}{\partial S} dW_t^{\mathbb Q}$$
将此式代入 $dY_t$ 的展开式中，合并 $dt$ 项与 $dW_t^{\mathbb Q}$ 项：
$$dY_t = e^{-rt} \left(\frac{\partial V}{\partial t} + r S_t \frac{\partial V}{\partial S} + \frac{1}{2} \sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2} - r V\right) dt + e^{-rt} \sigma S_t \frac{\partial V}{\partial S} dW_t^{\mathbb Q}$$
因为 $V(S, t)$ 精确满足 Black–Scholes 偏微分方程，括号内的确定性漂移项恒等于零。因此
$$dY_t = e^{-rt} \sigma S_t \frac{\partial V}{\partial S}(S_t, t) dW_t^{\mathbb Q}$$
漂移项完全消失。在通常的增长条件假设下（如被积项满足平方可积性），随机积分过程 $Y_t$ 在风险中性测度 $\mathbb Q$ 下几乎必然为局部鞅，且为真实鞅。

由鞅的定义，对任意 $0 \le t \le T$，条件期望满足：
$$Y_t = \mathbb E_{\mathbb Q}[Y_T \mid \mathcal{F}_t]$$
将 $Y_t = e^{-rt} V(S_t, t)$ 以及到期时刻 $Y_T = e^{-rT} V(S_T, T) = e^{-rT} h(S_T)$ 代入上式：
$$e^{-rt} V(S_t, t) = \mathbb E_{\mathbb Q}\left[e^{-rT} h(S_T) \,\Big|\, \mathcal{F}_t\right]$$
两端同乘 $e^{rt}$，并将确定性常数移入条件期望内部：
$$V(S_t, t) = \mathbb E_{\mathbb Q}\left[e^{-r(T-t)} h(S_T) \,\Big|\, \mathcal{F}_t\right]$$
此即 Feynman–Kac 公式在该扩散设定下的显式条件期望表示。

□

常见错误做法剖析：常见错误做法是在物理测度 $\mathbb P$ 下对 $e^{-rt} V$ 展开微分，得到带有 $(\mu - r) S \frac{\partial V}{\partial S}$ 的漂移项，未察觉该漂移项仅在风险中性测度 $\mathbb Q$ 下才精确抵消为零，从而错误地认为在物理测度下贴现期权价格也是鞅。

## 9. 

在风险中性测度 $\mathbb Q$ 下，标的资产价格遵循几何布朗运动。记剩余期限 $\tau = T - t$。时刻 $T$ 的资产价格为 $S_T = S_t \exp\left((r - \frac{1}{2}\sigma^2)\tau + \sigma \sqrt{\tau} Z\right)$，其中 $Z \sim \mathcal{N}(0, 1)$。令对数价格增量为 $y = \ln(S_T / S_t)$，则 $y \sim \mathcal{N}\left((r - \frac{1}{2}\sigma^2)\tau, \sigma^2 \tau\right)$。
欧式看涨期权支付为 $(S_T - K)^+ = (S_t e^y - K)^+$。行权条件 $S_T > K$ 等价于 $y > \ln(K / S_t)$。
根据风险中性定价原理，期权在时刻 $t$ 的价值由如下高斯积分给出：
$$C(S_t, t) = e^{-r\tau} \int_{\ln(K/S_t)}^{+\infty} (S_t e^y - K) \frac{1}{\sqrt{2\pi\sigma^2\tau}} \exp\left(-\frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right) dy$$
将积分拆分为资产项 $I_1$ 与现金项 $I_2$：$C(S_t, t) = I_1 - I_2$。

对于第一项 $I_1$：
$$I_1 = S_t e^{-r\tau} \int_{\ln(K/S_t)}^{+\infty} \frac{1}{\sqrt{2\pi\sigma^2\tau}} \exp\left(y - \frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right) dy$$
考察指数部分并配方：
$$y - \frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau} = -\frac{y^2 - 2(r - \frac{1}{2}\sigma^2)\tau y + (r - \frac{1}{2}\sigma^2)^2 \tau^2 - 2\sigma^2\tau y}{2\sigma^2\tau}$$
合并含 $y$ 的一次项：
$$-2(r - \frac{1}{2}\sigma^2)\tau y - 2\sigma^2\tau y = -2(r + \frac{1}{2}\sigma^2)\tau y$$
于是分子可重写为：
$$y^2 - 2(r + \frac{1}{2}\sigma^2)\tau y + (r + \frac{1}{2}\sigma^2)^2 \tau^2 - (r + \frac{1}{2}\sigma^2)^2 \tau^2 + (r - \frac{1}{2}\sigma^2)^2 \tau^2$$
后两项差值为：
$$(r - \frac{1}{2}\sigma^2)^2 \tau^2 - (r + \frac{1}{2}\sigma^2)^2 \tau^2 = -2 r \sigma^2 \tau^2$$
除以分母 $2\sigma^2\tau$ 得到 $-r\tau$。负号提至式外后该项变为 $+r\tau$。因此指数精确分解为：
$$\exp\left(y - \frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right) = e^{r\tau} \exp\left(-\frac{(y - (r + \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right)$$
代入 $I_1$ 中，外层贴现因子 $e^{-r\tau}$ 与配方释出的 $e^{r\tau}$ 精确抵消：
$$I_1 = S_t \int_{\ln(K/S_t)}^{+\infty} \frac{1}{\sqrt{2\pi\sigma^2\tau}} \exp\left(-\frac{(y - (r + \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right) dy$$
引入变量代换 $z = \frac{y - (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}$，则 $dy = \sigma\sqrt{\tau} dz$。当下限 $y = \ln(K/S_t)$ 时，
$$z = \frac{\ln(K/S_t) - (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}} = -\frac{\ln(S_t/K) + (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}} \triangleq -d_1$$
由标准正态分布的对称性：
$$I_1 = S_t \int_{-d_1}^{+\infty} \frac{1}{\sqrt{2\pi}} e^{-z^2/2} dz = S_t \int_{-\infty}^{d_1} \frac{1}{\sqrt{2\pi}} e^{-z^2/2} dz = S_t N(d_1)$$

对于第二项 $I_2$：
$$I_2 = K e^{-r\tau} \int_{\ln(K/S_t)}^{+\infty} \frac{1}{\sqrt{2\pi\sigma^2\tau}} \exp\left(-\frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right) dy$$
引入变量代换 $w = \frac{y - (r - \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}$，则 $dy = \sigma\sqrt{\tau} dw$。下限对应
$$w = \frac{\ln(K/S_t) - (r - \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}} = -\frac{\ln(S_t/K) + (r - \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}} \triangleq -d_2$$
其中 $d_2 = d_1 - \sigma\sqrt{\tau}$。同样利用对称性：
$$I_2 = K e^{-r\tau} \int_{-d_2}^{+\infty} \frac{1}{\sqrt{2\pi}} e^{-w^2/2} dw = K e^{-r\tau} N(d_2)$$
将两项相减，即完整推导出 Black–Scholes 欧式看涨期权定价公式：
$$C(S_t, t) = S_t N(d_1) - K e^{-r(T-t)} N(d_2)$$
其中 $N(d_1)$ 表示在以标的资产自身为计价单位的股票测度下期权被执行的概率，而 $N(d_2)$ 表示在以货币市场账户为计价单位的风险中性测度下期权被执行的概率。

常见错误做法剖析：常有错误在计算 $I_1$ 时直接把积分内的 $S_t e^y$ 提出来当作常数，或者在配方时忽略了指数二次展开交叉项的符号变化，导致得出的 $d_1$ 公式中波动率项符号错误（例如误写为 $-\frac{1}{2}\sigma^2$）。
## 10. 

在无红利标的资产假定下，欧式看涨与看跌期权的 Black–Scholes 公式分别为：
$$C(S, \tau) = S N(d_1) - K e^{-r\tau} N(d_2)$$
$$P(S, \tau) = K e^{-r\tau} N(-d_2) - S N(-d_1)$$
其中剩余期限 $\tau = T - t > 0$，参数 $d_1$ 与 $d_2$ 定义为：
$$d_1 = \frac{\ln(S/K) + (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}, \quad d_2 = d_1 - \sigma\sqrt{\tau}$$

**证明**

首先分析当行权价 $K \downarrow 0$ 时参数 $d_1, d_2$ 的极限行为。因为标的资产价格 $S > 0$ 且 $\sigma\sqrt{\tau} > 0$，当 $K \downarrow 0$ 时，商式 $S/K \to +\infty$，从而对数项 $\ln(S/K) \to +\infty$。由于分子由发散到正无穷的对数项主导，且分母为有限常数，故有
$$\lim_{K\downarrow 0} d_1 = +\infty, \quad \lim_{K\downarrow 0} d_2 = \lim_{K\downarrow 0} (d_1 - \sigma\sqrt{\tau}) = +\infty$$
对于标准正态累积分布函数 $N(x) = \int_{-\infty}^x \frac{1}{\sqrt{2\pi}} e^{-u^2/2} du$，当自变量趋于正无穷时其极限为 $1$；当自变量趋于负无穷时其极限为 $0$。因此
$$\lim_{K\downarrow 0} N(d_1) = 1, \quad \lim_{K\downarrow 0} N(d_2) = 1$$
$$\lim_{K\downarrow 0} N(-d_1) = 0, \quad \lim_{K\downarrow 0} N(-d_2) = 0$$

将上述极限代入看涨期权价值表达式：
$$\lim_{K\downarrow 0} C(S, \tau) = \lim_{K\downarrow 0} \left[S N(d_1) - K e^{-r\tau} N(d_2)\right] = S \cdot 1 - 0 \cdot e^{-r\tau} \cdot 1 = S$$
对于看跌期权，由于 $0 \le N(-d_2) \le 1$，项 $K e^{-r\tau} N(-d_2)$ 的取值介于 $0$ 与 $K e^{-r\tau}$ 之间。由夹逼定理可知当 $K \downarrow 0$ 时该项极限为 $0$。结合 $S N(-d_1) \to 0$，得到
$$\lim_{K\downarrow 0} P(S, \tau) = \lim_{K\downarrow 0} \left[K e^{-r\tau} N(-d_2) - S N(-d_1)\right] = 0 - 0 = 0$$

□

金融经济学直觉解释：现代金融市场中股票等基础资产均具备有限责任特征，即标的资产到期价格几乎必然满足 $S_T \ge 0$。
对于行权价为 $0$ 的看涨期权，其到期支付为 $(S_T - 0)^+ = S_T$，持有该期权等价于在到期日无偿且无条件获得一股标的股票。在标的不支付红利的前提下，持有无成本获得未来资产的权利在当前时点的价值必然等于该资产的现货价格 $S$。
对于行权价为 $0$ 的看跌期权，其到期支付为 $(0 - S_T)^+$。由于 $S_T \ge 0$ 几乎必然成立，该支付恒为零，即持有者在任何可能的状态下均不会选择以零价格卖出非负价值的资产。一份在所有未来状态下支付严格为零的金融合约，其理论现值必然严格为零。

常见错误做法剖析：常有分析仅凭直觉断言 $K \to 0$ 时看涨期权就是股票，忽略了对 $K e^{-r\tau} N(d_2)$ 项趋向于 $0$ 的严谨数学极限验证；或者在解释看跌期权时未提及有限责任假设，若资产价格可能为负（如负油价情形），行权价为零的看跌期权价值并不恒为零。

## 11. 

设标的资产持续支付连续股息率 $q \ge 0$，无风险利率为常数 $r$。考虑在当前时刻 $t$ 构建如下静态投资组合 $\Pi_t$：买入 1 份欧式看涨期权 $C_t$、卖出 1 份同标的、同行权价 $K$ 与到期日 $T$ 的欧式看跌期权 $P_t$、存入面值为 $K$ 的贴现无风险现金资产 $K e^{-r(T-t)}$，并借入（卖空）$e^{-q(T-t)}$ 份额的标的资产。时刻 $t$ 的组合初始价值为：
$$\Pi_t = C_t - P_t + K e^{-r(T-t)} - S_t e^{-q(T-t)}$$

**证明**

考察组合在到期时刻 $T$ 的总支付。
1. 看涨期权多头与看跌期权空头的综合支付为：
$$(S_T - K)^+ - (K - S_T)^+ = S_T - K$$
2. 存入的贴现现金 $K e^{-r(T-t)}$ 按照无风险利率连续复利累积，至时刻 $T$ 的确定性本息总值为：
$$K e^{-r(T-t)} \cdot e^{r(T-t)} = K$$
3. 对于卖空的标的资产，由于资产按连续股息率 $q$ 支付股息，若在时刻 $t$ 卖空 $e^{-q(T-t)}$ 份资产，为了持续支付借券期间产生的红利，借券方必须以自身资金连续补充买入相应比例资产。由连续复利动态，初始 $e^{-q(T-t)}$ 份额附带分红复利累积至时刻 $T$ 恰好增长为 $e^{-q(T-t)} e^{q(T-t)} = 1$ 单位标的资产。因此在到期时刻平仓空头头寸必须买入并归还 1 单位现货，其支付现金流为 $-S_T$。

将时刻 $T$ 的所有现金流求和：
$$\Pi_T = (S_T - K) + K - S_T = 0$$
该等式在样本空间的所有可能状态下几乎必然成立。因此该组合是一个到期支付严格恒为零的静态组合。在无摩擦、无套利市场中，到期支付恒为零的资产组合其初始成本必须严格为零：
$$\Pi_t = 0 \implies C_t - P_t + K e^{-r(T-t)} - S_t e^{-q(T-t)} = 0$$
移项即得到含连续股息率的广义看跌看涨平价公式：
$$C_t - P_t = S_t e^{-q(T-t)} - K e^{-r(T-t)}$$

□

求解无套利远期理论价格 $F(t, T)$：
远期合约是指约定在到期日 $T$ 以固定协议价格 $K$ 交付标的资产的合约，其在时刻 $T$ 的现金流为 $S_T - K$。根据前述分析，该到期支付与看涨看跌期权组合 $C_t - P_t$ 的到期支付严格相同。
远期价格 $F(t, T)$ 定义为使该远期合约在订立时刻 $t$ 公允价值为零的交割价。令到期交割价 $K = F(t, T)$ 且令合约现值 $C_t - P_t = 0$，代入广义看跌看涨平价关系式中：
$$0 = S_t e^{-q(T-t)} - F(t, T) e^{-r(T-t)}$$
解出 $F(t, T)$：
$$F(t, T) e^{-r(T-t)} = S_t e^{-q(T-t)} \implies F(t, T) = S_t e^{(r - q)(T-t)}$$

常见错误做法剖析：常见错误做法是忽略标的资产红利再投资在持有期间的指数增长效应，误把卖空现货在到期归还的现值简单写为 $S_t$，导致平价公式中缺少 $e^{-q(T-t)}$ 折减因子；或者在计算远期价格时未注意无套利远期价值为零的初始条件，误将即期价格直接按无风险利率单边放大。
## 12. 

在 Black–Scholes 模型下，无红利欧式看涨期权价格公式为：
$$C(S, \tau, K, r, \sigma) = S N(d_1) - K e^{-r\tau} N(d_2)$$
其中
$$d_1 = \frac{\ln(S/K) + (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}, \quad d_2 = d_1 - \sigma\sqrt{\tau}$$
标准正态概率密度函数为 $\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$。

**证明**

首先证明基础恒等式 $S \varphi(d_1) = K e^{-r\tau} \varphi(d_2)$。
考察两密度函数之比：
$$\frac{\varphi(d_1)}{\varphi(d_2)} = \exp\left(-\frac{1}{2}(d_1^2 - d_2^2)\right) = \exp\left(-\frac{1}{2}(d_1 - d_2)(d_1 + d_2)\right)$$
代入 $d_1 - d_2 = \sigma\sqrt{\tau}$：
$$d_1 + d_2 = 2 d_1 - \sigma\sqrt{\tau} = \frac{2\ln(S/K) + 2(r + \frac{1}{2}\sigma^2)\tau - \sigma^2\tau}{\sigma\sqrt{\tau}} = \frac{2\ln(S/K) + 2r\tau}{\sigma\sqrt{\tau}}$$
两项相乘得到：
$$(d_1 - d_2)(d_1 + d_2) = \sigma\sqrt{\tau} \cdot \frac{2\ln(S/K) + 2r\tau}{\sigma\sqrt{\tau}} = 2\ln(S/K) + 2r\tau$$
因此
$$\frac{\varphi(d_1)}{\varphi(d_2)} = \exp\left(-\frac{1}{2}(2\ln(S/K) + 2r\tau)\right) = \exp\left(-\ln(S/K) - r\tau\right) = \frac{K}{S} e^{-r\tau}$$
两端同乘 $S \varphi(d_2)$，即严格导出恒等式：
$$S \varphi(d_1) = K e^{-r\tau} \varphi(d_2)$$

其次对看涨期权价格关于波动率 $\sigma$ 求一阶偏导数。应用复合函数链式求导法则：
$$\mathcal{V}_{\mathrm{call}} = \frac{\partial C}{\partial \sigma} = S \varphi(d_1) \frac{\partial d_1}{\partial \sigma} - K e^{-r\tau} \varphi(d_2) \frac{\partial d_2}{\partial \sigma}$$
因为 $d_2 = d_1 - \sigma\sqrt{\tau}$，对其求导得到：
$$\frac{\partial d_2}{\partial \sigma} = \frac{\partial d_1}{\partial \sigma} - \sqrt{\tau}$$
利用基础恒等式 $K e^{-r\tau} \varphi(d_2) = S \varphi(d_1)$，将其代入求导表达式中：
$$\mathcal{V}_{\mathrm{call}} = S \varphi(d_1) \frac{\partial d_1}{\partial \sigma} - S \varphi(d_1) \left(\frac{\partial d_1}{\partial \sigma} - \sqrt{\tau}\right) = S \varphi(d_1) \sqrt{\tau}$$
因此欧式看涨期权的 Vega 显式闭式解为：
$$\mathcal{V} = S \sqrt{\tau} \varphi(d_1)$$

最后证明欧式看跌期权具有完全相同的 Vega。由看跌看涨平价公式：
$$C - P = S - K e^{-r\tau}$$
方程两边关于波动率 $\sigma$ 求偏导数。由于标的即期价格 $S$、贴现行权价 $K e^{-r\tau}$ 均与波动率 $\sigma$ 无关，其关于 $\sigma$ 的偏导数恒等于零：
$$\frac{\partial C}{\partial \sigma} - \frac{\partial P}{\partial \sigma} = 0 \implies \mathcal{V}_{\mathrm{put}} = \mathcal{V}_{\mathrm{call}} = S \sqrt{\tau} \varphi(d_1)$$
因此两者的波动率敏感度严格相等。

□

常见错误做法剖析：部分做法在展开导数时分别对 $d_1$ 和 $d_2$ 进行繁复求导并试图暴力通分，不仅计算冗长，且极易因符号遗漏而出错；另一常见错误是误以为看跌期权价值随波动率增加而减少，从而在看跌期权 Vega 前错误地添加负号。

## 13. 

设无红利标的欧式衍生品的理论价值函数为 $V(S, t) \in C^{2,1}$。其希腊字母定义为：日历时间敏感度（Theta）$\Theta = \frac{\partial V}{\partial t}$、标的一阶敏感度（Delta）$\Delta = \frac{\partial V}{\partial S}$、标的二阶曲率（Gamma）$\Gamma = \frac{\partial^2 V}{\partial S^2}$。

**证明**

根据第 7 题已建立的无红利资产 Black–Scholes 偏微分方程：
$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - r V = 0$$
将各希腊字母的定义式直接逐项替换偏导数项：
$$\frac{\partial V}{\partial t} = \Theta, \quad \frac{\partial^2 V}{\partial S^2} = \Gamma, \quad \frac{\partial V}{\partial S} = \Delta$$
代入偏微分方程即得：
$$\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + r S \Delta - r V = 0$$
将 $-rV$ 移至等号右侧，立即得到希腊字母之间的严格代数关系式：
$$\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + r S \Delta = r V$$

□

金融经济学机理分析：
当投资组合通过标的对冲处于 Delta 中性（$\Delta = 0$）且无风险贴现影响可忽略（$r \approx 0$ 或 $r V \approx 0$）时，上述代数恒等式简化为：
$$\Theta = -\frac{1}{2}\sigma^2 S^2 \Gamma$$
对于常规看涨或看跌期权多头，其支付函数呈现严格下凸（Convex）形态，导致其二阶敏感度恒为正（$\Gamma > 0$）。正 Gamma 意味着标的资产价格无论上涨还是下跌，投资组合的瞬时价值增量均受到凸性保护——价格大幅变动时多头组合将获得超额收益，其二阶 Taylor 展开收益增量为 $\frac{1}{2}\Gamma (\Delta S)^2 > 0$。

在无套利均衡下，市场不会提供无成本的免费凸性保险。为了获得这一有利的正向曲率收益，期权多头持有者必须承受确定性的时间价值衰减，即日历时间敏感度必须为负（$\Theta < 0$）。该负向时间衰减损失正是期权多头为了在标的剧烈波动中博取凸性利润而向市场连续支付的「时间租金」（Time Decay Rent）。若在到期前标的资产的实际已实现波动率低于定价中隐含的预期，凸性带来的收益积累将无法弥补时间租金的持续流失，最终导致多头组合产生净亏损。

常见错误做法剖析：常见错误做法是混淆了日历时间偏导数 $\frac{\partial V}{\partial t}$ 与剩余期限偏导数 $\frac{\partial V}{\partial \tau}$（$\tau = T - t$）。由于 $\frac{\partial}{\partial \tau} = -\frac{\partial}{\partial t}$，若将 Theta 定义为关于剩余期限的偏导数，代数关系式中 Theta 的符号将反转为负号，混用两种定义会导致推导出现符号混乱。
## 14. 

在几何布朗运动假定下，标的资产在风险中性测度下满足 $dS_t = r S_t dt + \sigma S_t dW_t$。考虑离散化对冲网格 $0 = t_0 < t_1 < \dots < t_N = T$，时间步长为常数 $\Delta t = t_{k+1} - t_k = T / N$。在每个区间 $[t_k, t_{k+1})$ 上，对冲者持有固定数量 $\Delta_k = \frac{\partial V}{\partial S}(S_k, t_k)$ 的标的资产，其余资金投资于无风险资产。

**证明**

考察区间 $[t_k, t_{k+1}]$ 内的单步跟踪误差。记 $S_k = S_{t_k}$，$V_k = V(S_k, t_k)$。由 Itô 公式，期权真实价值变动为：
$$V_{k+1} - V_k = \int_{t_k}^{t_{k+1}} \left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S_t^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \int_{t_k}^{t_{k+1}} \frac{\partial V}{\partial S}(S_t, t) dS_t$$
对冲组合在离散持仓 $\Delta_k$ 下的增量（扣除无风险借贷本息后）可写为：
$$\Delta \Pi_k = \Delta_k (S_{k+1} - S_k) + r (V_k - \Delta_k S_k) \Delta t + O((\Delta t)^2)$$
根据 Black–Scholes 偏微分方程 $\frac{\partial V}{\partial t} + r S \frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \Gamma - r V = 0$，将确定性漂移项替换，单步离散误差 $\epsilon_k = (V_{k+1} - V_k) - \Delta \Pi_k$ 的主导项来源于被积函数中 Delta 的动态漂移与常数持仓 $\Delta_k$ 的偏差：
$$\epsilon_k = \int_{t_k}^{t_{k+1}} \left(\frac{\partial V}{\partial S}(S_t, t) - \frac{\partial V}{\partial S}(S_k, t_k)\right) dS_t + O((\Delta t)^{3/2})$$
对 $\Delta(S_t, t) = \frac{\partial V}{\partial S}(S_t, t)$ 在 $(S_k, t_k)$ 处作一阶 Itô 展开：
$$\Delta(S_t, t) - \Delta(S_k, t_k) \approx \Gamma_k (S_t - S_k) + \dots \approx \Gamma_k \sigma S_k (W_t - W_{t_k})$$
代入随机积分得到单步跟踪误差主导项：
$$\epsilon_k \approx \Gamma_k \sigma^2 S_k^2 \int_{t_k}^{t_{k+1}} (W_t - W_{t_k}) dW_t$$
根据标准 Itô 积分性质，$\int_{t_k}^{t_{k+1}} (W_t - W_{t_k}) dW_t = \frac{1}{2} \left((W_{t_{k+1}} - W_{t_k})^2 - \Delta t\right)$。因此单步误差展开式为：
$$\epsilon_k = \frac{1}{2} \sigma^2 S_k^2 \Gamma_k \left((\Delta W_k)^2 - \Delta t\right) + O((\Delta t)^{3/2})$$

计算单步误差的条件方差。由于 $\Delta W_k \sim \mathcal{N}(0, \Delta t)$，随机变量 $\frac{\Delta W_k}{\sqrt{\Delta t}} \sim \mathcal{N}(0, 1)$。记标准正态变量为 $Z$，其平方的方差为 $\operatorname{Var}(Z^2) = \mathbb E[Z^4] - (\mathbb E[Z^2])^2 = 3 - 1 = 2$。因此
$$\operatorname{Var}\left((\Delta W_k)^2 - \Delta t \,\Big|\, \mathcal{F}_{t_k}\right) = (\Delta t)^2 \operatorname{Var}(Z^2) = 2 (\Delta t)^2$$
故单步对冲误差条件方差为：
$$\operatorname{Var}(\epsilon_k \mid \mathcal{F}_{t_k}) \approx \frac{1}{4} \sigma^4 S_k^4 \Gamma_k^2 \cdot 2 (\Delta t)^2 = \frac{1}{2} \sigma^4 S_k^4 \Gamma_k^2 (\Delta t)^2$$

在滤备下，各单步误差 $\epsilon_k$ 的条件期望为零，构成鞅差分序列。累积总对冲误差为 $E_N = \sum_{k=0}^{N-1} \epsilon_k$。由正交增量性，总误差方差等于各步方差之和：
$$\operatorname{Var}(E_N) \approx \sum_{k=0}^{N-1} \frac{1}{2} \sigma^4 \mathbb E\left[S_k^4 \Gamma_k^2\right] (\Delta t)^2 = \Delta t \cdot \sum_{k=0}^{N-1} \frac{1}{2} \sigma^4 \mathbb E\left[S_k^4 \Gamma_k^2\right] \Delta t$$
当 $\Delta t \to 0$ 时，黎曼和收敛为时间积分：
$$\lim_{\Delta t \to 0} \frac{\operatorname{Var}(E_N)}{\Delta t} = \frac{1}{2} \sigma^4 \int_0^T \mathbb E\left[S_t^4 \Gamma_t^2\right] dt < +\infty$$
由此严格证明，累积总对冲误差的方差具有渐近阶数 $O(\Delta t)$。相应地，总对冲误差的标准差收敛阶数为 $O(\sqrt{\Delta t})$。

□

常见错误做法剖析：许多分析混淆了总误差方差与总误差标准差的收敛速度，误将误差标准差的 $O(\sqrt{\Delta t})$ 当作方差阶数；或者在推导单步误差时不考虑二阶变差修正，漏掉 $-\Delta t$ 项，导致无法建立鞅差分结构。

## 15. 

给定标的参数 $S, K, \tau, r > 0$。欧式看涨期权价格函数为 $\sigma \mapsto C_{\mathrm{BS}}(\sigma)$，定义域为 $\sigma \in (0, +\infty)$。

**证明**

第一步：证明严格单调递增性。
对 $C_{\mathrm{BS}}(\sigma)$ 关于 $\sigma$ 求一阶导数，由第 12 题结论：
$$\frac{\partial C_{\mathrm{BS}}}{\partial \sigma} = \mathcal{V} = S \sqrt{\tau} \varphi(d_1)$$
其中 $\varphi(d_1) = \frac{1}{\sqrt{2\pi}} e^{-d_1^2/2}$。由于标的价格 $S > 0$，期限 $\tau > 0$，且高斯概率密度函数在全实轴上严格为正（$\varphi(x) > 0$ 对任意 $x \in \mathbb R$ 成立），因此对任意 $\sigma > 0$ 恒有
$$\frac{\partial C_{\mathrm{BS}}}{\partial \sigma} > 0$$
导数处处严格为正保证了函数 $\sigma \mapsto C_{\mathrm{BS}}(\sigma)$ 在 $(0, +\infty)$ 上严格单调递增。

第二步：考察二阶导数 Vomma 与局部凸性结构。
对 Vega 进一步求导得到二阶导数：
$$\frac{\partial^2 C_{\mathrm{BS}}}{\partial \sigma^2} = \frac{\partial \mathcal{V}}{\partial \sigma} = \mathcal{V} \frac{d_1 d_2}{\sigma}$$
其中 $d_1 d_2 = \frac{(\ln(S/K) + r\tau)^2 - \frac{1}{4}\sigma^4 \tau^2}{\sigma^2 \tau}$。在小波动率区间或期权处于非极端虚值状态下，分子主导项为正，函数呈现局部严格凸性。

第三步：计算边界极限与介值定理应用。
考察当 $\sigma \downarrow 0$ 时的极限。若 $S > K e^{-r\tau}$，则 $\ln(S/K) + r\tau > 0$，故当 $\sigma \to 0$ 时 $d_1, d_2 \to +\infty$，从而 $N(d_1), N(d_2) \to 1$，$C_{\mathrm{BS}}(\sigma) \to S - K e^{-r\tau}$。若 $S < K e^{-r\tau}$，则 $d_1, d_2 \to -\infty$，从而 $N(d_1), N(d_2) \to 0$，$C_{\mathrm{BS}}(\sigma) \to 0$。若 $S = K e^{-r\tau}$，直接计算极限同样趋于 $0$。因此统一下限为：
$$\lim_{\sigma \downarrow 0} C_{\mathrm{BS}}(\sigma) = (S - K e^{-r\tau})^+$$
考察当 $\sigma \to +\infty$ 时的极限。此时 $d_1 \to +\infty \implies N(d_1) \to 1$，而 $d_2 = d_1 - \sigma\sqrt{\tau} \approx -\frac{1}{2}\sigma\sqrt{\tau} \to -\infty \implies N(d_2) \to 0$。因此
$$\lim_{\sigma \to +\infty} C_{\mathrm{BS}}(\sigma) = S \cdot 1 - K e^{-r\tau} \cdot 0 = S$$

由于 $C_{\mathrm{BS}}(\sigma)$ 在 $(0, +\infty)$ 上连续且严格单调递增，其值域为开区间 $((S - K e^{-r\tau})^+, S)$。
由连续函数的介值定理（Intermediate Value Theorem）与严格单调函数的单射性，当且仅当市场成交价满足无套利理论边界 $(S - K e^{-r\tau})^+ < C^{\mathrm{mkt}} < S$ 时，存在且仅存在唯一的正实数 $\sigma_{\mathrm{imp}} \in (0, +\infty)$ 满足方程 $C_{\mathrm{BS}}(\sigma_{\mathrm{imp}}) = C^{\mathrm{mkt}}$。

□

常见错误做法剖析：常有证明断言 $C_{\mathrm{BS}}(\sigma)$ 在整个正半轴 $(0, +\infty)$ 上全局严格凸，忽视了当波动率极大（$\sigma^2\tau > 2|\ln(S/K) + r\tau|$）时 $d_1 d_2 < 0$，二阶导数变负出现拐点；事实上，反解隐含波动率的全局唯一存在性完全由一阶导数严格为正（严格单调递增性）与边界极限所保障，无需全局严格凸性。
## 16. 

由欧式看涨期权市场观测价格 $C^{\mathrm{mkt}}$ 反解隐含波动率 $\sigma_{\mathrm{imp}}$ 属于求解单变量非线性方程求根问题。构造目标函数：
$$f(\sigma) = C_{\mathrm{BS}}(\sigma) - C^{\mathrm{mkt}} = 0$$
其中 $C_{\mathrm{BS}}(\sigma) = S N(d_1(\sigma)) - K e^{-r\tau} N(d_2(\sigma))$。
目标函数的一阶导数即为期权的 Vega：
$$f'(\sigma) = \frac{\partial C_{\mathrm{BS}}}{\partial \sigma} = \mathcal{V}(\sigma) = S \sqrt{\tau} \varphi(d_1(\sigma))$$
Newton–Raphson 迭代格式写为：
$$\sigma_{n+1} = \sigma_n - \frac{f(\sigma_n)}{f'(\sigma_n)} = \sigma_n - \frac{C_{\mathrm{BS}}(\sigma_n) - C^{\mathrm{mkt}}}{S \sqrt{\tau} \varphi(d_1(\sigma_n))}$$

**证明**

首先证明平值期权附近的局部二次收敛性。
设真实解为 $\sigma^*$ 满足 $f(\sigma^*) = 0$。根据 Taylor 展开定理：
$$0 = f(\sigma^*) = f(\sigma_n) + f'(\sigma_n)(\sigma^* - \sigma_n) + \frac{1}{2} f''(\xi_n)(\sigma^* - \sigma_n)^2$$
其中 $\xi_n$ 介于 $\sigma_n$ 与 $\sigma^*$ 之间。将 Newton–Raphson 格式代入误差关系 $e_n = \sigma_n - \sigma^*$：
$$e_{n+1} = \sigma_{n+1} - \sigma^* = \sigma_n - \sigma^* - \frac{f(\sigma_n)}{f'(\sigma_n)} = e_n - \frac{f(\sigma_n)}{f'(\sigma_n)} = \frac{f'(\sigma_n) e_n - f(\sigma_n)}{f'(\sigma_n)}$$
代入 Taylor 展开式中的 $f(\sigma_n) - f'(\sigma_n) e_n = -\frac{1}{2} f''(\xi_n) e_n^2$，得到误差传递公式：
$$e_{n+1} = \frac{f''(\xi_n)}{2 f'(\sigma_n)} e_n^2$$
在平值（At-the-Money, ATM，满足 $S \approx K e^{-r\tau}$）附近，参数 $d_1(\sigma) \approx \frac{1}{2}\sigma\sqrt{\tau} \approx 0$。此时高斯密度取得极大值 $\varphi(d_1) \approx \frac{1}{\sqrt{2\pi}}$，使得一阶导数分母 $\mathcal{V}(\sigma_n) \ge c > 0$ 严格远离零。同时，二阶导数 $f''(\sigma) = \text{Vomma} = \mathcal{V} \frac{d_1 d_2}{\sigma} \approx 0$。因此误差系数 $\frac{f''(\xi_n)}{2 f'(\sigma_n)}$ 保持有界且很小，满足标准 Newton 法局部二次收敛定理的假设，迭代序列在真解邻域内以二次速度 $\lim_{n\to\infty} \frac{|e_{n+1}|}{|e_n|^2} = \frac{|f''(\sigma^*)|}{2 |f'(\sigma^*)|}$ 极速收敛。

□

数值发散根源分析：
当期权处于极度虚值（Deep Out-of-the-Money, OTM）状态时，行权价远离现货价格，导致 $|d_1| \gg 1$。
高斯核函数具有二次指数衰减特征：$\varphi(d_1) = \frac{1}{\sqrt{2\pi}} e^{-d_1^2 / 2}$。当 $|d_1|$ 显著增大时，导数分母 Vega 发生指数级崩溃（在双精度浮点数下迅速下溢至 $10^{-15}$ 以下乃至等于零）。
在迭代格式中，步长增量 $\Delta \sigma_n = -\frac{C_{\mathrm{BS}}(\sigma_n) - C^{\mathrm{mkt}}}{\mathcal{V}(\sigma_n)}$ 出现“除以极小量”的严重病态现象。微小的价格偏差被近乎为零的导数分母急剧放大，使得更新步长产生极大的过冲（Overshooting）。过大的步长通常会将下一轮迭代点 $\sigma_{n+1}$ 抛掷到无实际意义的负实数区，或者极大的正数区，进而引发数值振荡、跨越有效定义域并彻底发散。

常见错误做法剖析：工程实践中常见错误是未对导数下确界设置截断阈值，对全行权价盲目执行无保护的标准 Newton 迭代。标准工业实践应当在极度虚值区域切换为二分法、Brent 混合算法，或采用以绝对价格为自变量的解析渐近展开（如 Corrado–Miller 或 Li–Lee 显式近似）提供高质量初值。

## 17. 

在 Black–Scholes 基准模型中，风险中性对数收益率服从严格对称的高斯正态分布，其理论偏度恒为零（$\text{Skew} = 0$），超额峰度亦恒为零（$\text{Kurt} - 3 = 0$），对应的隐含波动率曲面为水平直线。而在股票指数期权市场中，标的资产的经验对数收益普遍呈现显著的负偏度（左侧肥尾，下行剧烈暴跌）与超额峰度（尖峰厚尾特征）。

**证明**

利用无模型风险中性矩的 Edgeworth 展开或 Jarrow–Rudd 概率密度展开定理，真实风险中性密度 $q(x)$ 相对于标准高斯基准密度 $\varphi(x)$ 的偏差可由偏度 $\lambda_3$ 与峰度超额项 $\lambda_4$ 显式表示。记远期平值对数单价为 $x = \frac{\ln(S_T / F)}{\bar{\sigma}\sqrt{\tau}}$。此时隐含波动率相对于平值基准波动率 $\bar{\sigma}$ 的一阶与二阶展开式为：
$$\sigma_{\mathrm{imp}}(K) \approx \bar{\sigma} \left[1 + \frac{\lambda_3}{6} \frac{\ln(K / F)}{\bar{\sigma}\sqrt{\tau}} + \frac{\lambda_4 - 3}{24} \left(\frac{\ln(K / F)}{\bar{\sigma}\sqrt{\tau}}\right)^2\right]$$
对对数行权价 $k = \ln(K/F)$ 求一阶导数，得到隐含波动率斜率在平值附近的渐近关系：
$$\left.\frac{\partial \sigma_{\mathrm{imp}}}{\partial \ln K}\right|_{K=F} \approx \frac{\lambda_3}{6\sqrt{\tau}}$$

因为股票指数资产由于金融杜邦负债杠杆效应（Leverage Effect）以及市场非对称崩盘恐慌，对数收益呈现显著的负偏度，即 $\lambda_3 < 0$。由此立即推导出：
$$\left.\frac{\partial \sigma_{\mathrm{imp}}}{\partial \ln K}\right|_{K=F} < 0$$
即隐含波动率关于行权价 $K$ 呈现单调向下倾斜的偏斜（Skew）形态。

□

定性与金融经济学机理分析：
1. 负偏度的经济实质：在宏观与股票指数层面，下行下跌往往伴随着剧烈波动与流动性挤兑，而上行上涨则通常平缓持久。这种非对称性使得真实风险中性分布的左侧尾部（深度虚值看跌期权执行区，低行权价 $K \ll F$）比高斯对数正态分布具有大幅增加的概率测度质量；而右侧尾部（深度虚值看涨期权执行区，高行权价 $K \gg F$）的概率质量则相对受抑。
2. 尖峰厚尾的复合效应：超额峰度（$\lambda_4 > 3$）促使两侧尾部均比正态分布更为沉重。然而，强烈的负偏度与正超额峰度叠加后，左侧尾部的增厚效应被数倍放大，形成极厚的左尾，而右侧尾部的增厚效应部分被负偏度抵消。
3. 隐含波动率映射机制：低行权价期权主要依赖极低价格区域的发生概率定价。由于市场对极端崩盘风险定价了较高的灾难风险溢价（Crash Risk Premium），真实市场期权价格远高于基于对称正态分布的 Black–Scholes 理论价格。当使用单调递增的 Black–Scholes 公式反解时，为了吸收高额的左尾风险溢价，反解出的隐含波动率 $\sigma_{\mathrm{imp}}(K)$ 在低行权价处必须显著抬升；反之，高行权价区域概率未见显著增厚，反解出的隐含波动率处于相对低位。这直接塑造了股指期权市场单调向下的波动率“偏斜”（Volatility Skew）结构。

常见错误做法剖析：常见错误做法是试图完全使用客观物理测度 $\mathbb P$ 下的历史收益统计量直接解释隐含波动率曲面，未区分风险中性测度 $\mathbb Q$ 包含了投资者的风险厌恶与下行崩盘的风险定价补偿，导致低估了市场偏斜的陡峭程度。
## 18. 

设在全行权价与全到期期限上，欧式看涨期权价格曲面 $C(K, T)$ 充分光滑。在局部波动率模型下，标的资产在风险中性测度下满足随机微分方程：
$$dS_t = r S_t dt + \sigma_{\mathrm{loc}}(S_t, t) S_t dW_t^{\mathbb Q}$$
记时刻 $T$ 标的资产处于价格 $S$ 的风险中性转移概率密度函数为 $p(S, T)$。

**证明**

首先回顾 Breeden–Litzenberger 边际密度关系。欧式看涨期权的市场无套利期望表达式为：
$$C(K, T) = e^{-rT} \int_K^{+\infty} (S - K) p(S, T) dS$$
对行权价 $K$ 求一阶偏导数（利用 Leibniz 积分求导法则）：
$$\frac{\partial C}{\partial K} = e^{-rT} \left[ -(K - K) p(K, T) + \int_K^{+\infty} (-1) p(S, T) dS \right] = -e^{-rT} \int_K^{+\infty} p(S, T) dS$$
继续对行权价 $K$ 求二阶偏导数：
$$\frac{\partial^2 C}{\partial K^2} = -e^{-rT} \left( -p(K, T) \right) = e^{-rT} p(K, T)$$
此即 Breeden–Litzenberger 公式，表明期权对行权价的二阶导数精确反映了贴现后的风险中性概率密度。

其次应用前向 Fokker–Planck 方程（Kolmogorov 前向方程）。标的资产概率密度 $p(S, T)$ 关于到期时间 $T$ 的演化由前向方程支配：
$$\frac{\partial p}{\partial T}(S, T) = -\frac{\partial}{\partial S}\left[r S p(S, T)\right] + \frac{1}{2} \frac{\partial^2}{\partial S^2}\left[\sigma_{\mathrm{loc}}^2(S, T) S^2 p(S, T)\right]$$

对期权价格积分表达式关于到期时间 $T$ 求偏导数：
$$\frac{\partial C}{\partial T} = -r e^{-rT} \int_K^{+\infty} (S - K) p(S, T) dS + e^{-rT} \int_K^{+\infty} (S - K) \frac{\partial p}{\partial T}(S, T) dS$$
第一项即为 $-r C$。将前向 Fokker–Planck 方程代入第二项积分内部：
$$\int_K^{+\infty} (S - K) \frac{\partial p}{\partial T} dS = \int_K^{+\infty} (S - K) \left( -\frac{\partial}{\partial S}[r S p] \right) dS + \frac{1}{2} \int_K^{+\infty} (S - K) \frac{\partial^2}{\partial S^2}\left[\sigma_{\mathrm{loc}}^2 S^2 p\right] dS$$

对上述两个子积分分别实施分部积分法。
对漂移项积分：
$$\int_K^{+\infty} (S - K) \left( -\frac{\partial}{\partial S}[r S p] \right) dS = \left[ -(S - K) r S p \right]_K^{+\infty} + \int_K^{+\infty} r S p(S, T) dS$$
在无穷远边界概率密度衰减充分快，边界值在 $S \to +\infty$ 与 $S = K$ 处均为零。分解被积项 $S = (S - K) + K$：
$$\int_K^{+\infty} r S p \, dS = r \int_K^{+\infty} (S - K) p \, dS + r K \int_K^{+\infty} p \, dS = r e^{rT} C - r K e^{rT} \frac{\partial C}{\partial K}$$

对扩散项积分连续实施两次分部积分：
$$\int_K^{+\infty} (S - K) \frac{\partial^2}{\partial S^2}\left[\sigma_{\mathrm{loc}}^2 S^2 p\right] dS = \left[ (S - K) \frac{\partial}{\partial S}[\sigma_{\mathrm{loc}}^2 S^2 p] \right]_K^{+\infty} - \int_K^{+\infty} \frac{\partial}{\partial S}\left[\sigma_{\mathrm{loc}}^2 S^2 p\right] dS$$
第一项边界项为零。第二项直接积分出原函数：
$$-\left[ \sigma_{\mathrm{loc}}^2(S, T) S^2 p(S, T) \right]_K^{+\infty} = \sigma_{\mathrm{loc}}^2(K, T) K^2 p(K, T)$$

将两部分分部积分结果合并代入 $\frac{\partial C}{\partial T}$ 展开式中：
$$\frac{\partial C}{\partial T} = -r C + e^{-rT} \left( r e^{rT} C - r K e^{rT} \frac{\partial C}{\partial K} + \frac{1}{2} \sigma_{\mathrm{loc}}^2(K, T) K^2 p(K, T) \right)$$
展开括号并化简：
$$\frac{\partial C}{\partial T} = -r C + r C - r K \frac{\partial C}{\partial K} + \frac{1}{2} \sigma_{\mathrm{loc}}^2(K, T) K^2 e^{-rT} p(K, T)$$
两项贴现项 $-rC + rC$ 互相抵消。再代入 Breeden–Litzenberger 关系 $e^{-rT} p(K, T) = \frac{\partial^2 C}{\partial K^2}$，得到：
$$\frac{\partial C}{\partial T} = -r K \frac{\partial C}{\partial K} + \frac{1}{2} \sigma_{\mathrm{loc}}^2(K, T) K^2 \frac{\partial^2 C}{\partial K^2}$$
移项并两边除以非零项 $\frac{1}{2} K^2 \frac{\partial^2 C}{\partial K^2}$，即完整推导出 Dupire 局部方差解析公式：
$$\sigma_{\mathrm{loc}}^2(K, T) = \frac{\frac{\partial C}{\partial T} + r K \frac{\partial C}{\partial K}}{\frac{1}{2} K^2 \frac{\partial^2 C}{\partial K^2}}$$

□

常见错误做法剖析：常见错误是混淆了后向 Kolmogorov 方程（关于即期标的价格 $S_t$ 和观测时刻 $t$ 的 Black–Scholes 微分方程）与前向 Fokker–Planck 方程（关于行权价 $K$ 和到期日 $T$ 的状态概率演化方程），误把后向算子直接套用在 $(K, T)$ 上，导致积分边界项无法正确消去。

## 19. 

在 Heston 随机波动率模型下，标的资产价格 $S_t$ 与瞬时方差 $v_t$ 在风险中性测度 $\mathbb Q$ 下遵循如下耦合随机微分方程：
$$dS_t = r S_t dt + \sqrt{v_t} S_t dW_t^S$$
$$dv_t = \kappa (\theta - v_t) dt + \xi \sqrt{v_t} dW_t^v$$
$$d\langle W^S, W^v \rangle_t = \rho dt$$
其中 $\kappa > 0$ 为均值回复速率，$\theta > 0$ 为长期方差均值，$\xi > 0$ 为方差的波动率（Vol-of-Vol），$\rho \in [-1, 1]$ 为驱动布朗运动的瞬时相关系数。

对数价格特征函数与 Riccati 方程系统求解步骤：
记对数价格为 $x_t = \ln S_t$，剩余期限为 $\tau = T - t$。欲求解对数价格的未贴现条件特征函数 $\phi(u; x_t, v_t, \tau) = \mathbb E_{\mathbb Q}[e^{iu x_T} \mid \mathcal{F}_t]$。
1. 建立偏微分方程：根据 Feynman–Kac 定理，条件期望过程为鞅，故 $\phi$ 满足无贴现项的二维扩散 PDE：
$$-\frac{\partial \phi}{\partial \tau} + \left(r - \frac{1}{2}v\right) \frac{\partial \phi}{\partial x} + \kappa(\theta - v) \frac{\partial \phi}{\partial v} + \frac{1}{2} v \frac{\partial^2 \phi}{\partial x^2} + \frac{1}{2}\xi^2 v \frac{\partial^2 \phi}{\partial v^2} + \rho \xi v \frac{\partial^2 \phi}{\partial x \partial v} = 0$$
初始条件为 $\phi(u; x, v, 0) = e^{iu x}$。
2. 仿射变换假设（Affine Ansatz）：鉴于模型漂移项与扩散平方项均是状态变量 $(x, v)$ 的仿射线性函数，设定分离变量解的形式为：
$$\phi(u; x, v, \tau) = \exp\left(C(\tau, u) + D(\tau, u) v + iu x\right)$$
满足边界条件 $C(0, u) = 0$，$D(0, u) = 0$。
3. 导出 Riccati 常微分方程系统：将假设解的形式求导并代入 PDE，按状态变量 $v$ 的阶数分离项（常数项与 $v$ 的一次项分别独立为零）：
$$\frac{d D}{d\tau} = \frac{1}{2}\xi^2 D^2 + (\rho \xi iu - \kappa) D - \frac{1}{2}(u^2 + iu)$$
$$\frac{d C}{d\tau} = \kappa \theta D + iu r$$
4. 闭式积分求解：第一式为关于 $D(\tau, u)$ 的标准标量 Riccati 常微分方程，由于其右端是 $D$ 的二次多项式，可通过因式分解或特征根法直接分离变量积分，求出初等解析解；随后将 $D(\tau, u)$ 代入第二式直接积分即得到 $C(\tau, u)$。

负向杠杆效应的经济机制分析：
在公司金融与实证经济学中，负相关系数 $\rho < 0$ 对应于经典的“负向杠杆效应”（Negative Leverage Effect，由 Black 及 Christie 等人提出）。
当企业遭遇负面外部冲击导致股价暴跌时（$dS < 0$），企业的股票市值大幅缩水，而企业既有的固定债务账面价值相对刚性。这导致企业的财务杜邦负债权益比（Debt-to-Equity Ratio）显著被动抬升。更高的财务杠杆放大了公司未来现金流的不确定性与破产违约风险，使得企业股票变得更加剧烈震荡，从而推升了瞬时波动率（$dv > 0$）。
相反，当股价持续上涨时，杠杆率降低，股权波动率趋于平稳。因此在宏观指数上，价格负收益与波动率正增量强负相关（$\rho < 0$）。这种负相关性直接决定了风险中性密度分布的负偏度特征，构成了期权市场单调向下倾斜波动率偏斜（Skew）的底层微观经济学基础。

常见错误做法剖析：在解析求解 Riccati 方程时，复变函数开平方会出现主值支切线（Branch Cut）不连续问题，即著名的“小赫斯顿陷阱”（Little Heston Trap）。直接选用传统教科书中带有负号判别式的表达式会在长到期期限时跨越复平面虚轴切口，诱发特征函数相位突变与数值震荡；工业级实现必须采用修正后的无间断复数分支公式。
## 20. 

设无红利标的资产上美式看跌期权的公允价值为 $P^{\mathrm{Amer}}(S, t)$，行权价为 $K$，到期日为 $T$。其内在价值为 $(K - S)^+$。定义 Black–Scholes 偏微分算子为：
$$\mathcal{L}_{\mathrm{BS}} P = -\frac{\partial P}{\partial t} - r S \frac{\partial P}{\partial S} - \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 P}{\partial S^2} + r P$$

线性互补问题（Linear Complementarity Problem, LCP）：
在整个求解区域 $(S, t) \in (0, +\infty) \times [0, T]$ 内，美式期权价值与微分算子满足如下变分不等式系统：
$$P^{\mathrm{Amer}}(S, t) \ge (K - S)^+$$
$$\mathcal{L}_{\mathrm{BS}} P^{\mathrm{Amer}}(S, t) \ge 0$$
$$\left(P^{\mathrm{Amer}}(S, t) - (K - S)^+\right) \cdot \mathcal{L}_{\mathrm{BS}} P^{\mathrm{Amer}}(S, t) = 0$$
终值条件为 $P^{\mathrm{Amer}}(S, T) = (K - S)^+$。
该系统将状态平面划分为两个互斥区域：
1. 延续持有区（Continuation Region）：$S > S^*(t)$，此时 $P^{\mathrm{Amer}}(S, t) > (K - S)^+$，算子精确取等号 $\mathcal{L}_{\mathrm{BS}} P^{\mathrm{Amer}} = 0$；
2. 提前行权区（Stopping Region）：$0 < S \le S^*(t)$，此时期权被立即执行，价值等于内在价值 $P^{\mathrm{Amer}}(S, t) = K - S$，算子满足 $\mathcal{L}_{\mathrm{BS}} P^{\mathrm{Amer}} \ge 0$。

自由边界与光滑粘贴条件：
自由边界 $S^*(t)$（最优提前行权边界）满足价值匹配条件（Value Matching Condition）：
$$\lim_{S \downarrow S^*(t)} P^{\mathrm{Amer}}(S, t) = K - S^*(t)$$
以及自由边界光滑粘贴条件（Smooth Pasting / Smooth Fit Condition）：
$$\lim_{S \downarrow S^*(t)} \frac{\partial P^{\mathrm{Amer}}}{\partial S}(S, t) = -1$$

导数扭折引发局部套利机会的数学分析：
若在自由边界 $S^*(t)$ 处一阶空间导数发生扭折（即不连续），由价值匹配条件及 $P^{\mathrm{Amer}}(S, t) \ge K - S$，其右导数必满足 $\lim_{S \downarrow S^*(t)} \frac{\partial P^{\mathrm{Amer}}}{\partial S} = -1 + \delta$（$\delta > 0$），导致函数呈现严格的下凸角点。
根据凸函数的广义 Itô–Meyer 公式（Tanaka 公式），当标的扩散过程 $S_t$ 穿过或触碰角点 $S^*(t)$ 时，导数的跃变将在贴现期权价值的随机微分中引入一个非负的半鞅局部时项（Local Time）：
$$d(e^{-rt} P_t) = e^{-rt} \sigma S_t \frac{\partial P}{\partial S} dW_t^{\mathbb Q} + \frac{1}{2} e^{-rt} \delta \, dL_t^{S^*}(S)$$
其中 $L_t^{S^*}(S)$ 为标的资产价格在水平 $S^*$ 处的局部时过程。因为局部时具有非递减性（$dL_t^{S^*} \ge 0$），在右极限斜率跃变 $\delta > 0$ 的假定下，该项为组合提供了非负且在触碰边界时严格为正的确定性无风险漂移收益。
这意味着若以非光滑粘贴价格作为市场交易定价，持有期权并采用动态复制策略的投资者无需承担任何扩散风险，即可在标的价格触及 $S^*(t)$ 时稳定获得正的局部时现金流入，直接构造出第二类无风险套利机会。此外，从最优停时角度，导数扭折违背了一阶极值变分必要条件，说明原选取的边界并非最大化期权价值的最优边界。因此导数必须连续光滑粘贴。

常见错误做法剖析：常见错误是认为美式看跌期权也可以像美式看涨期权（无红利）一样永不提前行权，忽视了当标的价格跌到足够低时，立即行权收回现金 $K$ 赚取无风险利息的收益超过了期权潜在的时间价值。

## 21. 

在 Merton 结构化信用风险模型中，设企业资产总价值为 $V_t$，在风险中性测度 $\mathbb Q$ 下遵循几何布朗运动 $dV_t = r V_t dt + \sigma_V V_t dW_t^{\mathbb Q}$。企业负债为面值 $D = 150$ 亿元的单一零息债券，到期期限 $T = 2$ 年。给定初始资产价值 $V_0 = 200$ 亿元，年化资产波动率 $\sigma_V = 0.30$，无风险利率 $r = 0.04$。

在 Merton 框架下，企业股东享有有限责任，到期时刻 $T$ 资产清算后，股权价值为剩余索取权 $E_T = (V_T - D)^+$。因此股权在时刻 0 的理论价值等价于以企业总资产 $V_t$ 为标的资产、行权价为 $D$、到期时间为 $T$ 的标准欧式看涨期权。

首先计算 Black–Scholes 公式核心参数：
$$\sigma_V \sqrt{T} = 0.30 \times \sqrt{2} \approx 0.30 \times 1.414214 = 0.424264$$
$$\ln(V_0 / D) = \ln(200 / 150) = \ln(4/3) \approx 0.287682$$
$$(r + \frac{1}{2}\sigma_V^2) T = (0.04 + \frac{1}{2} \times 0.09) \times 2 = 0.085 \times 2 = 0.17$$
进而计算 $d_1$ 与 $d_2$：
$$d_1 = \frac{\ln(V_0 / D) + (r + \frac{1}{2}\sigma_V^2) T}{\sigma_V \sqrt{T}} = \frac{0.287682 + 0.17}{0.424264} = \frac{0.457682}{0.424264} \approx 1.0788$$
$$d_2 = d_1 - \sigma_V \sqrt{T} = 1.078767 - 0.424264 \approx 0.6545$$

查标准正态分布累积概率表或高精度数值积分：
$$N(d_1) = N(1.0788) \approx 0.8597$$
$$N(d_2) = N(0.6545) \approx 0.7436$$

计算无风险贴现因子：
$$e^{-rT} = e^{-0.04 \times 2} = e^{-0.08} \approx 0.923116$$
贴现负债面值为 $D e^{-rT} = 150 \times 0.923116 \approx 138.4674$ 亿元。

1. 股权理论价值 $E_0$：
$$E_0 = V_0 N(d_1) - D e^{-rT} N(d_2)$$
$$E_0 = 200 \times 0.859654 - 138.4674 \times 0.743606 \approx 171.9308 - 102.9652 \approx 68.97$$
计算结果为 68.97 亿元。

2. 债权理论价值 $B_0$：
由资产负债表恒等式，公司总资产由股权价值与债权价值构成（$V_0 = E_0 + B_0$）：
$$B_0 = V_0 - E_0 = 200 - 68.9656 \approx 131.03$$
计算结果为 131.03 亿元。
（亦可通过卖出看跌期权公式验证：$B_0 = D e^{-rT} - P_0$）。

3. 2 年后的风险中性违约概率 $\mathbb Q(V_2 < D)$：
在风险中性测度 $\mathbb Q$ 下，对数资产价格 $x_T = \ln V_T$ 满足 $\ln(V_T / V_0) \sim \mathcal{N}\left((r - \frac{1}{2}\sigma_V^2) T, \sigma_V^2 T\right)$。
当到期资产总值低于负债面值时触发违约，其概率为：
$$\mathbb Q(V_2 < D) = \mathbb Q\left(\ln(V_2 / V_0) < \ln(D / V_0)\right) = \mathbb Q\left(Z < \frac{\ln(D / V_0) - (r - \frac{1}{2}\sigma_V^2) T}{\sigma_V \sqrt{T}}\right)$$
其中标准正态变量 $Z \sim \mathcal{N}(0, 1)$。右侧上界恰好为 $-d_2$：
$$-d_2 = -\frac{\ln(V_0 / D) + (r - \frac{1}{2}\sigma_V^2) T}{\sigma_V \sqrt{T}} \approx -0.6545$$
因此风险中性违约概率为：
$$\mathbb Q(V_2 < D) = N(-d_2) = 1 - N(d_2) = 1 - 0.743606 \approx 0.2564 \quad (25.64\%)$$

常见错误做法剖析：常有错误做法在计算违约概率时混淆了 $d_1$ 与 $d_2$，误写为 $N(-d_1)$；另一常见错误是误把公司实际物理预期回报率 $\mu$ 替代无风险利率 $r$ 来计算风险中性违约概率，需注意物理违约概率 $\mathbb P(V_T < D) = N\left(-\frac{\ln(V_0/D) + (\mu - \frac{1}{2}\sigma_V^2)T}{\sigma_V\sqrt{T}}\right)$ 依赖主观漂移 $\mu$，而风险中性违约概率则完全由无风险利率 $r$ 决定。
## 22. 

1. 风险中性测度 $\mathbb Q$ 与客观物理测度 $\mathbb P$ 的本质区别：
客观物理测度 $\mathbb P$（又称真实测度或历史测度）描述了现实世界中资产价格真实波动的统计规律与数据生成过程，其标的资产漂移项反映了包含风险溢价的真实期望收益率 $\mu = r + \gamma \sigma$。$\mathbb P$ 测度关注的是“实际发生概率”，核心应用于宏观风险计量、违约率统计、投资组合业绩归因与资产配置。
风险中性测度 $\mathbb Q$ 则是一个数学构造的等价计价测度，其核心作用是实施相对资产定价与无套利对冲。通过将市场所有风险厌恶补偿吸收进测度变换的 Radon–Nikodym 导数中，$\mathbb Q$ 使得所有基础资产的贴现价格过程转化为鞅，其漂移率被强行校正为无风险利率 $r$。$\mathbb Q$ 测度关注的是“对冲复制成本与边际替换率”，并不代表任何市场参与者对未来现实发生频率的主观信念。

2. 压力测试与巴塞尔资本计提中不能直接使用 $\mathbb Q$ 分布的原因：
在巴塞尔协议框架（如 Basel III/IV 的 FRTB 交易账簿基本审查）与宏观压力测试中，监管资本计提要求度量金融机构在未来持有期（如 10 天或 1 年）内资产组合面临的真实潜在极端损失（99% 置信度 VaR 或 97.5% 预期短缺 ES）。
若直接使用从市场隐含波动率曲面校准出的 $\mathbb Q$ 分布，将产生严重的经济扭曲：
第一，$\mathbb Q$ 测度下的状态价格包含了市场投资者的风险厌恶、流动性紧缩与崩盘恐慌溢价。例如深度虚值看跌期权的高隐含波动率反映了资金为了购买下行保险而支付的高昂保费，若将其作为违约与暴跌的物理概率，将严重高估实际事件发生频率，导致资本计提脱离实体统计基础；
第二，$\mathbb Q$ 测度强制将所有资产漂移率设为无风险利率 $r$，抹杀了不同资产类别在宏观经济周期中的实际基本面收益差异与下行趋势动量；
第三，监管压力测试要求在假定的客观极端经济情景下（如 GDP 暴跌、失业率飙升、信用利差急剧走阔的物理历史路径）评估资产负债表的抗风险能力，必须依赖物理测度 $\mathbb P$ 下的历史模拟法或极值理论（EVT）。

3. 奇异期权校准中“参数不适定性”（Parameter Ill-Posedness）的模型风险防范机制：
在由标准香草期权曲面校准复杂连续模型（如局部波动率模型、Heston 随机波动率模型或跳跃扩散模型）时，反问题具有严重的数学不适定性（Ill-Posed Inverse Problem）：多种截然不同的参数组合可能在香草期权价格上呈现几乎完全一致的微小拟合残差，但当将这些参数外推应用于具有路径依赖特征的奇异期权（如障碍期权 Barrier Options、雪球 Autocallables 或百慕大期权）定价时，不同参数组将产生极其悬殊的衍生品理论估值与完全相悖的 Delta/Gamma 对冲持仓。

针对该模型风险的工业级防范机制包括：
第一，正则化与先验约束（Regularization）：在反问题优化目标中引入 Tikhonov 正则化项或 Sobolev 平滑惩罚泛函，惩罚局部方差曲面或波动率曲面的二阶导数剧烈震荡，确保校准参数解的物理平滑性与唯一稳定性；
第二，联合校准（Joint Calibration）：避免仅使用边际分布信息单一的香草期权进行单点拟合，将方差互换（Variance Swaps）、远期起始期权（Forward Starting Options）以及历史时间序列的物理测度矩特征纳入联合损失函数，同步约束期限结构与路径动态；
第三，多模型基准对照与随机局部波动率（SLV）混合架构：对路径依赖产品同时运行纯局部波动率模型、纯随机波动率模型与 SLV 混合模型，评估模型模型风险储备（Model Risk Reserve / AVA, Additional Valuation Adjustment）；
第四，参数稳定性监控与样本外对冲回测（Out-of-Sample Backtesting）：在每日盘后持续监控校准参数的时间序列变动方差，严禁参数日间剧烈跳跃，并通过历史真实对冲误差检验模型的稳健性。

常见错误做法剖析：量化建模中常见错误是唯以香草期权拟合优度（$R^2$ 或 RMSE 趋近于零）作为评价模型的唯一标准，误把对静态一维边际分布的完美过拟合（Overfitting）等同于对高维联合路径转移密度的精确刻画，导致在奇异期权动态对冲中产生巨大的未对冲模型风险暴露。