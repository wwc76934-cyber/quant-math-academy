# 第12章　联合分布、协方差与次序统计量

第10章把一个随机变量的分布压缩为实数线上的测度，第11章在这个测度上讨论期望、方差与矩。然而量化研究面对的对象几乎从来不是孤立的：两只股票的收益、因子与残差、价格与成交量、组合中的最大损失与次大损失，都要求同时刻画若干个随机变量。多个随机变量放在一起，边缘信息并不足以决定它们的共同行为；决定风险分散效果、决定极端损失同时发生概率的，恰恰是边缘分布之外的那部分结构。

本章从联合分布函数出发，建立联合质量函数与联合密度、边缘分布与独立性的严格刻画，随后引入协方差与相关系数，证明其双线性性质和 $|\rho|\le1$ 的界，并把它们组织为协方差矩阵，证明该矩阵的对称半正定性。在此之上给出多元正态分布的定义，证明它对线性变换封闭，且在联合正态的框架内不相关与独立等价。接着系统处理随机变量函数的分布：多维变换的雅可比方法、和的卷积公式、商的分布、最大值与最小值的分布，并由此发展次序统计量的完整理论，包括联合密度、第 $k$ 个次序统计量的密度、极差与样本中位数。最后引入条件密度，为第13章的条件期望做准备，并把上述工具用于资产收益协方差矩阵、分散化极限、在险价值的次序统计量视角与 Copula 依赖结构。

学习本章后，应当能够独立写出联合密度并检验其归一化，计算边缘分布与条件分布，判断独立性，计算协方差矩阵并验证其半正定性，用雅可比方法处理多维变换，推导次序统计量的密度，并解释相关性在组合风险中的确切作用与局限。

## 12.1 联合分布、边缘分布与独立性

### 12.1.1 联合分布函数

设 $(\Omega,\mathcal F,\mathbb P)$ 为概率空间，$X,Y:\Omega\to\mathbb R$ 为随机变量。则 $(X,Y):\Omega\to\mathbb R^2$ 也是随机向量，因为对任意矩形 $(-\infty,x]\times(-\infty,y]$，其原像为 $\{X\le x\}\cap\{Y\le y\}\in\mathcal F$，而这类矩形生成 $\mathcal B(\mathbb R^2)$。

**定义 12.1（联合分布函数）**

随机变量 $X$ 与 $Y$ 的**联合分布函数**（joint cumulative distribution function）为

$$
F_{X,Y}(x,y)=\mathbb P(X\le x,\;Y\le y),\qquad (x,y)\in\mathbb R^2.
\tag{12.1}
$$

$(X,Y)$ 的**联合分布**是 $\mathcal B(\mathbb R^2)$ 上的概率测度 $\mathbb P_{(X,Y)}(B)=\mathbb P((X,Y)\in B)$。对 $n$ 个随机变量 $X_1,\ldots,X_n$，定义完全平行：$F(x_1,\ldots,x_n)=\mathbb P(X_1\le x_1,\ldots,X_n\le x_n)$。

**定理 12.2（联合分布函数的基本性质）**

设 $F=F_{X,Y}$，则：

1. $F$ 关于每个自变量单调不减；
2. $F$ 关于每个自变量右连续，即当 $x_n\downarrow x$、$y_n\downarrow y$ 时 $F(x_n,y_n)\to F(x,y)$；
3. $\lim_{x\to-\infty}F(x,y)=0$，$\lim_{y\to-\infty}F(x,y)=0$，$\lim_{x,y\to+\infty}F(x,y)=1$，且 $F(x,+\infty)=F_X(x)$、$F(+\infty,y)=F_Y(y)$；
4. 对任意 $a\le b$、$c\le d$，矩形增量非负：

$$
\mathbb P(a<X\le b,\;c<Y\le d)
=F(b,d)-F(a,d)-F(b,c)+F(a,c)\ge0.
\tag{12.2}
$$

**证明**

单调性来自事件包含：若 $x_1\le x_2$，则 $\{X\le x_1,Y\le y\}\subseteq\{X\le x_2,Y\le y\}$，由概率的单调性得 $F(x_1,y)\le F(x_2,y)$。对 $y$ 同理。

右连续性来自事件的递减极限。取 $x_n\downarrow x$、$y_n\downarrow y$，则事件列 $A_n=\{X\le x_n,\;Y\le y_n\}$ 单调递减，且 $\bigcap_nA_n=\{X\le x,\;Y\le y\}$：一侧的包含显然；另一侧若 $\omega$ 属于所有 $A_n$，则 $X(\omega)\le x_n$ 与 $Y(\omega)\le y_n$ 对所有 $n$ 成立，令 $n\to\infty$ 得 $X(\omega)\le x$、$Y(\omega)\le y$。由概率的上连续性得 $\mathbb P(A_n)\downarrow\mathbb P(A)$。

第三组极限由 $\{X\le-n,Y\le y\}\downarrow\varnothing$ 与 $\{X\le n,Y\le m\}\uparrow\Omega$ 得到；两个边缘等式则是 $\{Y\le m\}\uparrow\Omega$ 的极限。

式（12.2）由事件的容斥分解得到。记 $B=\{X\le b,Y\le d\}$，$B_1=\{X\le a,Y\le d\}$，$B_2=\{X\le b,Y\le c\}$，则 $B_1\cup B_2\subseteq B$，$B_1\cap B_2=\{X\le a,Y\le c\}$，且

$$
B\setminus(B_1\cup B_2)=\{a<X\le b,\;c<Y\le d\}.
$$

于是由有限可加性与容斥公式，

$$
\mathbb P\bigl(B\setminus(B_1\cup B_2)\bigr)
=\mathbb P(B)-\mathbb P(B_1)-\mathbb P(B_2)+\mathbb P(B_1\cap B_2),
$$

它就是式（12.2）的右端，作为概率必然非负。

□

第四条性质常被称作二维递增性（2-increasing），它是联合分布函数区别于一元情形的关键。一个二元函数即使关于每个自变量单调不减、右连续并满足第三组极限，也未必是某个随机向量的联合分布函数，因为单调性只约束沿坐标方向的增量，而概率要求任意矩形的增量非负。反例可取

$$
F(x,y)=\mathbf 1_{\{x+y\ge0\}}.
$$

它关于 $x$、$y$ 均单调不减且右连续，$F(-\infty,y)=F(x,-\infty)=0$，$F(+\infty,+\infty)=1$。但取 $a=-1$、$b=0$、$c=0$、$d=1$，式（12.2）的右端为

$$
F(0,1)-F(-1,1)-F(0,0)+F(-1,0)=1-1-1+0=-1<0,
$$

与概率非负矛盾。因此这个函数不可能是任何联合分布函数。凡是在建模中人为拼接二元分布函数的做法，都必须验证矩形增量条件。

### 12.1.2 联合质量函数与联合密度

**定义 12.3（联合概率质量函数）**

若存在至多可数集 $S\subseteq\mathbb R^2$ 使 $\mathbb P((X,Y)\in S)=1$，则称 $(X,Y)$ 为离散随机向量，其**联合概率质量函数**为

$$
p_{X,Y}(x,y)=\mathbb P(X=x,\;Y=y),
\qquad
\mathbb P\bigl((X,Y)\in A\bigr)=\sum_{(x,y)\in A\cap S}p_{X,Y}(x,y).
\tag{12.3}
$$

它满足 $p_{X,Y}\ge0$ 与 $\sum_{S}p_{X,Y}=1$，且 $F_{X,Y}(x,y)=\sum_{s\le x,\,t\le y}p_{X,Y}(s,t)$。

**定义 12.4（联合概率密度函数）**

若存在非负可积函数 $f_{X,Y}:\mathbb R^2\to[0,\infty)$ 使

$$
F_{X,Y}(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y}f_{X,Y}(u,v)\,dv\,du,
\qquad
\mathbb P\bigl((X,Y)\in A\bigr)=\iint_A f_{X,Y}(u,v)\,du\,dv,
\tag{12.4}
$$

对所有 Borel 集 $A\subseteq\mathbb R^2$ 成立，则称 $(X,Y)$ 为绝对连续随机向量，$f_{X,Y}$ 为其**联合概率密度函数**。

在 $f_{X,Y}$ 的连续点处，$f_{X,Y}(x,y)=\partial^2F_{X,Y}(x,y)/\partial x\partial y$；反过来，式（12.4）的第一个等式在 $f$ 可积时唯一确定 $F$，而 $f$ 只在零测集意义下唯一。归一化条件为 $\iint_{\mathbb R^2}f_{X,Y}=1$。与一元情形相同，密度值不是概率，可以大于 $1$；概率由密度在区域上的积分给出。对绝对连续向量，任何直线或光滑曲线上的概率为零，因此 $\mathbb P(X=Y)=0$，$\mathbb P(X=x)=0$。

对绝对连续向量，二重积分的次序可以交换（Fubini 定理，见第3章），并且对可测函数 $g$ 有二维形式的期望公式：若 $\mathbb E|g(X,Y)|<\infty$，则

$$
\mathbb E[g(X,Y)]=\iint_{\mathbb R^2}g(x,y)f_{X,Y}(x,y)\,dx\,dy.
\tag{12.5}
$$

式（12.5）称为二维 LOTUS（the law of the unconscious statistician）。它是后续计算 $\mathbb E[XY]$、协方差、次序统计量与变换密度的基本工具。使用它时不需要先求出 $g(X,Y)$ 的分布，这一点在计算期望时往往比先求密度再积分简单得多；但当需要 $g(X,Y)$ 的分位数或尾部概率时，仍必须求出其分布。

### 12.1.3 边缘分布

联合分布包含的信息严格多于两个边缘分布。边缘分布通过“对另一个变量求和或积分”得到。

**定义 12.5（边缘分布与边缘密度）**

$X$ 的**边缘分布函数**为 $F_X(x)=F_{X,Y}(x,+\infty)$。若 $(X,Y)$ 离散，则

$$
p_X(x)=\sum_{y:(x,y)\in S}p_{X,Y}(x,y),
\qquad
p_Y(y)=\sum_{x:(x,y)\in S}p_{X,Y}(x,y).
$$

若 $(X,Y)$ 具有联合密度 $f_{X,Y}$，则 $X$、$Y$ 均绝对连续，且

$$
f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy,
\qquad
f_Y(y)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx.
\tag{12.6}
$$

**证明**

只需验证式（12.6）的第一个式子确为 $X$ 的密度。对任意 Borel 集 $A\subseteq\mathbb R$，由式（12.4）与 Fubini 定理，

$$
\mathbb P(X\in A)=\mathbb P\bigl((X,Y)\in A\times\mathbb R\bigr)
=\iint_{A\times\mathbb R}f_{X,Y}(x,y)\,dy\,dx
=\int_A\left[\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy\right]dx.
$$

方括号内的函数非负可测，且上式对全体 Borel 集 $A$ 成立，故它是 $X$ 的密度。

□

式（12.6）的积分限必须由联合支持集决定。常见错误是把内层积分一律写成 $(-\infty,\infty)$ 而忽略被积函数在支持集外为零这一事实，或者相反，在支持集依赖另一个变量时把限写成常数。正确的做法是先写出支持集 $D=\{(x,y):f_{X,Y}(x,y)>0\}$，对固定的 $x$ 确定截面 $D_x=\{y:(x,y)\in D\}$，再在 $D_x$ 上积分。

**例 12.1（三角形区域上的联合密度）**

设 $(X,Y)$ 的联合密度为

$$
f_{X,Y}(x,y)=c\,\mathbf 1_{\{0<x<y<1\}}.
$$

求常数 $c$、两个边缘密度、$\mathbb P(Y>2X)$，并判断 $X$ 与 $Y$ 是否独立。

**解**

支持集是单位正方形内的上三角形，面积为 $1/2$。归一化要求

$$
1=\iint f_{X,Y}=c\cdot\frac12,
$$

故 $c=2$。

对固定的 $x\in(0,1)$，截面为 $y\in(x,1)$，于是

$$
f_X(x)=\int_x^1 2\,dy=2(1-x),\qquad 0<x<1.
$$

对固定的 $y\in(0,1)$，截面为 $x\in(0,y)$，于是

$$
f_Y(y)=\int_0^y 2\,dx=2y,\qquad 0<y<1.
$$

两者都归一：$\int_0^12(1-x)dx=1$，$\int_0^12y\,dy=1$。

事件 $\{Y>2X\}$ 与三角形的交集为 $\{0<x<y<1,\;y>2x\}$，故

$$
\mathbb P(Y>2X)=\int_0^{1/2}\int_{2x}^{1}2\,dy\,dx
=\int_0^{1/2}2(1-2x)\,dx
=\Bigl[2x-2x^2\Bigr]_0^{1/2}=1-\frac12=\frac12.
$$

最后，在三角形内部 $f_X(x)f_Y(y)=4(1-x)y$，而 $f_{X,Y}(x,y)=2$，两者不等；例如在 $x=1/4$、$y=3/4$ 处，乘积为 $4\cdot(3/4)\cdot(3/4)=9/4\ne2$。因此 $X$ 与 $Y$ 不独立。更本质的理由是支持集 $\{0<x<y<1\}$ 不是矩形乘积形式：知道 $X$ 接近 $1$ 会强制 $Y$ 也接近 $1$，这种约束不可能出现在独立变量之间。

### 12.1.4 独立性

**定义 12.6（随机变量的独立性）**

称 $X$ 与 $Y$ **相互独立**，若对任意 Borel 集 $A,B\subseteq\mathbb R$，

$$
\mathbb P(X\in A,\;Y\in B)=\mathbb P(X\in A)\,\mathbb P(Y\in B).
$$

等价地，事件 $\{X\in A\}$ 与 $\{Y\in B\}$ 对所有 Borel 集独立。$X_1,\ldots,X_n$ **相互独立**，若对任意 Borel 集 $A_1,\ldots,A_n$，

$$
\mathbb P\Bigl(\bigcap_{i=1}^n\{X_i\in A_i\}\Bigr)=\prod_{i=1}^n\mathbb P(X_i\in A_i).
$$

相互独立强于两两独立：第9章已给出两两独立而不相互独立的三个事件的反例，把指示函数作为随机变量即得随机变量版本。

**定理 12.7（独立性的分布刻画）**

以下条件等价：

1. $X$ 与 $Y$ 独立；
2. 对一切 $(x,y)\in\mathbb R^2$，

$$
F_{X,Y}(x,y)=F_X(x)F_Y(y);
\tag{12.7}
$$

3. 若 $(X,Y)$ 离散，则对一切 $(x,y)$ 有 $p_{X,Y}(x,y)=p_X(x)p_Y(y)$；
4. 若 $(X,Y)$ 绝对连续，则

$$
f_{X,Y}(x,y)=f_X(x)f_Y(y)
\tag{12.8}
$$

上式在几乎必然意义下成立。

**证明**

$(1)\Rightarrow(2)$：取 $A=(-\infty,x]$、$B=(-\infty,y]$，直接由定义得到。

$(2)\Rightarrow(1)$：令 $\mathcal C=\{(-\infty,x]:x\in\mathbb R\}$，它是生成 $\mathcal B(\mathbb R)$ 的 $\pi$-系且对有限交封闭。固定 $x$，定义 $\mathbb R$ 上的两个有限测度 $\mu_1(B)=\mathbb P(X\le x,Y\in B)$ 与 $\mu_2(B)=F_X(x)\mathbb P(Y\in B)$。式（12.7）说明二者在 $\mathcal C$ 上一致，由测度扩张的唯一性（单调类定理）得 $\mu_1=\mu_2$ 于 $\mathcal B(\mathbb R)$。再对 $x$ 重复同一论证：固定 $B$，$\nu_1(A)=\mathbb P(X\in A,Y\in B)$ 与 $\nu_2(A)=\mathbb P(X\in A)\mathbb P(Y\in B)$ 在 $\mathcal C$ 上一致，故在全体 Borel 集上一致，即得独立。

$(1)\Rightarrow(3)$：取 $A=\{x\}$、$B=\{y\}$。$(3)\Rightarrow(2)$：对 $s\le x$、$t\le y$ 求和并使用绝对收敛的重排：

$$
F_{X,Y}(x,y)=\sum_{s\le x}\sum_{t\le y}p_X(s)p_Y(t)
=\Bigl(\sum_{s\le x}p_X(s)\Bigr)\Bigl(\sum_{t\le y}p_Y(t)\Bigr)=F_X(x)F_Y(y).
$$

$(1)\Rightarrow(4)$：由式（12.4）与 $(2)$，对几乎必然的 $(x,y)$，

$$
\int_{-\infty}^{x}\int_{-\infty}^{y}f_{X,Y}
=F_X(x)F_Y(y)
=\int_{-\infty}^{x}f_X\int_{-\infty}^{y}f_Y
=\int_{-\infty}^{x}\int_{-\infty}^{y}f_X(u)f_Y(v)\,dv\,du.
$$

两个非负可积函数在所有左下半无界矩形上的积分相等，由单调类定理得它们在 $\mathcal B(\mathbb R^2)$ 上积分相等，故几乎必然相等。

$(4)\Rightarrow(2)$：由 Fubini 定理，

$$
F_{X,Y}(x,y)=\int_{-\infty}^{x}f_X(u)\,du\int_{-\infty}^{y}f_Y(v)\,dv=F_X(x)F_Y(y),
$$

再由 $(2)\Rightarrow(1)$ 完成。

□

式（12.8）的“几乎必然”不可省略，因为密度本身只在零测集意义下唯一。实践中判定独立性有一个快速而可靠的准则：若联合密度可以写成 $f_{X,Y}(x,y)=g(x)h(y)$ 且支持集为乘积形式 $D=D_1\times D_2$，则 $X$ 与 $Y$ 独立，且 $f_X\propto g$、$f_Y\propto h$，比例常数由归一化确定。反之，只要支持集不是乘积形式，无论函数形式多么“可分离”，变量都不独立。例 12.1 中密度 $2$ 是常数（当然可分离），但支持集为三角形，故不独立。

独立性的一个重要推论是期望可乘：若 $X$、$Y$ 独立且 $\mathbb E|X|,\mathbb E|Y|<\infty$，则 $\mathbb E|XY|<\infty$ 且 $\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]$。更一般地，若 $g(X)$ 与 $h(Y)$ 可积，则 $\mathbb E[g(X)h(Y)]=\mathbb E[g(X)]\mathbb E[h(Y)]$；独立随机变量经各自的可测变换后仍独立。证明在第11章的 Fubini 框架中给出。

## 12.2 协方差与相关系数

### 12.2.1 协方差的定义与双线性

边缘分布刻画单个变量的波动，但组合风险取决于变量之间的共同波动。协方差正是这一共同波动的度量。

**定义 12.8（协方差与相关系数）**

设 $\mathbb E[X^2]<\infty$、$\mathbb E[Y^2]<\infty$。$X$ 与 $Y$ 的**协方差**定义为

$$
\operatorname{Cov}(X,Y)=\mathbb E\bigl[(X-\mathbb E[X])(Y-\mathbb E[Y])\bigr]
=\mathbb E[XY]-\mathbb E[X]\,\mathbb E[Y],
\tag{12.9}
$$

若两个方差均为正，则**相关系数**定义为

$$
\rho_{X,Y}=\frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)}\sqrt{\operatorname{Var}(Y)}}.
\tag{12.10}
$$

当 $\operatorname{Cov}(X,Y)=0$ 时称 $X$ 与 $Y$ **不相关**（uncorrelated）。

式（12.9）中两个等号右端的等价性需要 $\mathbb E|XY|<\infty$，它由 Cauchy–Schwarz 不等式保证：

$$
\mathbb E|XY|\le\sqrt{\mathbb E[X^2]\,\mathbb E[Y^2]}<\infty.
$$

因此定义只要求二阶矩有限。实际上式（12.9）只需 $\mathbb E|X|,\mathbb E|Y|,\mathbb E|XY|$ 有限即可成立，这是一个更弱的条件；但在处理协方差矩阵时统一假设二阶矩有限更为方便。相关系数是协方差的标准化版本，它消除了量纲：若 $X$ 以“元”计量、$Y$ 以“千克”计量，则协方差的单位是“元·千克”，而 $\rho$ 无量纲。这也说明为什么比较不同资产对之间的依赖强度时必须使用相关系数而不是协方差。

**定理 12.9（协方差的双线性与方差展开）**

