# 第26章习题参考答案与解析

## 1. 
**证明**

把简单可料过程写成
$$
H_s=\sum_{k=0}^{m-1}H_k\mathbf 1_{(t_k,t_{k+1}]}(s),
$$
其中 $H_k\in\mathcal F_{t_k}$，并记 $\Delta B_k=B_{t_{k+1}}-B_{t_k}$、$\Delta t_k=t_{k+1}-t_k$。于是 $I_T(H)=\sum_kH_k\Delta B_k$。对 $i<j$，先取 $\mathcal F_{t_j}$ 的条件期望，得到
$$
\mathbb E[H_iH_j\Delta B_i\Delta B_j]
=\mathbb E\!\left[H_i\Delta B_iH_j\mathbb E[\Delta B_j\mid\mathcal F_{t_j}]\right]=0.
$$
因此所有交叉项消失。对平方项，利用增量的条件独立性，
$$
\mathbb E[H_k^2(\Delta B_k)^2]
=\mathbb E\!\left[H_k^2\mathbb E[(\Delta B_k)^2\mid\mathcal F_{t_k}]\right]
=\mathbb E[H_k^2]\Delta t_k.
$$
相加即得
$$
\mathbb E[I_T(H)^2]
=\mathbb E\sum_kH_k^2\Delta t_k
=\mathbb E\int_0^TH_s^2\,\mathrm ds.
$$
所以 $H\mapsto I_T(H)$ 是从简单过程到 $L^2(\Omega)$ 的线性等距。对一般平方可积可料过程 $H$，取简单可料过程 $H^{(n)}$，使其在 $L^2(\Omega\times[0,T],\mathbb P\otimes\mathrm dt)$ 中趋于 $H$。等距性给出
$$
\mathbb E[(I_T(H^{(n)})-I_T(H^{(m)}))^2]
=\|H^{(n)}-H^{(m)}\|_2^2\to0,
$$
故积分序列有 $L^2$ 极限，将其定义为 $I_T(H)$。对等距两边取极限便保留等式；两个逼近序列给出同一极限，因为它们的积分之差的二阶矩趋于零。常见错误是不经条件期望便断言交叉项为零，或把被积过程与 Brown 增量误当作独立；稠密性论证给出的是 $L^2$ 极限，而不是未加说明的逐路径极限。

□

## 2. 
**证明**

由第1题，$\mathbb E[M_t^2]=\mathbb E\int_0^tH_s^2\,\mathrm ds<\infty$，且随机积分的连续版本给出连续适应过程。固定 $s<t$，对简单过程，$M_t-M_s$ 是形如 $H_k(B_{u_{k+1}}-B_{u_k})$ 的和，各项在 $\mathcal F_s$ 下的条件期望均为零，因而 $\mathbb E[M_t-M_s\mid\mathcal F_s]=0$。一般 $H$ 用简单过程在 $L^2$ 中逼近；条件期望在 $L^2$ 上连续，所以零条件期望在极限中保留。故 $M$ 是平方可积鞅，并由等距得到题给二阶矩公式。

若只知道 $\int_0^TH_s^2\,\mathrm ds<\infty$ 几乎必然成立，定义
$$
\tau_n=T\wedge\inf\left\{t\ge0:\int_0^tH_s^2\,\mathrm ds\ge n\right\},
$$
并令 $H_s^{(n)}=H_s\mathbf 1_{\{s\le\tau_n\}}$。可料性保证 $\tau_n$ 为停时，且
$$
\mathbb E\int_0^T(H_s^{(n)})^2\,\mathrm ds\le n.
$$
所以 $M_t^{\tau_n}=\int_0^{t\wedge\tau_n}H_s\,\mathrm dB_s$ 是连续平方可积鞅。逐路径积分有限意味着对足够大的 $n$ 有 $\tau_n=T$，故 $\tau_n\uparrow T$ 几乎必然成立，$M$ 是连续局部鞅。常见错误是把路径有限误推为期望有限，或只按 $|M_t|$ 局部化而不控制被积过程的积分平方。

□

## 3. 
**证明**

记 $h_k=t_{k+1}^n-t_k^n$、$\Delta B_k=B_{t_{k+1}^n}-B_{t_k^n}$，以及 $Q_n=\sum_k(\Delta B_k)^2$。因为 $\Delta B_k\sim N(0,h_k)$，所以 $\mathbb E[(\Delta B_k)^2]=h_k$，从而 $\mathbb E[Q_n-t]=0$。独立增量使中心化后的各项不相关，故
$$
\begin{aligned}
\mathbb E[(Q_n-t)^2]
&=\sum_k\operatorname{Var}((\Delta B_k)^2)\\
&=\sum_k\left(\mathbb E[(\Delta B_k)^4]-h_k^2\right)
=2\sum_kh_k^2.
\end{aligned}
$$
这里正态四阶矩 $\mathbb E[(\Delta B_k)^4]=3h_k^2$ 给出了系数 $2$。于是
$$
\mathbb E[(Q_n-t)^2]\le2\max_kh_k\sum_kh_k
=2t\max_kh_k\to0.
$$
这证明了 $L^2$ 收敛；Chebyshev 不等式随即给出依概率收敛。独立增量用于消除交叉矩，正态四阶矩用于计算每个平方项的方差，两者作用不可混同。常见错误是把四阶矩写成 $h_k^2$，或只凭依概率收敛便断言对任意网眼序列都几乎必然收敛。

□

## 4. 
**证明**

