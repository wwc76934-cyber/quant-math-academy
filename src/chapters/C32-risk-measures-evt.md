# 第32章　风险度量与极值理论

风险度量把随机损失映射为资本、准备金或保证金所需的单一数值。合理的度量不仅要反映损失分布的中心位置，还要识别低频率、高损害的尾部事件；同时还应回答增加头寸、调整规模和分散组合会怎样改变资本占用。本章以货币风险度量的公理体系为起点，比较在险价值与期望短缺，并说明分位数、对偶表示和谱权重之间的联系。

在险价值具有清晰的分位数解释，却可能惩罚本应降低风险的组合分散。期望短缺把尾部各层分位数按相同权重汇总，既保留置信水平含义，又恢复次可加性。理解两者的差别，需要把定义、资本约束和对偶表示放在同一损失符号约定下考察。

## 32.1 货币风险度量公理化

固定概率空间 $(\Omega,\mathcal F,\mathbb P)$，以随机变量 $X$ 表示同一持有期内的损失，盈利因此对应负损失。先取 $\mathcal X=L^\infty(\Omega,\mathcal F,\mathbb P)$；涉及尾部积分时，可自然扩展到 $L^1$。除特别说明外，随机变量之间的不等式均几乎必然成立，置信水平 $\alpha$ 满足 $0<\alpha<1$。

**定义 32.1（货币风险度量及其公理）**

若泛函 $\rho:\mathcal X\to\mathbb R$ 满足单调性与平移不变性，则称其为货币风险度量。对任意 $X,Y\in\mathcal X$、$m\in\mathbb R$、$\lambda\ge0$ 和 $\theta\in[0,1]$，另三项公理分别为正齐次性、凸性与次可加性，全部条件写为
$$
\begin{aligned}
X\le Y&\quad\Longrightarrow\quad\rho(X)\le\rho(Y),\\
\rho(X+m)&=\rho(X)+m,\\
\rho(\lambda X)&=\lambda\rho(X),\\
\rho(\theta X+(1-\theta)Y)&\le\theta\rho(X)+(1-\theta)\rho(Y),\\
\rho(X+Y)&\le\rho(X)+\rho(Y).
\end{aligned}
\tag{32.1}
$$
单调性表示损失逐状态越大，所需资本越多。这里的符号约定十分重要：若用收益而非损失定义风险度量，不等号方向必须反转。平移不变性表示确定的损失会等额增加资本要求；等价地，加入 $m$ 单位无风险现金相当于把损失从 $X$ 改为 $X-m$，从而有 $\rho(X-m)=\rho(X)-m$。特别地，$\rho(X-\rho(X))=0$，所以 $\rho(X)$ 正是使经资本补偿后的头寸达到零风险参考水平的金额。

正齐次性表示头寸规模扩大为原来的 $\lambda$ 倍时，资本要求也扩大同样的倍数。它排除了仅因名义规模不同而产生的任意资本折扣，并使 $\rho(0)=0$。这一性质适合流动性充足、交易不改变价格的基准模型；大额交易的市场冲击需要另外的流动性修正，而不能暗中混入正齐次性的定义。

凸性刻画分散化：以比例 $\theta$ 和 $1-\theta$ 配置两个头寸所形成的混合损失，其资本要求不超过两个资本要求的同权平均。次可加性则直接给出合并头寸的资本折扣，即组合风险不超过各部分风险之和。对监管者而言，这避免了把两个实体合并反而触发额外资本要求的反常激励；对投资者而言，它表达了对分散化收益的最低认可。

凸性与正齐次性同时成立时，次可加性自动成立。事实上，由正齐次性和凸性可得 $\rho(X+Y)=2\rho((X+Y)/2)\le\rho(X)+\rho(Y)$。反过来，次可加性与正齐次性也给出凸性，因为 $\rho(\theta X+(1-\theta)Y)\le\rho(\theta X)+\rho((1-\theta)Y)=\theta\rho(X)+(1-\theta)\rho(Y)$。因此，在正齐次框架内，凸性和次可加性是分散化原则的两种等价表达。
**定义 32.2（在险价值）**

设 $F_X(x)=\mathbb P(X\le x)$。损失 $X$ 在置信水平 $\alpha$ 的下侧分位数与在险价值定义为
$$
q_\alpha(X)=\inf\{x\in\mathbb R:F_X(x)\ge\alpha\},\qquad \operatorname{VaR}_\alpha(X)=q_\alpha(X).
\tag{32.2}
$$
由于分布函数右连续，集合 $\{x:F_X(x)\ge\alpha\}$ 的下确界仍属于该集合，故 $\mathbb P(X\le\operatorname{VaR}_\alpha(X))\ge\alpha$。因此，$\operatorname{VaR}_\alpha(X)$ 是使累计概率至少达到 $\alpha$ 的最小损失阈值。若资本约束写成 $\operatorname{VaR}_\alpha(X)\le K$，它只约束阈值位置，并不区分阈值之外损失是略高于阈值还是极端巨大。

VaR保留单调性、平移不变性和正齐次性。若 $X\le Y$ 几乎必然成立，则 $Y\le x$ 蕴含 $X\le x$，故 $F_Y(x)\le F_X(x)$，达到概率 $\alpha$ 所需的阈值满足 $q_\alpha(X)\le q_\alpha(Y)$。对任意实数 $m$，又有 $F_{X+m}(x)=F_X(x-m)$，所以 $q_\alpha(X+m)=q_\alpha(X)+m$。当 $\lambda>0$ 时，$F_{\lambda X}(x)=F_X(x/\lambda)$，从而 $q_\alpha(\lambda X)=\lambda q_\alpha(X)$；当 $\lambda=0$ 时两边均为零。这三条性质的证明只使用分位数集合的变换，不依赖分布连续性。

然而，这些性质不能推出次可加性。两个头寸各自的损失分布可以在 $\alpha$ 分位点以下具有较大质量，而合并后，多个小幅尾部事件相加会把 $\alpha$ 分位点推向更高的损失水平。下例用显式概率证明这种资本约束失效，而不依赖任何近似。
**例 32.1**

取置信水平 $\alpha=0.95$。两个独立头寸的损失分别为 $X$ 和 $Y$，二者同分布，且 $\mathbb P(X=0)=0.96$、$\mathbb P(X=1)=0.04$。资本上限设为 $K=0$。验证两个头寸分别满足资本约束，而合并头寸 $S=X+Y$ 不满足，并由此证明 VaR 不满足次可加性。

**解**

对任一单个头寸，当 $x<0$ 时有 $F_X(x)=0$，而 $F_X(0)=0.96\ge0.95$。达到累计概率 $0.95$ 的最小阈值因此是零，即 $\operatorname{VaR}_{0.95}(X)=\operatorname{VaR}_{0.95}(Y)=0$。故两个头寸分别都满足 $\operatorname{VaR}_{0.95}(X)\le0$ 与 $\operatorname{VaR}_{0.95}(Y)\le0$。

由独立性，合并损失的全部概率为
| $S$ | $0$ | $1$ | $2$ |
|---|---:|---:|---:|
| $\mathbb P(S=s)$ | $0.9216$ | $0.0768$ | $0.0016$ |

这里 $\mathbb P(S=0)=0.96^2=0.9216$，$\mathbb P(S=1)=2\times0.96\times0.04=0.0768$，而 $\mathbb P(S=2)=0.04^2=0.0016$。于是 $F_S(0)=0.9216<0.95$，且当 $0\le x<1$ 时始终有 $F_S(x)=0.9216$；但 $F_S(1)=0.9216+0.0768=0.9984\ge0.95$。因此，满足 $F_S(x)\ge0.95$ 的最小 $x$ 是 $1$，即 $\operatorname{VaR}_{0.95}(S)=1$。

合并头寸因而不满足资本约束，因为 $\operatorname{VaR}_{0.95}(S)=1>0=K$。同时，
$\operatorname{VaR}_{0.95}(X+Y)=1>0=\operatorname{VaR}_{0.95}(X)+\operatorname{VaR}_{0.95}(Y)$。这个严格不等式完整证明了 VaR 不具有次可加性；即使两个损失独立，该结论仍然成立。
**定义 32.3（一致性风险度量与凸风险度量）**

同时满足单调性、平移不变性、正齐次性和次可加性的货币风险度量称为一致性风险度量。若保留单调性与平移不变性，但以凸性取代正齐次性和次可加性，则称为凸风险度量。

一致性的四条公理分别控制状态排序、确定现金、头寸规模和组合分散，因而不是四个互不相关的技术条件。对 $\rho(X)$ 的资本解释而言，平移不变性保证资本金额与风险金额使用同一单位；正齐次性使次可加性和凸性等价；单调性与次可加性共同保证不会仅因改变风险分类或合并账户而产生违背经济直觉的结果。

例32.1说明，一般分布空间上的 VaR 不是一致性风险度量，尽管它满足另外三条公理。问题不在于置信水平选得过低，而在于 VaR 只读取一个分位点：它忽略了该点右侧损失的大小，也没有控制两个尾部区域叠加后的概率质量。凸风险度量则允许规模效应，例如用 $\rho(\lambda X)<\lambda\rho(X)$ 表示某些分散化或规模折扣；若仍要求正齐次性，就回到一致性框架。

为研究能够替代 VaR 的尾部资本度量，下一节把置信水平右侧的全部分位数纳入计算。关键不是简单地把条件期望中的“尾部”换成更大的事件，而是在分布存在跳跃时正确分配分位点处的部分概率质量。
## 32.2 分位数与尾部度量

分位数把风险度量转化为分布函数的反函数问题。除定义32.2中的下侧分位数外，估计时还必须明确经验分布的阶梯结构。设 $X_1,\ldots,X_n$ 是与 $X$ 同分布的独立损失观测，$X_{(1)}\le\cdots\le X_{(n)}$ 为次序统计量，经验分布函数为 $\widehat F_n(x)=n^{-1}\sum_{i=1}^n\mathbf 1_{\{X_i\le x\}}$。将定义32.2直接用于 $\widehat F_n$，得到经验 VaR 估计
$$
\widehat{\operatorname{VaR}}_\alpha
=\inf\{x:\widehat F_n(x)\ge\alpha\}
=X_{(\lceil n\alpha\rceil)}.
\tag{32.3}
$$
这里使用向上取整，因为至少需要 $\lceil n\alpha\rceil$ 个观测不超过阈值，经验累计概率才不低于 $\alpha$。软件中的线性插值分位数采用别的样本约定，通常在渐近意义下等价，但小样本数值可以不同，资本报告中应说明所用规则。

若 $F_X$ 在 $q_\alpha(X)$ 的邻域内严格递增且连续，则分位数唯一，并且经验分位数依概率收敛到 $q_\alpha(X)$。证明的关键是：对任意 $\varepsilon>0$，唯一性给出 $F_X(q_\alpha-\varepsilon)<\alpha<F_X(q_\alpha+\varepsilon)$；经验分布在两个固定点处依概率收敛到 $F_X$，所以当 $n$ 足够大时，$\widehat F_n(q_\alpha-\varepsilon)<\alpha$ 且 $\widehat F_n(q_\alpha+\varepsilon)\ge\alpha$ 以趋于一的概率成立，从而 $|\widehat q_\alpha-q_\alpha|\le\varepsilon$。若真实分布在分位点处平坦或跳跃，必须改用分位数集合，单一经验次序统计量的稳定性会下降。

历史模拟直接用式（32.3），参数方法则先估计分布再计算其分位数。两种方法都估计同一个总体对象，但都不修复 VaR 的次可加性缺陷；改进样本量或分布模型与改进风险度量的公理性质是两件不同的事。
**定义 32.4（期望短缺与条件在险价值）**

设 $X\in L^1$，记 $q=\operatorname{VaR}_\alpha(X)$。若 $F_X$ 连续且 $F_X(q)=\alpha$，则置信水平 $\alpha$ 的期望短缺可写为尾部条件期望
$$
\operatorname{ES}_\alpha(X)
=\mathbb E[X\mid X>q]
=\frac{\mathbb E[X\mathbf 1_{\{X>q\}}]}{1-\alpha}.
\tag{32.4}
$$
在连续情形下 $\mathbb P(X=q)=0$，所以以 $X>q$ 或 $X\ge q$ 为条件没有区别。式（32.4）的经济含义是：已知损失进入最差的 $1-\alpha$ 区域后，计算该区域的平均损失，而不是只记录区域边界。

对一般分布，分位点可能携带正概率，直接用 $X\ge q$ 为条件会纳入超过 $1-\alpha$ 的质量，直接用 $X>q$ 为条件又可能不足。因而以分位数积分作为一般定义，并把同一量称为条件在险价值：
$$
\begin{aligned}
\operatorname{ES}_\alpha(X)
&=\operatorname{CVaR}_\alpha(X)
=\frac{1}{1-\alpha}\int_\alpha^1q_u(X)\,\mathrm du,\\
&=\frac{\mathbb E[X\mathbf 1_{\{X>X>q\}}]+q\big(F_X(q)-\alpha\big)}{1-\alpha}.
\end{aligned}
\tag{32.5}
$$
式（32.5）第二行中的 $q(F_X(q)-\alpha)$ 是分位点修正项。严格高于 $q$ 的损失全部进入尾部；在 $X=q$ 处，只取从累计概率 $\alpha$ 延伸到 $F_X(q)$ 的部分，其概率为 $F_X(q)-\alpha$。由 $\mathbb P(X>q)=1-F_X(q)$，修正项也可写成 $q(1-\alpha-\mathbb P(X>q))$，故尾部总质量恰为 $1-\alpha$。

当 $F_X(q)=\alpha$ 时修正项为零，式（32.5）立即退化为式（32.4）。因此，分位数积分是连续与离散情形统一且无歧义的定义；本章使用 ES 与 CVaR 指称同一个量。
式（32.5）第二行分子的第一项中的指示函数为 $\mathbf 1_{\{X>q\}}$，即只纳入严格高于 $q$ 的损失。该统一表达式还可转化为一个无约束凸优化问题，这一形式在证明和数值计算中都很方便：

$$
\operatorname{CVaR}_\alpha(X)
=\min_{t\in\mathbb R}\left\{t+\frac{1}{1-\alpha}\mathbb E[(X-t)^+]\right\},
\tag{32.6}
$$
并且 $t=q_\alpha(X)$ 是一个最优解。记大括号内的函数为 $\Phi_X(t)$。由 $(x-t)^+= (x-t)\mathbf 1_{\{x>t\}}$ 可得 $\mathbb E[(X-q)^+]=\mathbb E[X\mathbf 1_{\{X>q\}}]-q\mathbb P(X>q)$。代入 $t=q$，再利用 $1-F_X(q)=\mathbb P(X>q)$，便有 $\Phi_X(q)$ 等于式（32.5）的第二行。

还需验证 $q$ 使 $\Phi_X$ 达到全局最小。函数 $\Phi_X$ 是凸函数，其左、右导数分别为 $(F_X(t-)-\alpha)/(1-\alpha)$ 与 $(F_X(t)-\alpha)/(1-\alpha)$。由下侧分位数定义，$t<q$ 时 $F_X(t)<\alpha$，故函数在 $q$ 左侧下降；$t>q$ 时 $F_X(t)\ge\alpha$，故函数在 $q$ 右侧上升。在 $t=q$ 处，$F_X(q-)\le\alpha\le F_X(q)$，所以左导数不大于零、右导数不小于零。凸函数因此不可能在其他点取得更小值，式（32.6）得证。

最优参数 $t$ 就是 VaR，而最优值是 ES。二者在同一公式中承担不同角色：VaR 是尾部区间的边界，ES 还加上超出该边界的平均损失及分位点修正。对离散损失，直接寻找最优 $t$ 常比手工处理部分概率质量更不易出错。
**定理 32.5（期望短缺的一致性）**

对任意 $0<\alpha<1$，由式（32.5）定义的 $\operatorname{ES}_\alpha$ 在 $L^1$ 上满足单调性、平移不变性、正齐次性和次可加性，因而是一致性风险度量。此外，$\operatorname{ES}_\alpha(X)\ge\operatorname{VaR}_\alpha(X)$。

**证明**

先验证单调性。若 $X\le Y$ 几乎必然成立，则对每个 $u\in(0,1)$，由定义32.2后的分位数集合比较可得 $q_u(X)\le q_u(Y)$。将不等式在 $[alpha,1]$ 上积分并乘以正数 $(1-\alpha)^{-1}$，保持不等号方向，故 $\operatorname{ES}_\alpha(X)\le\operatorname{ES}_\alpha(Y)$。

再验证平移不变性。对 $m\in\mathbb R$，有 $q_u(X+m)=q_u(X)+m$。于是 $\operatorname{ES}_\alpha(X+m)$ 等于 $\operatorname{ES}_\alpha(X)$ 加上 $(1-\alpha)^{-1}\int_\alpha^1m\,\mathrm du$，后一项恰为 $m$。因此 $\operatorname{ES}_\alpha(X+m)=\operatorname{ES}_\alpha(X)+m$。

接着完整验证正齐次性。设 $\lambda>0$。由于 $F_{\lambda X}(x)=F_X(x/\lambda)$，每个分位数都满足 $q_u(\lambda X)=\lambda q_u(X)$。代入分位数积分并提取正常数 $\lambda$，得到 $\operatorname{ES}_\alpha(\lambda X)=\lambda\operatorname{ES}_\alpha(X)$。当 $\lambda=0$ 时，$\lambda X=0$，其所有分位数均为零，故左边为 $\operatorname{ES}_\alpha(0)=0$，右边也为零。因此正齐次性对全部 $\lambda\ge0$ 成立。
最后验证次可加性。任取 $X,Y\in L^1$ 及 $s,t\in\mathbb R$，记 $c=(1-\alpha)^{-1}$。正部函数满足
$(X+Y-s-t)^+\le(X-s)^++(Y-t)^+$：左边为零时显然成立；左边为正时，$X+Y-s-t=(X-s)+(Y-t)$，而一个实数不超过其正部，故不等式仍成立。取期望并乘以 $c$，再加上 $s+t$，得到
$$
\Phi_{X+Y}(s+t)\le\Phi_X(s)+\Phi_Y(t).
\tag{32.7}
$$
由式（32.6），左边不小于 $\operatorname{ES}_\alpha(X+Y)$，因为它只是目标函数在 $s+t$ 处的值。现在取 $s=q_\alpha(X)$、$t=q_\alpha(Y)$，右边两项分别达到最小值 $\operatorname{ES}_\alpha(X)$ 与 $\operatorname{ES}_\alpha(Y)$。于是 $\operatorname{ES}_\alpha(X+Y)\le\operatorname{ES}_\alpha(X)+\operatorname{ES}_\alpha(Y)$，次可加性得证。

最后，对每个 $u\ge\alpha$，分位数单调性给出 $q_u(X)\ge q_\alpha(X)=\operatorname{VaR}_\alpha(X)$。在 $[α,1]$ 上积分后得到 $\operatorname{ES}_\alpha(X)\ge(1-\alpha)^{-1}(1-\alpha)q_\alpha(X)=\operatorname{VaR}_\alpha(X)$。至此四条一致性公理及 VaR 支配关系全部成立。

