# 第17章　迭代优化算法

大规模优化问题通常不能依赖闭式解。迭代算法从当前点出发，利用梯度、Hessian 或局部子问题构造下一步，并在计算成本、收敛速度和数值稳定性之间作出权衡。算法名称本身并不能保证收敛：步长、光滑性、凸性、约束结构和停止条件共同决定实际行为。

本章研究无约束与约束问题的一阶、二阶方法。记目标函数为 $f:\mathbb R^n\to\mathbb R$，第 $k$ 次迭代点为 $\boldsymbol x_k$。算法中的 $\boldsymbol H_k$ 若用于拟 Newton 法，表示逆 Hessian 近似；真正的 Hessian 仍写为 $\nabla^2f$。

## 17.1 下降方向、步长与停止规则

迭代格式常写为

$$
\boldsymbol x_{k+1}=\boldsymbol x_k+\alpha_k\boldsymbol d_k,
\tag{17.1}
$$

其中 $\boldsymbol d_k$ 为搜索方向，$\alpha_k>0$ 为步长。若 $f$ 可微且

$$
\nabla f(\boldsymbol x_k)^\top\boldsymbol d_k<0,
$$

则称 $\boldsymbol d_k$ 为下降方向，因为对充分小的 $\alpha>0$，

$$
f(\boldsymbol x_k+\alpha\boldsymbol d_k)
=f(\boldsymbol x_k)+\alpha\nabla f(\boldsymbol x_k)^\top\boldsymbol d_k
+o(\alpha)<f(\boldsymbol x_k).
$$

负梯度方向 $\boldsymbol d_k=-\nabla f(\boldsymbol x_k)$ 在非驻点处必为下降方向。若矩阵 $\boldsymbol B$ 正定，则 $-\boldsymbol B\nabla f(\boldsymbol x_k)$ 也是下降方向，因为

$$
-\nabla f^\top\boldsymbol B\nabla f<0.
$$

仅确定下降方向还不够。固定过大的步长可能越过最小点并振荡，过小的步长则使进展极慢。Backtracking–Armijo 规则从 $\alpha=1$ 开始，不断乘以 $\beta\in(0,1)$，直到

$$
f(\boldsymbol x_k+\alpha\boldsymbol d_k)
\leq f(\boldsymbol x_k)+c\alpha\nabla f(\boldsymbol x_k)^\top\boldsymbol d_k,
\tag{17.2}
$$

其中 $c\in(0,1)$。它要求实际下降至少达到线性预测下降的一小部分。Wolfe 条件还会约束新点的梯度，避免步长过小。

停止规则通常联合使用

$$
\|\nabla f(\boldsymbol x_k)\|\leq\varepsilon_g,
\quad
\|\boldsymbol x_{k+1}-\boldsymbol x_k\|\leq\varepsilon_x,
\quad
|f(\boldsymbol x_{k+1})-f(\boldsymbol x_k)|\leq\varepsilon_f.
$$

后两者单独使用都可能在算法停滞时误判。约束问题还需检查可行性，近端方法则常用梯度映射或对偶间隙。容差应与变量尺度匹配；把收益率从百分数改成小数会改变梯度和步长的数量级，却不改变理论最优解。

## 17.2 光滑性、下降引理与梯度法

### 17.2.1 $L$-光滑与强凸

**定义 17.1（$L$-光滑）**

若 $f$ 可微且存在 $L>0$ 使

$$
\|\nabla f(\boldsymbol x)-\nabla f(\boldsymbol y)\|
\leq L\|\boldsymbol x-\boldsymbol y\|,
\qquad\forall\boldsymbol x,\boldsymbol y,
\tag{17.3}
$$

则称 $f$ 为 $L$-光滑函数。若 $f$ 二阶连续可微且 $\nabla^2f(\boldsymbol x)\preceq L\boldsymbol I$，则式（17.3）成立。

**引理 17.2（下降引理）**

