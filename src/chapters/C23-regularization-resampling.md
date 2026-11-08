# 第23章　正则化、统计学习与重采样

第21章的最小二乘理论建立在一组隐含前提之上：待估参数的个数远小于样本容量，设计矩阵列满秩且条件数适中，模型形式本身足够接近数据的生成机制。金融数据的现实常常同时背离这三条。用六十个月的收益去回归数百个候选因子，参数个数逼近甚至超过观测个数，正规方程的解不再唯一；用几十个高度相关的宏观变量预测下一季度的增长，最小二乘系数的方差被条件数放大到不可用的程度；即便样本充裕，从成千上万个候选特征中挑出的最优组合，其样本内表现也几乎必然优于样本外表现。这些现象有一个共同的数学根源：最小二乘在追求无偏的同时把全部方差都保留了下来，而预测误差关心的从来不是无偏，而是偏差与方差的总和。

本章的主线是一条精确的恒等式。给定平方损失，一个学习算法在新数据上的期望预测误差可以拆成三项之和：响应变量围绕其条件期望的不可约噪声、算法输出的期望与真实回归函数之间的偏差平方、以及算法输出围绕其自身期望波动的方差。第一项与算法无关，构成任何方法都无法突破的下界；后两项此消彼长，构成统计学习中最重要的权衡。第19章曾把单个参数估计量的均方误差分解为偏差平方与方差之和，本章的分解是它在被估对象为一个函数、且观测本身还带噪声这一情形下的推广，多出的不可约项正是二者之间的全部差别。

有了这条恒等式，正则化的思想就变得透明：主动引入一点偏差，换取方差的大幅下降。23.2 讨论平方惩罚下的岭回归，我们推导它的闭式解与谱表示，证明它恰好等于 Gaussian 先验下的后验均值，从而把频率主义的收缩与第22章的 Bayesian 推断衔接起来，并给出偏差与方差的显式表达以及惩罚参数的选取方法。23.3 把惩罚换成 L1 范数，得到 Lasso；此时解会精确地落在坐标超平面上，从而在估计的同时完成变量选择。我们推导它的 KKT 条件、正交设计下的软阈值闭式解、坐标下降的更新公式，并说明它与 Laplace 先验的对应关系。本章后半部分讨论模型选择准则、Bootstrap 与置换检验、统计学习的泛化理论，以及这些工具在因子筛选、组合权重收缩与回测过拟合诊断中的落地方式。

## 23.1 偏差—方差分解

### 23.1.1 设置与期望预测误差

讨论正则化之前必须先有一个可计算的评价标准。样本内残差平方和不能充当这一标准，因为它对模型复杂度单调不减地改善：只要模型足够复杂，总能把训练数据拟合到残差为零，而这恰恰是过拟合的标志而非成功。正确的标准应当在一个算法未曾见过的观测上评估。

**定义 23.1（监督学习设置与期望预测误差）**

设 $(X,Y)$ 是取值于 $\mathbb R^d\times\mathbb R$ 的随机向量，联合分布记为 $P$。回归函数定义为条件期望 $f(x)=\mathbb E[Y\mid X=x]$，条件方差记为 $\sigma^2(x)=\operatorname{Var}(Y\mid X=x)$。训练集 $\mathcal D=\{(X_i,Y_i)\}_{i=1}^{n}$ 由 $P$ 独立同分布抽样得到。学习算法 $\mathcal A$ 是一个可测映射，把 $\mathcal D$ 映为一个可测函数 $\hat f=\mathcal A(\mathcal D)$；同一算法在不同训练集上给出不同的 $\hat f$，这一随机性是后面全部分解的来源。给定一个与 $\mathcal D$ 相互独立的检验点 $(X_0,Y_0)\sim P$，点态期望预测误差定义为

$$\operatorname{Err}(x_0)=\mathbb E\big[(Y_0-\hat f(X_0))^2\,\big|\,X_0=x_0\big],\tag{23.1}$$

其中的期望同时对 $Y_0$ 的条件分布与训练集 $\mathcal D$ 的分布取。整体期望预测误差定义为 $\operatorname{Err}=\mathbb E[\operatorname{Err}(X_0)]$，即再对 $X_0$ 的边际分布取一次期望。

为简化记号，下文固定 $x_0$，把 $\hat f(x_0)$ 视为随机性来自 $\mathcal D$ 的随机变量，记 $\bar f(x_0)=\mathbb E_{\mathcal D}[\hat f(x_0)]$，$\operatorname{Var}_{\mathcal D}(\hat f(x_0))=\mathbb E_{\mathcal D}[(\hat f(x_0)-\bar f(x_0))^2]$，并称 $b(x_0)=\bar f(x_0)-f(x_0)$ 为算法在 $x_0$ 处的偏差。

**定理 23.2（偏差—方差—噪声分解）**

在定义 23.1 的设置下，若 $\mathbb E[\hat f(x_0)^2]<\infty$ 且 $\sigma^2(x_0)<\infty$，则

$$\operatorname{Err}(x_0)=\sigma^2(x_0)+\big(\bar f(x_0)-f(x_0)\big)^2+\operatorname{Var}_{\mathcal D}\big(\hat f(x_0)\big).\tag{23.2}$$

右端三项依次称为不可约噪声、偏差平方与方差。

**证明**

以下所有期望都在条件于 $X_0=x_0$ 的意义下取，也就是工作在这个条件概率空间上。在该空间上，$\mathcal D$ 与 $Y_0$ 仍然相互独立，$Y_0$ 的条件均值为 $f(x_0)$，条件方差为 $\sigma^2(x_0)$。记

$$a=Y_0-f(x_0),\qquad b=f(x_0)-\bar f(x_0),\qquad c=\bar f(x_0)-\hat f(x_0),$$

则 $Y_0-\hat f(x_0)=a+b+c$，展开平方得

$$(Y_0-\hat f(x_0))^2=a^2+b^2+c^2+2ab+2ac+2bc.$$

对两边取期望，共六项。

第一项。由条件方差的定义与 $\mathbb E[a]=0$，

$$\mathbb E[a^2]=\mathbb E\big[(Y_0-f(x_0))^2\big]=\operatorname{Var}(Y_0)+\big(\mathbb E[Y_0]-f(x_0)\big)^2=\sigma^2(x_0).$$

第二项。$b$ 是给定 $x_0$ 之后的常数，与 $\mathcal D$、$Y_0$ 都无关，故 $\mathbb E[b^2]=b^2=(\bar f(x_0)-f(x_0))^2$。

第三项。$c$ 是 $\mathcal D$ 的函数，与 $Y_0$ 无关，且 $\mathbb E[c]=0$，故 $\mathbb E[c^2]=\operatorname{Var}_{\mathcal D}(\hat f(x_0))$。

交叉项 $2ab$。由重期望律，先对 $Y_0$ 取条件期望：$b$ 在该步是常数，$\mathbb E[a\mid\mathcal D]=\mathbb E[a]=0$，因此 $\mathbb E[ab]=\mathbb E[b\,\mathbb E[a\mid\mathcal D]]=0$。

交叉项 $2ac$。$c$ 是 $\mathcal D$ 的可测函数，故 $\mathbb E[ac\mid\mathcal D]=c\,\mathbb E[a\mid\mathcal D]=c\cdot 0=0$，再取期望得 $\mathbb E[ac]=0$。这一步是独立性的关键用处：$\hat f$ 与检验点的噪声不能相关。

交叉项 $2bc$。$b$ 为常数，$\mathbb E[bc]=b\,\mathbb E[c]=b\big(\bar f(x_0)-\mathbb E_{\mathcal D}[\hat f(x_0)]\big)=0$。

三项交叉项全部消失，把三个平方项相加即得式（23.2）。

□

把式（23.2）关于 $X_0$ 的边际分布积分，立刻得到整体形式

$$\operatorname{Err}=\mathbb E\big[\sigma^2(X_0)\big]+\mathbb E\big[(\bar f(X_0)-f(X_0))^2\big]+\mathbb E\big[\operatorname{Var}_{\mathcal D}(\hat f(X_0))\big],$$

三项分别是平均不可约噪声、平均偏差平方与平均方差。

注记（与第19章均方误差分解的关系）。把式（23.2）重新组合，可以写成

$$\operatorname{Err}(x_0)=\sigma^2(x_0)+\mathbb E_{\mathcal D}\big[(\hat f(x_0)-f(x_0))^2\big].$$

右端第二项正是把 $f(x_0)$ 视为待估参数、把 $\hat f(x_0)$ 视为它的估计量时的均方误差。第19章已经证明，均方误差等于偏差平方加方差，因此式（23.2）的后两项就是第19章分解的逐项重现，而本章多出的 $\sigma^2(x_0)$ 完全来自响应变量 $Y_0$ 围绕其条件期望的波动，与算法的选取无关。这一差别有一个重要后果：预测问题的难度下界与参数估计问题的难度下界并不相同，即使算法精确地恢复了回归函数 $f$，期望预测误差也不会低于 $\mathbb E[\sigma^2(X)]$。金融数据中这一项通常极大，日频收益的条件方差相对条件均值的平方而言高出若干个数量级，这解释了为什么预测能力的微小改善在实践中已属难得。

注记（权衡的方向）。分解式不含任何近似，但它把「模型过于复杂」与「模型过于简单」翻译成了两个可以分别观察的量。当算法的假设空间扩大时，期望 $\bar f$ 更容易逼近 $f$，偏差下降；与此同时 $\hat f$ 对训练集具体取值的敏感度上升，方差上升。缩小时假设空间则相反。因此 $\operatorname{Err}$ 作为复杂度的函数通常呈 U 形，最优复杂度位于两项之和的最小点，而不是任何单项的最小点。后面各节的正则化方法都不是在消除偏差或方差，而是在这笔总账上寻找更优的配置：以可控的偏差换取方差的大幅下降。

### 23.1.2 不可约项的最优性

式（23.2）把误差拆成三项，其中第一项号称「不可约」。这一说法需要证明，否则它只是一个命名。下面的命题给出 $L^2$ 意义下的完整论证。

**命题 23.3（条件期望的最优性与不可约下界）**

设 $\mathbb E[Y^2]<\infty$。对任意满足 $\mathbb E[g(X)^2]<\infty$ 的可测函数 $g:\mathbb R^d\to\mathbb R$，成立

$$\mathbb E\big[(Y-g(X))^2\big]=\mathbb E\big[\sigma^2(X)\big]+\mathbb E\big[(f(X)-g(X))^2\big]\ \ge\ \mathbb E\big[\sigma^2(X)\big],\tag{23.3}$$

等号成立当且仅当 $g(X)=f(X)$ 几乎必然成立。

**证明**

由 $\mathbb E[Y^2]<\infty$ 与 $\mathbb E[g(X)^2]<\infty$ 可知 $f(X)$ 平方可积，从而下面出现的每个期望都有限，重期望律可用。写

$$Y-g(X)=\big(Y-f(X)\big)+\big(f(X)-g(X)\big),$$

展开平方得三项。交叉项为

$$\mathbb E\big[(Y-f(X))(f(X)-g(X))\big]=\mathbb E\Big[\mathbb E\big[Y-f(X)\mid X\big]\cdot\big(f(X)-g(X)\big)\Big]=0,$$

因为 $\mathbb E[Y-f(X)\mid X]=\mathbb E[Y\mid X]-f(X)=0$，而 $f(X)-g(X)$ 是 $X$ 的函数，可以从内层条件期望中提出。第一个平方项为

$$\mathbb E\big[(Y-f(X))^2\big]=\mathbb E\Big[\mathbb E\big[(Y-f(X))^2\mid X\big]\Big]=\mathbb E\big[\operatorname{Var}(Y\mid X)\big]=\mathbb E\big[\sigma^2(X)\big],$$

这里用到给定 $X$ 时 $Y$ 的条件均值恰为 $f(X)$，故内层期望就是条件方差。第三个平方项即 $\mathbb E[(f(X)-g(X))^2]$。三项相加得式（23.3）的等式部分；该项非负，不等式随之成立。等号成立当且仅当 $\mathbb E[(f(X)-g(X))^2]=0$；非负随机变量的期望为零等价于它几乎必然为零，因此等号成立当且仅当 $g(X)=f(X)$ 几乎必然成立。

□

**例 23.1**

设 $Y_1,\dots,Y_n$ 独立同分布于 $N(\mu,\sigma^2)$，$n\ge 2$，其中 $\mu$ 与 $\sigma^2$ 均未知。此处没有协变量，回归函数是常数 $f=\mu$，条件方差是常数 $\sigma^2$，因而式（23.2）中的三项都不依赖 $x_0$。比较两个算法：$\hat f_1=\bar Y$，即样本均值；$\hat f_2=c\bar Y$，其中 $0<c<1$ 是事先固定的收缩因子。求两者的期望预测误差，直接验算分解式，并找出使误差最小的收缩因子。

**解**

第一个算法。$\mathbb E[\bar Y]=\mu$，故 $\bar f_1=\mu=f$，偏差为零；$\operatorname{Var}(\bar Y)=\sigma^2/n$。式（23.2）给出

$$\operatorname{Err}_1=\sigma^2+0+\frac{\sigma^2}{n}.$$

第二个算法。$\mathbb E[c\bar Y]=c\mu$，故 $\bar f_2=c\mu$，偏差为 $(c-1)\mu$，偏差平方为 $(1-c)^2\mu^2$；方差为 $c^2\sigma^2/n$。于是

$$\operatorname{Err}_2(c)=\sigma^2+(1-c)^2\mu^2+\frac{c^2\sigma^2}{n}.$$

为确认分解无误，绕开定理直接计算 $\mathbb E[(Y_0-c\bar Y)^2]$，其中 $Y_0\sim N(\mu,\sigma^2)$ 与 $\bar Y$ 独立。随机变量 $Y_0-c\bar Y$ 的均值为 $(1-c)\mu$，方差为 $\sigma^2+c^2\sigma^2/n$（独立随机变量之差的方差相加），由二阶矩等于方差加均值平方得

$$\mathbb E\big[(Y_0-c\bar Y)^2\big]=\sigma^2+\frac{c^2\sigma^2}{n}+(1-c)^2\mu^2,$$

与上面按偏差—方差—噪声三项拼出的结果逐项相同。

对 $c$ 求导，

$$\frac{d}{dc}\operatorname{Err}_2(c)=-2(1-c)\mu^2+\frac{2c\sigma^2}{n},$$

令导数为零并整理得 $c\mu^2-\mu^2+\dfrac{c\sigma^2}{n}=0$，因此唯一驻点为

$$c^{*}=\frac{\mu^2}{\mu^2+\sigma^2/n}.$$

二阶导数为 $2\mu^2+2\sigma^2/n>0$，故 $c^{*}$ 是全局极小点。记 $A=\mu^2$，$B=\sigma^2/n$，则 $c^{*}=A/(A+B)$，$1-c^{*}=B/(A+B)$，代入偏差平方与方差两项：

$$(1-c^{*})^2A+(c^{*})^2B=\frac{B^2A+A^2B}{(A+B)^2}=\frac{AB(A+B)}{(A+B)^2}=\frac{AB}{A+B},$$

于是

$$\operatorname{Err}_2(c^{*})=\sigma^2+\frac{\mu^2\sigma^2/n}{\mu^2+\sigma^2/n}\ <\ \sigma^2+\frac{\sigma^2}{n}=\operatorname{Err}_1,$$

只要 $\mu\ne 0$，严格不等号就成立。

取 $n=25$、$\sigma=1$ 做数值比较。若 $\mu=0.2$，则 $A=B=0.04$，$c^{*}=0.5$，$\operatorname{Err}_1=1.04$，而 $\operatorname{Err}_2(c^{*})=1+0.0016/0.08=1.02$。若 $\mu=1$，则 $A=1$，$B=0.04$，$c^{*}=1/1.04\approx0.9615$，$\operatorname{Err}_2(c^{*})=1+0.04/1.04\approx1.0385$，与 $\operatorname{Err}_1=1.04$ 几乎没有差别。可见收缩带来的收益集中在低信噪比区域，而这恰恰是金融预测所处的区域。

这个一维例子已经包含了正则化的全部要素。第一，无偏性在平方损失下并不是最优目标，式（23.2）表明真正需要最小化的是偏差平方与方差之和。第二，把估计向一个先验认为合理的中心收缩能显著降低方差，代价是引入可控的偏差，这里中心取零。第三，最优收缩量由信噪比决定：信噪比高时几乎不收缩，信噪比低时强力收缩。还需注意 $c^{*}$ 依赖未知的 $\mu$ 与 $\sigma^2$，实践中必须用数据来估计，这就回到第22章讨论过的经验 Bayes 与 James–Stein 收缩。多维情形的额外困难在于，不同回归方向的信噪比各不相同，收缩量必须逐方向确定。岭回归正是这一思想在线性模型中的实现。

## 23.2 岭回归

### 23.2.1 目标函数与闭式解

沿用第21章的线性模型记号。设 $y=X\beta+\varepsilon$，其中 $X\in\mathbb R^{n\times p}$ 是设计矩阵，$\beta\in\mathbb R^p$ 是待估系数向量，$\varepsilon\in\mathbb R^n$ 满足 $\mathbb E[\varepsilon]=0$、$\operatorname{Cov}(\varepsilon)=\sigma^2 I_n$。为简化记号，假定 $y$ 与 $X$ 的各列均已中心化，截距不进入惩罚；若不中心化，则必须在惩罚中排除截距项，否则估计量将失去对响应变量平移的等变性。当 $p$ 接近或超过 $n$，或者 $X^\top X$ 的最小特征值很小时，最小二乘估计 $\hat\beta^{\mathrm{OLS}}=(X^\top X)^{-1}X^\top y$ 的协方差矩阵 $\sigma^2(X^\top X)^{-1}$ 会出现极大的元素，第8章的条件数正是刻画这种放大的量。岭回归的处理方式是在目标函数中加入一个平方惩罚项。

**定义 23.4（岭回归估计量）**

对惩罚参数 $\lambda\ge 0$，岭回归估计量定义为

$$\hat\beta^{\mathrm{ridge}}(\lambda)=\arg\min_{\beta\in\mathbb R^{p}}\Big\{\|y-X\beta\|_2^2+\lambda\|\beta\|_2^2\Big\}.\tag{23.4}$$

$\lambda=0$ 时式（23.4）退化为普通最小二乘，$\lambda\to\infty$ 时估计量趋于零向量。

**定理 23.5（岭回归的闭式解与谱表示）**

设 $\lambda>0$。则式（23.4）的目标函数严格凸且强制，极小点存在且唯一，并可显式写出：

$$\hat\beta^{\mathrm{ridge}}(\lambda)=(X^\top X+\lambda I_p)^{-1}X^\top y=X^\top(XX^\top+\lambda I_n)^{-1}y.\tag{23.5}$$

若 $X=UDV^\top$ 是奇异值分解，其中 $U\in\mathbb R^{n\times n}$、$V\in\mathbb R^{p\times p}$ 正交，$D$ 的前 $r=\operatorname{rank}(X)$ 个对角元满足 $d_1\ge\cdots\ge d_r>0$，其余对角元为零，则

