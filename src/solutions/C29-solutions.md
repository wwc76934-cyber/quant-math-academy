# 第29章习题参考答案与解析

## 1. 
波动率聚集指大幅收益无论正负往往接连出现，小幅收益也往往接连出现，即条件波动具有持续性。无条件厚尾指相对同均值、同方差的正态分布，收益极端值更常见；杠杆效应指负冲击通常比同幅度正冲击更显著提高后续波动；波动率持续性指高波动或低波动状态衰减缓慢。

收益近似不相关只约束二阶线性关系，不能排除 $r_t$ 与滞后平方收益等非线性函数的依赖。例如正确 ARCH 模型可有 $\operatorname{Cov}(r_t,r_{t-j})=0$，却有 $\operatorname{Cov}(r_t^2,r_{t-j}^2)>0$。反之，平方收益自相关只是条件异方差的一个表现，许多 ARCH、GARCH、随机波动率乃至均值误设都能产生它，故不能据此识别某个特定设定。

诊断时先以训练样本确定并检验均值方程，检查残差是否仍有自相关及条件均值遗漏；再对残差做 ARCH-LM，并比较加入遗漏滞后项、结构突变或正确非线性均值项前后的结果。若平方残差相关在均值修正后消失，原先证据更可能来自均值误设；若均值残差已近似白噪声而平方残差仍系统相关，才支持条件异方差，随后再比较不同方差方程。常见错误是把收益不相关误当独立，或直接对未滤除均值结构的收益平方做检验并据此认定某一 ARCH 阶数正确。

## 2. 
**证明**
由 $r_{t-1}^2=h_{t-1}z_{t-1}^2$（此处 $h_t=\sigma_t^2$）及 $z_{t-1}$ 与 $\mathcal F_{t-2}$ 独立，且 $h_{t-1}$ 为 $\mathcal F_{t-2}$ 可测，得到
$$
\mathbb E[h_t\mid\mathcal F_{t-2}]=\omega+\alpha h_{t-1}\mathbb E[z_{t-1}^2]=\omega+\alpha h_{t-1}.
$$
若平稳解具有限二阶矩，则 $m=\mathbb E[h_t]=\mathbb E[r_t^2]$ 有限且不随时间改变，取期望得 $m=\omega+\alpha m$，故 $m=\omega/(1-\alpha)$。必要性还需排除边界：若 $\alpha>1$，则 $m=\omega/(1-\alpha)<0$，与 $m>0$ 矛盾；若 $\alpha=1$，递推变为 $m=m+\omega$，亦不可能。因此必有 $0\le\alpha<1$。

反之，固定 $0\le\alpha<1$，反复迭代并形式取极限，构造
$$
h_t=\omega\sum_{j=0}^{\infty}\alpha^j\prod_{k=1}^{j}z_{t-k}^2,\qquad \prod_{k=1}^{0}z_{t-k}^2=1.
$$
各项非负，单调收敛定理与独立性给出
$$
\mathbb E[h_t]=\omega\sum_{j=0}^{\infty}\alpha^j=\frac{\omega}{1-\alpha}<\infty.
$$
该构造严格平稳并满足递推，且 $\mathbb E[r_t]=0$、$\operatorname{Var}(r_t)=\mathbb E[h_t]$，所以条件也是充分的。

记 $\mu_4=\mathbb E[z_t^4]$。若四阶矩有限，独立性进一步给出
$$
\mathbb E[h_t^2]=\omega^2+2\omega\alpha m+\alpha^2\mu_4\mathbb E[h_{t-1}^2],
$$
从而
$$
\mathbb E[r_t^4]=\mu_4\mathbb E[h_t^2]
=\frac{\mu_4\{\omega^2+2\omega\alpha m\}}{1-\alpha^2\mu_4}.
$$
这还要求 $\alpha^2\mu_4<1$；否则平稳四阶矩递推不能给出有限正解。因此 $\alpha<1$ 只控制二阶矩，不控制四阶矩。常见错误是直接把 $\mathbb E[r_{t-1}^2]$ 当作 $h_{t-1}$，或从二阶平稳条件误推出四阶矩必有限。
□

## 3. 
令 $x_t=(1,e_{t-1}^2,\ldots,e_{t-q}^2)^\top$。在均值方程正确、条件同方差的原假设下，$e_t^2$ 对滞后平方残差没有系统线性依赖，故检验 $H_0:c_1=\cdots=c_q=0$。以全部可用观测回归并记判定系数为 $R^2$，得分形式等价于检验 $e_t^2$ 与 $x_t$ 中斜率变量的样本协方差是否为零。标准正则条件下，得分向量乘以 $\sqrt T$ 渐近正态；用原假设下的信息矩阵标准化后，得到
$$
LM=TR^2\xrightarrow{d}\chi_q^2.
$$
自由度是受限斜率系数的个数 $q$，只在上尾拒绝，因为 $TR^2$ 大才表示滞后平方残差具有解释力。

GARCH 的平方残差同样可由许多滞后平方残差逼近，所以该检验拒绝同方差并不识别 ARCH$(q)$ 或 GARCH。均值误设会使残差包含可预测成分，进而制造平方残差相关；少数异常值又可能主导 $e_t^2$ 与 $R^2$，造成虚假拒绝。因此应配合均值诊断、稳健性或异常值敏感性分析。常见错误是以下尾拒绝、把自由度写成 $q+1$，或把拒绝解释成某一 ARCH 模型已被证明。

为把渐近分布的构造写清楚，记 $u_t=e_t^2$，并把去掉截距后的滞后平方残差组成 $T\times q$ 矩阵 $\boldsymbol Z$，各列已经减去样本均值。令 $\boldsymbol u$ 为 $u_t$ 组成的向量，$\bar u$ 为其样本均值，则斜率估计与判定系数可写为
$$
\widehat{\boldsymbol c}=\left(\boldsymbol Z^\top\boldsymbol Z\right)^{-1}\boldsymbol Z^\top(\boldsymbol u-\bar u\boldsymbol1),\qquad
R^2=\frac{\widehat{\boldsymbol c}^{\,\top}\boldsymbol Z^\top\boldsymbol Z\widehat{\boldsymbol c}}{(\boldsymbol u-\bar u\boldsymbol1)^\top(\boldsymbol u-\bar u\boldsymbol1)}.
$$
在原假设、正确均值方程及标准正则条件下，$e_t^2-\sigma^2$ 对滞后平方残差没有可预测成分，且 $\tau^2=\operatorname{Var}(e_t^2)$ 有限。由鞅差中心极限定理，
$$
\frac{1}{\sqrt T}\boldsymbol Z^\top(\boldsymbol u-\sigma^2\boldsymbol1)
\xrightarrow{d}N\!\left(\boldsymbol0,\tau^2\operatorname{plim}\frac{\boldsymbol Z^\top\boldsymbol Z}{T}\right).
$$
因此 $T\widehat{\boldsymbol c}^{\,\top}\boldsymbol Z^\top\boldsymbol Z\widehat{\boldsymbol c}/\tau^2$ 渐近服从 $\chi_q^2$。分母除以 $T$ 后依概率收敛到 $\tau^2$，由 Slutsky 定理便得到前述 $TR^2$ 的极限分布；这也是得分检验采用解释平方和而非残差平方和的原因。实际计算必须对滞后造成的前期缺失观测使用相同样本，不能一处补齐而另一处删除。
## 4. 
**证明**
代入 $r_{t-1}^2=h_{t-1}z_{t-1}^2$，并定义 $A_{t-1}=\alpha z_{t-1}^2+\beta$，得到随机系数递推
$$
h_t=\omega+A_{t-1}h_{t-1}.
$$
这里 $A_{t-1}\ge0$，且它与 $h_{t-1}$ 独立。若平稳解具有限二阶矩，则 $m=\mathbb E[h_t]$ 为有限正常数，并且 $\mathbb E[r_t]=0$。对递推取期望，利用 $\mathbb E[z_{t-1}^2]=1$，得到
$$
m=\omega+(\alpha+\beta)m.
$$
记 $\kappa=\alpha+\beta$。若 $\kappa=1$，上式成为 $m=m+\omega$，与 $\omega>0$ 矛盾；若 $\kappa>1$，形式上解出的 $m=\omega/(1-\kappa)<0$，与方差均值为正矛盾。因此必有 $\kappa<1$，并且
$$
m=\frac{\omega}{1-\alpha-\beta},\qquad
\operatorname{Var}(r_t)=\mathbb E[r_t^2]=\mathbb E[h_t]=\frac{\omega}{1-\alpha-\beta}.
$$