设所涉及的随机变量均有有限二阶矩，则：

1. $\operatorname{Cov}(X,Y)=\operatorname{Cov}(Y,X)$，$\operatorname{Cov}(X,X)=\operatorname{Var}(X)$；
2. $\operatorname{Cov}(X,c)=0$（$c$ 为常数），$\operatorname{Cov}(aX,bY)=ab\operatorname{Cov}(X,Y)$；
3. 对每个固定的 $Z$，映射 $(X,Y)\mapsto\operatorname{Cov}(X+Y,Z)$ 满足

$$
\operatorname{Cov}(X+Y,Z)=\operatorname{Cov}(X,Z)+\operatorname{Cov}(Y,Z);
$$

4. 方差展开式

$$
\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)+2ab\operatorname{Cov}(X,Y),
\tag{12.11}
$$

以及一般形式

$$
\operatorname{Var}\Bigl(\sum_{i=1}^nX_i\Bigr)
=\sum_{i=1}^n\operatorname{Var}(X_i)+2\sum_{1\le i<j\le n}\operatorname{Cov}(X_i,X_j)
=\sum_{i=1}^n\sum_{j=1}^n\operatorname{Cov}(X_i,X_j).
\tag{12.12}
$$

**证明**

记 $\tilde X=X-\mathbb E[X]$，$\tilde Y=Y-\mathbb E[Y]$，$\tilde Z=Z-\mathbb E[Z]$，则 $\mathbb E[\tilde X]=0$。式（12.9）的第二个等号来自展开

$$
\tilde X\tilde Y=XY-X\,\mathbb E[Y]-\mathbb E[X]\,Y+\mathbb E[X]\,\mathbb E[Y]
$$

后取期望，其中 $\mathbb E[X\,\mathbb E[Y]]=\mathbb E[X]\,\mathbb E[Y]$，因为 $\mathbb E[Y]$ 是常数。

对称性与 $\operatorname{Cov}(X,X)=\mathbb E[\tilde X^2]=\operatorname{Var}(X)$ 直接由定义得到。$\operatorname{Cov}(X,c)=\mathbb E[\tilde X\cdot 0]=0$，$\operatorname{Cov}(aX,bY)=\mathbb E[(a\tilde X)(b\tilde Y)]=ab\,\mathbb E[\tilde X\tilde Y]$，均只用到期望的齐次性。

双线性来自期望的可加性：

$$
\operatorname{Cov}(X+Y,Z)=\mathbb E[(\tilde X+\tilde Y)\tilde Z]
=\mathbb E[\tilde X\tilde Z]+\mathbb E[\tilde Y\tilde Z]
=\operatorname{Cov}(X,Z)+\operatorname{Cov}(Y,Z).
$$

结合齐次性，$(X,Y)\mapsto\operatorname{Cov}(X,Y)$ 是二元双线性型。

式（12.11）由 $\operatorname{Var}(aX+bY)=\mathbb E[(a\tilde X+b\tilde Y)^2]$ 展开得到，交叉项为 $2ab\,\mathbb E[\tilde X\tilde Y]$。式（12.12）是同一计算的多变量版本：

$$
\mathbb E\Bigl[\Bigl(\sum_i\tilde X_i\Bigr)^2\Bigr]
=\sum_i\mathbb E[\tilde X_i^2]+\sum_{i\ne j}\mathbb E[\tilde X_i\tilde X_j]
=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
$$

□

式（12.12）的最后一种双重求和写法在矩阵语言中就是 $\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w$，这是12.7节组合风险计算的基础。需要特别注意：只有当所有交叉协方差为零时，和的方差才等于方差之和；对独立变量这自动成立，对不相关变量也成立，但“不相关”是关于给定这一对变量的陈述，而独立性是关于整个分布的陈述。

**例 12.2（离散联合分布下的协方差）**

设 $(X,Y)$ 的联合质量函数由下表给出，其中行对应 $X\in\{0,1\}$，列对应 $Y\in\{0,1,2\}$：

| $p_{X,Y}$ | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | $0.10$ | $0.20$ | $0.20$ |
| $X=1$ | $0.30$ | $0.10$ | $0.10$ |

求边缘分布、$\operatorname{Cov}(X,Y)$ 与 $\rho_{X,Y}$，并判断独立性。

**解**

先验证归一化：$0.10+0.20+0.20+0.30+0.10+0.10=1$。

边缘质量函数为

$$
p_X(0)=0.50,\quad p_X(1)=0.50,
\qquad
p_Y(0)=0.40,\quad p_Y(1)=0.30,\quad p_Y(2)=0.30.
$$

于是

$$
\mathbb E[X]=0.5,\qquad
\mathbb E[Y]=0\cdot0.4+1\cdot0.3+2\cdot0.3=0.9,
$$

$$
\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2=0.5-0.25=0.25,
$$

$$
\mathbb E[Y^2]=0\cdot0.4+1\cdot0.3+4\cdot0.3=1.5,
\qquad
\operatorname{Var}(Y)=1.5-0.81=0.69.
$$

乘积的期望由式（12.5）的离散版本计算：

$$
\mathbb E[XY]=\sum_{x,y}xy\,p_{X,Y}(x,y)
=1\cdot1\cdot0.10+1\cdot2\cdot0.10=0.30.
$$

只有 $x=1$ 且 $y>0$ 的格子贡献非零。故

$$
\operatorname{Cov}(X,Y)=0.30-0.5\times0.9=0.30-0.45=-0.15,
$$

$$
\rho_{X,Y}=\frac{-0.15}{\sqrt{0.25}\sqrt{0.69}}
=\frac{-0.15}{0.5\times0.83066}=-0.3612.
$$

独立性检验：$p_X(0)p_Y(0)=0.5\times0.4=0.20\ne0.10=p_{X,Y}(0,0)$，故 $X$ 与 $Y$ 不独立。负的协方差与表中结构一致：当 $X=0$ 时概率质量集中在较大的 $Y$ 上，当 $X=1$ 时集中在 $Y=0$ 上。

### 12.2.2 相关系数的界与不相关的含义

**定理 12.10（Cauchy–Schwarz 不等式与相关系数的界）**

设 $\mathbb E[X^2]<\infty$、$\mathbb E[Y^2]<\infty$，则

$$
\bigl|\operatorname{Cov}(X,Y)\bigr|
\le\sqrt{\operatorname{Var}(X)}\sqrt{\operatorname{Var}(Y)},
\qquad
|\rho_{X,Y}|\le1.
\tag{12.13}
$$

等号成立当且仅当存在常数 $a\ne0$、$b$ 使 $Y=aX+b$ 几乎必然成立；此时 $\rho=\operatorname{sgn}(a)$。

**证明**

记 $U=X-\mathbb E[X]$、$V=Y-\mathbb E[Y]$，则 $\mathbb E[U]=\mathbb E[V]=0$，$\operatorname{Cov}(X,Y)=\mathbb E[UV]$，$\operatorname{Var}(X)=\mathbb E[U^2]$，$\operatorname{Var}(Y)=\mathbb E[V^2]$。

若 $\mathbb E[V^2]=0$，则 $V=0$ 几乎必然，$\mathbb E[UV]=0$，不等式两端均为零，结论成立。以下设 $\mathbb E[V^2]>0$。

对任意 $t\in\mathbb R$，$(U+tV)^2\ge0$，由期望的单调性，

$$
q(t)=\mathbb E[(U+tV)^2]=\mathbb E[U^2]+2t\,\mathbb E[UV]+t^2\mathbb E[V^2]\ge0.
$$

这是关于 $t$ 的二次多项式，首项系数 $\mathbb E[V^2]>0$，且处处非负，故其判别式非正：

$$
4\bigl(\mathbb E[UV]\bigr)^2-4\,\mathbb E[U^2]\,\mathbb E[V^2]\le0,
$$

即 $\bigl(\mathbb E[UV]\bigr)^2\le\mathbb E[U^2]\mathbb E[V^2]$，开方得式（12.13）。

等号成立当且仅当判别式为零，此时 $q$ 有唯一实根 $t^*=-\mathbb E[UV]/\mathbb E[V^2]$ 且 $q(t^*)=0$。由于 $q(t^*)=\mathbb E[(U+t^*V)^2]=0$ 而被积函数非负，得 $U+t^*V=0$ 几乎必然。回代 $U=X-\mathbb E[X]$、$V=Y-\mathbb E[Y]$，即

$$
X-\mathbb E[X]=-t^*\,(Y-\mathbb E[Y])
$$

几乎必然成立。

若 $t^*=0$，则 $X=\mathbb E[X]$ 几乎必然，$\operatorname{Var}(X)=0$，与相关系数有定义的前提矛盾，故 $t^*\ne0$，可解出 $Y=aX+b$，其中 $a=-1/t^*$，$b=\mathbb E[Y]-a\,\mathbb E[X]$。此时 $\operatorname{Cov}(X,Y)=a\operatorname{Var}(X)$，$\operatorname{Var}(Y)=a^2\operatorname{Var}(X)$，代入式（12.10）得 $\rho=a/|a|=\operatorname{sgn}(a)$。

□

这个证明与第5章内积空间中的 Cauchy–Schwarz 不等式在结构上完全一致：把 $(U,V)\mapsto\mathbb E[UV]$ 视为零均值平方可积随机变量空间上的内积，范数即标准差，相关系数就是两个中心化变量之间夹角的余弦。第13章将把这一几何观点发展为条件期望的正交投影解释，第5章的最小二乘理论也在那里重新出现：使 $\mathbb E[(Y-aX-b)^2]$ 最小的 $a$ 恰好是 $\operatorname{Cov}(X,Y)/\operatorname{Var}(X)$，即回归系数。

因此 $\rho$ 的准确含义是**线性**依赖强度，而不是任意依赖强度。$|\rho|=1$ 意味着严格线性关系，$\rho=0$ 只意味着没有线性成分。

**命题 12.11（独立、不相关与正交）**

1. 若 $X$、$Y$ 独立且二阶矩有限，则 $\operatorname{Cov}(X,Y)=0$，$\rho_{X,Y}=0$；
2. 反之不成立：存在不相关但不独立的随机变量；
3. 若 $\mathbb E[X]=\mathbb E[Y]=0$，则不相关等价于 $\mathbb E[XY]=0$，后者称为**正交**。

**证明**

第一部分：由独立性，$\mathbb E[XY]=\mathbb E[X]\mathbb E[Y]$，代入式（12.9）得 $\operatorname{Cov}(X,Y)=0$。第三部分是定义的直接改写。

第二部分给出反例。设 $X\sim\operatorname{Uniform}(-1,1)$，$Y=X^2$。则 $\mathbb E[X]=0$，且

$$
\mathbb E[XY]=\mathbb E[X^3]=\int_{-1}^{1}x^3\cdot\frac12\,dx=0,
$$

故 $\operatorname{Cov}(X,Y)=0-\mathbb E[X]\mathbb E[Y]=0$，二者不相关。但 $Y$ 完全由 $X$ 决定：例如 $\mathbb P(Y>1/4\mid X>1/2)=1$ 而 $\mathbb P(Y>1/4)=\mathbb P(|X|>1/2)=1/2$，两者不等，故不独立。从支持集看，$(X,Y)$ 集中在抛物线 $\{y=x^2,\,-1<x<1\}$ 上，这是一条一维曲线，绝不是乘积形式。

□

这个反例说明协方差只能捕捉线性关系，对确定性但非线性的依赖可能完全失灵。金融中的一个典型情形是期权价格与标的收益：看涨期权价格关于标的收益是凸的，其收益与标的收益的相关系数为正，但期权收益的波动率与标的波动率之间的关系并不是线性的，用相关系数刻画会遗漏凸性带来的全部结构。12.7.4 节的 Copula 与秩相关正是为弥补这一缺陷而引入的。

**例 12.3（单位圆盘上的均匀分布：不相关但不独立）**

设 $(X,Y)$ 在单位圆盘 $D=\{x^2+y^2\le1\}$ 上服从均匀分布，密度为 $f_{X,Y}(x,y)=\pi^{-1}\mathbf 1_D(x,y)$。求边缘密度、$\operatorname{Cov}(X,Y)$，并判断独立性。

**解**

对固定的 $x\in(-1,1)$，截面为 $y\in(-\sqrt{1-x^2},\sqrt{1-x^2})$，故

$$
f_X(x)=\int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}}\frac1\pi\,dy
=\frac2\pi\sqrt{1-x^2},\qquad |x|<1.
$$

由对称性 $f_Y(y)=\frac2\pi\sqrt{1-y^2}$，$|y|<1$。

计算乘积矩。被积函数 $xy/\pi$ 关于 $x$ 是奇函数，而 $D$ 关于 $x\mapsto-x$ 对称，故

$$
\mathbb E[XY]=\iint_D\frac{xy}{\pi}\,dx\,dy=0.
$$

同样由对称性 $\mathbb E[X]=\mathbb E[Y]=0$，因此 $\operatorname{Cov}(X,Y)=0$，$\rho_{X,Y}=0$。

但 $X$ 与 $Y$ 不独立：在圆盘内部 $f_X(x)f_Y(y)=\frac4{\pi^2}\sqrt{1-x^2}\sqrt{1-y^2}$，与常数密度 $1/\pi$ 不等；例如取 $x=y=1/2$，乘积为 $\frac4{\pi^2}\cdot\frac34=\frac3{\pi^2}\approx0.304$，而 $1/\pi\approx0.318$。更直观地，$\mathbb P(|Y|>0.9)=\frac2\pi\int_{-\sqrt{0.19}}^{\sqrt{0.19}}\sqrt{1-y^2}dy$ 很小，但一旦知道 $|X|>0.95$，则 $|Y|$ 必须小于 $\sqrt{1-0.9025}\approx0.312$，条件概率变为零。

本例与命题 12.11 的反例一起说明：$\rho=0$ 与独立之间没有任何逻辑蕴含关系，除非有额外的分布假设。12.3 节将证明，在联合正态的假设下二者等价，这是正态分布在金融建模中被广泛使用的一个真正理由。

## 12.3 协方差矩阵与多元正态分布

### 12.3.1 协方差矩阵及其半正定性

**定义 12.12（协方差矩阵）**

设 $\boldsymbol X=(X_1,\ldots,X_n)^\top$ 为随机向量，各分量二阶矩有限，$\boldsymbol\mu=\mathbb E[\boldsymbol X]$。其**协方差矩阵**为 $n\times n$ 矩阵

$$
\boldsymbol\Sigma=\mathbb E\bigl[(\boldsymbol X-\boldsymbol\mu)(\boldsymbol X-\boldsymbol\mu)^\top\bigr],
\qquad
\Sigma_{ij}=\operatorname{Cov}(X_i,X_j)=\mathbb E[X_iX_j]-\mu_i\mu_j.
\tag{12.14}
$$

对角元为方差 $\Sigma_{ii}=\operatorname{Var}(X_i)$，非对角元为协方差。相应的**相关矩阵**为 $\boldsymbol R=(\rho_{ij})$，其中 $\rho_{ij}=\Sigma_{ij}/(\sigma_i\sigma_j)$，$\sigma_i=\sqrt{\Sigma_{ii}}$。若记 $\boldsymbol D=\operatorname{diag}(\sigma_1,\ldots,\sigma_n)$，则

$$
\boldsymbol\Sigma=\boldsymbol D\boldsymbol R\boldsymbol D.
$$

**定理 12.13（协方差矩阵的对称半正定性）**

$\boldsymbol\Sigma$ 是对称半正定矩阵：对任意 $\boldsymbol a\in\mathbb R^n$，

$$
\boldsymbol a^\top\boldsymbol\Sigma\boldsymbol a
=\operatorname{Var}(\boldsymbol a^\top\boldsymbol X)\ge0.
\tag{12.15}
$$

**证明**

对称性由 $\operatorname{Cov}(X_i,X_j)=\operatorname{Cov}(X_j,X_i)$ 得到。对式（12.15），令 $\tilde{\boldsymbol X}=\boldsymbol X-\boldsymbol\mu$，则 $\mathbb E[\tilde{\boldsymbol X}]=\boldsymbol0$，且

$$
\boldsymbol a^\top\boldsymbol\Sigma\boldsymbol a
=\boldsymbol a^\top\mathbb E[\tilde{\boldsymbol X}\tilde{\boldsymbol X}^\top]\boldsymbol a
=\mathbb E\bigl[\boldsymbol a^\top\tilde{\boldsymbol X}\tilde{\boldsymbol X}^\top\boldsymbol a\bigr]
=\mathbb E\bigl[(\boldsymbol a^\top\tilde{\boldsymbol X})^2\bigr]
=\operatorname{Var}(\boldsymbol a^\top\boldsymbol X)\ge0,
$$

其中第三个等号用到 $\boldsymbol a^\top\tilde{\boldsymbol X}\tilde{\boldsymbol X}^\top\boldsymbol a$ 是标量因而等于自身的转置，且期望的线性性允许把 $\boldsymbol a$ 移入。最后一个不等号来自非负随机变量的期望非负。

□

半正定性不是抽象的代数事实，而是有直接的风险含义：任何权重向量 $\boldsymbol w$ 对应的组合收益 $\boldsymbol w^\top\boldsymbol X$ 的方差就是 $\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w$，方差作为波动率度量不可能为负。反过来，若一个用于风险模型的矩阵不是半正定的，则必然存在某个组合使其“方差”为负，这样的模型在数学上就不自洽。实践中，用不同时间段、不同频率或含缺失值的数据估计协方差矩阵时，简单的成对估计可能产生非半正定矩阵，必须通过投影到半正定锥或收缩估计修正，这一数值问题在第8章与第21章进一步讨论。

**命题 12.14（协方差矩阵奇异的刻画）**

$\boldsymbol\Sigma$ 奇异当且仅当存在非零 $\boldsymbol a\in\mathbb R^n$ 使 $\boldsymbol a^\top\boldsymbol X$ 几乎必然等于常数 $\boldsymbol a^\top\boldsymbol\mu$。

**证明**

若存在 $\boldsymbol a\ne\boldsymbol0$ 使 $\boldsymbol a^\top\boldsymbol X=\boldsymbol a^\top\boldsymbol\mu$ 几乎必然，则 $\operatorname{Var}(\boldsymbol a^\top\boldsymbol X)=0$，由式（12.15）得 $\boldsymbol a^\top\boldsymbol\Sigma\boldsymbol a=0$，故 $0$ 是 $\boldsymbol\Sigma$ 的 Rayleigh 商取值，$\boldsymbol\Sigma$ 的最小特征值为零，即 $\boldsymbol\Sigma$ 奇异。

反之设 $\boldsymbol\Sigma$ 奇异。由第6章谱定理，$\boldsymbol\Sigma=\boldsymbol Q\boldsymbol\Lambda\boldsymbol Q^\top$，其中 $\boldsymbol Q$ 正交、$\boldsymbol\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)$、$\lambda_i\ge0$（半正定性）。奇异意味着某个 $\lambda_k=0$。取 $\boldsymbol a=\boldsymbol Q\boldsymbol e_k\ne\boldsymbol0$，则

$$
\operatorname{Var}(\boldsymbol a^\top\boldsymbol X)=\boldsymbol a^\top\boldsymbol\Sigma\boldsymbol a
=\boldsymbol e_k^\top\boldsymbol\Lambda\boldsymbol e_k=\lambda_k=0,
$$

故 $\boldsymbol a^\top\boldsymbol X$ 几乎必然等于其均值。

□

命题 12.14 给出了退化随机向量的准确含义：分量之间存在确定的线性约束，随机向量实际只在一个维数低于 $n$ 的仿射子空间上取值。此时不存在 $n$ 维联合密度，因为没有密度能把正概率集中到零 Lebesgue 测度集上。因子模型是产生这种退化的典型机制：若所有资产收益都由单一因子线性驱动而残差方差为零，则协方差矩阵秩为 $1$。

### 12.3.2 多元正态分布

**定义 12.15（多元正态分布）**

称随机向量 $\boldsymbol X\in\mathbb R^n$ 服从**多元正态分布**，若对任意 $\boldsymbol a\in\mathbb R^n$，线性组合 $\boldsymbol a^\top\boldsymbol X$ 都服从一元正态分布（允许方差为零的退化正态，即几乎必然为常数）。此时记 $\boldsymbol X\sim N_n(\boldsymbol\mu,\boldsymbol\Sigma)$，其中 $\boldsymbol\mu=\mathbb E[\boldsymbol X]$，$\boldsymbol\Sigma$ 为协方差矩阵。

