# 第12章习题参考答案与解析

## 1. 

首先利用概率密度的全空间归一化条件确定常数 $c$。由于联合密度仅在单位正方形 $[0,1]^2$ 上非零，由双重积分计算可得：
$$\int_0^1 \int_0^1 c(x+2y)\,\mathrm{d}x\,\mathrm{d}y = c \int_0^1 \left(\frac{1}{2} + 2y\right)\mathrm{d}y = c\left(\frac{1}{2}+1\right) = \frac{3}{2}c = 1$$
解得 $c = \frac{2}{3}$。

将联合密度对另一个变量求积分，即可得到边缘概率密度函数。对于 $x\in[0,1]$，有：
$$f_X(x) = \int_0^1 \frac{2}{3}(x+2y)\,\mathrm{d}y = \frac{2}{3}(x+1)$$
当 $x\notin[0,1]$ 时 $f_X(x)=0$。同理，对于 $y\in[0,1]$，对 $x$ 积分可得：
$$f_Y(y) = \int_0^1 \frac{2}{3}(x+2y)\,\mathrm{d}x = \frac{2}{3}\left(\frac{1}{2}+2y\right) = \frac{1}{3}(1+4y)$$
当 $y\notin[0,1]$ 时 $f_Y(y)=0$。

依据边缘密度分别计算数学期望：
$$\mathbb E[X] = \int_0^1 x \cdot \frac{2}{3}(x+1)\,\mathrm{d}x = \frac{2}{3}\left(\frac{1}{3}+\frac{1}{2}\right) = \frac{5}{9}$$
$$\mathbb E[Y] = \int_0^1 y \cdot \frac{1}{3}(1+4y)\,\mathrm{d}y = \frac{1}{3}\left(\frac{1}{2}+\frac{4}{3}\right) = \frac{11}{18}$$

联合期望 $\mathbb E[XY]$ 通过二重积分求得：
$$\mathbb E[XY] = \int_0^1 \int_0^1 \frac{2}{3}(x^2y+2xy^2)\,\mathrm{d}x\,\mathrm{d}y = \frac{2}{3}\left(\frac{1}{3}\cdot\frac{1}{2} + 2\cdot\frac{1}{2}\cdot\frac{1}{3}\right) = \frac{2}{3}\cdot\frac{1}{2} = \frac{1}{3}$$

进而求得协方差为：
$$\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E[X]\mathbb E[Y] = \frac{1}{3} - \frac{5}{9}\cdot\frac{11}{18} = \frac{54-55}{162} = -\frac{1}{162}$$

为求相关系数，先求二阶矩与方差：
$$\mathbb E[X^2] = \int_0^1 x^2\cdot\frac{2}{3}(x+1)\,\mathrm{d}x = \frac{2}{3}\left(\frac{1}{4}+\frac{1}{3}\right) = \frac{7}{18}$$
$$\operatorname{Var}(X) = \frac{7}{18} - \left(\frac{5}{9}\right)^2 = \frac{63-50}{162} = \frac{13}{162}$$
$$\mathbb E[Y^2] = \int_0^1 y^2\cdot\frac{1}{3}(1+4y)\,\mathrm{d}y = \frac{1}{3}\left(\frac{1}{3}+1\right) = \frac{4}{9}$$
$$\operatorname{Var}(Y) = \frac{4}{9} - \left(\frac{11}{18}\right)^2 = \frac{144-121}{324} = \frac{23}{324}$$
由此计算 Pearson 相关系数：
$$\rho_{X,Y} = \frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}} = \frac{-\frac{1}{162}}{\sqrt{\frac{13}{162}\cdot\frac{23}{324}}} = -\frac{2}{\sqrt{598}} = -\frac{\sqrt{598}}{299}$$

对于独立性判断，注意到 $f_X(x)f_Y(y) = \frac{2}{9}(x+1)(1+4y)$，它在 $[0,1]^2$ 上并不恒等于 $f_{X,Y}(x,y) = \frac{2}{3}(x+2y)$；更直接地，两者的协方差 $\operatorname{Cov}(X,Y) = -\frac{1}{162} \neq 0$，因此 $X$ 与 $Y$ 绝不独立。

常见错误做法剖析：部分解法在计算多项式形式的积分时，常将加法项与乘法项混淆，误以为常数分离可以拆解为边缘的乘积；另有错误是在求出协方差为负数后误判计算有误，事实上负协方差完全合理，它直观反映了在给定 $x+2y$ 保持密度倾斜时两者的反向轻微制约；还有读者常混淆独立与不相关，仅凭单一散点或单一积分值判断独立性。

## 2. 

由归一化条件确定常数 $c$。随机变量的支持集为三角形区域 $0<y<x<1$，因此积分次序选择先对 $y$ 积分再对 $x$ 积分最为简便：
$$\int_0^1 \int_0^x cx\,\mathrm{d}y\,\mathrm{d}x = c\int_0^1 x^2\,\mathrm{d}x = \frac{c}{3} = 1$$
由此得到 $c = 3$。

边缘密度函数由积分上下限严格决定。对于 $X$，积分变量 $y$ 的变动范围为 $0$ 到 $x$：
$$f_X(x) = \int_0^x 3x\,\mathrm{d}y = 3x^2,\quad 0 < x < 1$$
其他区域 $f_X(x)=0$。对于 $Y$，固定 $y\in(0,1)$ 时，$x$ 的变动范围为 $y$ 到 $1$：
$$f_Y(y) = \int_y^1 3x\,\mathrm{d}x = \frac{3}{2}(1-y^2),\quad 0 < y < 1$$
其他区域 $f_Y(y)=0$。

计算概率 $\mathbb P(X+Y\le 1)$ 时，积分区域受到原支持集 $y<x$ 与新条件 $x+y\le 1$ 的双重约束。两直线 $y=x$ 与 $y=1-x$ 交于点 $(1/2, 1/2)$。若选择先对 $x$ 积分，则 $y$ 的取值范围为 $0<y<1/2$，而对固定的 $y$，$x$ 的变动范围为 $y < x \le 1-y$。由此可得：
$$\mathbb P(X+Y\le 1) = \int_0^{1/2} \left(\int_y^{1-y} 3x\,\mathrm{d}x\right)\mathrm{d}y = \int_0^{1/2} \frac{3}{2}\left[(1-y)^2 - y^2\right]\mathrm{d}y = \frac{3}{2}\int_0^{1/2} (1-2y)\,\mathrm{d}y = \frac{3}{8}$$

关于 $X$ 与 $Y$ 不可能独立的说明：随机向量 $(X,Y)$ 的支撑集是三角形区域 $S = \{(x,y): 0<y<x<1\}$，而不是任何两个一维区间的直积（乘积矩形）。因为 $X$ 的边缘支撑为 $(0,1)$，$Y$ 的边缘支撑也为 $(0,1)$，若两者独立，则其联合支撑必为二者笛卡尔积即整个单位正方形 $(0,1)^2$。具体在点 $(1/4, 3/4)$ 处，$f_X(1/4)>0$ 且 $f_Y(3/4)>0$，但该点不属于 $S$，联合密度在该点为 $0$，从而不可能满足乘积因式分解，故两者必然不独立。

常见错误做法剖析：在计算 $\mathbb P(X+Y\le 1)$ 时，最常见的错误是没有仔细画出积分区域示意图，直接写成 $\int_0^1 \int_0^{1-x} 3x\,\mathrm{d}y\,\mathrm{d}x$，彻底遗漏了 $y<x$ 这一天然几何约束，导致积分包含了不存在密度的区域；另一个典型错误是在解释非独立性时，耗费大量篇幅计算协方差甚至条件分布，而遗漏了“支撑集非矩形则必不独立”这一定理级几何判据。

## 3. 

**证明**
设 $F:\mathbb R^2\to[0,1]$ 满足定义域上的矩形增量非负条件，即对任意 $a\le b$ 与 $c\le d$，均有：
$$\Delta_{a,b}\Delta_{c,d} F = F(b,d) - F(a,d) - F(b,c) + F(a,c) \ge 0$$
在二元联合分布函数的公理体系中，当变量趋向于负无穷大时分布函数值趋于零，即对任意固定的 $x$，$\lim_{y\to-\infty} F(x,y)=0$。现固定实数 $a\le b$ 与 $d$，在上述矩形增量非负不等式中令 $c\to-\infty$ 取极限。根据极限的保序性可得：
$$\lim_{c\to-\infty} [F(b,d) - F(a,d) - F(b,c) + F(a,c)] = F(b,d) - F(a,d) \ge 0$$
由此直接得到 $F(a,d) \le F(b,d)$，即 $F$ 关于第一个自变量单调不减。完全对称地，令 $a\to-\infty$ 可得 $F(b,d) - F(b,c) \ge 0$，即 $F$ 关于第二个自变量亦单调不减。

接下来对具体给出的二元函数 $F(x,y) = \mathbf 1_{\{x+y\ge 0\}}$ 进行性质验证。

第一，单调不减性：固定任一实数 $y$，对任意 $x_1 \le x_2$，若 $x_1+y \ge 0$，则必然有 $x_2+y \ge x_1+y \ge 0$，从而必有 $\mathbf 1_{\{x_1+y\ge 0\}} \le \mathbf 1_{\{x_2+y\ge 0\}}$；同理固定 $x$ 时关于 $y$ 亦单调不减。

第二，右连续性：任取点 $(x,y)$ 及递减收敛点列 $x_n\downarrow x$ 与 $y_n\downarrow y$，容易验证有 $x_n+y_n\downarrow x+y$。若 $x+y\ge 0$，则对一切正整数 $n$ 恒有 $x_n+y_n\ge x+y\ge 0$，此时 $F(x_n,y_n)=1=F(x,y)$；若 $x+y<0$，根据实数极限性质，当 $n$ 充分大时必有 $x_n+y_n<0$，此时 $F(x_n,y_n)=0=F(x,y)$。因此 $F$ 在平面上处处连续，当然满足关于每个自变量的右连续性。

第三，极限性质：对任意固定的 $y$，当 $x\to-\infty$ 时直接可知 $x+y<0$，故 $F(-\infty,y)=0$；同理 $F(x,-\infty)=0$。当 $x\to+\infty$ 且 $y\to+\infty$ 时直接可知 $x+y>0$，故 $F(+\infty,+\infty)=1$。

第四，检验矩形增量非负性：选取平面上的测试矩形 $[-1,1]\times[-1,1]$，即取 $a=-1, b=1, c=-1, d=1$。计算该矩形上的增量：
$$F(b,d) = F(1,1) = \mathbf 1_{\{1+1\ge 0\}} = 1$$
$$F(a,d) = F(-1,1) = \mathbf 1_{\{-1+1\ge 0\}} = 1$$
$$F(b,c) = F(1,-1) = \mathbf 1_{\{1+(-1)\ge 0\}} = 1$$
$$F(a,c) = F(-1,-1) = \mathbf 1_{\{-1+(-1)\ge 0\}} = 0$$
由此计算对应的矩形增量：
$$\Delta_{-1,1}\Delta_{-1,1} F = F(1,1) - F(-1,1) - F(1,-1) + F(-1,-1) = 1 - 1 - 1 + 0 = -1 < 0$$
若存在某个二维随机向量以 $F$ 为联合分布函数，则该矩形增量必须等于事件 $\{X\in(-1,1], Y\in(-1,1]\}$ 的概率，但这导致了负概率 $-1$，产生矛盾。因此 $F$ 绝不是任何随机向量的联合分布函数。

□

常见错误做法剖析：初学者往往受一维随机变量分布函数定义的直观影响，误以为只要满足“单调不减”、“右连续”以及“无穷远处极限为零和一”，就足以构成二维联合分布函数。该反例极其深刻地指出了二维概率测度的核心特征是几何二维区间上的非负可加性，边缘单调性仅仅是二维矩形非负性的必要推论，绝非充分条件。

## 4. 

