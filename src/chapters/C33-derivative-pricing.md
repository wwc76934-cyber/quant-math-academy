# 第33章　衍生品定价与风险中性测度

衍生品的价格并非对未来收益作主观预测后直接贴现的结果，而是基础资产价格、交易约束与无套利原则共同施加的限制。风险中性测度把这些限制转化为期望运算：在适当贴现后，资产价格成为鞅，衍生品价值则可表示为贴现收益的条件期望。本章首先建立这一对应关系，并区分价格的唯一性与市场的完备性。

## 33.1 无套利与定价基本定理

无套利定价的核心不是假定投资者具有相同偏好，而是排除无需净投入却能获得严格正收益的交易机会。本节先在一般概率空间中区分两类套利，再以单期有限状态模型为主要对象，用资产价格矩阵写出组合的初始成本与终端收益。随后借助凸集分离严格证明无套利与风险中性测度存在性的等价关系，最后陈述多期版本，并说明它如何引向完备市场与不完备市场的不同定价结论。

设不确定性由概率空间 $(\Omega,\mathcal F,\mathbb P)$ 描述，其中 $\mathbb P$ 是真实世界测度，未必用于直接计算价格。折现因子把不同时点的现金流换算到同一计价单位；本节所说的收益若非特别说明，均指已经贴现到初始时点的收益。
### 33.1.1 两类套利及其排除

设一项可交易策略的初始成本为 $c$，终端现金流经贴现后的随机变量为 $K$。所有可交易配对 $(c,K)$ 构成集合 $\mathcal M$，并假定有限组合与常数倍的缩放仍在 $\mathcal M$ 中。这里的成本在初始时刻支付，因而 $c<0$ 表示交易者在建仓时实际收到现金。用 $L^0$ 表示有限随机变量的等价类，用 $L_+^0$ 表示其中几乎必然非负的随机变量所成的锥；随机变量相等也按几乎必然相等理解。

**定义 33.1（第一类套利与第二类套利）**

若存在 $(0,K)\in\mathcal M$，使得 $K\in L_+^0$ 且 $\mathbb P(K>0)>0$，则称该策略为第一类套利。若存在 $(c,K)\in\mathcal M$，使得 $c<0$ 且 $K\in L_+^0$，则称该策略为第二类套利。若两类套利均不存在，则称市场无套利。

第一类套利是“零投入、无损失可能且有正概率盈利”。第二类套利则是“建仓时已经取得严格正收入，终端却没有任何偿付义务”。后者即使在所有状态下终端现金流都为零，也仍然违反合理定价：它等同于无条件获得一笔初始赠款。因此，只排除第一类套利并不足以刻画通常所说的无套利。

记零成本策略的终端收益集合为 $\mathcal K_0=\{K:(0,K)\in\mathcal M\}$。在本节线性、无交易摩擦的市场中，无套利可写为

$$
\mathcal K_0\cap L_+^0=\{0\},\qquad
\mathcal M\cap\bigl((-\infty,0)\times L_+^0\bigr)=\varnothing .
\tag{33.1}
$$

第一式中的零表示几乎必然为零的随机变量。若允许以严格负成本复制非负收益，还可以先取得 $-c>0$ 的初始收入，再把这部分收入单独持有，由此转化为一个终端收益严格为正的零成本策略。因此，在存在现金账户且允许现金借贷的标准设定下，排除第一类套利就会自动排除第二类套利；式（33.1）把两个条件分别列出，是为了在不依赖这一转化时仍保持概念完整。

无套利并不要求每个非负收益都有严格正价格。若某个收益在 $\mathbb P$ 测度为零的事件上取值，其实际支付状况需要用测度等价类来辨认；在有限状态模型中，我们直接假定每个状态都有正的真实概率，从而避免这种退化。无套利也不限定投资者效用函数或风险偏好，它只要求任何市场参与者都不能通过可交易策略获得上述免费收益。
### 33.1.2 单期有限状态市场的矩阵表示

**定义 33.2（单期有限状态市场与风险中性测度）**

单期市场只有初始时刻 $0$ 与终端时刻 $T$，状态空间为 $\Omega=\{\omega_1,\ldots,\omega_n\}$，真实概率 $p_j=\mathbb P(\{\omega_j\})$ 满足 $p_j>0$ 且 $\sum_{j=1}^n p_j=1$。市场中有 $m+1$ 种可交易资产，第 $i$ 种资产的贴现初始价格为 $s_i$，在状态 $\omega_j$ 的贴现终端价值为 $D_{ji}$。记 $\boldsymbol s=(s_0,\ldots,s_m)^\top$，资产价格矩阵定义为

$$
\boldsymbol D=
\begin{pmatrix}
D_{00} & D_{01} & \cdots & D_{0m}\\
D_{10} & D_{11} & \cdots & D_{1m}\\
\vdots & \vdots & \ddots & \vdots\\
D_{n-1,0} & D_{n-1,1} & \cdots & D_{n-1,m}
\end{pmatrix}\in\mathbb R^{n\times(m+1)} .
\tag{33.2}
$$

矩阵的行对应状态，列对应资产。这里采用从 $0$ 开始的资产下标和从 $0$ 开始的状态行下标，仅为使第 $0$ 列方便地表示贴现后的现金账户；因此也可把矩阵各行依次理解为 $\omega_1$ 至 $\omega_n$。现金账户满足 $s_0=1$，且其对应列的所有元素均为 $1$。

若原始终端价格为 $S_T^i$，选取在每个状态严格为正的计价单位 $N_t$，则 $D_{ji}=S_T^i(\omega_j)/N_T(\omega_j)$，而 $s_i=S_0^i/N_0$。贴现并不改变交易机会的经济实质，只是改变计量单位。取现金账户本身作为计价单位时，贴现后的现金账户价格恒为 $1$，终端利率因此被吸收到贴现过程中。

组合向量 $\boldsymbol\theta=(\theta_0,\ldots,\theta_m)^\top$ 的第 $i$ 个分量表示持有第 $i$ 种资产的数量，负数表示卖空。其初始成本与状态终端收益分别为

$$
c(\boldsymbol\theta)=\boldsymbol\theta^\top\boldsymbol s,\qquad
\boldsymbol K(\boldsymbol\theta)=\boldsymbol D\boldsymbol\theta .
\tag{33.3}
$$

终端收益向量第 $j$ 个分量是 $\sum_{i=0}^m D_{ji}\theta_i$。按照定义 33.1，单期市场无套利当且仅当下面的套利组合集合为空：

$$
\mathcal A=\left\{\boldsymbol\theta\in\mathbb R^{m+1}:
\boldsymbol\theta^\top\boldsymbol s\le 0,\ 
\boldsymbol D\boldsymbol\theta\ge\boldsymbol 0,\ 
(\boldsymbol\theta^\top\boldsymbol s,\boldsymbol D\boldsymbol\theta)\ne(0,\boldsymbol 0)
\right\}=\varnothing .
\tag{33.4}
$$

式中向量不等式按分量理解。成本严格为负对应第二类套利；成本为零而收益向量非零且非负对应第一类套利。

若存在严格正的向量 $\boldsymbol q=(q_1,\ldots,q_n)^\top$，使得

$$
q_j>0,\qquad \sum_{j=1}^n q_j=1,\qquad
\boldsymbol D^\top\boldsymbol q=\boldsymbol s,
\tag{33.5}
$$

则由 $\mathbb Q(\{\omega_j\})=q_j$ 定义的概率测度 $\mathbb Q$ 称为风险中性测度。条件 $\boldsymbol D^\top\boldsymbol q=\boldsymbol s$ 逐资产表示 $s_i=\mathbb E^{\mathbb Q}[D^i]$，所以每种资产的贴现初始价格都等于其贴现终端价值在 $\mathbb Q$ 下的期望。由于每个 $q_j>0$，测度 $\mathbb Q$ 与 $\mathbb P$ 等价；它不是对真实状态概率的估计，而是与既有资产价格相容的一套定价权重。
### 33.1.3 单期资产定价基本定理

**定理 33.3（单期资产定价基本定理）**

在定义 33.2 的单期有限状态市场中，市场不存在第一类和第二类套利，当且仅当存在风险中性测度，即存在满足式（33.5）的严格正概率向量 $\boldsymbol q$。特别地，无套利等价于每一种贴现资产的初始价格都可以表示为其贴现终端收益关于某一与 $\mathbb P$ 等价的测度的期望。

**证明**

先证明充分性。设严格正概率向量 $\boldsymbol q$ 满足 $\boldsymbol D^\top\boldsymbol q=\boldsymbol s$。任取组合 $\boldsymbol\theta$，若其初始成本不为正且终端收益按分量非负，则由价格关系可得

$$
0\ge \boldsymbol\theta^\top\boldsymbol s
=\boldsymbol\theta^\top\boldsymbol D^\top\boldsymbol q
=(\boldsymbol D\boldsymbol\theta)^\top\boldsymbol q
=\sum_{j=1}^n q_j(\boldsymbol D\boldsymbol\theta)_j\ge 0 .
$$

因此上述两个不等式都必须取等号，进而 $\boldsymbol\theta^\top\boldsymbol s=0$ 且 $\sum_{j=1}^n q_j(\boldsymbol D\boldsymbol\theta)_j=0$。由于 $q_j>0$ 且 $(\boldsymbol D\boldsymbol\theta)_j\ge0$，求和式中的每一项都非负，所以每一项均为零，即 $\boldsymbol D\boldsymbol\theta=\boldsymbol0$。于是成本与终端收益不可能一个为负成本或非零非负收益而另一个仍满足套利条件，式（33.4）中的 $\mathcal A$ 必为空集。这同时排除了第一类与第二类套利。

再证明必要性。设市场无套利。为把任意初始成本转化为零成本，记 $\boldsymbol e_0=(1,0,\ldots,0)^\top$，并用 $\boldsymbol 1_n$ 表示所有分量均为 $1$ 的 $n$ 维向量。贴现现金账户满足 $\boldsymbol s^\top\boldsymbol e_0=1$ 和 $\boldsymbol D\boldsymbol e_0=\boldsymbol1_n$。定义调整后收益所成的线性子空间

$$
\mathcal K=\left\{\boldsymbol D\boldsymbol\theta
-(\boldsymbol\theta^\top\boldsymbol s)\boldsymbol1_n:
\boldsymbol\theta\in\mathbb R^{m+1}\right\} .
\tag{33.6}
$$

对每个 $\boldsymbol\theta$，令 $\boldsymbol\varphi=\boldsymbol\theta-(\boldsymbol\theta^\top\boldsymbol s)\boldsymbol e_0$。直接代入式（33.3）得到 $\boldsymbol\varphi^\top\boldsymbol s=0$，且 $\boldsymbol D\boldsymbol\varphi=\boldsymbol D\boldsymbol\theta-(\boldsymbol\theta^\top\boldsymbol s)\boldsymbol1_n$。因此 $\mathcal K$ 恰好是所有零成本组合的终端收益集合。
无套利首先给出

$$
\mathcal K\cap\mathbb R_+^n=\{\boldsymbol0\}.
$$

事实上，$\mathcal K$ 中的向量都能由零成本组合实现；若其中存在非零的非负向量，该向量就构成第一类套利。反过来，这一条件其实也排除了第二类套利：若 $\boldsymbol D\boldsymbol\theta\ge\boldsymbol0$ 且 $c=\boldsymbol\theta^\top\boldsymbol s<0$，则 $\boldsymbol D\boldsymbol\theta-c\boldsymbol1_n$ 属于 $\mathcal K$，并且每个分量至少为 $-c>0$，仍产生矛盾。因此，在现金账户存在时，两种无套利条件都可以归结为 $\mathcal K$ 与非负正交锥只在原点相交。

下面用严格分离构造定价概率。定义概率单纯形

$$
\Delta=\left\{\boldsymbol x\in\mathbb R_+^n:
\boldsymbol1_n^\top\boldsymbol x=1\right\}.
$$

集合 $\Delta$ 是非空、有界闭凸集，因而是紧凸集；$\mathcal K$ 是有限维线性子空间，因而是闭凸集。由于 $\Delta$ 中的每个向量都非零且非负，上一步给出 $\mathcal K\cap\Delta=\varnothing$。对闭凸集 $\mathcal K$ 与紧凸集 $\Delta$ 应用有限维空间中的严格分离定理，存在 $\boldsymbol a\in\mathbb R^n$ 以及常数 $\alpha<\beta$，使得

$$
\boldsymbol a^\top\boldsymbol k\le\alpha<\beta
\le\boldsymbol a^\top\boldsymbol x
\qquad (\boldsymbol k\in\mathcal K,\ \boldsymbol x\in\Delta).
$$

先固定 $\boldsymbol k\in\mathcal K$。对任意实数 $t$，都有 $t\boldsymbol k\in\mathcal K$，故 $t\boldsymbol a^\top\boldsymbol k\le\alpha$。若 $\boldsymbol a^\top\boldsymbol k>0$，令 $t\to+\infty$ 即矛盾；若 $\boldsymbol a^\top\boldsymbol k<0$，令 $t\to-\infty$ 亦矛盾。因此必有 $\boldsymbol a^\top\boldsymbol k=0$。又因 $\boldsymbol0\in\mathcal K$，可知 $\alpha\ge0$，从而对每个 $\boldsymbol x\in\Delta$ 都有 $\boldsymbol a^\top\boldsymbol x\ge\beta>0$。依次取 $\boldsymbol x$ 为第 $j$ 个标准基向量，即得 $a_j\ge\beta>0$。故分离向量 $\boldsymbol a$ 的每个分量都严格为正。
将 $\boldsymbol a$ 与 $\mathcal K$ 正交这一结论代入式（33.6），对任意 $\boldsymbol\theta$ 有

$$
0=\boldsymbol a^\top\left[\boldsymbol D\boldsymbol\theta
-(\boldsymbol\theta^\top\boldsymbol s)\boldsymbol1_n\right]
=\boldsymbol\theta^\top\boldsymbol D^\top\boldsymbol a
-(\boldsymbol1_n^\top\boldsymbol a)\boldsymbol\theta^\top\boldsymbol s .
$$

因为 $\boldsymbol\theta$ 任意，所以 $\boldsymbol D^\top\boldsymbol a=(\boldsymbol1_n^\top\boldsymbol a)\boldsymbol s$。令 $\lambda=\boldsymbol1_n^\top\boldsymbol a=\sum_{j=1}^n a_j>0$，再令 $\boldsymbol q=\boldsymbol a/\lambda$。于是 $q_j>0$、$\sum_{j=1}^n q_j=1$，并且 $\boldsymbol D^\top\boldsymbol q=\boldsymbol s$。这正是式（33.5），故风险中性测度存在。充分性与必要性均已证明。

□

证明中的严格正性不是技术上的附加修饰。若只有 $q_j\ge0$，充分性论证只能得到在非负收益与零成本的组合中 $q_j(D\boldsymbol\theta)_j=0$；当某个 $q_j=0$ 时，对应状态的正收益不会进入期望，仍可能形成真实概率为正的第一类套利。因此，与 $\mathbb P$ 等价而非仅仅绝对连续的定价测度，才对应完整意义上的无套利。
风险中性测度还解释了为什么无套利价格具有线性。设某项衍生品的贴现终端收益向量为 $\boldsymbol h=(h_1,\ldots,h_n)^\top$。若存在组合 $\boldsymbol\theta$ 使 $\boldsymbol D\boldsymbol\theta=\boldsymbol h$，则称该收益可由基础资产复制。对任意满足式（33.5）的风险中性概率向量，都有

$$
\pi(\boldsymbol h)=\boldsymbol\theta^\top\boldsymbol s
=\boldsymbol\theta^\top\boldsymbol D^\top\boldsymbol q
=\boldsymbol q^\top\boldsymbol h
=\mathbb E^{\mathbb Q}[h].
\tag{33.7}
$$

因此，复制组合的初始成本只能等于 $\mathbb E^{\mathbb Q}[h]$，不能因复制组合不同而改变。若同一收益有两个复制组合 $\boldsymbol\theta$ 与 $\widetilde{\boldsymbol\theta}$，则 $\boldsymbol D(\boldsymbol\theta-\widetilde{\boldsymbol\theta})=\boldsymbol0$；若二者成本不同，买进成本较低者并卖出成本较高者，就会得到初始净收入而终端义务完全抵消的第二类套利。这与式（33.7）给出的成本一致性相互印证。

对于可复制收益，价格并不依赖选择了哪一个风险中性测度，因为 $\boldsymbol q^\top\boldsymbol h$ 总化约为同一个复制成本。对于尚未假定可复制的收益，式（33.7）不能直接断言存在唯一价格；它只说明每引入一个严格正定价测度，就得到一个与原有基础资产价格相容的候选价值。这个差别正是完备市场与不完备市场的分水岭。

从对偶角度看，定理 33.3 也是 Farkas 引理的一种形式。原始问题要求不存在非正成本却产生非负且非零终端收益的组合；对偶问题则要求找到一个严格正向量，使所有零成本收益与其正交。分离向量不仅证明“没有套利”，还显式给出每一状态的定价权重。现金账户列保证了这些权重归一化后仍保持资产价格关系，从而把一般的正线性定价泛函转换成真正的概率期望。

若放弃严格正性，只保留半正定价向量，通常只能得到较弱的“无免费午餐”结论；若市场还包含交易约束、买卖价差或不可无限卖空等摩擦，也必须改用相应的收益锥和对偶锥。定理 33.3 的完整分离论证依赖于有限维、线性组合和无摩擦假设，不能未经修改就替代一般连续时间模型中的基本定理。
**例 33.1**

考虑一个三状态单期市场。状态为 $\omega_1,\omega_2,\omega_3$，真实概率分别为 $3/10,2/5,3/10$。第 $0$ 种资产是贴现现金账户，第 $1$ 种资产是股票，第 $2$ 种资产是在中间状态支付 $2$、在其余状态支付 $0$ 的合约。三种资产的贴现初始价格依次为 $1,10,1$，贴现终端收益矩阵为

$$
\boldsymbol D=
\begin{pmatrix}
1&12&0\\
1&10&2\\
1&8&0
\end{pmatrix},\qquad
\boldsymbol s=
\begin{pmatrix}
1\\10\\1
\end{pmatrix}.
$$

求全部风险中性概率，判定市场是否存在套利，并求贴现终端收益为 $(3,1,0)^\top$ 的衍生品价格。

**解**

设 $\boldsymbol q=(q_1,q_2,q_3)^\top$ 为风险中性概率向量。由现金账户、股票和第三项资产的价格关系，并不要求 $\boldsymbol q$ 等于真实概率向量，而只要求

$$
q_1+q_2+q_3=1,
$$

$$
12q_1+10q_2+8q_3=10,
$$

$$
2q_2=1,
$$

以及 $q_1,q_2,q_3>0$。第三个方程立即给出 $q_2=1/2$。代入第一个方程得到 $q_1+q_3=1/2$，代入第二个方程得到 $12q_1+8q_3=5$。将 $q_3=1/2-q_1$ 代入后，有

$$
12q_1+8\left(\frac12-q_1\right)=5
\quad\Longrightarrow\quad
4q_1=1.
$$

因此 $q_1=1/4$，继而 $q_3=1/4$。全部风险中性概率只有一个，即

$$
\boldsymbol q=
\begin{pmatrix}
1/4\\1/2\\1/4
\end{pmatrix}.
$$

三个分量都严格为正，且其和为 $1$，故它确实定义了与真实测度等价的概率测度。逐列验证可得

$$
\frac14+\frac12+\frac14=1,
$$

$$
12\cdot\frac14+10\cdot\frac12+8\cdot\frac14=10,
$$

$$
0\cdot\frac14+2\cdot\frac12+0\cdot\frac14=1.
$$

所以所有资产价格关系均成立。由定理 33.3 的必要性方向，该市场既不存在第一类套利，也不存在第二类套利。这里真实概率只用于确认三个状态都不是零概率状态；风险中性概率与真实概率不同，并不产生矛盾。
对衍生品收益 $\boldsymbol h=(3,1,0)^\top$，由式（33.7）可得

$$
\pi(\boldsymbol h)
=\frac14\cdot3+\frac12\cdot1+\frac14\cdot0
=\frac54 .
$$

这一价格也可以用复制直接核对。设复制组合为 $\boldsymbol\theta=(\theta_0,\theta_1,\theta_2)^\top$，逐状态方程为

$$
\theta_0+12\theta_1=3,
$$

$$
\theta_0+10\theta_1+2\theta_2=1,
$$

$$
\theta_0+8\theta_1=0.
$$

第一式减第三式得 $4\theta_1=3$，故 $\theta_1=3/4$；第三式随后给出 $\theta_0=-6$；代入第二式得到 $-6+15/2+2\theta_2=1$，所以 $\theta_2=-1/4$。该组合的初始成本为

$$
-6+\frac34\cdot10-\frac14\cdot1=\frac54,
$$

与风险中性期望完全一致。若衍生品市场报价高于 $5/4$，卖出衍生品并买入复制组合会在初始时刻产生正收入，而终端净现金流为零；若报价低于 $5/4$，反向交易同样构成第二类套利。因此，在允许交易该衍生品且仍保持线性无摩擦的条件下，$5/4$ 是唯一无套利价格。
### 33.1.4 多期基本定理与完备性预告

多期模型允许根据新信息反复调整组合，因此套利的定义必须作用于整个交易策略，而不能只检查某一个日期。设交易日期为 $0,1,\ldots,T$，信息流为 $\{\mathcal F_t\}_{t=0}^T$，贴现资产价格过程为 $\{\boldsymbol S_t\}_{t=0}^T$，其中每个 $\boldsymbol S_t$ 都是 $\mathcal F_t$ 可测的 $m+1$ 维向量，且第 $0$ 个分量恒为 $1$。在有限状态、有限日期的框架中，每个日期只出现有限个价格节点。

用 $\boldsymbol\theta_t$ 表示从时刻 $t-1$ 持有到时刻 $t$ 的组合，它必须在时刻 $t-1$ 已经确定，即 $\boldsymbol\theta_t$ 为 $\mathcal F_{t-1}$ 可测。这样的过程称为可预测过程。组合在时刻 $t$ 调整前的价值为 $\boldsymbol\theta_t^\top\boldsymbol S_t$；观察 $\boldsymbol S_t$ 后，把组合调整为 $\boldsymbol\theta_{t+1}$。自融资条件要求调整前后价值相同：

$$
\boldsymbol\theta_t^\top\boldsymbol S_t
=\boldsymbol\theta_{t+1}^\top\boldsymbol S_t,
\qquad t=1,\ldots,T-1.
$$

若初始财富为 $V_0=\boldsymbol\theta_1^\top\boldsymbol S_0$，反复使用自融资条件，终端财富可写为

$$
V_T=V_0+\sum_{t=1}^T
\boldsymbol\theta_t^\top(\boldsymbol S_t-\boldsymbol S_{t-1}).
$$

这一收益分解说明，交易本身不创造或消灭价值，终端财富只由初始财富和各期持有资产的价格变化累积而成。多期第一类套利指 $V_0=0$、$V_T\ge0$ 几乎必然成立且 $\mathbb P(V_T>0)>0$ 的自融资策略；多期第二类套利指初始成本严格为负、终端财富仍几乎必然非负的自融资策略。这里的过程不等式必须在所有相关日期和状态上同时成立，不能只检查终端分布。

在有限状态模型中，可预测策略在每个节点只有有限种资产选择，所有收益也都是有限维向量，因而不再需要额外的可积性限制。在一般概率空间中，则必须限定策略的可容许性并处理无界交易带来的病策略；这也是多期基本定理在一般连续时间模型中需要更强“无免费午餐”条件的原因之一。本节的陈述严格限于有限状态、有限期限、无摩擦市场。
### 33.1.5 风险中性测度两个方向的证明

为使定理 33.3 的论证闭合，下面把单期有限状态市场的两个方向完整写出。设状态空间为 $\Omega=\{\omega_1,\ldots,\omega_n\}$，真实概率在每个状态上均严格为正。记 $\boldsymbol p=\boldsymbol S_0$，并以 $\boldsymbol D$ 表示 $n\times(m+1)$ 的终端收益矩阵，其第 $j$ 行、第 $i$ 列元素为第 $i$ 项资产在状态 $\omega_j$ 的贴现价格。于是组合 $\boldsymbol\theta$ 的成本为 $\boldsymbol p^\top\boldsymbol\theta$，终端收益向量为 $\boldsymbol D\boldsymbol\theta$。风险中性测度 $\mathbb Q$ 指满足 $q_j=\mathbb Q(\{\omega_j\})>0$ 且 $\boldsymbol D^\top\boldsymbol q=\boldsymbol p$ 的概率测度，其中 $\boldsymbol q=(q_1,\ldots,q_n)^\top$。

