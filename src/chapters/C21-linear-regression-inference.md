# 第21章　线性回归、投影与统计推断

第13章把条件期望 $\mathbb E[Y\mid\mathcal G]$ 确立为给定信息下均方误差最小的预测，并证明了在线性预测类中，最优者由正交性条件唯一刻画。第5章则从纯代数的角度给出投影定理：Hilbert 空间中任一点到一个闭子空间的距离存在唯一的最小值点，且该点由「差向量与子空间正交」这一条件完全确定。线性回归正是这两条线索的交汇处。当我们不追求真实的条件期望函数，而只用解释变量的线性组合 $\boldsymbol x^\top\boldsymbol\beta$ 去逼近它时，最优逼近系数由一个有限维的正交投影问题给出；而当我们承认观测含有随机误差时，这个投影的系数本身成为随机向量，于是又产生估计量的分布、无偏性与有效性等统计问题。本片段把这两个层面分开处理：先在线性代数层面建立最小二乘估计的几何结构，再在概率论层面研究它的抽样性质。

线性回归在量化研究中的地位无须强调。资本资产定价模型中的 beta 是一次时间序列回归的斜率；多因子模型的载荷与因子收益分别来自时间序列回归与横截面回归；事件研究把超额收益对事件窗虚拟变量回归；信号构建中把未来收益对当期特征回归，以检验特征的预测能力。这些应用共享同一套代数与同一套推断理论，而其可靠性都取决于模型假设在多大程度上成立。本章后几节（21.4 至 21.8）处理假设检验、多重共线性、假设违背的诊断、广义最小二乘与量化研究中的具体用法；本节与以下两节集中在模型设定、几何结构与抽样分布三件事上，其中 Gauss–Markov 定理与 $\sigma^2$ 的无偏估计是后续全部推断的基石。

## 21.1 线性回归模型与最小二乘

设我们观测到被解释变量 $y$ 的 $n$ 个取值与 $p$ 个解释变量（含可能的常数项）的对应取值。把它们堆叠成向量与矩阵：$\boldsymbol y=(y_1,\dots,y_n)^\top\in\mathbb R^n$，设计矩阵 $\boldsymbol X\in\mathbb R^{n\times p}$ 的第 $i$ 行 $\boldsymbol x_i^\top=(x_{i1},\dots,x_{ip})$ 是第 $i$ 次观测的解释变量取值，未知参数向量 $\boldsymbol\beta=(\beta_1,\dots,\beta_p)^\top\in\mathbb R^p$，随机误差向量 $\boldsymbol\varepsilon=(\varepsilon_1,\dots,\varepsilon_n)^\top\in\mathbb R^n$。

**定义 21.1（线性回归模型与经典假设）**

称
$$
\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon \tag{21.1}
$$
为经典线性回归模型，若下列假设成立：

1. （A1，列满秩）$\operatorname{rank}(\boldsymbol X)=p\le n$，即 $\boldsymbol X$ 的 $p$ 个列向量线性无关；
2. （A2，零均值）$\mathbb E[\boldsymbol\varepsilon]=\boldsymbol 0$；
3. （A3，同方差与不相关）$\operatorname{Cov}(\boldsymbol\varepsilon)=\mathbb E[\boldsymbol\varepsilon\boldsymbol\varepsilon^\top]=\sigma^2\boldsymbol I_n$，其中 $0<\sigma^2<\infty$ 未知；
4. （A4，设计矩阵外生）$\boldsymbol X$ 为非随机矩阵；若 $\boldsymbol X$ 随机，则本章所有结论均在给定 $\boldsymbol X$ 的条件下理解。

假设 A1 排除了「完全多重共线性」。它有两层含义：一是每个参数都被数据唯一识别，二是任何一列都不能由其余各列线性表出。在实际数据中，若某个因子恰好是另两个因子的线性组合（例如同时放入总市值、流通市值与二者之差），A1 就被破坏，正规方程的系数矩阵不可逆，最小二乘解不再唯一。假设 A2 与 A3 合起来说误差是「球对称」的：均值为零、方差处处相同、两两不相关。A2 保证了最小二乘估计的无偏性；A3 中的同方差与不相关两部分共同保证了它的有效性，即 Gauss–Markov 定理（定理 21.8）。当 A3 被破坏时（金融数据中极为常见：收益率的方差随时间聚集，残差存在自相关），最小二乘估计仍然无偏，但不再是最小方差，且常规标准误会严重低估真实抽样波动；相应的诊断与修正见 21.6 与 21.7。

需要强调的是，定义 21.1 中**没有**正态性假设。误差的正态分布只在做精确的 $t$ 检验与 $F$ 检验时才需要，我们把它单列为 A5 并在 21.3 末尾引入；在此之前得到的所有代数结论与方差结论都只依赖 A1 至 A4。这一区分在应用中很重要：正态性往往是金融数据最站不住脚的假设，而最小二乘估计的无偏性与 Gauss–Markov 有效性并不受其影响。

模型（21.1）中的 $\boldsymbol X\boldsymbol\beta$ 是 $\boldsymbol X$ 的列空间 $\mathcal L=\operatorname{col}(\boldsymbol X)=\{\boldsymbol X\boldsymbol b:\boldsymbol b\in\mathbb R^p\}\subset\mathbb R^n$ 中的一个向量。最小二乘的思想是：既然误差不可观测，就用「观测向量与列空间之间的距离」来代替它，选取使该距离最小的 $\boldsymbol b$。于是定义目标函数
$$
S(\boldsymbol b)=\lVert\boldsymbol y-\boldsymbol X\boldsymbol b\rVert^2=(\boldsymbol y-\boldsymbol X\boldsymbol b)^\top(\boldsymbol y-\boldsymbol X\boldsymbol b)=\sum_{i=1}^n\bigl(y_i-\boldsymbol x_i^\top\boldsymbol b\bigr)^2, \tag{21.2}
$$
并寻求 $\hat{\boldsymbol\beta}=\arg\min_{\boldsymbol b\in\mathbb R^p}S(\boldsymbol b)$。几何上，$\mathcal L$ 是 $\mathbb R^n$ 中一个 $p$ 维子空间，因而闭；由第5章的投影定理，存在唯一的 $\hat{\boldsymbol y}\in\mathcal L$ 使 $\lVert\boldsymbol y-\hat{\boldsymbol y}\rVert$ 最小，且它由正交性条件 $\boldsymbol y-\hat{\boldsymbol y}\perp\mathcal L$ 刻画。下面的定理把这一几何事实翻译成可计算的代数公式，并给出两条完全独立的证明路径。

**定理 21.2（正规方程与最小二乘解的存在唯一性）**

设 A1 成立。则目标函数（21.2）在 $\mathbb R^p$ 上有唯一的最小值点，它是正规方程
$$
\boldsymbol X^\top\boldsymbol X\,\hat{\boldsymbol\beta}=\boldsymbol X^\top\boldsymbol y
$$
的唯一解，显式地
$$
\hat{\boldsymbol\beta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y. \tag{21.3}
$$
等价地，$\hat{\boldsymbol\beta}$ 是使残差与设计矩阵正交的唯一向量：$\boldsymbol X^\top(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})=\boldsymbol 0$。

**证明**

分三步进行，前两步是几何路径，第三步是求导路径。

第一步，证明 Gram 矩阵 $\boldsymbol X^\top\boldsymbol X$ 对称正定因而可逆。对称性是直接的：$(\boldsymbol X^\top\boldsymbol X)^\top=\boldsymbol X^\top(\boldsymbol X^\top)^\top=\boldsymbol X^\top\boldsymbol X$。对任意 $\boldsymbol a\in\mathbb R^p$，
$$
\boldsymbol a^\top\boldsymbol X^\top\boldsymbol X\boldsymbol a=(\boldsymbol X\boldsymbol a)^\top(\boldsymbol X\boldsymbol a)=\lVert\boldsymbol X\boldsymbol a\rVert^2\ge 0,
$$
且等号成立当且仅当 $\boldsymbol X\boldsymbol a=\boldsymbol 0$。由 A1，$\boldsymbol X$ 的列线性无关，故 $\boldsymbol X\boldsymbol a=\boldsymbol 0$ 蕴含 $\boldsymbol a=\boldsymbol 0$；因此对一切 $\boldsymbol a\neq\boldsymbol 0$ 有 $\boldsymbol a^\top\boldsymbol X^\top\boldsymbol X\boldsymbol a>0$，即正定。正定矩阵的特征值全为正数，而行列式等于特征值之积，故 $\det(\boldsymbol X^\top\boldsymbol X)>0$，矩阵可逆，式（21.3）右端有意义。反过来，若 $\operatorname{rank}(\boldsymbol X)<p$，则存在 $\boldsymbol a\neq\boldsymbol 0$ 使 $\boldsymbol X\boldsymbol a=\boldsymbol 0$，于是 $\boldsymbol X^\top\boldsymbol X\boldsymbol a=\boldsymbol 0$，矩阵奇异。这说明 A1 不仅充分，也是 $(\boldsymbol X^\top\boldsymbol X)^{-1}$ 存在所必需的；顺带得到一般的秩等式 $\operatorname{rank}(\boldsymbol X^\top\boldsymbol X)=\operatorname{rank}(\boldsymbol X)$。

第二步，证明式（21.3）给出的向量确实最小化 $S$ 且唯一。记 $\hat{\boldsymbol\varepsilon}=\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta}$。直接代入计算
$$
\boldsymbol X^\top\hat{\boldsymbol\varepsilon}=\boldsymbol X^\top\boldsymbol y-\boldsymbol X^\top\boldsymbol X\hat{\boldsymbol\beta}=\boldsymbol X^\top\boldsymbol y-\boldsymbol X^\top\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y=\boldsymbol X^\top\boldsymbol y-\boldsymbol X^\top\boldsymbol y=\boldsymbol 0.
$$
这表明 $\hat{\boldsymbol\varepsilon}$ 与 $\boldsymbol X$ 的每一列都正交；由于 $\mathcal L=\operatorname{col}(\boldsymbol X)$ 中任一向量都是这些列的线性组合，而内积关于第二个变量是线性的，故 $\hat{\boldsymbol\varepsilon}\perp\mathcal L$。现在对任意 $\boldsymbol b\in\mathbb R^p$ 令 $\boldsymbol d=\hat{\boldsymbol\beta}-\boldsymbol b$，则
$$
\boldsymbol y-\boldsymbol X\boldsymbol b=(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})+\boldsymbol X(\hat{\boldsymbol\beta}-\boldsymbol b)=\hat{\boldsymbol\varepsilon}+\boldsymbol X\boldsymbol d,
$$
其中 $\hat{\boldsymbol\varepsilon}\perp\boldsymbol X\boldsymbol d$（因为 $\boldsymbol X\boldsymbol d\in\mathcal L$）。由勾股定理，
$$
S(\boldsymbol b)=\lVert\hat{\boldsymbol\varepsilon}+\boldsymbol X\boldsymbol d\rVert^2=\lVert\hat{\boldsymbol\varepsilon}\rVert^2+\lVert\boldsymbol X\boldsymbol d\rVert^2=S(\hat{\boldsymbol\beta})+\lVert\boldsymbol X(\hat{\boldsymbol\beta}-\boldsymbol b)\rVert^2\ge S(\hat{\boldsymbol\beta}).
$$
等号成立当且仅当 $\boldsymbol X(\hat{\boldsymbol\beta}-\boldsymbol b)=\boldsymbol 0$，再由 A1 当且仅当 $\boldsymbol b=\hat{\boldsymbol\beta}$。于是 $\hat{\boldsymbol\beta}$ 是唯一的最小值点。这一步同时说明：$\hat{\boldsymbol y}=\boldsymbol X\hat{\boldsymbol\beta}$ 恰是 $\boldsymbol y$ 在闭子空间 $\mathcal L$ 上的正交投影，最小二乘无非是第5章投影定理在有限维情形的坐标表达，而正交性条件 $\boldsymbol X^\top\hat{\boldsymbol\varepsilon}=\boldsymbol 0$ 就是投影定理中「差向量垂直于子空间」的矩阵写法。

第三步，用求导给出独立的证明。把（21.2）展开：
$$
S(\boldsymbol b)=\boldsymbol y^\top\boldsymbol y-\boldsymbol y^\top\boldsymbol X\boldsymbol b-\boldsymbol b^\top\boldsymbol X^\top\boldsymbol y+\boldsymbol b^\top\boldsymbol X^\top\boldsymbol X\boldsymbol b=\boldsymbol y^\top\boldsymbol y-2\boldsymbol b^\top\boldsymbol X^\top\boldsymbol y+\boldsymbol b^\top\boldsymbol X^\top\boldsymbol X\boldsymbol b,
$$
两个交叉项合并是因为它们都是标量且互为转置：$(\boldsymbol y^\top\boldsymbol X\boldsymbol b)^\top=\boldsymbol b^\top\boldsymbol X^\top\boldsymbol y$，而标量等于自身的转置。$S$ 是 $\boldsymbol b$ 的多项式函数，处处可微。由矩阵微分法则 $\partial(\boldsymbol b^\top\boldsymbol v)/\partial\boldsymbol b=\boldsymbol v$ 与 $\partial(\boldsymbol b^\top\boldsymbol A\boldsymbol b)/\partial\boldsymbol b=(\boldsymbol A+\boldsymbol A^\top)\boldsymbol b$（当 $\boldsymbol A$ 对称时即 $2\boldsymbol A\boldsymbol b$）得
$$
\frac{\partial S}{\partial\boldsymbol b}=-2\boldsymbol X^\top\boldsymbol y+2\boldsymbol X^\top\boldsymbol X\boldsymbol b,\qquad \frac{\partial^2S}{\partial\boldsymbol b\,\partial\boldsymbol b^\top}=2\boldsymbol X^\top\boldsymbol X.
$$
极小值的必要条件是梯度为零，这正是正规方程 $\boldsymbol X^\top\boldsymbol X\boldsymbol b=\boldsymbol X^\top\boldsymbol y$；由第一步其系数矩阵可逆，故驻点唯一，即式（21.3）。又 Hessian 矩阵 $2\boldsymbol X^\top\boldsymbol X$ 正定，$S$ 是严格凸函数，唯一驻点必为唯一全局最小点，无需再检验边界（$\mathbb R^p$ 无边界，且 $S(\boldsymbol b)\to\infty$ 当 $\lVert\boldsymbol b\rVert\to\infty$）。

最后验证一个把两条路径统一起来的恒等式：
$$
S(\boldsymbol b)=S(\hat{\boldsymbol\beta})+(\boldsymbol b-\hat{\boldsymbol\beta})^\top\boldsymbol X^\top\boldsymbol X(\boldsymbol b-\hat{\boldsymbol\beta}).
$$
展开右端第二项得 $\boldsymbol b^\top\boldsymbol X^\top\boldsymbol X\boldsymbol b-2\boldsymbol b^\top\boldsymbol X^\top\boldsymbol X\hat{\boldsymbol\beta}+\hat{\boldsymbol\beta}^\top\boldsymbol X^\top\boldsymbol X\hat{\boldsymbol\beta}$，用正规方程 $\boldsymbol X^\top\boldsymbol X\hat{\boldsymbol\beta}=\boldsymbol X^\top\boldsymbol y$ 把后两项写成 $-2\boldsymbol b^\top\boldsymbol X^\top\boldsymbol y+\hat{\boldsymbol\beta}^\top\boldsymbol X^\top\boldsymbol y$，再加上 $S(\hat{\boldsymbol\beta})=\boldsymbol y^\top\boldsymbol y-\hat{\boldsymbol\beta}^\top\boldsymbol X^\top\boldsymbol y$，恰好得到 $S(\boldsymbol b)$。由于 $\boldsymbol X^\top\boldsymbol X$ 正定，右端第二项非负且仅在 $\boldsymbol b=\hat{\boldsymbol\beta}$ 时为零，唯一最小性再次得证。

□

正规方程有一个应当记住的解释：它的第 $j$ 个分量为 $\boldsymbol x_j^\top(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})=0$，即残差与第 $j$ 个解释变量的样本内积为零，也就是二者样本不相关（当模型含常数项时，第 $1$ 个方程退化为 $\sum_{i=1}^n\hat\varepsilon_i=0$，残差之和为零）。最小二乘估计因而可以被理解为「已把数据中所有能被解释变量线性提取的信息用尽」，残差里再没有线性可提取的成分。这一正交性是 21.6 中残差诊断检验的出发点：若残差与某个未纳入的变量相关，就说明模型遗漏了信息。

**定义 21.3（投影矩阵与残差-maker 矩阵）**

