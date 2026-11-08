# 第9章　组合计数、概率空间与 Bayes 推断

概率计算中的许多错误并不是算术错误，而是对象没有被准确界定：把有序结果与无序结果混用，把条件概率误认为无条件概率，把两两独立误认为相互独立，或者由 $P(B\mid A)$ 直接跳到 $P(A\mid B)$。本章先建立计数工具，再用概率空间统一离散与连续模型，最后讨论条件化、独立性和 Bayes 更新。后续随机变量、期望和随机过程都建立在本章的符号与公理之上。

学习本章后，应能把文字问题转化为样本空间和事件，选择正确的计数方法，使用全概率公式与 Bayes 公式，并明确独立性在推导中究竟被用于哪一步。

## 9.1 组合计数的基本原则

### 9.1.1 加法原理与乘法原理

若一个任务可以分成互斥的若干类，第 $i$ 类有 $n_i$ 种完成方式，则总方式数为各类方式数之和。这里的“互斥”保证没有重复计数。若一个过程由 $k$ 个阶段组成，第 $i$ 阶段在前面选择固定后有 $n_i$ 种选择，则总方式数为 $\prod_{i=1}^k n_i$。乘法原理允许后一阶段的可选对象随前面选择改变，只要求选择的**数目**固定。

从 $n$ 个不同对象中有放回、按顺序抽取 $r$ 次，有 $n^r$ 种结果；无放回、按顺序抽取 $r$ 次，有

$$
n(n-1)\cdots(n-r+1)=\frac{n!}{(n-r)!}
$$

种排列。若只关心选出的集合而不关心顺序，则每 $r!$ 个排列对应同一个组合，故组合数为

$$
\binom nr=\frac{n!}{r!(n-r)!},\qquad 0\le r\le n.
\tag{9.1}
$$

组合数还满足对称性 $\binom nr=\binom n{n-r}$ 与 Pascal 恒等式

$$
\binom nr=\binom{n-1}r+\binom{n-1}{r-1}.
$$

后者可按“某个指定元素是否被选入”分类证明。这种按互斥情形分类的思想，与全概率公式在结构上完全相同。

**例 9.1（有序与无序）**

从 $1,2,\ldots,10$ 中任取三个不同数字，求三个数字之和为偶数的概率，假定每个三元素子集等可能。

**解**

总和为偶数有两种互斥类型：三个均为偶数，或一个偶数、两个奇数。集合中有五个偶数和五个奇数，因此有利子集数为

$$
\binom53+\binom51\binom52=10+50=60.
$$

所有三元素子集共 $\binom{10}3=120$ 个，故所求概率为 $60/120=1/2$。若把结果写成有序三元组，则分子分母都应乘以 $3!$，概率不变；但不能只在一边改用排列。

### 9.1.2 重复排列、隔板法与占位模型

从 $k$ 类对象中选 $n$ 个，同类对象不区分、每类数量不限，顺序不重要。设第 $i$ 类选 $x_i$ 个，则问题等价于非负整数解的个数：

$$
x_1+\cdots+x_k=n.
$$

把 $n$ 个相同星号与 $k-1$ 块隔板排成一行，隔板将星号分为 $k$ 组，因此解数为 $\binom{n+k-1}{k-1}$。若要求 $x_i\ge1$，先令 $y_i=x_i-1$，则解数为 $\binom{n-1}{k-1}$，其中 $n\ge k$。

隔板法只适用于“对象相同、类别有序”的计数。把 $n$ 个不同球放入 $k$ 个不同箱子并不是同一个问题；此时每个球都有 $k$ 种选择，通常有 $k^n$ 种放法。

### 9.1.3 容斥原理与抽屉原理

对有限集合 $A_1,\ldots,A_m$，容斥原理给出

$$
\left|\bigcup_{i=1}^m A_i\right|
=\sum_i|A_i|-\sum_{i<j}|A_i\cap A_j|
+\cdots+(-1)^{m+1}\left|\bigcap_{i=1}^m A_i\right|.
\tag{9.2}
$$

证明可检查任意元素 $x$ 在等式两边的计数次数。若 $x$ 恰好属于 $r$ 个集合，则右边计数为

