# 第23章习题参考答案与解析

## 1. 
**证明**

固定 $X_0=x$，令 $\bar f(x)=\mathbb E_S[\hat f_S(x)]$。由独立性及 $\mathbb E[\varepsilon_0\mid X_0]=0$，
$$
\mathbb E[(f(X_0)-\hat f_S(X_0))\varepsilon_0\mid S,X_0]
=(f(X_0)-\hat f_S(X_0))\mathbb E[\varepsilon_0\mid X_0]=0,
$$
故噪声交叉项消失，并且
$$
\mathbb E[(Y_0-\hat f_S(X_0))^2]
=\mathbb E[\sigma^2(X_0)]+\mathbb E[(f(X_0)-\hat f_S(X_0))^2].
$$
在 $X_0=x$ 下插入 $\bar f(x)$：
$$
f(x)-\hat f_S(x)=f(x)-\bar f(x)+\bar f(x)-\hat f_S(x).
$$
估计交叉项满足
$$
2(f(x)-\bar f(x))\mathbb E_S[\bar f(x)-\hat f_S(x)]=0.
$$
于是，记 $V(x)=\operatorname{Var}_S(\hat f_S(x))$，得到
$$
\mathbb E[(Y_0-\hat f_S(X_0))^2]
=\mathbb E[\sigma^2(X_0)]+\mathbb E[(\bar f(X_0)-f(X_0))^2]
+\mathbb E[V(X_0)].
$$
三项分别是不可约噪声、平方偏差与估计方差。

□

若算法使用测试观测，预测值可能与 $\varepsilon_0$ 相关，第一步不能分离，噪声交叉项不必为零。常见错误是漏写偏差的平方，或使用测试数据后仍套用此分解。

## 2. 
**证明**

由二次函数求导，梯度与 Hessian 为
$$
\nabla J(\boldsymbol\beta)=-2\boldsymbol X^\top\boldsymbol y
+2(\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I)\boldsymbol\beta,
\qquad
\nabla^2J(\boldsymbol\beta)=2(\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I).
$$
令 $\boldsymbol A=\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I$。对任意 $\boldsymbol v\ne\boldsymbol0$，
$$
\boldsymbol v^\top\boldsymbol A\boldsymbol v
=\|\boldsymbol X\boldsymbol v\|_2^2+\lambda\|\boldsymbol v\|_2^2>0.
$$
故 $\boldsymbol A$ 正定，目标严格凸且仅有以下驻点：
$$
\hat{\boldsymbol\beta}_\lambda
=(\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I)^{-1}\boldsymbol X^\top\boldsymbol y.
$$

□

令 $\boldsymbol X=\boldsymbol U\boldsymbol\Sigma\boldsymbol V^\top$，则
$$
\hat{\boldsymbol\beta}_\lambda
=\boldsymbol V(\boldsymbol\Sigma^\top\boldsymbol\Sigma+\lambda\boldsymbol I)^{-1}
\boldsymbol\Sigma^\top\boldsymbol U^\top\boldsymbol y.
$$
奇异值 $\sigma_j>0$ 方向的系数乘 $\sigma_j/(\sigma_j^2+\lambda)$，拟合分量乘 $\sigma_j^2/(\sigma_j^2+\lambda)$，小奇异值方向收缩更强。$\lambda=0$ 时唯一解要求 $\boldsymbol X$ 列满秩，否则解不唯一。常见错误是混淆两种收缩因子，或忽略零正则化时的秩条件。

## 3. 
记 $\boldsymbol A=\boldsymbol X^\top\boldsymbol X+\lambda\boldsymbol I$、$\boldsymbol W=\boldsymbol A^{-1}\boldsymbol X^\top$。由模型假设，
$$
\mathbb E[\hat{\boldsymbol\beta}_\lambda]
=\boldsymbol A^{-1}\boldsymbol X^\top\boldsymbol X\boldsymbol\beta
=(\boldsymbol I-\lambda\boldsymbol A^{-1})\boldsymbol\beta.
$$
所以偏差向量及其作用矩阵为
$$
\mathbb E[\hat{\boldsymbol\beta}_\lambda]-\boldsymbol\beta
=-\lambda\boldsymbol A^{-1}\boldsymbol\beta,
\qquad -\lambda\boldsymbol A^{-1}.
$$
协方差矩阵为
$$
\operatorname{Cov}(\hat{\boldsymbol\beta}_\lambda)
=\sigma^2\boldsymbol W\boldsymbol W^\top
=\sigma^2\boldsymbol A^{-1}\boldsymbol X^\top\boldsymbol X\boldsymbol A^{-1}.
$$
预测向量为 $\boldsymbol H_\lambda\boldsymbol y$，其中 $\boldsymbol H_\lambda=\boldsymbol X\boldsymbol A^{-1}\boldsymbol X^\top$，有效自由度为
$$
\operatorname{df}(\lambda)=\operatorname{tr}(\boldsymbol H_\lambda)
=\sum_j\frac{\sigma_j^2}{\sigma_j^2+\lambda},
$$
零奇异值对应项取零。自由度下降只表示拟合更受约束；正则化也增加偏差，低方差方向也未必是测试分布的重要方向，故测试误差可能上升。常见错误是把协方差写成 $\sigma^2\boldsymbol A^{-1}$，或把训练自由度减少直接等同于泛化改善。
## 4. 
利用 $\boldsymbol X^\top\boldsymbol X=\boldsymbol I$，目标函数可写成
$$
\frac12\|\boldsymbol y\|_2^2-\boldsymbol z^\top\boldsymbol\beta
+\frac12\boldsymbol\beta^\top\boldsymbol\beta+\lambda\|\boldsymbol\beta\|_1
=C+\sum_{j=1}^p\left[\frac12(\beta_j-z_j)^2+\lambda|\beta_j|\right],
$$
其中 $\boldsymbol z=\boldsymbol X^\top\boldsymbol y$。各坐标可分别最小化，最优条件为
$$
0\in\hat\beta_j-z_j+\lambda\partial|\hat\beta_j|.
$$
若 $\hat\beta_j>0$，则 $\hat\beta_j=z_j-\lambda$，并要求 $z_j>\lambda$；若 $\hat\beta_j<0$，则 $\hat\beta_j=z_j+\lambda$，并要求 $z_j<-\lambda$；若 $\hat\beta_j=0$，则 $0\in-z_j+\lambda[-1,1]$，即 $|z_j|\le\lambda$。三种情形合并为
$$
\hat\beta_j=\operatorname{sign}(z_j)\max\{|z_j|-\lambda,0\}.
$$
因此 Lasso 先减去 $\lambda$ 再截断，既能收缩又能置零。采用 $\tfrac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2+\tfrac\eta2\|\boldsymbol\beta\|_2^2$ 时，岭解为 $z_j/(1+\eta)$；若岭罚写为 $\eta\|\boldsymbol\beta\|_2^2$，分母则为 $1+2\eta$。岭只按比例缩小而不产生精确零。常见错误是把软阈值写成不减去 $\lambda$ 的硬阈值，或忘记不同罚因子约定导致的系数差异。

