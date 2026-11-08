# 第3章习题参考答案与解析

## 1.

对 $f(x,y)=x^2y+\mathrm e^{xy}$，分别把另一变量视为常数：

$$
f_x=2xy+y\mathrm e^{xy},\qquad
f_y=x^2+x\mathrm e^{xy}.
$$

继续求二阶偏导数：

$$
f_{xx}=2y+y^2\mathrm e^{xy},
$$

$$
f_{xy}=2x+\mathrm e^{xy}+xy\mathrm e^{xy}
=2x+(1+xy)\mathrm e^{xy},
$$

$$
f_{yy}=x^2\mathrm e^{xy}.
$$

由于函数光滑，$f_{yx}=f_{xy}$，故 Hessian 为

$$
\boldsymbol H_f=
\begin{pmatrix}
2y+y^2\mathrm e^{xy}&2x+(1+xy)\mathrm e^{xy}\\
2x+(1+xy)\mathrm e^{xy}&x^2\mathrm e^{xy}
\end{pmatrix}.
$$

对 $\mathrm e^{xy}$ 求偏导时必须使用链式法则，不能漏掉内层因子 $y$ 或 $x$。

## 2.

在坐标轴上，$f(x,0)=0$、$f(0,y)=0$，所以

$$
f_x(0,0)=\lim_{h\to0}\frac{f(h,0)-f(0,0)}h=0,
$$

同理 $f_y(0,0)=0$。两个偏导数在原点存在。

沿坐标轴趋近时，函数值恒为 $0$。但沿抛物线路径 $x=y^2$、$y\to0$，有

$$
f(y^2,y)=\frac{y^2\cdot y^2}{y^4+y^4}=\frac12.
$$

因此沿该路径函数不趋于 $0$，与沿坐标轴的极限不同，故函数在原点不连续。由于可微必连续，函数在原点也不可微。这说明偏导数只测量坐标方向，不能控制弯曲路径。

## 3.

令 $\boldsymbol a=(a,b)$、$\boldsymbol h=(h,k)$。则

$$
\begin{aligned}
f(a+h,b+k)-f(a,b)
&=(a+h)^2+(b+k)^2-a^2-b^2\\
&=2ah+2bk+h^2+k^2.
\end{aligned}
$$

线性部分为 $L(h,k)=2ah+2bk$，余项为 $h^2+k^2=\lVert\boldsymbol h\rVert^2$。因此

$$
\frac{|h^2+k^2|}{\lVert\boldsymbol h\rVert}
=\lVert\boldsymbol h\rVert\to0.
$$

由可微定义，$f$ 在 $(a,b)$ 可微，且

$$
Df(a,b)[h,k]=2ah+2bk.
$$

这与 $\nabla f(a,b)=(2a,2b)^\top$ 一致。

## 4.

可微时，方向导数为

$$
D_{\boldsymbol u}f(\boldsymbol a)
=\nabla f(\boldsymbol a)^\top\boldsymbol u.
$$

由 Cauchy–Schwarz 不等式，

$$
|D_{\boldsymbol u}f(\boldsymbol a)|
\le\lVert\nabla f(\boldsymbol a)\rVert\lVert\boldsymbol u\rVert
=\lVert\nabla f(\boldsymbol a)\rVert.
$$

当 $\boldsymbol u=\nabla f/\lVert\nabla f\rVert$ 时达到最大值 $\lVert\nabla f\rVert$；当 $\boldsymbol u=-\nabla f/\lVert\nabla f\rVert$ 时达到最小值 $-\lVert\nabla f\rVert$。因此梯度指向函数值局部增长最快的方向，负梯度指向下降最快的方向。

## 5.

有

$$
z_x=2x\ln y,\qquad z_y=\frac{x^2}{y},
$$

以及 $x_u=x_v=1$、$y_u=v$、$y_v=u$。由链式法则，

$$
\frac{\partial z}{\partial u}
=z_xx_u+z_yy_u
=2x\ln y+\frac{x^2v}{y},
$$