首先根据二维离散随机变量联合分布律求边缘分布。将联合质量函数对各行与各列求和：
对于随机变量 $X$，其可能取值为 $0$ 和 $1$：
$$\mathbb P(X=0) = \sum_{y=0}^2 p(0,y) = p(0,0) + p(0,1) + p(0,2) = 0.1 + 0.2 + 0.1 = 0.4$$
$$\mathbb P(X=1) = \sum_{y=0}^2 p(1,y) = p(1,0) + p(1,1) + p(1,2) = 0.2 + 0.1 + 0.3 = 0.6$$
对于随机变量 $Y$，其可能取值为 $0, 1, 2$：
$$\mathbb P(Y=0) = \sum_{x=0}^1 p(x,0) = p(0,0) + p(1,0) = 0.1 + 0.2 = 0.3$$
$$\mathbb P(Y=1) = \sum_{x=0}^1 p(x,1) = p(0,1) + p(1,1) = 0.2 + 0.1 = 0.3$$
$$\mathbb P(Y=2) = \sum_{x=0}^1 p(x,2) = p(0,2) + p(1,2) = 0.1 + 0.3 = 0.4$$

在给定事件 $\{Y=1\}$ 下，由条件概率定义可得条件质量函数：
$$p_{X\mid Y}(0\mid 1) = \frac{p(0,1)}{\mathbb P(Y=1)} = \frac{0.2}{0.3} = \frac{2}{3}$$
$$p_{X\mid Y}(1\mid 1) = \frac{p(1,1)}{\mathbb P(Y=1)} = \frac{0.1}{0.3} = \frac{1}{3}$$
当 $x\notin\{0,1\}$ 时条件概率为 $0$。

计算一阶矩与二阶混合矩：
$$\mathbb E[X] = 0\times 0.4 + 1\times 0.6 = 0.6$$
$$\mathbb E[Y] = 0\times 0.3 + 1\times 0.3 + 2\times 0.4 = 1.1$$
$$\mathbb E[XY] = \sum_{x=0}^1 \sum_{y=0}^2 xy\,p(x,y) = 1\times 1\times p(1,1) + 1\times 2\times p(1,2) = 0.1 + 2\times 0.3 = 0.7$$

协方差与方差计算如下：
$$\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E[X]\mathbb E[Y] = 0.7 - 0.6\times 1.1 = 0.7 - 0.66 = 0.04$$
由于 $X$ 服从参数为 $0.6$ 的两点分布，有：
$$\operatorname{Var}(X) = 0.6\times(1-0.6) = 0.24$$
对 $Y$ 计算二阶矩与方差：
$$\mathbb E[Y^2] = 0^2\times 0.3 + 1^2\times 0.3 + 2^2\times 0.4 = 0.3 + 1.6 = 1.9$$
$$\operatorname{Var}(Y) = \mathbb E[Y^2] - (\mathbb E[Y])^2 = 1.9 - 1.1^2 = 1.9 - 1.21 = 0.69$$
由此计算 Pearson 相关系数：
$$\rho_{X,Y} = \frac{\operatorname{Cov}(X,Y)}{\sqrt{\operatorname{Var}(X)\operatorname{Var}(Y)}} = \frac{0.04}{\sqrt{0.24\times 0.69}} = \frac{0.04}{\sqrt{0.1656}} = \frac{2}{\sqrt{414}} = \frac{\sqrt{414}}{207}$$

检验独立性：考察点 $(0,0)$ 处的概率。由联合分布已知 $p(0,0) = 0.1$，而边缘概率乘积为 $\mathbb P(X=0)\mathbb P(Y=0) = 0.4\times 0.3 = 0.12 \neq 0.1$。并且协方差 $\operatorname{Cov}(X,Y) = 0.04 \neq 0$。因此 $X$ 与 $Y$ 不独立。

常见错误做法剖析：计算条件概率时，最容易出现的失误是忘记用边缘概率 $\mathbb P(Y=1)$ 进行归一化，直接将联合概率 $p(x,1)$ 当作条件概率；在求 $\mathbb E[XY]$ 时，初学者往往误将所有项列入，漏乘非零取值，或在相乘项中误将 $0\times y$ 项赋予非零权重；此外，独立性检验必须对所有状态网格点均成立，只要找到一个网格点不满足乘积关系即可断言不独立。

## 5. 

**证明**
首先利用数学期望的线性性质证明协方差的双线性性质。
设 $U = \sum_{i=1}^n a_i X_i$，$V = \sum_{j=1}^m b_j Y_j$。根据数学期望的线性性质，有：
$$\mathbb E[U] = \sum_{i=1}^n a_i\mathbb E[X_i],\quad \mathbb E[V] = \sum_{j=1}^m b_j\mathbb E[Y_j]$$
从而各自的中心化偏差可表示为：
$$U - \mathbb E[U] = \sum_{i=1}^n a_i(X_i - \mathbb E[X_i])$$
$$V - \mathbb E[V] = \sum_{j=1}^m b_j(Y_j - \mathbb E[Y_j])$$
由协方差的严格定义与双重有限求和项展开：
$$\operatorname{Cov}(U,V) = \mathbb E\left[(U - \mathbb E[U])(V - \mathbb E[V])\right] = \mathbb E\left[\left(\sum_{i=1}^n a_i(X_i - \mathbb E[X_i])\right)\left(\sum_{j=1}^m b_j(Y_j - \mathbb E[Y_j])\right)\right]$$
根据实数乘法对加法的分配律，乘积展开为双重有限求和：
$$\left(\sum_{i=1}^n a_i(X_i - \mathbb E[X_i])\right)\left(\sum_{j=1}^m b_j(Y_j - \mathbb E[Y_j])\right) = \sum_{i=1}^n\sum_{j=1}^m a_ib_j (X_i - \mathbb E[X_i])(Y_j - \mathbb E[Y_j])$$
再次应用数学期望的线性性质，期望算子与有限双重求和可交换次序：
$$\operatorname{Cov}(U,V) = \sum_{i=1}^n\sum_{j=1}^m a_ib_j\,\mathbb E\left[(X_i - \mathbb E[X_i])(Y_j - \mathbb E[Y_j])\right] = \sum_{i=1}^n\sum_{j=1}^m a_ib_j\operatorname{Cov}(X_i,Y_j)$$
此即式（12.12）的第二个等号。

进一步，根据方差与自协方差的关系 $\operatorname{Var}(W) = \operatorname{Cov}(W,W)$，令 $m=n$、$b_i=a_i$ 且 $Y_i=X_i$，代入上述双线性公式，直接推出随机变量线性组合的方差公式：
$$\operatorname{Var}\left(\sum_{i=1}^n a_i X_i\right) = \operatorname{Cov}\left(\sum_{i=1}^n a_i X_i,\; \sum_{j=1}^n a_j X_j\right) = \sum_{i=1}^n\sum_{j=1}^n a_ia_j\operatorname{Cov}(X_i,X_j)$$

□

现设随机变量 $X,Y,Z$ 两两不相关，即满足：
$$\operatorname{Cov}(X,Y) = \operatorname{Cov}(X,Z) = \operatorname{Cov}(Y,Z) = 0$$
已知 $\operatorname{Var}(X)=1$、$\operatorname{Var}(Y)=4$、$\operatorname{Var}(Z)=9$。将线性组合 $W = X - 2Y + 3Z$ 展开，对应系数分别为 $a_1=1, a_2=-2, a_3=3$。在方差的双重求和展开式中，所有互协方差交叉项均为零，仅保留对角线自方差项：
$$\operatorname{Var}(X - 2Y + 3Z) = 1^2\operatorname{Var}(X) + (-2)^2\operatorname{Var}(Y) + 3^2\operatorname{Var}(Z) = 1\times 1 + 4\times 4 + 9\times 9 = 1 + 16 + 81 = 98$$

常见错误做法剖析：计算负系数项的方差贡献时，极为容易把 $(-2)^2$ 错写为 $-2\operatorname{Var}(Y)$ 或 $-4\operatorname{Var}(Y)$，从而得出负贡献，违背了方差的非负性质；另一个理论性错误是将不相关误当成必须独立才能使用方差可加性，实际上方差可加公式仅依赖于协方差为零（即不相关），无需高阶独立性假设。
## 6. 

由 $X\sim\operatorname{Uniform}(-1,1)$，其概率密度为 $f_X(x) = \frac{1}{2}\mathbf 1_{\{-1 < x < 1\}}$。
由于 $f_X(x)$ 关于原点对称且 $x$ 与 $x^3$ 为奇函数，直接由积分性质可得：
$$\mathbb E[X] = \int_{-1}^1 x\cdot\frac{1}{2}\,\mathrm{d}x = 0$$
对于 $Y=X^2$，计算其期望与混合二阶矩：
$$\mathbb E[Y] = \mathbb E[X^2] = \int_{-1}^1 x^2\cdot\frac{1}{2}\,\mathrm{d}x = \frac{1}{3}$$
$$\mathbb E[XY] = \mathbb E[X^3] = \int_{-1}^1 x^3\cdot\frac{1}{2}\,\mathrm{d}x = 0$$
由此得到协方差：
$$\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E[X]\mathbb E[Y] = 0 - 0\times\frac{1}{3} = 0$$
即 $X$ 与 $Y$ 不相关。

接下来证明 $X$ 与 $Y$ 不独立。

**证明**
考察事件 $A = \{Y \le 1/4\}$ 与 $B = \{X > 1/2\}$。
由于 $Y = X^2$，事件 $A$ 等价于 $\{X^2 \le 1/4\}$ 即 $\{-1/2 \le X \le 1/2\}$。
根据均匀分布概率计算：
$$\mathbb P(A) = \mathbb P\left(-\frac{1}{2} \le X \le \frac{1}{2}\right) = \frac{\frac{1}{2} - \left(-\frac{1}{2}\right)}{2} = \frac{1}{2}$$
$$\mathbb P(B) = \mathbb P\left(X > \frac{1}{2}\right) = \frac{1 - \frac{1}{2}}{2} = \frac{1}{4}$$
两事件的交集为：
$$A\cap B = \left\{-\frac{1}{2}\le X\le \frac{1}{2}\right\}\cap\left\{X > \frac{1}{2}\right\} = \varnothing$$
从而联合概率为：
$$\mathbb P(A\cap B) = \mathbb P(\varnothing) = 0$$
但边缘概率乘积为：
$$\mathbb P(A)\mathbb P(B) = \frac{1}{2}\times\frac{1}{4} = \frac{1}{8} \neq 0$$
因此 $\mathbb P(A\cap B) \neq \mathbb P(A)\mathbb P(B)$，说明 $X$ 与 $Y$ 不独立。

□

最后求 $Z = X+Y = X^2+X$ 的分布函数 $F_Z(z) = \mathbb P(Z\le z)$。
函数 $g(x) = x^2+x = \left(x+\frac{1}{2}\right)^2 - \frac{1}{4}$ 在定义域 $[-1,1]$ 上的最小值为 $g(-1/2) = -1/4$，端点值分别为 $g(-1) = 0$ 与 $g(1) = 2$。因此 $Z$ 的取值范围为 $[-1/4, 2]$。
当 $z < -1/4$ 时，$F_Z(z) = 0$；当 $z > 2$ 时，$F_Z(z) = 1$。
对于不等式 $x^2+x \le z$，配方得 $\left(x+\frac{1}{2}\right)^2 \le z+\frac{1}{4}$，解得区间：
$$-\frac{1}{2} - \sqrt{z+\frac{1}{4}} \le x \le -\frac{1}{2} + \sqrt{z+\frac{1}{4}}$$
记左端点为 $r_1(z) = -\frac{1}{2} - \sqrt{z+\frac{1}{4}}$，右端点为 $r_2(z) = -\frac{1}{2} + \sqrt{z+\frac{1}{4}}$。因此事件 $\{Z\le z\}$ 等价于 $X \in [-1,1]\cap[r_1(z), r_2(z)]$。需分两段讨论：
第一段：当 $-\frac{1}{4} \le z \le 0$ 时，$\sqrt{z+\frac{1}{4}} \le \frac{1}{2}$，从而 $r_1(z) \ge -1$ 且 $r_2(z) \le 0 < 1$，故整个区间完全包含在 $[-1,1]$ 内部。由均匀分布长度比例可得：
$$F_Z(z) = \frac{r_2(z) - r_1(z)}{2} = \sqrt{z+\frac{1}{4}}$$
第二段：当 $0 < z \le 2$ 时，$\sqrt{z+\frac{1}{4}} > \frac{1}{2}$，故 $r_1(z) < -1$，此时下界截断于 $-1$；而上界满足 $r_2(z) \le -\frac{1}{2} + \frac{3}{2} = 1$。因此有效取值区间为 $[-1, r_2(z)]$。分布函数为：
$$F_Z(z) = \frac{r_2(z) - (-1)}{2} = \frac{-\frac{1}{2} + \sqrt{z+\frac{1}{4}} + 1}{2} = \frac{1}{4} + \frac{1}{2}\sqrt{z+\frac{1}{4}}$$
综合以上，分布函数在各段连续，在分界点 $z=0$ 处两侧值均为 $1/2$。

