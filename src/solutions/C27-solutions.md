# 第27章习题参考答案与解析

## 1. 
强解是在预先给定的概率空间、滤子、初始条件和 Brownian 运动上构造的适应过程 $X$，并满足积分形式的方程；因此 Brownian 运动和滤子都是给定数据。弱解的解对象则是完整五元组（连同初值还包括其分布），概率空间、滤子、$X$ 与 Brownian 运动均可作为构造对象，只要求构造出的 Brownian 运动与滤子相容且方程成立。强解自然给出一个弱解，反向结论并不由定义自动成立。

轨道唯一性指在同一组给定随机数据上，任意两个解不可区分；分布唯一性指具有相同初始分布的任意弱解在路径空间上有相同分布。前者比较轨道，后者比较律，定义本身不保证二者互推，也不保证弱解可升级为强解；此类结论需要额外定理及其假设。常见错误是把弱解误认为“不给出 $X$”，或把分布唯一性误写成同一 Brownian 运动驱动下轨道几乎必然相同。

## 2. 
**证明**
取 $T<\infty$，设 $\mathbb E|\xi|^2<\infty$，系数在 $[0,T]$ 上关于 $x$ 一致 Lipschitz，常数为 $L$，且 $|b(t,0)|+|\sigma(t,0)|$ 有界。令
$$X_t^0=\xi,\qquad X_t^{n+1}=\xi+\int_0^t b(s,X_s^n)\,ds+\int_0^t\sigma(s,X_s^n)\,dB_s.$$
线性增长保证每一步平方可积，适应性则按 $n$ 归纳：若 $X^n$ 适应，则 Lebesgue 积分和随机积分均适应，故 $X^{n+1}$ 适应。

记 $\delta_n(t)=\sup_{s\le t}|X_s^{n+1}-X_s^n|$。由 $(a+b)^2\le2a^2+2b^2$、Cauchy–Schwarz 不等式和 Burkholder–Davis–Gundy 不等式，再使用 Itô 等距控制第二矩，可得
$$\mathbb E[\delta_n(t)^2]\le C_TL^2\int_0^t\mathbb E[\delta_{n-1}(s)^2]\,ds,$$
其中 $C_T$ 只依赖于维数和 $T$。线性增长另给出
$$\mathbb E[\delta_0(T)^2]\le C_T(1+\mathbb E|\xi|^2)=:M.$$
逐次代入便得
$$\mathbb E[\delta_n(t)^2]\le M\frac{(C_TL^2t)^n}{n!}.$$
由于 $\sum_n a^n/(n!)^{1/2}<\infty$，对任意 $m>n$，
$$\bigl(\mathbb E[\sup_{t\le T}|X_t^m-X_t^n|^2]\bigr)^{1/2}
\le\sum_{j=n}^{m-1}\bigl(\mathbb E[\delta_j(T)^2]\bigr)^{1/2}\to0.$$
故 $X^n$ 在连续适应过程的完备平方可积范数下为 Cauchy 列，其极限 $X$ 连续且适应。Lipschitz 条件使漂移积分逐项收敛，Burkholder–Davis–Gundy 不等式又使随机积分收敛，故可在积分方程中取极限。

若 $X,Y$ 是从同一 $\xi$ 和同一 Brownian 运动出发的两个强解，令 $e(t)=\mathbb E[\sup_{s\le t}|X_s-Y_s|^2]$。同样估计给出
$$e(t)\le C_TL^2\int_0^t e(s)\,ds.$$
Gronwall 引理推出 $e(t)=0$，所以两解不可区分。有限时限用于取得统一的 $C_T$、应用有限区间上的 Gronwall 引理并得到阶乘估计；对每个有限 $T$ 成立后，可延拓到任意有限时刻。常见错误是直接假设 $C_TL^2T<1$，或只证固定 $t$ 的收敛而未控制上确界；其实阶乘估计并不要求压缩常数小于一。

□

## 3. 
先设 $S_t>0$。对 $\log S_t$ 使用 Itô 公式，得到
$$d\log S_t=\frac1{S_t}\,dS_t-\frac1{2S_t^2}\,d[S]_t
=\left(\mu-\frac12\sigma^2\right)dt+\sigma\,dB_t.$$
从 $0$ 积分到 $t$，再取指数，有
$$S_t=S_0\exp\!\left(\left(\mu-\frac12\sigma^2\right)t+\sigma B_t\right).$$
反向验证时，对此指数过程使用 Itô 公式，得
$$dS_t=S_t\left(\mu-\frac12\sigma^2\right)dt+\sigma S_t\,dB_t
+\frac12\sigma^2S_t\,dt
=\mu S_t\,dt+\sigma S_t\,dB_t,$$
且初值为 $S_0$，故确为原方程的解；正指数也验证了前面取对数的合法性。

由 $\mathbb E[e^{aB_t}]=e^{a^2t/2}$，
$$\mathbb E[S_t]=S_0e^{(\mu-\sigma^2/2)t}e^{\sigma^2t/2}=S_0e^{\mu t}.$$
同理 $\mathbb E[S_t^2]=S_0^2e^{(2\mu+\sigma^2)t}$，所以
$$\operatorname{Var}(S_t)=S_0^2e^{2\mu t}\left(e^{\sigma^2t}-1\right).$$
常见错误是把普通链式法则用于对数而漏掉 $-\sigma^2t/2$，或在方差中误用 $(\mathbb E[S_t])^2=S_0^2e^{(2\mu-\sigma^2)t}$。

## 4. 
令 $Y_t=X_t-\theta$，则 $dY_t=-\kappa Y_t\,dt+\sigma\,dB_t$。乘以积分因子 $e^{\kappa t}$，乘积法则给出
$$d(e^{\kappa t}Y_t)=e^{\kappa t}dY_t+\kappa e^{\kappa t}Y_t\,dt
=\sigma e^{\kappa t}\,dB_t.$$
积分并除以 $e^{\kappa t}$，得
$$X_t=\theta+(X_0-\theta)e^{-\kappa t}+\sigma\int_0^te^{-\kappa(t-s)}\,dB_s.$$
代回微分方程可直接验证其正确性。固定 $u<t$，在 $X_u=x$ 的条件下使用同一推导，得到条件均值
$$m(t\mid u,x)=\theta+(x-\theta)e^{-\kappa(t-u)}.$$
随机积分的条件均值为零，且被积函数确定，故 Itô 等距给出条件方差
$$v(t\mid u,x)=\sigma^2\int_u^te^{-2\kappa(t-s)}\,ds
=\frac{\sigma^2}{2\kappa}\left(1-e^{-2\kappa(t-u)}\right).$$
高斯随机积分与确定项之和仍为高斯变量；当 $t\to\infty$ 时，$m(t\mid u,x)\to\theta$，$v(t\mid u,x)\to\sigma^2/(2\kappa)$，所以极限分布为
$$\mathcal N\!\left(\theta,\frac{\sigma^2}{2\kappa}\right),$$
与初始状态无关。常见错误是积分因子漏乘 $e^{\kappa t}$，或把条件方差误写成 $\sigma^2(t-u)$，没有考虑均值回归造成的指数衰减。

## 5. 
**证明**
设分割 $\pi=\{0=t_0<\cdots<t_n=t\}$。Taylor 公式给出
$$f(X_t)-f(X_0)=\sum_i f'(X_{t_i})\Delta_iX
+\frac12\sum_i f''(X_{t_i})(\Delta_iX)^2+\sum_iR_i,$$
其中 $\Delta_iX=X_{t_{i+1}}-X_{t_i}$，且
$$R_i=\frac12\bigl(f''(\xi_i)-f''(X_{t_i})\bigr)(\Delta_iX)^2,$$
$\xi_i$ 位于该小区间两端点之间。