**证明**

先证必要性，即无第一类与第二类套利蕴含风险中性测度存在。定义线性子空间与概率单纯形

$$
\mathcal K=\{(-\boldsymbol p^\top\boldsymbol\theta,\boldsymbol D\boldsymbol\theta):\boldsymbol\theta\in\mathbb R^{m+1}\},\qquad
\mathcal D=\{\boldsymbol x\in\mathbb R_+^{n+1}:x_0+\cdots+x_n=1\}.
$$

若有 $\boldsymbol x\in\mathcal K\cap\mathcal D$，则存在 $\boldsymbol\theta$ 使 $-\boldsymbol p^\top\boldsymbol\theta=x_0\ge0$，并且 $\boldsymbol D\boldsymbol\theta\ge0$。当 $x_0>0$ 时，该组合成本为负而终端收益非负，构成第二类套利；当 $x_0=0$ 时，由 $\boldsymbol x\in\mathcal D$ 可知收益向量不是零向量，故至少一个状态的收益严格为正，构成第一类套利。因此 $\mathcal K\cap\mathcal D=\varnothing$。

$\mathcal K$ 是闭凸集，$\mathcal D$ 是紧凸集，严格分离定理给出 $\boldsymbol\lambda\in\mathbb R^{n+1}$ 及常数 $a<b$，使 $\boldsymbol\lambda^\top\boldsymbol k\le a$ 对所有 $\boldsymbol k\in\mathcal K$ 成立，而 $b\le\boldsymbol\lambda^\top\boldsymbol x$ 对所有 $\boldsymbol x\in\mathcal D$ 成立。由于 $\mathcal K$ 是线性子空间，若某个 $\boldsymbol k$ 使内积非零，则其正负任意倍数会破坏上界，故 $\boldsymbol\lambda^\top\boldsymbol k=0$。又因 $\boldsymbol 0\in\mathcal K$，可得 $b>a\ge0$，从而 $\boldsymbol\lambda^\top\boldsymbol x>0$ 在 $\mathcal D$ 上成立。依次取各坐标单位向量，便知 $\lambda_j>0$ 对 $j=0,\ldots,n$ 均成立。
将 $\boldsymbol\lambda=(\lambda_0,\lambda_1,\ldots,\lambda_n)^\top$ 代入上述零内积关系，得到

$$
-\lambda_0\boldsymbol p^\top\boldsymbol\theta
+\sum_{j=1}^n\lambda_j(\boldsymbol D\boldsymbol\theta)_j=0
$$

对所有 $\boldsymbol\theta$ 成立，故 $\boldsymbol D^\top(\lambda_1,\ldots,\lambda_n)^\top=\lambda_0\boldsymbol p$。令 $q_j=\lambda_j/\lambda_0$，则所有 $q_j$ 严格为正且 $\boldsymbol D^\top\boldsymbol q=\boldsymbol p$。第 $0$ 项资产的贴现初值和贴现终值均为 $1$，所以该等式还给出 $\sum_{j=1}^nq_j=1$。因此 $\boldsymbol q$ 确实定义了风险中性测度。

再证充分性。若风险中性测度 $\mathbb Q$ 存在，则任意组合满足

$$
\boldsymbol p^\top\boldsymbol\theta
=\sum_{j=1}^nq_j(\boldsymbol D\boldsymbol\theta)_j
=\mathbb E^{\mathbb Q}[\boldsymbol\theta^\top\boldsymbol S_1].
$$

若终端收益在所有状态均非负，则右端非负，故初始成本不可能严格为负，第二类套利被排除。若初始成本为零，则右端为零；由于每个 $q_j$ 严格为正且各状态收益非负，必有 $\boldsymbol D\boldsymbol\theta=\boldsymbol 0$，因而不存在某个状态以正概率获得严格正收益，第一类套利也被排除。至此两个方向均得证。严格正性不可减弱为非负性，否则零成本组合可能在被测度忽略的状态上产生正收益。

□

多期模型中的等价测度可理解为在每个节点、每个一期分支上应用上述结论：节点条件概率严格为正，并使下一期贴现价格的条件期望等于当前贴现价格。沿任意路径相乘即得到全程风险中性概率；反向论证则对任意自融资策略的贴现财富逐期取条件期望。因此，单期证明中的两个方向正是多期鞅方法的局部核心。

## 33.2 单期二叉树模型

二叉树模型把有限状态市场的思想化为可直接计算的结构。每个节点只有上涨与下跌两个后继节点，复制方程因而只是二元线性方程组；多期重复这一结构，又可以逼近连续时间扩散模型。

### 33.2.1 参数、无套利条件与风险中性概率

**定义 33.4（单期二叉树模型）**

单期市场含一个无风险账户和一股风险资产，交易日期为 $0$ 与 $1$。设 $S_0>0$，$0<d<u$，$r>-1$，并记 $R=1+r$。无风险账户满足 $B_0=1$，风险资产在状态 $\omega_u$ 与 $\omega_d$ 上分别取值 $uS_0$ 与 $dS_0$，即

$$
B_1=R,\qquad S_1(\omega_u)=uS_0,\qquad S_1(\omega_d)=dS_0.
\tag{33.8}
$$

真实测度由 $\mathbb P(\{\omega_u\})=p$ 与 $\mathbb P(\{\omega_d\})=1-p$ 给出，其中 $0<p<1$。持有 $\phi$ 个无风险账户和 $\Delta$ 股资产时，初始价值与终端价值分别为 $V_0=\phi+\Delta S_0$ 和 $V_1=\phi R+\Delta S_1$，$\phi$ 与 $\Delta$ 均允许取负值。
**定理 33.5（无套利条件与风险中性概率）**

单期二叉树市场不存在第一类与第二类套利，当且仅当 $d<1+r<u$。在此条件下，唯一的风险中性测度 $\mathbb Q$ 由

$$
q=\mathbb Q(\{\omega_u\})=\frac{R-d}{u-d},\qquad
1-q=\mathbb Q(\{\omega_d\})=\frac{u-R}{u-d},\qquad
S_0=\mathbb E^{\mathbb Q}\!\left[\frac{S_1}{R}\right]
\tag{33.9}
$$

确定，并且贴现无风险账户与贴现股票价格均为 $\mathbb Q$ 下的鞅。

**证明**

先证明无套利蕴含严格不等式。若 $R\ge u$，取 $\phi=S_0$、$\Delta=-1$，则初始价值为零，而两个终端价值为

$$
V_1(\omega_u)=S_0(R-u)\ge0,\qquad
V_1(\omega_d)=S_0(R-d)>0.
$$

这构成第一类套利。若 $R\le d$，反向取 $\phi=-S_0$、$\Delta=1$，初始价值仍为零，而

$$
V_1(\omega_u)=S_0(u-R)>0,\qquad
V_1(\omega_d)=S_0(d-R)\ge0,
$$

同样构成第一类套利。因此无套利必须有 $d<R<u$；这也排除了边界上的等号。

反之，设 $d<R<u$。由 $R=q u+(1-q)d$ 解出 $q=(R-d)/(u-d)$，另一概率为 $1-q=(u-R)/(u-d)$。严格不等式保证 $0<q<1$，所以 $\mathbb Q$ 与真实测度等价。直接计算得

$$
\frac{1}{R}\mathbb E^{\mathbb Q}[S_1]
=\frac{q uS_0+(1-q)dS_0}{R}=S_0,
\qquad
\frac{1}{R}\mathbb E^{\mathbb Q}[B_1]=1=B_0.
$$

故式（33.9）成立，定理 33.3 的充分性方向排除了两类套利。风险中性概率的唯一性来自上涨概率方程与概率和为一这两个独立线性方程。单期只有两个日期，上述等式也就是贴现价格成为鞅所需的全部条件。

□

条件 $d<R<u$ 表明风险资产既不能在所有状态都不逊于无风险账户，也不能在所有状态都不优于无风险账户。参数 $q$ 由资产收益区间和利率决定，与真实上涨概率 $p$ 无关；$p$ 只要求两个状态都具有正概率，并不要求风险资产的实际期望收益率等于 $r$。
### 33.2.2 复制组合、对冲比率与鞅定价

设衍生品在时刻 $1$ 的收益为随机变量 $H$，并简记 $H_u=H(\omega_u)$、$H_d=H(\omega_d)$。收益可以取任意实数，并不要求 $H_u\ge H_d$；例如看跌期权通常具有相反的顺序。

**命题 33.6（复制组合与对冲比率）**

在 $d<R<u$ 下，任意收益 $H$ 都可由唯一的组合 $(\phi,\Delta)$ 复制，其中

$$
\Delta=\frac{H_u-H_d}{(u-d)S_0},\qquad
\phi=\frac{uH_d-dH_u}{(u-d)R}.
\tag{33.10}
$$

复制组合的初始成本，也就是衍生品的唯一无套利价格，为

$$
\pi(H)=\phi+\Delta S_0
=\frac{qH_u+(1-q)H_d}{R}
=\mathbb E^{\mathbb Q}\!\left[\frac{H}{R}\right].
\tag{33.11}
$$

**证明**

复制要求在上涨与下跌状态分别满足

$$
\phi R+\Delta uS_0=H_u,\qquad
\phi R+\Delta dS_0=H_d.
$$

第一式减第二式得 $\Delta(u-d)S_0=H_u-H_d$，故得到式（33.10）中的对冲比率。把 $\Delta$ 代回第一式，可得

$$
\phi R
=H_u-\frac{u(H_u-H_d)}{u-d}
=\frac{uH_d-dH_u}{u-d},
$$

从而得到 $\phi$。将其代入下跌方程，左端为

$$
\frac{uH_d-dH_u}{u-d}
+\frac{d(H_u-H_d)}{u-d}=H_d,
$$

所以两个状态都被精确复制。该线性方程组的系数行列式为 $RS_0(u-d)\ne0$，故解唯一。

复制组合的初始成本为 $\phi+\Delta S_0$。把式（33.10）代入并通分，得到

$$
\phi+\Delta S_0
=\frac{uH_d-dH_u+R(H_u-H_d)}{(u-d)R}
=\frac{(R-d)H_u+(u-R)H_d}{(u-d)R}.
$$

利用式（33.9）中 $q$ 与 $1-q$ 的表达式，右端正是式（33.11）。若衍生品报价 $P>\pi(H)$，卖出衍生品并买入复制组合，初始时刻得到正收入 $P-\pi(H)$，终端两边收益相抵，构成第二类套利；若 $P<\pi(H)$，反向交易得到同样的结论。因此复制成本是唯一无套利价格。

□

式（33.11）称为风险中性定价公式，也称鞅定价公式。若定义衍生品价值过程 $V_0=\pi(H)$、$V_1=H$，则它满足 $V_0/B_0=\mathbb E^{\mathbb Q}[V_1/B_1\mid\mathcal F_0]$；终端等式 $V_1/B_1=\mathbb E^{\mathbb Q}[V_1/B_1\mid\mathcal F_1]$ 也由终端收益的可测性成立。因此贴现股票、贴现无风险账户和贴现衍生品价值在同一测度下都是鞅。这里的期望并不预测真实收益，而是把复制方程的解写成便于计算的形式。
**例 33.2**

设单期二叉树的参数为 $S_0=100$、$u=6/5$、$d=4/5$、$r=1/20$。一份欧式看涨期权在时刻 $1$ 到期，执行价格为 $K=100$。求复制该期权的股票数量、无风险账户头寸及期权无套利价格，并说明报价偏离时如何构造套利。

**解**

首先，$R=21/20$，且 $4/5<21/20<6/5$，故定理 33.5 的无套利条件成立。期权在两个状态的收益分别为

$$
H_u=(120-100)^+=20,\qquad H_d=(80-100)^+=0.
$$

风险中性上涨概率为

$$
q=\frac{21/20-4/5}{6/5-4/5}
=\frac{1/4}{2/5}=\frac58,
\qquad 1-q=\frac38.
$$

由式（33.10），复制组合中的股票数量与无风险账户头寸分别为

$$
\Delta=\frac{20-0}{(6/5-4/5)\cdot100}=\frac12,
$$

$$
\phi=\frac{(6/5)\cdot0-(4/5)\cdot20}
{(6/5-4/5)\cdot(21/20)}
=-\frac{800}{21}.
$$

因此，初始时刻买入半股股票，并借入相当于 $800/21$ 个无风险账户的资金。组合成本为

$$
\pi(H)=\frac12\cdot100-\frac{800}{21}
=\frac{250}{21}\approx11.9048.
$$

逐状态核对可以看到，$\phi R=-40$，故上涨状态的组合价值为 $-40+(1/2)\cdot120=20$，下跌状态的组合价值为 $-40+(1/2)\cdot80=0$，与期权收益完全一致。另一方面，由式（33.11）直接计算也有

$$
\pi(H)=\frac{20}{21}
\left(\frac58\cdot20+\frac38\cdot0\right)
=\frac{250}{21},
$$

两种计算结果相同。若市场报价为 $13$，卖出期权并买入复制组合，可在初始时刻锁定 $13-250/21=23/21$ 的正收入，终端净现金流为零；若报价为 $11$，买入期权并卖空复制组合，则初始正收入为 $250/21-11=19/21$。这两种交易分别给出报价过高与报价过低时的第二类套利。
### 33.2.3 多期二叉树与倒向复制

把单期结构重复 $T$ 次，每一期均使用相同的 $u$、$d$ 与 $R$，并始终保持 $d<R<u$。以 $\mathcal F_t$ 表示时刻 $t$ 已经观察到的路径信息。若 $K_t$ 记录前 $t$ 期中的上涨次数，则 $S_t=S_0u^{K_t}d^{t-K_t}$。只依赖 $S_t$ 而不区分上涨下跌次序的节点可以合并，因此该树称为可重组二叉树。

在每个节点完成调仓后，以 $\Delta_t$ 表示持有到下一期的股票数量，以 $\phi_t$ 表示投入无风险账户的当前资金数额。二者均为 $\mathcal F_t$ 可测。自融资组合满足 $V_t=\phi_t+\Delta_tS_t$，下一期调仓前的价值为 $\phi_tR+\Delta_tS_{t+1}$；用下一期的新组合承接这一价值，不会在节点上注入或抽走资金。

**定理 33.7（多期二叉树的复制与鞅定价）**

对终端收益 $H(S_T)$，多期二叉树存在唯一的自融资复制策略。设终端价值 $V_T=H(S_T)$，并记时刻 $t+1$ 的两个后继价值为 $V_{t+1}^u$ 与 $V_{t+1}^d$，则各节点按

$$
\Delta_t=\frac{V_{t+1}^u-V_{t+1}^d}{(u-d)S_t},\qquad
\phi_t=\frac{uV_{t+1}^d-dV_{t+1}^u}{(u-d)R},\qquad
V_t=\frac{qV_{t+1}^u+(1-q)V_{t+1}^d}{R}
$$

倒向确定。若 $\mathbb Q$ 使各期上涨的条件概率恒为 $q$，且不同期的涨跌相互独立，则初始价格为

$$
\pi_0(H)
=\frac{1}{R^T}\sum_{k=0}^T\binom{T}{k}q^k(1-q)^{T-k}
H\!\left(S_0u^kd^{T-k}\right)
=\mathbb E^{\mathbb Q}\!\left[\frac{H(S_T)}{R^T}\right].
\tag{33.12}
$$

同时，$\{S_t/R^t\}_{t=0}^T$ 与 $\{V_t/R^t\}_{t=0}^T$ 都是 $(\mathbb Q,\{\mathcal F_t\})$ 下的鞅。

**证明**

在时刻 $T-1$ 的任意节点，当前股票价格 $S_{T-1}$ 已知，两个终端收益分别为 $H(uS_{T-1})$ 与 $H(dS_{T-1})$。命题 33.6 给出唯一的单期复制组合，其成本等于 $V_{T-1}$。因此，终端条件与最后一期的倒向公式一致。

采用倒向归纳。设时刻 $t+1$ 的每个节点都已经找到承接后续收益的复制策略，且所需成本为相应的 $V_{t+1}$。在时刻 $t$ 的节点上，按定理中的公式选取 $\phi_t$ 与 $\Delta_t$。与命题 33.6 的证明相同，两式相减并代回可得

$$
\phi_tR+\Delta_tuS_t=V_{t+1}^u,\qquad
\phi_tR+\Delta_tdS_t=V_{t+1}^d.
$$

故无论下一期走到哪个节点，旧组合都准确提供该节点复制策略所需的成本。把各期持有关系连接起来便得到自融资策略，终端收益逐节点等于 $H(S_T)$。该组合在时刻 $t$ 的成本为 $\phi_t+\Delta_tS_t$；重复命题 33.6 中通分与代入 $q$ 的计算，即得定理中的 $V_t$ 递推式。每一步的复制方程都有唯一解，所以整个倒向策略也唯一。
将倒向递推从 $0$ 展开到 $T$，每一项终端收益都乘以其路径的风险中性概率，并除以 $R^T$。在 $\mathbb Q$ 下，$K_T$ 服从参数为 $(T,q)$ 的二项分布；恰有 $k$ 次上涨的路径共有 $\binom{T}{k}$ 条，每条路径概率为 $q^k(1-q)^{T-k}$。这些路径具有相同的终端股票价格，合并后即得式（33.12）。

最后验证鞅性质。由 $qu+(1-q)d=R$，对每个节点都有

$$
\mathbb E^{\mathbb Q}\!\left[\frac{S_{t+1}}{R^{t+1}}\mid\mathcal F_t\right]
=\frac{(qu+(1-q)d)S_t}{R^{t+1}}
=\frac{S_t}{R^t}.
$$

倒向递推则给出

$$
\mathbb E^{\mathbb Q}\!\left[\frac{V_{t+1}}{R^{t+1}}\mid\mathcal F_t\right]
=\frac{qV_{t+1}^u+(1-q)V_{t+1}^d}{R^{t+1}}
=\frac{V_t}{R^t}.
$$

两个过程均适应且取值有限，故均为鞅。对贴现价值鞅反复使用塔性质，并利用 $V_T=H(S_T)$，再次得到 $\pi_0(H)=V_0=\mathbb E^{\mathbb Q}[H(S_T)/R^T]$。

□

倒向公式还揭示了动态对冲的含义：$\Delta_t$ 是价值对相邻节点股票价格的差商，$\phi_t$ 则是保证两个状态都匹配的融资头寸。每过一个日期都按新节点重新计算二者，而不是在初始时刻固定持有到期。风险中性测度把这一系列局部复制计算压缩为一次终端期望，但实际复制策略仍由整棵树上的倒向方程给出。

### 33.2.4 CRR 参数化与 Black–Scholes 极限

若用二叉树逼近连续时间模型，不能在整个期限固定使用同一组与步长无关的参数，而应让每期的价格变化和利率随步数调整。设连续时间期限为 $T$，波动率为 $\sigma>0$，连续复利无风险利率为 $r$，把区间 $[0,T]$ 等分为 $N$ 期。Cox–Ross–Rubinstein 参数化，简称 CRR 参数化，取

$$
h=\frac{T}{N},\qquad
u_N=e^{\sigma\sqrt h},\qquad
d_N=e^{-\sigma\sqrt h},\qquad
R_N=e^{rh},\qquad
q_N=\frac{R_N-d_N}{u_N-d_N}.
\tag{33.13}
$$

此时 $u_Nd_N=1$，上涨后回到原价格的对称结构使树便于重组。指数函数展开给出 $R_N=1+O(h)$，而 $u_N=1+\sigma\sqrt h+O(h)$、$d_N=1-\sigma\sqrt h+O(h)$，故当 $N$ 足够大时 $d_N<R_N<u_N$，每一期均满足无套利条件。

为考察终端分布，令 $K_N$ 为 $N$ 期中的上涨次数，则

$$
\log\frac{S_T^{(N)}}{S_0}
=\sigma\sqrt h\,(2K_N-N),
$$

其中 $K_N$ 在 $\mathbb Q_N$ 下服从参数为 $(N,q_N)$ 的二项分布。由式（33.13）及指数函数展开，风险中性概率满足

$$
q_N=\frac12+\frac{r-\sigma^2/2}{2\sigma}\sqrt h+O(h).
$$
记第 $i$ 期的对数价格增量为 $Y_{N,i}$，它取值 $\sigma\sqrt h$ 或 $-\sigma\sqrt h$。一期均值与方差分别为

$$
\mu_N=\mathbb E^{\mathbb Q_N}[Y_{N,i}]
=(2q_N-1)\sigma\sqrt h
=\left(r-\frac{\sigma^2}{2}\right)h+O(h^{3/2}),
$$

$$
\operatorname{Var}^{\mathbb Q_N}(Y_{N,i})
=4\sigma^2h\,q_N(1-q_N)
=\sigma^2h+O(h^2).
$$

因此 $N\mu_N\to(r-\sigma^2/2)T$，且 $N\operatorname{Var}^{\mathbb Q_N}(Y_{N,i})\to\sigma^2T$。中心化后的单期增量绝对值不超过一个常数乘以 $\sqrt h$，故三角阵列满足 Lyapunov 条件；例如三阶绝对矩之和除以总方差的 $3/2$ 次方趋于零。由 Lindeberg–Feller 中心极限定理，

$$
\log\frac{S_T^{(N)}}{S_0}
\xrightarrow{d}
\left(r-\frac{\sigma^2}{2}\right)T+\sigma\sqrt T\,Z,
\qquad Z\sim N(0,1).
$$

这里出现的均值修正 $-\sigma^2T/2$ 是逐期风险中性概率与价格波动共同作用的结果，并非额外添加的参数。

CRR 二叉树上的衍生品价格为

$$
\pi_0^{(N)}
=R_N^{-N}\mathbb E^{\mathbb Q_N}[H(S_T^{(N)})]
=e^{-rT}\mathbb E^{\mathbb Q_N}[H(S_T^{(N)})].
$$

若 $H$ 有界且连续，分布收敛直接给出期望收敛。对看涨期权等无界收益，还需一致可积性。由于 $q_Nu_N^2+(1-q_N)d_N^2=1+O(h)$，有

$$
\mathbb E^{\mathbb Q_N}[(S_T^{(N)})^2]
=S_0^2\left(q_Nu_N^2+(1-q_N)d_N^2\right)^N
=S_0^2(1+O(h))^N,
$$

右端随 $N\to\infty$ 保持有界。故 $\{S_T^{(N)}\}$ 一致可积，而 $(S_T^{(N)}-K)^+\le S_T^{(N)}$，看涨收益也一致可积。于是二叉树价格收敛到几何布朗运动终端分布下的风险中性贴现期望。看跌期权收益有界，同样的极限成立。

对执行价格为 $K$ 的欧式看涨期权，极限价格为

$$
C_0=e^{-rT}\mathbb E[(S_T-K)^+],
\qquad
S_T=S_0\exp\!\left(\left(r-\frac{\sigma^2}{2}\right)T+\sigma\sqrt T\,Z\right).
$$

令 $m=\log S_0+(r-\sigma^2/2)T$、$v=\sigma^2T$，则 $\log S_T\sim N(m,v)$。在 $\log S_T>\log K$ 的区域上积分，第二项直接给出 $Ke^{-rT}\Phi(d_2)$；第一项利用指数与正态密度配方，得到 $S_0\Phi(d_1)$。
因此极限价格可写成 Black–Scholes 公式

$$
C_0=S_0\Phi(d_1)-Ke^{-rT}\Phi(d_2),\qquad
d_1=\frac{\log(S_0/K)+(r+\sigma^2/2)T}{\sigma\sqrt T},\qquad
d_2=d_1-\sigma\sqrt T.
\tag{33.14}
$$

其中 $\Phi$ 为标准正态分布函数。这里 $d_2$ 来自风险中性测度下 $\log S_T$ 的原均值，$d_1$ 则来自配方后平移了 $v=\sigma^2T$ 的均值；多出的 $\sigma^2T$ 正是 $d_1$ 分子中由 $r-\sigma^2/2$ 变为 $r+\sigma^2/2$ 的原因。