$$\hat\beta^{\mathrm{ridge}}(\lambda)=V(D^\top D+\lambda I_p)^{-1}D^\top U^\top y,$$

且当 $\lambda\downarrow0$ 时 $\hat\beta^{\mathrm{ridge}}(\lambda)$ 收敛到最小二乘解集合中 Euclid 范数最小的那一个。

**证明**

第一步，存在性与唯一性。记 $Q(\beta)=\|y-X\beta\|_2^2+\lambda\|\beta\|_2^2$，展开得

$$Q(\beta)=y^\top y-2\beta^\top X^\top y+\beta^\top(X^\top X+\lambda I_p)\beta.$$

$Q$ 二次连续可微，其梯度与 Hessian 矩阵为

$$\nabla Q(\beta)=-2X^\top y+2(X^\top X+\lambda I_p)\beta,\qquad \nabla^2 Q(\beta)=2(X^\top X+\lambda I_p).$$

对任意 $u\in\mathbb R^p$，有 $u^\top(X^\top X)u=\|Xu\|_2^2\ge 0$，于是 $u^\top\nabla^2 Q(\beta)u\ge 2\lambda\|u\|_2^2$。当 $\lambda>0$ 时该二次型对 $u\ne0$ 严格为正，Hessian 处处正定，故 $Q$ 严格凸，任何驻点都是唯一的全局极小点。另一方面 $Q(\beta)\ge\lambda\|\beta\|_2^2$，因此 $\|\beta\|_2\to\infty$ 时 $Q(\beta)\to\infty$，即 $Q$ 强制；下水平集 $\{\beta:Q(\beta)\le Q(0)\}$ 是有界闭集，从而是紧集，连续函数 $Q$ 在其上取到极小值，极小点存在。令梯度为零得 $(X^\top X+\lambda I_p)\beta=X^\top y$，该矩阵正定故可逆，解出 $\beta=(X^\top X+\lambda I_p)^{-1}X^\top y$，式（23.5）的第一个等号得证。

第二步，谱表示。由 $X=UDV^\top$ 与 $U^\top U=I_n$、$VV^\top=I_p$，

$$X^\top X+\lambda I_p=VD^\top U^\top UDV^\top+\lambda VV^\top=V(D^\top D+\lambda I_p)V^\top.$$

右端是正交相似形式，而 $D^\top D+\lambda I_p$ 是对角元为 $d_j^2+\lambda>0$ 的对角阵，因而可逆，且

$$(X^\top X+\lambda I_p)^{-1}=V(D^\top D+\lambda I_p)^{-1}V^\top.$$

又 $X^\top y=VD^\top U^\top y$。两式相乘并用 $V^\top V=I_p$ 消去中间的 $V$，得

$$\hat\beta^{\mathrm{ridge}}(\lambda)=V(D^\top D+\lambda I_p)^{-1}D^\top U^\top y.$$

写成坐标形式更便于解读。令 $\tilde\beta=V^\top\hat\beta^{\mathrm{ridge}}(\lambda)$，$w=U^\top y$，则

$$\tilde\beta_j=\frac{d_j}{d_j^2+\lambda}\,w_j,\qquad j=1,\dots,r,$$

而 $j>r$ 时 $d_j=0$，分子为零，故 $\tilde\beta_j=0$。在同一组坐标下，当 $r=p$ 时最小二乘解满足 $\tilde\beta_j^{\mathrm{OLS}}=w_j/d_j$，两者相比有

$$\tilde\beta_j=\frac{d_j^2}{d_j^2+\lambda}\,\tilde\beta_j^{\mathrm{OLS}},\qquad j=1,\dots,r.$$

收缩因子 $\dfrac{d_j^2}{d_j^2+\lambda}$ 落在开区间 $(0,1)$ 内，随 $d_j$ 增大而趋于 $1$，随 $d_j$ 减小而趋于 $0$。奇异值小的方向对应设计矩阵信息稀薄的方向，最小二乘在该方向上的方差为 $\sigma^2/d_j^2$，可以极大；岭回归恰恰把这类方向压得最重，而奇异值大的方向几乎不受影响。可见岭回归并非无差别地把系数拉向零，而是按各方向的信噪比分别收缩，这正是例 23.1 中一维结论的多维版本。

相应地，拟合值为

$$\hat y^{\mathrm{ridge}}=X\hat\beta^{\mathrm{ridge}}(\lambda)=U\,\operatorname{diag}\Big(\frac{d_1^2}{d_1^2+\lambda},\dots,\frac{d_r^2}{d_r^2+\lambda},0,\dots,0\Big)U^\top y,$$

即岭回归把响应向量在每个左奇异方向上的分量乘以同一个收缩因子。矩阵

$$H_\lambda=X(X^\top X+\lambda I_p)^{-1}X^\top$$

称为岭的帽子矩阵。它是对称的，因为 $X^\top X+\lambda I_p$ 对称故其逆对称，$(XA^{-1}X^\top)^\top=XA^{-1}X^\top$。但它不再幂等：记 $A=X^\top X+\lambda I_p$，则 $X^\top X=A-\lambda I_p$，于是

$$H_\lambda^2=XA^{-1}X^\top XA^{-1}X^\top=XA^{-1}(A-\lambda I_p)A^{-1}X^\top=H_\lambda-\lambda XA^{-2}X^\top,$$

当 $\lambda>0$ 且 $X\ne0$ 时最后一项非零，故 $H_\lambda^2\ne H_\lambda$。这说明岭估计不是第5章与第21章意义下的正交投影，残差 $y-\hat y^{\mathrm{ridge}}$ 与设计矩阵的列空间不再正交；从几何上看，岭解是被拉向原点的投影，而不是垂直落下的投影。偏差正是这一「拉动」的代价。

第三步，第二个表示式。当 $n<p$ 时，式（23.5）的第一个表达式要求一个 $p\times p$ 矩阵的逆，第二个只涉及 $n\times n$ 矩阵，计算量更小。为证两者相等，先注意 $XX^\top+\lambda I_n=U(DD^\top+\lambda I_n)U^\top$，故

$$(XX^\top+\lambda I_n)^{-1}=U(DD^\top+\lambda I_n)^{-1}U^\top,$$

从而

$$X^\top(XX^\top+\lambda I_n)^{-1}y=VD^\top(DD^\top+\lambda I_n)^{-1}U^\top y.$$

现在逐元素比较 $p\times n$ 矩阵 $D^\top(DD^\top+\lambda I_n)^{-1}$ 与 $(D^\top D+\lambda I_p)^{-1}D^\top$。$DD^\top+\lambda I_n$ 是对角阵，第 $j$ 个对角元为 $d_j^2+\lambda$（$j\le r$）或 $\lambda$（$j>r$），其逆即逐元素取倒数。于是前者的第 $j$ 行等于 $D^\top$ 的第 $j$ 行逐元素除以相应的 $d_j^2+\lambda$：当 $j\le r$ 时只有第 $j$ 列非零，值为 $\dfrac{d_j}{d_j^2+\lambda}$；当 $j>r$ 时 $D^\top$ 的第 $j$ 行整行为零，故该行仍为零。后者的第 $j$ 行是 $\dfrac{1}{d_j^2+\lambda}$ 乘以 $D^\top$ 的第 $j$ 行，当 $j\le r$ 时同样在第 $j$ 列取值 $\dfrac{d_j}{d_j^2+\lambda}$，当 $j>r$ 时因 $D^\top$ 的对应行为零而为零。两矩阵完全相同，故式（23.5）的两个表达式相等。

第四步，$\lambda\downarrow0$ 的极限。坐标形式表明当 $j\le r$ 时 $\tilde\beta_j\to w_j/d_j$，当 $j>r$ 时 $\tilde\beta_j=0$，因此

$$\hat\beta^{\mathrm{ridge}}(\lambda)\ \longrightarrow\ V_rD_r^{-1}U_r^\top y\qquad(\lambda\downarrow0),$$

其中 $U_r\in\mathbb R^{n\times r}$ 与 $V_r\in\mathbb R^{p\times r}$ 分别由 $U$、$V$ 的前 $r$ 列组成，$D_r=\operatorname{diag}(d_1,\dots,d_r)$。记 $\beta^{+}=V_rD_r^{-1}U_r^\top y$。一方面，

$$X\beta^{+}=U_rD_rV_r^\top V_rD_r^{-1}U_r^\top y=U_rU_r^\top y,$$

右端是 $y$ 在 $X$ 列空间上的正交投影，故 $\beta^{+}$ 使残差平方和达到最小，确是一个最小二乘解。另一方面，最小二乘解的集合恰为 $\{\beta^{+}+V_0z:z\in\mathbb R^{p-r}\}$，其中 $V_0$ 的列张成 $X$ 的零空间；由 $V$ 正交可知 $\beta^{+}$ 与 $V_0z$ 相互正交，于是

$$\|\beta^{+}+V_0z\|_2^2=\|\beta^{+}\|_2^2+\|V_0z\|_2^2\ \ge\ \|\beta^{+}\|_2^2,$$

等号成立当且仅当 $z=0$。这就证明了 $\beta^{+}$ 是所有最小二乘解中 Euclid 范数最小的一个，也就完成了定理的全部结论。

□

注记（尺度依赖性）。惩罚 $\lambda\|\beta\|_2^2$ 依赖各变量的度量单位：把第 $j$ 列乘以常数 $k$，对应系数就除以 $k$，惩罚值随之改变，岭解也随之改变。这是岭回归与最小二乘的一个本质差别，也意味着在使用岭回归之前必须对解释变量做标准化，通常取每列均值为零、方差为一。标准化之后 $\|X\beta\|_2$ 与 $\|\beta\|_2$ 才处于可比的尺度，$\lambda$ 的取值才具有跨数据集的可解释性。

### 23.2.2 岭回归作为 Bayesian 后验均值

式（23.5）的闭式解还可以从一个完全不同的角度得到。把 $\beta$ 视为随机向量并赋予先验分布，则在 Gaussian 似然下后验分布仍是 Gaussian，而它的后验均值恰好与岭估计重合。这一等价性把正则化参数 $\lambda$ 解释为先验强度，也把「向零收缩」解释为「先验认为系数应当接近零」。

**定理 23.6（岭回归与 Gaussian 后验均值的等价性）**

设给定 $\beta$ 时 $y\mid\beta\sim N_n(X\beta,\sigma^2 I_n)$，且 $\beta\sim N_p(0,\tau^2 I_p)$ 与噪声独立，其中 $\sigma^2>0$、$\tau^2>0$。则后验分布为

$$\beta\mid y\ \sim\ N_p\Big((X^\top X+\lambda I_p)^{-1}X^\top y,\ \ \sigma^2(X^\top X+\lambda I_p)^{-1}\Big),\qquad \lambda=\frac{\sigma^2}{\tau^2},\tag{23.6}$$

因而后验均值与式（23.4）中取惩罚参数 $\lambda=\sigma^2/\tau^2$ 的岭回归估计量完全相同；Gaussian 分布的均值与众数重合，故后验众数亦然。

**证明**

先写出两个密度。似然为

$$p(y\mid\beta)=(2\pi\sigma^2)^{-n/2}\exp\Big\{-\frac{1}{2\sigma^2}\|y-X\beta\|_2^2\Big\},$$

先验为

$$p(\beta)=(2\pi\tau^2)^{-p/2}\exp\Big\{-\frac{1}{2\tau^2}\|\beta\|_2^2\Big\}.$$

由 Bayes 公式，后验密度正比于二者之积。取对数并略去与 $\beta$ 无关的项，得

$$\log p(\beta\mid y)=-\frac{1}{2\sigma^2}\|y-X\beta\|_2^2-\frac{1}{2\tau^2}\|\beta\|_2^2+C(y).$$

两边乘以 $-2\sigma^2$，

$$-2\sigma^2\log p(\beta\mid y)=\|y-X\beta\|_2^2+\frac{\sigma^2}{\tau^2}\|\beta\|_2^2+C'(y),$$

右端的前两项恰是式（23.4）中取 $\lambda=\sigma^2/\tau^2$ 的岭目标函数。最大化后验密度等价于最小化该目标函数，故后验众数等于岭估计；由定理 23.5，它就是 $(X^\top X+\lambda I_p)^{-1}X^\top y$。

为确定整个后验分布，对 $\beta$ 配方。令

$$A=\frac{1}{\sigma^2}X^\top X+\frac{1}{\tau^2}I_p,\qquad b=\frac{1}{\sigma^2}X^\top y,$$

则 $A$ 对称正定，且

$$\frac{1}{2\sigma^2}\|y-X\beta\|_2^2+\frac{1}{2\tau^2}\|\beta\|_2^2=\frac12\beta^\top A\beta-\beta^\top b+\frac{1}{2\sigma^2}\|y\|_2^2.$$

对前两项配方。由 $A$ 对称，

$$\frac12(\beta-A^{-1}b)^\top A(\beta-A^{-1}b)=\frac12\beta^\top A\beta-\beta^\top b+\frac12 b^\top A^{-1}b,$$

于是

$$\frac12\beta^\top A\beta-\beta^\top b=\frac12(\beta-A^{-1}b)^\top A(\beta-A^{-1}b)-\frac12 b^\top A^{-1}b.$$

代回可知后验密度正比于 $\exp\big\{-\frac12(\beta-A^{-1}b)^\top A(\beta-A^{-1}b)\big\}$，这正是均值为 $A^{-1}b$、协方差矩阵为 $A^{-1}$ 的 $p$ 维 Gaussian 密度的核，因此

$$\beta\mid y\ \sim\ N_p(A^{-1}b,\ A^{-1}).$$

最后化简这两个参数。把 $A$ 提出公因子：

$$A=\frac{1}{\sigma^2}\Big(X^\top X+\frac{\sigma^2}{\tau^2}I_p\Big)=\frac{1}{\sigma^2}\big(X^\top X+\lambda I_p\big),$$

故 $A^{-1}=\sigma^2(X^\top X+\lambda I_p)^{-1}$，且

$$A^{-1}b=\sigma^2(X^\top X+\lambda I_p)^{-1}\cdot\frac{1}{\sigma^2}X^\top y=(X^\top X+\lambda I_p)^{-1}X^\top y.$$

这既是后验均值也是岭估计，式（23.6）得证。

□

注记（一般先验协方差）。把先验换成 $\beta\sim N_p(\mu_0,\Sigma_0)$，只需在定理 23.6 的证明中把 $\frac{1}{2\tau^2}\|\beta\|_2^2$ 换成 $\frac12(\beta-\mu_0)^\top\Sigma_0^{-1}(\beta-\mu_0)$，配方后得后验均值

$$\big(\sigma^{-2}X^\top X+\Sigma_0^{-1}\big)^{-1}\big(\sigma^{-2}X^\top y+\Sigma_0^{-1}\mu_0\big),$$

对应的惩罚项为 $(\beta-\mu_0)^\top\Sigma_0^{-1}(\beta-\mu_0)$，称为广义岭回归。取 $\Sigma_0$ 为对角阵即可对不同方向施加不同强度的收缩；若 $\Sigma_0$ 的特征向量与 $X^\top X$ 的相同，则每个主方向上的有效惩罚 设 $\Sigma_0=V\operatorname{diag}(\tau_1^2,\dots,\tau_p^2)V^\top$ 且 $V$ 同时对角化 $X^\top X$，则第 $j$ 个主方向上的有效惩罚为 $\lambda_j=\sigma^2/\tau_j^2$，可独立调节，这与定理 23.5 谱分析中按奇异值大小分别收缩的图景完全吻合。

注记（$\lambda$ 的两种极限与经验 Bayes 选取）。当 $\tau^2\to\infty$ 即先验趋于平坦时，$\lambda=\sigma^2/\tau^2\to0$，岭估计趋于最小二乘；当 $\tau^2\to0$ 即先验质量集中于原点时，$\lambda\to\infty$，岭估计趋于零向量。先验越强，数据的影响越弱。由于 $\lambda$ 与 $\tau^2$ 一一对应，选择 $\lambda$ 就等价于选择先验方差，而后者可以按第22章的方法由数据决定：把 $\beta$ 从联合密度中积分掉，得到 $y$ 的边缘分布 $N_n(0,\ \sigma^2 I_n+\tau^2 XX^\top)$，对 $\tau^2$ 最大化这一边缘似然，就得到经验 Bayes 意义下的 $\lambda$。

注记（后验协方差与抽样协方差的区别）。式（23.6）给出的后验协方差 $\sigma^2(X^\top X+\lambda I_p)^{-1}$ 与下一节将要计算的岭估计的抽样协方差不是同一个矩阵：前者刻画给定数据后 $\beta$ 的不确定性，后者刻画重复抽样下 $\hat\beta^{\mathrm{ridge}}(\lambda)$ 的波动。在正交设计 $X^\top X=\operatorname{diag}(d_1^2,\dots,d_p^2)$ 下二者可以逐方向比较：后验方差为 $\sigma^2/(d_j^2+\lambda)$，而抽样方差为 $\sigma^2 d_j^2/(d_j^2+\lambda)^2$，后者恰为前者乘以收缩因子 $d_j^2/(d_j^2+\lambda)$。

### 23.2.3 偏差、方差与惩罚参数的选择

定理 23.5 告诉我们岭解是什么，定理 23.6 告诉我们它从哪里来，但式（23.2）要求的是偏差与方差的具体数值。下面把它们显式算出，并证明一个在实践上极为重要的事实：只要噪声不为零，总存在某个正的惩罚使均方误差严格小于最小二乘。

**命题 23.7（岭回归的偏差、方差与均方误差改进）**

设 $y=X\beta+\varepsilon$，$\mathbb E[\varepsilon]=0$，$\operatorname{Cov}(\varepsilon)=\sigma^2 I_n$，$\sigma^2>0$，且 $S=X^\top X$ 可逆。记 $\hat\beta_\lambda=\hat\beta^{\mathrm{ridge}}(\lambda)$。则

$$\mathbb E[\hat\beta_\lambda]-\beta=-\lambda(S+\lambda I_p)^{-1}\beta,\tag{23.7}$$

$$\operatorname{Cov}(\hat\beta_\lambda)=\sigma^2(S+\lambda I_p)^{-1}S(S+\lambda I_p)^{-1},$$

且总均方误差为

$$\operatorname{MSE}(\lambda)=\mathbb E\|\hat\beta_\lambda-\beta\|_2^2=\lambda^2\beta^\top(S+\lambda I_p)^{-2}\beta+\sigma^2\operatorname{tr}\big[S(S+\lambda I_p)^{-2}\big],\tag{23.8}$$

它在 $\lambda=0$ 处的右导数为 $-2\sigma^2\operatorname{tr}(S^{-2})<0$。因此存在 $\lambda^{*}>0$，使 $\operatorname{MSE}(\lambda^{*})<\operatorname{MSE}(0)=\sigma^2\operatorname{tr}(S^{-1})$，即适度收缩的岭估计严格优于最小二乘估计。

