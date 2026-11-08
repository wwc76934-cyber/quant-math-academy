# 第13章习题参考答案与解析

## 1. 
本题考查离散随机变量条件期望的初等定义、随机变量形式的条件期望以及全期望公式的离散情形验证。

首先计算 $Y$ 的边缘概率质量函数。由全概率展开，
$$
\mathbb P(Y=0) = \mathbb P(X=0,Y=0) + \mathbb P(X=1,Y=0) = 0.1 + 0.3 = 0.4
$$
$$
\mathbb P(Y=1) = \mathbb P(X=0,Y=1) + \mathbb P(X=1,Y=1) = 0.2 + 0.4 = 0.6
$$
在给定 $Y=0$ 的条件下，$X$ 的条件分布由条件概率公式给出：
$$
\mathbb P(X=0\mid Y=0) = \frac{\mathbb P(X=0,Y=0)}{\mathbb P(Y=0)} = \frac{0.1}{0.4} = 0.25
$$
$$
\mathbb P(X=1\mid Y=0) = \frac{\mathbb P(X=1,Y=0)}{\mathbb P(Y=0)} = \frac{0.3}{0.4} = 0.75
$$
由于 $X$ 仅取值 $0$ 与 $1$，其条件期望为
$$
\mathbb E[X\mid Y=0] = 0\times 0.25 + 1\times 0.75 = 0.75
$$
同理，在给定 $Y=1$ 的条件下，$X$ 的条件概率为
$$
\mathbb P(X=0\mid Y=1) = \frac{\mathbb P(X=0,Y=1)}{\mathbb P(Y=1)} = \frac{0.2}{0.6} = \frac{1}{3}
$$
$$
\mathbb P(X=1\mid Y=1) = \frac{\mathbb P(X=1,Y=1)}{\mathbb P(Y=1)} = \frac{0.4}{0.6} = \frac{2}{3}
$$
从而条件期望为
$$
\mathbb E[X\mid Y=1] = 0\times \frac{1}{3} + 1\times \frac{2}{3} = \frac{2}{3}
$$
随机变量 $\mathbb E[X\mid Y]$ 是关于 $Y$ 的函数，在事件 $\{Y=0\}$ 上取值 $0.75$，在事件 $\{Y=1\}$ 上取值 $2/3$。因此其概率质量分布为：以概率 $0.4$ 取值 $0.75$（即 $3/4$），以概率 $0.6$ 取值 $2/3$。

用全期望公式验证，计算该随机变量的数学期望：
$$
\mathbb E[\mathbb E[X\mid Y]] = 0.75\times \mathbb P(Y=0) + \frac{2}{3}\times \mathbb P(Y=1) = 0.75\times 0.4 + \frac{2}{3}\times 0.6 = 0.3 + 0.4 = 0.7
$$
另一方面，直接由 $X$ 的边缘分布计算 $X$ 的期望，
$$
\mathbb P(X=1) = \mathbb P(X=1,Y=0) + \mathbb P(X=1,Y=1) = 0.3 + 0.4 = 0.7
$$
因为 $X$ 是 $0-1$ 变量，所以 $\mathbb E X = \mathbb P(X=1) = 0.7$。两者严格相等，验证了全期望公式。

本题常见错误在于混淆作为实数的条件期望数值 $\mathbb E[X\mid Y=y]$ 与作为随机变量的 $\mathbb E[X\mid Y]$，或者在条件概率计算中颠倒了条件与目标的次序，误将 $\mathbb P(Y=0\mid X=1)$ 当作 $\mathbb P(X=1\mid Y=0)$。

## 2. 
本题考查非矩形支撑集上二元连续型随机变量的条件密度、条件期望以及独立性判定。

首先确定联合概率密度函数的归一化常数。区域 $D = \{(x,y): 0<x<1, 0<y<1, x+y>1\}$ 是单位正方形内位于直线 $x+y=1$ 右上方的三角形区域。该三角形的底和高均为 $1$，面积为 $1/2$。由于 $(X,Y)$ 在 $D$ 上服从均匀分布，其联合概率密度为
$$
f(x,y) = \begin{cases} 2, & (x,y)\in D \\ 0, & (x,y)\notin D \end{cases}
$$
对任意固定的 $y\in(0,1)$，不等式 $x+y>1$ 且 $0<x<1$ 等价于 $1-y < x < 1$。由此对 $x$ 积分得到 $Y$ 的边缘概率密度：
$$
f_Y(y) = \int_{1-y}^1 2 \, dx = 2[1 - (1-y)] = 2y, \quad 0<y<1
$$
在 $y\in(0,1)$ 处，$f_Y(y)>0$。根据条件概率密度的定义，给定 $Y=y$ 时 $X$ 的条件密度为
$$
f_{X\mid Y}(x\mid y) = \frac{f(x,y)}{f_Y(y)} = \frac{2}{2y} = \frac{1}{y}, \quad 1-y < x < 1
$$
而在该区间之外密度为 $0$。这表明给定 $Y=y$ 时，$X$ 条件服从区间 $(1-y, 1)$ 上的均匀分布。

因此，条件期望即为该均匀分布区间的几何中点：
$$
\mathbb E[X\mid Y=y] = \int_{1-y}^1 x \cdot \frac{1}{y} \, dx = \frac{1}{y}\left[ \frac{x^2}{2} \right]_{1-y}^1 = \frac{1-(1-y)^2}{2y} = \frac{2y-y^2}{2y} = 1 - \frac{y}{2}
$$
关于独立性的判断：注意到条件密度 $f_{X\mid Y}(x\mid y) = 1/y$ 显式依赖于条件变量 $y$，且其支撑集 $(1-y,1)$ 也依赖于 $y$，并不等于 $X$ 的边缘密度 $f_X(x) = 2x$。从支撑集几何角度看，$D$ 不是笛卡尔积区间，因此 $X$ 与 $Y$ 不独立。

本题常见错误是忽视支撑集面积为 $1/2$ 而误设联合密度为 $1$，导致积分总概率不为 $1$；或者在求边缘密度时未修正积分下限，机械套用 $0$ 到 $1$ 的积分区间。

## 3. 
本题考查二元正态分布通过配方法严格推导条件分布的均值与方差，以及条件方差同方差性的几何与代数成因。

设 $(X,Y)$ 的二元正态联合概率密度为
$$
f(x,y) = \frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}} \exp\left( -\frac{1}{2(1-\rho^2)} Q(x,y) \right)
$$
其中二次型定义为
$$
Q(x,y) = \left( \frac{x-\mu_X}{\sigma_X} \right)^2 - 2\rho\left( \frac{x-\mu_X}{\sigma_X} \right)\left( \frac{y-\mu_Y}{\sigma_Y} \right) + \left( \frac{y-\mu_Y}{\sigma_Y} \right)^2
$$
现对二次型中关于变量 $x$ 的二次项与交叉项进行配方。令 $u = (x-\mu_X)/\sigma_X$，$v = (y-\mu_Y)/\sigma_Y$。二次型可写为
$$
u^2 - 2\rho uv + v^2 = (u - \rho v)^2 + (1-\rho^2)v^2
$$
将 $u,v$ 代回，得到
$$
\frac{Q(x,y)}{1-\rho^2} = \frac{\left( \frac{x-\mu_X}{\sigma_X} - \rho\frac{y-\mu_Y}{\sigma_Y} \right)^2}{1-\rho^2} + \left( \frac{y-\mu_Y}{\sigma_Y} \right)^2 = \frac{\left( x - \left[ \mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y) \right] \right)^2}{\sigma_X^2(1-\rho^2)} + \left( \frac{y-\mu_Y}{\sigma_Y} \right)^2
$$
将指数部分分解，注意到第二项完全不含 $x$。结合系数分解，
$$
2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2} = \left(\sqrt{2\pi}\sigma_X\sqrt{1-\rho^2}\right) \cdot \left(\sqrt{2\pi}\sigma_Y\right)
$$
由于 $Y$ 的边缘密度正是均值为 $\mu_Y$、方差为 $\sigma_Y^2$ 的一元正态密度，将其从联合密度中除掉，便得给定 $Y=y$ 时 $X$ 的条件密度：
$$
f_{X\mid Y}(x\mid y) = \frac{f(x,y)}{f_Y(y)} = \frac{1}{\sqrt{2\pi}\sigma_X\sqrt{1-\rho^2}} \exp\left( -\frac{\left( x - \left[ \mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y) \right] \right)^2}{2\sigma_X^2(1-\rho^2)} \right)
$$
此表达式严格对应一元正态分布的概率密度函数形式，因此条件分布为
$$
X\mid Y=y \sim N\left( \mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y), \; \sigma_X^2(1-\rho^2) \right)
$$
由此直接读出条件期望与条件方差：
$$
\mathbb E[X\mid Y=y] = \mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)
$$
$$
\operatorname{Var}(X\mid Y=y) = \sigma_X^2(1-\rho^2)
$$
关于条件方差不依赖于 $y$ 的本质原因：在代数上，二次型配方后关于 $x$ 的二阶项系数为 $1/[\sigma_X^2(1-\rho^2)]$，该曲率系数完全由协方差矩阵决定，与一阶交叉项配方产生的位置偏移量无关；在几何与概率结构上，多元正态分布的等高线是一族形状、大小、方向完全相同的同心椭圆族，任意平行于坐标轴的超平面截割该高斯曲面，所得到的截面高斯曲线的宽度（即方差）均完全相等，只在中心位置上随截割位置 $y$ 发生线性移动。这一性质称为正态分布的同方差性。