常见错误做法剖析：本题是“不相关绝不等于独立”的教科书级典范，常见错误是误以为协方差为零就证明了独立；在求解 $Z=X+X^2$ 的分布时，最严重的错误是忽视了该二次函数的非单调性，直接套用单调变量变换公式求反函数，漏掉了对称轴左侧的根；另一个易错点是在分段求解不等式与 $[-1,1]$ 求交时遗漏了左端点跌出定义域界限的情况。

## 7. 

设随机向量 $(X,Y)$ 在单位圆盘 $D = \{(x,y): x^2+y^2 \le 1\}$ 上均匀分布。圆盘面积为 $\pi$，故联合密度为：
$$f_{X,Y}(x,y) = \frac{1}{\pi}\mathbf 1_{\{x^2+y^2\le 1\}}$$

固定 $y\in(-1,1)$，计算 $Y$ 的边缘概率密度。此时 $x$ 的取值范围由 $x^2 \le 1-y^2$ 确定，即 $x\in[-\sqrt{1-y^2}, \sqrt{1-y^2}]$：
$$f_Y(y) = \int_{-\sqrt{1-y^2}}^{\sqrt{1-y^2}} \frac{1}{\pi}\,\mathrm{d}x = \frac{2}{\pi}\sqrt{1-y^2},\quad -1 < y < 1$$
其他区域 $f_Y(y)=0$。

进而得到在给定 $Y=y$ 条件下 $X$ 的条件概率密度：
$$f_{X\mid Y}(x\mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)} = \frac{\frac{1}{\pi}}{\frac{2}{\pi}\sqrt{1-y^2}} = \frac{1}{2\sqrt{1-y^2}},\quad x\in\left[-\sqrt{1-y^2},\; \sqrt{1-y^2}\right]$$
由此可见，条件分布为区间 $[-\sqrt{1-y^2}, \sqrt{1-y^2}]$ 上的连续型均匀分布。

利用一维均匀分布的性质直接计算条件期望与条件方差：
由于该区间关于原点对称，条件期望必然为零：
$$\mathbb E[X\mid Y=y] = 0$$
条件方差为区间长度平方除以 $12$：
$$\operatorname{Var}(X\mid Y=y) = \frac{\left(2\sqrt{1-y^2}\right)^2}{12} = \frac{4(1-y^2)}{12} = \frac{1-y^2}{3}$$

利用全期望公式计算 $\mathbb E[X]$：
$$\mathbb E[X] = \mathbb E\left[\mathbb E[X\mid Y]\right] = \mathbb E[0] = 0$$
利用条件期望展开式计算协方差：
$$\mathbb E[XY] = \mathbb E\left[\mathbb E[XY\mid Y]\right] = \mathbb E\left[Y\mathbb E[X\mid Y]\right] = \mathbb E[Y\times 0] = 0$$
$$\operatorname{Cov}(X,Y) = \mathbb E[XY] - \mathbb E[X]\mathbb E[Y] = 0 - 0 = 0$$

与例 12.3 的对称性论证对照：在例 12.3 中，圆盘区域具有中心对称性与反射对称性。由于反射变换 $(X,Y)\mapsto(-X,Y)$ 保持圆盘区域和均匀概率测度不变，根据分布不变性必然有 $\mathbb E[X] = \mathbb E[-X] = -\mathbb E[X]$，从而 $\mathbb E[X]=0$；同理 $\mathbb E[XY] = \mathbb E[(-X)Y] = -\mathbb E[XY]$，故 $\mathbb E[XY]=0$。本题所用的“水平切片”条件期望法从分析角度揭示了相同机制：由于每一个固定高度 $y$ 的横截面线段都精确地以 $y$ 轴为中心对称，因此在每一个切片上的局部条件期望处处为零，从而由塔式性质全局期望与协方差必然恒为零。

常见错误做法剖析：计算条件密度时，部分解法容易将边缘密度 $f_Y(y)$ 中的根号系数遗漏；另有错误是尝试在直角坐标系下直接展开双重积分求解 $\mathbb E[XY]$，往往陷入复杂的定积分换元泥潭，而未能领会通过条件期望 $\mathbb E[XY\mid Y]=Y\mathbb E[X\mid Y]=0$ 即可一步化简为零的强大解析威力。
## 8. 

协方差矩阵的充要条件是对称半正定。对三个矩阵逐一检验：

对于 $\boldsymbol\Sigma_1$：根据转置直接可知矩阵对称。计算各阶顺序主子式：
一阶主子式为 $4 > 0$；二阶主子式（行列式）为：
$$\det(\boldsymbol\Sigma_1) = 4\times 3 - 2\times 2 = 12 - 4 = 8 > 0$$
各阶顺序主子式均严格大于零，因此 $\boldsymbol\Sigma_1$ 为对称正定矩阵，是合法的协方差矩阵。
求其下三角 Cholesky 分解矩阵 $\boldsymbol L = \begin{pmatrix} l_{11} & 0 \\ l_{21} & l_{22} \end{pmatrix}$ 满足 $\boldsymbol\Sigma_1 = \boldsymbol L\boldsymbol L^\top$：
$$l_{11}^2 = 4 \implies l_{11} = 2$$
$$l_{21}l_{11} = 2 \implies 2l_{21} = 2 \implies l_{21} = 1$$
$$l_{21}^2 + l_{22}^2 = 3 \implies 1 + l_{22}^2 = 3 \implies l_{22} = \sqrt{2}$$
得到 $\boldsymbol L = \begin{pmatrix} 2 & 0 \\ 1 & \sqrt{2} \end{pmatrix}$。
设 $\boldsymbol Z = (Z_1, Z_2)^\top$ 且 $Z_1, Z_2$ 独立同服从标准正态分布 $N(0,1)$，生成对应随机向量的公式为：
$$\boldsymbol X = \boldsymbol L\boldsymbol Z = \begin{pmatrix} 2Z_1 \\ Z_1 + \sqrt{2}Z_2 \end{pmatrix}$$

对于 $\boldsymbol\Sigma_2$：虽然矩阵关于主对角线对称，但计算其行列式：
$$\det(\boldsymbol\Sigma_2) = 1\times 1 - 2\times 2 = -3 < 0$$
特征多项式为 $(\lambda - 1)^2 - 4 = 0$，解得特征值为 $\lambda_1 = 3$ 与 $\lambda_2 = -1 < 0$。存在负特征值，说明矩阵为不定矩阵（非半正定）；从统计直观上看，其对应的相关系数为 $\rho = 2/\sqrt{1\times 1} = 2 > 1$，这违背了相关系数绝对值不超过 $1$ 的柯西-施瓦茨不等式界限。因此 $\boldsymbol\Sigma_2$ 不是合法的协方差矩阵。

对于 $\boldsymbol\Sigma_3$：矩阵是对称块对角矩阵。第一块 $\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ 的特征值为 $2$ 和 $0$，第二块标量为 $2$。所有特征值分别为 $2, 2, 0$，全部非负，因此 $\boldsymbol\Sigma_3$ 是对称半正定矩阵，是合法的协方差矩阵（属于退化奇异协方差情形）。
对其进行广义 Cholesky 分解，设下三角矩阵 $\boldsymbol L = \begin{pmatrix} l_{11} & 0 & 0 \\ l_{21} & l_{22} & 0 \\ l_{31} & l_{32} & l_{33} \end{pmatrix}$：
由第一列得 $l_{11}=1, l_{21}=1, l_{31}=0$；第二行剩余方差为 $1 - l_{21}^2 = 0$，故 $l_{22}=0$；第三行得 $l_{33}=\sqrt{2}$。由此分解得：
$$\boldsymbol L = \begin{pmatrix} 1 & 0 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & \sqrt{2} \end{pmatrix}$$
设 $Z_1, Z_2, Z_3\overset{\mathrm{iid}}{\sim} N(0,1)$，生成公式为：
$$\boldsymbol X = \boldsymbol L\boldsymbol Z = \begin{pmatrix} Z_1 \\ Z_1 \\ \sqrt{2}Z_3 \end{pmatrix}$$
为使 $\boldsymbol a^\top\boldsymbol X$ 为常数，需要线性组合的方差为零，即 $\operatorname{Var}(\boldsymbol a^\top\boldsymbol X) = \boldsymbol a^\top\boldsymbol\Sigma_3\boldsymbol a = 0$。这等价于 $\boldsymbol a$ 属于 $\boldsymbol\Sigma_3$ 的零特征子空间（核空间）。令 $\boldsymbol\Sigma_3\boldsymbol a = \boldsymbol 0$，可得方程组 $a_1+a_2=0$ 且 $a_3=0$。取非零向量 $\boldsymbol a = (1, -1, 0)^\top$，则有：
$$\operatorname{Var}(\boldsymbol a^\top\boldsymbol X) = \operatorname{Var}(X_1 - X_2) = \boldsymbol a^\top\boldsymbol\Sigma_3\boldsymbol a = 0$$
这意味着差值 $X_1 - X_2$ 的方差为零，其取值几乎必然为常数 $\mathbb E[X_1 - X_2]$。

常见错误做法剖析：判断半正定时，部分读者容易仅看对角线元素全为正数便草率判定合法，遗漏了相关系数必须介于 $[-1,1]$ 的约束（如 $\boldsymbol\Sigma_2$）；在对奇异半正定矩阵进行 Cholesky 构造时，因主元出现零而误以为不能分解，实际上半正定矩阵的三角因子允许对角线出现零元。

## 9. 

记随机向量 $\boldsymbol X = (X_1, X_2)^\top$。由题设，$(X_1, X_2)$ 服从二元正态分布，其均值向量为 $\boldsymbol\mu = (\mu_1, \mu_2)^\top$，协方差矩阵为：
$$\boldsymbol\Sigma_{\boldsymbol X} = \begin{pmatrix} \sigma^2 & \rho\sigma^2 \\ \rho\sigma^2 & \sigma^2 \end{pmatrix}$$
线性变换可表示为矩阵乘法：
$$\begin{pmatrix} U \\ V \end{pmatrix} = \boldsymbol A\boldsymbol X = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} X_1 \\ X_2 \end{pmatrix}$$
多元正态分布在线性变换下保持联合正态性，因此随机向量 $(U,V)^\top$ 必然服从二元正态分布。
计算其均值向量：
$$\mathbb E\begin{bmatrix} U \\ V \end{bmatrix} = \boldsymbol A\boldsymbol\mu = \begin{pmatrix} \mu_1 + \mu_2 \\ \mu_1 - \mu_2 \end{pmatrix}$$
计算其协方差矩阵：
$$\boldsymbol\Sigma_{\boldsymbol Y} = \boldsymbol A\boldsymbol\Sigma_{\boldsymbol X}\boldsymbol A^\top = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} \sigma^2 & \rho\sigma^2 \\ \rho\sigma^2 & \sigma^2 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}^\top = \begin{pmatrix} 2\sigma^2(1+\rho) & 0 \\ 0 & 2\sigma^2(1-\rho) \end{pmatrix}$$
因此，$(U,V)$ 的联合分布为二元正态分布，参数满足：
$$\begin{pmatrix} U \\ V \end{pmatrix} \sim N\left(\begin{pmatrix} \mu_1 + \mu_2 \\ \mu_1 - \mu_2 \end{pmatrix},\; \begin{pmatrix} 2\sigma^2(1+\rho) & 0 \\ 0 & 2\sigma^2(1-\rho) \end{pmatrix}\right)$$
协方差为矩阵的非对角线元素：
$$\operatorname{Cov}(U,V) = \operatorname{Cov}(X_1+X_2,\; X_1-X_2) = \operatorname{Var}(X_1) - \operatorname{Var}(X_2) = \sigma^2 - \sigma^2 = 0$$

