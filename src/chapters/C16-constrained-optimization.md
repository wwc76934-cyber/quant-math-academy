# 第16章　Lagrange、KKT、对偶与敏感性

约束优化的核心不是把约束机械地添加到目标函数中，而是研究最优点的可行方向、目标函数下降方向以及约束边界之间的关系。Lagrange 乘子把等式约束转化为一组平衡条件；Karush–Kuhn–Tucker 条件进一步处理不等式约束和“约束是否起作用”的选择；对偶理论则从另一组变量重新估计原问题的最优值。敏感性分析解释约束资源发生微小变化时，最优值如何变化。

本章采用标准形式

$$
\begin{aligned}
\min_{\boldsymbol x}\quad &f(\boldsymbol x)\\
\text{s.t.}\quad &g_i(\boldsymbol x)\leq0,\qquad i=1,\ldots,m,\\
&h_j(\boldsymbol x)=0,\qquad j=1,\ldots,p,
\end{aligned}
\tag{16.1}
$$

其中 $f,g_i,h_j$ 均在 $\mathbb R^n$ 的开集上连续可微。记可行域为 $\mathcal F$，最优值为 $p^*$。若不特别说明，本章讨论的是最小化问题；最大化问题转化为最小化其相反数时，乘子的符号约定也会随之改变。

## 16.1 无约束与等式约束最优性

### 16.1.1 局部最优的一阶与二阶条件

**定理 16.1（无约束必要条件）**

设 $\boldsymbol x^*$ 是 $f$ 的局部最小点。若 $f$ 在 $\boldsymbol x^*$ 可微，则

$$
\nabla f(\boldsymbol x^*)=\boldsymbol0.
\tag{16.2}
$$

若 $f$ 在该点二阶连续可微，则还必须有 $\nabla^2f(\boldsymbol x^*)\succeq0$。

**证明**

固定任意方向 $\boldsymbol v$。当 $|t|$ 足够小时，局部最优性给出

$$
f(\boldsymbol x^*+t\boldsymbol v)\geq f(\boldsymbol x^*).
$$

对 $t>0$，两边减去 $f(\boldsymbol x^*)$、除以 $t$ 并令 $t\downarrow0$，得 $\nabla f(\boldsymbol x^*)^\top\boldsymbol v\geq0$。把 $\boldsymbol v$ 换成 $-\boldsymbol v$，又得相反不等式，故内积为零。由于 $\boldsymbol v$ 任意，梯度为零。

二阶 Taylor 展开为

$$
f(\boldsymbol x^*+t\boldsymbol v)-f(\boldsymbol x^*)
=\frac12t^2\boldsymbol v^\top\nabla^2f(\boldsymbol x^*)\boldsymbol v+o(t^2).
$$

若某方向的二次型为负，则充分小的 $t$ 使右端为负，与局部最优矛盾。

□

若 $\nabla f(\boldsymbol x^*)=0$ 且 $\nabla^2f(\boldsymbol x^*)\succ0$，则 $\boldsymbol x^*$ 是严格局部最小点。这是因为有界单位球上的连续函数 $\boldsymbol v^\top\boldsymbol H\boldsymbol v$ 有正的最小值。半正定加驻点只是必要组合，不能单独保证局部最优，例如 $f(x)=x^3$ 在原点梯度与二阶导数都为零，却不是极值点。

### 16.1.2 Lagrange 乘子的切空间推导

先考虑一个等式约束 $h(\boldsymbol x)=0$。设 $\boldsymbol x^*$ 是约束曲面上的局部最小点，$\boldsymbol x(t)$ 是任意一条满足 $\boldsymbol x(0)=\boldsymbol x^*$、$h(\boldsymbol x(t))=0$ 的光滑可行曲线。则复合函数 $f(\boldsymbol x(t))$ 在 $t=0$ 处取得局部最小值，故

$$
0=\left.\frac{d}{dt}f(\boldsymbol x(t))\right|_{t=0}
=\nabla f(\boldsymbol x^*)^\top\dot{\boldsymbol x}(0).
$$

另一方面，对 $h(\boldsymbol x(t))=0$ 求导得到