## 5. 
**证明**

取目标 $\tfrac12\|\boldsymbol y-\boldsymbol X\boldsymbol\beta\|_2^2+\lambda\|\boldsymbol\beta\|_1$。KKT 条件为
$$
\boldsymbol X^\top(\boldsymbol X\hat{\boldsymbol\beta}-\boldsymbol y)
+\lambda\boldsymbol v=\boldsymbol0,
\qquad v_j\in\partial|\hat\beta_j|.
$$
若 $\hat\beta_j=0$，则
$$
|\boldsymbol x_j^\top(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})|\le\lambda;
$$
若 $\hat\beta_j\ne0$，则
$$
\boldsymbol x_j^\top(\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta})
=\lambda\operatorname{sign}(\hat\beta_j).
$$
设 $\hat{\boldsymbol\beta}$ 与 $\tilde{\boldsymbol\beta}$ 都是解。若拟合向量不同，平方损失关于拟合向量的严格凸性给出
$$
\frac12\left\|\boldsymbol y-\boldsymbol X\frac{\hat{\boldsymbol\beta}+\tilde{\boldsymbol\beta}}2\right\|_2^2
<\frac12\left[\frac12\|\boldsymbol y-\boldsymbol X\hat{\boldsymbol\beta}\|_2^2
+\frac12\|\boldsymbol y-\boldsymbol X\tilde{\boldsymbol\beta}\|_2^2\right].
$$
而三角不等式给出中点的 $\ell_1$ 罚不超过两解罚项的平均，故中点目标严格更小，矛盾。因此 $\boldsymbol X\hat{\boldsymbol\beta}=\boldsymbol X\tilde{\boldsymbol\beta}$。

□

例如
$$
\boldsymbol X=\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad \boldsymbol y=\begin{pmatrix}1\\1\end{pmatrix},\qquad \lambda=1.
$$
所有非负且 $\beta_1+\beta_2=1/2$ 的向量都有相同拟合与罚项，故 $(1/2,0)^\top$ 与 $(1/4,1/4)^\top$ 都是解。可见拟合唯一不意味着单个因子贡献可识别；共线时不宜把某一表示的系数当作唯一因果解释。常见错误是由系数不唯一误判预测不唯一，或把零系数的内积条件误写成等号。

## 6. 
高斯线性模型的对数似然在均值参数处最大化为
$$
\ell_{\max}=-\frac n2\log(2\pi\sigma^2)-\frac{\mathrm{RSS}}{2\sigma^2}.
$$
若采用题给的 $\mathrm{RSS}$ 型准则，将各模型的共同方差参数剖面化，代入 $\hat\sigma^2=\mathrm{RSS}/n$，得到
$$
\ell_{\max}=-\frac n2\log\left(\frac{\mathrm{RSS}}n\right)
-\frac n2\log(2\pi)-\frac n2.
$$
由 $\mathrm{AIC}=-2\ell_{\max}+2k$、$\mathrm{BIC}=-2\ell_{\max}+k\log n$，删去模型间共同常数，分别有
$$
\mathrm{AIC}=n\log(\mathrm{RSS}/n)+2k,
\qquad
\mathrm{BIC}=n\log(\mathrm{RSS}/n)+k\log n.
$$
数值上，模型甲的 AIC 为 $200\log(0.5)+10\approx-128.629$，模型乙的为 $200\log(0.47)+16\approx-135.005$，故 AIC 选乙；模型甲的 BIC 为 $200\log(0.5)+5\log200\approx-112.138$，模型乙的为 $200\log(0.47)+8\log200\approx-108.618$，故 BIC 选甲。乙的拟合改善足以支付 AIC 的六单位额外惩罚，却不足以支付 BIC 的约 $15.895$ 单位额外惩罚，因而选择不同。

严格地说，若 $\sigma^2$ 确实已知且固定，就不应再代入 $\hat\sigma^2$，此时比较量应分别是 $\mathrm{RSS}/\sigma^2+2k$ 与 $\mathrm{RSS}/\sigma^2+k\log n$。常见错误是混淆这两种方差处理，或把较大的准则值当成较优模型。

