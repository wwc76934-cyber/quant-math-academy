# 第3章　多元微积分、多重积分与常微分方程

多元函数把多个输入同时映射到输出，其变化不能只用一条切线描述，而需要用线性映射、切平面或 Jacobian 矩阵描述。多元微积分的三个核心问题是：输出对各方向输入如何变化，多个区域上的量如何累积，以及含有未知函数及其导数的动态方程如何求解。

本章先区分偏导数、方向导数与可微性，再建立链式法则、二阶 Taylor 公式、Hessian 判别和隐函数求导。多重积分部分以 Fubini 定理和变量替换公式为主线，常微分方程部分则讨论可分离方程、一阶线性方程、存在唯一性及常见动态模型。这些内容以后将直接服务于联合密度变换、矩阵优化、均值回复模型和随机微分方程。

## 3.1 偏导数、方向导数与可微性

### 3.1.1 多元函数的可微性

设 $f:D\subseteq\mathbb R^n\to\mathbb R$，$\boldsymbol a$ 为 $D$ 的内点。$f$ 对第 $i$ 个变量的偏导数定义为

$$
\frac{\partial f}{\partial x_i}(\boldsymbol a)
=\lim_{h\to0}\frac{f(\boldsymbol a+h\boldsymbol e_i)-f(\boldsymbol a)}h,
$$

其中 $\boldsymbol e_i$ 是第 $i$ 个标准基向量。偏导数只考察沿坐标轴方向的变化。

对单位向量 $\boldsymbol u$，若极限

$$
D_{\boldsymbol u}f(\boldsymbol a)
=\lim_{t\to0}\frac{f(\boldsymbol a+t\boldsymbol u)-f(\boldsymbol a)}t
$$

存在，则称其为 $f$ 在 $\boldsymbol a$ 处沿 $\boldsymbol u$ 的方向导数。偏导存在仍不足以控制任意方向，更不足以保证函数连续。

**定义 3.1（可微性）**

若存在线性映射 $L:\mathbb R^n\to\mathbb R$，使

$$
f(\boldsymbol a+\boldsymbol h)
=f(\boldsymbol a)+L(\boldsymbol h)+o(\lVert\boldsymbol h\rVert),
\qquad \boldsymbol h\to\boldsymbol0,
\tag{3.1}
$$

则称 $f$ 在 $\boldsymbol a$ 处可微。$L$ 称为 $f$ 在该点的微分，记为 $Df(\boldsymbol a)$。

$o(\lVert\boldsymbol h\rVert)$ 表示余项除以 $\lVert\boldsymbol h\rVert$ 后趋于 $0$。可微的本质是：函数在一点附近能由线性映射近似，而且误差比位移本身更高阶。

**定理 3.2（可微的基本推论）**

若 $f$ 在 $\boldsymbol a$ 处可微，则 $f$ 在该点连续，各偏导数和各方向导数存在，并且

$$
D_{\boldsymbol u}f(\boldsymbol a)=Df(\boldsymbol a)[\boldsymbol u].
$$

**证明**

由式（3.1），当 $\boldsymbol h\to\boldsymbol0$ 时，$L(\boldsymbol h)\to0$ 且余项趋于 $0$，所以函数增量趋于 $0$，连续性得证。取 $\boldsymbol h=t\boldsymbol u$，则

$$
f(\boldsymbol a+t\boldsymbol u)-f(\boldsymbol a)
=tL(\boldsymbol u)+o(|t|).
$$

两边除以 $t$ 并令 $t\to0$，得到 $D_{\boldsymbol u}f(\boldsymbol a)=L(\boldsymbol u)$。取 $\boldsymbol u=\boldsymbol e_i$ 即得偏导数存在。

□

**定理 3.3（连续偏导数蕴含可微）**

若 $f$ 在 $\boldsymbol a$ 的某邻域内各偏导数存在且连续，则 $f$ 在 $\boldsymbol a$ 处可微，并且