□

定理32.5的证明显示，ES 的次可加性不是来自损失之间的相关性强弱，而是来自同一个凸优化目标对正部函数的三角不等式。无论 $X$ 与 $Y$ 独立、正相关还是完全同向，该不等式都逐状态成立，所以不需要额外分布假设。
在继续讨论之前，先更正本节的排版错误。式（32.5）第二行分子的第一项应为 $\mathbb E[X\mathbf 1_{\{X>q\}}]$，指示函数是 $\mathbf 1_{\{X>q\}}$，不是 $\mathbf 1_{\{X>X>q\}}$；完整分子仍为 $\mathbb E[X\mathbf 1_{\{X>q\}}]+q(F_X(q)-\alpha)$。定理32.5证明中的积分区间 $[alpha,1]$ 与 $[α,1]$ 均应读作 $[\alpha,1]$。以下推导使用这些更正后的表达式。

**定理 32.6（期望短缺的对偶表示）**

设 $X\in L^1$，$0<\alpha<1$，并令 $c=(1-\alpha)^{-1}$。定义密度集合 $\mathcal Z_\alpha=\{Z:0\le Z\le c,\ \mathbb E[Z]=1\}$，以及概率测度集合 $\mathcal Q_\alpha=\{Q:Q\ll\mathbb P,\ \mathrm dQ/\mathrm d\mathbb P\in\mathcal Z_\alpha\}$。则
$$
\begin{aligned}
\operatorname{ES}_\alpha(X)
&=\max_{Z\in\mathcal Z_\alpha}\mathbb E[XZ]
=\max_{Q\in\mathcal Q_\alpha}\mathbb E^Q[X]\\
&=\int_0^1q_u(X)\varphi_\alpha(u)\,\mathrm du,
\qquad
\varphi_\alpha(u)=c\mathbf 1_{\{u\ge\alpha\}} .
\end{aligned}
\tag{32.8}
$$
第一个最大值在 $Z^*=c\mathbf 1_{\{X>q\}}+c(F_X(q)-\alpha)\mathbf 1_{\{X=q\}}$ 处取得，其中 $q=q_\alpha(X)$。因此，ES 既是在密度有界概率测度下的最坏期望损失，也是对高分位数施加非递减权重的分位数积分。

**证明**

先验证 $Z^*$ 可行。由 $F_X(q)\ge\alpha$ 可知其两项均非负；两个指示函数互斥，且 $F_X(q)-\alpha\le1-\alpha$，所以 $0\le Z^*\le c$。又因为 $\mathbb P(X>q)=1-F_X(q)$，直接取期望得到 $\mathbb E[Z^*]=c(1-F_X(q))+c(F_X(q)-\alpha)\mathbb P(X=q)$。在连续点处 $\mathbb P(X=q)=0$，上式等于 $c(1-\alpha)=1$；在原子点处，$1-F_X(q)=\mathbb P(X>q)$，而 $F_X(q)-\alpha=1-\alpha-\mathbb P(X>q)$，故上式同样等于 $c\mathbb P(X>q)+c\mathbb P(X=q)-c\mathbb P(X>q)=1$。于是 $Z^*\in\mathcal Z_\alpha$。
对最优密度在原子点的写法再作精确归一化：当 $\mathbb P(X=q)>0$ 时，应取 $Z^*=c\mathbf 1_{\{X>q\}}+c(F_X(q)-\alpha)\mathbb P(X=q)^{-1}\mathbf 1_{\{X=q\}}$；当 $\mathbb P(X=q)=0$ 时，第二项为零。定理32.6中最大值密度的这一原子点表达式替换前文未除以原子质量的写法，前一段关于原子点期望的计算也相应替换为以下论证。由 $F_X(q-)\le\alpha$ 可得 $F_X(q)-\alpha\le\mathbb P(X=q)$，所以原子点系数仍不超过 $c$。直接计算则有 $\mathbb E[Z^*]=c\mathbb P(X>q)+c(F_X(q)-\alpha)=c(1-\alpha)=1$，故确有 $Z^*\in\mathcal Z_\alpha$。

任取 $Z\in\mathcal Z_\alpha$。由 $\mathbb E[Z]=1$，有 $\mathbb E[XZ]=q+\mathbb E[(X-q)Z]$。当 $X<q$ 时，$(X-q)Z\le0$；当 $X>q$ 时，由 $Z\le c$ 可得 $(X-q)Z\le c(X-q)^+$；当 $X=q$ 时两边均为零。因此 $\mathbb E[XZ]\le q+c\mathbb E[(X-q)^+]=\Phi_X(q)$。式（32.6）已经证明 $\Phi_X(q)=\operatorname{ES}_\alpha(X)$，所以任意可行密度给出的期望都不超过 ES。

另一方面，$\mathbb E[XZ^*]=c\mathbb E[X\mathbf 1_{\{X>q\}}]+cq(F_X(q)-\alpha)$，这正是更正后的式（32.5）所给出的 $\operatorname{ES}_\alpha(X)$，故上界在 $Z^*$ 处达到。密度与概率测度通过 $Z=\mathrm dQ/\mathrm d\mathbb P$ 一一对应，且 $\mathbb E[XZ]=\mathbb E^Q[X]$，所以两个最大值相等。最后，把 $c\mathbf 1_{\{u\ge\alpha\}}$ 乘到式（32.5）的分位数积分中，就得到式（32.8）的谱积分形式。

□

定理32.6也说明置信水平的经济含义：$1-\alpha$ 越小，允许替代概率测度集中的密度上界越大，对手就可以把越多概率质量转移到高损失状态，因而最坏期望损失越高。这里的最大值不是任意选择不利分布，而是在密度上界和总概率为一的约束下选择。
**定义 32.7（谱风险度量）**

设 $\varphi:(0,1)\to[0,\infty)$ 为非递减、右连续且满足 $\int_0^1\varphi(u)\,\mathrm du=1$ 的函数。对使得 $\int_0^1|q_u(X)|\varphi(u)\,\mathrm du<\infty$ 的损失 $X$，定义
$$
M_\varphi(X)=\int_0^1q_u(X)\varphi(u)\,\mathrm du .
\tag{32.9}
$$
函数 $\varphi$ 称为风险谱，$M_\varphi$ 称为谱风险度量。风险谱必须非递减，意味着越高的损失分位数不能被赋予越小权重；归一化则保证确定性损失 $m$ 的风险值恰为 $m$。ES 是 $\varphi=\varphi_\alpha$ 的特例。若 $\varphi$ 有界，则每个 $X\in L^1$ 都满足定义中的可积条件。

在上述定义下，只要下列涉及的积分均有限，$M_\varphi$ 就满足单调性、平移不变性、正齐次性和次可加性，因而是一致性风险度量。

**证明**

先把一般风险谱写成 ES 风险谱的混合。记 $\beta=\varphi(0+)$，令 $\nu$ 为 $\varphi$ 在 $(0,1)$ 上的 Stieltjes 测度，并补充 $\operatorname{ES}_0(X)=\mathbb E[X]$。由非递减性，对任意 $u$ 都有 $\varphi(u)=\beta+\int_{(0,u]}(1-\alpha)^{-1}(1-\alpha)\,\mathrm d\nu(\alpha)$。令测度 $\mu$ 在零点具有质量 $\beta$，在 $(0,1)$ 上满足 $\mathrm d\mu(\alpha)=(1-\alpha)\,\mathrm d\nu(\alpha)$。由于 $\varphi$ 非递减且可积，$(1-\alpha)\varphi(\alpha)\le\int_\alpha^1\varphi(u)\,\mathrm du\to0$，故分部积分给出 $\mu([0,1))=\beta+\int_{(0,1)}(1-\alpha)\,\mathrm d\nu(\alpha)=\int_0^1\varphi(u)\,\mathrm du=1$。所以 $\mu$ 是概率测度。

将上述谱分解代入式（32.9），交换积分次序，得到 $M_\varphi(X)=\beta\operatorname{ES}_0(X)+\int_{(0,1)}\operatorname{ES}_\alpha(X)\,\mathrm d\mu(\alpha)$。定义中的绝对可积条件保证 Fubini 定理适用；事实上，$|\operatorname{ES}_\alpha(X)|\le(1-\alpha)^{-1}\int_\alpha^1|q_u(X)|\,\mathrm du$，代回后恰由 $|q_u(X)|\varphi(u)$ 的积分控制。
现在逐条验证四条公理。若 $X\le Y$ 几乎必然成立，则每个 $\operatorname{ES}_\alpha(X)\le\operatorname{ES}_\alpha(Y)$，对概率测度 $\mu$ 积分后得到单调性。对 $m\in\mathbb R$，平移不变性给出 $M_\varphi(X+m)=M_\varphi(X)+m\mu([0,1))=M_\varphi(X)+m$。对 $\lambda>0$，由 $\operatorname{ES}_\alpha(\lambda X)=\lambda\operatorname{ES}_\alpha(X)$ 得到正齐次性；$\lambda=0$ 时，式（32.9）两边均为零。最后，对每个 $\alpha$ 使用定理32.5的次可加性，再乘以非负的 $\mu$ 密度并积分，得到 $M_\varphi(X+Y)\le M_\varphi(X)+M_\varphi(Y)$。四条公理全部成立。

□

风险谱的单调性是次可加性的关键。如果只给单一分位数 $q_\alpha$ 赋权，就得到 VaR；这种集中在一点的权重不能由式（32.9）的可积函数实现，而且 VaR 一般不满足次可加性。相反，ES 把尾部所有分位数按相同密度加权，是一般谱风险度量中最基本的组成部分。

**例 32.2**

设损失 $X$ 满足 $\mathbb P(X=0)=0.80$、$\mathbb P(X=1)=0.10$、$\mathbb P(X=3)=0.06$、$\mathbb P(X=8)=0.04$。计算 $\operatorname{VaR}_{0.90}(X)$ 与 $\operatorname{ES}_{0.90}(X)$，并分别用对偶密度和风险谱验证 ES 的数值。

**解**

分布函数在 $1$ 处首次达到 $0.90$，故 $q=q_{0.90}(X)=1$，即 VaR 为 $1$。分位点没有需要拆分的新增质量，因为 $F_X(1)-0.90=0$。严格高于分位点的总概率为 $0.06+0.04=0.10$，所以更正后的式（32.5）给出 $\operatorname{ES}_{0.90}(X)=(3\times0.06+8\times0.04)/0.10=(0.18+0.32)/0.10=5$。

再用定理32.6验证。这里 $c=10$，最优密度在 $X=3$ 与 $X=8$ 的状态上取 $Z^*=10$，在其余状态上取零，因此 $\mathbb E[Z^*]=10(0.06+0.04)=1$，并且 $\mathbb E[XZ^*]=10(3\times0.06+8\times0.04)=5$。对任意满足 $0\le Z\le10$ 且 $\mathbb E[Z]=1$ 的密度，对偶证明中的不等式给出 $\mathbb E[XZ]\le1+10\mathbb E[(X-1)^+]=1+10(2\times0.06+7\times0.04)=5$，故没有更大的可行期望值。

最后，$\varphi_{0.90}(u)$ 在 $u<0.90$ 时为零，在 $u\ge0.90$ 时为 $10$。当 $0.90\le u<0.96$ 时 $q_u(X)=3$，当 $0.96\le u<1$ 时 $q_u(X)=8$。式（32.9）因而给出 $M_{\varphi_{0.90}}(X)=10(3\times0.06+8\times0.04)=5$，与分位点修正及对偶计算完全一致。
## 32.3 极值理论基础

ES 描述给定尾部的平均损失，而极值理论研究尾部分布本身在高阈值附近具有什么普遍形式。设 $X_1,X_2,\ldots$ 为独立同分布随机变量，共同分布函数为 $F$，并记 $M_n=\max\{X_1,\ldots,X_n\}$。独立同分布性给出 $\mathbb P(M_n\le x)=F(x)^n$。当 $n$ 增大时，$M_n$ 通常趋向分布的上端点，必须先中心化并缩放，才可能得到非退化极限。

**定理 32.8（Fisher–Tippett–Gnedenko 极值类型定理）**

若存在常数 $a_n>0$、$b_n\in\mathbb R$，使得
$$
\frac{M_n-b_n}{a_n}\xrightarrow{d}H,
\tag{32.10}
$$
其中 $H$ 为非退化分布函数，则 $H$ 必属于广义极值分布族，记作 $\operatorname{GEV}(\xi)$。除去位置与尺度变换，极限只有 Fréchet、Gumbel 和 Weibull 三大类型，分别对应形状参数 $\xi>0$、$\xi=0$ 和 $\xi<0$。

该定理是经典极值理论的深层极限结果，其完整证明需要正则变差与尾等价工具；本章把它作为已经建立的基础定理，并在后文完整推导它与超阈值分布之间的联系。式（32.10）中的 $a_n$ 控制典型极端波动的尺度，$b_n$ 控制其中心位置。若另一组规范化常数也给出同一类型的非退化极限，则两个极限在位置和尺度变换后相同，形状参数 $\xi$ 不变。

GEV 的统一分布函数为
$$
H_\xi(x)=
\begin{cases}
\exp\!\left\{-(1+\xi x)^{-1/\xi}\right\},&\xi\ne0,\quad1+\xi x>0,\\
\exp\{-\exp(-x)\},&\xi=0,\quad x\in\mathbb R .
\end{cases}
\tag{32.11}
$$
当 $\xi\ne0$ 时，在 $1+\xi x\le0$ 的区域，$H_\xi$ 按连续延拓取 $0$ 或 $1$。加入位置参数 $\mu\in\mathbb R$ 与尺度参数 $\sigma>0$ 后，分布函数写成 $H_\xi((x-\mu)/\sigma)$，因此 $\xi$ 是不受仿射变换影响的形状参数。
三大经典类型可以由式（32.11）立即辨认。若 $\xi>0$，令 $\alpha=1/\xi$，经位置与尺度变换后得到 Fréchet 分布 $\Phi_\alpha(x)=\exp(-x^{-\alpha})$，其中 $x>0$。其右尾满足 $1-H_\xi(x)\sim\xi^{-1/\xi}x^{-1/\xi}$，所以 $\xi$ 越大，尾部越厚，且阶数不低于 $1/\xi$ 的矩不存在。若 $\xi=0$，极限就是 Gumbel 分布 $\Lambda(x)=\exp\{-\exp(-x)\}$，其两端均无有限端点；指数分布与正态分布的规范化块极大值都属于这一类型。若 $\xi<0$，令 $\alpha=-1/\xi$，经仿射变换后得到反向 Weibull 分布 $\Psi_\alpha(x)=\exp\{-(-x)^\alpha\}$，其中 $x<0$，并在 $x\ge0$ 时分布函数等于 $1$。这一类型具有有限上端点，适用于有明确物理上界的损失模型。

块极大值法直接把式（32.10）用于数据。把容量为 $n=mk$ 的样本划分为 $m$ 个长度为 $k$ 的区组，在每个区组内取最大值，再把这些最大值作为近似独立同分布的 GEV 样本估计 $\mu$、$\sigma$ 和 $\xi$。$k$ 太小时，区组内最大值尚未接近极限分布，模型偏差较大；$k$ 太大时，区组数 $m$ 很小，估计方差增大。因此块长选择体现偏差与方差之间的权衡，而形状参数决定外推右尾时采用的极值类型。

块极大值与超阈值计数由同一个事件连接。给定阈值序列 $u_n$，令 $p_n=\mathbb P(X>u_n)$，并记 $N_n=\sum_{i=1}^n\mathbf 1_{\{X_i>u_n\}}$，则 $N_n$ 服从参数为 $n$、$p_n$ 的二项分布。若 $n p_n\to\tau\in(0,\infty)$，则对每个固定的非负整数 $r$，
$$
\mathbb P(N_n=r)\longrightarrow e^{-\tau}\frac{\tau^r}{r!},
\qquad
F(u_n)^n\longrightarrow e^{-\tau}.
\tag{32.12}
$$
这就是稀有超阈值事件的 Poisson 极限。事件 $\{M_n\le u_n\}$ 与 $\{N_n=0\}$ 完全相同，所以块极大值低于阈值和没有超阈值事件具有相同概率。特别地，当 $u_n=b_n+a_nx$ 且 $H_\xi(x)>0$ 时，式（32.10）与式（32.12）共同给出 $n\overline F(u_n)\to\tau(x)=-\log H_\xi(x)$。
**证明**

固定 $r$，把二项概率写成 $\mathbb P(N_n=r)=[n!/\{(n-r)!n^r\}](np_n)^r(r!)^{-1}(1-p_n)^{n-r}$。第一个因子趋于 $1$，第二个因子趋于 $\tau^r$。由 $np_n\to\tau$ 可知 $p_n\to0$，并且 $\log(1-p_n)=-p_n(1+o(1))$，所以 $(n-r)\log(1-p_n)\to-\tau$。三个因子的极限相乘即得 $e^{-\tau}\tau^r/r!$。取 $r=0$ 就得到 $F(u_n)^n=(1-p_n)^n\to e^{-\tau}$。反过来，若 $F(u_n)^n\to H_\xi(x)\in(0,1)$，则 $n\log F(u_n)\to\log H_\xi(x)$；再利用 $\log F(u_n)=-p_n(1+o(1))$，便有 $np_n\to-\log H_\xi(x)$。这证明了式（32.12）以及 $\tau(x)=-\log H_\xi(x)$ 的对应关系。

□

广义帕累托分布把上述极限写成超阈值 excess 的分布。对尺度参数 $\sigma>0$ 和形状参数 $\xi\in\mathbb R$，GPD 的分布函数定义为
$$
G_{\xi,\sigma}(y)=
\begin{cases}
1-\left(1+\dfrac{\xi y}{\sigma}\right)^{-1/\xi},
&\xi\ne0,\quad y\ge0,\quad 1+\dfrac{\xi y}{\sigma}>0,\\
1-\exp\!\left(-\dfrac{y}{\sigma}\right),
&\xi=0,\quad y\ge0 .
\end{cases}
\tag{32.13}
$$
当 $\xi\ge0$ 时，支撑为 $y\ge0$；当 $\xi<0$ 时，支撑为 $0\le y\le-\sigma/\xi$，并在 $y\ge-\sigma/\xi$ 时令 $G_{\xi,\sigma}(y)=1$。因此生存函数在支撑内部为 $\overline G_{\xi,\sigma}(y)=(1+\xi y/\sigma)^{-1/\xi}$，而在 $\xi=0$ 时为 $\overline G_{0,\sigma}(y)=\exp(-y/\sigma)$。当 $\xi<1$ 时均值为 $\sigma/(1-\xi)$；当 $\xi\ge1$ 时均值不存在。$\xi>0$ 对应幂律厚尾，$\xi=0$ 对应指数尾，$\xi<0$ 对应有限超幅上界。
下文将超出阈值的部分简称为超出量。GPD 并非凭空假定，而是由块极大值条件和超阈值计数极限共同推出。

**定理 32.9（超阈值分布的 GPD 极限）**