在 A1 下定义两个 $n\times n$ 矩阵
$$
\boldsymbol P=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top,\qquad \boldsymbol M=\boldsymbol I_n-\boldsymbol P. \tag{21.4}
$$
称 $\boldsymbol P$ 为投影矩阵（因其把 $\boldsymbol y$ 映为拟合值，也常记作 hat matrix），$\boldsymbol M$ 为残差-maker 矩阵。于是
$$
\hat{\boldsymbol y}=\boldsymbol P\boldsymbol y=\boldsymbol X\hat{\boldsymbol\beta},\qquad \hat{\boldsymbol\varepsilon}=\boldsymbol y-\hat{\boldsymbol y}=\boldsymbol M\boldsymbol y,\qquad \hat{\boldsymbol\beta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol y.
$$
$\boldsymbol P$ 的对角元 $h_{ii}=P_{ii}$ 称为第 $i$ 个观测的杠杆值。

注意 $\boldsymbol P$ 与 $\boldsymbol M$ 只依赖设计矩阵 $\boldsymbol X$，完全不依赖 $\boldsymbol y$；而 $\hat{\boldsymbol\beta}$ 与 $\hat{\boldsymbol y}$ 都是 $\boldsymbol y$ 的**线性**函数。这一线性性是 21.3 中讨论无偏性与有效性的前提，也是「线性无偏估计量」这一类之所以自然的理由。

**定理 21.4（投影矩阵与残差-maker 矩阵的性质）**

设 A1 成立，$\boldsymbol P$、$\boldsymbol M$ 如式（21.4）。则下列结论成立：

1. $\boldsymbol P^\top=\boldsymbol P$，$\boldsymbol M^\top=\boldsymbol M$（对称性）；
2. $\boldsymbol P^2=\boldsymbol P$，$\boldsymbol M^2=\boldsymbol M$（幂等性）；
3. $\boldsymbol P\boldsymbol M=\boldsymbol M\boldsymbol P=\boldsymbol 0$（正交性）；
4. $\boldsymbol P\boldsymbol X=\boldsymbol X$，$\boldsymbol M\boldsymbol X=\boldsymbol 0$；
5. $\operatorname{rank}(\boldsymbol P)=\operatorname{tr}(\boldsymbol P)=p$，$\operatorname{rank}(\boldsymbol M)=\operatorname{tr}(\boldsymbol M)=n-p$；
6. $\boldsymbol P$ 的特征值只有 $1$（重数 $p$）与 $0$（重数 $n-p$），$\boldsymbol M$ 的特征值只有 $1$（重数 $n-p$）与 $0$（重数 $p$）；
7. $\hat{\boldsymbol\varepsilon}=\boldsymbol M\boldsymbol y=\boldsymbol M\boldsymbol\varepsilon$，从而 $\mathbb E[\hat{\boldsymbol\varepsilon}]=\boldsymbol 0$，$\operatorname{Cov}(\hat{\boldsymbol\varepsilon})=\sigma^2\boldsymbol M$；
8. $\mathrm{RSS}=\hat{\boldsymbol\varepsilon}^\top\hat{\boldsymbol\varepsilon}=\boldsymbol y^\top\boldsymbol M\boldsymbol y=\boldsymbol\varepsilon^\top\boldsymbol M\boldsymbol\varepsilon$，且对一切 $\boldsymbol v\in\mathbb R^n$ 有 $\lVert\boldsymbol M\boldsymbol v\rVert^2=\boldsymbol v^\top\boldsymbol M\boldsymbol v$。

**证明**

（1）由转置的运算律与定理 21.2 第一步中 $\boldsymbol X^\top\boldsymbol X$ 的对称性，
$$
\boldsymbol P^\top=\bigl(\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\bigr)^\top=\boldsymbol X\bigl((\boldsymbol X^\top\boldsymbol X)^{-1}\bigr)^\top\boldsymbol X^\top=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\boldsymbol P,
$$
其中用了对称可逆矩阵的逆仍对称：$(\boldsymbol A^{-1})^\top=(\boldsymbol A^\top)^{-1}=\boldsymbol A^{-1}$。于是 $\boldsymbol M^\top=\boldsymbol I_n^\top-\boldsymbol P^\top=\boldsymbol I_n-\boldsymbol P=\boldsymbol M$。

（2）$\boldsymbol P^2=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$，中间的 $\boldsymbol X^\top\boldsymbol X$ 与其逆相消，得 $\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\boldsymbol P$。再由（1）（2）已证的幂等性，$\boldsymbol M^2=(\boldsymbol I_n-\boldsymbol P)^2=\boldsymbol I_n-2\boldsymbol P+\boldsymbol P^2=\boldsymbol I_n-2\boldsymbol P+\boldsymbol P=\boldsymbol I_n-\boldsymbol P=\boldsymbol M$。

（3）$\boldsymbol P\boldsymbol M=\boldsymbol P(\boldsymbol I_n-\boldsymbol P)=\boldsymbol P-\boldsymbol P^2=\boldsymbol P-\boldsymbol P=\boldsymbol 0$；同样 $\boldsymbol M\boldsymbol P=(\boldsymbol I_n-\boldsymbol P)\boldsymbol P=\boldsymbol P-\boldsymbol P^2=\boldsymbol 0$。

（4）$\boldsymbol P\boldsymbol X=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X=\boldsymbol X\boldsymbol I_p=\boldsymbol X$，故 $\boldsymbol M\boldsymbol X=\boldsymbol X-\boldsymbol P\boldsymbol X=\boldsymbol X-\boldsymbol X=\boldsymbol 0$。这说明 $\boldsymbol X$ 的每一列都在 $\boldsymbol P$ 的像空间中被固定，而被 $\boldsymbol M$  映为零向量；换言之 $\operatorname{col}(\boldsymbol X)\subset\ker(\boldsymbol M)$，结合（5）中 $\operatorname{rank}(\boldsymbol M)=n-p$ 得 $\ker(\boldsymbol M)=\operatorname{col}(\boldsymbol X)$，即 $\boldsymbol M$ 是到正交补 $\operatorname{col}(\boldsymbol X)^\perp$ 的投影。

（5）先证一个通用事实：若 $\boldsymbol A\in\mathbb R^{n\times n}$ 对称且幂等，则其特征值只取 $0$ 或 $1$，且 $\operatorname{rank}(\boldsymbol A)=\operatorname{tr}(\boldsymbol A)$。设 $\boldsymbol A\boldsymbol v=\lambda\boldsymbol v$，$\boldsymbol v\neq\boldsymbol 0$，则 $\lambda\boldsymbol v=\boldsymbol A\boldsymbol v=\boldsymbol A^2\boldsymbol v=\lambda^2\boldsymbol v$，故 $\lambda^2=\lambda$，$\lambda\in\{0,1\}$。对称矩阵可正交对角化，存在正交阵 $\boldsymbol U$ 使 $\boldsymbol U^\top\boldsymbol A\boldsymbol U=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。迹在相似变换下不变，故 $\operatorname{tr}(\boldsymbol A)=\sum_{i=1}^n\lambda_i$；而秩等于非零特征值的个数（对角阵的秩即非零对角元个数），因 $\lambda_i\in\{0,1\}$，这个个数恰为 $\sum_{i=1}^n\lambda_i$。二者相等。

把这个事实用于 $\boldsymbol P$（由（1）（2）它对称幂等）：
$$
\operatorname{tr}(\boldsymbol P)=\operatorname{tr}\bigl(\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\bigr)=\operatorname{tr}\bigl((\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X\bigr)=\operatorname{tr}(\boldsymbol I_p)=p,
$$
其中用了迹的循环不变性 $\operatorname{tr}(\boldsymbol A\boldsymbol B)=\operatorname{tr}(\boldsymbol B\boldsymbol A)$（此处 $\boldsymbol A=\boldsymbol X$，$\boldsymbol B=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$）。于是 $\operatorname{rank}(\boldsymbol P)=p$。对 $\boldsymbol M$，由迹的线性与 $\operatorname{tr}(\boldsymbol I_n)=n$ 得 $\operatorname{tr}(\boldsymbol M)=n-p$，故 $\operatorname{rank}(\boldsymbol M)=n-p$。作为交叉验证，也可以不用迹而直接用秩的不等式：$\operatorname{rank}(\boldsymbol P)\le\operatorname{rank}(\boldsymbol X)=p$，而 $\boldsymbol X=\boldsymbol P\boldsymbol X$ 给出 $p=\operatorname{rank}(\boldsymbol X)\le\operatorname{rank}(\boldsymbol P)$，两边夹逼得 $\operatorname{rank}(\boldsymbol P)=p$。

（6）由（5）的对角化立即得到：$\boldsymbol P$ 相似于 $\operatorname{diag}(1,\dots,1,0,\dots,0)$，其中 $1$ 出现 $p$ 次；$\boldsymbol M=\boldsymbol I_n-\boldsymbol P$ 相似于同样的正交基下的 $\operatorname{diag}(0,\dots,0,1,\dots,1)$，其中 $1$ 出现 $n-p$ 次。

（7）由模型（21.1）与已证的（4），
$$
\hat{\boldsymbol\varepsilon}=\boldsymbol M\boldsymbol y=\boldsymbol M(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)=\boldsymbol M\boldsymbol X\boldsymbol\beta+\boldsymbol M\boldsymbol\varepsilon=\boldsymbol 0\cdot\boldsymbol\beta+\boldsymbol M\boldsymbol\varepsilon=\boldsymbol M\boldsymbol\varepsilon.
$$
取期望并用 A2 得 $\mathbb E[\hat{\boldsymbol\varepsilon}]=\boldsymbol M\,\mathbb E[\boldsymbol\varepsilon]=\boldsymbol 0$。协方差矩阵为
$$
\operatorname{Cov}(\hat{\boldsymbol\varepsilon})=\mathbb E\bigl[\hat{\boldsymbol\varepsilon}\hat{\boldsymbol\varepsilon}^\top\bigr]=\mathbb E\bigl[\boldsymbol M\boldsymbol\varepsilon\boldsymbol\varepsilon^\top\boldsymbol M^\top\bigr]=\boldsymbol M\,\mathbb E\bigl[\boldsymbol\varepsilon\boldsymbol\varepsilon^\top\bigr]\boldsymbol M^\top=\sigma^2\boldsymbol M\boldsymbol M^\top=\sigma^2\boldsymbol M^2=\sigma^2\boldsymbol M,
$$
依次用了 A3、对称性（1）与幂等性（2）。写成逐元素形式即 $\operatorname{Var}(\hat\varepsilon_i)=\sigma^2(1-h_{ii})$，$\operatorname{Cov}(\hat\varepsilon_i,\hat\varepsilon_j)=-\sigma^2h_{ij}$（$i\neq j$）。这里有一个必须记住的事实：原始误差是球对称的，残差却不是——它们既不同方差，也彼此相关。用残差直接模仿误差的性质（例如把 $\hat\varepsilon_i^2$ 当作方差 $\sigma^2$ 的独立同分布观测）是许多错误诊断的根源。

（8）$\mathrm{RSS}=\hat{\boldsymbol\varepsilon}^\top\hat{\boldsymbol\varepsilon}=(\boldsymbol M\boldsymbol y)^\top(\boldsymbol M\boldsymbol y)=\boldsymbol y^\top\boldsymbol M^\top\boldsymbol M\boldsymbol y=\boldsymbol y^\top\boldsymbol M^2\boldsymbol y=\boldsymbol y^\top\boldsymbol M\boldsymbol y$；再由（7）中 $\boldsymbol M\boldsymbol y=\boldsymbol M\boldsymbol\varepsilon$，得 $\mathrm{RSS}=\lVert\boldsymbol M\boldsymbol\varepsilon\rVert^2=\boldsymbol\varepsilon^\top\boldsymbol M\boldsymbol\varepsilon$。末式的证明相同：$\lVert\boldsymbol M\boldsymbol v\rVert^2=\boldsymbol v^\top\boldsymbol M^\top\boldsymbol M\boldsymbol v=\boldsymbol v^\top\boldsymbol M^2\boldsymbol v=\boldsymbol v^\top\boldsymbol M\boldsymbol v$。

□

**注记（杠杆值）** 由定义 $h_{ii}=P_{ii}=\boldsymbol x_i^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i$。幂等性给出 $h_{ii}=P_{ii}=(\boldsymbol P^2)_{ii}=\sum_{j=1}^nP_{ij}P_{ji}=\sum_{j=1}^nP_{ij}^2\ge P_{ii}^2=h_{ii}^2$，故 $0\le h_{ii}\le 1$；再由 $\operatorname{tr}(\boldsymbol P)=p$ 得 $\sum_{i=1}^nh_{ii}=p$，平均杠杆值为 $p/n$。杠杆值接近 $1$ 的观测点对拟合有决定性影响：若 $h_{ii}=1$，则 $\operatorname{Var}(\hat\varepsilon_i)=0$，即该点残差恒为零，回归超平面被迫穿过它。杠杆值是 21.6 中异常点诊断（Cook 距离等）的基本构件。

**注记（自由度 $n-p$ 的三种来源）** 残差平方和的除数为什么是 $n-p$ 而不是 $n$，可以从三个角度理解，三者完全一致。

第一是维数的角度。由定理 21.4（4）（5），$\boldsymbol M$ 是到正交补 $\operatorname{col}(\boldsymbol X)^\perp$ 的正交投影，而 $\dim\operatorname{col}(\boldsymbol X)^\perp=n-\operatorname{rank}(\boldsymbol X)=n-p$。取该子空间的一组标准正交基，按列排成 $\boldsymbol Q\in\mathbb R^{n\times(n-p)}$，则 $\boldsymbol Q^\top\boldsymbol Q=\boldsymbol I_{n-p}$ 且 $\boldsymbol M=\boldsymbol Q\boldsymbol Q^\top$，于是 $\mathrm{RSS}=\boldsymbol y^\top\boldsymbol M\boldsymbol y=\lVert\boldsymbol Q^\top\boldsymbol y\rVert^2=\lVert\boldsymbol Q^\top\boldsymbol\varepsilon\rVert^2$，它只是 $n-p$ 个数的平方和，而不是 $n$ 个。

第二是约束的角度。$n$ 个残差 $\hat\varepsilon_1,\dots,\hat\varepsilon_n$ 并非自由变动：正规方程 $\boldsymbol X^\top\hat{\boldsymbol\varepsilon}=\boldsymbol 0$ 给出 $p$ 个独立的线性约束（独立性由 A1 保证）。$n$ 个量减去 $p$ 个约束，剩下 $n-p$ 个自由度。

第三是期望的角度。定理 21.9 将证明 $\mathbb E[\mathrm{RSS}]=(n-p)\sigma^2$。因此若用 $n$ 作除数，$\mathbb E[\mathrm{RSS}/n]=(1-p/n)\sigma^2<\sigma^2$，会系统性低估误差方差，低估比例为 $p/n$；用 $n-p$ 才恰好无偏。这就是「自由度校正」的定量含义。极端情形 $p=n$ 时 $\boldsymbol M=\boldsymbol 0$，$\mathrm{RSS}\equiv 0$，$s^2$ 成为 $0/0$ 而无定义：模型完美穿过所有数据点，却再没有任何信息可用于估计噪声水平。这正是过拟合的代数画像，也是 21.2 中调整 $R^2$ 与第23章交叉验证试图纠正的现象。

## 21.2 几何视角与拟合优度

上一节把最小二乘解释为向 $\operatorname{col}(\boldsymbol X)$ 的正交投影。本节沿着这一几何图像讨论「拟合得好不好」如何量化。全程假设模型含截距项，即 $\boldsymbol X$ 的第一列是 $\boldsymbol 1_n=(1,\dots,1)^\top$；记 $\bar y=n^{-1}\sum_{i=1}^ny_i$，$\boldsymbol J=n^{-1}\boldsymbol 1_n\boldsymbol 1_n^\top$，则 $\boldsymbol J\boldsymbol y=\bar y\boldsymbol 1_n$，且 $\boldsymbol J$ 对称幂等。

**定理 21.5（平方和的正交分解）**

设 A1 成立且 $\boldsymbol X$ 含截距列。定义总平方和、回归平方和与残差平方和
$$
\mathrm{TSS}=\sum_{i=1}^n(y_i-\bar y)^2,\qquad \mathrm{ESS}=\sum_{i=1}^n(\hat y_i-\bar y)^2,\qquad \mathrm{RSS}=\sum_{i=1}^n\hat\varepsilon_i^2=\boldsymbol y^\top\boldsymbol M\boldsymbol y.
$$
则
$$
\mathrm{TSS}=\mathrm{ESS}+\mathrm{RSS}, \tag{21.5}
$$
且矩阵形式为 $\boldsymbol I_n-\boldsymbol J=(\boldsymbol P-\boldsymbol J)+\boldsymbol M$，其中 $\boldsymbol P-\boldsymbol J$ 与 $\boldsymbol M$ 都对称幂等且乘积为零，$\operatorname{tr}(\boldsymbol P-\boldsymbol J)=\operatorname{rank}(\boldsymbol P-\boldsymbol J)=p-1$。相应地 $\mathrm{ESS}=\boldsymbol y^\top(\boldsymbol P-\boldsymbol J)\boldsymbol y$，$\mathrm{TSS}=\boldsymbol y^\top(\boldsymbol I_n-\boldsymbol J)\boldsymbol y$。

**证明**

第一步，证明拟合值与观测值有相同的均值。因为 $\boldsymbol 1_n\in\operatorname{col}(\boldsymbol X)$，定理 21.4（4）给出 $\boldsymbol P\boldsymbol 1_n=\boldsymbol 1_n$，于是
$$
\boldsymbol 1_n^\top\hat{\boldsymbol y}=\boldsymbol 1_n^\top\boldsymbol P\boldsymbol y=(\boldsymbol P^\top\boldsymbol 1_n)^\top\boldsymbol y=(\boldsymbol P\boldsymbol 1_n)^\top\boldsymbol y=\boldsymbol 1_n^\top\boldsymbol y,
$$
即 $\sum_i\hat y_i=\sum_iy_i$，故 $\bar{\hat y}=\bar y$。再由 $\boldsymbol P$ 的对称性与 $\boldsymbol P\boldsymbol 1_n=\boldsymbol 1_n$ 得 $\boldsymbol J\boldsymbol P=n^{-1}\boldsymbol 1_n\boldsymbol 1_n^\top\boldsymbol P=n^{-1}\boldsymbol 1_n(\boldsymbol P\boldsymbol 1_n)^\top=n^{-1}\boldsymbol 1_n\boldsymbol 1_n^\top=\boldsymbol J$，且 $\boldsymbol M\boldsymbol 1_n=\boldsymbol 0$（由 $\boldsymbol M\boldsymbol X=\boldsymbol 0$ 取第一列）。

第二步，向量分解。记 $\tilde{\boldsymbol y}=\boldsymbol y-\bar y\boldsymbol 1_n=(\boldsymbol I_n-\boldsymbol J)\boldsymbol y$。由第一步，$\hat{\boldsymbol y}-\bar y\boldsymbol 1_n=(\boldsymbol I_n-\boldsymbol J)\hat{\boldsymbol y}$，而 $\hat{\boldsymbol\varepsilon}=\boldsymbol y-\hat{\boldsymbol y}$，故
$$
\tilde{\boldsymbol y}=(\boldsymbol y-\hat{\boldsymbol y})+(\hat{\boldsymbol y}-\bar y\boldsymbol 1_n)=\hat{\boldsymbol\varepsilon}+(\hat{\boldsymbol y}-\bar y\boldsymbol 1_n).
$$

第三步，验证两项正交。$\hat{\boldsymbol\varepsilon}^\top\hat{\boldsymbol y}=(\boldsymbol M\boldsymbol y)^\top(\boldsymbol P\boldsymbol y)=\boldsymbol y^\top\boldsymbol M\boldsymbol P\boldsymbol y=0$（定理 21.4（3））；$\hat{\boldsymbol\varepsilon}^\top\boldsymbol 1_n=\boldsymbol y^\top\boldsymbol M^\top\boldsymbol 1_n=\boldsymbol y^\top\boldsymbol M\boldsymbol 1_n=0$（第一步）。于是 $\hat{\boldsymbol\varepsilon}^\top(\hat{\boldsymbol y}-\bar y\boldsymbol 1_n)=0- \bar y\cdot 0=0$。由勾股定理，
$$
\mathrm{TSS}=\lVert\tilde{\boldsymbol y}\rVert^2=\lVert\hat{\boldsymbol y}-\bar y\boldsymbol 1_n\rVert^2+\lVert\hat{\boldsymbol\varepsilon}\rVert^2=\mathrm{ESS}+\mathrm{RSS},
$$
即式（21.5）。

第四步，矩阵形式。$\boldsymbol I_n-\boldsymbol J=\boldsymbol P-\boldsymbol J+\boldsymbol I_n-\boldsymbol P=(\boldsymbol P-\boldsymbol J)+\boldsymbol M$。$\boldsymbol P-\boldsymbol J$ 的对称性由 $(\boldsymbol P-\boldsymbol J)^\top=\boldsymbol P^\top-\boldsymbol J^\top=\boldsymbol P-\boldsymbol J$ 给出，其中 $\boldsymbol J^\top=n^{-1}\boldsymbol 1_n\boldsymbol 1_n^\top=\boldsymbol J$；用 $\boldsymbol P\boldsymbol J=n^{-1}(\boldsymbol P\boldsymbol 1_n)\boldsymbol 1_n^\top=\boldsymbol J$、$\boldsymbol J\boldsymbol P=\boldsymbol J$、$\boldsymbol J^2=\boldsymbol J$ 得
$$
(\boldsymbol P-\boldsymbol J)^2=\boldsymbol P^2-\boldsymbol P\boldsymbol J-\boldsymbol J\boldsymbol P+\boldsymbol J^2=\boldsymbol P-\boldsymbol J-\boldsymbol J+\boldsymbol J=\boldsymbol P-\boldsymbol J,
$$
$(\boldsymbol P-\boldsymbol J)\boldsymbol M=\boldsymbol P\boldsymbol M-\boldsymbol J\boldsymbol M=\boldsymbol 0-n^{-1}\boldsymbol 1_n(\boldsymbol M\boldsymbol 1_n)^\top=\boldsymbol 0$。最后 $\operatorname{tr}(\boldsymbol P-\boldsymbol J)=\operatorname{tr}(\boldsymbol P)-n^{-1}\operatorname{tr}(\boldsymbol 1_n\boldsymbol 1_n^\top)=p-n^{-1}\cdot n=p-1$，对称幂等阵的秩等于迹。此时
$$
\mathrm{ESS}=\lVert(\boldsymbol I_n-\boldsymbol J)\hat{\boldsymbol y}\rVert^2=\boldsymbol y^\top\boldsymbol P(\boldsymbol I_n-\boldsymbol J)\boldsymbol P\boldsymbol y=\boldsymbol y^\top(\boldsymbol P-\boldsymbol J)\boldsymbol y,
$$
因为 $\boldsymbol P(\boldsymbol I_n-\boldsymbol J)\boldsymbol P=\boldsymbol P^2-\boldsymbol P\boldsymbol J\boldsymbol P=\boldsymbol P-\boldsymbol J\boldsymbol P=\boldsymbol P-\boldsymbol J$。

□

分解（21.5）的本质是直角三角形的勾股关系：$\tilde{\boldsymbol y}$ 是斜边，$\hat{\boldsymbol y}-\bar y\boldsymbol 1_n$ 是它在 $\operatorname{col}(\boldsymbol X)$ 中（去掉常数方向后）的投影，$\hat{\boldsymbol\varepsilon}$ 是垂直于 $\operatorname{col}(\boldsymbol X)$ 的那条直角边。自由度也随之分解：$(p-1)+(n-p)=n-1$，这将在式（21.12）的 $F$ 统计量中再次出现。

**注记（不含截距时分解失效）** 若模型不含截距列，则 $\boldsymbol 1_n\notin\operatorname{col}(\boldsymbol X)$，第一步中 $\bar{\hat y}=\bar y$ 不再成立，交叉项 $2\hat{\boldsymbol\varepsilon}^\top(\hat{\boldsymbol y}-\bar y\boldsymbol 1_n)=-2\bar y\sum_i\hat\varepsilon_i$ 一般非零，式（21.5）失效。此时若仍按 $1-\mathrm{RSS}/\mathrm{TSS}$ 计算 $R^2$，结果可能为负数，失去「解释比例」的含义。这也是统计软件对无截距回归报告 $R^2$ 时必须附加警告的原因。

**定义 21.6（决定系数与调整决定系数）**

在定理 21.5 的设定下，定义
$$
R^2=\frac{\mathrm{ESS}}{\mathrm{TSS}}=1-\frac{\mathrm{RSS}}{\mathrm{TSS}},\qquad \bar R^2=1-\frac{\mathrm{RSS}/(n-p)}{\mathrm{TSS}/(n-1)}. \tag{21.6}
$$
由式（21.5）知 $R^2\in[0,1]$，而二者满足
$$
1-\bar R^2=(1-R^2)\,\frac{n-1}{n-p}.
$$
因 $p\ge 1$ 时 $(n-1)/(n-p)\ge 1$，总有 $\bar R^2\le R^2$，等号仅在 $p=1$（只有截距）时成立。$\bar R^2$ 不保证非负：当 $R^2<(p-1)/(n-1)$ 时它为负，含义是「模型的解释力还不如只用均值」。

**命题 21.7（嵌套模型的 $R^2$ 单调性与 $\bar R^2$ 的判据）**

设两个模型都以同一 $\boldsymbol y$ 为被解释变量、都含截距，且 $\operatorname{col}(\boldsymbol X_A)\subsetneq\operatorname{col}(\boldsymbol X_B)$，秩分别为 $p_A<p_B\le n$。记其残差平方和为 $\mathrm{RSS}_A$、$\mathrm{RSS}_B$，决定系数为 $R_A^2$、$R_B^2$，调整决定系数为 $\bar R_A^2$、$\bar R_B^2$。则：

1. $\mathrm{RSS}_B\le\mathrm{RSS}_A$，$R_B^2\ge R_A^2$；等号成立当且仅当 $\boldsymbol y$ 在子空间 $\mathcal W=\operatorname{col}(\boldsymbol X_B)\cap\operatorname{col}(\boldsymbol X_A)^\perp$ 上的投影为零；
2. $\bar R_B^2\ge\bar R_A^2$ 当且仅当 $\mathrm{RSS}_B/(n-p_B)\le\mathrm{RSS}_A/(n-p_A)$；特别地当 $p_B=p_A+1$ 时，$\bar R^2$ 上升当且仅当检验新增变量的 $F$ 统计量大于 $1$。

**证明**

（1）记 $\boldsymbol M_A=\boldsymbol I_n-\boldsymbol P_A$、$\boldsymbol M_B=\boldsymbol I_n-\boldsymbol P_B$。由 $\operatorname{col}(\boldsymbol X_B)^\perp\subset\operatorname{col}(\boldsymbol X_A)^\perp$，对任意 $\boldsymbol v$ 有 $\boldsymbol M_B\boldsymbol v\in\operatorname{col}(\boldsymbol X_B)^\perp\subset\operatorname{col}(\boldsymbol X_A)^\perp$，而 $\boldsymbol M_A$ 在 $\operatorname{col}(\boldsymbol X_A)^\perp$ 上恒等（$\boldsymbol M_A\boldsymbol u=\boldsymbol u$ 当 $\boldsymbol u\perp\operatorname{col}(\boldsymbol X_A)$），故 $\boldsymbol M_A\boldsymbol M_B=\boldsymbol M_B$。把 $\boldsymbol M_A\boldsymbol y$ 拆成两块：
$$
\boldsymbol M_A\boldsymbol y=\boldsymbol M_A(\boldsymbol M_B\boldsymbol y+\boldsymbol P_B\boldsymbol y)=\boldsymbol M_B\boldsymbol y+\boldsymbol M_A\boldsymbol P_B\boldsymbol y.
$$
第一块属于 $\operatorname{col}(\boldsymbol X_B)^\perp$。第二块：$\boldsymbol P_B\boldsymbol y\in\operatorname{col}(\boldsymbol X_B)$，把它写成 $\boldsymbol P_B\boldsymbol y=\boldsymbol u+\boldsymbol w$，其中 $\boldsymbol u\in\operatorname{col}(\boldsymbol X_A)$、$\boldsymbol w\in\mathcal W$，则 $\boldsymbol M_A\boldsymbol P_B\boldsymbol y=\boldsymbol M_A\boldsymbol u+\boldsymbol M_A\boldsymbol w=\boldsymbol 0+\boldsymbol w\in\mathcal W\subset\operatorname{col}(\boldsymbol X_B)$。两块正交，由勾股定理
$$
\mathrm{RSS}_A=\lVert\boldsymbol M_A\boldsymbol y\rVert^2=\lVert\boldsymbol M_B\boldsymbol y\rVert^2+\lVert\boldsymbol w\rVert^2=\mathrm{RSS}_B+\lVert\boldsymbol w\rVert^2\ge\mathrm{RSS}_B,
$$
等号当且仅当 $\boldsymbol w=\boldsymbol 0$，即 $\boldsymbol y$ 在 $\mathcal W$ 上的投影为零。两模型 TSS 相同（同一 $\boldsymbol y$、同含截距），故 $R_B^2=1-\mathrm{RSS}_B/\mathrm{TSS}\ge 1-\mathrm{RSS}_A/\mathrm{TSS}=R_A^2$。

（2）由式（21.6），$\bar R^2=1-(n-1)\mathrm{RSS}/[(n-p)\mathrm{TSS}]$，是关于 $\mathrm{RSS}/(n-p)$ 的严格递减函数，而 TSS 相同，故等价关系成立。设 $p_B=p_A+1$，新增变量的 $F$ 统计量为
$$
F=\frac{(\mathrm{RSS}_A-\mathrm{RSS}_B)/(p_B-p_A)}{\mathrm{RSS}_B/(n-p_B)}=\frac{(\mathrm{RSS}_A-\mathrm{RSS}_B)(n-p_B)}{\mathrm{RSS}_B}.
$$
于是
$$
F\ge 1\iff \mathrm{RSS}_A(n-p_B)\ge\mathrm{RSS}_B(n-p_B+1)=\mathrm{RSS}_B(n-p_A)\iff \frac{\mathrm{RSS}_B}{n-p_B}\le\frac{\mathrm{RSS}_A}{n-p_A},
$$
最右端恰是 $\bar R_B^2\ge\bar R_A^2$ 的充要条件。

□

命题 21.7（1）说明 $R^2$ 作为模型比较准则是彻底失效的：只要不断加入变量，它单调上升，直至 $p=n$ 时达到 $1$。直觉上，每加入一个新变量，投影子空间变大，投影向量只可能变长。$\bar R^2$ 通过把两个平方和各除以自身自由度来惩罚参数个数，其惩罚强度恰好在新增变量的解释力「连噪声平均水平都达不到」（$F<1$）时把它压低。

**注记（$\bar R^2$ 的局限）** 调整决定系数的惩罚只依赖参数**个数**，不依赖这些参数是如何选出来的。若研究者从 $m$ 个候选变量中搜索出 $\bar R^2$ 最大的组合，则选择过程本身带来的乐观偏差远超 $p/(n-p)$ 量级的校正，$\bar R^2$ 依然会系统性虚高；定量刻画见 21.8 与第23章的交叉验证。其次，$R^2$ 与 $\bar R^2$ 只在被解释变量相同、样本相同、且都含截距的模型之间可比：把 $y$ 换成 $\log y$ 后计算的 $R^2$ 与原尺度上的 $R^2$ 没有可比性，因为两者的 TSS 度量的不是同一个变异。第三，$R^2$ 度量的是**样本内**拟合优度，与样本外预测能力可以相距甚远；21.8 将给出样本外 $R^2$ 的定义。最后，$\bar R^2$ 与信息准则的差别在于惩罚项的形式：AIC 与 BIC 惩罚的是对数似然的下降量而非平方和的比例，且在正态误差下与 $F$ 型判据有明确对应（第23章）。

**注记（$R^2$ 是夹角余弦的平方）** 记中心化向量 $\tilde{\boldsymbol y}=\boldsymbol y-\bar y\boldsymbol 1_n$，$\tilde{\hat{\boldsymbol y}}=\hat{\boldsymbol y}-\bar y\boldsymbol 1_n$，$\theta$ 为二者在 $\mathbb R^n$ 中的夹角。由定理 21.5 的第二、三步，$\tilde{\boldsymbol y}=\tilde{\hat{\boldsymbol y}}+\hat{\boldsymbol\varepsilon}$ 且二者正交，于是
$$
\cos\theta=\frac{\tilde{\boldsymbol y}^\top\tilde{\hat{\boldsymbol y}}}{\lVert\tilde{\boldsymbol y}\rVert\,\lVert\tilde{\hat{\boldsymbol y}}\rVert}=\frac{\lVert\tilde{\hat{\boldsymbol y}}\rVert^2+\hat{\boldsymbol\varepsilon}^\top\tilde{\hat{\boldsymbol y}}}{\lVert\tilde{\boldsymbol y}\rVert\,\lVert\tilde{\hat{\boldsymbol y}}\rVert}=\frac{\lVert\tilde{\hat{\boldsymbol y}}\rVert}{\lVert\tilde{\boldsymbol y}\rVert},
$$
故 $\cos^2\theta=\mathrm{ESS}/\mathrm{TSS}=R^2$。同一计算还表明 $\boldsymbol y$ 与 $\hat{\boldsymbol y}$ 的样本相关系数 $r_{y,\hat y}=\cos\theta$（因为 $\bar{\hat y}=\bar y$），所以 $R^2=r_{y,\hat y}^2$，这正是「决定系数」名称的由来。几何图像十分清晰：中心化后的观测向量 $\tilde{\boldsymbol y}$ 在一个 $(p-1)$ 维子空间（$\operatorname{col}(\boldsymbol X)$ 与常数方向正交的部分）上投影，$R^2$ 是投影长度与原长度之比的平方。加入新变量使子空间维数增加，投影只会变长，夹角只会变小，$R^2$ 只增不减——命题 21.7（1）的几何重述。$R^2=1$ 对应 $\theta=0$，即 $\tilde{\boldsymbol y}$ 落在子空间内，数据被完全拟合；$R^2=0$ 对应 $\theta=90^\circ$，回归不提供任何线性信息。作为数量感：$R^2=0.81$ 意味着 $\cos\theta=0.9$、$\theta\approx 25.8^\circ$，即观测向量与拟合向量相当接近；而横截面股票收益回归中 $R^2$ 达到 $0.05$ 往往已属难得。

**例 21.1**

设 $n=5$，一个解释变量与截距，数据为
$$
\boldsymbol X=\begin{pmatrix}1&1\\1&2\\1&3\\1&4\\1&5\end{pmatrix},\qquad \boldsymbol y=\begin{pmatrix}2\\3\\5\\4\\6\end{pmatrix}.
$$
求最小二乘估计、拟合值、残差，验证正规方程与平方和分解，并计算 $R^2$ 与 $\bar R^2$。

**解**

先算 $\boldsymbol X^\top\boldsymbol X=\begin{pmatrix}5&15\\15&55\end{pmatrix}$，$\det=5\cdot 55-15^2=50$，故
$$
(\boldsymbol X^\top\boldsymbol X)^{-1}=\frac{1}{50}\begin{pmatrix}55&-15\\-15&5\end{pmatrix}.
$$
又 $\boldsymbol X^\top\boldsymbol y=(\sum y_i,\ \sum x_iy_i)^\top=(20,\ 2+6+15+16+30)^\top=(20,69)^\top$。由式（21.3），
$$
\hat{\boldsymbol\beta}=\frac{1}{50}\begin{pmatrix}55\cdot 20-15\cdot 69\\-15\cdot 20+5\cdot 69\end{pmatrix}=\frac{1}{50}\begin{pmatrix}65\\45\end{pmatrix}=\begin{pmatrix}1.3\\0.9\end{pmatrix}.
$$
拟合值 $\hat{\boldsymbol y}=\boldsymbol X\hat{\boldsymbol\beta}=(1.3+0.9,\ 1.3+1.8,\ 1.3+2.7,\ 1.3+3.6,\ 1.3+4.5)^\top=(2.2,\ 3.1,\ 4.0,\ 4.9,\ 5.8)^\top$，残差 $\hat{\boldsymbol\varepsilon}=\boldsymbol y-\hat{\boldsymbol y}=(-0.2,\ -0.1,\ 1.0,\ -0.9,\ 0.2)^\top$。

验证正规方程 $\boldsymbol X^\top\hat{\boldsymbol\varepsilon}=\boldsymbol 0$：第一个分量 $\sum_i\hat\varepsilon_i=-0.2-0.1+1.0-0.9+0.2=0$；第二个分量 $\sum_ix_i\hat\varepsilon_i=-0.2-0.2+3.0-3.6+1.0=0$。两个正交条件都精确成立，印证定理 21.2。

计算三个平方和。$\bar y=4$，故 $\mathrm{TSS}=(2-4)^2+(3-4)^2+(5-4)^2+(4-4)^2+(6-4)^2=4+1+1+0+4=10$；$\mathrm{RSS}=0.04+0.01+1.00+0.81+0.04=1.90$；由式（21.5）$\mathrm{ESS}=10-1.9=8.1$。独立核对：$\bar x=3$，$S_{xx}=\sum(x_i-\bar x)^2=4+1+0+1+4=10$，而一元回归中 $\mathrm{ESS}=\hat\beta_1^2S_{xx}=0.81\times 10=8.1$，一致。于是
$$
R^2=\frac{8.1}{10}=0.81,\qquad \bar R^2=1-\frac{1.90/3}{10/4}=1-\frac{0.63333}{2.5}=0.74667,
$$
也可用 $1-\bar R^2=(1-R^2)(n-1)/(n-p)=0.19\times 4/3=0.25333$ 核对。由 $R^2=0.81$ 得 $\cos\theta=0.9$、$\theta\approx 25.8^\circ$。

再验证杠杆值与迹。一元含截距回归中 $h_{ii}=1/n+(x_i-\bar x)^2/S_{xx}=0.2+(x_i-3)^2/10$，即 $(0.6,\ 0.3,\ 0.2,\ 0.3,\ 0.6)$，和为 $2=p$，与定理 21.4（5）的 $\operatorname{tr}(\boldsymbol P)=p$ 相符；两端点的杠杆值最大，说明它们对斜率的影响最强。残差方差 $\operatorname{Var}(\hat\varepsilon_i)=\sigma^2(1-h_{ii})$ 依次为 $0.4\sigma^2,\ 0.7\sigma^2,\ 0.8\sigma^2,\ 0.7\sigma^2,\ 0.4\sigma^2$，可见第三点残差的波动最大而两端最小，这正是「残差并非同方差」的具体表现。

## 21.3 估计量的抽样分布

到此为止的结论都是代数的：给定一组数据 $\boldsymbol y$，$\hat{\boldsymbol\beta}$ 由式（21.3）唯一确定。但 $\boldsymbol y$ 是随机的，重复抽样会给出不同的 $\hat{\boldsymbol\beta}$，因此必须研究它作为随机向量的分布。本节先在 A1 至 A4 下求出它的一二阶矩并证明它在所有线性无偏估计量中方差最小，再证明 $\sigma^2$ 的无偏估计量，最后在正态假设下给出精确分布与 $t$、$F$ 统计量的构造。

把模型（21.1）代入式（21.3）：
$$
\hat{\boldsymbol\beta}=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)=\boldsymbol\beta+(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\varepsilon. \tag{21.7}
$$
式（21.7）包含三层信息：其一，$\hat{\boldsymbol\beta}$ 是 $\boldsymbol y$（从而是 $\boldsymbol\varepsilon$）的线性函数，系数矩阵 $\boldsymbol A=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$ 非随机；其二，估计误差 $\hat{\boldsymbol\beta}-\boldsymbol\beta$ 完全由误差项驱动；其三，由 A2 与 A3，
$$
\mathbb E[\hat{\boldsymbol\beta}]=\boldsymbol\beta,\qquad \operatorname{Cov}(\hat{\boldsymbol\beta})=\sigma^2\boldsymbol A\boldsymbol A^\top=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1},
$$
即 $\hat{\boldsymbol\beta}$ 无偏，且 $\operatorname{Var}(\hat\beta_j)=\sigma^2[(\boldsymbol X^\top\boldsymbol X)^{-1}]_{jj}$。对拟合值，用定理 21.4（4）中的 $\boldsymbol P\boldsymbol X=\boldsymbol X$ 得 $\hat{\boldsymbol y}=\boldsymbol P\boldsymbol y=\boldsymbol P(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)=\boldsymbol X\boldsymbol\beta+\boldsymbol P\boldsymbol\varepsilon$，故 $\mathbb E[\hat{\boldsymbol y}]=\boldsymbol X\boldsymbol\beta$、$\operatorname{Cov}(\hat{\boldsymbol y})=\sigma^2\boldsymbol P\boldsymbol P^\top=\sigma^2\boldsymbol P^2=\sigma^2\boldsymbol P$，且
$$
\operatorname{Cov}(\hat{\boldsymbol\beta},\hat{\boldsymbol\varepsilon})=\mathbb E\bigl[\boldsymbol A\boldsymbol\varepsilon\boldsymbol\varepsilon^\top\boldsymbol M^\top\bigr]=\sigma^2\boldsymbol A\boldsymbol M=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol M=\boldsymbol 0,
$$
因为 $\boldsymbol X^\top\boldsymbol M=(\boldsymbol M\boldsymbol X)^\top=\boldsymbol 0$（定理 21.4（4））。系数估计与残差不相关，这一事实在正态假设下将升级为相互独立。

**定理 21.8（Gauss–Markov 定理）**

设 A1 至 A4 成立，$\hat{\boldsymbol\beta}$ 由式（21.3）给出。设 $\tilde{\boldsymbol\beta}=\boldsymbol C\boldsymbol y$ 是任一非随机矩阵 $\boldsymbol C\in\mathbb R^{p\times n}$ 给出的线性估计量，且对一切 $\boldsymbol\beta\in\mathbb R^p$ 都有 $\mathbb E[\tilde{\boldsymbol\beta}]=\boldsymbol\beta$。记 $\boldsymbol D=\boldsymbol C-(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$，则
$$
\operatorname{Cov}(\tilde{\boldsymbol\beta})-\operatorname{Cov}(\hat{\boldsymbol\beta})=\sigma^2\boldsymbol D\boldsymbol D^\top\succeq\boldsymbol 0, \tag{21.8}
$$
即差矩阵半正定。特别地，对任意 $\boldsymbol c\in\mathbb R^p$，
$$
\operatorname{Var}(\boldsymbol c^\top\tilde{\boldsymbol\beta})-\operatorname{Var}(\boldsymbol c^\top\hat{\boldsymbol\beta})=\sigma^2\lVert\boldsymbol D^\top\boldsymbol c\rVert^2\ge 0,
$$
且等号对一切 $\boldsymbol c$ 成立当且仅当 $\boldsymbol D=\boldsymbol 0$，即 $\tilde{\boldsymbol\beta}=\hat{\boldsymbol\beta}$。因此 $\hat{\boldsymbol\beta}$ 是最佳线性无偏估计量（BLUE）：在一切线性无偏估计量中，它对任何线性组合的方差都最小。

**证明**

第一步，把无偏性翻译成对 $\boldsymbol C$ 的约束。$\mathbb E[\boldsymbol C\boldsymbol y]=\boldsymbol C\boldsymbol X\boldsymbol\beta+\boldsymbol C\mathbb E[\boldsymbol\varepsilon]=\boldsymbol C\boldsymbol X\boldsymbol\beta$。要求它对一切 $\boldsymbol\beta$ 都等于 $\boldsymbol\beta$，取 $\boldsymbol\beta=\boldsymbol e_j$（第 $j$ 个标准基向量）得 $\boldsymbol C\boldsymbol X$ 的第 $j$ 列为 $\boldsymbol e_j$，$j=1,\dots,p$，故 $\boldsymbol C\boldsymbol X=\boldsymbol I_p$；反之若 $\boldsymbol C\boldsymbol X=\boldsymbol I_p$，则 $\mathbb E[\boldsymbol C\boldsymbol y]=\boldsymbol C\boldsymbol X\boldsymbol\beta=\boldsymbol I_p\boldsymbol\beta=\boldsymbol\beta$，无偏性成立。

第二步，由 $\boldsymbol C\boldsymbol X=\boldsymbol I_p$ 推出 $\boldsymbol D\boldsymbol X=\boldsymbol 0$：
$$
\boldsymbol D\boldsymbol X=\boldsymbol C\boldsymbol X-(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X=\boldsymbol I_p-\boldsymbol I_p=\boldsymbol 0.
$$

第三步，展开协方差矩阵。由 A3，$\operatorname{Cov}(\boldsymbol y)=\operatorname{Cov}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I_n$（$\boldsymbol X\boldsymbol\beta$ 非随机），故对任何线性估计量 $\boldsymbol C\boldsymbol y$ 有 $\operatorname{Cov}(\boldsymbol C\boldsymbol y)=\sigma^2\boldsymbol C\boldsymbol C^\top$。写 $\boldsymbol C=\boldsymbol A+\boldsymbol D$，$\boldsymbol A=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$，则
$$
\boldsymbol C\boldsymbol C^\top=\boldsymbol A\boldsymbol A^\top+\boldsymbol A\boldsymbol D^\top+\boldsymbol D\boldsymbol A^\top+\boldsymbol D\boldsymbol D^\top.
$$
其中 $\boldsymbol A\boldsymbol A^\top=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}=(\boldsymbol X^\top\boldsymbol X)^{-1}$；$\boldsymbol A\boldsymbol D^\top=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol D^\top=(\boldsymbol X^\top\boldsymbol X)^{-1}(\boldsymbol D\boldsymbol X)^\top=\boldsymbol 0$（第二步），$\boldsymbol D\boldsymbol A^\top=(\boldsymbol A\boldsymbol D^\top)^\top=\boldsymbol 0$。于是
$$
\operatorname{Cov}(\tilde{\boldsymbol\beta})=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}+\sigma^2\boldsymbol D\boldsymbol D^\top=\operatorname{Cov}(\hat{\boldsymbol\beta})+\sigma^2\boldsymbol D\boldsymbol D^\top,
$$
即式（21.8）。

第四步，验证半正定性与唯一性。对任意 $\boldsymbol c\in\mathbb R^p$，$\boldsymbol c^\top\boldsymbol D\boldsymbol D^\top\boldsymbol c=(\boldsymbol D^\top\boldsymbol c)^\top(\boldsymbol D^\top\boldsymbol c)=\lVert\boldsymbol D^\top\boldsymbol c\rVert^2\ge 0$，故 $\boldsymbol D\boldsymbol D^\top\succeq\boldsymbol 0$，式（21.8）给出矩阵意义下的方差不减；两边用 $\boldsymbol c$ 夹逼即得标量形式。若对一切 $\boldsymbol c$ 都有 $\lVert\boldsymbol D^\top\boldsymbol c\rVert^2=0$，则 $\boldsymbol D^\top=\boldsymbol 0$，从而 $\boldsymbol D=\boldsymbol 0$，$\boldsymbol C=\boldsymbol A$，$\tilde{\boldsymbol\beta}=\hat{\boldsymbol\beta}$，唯一性得证。

第五步，给出一个更直观的等价论证。由第二步，$\tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta}=\boldsymbol D\boldsymbol y=\boldsymbol D(\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon)=\boldsymbol D\boldsymbol X\boldsymbol\beta+\boldsymbol D\boldsymbol\varepsilon=\boldsymbol D\boldsymbol\varepsilon$，而
$$
\operatorname{Cov}\bigl(\hat{\boldsymbol\beta},\ \tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta}\bigr)=\mathbb E\bigl[\boldsymbol A\boldsymbol\varepsilon\boldsymbol\varepsilon^\top\boldsymbol D^\top\bigr]=\sigma^2\boldsymbol A\boldsymbol D^\top=\boldsymbol 0.
$$
所以 $\tilde{\boldsymbol\beta}=\hat{\boldsymbol\beta}+(\tilde{\boldsymbol\beta}-\hat{\boldsymbol\beta})$ 是两个不随机相关项之和，由方差的勾股关系
$$
\operatorname{Cov}(\tilde{\boldsymbol\beta})=\operatorname{Cov}(\hat{\boldsymbol\beta})+\operatorname{Cov}(\boldsymbol D\boldsymbol\varepsilon)=\operatorname{Cov}(\hat{\boldsymbol\beta})+\sigma^2\boldsymbol D\boldsymbol D^\top.
$$
任何偏离最小二乘的线性无偏估计，都只是在一个已无信息可提的估计之上再叠加一个与之不相关的纯噪声项，方差因此只增不减。