若 $f$ 为 $L$-光滑，则对任意 $\boldsymbol x,\boldsymbol y$，

$$
f(\boldsymbol y)\leq f(\boldsymbol x)+
\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x)
+\frac L2\|\boldsymbol y-\boldsymbol x\|^2.
\tag{17.4}
$$

**证明**

由微积分基本定理，

$$
f(\boldsymbol y)-f(\boldsymbol x)
=\int_0^1\nabla f(\boldsymbol x+t(\boldsymbol y-\boldsymbol x))^\top
(\boldsymbol y-\boldsymbol x)\,dt.
$$

减去 $\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x)$，并用 Cauchy–Schwarz 与式（17.3），绝对值不超过

$$
\int_0^1Lt\|\boldsymbol y-\boldsymbol x\|^2dt
=\frac L2\|\boldsymbol y-\boldsymbol x\|^2.
$$

因此得到式（17.4）。

□

若另有 $m>0$ 使 $f(\boldsymbol x)-\frac m2\|\boldsymbol x\|^2$ 为凸函数，则称 $f$ 为 $m$-强凸。对二阶可微函数，这等价于 $\nabla^2f\succeq m\boldsymbol I$。强凸函数有唯一全局最小点，并满足

$$
\|\nabla f(\boldsymbol x)\|^2\geq2m[f(\boldsymbol x)-f^*].
\tag{17.5}
$$

事实上，强凸的一阶下界为

$$
f(\boldsymbol y)\geq f(\boldsymbol x)+
\nabla f(\boldsymbol x)^\top(\boldsymbol y-\boldsymbol x)
+\frac m2\|\boldsymbol y-\boldsymbol x\|^2.
$$

对右端关于 $\boldsymbol y$ 求最小，最小点 $\boldsymbol y=\boldsymbol x-\nabla f(\boldsymbol x)/m$，得到 $f^*\geq f(\boldsymbol x)-\|\nabla f(\boldsymbol x)\|^2/(2m)$，整理即式（17.5）。

### 17.2.2 梯度下降的一步进展

梯度法取 $\boldsymbol x_{k+1}=\boldsymbol x_k-\alpha\nabla f(\boldsymbol x_k)$。当 $\alpha=1/L$ 时，把式（17.4）中的 $\boldsymbol y$ 取为新点，得

$$
\begin{aligned}
f(\boldsymbol x_{k+1})
&\leq f(\boldsymbol x_k)-\frac1L\|\nabla f(\boldsymbol x_k)\|^2
+\frac{L}{2L^2}\|\nabla f(\boldsymbol x_k)\|^2\\
&=f(\boldsymbol x_k)-\frac1{2L}\|\nabla f(\boldsymbol x_k)\|^2.
\end{aligned}
\tag{17.6}
$$

因此，只要梯度非零，目标就严格下降。将式（17.6）从 $0$ 到 $k-1$ 相加，

$$
\frac1{2L}\sum_{j=0}^{k-1}\|\nabla f(\boldsymbol x_j)\|^2
\leq f(\boldsymbol x_0)-f(\boldsymbol x_k)
\leq f(\boldsymbol x_0)-f^*.
$$

所以 $\min_{j<k}\|\nabla f(\boldsymbol x_j)\|^2=O(1/k)$，并且最小梯度趋于零。若 $f$ 非凸，这仍然只是驻点意义下的收敛证据，不保证全局最优。

**定理 17.3（凸与强凸情形的速率）**

设 $f$ 为 $L$-光滑凸函数，最小点 $\boldsymbol x^*$ 存在，步长为 $1/L$。则

$$
f(\boldsymbol x_k)-f^*
\leq\frac{L}{2k}\|\boldsymbol x_0-\boldsymbol x^*\|^2.
\tag{17.7}
$$

若 $f$ 还为 $m$-强凸，则

$$
f(\boldsymbol x_k)-f^*
\leq\left(1-\frac mL\right)^k[f(\boldsymbol x_0)-f^*].
\tag{17.8}
$$