设式（32.10）成立，其极限为 $H_\xi$。固定满足 $1+\xi x>0$ 的 $x$，令 $u_n(x)=b_n+a_nx$；当 $\xi\ne0$ 时令 $\sigma_n(x)=a_n(1+\xi x)$，当 $\xi=0$ 时令 $\sigma_n(x)=a_n$。则对 GPD 支撑内部的 $y\ge0$，条件超出量满足
$$
\begin{aligned}
&\mathbb P\!\left(X-u_n(x)>\sigma_n(x)y\mid X>u_n(x)\right)\\
&\qquad=\frac{\overline F\!\left(u_n(x)+\sigma_n(x)y\right)}
{\overline F\!\left(u_n(x)\right)}
\longrightarrow \overline G_{\xi,1}(y)
=\begin{cases}
(1+\xi y)^{-1/\xi},&\xi\ne0,\\
\exp(-y),&\xi=0 .
\end{cases}
\end{aligned}
\tag{32.14}
$$
当 $\xi<0$ 且 $y\ge-1/\xi$ 时，右端按连续延拓取零。于是，在高阈值 $u$ 处，未缩放的超出量 $Y=X-u$ 近似服从 $G_{\xi,\sigma}$，其中阈值 $u=b_n+a_nx$ 对应尺度 $\sigma=a_n(1+\xi x)=a_n+\xi(u-b_n)$；当 $\xi=0$ 时，尺度不随 $x$ 改变。

**证明**

记 $p_n(v)=\mathbb P(X>b_n+a_nv)=\overline F(u_n(v))$。由式（32.12）后的对应关系以及式（32.11），只要 $1+\xi v>0$，就有 $np_n(v)\to\tau(v)$，其中 $\xi\ne0$ 时 $\tau(v)=(1+\xi v)^{-1/\xi}$，而 $\xi=0$ 时 $\tau(v)=\exp(-v)$。这里乘以同一个 $n$ 的目的，是使随后两个生存概率的比值可以直接取极限。

先设 $\xi\ne0$，并固定支撑内部的 $y$，即 $1+\xi y>0$。令 $v=x+(1+\xi x)y$。则 $1+\xi v=(1+\xi x)(1+\xi y)>0$，并且 $u_n(v)=b_n+a_nx+a_n(1+\xi x)y=u_n(x)+\sigma_n(x)y$。条件概率的定义因此给出严格恒等式 $\mathbb P(X-u_n(x)>\sigma_n(x)y\mid X>u_n(x))=p_n(v)/p_n(x)=[np_n(v)]/[np_n(x)]$。取极限，右端等于 $\tau(v)/\tau(x)=[(1+\xi v)/(1+\xi x)]^{-1/\xi}=(1+\xi y)^{-1/\xi}$，恰为式（32.13）中单位尺度 GPD 的生存函数。
再设 $\xi=0$。此时 $\sigma_n(x)=a_n$，取 $v=x+y$ 就有 $u_n(v)=u_n(x)+a_ny$。同一条件概率恒等式给出极限 $\tau(x+y)/\tau(x)=\exp\{-(x+y)\}/\exp(-x)=\exp(-y)$，这就是单位尺度指数分布的生存函数。最后，当 $\xi<0$ 且 $y\ge-1/\xi$ 时，任取 $y_0<-1/\xi$，条件生存函数在 $y$ 处的值不超过在 $y_0$ 处的值；后一值的极限为 $(1+\xi y_0)^{-1/\xi}$。令 $y_0\uparrow-1/\xi$，该上界趋于零，故有限端点之外的条件生存概率极限为零。

以上论证从块极大值极限得到超阈值强度，再把两个相邻阈值的强度作比，因而完整推出了 GPD 的形式，而不是预先假定条件超出量服从 GPD。把单位尺度变量乘以 $\sigma$，就得到式（32.13）的一般尺度参数。因此，实际使用时可以用 $\overline F(u+y)/\overline F(u)\approx\overline G_{\xi,\sigma}(y)$ 对高阈值尾部进行近似。

□

GPD 还具有与上述推导一致的阈值稳定性。若 $Y\sim G_{\xi,\sigma}$，且 $u$ 位于支撑内部，则 $\mathbb P(Y-u>y\mid Y>u)=(1+\xi(u+y)/\sigma)^{-1/\xi}/(1+\xi u/\sigma)^{-1/\xi}=(1+\xi y/(\sigma+\xi u))^{-1/\xi}$。所以提高阈值后，超出量仍属于同一形状参数的 GPD，只是尺度由 $\sigma$ 更新为 $\sigma+\xi u$；当 $\xi=0$ 时，这就是指数分布的无记忆性。该性质也解释了为什么在足够高的候选阈值之上，拟合的形状参数应大致稳定，而尺度参数随阈值按线性关系变化。

在统计上，块极大值法使用每个区组最极端的一个观测，而超阈值法保留所有超过高阈值的观测，并使用 Poisson 近似描述超阈值次数、使用 GPD 描述超出量。两者共享同一个形状参数：$\xi>0$ 时，GPD 生存函数满足 $\overline G_{\xi,\sigma}(y)\sim(\xi y/\sigma)^{-1/\xi}$；$\xi=0$ 时为指数尾；$\xi<0$ 时超出量具有有限上端点。这一对应使 GEV 的块极大值推断与 GPD 的尾部推断可以相互校验。
**例 32.3**

已知损失超过阈值 $100$ 后，超出量 $Y=X-100$ 近似服从 $\xi=0.25$、$\sigma=20$ 的 GPD。计算 $\mathbb P(X>140\mid X>100)$ 与 $\mathbb P(X>160\mid X>100)$，再求已知 $X>140$ 时损失超过 $160$ 的概率、平均超出量以及条件分布的 $0.99$ 分位数。

**解**

由于 $1/\xi=4$，式（32.13）的生存函数为 $\mathbb P(Y>y)=(1+y/80)^{-4}$。代入 $y=40$ 与 $y=60$，分别得到 $\mathbb P(X>140\mid X>100)=(1+40/80)^{-4}=(3/2)^{-4}=16/81\approx0.19753$，以及 $\mathbb P(X>160\mid X>100)=(1+60/80)^{-4}=(7/4)^{-4}=256/2401\approx0.10662$。若另有 $\mathbb P(X>100)=0.02$，则乘法公式给出 $\mathbb P(X>140)=0.02\times16/81\approx0.00395$。

第二个条件概率不能直接把 $60-40=20$ 代入原尺度而不调整参数。严格使用条件概率，得到 $\mathbb P(X>160\mid X>140)=\mathbb P(Y>60)/\mathbb P(Y>40)=(256/2401)/(16/81)=1296/2401=(6/7)^4\approx0.53978$。这一结果也可由阈值稳定性验证：把阈值从 $100$ 提高到 $140$ 后，新超出量为 $Y-40$，新尺度为 $\sigma+0.25\times40=30$，于是所求概率为 $(1+0.25\times20/30)^{-4}=(7/6)^{-4}$，与直接相除完全一致。

因为 $\xi=0.25<1$，平均超出量存在，且 $\mathbb E[Y]=\sigma/(1-\xi)=20/0.75=80/3\approx26.6667$。最后，对 $0<p<1$，由 $\overline G_{\xi,\sigma}(y)=1-p$ 解出 $y_p=(\sigma/\xi)[(1-p)^{-\xi}-1]$。取 $p=0.99$，得到 $y_{0.99}=80(0.01^{-0.25}-1)=80(\sqrt{10}-1)\approx172.9846$。因此原损失的条件 $0.99$ 分位数为 $100+y_{0.99}\approx272.9846$。这表示在已知损失超过 $100$ 的条件下，约有 $1\%$ 的损失超过该水平。

**注记**

例 32.3 中的数值 $0.02$ 只是计算无条件超越概率时额外采用的示意超越率，不参与其余条件概率、平均超出量和条件分位数的计算。若 $\mathbb P(X>u)=\zeta_u>0$，严格的乘法关系应为 $\mathbb P(X>u+y)=\zeta_u\overline G_{\xi,\sigma}(y)$；未给定 $\zeta_u$ 时，只能由 GPD 模型确定条件尾部，不能反推出无条件概率。

为避免分位数公式在使用范围上的歧义，设 $0<p<1$，并令 $q_p$ 表示已知 $X>u$ 时 $X$ 的 $p$ 分位数。由 $\mathbb P(X>q_p\mid X>u)=1-p$ 可知，当 $\xi\ne0$ 时，$q_p=u+(\sigma/\xi)[(1-p)^{-\xi}-1]$；当 $\xi=0$ 时，$q_p=u-\sigma\log(1-p)$。这两式在 $\xi\to0$ 时连续衔接，因为 $[(1-p)^{-\xi}-1]/\xi\to-\log(1-p)$。当 $\xi\ge0$ 时，支撑无上界，$p\uparrow1$ 时 $q_p\to\infty$；当 $\xi<0$ 时，分布具有有限上端点 $u-\sigma/\xi$，并且 $p\uparrow1$ 时 $q_p$ 收敛到该端点。因此，例 32.3 的公式只用于给定 GPD 支撑内部的条件分位数，不能把它误作原损失在整个实线上的分位数公式。

﻿## 32.4 极值参数的估计

极值估计的目标不是用一条分布曲线覆盖全部观测，而是在明确的渐近模型下估计控制尾部的参数。形状参数 $\xi$ 决定尾部是否有限以及高阶矩是否存在，尺度参数 $\sigma$ 决定极端损失的分散程度，阈值超越率或区组极大值的位置参数则把尾部模型连接到原损失尺度。估计时必须同时说明采样方案、支撑约束和不确定性，否则单独报告一个形状参数点估计并没有完整的统计含义。

### 32.4.1 块极大值法与 POT 法

**定义 32.10（块极大值模型与 POT 模型）**

设损失观测为 $X_1,\ldots,X_n$。块极大值法把观测序列划分为 $B$ 个长度相近且不重叠的区组，第 $j$ 个区组的极大值记为 $M_j$。块极大值模型把 $M_1,\ldots,M_B$ 近似看作相互独立的 GEV 变量，其共同参数为 $(\mu,\sigma,\xi)$，其中 $\sigma>0$。POT 法先固定高阈值 $u$，令 $I_u=\{i:X_i>u\}$、$k=|I_u|$，并把超出量 $Y_i=X_i-u$（$i\in I_u$）近似看作相互独立的 GPD 变量，其共同参数为 $(\xi,\sigma)$；同时以 $\zeta_u=\mathbb P(X>u)$ 或单位时间超阈值强度描述极端事件出现的频率。

两种模型都是尾部近似而非对全部损失的精确设定。块极大值法只保留每个区组的最大观测，因而对区组内其他较大损失的利用较少；POT 法保留所有超阈值观测，但推断同时依赖阈值与超越率模型。若区组过短，区组极大值可能尚未接近 GEV 极限；若区组过长，可用的区组数又过少。POT 法也存在同一权衡：阈值偏低会把非 GPD 的主体观测混入样本，阈值偏高则会减少超出量数目并增大估计方差。

在块极大值模型中，令 $z_j=1+\xi(M_j-\mu)/\sigma$。当 $\xi\ne0$ 时，GEV 密度为 $\sigma^{-1}z_j^{-1/\xi-1}\exp(-z_j^{-1/\xi})$；当 $\xi=0$ 时，密度为 $\sigma^{-1}\exp\{-(M_j-\mu)/\sigma-\exp[-(M_j-\mu)/\sigma]\}$。因此 $B$ 个区组极大值的对数似然为
$$
\ell_B(\mu,\sigma,\xi)=
\begin{cases}
-B\log\sigma-\displaystyle\sum_{j=1}^{B}\left[\left(1+\frac1\xi\right)\log z_j+z_j^{-1/\xi}\right],&\xi\ne0,\\
-B\log\sigma-\displaystyle\sum_{j=1}^{B}\left[\frac{M_j-\mu}{\sigma}+\exp\!\left(-\frac{M_j-\mu}{\sigma}\right)\right],&\xi=0,
\end{cases}
\qquad z_j=1+\frac{\xi(M_j-\mu)}{\sigma}.
\tag{32.15}
$$
只有 $\sigma>0$ 且所有 $z_j>0$ 时，式（32.15）才有效；任一区组极大值落在参数所给支撑之外，该参数组合便不可接受。实际计算通常在满足这些约束的参数区域内数值最大化 $\ell_B$，并用 $\xi=0$ 处的连续表达式避免接近零时的数值消减。

对 POT 模型，若 $n$ 个观测相互独立且具有共同分布，则 $k$ 服从参数为 $n$ 与 $\zeta_u$ 的二项分布。超出量的条件分布不依赖 $\zeta_u$，所以二项频率部分与 GPD 部分可以分别估计。当 $\xi\ne0$ 时，联合对数似然可写为
$$
\ell_P(\zeta_u,\xi,\sigma)=k\log\zeta_u+(n-k)\log(1-\zeta_u)-k\log\sigma-\left(1+\frac1\xi\right)\sum_{i=1}^{k}\log z_i,
\qquad z_i=1+\frac{\xi Y_i}{\sigma}.
\tag{32.16}
$$
这里省略了不依赖参数的二项系数。对 $\zeta_u$ 求导并令导数为零，得到 $k/\zeta_u-(n-k)/(1-\zeta_u)=0$，故 $\widehat\zeta_u=k/n$。当 $\xi=0$ 时，只须把式（32.16）中最后一项替换为 $-\sigma^{-1}\sum_{i=1}^{k}Y_i$。若采用 Poisson 计数近似，观测时间为 $T$、超阈值强度为 $\lambda$，则频率部分的对数似然改为 $-\lambda T+k\log(\lambda T)-\log(k!)$，从而 $\widehat\lambda=k/T$；GPD 部分保持不变。

选择两种方法时，还应考虑损失序列的时间结构。若极值成簇出现，直接把相邻超出量当作独立样本会低估标准误。常见处理是只保留每个极端事件簇的最大超出量，并以簇间间隔近似恢复独立性；区间长度应结合超过量自相关、极端事件持续时间及不同方案的敏感性确定。块极大值法也不能自动消除依赖，只有当区组足够长且区组间依赖足够弱时，独立 GEV 近似才合理。若关注一年内最极端的一次损失，年度块极大值具有直接解释；若关注所有严重损失及其发生频率，POT 通常更充分。

### 32.4.2 GPD 参数的极大似然估计与阈值选择

固定阈值后，设 $Y_1,\ldots,Y_k$ 为独立同分布的 GPD 超出量，$Y_{(k)}=\max_iY_i$。参数空间必须满足 $\sigma>0$ 和 $z_i=1+\xi Y_i/\sigma>0$（$i=1,\ldots,k$）。当 $\xi\ge0$ 时，这些条件只要求 $\sigma>0$；当 $\xi<0$ 时，它们等价于 $-\sigma/\xi>Y_{(k)}$，即所有观测都严格位于拟合分布的有限上端点之内。

**定理 32.11（GPD 的对数似然与得分方程）**

在上述支撑条件下，当 $\xi\ne0$ 时，GPD 对数似然及其两个一阶偏导数由
$$
\begin{aligned}
\ell(\xi,\sigma)&=-k\log\sigma-\left(1+\frac1\xi\right)\sum_{i=1}^{k}\log z_i,\\
\frac{\partial\ell}{\partial\sigma}
&=-\frac{k}{\sigma}+\frac{1+\xi}{\sigma^2}\sum_{i=1}^{k}\frac{Y_i}{z_i},\\
\frac{\partial\ell}{\partial\xi}
&=\frac1{\xi^2}\sum_{i=1}^{k}\log z_i-\frac{1+\xi}{\xi}\sum_{i=1}^{k}\frac{Y_i}{\sigma z_i}
\end{aligned}
\qquad (z_i=1+\xi Y_i/\sigma)
\tag{32.17}
$$
给出。当 $\xi=0$ 时，对数似然连续延拓为 $\ell(0,\sigma)=-k\log\sigma-\sigma^{-1}\sum_{i=1}^{k}Y_i$。若极大似然估计是可允许参数区域的内点，则它必须满足两个得分同时为零。

**证明**

在支撑内部对式（32.13）求导。若 $\xi\ne0$，超出量密度为 $g_{\xi,\sigma}(y)=\sigma^{-1}(1+\xi y/\sigma)^{-1/\xi-1}$；若 $\xi=0$，密度为 $g_{0,\sigma}(y)=\sigma^{-1}\exp(-y/\sigma)$。把 $k$ 个密度相乘并取对数，立即得到式（32.17）的第一行以及 $\xi=0$ 时的连续表达式。这里的支撑条件不可省略，因为离开该区域后，乘积似然并不由这一表达式给出。

固定 $y$，对 $z=1+\xi y/\sigma$ 求偏导，得到 $\partial z/\partial\sigma=-\xi y/\sigma^2$ 和 $\partial z/\partial\xi=y/\sigma$。因此
$\partial\log z/\partial\sigma=-\xi y/(\sigma^2z)$，而 $\partial\log z/\partial\xi=y/(\sigma z)$。对数似然中 $\xi$ 还显式出现在因子 $1+1/\xi$ 内，故
$\partial[(1+1/\xi)\log z]/\partial\xi=-\xi^{-2}\log z+(1+1/\xi)y/(\sigma z)$。将这些导数逐项求和并乘以相应负号，就得到式（32.17）的两个得分。可微函数若在参数区域内点达到最大值，两个偏导数都必须为零，所以内点极大似然估计满足所述得分方程。

最后，固定 $y/\sigma=t$，展开 $\log(1+\xi t)=\xi t-\xi^2t^2/2+O(\xi^3)$。于是 $(1+1/\xi)\log(1+\xi t)=t+\xi(t-t^2/2)+O(\xi^2)$，令 $\xi\to0$ 即得到指数分布的对数似然。相同展开还给出 $\partial\ell/\partial\sigma$ 在 $\xi=0$ 处的连续值 $-k/\sigma+\sigma^{-2}\sum_iY_i$，以及 $\partial\ell/\partial\xi$ 的连续值 $\sum_i[Y_i^2/(2\sigma^2)-Y_i/\sigma]$。故 $\xi=0$ 不是表达式中的间断点，而是同一似然族中的连续极限。

□

式（32.17）通常没有同时给出 $\widehat\xi$ 与 $\widehat\sigma$ 的闭式解。计算时应在全部 $z_i>0$ 的约束下作二维数值最大化，或对每个固定的 $\xi$ 只关于 $\sigma$ 最大化，得到剖面对数似然 $\ell_p(\xi)=\max_{\sigma}\ell(\xi,\sigma)$。后一种做法既能减少优化维度，也能显示形状参数的不确定性。若把 $\xi$ 固定为零，则第一个得分给出闭式估计 $\widehat\sigma=k^{-1}\sum_iY_i$；这只是指数尾子模型的估计，不能冒充未约束 GPD 的极大似然估计。

数值结果还必须接受边界检查。当 $\xi<0$ 时，上端点 $-\sigma/\xi$ 随参数改变；若优化器把端点推向 $Y_{(k)}$，所得解可能位于边界，而在形状参数充分为负时还可能出现非正则或似然发散现象。此时不能把内点得分方程和通常的 Wald 标准误机械套用到该点。应报告支撑约束、检查不同初值与剖面曲线，并把边界解与内点解明确区分。