□

**注记（Gauss–Markov 定理的适用范围）** 定理中的三个限定词都不能放松。「线性」指估计量形如 $\boldsymbol C\boldsymbol y$ 且 $\boldsymbol C$ 非随机（或只依赖 $\boldsymbol X$）；若允许 $\boldsymbol C$ 依赖 $\boldsymbol y$，如第22章的 James–Stein 收缩，定理不再适用。「无偏」要求对参数空间中**一切** $\boldsymbol\beta$ 成立，这是一个很强的一致性要求；放弃它可以换取方差的显著下降，第23章的岭回归正是以可控的偏差换取方差。「最佳」只在线性无偏类内部比较：在 $p\ge 3$ 且误差正态时，James–Stein 估计在均方误差意义下一致优于 $\hat{\boldsymbol\beta}$，因此不可把 Gauss–Markov 读作「最小二乘是最好的估计」。

若再假设误差正态，$\hat{\boldsymbol\beta}$ 的最优性可以加强到全部无偏估计量。对数似然为 $\ell(\boldsymbol\beta)=-\frac{1}{2\sigma^2}(\boldsymbol y-\boldsymbol X\boldsymbol\beta)^\top(\boldsymbol y-\boldsymbol X\boldsymbol\beta)+\text{常数}$，得分向量 $\partial\ell/\partial\boldsymbol\beta=\sigma^{-2}\boldsymbol X^\top(\boldsymbol y-\boldsymbol X\boldsymbol\beta)$，Fisher 信息矩阵为 $\boldsymbol I(\boldsymbol\beta)=-\mathbb E[\partial^2\ell/\partial\boldsymbol\beta\,\partial\boldsymbol\beta^\top]=\sigma^{-2}\boldsymbol X^\top\boldsymbol X$。Cramér–Rao 下界断言任何无偏估计量的协方差矩阵半正定不小于 $\boldsymbol I(\boldsymbol\beta)^{-1}=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}$，而这恰是 $\operatorname{Cov}(\hat{\boldsymbol\beta})$，故 $\hat{\boldsymbol\beta}$ 达到下界，是有效估计量。