反之，当 $\kappa<1$ 时，反复迭代可构造非负解
$$
h_t=\omega\left[1+\sum_{j=1}^{\infty}\prod_{i=1}^{j}A_{t-i}\right].
$$
独立性给出 $\mathbb E[\prod_{i=1}^{j}A_{t-i}]=\kappa^j$。单调收敛定理于是保证该级数的期望为 $\omega/(1-\kappa)$，故级数几乎必然有限；它满足原递推、只由历史创新构成，并具有严格平稳性和有限二阶矩。因此该条件不仅必要，也保证上述平稳二阶矩解的构造成立。

严格平稳的充分条件只要求随机系数在对数尺度上平均收缩，即
$$
\mathbb E[\log A_t]=\mathbb E[\log(\alpha z_t^2+\beta)]<0.
$$
由 $\log$ 的凹性和 Jensen 不等式，
$$
\mathbb E[\log A_t]\le\log\mathbb E[A_t]=\log(\alpha+\beta).
$$
所以 $\alpha+\beta<1$ 蕴含严格平稳的对数条件，通常更强。反向不成立：例如取标准正态创新和 $\beta=0$，则 $\mathbb E[\log z_t^2]$ 约为 $-1.2704$；令 $\alpha=2$，有 $\mathbb E[\log(2z_t^2)]<0$，但 $\alpha+\beta=2>1$，此时无条件方差不有限。

常见错误是只检查 $\alpha<1$ 而遗漏 $\beta$，把 $r_{t-1}^2$ 的期望误写成 $h_{t-1}z_{t-1}^2$ 的当期观测值，或由严格平稳直接推出二阶矩有限。也不能把 Jensen 不等式方向颠倒，将对数条件误写成 $\alpha+\beta\le1$ 的等价形式。
□
## 5. 
记 $\kappa=\alpha+\beta<1$，$m=\omega/(1-\kappa)$，并令 $g_j=\mathbb E[h_{t+j}\mid\mathcal F_t]$。已知 $g_1=\omega+\kappa h_t$。对任意 $j\ge1$，未来创新满足 $\mathbb E[z_{t+j}^2\mid\mathcal F_{t+j-1}]=1$，故
$$
g_{j+1}=\mathbb E[\omega+\alpha h_{t+j}z_{t+j}^2+\beta h_{t+j}\mid\mathcal F_t]
=\omega+\kappa g_j.
$$
从 $g_0=h_t$ 反复迭代，每迭代一次便增加一个常数项并把 $h_t$ 的系数再乘以 $\kappa$，因此
$$
g_h=\omega\sum_{j=0}^{h-1}\kappa^j+\kappa^h h_t
=\omega\frac{1-\kappa^h}{1-\kappa}+\kappa^h h_t
=m+\kappa^h(h_t-m),\qquad h\ge1.
$$
由于 $\kappa\in[0,1)$，有 $\kappa^h\to0$，从而 $\lim_{h\to\infty}g_h=m$。长期预测回到无条件方差，而不是回到零或固定为当前 $h_t$。

又因 $r_{t+h}=\sqrt{h_{t+h}}z_{t+h}$，未来标准化创新与截至 $t+h-1$ 的信息独立，所以
$$
\mathbb E[r_{t+h}^2\mid\mathcal F_t]
=\mathbb E[h_{t+h}\mathbb E(z_{t+h}^2\mid\mathcal F_{t+h-1})\mid\mathcal F_t]
=g_h.
$$
故 $g_h$ 同时就是平方收益的条件预测，而非仅仅是潜在方差过程的预测。

令累计收益为 $R_{t,H}=\sum_{j=1}^{H}r_{t+j}$。条件均值为零意味着 $\mathbb E[r_{t+j}\mid\mathcal F_{t+j-1}]=0$，于是 $\mathbb E[R_{t,H}\mid\mathcal F_t]=0$。对 $1\le j<k\le H$，使用 $j\le k-1$ 和塔式性质得到
$$
\mathbb E[r_{t+j}r_{t+k}\mid\mathcal F_t]
=\mathbb E\!\left[r_{t+j}\mathbb E(r_{t+k}\mid\mathcal F_{t+k-1})\mid\mathcal F_t\right]=0.
$$
因而所有横项消失，累计条件方差为
$$
\operatorname{Var}(R_{t,H}\mid\mathcal F_t)
=\sum_{j=1}^{H}\mathbb E[r_{t+j}^2\mid\mathcal F_t]
=Hm+(h_t-m)\frac{\kappa(1-\kappa^H)}{1-\kappa}.
$$
横项消失依赖未来收益关于当时信息集的条件均值为零，而不只是收益在无条件意义下不相关。常见错误是把首期预测写成 $\omega+\kappa h_{t-1}$、把有限期指数写成 $\kappa^{h-1}$，或在累计方差中随意加入协方差项；另一个错误是把随机的 $r_{t+h}^2$ 本身当成 $h_{t+h}$。
## 6. 
给定 $\mathcal F_{t-1}$ 后，$\mu_t$ 与 $h_t$ 已知，且 $z_t=(r_t-\mu_t)/\sqrt{h_t}$。由 $r_t=\mu_t+\sqrt{h_t}z_t$，从 $z_t$ 到 $r_t$ 的 Jacobi 行列式为 $\sqrt{h_t}$，反向变换的密度因子因此为 $h_t^{-1/2}$。单个观测的条件密度为
$$
g_t(r_t\mid\mathcal F_{t-1})=h_t^{-1/2}f_\nu\!\left(\frac{r_t-\mu_t}{\sqrt{h_t}}\right).
$$
代入题给密度并取对数，得到
$$
\begin{aligned}
\ell_t={}&\log\Gamma\!\left(\frac{\nu+1}{2}\right)-\log\Gamma\!\left(\frac{\nu}{2}\right)
-\frac12\log((\nu-2)\pi)-\frac12\log h_t\\
&-\frac{\nu+1}{2}\log\!\left[1+\frac{(r_t-\mu_t)^2}{(\nu-2)h_t}\right].
\end{aligned}
$$
若参数只决定条件分布，样本条件对数似然为 $L_T(\theta)=\sum_{t=1}^{T}\ell_t(\theta)$，其中初期状态按既定初值或预处理样本处理。尺度项既表现为显式的 $-\frac12\log h_t$，也表现为平方标准化残差中的分母 $h_t$，二者都不能遗漏。

记 $e_t=r_t-\mu_t$、$z_t=e_t/\sqrt{h_t}$。对决定 $\mu_t$ 或 $h_t$ 的任一参数 $\theta$，先求两个偏导数：
$$
\frac{\partial\ell_t}{\partial\mu_t}
=\frac{(\nu+1)e_t}{h_t(\nu-2+z_t^2)}
=\frac{(\nu+1)z_t}{\sqrt{h_t}(\nu-2+z_t^2)},
$$
以及
$$
\frac{\partial\ell_t}{\partial h_t}
=-\frac{1}{2h_t}+\frac{(\nu+1)e_t^2}{2h_t^2(\nu-2+z_t^2)}
=\frac{1}{2h_t}\left[\frac{(\nu+1)z_t^2}{\nu-2+z_t^2}-1\right].
$$
由链式法则，单个观测及全样本的得分为
$$
\frac{\partial\ell_t}{\partial\theta}
=\frac{\partial\ell_t}{\partial\mu_t}\frac{\partial\mu_t}{\partial\theta}
+\frac{\partial\ell_t}{\partial h_t}\frac{\partial h_t}{\partial\theta},
\qquad
\frac{\partial L_T}{\partial\theta}=\sum_{t=1}^{T}\frac{\partial\ell_t}{\partial\theta}.
$$

标准化密度保证 $\mathbb E[z_t^2]=1$，从而 $\operatorname{Var}(r_t\mid\mathcal F_{t-1})=h_t$。普通 Student-t 的方差为 $\nu/(\nu-2)$ 倍其尺度平方；若直接把那种尺度记作 $\sqrt{h_t}$，实际条件方差会成为 $h_t\nu/(\nu-2)$，改变 $\nu$ 就同时改变尺度归一化，$h_t$ 也能吸收这部分尺度变化。固定方差为一后，$h_t$ 始终表示条件方差，$\nu$ 只控制尾部形状，各模型和不同时点的方差含义才可比较。常见错误是漏掉 $-\frac12\log h_t$、在核中只写 $e_t^2/(\nu-2)$，或对 $h_t$ 求导时把 $z_t$ 错当作与 $h_t$ 无关。
## 7. 
四阶矩有限要求尾部积分中 $z^4$ 与密度衰减项相乘后仍可积。由于密度在无穷远处按 $|z|^{-(\nu+1)}$ 衰减，被积函数按 $|z|^{3-\nu}$ 衰减，故必须且只需 $\nu>4$。下面直接计算。令 $u=z/\sqrt{\nu-2}$，由偶函数对称性和 Beta 积分，
$$
\begin{aligned}
\mathbb E[z^4]
={}&\frac{\Gamma((\nu+1)/2)}{\Gamma(\nu/2)\sqrt{(\nu-2)\pi}}
(\nu-2)^{5/2}\int_{-\infty}^{\infty}u^4(1+u^2)^{-(\nu+1)/2}\,du\\
={}&\frac{(\nu-2)^2\Gamma((\nu+1)/2)}{\Gamma(\nu/2)\sqrt\pi}
B\!\left(\frac52,\frac\nu2-2\right)\\
={}&\frac{(\nu-2)^2}{\sqrt\pi}\Gamma\!\left(\frac52\right)
\frac{\Gamma(\nu/2-2)}{\Gamma(\nu/2)}
=\frac{3(\nu-2)}{\nu-4}.
\end{aligned}
$$
这里使用了 $\Gamma(5/2)=3\sqrt\pi/4$ 和 $\Gamma(x+2)=x(x+1)\Gamma(x)$。因为方差已标准化为一，峰度就是上述四阶矩，超额峰度为
$$
\mathbb E[z^4]-3=\frac{3(\nu-2)}{\nu-4}-3=\frac{6}{\nu-4}.
$$
所以 $\nu$ 越小，尾部越厚、峰度越高；当 $\nu\to\infty$ 时峰度趋于正态分布的 $3$，而当 $\nu\downarrow4$ 时四阶矩发散。对 $2<\nu\le4$，方差仍有限，但不能用有限四阶矩描述峰度。