由此，CRR 模型同时提供了离散数值算法与连续极限解释：对固定的有限 $N$，用式（33.12）的倒向复制或二项求和计算价格；当 $N$ 增大时，式（33.13）使风险中性终端分布收敛到对数正态分布，并得到式（33.14）。节点对冲比率 $\Delta_t$ 始终来自相邻节点价值之差与股票价格之差的商，因而离散复制定价、鞅定价和 Black–Scholes 极限在同一推导链条中衔接起来。
为使上述 CRR 极限的论证完整，先明确一致可积性的估计。取常数 $C$，使所有充分大的 $N$ 都满足 $q_Nu_N^2+(1-q_N)d_N^2\le e^{CT/N}$，于是

$$
\sup_N\mathbb E^{\mathbb Q_N}[(S_T^{(N)})^2]
\le S_0^2e^{CT}<\infty.
$$

由 de la Vallée Poussin 判据，$\{S_T^{(N)}\}$ 一致可积；又因 $0\le(S_T^{(N)}-K)^+\le S_T^{(N)}$，看涨期权收益族也一致可积。因此，弱收敛与一致可积性共同保证收益期望收敛，而不只是终端分布的形式极限。

式（33.14）中的两个正态积分可完整写出。沿用 $m=\log S_0+(r-\sigma^2/2)T$ 与 $v=\sigma^2T$，有

$$
C_0=e^{-rT}\int_{\log K}^{\infty}(e^x-K)
\frac{1}{\sqrt v}\varphi\!\left(\frac{x-m}{\sqrt v}\right)\,dx,
$$

其中 $\varphi$ 为标准正态密度。第二个积分等于

$$
Ke^{-rT}\Phi\!\left(\frac{m-\log K}{\sqrt v}\right)
=Ke^{-rT}\Phi(d_2).
$$

对第一个积分使用恒等式

$$
e^x\frac{1}{\sqrt v}\varphi\!\left(\frac{x-m}{\sqrt v}\right)
=e^{m+v/2}\frac{1}{\sqrt v}
\varphi\!\left(\frac{x-m-v}{\sqrt v}\right),
$$

并注意 $e^{-rT+m+v/2}=S_0$，便得到

$$
e^{-rT}\int_{\log K}^{\infty}e^x
\frac{1}{\sqrt v}\varphi\!\left(\frac{x-m}{\sqrt v}\right)\,dx
=S_0\Phi\!\left(\frac{m+v-\log K}{\sqrt v}\right)
=S_0\Phi(d_1).
$$

代回 $m$ 与 $v$ 即严格得到式（33.14），从而完成了由多期倒向复制、风险中性极限到 Black–Scholes 公式的推导。
## 33.3 完备市场与唯一性

二叉树中，每个节点上的两个基本证券足以匹配两个后继状态上的收益，因此倒向复制始终可行。一般市场未必具有这种逐节点匹配能力。本节在有限离散时间模型中刻画这一差别：设 $\Omega$ 有限，每个状态在 $\mathbb P$ 下都有正概率，交易时刻为 $t=0,1,\ldots,T$，信息流为 $(\mathcal F_t)_{t=0}^T$。货币市场账户 $B_t>0$ 为确定性过程，$d$ 种风险资产的贴现价格组成适应过程 $\tilde{\boldsymbol S}_t=\boldsymbol S_t/B_t$。交易策略 $(\boldsymbol\theta_t)_{t=1}^T$ 可料，其贴现收益记为

$$
\tilde G_T(\boldsymbol\theta)
=\sum_{t=1}^T\boldsymbol\theta_t^\top
(\tilde{\boldsymbol S}_t-\tilde{\boldsymbol S}_{t-1}),
$$

所有此类收益组成线性空间 $\mathcal G$。这里的 $\boldsymbol\theta_t$ 只表示风险资产持仓，货币市场账户持仓由自融资条件确定。

**定义 33.8（完备市场）**

对到期收益 $H$，记 $\tilde H=H/B_T$。若存在实数 $x$ 和自融资策略 $\boldsymbol\theta$，使得

$$
\tilde H=x+\tilde G_T(\boldsymbol\theta)
\tag{33.15}
$$

对每个 $\omega\in\Omega$ 都成立，则称 $H$ 可由交易资产复制，$x$ 为其复制成本。若每个 $\mathcal F_T$ 可测的到期收益都可复制，则称该市场为完备市场；否则称为不完全市场。

式（33.15）的右端是初始资本 $x$ 经自融资交易后的贴现终值，所以复制不仅是终端数值相等，也规定了实现该收益所需的全部动态交易。无套利条件下，可复制收益的价格只能等于 $x$；任何偏离都可通过买入较便宜一方、卖出较昂贵一方构造套利。
**定理 33.9（完备性与风险中性测度唯一性）**

在上述有限市场中，设市场无套利，并令 $\mathcal Q$ 为所有与 $\mathbb P$ 等价且使每个 $\tilde{\boldsymbol S}_t$ 成为鞅的风险中性测度所成的集合。则市场完备当且仅当 $\mathcal Q$ 只含一个测度。等价地，每个 $\mathcal F_T$ 可测收益都能由自融资策略复制，当且仅当风险中性测度唯一。

**证明**

证明的核心是把全部可复制收益看作有限维线性子空间：完备性使不同测度在该空间上给出相同价格；若该空间真小于全体随机变量空间，则可从其正交补构造另一个风险中性测度。以下分别证明两个方向。

先设市场完备。任取 $Q_1,Q_2\in\mathcal Q$ 和事件 $A\in\mathcal F_T$。收益 $B_T\mathbf 1_A$ 可复制，故存在 $x\in\mathbb R$ 与策略 $\boldsymbol\theta$，使 $\mathbf 1_A=x+\tilde G_T(\boldsymbol\theta)$。对每个 $t$ 和每个 $Q\in\mathcal Q$，可料性与鞅增量性质给出

$$
\mathbb E^Q[\boldsymbol\theta_t^\top
(\tilde{\boldsymbol S}_t-\tilde{\boldsymbol S}_{t-1})\mid\mathcal F_{t-1}]
=\boldsymbol\theta_t^\top
\mathbb E^Q[\tilde{\boldsymbol S}_t-\tilde{\boldsymbol S}_{t-1}\mid\mathcal F_{t-1}]
=0.
$$

逐层取期望得 $\mathbb E^Q[\tilde G_T(\boldsymbol\theta)]=0$，因而

$$
Q_1(A)=x=Q_2(A).
$$

由于 $A$ 任意，$Q_1=Q_2$，所以 $\mathcal Q$ 至多含一个测度；无套利假设又保证其非空，故它恰为单点集。

反之，设市场不完全。由无套利性可取定 $Q\in\mathcal Q$，并在 $L^2(Q)$ 上使用内积 $\langle X,Y\rangle_Q=\mathbb E^Q[XY]$。令

$$
\mathcal A=\{c+G:c\in\mathbb R,\ G\in\mathcal G\}.
$$

$\mathcal A$ 恰为全体可复制收益的贴现终端值，因此不完全性意味着 $\mathcal A$ 是 $L^2(Q)$ 的真线性子空间。于是存在非零的 $Z\in\mathcal A^\perp$，它同时满足 $\mathbb E^Q[Z]=0$ 与 $\mathbb E^Q[ZG]=0$ 对所有 $G\in\mathcal G$ 成立。
因为 $\Omega$ 有限，$Z$ 有界且 $\|Z\|_\infty>0$。任取 $0<\varepsilon<1/\|Z\|_\infty$，定义测度 $Q_\varepsilon$ 为

$$
\frac{dQ_\varepsilon}{dQ}=1+\varepsilon Z.
$$

右端严格为正，且 $\mathbb E^Q[1+\varepsilon Z]=1$，故 $Q_\varepsilon$ 是与 $Q$ 等价的概率测度，因而也与 $\mathbb P$ 等价。又因 $Z$ 非零，$Q_\varepsilon\ne Q$。

下面验证 $Q_\varepsilon$ 保持全部贴现资产价格的鞅性。固定资产 $j$、时刻 $t<T$ 以及 $A\in\mathcal F_t$，写 $\Delta\tilde S_{t+1}^{(j)}=\tilde S_{t+1}^{(j)}-\tilde S_t^{(j)}$。构造策略：在 $A$ 上且仅在从 $t$ 到 $t+1$ 的区间持有一股资产 $j$，其余资金均置于货币市场账户，随后平仓。这是可料自融资策略，其贴现收益为 $\mathbf 1_A\Delta\tilde S_{t+1}^{(j)}$。由 $Z$ 与 $\mathcal G$ 的正交性以及 $Q$ 下的鞅性，

$$
\begin{aligned}
\mathbb E^{Q_\varepsilon}[\mathbf 1_A\Delta\tilde S_{t+1}^{(j)}]
&=\mathbb E^Q[\mathbf 1_A\Delta\tilde S_{t+1}^{(j)}]
+\varepsilon\mathbb E^Q[Z\mathbf 1_A\Delta\tilde S_{t+1}^{(j)}]\\
&=0.
\end{aligned}
$$

由于 $A\in\mathcal F_t$ 任意，这正说明

$$
\mathbb E^{Q_\varepsilon}[\tilde S_{t+1}^{(j)}\mid\mathcal F_t]
=\tilde S_t^{(j)}.
$$

对全部 $j$ 与 $t$ 成立，故 $Q_\varepsilon\in\mathcal Q$，与风险中性测度唯一矛盾。因此，若 $\mathcal Q$ 为单点集，则市场必须完备。

□

这一定理也解释了二叉树定价为何没有测度选择上的任意性：唯一风险中性测度不是外加的偏好假设，而是全部收益均可复制在无套利条件下的等价表现。在不完全市场中，同一收益可在不同 $Q$ 下产生不同的贴现期望，单一测度定出的价格通常只是众多无套利价格之一。
对不可复制收益，应以全部风险中性测度共同确定定价区间。定义下、上价格界为

$$
\begin{aligned}
\underline\pi(H)
&=\inf_{Q\in\mathcal Q}\mathbb E^Q[\tilde H]
=\sup\{x:\exists\boldsymbol\theta,\ x+\tilde G_T(\boldsymbol\theta)\le\tilde H\},\\
\overline\pi(H)
&=\sup_{Q\in\mathcal Q}\mathbb E^Q[\tilde H]
=\inf\{x:\exists\boldsymbol\theta,\ x+\tilde G_T(\boldsymbol\theta)\ge\tilde H\}.
\end{aligned}
\tag{33.16}
$$

第二行的上确界遍历所有子复制成本，第三行的下确界遍历所有超复制成本。这些等式可由有限状态线性规划的强对偶得到；其中所需的不等式方向可直接验证。若 $x+\tilde G_T(\boldsymbol\theta)\le\tilde H$，对任意 $Q\in\mathcal Q$ 取期望便有 $x\le\mathbb E^Q[\tilde H]$；超复制则给出反向不等式。强对偶排除两端之间的对偶间隙。

若初始价格低于 $\underline\pi(H)$，买入收益并卖空一个成本更高的子复制组合，可在到期日保留非负仓位并取得严格正的无风险收益；高于 $\overline\pi(H)$ 时，卖空收益并买入超复制组合同样产生套利。反之，$\mathcal Q$ 是凸集，而 $Q\mapsto\mathbb E^Q[\tilde H]$ 为线性映射，所以两个界之间的每个数都可由某个风险中性测度实现，并把该测度用于扩展市场即可排除套利。

因此，对不可复制的 $H$，全部无套利初始价格恰为

$$
\underline\pi(H)<\pi_0(H)<\overline\pi(H),
$$

其闭包是由式（33.16）确定的定价区间。端点不属于无套利价格：有限维子复制与超复制问题在端点存在最优策略，而不可复制性使相应终端不等式至少在一个正概率状态上严格成立，从而在端点价格处形成套利。若 $H$ 可复制，则所有 $\mathbb E^Q[\tilde H]$ 都等于复制成本，定价区间退化为一个点。由此，不完全性导致的是有明确上下界的价格集合，而不是价格可以任意指定。
**例 33.3**

考虑一期三状态市场，利率为零，故 $B_0=B_1=1$。股票当前价格为 $S_0=10$，在三个状态 $\omega_1,\omega_2,\omega_3$ 下的终端价格依次为 $15,10,8$。现有执行价格 $K=12$ 的欧式看涨期权，其收益为 $H=(S_1-12)^+$，在三个状态下依次为 $3,0,0$。求该期权的无套利定价区间。

**解**

先检验复制可能性。设组合持有 $a$ 股股票并投资 $b$ 元于货币市场账户，则复制要求

$$
15a+b=3,\qquad 10a+b=0,\qquad 8a+b=0.
$$

后两式相减得 $2a=0$，于是 $a=0$，继而 $b=0$，与第一式矛盾。因此该期权不可复制，市场不完全。

接着求全部风险中性测度。令 $q_i=Q(\{\omega_i\})$，等价性要求 $q_i>0$，而概率归一化与股票贴现价格的鞅条件分别为

$$
q_1+q_2+q_3=1,\qquad
15q_1+10q_2+8q_3=10.
$$

以第一式消去 $q_2$，第二式化为 $5q_1-2q_3=0$。结合三个概率的严格正性，全部解可参数化为

$$
q_3=\frac52q_1,\qquad
q_2=1-\frac72q_1,\qquad
0<q_1<\frac27,\qquad
\mathbb E^Q[H]=3q_1.
\tag{33.17}
$$

事实上，$q_1>0$ 保证 $q_3>0$，而 $q_2>0$ 恰等价于 $q_1<2/7$。因此风险中性测度构成一个开线段，期权风险中性价格 $3q_1$ 随 $q_1$ 严格递增。
由式（33.16）与式（33.17），下界是 $q_1\to0$ 时的极限，上界是 $q_1\to2/7$ 时的极限，故

$$
\underline\pi(H)=0,\qquad
\overline\pi(H)=\frac67,\qquad
\mathcal I(H)=\left(0,\frac67\right).
\tag{33.18}
$$

再用复制组合核验上界。取 $a=3/7$、$b=-24/7$，其初始成本为

$$
10a+b=\frac{30}{7}-\frac{24}{7}=\frac67,
$$

终端收益在三个状态下依次为

$$
\left(3,\frac67,0\right)\ge(3,0,0).
$$

所以 $6/7$ 确为超复制价格上界。若期权也以 $6/7$ 交易，卖空期权并买入该组合的初始净成本为零，终端净收益为 $(0,6/7,0)$，构成套利。若期权价格为零，直接买入期权即以零成本得到 $(3,0,0)$，同样构成套利，故下端点也被排除。

最后，对任意 $0<\pi_0<6/7$，在式（33.17）中取 $q_1=\pi_0/3$，便有 $q_2>0$、$q_3>0$ 且 $\mathbb E^Q[H]=\pi_0$。该 $Q$ 同时给原始股票和期权定价，故扩展市场无套利。因此该不完备市场的全部无套利价格精确地为 $0<\pi_0<6/7$，而非仅仅是两个风险中性价格之间的粗略估计。

## 33.4 连续时间定价框架

第 13 章建立的条件期望、第 27 章建立的测度变换，以及本章前三节的离散时间无套利原则，在连续时间中由自融资财富过程统一起来。本节固定有限期限 $T>0$，在带通常条件的滤子概率空间 $(\Omega,\mathcal F,\{\mathcal F_t\}_{0\le t\le T},\mathbb P)$ 上讨论，其中 $\mathcal F_0$ 为平凡 $\sigma$-代数，$\boldsymbol W$ 是 $d$ 维 $\mathbb P$-布朗运动。所有过程均取可测版本，随机积分均按第 27 章的意义定义。

### 33.4.1 自融资策略与财富过程

设市场含一个银行账户和 $n$ 种风险资产。银行利率 $r_t$、风险资产漂移向量 $\boldsymbol\mu_t$ 与波动率矩阵 $\boldsymbol\sigma_t$ 均为可料过程，并满足相应的局部可积条件。记 $\boldsymbol S_t=(S_t^1,\ldots,S_t^n)^\top$，其动态为

$$
dB_t=r_tB_t\,dt,\qquad B_0=1,\qquad
d\boldsymbol S_t=\operatorname{diag}(\boldsymbol S_t)
\left(\boldsymbol\mu_t\,dt+\boldsymbol\sigma_t\,d\boldsymbol W_t\right).
\tag{33.19}
$$

因此 $B_t=\exp(\int_0^t r_s\,ds)$。策略写为 $(\eta_t,\boldsymbol\pi_t)$，其中 $\eta_t$ 是银行账户的单位数，$\boldsymbol\pi_t$ 的各分量是风险资产的持有单位数。财富为 $V_t=\eta_tB_t+\boldsymbol\pi_t^\top\boldsymbol S_t$。策略可料且对相应半鞅可积时，交易收益由 $\eta_t\,dB_t+\boldsymbol\pi_t^\top\,d\boldsymbol S_t$ 描述。

**定义 33.10（自融资策略与可容许策略）**

若策略 $(\eta,\boldsymbol\pi)$ 在 $[0,T]$ 上满足

$$
V_t=V_0+\int_0^t\eta_u\,dB_u+
\int_0^t\boldsymbol\pi_u^\top\,d\boldsymbol S_u,
\qquad
V_t=\eta_tB_t+\boldsymbol\pi_u^\top\boldsymbol S_t,
\tag{33.20}
$$

其中第二个等式中的下标均取 $t$，则称其为自融资策略。等价地，$dV_t=\eta_t\,dB_t+\boldsymbol\pi_t^\top\,d\boldsymbol S_t$，即财富变化只能来自持仓资产的损益，不能来自外部注资或提款。

在给定风险中性测度 $Q$ 后，若策略可积且贴现财富在 $Q$ 下有常数下界，则称其为下界可容许策略；若贴现财富还是真正的 $Q$-鞅，则称其为鞅可容许策略。下界条件排除依靠不断加杠杆并推迟亏损实现的加倍策略，鞅条件则保证终端定价可以无条件地取条件期望。下文的无套利论证只要求下界可容许性，而可复制索取权的精确定价使用鞅可容许性。

由财富恒等式可消去银行持仓，得到 $\eta_t=(V_t-\boldsymbol\pi_t^\top\boldsymbol S_t)/B_t$。代入式（33.20），财富也可只由初始资本与风险资产持仓表示：
财富恒等式在一切时点均写为 $V_t=\eta_tB_t+\boldsymbol\pi_t^\top\boldsymbol S_t$。将 $\eta_t$ 的表达式代入自融资条件，可得

$$
dV_t=r_tV_t\,dt+
\boldsymbol\pi_t^\top\left(d\boldsymbol S_t-r_t\boldsymbol S_t\,dt\right).
$$

这一形式说明，银行持仓并非额外的独立收益来源；给定 $V_0$ 与 $\boldsymbol\pi$ 后，它由财富恒等式唯一确定。反之，若可料过程 $\boldsymbol\pi$ 使上述财富方程有解，再令 $\eta_t=(V_t-\boldsymbol\pi_t^\top\boldsymbol S_t)/B_t$，则 $dV_t-\boldsymbol\pi_t^\top\,d\boldsymbol S_t$ 等于 $r_t(V_t-\boldsymbol\pi_t^\top\boldsymbol S_t)\,dt=\eta_t\,dB_t$，故所得策略自融资。两种表述因此完全等价。

定义贴现过程及贴现价格

$$
D_t=\exp\left(-\int_0^t r_s\,ds\right)=\frac1{B_t},
\qquad
\widetilde{\boldsymbol S}_t=D_t\boldsymbol S_t,
\qquad
\widetilde V_t=D_tV_t.
\tag{33.21}
$$

由于 $D$ 是有限变差过程且 $dD_t=-r_tD_t\,dt$，它与任何半鞅的二次协变差均为零。这一性质使下面的分部积分不含额外的二次变差项。

### 33.4.2 贴现过程与鞅性质

**定理 33.11（自融资财富的贴现鞅性质）**

设 $Q$ 与 $\mathbb P$ 等价，且每种风险资产的贴现价格 $\widetilde{\boldsymbol S}$ 都是 $Q$-局部鞅。则任意自融资策略的贴现财富满足

$$
\widetilde V_t=V_0+\int_0^t\boldsymbol\pi_u^\top\,d\widetilde{\boldsymbol S}_u,
\qquad 0\le t\le T,
\tag{33.22}
$$

因而是 $Q$-局部鞅。若该策略下界可容许，则其贴现财富是 $Q$-上鞅；若它鞅可容许，则其贴现财富按定义是真正的 $Q$-鞅。

**证明**

对 $\widetilde V_t=D_tV_t$ 使用分部积分。由 $D$ 有限变差、自融资条件和 $dB_t=r_tB_t\,dt$，有

$$
\begin{aligned}
d\widetilde V_t
&=D_t\,dV_t+V_t\,dD_t\\
&=D_t\eta_t\,dB_t+D_t\boldsymbol\pi_t^\top\,d\boldsymbol S_t
-r_tD_tV_t\,dt\\
&=D_t\boldsymbol\pi_t^\top
\left(d\boldsymbol S_t-r_t\boldsymbol S_t\,dt\right)
+D_t\eta_t\,dB_t-r_tD_t\eta_tB_t\,dt\\
&=D_t\boldsymbol\pi_t^\top
\left(d\boldsymbol S_t-r_t\boldsymbol S_t\,dt\right).
\end{aligned}
$$

另一方面，再对 $\widetilde{\boldsymbol S}_t=D_t\boldsymbol S_t$ 使用分部积分，得到 $d\widetilde{\boldsymbol S}_t=D_t(d\boldsymbol S_t-r_t\boldsymbol S_t\,dt)$。将此式代入上一等式并从 $0$ 积分到 $t$，即得式（33.22）。可料策略的可积性保证右侧是关于 $Q$-局部鞅的随机积分，故 $\widetilde V$ 是 $Q$-局部鞅。
再证明有常数下界的局部鞅是上鞅。取局部化停时列 $\tau_k\uparrow T$，使每个停止过程 $X_t^{(k)}=X_{t\wedge\tau_k}$ 都是真正的 $Q$-鞅，并设 $X_t\ge-M$。对 $s<t$，停止定理给出

$$
\mathbb E^Q[X_{t\wedge\tau_k}\mid\mathcal F_s]
=X_{s\wedge\tau_k}
$$

几乎必然成立。因为 $X_{t\wedge\tau_k}+M\ge0$，且对固定的 $s<T$，当 $k$ 足够大时 $X_{s\wedge\tau_k}=X_s$，所以由条件期望的 Fatou 引理，

$$
\begin{aligned}
\mathbb E^Q[X_t+M\mid\mathcal F_s]
&\le\liminf_{k\to\infty}
\mathbb E^Q[X_{t\wedge\tau_k}+M\mid\mathcal F_s]\\
&=\liminf_{k\to\infty}(X_{s\wedge\tau_k}+M)
=X_s+M
\end{aligned}
$$

几乎必然成立。$t=T$ 时同样的极限论证仍然有效。特别地，$\mathbb E^Q[X_t]\le X_0$；结合 $X_t\ge-M$，有 $\mathbb E^Q[X_t^+]\le X_0+M$，故 $X_t$ 可积。于是 $\mathbb E^Q[X_t\mid\mathcal F_s]\le X_s$，即 $X$ 是 $Q$-上鞅。最后一项结论来自鞅可容许性的定义。

这一结论直接排除了连续时间中的套利。若某个下界可容许策略满足 $V_0=0$，且 $V_T\ge0$ 几乎必然成立，那么 $\widetilde V_T\ge0$，而贴现财富的上鞅性给出 $\mathbb E^Q[\widetilde V_T]\le V_0=0$。非负随机变量的期望非正，只能有 $\widetilde V_T=0$ 几乎必然成立；因 $D_T>0$，故 $V_T=0$ 几乎必然成立。若该策略在 $\mathbb P$ 下以正概率获得严格正收益，则等价测度 $Q$ 也赋予该事件正概率，从而 $\mathbb E^Q[\widetilde V_T]>0$，形成矛盾。因此不存在“零初始成本、终端不亏且以正概率盈利”的下界可容许策略。