若 $\boldsymbol\Sigma$ 正定，则 $\boldsymbol X$ 具有密度

$$
f_{\boldsymbol X}(\boldsymbol x)
=\frac1{(2\pi)^{n/2}|\boldsymbol\Sigma|^{1/2}}
\exp\left[-\frac12(\boldsymbol x-\boldsymbol\mu)^\top\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)\right].
\tag{12.16}
$$

定义采用“所有线性组合为正态”而非“所有分量为正态”，这一点极为重要。分量都是正态并不蕴含联合正态，例 12.5 将给出反例。而由定义立即得到：每个分量 $X_i=\boldsymbol e_i^\top\boldsymbol X$ 是正态的，每个子向量也是联合正态的（取 $\boldsymbol a$ 支在相应坐标上），任何线性变换像也联合正态（定理 12.16）。

式（12.16）的归一化可由线性变换验证：设 $\boldsymbol\Sigma=\boldsymbol A\boldsymbol A^\top$（Cholesky 分解，第8章），令 $\boldsymbol Z\sim N_n(\boldsymbol0,\boldsymbol I_n)$，则 $\boldsymbol X=\boldsymbol\mu+\boldsymbol A\boldsymbol Z$ 的密度由 $n$ 维雅可比公式给出，$|\det\boldsymbol A|=|\boldsymbol\Sigma|^{1/2}$。二次型 $(\boldsymbol x-\boldsymbol\mu)^\top\boldsymbol\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)$ 称为 Mahalanobis 距离的平方，密度等高线是椭球面，其主轴方向由 $\boldsymbol\Sigma$ 的特征向量给出，半轴长度由特征值的平方根给出。

二元情形的显式形式在应用中最为常见。设 $\mathbb E[X]=\mu_X$、$\mathbb E[Y]=\mu_Y$、$\operatorname{Var}(X)=\sigma_X^2$、$\operatorname{Var}(Y)=\sigma_Y^2$、相关系数为 $\rho\in(-1,1)$，则

$$
\boldsymbol\Sigma=\begin{pmatrix}\sigma_X^2&\rho\sigma_X\sigma_Y\\[2pt]\rho\sigma_X\sigma_Y&\sigma_Y^2\end{pmatrix},
\qquad
|\boldsymbol\Sigma|=\sigma_X^2\sigma_Y^2(1-\rho^2),
$$

$$
\boldsymbol\Sigma^{-1}=\frac1{1-\rho^2}
\begin{pmatrix}\sigma_X^{-2}&-\rho(\sigma_X\sigma_Y)^{-1}\\[2pt]-\rho(\sigma_X\sigma_Y)^{-1}&\sigma_Y^{-2}\end{pmatrix},
$$

从而

$$
f_{X,Y}(x,y)=\frac1{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}
\exp\left\{-\frac1{2(1-\rho^2)}
\left[u^2-2\rho uv+v^2\right]\right\},
$$

其中 $u=(x-\mu_X)/\sigma_X$、$v=(y-\mu_Y)/\sigma_Y$。当 $\rho=0$ 时它退化为两个正态密度的乘积；当 $|\rho|\to1$ 时概率质量向直线 $v=\pm u$ 集中，$|\boldsymbol\Sigma|\to0$，分布趋于退化。

**定理 12.16（线性变换封闭性）**

设 $\boldsymbol X\sim N_n(\boldsymbol\mu,\boldsymbol\Sigma)$，$\boldsymbol B$ 为 $m\times n$ 常数矩阵，$\boldsymbol b\in\mathbb R^m$。则

$$
\boldsymbol Y=\boldsymbol B\boldsymbol X+\boldsymbol b\sim N_m\bigl(\boldsymbol B\boldsymbol\mu+\boldsymbol b,\;\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top\bigr).
\tag{12.17}
$$

**证明**

对任意 $\boldsymbol a\in\mathbb R^m$，

$$
\boldsymbol a^\top\boldsymbol Y=\boldsymbol a^\top\boldsymbol B\boldsymbol X+\boldsymbol a^\top\boldsymbol b
=(\boldsymbol B^\top\boldsymbol a)^\top\boldsymbol X+\boldsymbol a^\top\boldsymbol b.
$$

由定义 12.15，$(\boldsymbol B^\top\boldsymbol a)^\top\boldsymbol X$ 服从一元正态分布，加常数不改变正态性，故 $\boldsymbol a^\top\boldsymbol Y$ 服从一元正态分布。由 $\boldsymbol a$ 的任意性，$\boldsymbol Y$ 服从多元正态分布。

均值与协方差由期望和协方差的线性性质直接计算：

$$
\mathbb E[\boldsymbol Y]=\boldsymbol B\boldsymbol\mu+\boldsymbol b,
$$

$$
\operatorname{Cov}(\boldsymbol Y)
=\mathbb E\bigl[(\boldsymbol B\tilde{\boldsymbol X})(\boldsymbol B\tilde{\boldsymbol X})^\top\bigr]
=\boldsymbol B\,\mathbb E[\tilde{\boldsymbol X}\tilde{\boldsymbol X}^\top]\boldsymbol B^\top
=\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top,
$$

其中 $\tilde{\boldsymbol X}=\boldsymbol X-\boldsymbol\mu$。

□

封闭性的证明只用到了定义和一维正态性，因此对退化的 $\boldsymbol\Sigma$ 同样成立，这是定义 12.15 采取线性组合形式的直接好处。若改用密度定义，$\boldsymbol B$ 非满秩时 $\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top$ 奇异，密度不存在，证明就会中断。

封闭性有若干立即可用的结论。第一，$m=1$ 时说明任何线性组合都是正态的，这正是定义本身，说明定义与刻画互相一致。第二，样本均值 $\bar X=\frac1n\boldsymbol 1^\top\boldsymbol X$ 在 $\boldsymbol X$ 联合正态时服从 $N(\bar\mu,\boldsymbol 1^\top\boldsymbol\Sigma\boldsymbol 1/n^2)$；当分量独立同分布 $N(\mu,\sigma^2)$ 时即 $N(\mu,\sigma^2/n)$。第三，若 $\boldsymbol B$ 可逆，则 $\boldsymbol Y=\boldsymbol B\boldsymbol X+\boldsymbol b$ 的密度可由式（12.16）与雅可比公式直接写出：

$$
f_{\boldsymbol Y}(\boldsymbol y)=\frac1{(2\pi)^{n/2}|\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top|^{1/2}}
\exp\left[-\frac12(\boldsymbol y-\boldsymbol B\boldsymbol\mu-\boldsymbol b)^\top
(\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top)^{-1}(\boldsymbol y-\boldsymbol B\boldsymbol\mu-\boldsymbol b)\right].
$$

**定理 12.17（联合正态下不相关与独立等价）**

设 $\boldsymbol X=(\boldsymbol X_1^\top,\boldsymbol X_2^\top)^\top\sim N_{n}(\boldsymbol\mu,\boldsymbol\Sigma)$，分块为

$$
\boldsymbol\mu=\begin{pmatrix}\boldsymbol\mu_1\\[2pt]\boldsymbol\mu_2\end{pmatrix},
\qquad
\boldsymbol\Sigma=\begin{pmatrix}\boldsymbol\Sigma_{11}&\boldsymbol\Sigma_{12}\\[2pt]\boldsymbol\Sigma_{21}&\boldsymbol\Sigma_{22}\end{pmatrix}.
$$

则 $\boldsymbol X_1$ 与 $\boldsymbol X_2$ 独立当且仅当 $\boldsymbol\Sigma_{12}=\boldsymbol0$，即当且仅当 $\boldsymbol X_1$ 的每个分量与 $\boldsymbol X_2$ 的每个分量不相关。

**证明**

必要性对任何随机向量都成立：独立蕴含 $\mathbb E[X_{1i}X_{2j}]=\mathbb E[X_{1i}]\mathbb E[X_{2j}]$，故 $\boldsymbol\Sigma_{12}=\boldsymbol0$。

充分性先设 $\boldsymbol\Sigma$ 正定。此时 $\boldsymbol\Sigma_{11}$、$\boldsymbol\Sigma_{22}$ 也正定（取 $\boldsymbol a=(\boldsymbol a_1^\top,\boldsymbol0^\top)^\top$ 即得 $\boldsymbol a_1^\top\boldsymbol\Sigma_{11}\boldsymbol a_1>0$）。由分块矩阵行列式公式与 $\boldsymbol\Sigma_{12}=\boldsymbol0$，

$$
|\boldsymbol\Sigma|=|\boldsymbol\Sigma_{11}|\,|\boldsymbol\Sigma_{22}|,
\qquad
\boldsymbol\Sigma^{-1}=\begin{pmatrix}\boldsymbol\Sigma_{11}^{-1}&\boldsymbol0\\[2pt]\boldsymbol0&\boldsymbol\Sigma_{22}^{-1}\end{pmatrix}.
$$

代入式（12.16），指数部分分解为两项之和，常数因子也分解，得

$$
f_{\boldsymbol X}(\boldsymbol x_1,\boldsymbol x_2)
=f_{\boldsymbol X_1}(\boldsymbol x_1)\,f_{\boldsymbol X_2}(\boldsymbol x_2),
$$

其中 $\boldsymbol X_i\sim N(\boldsymbol\mu_i,\boldsymbol\Sigma_{ii})$。由定理 12.7 得独立。

一般情形（$\boldsymbol\Sigma$ 可能奇异）的完整证明使用特征函数：联合正态向量的特征函数为

$$
\varphi_{\boldsymbol X}(\boldsymbol t)
=\exp\left(i\boldsymbol t^\top\boldsymbol\mu-\tfrac12\boldsymbol t^\top\boldsymbol\Sigma\boldsymbol t\right),
$$

当 $\boldsymbol\Sigma_{12}=\boldsymbol0$ 时二次型分裂为两块之和，于是 $\varphi_{\boldsymbol X}(\boldsymbol t_1,\boldsymbol t_2)=\varphi_{\boldsymbol X_1}(\boldsymbol t_1)\varphi_{\boldsymbol X_2}(\boldsymbol t_2)$，由特征函数唯一决定分布（第14章）即得独立。此处不重复该理论的推导，只指出所依赖的两个事实：线性组合的正态性等价于上述特征函数形式，以及特征函数与分布的一一对应。也可用非退化逼近给出初等证明：对 $\varepsilon>0$，$\boldsymbol X^{(\varepsilon)}=\boldsymbol X+\sqrt\varepsilon\,\boldsymbol Z$（$\boldsymbol Z$ 为独立标准正态向量）具有正定协方差矩阵，由已证情形其两个子块独立；令 $\varepsilon\downarrow0$ 用分布的弱收敛与独立性在极限下保持即得。

□

定理 12.17 的意义在于它把“协方差为零”这一容易计算的条件，在联合正态假设下升级为“完全独立”这一强得多的结论。整个均值—方差分析、因子模型的正交残差假设、Black–Scholes 框架下 Brown 运动增量的独立性，都依赖这一等价关系。

但必须强调前提是**联合**正态。边缘都是正态而不相关，绝不蕴含独立。

**例 12.4（用 Cholesky 分解生成相关正态收益）**

设两只资产的年化波动率为 $\sigma_1=0.20$、$\sigma_2=0.30$，相关系数 $\rho=0.40$。写出协方差矩阵，给出用两个独立标准正态变量模拟联合收益的显式公式，并计算等权组合的波动率。

**解**

协方差矩阵为

$$
\boldsymbol\Sigma=\begin{pmatrix}0.04&0.4\times0.2\times0.3\\[2pt]0.4\times0.2\times0.3&0.09\end{pmatrix}
=\begin{pmatrix}0.0400&0.0240\\[2pt]0.0240&0.0900\end{pmatrix}.
$$

其行列式为 $0.04\times0.09-0.024^2=0.0036-0.000576=0.003024>0$，故正定。Cholesky 分解 $\boldsymbol\Sigma=\boldsymbol L\boldsymbol L^\top$ 中 $\boldsymbol L$ 为下三角矩阵：

$$
L_{11}=\sigma_1=0.20,\qquad
L_{21}=\frac{\Sigma_{21}}{L_{11}}=\frac{0.024}{0.20}=0.12,
$$

$$
L_{22}=\sqrt{\Sigma_{22}-L_{21}^2}=\sqrt{0.09-0.0144}=\sqrt{0.0756}=0.27495.
$$

验证：$L_{21}^2+L_{22}^2=0.0144+0.0756=0.09=\Sigma_{22}$。

设 $Z_1,Z_2$ 独立且服从 $N(0,1)$，令

$$
\begin{pmatrix}R_1\\R_2\end{pmatrix}
=\boldsymbol L\begin{pmatrix}Z_1\\Z_2\end{pmatrix}
=\begin{pmatrix}0.20Z_1\\[2pt]0.12Z_1+0.27495Z_2\end{pmatrix}.
$$

由定理 12.16，$(R_1,R_2)^\top\sim N_2(\boldsymbol0,\boldsymbol L\boldsymbol I\boldsymbol L^\top)=N_2(\boldsymbol0,\boldsymbol\Sigma)$，即模拟出的收益具有所需的相关结构。这里 $Z_1$ 是可被两者共同暴露的“系统性”成分，$Z_2$ 只进入 $R_2$，是 $R_2$ 的特质性成分。

等权组合 $R_p=0.5R_1+0.5R_2$ 的方差由式（12.11）得

$$
\operatorname{Var}(R_p)=0.25\times0.04+0.25\times0.09+2\times0.25\times0.024
=0.0100+0.0225+0.0120=0.0445,
$$

波动率为 $\sqrt{0.0445}=0.2110$。若 $\rho=0$，方差为 $0.0325$，波动率 $0.1803$；若两资产完全独立地各占一半，波动率介于 $0.20$ 与 $0.30$ 之间而低于其算术平均 $0.25$，这正是分散化收益。相关性从 $0$ 升至 $0.4$，使组合波动率从 $0.1803$ 升至 $0.2110$，增幅约 $17\%$，说明相关性假设对风险预算的影响是量级显著的，而不是二阶修正。

**例 12.5（边缘正态且不相关，但联合非正态、不独立）**

设 $X\sim N(0,1)$，$\varepsilon$ 与 $X$ 独立且 $\mathbb P(\varepsilon=1)=\mathbb P(\varepsilon=-1)=1/2$，令 $Y=\varepsilon X$。证明 $Y\sim N(0,1)$、$\operatorname{Cov}(X,Y)=0$，但 $(X,Y)$ 不服从二元正态分布且 $X$、$Y$ 不独立。

**解**

$Y$ 的分布：对任意 Borel 集 $A$，由全概率公式与 $X$ 的对称性，

$$
\mathbb P(Y\in A)=\frac12\mathbb P(X\in A)+\frac12\mathbb P(-X\in A)
=\frac12\mathbb P(X\in A)+\frac12\mathbb P(X\in -A)=\mathbb P(X\in A),
$$

最后一步用到标准正态分布关于原点对称，$\mathbb P(X\in -A)=\mathbb P(X\in A)$。故 $Y\sim N(0,1)$。

协方差：由 $X$ 与 $\varepsilon$ 独立，

$$
\mathbb E[XY]=\mathbb E[\varepsilon X^2]=\mathbb E[\varepsilon]\,\mathbb E[X^2]=0\times1=0,
$$

且 $\mathbb E[X]=\mathbb E[Y]=0$，故 $\operatorname{Cov}(X,Y)=0$，$\rho=0$。

不独立：$|Y|=|\varepsilon X|=|X|$，于是 $\mathbb P(|Y|>1\mid |X|>1)=1$，而 $\mathbb P(|Y|>1)=2(1-\Phi(1))\approx0.317$，两者不等。

非联合正态：考虑线性组合 $X+Y=(1+\varepsilon)X$。当 $\varepsilon=-1$ 时它恒为 $0$，当 $\varepsilon=1$ 时它等于 $2X$。故

$$
\mathbb P(X+Y=0)=\mathbb P(\varepsilon=-1)=\frac12.
$$

一个正态随机变量若在单点上有正概率，则该变量必为退化常数；而 $X+Y$ 以 $1/2$ 概率为 $0$、以 $1/2$ 概率服从 $N(0,4)$，显然不是任何正态分布。由定义 12.15，$(X,Y)$ 不是二元正态。

本例说明“两个分量都是正态”远弱于“联合正态”，也说明定理 12.17 的逆命题若无联合正态假设即为假。实际建模中，如果对数收益的联合分布是由体制切换、跳跃或波动率随机性生成的，那么即便每个边缘近似正态，也不能从相关系数为零推断独立，更不能把多元正态的密度公式当作近似使用。

## 12.4 随机变量函数的分布

第10章处理了一维变换，其核心是单调反函数与一维 Jacobian 因子。多维情形的困难有两个：一是映射通常不再单调，需要保证单射；二是目标变量的个数可能少于原变量个数，此时必须引入辅助变量再边缘化。本节先建立一般的雅可比公式，然后把它应用于三类最重要的函数：和、商、最大值与最小值。

### 12.4.1 $n$ 维变换的雅可比方法

**定理 12.18（$n$ 维随机变量变换公式）**

设随机向量 $\boldsymbol X=(X_1,\ldots,X_n)^\top$ 的密度为 $f_{\boldsymbol X}$，其支撑含于开集 $D\subseteq\mathbb R^n$。设映射 $\boldsymbol g:D\to\mathbb R^n$ 满足：

1. $\boldsymbol g$ 在 $D$ 上单射，且各分量具有连续一阶偏导数；
2. 反映射 $\boldsymbol h=\boldsymbol g^{-1}:\boldsymbol g(D)\to D$ 存在，各分量也具有连续一阶偏导数；
3. Jacobian 行列式 $\det\boldsymbol J_{\boldsymbol h}(\boldsymbol y)=\det\bigl(\partial h_i/\partial y_j\bigr)_{i,j}$ 在 $\boldsymbol g(D)$ 上处处不为零。

则 $\boldsymbol Y=\boldsymbol g(\boldsymbol X)$ 为绝对连续随机向量，其密度为

$$
f_{\boldsymbol Y}(\boldsymbol y)=f_{\boldsymbol X}\bigl(\boldsymbol h(\boldsymbol y)\bigr)
\left|\det\boldsymbol J_{\boldsymbol h}(\boldsymbol y)\right|
\mathbf 1_{\boldsymbol g(D)}(\boldsymbol y).
\tag{12.18}
$$

等价地，用 $\boldsymbol g$ 的 Jacobian 表示为

$$
f_{\boldsymbol Y}(\boldsymbol y)=
\frac{f_{\boldsymbol X}\bigl(\boldsymbol h(\boldsymbol y)\bigr)}
{\left|\det\boldsymbol J_{\boldsymbol g}\bigl(\boldsymbol h(\boldsymbol y)\bigr)\right|},
$$

因为 $\boldsymbol J_{\boldsymbol h}(\boldsymbol y)=\bigl[\boldsymbol J_{\boldsymbol g}(\boldsymbol h(\boldsymbol y))\bigr]^{-1}$。

**推导**

对任意 Borel 集 $A\subseteq\boldsymbol g(D)$，

$$
\mathbb P(\boldsymbol Y\in A)=\mathbb P\bigl(\boldsymbol X\in\boldsymbol h(A)\bigr)
=\int_{\boldsymbol h(A)}f_{\boldsymbol X}(\boldsymbol x)\,d\boldsymbol x.
$$

对右端应用第3章的多元变量替换定理（定理 3.10），以 $\boldsymbol x=\boldsymbol h(\boldsymbol y)$ 作替换，$\boldsymbol h(A)$ 映为 $A$，体积元的变换因子正是 Jacobian 行列式的绝对值：

$$
\int_{\boldsymbol h(A)}f_{\boldsymbol X}(\boldsymbol x)\,d\boldsymbol x
=\int_A f_{\boldsymbol X}\bigl(\boldsymbol h(\boldsymbol y)\bigr)
\left|\det\boldsymbol J_{\boldsymbol h}(\boldsymbol y)\right|d\boldsymbol y.
$$

由于上式对一切 Borel 集 $A$ 成立，被积函数（在 $\boldsymbol g(D)$ 外补零）就是 $\boldsymbol Y$ 的密度。

□