下面证明 $U$ 与 $V$ 相互独立。

**证明**
因为 $(U,V)$ 是二元正态随机向量，其联合特征函数由均值向量与协方差矩阵唯一决定。由于协方差矩阵为对角矩阵，即 $\operatorname{Cov}(U,V) = 0$，联合特征函数可以因式分解：
$$\varphi_{U,V}(t_1,t_2) = \exp\left(\mathrm{i}t_1\mathbb E[U] + \mathrm{i}t_2\mathbb E[V] - \frac{1}{2}t_1^2\operatorname{Var}(U) - \frac{1}{2}t_2^2\operatorname{Var}(V)\right) = \varphi_U(t_1)\varphi_V(t_2)$$
根据特征函数因式分解与独立的等价定理，随机变量 $U$ 与 $V$ 相互独立。

□

在上述证明中，使用了“联合正态假设”的关键步骤在于：从 $\operatorname{Cov}(U,V) = 0$ 推出 $U$ 与 $V$ 独立。对于一般的非正态随机变量，协方差为零仅仅代表线性不相关，不能推出独立；只有在联合正态的严格前提下，不相关性才与统计独立性等价。此外，得出 $(U,V)$ 本身具备联合正态性，也必须依赖于 $(X_1, X_2)$ 具备联合正态性（仅有各自边缘正态无法保证线性组合联合正态）。

常见错误做法剖析：很多解答在求出 $\operatorname{Cov}(U,V)=0$ 之后直接写出“因此两者独立”，完全未说明为何此处不相关可以等价于独立，丢掉了本题考察统计学核心定理的用意；另一错误是未注意到两分量方差必须相等（均为 $\sigma^2$），若方差不等，则 $\operatorname{Cov}(U,V)=\sigma_1^2-\sigma_2^2\neq 0$，独立性便不再成立。
## 10. 

先分析 $Y = \varepsilon X$ 的边缘分布。由全概率公式，对任意实数 $y$：
$$\mathbb P(Y \le y) = \mathbb P(\varepsilon = 1)\mathbb P(X \le y \mid \varepsilon = 1) + \mathbb P(\varepsilon = -1)\mathbb P(-X \le y \mid \varepsilon = -1)$$
因为 $\varepsilon$ 与 $X$ 独立，条件可去掉；再由标准正态分布的对称性 $\mathbb P(-X \le y) = \mathbb P(X \le y) = \Phi(y)$，可得：
$$\mathbb P(Y \le y) = \frac{1}{2}\Phi(y) + \frac{1}{2}\Phi(y) = \Phi(y)$$
因此 $Y$ 的边缘分布严格服从标准正态分布 $N(0,1)$。

现在考察和变量 $S = X + Y = X + \varepsilon X = (1 + \varepsilon)X$。
离散随机变量 $1 + \varepsilon$ 的取值情况为：
当 $\varepsilon = -1$ 时，概率为 $1/2$，此时 $1 + \varepsilon = 0$，从而 $S = 0\times X = 0$；
当 $\varepsilon = 1$ 时，概率为 $1/2$，此时 $1 + \varepsilon = 2$，从而 $S = 2X \sim N(0, 4)$。
因此，$S = X + Y$ 服从带有点质量的混合分布：在原点处具有离散点质量，其余部分为连续正态密度。其分布函数表达式为：
$$F_S(s) = \mathbb P(S \le s) = \frac{1}{2}\mathbf 1_{\{s \ge 0\}} + \frac{1}{2}\Phi\left(\frac{s}{2}\right)$$
特别地，在 $s=0$ 处存在跳跃间断点：
$$\mathbb P(S = 0) = \mathbb P(\varepsilon = -1) = \frac{1}{2} > 0$$

下面证明 $S = X + Y$ 不是正态分布。

**证明**
在实数轴上，任何一维非退化正态分布 $N(\mu, \sigma^2)$（$\sigma^2 > 0$）均具有连续概率密度函数，对勒贝格测度绝对连续，因而在单点上的概率恒为零，即对一切 $s\in\mathbb R$ 均有 $\mathbb P(S = s) = 0$。
而退化正态分布则是集中于某一点的狄拉克测度（单点概率为 $1$）。
然而对于随机变量 $S = X + Y$，由上述计算可知：
$$\mathbb P(S = 0) = \frac{1}{2}$$
它既不满足连续型非退化正态分布单点概率为零的要求（存在大于零的点质量 $1/2$），也不满足退化正态分布单点概率为 $1$ 的要求（对任意 $b > 0$，都有 $\mathbb P(0 < S \le b) = \frac{1}{2}[\Phi(b/2) - 1/2] > 0$）。
因此，$X + Y$ 绝对不服从正态分布。

□

这与定理 12.17 并不矛盾。
定理 12.17 的成立前提是：随机向量 $(X,Y)$ 服从“联合二元正态分布”。在联合正态的假定下，任意线性组合必然服从一维正态分布。然而在本题中，虽然 $X \sim N(0,1)$ 与 $Y \sim N(0,1)$ 各自的边缘分布均为正态分布，但随机向量 $(X,Y)$ 并不服从联合二元正态分布。这是一个极为经典的教科书反例，明确揭示了：边缘分布均为正态分布，绝不能推出联合分布是多元正态分布。

常见错误做法剖析：初学者往往受直觉误导，认为“正态变量加正态变量必然还是正态变量”，未曾顾及该结论严格依赖于联合正态性（或相互独立性）；另一常见疏漏是未能识别出 $\varepsilon=-1$ 时 $X+(-X)=0$ 导致的离散质量点，错误地直接求导写出纯连续密度。

## 11. 

由于 $X,Y\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$，它们的联合概率密度为单位正方形上的常数：
$$f_{X,Y}(x,y) = \mathbf 1_{\{0 < x < 1,\; 0 < y < 1\}}$$
考虑线性变换：
$$u = x + y,\quad v = x - y$$
解出反变换可得：
$$x = \frac{u+v}{2},\quad y = \frac{u-v}{2}$$
计算雅可比行列式：
$$J = \det \begin{pmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{pmatrix} = \det \begin{pmatrix} \frac{1}{2} & \frac{1}{2} \\ \frac{1}{2} & -\frac{1}{2} \end{pmatrix} = -\frac{1}{4} - \frac{1}{4} = -\frac{1}{2}$$
雅可比行列式的绝对值为 $|J| = \frac{1}{2}$。

确定 $(U,V)$ 的联合支持集。原变量满足 $0 < x < 1$ 且 $0 < y < 1$，代入反变换后得到不等式组：
$$0 < \frac{u+v}{2} < 1 \implies 0 < u+v < 2$$
$$0 < \frac{u-v}{2} < 1 \implies 0 < u-v < 2$$
这等价于 $u\in(0,2)$ 且 $|v| < \min(u, 2-u)$。在平面上，这是一个以 $(0,0), (1,1), (2,0), (1,-1)$ 为顶点的旋转正方形（菱形区域），记为 $D$。
应用定理 12.18 的二元变量变换公式，联合概率密度为：
$$f_{U,V}(u,v) = f_{X,Y}\left(\frac{u+v}{2}, \frac{u-v}{2}\right)|J| = 1\times\frac{1}{2} = \frac{1}{2},\quad (u,v)\in D$$
在区域 $D$ 外 $f_{U,V}(u,v) = 0$。

求 $U$ 的边缘密度：固定 $u\in(0,2)$，对 $v$ 积分。
当 $0 < u \le 1$ 时，$v$ 的积分区间为 $[-u, u]$，区间长度为 $2u$：
$$f_U(u) = \int_{-u}^u \frac{1}{2}\,\mathrm{d}v = u$$
当 $1 < u < 2$ 时，$v$ 的积分区间为 $[-(2-u), 2-u]$，区间长度为 $2(2-u)$：
$$f_U(u) = \int_{-(2-u)}^{2-u} \frac{1}{2}\,\mathrm{d}v = 2 - u$$
此即区间 $(0,2)$ 上的对称三角分布。

求 $V$ 的边缘密度：$v$ 的取值范围为 $(-1,1)$。
当 $-1 < v \le 0$ 时，$u$ 的积分区间为 $[-v, 2+v]$，长度为 $2+2v$：
$$f_V(v) = \int_{-v}^{2+v} \frac{1}{2}\,\mathrm{d}u = 1 + v$$
当 $0 < v < 1$ 时，$u$ 的积分区间为 $[v, 2-v]$，长度为 $2-2v$：
$$f_V(v) = \int_v^{2-v} \frac{1}{2}\,\mathrm{d}u = 1 - v$$
统写为 $f_V(v) = 1 - |v|$（$-1 < v < 1$），为区间 $(-1,1)$ 上的对称三角分布。

判断独立性与协方差：
联合支持集 $D$ 是菱形，并非笛卡尔积矩形 $(0,2)\times(-1,1)$。例如在点 $(u,v) = (0.2, 0.8)$ 处，边缘密度 $f_U(0.2) = 0.2 > 0$ 且 $f_V(0.8) = 0.2 > 0$，乘积为非零值 $0.04$；但由于 $|v|=0.8 > 0.2=u$，该点根本不在菱形支持集 $D$ 内，联合密度为 $0$。因联合密度不等于边缘密度的乘积，故 $U$ 与 $V$ 不独立。
计算协方差：利用双线性性质与独立同分布性质：
$$\operatorname{Cov}(U,V) = \operatorname{Cov}(X+Y,\; X-Y) = \operatorname{Var}(X) - \operatorname{Var}(Y) = \frac{1}{12} - \frac{1}{12} = 0$$
此例再次证明了不相关不能推出独立。

常见错误做法剖析：计算雅可比矩阵时，最容易将变换方向弄颠倒，将原变量对新变量求导误写为新变量对原变量求导，导致乘以 $2$ 而非 $1/2$；在确定新支持集时，草率地分别求出 $0<U<2$ 和 $-1<V<1$，然后误以为支持集就是整个长方形，从而得出相互独立的错误结论。
## 12. 

本题分为两小问分别进行独立随机变量和的卷积计算。

第一问（a）：
设 $X\sim\operatorname{Exp}(1)$ 与 $Y\sim\operatorname{Uniform}(0,1)$ 独立，其边际密度分别为：
$$f_X(x) = \mathrm{e}^{-x}\mathbf 1_{\{x>0\}},\quad f_Y(y) = \mathbf 1_{\{0<y<1\}}$$
由独立随机变量卷积公式，和变量 $Z = X+Y$ 的概率密度为：
$$f_Z(z) = \int_{-\infty}^{+\infty} f_X(z-y)f_Y(y)\,\mathrm{d}y = \int_0^1 \mathrm{e}^{-(z-y)}\mathbf 1_{\{z-y > 0\}}\,\mathrm{d}y$$
因 $X>0$ 且 $Y>0$，必有 $Z>0$。当 $z\le 0$ 时 $f_Z(z)=0$。
约束条件 $z-y > 0$ 即 $y < z$。分段讨论 $y$ 的积分上限：
当 $0 < z \le 1$ 时，$y$ 的上限受限于 $z$，积分区间为 $(0,z)$：
$$f_Z(z) = \int_0^z \mathrm{e}^{-(z-y)}\,\mathrm{d}y = \mathrm{e}^{-z}\left[\mathrm{e}^y\right]_0^z = \mathrm{e}^{-z}(\mathrm{e}^z - 1) = 1 - \mathrm{e}^{-z}$$
当 $z > 1$ 时，$y$ 的上限受限于 $1$，积分区间为完整的 $(0,1)$：
$$f_Z(z) = \int_0^1 \mathrm{e}^{-(z-y)}\,\mathrm{d}y = \mathrm{e}^{-z}\left[\mathrm{e}^y\right]_0^1 = (\mathrm{e}-1)\mathrm{e}^{-z}$$
综上，分段概率密度函数为：
$$f_Z(z) = \begin{cases} 1 - \mathrm{e}^{-z}, & 0 < z \le 1 \\ (\mathrm{e}-1)\mathrm{e}^{-z}, & z > 1 \\ 0, & z \le 0 \end{cases}$$
验证归一化：
$$\int_{-\infty}^{+\infty} f_Z(z)\,\mathrm{d}z = \int_0^1 (1 - \mathrm{e}^{-z})\,\mathrm{d}z + \int_1^{+\infty} (\mathrm{e}-1)\mathrm{e}^{-z}\,\mathrm{d}z$$
分别计算两部分定积分：
$$\int_0^1 (1 - \mathrm{e}^{-z})\,\mathrm{d}z = \left[z + \mathrm{e}^{-z}\right]_0^1 = (1 + \mathrm{e}^{-1}) - 1 = \mathrm{e}^{-1}$$
$$\int_1^{+\infty} (\mathrm{e}-1)\mathrm{e}^{-z}\,\mathrm{d}z = (\mathrm{e}-1)\left[-\mathrm{e}^{-z}\right]_1^{+\infty} = (\mathrm{e}-1)\mathrm{e}^{-1} = 1 - \mathrm{e}^{-1}$$
相加得 $\mathrm{e}^{-1} + (1 - \mathrm{e}^{-1}) = 1$，归一化验证通过。

第二问（b）：

**证明**
设 $X\sim N(\mu_1, \sigma_1^2)$ 与 $Y\sim N(\mu_2, \sigma_2^2)$ 独立。根据卷积公式（12.20）：
$$f_Z(z) = \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi}\sigma_1}\exp\left(-\frac{(z-y-\mu_1)^2}{2\sigma_1^2}\right)\frac{1}{\sqrt{2\pi}\sigma_2}\exp\left(-\frac{(y-\mu_2)^2}{2\sigma_2^2}\right)\mathrm{d}y$$
提公共常数项并对指数中的二次多项式关于积分变量 $y$ 配方：
$$Q(y) = \frac{(z-\mu_1-y)^2}{\sigma_1^2} + \frac{(y-\mu_2)^2}{\sigma_2^2} = y^2\left(\frac{1}{\sigma_1^2} + \frac{1}{\sigma_2^2}\right) - 2y\left(\frac{z-\mu_1}{\sigma_1^2} + \frac{\mu_2}{\sigma_2^2}\right) + \frac{(z-\mu_1)^2}{\sigma_1^2} + \frac{\mu_2^2}{\sigma_2^2}$$
记 $\sigma^2 = \sigma_1^2 + \sigma_2^2$，$\sigma_0^2 = \frac{\sigma_1^2\sigma_2^2}{\sigma^2}$，以及中心位移量 $y_0 = \sigma_0^2\left(\frac{z-\mu_1}{\sigma_1^2} + \frac{\mu_2}{\sigma_2^2}\right)$。二次多项式恒等变形配方为：
$$Q(y) = \frac{(y-y_0)^2}{\sigma_0^2} + \frac{(z-(\mu_1+\mu_2))^2}{\sigma^2}$$
代回积分式，与 $y$ 无关的项提到积分号外：
$$f_Z(z) = \frac{1}{2\pi\sigma_1\sigma_2}\exp\left(-\frac{(z-(\mu_1+\mu_2))^2}{2(\sigma_1^2+\sigma_2^2)}\right)\int_{-\infty}^{+\infty}\exp\left(-\frac{(y-y_0)^2}{2\sigma_0^2}\right)\mathrm{d}y$$
利用高斯积分公式，后半部分一维高斯积分为 $\sqrt{2\pi}\sigma_0 = \sqrt{2\pi}\frac{\sigma_1\sigma_2}{\sqrt{\sigma_1^2+\sigma_2^2}}$。代入相乘化简：
$$f_Z(z) = \frac{1}{2\pi\sigma_1\sigma_2}\cdot\sqrt{2\pi}\frac{\sigma_1\sigma_2}{\sqrt{\sigma_1^2+\sigma_2^2}}\exp\left(-\frac{(z-(\mu_1+\mu_2))^2}{2(\sigma_1^2+\sigma_2^2)}\right) = \frac{1}{\sqrt{2\pi}\sqrt{\sigma_1^2+\sigma_2^2}}\exp\left(-\frac{(z-(\mu_1+\mu_2))^2}{2(\sigma_1^2+\sigma_2^2)}\right)$$
这正是均值为 $\mu_1+\mu_2$、方差为 $\sigma_1^2+\sigma_2^2$ 的一维正态分布概率密度。