先用停时使 $X$、$f'(X)$、$f''(X)$ 有界，并使 $A$ 的总变差有界；结论成立后去局部化。对分划作 Taylor 展开并求和：
$$
\begin{aligned}
f(X_t)-f(X_0)
={}&\sum_kf'(X_{t_k})\Delta_kX
+\frac12\sum_kf''(X_{t_k})(\Delta_kX)^2+\sum_kR_k,\\
R_k={}&\frac12\left(f''(\xi_k)-f''(X_{t_k})\right)(\Delta_kX)^2,
\end{aligned}
$$
其中 $\xi_k$ 位于区间两端之间。第一项按连续半鞅随机积分的定义依概率趋于 $\int_0^tf'(X_s)\,\mathrm dX_s$。又因 $\Delta_kX=\Delta_kA+\Delta_kM$，
$$
(\Delta_kX)^2=(\Delta_kM)^2+2\Delta_kA\Delta_kM+(\Delta_kA)^2.
$$
连续有限变差项满足
$$
\sum_k(\Delta_kA)^2\le \sup_k|\Delta_kA|\,V_t(A)\to0,
$$
而鞅平方增量和趋于 $[M]_t$。Cauchy--Schwarz 不等式于是给出
$$
\left|\sum_k\Delta_kA\Delta_kM\right|
\le\left(\sum_k(\Delta_kA)^2\right)^{1/2}
\left(\sum_k(\Delta_kM)^2\right)^{1/2}\to0
$$
依概率成立。由于 $f''$ 在紧集上一致连续且 $\sup_k|\Delta_kX|\to0$，
$$
\sum_k|R_k|\le \frac12\sup_k|f''(\xi_k)-f''(X_{t_k})|
\sum_k(\Delta_kX)^2\to0.
$$
把这些极限代回并对 $f''(X_{t_k})$ 的平方增量和取随机积分极限，即得所求公式。若 $f\in C^3$，也可用 $|R_k|\le C|\Delta_kX|^3$ 及 $\sum_k|\Delta_kX|^3\le\sup_k|\Delta_kX|\sum_k(\Delta_kX)^2$ 控制余项。常见错误是保留并不存在的连续有限变差二次变差，或在没有局部化和一致连续估计的情况下直接舍弃 Taylor 余项。

□

## 5. 
在解保持为正时，对 $\log S_t$ 使用 Itô 公式：
$$
\mathrm d\log S_t=\frac{\mathrm dS_t}{S_t}
-\frac12\frac{\mathrm d[S]_t}{S_t^2}
=\left(\mu-\frac12\sigma^2\right)\mathrm dt+\sigma\,\mathrm dB_t.
$$
积分得到候选解
$$
S_t=S_0\exp\left(\left(\mu-\frac12\sigma^2\right)t+\sigma B_t\right).
$$
反过来，令 $Y_t=(\mu-\sigma^2/2)t+\sigma B_t$ 且 $S_t=S_0e^{Y_t}$。Itô 公式给出
$$
\mathrm dS_t=S_t\,\mathrm dY_t+\frac12S_t\,\mathrm d[Y]_t
=\mu S_t\,\mathrm dt+\sigma S_t\,\mathrm dB_t,
$$
初值也相符，故候选过程确实满足原方程，并始终为正。进一步，
$$
\log\frac{S_t}{S_0}=\left(\mu-\frac12\sigma^2\right)t+\sigma B_t,
$$
所以对数收益漂移为 $\mu-\sigma^2/2$。差额 $-\sigma^2/2$ 来自指数函数的二阶项和 $[\sigma B]_t=\sigma^2t$，即波动率对对数复合收益的拖累。常见错误是把对数漂移写成 $\mu$，或在验证指数解时把 Itô 修正的符号再取反；算术收益漂移与对数收益漂移不能直接等同。
## 6. 
**证明**

令 $X_t=\int_0^t\sigma_s\,\mathrm dB_s-\frac12\int_0^t\sigma_s^2\,\mathrm ds$，则 $[X]_t=\int_0^t\sigma_s^2\,\mathrm ds$。对 $Z_t=e^{X_t}$ 用 Itô 公式，两个有限变差项相消，得到
$$
\mathrm dZ_t=Z_t\,\mathrm dX_t+\frac12Z_t\,\mathrm d[X]_t
=\sigma_tZ_t\,\mathrm dB_t,
\qquad Z_0=1.
$$
因此 $Z$ 是连续正局部鞅。确定性被积过程使 $I_{s,t}=\int_s^t\sigma_u\,\mathrm dB_u$ 与 $\mathcal F_s$ 独立，且
$$
I_{s,t}\sim N\left(0,\int_s^t\sigma_u^2\,\mathrm du\right).
$$
由正态矩母函数，
$$
\mathbb E\left[\exp\left(I_{s,t}-\frac12\int_s^t\sigma_u^2\,\mathrm du\right)\right]=1.
$$
将 $Z_t=Z_s\exp(I_{s,t}-\frac12\int_s^t\sigma_u^2\,\mathrm du)$ 取条件期望，即得 $\mathbb E[Z_t\mid\mathcal F_s]=Z_s$，所以 $Z$ 是真鞅；事实上 $\mathbb E[Z_t^2]=\exp(\int_0^t\sigma_s^2\,\mathrm ds)<\infty$。推广到一般可料 $\sigma$ 后，增量不必独立，也不必服从正态分布，上述矩母函数恒等式不再自动成立，正指数局部鞅可能是严格局部鞅。常见错误是把确定性高斯论证原样用于随机波动率，或只凭局部鞅性和正值性便断言真鞅性。

□
## 7. 
**证明**

Itô 公式先给出
$$
f(X_t)=f(X_0)+\int_0^tf'(X_s)\,\mathrm dX_s
+\frac12\int_0^tf''(X_s)\,\mathrm d[X]_s.
$$
令 $Y_s=f'(X_s)$。由于 $f\in C^3$，再次使用 Itô 公式：
$$
\mathrm dY_s=f''(X_s)\,\mathrm dX_s+\frac12f'''(X_s)\,\mathrm d[X]_s.
$$
第二项具有连续有限变差，与 $X$ 的协变差为零，因此
$$
[Y,X]_t=\int_0^tf''(X_s)\,\mathrm d[X]_s.
$$
代回 Stratonovich 积分的定义，
$$
\begin{aligned}
\int_0^tf'(X_s)\circ\mathrm dX_s
&=\int_0^tf'(X_s)\,\mathrm dX_s+\frac12[Y,X]_t\\
&=\int_0^tf'(X_s)\,\mathrm dX_s+\frac12\int_0^tf''(X_s)\,\mathrm d[X]_s,
\end{aligned}
$$
恰与 Itô 公式右端相同，二阶项由此抵消。常见错误是把 $[Y,X]$ 中的 $f''(X_s)$ 提出积分，或误让 $f'''$ 的有限变差项贡献协变差。

□