## 7. 
对模型 $M$，证据积分为
$$
p(\boldsymbol y\mid M)=\int \exp\{\ell_n(\boldsymbol\theta)\}\pi(\boldsymbol\theta)\,d\boldsymbol\theta,
\qquad \ell_n(\boldsymbol\theta)=\log p(\boldsymbol y\mid\boldsymbol\theta).
$$
在内点最大值 $\hat{\boldsymbol\theta}$ 处作二阶展开：
$$
\ell_n(\boldsymbol\theta)=\ell_n(\hat{\boldsymbol\theta})
-\frac12(\boldsymbol\theta-\hat{\boldsymbol\theta})^\top
\boldsymbol H_n(\boldsymbol\theta-\hat{\boldsymbol\theta})+\boldsymbol R_n,
$$
其中 $\boldsymbol H_n=-\nabla^2\ell_n(\hat{\boldsymbol\theta})$。正则条件给出 $\hat{\boldsymbol\theta}$ 的一致性与渐近正态性，并且 $n^{-1}\boldsymbol H_n\to\boldsymbol I$ 依概率成立，故在宽度 $O_p(n^{-1/2})$ 的主要积分区域内，$n^{-1/2}\boldsymbol H_n^{1/2}(\boldsymbol\theta-\hat{\boldsymbol\theta})$ 的高次余项可控。再展开光滑正先验 $\pi(\boldsymbol\theta)=\pi(\hat{\boldsymbol\theta})+O_p(n^{-1/2})$，高斯积分给出
$$
p(\boldsymbol y\mid M)=\exp\{\ell_n(\hat{\boldsymbol\theta})\}
\pi(\hat{\boldsymbol\theta})(2\pi)^{d/2}n^{-d/2}
|\boldsymbol I|^{-1/2}\{1+o_p(1)\}.
$$
取对数后，$\log\pi(\hat{\boldsymbol\theta})$、行列式项和常数项均为 $O_p(1)$，于是
$$
\log p(\boldsymbol y\mid M)
=\log p(\boldsymbol y\mid\hat{\boldsymbol\theta})-\frac d2\log n+O_p(1).
$$
乘以 $-2$ 并舍去不随候选模型系统变化的 $O_p(1)$ 项，即形成 $-2\log p(\boldsymbol y\mid\hat{\boldsymbol\theta})+d\log n$。这里近似误差并非严格为零，只是在固定维度渐近意义下低阶。

若候选维度随 $n$ 增长，$d$ 不再是固定常数，先验项、信息行列式和高维积分余项可能随模型变化而不具统一阶，宽度收缩与尾部控制也未必一致，故不能直接套用。常见错误是遗漏信息行列式、把 Laplace 近似写成恒等式，或在维度增长时仍声称同样的余项阶。

## 8. 
**证明**

假设各留一估计具有相同且关于 $n-1$ 一致的展开，余项在 $i$ 上一致。则
$$
\mathbb E[\hat\theta_{n-1}^{(-i)}]
=\theta+\frac a{n-1}+\frac b{(n-1)^2}+O((n-1)^{-3}),
$$
对 $i$ 平均不改变该式。代入校正值的期望：
$$
\begin{aligned}
\mathbb E[\hat\theta_{\mathrm{JK}}]
&=n\left(\theta+\frac an+\frac b{n^2}+O(n^{-3})\right)\\
&\quad-(n-1)\left(\theta+\frac a{n-1}+\frac b{(n-1)^2}+O((n-1)^{-3})\right)\\
&=\theta+b\left(\frac1n-\frac1{n-1}\right)+O(n^{-2})\\
&=\theta-\frac b{n(n-1)}+O(n^{-2}).
\end{aligned}
$$
因此 $a/n$ 被精确消去，偏差为 $O(n^{-2})$；仅凭题给展开不能把同阶余项压成更低阶，也不能断言完整系数恰为 $-b/n^2$。

□

若展开因不光滑统计量、边界参数、重尾导致期望不存在或留一估计不具一致展开而失效，校正可能保留一阶偏差，甚至放大方差。常见错误是把 $\bar\theta_{(-\cdot)}$ 当成 $\hat\theta_n$，或宣称校正后严格无偏。

## 9. 
**证明**

删去第 $i$ 个观测后，
$$
\bar X_{(-i)}=\frac{n\bar X_n-X_i}{n-1}.
$$
对这些留一均值再平均，利用 $\sum_iX_i=n\bar X_n$，得
$$
\bar X_{(-\cdot)}=\frac1n\sum_{i=1}^n\frac{n\bar X_n-X_i}{n-1}
=\bar X_n.
$$
于是
$$
\bar X_{(-i)}-\bar X_{(-\cdot)}
=\frac{n\bar X_n-X_i}{n-1}-\bar X_n
=\frac{\bar X_n-X_i}{n-1}.
$$
代回 Jackknife 方差：
$$
\begin{aligned}
\widehat{\operatorname{Var}}_{\mathrm{JK}}
&=\frac{n-1}n\sum_{i=1}^n\frac{(\bar X_n-X_i)^2}{(n-1)^2}\\
&=\frac1{n(n-1)}\sum_{i=1}^n(X_i-\bar X_n)^2
=\frac{s_n^2}{n}.
\end{aligned}
$$

□

相关时间序列中，若 $\gamma_h=\operatorname{Cov}(X_t,X_{t+h})$，则
$$
\operatorname{Var}(\bar X_n)
=\frac1{n^2}\left[n\gamma_0+2\sum_{h=1}^{n-1}(n-h)\gamma_h\right],
$$
还含自协方差项；上述代数只计算留一均值离散度，不能替代长期方差估计。常见错误是把 $s_n^2$ 的分母误作 $n$，或对相关序列仍把 $s_n^2/n$ 当作完整方差。

## 10. 
**证明**

给定 $X_{1:n}$，经验分布在每个 $X_i$ 上赋质量 $1/n$。因此每个 $X_i^*$ 的条件均值与二阶矩为
$$
\mathbb E_*[X_i^*]=\frac1n\sum_{j=1}^nX_j=\bar X_n,
\qquad
\mathbb E_*[(X_i^*)^2]=\frac1n\sum_{j=1}^nX_j^2.
$$
故单次抽样的条件方差为
$$
\operatorname{Var}_*(X_i^*)
=\frac1n\sum_{j=1}^nX_j^2-\bar X_n^2
=\frac1n\sum_{j=1}^n(X_j-\bar X_n)^2=\hat\sigma_n^2.
$$
由条件期望线性性，
$$
\mathbb E_*[\bar X_n^*]
=\frac1n\sum_{i=1}^n\mathbb E_*[X_i^*]=\bar X_n.
$$
又因各 $X_i^*$ 在给定观测时独立，方差可加且常数因子需平方：
$$
\operatorname{Var}_*(\bar X_n^*)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}_*(X_i^*)
=\frac{\hat\sigma_n^2}{n}.
$$