推导的实质是概率质量守恒：$\boldsymbol X$ 落在小立方体 $d\boldsymbol x$ 上的概率 $f_{\boldsymbol X}(\boldsymbol x)d\boldsymbol x$ 必须等于 $\boldsymbol Y$ 落在其像 $d\boldsymbol y$ 上的概率 $f_{\boldsymbol Y}(\boldsymbol y)d\boldsymbol y$，而 $d\boldsymbol y=|\det\boldsymbol J_{\boldsymbol g}|d\boldsymbol x$。忘记 Jacobian 因子是这类计算最常见的错误，其后果通常表现为密度不归一，因此算完后检查 $\int f_{\boldsymbol Y}=1$ 是必要的验算步骤。

单射条件不可省略。若 $\boldsymbol g$ 在 $D$ 上不是单射，应把 $D$ 分成有限个区域 $D_1,\ldots,D_m$，使 $\boldsymbol g$ 在每个 $D_k$ 上单射，然后对各支贡献求和：

$$
f_{\boldsymbol Y}(\boldsymbol y)=\sum_{k=1}^m f_{\boldsymbol X}\bigl(\boldsymbol h_k(\boldsymbol y)\bigr)
\left|\det\boldsymbol J_{\boldsymbol h_k}(\boldsymbol y)\right|.
$$

第10章的 $Y=X^2$ 就是 $m=2$ 的情形。若 $\boldsymbol g$ 的值域维数低于 $n$（例如只要求和 $X_1+X_2$），则不存在反映射，标准做法是补足辅助变量 $W_2,\ldots,W_n$ 使映射成为 $n$ 维到 $n$ 维的双射，用式（12.18）求 $(Y,W_2,\ldots,W_n)$ 的联合密度，再对辅助变量积分。下面的卷积公式与商的分布公式都是这一流程的具体化。

**例 12.6（极坐标变换与 Rayleigh 分布）**

设 $X,Y$ 独立且均服从 $N(0,1)$。令 $R=\sqrt{X^2+Y^2}$、$\Theta\in[0,2\pi)$ 为满足 $X=R\cos\Theta$、$Y=R\sin\Theta$ 的角度。求 $(R,\Theta)$ 的联合密度，并判断二者是否独立。

**解**

联合密度为 $f_{X,Y}(x,y)=\frac1{2\pi}e^{-(x^2+y^2)/2}$，支撑为 $\mathbb R^2$，是乘积形式，与独立性一致。变换 $\boldsymbol g$ 在去掉一条射线（例如 $\{y=0,x\ge0\}$，其概率为零）后单射，反映射为 $x=r\cos\theta$、$y=r\sin\theta$，Jacobian 矩阵为

$$
\boldsymbol J_{\boldsymbol h}(r,\theta)=
\begin{pmatrix}\cos\theta&-r\sin\theta\\[2pt]\sin\theta&r\cos\theta\end{pmatrix},
\qquad
\det\boldsymbol J_{\boldsymbol h}=r\cos^2\theta+r\sin^2\theta=r.
$$

由式（12.18），

$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}e^{-r^2/2}\cdot r
=\underbrace{r e^{-r^2/2}\mathbf 1_{r>0}}_{f_R(r)}
\cdot\underbrace{\frac1{2\pi}\mathbf 1_{0\le\theta<2\pi}}_{f_\Theta(\theta)}.
$$

支持集为 $(0,\infty)\times[0,2\pi)$，是乘积形式，且密度分离为两个非负函数之积，故 $R$ 与 $\Theta$ 独立，$\Theta\sim\operatorname{Uniform}(0,2\pi)$，$R$ 服从 Rayleigh 分布。进一步，$R^2=X^2+Y^2$ 的分布可由一维变换求得：$F_{R^2}(t)=\mathbb P(R\le\sqrt t)=1-e^{-t/2}$（$t>0$），故 $R^2\sim\operatorname{Exp}(1/2)$，即自由度 $2$ 的卡方分布。

这一计算有直接的模拟意义：Box–Muller 方法反过来使用它，由独立的 $U_1,U_2\sim\operatorname{Uniform}(0,1)$ 构造

$$
Z_1=\sqrt{-2\log U_1}\cos(2\pi U_2),
\qquad
Z_2=\sqrt{-2\log U_1}\sin(2\pi U_2),
$$

得到两个独立标准正态变量，因为 $R^2=-2\log U_1\sim\operatorname{Exp}(1/2)$ 且 $\Theta=2\pi U_2$ 均匀独立。

### 12.4.2 和的分布与卷积公式

**定理 12.19（和的密度：卷积公式）**

设 $(X,Y)$ 具有联合密度 $f_{X,Y}$，$Z=X+Y$。则 $Z$ 绝对连续，且

$$
f_Z(z)=\int_{-\infty}^{\infty}f_{X,Y}(z-y,\,y)\,dy
=\int_{-\infty}^{\infty}f_{X,Y}(x,\,z-x)\,dx.
\tag{12.19}
$$

**证明**

先求分布函数。事件 $\{X+Y\le z\}$ 对应平面上的半平面，故

$$
F_Z(z)=\mathbb P(X+Y\le z)=\iint_{\{x+y\le z\}}f_{X,Y}(x,y)\,dx\,dy
=\int_{-\infty}^{\infty}\left[\int_{-\infty}^{z-y}f_{X,Y}(x,y)\,dx\right]dy.
$$

对外层变量 $z$ 求导。由于被积函数非负且 $f_{X,Y}$ 可积，可用 Lebesgue 控制收敛定理交换极限与积分（等价地对内层上限使用 Leibniz 规则）：

$$
f_Z(z)=\frac{d}{dz}F_Z(z)
=\int_{-\infty}^{\infty}\frac{\partial}{\partial z}
\left[\int_{-\infty}^{z-y}f_{X,Y}(x,y)\,dx\right]dy
=\int_{-\infty}^{\infty}f_{X,Y}(z-y,y)\,dy.
$$

最后一个等号来自 Leibniz 规则：内层积分对其上限求导，等于被积函数在上限 $x=z-y$ 处的取值乘以上限对 $z$ 的导数 $1$。式（12.19）中的第二个表达式由替换 $x=z-y$（此时 $y=z-x$、$dy=-dx$，积分方向相应反转）得到，两者只是积分变量的重命名。

也可用辅助变量法复核：令 $Z=X+Y$、$W=Y$，则反映射为 $X=Z-W$、$Y=W$，Jacobian 行列式为

$$
\det\begin{pmatrix}\partial x/\partial z&\partial x/\partial w\\[2pt]\partial y/\partial z&\partial y/\partial w\end{pmatrix}
=\det\begin{pmatrix}1&-1\\0&1\end{pmatrix}=1,
$$

故 $f_{Z,W}(z,w)=f_{X,Y}(z-w,w)$，对 $w$ 积分即得式（12.19）。

□

**定理 12.20（独立情形与卷积）**

若 $X$ 与 $Y$ 独立，密度分别为 $f_X$、$f_Y$，则 $Z=X+Y$ 的密度为卷积

$$
f_Z(z)=(f_X*f_Y)(z)=\int_{-\infty}^{\infty}f_X(z-y)f_Y(y)\,dy.
\tag{12.20}
$$

对离散独立变量，

$$
p_Z(k)=\sum_{j}p_X(j)\,p_Y(k-j).
\tag{12.21}
$$

卷积满足交换律 $f_X*f_Y=f_Y*f_X$ 与结合律 $(f_X*f_Y)*f_Z=f_X*(f_Y*f_Z)$，后者对应三个独立变量之和的分布，因此 $n$ 个独立同分布变量之和的密度是 $f^{\ast n}$。

式（12.20）中的积分限实际上由两个支持集的交集决定。若 $X$ 支撑于 $[a_1,b_1]$、$Y$ 支撑于 $[a_2,b_2]$，则 $Z$ 支撑于 $[a_1+a_2,b_1+b_2]$，且对 $z$ 在该区间内，被积函数非零要求 $y\in[\max(a_2,z-b_1),\min(b_2,z-a_1)]$。忽略这一步会把有限区间上的积分错误地算成全直线积分。

**例 12.7（指数和与 Gamma 可加性）**

设 $X,Y$ 独立且均服从 $\operatorname{Exp}(\lambda)$。用卷积求 $Z=X+Y$ 的密度；再推广到形状参数不同的 Gamma 分布。

**解**

两者支撑均为 $(0,\infty)$，故 $Z>0$，且对 $z>0$，被积函数非零要求 $y\in(0,z)$：

$$
f_Z(z)=\int_0^z \lambda e^{-\lambda(z-y)}\cdot\lambda e^{-\lambda y}\,dy
=\lambda^2e^{-\lambda z}\int_0^z dy
=\lambda^2 z e^{-\lambda z}.
$$

这正是形状参数 $2$、速率 $\lambda$ 的 Gamma 密度：$\frac{\lambda^2}{\Gamma(2)}z^{2-1}e^{-\lambda z}$，也称为 Erlang 分布。$z\le0$ 时密度为零。验算归一化：$\int_0^\infty\lambda^2ze^{-\lambda z}dz=\lambda^2\cdot\frac1{\lambda^2}=1$。

推广：设 $X\sim\operatorname{Gamma}(\alpha_1,\beta)$、$Y\sim\operatorname{Gamma}(\alpha_2,\beta)$ 独立（速率口径，见第10章式（10.7）），二者速率相同。则对 $z>0$，

$$
\begin{aligned}
f_Z(z)
&=\int_0^z\frac{\beta^{\alpha_1}}{\Gamma(\alpha_1)}(z-y)^{\alpha_1-1}e^{-\beta(z-y)}
\cdot\frac{\beta^{\alpha_2}}{\Gamma(\alpha_2)}y^{\alpha_2-1}e^{-\beta y}\,dy\\
&=\frac{\beta^{\alpha_1+\alpha_2}e^{-\beta z}}{\Gamma(\alpha_1)\Gamma(\alpha_2)}
\int_0^z(z-y)^{\alpha_1-1}y^{\alpha_2-1}\,dy.
\end{aligned}
$$

指数因子合并时 $e^{-\beta(z-y)}e^{-\beta y}=e^{-\beta z}$ 与积分变量无关，这是可加性成立的关键。令 $y=zu$，$dy=z\,du$，得

$$
\int_0^z(z-y)^{\alpha_1-1}y^{\alpha_2-1}dy
=z^{\alpha_1+\alpha_2-1}\int_0^1(1-u)^{\alpha_1-1}u^{\alpha_2-1}du
=z^{\alpha_1+\alpha_2-1}B(\alpha_2,\alpha_1).
$$

由 $B(\alpha_1,\alpha_2)=\Gamma(\alpha_1)\Gamma(\alpha_2)/\Gamma(\alpha_1+\alpha_2)$，

$$
f_Z(z)=\frac{\beta^{\alpha_1+\alpha_2}}{\Gamma(\alpha_1+\alpha_2)}
z^{\alpha_1+\alpha_2-1}e^{-\beta z},
$$

即 $Z\sim\operatorname{Gamma}(\alpha_1+\alpha_2,\beta)$。速率参数必须相同；$\operatorname{Gamma}(\alpha_1,\beta_1)+\operatorname{Gamma}(\alpha_2,\beta_2)$（$\beta_1\ne\beta_2$）不再是 Gamma 分布。

离散情形的可加性同样由式（12.21）得到。设 $N_1\sim\operatorname{Poisson}(\lambda_1)$、$N_2\sim\operatorname{Poisson}(\lambda_2)$ 独立，则

$$
p_{N_1+N_2}(k)=\sum_{j=0}^k e^{-\lambda_1}\frac{\lambda_1^j}{j!}e^{-\lambda_2}\frac{\lambda_2^{k-j}}{(k-j)!}
=\frac{e^{-(\lambda_1+\lambda_2)}}{k!}\sum_{j=0}^k\binom kj\lambda_1^j\lambda_2^{k-j}
=e^{-(\lambda_1+\lambda_2)}\frac{(\lambda_1+\lambda_2)^k}{k!},
$$

其中用到了二项式定理。故独立 Poisson 变量之和仍为 Poisson，参数相加。

独立正态变量之和则不必使用卷积。由定理 12.16，$(X,Y)$ 联合正态时 $X+Y=(1,1)(X,Y)^\top$ 仍为正态，均值与方差为

$$
\mathbb E[X+Y]=\mu_X+\mu_Y,
\qquad
\operatorname{Var}(X+Y)=\sigma_X^2+\sigma_Y^2+2\rho\sigma_X\sigma_Y.
$$

独立时 $\rho=0$，得 $X+Y\sim N(\mu_X+\mu_Y,\sigma_X^2+\sigma_Y^2)$。若坚持用卷积，需要对 $\int\exp[-(z-y-\mu_X)^2/2\sigma_X^2-(y-\mu_Y)^2/2\sigma_Y^2]dy$ 配方，结果一致但计算量明显更大。选择哪条路径取决于分布族是否对线性变换封闭。

### 12.4.3 商与积的分布

**定理 12.21（商与积的密度）**

设 $(X,Y)$ 具有联合密度 $f_{X,Y}$，且 $\mathbb P(Y=0)=0$。则 $Z=X/Y$ 的密度为

$$
f_Z(z)=\int_{-\infty}^{\infty}f_{X,Y}(zw,\,w)\,|w|\,dw.
\tag{12.22}
$$

若 $X$ 与 $Y$ 独立，则 $f_Z(z)=\int_{-\infty}^{\infty}f_X(zw)f_Y(w)|w|\,dw$；若进一步 $Y>0$ 几乎必然，则

$$
f_Z(z)=\int_0^{\infty}f_X(zw)f_Y(w)\,w\,dw.
$$

对乘积 $V=XY$，

$$
f_V(v)=\int_{-\infty}^{\infty}f_{X,Y}\left(\frac vw,\,w\right)\frac1{|w|}\,dw.
\tag{12.23}
$$

**证明**

先处理商。令 $Z=X/Y$、$W=Y$。反映射为 $X=ZW$、$Y=W$，Jacobian 行列式为

$$
\det\begin{pmatrix}\partial x/\partial z&\partial x/\partial w\\[2pt]\partial y/\partial z&\partial y/\partial w\end{pmatrix}
=\det\begin{pmatrix}w&z\\0&1\end{pmatrix}=w,
$$

故由式（12.18），$f_{Z,W}(z,w)=f_{X,Y}(zw,w)|w|$。对 $w$ 积分即得式（12.22）。这里 $\mathbb P(Y=0)=0$ 保证变换在概率意义下处处有定义，去掉零测集不影响分布。

对乘积，令 $V=XY$、$W=Y$，反映射为 $X=V/W$、$Y=W$，Jacobian 行列式为

$$
\det\begin{pmatrix}1/w&-v/w^2\\[2pt]0&1\end{pmatrix}=\frac1w,
$$

故 $f_{V,W}(v,w)=f_{X,Y}(v/w,w)/|w|$，积分得式（12.23）。

□

**例 12.8（两个独立标准正态之商为 Cauchy 分布）**

设 $Z_1,Z_2$ 独立且均服从 $N(0,1)$。求 $T=Z_1/Z_2$ 的分布。

**解**

由式（12.22）的独立形式，其中 $f_{Z_1}(t w)=\frac1{\sqrt{2\pi}}e^{-t^2w^2/2}$、$f_{Z_2}(w)=\frac1{\sqrt{2\pi}}e^{-w^2/2}$：

$$
f_T(t)=\frac1{2\pi}\int_{-\infty}^{\infty}e^{-(t^2+1)w^2/2}|w|\,dw.
$$

被积函数关于 $w$ 为偶函数，故

$$
f_T(t)=\frac1\pi\int_0^{\infty}w\,e^{-aw^2/2}\,dw,
\qquad a=1+t^2>0.
$$

令 $s=w^2/2$，则 $w\,dw=ds$，积分化为

$$
\int_0^\infty e^{-as}\,ds=\frac1a,
$$

于是

$$
f_T(t)=\frac1{\pi(1+t^2)},\qquad t\in\mathbb R,
$$

即标准 Cauchy 分布，与第10章式（10.13）之后的重尾讨论相呼应。

值得注意的三点。第一，$T$ 的密度关于原点对称，但 $\mathbb E[T]$ 不存在：$\int_0^\infty t\cdot\frac1{\pi(1+t^2)}dt$ 发散，因此 $\operatorname{Cov}$ 与 $\rho$ 对 Cauchy 变量都无定义。第二，$Z_1/Z_2$ 与 $Z_2/Z_1$ 同分布，这由对称性显然，但它们的乘积恒为 $1$，说明“商的分布相同”绝不意味着两者可交换地出现在同一次计算中。第三，$n$ 个独立标准正态之商与自由度相关的 $t$ 分布有密切联系：$T_n=Z/\sqrt{V/n}$（$V\sim\chi^2_n$ 独立于 $Z$）服从自由度 $n$ 的 $t$ 分布，$n=1$ 时 $\sqrt V=|Z_2|$，绝对值不改变商（因为分子可正可负且对称），故退化为 Cauchy。第19章将用这一结构建立正态均值的精确推断。

### 12.4.4 最大值与最小值

**定理 12.22（最大值与最小值的分布）**

设 $X_1,\ldots,X_n$ 相互独立，分布函数分别为 $F_1,\ldots,F_n$。记 $M=\max_iX_i$、$m=\min_iX_i$，则

$$
F_M(z)=\prod_{i=1}^nF_i(z),
\qquad
F_m(z)=1-\prod_{i=1}^n\bigl[1-F_i(z)\bigr].
\tag{12.24}
$$

若进一步同分布且绝对连续，密度与分布函数为 $f$、$F$，则 $M$、$m$ 均绝对连续，且

$$
f_M(z)=nF(z)^{n-1}f(z),
\qquad
f_m(z)=n\bigl[1-F(z)\bigr]^{n-1}f(z).
\tag{12.25}
$$

不同分布但均有密度时，$f_M(z)=\sum_{i=1}^nf_i(z)\prod_{j\ne i}F_j(z)$，$f_m(z)=\sum_{i=1}^nf_i(z)\prod_{j\ne i}[1-F_j(z)]$。

**证明**

事件 $\{M\le z\}$ 等价于所有 $X_i\le z$ 同时发生，即 $\bigcap_i\{X_i\le z\}$。由独立性，其概率为各概率之积，得式（12.24）的第一个等式。

事件 $\{m>z\}$ 等价于所有 $X_i>z$，故 $\mathbb P(m>z)=\prod_i\mathbb P(X_i>z)=\prod_i[1-F_i(z)]$，其中用到连续性假设下 $\mathbb P(X_i>z)=1-F_i(z)$；对一般有分布的情形应写作 $\mathbb P(X_i>z)=1-F_i(z)$ 仍成立，因为 $\{X_i>z\}$ 是 $\{X_i\le z\}$ 的补集。取补得 $F_m$ 的表达式。

密度由求导得到。$F_M$ 是有限乘积，逐项求导：

$$
f_M(z)=\frac{d}{dz}\prod_iF_i(z)
=\sum_{i=1}^nf_i(z)\prod_{j\ne i}F_j(z),
$$

同分布时化简为式（12.25）的第一式。对 $F_m$，

$$
f_m(z)=-\frac{d}{dz}\prod_i[1-F_i(z)]
=\sum_{i=1}^nf_i(z)\prod_{j\ne i}[1-F_j(z)].
$$

□

式（12.25）与式（12.19）的形式差别值得强调：和的密度是卷积（积分），最大值的密度是乘积再求导（代数运算）。原因是和对应平面上斜半平面的积分区域，而最大值对应矩形区域 $\prod_i(-\infty,z]$，其概率可以直接因式分解。这一差别也解释了为什么独立正态之和仍是正态，而独立正态的最大值不再是正态。

独立性在式（12.24）中不可省略。若不假设独立，只能得到 Fréchet–Hoeffding 界

$$
\max\Bigl\{0,\;\sum_{i=1}^nF_i(z)-(n-1)\Bigr\}
\le F_M(z)\le\min_{1\le i\le n}F_i(z),
$$

上界对应完全正相依（共单调）情形，下界在 $n=2$ 时可达。这正是12.7.4节 Copula 讨论的核心问题：给定边缘分布，联合分布并不唯一，而极值的分布对这一非唯一性极为敏感。

指数分布的最小值有一个特别干净的结果，它是 Poisson 过程与信用风险建模的基础。设 $X_i\sim\operatorname{Exp}(\lambda_i)$ 相互独立，则由式（12.24），