## 8. 
Stratonovich 修正满足
$$
\sigma S_t\circ\mathrm dB_t
=\sigma S_t\,\mathrm dB_t+\frac12\,\mathrm d[\sigma S,B]_t
=\sigma S_t\,\mathrm dB_t+\frac12\sigma^2S_t\,\mathrm dt.
$$
故原方程的 Itô 形式为
$$
\frac{\mathrm dS_t}{S_t}
=\left(\mu+\frac12\sigma^2\right)\mathrm dt+\sigma\,\mathrm dB_t.
$$
由第5题，显式解和对数价格分别为
$$
S_t=S_0\exp(\mu t+\sigma B_t),
\qquad
\log\frac{S_t}{S_0}=\mu t+\sigma B_t.
$$
若同一参数 $\mu$ 出现在 Itô 方程 $\mathrm dS_t/S_t=\mu\,\mathrm dt+\sigma\,\mathrm dB_t$ 中，则对数漂移是 $\mu-\sigma^2/2$，且 $\mathbb E[S_t]=S_0e^{\mu t}$；在 Stratonovich 写法中，对数漂移是 $\mu$，价格期望的增长率却是 $\mu+\sigma^2/2$。因此同一 $\mu$ 在两种约定下代表不同的经济漂移。常见错误是换算时减去而不是加上 $\sigma^2/2$，或不说明积分约定就比较预期收益率。
## 9. 
**证明**

取 $\phi_\varepsilon(x)=\sqrt{x^2+\varepsilon^2}$，则
$$
\phi_\varepsilon'(x)=\frac{x}{\sqrt{x^2+\varepsilon^2}},
\qquad
\phi_\varepsilon''(x)=\frac{\varepsilon^2}{(x^2+\varepsilon^2)^{3/2}}.
$$
Itô 公式给出
$$
\phi_\varepsilon(B_t-a)=\phi_\varepsilon(B_0-a)
+\int_0^t\phi_\varepsilon'(B_s-a)\,\mathrm dB_s
+\frac12\int_0^t\phi_\varepsilon''(B_s-a)\,\mathrm ds.
$$
逐点有 $\phi_\varepsilon(x)\to|x|$，且在 $x\ne0$ 时 $\phi_\varepsilon'(x)\to\operatorname{sgn}(x)$。又由 Fubini 定理，$\int_0^t\mathbf 1_{\{B_s=a\}}\,\mathrm ds=0$ 几乎必然成立，故控制收敛给出
$$
\int_0^t|\phi_\varepsilon'(B_s-a)-\operatorname{sgn}(B_s-a)|^2\,\mathrm ds\to0.
$$
先局部化，再利用 Itô 等距和随机积分的极大不等式，可知随机积分依概率收敛。左端趋于 $|B_t-a|-|B_0-a|$，所以剩余项也有极限，记为 $L_t^a$，即得 Tanaka 公式。这里先固定 $\varepsilon$ 使用 Itô 公式，再以等距证明随机积分极限存在，并非无依据地交换极限。
每个逼近余量都非减，故其连续极限 $L^a$ 非减。若某时间区间上 $|B_s-a|\ge\eta>0$，则
$$
0\le\frac12\int_u^v\phi_\varepsilon''(B_s-a)\,\mathrm ds
\le\frac{\varepsilon^2(v-u)}{2\eta^3}\to0,
$$
所以 $L^a$ 在离开水平 $a$ 的区间上不增加，其 Stieltjes 测度支撑于 $\{s\le t:B_s=a\}$。常见错误是直接对绝对值函数使用普通 Itô 公式，或只证明非减而不验证增加集合。

□
## 10. 
**证明**

令 $\rho_\varepsilon(x)=\frac12\varepsilon^2(x^2+\varepsilon^2)^{-3/2}$，则 $\int_{\mathbb R}\rho_\varepsilon(x)\,\mathrm dx=1$。第9题给出
$$
L_t^{a,\varepsilon}=\int_0^t\rho_\varepsilon(B_s-a)\,\mathrm ds.
$$
对连续紧支撑函数 $g$，Fubini 定理和变量替换给出
$$
\begin{aligned}
\int_{\mathbb R}g(a)L_t^{a,\varepsilon}\,\mathrm da
&=\int_0^t\int_{\mathbb R}g(a)\rho_\varepsilon(B_s-a)\,\mathrm da\,\mathrm ds\\
&=\int_0^t(g*\rho_\varepsilon)(B_s)\,\mathrm ds.
\end{aligned}
$$
当 $\varepsilon\downarrow0$ 时，$g*\rho_\varepsilon\to g$ 一致成立，故右端趋于 $\int_0^tg(B_s)\,\mathrm ds$；左端由 Tanaka 逼近趋于 $\int_{\mathbb R}g(a)L_t^a\,\mathrm da$，这里取局部时间关于 $a$ 可测的版本。因此公式先对连续紧支撑函数成立。两侧关于 $g$ 都是有限测度的积分，用有界收敛和单调类定理即可推广到一般有界 Borel 函数。
最后，$\operatorname{sgn}^2(B_s)=1$ 对 Lebesgue 时间几乎必然成立，所以 $X_t=\int_0^t\operatorname{sgn}(B_s)\,\mathrm dB_s$ 是均值零的平方可积鞅。由 $B_0=0$ 及 Tanaka 公式，
$$
\mathbb E[L_t^0]=\mathbb E|B_t|-\mathbb E[X_t]
=\sqrt{\frac{2t}{\pi}}.
$$
常见错误是把随机积分的均值误算为非零，或只验证光滑 $g$ 而省略向可测函数的测度论推广。

□
## 11. 
**证明**

