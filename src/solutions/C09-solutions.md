# 第9章习题参考答案与解析

## 1.

四个数字中恰有两个偶数，另两个必为奇数。$1,\ldots,12$ 中各有六个奇数和六个偶数，故无序选法为

$$
\binom62\binom62=15\times15=225.
$$

若使用有序样本，每个四元素子集对应 $4!$ 个排列，因此有利结果与总结果分别为 $225\cdot4!$ 和 $12\cdot11\cdot10\cdot9$。两者相除同样得到无序模型下的 $225/\binom{12}4$。关键是分子分母采用同一计数口径。

## 2.

非负整数解由隔板法为

$$
\binom{15+4-1}{4-1}=\binom{18}3=816.
$$

若所有 $x_i\ge2$，令 $y_i=x_i-2\ge0$，则

$$
y_1+y_2+y_3+y_4=15-8=7.
$$

故解数为 $\binom{7+4-1}{3}=\binom{10}3=120$。第一问没有正整数限制，不能误用 $\binom{14}3$。

## 3.

设 $N_j$ 为恰好参加 $j$ 门课的人数。三门都参加者为 $N_3=5$。两两参加人数之和 $15+14+13=42$ 中，每个恰好参加两门者被计一次，每个参加三门者被计三次，因此

$$
42=N_2+3N_3=N_2+15.
$$

故 $N_2=27$。若需要核验，容斥给出至少参加一门者为 $30+28+25-42+5=46$，于是恰好参加一门者为 $46-27-5=14$，各人数均非负。

## 4.

整数除以 $n$ 的余数只有 $0,1,\ldots,n-1$ 共 $n$ 类。$n+1$ 个整数中，由抽屉原理，必有两个数 $a,b$ 余数相同。写成 $a=qn+r$、$b=sn+r$，则 $a-b=(q-s)n$，故 $n\mid(a-b)$。这里证明的是存在性，并不需要找出具体整数。

## 5.

对每个固定的 $n$，$\bigcap_{k=n}^{\infty}A_k$ 是可测事件的可数交，故属于 $\mathcal F$；再对 $n$ 取可数并，得到 $\liminf_nA_n\in\mathcal F$。同理，$\bigcup_{k=n}^{\infty}A_k$ 可测，再取可数交得到 $\limsup_nA_n\in\mathcal F$。

$\liminf_nA_n$ 表示“从某个位置起，所有 $A_k$ 都发生”，即事件最终持续发生；$\limsup_nA_n$ 表示“无论 $n$ 多大，后面仍有某个 $A_k$ 发生”，即事件无穷多次发生。二者分别可简记为“最终发生”和“无限频繁发生”。

## 6.

有限次可加性配合拆分 $D_k=A_k\setminus\bigcup_{j<k}A_j$ 可得

$$
\mathbb P\left(\bigcup_{k=1}^nA_k\right)
=\sum_{k=1}^n\mathbb P(D_k)
\le\sum_{k=1}^n\mathbb P(A_k).
$$

令 $B_n=\bigcup_{k=n}^{\infty}A_k$，则 $B_n$ 递减至 $\limsup_nA_n$。对每个 $k\ge n$，$A_k\subseteq B_n$，所以 $\mathbb P(A_k)\le\mathbb P(B_n)$，进而

$$
\sup_{k\ge n}\mathbb P(A_k)\le\mathbb P(B_n).
$$

令 $n\to\infty$，由概率从上连续得到

$$
\limsup_n\mathbb P(A_n)\le\mathbb P(\limsup_nA_n).
$$

严格不等式的例子：在 $[0,1]$ 上取均匀概率，令 $A_{2n-1}=(0,1/2)$、$A_{2n}=(1/2,1)$。则每个 $\mathbb P(A_n)=1/2$，但 $\limsup_nA_n=(0,1)$，其概率为 $1$。

## 7.

由概率从下连续，

$$
\mathbb P\left(\bigcup_nA_n\right)
=\lim_{n\to\infty}\left(1-\frac1{n+1}\right)=1.
$$

由概率从上连续，