**证明**

先算期望。由式（23.5），

$$\hat\beta_\lambda=(S+\lambda I_p)^{-1}X^\top y=(S+\lambda I_p)^{-1}X^\top(X\beta+\varepsilon)=(S+\lambda I_p)^{-1}S\beta+(S+\lambda I_p)^{-1}X^\top\varepsilon.$$

对 $\varepsilon$ 取期望，第二项消失，得 $\mathbb E[\hat\beta_\lambda]=(S+\lambda I_p)^{-1}S\beta$。于是偏差为

$$\mathbb E[\hat\beta_\lambda]-\beta=\big[(S+\lambda I_p)^{-1}S-I_p\big]\beta=(S+\lambda I_p)^{-1}\big[S-(S+\lambda I_p)\big]\beta=-\lambda(S+\lambda I_p)^{-1}\beta,$$

即式（23.7）。注意 $\lambda>0$ 且 $S+\lambda I_p$ 正定时该向量非零，除非 $\beta=0$：岭估计是有偏的，偏差方向指向原点。

再算协方差。$\hat\beta_\lambda$ 的随机部分只有 $(S+\lambda I_p)^{-1}X^\top\varepsilon$，由线性变换的协方差公式，

$$\operatorname{Cov}(\hat\beta_\lambda)=(S+\lambda I_p)^{-1}X^\top\operatorname{Cov}(\varepsilon)\,X(S+\lambda I_p)^{-1}=\sigma^2(S+\lambda I_p)^{-1}S(S+\lambda I_p)^{-1}.$$

接着把两部分合成均方误差。对任意平方可积随机向量 $Z$ 与常向量 $m$，成立恒等式

$$\mathbb E\|Z-m\|_2^2=\|\mathbb E[Z]-m\|_2^2+\operatorname{tr}\operatorname{Cov}(Z),$$

其证明是把 $Z-m$ 写成 $(Z-\mathbb E Z)+(\mathbb E Z-m)$ 后展开：交叉项为 $2(\mathbb E Z-m)^\top\mathbb E[Z-\mathbb E Z]=0$，而 $\mathbb E\|Z-\mathbb E Z\|_2^2=\mathbb E\operatorname{tr}\big[(Z-\mathbb E Z)(Z-\mathbb E Z)^\top\big]=\operatorname{tr}\operatorname{Cov}(Z)$。这正是第19章均方误差分解的向量形式。取 $Z=\hat\beta_\lambda$、$m=\beta$，得

$$\operatorname{MSE}(\lambda)=\lambda^2\beta^\top(S+\lambda I_p)^{-2}\beta+\sigma^2\operatorname{tr}\big[(S+\lambda I_p)^{-1}S(S+\lambda I_p)^{-1}\big].$$

迹中的三个矩阵都是 $S$ 的函数，因而两两可交换，故可合并为 $\operatorname{tr}\big[S(S+\lambda I_p)^{-2}\big]$，此即式（23.8）。

再求导。设 $S=V\Lambda V^\top$，$\Lambda=\operatorname{diag}(s_1,\dots,s_p)$，$s_j>0$，并记 $c_j=\big((V^\top\beta)_j\big)^2\ge 0$。由 $(S+\lambda I_p)^{-1}=V(\Lambda+\lambda I_p)^{-1}V^\top$ 与 $V$ 正交，式（23.8）化为

$$\operatorname{MSE}(\lambda)=\sum_{j=1}^{p}\frac{\lambda^2c_j+\sigma^2 s_j}{(s_j+\lambda)^2}.$$

逐项求导，

$$\frac{d}{d\lambda}\frac{\lambda^2c_j+\sigma^2s_j}{(s_j+\lambda)^2}=\frac{2\lambda c_j(s_j+\lambda)^2-2(\lambda^2c_j+\sigma^2s_j)(s_j+\lambda)}{(s_j+\lambda)^4}=\frac{2s_j(\lambda c_j-\sigma^2)}{(s_j+\lambda)^3}.$$

代入 $\lambda=0$，每项等于 $-2\sigma^2/s_j^2$，求和得

$$\operatorname{MSE}'(0^{+})=-2\sigma^2\sum_{j=1}^{p}\frac{1}{s_j^2}=-2\sigma^2\operatorname{tr}(S^{-2})\ <\ 0,$$

其中用到 $\operatorname{tr}(S^{-2})=\sum_j s_j^{-2}$ 与 $\sigma^2>0$。$\operatorname{MSE}(\cdot)$ 在 $[0,\infty)$ 上可微且右导数在零点为负，故存在充分小的 $\lambda^{*}>0$ 使 $\operatorname{MSE}(\lambda^{*})<\operatorname{MSE}(0)$。而 $\operatorname{MSE}(0)=\sigma^2\operatorname{tr}(S\cdot S^{-2})=\sigma^2\operatorname{tr}(S^{-1})$，正是最小二乘估计的方差之和，此时偏差项为零。

□

注记（结论的适用范围）。命题只断言存在某个正的 $\lambda$ 优于零，并未给出其大小；使 $\operatorname{MSE}$ 最小的 $\lambda^{*}$ 依赖未知的 $\beta$，不可直接使用。它的价值在于说明最小二乘在均方误差意义下几乎总不是最优的，这与第19章中无偏性并非最优准则的结论一脉相承。当 $S$ 的最小特征值很小时 $\operatorname{tr}(S^{-2})$ 极大，零点处的下降极陡，可获得的改善也极大，这正是病态设计中岭回归效果显著的原因。

### 23.2.4 岭迹与广义交叉验证

把谱坐标下的收缩集中写成一行以便引用。设 $S=X^\top X=V\operatorname{diag}(s_1,\dots,s_p)V^\top$ 可逆，$s_j>0$，记 $\tilde\beta=V^\top\hat\beta$、$c_j=\big((V^\top\beta)_j\big)^2$，则

$$\tilde\beta_j^{\mathrm{ridge}}(\lambda)=\frac{s_j}{s_j+\lambda}\,\tilde\beta_j^{\mathrm{OLS}},\qquad \operatorname{MSE}(\lambda)=\sum_{j=1}^{p}\frac{\lambda^2c_j+\sigma^2 s_j}{(s_j+\lambda)^2},\tag{23.9}$$

其中 $s_j=d_j^2$ 是 $S$ 的特征值，与定理 23.5 中奇异值的平方一致。

岭迹是把每个系数 $\tilde\beta_j^{\mathrm{ridge}}(\lambda)$ 画成 $\lambda$ 的函数所得到的曲线族。由式（23.9），每条曲线在 $\lambda=0$ 处取最小二乘值，随 $\lambda$ 增大单调趋于零，而趋于零的速度由 $s_j$ 决定：$s_j$ 小的方向最先被压平。观察岭迹的经验做法是寻找一个稳定点，即 $\lambda$ 增大到某值之后各条曲线不再剧烈变化，而在这一点上系数通常已经明显收缩。这一做法是启发式的，没有最优性保证，但常用来判断哪些方向不稳定。

更有原则的起点是命题 23.7 中的一阶条件。由式（23.9），

$$\operatorname{MSE}'(\lambda)=2\sum_{j=1}^{p}\frac{s_j(\lambda c_j-\sigma^2)}{(s_j+\lambda)^3},$$

令其为零，得

$$\lambda\sum_{j=1}^{p}\frac{s_jc_j}{(s_j+\lambda)^3}=\sigma^2\sum_{j=1}^{p}\frac{s_j}{(s_j+\lambda)^3}.$$

若把两侧的权重 $\dfrac{s_j}{(s_j+\lambda)^3}$ 近似视为与 $j$ 无关而约去，则得 $\lambda\sum_{j=1}^{p}c_j=p\sigma^2$；由 $V$ 正交，$\sum_jc_j=\|V^\top\beta\|_2^2=\|\beta\|_2^2$，于是

$$\lambda_{\mathrm{HK}}=\frac{p\,\hat\sigma^2}{\|\hat\beta^{\mathrm{OLS}}\|_2^2},$$

其中 $\hat\sigma^2$ 与 $\hat\beta^{\mathrm{OLS}}$ 分别是 $\sigma^2$、$\beta$ 的样本估计，代入上式即得可用的数值。这就是 Hoerl–Kennard 岭迹公式。它清楚地显示出收缩量与信噪比的关系：残差方差越大、系数范数越小，$\lambda$ 就越大，与例 23.1 中最优收缩因子 $c^{*}$ 的行为完全一致。

上述权重消去只是获得稳定启发式规则的近似，并不表示 $\lambda_{\mathrm{HK}}$ 逐点满足总体均方误差的一阶条件。实际计算时还需用不含惩罚的截距模型估计 $\hat\sigma^2$，并在由大到小的网格上考察岭迹；若系数仍剧烈变化，就应扩大网格，而不应把目测的稳定点解释为统计最优。

岭参数更通常由预测误差选择。记 $\boldsymbol H_\lambda=\boldsymbol X(\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^\top$，则拟合值为 $\boldsymbol H_\lambda\boldsymbol y$，残差为 $(\boldsymbol I_n-\boldsymbol H_\lambda)\boldsymbol y$。线性平滑子的留一恒等式给出，第 $i$ 个留一预测残差等于 $e_i/(1-h_{ii}(\lambda))$，其中 $e_i$ 是全样本残差的第 $i$ 个分量，$h_{ii}(\lambda)$ 是 $\boldsymbol H_\lambda$ 的第 $i$ 个对角元。因此留一误差无须真正拟合 $n$ 次。

广义交叉验证把各 $h_{ii}(\lambda)$ 替换为其平均值 $n^{-1}\operatorname{tr}(\boldsymbol H_\lambda)$，从而得到

$$
\operatorname{GCV}(\lambda)=
\frac{n^{-1}\|(\boldsymbol I_n-\boldsymbol H_\lambda)\boldsymbol y\|_2^2}
{\left[1-n^{-1}\operatorname{tr}(\boldsymbol H_\lambda)\right]^2},
\qquad
\hat\lambda_{\mathrm{GCV}}\in\arg\min_{\lambda\ge 0}\operatorname{GCV}(\lambda).
\tag{23.10}
$$

与直接留一相比，式（23.10）不依赖个别杠杆值，且在坐标旋转下更稳定。计算时可在对数网格上评价该准则，再以更细的局部网格确定最小点。GCV 估计的是样本内设计下的预测表现，并不保证逼近依赖未知 $\boldsymbol\beta$ 的估计均方误差最小点；样本量很小时，其曲线还可能较平坦，此时应结合验证集波动而非只报告最小值。

**定义 23.8（岭回归的有效自由度）**

岭回归的有效自由度定义为帽子矩阵的迹，并利用 $\boldsymbol S=\boldsymbol X^\top\boldsymbol X$ 的谱分解写成

$$
\operatorname{df}(\lambda)=\operatorname{tr}(\boldsymbol H_\lambda)
=\operatorname{tr}\big[(\boldsymbol S+\lambda\boldsymbol I_p)^{-1}\boldsymbol S\big]
=\sum_{j=1}^{p}\frac{s_j}{s_j+\lambda}.
\tag{23.11}
$$

每个因子 $s_j/(s_j+\lambda)$ 都随 $\lambda$ 严格下降，故 $\operatorname{df}(0)=p$，$\lambda\to\infty$ 时 $\operatorname{df}(\lambda)\to 0$，且 $\operatorname{df}'(\lambda)=-\sum_j s_j/(s_j+\lambda)^2<0$。小特征值方向先失去自由度，这与岭迹中不稳定方向先收缩完全一致。式（23.10）的分母因而也可写成 $[1-\operatorname{df}(\lambda)/n]^2$，它体现了有效模型复杂度对残差估计的校正。

从偏差—方差分解看，增大 $\lambda$ 会增大 $\lambda^2\sum_jc_j/(s_j+\lambda)^2$ 所表示的平方偏差，同时使方差 $\sigma^2\sum_js_j/(s_j+\lambda)^2$ 下降。最优折中不是在“无偏”与“有方差”之间选择，而是在两种误差来源的边际变化相等处选择。由于 $\operatorname{df}(\lambda)$ 可取非整数值，它衡量的是拟合对观测的敏感程度，而不是非零系数的个数。

## 23.3 Lasso 与稀疏正则化

岭回归连续地压缩系数，却不会一般地产生严格为零的系数。若希望在控制方差的同时得到可解释的稀疏模型，需要把二范数惩罚改为一范数惩罚。以下总设响应与预测变量已中心化，截距单独估计；各列还满足 $n^{-1}\|\boldsymbol X_j\|_2^2=1$，从而使同一惩罚参数对不同变量具有可比尺度。

Lasso 估计定义为

$$
\hat{\boldsymbol\beta}^{\mathrm L}
\in\arg\min_{\boldsymbol\beta\in\mathbb R^p}
\left\{\frac{1}{2n}\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2
+\lambda\|\boldsymbol\beta\|_1\right\},
\qquad \lambda\ge 0.
\tag{23.12}
$$

目标函数是二次凸函数与一范数的和，因此任何局部极小点都是全局极小点。即使 $\boldsymbol X$ 不满列秩，最优拟合值仍唯一，但系数表示可以不唯一；这一点与 $\lambda>0$ 时岭回归系数始终唯一不同。一范数在单位球边界上的尖点正是产生精确零系数的几何来源，后文将用次梯度严格说明。

### 23.3.1 正交设计与软阈值

先考虑 $n^{-1}\boldsymbol X^\top\boldsymbol X=\boldsymbol I_p$ 的正交设计。令 $\boldsymbol z=n^{-1}\boldsymbol X^\top\boldsymbol y$，则

$$
\frac{1}{2n}\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2
=\frac12\|\boldsymbol\beta-\boldsymbol z\|_2^2
+\frac{1}{2n}\|\boldsymbol y\|_2^2-\frac12\|\boldsymbol z\|_2^2.
$$

省略与 $\boldsymbol\beta$ 无关的项，目标便分解为 $p$ 个一维问题

$$
\min_{b\in\mathbb R}\left\{\frac12(b-z_j)^2+\lambda|b|\right\}.
$$

固定 $j$。若最优 $b>0$，可微条件为 $b-z_j+\lambda=0$，故 $b=z_j-\lambda$，此解可行当且仅当 $z_j>\lambda$。若最优 $b<0$，条件为 $b-z_j-\lambda=0$，故 $b=z_j+\lambda$，此解可行当且仅当 $z_j<-\lambda$。最后，$b=0$ 最优当且仅当零属于该点的次微分，即

$$
0\in-z_j+\lambda[-1,1]
\quad\Longleftrightarrow\quad |z_j|\le\lambda.
$$

三种情形互斥且穷尽所有可能，目标又严格凸，所以该一维解唯一。定义软阈值算子并汇总为

$$
\mathcal S_\lambda(z)=\operatorname{sgn}(z)(|z|-\lambda)_+,
\qquad
\hat\beta_j^{\mathrm L}=\mathcal S_\lambda(z_j),
\qquad j=1,\dots,p.
\tag{23.13}
$$

其中 $(u)_+=\max\{u,0\}$。推导揭示了两种作用：$|z_j|\le\lambda$ 时精确删除变量，超过阈值后仍把绝对值压缩 $\lambda$。这与硬阈值只删除、不继续压缩不同，也与岭回归只做乘法收缩不同。

**例 23.2**

在正交设计中，设 $\boldsymbol z=(2,0.8,0.3)^\top$，Lasso 参数为 $\lambda=0.5$。再考虑同一二次损失下惩罚为 $\alpha\|\boldsymbol\beta\|_2^2/2$ 的岭回归，并取 $\alpha=0.5$。求两种估计并比较其稀疏性。

**解**

逐项代入式（23.13），得

$$
\hat{\boldsymbol\beta}^{\mathrm L}
=(1.5,0.3,0)^\top.
$$

岭问题的一阶条件为 $(1+\alpha)\boldsymbol\beta=\boldsymbol z$，故

$$
\hat{\boldsymbol\beta}^{\mathrm{ridge}}
=\frac{1}{1.5}(2,0.8,0.3)^\top
=\left(\frac43,\frac{8}{15},\frac15\right)^\top.
$$

Lasso 将第三个系数精确置零，并对其余两个系数各减去 $0.5$；岭回归保留全部变量，并按同一比例 $2/3$ 收缩。两种估计都降低系数的绝对值，但只有前者进行了变量选择。

### 23.3.2 KKT 条件与坐标下降

一般设计下不能逐坐标分离目标，但凸性仍给出精确的最优性刻画。对 $b\in\mathbb R$，绝对值函数的次微分为

$$
\partial |b|=
\begin{cases}
\{1\}, & b>0,\\
[-1,1], & b=0,\\
\{-1\}, & b<0.
\end{cases}
$$

记式（23.12）的目标为 $F_\lambda$。若 $\hat{\boldsymbol\beta}$ 是最优解，则对任意方向 $\boldsymbol v$，凸性给出
$F_\lambda(\hat{\boldsymbol\beta}+\boldsymbol v)-F_\lambda(\hat{\boldsymbol\beta})\ge 0$；由凸函数的次梯度不等式，这等价于存在 $\boldsymbol g\in\partial F_\lambda(\hat{\boldsymbol\beta})$ 使 $\boldsymbol g=0$。反之，若 $0\in\partial F_\lambda(\hat{\boldsymbol\beta})$，同一次梯度不等式立即推出 $F_\lambda(\boldsymbol\beta)\ge F_\lambda(\hat{\boldsymbol\beta})$ 对一切 $\boldsymbol\beta$ 成立。因此零属于次微分不仅是必要条件，也是充分条件。

二次项的梯度为 $-n^{-1}\boldsymbol X^\top(\boldsymbol y-\boldsymbol X\boldsymbol\beta)$。逐项写出 $0\in\partial F_\lambda(\hat{\boldsymbol\beta})$，便得到 KKT 条件

$$
\frac1n\boldsymbol X_j^\top
(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})
\in\lambda\,\partial|\hat\beta_j|,
\qquad j=1,\dots,p,
\tag{23.14}
$$

或等价地，

$$
\frac1n\boldsymbol X_j^\top
(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})
=
\begin{cases}
\lambda\operatorname{sgn}(\hat\beta_j), & \hat\beta_j\ne 0,\\
v_j,\quad |v_j|\le\lambda, & \hat\beta_j=0.
\end{cases}
$$

这组条件同时包含梯度方程与稀疏规则：非零系数的残差相关恰好达到惩罚边界，零系数对应的相关则不得越过该边界。它不是额外近似，而是式（23.12）的全部最优性条件。特别地，若某坐标当前为零，但用其余坐标计算出的残差相关绝对值大于 $\lambda$，保持该坐标为零就不可能最优。

坐标下降法据此每次只优化一个坐标。固定其余系数，定义去掉第 $j$ 项后的部分残差

$$
\boldsymbol r_{-j}=\boldsymbol y-\sum_{k\ne j}\boldsymbol X_k\hat\beta_k,
\qquad
z_j=\frac1n\boldsymbol X_j^\top\boldsymbol r_{-j},
\qquad
d_j=\frac1n\|\boldsymbol X_j\|_2^2.
$$