若条件均值、条件方差及创新分布都正确，理论上的 $z_t$ 独立同分布，均值为零、方差为一。因此 $z_t$ 在非零滞后没有自相关，去均值后的 $z_t^2$ 和 $|z_t|$ 也不应有序列相关；等价地，$z_t^2-1$ 与 $|z_t|-\mathbb E|z_t|$ 对各自滞后没有系统线性预测力。实际标准化残差由估计参数得到，只应近似呈现这些性质，平方残差的 ARCH-LM 等检验也不应再显示稳定剩余结构。

直方图接近 Student-t 只检查把所有时点混在一起后的边际形状，不检查时序条件分布。即使边际直方图匹配，$z_t$ 仍可能自相关，平方或绝对值仍可能聚集，均值方程和方差方程也可能误设；混合不同时期的条件分布还可能偶然形成相似直方图。故还必须做动态残差诊断、概率积分变换及样本外检验。常见错误是未给平方和绝对值去均值就解释其相关，或把边际直方图拟合良好当成整个动态模型正确。
## 8. 
令 $c=\mathbb E|z_{t-1}|$，并记
$$
g(z)=\alpha(|z|-c)+\gamma z.
$$
方程给出 $\log h_t=\omega+\beta\log h_{t-1}+g(z_{t-1})$。只要初值、参数及所取冲击使递推中的对数波动率为有限实数，就有
$$
h_t=\exp\!\left[\omega+\beta\log h_{t-1}+g(z_{t-1})\right]>0.
$$
指数函数严格为正，因此无需像水平方差 GARCH 那样依靠限制 $\omega$、$\alpha$、$\gamma$ 全部非负来保证正方差；当然，估计与平稳性仍可能需要其他参数约束。

固定 $h_{t-1}$ 时，正冲击 $z=a>0$ 与负冲击 $z=-a<0$ 分别产生
$$
g(a)=(\alpha+\gamma)a-\alpha c,\qquad
g(-a)=(\gamma-\alpha)a-\alpha c.
$$
因此在正负两侧，对数方差关于有符号冲击 $z$ 的边际作用分别为
$$
\left.\frac{\partial\log h_t}{\partial z}\right|_{z>0}=\alpha+\gamma,
\qquad
\left.\frac{\partial\log h_t}{\partial z}\right|_{z<0}=\gamma-\alpha.
$$
同幅度正负冲击的差异为 $g(-a)-g(a)=-2\gamma a$。当 $\gamma<0$ 时，该差异为正，负冲击使下一期对数方差高于同幅度正冲击，从而产生杠杆效应；$\alpha$ 控制绝对冲击的共同幅度效应，$\gamma$ 控制正负不对称。

多期预测必须区分对数方差均值与方差均值。记 $m_{t,h}=\mathbb E[\log h_{t+h}\mid\mathcal F_t]$，Jensen 不等式给出
$$
\mathbb E[h_{t+h}\mid\mathcal F_t]
=\mathbb E[\exp(\log h_{t+h})\mid\mathcal F_t]
\ge\exp(m_{t,h}),
$$
非常数条件下通常严格大于。未来冲击的分布会进入指数均值的全部项，不能只预测对数方程再取指数。例如若某期对数方差在给定信息下服从均值 $m$、方差 $s^2$ 的正态分布，则正确的方差预测是 $\exp(m+s^2/2)$，多出的 $s^2/2$ 正体现分布修正。

常见错误是把正、负冲击的边际系数都写成 $\gamma$，把 $\gamma<0$ 误读成任何负冲击都必然降低方差，或把 $\exp(m_{t,h})$ 直接当作 $\mathbb E[h_{t+h}\mid\mathcal F_t]$。另一个错误是为了保证正方差而机械要求所有 EGARCH 参数非负。
## 9. 
当 $r_{t-1}>0$ 时，指示变量为零，下一期方差中平方冲击的系数是 $\alpha$；当 $r_{t-1}<0$ 时，指示变量为一，系数是 $\alpha+\gamma$。因此固定 $h_{t-1}$ 的消息冲击曲线为
$$
h_t=\omega+\beta h_{t-1}+\alpha r_{t-1}^2,\qquad r_{t-1}\ge0,
$$
以及
$$
h_t=\omega+\beta h_{t-1}+(\alpha+\gamma)r_{t-1}^2,\qquad r_{t-1}<0.
$$
通常要求 $\omega>0$、$\alpha,\beta\ge0$ 且 $\alpha+\gamma\ge0$，以保证任意历史冲击下方差非负。

利用 $r_{t-1}^2=h_{t-1}z_{t-1}^2$，可把方程写为
$$
h_t=\omega+\left\{\left[\alpha+\gamma\boldsymbol1_{\{z_{t-1}<0\}}\right]z_{t-1}^2+\beta\right\}h_{t-1}.
$$
创新分布关于零对称时，负冲击部分与正冲击部分的二阶矩各占总二阶矩的一半，所以
$$
\mathbb E\!\left[\boldsymbol1_{\{z_{t-1}<0\}}z_{t-1}^2\right]=\frac12\mathbb E[z_{t-1}^2]=\frac12.
$$
若有限二阶矩平稳解存在，记 $m=\mathbb E[h_t]$，取期望便得到
$$
m=\omega+\left(\alpha+\beta+\frac\gamma2\right)m.
$$
定义平均持续性 $\kappa=\alpha+\beta+\gamma/2$，则与第4题相同的正性论证要求 $\kappa<1$，并且
$$
\mathbb E[h_t]=\operatorname{Var}(r_t)=\frac{\omega}{1-\alpha-\beta-\gamma/2}.
$$
在非负方差约束下，$\kappa<1$ 也使随机系数级数的期望成为几何级数，从而给出有限二阶矩平稳解的构造。

消息冲击曲线的正、负两侧曲率分别为 $2\alpha$ 和 $2(\alpha+\gamma)$。$\gamma>0$ 时负冲击一侧更陡，且 $\gamma$ 越大，杠杆不对称越强；$\gamma<0$ 时正冲击一侧相对更陡，负号冲击的作用被削弱。只要 $\alpha+\gamma\ge0$，较大的 $|\gamma|$ 就扩大同幅度正负冲击的方差反应差异 $\gamma r_{t-1}^2$，但负 $\gamma$ 不能无限减小，否则水平方差可能失去非负性。

常见错误是把负冲击系数写成 $\gamma$ 而非 $\alpha+\gamma$，把平均持续性误写为 $\alpha+\beta+\gamma$，或直接把 $\mathbb E[\boldsymbol1_{\{z<0\}}z^2]$ 当成负号概率与 $\mathbb E[z^2]$ 的乘积。对称性在这里直接给出二阶矩的一半，不需要假设符号与冲击幅度独立。
## 10. 
采用状态创新的通常标准化，即 $\mathbb E[\eta_t]=0$、$\operatorname{Var}(\eta_t)=1$。当 $|\phi_1|<1$ 时，反复迭代状态方程得到平稳表示
$$
s_t=\frac{\phi_0}{1-\phi_1}+\sigma_\eta\sum_{j=0}^{\infty}\phi_1^j\eta_{t-j}.
$$
由于各期 $\eta_t$ 独立同分布，均值为零、方差为一，几何级数绝对收敛，故
$$
\mathbb E[s_t]=\frac{\phi_0}{1-\phi_1},\qquad
\operatorname{Var}(s_t)=\sigma_\eta^2\sum_{j=0}^{\infty}\phi_1^{2j}
=\frac{\sigma_\eta^2}{1-\phi_1^2}.
$$
也可以直接对平稳状态方程取均值和方差得到同样结果，但级数表示同时说明了为何需要 $|\phi_1|<1$。