这里不能把局部鞅条件省略为单纯的测度等价，也不能去掉可容许性而仍声称排除一切套利。测度等价只保留正概率事件，局部鞅性只提供局部化后的鞅等式；二者与下界条件结合，才使上述期望论证成立。

### 33.4.3 条件期望形式的风险中性定价

**定理 33.12（可复制索取权的风险中性定价）**

设 $Q$ 与 $\mathbb P$ 等价，$D_T H\in L^1(Q)$，且 $\mathcal F_T$-可测的终端索取权 $H$ 能由某个鞅可容许自融资策略复制，即其财富满足 $V_T=H$ 几乎必然成立。则复制财富在任意 $t\in[0,T]$ 必为

$$
V_t=\frac1{D_t}\mathbb E^Q\!\left[D_T H\mid\mathcal F_t\right]
$$

几乎必然成立。特别地，在 $\mathcal F_0$ 平凡时，初始无套利价格为

$$
V_0=\mathbb E^Q[D_T H].
\tag{33.23}
$$

同一索取权的任意两个鞅可容许复制策略具有相同的财富过程，因而具有相同的初始成本。

**证明**
由鞅可容许性，$\widetilde V$ 是真正的 $Q$-鞅。复制条件给出 $\widetilde V_T=D_TV_TH=D_TH$，其中 $V_T=H$ 几乎必然成立。因此鞅等式与第 13 章条件期望的定义共同给出

$$
D_tV_t=\widetilde V_t
=\mathbb E^Q[\widetilde V_T\mid\mathcal F_t]
=\mathbb E^Q[D_TH\mid\mathcal F_t]
$$

几乎必然成立。$D_t>0$ 且 $D_t$ 为 $\mathcal F_t$-可测，两边同除以 $D_t$ 即得定理中的财富公式。令 $t=0$，利用 $\mathcal F_0$ 的平凡性，条件期望退化为常数期望，得到初始价格。

若另一个鞅可容许策略也复制 $H$，其贴现财富 $\widetilde U$ 同样满足 $\widetilde U_T=D_TH$。对 $\widetilde U$ 重复上述推导，便有

$$
D_tU_t=\mathbb E^Q[D_TH\mid\mathcal F_t]=D_tV_t
$$

几乎必然成立，故 $U_t=V_t$。由于每个过程都有连续路径，两个财富过程还在共同的一个零概率集之外对所有 $t$ 同时相等。取 $t=0$ 即知初始复制成本唯一。定理得证。

□

式（33.23）不是对任意概率测度都成立的计算技巧。其成立同时依赖于测度等价、贴现资产在 $Q$ 下的鞅性质、复制关系以及可积性和可容许性。第 13 章的塔性质还保证价格的时间一致性：对 $s\le t$，将 $D_tV_t=\mathbb E^Q[D_TH\mid\mathcal F_t]$ 再对 $\mathcal F_s$ 取条件期望，即得 $D_sV_s=\mathbb E^Q[D_tV_t\mid\mathcal F_s]$。

若市场不完全且 $H$ 不可复制，单一等式 $V_T=H$ 不再可用，某个特定 $Q$ 下的条件期望通常只对应扩展市场的一种定价选择，不能自动称为唯一无套利价格。不同等价鞅测度可能给出不同数值，此时仍需结合超复制、次复制和可容许策略类别确定无套利价格区间；这与式（33.16）至式（33.18）的离散市场结论一致。

### 33.4.4 Girsanov 测度变换的作用

风险中性测度并非凭空指定，它可通过改变布朗运动的漂移来构造。以下定理说明，市场漂移与利率之差恰好决定所需的漂移校正。

**定理 33.13（市场价格的 Girsanov 构造）**

设存在可料过程 $\boldsymbol\theta_t$，使市场漂移方程 $\boldsymbol\sigma_t\boldsymbol\theta_t=\boldsymbol\mu_t-r_t\mathbf1$ 成立，并且 $\boldsymbol\theta$ 满足 Novikov 条件

$$
\mathbb E^{\mathbb P}\!\left[
\exp\left(\frac12\int_0^T\|\boldsymbol\theta_s\|^2\,ds\right)
\right]<\infty.
$$

定义密度过程与漂移校正过程

$$
\begin{aligned}
Z_t&=\exp\left(-\int_0^t\boldsymbol\theta_s^\top\,d\boldsymbol W_s
-\frac12\int_0^t\|\boldsymbol\theta_s\|^2\,ds\right),\\
\boldsymbol W_t^Q&=\boldsymbol W_t+\int_0^t\boldsymbol\theta_s\,ds,
\qquad
\boldsymbol\sigma_t\boldsymbol\theta_t=\boldsymbol\mu_t-r_t\mathbf1.
\end{aligned}
\tag{33.24}
$$

令 $dQ/d\mathbb P|_{\mathcal F_T}=Z_T$。则 $Q$ 是与 $\mathbb P$ 等价的概率测度，$\boldsymbol W^Q$ 是 $Q$-布朗运动，且贴现风险资产价格是 $Q$-局部鞅；在相应的随机积分可积条件下，它们是真正的 $Q$-鞅。

**证明**
先计算密度过程。令 $Y_t=-\int_0^t\boldsymbol\theta_s^\top\,d\boldsymbol W_s-\frac12\int_0^t\|\boldsymbol\theta_s\|^2ds$，则 $Z_t=e^{Y_t}$ 且 $[Y]_t=\int_0^t\|\boldsymbol\theta_s\|^2ds$。Itô 公式给出

$$
dZ_t=Z_t\left(dY_t+\frac12d[Y]_t\right)
=-Z_t\boldsymbol\theta_t^\top\,d\boldsymbol W_t,
\qquad Z_0=1.
$$

Novikov 条件保证这个随机指数是真正的 $\mathbb P$-鞅，而不是仅为局部鞅，因此 $\mathbb E^{\mathbb P}[Z_T]=Z_0=1$。所以 $Q$ 的总质量为一。又因 $Z_T>0$ 几乎必然成立，$Q$ 与 $\mathbb P$ 等价，且在 $\mathcal F_t$ 上的密度为 $Z_t=\mathbb E^{\mathbb P}[Z_T\mid\mathcal F_t]$。第 27 章的 Girsanov 定理因而适用，并直接给出 $\boldsymbol W^Q$ 是 $d$ 维 $Q$-布朗运动。

由 $d\boldsymbol W_t=d\boldsymbol W_t^Q-\boldsymbol\theta_t\,dt$，将原价格动态改写为

$$
\begin{aligned}
d\boldsymbol S_t
&=\operatorname{diag}(\boldsymbol S_t)
\left[(\boldsymbol\mu_t-\boldsymbol\sigma_t\boldsymbol\theta_t)\,dt
+\boldsymbol\sigma_t\,d\boldsymbol W_t^Q\right]\\
&=\operatorname{diag}(\boldsymbol S_t)
\left[r_t\mathbf1\,dt+\boldsymbol\sigma_t\,d\boldsymbol W_t^Q\right].
\end{aligned}
$$

这里使用了漂移方程 $\boldsymbol\mu_t-\boldsymbol\sigma_t\boldsymbol\theta_t=r_t\mathbf1$。再由定理 33.11 证明中的分部积分计算，

$$
d\widetilde{\boldsymbol S}_t
=D_t\operatorname{diag}(\boldsymbol S_t)\boldsymbol\sigma_t
\,d\boldsymbol W_t^Q.
$$

右侧没有漂移项，所以每个分量都是关于 $Q$-布朗运动的随机积分，从而是 $Q$-局部鞅。若进一步有

$$
\mathbb E^Q\!\left[\int_0^T
\left\|D_t\operatorname{diag}(\boldsymbol S_t)\boldsymbol\sigma_t\right\|^2dt
\right]<\infty,
$$

则各分量均为平方可积的真正 $Q$-鞅；更一般地，只要相应停止过程族一致可积，也可得到真正鞅性。定理的全部结论由此成立。

□

漂移方程的可解性与市场结构直接相关。若 $\boldsymbol\sigma_t$ 几乎必然具有满行秩，则一个自然选择是 $\boldsymbol\theta_t=\boldsymbol\sigma_t^\top(\boldsymbol\sigma_t\boldsymbol\sigma_t^\top)^{-1}(\boldsymbol\mu_t-r_t\mathbf1)$；此时还须单独核验 Novikov 条件或其他随机指数鞅条件。若漂移方程无解，上述构造无法消除风险资产的超额漂移，不能据此声称该测度下不存在套利。若解不唯一，不同解可能产生不同风险中性测度，这正是连续时间市场不完全的一种来源。

Novikov 条件只是充分条件。它不成立并不自动意味着不存在等价鞅测度；同样，得到贴现价格的局部鞅性也不自动意味着所有无下界策略都被排除。定价时必须明确所采用的策略空间，并核验复制策略是否鞅可容许，否则形式上正确的条件期望可能对应一个无法以容许交易实现的财富过程。
### 33.4.5 可容许策略的核验与定价公式的使用

在随机利率情形，$D_T$ 一般不是 $\mathcal F_t$-可测随机变量，不能把它直接移到关于 $\mathcal F_t$ 的条件期望之外。由于 $D_T/D_t=\exp(-\int_t^T r_s\,ds)$，式（33.23）的财富公式等价于

$$
V_t=\mathbb E^Q\!\left[
\exp\left(-\int_t^T r_s\,ds\right)H\,\mid\,\mathcal F_t
\right].
$$

只有 $D_t$ 可以移到条件期望之外，因为它是 $\mathcal F_t$-可测的。若利率是确定性函数，则贴现因子进一步成为 $\exp(-\int_t^T r_s\,ds)$ 与条件期望的乘积；若利率恒为常数 $r$，该因子就是 $e^{-r(T-t)}$。这些化简都来自同一条件期望公式，而不是对终端收益另作独立假设。

鞅可容许性可以通过随机积分的可积条件直接核验。在定理 33.13 的条件下，若风险资产持仓满足

$$
\mathbb E^Q\!\left[\int_0^T
\left\|\boldsymbol\pi_t^\top D_t
\operatorname{diag}(\boldsymbol S_t)\boldsymbol\sigma_t\right\|^2dt
\right]<\infty,
$$

则式（33.22）的随机积分是平方可积 $Q$-鞅。其从 $0$ 到 $T$ 的停止过程族一致可积，故只要初始财富有限，贴现财富就是鞅可容许的。若只掌握较弱的局部可积条件，则至少得到局部鞅；再添加常数下界，仍可使用定理 33.11 的上鞅结论排除套利，但不能把可能严格的上鞅不等式擅自改成定价等式。

这一区分并非纯粹技术上的修饰。连续时间中，若允许财富在任意有限时刻无限制地为负，就可能通过不断调整仓位把中间亏损推迟到终止时刻之外，形成加倍型套利。下界可容许性使 Fatou 引理能够作用于 $X_t+M$，正是它切断了这种论证。另一方面，若最终目的是用终端收益计算每一时刻的复制财富，仅有下界还不够，因为上鞅只能给出不等式；此时应验证一致可积性、平方可积随机积分条件，或直接验证复制组合的贴现财富为真正鞅。

此外，$Q$ 与 $\mathbb P$ 等价并不意味着二者给出相同的期望。等价性只保证它们具有相同的零概率事件，密度 $Z_T$ 会重新分配不同路径的概率。$D_TH\in L^1(Q)$ 是风险中性条件期望存在的直接条件，不能未经论证就替换为 $D_TH\in L^1(\mathbb P)$。真实测度下的漂移 $\boldsymbol\mu$ 决定路径在 $\mathbb P$ 下的分布，而风险中性定价通过 Girsanov 密度把它转化为漂移方程；二者各司其职。

定理 33.11 的证明至此已包含局部鞅构造、下界可容许时的条件 Fatou 论证、逐时点的可积性验证，以及鞅可容许时的真正鞅结论；上述积分判据进一步说明这些假设如何在具体模型中逐项落实。

□

**例 33.4**

考虑一种股票和一个银行账户的常系数市场，其中 $r$、$\mu$、$\sigma$ 均为常数，$\sigma\ne0$，且

$$
dB_t=rB_t\,dt,\qquad
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t.
$$

用 Girsanov 测度变换求风险中性动态，并对终端收益 $H=S_T-K$ 求 $t$ 时刻的复制价格，其中 $K$ 为常数；同时构造具体的鞅可容许复制策略。

**解**

取常数 $\theta=(\mu-r)/\sigma$。因为 $\theta$ 有界，

$$
\mathbb E^{\mathbb P}\!\left[\exp\left(\frac12\int_0^T\theta^2\,dt\right)\right]
=\exp\left(\frac{\theta^2T}{2}\right)<\infty,
$$

所以 Novikov 条件成立。式（33.24）给出 $Z_T=\exp(-\theta W_T-\theta^2T/2)$，并定义等价测度 $Q$。在 $Q$ 下，$W_t^Q=W_t+\theta t$ 是布朗运动。由 $\mu-\sigma\theta=r$，股票动态化为

$$
dS_t=rS_t\,dt+\sigma S_t\,dW_t^Q.
$$
对 $\log S_t$ 使用 Itô 公式。二次变差项为 $\sigma^2S_t^2\,dt$，故

$$
d\log S_t=\frac{dS_t}{S_t}-\frac12\frac{d[S]_t}{S_t^2}
=\left(r-\frac{\sigma^2}{2}\right)dt+\sigma\,dW_t^Q.
$$

从 $t$ 积分到 $T$，并记 $\tau=T-t$，得到

$$
S_T=S_t\exp\left[\left(r-\frac{\sigma^2}{2}\right)\tau
+\sigma(W_T^Q-W_t^Q)\right].
$$

在 $Q$ 下，$W_T^Q-W_t^Q$ 独立于 $\mathcal F_t$，且服从均值为零、方差为 $\tau$ 的正态分布；$S_t$ 则为 $\mathcal F_t$-可测。正态矩母函数给出

$$
\mathbb E^Q\!\left[e^{\sigma(W_T^Q-W_t^Q)}\mid\mathcal F_t\right]
=e^{\sigma^2\tau/2}
$$

几乎必然成立，因此

$$
\mathbb E^Q[S_T\mid\mathcal F_t]
=S_t\exp\left[\left(r-\frac{\sigma^2}{2}\right)\tau\right]
e^{\sigma^2\tau/2}=S_te^{r\tau}.
$$

这里 $\tau=T-t$，并且所有条件期望等式均几乎必然成立。

由于 $D_t=e^{-rt}$，定理 33.12 给出

$$
\begin{aligned}
V_t
&=e^{-r\tau}\mathbb E^Q[S_T-K\mid\mathcal F_t]\\
&=e^{-r\tau}\left(S_te^{r\tau}-K\right)
=S_t-Ke^{-r(T-t)}.
\end{aligned}
$$

特别地，初始价格为 $V_0=S_0-Ke^{-rT}$。贴现终端收益 $D_T(S_T-K)$ 的各分量均具有有限的 $Q$-期望，因为常系数对数正态随机变量具有有限的一阶矩，所以定理 33.12 的可积性假设确实成立。

下面构造复制组合。始终持有一股股票，即 $\pi_t=1$，并持有 $\eta_t=-Ke^{-rT}$ 个银行账户单位。该组合的银行头寸在 $t$ 时刻的价值为

$$
\eta_tB_t=-Ke^{-rT}e^{rt}=-Ke^{-r(T-t)},
$$

故其总财富恰为 $S_t-Ke^{-r(T-t)}=V_t$，终端财富为 $V_T=S_T-K$。由于股票和银行账户的持仓单位数均不随时间改变，策略没有外部注资或提款，其财富微分为

$$
dV_t=dS_t-Ke^{-rT}\,dB_t
=dS_t-rKe^{-r(T-t)}\,dt,
$$

这与直接对 $S_t-Ke^{-r(T-t)}$ 求微分完全一致，因此自融资条件成立。
最后核验可容许性。由股票的显式解，

$$
e^{-rt}S_t=S_0\exp\left(\sigma W_t^Q-\frac{\sigma^2t}{2}\right),
$$

故贴现财富可写成

$$
\widetilde V_t=e^{-rt}S_t-Ke^{-rT}
=V_0+\int_0^t\sigma e^{-ru}S_u\,dW_u^Q.
$$

这正是式（33.22）在 $\pi_t=1$ 时的形式。对任意 $s\le t$，利用布朗增量的独立性和正态矩母函数，有

$$
\begin{aligned}
\mathbb E^Q[e^{-rt}S_t\mid\mathcal F_s]
&=e^{-rs}S_s\exp\left(-\frac{\sigma^2(t-s)}2\right)
\mathbb E^Q\!\left[e^{\sigma(W_t^Q-W_s^Q)}\mid\mathcal F_s\right]\\
&=e^{-rs}S_s
\end{aligned}
$$

几乎必然成立。加上常数 $-Ke^{-rT}$ 不改变这一鞅等式，所以 $\widetilde V$ 是真正的 $Q$-鞅。并且 $e^{-rt}S_t>0$，从而 $\widetilde V_t>-|K|e^{-rT}$，说明它同时具有常数下界。

也可以直接核验平方可积条件。由同一显式解，

$$
\mathbb E^Q[(e^{-rt}S_t)^2]
=S_0^2e^{-\sigma^2t}
\mathbb E^Q[e^{2\sigma W_t^Q}]
=S_0^2e^{\sigma^2t},
$$

因而 $\mathbb E^Q[\int_0^T\sigma^2e^{-2rt}S_t^2dt]<\infty$。这从另一角度确认随机积分是真正鞅。故所构造的组合确为鞅可容许复制策略，$V_t=S_t-Ke^{-r(T-t)}$ 不仅形式上满足条件期望公式，而且确实由容许交易实现。

这个例题也显示，Girsanov 变换改变的是股票的漂移，而不是波动率。股票在 $Q$ 下仍有随机波动；贴现股票之所以成为鞅，是漂移校正 $\sigma\theta=\mu-r$ 与贴现共同消除了漂移项。风险中性定价并不意味着真实投资者预期所有资产都以利率增长，它只是在调整后的测度与交易策略下表达无套利复制成本。

**注记**

在需要回到真实测度计算时，可由第 13 章条件期望的定义推出 Bayes 公式。设 $Y$ 为 $\mathcal F_T$-可测且 $Y\in L^1(Q)$，则

$$
\mathbb E^Q[Y\mid\mathcal F_t]
=\frac1{Z_t}\mathbb E^{\mathbb P}[Z_TY\mid\mathcal F_t]
$$

几乎必然成立。事实上，对任意 $A\in\mathcal F_t$，一方面，条件期望的定义以及 $Z_T$ 是 $\mathcal F_T$ 上的密度给出

$$
\int_A\mathbb E^Q[Y\mid\mathcal F_t]\,dQ
=\int_AY\,dQ
=\int_A\mathbb E^{\mathbb P}[Z_TY\mid\mathcal F_t]\,d\mathbb P.
$$

另一方面，$Z_t$ 是 $Q$ 在 $\mathcal F_t$ 上相对于 $\mathbb P$ 的密度，故同一个左端也等于 $\int_AZ_t\mathbb E^Q[Y\mid\mathcal F_t]\,d\mathbb P$。两个被积函数均为 $\mathcal F_t$-可测，且 $A$ 任意，因此

$$
Z_t\mathbb E^Q[Y\mid\mathcal F_t]
=\mathbb E^{\mathbb P}[Z_TY\mid\mathcal F_t]
$$

几乎必然成立；再由 $Z_t>0$ 即得 Bayes 公式。
把这一公式用于 $Y=D_TH$，式（33.23）便转化为真实测度下的等价表达

$$
V_t=\frac1{D_tZ_t}\mathbb E^{\mathbb P}
[Z_TD_TH\mid\mathcal F_t],
\qquad
V_0=\mathbb E^{\mathbb P}[Z_TD_TH].
$$

这里 $D$ 是银行账户作为计价单位所产生的贴现因子，$Z$ 则完成从真实测度到定价测度的路径权重调整。单独使用 $D_TH$ 在 $\mathbb P$ 下取期望一般会遗漏测度密度；单独使用 $Z_TH$ 又会遗漏随机利率造成的时间贴现。二者结合，才与银行账户计价下的风险中性公式一致。由于 $Q$ 与 $\mathbb P$ 等价，上述条件期望等式在两种测度下都几乎必然成立，且零概率例外集可以取得一致。

最后考察不可完全复制时的不等号方向。若某个下界可容许自融资策略满足 $\widehat V_T\ge H$ 几乎必然成立，则定理 33.11 的上鞅性给出

$$
\widehat V_0\ge\mathbb E^Q[D_T\widehat V_T]
\ge\mathbb E^Q[D_TH].
$$

因此 $\mathbb E^Q[D_TH]$ 是该类超复制成本的下界，而不必冒充唯一价格。若另一个鞅可容许策略满足 $\check V_T\le H$ 几乎必然成立，则真正鞅性给出 $\check V_0=\mathbb E^Q[D_T\check V_T]\le\mathbb E^Q[D_TH]$，从而提供相应的次复制成本上界。第二个论证若只有上鞅性，就只能得到 $\mathbb E^Q[D_T\check V_T]\le\check V_0$，并不能错误地推出同一方向的价格不等式。

这些推导共同说明，连续时间风险中性定价的每个等号都有明确来源：自融资条件把财富转化为贴现资产上的随机积分，鞅性质把终端条件期望带回当前时刻，Girsanov 变换构造并识别适用的测度，而可容许性保证局部化极限不会引入加倍策略或失去所需的鞅等式。缺少其中任何一项，都应退回到相应的上鞅不等式或价格区间，而不能直接宣称得到唯一无套利价格。
**注记**

还可以从 $\boldsymbol\theta$ 的非唯一性看清不完全市场中的价格差异。设 $\boldsymbol\theta$ 满足漂移方程，而可料过程 $\boldsymbol\nu$ 满足 $\boldsymbol\sigma_t\boldsymbol\nu_t=0$，并且 $\boldsymbol\theta+\boldsymbol\nu$ 也满足 Novikov 条件。令 $Q^\nu$ 是由 $\boldsymbol\theta+\boldsymbol\nu$ 按式（33.24）构造的测度。由于

$$
\boldsymbol\mu_t-\boldsymbol\sigma_t(\boldsymbol\theta_t+\boldsymbol\nu_t)
=\boldsymbol\mu_t-\boldsymbol\sigma_t\boldsymbol\theta_t=r_t\mathbf1,
$$

贴现交易资产在 $Q^\nu$ 下仍是局部鞅。然而 $Q^\nu$ 的密度一般不同于 $Q$ 的密度，因为它还对波动率矩阵零空间中的布朗风险重新分配权重。对依赖这些未交易风险源的索取权，两种测度下的条件期望没有必要相等。

这并不与定理 33.12 的唯一性矛盾。若 $H$ 同时能由两个测度下均鞅可容许的同一自融资策略复制，则该策略的财富过程是客观给定的，定理 33.12 分别给出

$$
D_tV_t=\mathbb E^Q[D_TH\mid\mathcal F_t]
=\mathbb E^{Q^\nu}[D_TH\mid\mathcal F_t]
$$

几乎必然成立，所以两个风险中性条件期望必须一致。若计算结果不同，就不能把差异归因于所谓的复制价格不唯一，而应检查至少一个测度的鞅条件、复制策略的可容许性或终端收益的可积性是否失效。真正的测度依赖性发生在这些条件不能同时成立或索取权不可复制的部分。

可积性假设也应按乘积 $D_TH$ 核验，而不能把 $D_T$ 与 $H$ 任意拆分。在随机利率模型中，$H\in L^1(Q)$ 本身并不必然推出 $D_TH\in L^1(Q)$；只有当贴现因子具备适当有界性，或持有额外的矩估计时，才能由 Hölder 不等式等工具得到乘积可积。例如，若存在正常数 $C$ 使 $D_T\le C$ 几乎必然成立，则 $\mathbb E^Q|D_TH|\le C\mathbb E^Q|H|<\infty$。没有这类条件时，即使终端收益本身可积，条件期望定价公式仍可能因贴现收益不可积而失去有限价格的含义。