当 $|\pi|\to0$ 时，左连续被积过程的 Riemann 和在一致收敛于概率的意义下收敛到随机积分，故一阶和趋于 $\int_0^tf'(X_s)\,dX_s$。二次变差的存在性意味着
$$\sum_i f''(X_{t_i})\bigl((\Delta_iX)^2-([X]_{t_{i+1}}-[X]_{t_i})\bigr)\to0$$
依概率成立；而 $f''(X_s)$ 对 $[X]$ 的 Riemann–Stieltjes 和趋于 $\int_0^tf''(X_s)\,d[X]_s$。这里先用有界分割上的逼近，再利用连续轨道使 $f''(X_s)$ 一致连续。

对余项，令 $\omega_\pi=\max_i\sup_{u,v\in[t_i,t_{i+1}]}|f''(X_u)-f''(X_v)|$，则
$$\left|\sum_iR_i\right|\le\frac12\omega_\pi\sum_i(\Delta_iX)^2.$$
连续性使 $\omega_\pi\to0$，而平方增量和在概率上有界，故余项依概率趋于零。合并各项即得
$$f(X_t)=f(X_0)+\int_0^tf'(X_s)\,dX_s+\frac12\int_0^tf''(X_s)\,d[X]_s.$$
微分记号为 $df(X_t)=f'(X_t)\,dX_t+\tfrac12f''(X_t)\,d[X]_t$。

不能把 $(dX_t)^2$ 直接舍弃：对 Brownian 运动，$\mathbb E[(\Delta B)^2]=\Delta t$，这些二阶量累加为非零的 $[B]_t=t$。真正消失的是 $(dt)^2$、$dt\,dB_t$ 等更高阶交叉项。常见错误是只写普通链式法则，或用单个区间上 $(\Delta X)^2$ 很小来断言整个二阶和为零。

□
## 6. 
对 $x^4$ 使用 Itô 公式，并注意 $[B]_t=t$，得
$$d(B_t^4)=4B_t^3\,dB_t+6B_t^2\,dt.$$
对 $tb(t)$ 与 $B_t$ 使用乘积法则，确定性时间函数不贡献二次协变差，所以
$$d(tB_t)=B_t\,dt+t\,dB_t.$$
再令 $E_t=\exp(\lambda B_t-\lambda^2t/2)$。Itô 公式中的漂移恰好抵消：
$$dE_t=E_t\left(\lambda\,dB_t-\frac12\lambda^2dt\right)
+\frac12\lambda^2E_t\,dt=\lambda E_t\,dB_t.$$
因此 $E_t$ 是局部鞅，而且由于 $\lambda$ 为常数，它还是真鞅。$B_t^4$ 与 $tB_t$ 本身都不是局部鞅，因为分别含有非零有限变差漂移；但
$$B_t^4-6\int_0^tB_s^2\,ds,\qquad tB_t-\int_0^tB_s\,ds$$
都是局部鞅。事实上 $\mathbb E\int_0^tB_s^6\,ds<\infty$ 且 $\mathbb E\int_0^ts^2\,ds<\infty$，相应随机积分是真平方可积鞅。

对第一式取期望，随机积分的期望为零，于是
$$\mathbb E[B_t^4]=6\int_0^t\mathbb E[B_s^2]\,ds
=6\int_0^ts\,ds=3t^2.$$
常见错误是把含有随机积分的任何过程都称为鞅，忽略另外的漂移项；也不能在未验证可积性时直接把局部鞅期望写成零。

## 7. 
对 $f(x,y)=xy$ 使用二维 Itô 公式。由于 $f_{xx}=f_{yy}=0$ 且 $f_{xy}=1$，立即得到
$$d(X_tY_t)=X_t\,dY_t+Y_t\,dX_t+d[X,Y]_t.$$
若 $Y$ 恒正，对 $g(x,y)=x/y$ 使用
$$g_x=\frac1y,\quad g_y=-\frac{x}{y^2},\quad
g_{xy}=-\frac1{y^2},\quad g_{yy}=\frac{2x}{y^3},\quad g_{xx}=0,$$
可得
$$d\!\left(\frac{X_t}{Y_t}\right)
=\frac1{Y_t}\,dX_t-\frac{X_t}{Y_t^2}\,dY_t
-\frac1{Y_t^2}\,d[X,Y]_t+\frac{X_t}{Y_t^3}\,d[Y]_t.$$

现在 $S_t=e^{\sigma B_t}$，故
$$dS_t=\sigma S_t\,dB_t+\frac12\sigma^2S_t\,dt,
\qquad d[S]_t=\sigma^2S_t^2dt.$$
又 $Y_t=e^{rt}$ 为有限变差过程，$dY_t=rY_tdt$，且 $[S,Y]_t=[Y]_t=0$。代入乘积或商公式，均有
$$d\!\left(\frac{S_t}{Y_t}\right)
=\left(\frac12\sigma^2-r\right)\frac{S_t}{Y_t}\,dt
+\sigma\frac{S_t}{Y_t}\,dB_t.$$
常见错误是漏写 $d[X,Y]_t$，或把 $e^{\sigma B_t}$ 错当成漂移为零的几何 Brownian 运动；它实际具有 $\sigma^2/2$ 的对数修正漂移。

## 8. 
令 $a_t=\sigma_t\sigma_t^\top$。即使 $A$ 不对称，也有
$$\nabla f(x)=(A+A^\top)x+c,\qquad \nabla^2f(x)=A+A^\top.$$
多维 Itô 公式给出
$$df(X_t)=\nabla f(X_t)^\top dX_t
+\frac12\operatorname{tr}\!\left((A+A^\top)\,d[X]_t\right),$$
其中矩阵二次变差的微分为 $d[X]_t=\sigma_t\sigma_t^\top dt=a_tdt$。因此
$$df(X_t)=\left[b_t^\top\bigl((A+A^\top)X_t+c\bigr)
+\frac12\operatorname{tr}\!\left((A+A^\top)a_t\right)\right]dt
+\bigl((A+A^\top)X_t+c\bigr)^\top\sigma_t\,dB_t.$$
这里进入二阶项的是 $d\times d$ 矩阵 $\sigma_t\sigma_t^\top$，而不是一般为 $m\times m$ 的 $\sigma_t^\top\sigma_t$。

随机积分部分是局部鞅，所以 $f(X_t)-f(X_0)$ 为局部鞅的漂移条件为
$$b_t^\top\bigl((A+A^\top)X_t+c\bigr)
+\frac12\operatorname{tr}\!\left((A+A^\top)\sigma_t\sigma_t^\top\right)=0$$
作为 $dt\,d\mathbb P$ 意义下的过程等式成立。若 $A$ 对称，则 $A+A^\top=2A$。常见错误是非对称时仍写 $2A$，或只要求 $\operatorname{tr}((A+A^\top)a_t)=0$ 而遗漏一阶漂移项。
## 9. 
几何 Brownian 运动的生成元为
$$\mathcal Lf(x)=\mu xf'(x)+\frac12\sigma^2x^2f''(x).$$
取 $f(x)=x^p$，则
$$\mathcal L(x^p)=\left(\mu p+\frac12\sigma^2p(p-1)\right)x^p.$$
记 $\lambda_p=\mu p+\sigma^2p(p-1)/2$，并对矩方程使用局部化和可积性论证，得
$$\frac{d}{dt}\mathbb E[S_t^p]=\lambda_p\mathbb E[S_t^p],
\qquad \mathbb E[S_t^p]=S_0^pe^{\lambda_pt}.$$
当 $p=1,2$ 时，分别恢复 $m_1'=\mu m_1$ 与 $m_2'=(2\mu+\sigma^2)m_2$，与第3题的直接计算一致。