本题常见错误是在配方展开交叉项时漏掉系数 $1/(1-\rho^2)$，或者颠倒回归系数中的标准差比例，错写为 $\rho\sigma_Y/\sigma_X$。

## 4. 
本题考查全期望公式与全方差公式在分层（混合）模型中的应用，并与边缘分布直接求矩进行双向验证。

由题意，给定 $X=x$ 时 $Y$ 服从参数为 $x$ 的泊松分布，因而条件期望与条件方差分别为
$$
\mathbb E[Y\mid X] = X, \quad \operatorname{Var}(Y\mid X) = X
$$
因为 $X\sim\operatorname{Exp}(1)$，指数分布的均值与方差为
$$
\mathbb E[X] = 1, \quad \operatorname{Var}(X) = 1
$$
由全期望公式，
$$
\mathbb E[Y] = \mathbb E[\mathbb E[Y\mid X]] = \mathbb E[X] = 1
$$
由全方差公式，方差可分解为组内方差的期望与组间期望的方差之和：
$$
\operatorname{Var}(Y) = \mathbb E[\operatorname{Var}(Y\mid X)] + \operatorname{Var}(\mathbb E[Y\mid X]) = \mathbb E[X] + \operatorname{Var}(X) = 1 + 1 = 2
$$
现在通过计算 $Y$ 的边缘分布进行对照验证。对任意非负整数 $k = 0, 1, 2, \dots$，由全概率积分公式，
$$
\mathbb P(Y=k) = \int_0^\infty \mathbb P(Y=k\mid X=x) f_X(x) \, dx = \int_0^\infty \frac{x^k e^{-x}}{k!} e^{-x} \, dx = \frac{1}{k!} \int_0^\infty x^k e^{-2x} \, dx
$$
作换元 $u = 2x$，则 $dx = du/2$，积分化为
$$
\int_0^\infty x^k e^{-2x} \, dx = \frac{1}{2^{k+1}} \int_0^\infty u^k e^{-u} \, du = \frac{k!}{2^{k+1}}
$$
代入概率质量函数，得到
$$
\mathbb P(Y=k) = \frac{1}{k!} \cdot \frac{k!}{2^{k+1}} = \left(\frac{1}{2}\right)^{k+1} = \frac{1}{2}\left(1 - \frac{1}{2}\right)^k, \quad k=0,1,2,\dots
$$
这是取值于 $\{0,1,2,\dots\}$ 且成功概率为 $p=1/2$ 的几何分布（等待失败次数）。由几何分布的标准公式，
$$
\mathbb E[Y] = \frac{1-p}{p} = \frac{1/2}{1/2} = 1
$$
$$
\operatorname{Var}(Y) = \frac{1-p}{p^2} = \frac{1/2}{1/4} = 2
$$
直接求矩结果与全期望、全方差公式推导完全一致。

本题常见错误是在应用全方差公式时遗漏了第二项 $\operatorname{Var}(\mathbb E[Y\mid X])$，误以为随机强度的方差就是条件方差的均值；或者混淆从 $0$ 开始与从 $1$ 开始的几何分布均值公式。

## 5. 
本题考查抽象测度论框架下由有限划分生成的 $\sigma$-代数上的条件期望显式构造，以及条件期望作为信息投影与原子平均的本质涵义。

**证明**

由条件期望的定义，需要验证目标随机变量满足 $\mathcal G$-可测性与部分平均性质这两条准则。记待证公式右端为
$$
Y = \frac{\mathbb E[X\mathbf 1_A]}{\mathbb P(A)}\mathbf 1_A + \frac{\mathbb E[X\mathbf 1_{A^c}]}{\mathbb P(A^c)}\mathbf 1_{A^c}
$$
第一步，验证可测性。$\sigma$-代数 $\mathcal G = \{A, A^c, \varnothing, \Omega\}$。随机变量 $Y$ 是示性函数 $\mathbf 1_A$ 与 $\mathbf 1_{A^c}$ 的常系数线性组合，由定义是关于 $\mathcal G$ 可测的离散随机变量，且当 $X$ 可积时，$Y$ 的取值为两个有限常数，故必可积。

第二步，验证部分平均性质，即对任意 $G\in\mathcal G$，均有 $\int_G Y \, d\mathbb P = \int_G X \, d\mathbb P$。分别检验 $\mathcal G$ 中的四个元素：
当 $G = \varnothing$ 时，两端积分均为 $0$。
当 $G = A$ 时，由于 $\mathbf 1_A \cdot \mathbf 1_A = \mathbf 1_A$，$\mathbf 1_{A^c} \cdot \mathbf 1_A = 0$，故
$$
\int_A Y \, d\mathbb P = \mathbb E[Y \mathbf 1_A] = \frac{\mathbb E[X\mathbf 1_A]}{\mathbb P(A)} \mathbb E[\mathbf 1_A] + 0 = \frac{\mathbb E[X\mathbf 1_A]}{\mathbb P(A)} \mathbb P(A) = \mathbb E[X\mathbf 1_A] = \int_A X \, d\mathbb P
$$
当 $G = A^c$ 时，同理有
$$
\int_{A^c} Y \, d\mathbb P = \mathbb E[Y \mathbf 1_{A^c}] = 0 + \frac{\mathbb E[X\mathbf 1_{A^c}]}{\mathbb P(A^c)} \mathbb E[\mathbf 1_{A^c}] = \mathbb E[X\mathbf 1_{A^c}] = \int_{A^c} X \, d\mathbb P
$$
当 $G = \Omega$ 时，由有限可加性，
$$
\int_\Omega Y \, d\mathbb P = \int_A Y \, d\mathbb P + \int_{A^c} Y \, d\mathbb P = \mathbb E[X\mathbf 1_A] + \mathbb E[X\mathbf 1_{A^c}] = \mathbb E[X(\mathbf 1_A + \mathbf 1_{A^c})] = \int_\Omega X \, d\mathbb P
$$
由此对所有 $G\in\mathcal G$ 均满足部分平均性质。根据定义，公式几乎必然成立。

□

关于「条件期望是在信息原子上的平均」的解释：$\sigma$-代数 $\mathcal G$ 描述的是观测者所能获得的信息分辨率。在此系统中，观测者无法分辨样本点具体落在 $A$ 内部的哪个位置，只能获知「事件 $A$ 是否发生」。因此，事件 $A$ 与 $A^c$ 是信息不可进一步分割的最小非空单元（即信息原子）。条件期望抹平了原子内部的所有微观起伏，在每个原子内部赋予一个恒定常数值，该数值恰好为 $X$ 在该原子上的加权平均值 $\mathbb E[X\mathbf 1_A]/\mathbb P(A)$。

本题常见错误是仅验证 $G=\Omega$ 的总体期望相等，而未对 $\mathcal G$ 的所有发生基元事件分别检验部分平均性质。

## 6. 
本题考查条件期望定义的严格充要等价性，以及独立性与均值独立性之间的层级差异。

**证明**

首先证明必要性。若 $\mathbb E[X\mid\mathcal G] = \mathbb E X$ 几乎必然成立。对任意 $A\in\mathcal G$，由条件期望定义中的部分平均性质，
$$
\mathbb E[X\mathbf 1_A] = \int_A X \, d\mathbb P = \int_A \mathbb E[X\mid\mathcal G] \, d\mathbb P = \int_A \mathbb E X \, d\mathbb P = \mathbb E X \cdot \mathbb P(A)
$$
必要性得证。

再证明充分性。设对一切 $A\in\mathcal G$，均有 $\mathbb E[X\mathbf 1_A] = \mathbb E X\cdot\mathbb P(A)$。考虑常数随机变量 $Y(\omega) = \mathbb E X$。
第一，由于常数函数对任意 $\sigma$-代数都是可测的，故 $Y$ 必然是 $\mathcal G$-可测的，且因 $X$ 可积，$Y$ 也可积。
第二，对任意 $A\in\mathcal G$，
$$
\int_A Y \, d\mathbb P = \mathbb E[Y\mathbf 1_A] = \mathbb E[\mathbb E X \cdot \mathbf 1_A] = \mathbb E X \cdot \mathbb P(A)
$$
结合已知假设，该积分等于 $\mathbb E[X\mathbf 1_A] = \int_A X \, d\mathbb P$。
因此，常数 $\mathbb E X$ 完全满足条件期望定义的两条公理。由 Radon-Nikodym 定理保证的几乎必然唯一性，必有 $\mathbb E[X\mid\mathcal G] = \mathbb E X$ 几乎必然。

□

关于充分性与非必要性的说明：若 $X$ 与 $\mathcal G$ 独立，则对任意 $A\in\mathcal G$，$X$ 与示性变量 $\mathbf 1_A$ 独立，由独立变量乘积的期望性质有 $\mathbb E[X\mathbf 1_A] = \mathbb E X \cdot \mathbb E[\mathbf 1_A] = \mathbb E X\cdot\mathbb P(A)$，故独立性是充分条件。