同理，Bayes 公式中的 $Z_TD_TH$ 并不是额外增加的独立可积性假设：$D_TH\in L^1(Q)$ 已等价地保证它在 $\mathbb P$ 下可积，因为 $\mathbb E^{\mathbb P}[|Z_TD_TH|]=\mathbb E^Q|D_TH|$。因此，定理 33.12 的条件同时支撑风险中性表达和真实测度表达。对非负但不可积的收益，可以把条件期望解释为取扩展实数值的量，却不能据此断言存在有限的鞅可容许复制价格；该情形必须另行分析，不能直接套用本节等式。
最后，条件期望的存在与复制策略的存在必须区分。只要 $D_TH\in L^1(Q)$，风险中性条件期望便有定义；但要把它解释为复制价格，还须存在满足终端复制条件的鞅可容许自融资策略。前者是可积性问题，后者还涉及鞅表示、表示核的可积性以及财富下界。若只知贴现财富是严格局部鞅，则其初始值可能高于终端贴现收益的期望，故不能把局部鞅表示直接当作定价等式。对非负局部鞅运用 Fatou 引理只能得到
$$
V_0\ge \mathbb E^Q[D_TH],
$$
而这正是超复制下界而非必然成立的复制等式。只有在可容许性排除了这一缺口后，风险中性期望才是由交易唯一确定的价格。下一节在常系数、单资产且可连续交易的环境中显式验证这些条件，并把抽象的条件期望化为可计算的期权公式。

## 33.5 Black–Scholes 模型与公式

Black–Scholes 模型用一个银行账户和一只股票构成市场。其核心不只是写出股票的几何布朗运动，还包括无摩擦连续交易、自融资复制和等价鞅测度之间的配合。本节先从这些假设推导定价方程，再直接计算风险中性期望，以避免把偏微分方程公式与概率公式当成两个彼此独立的结论。

**定义 33.14（Black–Scholes 模型）**

在带右连续完备滤子 $(\mathcal F_t)_{0\le t\le T}$ 的概率空间上，设 $W$ 是真实测度 $\mathbb P$ 下的标准布朗运动。银行账户 $B$ 与股票价格 $S$ 满足
$$
B_0=1,\qquad S_0>0,\qquad
\begin{aligned}
dB_t&=rB_t\,dt,\\
dS_t&=\mu S_t\,dt+\sigma S_t\,dW_t,
\end{aligned}
\tag{33.25}
$$
其中 $\mu,r$ 为常数，$\sigma>0$ 为常数，因而 $B_t=e^{rt}$。市场允许连续交易、任意实数持仓和卖空，不计交易成本、税费与买卖价差，股票不支付股息，且资产可无限分割。交易策略须可料并满足随机积分所需的可积条件，财富过程还服从本节明确给出的可容许性限制。欧式索取权的终端收益只依赖于 $S_T$，且只能在 $T$ 时结算。

在这些假设下，$S_t>0$ 几乎必然成立。参数 $\mu$ 描述真实测度下的漂移，$r$ 是连续复利利率，$\sigma$ 是股票对数收益的瞬时波动率。常系数假设并不表示财富或期权价格是确定函数；随机性仍由 $W$ 驱动，并将在对冲后被复制组合的融资关系所控制。
令 $D_t=e^{-rt}$，则 Itô 乘积公式给出
$$
d(D_tS_t)=D_tS_t(\mu-r)\,dt+\sigma D_tS_t\,dW_t.
$$
取常数 $\theta=(\mu-r)/\sigma$，并定义
$$
Z_t=\exp\!\left(-\theta W_t-\frac12\theta^2t\right),
\qquad
W_t^Q=W_t+\theta t.
$$
常数 $\theta$ 满足 Novikov 条件：$\mathbb E\bigl[\exp\bigl(\tfrac{1}{2}\theta^2T\bigr)\bigr]=\exp\bigl(\tfrac{1}{2}\theta^2T\bigr)<\infty$，所以 $Z$ 是严格正的鞅，并可由 $dQ=Z_T\,d\mathbb P$ 在 $\mathcal F_T$ 上定义与 $\mathbb P$ 等价的概率测度 $Q$。Girsanov 定理说明 $W^Q$ 在 $Q$ 下是标准布朗运动，而且
$$
dS_t=rS_t\,dt+\sigma S_t\,dW_t^Q,
\qquad
d(D_tS_t)=\sigma D_tS_t\,dW_t^Q.
$$
因此贴现股票在 $Q$ 下是鞅；其指数高斯形式具有各阶有限矩，故这里的随机积分不仅是局部鞅，也是真正鞅。由于唯一的布朗风险源已由股票交易覆盖，可料表示核在适当可积条件下可由股票持仓实现，该市场是完全市场。

对满足 $\mathbb E^Q|D_Tg(S_T)|<\infty$ 的欧式收益，33.4 节的定价公式给出
$$
V_t=D_t^{-1}\mathbb E^Q[D_Tg(S_T)\mid\mathcal F_t].
$$
在本节常数利率下，$D_t^{-1}D_T=e^{-r(T-t)}$ 是确定量。马尔可夫性又使该条件期望只依赖于 $t$ 与 $S_t$，故可写为 $V(t,S_t)$。看涨与看跌收益分别具有线性和有界增长，以下计算所需的期望均有限。

**定理 33.15（对冲组合与 Black–Scholes 方程）**

设 $V(t,x)$ 在 $[0,T)\times(0,\infty)$ 上属于 $C^{1,2}$，并满足终端条件 $V(T,x)=g(x)$。若存在以 $V(t,S_t)$ 为财富的自融资复制策略，则 $V$ 在定义域内满足
$$
\frac{\partial V}{\partial t}
+\frac12\sigma^2x^2\frac{\partial^2V}{\partial x^2}
+rx\frac{\partial V}{\partial x}-rV=0.
\tag{33.26}
$$
反之，若 $V$ 是该方程的充分正则解，且由 $\Delta_t=V_x(t,S_t)$ 与银行账户组成的策略满足随机积分可积条件，则该策略自融资并复制 $g(S_T)$。

**证明**

先对未知的期权价格函数应用 Itô 公式。为简化排版，所有偏导数都在 $(t,S_t)$ 处取值，得到
$$
\begin{aligned}
dV(t,S_t)
&=\left(V_t+\mu S_tV_x+\frac12\sigma^2S_t^2V_{xx}\right)dt
+\sigma S_tV_x\,dW_t.
\end{aligned}
\tag{33.27}
$$
考虑持有一份期权、同时持有 $-\Delta_t$ 份股票的对冲组合，其记账价值为 $\Pi_t=V(t,S_t)-\Delta_tS_t$。按照自融资条件，持仓的重新配置本身不产生收益或消耗，瞬时收益只来自资产价格变化；融资差额通过银行账户完成。因此，对冲部分的瞬时变化写成
$$
dV(t,S_t)-\Delta_t\,dS_t
=\left[V_t+(\mu S_t-\Delta_t\mu S_t)V_x^0
+\frac12\sigma^2S_t^2V_{xx}\right]dt
+\sigma S_t(V_x-\Delta_t)\,dW_t,
$$
其中 $V_x^0$ 仅表示第一项中已经被合并前的系数占位，并非新的偏导数。将股票项直接合并，上式严格地化为
$$
dV(t,S_t)-\Delta_t\,dS_t
=\left[V_t+\mu S_t(V_x-\Delta_t)
+\frac12\sigma^2S_t^2V_{xx}\right]dt
+\sigma S_t(V_x-\Delta_t)\,dW_t.
$$选取 $\Delta_t=V_x$，则扩散项与含 $\mu$ 的漂移项同时消失，瞬时对冲收益成为
$$
-\left(V_t+\frac12\sigma^2S_t^2V_{xx}\right)dt.
$$
这是确定性演化：在已知 $t$ 与 $S_t$ 后，其瞬时漂移不含布朗增量。无套利要求这份完全对冲的组合按无风险利率增长，即瞬时收益等于 $r\Pi_t\,dt=r(V-S_tV_x)dt$。比较两个确定性漂移并移项，恰得式（33.26）。真实漂移 $\mu$ 已消去，所以定价方程不依赖投资者对股票预期收益的主观估计。

反之，设 $V$ 满足方程。构造策略
$$
\Delta_t=V_x(t,S_t),
\qquad
\eta_t=\frac{V(t,S_t)-\Delta_tS_t}{B_t},
$$
即持有 $\Delta_t$ 份股票和 $\eta_t$ 份银行账户。其财富定义为 $X_t=\Delta_tS_t+\eta_tB_t=V(t,S_t)$。由自融资收益形式、式（33.27）和式（33.26）可得
$$
\begin{aligned}
\Delta_t\,dS_t+\eta_t\,dB_t
&=\left[\mu S_tV_x+r(V-S_tV_x)\right]dt
+\sigma S_tV_x\,dW_t\\
&=\left[V_t+\mu S_tV_x+\frac12\sigma^2S_t^2V_{xx}\right]dt
+\sigma S_tV_x\,dW_t\\
&=dV(t,S_t)=dX_t.
\end{aligned}
$$
故该策略确实自融资，而不仅是持仓账面值恰好等于 $V$。终端时 $X_T=V(T,S_T)=g(S_T)$，所以复制成立。所用可积条件保证上述随机积分与自融资条件有效；若再要求贴现财富在 $Q$ 下为真正鞅，则其初始财富就是33.4节意义下的唯一无套利价格。

□

偏导数 $V_x$ 同时是复制策略中的股票持仓，称为期权的 Delta。上述证明的关键是消去扩散项，而不是假设股票价格不再随机；股票仍按几何布朗运动演化，只是自融资组合对布朗增量的暴露被调整为零。
**定理 33.16（Feynman–Kac 定价表示）**

设 $V$ 满足定理 33.15 的方程与终端条件，并且 $V$ 及其相关偏导数至多具有多项式增长。固定 $t<T$，在 $S_t=x$ 的条件下，令 $S$ 在 $Q$ 下满足 $dS_s=rS_s\,ds+\sigma S_s\,dW_s^Q$。则
$$
V(t,x)=e^{-r(T-t)}\mathbb E^Q[g(S_T)\mid S_t=x].
\tag{33.28}
$$

**证明**

对 $t\le s\le T$ 定义 $Y_s=e^{-r(s-t)}V(s,S_s)$。Itô 公式与 $Q$ 下的股票方程给出
$$
\begin{aligned}
dY_s
={}&e^{-r(s-t)}\left[-rV+V_s^{(t)}
+rS_sV_x+\frac12\sigma^2S_s^2V_{xx}\right]ds\\
&+e^{-r(s-t)}\sigma S_sV_x\,dW_s^Q,
\end{aligned}
$$
其中 $V_s^{(t)}$ 表示 $V$ 对其第一个变量的偏导数，以便与状态变量 $S_s$ 区分。由于 $V$ 满足式（33.26），方括号内的漂移恒等于零，故
$$
Y_T=Y_t+\int_t^T e^{-r(u-t)}\sigma S_uV_x(u,S_u)\,dW_u^Q.
$$
多项式增长假设意味着存在常数 $C,m$，使被积过程的绝对值不超过 $C(1+S_u^m)$ 在有限区间上的相应常数倍。几何布朗运动在有限时域上具有各阶一致有界矩，因而
$$
\mathbb E^Q\int_t^T e^{-2r(u-t)}\sigma^2S_u^2V_x(u,S_u)^2\,du<\infty.
$$
所以该 Itô 随机积分是零均值真正鞅，而不只是局部鞅。对增量等式取给定 $S_t=x$ 的条件期望，随机积分项消失，得到 $\mathbb E^Q[Y_T\mid S_t=x]=Y_t=V(t,x)$。最后，$Y_T=e^{-r(T-t)}V(T,S_T)=e^{-r(T-t)}g(S_T)$，代回即得式（33.28）。

□

这里多项式增长只用于保证取期望与随机积分交换合法。若解不具备该增长条件，可先在有界状态区域上停止过程，再分别验证局部化等式两侧的收敛；不能在没有任何可积控制时直接把局部鞅的期望写成零。
**定理 33.17（Black–Scholes 欧式期权公式）**

设在 $t$ 时股票价格为 $x>0$，剩余期限为 $\tau=T-t>0$，执行价为 $K>0$。定义
$$
d_1=\frac{\ln(x/K)+(r+\frac12\sigma^2)\tau}{\sigma\sqrt{\tau}},
\qquad
d_2=d_1-\sigma\sqrt{\tau},
\qquad
N(y)=\int_{-\infty}^{y}\frac1{\sqrt{2\pi}}e^{-u^2/2}\,du.
\tag{33.29}
$$
其中 $N$ 是标准正态分布函数。令 $\varphi=N'$ 为标准正态密度，则欧式看涨价格 $C$ 与欧式看跌价格 $P$ 分别为
$$
\boxed{
\begin{aligned}
C(t,x)&=xN(d_1)-Ke^{-r\tau}N(d_2),\\
P(t,x)&=Ke^{-r\tau}N(-d_2)-xN(-d_1).
\end{aligned}}
\tag{33.30}
$$
当 $\tau=0$ 时，两者分别退化为 $(x-K)^+$ 与 $(K-x)^+$。

**证明**

由风险中性股票方程与 Itô 对数公式，
$$
\begin{aligned}
d\ln S_s
&=\frac{dS_s}{S_s}-\frac12\frac{d\langle S\rangle_s}{S_s^2}\\
&=\left(r-\frac12\sigma^2\right)ds+\sigma\,dW_s^Q.
\end{aligned}
$$
从 $t$ 积分到 $T$，并利用二次变差 $\langle W^Q\rangle_T-\langle W^Q\rangle_t=\tau$，得到
$$
S_T=x\exp\!\left[\left(r-\frac12\sigma^2\right)\tau
+\sigma\sqrt{\tau}Z\right],
\qquad Z\sim N(0,1)
\tag{33.31}
$$
在 $Q$ 下成立。这里 $Z=(W_T^Q-W_t^Q)/\sqrt{\tau}$，故其分布正是标准正态分布。式（33.28）把看涨价格化为
$$
C=e^{-r\tau}\mathbb E^Q[(S_T-K)^+].
$$
收益严格为正等价于 $S_T>K$，取对数后等价于
$$
Z>\frac{\ln(K/x)-(r-\frac12\sigma^2)\tau}{\sigma\sqrt{\tau}}=-d_2.
$$
因此，只有在 $Z>-d_2$ 的区域上积分，而不能把 payoff 直接替换成无条件期望。记 $z_0=-d_2$，则
$$
C=e^{-r\tau}\int_{z_0}^{\infty}
\left[x e^{(r-\frac12\sigma^2)\tau+\sigma\sqrt{\tau}z}-K\right]
\varphi(z)\,dz.
$$将上式分成股票项和执行价项。执行价项直接利用 $N$ 的对称性：
$$
Ke^{-r\tau}\int_{z_0}^{\infty}\varphi(z)\,dz
=Ke^{-r\tau}[1-N(z_0)]
=Ke^{-r\tau}N(-z_0)
=Ke^{-r\tau}N(d_2).
$$
股票项需要完成平方。由 $\varphi(z)=(2\pi)^{-1/2}e^{-z^2/2}$，有
$$
\begin{aligned}
&x e^{-r\tau}\int_{z_0}^{\infty}
 e^{(r-\frac12\sigma^2)\tau+\sigma\sqrt{\tau}z}\varphi(z)\,dz\\
&\qquad=x\int_{z_0}^{\infty}
 \frac1{\sqrt{2\pi}}
 \exp\!\left[-\frac12z^2+\sigma\sqrt{\tau}z-\frac12\sigma^2\tau\right]dz\\
&\qquad=x\int_{z_0}^{\infty}
 \frac1{\sqrt{2\pi}}
 \exp\!\left[-\frac12(z-\sigma\sqrt{\tau})^2\right]dz.
\end{aligned}
$$
作变量替换 $u=z-\sigma\sqrt{\tau}$，积分下限变成 $z_0-\sigma\sqrt{\tau}=-d_2-\sigma\sqrt{\tau}=-d_1$，故股票项等于
$$
x\int_{-d_1}^{\infty}\varphi(u)\,du=xN(d_1).
$$
两项相减即得式（33.30）的看涨公式。被积函数非负且股票具有有限一阶矩，因此上述积分拆分与变量替换均有可积性依据。

看跌期权不能仅靠把 $K-S_T$ 无条件取期望来计算。其收益严格为正的区域是 $S_T<K$，即 $Z<z_0=-d_2$；在 $S_T=K$ 处收益为零，是否计入该点不影响积分。于是
$$
\begin{aligned}
P
&=e^{-r\tau}\int_{-\infty}^{z_0}
\left[K-x e^{(r-\frac12\sigma^2)\tau+\sigma\sqrt{\tau}z}\right]
\varphi(z)\,dz\\
&=Ke^{-r\tau}N(z_0)
-x\int_{-\infty}^{z_0}\frac1{\sqrt{2\pi}}
\exp\!\left[-\frac12(z-\sigma\sqrt{\tau})^2\right]dz.
\end{aligned}
$$
第一个积分给出 $Ke^{-r\tau}N(-d_2)$。第二个积分仍作替换 $u=z-\sigma\sqrt{\tau}$，上限变为 $-d_1$，所以该项为 $xN(-d_1)$。合起来正是式（33.30）的看跌公式。两式在 $\tau>0$ 时均有限，并且 $C^{1,2}$ 正则性可由积分号下求导及正态密度的指数衰减验证，故也满足前述 Feynman–Kac 条件。

□
**例 33.5**

取 $x=K=100$、$r=0.05$、$\sigma=0.2$、$\tau=1$，计算欧式看涨价格及其初始 Delta 对冲持仓。

**解**

先计算
$$
d_1=\frac{\ln1+0.05+\frac12(0.2)^2}{0.2}=0.35,
\qquad d_2=0.35-0.2=0.15.
$$
标准正态分布函数给出 $N(0.35)\approx0.63683065$，$N(0.15)\approx0.55961769$，并且 $Ke^{-r\tau}=100e^{-0.05}\approx95.12294245$。代入看涨公式：
$$
\begin{aligned}
C
&\approx100(0.63683065)-95.12294245(0.55961769)\\
&\approx63.68306512-53.23248155
=10.45058357.
\end{aligned}
$$
初始 Delta 为 $N(d_1)\approx0.63683065$，故复制组合约持有 $0.63683065$ 份股票。其银行账户头寸为
$$
C-xN(d_1)=-Ke^{-r\tau}N(d_2)\approx-53.23248155,
$$
即借入约 $53.23248$ 的现金。这里的负号表示融资，而不是额外卖出期权。

**例 33.6**

沿用例 33.5 的参数，直接使用风险中性公式计算欧式看跌价格，并核对两项分解。

**解**

由 $N(-y)=1-N(y)$ 可得
$$
N(-d_1)=N(-0.35)\approx0.36316935,
\qquad
N(-d_2)=N(-0.15)\approx0.44038231.
$$
因此
$$
\begin{aligned}
P
&=95.12294245N(-0.15)-100N(-0.35)\\
&\approx41.89046090-36.31693488
=5.57352602.
\end{aligned}
$$
第一项是执行价贴现值与看跌到期时处于价内的风险中性概率之积；第二项是股票项在相应区域上的贴现期望。两项相减而非相加，正因为看跌持有人在价内收到 $K$ 同时交出价值为 $S_T$ 的股票。所得价格非负且小于 $Ke^{-r\tau}$，与看跌收益的上界一致。
**命题 33.18（价格界限、单调性与敏感性）**

在 $\tau>0$ 时，Black–Scholes 价格满足
$$
\begin{aligned}
(x-Ke^{-r\tau})^+&\le C\le x,\\
(Ke^{-r\tau}-x)^+&\le P\le Ke^{-r\tau},\\
C_x=N(d_1),\qquad P_x&=-N(-d_1),\\
C_{xx}=P_{xx}&=\frac{\varphi(d_1)}{x\sigma\sqrt{\tau}},\\
C_\sigma=P_\sigma&=x\sqrt{\tau}\varphi(d_1).
\end{aligned}
\tag{33.32}
$$
特别地，$C$ 关于 $x$ 递增、关于 $K$ 递减，$P$ 关于 $x$ 递减、关于 $K$ 递增；两者关于 $x$ 均为凸函数，关于 $\sigma$ 均递增。四个价格界限在终端收益的风险中性期望意义下成立，而不仅是对数值代入后的经验观察。

**证明**

先看界限。由于 $0\le(S_T-K)^+\le S_T$，取条件期望并乘以 $e^{-r\tau}$，得 $0\le C\le e^{-r\tau}\mathbb E^Q[S_T]=x$。对凸函数 $u\mapsto(u-K)^+$ 使用 Jensen 不等式，并利用 $\mathbb E^Q[S_T]=xe^{r\tau}$，又有
$$
C\ge e^{-r\tau}(\mathbb E^Q[S_T]-K)^+
=(x-Ke^{-r\tau})^+.
$$
同理，$0\le(K-S_T)^+\le K$ 给出 $0\le P\le Ke^{-r\tau}$，Jensen 不等式给出 $P\ge(Ke^{-r\tau}-x)^+$。这些估计合起来就是前两行。

为求导，先证明一个反复使用的恒等式。由 $d_2=d_1-\sigma\sqrt{\tau}$ 及 $d_1$ 的定义，
$$
\begin{aligned}
\frac{d_1^2-d_2^2}{2}
&=d_1\sigma\sqrt{\tau}-\frac12\sigma^2\tau\\
&=\ln(x/K)+r\tau.
\end{aligned}
$$
因此
$$
x\varphi(d_1)=Ke^{-r\tau}\varphi(d_2).
$$
该恒等式精确抵消对 $d_1,d_2$ 求导时出现的大部分项。记 $D=Ke^{-r\tau}$，则
$$
\begin{aligned}
C_x
&=N(d_1)+x\varphi(d_1)\frac{\partial d_1}{\partial x}
-D\varphi(d_2)\frac{\partial d_2}{\partial x}\\
&=N(d_1)+[x\varphi(d_1)-D\varphi(d_2)]
 \frac1{x\sigma\sqrt{\tau}}
=N(d_1).
\end{aligned}
$$
对看跌公式作同样计算，得到
$$
P_x=-D\varphi(-d_2)\frac{\partial d_2}{\partial x}
-N(-d_1)+x\varphi(-d_1)\frac{\partial d_1}{\partial x}
=-N(-d_1),
$$
其中使用了 $\varphi(-y)=\varphi(y)$ 与同一恒等式。因为 $0<N(d_1)<1$，所以 $C_x>0$ 且 $P_x<0$。继续求一阶导数的导数，立即得到
$$
C_{xx}=\varphi(d_1)\frac{\partial d_1}{\partial x}
=\frac{\varphi(d_1)}{x\sigma\sqrt{\tau}}>0.
$$
而 $P_x=-N(-d_1)$ 的导数也等于同一正数，故两种价格关于 $x$ 都是严格凸函数。

再计算波动率导数。注意
$$
\frac{\partial d_1}{\partial\sigma}
-\frac{\partial d_2}{\partial\sigma}=\sqrt{\tau}.
$$
利用 $x\varphi(d_1)=D\varphi(d_2)$，看涨价格的导数为
$$
\begin{aligned}
C_\sigma
&=x\varphi(d_1)\frac{\partial d_1}{\partial\sigma}
-D\varphi(d_2)\frac{\partial d_2}{\partial\sigma}\\
&=D\varphi(d_2)\sqrt{\tau}
=x\sqrt{\tau}\varphi(d_1)>0.
\end{aligned}
$$
看跌价格的相应计算也不省略：
$$
\begin{aligned}
P_\sigma
&=-D\varphi(-d_2)\frac{\partial d_2}{\partial\sigma}
+x\varphi(-d_1)\frac{\partial d_1}{\partial\sigma}\\
&=x\varphi(d_1)\left(\frac{\partial d_1}{\partial\sigma}
-\frac{\partial d_2}{\partial\sigma}\right)
=x\sqrt{\tau}\varphi(d_1)>0.
\end{aligned}
$$
因此两者均随 $\sigma$ 严格递增。最后，对 $K$ 求导并再次使用上述指数恒等式，得到
$$
C_K=-e^{-r\tau}N(d_2)<0,
\qquad
P_K=e^{-r\tau}N(-d_2)>0.
$$
至此命题中的全部单调性、凸性与敏感性公式均已验证。由于 $\tau>0$ 时对数正态变量在任何正区间都有正概率，$C>0$ 与 $P>0$ 也严格成立；一般下界写成带正部函数，是为了同时覆盖到期或退化情形。

□