将第 $j$ 个坐标改为 $b$，其余坐标不动，则与 $b$ 有关的目标为

$$
\frac{1}{2n}\|\boldsymbol r_{-j}-b\boldsymbol X_j\|_2^2+\lambda|b|
=\frac{d_j}{2}\left(b-\frac{z_j}{d_j}\right)^2+\lambda|b|+C,
$$

其中 $C$ 不依赖 $b$。把式（23.13）的一维推导中的 $z_j$ 换为 $z_j/d_j$，再把方程乘以 $d_j$，得到精确坐标极小点

$$
\hat\beta_j\longleftarrow \frac{\mathcal S_\lambda(z_j)}{d_j},
\qquad d_j>0.
$$

在本文的标准化尺度下 $d_j=1$，更新简化为 $\mathcal S_\lambda(z_j)$。若保存全残差 $\boldsymbol r=\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta}$，则 $\boldsymbol r_{-j}=\boldsymbol r+\boldsymbol X_j\hat\beta_j$，因此也可先计算 $\rho_j=n^{-1}\boldsymbol X_j^\top\boldsymbol r+d_j\hat\beta_j$，再令 $\hat\beta_j^{\mathrm{new}}=\mathcal S_\lambda(\rho_j)/d_j$，并用 $\boldsymbol r-\boldsymbol X_j(\hat\beta_j^{\mathrm{new}}-\hat\beta_j)$ 更新残差。

实际迭代可从零向量开始，按 $1,2,\dots,p$ 循环更新。每一步都在固定其余坐标时取得精确最小值，故目标函数单调不增；完成一整轮后，可用最大坐标变化量及式（23.14）的违反程度共同判断停止。由于最优性判定直接检查 KKT 条件，停止准则不应只看作目标函数最后几位的变化。

### 23.3.3 与岭回归的几何和统计差异

在系数空间中，岭约束 $\|\boldsymbol\beta\|_2\le t$ 的边界光滑，而 Lasso 约束 $\|\boldsymbol\beta\|_1\le t$ 是多面体，其顶点位于坐标轴上，棱和面上也有部分坐标为零。残差平方和的等值椭球与一范数球首次相切时，切点常落在这些低维边界上，于是产生稀疏解；与二范数球相切通常只会缩小所有坐标。若等值椭球沿一范数球的某个面贴合，Lasso 还可能有一整段最优解，这解释了高相关设计下的不唯一性。

统计上，岭估计对所有方向施加连续的乘法收缩，适合许多系数都非零且单个信号较弱的情形。Lasso 同时进行压缩和选择，适合少量系数占主导的情形，但阈值造成的偏差在小系数附近并不平滑。面对一组高度相关的预测变量，岭回归倾向于共同保留并分摊效应，Lasso 则常选择其中少数代表；这种选择可能随样本扰动改变，不能把被选中的变量自动解释为唯一的因果变量。两种方法都应先统一变量尺度，并把截距排除在惩罚之外。

### 23.3.4 变量选择一致性与不可表示条件

仅有预测误差小并不足以保证选到正确变量。设真实模型为 $\boldsymbol y=\boldsymbol X\boldsymbol\beta^*+\boldsymbol\varepsilon$，真实支撑为 $S=\{j:\beta_j^*\ne0\}$，其余指标组成 $N=S^c$。记 $\boldsymbol z_S=\operatorname{sgn}(\boldsymbol\beta_S^*)$，并设 $\boldsymbol X_S$ 满列秩。下面的确定性结论把精确恢复分解为设计条件、噪声条件和最小信号条件。

**定理 23.9（不可表示条件下的精确变量选择）**

对 $\lambda>0$，定义

$$
\boldsymbol P_S=\boldsymbol X_S(\boldsymbol X_S^\top\boldsymbol X_S)^{-1}\boldsymbol X_S^\top,
\qquad
\boldsymbol\Gamma=\boldsymbol X_N^\top\boldsymbol X_S
(\boldsymbol X_S^\top\boldsymbol X_S)^{-1}.
$$

假设存在 $\eta\in(0,1]$ 使 $\|\boldsymbol\Gamma\|_\infty\le1-\eta$，其中 $\|\cdot\|_\infty$ 是矩阵的最大行绝对和范数。再定义

$$
\boldsymbol w=\frac{\boldsymbol X_N^\top(\boldsymbol I_n-\boldsymbol P_S)\boldsymbol\varepsilon}{n\lambda},
\qquad
\boldsymbol\delta_S=(\boldsymbol X_S^\top\boldsymbol X_S)^{-1}
(\boldsymbol X_S^\top\boldsymbol\varepsilon-n\lambda\boldsymbol z_S).
$$

若 $\|\boldsymbol w\|_\infty<\eta$，且对每个 $j\in S$ 都有 $|\beta_j^*|>|\delta_j|$，则 Lasso 问题的唯一解为

$$
\tilde{\boldsymbol\beta}_S=\boldsymbol\beta_S^*+\boldsymbol\delta_S,
\qquad
\tilde{\boldsymbol\beta}_N=0,
$$

并满足 $\operatorname{supp}(\tilde{\boldsymbol\beta})=S$ 与 $\operatorname{sgn}(\tilde{\boldsymbol\beta}_S)=\boldsymbol z_S$。

**证明**

构造上述候选解。最小信号条件保证 $\tilde\beta_j$ 与 $\beta_j^*$ 对每个 $j\in S$ 同号且非零，所以候选解确实具有支撑 $S$ 和符号 $\boldsymbol z_S$。由 $\boldsymbol\beta_N^*=0$，其残差可写成

$$
\begin{aligned}
\tilde{\boldsymbol r}
&=\boldsymbol y-\boldsymbol X_S\tilde{\boldsymbol\beta}_S\\
&=\boldsymbol\varepsilon-\boldsymbol X_S
(\boldsymbol X_S^\top\boldsymbol X_S)^{-1}
(\boldsymbol X_S^\top\boldsymbol\varepsilon-n\lambda\boldsymbol z_S)\\
&=(\boldsymbol I_n-\boldsymbol P_S)\boldsymbol\varepsilon
+n\lambda\boldsymbol X_S(\boldsymbol X_S^\top\boldsymbol X_S)^{-1}\boldsymbol z_S .
\end{aligned}
$$
先验证活跃坐标。利用 $\boldsymbol X_S^\top(\boldsymbol I_n-\boldsymbol P_S)=0$，有

$$
\frac1n\boldsymbol X_S^\top\tilde{\boldsymbol r}
=\lambda\boldsymbol z_S
=\lambda\operatorname{sgn}(\tilde{\boldsymbol\beta}_S).
$$

再验证非活跃坐标。由 $\boldsymbol X_N^\top\boldsymbol P_S=\boldsymbol\Gamma\boldsymbol X_S^\top$ 以及 $\boldsymbol\Gamma$ 的定义，

$$
\frac{\boldsymbol X_N^\top\tilde{\boldsymbol r}}{n\lambda}
=\boldsymbol w+\boldsymbol\Gamma\boldsymbol z_S.
$$

矩阵无穷范数与向量无穷范数相容，且 $\|\boldsymbol z_S\|_\infty=1$，故

$$
\left\|\frac{\boldsymbol X_N^\top\tilde{\boldsymbol r}}{n\lambda}\right\|_\infty
\le\|\boldsymbol w\|_\infty+\|\boldsymbol\Gamma\|_\infty
<\eta+(1-\eta)=1.
$$

因此活跃坐标满足等式 KKT 条件，非活跃坐标以严格不等式满足对偶可行条件。前已证明这些条件对凸问题是充分的，所以候选解是全局最优解。

还需排除其他最优解。任取另一最优解 $\hat{\boldsymbol\beta}$。二次损失关于拟合值严格凸，一范数关于系数凸；若两个解的拟合值不同，对两解取平均便得到更小的目标值，矛盾。因此所有最优解具有相同拟合值，也共享残差 $\tilde{\boldsymbol r}$；相同的目标值继而推出 $\|\hat{\boldsymbol\beta}\|_1=\|\tilde{\boldsymbol\beta}\|_1$。

令 $\boldsymbol g=\boldsymbol X^\top\tilde{\boldsymbol r}/(n\lambda)$。对任一最优解，KKT 条件乘以该解并求和给出 $\|\hat{\boldsymbol\beta}\|_1=\hat{\boldsymbol\beta}^\top\boldsymbol g$。另一方面，$\boldsymbol g_S=\boldsymbol z_S$ 且 $\|\boldsymbol g_N\|_\infty<1$，所以

$$
\|\hat{\boldsymbol\beta}\|_1
=\hat{\boldsymbol\beta}_S^\top\boldsymbol z_S
+\hat{\boldsymbol\beta}_N^\top\boldsymbol g_N
\le\|\hat{\boldsymbol\beta}_S\|_1
+\|\boldsymbol g_N\|_\infty\|\hat{\boldsymbol\beta}_N\|_1.
$$

若 $\hat{\boldsymbol\beta}_N\ne0$，右端严格小于 $\|\hat{\boldsymbol\beta}_S\|_1+\|\hat{\boldsymbol\beta}_N\|_1=\|\hat{\boldsymbol\beta}\|_1$，产生矛盾。故 $\hat{\boldsymbol\beta}_N=0$。再由拟合值相同和 $\boldsymbol X_S$ 满列秩，得 $\hat{\boldsymbol\beta}_S=\tilde{\boldsymbol\beta}_S$，唯一性成立。

□

定理 23.9 直接给出固定维度下的变量选择一致性。设 $p$ 与 $\boldsymbol\beta^*$ 固定，$\varepsilon_i$ 独立同分布于均值为零、方差为 $\sigma^2$ 的正态分布；确定性设计满足 $n^{-1}\boldsymbol X^\top\boldsymbol X\to\boldsymbol C$，其中 $\boldsymbol C_{SS}$ 正定，并且相应的 $\boldsymbol\Gamma_n$ 收敛到某个满足 $\|\boldsymbol\Gamma\|_\infty\le1-\eta$ 的极限。取 $\lambda_n\to0$ 且 $\sqrt n\lambda_n\to\infty$。固定维数的线性变换保持 $O_p$ 阶，因此

$$
\|\boldsymbol w\|_\infty=O_p\!\left(\frac{1}{\sqrt n\lambda_n}\right)=o_p(1),
\qquad
\|\boldsymbol\delta_S\|_\infty=O_p(n^{-1/2})+O_p(\lambda_n)=o_p(1).
$$

真实最小非零系数 $\min_{j\in S}|\beta_j^*|$ 是固定正数，所以定理的两个噪声与信号条件以趋于一的概率同时成立，进而

$$
\mathbb P\{\operatorname{supp}(\hat{\boldsymbol\beta}^{\mathrm L})=S,
\ \operatorname{sgn}(\hat{\boldsymbol\beta}_S^{\mathrm L})=\boldsymbol z_S\}\to1.
$$

可取 $\lambda_n=n^{-\alpha}$ 且 $0<\alpha<1/2$ 满足这两个速率要求。$\lambda_n\to0$ 防止活跃系数受到过大的渐近偏差，$\sqrt n\lambda_n\to\infty$ 则使非活跃坐标的随机相关相对于阈值消失。

不可表示条件具有明确的回归解释。$\boldsymbol\Gamma$ 的每一行是把一个非活跃变量对全部活跃变量作最小二乘回归所得的系数，并要求这些系数的绝对和严格小于一。若非活跃变量能被活跃变量强相关地表示，活跃系数的 Lasso 收缩会把较大相关传给非活跃变量，使其越过 KKT 阈值；严格的余量 $\eta$ 则为随机噪声保留空间。仅有弱不等式而没有余量，通常不足以控制任意小的噪声。最小信号条件也不可省略，因为趋于零过快的真实系数无法与估计误差区分。

### 23.3.5 Elastic Net

Lasso 在强相关变量之间的选择可能不稳定，且当 $p>n$ 时，一个 Lasso 解至多具有 $n$ 个非零系数。Elastic Net 把一范数与二范数惩罚结合为

$$
\hat{\boldsymbol\beta}^{\mathrm{EN}}
\in\arg\min_{\boldsymbol\beta\in\mathbb R^p}
\left\{\frac{1}{2n}\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2
+\lambda_1\|\boldsymbol\beta\|_1
+\frac{\lambda_2}{2}\|\boldsymbol\beta\|_2^2\right\},
\qquad \lambda_1,\lambda_2\ge0.
$$
这里的非零个数上界指由线性独立活跃列表示的基本最优解；退化问题仍可能另有系数表示。Elastic Net 的关键变化是，当 $\lambda_2>0$ 时，目标含有严格凸项 $\lambda_2\|\boldsymbol\beta\|_2^2/2$。若两个不同系数向量都是最优解，对二者取平均会使目标严格下降，故最优系数向量必唯一，即使 $\boldsymbol X$ 不满列秩也是如此。

其 KKT 条件由 Lasso 条件增加二范数项的梯度得到：

$$
\frac1n\boldsymbol X_j^\top
(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})
\in\lambda_1\partial|\hat\beta_j|+\lambda_2\hat\beta_j,
\qquad j=1,\dots,p.
$$

沿用 $z_j=n^{-1}\boldsymbol X_j^\top\boldsymbol r_{-j}$ 与 $d_j=n^{-1}\|\boldsymbol X_j\|_2^2$，固定其余坐标后的目标为

$$
\frac{d_j+\lambda_2}{2}b^2-z_jb+\lambda_1|b|+C.
$$

若 $b>0$，一阶条件为 $(d_j+\lambda_2)b-z_j+\lambda_1=0$；若 $b<0$，最后一项改为 $-\lambda_1$；若 $b=0$，零属于 $-z_j+\lambda_1[-1,1]$ 当且仅当 $|z_j|\le\lambda_1$。合并三种情形得到坐标更新

$$
\hat\beta_j\longleftarrow
\frac{\mathcal S_{\lambda_1}(z_j)}{d_j+\lambda_2}.
$$

因此一范数仍负责阈值选择，二范数则额外缩小分母。若两个变量高度相关，只更新其中一个会抬高另一个的残差相关，二范数对“把一个系数全部放大”的额外惩罚又促使效应由二者分担，这就是 Elastic Net 的分组收缩倾向；它并不保证每一组相关变量在所有数据上都共同入选。

**例 23.3**

设 $\boldsymbol X_1=\boldsymbol X_2=\boldsymbol x$，$n^{-1}\|\boldsymbol x\|_2^2=1$，并记 $z=n^{-1}\boldsymbol x^\top\boldsymbol y>0$。比较惩罚参数为 $\lambda_1=\lambda$ 的 Lasso 与另加 $\lambda_2>0$ 的 Elastic Net 在 $z>\lambda$ 时的解。

**解**

对任意系数，拟合只依赖 $t=\beta_1+\beta_2$，且

$$
\frac{1}{2n}\|\boldsymbol y-t\boldsymbol x\|_2^2
=\frac12t^2-zt+C.
$$
对 Lasso，固定 $t\ge0$ 时有 $|\beta_1|+|\beta_2|\ge t$，等号在两个系数同号且和为 $t$ 时成立。因此先对固定的 $t$ 最小化，再关于 $t$ 最小化，目标化为

$$
\frac12t^2-zt+\lambda t+C.
$$

由 $z>\lambda$，最优 $t=z-\lambda>0$。所以任意

$$
\beta_1\ge0,\qquad \beta_2\ge0,\qquad \beta_1+\beta_2=z-\lambda
$$

都是全局最优解，Lasso 在这一完全相关设计上不唯一。

对 Elastic Net，还有 $\beta_1^2+\beta_2^2\ge t^2/2$，等号仅在 $\beta_1=\beta_2=t/2$ 时成立。二范数严格惩罚任何不平衡分配，故只需最小化

$$
\frac12t^2-zt+\lambda t+\frac{\lambda_2}{4}t^2+C.
$$

一阶条件给出 $t=2(z-\lambda)/(2+\lambda_2)$，从而唯一解为

$$
\hat\beta_1^{\mathrm{EN}}=\hat\beta_2^{\mathrm{EN}}
=\frac{z-\lambda}{2+\lambda_2}.
$$

这说明二范数项消除了完全相关方向上的不唯一性，而一范数项仍通过 $z>\lambda$ 决定两个系数是否同时非零。

## 23.4 交叉验证与重采样

正则化参数控制模型复杂度，但其总体最优值依赖未知参数与噪声。交叉验证用未参与当次拟合的数据估计预测损失，使参数选择可以直接从观测完成。设待选参数为 $\lambda$，损失为 $\ell$，拟合算法在训练指标集 $\mathcal T$ 上返回预测函数 $\hat f_{\lambda,\mathcal T}$。关键在于，中心化、标准化、变量筛选和参数调整都必须在 $\mathcal T$ 内重新完成，否则验证信息会通过预处理泄漏到训练过程。

### 23.4.1 K 折交叉验证

把指标集 $\{1,\dots,n\}$ 尽量均衡地划分为 $K$ 个互不相交的折 $F_1,\dots,F_K$。对每个 $k$，以 $F_k$ 为验证折，以其余指标为训练集，计算

$$
\operatorname{CV}_K(\lambda)
=\frac1n\sum_{k=1}^{K}\sum_{i\in F_k}
\ell\big(y_i,\hat f_{\lambda,F_k^c}(\boldsymbol x_i)\big).
$$

## 23.5 信息准则与模型选择

23.4 节以预测损失比较正则化参数。若模型属于有限个参数族，也可从极大似然出发，对拟合优度附加维度惩罚。设数据 $D_n$ 的候选模型为 $p_{\boldsymbol\theta}$，参数维数为 $d$，对数似然为 $\ell_n(\boldsymbol\theta)$，极大似然估计为 $\hat{\boldsymbol\theta}$。信息准则并不把训练似然当作总体表现，而是修正其乐观偏差或近似贝叶斯证据。

**定义 23.10（AIC 与 BIC）**

赤池信息准则和贝叶斯信息准则分别定义为

$$
\operatorname{AIC}
=-2\ell_n(\hat{\boldsymbol\theta})+2d .
\tag{23.15}
$$

$$
\operatorname{BIC}
=-2\ell_n(\hat{\boldsymbol\theta})+d\log n .
\tag{23.16}
$$

选择准则值较小的候选模型。AIC 源于对独立未来数据对数预测密度的 Kullback--Leibler 评价：若真实密度为 $g$，最小化 $\mathbb E_g[\log\{g(Z)/p_{\boldsymbol\theta}(Z)\}]$ 等价于最大化 $\mathbb E_g[\log p_{\boldsymbol\theta}(Z)]$。BIC 源于边际似然的 Laplace 展开，维度惩罚随 $\log n$ 增长，因而通常比 AIC 更偏向简约模型。

### 23.5.1 AIC 的渐近依据