阈值选择依赖 GPD 的阈值稳定性。设阈值 $u$ 处的超出量服从参数为 $(\xi,\sigma_u)$ 的 GPD，取更高阈值 $v>u$。对支撑内部的 $y\ge0$，条件概率乘法公式给出
$\mathbb P(X-v>y\mid X>v)=\overline G_{\xi,\sigma_u}(v-u+y)/\overline G_{\xi,\sigma_u}(v-u)$。将 GPD 生存函数代入并约去共同因子，右端仍是一个形状为 $\xi$ 的 GPD 生存函数，只是尺度变为 $\sigma_u+\xi(v-u)$。因此，对 $v\ge u$ 有
$$
\sigma_v=\sigma_u+\xi(v-u),
\qquad \sigma_v-\xi v=\sigma_u-\xi u,
\qquad e(v)=\mathbb E[X-v\mid X>v]=\frac{\sigma_u+\xi(v-u)}{1-\xi}
\quad (\xi<1).
\tag{32.18}
$$
这里 $e(v)$ 是平均超出函数。第一式说明原始尺度通常随阈值改变，第二式说明修正尺度 $\sigma_v-\xi v$ 在模型内部保持不变，第三式说明平均超出函数在适用阈值以上呈线性，斜率为 $\xi/(1-\xi)$。当 $\xi=0$ 时，尺度和平均超出量均不随阈值变化；当 $\xi\ge1$ 时，模型均值不存在，不能用有限的理论平均超出函数解释经验图。

据此，阈值诊断应联合使用参数稳定图与平均超出图。对一系列候选阈值分别拟合 GPD，在横轴标出阈值，在纵轴标出 $\widehat\xi$、修正尺度 $\widehat\sigma_u-\widehat\xi u$ 及其置信区间；若模型已经近似成立，提高阈值后这些量应在抽样误差范围内保持稳定。平均超出图则应在同一区域近似为直线。选择稳定区域中较低的阈值，通常能在控制模型偏差的同时保留较多超出量；继续提高阈值只会增加方差，并使图形的随机波动加剧。

稳定性不是把每个点估计看成完全相等，也不是挑选最符合预期数值的阈值。低阈值处的显著趋势提示 GPD 近似可能过早介入，高阈值处的剧烈跳动可能只是样本稀缺。最终阈值应同时通过分布诊断、超越率检查和阈值敏感性分析，并报告改变阈值后关键结论的范围。若数据经过除簇，以上拟合和诊断都应以簇峰值及有效簇数为基础。不存在脱离数据依赖结构、暴露长度和尾部问题而普遍适用的固定超出量个数。

### 32.4.3 标准误与诊断图

点估计的精度可以由 Fisher 信息刻画。令 $\boldsymbol\theta=(\sigma,\xi)^\top$，并记单个超出量的得分向量为 $\boldsymbol s(Y;\boldsymbol\theta)$。在独立同分布抽样下，$k$ 个超出量的信息是单个观测信息的 $k$ 倍。

**定理 32.12（GPD 极大似然估计的信息与渐近标准误）**

设真实参数位于支撑内部，真实形状参数满足 $\xi>-1/2$，且 $Y_1,\ldots,Y_k$ 独立同分布于相应 GPD。则通常的极大似然渐近展开成立，$\sqrt k(\widehat{\boldsymbol\theta}-\boldsymbol\theta)$ 依分布收敛到均值向量为 $\boldsymbol0$、协方差矩阵为 $I(\boldsymbol\theta)^{-1}$ 的二维正态分布，其中
$$
I(\boldsymbol\theta)=\frac1{1+2\xi}
\begin{pmatrix}
\sigma^{-2}&\{\sigma(1+\xi)\}^{-1}\\
\{\sigma(1+\xi)\}^{-1}&2(1+\xi)^{-1}
\end{pmatrix},
\qquad
I(\boldsymbol\theta)^{-1}=
\begin{pmatrix}
2\sigma^2(1+\xi)&-\sigma(1+\xi)\\
-\sigma(1+\xi)&(1+\xi)^2
\end{pmatrix}.
\tag{32.19}
$$
于是估计量 $\widehat\xi$ 与 $\widehat\sigma$ 的渐近标准误分别为 $(1+\widehat\xi)/\sqrt k$ 与 $\widehat\sigma\sqrt{2(1+\widehat\xi)/k}$，其渐近协方差为 $-\widehat\sigma(1+\widehat\xi)/k$。

**证明**

先在真实参数下作概率积分变换。当 $\xi\ne0$ 时，令 $W=\xi^{-1}\log(1+\xi Y/\sigma)$；当 $\xi=0$ 时，令 $W=Y/\sigma$。对 $w\ge0$，事件 $W>w$ 等价于 $Y>\sigma(e^{\xi w}-1)/\xi$，右端在 $\xi=0$ 处按 $\sigma w$ 连续解释。代入 GPD 生存函数得到 $\mathbb P(W>w)=(e^{\xi w})^{-1/\xi}=e^{-w}$，所以 $W$ 服从均值为 $1$ 的指数分布。再令 $A=e^{-\xi W}$，由指数密度积分得到 $\mathbb E[W]=1$、$\mathbb E[A]=(1+\xi)^{-1}$、$\mathbb E[WA]=(1+\xi)^{-2}$。

由定理 32.11，单个观测的两个得分可分别改写为 $s_\sigma=[1-(1+\xi)A]/(\sigma\xi)$ 与 $s_\xi=[\xi W-(1+\xi)+(1+\xi)A]/\xi^2$。于是 $\mathbb E[s_\sigma]=(\sigma\xi)^{-1}[1-(1+\xi)(1+\xi)^{-1}]=0$，并且 $\mathbb E[s_\xi]=\xi^{-2}[\xi-(1+\xi)+(1+\xi)(1+\xi)^{-1}]=0$。这验证了得分在真实参数处中心化。$\xi=0$ 时取连续极限，两个得分分别为 $(W-1)/\sigma$ 与 $W^2/2-W$，其期望仍为零。

为计算二阶矩，再使用 $\mathbb E[W^2]=2$ 和 $\mathbb E[A^2]=(1+2\xi)^{-1}$。后一积分恰在 $\xi>-1/2$ 时有限，这也是通常二阶信息展开所要求的关键范围。Fisher 信息矩阵的元素为 $I_{ab}=\mathbb E[s_as_b]$，其中下标 $a,b$ 取 $\sigma$ 或 $\xi$；得分均值为零保证了这些二阶矩同时也是得分协方差。
具体地，令 $c=1+\xi$、$d=1+2\xi$。由上述矩直接计算得到
$\mathbb E[s_\sigma^2]=(\sigma\xi)^{-2}[1-2c\mathbb E[A]+c^2\mathbb E[A^2]]=(\sigma^2d)^{-1}$。又如
$\mathbb E[(\xi W-c+cA)^2]=2\xi^2+c^2+c^2d^{-1}-2\xi c+2\xi c^{-1}-2c=2\xi^4(cd)^{-1}$，故 $\mathbb E[s_\xi^2]=2(cd)^{-1}$。交叉项的展开给出
$\mathbb E[(1-cA)(\xi W-c+cA)]=c-\xi c^{-1}-c^2d^{-1}=\xi^3(cd)^{-1}$，从而 $\mathbb E[s_\sigma s_\xi]=\{\sigma(1+\xi)(1+2\xi)\}^{-1}$。三个元素合并即为式（32.19）中的信息矩阵。

该矩阵的行列式为 $[\sigma^2(1+\xi)^2(1+2\xi)]^{-1}$，在所述参数区域内严格为正。按二阶矩阵求逆公式便得到式（32.19）的逆矩阵。$\xi=0$ 时，利用 $\mathbb E[W^3]=6$ 重新计算三个二阶矩，结果分别为 $\sigma^{-2}$、$\sigma^{-1}$ 与 $2$，恰为上述矩阵的连续极限。

在真实参数的充分小邻域内，支撑条件保持不变，对数似然的前三阶导数存在，且第三阶导数由可积函数控制；$\xi>-1/2$ 恰好保证得分二阶矩有限。对得分方程在真实参数处作泰勒展开，再以大数定律处理二阶导数矩阵、以中心极限定理处理标准化得分和，便得到 $\widehat{\boldsymbol\theta}$ 的渐近线性表示及所述正态极限。最后由 Slutsky 定理，以一致估计代入 $I(\boldsymbol\theta)^{-1}$，得到对角元素平方根除以 $\sqrt k$ 的标准误。

□

实际报告应同时给出参数估计、标准误和支撑约束检查结果。Wald 区间只适用于内点且样本量足够的情形；当 $\widehat\xi$ 接近 $-1/2$ 时，信息矩阵病态，正态近似可能很差。此时宜报告剖面似然区间，并用参数自助法重复整个阈值选择与拟合过程。观测信息可作为曲率诊断，但不能在信息二阶矩不存在时替代有限 Fisher 信息的解释。
### 32.4.4 分布诊断与尾指数

拟合后的概率—概率图和分位数—分位数图直接检查 GPD 是否描述了超出量的形状。将超出量排序为 $Y_{(1)}\le\cdots\le Y_{(k)}$，取绘图位置 $p_i=(i-1/2)/k$，并令 $\widehat G$ 为拟合分布。概率—概率图比较 $\widehat G(Y_{(i)})$ 与 $p_i$；分位数—分位数图比较 $Y_{(i)}$ 与 $\widehat G^{-1}(p_i)$。当 $\widehat\xi\ne0$ 时，后者为 $\widehat\sigma\widehat\xi^{-1}[(1-p_i)^{-\widehat\xi}-1]$；当 $\widehat\xi=0$ 时则为 $-\widehat\sigma\log(1-p_i)$。这些表达式只在相应支撑内使用。

点线偏离不能只凭肉眼裁决。应在相同 $k$ 下从拟合 GPD 重复模拟样本，每次重新估计参数并重新计算绘图统计量，以形成逐点或同时覆盖带。若系统性弯曲出现在多个阈值且超出覆盖带，说明尾部模型或独立性假设可能不成立；若偏离只来自最高几个点，则应结合其杠杆作用和模拟波动判断。对聚簇数据，未除簇的普通图会因重复极端值而产生虚假密集，自助模拟也必须保留簇结构。

尾指数把 GPD 形状参数与重尾程度联系起来。当 $\xi>0$ 且 $y\to\infty$ 时，
$\overline G_{\xi,\sigma}(y)=(\xi y/\sigma)^{-1/\xi}[1+\sigma/(\xi y)]^{-1/\xi}\sim(\sigma/\xi)^{1/\xi}y^{-1/\xi}$。因此尾部是正则变差函数，尾指数为 $\alpha=1/\xi$；$\xi$ 越大，幂律衰减越慢。若原始分布只在阈值 $u$ 以上服从该模型，则对 $x>u$ 有 $\overline F(x)=\overline F(u)\overline G_{\xi,\sigma}(x-u)$，所以原始损失也具有相同尾指数。$\xi=0$ 对应指数型衰减，$\xi<0$ 对应有限上端点，这两种情形都不能解释为具有某个有限正尾指数的幂律尾。
### 32.4.5 矩的存在性与有限矩公式

GPD 的密度与生存函数满足恒等式 $\overline G_{\xi,\sigma}(y)=(\sigma+\xi y)g_{\xi,\sigma}(y)$。对正整数 $m$，在矩有限时利用 $Y$ 的非负性和分部积分，可得
$\mathbb E[Y^m]=m\int_0^\infty y^{m-1}\overline G_{\xi,\sigma}(y)\,dy=m\sigma\mathbb E[Y^{m-1}]+m\xi\mathbb E[Y^m]$。重尾情形下的边界项 $y^m\overline G_{\xi,\sigma}(y)$ 恰在 $m\xi<1$ 时趋于零；有限端点情形下的边界项也因生存函数在端点为零而消失。因此
$(1-m\xi)\mathbb E[Y^m]=m\sigma\mathbb E[Y^{m-1}]$。

从 $\mathbb E[Y^0]=1$ 逐项代入递推式，得到 $\mathbb E[Y^m]=m!\sigma^m/\prod_{j=1}^m(1-j\xi)$，条件为 $\xi<1/m$。特别地，$\mathbb E[Y]=\sigma/(1-\xi)$ 要求 $\xi<1$，而 $\mathbb E[Y^2]=2\sigma^2/[(1-\xi)(1-2\xi)]$ 要求 $\xi<1/2$。再减去均值平方，得到 $\operatorname{Var}(Y)=\sigma^2/[(1-\xi)^2(1-2\xi)]$。三阶矩为 $6\sigma^3/\prod_{j=1}^3(1-j\xi)$，要求 $\xi<1/3$；四阶矩要求 $\xi<1/4$。$\xi=0$ 时，这些公式连续地化为指数分布的各阶矩。

当 $\xi>0$ 时，对任意实数 $r>0$，正则变差尾的积分判别表明 $\mathbb E[Y^r]$ 在 $r<1/\xi$ 时有限，在 $r\ge1/\xi$ 时发散；等号处的积分呈对数发散。因而 $\xi\ge1$ 时均值不存在，$1/2\le\xi<1$ 时均值存在而方差不存在。当 $\xi<0$ 时，超出量有有限上端点，所有正阶矩均有限。对非负原始损失 $X$，阈值以下部分被 $u$ 控制，所以 $X$ 的相应无条件矩与超出量的矩具有相同的有限性结论。矩不存在并不等于样本均值或样本方差无法计算，而是这些样本量没有有限总体目标，不能据此进行通常的矩匹配或中心极限定理解释。
## 32.5 极值理论在尾部风险度量中的应用

本节把损失记为 $X$，其分布函数为 $F$，并令 $\operatorname{VaR}_\alpha(X)=\inf\{x:F(x)\ge\alpha\}$。对连续损失，预期短缺定义为 $\operatorname{ES}_\alpha(X)=(1-\alpha)^{-1}\int_\alpha^1\operatorname{VaR}_s(X)\,ds$。POT 模型把 $u$ 以上的尾部写成 $\overline F(x)=p_u\overline G_{\xi,\sigma}(x-u)$，其中 $p_u=\mathbb P(X>u)$。这一表示既能外推样本最大值以外的分位数，也能直接把尾指数与预期短缺的有限性联系起来。

**定理 32.13（GPD 尾部的高分位风险度量）**

设 $F$ 在 $u$ 以上连续且严格递增，对 $x\ge u$ 有上述 GPD 尾模型，$0<p_u<1$，且置信水平满足 $\alpha>1-p_u$。则对任意可容许的形状参数，
$$
\operatorname{VaR}_\alpha(X)=
\begin{cases}
u+\dfrac{\sigma}{\xi}\left[\left(\dfrac{1-\alpha}{p_u}\right)^{-\xi}-1\right],&\xi\ne 0,\\[6pt]
u+\sigma\log\left(\dfrac{p_u}{1-\alpha}\right),&\xi=0.
\end{cases}
\tag{32.20}
$$
若进一步有 $\xi<1$，则
$$
\operatorname{ES}_\alpha(X)
=\frac{\operatorname{VaR}_\alpha(X)+\sigma-\xi u}{1-\xi},
\tag{32.21}
$$
其中 $\xi=0$ 时右端为 $\operatorname{VaR}_\alpha(X)+\sigma$。若 $\xi\ge1$，每个 $\alpha<1$ 的风险价值仍有限，但预期短缺为无穷大。
**证明**

记 $\varepsilon=1-\alpha$ 和 $q=\operatorname{VaR}_\alpha(X)$。由 $\varepsilon<p_u$ 以及尾部的连续严格递增性，$q>u$ 且 $\overline F(q)=\varepsilon$。当 $\xi\ne0$ 时，尾部方程给出
$\varepsilon/p_u=[1+\xi(q-u)/\sigma]^{-1/\xi}$。两边取 $-\xi$ 次幂，再依次减去 $1$、乘以 $\sigma/\xi$，便得到式（32.20）的第一支。当 $\xi=0$ 时，尾部方程为 $\varepsilon/p_u=\exp[-(q-u)/\sigma]$，取对数即得第二支；它也可由第一支利用 $\varepsilon/p_u<1$ 附近的连续极限得到。

由于 $F(q)=\alpha$，分位数积分可改写成尾部积分：
$\int_\alpha^1\operatorname{VaR}_s(X)\,ds=\mathbb E[X\mathbf1_{\{X>q\}}]=q\varepsilon+\mathbb E[(X-q)_+]$。因此
$\operatorname{ES}_\alpha(X)=q+\varepsilon^{-1}\mathbb E[(X-q)_+]$。另一方面，对 $y\ge0$，条件概率乘法公式与 GPD 生存函数给出
$\mathbb P(X-q>y\mid X>q)=\overline F(q+y)/\overline F(q)=[1+\xi y/\sigma_q]^{-1/\xi}$，其中 $\sigma_q=\sigma+\xi(q-u)$；$\xi=0$ 时右端按 $\exp(-y/\sigma_q)$ 解释。这说明超过 $q$ 后的超出量仍服从 GPD，只是尺度更新为 $\sigma_q$。
由非负随机变量的尾积分公式，
$\mathbb E[(X-q)_+]=\varepsilon\int_0^\infty\mathbb P(X-q>y\mid X>q)\,dy$。当 $\xi<1$ 时，直接代换可得 $\int_0^\infty(1+\xi y/\sigma_q)^{-1/\xi}\,dy=\sigma_q/(1-\xi)$，而 $\xi=0$ 时指数积分为 $\sigma_q$。代回即得
$\operatorname{ES}_\alpha(X)=q+\sigma_q/(1-\xi)=[q+\sigma+\xi(q-u)]/(1-\xi)=(q+\sigma-\xi u)/(1-\xi)$，这就是式（32.21）。当 $\xi\ge1$ 时，上述幂函数积分的被积函数按 $y^{-1/\xi}$ 衰减，积分阶数不高于 $-1$，故积分发散；$\xi=1$ 时是对数发散。

□

式（32.20）中的连续极限是固定 $u$、$\sigma$、$p_u$ 和 $\alpha$ 后令 $\xi\to0$。实际估计使用 $\widehat p_u=k/n$、$\widehat\xi$ 和 $\widehat\sigma$ 的插入值，并重新检查 $\widehat\sigma+\widehat\xi(\widehat q-u)>0$。风险量的标准误可由定理 32.12 的协方差矩阵和 Delta 法计算：对式（32.20）关于 $(\sigma,\xi,p_u)$ 求梯度，再以梯度左乘、右乘参数渐近协方差矩阵。式（32.21）同理，但要把风险价值与参数视为同一个插入函数联合求导。由于高风险水平下函数对 $\xi$ 常呈强非线性，剖面似然区间或重新估计全部参数的自助区间通常比对称 Wald 区间更可靠。
### 32.5.1 次阈值数据的联合利用

POT 的条件似然只用超出量估计 $(\xi,\sigma)$，但次阈值数据并非无用：它们决定阈值超越率，还可以通过整体分布模型提供关于尾部质量的额外信息。关键在于区分“利用观测个数”和“利用观测数值”，并避免把同一信息重复计入似然。