□

由 $n\hat\sigma_n^2=(n-1)s_n^2$，得到
$$
\frac{\hat\sigma_n^2}{n}=\frac{n-1}{n}\frac{s_n^2}{n}.
$$
若只做 $B$ 次重抽样，还须用有限个 Bootstrap 统计量近似条件分布或条件方差，故除抽样不确定性外又有 Monte Carlo 误差；在适当矩条件下，其平均类估计通常以 $B^{-1/2}$ 阶缩小，分位数估计还受尾部波动影响。常见错误是漏掉方差中的 $1/n^2$、混淆 $\hat\sigma_n^2$ 与 $s_n^2$，或把有限次模拟结果当成精确 Bootstrap 值。

## 11. 
独立同分布 Bootstrap 要求原始观测可视为独立同分布，且单个观测就是完整评价单位；它逐日有放回抽样，不适合五期重叠标签形成的序列相关。残差 Bootstrap 要求先给出合理的条件均值模型，残差近似为可交换创新；应重抽残差、重建响应，再完整重估策略并重算标签，而非把相关残差当成独立噪声。Moving block Bootstrap 要求序列近似平稳且依赖随滞后衰减，适合保留局部自相关与波动聚集。

一种方案是取块长 $\ell$，把连续观测划为起点相隔一期的块，每次有放回抽取一个块，拼接至长度 $n$，再从拼接后的基础数据重建五期标签、仓位、成本和净收益，最后计算目标统计量。$\ell$ 应覆盖五期机械重叠及经验短期相关尺度，并做多个块长的敏感性检查；太短会切断依赖，太长则不同块数过少、估计不稳。非循环拼接会在块界制造断裂，可用循环块、检查边界统计或舍弃无法完整构造的末端标签；不能直接拼接已算好的重叠标签而忽略跨块持有期。

直接打乱日期会破坏收益自相关、波动状态、重叠标签和交易先后关系，使方差及回撤评价失真。常见错误是只重抽残差却不重建策略，或把块长当作不影响结果的纯计算参数。

## 12. 
**证明**

设置换群为 $\mathcal G$，其大小为 $G$。原假设下的可交换性意味着对任意 $g\in\mathcal G$，$gZ$ 与 $Z$ 同分布。对观测轨道
$$
\mathcal O(z)=\{gz:g\in\mathcal G\}
$$
取条件后，原观测在轨道中的位置服从均匀分布；各 $T(gz)$ 因而构成相应的可交换排列统计量。

给并列值以独立、均匀且对称的随机次序，定义 $R(z)$ 为原统计量在全部 $G$ 个统计量中从大到小的名次，最大值名次为一。给定轨道时，$R(Z)$ 在 $\{1,\ldots,G\}$ 上均匀。取 $k=\lfloor\alpha G\rfloor$，当 $R(Z)\le k$ 时拒绝，便有
$$
\mathbb P(R(Z)\le k\mid\mathcal O(Z))=\frac kG\le\alpha.
$$
对轨道再取期望，条件及无条件第一类错误概率均不超过 $\alpha$。若还要在边界名次以适当概率随机拒绝，可把错误率补足到 $\alpha$；不随机化则保守但有效。

□

不采用随机化时，可用保守秩 $\sum_g\mathbf1\{T(gz)\ge T(z)\}$，把全部并列者都排在原观测之前，以避免有利地拆分并列。仅抽取部分置换时，必须保留原观测，并对其余 $B$ 个置换按对称规则抽样，使用
$$
p=\frac{1+\sum_{b=1}^B\mathbf1\{T(g_bZ)\ge T(Z)\}}{B+1}.
$$
在原假设下原观测与抽得置换的位置可交换，故该秩规则仍有效控制水平，另有 Monte Carlo 分辨率与随机性。常见错误是漏掉分子和分母中的一、任意拆开并列，或只计算经验分位数而不验证条件秩分布。

## 13. 
**证明**

记第 $k$ 折为 $D_k$，训练集为 $S_{(-k)}$，其大小为 $m=n-n/K$。交叉验证估计写为
$$
\widehat R_{\mathrm{CV}}=\frac1K\sum_{k=1}^K\frac1{|D_k|}
\sum_{i\in D_k}\ell(\mathcal A(S_{(-k)});Z_i).
$$
对固定的 $k,i$，$Z_i$ 与 $S_{(-k)}$ 独立，训练集由 $m$ 个独立同分布观测组成；算法对顺序对称，所以
$$
\mathbb E[\ell(\mathcal A(S_{(-k)});Z_i)]=R_m.
$$
由期望线性性，先有每折均值为 $R_m$，再有
$$
\mathbb E[\widehat R_{\mathrm{CV}}]=R_m,
\qquad
\operatorname{Bias}(\widehat R_{\mathrm{CV}};R_n)=R_m-R_n.
$$
若 $R_m=R_\infty+c/m+O(m^{-2})$，由 $m=n(K-1)/K$ 得
$$
\frac1m-\frac1n=\frac1{n(K-1)},
$$
从而
$$
R_m-R_n=\frac c{n(K-1)}+O(n^{-2}).
$$
正号表示平均而言高估 $R_n$；若 $c<0$，方向相反。

□

折间误差相关不改变期望线性性，故上述等式无需折间独立。但
$$
\operatorname{Var}\left(\frac1K\sum_{k=1}^K\bar\ell_k\right)
=\frac1{K^2}\left[\sum_k\operatorname{Var}(\bar\ell_k)
+2\sum_{j<k}\operatorname{Cov}(\bar\ell_j,\bar\ell_k)\right],
$$
共享训练样本产生的协方差会影响方差。常见错误是把期望写成 $R_n$，或由折间相关错误地推断均值公式失效。

## 14. 
**证明**