但独立性不是必要条件。构造离散反例如下：设随机变量 $Z$ 的概率分布为 $\mathbb P(Z=-1) = \mathbb P(Z=0) = \mathbb P(Z=1) = 1/3$。取 $X = Z$，$\mathcal G = \sigma(Z^2)$。此时 $X$ 的期望为 $\mathbb E X = 0$。而 $\sigma$-代数 $\mathcal G$ 由事件 $\{Z^2=0\} = \{Z=0\}$ 与 $\{Z^2=1\} = \{Z\in\{-1,1\}\}$ 生成。检验部分平均：
$$
\mathbb E[X\mathbf 1_{\{Z=0\}}] = 0\cdot \frac{1}{3} = 0 = \mathbb E X\cdot\mathbb P(Z=0)
$$
$$
\mathbb E[X\mathbf 1_{\{Z^2=1\}}] = (-1)\cdot \frac{1}{3} + 1\cdot \frac{1}{3} = 0 = \mathbb E X\cdot\mathbb P(Z^2=1)
$$
因此 $\mathbb E[X\mid\mathcal G] = 0 = \mathbb E X$ 几乎必然。然而 $X$ 与 $\mathcal G$ 并不独立，例如 $\mathbb P(X=0\mid Z^2=1) = 0 \ne \mathbb P(X=0) = 1/3$。这表明均值独立（或条件期望退化）弱于统计独立。

本题常见错误是把条件期望退化为常数等同于独立性，或者在构造反例时未能给出严格的概率空间验证。
## 7. 
本题考查利用对称性与可交换性（Exchangeability）求解条件期望的经典技巧，以及条件期望在可加信息下的投影性质。

**证明**

因为 $X$ 与 $Y$ 独立同分布，二维随机向量 $(X, Y)$ 与 $(Y, X)$ 具有完全相同的联合概率分布。考虑可测变换 $(u, v) \mapsto (u, u+v)$ 与 $(u, v) \mapsto (v, u+v)$。由于 $(X, Y) \stackrel{d}{=} (Y, X)$，随机向量 $(X, X+Y)$ 与 $(Y, X+Y)$ 的联合概率分布完全相同。

由此，对任意一维 Borel 可测函数 $h$（满足可积性条件），均有
$$
\mathbb E[X h(X+Y)] = \mathbb E[Y h(X+Y)]
$$
这说明在给定 $\sigma(X+Y)$ 的条件下，$X$ 与 $Y$ 的条件分布完全相同。根据条件期望由部分平均性质决定的唯一性，必有
$$
\mathbb E[X\mid X+Y] = \mathbb E[Y\mid X+Y]
$$
几乎必然成立。此处的关键步骤正是利用了 $X$ 与 $Y$ 的可交换性，使得两随机变量与观测和 $X+Y$ 的联合结构完全对称。

另一方面，由条件期望的线性性质以及 $X+Y$ 关于自身生成的 $\sigma$-代数 $\sigma(X+Y)$ 可测，
$$
\mathbb E[X\mid X+Y] + \mathbb E[Y\mid X+Y] = \mathbb E[X+Y\mid X+Y] = X+Y
$$
几乎必然成立。将对称性等式代入上式，得到
$$
2\mathbb E[X\mid X+Y] = X+Y
$$
两端同除以 $2$，即得
$$
\mathbb E[X\mid X+Y] = \frac{X+Y}{2}
$$
几乎必然成立。

□

本题常见错误是不加证明地直接假设 $\mathbb E[X\mid X+Y]=\mathbb E[Y\mid X+Y]$，忽视了该等式必须依赖同分布（可交换性）；若两变量同为独立正态但方差不同，则条件期望将成为按精度加权的非对称线性组合，上述均分结论不再成立。

## 8. 
本题考查条件期望的塔性质（平滑性定理）的抽象测度论证明，以及信息嵌套对估计波动性的单调递增放大效应。

**证明**

首先证明塔性质。设 $X$ 可积，$\mathcal G_1\subseteq\mathcal G_2\subseteq\mathcal F$。记 $Z = \mathbb E[X\mid\mathcal G_2]$。待证目标为 $\mathbb E[Z\mid\mathcal G_1] = \mathbb E[X\mid\mathcal G_1]$ 几乎必然。
根据定义，只需验证 $\mathbb E[X\mid\mathcal G_1]$ 满足作为 $Z$ 关于 $\mathcal G_1$ 的条件期望的两条判定条件：
第一，$\mathbb E[X\mid\mathcal G_1]$ 自身是 $\mathcal G_1$-可测的，且因 $X$ 可积，它也是可积的。
第二，对任意 $A\in\mathcal G_1$，由于子 $\sigma$-代数嵌套假设 $\mathcal G_1\subseteq\mathcal G_2$，该事件必然也满足 $A\in\mathcal G_2$。
由 $Z = \mathbb E[X\mid\mathcal G_2]$ 关于 $\mathcal G_2$ 的部分平均性质，对包含在 $\mathcal G_2$ 中的事件 $A$，有
$$
\int_A Z \, d\mathbb P = \int_A X \, d\mathbb P
$$
同时，由 $\mathbb E[X\mid\mathcal G_1]$ 关于 $\mathcal G_1$ 的部分平均性质，对 $A\in\mathcal G_1$，亦有
$$
\int_A \mathbb E[X\mid\mathcal G_1] \, d\mathbb P = \int_A X \, d\mathbb P
$$
比较两式右端，可知对一切 $A\in\mathcal G_1$，均有
$$
\int_A Z \, d\mathbb P = \int_A \mathbb E[X\mid\mathcal G_1] \, d\mathbb P
$$
由条件期望的几乎必然唯一性，证得
$$
\mathbb E\bigl[\mathbb E[X\mid\mathcal G_2]\mid\mathcal G_1\bigr] = \mathbb E[X\mid\mathcal G_1]
$$
几乎必然成立。

接着证明方差不等式。假设 $X$ 平方可积。对随机变量 $W = \mathbb E[X\mid\mathcal G_2]$ 关于子 $\sigma$-代数 $\mathcal G_1$ 应用全方差公式：
$$
\operatorname{Var}(W) = \mathbb E[\operatorname{Var}(W\mid\mathcal G_1)] + \operatorname{Var}(\mathbb E[W\mid\mathcal G_1])
$$
将刚证得的塔性质 $\mathbb E[W\mid\mathcal G_1] = \mathbb E[X\mid\mathcal G_1]$ 代入第二项，即得
$$
\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_2]\bigr) = \mathbb E\Bigl[\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_2]\mid\mathcal G_1\bigr)\Bigr] + \operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_1]\bigr)
$$
由于条件方差几乎必然非负，其数学期望必满足
$$
\mathbb E\Bigl[\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_2]\mid\mathcal G_1\bigr)\Bigr] \ge 0
$$
由此立即推得
$$
\operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_2]\bigr) \ge \operatorname{Var}\bigl(\mathbb E[X\mid\mathcal G_1]\bigr)
$$
这表明信息集越大（从 $\mathcal G_1$ 扩充到 $\mathcal G_2$），条件均值随机变量吸收的信息越多，其取值的分散程度和波动性越大。

□

本题常见错误是颠倒塔性质的内外层包含关系，误认为以较大代数做内层条件时结果仍受较大代数控制；或者混淆「预测值的方差」与「预测误差的方差」，误以为信息增加会使估计量本身的方差减小。实际上信息增加使预测误差方差减小，而使预测值方差增大。

## 9. 
本题考查条件 Jensen 不等式的支撑超平面可数化构造证明，以及 $L^1$ 范数压缩性质的推导。

**证明**

设 $\varphi: \mathbb R\to\mathbb R$ 为凸函数。根据一元凸函数的几何性质，凸函数处处存在支撑线，且由于实数集的开区间具有可数稠密子集，凸函数 $\varphi$ 可以表示为一族可数条支撑直线的上确界。即存在实数序列对 $(a_k, b_k)_{k=1}^\infty$，使得对一切 $u\in\mathbb R$，
$$
\varphi(u) = \sup_{k\ge 1} (a_k u + b_k)
$$
特别地，对随机变量 $X$，对每一个固定的指标 $k\ge 1$，恒有
$$
a_k X + b_k \le \varphi(X)
$$
几乎必然成立。两端取关于子 $\sigma$-代数 $\mathcal G$ 的条件期望。由于条件期望具有保序单调性与线性性质，
$$
\mathbb E[a_k X + b_k\mid\mathcal G] = a_k \mathbb E[X\mid\mathcal G] + b_k \le \mathbb E[\varphi(X)\mid\mathcal G]
$$
对每个固定的 $k$ 几乎必然成立。

记使上述不等式不成立的零概率事件为 $N_k$。令 $N = \bigcup_{k=1}^\infty N_k$。由于可数个零测度集的并集仍为零测度集，$\mathbb P(N)=0$。因此在零测集 $N$ 之外，对所有的 $k\ge 1$ 不等式同时成立：
$$
a_k \mathbb E[X\mid\mathcal G](\omega) + b_k \le \mathbb E[\varphi(X)\mid\mathcal G](\omega), \quad \forall k\ge 1, \; \omega\notin N
$$
在两端对 $k\ge 1$ 取上确界，由上确界在常数控制下的性质，
$$
\sup_{k\ge 1} \bigl( a_k \mathbb E[X\mid\mathcal G] + b_k \bigr) \le \mathbb E[\varphi(X)\mid\mathcal G]
$$
在零测集之外成立。由支撑线族的定义，左端表达式在点 $u = \mathbb E[X\mid\mathcal G]$ 处的值恰为 $\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr)$。故证得
$$
\varphi\bigl(\mathbb E[X\mid\mathcal G]\bigr) \le \mathbb E[\varphi(X)\mid\mathcal G]
$$
几乎必然成立。

特别地，取函数 $\varphi(u) = |u|$。由三角不等式知绝对值函数是实数轴上的连续凸函数。直接将 $\varphi(u)=|u|$ 代入上述不等式，立即得到
$$
\bigl|\mathbb E[X\mid\mathcal G]\bigr| \le \mathbb E[|X|\mid\mathcal G]
$$
几乎必然成立。