$$
\frac{\partial z}{\partial v}
=z_xx_v+z_yy_v
=2x\ln y+\frac{x^2u}{y}.
$$

代回 $x=u+v$、$y=uv$，得

$$
z_u=2(u+v)\ln(uv)+\frac{u+v}{u},
$$

$$
z_v=2(u+v)\ln(uv)+\frac{u+v}{v}.
$$

## 6.

在 $(0,0)$ 处，$f(0,0)=0$，且

$$
f_x=f_y=\frac1{1+x+y},
$$

所以两个一阶偏导数在原点均为 $1$。二阶偏导数为

$$
f_{xx}=f_{xy}=f_{yy}=-\frac1{(1+x+y)^2},
$$

在原点均为 $-1$。因此二阶 Taylor 多项式为

$$
\begin{aligned}
P_2(x,y)
&=0+x+y+\frac12(-x^2-2xy-y^2)\\
&=x+y-\frac12(x+y)^2.
\end{aligned}
$$

这与一元展开 $\ln(1+t)=t-t^2/2+o(t^2)$ 令 $t=x+y$ 所得结果一致。

## 7.

梯度方程为

$$
3x^2-3y=0,\qquad3y^2-3x=0,
$$

即 $y=x^2$、$x=y^2$。代入得 $x=x^4$，所以 $x=0$ 或 $x=1$，驻点为 $(0,0)$ 和 $(1,1)$。

Hessian 为

$$
\boldsymbol H(x,y)=
\begin{pmatrix}6x&-3\\-3&6y\end{pmatrix}.
$$

在 $(0,0)$ 处，

$$
\boldsymbol H=\begin{pmatrix}0&-3\\-3&0\end{pmatrix},
$$

二次型为 $-6uv$，沿 $(1,1)$ 为负、沿 $(1,-1)$ 为正，故原点是鞍点。

在 $(1,1)$ 处，

$$
\boldsymbol H=\begin{pmatrix}6&-3\\-3&6\end{pmatrix},
$$

且

$$
(u,v)\boldsymbol H(u,v)^\top
=6u^2-6uv+6v^2
=3(u-v)^2+3u^2+3v^2>0
$$

对非零 $(u,v)$ 成立，所以 Hessian 正定，$(1,1)$ 是严格局部极小点。

## 8.

令

$$
F(x,y)=x\mathrm e^y+y\mathrm e^x-1.
$$

有 $F(0,1)=0$，并且

$$
F_x=\mathrm e^y+y\mathrm e^x,\qquad
F_y=x\mathrm e^y+\mathrm e^x.
$$

在 $(0,1)$ 处，$F_y=1\ne0$，隐函数定理适用。由

$$
y'(x)=-\frac{F_x(x,y(x))}{F_y(x,y(x))},
$$

代入 $(0,1)$，得

$$
y'(0)=-\frac{\mathrm e+1}{1}=-(1+\mathrm e).
$$

## 9.

映射的 Jacobian 为

$$
\boldsymbol J=\begin{pmatrix}1&1\\1&-1\end{pmatrix},
$$

其行列式为 $-2\ne0$，故反函数定理在任意点适用。事实上，令 $u=x+y$、$v=x-y$，可直接解出全局反函数

$$
x=\frac{u+v}{2},\qquad y=\frac{u-v}{2}.
$$

反函数 Jacobian 为

$$
\boldsymbol J^{-1}
=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

本题全局线性结构比局部反函数定理更强；直接求逆也验证了 Jacobian 乘积为单位矩阵。

## 10.

先对 $y$ 积分：

$$
\begin{aligned}
\int_0^1\int_0^2(3x^2y+1)\,dy\,dx
&=\int_0^1\left[\frac32x^2y^2+y\right]_{y=0}^{y=2}dx\\
&=\int_0^1(6x^2+2)dx\\
&=\left[2x^3+2x\right]_0^1=4.
\end{aligned}
$$