$$
r-\binom r2+\binom r3-\cdots+(-1)^{r+1}\binom rr
=1-(1-1)^r=1,
$$

与左边一致。

**抽屉原理**（pigeonhole principle）指出：若 $n$ 个对象被放入 $m$ 个类别且 $n>m$，则至少一个类别含有两个或更多对象。其加强形式为：至少一个类别含有不少于 $\lceil n/m\rceil$ 个对象。抽屉原理常用于证明存在性，但不能直接给出具体对象。

**例 9.2（错排）**

求 $n$ 个不同元素的全排列中，没有元素留在原位置的排列数 $D_n$。

**解**

设 $A_i$ 为元素 $i$ 留在原位置的排列集合。对固定的 $j$ 个位置，这些位置全部不动的排列有 $(n-j)!$ 个。由容斥原理，至少一个位置不动的排列数为

$$
\sum_{j=1}^n(-1)^{j+1}\binom nj(n-j)!.
$$

因此

$$
D_n=n!\sum_{j=0}^n\frac{(-1)^j}{j!}.
$$

当 $n$ 较大时，$D_n/n!$ 接近 $e^{-1}$，但有限 $n$ 时必须保留求和余项。

## 9.2 样本空间、事件与概率空间

### 9.2.1 为什么不能只背概率公式

概率论研究的不是孤立数字，而是定义在某个可测结构上的集合函数。**样本空间**（sample space）$\Omega$ 是一次随机试验所有可能基本结果的集合；$\Omega$ 的子集称为事件。有限模型中通常可以把所有子集都作为事件，但在不可数空间或后续随机过程中，并非所有子集都适合赋予概率，因此引入 $\sigma$-代数。

**定义 9.1（$\sigma$-代数）**

设 $\mathcal F$ 是 $\Omega$ 的一族子集。若满足

1. $\Omega\in\mathcal F$；
2. 若 $A\in\mathcal F$，则 $A^c=\Omega\setminus A\in\mathcal F$；
3. 若 $A_1,A_2,\ldots\in\mathcal F$，则 $\bigcup_{n=1}^{\infty}A_n\in\mathcal F$，

则称 $\mathcal F$ 为 $\Omega$ 上的 **$\sigma$-代数**（$\sigma$-algebra），$(\Omega,\mathcal F)$ 称为可测空间。

由德摩根定律，可数个事件的交也属于 $\mathcal F$：

$$
\bigcap_n A_n=\left(\bigcup_n A_n^c\right)^c.
$$

空集为 $\Omega^c$，故也在 $\mathcal F$ 中。有限并与有限交通过取其余事件为空集或 $\Omega$ 即可得到。这里的可数封闭性不是形式装饰，而是研究极限事件、无穷次投掷和随机过程所必需的结构。

**定义 9.2（概率空间）**

设 $(\Omega,\mathcal F)$ 为可测空间。若函数 $\mathbb P:\mathcal F\to[0,1]$ 满足

1. 非负性：$\mathbb P(A)\ge0$；
2. 规范性：$\mathbb P(\Omega)=1$；
3. 可数可加性：若 $A_1,A_2,\ldots$ 两两不交，则
   $$\mathbb P\left(\bigcup_{n=1}^{\infty}A_n\right)=\sum_{n=1}^{\infty}\mathbb P(A_n),$$

则称 $\mathbb P$ 为概率测度，$(\Omega,\mathcal F,\mathbb P)$ 为**概率空间**（probability space）。

### 9.2.2 概率测度的基本性质

由 $\Omega=A\cup A^c$ 可得 $\mathbb P(A^c)=1-\mathbb P(A)$，特别地 $\mathbb P(\varnothing)=0$。若 $A\subseteq B$，把 $B$ 分解为 $A\cup(B\setminus A)$，可得

$$
\mathbb P(B)=\mathbb P(A)+\mathbb P(B\setminus A),
$$

从而 $\mathbb P(A)\le\mathbb P(B)$，且 $\mathbb P(B\setminus A)=\mathbb P(B)-\mathbb P(A)$。对任意两个事件，即使不互斥，也有