$$
\mathbb P\left(\bigcap_nB_n\right)=\lim_{n\to\infty}\frac1n=0.
$$

第二问不能仅凭每个 $B_n$ 概率为正就断言交事件概率为正；无限递减过程中概率的极限可以为零。

## 8.

依次红、蓝、红的概率由乘法公式为

$$
\frac5{12}\times\frac7{11}\times\frac4{10}
=\frac{140}{1320}=\frac7{66}.
$$

恰有两红有 $RRB,RBR,BRR$ 三种位置模式。每一种的概率都等于

$$
\frac{5\cdot4\cdot7}{12\cdot11\cdot10}=\frac7{66},
$$

故所求为 $3\times7/66=7/22$。也可用超几何计数 $\binom52\binom71/\binom{12}3$ 验证。

## 9.

对任意 $A\in\mathcal F$，$Q(A)\ge0$。又

$$
Q(\Omega)=\frac{\mathbb P(\Omega\cap B)}{\mathbb P(B)}=1.
$$

若 $A_1,A_2,\ldots$ 两两不交，则 $A_i\cap B$ 也两两不交。由 $\mathbb P$ 的可数可加性，

$$
\begin{aligned}
Q\left(\bigcup_iA_i\right)
&=\frac{\mathbb P\left(\bigcup_i(A_i\cap B)\right)}{\mathbb P(B)}\\
&=\sum_i\frac{\mathbb P(A_i\cap B)}{\mathbb P(B)}
=\sum_iQ(A_i).
\end{aligned}
$$

因此 $Q$ 满足概率测度的三条公理。注意条件概率定义需要 $\mathbb P(B)>0$。

## 10.

恰好一个事件发生可拆成三个互斥事件。所求为

$$
\begin{aligned}
&\mathbb P(A)\mathbb P(B^c)\mathbb P(C^c)
+\mathbb P(A^c)\mathbb P(B)\mathbb P(C^c)
+\mathbb P(A^c)\mathbb P(B^c)\mathbb P(C)\\
&=\frac12\frac23\frac34+\frac12\frac13\frac34+\frac12\frac23\frac14
=\frac14+\frac18+\frac1{12}=\frac{11}{24}.
\end{aligned}
$$

这里使用了相互独立事件的补集仍保持相应乘积性质；例如由 $A,B$ 独立可推出 $A,B^c$ 独立。

## 11.

取 $\Omega=\{1,2,3,4\}$，四个结果等可能，概率均为 $1/4$。定义

$$
A=\{1,2\},\qquad B=\{1,3\},\qquad C=\{1,4\}.
$$

三者概率均为 $1/2$。任意两个事件的交都是 $\{1\}$，概率为 $1/4$，故两两独立。但

$$
\mathbb P(A\cap B\cap C)=\mathbb P(\{1\})=\frac14
\ne\frac18=\mathbb P(A)\mathbb P(B)\mathbb P(C).
$$

所以三者不相互独立。该例也说明，两两独立不能用来计算三重交集的乘积。

## 12.

由并集公式，

$$
\mathbb P(A\cap B)=0.6+0.5-0.8=0.3.
$$

因此

$$
\mathbb P(A\mid B)=\frac{0.3}{0.5}=0.6,
\qquad
\mathbb P(B\mid A)=\frac{0.3}{0.6}=0.5.
$$

又 $\mathbb P(A)\mathbb P(B)=0.6\times0.5=0.3=\mathbb P(A\cap B)$，故 $A,B$ 独立。两个条件概率数值不同是因为分母所对应的条件事件不同。

## 13.

设 $M_i$ 表示零件来自第 $i$ 台机器，$D$ 表示次品。全概率给出

$$
\mathbb P(D)=0.01\times0.5+0.02\times0.3+0.05\times0.2=0.021.
$$

由 Bayes 公式，

$$
\mathbb P(M_3\mid D)=\frac{0.05\times0.2}{0.021}=\frac{0.01}{0.021}=\frac{10}{21}\approx0.4762.
$$

