# 第16章习题参考答案与解析

## 1.

对 $f(x)=x^4$，有 $f'(0)=0$、$f''(0)=0$，满足一阶与二阶必要条件，但不满足二阶导数严格为正。由于 $f(x)>0=f(0)$ 对 $x\neq0$ 成立，原点是严格全局最小点。

对 $g(x)=x^3$，同样有 $g'(0)=g''(0)=0$，但 $g(x)<0$ 当 $x<0$，$g(x)>0$ 当 $x>0$，故原点不是局部极值。两例共同说明：驻点加 Hessian 半正定不是局部最优的充分条件。

## 2.

Lagrange 函数为

$$
L=x^2+y^2+z^2+\nu(x+y+z-1).
$$

驻点条件给出 $2x+\nu=2y+\nu=2z+\nu=0$，所以 $x=y=z$。结合约束得

$$
(x,y,z)=(1/3,1/3,1/3),\qquad \nu=-2/3.
$$

目标 Hessian 为 $2\boldsymbol I\succ0$，故严格凸；约束为仿射，因此该 KKT 点是唯一全局最小点。最小值为 $1/3$。

## 3.

令

$$
L=x^2+y^2+\nu(xy-1).
$$

驻点条件为 $2x+\nu y=0$、$2y+\nu x=0$。因 $xy=1$，$(x,y)\neq(0,0)$，消去 $\nu$ 得 $x^2=y^2$。又因 $x,y$ 同号，故 $x=y$。于是得到

$$
(x,y)=(1,1)\quad\text{或}\quad(-1,-1),
$$

对应 $\nu=-2$，目标值均为 $2$。另一形式分支 $x=-y$ 与 $xy=1$ 无实解。

全局性由

$$
x^2+y^2\geq2|xy|=2
$$

直接得到，且上述两点均达到等号，因此都是全局最小点。

## 4.

约束梯度为

$$
\nabla h(x,y)=(2x,2y),
$$

在唯一可行点 $(0,0)$ 处为 $(0,0)$，不是线性无关向量组，故 LICQ 不成立。约束曲面实际上退化为一个点，任何以该点为可行点的目标都在此取得约束最优。

例如最小化 $f(x,y)=x$，实际最优值为 $0$，但直接写

$$
\nabla f+\nu\nabla h=(1,0)+\nu(0,0)=(0,0)
$$

不可能成立。问题不在目标函数，而在于没有约束规范时，普通 KKT 必要性不能保证。

## 5.

标准形式为

$$
\min (x-2)^2,\qquad -x\leq0.
$$

令 $L=(x-2)^2-\lambda x$，KKT 条件为

$$
2(x-2)-\lambda=0,\qquad x\geq0,\qquad\lambda\geq0,
\qquad\lambda x=0.
$$

若 $x>0$，则 $\lambda=0$ 且 $x=2$，满足全部条件。若 $x=0$，则 $\lambda=-4<0$，不可行。故唯一 KKT 点为 $x=2,\lambda=0$。约束在最优点不起作用，互补松弛以 $0\cdot2=0$ 成立。

## 6.

令 $L=(x+2)^2-\lambda x$。驻点为 $2(x+2)-\lambda=0$。若无约束候选 $x=-2$，违反 $x\geq0$，故边界 $x=0$ 必须考虑。此时

$$
\lambda=2(0+2)=4\geq0,
$$

并满足 $\lambda x=0$。因此最优解为 $x=0$、$\lambda=4$，最优值为 $4$。目标为凸函数，KKT 充分保证全局最优。

## 7.

若两项均为正，一阶条件为

$$
\frac{a}{1+x}=\frac{b}{1+y}=\nu.
$$

结合 $x+y=B$，得到 $\nu=(a+b)/(B+2)$，从而

$$
x=\frac{a(B+1)-b}{a+b},\qquad
y=\frac{b(B+1)-a}{a+b}.
$$

该内点解可行要求 $a(B+1)>b$ 且 $b(B+1)>a$。

若只配置第一项，则 $x=B,y=0$。边界最优要求第二项在零配置处的边际效用不超过共同乘子：