$$
\mathbb P(A\cup B)=\mathbb P(A)+\mathbb P(B)-\mathbb P(A\cap B).
$$

**定理 9.3（概率测度的连续性）**

若 $A_1\subseteq A_2\subseteq\cdots$，则

$$
\lim_{n\to\infty}\mathbb P(A_n)=\mathbb P\left(\bigcup_{n=1}^{\infty}A_n\right).
$$

若 $B_1\supseteq B_2\supseteq\cdots$，则

$$
\lim_{n\to\infty}\mathbb P(B_n)=\mathbb P\left(\bigcap_{n=1}^{\infty}B_n\right).
\tag{9.3}
$$

**证明**

先考虑递增序列。令 $C_1=A_1$，$C_n=A_n\setminus A_{n-1}$（$n\ge2$）。事件 $C_n$ 两两不交，且 $\bigcup_{n=1}^N C_n=A_N$。由有限可加性与可数可加性，

$$
\begin{aligned}
\lim_{N\to\infty}\mathbb P(A_N)
&=\lim_{N\to\infty}\sum_{n=1}^N\mathbb P(C_n)\\
&=\sum_{n=1}^{\infty}\mathbb P(C_n)
=\mathbb P\left(\bigcup_{n=1}^{\infty}A_n\right).
\end{aligned}
$$

对递减序列取补集 $A_n=B_n^c$，使用补概率公式和刚证明的递增情形即可。第二处使用 $\mathbb P(B_n)=1-\mathbb P(A_n)$ 时并不需要额外假设，因为概率总有限。

□

式（9.3）常被称为概率测度从下连续与从上连续。它与一般的集函数“连续性”不同，证明核心是可数可加性。

**定理 9.4（次可加性）**

对任意 $A_1,A_2,\ldots\in\mathcal F$，即使不互斥，也有

$$
\mathbb P\left(\bigcup_n A_n\right)\le\sum_n\mathbb P(A_n).
$$

**证明**

令 $D_1=A_1$，$D_n=A_n\setminus\bigcup_{k=1}^{n-1}A_k$。则 $D_n$ 两两不交，$D_n\subseteq A_n$，且 $\bigcup_nD_n=\bigcup_nA_n$。由可数可加性和单调性即得结论。

□

### 9.2.3 古典概率模型与建模选择

若 $\Omega=\{\omega_1,\ldots,\omega_N\}$，且每个单点事件概率均为 $1/N$，则

$$
\mathbb P(A)=\frac{|A|}{N}.
$$

这里“等可能”是模型假设，不是由“随机”二字自动推出。抽球时不放回通常使每个有序样本等可能，也使每个固定大小的无序子集等可能；但逐个结果的概率可能随历史改变，不能把整次试验等可能与每一步独立混为一谈。

**例 9.3（生日问题）**

假定一年有 $365$ 天，各人的生日独立且均匀分布，求 $n$ 个人中至少两人生日相同的概率，其中 $n\le365$。

**解**

所有有序生日组合有 $365^n$ 个。生日全不相同的组合有 $365\cdot364\cdots(365-n+1)$ 个，因此

$$
\mathbb P(\text{至少一对相同})
=1-\prod_{k=0}^{n-1}\frac{365-k}{365}.
$$

这里使用有序样本空间最自然，因为各人的生日是独立抽取的。独立均匀假设是对现实生日模型的简化，并非定理。

## 9.3 条件概率、全概率公式与独立性

### 9.3.1 条件概率是重新归一化

**定义 9.5（条件概率）**

若 $\mathbb P(B)>0$，定义在事件 $B$ 发生条件下 $A$ 的条件概率为

$$
\mathbb P(A\mid B)=\frac{\mathbb P(A\cap B)}{\mathbb P(B)}.
\tag{9.4}
$$

固定 $B$ 后，映射 $A\mapsto\mathbb P(A\mid B)$ 本身也是概率测度：它非负，在 $\Omega$ 上取值为 $1$，并保持可数可加性。条件化不是把 $A$ 的概率除以 $\mathbb P(B)$，而是把交集 $A\cap B$ 在缩小的样本空间 $B$ 中重新归一化。