$$
Df(\boldsymbol a)[\boldsymbol h]
=\sum_{i=1}^n\frac{\partial f}{\partial x_i}(\boldsymbol a)h_i.
$$

**证明**

以二维为例。把函数增量拆成先后改变两个坐标：

$$
\begin{aligned}
&f(a_1+h_1,a_2+h_2)-f(a_1,a_2)\\
&=\bigl[f(a_1+h_1,a_2+h_2)-f(a_1+h_1,a_2)\bigr]
+\bigl[f(a_1+h_1,a_2)-f(a_1,a_2)\bigr].
\end{aligned}
$$

分别对第二、第一个变量使用一元中值定理，存在 $\xi_1,\xi_2$ 使增量等于

$$
f_{x_2}(\xi_2)h_2+f_{x_1}(\xi_1)h_1.
$$

再写成 $f_{x_1}(\boldsymbol a)h_1+f_{x_2}(\boldsymbol a)h_2$ 加上偏导数差值乘以 $h_i$。由偏导数连续和 $|h_i|\le\lVert\boldsymbol h\rVert$，这些附加项除以 $\lVert\boldsymbol h\rVert$ 后趋于 $0$。多维情形沿坐标逐维拆分即可。

□

**例 3.1**

设

$$
f(x,y)=
\begin{cases}
\dfrac{xy}{x^2+y^2},&(x,y)\ne(0,0),\\
0,&(x,y)=(0,0).
\end{cases}
$$

考察其在原点的偏导数、连续性与可微性。

**解**

由 $f(x,0)=f(0,y)=0$，有 $f_x(0,0)=f_y(0,0)=0$。但沿直线 $y=x$ 且 $x\to0$，有

$$
f(x,x)=\frac{x^2}{2x^2}=\frac12,
$$

不趋于 $f(0,0)=0$。所以函数在原点不连续，更不可能可微。此例说明“两个偏导数存在”甚至不能保证连续，更不能代替可微性。

## 3.2 梯度、Jacobian、链式法则与 Hessian

若 $f:\mathbb R^n\to\mathbb R$ 可微，其**梯度**为

$$
\nabla f=\left(f_{x_1},\ldots,f_{x_n}\right)^\top.
$$

于是 $Df(\boldsymbol a)[\boldsymbol h]=\nabla f(\boldsymbol a)^\top\boldsymbol h$。若 $f:\mathbb R^n\to\mathbb R^m$，则其 **Jacobian 矩阵**由

$$
\boldsymbol J_f=
\begin{pmatrix}
\partial f_1/\partial x_1&\cdots&\partial f_1/\partial x_n\\
\vdots&\ddots&\vdots\\
\partial f_m/\partial x_1&\cdots&\partial f_m/\partial x_n
\end{pmatrix}
$$

定义，局部微分为 $\boldsymbol J_f(\boldsymbol a)\boldsymbol h$。

**定理 3.4（多元链式法则）**

若 $\boldsymbol g$ 在 $\boldsymbol a$ 可微，$\boldsymbol f$ 在 $\boldsymbol g(\boldsymbol a)$ 可微，则复合函数 $\boldsymbol f\circ\boldsymbol g$ 在 $\boldsymbol a$ 可微，且

$$
\boldsymbol J_{\boldsymbol f\circ\boldsymbol g}(\boldsymbol a)
=\boldsymbol J_{\boldsymbol f}(\boldsymbol g(\boldsymbol a))
\boldsymbol J_{\boldsymbol g}(\boldsymbol a).
\tag{3.2}
$$

**证明**

由可微性，

$$
\boldsymbol g(\boldsymbol a+\boldsymbol h)
=\boldsymbol g(\boldsymbol a)+\boldsymbol J_{\boldsymbol g}\boldsymbol h+o(\lVert\boldsymbol h\rVert).
$$