**命题 32.14（整体模型与 GPD 尾部的似然分解）**

设 $X_1,\ldots,X_n$ 独立同分布，阈值以下具有密度 $b(x;\boldsymbol\eta)$，且 $\int_{-\infty}^u b(x;\boldsymbol\eta)\,dx=1-p_u(\boldsymbol\eta)$；阈值以上的密度为 $p_u(\boldsymbol\eta)g_{\xi,\sigma}(x-u)$。若恰有 $k$ 个观测超过 $u$，则全数据似然为
$$
L_n(\boldsymbol\eta,\xi,\sigma)=
\left[\prod_{i:X_i\le u}b(X_i;\boldsymbol\eta)\right]
[p_u(\boldsymbol\eta)]^k
\left[\prod_{i:X_i>u}g_{\xi,\sigma}(X_i-u)\right].
\tag{32.22}
$$
若 $\boldsymbol\eta$ 与 $(\xi,\sigma)$ 没有交叉约束，则 $(\xi,\sigma)$ 的极大似然估计与仅用超出量的条件极大似然估计相同，而次阈值观测通过 $\boldsymbol\eta$ 和 $p_u$ 改进尾概率估计。
**证明**

每个次阈值观测贡献密度因子 $b(X_i;\boldsymbol\eta)$，每个超出观测贡献密度因子 $p_u(\boldsymbol\eta)g_{\xi,\sigma}(X_i-u)$。将 $n$ 个因子按观测是否超过 $u$ 分组，$p_u$ 恰出现 $k$ 次，便得到式（32.22）。取对数后，含有 $(\xi,\sigma)$ 的项只有 $\sum_{i:X_i>u}\log g_{\xi,\sigma}(X_i-u)$；在没有交叉约束时，另外两项对这两个参数的偏导数为零，故最大化条件与条件似然完全相同。

再考察阈值以下不作参数化的半参数模型。令 $m=n-k$，给每个次阈值观测分配质量 $w_i$，并约束 $\sum_{i:X_i\le u}w_i=1-p_u$。固定 $p_u$ 后，拉格朗日乘子条件给出所有 $w_i$ 相等，因此 $w_i=(1-p_u)/m$。代入对数似然，与 $p_u$ 有关的部分为 $m\log(1-p_u)+k\log p_u$。其一阶导数为 $-m/(1-p_u)+k/p_u$，令其为零得到 $k(1-p_u)=mp_u$，即 $p_u=k/n$；二阶导数严格为负，故这是唯一最大值。此时每个次阈值权重均为 $1/n$，而 GPD 部分仍由超出量估计。

□

因此，经验超越率 $k/n$ 已经利用了全部 $n$ 个观测的位置分类，但次阈值观测的具体大小不会影响无交叉约束的尾部形状与尺度。若要求混合密度在 $u$ 处连续，则需加入 $b(u;\boldsymbol\eta)=p_u(\boldsymbol\eta)/\sigma$；这会耦合两侧参数，并可能提高效率，也会把主体分布误设传递到尾部。对聚簇或序列相关数据，式（32.22）的独立乘积不再成立，应按簇构造似然或使用保留依赖结构的自助法。
### 32.5.2 与历史模拟和参数法的比较

历史模拟直接用经验分布估计风险量。令 $F_n(x)=n^{-1}\sum_{i=1}^n\mathbf1_{\{X_i\le x\}}$，$Q_n(s)=\inf\{x:F_n(x)\ge s\}$，则其定义为
$$
\widehat{\operatorname{VaR}}_\alpha^{HS}=Q_n(\alpha),
\qquad
\widehat{\operatorname{ES}}_\alpha^{HS}
=\frac1{1-\alpha}\int_\alpha^1Q_n(s)\,ds.
\tag{32.23}
$$
若 $m=n(1-\alpha)$ 为整数，第二个估计量恰为最大的 $m$ 个次序统计量的算术平均。该方法不需要选择分布族，并保留经验分布中的非对称性；但在极高的 $\alpha$ 下，它只能依赖极少数观测，不能可靠外推超过样本最大值的风险。其置信区间也应由次序统计量理论或保留时间依赖的区组自助法得到，而不能把相关损失当作独立抽样。

整体参数法先假设 $F$ 属于某个低维分布族，再由全部观测估计参数并计算风险量。它能平滑经验分位数，却可能让主体区域的大量观测支配尾部拟合。GPD 方法只规定阈值以上的形状，减少主体误设的直接影响，代价是阈值偏差、较少超出量以及对外推模型的依赖。三者的差别不是“无模型”与“有模型”的简单对立，而是经验尾部不可外推、整体参数尾部受全局约束、POT 尾部受局部约束之间的偏差—方差权衡。

**命题 32.15（正态参数法风险度量）**

设 $X\sim N(\mu,\tau^2)$，$z_\alpha=\Phi^{-1}(\alpha)$，$\varphi$ 为标准正态密度，则
$$
\operatorname{VaR}_\alpha(X)=\mu+\tau z_\alpha,
\qquad
\operatorname{ES}_\alpha(X)=\mu+\tau\frac{\varphi(z_\alpha)}{1-\alpha}.
\tag{32.24}
$$
**证明**

标准化给出 $\mathbb P(X\le\mu+\tau z_\alpha)=\Phi(z_\alpha)=\alpha$，故第一式成立。对预期短缺的分位数积分作代换 $s=\Phi(z)$，则 $ds=\varphi(z)\,dz$，且 $\operatorname{VaR}_s(X)=\mu+\tau z$。于是
$\int_\alpha^1\operatorname{VaR}_s(X)\,ds=\mu(1-\alpha)+\tau\int_{z_\alpha}^\infty z\varphi(z)\,dz$。由 $\varphi'(z)=-z\varphi(z)$，最后一个原函数为 $-\varphi(z)$，其在无穷远处为零，所以积分等于 $\varphi(z_\alpha)$。除以 $1-\alpha$ 即得第二式。

□

正态尾的密度和生存函数均为指数型衰减，不能在其尾部重现 $\xi>0$ 的幂律。学生 $t$ 分布可以产生幂律尾，但整体拟合会把尾部形状与主体峰度、偏度约束在同一参数族中。历史模拟、整体参数法与 GPD 估计应在多个高风险水平上并列报告，并通过样本外回测、阈值敏感性和模型置信区间检验结论，而不能只按样本内拟合优度选取最小风险值。

**例 32.4**

某组合有 $n=2000$ 个独立日损失观测，取 $u=10$ 后有 $k=100$ 个超出量，GPD 拟合给出 $\widehat\xi=0.25$、$\widehat\sigma=4$。求 $99\%$ 与 $99.9\%$ 的风险价值和预期短缺，并说明历史模拟的信息基础。

**解**

超越率估计为 $\widehat p_u=100/2000=0.05$。在 $99\%$ 水平，$(1-\alpha)/\widehat p_u=0.01/0.05=0.2$，故
$\widehat{\operatorname{VaR}}_{0.99}=10+16(5^{1/4}-1)=17.9256$，而
$\widehat{\operatorname{ES}}_{0.99}=(17.9256+4-0.25\times10)/0.75=25.9008$。在 $99.9\%$ 水平，相应比值为 $0.001/0.05=0.02$，所以
$\widehat{\operatorname{VaR}}_{0.999}=10+16(50^{1/4}-1)=36.5464$，且 $\widehat{\operatorname{ES}}_{0.999}=50.7285$。

历史模拟在 $99\%$ 水平的预期短缺只平均约 $20$ 个最大观测，在 $99.9\%$ 水平只平均约 $2$ 个最大观测；GPD 则利用全部 $100$ 个超出量估计尾形并进行模型外推。定理 32.12 还给出的 $\widehat\xi$ 标准误为 $1.25/10=0.125$，$\widehat\sigma$ 标准误为 $4\sqrt{2.5/100}=0.6325$。这些不确定性必须继续传递到风险量，不能把上述小数精度解释为真实风险已被同等精确地识别。
### 32.5.3 多期风险标度

多期损失记为 $S_h=\sum_{i=1}^hX_i$。所谓时间标度必须说明固定的是持有期还是置信水平，并区分有限样本公式与渐近近似。对重尾损失，高分位数随持有期的增长由尾指数控制，而不是由通常的平方根规则自动控制。

**定理 32.16（独立重尾损失的多期尾部标度）**

设 $X_1,\ldots,X_h$ 为独立同分布的非负损失，$F$ 在尾部连续且严格递增，生存函数 $\overline F$ 是指数为 $-\alpha$ 的正则变差函数，其中 $\alpha=1/\xi>0$。则对固定正整数 $h$，
$$
\overline F_{S_h}(x)=\mathbb P(S_h>x)\sim h\overline F(x),
\qquad x\to\infty.
\tag{32.25}
$$
并且当 $\varepsilon\downarrow0$ 时，
$$
\operatorname{VaR}_{1-\varepsilon}(S_h)
\sim h^\xi\operatorname{VaR}_{1-\varepsilon}(X_1).
\tag{32.26}
$$
若 $0<\xi<1$，进一步有
$$
\operatorname{ES}_{1-\varepsilon}(S_h)
\sim h^\xi\operatorname{ES}_{1-\varepsilon}(X_1),
\qquad \varepsilon\downarrow0.
\tag{32.27}
$$
**证明**

先证明尾和公式。记 $q=\overline F(x)$。由于 $S_h$ 不小于各分量中的最大值， inclusion--exclusion 给出
$\mathbb P(S_h>x)\ge1-(1-q)^h\sim hq$。另一方面，取 $0<\delta<1$，若 $S_h>x$，则或者某个 $X_i>(1-\delta)x$，或者至少两个分量同时大于 $\delta x/h$；否则总和至多为 $(1-\delta)x+(h-1)\delta x/h<x$。因此
$$
\frac{\mathbb P(S_h>x)}{\overline F(x)}
\le h\frac{\overline F((1-\delta)x)}{\overline F(x)}
+\binom h2\frac{\overline F(\delta x/h)^2}{\overline F(x)}.
$$
正则变差性使第一项趋于 $h(1-\delta)^{-\alpha}$，而
$\overline F(\delta x/h)^2/\overline F(x)\sim(\delta/h)^{2\alpha}\overline F(x)\to0$。先令 $x\to\infty$，再令 $\delta\downarrow0$，与下界合并即得式（32.25）。

令 $q_\varepsilon=\operatorname{VaR}_{1-\varepsilon}(X_1)$。尾部连续且严格递增保证 $\overline F(q_\varepsilon)=\varepsilon$。由式（32.25）和正则变差性，
$\overline F_{S_h}(h^\xi q_\varepsilon)\sim h\overline F(h^\xi q_\varepsilon)\sim hh^{-\alpha\xi}\varepsilon=\varepsilon$。对任意 $\eta>0$，在 $(1\pm\eta)h^\xi q_\varepsilon$ 处重复此计算，所得极限分别为 $(1\pm\eta)^{-\alpha}\varepsilon$。当 $\varepsilon$ 足够小时，这两个尾概率分别小于和大于 $\varepsilon$，故
$(1-\eta)h^\xi q_\varepsilon\le\operatorname{VaR}_{1-\varepsilon}(S_h)\le(1+\eta)h^\xi q_\varepsilon$。令 $\varepsilon\downarrow0$ 后再令 $\eta\downarrow0$，即得式（32.26）。
最后证明预期短缺的标度。对任意尾部分布记 $I(q)=\int_q^\infty\overline F(x)\,dx$。取 $1<\beta<\alpha$ 和 $a>1$。正则变差在紧集上的一致收敛性给出 $q_0$，使得 $q\ge q_0$ 时，对 $1\le t\le a$ 一致有 $\overline F(tq)/\overline F(q)\le(1+\delta)t^{-\alpha}$，并可使右端不超过 $t^{-\beta}$ 在 $t=a$ 处传递所需的常数。把 $t=a^ks$（$1\le s\le a$）对应的比值分解为各区间比值之积，得到可积控制 $\overline F(tq)/\overline F(q)\le t^{-\beta}$。于是控制收敛与逐点极限给出
$$
\lim_{q\to\infty}\int_1^\infty\frac{\overline F(tq)}{\overline F(q)}\,dt
=\int_1^\infty t^{-\alpha}\,dt=\frac1{\alpha-1}.
$$
因此 $I(q)\sim q\overline F(q)/(\alpha-1)$。对连续分布，尾积分恒等式给出
$\operatorname{ES}_{1-\varepsilon}=q_\varepsilon+\varepsilon^{-1}I(q_\varepsilon)$。将这一结论分别用于 $X_1$ 与 $S_h$，并用 $\overline F_{S_h}(q_{h,\varepsilon})=\varepsilon$、$q_{h,\varepsilon}\sim h^\xi q_\varepsilon$，得两者均渐近等于 $\alpha q_\varepsilon/(\alpha-1)$ 的相应形式，故式（32.27）成立。

□

若 $X_i$ 独立且同为 $N(\mu,\tau^2)$，则精确关系为
$\operatorname{VaR}_\alpha(S_h)=h\mu+\sqrt h\tau z_\alpha$，而
$\operatorname{ES}_\alpha(S_h)=h\mu+\sqrt h\tau\varphi(z_\alpha)/(1-\alpha)$。所以平方根规则只标度随机离差，均值项按 $h$ 增长。若存在相关、波动聚集或参数时变，必须先建立多期联合模型，不能把独立公式直接用于重叠持有期。
上述证明中的逐段估计可严格写成常数控制：若 $t=a^ks$，$1\le s\le a$，完整区间的比值各不超过 $a^{-\beta}$，末段比值不超过 $1+\delta$，故乘积不超过 $(1+\delta)a^{-k\beta}\le(1+\delta)a^\beta t^{-\beta}$。常数不影响控制收敛，随后令 $\beta\uparrow\alpha$ 并对有限积分取下极限，即得到所示积分值。

GPD 高分位估计可明确写成阈值、超出率与尾参数的函数。令 $\widehat p_u=k/n$，置信水平 $\alpha>1-\widehat p_u$，则在 $\widehat\xi>0$ 时
$$
\widehat{\operatorname{VaR}}_\alpha
=u+\frac{\widehat\sigma}{\widehat\xi}
\left[\left(\frac{1-\alpha}{\widehat p_u}\right)^{-\widehat\xi}-1\right],
\qquad
\widehat{\operatorname{ES}}_\alpha
=\frac{\widehat{\operatorname{VaR}}_\alpha+\widehat\sigma-\widehat\xi u}{1-\widehat\xi},
\quad 0<\widehat\xi<1.
\tag{32.28}
$$
事实上，尾生存函数为 $\widehat p_u[1+\widehat\xi(x-u)/\widehat\sigma]^{-1/\widehat\xi}$。令其等于 $1-\alpha$ 并解出 $x$，即得风险价值。GPD 在 $q>u$ 时的条件平均超出量为 $(\widehat\sigma+\widehat\xi(q-u))/(1-\widehat\xi)$，再加上 $q$ 并化简，即得预期短缺；$\widehat\xi<1$ 保证条件均值有限。$\widehat\xi=0$ 时应对第一式取连续极限 $u+\widehat\sigma\log[\widehat p_u/(1-\alpha)]$，而 $\widehat\xi\ge1$ 时模型预期短缺为无穷大，不能用有限的代数外推代替这一结论。
历史模拟直接以经验分位数和尾部样本均值估计风险，不预设分布形状，并能保留观测中的偏度与厚尾；其代价是高分位信息稀疏，经验预期短缺对少数极端观测极敏感，且样本之外没有定义良好的外推。整体参数法以少量参数汇总全部数据，正态法计算最简，学生 $t$ 等厚尾族可改善尾部，却可能为了迁就主体而误配极端区域。GPD 法集中使用超出量，能外推到样本最大观测之外，但阈值过低会引入非 GPD 主体造成偏差，阈值过高又使超出量过少而增大方差。因此应同时报告不同阈值、置信区间与样本外违约检验；历史模拟适合作为非参数基准，整体参数法适合作为结构基准，两者都不能替代尾部诊断。

**例 32.5**

沿用例 32.4 的日损失 GPD 拟合，暂时假设日损失独立同分布，估计持有 $10$ 日的 $99\%$ 极端风险标度，并与独立正态离差比较。

**解**

此处 $\xi=0.25$，定理 32.16 给出 $10^{0.25}=1.7783$。因此日风险价值 $17.9256$ 对应的十日极端近似为 $17.9256\times1.7783=31.8690$，日预期短缺 $25.9008$ 对应的近似为 $46.0527$。若改为零均值独立正态模型，则十日风险价值和预期短缺均为相应日值的 $\sqrt{10}=3.1623$ 倍。两种倍数回答的是不同尾模型下的问题，不能混用；重尾近似还是 $\varepsilon\downarrow0$ 时的渐近关系，不是固定的 $99\%$ 水平上的精确等式。若日损失存在自相关或共同冲击，独立性前提失效，必须先估计多期尾部而不能机械套用任一倍数。
## 32.6 组合风险与相依性

### 32.6.1 组合风险价值的解析近似

设 $d$ 个头寸在同一持有期内的损失向量为 $\boldsymbol X=(X_1,\ldots,X_d)^\top$，固定权重向量为 $\boldsymbol w$，组合损失为 $L_{\boldsymbol w}=\boldsymbol w^\top\boldsymbol X$。这里的权重是损失暴露的线性系数，而不必是总和为一的投资比例；空头、期权对冲与外汇折算都可并入这些系数。组合风险不能由各头寸的风险价值相加得到，因为联合分布决定了极端损失是否同时出现。

**定理 32.17（正态线性组合的风险度量）**

设 $\boldsymbol X\sim N(\boldsymbol\mu,\boldsymbol\Sigma)$，令 $m_{\boldsymbol w}=\boldsymbol w^\top\boldsymbol\mu$、$s_{\boldsymbol w}=\sqrt{\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w}$，且 $s_{\boldsymbol w}>0$。则对 $0<p<1$，
$$
\operatorname{VaR}_p(L_{\boldsymbol w})=m_{\boldsymbol w}+s_{\boldsymbol w}z_p,
\qquad
\operatorname{ES}_p(L_{\boldsymbol w})=m_{\boldsymbol w}+s_{\boldsymbol w}\frac{\varphi(z_p)}{1-p}.
\tag{32.29}
$$

**证明**

正态向量的线性变换仍为正态分布。由期望与协方差的双线性性，
$\mathbb E[L_{\boldsymbol w}]=m_{\boldsymbol w}$，且
$\operatorname{Var}(L_{\boldsymbol w})=\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w=s_{\boldsymbol w}^2$。所以 $(L_{\boldsymbol w}-m_{\boldsymbol w})/s_{\boldsymbol w}$ 服从标准正态分布。将命题 32.15 用于位置参数 $m_{\boldsymbol w}$ 和尺度参数 $s_{\boldsymbol w}$，即同时得到两式。

□