□

常见错误做法剖析：在第（a）小问中，最常见的失误是未对 $z$ 处于 $(0,1]$ 和 $(1,+\infty)$ 分段，误用统一积分上限导致密度在 $z>1$ 处发散或不归一；在第（b）小问中，配方过程涉及交叉项繁琐，容易在通分提取 $\sigma_1^2+\sigma_2^2$ 时遗失常数项。

## 13. 

设 $X,Y\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$，联合密度在单位正方形上恒为 $1$。
商变量 $Z = X/Y$ 的理论取值范围为 $(0, +\infty)$。根据商的概率密度公式（式 12.22）：
$$f_Z(z) = \int_{-\infty}^{+\infty} |y|f_{X,Y}(zy, y)\,\mathrm{d}y$$
由于 $Y\in(0,1)$，故绝对值符号直接去掉 $|y| = y$。
被积函数中的指示函数要求点 $(zy, y)$ 落在单位正方形内，即：
$$0 < zy < 1,\quad 0 < y < 1$$
由于 $z > 0$，第一式等价于 $y < 1/z$。因此 $y$ 的有效积分区间为 $(0,\; \min(1, 1/z))$。
当 $z \le 0$ 时，$f_Z(z) = 0$。
分段讨论积分上限：
当 $0 < z \le 1$ 时，$1/z \ge 1$，故 $\min(1, 1/z) = 1$，对 $y$ 积分：
$$f_Z(z) = \int_0^1 y\,\mathrm{d}y = \frac{1}{2}$$
当 $z > 1$ 时，$1/z < 1$，故 $\min(1, 1/z) = 1/z$，对 $y$ 积分：
$$f_Z(z) = \int_0^{1/z} y\,\mathrm{d}y = \left[\frac{y^2}{2}\right]_0^{1/z} = \frac{1}{2z^2}$$
统写商的概率密度函数为：
$$f_Z(z) = \begin{cases} \frac{1}{2}, & 0 < z \le 1 \\ \frac{1}{2z^2}, & z > 1 \\ 0, & z \le 0 \end{cases}$$

验证归一化：
$$\int_0^{+\infty} f_Z(z)\,\mathrm{d}z = \int_0^1 \frac{1}{2}\,\mathrm{d}z + \int_1^{+\infty} \frac{1}{2z^2}\,\mathrm{d}z = \frac{1}{2} + \left[-\frac{1}{2z}\right]_1^{+\infty} = \frac{1}{2} + \frac{1}{2} = 1$$
归一化完全满足。

计算概率 $\mathbb P(Z\le 1)$：
$$\mathbb P(Z \le 1) = \int_0^1 f_Z(z)\,\mathrm{d}z = \int_0^1 \frac{1}{2}\,\mathrm{d}z = \frac{1}{2}$$
（几何解释：由于 $X$ 与 $Y$ 独立同分布，由对称性必然有 $\mathbb P(X \le Y) = 1/2$，而 $Z \le 1$ 等价于 $X \le Y$）。

讨论数学期望 $\mathbb E[Z]$ 是否存在：
$$\mathbb E[Z] = \int_0^{+\infty} z f_Z(z)\,\mathrm{d}z = \int_0^1 z\cdot\frac{1}{2}\,\mathrm{d}z + \int_1^{+\infty} z\cdot\frac{1}{2z^2}\,\mathrm{d}z = \frac{1}{4} + \int_1^{+\infty} \frac{1}{2z}\,\mathrm{d}z$$
后半段反常积分为：
$$\int_1^{+\infty} \frac{1}{2z}\,\mathrm{d}z = \lim_{M\to+\infty} \frac{1}{2}\ln M = +\infty$$
该积分发散，因此数学期望 $\mathbb E[Z]$ 不存在（或称期望为正无穷大）。从独立性分解角度看，$\mathbb E[X/Y] = \mathbb E[X]\mathbb E[1/Y] = \frac{1}{2}\int_0^1 \frac{1}{y}\,\mathrm{d}y = +\infty$ 亦直接印证此结论。

常见错误做法剖析：金融与统计初学者常犯荒谬的“期望商等于商的期望”错误，声称 $\mathbb E[X/Y] = \mathbb E[X]/\mathbb E[Y] = (1/2)/(1/2) = 1$，彻底无视了反比例函数的极端厚尾效应；另一个失误是在使用商密度公式时忘记雅可比因子 $|y|$，直接将密度相除，完全脱离了测度变换的基础原理。
## 14. 

已知 $X_i\sim\operatorname{Exp}(i)$（$i=1,2,3$）相互独立，参数分别为 $\lambda_1=1, \lambda_2=2, \lambda_3=3$。
各变量的生存函数为 $\mathbb P(X_i > t) = \mathrm{e}^{-\lambda_i t}$（$t > 0$）。

记 $M = \min(X_1, X_2, X_3)$。由独立性，极小值的生存函数满足：
$$\mathbb P(M > t) = \mathbb P(X_1 > t,\; X_2 > t,\; X_3 > t) = \prod_{i=1}^3 \mathbb P(X_i > t) = \prod_{i=1}^3 \mathrm{e}^{-\lambda_i t} = \exp\left(-\sum_{i=1}^3 \lambda_i t\right) = \mathrm{e}^{-6t},\quad t > 0$$
当 $t \le 0$ 时生存函数为 $1$。由此可见，$M = \min_i X_i$ 严格服从参数为 $\lambda = 1+2+3 = 6$ 的指数分布 $\operatorname{Exp}(6)$。
其数学期望为指数分布参数的倒数：
$$\mathbb E\left[\min_i X_i\right] = \frac{1}{6}$$

计算概率 $\mathbb P(X_1 = \min_i X_i)$：
该事件等价于 $X_1 < \min(X_2, X_3)$。由指数分布性质，$\min(X_2, X_3)\sim\operatorname{Exp}(\lambda_2+\lambda_3) = \operatorname{Exp}(5)$，且与 $X_1$ 相互独立。利用全概率公式或双重积分计算：
$$\mathbb P(X_1 < \min(X_2, X_3)) = \int_0^{+\infty} f_{X_1}(t)\mathbb P(\min(X_2, X_3) > t)\,\mathrm{d}t = \int_0^{+\infty} 1\cdot\mathrm{e}^{-t}\cdot\mathrm{e}^{-5t}\,\mathrm{d}t = \int_0^{+\infty} \mathrm{e}^{-6t}\,\mathrm{d}t = \frac{1}{6}$$
（也可以直接利用独立指数竞争的经典比率结论：$\frac{\lambda_1}{\lambda_1+\lambda_2+\lambda_3} = \frac{1}{1+2+3} = \frac{1}{6}$）。

计算极大值的累积概率 $\mathbb P(\max_i X_i \le t)$：
当 $t \le 0$ 时概率为 $0$。当 $t > 0$ 时，极大值不超过 $t$ 等价于每个分量均不超过 $t$。由相互独立性：
$$\mathbb P(\max_i X_i \le t) = \mathbb P(X_1 \le t,\; X_2 \le t,\; X_3 \le t) = \prod_{i=1}^3 \mathbb P(X_i \le t) = (1 - \mathrm{e}^{-t})(1 - \mathrm{e}^{-2t})(1 - \mathrm{e}^{-3t})$$
若展开乘积式，可表示为：
$$\mathbb P(\max_i X_i \le t) = 1 - \mathrm{e}^{-t} - \mathrm{e}^{-2t} + \mathrm{e}^{-4t} + \mathrm{e}^{-5t} - \mathrm{e}^{-6t},\quad t > 0$$

常见错误做法剖析：计算极小值分布时，最典型的错误是用分布函数相乘（$\prod F_i(t)$），混淆了最小值与最大值的逻辑；在计算 $\mathbb E[\min X_i]$ 时，容易把参数值 $6$ 误当成期望，而指数分布的期望是参数的倒数 $1/6$；求 $X_1$ 为最小值的概率时，如果未利用生存函数积分，而试图列出三元重积分，往往在边界划分上出错。

## 15. 

设连续总体具有概率密度 $f(x)$ 与分布函数 $F(x)$。根据式（12.27），样本次序统计量 $(X_{(1)},\ldots,X_{(n)})$ 的联合概率密度在单纯形区域上为：
$$f_{X_{(1)},\ldots,X_{(n)}}(x_1,\ldots,x_n) = n!\prod_{i=1}^n f(x_i)\cdot\mathbf 1_{\{x_1 < x_2 < \cdots < x_n\}}$$