□

本题常见错误是直接对不可数个支撑超平面取上确界，忽视了不可数个零测集的并集可能不再是零测集（甚至可能不可测）；或者试图用积分的 Jensen 不等式对点态条件概率代入，而在抽象 $\sigma$-代数上无条件正规条件概率分布可能并不存在。
## 10. 
本题考查复合随机变量（随机求和）的期望与方差推导，以及正态分量复合二项分布的混合分布结构。

设 $S = \sum_{i=1}^N X_i$，其中规定当 $N=0$ 时空和 $S=0$。已知 $X_i$ 独立同分布于 $N(0, \sigma^2)$ 且与 $N$ 独立。
在给定 $N=k$ 条件下，$S$ 是 $k$ 个独立同分布正态变量之和。由条件期望与条件方差公式：
$$
\mathbb E[S\mid N] = N \mathbb E[X_1] = N \times 0 = 0
$$
$$
\operatorname{Var}(S\mid N) = N \operatorname{Var}(X_1) = N \sigma^2
$$
由全期望公式，
$$
\mathbb E[S] = \mathbb E[\mathbb E[S\mid N]] = \mathbb E[0] = 0
$$
由全方差公式，
$$
\operatorname{Var}(S) = \mathbb E[\operatorname{Var}(S\mid N)] + \operatorname{Var}(\mathbb E[S\mid N]) = \mathbb E[N \sigma^2] + \operatorname{Var}(0) = \sigma^2 \mathbb E[N]
$$
因为 $N\sim\operatorname{Binomial}(n,p)$，其均值为 $\mathbb E[N] = np$。代入得
$$
\operatorname{Var}(S) = np\sigma^2
$$
关于 $S$ 的边缘分布：在给定 $N=k$ 条件下，当 $k=0$ 时 $S$ 退化为以概率 $1$ 等于 $0$ 的 Dirac 测度 $\delta_0$；当 $k\ge 1$ 时，$S\mid N=k \sim N(0, k\sigma^2)$。因此 $S$ 的边缘分布是离散与连续混合的高斯混合分布，其特征函数为
$$
\varphi_S(t) = \mathbb E[e^{i t S}] = \mathbb E\bigl[\mathbb E[e^{i t S}\mid N]\bigr] = \mathbb E\left[ \exp\left( -\frac{1}{2}k\sigma^2 t^2 \right) \right] = \sum_{k=0}^n \binom{n}{k} p^k (1-p)^{n-k} \exp\left( -\frac{1}{2} k\sigma^2 t^2 \right)
$$
利用二项式定理可闭式写为
$$
\varphi_S(t) = \left( 1 - p + p\exp\left( -\frac{1}{2}\sigma^2 t^2 \right) \right)^n
$$
其概率测度由原点处的点质量 $(1-p)^n \delta_0$ 与连续部分 $\sum_{k=1}^n \binom{n}{k} p^k (1-p)^{n-k} \frac{1}{\sqrt{2\pi k}\sigma}\exp\left(-\frac{s^2}{2k\sigma^2}\right)$ 共同构成。

本题常见错误是草率断言 $S$ 服从正态分布 $N(0, np\sigma^2)$。实际上随机项数的高斯和通常具有肥尾或超高阶峰度，除退化情形外不再属于正态分布族。

## 11. 
本题考查保险精算中的 Poisson-Gamma 混合计数模型，运用全期望与全方差公式揭示潜变量异质性引发过度离散的机制及其在精算定价中的重要意义。

已知在给定 $\Lambda$ 条件下，$N\mid\Lambda\sim\operatorname{Poisson}(\Lambda)$。泊松分布的条件矩满足
$$
\mathbb E[N\mid\Lambda] = \Lambda, \quad \operatorname{Var}(N\mid\Lambda) = \Lambda
$$
而风险异质性参数 $\Lambda$ 服从形状参数为 $\alpha$、速率参数为 $\beta$ 的 Gamma 分布，其概率密度为 $f_\Lambda(\lambda) = \frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda}$（$\lambda>0$）。其一阶矩与二阶中心矩为
$$
\mathbb E[\Lambda] = \frac{\alpha}{\beta}, \quad \operatorname{Var}(\Lambda) = \frac{\alpha}{\beta^2}
$$
应用全期望公式计算理赔次数期望：
$$
\mathbb E N = \mathbb E[\mathbb E[N\mid\Lambda]] = \mathbb E[\Lambda] = \frac{\alpha}{\beta}
$$
应用全方差公式展开理赔次数总方差：
$$
\operatorname{Var}(N) = \mathbb E[\operatorname{Var}(N\mid\Lambda)] + \operatorname{Var}(\mathbb E[N\mid\Lambda]) = \mathbb E[\Lambda] + \operatorname{Var}(\Lambda) = \frac{\alpha}{\beta} + \frac{\alpha}{\beta^2}
$$
提取公因式，可表示为
$$
\operatorname{Var}(N) = \frac{\alpha}{\beta}\left(1 + \frac{1}{\beta}\right) = \mathbb E N \left(1 + \frac{1}{\beta}\right)
$$
因为速率参数 $\beta>0$，必有 $1 + 1/\beta > 1$，故恒有 $\operatorname{Var}(N) > \mathbb E N$。

过度离散的来源与定价含义：
标准泊松模型要求方差等于期望（等离散性）。本模型中方差严格大于期望，即过度离散（Overdispersion）。由全方差分解清晰可见，第一项 $\mathbb E[\operatorname{Var}(N\mid\Lambda)]$ 为同质群体的泊松抽样随机性（组内方差），恰等于 $\mathbb E N$；而超出部分完全来自第二项 $\operatorname{Var}(\mathbb E[N\mid\Lambda]) = \operatorname{Var}(\Lambda) = \alpha/\beta^2$，即投保人群体间风险率 $\Lambda$ 的未观测异质性（组间方差）。
在风险定价中，若精算师忽视异质性而误套用纯泊松模型，将低估保单组合极端索赔聚集的厚尾风险与方差。这会导致风险资本储备计提不足、安全附加保费被严重低估，进而引发破产概率上升。因此在实际车险与健康险定价中，必须采用负二项回归（Negative Binomial）等能够容纳组间异质性方差的过度离散模型。

本题常见错误是混淆 Gamma 分布的速率参数 $\beta$ 与尺度参数 $\theta = 1/\beta$，导致方差公式中系数倒置；或者误将过度离散归咎于泊松分布本身，未能指出其根本原因是混合所引入的组间异质性方差。

## 12. 
本题考查全协方差公式的严格证明，以及条件独立（或条件不相关）在总体层面产生虚假相关性的统计悖论（Simpson 悖论的概率论根源）。

**证明**

根据全协方差公式（命题 13.10），对于任意平方可积的随机变量 $X, Y$ 及子 $\sigma$-代数 $\mathcal G$，恒有恒等式：
$$
\operatorname{Cov}(X,Y) = \mathbb E[\operatorname{Cov}(X,Y\mid\mathcal G)] + \operatorname{Cov}\bigl(\mathbb E[X\mid\mathcal G], \mathbb E[Y\mid\mathcal G]\bigr)
$$
已知条件给定 $\operatorname{Cov}(X,Y\mid\mathcal G) = 0$ 几乎必然成立。对该几乎必然为零的随机变量取数学期望，其均值恒等于零：
$$
\mathbb E[\operatorname{Cov}(X,Y\mid\mathcal G)] = \mathbb E[0] = 0
$$
将此结果代入全协方差公式，立即得到
$$
\operatorname{Cov}(X,Y) = \operatorname{Cov}\bigl(\mathbb E[X\mid\mathcal G], \mathbb E[Y\mid\mathcal G]\bigr)
$$
由于题目已知总体协方差不为零，即 $\operatorname{Cov}(X,Y)\ne 0$，因此必有
$$
\operatorname{Cov}\bigl(\mathbb E[X\mid\mathcal G], \mathbb E[Y\mid\mathcal G]\bigr)\ne 0
$$
几乎必然成立。

□

离散构造实例：
设总体由两个规模相等的子群体构成，用指示变量 $Z\in\{1, 2\}$ 标记，$\mathbb P(Z=1) = \mathbb P(Z=2) = 1/2$，令 $\mathcal G = \sigma(Z)$。
在子群体 $Z=1$ 中，$(X,Y)$ 以概率 $1$ 取值为 $(-1, -1)$。
在子群体 $Z=2$ 中，$(X,Y)$ 以概率 $1$ 取值为 $(1, 1)$。
在每个子群内，$X$ 与 $Y$ 均为常数，故条件方差与条件协方差恒为零：
$$
\operatorname{Cov}(X,Y\mid Z=1) = 0, \quad \operatorname{Cov}(X,Y\mid Z=2) = 0 \implies \operatorname{Cov}(X,Y\mid\mathcal G) = 0
$$
然而计算总体期望与协方差：$\mathbb E X = \frac{1}{2}(-1) + \frac{1}{2}(1) = 0$，$\mathbb E Y = 0$。
$$
\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E X \mathbb E Y = \frac{1}{2}(-1)(-1) + \frac{1}{2}(1)(1) - 0 = 1 \ne 0
$$
同时，条件均值向量分别为 $\mathbb E[X\mid Z] = 2Z - 3$，$\mathbb E[Y\mid Z] = 2Z - 3$，它们的协方差为 $\operatorname{Cov}(2Z-3, 2Z-3) = 4\operatorname{Var}(Z) = 4 \times \frac{1}{4} = 1$。