$$
\nabla h(\boldsymbol x^*)^\top\dot{\boldsymbol x}(0)=0.
$$

因此，目标梯度必须垂直于约束曲面的切空间。若 $\nabla h(\boldsymbol x^*)\neq0$，切空间就是 $\nabla h(\boldsymbol x^*)$ 的正交补，于是 $\nabla f(\boldsymbol x^*)$ 必须与 $\nabla h(\boldsymbol x^*)$ 平行，即存在 $\nu$ 使

$$
\nabla f(\boldsymbol x^*)+\nu\nabla h(\boldsymbol x^*)=\boldsymbol0.
$$

多个等式约束下，若各约束梯度 $\nabla h_j(\boldsymbol x^*)$ 线性无关，则切空间为所有约束梯度的共同正交补，从而存在 $\nu_j$ 使

$$
\nabla f(\boldsymbol x^*)+\sum_{j=1}^p\nu_j\nabla h_j(\boldsymbol x^*)=\boldsymbol0.
\tag{16.3}
$$

**定义 16.2（LICQ）**

若在点 $\boldsymbol x$ 处，所有等式约束梯度以及所有起作用不等式约束 $g_i(\boldsymbol x)=0$ 的梯度组成的向量组线性无关，则称线性无关约束规范（linear independence constraint qualification，LICQ）成立。

约束规范的作用是保证“由约束代数线性化得到的切方向”与真实可行曲线的切方向一致。没有约束规范时，式（16.3）可能在局部最优点失败。

**例 16.1**

在约束 $x+y=1$ 下最小化 $f(x,y)=x^2+2y^2$。

**解**

构造 Lagrange 函数

$$
L=x^2+2y^2+\nu(x+y-1).
$$

驻点条件为

$$
2x+\nu=0,\qquad4y+\nu=0,\qquad x+y=1.
$$

由 $x=-\nu/2$、$y=-\nu/4$，代入约束得 $-3\nu/4=1$，故 $\nu=-4/3$，从而 $(x,y)=(2/3,1/3)$。目标函数严格凸，约束为仿射集合，所以该驻点是唯一全局最小点。

这里 $\nu$ 为负并不矛盾：等式约束乘子的符号不受限制。若把约束写成 $1-x-y=0$，乘子会相应变号，而最优解不变。

## 16.2 KKT 条件

### 16.2.1 起作用约束与互补松弛

式（16.1）的 Lagrange 函数定义为

$$
L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)
=f(\boldsymbol x)+\sum_{i=1}^m\lambda_ig_i(\boldsymbol x)
+\sum_{j=1}^p\nu_jh_j(\boldsymbol x),
\tag{16.4}
$$

其中 $\lambda_i\geq0$，$\nu_j\in\mathbb R$。

若 $g_i(\boldsymbol x)<0$，称该不等式约束在最优点不起作用；若 $g_i(\boldsymbol x)=0$，称其起作用。在最优点附近，不起作用约束不影响一阶可行方向，因此其乘子应为零；起作用约束才可能在最优性平衡中出现。这一关系写成

$$
\lambda_i^*g_i(\boldsymbol x^*)=0,\qquad i=1,\ldots,m,
$$

称为互补松弛。

**定理 16.3（KKT 必要条件）**

设 $\boldsymbol x^*$ 是式（16.1）的局部最小点，并满足 LICQ 或适当的其他约束规范。则存在 $\boldsymbol\lambda^*\geq\boldsymbol0$ 和 $\boldsymbol\nu^*$，使得：

1. 原始可行性：$g_i(\boldsymbol x^*)\leq0$、$h_j(\boldsymbol x^*)=0$；
2. 对偶可行性：$\lambda_i^*\geq0$；
3. 驻点条件：
   $$
   \nabla f(\boldsymbol x^*)+\sum_i\lambda_i^*\nabla g_i(\boldsymbol x^*)
   +\sum_j\nu_j^*\nabla h_j(\boldsymbol x^*)=\boldsymbol0;
   \tag{16.5}
   $$
4. 互补松弛：$\lambda_i^*g_i(\boldsymbol x^*)=0$。

**证明思路及所依赖定理**