OU 过程的生成元为
$$\mathcal Lf(x)=\kappa(\theta-x)f'(x)+\frac12\sigma^2f''(x).$$
所以
$$\mathcal Lx=\kappa(\theta-x),\qquad
\mathcal Lx^2=2\kappa x(\theta-x)+\sigma^2.$$
令 $m(t)=\mathbb E[X_t\mid X_0=x_0]$、$q(t)=\mathbb E[X_t^2\mid X_0=x_0]$，则
$$m'=\kappa(\theta-m),\qquad q'=2\kappa\theta m-2\kappa q+\sigma^2.$$
第一式解得 $m=\theta+(x_0-\theta)e^{-\kappa t}$；再由 $v=q-m^2$ 得
$$v'=-2\kappa v+\sigma^2,\qquad
v=\frac{\sigma^2}{2\kappa}(1-e^{-2\kappa t}),$$
从而 $q=m^2+v$。常见错误是 OU 的 $f=x^2$ 只计算一阶项而漏掉 $\sigma^2$，或把 $\mathcal Lf$ 当成 $df$ 的全部而不区分其中的随机积分。

## 10. 
**证明**
时齐扩散的生成元为
$$\mathcal Lf(x)=\sum_i b_i(x)\partial_if(x)
+\frac12\sum_{i,j}(\sigma(x)\sigma(x)^\top)_{ij}\partial_{ij}f(x).$$
Itô 公式给出
$$f(X_t)-f(x)=\int_0^t\mathcal Lf(X_s)\,ds+M_t,$$
其中
$$M_t=\int_0^t\nabla f(X_s)^\top\sigma(X_s)\,dB_s.$$
这里的关键是验证 $M_t$ 为真鞅，而不只是局部鞅。因为 $f\in C_c^2(\mathbb R^d)$，$\nabla f$ 有紧支集且有界；$\sigma$ 连续，故在相应紧集上有界。于是存在常数 $K$，使
$$|\sigma(X_s)^\top\nabla f(X_s)|\le K.$$
从而
$$\mathbb E_x[[M]_t]
=\mathbb E_x\!\left[\int_0^t|\sigma(X_s)^\top\nabla f(X_s)|^2ds\right]
\le K^2t<\infty.$$
故 $M$ 是平方可积真鞅，特别地 $\mathbb E_x[M_t]=0$。同时 $\mathcal Lf$ 有界，$\mathbb E_x\int_0^t|\mathcal Lf(X_s)|\,ds<\infty$，可以交换期望与时间积分。对 Itô 公式取期望即得
$$\mathbb E_x[f(X_t)]-f(x)
=\mathbb E_x\!\left[\int_0^t\mathcal Lf(X_s)\,ds\right].$$
常见错误是以“局部鞅在零时刻为零”为理由直接断言其期望为零；局部鞅可能不是鞅，必须有上述二次变差可积性或局部化后的一致可积控制。

□
## 11. 
**证明**
由 Markov 性以及 $u$ 的定义，可取
$$u(t,X_t)=\mathbb E[g(X_T)\mid\mathcal F_t],\qquad 0\le t\le T.$$
右侧是给定终端随机变量的条件期望，因此 $u(t,X_t)$ 是鞅。另一方面，对 $u(t,X_t)$ 使用 Itô 公式，得
$$du(t,X_t)=\bigl(\partial_tu(t,X_t)+\mathcal Lu(t,X_t)\bigr)dt
+\nabla_xu(t,X_t)^\top\sigma(X_t)\,dB_t.$$
随机积分是局部鞅，而左侧是鞅，所以
$$\int_0^t(\partial_tu+\mathcal Lu)(s,X_s)\,ds$$
既是连续有限变差过程，又是局部鞅，只能恒为零。结合解过程可从任意 $(t,x)$ 出发及所需光滑性，得到后向方程
$$\partial_tu(t,x)+\mathcal Lu(t,x)=0,\qquad u(T,x)=g(x).$$
题设可积性保证条件期望、局部化取极限及随机积分论证有效。

时间齐次时，从状态 $x$ 出发、长度为 $\tau$ 的轨道分布只取决于 $\tau$，不取决于日历起点，故
$$u(t,x)=\mathbb E_x[g(X_{T-t})]=v(T-t,x).$$
于是 $v(\tau,x)=\mathbb E_x[g(X_\tau)]$ 满足
$$\partial_\tau v=\mathcal Lv,\qquad v(0,x)=g(x),$$
而 $\partial_tu=-\partial_\tau v$，这解释了后向方程中的负时间方向。常见错误是把后向方程写成 $\partial_tu=\mathcal Lu$，或在未使用 Markov 性时直接把 $u(t,X_t)$ 等同于 $\mathcal F_t$ 条件期望。

□

## 12. 
**证明**
Brownian 运动的生成元为 $\mathcal L=\tfrac12\partial_{xx}$，故所求终值问题是
$$\partial_tu+\frac12\partial_{xx}u=0,\qquad u(T,x)=\cos x.$$
对给定函数计算得
$$\partial_tu=\frac12e^{-(T-t)/2}\cos x=\frac12u,
\qquad \partial_{xx}u=-e^{-(T-t)/2}\cos x=-u.$$
所以 $\partial_tu+\tfrac12\partial_{xx}u=0$，且 $u(T,x)=\cos x$。

独立核对时，令 $\tau=T-t$，则条件分布为 $B_T\sim\mathcal N(x,\tau)$。写成 $B_T=x+\sqrt\tau Z$，其中 $Z$ 为标准正态变量，利用
$$\mathbb E[\cos(aZ)]=e^{-a^2/2},\qquad \mathbb E[\sin(aZ)]=0,$$
得到
$$\mathbb E[\cos B_T\mid B_t=x]
=\cos x\,\mathbb E[\cos(\sqrt\tau Z)]
-\sin x\,\mathbb E[\sin(\sqrt\tau Z)]
=e^{-\tau/2}\cos x=u(t,x).$$

证明中出现的随机积分是
$$M_r=\int_0^r\partial_xu(s,B_s)\,dB_s
=-\int_0^re^{-(T-s)/2}\sin(B_s)\,dB_s.$$
其被积函数绝对值不超过 $1$，因此
$$\mathbb E[[M]_r]
=\mathbb E\int_0^re^{-(T-s)}\sin^2(B_s)\,ds\le r<\infty.$$
故 $M$ 是平方可积真鞅，其期望为零，并非仅为局部鞅。常见错误是把 $\partial_tu$ 算成 $-u/2$，或把条件方差误取为 $T$ 而不是剩余时间 $T-t$。