Delta 是复制持仓，Gamma 衡量该持仓随股价变化的速率，Vega 则衡量价格对波动率参数的敏感性。$C_\sigma=P_\sigma$ 并不表示两种收益相同，而是反映它们对随机波动暴露的敏感性在常参数模型中一致。
**命题 33.19（到期、低波动率与深度价内外极限）**

固定其余参数，Black–Scholes 公式具有下列极限：
$$
\begin{aligned}
\lim_{\tau\downarrow0}(C,P)
&=\big((x-K)^+,(K-x)^+\big),\\
\lim_{\sigma\downarrow0}(C,P)
&=\big((x-Ke^{-r\tau})^+,(Ke^{-r\tau}-x)^+\big),\\
\lim_{\sigma\to\infty}(C,P)&=(x,Ke^{-r\tau}),\\
\lim_{x\downarrow0}(C,P)&=(0,Ke^{-r\tau}),\\
\lim_{x\to\infty}(C/x,P)&=(1,0).
\end{aligned}
\tag{33.33}
$$
此外，若 $r>0$，则 $\lim_{\tau\to\infty}(C,P)=(x,0)$。这些极限分别对应立即到期、确定性贴现价格、极大不确定性以及极端价内或价外状态。

**证明**

先令 $\tau\downarrow0$。若 $x>K$，则 $\ln(x/K)>0$，故 $d_1,d_2$ 都趋于 $+\infty$；若 $x<K$，二者都趋于 $-\infty$。在 $x=K$ 的临界情形，
$$
d_1=\frac12\sigma\sqrt{\tau}\to0,
\qquad d_2=-\frac12\sigma\sqrt{\tau}\to0,
$$
所以 $N(d_1),N(d_2)$ 都趋于 $1/2$，而 $Ke^{-r\tau}\to K=x$。将三种情形代入式（33.30），看涨极限为 $(x-K)^+$；看跌公式中使用 $N(-d_1),N(-d_2)$，同样逐项得到 $(K-x)^+$。

再令 $\sigma\downarrow0$，并记 $A=\ln(x/K)+r\tau$。此时
$$
d_1=\frac{A}{\sigma\sqrt{\tau}}+\frac12\sigma\sqrt{\tau},
\qquad
d_2=\frac{A}{\sigma\sqrt{\tau}}-\frac12\sigma\sqrt{\tau}.
$$
若 $A>0$，二者均趋于 $+\infty$；若 $A<0$，二者均趋于 $-\infty$。若 $A=0$，则 $x=Ke^{-r\tau}$，且 $d_1\to0$、$d_2\to0$，所以看涨与看跌公式中的两项差都趋于零。注意 $A>0$ 等价于 $x>Ke^{-r\tau}$，故恰好得到正部函数所示的两个极限。
当 $\sigma\to +\infty$ 时，$d_1\to +\infty$ 且 $d_2\to -\infty$，故 $N(d_1)\to 1$，$N(d_2)\to 0$。由式（33.30）直接得到 $C\to x\cdot 1 - Ke^{-r\tau}\cdot 0 = x$；而在看跌期权公式中，$N(-d_1)\to 0$，$N(-d_2)\to 1$，故 $P\to Ke^{-r\tau}\cdot 1 - x\cdot 0 = Ke^{-r\tau}$。这一结果在经济学上非常直观：当标的资产波动率极大时，向上可能性的无限延伸使得看涨期权等价于持有标的股票本身，而有限行权成本在极大方差下被概率完全稀释；反之看跌期权的最大收益上限为 $K$，在贴现后即为 $Ke^{-r\tau}$。

当标的现价 $x\downarrow 0$ 时，$\ln(x/K)\to -\infty$，从而 $d_1\to -\infty$ 且 $d_2\to -\infty$。此时 $N(d_1)\to 0$，$N(d_2)\to 0$，进而 $C\to 0$；而看跌期权中 $N(-d_1)\to 1$，$N(-d_2)\to 1$，故 $P\to Ke^{-r\tau}$。资产价格趋近于零意味着资产几乎必然归零且无法恢复，看涨期权必然一文不值，而看跌期权必然以全额行权价行权。

当标的现价 $x\to +\infty$ 时，$\ln(x/K)\to +\infty$，从而 $d_1\to +\infty$ 且 $d_2\to +\infty$。此时 $N(d_1)\to 1$，$N(d_2)\to 1$。于是看涨期权的比值满足
$$
\lim_{x\to +\infty}\frac{C(x,\tau)}{x}=\lim_{x\to +\infty}\left(N(d_1)-\frac{Ke^{-r\tau}}{x}N(d_2)\right)=1-0=1,
$$
且 $P\to Ke^{-r\tau}\cdot 0 - (+\infty)\cdot 0 = 0$。深度价内看涨期权的价值增长率与标的资产一比一同步，而看跌期权发生实值行权的概率趋近于零。

最后，若无风险利率 $r>0$，令到期期限 $\tau\to +\infty$。注意到 $\ln(x/K)$ 为常数，随着 $\tau\to +\infty$，
$$
d_1 = \frac{\ln(x/K) + (r+\frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}} = \frac{r+\frac{1}{2}\sigma^2}{\sigma}\sqrt{\tau} + O(\tau^{-1/2})\to +\infty,
$$
同理若 $r-\frac{1}{2}\sigma^2>0$，则 $d_2\to +\infty$；若 $r-\frac{1}{2}\sigma^2\le 0$，则不论 $d_2$ 极限如何，由于 $0\le N(d_2)\le 1$ 且贴现因子 $e^{-r\tau}\to 0$，第二项恒有 $Ke^{-r\tau}N(d_2)\to 0$。因此 $C\to x\cdot 1 - 0 = x$。对于看跌期权，由于 $0\le P \le Ke^{-r\tau}\to 0$。极限分析表明，在无限远期限与正利率下，资金的时间价值完全折灭了未来行权价的现值，使得看涨期权等价于标的股票，而看跌期权的现值彻底归零。

□

**命题 33.20（看跌看涨平价关系）**

设金融市场满足无套利假定，无风险复利利率 $r$ 为常数。对于同一标的资产 $S$、相同行权价 $K$ 与相同到期日 $T$ 的欧式看涨期权 $C_t = C(S_t, t)$ 与欧式看跌期权 $P_t = P(S_t, t)$，在任意时刻 $t\in[0,T]$ 恒有
$$
C(S_t, t) - P(S_t, t) = S_t - K e^{-r(T-t)}.
\tag{33.34}
$$

**证明**

我们给出两种独立证明：第一种基于无模型设定的无套利静态复制，第二种基于 Black–Scholes 解析定价公式的代数验证。

首先进行基于无套利原理的静态复制。考虑在时刻 $t$ 构造两个投资组合：
组合 A 包含一份欧式看涨期权多头，以及面值为 $K$、到期日为 $T$ 的贴现零息债券多头。在时刻 $t$，组合 A 的市场价值为
$$
V_t^A = C_t + K e^{-r(T-t)}.
$$
组合 B 包含一份欧式看跌期权多头，以及一手标的资产现货 $S_t$。在时刻 $t$，组合 B 的市场价值为
$$
V_t^B = P_t + S_t.
$$
考察两个组合在到期时刻 $T$ 的确定性终值。由于到期时欧式看涨期权的收益为 $(S_T - K)^+ = \max(S_T - K, 0)$，零息债券的面值为 $K$，故组合 A 在 $T$ 时刻的价值为
$$
V_T^A = \max(S_T - K, 0) + K = \max(S_T, K).
$$
对于组合 B，欧式看跌期权的到期收益为 $(K - S_T)^+ = \max(K - S_T, 0)$，加上标的资产在 $T$ 时刻的现货价值 $S_T$，组合 B 在 $T$ 时刻的价值为
$$
V_T^B = \max(K - S_T, 0) + S_T = \max(K, S_T).
$$
因此无论标的资产在到期日的终值 $S_T$ 取何值，两个组合的终值均恒等：
$$
V_T^A = V_T^B = \max(S_T, K).
$$
若在时刻 $t$ 有 $V_t^A > V_t^B$，投资者可通过卖空组合 A 并买入组合 B 构建对冲组合，在 $t$ 时刻获得正现金流 $V_t^A - V_t^B > 0$，并在时刻 $T$ 用组合 B 的完全一致收益偿付组合 A 的空头，期间不承担任何净支出与风险，构成套利机会；若 $V_t^A < V_t^B$，通过对称操作同样构成套利。由市场无套利假设，两个组合在时刻 $t$ 的价值必须严格相等，即
$$
C_t + K e^{-r(T-t)} = P_t + S_t,
$$
移项即得式（33.34）。

其次，由定理 33.17 中的 Black–Scholes 解析定价公式直接验算。记 $\tau = T - t$。将看涨与看跌公式作差，得到
$$
\begin{aligned}
C(S_t, t) - P(S_t, t) &= \big(S_t N(d_1) - K e^{-r\tau}N(d_2)\big) - \big(K e^{-r\tau}N(-d_2) - S_t N(-d_1)\big) \\
&= S_t\big(N(d_1) + N(-d_1)\big) - K e^{-r\tau}\big(N(d_2) + N(-d_2)\big).
\end{aligned}
$$
由于标准正态累积分布函数满足中心对称性质 $N(z) + N(-z) = 1$ 对一切实数 $z$ 成立，代入上式即得
$$
C(S_t, t) - P(S_t, t) = S_t\cdot 1 - K e^{-r\tau}\cdot 1 = S_t - K e^{-r\tau}.
$$
代数直接验证完毕。

□

## 33.6 希腊字母与对冲

在现代量化金融与衍生品交易实践中，期权定价公式的价值不仅在于给出一张合约的理论公允价格，更在于为动态风险对冲提供连续的局部敏感性测度。这些敏感性指标在行业与学术界统称为希腊字母（Greeks）。从多元泰勒展开的分析视角看，一个期权资产组合在微小时间步与底层资产价格微扰下的价值变动，可以展开为关于价格、波动率、时间与利率的各阶偏导数加权和。

### 33.6.1 Delta 与 Gamma 的显式推导

记欧式期权的价值函数为 $V(S, t)$，其中 $S$ 为标的资产价格，$t$ 为当前时刻，距到期剩余时间记为 $\tau = T - t$。在 Black–Scholes 体系中，欧式看涨期权价值记为 $C(S, \tau)$，欧式看跌期权价值记为 $P(S, \tau)$。

**注记（Delta 与 Gamma 的定义）**

期权价值对标的资产价格的一阶偏导数称为标的敏感度（Delta），记作 $\Delta$；期权价值对标的资产价格的二阶偏导数（即 Delta 对价格的一阶导数）称为曲率敏感度（Gamma），记作 $\Gamma$：
$$
\Delta = \frac{\partial V}{\partial S}, \qquad \Gamma = \frac{\partial^2 V}{\partial S^2} = \frac{\partial \Delta}{\partial S}.
$$

下面对欧式看涨与看跌期权的 Delta 和 Gamma 进行完整推导。首先回顾 Black–Scholes 公式中两个核心无量纲参数：
$$
d_1 = \frac{\ln(S/K) + (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}, \qquad d_2 = d_1 - \sigma\sqrt{\tau}.
$$
在推导求导运算之前，必须确立一个贯穿所有希腊字母计算的基础恒等式。标准正态分布的概率密度函数记为 $\varphi(z) = \frac{1}{\sqrt{2\pi}}e^{-z^2/2}$。考虑比值
$$
\frac{S\varphi(d_1)}{Ke^{-r\tau}\varphi(d_2)} = \frac{S}{Ke^{-r\tau}}\exp\left(-\frac{d_1^2 - d_2^2}{2}\right).
$$
将 $d_2 = d_1 - \sigma\sqrt{\tau}$ 代入平方差，得到
$$
d_1^2 - d_2^2 = (d_1 - d_2)(d_1 + d_2) = \sigma\sqrt{\tau}\left(2d_1 - \sigma\sqrt{\tau}\right).
$$
由于 $d_1 = \frac{\ln(S/K) + (r + \frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}$，代入展开得到
$$
2d_1 - \sigma\sqrt{\tau} = \frac{2\ln(S/K) + 2r\tau + \sigma^2\tau - \sigma^2\tau}{\sigma\sqrt{\tau}} = \frac{2\ln(S/K) + 2r\tau}{\sigma\sqrt{\tau}}.
$$
两者相乘即为
$$
d_1^2 - d_2^2 = \sigma\sqrt{\tau}\cdot\frac{2\ln(S/K) + 2r\tau}{\sigma\sqrt{\tau}} = 2\ln\left(\frac{S}{Ke^{-r\tau}}\right).
$$
因此指数项为
$$
\exp\left(-\frac{d_1^2 - d_2^2}{2}\right) = \exp\left(-\ln\left(\frac{S}{Ke^{-r\tau}}\right)\right) = \frac{Ke^{-r\tau}}{S}.
$$
从而有
$$
\frac{S\varphi(d_1)}{Ke^{-r\tau}\varphi(d_2)} = \frac{S}{Ke^{-r\tau}}\cdot\frac{Ke^{-r\tau}}{S} = 1,
$$
由此导出核心恒等式：
$$
S\varphi(d_1) = Ke^{-r\tau}\varphi(d_2).
$$

利用该恒等式，对欧式看涨期权价格公式 $C(S, \tau) = S N(d_1) - Ke^{-r\tau}N(d_2)$ 关于 $S$ 求偏导：
$$
\frac{\partial C}{\partial S} = N(d_1) + S\frac{\partial N(d_1)}{\partial S} - Ke^{-r\tau}\frac{\partial N(d_2)}{\partial S}.
$$
由复合求导法则与微积分基本定理：
$$
\frac{\partial N(d_1)}{\partial S} = \varphi(d_1)\frac{\partial d_1}{\partial S}, \qquad \frac{\partial N(d_2)}{\partial S} = \varphi(d_2)\frac{\partial d_2}{\partial S}.
$$
由于 $d_1$ 和 $d_2$ 中仅有分子首项包含 $S$，计算偏导得
$$
\frac{\partial d_1}{\partial S} = \frac{\partial}{\partial S}\left(\frac{\ln S}{\sigma\sqrt{\tau}}\right) = \frac{1}{S\sigma\sqrt{\tau}}, \qquad \frac{\partial d_2}{\partial S} = \frac{\partial d_1}{\partial S} = \frac{1}{S\sigma\sqrt{\tau}}.
$$
代入导数展开式，得到
$$
\frac{\partial C}{\partial S} = N(d_1) + S\varphi(d_1)\cdot\frac{1}{S\sigma\sqrt{\tau}} - Ke^{-r\tau}\varphi(d_2)\cdot\frac{1}{S\sigma\sqrt{\tau}} = N(d_1) + \frac{S\varphi(d_1) - Ke^{-r\tau}\varphi(d_2)}{S\sigma\sqrt{\tau}}.
$$
根据前面证明的核心恒等式，分子 $S\varphi(d_1) - Ke^{-r\tau}\varphi(d_2) = 0$ 恒成立。因此后两项严格对消，看涨期权的 Delta 显式表达式为
$$
\Delta_C = \frac{\partial C}{\partial S} = N(d_1).
$$
对于欧式看跌期权，对其看跌看涨平价关系 $C(S,\tau) - P(S,\tau) = S - Ke^{-r\tau}$ 两边关于 $S$ 求偏导，由于右端关于 $S$ 的导数严格为 1，直接得到
$$
\Delta_P = \frac{\partial P}{\partial S} = \frac{\partial C}{\partial S} - 1 = N(d_1) - 1 = -N(-d_1).
$$
因为对任何实数 $z$ 均有 $0 < N(z) < 1$，故欧式看涨期权的 Delta 严格介于 0 与 1 之间，欧式看跌期权的 Delta 严格介于 -1 与 0 之间。

进一步计算二阶偏导数 Gamma。将看涨期权的 Delta 表达式 $\Delta_C = N(d_1)$ 对 $S$ 再次求导：
$$
\Gamma_C = \frac{\partial \Delta_C}{\partial S} = \frac{\partial N(d_1)}{\partial S} = \varphi(d_1)\frac{\partial d_1}{\partial S} = \frac{\varphi(d_1)}{S\sigma\sqrt{\tau}}.
$$
对于看跌期权，将其 Delta 表达式 $\Delta_P = N(d_1) - 1$ 对 $S$ 求偏导：
$$
\Gamma_P = \frac{\partial \Delta_P}{\partial S} = \frac{\partial N(d_1)}{\partial S} = \frac{\varphi(d_1)}{S\sigma\sqrt{\tau}}.
$$
由此证明看涨期权与看跌期权具有完全一致的 Gamma：
$$
\Gamma_C = \Gamma_P = \frac{\varphi(d_1)}{S\sigma\sqrt{\tau}} > 0.
$$
由于概率密度函数 $\varphi$ 在实轴上处处严格为正，当 $S>0, \tau>0, \sigma>0$ 时，多头欧式期权的 Gamma 严格为正，期权价格作为标的资产价格的函数处处严格凸。

### 33.6.2 Vega、Theta 与 Rho 的显式推导

除了标的资产价格变动带来的方向性与曲率风险，期权还承载着波动率变动、时间流逝以及利率变动的三重风险暴露。

**注记（Vega、Theta 与 Rho 的定义）**

期权价值对标的资产波动率 $\sigma$ 的偏导数称为波动率敏感度（Vega），记作 $\mathcal{V}$；期权价值对日历时间 $t$ 的偏导数（反映时间衰减速率）称为时间敏感度（Theta），记作 $\Theta$；期权价值对无风险利率 $r$ 的偏导数称为利率敏感度（Rho），记作 $\rho$：
$$
\mathcal{V} = \frac{\partial V}{\partial \sigma}, \qquad \Theta = \frac{\partial V}{\partial t} = -\frac{\partial V}{\partial \tau}, \qquad \rho = \frac{\partial V}{\partial r}.
$$

下面对这三个希腊字母展开逐项完整推导。首先推导 Vega。对欧式看涨期权定价公式 $C(S,\tau) = SN(d_1) - Ke^{-r\tau}N(d_2)$ 关于 $\sigma$ 求偏导：
$$
\frac{\partial C}{\partial \sigma} = S\varphi(d_1)\frac{\partial d_1}{\partial \sigma} - Ke^{-r\tau}\varphi(d_2)\frac{\partial d_2}{\partial \sigma}.
$$
将 $d_1$ 和 $d_2$ 写为关于 $\sigma$ 的显式形式：
$$
d_1 = \frac{\ln(S/K) + r\tau}{\sigma\sqrt{\tau}} + \frac{1}{2}\sigma\sqrt{\tau}, \qquad d_2 = \frac{\ln(S/K) + r\tau}{\sigma\sqrt{\tau}} - \frac{1}{2}\sigma\sqrt{\tau}.
$$
计算对 $\sigma$ 的偏导数：
$$
\frac{\partial d_1}{\partial \sigma} = -\frac{\ln(S/K) + r\tau}{\sigma^2\sqrt{\tau}} + \frac{1}{2}\sqrt{\tau}, \qquad \frac{\partial d_2}{\partial \sigma} = -\frac{\ln(S/K) + r\tau}{\sigma^2\sqrt{\tau}} - \frac{1}{2}\sqrt{\tau}.
$$
两者相减得到
$$
\frac{\partial d_1}{\partial \sigma} - \frac{\partial d_2}{\partial \sigma} = \sqrt{\tau}.
$$
由于 $S\varphi(d_1) = Ke^{-r\tau}\varphi(d_2)$ 恒成立，提取公因式即得
$$
\mathcal{V}_C = \frac{\partial C}{\partial \sigma} = S\varphi(d_1)\left(\frac{\partial d_1}{\partial \sigma} - \frac{\partial d_2}{\partial \sigma}\right) = S\sqrt{\tau}\varphi(d_1).
$$
对于欧式看跌期权，利用看跌看涨平价关系 $C - P = S - Ke^{-r\tau}$，等式右侧不含波动率参数 $\sigma$，故两边对 $\sigma$ 求偏导直接导出看跌期权的 Vega 与看涨期权严格一致：
$$
\mathcal{V}_P = \mathcal{V}_C = S\sqrt{\tau}\varphi(d_1) > 0.
$$
这意味着无论看涨还是看跌期权，多头头寸始终享有正的 Vega，市场不确定性增加必然提升多头期权的期权价值。

接着推导 Theta。定义中 Theta 是期权价值对日历时间 $t$ 的变化率，由于 $\tau = T - t$，由链式法则有 $\Theta = -\frac{\partial V}{\partial \tau}$。先计算对剩余到期时间 $\tau$ 的偏导数：
$$
\frac{\partial C}{\partial \tau} = S\varphi(d_1)\frac{\partial d_1}{\partial \tau} - \frac{\partial(Ke^{-r\tau})}{\partial \tau}N(d_2) - Ke^{-r\tau}\varphi(d_2)\frac{\partial d_2}{\partial \tau}.
$$
计算中项对 $\tau$ 的导数：$\frac{\partial(Ke^{-r\tau})}{\partial \tau} = -rKe^{-r\tau}$。对 $d_1, d_2$ 求偏导：
$$
d_1 = \frac{\ln(S/K)}{\sigma\sqrt{\tau}} + \frac{r + \frac{1}{2}\sigma^2}{\sigma}\sqrt{\tau},
$$
从而有
$$
\frac{\partial d_1}{\partial \tau} = -\frac{\ln(S/K)}{2\sigma\tau^{3/2}} + \frac{r + \frac{1}{2}\sigma^2}{2\sigma\sqrt{\tau}}.
$$
由于 $d_2 = d_1 - \sigma\sqrt{\tau}$，对其求偏导得到
$$
\frac{\partial d_2}{\partial \tau} = \frac{\partial d_1}{\partial \tau} - \frac{\sigma}{2\sqrt{\tau}}.
$$
两者作差得到
$$
\frac{\partial d_1}{\partial \tau} - \frac{\partial d_2}{\partial \tau} = \frac{\sigma}{2\sqrt{\tau}}.
$$
利用 $S\varphi(d_1) = Ke^{-r\tau}\varphi(d_2)$，将第一项与第三项合并整理：
$$
S\varphi(d_1)\frac{\partial d_1}{\partial \tau} - Ke^{-r\tau}\varphi(d_2)\frac{\partial d_2}{\partial \tau} = S\varphi(d_1)\left(\frac{\partial d_1}{\partial \tau} - \frac{\partial d_2}{\partial \tau}\right) = \frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}}.
$$
将所有项带回得到
$$
\frac{\partial C}{\partial \tau} = \frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}} + rKe^{-r\tau}N(d_2).
$$
因此欧式看涨期权的 Theta 为
$$
\Theta_C = -\frac{\partial C}{\partial \tau} = -\frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}} - rKe^{-r\tau}N(d_2).
$$
对于欧式看跌期权，对平价关系 $C - P = S - Ke^{-r\tau}$ 关于 $\tau$ 求偏导，得到 $\frac{\partial C}{\partial \tau} - \frac{\partial P}{\partial \tau} = rKe^{-r\tau}$，由此得到
$$
\frac{\partial P}{\partial \tau} = \frac{\partial C}{\partial \tau} - rKe^{-r\tau} = \frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}} + rKe^{-r\tau}(N(d_2) - 1) = \frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}} - rKe^{-r\tau}N(-d_2).
$$
因此欧式看跌期权的 Theta 为
$$
\Theta_P = -\frac{\partial P}{\partial \tau} = -\frac{S\sigma\varphi(d_1)}{2\sqrt{\tau}} + rKe^{-r\tau}N(-d_2).
$$