由定义立即得到乘法公式 $\mathbb P(A\cap B)=\mathbb P(A\mid B)\mathbb P(B)$。对多个事件，在出现的条件概率均有定义时，

$$
\mathbb P(A_1\cap\cdots\cap A_n)
=\mathbb P(A_1)\prod_{k=2}^n\mathbb P(A_k\mid A_1\cap\cdots\cap A_{k-1}).
\tag{9.5}
$$

**定理 9.6（全概率公式）**

若 $B_1,B_2,\ldots$ 两两不交，$\mathbb P(B_i)>0$，且 $\bigcup_iB_i=\Omega$，则对任意事件 $A$，

$$
\mathbb P(A)=\sum_i\mathbb P(A\mid B_i)\mathbb P(B_i).
\tag{9.6}
$$

**证明**

事件 $A\cap B_i$ 两两不交，且其并为 $A$。由可数可加性及乘法公式即得。

□

全概率公式中的 $B_i$ 构成样本空间的**分割**。若遗漏某些情形或情形相互重叠，就不能直接相加。

### 9.3.2 Bayes 公式与证据更新

**定理 9.7（Bayes 公式）**

在定理 9.6 的分割条件下，若 $\mathbb P(A)>0$，则

$$
\mathbb P(B_j\mid A)
=\frac{\mathbb P(A\mid B_j)\mathbb P(B_j)}
{\sum_i\mathbb P(A\mid B_i)\mathbb P(B_i)}.
\tag{9.7}
$$

**证明**

由条件概率定义，左边等于 $\mathbb P(A\cap B_j)/\mathbb P(A)$。分子用乘法公式，分母用全概率公式即可。

□

在 Bayes 推断中，$B_j$ 是待判断的假设，$\mathbb P(B_j)$ 称为**先验概率**（prior probability），$\mathbb P(A\mid B_j)$ 称为该假设下证据 $A$ 的**似然**（likelihood），$\mathbb P(B_j\mid A)$ 称为**后验概率**（posterior probability）。似然是假设的函数时并不要求对 $j$ 求和等于 $1$；归一化的是后验概率。

**例 9.4（基础率不能被准确率替代）**

某状态在总体中的比例为 $1\%$。检测在该状态存在时呈阳性的概率为 $99\%$，在状态不存在时呈阳性的概率为 $2\%$。求随机一人检测阳性后确有该状态的概率。

**解**

设 $D$ 表示状态存在，$+$ 表示阳性。由 Bayes 公式，

$$
\mathbb P(D\mid +)
=\frac{0.99\times0.01}{0.99\times0.01+0.02\times0.99}
=\frac{0.0099}{0.0297}=\frac13.
$$

检测灵敏度很高并不意味着阳性后验概率接近 $99\%$，因为分母还包括数量更大的非 $D$ 人群产生的假阳性。

对两个互斥且穷尽假设 $H_0,H_1$，Bayes 公式还可写成后验赔率形式：

$$
\frac{\mathbb P(H_1\mid A)}{\mathbb P(H_0\mid A)}
=
\frac{\mathbb P(A\mid H_1)}{\mathbb P(A\mid H_0)}
\frac{\mathbb P(H_1)}{\mathbb P(H_0)}.
\tag{9.8}
$$

后验赔率等于似然比乘先验赔率。若新证据逐步到来，且在各假设下可以写出相应的条件似然，则后验可作为下一轮更新的先验；但不能在没有条件独立或适当模型时随意把多个似然相乘。

### 9.3.3 独立性

**定义 9.8（事件的独立性）**

事件 $A,B$ 独立，若

$$
\mathbb P(A\cap B)=\mathbb P(A)\mathbb P(B).
\tag{9.9}
$$

若 $\mathbb P(B)>0$，这等价于 $\mathbb P(A\mid B)=\mathbb P(A)$；若 $\mathbb P(A)>0$，也等价于 $\mathbb P(B\mid A)=\mathbb P(B)$。当条件事件概率为零时，式（9.9）仍可作为独立性的定义，而条件概率表达式不能使用。