对阈值类，一个点既能被标为零，也能被标为一，故 VC 维至少为一。任取 $x_1<x_2$，标记 $(1,0)$ 不可能实现：若 $h_t(x_1)=1$，则 $t\le x_1<x_2$，从而 $h_t(x_2)=1$。所以两点不能被 shattered，VC 维恰为一。

将任意 $m$ 个互异点排序为 $x_{(1)}<\cdots<x_{(m)}$。当 $t$ 增大时，正类只能是空集或后缀
$$
\{x_{(j)},\ldots,x_{(m)}\},\qquad j=1,\ldots,m.
$$
空集加上 $m$ 个非空后缀共 $m+1$ 种，且均可实现，故增长函数 $\Pi_{\mathcal H}(m)=m+1$。

对闭区间类，两个互异点的四种标记分别可由覆盖两点、只覆盖左点、只覆盖右点、覆盖两点以外的区间实现，故 VC 维至少为二。任取 $x_1<x_2<x_3$，交错标记 $(1,0,1)$ 要求区间同时包含 $x_1,x_3$；闭区间的凸性迫使它也包含 $x_2$，矛盾。因此三点不能被 shattered，VC 维恰为二。

□

阈值规则在每个样本规模上只有线性数量的标记方式，而区间规则可有二次数量，后者容量更大，也通常需要更强的复杂度控制。常见错误是把阈值类不能实现的标记写成 $(0,1)$，或把“两点能取部分标记”误当成“两点能被 shattered”。

## 15. 
**证明**

令
$$
S_j=\frac1n\sum_{i=1}^n\sigma_i g_j(z_i),
$$
其中 $\sigma_i$ 独立且以等概率取 $\pm1$。由 $\mathbb E[e^{t\sigma_i a}]=\cosh(ta)\le e^{t^2a^2/2}$ 及独立性，
$$
\mathbb E[e^{tS_j}]
=\prod_{i=1}^n\mathbb E[e^{t\sigma_i g_j(z_i)/n}]
\le\exp\left\{\frac{t^2}{2n^2}\sum_{i=1}^ng_j(z_i)^2\right\}
\le\exp\left\{\frac{t^2B^2}{2n}\right\}.
$$
对任意 $t>0$，先指数化上确界，再依次使用 Jensen 不等式、指数函数单调性以及上确界不超过求和：
$$
\begin{aligned}
\exp\left\{t\,\mathbb E\max_jS_j\right\}
&\le\mathbb E\exp\{t\max_jS_j\}
=\mathbb E\max_j e^{tS_j}\\
&\le\sum_{j=1}^M\mathbb E[e^{tS_j}]
\le M\exp\left\{\frac{t^2B^2}{2n}\right\}.
\end{aligned}
$$
取对数并除以 $t$：
$$
\widehat{\mathfrak R}_{z_{1:n}}(\mathcal G)
\le\frac{\log M}{t}+\frac{tB^2}{2n}.
$$
右端在 $t=B^{-1}\sqrt{2n\log M}$ 处最小，代回得到
$$
\widehat{\mathfrak R}_{z_{1:n}}(\mathcal G)
\le B\sqrt{\frac{2\log M}{n}}.
$$

□

候选数增加只通过对数项恶化该界；固定误差水平所需的 $n$ 大致随 $\log M$ 增长。但重复或高度相关的函数可能使实际复杂度远低于此有限类界。常见错误是把 $\max_j\mathbb E$ 与 $\mathbb E\max_j$ 混同、遗漏 $1/n$ 的尺度，或直接把该上界当作紧确等式。

## 16. 
式（23.32）给出线性权重类的经验 Rademacher 上界 $rX/\sqrt n$。因此 $r=2$ 时，
$$
\widehat{\mathfrak R}(\mathcal H_r)\le\frac{2\times2}{\sqrt{100}}=0.4;
$$
$r=0.5$ 时，
$$
\widehat{\mathfrak R}(\mathcal H_r)\le\frac{0.5\times2}{\sqrt{100}}=0.1.
$$
损失关于预测值的 Lipschitz 常数为 $L=0.5$，压缩不等式使损失类的相应上界再乘 $L$，故二者分别为
$$
0.5\times0.4=0.2,
\qquad
0.5\times0.1=0.05.
$$
较小上界只表示较小权重类的估计复杂度较低，并不表示其类内最优总体风险较低。缩小权重范围可能排除更接近真实关系的预测函数，使近似误差增加。若同时控制逼近误差，应比较各类的 $\inf_{f\in\mathcal H_r}R(f)-R^*$、达到最优所需权重范数、协变量分布与损失结构，并把逼近误差和估计误差界相加考察。常见错误是把复杂度上界当作实际风险，或只最小化 $r$ 而忽略类内最优风险。

## 17. 
**证明**

Bonferroni 的单检验显著性阈值是
$$
\alpha_{\mathrm{single}}=\frac{0.05}{500}=0.0001.
$$
令 $\mathcal H_0$ 为真实原假设的指标集，并假定每个边际检验在原假设下满足 $\mathbb P(p_j\le t)\le t$。无论检验间如何相关，并集界都给出
$$
\begin{aligned}
\operatorname{FWER}
&=\mathbb P\left(\bigcup_{j\in\mathcal H_0}\{p_j\le0.0001\}\right)\\
&\le\sum_{j\in\mathcal H_0}\mathbb P(p_j\le0.0001)
\le\frac{|\mathcal H_0|}{500}\times0.05\le0.05.
\end{aligned}
$$
证明只使用边际有效性与并集界，不需要独立性。

□

信息泄露发生在“用全部样本选出十二个因子”这一步：后续每一折的验证数据已经参与候选筛选，所以普通五折评分不是该完整研究流程的样本外评分。替代流程是在每个外层训练折内独立完成标准化、筛选十二个因子和拟合，再把该折确定的预处理及模型用于其未触碰验证折；每一折都允许重新得到不同因子。若采用稳定性筛选，也同样只在当折训练数据内重抽样和筛选。常见错误是把阈值改成 $0.05/12$，或在全样本筛选后仅将最终回归放入交叉验证便声称已消除泄露。