由 $r_t-\mu=\exp(s_t/2)\varepsilon_t$，先取绝对值再取对数，得到
$$
y_t=\log(r_t-\mu)^2=s_t+\log\varepsilon_t^2.
$$
再定义 $c_\varepsilon=\mathbb E[\log\varepsilon_t^2]$ 和 $\xi_t=\log\varepsilon_t^2-c_\varepsilon$，便有线性观测方程
$$
y_t=c_\varepsilon+s_t+\xi_t,\qquad \mathbb E[\xi_t]=0.
$$
它与状态方程共同构成“潜在状态加观测噪声”的形式，且 $\xi_t$ 与状态创新相互独立。

若 $\varepsilon_t$ 为标准正态，则 $\varepsilon_t^2$ 服从一个自由度的卡方分布，因而 $\log\varepsilon_t^2$ 服从对数卡方分布，而不是正态分布。此时 $c_\varepsilon=-(\gamma_E+\log2)$，其中 $\gamma_E$ 为 Euler 常数，且 $\operatorname{Var}(\xi_t)=\pi^2/2$。该分布在接近零的收益处特别敏感，并具有明显偏态；用具有相同均值和方差的高斯噪声替代，只能得到线性高斯近似或准似然，不能还原真实条件密度。若 $\varepsilon_t$ 本身为厚尾或偏斜分布，观测噪声的常数和分布也都要改变。

普通卡尔曼滤波要求线性状态、线性观测以及高斯创新，或只给出线性高斯意义下的最优滤波。这里的原始观测对 $s_t$ 是指数方差关系，对数化后虽然线性，却仍为非高斯噪声。粒子滤波用带权粒子近似 $p(s_t\mid y_1,\ldots,y_t)$，通过状态传播、按真实观测密度加权和重采样，处理非线性与非高斯性。常见错误是把 $\log\varepsilon_t^2$ 当作零均值高斯项、漏掉常数 $c_\varepsilon$，或把状态方差的分母误写为 $1-\phi_1$。
## 11. 
GARCH 的方差状态在给定初值、参数和过去收益后可递推重现。例如
$$
h_t=\omega+\alpha r_{t-1}^2+\beta h_{t-1}
$$
中的每一项都已知，所以 $h_t$ 是过去观测的确定函数。模型唯一的当期创新来源通常是 $z_t$，条件密度直接为 $h_t^{-1/2}f_z(r_t/\sqrt{h_t})$，条件似然可由各期密度相乘得到。标准 GARCH$(1,1)$ 的严格平稳由随机系数的对数收缩条件控制；杠杆效应则通过 GJR 的负冲击指示项或 EGARCH 的有符号冲击项直接进入可观测递推。

随机波动率模型的 $s_t$ 自身由独立状态创新推动，不能由一条历史收益唯一反解。即使参数完全已知，观测 $r_t$ 也只提供关于 $s_t$ 的含噪信息，必须计算滤波分布 $p(s_t\mid\mathcal F_t)$ 并递推预测、更新。其创新通常同时包括收益创新与波动率状态创新，似然需要对所有潜在状态积分，往往只能借助粒子滤波、拉普拉斯近似或模拟方法。在线性高斯状态情形下，严格平稳主要由状态持续性参数控制，例如自回归系数绝对值小于一；杠杆效应则常由收益创新与未来或同期状态创新的相关来刻画，而不是由收益符号的确定函数来刻画。

样本外比较时，每个预测原点都必须冻结当时可得的信息集。两类模型应使用相同的数据截止时间和数据版本、相同的估计窗口或扩展窗口、相同的参数更新频率与预测期限，并且所有超参数、分布选择、初值和滤波设置只能按当时信息确定。GARCH 不能在预测前用全样本估计方差初值，随机波动率也不能使用未来观测平滑状态；若比较的是一步滤波预测，就不能把利用全样本得到的平滑状态当作实时状态。已实现波动率代理、交易价格和可交易资产范围也应采用同一口径。

常见错误是把随机波动率状态视为已知参数而非随机变量，把平滑预测与实时滤波预测混为一谈，或让一类模型逐期重估而让另一类模型使用事后调参。这样的比较不仅模型不同，信息集也不同，所得排名不能归因于模型本身。
## 12. 
**证明**
候选预测 $h_t$ 与真实条件方差 $h_{0,t}$ 均为 $\mathcal F_t$ 可测且严格为正。利用代理变量的条件无偏性，候选预测的条件期望损失为
$$
\mathbb E[\ell(h_t,y_{t+1})\mid\mathcal F_t]
=\log h_t+\frac{\mathbb E[y_{t+1}\mid\mathcal F_t]}{h_t}
=\log h_t+\frac{h_{0,t}}{h_t}.
$$
真实预测对应的条件期望损失为 $\log h_{0,t}+1$。两式相减并令 $x=h_t/h_{0,t}>0$，得到
$$
\Delta_t(h_t)=\log\frac{h_t}{h_{0,t}}+\frac{h_{0,t}}{h_t}-1
=\log x+\frac1x-1.
$$
定义 $\psi(x)=\log x+1/x-1$，则
$$
\psi'(x)=\frac1x-\frac1{x^2}=\frac{x-1}{x^2}.
$$
当 $0<x<1$ 时导数为负，当 $x>1$ 时导数为正，故 $\psi$ 在 $x=1$ 处取得唯一全局最小值。并且 $\psi(1)=0$，所以 $\Delta_t(h_t)\ge0$，等号当且仅当 $h_t=h_{0,t}$。这证明 QLIKE 对条件方差真值具有严格 proper 的排序性质。

以含噪已实现波动率替代 $r_{t+1}^2$ 时，首先要使代理与预测目标具有相同期限和同一方差定义，并在包含候选预测信息的 $\mathcal F_t$ 下满足 $\mathbb E[y_{t+1}\mid\mathcal F_t]=h_{0,t}$。还需保证相关期望有限、$h_t>0$，以及所有模型面对同一个代理和同一评价样本。这样代理噪声只出现在期望损失的 $h_{0,t}/h_t$ 项中，其具体分布在总体条件期望差里消失，并不要求代理无噪声。

有限样本排序还需足够的大样本、矩和依赖条件，使样本平均损失差稳定估计总体差。若已实现测度含有随波动变化的微观结构偏差、只测得日内积分方差而目标是收盘到收盘方差，或不同模型使用不同信息集，条件无偏性或共同目标就可能失效。此时即使样本损失较低，也不能断言真实方差预测更好。

常见错误是把某个含噪 $y_{t+1}$ 当作已知的 $h_{0,t}$ 代入最优性证明，或声称代理噪声越大越不影响任何有限样本检验。总体 QLIKE 排序只依赖条件均值，但估计误差、检验方差和有限样本排名仍会受噪声影响。
□
## 13. 
**证明**
令 $q_{ii,t}$ 为 $\boldsymbol Q_t$ 的第 $i$ 个对角元，并定义
$$
\boldsymbol S_t=\operatorname{diag}(\sqrt{q_{11,t}},\ldots,\sqrt{q_{NN,t}}),\qquad
\boldsymbol R_t=\boldsymbol S_t^{-1}\boldsymbol Q_t\boldsymbol S_t^{-1}.
$$
正定性保证 $q_{ii,t}>0$，故该变换有定义。对任意 $\boldsymbol x\ne\boldsymbol0$，令 $\boldsymbol u=\boldsymbol S_t^{-1}\boldsymbol x\ne\boldsymbol0$，则
$$
\boldsymbol x^\top\boldsymbol R_t\boldsymbol x
=\boldsymbol u^\top\boldsymbol Q_t\boldsymbol u>0.
$$
所以 $\boldsymbol R_t$ 对称正定；其第 $i$ 个对角元为 $q_{ii,t}/(\sqrt{q_{ii,t}}\sqrt{q_{ii,t}})=1$，因而确实是以相关系数为非对角元的相关矩阵。

记 $\boldsymbol H_t=\boldsymbol D_t\boldsymbol R_t\boldsymbol D_t$，$\boldsymbol z_t=\boldsymbol D_t^{-1}\boldsymbol r_t$。高斯对数似然为
$$
\ell_t=-\frac12\left[N\log(2\pi)+\log|\boldsymbol H_t|+\boldsymbol r_t^\top\boldsymbol H_t^{-1}\boldsymbol r_t\right].
$$
利用 $|\boldsymbol H_t|=|\boldsymbol D_t|^2|\boldsymbol R_t|$ 以及 $\boldsymbol r_t^\top\boldsymbol H_t^{-1}\boldsymbol r_t=\boldsymbol z_t^\top\boldsymbol R_t^{-1}\boldsymbol z_t$，可分解为 $\ell_t=\ell_{u,t}+\ell_{c,t}$，其中
$$
\ell_{u,t}=-\frac N2\log(2\pi)-\log|\boldsymbol D_t|-\frac12\boldsymbol z_t^\top\boldsymbol z_t,
$$
$$
\ell_{c,t}=-\frac12\left[\log|\boldsymbol R_t|+\boldsymbol z_t^\top\boldsymbol R_t^{-1}\boldsymbol z_t-\boldsymbol z_t^\top\boldsymbol z_t\right].
$$
第一项恰为各单变量高斯似然之和。两阶段估计先拟合各资产的均值和方差方程，再固定这些参数、$\boldsymbol D_t$ 及标准化残差 $\boldsymbol z_t$，第二阶段只用 $\ell_{c,t}$ 估计相关动态参数。