最后指出 A3 的两部分都不可省。若 $\operatorname{Cov}(\boldsymbol\varepsilon)=\boldsymbol\Omega\neq\sigma^2\boldsymbol I_n$（异方差或序列相关），则
$$
\operatorname{Cov}(\hat{\boldsymbol\beta})=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1},
$$
这个「三明治」形式不再等于 $\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}$，最小二乘也不再是 BLUE；此时最优者是广义最小二乘估计 $(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol y$，其最优性可通过把 $\boldsymbol y$ 与 $\boldsymbol X$ 同时左乘 $\boldsymbol\Omega^{-1/2}$ 化归为球对称情形来证明，完整推导见 21.7。反过来，Gauss–Markov 定理**不**要求误差独立或正态，只要求两两不相关且同方差，这使它在金融数据（厚尾、非正态）中仍有相当程度的适用性。

**例 21.2**

设 $n=4$，$\boldsymbol x=(1,2,3,4)^\top$，模型含截距（$p=2$），误差满足 A2 与 A3。构造一个不同于最小二乘的线性无偏估计量，并用定理 21.8 比较二者的方差。

**解**

只用首末两点求斜率，再用样本均值定截距：
$$
\tilde\beta_1=\frac{y_4-y_1}{3},\qquad \tilde\beta_0=\bar y-\frac{5}{2}\tilde\beta_1.
$$
写成 $\tilde{\boldsymbol\beta}=\boldsymbol C\boldsymbol y$，其两行为
$$
\boldsymbol c_1^\top=\Bigl(-\frac13,\ 0,\ 0,\ \frac13\Bigr),\qquad \boldsymbol c_0^\top=\Bigl(\frac{13}{12},\ \frac{3}{12},\ \frac{3}{12},\ -\frac{7}{12}\Bigr),
$$
（第二行由 $\bar y$ 的系数 $1/4$ 减去 $\frac52\boldsymbol c_1^\top$ 得到）。验证 $\boldsymbol C\boldsymbol X=\boldsymbol I_2$：$\boldsymbol c_1^\top\boldsymbol 1_4=-\frac13+\frac13=0$，$\boldsymbol c_1^\top\boldsymbol x=(-1+4)/3=1$；$\boldsymbol c_0^\top\boldsymbol 1_4=(13+3+3-7)/12=1$，$\boldsymbol c_0^\top\boldsymbol x=(13+6+9-28)/12=0$。故 $\tilde{\boldsymbol\beta}$ 无偏，属于定理 21.8 的比较类。

最小二乘一侧：$\boldsymbol X^\top\boldsymbol X=\begin{pmatrix}4&10\\10&30\end{pmatrix}$，行列式 $120-100=20$，$(\boldsymbol X^\top\boldsymbol X)^{-1}=\begin{pmatrix}1.5&-0.5\\-0.5&0.2\end{pmatrix}$，于是
$$
\boldsymbol A=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top=\begin{pmatrix}1&0.5&0&-0.5\\-0.3&-0.1&0.1&0.3\end{pmatrix},\qquad \operatorname{Cov}(\hat{\boldsymbol\beta})=\sigma^2\begin{pmatrix}1.5&-0.5\\-0.5&0.2\end{pmatrix}.
$$
直接比较斜率：$\operatorname{Var}(\tilde\beta_1)=\sigma^2(\frac19+\frac19)=\frac{2}{9}\sigma^2\approx 0.2222\sigma^2$，而 $\operatorname{Var}(\hat\beta_1)=0.2\sigma^2$（也等于 $\sigma^2/S_{xx}$，$S_{xx}=5$）。比值 $\frac{2/9}{1/5}=\frac{10}{9}$，即 $\tilde\beta_1$ 的方差大 $11.1\%$，相对效率为 $0.9$。

再按定理 21.8 检验差矩阵。$\boldsymbol D=\boldsymbol C-\boldsymbol A$ 的两行为
$$
\boldsymbol d_0^\top=\Bigl(\frac{1}{12},\ -\frac{3}{12},\ \frac{3}{12},\ -\frac{1}{12}\Bigr)=\frac{1}{12}(1,-3,3,-1),\qquad \boldsymbol d_1^\top=\Bigl(-\frac{1}{30},\ \frac{1}{10},\ -\frac{1}{10},\ \frac{1}{30}\Bigr)=\frac{1}{30}(-1,3,-3,1).
$$
逐行验证 $\boldsymbol D\boldsymbol X=\boldsymbol 0$：$\boldsymbol d_0^\top\boldsymbol 1_4=(1-3+3-1)/12=0$，$\boldsymbol d_0^\top\boldsymbol x=(1-6+9-4)/12=0$；$\boldsymbol d_1^\top\boldsymbol 1_4=(-1+3-3+1)/30=0$，$\boldsymbol d_1^\top\boldsymbol x=(-1+6-9+4)/30=0$。计算
$$
\boldsymbol D\boldsymbol D^\top=\begin{pmatrix}\dfrac{20}{144}&\dfrac{-20}{360}\\[2mm]\dfrac{-20}{360}&\dfrac{20}{900}\end{pmatrix}=\begin{pmatrix}\dfrac{5}{36}&-\dfrac{1}{18}\\[2mm]-\dfrac{1}{18}&\dfrac{1}{45}\end{pmatrix},
$$
其行列式 $\frac{5}{36}\cdot\frac{1}{45}-\frac{1}{324}=\frac{1}{324}-\frac{1}{324}=0$，迹为正，故半正定且秩为 $1$，与式（21.8）一致。于是
$$
\operatorname{Cov}(\tilde{\boldsymbol\beta})-\operatorname{Cov}(\hat{\boldsymbol\beta})=\sigma^2\begin{pmatrix}5/36&-1/18\\-1/18&1/45\end{pmatrix}\succeq\boldsymbol 0,
$$
截距的方差从 $1.5\sigma^2$ 增至 $\frac{236}{144}\sigma^2\approx 1.6389\sigma^2$（增 $9.26\%$），斜率方差增 $11.1\%$。

秩为 $1$ 并非巧合。因 $\bar y=\hat\beta_0+\bar x\hat\beta_1$（截距在模型中，拟合值的均值等于观测值的均值），有 $\tilde\beta_0-\hat\beta_0=-\bar x(\tilde\beta_1-\hat\beta_1)=-\frac52(\tilde\beta_1-\hat\beta_1)$，两个偏差分量完全共线。记 $d=\tilde\beta_1-\hat\beta_1$，则 $\operatorname{Var}(d)=\sigma^2\lVert\boldsymbol d_1\rVert^2=\sigma^2\cdot\frac{20}{900}=\frac{\sigma^2}{45}$，且
$$
\boldsymbol D\boldsymbol D^\top=\frac{1}{45}\begin{pmatrix}25/4&-5/2\\-5/2&1\end{pmatrix}=\begin{pmatrix}5/36&-1/18\\-1/18&1/45\end{pmatrix},
$$
与直接计算吻合。这个例子的教训是定量化的：仅仅因为丢弃了中间两个观测，斜率估计的方差就上升了 $11\%$；若数据噪声更大或样本更长，只用两端点的做法（金融实务中「取首末价格算收益率」的粗糙回归）损失会更明显。同时 $\boldsymbol D\boldsymbol D^\top$ 半正定而非零，正是定理 21.8 所断言的「任何偏离都只添加不相关噪声」的具体体现。

**定理 21.9（误差方差的无偏估计）**

设 A1 至 A4 成立。令
$$
s^2=\frac{\mathrm{RSS}}{n-p}=\frac{\hat{\boldsymbol\varepsilon}^\top\hat{\boldsymbol\varepsilon}}{n-p}=\frac{\boldsymbol y^\top\boldsymbol M\boldsymbol y}{n-p}, \tag{21.9}
$$
则 $\mathbb E[s^2]=\sigma^2$，即 $s^2$ 是 $\sigma^2$ 的无偏估计量；而 $\mathrm{RSS}/n$ 的期望为 $(1-p/n)\sigma^2$，系统性偏小。

**证明**

先证二次型期望的一般公式：设 $\boldsymbol z\in\mathbb R^n$ 为随机向量，$\mathbb E[\boldsymbol z]=\boldsymbol\mu$，$\operatorname{Cov}(\boldsymbol z)=\boldsymbol\Sigma$，$\boldsymbol A\in\mathbb R^{n\times n}$ 为常数矩阵，则
$$
\mathbb E[\boldsymbol z^\top\boldsymbol A\boldsymbol z]=\operatorname{tr}(\boldsymbol A\boldsymbol\Sigma)+\boldsymbol\mu^\top\boldsymbol A\boldsymbol\mu.
$$
逐元素展开：$\boldsymbol z^\top\boldsymbol A\boldsymbol z=\sum_{i=1}^n\sum_{j=1}^nA_{ij}z_iz_j$，取期望并用 $\mathbb E[z_iz_j]=\operatorname{Cov}(z_i,z_j)+\mathbb E[z_i]\mathbb E[z_j]=\Sigma_{ij}+\mu_i\mu_j$，得
$$
\mathbb E[\boldsymbol z^\top\boldsymbol A\boldsymbol z]=\sum_{i,j}A_{ij}\Sigma_{ij}+\sum_{i,j}A_{ij}\mu_i\mu_j.
$$
第二项即 $\boldsymbol\mu^\top\boldsymbol A\boldsymbol\mu$。第一项因 $\boldsymbol\Sigma$ 对称而 $\Sigma_{ij}=\Sigma_{ji}$，故 $\sum_{i,j}A_{ij}\Sigma_{ij}=\sum_{i,j}A_{ij}\Sigma_{ji}=\sum_i(\boldsymbol A\boldsymbol\Sigma)_{ii}=\operatorname{tr}(\boldsymbol A\boldsymbol\Sigma)$。公式得证。

现在取 $\boldsymbol z=\boldsymbol\varepsilon$，则 A2 给 $\boldsymbol\mu=\boldsymbol 0$，A3 给 $\boldsymbol\Sigma=\sigma^2\boldsymbol I_n$；取 $\boldsymbol A=\boldsymbol M$，并用定理 21.4（8）中 $\mathrm{RSS}=\boldsymbol\varepsilon^\top\boldsymbol M\boldsymbol\varepsilon$ 这一等式：
$$
\mathbb E[\mathrm{RSS}]=\operatorname{tr}\bigl(\boldsymbol M\cdot\sigma^2\boldsymbol I_n\bigr)+\boldsymbol 0^\top\boldsymbol M\boldsymbol 0=\sigma^2\operatorname{tr}(\boldsymbol M)=\sigma^2(n-p),
$$
最后一步用定理 21.4（5）的 $\operatorname{tr}(\boldsymbol M)=n-p$。因此 $\mathbb E[s^2]=\mathbb E[\mathrm{RSS}]/(n-p)=\sigma^2$。

□

定理 21.9 与前节的自由度注记完全对上了：残差平方和的期望是 $(n-p)\sigma^2$，平均每个自由度贡献 $\sigma^2$，所以除数必须是 $n-p$。若错误地除以 $n$，低估比例恰为 $p/n$；在 $n=60$、$p=12$ 的横截面回归中这是 $20\%$ 的偏差，会使标准误被低估约 $11\%$（平方根效应），进而让 $t$ 值被系统性放大约 $11\%$，显著性结论随之失真。

**注记（$\mathrm{RSS}$ 的方差与正态假设下的 $\chi^2$ 表示）** 在 A5 之下可以进一步得到分布而不仅是期望。取 $\operatorname{col}(\boldsymbol X)^\perp$ 的一组标准正交基，按列排成 $\boldsymbol Q\in\mathbb R^{n\times(n-p)}$，满足 $\boldsymbol Q^\top\boldsymbol Q=\boldsymbol I_{n-p}$、$\boldsymbol Q\boldsymbol Q^\top=\boldsymbol M$、$\boldsymbol Q^\top\boldsymbol X=\boldsymbol 0$（这样的 $\boldsymbol Q$ 由定理 21.4（6）的谱分解或 Gram–Schmidt 正交化给出）。令 $\boldsymbol u=\boldsymbol Q^\top\boldsymbol\varepsilon\in\mathbb R^{n-p}$，则
$$
\mathrm{RSS}=\boldsymbol\varepsilon^\top\boldsymbol M\boldsymbol\varepsilon=\boldsymbol\varepsilon^\top\boldsymbol Q\boldsymbol Q^\top\boldsymbol\varepsilon=\lVert\boldsymbol u\rVert^2=\sum_{k=1}^{n-p}u_k^2.
$$
若 $\boldsymbol\varepsilon\sim N_n(\boldsymbol 0,\sigma^2\boldsymbol I_n)$，则 $\boldsymbol u$ 作为正态向量的线性变换仍为多元正态，$\mathbb E[\boldsymbol u]=\boldsymbol 0$，$\operatorname{Cov}(\boldsymbol u)=\sigma^2\boldsymbol Q^\top\boldsymbol Q=\sigma^2\boldsymbol I_{n-p}$，故 $u_1/\sigma,\dots,u_{n-p}/\sigma$ 是独立标准正态，$\mathrm{RSS}/\sigma^2\sim\chi^2_{n-p}$。由此 $\mathbb E[\mathrm{RSS}]=\sigma^2(n-p)$ 与定理 21.9 一致，且 $\operatorname{Var}(\mathrm{RSS})=2(n-p)\sigma^4$、$\operatorname{Var}(s^2)=2\sigma^4/(n-p)$：$s^2$ 的精度随剩余自由度以 $1/(n-p)$ 的速度提高。这也解释了为什么小样本、多参数的回归中波动率估计极不可靠——$n-p$ 是它的「有效样本量」。

**注记（正态误差下的精确抽样分布）**

在 A1 至 A4 之外再加一条假设：（A5，正态性）$\boldsymbol\varepsilon\sim N_n(\boldsymbol 0,\sigma^2\boldsymbol I_n)$。则
$$
\hat{\boldsymbol\beta}\sim N_p\bigl(\boldsymbol\beta,\ \sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}\bigr),\qquad \frac{\mathrm{RSS}}{\sigma^2}\sim\chi^2_{n-p},\qquad \hat{\boldsymbol\beta}\ \text{与}\ \mathrm{RSS}\ \text{相互独立}. \tag{21.10}
$$
三条结论逐一推导如下。

第一条，由式（21.7）$\hat{\boldsymbol\beta}=\boldsymbol\beta+\boldsymbol A\boldsymbol\varepsilon$ 是正态向量的仿射变换，故为 $p$ 维正态；其均值由 A2 得 $\boldsymbol\beta$，协方差为 $\sigma^2\boldsymbol A\boldsymbol A^\top=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}$。特别地，每个分量 $\hat\beta_j\sim N\bigl(\beta_j,\sigma^2[(\boldsymbol X^\top\boldsymbol X)^{-1}]_{jj}\bigr)$，任意线性组合 $\boldsymbol c^\top\hat{\boldsymbol\beta}\sim N\bigl(\boldsymbol c^\top\boldsymbol\beta,\sigma^2\boldsymbol c^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol c\bigr)$。

第二条即上一注记中 $\mathrm{RSS}=\lVert\boldsymbol u\rVert^2$ 与 $\boldsymbol u\sim N_{n-p}(\boldsymbol 0,\sigma^2\boldsymbol I_{n-p})$ 的直接结论。