由于被积函数在闭矩形上连续，Fubini 定理保证也可先对 $x$ 积分，结果不变。

## 11.

原区域满足 $0\le y\le1$、$y\le x\le1$，等价于 $0\le x\le1$、$0\le y\le x$。因此

$$
\begin{aligned}
\int_0^1\int_y^1\frac{y}{1+x^2}\,dx\,dy
&=\int_0^1\int_0^x\frac{y}{1+x^2}\,dy\,dx\\
&=\int_0^1\frac{x^2}{2(1+x^2)}dx\\
&=\frac12\int_0^1\left(1-\frac1{1+x^2}\right)dx\\
&=\frac12\left(1-\frac\pi4\right).
\end{aligned}
$$

若只交换 $dx,dy$ 而不重新确定积分上下限，会改变积分区域。

## 12.

令 $x=r\cos\theta$、$y=r\sin\theta$。区域对应 $0\le r\le2$、$0\le\theta\le2\pi$，且面积元为 $r\,dr\,d\theta$。故

$$
\begin{aligned}
\iint_D\mathrm e^{-(x^2+y^2)}dA
&=\int_0^{2\pi}\int_0^2\mathrm e^{-r^2}r\,dr\,d\theta\\
&=2\pi\left[-\frac12\mathrm e^{-r^2}\right]_0^2\\
&=\pi(1-\mathrm e^{-4}).
\end{aligned}
$$

被积函数和区域都具有径向对称性，极坐标因此同时简化了函数和积分限。

## 13.

第一象限的环形区域在极坐标下为

$$
1\le r\le2,\qquad0\le\theta\le\frac\pi2.
$$

面积为

$$
\int_0^{\pi/2}\int_1^2r\,dr\,d\theta
=\frac\pi2\cdot\frac{2^2-1^2}{2}
=\frac{3\pi}{4}.
$$

也可用外四分之一圆面积 $\pi\cdot2^2/4=\pi$ 减去内四分之一圆面积 $\pi/4$ 验证。

## 14.

令 $x=au$、$y=bv$，则椭圆区域变为单位圆盘 $u^2+v^2\le1$。Jacobian 为

$$
\left|\det\begin{pmatrix}a&0\\0&b\end{pmatrix}\right|=ab.
$$

因此椭圆面积为

$$
\iint_{D_{\text{ellipse}}}dx\,dy
=ab\iint_{u^2+v^2\le1}du\,dv
=ab\pi.
$$

变量替换中的面积缩放因子是 $ab$，不能只替换边界方程而保留原来的面积元。

## 15.

在 $y>0$ 的解区间内分离变量：

$$
\frac{dy}{y}=x\,dx.
$$

积分得 $\ln|y|=x^2/2+C$，故 $y=A\mathrm e^{x^2/2}$。由 $y(0)=2$ 得 $A=2$，所以

$$
\boxed{y(x)=2\mathrm e^{x^2/2}}.
$$

初值为正，解在实数域上保持正值。代回可验证 $y'=2x\mathrm e^{x^2/2}=xy$。

## 16.

积分因子为 $\mu=\mathrm e^{2x}$。方程两边乘以 $\mu$，得

$$
(\mathrm e^{2x}y)'=\mathrm e^{2x}\mathrm e^{-x}=\mathrm e^x.
$$

积分：

$$
\mathrm e^{2x}y=\mathrm e^x+C.
$$

因此 $y=\mathrm e^{-x}+C\mathrm e^{-2x}$。由 $y(0)=0$，有 $1+C=0$，所以 $C=-1$，最终

$$
\boxed{y(x)=\mathrm e^{-x}-\mathrm e^{-2x}}.
$$

## 17.

方程 $x'=-\kappa x$ 的解为

$$
x(t)=x_0\mathrm e^{-\kappa t}.
$$

其绝对偏离量为 $|x_0|\mathrm e^{-\kappa t}$（假设 $\kappa>0$）。要降至初始偏离的 $10\%$，解

$$
\mathrm e^{-\kappa t}=0.1,
$$