固定 $s<t$ 和 $\theta\in\mathbb R^d$，对 $u\ge s$ 定义
$$
Z_u=\exp\left(i\theta^\top X_u+\frac12\|\theta\|^2u\right).
$$
复指数函数的 Itô 展开仍然适用。由 $\langle X^j,X^k\rangle_u=\delta_{jk}u$，
$$
\begin{aligned}
\mathrm dZ_u
={}&iZ_u\theta^\top\mathrm dX_u
+\frac12\|\theta\|^2Z_u\,\mathrm du\\
&-\frac12Z_u\sum_{j,k}\theta_j\theta_k\,\mathrm d\langle X^j,X^k\rangle_u
=iZ_u\theta^\top\mathrm dX_u.
\end{aligned}
$$
在 $[s,t]$ 上，$|Z_u|\le e^{\|\theta\|^2t/2}$，有界局部鞅必为真鞅，故 $\mathbb E[Z_t\mid\mathcal F_s]=Z_s$。整理得
$$
\mathbb E\left[e^{i\theta^\top(X_t-X_s)}\mid\mathcal F_s\right]
=e^{-\|\theta\|^2(t-s)/2}.
$$
右端不依赖 $\mathcal F_s$。对任意有界 $\mathcal F_s$ 可测随机变量 $\xi$，将上式乘以 $\xi$ 再取期望，联合特征函数便分解，所以 $X_t-X_s$ 独立于 $\mathcal F_s$，且服从 $N(0,(t-s)I_d)$。结合 $X_0=0$ 和路径连续性，这正是一个关于原滤过的 $d$ 维标准 Brown 运动。常见错误是只由二次变差推断正态性，或只验证坐标边缘正态而未证明增量对整个滤过独立。

□
## 12. 
**证明**

由随机积分的二次变差公式，
$$
[X]_t=\int_0^t\operatorname{sgn}^2(B_s)\,\mathrm ds.
$$
对任一固定的 $s>0$，$\mathbb P(B_s=0)=0$。Fubini 定理给出
$$
\mathbb E\int_0^t\mathbf 1_{\{B_s=0\}}\,\mathrm ds
=\int_0^t\mathbb P(B_s=0)\,\mathrm ds=0.
$$
所以零点集合的 Lebesgue 测度为零，$[X]_t=t$ 几乎必然成立。同时
$$
\mathbb E\int_0^t\operatorname{sgn}^2(B_s)\,\mathrm ds=t<\infty,
$$
故 $X$ 是连续平方可积鞅，第11题说明 $X$ 是标准 Brown 运动。只要 $\operatorname{sgn}(0)$ 取有限值，改变单点取值至多影响一个 Lebesgue 零测时间集，不改变积分、二次变差或结论。常见错误是未经零占用时间论证便把 $\operatorname{sgn}^2(B_s)$ 写成 $1$，或误以为符号函数与 Brown 增量独立。

□
## 13. 
**证明**

由 $2XY=(X+Y)^2-X^2-Y^2$ 及对三个平方分别使用 Itô 公式，
$$
\begin{aligned}
2\,\mathrm d(XY)
={}&2(X+Y)\,\mathrm d(X+Y)+\mathrm d[X+Y]\\
&-2X\,\mathrm dX-\mathrm d[X]-2Y\,\mathrm dY-\mathrm d[Y].
\end{aligned}
$$
利用双线性性 $[X+Y]=[X]+2[X,Y]+[Y]$，化简即得
$$
\mathrm d(XY)=X\,\mathrm dY+Y\,\mathrm dX+\mathrm d[X,Y].
$$
这也正是一阶乘积法则之外必须保留的二阶协变差项。设两价格满足
$$
\frac{\mathrm dS_t^i}{S_t^i}=\mu_i\,\mathrm dt+\sigma_i\,\mathrm dB_t^i,
\qquad
\mathrm d[B^1,B^2]_t=\rho\,\mathrm dt.
$$
Itô 对数公式给出
$$
\mathrm d\log S_t^i=\left(\mu_i-\frac12\sigma_i^2\right)\mathrm dt+\sigma_i\,\mathrm dB_t^i.
$$
两式相减，得到
$$
\mathrm d\log\frac{S_t^1}{S_t^2}
=\left(\mu_1-\mu_2-\frac12\sigma_1^2+\frac12\sigma_2^2\right)\mathrm dt
+\sigma_1\,\mathrm dB_t^1-\sigma_2\,\mathrm dB_t^2.
$$因此扩散系数可写为 $\sqrt{\sigma_1^2+\sigma_2^2-2\rho\sigma_1\sigma_2}$，瞬时方差为
$$
\left(\sigma_1^2+\sigma_2^2-2\rho\sigma_1\sigma_2\right)\mathrm dt.
$$
常见错误是乘积公式漏掉 $\mathrm d[X,Y]$，对数比直接写成 $\mu_1-\mu_2$ 而漏掉两个 Itô 修正，或把相关项的负号写反。

□
## 14. 
**证明**

记 $\boldsymbol X=\boldsymbol A+\boldsymbol M$，其中 $\mathrm d\boldsymbol A_s=\boldsymbol\mu_s\,\mathrm ds$，$\mathrm d\boldsymbol M_s=\boldsymbol\sigma_s\,\mathrm d\boldsymbol B_s$。先局部化，使 $\boldsymbol\mu$ 和 $\boldsymbol\sigma$ 有界；最后去局部化即可把依概率极限恢复到原过程。令 $\delta_k=t_{k+1}^n-t_k^n$，$h_n=\max_k\delta_k$，则
$$
\begin{aligned}
\mathrm{RV}_T^{(n)}
={}&\sum_k\|\Delta_k\boldsymbol A\|^2
+2\sum_k(\Delta_k\boldsymbol A)^\top\Delta_k\boldsymbol M
+\sum_k\|\Delta_k\boldsymbol M\|^2.
\end{aligned}
$$
以下分别控制这三项。由 Jensen 不等式，
$$
\sum_k\|\Delta_k\boldsymbol A\|^2
\le\sum_k\delta_k\int_{t_k^n}^{t_{k+1}^n}\|\boldsymbol\mu_s\|^2\,\mathrm ds
\le h_n\int_0^T\|\boldsymbol\mu_s\|^2\,\mathrm ds\to0.
$$
再由 Cauchy--Schwarz 不等式，交叉项绝对值不超过
$$
2\left(\sum_k\|\Delta_k\boldsymbol A\|^2\right)^{1/2}
\left(\sum_k\|\Delta_k\boldsymbol M\|^2\right)^{1/2},
$$
其中第二个因子依概率有界，故交叉项趋于零。对鞅项，令 $V_k=\int_{t_k^n}^{t_{k+1}^n}\|\boldsymbol\sigma_s\|^2\,\mathrm ds$。Itô 等距给出
$$
\mathbb E[\|\Delta_k\boldsymbol M\|^2\mid\mathcal F_{t_k^n}]=V_k,
$$
所以 $R_n=\sum_k(\|\Delta_k\boldsymbol M\|^2-V_k)$ 的各项条件均值为零，跨区间交叉矩也为零。Burkholder--Davis--Gundy 不等式及局部化后的有界性给出
$$
\mathbb E[\|\Delta_k\boldsymbol M\|^4\mid\mathcal F_{t_k^n}]
\le C V_k^2,
\qquad V_k\le K\delta_k.
$$
因而
$$
\mathbb E[R_n^2]\le C\sum_k\mathbb E[V_k^2]
\le CKh_n\sum_k\mathbb E\mathbb E[V_k]
=CKh_n\int_0^T\mathbb E\|\boldsymbol\sigma_s\|^2\,\mathrm ds\to0.
$$
所以 $\sum_k\|\Delta_k\boldsymbol M\|^2\to\int_0^T\|\boldsymbol\sigma_s\|^2\,\mathrm ds$ 在 $L^2$ 中成立。合并三项即得 $\mathrm{RV}_T^{(n)}$ 依概率趋于同一积分。连续映射进一步给出已实现波动率
$$
\sqrt{\mathrm{RV}_T^{(n)}}\to
\left(\int_0^T\|\boldsymbol\sigma_s\|^2\,\mathrm ds\right)^{1/2}
$$
依概率成立。常见错误是遗漏漂移与鞅的交叉项，或把不同区间的鞅增量当成无条件独立；正确工具是条件均值和 BDG 矩估计。