首先通过对 $x_2,\ldots,x_n$ 积分推出极小值 $X_{(1)}$ 的边缘密度。
固定 $x_1$，其余变量的积分区域为单调递增的无界单纯形：
$$\Omega_1 = \{(x_2,\ldots,x_n): x_1 < x_2 < x_3 < \cdots < x_n < +\infty\}$$
积分次序的选择理由：为使高维链式积分能够逐层降维，应选择从最右端的最大变量 $x_n$ 依次向左反向逐层积分。因为内层关于 $x_n$ 的积分为：
$$\int_{x_{n-1}}^{+\infty} f(x_n)\,\mathrm{d}x_n = 1 - F(x_{n-1})$$
下一层关于 $x_{n-1}$ 的积分结构为被积函数与导数的乘积：
$$\int_{x_{n-2}}^{+\infty} f(x_{n-1})\left(1 - F(x_{n-1})\right)\,\mathrm{d}x_{n-1} = \left[-\frac{(1 - F(x_{n-1}))^2}{2}\right]_{x_{n-2}}^{+\infty} = \frac{(1 - F(x_{n-2}))^2}{2}$$
依此类推，利用数学归纳法，对后 $n-1$ 个变量的逐次积分结果精确为：
$$\int_{x_1 < x_2 < \cdots < x_n} \prod_{i=2}^n f(x_i)\,\mathrm{d}x_2\cdots\mathrm{d}x_n = \frac{(1 - F(x_1))^{n-1}}{(n-1)!}$$
将此积分代回联合密度表达式：
$$f_{X_{(1)}}(x_1) = n! f(x_1)\cdot\frac{(1 - F(x_1))^{n-1}}{(n-1)!} = n f(x_1)(1 - F(x_1))^{n-1}$$
这与式（12.25）中取 $k=1$ 时的极小值次序统计量密度公式完全吻合。

其次通过对 $x_1,\ldots,x_{n-1}$ 积分推出极大值 $X_{(n)}$ 的边缘密度。
固定 $x_n$，其余变量的积分区域为：
$$\Omega_n = \{(x_1,\ldots,x_{n-1}): -\infty < x_1 < x_2 < \cdots < x_{n-1} < x_n\}$$
积分次序的选择理由：此时与前述方向相反，应当从最左端的极小变量 $x_1$ 依次向右正向逐层积分。内层关于 $x_1$ 的积分为：
$$\int_{-\infty}^{x_2} f(x_1)\,\mathrm{d}x_1 = F(x_2)$$
下一层关于 $x_2$ 的积分直接应用复合函数求导法则的原函数：
$$\int_{-\infty}^{x_3} f(x_2)F(x_2)\,\mathrm{d}x_2 = \frac{F(x_3)^2}{2}$$
依此类推，对前 $n-1$ 个变量逐次正向积分，得到：
$$\int_{-\infty < x_1 < \cdots < x_{n-1} < x_n} \prod_{i=1}^{n-1} f(x_i)\,\mathrm{d}x_1\cdots\mathrm{d}x_{n-1} = \frac{F(x_n)^{n-1}}{(n-1)!}$$
将此积分代回联合密度，消去阶乘：
$$f_{X_{(n)}}(x_n) = n! f(x_n)\cdot\frac{F(x_n)^{n-1}}{(n-1)!} = n f(x_n)F(x_n)^{n-1}$$
这与式（12.25）中取 $k=n$ 时的极大值次序统计量密度公式严格一致。

常见错误做法剖析：多重积分中最严重的误区是将有序单纯形区域 $\Omega$ 错误看作独立的直积区间，从而丢失了单纯形体积除以 $(n-1)!$ 的关键分母因子，导致积分结果凭空放大 $(n-1)!$ 倍；另一个错误是颠倒了逐次积分次序，导致积分限中交织多个自变量无法封闭求解。
## 16. 

设样本 $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Uniform}(0,1)$。

第一问（a）：取 $n=4$。
方法一：二项分布论证。
由于连续变量落在任意单点的概率为零，事件 $\{X_{(2)}\le 1/2 < X_{(3)}\}$ 发生，当且仅当在 $4$ 个独立同分布的样本中，恰有 $2$ 个样本值落在区间 $[0, 1/2]$ 内，其余 $2$ 个样本值落在区间 $(1/2, 1]$ 内。
记 $N = \sum_{i=1}^4 \mathbf 1_{\{X_i \le 1/2\}}$ 为落入 $[0,1/2]$ 的样本个数。因为各样本落在该区间的概率为 $p = 1/2$，故 $N\sim\operatorname{Binomial}(4, 1/2)$。所求概率即：
$$\mathbb P\left(X_{(2)}\le \frac{1}{2} < X_{(3)}\right) = \mathbb P(N=2) = \binom{4}{2}\left(\frac{1}{2}\right)^2\left(1 - \frac{1}{2}\right)^2 = 6\times\frac{1}{16} = \frac{3}{8}$$

方法二：次序统计量联合密度积分验证。
对于标准均匀分布，联合密度公式中 $j=2, k=3, n=4$：
$$f_{X_{(2)},X_{(3)}}(u,v) = \frac{4!}{(2-1)!(3-1-2)!(4-3)!}u^{2-1}(v-u)^0(1-v)^{4-3} = 24u(1-v),\quad 0 < u < v < 1$$
事件约束为 $u \le 1/2$ 且 $v > 1/2$。由于该矩形区域 $[0, 1/2]\times(1/2, 1]$ 内的所有点自然满足 $u < v$，积分限直接解耦：
$$\mathbb P\left(X_{(2)}\le \frac{1}{2} < X_{(3)}\right) = \int_0^{1/2} \mathrm{d}u \int_{1/2}^1 24u(1-v)\,\mathrm{d}v = 24\left(\int_0^{1/2} u\,\mathrm{d}u\right)\left(\int_{1/2}^1 (1-v)\,\mathrm{d}v\right) = 24\times\frac{1}{8}\times\frac{1}{8} = \frac{3}{8}$$
两种方法结果完全吻合。
已知均匀分布次序统计量服从 Beta 分布，即 $X_{(2)}\sim\operatorname{Beta}(2, 3)$。其期望与方差为：
$$\mathbb E\left[X_{(2)}\right] = \frac{2}{4+1} = \frac{2}{5}$$
$$\operatorname{Var}\left(X_{(2)}\right) = \frac{2\times 3}{(4+1)^2(4+2)} = \frac{6}{25\times 6} = \frac{1}{25}$$

第二问（b）：
由式（12.31），极小值与极大值的联合密度为 $f_{X_{(1)},X_{(n)}}(u,v) = n(n-1)(v-u)^{n-2}$（$0 < u < v < 1$）。
令极差 $r = v - u$，固定 $r\in(0,1)$ 时，$u$ 的变动范围为 $(0, 1-r)$。积分得到极差密度：
$$f_R(r) = \int_0^{1-r} n(n-1)r^{n-2}\,\mathrm{d}u = n(n-1)r^{n-2}(1-r),\quad 0 < r < 1$$
由此可见 $R\sim\operatorname{Beta}(n-1, 2)$。利用 Beta 分布的矩公式：
$$\mathbb E[R] = \frac{n-1}{(n-1)+2} = \frac{n-1}{n+1}$$
$$\operatorname{Var}(R) = \frac{2(n-1)}{(n+1)^2(n+2)}$$
当 $n=4$ 时，$R\sim\operatorname{Beta}(3,2)$，密度为 $f_R(r) = 12r^2(1-r)$：
$$\mathbb P\left(R > \frac{1}{2}\right) = \int_{1/2}^1 12(r^2 - r^3)\,\mathrm{d}r = 12\left[\frac{r^3}{3} - \frac{r^4}{4}\right]_{1/2}^1 = 12\left(\frac{1}{12} - \frac{5}{192}\right) = 1 - \frac{5}{16} = \frac{11}{16}$$
当 $n=5$ 时，$R\sim\operatorname{Beta}(4,2)$，密度为 $f_R(r) = 20r^3(1-r)$：
$$\mathbb P\left(R > \frac{1}{2}\right) = \int_{1/2}^1 20(r^3 - r^4)\,\mathrm{d}r = 20\left[\frac{r^4}{4} - \frac{r^5}{5}\right]_{1/2}^1 = 20\left(\frac{1}{20} - \frac{3}{320}\right) = 1 - \frac{3}{16} = \frac{13}{16}$$

常见错误做法剖析：计算次序统计量落入区间概率时，许多学生直接把密度进行极其繁重的连带二重积分，却未发现二项分布计数法能口算给出结果；在推导极差密度时，容易把换元后的积分限写错为 $(0,1)$，漏掉了 $u \le 1-r$ 的几何边界。

## 17. 

设样本 $X_1,\ldots,X_4\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$。

第一步：根据定理 12.28（指数次序统计量的 Rényi 间隔表示定理）。
定义样本间隔 $D_1 = X_{(1)}$，$D_k = X_{(k)} - X_{(k-1)}$（$k=2,3,4$）。则 $D_1, D_2, D_3, D_4$ 相互独立，且各间隔服从参数为剩余存活样本总失效率的指数分布：
$$D_k \sim \operatorname{Exp}((4-k+1)\lambda) = \operatorname{Exp}((5-k)\lambda)$$
具体分布为：$D_1\sim\operatorname{Exp}(4\lambda)$、$D_2\sim\operatorname{Exp}(3\lambda)$、$D_3\sim\operatorname{Exp}(2\lambda)$、$D_4\sim\operatorname{Exp}(\lambda)$。
将最大次序统计量表示为独立间隔之和：
$$X_{(4)} = D_1 + D_2 + D_3 + D_4$$
由数学期望的线性性质：
$$\mathbb E\left[X_{(4)}\right] = \sum_{k=1}^4 \mathbb E[D_k] = \frac{1}{4\lambda} + \frac{1}{3\lambda} + \frac{1}{2\lambda} + \frac{1}{\lambda} = \frac{1}{\lambda}\left(\frac{3+4+6+12}{12}\right) = \frac{25}{12\lambda}$$
由于各间隔相互独立，方差满足直接可加性：
$$\operatorname{Var}\left(X_{(4)}\right) = \sum_{k=1}^4 \operatorname{Var}(D_k) = \frac{1}{(4\lambda)^2} + \frac{1}{(3\lambda)^2} + \frac{1}{(2\lambda)^2} + \frac{1}{\lambda^2} = \frac{1}{\lambda^2}\left(\frac{1}{16} + \frac{1}{9} + \frac{1}{4} + 1\right) = \frac{205}{144\lambda^2}$$

第二步：根据式（12.29）直接求密度并积分验证。
总体分布函数为 $F(x) = 1 - \mathrm{e}^{-\lambda x}$，密度为 $f(x) = \lambda\mathrm{e}^{-\lambda x}$（$x > 0$）。极大值密度公式为：
$$f_{X_{(4)}}(x) = 4 F(x)^3 f(x) = 4\lambda\mathrm{e}^{-\lambda x}(1 - \mathrm{e}^{-\lambda x})^3,\quad x > 0$$
展开三次方项：
$$(1 - \mathrm{e}^{-\lambda x})^3 = 1 - 3\mathrm{e}^{-\lambda x} + 3\mathrm{e}^{-2\lambda x} - \mathrm{e}^{-3\lambda x}$$
计算数学期望积分：
$$\mathbb E\left[X_{(4)}\right] = \int_0^{+\infty} x\cdot 4\lambda\left(\mathrm{e}^{-\lambda x} - 3\mathrm{e}^{-2\lambda x} + 3\mathrm{e}^{-3\lambda x} - \mathrm{e}^{-4\lambda x}\right)\mathrm{d}x$$
利用基本积分公式 $\int_0^{+\infty} x\mathrm{e}^{-c x}\,\mathrm{d}x = \frac{1}{c^2}$，代入各指数系数：
$$\mathbb E\left[X_{(4)}\right] = 4\lambda\left(\frac{1}{\lambda^2} - 3\times\frac{1}{(2\lambda)^2} + 3\times\frac{1}{(3\lambda)^2} - \frac{1}{(4\lambda)^2}\right) = \frac{4}{\lambda}\left(1 - \frac{3}{4} + \frac{1}{3} - \frac{1}{16}\right) = \frac{4}{\lambda}\left(\frac{3}{16} + \frac{1}{3}\right) = \frac{25}{12\lambda}$$
直接积分得到的结果与间隔表示法完全一致。