**证明要点**

式（17.7）的标准证明同时使用式（17.6）、凸性下界

$$
f(\boldsymbol x_j)-f^*\leq
\nabla f(\boldsymbol x_j)^\top(\boldsymbol x_j-\boldsymbol x^*)
$$

以及到最优点距离的递推，再对目标间隙的加权和求和。这里强调的是假设：$L$-光滑、凸性和步长缺一不可。

式（17.8）可由式（17.6）与式（17.5）直接得到：

$$
f(\boldsymbol x_{j+1})-f^*
\leq f(\boldsymbol x_j)-f^*-
\frac1{2L}\|\nabla f(\boldsymbol x_j)\|^2
\leq\left(1-\frac mL\right)(f(\boldsymbol x_j)-f^*).
$$

逐次递推即得。

□

比值 $\kappa=L/m$ 称为条件数。$\kappa$ 越大，式（17.8）中的因子 $1-1/\kappa$ 越接近 $1$，梯度法越慢。这与椭圆长轴和短轴尺度悬殊的几何图像一致。

若使用步长 $\alpha=2/(m+L)$，还可通过积分形式的中值定理证明

$$
\|\boldsymbol x_{k+1}-\boldsymbol x^*\|
\leq\frac{\kappa-1}{\kappa+1}
\|\boldsymbol x_k-\boldsymbol x^*\|.
\tag{17.9}
$$

因为 $\nabla f(\boldsymbol x_k)=\boldsymbol H_k(\boldsymbol x_k-\boldsymbol x^*)$，其中 $\boldsymbol H_k$ 的特征值位于 $[m,L]$，故矩阵 $\boldsymbol I-\alpha\boldsymbol H_k$ 的谱范数不超过 $(L-m)/(L+m)$。

**例 17.1**

对 $f(x,y)=\frac12(x^2+100y^2)$ 使用梯度法，解释收敛速度并给出一种预处理方向。

**解**

Hessian 为 $\operatorname{diag}(1,100)$，所以 $m=1,L=100,\kappa=100$。若 $\alpha=1/L=0.01$，则

$$
x_{k+1}=0.99x_k,\qquad y_{k+1}=0,
$$

短轴方向一步消除，长轴方向仍以 $0.99$ 收缩。若统一采用较大步长，例如 $\alpha=0.1$，则 $y$ 方向因子 $1-100\alpha=-9$，会发散。可取预处理矩阵

$$
\boldsymbol B=\operatorname{diag}(1,1/100),
$$

方向 $-\boldsymbol B\nabla f(x,y)=-(x,y)$，单位步长即达最小点。预处理的目标不是改变最优点，而是改善局部曲率尺度。

## 17.3 Newton 法与拟 Newton 法

### 17.3.1 Newton 方向及局部二次收敛

在 $\boldsymbol x_k$ 附近使用二阶模型

$$
f(\boldsymbol x_k+\boldsymbol d)
\approx f(\boldsymbol x_k)+
\boldsymbol g_k^\top\boldsymbol d+
\frac12\boldsymbol d^\top\boldsymbol H_k\boldsymbol d,
$$

其中 $\boldsymbol g_k=\nabla f(\boldsymbol x_k)$、$\boldsymbol H_k=\nabla^2f(\boldsymbol x_k)$。若 $\boldsymbol H_k$ 可逆，模型的驻点给出 Newton 方向

$$
\boldsymbol d_k^N=-\boldsymbol H_k^{-1}\boldsymbol g_k.
\tag{17.10}
$$

若 $\boldsymbol H_k\succ0$ 且 $\boldsymbol g_k\neq0$，该方向为下降方向；若 Hessian 不定，Newton 步可能朝向鞍点或上升。

**定理 17.4（Newton 法的局部二次收敛）**