式（32.29）把估计联合分布压缩为估计均值向量和协方差矩阵。若 $\boldsymbol\Sigma$ 只是半正定且 $s_{\boldsymbol w}=0$，则组合损失退化为常数 $m_{\boldsymbol w}$，两式仍以 $s_{\boldsymbol w}=0$ 连续成立。协方差展开还给出 $s_{\boldsymbol w}^2=\sum_iw_i^2\sigma_i^2+2\sum_{i<j}w_iw_j\operatorname{Cov}(X_i,X_j)$，因此分散化来自交叉项，而不是来自风险价值本身的普遍次可加性。
对非线性头寸，设组合价值为 $V(t,\boldsymbol S)$，风险因子变动为 $\Delta\boldsymbol S$。二阶泰勒展开给出损失近似
$L\approx-V_t h-(\nabla V)^\top\Delta\boldsymbol S-\tfrac12\Delta\boldsymbol S^\top\nabla^2V\,\Delta\boldsymbol S$。舍去二次项即为 delta--正态近似：若 $\Delta\boldsymbol S$ 服从正态分布，就把 $-V_t h-(\nabla V)^\top\Delta\boldsymbol S$ 代入式（32.29）。保留 gamma 项后损失是二次型，通常不再正态，不能仍用同一标准差公式；此时应使用二次型分布或经过矩匹配的近似，并检验对冲方向是否被一阶项漏掉。

**定理 32.18（厚尾椭圆组合的高分位标度）**

设 $\boldsymbol X=\boldsymbol\mu+R\boldsymbol A\boldsymbol U$，其中 $\boldsymbol U$ 在单位球面均匀分布，$R\ge0$ 与 $\boldsymbol U$ 独立。令 $Y=RU_1$，其生存函数满足 $\overline F_Y(y)\sim cy^{-\beta}$，其中 $c>0$、$\beta>1$。若 $s_{\boldsymbol w}=\|\boldsymbol A^\top\boldsymbol w\|_2>0$，$q_\varepsilon=\operatorname{VaR}_{1-\varepsilon}(Y)$，则
$$
\operatorname{VaR}_{1-\varepsilon}(L_{\boldsymbol w})
=m_{\boldsymbol w}+s_{\boldsymbol w}q_\varepsilon
\sim s_{\boldsymbol w}(c/\varepsilon)^{1/\beta},
\quad
\operatorname{ES}_{1-\varepsilon}(L_{\boldsymbol w})
\sim\frac\beta{\beta-1}s_{\boldsymbol w}(c/\varepsilon)^{1/\beta}.
\tag{32.30}
$$

**证明**

旋转不变性表明，只要 $\|\boldsymbol a\|_2=s_{\boldsymbol w}$，就有 $\boldsymbol a^\top\boldsymbol U$ 与 $s_{\boldsymbol w}U_1$ 同分布。取 $\boldsymbol a=\boldsymbol A^\top\boldsymbol w$，再乘以独立的 $R$，得 $L_{\boldsymbol w}$ 与 $m_{\boldsymbol w}+s_{\boldsymbol w}Y$ 同分布，故风险价值的第一段等式成立。由 $\overline F_Y(q_\varepsilon)=\varepsilon$ 和尾部渐近式，$q_\varepsilon\sim(c/\varepsilon)^{1/\beta}$；固定均值除以该量趋于零，得到风险价值渐近式。再令 $I_Y(q)=\int_q^\infty\overline F_Y(y)\,dy$。定理 32.16 证明中的尾积分计算对指数为 $-\beta$ 的正则变差尾同样适用，故 $I_Y(q)\sim q\overline F_Y(q)/(\beta-1)$。位置尺度变换与尾积分恒等式给出
$\operatorname{ES}_{1-\varepsilon}(L_{\boldsymbol w})=m_{\boldsymbol w}+s_{\boldsymbol w}[q_\varepsilon+I_Y(q_\varepsilon)/\varepsilon]$。方括号内渐近等于 $\beta q_\varepsilon/(\beta-1)$，代入 $q_\varepsilon$ 的渐近式即得第二式。

□

定理 32.18 说明厚尾并不取消分散化，而是改变分散化后的尾部衰减。不同权重仍通过椭圆尺度 $s_{\boldsymbol w}$ 影响风险，且三角不等式给出 $s_{\boldsymbol w+\boldsymbol v}\le s_{\boldsymbol w}+s_{\boldsymbol v}$；但所有线性组合共享同一尾指数 $\beta$，高分位预期短缺与风险价值之比趋于 $\beta/(\beta-1)$。当 $\beta$ 接近一时，该比值迅速增大，仅报告风险价值会严重遮蔽尾部平均损失。

**例 32.6**

两个正态损失头寸的波动率分别为 $0.02$、$0.03$，相关系数为 $0.25$，组合权重均为 $1$，均值为零。求 $99\%$ 风险价值与预期短缺，并比较尾指数为 $3$ 的厚尾组合在极端水平上的相对预期短缺。

**解**

组合标准差为
$s=\sqrt{0.02^2+0.03^2+2\times0.25\times0.02\times0.03}=0.04$。由 $z_{0.99}=2.3263$ 和 $\varphi(z_{0.99})/0.01=2.6652$，式（32.29）给出风险价值 $0.0931$、预期短缺 $0.1066$。正态情形下两者之比为 $1.1452$。若改用定理 32.18 的厚尾椭圆模型，则在 $\varepsilon\downarrow0$ 时该比值趋于 $3/(3-1)=1.5$，与尺度 $s_{\boldsymbol w}$ 和常数 $c$ 无关。这一比较针对各自模型的极端极限，不表示两个模型在同一有限置信水平必然具有相同的数值比率。
### 32.6.2 边际风险价值与成分风险价值

边际风险价值衡量某个头寸暴露微小增加时组合分位数的变化，成分风险价值则把组合风险按 Euler 规则分配给各头寸。二者都不是把头寸隔离后重新计算一次风险价值。

**定理 32.19（边际与成分风险价值的 Euler 分解）**

固定 $p$，记 $q(\boldsymbol w)=\operatorname{VaR}_p(L_{\boldsymbol w})$。假设联合密度及尾积分满足求导与积分可交换所需的条件，$f_{L_{\boldsymbol w}}(q(\boldsymbol w))>0$，且 $q$ 可微。则
$\operatorname{MVaR}_i=\partial q/\partial w_i=\mathbb E[X_i\mid L_{\boldsymbol w}=q(\boldsymbol w)]$，并且成分风险价值 $\operatorname{CVaR}_i=w_i\operatorname{MVaR}_i$ 满足 $\sum_i\operatorname{CVaR}_i=q(\boldsymbol w)$。在定理 32.17 的正态模型下，进一步有
$$
\operatorname{MVaR}_i=\mu_i+z_p\frac{(\boldsymbol\Sigma\boldsymbol w)_i}{s_{\boldsymbol w}},
\qquad
\operatorname{CVaR}_i=w_i\mu_i+z_p\frac{w_i(\boldsymbol\Sigma\boldsymbol w)_i}{s_{\boldsymbol w}}.
\tag{32.31}
$$

**证明**

先证正齐次性。对 $\lambda>0$，事件 $\{\lambda L_{\boldsymbol w}\le\lambda q(\boldsymbol w)\}$ 与原分位数事件相同，故 $q(\lambda\boldsymbol w)=\lambda q(\boldsymbol w)$。两边对 $\lambda$ 求导并令 $\lambda=1$，Euler 定理给出 $\sum_iw_i\partial q/\partial w_i=q(\boldsymbol w)$，于是成分之和等于组合风险价值。

为求边际项，令 $F(\boldsymbol w,q)=\mathbb P(L_{\boldsymbol w}\le q)$。沿第 $i$ 个坐标作扰动，$L_{\boldsymbol w+t\boldsymbol e_i}=L_{\boldsymbol w}+tX_i$。在固定 $q$ 处对 $t$ 求导，密度正则性允许把导数写入条件期望，得到
$\partial F/\partial w_i=-f_{L_{\boldsymbol w}}(q)\mathbb E[X_i\mid L_{\boldsymbol w}=q]$。分位数方程 $F(\boldsymbol w+t\boldsymbol e_i,q(\boldsymbol w+t\boldsymbol e_i))=p$ 对 $t$ 求导，又得
$0=\partial F/\partial w_i+f_{L_{\boldsymbol w}}(q)\partial q/\partial w_i$。两式相消即得条件期望表达式。最后，在正态情形下，联合正态条件期望公式给出
$\mathbb E[X_i\mid L_{\boldsymbol w}]=\mu_i+\operatorname{Cov}(X_i,L_{\boldsymbol w})s_{\boldsymbol w}^{-2}(L_{\boldsymbol w}-m_{\boldsymbol w})$。由于 $\operatorname{Cov}(X_i,L_{\boldsymbol w})=(\boldsymbol\Sigma\boldsymbol w)_i$，在 $L_{\boldsymbol w}=m_{\boldsymbol w}+s_{\boldsymbol w}z_p$ 处取值便得第一式；乘以 $w_i$ 得第二式。对 $i$ 求和时，$\sum_iw_i(\boldsymbol\Sigma\boldsymbol w)_i=s_{\boldsymbol w}^2$，所以也直接验证了 Euler 分解。

□

成分可以为负。例如降低相关性的对冲头寸会减少组合分位数，其负成分表示风险抵减，而不是该头寸发生了负损失。经验历史模拟的分位数是样本顺序统计量，权重扰动时常呈分段常数，不能直接套用光滑导数；可使用核平滑、对经验分位数回归或改用预期短缺的成分分解，并披露数值误差。

**例 32.7**

继续例 32.6 的零均值正态组合，求两个头寸在 $99\%$ 水平的边际风险价值、成分风险价值及成分占比。

**解**

协方差矩阵与权重向量分别为
$\boldsymbol\Sigma=\begin{pmatrix}0.0004&0.00015\\0.00015&0.0009\end{pmatrix}$、$\boldsymbol w=(1,1)^\top$，故 $\boldsymbol\Sigma\boldsymbol w=(0.00055,0.00105)^\top$，且 $s=0.04$。由式（32.31），两个边际风险价值依次为
$2.3263\times0.00055/0.04=0.03199$ 和 $2.3263\times0.00105/0.04=0.06107$。因权重均为一，它们也是两个成分风险价值，总和为 $0.09305$，恰等于组合风险价值。成分占比分别为 $0.00055/0.0016=34.375\%$ 与 $65.625\%$。第二个头寸不仅自身波动更大，其协方差暴露也更大，所以承担了约三分之二的风险配置；若直接相加两个孤立头寸的风险价值，则不会得到这一 Euler 分解。
### 32.6.3 Copula 与组合极值相依

对连续损失 $X,Y$，用生存 Copula $\widehat C$ 表示联合尾：
$\mathbb P(X>x,Y>y)=\widehat C(\overline F_X(x),\overline F_Y(y))$。它把边缘尾部分位与共同超越机制分开。若下式极限存在，则
$\lambda_U=\lim_{u\downarrow0}\widehat C(u,u)/u$ 称为上尾相依系数。当 $u$ 很小时，$\lambda_U$ 是一个头寸已处于极端上分位时另一个头寸也极端的渐近条件概率，而不是通常相关系数的另一种估计。

**定理 32.20（上尾相依与组合极值界）**

设 $X,Y$ 同分布、非负，边缘尾部连续严格递增且以指数 $-\beta$ 正则变差，其中 $\beta>0$。令 $q_\varepsilon=\operatorname{VaR}_{1-\varepsilon}(X)$，并设上尾相依系数 $\lambda_U$ 存在。则联合极端超越和至少一个极端超越满足
$$
\mathbb P(X>q_\varepsilon,Y>q_\varepsilon)\sim\lambda_U\varepsilon,
\qquad
\mathbb P(X>q_\varepsilon\ \text{or}\ Y>q_\varepsilon)\sim(2-\lambda_U)\varepsilon.
\tag{32.32}
$$
此外，组合和 $S=X+Y$ 的更深尾部有渐近夹界
$$
(2-\lambda_U)2^{-\beta}
\le\liminf_{\varepsilon\downarrow0}\frac{\mathbb P(S>2q_\varepsilon)}{\varepsilon}
\le\limsup_{\varepsilon\downarrow0}\frac{\mathbb P(S>2q_\varepsilon)}{\varepsilon}
\le2-\lambda_U.
$$

**证明**

由 $q_\varepsilon$ 的定义，两个边缘尾概率均为 $\varepsilon$，故联合尾恰为 $\widehat C(\varepsilon,\varepsilon)$。除以上尾相依定义中的 $\varepsilon$ 即得第一式。容斥公式把至少一个超越的概率写为 $2\varepsilon-\widehat C(\varepsilon,\varepsilon)$，从而得到第二式。

对组合和，非负性保证事件包含关系
$\{X>2q_\varepsilon\ \text{or}\ Y>2q_\varepsilon\}\subset\{S>2q_\varepsilon\}\subset\{X>q_\varepsilon\ \text{or}\ Y>q_\varepsilon\}$。右端概率已算得渐近为 $(2-\lambda_U)\varepsilon$。令 $\varepsilon_2=\overline F(2q_\varepsilon)$，正则变差性给出 $\varepsilon_2\sim2^{-\beta}\varepsilon$；把前两步用于尾概率 $\varepsilon_2$，左端概率便渐近为 $(2-\lambda_U)\varepsilon_2$。排列不等式并除以 $\varepsilon$，再取下极限和上极限，即得全部夹界。

□

## 32.7 量化应用与监管

极值统计与一致性风险度量不仅是概率论与统计学的理论构造，也是现代金融监管架构与量化投资组合管理的核心基石。自 1996 年巴塞尔委员会将内部模型法引入市场风险监管资本计量以来，金融机构对尾部损失的测算直接决定了法定资本的占用规模与系统性稳健程度。然而，早期以风险价值为核心的监管设计在遭遇极端流动性危机与厚尾冲击时暴露出严重缺陷。本节从监管资本的数理基础出发，阐明自巴塞尔协议至交易账簿基本面审查框架的度量演变，系统讨论风险价值回测检验的统计理论，构建压力测试与情景分析的变分优化表述，并进一步探讨风险预算配置机制与对抗分布不确定性的稳健风险度量方法。

### 32.7.1 内部模型法与监管资本

在巴塞尔监管体系下，具备合规资质的银行获准采用经监管核准的内部模型法（Internal Models Approach）计量市场风险监管资本。在巴塞尔协议第二版框架中，交易账簿的市场风险资本要求基于持有期为 $10$ 个交易日、置信水平为 $99\%$ 的风险价值设定。记第 $t$ 日以 $10$ 个交易日为持有期、置信水平为 $99\%$ 的损益风险价值为 $\operatorname{VaR}_{0.99}(t)$。监管资本要求 $C_t$ 由上一日的风险价值与过去 $60$ 个交易日日均风险价值的加权项取极大值确定：
$$
C_t = \max\left\{ \operatorname{VaR}_{0.99}(t-1), \, m_c \cdot \frac{1}{60} \sum_{i=1}^{60} \operatorname{VaR}_{0.99}(t-i) \right\} + S_t
$$
其中 $m_c \ge 3$ 为监管乘数，其基础基准值为 $3$；根据后文讨论的模型回测失效次数，监管机构在绿色、黄色与红色三个监管区间内动态上调乘数，最高可增至 $4$ 以上。项 $S_t$ 为压力风险价值附加资本，用于补偿在平稳样本期内对历史极端危机的低估。

内部模型法采用风险价值面临两大根本性的数理困境。其一是次可加性的缺失。若两个业务单元或资产组合的损失分别为 $L_1$ 与 $L_2$，由于一般情形下存在 $\operatorname{VaR}_p(L_1 + L_2) > \operatorname{VaR}_p(L_1) + \operatorname{VaR}_p(L_2)$，银行将整体交易组合拆分为两个独立核算的账簿反而能够申报更低的法定资本总额，从而诱发监管资本套利；反之，若在厚尾相依结构下强制合并计算，组合风险价值可能高于分部之和，直接惩罚了多元化对冲。其二是尾部损失盲区。风险价值仅反映分位数截断点的临界水平，完全忽略了超越分位数后的条件损失期望。两个具有完全相同分位数的资产头寸，其尾部分布可能具有完全不同的厚度；在灾难性市场震荡中，厚尾头寸所引致的破产损失可能数倍于薄尾头寸。

为修复上述数理缺陷，巴塞尔委员会在《交易账簿基本面审查》（FRTB）中实施了根本性的度量转型，以置信水平为 $97.5\%$ 的预期短缺全面取代 $99\%$ 风险价值作为内部模型法的资本计量基础。由于预期短缺是一致性风险度量，天然满足次可加性与凸性公理，彻底消除了基于组合拆分的资本套利动机。此外，FRTB 引入了流动性调整期限的梯级映射，将不同流动性等级的资产风险因子赋予 $10$ 至 $120$ 个交易日不等的调整期限，并强制要求预期短缺基于覆盖重大金融危机样本的受压期数据进行校准，确保资本要求在周期下行期具备足够的抗冲击韧性。

### 32.7.2 回测检验 VaR 模型的统计方法

内部模型法的有效性完全依赖于其尾部预测精度。为防范金融机构刻意压低风险计量以减少资本占用，监管框架与量化风控体系要求对风险价值模型开展定期的样本外统计回测。设 $L_t$ 为交易账簿在第 $t$ 期的实际事后损失，$\operatorname{VaR}_p(t)$ 为基于信息流 $\mathcal F_{t-1}$ 预测的 $p$ 分位事前风险价值。定义违约指示变量序列
$$
I_t = \mathbf{1}_{\{L_t > \operatorname{VaR}_p(t)\}}
$$
若风险价值模型设定正确且动态相容，则条件期望恒等于设定尾部概率：对所有 $t$，有 $\mathbb E[I_t \mid \mathcal F_{t-1}] = \mathbb P(L_t > \operatorname{VaR}_p(t) \mid \mathcal F_{t-1}) = 1-p$。令 $\alpha = 1-p$。该条件在数理上等价于序列 $\{I_t\}$ 构成相互独立的 Bernoulli$(\alpha)$ 随机变量序列。

Kupiec 提出的无条件覆盖检验（又称失败率比例检验）旨在检验违约发生的经验频率是否显著偏离理论失效率 $\alpha$。在包含 $T$ 个观测区间的连续回测样本中，总违约次数为 $x = \sum_{t=1}^T I_t$。若原假设 $H_0: \mathbb E[I_t] = \alpha$ 成立，违约次数服从二项分布 $\operatorname{Binomial}(T, \alpha)$。在无约束备择假设下，违约概率的极大似然估计量为经验频率 $\hat\alpha = x/T$。根据似然比原理，构造对数似然比检验统计量
$$
LR_{uc} = -2 \ln\left[ \frac{(1-\alpha)^{T-x}\alpha^x}{(1-\hat\alpha)^{T-x}\hat\alpha^x} \right] = 2\left[ x \ln\left(\frac{\hat\alpha}{\alpha}\right) + (T-x)\ln\left(\frac{1-\hat\alpha}{1-\alpha}\right) \right]
$$
根据大样本似然比渐近理论，在原假设 $H_0$ 成立且 $T \to \infty$ 时，统计量渐近服从自由度为 $1$ 的卡方分布：
$$
LR_{uc} \overset{d}{\to} \chi^2(1)
$$
若样本统计量超出显著性水平对应的分位数临界值，则拒绝模型无偏性假设；其中过多的违约指示模型低估尾部风险，而过少的违约则表明模型过度保守。