最后推导 Rho。对看涨期权定价公式关于无风险利率 $r$ 求偏导：
$$
\frac{\partial C}{\partial r} = S\varphi(d_1)\frac{\partial d_1}{\partial r} - \left(- \tau Ke^{-r\tau}N(d_2) + Ke^{-r\tau}\varphi(d_2)\frac{\partial d_2}{\partial r}\right).
$$
由于 $d_1 = \frac{\ln(S/K) + (r+\frac{1}{2}\sigma^2)\tau}{\sigma\sqrt{\tau}}$ 且 $d_2 = d_1 - \sigma\sqrt{\tau}$，计算可知
$$
\frac{\partial d_1}{\partial r} = \frac{\tau}{\sigma\sqrt{\tau}} = \frac{\sqrt{\tau}}{\sigma}, \qquad \frac{\partial d_2}{\partial r} = \frac{\sqrt{\tau}}{\sigma}.
$$
因为 $\frac{\partial d_1}{\partial r} = \frac{\partial d_2}{\partial r}$，结合恒等式 $S\varphi(d_1) = Ke^{-r\tau}\varphi(d_2)$，第一项与第三项完全相抵：
$$
S\varphi(d_1)\frac{\partial d_1}{\partial r} - Ke^{-r\tau}\varphi(d_2)\frac{\partial d_2}{\partial r} = 0.
$$
因此仅留下中间项，看涨期权的 Rho 为
$$
\rho_C = \frac{\partial C}{\partial r} = K\tau e^{-r\tau}N(d_2) > 0.
$$
对看跌期权，对平价关系关于 $r$ 求偏导得 $\frac{\partial C}{\partial r} - \frac{\partial P}{\partial r} = \tau Ke^{-r\tau}$，从而
$$
\rho_P = \frac{\partial P}{\partial r} = \rho_C - \tau Ke^{-r\tau} = K\tau e^{-r\tau}(N(d_2) - 1) = -K\tau e^{-r\tau}N(-d_2) < 0.
$$
这表明标的无风险利率上升将提升看涨期权价值，同时压低看跌期权价值。

### 33.6.3 Delta 对冲的误差来源与再平衡频率

在 Black–Scholes 理论设定中，自融资复制组合依赖于不间断的连续时间动态调整。然而在现实市场微观结构中，交易员受限于离散时间戳观测、买卖价差以及交易手续费，只能在离散时刻网格 $\{t_0 = 0, t_1, \dots, t_N = T\}$ 上以固定或自适应时间步长 $\Delta t = t_{k+1} - t_k$ 重新计算并调整 Delta 头寸。这种离散化再平衡必然在组合净值与理论期权价值之间引入追踪误差。

考察在区间 $[t_k, t_{k+1}]$ 内的对冲损益。考虑一个包含一份多头期权 $V$ 与 $\Delta_k = \frac{\partial V}{\partial S}(S_{t_k}, t_k)$ 单位标的资产空头的离散对冲组合。记净对冲误差为 $\delta \Pi_k = \Delta V_k - \Delta_k \Delta S_k - r(V_k - \Delta_k S_{t_k})\Delta t$。利用二阶多元泰勒展开：
$$
\Delta V_k \approx \frac{\partial V}{\partial t}\Delta t + \frac{\partial V}{\partial S}\Delta S_k + \frac{1}{2}\frac{\partial^2 V}{\partial S^2}(\Delta S_k)^2.
$$
注意到一阶价格变动项 $\frac{\partial V}{\partial S}\Delta S_k = \Delta_k \Delta S_k$ 恰好被标的现货头寸的损益抵消，故组合的残余损益主要由时间衰减与二阶曲率主导：
$$
\delta \Pi_k \approx \Theta_k \Delta t + \frac{1}{2}\Gamma_k (\Delta S_k)^2 - r(V_k - \Delta_k S_{t_k})\Delta t.
$$
由稍后即将推导的 Black–Scholes 偏微分方程，期权的理论时间衰减精确满足 $\Theta_k = r V_k - r S_{t_k}\Delta_k - \frac{1}{2}\sigma^2 S_{t_k}^2 \Gamma_k$。将该关系代入离散误差展开，即得单步对冲误差的结构性分解：
$$
\delta \Pi_k \approx \frac{1}{2}\Gamma(S_{t_k}, t_k)\left[(\Delta S_k)^2 - \sigma^2 S_{t_k}^2 \Delta t\right].
$$
这一分解深刻揭示了离散 Delta 对冲误差的本质：对冲损益并非直接取决于标的资产的绝对价格漂移方向，而是取决于标的资产的实际二次变差 $(\Delta S_k)^2$ 与模型预期变差 $\sigma^2 S_{t_k}^2 \Delta t$ 之间的偏离。当标的资产的局部已实现变差高于预期时，由于多头期权享有正的 Gamma，组合将产生额外正收益；反之当局部波动平缓时，Gamma 收益无法弥补 Theta 的时间流逝损失。

**例 33.7**

在离散时间步长 $\Delta t = T/N$ 的等距网格上，考虑对标的资产服从几何布朗运动 $dS_t = \mu S_t dt + \sigma S_t dW_t$ 的欧式期权执行离散 Delta 对冲。试推导离散对冲累积方差在 $\Delta t\to 0$ 时的渐近阶数，并说明再平衡频率对交易摩擦与对冲精度的权衡约束。

**解**

在每个离散时间区间 $[t_k, t_{k+1}]$ 内，根据标的资产的对数正态性质，资产价格增量满足 $\Delta S_k = S_{t_k}(\mu \Delta t + \sigma \Delta W_k) + O(\Delta t)$。由标准正态增量性质 $\Delta W_k = \sqrt{\Delta t}\,\epsilon_k$（其中 $\epsilon_k\sim \mathcal{N}(0,1)$），取主导阶项计算平方：
$$
(\Delta S_k)^2 \approx \sigma^2 S_{t_k}^2 (\Delta W_k)^2 = \sigma^2 S_{t_k}^2 \Delta t\cdot \epsilon_k^2.
$$
将其代入单步对冲误差公式，得到
$$
\delta \Pi_k \approx \frac{1}{2}\sigma^2 S_{t_k}^2 \Gamma_k \Delta t\left(\epsilon_k^2 - 1\right).
$$
由于 $\epsilon_k \sim \mathcal{N}(0,1)$，其满足 $\mathbb E[\epsilon_k^2 - 1] = 0$，且其方差为
$$
\operatorname{Var}(\epsilon_k^2 - 1) = \mathbb E\left[(\epsilon_k^2 - 1)^2\right] = \mathbb E[\epsilon_k^4] - 2\mathbb E[\epsilon_k^2] + 1 = 3 - 2 + 1 = 2.
$$
由于不同区间的增量相互独立，累积总对冲误差的方差为各单步方差之和：
$$
\operatorname{Var}\left(\sum_{k=0}^{N-1}\delta \Pi_k\right) \approx \sum_{k=0}^{N-1}\frac{1}{4}\sigma^4 S_{t_k}^4 \Gamma_k^2 (\Delta t)^2\cdot 2 = \frac{1}{2}\Delta t \sum_{k=0}^{N-1}\sigma^4 S_{t_k}^4 \Gamma_k^2 \Delta t.
$$
当 $N\to \infty$ 即 $\Delta t\to 0$ 时，黎曼和收敛至黎曼积分：
$$
\lim_{\Delta t\to 0}\frac{1}{\Delta t}\operatorname{Var}\left(\sum_{k=0}^{N-1}\delta \Pi_k\right) = \frac{1}{2}\int_0^T \sigma^4 S_t^4 \Gamma(S_t, t)^2 dt.
$$
因此，累积离散对冲误差的标准差收敛阶数为 $O(\sqrt{\Delta t})$。

然而，若市场存在正比例交易成本系数 $c > 0$，每次再平衡需要买卖标的股票的换手数为 $|\Delta_{k+1} - \Delta_k| \approx \Gamma_k |\Delta S_k| \approx \Gamma_k \sigma S_{t_k}\sqrt{\Delta t}|\epsilon_k|$。累积期望交易成本为主导项之和：
$$
\sum_{k=0}^{N-1} c S_{t_k} |\Delta_{k+1} - \Delta_k| \sim c\sum_{k=0}^{N-1} \sigma S_{t_k}^2 \Gamma_k \sqrt{\Delta t}\cdot \mathbb E[|\epsilon_k|] = O\left(\frac{1}{\sqrt{\Delta t}}\right).
$$
随着再平衡频率趋于无穷大（$\Delta t\to 0$），跟踪误差方差以 $O(\Delta t)$ 趋向于零，但累计换手交易成本以 $O(1/\sqrt{\Delta t})$ 发散至无穷大。因此在实践中必须在跟踪误差方差与换手摩擦之间构建最优再平衡间隔。

### 33.6.4 Gamma 与 Theta 的权衡关系

在衍生品交易与做市对冲的微观层面，交易员最为核心的日常博弈发生在 Gamma（凸性收益）与 Theta（时间衰减）之间。这两个希腊字母之间并非各自独立的敏感度指标，而是通过基础偏微分方程紧密耦合在一起。

回顾本章 33.5.2 节中导出的 Black–Scholes 偏微分方程：
$$
\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - r V = 0.
$$
直接代入希腊字母的定义 $\Theta = \frac{\partial V}{\partial t}$、$\Delta = \frac{\partial V}{\partial S}$ 以及 $\Gamma = \frac{\partial^2 V}{\partial S^2}$，该方程可直接重写为关于希腊字母的精确线性代数关系式：
$$
\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + r S \Delta = r V.
$$
将利率贴现项移至等号右侧，整理得到无套利约束下的权衡恒等式：
$$
\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma = r(V - S\Delta).
$$
等式右端的 $V - S\Delta$ 恰好是对冲组合中的无风险现金或借贷资金沉淀，若将组合维持在 Delta 中性状态（即通过标的现货头寸消除一阶价格敏感度，使得组合净 $\Delta = 0$），则上述方程进一步退化为
$$
\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma = r V.
$$
若在短期高频交易中无风险利率 $r$ 的贴现效应可视为次要微扰项，该关系式清晰地简化为
$$
\Theta \approx -\frac{1}{2}\sigma^2 S^2 \Gamma.
$$
这一关系深刻揭示了无套利金融市场中“凸性与时间”的等价交换律：
1. **多头凸性与时间租金**：当投资者或做市商持有正 Gamma 头寸（$\Gamma > 0$，例如多头纯期权合约）时，标的资产的任何大幅波动（无论上涨还是下跌）都会通过泰勒二阶项 $\frac{1}{2}\Gamma (\Delta S)^2$ 贡献正向收益。然而，方程表明该正向收益绝非免费赠予，其代价是承担严格为负的 Theta（$\Theta < 0$），即每一天日历时间的流逝都会确定性地蚕食期权的内在价值。多头 Gamma 本质上是向市场支付每日的时间“保险费”，以博取标的资产大幅波动的凸性补偿。
2. **空头凸性与做空波动率**：反之，若交易员持有负 Gamma 头寸（$\Gamma < 0$，例如单纯卖出期权以收取权利金），其组合将享受每日持续稳定的正时间流逝现金流（$\Theta > 0$），但必须时刻承受底层资产一旦爆发单边巨幅波动或跳跃时所带来的二次方加速亏损风险。
3. **临近到期的奇异行为**：当期权临近到期（$\tau \to 0$）且标的资产恰好处于行权价附近的平值状态（$S\approx K$）时，$d_1\to 0$，公式中的分母 $\sqrt{\tau}$ 驱动 $\Gamma$ 与 $\Theta$ 同时向正无穷与负无穷急速发散。在这一极限状态下，Delta 对价格的极度敏感迫使做市商必须以接近无穷的频率进行巨量仓位倒买倒卖，极微小的时间流逝就会抹去期权剩余的大部分时间价值。这种现象在量化交易中被称为到期日 Gamma 风险（Pin Risk），是动态对冲最具挑战性的临界场景。

## 33.7 量化应用与模型局限

尽管 Black–Scholes–Merton 理论框架奠定了现代金融工程的基石，并在全球衍生品市场交易中充当着不可替代的通用计价语言，但其理想化的数学假设与现实金融资产的真实动力学之间存在深刻的结构性鸿沟。从学术推导走向工业级量化实践，首要任务是理解该模型如何被现实市场“反向映射”，以及它的根本局限性催生了怎样的理论扩展。

### 33.7.1 隐含波动率的定义与数值反解

在实际金融市场中，波动率 $\sigma$ 并不能像资产价格 $S$、执行价 $K$ 或期限 $\tau$ 那样被直接无争议地客观测量。真实市场通过撮合交易直接产生的是期权的成交价格。量化分析师反其道而行之：将 Black–Scholes 公式视为一个定价单调映射，将市场价格代回公式中反向解出的波动率参数。

**注记（隐含波动率的定义）**

设市场上行权价为 $K$、剩余到期期限为 $\tau$ 的欧式看涨期权公开市场交易价格为 $C^{\mathrm{mkt}}$。在无风险利率 $r$ 与标的现价 $S$ 给定时，若存在实数 $\sigma_{\mathrm{imp}} > 0$ 使得理论定价与市场价格精确一致：
$$
C_{\mathrm{BS}}(S, K, \tau, r, \sigma_{\mathrm{imp}}) = C^{\mathrm{mkt}},
$$
则称 $\sigma_{\mathrm{imp}}$ 为该期权合约的隐含波动率（Implied Volatility）。

关于隐含波动率解的存在性与唯一性，可严格由前面章节建立的数学性质得到保证：
1. **严格单调性**：对任意固定的 $S, K, \tau, r > 0$，映射 $\sigma \mapsto C_{\mathrm{BS}}(\sigma)$ 在正实轴 $(0, +\infty)$ 上处处可导，且其导数 Vega 满足
$$
\frac{\partial C_{\mathrm{BS}}}{\partial \sigma} = S\sqrt{\tau}\varphi(d_1) > 0.
$$
由于导数严格为正，价格函数关于波动率严格单调递增。
2. **渐近边界极限**：根据命题 33.19，当波动率趋向两端时，理论价格满足
$$
\lim_{\sigma\downarrow 0} C_{\mathrm{BS}}(\sigma) = (S - Ke^{-r\tau})^+, \qquad \lim_{\sigma\to +\infty} C_{\mathrm{BS}}(\sigma) = S.
$$
由微积分的严格单调连续函数介值定理，只要市场报价满足无套利的最弱充要边界条件，即期权价格严格高于其无套利内在下界且低于标的资产现价：
$$
(S - Ke^{-r\tau})^+ < C^{\mathrm{mkt}} < S,
$$
在开区间 $(0, +\infty)$ 内必然存在且仅存在唯一的正实数 $\sigma_{\mathrm{imp}}$ 满足方程。

由于累积正态分布函数包含超越积分，隐含波动率无法写出初等显式闭式解，必须通过数值求根算法进行反解。最标准的数值方法是 Newton–Raphson 迭代。利用显式求出的 Vega 作为雅可比导数，给定初始猜测值 $\sigma_0$，第 $n+1$ 步迭代格式为
$$
\sigma_{n+1} = \sigma_n - \frac{C_{\mathrm{BS}}(\sigma_n) - C^{\mathrm{mkt}}}{\mathcal{V}(\sigma_n)} = \sigma_n - \frac{C_{\mathrm{BS}}(\sigma_n) - C^{\mathrm{mkt}}}{S\sqrt{\tau}\varphi(d_1(\sigma_n))}.
$$
在平值期权附近，该算法展现出卓越的局部二次收敛性，通常经过 3 至 5 次迭代即可达到机器精度。然而在深度虚值或深度实值区域，$|d_1| \to +\infty$，导致 Vega 发生指数级衰减（$\varphi(d_1)\to 0$），在数值计算中容易触发除以极小数的溢出与数值震荡。因此在工程实现中，通常先采用基于渐近展开的初值估计，并设置二分法（Bisection）作为托底保护以保证全局收敛稳定性。

### 33.7.2 波动率微笑与偏斜对模型假设的否证

若 Black–Scholes 模型的假设完全符合客观现实，标的资产价格的对数收益应严格服从均值与方差随时间线性增长的单变量正态分布。在此理想情形下，同一标的资产在同一观测时刻、面向同一到期期限 $\tau$ 的所有不同行权价 $K$ 的期权，其反解出的隐含波动率应严格为一个水平常数，即 $\sigma_{\mathrm{imp}}(K, \tau) \equiv \sigma$。

然而，全球金融市场的经验观测彻底否决了这一理论推论：
1. **波动率微笑（Volatility Smile）**：在外汇期权市场以及早期商品衍生品市场中，横轴为行权价 $K$、纵轴为隐含波动率 $\sigma_{\mathrm{imp}}$ 的曲线普遍呈现两端翘起、中间平缓的 U 形结构，犹如微笑道。深度虚值看跌期权与深度虚值看涨期权的隐含波动率均显著高于平值期权。
2. **波动率偏斜（Volatility Skew / Smirk）**：自 1987 年 10 月全球股灾之后，全球主流股票指数与个股期权市场展现出不可逆转的单调向下倾斜形态。低行权价（深度价外看跌期权）的隐含波动率大幅飙升，而高行权价（深度价外看涨期权）的隐含波动率相对低迷，呈现出不对称的偏斜曲线。

这种经验形态对几何布朗运动模型的底层假设构成了决定性的经验否证：
1. **真实收益的肥尾性（Fat Tails）**：两端虚值期权在市场上的实际交易价格系统性高于 Black–Scholes 公式的理论预估。在无套利定价逻辑下，期权价格本质上是对到期收益的贴现期望，深度虚值期权价格过高直接意味着真实资产收益分布的尾部概率密度远厚于标准正态分布。换言之，金融市场发生极端偏离（巨额崩盘或极端暴涨）的真实概率，比单变量高斯分布所预测的水平高出数个数量级。
2. **不对称性与负偏度（Negative Skewness）**：股票市场的向下偏斜反映了资产对数收益的显著左偏。市场上存在对系统性崩盘尾部风险的强烈厌恶，投资机构愿意支付高额溢价买入深度虚值看跌期权作为资产组合的崩盘保险（Crash Insurance），这种供求失衡将下行区间的隐含波动率推升至极端水平。
3. **杠杆效应与波动率反馈（Leverage Effect）**：经典 Black–Scholes 模型假定扩散系数与价格水平完全脱钩。然而在公司金融层面，当公司股票价格大幅下跌时，企业债务市值相对固定，导致其负债权益比（财务杠杆）被动攀升，从而直接推升剩余股权的经营风险与波动率；在市场心理层面，价格暴跌引发流动性紧缩与恐慌抛售，形成价格下跌与波动率上升相互强化的负向相关性。

这一现实迫使现代量化金融彻底放弃了常参数 Black–Scholes 模型，转而将隐含波动率曲面 $(K, \tau) \mapsto \sigma_{\mathrm{imp}}(K, \tau)$ 视为市场状态的输入投影，并驱动了更为复杂的动态波动率模型的诞生。

### 33.7.3 随机波动率与局部波动率模型思想

为克服几何布朗运动的局限并内生复现市场观测到的波动率微笑与偏斜，现代连续时间金融衍生品定价体系分化出两大主导性的建模范式：局部波动率模型与随机波动率模型。

**1. 局部波动率模型（Local Volatility Model）**

由 Dupire 与 Derman–Kani 于 1994 年独立提出，该模型试图在保持市场完备性（单一布朗运动驱动）的前提下最大化模型的拟合能力。局部波动率假定扩散项虽然不是常数，但可以表达为标的资产当前价格 $S_t$ 与日历时间 $t$ 的确定性非线性函数 $\sigma_{\mathrm{loc}}(S_t, t)$。在风险中性测度下，标的价格过程满足一维扩散随机微分方程：
$$
dS_t = r S_t dt + \sigma_{\mathrm{loc}}(S_t, t) S_t dW_t.
$$
Dupire 的划时代贡献在于，他利用 Fokker–Planck（前向 Kolmogorov）偏微分方程，严格推导出了连接市场全期权价格曲面与未知局部波动率函数之间的解析反解恒等式。

**注记（Dupire 局部波动率方程）**

设市场上对于所有连续执行价 $K$ 与到期日 $T$ 的欧式看涨期权价格曲面 $C(S_0, K, T)$ 充分光滑且无静态套利。则标的资产在空间点 $K$ 与时刻 $T$ 的局部方差完全由市场看涨期权价格曲面各阶偏导数唯一确定：
$$
\sigma_{\mathrm{loc}}^2(K, T) = \frac{\frac{\partial C}{\partial T} + r K \frac{\partial C}{\partial K}}{\frac{1}{2} K^2 \frac{\partial^2 C}{\partial K^2}}.
$$

Dupire 方程的数学意义极为深刻：分母中的二阶偏导数 $\frac{\partial^2 C}{\partial K^2}$ 恰好是到期时刻标的资产边际风险中性概率密度函数（由 Breeden–Litzenberger 公式给出），而分子则整合了时间推进项与贴现漂移项。这意味着只要给定连续的欧式期权市场报价曲面，就存在唯一自洽的单因子马尔可夫扩散过程，能够完美无误差地校准所有已知期限和行权价的欧式期权。然而，局部波动率模型的致命缺陷在于其未来动力学失真：它预测的波动率微笑将随着时间流逝逐渐变平，且无法对冲奇异期权面对的波动率随机跳动风险。

**2. 随机波动率模型（Stochastic Volatility Model）**

为了更真实地刻画现实市场的动态演化，随机波动率模型引入第二个独立的布朗运动来驱动方差自身的演化。其中最为经典的行业标杆是 Heston (1993) 模型。在风险中性测度 $\mathbb Q$ 下，标的资产价格 $S_t$ 与其瞬时方差 $v_t$ 遵循二维耦合随机微分方程组：
$$
\begin{aligned}
dS_t &= r S_t dt + \sqrt{v_t} S_t dW_t^S, \\
dv_t &= \kappa(\theta - v_t)dt + \xi \sqrt{v_t} dW_t^v,
\end{aligned}
$$
其中 $W_t^S$ 与 $W_t^v$ 为具有常相关系数的标准布朗运动，满足 $d\langle W^S, W^v\rangle_t = \rho dt$。方程中各参数均具有明确的统计与金融机制：
- $\kappa > 0$ 代表方差向长期水平回归的速度（Mean Reversion Speed）；
- $\theta > 0$ 代表方差的长期均值水平（Long-term Variance）；
- $\xi > 0$ 代表方差过程自身的波动率（Volatility of Volatility）；
- 参数满足 Feller 条件 $2\kappa\theta > \xi^2$ 时，方差过程 $v_t$ 几乎必然严格为正且不会触及零吸收边界。

Heston 模型通过极其紧凑的几何结构完美再现了微笑与偏斜的成因：
- **负相关性 $\rho < 0$ 驱动偏斜**：当 $\rho < 0$ 时，标的资产价格的负向跳动往往伴随着瞬时方差的骤增，从而内生赋予资产收益分布极强的左偏特征，直接诱发了股票市场典型的单调向下波动率偏斜；
- **方差波动率 $\xi > 0$ 驱动微笑**：方差自身的剧烈随机扩散拉宽了资产价格的极端概率分布，使得对数收益呈现显著的肥尾与高超额峰度，从而在两端产生强烈的对称微笑翘起。
由于 Heston 模型在仿射变换下具有解析的特征函数，期权价格可以通过逆傅里叶变换高效计算，成为现代量化投资与复杂奇异衍生品对冲的主流底层模型。

### 33.7.4 美式期权数值方法

与欧式期权只能在约定到期日 $T$ 单点行权的刚性约束不同，美式期权（American Options）赋予持有者在到期日之前的任意时刻 $t\le \tau \le T$ 提前行权的权力。由于美式看跌期权以及存在离散现金分红资产的美式看涨期权具备显著的提前行权经济动机，其定价问题在数学上本质上构成了一个连续时间的最优停止时间问题（Optimal Stopping Problem）：
$$
V^{\mathrm{Amer}}(S, t) = \operatorname{ess\,sup}_{\tau \in \mathcal{T}_{[t, T]}} \mathbb E_{\mathbb Q}\left[e^{-r(\tau - t)} h(S_\tau) \,\Big|\, \mathcal{F}_t\right],
$$
其中 $\mathcal{T}_{[t, T]}$ 表示取值于闭区间 $[t, T]$ 的所有停时集合，$h(S) = (K - S)^+$ 为立即行权的收益函数。在空间与时间平面上，持有者的最优决策将状态空间严格划分为两部分：继续持有区域（Continuation Region，期权价值严格大于立即行权收益）与提前行权区域（Stopping Region，期权价值等于立即行权收益）。两者之间的自由边界（Free Boundary）$S^*(t)$ 随时间动态演化，导致该问题不存在通用的初等闭式解析解。