常见错误做法剖析：使用 Rényi 间隔表示时，常犯错误是将失效率系数写反（误记为 $k\lambda$ 而非 $(n-k+1)\lambda$）；在展开 $(1-\mathrm{e}^{-\lambda x})^3$ 时符号交错容易弄错，或者在积分 $\int_0^{+\infty} x\mathrm{e}^{-cx}\mathrm{d}x$ 时误记为 $1/c$ 而非 $1/c^2$。
## 18. 

设联合密度为 $f_{X,Y}(x,y) = 2\cdot\mathbf 1_{\{0 < x < y < 1\}}$。

第一步：求边缘分布与条件分布。
固定 $y\in(0,1)$，对 $x$ 积分得到 $Y$ 的边缘密度：
$$f_Y(y) = \int_0^y 2\,\mathrm{d}x = 2y,\quad 0 < y < 1$$
在给定 $Y=y$ 条件下，$X$ 的条件概率密度为：
$$f_{X\mid Y}(x\mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)} = \frac{2}{2y} = \frac{1}{y},\quad 0 < x < y$$
这表明条件分布为区间 $(0,y)$ 上的连续均匀分布 $X\mid Y=y \sim \operatorname{Uniform}(0,y)$。
由均匀分布性质直接得到条件期望与条件方差：
$$\mathbb E[X\mid Y=y] = \frac{y}{2}$$
$$\operatorname{Var}(X\mid Y=y) = \frac{y^2}{12}$$

第二步：用全期望公式与全方差公式计算无条件矩。
计算 $Y$ 的各阶矩（$f_Y(y) = 2y$）：
$$\mathbb E[Y] = \int_0^1 y(2y)\,\mathrm{d}y = \left[\frac{2y^3}{3}\right]_0^1 = \frac{2}{3}$$
$$\mathbb E[Y^2] = \int_0^1 y^2(2y)\,\mathrm{d}y = \left[\frac{y^4}{2}\right]_0^1 = \frac{1}{2}$$
$$\operatorname{Var}(Y) = \mathbb E[Y^2] - (\mathbb E[Y])^2 = \frac{1}{2} - \frac{4}{9} = \frac{1}{18}$$
应用全期望公式：
$$\mathbb E[X] = \mathbb E\left[\mathbb E[X\mid Y]\right] = \mathbb E\left[\frac{Y}{2}\right] = \frac{1}{2}\mathbb E[Y] = \frac{1}{2}\times\frac{2}{3} = \frac{1}{3}$$
应用全方差公式（方差分解定律）：
$$\operatorname{Var}(X) = \mathbb E\left[\operatorname{Var}(X\mid Y)\right] + \operatorname{Var}\left(\mathbb E[X\mid Y]\right) = \mathbb E\left[\frac{Y^2}{12}\right] + \operatorname{Var}\left(\frac{Y}{2}\right)$$
代入已求得的矩：
$$\mathbb E\left[\frac{Y^2}{12}\right] = \frac{1}{12}\mathbb E[Y^2] = \frac{1}{12}\times\frac{1}{2} = \frac{1}{24}$$
$$\operatorname{Var}\left(\frac{Y}{2}\right) = \frac{1}{4}\operatorname{Var}(Y) = \frac{1}{4}\times\frac{1}{18} = \frac{1}{72}$$
相加得：
$$\operatorname{Var}(X) = \frac{1}{24} + \frac{1}{72} = \frac{3+1}{72} = \frac{4}{72} = \frac{1}{18}$$

第三步：与直接积分法对照。
先对 $y$ 积分求 $X$ 的边缘密度：
$$f_X(x) = \int_x^1 2\,\mathrm{d}y = 2(1-x),\quad 0 < x < 1$$
直接计算无条件期望与方差：
$$\mathbb E[X] = \int_0^1 x\cdot 2(1-x)\,\mathrm{d}x = 2\left(\frac{1}{2} - \frac{1}{3}\right) = \frac{1}{3}$$
$$\mathbb E[X^2] = \int_0^1 x^2\cdot 2(1-x)\,\mathrm{d}x = 2\left(\frac{1}{3} - \frac{1}{4}\right) = \frac{1}{6}$$
$$\operatorname{Var}(X) = \frac{1}{6} - \left(\frac{1}{3}\right)^2 = \frac{1}{6} - \frac{1}{9} = \frac{1}{18}$$
全公式分解计算结果与直接积分完全一致。

常见错误做法剖析：使用全方差公式时，极易混淆“条件方差的期望”与“条件期望的方差”，漏掉其中一项；在求 $f_X(x)$ 直接积分时，将下限 $x$ 误看作常数 $0$，忽视了 $x < y$ 对积分域的截断效应。

## 19. 

设二元正态向量 $(X,Y)$ 参数为 $\mu_X=0.08, \mu_Y=0.05, \sigma_X=0.20, \sigma_Y=0.15, \rho=0.5$。

根据多元正态分布的条件分布理论，条件分布 $X\mid Y=y$ 服从一维正态分布：
$$X\mid Y=y \sim N\left(\mu_{X\mid Y}(y),\; \sigma_{X\mid Y}^2\right)$$
其中条件期望与条件方差由标准高斯回归公式给出：
$$\mu_{X\mid Y}(y) = \mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y - \mu_Y)$$
$$\sigma_{X\mid Y}^2 = \sigma_X^2(1 - \rho^2)$$

代入给定数值 $y = 0.10$：
$$\mu_{X\mid Y}(0.10) = 0.08 + 0.5\times\frac{0.20}{0.15}\times(0.10 - 0.05) = 0.08 + 0.5\times\frac{4}{3}\times 0.05 = 0.08 + \frac{1}{30} = \frac{17}{150} \approx 0.1133$$
条件方差与条件标准差不依赖于具体的观测值 $y$：
$$\sigma_{X\mid Y}^2 = 0.20^2\times(1 - 0.5^2) = 0.04\times 0.75 = 0.03$$
$$\sigma_{X\mid Y} = \sqrt{0.03} = 0.1\sqrt{3} \approx 0.1732$$

计算条件概率 $\mathbb P(X < 0 \mid Y = 0.10)$：
将其标准化为标准正态变量：
$$\mathbb P(X < 0 \mid Y = 0.10) = \Phi\left(\frac{0 - \mu_{X\mid Y}}{\sigma_{X\mid Y}}\right) = \Phi\left(\frac{-\frac{17}{150}}{\frac{\sqrt{3}}{10}}\right) = \Phi\left(-\frac{17}{15\sqrt{3}}\right) = \Phi\left(-\frac{17\sqrt{3}}{45}\right) \approx \Phi(-0.6543) \approx 0.2564$$

讨论极限含义：
当 $\rho \to 1$ 时，$\sigma_{X\mid Y}^2 = \sigma_X^2(1 - \rho^2) \to 0$。条件方差趋于零意味着条件分布退化为一个确定性的常数，所有不确定性完全消失。一旦观测到 $Y=y$，$X$ 的取值几乎必然由完美的线性关系 $X = \mu_X + \frac{\sigma_X}{\sigma_Y}(Y - \mu_Y)$ 确定。
当 $\rho \to 0$ 时，$\sigma_{X\mid Y}^2 \to \sigma_X^2$，且 $\mu_{X\mid Y}(y) \to \mu_X$。这说明观测变量 $Y$ 的任何取值都不会对 $X$ 的期望与方差产生任何更新，条件分布退化回无条件边缘正态分布 $N(\mu_X, \sigma_X^2)$。在正态假定下，这完全等价于两资产收益率在统计上完全独立。

常见错误做法剖析：计算条件期望时，最常见的失误是漏乘波动率比值 $\sigma_X/\sigma_Y$，误写成 $\mu_X + \rho(y-\mu_Y)$；另一常见错误是误以为条件方差会随着观测值 $y$ 的变动而变动，混淆了同方差性与条件均值的动态变化。
## 20. 

本题推导等权投资组合的方差分解公式及最优化性质。

第一部分：证明式（12.39）。

**证明**
设 $n$ 只资产的收益率向量为 $\boldsymbol R = (R_1,\ldots,R_n)^\top$。每只资产方差均为 $\operatorname{Var}(R_i) = \sigma^2$，任意两只不同资产间协方差为 $\operatorname{Cov}(R_i, R_j) = \rho\sigma^2$（$i\neq j$）。
等权投资组合权重为 $w_i = 1/n$（$i=1,\ldots,n$）。组合收益率为 $R_p = \frac{1}{n}\sum_{i=1}^n R_i$。
利用方差的双重求和展开式：
$$\sigma_p^2 = \operatorname{Var}\left(\frac{1}{n}\sum_{i=1}^n R_i\right) = \frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^n \operatorname{Cov}(R_i, R_j)$$
将双重求和拆分为 $n$ 个对角自方差项和 $n(n-1)$ 个非对角互协方差项：
$$\sigma_p^2 = \frac{1}{n^2}\left[\sum_{i=1}^n \operatorname{Var}(R_i) + \sum_{i\neq j}\operatorname{Cov}(R_i, R_j)\right] = \frac{1}{n^2}\left[n\sigma^2 + n(n-1)\rho\sigma^2\right]$$
提取因子 $\sigma^2$ 整理：
$$\sigma_p^2 = \frac{1}{n}\sigma^2 + \frac{n-1}{n}\rho\sigma^2 = \frac{1}{n}(1-\rho)\sigma^2 + \rho\sigma^2$$
此即式（12.39）。

□

第二部分：极限与数值计算。
在式（12.39）中令资产数量 $n\to\infty$ 取极限：
$$\lim_{n\to\infty} \sigma_p^2 = \lim_{n\to\infty} \left[\frac{1}{n}(1-\rho)\sigma^2 + \rho\sigma^2\right] = \rho\sigma^2$$
第一项 $\frac{1}{n}(1-\rho)\sigma^2$ 随资产数增加衰减至零，代表可以通过充分分散化完全消除的特异性风险（非系统性风险）；而极限值 $\rho\sigma^2$ 代表资产间共同波动决定的系统性风险，无法通过简单增加资产数量来分散。
代入具体数值 $\sigma = 0.30$、$\rho = 0.4$、$n = 20$：
$$\sigma_p^2 = \frac{1}{20}\times(0.30)^2 + \frac{19}{20}\times 0.4\times(0.30)^2 = 0.09\times\left(0.05 + 0.38\right) = 0.09\times 0.43 = 0.0387$$
组合波动率为方差的算术平方根：
$$\sigma_p = \sqrt{0.0387} \approx 0.1967$$
即组合波动率约为 $19.67\%$。

第三部分：等权组合的最小方差最优性。
设任意权重向量为 $\boldsymbol w = (w_1,\ldots,w_n)^\top$ 满足约束 $\sum_{i=1}^n w_i = 1$。
在此对称结构下，协方差矩阵可表达为 $\boldsymbol\Sigma = \sigma^2(1-\rho)\boldsymbol I + \rho\sigma^2\boldsymbol 1\boldsymbol 1^\top$。
组合方差为二次型：
$$\operatorname{Var}\left(\boldsymbol w^\top\boldsymbol R\right) = \boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w = \sigma^2(1-\rho)\sum_{i=1}^n w_i^2 + \rho\sigma^2\left(\sum_{i=1}^n w_i\right)^2 = \sigma^2(1-\rho)\sum_{i=1}^n w_i^2 + \rho\sigma^2$$
由于第二项是常数 $\rho\sigma^2$，在相关系数 $\rho < 1$ 的前提下，极小化组合方差严格等价于在约束 $\sum_{i=1}^n w_i = 1$ 下极小化欧式范数平方 $\sum_{i=1}^n w_i^2$。
由柯西-施瓦茨不等式：
$$\left(\sum_{i=1}^n w_i^2\right)\left(\sum_{i=1}^n 1^2\right) \ge \left(\sum_{i=1}^n w_i\right)^2 = 1 \implies \sum_{i=1}^n w_i^2 \ge \frac{1}{n}$$
等号成立当且仅当所有权重相等，即 $w_1 = \cdots = w_n = 1/n$。
因此，在资产波动率与两两相关系数完全对称的同质假设下，等权组合必然是全局方差最小组合。