得到

$$
t=\frac{\ln10}{\kappa}.
$$

衰减时间只依赖 $\kappa$ 和目标比例，与初始偏离大小无关，这是指数线性衰减的特征。

## 18.

试解 $y=\mathrm e^{\lambda x}$，得到特征方程

$$
\lambda^2+4=0,
$$

根为 $\lambda=\pm2i$。因此通解为

$$
y=C_1\cos2x+C_2\sin2x.
$$

由 $y(0)=1$ 得 $C_1=1$。又

$$
y'=-2C_1\sin2x+2C_2\cos2x,
$$

由 $y'(0)=0$ 得 $C_2=0$。故所求特解为

$$
\boxed{y(x)=\cos2x}.
$$

## 19.

零函数显然满足 $y'=0$ 和 $3y^{2/3}=0$，且 $y(0)=0$。对 $y=x^3$，在实数范围内有 $y^{2/3}=x^2$，所以

$$
y'=3x^2=3y^{2/3},
$$

且 $y(0)=0$。故至少存在两个解。

$F(y)=3y^{2/3}$ 在 $0$ 附近不满足关于 $y$ 的 Lipschitz 条件。若存在常数 $L$ 使 $|F(y)-F(0)|\le L|y|$，则对 $y>0$ 应有

$$
3y^{2/3}\le Ly
\quad\Longrightarrow\quad
3\le Ly^{1/3}.
$$

令 $y\to0^+$，右端趋于 $0$，矛盾。其形式导数 $F'(y)=2y^{-1/3}$ 在 $0$ 附近也无界。因此 Picard–Lindelöf 的唯一性条件失效。

## 20.

由正文显式解，

$$
y(x)=\frac{K}{1+A\mathrm e^{-rx}},
\qquad A=\frac K{y_0}-1.
$$

因为 $0<y_0<K$，有 $K/y_0>1$，故 $A>0$。于是分母始终大于 $1$，从而

$$
0<y(x)<K.
$$

当 $x\to\infty$ 时，$\mathrm e^{-rx}\to0$，所以 $y(x)\to K$。这一结论与动态解释一致：在 $0<y<K$ 内，$y'>0$，解单调增加但受平衡值 $K$ 限制。

## 21.

二阶 Taylor 展开为

$$
V(S_0+\Delta S)
=V(S_0)+V'(S_0)\Delta S
+\frac12V''(S_0)(\Delta S)^2
+o((\Delta S)^2).
$$

一阶项 $V'(S_0)\Delta S$ 描述价值对标的价格小幅变化的线性敏感性；二阶项 $\tfrac12V''(S_0)(\Delta S)^2$ 描述曲率，即一阶敏感性本身随标的价格变化所产生的修正。

若只保留一阶项，近似误差的主导部分通常正是二阶项。当 $V''$ 在相关区间内持续同号时，忽略它会形成方向一致的系统性偏差，而不只是随机噪声。例如 $V''>0$ 时，真实值相对一阶近似通常高出约 $\tfrac12V''(\Delta S)^2$。价格变化越大，二次项相对越不可忽略。

## 22.

连续函数在闭矩形上可积，且其关于每个变量的截面积分也连续。Fubini 定理因此给出

$$
\iint_R F(x,y)dA
=\int_a^b\int_c^dF(x,y)dy\,dx
=\int_c^d\int_a^bF(x,y)dx\,dy.
$$

若函数只在某些点不连续，不能仅凭“不连续点很少”就机械交换积分次序。需要检查：

1. 函数在区域上是否仍以适当方式可积；
2. 每个相关截面上的单变量积分是否存在；
3. 两个累次积分是否分别存在；
4. 在一般可积框架下，是否满足绝对可积等 Fubini/Tonelli 定理条件。

对 Riemann 积分，有限个适当位置的不连续点通常不破坏可积性，但仍需结合区域和截面验证；对可能无界或高度振荡的函数，则必须使用更一般的可积性条件，不能把形式换序当作证明。