DCC 递推写为
$$
\boldsymbol Q_t=(1-a-b)\overline{\boldsymbol Q}
+a\boldsymbol z_{t-1}\boldsymbol z_{t-1}^\top+b\boldsymbol Q_{t-1}.
$$
若 $a,b\ge0$、$a+b<1$，且 $\mathbb E[\boldsymbol z_t\boldsymbol z_t^\top]=\overline{\boldsymbol Q}$，对平稳解取期望并记 $\boldsymbol M=\mathbb E[\boldsymbol Q_t]$，得到
$$
\boldsymbol M=(1-a-b)\overline{\boldsymbol Q}+(a+b)\boldsymbol M.
$$
因为 $1-a-b>0$，整理即得 $\boldsymbol M=\overline{\boldsymbol Q}$。目标化以样本无条件协方差代替大量待估截距参数，只保留共同的 $a,b$，但代价是所有相关对共享消息反应与持续速度，且目标矩阵估计误差会传入相关预测。

常见错误是用 $q_{ii,t}^{-1}$ 而非平方根倒数标准化、漏掉相关似然中的 $-\boldsymbol z_t^\top\boldsymbol z_t$ 调整项，或把 $\mathbb E[\boldsymbol Q_t]=\overline{\boldsymbol Q}$ 误解为每期 $\boldsymbol Q_t$ 和 $\boldsymbol R_t$ 都恒定。
□
## 14. 
先记未加杠杆的内部组合预测波动率为
$$
s_t=\sqrt{\boldsymbol b_t^\top\boldsymbol H_{t+1\mid t}\boldsymbol b_t}>0.
$$
再平衡后风险资产权重为 $\boldsymbol w_t=\ell_t\boldsymbol b_t$，故预测方差为 $\ell_t^2s_t^2$，预测波动率为
$$
\sqrt{\boldsymbol w_t^\top\boldsymbol H_{t+1\mid t}\boldsymbol w_t}
=\ell_ts_t=\min\{L_{\max}s_t,\sigma^*\}.
$$
未触及杠杆上限时等于 $\sigma^*$；触及上限时为 $L_{\max}s_t$，只能低于目标波动率。

设再平衡前财富为 $W_t^-$，交易后财富为 $W_t^+$，目标风险资产持仓金额为 $\boldsymbol q_t=W_t^+\ell_t\boldsymbol b_t$。令 $\widetilde{\boldsymbol q}_t$ 为上一期持仓按本期再平衡前价格计值后的金额向量，则风险资产单边成交额及比例交易成本为
$$
D_t=\sum_{i=1}^{N}|q_{i,t}-\widetilde q_{i,t}|,\qquad
C_t=\sum_{i=1}^{N}c_{i,t}|q_{i,t}-\widetilde q_{i,t}|,
$$
其中 $c_{i,t}$ 是单位成交额成本。若成本率相同，则 $C_t=c_tD_t$。为单独展示权重变化，暂忽略期间价格漂移并采用同一财富基准 $W$，则
$$
D_t=W\sum_{i=1}^{N}|\ell_tb_{i,t}-\ell_{t-1}b_{i,t-1}|.
$$
内部权重不变，即 $\boldsymbol b_t=\boldsymbol b_{t-1}=\boldsymbol b$ 时，进一步化为
$$
D_t=W|\ell_t-\ell_{t-1}|\sum_{i=1}^{N}|b_i|.
$$
内部权重变化时不能提取单一杠杆差，必须逐项比较新旧目标金额。实际计算仍应使用含价格漂移的 $\widetilde{\boldsymbol q}_t$，因为即使目标内部权重不变，不同资产收益也会使持仓偏离目标。

交易成本在成交时从财富中扣除，即 $W_t^+=W_t^--C_t$。融资或现金头寸为 $B_t=W_t^+-\boldsymbol1^\top\boldsymbol q_t$；若 $\boldsymbol1^\top\boldsymbol b_t=1$，它就等于 $W_t^+(1-\ell_t)$。下一期再平衡前财富满足
$$
W_{t+1}^-=\boldsymbol q_t^\top(\boldsymbol1+\boldsymbol r_{t+1})+B_t(1+\rho_t),
$$
其中 $B_t\ge0$ 时 $\rho_t$ 为现金利率，$B_t<0$ 时 $\rho_t$ 为融资利率。杠杆上限通过 $\ell_t\le L_{\max}$ 限制 $\boldsymbol q_t$ 和借款规模，而不是额外出现在一个与持仓无关的收益率项中。

成本取决于换手、价格路径和交易时点，是财富收益的直接扣减；目标波动率则是风险敞口的尺度约束。把成本从 $\sigma^*$ 中等比例扣除既不能得到正确的净收益，也不能恢复正确成交额。常见错误是只计算杠杆变化而漏掉内部调仓、忽略借款利率高于现金利率，或在自融资方程外重复扣一次交易成本。
## 15. 
令 $Z\sim N(0,1)$，下一日收益写成 $r=\mu+\sigma Z$，货币损失为
$$
L=-Vr=-V\mu+V\sigma X,\qquad X=-Z\sim N(0,1).
$$
记 $z_p=\Phi^{-1}(p)$、$\phi$ 为标准正态密度、$\alpha=1-p$。由于 $L$ 是 $X$ 的严格增函数，其 $p$ 分位数即
$$
\operatorname{VaR}_p=V(-\mu+\sigma z_p).
$$
在连续分布下，ES 是超过该分位数的条件平均损失。利用 $\int_{z_p}^{\infty}\phi(x)\,dx=\alpha$ 和 $\int_{z_p}^{\infty}x\phi(x)\,dx=\phi(z_p)$，得到
$$
\begin{aligned}
\operatorname{ES}_p
&=\frac1\alpha\int_{z_p}^{\infty}V(-\mu+\sigma x)\phi(x)\,dx\\
&=V\left[-\mu+\sigma\frac{\phi(z_p)}{1-p}\right].
\end{aligned}
$$
这里密度项来自 $x\phi(x)=-\phi'(x)$，不是把分布函数 $\Phi$ 代入尾积分。

代入 $V=5{,}000{,}000$、$\mu=-0.0004$、$\sigma=0.018$、$p=0.99$，有 $z_{0.99}=2.326347874$、$\phi(z_{0.99})=0.0266521422$，所以
$$
\operatorname{VaR}_{0.99}
=5{,}000{,}000(0.0004+0.018\times2.326347874)
\approx211{,}371.31,
$$
$$
\operatorname{ES}_{0.99}
=5{,}000{,}000\left(0.0004+0.018\times\frac{0.0266521422}{0.01}\right)
\approx241{,}869.28.
$$
其中均值对损失的贡献均为 $-V\mu=2{,}000$，其余部分是波动率贡献。

若固定权益而风险敞口扩大一倍，忽略新增融资成本，则收益均值和标准差分别变为 $2\mu$、$2\sigma$。因此 VaR 与 ES 中的均值项由 $-V\mu$ 变为 $-2V\mu$，波动率项也分别变为 $2V\sigma z_p$ 和 $2V\sigma\phi(z_p)/(1-p)$；本题两项同倍变化，所以两个风险度量都扩大一倍。常见错误是把均值项写成 $+V\mu$、用 $\phi(z_p)/p$ 计算 ES，或把 VaR 与 ES 定义为收益分位数却没有转换成货币损失。
## 16. 
标准化 Student-t 密度关于零对称，故 $X=-z$ 与 $z$ 同分布。损失可写为
$$
L=-Vr=-V\mu+V\sqrt hX.
$$
当 $p>1/2$ 时 $q_{\nu,p}>0$，其 $p$ 分位数为
$$
\operatorname{VaR}_p=V(-\mu+\sqrt h\,q_{\nu,p}).
$$
令 $\alpha=1-p$，则 ES 需要计算
$$
\operatorname{ES}_p=-V\mu+V\sqrt h\,\mathbb E[X\mid X\ge q_{\nu,p}]
=-V\mu+\frac{V\sqrt h}{\alpha}\int_{q_{\nu,p}}^{\infty}xf_\nu(x)\,dx.
$$