## 18. 
预先固定因子数与岭参数网格、内层滚动切分和并列处理规则。约定月 $s$ 的标签使用随后三个月 $s+1,s+2,s+3$ 的收益。第 $k=0,\ldots,5$ 个外层起点前共有 $t_k=36+4k$ 个月历史，测试块为 $t_k+1,\ldots,t_k+4$。为使训练标签在测试开始前已经终结，只保留 $s\le t_k-3$ 的训练标签，即删除起点为 $t_k-2,t_k-1,t_k$ 的三个月标签。

在每个外层起点，仅用上述许可历史执行内层滚动验证。若某内层验证从 $v+1$ 开始，则其训练标签只取 $s\le v-3$，同样删除 $v-2,v-1,v$ 三个起点，保证训练标签不进入验证期；验证只取随后历史，绝不反向训练。每个网格候选都在内层训练段独立完成筛选和拟合，再对验证段评分，按预定汇总损失选择因子数与 $\lambda$。选好后，用该外层全部许可训练历史重新筛选、重估 Ridge 模型，并冻结到本外层四个月的预测规则。

标准化逐月进行：当月股票池、缺失值规则和横截面标准化参数只能由当时可得数据计算，不能以全样本均值或标准差替代。外层测试只负责产生预测，不参与网格修改；模型在每个外层起点重估，四个月的预测连同时间戳、训练截止点、所选因子和参数分别保存。若有预定月内重估，也只能使用当月之前已成熟的数据，不能回看后三个月。

六个测试块彼此首尾相接而不重叠，最终共有 $6\times4=24$ 个不重复的外层预测月份，标签到期后统一评分。常见错误是只清除外层边界而忘清除每个内层边界、用全样本标准化，或根据前几个外层结果调整网格，使后续外层失去独立性。

## 19. 
以 $2\nu$ 乘约束构造 Lagrange 函数：
$$
\mathcal L=\|\boldsymbol y-\boldsymbol X\boldsymbol w\|_2^2
+\lambda\|\boldsymbol w-\boldsymbol w_0\|_2^2
+2\nu(\boldsymbol1^\top\boldsymbol w-1).
$$
一阶条件为
$$
2\boldsymbol X^\top(\boldsymbol X\boldsymbol w-\boldsymbol y)
+2\lambda(\boldsymbol w-\boldsymbol w_0)+2\nu\boldsymbol1=\boldsymbol0,
$$
即 $\boldsymbol A\boldsymbol w=\boldsymbol b-\nu\boldsymbol1$。因此
$$
\boldsymbol w=\boldsymbol A^{-1}\boldsymbol b-\nu\boldsymbol A^{-1}\boldsymbol1.
$$
代入 $\boldsymbol1^\top\boldsymbol w=1$，得到
$$
\nu=\frac{\boldsymbol1^\top\boldsymbol A^{-1}\boldsymbol b-1}
{\boldsymbol1^\top\boldsymbol A^{-1}\boldsymbol1}.
$$
记 $\boldsymbol u=\boldsymbol A^{-1}\boldsymbol b$、$\boldsymbol q=\boldsymbol A^{-1}\boldsymbol1$，闭式解为
$$
\hat{\boldsymbol w}=\boldsymbol u+
\frac{1-\boldsymbol1^\top\boldsymbol u}{\boldsymbol1^\top\boldsymbol q}\boldsymbol q.
$$
当 $\lambda>0$ 时 $\boldsymbol A$ 正定，故分母 $\boldsymbol1^\top\boldsymbol A^{-1}\boldsymbol1>0$。增大 $\lambda$ 时，无约束解 $\boldsymbol u$ 向 $\boldsymbol w_0$ 收缩，上式再施加全投资修正。若权重维数为 $p$，则
$$
\hat{\boldsymbol w}\to\boldsymbol w_0+
\frac{1-\boldsymbol1^\top\boldsymbol w_0}{p}\boldsymbol1.
$$
所以基准权重和为一时极限恰为 $\boldsymbol w_0$；否则极限是把 $\boldsymbol w_0$ 投影到全投资平面后的向量，而非原基准。常见错误是漏掉乘子修正、把修正符号写反，或默认任何基准都满足权重和为一。
## 20. 
设某轮验证期为 $v,v+1,\ldots,v+11$，紧接的测试期为 $q,q+1,\ldots,q+11$，其中 $q=v+12$。月初 $s$ 的标签使用 $s+1,s+2,s+3$ 三个月的收益。因而，若训练标签不得触及从 $a$ 开始的验证或测试区间，就必须满足 $s+3<a$，即只保留 $s\le a-4$，并删除 $s=a-3,a-2,a-1$ 三个起点。这三个月是重叠标签清除；若还规定额外的隔离期 $e$，则进一步删除 $a-e,\ldots,a-1$ 的特征观测，不能把二者混为一谈。

滚动窗口的信息流为
$$
\mathcal T_{60}(v)\longrightarrow\mathcal V_{12}(v)
\longrightarrow\widehat{\mathcal T}_{60}(q)
\longrightarrow\mathcal Q_{12}(q).
$$
这里 $\mathcal T_{60}(v)$ 是验证前最近六十个月的候选训练段，$\mathcal V_{12}(v)$ 是十二个月验证段。每个候选超参数都在该训练段内完成预处理与拟合，清除上述三个月的重叠训练标签后，再对验证段逐月预测并评分。选定超参数后，$\widehat{\mathcal T}_{60}(q)$ 是测试前最近六十个月中标签已经成熟的观测；同样只保留 $s\le q-4$，再重估模型并产生测试段预测。验证期已经成熟且符合截止规则的标签可在最终重估时使用，但不能让验证标签伸入测试期。