一族事件 $\{A_i:i\in I\}$ 称为**相互独立**，若对其中任意有限个不同事件 $A_{i_1},\ldots,A_{i_k}$，都有

$$
\mathbb P(A_{i_1}\cap\cdots\cap A_{i_k})
=\prod_{j=1}^k\mathbb P(A_{i_j}).
$$

仅验证任意两事件独立称为两两独立，它不足以推出相互独立。

**例 9.5（两两独立不推出相互独立）**

独立投掷两枚公平硬币。令 $A$ 为第一枚为正面，$B$ 为第二枚为正面，$C$ 为两枚结果相同。则

$$
\mathbb P(A)=\mathbb P(B)=\mathbb P(C)=\frac12.
$$

任意两个事件的交都是四种等可能结果中的一个，概率为 $1/4$，所以三者两两独立。然而

$$
\mathbb P(A\cap B\cap C)=\frac14\ne\frac18
=\mathbb P(A)\mathbb P(B)\mathbb P(C).
$$

并且 $\mathbb P(C\mid A\cap B)=1$，说明在额外条件下原有的独立性可能消失。

独立性与互斥完全不同。若 $A,B$ 互斥且都具有正概率，则 $\mathbb P(A\cap B)=0$，但 $\mathbb P(A)\mathbb P(B)>0$，故它们不独立。互斥描述事件不能同时发生，独立描述一个事件的发生不改变另一个事件的概率。

**例 9.6（无放回抽样中的条件概率）**

袋中有 $a$ 个红球和 $b$ 个蓝球，逐个无放回抽取。求第二次抽到红球的概率。

**解**

用 $R_i$ 表示第 $i$ 次为红球。按第一次结果使用全概率公式：

$$
\begin{aligned}
\mathbb P(R_2)
&=\mathbb P(R_2\mid R_1)\mathbb P(R_1)
+\mathbb P(R_2\mid R_1^c)\mathbb P(R_1^c)\\
&=\frac{a-1}{a+b-1}\frac{a}{a+b}
+\frac{a}{a+b-1}\frac{b}{a+b}
=\frac{a}{a+b}.
\end{aligned}
$$

第二次与第一次并不独立，但第二次的无条件边际概率仍等于第一次为红球的概率。这一结论来自对称性，而不是独立性。

## 9.4 量化研究中的条件化与 Bayes 更新

设 $H$ 表示“某信号在当前市场状态下具有正向条件期望”，$E$ 表示一段新观察到的证据。研究记录至少应区分三个量：先验 $\mathbb P(H)$、证据在不同假设下的分布 $\mathbb P(E\mid H)$ 与 $\mathbb P(E\mid H^c)$、以及后验 $\mathbb P(H\mid E)$。只报告 $\mathbb P(E\mid H^c)$ 很小，并不能单独确定 $\mathbb P(H\mid E)$。

同样的逻辑适用于因子筛选。若在许多候选信号中反复选择表现最好的一个，观察到的“最优样本内表现”已经包含了选择事件。此时仍使用选择前的单因子概率模型，往往错误地改变了条件化对象。后续多重检验与回测过拟合章节将把这种直观转化为统计推断规则；本章需要先确立的原则是：**概率必须对应明确的概率空间，条件概率必须对应明确的条件事件。**

## 本章小结

组合计数要求先确定对象是否有序、是否可重复以及样本点是否等可能。加法原理处理互斥分类，乘法原理处理分阶段选择，容斥处理重叠集合，隔板法处理相同对象的非负整数分配。

概率空间 $(\Omega,\mathcal F,\mathbb P)$ 以 $\sigma$-代数规定可研究的事件，以可数可加性保证极限事件的概率能够合理定义。条件概率把样本空间限制到条件事件并重新归一化；全概率公式按分割加权，Bayes 公式反向计算假设的后验。独立性是乘积结构，不是互斥，也不能由两两独立推广到相互独立。后续随机变量理论将通过可测函数把这些事件组织为数值分布。

## 习题