记 $C_\nu=\Gamma((\nu+1)/2)/[\Gamma(\nu/2)\sqrt{(\nu-2)\pi}]$。用代换 $u=1+x^2/(\nu-2)$，有 $x\,dx=(\nu-2)\,du/2$，从而
$$
\begin{aligned}
\int_q^{\infty}xf_\nu(x)\,dx
&=C_\nu\frac{\nu-2}{2}\int_{1+q^2/(\nu-2)}^{\infty}u^{-(\nu+1)/2}\,du\\
&=\frac{C_\nu(\nu-2)}{\nu-1}
\left(1+\frac{q^2}{\nu-2}\right)^{-(\nu-1)/2}\\
&=\frac{\nu-2+q^2}{\nu-1}f_\nu(q).
\end{aligned}
$$
积分收敛要求 $(\nu-1)/2>0$，即尾部均值存在要求 $\nu>1$；本题为保证方差标准化已设 $\nu>2$，所以 ES 必然有限。把 $q=q_{\nu,p}$ 代回，得到闭式
$$
\operatorname{ES}_p
=V\left[-\mu+\sqrt h\,\frac{\nu-2+q_{\nu,p}^2}{(\nu-1)(1-p)}f_\nu(q_{\nu,p})\right].
$$
这里的 $f_\nu$ 必须是题给方差为一的密度，$q_{\nu,p}$ 也必须来自同一分布，否则尺度项与尾积分不一致。

若 $t_{\nu,p}$ 是普通 Student-t 的分位数，则标准化分位数满足
$$
q_{\nu,p}=\sqrt{\frac{\nu-2}{\nu}}\,t_{\nu,p}.
$$
经过这一正确转换，两种计算完全等价；若直接把普通分位数乘以 $\sqrt h$ 而不再转换，波动率项会被人为放大 $\sqrt{\nu/(\nu-2)}$ 倍，VaR 和 ES 都相应偏高。常见错误是把尾积分误算成密度本身、把分母 $\nu-1$ 写成 $\nu-2$，或混用普通 t 分位数与标准化密度。
## 17. 
令真实例外概率为 $\pi$。覆盖率原假设为 $H_0:\pi=\alpha$，无约束备择为 $\pi\ne\alpha$。在原假设与无约束模型下，似然分别为
$$
L_0=(1-\alpha)^{T-x}\alpha^x,\qquad
L_1=(1-\pi)^{T-x}\pi^x.
$$
无约束最大似然估计为 $\widehat\pi=x/T$，所以最大化备择似然为 $(1-\widehat\pi)^{T-x}\widehat\pi^x$。于是
$$
\begin{aligned}
LR_{\mathrm{uc}}
&=-2\log\frac{(1-\alpha)^{T-x}\alpha^x}{(1-\widehat\pi)^{T-x}\widehat\pi^x}\\
&=2\left[x\log\frac{\widehat\pi}{\alpha}
+(T-x)\log\frac{1-\widehat\pi}{1-\alpha}\right].
\end{aligned}
$$
无约束模型比原假设多一个概率参数，故常规内点情形下渐近分布为 $\chi_1^2$；似然比越大越不利于原假设，只在上尾拒绝。

当 $T=1000$、$\alpha=0.01$、$x=17$ 时，$\widehat\pi=0.017$，并且
$$
LR_{\mathrm{uc}}
=2\left[17\log\frac{0.017}{0.01}+983\log\frac{0.983}{0.99}\right]
\approx4.09097.
$$
它大于 $\chi_1^2$ 的 $5\%$ 临界值 $3.84146$，故在 $5\%$ 水平拒绝无条件覆盖率为 $1\%$ 的原假设，渐近 $p$ 值约为 $0.043$；但它小于 $1\%$ 临界值 $6.63490$，所以在 $1\%$ 水平不拒绝。

不依赖卡方近似时，利用原假设下的精确分布 $X\sim\operatorname{Binomial}(1000,0.01)$。若备择预先指定为例外过多，精确上尾 $p$ 值为
$$
\mathbb P(X\ge17)=\sum_{k=17}^{1000}\binom{1000}{k}0.01^k0.99^{1000-k}.
$$
双侧检验可事先采用概率排序法，把所有满足 $\mathbb P(X=k)\le\mathbb P(X=17)$ 的 $k$ 所对应概率相加，也可通过等尾二项精确置信区间的反演作检验；离散性使不同约定不一定得到相同 $p$ 值，不能事后挑选有利结果。常见错误是把 $x=17$ 直接当作 $\widehat\pi$、使用下尾拒绝，或在边界和稀疏计数下仍机械相信卡方近似。
## 18. 
**证明**
以相邻状态为条件并省略初始状态的固定因子。记行总数 $n_{i\cdot}=n_{i0}+n_{i1}$，列总数 $n_{\cdot j}=n_{0j}+n_{1j}$，总转移数 $n=n_{0\cdot}+n_{1\cdot}$。在独立一阶马尔可夫备择下，两行分别有例外概率 $\pi_0,\pi_1$，似然为
$$
L_M(\pi_0,\pi_1)=\prod_{i=0}^{1}(1-\pi_i)^{n_{i0}}\pi_i^{n_{i1}},
$$
故 $\widehat\pi_i=n_{i1}/n_{i\cdot}$。独立性原假设要求 $\pi_0=\pi_1=\pi$，合并 Bernoulli 链的似然为
$$
L_B(\pi)=(1-\pi)^{n_{\cdot0}}\pi^{n_{\cdot1}},
$$
其估计为 $\widehat\pi=n_{\cdot1}/n$。因此
$$
LR_{\mathrm{ind}}
=2\left[\sum_{i=0}^{1}\sum_{j=0}^{1}n_{ij}\log\frac{n_{ij}}{n_{i\cdot}}
-\sum_{j=0}^{1}n_{\cdot j}\log\frac{n_{\cdot j}}{n}\right],
$$
等价于 $2\sum_{i,j}n_{ij}\log[(n_{ij}/n_{i\cdot})/(n_{\cdot j}/n)]$。它检验例外状态是否还依赖上一期状态，常规内点情形渐近服从 $\chi_1^2$ 并在上尾拒绝。

条件覆盖原假设同时要求独立性和共同例外概率等于给定 $\alpha$。其原假设似然为 $L_C(\alpha)=(1-\alpha)^{n_{\cdot0}}\alpha^{n_{\cdot1}}$，无约束备择仍为 $L_M(\widehat\pi_0,\widehat\pi_1)$。把 $x=n_{\cdot1}$、$T=n$ 代入第17题，并令 $L_B(\widehat\pi)$ 为无约束合并 Bernoulli 似然，就有
$$
\frac{L_C(\alpha)}{L_M(\widehat\pi_0,\widehat\pi_1)}
=\frac{L_C(\alpha)}{L_B(\widehat\pi)}\times
\frac{L_B(\widehat\pi)}{L_M(\widehat\pi_0,\widehat\pi_1)}.
$$
两边取 $-2\log$，立得
$$
LR_{\mathrm{cc}}=LR_{\mathrm{uc}}+LR_{\mathrm{ind}}.
$$
条件覆盖比两个分项的原假设多限制一个共同概率和一个转移差异，故渐近自由度为 $2$；$LR_{\mathrm{uc}}$ 与 $LR_{\mathrm{ind}}$ 各为 $1$。若原始覆盖率检验使用全部收益而转移检验只用 $T-1$ 对相邻观测，精确分解必须改用相同样本，或把初始状态的似然因子明确纳入，不能直接相加不同分母的统计量。

没有例外、没有非例外或某一转移行没有观测时，采用 $0\log0=0$ 的连续极限；$n_{i\cdot}=0$ 的整行没有似然贡献，应省略而不是任意指定 $\widehat\pi_i$。在 $\widehat\pi$ 或 $\widehat\pi_i$ 位于零、一边界时，参数不在正则内点，稀疏转移也会破坏卡方近似，应使用精确条件检验或按原假设模拟分布。常见错误是把 $n_{ij}$ 的先后方向颠倒、把独立性自由度写成 $2$，或在全为零的单元格中直接计算对数而不作上述处理。
□
## 19. 
**证明**
固定 $t$，令 $\mathcal F_t$ 包含预测时可用的全部信息，$F_t(x)=\mathbb P(r_{t+1}\le x\mid\mathcal F_t)$。对 $0<u<1$，定义广义逆 $q_t(u)=\inf\{x:F_t(x)\ge u\}$。连续性给出 $F_t(q_t(u))=u$，且分布函数取常数值的平坦区间没有概率质量。因此
$$
\{r_{t+1}\le q_t(u)\}\subset\{U_{t+1}\le u\}
\subset\{r_{t+1}\le q_t(u)\}\cup\{F_t(r_{t+1})=u,\ r_{t+1}>q_t(u)\},
$$
最后一个事件的条件概率为零，故
$$
\mathbb P(U_{t+1}\le u\mid\mathcal F_t)=F_t(q_t(u))=u.
$$
端点事件的概率也为零，取无条件期望便知 $U_{t+1}$ 服从 $(0,1)$ 均匀分布。