第三条，独立性。向量 $(\hat{\boldsymbol\beta}^\top,\boldsymbol u^\top)^\top$ 是同一正态向量 $\boldsymbol\varepsilon$ 的线性变换，故联合服从多元正态分布。其互协方差为
$$
\operatorname{Cov}(\hat{\boldsymbol\beta},\boldsymbol u)=\mathbb E\bigl[\boldsymbol A\boldsymbol\varepsilon\boldsymbol\varepsilon^\top\boldsymbol Q\bigr]=\sigma^2\boldsymbol A\boldsymbol Q=\sigma^2(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol Q=\boldsymbol 0,
$$
因为 $\boldsymbol X^\top\boldsymbol Q=(\boldsymbol Q^\top\boldsymbol X)^\top=\boldsymbol 0$。联合正态且互协方差为零即相互独立；而 $\mathrm{RSS}=\lVert\boldsymbol u\rVert^2$ 只是 $\boldsymbol u$ 的函数，故与 $\hat{\boldsymbol\beta}$ 独立。同样的推理给出 $\hat{\boldsymbol y}=\boldsymbol P\boldsymbol y$ 与 $\hat{\boldsymbol\varepsilon}=\boldsymbol M\boldsymbol y$ 相互独立，因为 $\operatorname{Cov}(\hat{\boldsymbol y},\hat{\boldsymbol\varepsilon})=\sigma^2\boldsymbol P\boldsymbol M=\boldsymbol 0$ 且二者联合正态。

式（21.10）是 Cochran 定理在线性回归中的体现：一个平方和被分解成相互独立的 $\chi^2$ 成分，各自的自由度恰为对应投影矩阵的秩。它的实际后果是：$s^2$ 与 $\hat{\boldsymbol\beta}$ 独立，因此用 $s$ 代替未知的 $\sigma$ 不会破坏分子的正态性，只把尺度随机化，从而得到精确的 $t$ 分布——这正是下一注记中推断统计量的基础，也是第20章 $t$ 区间在回归中的来源。

**注记（$t$ 统计量与 $F$ 统计量的构造）**

若 $\sigma^2$ 已知，由式（21.10）立得
$$
\frac{\hat\beta_j-\beta_j}{\sigma\sqrt{v_{jj}}}\sim N(0,1),\qquad v_{jj}=\bigl[(\boldsymbol X^\top\boldsymbol X)^{-1}\bigr]_{jj}.
$$
实践中 $\sigma^2$ 未知，须用 $s^2$ 代替。于是
$$
t_j=\frac{\hat\beta_j-\beta_j}{s\sqrt{v_{jj}}}=\frac{(\hat\beta_j-\beta_j)/(\sigma\sqrt{v_{jj}})}{\sqrt{\mathrm{RSS}/[\sigma^2(n-p)]}}\sim t_{n-p}, \tag{21.11}
$$
其依据是：分子服从标准正态分布，分母的平方服从 $\chi^2_{n-p}/(n-p)$，且由式（21.10）二者相互独立，这恰是自由度 $n-p$ 的 $t$ 分布的定义（第11章）。量 $s\sqrt{v_{jj}}$ 就是统计软件输出的标准误 $\operatorname{se}(\hat\beta_j)$，由式（21.11）可得 $\beta_j$ 的精确置信区间 $\hat\beta_j\pm t_{1-\alpha/2,\,n-p}\,s\sqrt{v_{jj}}$，其覆盖率论证与第20章的 $t$ 区间完全相同。把 $v_{jj}$ 换成 $\boldsymbol c^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol c$，同一论证给出任意线性组合的 $t$ 统计量：
$$
\frac{\boldsymbol c^\top\hat{\boldsymbol\beta}-\boldsymbol c^\top\boldsymbol\beta}{s\sqrt{\boldsymbol c^\top(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol c}}\sim t_{n-p}.
$$

对 $q$ 个线性约束的联合检验，设受限模型的残差平方和为 $\mathrm{RSS}_0$（残差-maker 矩阵 $\boldsymbol M_0$，参数个数 $p-q$），无约束模型为 $\mathrm{RSS}_1$（矩阵 $\boldsymbol M_1$，参数个数 $p$），则统计量
$$
F=\frac{(\mathrm{RSS}_0-\mathrm{RSS}_1)/q}{\mathrm{RSS}_1/(n-p)}\sim F_{q,\,n-p}\qquad(\text{原假设成立时}). \tag{21.12}
$$
分布依据与式（21.11）同源。注意 $\mathrm{RSS}_0-\mathrm{RSS}_1=\boldsymbol\varepsilon^\top(\boldsymbol M_0-\boldsymbol M_1)\boldsymbol\varepsilon$ 与 $\mathrm{RSS}_1=\boldsymbol\varepsilon^\top\boldsymbol M_1\boldsymbol\varepsilon$ 都是误差的二次型。在原假设下可以证明 $\boldsymbol M_0-\boldsymbol M_1$ 对称幂等且 $\operatorname{rank}(\boldsymbol M_0-\boldsymbol M_1)=\operatorname{tr}(\boldsymbol M_0)-\operatorname{tr}(\boldsymbol M_1)=(n-p+q)-(n-p)=q$，并且 $(\boldsymbol M_0-\boldsymbol M_1)\boldsymbol M_1=\boldsymbol 0$（因为 $\operatorname{col}(\boldsymbol X_1)\supset\operatorname{col}(\boldsymbol X_0)$ 蕴含 $\boldsymbol M_1\boldsymbol M_0=\boldsymbol M_1$）。于是仿照式（21.10）的构造，用 $\boldsymbol M_0-\boldsymbol M_1$ 与 $\boldsymbol M_1$ 各自的标准正交基把两个二次型写成两组独立标准正态的平方和，得
$$
\frac{\mathrm{RSS}_0-\mathrm{RSS}_1}{\sigma^2}\sim\chi^2_q,\qquad \frac{\mathrm{RSS}_1}{\sigma^2}\sim\chi^2_{n-p},
$$
且二者独立（零协方差的联合正态向量），其比按定义服从 $F_{q,n-p}$。$\boldsymbol M_0-\boldsymbol M_1$ 幂等性的完整验证、$F$ 统计量与似然比统计量及 Wald 统计量的等价关系，将在 21.4 中展开；此处只需记住两点：其一，$q=1$ 时 $F=t_1^2$，两种检验完全等价；其二，$F$ 统计量的分子分母都除以各自的自由度，因而与 $\sigma^2$ 无关，这是它成为枢轴量的原因。

以上所有精确结论都依赖 A5。若误差不服从正态分布，式（21.11）与（21.12）只在渐近意义下成立（第14章的中心极限定理与第20章的大样本检验），小样本中的实际水平可能明显偏离名义水平；厚尾或异方差情形下的修正见 21.6。

**例 21.3**

设真实数据生成过程为 $y_i=0.5+1.2x_{i1}-0.8x_{i2}+\varepsilon_i$，其中 $x_{i1},x_{i2}$ 独立同分布于 $N(0,1)$，$\varepsilon_i$ 独立同分布于 $N(0,1)$，样本量 $n=200$，$p=3$（含截距）。对一次模拟所得的样本执行最小二乘回归，得到残差标准差 $s=1.0300$（即 $s^2=1.0609$），自由度 $n-p=197$，临界值 $t_{0.975,\,197}=1.9721$，以及如下系数表：

| 参数 | 真值 | 估计值 $\hat\beta_j$ | 标准误 $s\sqrt{v_{jj}}$ | $t$ 值 | $95\%$ 置信区间 |
|---|---|---|---|---|---|
| $\beta_0$ | $0.5$ | $0.5235$ | $0.0735$ | $7.119$ | $[0.3785,\ 0.6685]$ |
| $\beta_1$ | $1.2$ | $1.3342$ | $0.0784$ | $17.010$ | $[1.1795,\ 1.4889]$ |
| $\beta_2$ | $-0.8$ | $-0.7334$ | $0.0768$ | $-9.553$ | $[-0.8848,\ -0.5820]$ |

回归的 $R^2=0.6573$，$\bar R^2=0.6538$。

**解**

表中每个数都由本节公式生成，逐项核对如下。标准误为 $\operatorname{se}(\hat\beta_j)=s\sqrt{v_{jj}}$，其中 $v_{jj}=[(\boldsymbol X^\top\boldsymbol X)^{-1}]_{jj}$；本次模拟中 $(v_{00},v_{11},v_{22})=(0.00510,\ 0.00580,\ 0.00556)$，于是 $\operatorname{se}(\hat\beta_1)=1.0300\sqrt{0.00580}=1.0300\times 0.07616=0.0784$，与表中一致。理论上，由于 $x_{i1},x_{i2}$ 近似正交且方差为 $1$，$\boldsymbol X^\top\boldsymbol X/n$ 近似单位阵，$v_{jj}\approx 1/n=0.005$，$\operatorname{se}(\hat\beta_j)\approx\sigma/\sqrt n=1/\sqrt{200}=0.0707$；实现值 $0.0735$ 至 $0.0784$ 与之同量级，差异来自 $s$ 对 $\sigma$ 的估计误差与设计矩阵的抽样波动。

$t$ 值是 $\hat\beta_j/\operatorname{se}(\hat\beta_j)$，对应原假设 $\beta_j=0$：例如 $1.3342/0.0784=17.01$。置信区间由式（21.11）得 $\hat\beta_j\pm 1.9721\,\operatorname{se}(\hat\beta_j)$，如 $\beta_1$ 的区间为 $1.3342\pm 1.9721\times 0.0784=1.3342\pm 0.1546$，即 $[1.1795,\ 1.4889]$。三个区间都覆盖了各自的真值；这并不值得惊讶，也不构成对方法的验证——覆盖率 $95\%$ 是对重复抽样而言的频率性质，单次模拟中覆盖与否是伯努利事件（第20章对此有专门辨析）。$\hat\beta_2$ 与真值之差 $0.0666$ 约为 $0.87$ 个标准误，完全在抽样波动范围内。

方差估计的表现同样可以核对。由定理 21.9 与其后的注记，$s^2$ 无偏且 $\operatorname{Var}(s^2)=2\sigma^4/(n-p)=2/197$，标准差约 $0.1008$；实现值 $s^2=1.0609$ 与 $\sigma^2=1$ 相差 $0.0609$，约 $0.6$ 个标准差，属正常波动。决定系数方面，理论上 $R^2$ 应收敛于 $\operatorname{Var}(\boldsymbol x^\top\boldsymbol\beta_{1:2})/\operatorname{Var}(y)=(1.2^2+0.8^2)/(1.2^2+0.8^2+1)=2.08/3.08=0.6753$，实现值 $0.6573$ 与之接近；$\bar R^2=0.6538$ 比 $R^2$ 小 $0.0035$，惩罚幅度与 $(n-1)/(n-p)=199/197$ 的因子一致。

最后注意临界值的选择。本例 $n-p=197$，$t_{0.975,197}=1.9721$ 与正态临界值 $1.96$ 相差不到 $0.7\%$，用正态近似影响甚微；但若 $n=20$、$p=5$，则自由度为 $15$，$t_{0.975,15}=2.131$，比 $1.96$ 大 $8.7\%$，此时用正态临界值会使区间过窄、真实覆盖率低于名义水平。金融时间序列与横截面研究常常只有几十个观测却有若干因子，这类小样本情形必须使用 $t$ 临界值。

本片段到此为止建立的是回归的代数骨架（式（21.3）、式（21.4））、几何骨架（式（21.5）与夹角解释）与分布骨架（式（21.7）、式（21.10））。式（21.11）与式（21.12）中的 $t$、$F$ 统计量已经具备了做检验的全部要素，如何把它们组织成单系数检验、线性约束的联合检验与置信椭球，以及共线性、异方差、自相关等现实问题如何处理，由 21.4 至 21.8 继续。

## 21.4 线性约束与假设检验

设 $X$ 为 $n\times p$ 设计矩阵，$\operatorname{rank}X=p$，模型为 $y=X\boldsymbol\beta+\boldsymbol u$，$\mathbb E[\boldsymbol u]=\boldsymbol 0$，$\operatorname{Cov}(\boldsymbol u)=\sigma^2 I_n$。考虑 $q$ 个线性约束
$$R\boldsymbol\beta=\boldsymbol r,$$
其中 $R$ 为 $q\times p$ 行满秩矩阵（$\operatorname{rank}R=q\le p$），$\boldsymbol r\in\mathbb R^q$ 已知。受限最小二乘估计量 $\hat{\boldsymbol\beta}_R$ 是在约束集 $\{\boldsymbol b:R\boldsymbol b=\boldsymbol r\}$ 上使残差平方和达到最小的那个向量。引入 Lagrange 乘子向量 $\boldsymbol\lambda\in\mathbb R^q$，构造
$$L(\boldsymbol b,\boldsymbol\lambda)=(y-X\boldsymbol b)^\top(y-X\boldsymbol b)+2\boldsymbol\lambda^\top(R\boldsymbol b-\boldsymbol r).$$
对 $\boldsymbol b$ 与 $\boldsymbol\lambda$ 分别求梯度并令其为零，得到一阶条件
$$-2X^\top(y-X\hat{\boldsymbol\beta}_R)+2R^\top\hat{\boldsymbol\lambda}=\boldsymbol 0,\qquad R\hat{\boldsymbol\beta}_R-\boldsymbol r=\boldsymbol 0 .$$
第一式等价于 $X^\top X\hat{\boldsymbol\beta}_R=X^\top y-R^\top\hat{\boldsymbol\lambda}$。由 $X^\top X$ 可逆（定理 21.2），
$$\hat{\boldsymbol\beta}_R=(X^\top X)^{-1}X^\top y-(X^\top X)^{-1}R^\top\hat{\boldsymbol\lambda}=\hat{\boldsymbol\beta}-(X^\top X)^{-1}R^\top\hat{\boldsymbol\lambda}.$$
把它代入约束式，记 $A=(X^\top X)^{-1}$，得 $R\hat{\boldsymbol\beta}-RA R^\top\hat{\boldsymbol\lambda}=\boldsymbol r$，于是
$$\hat{\boldsymbol\lambda}=(RA R^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r),$$
其中 $RAR^\top$ 可逆是因为 $R$ 行满秩而 $A$ 正定：对任意非零 $\boldsymbol c\in\mathbb R^q$，$R^\top\boldsymbol c\ne\boldsymbol 0$，故 $\boldsymbol c^\top RA R^\top\boldsymbol c=(R^\top\boldsymbol c)^\top A(R^\top\boldsymbol c)>0$。代回即得闭式解
$$\hat{\boldsymbol\beta}_R=\hat{\boldsymbol\beta}-A R^\top(RA R^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r).\tag{21.13}$$
可见受限估计量是无约束估计量沿 $AR^\top$ 的列空间方向的一次修正，修正量恰好在原约束的「度量」$RAR^\top$ 下把 $R\hat{\boldsymbol\beta}$ 拉回 $\boldsymbol r$。若约束本来就成立（$R\hat{\boldsymbol\beta}=\boldsymbol r$），则 $\hat{\boldsymbol\beta}_R=\hat{\boldsymbol\beta}$。

由式（21.13）与 $\hat{\boldsymbol\beta}$ 的无偏性，$\mathbb E[\hat{\boldsymbol\beta}_R]=\boldsymbol\beta-A R^\top(RA R^\top)^{-1}(R\boldsymbol\beta-\boldsymbol r)$，故 $\hat{\boldsymbol\beta}_R$ 只在原假设为真时无偏；这是一个有偏但方差更小的估计量，其偏差方向完全由约束的违背程度决定。
**定理 21.10（受限估计量的方差优势）**

设 $R$ 行满秩，约束 $R\boldsymbol\beta=\boldsymbol r$ 为真，$\operatorname{Cov}(\boldsymbol u)=\sigma^2 I_n$。记 $A=(X^\top X)^{-1}$，$D=AR^\top(RAR^\top)^{-1}RA$。则
$$\operatorname{Var}(\hat{\boldsymbol\beta}_R)=\sigma^2(A-D),\qquad \operatorname{Var}(\hat{\boldsymbol\beta})-\operatorname{Var}(\hat{\boldsymbol\beta}_R)=\sigma^2 D$$
是半正定矩阵；对任意 $\boldsymbol c\in\mathbb R^p$，$\operatorname{Var}(\boldsymbol c^\top\hat{\boldsymbol\beta}_R)\le\operatorname{Var}(\boldsymbol c^\top\hat{\boldsymbol\beta})$。

**证明**

约束为真时 $\hat{\boldsymbol\beta}_R$ 无偏，且由式（21.13）与 $A$、$R$、$\boldsymbol r$ 非随机，
$$\hat{\boldsymbol\beta}_R=\hat{\boldsymbol\beta}-AR^\top(RAR^\top)^{-1}R\hat{\boldsymbol\beta}+AR^\top(RAR^\top)^{-1}\boldsymbol r=(I_p-D)\hat{\boldsymbol\beta}+AR^\top(RAR^\top)^{-1}\boldsymbol r .$$
于是
$$\operatorname{Var}(\hat{\boldsymbol\beta}_R)=(I_p-D)\operatorname{Var}(\hat{\boldsymbol\beta})(I_p-D)^\top=\sigma^2(I_p-D)A(I_p-D).$$
展开 $(I_p-D)A(I_p-D)=A-DA-AD^\top+DAD^\top$。逐项化简：由 $DA=AR^\top(RAR^\top)^{-1}RA^2$ 并不直接对称，改用 $AD=AR^\top(RAR^\top)^{-1}RA=D$（因为 $ARA R^\top(RA R^\top)^{-1}=I_q$ 使中间部分相消），同理 $DA=D$。再由 $DAD=D$（幂等性：$D^2=AR^\top(RAR^\top)^{-1}RAR^\top(RAR^\top)^{-1}RA=D$），得
$$(I_p-D)A(I_p-D)=A-D-D+D=A-D,$$
即 $\operatorname{Var}(\hat{\boldsymbol\beta}_R)=\sigma^2(A-D)$，两式相减得 $\operatorname{Var}(\hat{\boldsymbol\beta})-\operatorname{Var}(\hat{\boldsymbol\beta}_R)=\sigma^2 D$。

最后验证 $D$ 半正定。令 $B=AR^\top(RAR^\top)^{-1/2}$，其中 $(RAR^\top)^{-1/2}$ 是正定矩阵 $RAR^\top$ 的逆平方根（由对称正定矩阵的谱分解存在）。则
$$D=AR^\top(RAR^\top)^{-1}RA=(AR^\top(RAR^\top)^{-1/2})((RAR^\top)^{-1/2}RA)=BB^\top,$$
因为 $(RAR^\top)^{-1/2}$ 对称且 $(RAR^\top)^{-1/2}RAR^\top(RAR^\top)^{-1/2}=I_q$。对任意 $\boldsymbol c$，$\boldsymbol c^\top D\boldsymbol c=\boldsymbol c^\top BB^\top\boldsymbol c=\lVert B^\top\boldsymbol c\rVert^2\ge 0$，故 $D$ 半正定，从而对任意线性组合 $\boldsymbol c^\top\hat{\boldsymbol\beta}$，受限估计量的方差不大于无约束估计量的方差。

□

这一定理是偏差—方差权衡在线性模型中的精确表现：加入正确的约束换来了方差的严格下降（在 $R^\top$ 的列空间方向上），代价是若约束错误则引入偏差。它也解释了为什么 $F$ 检验的势（power）随约束偏离程度增大而提高。
接下来把残差平方和的差写成 $R\hat{\boldsymbol\beta}-\boldsymbol r$ 的二次型。记 $RSS=y^\top My$（定理 21.4），$RSS_R=(y-X\hat{\boldsymbol\beta}_R)^\top(y-X\hat{\boldsymbol\beta}_R)$。由式（21.13），
$$y-X\hat{\boldsymbol\beta}_R=y-X\hat{\boldsymbol\beta}+XAR^\top(RAR^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)=My+XAR^\top(RAR^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r).$$
记 $\boldsymbol d=R\hat{\boldsymbol\beta}-\boldsymbol r$，$K=AR^\top(RAR^\top)^{-1}$，则 $RSS_R=(y^\top M+\boldsymbol d^\top K^\top X^\top)(My+XK\boldsymbol d)$。展开四项：$y^\top My=RSS$；$y^\top MXK\boldsymbol d=0$ 与 $\boldsymbol d^\top K^\top X^\top My=0$，因为 $MX=0$（定理 21.4）；而 $\boldsymbol d^\top K^\top XX K\boldsymbol d=\boldsymbol d^\top(RAR^\top)^{-1}RA X^\top X A R^\top(RAR^\top)^{-1}\boldsymbol d=\boldsymbol d^\top(RAR^\top)^{-1}\boldsymbol d$，用了 $X^\top XA=I_p$。于是
$$RSS_R-RSS=(R\hat{\boldsymbol\beta}-\boldsymbol r)^\top[R(X^\top X)^{-1}R^\top]^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r).\tag{21.14}$$
这个恒等式是纯粹的代数事实，不依赖任何分布假设，也不依赖原假设是否成立；它把「约束被数据拒绝的程度」直接翻译为拟合损失的增量。

在嵌套模型的表述中，同一恒等式有投影形式。设原假设 $H_0:R\boldsymbol\beta=\boldsymbol r$（为简化取 $\boldsymbol r=\boldsymbol 0$，非齐次情形可平移）对应的受限模型为 $y=X_0\boldsymbol\gamma+\boldsymbol u$，其中 $X_0$ 的列空间 $\mathcal C(X_0)$ 是 $\mathcal C(X)$ 中满足约束的子空间，$\dim\mathcal C(X_0)=p-q$，因而 $\mathcal C(X_0)\subset\mathcal C(X)$。记 $X_1=X$、$P_1=P$、$M_1=M$，$P_0=X_0(X_0^\top X_0)^{-1}X_0^\top$、$M_0=I_n-P_0$，$RSS_1=y^\top M_1 y$，$RSS_0=y^\top M_0 y$。前段留下的验证在此补完：$M_0-M_1$ 是对称幂等矩阵且秩为 $q$。

对称性由 $M_0$、$M_1$ 各自对称立得。幂等性需要 $M_0M_1=M_1M_0=M_1$，其关键关系是 $P_1P_0=P_0$。由 $\mathcal C(X_0)\subset\mathcal C(X_1)$ 可写 $X_0=X_1B$（$B$ 为 $p\times(p-q)$ 列满秩），于是 $M_1X_0=M_1X_1B=0$、$P_1X_0=X_0$，进而
$$P_1P_0=X_1(X_1^\top X_1)^{-1}X_1^\top X_0(X_0^\top X_0)^{-1}X_0^\top=(P_1X_0)(X_0^\top X_0)^{-1}X_0^\top=P_0 .$$
两边取转置（$P_0$、$P_1$ 对称）得 $P_0P_1=P_0$。因此
$$M_0M_1=(I_n-P_0)(I_n-P_1)=I_n-P_0-P_1+P_0P_1=I_n-P_1=M_1,$$
同理 $M_1M_0=(I_n-P_1)(I_n-P_0)=I_n-P_1-P_0+P_1P_0=M_1$。把它代入平方，得
$$(M_0-M_1)^2=M_0^2-M_0M_1-M_1M_0+M_1^2=M_0-M_1-M_1+M_1=M_0-M_1 .$$
秩由迹给出：$\operatorname{rank}(M_0-M_1)=\operatorname{tr}(M_0-M_1)=\operatorname{tr}M_0-\operatorname{tr}M_1=(n-(p-q))-(n-p)=q$，其中用了定理 21.4 的 $\operatorname{tr}M=n-\operatorname{rank}X$ 与幂等矩阵的迹等于秩。此外 $(M_0-M_1)M_1=M_0M_1-M_1=0$，即两块正交，这是后面独立性论证的关键。

**定理 21.11（线性约束的 $F$ 检验）**

设 $\boldsymbol u\sim N_n(\boldsymbol 0,\sigma^2 I_n)$，$X_1=X$ 满列秩 $p$，$\mathcal C(X_0)\subset\mathcal C(X_1)$ 且 $\dim\mathcal C(X_1)-\dim\mathcal C(X_0)=q$。记 $RSS_1=y^\top M_1y$、$RSS_0=y^\top M_0y$，则
$$F=\frac{(RSS_0-RSS_1)/q}{RSS_1/(n-p)}\sim F_{q,n-p}$$
在原假设 $H_0:\mathbb E[y]\in\mathcal C(X_0)$ 下成立，且与 $\sigma^2$ 无关。

**证明**

第一步，分子的分布。$M_0-M_1$ 对称幂等且秩为 $q$（已在上文验证），故存在正交矩阵 $Q$ 使 $Q^\top(M_0-M_1)Q=\operatorname{diag}(I_q,0)$。令 $\boldsymbol z=Q^\top y$，则 $\boldsymbol z\sim N_n(Q^\top\mathbb E[y],\sigma^2 I_n)$，且
$$RSS_0-RSS_1=y^\top(M_0-M_1)y=\boldsymbol z^\top\operatorname{diag}(I_q,0)\boldsymbol z=\sum_{k=1}^{q}z_k^2 .$$
在 $H_0$ 下 $\mathbb E[y]=X_0\boldsymbol\gamma\in\mathcal C(X_0)$，而 $(M_0-M_1)X_0=M_0X_0-M_1X_0=0-0=0$，于是 $\mathbb E[Q^\top y]$ 的前 $q$ 个分量为零，即 $\mathbb E[z_k]=0$，$k=1,\dots,q$。因此
$$\frac{RSS_0-RSS_1}{\sigma^2}=\sum_{k=1}^{q}\left(\frac{z_k}{\sigma}\right)^2\sim\chi^2_q .$$

第二步，分母的分布。$M_1$ 对称幂等，$\operatorname{rank}M_1=n-p$，同理由正交对角化与 $M_1X_1=0$（$H_0$ 下 $\mathbb E[y]\in\mathcal C(X_1)$）得
$$\frac{RSS_1}{\sigma^2}=\frac{y^\top M_1y}{\sigma^2}\sim\chi^2_{n-p}.$$

第三步，独立性。$(M_0-M_1)M_1=M_0M_1-M_1=M_1-M_1=0$。两个对称幂等矩阵乘积为零等价于它们的像空间正交：若 $\boldsymbol v\in\mathcal C(M_0-M_1)$、$\boldsymbol w\in\mathcal C(M_1)$，则 $\boldsymbol v=(M_0-M_1)\boldsymbol a$、$\boldsymbol w=M_1\boldsymbol b$，$\boldsymbol v^\top\boldsymbol w=\boldsymbol a^\top(M_0-M_1)M_1\boldsymbol b=0$。取同一个正交矩阵 $Q$ 同时对角化两者（可先对角化 $M_0-M_1$，其零空间在 $M_1$ 作用下不变，再在零空间内对角化 $M_1$），可得 $\boldsymbol z=Q^\top y$ 的前 $q$ 个分量只出现在分子、后 $n-q$ 个分量只出现在分母。由于 $\boldsymbol z$ 的分量相互独立（协方差矩阵为 $\sigma^2 I_n$），分子与分母独立。这正是 Cochran 定理的内容。

第四步，合成。由 $F$ 分布的定义——独立 $\chi^2$ 变量各除以其自由度之比——
$$F=\frac{(RSS_0-RSS_1)/\sigma^2/q}{RSS_1/\sigma^2/(n-p)}=\frac{(RSS_0-RSS_1)/q}{RSS_1/(n-p)}\sim F_{q,n-p}.$$
$\sigma^2$ 在比值中完全约去，故检验无需知道 $\sigma^2$。

□
把恒等式（21.14）代入定理 21.11 的统计量，并用定理 21.9 的无偏方差估计 $s^2=RSS_1/(n-p)$，得到检验的可操作形式：拒绝域为
$$F=\frac{(R\hat{\boldsymbol\beta}-\boldsymbol r)^\top[R(X^\top X)^{-1}R^\top]^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)/q}{s^2}>F_{q,n-p;1-\alpha}.\tag{21.15}$$
分子的二次型度量约束在 $\hat{\boldsymbol\beta}$ 的抽样协方差度量下被违背的「距离」，分母提供尺度。当 $q=1$ 时 $RAR^\top$ 是标量，式（21.15）开方即得式（21.11）的 $t$ 统计量，且
$$F=t^2,\qquad F_{1,n-p;1-\alpha}=t_{n-p;1-\alpha/2}^2,$$
所以双侧 $t$ 检验与 $q=1$ 的 $F$ 检验完全等价。这一点在实务中很重要：报告单个系数的显著性时用 $t$，检验一组系数（例如全部斜率同时为零、或若干季度虚拟变量联合为零）时用 $F$。