□
## 15. 
设有 $m$ 个观测区间，记 $\Delta_kY=\Delta_kX+\eta_k$，其中 $\eta_k=\varepsilon_{k+1}-\varepsilon_k$。展开得
$$
\sum_{k=0}^{m-1}(\Delta_kY)^2
=\sum_{k=0}^{m-1}(\Delta_kX)^2
+2\sum_{k=0}^{m-1}\Delta_kX\,\eta_k
+\sum_{k=0}^{m-1}\eta_k^2.
$$
噪声与 $X$ 独立且均值为零，所以交叉项期望为零。又由独立同分布性，
$$
\mathbb E[\eta_k^2]
=\mathbb E[\varepsilon_{k+1}^2]-2\mathbb E[\varepsilon_k\varepsilon_{k+1}]
+\mathbb E[\varepsilon_k^2]=2\eta^2.
$$
因此对固定 $m$，噪声造成的期望偏差恰为
$$
\mathbb E[\mathrm{RV}^{Y}]-\mathbb E[\mathrm{RV}^{X}]=2m\eta^2.
$$
当 $m\to\infty$ 时偏差为 $O(m)$ 并线性发散；若噪声四阶矩有限，$\sum_k\eta_k^2$ 的方差为 $O(m)$，其随机波动通常为 $O(\sqrt m)$。稀疏取样减少单位时间内使用的区间数，因而降低 $2m\eta^2$ 的噪声偏差；代价是用于估计 $X$ 二次变差的样本减少，离散化误差和统计方差增大。因此取样频率需要在噪声偏差与估计方差之间权衡。若进一步记 $\kappa=\mathbb E[\varepsilon_k^4]<\infty$，则 $\operatorname{Var}(\eta_k^2)=2(\kappa+\eta^4)$。相邻噪声增量的平方共享一个观测误差，其协方差为 $\kappa-\eta^4$，间隔超过一个区间的协方差为零。因此
$$
\operatorname{Var}\left(\sum_{k=0}^{m-1}\eta_k^2\right)
=2m(\kappa+\eta^4)+2(m-1)(\kappa-\eta^4)
=(4m-2)\kappa+2\eta^4=O(m),
$$
这使前述随机波动量级得到严格说明。常见错误是把不同 $k$ 的 $\eta_k$ 当作相互独立；事实上相邻增量因共享 $\varepsilon_{k+1}$ 而负相关，只是其平方和仍具有 $O(m)$ 的方差。另一个错误是只比较噪声偏差而忽略稀疏取样造成的信息损失，或把固定 $m$ 的恒等式误当成 $m\to\infty$ 时仍有界的结论。

## 16. 
**证明**
设银行账户 $A_t$ 满足 $\mathrm dA_t=r_tA_t\,\mathrm dt$，风险资产满足
$$
\frac{\mathrm dS_t^i}{S_t^i}=\mu_t^i\,\mathrm dt+\sum_{j=1}^d\Sigma_t^{ij}\,\mathrm dW_t^j.
$$
以 $\theta_t^i$ 表示股票持仓、$\theta_t^0$ 表示银行账户份额，则 $V_t=\theta_t^0A_t+\boldsymbol\theta_t^\top\boldsymbol S_t$。自融资条件给出
$$
\mathrm dV_t=\theta_t^0\,\mathrm dA_t+\boldsymbol\theta_t^\top\,\mathrm d\boldsymbol S_t.
$$
令 $\pi_t^i=\theta_t^iS_t^i/V_t$，银行权重便是 $1-\boldsymbol 1^\top\boldsymbol\pi_t$。代入持仓并除以 $V_t$，得到
$$
\frac{\mathrm dV_t}{V_t}
=\left[r_t+\boldsymbol\pi_t^\top(\boldsymbol\mu_t-r_t\boldsymbol 1)\right]\mathrm dt
+\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\,\mathrm d\boldsymbol W_t.
$$
这里 $\boldsymbol\pi_t^\top\boldsymbol\Sigma_t$ 是行向量，其模平方给出
$$
\frac{\mathrm d[V]_t}{V_t^2}
=v_t\,\mathrm dt,\qquad
v_t=\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\boldsymbol\Sigma_t^\top\boldsymbol\pi_t.
$$
对 $\log V_t$ 使用 Itô 公式，进一步得到式（26.32）的对数财富分解
$$
\mathrm d\log V_t
=\left[r_t+\boldsymbol\pi_t^\top(\boldsymbol\mu_t-r_t\boldsymbol 1)-\frac12v_t\right]\mathrm dt
+\boldsymbol\pi_t^\top\boldsymbol\Sigma_t\,\mathrm d\boldsymbol W_t.
$$
算术收益漂移由无风险收益 $r_t$ 与风险溢价 $\boldsymbol\pi_t^\top(\boldsymbol\mu_t-r_t\boldsymbol 1)$ 组成；写成对数收益后还须加上波动率拖累 $-v_t/2$，它来自二阶 Itô 修正，而非额外预期损失。