进一步，若 $F_t$ 正确描述的是给定全部既往观测的条件分布，而不只是某期的边缘分布，则既往概率积分变换都属于 $\mathcal F_t$。于是对每个 $u_{t+1}\in(0,1)$，
$$
\mathbb P(U_{t+1}\le u_{t+1}\mid U_1,\ldots,U_t)=u_{t+1}.
$$
对 $n$ 归纳，先以 $U_1,\ldots,U_{n-1}$ 为条件，再利用上式，得到
$$
\mathbb P\left(\bigcap_{j=1}^{n}\{U_j\le u_j\}\right)
=\prod_{j=1}^{n}u_j,
$$
所以整个序列相互独立且同分布。若 $F_t$ 漏掉仍含预测信息的滞后变量，这一条件均匀性不成立，不能仅凭各期分别均匀就断言独立。

均匀性检验发现的是变换值的边际错配，例如条件均值、尺度、偏度或尾部形状错误；独立性检验则发现均匀序列中残留的动态结构，例如波动率聚集、遗漏滞后项或条件分布随信息集变化。直方图平坦只检查有限个区间内的总频数。把一个独立均匀序列按波动状态重新排列，可以完全保留直方图却产生很强的序列依赖，因此仍须检验 $U_{t+1}$ 及其适当函数的自相关、条件均值和条件分布。

若分布在 $x$ 处有跳跃，记 $a=F_t(x-)$、$b=F_t(x)$、$p=b-a>0$，确定性的 $F_t(r_{t+1})$ 会以概率 $p$ 固定在 $b$，不可能均匀。应抽取与收益及既往信息独立的 $V_{t+1}\sim U(0,1)$，在该跃点取 $U_{t+1}=a+V_{t+1}p$。对纯离散分布的相邻原子，若 $u\in[a_k,b_k]$，则
$$
\mathbb P(U_{t+1}\le u\mid\mathcal F_t)
=\sum_{j<k}p_j+\frac{u-a_k}{b_k-a_k}p_k=a_k+(u-a_k)=u.
$$
混合分布在连续部分沿用 $F_t(r_{t+1})$，在每个原子处作上述随机化，把两部分按分布测度相加仍得到同一结论。常见错误是把无条件分布函数当作 $F_t$、把边际均匀等同于独立，或对离散数据直接使用确定性变换后强行作连续均匀检验。

□
## 20. 
记 $\delta=\mathbb E[d_t]$、$\bar d=T^{-1}\sum_{t=1}^{T}d_t$，协方差平稳性给出
$$
\gamma_k=\operatorname{Cov}(d_t,d_{t-k})=\gamma_{-k}.
$$
由协方差双线性并合并相距同为 $k$ 的项，
$$
\begin{aligned}
\operatorname{Var}(\sqrt T\,\bar d)
&=\frac1T\sum_{t=1}^{T}\sum_{s=1}^{T}\operatorname{Cov}(d_t,d_s)\\
&=\gamma_0+\frac1T\sum_{k=1}^{T-1}(T-k)(\gamma_k+\gamma_{-k})\\
&=\gamma_0+2\sum_{k=1}^{T-1}\left(1-\frac{k}{T}\right)\gamma_k .
\end{aligned}
$$
这里含 $k$ 的因子来自每一距离只有 $T-k$ 对观测，而不是额外假设。若混合条件足以保证 $\sum_{k=-\infty}^{\infty}|\gamma_k|<\infty$ 及中心极限定理成立，控制收敛给出
$$
\Omega=\lim_{T\to\infty}\operatorname{Var}(\sqrt T\,\bar d)
=\sum_{k=-\infty}^{\infty}\gamma_k
=\gamma_0+2\sum_{k=1}^{\infty}\gamma_k,
\qquad
\sqrt T(\bar d-\delta)\xrightarrow{d}N(0,\Omega).
$$
在等预测精度原假设 $\delta=0$ 下，Diebold–Mariano 统计量为
$$
DM=\frac{\bar d}{\sqrt{\widehat\Omega/T}}
=\frac{\sqrt T\,\bar d}{\sqrt{\widehat\Omega}},
$$
其中 $\widehat\Omega$ 为一致的长期方差估计，渐近采用标准正态临界值，双侧检验对应两个方向。因 $d_t$ 定义为 A 减 B，显著正值表示 A 的损失更大。

常用的 HAC 估计为
$$
\widehat\gamma_k=\frac1T\sum_{t=k+1}^{T}(d_t-\bar d)(d_{t-k}-\bar d),\qquad
\widehat\Omega=\widehat\gamma_0+2\sum_{k=1}^{L}w_k\widehat\gamma_k,
$$
例如 Bartlett 权重 $w_k=1-k/(L+1)$。权重和截尾阶数须随样本量按一致估计所需规则选取，不能把 $\widehat\gamma_0$ 当作长期方差。

一步且完全不重叠的预测，在正确模型和理想条件下，其预测误差常具有鞅差结构，但损失差还会受状态估计、参数更新和条件分布影响，故仍应检查自相关，而非机械使用独立同分布标准误。$h$ 步重叠预测在相邻起点之间共享未来实现值；在理想有限记忆情形下，损失差呈至多 $h-1$ 阶相关，可使用至少覆盖该阶数的 HAC 标准误。若损失本身有更持久动态，则不能硬性在 $h-1$ 阶截断。隔 $h$ 期抽取非重叠样本是另一种办法，但会改变样本量与统计功效。

同时筛查大量模型时，即使每次检验的名义水平正确，至少出现一次假胜出的概率也会随比较次数增加，最终报告的最优模型还带有选择偏差。模型置信集通过逐步剔除显著劣者构造以给定置信度包含优者的集合；现实检查直接检验所有候选相对基准的最大优异度；SPA 进一步处理候选表现差异及数据依赖。实施时通常以块自助法保留时间相关和跨模型相关。常见错误是用 $\bar d$ 的普通样本标准差替代 $\Omega$、在 $\sqrt T$ 与 $T$ 的标准化中重复除以样本量、把重叠损失当独立观测，以及对数十次单独 DM 检验不作任何多重比较校正。
## 21. 
按式（29.32）的现金流方向，忽略已知的合约名义乘数，空头方差互换在到期时收到隐含方差并支付已实现方差，故
$$
\Pi^{S}_{t,t+\tau}=K_{t,\tau}^{2}-RV_{t,t+\tau}.
$$
这两项均在签约时确定了定义，$K_{t,\tau}^{2}$ 属于 $\mathcal F_t$，而 $RV_{t,t+\tau}$ 是到期才观测的随机变量。因此在物理测度下
$$
\mathbb E^{\mathbb P}[\Pi^{S}_{t,t+\tau}\mid\mathcal F_t]
=K_{t,\tau}^{2}-\mathbb E^{\mathbb P}[RV_{t,t+\tau}\mid\mathcal F_t].
$$
若采用标准的无套利方差互换定价，零初始价值的多头现金流为 $RV_{t,t+\tau}-K_{t,\tau}^{2}$，在已知贴现因子下定价核期望值给出公平执行价 $K_{t,\tau}^{2}=\mathbb E^{\mathbb Q}[RV_{t,t+\tau}\mid\mathcal F_t]$。于是
$$
\mathbb E^{\mathbb P}[\Pi^{S}_{t,t+\tau}\mid\mathcal F_t]
=\mathbb E^{\mathbb Q}[RV_{t,t+\tau}\mid\mathcal F_t]
-\mathbb E^{\mathbb P}[RV_{t,t+\tau}\mid\mathcal F_t].
$$
把方差溢价定义为 $\lambda_{t,\tau}=K_{t,\tau}^{2}-\mathbb E^{\mathbb P}[RV_{t,t+\tau}\mid\mathcal F_t]$，空头条件期望收益恰为 $\lambda_{t,\tau}$；若把溢价反向定义为物理均值减隐含方差，则其期望收益为该溢价的相反数。故溢价由正变负时，空头由期望盈利变为期望亏损，溢价为零时期望收益为零；不能把“空头”二字本身当成必然负收益。

若隐含方差恰好等于条件物理均值，令
$$
\varepsilon_{t+\tau}=RV_{t,t+\tau}-K_{t,\tau}^{2},
$$
则 $\mathbb E^{\mathbb P}[\varepsilon_{t+\tau}\mid\mathcal F_t]=0$。题设回归的条件均值因而满足
$$
a+bK_{t,\tau}^{2}+\mathbb E^{\mathbb P}[e_{t+\tau}\mid\mathcal F_t]
=K_{t,\tau}^{2}.
$$
取 $e_{t+\tau}=\varepsilon_{t+\tau}$，并要求隐含方差在样本中有非退化变动，比较其系数与常数项即得识别限制
$$
a=0,\qquad b=1,\qquad \mathbb E^{\mathbb P}[K_{t,\tau}^{2}e_{t+\tau}]=0.
$$
最后一式是 $K_{t,\tau}^{2}$ 为 $\mathcal F_t$ 可测变量及条件误差均值为零的结果。若执行价在样本中恒定，只能识别 $a+bK^2$，不能分别识别两个参数；仅有无条件均值相等也不足以推出上述斜率限制。