设 $\boldsymbol x^*$ 为非奇异驻点，$\nabla^2f(\boldsymbol x^*)$ 可逆，且 Hessian 在 $\boldsymbol x^*$ 附近 Lipschitz 连续。则从足够接近 $\boldsymbol x^*$ 的点出发，纯 Newton 迭代收敛，并存在常数 $C$ 使最终有

$$
\|\boldsymbol x_{k+1}-\boldsymbol x^*\|
\leq C\|\boldsymbol x_k-\boldsymbol x^*\|^2.
\tag{17.11}
$$

**证明思路**

记 $\boldsymbol e_k=\boldsymbol x_k-\boldsymbol x^*$。由 $\nabla f(\boldsymbol x^*)=0$ 和 Hessian Lipschitz，

$$
\boldsymbol g_k=\boldsymbol H_k\boldsymbol e_k+\boldsymbol r_k,
\qquad\|\boldsymbol r_k\|=O(\|\boldsymbol e_k\|^2).
$$

于是

$$
\boldsymbol e_{k+1}
=\boldsymbol e_k-\boldsymbol H_k^{-1}\boldsymbol g_k
=-\boldsymbol H_k^{-1}\boldsymbol r_k.
$$

在最优点附近 $\|\boldsymbol H_k^{-1}\|$ 有界，即得二次误差界。足够接近也保证误差逐步缩小。

□

“局部”不可省略。对非凸函数，纯 Newton 法可能不收敛；全局实现通常结合线搜索、信赖域或 Hessian 修正。求解 Newton 方向时应解线性系统 $\boldsymbol H_k\boldsymbol d=-\boldsymbol g_k$，而不是显式计算逆矩阵。

**例 17.2**

对 $f(x)=\frac12ax^2$（$a>0$）计算 Newton 步，并说明二次目标为何一步收敛。

**解**

$g_k=ax_k$、$H_k=a$，故

$$
x_{k+1}=x_k-\frac1a(ax_k)=0.
$$

二阶模型与原函数完全相同，Newton 法直接求出模型的最小点。若 $a<0$，同一公式也会一步到原点，但原点是最大点，说明可逆并不等于下降或最小化。

### 17.3.2 BFGS 与曲率条件

拟 Newton 法用历史迭代构造 Hessian 或其逆的近似，避免每次计算完整二阶导数。令

$$
\boldsymbol s_k=\boldsymbol x_{k+1}-\boldsymbol x_k,
\qquad
\boldsymbol y_k=\nabla f(\boldsymbol x_{k+1})-\nabla f(\boldsymbol x_k).
$$

割线条件要求新的 Hessian 近似 $\boldsymbol B_{k+1}$ 满足 $\boldsymbol B_{k+1}\boldsymbol s_k=\boldsymbol y_k$；逆 Hessian 近似则满足 $\boldsymbol H_{k+1}\boldsymbol y_k=\boldsymbol s_k$。BFGS 的逆更新为

$$
\boldsymbol H_{k+1}
=(\boldsymbol I-\rho_k\boldsymbol s_k\boldsymbol y_k^\top)
\boldsymbol H_k
(\boldsymbol I-\rho_k\boldsymbol y_k\boldsymbol s_k^\top)
+\rho_k\boldsymbol s_k\boldsymbol s_k^\top,
\quad
\rho_k=\frac1{\boldsymbol y_k^\top\boldsymbol s_k}.
\tag{17.12}
$$

若 $\boldsymbol H_k\succ0$ 且 $\boldsymbol y_k^\top\boldsymbol s_k>0$，则 $\boldsymbol H_{k+1}\succ0$，因为第一项共轭变换保持半正定，第二项是正定秩一修正。曲率条件在强 Wolfe 线搜索下可以得到保证；若直接跳过检查，近似矩阵可能失去正定性，从而不再产生可靠下降方向。

## 17.4 投影梯度法

考虑约束问题 $\min_{\boldsymbol x\in C}f(\boldsymbol x)$，其中 $C$ 为非空闭凸集。投影梯度法为

