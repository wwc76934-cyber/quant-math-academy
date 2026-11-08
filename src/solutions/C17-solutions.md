# 第17章习题参考答案与解析

## 1.

$\nabla f(1,1)=(2,2)$。下降方向要求 $\nabla f^\top\boldsymbol d<0$。

- 对 $(-1,0)$，方向导数为 $-2<0$，是下降方向；
- 对 $(1,-1)$，方向导数为 $2-2=0$，不是严格下降方向；
- 对 $(1,1)$，方向导数为 $4>0$，是上升方向。

零方向导数只表示一阶不变，不能据此判断二阶行为。

## 2.

迭代因子为 $r=1-\alpha a$。对非零初值，收敛到唯一最小点 $0$ 当且仅当 $|r|<1$，即

$$
-1<1-\alpha a<1
\iff \boxed{0<\alpha<2/a}.
$$

$\alpha=2/a$ 时在 $x$ 与 $-x$ 之间振荡，$\alpha>2/a$ 时发散，$\alpha=0$ 时不动。取 $\alpha=1/a$ 时 $r=0$，一步到达最小点，故它是最优固定步长。

## 3.

由 $L$-光滑的下降引理，令 $\boldsymbol x_+=\boldsymbol x-\nabla f(\boldsymbol x)/L$，则

$$
\begin{aligned}
f(\boldsymbol x_+)
&\leq f(\boldsymbol x)-\frac1L\|\nabla f(\boldsymbol x)\|^2
+\frac L2\frac1{L^2}\|\nabla f(\boldsymbol x)\|^2\\
&=f(\boldsymbol x)-\frac1{2L}\|\nabla f(\boldsymbol x)\|^2.
\end{aligned}
$$

对 $k$ 步求和：

$$
\frac1{2L}\sum_{j=0}^{k-1}\|\nabla f(\boldsymbol x_j)\|^2
\leq f(\boldsymbol x_0)-f(\boldsymbol x_k)
\leq f(\boldsymbol x_0)-\inf f.
$$

左端为非负项级数且被常数控制，因此级数收敛，其通项必须趋于零，即 $\|\nabla f(\boldsymbol x_k)\|\to0$。该结论不要求凸性，但也不推出全局最优。

## 4.

梯度为 $(x,100y)$，故迭代为

$$
x_{k+1}=(1-\alpha)x_k,\qquad
 y_{k+1}=(1-100\alpha)y_k.
$$

当 $\alpha=0.01$ 时，两因子分别为 $0.99$ 和 $0$，均满足绝对值不超过 $1$，算法收敛，且 $y$ 一步归零。

当 $\alpha=0.03$ 时，两因子分别为 $0.97$ 和 $-2$。即使 $x$ 方向收敛，只要 $y_0\neq0$，$y_k$ 就按绝对值两倍发散。该例说明步长必须受最大曲率限制。

## 5.

二阶可微时，$m$-强凸给出 $\nabla^2f\succeq m\boldsymbol I$，$L$-光滑的常用 Hessian 上界给出 $\nabla^2f\preceq L\boldsymbol I$，所以 $m\boldsymbol I\preceq L\boldsymbol I$，即 $m\leq L$。不依赖 Hessian，也可把强凸下界与光滑上界沿同一方向比较得到。

一维例子

$$
f(x)=\frac m2x^2
$$

同时以 $m=L$ 满足两者，故等号可以成立。

## 6.

强凸的一阶下界为

$$
f(\boldsymbol y)\geq f(\boldsymbol x)+
\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x)
+\frac m2\|\boldsymbol y-\boldsymbol x\|^2.
$$

固定 $\boldsymbol x$，右端关于 $\boldsymbol y$ 的最小点在

$$
\boldsymbol y=\boldsymbol x-\frac1m\nabla f(\boldsymbol x)
$$

处取得。代入得右端最小值

$$
f(\boldsymbol x)-\frac1{2m}\|\nabla f(\boldsymbol x)\|^2.
$$

因为左端可低至全局最优值 $f^*$，所以

$$
f^*\geq f(\boldsymbol x)-\frac1{2m}\|\nabla f(\boldsymbol x)\|^2,
$$

整理即所求不等式。

## 7.

$f'(x)=x^3$、$f''(x)=3x^2$。在 $x=1$，Newton 步为

$$
x_+=1-\frac{1^3}{3\cdot1^2}=\frac23.
$$

它没有直接到达最小点 $0$。原因是四次函数的二阶 Taylor 模型并不等于原函数；Newton 法的一步精确性只对二次模型成立。

## 8.

对 $f(x)=\frac12x^2$，$f'(x)=f''(x)$ 的相应计算给出 $x_+=x-x=0$，一步达到最小点，因为函数本身就是二次凸函数。

对 $f(x)=-\frac12x^2$，同样得到 $x_+=0$，但原点是全局最大点，且函数无有限下界。Newton 方程求的是二阶模型驻点；只有 Hessian 正定并配合适当全局策略时，才可把它解释为局部最小化方向。

## 9.

记 $\rho=1/(\boldsymbol y^\top\boldsymbol s)$。由 $\boldsymbol s^\top\boldsymbol y=\boldsymbol y^\top\boldsymbol s$，有

$$
(\boldsymbol I-\rho\boldsymbol y\boldsymbol s^\top)\boldsymbol y
=\boldsymbol y-\rho\boldsymbol y(\boldsymbol s^\top\boldsymbol y)=0.
$$

所以更新式右端第一项乘 $\boldsymbol y$ 后为零，第二项满足