扩展窗口的信息流为
$$
\mathcal T_{\ge60}(v)\longrightarrow\mathcal V_{12}(v)
\longrightarrow\widehat{\mathcal T}_{\ge60}(q)
\longrightarrow\mathcal Q_{12}(q).
$$
其第一轮候选训练段同为六十个月，此后不丢弃旧观测，而是在每个新起点把全部许可历史纳入训练；重叠标签清除、验证边界和测试边界与滚动方案完全相同。两种方案的横截面缺失值处理、股票池和标准化均逐月重建，只能使用当月可得信息。若预定测试期内逐月重估，则每月只加入当时已经成熟的标签，冻结已选超参数，并保存预测时点、信息截止点和模型版本；否则在测试起点重估一次并冻结整个十二个月。

制度变化较快时，滚动窗口能较快降低旧制度样本的权重，但固定六十个月使估计方差和训练量偏差基本不随轮次改善。扩展窗口利用更多数据，通常估计较稳定，却可能让过时制度长期占据较大权重；其训练量逐轮增长，风险中的训练量项相应变化，所以两种窗口的测试分数差异同时包含制度适应与训练量差异。滚动窗口的存储和单次拟合成本大致有界，扩展窗口的内存、矩阵运算与审计存档成本通常逐轮增加。

即使测试月份在形式上不重合，两种窗口仍共享资产、因子、验证历史和模型选择规则，相邻轮次训练集也大量重叠，三个月标签还可能造成跨块依赖。因此两组测试分数是同一数据生成过程上的相关结果，不是独立重复实验。常见错误是只清除测试边界而保留伸入验证期的训练标签、把隔离期当作重叠清除的替代品、在扩展窗口中悄悄固定样本量，或对两组相关分数套用独立样本显著性检验。
## 21. 
记外层测试的日度净收益为 $r_1,\ldots,r_n$，它们已经按统一的成本与换手口径计算。预先固定年化交易日数 $A$、块长 $\ell$、重抽样次数 $B$ 与区间构造方法。原序列统计量为
$$
\bar r=\frac1n\sum_{t=1}^nr_t,
\qquad
\widehat S=\sqrt A\,\frac{\bar r}{s_r},
\qquad
s_r^2=\frac1{n-1}\sum_{t=1}^n(r_t-\bar r)^2.
$$
这里的 Sharpe 定义必须在研究前固定；若使用长期方差调整的自相关 Sharpe，则原序列和每次重抽样都必须改用同一个长期方差估计器，不能中途更换定义。

Moving block Bootstrap 先构造全部连续块
$$
\boldsymbol b_i=(r_i,\ldots,r_{i+\ell-1}),
\qquad i=1,\ldots,n-\ell+1.
$$
第 $b$ 次重抽样从这些块中等概率、有放回地抽取 $K=\lceil n/\ell\rceil$ 个，按抽得顺序拼接，并截去末尾多余观测，得到长度仍为 $n$ 的 $r_1^*,\ldots,r_n^*$。每次都必须重新计算
$$
\bar r_b^*=\frac1n\sum_{t=1}^nr_t^*,
\qquad
(s_b^*)^2=\frac1{n-1}\sum_{t=1}^n(r_t^*-\bar r_b^*)^2,
\qquad
\widehat S_b^*=\sqrt A\,\frac{\bar r_b^*}{s_b^*}.
$$
不能把原序列的均值或标准差冻结后只扰动另一项，否则 Sharpe 的抽样分布会被错误缩放。分别取 $\{\bar r_b^*\}$ 与 $\{\widehat S_b^*\}$ 的 $0.025$ 和 $0.975$ 经验分位数，可得到各自的百分之九十五百分位区间。若采用基本区间，则分别用原统计量的二倍减去重抽样分位数，并对整个构造使用同一组随机种子以便审计。

五期重叠会在收益中引入至少跨五期的机械依赖，波动状态又使自相关结构可能持续更久。连续块保留块内的重叠、短期自相关和波动聚集；块界则制造原本不存在的跳跃，且不同块的重合部分使有效独立块数少于表面块数。块长太短会切断依赖并低估波动，太长则可用块的位置和实质不同状态过少，区间也会不稳。非循环方案可保留时间方向，循环方案虽减少端点不均匀，却把期末与期初相接，二者都应作为边界处理敏感性而不是无条件优劣结论。

块长敏感性可预先报告 $\ell=5,10,20,60$ 等覆盖五期重叠及更长相关尺度的结果，并与经验自协方差衰减、各市场状态在重抽样中的出现比例共同检查。应报告区间随块长的完整变化，不能因某个块长给出最窄区间或最显著结果才选择它；增加 $B$ 只降低 Monte Carlo 误差，不能修补块长错误。若从底层仓位和标签重建收益，跨块持有期、成本与换手也必须按拼接后的信息序列重算，不能简单拼接已结算标签。

由于该策略是从三十个已经查看过同一测试期的候选中选出，上述区间只描述既定选中序列的时间序列抽样不确定性，没有计入模型选择、重复试验和优胜者偏差，也不是对三十次搜索的家族错误率控制。扩大重抽样次数或在同一测试期反复 Bootstrap 都不能恢复测试集的未触碰性；需要嵌套选择流程或新的外层数据。常见错误是直接独立打乱日期、把重抽样标准误除以原样本量两次、沿用原 Sharpe 分母，以及把条件于已选策略的区间解释为覆盖全部研究不确定性。
## 22. 
研究开始前应冻结书面协议，包括预测目标、标签持有期、可交易规则、Ridge 与 Lasso 的目标函数、超参数网格、内外层日期、筛选规则、成本假设、随机种子和主要评价指标。十年数据先按信息可得时间而不是事后修订时间建立逐时点数据库，保存原始数据快照、版本哈希和公司行动记录。每个交易日只能使用当时已公布且已过发布滞后的财务与行情字段，按历史股票池成分确定可投资集合，并保留退市、停牌和后来消失的股票，以消除生存者偏差。复权价格、成交量和公司行动要按当时可实施的方式处理，不能用最终数据库中的修订值覆盖历史信息状态。

数据清洗应记录重复值、异常值、缺失值和交易日对齐规则。任何插补、缩尾、行业或市值中性化以及因子标准化都在相应训练折内估计所需参数，再原样应用于验证或测试折；当月纯横截面秩变换也只能使用当时真实可交易的股票池，不能引入未来成分。禁止用未来观测回填缺失值，禁止先对十年全样本估计均值、标准差或中性化载荷再交叉验证。清洗日志应逐日保存输入覆盖率、剔除原因、参数版本和最终股票数，使任一历史预测都能重建。