**注记**　$F$ 检验的势取决于非中心参数。若 $H_0$ 不成立，则 $(RSS_0-RSS_1)/\sigma^2\sim\chi^2_q(\delta)$，非中心参数 $\delta=(R\boldsymbol\beta-\boldsymbol r)^\top[\sigma^2RAR^\top]^{-1}(R\boldsymbol\beta-\boldsymbol r)$，$F$ 服从非中心 $F$ 分布。$\delta$ 越大、$q$ 越小、$n-p$ 越大，拒绝概率越高。这给出了样本量规划的依据：要在给定显著性水平下以指定概率检出给定大小的约束违背，需要 $\delta$ 达到某个门槛，而 $\delta$ 与 $\sigma^{-2}$ 成正比，故噪声越大所需样本越多。

三大检验统计量都可以只用无约束估计、只用受限估计、或两者混合来构造，这正是 Wald、似然比（LR）与 Lagrange 乘子（LM，又称得分检验）三者的分工。设高斯对数似然为
$$\ell(\boldsymbol\beta,\sigma^2)=-\frac n2\ln(2\pi\sigma^2)-\frac{1}{2\sigma^2}(y-X\boldsymbol\beta)^\top(y-X\boldsymbol\beta).$$
无约束极大似然估计为 $\tilde{\boldsymbol\beta}=\hat{\boldsymbol\beta}$、$\tilde\sigma_1^2=RSS_1/n$；受限极大似然估计为 $\hat{\boldsymbol\beta}_R$、$\tilde\sigma_0^2=RSS_0/n$（把式（21.13）代入即得，$RSS_0$ 即受限残差平方和 $RSS_R$）。于是
$$W=\frac{(R\hat{\boldsymbol\beta}-\boldsymbol r)^\top[R\tilde\sigma_1^2(X^\top X)^{-1}R^\top]^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)}{1}=n\,\frac{RSS_0-RSS_1}{RSS_1},\tag{21.16}$$
$$LR=2[\ell(\hat{\boldsymbol\beta},\tilde\sigma_1^2)-\ell(\hat{\boldsymbol\beta}_R,\tilde\sigma_0^2)]=n\ln\frac{RSS_0}{RSS_1},\tag{21.17}$$
$$LM=n\,\frac{RSS_0-RSS_1}{RSS_0}.\tag{21.18}$$
这三个等式都需要验证。对 Wald：由式（21.14），$(R\hat{\boldsymbol\beta}-\boldsymbol r)^\top[R(X^\top X)^{-1}R^\top]^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)=RSS_0-RSS_1$；除以 $\tilde\sigma_1^2=RSS_1/n$ 即得式（21.16），即得式（21.16）。又由定理 21.11 中 $F$ 的定义，$RSS_0-RSS_1=qF\cdot RSS_1/(n-p)$，故 $W=\dfrac{n}{n-p}\,qF$；若改用 $s^2=RSS_1/(n-p)$ 作尺度，同一二次型恰为 $qF$。这就是渐近 Wald 统计量与有限样本精确 $F$ 检验的全部差别：两者单调等价，仅尺度因子不同。

对似然比：先把 $\sigma^2$ 消去。固定 $\boldsymbol\beta$，令 $Q(\boldsymbol\beta)=(y-X\boldsymbol\beta)^\top(y-X\boldsymbol\beta)$，对 $\sigma^2$ 求导得 $\partial\ell/\partial\sigma^2=-n/(2\sigma^2)+Q/(2\sigma^4)=0$，故剖面极大值在 $\sigma^2=Q/n$ 处取得，代回得
$$\max_{\sigma^2}\ell(\boldsymbol\beta,\sigma^2)=-\frac n2\ln(2\pi)-\frac n2\ln\frac{Q(\boldsymbol\beta)}{n}-\frac n2 .$$
于是 $LR=2[\ell_{\max}(\hat{\boldsymbol\beta})-\ell_{\max}(\hat{\boldsymbol\beta}_R)]=-n\ln Q(\hat{\boldsymbol\beta})+n\ln Q(\hat{\boldsymbol\beta}_R)=n\ln(RSS_1^{-1}\cdot RSS_0)$，即式（21.17）。

对 LM：得分向量与信息的受限形式为
$$\frac{\partial\ell}{\partial\boldsymbol\beta}=\frac{1}{\sigma^2}X^\top(y-X\boldsymbol\beta),\qquad -\mathbb E\left[\frac{\partial^2\ell}{\partial\boldsymbol\beta\,\partial\boldsymbol\beta^\top}\right]=\frac{1}{\sigma^2}X^\top X .$$
在受限估计处 $\sigma^2=\tilde\sigma_0^2=RSS_0/n$，记 $\hat{\boldsymbol u}_R=y-X\hat{\boldsymbol\beta}_R$，则带约束的 Lagrange 一阶条件给出 $X^\top\hat{\boldsymbol u}_R=R^\top\hat{\boldsymbol\lambda}$，$\hat{\boldsymbol\lambda}=(RAR^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)$。LM 统计量是得分在约束方向上的投影长度，
$$LM=\frac{\hat{\boldsymbol u}_R^\top X(X^\top X)^{-1}X^\top\hat{\boldsymbol u}_R}{\tilde\sigma_0^2}=\frac{\hat{\boldsymbol\lambda}^\top R(X^\top X)^{-1}R^\top\hat{\boldsymbol\lambda}}{\tilde\sigma_0^2}=\frac{\hat{\boldsymbol\lambda}^\top RAR^\top\hat{\boldsymbol\lambda}}{\tilde\sigma_0^2}=\frac{(R\hat{\boldsymbol\beta}-\boldsymbol r)^\top(RAR^\top)^{-1}(R\hat{\boldsymbol\beta}-\boldsymbol r)}{\tilde\sigma_0^2}=\frac{RSS_0-RSS_1}{RSS_0/n},$$
即式（21.18）。

三者的排序是初等不等式的推论。令 $x=(RSS_0-RSS_1)/RSS_1\ge 0$（因 $RSS_0\ge RSS_1$，命题 21.7 的单调性），则
$$W=nx,\qquad LR=n\ln(1+x),\qquad LM=n\left(1-\frac{1}{1+x}\right)=\frac{nx}{1+x}.$$
由 $\dfrac{x}{1+x}\le\ln(1+x)\le x$（$x\ge 0$，两式分别由 $\ln(1+x)=\int_0^x\frac{dt}{1+t}$ 与被积函数的上下界得到），有
$$LM\le LR\le W,$$
且三者都是 $x$、从而都是 $F$ 统计量的严格递增函数：在正态线性模型下三种检验给出**完全相同的拒绝域排序**，只是临界值的标定不同。渐近地，$x\to 0$ 时三者一阶相同，均在 $H_0$ 下收敛到 $\chi^2_q$，在局部备择下收敛到同一非中心 $\chi^2_q$，这就是「三大检验渐近等价」的准确含义。有限样本中，$W/q$ 与精确 $F$ 相差一个 $(n-p)/n$ 因子，故 Wald 检验在小样本中偏激进；实务上优先报告 $F$（或 $t$）统计量。
单个系数的推断是 $q=1$ 的特例，取 $R=\boldsymbol e_j^\top$（第 $j$ 个单位行向量）、$\boldsymbol r=\beta_{j0}$。由式（21.10）与定理 21.9，
$$t_j=\frac{\hat\beta_j-\beta_{j0}}{s\sqrt{A_{jj}}}\sim t_{n-p},$$
其中 $A_{jj}=[(X^\top X)^{-1}]_{jj}$。$\beta_j$ 的 $1-\alpha$ 置信区间为
$$\left[\hat\beta_j-t_{n-p;1-\alpha/2}\,s\sqrt{A_{jj}},\ \hat\beta_j+t_{n-p;1-\alpha/2}\,s\sqrt{A_{jj}}\right],$$
它是把接受域 $\lvert t_j\rvert\le t_{n-p;1-\alpha/2}$ 对 $\beta_{j0}$ 反解得到的，因而在重复抽样意义下以频率 $1-\alpha$ 覆盖真值。对任意线性组合 $\boldsymbol c^\top\boldsymbol\beta$，同一论证给出 $t=\dfrac{\boldsymbol c^\top\hat{\boldsymbol\beta}-\boldsymbol c^\top\boldsymbol\beta_0}{s\sqrt{\boldsymbol c^\top A\boldsymbol c}}\sim t_{n-p}$。区间宽度由 $s\sqrt{A_{jj}}$ 决定，而 $A_{jj}$ 随解释变量之间的相关性增大而增大——这是下一节多重共线性讨论的入口。

**例 21.4**

某收益回归以 $n=120$ 个月度观测估计无约束模型
$$r_t=\beta_0+\beta_1 x_{1t}+\beta_2 x_{2t}+\beta_3 x_{3t}+u_t,$$
得 $RSS_1=0.8420$。现检验 $H_0:\beta_2=\beta_3=0$（即后两个因子无解释力），受约束模型 $r_t=\beta_0+\beta_1x_{1t}+u_t$ 的残差平方和为 $RSS_0=0.8915$。求 $F$ 统计量、$s^2$、$R^2$ 的变化，并在 $5\%$ 水平下作判断（$F_{2,116;0.95}\approx 3.07$）。

**解**

此处 $p=4$，$q=2$，$n-p=116$。由式（21.15）的等价形式，
$$F=\frac{(RSS_0-RSS_1)/q}{RSS_1/(n-p)}=\frac{(0.8915-0.8420)/2}{0.8420/116}=\frac{0.02475}{0.00725863}=3.410 .$$
无约束方差估计为 $s^2=RSS_1/(n-p)=0.8420/116=0.00725863$，即 $s=0.08519$（月度收益标准差约 $8.52\%$）。因为 $3.410>3.07$，在 $5\%$ 水平下拒绝 $H_0$：两个因子联合显著。

约束的方向可由 $R^2$ 的变化读出。设总平方和 $TSS=1.2400$（不随约束改变，定理 21.5），则无约束 $R^2_1=1-0.8420/1.2400=0.32097$，受约束 $R^2_0=1-0.8915/1.2400=0.28105$，下降 $0.0399$。$F$ 统计量也可写成
$$F=\frac{(R^2_1-R^2_0)/q}{(1-R^2_1)/(n-p)}=\frac{0.0399/2}{0.67903/116}=3.410,$$
与上面一致。这说明 $F$ 检验既可用残差平方和之差，也可用拟合优度之差来表达，两者恒等。
**例 21.5**

承例 21.4，无约束回归给出 $\hat\beta_2=0.0142$，$[(X^\top X)^{-1}]_{33}=A_{33}=0.0296$（对应 $\beta_2$ 的位置），$s=0.08519$，$n-p=116$，$t_{116;0.975}\approx 1.981$。检验 $H_0:\beta_2=0$ 并给出 $95\%$ 置信区间；再说明该单系数检验与例 21.4 的联合检验为何结论可能不同。

**解**

标准误为 $\operatorname{se}(\hat\beta_2)=s\sqrt{A_{33}}=0.08519\times\sqrt{0.0296}=0.08519\times 0.172046=0.014657$。于是
$$t=\frac{0.0142}{0.014657}=0.969 .$$
因 $\lvert t\rvert=0.969<1.981$，不能拒绝 $\beta_2=0$；$t^2=0.939$ 即是仅含此约束的 $F_{1,116}$ 统计量。

置信区间为
$$0.0142\pm 1.981\times 0.014657=0.0142\pm 0.029036=[-0.0148,\ 0.0432].$$
区间跨越零点，与检验结论一致；其宽度约为点估计的两倍，说明该系数的抽样误差与估计值同量级，任何基于它的经济解释都需谨慎。

联合检验拒绝了 $H_0:\beta_2=\beta_3=0$，而单系数检验未能拒绝 $\beta_2=0$，两者并不矛盾：联合检验利用了两个约束方向上的信息之和，且 $F$ 检验的势依赖于 $R\boldsymbol\beta$ 整体的偏离，而非单个分量。反过来也可能出现单系数显著而联合不显著的情形（当另一个系数把二次型「稀释」时）。这说明多重检验与联合检验的逻辑不同，第20章对此有系统讨论。

## 21.5 诊断与模型违背

最小二乘的优良性质依赖于一组假设：条件均值正确设定、同方差、无自相关、解释变量与误差无关。诊断的目的不是「通过检验」，而是判断哪些结论对假设的偏离敏感，哪些不敏感。本节沿残差、共线性、异方差、自相关、非正态五条线索展开，每条都先给出违背的后果，再给出可计算的诊断量与修正手段。

### 21.5.1 杠杆值、学生化残差与 Cook 距离

**注记（杠杆值）**　第 $i$ 个观测的杠杆值定义为投影矩阵的对角元
$$h_{ii}=P_{ii}=\boldsymbol x_i^\top(X^\top X)^{-1}\boldsymbol x_i,$$
其中 $\boldsymbol x_i^\top$ 是 $X$ 的第 $i$ 行。它度量第 $i$ 个观测在解释变量空间中的「位置极端程度」：拟合值 $\hat y_i=\sum_j P_{ij}y_j$ 中自身 $y_i$ 的权重正是 $h_{ii}$。杠杆值满足三条性质：$0\le h_{ii}\le 1$；$\sum_{i=1}^n h_{ii}=p$；若模型含截距项，则 $\sum_j P_{ij}=1$ 且 $h_{ii}\ge 1/n$。

**证明**

第一条：由 $P$ 对称幂等（定理 21.4），$h_{ii}=P_{ii}=(P^2)_{ii}=\sum_{j=1}^n P_{ij}P_{ji}=\sum_{j=1}^n P_{ij}^2\ge P_{ii}^2=h_{ii}^2$，故 $h_{ii}(1-h_{ii})\ge 0$；又 $h_{ii}=\sum_j P_{ij}^2\ge 0$，两式合并得 $0\le h_{ii}\le 1$。

第二条：$\sum_{i=1}^n h_{ii}=\operatorname{tr}P$，而定理 21.4 给出 $\operatorname{tr}P=\operatorname{rank}P=p$。这个恒等式的含义是「杠杆总量等于参数个数」：$p$ 个自由度被 $n$ 个观测按 $h_{ii}$ 分摊，若某个 $h_{ii}$ 接近 $1$，它单独占用了几乎一个参数的自由度，其余观测的杠杆必然被压缩。

第三条：含截距时 $X$ 的第一列为全 $1$ 向量 $\boldsymbol\iota$，而 $\boldsymbol\iota\in\mathcal C(X)$ 意味着 $P\boldsymbol\iota=\boldsymbol\iota$，逐行读出即 $\sum_j P_{ij}=1$。对 $n$ 个实数 $P_{i1},\dots,P_{in}$ 应用 Cauchy–Schwarz 不等式得 $\bigl(\sum_jP_{ij}\bigr)^2\le n\sum_jP_{ij}^2$，代入 $\sum_jP_{ij}=1$ 与 $\sum_jP_{ij}^2=h_{ii}$ 即得 $1\le n h_{ii}$，即 $h_{ii}\ge 1/n$。等号当且仅当该行所有 $P_{ij}$ 相等，即完全「平衡」的设计。

□

平均杠杆为 $\bar h=p/n$，实务上把 $h_{ii}>2p/n$ 或 $h_{ii}>3p/n$ 的观测标记为高杠杆点。高杠杆点本身不必是坏点——它可能恰好提供了识别斜率的关键信息——但它对估计的影响大，须结合残差一起判断。
**注记（学生化残差）**　由 $e=My$（定理 21.4）与 $\operatorname{Cov}(\boldsymbol u)=\sigma^2I_n$，
$$\operatorname{Cov}(e)=\operatorname{Cov}(My)=\sigma^2MM^\top=\sigma^2M,$$
故残差本身既非同方差（$\operatorname{Var}(e_i)=\sigma^2(1-h_{ii})$）也非不相关（$\operatorname{Cov}(e_i,e_j)=-\sigma^2P_{ij}$，$i\ne j$）。直接把 $e_i$ 当离群指标会系统性低估高杠杆点的异常程度。为此定义**内部学生化残差**
$$r_i=\frac{e_i}{s\sqrt{1-h_{ii}}},$$
与**外部学生化残差**（或称学生化删除残差）
$$t_i=\frac{e_i}{s_{(i)}\sqrt{1-h_{ii}}},$$
其中 $s_{(i)}^2$ 是删去第 $i$ 个观测后重估的方差：
$$s_{(i)}^2=\frac{(n-p)s^2-e_i^2/(1-h_{ii})}{n-p-1}.$$
在正态假设下 $t_i\sim t_{n-p-1}$（原假设「第 $i$ 个观测来自同一模型」成立时），因而可用统一的临界值判断离群；而 $r_i$ 的分布依赖于未知的 $h_{ii}$，只宜作相对比较。