第三台机器产量最小，但其次品率较高，所以其在次品中的后验占比远高于 $20\%$。

## 14.

灵敏度为 $\mathbb P(+\mid D)=0.95$，特异度为 $\mathbb P(-\mid D^c)=0.90$，故假阳性率 $\mathbb P(+\mid D^c)=0.10$。于是

$$
\mathbb P(D\mid +)
=\frac{0.95\times0.005}{0.95\times0.005+0.10\times0.995}
=\frac{0.00475}{0.10425}\approx0.04556.
$$

阳性后的患病概率约为 $4.56\%$。灵敏度描述的是患病者中出现阳性的比例，而所求是阳性者中患病的比例；两者方向相反，且后者受到基础患病率和假阳性率影响。

## 15.

后验赔率等于似然比乘先验赔率：

$$
\frac{\mathbb P(H_1\mid E)}{\mathbb P(H_0\mid E)}
=27\times\frac19=3.
$$

由于两个假设互斥且穷尽，后验概率和为 $1$。若 $\mathbb P(H_1\mid E)=p$，则 $p/(1-p)=3$，故 $p=3/4$。不能直接把赔率 $3$ 当作概率 $3$ 或 $1/3$。

## 16.

两颗骰子的 $36$ 个有序结果等可能。事件 $A$ 包含

$$
(2,6),(3,5),(4,4),(5,3),(6,2)
$$

共五个结果。$B$ 有 $3\times6=18$ 个结果，其中 $A\cap B$ 为 $(2,6),(4,4),(6,2)$，共三个。因此

$$
\mathbb P(A\mid B)=\frac{3/36}{18/36}=\frac16,
\qquad
\mathbb P(B\mid A)=\frac{3/36}{5/36}=\frac35.
$$

前者在和为 $8$ 之前先限制第一颗为偶数，后者则先限制点数和为 $8$；条件事件不同，分母和保留的样本点均不同。

## 17.

由乘法公式，

$$
\mathbb P(R_1\cap R_2)=\frac12\times\frac23=\frac13,
$$

其中 $R_n$ 表示第 $n$ 次抽红球。

证明 $\mathbb P(R_n)=1/2$ 需要利用整缸 composition 的期望，而不能只假设独立性。设 $M_n$ 为前 $n$ 次操作后缸中的红球数，总球数为 $n+2$，且 $M_0=1$。若 $\mathbb E[M_n]=(n+2)/2$，则给定前 $n$ 次历史后第 $n+1$ 次抽红球的条件概率为 $M_n/(n+2)$，故

$$
\mathbb P(R_{n+1})=\mathbb E\left[\frac{M_n}{n+2}\right]=\frac12.
$$

又 $M_{n+1}=M_n+\mathbf1_{R_{n+1}}$，所以

$$
\mathbb E[M_{n+1}]=\frac{n+2}{2}+\frac12=\frac{n+3}{2}.
$$

由归纳法，对所有 $n$ 都有 $\mathbb P(R_n)=1/2$。尽管边际概率不变，各次抽球并不独立，例如 $\mathbb P(R_2\mid R_1)=2/3\ne1/2$。

## 18.

单个预先指定信号的检验通常以“该信号已经固定、尚未观察其表现”为建模起点。研究者从 $100$ 个信号中挑出一个，是因为它在样本内表现显著；被分析的对象因此依赖于数据，分析事件也包含了“成为最优者”的选择信息。

设 $S_j$ 表示第 $j$ 个信号显著，$J$ 表示被选中的下标。研究者观察到的是类似 $\max_jS_j$ 或 $S_J$ 的对象，而不是某个事先固定的 $S_1$。一般而言，

$$
\mathbb P\left(\bigcup_{j=1}^{100}S_j\right)
$$

与单个 $\mathbb P(S_j)$ 不同，$S_J$ 的分布也可能不同于固定下标信号的分布。选择还可能利用同一批数据，使后续“确认”不再独立。因此需要重新界定样本空间、选择规则与条件事件，并使用多重检验或独立样本外验证；不能在未建模选择过程时照搬单信号概率结论。