然而，Kupiec 检验仅关注全样本违约频率的无偏性，无法识别违约在时间序列上的分布形态。在实际金融市场中，波动率聚集往往诱发违约聚集；若数次极端违约在短期内密集爆发，即使全样本违约总数符合二项分布期望，模型在危机期间也已经发生失效。为此，Christoffersen 提出了独立性检验与条件覆盖检验框架。

将违约指示序列 $\{I_t\}$ 刻画为一阶两状态 Markov 链，状态空间为 $\{0, 1\}$。定义状态间转移概率为 $\pi_{ij} = \mathbb P(I_t = j \mid I_{t-1} = i)$，其中 $i,j \in \{0, 1\}$。记由状态 $i$ 转移至状态 $j$ 的样本观测频数为 $n_{ij}$。在无约束假设下，转移概率的极大似然估计量分别为
$$
\hat\pi_{01} = \frac{n_{01}}{n_{00} + n_{01}}, \qquad \hat\pi_{11} = \frac{n_{11}}{n_{10} + n_{11}}
$$
独立性原假设表述为违约概率与上一期是否违约相互独立，即 $H_{0, ind}: \pi_{01} = \pi_{11} = \pi_1$。在原假设下，一阶无记忆转移概率的极大似然估计量为 $\hat\pi_1 = (n_{01} + n_{11})/(n_{00} + n_{01} + n_{10} + n_{11})$。由此构造独立性对数似然比统计量
$$
LR_{ind} = -2 \ln\left[ \frac{(1-\hat\pi_1)^{n_{00}+n_{10}} \hat\pi_1^{n_{01}+n_{11}}}{(1-\hat\pi_{01})^{n_{00}}\hat\pi_{01}^{n_{01}}(1-\hat\pi_{11})^{n_{10}}\hat\pi_{11}^{n_{11}}} \right]
$$
在独立性原假设下，统计量渐近服从卡方分布 $LR_{ind} \overset{d}{\to} \chi^2(1)$。

将无条件覆盖检验与独立性检验相结合，联合条件覆盖检验考察原假设 $H_{0, cc}: \pi_{01} = \pi_{11} = 1-p$。由对数似然的可加性，联合检验统计量满足
$$
LR_{cc} = LR_{uc} + LR_{ind}
$$
在原假设 $H_{0, cc}$ 成立时，统计量渐近服从自由度为 $2$ 的卡方分布：
$$
LR_{cc} \overset{d}{\to} \chi^2(2)
$$
联合检验能够同步捕获频数偏离与聚集失误，构成了评估内部模型动态有效性的标准工具。

**例 32.8**

某银行对某一量化对冲组合开展连续 $250$ 个交易日的 $99\%$ 风险价值模型回测（对应 $\alpha = 0.01$）。在回测期内，共记录到 $x = 5$ 次损失超越风险价值的违约事件；在相邻两日的转移频数统计中，有 $1$ 次违约发生在上一日违约之后（即 $n_{11} = 1$），其余 $4$ 次违约发生在前一日未违约的情形下（$n_{01} = 4$），由此得到转移频数矩阵为 $n_{00} = 240$，$n_{01} = 4$，$n_{10} = 4$，$n_{11} = 1$。试在 $5\%$ 显著性水平下分别计算 Kupiec 无条件覆盖统计量、Christoffersen 独立性统计量以及联合条件覆盖统计量，并对该风险价值模型的预测能力与聚集特征作出统计推断。

**解**

先计算 Kupiec 无条件覆盖统计量。样本总量为 $T = 250$，理论失效率为 $\alpha = 0.01$，违约经验频率为 $\hat\alpha = 5/250 = 0.02$。未违约天数为 $T - x = 245$。将各参数代入无条件对数似然比公式：
$$
LR_{uc} = 2\left[ 5 \ln\left( \frac{0.02}{0.01} \right) + 245 \ln\left( \frac{0.98}{0.99} \right) \right]
$$
计算对数值，$\ln(2) \approx 0.693147$，$\ln(0.98/0.99) = \ln(0.989899) \approx -0.010153$。因此，
$$
LR_{uc} \approx 2 \times [ 5 \times 0.693147 + 245 \times (-0.010153) ] = 2 \times [ 3.465736 - 2.487485 ] \approx 1.9565
$$
自由度为 $1$ 的卡方分布在 $5\%$ 显著性水平下的临界值为 $\chi_{0.05}^2(1) = 3.8415$。由于 $1.9565 < 3.8415$，在 $5\%$ 显著性水平下无法拒绝无条件覆盖原假设，表明全样本违约次数在统计上尚未显著偏离 $99\%$ 置信区间的理论期望。

次计算 Christoffersen 独立性统计量。有效转移样本总量为 $N = \sum_{i,j} n_{ij} = 240 + 4 + 4 + 1 = 249$。转移概率的极大似然估计值分别为
$$
\hat\pi_{01} = \frac{4}{240 + 4} = \frac{4}{244} \approx 0.016393, \qquad \hat\pi_{11} = \frac{1}{4 + 1} = \frac{1}{5} = 0.200000
$$
$$
\hat\pi_{00} = 1 - \hat\pi_{01} \approx 0.983607, \qquad \hat\pi_{10} = 1 - \hat\pi_{11} = 0.800000
$$
在独立性假设下，无条件转移概率的极大似然估计值为
$$
\hat\pi_1 = \frac{n_{01} + n_{11}}{N} = \frac{4 + 1}{249} = \frac{5}{249} \approx 0.020080, \qquad 1 - \hat\pi_1 = \frac{244}{249} \approx 0.979920
$$
计算备择假设下的对数似然：
$$
\ln L_1 = 240 \ln(0.983607) + 4 \ln(0.016393) + 4 \ln(0.800000) + 1 \ln(0.200000)
$$
各单项对数值为 $240 \times (-0.016529) \approx -3.9670$，$4 \times (-4.110874) \approx -16.4435$，$4 \times (-0.223144) \approx -0.8926$，$1 \times (-1.609438) \approx -1.6094$，其和为 $\ln L_1 \approx -22.9125$。

计算原假设限制下的对数似然：
$$
\ln L_0 = (240 + 4) \ln(0.979920) + (4 + 1) \ln(0.020080) = 244 \times (-0.020284) + 5 \times (-3.908028) \approx -4.9493 - 19.5401 = -24.4894
$$
由此求得独立性对数似然比统计量：
$$
LR_{ind} = 2 (\ln L_1 - \ln L_0) \approx 2 \times (-22.9125 - (-24.4894)) = 2 \times 1.5769 \approx 3.1538
$$
临界值依然为 $\chi_{0.05}^2(1) = 3.8415$。由于 $3.1538 < 3.8415$，单纯的独立性检验在 $5\%$ 水平下亦未达到拒绝域，但在边际上已显现出转移概率由 $1.64\%$ 跃升至 $20.00\%$ 的明显波动集聚效应。

最后计算联合条件覆盖统计量：
$$
LR_{cc} = LR_{uc} + LR_{ind} \approx 1.9565 + 3.1538 = 5.1103
$$
自由度为 $2$ 的卡方分布在 $5\%$ 水平下的临界值为 $\chi_{0.05}^2(2) = 5.9915$。由于 $5.1103 < 5.9915$，联合检验在 $5\%$ 显著性水平下整体未被拒绝；但在 $10\%$ 显著性水平下（临界值为 $\chi_{0.10}^2(2) = 4.6052$），联合统计量显著落入拒绝域。这表明当把违约率的偏高与连续发生违约的聚类倾向合并考量时，该模型在刻画高波动周期的风险自相关性方面存在显著隐患，必须引入具备时变波动率特征的 GARCH 或极值动态更新机制。

### 32.7.3 压力测试与情景分析的数学表述

统计风险度量高度依赖历史数据的平稳性与遍历性假设。然而，在流动性骤竭、地缘冲突或极端脱锚等罕见黑天鹅事件中，平稳样本往往无法提供充足的统计信息。压力测试与情景分析通过对宏观经济与市场风险因子主动施加极端但具备潜在可能性的冲击，评估金融机构与投资组合在极端逆境下的资本充裕程度与清偿能力。

在确定性情景分析框架下，设驱动资产组合损失的 $d$ 维市场风险因子为 $\boldsymbol Z \in \mathbb R^d$，组合损失由非线性定价映射 $L = g(\boldsymbol Z)$ 给出。给定基准市场状态 $\boldsymbol Z_0$，情景分析设定一组离散的外生扰动向量 $\{\Delta\boldsymbol z^{(k)}\}_{k=1}^K$。在第 $k$ 个情景下，组合的受压超额损失表述为
$$
L^{(k)} = g(\boldsymbol Z_0 + \Delta\boldsymbol z^{(k)}) - g(\boldsymbol Z_0)
$$
历史情景法直接将历史上重大危机窗口（如 1998 年流动性枯竭、2008 年信用危机、2020 年市场动荡）的风险因子变动序列投影至当前持仓资产；假想情景法则由风险专家针对特定的宏观断裂点（如主权信用违约、汇率制度脱锚或利差骤变）进行结构化赋值。

当压力测试不再局限于经验指定的离散扰动，而是寻求在所有可能的受压概率分布中测算最不利结果时，情景分析升华为测度变换下的变分优化问题。设名义参考概率测度为 $\mathbb P$。引入相对熵（Kullback–Leibler 散度）约束，定义压力情景概率测度集合
$$
\mathcal Q_\eta = \left\{ \mathbb Q \ll \mathbb P : \mathcal D_{KL}(\mathbb Q \parallel \mathbb P) = \int \ln\left( \frac{\mathrm d\mathbb Q}{\mathrm d\mathbb P} \right) \mathrm d\mathbb Q \le \eta \right\}
$$
在给定的相对熵球半径 $\eta > 0$ 内部，求解最坏情况下的受压期望损失：
$$
\sup_{\mathbb Q \in \mathcal Q_\eta} \mathbb E_{\mathbb Q}[L]
$$
根据凸对偶理论与 Gibbs 变分原理，该极值测度问题的最优测度 $\mathbb Q^*$ 具有显式 Radon–Nikodym 导数，呈现出对损失的指数倾斜形态：
$$
\frac{\mathrm d\mathbb Q^*}{\mathrm d\mathbb P} = \frac{\exp(\beta L)}{\mathbb E_{\mathbb P}[\exp(\beta L)]}
$$
其中拉格朗日乘子 $\beta > 0$ 由边界等式 $\mathbb E_{\mathbb Q^*}[\ln(\mathrm d\mathbb Q^*/\mathrm d\mathbb P)] = \eta$ 唯一确定。这表明在相对熵惩罚框架下，最不利压力情景必然以指数速率放大极端损失区域的概率权重。

与从预设扰动推导受压损失的正向流程相对，逆压力测试旨在逆向寻找导致机构资本耗尽或触发监管干预临界阈值的最小市场扰动。设令机构发生实质性危机的临界不可承受损失为 $L_{\text{crit}} > 0$。假设风险因子扰动服从高斯分布 $\Delta\boldsymbol Z \sim \mathcal N(\boldsymbol 0, \boldsymbol\Sigma)$，因子发生的负对数概率密度等高线由 Mahalanobis 距离确定。逆压力测试转化为求解使得损失击穿临界阈值的最高概率（即最小马氏距离）冲击向量：
$$
\min_{\Delta\boldsymbol z \in \mathbb R^d} \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Sigma^{-1} \Delta\boldsymbol z \qquad \text{s.t.} \quad g(\boldsymbol Z_0 + \Delta\boldsymbol z) - g(\boldsymbol Z_0) \ge L_{\text{crit}}
$$
在 Delta 线性近似下，令梯度敏感度向量为 $\boldsymbol\delta = \nabla g(\boldsymbol Z_0)$，损失约束简化为线性不等式 $\boldsymbol\delta^\top \Delta\boldsymbol z \ge L_{\text{crit}}$。引入拉格朗日乘子并求解 Kuhn–Tucker 一阶驻点条件，最优逆压力冲击向量具有唯一显式闭式解：
$$
\Delta\boldsymbol z^* = \frac{L_{\text{crit}}}{\boldsymbol\delta^\top \boldsymbol\Sigma \boldsymbol\delta} \boldsymbol\Sigma \boldsymbol\delta
$$
此时最小马氏平方距离为 $L_{\text{crit}}^2 / (\boldsymbol\delta^\top \boldsymbol\Sigma \boldsymbol\delta)$。该闭式解表明，对投资组合最具破坏力的逆向极限冲击必然沿着敏感度梯度经协方差矩阵旋转的方向对齐，直接为量化机构的结构化尾部对冲提供了最优对准方向。

### 32.7.4 风险预算与最优配置

传统均值—方差资产配置往往产生名义资本权重相对分散、而实际风险敞口极度集中于少数高波动资产的结构性失衡。例如在股债六四开的名义组合中，权益资产往往承担了整体投资组合超过百分之九十的方差风险。风险预算理论将资产配置的基准锚点从名义资金权重转向风险贡献份额，通过对各资产承担的尾部或波动风险进行显式约束，实现真正的微观风险均衡。

设投资组合的资产权重向量为 $\boldsymbol w = (w_1, \dots, w_d)^\top \in \mathbb R_+^d$，满足 $\sum_{i=1}^d w_i = 1$。设组合整体风险由一阶正齐次、严格凸的一致性风险度量或连续可微风险度量 $\rho(\boldsymbol w)$ 刻画（如波动率 $\sigma(\boldsymbol w) = \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}$、正态风险价值或预期短缺 $\operatorname{ES}_p$）。根据 Euler 齐次函数定理，一阶齐次函数恒满足
$$
\rho(\boldsymbol w) = \sum_{i=1}^d w_i \frac{\partial \rho}{\partial w_i}(\boldsymbol w)
$$
定义资产 $i$ 的边际风险贡献为 $\operatorname{MR}_i(\boldsymbol w) = \partial \rho(\boldsymbol w)/\partial w_i$，其绝对风险贡献为
$$
\operatorname{RC}_i(\boldsymbol w) = w_i \frac{\partial \rho}{\partial w_i}(\boldsymbol w)
$$
两边求和即得总风险加和分解：$\sum_{i=1}^d \operatorname{RC}_i(\boldsymbol w) = \rho(\boldsymbol w)$。定义资产 $i$ 的相对风险贡献比例为 $p_i(\boldsymbol w) = \operatorname{RC}_i(\boldsymbol w)/\rho(\boldsymbol w)$。

给定预设的风险预算目标向量 $\boldsymbol b = (b_1, \dots, b_d)^\top$，其中 $b_i > 0$ 且 $\sum_{i=1}^d b_i = 1$。通用风险预算配置问题要求求解权重向量 $\boldsymbol w$，使得各资产的相对风险贡献精确匹配目标预算：
$$
w_i \frac{\partial \rho}{\partial w_i}(\boldsymbol w) = b_i \rho(\boldsymbol w), \qquad \forall i = 1, \dots, d
$$
当所有资产被赋予相同的风险预算时，即 $b_i = 1/d$，该模型退化为经典的等风险贡献组合（Equal Risk Contribution, ERC），在工业界通称风险平价配置。

直接求解上述非线性非凸联立代数方程组存在计算收敛与多解性困难。然而，利用风险度量 $\rho$ 的正齐次性与严格凸性，该方程系统能够等价重构为带对数障碍惩罚的凸优化问题。引入未归一化的辅助变量 $\boldsymbol y = (y_1, \dots, y_d)^\top \in \mathbb R_{++}^d$，构造如下凸规划：
$$
\min_{\boldsymbol y \in \mathbb R_{++}^d} \rho(\boldsymbol y) - \sum_{i=1}^d b_i \ln y_i
$$
在正象限内求目标函数关于 $y_i$ 的一阶偏导数并令其等于零，得到最优性一阶充要条件：
$$
\frac{\partial \rho}{\partial y_i}(\boldsymbol y) - \frac{b_i}{y_i} = 0 \iff y_i \frac{\partial \rho}{\partial y_i}(\boldsymbol y) = b_i
$$
将所有 $d$ 个方程相加并应用 Euler 恒等式 $\sum_{i=1}^d y_i \partial \rho/\partial y_i = \rho(\boldsymbol y)$，立即可得 $\rho(\boldsymbol y) = \sum_{i=1}^d b_i = 1$。因此，最优解处自动满足 $\rho(\boldsymbol y) = 1$ 以及 $y_i \partial \rho/\partial y_i = b_i \rho(\boldsymbol y)$。

由于 $\rho(\boldsymbol y)$ 在正象限严格凸，且对数项 $-\sum_{i=1}^d b_i \ln y_i$ 严格凸，目标函数在 $\mathbb R_{++}^d$ 上为严格凸函数；同时，当 $y_i \downarrow 0$ 或 $\|\boldsymbol y\| \to \infty$ 时，对数项与凸度量迫使目标函数趋于正无穷，保证下水平集具有紧致性。因此，该凸优化问题在正象限存在唯一的全局极小值点 $\boldsymbol y^*$。最终的名义资产权重向量由归一化公式给出：
$$
w_i^* = \frac{y_i^*}{\sum_{j=1}^d y_j^*}
$$
由于正齐次度量的偏导数是零阶齐次函数，常数缩放不改变相对风险贡献比例，由此严格确立了风险预算组合的存在性、唯一性与快速凸优化求解路径。

### 32.7.5 模型风险与稳健性

无论依赖广义 Pareto 分布的极值参数估计、超阈值水平的选取，还是多资产极端相依 Copula 的标定，量化风险计量均不可避免地面临参数估计误差与模型误设风险。这种源于模型假定不当或参数不确定性带来的潜在损失测算偏差，统称为模型风险。在远离样本均值的极端高分位数（如 $99.9\%$ 分位水平）区域，历史观测数据极度稀疏，微小的参数扰动即可引发尾部风险度量产生巨大的非线性畸变。

为应对真实数据生成机制未知的不确定性，分布鲁棒优化理论将对单一经验概率测度的依赖拓展至包含真实分布的非参数模糊集。设经验参考测度为 $\widehat{\mathbb P}_N$。基于 Wasserstein 距离构造的概率测度球是量化金融中最常用的模糊集形式：
$$
\mathcal B_\epsilon(\widehat{\mathbb P}_N) = \left\{ \mathbb Q \in \mathcal M_1(\mathbb R^d) : \mathcal W_1(\mathbb Q, \widehat{\mathbb P}_N) = \inf_{\gamma \in \Pi(\mathbb Q, \widehat{\mathbb P}_N)} \int \|\boldsymbol x - \boldsymbol y\| \mathrm d\gamma(\boldsymbol x, \boldsymbol y) \le \epsilon \right\}
$$
其中 $\mathcal M_1(\mathbb R^d)$ 为有限一阶矩的 Borel 概率测度空间，$\Pi$ 为边缘分布对齐的耦合测度族，$\epsilon > 0$ 为Wasserstein 不确定性半径。分布鲁棒风险度量在模糊球内求解最坏分布下的风险测度：
$$
\rho_{\mathcal B_\epsilon}(L) = \sup_{\mathbb Q \in \mathcal B_\epsilon(\widehat{\mathbb P}_N)} \rho_{\mathbb Q}(L)
$$
当底层风险度量选为均值或一致性凸度量时，根据 Kantorovich 测度对偶理论，上述无穷维测度极值问题能够严格转化为有限维的对偶凸规划；在正则条件下，最坏情况风险度量等价于在经验度量基础上增加与不确定性半径 $\epsilon$ 成正比的 Lipschitz 泛函正则化项，从而对尾部扰动产生天然的防御阻尼。