删除残差与 $e_i$ 之间有一条精确恒等式。设 $\hat{\boldsymbol\beta}_{(i)}$ 为删去第 $i$ 个观测后的最小二乘估计，$A=(X^\top X)^{-1}$，则
$$\hat{\boldsymbol\beta}_{(i)}=\hat{\boldsymbol\beta}-\frac{A\boldsymbol x_i e_i}{1-h_{ii}},\qquad y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}_{(i)}=\frac{e_i}{1-h_{ii}}.$$
验证：删除一个观测等价于把该观测的权重降为零，用 Sherman–Morrison 公式对 $X^\top X-\boldsymbol x_i\boldsymbol x_i^\top$ 求逆即得第一式；第二式由
$$y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}_{(i)}=y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}+\frac{\boldsymbol x_i^\top A\boldsymbol x_i}{1-h_{ii}}e_i=e_i+\frac{h_{ii}}{1-h_{ii}}e_i=\frac{e_i}{1-h_{ii}}$$
得到，其中用了 $\boldsymbol x_i^\top A\boldsymbol x_i=h_{ii}$。这说明「预测第 $i$ 点的删除误差」正好是普通残差放大 $1/(1-h_{ii})$ 倍，杠杆越大放大越剧烈。

**注记（Cook 距离）**　Cook 距离度量删除第 $i$ 个观测对全部拟合值的影响，定义为
$$D_i=\frac{(\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}_{(i)})^\top X^\top X(\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}_{(i)})}{p\,s^2}=\frac{e_i^2}{p\,s^2}\cdot\frac{h_{ii}}{(1-h_{ii})^2}.\tag{21.19}$$
两个表达式的等价性：把 $\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}_{(i)}=A\boldsymbol x_i e_i/(1-h_{ii})$ 代入二次型，
$$(\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}_{(i)})^\top X^\top X(\hat{\boldsymbol\beta}-\hat{\boldsymbol\beta}_{(i)})=\frac{e_i^2}{(1-h_{ii})^2}\boldsymbol x_i^\top A X^\top X A\boldsymbol x_i=\frac{e_i^2}{(1-h_{ii})^2}\boldsymbol x_i^\top A\boldsymbol x_i=\frac{e_i^2h_{ii}}{(1-h_{ii})^2},$$
其中 $AX^\top XA=A$。$D_i$ 因此是「残差大小」与「杠杆」的乘积：只有既偏离又大杠杆的观测才会真正扭曲估计。经验阈值取 $D_i>1$ 或 $D_i>4/n$。
**例 21.6**

设 $n=5$，$x=(1,2,3,4,10)^\top$，$y=(1,3,2,5,18)^\top$，模型含截距。计算全部杠杆值、$s$、内部学生化残差与 Cook 距离，并考察删除第 $5$ 个观测的影响。

**解**

$x̄=20/5=4$，$S_{xx}=\sum x_i^2-n\bar x^2=130-80=50$。设计矩阵为 $X=[\boldsymbol\iota,\ \boldsymbol x]$，
$$X^\top X=\begin{pmatrix}5&20\\20&130\end{pmatrix},\qquad A=(X^\top X)^{-1}=\frac{1}{250}\begin{pmatrix}130&-20\\-20&5\end{pmatrix}=\begin{pmatrix}0.52&-0.08\\-0.08&0.02\end{pmatrix}.$$
$X^\top y=(29,213)^\top$，故 $\hat{\boldsymbol\beta}=A X^\top y=(0.52\times 29-0.08\times 213,\ -0.08\times 29+0.02\times 213)^\top=(-1.96,\ 1.94)^\top$。拟合值 $\hat y_i=-1.96+1.94x_i$ 依次为 $-0.02,1.92,3.86,5.80,17.44$，残差 $e=(1.02,1.08,-1.86,-0.80,0.56)^\top$。核对 $\sum e_i=0$、$\sum x_ie_i=0$（正规方程），$RSS=1.0404+1.1664+3.4596+0.64+0.3136=6.62$，
$$s^2=\frac{6.62}{5-2}=2.206667,\qquad s=1.485486 .$$
杠杆值用 $h_{ii}=1/n+(x_i-\bar x)^2/S_{xx}$：
$$h_{11}=0.2+\frac{9}{50}=0.38,\quad h_{22}=0.2+\frac{4}{50}=0.28,\quad h_{33}=0.2+\frac{1}{50}=0.22,\quad h_{44}=0.2,\quad h_{55}=0.2+\frac{36}{50}=0.92,$$
其和为 $2=p$，与注记中的迹恒等式一致。第 $5$ 个观测的杠杆 $0.92$ 远超 $2p/n=0.8$，是明显的高杠杆点：它单独占据了几乎一个参数的自由度。

内部学生化残差 $r_i=e_i/(s\sqrt{1-h_{ii}})$：
$$r_1=\frac{1.02}{1.485486\sqrt{0.62}}=0.8643,\quad r_2=\frac{1.08}{1.485486\sqrt{0.72}}=0.8604,\quad r_3=\frac{-1.86}{1.485486\sqrt{0.78}}=-1.4175,$$
$$r_4=\frac{-0.80}{1.485486\sqrt{0.80}}=-0.6021,\quad r_5=\frac{0.56}{1.485486\sqrt{0.08}}=1.3328 .$$
最大的是 $r_3$ 与 $r_5$，但都在 $t$ 分布的常见临界值之内——单看学生化残差不会判定第 $5$ 点异常。Cook 距离（式（21.19），$p=2$，$p s^2=4.413333$）为
$$D_1=\frac{1.0404}{4.413333}\cdot\frac{0.38}{0.62^2}=0.2330,\qquad D_2=\frac{1.1664}{4.413333}\cdot\frac{0.28}{0.72^2}=0.1427,$$
$$D_3=\frac{3.4596}{4.413333}\cdot\frac{0.22}{0.78^2}=0.2835,\qquad D_4=\frac{0.64}{4.413333}\cdot\frac{0.20}{0.80^2}=0.0453,$$
$$D_5=\frac{0.3136}{4.413333}\cdot\frac{0.92}{0.08^2}=10.2146 .$$
$D_5$ 比阈值 $1$ 大一个数量级，第 $5$ 点是强影响点。直接验证：$A\boldsymbol x_5=(-0.28,0.12)^\top$，$e_5/(1-h_{55})=0.56/0.08=7$，故
$$\hat{\boldsymbol\beta}_{(5)}=\hat{\boldsymbol\beta}-7A\boldsymbol x_5=(-1.96+1.96,\ 1.94-0.84)^\top=(0.00,\ 1.10)^\top .$$
删去该点后斜率由 $1.94$ 降到 $1.10$，截距由 $-1.96$ 变为 $0$；用前四点直接回归可得同一结果（$\bar x=2.5$、$\bar y=2.75$、$S_{xx}=5$、$S_{xy}=5.5$，斜率 $1.10$）。这就是高杠杆点的危险性：它的残差被自己「拉小」，学生化残差看不出异常，而它对参数的影响是决定性的。诊断必须把 $h_{ii}$ 与 $e_i$ 联合起来看，Cook 距离正是这个联合度量。

残差与影响诊断还不能识别设计矩阵内部的共线性。若某个解释变量几乎能由其余解释变量线性表示，单个系数的 sampling 不确定性会急剧增大，即使模型整体拟合仍然很好。把第 $j$ 个解释变量对其余解释变量回归，并记判定系数为 $R_j^2$，就有如下诊断量。

**定义 21.12（方差膨胀因子）**

第 $j$ 个系数的方差膨胀因子定义为
$$
\operatorname{VIF}_j=\frac{1}{1-R_j^2},\qquad
\operatorname{Var}(\hat\beta_j)=\frac{\sigma^2}{(n-1)s_j^2(1-R_j^2)}
=\operatorname{VIF}_j\frac{\sigma^2}{(n-1)s_j^2},\tag{21.20}
$$
其中 $s_j^2$ 是第 $j$ 个解释变量的样本方差，且该变量已在辅助回归中由其样本均值中心化。

较大的 $\operatorname{VIF}_j$ 并不表示模型误设，也不意味着应机械删除变量；它说明数据对该系数缺少独立信息。变量删除会改变其余系数的经济含义，并可能引入遗漏变量偏差。更稳妥的处理是补充样本、依据理论施加约束，或报告系数联合检验而非只检查单个 $t$ 统计量。
当条件均值正确而误差方差随观测变化时，普通最小二乘估计仍可无偏或一致，但通常的同方差标准误会失真。设条件独立误差的协方差阵为 $\boldsymbol\Omega=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)$，则真实条件协方差及其 White 估计为
$$
\operatorname{Var}(\hat{\boldsymbol\beta}\mid\boldsymbol X)
=(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1},\qquad
\widehat{\boldsymbol V}_0=(\boldsymbol X^\top\boldsymbol X)^{-1}
\Bigl(\sum_{i=1}^n e_i^2\boldsymbol x_i\boldsymbol x_i^\top\Bigr)
(\boldsymbol X^\top\boldsymbol X)^{-1}.\tag{21.21}
$$
第一式直接展开 $(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol u$ 的协方差即得；第二式以平方残差估计各 $\sigma_i^2$。实际推断常采用自由度修正 $n/(n-p)$，或使用以 $e_i/(1-h_{ii})$ 替代 $e_i$ 的修正版本。

**命题 21.13（White 协方差估计的一致性）**

设观测独立同分布，$\mathbb E(u_i\mid\boldsymbol x_i)=0$，$\boldsymbol Q=\mathbb E(\boldsymbol x_i\boldsymbol x_i^\top)$ 正定，并且 $\mathbb E(u_i^4)$ 与 $\mathbb E\lVert\boldsymbol x_i\rVert^4$ 有限。则 $\hat{\boldsymbol\beta}$ 依概率收敛于 $\boldsymbol\beta$，且
$$n\widehat{\boldsymbol V}_0\xrightarrow{p}\boldsymbol Q^{-1}\mathbb E(u_i^2\boldsymbol x_i\boldsymbol x_i^\top)\boldsymbol Q^{-1}.$$

**证明**

普通最小二乘表示为 $\hat{\boldsymbol\beta}-\boldsymbol\beta=(n^{-1}\boldsymbol X^\top\boldsymbol X)^{-1}n^{-1}\boldsymbol X^\top\boldsymbol u$。大数定律给出两个样本矩分别依概率收敛于 $\boldsymbol Q$ 与零矩阵，连续映射定理遂给出估计量的一致性。同理，$n\widehat{\boldsymbol V}_0$ 的前后两个因子分别收敛于 $\boldsymbol Q^{-1}$。
记 $\boldsymbol B=\mathbb E(u_i^2\boldsymbol x_i\boldsymbol x_i^\top)$。四阶矩条件保证大数定律适用于 $n^{-1}\sum_{i=1}^n u_i^2\boldsymbol x_i\boldsymbol x_i^\top$，其概率极限为 $\boldsymbol B$。令 $\boldsymbol d=\hat{\boldsymbol\beta}-\boldsymbol\beta$，则由
$$e_i^2-u_i^2=-2u_i\boldsymbol x_i^\top\boldsymbol d+(\boldsymbol x_i^\top\boldsymbol d)^2$$
以及 Cauchy–Schwarz 不等式，差矩阵的范数不超过
$$2\lVert\boldsymbol d\rVert\frac1n\sum_{i=1}^n|u_i|\lVert\boldsymbol x_i\rVert^3
+\lVert\boldsymbol d\rVert^2\frac1n\sum_{i=1}^n\lVert\boldsymbol x_i\rVert^4.$$
四阶矩条件使两个平均具有有限概率极限，而 $\boldsymbol d\xrightarrow{p}\boldsymbol 0$，故差矩阵依概率收敛于零矩阵。于是中间矩阵依概率收敛于 $\boldsymbol B$，连续映射定理给出结论。

□

在时间序列中，误差还可能自相关。Durbin–Watson 统计量 $dw=\sum_{t=2}^n(e_t-e_{t-1})^2/\sum_{t=1}^n e_t^2$ 接近 $2(1-\hat\rho_1)$，可筛查一阶自相关，但不能替代对残差相关图和动态设定的检查。若仍采用普通最小二乘估计，应使用异方差自相关稳健协方差。Newey–West 估计取
$$
\widehat{\boldsymbol V}_{NW}=(\boldsymbol X^\top\boldsymbol X)^{-1}
\Bigl[\sum_{t=1}^n e_t^2\boldsymbol x_t\boldsymbol x_t^\top
+\sum_{\ell=1}^L\Bigl(1-\frac{\ell}{L+1}\Bigr)
\sum_{t=\ell+1}^n e_te_{t-\ell}
(\boldsymbol x_t\boldsymbol x_{t-\ell}^\top+\boldsymbol x_{t-\ell}\boldsymbol x_t^\top)\Bigr]
(\boldsymbol X^\top\boldsymbol X)^{-1}.\tag{21.22}
$$
 Bartlett 权重降低高阶滞后协方差的影响，并保证估计的半正定性。带宽 $L$ 应随样本量增加但保持 $L/n\to0$；它控制偏差与方差的折中，而不是凭显著性结果反复选择。
若残差呈现稳定的 AR(1) 结构 $u_t=\rho u_{t-1}+\varepsilon_t$，还可作广义差分，用 $y_t-\rho y_{t-1}$ 对 $x_t-\rho x_{t-1}$ 回归，截距项也相应变为 $(1-\rho)$。已知 $\rho$ 时该变换消除一阶自相关；未知时可先以残差估计 $\rho$，再进行可行估计。Prais–Winsten 方法保留并特别缩放首个观测，Cochrane–Orcutt 方法则舍弃它。若自相关来自遗漏动态项，单纯修正标准误或变换误差并不能修复条件均值误设。

## 21.6 广义最小二乘与最佳线性无偏估计

同方差是普通最小二乘具有最佳线性无偏性质的关键条件。若误差的协方差结构已知，先按该结构重新加权，就能恢复球面误差并提高效率。本节设
$$\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u,\qquad
\mathbb E(\boldsymbol u\mid\boldsymbol X)=\boldsymbol 0,\qquad
\operatorname{Cov}(\boldsymbol u\mid\boldsymbol X)=\sigma^2\boldsymbol\Omega,$$
其中 $\boldsymbol\Omega$ 是已知正定矩阵，$\boldsymbol X$ 列满秩。

**定理 21.14（广义最小二乘估计）**

使 $(\boldsymbol y-\boldsymbol X\boldsymbol b)^\top\boldsymbol\Omega^{-1}(\boldsymbol y-\boldsymbol X\boldsymbol b)$ 最小的估计量称为广义最小二乘估计量。它及其条件协方差为
$$
\hat{\boldsymbol\beta}_{GLS}=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}
\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol y,\qquad
\operatorname{Cov}(\hat{\boldsymbol\beta}_{GLS}\mid\boldsymbol X)
=\sigma^2(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}.\tag{21.23}
$$

**证明**

目标函数对 $\boldsymbol b$ 求导并令其为零，得到正规方程
$$-2\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol y
+2\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X\hat{\boldsymbol\beta}_{GLS}=\boldsymbol 0.$$
$\boldsymbol\Omega^{-1}$ 正定且 $\boldsymbol X$ 列满秩，故 $\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X$ 正定，解唯一且由式（21.23）给出。对任意不在列空间内的方向，目标函数的二阶导矩阵同为该正定矩阵，因此驻点确为全局最小点。代入 $\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u$，得 $\hat{\boldsymbol\beta}_{GLS}-\boldsymbol\beta=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol u$，对其求条件协方差并用 $\boldsymbol\Omega^{-1}\boldsymbol\Omega\boldsymbol\Omega^{-1}=\boldsymbol\Omega^{-1}$，即得协方差公式。

□
计算上不必显式构造 $\boldsymbol\Omega^{-1}$。取 Cholesky 分解 $\boldsymbol\Omega=\boldsymbol L\boldsymbol L^\top$，其中 $\boldsymbol L$ 为可逆下三角矩阵，并作变换
$$
\boldsymbol y_*=\boldsymbol L^{-1}\boldsymbol y,\qquad
\boldsymbol X_*=\boldsymbol L^{-1}\boldsymbol X,\qquad
\boldsymbol u_*=\boldsymbol L^{-1}\boldsymbol u,\qquad
\operatorname{Cov}(\boldsymbol u_*\mid\boldsymbol X)=\sigma^2\boldsymbol I_n.\tag{21.24}
$$
于是 $\boldsymbol y_*=\boldsymbol X_*\boldsymbol\beta+\boldsymbol u_*$ 满足普通最小二乘的球面误差条件。由于
$$(\boldsymbol y_*-\boldsymbol X_*\boldsymbol b)^\top(\boldsymbol y_*-\boldsymbol X_*\boldsymbol b)
=(\boldsymbol y-\boldsymbol X\boldsymbol b)^\top\boldsymbol\Omega^{-1}(\boldsymbol y-\boldsymbol X\boldsymbol b),$$
对变换数据运行普通最小二乘与直接求解广义最小二乘完全等价，残差平方和、方差估计及检验也可在同一变换框架内计算。

**定理 21.15（广义 Gauss–Markov 定理）**

在上述条件下，$\hat{\boldsymbol\beta}_{GLS}$ 是 $\boldsymbol\beta$ 的最佳线性无偏估计量：对任意线性无偏估计量 $\tilde{\boldsymbol\beta}$，矩阵 $\operatorname{Cov}(\tilde{\boldsymbol\beta}\mid\boldsymbol X)-\operatorname{Cov}(\hat{\boldsymbol\beta}_{GLS}\mid\boldsymbol X)$ 半正定。特别地，对任意固定向量 $\boldsymbol a$，广义最小二乘估计在 $\boldsymbol a^\top\boldsymbol\beta$ 的所有线性无偏估计中具有最小条件方差。

**证明**

记 $\boldsymbol A=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}$，则 $\hat{\boldsymbol\beta}_{GLS}=\boldsymbol A\boldsymbol y$ 且 $\boldsymbol A\boldsymbol X=\boldsymbol I_p$。任意线性估计量可写为 $\tilde{\boldsymbol\beta}=\boldsymbol C\boldsymbol y$，其中 $\boldsymbol C$ 只依赖于设计矩阵和已知的 $\boldsymbol\Omega$。无偏性要求对一切 $\boldsymbol\beta$ 都有
$$\mathbb E(\boldsymbol C\boldsymbol y\mid\boldsymbol X)=\boldsymbol C\boldsymbol X\boldsymbol\beta=\boldsymbol\beta,$$
故 $\boldsymbol C\boldsymbol X=\boldsymbol I_p$。令 $\boldsymbol D=\boldsymbol C-\boldsymbol A$，则 $\boldsymbol D\boldsymbol X=\boldsymbol 0$。展开协方差矩阵可得
$$
\operatorname{Cov}(\tilde{\boldsymbol\beta}\mid\boldsymbol X)
-\operatorname{Cov}(\hat{\boldsymbol\beta}_{GLS}\mid\boldsymbol X)
=\sigma^2(\boldsymbol A\boldsymbol\Omega\boldsymbol D^\top
+\boldsymbol D\boldsymbol\Omega\boldsymbol A^\top
+\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top)
=\sigma^2\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top\succeq\boldsymbol 0.\tag{21.25}
$$
这里交叉项为零，因为
$$\boldsymbol A\boldsymbol\Omega\boldsymbol D^\top
=(\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X)^{-1}\boldsymbol X^\top\boldsymbol D^\top=\boldsymbol 0,$$
另一交叉项是其转置。对任意 $\boldsymbol a$，以 $\boldsymbol a^\top$ 左乘、以 $\boldsymbol a$ 右乘式（21.25），便得两个线性无偏估计的方差之差为非负数。若差为零，则 $\boldsymbol D\boldsymbol\Omega\boldsymbol D^\top=\boldsymbol 0$；由 $\boldsymbol\Omega$ 正定可知 $\boldsymbol D=\boldsymbol 0$，故最佳线性无偏估计量唯一。整个论证没有使用正态性。

□

当 $\boldsymbol\Omega=\operatorname{diag}(\sigma_1^2,\ldots,\sigma_n^2)$ 时，广义最小二乘退化为加权最小二乘。取 $w_i$ 与 $1/\sigma_i^2$ 成比例，估计量为
$$
\hat{\boldsymbol\beta}_{WLS}
=\Bigl(\sum_{i=1}^n w_i\boldsymbol x_i\boldsymbol x_i^\top\Bigr)^{-1}
\sum_{i=1}^n w_i\boldsymbol x_i y_i.\tag{21.26}
$$
共同的权重比例因子会被正规方程消去，因此只需知道相对方差。权重反映观测的信息量，而不是根据因变量大小任意奖惩观测。
**例 21.7**

设 $y_i=\mu+u_i$，三个观测的误差互不相关，$\operatorname{Var}(u_1)=1$、$\operatorname{Var}(u_2)=4$、$\operatorname{Var}(u_3)=9$，且 $y=(2,4,6)^\top$。求广义最小二乘估计及其方差，并与普通最小二乘比较。

**解**

取与方差倒数成比例的权重 $(36,9,4)$。由式（21.26），
$$\hat\mu_{GLS}=\frac{36\cdot2+9\cdot4+4\cdot6}{36+9+4}=\frac{132}{49}.$$
因为 $\sum_i\sigma_i^{-2}=1+1/4+1/9=49/36$，故 $\operatorname{Var}(\hat\mu_{GLS})=36/49$。普通最小二乘给出 $\hat\mu_{OLS}=4$，其方差为
$$\operatorname{Var}(\hat\mu_{OLS})=\frac{1+4+9}{9}=\frac{14}{9}.$$
二者均无偏，而 $36/49<14/9$，体现了按精度加权所带来的效率改进。较大的权重赋予第一个观测，并非因其响应值较小，而是因其误差方差最小。
实际研究中，$\boldsymbol\Omega$ 往往未知。可先用普通最小二乘残差估计方差函数或相关参数，再以 $\widehat{\boldsymbol\Omega}$ 替代 $\boldsymbol\Omega$，得到可行广义最小二乘估计
$$
\hat{\boldsymbol\beta}_{FGLS}
=(\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol X)^{-1}
\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol y.\tag{21.27}
$$
例如，异方差情形可设 $\sigma_i^2=\exp(\boldsymbol z_i^\top\boldsymbol\gamma)$，先估计 $\boldsymbol\gamma$，再取权重 $w_i=\exp(-\boldsymbol z_i^\top\hat{\boldsymbol\gamma})$；自相关情形则可估计 AR 参数并构造相应的 $\widehat{\boldsymbol\Omega}$。