完整的必要性证明需要切锥、线性化锥以及 Farkas 引理或约束规范定理。其核心逻辑是：在局部最小点，不存在同时满足所有起作用约束线性化可行方向的一阶下降方向。即若 $\nabla f(\boldsymbol x^*)^\top\boldsymbol d<0$，则 $\boldsymbol d$ 不可能同时满足

$$
\nabla g_i(\boldsymbol x^*)^\top\boldsymbol d\leq0
\quad(i\in\mathcal A),\qquad
\nabla h_j(\boldsymbol x^*)^\top\boldsymbol d=0.
$$

约束规范保证这些线性化方向确实可由可行路径实现。Farkas 引理把“不存在这样的方向”等价翻译为式（16.5）的梯度锥关系；不起作用约束令 $\lambda_i^*=0$，即得互补松弛。

□

不等式乘子的非负性可用一个简单情形理解：最小化 $f(x)$，约束 $x\geq0$，写成 $g(x)=-x\leq0$。若最优点 $x^*=0$ 且函数希望继续向左下降，则 $f'(0)<0$。KKT 驻点为

$$
f'(0)-\lambda=0,
$$

所以 $\lambda=f'(0)$ 似乎为负，与上述约定冲突。检查可知，若 $f'(0)<0$，沿正 $x$ 方向函数实际上继续下降，故 $0$ 不是最小点；真正的边界最小点必须满足 $f'(0)\geq0$，于是 $\lambda=f'(0)\geq0$。非负乘子正是“不能通过进入可行域继续下降”的符号表达。

### 16.2.2 凸问题中的充分性

**定理 16.4（凸问题的 KKT 充分条件）**

设 $f,g_1,\ldots,g_m$ 为可微凸函数，$h_j$ 为仿射函数。若 $(\boldsymbol x^*,\boldsymbol\lambda^*,\boldsymbol\nu^*)$ 满足 KKT 条件，则 $\boldsymbol x^*$ 是全局最小点。

**证明**

由于 $\lambda_i^*\geq0$，函数

$$
L(\boldsymbol x,\boldsymbol\lambda^*,\boldsymbol\nu^*)
=f(\boldsymbol x)+\sum_i\lambda_i^*g_i(\boldsymbol x)
+\sum_j\nu_j^*h_j(\boldsymbol x)
$$

关于 $\boldsymbol x$ 为凸函数。驻点条件说明 $\boldsymbol x^*$ 是该凸函数的无约束全局最小点。对任意原始可行点 $\boldsymbol x$，有 $g_i(\boldsymbol x)\leq0$、$h_j(\boldsymbol x)=0$，故

$$
L(\boldsymbol x,\boldsymbol\lambda^*,\boldsymbol\nu^*)
=f(\boldsymbol x)+\sum_i\lambda_i^*g_i(\boldsymbol x)
\leq f(\boldsymbol x).
$$

另一方面，互补松弛给出

$$
L(\boldsymbol x^*,\boldsymbol\lambda^*,\boldsymbol\nu^*)=f(\boldsymbol x^*).
$$

合并得 $f(\boldsymbol x^*)\leq f(\boldsymbol x)$。

□

KKT 条件在非凸问题中一般只是必要条件。即使找到 KKT 点，也仍需检查全局性、其他分支和约束边界。反之，在凸问题中，KKT 的存在把局部最优、全局最优和对偶最优统一起来。

**例 16.2（非负资本的逐级投入）**

资本预算为 $B>0$，将其分配给三个策略，配置 $x_i\geq0$ 后的效用为 $a_i\log(1+x_i)$，其中 $(a_1,a_2,a_3)=(8,4,1)$。求 $B=5$ 时使总效用最大的配置，并确定第三个策略开始获得正配置的最小预算。

**解**

等价于最小化 $-\sum_i a_i\log(1+x_i)$，约束为 $\sum_i x_i=B$、$-x_i\leq0$。该问题目标为凸函数，因为 $-\log(1+x)$ 的二阶导数为 $a/(1+x)^2>0$。令等式乘子为 $\nu$，非负约束 $-x_i\leq0$ 的乘子为 $\lambda_i\geq0$。驻点条件为