若施加 $\boldsymbol 1^\top\boldsymbol\pi_t=1$，全部财富投入风险资产，银行权重为零，上述漂移分别化为 $\boldsymbol\pi_t^\top\boldsymbol\mu_t$ 与 $\boldsymbol\pi_t^\top\boldsymbol\mu_t-v_t/2$。允许持有银行账户时，一般不能再要求风险权重之和为一；卖空或借款只会使银行权重为负，公式仍然适用。常见错误是在保留银行账户项的同时强行代入权重和为一，从而重复或遗漏无风险收益；另一错误是把协方差矩阵写成 $\boldsymbol\Sigma^\top\boldsymbol\Sigma$，或将 $-v_t/2$ 错加到算术收益漂移中。

□

## 17. 
**证明**
单因子模型的扩散部分可写为
$$
\sigma\sqrt\rho\,\mathrm dB_t^0+\sigma\sqrt{1-\rho}\,\mathrm dB_t^j,
$$
其中共同因子与各资产的个体因子相互独立。组合权重为 $w_j^{(N)}$ 时，扩散项为
$$
\sigma\sqrt\rho\left(\sum_{j=1}^Nw_j^{(N)}\right)\mathrm dB_t^0
+\sigma\sqrt{1-\rho}\sum_{j=1}^Nw_j^{(N)}\,\mathrm dB_t^j.
$$
独立性使交叉协方差为零，故组合瞬时方差为
$$
v_N=\sigma^2\rho\left(\sum_{j=1}^Nw_j^{(N)}\right)^2
+\sigma^2(1-\rho)\sum_{j=1}^N(w_j^{(N)})^2.
$$
记 $Q_N=\sum_j(w_j^{(N)})^2$。在预算条件 $\sum_jw_j^{(N)}=1$ 下，上式化为
$$
v_N=\sigma^2\rho+\sigma^2(1-\rho)Q_N.
$$
因此个体风险消失的充分条件就是 $Q_N\to0$；此时 $v_N\to\sigma^2\rho$。对非负权重，$\max_jw_j^{(N)}\to0$ 已足够，因为 $Q_N\le\max_jw_j^{(N)}$。对可卖空权重，应直接使用 $Q_N\to0$，因为总绝对权重可能很大，仅凭最大绝对权重趋零并不充分。

等权组合有 $Q_N=1/N$，从而
$$
v_N=\sigma^2\rho+\frac{\sigma^2(1-\rho)}N.
$$
其共同因子载荷始终为 $\sigma\sqrt\rho$，所以只有个体方差被分散。非负且和为一的权重也保持同一共同因子载荷，并满足 $1/N\le Q_N\le1$；等权使 $Q_N$ 最小。允许卖空但仍有权重和为一时，共同因子载荷仍不能抵消，而且 Cauchy--Schwarz 不等式仍给出 $Q_N\ge1/N$；卖空可能使 $Q_N$ 乃至 $v_N$ 任意大。若另外取消预算约束，才可通过多空抵消使权重和趋零，但那已是另一种暴露约束。

常见错误是把共同因子项也除以 $N$，误以为资产数增加能消除系统性风险；或把 $\sum_jw_j^2$ 错写成 $(\sum_jw_j)^2$。还不能在允许卖空时沿用非负权重的上界 $Q_N\le1$。

□

## 18. 
**证明**
记 $S_i=S_{t_i}$、$C_i=C(t_i,S_i)$、$\delta_i=t_{i+1}-t_i$，并令 $R_i=e^{r\delta_i}$。在 $t_i$ 再平衡后，持有 $a_i=C_S(t_i,S_i)$ 股股票，银行账户投入 $b_i=C_i-a_iS_i$，故复制组合初始值恰为 $C_i$。区间内持仓不变，到 $t_{i+1}$ 再平衡前的价值为
$$
V_{i+1}^-=a_iS_{i+1}+b_iR_i.
$$
因而一个区间内的复制组合增量为
$$
\Delta_iV=C_S(t_i,S_i)\Delta_iS
+\bigl(C_i-S_iC_S(t_i,S_i)\bigr)(R_i-1),
$$
这就是离散股票持仓与银行账户共同产生的式（26.33）。除最初注资外，再平衡只改变持仓构成，不注入或抽走资金。

另一方面，对 $C(t_{i+1},S_{i+1})$ 在 $(t_i,S_i)$ 作二阶 Taylor 展开：
$$
\Delta_iC=C_t\delta_i+C_S\Delta_iS+\frac12C_{SS}(\Delta_iS)^2
+C_{tS}\delta_i\Delta_iS+\frac12C_{tt}\delta_i^2+O_p(|\Delta_iS|^3),
$$
所有导数均在 $(t_i,S_i)$ 取值。Black--Scholes 方程给出
$$
C_t+rS_iC_S+\frac12\sigma^2S_i^2C_{SS}-rC_i=0.
$$
代入时间导数并整理，得到
$$
\Delta_iC=C_S\Delta_iS+r(C_i-S_iC_S)\delta_i
+\frac12C_{SS}\bigl[(\Delta_iS)^2-\sigma^2S_i^2\delta_i\bigr]
+O_p(\delta_i^{3/2}).
$$
再减去上述复制组合增量，并利用 $R_i-1=r\delta_i+O(\delta_i^2)$，局部误差 $e_i=\Delta_iC-\Delta_iV$ 满足式（26.34）：
$$
e_i=\frac12C_{SS}(t_i,S_i)
\bigl[(\Delta_iS)^2-\sigma^2S_i^2\delta_i\bigr]
+O_p(\delta_i^{3/2}).
$$