与 Simpson 悖论的关系：
Simpson 悖论指的是在各个子群内均不存在相关性（甚至为负相关）的两个变量，在合并总体后却呈现出强烈的正相关（或反向相关）。全协方差公式揭示了这一悖论的本质数学机制：总体相关性由「组内条件相关性均值」与「组间条件均值的相关性」叠加而成。即使在每一个局部分层中 $X$ 与 $Y$ 彼此独立无关联（组内协方差为零），但若潜在混杂因素 $\mathcal G$ 同时驱动了 $X$ 与 $Y$ 的均值产生同向跳跃（组间协方差非零），总体观测数据便会展现出强烈的虚假相关性。

本题常见错误是在全协方差公式中混淆期望与协方差算子的作用位置，或者误认为条件不相关能够推导总体不相关，忽视了条件均值本身作为随机变量的相关性。
## 13. 
本题考查 $L^2$ 最优预测（条件期望）与最佳线性预测（BLP）的闭式推导、最小均方误差计算，以及两者重合的深层几何机制。

给定联合密度 $f(x,y) = 2$（$0<x<y<1$）。
首先求 $Y$ 的边缘密度函数：对 $x$ 从 $0$ 到 $y$ 积分，
$$
f_Y(y) = \int_0^y 2 \, dx = 2y, \quad 0<y<1
$$
给定 $Y=y$ 时 $X$ 的条件概率密度为
$$
f_{X\mid Y}(x\mid y) = \frac{f(x,y)}{f_Y(y)} = \frac{2}{2y} = \frac{1}{y}, \quad 0<x<y
$$
此分布为区间 $(0,y)$ 上的均匀分布 $U(0,y)$。因此最优非线性预测为
$$
g^*(Y) = \mathbb E[X\mid Y] = \frac{Y}{2}
$$
其条件方差为均匀分布的方差 $\operatorname{Var}(X\mid Y=y) = y^2 / 12$。
由正交分解性质，最小均方误差（MMSE）等于条件方差的期望：
$$
\operatorname{MMSE} = \mathbb E\bigl[(X - \mathbb E[X\mid Y])^2\bigr] = \mathbb E[\operatorname{Var}(X\mid Y)] = \mathbb E\left[\frac{Y^2}{12}\right] = \frac{1}{12}\int_0^1 y^2 (2y) \, dy = \frac{1}{12} \left[ \frac{y^4}{2} \right]_0^1 = \frac{1}{24}
$$
接着求最佳线性预测 $\hat{X}_{\text{lin}} = a + b Y$。计算所需的一阶与二阶矩：
$$
\mathbb E Y = \int_0^1 y(2y) \, dy = \frac{2}{3}, \quad \mathbb E[Y^2] = \int_0^1 y^2(2y) \, dy = \frac{1}{2}
$$
$$
\operatorname{Var}(Y) = \frac{1}{2} - \left(\frac{2}{3}\right)^2 = \frac{1}{2} - \frac{4}{9} = \frac{1}{18}
$$
$X$ 的边缘密度为 $f_X(x) = \int_x^1 2 \, dy = 2(1-x)$（$0<x<1$），故
$$
\mathbb E X = \int_0^1 x \cdot 2(1-x) \, dx = 2\left(\frac{1}{2} - \frac{1}{3}\right) = \frac{1}{3}
$$
计算交叉乘积矩：
$$
\mathbb E[XY] = \int_0^1 dy \int_0^y dx \, 2xy = \int_0^1 2y \left[\frac{x^2}{2}\right]_0^y dy = \int_0^1 y^3 \, dy = \frac{1}{4}
$$
协方差为
$$
\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E X \mathbb E Y = \frac{1}{4} - \frac{1}{3}\times\frac{2}{3} = \frac{1}{4} - \frac{2}{9} = \frac{1}{36}
$$
最佳线性回归系数与截距为
$$
b = \frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)} = \frac{1/36}{1/18} = \frac{1}{2}
$$
$$
a = \mathbb E X - b \mathbb E Y = \frac{1}{3} - \frac{1}{2}\times\frac{2}{3} = 0
$$
因此最佳线性预测为 $\hat{X}_{\text{lin}} = \frac{1}{2}Y$，与条件期望 $g^*(Y) = \frac{1}{2}Y$ 完全重合。

重合原因：在 Hilbert 空间 $L^2$ 中，最佳线性预测是 $X$ 向一维仿射子空间 $\operatorname{span}\{1, Y\}$ 的正交投影，而最优预测是 $X$ 向一般子 $\sigma$-代数可测空间 $L^2(\sigma(Y))$ 的正交投影。在本例中，无约束条件期望 $\mathbb E[X\mid Y]$ 恰好是一次多项式（仿射函数），直接落入了一维线性子空间中。当更大的投影空间中的最优解本身就属于其子空间时，子空间上的带约束最优解必然与之重合。

本题常见错误是在二重积分求解 $\mathbb E[XY]$ 时忽视积分限的相互约束导致计算错误，或误以为只有联合正态分布下最佳线性预测才会与条件期望重合。

## 14. 
本题考查非线性投影中误差正交性条件的严格解析检验，巩固 Hilbert 空间正交投影定理在条件期望中的实现。

**证明**

联合密度为 $f(x,y) = y^{-2}$（$0<x<y^2$，$0<y<1$）。
首先求 $Y$ 的边缘密度：
$$
f_Y(y) = \int_0^{y^2} y^{-2} \, dx = y^{-2} \cdot y^2 = 1, \quad 0<y<1
$$
这说明 $Y\sim U(0,1)$。
给定 $Y=y$ 时 $X$ 的条件概率密度为
$$
f_{X\mid Y}(x\mid y) = \frac{f(x,y)}{f_Y(y)} = \frac{y^{-2}}{1} = \frac{1}{y^2}, \quad 0<x<y^2
$$
即 $X\mid Y=y \sim U(0, y^2)$。因此条件期望确实为 $g^*(y) = \mathbb E[X\mid Y=y] = y^2/2$。

现检验正交性条件。设 $h$ 为任意使 $\mathbb E[h(Y)^2]<\infty$ 的 Borel 可测函数。由联合期望的 Fubini 定理：
$$
\mathbb E\bigl[(X - g^*(Y))h(Y)\bigr] = \int_0^1 \left( \int_0^{y^2} \left(x - \frac{y^2}{2}\right) h(y) y^{-2} \, dx \right) dy
$$
在内层关于 $x$ 的积分中，因子 $h(y) y^{-2}$ 与 $x$ 无关，可直接提取到内层积分之外：
$$
\int_0^{y^2} \left(x - \frac{y^2}{2}\right) dx = \left[ \frac{x^2}{2} - \frac{y^2}{2} x \right]_0^{y^2} = \frac{(y^2)^2}{2} - \frac{y^2}{2}\cdot y^2 = \frac{y^4}{2} - \frac{y^4}{2} = 0
$$
由于对每一个确定的 $y\in(0,1)$，内层积分严格为零，将其代入外层积分中，
$$
\mathbb E\bigl[(X - g^*(Y))h(Y)\bigr] = \int_0^1 0 \cdot h(y) y^{-2} \, dy = 0
$$
这直接验证了预测残差 $X - g^*(Y)$ 与任意以 $Y$ 为自变量的平方可积测度变换 $h(Y)$ 均严格正交。

□

本题常见错误是仅对特殊的线性测试函数 $h(y)=y$ 验证正交性，而未能利用内层逐点积分对任意可测函数 $h$ 给出普遍性证明。

## 15. 
本题考查 $L^2$ 空间上条件期望作为正交投影算子的几何性质、残差最小范数推导以及压缩算子范数界。

**证明**

设 $X\in L^2(\Omega, \mathcal F, \mathbb P)$，$\mathcal G\subseteq\mathcal F$。记 $\hat{X} = \mathbb E[X\mid \mathcal G]$。
对任意 $Y\in L^2(\Omega, \mathcal G, \mathbb P)$，将误差分解为
$$
X - Y = (X - \hat{X}) + (\hat{X} - Y)
$$
在 $L^2$ 范数下展开平方：
$$
\mathbb E[(X - Y)^2] = \mathbb E\bigl[(X - \hat{X})^2\bigr] + 2\mathbb E\bigl[(X - \hat{X})(\hat{X} - Y)\bigr] + \mathbb E\bigl[(\hat{X} - Y)^2\bigr]
$$
考察交叉项。由于 $\hat{X} - Y$ 是 $\mathcal G$-可测的且属于 $L^2$，根据条件期望的塔性质与“已知信息可提出”性质：
$$
\mathbb E\bigl[(X - \hat{X})(\hat{X} - Y)\bigr] = \mathbb E\Bigl[\mathbb E\bigl[(X - \hat{X})(\hat{X} - Y)\mid\mathcal G\bigr]\Bigr] = \mathbb E\Bigl[(\hat{X} - Y)\mathbb E\bigl[X - \hat{X}\mid\mathcal G\bigr]\Bigr]
$$
由定义，$\mathbb E[X - \hat{X}\mid\mathcal G] = \mathbb E[X\mid\mathcal G] - \hat{X} = 0$ 几乎必然成立。故交叉项恒为零，得到勾股定理形式的平方分解：
$$
\mathbb E[(X - Y)^2] = \mathbb E\bigl[(X - \hat{X})^2\bigr] + \mathbb E\bigl[(\hat{X} - Y)^2\bigr]
$$
因为 $\mathbb E[(\hat{X} - Y)^2] \ge 0$，等号当且仅当 $Y = \hat{X}$ 几乎必然成立时取得。这证明了 $\hat{X} = \mathbb E[X\mid\mathcal G]$ 是 $L^2(\Omega,\mathcal G,\mathbb P)$ 中距离 $X$ 最近的唯一元素。