$$
\mathbb P\Bigl(\min_iX_i>t\Bigr)=\prod_i e^{-\lambda_it}=e^{-(\sum_i\lambda_i)t},
$$

故 $\min_iX_i\sim\operatorname{Exp}\bigl(\sum_i\lambda_i\bigr)$；并且

$$
\mathbb P\bigl(X_k=\min_iX_i\bigr)=\frac{\lambda_k}{\sum_{i=1}^n\lambda_i}.
\tag{12.26}
$$

式（12.26）的证明：由全概率公式对最小值 $m$ 积分，

$$
\mathbb P(X_k=m)=\int_0^\infty\lambda_ke^{-\lambda_kt}\prod_{i\ne k}e^{-\lambda_it}\,dt
=\lambda_k\int_0^\infty e^{-(\sum_i\lambda_i)t}dt=\frac{\lambda_k}{\sum_i\lambda_i}.
$$

被积函数中 $\lambda_ke^{-\lambda_kt}$ 是 $X_k$ 的密度，其余因子是其他变量超过 $t$ 的概率。

## 12.5 次序统计量

最大值与最小值是次序统计量的两个端点。完整的次序统计量把样本按大小重新排列，是从样本过渡到统计推断的桥梁：样本中位数、分位数估计、极差、历史模拟法在险价值、稳健回归的截尾均值，都是次序统计量的函数。

### 12.5.1 定义与联合密度

**定义 12.23（次序统计量）**

设 $X_1,\ldots,X_n$ 为实值随机变量。它们的**次序统计量**是按升序重排后的随机向量

$$
X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)},
\qquad
X_{(k)}=\text{第 }k\text{ 小的值}.
$$

于是 $X_{(1)}=\min_iX_i$，$X_{(n)}=\max_iX_i$。$X_{(k)}$ 称为第 $k$ 个次序统计量，$R=X_{(n)}-X_{(1)}$ 称为**极差**（range）。

次序统计量是原样本的对称函数：对任意置换 $\sigma$，$(X_{\sigma(1)},\ldots,X_{\sigma(n)})$ 与 $(X_1,\ldots,X_n)$ 给出相同的次序统计量。因此重排丢失了“哪个观测取哪个值”的信息，若样本带有时间顺序（如收益率序列），次序统计量便丢掉了全部时序依赖结构，这也是为什么基于次序统计量的风险度量对序列相关不敏感、但也无法反映它。

以下本节始终假设 $X_1,\ldots,X_n$ **独立同分布且绝对连续**，公共密度与分布函数为 $f$、$F$。绝对连续性保证 $\mathbb P(X_i=X_j)=0$（$i\ne j$），即几乎必然没有并列，排序唯一，这是联合密度存在的必要条件；离散样本的次序统计量必须用质量函数与组合计数处理，公式不同。

**定理 12.24（次序统计量的联合密度）**

在上述假设下，$(X_{(1)},\ldots,X_{(n)})$ 的联合密度为

$$
f_{X_{(1)},\ldots,X_{(n)}}(x_1,\ldots,x_n)
=n!\prod_{i=1}^nf(x_i)\cdot\mathbf 1_{\{x_1<x_2<\cdots<x_n\}}.
\tag{12.27}
$$

**证明**

记单纯形 $S=\{x_1<\cdots<x_n\}$，并取任意 Borel 集 $A\subseteq S$。对每个置换 $\sigma\in\mathfrak S_n$，令

$$
A_\sigma=\{(y_1,\ldots,y_n):(y_{\sigma(1)},\ldots,y_{\sigma(n)})\in A\}.
$$

各 $A_\sigma$ 两两不交（它们分别落在互不相交的排序区域内），且 $\bigcup_\sigma A_\sigma$ 恰为“重排后落入 $A$”的全体样本点，除去零测的并列集。于是

$$
\mathbb P\bigl((X_{(1)},\ldots,X_{(n)})\in A\bigr)
=\sum_{\sigma\in\mathfrak S_n}\mathbb P\bigl((X_1,\ldots,X_n)\in A_\sigma\bigr).
$$

由独立性，$(X_1,\ldots,X_n)$ 的密度为 $\prod_if(y_i)$，它是坐标的对称函数，故对每个 $\sigma$，

$$
\mathbb P\bigl((X_1,\ldots,X_n)\in A_\sigma\bigr)
=\int_{A_\sigma}\prod_{i=1}^nf(y_i)\,d\boldsymbol y
=\int_A\prod_{i=1}^nf(x_i)\,d\boldsymbol x,
$$

其中最后的等号来自变量替换 $x_i=y_{\sigma(i)}$，其 Jacobian 矩阵是置换矩阵，行列式绝对值为 $1$。置换共有 $n!$ 个，求和即得

$$
\mathbb P\bigl((X_{(1)},\ldots,X_{(n)})\in A\bigr)
=\int_A n!\prod_{i=1}^nf(x_i)\,d\boldsymbol x.
$$

由于这对 $S$ 中一切 Borel 集成立，且在 $S$ 外次序统计量不取值，密度即式（12.27）。

□

直观解释是：$n$ 个观测落入 $n$ 个无穷小格子 $dx_1,\ldots,dx_n$ 的概率约为 $\prod_if(x_i)\prod_idx_i$，而任何一种“谁落在哪一格”的指派都给出相同的次序统计量取值，共有 $n!$ 种指派。因子 $n!$ 与因子 $\prod_if$ 都不能漏掉；验证归一化 $\int_S n!\prod f=n!\cdot\frac1{n!}=1$（因为全空间上 $\prod_if$ 的积分按排序区域分解为 $n!$ 份相等的部分）是有效的自检。

由式（12.27）积分掉中间变量，可得任意子集的联合密度。最有用的是两端与一对次序统计量：

$$
f_{X_{(1)},X_{(n)}}(u,v)=n(n-1)\bigl[F(v)-F(u)\bigr]^{n-2}f(u)f(v)\cdot\mathbf 1_{\{u<v\}},
$$

其组合解释是：$n$ 个观测中指定哪一个最小、哪一个最大共有 $n(n-1)$ 种方式，其余 $n-2$ 个都必须落在 $(u,v)$ 内，概率为 $[F(v)-F(u)]^{n-2}$。一般形式见命题 12.26。

### 12.5.2 第 $k$ 个次序统计量的密度

**定理 12.25（第 $k$ 个次序统计量的分布）**

在独立同分布绝对连续假设下，

$$
F_{X_{(k)}}(x)=\sum_{j=k}^{n}\binom njF(x)^j\bigl[1-F(x)\bigr]^{n-j},
\tag{12.28}
$$

且 $X_{(k)}$ 绝对连续，密度为

$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!\,(n-k)!}F(x)^{k-1}\bigl[1-F(x)\bigr]^{n-k}f(x).
\tag{12.29}
$$

**证明**

第一步求分布函数。事件 $\{X_{(k)}\le x\}$ 等价于“至少有 $k$ 个观测不超过 $x$”。令 $N_x=\sum_{i=1}^n\mathbf 1_{\{X_i\le x\}}$，由独立同分布假设 $N_x\sim\operatorname{Binomial}(n,F(x))$，故

$$
F_{X_{(k)}}(x)=\mathbb P(N_x\ge k)
=\sum_{j=k}^n\binom njF(x)^j[1-F(x)]^{n-j},
$$

即式（12.28）。

第二步对式（12.28）求导。记 $p=F(x)$，$p'=f(x)$。逐项求导得

$$
\frac{d}{dx}F_{X_{(k)}}(x)
=\sum_{j=k}^n\binom nj\Bigl[jp^{j-1}(1-p)^{n-j}-(n-j)p^j(1-p)^{n-j-1}\Bigr]p'.
$$

用恒等式 $j\binom nj=n\binom{n-1}{j-1}$ 与 $(n-j)\binom nj=n\binom{n-1}{j}$ 改写为

$$
\frac{d}{dx}F_{X_{(k)}}(x)
=np'\left[\sum_{j=k}^n\binom{n-1}{j-1}p^{j-1}(1-p)^{n-j}
-\sum_{j=k}^n\binom{n-1}{j}p^{j}(1-p)^{n-1-j}\right].
$$

在第一个和中令 $i=j-1$，$i$ 从 $k-1$ 到 $n-1$；第二个和中 $j=n$ 项因 $\binom{n-1}{n}=0$ 消失，$j$ 从 $k$ 到 $n-1$。两式逐项相消，只剩第一个和中 $i=k-1$ 一项：

$$
\frac{d}{dx}F_{X_{(k)}}(x)
=np'\binom{n-1}{k-1}p^{k-1}(1-p)^{n-k}
=\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}[1-F(x)]^{n-k}f(x).
$$

这就是式（12.29）。

第三步给出直接的组合推导，它与上式一致并说明系数来源。事件 $\{x<X_{(k)}\le x+dx\}$ 要求：恰有 $k-1$ 个观测 $\le x$，恰有 $1$ 个观测落入 $(x,x+dx]$，恰有 $n-k$ 个观测 $>x+dx$。三项多项式概率为

$$
\frac{n!}{(k-1)!\,1!\,(n-k)!}F(x)^{k-1}\bigl[f(x)dx+o(dx)\bigr]\bigl[1-F(x)+O(dx)\bigr]^{n-k}.
$$

除以 $dx$ 并令 $dx\to0$ 即得式（12.29）。这一推导严格化需要对 $F$ 在 $x$ 处可微并使用夹逼，结论与第二步的解析求导相同；第二步不依赖任何近似，是完整证明。

□

式（12.29）的结构可以概括为“左边 $k-1$ 个、当前位置一个、右边 $n-k$ 个”，系数是把 $n$ 个可区分的观测分配到这三个组的方式数。端点情形立即化简：$k=n$ 时得 $f_{X_{(n)}}=nF^{n-1}f$，$k=1$ 时得 $f_{X_{(1)}}=n(1-F)^{n-1}f$，与定理 12.22 一致，这是两组公式的自洽性检验。

**命题 12.26（两个次序统计量的联合密度与极差）**

设 $1\le j<k\le n$，则

$$
f_{X_{(j)},X_{(k)}}(u,v)
=\frac{n!}{(j-1)!\,(k-j-1)!\,(n-k)!}
F(u)^{j-1}\bigl[F(v)-F(u)\bigr]^{k-j-1}\bigl[1-F(v)\bigr]^{n-k}
f(u)f(v)\cdot\mathbf 1_{\{u<v\}}.
\tag{12.30}
$$

极差 $R=X_{(n)}-X_{(1)}$ 的密度为

$$
f_R(r)=\int_{-\infty}^{\infty}f_{X_{(1)},X_{(n)}}(u,u+r)\,du
=n(n-1)\int_{-\infty}^{\infty}\bigl[F(u+r)-F(u)\bigr]^{n-2}f(u)f(u+r)\,du,
\qquad r>0.
\tag{12.31}
$$

**证明**

式（12.30）由式（12.27）积分掉其余 $n-2$ 个变量得到。在 $u<X_{(j)}$、$X_{(k)}<v$ 的约束下，剩余变量分为三组：$j-1$ 个落在 $(-\infty,u)$，$k-j-1$ 个落在 $(u,v)$，$n-k$ 个落在 $(v,\infty)$。对这三组分别积分，得到 $F(u)^{j-1}$、$[F(v)-F(u)]^{k-j-1}$、$[1-F(v)]^{n-k}$ 三个因子；组合系数来自式（12.27）中的 $n!$ 除以三组内部与两个固定位置的排列数 $(j-1)!(k-j-1)!(n-k)!$。

式（12.31）由式（12.30）取 $j=1$、$k=n$ 得

$$
f_{X_{(1)},X_{(n)}}(u,v)=n(n-1)[F(v)-F(u)]^{n-2}f(u)f(v)\mathbf 1_{\{u<v\}},
$$

再对变换 $R=V-U$、$S=U$ 应用式（12.18）（Jacobian 为 $1$）并对 $s$ 积分。

□

**定理 12.27（均匀分布次序统计量的 Beta 分布）**

设 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$，则

$$
X_{(k)}\sim\operatorname{Beta}(k,\,n-k+1),
\qquad
\mathbb E[X_{(k)}]=\frac k{n+1},
\qquad
\operatorname{Var}\bigl(X_{(k)}\bigr)=\frac{k(n-k+1)}{(n+1)^2(n+2)}.
\tag{12.32}
$$

极差 $R=X_{(n)}-X_{(1)}\sim\operatorname{Beta}(n-1,2)$，$\mathbb E[R]=(n-1)/(n+1)$。

**证明**

此时 $F(x)=x$、$f(x)=1$（$0<x<1$），式（12.29）化为

$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}x^{k-1}(1-x)^{n-k}\mathbf 1_{(0,1)}(x).
$$

由 $B(\alpha,\beta)=\Gamma(\alpha)\Gamma(\beta)/\Gamma(\alpha+\beta)$，取 $\alpha=k$、$\beta=n-k+1$ 得

$$
\frac1{B(k,n-k+1)}=\frac{\Gamma(n+1)}{\Gamma(k)\Gamma(n-k+1)}
=\frac{n!}{(k-1)!(n-k)!},
$$

故密度正是 $\operatorname{Beta}(k,n-k+1)$ 的密度。Beta 分布的均值与方差（第10、11章）为

$$
\mathbb E=\frac\alpha{\alpha+\beta}=\frac k{n+1},
\qquad
\operatorname{Var}=\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}
=\frac{k(n-k+1)}{(n+1)^2(n+2)}.
$$

极差：由式（12.31），$f_R(r)=n(n-1)\int_0^{1-r}r^{n-2}\,du=n(n-1)r^{n-2}(1-r)$（$0<r<1$）。而 $\operatorname{Beta}(n-1,2)$ 的密度为 $\frac1{B(n-1,2)}r^{n-2}(1-r)$，其中 $B(n-1,2)=\frac{(n-2)!\,1!}{n!}=\frac1{n(n-1)}$，两者一致。其均值为 $\frac{n-1}{(n-1)+2}=\frac{n-1}{n+1}$。

□

期望 $k/(n+1)$ 是把 $[0,1]$ 均分为 $n+1$ 段的分点，这正是分位数图（QQ 图）与经验分位数估计中使用“绘图位置”$k/(n+1)$ 的理论依据；另两种常用位置 $(k-1/2)/n$ 与 $k/(n+1)$ 的差别是小样本下的高阶修正。对一般的连续分布，由概率积分变换 $F(X_i)\sim\operatorname{Uniform}(0,1)$ 且 $F$ 单调，得 $F(X_{(k)})$ 服从 $\operatorname{Beta}(k,n-k+1)$，因此

$$
\mathbb E\bigl[F(X_{(k)})\bigr]=\frac k{n+1},
$$

即 $X_{(k)}$ 大致位于总体的 $k/(n+1)$ 分位数处，但一般 $\mathbb E[X_{(k)}]\ne F^{-1}(k/(n+1))$，除非 $F^{-1}$ 是线性的。这个区别在小样本分位数估计中会造成偏差，第19章讨论其修正。

**样本中位数**是次序统计量的一个特殊函数。当 $n=2m+1$ 为奇数时，中位数 $M=X_{(m+1)}$，其密度由式（12.29）直接给出：

$$
f_M(x)=\frac{(2m+1)!}{(m!)^2}\bigl[F(x)(1-F(x))\bigr]^{m}f(x).
$$

当 $n=2m$ 为偶数时，$M=\frac12\bigl(X_{(m)}+X_{(m+1)}\bigr)$ 是两个次序统计量的线性组合，一般没有单变量闭式密度。做法是先在式（12.30）中取 $j=m$、$k=m+1$，此时 $k-j-1=0$、$n-k=m-1$，得

$$
f_{X_{(m)},X_{(m+1)}}(u,v)
=\frac{(2m)!}{\bigl[(m-1)!\bigr]^2}
F(u)^{m-1}\bigl[1-F(v)\bigr]^{m-1}f(u)f(v)\cdot\mathbf 1_{\{u<v\}},
$$

再作变换 $s=(u+v)/2$、$d=v-u$，其反映射为 $u=s-d/2$、$v=s+d/2$，Jacobian 行列式为

$$
\det\begin{pmatrix}1&-1/2\\[2pt]1&1/2\end{pmatrix}=1,
$$

最后对 $d\in(0,\infty)$ 积分：

$$
f_M(s)=\frac{(2m)!}{\bigl[(m-1)!\bigr]^2}\int_0^{\infty}
F\!\left(s-\tfrac d2\right)^{m-1}
\left[1-F\!\left(s+\tfrac d2\right)\right]^{m-1}
f\!\left(s-\tfrac d2\right)f\!\left(s+\tfrac d2\right)dd.
$$

对均匀总体这一积分可显式算出；对一般总体通常采用数值积分或重采样方法，第23章的 bootstrap 提供了另一条路径。若总体分布关于其中位数对称，则 $M$ 的分布也关于该点对称，$\mathbb E[M]$ 等于总体中位数（在期望存在时）。

### 12.5.3 指数样本的间距

均匀分布的次序统计量服从 Beta 分布，指数分布的次序统计量则有另一个更精细的结构：相邻次序统计量之差（间距）相互独立。

**定理 12.28（指数次序统计量的间距独立性）**

设 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$，令 $D_1=X_{(1)}$，$D_j=X_{(j)}-X_{(j-1)}$（$j=2,\ldots,n$）。则 $D_1,\ldots,D_n$ 相互独立，且

$$
D_j\sim\operatorname{Exp}\bigl((n-j+1)\lambda\bigr).
\tag{12.33}
$$

**证明**

由式（12.27），次序统计量的联合密度在单纯形 $\{0<x_1<\cdots<x_n\}$ 上为

$$
n!\prod_{i=1}^n\lambda e^{-\lambda x_i}
=n!\lambda^n\exp\left(-\lambda\sum_{i=1}^nx_i\right).
$$

作变换 $x_j=d_1+\cdots+d_j$，即 $d_1=x_1$、$d_j=x_j-x_{j-1}$。其 Jacobian 矩阵 $\partial x_i/\partial d_j$ 是下三角矩阵且对角元全为 $1$，行列式为 $1$；变换把单纯形一一映为正象限 $\{d_j>0\}$。关键的和式为

$$
\sum_{j=1}^nx_j=\sum_{j=1}^n\sum_{i=1}^jd_i=\sum_{i=1}^n(n-i+1)d_i,
$$

因为 $d_i$ 出现在 $x_i,x_{i+1},\ldots,x_n$ 共 $n-i+1$ 个和中。故

$$
f_{D_1,\ldots,D_n}(d_1,\ldots,d_n)
=n!\lambda^n\exp\left(-\lambda\sum_{i=1}^n(n-i+1)d_i\right)
=\prod_{i=1}^n\bigl[(n-i+1)\lambda\bigr]e^{-(n-i+1)\lambda d_i},
$$

最后一步用到 $\prod_{i=1}^n(n-i+1)=n!$，故 $n!\lambda^n=\prod_i(n-i+1)\lambda$。右端是 $n$ 个指数密度的乘积，支持集为正象限这一乘积形式，由定理 12.7 得独立性与式（12.33）。

□

由此可立即计算任意次序统计量的矩：

$$
\mathbb E[X_{(k)}]=\sum_{j=1}^k\mathbb E[D_j]
=\frac1\lambda\sum_{j=1}^k\frac1{n-j+1},
\qquad
\operatorname{Var}(X_{(k)})=\frac1{\lambda^2}\sum_{j=1}^k\frac1{(n-j+1)^2}.
$$

方差是可加的，因为间距独立。$k=n$ 时 $\mathbb E[X_{(n)}]=\frac1\lambda\sum_{j=1}^n\frac1j\approx\frac{\log n+\gamma}\lambda$，即指数样本的最大值按 $\log n$ 增长，而不是按 $n$ 增长；这是极值理论中对数增长率的第一个具体例子。间距的期望 $\mathbb E[D_j]=1/[(n-j+1)\lambda]$ 随 $j$ 增大而增大，说明指数样本的次序统计量在上部越来越稀疏，这与指数分布的重尾（相对于均匀分布）一致。

间距独立性也是 Poisson 过程到达间隔的理论基础：速率为 $\lambda$ 的 Poisson 过程的前 $n$ 个到达时刻，其分布与 $n$ 个独立 $\operatorname{Exp}(\lambda)$ 变量的次序统计量相同，第24章将据此建立到达时刻的联合分布。

**例 12.9（均匀样本的最大值、中位数与极差）**