这里使用了 GBM 增量的随机阶数。由 $\Delta_iB=O_p(\delta_i^{1/2})$，有 $\Delta_iS=O_p(\delta_i^{1/2})$，所以 $\delta_i\Delta_iS$ 与 $(\Delta_iS)^3$ 都是 $O_p(\delta_i^{3/2})$。更具体地，$\mathbb E[(\Delta_iB)^2]=\delta_i$、$\mathbb E[(\Delta_iB)^4]=3\delta_i^2$，并且各阶有限矩存在，给出 $\mathbb E|\Delta_iS|^{2q}=O(\delta_i^q)$。展开显式解还可见
$$
(\Delta_iS)^2=\sigma^2S_i^2(\Delta_iB)^2+O_p(\delta_i^{3/2}),
$$
漂移与 Brown 增量的交叉项正属于该余项。常见错误是把 $\Delta_iS$ 当成 $O_p(\delta_i)$ 而丢掉平方项，或直接把 $(\Delta_iS)^2$ 路径式地替换为 $\sigma^2S_i^2\delta_i$；后者只在条件期望及适当极限意义下成立，二者之差正是局部对冲误差的主项。

□

## 19. 
**证明**
令 $h_n=\max_i\delta_i$，$\Gamma_i=C_{SS}(t_i,S_i)$。把各区间误差折到同一时点后，有界融资因子只改变估计中的常数，仍用 $E_n=\sum_i(Z_i+b_i+R_i)$ 表示总误差，其中
$$
Z_i=\frac12\Gamma_i\left((\Delta_iS)^2-
\mathbb E[(\Delta_iS)^2\mid\mathcal F_{t_i}]\right),
$$
$$
b_i=\frac12\Gamma_i\left(\mathbb E[(\Delta_iS)^2\mid\mathcal F_{t_i}]
-\sigma^2S_i^2\delta_i\right),
$$
而 $R_i$ 汇总 Taylor 余项和银行账户展开的高阶项。题设的一致矩界给出 $\mathbb E[R_i^2]\le C\delta_i^3$。

条件中心化是关键。由定义，$\mathbb E[Z_i\mid\mathcal F_{t_i}]=0$。若 $i<j$，则 $Z_i$ 对 $\mathcal F_{t_j}$ 可测，因而
$$
\mathbb E[Z_iZ_j]
=\mathbb E\left[Z_i\,\mathbb E[Z_j\mid\mathcal F_{t_j}]\right]=0.
$$
所以鞅差部分的跨区间乘积全部消失。又由 GBM 的条件四阶矩，
$$
\mathbb E[(\Delta_iS)^4\mid\mathcal F_{t_i}]
=O(S_i^4\delta_i^2),
$$
从而条件方差也不超过同一量级。利用 $S^2C_{SS}$ 有界，得到
$$
\mathbb E[Z_i^2]
\le C\,\mathbb E\left[\Gamma_i^2S_i^4\right]\delta_i^2
\le C\delta_i^2.
$$
于是
$$
\mathbb E\left[\left(\sum_iZ_i\right)^2\right]
=\sum_i\mathbb E[Z_i^2]
\le C\sum_i\delta_i^2\le Ch_nT.
$$

题设条件二阶矩展开及其一致余项还给出
$$
b_i=O((S_i^2\Gamma_i)\delta_i^2)=O(\delta_i^2),
$$
故 $\sum_ib_i=O(h_n)$，其平方为 $O(h_n^2)$。对非中心化余项不必错误地宣称跨区间项为零，直接使用 $L^2$ 三角不等式：
$$
\mathbb E\left[\left(\sum_iR_i\right)^2\right]
\le C\left(\sum_i\delta_i^{3/2}\right)^2
\le Ch_n\left(\sum_i\delta_i\right)^2=O(h_n).
$$
合并三部分即得 $\mathbb E[E_n^2]=O(h_n)$。均方根误差就是二阶矩的平方根，故
$$
\left(\mathbb E[E_n^2]\right)^{1/2}=O(h_n^{1/2}),
$$
这并不表示总平方误差本身也是 $O(h_n^{1/2})$。常见错误是未经条件中心化便把不同区间的原始平方增量当作不相关，或把 $\operatorname{Var}((\Delta_iS)^2)$ 错估为 $O(\delta_i)$；正确的条件量级是 $O(\delta_i^2)$。此外，$O_p(\delta_i^{3/2})$ 本身不能自动推出二阶矩界，正是题设的一致矩界保证了上述求和合法。

□

## 20. 
常数参数 GBM 的显式解为
$$
S_T=S_0\exp\left((\mu-\frac12\sigma^2)T+\sigma B_T\right),
\qquad B_T\sim N(0,T).
$$
对任意实数 $\theta$，指数过程 $\exp(\theta B_t-\theta^2t/2)$ 是均值为 $1$ 的指数鞅，因此 $\mathbb E[e^{\theta B_T}]=e^{\theta^2T/2}$。取 $\theta=\sigma$，得到
$$
\mathbb E[S_T]
=S_0e^{(\mu-\sigma^2/2)T}e^{\sigma^2T/2}
=S_0e^{\mu T}.
$$
同理，取 $\theta=2\sigma$，有
$$
\mathbb E[S_T^2]
=S_0^2e^{(2\mu-\sigma^2)T}e^{2\sigma^2T}
=S_0^2e^{(2\mu+\sigma^2)T},
$$
所以
$$
\operatorname{Var}(S_T)
=\mathbb E[S_T^2]-(\mathbb E[S_T])^2
=S_0^2e^{2\mu T}(e^{\sigma^2T}-1).
$$
对数价格则是正态变量：
$$
\log\frac{S_T}{S_0}=(\mu-\frac12\sigma^2)T+\sigma B_T,
$$
故直接得到
$$
\mathbb E\left[\log\frac{S_T}{S_0}\right]
=(\mu-\frac12\sigma^2)T,
\qquad
\operatorname{Var}\left(\log\frac{S_T}{S_0}\right)=\sigma^2T.
$$
因此价格期望的连续增长率为 $T^{-1}\log\mathbb E[S_T/S_0]=\mu$，而对数价格期望的增长率为 $\mu-\sigma^2/2$。对 $\log S_t$ 使用 Itô 公式时，二次变差产生 $-\sigma^2\,\mathrm dt/2$，这正是两者的差额；取期望不会消除该修正。