记 $\boldsymbol k=\boldsymbol J_{\boldsymbol g}\boldsymbol h+o(\lVert\boldsymbol h\rVert)$，则 $\lVert\boldsymbol k\rVert=O(\lVert\boldsymbol h\rVert)$。再由 $\boldsymbol f$ 的可微性，

$$
\boldsymbol f(\boldsymbol g(\boldsymbol a+\boldsymbol h))
=\boldsymbol f(\boldsymbol g(\boldsymbol a))
+\boldsymbol J_{\boldsymbol f}\boldsymbol k+o(\lVert\boldsymbol k\rVert).
$$

代入 $\boldsymbol k$，所有含余项的部分仍为 $o(\lVert\boldsymbol h\rVert)$，故得到式（3.2）。

□

**例 3.2**

设 $z=\mathrm e^{xy}$，$x=t^2$、$y=\sin t$，求 $dz/dt$。

**解**

由链式法则，

$$
\frac{dz}{dt}
=\frac{\partial z}{\partial x}\frac{dx}{dt}
+\frac{\partial z}{\partial y}\frac{dy}{dt}
=y\mathrm e^{xy}(2t)+x\mathrm e^{xy}\cos t.
$$

代回 $x=t^2$、$y=\sin t$，得

$$
\frac{dz}{dt}
=\mathrm e^{t^2\sin t}\left(2t\sin t+t^2\cos t\right).
$$

若 $f$ 有二阶连续偏导数，则混合偏导数相等：$f_{x_ix_j}=f_{x_jx_i}$。其 **Hessian 矩阵**为 $\boldsymbol H_f=(f_{x_ix_j})_{n\times n}$。

**定理 3.5（二阶 Taylor 公式）**

若 $f$ 在 $\boldsymbol a$ 的邻域内二阶连续可微，则

$$
f(\boldsymbol a+\boldsymbol h)
=f(\boldsymbol a)+\nabla f(\boldsymbol a)^\top\boldsymbol h
+\frac12\boldsymbol h^\top\boldsymbol H_f(\boldsymbol a)\boldsymbol h
+o(\lVert\boldsymbol h\rVert^2).
\tag{3.3}
$$

**证明**

令 $\phi(t)=f(\boldsymbol a+t\boldsymbol h)$。对 $\phi$ 在 $t=0$ 处使用一元二阶 Taylor 公式。链式法则给出

$$
\phi'(0)=\nabla f(\boldsymbol a)^\top\boldsymbol h,
\qquad
\phi''(0)=\boldsymbol h^\top\boldsymbol H_f(\boldsymbol a)\boldsymbol h.
$$

由 $\phi(1)=\phi(0)+\phi'(0)+\phi''(0)/2+o(1)$（对固定方向的二次余项并使用二阶导数连续性）得到式（3.3）。

□

**定理 3.6（二阶必要条件与充分判别）**

设 $f$ 二阶连续可微，$\boldsymbol a$ 为驻点，即 $\nabla f(\boldsymbol a)=\boldsymbol0$。若 $\boldsymbol a$ 是局部极小点，则 $\boldsymbol H_f(\boldsymbol a)$ 半正定；若 Hessian 正定，则 $\boldsymbol a$ 是严格局部极小点。局部极大对应半负定必要条件和负定充分条件；若 Hessian 同时有正、负方向，则该点为鞍点。

**证明**

若 $\boldsymbol a$ 为局部极小点而某个方向满足 $\boldsymbol h^\top\boldsymbol H\boldsymbol h<0$，由式（3.3）及梯度为零，沿该方向取足够小的 $t\boldsymbol h$，函数增量为负，矛盾。反之，若 Hessian 正定，单位球面上的连续函数 $\boldsymbol u^\top\boldsymbol H\boldsymbol u$ 有正最小值 $\lambda_{\min}>0$，故

$$
f(\boldsymbol a+\boldsymbol h)-f(\boldsymbol a)
\ge\frac{\lambda_{\min}}2\lVert\boldsymbol h\rVert^2+o(\lVert\boldsymbol h\rVert^2)>0
$$