1. 从 $1,\ldots,12$ 中选取四个不同数字。求恰好包含两个偶数的无序选法数，并说明若改用有序样本应如何保持一致。
2. 求方程 $x_1+x_2+x_3+x_4=15$ 的非负整数解数，以及满足 $x_i\ge2$（对所有 $i$）的整数解数。
3. 某班有 $50$ 名学生，每人参加数学、统计、编程三门课中的至少一门。已知参加人数分别为 $30,28,25$，两两同时参加人数为 $15,14,13$，三门都参加者为 $5$。求恰好参加两门课的人数。
4. 证明：任意 $n+1$ 个整数中，必有两个数之差能被 $n$ 整除。
5. 设 $\mathcal F$ 为 $\sigma$-代数且 $A_n\in\mathcal F$。证明 $\liminf_n A_n:=\bigcup_{n=1}^{\infty}\bigcap_{k=n}^{\infty}A_k$ 与 $\limsup_n A_n:=\bigcap_{n=1}^{\infty}\bigcup_{k=n}^{\infty}A_k$ 均属于 $\mathcal F$，并解释两个事件的含义。
6. 由概率公理证明：对任意事件列 $A_n$，$\mathbb P(\bigcup_{k=1}^nA_k)\le\sum_{k=1}^n\mathbb P(A_k)$，并进一步证明 $\mathbb P(\limsup_nA_n)\ge\limsup_n\mathbb P(A_n)$，给出一个严格不等式成立的例子。
7. 设 $A_1\subseteq A_2\subseteq\cdots$ 且 $\mathbb P(A_n)=1-1/(n+1)$。求 $\mathbb P(\bigcup_nA_n)$。若改为 $B_1\supseteq B_2\supseteq\cdots$ 且 $\mathbb P(B_n)=1/n$，求 $\mathbb P(\bigcap_nB_n)$。
8. 一袋有 $5$ 红球、$7$ 蓝球，无放回取三球。用乘法公式求依次为红、蓝、红的概率，并求三球中恰有两红的概率。
9. 证明：若 $\mathbb P(B)>0$，则 $Q(A)=\mathbb P(A\mid B)$ 是 $(\Omega,\mathcal F)$ 上的概率测度。
10. 事件 $A,B,C$ 相互独立，且概率分别为 $1/2,1/3,1/4$。求恰好一个事件发生的概率。
11. 构造一个概率空间及三个事件，使它们两两独立但不相互独立；不得直接使用例 9.5 的三个事件定义。
12. 设 $\mathbb P(A)=0.6$，$\mathbb P(B)=0.5$，$\mathbb P(A\cup B)=0.8$。求 $\mathbb P(A\mid B)$、$\mathbb P(B\mid A)$，并判断 $A,B$ 是否独立。
13. 三个机器生产同一零件，产量占比分别为 $50\%,30\%,20\%$，次品率分别为 $1\%,2\%,5\%$。随机取一件为次品，求它来自第三台机器的概率。
14. 某检测对患病者的灵敏度为 $95\%$，对非患病者的特异度为 $90\%$，患病率为 $0.5\%$。求阳性后的患病概率，并说明为何不能把它与灵敏度等同。
15. 在两个互斥假设 $H_0,H_1$ 下，先验赔率 $\mathbb P(H_1)/\mathbb P(H_0)=1/9$，证据的似然比 $\mathbb P(E\mid H_1)/\mathbb P(E\mid H_0)=27$。求后验概率 $\mathbb P(H_1\mid E)$。
16. 抛两颗公平骰子。令 $A$ 为点数和为 $8$，$B$ 为第一颗为偶数。求 $\mathbb P(A\mid B)$ 与 $\mathbb P(B\mid A)$，并解释二者为何不同。
17. 某箱中初始有一红一蓝两球。每次随机抽一球，放回并再加入一个同色球。求前两次均抽到红球的概率，并判断“第 $n$ 次抽红球”的无条件概率是否始终为 $1/2$，给出推导。
18. 一位研究者测试 $100$ 个信号后发现其中一个在历史样本中显著。仅用本章的逻辑与条件化思想，说明为什么不能直接把“单个预先指定信号的显著性概率模型”照搬到这个被选中的信号。不要求计算校正后的 $p$ 值。