最小距离的平方即为
$$
\mathbb E\bigl[(X - \hat{X})^2\bigr] = \mathbb E\Bigl[\mathbb E\bigl[(X - \mathbb E[X\mid\mathcal G])^2\mid\mathcal G\bigr]\Bigr] = \mathbb E[\operatorname{Var}(X\mid\mathcal G)]
$$
最后证明压缩性质。在上述勾股恒等式中取特例 $Y = 0$（常数 $0$ 属于 $L^2(\Omega,\mathcal G,\mathbb P)$）：
$$
\mathbb E[X^2] = \mathbb E\bigl[(X - \hat{X})^2\bigr] + \mathbb E[\hat{X}^2]
$$
由于第一项 $\mathbb E[(X - \hat{X})^2]\ge 0$，移项即得
$$
\mathbb E\bigl[(\mathbb E[X\mid\mathcal G])^2\bigr] \le \mathbb E[X^2]
$$
两端开平方根，由 $L^2$ 范数的定义 $\|\cdot\|_2 = \sqrt{\mathbb E[(\cdot)^2]}$，立即得到
$$
\bigl\|\mathbb E[X\mid\mathcal G]\bigr\|_2 \le \|X\|_2
$$
这证明了条件期望算子在 $L^2$ 上的算子范数不超过 $1$，即它是一个正交投影与压缩算子。

□

本题常见错误是在交叉项为零的证明中漏掉提出 $\mathcal G$-可测随机变量的严格测度论论据，或者未能意识到取 $Y=0$ 即可直接由勾股分解导出范数压缩性。
## 16. 
本题考查状态依从（动态）最小方差对冲与无条件（静态）对冲的数学对比、全方差与全协方差分解在风险管理中的应用。

设状态空间为 $\Theta\in\{L, H\}$，两状态等概率发生：$\mathbb P(\Theta=L) = \mathbb P(\Theta=H) = 0.5$。
在给定状态下，最小方差对冲比由该状态下的条件协方差与条件方差之比决定：
在低波动状态 $\Theta=L$ 下：
$$
h^*(L) = \frac{\operatorname{Cov}(S,H\mid\Theta=L)}{\operatorname{Var}(H\mid\Theta=L)} = \frac{0.006}{0.01} = 0.6
$$
在该状态下的对冲残差条件方差为
$$
\operatorname{Var}(S - h^*(L)H\mid L) = \operatorname{Var}(S\mid L) - \frac{\operatorname{Cov}(S,H\mid L)^2}{\operatorname{Var}(H\mid L)} = 0.04 - \frac{0.006^2}{0.01} = 0.04 - 0.0036 = 0.0364
$$
在高波动状态 $\Theta=H$ 下：
$$
h^*(H) = \frac{\operatorname{Cov}(S,H\mid\Theta=H)}{\operatorname{Var}(H\mid\Theta=H)} = \frac{0.054}{0.09} = 0.6
$$
在该状态下的对冲残差条件方差为
$$
\operatorname{Var}(S - h^*(H)H\mid H) = \operatorname{Var}(S\mid H) - \frac{\operatorname{Cov}(S,H\mid H)^2}{\operatorname{Var}(H\mid H)} = 0.04 - \frac{0.054^2}{0.09} = 0.04 - 0.0324 = 0.0076
$$
因此，状态相关对冲比在两状态下均为 $h^*(L) = h^*(H) = 0.6$。采用状态信息时的全期望对冲方差为
$$
\mathbb E[\operatorname{Var}(S - h^*(\Theta)H\mid\Theta)] = 0.5\times 0.0364 + 0.5\times 0.0076 = 0.0220
$$
接着计算无视状态信息的静态对冲比 $h_{\text{static}}$。在无均值偏移的设定下，由全方差与全协方差公式：
$$
\operatorname{Var}(H) = \mathbb E[\operatorname{Var}(H\mid\Theta)] = 0.5\times 0.01 + 0.5\times 0.09 = 0.05
$$
$$
\operatorname{Cov}(S,H) = \mathbb E[\operatorname{Cov}(S,H\mid\Theta)] = 0.5\times 0.006 + 0.5\times 0.054 = 0.03
$$
静态最优对冲比为
$$
h_{\text{static}} = \frac{\operatorname{Cov}(S,H)}{\operatorname{Var}(H)} = \frac{0.03}{0.05} = 0.6
$$
静态对冲的残差方差为
$$
\operatorname{Var}(S - h_{\text{static}}H) = \operatorname{Var}(S) - 2h_{\text{static}}\operatorname{Cov}(S,H) + h_{\text{static}}^2 \operatorname{Var}(H) = 0.04 - 2\times 0.6\times 0.03 + 0.36\times 0.05 = 0.0220
$$
对比可知：由于高低波动状态下期货的波动率与两者的协方差成严格等比例放大，条件贝塔系数保持恒定为 $0.6$。因此静态对冲比与状态相关对冲比完全相同，采用状态信息后对冲误差的相对降幅为 $0\%$。这一结果在量化投资中表明：当体制转换仅改变整体波动尺度而不改变资产间的相对线性敏感度时，动态调仓不会带来额外的方差降低收益。

本题常见错误是误以为高波动状态下的最优对冲比必然上升，或者在计算静态方差时忽视等权重平均导致静态比率算错。

## 17. 
本题考查金融工程中最小方差对冲比的泛函极值推导、一阶条件与正交性条件的几何解释。

**证明**

设 $S, H$ 均已中心化，即 $\mathbb E S = 0$，$\mathbb E H = 0$。此时对冲组合 $S - h H$ 的均值亦为零，其方差等于二阶原点矩：
$$
f(h) = \operatorname{Var}(S - h H) = \mathbb E[(S - h H)^2] = \mathbb E[S^2] - 2h\mathbb E[SH] + h^2\mathbb E[H^2]
$$
利用中心化性质，$\mathbb E[S^2] = \operatorname{Var}(S)$，$\mathbb E[SH] = \operatorname{Cov}(S,H)$，$\mathbb E[H^2] = \operatorname{Var}(H)$。目标函数化为
$$
f(h) = \operatorname{Var}(S) - 2h\operatorname{Cov}(S,H) + h^2\operatorname{Var}(H)
$$
因为 $\operatorname{Var}(H) > 0$，$f(h)$ 是关于实变量 $h$ 的严格凸二次多项式。对其求一阶导数并令其为零：
$$
f'(h) = -2\operatorname{Cov}(S,H) + 2h\operatorname{Var}(H) = 0
$$
解得唯一驻点：
$$
h^* = \frac{\operatorname{Cov}(S,H)}{\operatorname{Var}(H)}
$$
由于二阶导数 $f''(h) = 2\operatorname{Var}(H) > 0$，该驻点严格达到全局最小值。该表达式完全等同于以 $H$ 为自变量回归 $S$ 时普通最小二乘法（OLS）的回归斜率。

接着验证对冲残差与对冲工具的正交性。计算协方差：
$$
\operatorname{Cov}(S - h^* H, H) = \operatorname{Cov}(S, H) - h^*\operatorname{Var}(H) = \operatorname{Cov}(S,H) - \frac{\operatorname{Cov}(S,H)}{\operatorname{Var}(H)}\operatorname{Var}(H) = 0
$$
正交性得证。

□

正交性作为「用尽信息」的数学表述解释：
在平方可积随机变量构成的 Hilbert 空间中，随机变量间的协方差即为内积。若残差 $S - h H$ 与对冲工具 $H$ 的协方差不为零，说明残差在 $H$ 所张成的一维子空间上仍有非零的投影分量。这意味着决策者可以通过进一步增加或减少对冲头寸 $\Delta h$，将该非零投影部分进一步抵消，从而继续严格缩减组合的总方差。因此，只有当协方差精确等于零时，残差向量才与 $H$ 所在子空间垂直，此时利用 $H$ 的任何线性变换都无法再解释或消除残差中的任何一丝方差。这正是对冲操作在最小二乘意义下彻底耗尽了工具 $H$ 所携带的全部线性信息的严格数学表述。

本题常见错误是混淆中心化假设与非中心化情形，或者在阐释正交性时泛泛而谈而未能指出其几何投影与方差极小化之间的必然联系。

## 18. 
本题考查共轭正态分布下的后验分布、条件均值的凸组合结构以及 Bayesian 估计向无偏样本均值的渐近收敛性。