□
## 13. 
**证明**
OU 过程的 Kolmogorov 前向方程为
$$\partial_tp(t,x)=-\partial_x\bigl[\kappa(\theta-x)p(t,x)\bigr]
+\frac12\sigma^2\partial_{xx}p(t,x).$$
平稳密度 $\pi$ 满足
$$0=\partial_x\!\left[\kappa(x-\theta)\pi+\frac12\sigma^2\pi'\right].$$
故括号内为常数 $J$。密度及其适当矩可积使边界通量为零，因此 $J=0$，从而
$$\frac{\pi'(x)}{\pi(x)}=-\frac{2\kappa}{\sigma^2}(x-\theta).$$
积分得到
$$\pi(x)=C\exp\!\left[-\frac{\kappa}{\sigma^2}(x-\theta)^2\right].$$
归一化常数为
$$C=\sqrt{\frac{\kappa}{\pi\sigma^2}},$$
所以
$$\pi(x)=\sqrt{\frac{\kappa}{\pi\sigma^2}}
\exp\!\left[-\frac{(x-\theta)^2}{2(\sigma^2/(2\kappa))}\right].$$
这正是均值 $\theta$、方差 $\sigma^2/(2\kappa)$ 的正态密度。

一致性还可从 OU 显式解验证。若 $X_0$ 服从上述正态分布且与 Brownian 运动独立，则 $X_t-\theta$ 是方差为
$$e^{-2\kappa t}\frac{\sigma^2}{2\kappa}
+\frac{\sigma^2}{2\kappa}(1-e^{-2\kappa t})
=\frac{\sigma^2}{2\kappa}$$
的零均值高斯变量，故分布在每一时刻保持不变。第4题从固定初值得到的条件分布则随 $t\to\infty$ 收敛到同一分布。常见错误是把前向漂移项写成 $-\kappa(x-\theta)p$ 后漏掉外层散度，或把扩散项系数写成 $\sigma^2$ 而非 $\sigma^2/2$。

□

## 14. 
**证明**
题设核对应的指数过程为
$$Z_t=\exp\!\left(\int_0^t\theta_s\,dB_s-\frac12\int_0^t\theta_s^2ds\right).$$
令 $M_t=\int_0^t\theta_s\,dB_s$，则 $[M]_t=\int_0^t\theta_s^2ds$。对 $Z_t=e^{M_t-[M]_t/2}$ 使用 Itô 公式，漂移项抵消，得到
$$dZ_t=Z_t\,dM_t=Z_t\theta_t\,dB_t.$$
$\theta$ 有界保证 Novikov 条件，故 $Z$ 是期望恒为一的正鞅，可由 $d\mathbb Q=Z_T\,d\mathbb P$ 定义等价测度。

令 $\widetilde B_t=B_t-\int_0^t\theta_s\,ds$。乘积法则给出
$$d(Z_t\widetilde B_t)
=Z_t\,d\widetilde B_t+\widetilde B_t\,dZ_t+d[Z,\widetilde B]_t.$$
由于 $d\widetilde B_t=dB_t-\theta_tdt$ 且 $d[Z,\widetilde B]_t=Z_t\theta_tdt$，所以
$$d(Z_t\widetilde B_t)
=Z_t(1+\theta_t\widetilde B_t)\,dB_t.$$
因此 $Z\widetilde B$ 是 $\mathbb P$ 局部鞅，Bayes 公式表明 $\widetilde B$ 是 $\mathbb Q$ 局部鞅。它连续且二次变差为 $[\widetilde B]_t=t$，Lévy 特征定理遂说明它是 $\mathbb Q$ 下的一维标准 Brownian 运动。

最后将 $dB_t=d\widetilde B_t+\theta_tdt$ 代入：
$$dX_t=\mu\,dt+\sigma\bigl(d\widetilde B_t+\theta_tdt\bigr)
=(\mu+\sigma\theta_t)dt+\sigma\,d\widetilde B_t.$$
故新漂移确为 $\mu+\sigma\theta_t$。常见错误是把核取反，导致 $\widetilde B$ 的漂移方向错误；也不能把 $Z$ 当成 $d\mathbb P/d\mathbb Q$，或对适应的 $\theta$ 直接套用仅适用于确定性核的高斯计算。

□
## 15. 
**证明**
记 $q(t)=\int_0^t\theta_s^2ds<\infty$。由于 $\theta$ 确定，Wiener 积分
$$M_t=\int_0^t\theta_s\,dB_s$$
是均值为零、方差为 $q(t)$ 的高斯变量，并且具有独立增量。对 $s<t$，在 $\mathcal F_s$ 条件下，$M_t-M_s$ 服从 $\mathcal N(0,q(t)-q(s))$。所以
$$\mathbb E\!\left[e^{M_t-M_s}\mid\mathcal F_s\right]
=e^{(q(t)-q(s))/2}.$$
将其乘以 $Z_se^{-(q(t)-q(s))/2}$，便得
$$\mathbb E[Z_t\mid\mathcal F_s]=Z_s.$$
特别地，取 $s=0$ 得 $\mathbb E[Z_t]=1$，故 $Z$ 在 $[0,T]$ 上是期望恒为一的鞅。

进一步，$Z_T^2=\exp(2M_T-q(T))$，而 $2M_T$ 的方差为 $4q(T)$，所以
$$\mathbb E^{\mathbb P}[Z_T^2]
=e^{-q(T)}\mathbb E[e^{2M_T}]
=e^{-q(T)}e^{2q(T)}=e^{q(T)}
=\exp\!\left(\int_0^T\theta_s^2ds\right).$$
这里每一步都使用 $q(T)<\infty$：它保证 Wiener 积分及其高斯矩母函数计算有效。若该积分发散，则通常的有限终端 Wiener 积分和上述公式均不能自动延拓，也不能据此断言指数过程仍是正规化鞅。常见错误是误写 $\mathbb E[Z_T^2]=e^{q(T)/2}$，或从 $\mathbb E[Z_T]=1$ 错误推出二阶矩也恒为一。

□

## 16. 
第14题的漂移变换公式要求 $\nu+\sigma\theta=0$，故选择常数核
$$\theta=-\frac{\nu}{\sigma}.$$
相应终端密度为
$$Z_T=\exp\!\left(\theta B_T-\frac12\theta^2T\right)
=\exp\!\left(-\frac{\nu}{\sigma}B_T-\frac{\nu^2}{2\sigma^2}T\right),
\qquad d\mathbb Q=Z_T\,d\mathbb P.$$
在 $\mathbb Q$ 下，
$$\widetilde B_t=B_t-\theta t=B_t+\frac{\nu}{\sigma}t$$
是标准 Brownian 运动。因此
$$Y_t=\nu t+\sigma B_t=\sigma\widetilde B_t,
\qquad dY_t=\sigma\,d\widetilde B_t,$$
即 $Y$ 在 $\mathbb Q$ 下没有漂移。于是 $Y_T$ 服从 $\mathcal N(0,\sigma^2T)$，并且
$$\mathbb Q(a\le Y_T\le b)
=\mathbb Q\!\left(\frac{a}{\sigma\sqrt T}\le\widetilde B_T/\sqrt T
\le\frac{b}{\sigma\sqrt T}\right)
=\Phi\!\left(\frac{b}{\sigma\sqrt T}\right)
-\Phi\!\left(\frac{a}{\sigma\sqrt T}\right).$$
常见错误是选择 $\theta=\nu/\sigma$，结果使漂移变为 $2\nu$；另一错误是在新测度下仍把 $Y_T$ 当作均值 $\nu T$ 的正态变量。
## 17. 
对标量扩散 $dX_t=b(X_t)dt+\sigma(X_t)dB_t$，网格步长为 $h$ 的 Euler–Maruyama 格式为
$$Y_{k+1}=Y_k+b(Y_k)h+\sigma(Y_k)\Delta B_k,
\qquad \Delta B_k=B_{t_{k+1}}-B_{t_k}.$$
连续时间插值则在每个子区间内使用同一公式。

从精确状态 $X_t=x$ 出发，对 $b(X_s)$ 和 $\sigma(X_s)$ 分别作 Itô 展开，再代回积分方程，得到
$$\begin{aligned}
X_{t+h}=x+b(x)h+\sigma(x)\Delta B
&+\int_t^{t+h}\int_t^s\mathcal Lb(X_r)\,dr\,ds\\
&+\int_t^{t+h}\int_t^s b'(X_r)\sigma(X_r)\,dB_r\,ds\\
&+\int_t^{t+h}\int_t^s\mathcal L\sigma(X_r)\,dr\,dB_s\\
&+\int_t^{t+h}\int_t^s\sigma'(X_r)\sigma(X_r)\,dB_r\,dB_s,
\end{aligned}$$
其中 $\mathcal L=b\,\partial_x+\tfrac12\sigma^2\partial_{xx}$，$\Delta B=B_{t+h}-B_t$。Euler 近似恰好保留前三项，余项记为 $R_h$。最后一个二重随机积分的主部为
$$\sigma(x)\sigma'(x)\int_t^{t+h}\int_t^sdB_r\,dB_s
=\frac12\sigma(x)\sigma'(x)\bigl((\Delta B)^2-h\bigr),$$
其均方为零、二阶矩为 $O(h^2)$。其余双时间积分或含一次随机积分的项不降低这一主阶，故在通常光滑性和线性增长条件下
$$\mathbb E_x[R_h]=O(h^2),\qquad
\mathbb E_x[R_h^2]=O(h^2),\qquad
(\mathbb E_x[R_h^2])^{1/2}=O(h).$$
所以局部均方根强误差为一阶；若“均方误差”指不开放根的平方误差，则其阶为 $h^2$。

弱误差还需考虑测试函数。对精确解，Dynkin 展开给出
$$\mathbb E_x[f(X_{t+h})]=f(x)+h\mathcal Lf(x)+O(h^2).$$
对 Euler 状态，因 $\Delta B$ 为高斯变量，作 Taylor 展开并取期望，得
$$\begin{aligned}
\mathbb E_x[f(x+b(x)h+\sigma(x)\Delta B)]
&=f(x)+b(x)f'(x)h
+\frac12\sigma^2(x)f''(x)\mathbb E[(\Delta B)^2]+O(h^2)\\
&=f(x)+h\mathcal Lf(x)+O(h^2).
\end{aligned}$$
两式相减，局部弱误差为 $O(h^2)$。随机增量尺度来自 $\mathbb E[(\Delta B)^2]=h$，即 $|\Delta B|$ 的典型尺度为 $\sqrt h$；它使二阶 Taylor 项与漂移项同为 $h$ 阶，也使被 Euler 遗漏的二重随机积分达到均方根 $h$ 阶。常见错误是把 $\Delta B$ 当作 $O(h)$，或只凭 $\mathbb E[R_h]=O(h^2)$ 而不展开 $f$ 就断言任意测试函数的弱误差阶。
## 18. 
**证明**
设 $t_k=kh$，$N h=T$，$\eta(s)=\max\{t_k:t_k\le s\}$，并令 $Y_k=\widehat X_{t_k}$。连续插值数值解为
$$\widehat X_t=x_0+\int_0^tb(\widehat X_{\eta(s)})\,ds+\sigma B_t.$$
全局 Lipschitz 条件蕴含线性增长：存在 $K$ 使 $|b(x)|\le K(1+|x|)$。

先建立二阶矩界。对精确解使用三角不等式、Cauchy–Schwarz 不等式和 Burkholder–Davis–Gundy 不等式，得
$$\mathbb E\!\left[\sup_{s\le t}|X_s|^2\right]
\le C_T\!\left(|x_0|^2+\sigma^2t+\int_0^t(1+\mathbb E|X_s|^2)\,ds\right).$$
Gronwall 引理遂给出 $\mathbb E[\sup_{t\le T}|X_t|^2]\le C(1+|x_0|^2)$。对数值解，条件期望 $\mathbb E[\Delta B_k\mid\mathcal F_{t_k}]=0$ 使交叉项消失，递推可得
$$\mathbb E|Y_{k+1}|^2\le(1+Ch)\mathbb E|Y_k|^2+Ch.$$
离散 Gronwall 引理给出 $\max_k\mathbb E|Y_k|^2\le C$；再控制一个网格区间内的漂移和 Brownian 增量，即得 $\mathbb E[\sup_{t\le T}|\widehat X_t|^2]\le C$。

单步增量也有统一估计。对 $r\in[0,h]$，
$$\mathbb E\!\left[\sup_{r\le h}|\widehat X_{t_k+r}-Y_k|^2\right]
\le2h^2\mathbb E|b(Y_k)|^2+2\sigma^2\mathbb E\!\left[\sup_{r\le h}|B_{t_k+r}-B_{t_k}|^2\right]
\le Ch.$$
对精确解，同理有 $\mathbb E[\sup_{r\le h}|X_{t_k+r}-X_{t_k}|^2]\le Ch$，这里二阶矩界用于吸收状态因子。

令 $e_t=X_t-\widehat X_t$。两条方程使用同一 Brownian 运动，且 $\sigma$ 为常数，所以随机积分完全抵消：
$$e_t=\int_0^t\bigl(b(X_s)-b(\widehat X_{\eta(s)})\bigr)ds.$$
利用 Lipschitz 条件与 $|a+c|^2\le2|a|^2+2|c|^2$，有
$$\sup_{r\le t}|e_r|^2
\le2L^2T\int_0^t|e_s|^2ds
+2L^2T\int_0^t|\widehat X_s-\widehat X_{\eta(s)}|^2ds.$$
令 $G(t)=\mathbb E[\sup_{r\le t}|e_r|^2]$。由于 $|e_s|^2\le\sup_{r\le s}|e_r|^2$，结合单步增量估计，得到
$$G(t)\le2L^2T\int_0^tG(s)\,ds+CTh.$$
Gronwall 引理最终给出
$$\mathbb E\!\left[\sup_{0\le t\le T}|X_t-\widehat X_t|^2\right]
\le CTh\,e^{2L^2T^2}=Ch.$$
因此均方根强误差阶为 $h^{1/2}$。常数 $C$ 依赖于 $T,L,K,\sigma,|x_0|$ 及所用矩不等式的普适常数，但不依赖于 $h$。常见错误是把漂移误差只写成 $b(X_s)-b(\widehat X_s)$，遗漏 $\widehat X_s$ 与冻结状态 $\widehat X_{\eta(s)}$ 的单步差；也不能在未控制数值解矩时就把相应项当成有界常数。

□
## 19. 
**证明**
设 $t_k=kh$，$N h=T$，数值序列为 $Y_k$，初值均为 $x_0$。定义后向价值函数
$$v(t,x)=\mathbb E[f(X_T)\mid X_t=x],\qquad v(T,x)=f(x),$$
并简写 $v_k(x)=v(t_k,x)$。Markov 性给出精确的相邻时间层恒等式
$$v_k(x)=\mathbb E_x[v_{k+1}(X_{t_{k+1}})].$$
另一方面，Euler 一步为 $\mathcal E_h(x)=x+b(x)h+\sigma(x)\Delta B$。

对精确一步使用生成元展开：
$$\mathbb E_x[v_{k+1}(X_{t_{k+1}})]
=v_{k+1}(x)+h\mathcal Lv_{k+1}(x)+R^X_k(x),$$
其中 $R^X_k(x)=O(h^2)$，多项式增长权重由系数和各阶导数的假设控制。对 Euler 一步，利用 $\Delta B$ 的高斯矩并作 Taylor 展开，得
$$\mathbb E_x[v_{k+1}(\mathcal E_h(x))]
=v_{k+1}(x)+h\mathcal Lv_{k+1}(x)+R^E_k(x),$$
同样 $R^E_k(x)=O(h^2)$。精确一步与 Euler 一步的 $h$ 阶生成元项完全相同，所以局部弱余项满足
$$\left|\mathbb E_x[v_{k+1}(\mathcal E_h(x))]-v_k(x)\right|
\le Ch^2(1+|x|^q)$$
对某个固定 $q$ 成立。这里也用到 $\partial_tv+\mathcal Lv=0$，它把精确相邻层恒等式与后向方程联系起来。

现在作严格的时间层递推：
$$\begin{aligned}
\mathbb E[f(Y_N)]-v(0,x_0)
&=\mathbb E[v_N(Y_N)]-\mathbb E[v_0(Y_0)]\\
&=\sum_{k=0}^{N-1}\mathbb E\bigl[v_{k+1}(Y_{k+1})-v_k(Y_k)\bigr].
\end{aligned}$$
在第 $k$ 项中先对 $\mathcal F_{t_k}$ 取条件期望，再代入上述局部估计，得到
$$\left|\mathbb E[f(Y_N)]-v(0,x_0)\right|
\le Ch^2\sum_{k=0}^{N-1}\bigl(1+\mathbb E|Y_k|^q\bigr).$$
多项式增长条件与数值解各阶矩的一致有界性给出 $\sup_{h,k}\mathbb E|Y_k|^q<\infty$。由于 $N=T/h$，故
$$\left|\mathbb E[f(X_T)]-\mathbb E[f(Y_N)]\right|\le CTh,$$
即全局弱误差为一阶。

这一结论依赖相邻层条件期望中的 $h$ 阶项相消，不是把轨道误差直接代入 $f$ 得到的。第18题给出的是 $\mathbb E[\sup_t|X_t-\widehat X_t|^2]\le Ch$，即均方根强误差为 $O(h^{1/2})$；本题则是分布泛函的偏差为 $O(h)$，二者不能互相替代。常见错误是把局部弱误差 $O(h^2)$ 当成全局误差，或把 $N=T/h$ 次累积误算成 $O(h^2)$。

□
## 20. 
**证明**
从第17题的 Itô–Taylor 展开看，Euler 格式遗漏的主项是
$$\int_t^{t+h}\int_t^s\sigma(X_r)\sigma'(X_r)\,dB_r\,dB_s.$$
在起始点冻结系数，得到主近似
$$\sigma(x)\sigma'(x)I_{(1,1)},\qquad
I_{(1,1)}=\int_t^{t+h}\int_t^sdB_r\,dB_s.$$
由 $B_{t+h}^2-B_t^2$ 的 Itô 公式，或直接交换积分次序，可得
$$I_{(1,1)}=\frac12\bigl((\Delta B)^2-h\bigr).$$
因此 Milstein 格式为
$$Y_{k+1}=Y_k+b(Y_k)h+\sigma(Y_k)\Delta B_k
+\frac12\sigma(Y_k)\sigma'(Y_k)\bigl((\Delta B_k)^2-h\bigr).$$
新增项正是对角线上的二重随机积分，不是人为加入的确定性高阶修正。

设 $b,\sigma,\sigma\sigma'$ 足够光滑且 Lipschitz，相关导数满足多项式增长。保留该主项后，余项的下一批主项为
$$\int_t^{t+h}\int_t^s dB_r\,ds,\qquad
\int_t^{t+h}\int_t^s dr\,dB_s,\qquad
\int_t^{t+h}\int_t^s dr\,ds$$
及其状态相关版本。前两类双积分的均方根为 $O(h^{3/2})$，最后一类为 $O(h^2)$。故从同一精确状态 $x$ 出发，Milstein 局部余项 $\rho_h(x)$ 满足
$$\left|\mathbb E[\rho_h(x)]\right|\le Ch^2,\qquad
\mathbb E|\rho_h(x)|^2\le Ch^3.$$
第一个估计使用随机积分的零均值，第二个估计使用 Itô 等距和各阶矩界。

再由局部误差推全局误差。记 $\mathcal M_h(x)$ 为使用同一 Brownian 增量的 Milstein 映射。对上述系数的 Lipschitz 性使用 $\mathbb E[\Delta B]=\mathbb E[(\Delta B)^2-h]=0$，可得稳定性估计
$$\mathbb E|\mathcal M_h(x)-\mathcal M_h(y)|^2
\le(1+Ch)|x-y|^2.$$
精确解的相邻层传播也满足同类均方稳定性。把每步局部余项分解为条件均值部分与条件零均值部分：前者每步至多 $O(h^2)$，经稳定传播和 $T/h$ 步累加为 $O(h)$；后者形成平方可积鞅差，方差可以相加，经稳定传播后的总二阶矩至多为
$$C\sum_{k=0}^{N-1}h^3=CNh^3=O(h^2).$$
离散 Gronwall 引理控制传播因子，故终端误差满足
$$\mathbb E|X_T-Y_N|^2\le Ch^2,
\qquad \bigl(\mathbb E|X_T-Y_N|^2\bigr)^{1/2}\le Ch.$$
所以 Milstein 的均方根强阶为 $1$，高于 Euler–Maruyama 的 $1/2$。常见错误是把修正项写成 $\tfrac12\sigma\sigma'(\Delta B)^2$ 而漏掉 $-h$，或只验证局部 $O(h^{3/2})$ 均方根误差而不经过稳定性与鞅差累加就宣称全局一阶。

□

## 21. 
记 $Y_{h,i}=f(\widehat X_T^{h,i})$、$\bar Y_{h,N}=N^{-1}\sum_{i=1}^NY_{h,i}$，并令
$$\mu=\mathbb E[f(X_T)],\qquad \mu_h=\mathbb E[Y_{h,1}],\qquad
\beta_h=\mu_h-\mu,\qquad \sigma_h^2=\operatorname{Var}(Y_{h,1}).$$
这里 $\beta_h$ 是离散化偏差，$\sigma_h^2$ 是固定步长下单条数值路径 payoff 的方差。将估计误差分成随机抽样误差与确定性偏差：
$$\bar Y_{h,N}-\mu=(\bar Y_{h,N}-\mu_h)+\beta_h.$$
由于独立同分布性给出 $\mathbb E[\bar Y_{h,N}]=\mu_h$ 且
$\operatorname{Var}(\bar Y_{h,N})=\sigma_h^2/N$，交叉项满足
$$\mathbb E[(\bar Y_{h,N}-\mu_h)\beta_h]
=\beta_h(\mathbb E[\bar Y_{h,N}]-\mu_h)=0.$$
所以对目标量 $\mu$ 的均方误差有严格分解
$$\operatorname{MSE}(h,N)
=\mathbb E[(\bar Y_{h,N}-\mu)^2]
=\beta_h^2+\frac{\sigma_h^2}{N}.$$
即使不知道弱收敛阶，这个等式也成立。若格式对相应 payoff 具有弱阶 $p$，并且
$\beta_h=C_ph^p+o(h^p)$、$\sigma_h^2\to\sigma_0^2$，则进一步有
$$\operatorname{MSE}(h,N)
=C_p^2h^{2p}+\frac{\sigma_0^2}{N}
+o(h^{2p})+o(N^{-1}),$$
这里最后一个余项表示 $\sigma_h^2-\sigma_0^2$ 所造成的影响；若只知方差有界，则应保留精确的 $\sigma_h^2/N$，不能擅自换成极限方差。

固定 $h$，设 $0<\sigma_h^2<\infty$。中心极限定理给出
$$\sqrt N\,\frac{\bar Y_{h,N}-\mu_h}{\sigma_h}
\Rightarrow\mathcal N(0,1).$$
样本方差取
$$s_{h,N}^2=\frac1{N-1}\sum_{i=1}^N(Y_{h,i}-\bar Y_{h,N})^2,$$
则 $s_{h,N}^2\to\sigma_h^2$ 依概率成立。由 Slutsky 定理，
$$\bar Y_{h,N}\pm z_{1-\alpha/2}\frac{s_{h,N}}{\sqrt N}$$
是 $\mu_h$ 的渐近置信水平 $1-\alpha$ 的置信区间，而不是自动成为 $\mu$ 的置信区间。
若要使区间针对 $\mu$，必须处理偏差。将标准化误差写为
$$\sqrt N\,\frac{\bar Y_{h,N}-\mu}{s_{h,N}}
=\sqrt N\,\frac{\bar Y_{h,N}-\mu_h}{s_{h,N}}
+\frac{\sqrt N\,\beta_h}{s_{h,N}}.$$
在 $h=h_N$、$\sqrt{N}\beta_{h_N}\to0$ 以及保证三角阵列中心极限定理和方差估计相合性的常规可积条件下，第二项消失，因而同一区间对 $\mu$ 也有渐近覆盖率 $1-\alpha$。若 $\sqrt N\beta_h\to c\ne0$，区间中心会产生渐近偏移；若该量发散，通常置信覆盖率趋于零。若可以构造相合偏差估计 $\widehat\beta_h$，且 $\sqrt N(\widehat\beta_h-\beta_h)\to0$，则可改用
$$\bar Y_{h,N}-\widehat\beta_h
\pm z_{1-\alpha/2}\frac{s_{h,N}}{\sqrt N}.$$
偏差估计本身若带不可忽略的不确定性，还应把其方差计入区间，而不能只做点修正。

在总计算量约束下，设每条路径成本与 $h^{-q}$ 成正比，总成本近似为
$$\mathcal C=cNh^{-q},\qquad K=\mathcal C/c,\qquad N=Kh^q.$$
对固定时限的一维逐步模拟通常 $q=1$。令 $A=C_p^2$、$B=\sigma_0^2$，在非退化情形 $A>0$、$B>0$ 下，渐近均方误差化为
$$J(h)=Ah^{2p}+\frac{B}{K}h^{-q}.$$
求导并令其为零，得到
$$2pA\,h^{2p-1}-\frac{qB}{K}h^{-q-1}=0,
\qquad h^{2p+q}=\frac{qB}{2pAK}.$$
由于 $J''(h)>0$，该驻点就是最小值点。因此
$$h_*=\left(\frac{qB}{2pAK}\right)^{1/(2p+q)},\qquad
N_* =Kh_*^q
=K^{2p/(2p+q)}\left(\frac{qB}{2pA}\right)^{q/(2p+q)}.$$
最优点的两项误差满足
$$A h_*^{2p}=\frac{q}{2p}\frac{B}{N_*},$$
即偏差平方与 Monte Carlo 方差的比例为 $q/(2p)$；当 $q=1$ 时，该比例为 $1/(2p)$，而不是机械地令两项相等。此时
$$h_*=O(\mathcal C^{-1/(2p+q)}),\qquad
N_*=O(\mathcal C^{2p/(2p+q)}),\qquad
J(h_*)=O(\mathcal C^{-2p/(2p+q)}).$$
若只按 $h^{2p}\asymp N^{-1}$ 配平而忽略预算关系，虽然可能得到正确的部分尺度直觉，却会丢失上述常数、成本指数及最优误差分配。
若改用均方根误差上限 $\varepsilon$ 做设计，可取 $\eta\in(0,1)$，分别要求
$$|\beta_h|\le\eta\varepsilon,\qquad
\frac{\sigma_h}{\sqrt N}\le\sqrt{1-\eta^2}\,\varepsilon,$$
因为两项平方相加后即得 $\operatorname{MSE}(h,N)\le\varepsilon^2$。在渐近偏差模型下，这对应于
$$h\le\left(\frac{\eta\varepsilon}{|C_p|}\right)^{1/p},\qquad
N\ge\frac{\sigma_h^2}{(1-\eta^2)\varepsilon^2};$$
实际计算时还应估计 $C_p$ 和 $\sigma_h^2$，并用更小步长复核偏差模型。

常见错误是把 $\mathbb E[(\bar Y_{h,N}-\mu_h)^2]=\sigma_h^2/N$ 误当成对 $\mu$ 的完整均方误差，从而漏掉 $\beta_h^2$；或把固定 $h$ 下关于 $\mu_h$ 的置信区间直接解释为关于 $\mu$ 的区间。另一错误是把路径强阶代入这里的弱偏差指数 $p$，或在总成本固定后仍孤立地最小化 $N$ 与 $h$ 中的一项。若数值路径并不独立，则样本方差除以 $N$ 的公式也失效，必须计入协方差。
## 22. 
设 $\sigma>0$，期限 $T$ 固定，利率 $r$ 为常数。按照本章 $dZ_t=Z_t\theta_t\,dB_t$ 的 Girsanov 核约定，取常数
$$\lambda=\frac{r-\mu}{\sigma},\qquad \theta_t\equiv\lambda,$$
并定义
$$Z_t=\exp\!\left(\lambda B_t-\frac12\lambda^2t\right),\qquad
\left.\frac{d\mathbb Q}{d\mathbb P}\right|_{\mathcal F_T}=Z_T.$$
因为 $\lambda$ 为常数，Novikov 条件显然成立，$Z$ 是 $\mathbb P$ 下期望恒为 $1$ 的正鞅，故 $\mathbb Q$ 与 $\mathbb P$ 等价。Itô 公式同时给出 $dZ_t=\lambda Z_t\,dB_t$。在 $\mathbb Q$ 下，
$$W_t=B_t-\lambda t$$
是标准 Brownian 运动，即 $dB_t=dW_t+\lambda\,dt$。代回标的方程可得
$$dS_t=\mu S_t\,dt+\sigma S_t(dW_t+\lambda\,dt)
=(\mu+\sigma\lambda)S_t\,dt+\sigma S_t\,dW_t
=rS_t\,dt+\sigma S_t\,dW_t.$$
若采用相反符号的 Girsanov 核定义，密度的形式会相应改变，但漂移消去的计算必须始终与 $W_t$ 的定义一致。

对 $\log S_t$ 使用 Itô 公式。由 $(\log x)'=1/x$、$(\log x)''=-1/x^2$ 以及 $d\langle S\rangle_t=\sigma^2S_t^2dt$，有
$$d\log S_t=\frac{dS_t}{S_t}
-\frac12\frac{d\langle S\rangle_t}{S_t^2}
=\left(r-\frac12\sigma^2\right)dt+\sigma\,dW_t.$$
从 $0$ 到 $t$ 积分并取指数，得到新测度下的显式解
$$S_t=S_0\exp\!\left(\left(r-\frac12\sigma^2\right)t+\sigma W_t\right).$$
反向使用 Itô 公式可验证该过程确实满足风险中性 SDE，并保持严格为正。又因 $\mathbb E^{\mathbb Q}[e^{\sigma W_t}]=e^{\sigma^2t/2}$，所以
$$\mathbb E^{\mathbb Q}[S_t]=S_0e^{rt}.$$
折现价格还满足
$$d(e^{-rt}S_t)=\sigma e^{-rt}S_t\,dW_t,$$
其随机积分是真鞅，因而 $\mathbb E^{\mathbb Q}[e^{-rt}S_t]=S_0$，这与风险中性定价要求一致。
下面推导折现 payoff 的 Feynman–Kac 方程。设 $g$ 及相应价值函数满足所需光滑性和可积性，定义
$$v(t,x)=\mathbb E^{\mathbb Q}\!\left[e^{-r(T-t)}g(S_T)\mid S_t=x\right],
\qquad 0\le t\le T,\quad x>0.$$
由 Markov 性与条件期望的塔性质，
$$M_t=e^{-rt}v(t,S_t)
=\mathbb E^{\mathbb Q}\!\left[e^{-rT}g(S_T)\mid\mathcal F_t\right]$$
是 $\mathbb Q$ 下的鞅。另一方面，对 $e^{-rt}v(t,S_t)$ 使用 Itô 公式，得到
$$\begin{aligned}
dM_t={}&e^{-rt}\left(\partial_tv+rS_t\partial_xv
+\frac12\sigma^2S_t^2\partial_{xx}v-rv\right)dt\\
&+e^{-rt}\sigma S_t\partial_xv\,dW_t.
\end{aligned}$$
在
$$\mathbb E^{\mathbb Q}\!\left[\int_0^T
 e^{-2rs}\sigma^2S_s^2(\partial_xv(s,S_s))^2ds\right]<\infty$$
等条件下，随机积分是真鞅，因此 $M_t$ 的漂移必须为零。由 $S_t>0$ 及漂移项的连续性，得到终值问题
$$\partial_tv+rx\,\partial_xv
+\frac12\sigma^2x^2\partial_{xx}v-rv=0,
\qquad (t,x)\in[0,T)\times(0,\infty),$$
$$v(T,x)=g(x).$$
这里 $rx\,\partial_xv+\tfrac12\sigma^2x^2\partial_{xx}v$ 是风险中性生成元的作用，$-rv$ 来自连续折现。反过来，若 $v$ 满足该终值问题，上述 Itô 展开中的漂移积分为零；对其取条件期望并使用终值，即恢复
$$e^{-rt}v(t,S_t)
=\mathbb E^{\mathbb Q}[e^{-rT}g(S_T)\mid\mathcal F_t],$$
这正是折现 payoff 的 Feynman–Kac 表示。若终端 payoff 不够光滑，可在相应的弱解或粘性解框架下解释方程，不能直接假定各阶导数在 $t=T$ 处都存在。
取 $n=T/h$ 为正整数，令 $t_k=kh$，并在 $\mathbb Q$ 下生成独立增量
$$\Delta W_k=W_{t_{k+1}}-W_{t_k}=\sqrt h\,\xi_k,
\qquad \xi_k\overset{\mathrm{iid}}{\sim}\mathcal N(0,1).$$
由显式解的指数递推，精确离散化为
$$S_{k+1}=S_k\exp\!\left(\left(r-\frac12\sigma^2\right)h
+\sigma\Delta W_k\right),\qquad S_0>0.$$
它相当于递推 $\log S_k$，在网格点上与精确解具有相同分布；若使用同一个 $W$ 的增量，则网格点路径强误差仅有浮点舍入误差。Euler–Maruyama 格式则直接离散化风险中性 SDE：
$$\widehat S_{k+1}
=\widehat S_k+r\widehat S_kh+\sigma\widehat S_k\Delta W_k
=\widehat S_k(1+rh+\sigma\Delta W_k),
\qquad \widehat S_0=S_0.$$
两者不能混为一谈。精确格式始终保持正值，而 Euler 格式在 $1+rh+\sigma\Delta W_k<0$ 时会产生负值；不能对负的 Euler 状态直接取对数来“修复”误差。对几何 Brown 运动，在通常的矩与可积条件下，Euler 格式的均方根强阶为 $1/2$，对足够光滑且导数具有适当增长的 payoff，弱阶为 $1$。

强误差实验必须采用共同随机数。对每组 $h$，独立生成 $M$ 条 Brownian 路径；在第 $m$ 条路径上，用同一组 $\Delta W_k^{h,m}$ 分别计算精确状态 $S_{t_k}^{h,m}$ 和 Euler 状态 $\widehat S_k^{h,m}$。可计算终端强误差，也可计算整条离散路径的误差
$$E_h^{\mathrm{str}}=
\left[\frac1M\sum_{m=1}^M
\max_{0\le k\le n}\left|S_{t_k}^{h,m}-\widehat S_k^{h,m}\right|^2
\right]^{1/2}.$$
取 $h=h_0/2^j$ 重复实验，在双对数图上拟合 $E_h^{\mathrm{str}}$ 对 $h$ 的斜率，或用
$$p_h=\log_2\!\left(\frac{E_h^{\mathrm{str}}}
{E_{h/2}^{\mathrm{str}}}\right)$$
估计局部阶，理论上应接近 $1/2$。用独立批次或重复模拟给出 Monte Carlo 标准误，并使 $M$ 足够大，以免抽样噪声淹没最小步长处的强误差。精确格式与自身使用同一增量时强误差为零，不能用其浮点残差拟合收敛阶。
弱误差实验可在同一批模拟中同时进行，但比较的是期望而非逐路径距离。选取有闭式风险中性期望的光滑 payoff，例如 $g(x)=x^2$。由 $W_T\sim\mathcal N(0,T)$ 得
$$\mu_g=\mathbb E^{\mathbb Q}[g(S_T)]
=S_0^2e^{(2r+\sigma^2)T}.$$
对 Euler 终端值计算
$$\bar G_{h,M}=\frac1M\sum_{m=1}^Mg(\widehat S_T^{h,m}),\qquad
E_h^{\mathrm{weak}}=|\bar G_{h,M}-\mu_g|.$$
令 $\mu_{g,h}=\mathbb E^{\mathbb Q}[g(\widehat S_T^{h,1})]$，则
$$\bar G_{h,M}-\mu_g=(\bar G_{h,M}-\mu_{g,h})+(\mu_{g,h}-\mu_g),$$
第一项是 Monte Carlo 误差，第二项才是弱离散化偏差。用 $g(\widehat S_T^{h,m})$ 的样本标准差 $s_{g,h}$ 构造 Monte Carlo 区间
$$\bar G_{h,M}\pm z_{1-\alpha/2}\frac{s_{g,h}}{\sqrt M},$$
并把 $M$ 取得足够大，使标准误低于待分辨的 $O(h)$ 弱偏差；否则观测到的只是 $O_p(M^{-1/2})$ 抽样底噪。对经过噪声筛选的误差拟合 $\log E_h^{\mathrm{weak}}$ 对 $\log h$ 的直线，Euler 格式应显示近似一阶斜率。折现 payoff 的检验只需把 $g$ 换成 $e^{-rT}g$，常数折现因子不改变弱阶。精确离散化的弱偏差为零，其估计误差应随 $M$ 增大按 Monte Carlo 速率下降，而不应呈现正的步长收敛阶。

常见错误有：Girsanov 核与 $W_t=B_t-\lambda t$ 的符号约定不一致，导致漂移变成 $2\mu-r$ 而非 $r$；在指数解中漏掉 Itô 修正 $-\sigma^2t/2$；在 Feynman–Kac 方程中把 $-rv$ 写成 $+rv$；把精确指数格式误当成 Euler 格式。数值检验中，若精确路径与 Euler 路径使用独立 Brownian 增量，所得差异包含两条独立路径本身的随机性，不能测出强阶；若把有限样本的精确格式均值当作无误差的弱误差基准，则会把参考样本的 Monte Carlo 噪声误判为离散化偏差。最后，弱误差斜率依赖 payoff 的正则性，非光滑 payoff 不应未经验证就套用光滑函数的一阶结论。