设 $X_1,\ldots,X_5\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$。求 $X_{(5)}$、中位数 $X_{(3)}$、极差 $R$ 的分布与矩，并求 $\mathbb P(X_{(1)}>0.2)$。

**解**

$n=5$，$k=5$：由式（12.32），$X_{(5)}\sim\operatorname{Beta}(5,1)$，密度为 $5x^4$（$0<x<1$），

$$
\mathbb E[X_{(5)}]=\frac5{6}\approx0.8333,
\qquad
\operatorname{Var}(X_{(5)})=\frac{5\cdot1}{36\cdot7}=\frac5{252}\approx0.01984.
$$

$k=3$：$X_{(3)}\sim\operatorname{Beta}(3,3)$，密度为 $\frac{5!}{2!\,2!}x^2(1-x)^2=30x^2(1-x)^2$，

$$
\mathbb E[X_{(3)}]=\frac36=\frac12,
\qquad
\operatorname{Var}(X_{(3)})=\frac{3\cdot3}{36\cdot7}=\frac1{36}\approx0.02778.
$$

中位数无偏地估计总体中位数 $1/2$，但方差比最大值的方差略大，这是因为中位数两侧都有 $2$ 个观测可变动，而最大值只受左侧约束。

极差：$R\sim\operatorname{Beta}(4,2)$，密度为 $20r^3(1-r)$（$0<r<1$），

$$
\mathbb E[R]=\frac4{6}=\frac23,
\qquad
\operatorname{Var}(R)=\frac{4\cdot2}{36\cdot7}=\frac2{63}\approx0.03175.
$$

验证一致性：$\mathbb E[R]=\mathbb E[X_{(5)}]-\mathbb E[X_{(1)}]=\frac56-\frac16=\frac23$，其中 $X_{(1)}\sim\operatorname{Beta}(1,5)$，$\mathbb E[X_{(1)}]=1/6$。

最后，事件 $\{X_{(1)}>0.2\}$ 等价于所有 $5$ 个观测都大于 $0.2$，故

$$
\mathbb P(X_{(1)}>0.2)=\mathbb P(X_1>0.2)^5=0.8^5=0.32768.
$$

这比用式（12.25）的密度积分 $f_{X_{(1)}}(x)=5(1-x)^4$ 更快：$\int_{0.2}^15(1-x)^4dx=[-(1-x)^5]_{0.2}^1=0.8^5$，两条路径一致。

**例 12.10（指数次序统计量的期望与方差）**

设 $X_1,\ldots,X_5\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(1)$。用定理 12.28 求 $\mathbb E[X_{(3)}]$ 与 $\operatorname{Var}(X_{(3)})$，并与均匀样本的结果作比较。

**解**

$n=5$，$\lambda=1$。间距为

$$
D_1\sim\operatorname{Exp}(5),\;
D_2\sim\operatorname{Exp}(4),\;
D_3\sim\operatorname{Exp}(3),\;
D_4\sim\operatorname{Exp}(2),\;
D_5\sim\operatorname{Exp}(1),
$$

且相互独立。于是

$$
\mathbb E[X_{(3)}]=\mathbb E[D_1+D_2+D_3]=\frac15+\frac14+\frac13
=\frac{12+15+20}{60}=\frac{47}{60}\approx0.7833,
$$

$$
\operatorname{Var}(X_{(3)})=\frac1{25}+\frac1{16}+\frac19
=\frac{144+225+400}{3600}=\frac{769}{3600}\approx0.2136.
$$

同理

$$
\mathbb E[X_{(5)}]=\frac15+\frac14+\frac13+\frac12+1=\frac{137}{60}\approx2.2833,
$$

$$
\operatorname{Var}(X_{(5)})=\frac1{25}+\frac1{16}+\frac19+\frac14+1\approx1.4636.
$$

与例 12.9 的均匀样本比较：均匀中位数方差为 $0.0278$，指数中位数方差为 $0.2136$，相差近 $8$ 倍；均匀最大值方差为 $0.0198$，指数最大值方差为 $1.4636$，相差约 $74$ 倍。原因有二。其一，指数分布无右端点，最大值可以任意大，次序统计量整体被拉伸；其二，指数密度在 $0$ 附近最大并向右递减，导致低阶次序统计量高度集中而高阶次序统计量高度分散。这解释了为什么用有限样本的最大损失估计尾部风险时，重尾或无界分布下的不确定性远大于有界分布下的不确定性。

## 12.6 条件分布

第9章在 $\mathbb P(B)>0$ 的前提下定义了条件概率 $\mathbb P(A\mid B)=\mathbb P(A\cap B)/\mathbb P(B)$。对绝对连续随机向量，事件 $\{Y=y\}$ 的概率恒为零，这个定义不能直接使用。解决方式是把条件分布定义为“给定 $Y$ 的取值在 $y$ 附近无穷小区间内”时 $X$ 分布的极限，其结果就是联合密度除以边缘密度。

### 12.6.1 条件密度的定义

**定义 12.29（条件分布与条件密度）**

设 $(X,Y)$ 具有联合密度 $f_{X,Y}$，$Y$ 的边缘密度为 $f_Y$。对满足 $f_Y(y)>0$ 的 $y$，定义 $X$ 在 $Y=y$ 下的**条件密度**

$$
f_{X\mid Y}(x\mid y)=\frac{f_{X,Y}(x,y)}{f_Y(y)},
\qquad x\in\mathbb R,
\tag{12.34}
$$

以及**条件分布函数**

$$
F_{X\mid Y}(x\mid y)=\int_{-\infty}^{x}f_{X\mid Y}(u\mid y)\,du
=\frac{\int_{-\infty}^{x}f_{X,Y}(u,y)\,du}{f_Y(y)}.
$$

若 $X$ 离散、$Y$ 连续，则条件质量函数为 $p_{X\mid Y}(x\mid y)=f_{X,Y}(x,y)/f_Y(y)$；若两者均离散，则为 $p_{X\mid Y}(x\mid y)=p_{X,Y}(x,y)/p_Y(y)$，此时它就是第9章的条件概率。

式（12.34）的合理性来自极限过程。设 $Y$ 落入长度 $h$ 的小区间，则对任意 Borel 集 $A$，

$$
\mathbb P\bigl(X\in A\mid y<Y\le y+h\bigr)
=\frac{\int_A\int_y^{y+h}f_{X,Y}(u,v)\,dv\,du}{\int_y^{y+h}f_Y(v)\,dv}
\longrightarrow\frac{\int_A f_{X,Y}(u,y)\,du}{f_Y(y)}
=\int_Af_{X\mid Y}(u\mid y)\,du,
$$

其中极限用到积分中值定理与 $f_{X,Y}(\cdot,y)$、$f_Y$ 在 $y$ 处的连续性。因此条件密度确实是“给定 $Y$ 约为 $y$”这一渐近意义的条件分布的密度。

必须强调两点。第一，式（12.34）只在 $f_Y(y)>0$ 时有定义，而 $f_{X\mid Y}(x\mid y)$ 作为 $y$ 的函数只在 $f_Y$-几乎必然的意义下确定：在 $f_Y$ 的零测集上可以任意修改而不影响任何概率计算。因此“给定 $Y=y$ 的条件概率”是一个版本依赖的对象，不同版本在零测集上可以不同。第二，条件化所依据的 $\sigma$-代数或变量的表示方式会影响结果。经典的 Borel–Kolmogorov 悖论指出：在球面上取均匀分布，先固定经度再求纬度的条件分布，与先固定某个由经纬度构造的其他统计量再求条件分布，可能给出不同的答案，尽管两种“固定”看似描述同一几何约束。在严谨的框架中，条件分布由正则条件分布（regular conditional distribution）定义，条件期望由投影定义，这两件事在第13章与测度论框架中处理；本章使用的密度比值是在绝对连续、边缘密度为正这一常规条件下的正确计算工具。

**命题 12.30（条件密度的规范性、全概率公式与 Bayes 公式）**

在定义 12.29 的设定下：

1. 对每个满足 $f_Y(y)>0$ 的 $y$，$x\mapsto f_{X\mid Y}(x\mid y)$ 是一个概率密度；
2. 全概率公式（密度的边缘化）：

$$
f_X(x)=\int_{-\infty}^{\infty}f_{X\mid Y}(x\mid y)f_Y(y)\,dy;
\tag{12.35}
$$

3. Bayes 公式（密度形式）：若 $f_X(x)>0$，则

$$
f_{Y\mid X}(y\mid x)=\frac{f_{X\mid Y}(x\mid y)f_Y(y)}{f_X(x)}
=\frac{f_{X,Y}(x,y)}{f_X(x)};
$$

4. $X$ 与 $Y$ 独立当且仅当对 $f_Y$-几乎必然的 $y$ 与几乎必然的 $x$，$f_{X\mid Y}(x\mid y)=f_X(x)$。

**证明**

第一条：$f_{X\mid Y}(\cdot\mid y)\ge0$，且

$$
\int_{-\infty}^{\infty}f_{X\mid Y}(x\mid y)\,dx
=\frac1{f_Y(y)}\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx
=\frac{f_Y(y)}{f_Y(y)}=1.
$$

第二条：把式（12.34）代入右端，$f_Y(y)$ 约去，剩下 $\int f_{X,Y}(x,y)dy=f_X(x)$，即式（12.6）。

第三条：两个比值都等于 $f_{X,Y}(x,y)$ 除以相应的边缘密度，直接化简即得。

第四条：若独立，则式（12.8）给出 $f_{X,Y}=f_Xf_Y$ 几乎必然，代入式（12.34）得 $f_{X\mid Y}(x\mid y)=f_X(x)$。反之若条件密度等于边缘密度，则 $f_{X,Y}(x,y)=f_X(x)f_Y(y)$，由定理 12.7 得独立。

□

式（12.35）与式（12.34）合起来说明：联合密度可以完全分解为“先验的边缘密度”与“给定后的条件密度”之积，这正是 Bayesian 建模的基本结构。第22章将把 $f_Y$ 解释为参数的先验、$f_{X\mid Y}$ 解释为似然、$f_{Y\mid X}$ 解释为后验；第9章的离散 Bayes 公式是它在有限情形下的特例。

**例 12.11（条件密度、条件期望与全概率公式的一致性）**

设 $(X,Y)$ 的联合密度为 $f_{X,Y}(x,y)=x+y$，$(x,y)\in[0,1]^2$。求边缘密度、条件密度 $f_{Y\mid X}(y\mid x)$、条件期望 $\mathbb E[Y\mid X=x]$，并验证 $\mathbb E\bigl[\mathbb E[Y\mid X]\bigr]=\mathbb E[Y]$。

**解**

先验证归一化：$\int_0^1\int_0^1(x+y)\,dy\,dx=\int_0^1(x+\frac12)dx=\frac12+\frac12=1$。

边缘密度为

$$
f_X(x)=\int_0^1(x+y)\,dy=x+\frac12,\qquad
f_Y(y)=y+\frac12,\qquad 0<x,y<1.
$$

$X$ 与 $Y$ 不独立：$f_X(x)f_Y(y)=(x+\frac12)(y+\frac12)=xy+\frac x2+\frac y2+\frac14\ne x+y$。

条件密度：对 $x\in(0,1)$，

$$
f_{Y\mid X}(y\mid x)=\frac{x+y}{x+\frac12},\qquad 0<y<1.
$$

检查归一化：$\int_0^1\frac{x+y}{x+1/2}dy=\frac{x+1/2}{x+1/2}=1$。

条件期望：

$$
\mathbb E[Y\mid X=x]=\int_0^1y\,\frac{x+y}{x+\frac12}\,dy
=\frac{\frac x2+\frac13}{x+\frac12}.
$$

把 $x$ 换成随机变量 $X$，得到随机变量 $\mathbb E[Y\mid X]=\frac{X/2+1/3}{X+1/2}$。其期望为

$$
\mathbb E\bigl[\mathbb E[Y\mid X]\bigr]
=\int_0^1\frac{\frac x2+\frac13}{x+\frac12}\left(x+\frac12\right)dx
=\int_0^1\left(\frac x2+\frac13\right)dx
=\frac14+\frac13=\frac7{12}.
$$

另一方面直接由边缘密度计算：

$$
\mathbb E[Y]=\int_0^1y\left(y+\frac12\right)dy=\frac13+\frac14=\frac7{12},
$$

两者一致。这正是全期望公式 $\mathbb E\bigl[\mathbb E[Y\mid X]\bigr]=\mathbb E[Y]$ 的具体验证，第13章将把它作为条件期望投影性质的直接推论证明。

再计算条件方差。条件二阶矩为

$$
\mathbb E[Y^2\mid X=x]=\int_0^1y^2\frac{x+y}{x+\frac12}dy
=\frac{\frac x3+\frac14}{x+\frac12},
$$

故

$$
\operatorname{Var}(Y\mid X=x)=\frac{\frac x3+\frac14}{x+\frac12}
-\left(\frac{\frac x2+\frac13}{x+\frac12}\right)^2.
$$

在 $x=\frac12$ 处，$\mathbb E[Y\mid X=\frac12]=\frac{1/4+1/3}{1}=\frac7{12}\approx0.5833$，$\mathbb E[Y^2\mid X=\frac12]=\frac{1/6+1/4}{1}=\frac5{12}\approx0.4167$，$\operatorname{Var}(Y\mid X=\frac12)=\frac5{12}-\frac{49}{144}=\frac{11}{144}\approx0.0764$。条件概率

$$
\mathbb P\left(Y>\frac12\;\Big|\;X=\frac12\right)
=\int_{1/2}^1\left(\frac12+y\right)dy
=\left[\frac y2+\frac{y^2}2\right]_{1/2}^1=1-\frac38=\frac58.
$$

最后，本例的协方差为

$$
\mathbb E[XY]=\int_0^1\int_0^1xy(x+y)\,dy\,dx
=\int_0^1\int_0^1(x^2y+xy^2)\,dy\,dx
=\frac13\cdot\frac12+\frac12\cdot\frac13=\frac13,
$$

$$
\operatorname{Cov}(X,Y)=\frac13-\left(\frac7{12}\right)^2=\frac13-\frac{49}{144}=-\frac1{144},
$$

$$
\operatorname{Var}(X)=\int_0^1x^2\left(x+\frac12\right)dx-\frac{49}{144}
=\frac14+\frac16-\frac{49}{144}=\frac5{12}-\frac{49}{144}=\frac{11}{144},
$$

由对称性 $\operatorname{Var}(Y)=\frac{11}{144}$，故 $\rho_{X,Y}=-\frac1{11}\approx-0.0909$。相关性很弱，但独立性完全不成立：这说明小的相关系数不能当作“近似独立”的依据，依赖结构可能集中在协方差无法捕捉的非线性部分。

### 12.6.2 与第13章条件期望的衔接

条件密度提供了“给定 $Y=y$”这一具体数值下的全部分布信息，但统计与金融中真正需要的量往往是把 $y$ 视为随机时的整体结构。定义

$$
g(y)=\mathbb E[X\mid Y=y]=\int_{-\infty}^{\infty}x\,f_{X\mid Y}(x\mid y)\,dx,
\qquad
\mathbb E[X\mid Y]=g(Y).
\tag{12.36}
$$

式（12.36）中前者是一个关于 $y$ 的普通函数（一个数），后者是把 $Y$ 代入得到的随机变量。这一区分是第13章的出发点：$\mathbb E[X\mid Y]$ 被刻画为 $X$ 在由 $Y$ 生成的 $\sigma$-代数上的正交投影，投影空间是所有 $Y$ 的可测函数构成的 $L^2$ 子空间，其几何性质来自第5章。基于这一结构将得到：

- **全期望公式** $\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=\mathbb E[X]$，例 12.11 已作数值验证；
- **全方差公式** $\operatorname{Var}(X)=\mathbb E\bigl[\operatorname{Var}(X\mid Y)\bigr]+\operatorname{Var}\bigl(\mathbb E[X\mid Y]\bigr)$；
- **条件协方差分解** $\operatorname{Cov}(X_1,X_2)=\mathbb E\bigl[\operatorname{Cov}(X_1,X_2\mid Y)\bigr]+\operatorname{Cov}\bigl(\mathbb E[X_1\mid Y],\mathbb E[X_2\mid Y]\bigr)$；
- **条件独立性**：若给定 $Y$ 后 $X_1$ 与 $X_2$ 条件独立，则 $\operatorname{Cov}(X_1,X_2\mid Y)=0$，但 $\operatorname{Cov}(X_1,X_2)$ 一般非零，其全部来源是第二项。

最后一条对因子模型至关重要：给定因子取值后，资产残差条件独立，因此资产收益之间的相关性完全由因子驱动。第31章的因子模型与第28章的状态空间模型都建立在条件协方差分解之上。本章的贡献是把“给定 $Y=y$”的分布对象严格化；第13章则处理“给定 $\sigma$-代数”的一般理论与最优预测问题。

**定理 12.31（二元正态的条件分布）**

设 $(X,Y)$ 服从二元正态分布，参数为 $\mu_X,\mu_Y,\sigma_X>0,\sigma_Y>0,\rho\in(-1,1)$。则对每个 $y$，条件分布 $X\mid Y=y$ 是正态分布，且

$$
\mathbb E[X\mid Y=y]=\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y),
\qquad
\operatorname{Var}(X\mid Y=y)=\sigma_X^2(1-\rho^2).
\tag{12.37}
$$

条件方差与 $y$ 无关。

**证明**

记 $u=(x-\mu_X)/\sigma_X$、$v=(y-\mu_Y)/\sigma_Y$。二元正态密度的指数部分为

$$
-\frac1{2(1-\rho^2)}\bigl[u^2-2\rho uv+v^2\bigr].
$$

配方：$u^2-2\rho uv+v^2=(u-\rho v)^2+(1-\rho^2)v^2$，因为展开右端得 $u^2-2\rho uv+\rho^2v^2+v^2-\rho^2v^2$。于是联合密度可写成

$$
f_{X,Y}(x,y)
=\frac1{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}
\exp\left[-\frac{v^2}2\right]
\exp\left[-\frac{(u-\rho v)^2}{2(1-\rho^2)}\right].
$$

而 $Y$ 的边缘密度为 $f_Y(y)=\frac1{\sigma_Y\sqrt{2\pi}}e^{-v^2/2}$。相除得

$$
f_{X\mid Y}(x\mid y)
=\frac1{\sqrt{2\pi}\,\sigma_X\sqrt{1-\rho^2}}
\exp\left[-\frac{(u-\rho v)^2}{2(1-\rho^2)}\right].
$$

把 $u$、$v$ 换回 $x$、$y$，指数为

$$
-\frac{\left[\dfrac{x-\mu_X}{\sigma_X}-\rho\dfrac{y-\mu_Y}{\sigma_Y}\right]^2}{2(1-\rho^2)}
=-\frac{\left[x-\mu_X-\rho\dfrac{\sigma_X}{\sigma_Y}(y-\mu_Y)\right]^2}{2\sigma_X^2(1-\rho^2)},
$$

这正是均值为 $\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y)$、方差为 $\sigma_X^2(1-\rho^2)$ 的正态密度。

□

定理 12.31 有两个重要解读。第一，条件期望是 $y$ 的**线性**函数，斜率为 $\rho\sigma_X/\sigma_Y=\operatorname{Cov}(X,Y)/\operatorname{Var}(Y)$，正是第5章最小二乘回归的斜率；也就是说，在联合正态下最优预测（均方误差最小的 $Y$ 的函数）恰为线性预测，非线性的余地为零。第二，条件方差 $\sigma_X^2(1-\rho^2)$ 恒小于无条件方差 $\sigma_X^2$，减少的比例为 $\rho^2$，这正是回归中 $R^2$ 的含义：第21章的决定系数就是相关系数的平方，其根源在此。

$|\rho|\to1$ 时条件方差趋于零，$X$ 由 $Y$ 几乎确定；$\rho=0$ 时条件分布等于无条件分布，与定理 12.17 的独立性结论一致。多元情形的推广见下节与第13章：若 $(\boldsymbol X_1,\boldsymbol X_2)$ 联合正态，则

$$
\boldsymbol X_1\mid\boldsymbol X_2=\boldsymbol x_2
\sim N\Bigl(\boldsymbol\mu_1+\boldsymbol\Sigma_{12}\boldsymbol\Sigma_{22}^{-1}(\boldsymbol x_2-\boldsymbol\mu_2),\;
\boldsymbol\Sigma_{11}-\boldsymbol\Sigma_{12}\boldsymbol\Sigma_{22}^{-1}\boldsymbol\Sigma_{21}\Bigr),
$$