$$
-\frac{a_i}{1+x_i}+\nu-\lambda_i=0.
$$

若 $x_i>0$，互补松弛给出 $\lambda_i=0$，所以 $1+x_i=a_i/\nu$。若 $x_i=0$，则 $\lambda_i=\nu-a_i\geq0$，即 $\nu\geq a_i$。因此可统一写为

$$
x_i=\left(\frac{a_i}{\nu}-1\right)_+,
\tag{16.6}
$$

其中 $(z)_+=\max\{z,0\}$，并由预算 $\sum_i x_i=B$ 确定 $\nu$。

先试前两个策略投入，此时

$$
\frac8\nu-1+\frac4\nu-1=5,
$$

故 $\nu=12/7$。因为 $\nu>1=a_3$，第三个策略不投入，与前设一致。于是

$$
(x_1,x_2,x_3)=\left(\frac{11}{3},\frac43,0\right).
$$

第三策略在 $\nu=a_3=1$ 时达到投入门槛。前两项仍满足式（16.6），故预算为

$$
B=\frac81-1+\frac41-1=10.
$$

当 $B>10$ 后，第三项才开始为正。这里不是按 $a_i$ 的比例机械分配资本，而是按边际效用与共同影子价格 $\nu$ 的比较决定投入顺序。

## 16.3 Lagrange 对偶与弱对偶

### 16.3.1 对偶函数总是凹函数

**定义 16.5（对偶函数与对偶问题）**

式（16.1）的 Lagrange 对偶函数定义为

$$
q(\boldsymbol\lambda,\boldsymbol\nu)
=\inf_{\boldsymbol x}L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu).
\tag{16.7}
$$

对偶问题为

$$
\max_{\boldsymbol\lambda\geq\boldsymbol0,\boldsymbol\nu}
q(\boldsymbol\lambda,\boldsymbol\nu),
\tag{16.8}
$$

其最优值记为 $d^*$。

对每个固定的 $\boldsymbol x$，$L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)$ 关于 $(\boldsymbol\lambda,\boldsymbol\nu)$ 是仿射函数；一族仿射函数的逐点下确界是凹函数。因此，即使原问题非凸，对偶函数 $q$ 仍为凹函数，对偶问题仍是凹最大化问题。不过 $q$ 可能取 $-\infty$，也可能难以计算。

### 16.3.2 弱对偶的证明

**定理 16.6（弱对偶）**

对任意原始可行点 $\boldsymbol x$ 和任意 $\boldsymbol\lambda\geq\boldsymbol0$、$\boldsymbol\nu$，都有

$$
q(\boldsymbol\lambda,\boldsymbol\nu)\leq f(\boldsymbol x).
\tag{16.9}
$$

从而 $d^*\leq p^*$。

**证明**

由定义，$q(\boldsymbol\lambda,\boldsymbol\nu)\leq L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)$。又因 $\boldsymbol x$ 可行，

$$
L(\boldsymbol x,\boldsymbol\lambda,\boldsymbol\nu)
=f(\boldsymbol x)+\sum_i\lambda_ig_i(\boldsymbol x)
\leq f(\boldsymbol x),
$$

其中等式项为零，不等式项均非正。对所有可行 $\boldsymbol x$ 取下确界，再对所有对偶可行乘子取上确界，即得 $d^*\leq p^*$。

□

差值 $p^*-d^*$ 称为对偶间隙。弱对偶提供了一个下界：任何可计算的对偶可行点都能为原问题最优值提供证书。若找到原始可行的 $\widehat{\boldsymbol x}$ 与对偶可行的 $(\widehat{\boldsymbol\lambda},\widehat{\boldsymbol\nu})$ 使

$$
f(\widehat{\boldsymbol x})=q(\widehat{\boldsymbol\lambda},\widehat{\boldsymbol\nu}),
$$

则弱对迫使二者分别达到原始与对偶最优，最优性无需另行检查。

**例 16.3**

求问题

$$
\min_{x\in\mathbb R}x^2-2x,\qquad\text{s.t. }x\leq1
$$

的对偶函数并验证强对偶。

**解**

将约束写为 $x-1\leq0$，则