$$
\boldsymbol x_{k+1}
=\mathcal P_C(\boldsymbol x_k-\alpha_k\nabla f(\boldsymbol x_k)),
\tag{17.13}
$$

其中 $\mathcal P_C(\boldsymbol v)=\arg\min_{\boldsymbol x\in C}\|\boldsymbol v-\boldsymbol x\|$。

其最优性条件可由投影变分不等式直接推导。若 $f$ 为凸函数，则 $\boldsymbol x^*$ 为约束最小点当且仅当

$$
\nabla f(\boldsymbol x^*)^\top(\boldsymbol y-\boldsymbol x^*)\geq0,
\qquad\forall\boldsymbol y\in C.
\tag{17.14}
$$

由第15章投影性质，式（17.14）等价于对任意 $\alpha>0$，

$$
\boldsymbol x^*=\mathcal P_C(\boldsymbol x^*-\alpha\nabla f(\boldsymbol x^*)).
$$

因此“投影后不再移动”不是人为规定的启发式，而是约束最优性的固定点表达。

盒约束 $C=\{\boldsymbol x:l_i\leq x_i\leq u_i\}$ 的投影逐坐标为

$$
[\mathcal P_C(\boldsymbol v)]_i=\min\{u_i,\max\{l_i,v_i\}\}.
$$

概率单纯形上的投影通常通过求阈值 $\tau$，使 $x_i=(v_i-\tau)_+$ 且 $\sum_i x_i=1$；排序后可在 $O(n\log n)$ 时间完成。若每次投影本身极昂贵，投影梯度法的一步成本就不能只按梯度计算估计。

**例 17.3**

求 $\min_{x\in[0,1]}(x-2)^2$ 的投影梯度固定点，并验证式（17.14）。

**解**

无约束最小点 $2$ 被投影到 $1$，故候选 $x^*=1$。梯度 $f'(1)=-2$，对任意 $y\in[0,1]$，

$$
f'(1)(y-1)=-2(y-1)\geq0.
$$

故 $x^*=1$ 为全局最小点。投影固定点也成立：$1-\alpha f'(1)=1+2\alpha$ 投影到 $[0,1]$ 后仍为 $1$。

## 17.5 近端算法与软阈值

### 17.5.1 近端算子

**定义 17.5（近端算子）**

对闭凸函数 $g$ 和参数 $\alpha>0$，其近端算子定义为

$$
\operatorname{prox}_{\alpha g}(\boldsymbol v)
=\arg\min_{\boldsymbol x}
\left\{g(\boldsymbol x)+\frac1{2\alpha}
\|\boldsymbol x-\boldsymbol v\|^2\right\}.
\tag{17.15}
$$

若 $g$ 为闭 proper 凸函数，强凸的二次项使极小点存在且唯一。近端算子可视为对 $g$ 的“带信任局部惩罚的最小化”。

考虑复合问题

$$
\min_{\boldsymbol x}F(\boldsymbol x)=f(\boldsymbol x)+g(\boldsymbol x),
$$

其中 $f$ 光滑、$g$ 可能非光滑。近端梯度法为

$$
\boldsymbol x_{k+1}
=\operatorname{prox}_{\alpha_kg}
(\boldsymbol x_k-\alpha_k\nabla f(\boldsymbol x_k)).
\tag{17.16}
$$

若 $g$ 在 $\boldsymbol x_{k+1}$ 可微，则式（17.15）的一阶条件给出

$$
\nabla g(\boldsymbol x_{k+1})
+\frac1{\alpha_k}(\boldsymbol x_{k+1}-\boldsymbol x_k+\alpha_k\nabla f(\boldsymbol x_k))=0.
$$

非可微时用次微分代替梯度。该式把光滑部分的显式梯度步与非光滑部分的隐式近端步结合起来。

**例 17.4（$\ell_1$ 近端与软阈值）**

设 $g(x)=\lambda|x|$，推导 $\operatorname{prox}_{\alpha g}(v)$。

**解**

目标为