设真实分布属于候选族，真实参数为 $\boldsymbol\theta_0$， Fisher 信息矩阵 $\boldsymbol I_0$ 正定，且正则条件保证极大似然估计渐近正态、似然可二阶展开。记 $Z$ 为与训练样本独立且同分布的新观测，定义目标量 $-2n\mathbb E[\log p_{\hat{\boldsymbol\theta}}(Z)]$，其中期望同时对训练数据与 $Z$ 取。AIC 正是该目标的渐近无偏估计，而非对训练似然的简单重复评价。

**定理 23.11（AIC 的渐近无偏性）**

在上述正则条件下，当 $n\to\infty$ 时，

$$
\mathbb E[\operatorname{AIC}]
=-2n\mathbb E[\log p_{\hat{\boldsymbol\theta}}(Z)]+o(1).
$$

**证明**

在 $\hat{\boldsymbol\theta}$ 处作二阶展开。由得分方程以及 $\sqrt n(\hat{\boldsymbol\theta}-\boldsymbol\theta_0)$ 的渐近正态性，训练对数似然的增益满足
$$
2\{\ell_n(\hat{\boldsymbol\theta})-\ell_n(\boldsymbol\theta_0)\}
\Rightarrow\chi_d^2,
$$

故其期望为 $d+o(1)$。另一方面，先固定训练样本并对独立的 $Z$ 展开总体对数似然，再对训练样本取期望，得分在 $\boldsymbol\theta_0$ 处的总体期望为零，所以

$$
n\mathbb E[\log p_{\hat{\boldsymbol\theta}}(Z)]
=n\mathbb E_g[\log p_{\boldsymbol\theta_0}(Z)]-\frac d2+o(1).
$$

同时，$\mathbb E[\ell_n(\boldsymbol\theta_0)]=n\mathbb E_g[\log p_{\boldsymbol\theta_0}(Z)]$，从而训练极大对数似然的期望等于 $n\mathbb E_g[\log p_{\boldsymbol\theta_0}(Z)]+d/2+o(1)$。代入式（23.15），得到

$$
\mathbb E[\operatorname{AIC}]
=-2n\mathbb E_g[\log p_{\boldsymbol\theta_0}(Z)]+d+o(1).
$$

而由上述总体展开，$-2n\mathbb E[\log p_{\hat{\boldsymbol\theta}}(Z)]$ 也等于同一表达式，两式相减即得结论。

□

若真实分布不属于候选族，以最近伪真参数替代 $\boldsymbol\theta_0$，记二阶导数矩阵为 $\boldsymbol J$、得分协方差矩阵为 $\boldsymbol I$，乐观偏差的维数应替换为 $\operatorname{tr}(\boldsymbol J^{-1}\boldsymbol I)$。这给出 Takeuchi 信息准则；在模型正确时两矩阵相等，迹化为 $d$，恢复 AIC。

### 23.5.2 BIC 的贝叶斯来源与一致性

给参数设置正则先验 $\pi_m(\boldsymbol\theta)$，模型 $m$ 的边际似然是 $\int\exp\{\ell_{n,m}(\boldsymbol\theta)\}\pi_m(\boldsymbol\theta)\,d\boldsymbol\theta$。在极大似然估计附近作二阶 Taylor 展开，指数出现 $-n/2$ 乘以二次型，$d_m$ 维高斯积分贡献 $(2\pi/n)^{d_m/2}$。因此边际对数似然为 $\ell_{n,m}(\hat{\boldsymbol\theta}_m)-\frac{d_m}{2}\log n+O_p(1)$，乘以 $-2$ 即得式（23.16）。

**定理 23.12（有限候选族中的 BIC 一致性）**

设候选族有限，唯一最简正确模型 $m_0$ 满足上述正则条件；每个错误模型与真实分布在 Kullback--Leibler 距离下有正的最优差距，每个包含 $m_0$ 的过度参数化模型也满足似然比展开。则以概率趋于 $1$，BIC 选中 $m_0$。

**证明**

对任一错误模型 $m$，其最大平均对数似然与真实模型的相应极限之差为 $-\kappa_m$，其中 $\kappa_m>0$。于是
$$
\operatorname{BIC}_m-\operatorname{BIC}_{m_0}
=2n\kappa_m+O_p(\log n)\to+\infty .
$$

故这类模型以概率趋于 $1$ 被淘汰。若 $m$ 包含 $m_0$ 且多出的维数为 $q_m>0$，似然比定理给出 $2\{\ell_{n,m}(\hat{\boldsymbol\theta}_m)-\ell_{n,m_0}(\hat{\boldsymbol\theta}_{m_0})\}=O_p(1)$，从而

$$
\operatorname{BIC}_m-\operatorname{BIC}_{m_0}
=q_m\log n-O_p(1)\to+\infty .
$$

两类差值都趋于正无穷，有限个候选模型不会带来额外的多重性发散，故最小 BIC 最终只在 $m_0$ 处取得。

□

AIC 的固定维度惩罚追求有限样本预测效率，在过度参数化模型上不以概率趋于 $1$ 排除全部多余维度；BIC 的一致性依赖有限候选族和正确模型在族内。无限候选、非正则边界或模型全部错设时，不能把上述结论直接外推。

**例 23.4**

同一高斯线性回归数据有 $100$ 个观测。简约模型含 $4$ 个待估回归参数，扩展模型含 $8$ 个；两者采用相同方差参数化和常数项，扩展模型的最大化对数似然比简约模型高 $5$。比较 AIC 与 BIC 的选择。

**解**

以扩展模型减简约模型计算准则差。拟合增益为 $5$，维数增加为 $4$，故

$$
\Delta\operatorname{AIC}=-2\times5+2\times4=-2.
$$

AIC 因而选择扩展模型。另一方面，

$$
\Delta\operatorname{BIC}
=-2\times5+4\log100
=8.42068\ldots>0,
$$

所以 BIC 选择简约模型。差异不是计算矛盾：AIC 用固定惩罚近似预测乐观偏差，BIC 的惩罚对应随样本量增长的边际似然近似。若两模型的似然常数或观测集不同，这种直接相减无效。

## 23.6 交叉验证的偏差与时间依赖

23.4 节已给出 $K$ 折评分。对独立同分布数据，折的随机划分应固定于各候选算法之间，以共同随机性减少比较方差；分类问题可在训练数据内保持类别比例。$K$ 较小会减少计算，却缩小每次训练集；$K$ 较大使训练量接近全样本，但各折训练集高度重叠，验证误差的协方差不可忽略。

### 23.6.1 留一法与训练集偏差

留一交叉验证令每折只含一个观测，其评分为
$$
\widehat R_{\mathrm{LOO}}(A)
=\frac1n\sum_{i=1}^n
L\!\left(y_i,A(D_{-i})(x_i)\right),
\qquad D_{-i}=D\setminus\{(x_i,y_i)\}.
\tag{23.17}
$$

其中 $A(D_{-i})$ 表示只用删除第 $i$ 个观测后的数据训练所得预测规则，$L$ 是固定损失函数。每次拟合都必须重新执行全部预处理、变量筛选和调参步骤；若先用全数据筛选变量再留一拟合，验证观测已经参与了训练信息传递，式（23.17）就不再对应完整算法的样本外误差。

设 $r_\ell=\mathbb E[L(Y,A(D_\ell)(X))]$，其中 $D_\ell$ 含 $\ell$ 个独立同分布训练观测，$(X,Y)$ 是与训练集独立的新观测，期望同时对二者计算。留一评分中第 $i$ 项的条件训练样本量为 $n-1$，由可交换性，其无条件期望均为 $r_{n-1}$，故 $\mathbb E[\widehat R_{\mathrm{LOO}}(A)]=r_{n-1}$。因此，留一法对“用 $n-1$ 个观测训练的算法”的风险无偏，却不是自动对 $r_n$ 无偏。若学习曲线存在展开 $r_m=r_\infty+a/m+O(m^{-2})$，则
$r_{n-1}-r_n=a/\{n(n-1)\}+O(n^{-3})$。当 $a>0$ 时，这一偏差为正，且通常随 $n$ 增大而减小；若算法已到达风险平台，偏差也可以很小。

留一验证损失的个数为 $n$，并不意味着有 $n$ 个独立重复。任意两个留一训练集共享 $n-2$ 个观测，拟合结果及验证损失通常相关，所以不能用这 $n$ 个损失的样本方差除以 $n$ 来宣称评分标准误已被无偏估计。留一法的主要优势是训练集偏差小、无需选择折数；其代价是通常要拟合 $n$ 次，并且在某些模型选择问题中各折高度相似，评分方差未必低于适当的 $K$ 折法。
对固定特征的线性平滑器，留一法有时不必重复拟合。以岭回归为例，固定惩罚参数后令 $\boldsymbol C=\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I$、$\boldsymbol H=\boldsymbol X\boldsymbol C^{-1}\boldsymbol X^\top$，并记 $h_{ii}$ 为 $\boldsymbol H$ 的第 $i$ 个对角元，$\hat y_i$ 为全样本拟合值。删除第 $i$ 行后的正规方程为
$(\boldsymbol C-\boldsymbol x_i\boldsymbol x_i^\top)\hat{\boldsymbol\beta}^{(-i)}=\boldsymbol X^\top\boldsymbol y-y_i\boldsymbol x_i$。由 Sherman--Morrison 公式，
$(\boldsymbol C-\boldsymbol x_i\boldsymbol x_i^\top)^{-1}=\boldsymbol C^{-1}+\boldsymbol C^{-1}\boldsymbol x_i\boldsymbol x_i^\top\boldsymbol C^{-1}/(1-h_{ii})$。代入并整理可得 $\hat{\boldsymbol\beta}^{(-i)}=\hat{\boldsymbol\beta}+\boldsymbol C^{-1}\boldsymbol x_i(\hat y_i-y_i)/(1-h_{ii})$，再左乘 $\boldsymbol x_i^\top$，得到

$$
y_i-\hat y_i^{(-i)}
=\frac{y_i-\hat y_i}{1-h_{ii}},
\qquad h_{ii}\ne 1.
\tag{23.18}
$$

这一恒等式把 $n$ 次岭回归化为一次矩阵分解；但 $\lambda$ 若在完整留一流程内选择，就必须对每个候选值和每次删除分别使用相应的训练数据，不能用全数据先选定 $\lambda$ 后再套式（23.18）。当 $h_{ii}$ 接近 $1$ 时，高杠杆点的留一残差会被显著放大，这也揭示了该点对模型可行性的影响。

### 23.6.2 K 折评分、方差与折数选择

将索引随机划分为互不相交且大小尽量相等的验证折 $V_1,\ldots,V_K$，并令 $D_{-V_k}$ 表示删除第 $k$ 折后的训练数据。一般 $K$ 折评分为

$$
\widehat R_K(A)
=\frac1n\sum_{k=1}^K\sum_{i\in V_k}
L\!\left(y_i,A(D_{-V_k})(x_i)\right).
\tag{23.19}
$$

若各折大小相等，每次训练样本量为 $n(1-1/K)$，故评分的无条件期望是 $r_{n(1-1/K)}$，而不是 $r_n$。这与留一结论一致：$K$ 越小，训练集越短，学习曲线造成的正偏差往往越大；$K$ 增大可减少这种偏差，却增加拟合次数和训练集重叠。$K=n$ 即回到留一法，$K=2$ 时每次仅用约一半数据训练，两者不能只因前者计算更多就判断后者更保守或更稳定。
折间协方差是理解 $K$ 折评分不稳定性的关键。若第 $k$ 折的平均验证损失为 $\bar L_k$，权重为 $w_k=|V_k|/n$，则 $\widehat R_K=\sum_k w_k\bar L_k$。其方差除包含各折自身方差外，还包含所有折对之间的协方差；训练集高度重叠时，这些协方差通常不能忽略。因此，不能将折均值视为独立样本后机械套用独立同分布的标准误公式。重复若干次随机 $K$ 折并取平均，可以降低由偶然分折引起的蒙特卡洛波动，但不能消除有限数据本身的风险不确定性，也不能把重复评分变成独立的数据集。

比较候选算法时，应让它们使用相同折划分并逐项比较配对损失差，以抵消共同验证观测带来的波动。折的随机种子、缺失值处理、特征标准化和类别平衡都应纳入可复现流程。若观测属于多个相关组，例如同一患者的多次测量，应按组整体分折，使同组记录不横跨训练与验证两侧；否则普通随机 $K$ 折仍会泄漏组内信息。

### 23.6.3 阻塞与时间序列交叉验证

时间顺序数据的目标通常是预测未来，而不是插补被训练数据包围的随机时刻。随机分折会把验证时刻之后的观测放入训练集，使趋势、状态变量或滞后特征携带未来信息。即使模型形式正确，这种信息方向错误也会使评分过于乐观。

一种直接对应预测部署的方法是向前滚动验证。设第 $k$ 个连续验证块为 $V_k=\{a_k,\ldots,b_k\}$，训练集取 $T_k=\{1,\ldots,a_k-g-1\}$，其中 $g\ge0$ 是隔离间隔。相应评分为

$$
\widehat R_{\mathrm{TS}}(A)
=\frac{\sum_{k=1}^K\sum_{t\in V_k}
L\!\left(y_t,A(D_{T_k})(x_t)\right)}
{\sum_{k=1}^K|V_k|},
\qquad T_k=\{1,\ldots,a_k-g-1\}.
\tag{23.20}
$$

每个 $A(D_{T_k})$ 都只能使用验证块起点之前且经过间隔隔离的数据。扩展窗口让 $T_k$ 随 $k$ 增长，适合利用全部历史；滑动窗口则只保留最近的固定长度历史，适合分布缓慢变化的情形。两者评价的是不同的实际训练策略，应依照部署方式选择。
隔离间隔 $g$ 用来切断目标与特征在边界上的重叠。若标签由未来 $h$ 期收益构成，训练末端样本的标签窗口可能伸入验证期，$g$ 至少要覆盖这种前看重叠；若特征由过去若干期计算，而所有变换都严格因果，前向训练本身通常已阻止未来信息进入，不能因特征含有滞后项就机械地再删除同等长度。滚动标准化、缺失值填补和特征选择也必须在每个 $T_k$ 内拟合，再作用于对应验证块。

若目标不是严格向前预测，而是在平稳依赖序列上估计算法风险，可使用连续阻塞 $K$ 折：每次保留一个连续块作验证，训练数据取其余块，并在验证块两侧删除足够的净化带。与向前滚动不同，这种方案允许使用验证块之后的训练信息，因此不模拟实时预测；它只在对称依赖且不存在因果信息方向要求时才有解释。块长应足以代表目标预测期的损失，但块数过少会使评分受少数 regime 支配。无论哪种方案，时间序列的重采样与交叉验证都不能靠打乱索引来制造独立性。

### 23.6.4 模型选择偏差与嵌套评估

交叉验证评分既可用来选择模型，也可用来评估模型，但在同一批验证损失上同时完成这两件事会产生选择偏差。候选模型越多、评分噪声越大，最小评分越容易来自一次有利的随机波动，而不是真实风险最低。

**定理 23.13（最小评分的乐观性与独立评估）**

设有限候选族为 $\mathcal M$，候选 $m$ 的交叉验证评分为 $\hat R_m$，选择规则为 $\hat m\in\arg\min_{m\in\mathcal M}\hat R_m$。则
$\mathbb E[\min_{m\in\mathcal M}\hat R_m]\le\min_{m\in\mathcal M}\mathbb E[\hat R_m]$。特别地，若每个评分都对相应风险 $R_m$ 无偏，则最小评分作为 $\min_m R_m$ 的估计具有非正偏差。另一方面，若另有与选择及训练数据独立的评估集，且给定所选预测规则后，评估损失的条件期望等于该规则的真实风险，则该评估对所选规则的风险无偏。

**证明**

固定任意候选 $m_0$。由最小值的定义，在每条样本路径上都有 $\min_{m\in\mathcal M}\hat R_m\le\hat R_{m_0}$。两边取期望得
$\mathbb E[\min_m\hat R_m]\le\mathbb E[\hat R_{m_0}]$；再对所有 $m_0$ 取最小值即得第一结论。若 $\mathbb E[\hat R_m]=R_m$，右端成为 $\min_m R_m$，故最小评分的期望不超过最优真实风险。

令 $D^{s}$ 表示选择与训练所用数据，$D^{e}$ 表示独立评估数据。给定 $D^{s}$ 后，$\hat m$ 和训练所得预测规则均为确定对象。设评估损失为 $L^{e}$，由假设有 $\mathbb E[L^{e}\mid D^{s}]=R_{\hat m}$。再由塔性质，$\mathbb E[L^{e}]=\mathbb E[R_{\hat m}]$，其中右端正是随机选择规则在独立新数据上的平均风险。

□
定理 23.13 并不声称每个被选模型都差，也不给出 $\hat R_{\hat m}-R_{\hat m}$ 在一般情形下恒为负的结论；它严格说明的是“取最小”会压低最优可实现风险的估计。要估计最终选择算法的风险，应使用嵌套交叉验证：外层折只负责评估，内层折在每个外层训练集内完成调参与模型选择，随后用该外层训练集重新拟合并在外层验证折评分。所有外层评分完成后，才可在全数据上重复同一选择流程以得到部署模型。外层评分不再参与对应模型的选择，因而避免把同一验证信息重复计入。

## 23.7 重采样方法

交叉验证通过留出部分观测来评价预测规则，Bootstrap 则通过从已观测数据或其拟合模型中重复抽样来近似统计量的抽样分布。它既可以估计标准误与置信区间，也可以研究偏差和复杂选择算法的不稳定性。关键不是把重抽样样本当作新增独立数据，而是把“从真实总体抽样”替换为“从一个已估计的总体抽样”，并研究这种替代在样本量增大时是否一致。

### 23.7.1 非参数与参数 Bootstrap 原理

设 $X_1,\ldots,X_n$ 来自分布 $F$，目标参数写为 $\theta=t(F)$，估计量为 $\hat\theta_n=t(\hat F_n)$，其中 $\hat F_n=n^{-1}\sum_{i=1}^n\delta_{X_i}$ 是经验分布。非参数 Bootstrap 在给定原始样本后，从 $\hat F_n$ 中有放回独立抽取 $X_{n,1}^*,\ldots,X_{n,n}^*$，再以完全相同的估计流程计算 $\hat\theta_n^*=t(\hat F_n^*)$。每个原始观测在一次抽取中的概率均为 $1/n$，所以同一观测可出现多次，也可完全不出现。

这一构造的理论核心是抽样泛函的替换：真实世界中的随机性来自 $F\mapsto\hat F_n\mapsto\hat\theta_n$，Bootstrap 世界中的条件随机性来自 $\hat F_n\mapsto\hat F_n^*\mapsto\hat\theta_n^*$。于是用给定原始数据时 $\sqrt n(\hat\theta_n^*-\hat\theta_n)$ 的条件分布，近似 $\sqrt n(\hat\theta_n-\theta)$ 的无条件分布。中心必须分别是 $\hat\theta_n$ 与 $\theta$，不能随意把重抽样估计直接围绕零或围绕真实参数排列。