$$
\rho\boldsymbol s\boldsymbol s^\top\boldsymbol y
=\rho\boldsymbol s(\boldsymbol s^\top\boldsymbol y)=\boldsymbol s.
$$

故 $\boldsymbol H_{k+1}\boldsymbol y=\boldsymbol s$。

对任意 $\boldsymbol z$，

$$
\boldsymbol z^\top\boldsymbol H_{k+1}\boldsymbol z
=(\boldsymbol A^\top\boldsymbol z)^\top\boldsymbol H_k
(\boldsymbol A^\top\boldsymbol z)
+\rho(\boldsymbol s^\top\boldsymbol z)^2\geq0,
$$

其中 $\boldsymbol A=\boldsymbol I-\rho\boldsymbol s\boldsymbol y^\top$。若右端为零，则 $\boldsymbol s^\top\boldsymbol z=0$ 且 $\boldsymbol A^\top\boldsymbol z=0$。但

$$
\boldsymbol A^\top\boldsymbol z
=\boldsymbol z-\rho\boldsymbol y(\boldsymbol s^\top\boldsymbol z)
=\boldsymbol z,
$$

故 $\boldsymbol z=0$。因此 $\boldsymbol H_{k+1}$ 正定。

## 10.

盒约束投影逐坐标截断到 $[0,1]$：

$$
\mathcal P_C(2,-1,0.5)=(1,0,0.5).
$$

因为盒约束是各坐标区间的笛卡尔积，平方距离也逐坐标分解，分别最小化即可。

## 11.

无约束最小点为 $-1$，被投影到 $0$，故候选固定点为 $x^*=0$。梯度 $f'(0)=2$。对任意 $y\in[0,1]$，

$$
f'(0)(y-0)=2y\geq0,
$$

满足凸约束问题的一阶最优性，所以 $x^*=0$ 为全局最小点。投影固定点也成立：$0-\alpha f'(0)=-2\alpha$ 投影到 $[0,1]$ 后仍为 $0$。

## 12.

近端目标为 $\lambda|x|+(x-v)^2/(2\alpha)$。

若 $x>0$，驻点给出 $x=v-\alpha\lambda$，要求 $v>\alpha\lambda$；若 $x<0$，驻点给出 $x=v+\alpha\lambda$，要求 $v<-\alpha\lambda$。若 $|v|\leq\alpha\lambda$，在 $x=0$ 处

$$
0\in\lambda[-1,1]-\frac v\alpha,
$$

满足次微分最优性。合并为

$$
\operatorname{prox}_{\alpha\lambda|\cdot|}(v)=
\begin{cases}
v-\alpha\lambda,&v>\alpha\lambda,\\
0,&|v|\leq\alpha\lambda,\\
v+\alpha\lambda,&v<-\alpha\lambda,
\end{cases}
$$

即 $\operatorname{sgn}(v)(|v|-\alpha\lambda)_+$。

## 13.

近端目标为

$$
\frac\lambda2\|\boldsymbol x\|^2+
\frac1{2\alpha}\|\boldsymbol x-\boldsymbol v\|^2.
$$

其一阶条件为

$$
\lambda\boldsymbol x+\frac1\alpha(\boldsymbol x-\boldsymbol v)=0,
$$

所以

$$
\boxed{\operatorname{prox}_{\alpha g}(\boldsymbol v)
=\frac{\boldsymbol v}{1+\alpha\lambda}}.
$$

这是整体按比例收缩。它没有 $\ell_1$ 软阈值中的平坦零区域，因此通常不会产生恰好为零的坐标。

## 14.

目标展开为

$$
\frac12x^2\beta^2-xy\beta+\frac12y^2+\lambda|\beta|.
$$

去掉与 $\beta$ 无关的常数并除以 $x^2/2$，等价于

$$
\frac12\left(\beta-\frac{xy}{x^2}\right)^2
+\frac\lambda{x^2}|\beta|.
$$

由软阈值公式，

$$
\boxed{
\beta=\operatorname{sgn}(xy)
\frac{(|xy|-\lambda)_+}{x^2}
}.
$$

也可分段验证：$\beta>0$ 时 $\beta=(xy-\lambda)/x^2$，$\beta<0$ 时 $\beta=(xy+\lambda)/x^2$，$|xy|\leq\lambda$ 时零点的次微分条件成立。

## 15.

（a）错误。目标单调下降且有下界只能说明目标值有极限，不保证迭代点收敛，更不保证极限为全局最小。非凸问题可停在鞍点附近，步长设计不当也可能在多个区域间移动。

（b）错误。梯度趋于零只给出渐近驻点信息。驻点可能是局部极大或鞍点，迭代点序列本身还需额外条件才有收敛结论。

（c）正确。FISTA 的目标间隙速率是 $O(1/k^2)$，其外推动量可能使某些步骤目标值上升；速率界不等于单调下降保证。

## 16.

在**无约束凸问题**中，梯度为零确实等价于全局最优；若只是“数值上很小”，还需结合目标间隙或对偶证书判断。在**凸约束问题**中，边界最优点的普通梯度通常不为零，应检查投影梯度固定点、KKT 残差或变分不等式，不能只要求 $\nabla f\approx0$。

在**非凸问题**中，小梯度可能对应局部最小、局部最大或鞍点，不能推出全局最优。若算法仅因步长过小而停滞，则小步长或小目标变化也不等于小梯度；即使测得小梯度，也只说明一阶进展缓慢。严谨报告应同时给出梯度或 KKT 残差、步长、迭代上限、可行性和适用的最优性证书。