常见错误做法剖析：计算组合波动率时，部分读者在算得方差 $0.0387$ 后忘记开平方，把方差当成波动率作答；在解释分散化极限时，容易错误认为充分分散后风险可以降为零，忽视了正相关资产组合不可分散的系统性风险底线。

## 21. 

本题分析历史模拟法估计 VaR 的次序统计量性质与误差。

第一问（a）：确定次序统计量下标。
样本量 $T = 500$。设升序排列的损失样本为 $L_{(1)} \le L_{(2)} \le \cdots \le L_{(T)}$。式（12.41）定义的样本经验分位点下标为 $k = \lceil \alpha T \rceil$。
当 $\alpha = 0.95$ 时：
$$k = \lceil 0.95\times 500 \rceil = 475$$
该估计量由升序序列中的第 $475$ 项决定，即对应从大到小排序的第 $500 - 475 + 1 = 26$ 大损失。
当 $\alpha = 0.99$ 时：
$$k = \lceil 0.99\times 500 \rceil = 495$$
该估计量由升序序列中的第 $495$ 项决定，对应从大到小排序的第 $500 - 495 + 1 = 6$ 大损失。

第二问（b）：超额天数分布与估计稳定性。
设损失的真实累积分布函数为 $F_L$。对固定的损失阈值 $l$，每个交易日损失超过 $l$ 的概率恒为 $p = 1 - F_L(l)$。
定义 $T$ 个交易日内超过阈值 $l$ 的天数为 $N_l = \sum_{t=1}^T \mathbf 1_{\{L_t > l\}}$。各交易日独立同分布，因此超额天数服从二项分布：
$$N_l \sim \operatorname{Binomial}(T,\; 1 - F_L(l)) = \operatorname{Binomial}(500,\; 1 - F_L(l))$$
在估计 $\alpha=0.99$ 的分位点时，理论上预期的尾部超额天数极少，仅有 $T(1 - 0.99) = 500\times 0.01 = 5$ 天（而在 $\alpha=0.95$ 时有 $25$ 天）。
超额计数的相对标准误为 $\frac{\sqrt{T p(1-p)}}{T p} = \sqrt{\frac{1-p}{T p}}$。当 $p=0.01$ 时，相对误差高达 $\sqrt{0.99/5} \approx 44.5\%$；相比之下，$p=0.05$ 时的相对误差仅为 $\sqrt{0.95/25} \approx 19.5\%$。在有限样本中，只有 $5$ 个观测点支撑尾部，单个异常极端值的偶然出现或缺失就会剧烈扰动第 $6$ 大样本值的位置；加之极值分布在尾部密度极低，导致分位点估计产生巨大的抽样方差，因而极不稳定。

第三问（c）：正态近似下的标准差与相对标准误计算。
损失近似服从 $N(0, \sigma^2)$，日波动率 $\sigma = 0.02$。分位点为 $q_\alpha = \sigma z_\alpha$，尾部概率密度为 $f_L(q_\alpha) = \frac{1}{\sigma}\phi(z_\alpha)$。
根据式（12.42）给出的样本分位点渐近方差公式：
$$\operatorname{Var}\left(\widehat{\mathrm{VaR}}_\alpha\right) \approx \frac{\alpha(1-\alpha)}{T f_L(q_\alpha)^2} \implies \operatorname{SE}\left(\widehat{\mathrm{VaR}}_\alpha\right) \approx \frac{\sigma\sqrt{\alpha(1-\alpha)}}{\sqrt{T}\,\phi(z_\alpha)}$$
相对标准误（RSE）为标准差与理论 VaR 的比值：
$$\operatorname{RSE} = \frac{\operatorname{SE}\left(\widehat{\mathrm{VaR}}_\alpha\right)}{q_\alpha} = \frac{\sqrt{\alpha(1-\alpha)}}{\sqrt{T}\,z_\alpha\phi(z_\alpha)}$$
其中 $\sqrt{T} = \sqrt{500} \approx 22.3607$。

对于 $\alpha = 0.95$：
分位数 $z_{0.95} \approx 1.6449$，密度值 $\phi(1.6449) \approx 0.1031$。
理论 VaR 值为 $q_{0.95} = 0.02\times 1.6449 \approx 0.03290$（即 $3.290\%$）。
计算近似标准差：
$$\operatorname{SE} \approx \frac{0.02\times\sqrt{0.95\times 0.05}}{22.3607\times 0.1031} = \frac{0.02\times 0.2179}{2.3054} \approx 0.001890$$
即标准差约为 $0.189\%$，相对标准误为 $\frac{0.001890}{0.03290} \approx 5.75\%$。

对于 $\alpha = 0.99$：
分位数 $z_{0.99} \approx 2.3263$，密度值 $\phi(2.3263) \approx 0.0267$。
理论 VaR 值为 $q_{0.99} = 0.02\times 2.3263 \approx 0.04653$（即 $4.653\%$）。
计算近似标准差：
$$\operatorname{SE} \approx \frac{0.02\times\sqrt{0.99\times 0.01}}{22.3607\times 0.0267} = \frac{0.02\times 0.0995}{0.5970} \approx 0.003333$$
即标准差约为 $0.333\%$，相对标准误为 $\frac{0.003333}{0.04653} \approx 7.16\%$。
计算结果定量证实了：置信度由 $95\%$ 提高到 $99\%$ 时，估计标准差显著跃升，精度的劣化速度极快。

常见错误做法剖析：在确定次序统计量由“第几大”决定时，容易混淆升序序号 $k$ 与倒数排序，将第 $475$ 项误写为第 $25$ 大而非第 $500-475+1=26$ 大；在求渐近标准差时，漏将分母中的密度项转换，误用标准正态密度而遗漏了尺度参数 $\sigma$。
## 22. 

本题系统考查 Copula 理论的界限、经典联结函数及与相关性测度的内在联系。

第一问（a）：证明 Fréchet-Hoeffding 上下界不等式。

**证明**
设 $C(u,v)$ 为任意二元 Copula，由 Sklar 定理，它是边缘分布为标准均匀分布 $U,V\sim\operatorname{Uniform}(0,1)$ 的联合累积分布函数，即 $C(u,v) = \mathbb P(U \le u,\; V \le v)$。
首先证明上界 $C(u,v) \le M(u,v) = \min(u,v)$：
因为事件交包含于单事件中，即 $\{U \le u,\; V \le v\} \subseteq \{U \le u\}$，由测度单调性：
$$\mathbb P(U \le u,\; V \le v) \le \mathbb P(U \le u) = u$$
同理 $\{U \le u,\; V \le v\} \subseteq \{V \le v\}$ 导致：
$$\mathbb P(U \le u,\; V \le v) \le \mathbb P(V \le v) = v$$
综合两式必有：
$$C(u,v) \le \min(u,v) = M(u,v)$$

其次证明下界 $W(u,v) = \max(u+v-1,\; 0) \le C(u,v)$：
由概率测度非负性，$C(u,v) = \mathbb P(U \le u,\; V \le v) \ge 0$ 恒成立。
再由对立事件的概率可加性与次可加性（Boole 不等式）：
$$\mathbb P(U \le u,\; V \le v) = 1 - \mathbb P(\{U > u\} \cup \{V > v\}) \ge 1 - \left[\mathbb P(U > u) + \mathbb P(V > v)\right]$$
代入标准均匀分布的补事件概率：
$$1 - \left[(1 - u) + (1 - v)\right] = 1 - (2 - u - v) = u + v - 1$$
因此 $C(u,v) \ge u + v - 1$。
结合非负性，必然有：
$$C(u,v) \ge \max(u+v-1,\; 0) = W(u,v)$$
综合以上两方面，即证对任意 Copula 恒有 $W(u,v) \le C(u,v) \le M(u,v)$。

□

第二问（b）：
若 $(U,V)$ 服从独立 Copula $\Pi(u,v) = uv$。
由联合分布因式分解可知 $U$ 与 $V$ 相互独立。令 $X = \Phi^{-1}(U)$ 与 $Y = \Phi^{-1}(V)$。
由概率积分变换性质，标准正态分布函数的反函数将标准均匀变量映射为标准正态变量，故 $X\sim N(0,1)$ 且 $Y\sim N(0,1)$。
因为独立随机变量的博雷尔可测函数依然相互独立，故 $X$ 与 $Y$ 相互独立。两独立标准正态变量的协方差为零，因此 Pearson 线性相关系数为：
$$\rho_{X,Y} = 0$$

第三问（c）：
若 $(U,V)$ 服从上 Fréchet-Hoeffding 界 $M(u,v) = \min(u,v)$，此即同调共单调（comonotonicity）情形。
在共单调 Copula 下，两均匀分量几乎必然完全相等，即 $\mathbb P(U = V) = 1$。
因为反函数 $\Phi^{-1}$ 在 $(0,1)$ 上严格单调递增，将 $U=V$ 代入得到：
$$X = \Phi^{-1}(U) = \Phi^{-1}(V) = Y$$
几乎必然成立。这意味着 $X$ 与 $Y$ 是完全相同的正态随机变量，其协方差等于方差，Pearson 线性相关系数达到理论最大值：
$$\rho_{X,Y} = \rho_{X,X} = 1$$

第四问（d）：
构造一个 Copula 与边缘分布的组合使 $\rho_{X,Y}=0$ 而 Kendall $\tau \neq 0$：
取边缘分布均为标准均匀分布，即 $X = U \sim \operatorname{Uniform}(0,1)$ 与 $Y = V \sim \operatorname{Uniform}(0,1)$。
此时 Pearson 线性相关系数精确等于该 Copula 对应的 Spearman 秩相关系数：
$$\rho_{X,Y} = \rho(U,V) = \rho_s = 12\int_0^1\int_0^1 [C(u,v) - uv]\,\mathrm{d}u\,\mathrm{d}v$$
考虑一个不对称的扰动 Copula 或分块拼贴 Copula（例如在正方形的四个子象限中分别赋予具有非零同调与反调的不对称扰动项），使得积分 $\int_0^1\int_0^1 [C(u,v) - uv]\,\mathrm{d}u\,\mathrm{d}v = 0$。在此构造下，由于正负象限面积积分完全抵消，Pearson 线性相关系数严格为零，即 $\rho_{X,Y} = 0$。
然而，Kendall 秩相关系数定义为一致对与不一致对的概率差：
$$\tau = 4\int_0^1\int_0^1 C(u,v)\,\mathrm{d}C(u,v) - 1$$
它是基于联合测度 $C$ 自身的积分，加权方式与勒贝格平权测度 $\mathrm{d}u\,\mathrm{d}v$ 完全不同。在上述正负相消的 Copula 下，观测对在局部的单调一致性概率并不平衡，由此直接得出 $\tau \neq 0$。
解释为何不矛盾：
第一，测度对象不同。Pearson 相关系数 $\rho_{X,Y}$ 度量的是两变量之间的“严格线性依赖关系”，其数值强力依赖于边缘分布的具体形态（尺度、厚尾与几何拉伸）；而 Kendall $\tau$ 是“非参数秩相关系数”，度量的是变量间单调增减趋势的一致性，在任意严格单调增变换下保持不变。
第二，零相关与独立的本质差异。$\rho_{X,Y}=0$ 仅代表一阶线性协方差为零，变量间完全可以存在极强的非线性关联甚至非线性单调趋势。因此，线性无相关（$\rho_{X,Y}=0$）与秩序存在显著一致性倾斜（$\tau \neq 0$）在概率统计逻辑上完全相容、互不排斥。

常见错误做法剖析：证明 Fréchet-Hoeffding 下界时，很多推导将 $u+v-1$ 的来源写错，未能借助集合补集的并集概率次可加性（Boole 不等式）进行严密放缩；在解释 $\rho_{X,Y}=0$ 与 $\tau\neq 0$ 时，容易将 Kendall $\tau$ 误当成线性度量，误以为只要 $\rho=0$ 所有相关性指标都必须为零，忽视了秩相关与线性相关的根本定义分歧。