实际计算时重复 $B$ 次，得到 $\hat\theta_{n,1}^*,\ldots,\hat\theta_{n,B}^*$。其经验分布只承担蒙特卡洛近似：当 $B$ 增大时，它逼近给定原始样本下的 Bootstrap 分布，通常以 $B^{-1/2}$ 的速度减小模拟误差；它不能修复 $\hat F_n$ 与 $F$ 的误差，也不能增加原始样本的信息量。
参数 Bootstrap 把经验分布替换为拟合的参数模型。若假定 $F=F_{\eta_0}$，先由原始数据得到 $\hat\eta_n$，再从 $F_{\hat\eta_n}$ 独立生成同样大小的样本，并重新计算 $\hat\eta_n^*$ 及目标统计量 $\hat\theta_n^*$。此时用 $\hat\theta_n^*$ 围绕 $\hat\theta_n$ 的条件分布近似 $\hat\theta_n$ 围绕 $\theta$ 的抽样分布。回归中若把协变量视为固定设计，通常保留协变量并从拟合的条件误差分布生成新响应；若研究的是协变量与响应的联合抽样，则参数模型也必须说明协变量如何生成。两种模拟对应不同总体，不能混用。

参数方法的一致性思想是：若 $\hat\eta_n$ 收敛到 $\eta_0$，且样本统计量的分布作为 $\eta$ 的函数在 $\eta_0$ 附近适当连续，则以 $\hat\eta_n$ 替代 $\eta_0$ 所造成的分布误差会消失。非参数方法则依赖 $\hat F_n$ 在适合统计量的拓扑下逼近 $F$，并要求 $t$ 或标准化后的分布泛函足够平滑。模型错设时，参数 Bootstrap 可以很精确地模拟一个错误总体；非参数 Bootstrap 虽不要求有限维模型正确，也并非对任何统计量都有效。极端次序统计量、参数位于边界、分布支撑随参数变化以及强依赖数据，都可能破坏普通有放回抽样的近似。

**定理 23.14（均值统计量的非参数 Bootstrap 一致性）**

设 $X_1,\ldots,X_n$ 独立同分布，$Z_i=h(X_i)$ 满足 $\mathbb E[Z_i^2]<\infty$，并记 $\mu=\mathbb E[Z_i]$、$\sigma^2=\operatorname{Var}(Z_i)>0$。令 $\bar Z_n=n^{-1}\sum_{i=1}^nZ_i$，非参数 Bootstrap 重抽样产生 $Z_{n,1}^*,\ldots,Z_{n,n}^*$ 及 $\bar Z_n^*$。则给定原始样本时，$\sqrt n(\bar Z_n^*-\bar Z_n)$ 的条件分布在概率意义下弱收敛到 $N(0,\sigma^2)$；换言之，其条件分布函数与 $N(0,\sigma^2)$ 分布函数之间的上确界距离依概率趋于 $0$。同时，Bootstrap 条件方差满足 $n\operatorname{Var}^*(\bar Z_n^*)\to\sigma^2$，收敛依概率成立。

**证明**

在原始样本上定义 $U_{ni}=Z_i-\bar Z_n$。给定 $X_1,\ldots,X_n$ 后，每次 Bootstrap 抽取等概率地选取一个 $U_{ni}$，故其条件均值为 $0$，而 $\sqrt n(\bar Z_n^*-\bar Z_n)$ 可写成 $n^{-1/2}\sum_{j=1}^nU_{n,I_j}$，其中 $I_j$ 独立且均匀取值于 $\{1,\ldots,n\}$。条件方差因而为 $\hat\sigma_n^2=n^{-1}\sum_{i=1}^nU_{ni}^2$。
由强大数定律，$n^{-1}\sum_{i=1}^nZ_i^2\to\mathbb E[Z_1^2]$ 且 $\bar Z_n\to\mu$ 几乎必然成立，故
$\hat\sigma_n^2=n^{-1}\sum_{i=1}^nZ_i^2-\bar Z_n^2\to\sigma^2$ 几乎必然成立。这已经给出最后一个结论。

为验证三角阵列的条件 Lindeberg 条件，先写 $V_i=Z_i-\mu$。对任意 $\delta>0$，并集界与尾积分不等式给出
$\mathbb P(\max_{i\le n}|V_i|>\delta\sqrt n)\le n\mathbb P(|V_1|>\delta\sqrt n)\le\delta^{-2}\mathbb E[V_1^2\mathbf1\{|V_1|>\delta\sqrt n\}]\to0$，因为 $\mathbb E[V_1^2]<\infty$。又有 $n^{-1/2}|\bar Z_n-\mu|\to0$ 依概率成立，而 $U_{ni}=V_i-(\bar Z_n-\mu)$，所以 $M_n=n^{-1/2}\max_{i\le n}|U_{ni}|\to0$ 依概率成立。

对任意 $\varepsilon>0$，条件 Lindeberg 比值为
$\hat\sigma_n^{-2}n^{-1}\sum_{i=1}^nU_{ni}^2\mathbf1\{|U_{ni}|>\varepsilon\sqrt n\hat\sigma_n\}$。当 $M_n<\varepsilon\hat\sigma_n$ 时，所有示性函数均为零，整个比值也为零。由于 $M_n\to0$ 且 $\hat\sigma_n\to\sigma>0$ 依概率成立，事件 $M_n<\varepsilon\hat\sigma_n$ 的概率趋于 $1$，故条件 Lindeberg 比值依概率趋于 $0$。

对任意子序列，都可再取子序列使上述收敛几乎必然成立；沿该子序列，把原始样本视为给定条件，独立同分布三角阵列的 Lindeberg 中心极限定理给出条件弱收敛到 $N(0,\sigma^2)$。由于极限分布函数连续，逐点收敛还推出分布函数上确界距离收敛。子序列判别法于是给出原命题中的依概率收敛。

□

这一定理展示了“一致性”的准确含义：随着原始样本量增大，Bootstrap 条件分布在随机性上逼近真正的渐近抽样分布，而不是对每一个固定样本都精确等于有限样本分布。对具有线性影响函数的平滑统计量，可用同样的样本均值论证主导项，再证明非线性余项在原始抽样与 Bootstrap 抽样中都可忽略；可微泛函则可进一步使用 Delta 方法。
### 23.7.2 Bootstrap 标准误

统计量 $\hat\theta_n$ 的标准误是其在重复抽样中的标准差。Bootstrap 以重抽样统计量的条件离散程度估计这一未知量。记 $B$ 个重抽样估计的均值为 $\bar\theta_B^*=B^{-1}\sum_{b=1}^B\hat\theta_{n,b}^*$，则常用估计为

$$
\widehat{\operatorname{se}}_B(\hat\theta_n)
=\left[\frac{1}{B-1}\sum_{b=1}^B
\left(\hat\theta_{n,b}^*-\bar\theta_B^*\right)^2\right]^{1/2}.
\tag{23.21}
$$

这里使用 $B-1$ 是样本方差的通常约定；当 $B$ 很大时，使用 $B$ 的差别可忽略。若给定原始样本后的二阶矩有限，由条件大数定律，$B\to\infty$ 时式（23.21）趋近理论 Bootstrap 标准误 $\operatorname{Var}^*(\hat\theta_n^*)^{1/2}$。这一步只控制模拟误差。随后还需要原始样本量 $n$ 增大时该条件标准误逼近真实标准误，才是统计意义上的一致性。

均值统计量提供了可以直接核验的基准。定理 23.14 的设定下，$\operatorname{Var}^*(\bar Z_n^*)=\hat\sigma_n^2/n$，故理论 Bootstrap 标准误正是 $\hat\sigma_n/\sqrt n$，它与真实渐近标准误 $\sigma/\sqrt n$ 的比值依概率趋于 $1$。有限 $B$ 时，式（23.21）还叠加了重抽样的蒙特卡洛波动，因此实际报告应说明 $B$、随机种子及是否出现非有限估计值。

若目标算法包含变量选择、调参或缺失值插补，每次重抽样都必须从头执行整套算法。只在原始样本已选定的模型上重估系数，估计的是“模型已知且不再选择”这一较简单统计量的离散程度，通常会低估完整流程的不确定性。类似地，时间序列若仍按单个观测有放回抽取，会破坏自相关结构，所得标准误没有原抽样机制下的解释，必须改用与依赖结构相容的重采样方案。
### 23.7.3 基本置信区间

令 $q_p^*$ 表示 $B$ 个 Bootstrap 估计 $\hat\theta_{n,b}^*$ 的经验 $p$ 分位数，目标置信水平为 $1-\alpha$。最直接的正态近似区间是 $\hat\theta_n\pm z_{1-\alpha/2}\widehat{\operatorname{se}}_B(\hat\theta_n)$，它使用标准误并假定估计量近似正态且偏度可忽略。百分位区间则直接取 $[q_{\alpha/2}^*,q_{1-\alpha/2}^*]$，其思想是把 $\hat\theta_n^*$ 的条件分布视为 $\hat\theta_n$ 抽样分布的镜像近似，不要求区间关于点估计对称。

基本 Bootstrap 区间更明确地从误差枢轴量 $T_n=\hat\theta_n-\theta$ 出发。Bootstrap 用 $T_n^*=\hat\theta_n^*-\hat\theta_n$ 的条件分布近似 $T_n$ 的分布。若 $u_p^*$ 是 $T_n^*$ 的 $p$ 分位数，则近似有 $\mathbb P(u_{\alpha/2}^*\le T_n\le u_{1-\alpha/2}^*)=1-\alpha$。把 $T_n=\hat\theta_n-\theta$ 代入并依次减去 $\hat\theta_n$、乘以 $-1$，得到 $\theta$ 落在 $[\hat\theta_n-u_{1-\alpha/2}^*,\hat\theta_n-u_{\alpha/2}^*]$ 内。又因 $u_p^*=q_p^*-\hat\theta_n$，基本区间为

$$
\operatorname{CI}_{\mathrm{basic}}
=\left[2\hat\theta_n-q_{1-\alpha/2}^*,
\;2\hat\theta_n-q_{\alpha/2}^*\right].
\tag{23.22}
$$

上下限的反射次序不能颠倒：Bootstrap 上尾较长意味着误差枢轴量的上尾也较长，为覆盖真值，点估计左侧需要保留相应更长的距离。百分位区间与基本区间都使用同一组重抽样结果，但前者取原分位数，后者关于 $\hat\theta_n$ 反射分位数；当重抽样分布围绕 $\hat\theta_n$ 对称时二者近似一致，偏斜时则可能明显不同。

式（23.22）的覆盖率可从定理 23.14 直接验证。令 $U_p^*$ 为 $\sqrt n T_n^*$ 的条件 $p$ 分位数。条件分布一致收敛且正态分位数连续，故 $U_p^*$ 依概率趋于 $\sigma z_p$。基本区间包含 $\theta$ 等价于 $U_{\alpha/2}^*\le\sqrt n(\hat\theta_n-\theta)\le U_{1-\alpha/2}^*$。原始枢轴量依分布收敛到 $N(0,\sigma^2)$，结合上述分位数收敛与 Slutsky 定理，覆盖概率趋于 $\Phi(z_{1-\alpha/2})-\Phi(z_{\alpha/2})=1-\alpha$。因此，在均值及其平滑推广的正则条件下，基本区间具有一致渐近覆盖率；若 Bootstrap 分布本身不一致，有限 $B$ 再大也不能保证这一结论。
### 23.7.4 学生化 Bootstrap 与模拟误差

基本区间校正的是未标准化误差的位置与偏斜，学生化区间还校正尺度的变化。设 $\widehat{\operatorname{se}}_n$ 是 $\hat\theta_n$ 的标准误估计，并在每次 Bootstrap 重抽样中用同一规则计算 $\widehat{\operatorname{se}}_{n,b}^*$。定义原始枢轴量 $R_n=(\hat\theta_n-\theta)/\widehat{\operatorname{se}}_n$ 及重抽样枢轴量 $R_{n,b}^*=(\hat\theta_{n,b}^*-\hat\theta_n)/\widehat{\operatorname{se}}_{n,b}^*$。若 $r_p^*$ 是后者的经验 $p$ 分位数，则把事件 $r_{\alpha/2}^*\le R_n\le r_{1-\alpha/2}^*$ 中的不等式分别乘以 $\widehat{\operatorname{se}}_n$，再解出 $\theta$，得到

$$
\operatorname{CI}_{\mathrm{stud}}
=\left[\hat\theta_n-r_{1-\alpha/2}^*\widehat{\operatorname{se}}_n,
\;\hat\theta_n-r_{\alpha/2}^*\widehat{\operatorname{se}}_n\right].
\tag{23.23}
$$

这里同样先反射高分位数，再反射低分位数。若 $R_n$ 的条件 Bootstrap 近似一致，则其覆盖概率收敛到 $1-\alpha$；若标准化还消除了渐近分布对未知方差的依赖，边缘展开中的首项尺度误差会被消去，因而在适当的平滑性和矩条件下，学生化区间通常比仅使用正态近似的区间具有更小的覆盖率误差。这不是有限样本无条件的精确覆盖保证。
学生化区间要求每次重抽样的标准误与原始估计口径一致。若没有显式公式，可在每个外层重抽样内再做一层 Bootstrap 来估计 $\widehat{\operatorname{se}}_{n,b}^*$，但总计算量约随两层重抽样次数的乘积增长。分母接近零、重抽样估计不收敛或模型选择结果退化时，不能简单删除不利样本后继续计算；应先记录失败规则，并考察失败本身是否反映统计量的非正则性。

有限 $B$ 只使理论 Bootstrap 分位数受到蒙特卡洛近似。把 $B$ 固定而令 $n$ 增大，不能消除这一层误差；把 $B$ 增大而固定一个有偏的重抽样机制，也不能修复覆盖率。尾部分位数比标准误需要更多重抽样，实际计算应通过增加 $B$ 检查区间端点的稳定性，并区分模拟波动与原始抽样不确定性。

### 23.7.5 置换检验的有限样本精确性

置换检验与 Bootstrap 的目标不同：前者在原假设下利用可交换性重建条件参考分布，后者主要近似估计量或枢轴量的抽样分布。设观测为 $Z$，有限变换群 $\mathcal G=\{g_1,\ldots,g_M\}$ 作用于样本空间，检验统计量为 $T$。原假设要求给定轨道及其不变信息后，$Z$ 在轨道上的条件分布不变，即对每个 $g\in\mathcal G$，$gZ$ 与 $Z$ 在该条件下同分布。令 $T_g=T(gZ)$，$T_{\mathrm{obs}}=T(Z)$，定义包含观测自身的置换 $p$ 值

$$
p_{\mathrm{perm}}=\frac1M\sum_{g\in\mathcal G}
\mathbf 1\{T(gZ)\ge T_{\mathrm{obs}}\}.
\tag{23.24}
$$
精确性来自轨道上的均匀秩。原假设下，给定由全部 $T_g$ 构成的多重集合后，观测位置与其余 $M-1$ 个位置可交换，所以严格大于观测值的数量 $N_>$ 和等于观测值的数量 $N_=$ 只由这个多重集合及观测秩决定。式（23.24）可写成 $(N_>+N_=)/M$。若所有统计量值互异，则 $N_=1$，而 $N_>+1$ 在 $\{1,\ldots,M\}$ 上均匀分布；因此对任意 $u\in[0,1]$，条件概率 $\mathbb P(p_{\mathrm{perm}}\le u\mid Z\in\mathcal O)$ 等于不超过 $Mu$ 的整数个数除以 $M$，至多为 $\lfloor Mu\rfloor/M\le u$。出现并列时，同一 $p$ 值对应整个并列区组，超过阈值的总概率仍不超过 $u$。对不变轨道 $\mathcal O$ 取期望即得无条件结论，故拒绝规则 $p_{\mathrm{perm}}\le\alpha$ 在有限样本下是水平 $\alpha$ 的精确检验；这里的“精确”指不依赖大样本近似，而非每次拒绝概率恰好等于 $\alpha$。

离散性造成的保守性可用随机化消除。令 $U$ 为独立于数据的 $(0,1)$ 均匀变量，定义 $\tilde p=(N_>+UN_=)/M$。无并列时，$\tilde p$ 在相邻秩区间 $[(r-1)/M,r/M]$ 上均匀分布，且各秩等概率；有并列时，它在整个并列区组对应的区间上均匀分布，而区组被选中的概率正比于区组长度。拼接这些区间便得到 $\tilde p$ 在给定轨道下服从 $(0,1)$ 均匀分布，因而 $\mathbb P(\tilde p\le u)=u$。又因 $p_{\mathrm{perm}}\ge\tilde p$，未随机化的式（23.24）确实保守。
两独立样本比较中，若原假设为两组观测共同独立同分布，则固定组容量 $n_1,n_2$ 后，共有 $M=n!/(n_1!n_2!)$ 种标签分配，均值差、秩统计量或学生化均值差均可在这些分配上重算。此时精确性针对“整个分布相同”的假设；仅假定两组均值相等而方差不同，普通均值差置换检验一般不具备有限样本水平保证。配对数据的符号翻转检验则要求配对差在原假设下关于零对称，仅假定差值均值为零并不足以推出符号可交换。这些条件必须与金融数据结构对应：横截面相关、波动聚集和重叠持有期都会缩小允许使用的置换集合，不能按独立观测任意洗牌。

全部置换不可计算时，可从 $\mathcal G$ 独立均匀抽取 $m$ 个变换，并用加一校正
$\hat p_m=\{1+\sum_{b=1}^m\mathbf1\{T(g_bZ)\ge T_{\mathrm{obs}}\}\}/(m+1)$。
原假设下，原观测与这 $m$ 个随机置换共同构成可交换序列，观测在 $m+1$ 个位置间具有均匀随机秩。与前述离散秩推导相同，$\mathbb P(\hat p_m\le u)\le u$，所以该 Monte Carlo 检验仍有有限样本水平保证。若直接用超过观测值的次数除以 $m$，则把观测本身排除在外，既可能得到零 $p$ 值，也破坏了这一秩论证。增加 $m$ 会降低随机参考分布带来的功效损失和结果波动，但式（23.24）的穷举检验与加一校正的随机检验应明确区分。
### 23.7.6 Jackknife 偏差、方差及其与 Bootstrap 的关系

Jackknife 不随机重抽样，而是系统地删除观测。对 $i=1,\ldots,n$，记删除第 $i$ 个观测后的估计为 $\hat\theta_{n,-i}$，并令 $\bar\theta_{-(\cdot)}=n^{-1}\sum_{i=1}^n\hat\theta_{n,-i}$。删一伪值为 $\tilde\theta_i=n\hat\theta_n-(n-1)\hat\theta_{n,-i}$，其平均值给出偏差校正估计

$$
\hat\theta_{\mathrm{jack}}
=n\hat\theta_n-(n-1)\bar\theta_{-(\cdot)}
=\hat\theta_n-\widehat{\operatorname{Bias}}_{\mathrm{jack}},
\qquad
\widehat{\operatorname{Bias}}_{\mathrm{jack}}
=(n-1)(\bar\theta_{-(\cdot)}-\hat\theta_n).
\tag{23.25}
$$