对足够小的 $\boldsymbol h\ne0$ 成立。极大情形对 $-f$ 应用即可；若存在两个方向使二次型异号，沿两方向分别得到函数增大和减小，故为鞍点。

□

半正定或半负定不是充分条件。例如 $f(x,y)=x^2+y^3$ 在原点的 Hessian 半正定，但沿 $y<0$ 函数值减小，原点不是极小点。

**例 3.3**

求 $f(x,y)=x^2+xy+y^2-2x$ 的驻点及其类型。

**解**

梯度方程为

$$
2x+y-2=0,\qquad x+2y=0.
$$

由第二式 $x=-2y$，代入得 $-4y+y-2=0$，故 $y=-2/3$、$x=4/3$。Hessian 为

$$
\boldsymbol H=\begin{pmatrix}2&1\\1&2\end{pmatrix}.
$$

对任意非零 $(u,v)$，

$$
(u,v)\boldsymbol H(u,v)^\top
=2u^2+2uv+2v^2
=u^2+v^2+(u+v)^2>0.
$$

故 Hessian 正定，该驻点为严格局部极小点。由于函数是正定二次型加一次项，它也是全局最小点。

## 3.3 隐函数与反函数

方程 $F(x,y)=0$ 有时不能把 $y$ 显式解成 $x$ 的初等表达式，但仍可能在局部把 $y$ 看作 $x$ 的函数。

**定理 3.7（隐函数定理）**

设 $F$ 在 $(a,b)$ 的邻域内连续可微，$F(a,b)=0$，且 $F_y(a,b)\ne0$。则存在 $a$ 的邻域 $U$ 和 $b$ 的邻域 $V$，以及唯一连续可微函数 $y=g(x)$，使 $g(a)=b$ 且

$$
F(x,g(x))=0,\qquad x\in U.
$$

并且

$$
g'(x)=-\frac{F_x(x,g(x))}{F_y(x,g(x))}.
\tag{3.4}
$$

**证明思路及依赖说明**

完整存在性证明通常使用压缩映射定理或构造逐次逼近序列，所需工具超出本章范围。这里说明可微性与导数公式的来源：若局部可微函数 $g$ 已存在，对 $F(x,g(x))=0$ 使用链式法则，得

$$
F_x+F_yg'(x)=0.
$$

在 $F_y\ne0$ 的邻域内即可解出式（3.4）。非零偏导条件正是局部解不被“折叠”的关键。

□

多元形式中，若 $\boldsymbol F:\mathbb R^n\times\mathbb R^m\to\mathbb R^m$，且关于后 $m$ 个变量的 Jacobian 方阵可逆，则后 $m$ 个变量可在局部唯一表示为前 $n$ 个变量的函数。反函数定理是隐函数定理的特例：若 $\boldsymbol f$ 连续可微且 $\boldsymbol J_{\boldsymbol f}(\boldsymbol a)$ 可逆，则 $\boldsymbol f$ 在局部有连续可微反函数，且反函数 Jacobian 为原 Jacobian 的逆矩阵。

**例 3.4**

对单位圆 $x^2+y^2-1=0$，在点 $(0,1)$ 附近求 $dy/dx$，并说明在 $(1,0)$ 附近为何不能把 $y$ 局部表示为 $x$ 的光滑函数。

**解**

令 $F=x^2+y^2-1$。在 $(0,1)$ 处 $F_y=2\ne0$，隐函数定理适用，且

$$
\frac{dy}{dx}=-\frac{F_x}{F_y}=-\frac{x}{y}.
$$

在 $(0,1)$ 处导数为 $0$。在 $(1,0)$ 处 $F_y=0$，条件失效；事实上圆在该点附近对同一个 $x<1$ 有正负两个 $y$ 分支，不能选择为单一函数 $y(x)$。

## 3.4 二重积分与 Fubini 定理