设先验分布为 $\Theta \sim N(\mu_0, \tau^2)$。样本观测为 $Y_1, \dots, Y_n$，给定 $\Theta=\theta$ 时独立同分布于 $N(\theta, \sigma^2)$。
样本均值 $\bar{Y} = \frac{1}{n}\sum_{i=1}^n Y_i$ 是参数 $\theta$ 的充分统计量，其条件分布为 $\bar{Y}\mid\Theta=\theta \sim N(\theta, \sigma^2/n)$。
由 Bayes 定理，后验概率密度与先验密度及似然函数的乘积成正比：
$$
f(\theta\mid Y_1,\dots,Y_n) \propto \exp\left( -\frac{(\theta - \mu_0)^2}{2\tau^2} \right) \exp\left( -\frac{\sum_{i=1}^n (Y_i - \theta)^2}{2\sigma^2} \right)
$$
利用充分统计量分解似然部分，指数项中关于 $\theta$ 的二次型为
$$
-\frac{1}{2}\left[ \frac{(\theta - \mu_0)^2}{\tau^2} + \frac{n(\theta - \bar{Y})^2}{\sigma^2} \right] = -\frac{1}{2}\left[ \left(\frac{1}{\tau^2} + \frac{n}{\sigma^2}\right)\theta^2 - 2\left(\frac{\mu_0}{\tau^2} + \frac{n\bar{Y}}{\sigma^2}\right)\theta + C \right]
$$
其中 $C$ 是与 $\theta$ 无关的项。定义先验精度 $\tau_0 = 1/\tau^2$，样本信息精度 $\tau_{\text{sample}} = n/\sigma^2$。后验总精度为
$$
\frac{1}{\tau_n^2} = \frac{1}{\tau^2} + \frac{n}{\sigma^2}
$$
配方后可知后验分布仍为正态分布：
$$
\Theta\mid Y_1,\dots,Y_n \sim N(\mu_n, \tau_n^2)
$$
后验均值（即最优平方误差预测）为
$$
\mu_n = \mathbb E[\Theta\mid Y_1,\dots,Y_n] = \frac{\frac{\mu_0}{\tau^2} + \frac{n\bar{Y}}{\sigma^2}}{\frac{1}{\tau^2} + \frac{n}{\sigma^2}} = \frac{\sigma^2}{\sigma^2 + n\tau^2}\mu_0 + \frac{n\tau^2}{\sigma^2 + n\tau^2}\bar{Y}
$$
令权重系数 $w_n = \frac{n\tau^2}{\sigma^2 + n\tau^2} = \frac{n}{n + \sigma^2/\tau^2}$，则后验均值可精简写为先验均值与样本均值的凸组合：
$$
\mathbb E[\Theta\mid Y_1,\dots,Y_n] = (1 - w_n)\mu_0 + w_n \bar{Y}
$$
权重随样本量 $n$ 的演变机制：
当 $n=0$（无数据）时，$w_0 = 0$，后验均值完全退化为先验信念 $\mu_0$；
随着样本量 $n$ 递增，$w_n$ 单调递增趋向于 $1$，先验权重 $1-w_n$ 衰减至 $0$。当 $n\to\infty$ 时，数据似然主导后验，后验均值以概率 $1$ 收敛于真实的样本均值 $\bar{Y}$。这一收缩因子 $w_n$ 精确刻画了先验精度与数据精度之间的信息博弈，是现代量化金融中 Black-Litterman 资产配置模型与经验 Bayes 收缩估计的核心原型。

本题常见错误是在指数展开时遗漏了样本量 $n$ 对精度的放大作用，误写样本精度为 $1/\sigma^2$；或者混淆方差与精度的加权方式。
## 19. 
本题考查二元状态判别模型中的后验概率推导、对数几率比的 logistic 形式转换，以及贝叶斯二值决策边界（阈值）的解析求解。

在两状态模型中，状态变量为 $\Theta\in\{A, B\}$，先验分布为 $\mathbb P(\Theta=A) = \pi$，$\mathbb P(\Theta=B) = 1-\pi$。对应两状态的目标变量取值沿用例 13.7 设定，分别对应 $Y(A)=0$ 与 $Y(B)=2$（均值取值对应两状态的信号中心）。
观测信号 $S$ 的条件密度函数为
$$
f_{S\mid\Theta}(s\mid A) = \frac{1}{\sqrt{2\pi}} \exp\left( -\frac{s^2}{2} \right)
$$
$$
f_{S\mid\Theta}(s\mid B) = \frac{1}{\sqrt{2\pi}} \exp\left( -\frac{(s-m)^2}{2} \right)
$$
计算似然比：
$$
\frac{f_{S\mid\Theta}(s\mid B)}{f_{S\mid\Theta}(s\mid A)} = \exp\left( -\frac{(s-m)^2 - s^2}{2} \right) = \exp\left( ms - \frac{m^2}{2} \right)
$$
根据 Bayes 定理，状态后验几率比（Posterior Odds）为
$$
\frac{\mathbb P(\Theta=B\mid S=s)}{\mathbb P(\Theta=A\mid S=s)} = \frac{1-\pi}{\pi} \frac{f_{S\mid\Theta}(s\mid B)}{f_{S\mid\Theta}(s\mid A)} = \exp\left( ms - \frac{m^2}{2} + \ln\frac{1-\pi}{\pi} \right)
$$
记对数几率线性函数为
$$
z(s) = ms - \frac{m^2}{2} + \ln\frac{1-\pi}{\pi}
$$
由于后验概率满足 $\mathbb P(\Theta=A\mid S=s) + \mathbb P(\Theta=B\mid S=s) = 1$，后验概率 $p(s) = \mathbb P(\Theta=A\mid S=s)$ 可表示为
$$
p(s) = \frac{1}{1 + \frac{\mathbb P(\Theta=B\mid S=s)}{\mathbb P(\Theta=A\mid S=s)}} = \frac{1}{1 + e^{z(s)}} = \frac{1}{1 + \exp\left( ms - \frac{m^2}{2} + \ln\frac{1-\pi}{\pi} \right)}
$$
记标准 Logistic 函数为 $\sigma(u) = \frac{1}{1 + e^{-u}}$，则 $p(s)$ 具有严格的 Logistic 形式：
$$
p(s) = \sigma\left( -ms + \frac{m^2}{2} + \ln\frac{\pi}{1-\pi} \right)
$$
接着证明最优预测的阈值分界性。在均方误差准则下，对目标变量 $Y$ 的最优预测为条件期望：
$$
\hat{Y}(s) = \mathbb E[Y\mid S=s] = 0\times \mathbb P(\Theta=A\mid S=s) + 2\times \mathbb P(\Theta=B\mid S=s) = 2[1 - p(s)]
$$
要使最优预测满足 $\hat{Y}(s) > 1$，等价于
$$
2[1 - p(s)] > 1 \iff 1 - p(s) > \frac{1}{2} \iff p(s) < \frac{1}{2}
$$
将 $p(s)$ 的 Logistic 表达式代入，不等式 $p(s) < 1/2$ 严格等价于指数项大于 $1$，即对数几率满足
$$
z(s) = ms - \frac{m^2}{2} + \ln\frac{1-\pi}{\pi} > 0
$$
因为信号漂移参数 $m > 0$，解关于 $s$ 的一次不等式：
$$
s > \frac{m}{2} + \frac{1}{m}\ln\frac{\pi}{1-\pi}
$$
同理，$\hat{Y}(s) < 1$ 严格等价于 $s < \frac{m}{2} + \frac{1}{m}\ln\frac{\pi}{1-\pi}$。
因此，存在唯一临界判别阈值 $s_0$，其显式闭式解为
$$
s_0 = \frac{m}{2} + \frac{1}{m}\ln\frac{\pi}{1-\pi}
$$
当观测信号 $s > s_0$ 时，后验均值大于 $1$；当 $s < s_0$ 时，后验均值小于 $1$。

本题常见错误是在展开二次型时漏掉交叉项的符号，或在反解阈值时忘记先验比对数项的符号，误将 $\ln(\pi/(1-\pi))$ 写成相反号。

## 20. 
本题考查非负随机变量在抽象 $\sigma$-代数下条件期望零测等价性的严格双向测度论证明。

**证明**

首先证明充分性（$\Leftarrow$）：若 $X=0$ 几乎必然成立。
考虑常数随机变量 $Z(\omega) \equiv 0$。
第一，常数随机变量关于任意 $\sigma$-代数 $\mathcal G$ 均可测，且因测度空间总测度有限必可积。
第二，对任意可测集合 $G\in\mathcal G$，
$$
\int_G Z \, d\mathbb P = \int_G 0 \, d\mathbb P = 0
$$
另一方面，因为 $X=0$ 几乎必然，在任意测度子集 $G$ 上的勒贝格积分亦恒为零：
$$
\int_G X \, d\mathbb P = 0
$$
因此对一切 $G\in\mathcal G$，均有 $\int_G Z \, d\mathbb P = \int_G X \, d\mathbb P$。由定义 13.4 条件期望的几乎必然唯一性，证得
$$
\mathbb E[X\mid\mathcal G] = 0
$$
几乎必然成立。

接着证明必要性（$\Rightarrow$）：若 $X\ge 0$ 且 $\mathbb E[X\mid\mathcal G]=0$ 几乎必然成立。
依照提示，在可测空间中考察集合分解。
由定义 13.4 中的部分平均性质，取测试集为全集 $G = \Omega \in\mathcal G$：
$$
\int_\Omega X \, d\mathbb P = \int_\Omega \mathbb E[X\mid\mathcal G] \, d\mathbb P
$$
根据已知假设，随机变量 $\mathbb E[X\mid\mathcal G]$ 几乎必然为零，即存在零测集 $N$ 使得在 $N^c$ 上该变量恒为零。因此在全集上的勒贝格积分严格为零：
$$
\int_\Omega \mathbb E[X\mid\mathcal G] \, d\mathbb P = 0
$$
由此导出无条件总体数学期望
$$
\mathbb E X = \int_\Omega X \, d\mathbb P = 0
$$
现利用实分析与测度论中非负可积函数的标准性质：已知 $X \ge 0$ 几乎必然，且 $\mathbb E X = 0$。
对任意正整数 $n\ge 1$，由马尔可夫不等式，
$$
\mathbb P\left( X \ge \frac{1}{n} \right) \le n \mathbb E X = n \times 0 = 0
$$
由可数可加性，
$$
\mathbb P(X > 0) = \mathbb P\left( \bigcup_{n=1}^\infty \left\{ X \ge \frac{1}{n} \right\} \right) \le \sum_{n=1}^\infty \mathbb P\left( X \ge \frac{1}{n} \right) = 0
$$
结合 $X\ge 0$ 几乎必然，必有 $\mathbb P(X = 0) = 1$。即 $X=0$ 几乎必然成立。