$$
b\leq\frac{a}{1+B}.
$$

因此只配置第一项的充要条件为 $a\geq b(B+1)$。同理，只配置第二项要求 $b\geq a(B+1)$。目标为严格凹函数，故这些 KKT 条件足以确定全局最大值。

## 8.

对固定 $\boldsymbol x$，

$$
L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)
=f(\boldsymbol x)+\sum_i\lambda_ig_i(\boldsymbol x)
+\sum_j\nu_jh_j(\boldsymbol x)
$$

关于 $(\boldsymbol\lambda,\boldsymbol\nu)$ 是仿射函数。对任意两组乘子和 $\theta\in[0,1]$，由下确界定义，

$$
q(\theta\boldsymbol\lambda_1+(1-\theta)\boldsymbol\lambda_2)
=\inf_{\boldsymbol x}\{\theta L_1(\boldsymbol x)+(1-\theta)L_2(\boldsymbol x)\}.
$$

括号内不小于 $\theta q_1+(1-\theta)q_2$，故取下确界后仍有

$$
q(\theta\boldsymbol\lambda_1+(1-\theta)\boldsymbol\lambda_2)
\geq\theta q_1+(1-\theta)q_2.
$$

等式乘子同理。证明只使用“仿射函数的下确界为凹函数”，不依赖原始问题凸性。

## 9.

原问题为 $x^2+2x=(x+1)^2-1$，约束 $x\leq-1$。无约束最小点 $x=-1$ 恰好可行，故 $x^*=-1$、$p^*=-1$。

Lagrange 函数为

$$
L=x^2+2x+\lambda(x+1)
=x^2+(\lambda+2)x+\lambda.
$$

对 $\lambda\geq0$，下确界在 $x=-(\lambda+2)/2$ 处取得，故

$$
q(\lambda)=\lambda-\frac{(\lambda+2)^2}{4}
=-\frac{\lambda^2}{4}-1.
$$

对偶在 $\lambda\geq0$ 上最大化，得 $\lambda^*=0$、$d^*=-1$。所以 $p^*=d^*$，强对偶成立。

## 10.

取

$$
\min_x x^3,\qquad\text{s.t. }x=0.
$$

唯一可行点为 $x=0$，故原始最优值 $p^*=0$。但

$$
L(x,\nu)=x^3+\nu x.
$$

无论 $\nu$ 取何实数，当 $x\to-\infty$ 时 $x^3$ 都主导并趋于 $-\infty$，所以 $q(\nu)=-\infty$。于是 $d^*=-\infty$。弱对偶仍然成立，只是没有提供有限下界；原因是对偶函数在乘子空间内始终无下界，而非弱对偶失效。

## 11.

命题错误。对 $\min\{x:x^2\leq0\}$，原始唯一可行点为 $x=0$，$p^*=0$。对 $\lambda>0$，

$$
q(\lambda)=\inf_x(x+\lambda x^2)=-\frac1{4\lambda};
$$

对 $\lambda=0$，$q(0)=-\infty$。因此 $q(\lambda)<0$ 对所有对偶可行乘子成立，但 $\lambda\to+\infty$ 时 $q(\lambda)\to0$，所以 $d^*=0=p^*$。

强对偶只保证最优值相等，不保证对偶上确界在有限点达到。本例也不满足 Slater 条件。

## 12.

设原始最优点为 $\boldsymbol x^*$，对偶最优点为 $(\boldsymbol\lambda^*,\boldsymbol\nu^*)$。由对偶函数定义和原始可行性，

$$
d^*=q(\boldsymbol\lambda^*,\boldsymbol\nu^*)
\leq L(\boldsymbol x^*,\boldsymbol\lambda^*,\boldsymbol\nu^*)
\leq f(\boldsymbol x^*)=p^*.
$$

强对偶使两端相等，故中间两处也均为等式。第二处等式意味着

$$
\sum_i\lambda_i^*g_i(\boldsymbol x^*)=0,
$$