设 $R=[a,b]\times[c,d]$，$f$ 在 $R$ 上有界。用分割把 $R$ 分成小矩形 $R_{ij}$，面积记为 $\Delta A_{ij}$，在每个小矩形上取函数下确界 $m_{ij}$ 与上确界 $M_{ij}$，可像一元情形一样定义下和、上和与可积性。

**定义 3.8（二重积分）**

若分割加细时下和与上和趋于共同值 $I$，则称 $f$ 在 $R$ 上 Riemann 可积，并记

$$
\iint_R f(x,y)\,dA=I.
\tag{3.5}
$$

连续函数在闭矩形上可积。对有界闭区域 $D$，若边界足够规则，可通过在包含 $D$ 的矩形上定义 $f\boldsymbol1_D$ 来积分，其中 $\boldsymbol1_D$ 在 $D$ 内为 $1$、在 $D$ 外为 $0$。

**定理 3.9（Fubini 定理的连续函数形式）**

若 $f$ 在 $R=[a,b]\times[c,d]$ 上连续，则

$$
\iint_R f(x,y)\,dA
=\int_a^b\left(\int_c^d f(x,y)\,dy\right)dx
=\int_c^d\left(\int_a^b f(x,y)\,dx\right)dy.
\tag{3.6}
$$

**证明思路**

对 $x,y$ 分别作等分，二重 Riemann 和可写成

$$
\sum_i\sum_j f(x_i^*,y_j^*)\Delta x_i\Delta y_j
=\sum_i\left(\sum_j f(x_i^*,y_j^*)\Delta y_j\right)\Delta x_i.
$$

内层是一元积分的 Riemann 和，外层又是关于 $x$ 的 Riemann 和。连续性提供一致连续性，从而保证极限可交换。更一般的可积函数版本需要额外处理截面可积性和零测集，不能仅凭形式等式随意换序。

□

**例 3.5**

计算

$$
\iint_D(x+y)\,dA,
\qquad D=\{(x,y):0\le x\le1,\ 0\le y\le x\}.
$$

**解**

先对 $y$ 积分：

$$
\begin{aligned}
\iint_D(x+y)\,dA
&=\int_0^1\int_0^x(x+y)\,dy\,dx\\
&=\int_0^1\left[xy+\frac{y^2}{2}\right]_{y=0}^{y=x}dx\\
&=\int_0^1\frac32x^2dx=\frac12.
\end{aligned}
$$

积分区域也可写成 $0\le y\le1$、$y\le x\le1$，于是换序后为

$$
\int_0^1\int_y^1(x+y)\,dx\,dy,
$$

计算同样得到 $1/2$。换序的关键是重新描述区域，而不是只交换积分符号。

## 3.5 多重积分的变量替换

一元换元中的伸缩因子在多维情形由 Jacobian 行列式给出。

**定理 3.10（变量替换公式）**

设 $\boldsymbol T:U\to V$ 在区域上连续可微、除零测集外为一一映射，且 Jacobian 行列式非零。若 $f$ 可积，则

$$
\iint_V f(x,y)\,dx\,dy
=\iint_U f(\boldsymbol T(u,v))
\left|\det\boldsymbol J_{\boldsymbol T}(u,v)\right|\,du\,dv.
\tag{3.7}
$$

**证明思路**

可微映射在小区域上近似为线性映射。线性映射把面积元放大 $\left|\det\boldsymbol J_{\boldsymbol T}\right|$ 倍，因此小像区域的面积约为该因子乘原区域面积。把这些局部估计求和并取极限，就得到式（3.7）。严格证明需要划分区域、控制边界误差并处理非一一映射部分。

□

极坐标变换 $x=r\cos\theta$、$y=r\sin\theta$ 的 Jacobian 为

$$
\left|\det\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}\right|=r,
$$

所以

$$
dx\,dy=r\,dr\,d\theta.
\tag{3.8}
$$

遗漏因子 $r$ 会把面积元错误地当成 $dr\,d\theta$。

**例 3.6**

计算单位圆盘上 $x^2+y^2$ 的积分。