常见错误是把 $\mathbb E[e^{\sigma B_T}]$ 当成 $1$，遗漏正态指数矩中的 $e^{\sigma^2T/2}$；计算方差时忘记减去均值平方，也会得到错误结果。还应区分 $\mathbb E[\log S_T]$ 与 $\log\mathbb E[S_T]$，二者一般不能交换。
## 21. 
沿用第18题的记号，令 $q_i=(\Delta_iS)^2$，目标平方变化为 $\widehat q_i=\sigma^2S_i^2\delta_i$。局部误差按“期权增量减复制组合增量”定义为
$$
e_i=\frac12C_{SS}(t_i,S_i)(q_i-\widehat q_i)+O_p(\delta_i^{3/2}).
$$
由于 $C_{SS}(t_i,S_i)>0$，若 $q_i>\widehat q_i$，主项为正，即期权升值超过局部复制收益；若 $q_i=\widehat q_i$，主项为零，但高阶余项不必为零；若 $q_i<\widehat q_i$，主项为负，即复制组合的局部增量超过期权增量。对“持有复制组合并卖空一份期权”的头寸，局部盈亏与 $e_i$ 符号相反，三种情形分别对应主项亏损、主项为零和主项盈利。

为推导跨区间递推，记复制组合在 $t_i$ 再平衡后的价值为 $V_i$，对冲误差为 $\mathcal E_i=V_i-C_i$。此时仍持有 $a_i=C_S(t_i,S_i)$ 股股票，但银行账户必须为 $V_i-a_iS_i$，因为已有误差时不能再假设 $V_i=C_i$。固定持仓至下一时点，得到
$$
V_{i+1}^-=a_iS_{i+1}+R_i(V_i-a_iS_i).
$$
精确的局部残差为
$$
e_i=\Delta_iC-a_i\Delta_iS-(R_i-1)(C_i-a_iS_i),
$$
其主项正是上文的 Gamma 项。直接代入可得
$$
\mathcal E_{i+1}=R_i\mathcal E_i-e_i.
$$
令 $A_i=\prod_{j=0}^{i-1}R_j$ 且 $A_0=1$，递推得到
$$
\mathcal E_n=A_n\mathcal E_0
-\sum_{i=0}^{n-1}\frac{A_n}{A_{i+1}}e_i
=A_n\mathcal E_0-\sum_{i=0}^{n-1}
\left(\prod_{j=i+1}^{n-1}R_j\right)e_i,
$$
最后一个区间后的空乘积视为 $1$。因此第 $i$ 个局部误差还要经历其后所有区间的融资；等价地，除以 $A_n$ 后，累计误差只是折现局部误差的代数和。若初始完全注资，则 $\mathcal E_0=0$。

常见错误是把 $e_i$ 的方向直接当成长复制、短期权头寸的盈亏方向，或在每区间开头强行重设 $V_i=C_i$；后者若原组合已有误差，就需要外部注资，破坏自融资性。还不能忽略 $R_i$，否则会把不同时点的货币误差直接相加。
## 22. 
**证明**
价格严格为正，且
$$
\frac{\mathrm dS_t}{S_t}=r_t\,\mathrm dt+\sigma_t\,\mathrm dW_t,
\qquad
\frac{\mathrm d[S]_t}{S_t^2}=\sigma_t^2\,\mathrm dt.
$$
对 $\log S_t$ 使用 Itô 公式，得到
$$
\mathrm d\log S_t
=\frac{\mathrm dS_t}{S_t}-\frac12\frac{\mathrm d[S]_t}{S_t^2}
=(r_t-\frac12\sigma_t^2)\,\mathrm dt+\sigma_t\,\mathrm dW_t.
$$
因此 $\mathrm dS_t/S_t-\mathrm d\log S_t=\sigma_t^2\,\mathrm dt/2$。从 $0$ 到 $T$ 积分并乘以 $2$，即有
$$
\int_0^T\sigma_t^2\,\mathrm dt
=2\int_0^T\frac{\mathrm dS_t}{S_t}-2\log\frac{S_T}{S_0}.
$$
该等式是逐路径的半鞅恒等式，积分方差有限保证其中各随机积分和二次变差项有意义。

取分划 $0=t_0<\cdots<t_m=T$，定义左端点简单收益
$$
R_k=\frac{S_{t_{k+1}}-S_{t_k}}{S_{t_k}},\qquad k=0,\ldots,m-1.
$$
相应的已实现方差积分估计与年化平均估计分别为
$$
\widehat I_m=2\sum_{k=0}^{m-1}R_k-2\log\frac{S_T}{S_0},
\qquad
\widehat v_m=\frac{\widehat I_m}{T}.
$$
由于 $\log(S_T/S_0)=\sum_k\log(1+R_k)$，展开对数可得
$$
\widehat I_m
=\sum_{k=0}^{m-1}\left[2R_k-2\log(1+R_k)\right]
=\sum_{k=0}^{m-1}R_k^2+O_p\left(\sum_{k=0}^{m-1}|R_k|^3\right).
$$
网眼趋零时，左端点简单收益的平方和依概率趋于相对价格过程的二次变差，即 $\int_0^T\sigma_t^2\,\mathrm dt$，高阶项消失。因此 $\widehat I_m$ 是所求离散已实现方差估计，$\sum_kR_k^2$ 是其等价的渐近形式。

恒等式中的 $\int_0^T\mathrm dS_t/S_t$ 是持续再平衡的动态标的交易收益；乘以 $2$ 也可理解为由 $2/S_t$ 股股票的动态持仓产生，并由银行账户融资。对数合约的到期 payoff $\log(S_T/S_0)$ 提供凸性修正，恰好留下扩散方差。利率漂移在 $\mathrm dS_t/S_t$ 与 $\mathrm d\log S_t$ 中相同，相减后完全抵消，所以估计积分方差不必预测利率；实际融资和贴现仍是估值实施中的独立步骤。

离散化用有限和替代连续随机积分，并用简单收益的二阶展开替代二次变差，故有限网眼下会留下左端点积分误差、漂移与扩散的交叉项以及对数展开的高阶余项。常见错误是遗漏 Itô 修正中的因子 $1/2$，把利率项错误保留在最终结果中，或把有限分划上的 $\widehat I_m$ 当成无条件精确恒等式；使用右端点价格作分母还会引入前视偏差。

□