$$
\lambda|x|+\frac1{2\alpha}(x-v)^2.
$$

当 $x>0$，驻点满足 $\lambda+(x-v)/\alpha=0$，所以 $x=v-\alpha\lambda$；该正解有效当且仅当 $v>\alpha\lambda$。当 $x<0$，同理得 $x=v+\alpha\lambda$，有效当且仅当 $v<-\alpha\lambda$。当 $|v|\leq\alpha\lambda$ 时，$x=0$ 的次微分条件为

$$
0\in\lambda[-1,1]-\frac v\alpha,
$$

即 $|v|\leq\alpha\lambda$。因此

$$
\operatorname{prox}_{\alpha\lambda|\cdot|}(v)
=\operatorname{sgn}(v)(|v|-\alpha\lambda)_+.
\tag{17.17}
$$

式（17.17）称为软阈值。它同时产生收缩和精确的零，是 ISTA 求解 Lasso 时稀疏性的来源。若 $g(x)=\frac{\lambda}{2}x^2$，则近端只是 $v/(1+\alpha\lambda)$，只收缩而不产生精确零。

在 $f$ 为 $L$-光滑、$g$ 为闭凸、复合目标存在最优解且步长适当（常用 $\alpha=1/L$）时，ISTA 的目标间隙通常为 $O(1/k)$；FISTA 通过动量外推可提高到 $O(1/k^2)$，但动量方法不再保证每次迭代目标单调下降。强凸条件下可进一步获得线性收敛，具体常数依赖 $m,L$ 与近端参数。

## 17.6 坐标下降与非凸问题的边界

坐标下降每次只更新一个坐标或一个坐标块：

$$
x_{i}^{(k+1)}
=\arg\min_{x_i}F(x_1^{(k+1)},\ldots,x_{i-1}^{(k+1)},
x_i,x_{i+1}^{(k)},\ldots,x_n^{(k)}).
\tag{17.18}
$$

当单坐标准最小化有廉价闭式解时，它能显著降低每步成本。例如 Lasso 中固定其他坐标后，目标化为一个二次项加 $\lambda|x_i|$，其解正是软阈值。

若 $F=f(\boldsymbol x)+\sum_i g_i(x_i)$，其中 $f$ 可微凸、$g_i$ 为闭凸，则循环坐标下降具有较完善的收敛理论。关键是非光滑部分按坐标可分。把不可分非光滑项直接交给逐坐标最小化，可能停在并非全局最优的坐标wise 最小点；若单坐标子问题不唯一或目标非凸，也需要额外规则。

非凸问题中，梯度为零只表示一阶驻点。它可能是局部极小、局部极大或鞍点。实际训练还应检查：

- 不同初值是否导向不同解；
- 目标尺度与验证误差是否同步改善；
- 是否出现 NaN、Inf 或梯度爆炸；
- 停止时是否只是达到了迭代上限；
- 数据预处理是否使不同训练运行不可比。

金融模型中的样本外表现不是数学收敛性的替代品。算法可以精确最小化训练损失，却同时精确拟合噪声；反之，提前停止有时虽然没有达到训练最优，却起到了正则化作用。

## 17.7 算法选择的量化视角

岭回归目标

$$
\frac12\|\boldsymbol X\boldsymbol\beta-\boldsymbol y\|^2+
\frac\lambda2\|\boldsymbol\beta\|^2
$$

具有强凸二次结构，可直接解线性系统，也可用梯度、共轭梯度或 Newton 法。Lasso 把第二项换成 $\lambda\|\boldsymbol\beta\|_1$，光滑部分与可分非光滑部分的结构使近端和坐标下降更合适。带盒约束的组合优化若投影廉价，可用投影梯度；若还含不可分惩罚，则可能需要近端投影或更一般的分裂算法。

Newton 法每步成本较高，却常在接近解时以很少迭代达到高精度；一阶法每步便宜，适合大规模问题，但在病态问题上可能缓慢。算法比较应同时报告每步成本、达到指定精度的迭代数、停止准则和数值容差，而不能只报告其中一个指标。