**解**

在极坐标下，$x^2+y^2=r^2$，区域为 $0\le r\le1$、$0\le\theta\le2\pi$。故

$$
\iint_D(x^2+y^2)\,dA
=\int_0^{2\pi}\int_0^1r^2\cdot r\,dr\,d\theta
=2\pi\cdot\frac14=\frac\pi2.
$$

**例 3.7（Gauss 积分）**

证明

$$
I=\int_{-\infty}^{\infty}\mathrm e^{-x^2}dx=\sqrt\pi.
$$

**解**

积分收敛，因为 $\mathrm e^{-x^2}$ 在 $[-1,1]$ 上有界，而 $|x|\ge1$ 时 $\mathrm e^{-x^2}\le\mathrm e^{-|x|}$。将 $I^2$ 写成二维积分并用极坐标：

$$
\begin{aligned}
I^2
&=\iint_{\mathbb R^2}\mathrm e^{-(x^2+y^2)}dx\,dy\\
&=\lim_{R\to\infty}\int_0^{2\pi}\int_0^R\mathrm e^{-r^2}r\,dr\,d\theta\\
&=2\pi\lim_{R\to\infty}\left[-\frac12\mathrm e^{-r^2}\right]_0^R
=\pi.
\end{aligned}
$$

由于 $I>0$，得 $I=\sqrt\pi$。一维中难以处理的问题，通过二维化和适当的面积元变得可计算。

## 3.6 常微分方程的基本类型

**定义 3.11（常微分方程与解）**

含有未知函数及其导数的方程称为**常微分方程**（ordinary differential equation, ODE）。在某区间上具有所需阶导数并代入方程后恒成立的函数称为该区间上的解。

一阶方程通常写成 $y'=F(x,y)$。初始条件 $y(x_0)=y_0$ 用来从通解族中选定特解，但初值问题是否唯一，需要额外条件。

### 3.6.1 可分离变量方程

若方程可写成

$$
\frac{dy}{dx}=f(x)g(y),
\tag{3.9}
$$

在 $g(y)\ne0$ 的区间上，可写成

$$
\frac{dy}{g(y)}=f(x)dx,
$$

再两边积分：

$$
\int\frac{dy}{g(y)}=\int f(x)dx+C.
$$

除以 $g(y)$ 可能丢失满足 $g(y)=0$ 的平衡解，必须单独检查。

**例 3.8**

解 Logistic 方程

$$
y'=ry\left(1-\frac yK\right),\qquad r,K>0,\quad 0<y(0)<K.
$$

**解**

分离变量：

$$
\frac{K}{y(K-y)}dy=r\,dx.
$$

由部分分式 $K/[y(K-y)]=1/y+1/(K-y)$，积分得

$$
\ln|y|-\ln|K-y|=rx+C.
$$

在 $0<y<K$ 的解区间内可去掉绝对值并写成

$$
\frac y{K-y}=A\mathrm e^{rx},\qquad A=\frac{y_0}{K-y_0}.
$$

解出

$$
y(x)=\frac{K}{1+(K/y_0-1)\mathrm e^{-rx}}.
$$

另有平衡解 $y=0$ 和 $y=K$，不能遗漏。对 $0<y_0<K$，当 $x\to\infty$ 时 $y(x)\to K$。

### 3.6.2 一阶线性方程

**定理 3.12（积分因子法）**

一阶线性方程

$$
y'+p(x)y=q(x)
$$

可通过积分因子 $\mu(x)=\exp(\int p(x)dx)$ 化为

$$
(\mu y)'=\mu q,
$$

从而

$$
y(x)=\frac1{\mu(x)}\left(\int\mu(x)q(x)dx+C\right).
\tag{3.10}
$$

**证明**

由乘积求导和 $\mu'=p\mu$，

$$
(\mu y)'=\mu y'+\mu'y=\mu(y'+py)=\mu q.
$$