若 $\mathbb E[\hat\theta_n]=\theta+c_1/n+c_2/n^2+O(n^{-3})$，删除一个观测后的样本量为 $n-1$，故 $\mathbb E[\bar\theta_{-(\cdot)}]=\theta+c_1/(n-1)+c_2/(n-1)^2+O(n^{-3})$。把两式代入式（23.25），含 $c_1$ 的项分别为 $c_1$ 与 $-c_1$，完全抵消；含 $c_2$ 的项为 $c_2/n-c_2/(n-1)=-c_2/\{n(n-1)\}$。因此 $\mathbb E[\hat\theta_{\mathrm{jack}}]=\theta-c_2/\{n(n-1)\}+O(n^{-2})$，一阶偏差被消除，但不能据此声称所有有限样本偏差都已消失。
删一方差估计利用伪值的样本离散程度，定义为

$$
\widehat{\operatorname{Var}}_{\mathrm{jack}}(\hat\theta_n)
=\frac{n-1}{n}\sum_{i=1}^n
\left(\hat\theta_{n,-i}-\bar\theta_{-(\cdot)}\right)^2
=\frac1{n(n-1)}\sum_{i=1}^n
\left(\tilde\theta_i-\frac1n\sum_{j=1}^n\tilde\theta_j\right)^2.
\tag{23.26}
$$

对等号右边可作直接核验：$\tilde\theta_i-n^{-1}\sum_j\tilde\theta_j=-(n-1)(\hat\theta_{n,-i}-\bar\theta_{-(\cdot)})$，平方并求和后乘以 $1/\{n(n-1)\}$，恰为等号左边。对样本均值 $\hat\theta_n=\bar X_n$，有 $\hat\theta_{n,-i}=(n\bar X_n-X_i)/(n-1)$ 且 $\bar\theta_{-(\cdot)}=\bar X_n$，所以每次偏差为 $(\bar X_n-X_i)/(n-1)$。代回式（23.26）得到 $[n(n-1)]^{-1}\sum_i(X_i-\bar X_n)^2=s_n^2/n$，正是均值的通常方差估计，这解释了系数 $(n-1)/n$ 而非 $1/n$ 的来源。

更一般地，若统计量有一次影响函数展开 $\hat\theta_n-\theta=n^{-1}\sum_i\psi(X_i)+R_n$，其中 $\mathbb E[\psi(X_i)]=0$、$\operatorname{Var}(\psi(X_i))=\sigma_\psi^2$，并且删除一个观测只改变线性主项与可控制余项，则 $\hat\theta_{n,-i}-\hat\theta_n$ 的主导项为 $-\psi(X_i)/(n-1)$。删一估计彼此作差时余项中的共同部分抵消，式（23.26）的主导项成为 $[n(n-1)]^{-1}\sum_i\{\psi(X_i)-\bar\psi_n\}^2$，由大数定律可知其乘以 $n$ 后依概率趋于 $\sigma_\psi^2$。严格结论需要余项满足 $n\mathbb E[R_n^2]\to0$ 及相应删一余项一致可忽略；这些条件排除了强不连续统计量。
Jackknife 与 Bootstrap 都可从经验分布的扰动来理解。非参数 Bootstrap 抽取 $n$ 次后，观测 $i$ 的出现次数为 $W_i$，其中 $(W_1,\ldots,W_n)$ 服从参数为 $n$ 与 $(1/n,\ldots,1/n)$ 的多项分布；重加权经验分布为 $F_n^*=n^{-1}\sum_iW_i\delta_{X_i}$。其均值权重为 $1/n$，协方差为 $\operatorname{Cov}^*(W_i,W_j)=n^{-1}(\mathbf1\{i=j\}-1/n)$。Jackknife 则确定性地使用删一权重：被删观测权重为零，其余权重为 $(n-1)^{-1}$，再把 $n$ 次局部扰动合成为方差估计。若 $\theta(F)$ 在 $F_n$ 附近可线性化，则 $\theta(F_n^*)-\theta(F_n)$ 的条件主导项是 $n^{-1}\sum_i(W_i-1)\psi(X_i)$。由上述权重协方差，其条件方差主导项为 $n^{-2}\sum_i\{\psi(X_i)-\bar\psi_n\}^2$，与 Jackknife 的一阶方差一致。二者因此在平滑统计量上渐近相近，但并非有限样本等价，Bootstrap 还能给出整个条件分布及非对称区间，删一 Jackknife 主要给出偏差与方差的局部近似。

对次序统计量等高度非线性泛函，删一扰动可能过小而无法反映真实抽样变化，普通 Jackknife 方差可以失效；可改用删除 $d$ 个观测的 Jackknife，并要求 $d$ 与 $n$ 以适当速度增长。Bootstrap 也非普遍有效，极值、边界参数与依赖数据仍需专门方法。若估计过程包含因子筛选、调参或插补，两种方法都必须在每个删一样本或重抽样样本上重跑全过程，否则条件化于已选模型所得的不确定性会系统性偏小。
多项分布矩的逐项核对为 $\operatorname{Var}^*(W_i)=1-1/n$，而当 $i\ne j$ 时 $\operatorname{Cov}^*(W_i,W_j)=-1/n$。因此上段权重协方差的正确表达式应为 $\operatorname{Cov}^*(W_i,W_j)=\mathbf1\{i=j\}-1/n$；把它代入线性主项，交叉项与平方项合并后恰给出前述 $n^{-2}\sum_i\{\psi(X_i)-\bar\psi_n\}^2$。
## 23.8 统计学习视角与量化应用

统计学习把估计、模型选择与交易决策统一到风险最小化框架中。正则化不再只是改善数值稳定性的技巧，而是限制可从数据中实现的函数集合；交叉验证与重采样则用于估计整个学习算法在未参与训练的数据上的风险。量化应用还必须处理时间依赖、交易成本与反复试验，因而独立同分布结论是理解问题的起点，而不是可直接套用的回测保证。

### 23.8.1 经验风险最小化与假设空间约束

**定义 23.15（经验风险与正则化假设空间）**

设训练样本 $Z_1,\ldots,Z_n$ 的分布为 $P$，候选函数组成 $\mathcal H$，损失 $\ell(h;Z)$ 衡量函数 $h$ 在观测 $Z$ 上的误差。经验风险、总体风险以及相应的无正则化和有正则化解定义为

$$
\begin{aligned}
\widehat R_n(h)&=\frac1n\sum_{i=1}^n\ell(h;Z_i),
& R(h)&=\mathbb E[\ell(h;Z)],\\
\hat h_n&\in\operatorname*{arg\,min}_{h\in\mathcal H}\widehat R_n(h),
&\hat h_{n,\lambda}&\in\operatorname*{arg\,min}_{h\in\mathcal H}
\{\widehat R_n(h)+\lambda J(h)\}.
\end{aligned}
\tag{23.27}
$$

其中 $J(h)\ge0$ 是复杂度泛函，$\lambda\ge0$ 控制拟合与复杂度之间的交换。对给定的 $r>0$，还可定义受约束的假设空间 $\mathcal H_r=\{h\in\mathcal H:J(h)\le r\}$。平方损失对应回归，负对数似然对应概率模型，分位数损失对应尾部预测；在金融收益预测中，损失还应包含交易成本或风险厌恶项，避免把统计拟合优度等同于可交易收益。
**定理 23.16（惩罚问题与约束问题的对应）**

设 $\hat h_{n,\lambda}$ 是式（23.27）中某一 $\lambda>0$ 的惩罚问题解，并令 $r_\lambda=J(\hat h_{n,\lambda})$，则它也是 $\mathcal H_{r_\lambda}$ 上的经验风险最小化解。反之，设 $\mathcal H$ 为闭凸集，$\widehat R_n$ 与 $J$ 为有限凸函数，约束问题在 $\mathcal H_r$ 上存在解 $\hat h_r$，且存在 $h\in\mathcal H$ 使 $J(h)<r$。则存在 $\lambda\ge0$，使 $\hat h_r$ 也是惩罚参数为 $\lambda$ 的问题的解；当 $\lambda>0$ 时还有 $J(\hat h_r)=r$。

**证明**

先取任意 $h\in\mathcal H_{r_\lambda}$。惩罚最优性给出 $\widehat R_n(\hat h_{n,\lambda})+\lambda r_\lambda\le\widehat R_n(h)+\lambda J(h)$。由于 $J(h)\le r_\lambda$ 且 $\lambda>0$，右端不超过 $\widehat R_n(h)+\lambda r_\lambda$，消去相同项便得 $\widehat R_n(\hat h_{n,\lambda})\le\widehat R_n(h)$，故第一部分成立。

反向部分中，Slater 条件与凸性使约束问题的 KKT 条件成立：存在 $\lambda\ge0$，使 $0$ 属于 $\widehat R_n(h)+\lambda J(h)$ 在 $\hat h_r$ 处的次微分，并且 $\lambda\{J(\hat h_r)-r\}=0$。凸函数在该点的次微分包含零等价于该点是函数的全局最小值点，所以 $\hat h_r$ 最小化 $\widehat R_n(h)+\lambda J(h)$，正是惩罚问题。互补松弛条件还说明，若 $\lambda>0$，必有 $J(\hat h_r)=r$。

□

因此，范数惩罚、系数路径约束与假设空间容量控制具有同一风险约束解释。不过 $\lambda$ 与 $r$ 不必在非凸或存在平坦最优解时严格一一对应；若 $\lambda$ 由同一训练样本反复选择，最终算法也比固定 $\mathcal H_r$ 更复杂，泛化分析必须把选择步骤计入。
### 23.8.2 VC 维、Rademacher 复杂度与泛化界

**定义 23.17（VC 维与 Rademacher 复杂度）**

设 $\mathcal H$ 是取值于 $\{0,1\}$ 的函数类。若集合 $\{x_1,\ldots,x_m\}$ 上出现的所有二值标记组合都能由某个 $h\in\mathcal H$ 实现，即限制函数类 $\{(h(x_1),\ldots,h(x_m)):h\in\mathcal H\}$ 含有全部 $2^m$ 个向量，则称 $\mathcal H$ 打散该集合。VC 维 $d_{\mathrm{VC}}(\mathcal H)$ 是能被打散集合的最大容量；若容量没有有限上界，则 VC 维为无穷。增长函数 $\Pi_{\mathcal H}(m)$ 是任意 $m$ 个点上可实现标记组合数的最大值，它把组合复杂度接入有限样本界。

对实值函数类 $\mathcal G$、固定样本 $z_{1:n}=(z_1,\ldots,z_n)$ 以及独立且等概率取值于 $\{-1,1\}$ 的 Rademacher 变量 $\varepsilon_1,\ldots,\varepsilon_n$，经验与总体 Rademacher 复杂度定义为

$$
\widehat{\mathfrak R}_{z_{1:n}}(\mathcal G)
=\mathbb E_\varepsilon\!\left[\sup_{g\in\mathcal G}
\frac1n\sum_{i=1}^n\varepsilon_i g(z_i)\right],
\qquad
\mathfrak R_n(\mathcal G)
=\mathbb E\!\left[\widehat{\mathfrak R}_{Z_{1:n}}(\mathcal G)\right].
\tag{23.28}
$$

随机符号抵消了函数类对固定噪声方向的拟合，而上确界保留其对任意符号模式的最大响应，因此该量度量的是函数类拟合随机噪声的能力。它依赖样本分布与函数类；对损失类 $\mathcal G=\{z\mapsto\ell(h;z):h\in\mathcal H\}$ 计算复杂度，才能把界直接用于风险。使用绝对值包住求和的另一种定义只改变相应常数，不应与这里的约定混用。
**定理 23.18（VC 增长函数泛化界）**

设样本独立同分布，$\mathcal H$ 是 VC 维为 $d$ 的二值分类函数类，$1\le d\le2n$，损失取 $0$ 或 $1$。对任意 $\delta\in(0,1)$，以至少 $1-\delta$ 的概率同时有

$$
\sup_{h\in\mathcal H}\left|R(h)-\widehat R_n(h)\right|
\le\sqrt{\frac8n\left[\log\Pi_{\mathcal H}(2n)+\log\frac4\delta\right]}
\le\sqrt{\frac8n\left[d\log\frac{2en}{d}+\log\frac4\delta\right]}.
\tag{23.29}
$$

这里第一个不等式采用 symmetrization 与增长函数界所得的标准常数，第二个不等式代入 Sauer 引理 $\Pi_{\mathcal H}(2n)\le(2en/d)^d$。该陈述直接控制整个函数类上的最坏偏差，因而也控制从同一函数类中由数据选出的经验风险最小化解；仅对单个固定分类器应用 Hoeffding 不等式不能得到这一致结论。当 $d$ 随候选特征数或模型自由度增长时，界会按相应组合复杂度变松，正则化约束若能降低有效 VC 维，便转化为可量化的泛化改善。

**定理 23.19（Rademacher 泛化界）**

设样本独立同分布，损失类 $\mathcal G=\{z\mapsto\ell(h;z):h\in\mathcal H\}$ 中所有函数取值于 $[0,1]$。对任意 $\delta\in(0,1)$，以至少 $1-\delta$ 的概率，对所有 $h\in\mathcal H$ 同时有

$$
R(h)-\widehat R_n(h)
\le2\mathfrak R_n(\mathcal G)
+\sqrt{\frac{\log(1/\delta)}{2n}}.
\tag{23.30}
$$
式（23.30）右端的总体复杂度可用经验复杂度估计。采用常见集中不等式常数时，以至少 $1-\delta$ 的概率可将右端替换为 $2\widehat{\mathfrak R}_{Z_{1:n}}(\mathcal G)+3\sqrt{\log(2/\delta)/(2n)}$；增加的项同时控制复杂度估计与风险偏差。对经验风险最小化解 $\hat h_n$，先在期望中取上确界，得到 $\mathbb E[R(\hat h_n)-\widehat R_n(\hat h_n)]\le2\mathfrak R_n(\mathcal G)$。再由经验最优性，对任意固定的 $h_0\in\mathcal H$ 有 $\widehat R_n(\hat h_n)\le\widehat R_n(h_0)$，两边取期望并对 $h_0$ 取下确界，即得 $\mathbb E[R(\hat h_n)]\le\inf_{h\in\mathcal H}R(h)+2\mathfrak R_n(\mathcal G)$。这把“拟合噪声的能力”直接转化为超额风险。

若损失对预测值是 $L$-Lipschitz 的，压缩不等式还可用预测函数类的复杂度控制损失类复杂度；但若收益或平方损失无界，就不能直接套用 $[0,1]$ 损失结论，而需截断、包络条件或适合的矩假设。对 $\mathcal H_r$ 而言，减小微小 $r$ 会缩小上确界所取的函数集合，但也会增大最佳逼近风险，所以泛化界小并不等于最终预测误差必然小。

### 23.8.3 因子筛选与信号交叉验证

因子筛选是在候选库上进行经验风险最小化。若先以全样本相关率或收益 $t$ 统计量筛出因子，再在同一样本上评价所选信号，筛选步骤已经利用验证信息；即使每个固定因子的检验都单独有效，最大统计量的分布也不同于单次检验。对 $M$ 个预先登记的候选，Bonferroni 方法把每个检验水平设为 $\alpha/M$，由并集界可将族错误率控制在 $\alpha$，且不要求候选间独立；其代价是功效下降。Bootstrap 稳定性选择可以记录因子在不同重抽样中的入选频率，但若重抽样后不重新执行筛选，仍无法估计选择不确定性。
信号交叉验证的对象应是完整算法 $\mathcal A_\lambda$，而不是预先选定的固定因子。把验证折记为 $\mathcal V_k$，相应训练集记为 $\mathcal T_k$，并令 $\mathcal A_{\lambda,k}$ 表示只用 $\mathcal T_k$ 完成缺失值处理、标准化、因子筛选、模型拟合和阈值选择后得到的预测规则。交叉验证风险及参数选择为

$$
\widehat R_{\mathrm{CV}}(\lambda)
=\frac1{\sum_{k=1}^K|\mathcal V_k|}
\sum_{k=1}^K\sum_{i\in\mathcal V_k}
\ell(\mathcal A_{\lambda,k};Z_i),
\qquad
\hat\lambda\in\operatorname*{arg\,min}_{\lambda\in\Lambda}
\widehat R_{\mathrm{CV}}(\lambda).
\tag{23.31}
$$

每个 $\lambda$ 都必须重新执行全部折内步骤，否则不同参数共享了全样本筛选结果。由于 $\mathcal A_{\lambda,k}$ 对不同的 $k$ 使用不同训练集，式（23.31）估计的是这种折内训练算法的平均风险，并不自动等于用全部 $n$ 个观测训练后的风险；训练量差异通常带来一定偏差。再用同一组验证分数同时报告 $\hat\lambda$ 的泛化误差也会偏乐观，故需外层交叉验证或独立测试集评估“调参加拟合”的完整流程。

独立同分布数据可采用随机 $K$ 折，但金融时间序列应让训练集早于验证集，并采用滚动或扩展窗口。若标签是未来 $h$ 期收益，训练样本的持有区间与验证区间重叠时会泄露信息，应在边界清除重叠训练标签并设置适当的隔离期。截面标准化和股票池成分也必须逐期使用当时可得数据。各折分数因重叠样本与市场状态而相关，不能把折数当作独立样本量来计算普通均值标准误。
### 23.8.4 权重收缩与有效复杂度

经验风险最小化若只约束拟合误差，候选权重可以在噪声方向上任意放大。权重收缩把估计限制在有效复杂度较低的函数类中。对 $\mathcal H_r=\{\boldsymbol x\mapsto\boldsymbol w^\top\boldsymbol x:\|\boldsymbol w\|_2\le r\}$，半径 $r$ 是权重二范数的上界；减小 $r$ 才会缩小函数类，并与较大的岭惩罚相对应。下面的界把这一几何约束直接接入定理 23.19。

**定理 23.20（线性权重类的经验 Rademacher 界）**

设样本输入满足 $\|\boldsymbol x_i\|_2\le X$，并令 $\mathcal H_r$ 为二范数不超过 $r$ 的线性预测函数类，则

$$
\widehat{\mathfrak R}_{x_{1:n}}(\mathcal H_r)
\le\frac{r}{n}\left(\sum_{i=1}^n\|\boldsymbol x_i\|_2^2\right)^{1/2}
\le\frac{rX}{\sqrt n}.
\tag{23.32}
$$

**证明**

对固定的 $\boldsymbol x_{1:n}$，由 Cauchy--Schwarz 不等式以及约束球上的上确界公式，有 $\sup_{\|\boldsymbol w\|_2\le r}\boldsymbol w^\top\boldsymbol a=r\|\boldsymbol a\|_2$。代入经验 Rademacher 复杂度，再用 Jensen 不等式，得到 $\widehat{\mathfrak R}_{x_{1:n}}(\mathcal H_r)\le(r/n)\{\mathbb E_\varepsilon\|\sum_{i=1}^n\varepsilon_i\boldsymbol x_i\|_2^2\}^{1/2}$。由于 $\varepsilon_i$ 独立、均值为零且方差为一，展开平方后所有交叉项消失，剩下 $\mathbb E_\varepsilon\|\sum_{i=1}^n\varepsilon_i\boldsymbol x_i\|_2^2=\sum_{i=1}^n\|\boldsymbol x_i\|_2^2$。最后代入 $\|\boldsymbol x_i\|_2\le X$，即得式（23.32）。