□

本题常见错误是脱离非负性条件 $X\ge 0$ 妄图证明结论；若 $X$ 可正可负（例如对称零均值正态变量），其条件期望完全可以几乎必然为零，而 $X$ 本身绝非几乎必然为零。
## 21. 
本题考查利用可交换性与全期望分解求解极值统计量的条件期望、充分统计量的信息压缩机制，以及一致最小方差无偏估计量（UMVUE）的构造。

设 $X_1,\dots,X_n$ 独立同分布于 $U(0,\theta)$，极值统计量为 $M = \max_{1\le i\le n} X_i$。
因为 $X_i$ 为连续型随机变量，两两相等的概率为零。由联合对称可交换性，事件 $\{X_1 = M\}$ 的概率为 $1/n$，而补事件 $\{X_1 \ne M\}$ 的概率为 $(n-1)/n$。
考察条件期望在两种互斥情形下的取值形式：
第一种情形：在事件 $\{X_1 = M\}$ 发生时。此时 $X_1$ 自身即为极值点，在给定 $M=m$ 的条件下，$X_1$ 的取值退化为确定常数 $m$。因此其条件期望直接为 $m$。
第二种情形：在事件 $\{X_1 \ne M\}$ 发生时。此时极值由其余 $n-1$ 个变量中的某一个取得。在给定 $M=m$ 且已知 $X_1$ 不是极值的条件下，$X_1$ 条件独立于其他非极值变量，且其分布被截断在区间 $(0, m)$ 上，成为 $U(0, m)$ 均匀分布。因此其条件期望为该对称区间的几何中心值 $m/2$。
由全概率条件分解公式，综合两种情形：
$$
\mathbb E[X_1\mid M=m] = \mathbb P(X_1 = M\mid M=m)\cdot m + \mathbb P(X_1 \ne M\mid M=m)\cdot \frac{m}{2} = \frac{1}{n}m + \frac{n-1}{n}\frac{m}{2} = \frac{n+1}{2n}m
$$
写成随机变量形式为
$$
\mathbb E[X_1\mid M] = \frac{n+1}{2n}M
$$
构造无偏估计量：
因为 $X_1 \sim U(0,\theta)$，其无条件均值为 $\mathbb E[X_1] = \theta/2$。
利用全期望公式，
$$
\frac{\theta}{2} = \mathbb E[X_1] = \mathbb E[\mathbb E[X_1\mid M]] = \mathbb E\left[ \frac{n+1}{2n}M \right] = \frac{n+1}{2n} \mathbb E[M]
$$
两端同乘 $2$，即得
$$
\theta = \frac{n+1}{n}\mathbb E[M] = \mathbb E\left[ \frac{n+1}{n}M \right]
$$
因此构造 $\theta$ 的估计量为
$$
\hat{\theta} = \frac{n+1}{n}M
$$
验证其无偏性：
$M$ 的累积分布函数为 $F_M(m) = \mathbb P(M\le m) = \prod_{i=1}^n \mathbb P(X_i\le m) = (m/\theta)^n$（$0<m<\theta$）。
求导得其概率密度函数为 $f_M(m) = \frac{n}{\theta^n}m^{n-1}$（$0<m<\theta$）。
计算 $M$ 的数学期望：
$$
\mathbb E[M] = \int_0^\theta m \cdot \frac{n}{\theta^n}m^{n-1} \, dm = \frac{n}{\theta^n}\left[ \frac{m^{n+1}}{n+1} \right]_0^\theta = \frac{n}{n+1}\theta
$$
代入估计量求期望：
$$
\mathbb E[\hat{\theta}] = \mathbb E\left[\frac{n+1}{n}M\right] = \frac{n+1}{n}\mathbb E[M] = \frac{n+1}{n}\cdot\frac{n}{n+1}\theta = \theta
$$
无偏性得到严格验证。由 Lehmann-Scheffé 定理，由于 $M$ 是完备充分统计量，$\hat{\theta}$ 还是 $\theta$ 的唯一一致最小方差无偏估计（UMVUE）。

本题常见错误是遗漏了 $X_1$ 有 $1/n$ 的概率成为最大值本身，误认为无论何种情况均值都是 $M/2$；或在修正极值偏差时误用系数 $n/(n+1)$。

## 22. 
本题考查平方可积鞅的增量正交性、方差累积能量恒等式、条件方差与增量二次变差的等价性，以及鞅收敛定理在 $L^2$ 空间中的理论基石。

**证明**

（i）证明鞅增量两两不相关。
设非负整数 $m < n$。增量 $M_m - M_0$ 是关于 $\sigma$-代数 $\mathcal F_m$ 可测的随机变量，且由平方可积假设知其属于 $L^2$。
应用条件期望的塔性质并提取已知可测信息：
$$
\mathbb E[(M_n - M_m)(M_m - M_0)] = \mathbb E\Bigl[ \mathbb E\bigl[ (M_n - M_m)(M_m - M_0)\mid\mathcal F_m \bigr] \Bigr] = \mathbb E\Bigl[ (M_m - M_0)\mathbb E[M_n - M_m\mid\mathcal F_m] \Bigr]
$$
由鞅的定义，当 $n > m$ 时，$\mathbb E[M_n\mid\mathcal F_m] = M_m$ 几乎必然成立。故
$$
\mathbb E[M_n - M_m\mid\mathcal F_m] = \mathbb E[M_n\mid\mathcal F_m] - M_m = M_m - M_m = 0
$$
几乎必然成立。代入上式即得
$$
\mathbb E[(M_n - M_m)(M_m - M_0)] = \mathbb E[(M_m - M_0)\cdot 0] = 0
$$
特别地，对任意 $1\le j < k \le n$，由于 $M_j - M_{j-1}$ 关于 $\mathcal F_{k-1}$ 可测，同样有 $\mathbb E[(M_k - M_{k-1})(M_j - M_{j-1})] = 0$。

（ii）证明能量累加恒等式。
将鞅展开为初始值与单步增量的伸缩和：
$$
M_n = M_0 + \sum_{k=1}^n (M_k - M_{k-1})
$$
两端平方并取数学期望：
$$
\mathbb E[M_n^2] = \mathbb E\left[ \left( M_0 + \sum_{k=1}^n (M_k - M_{k-1}) \right)^2 \right] = \mathbb E[M_0^2] + \sum_{k=1}^n \mathbb E[(M_k - M_{k-1})^2] + 2\sum_{k=1}^n \mathbb E[M_0(M_k - M_{k-1})] + 2\sum_{1\le j<k\le n}\mathbb E[(M_k - M_{k-1})(M_j - M_{j-1})]
$$
由（i）的正交性，所有不同的增量乘积交叉项期望均为零。同理，$M_0$ 关于 $\mathcal F_0$ 可测，$\mathbb E[M_0(M_k - M_{k-1})] = \mathbb E[M_0 \mathbb E[M_k - M_{k-1}\mid\mathcal F_0]] = 0$。因此所有交叉项完全抵消，证得
$$
\mathbb E[M_n^2] = \mathbb E[M_0^2] + \sum_{k=1}^n \mathbb E\bigl[(M_k - M_{k-1})^2\bigr]
$$

（iii）条件方差表示与 $L^2$ 有界性等价表述。
根据条件方差定义：
$$
\operatorname{Var}(M_n\mid\mathcal F_{n-1}) = \mathbb E\bigl[(M_n - \mathbb E[M_n\mid\mathcal F_{n-1}])^2\mid\mathcal F_{n-1}\bigr]
$$
由鞅性质 $\mathbb E[M_n\mid\mathcal F_{n-1}] = M_{n-1}$ 几乎必然，上式化为
$$
\operatorname{Var}(M_n\mid\mathcal F_{n-1}) = \mathbb E\bigl[(M_n - M_{n-1})^2\mid\mathcal F_{n-1}\bigr]
$$
两端取无条件全期望，由塔性质：
$$
\mathbb E[\operatorname{Var}(M_n\mid\mathcal F_{n-1})] = \mathbb E\Bigl[\mathbb E\bigl[(M_n - M_{n-1})^2\mid\mathcal F_{n-1}\bigr]\Bigr] = \mathbb E\bigl[(M_n - M_{n-1})^2\bigr]
$$
将此式代入（ii）的累加恒等式，得到
$$
\mathbb E[M_n^2] = \mathbb E[M_0^2] + \sum_{k=1}^n \mathbb E[\operatorname{Var}(M_k\mid\mathcal F_{k-1})]
$$
由于增量平方的数学期望恒非负，序列 $\mathbb E[M_n^2]$ 随 $n$ 单调非减。因此 $\sup_n \mathbb E[M_n^2] < \infty$ 当且仅当非负级数收敛：
$$
\sum_{k=1}^\infty \mathbb E\bigl[(M_k - M_{k-1})^2\bigr] < \infty
$$
这严格证明了鞅在 $L^2$ 范数下的全局有界性等价于增量方差级数的可和性。

□

本题常见错误是在展开平方时未严格证明交叉项为零，或者忽视鞅性质直接假设独立增量，抹杀了鞅相比于独立随机游走的推广性。