求解美式期权公允价值与行权边界必须依托严谨的数值计算方法，并与本书前述各计算模块深度交织：
1. **偏微分不等式与有限差分法（指向第25章）**：在偏微分方程视角下，美式期权价值函数 $V(S, t)$ 满足抛物型变分不等式（Variational Inequality）或线性互补问题（LCP）：
$$
\max\left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - r V,\; h(S) - V\right) = 0,
$$
且满足自由边界处的光滑粘贴条件（Smooth Pasting Condition）$\frac{\partial V}{\partial S}(S^*(t), t) = h'(S^*(t))$。在第 25 章建立的隐式有限差分网格上，每个时间倒退步均转化为求解带下界约束的二次型不等式系统，可直接借助第 17 章中的投影逐次超松弛迭代法（PSOR）或惩罚算法高效求解。
2. **多资产维度的最小二乘蒙特卡洛算法（LSM 方法，指向第17章）**：当标的资产拓展为多维资产组合时，网格差分法面临严重的“维数灾难”。Longstaff 与 Schwartz (2001) 提出的 LSM 算法将蒙特卡洛路径模拟与截面最小二乘回归创造性融合：在沿真实或风险中性测度前向模拟出数万条资产价格离散路径后，自到期日 $T$ 逆向时间回溯，在每个时间节点上仅针对处于实值状态的样本路径，利用第 17 章的正交基函数（如带权 Laguerre 多项式或切比雪夫多项式）对未来已折现延续价值进行最小二乘条件期望拟合，进而判断是否提前终止路径。

### 33.7.5 信用风险定价基本结构

Black–Scholes 衍生品定价思想的最辉煌扩展之一，在于将原本属于公司金融与固定收益领域的企业信用违约风险，彻底还原为期权契约结构。现代定量信用风险定价形成了以 Merton 结构化模型与约化强度模型为主体的理论大厦。

**1. Merton 结构化模型（Structural Model）**

由 Robert C. Merton 于 1974 年提出。考虑一家总资本由股权（Equity）与债权（Debt）构成的企业，设其整体总资产价值 $V_t$ 服从几何布朗运动：
$$
dV_t = r V_t dt + \sigma_V V_t dW_t,
$$
其中 $\sigma_V$ 为公司总资产波动率。设公司债务结构极其精炼：仅包含一张在到期日 $T$ 到期、约定本息总面值为 $D$ 的单笔零息公司债券。
考察到期时刻 $T$ 的偿付清算博弈：在有限责任公司法人的保护下，
- 若公司总资产充裕（$V_T \ge D$），公司管理层将足额偿付债权人本息面值 $D$，剩余的资产盈余全部归股东享有，此时股权终值为 $E_T = V_T - D$；
- 若公司总资产不足以抵偿债务（$V_T < D$），股东选择依法宣布企业破产重组，由于股东仅承担有限赔偿责任，股东利益清零，即 $E_T = 0$，同时将公司的全部残存资产 $V_T$ 全额清偿给债权人。

综合上述两种状态，在到期时刻 $T$，企业股权的市场公允价值精确满足：
$$
E_T = \max(V_T - D, 0) = (V_T - D)^+.
$$
这一等式揭示了一个划时代的结构性真理：**有限责任公司的股权，本质上等价于一份以公司整体资产 $V$ 为底层标的、以债务名义面值 $D$ 为行权价、以债务到期日 $T$ 为到期期限的欧式看涨期权！**
因此在 Black–Scholes 框架下，公司股权公允市场价值直接由定理 33.17 给出：
$$
E(V_t, t) = V_t N(d_1) - D e^{-r(T-t)} N(d_2),
$$
其中无量纲距离参数为
$$
d_1 = \frac{\ln(V_t/D) + (r + \frac{1}{2}\sigma_V^2)(T-t)}{\sigma_V\sqrt{T-t}}, \qquad d_2 = d_1 - \sigma_V\sqrt{T-t}.
$$
相应地，根据企业资产守恒恒等式 $V_t = E_t + B_t$，企业风险债券的市场公允现值 $B_t$ 为
$$
B_t = V_t - E_t = D e^{-r(T-t)} N(d_2) + V_t N(-d_1) = D e^{-r(T-t)} - \big(D e^{-r(T-t)} N(-d_2) - V_t N(-d_1)\big).
$$
上式后半部分恰好等于一份标的为 $V$、行权价为 $D$ 的欧式看跌期权。这意味着债权人持有带违约风险的公司债券，等价于持有一份无风险全额债券，同时向股东无偿卖出了一份看跌保护期权。在风险中性测度下，公司违约的理论概率为
$$
\mathbb Q(V_T < D) = \mathbb Q\left(\ln(V_T/V_t) < \ln(D/V_t)\right) = N(-d_2).
$$

**2. 约化强度模型（Reduced-form Model）**

与 Merton 模型需要精确重构公司未上市资产价值 $V$ 与资产波动率 $\sigma_V$ 不同，由 Jarrow–Turnbull 与 Duffie–Singleton 发展的约化模型放弃追踪公司微观资产负债表，将企业违约抽象为一个受外生瞬时危险率（Hazard Rate）或违约强度过程 $\lambda_t$ 调控的非齐次泊松跳跃过程的首达时刻 $\tau_D$。在已知无违约生存条件下，小时间区间 $[t, t+dt]$ 内发生违约的条件概率为 $\mathbb Q(\tau_D \le t+dt \,|\, \tau_D > t) = \lambda_t dt$。在强度模型中，违约债券的折现期望等价于将折现率从纯无风险利率 $r_t$ 修正为包含信用利差的复合折现率 $r_t + \lambda_t(1 - R)$（其中 $R$ 为违约回收率），使得信用违约互换（CDS）与复杂结构化分层债券的校准与定价高度贴近市场宏观报价。

### 33.7.6 模型风险与校准不确定性及应用分界

从数学理论向工业级工程落地推进时，量化从业者必须清醒地认识到任何定价模型都潜藏着固有的模型风险（Model Risk）。模型风险通常体现为三重层次：
1. **模型设定风险（Specification Risk）**：真实金融世界的资产价格过程充斥着离散跳跃、随机波动率、杠杆反馈与制度切换。试图用单一维度且方差固定的扩散方程捕捉复杂的金融现实，必然在面对极端市场行情时遭遇不可预测的模型崩溃。
2. **校准不适定性（Calibration Ill-posedness）**：在利用复杂的局部或随机波动率模型拟合离散市场报价时，优化目标函数往往存在高度非凸性与病态平坦的谷底。截然不同的参数组合可能在已知欧式期权曲面上达到极其接近的拟合均方误差，但在对外推的奇异期权（如障碍期权或棘轮期权）进行定价与动态对冲时，却会产生毁灭性的估值分歧。
3. **实现与计算误差（Implementation Risk）**：数值网格离散截断、边界反射条件设置以及高维蒙特卡洛模拟的有限样本方差，均会对微观希腊字母的稳定估计引入非系统性噪声。

与模型风险相对应的是现代量化金融中最为核心的方法论分界：衍生品定价对冲与宏观风险度量之间的二元分立。

**注记（定价与风险管理的不同用途）**

量化金融在数学上严格划分为两个不同目标的世界：
1. **风险中性测度 $\mathbb Q$ 下的相对定价与对冲**：衍生品交易台的核心目标是寻找复制对冲组合。在无套利假定下，所有资产期望回报率均被无风险利率 $r$ 所置换，真实世界中的预期收益率 $\mu$ 在定价公式中完全隐去。模型参数并非用来“预测未来”，而是用来反解市场当前隐含的风险溢价，以计算局部敏感度（希腊字母）并消除局部敞口。
2. **物理客观测度 $\mathbb P$ 下的绝对损失与资本度量**：宏观风险管理部门与资产配置量化团队的核心目标是评估在真实历史与前瞻情景下资产组合的绝对潜在损失。在真实测度 $\mathbb P$ 下，资产客观的期望收益率 $\mu$、真实的肥尾偏度以及不可对冲的系统性市场风险必须被全面保留。巴塞尔监管协议下的在险价值（VaR）与预期短缺（Expected Shortfall）度量，完全依托于真实测度下的统计推断。

将风险中性测度与物理测度混为一谈是初学者最常犯的严重错误。例如在信贷衍生品中，由期权反解得出的风险中性违约概率必然显著高于由评级机构统计得出的真实历史违约率，这一差值精确体现了市场为系统性崩盘风险所要求的高额风险厌恶溢价。

**例 33.8**

某上市公司当前资产总现值 $V_0 = 100$ 亿元，其总资产波动率测算为 $\sigma_V = 0.25$。公司在时刻 $T = 1$ 年后有一笔面值为 $D = 80$ 亿元的单一零息债务到期。市场无风险连续复利利率为 $r = 0.05$。假设在真实物理测度 $\mathbb P$ 下，该公司的总资产期望年化增长率为 $\mu = 0.15$。试在 Merton 结构化模型框架下求解：
1. 公司股权在时刻 0 的理论公允市场价值 $E_0$；
2. 公司在风险中性测度 $\mathbb Q$ 下的隐含违约概率 $\mathbb Q(V_1 < D)$，以及在真实物理测度 $\mathbb P$ 下的客观违约概率 $\mathbb P(V_1 < D)$，并说明二者产生数值偏差的数学机制。

**解**

首先求解风险中性测度 $\mathbb Q$ 下的股权公允价值。在 Merton 模型中，股权等价于以公司资产为标的、以债务面值为行权价的 1 年期欧式看涨期权。计算无量纲参数：
$$
\begin{aligned}
d_1 &= \frac{\ln(V_0/D) + (r + \frac{1}{2}\sigma_V^2)T}{\sigma_V\sqrt{T}} = \frac{\ln(100/80) + (0.05 + \frac{1}{2}\times 0.25^2)\times 1}{0.25\times 1} \\
&= \frac{0.22314 + (0.05 + 0.03125)}{0.25} = \frac{0.30439}{0.25} \approx 1.2176, \\
d_2 &= d_1 - \sigma_V\sqrt{T} = 1.2176 - 0.25 = 0.9676.
\end{aligned}
$$
查标准正态分布累积概率表：$N(d_1) = N(1.2176) \approx 0.8883$，$N(d_2) = N(0.9676) \approx 0.8334$。贴现因子为 $e^{-rT} = e^{-0.05} \approx 0.9512$。
由定理 33.17，股权理论市场价值为
$$
E_0 = V_0 N(d_1) - D e^{-rT} N(d_2) \approx 100\times 0.8883 - 80\times 0.9512\times 0.8334 \approx 88.83 - 63.42 = 25.41.
$$
因此股权理论价值为 25.41 亿元，进而公司债权当前公允现值为 $B_0 = V_0 - E_0 = 100 - 25.41 = 74.59$ 亿元。

接着计算两种不同概率测度下的到期违约概率。到期违约事件等价于 $V_1 < D$。
在风险中性测度 $\mathbb Q$ 下，资产满足 $d\ln V_t = (r - \frac{1}{2}\sigma_V^2)dt + \sigma_V dW_t^{\mathbb Q}$，因此风险中性违约概率直接由 $N(-d_2)$ 给出：
$$
\mathbb Q(V_1 < D) = N(-d_2) = N(-0.9676) = 1 - N(0.9676) \approx 1 - 0.8334 = 0.1666 \approx 16.66\%.
$$
而在真实物理测度 $\mathbb P$ 下，资产真实漂移率为 $\mu = 0.15$。此时 $\ln(V_1/V_0)$ 服从均值为 $(\mu - \frac{1}{2}\sigma_V^2)T$、方差为 $\sigma_V^2 T$ 的正态分布。记物理测度下的无量纲距离为 $d_2^{\mathbb P}$：
$$
d_2^{\mathbb P} = \frac{\ln(V_0/D) + (\mu - \frac{1}{2}\sigma_V^2)T}{\sigma_V\sqrt{T}} = \frac{0.22314 + (0.15 - 0.03125)}{0.25} = \frac{0.34189}{0.25} \approx 1.3676.
$$
由此得出真实物理测度下的客观违约概率：
$$
\mathbb P(V_1 < D) = N(-d_2^{\mathbb P}) = N(-1.3676) = 1 - N(1.3676) \approx 1 - 0.9143 = 0.0857 \approx 8.57\%.
$$
两者的比较清晰地显示：风险中性违约概率（$16.66\%$）几乎是真实客观违约概率（$8.57\%$）的两倍之多。数学机制在于测度变换（Girsanov 定理）将真实的物理漂移率 $\mu$ 替换为较低的无风险基准利率 $r$。这在经济学上极为自然：风险中性测度内在地包含了市场对违约系统性风险的厌恶溢价，导致其风险中性资产估值显著低于客观物理期望，从而推高了模型计算得出的虚拟违约概率。

## 本章小结

本章系统构建了现代金融数学与衍生品量化定价的理论大厦，展示了从离散测度论到连续时间随机分析的严密推演链条。资产定价第一与第二基本定理确立了无套利金融经济学的核心基石：离散或连续市场中不存在套利机会等价于存在至少一个等价鞅测度，而该测度的唯一性则充要对应于市场的完备性，即一切或有索取权均可由基础资产组合通过动态自融资策略完全复制。这一理论消解了传统对客观期望收益率的主观猜测，将衍生品定价牢固确立在相对复制与无套利约束之上。

在连续时间分析框架中，自融资策略与财富过程的贴现鞅性质构成了联系随机分析与偏微分方程的桥梁。通过引入 Girsanov 测度变换定理，资产客观漂移率中的市场风险溢价被严密滤除，从而将微观对冲组合的无风险演化转化为风险中性测度下的鞅过程。在 Black–Scholes 经典设定下，无论是通过无风险对冲组合与 Itô 公式推导出的二阶抛物型偏微分方程，还是依托 Feynman–Kac 定理构造的条件期望表示，最终均汇聚于极具对称美感的 Black–Scholes 闭式期权定价公式。深入分析表明，期权的时间价值来源于标的资产的凸性暴露，且看跌看涨平价关系构成了跨越具体分布模型的无套利结构约束。

希腊字母体系将静态定价公式升华为动态风险对冲的操作指南。Delta、Gamma、Vega、Theta 与 Rho 的严谨解析推导展现了微观风险敞口的内在联动机制，其中 Black–Scholes 方程直接导出了 Gamma 凸性收益与 Theta 时间衰减之间的零和权衡。在工程落地层面，离散时间再平衡不可避免地在二次变差偏离处引入跟踪误差方差，迫使量化交易员在交易摩擦成本与对冲精度之间寻求帕累托平衡。

最后，本章探讨了该理论框架走向工业实务时的经验困境与扩展范式。真实金融市场中普遍存在的波动率微笑与偏斜，彻底否决了对数收益正态分布与恒定波动率假设，催生了以 Dupire 局部波动率曲面反解与 Heston 随机波动率扩散为代表的高阶动力学模型。与此同时，美式期权的最优停止自由边界问题将连续金融与有限差分、变分不等式及最小二乘蒙特卡洛数值算法紧密联结，而 Merton 结构模型则以极其优美的方式将企业有限责任股权还原为资产看涨期权。全章最终落脚于风险中性相对定价测度与物理绝对风险度量测度的严格分野，为后续章节开展量化投资策略的统计检验、执行算法设计与宏观风控评估奠定了坚实的数理基石。

## 习题

1. 在单期有限离散状态空间金融市场模型中，给出第一类套利机会（无成本获得非负且有正概率为正的收益）与第二类套利机会（负成本获得几乎必然非负的收益）的形式化测度论定义，并证明在无摩擦市场中这两类套利定义等价。
2. 在有限离散状态空间 $(\Omega, \mathcal{F}, \mathbb P)$ 框架下，利用凸分析中的超平面分离定理（或 Farkas 引理），严格证明资产定价第一基本定理：市场不存在套利机会当且仅当存在至少一个与物理测度 $\mathbb P$ 等价的鞅测度 $\mathbb Q$。
3. 紧接上题设定，证明资产定价第二基本定理：在无套利成立的前提下，金融市场是完备的（即任意或有索取权均可被自融资组合完美复制）当且仅当等价鞅测度 $\mathbb Q$ 存在且唯一。
4. 设单期市场由两种基础资产和三个互斥状态构成，已知其市场价格向量与支付矩阵。构造一个无法由基础资产复制的欧式看涨衍生品，并利用对偶线性规划方法推导其无套利价格上界与下界构成的无套利价格区间 $[C_{\min}, C_{\max}]$。
5. 设多维标的资产价格向量为 $\boldsymbol{S}_t$，无风险储蓄账户为 $B_t = e^{rt}$，自融资策略持仓向量为 $\boldsymbol{\theta}_t$。利用 Itô 分部积分公式，证明连续时间策略满足自融资条件当且仅当贴现总财富过程 $e^{-rt}V_t$ 满足随机积分方程 $e^{-rt}V_t = V_0 + \int_0^t \boldsymbol{\theta}_u^\top d(e^{-ru}\boldsymbol{S}_u)$。
6. 设标的资产价格在客观物理测度 $\mathbb P$ 下满足 $dS_t = \mu S_t dt + \sigma S_t dW_t^{\mathbb P}$。构造似然比鞅过程 $\eta_t = \exp\left(-\gamma W_t^{\mathbb P} - \frac{1}{2}\gamma^2 t\right)$ 并令 $\gamma = (\mu - r)/\sigma$。证明 $\eta_t$ 满足 Novikov 条件，并运用 Girsanov 定理证明贴现资产价格过程 $e^{-rt}S_t$ 在等价测度 $\mathbb Q$ 下几乎必然为局部鞅。
7. 设欧式期权理论价值函数 $V(S_t, t)$ 属于 $C^{2,1}$ 类光滑函数。构建包含一份期权与 $\Delta_t$ 单位标的资产空头的瞬时无风险对冲组合 $\Pi_t = V(S_t, t) - \Delta_t S_t$。利用 Itô 公式展开 $dV$，详细推导演示如何通过选择 $\Delta_t$ 严格消除对冲组合中的布朗运动扩散项，并结合无套利资本回报约束导出 Black–Scholes 偏微分方程。
8. 运用 Itô 积分展开贴现期权价值过程 $e^{-rt}V(S_t, t)$。证明若多元函数 $V(S, t)$ 满足 Black–Scholes 偏微分方程及其终值边界条件 $V(S, T) = h(S)$，则该贴现过程在风险中性测度 $\mathbb Q$ 下几乎必然为鞅，进而严格推导出 Feynman–Kac 条件期望表示 $V(S_t, t) = \mathbb E_{\mathbb Q}\left[e^{-r(T-t)} h(S_T) \,\Big|\, \mathcal{F}_t\right]$。
9. 在风险中性测度 $\mathbb Q$ 下，已知标的资产到期价格服从对数正态分布。通过对一维高斯积分 $\int_{\ln(K/S_t)}^{+\infty} (S_t e^y - K)\frac{1}{\sqrt{2\pi\sigma^2\tau}}\exp\left(-\frac{(y - (r - \frac{1}{2}\sigma^2)\tau)^2}{2\sigma^2\tau}\right)dy$ 实施积分变量替换与配方分离，完整推导出 Black–Scholes 欧式看涨期权定价公式，并展示正态累积分布项 $N(d_1)$ 与 $N(d_2)$ 的解析来源。
10. 利用欧式期权 Black–Scholes 公式及其渐近展开性质，证明当行权价 $K\downarrow 0$ 时，欧式看涨期权价值满足 $\lim_{K\downarrow 0} C(S, \tau) = S$，欧式看跌期权价值满足 $\lim_{K\downarrow 0} P(S, \tau) = 0$；并结合有限责任资产特征从金融经济学直觉解释该极限的必然性。
11. 设标的资产持续支付连续股息率 $q \ge 0$。通过构建买入看涨、卖出看跌、买入贴现现金及卖空股息资产的静态组合，证明广义看跌看涨平价关系 $C_t - P_t = S_t e^{-q(T-t)} - K e^{-r(T-t)}$，并由此求解标的资产远期合约（Forward Contract）在时刻 $t$ 的无套利远期理论价格 $F(t, T)$。

12. 对欧式看涨期权定价公式关于标的资产波动率 $\sigma$ 求一阶偏导数，利用基础恒等式 $S\varphi(d_1) = K e^{-r\tau}\varphi(d_2)$，完整推导其波动率敏感度 Vega 的显式闭式解 $\mathcal{V} = S\sqrt{\tau}\varphi(d_1)$，并证明欧式看跌期权具有严格相等的 Vega 表达式。
13. 设某无红利标的欧式衍生品价值函数为 $V(S, t)$。直接代入 Black–Scholes 偏微分方程，证明其希腊字母严格满足代数关系式 $\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + r S \Delta = r V$。并据此说明当组合处于 Delta 中性且利率贴现可忽略时，期权多头为何必须通过承受负向时间衰减损失（$\Theta < 0$）来支付正向曲率收益（$\Gamma > 0$）的“时间租金”。
14. 在标的资产服从几何布朗运动假定下，考虑时间步长为 $\Delta t$ 的离散 Delta 对冲策略。利用 Itô 公式推导区间 $[t_k, t_{k+1}]$ 内的单步跟踪误差展开式，并证明累积总对冲误差的方差在 $\Delta t \to 0$ 时具有渐近收敛阶数 $O(\Delta t)$。
15. 给定标的参数 $S, K, \tau, r > 0$。证明 Black–Scholes 欧式看涨期权价格函数 $\sigma \mapsto C_{\mathrm{BS}}(\sigma)$ 在定义域 $(0, +\infty)$ 上严格凸且严格单调递增，并利用连续函数介值定理证明：当且仅当市场成交价满足无套利界限 $(S - K e^{-r\tau})^+ < C^{\mathrm{mkt}} < S$ 时，市场上存在唯一的正实数隐含波动率 $\sigma_{\mathrm{imp}}$。
16. 写出由欧式期权市场价格 $C^{\mathrm{mkt}}$ 反解隐含波动率 $\sigma_{\mathrm{imp}}$ 的 Newton–Raphson 迭代格式。证明在平值期权附近该算法具有局部二次收敛速度，并分析当期权处于极度虚值状态（$|d_1| \gg 1$）时该数值方法出现数值震荡与发散的数学根源。
17. 假设标的资产的对数收益具有负偏度（Negative Skewness）与超额峰度（Excess Kurtosis）。利用无模型风险中性矩展开或特征函数方法，定性并定量解释为何股票指数期权市场普遍呈现低行权价隐含波动率显著高于高行权价的单调向下“偏斜”（Skew）形态。
18. 设全期限与全行权价的欧式看涨期权价格曲面 $C(K, T)$ 充分光滑。利用标的资产概率密度的前向 Fokker–Planck 方程与 Breeden–Litzenberger 边际密度公式 $\frac{\partial^2 C}{\partial K^2} = e^{-rT} p(K, T)$，完整推导 Dupire 局部方差表达式 $\sigma_{\mathrm{loc}}^2(K, T) = \frac{\frac{\partial C}{\partial T} + r K \frac{\partial C}{\partial K}}{\frac{1}{2} K^2 \frac{\partial^2 C}{\partial K^2}}$。
19. 在 Heston 随机波动率模型中，标的资产价格与瞬时方差由相关系数为 $\rho$ 的布朗运动驱动。简述通过仿射变换求解其对数价格特征函数 $\phi(u) = \mathbb E_{\mathbb Q}[e^{iu \ln S_T}]$ 的 Riccati 常微分方程系统的基本步骤，并说明相关系数 $\rho < 0$ 为何在经济上对应于负向杠杆效应。
20. 写出无红利标的资产上美式看跌期权公允价值 $P^{\mathrm{Amer}}(S, t)$ 满足的线性互补问题（LCP）与自由边界光滑粘贴条件（Smooth Pasting Condition），并说明若在自由边界处导数不连续（发生扭折），为何会导致局部存在套利机会。
21. 某科技企业资产总市值 $V_0 = 200$ 亿元，年化资产波动率 $\sigma_V = 0.30$。公司现有面值为 $D = 150$ 亿元的 2 年期单一零息债券，市场无风险利率为 $r = 0.04$。运用 Merton 结构模型，计算该企业股权在时刻 0 的理论价值 $E_0$、债权价值 $B_0$，以及 2 年后的风险中性违约概率 $\mathbb Q(V_2 < D)$。
22. 深入辨析衍生品定价对冲中风险中性测度 $\mathbb Q$ 与宏观风险计量中物理测度 $\mathbb P$ 的本质区别。说明为何在压力测试与巴塞尔协议资本计提中不能直接使用由隐含波动率曲面校准出的分布，并讨论量化模型在校准奇异期权时产生“参数不适定性”的模型风险防范机制。