□

若损失对预测值是 $L$-Lipschitz 的，压缩不等式给出损失类复杂度不超过 $LrX/\sqrt n$；在定理 23.19 的有界损失条件下，这直接转化为一致泛化界。约束虽降低估计方差，却可能排除低风险预测函数，因此仍须把逼近误差与估计误差一起考察。
以先验权重 $\boldsymbol w_0$ 为中心的岭估计可写成 $\hat{\boldsymbol w}_\lambda=\operatorname*{arg\,min}_{\boldsymbol w}\{n^{-1}\|\boldsymbol y-\boldsymbol X\boldsymbol w\|_2^2+\lambda\|\boldsymbol w-\boldsymbol w_0\|_2^2\}$，其闭式解为 $(\boldsymbol X^\top\boldsymbol X+n\lambda\boldsymbol I)^{-1}(\boldsymbol X^\top\boldsymbol y+n\lambda\boldsymbol w_0)$。当 $\boldsymbol w_0=\boldsymbol 0$ 时就是通常的岭回归；在资产配置中，$\boldsymbol w_0$ 可取等权或风险预算基准。若要求权重和为一或存在做空约束，必须在原约束集上求解，不能把无约束闭式解直接当作组合权重。无论采用何种约束，标准化、基准权重构造和 $\lambda$ 选择都只能使用训练信息。

增大 $\lambda$ 会使无约束估计趋近 $\boldsymbol w_0$，从而降低由样本噪声引起的权重波动；但若真实信号远离基准，也会增大收缩偏差。样本外评价因而应比较完整的“估计加选择”规则，而非比较同一批数据上不同 $\lambda$ 的训练误差。

**例 23.5**

用三个观测 $(x_i,y_i)=(1,1),(0,0),(-1,0)$ 拟合无截距模型 $y=wx+\varepsilon$，目标函数为 $\sum_{i=1}^3(y_i-wx_i)^2+\lambda w^2$。候选参数为 $\lambda\in\{0,1,2\}$。另有两个验证观测 $(1,0.4)$ 与 $(-1,-0.2)$，说明如何以验证误差选择收缩强度。

**解**

训练目标的一阶条件为 $-2\sum_i x_i(y_i-wx_i)+2\lambda w=0$，故 $\hat w_\lambda=\sum_i x_iy_i/(\sum_i x_i^2+\lambda)=1/(2+\lambda)$。三个候选权重依次为 $1/2$、$1/3$ 与 $1/4$。验证平方误差分别为 $(0.5-0.4)^2+(-0.5+0.2)^2=0.10$，$(1/3-0.4)^2+(-1/3+0.2)^2\approx0.0222$，以及 $(0.25-0.4)^2+(-0.25+0.2)^2=0.025$。因此验证规则选择 $\lambda=1$。若还存在独立测试窗，应先用测试之前的全部可用数据按同一规则重估权重，再只评估一次；不能根据测试结果回头改选 $\lambda$。
### 23.8.5 样本外协议与可复现评估

样本外协议的基本单位是带时间戳的完整决策算法。对每个预测时点 $t$，只允许使用当时已发布且可获得的 $\mathcal F_{t-1}$ 信息，预测未来收益并承担交易成本。一个可复现协议应依次落实以下环节。

1. **冻结目标与候选集合。** 在查看测试数据前写明损失函数、持有期、再平衡频率、候选因子、超参数网格和交易约束；以净收益为对象时，手续费、滑点与换手惩罚必须进入同一评价口径。
2. **划分训练、验证与测试。** 用内层滚动或扩展窗口选择因子数目和收缩参数，用其后的外层测试窗评估选择后的完整算法。滚动窗口保留最近固定长度样本，扩展窗口保留全部历史；二者都不得让验证或测试观测进入折内训练。
3. **隔离标签并重建信息状态。** 若标签使用未来 $h$ 期收益，则删除持有区间触及验证期的训练样本，并在需要时设置隔离期。缺失值处理、截面标准化、股票池、波动率估计和因子筛选均逐折重做，且使用逐时点数据而非修订后的全样本数据库。
4. **按时间顺序汇总外层预测。** 保存每个外层测试时点唯一的事前预测，以这些预测计算平均损失、净收益、换手和风险指标。不同窗口的训练量必须记录清楚，不能把滚动窗口与扩展窗口的分数不加说明地混成同一风险估计。
5. **保留依赖并控制重复试验。** 外层损失序列常因重叠标签和市场状态而自相关，区间估计应采用与持有期相匹配的 moving block bootstrap，而非把各期当作独立观测。若反复比较多种策略，还要保存试验总数并采用多重检验或嵌套评估，防止最终测试窗沦为新的验证集。

最终测试只反映既定算法在指定时期的表现，并不保证制度变化后仍然有效。上线后的漂移监测可以触发预先规定的再训练，但再训练后的算法是一个新算法，必须建立新的样本外记录；不能继续沿用旧测试结果作为其无条件证据。
**例 23.6**

研究库有 $M=200$ 个候选因子，目标是在月频再平衡下构造未来一个月收益的预测组合。要求族错误率不超过 $0.05$，并比较“全样本先筛选再交叉验证”与“折内筛选的嵌套样本外协议”。

**解**

Bonferroni 单因子检验水平为 $0.05/200=0.00025$，因为所有候选均不有效时，至少出现一个错误入选的概率不超过各检验错误概率之和，相关性不会破坏该上界。嵌套协议在每个外层起点只用当时训练窗完成缺失值处理和标准化，再在内层滚动折中重复因子筛选、岭权重拟合及参数选择；随后以选定规则重估训练窗模型，并在紧随其后的外层测试窗生成预测。所有外层预测按时间拼接后扣除交易成本，才得到该完整算法的样本外表现。

相反，全样本筛选已经把外层测试期的收益信息传入选入因子集合，后续交叉验证无法消除这种泄露。重抽样中的入选频率可用来描述筛选稳定性，但不能替代外层测试；若根据外层结果修改候选库或检验阈值，则必须保留新的未触碰时期重新评价。
## 本章小结

本章以偏差与方差的权衡贯穿正则化、重采样和样本外评价。岭回归通过二范数惩罚稳定病态设计矩阵并给出闭式估计，Lasso 通过一范数约束同时进行收缩与变量选择；AIC 与 BIC 则从不同目标出发权衡拟合优度和模型复杂度。它们都不是脱离数据生成机制的机械规则，惩罚参数、信息准则和约束集合必须结合估计目标理解。

Jackknife 以留一重估近似偏差与方差，Bootstrap 通过经验分布或适当的残差机制逼近抽样分布，置换检验利用交换性构造条件参考分布，交叉验证则用重复训练与验证估计预测风险。面对时间序列，独立同分布假设下的标准程序不能原样搬用：重叠标签、波动聚集和截面相关要求清除泄露、设置隔离并采用保留依赖的重抽样。

学习理论进一步说明，训练误差小并不自动意味着泛化良好。VC 维与增长函数描述二值函数类的组合容量，Rademacher 复杂度度量拟合随机符号的能力，二者都把经验风险与总体风险之间的差距转化为可分析的复杂度项。线性权重半径的界表明，收缩能够降低有效复杂度，却也提醒我们同时承担逼近误差。

因此，因子筛选、权重估计和参数调优必须作为一个完整算法接受样本外检验。滚动或扩展窗口、折内预处理、嵌套选择、逐时点股票池和成本核算共同构成可复现协议；独立测试期只能评价既定规则，不能在反复修改后继续被视为独立证据。正则化控制“能拟合多少”，重采样刻画“结论有多不稳定”，严格的样本外设计则检验这些结论能否转化为真实的量化决策。
## 习题

1. **完整推导偏差—方差分解。** 设训练样本 $S$ 与测试观测 $(X_0,Y_0)$ 独立，$Y_0=f(X_0)+\varepsilon_0$，其中 $\mathbb E[\varepsilon_0\mid X_0]=0$，$\operatorname{Var}(\varepsilon_0\mid X_0)=\sigma^2(X_0)$。算法由 $S$ 给出预测函数 $\hat f_S$。完整推导均方预测误差关于噪声方差、平方偏差与估计方差的分解，逐步说明各交叉项为何消失，并指出若 $\hat f_S$ 使用了测试观测，哪一步会失效。

2. **完整推导岭回归闭式解。** 对目标函数 $J(\boldsymbol\beta)=\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2+\lambda\|\boldsymbol\beta\|_2^2$，其中 $\lambda>0$，从梯度与 Hessian 出发推导 $\hat{\boldsymbol\beta}_\lambda=(\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I)^{-1}\boldsymbol X^\top\boldsymbol y$，证明解唯一。再利用奇异值分解说明各正交方向如何被收缩，并讨论 $\lambda=0$ 时需要什么秩条件。

3. 设 $\boldsymbol X$ 固定，$\boldsymbol y=\boldsymbol X\boldsymbol\beta+\boldsymbol\varepsilon$，且 $\mathbb E[\boldsymbol\varepsilon]=\boldsymbol 0$、$\operatorname{Cov}(\boldsymbol\varepsilon)=\sigma^2\boldsymbol I$。推导岭估计关于 $\boldsymbol\beta$ 的偏差矩阵与协方差矩阵，并给出预测向量 $\boldsymbol X\hat{\boldsymbol\beta}_\lambda$ 的有效自由度。说明为什么训练自由度减少并不保证测试误差下降。
4. **完整推导正交设计下的 Lasso 解。** 设 $\boldsymbol X^\top\boldsymbol X=\boldsymbol I$，目标函数为 $\tfrac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2+\lambda\|\boldsymbol\beta\|_1$。逐坐标使用次微分条件，推导 $\hat\beta_j=\operatorname{sign}(z_j)\max\{|z_j|-\lambda,0\}$，其中 $\boldsymbol z=\boldsymbol X^\top\boldsymbol y$，并解释它与岭回归逐坐标收缩方式的差异。

5. 写出一般设计矩阵下 Lasso 的 KKT 条件，分别刻画零系数与非零系数所满足的内积约束。证明即使系数解不唯一，拟合向量 $\boldsymbol X\hat{\boldsymbol\beta}$ 仍唯一；再构造一个列共线的设计矩阵，说明系数表示可以不同。讨论这一区别对因子解释的影响。

6. 在高斯线性模型中假定 $\sigma^2$ 已知，$k$ 为待估均值参数的个数。完整推导除去共同常数后的 $\mathrm{AIC}=n\log(\mathrm{RSS}/n)+2k$ 与 $\mathrm{BIC}=n\log(\mathrm{RSS}/n)+k\log n$。取 $n=200$、$\sigma^2=1$，模型甲有 $k=5$、$\mathrm{RSS}=100$，模型乙有 $k=8$、$\mathrm{RSS}=94$；分别按两种准则选择模型，并解释结果为何可以不同。
7. **完整推导 BIC 的 Laplace 来源。** 在参数维度 $d$ 固定、模型可识别、最大似然估计为内点且 Hessian 满足通常正则条件下，从参数先验与似然乘积的 Laplace 近似出发，推导 $\log p(\boldsymbol y)= \log p(\boldsymbol y\mid\hat{\boldsymbol\theta})+O_p(1)-\tfrac d2\log n$ 中各项的阶，并说明为何据此形成 $-2\log p(\boldsymbol y\mid\hat{\boldsymbol\theta})+d\log n$。指出候选维度随 $n$ 增长时该推导不能直接使用的原因。

8. 设估计量满足 $\mathbb E[\hat\theta_n]=\theta+a/n+b/n^2+O(n^{-3})$，留一估计的平均值记为 $\bar\theta_{(-\cdot)}=n^{-1}\sum_{i=1}^n\hat\theta_{n-1}^{(-i)}$。证明 Jackknife 偏差校正估计 $n\hat\theta_n-(n-1)\bar\theta_{(-\cdot)}$ 消去一阶偏差，并推导其期望偏差的主项阶数。说明该展开条件失效时可能出现的问题。

9. **完整推导样本均值的 Jackknife 方差。** 对 $\hat\theta=\bar X_n$，先写出 $\bar X_{(-i)}=(n\bar X_n-X_i)/(n-1)$，再代入 $\widehat{\operatorname{Var}}_{\mathrm{JK}}=\tfrac{n-1}{n}\sum_{i=1}^n(\bar X_{(-i)}-\bar X_{(-\cdot)})^2$，证明它等于 $s_n^2/n$，其中 $s_n^2=(n-1)^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2$。解释为何同样的代数不能直接替代相关时间序列的方差估计。
10. **完整推导 Bootstrap 方差。** 给定观测 $X_{1:n}$，Bootstrap 样本从经验分布中独立抽取。对 $\bar X_n^*=n^{-1}\sum_{i=1}^nX_i^*$，完整推导条件均值 $\mathbb E_*[\bar X_n^*]=\bar X_n$ 与条件方差 $\operatorname{Var}_*(\bar X_n^*)=\hat\sigma_n^2/n$，其中 $\hat\sigma_n^2=n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2$。再说明它与 $s_n^2/n$ 的尺度关系，以及有限次 Monte Carlo 重抽样额外引入的误差来源。

11. 对具有五期重叠收益标签的日频策略，分别写出独立同分布 Bootstrap、残差 Bootstrap 与 moving block Bootstrap 的实施条件。设计一种保留短期自相关的重抽样方案，说明块长、边界拼接和重叠标签如何影响方差估计，并指出为什么直接打乱日期会破坏策略评价。

12. **完整证明置换检验的条件有效性。** 设原假设下观测在标签置换群中可交换，检验统计量为 $T$，大值表示反对原假设。利用置换后统计量在原假设下的同分布性，构造基于全部置换秩的拒绝规则，并证明其条件第一类错误概率不超过给定水平 $\alpha$。说明并列统计量、随机化决策以及仅抽取部分置换的 Monte Carlo 版本应如何处理。

13. **完整推导交叉验证风险的训练量偏差。** 设样本独立同分布，$K$ 折大小相同，每折训练量为 $m=n-n/K$，算法对训练样本顺序对称。令 $R_m=\mathbb E[\ell(\mathcal A(S_m);Z)]$。证明 $\mathbb E[\widehat R_{\mathrm{CV}}]=R_m$，并推导其估计 $R_n$ 时的偏差 $R_m-R_n$。若 $R_m=R_\infty+c/m+O(m^{-2})$，进一步给出偏差的主项，并解释折间相关为何不影响这一期望等式却会影响方差。
14. 对实轴上的阈值类 $\mathcal H=\{x\mapsto\mathbf 1\{x\ge t\}:t\in\mathbb R\}$，证明其 VC 维为一，并求任意 $m$ 个互异点上的增长函数。对闭区间指示函数类证明其 VC 维为二，并说明为什么三个互异点上的某种交错标记不能实现。将结论用于比较两类筛选规则的容量。

15. 设有限函数类 $\mathcal G=\{g_1,\ldots,g_M\}$ 满足 $|g_j(z_i)|\le B$。从 Rademacher 变量的矩母函数界出发，完整推导 $\widehat{\mathfrak R}_{z_{1:n}}(\mathcal G)\le B\sqrt{2\log M/n}$，明确使用指数化上确界、Jensen 不等式与对数求和上界的步骤。讨论候选因子数 $M$ 增长时该界传达的信息。

16. 对定理 23.20 的线性权重类，取 $n=100$、$X=2$，损失关于预测值的 Lipschitz 常数为 $L=0.5$。分别计算 $r=2$ 与 $r=0.5$ 时由式（23.32）和压缩不等式得到的损失类经验 Rademacher 上界，并解释为什么较小的上界不蕴含较小的总体最优风险。若要同时控制逼近误差，还需比较哪些量？

17. 某因子库含 $M=500$ 个候选，要求族错误率不超过 $0.05$。计算 Bonferroni 单检验阈值，并用并集界证明该阈值在任意相关结构下有效。若先用全部样本选出十二个因子，再对所选因子做普通五折交叉验证，指出信息泄露发生在哪一步，并给出不增加环境假设的折内替代流程。
18. 一项月频研究有最初三十六个月作为训练历史，其后二十四个月留作六个连续的外层测试块，每块四个月。内层使用滚动验证选择入选因子数与岭参数，标签持有期为三个月。写出逐外层起点的完整算法，明确内层训练与验证的边界清除、逐期标准化、重估和预测保存方式，并说明最终应有多少个不重复的外层预测月份。不得利用外层结果修改候选网格。

19. **完整推导带全投资约束的收缩权重。** 求解 $\min_{\boldsymbol w}\|\boldsymbol y-\boldsymbol X\boldsymbol w\|_2^2+\lambda\|\boldsymbol w-\boldsymbol w_0\|_2^2$，约束为 $\boldsymbol 1^\top\boldsymbol w=1$。令 $\boldsymbol A=\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I$、$\boldsymbol b=\boldsymbol X^\top\boldsymbol y+\lambda\boldsymbol w_0$，利用 Lagrange 乘子推导以 $\boldsymbol A^{-1}\boldsymbol b$ 与 $\boldsymbol A^{-1}\boldsymbol 1$ 表示的闭式解，并讨论 $\lambda$ 增大时权重向基准的收缩及基准权重和不为一时的情况。

20. 对同一策略分别设计固定训练长度六十个月的滚动窗口与从六十个月开始不断增长的扩展窗口，二者均使用十二个月验证期和十二个月测试期，标签持有期为三个月。画出各窗口的信息流向，标出需要删除的重叠训练标签与隔离期，并比较两种方案在制度变化、训练量偏差和计算成本上的差异。说明为何不能把两种窗口产生的测试分数当作独立重复实验。
21. 某策略的外层测试输出为按时间排列的日度净收益序列，其中收益标签重叠五期，且不同市场状态的波动显著不同。设计 moving block Bootstrap 以构造平均净收益与 Sharpe 比率的区间估计，说明统计量如何在每个重抽样序列上重算，并给出块长敏感性检查。若该策略是从三十个已经查看过同一测试期的候选中选出，指出这些区间仍未计入哪类不确定性。

22. 某团队拥有十年日频股票数据、一百个候选因子、历史股票池成分和交易成本模型，希望比较 Ridge 与 Lasso 并建立一个可审计的样本外策略。设计从数据清洗到最终报告的完整研究协议，要求包含逐时点预处理、Bonferroni 筛选或折内稳定性筛选、收缩参数的内层滚动选择、重叠标签清除、未触碰外层测试、成本与换手核算以及区块 Bootstrap 区间。进一步说明 AIC、BIC 与学习理论界各自能回答什么问题，以及即使最终测试显著也不能排除哪些未来风险。