积分并除以 $\mu$ 即得式（3.10）。积分因子在区间上非零，所以除以它是合法的。

□

**例 3.9（均值回复的确定性骨架）**

解初值问题

$$
y'=-\kappa(y-\theta),\qquad y(0)=y_0,\qquad \kappa>0.
$$

**解**

方程可写为 $y'+\kappa y=\kappa\theta$，积分因子为 $\mathrm e^{\kappa x}$。于是

$$
(\mathrm e^{\kappa x}y)'=\kappa\theta\mathrm e^{\kappa x}.
$$

积分得

$$
\mathrm e^{\kappa x}y=\theta\mathrm e^{\kappa x}+C.
$$

由初值得 $C=y_0-\theta$，故

$$
y(x)=\theta+(y_0-\theta)\mathrm e^{-\kappa x}.
$$

当 $x\to\infty$ 时，$y(x)\to\theta$；偏离均值的幅度按指数衰减。令偏离量减半，可解得半衰期为 $\ln2/\kappa$。

### 3.6.3 存在唯一性与反例

**定理 3.13（Picard–Lindelöf 定理）**

设 $F(x,y)$ 在 $(x_0,y_0)$ 附近的闭矩形上连续，并关于 $y$ 满足局部 Lipschitz 条件：存在 $L$ 使

$$
|F(x,y_1)-F(x,y_2)|\le L|y_1-y_2|.
$$

则存在包含 $x_0$ 的区间，使初值问题 $y'=F(x,y)$、$y(x_0)=y_0$ 在该区间上有唯一解。

**证明思路及依赖说明**

把微分方程写成等价的积分方程

$$
y(x)=y_0+\int_{x_0}^xF(t,y(t))dt,
$$

并构造 Picard 迭代

$$
y_{n+1}(x)=y_0+\int_{x_0}^xF(t,y_n(t))dt.
$$

Lipschitz 条件使迭代在足够短的区间上成为压缩映射，压缩映射定理保证唯一不动点存在。完整证明依赖函数空间上的一致收敛与压缩映射定理，本章不展开。

□

若 $F$ 关于 $y$ 连续可微，则偏导数在闭矩形上有界，由中值定理可推出局部 Lipschitz 条件。仅有连续性并不足以保证唯一性。例如

$$
y'=\sqrt{|y|},\qquad y(0)=0
$$

有零解 $y(x)=0$，也有对任意 $c>0$ 定义的解：在 $x<c$ 时取 $0$，在 $x\ge c$ 时取 $(x-c)^2/4$。右端 $\sqrt{|y|}$ 在 $y=0$ 附近不满足关于 $y$ 的 Lipschitz 条件。

### 3.6.4 二阶常系数线性方程

方程

$$
ay''+by'+cy=0,\qquad a\ne0
\tag{3.11}
$$

可通过试解 $y=\mathrm e^{\lambda x}$ 得到特征方程 $a\lambda^2+b\lambda+c=0$。两个不同实根 $\lambda_1,\lambda_2$ 给出通解 $C_1\mathrm e^{\lambda_1x}+C_2\mathrm e^{\lambda_2x}$；重根 $\lambda$ 给出 $(C_1+C_2x)\mathrm e^{\lambda x}$；共轭复根 $\alpha\pm i\beta$ 给出

$$
\mathrm e^{\alpha x}\left(C_1\cos\beta x+C_2\sin\beta x\right).
$$

这些结论来自解空间的线性结构和两个解的线性无关性；在振荡与阻尼模型中，特征根的实部决定衰减或增长，虚部决定振荡频率。

## 本章小结

多元可微性要求函数增量能够由线性映射近似到一阶以上，偏导数存在只是必要条件，连续偏导数则提供常用的充分条件。链式法则把局部线性映射复合为 Jacobian 乘积，二阶 Taylor 公式把 Hessian 与局部极值联系起来。隐函数定理把方程可解性转化为 Jacobian 非退化条件。