**命题 21.16（可行广义最小二乘的一致性）**

设 $\boldsymbol G_n=n^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol X\xrightarrow{p}\boldsymbol Q$，其中 $\boldsymbol Q$ 正定，并且 $n^{-1}\boldsymbol X^\top\boldsymbol\Omega^{-1}\boldsymbol u\xrightarrow{p}\boldsymbol 0$。若 $\widehat{\boldsymbol\Omega}^{-1}-\boldsymbol\Omega^{-1}\xrightarrow{p}\boldsymbol 0$，且 $n^{-1}\sum_{i=1}^n\lVert\boldsymbol x_i\rVert^2$ 与 $n^{-1}\sum_{i=1}^n\lVert\boldsymbol x_i\rVert|u_i|$ 均依概率有界，则 $\hat{\boldsymbol\beta}_{FGLS}\xrightarrow{p}\boldsymbol\beta$。

**证明**

令 $\boldsymbol\Delta_n=\widehat{\boldsymbol\Omega}^{-1}-\boldsymbol\Omega^{-1}$。由矩阵范数的次乘性，
$$\Bigl\lVert n^{-1}\boldsymbol X^\top\boldsymbol\Delta_n\boldsymbol X\Bigr\rVert
\le\lVert\boldsymbol\Delta_n\rVert n^{-1}\sum_{i=1}^n\lVert\boldsymbol x_i\rVert^2
\xrightarrow{p}0,$$
故 $n^{-1}\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol X\xrightarrow{p}\boldsymbol Q$。类似地，
$$\Bigl\lVert n^{-1}\boldsymbol X^\top\boldsymbol\Delta_n\boldsymbol u\Bigr\rVert
\le\lVert\boldsymbol\Delta_n\rVert n^{-1}\sum_{i=1}^n\lVert\boldsymbol x_i\rVert|u_i|
\xrightarrow{p}0,$$
所以 $n^{-1}\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol u\xrightarrow{p}\boldsymbol 0$。将 $\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u$ 代入式（21.27），便有
$$\hat{\boldsymbol\beta}_{FGLS}-\boldsymbol\beta
=(n^{-1}\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol X)^{-1}
 n^{-1}\boldsymbol X^\top\widehat{\boldsymbol\Omega}^{-1}\boldsymbol u.$$
第一个因子依概率收敛于 $\boldsymbol Q^{-1}$，第二个因子依概率收敛于 $\boldsymbol 0$，连续映射定理遂给出所求一致性。

□

可行估计的有限样本分布还受到第一步估计的影响，不能直接照搬已知 $\boldsymbol\Omega$ 时的公式。若方差模型设定错误，可行广义最小二乘通常仍可在条件均值正确时保持一致，但应配合稳健协方差进行推断；效率主张则必须以权重模型足够可靠为前提。

## 21.7 量化研究中的线性回归

线性回归把资产收益分解为可解释的共同风险暴露与资产特有波动。对资产 $i$，记其超额收益为 $r_{it}^e$，市场超额收益为 $r_{mt}^e$。CAPM 的时间序列回归为
$$
r_{it}^e=\alpha_i+\beta_i r_{mt}^e+\varepsilon_{it},\qquad
\beta_i=\frac{\operatorname{Cov}(r_{it}^e,r_{mt}^e)}{\operatorname{Var}(r_{mt}^e)}.\tag{21.28}
$$
斜率 $\beta_i$ 衡量收益对市场共同变动的敏感度，而不是资产收益与市场的简单相关系数；相关系数还取决于两者波动率。截距 $\alpha_i$ 是给定市场暴露后的平均超额表现。估计结果依赖市场代理、样本窗口与收益频率，因此报告 beta 时必须同时说明这些选择。

多因子模型把单一市场收益替换为因子向量 $\boldsymbol f_t$，写作 $r_{it}^e=\alpha_i+\boldsymbol\beta_i^\top\boldsymbol f_t+\varepsilon_{it}$。此时 $\boldsymbol\beta_i$ 是因子暴露向量，回归系数的经济解释以其他因子保持不变为条件。因子之间高度相关会放大暴露估计的方差，式（21.20）可用来诊断这种问题；收益序列的异方差与自相关则要求采用式（21.21）或式（21.22）的协方差估计。
检验一个资产的 alpha 与检验一組资产的 alpha 是不同问题。把 $N$ 个资产的截距堆叠为 $\boldsymbol\alpha$，若 $\widehat{\boldsymbol V}_{\alpha}$ 是 $\hat{\boldsymbol\alpha}$ 的一致协方差估计，则联合原假设 $\boldsymbol\alpha=\boldsymbol 0$ 下的 Wald 统计量满足
$$
W=\hat{\boldsymbol\alpha}^\top\widehat{\boldsymbol V}_{\alpha}^{-1}
\hat{\boldsymbol\alpha}\xrightarrow{d}\chi_N^2.\tag{21.29}
$$
这里必须保留不同资产 alpha 估计之间的协方差；把各次单资产检验的显著性简单相加会忽略共同因子和残差相关。小样本正态模型可采用相应的 $F$ 版本，其自由度由资产个数与每个回归的剩余自由度决定。若研究目标是发现少数异常资产，还应对大量单资产检验控制多重比较错误。

事件研究把上述因子回归用于估计正常收益。先在事件前估计窗拟合 $\hat\alpha_i$ 与 $\hat{\boldsymbol\beta}_i$，再对事件时间 $\tau$ 定义异常收益 $AR_{i\tau}=r_{i\tau}^e-\hat\alpha_i-\hat{\boldsymbol\beta}_i^\top\boldsymbol f_\tau$。从 $\tau_1$ 到 $\tau_2$ 的累计异常收益为 $CAR_i=\sum_{\tau=\tau_1}^{\tau_2}AR_{i\tau}$，横截面平均记为 $\overline{CAR}=N^{-1}\sum_{i=1}^N CAR_i$。其标准误既要包含估计窗参数误差，也要处理事件窗内的序列相关。若不同公司事件日相同或事件窗重叠，横截面残差通常相关，此时把 $N$ 个累计异常收益当作独立观测会低估标准误；应保留协方差、按事件日期聚类，或采用保持相关结构的再抽样。

估计窗若包含事件本身，会把事件效应吸收进正常收益模型；事件窗若根据结果反复调整，则显著性不再具有名义含义。研究设计因此需要事先规定窗口、因子模型和排除规则，并报告对这些选择的敏感性。
**例 21.8**

某股票的事件前 CAPM 估计为 $\hat\alpha=0.001$、$\hat\beta=1.2$。事件日股票收益与市场超额收益分别为 $0.05$ 和 $0.02$，次日分别为 $-0.015$ 和 $-0.01$。计算两日累计异常收益。

**解**

事件日异常收益为
$$AR_0=0.05-0.001-1.2\times0.02=0.025,$$
次日异常收益为
$$AR_1=-0.015-0.001-1.2\times(-0.01)=-0.004.$$
故 $CAR=AR_0+AR_1=0.021$，即两日累计异常收益为 $2.1\%$。这一数值描述相对基准模型的偏离；若要作统计推断，还需估计其方差并处理参数估计误差。

Fama–MacBeth 回归从另一方向研究风险暴露与预期收益的关系。先在时间序列回归中估计各资产的因子暴露，再于每个时期 $t$ 用收益 $r_{it}$ 对既定暴露 $\boldsymbol z_{i,t-1}$ 作横截面回归：$r_{it}=\lambda_{0t}+\boldsymbol z_{i,t-1}^\top\boldsymbol\lambda_t+\eta_{it}$。系数 $\boldsymbol\lambda_t$ 是该期的因子风险价格，最终估计取其时间平均 $\bar{\boldsymbol\lambda}=T^{-1}\sum_{t=1}^T\hat{\boldsymbol\lambda}_t$。若各期估计近似不相关，其协方差估计为
$$
\widehat{\operatorname{Var}}(\bar{\boldsymbol\lambda})
=\frac{1}{T(T-1)}\sum_{t=1}^T
(\hat{\boldsymbol\lambda}_t-\bar{\boldsymbol\lambda})
(\hat{\boldsymbol\lambda}_t-\bar{\boldsymbol\lambda})^\top.\tag{21.30}
$$
横截面回归允许残差相关，时间序列平均则利用风险价格的时间变化形成标准误。若 $\hat{\boldsymbol\lambda}_t$ 自相关，应把式（21.30）替换为相应的时间序列稳健协方差。第一期使用估计 beta 还会产生变量误差，必要时需作 Shanken 修正；横截面残差相关也会影响第二阶段估计的协方差。
把回归直接用于价格水平时，必须警惕伪回归。两个彼此独立但各自含单位根的序列，都可能在样本内呈现平滑趋势；其回归残差仍非平稳，常规大数定律与中心极限定理不再给出通常的结论，于是可能出现很高的 $R^2$ 和看似显著的 $t$ 统计量，却不存在稳定的经济关系。确定性时间趋势也会造成类似的虚假相关。诊断不能止于残差图，还应检查序列阶数、残差平稳性与结构变化。若变量没有协整关系，通常应改用收益率或其他平稳变换；若存在协整关系，水平回归对应长期约束，但系数推断具有非标准性质，短期动态则宜结合误差修正表示。

样本内拟合与样本外预测也不是同一目标。增加解释变量总会降低训练样本的残差平方和，却可能只拟合噪声；调整后 $R^2$ 对参数个数作出惩罚，但仍不是样本外表现。对预先锁定的测试集，可用
$$R_{OOS}^2=1-\frac{\sum_{t\in\mathcal T}(y_t-\hat y_t)^2}{\sum_{t\in\mathcal T}(y_t-\bar y_{train})^2}$$
比较模型与训练样本均值基准。这里的 $\mathcal T$ 是测试期指标集合。$R_{OOS}^2$ 可以为负，因为预测可能劣于基准；它不继承样本内 $R^2$ 落在 $[0,1]$ 内的性质。

时间序列预测应按时间划分训练、验证与测试区间，采用滚动或扩展窗口重估。标准化参数、变量筛选和因子选择都只能使用当时可得的数据，否则会发生前视偏差。若标签跨期重叠，还需在训练与验证边界隔离相互重叠的观测。最终比较应同时报告预测误差、参数稳定性与经济成本，而不能只挑选样本内显著的回归。
## 本章小结

线性回归推断以条件均值、误差协方差和设计矩阵的信息结构为核心。线性约束把参数假设转化为受限与无受限模型的比较，$t$ 检验处理单个线性组合，$F$ 检验处理联合约束；它们的有效性取决于所用协方差估计是否与误差结构相符。估计之后，学生化残差揭示异常响应，杠杆值识别设计空间中的极端位置，Cook 距离同时衡量残差与杠杆对系数的影响，方差膨胀因子则刻画共线性造成的信息损失。异方差与自相关并不要求放弃普通最小二乘点估计，但要求重新评估其协方差，并区分标准误修正与条件均值误设。

当误差协方差结构已知时，广义最小二乘通过 $\boldsymbol\Omega^{-1}$ 加权获得最佳线性无偏估计，Cholesky 变换把计算化为球面误差下的普通最小二乘；加权最小二乘与可行广义最小二乘分别处理对角协方差和未知协方差。量化研究中的 CAPM、因子模型、事件研究和 Fama–MacBeth 回归都是这些原则的具体应用。可靠的实证结论还必须跨越伪回归、相关误差、多重检验和样本外失效等障碍：统计显著性只有在稳定设定、正确推断与独立验证共同成立时，才能转化为可信的风险暴露或经济关系。

## 习题

1. 设线性模型的条件均值正确，但误差存在异方差。说明普通最小二乘估计的无偏性、通常标准误和 $F$ 检验各自会受到什么影响，并区分点估计一致与推断有效这两个概念。

2. 某解释变量对其余解释变量回归得到 $R_j^2=0.96$，样本方差为 $s_j^2=4$，样本量为 $n=51$。计算 $\operatorname{VIF}_j$，并求 $\operatorname{Var}(\hat\beta_j)$ 中 $\sigma^2$ 的乘数。若把该变量直接删除，还需检查什么偏误？

3. 一个含截距和三个斜率参数的回归有 $n=40$。某观测的 $e_i=3$、$h_{ii}=0.25$、$s=2$。计算其内部学生化残差与 Cook 距离，并解释高杠杆与强影响为何不是同一概念。

4. 设 $n^{-1}\boldsymbol X^\top\boldsymbol X$ 收敛于正定矩阵，写出 White 协方差估计及 $HC1$ 自由度修正。说明为何以 $e_i^2$ 替代 $u_i^2$ 不会在大样本下改变极限，以及这一结论需要哪些矩条件。

5. 对时间序列回归分别描述 Durbin–Watson 筛查、Newey–West 协方差和 AR(1) 广义差分的目的。若自相关源于遗漏滞后因变量，这三种处理中哪一种能够单独修复条件均值？

6. 在线性模型 $\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol u$ 中，设 $\boldsymbol X$ 列满秩，$\mathbb E(\boldsymbol u\mid\boldsymbol X)=\boldsymbol 0$，且 $\operatorname{Cov}(\boldsymbol u\mid\boldsymbol X)=\sigma^2\boldsymbol\Omega$，其中已知的 $\boldsymbol\Omega$ 正定。证明广义最小二乘估计在线性无偏估计类中具有最小的协方差矩阵（按半正定序），即证明其为最佳线性无偏估计；并说明这一结论是否要求误差服从正态分布。

7. 对无截距模型 $y_i=\beta x_i+u_i$，给定 $\boldsymbol x=(1,2,1)^\top$、$\boldsymbol y=(2,3,5)^\top$，以及 $\operatorname{Cov}(\boldsymbol u\mid\boldsymbol x)=2\operatorname{diag}(1,4,1)$。计算 $\beta$ 的广义最小二乘估计及其条件方差；再计算普通最小二乘估计在相同误差协方差下的条件方差，并比较两者的效率。

8. 对无截距回归 $y_i=\beta x_i+u_i$，样本给出 $\boldsymbol x=(1,1,2,2)^\top$，普通最小二乘残差为 $\boldsymbol e=(1,-1,2,-2)^\top$。计算 $\hat\beta$ 的 $HC0$ 与 $HC1$ 协方差估计及相应稳健标准误，再计算通常的同方差标准误并比较三者。

9. 对一个仅含截距的时间序列回归，四个时期的得分 $x_t e_t$ 依次为 $1,-2,3,0$。取 $n=4$、Newey–West 滞后阶数 $L=1$，采用 $\hat\gamma_j=n^{-1}\sum_{t=j+1}^n z_t z_{t-j}$（其中 $z_t=x_t e_t$）与 Bartlett 权重。计算长期方差估计 $\hat S=\hat\gamma_0+2(1-1/2)\hat\gamma_1$，并由 $\sqrt{\hat S/n}$ 求截距的稳健标准误。若截距表示策略平均超额收益，说明它与独立同分布标准误的差异来自何处。

10. 某回归的无受限模型含 $6$ 个参数，样本量为 $n=50$。对 $3$ 个线性约束检验时，受限与无受限残差平方和分别为 $RSS_R=120$、$RSS_U=96$。计算经典 $F$ 统计量，写出其原假设下的自由度与显著性水平为 $5\%$ 的拒绝规则，并说明若误差存在自相关，该拒绝规则需要怎样调整。

11. 在经典正态线性模型中，考虑单个可检验线性约束 $\boldsymbol r^\top\boldsymbol\beta=r_0$。证明基于受限与无受限残差平方和的 $F$ 统计量等于相应双侧 $t$ 统计量的平方，并证明两种检验在相同显著性水平下给出完全一致的拒绝域。

12. 一个含截距和四个斜率的模型使用 $30$ 个观测，无受限与受限模型的 $R^2$ 分别为 $0.80$ 和 $0.50$，受限模型通过删除其中两个斜率变量得到。用两个 $R^2$ 计算联合显著性 $F$ 统计量并写出自由度；若两个模型的被解释变量定义不同，说明这一计算为何失效。

13. 设 $\boldsymbol H=\boldsymbol X(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol X^\top$，其中 $\boldsymbol X$ 为 $n\times p$ 列满秩矩阵。证明 $\boldsymbol H$ 对称幂等、每个杠杆值满足 $0\le h_{ii}\le 1$，且 $\sum_{i=1}^n h_{ii}=p$；进一步证明含截距模型的杠杆值不小于 $1/n$。

14. 在含 $p$ 个参数的普通最小二乘模型中，记删除第 $i$ 个观测后的估计为 $\hat{\boldsymbol\beta}_{(i)}$，并令 $e_i=y_i-\boldsymbol x_i^\top\hat{\boldsymbol\beta}$。利用秩一矩阵更新证明 $\hat{\boldsymbol\beta}_{(i)}-\hat{\boldsymbol\beta}=-(\boldsymbol X^\top\boldsymbol X)^{-1}\boldsymbol x_i e_i/(1-h_{ii})$，进而证明 Cook 距离可写成 $D_i=e_i^2h_{ii}/[ps^2(1-h_{ii})^2]$。

15. 某股票事件前 CAPM 估计为 $\hat\alpha=0.0005$、$\hat\beta=0.8$。事件日起连续三天的股票收益依次为 $0.03,-0.005,0.02$，市场超额收益依次为 $0.01,0.005,-0.002$。计算每日异常收益、三日累计异常收益。若每日异常收益方差均为 $0.0004$ 且彼此不相关，暂时忽略参数估计误差，计算累计异常收益的标准误及检验其是否为零的标准化统计量；再说明纳入估计窗参数误差后应如何修正。

16. 某事件研究包含在同一日历日发生事件的 $100$ 家公司，平均累计异常收益为 $0.006$。已知单个公司累计异常收益的方差为 $0.0009$。先按横截面独立假设计算平均累计异常收益的标准误和检验均值是否为零的标准化统计量；再设任意两家公司的协方差均为 $0.0002$，重新计算两者，并解释按事件日期聚类为何能改变推断。

17. 某因子的四期 Fama–MacBeth 风险价格估计依次为 $0.02,-0.01,0.03,0.00$。计算时间平均风险价格、按式（21.30）得到的平均估计标准误，以及检验平均风险价格是否为零的 $t$ 统计量；在四期估计独立同分布且服从正态分布时，写出该检验的自由度。

18. 设各期 Fama–MacBeth 横截面估计 $\hat{\boldsymbol\lambda}_t$ 构成平稳遍历序列，且 $\mathbb E\lVert\hat{\boldsymbol\lambda}_t\rVert<\infty$。证明其时间平均依概率收敛于 $\mathbb E(\hat{\boldsymbol\lambda}_t)$，并说明还需什么条件才能把该极限解释为真实的因子风险价格。若 $\hat{\boldsymbol\lambda}_t$ 存在序列相关，说明式（21.30）为何不再适用以及应选用何种协方差估计。

19. 对三个资产的 CAPM 截距作联合检验，已知 $\hat{\boldsymbol\alpha}=(0.002,-0.001,0.003)^\top$，协方差估计为 $\widehat{\boldsymbol V}_{\alpha}=\operatorname{diag}(0.000004,0.000001,0.000009)$。计算检验 $\boldsymbol\alpha=\boldsymbol 0$ 的 Wald 统计量并写出其渐近原假设分布；若真实协方差矩阵含非零非对角元，说明只使用对角近似可能造成的后果。

20. 某收益预测模型的训练样本均值为 $0.001$，四个测试期实际收益为 $0.02,-0.01,0.015,0.005$，模型预测值依次为 $0.01,0,0.01,0.01$。以训练样本均值为基准，计算测试期 $R_{OOS}^2$，并说明其符号和大小应如何解释。若测试标签跨两期重叠，说明比较预测误差显著性时为何需要自相关稳健标准误。

21. 某含截距和两个斜率的回归有 $n=25$、$s=2$。观测 A 的 $e_i=3$、$h_{ii}=0.20$、$s_{(i)}=1.8$；观测 B 的 $e_i=-4$、$h_{ii}=0.05$、$s_{(i)}=1.8$。分别计算两者的内部与外部学生化残差及 Cook 距离，并结合 $2p/n$ 杠杆参考线判断哪个观测更值得优先检查。说明这种检查为何不能自动等同于删除异常值。

22. 某量化策略用 $240$ 个日度观测，将策略超额收益对市场、规模和价值三因子回归。无受限模型含截距及三个斜率，受限模型删除规模和价值因子，二者残差平方和分别为 $RSS_U=0.48$、$RSS_R=0.60$。计算两个斜率联合为零的经典 $F$ 统计量及自由度。若残差存在异方差和滞后一阶相关，说明经典检验能否直接使用，并给出稳健联合检验所需的协方差选择；若另可估计误差协方差结构，比较可行广义最小二乘与普通最小二乘配合稳健标准误各自的目标。若某观测杠杆值为 $0.35$，列出进一步的影响诊断。最后设计扩展窗口样本外评估方案，明确因子筛选、标准化和参数重估如何避免前视偏差。