$$
L=x^2-2x+\lambda(x-1)
=x^2+(\lambda-2)x-\lambda.
$$

对 $\lambda\geq0$，二次项系数为正，故下确界在 $x=(2-\lambda)/2$ 处取得。代回得

$$
q(\lambda)=-\frac{(\lambda-2)^2}{4}-\lambda
=-\frac{\lambda^2}{4}-1.
$$

对偶问题是在 $\lambda\geq0$ 上最大化 $q$，显然 $\lambda^*=0$、$d^*=-1$。原问题无约束最小点 $x=1$ 恰好可行，故 $p^*=f(1)=-1$，强对偶成立。若约束改为 $x\leq0$，则原最优点为 $x=0$，而对偶计算将给出正乘子和非平凡边界作用。

## 16.4 Slater 条件与强对偶

**定理 16.7（凸问题的强对偶）**

设式（16.1）中 $f,g_i$ 为凸函数，$h_j$ 为仿射函数。若问题存在有限最优值，并满足 Slater 条件，即存在一点 $\widetilde{\boldsymbol x}$ 满足所有等式约束，且对所有非仿射不等式约束有

$$
g_i(\widetilde{\boldsymbol x})<0,
\tag{16.10}
$$

同时满足仿射不等式约束，则强对偶成立：$p^*=d^*$，并且对偶最优值能够取得。若原始最优解也存在，则原始—对偶最优点满足 KKT 条件。

**证明思路及所依赖定理**

标准证明引入扰动问题的最优值函数，并考虑由“约束扰动—目标值”构成的上方图集合。Slater 条件保证原点附近存在严格内部可行点，使分离超平面不能竖直；分离所得的法向量便给出有限对偶乘子。由弱对偶和分离不等式再推出 $p^*=d^*$。完整构造依赖凸集分离定理，本章不再重复其测度与拓扑细节。

□

Slater 条件是强对偶的充分条件，不是必要条件。例16.3只有仿射约束，强对偶成立，并不要求存在一个使 $x-1<0$ 的点来满足所有“严格不等式”。线性凸问题通常有专门的强对偶定理，其可行性假设与一般非线性 Slater 条件应区分。

**例 16.4（强对偶可以成立而对偶解不达到）**

考虑

$$
\min_x x,\qquad\text{s.t. }x^2\leq0.
$$

唯一可行点为 $x=0$，故 $p^*=0$，且不存在 $x^2<0$ 的 Slater 点。Lagrange 函数为

$$
L=x+\lambda x^2.
$$

当 $\lambda=0$ 时 $\inf_xx=-\infty$；当 $\lambda>0$ 时，最小点在 $x=-1/(2\lambda)$，故

$$
q(\lambda)=-\frac1{4\lambda}.
$$

于是 $q(\lambda)<0$，但 $\lambda\to+\infty$ 时 $q(\lambda)\to0$。因此 $d^*=0=p^*$，强对偶成立，却没有有限的 $\lambda$ 达到对偶最优。该例也说明：不能把 Slater 条件误读为强对偶的必要条件，也不能把强对偶等同于对偶解必然存在。

## 16.5 敏感性与影子价格

### 16.5.1 扰动最优值函数

定义带扰动的问题

$$
\begin{aligned}
p^*(\boldsymbol u,\boldsymbol v)=\inf_{\boldsymbol x}\quad&f(\boldsymbol x)\\
\text{s.t.}\quad&g_i(\boldsymbol x)\leq u_i,\qquad h_j(\boldsymbol x)=v_j.
\end{aligned}
\tag{16.11}
$$

原问题对应 $\boldsymbol u=\boldsymbol0,\boldsymbol v=\boldsymbol0$。$u_i$ 增大表示放松第 $i$ 个不等式约束；$v_j$ 表示改变等式右端。

**定理 16.8（乘子的敏感性解释）**

设原问题具有唯一原始—对偶解，$p^*(\boldsymbol u,\boldsymbol v)$ 在原点附近可微，并满足相应的正则性条件，则