风险溢价时变时，写 $K_{t,\tau}^{2}=\mu_{t,\tau}+\lambda_{t,\tau}$，其中 $\mu_{t,\tau}$ 为物理条件均值，则 $RV_{t,t+\tau}=K_{t,\tau}^{2}-\lambda_{t,\tau}+\varepsilon_{t+\tau}$。若遗漏 $\lambda_{t,\tau}$，普通最小二乘斜率的概率极限为
$$
b^*=\frac{\operatorname{Cov}(K_{t,\tau}^{2},RV_{t,t+\tau})}{\operatorname{Var}(K_{t,\tau}^{2})}
=1-\frac{\operatorname{Cov}(K_{t,\tau}^{2},\lambda_{t,\tau})}{\operatorname{Var}(K_{t,\tau}^{2})},
$$
所以溢价与隐含方差相关会造成遗漏变量偏误，方向由该协方差决定；恒定非零溢价主要进入截距而非自动改变斜率。

若只能观测 $\widetilde{RV}=RV+\eta$，且 $\eta$ 均值为零并与执行价及原误差无关，斜率仍一致，但残差方差增大、标准误上升且检验功效下降；相关测度误差会进一步偏斜斜率，执行价本身含误差时也不能沿用上述结论。期限重叠使相邻回归误差共享未来已实现收益，可能还共享参数估计冲击，故误差有序列相关。标准误应使用覆盖重叠阶数并顾及剩余持续性的 HAC 估计，或采用保留时间依赖的块自助法。常见错误是颠倒多空现金流与溢价符号、把无条件无偏当作 $a=0,b=1$ 的充分条件，以及对重叠期限仍报告独立同分布标准误。
## 22. 
研究开始前应固定资产池、收益口径、预测期限、风险水平、基准模型、样本外区间和主评价指标。原始价格须按当时可知的分红、拆并和合约换月信息调整，统一交易时区并处理停牌与缺失值；任何清洗阈值和资产纳入规则都不得利用未来收益。以 $\mathcal F_t$ 表示时点 $t$ 收盘后实际可用的信息，主方案采用长度 $W$ 的滚动窗口，并以从初始样本起不断增加的扩展窗口作为事前规定的稳健性方案。训练、验证和最终测试区间按时间顺序隔开，模型阶数、分布备选和调参规则只在训练及验证段确定，测试段不得反复查看后修改方案。

在每个预测起点，仅用滚动窗口内的数据重估参数，更新频率也预先固定。高斯 GARCH 使用标准化正态创新，Student-t GJR 使用方差为一的标准化 $t$ 创新并在估计中约束 $\nu>2$，二者采用相同均值方程。随机波动率模型采用高斯对数方差状态方程及事先选定的收益创新分布，以粒子滤波向前更新状态；预测只能使用滤波分布，不能使用含有未来观测的平滑状态。DCC 方案先估计各资产边际波动，再由标准化残差估计动态相关矩阵，相关目标化参数同样只在训练窗口估计。四类模型都必须给出同一组合、同一期限的条件方差和完整预测分布；前三类可直接对既定内部权重的组合收益建模，DCC 则对资产向量建模后聚合，以保证风险决策的对象一致。每次保存预测时间戳、可用信息截止时点、参数、预测分布和随后的实现值。

方差预测使用 QLIKE。若 $h_t$ 是条件方差预测，$y_{t+1}$ 是采用相同信息频率构造的平方去均值收益或无偏已实现方差代理，则逐期损失为
$$
\ell_{Q,t}=\log h_t+\frac{y_{t+1}}{h_t}.
$$
应报告代理变量的构造和噪声敏感性，不能在模型之间更换代理。分位数评价采用统一的收益下尾概率 $\alpha$。令 $q_{\alpha,t}$ 为模型给出的收益 $\alpha$ 分位数，其分位数损失为
$$
\ell_{\alpha,t}=\rho_\alpha(r_{t+1}-q_{\alpha,t})
=\left(\alpha-\boldsymbol1_{\{r_{t+1}<q_{\alpha,t}\}}\right)(r_{t+1}-q_{\alpha,t}),
$$
数值越小越好，并同时报告多个事先指定的风险水平，而非测试后挑选最容易胜出的水平。

对任意模型与基准构造同一预测起点的损失差，分别对 QLIKE 和分位数损失实施 Diebold–Mariano 检验。长期方差按预测是否重叠以及损失差剩余自相关选择 HAC 估计，显著性方向与效应量一并报告。全体候选的比较采用模型置信集筛选统计上不劣的模型，并以现实检查或 SPA 检验“没有模型优于基准”的原假设；块自助法须保留损失差的时间相关和模型间相关。若各损失函数代表不同风险目标，应分别给出结论，不能把某一项的胜出宣称为所有意义上的最优。
风险校准与经济评价必须分开保存。对收益下尾 VaR，定义例外 $I_{t+1}=\boldsymbol1_{\{r_{t+1}<q_{\alpha,t}\}}$。先用 $x=\sum_tI_{t+1}$ 构造无条件覆盖统计量
$$
LR_{\mathrm{uc}}=-2\log\frac{(1-\alpha)^{T-x}\alpha^x}
{(1-x/T)^{T-x}(x/T)^x},
$$
再用相邻例外状态的转移似然、游程或预定危险率回归检验独立性，并联合报告条件覆盖检验；小样本和零例外时采用精确二项检验或按原假设模拟，而不机械使用卡方近似。连续预测分布同时计算 $U_{t+1}=F_t(r_{t+1})$，检验边际均匀性及 $U_{t+1}$ 和预定变换的序列独立；离散或混合预测分布使用独立均匀变量作随机化概率积分变换。平坦直方图不能替代这些动态检验。

组合内部权重 $\boldsymbol b_t$ 只能由 $\mathcal F_t$ 决定，四类模型分别把方差或协方差预测传入同一个预先规定的波动率目标化规则：
$$
\ell_t=\min\left\{L_{\max},
\frac{\sigma^*}{\sqrt{\boldsymbol b_t^\top\boldsymbol H_{t+1\mid t}\boldsymbol b_t}}\right\},
\qquad \boldsymbol w_t=\ell_t\boldsymbol b_t.
$$
此外固定单资产权重、总杠杆、净空和净空敞口限制，并规定预测失败或数据缺失时不得放大仓位。令 $\boldsymbol w_{t-1}^{+}$ 为上一期目标权重经资产收益自然漂移后的再平衡前权重，$\Delta\boldsymbol w_t=\boldsymbol w_t-\boldsymbol w_{t-1}^{+}$，成交额权重为 $\sum_i|\Delta w_{t,i}|$。单位佣金 $c_i$、买卖价差 $S_i$、融资附加费率 $s_t$ 均按成交或持仓时点计入，得到
$$
\begin{aligned}
r^{\mathrm{net}}_{p,t+1}={}&\ell_t\boldsymbol b_t^\top\boldsymbol r_{t+1}
+(1-\ell_t)r_{f,t+1}-s_t(\ell_t-1)_+\\
&-\sum_i\left(c_i+\frac{S_i}{2}\right)|\Delta w_{t,i}|,
\end{aligned}
$$
其中 $(\ell_t-1)_+$ 只对有杠杆部分计附加融资成本；若另设冲击成本，应按预定流动性函数扣除。由 $W_{t+1}=W_t(1+r^{\mathrm{net}}_{p,t+1})$ 计算净值曲线，最大回撤为
$$
MDD=\max_t\left(1-\frac{W_t}{\max_{0\le s\le t}W_s}\right).
$$
同时报告目标波动实现程度、杠杆、换手和毛收益，以区分预测改善与单纯加仓。

最终结论按预先登记的决策规则作出。例如，可先要求 VaR 覆盖、独立性和 PIT 校准达到预定准入标准，再在实现波动不偏离 $\sigma^*$ 且 $MDD$ 不超过上限的模型中，选择交易成本后净效用最高者；若无模型合格，应明确报告而不是放宽门槛。QLIKE 最优只说明代理方差损失最小，VaR 校准最好也不保证扣费后收益最高，而短期净收益领先更不能推翻失准诊断。统计排名与经济排名不一致时，应分别报告证据，并由上述主风险目标决定采用何模型，其余指标只作次要分析。常见错误包括用全样本参数或平滑状态预测、在测试集上改自由度和窗口、忽略重叠期限标准误与多重比较、用未漂移权重低估换手、把融资成本从目标波动率中直接扣除，以及事后挑选有利区间、风险水平或评价指标。