其中 $\boldsymbol\Sigma_{22}$ 需可逆。矩阵 $\boldsymbol\Sigma_{11}-\boldsymbol\Sigma_{12}\boldsymbol\Sigma_{22}^{-1}\boldsymbol\Sigma_{21}$ 称为 $\boldsymbol\Sigma_{11}$ 关于 $\boldsymbol\Sigma_{22}$ 的 Schur 补，它半正定（第7章），这与条件协方差矩阵必须半正定相一致；Kalman 滤波（第29章）的更新方程正是这一公式的递推应用。

**例 12.12（因子结构下的条件收益与条件在险价值）**

某资产的年化收益 $R$ 由市场因子 $M$ 与特质冲击 $\varepsilon$ 生成：

$$
R=\alpha+\beta M+\varepsilon,
\qquad
M\sim N(0,0.18^2),\quad \varepsilon\sim N(0,0.15^2),
$$

$\alpha=0.02$、$\beta=1.2$，且 $M$ 与 $\varepsilon$ 独立。求 $R$ 的无条件分布、$R$ 与 $M$ 的相关系数、条件分布 $R\mid M=-0.30$，并比较无条件与条件下的 $1\%$ 在险价值。

**解**

$R$ 是独立正态变量的线性组合，由定理 12.16 服从正态分布：

$$
\mathbb E[R]=\alpha+\beta\mathbb E[M]=0.02,
$$

$$
\operatorname{Var}(R)=\beta^2\operatorname{Var}(M)+\operatorname{Var}(\varepsilon)
=1.44\times0.0324+0.0225=0.046656+0.0225=0.069156,
$$

故 $\sigma_R=\sqrt{0.069156}=0.26297$。

协方差与相关系数由双线性性质（定理 12.9）得

$$
\operatorname{Cov}(R,M)=\beta\operatorname{Var}(M)+\operatorname{Cov}(\varepsilon,M)=1.2\times0.0324+0=0.03888,
$$

$$
\rho_{R,M}=\frac{0.03888}{0.26297\times0.18}=\frac{0.03888}{0.047335}=0.8214.
$$

条件分布：由模型结构直接得

$$
R\mid M=m\;\sim\;N\bigl(\alpha+\beta m,\;\sigma_\varepsilon^2\bigr),
$$

因为给定 $M=m$ 后 $R$ 只剩 $\varepsilon$ 的随机性。用定理 12.31 复核：

$$
\mu_R+\rho\frac{\sigma_R}{\sigma_M}(m-\mu_M)
=0.02+0.8214\times\frac{0.26297}{0.18}m
=0.02+1.2000\,m,
$$

$$
\sigma_R^2(1-\rho^2)=0.069156\times(1-0.6747)=0.069156\times0.3253=0.0225=\sigma_\varepsilon^2,
$$

两条路径完全一致。

取 $m=-0.30$（市场下跌 $30\%$）：

$$
\mathbb E[R\mid M=-0.30]=0.02-0.36=-0.34,
\qquad
\operatorname{sd}(R\mid M=-0.30)=0.15.
$$

$1\%$ 分位数为 $-0.34+0.15\times\Phi^{-1}(0.01)=-0.34-0.15\times2.3263=-0.6889$，故条件在险价值为 $68.9\%$。无条件 $1\%$ 分位数为 $0.02-0.26297\times2.3263=0.02-0.6118=-0.5918$，无条件在险价值为 $59.2\%$。

条件在险价值高出约 $9.7$ 个百分点，其来源可分解为两部分：条件均值下移 $0.36$（因子暴露带来的系统性损失），以及条件标准差从 $0.263$ 降至 $0.15$（因子已实现，不确定性下降）。本例中前者主导。这说明“给定市场大跌”这一信息虽然降低了条件不确定性，却把损失分布整体推向更差的区域，尾部风险反而上升。第32章将据此区分条件在险价值与无条件在险价值，并讨论压力测试的合理性依据。

## 12.7 量化应用：协方差、分散化与极值风险

### 12.7.1 资产收益的协方差矩阵与组合方差

设 $n$ 只资产的收益构成随机向量 $\boldsymbol R=(R_1,\ldots,R_n)^\top$，$\mathbb E[\boldsymbol R]=\boldsymbol\mu$，$\operatorname{Cov}(\boldsymbol R)=\boldsymbol\Sigma$，$\sigma_i=\sqrt{\Sigma_{ii}}$，$\rho_{ij}=\Sigma_{ij}/(\sigma_i\sigma_j)$。给定权重向量 $\boldsymbol w$（分量之和为 $1$，允许负分量表示卖空），组合收益为 $R_p=\boldsymbol w^\top\boldsymbol R$。由定理 12.16 与式（12.12），

$$
\mathbb E[R_p]=\boldsymbol w^\top\boldsymbol\mu,
\qquad
\operatorname{Var}(R_p)=\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w
=\sum_{i=1}^nw_i^2\sigma_i^2+2\sum_{1\le i<j\le n}w_iw_j\rho_{ij}\sigma_i\sigma_j.
\tag{12.38}
$$

式（12.38）是 Markowitz 均值—方差分析的全部数学基础：期望是线性的，方差是二次型，因此有效前沿的计算归结为带线性约束的二次规划（第15、16章）。协方差矩阵的半正定性（定理 12.13）保证这个二次规划的目标函数是凸的，从而最优解存在且可计算。

估计层面，用 $T$ 期观测 $\boldsymbol r_1,\ldots,\boldsymbol r_T$ 得到样本协方差矩阵

$$
\hat{\boldsymbol\Sigma}=\frac1{T-1}\sum_{t=1}^T(\boldsymbol r_t-\bar{\boldsymbol r})(\boldsymbol r_t-\bar{\boldsymbol r})^\top.
$$

它自动半正定：对任意 $\boldsymbol a$，

$$
\boldsymbol a^\top\hat{\boldsymbol\Sigma}\boldsymbol a
=\frac1{T-1}\sum_{t=1}^T\bigl[\boldsymbol a^\top(\boldsymbol r_t-\bar{\boldsymbol r})\bigr]^2\ge0,
$$

与式（12.15）的证明结构相同，只是把期望换成样本平均。但若用成对相关（不同资产对使用不同的重叠时段）拼凑矩阵，半正定性可能被破坏，必须修正。更根本的问题是维数：$\boldsymbol\Sigma$ 有 $n(n+1)/2$ 个自由参数，而数据只有 $Tn$ 个观测值。当 $n$ 与 $T$ 同量级时，$\hat{\boldsymbol\Sigma}$ 的秩至多为 $T-1$，若 $n>T-1$ 则奇异，由命题 12.14 存在非零权重使样本方差恰为零——这是纯粹的过拟合，不是真实的无风险组合。收缩估计、因子结构约束与随机矩阵理论对此的处理见第21章与第32章。

两个尺度问题需要澄清。其一，协方差矩阵依赖于收益的计量口径：对数收益可加，简单收益可乘，二者的协方差在小收益下近似相等但不严格相同。其二，若各期收益独立同分布，则 $h$ 期累计收益的协方差矩阵为 $h\boldsymbol\Sigma$，方差与协方差同比例放大，相关系数不变：

$$
\rho_{ij}^{(h)}=\frac{h\Sigma_{ij}}{\sqrt{h\Sigma_{ii}}\sqrt{h\Sigma_{jj}}}=\rho_{ij}.
$$

这一“相关系数不随期限变化、方差按 $\sqrt h$ 缩放”的规则只在独立性假设下成立；波动率聚集与序列相关会破坏它，第28、30章讨论其修正。

### 12.7.2 相关性与分散化

分散化的效果完全由协方差的交叉项决定。考虑等权组合 $w_i=1/n$，由式（12.38），

$$
\operatorname{Var}(R_p^{\mathrm{EW}})
=\frac1{n^2}\sum_{i=1}^n\sigma_i^2+\frac1{n^2}\sum_{i\ne j}\operatorname{Cov}(R_i,R_j)
=\frac1n\bar\sigma^2+\left(1-\frac1n\right)\bar C,
\tag{12.39}
$$

其中 $\bar\sigma^2=\frac1n\sum_i\sigma_i^2$ 是平均方差，$\bar C=\frac1{n(n-1)}\sum_{i\ne j}\operatorname{Cov}(R_i,R_j)$ 是平均协方差。若所有资产的波动率相同（$\sigma_i=\sigma$）且平均相关系数为 $\bar\rho$，则 $\bar C=\bar\rho\sigma^2$，于是

$$
\operatorname{Var}(R_p^{\mathrm{EW}})
=\frac{\sigma^2}n+\left(1-\frac1n\right)\bar\rho\sigma^2
\;\xrightarrow[n\to\infty]{}\;\bar\rho\sigma^2.
$$

式（12.39）给出了分散化理论的精确表述：第一项是特质风险，按 $1/n$ 的速度消失；第二项是共同风险，不随 $n$ 增大而减小，其极限由平均协方差决定。因此“持有足够多的资产就能消除风险”只在平均相关系数为零时成立。若 $\bar\rho=0.3$，无论持有多少资产，组合波动率都不可能低于 $\sqrt{0.3}\,\sigma\approx0.548\sigma$，即只能消除约 $45\%$ 的波动。

**例 12.13（等权组合的分散化速度）**

设所有资产的年化波动率均为 $\sigma=0.25$，两两相关系数均为 $\bar\rho=0.30$。计算等权组合在 $n=1,10,50,200$ 时的波动率，并与极限比较；再讨论 $\bar\rho=0.05$ 的情形。

**解**

$\sigma^2=0.0625$，$\bar C=0.30\times0.0625=0.01875$。由式（12.39）：

| $n$ | 方差 | 波动率 |
|---|---|---|
| $1$ | $0.06250$ | $0.2500$ |
| $10$ | $0.00625+0.016875=0.023125$ | $0.1521$ |
| $50$ | $0.00125+0.018375=0.019625$ | $0.1401$ |
| $200$ | $0.0003125+0.018656=0.018969$ | $0.1377$ |
| $\infty$ | $0.018750$ | $0.1369$ |

从 $1$ 只到 $10$ 只，波动率下降 $39\%$；从 $10$ 只到 $50$ 只只再下降 $8\%$；$50$ 只以后收益已极其有限。极限波动率 $0.1369$ 是单资产波动率的 $55\%$，构成分散化不可逾越的下界。

若 $\bar\rho=0.05$，则 $\bar C=0.003125$，极限波动率为 $\sqrt{0.003125}=0.0559$，即单资产波动率的 $22\%$。相同资产数量下分散化效果显著更好，这说明资产池的平均相关水平比资产数量更重要。

实务上有两点补充。第一，样本相关矩阵的平均相关在不同资产类别之间差别很大：同一行业股票之间常在 $0.5$ 以上，跨行业约 $0.3$，股债之间可能为负。因此“分散化”必须是跨低相关资产的分散，单纯增加同类资产数量收益迅速耗尽。第二，相关系数不是常数。危机时期资产收益的相关性普遍上升，平均相关从平时的 $0.3$ 升至 $0.7$ 并非罕见，这意味着分散化恰在最需要它的时刻失效。用无条件相关系数评估组合风险会系统性低估尾部损失；对此的一个处理方式是用 Copula 刻画尾部相关，见 12.7.4 节，另一个是用条件相关模型，见第30章。

### 12.7.3 极值、次序统计量与在险价值

**在险价值**（value at risk，VaR）是损失分布的分位数。设 $L$ 为某持有期内的损失（正值表示亏损），置信水平为 $\alpha\in(0,1)$，则

$$
\operatorname{VaR}_\alpha(L)=\inf\{l\in\mathbb R:\mathbb P(L\le l)\ge\alpha\}
=F_L^{-1}(\alpha),
\tag{12.40}
$$

即第10章式（10.10）的广义逆。若组合收益为 $R_p$、损失 $L=-R_p$，则 $\operatorname{VaR}_\alpha(L)=-F_{R_p}^{-1}(1-\alpha)$。在 $R_p\sim N(\mu,\sigma^2)$ 的正态近似下，

$$
\operatorname{VaR}_\alpha(L)=\sigma\,z_\alpha-\mu,
\qquad z_\alpha=-\Phi^{-1}(1-\alpha)>0.
$$

历史模拟法不使用参数分布，而是把过去 $T$ 期的实现损失 $L_1,\ldots,L_T$ 视为来自 $F_L$ 的独立同分布样本，用经验分位数估计式（12.40）：

$$
\widehat{\operatorname{VaR}}_\alpha=L_{(k)},
\qquad k=\lceil T\alpha\rceil.
\tag{12.41}
$$

式（12.41）表明历史模拟 VaR 本质上是一个次序统计量，因而其抽样分布由定理 12.25 完全刻画：

$$
\mathbb P\bigl(L_{(k)}\le l\bigr)
=\sum_{j=k}^{T}\binom TjF_L(l)^j\bigl[1-F_L(l)\bigr]^{T-j}.
$$

等价地，令 $N_l=\#\{t:L_t>l\}$，则 $N_l\sim\operatorname{Binomial}(T,1-F_L(l))$，且事件 $\{L_{(k)}\le l\}$ 等于 $\{N_l\le T-k\}$。这一二项表述是 VaR 回测的基础：若模型正确，则超过 VaR 的天数应服从二项分布，Kupiec 检验据此构造（第20章）。

对渐近性质，设 $F_L$ 在真实分位数 $q_\alpha=F_L^{-1}(\alpha)$ 处有连续正密度 $f(q_\alpha)$，则

$$
\sqrt T\bigl(L_{(k)}-q_\alpha\bigr)
\xrightarrow{d}N\left(0,\;\frac{\alpha(1-\alpha)}{f(q_\alpha)^2}\right).
\tag{12.42}
$$

式（12.42）的完整证明需要密度版的中心极限定理与分布函数的均匀收敛，属于第14章的内容；这里给出推导思路：$F_L(L_{(k)})$ 近似服从 $\operatorname{Beta}(k,T-k+1)$（定理 12.27 的一般化，由概率积分变换 $F_L(L_t)\sim\operatorname{Uniform}(0,1)$ 得到），其均值约为 $k/(T+1)\approx\alpha$，方差约为 $\alpha(1-\alpha)/T$；再用 Delta 方法把 $F_L(L_{(k)})$ 的波动换算为 $L_{(k)}$ 的波动，除以导数 $f(q_\alpha)$ 即得式（12.42）。

**例 12.14（历史模拟 VaR 的抽样不确定性）**

某组合日收益标准差为 $\sigma=1.5\%$，近似正态。用 $T=250$ 个交易日做历史模拟，分别评估 $\alpha=0.95$ 与 $\alpha=0.99$ 的 VaR 估计精度。

**解**

$\alpha=0.95$ 时 $k=\lceil250\times0.95\rceil=238$，即取第 $13$ 大的损失（$T-k+1=13$）。正态近似下 $q_{0.95}=1.6449\sigma=1.6449\times0.015=0.02467$，即 $2.47\%$。密度为 $f(q)=\varphi(1.6449)/\sigma=0.10314/0.015=6.876$。由式（12.42），

$$
\operatorname{sd}\bigl(\widehat{\operatorname{VaR}}_{0.95}\bigr)
\approx\frac1{\sqrt T}\frac{\sqrt{\alpha(1-\alpha)}}{f(q_\alpha)}
=\frac1{\sqrt{250}}\frac{\sqrt{0.0475}}{6.876}
=\frac{0.21794}{15.811\times6.876}=0.0020,
$$

即 $20$ 个基点，相对标准误 $0.0020/0.02467=8.1\%$。

$\alpha=0.99$ 时 $k=\lceil247.5\rceil=248$，即第 $3$ 大的损失。$q_{0.99}=2.3263\times0.015=0.03489$，即 $3.49\%$。$\varphi(2.3263)=0.026652$，$f(q)=0.026652/0.015=1.7768$，

$$
\operatorname{sd}\bigl(\widehat{\operatorname{VaR}}_{0.99}\bigr)
\approx\frac1{\sqrt{250}}\frac{\sqrt{0.0099}}{1.7768}
=\frac{0.099499}{15.811\times1.7768}=0.00354,
$$

即 $35$ 个基点，相对标准误 $10.2\%$。

两点结论。第一，即使数据完全来自正态模型，一年数据下的 $99\%$ VaR 估计仍有约 $10\%$ 的相对标准误，置信区间宽达 $\pm70$ 个基点；用单一点估计做资本计量必须附带这一不确定性。第二，$99\%$ 水平上只有约 $2$ 到 $3$ 个观测决定估计值，因此它对单个极端日极其敏感，稳定性远差于 $95\%$ 水平。这正是实践中更倾向于使用期望短缺

$$
\operatorname{ES}_\alpha(L)=\mathbb E\bigl[L\mid L>\operatorname{VaR}_\alpha(L)\bigr]
$$

的原因之一：它是尾部所有观测的平均而非单个次序统计量，抽样波动更小。期望短缺的定义本身就是一个条件期望，其严格处理见第13章，作为风险度量的性质（次可加性、一致性）见第32章。相比之下，VaR 不满足次可加性：存在两个组合使 $\operatorname{VaR}(A+B)>\operatorname{VaR}(A)+\operatorname{VaR}(B)$，这在数学上意味着 VaR 不鼓励分散化。

次序统计量在极值风险中还有第二类用法：不是估计单个分布的分位数，而是刻画“多个头寸中最差的那个”。设 $n$ 个独立头寸的损失为 $L_1,\ldots,L_n$，分布函数 $F_i$，则最差头寸损失 $\max_iL_i$ 的分布由式（12.24）给出：

$$
\mathbb P\Bigl(\max_iL_i\le l\Bigr)=\prod_{i=1}^nF_i(l).
$$

对违约时间建模时，$n$ 个债务人的最早违约时间是 $\min_i\tau_i$；若违约强度为常数 $\lambda_i$，则 $\tau_i\sim\operatorname{Exp}(\lambda_i)$，由式（12.26）得最早违约时间服从 $\operatorname{Exp}(\sum_i\lambda_i)$，且第 $k$ 个债务人首先违约的概率为 $\lambda_k/\sum_i\lambda_i$。这是信用风险结构化模型与 Poisson 过程方法（第24章）的公共基础。需要警惕的是独立性假设：若违约时间正相关，则 $\mathbb P(\max_iL_i\le l)$ 会明显高于独立情形的乘积，用独立假设计算组合极值会低估风险。

### 12.7.4 Copula 与依赖结构的分离建模

给定两个边缘分布 $F$、$G$，满足这两个边缘的联合分布并不唯一。12.4.4 节给出的 Fréchet–Hoeffding 界已经显示，最大值的分布在不同联合分布下可以相差很大。Copula 理论把这一问题结构化：任何联合分布都可以分解为边缘分布与一个描述依赖结构的 Copula 函数。

**定义 12.32（Copula）**

二元 **Copula** 是函数 $C:[0,1]^2\to[0,1]$，满足：

1. $C(u,0)=C(0,v)=0$；
2. $C(u,1)=u$，$C(1,v)=v$；
3. $C$ 二维递增，即对 $u_1\le u_2$、$v_1\le v_2$，

$$
C(u_2,v_2)-C(u_1,v_2)-C(u_2,v_1)+C(u_1,v_1)\ge0.
$$

由第 2、3 条，$C$ 本身就是一个边缘均为 $\operatorname{Uniform}(0,1)$ 的联合分布函数。三个基本例子是：独立 Copula $\Pi(u,v)=uv$；上界（共单调）Copula $M(u,v)=\min(u,v)$；下界（反单调）Copula $W(u,v)=\max(u+v-1,0)$。

**定理 12.33（Sklar 定理）**

设 $H$ 为具有边缘分布函数 $F$、$G$ 的二元联合分布函数。则存在 Copula $C$ 使

$$
H(x,y)=C\bigl(F(x),G(y)\bigr),\qquad (x,y)\in\mathbb R^2.
\tag{12.43}
$$

若 $F$、$G$ 连续，则 $C$ 唯一，且由

$$
C(u,v)=H\bigl(F^{-1}(u),G^{-1}(v)\bigr),\qquad (u,v)\in[0,1]^2
$$