多重积分通过分割和 Riemann 和定义，Fubini 定理把区域积分化为累次积分，变量替换则以 Jacobian 行列式修正体积。常微分方程部分形成从计算到理论的两条路径：分离变量和积分因子用于求显式解，Picard–Lindelöf 定理用于回答解是否存在、是否唯一。后续概率密度变换、最优化和随机动态模型都建立在这些工具之上。

## 习题

1. 求 $f(x,y)=x^2y+\mathrm e^{xy}$ 的两个一阶偏导数和 Hessian 矩阵。
2. 设 $f(0,0)=0$，且 $f(x,y)=xy^2/(x^2+y^4)$（原点外）。证明两个一阶偏导数在原点存在，但函数沿某些路径的极限与沿坐标轴不同，从而不连续。
3. 用定义证明 $f(x,y)=x^2+y^2$ 在任意点可微，并写出其微分。
4. 设 $f$ 在 $\boldsymbol a$ 可微，$\nabla f(\boldsymbol a)\ne\boldsymbol0$。求所有单位方向中方向导数的最大值、最小值及取得这些值的方向。
5. 设 $z=x^2\ln y$，$x=u+v$、$y=uv$（$u,v>0$）。用链式法则求 $\partial z/\partial u$ 与 $\partial z/\partial v$。
6. 写出 $f(x,y)=\ln(1+x+y)$ 在 $(0,0)$ 处的二阶 Taylor 多项式。
7. 求 $f(x,y)=x^3+y^3-3xy$ 的两个驻点，并用 Hessian 判断其类型。
8. 对方程 $x\mathrm e^y+y\mathrm e^x=1$ 在点 $(0,1)$ 附近确定的隐函数 $y=y(x)$，求 $y'(0)$。
9. 设 $\boldsymbol F(x,y)=(x+y,x-y)$。证明其在任意点附近都有光滑反函数，并求反函数及其 Jacobian。
10. 计算 $\int_0^1\int_0^2(3x^2y+1)\,dy\,dx$。
11. 交换积分次序并计算
    $$\int_0^1\int_y^1\frac{y}{1+x^2}\,dx\,dy.$$
12. 计算圆盘 $x^2+y^2\le4$ 上 $\mathrm e^{-(x^2+y^2)}$ 的二重积分。
13. 利用极坐标计算第一象限中区域 $1\le x^2+y^2\le4$ 的面积。
14. 用变量替换 $x=au$、$y=bv$（$a,b>0$）推导椭圆 $x^2/a^2+y^2/b^2\le1$ 的面积。
15. 解初值问题 $y'=xy$、$y(0)=2$。
16. 解初值问题 $y'+2y=\mathrm e^{-x}$、$y(0)=0$。
17. 某价差偏离均衡值的动态为 $x'(t)=-\kappa x(t)$。求从 $x(0)=x_0$ 出发的解，并求偏离量降至初始值 $10\%$ 所需时间。
18. 求 $y''+4y=0$ 的通解，并求满足 $y(0)=1$、$y'(0)=0$ 的特解。
19. 验证初值问题 $y'=3y^{2/3}$、$y(0)=0$ 至少有零解和 $y=x^3$（在适当区间）两个解，并说明 Picard–Lindelöf 定理的哪个条件失效。
20. 在 Logistic 模型 $y'=ry(1-y/K)$ 中，证明若 $0<y_0<K$，则显式解始终满足 $0<y(x)<K$，并求其极限。
21. 某价值函数 $V(S)$ 在 $S_0$ 附近二阶连续可微。写出 $V(S_0+\Delta S)$ 的二阶 Taylor 展开，并说明一阶项和二阶项分别如何度量局部敏感性；若二阶项不可忽略，为什么只用一阶近似会产生系统性偏差？
22. 设 $z=F(x,y)$ 在矩形 $[a,b]\times[c,d]$ 上连续。说明为什么可以用累次积分计算其二重积分；若只在某些点不连续，是否仍可直接交换积分次序？应检查哪些条件？