$$
\frac{\partial p^*}{\partial u_i}(\boldsymbol0,\boldsymbol0)
=-\lambda_i^*,\qquad
\frac{\partial p^*}{\partial v_j}(\boldsymbol0,\boldsymbol0)
=-\nu_j^*.
\tag{16.12}
$$

**推导**

在固定最优乘子下，对偶函数可写成扰动问题的下界。对扰动可行点 $\boldsymbol x$，

$$
L_{\boldsymbol u,\boldsymbol v}
=f(\boldsymbol x)+\sum_i\lambda_i^*(g_i(\boldsymbol x)-u_i)
+\sum_j\nu_j^*(h_j(\boldsymbol x)-v_j).
$$

对最优解应用包络定理时，原始最优变量对值函数的一阶影响在驻点条件下消失，只剩显式扰动项

$$
-\sum_i\lambda_i^*u_i-\sum_j\nu_j^*v_j.
$$

因此得到式（16.12）。严格的包络定理需要最优解稳定、约束规范和值函数局部光滑；在最优基或起作用约束集合发生切换处，$p^*$ 可能只有方向导数。

□

符号必须与约束写法一致。对于最小化问题，若 $g_i\leq u_i$ 且 $\lambda_i^*>0$，则增大 $u_i$ 会放松约束，最优目标值的一阶变化为 $-\lambda_i^*u_i$，即不会增加。把约束改写成 $-g_i\geq-u_i$ 而不改变乘子定义，只会造成符号混乱。

在最大化问题中，通常直接定义“效用减去乘子乘约束”的 Lagrange 函数，或者把最优值对资源的导数直接称为影子价格。例16.2中，设最大效用为 $U(B)$，则包络推导给出

$$
U'(B)=\nu,
$$

因为预算约束为 $\sum_i x_i-B=0$。$B=5$ 时 $\nu=12/7$，表示预算增加一个很小单位，最优总效用的一阶增量约为 $12/7$ 倍预算变化。该解释是局部的，当第三项开始投入后，起作用约束集合改变，$\nu$ 也会随 $B$ 重新确定。

### 16.5.2 起作用约束变化时的非光滑性

考虑 $\min_x (x-u)^2$，约束 $x\geq0$。当 $u>0$ 时最优解为 $x=u$、$p^*(u)=0$；当 $u\leq0$ 时最优解为 $x=0$、$p^*(u)=u^2$。故

$$
p^*(u)=
\begin{cases}
u^2,&u\leq0,\\
0,&u>0.
\end{cases}
$$

本例在 $u=0$ 处恰好仍可微，但一般分段最优值函数可能在切换点出现折角。线性规划的最优基改变、Lasso 的活跃变量集合改变、组合权重触及上下限，都会导致敏感性公式只在当前结构不变的局部区域内成立。因此，乘子不是对任意大幅扰动都有效的固定兑换率。

## 16.6 对偶与量化模型的计算意义

对偶不仅是理论恒等式，还常能降低问题维度。考虑严格凸二次模型

$$
\min_{\boldsymbol w}\frac12\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w
-\boldsymbol c^\top\boldsymbol w,
\qquad \boldsymbol A\boldsymbol w=\boldsymbol b,
$$

其中 $\boldsymbol\Sigma\succ0$。Lagrange 驻点为

$$
\boldsymbol\Sigma\boldsymbol w-\boldsymbol c+\boldsymbol A^\top\boldsymbol\nu=0,
$$

故 $\boldsymbol w=\boldsymbol\Sigma^{-1}(\boldsymbol c-\boldsymbol A^\top\boldsymbol\nu)$。代回得到

$$
q(\boldsymbol\nu)
=-\frac12(\boldsymbol c-\boldsymbol A^\top\boldsymbol\nu)^\top
\boldsymbol\Sigma^{-1}(\boldsymbol c-\boldsymbol A^\top\boldsymbol\nu)
-\boldsymbol\nu^\top\boldsymbol b.
$$

原问题在资产权重空间求解，对偶问题则在约束乘子空间求解。当约束数量远少于资产数量时，对偶形式更有计算价值。实际计算通常求解 KKT 线性系统而不是显式形成 $\boldsymbol\Sigma^{-1}$；后者用于推导，不代表最稳定的实现方式。