除了非参数模糊集，参数估计误差的传递效应亦可从微分变分角度进行解析量化。回顾定理 32.13 中由广义 Pareto 分布导出的高分位风险价值闭式：$\operatorname{VaR}_p(X) = u + \frac{\sigma}{\xi}[((1-p)/\zeta_u)^{-\xi} - 1]$。当形状参数 $\xi > 0$ 时，对其求偏导得到参数敏感性系数：
$$
\frac{\partial \operatorname{VaR}_p(X)}{\partial \xi} = \frac{\sigma}{\xi^2} \left[ 1 - \left( \frac{1-p}{\zeta_u} \right)^{-\xi} \left( 1 + \xi \ln\left( \frac{\zeta_u}{1-p} \right) \right) \right]
$$
当 $p \to 1$ 时，项 $((1-p)/\zeta_u)^{-\xi} \to \infty$，导数绝对值以对数与负幂次乘积的复合速度急剧发散。这从数学分析上严谨证明了超高分位风险价值对极值形状参数估计误差具有极端的敏感性放大效应。

**注记**

在量化风险管理实践中，防范模型风险需遵循概念验证、回测覆盖与压力测试三位一体的稳健性准则。首先，极值理论外推必须建立在厚尾机制的概念健全性之上，结合矩评估与 Hill 图交叉核验尾指数，杜绝在薄尾样本上盲目拟合重尾参数；其次，针对参数估计标准误，应采用渐近置信区间对风险价值与预期短缺进行保守上浮调整，引入模型风险资本附加缓冲；最后，稳健性分析要求将数据驱动的统计度量与逆压力测试的极端场景无缝衔接，以避免因单点模型误设而导致破产清算风险。

## 本章小结

本章系统探讨了一致性风险度量公理化体系与极值理论的数理基础，完成了从微观尾部统计建模到宏观审慎监管闭环的深度构建。作为现代金融计量与量化风控的核心支柱，风险度量理论的演进本质上是一场克服线性假设与经验样本局限的数学深化。经典风险价值以分位数为基础，直观刻画了正常市场环境下的资本阈值，但在重尾分布与极端相依结构下暴露出次可加性缺失的致命缺陷，不仅惩罚了资产配置的多元化分散效应，更在监管实践中诱发了组合拆分的资本套利空间。以单调性、平移不变性、正齐次性与次可加性为核心的一致性风险度量公理框架确立了现代风险计量的理性准则；而预期短缺作为支配风险价值的最小一致性度量，通过对分位数超越区域实施连续期望积分，彻底消除了尾部损失盲区，并凭借其凸对偶表示成为交易账簿基本面审查框架的法定资本计量基准。

在面对样本极端稀疏的尾部深水区时，极值理论提供了超越经验模拟与参数正态假定的渐近极限分析工具。Fisher–Tippett–Gnedenko 定理与 Pickands–Balkema–de Haan 定理分别构成了块极大值法与超阈值 POT 模型的理论基石，确立了广义极值分布与广义 Pareto 分布在刻画尾部极值时的普适吸引场。通过平衡偏差与方差的阈值选择机制、极大似然得分方程与 Fisher 信息矩阵渐近估计，极值理论构建了由中等分位数向极端高分位数外推的封闭解析公式，从统计动力学上克服了历史数据中极端事件样本稀缺的认知边界。进一步地，多期时间标度在厚尾条件下的超根号发散特性，深刻揭示了在非高斯世界中简单套用经典时间平方根法则可能引致的灾难性资本低估。

在多维资产组合层面，经典线性相关系数在极端下行共振中的失效促使相依性理论走向深入。生存 Copula 与极端尾部相依系数将边缘分布的尾部异质性与联合崩盘的协同联动解耦处理，推导出的组合极值夹界为系统性风险防范设定了严谨的理论边界。依托 Euler 齐次函数可微分解，投资组合的整体风险被精确拆解为各个头寸的边际风险贡献与成分风险，并通过凸障碍规划实现了等风险贡献等风险预算组合的快速稳定求解。最后，贯穿于模型回测中的 Kupiec 无条件覆盖与 Christoffersen 独立性条件联合检验、基于相对熵变分与梯度投影的逆压力测试，以及对抗非参数测度不确定性的分布鲁棒优化框架，共同构建了多层次、具备抗震阻尼的稳健量化体系，确保量化风控在极端危机面前具备高度的数理自洽性与执行韧性。

## 习题

1. 设实值随机变量 $L \in L^\infty(\Omega, \mathcal F, \mathbb P)$ 表示投资组合损失。写出风险价值 $\operatorname{VaR}_p(L) = \inf\{x \in \mathbb R : \mathbb P(L \le x) \ge p\}$ 与预期短缺 $\operatorname{ES}_p(L) = \frac{1}{1-p}\int_p^1 \operatorname{VaR}_u(L)\mathrm du$ 的数学定义，并证明对任意连续分布损失 $L$ 以及 $p \in (0,1)$，恒有 $\operatorname{ES}_p(L) \ge \operatorname{VaR}_p(L)$，且等号成立当且仅当损失 $L$ 在分位数截断点右侧几乎必然退化为常数。
2. 构造一个具体的两资产投资组合反例，严格证明风险价值不满足次可加性。设两项相互独立且同分布的贷款违约损失分别记为 $X_1, X_2 \sim \operatorname{Bernoulli}(q)$，其中违约概率取为 $q = 0.008$，违约时的损失额为 $100$ 万元，未违约时的损失额为 $0$。求在置信水平 $p = 0.99$ 下各自的风险价值 $\operatorname{VaR}_{0.99}(X_1)$ 与 $\operatorname{VaR}_{0.99}(X_2)$，并推导等权重组合总损失 $S = X_1 + X_2$ 的概率分布与组合风险价值 $\operatorname{VaR}_{0.99}(S)$，由此证明不等式 $\operatorname{VaR}_{0.99}(S) > \operatorname{VaR}_{0.99}(X_1) + \operatorname{VaR}_{0.99}(X_2)$ 严格成立。
3. 设风险度量 $\rho: \mathcal X \to \mathbb R$ 满足正齐次性公理，即对任意 $\lambda > 0$ 及 $X \in \mathcal X$ 均有 $\rho(\lambda X) = \lambda \rho(X)$。证明：$\rho$ 满足次可加性（即对任意 $X, Y \in \mathcal X$ 有 $\rho(X+Y) \le \rho(X) + \rho(Y)$）当且仅当 $\rho$ 为凸泛函（即对任意 $\lambda \in [0,1]$ 有 $\rho(\lambda X + (1-\lambda)Y) \le \lambda\rho(X) + (1-\lambda)\rho(Y)$）。
4. 设损失 $L \in L^1(\Omega, \mathcal F, \mathbb P)$ 具有连续严格单调的累积分布函数 $F_L$。证明预期短缺具有如下变分最小化等价表述：
$$
\operatorname{ES}_p(L) = \min_{s \in \mathbb R} \left\{ s + \frac{1}{1-p}\mathbb E\left[(L - s)^+\right] \right\}
$$
其中 $(x)^+ = \max\{x, 0\}$，并证明使目标函数取得最小值的极值点集合包含且仅包含 $p$ 分位风险价值 $\operatorname{VaR}_p(L)$。
5. 陈述极值理论中的 Fisher–Tippett–Gnedenko 定理，并证明在仿射归一化变换下，Fréchet 分布族、Weibull 分布族与 Gumbel 分布族能够统一参数化表示为包含单个形状参数 $\xi \in \mathbb R$ 的广义极值分布形式：
$$
H_\xi(x) = \exp\left( -(1 + \xi x)^{-1/\xi} \right), \qquad 1 + \xi x > 0
$$
并详细推导当 $\xi \to 0$ 时 $H_\xi(x)$ 逐点收敛至 Gumbel 分布 $H_0(x) = \exp(-\mathrm e^{-x})$。
6. 设随机变量 $Y$ 服从形状参数为 $\xi < 1$ 且尺度参数为 $\sigma > 0$ 的广义 Pareto 分布，分布函数为 $G_{\xi,\sigma}(y) = 1 - (1 + \xi y/\sigma)^{-1/\xi}$。定义超额随机变量在水平 $z > 0$ 处的平均超额函数为 $e(z) = \mathbb E[Y - z \mid Y > z]$。完整推导 $e(z)$ 的显式积分表达式，证明其关于阈值 $z$ 呈严格线性关系：
$$
e(z) = \frac{\sigma + \xi z}{1 - \xi}
$$
并由此说明为何样本经验平均超额图能够作为判定广义 Pareto 分布适用性及粗选阈值水平的有效诊断工具。
7. 设连续损失变量 $X$ 的阈值超越量 $Y = X - u \mid X > u$ 服从形状参数为 $\xi \in (0, 1)$、尺度参数为 $\sigma > 0$ 的广义 Pareto 分布，超阈值概率记为 $\zeta_u = \mathbb P(X > u)$。在已知置信水平 $p > 1 - \zeta_u$ 的高分位风险价值为 $\operatorname{VaR}_p(X) = u + \frac{\sigma}{\xi}[((1-p)/\zeta_u)^{-\xi} - 1]$ 的前提下，从预期短缺的条件期望定义 $\operatorname{ES}_p(X) = \mathbb E[X \mid X > \operatorname{VaR}_p(X)]$ 出发，写出完整的积分替换步骤，严格推导并证明预期短缺的闭式解为：
$$
\operatorname{ES}_p(X) = \frac{\operatorname{VaR}_p(X)}{1 - \xi} + \frac{\sigma - \xi u}{1 - \xi}
$$
8. 设母体分布属于极大值吸引场 $X \in \operatorname{MDA}(H_\xi)$，分别从样本利用率、渐近偏差以及渐近估计方差三个维度，深入对比块极大值法与超阈值模型的统计特性，并解释为何在金融量化风控中超阈值模型通常具备更高的样本效率。
9. 设损失样本 $X_1, \dots, X_n$ 独立同分布于 Pareto 尾部分布，尾部生存函数满足 $\mathbb P(X > x) \sim c x^{-\alpha}$（其中 $\alpha = 1/\xi > 0$ 为尾指数）。记降序顺序统计量为 $X_{(1:n)} \ge \dots \ge X_{(n:n)}$。写出基于前 $k$ 个最大顺序统计量的 Hill 估计量 $H_{k,n}$ 的数学表达式，证明当 $k \to \infty$ 且 $k/n \to 0$ 时 Hill 估计量具有弱相合性，并从渐近偏差与渐近方差的权衡角度推导最优截断阶数 $k^*$ 的理论选取准则。
10. 设经验历史样本容量为 $N = 1000$，拟估计置信水平为 $p = 0.999$ 的分位数。若采用非参数经验分位数法，说明该估计量方差发散或无法估计的数理原因；若转而采用半参数超阈值极值法（设选定阈值 $u$ 使得超阈值样本量为 $N_u = 50$），写出高分位点的渐近方差公式，并定量阐明极值模型实现高分位外推的统计学依据。
11. 设独立同分布损失序列 $X_1, \dots, X_n$ 服从对称 $\alpha$-稳定分布 $S_\alpha(\sigma, 0, 0)$，其中特征指数 $\alpha \in (1, 2)$。证明当时间跨度由 $1$ 扩展至 $n$ 时，组合聚合损失 $S_n = \sum_{i=1}^n X_i$ 的风险价值满足标度关系 $\operatorname{VaR}_p(S_n) = n^{1/\alpha} \operatorname{VaR}_p(X_1)$，并据此论证传统的平方根时间标度法则在厚尾市场上低估多期聚合风险的渐近相对误差随 $n \to \infty$ 趋于无穷大。
12. 设 $d$ 维资产损失向量服从联合正态分布 $\boldsymbol X \sim \mathcal N(\boldsymbol\mu, \boldsymbol\Sigma)$，权重向量为 $\boldsymbol w$。推导组合损失 $L_{\boldsymbol w} = \boldsymbol w^\top \boldsymbol X$ 的分布，求出其风险价值 $\operatorname{VaR}_p(L_{\boldsymbol w})$ 与预期短缺 $\operatorname{ES}_p(L_{\boldsymbol w})$ 的显式表达式，并推导资产 $i$ 的边际风险价值 $\operatorname{MVaR}_i = \partial \operatorname{VaR}_p/\partial w_i$。
13. 设组合风险度量 $\rho(\boldsymbol w)$ 为一阶正齐次且连续可微。证明成分风险价值满足 Euler 恒等式 $\sum_{i=1}^d \operatorname{CVaR}_i = \operatorname{VaR}_p(L_{\boldsymbol w})$。若某资产的成分风险价值呈现负值（$\operatorname{CVaR}_i < 0$），在经济学与投资对冲层面应如何合理解释该现象？该资产是否可能产生正的期望损失？
14. 设资产收益向量服从严格椭圆分布族 $E_d(\boldsymbol\mu, \boldsymbol\Sigma, \psi)$。证明：对任意满足正齐次性、平移不变性与位置—尺度协变性的风险度量 $\rho_1$ 与 $\rho_2$，若存在常数 $k_1, k_2 > 0$ 使得 $\rho_1(L_{\boldsymbol w}) = -\boldsymbol w^\top \boldsymbol\mu + k_1 \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}$ 以及 $\rho_2(L_{\boldsymbol w}) = -\boldsymbol w^\top \boldsymbol\mu + k_2 \sqrt{\boldsymbol w^\top \boldsymbol\Sigma \boldsymbol w}$，则对任意满足预算约束的投资组合，由 $\rho_1$ 与 $\rho_2$ 诱导的最优资产配置排序完全一致。
15. 设双变量随机向量 $(X_1, X_2)$ 的联合分布由高斯 Copula $C_\rho^{\text{Gauss}}$ 联结，其中资产间线性相关系数满足 $|\rho| < 1$。证明其上尾相依系数与下尾相依系数严格满足：
$$
\lambda_U = \lim_{u \downarrow 0} \frac{1 - 2(1-u) + C_\rho^{\text{Gauss}}(1-u, 1-u)}{u} = 0, \qquad \lambda_L = 0
$$
由此解释为何基于正态或高斯 Copula 的衍生品定价与组合风控模型在极端金融危机中会系统性低估多资产联合崩盘的尾部相依概率。
16. 设双变量生存 Copula 属于 Clayton Copula 族，即 $\widehat C_\theta(u_1, u_2) = (u_1^{-\theta} + u_2^{-\theta} - 1)^{-1/\theta}$，其中相依参数 $\theta > 0$。求出其对应的上尾相依系数 $\lambda_U$ 的显式数值。若改设 Copula 为参数为 $\theta \ge 1$ 的 Gumbel Copula $C_\theta(u_1, u_2) = \exp(-((-\ln u_1)^\theta + (-\ln u_2)^\theta)^{1/\theta})$，求其上尾相依系数 $\lambda_U$，并对比两类模型在刻画金融资产协同下行时的非对称性。
17. 某交易台持有的单期资产头寸损失 $L$ 服从自由度为 $\nu = 4$ 的标准化 Student-t 分布，缩放参数使得方差为 $1$。分别计算在巴塞尔 II 框架下的 $99\%$ 风险价值资本要求与在巴塞尔 III/FRTB 框架下的 $97.5\%$ 预期短缺资本要求，比较两者的数值大小，并深入讨论监管转型对厚尾资产配置的资本惩罚边际变化。
18. 在 Kupiec 似然比检验中，原假设为 $H_0: \mathbb E[I_t] = \alpha$。记得分函数为 $S(\alpha) = \partial \ln L(\alpha)/\partial \alpha$，样本量为 $T$。利用泰勒展开与中心极限定理，推导得分统计量的渐近正态分布，并严格证明似然比统计量 $LR_{uc}$ 在原假设成立时渐近服从自由度为 $1$ 的卡方分布 $\chi^2(1)$。
19. 设违约指示变量序列 $\{I_t\}_{t=1}^T$ 服从一阶两状态 Markov 过程，转移矩阵参数为 $\boldsymbol\Pi = (\pi_{ij})_{2\times 2}$。写出样本联合似然函数 $L(\boldsymbol\Pi \mid I_1, \dots, I_T)$ 的显式形式，对两组转移概率的一阶对数得分方程分别求导，严格推导无约束极大似然估计量 $\hat\pi_{01}$ 与 $\hat\pi_{11}$ 的闭式解。
20. 在逆压力测试中，设组合损失函数由二阶 Taylor 展开给出：$L(\Delta\boldsymbol z) \approx \boldsymbol\delta^\top \Delta\boldsymbol z + \frac{1}{2} \Delta\boldsymbol z^\top \boldsymbol\Gamma \Delta\boldsymbol z$。在扰动服从正态分布 $\Delta\boldsymbol Z \sim \mathcal N(\boldsymbol 0, \boldsymbol\Sigma)$ 且临界阈值为 $L_{\text{crit}}$ 的条件下，写出最小马氏距离逆压力测试的 Karush–Kuhn–Tucker 一阶条件，并推导最优扰动向量满足的矩阵特征系统形式。
21. 在等风险贡献风险平价配置中，考虑包含两项资产的组合，设其协方差矩阵为 $\boldsymbol\Sigma = \begin{pmatrix}\sigma_1^2 & \rho\sigma_1\sigma_2 \\ \rho\sigma_1\sigma_2 & \sigma_2^2\end{pmatrix}$，其中相关系数 $|\rho| < 1$。证明：等风险贡献权重满足 $w_1^*/w_2^* = \sigma_2/\sigma_1$，且该比率与相关系数 $\rho$ 完全无关；进一步证明当 $d$ 维资产协方差矩阵为对角阵时，等风险贡献权重恒严格反比于资产波动率。
22. 设名义参考损失分布为 $\mathbb P$，真实分布位于相对熵球 $\mathcal Q_\eta = \{\mathbb Q \ll \mathbb P : \mathcal D_{KL}(\mathbb Q \parallel \mathbb P) \le \eta\}$ 内。写出分布鲁棒期望损失优化问题 $\sup_{\mathbb Q \in \mathcal Q_\eta} \mathbb E_{\mathbb Q}[L]$ 的拉格朗日泛函，利用变分极值条件推导最坏情况测度 $\mathbb Q^*$ 的指数倾斜显式形态，并推导其对偶单变量凸极小化无约束问题 $\inf_{\beta > 0} \{ \beta \eta + \frac{1}{\beta}\ln \mathbb E_{\mathbb P}[\exp(\beta L)] \}$。