给出。反之，任意 Copula $C$ 与任意两个分布函数 $F$、$G$ 通过式（12.43）确定一个合法的联合分布函数，其边缘恰为 $F$、$G$。

**证明思路**

若 $F$、$G$ 连续且严格递增，则 $F^{-1}$、$G^{-1}$ 是普通反函数，令 $C(u,v)=H(F^{-1}(u),G^{-1}(v))$。此时 $C(u,1)=H(F^{-1}(u),+\infty)=F(F^{-1}(u))=u$，$C(u,0)=0$，且 $C$ 的矩形增量等于 $H$ 在对应矩形上的增量，故非负，$C$ 满足定义 12.32 的三条。式（12.43）由 $F(F^{-1}(u))=u$ 直接验证。

一般情形下 $F$、$G$ 可能有跳跃或平坦段，$F^{-1}$ 需取式（10.10）的广义逆，此时 $F(F^{-1}(u))\ge u$ 而未必相等，$C$ 在 $F$、$G$ 值域的闭包上由上式确定，在值域之外需要延拓；延拓的存在性由 Tietze 延拓定理（连续情形）或更一般的测度论构造给出，且 $C$ 不唯一，但 $C$ 在 $\operatorname{Ran}(F)\times\operatorname{Ran}(G)$ 上的取值唯一。反向构造（由 $C$、$F$、$G$ 得 $H$）只需验证 $H$ 满足定理 12.2 的四条性质，其中矩形增量非负来自 $C$ 的二维递增性。完整证明依赖单调类定理与分布函数的弱收敛理论（第14章），此处不展开。

□

**命题 12.34（Fréchet–Hoeffding 界）**

对任意 Copula $C$ 与任意 $(u,v)\in[0,1]^2$，

$$
W(u,v)=\max(u+v-1,0)\;\le\;C(u,v)\;\le\;\min(u,v)=M(u,v).
\tag{12.44}
$$

上界在任何维数都成立且可达；下界在二维可达，在三维及以上 $W$ 不是 Copula。

**证明**

把 $C$ 视为 $(U,V)$ 的联合分布函数，其边缘均为 $\operatorname{Uniform}(0,1)$。上界：

$$
C(u,v)=\mathbb P(U\le u,V\le v)\le\mathbb P(U\le u)=u,
$$

同理 $C(u,v)\le v$，故 $C(u,v)\le\min(u,v)$。$M$ 本身是 Copula（对应 $U=V$ 的共单调情形），故上界可达。

下界由布尔不等式：

$$
C(u,v)=\mathbb P(U\le u,V\le v)
\ge\mathbb P(U\le u)+\mathbb P(V\le v)-1=u+v-1,
$$

又 $C\ge0$，故 $C(u,v)\ge\max(u+v-1,0)$。取 $U\sim\operatorname{Uniform}(0,1)$、$V=1-U$，则 $\mathbb P(U\le u,V\le v)=\mathbb P(U\le u,U\ge1-v)=\max(u+v-1,0)$，故下界在二维可达。三维时 $W(u_1,u_2,u_3)=\max(u_1+u_2+u_3-2,0)$ 的矩形增量可以为负，因而不是 Copula。

□

命题 12.34 的意义在于：给定边缘分布后，联合分布的自由度被夹在两个极端之间，而相关系数只能刻画其中的线性成分。式（12.44）翻译回原变量，就是 12.4.4 节的最大值分布界。

最常用的参数族是 **Gaussian Copula**：

$$
C_\rho(u,v)=\Phi_\rho\bigl(\Phi^{-1}(u),\Phi^{-1}(v)\bigr),
\tag{12.45}
$$

其中 $\Phi$ 是标准正态分布函数，$\Phi_\rho$ 是相关系数为 $\rho$ 的标准二元正态联合分布函数。若 $X=F^{-1}(U)$、$Y=G^{-1}(V)$ 且 $(U,V)$ 服从 $C_\rho$，则 $(X,Y)$ 的边缘为 $F$、$G$，而其依赖结构由单个参数 $\rho$ 控制。$\rho=0$ 时 $C_0=\Pi$，即独立；$\rho\to1$ 时 $C_\rho\to M$。这一构造在实务中的价值是：可以对任意给定的经验边缘分布（包括重尾、有偏、离散的）叠加一个可控的依赖结构，而不必假设联合正态。

但 Gaussian Copula 有一个致命的定量性质：**尾部相关系数为零**。定义上尾部相关系数

$$
\lambda_U=\lim_{t\uparrow1}\mathbb P\bigl(U>t\mid V>t\bigr),
$$

若极限存在。对式（12.45），当 $\rho<1$ 时 $\lambda_U=0$，意味着“两者同时进入极端上尾”的概率相对于单个极端概率是高阶小量。换成损失语言：Gaussian Copula 认为两个资产同时出现极端亏损的可能性远低于正态边缘下的直觉。相比之下，自由度为 $\nu$ 的 $t$ Copula 具有正的尾部相关

$$
\lambda_U=\lambda_L=2\,t_{\nu+1}\!\left(-\sqrt{\frac{(\nu+1)(1-\rho)}{1+\rho}}\right),
$$

其中 $t_{\nu+1}$ 是自由度 $\nu+1$ 的 $t$ 分布函数；$\nu$ 越小尾部相关越强，$\nu\to\infty$ 时退化为 Gaussian Copula 而 $\lambda_U\to0$（此式的推导超出本章范围，属于多元 $t$ 分布的条件分布计算）。2008 年信用危机中，用 Gaussian Copula 定价担保债务凭证（CDO）的模型系统性低估了多笔次级贷款同时违约的概率，其数学根源正是 $\lambda_U=0$ 这一假设，而不是参数校准的误差。

Copula 框架还澄清了相关系数的局限。Pearson 相关系数 $\rho_{X,Y}$ 依赖边缘分布的形状：对同样的 Copula，改变边缘（例如取对数）会改变 $\rho$。相反，秩相关只依赖 Copula，因为它们在严格单调变换下不变。Kendall $\tau$ 与 Spearman $\rho_S$ 可表示为

$$
\tau=4\iint_{[0,1]^2}C(u,v)\,dC(u,v)-1,
\qquad
\rho_S=12\iint_{[0,1]^2}C(u,v)\,du\,dv-3.
\tag{12.46}
$$

对 Gaussian Copula，$\tau=\frac2\pi\arcsin\rho$，故 $\rho=0.5$ 时 $\tau\approx0.333$：两个度量的数值不同但一一对应。第31章的因子研究中广泛使用 RankIC（Spearman 相关）而非 Pearson 相关，正是因为因子值与收益的关系往往单调而非线性，且收益分布存在极端值；秩相关对单调变换与离群点都更稳健，其理论基础就是式（12.46）所刻画的“只依赖 Copula”。

## 本章小结

本章把概率论的对象从单个随机变量扩展到随机向量。联合分布函数 $F_{X,Y}(x,y)=\mathbb P(X\le x,Y\le y)$ 完整刻画了随机向量的分布，其必要且充分的特征除了单调性与右连续性外，还包括矩形增量非负这一多维特有条件；忽略后者会得到数学上不自洽的“分布”。联合密度通过二重积分给出区域概率，边缘密度通过积分消去其他变量，独立性则由因子分解 $f_{X,Y}=f_Xf_Y$ 几乎必然成立刻画，且必须同时检查支持集是否为乘积形式。

协方差 $\operatorname{Cov}(X,Y)=\mathbb E[XY]-\mathbb E[X]\,\mathbb E[Y]$ 是关于两个变量的双线性型，相关系数是其标准化版本。Cauchy–Schwarz 不等式给出 $|\rho|\le1$，等号当且仅当两变量几乎必然线性相关。因此 $\rho$ 度量的是线性依赖：独立蕴含不相关，反之不成立，$X\sim\operatorname{Uniform}(-1,1)$ 与 $Y=X^2$、单位圆盘上的均匀分布都是标准反例。协方差矩阵对称半正定，因为 $\boldsymbol a^\top\boldsymbol\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^\top\boldsymbol X)\ge0$；奇异性等价于分量间存在确定的线性约束。多元正态由“所有线性组合为正态”定义，从而对线性变换封闭，$\boldsymbol B\boldsymbol X+\boldsymbol b\sim N(\boldsymbol B\boldsymbol\mu+\boldsymbol b,\boldsymbol B\boldsymbol\Sigma\boldsymbol B^\top)$，且在联合正态下不相关与独立等价——但边缘正态不足以推出联合正态。

函数分布的三条主线是雅可比方法、卷积与极值。$n$ 维变换公式 $f_{\boldsymbol Y}(\boldsymbol y)=f_{\boldsymbol X}(\boldsymbol h(\boldsymbol y))|\det\boldsymbol J_{\boldsymbol h}(\boldsymbol y)|$ 由多元变量替换定理导出，要求映射单射且 Jacobian 非零；非单射时分支求和，维数不足时先补辅助变量再边缘化。和的密度是卷积 $f_Z(z)=\int f_X(z-y)f_Y(y)dy$，独立正态与同速率 Gamma 分布对加法封闭；商的密度为 $\int f_X(zw)f_Y(w)|w|dw$，两个独立标准正态之商是 Cauchy 分布；最大值与最小值的分布函数分别是边缘分布函数的乘积与补的乘积之补。

次序统计量把样本按大小重排，是极值与分位数统计的基础。独立同分布连续样本的次序统计量联合密度在单纯形上为 $n!\prod_if(x_i)$，第 $k$ 个次序统计量的密度为 $\frac{n!}{(k-1)!(n-k)!}F^{k-1}(1-F)^{n-k}f$，其系数来自“左 $k-1$ 个、当前位置一个、右 $n-k$ 个”的多项式计数。均匀样本的次序统计量服从 Beta 分布，期望为绘图位置 $k/(n+1)$；指数样本的间距相互独立且服从速率递减的指数分布。极差与样本中位数都由这些密度积分得到。

条件密度 $f_{X\mid Y}(x\mid y)=f_{X,Y}(x,y)/f_Y(y)$ 把“给定零概率事件”的条件分布严格化，满足规范性、全概率公式与 Bayes 公式，并给出第13章条件期望、全方差公式与条件协方差分解的分布基础。二元正态的条件分布仍是正态，条件期望是线性的回归函数，条件方差为 $\sigma_X^2(1-\rho^2)$。

在量化应用中，组合方差是协方差矩阵的二次型，等权组合方差分解为按 $1/n$ 消失的特质风险与不消失的平均协方差，后者决定分散化的下界。历史模拟 VaR 是次序统计量，其抽样分布与渐近方差 $\alpha(1-\alpha)/[Tf(q_\alpha)^2]$ 直接来自次序统计量理论，说明高分位水平下的 VaR 估计既不稳定又对极端观测敏感。Copula 通过 Sklar 定理把边缘分布与依赖结构分离，Fréchet–Hoeffding 界刻画了给定边缘后联合分布的全部自由度；Gaussian Copula 的零尾部相关是其在信用风险中失效的数学根源，而秩相关只依赖 Copula，因而是稳健的依赖度量。

## 习题

1. 设 $(X,Y)$ 的联合密度为 $f_{X,Y}(x,y)=c(x+2y)$，$(x,y)\in[0,1]^2$。求 $c$、两个边缘密度、$\mathbb E[X]$、$\mathbb E[Y]$、$\mathbb E[XY]$、$\operatorname{Cov}(X,Y)$ 与 $\rho_{X,Y}$，并判断 $X$ 与 $Y$ 是否独立。
2. 设 $f_{X,Y}(x,y)=cx\cdot\mathbf 1_{\{0<y<x<1\}}$。求 $c$、边缘密度 $f_X$、$f_Y$、$\mathbb P(X+Y\le1)$，并说明 $X$ 与 $Y$ 为何不可能独立。
3. 证明：若二元函数 $F$ 满足定义域上的矩形增量非负条件（式（12.2）的右端对一切 $a\le b$、$c\le d$ 非负），则 $F$ 关于每个自变量单调不减。再验证 $F(x,y)=\mathbf 1_{\{x+y\ge0\}}$ 关于每个自变量单调不减且右连续、满足 $F(-\infty,y)=F(x,-\infty)=0$ 与 $F(+\infty,+\infty)=1$，但不是任何随机向量的联合分布函数。
4. 设 $(X,Y)$ 的联合质量函数为 $p(0,0)=0.1$、$p(0,1)=0.2$、$p(1,0)=0.2$、$p(1,1)=0.1$、$p(0,2)=0.1$、$p(1,2)=0.3$。求边缘分布、条件分布 $p_{X\mid Y}(\cdot\mid1)$、$\mathbb E[X]$、$\mathbb E[Y]$、$\operatorname{Cov}(X,Y)$、$\rho_{X,Y}$，并检验独立性。
5. 用期望的线性性质证明式（12.12）的第二个等号，并推出 $\operatorname{Var}\bigl(\sum_{i=1}^na_iX_i\bigr)=\sum_{i,j}a_ia_j\operatorname{Cov}(X_i,X_j)$。若 $X,Y,Z$ 两两不相关且方差分别为 $1,4,9$，求 $\operatorname{Var}(X-2Y+3Z)$。
6. 设 $X\sim\operatorname{Uniform}(-1,1)$，$Y=X^2$。求 $\mathbb E[X]$、$\mathbb E[Y]$、$\operatorname{Cov}(X,Y)$，证明 $X$ 与 $Y$ 不独立，并求 $Z=X+Y$ 的分布函数（注意 $Z$ 的取值范围需分段讨论）。
7. 设 $(X,Y)$ 在单位圆盘上均匀分布（例 12.3）。求条件密度 $f_{X\mid Y}(x\mid y)$、条件期望 $\mathbb E[X\mid Y=y]$ 与条件方差 $\operatorname{Var}(X\mid Y=y)$，并由此计算 $\mathbb E[X]$ 与 $\operatorname{Cov}(X,Y)$，与例 12.3 的对称性论证对照。
8. 判断下列矩阵是否为合法的协方差矩阵，说明理由；对合法者求 Cholesky 分解并写出用独立标准正态变量生成对应随机向量的公式：
   $\boldsymbol\Sigma_1=\begin{pmatrix}4&2\\2&3\end{pmatrix}$，
   $\boldsymbol\Sigma_2=\begin{pmatrix}1&2\\2&1\end{pmatrix}$，
   $\boldsymbol\Sigma_3=\begin{pmatrix}1&1&0\\1&1&0\\0&0&2\end{pmatrix}$。
   对 $\boldsymbol\Sigma_3$ 指出使 $\boldsymbol a^\top\boldsymbol X$ 为常数的非零向量 $\boldsymbol a$。
9. 设 $(X_1,X_2)$ 服从二元正态分布，$\mathbb E[X_i]=\mu_i$，$\operatorname{Var}(X_i)=\sigma^2$，相关系数为 $\rho$。令 $U=X_1+X_2$、$V=X_1-X_2$。求 $(U,V)$ 的联合分布、$\operatorname{Cov}(U,V)$，并证明 $U$ 与 $V$ 独立。指出证明中哪一步使用了联合正态假设。
10. 设 $X\sim N(0,1)$，$\varepsilon$ 与 $X$ 独立且等概率取 $\pm1$，$Y=\varepsilon X$。写出 $X+Y$ 的分布（含点质量），证明它不是正态分布，并说明这与定理 12.17 是否矛盾。
11. 设 $X,Y$ 独立且均服从 $\operatorname{Uniform}(0,1)$。令 $U=X+Y$、$V=X-Y$。用定理 12.18 求 $(U,V)$ 的联合密度与支持集，再求 $U$、$V$ 的边缘密度，判断 $U$ 与 $V$ 是否独立，并计算 $\operatorname{Cov}(U,V)$。
12. 卷积计算：（a）设 $X\sim\operatorname{Exp}(1)$、$Y\sim\operatorname{Uniform}(0,1)$ 且独立，求 $X+Y$ 的密度（结果需分段写出），并验证归一化；（b）设 $X\sim N(\mu_1,\sigma_1^2)$、$Y\sim N(\mu_2,\sigma_2^2)$ 且独立，用式（12.20）并对被积函数配方，证明 $X+Y\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$。
13. 设 $X,Y$ 独立且均服从 $\operatorname{Uniform}(0,1)$。用式（12.22）求 $Z=X/Y$ 的密度，验证归一化，求 $\mathbb P(Z\le1)$，并说明 $\mathbb E[Z]$ 是否存在。
14. 设 $X_1,X_2,X_3$ 相互独立，$X_i\sim\operatorname{Exp}(i)$（$i=1,2,3$）。求 $\min_iX_i$ 的分布与期望、$\mathbb P(X_1=\min_iX_i)$，以及 $\mathbb P(\max_iX_i\le t)$。
15. 从式（12.27）出发，通过对 $x_2,\ldots,x_n$ 积分推出 $X_{(1)}$ 的密度，通过对 $x_1,\ldots,x_{n-1}$ 积分推出 $X_{(n)}$ 的密度，并与式（12.25）对照。写出积分区域并说明积分次序选择的理由。
16. 设 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$。（a）取 $n=4$，求 $\mathbb P\bigl(X_{(2)}\le\frac12<X_{(3)}\bigr)$：先用二项分布论证，再用次序统计量密度积分验证；并求 $\mathbb E[X_{(2)}]$ 与 $\operatorname{Var}(X_{(2)})$。（b）用式（12.31）推出极差密度 $f_R(r)=n(n-1)r^{n-2}(1-r)$（$0<r<1$），求 $\mathbb E[R]$ 与 $\operatorname{Var}(R)$，并分别在 $n=4$ 与 $n=5$ 时计算 $\mathbb P(R>1/2)$。
17. 设 $X_1,\ldots,X_4\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$。用定理 12.28 求 $\mathbb E[X_{(4)}]$ 与 $\operatorname{Var}(X_{(4)})$；再用式（12.29）写出 $X_{(4)}$ 的密度并直接积分验证 $\mathbb E[X_{(4)}]$ 与之相符。
18. 设 $(X,Y)$ 的密度为 $f_{X,Y}(x,y)=2\cdot\mathbf 1_{\{0<x<y<1\}}$。求 $f_{X\mid Y}(x\mid y)$、$\mathbb E[X\mid Y=y]$、$\operatorname{Var}(X\mid Y=y)$，再用全期望公式与全方差公式求 $\mathbb E[X]$ 与 $\operatorname{Var}(X)$，并与直接积分的结果比较。
19. 设 $(X,Y)$ 服从二元正态分布，$\mu_X=0.08$、$\mu_Y=0.05$、$\sigma_X=0.20$、$\sigma_Y=0.15$、$\rho=0.5$。求条件分布 $X\mid Y=0.10$ 的均值与标准差、$\mathbb P(X<0\mid Y=0.10)$，并讨论 $\rho\to1$ 与 $\rho\to0$ 时条件方差的极限含义。
20. 设 $n$ 只资产波动率均为 $\sigma$、两两相关系数均为 $\rho$，等权持有。证明式（12.39），求组合方差的极限，并计算 $\sigma=0.30$、$\rho=0.4$、$n=20$ 时的组合波动率。若允许权重任意（和为 $1$），说明为何在此对称结构下等权组合就是最小方差组合。
21. 某组合 $T=500$ 个交易日的历史损失样本用于估计 VaR。（a）分别写出 $\alpha=0.95$ 与 $\alpha=0.99$ 时式（12.41）中 $k$ 的取值，并说明各由第几大的损失决定；（b）若真实分布为 $F_L$，用二项分布写出“超过某一阈值 $l$ 的天数”的分布，并说明 $\alpha=0.99$ 时估计为何更不稳定；（c）设损失近似正态、日波动率 $2\%$，用式（12.42）计算两个置信水平下 VaR 估计的近似标准差与相对标准误。
22. 设 $U,V\sim\operatorname{Uniform}(0,1)$。（a）证明 $W(u,v)=\max(u+v-1,0)\le C(u,v)\le\min(u,v)=M(u,v)$ 对任意 Copula 成立；（b）若 $(U,V)$ 服从独立 Copula $\Pi(u,v)=uv$，令 $X=\Phi^{-1}(U)$、$Y=\Phi^{-1}(V)$，求 $\rho_{X,Y}$；（c）若 $(U,V)$ 服从 $M$，求 $\rho_{X,Y}$；（d）举出一个 Copula 与边缘分布的组合，使 $\rho_{X,Y}=0$ 而 Kendall $\tau\ne0$，并解释这为何不矛盾。