因为等式约束项已经为零。每一项 $\lambda_i^*g_i(\boldsymbol x^*)$ 都是非正数，非正数之和为零只能每项均为零，故

$$
\lambda_i^*g_i(\boldsymbol x^*)=0.
$$

第一处等式还说明 $\boldsymbol x^*$ 使固定最优乘子下的 Lagrange 函数达到最小。

## 13.

无约束最小点为 $x=1$。若 $u\geq1$，该点可行，故 $p^*(u)=0$；若 $u<1$，目标在 $(-\infty,u]$ 上递减，最优点为 $x=u$，故

$$
p^*(u)=
\begin{cases}
(u-1)^2,&u<1,\\
0,&u\geq1.
\end{cases}
$$

因此

$$
\frac{dp^*}{du}=
\begin{cases}
2(u-1),&u<1,\\
0,&u>1.
\end{cases}
$$

在 $u<1$ 时，KKT 乘子为 $\lambda=2(1-u)$，所以 $-\lambda=2(u-1)$，与敏感性公式一致。两侧导数在 $u=1$ 均为 $0$，故本例值函数在切换点仍可微。

## 14.

令

$$
L=\frac12\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w
+\nu(\boldsymbol1^\top\boldsymbol w-1).
$$

驻点为 $\boldsymbol\Sigma\boldsymbol w+\nu\boldsymbol1=0$，故 $\boldsymbol w=-\nu\boldsymbol\Sigma^{-1}\boldsymbol1$。记 $D=\boldsymbol1^\top\boldsymbol\Sigma^{-1}\boldsymbol1>0$，预算约束给出 $\nu=-1/D$，从而

$$
\boxed{\boldsymbol w^*=\frac{\boldsymbol\Sigma^{-1}\boldsymbol1}{D}}.
$$

最小方差为

$$
\frac12(\boldsymbol w^*)^\top\boldsymbol\Sigma\boldsymbol w^*
=\frac1{2D}.
$$

若预算约束改为 $\boldsymbol1^\top\boldsymbol w=b$，同理最小值为 $b^2/(2D)$，其对 $b$ 在 $b=1$ 的导数为 $1/D=-\nu$，符合等式扰动的敏感性公式。

## 15.

定义

$$
F(\boldsymbol x,\boldsymbol u)=
\begin{cases}
f(\boldsymbol x),&g_i(\boldsymbol x)\leq u_i\ \text{且等式成立},\\
+\infty,&\text{其他情况}.
\end{cases}
$$

由于 $f,g_i$ 联合凸，$g_i(\boldsymbol x)-u_i$ 也联合凸，其下水平集为凸集；仿射等式同样定义凸集。因此 $F$ 是联合凸的扩展实值函数。于是

$$
p^*(\boldsymbol u)=\inf_{\boldsymbol x}F(\boldsymbol x,\boldsymbol u)
$$

是联合凸函数关于部分变量的下确界，故为凸函数。

放松约束意味着可行域随 $u$ 的增大而扩大，所以 $p^*$ 非增。非增函数完全可以是凸函数，例如 $p(u)=1/u$（$u>0$）或 $p(u)=e^{-u}$；单调性描述一阶方向，凸性描述二阶曲率，二者不冲突。

## 16.

方差函数

$$
V(w)=2w^2-2w+1=2(w-\tfrac12)^2+\tfrac12
$$

的唯一无约束最小点为 $w=1/2$。预期收益为

$$
\mu(w)=0.08w+0.04(1-w)=0.04+0.04w.
$$

当 $r=0.05$ 时，约束等价于 $w\geq0.25$。$w=1/2$ 已满足，故最优 $w=1/2$，收益约束不起作用。

当 $r=0.09$ 时，约束为 $w\geq1.25$。由于 $V(w)$ 在 $w\geq1/2$ 上递增，最优可行点为边界

$$
w=1.25,\qquad1-w=-0.25.
$$

此时收益约束起作用，并允许第二资产出现空头权重。若模型另有多头约束 $0\leq w\leq1$，则 $r=0.09$ 将无可行解。