可将最初六年作为首轮许可历史，其后四年按连续季度划成十六个外层测试块，具体块长也可在研究前另行固定。对每个外层块，只允许使用该块开始前的数据；所有模型比较、筛选和调参均在更早历史中的内层滚动训练段与验证段完成。内层每个候选都重新执行预处理、因子筛选和模型拟合，再对随后验证段产生预测。Ridge 与 Lasso 使用同一组内层切分和相同评价口径，按预先规定的平均预测损失或扣除成本后的效用选择算法及 $\lambda$；并列处理、重估频率和窗口类型不得查看外层结果后调整。

若采用 Bonferroni 筛选，应只在每个内层训练折中对一百个候选计算有效的边际检验，并将族水平 $0.05$ 分为单检验阈值
$$
\alpha_{\mathrm{single}}=\frac{0.05}{100}=0.0005.
$$
通过阈值的因子进入该折模型，验证折与外层折完全不参与筛选；该阈值在任意检验相关结构下控制族错误率，但边际检验本身仍须有效。若改用折内稳定性筛选，则只能在内层训练段内进行尊重时间依赖的区块重抽样或子抽样，按冻结的入选频率阈值保留因子，并在每个训练折重新运行。两种方法都不能先利用十年数据选因子，再把后续回归称为样本外流程。
设标签持有期为 $h$ 个交易日。在任何内层或外层边界，训练样本的标签区间都不得触及随后的验证或测试区间；应逐个起点删除跨界标签，并另行执行协议规定的隔离期。清除必须在内层每个滚动起点和外层每个起点分别进行，不能只在十年总样本末尾删一次。内层选出算法与超参数后，用该外层起点之前全部许可且标签已经成熟的历史重新运行预处理、筛选和拟合，冻结模型并对下一外层块预测。预测时间戳、所用数据截止时刻、因子名单、系数、惩罚参数和代码版本全部保存；外层块只用于当次评分，不得据其表现修改网格、筛选阈值或成本假设。

策略收益必须把预测转换为可成交的事前仓位，并考虑信号发布滞后、涨跌停、停牌、退市和预定再平衡时点。若 $w_{i,t}$ 表示目标权重，$w_{i,t^-}$ 表示交易前漂移权重，换手应明确按
$$
\operatorname{Turnover}_t=\sum_i|w_{i,t}-w_{i,t^-}|
$$
或其约定的单边版本计算，全文不得混用。每日从毛收益中扣除佣金、买卖价差、滑点、市场冲击及适用的融券和融资费用，成交价格与交易量必须受当时流动性约束。成本模型的任何校准也只能使用当时历史。最终同时报告毛收益、净收益、各项成本、换手、持仓约束、容量与回撤，不能只展示不计交易摩擦的信号相关性。

全部外层预测应按时间拼接，每个日期只能保留一个在信息截止点真实生成的预测。Ridge 与 Lasso 在相同日期和成本口径下作配对比较，不能把相邻外层块视为独立重复。对最终日度净收益使用 moving block Bootstrap，连续有放回抽块并拼到原长度；每个重抽样序列都重新计算平均净收益、波动率、Sharpe 比率及预定风险指标，再形成百分位或基本区间。块长须覆盖标签持有期和经验依赖尺度，并报告多个块长、边界处理与有限重抽样次数下的敏感性。若研究团队实际上查看过这些外层结果并反复修改方案，这些区间就不再包含搜索与模型选择不确定性，必须披露全部试验并另留真正未触碰的数据。

审计档案应包括协议时间戳、逐时点数据快照、代码与依赖版本、随机种子、内外层切分、所有候选试验、逐折筛选结果、预测、仓位、成交、成本及 Bootstrap 输出。常见错误是全样本标准化或筛选后只做模型交叉验证、只删除外层边界而漏掉内层重叠标签、把验证集当测试集反复调参、以毛收益替代可交易净收益，以及仅保存最终最优模型而丢弃失败试验和数据版本。
AIC、BIC 与学习理论界回答的问题并不相同。对给定似然模型，AIC 以 $-2\ell_{\max}+2k$ 修正训练对数似然的乐观偏差，目标是在相应正则条件下近似比较预期预测对数损失；它不是样本外策略收益区间，也不自动处理一百个因子的自适应搜索。BIC 以 $-2\ell_{\max}+k\log n$ 近似贝叶斯证据的负二倍尺度，主要用于固定维度、正规似然与合适先验下的模型比较和结构识别。两者的维数计数、方差参数处理和候选模型集合必须明确，不能把 Ridge 或 Lasso 的原始参数个数不加分析地当作有效自由度，也不能据较小准则值推断策略扣除成本后必然盈利。

学习理论界则在指定假设空间、损失和采样条件下，利用 VC 维、Rademacher 复杂度或范数控制，给出以一定概率同时适用于整类候选的泛化误差上界。它回答估计误差如何随样本量与容量变化，通常还需加上类内逼近误差才能解释总体最优风险；界往往保守，也不是对真实未来收益的精确预测。独立同分布或平稳依赖等假设受损时，原界不能直接沿用。常见错误是用 AIC 代替外层测试、把 BIC 当作交易成本模型，或把学习理论上界误读为实际亏损的概率上界。

即使最终外层测试的净收益显著为正，也不能排除未来制度变化、因子拥挤与 alpha 衰减、流动性和市场冲击上升、融券约束变化、极端行情及尾部相关、数据或公司行动错误、执行故障和容量不足。未披露的试验、研究者自由度、外层块之间的依赖和选中模型不确定性还可能使名义显著性偏乐观；区块 Bootstrap 只反映既定序列在所用依赖假设下的抽样波动，并不保证分布平稳。最终结论因此应限定为对冻结流程的历史样本外证据，而非未来盈利的确定性证明。