## 本章小结

下降方向只保证充分小步长下的局部改善，Armijo 等线搜索规则用于把方向转化为稳定迭代。$L$-光滑给出二次上界，强凸给出二次下界；两者共同决定梯度法的收敛速率。一般凸问题的目标间隙为 $O(1/k)$，强凸问题可获得与条件数相关的线性收敛。

Newton 法利用二阶模型，在非奇异且 Hessian Lipschitz 的局部具有二次收敛，但全局使用需要线搜索或曲率修正。BFGS 用割线信息近似曲率，并通过 $\boldsymbol y^\top\boldsymbol s>0$ 保持正定性。投影梯度把无约束步与闭凸集投影结合，近端梯度则处理“光滑项加非光滑凸项”；$\ell_1$ 近端的软阈值解释了稀疏解的计算来源。所有算法的收敛结论都必须与目标结构、步长和停止条件一起陈述。

## 习题

1. 设 $f(x,y)=x^2+y^2$，在点 $(1,1)$ 判断方向 $(-1,0)$、$(1,-1)$、$(1,1)$ 是否为下降方向。
2. 对 $f(x)=\frac12ax^2$（$a>0$），使用固定步长梯度法 $x_{k+1}=(1-\alpha a)x_k$。给出收敛的充要步长条件及最优固定步长。
3. 从下降引理推导步长 $1/L$ 时的一步目标下降量，并说明为何可推出梯度趋于零（假设 $f$ 有有限下界）。
4. 对 $f(x)=\frac12x^\top\operatorname{diag}(1,100)x$，取 $\alpha=0.01$ 和 $\alpha=0.03$，分别计算两个坐标的迭代因子并判断收敛性。
5. 证明 $m$-强凸且 $L$-光滑的函数必有 $m\leq L$，并给出一维等号例子。
6. 若 $f$ 为 $m$-强凸，证明 $\|\nabla f(\boldsymbol x)\|^2\geq2m(f(\boldsymbol x)-f^*)$。
7. 对 $f(x)=x^4/4$ 在 $x=1$ 处计算 Newton 步，并判断纯 Newton 迭代在该点是否直接到达最小点。
8. 对 $f(x)=\frac12x^2$ 说明 Newton 法一步收敛；对 $f(x)=-\frac12x^2$ 说明“一步到驻点”为何不是最小化。
9. 验证 BFGS 逆更新（17.12）满足 $\boldsymbol H_{k+1}\boldsymbol y_k=\boldsymbol s_k$，并在 $\boldsymbol H_k\succ0$、$\boldsymbol y_k^\top\boldsymbol s_k>0$ 时证明其正定性。
10. 求点 $(2,-1,0.5)$ 到盒约束 $0\leq x_i\leq1$ 的欧氏投影。
11. 对 $\min_{x\in[0,1]}(x+1)^2$，求投影梯度固定点并用变分不等式验证。
12. 推导 $\operatorname{prox}_{\alpha\lambda|\cdot|}(v)$ 的三段软阈值公式。
13. 设 $g(\boldsymbol x)=\frac\lambda2\|\boldsymbol x\|^2$，求 $\operatorname{prox}_{\alpha g}(\boldsymbol v)$，并解释其与软阈值的区别。
14. 对 Lasso 目标 $\frac12(y-x\beta)^2+\lambda|\beta|$（$x>0$），推导坐标 $\beta$ 的闭式更新。
15. 判断下列说法并说明理由：
   （a）目标每次下降就必收敛到全局最小；
   （b）非凸光滑函数的梯度法若梯度趋于零，就必收敛到局部最小；
   （c）FISTA 的 $O(1/k^2)$ 速率允许目标值非单调。
16. 某团队称“梯度范数已经很小，所以组合权重已达到全局最优”。分别针对凸约束问题、非凸问题和仅因步长过小而停滞的情形，评价这一结论。