对偶还可揭示正则化的约束解释。Lasso 的 $\ell_1$ 惩罚经共轭转化为对偶变量的逐坐标上界，组合风险约束经支撑函数转化为对偶变量的范数约束。无论采用哪种形式，弱对偶提供的下界、KKT 的互补松弛以及敏感性中的乘子符号，都是检查求解结果是否自洽的工具。

## 本章小结

无约束驻点条件来自所有方向均不可一阶下降；等式约束的 Lagrange 条件则要求目标梯度落在约束梯度张成的法空间中。KKT 条件在此基础上加入不等式乘子的非负性与互补松弛。它在约束规范下是局部最优的必要条件，在目标与不等式约束为凸、等式约束为仿射时又成为全局最优的充分条件。

对偶函数是 Lagrange 函数关于原始变量的下确界，因而总是凹函数。弱对偶无条件成立，强对偶则需要凸性和适当正则条件；Slater 条件是常用充分条件而非必要条件。扰动分析把乘子与最优值对约束右端的导数联系起来，但其成立依赖局部光滑和起作用约束结构稳定。由此，KKT、对偶间隙与敏感性不仅是求解工具，也是检验模型和数值结果的一套一致性关系。

## 习题

1. 对 $f(x)=x^4$、$g(x)=x^3$ 分别检查 $x=0$ 处的一阶、二阶条件，并判断是否为局部最小点。
2. 在 $x+y+z=1$ 下最小化 $x^2+y^2+z^2$，用 Lagrange 方法求解并证明全局最优性。
3. 求 $\min_{x,y}\{x^2+y^2:xy=1\}$ 的全部 KKT 点，并判断其全局最优性。
4. 对约束 $x^2+y^2=0$，说明在原点 LICQ 是否成立，并分析直接写 Lagrange 驻点条件可能产生的问题。
5. 将 $\min_x\{(x-2)^2:x\geq0\}$ 写成标准不等式形式，求全部 KKT 条件并解释互补松弛。
6. 将上题改为 $\min_x\{(x+2)^2:x\geq0\}$，求最优解、乘子和最优值。
7. 设 $a,b>0$。在 $x,y\geq0$、$x+y=B$ 下最大化 $a\log(1+x)+b\log(1+y)$，推导正配置时的解及只配置第一项的条件。
8. 证明对任意固定原始问题，对偶函数 $q(\boldsymbol\lambda,\boldsymbol\nu)$ 关于乘子为凹函数，即使原始目标非凸也成立。
9. 对 $\min_x\{x^2+2x:x+1\leq0\}$，求原始最优解、对偶函数与对偶最优解，并验证强对偶。
10. 构造一个原始可行且有界、但弱对偶下界为 $-\infty$ 的简单问题，并说明原因。
11. 判断命题“只要强对偶成立，对偶最优解就一定存在”是否正确，并以 $\min\{x:x^2\leq0\}$ 为例说明。
12. 对凸问题证明：若原始最优解与对偶最优解均存在且强对偶成立，则它们满足互补松弛。
13. 设 $p^*(u)=\min_x\{(x-1)^2:x\leq u\}$。求分段表达式，并计算可微处的 $dp^*/du$。
14. 对 $\min_{\boldsymbol w}\{\frac12\boldsymbol w^\top\boldsymbol\Sigma\boldsymbol w:\boldsymbol1^\top\boldsymbol w=1\}$，其中 $\boldsymbol\Sigma\succ0$，求最优权重及最小方差，并解释等式乘子的敏感性含义。
15. 证明：若凸扰动问题的 $f$ 与 $g_i$ 关于 $(\boldsymbol x,\boldsymbol u)$ 联合凸，等式扰动为仿射，则 $p^*(\boldsymbol u)$ 为凸函数。说明“放松约束使最小值不增”与“值函数为凸”并不矛盾。
16. 某两资产组合以 $\boldsymbol w=(w,1-w)$ 配置，方差为 $2w^2-2w+1$。要求预期收益约束 $0.08w+0.04(1-w)\geq r$。求 $r=0.05$ 与 $r=0.09$ 时的最优 $w$，并指出何时收益约束起作用。
