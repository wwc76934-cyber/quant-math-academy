# 第4章习题参考答案与解析

## 1. 
   （a）是。若 $x+2y=0$，任意线性组合仍满足该齐次线性方程；也可用子空间判别法直接验证。
   （b）不是。零向量 $(0,0)$ 不满足 $x+2y=1$，故该集合不是子空间。它是直线，也是仿射子空间。
   （c）不是。$\mathbb Z^2$ 对整数加法封闭，但对实数数乘不封闭，例如 $(1,0)\in\mathbb Z^2$，而 $\frac12(1,0)=(\frac12,0)\notin\mathbb Z^2$。
   （d）是。两个子空间的交仍是子空间；本题交集为 $\{(t,t,t):t\in\mathbb R\}$，也可直接验证其封闭性。

## 2. 
   令
   $$
   a(1,1,0)^\top+b(0,1,1)^\top=(1,0,1)^\top.
   $$
   比较坐标得 $a=1$、$a+b=0$、$b=1$，即 $a=1,b=-1$，但第三式要求 $b=1$，矛盾。因此 $\boldsymbol b$ 不属于该张成空间，不存在任何表示。常见错误是只解前两个方程而不检查第三个方程。

## 3. 
   记 $p_1=1+x,p_2=1+x^2,p_3=2+x+x^2$，则 $p_3=p_1+p_2$，所以
   $$
   p_1+p_2-p_3=0,
   $$
   三个系数不全为零，故线性相关。又因为
   $$
   a(1+x)+b(1+x^2)=(a+b)+ax+bx^2=0
   $$
   迫使 $a=b=0$，所以 $p_1,p_2$ 线性无关。第三个多项式不增加张成空间，故 $(p_1,p_2)$ 就是张成空间的一组基，维数为 $2$。

## 4. 
   两个向量不成比例，故线性无关；在二维空间中，两个线性无关向量构成基。也可直接解
   $$
   (x,y)=a(1,1)+b(1,-1),
   $$
   得 $a=(x+y)/2,b=(x-y)/2$，说明任意向量均有唯一表示。代入 $(5,1)$，得 $a=3,b=2$，故坐标为 $(3,2)^\top$。验证：$3(1,1)+2(1,-1)=(5,1)$。

## 5. 
   先写
   $$
   (x,y)=a(1,1)+b(1,-1),
   $$
   其中 $a=(x+y)/2,b=(x-y)/2$。由线性性，
   $$
   T(x,y)=a(2,0)+b(0,2)=(2a,2b)=(x+y,x-y).
   $$
   因而标准矩阵为
   $$
   \boldsymbol A=\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
   $$
   这里的关键不是猜公式，而是利用 $T$ 在一组基上的取值已经将其唯一确定。

## 6. 
   对 $p(x)=a+bx+cx^2+dx^3$，
   $$
   Dp=b+2cx+3dx^2.
   $$
   $Dp=0$ 当且仅当 $b=c=d=0$，故核为常数多项式空间，$\dim\ker D=1$。像恰好是 $P_2$，因为任意 $q\in P_2$ 都可积分得到原像，所以 $\dim\operatorname{im}D=3$。由于 $\dim P_3=4$，有 $4=1+3$，与秩—零化度定理一致。

## 7. 
   前两个方程相减得 $(a-1)y=1$。若 $a=1$，前两式变成 $x+y=1$ 和 $x+y=2$，显然无解。
   若 $a\ne1$，前两式唯一确定
   $$
   y=\frac1{a-1},\qquad x=1-\frac1{a-1}=\frac{a-2}{a-1}.
   $$
   第三个方程的左边恰为前两个方程左边之和，因此其右端必须等于 $1+2=3$。所以：
   - $a=1$ 时，无论 $b$ 为何值均无解；
   - $a\ne1$ 且 $b=3$ 时，有唯一解；
   - $a\ne1$ 且 $b\ne3$ 时，无解。
   本题不存在无穷多解的情形。

## 8. 
   对矩阵作行变换：
   $$
   \begin{aligned}
   \boldsymbol A
   &\to
   \begin{pmatrix}
   1&2&1&0\\
   0&0&-2&2\\
   0&0&2&2
   \end{pmatrix}\\
   &\to
   \begin{pmatrix}
   1&2&1&0\\
   0&0&-2&2\\
   0&0&0&4
   \end{pmatrix}.
   \end{aligned}
   $$
   有 $3$ 个主元，故秩为 $3$。齐次方程由最后一行得 $x_4=0$，第二行给出 $x_3=x_4=0$，第一行给出 $x_1=-2x_2$。$x_2$ 是自由变量，故
   $$
   \boldsymbol x=t(-2,1,0,0)^\top.
   $$
   零空间的一组基为 $\{(-2,1,0,0)^\top\}$，零化度为 $1$，并且 $4=3+1$。

## 9. 
   用第二行减去第一行的 $2$ 倍，得
   $$
   \boldsymbol U=\begin{pmatrix}2&1\\0&1\end{pmatrix},
   \qquad
   \boldsymbol L=\begin{pmatrix}1&0\\2&1\end{pmatrix}.
   $$
   可直接验证 $\boldsymbol L\boldsymbol U=\boldsymbol A$。先解 $\boldsymbol L\boldsymbol y=(3,7)^\top$：
   $$
   y_1=3,\qquad 2y_1+y_2=7\Rightarrow y_2=1.
   $$
   再解 $\boldsymbol U\boldsymbol x=\boldsymbol y$：由 $x_2=1$ 和 $2x_1+x_2=3$ 得 $x_1=1$。故 $\boldsymbol x=(1,1)^\top$。

## 10. 
   设秩 $r=4$，矩阵有 $7$ 行、$10$ 列，则
   $$
   \dim\mathcal C(\boldsymbol A)=4,\qquad
   \dim\mathcal C(\boldsymbol A^\top)=4,
   $$
   $$
   \dim\mathcal N(\boldsymbol A)=10-4=6,\qquad
   \dim\mathcal N(\boldsymbol A^\top)=7-4=3.
   $$
   前两个空间分别是 $\mathbb R^7$ 和 $\mathbb R^{10}$ 的子空间，后两个分别属于 $\mathbb R^{10}$ 和 $\mathbb R^7$，不能因维数相同而视为同一空间。

## 11. 
   若 $T$ 单射且 $T(\boldsymbol x)=\boldsymbol0=T(\boldsymbol0)$，则 $\boldsymbol x=\boldsymbol0$，故核为零。反之，若核为零且 $T(\boldsymbol u)=T(\boldsymbol v)$，则
   $$
   T(\boldsymbol u-\boldsymbol v)=\boldsymbol0
   \Rightarrow \boldsymbol u-\boldsymbol v=\boldsymbol0,
   $$
   所以 $T$ 单射。
   若 $\dim V>\dim W$，由秩—零化度定理，
   $$
   \dim\ker T=\dim V-\dim\operatorname{im}T
   \ge \dim V-\dim W>0,
   $$
   故核必含非零向量，$T$ 不可能单射。这里使用了 $\operatorname{im}T\subseteq W$，所以像的维数不超过 $\dim W$。

## 12. 
   矩阵两行不成比例，故秩为 $2$。行空间的一组基可取
   $$
   \{(1,1,0)^\top,(0,1,1)^\top\}.
   $$
   列空间是 $\mathbb R^2$，因为秩等于行数，故可取标准基 $\{(1,0)^\top,(0,1)^\top\}$。
   解 $\boldsymbol A\boldsymbol x=0$ 得 $x_1+x_2=0,x_2+x_3=0$，所以
   $$
   (x_1,x_2,x_3)=t(-1,1,-1),
   $$
   零空间的一组基为 $\{(-1,1,-1)^\top\}$。左零空间维数为 $2-2=0$，只有零向量，其基为空集。

## 13. 
   沿第一行展开：
   $$
   \det\boldsymbol A
   =1\cdot\det\begin{pmatrix}1&a\\0&1\end{pmatrix}
   -a\det\begin{pmatrix}0&a\\a&1\end{pmatrix}
   =1+a^3.
   $$
   在实数范围内，矩阵可逆当且仅当 $a\ne-1$。当 $a=-1$ 时行列式为零，秩小于 $3$，存在非零零空间向量。

## 14. 
   第三行减去第一行的 $2$ 倍，行列式不变：
   $$
   \begin{pmatrix}
   1&2&0&1\\
   0&1&3&0\\
   0&0&1&1\\
   0&0&2&1
   \end{pmatrix}.
   $$
   再将第四行减去第三行的 $2$ 倍，得到上三角矩阵，最后一行为 $(0,0,0,-1)$。因此行列式等于对角元乘积：
   $$
   \det\boldsymbol A=1\cdot1\cdot1\cdot(-1)=-1.
   $$
   倍加行变换不改变行列式，但若使用换行或数乘某行，必须相应修正符号或倍数。

## 15. 
   若 $\boldsymbol A$ 可逆且 $\boldsymbol A\boldsymbol B=\boldsymbol0$，左乘 $\boldsymbol A^{-1}$ 得 $\boldsymbol B=\boldsymbol0$。不可逆矩阵之间可以出现非零零因子，例如
   $$
   \boldsymbol A=\begin{pmatrix}1&0\\0&0\end{pmatrix},
   \qquad
   \boldsymbol B=\begin{pmatrix}0&0\\0&1\end{pmatrix},
   $$
   两者均非零，但 $\boldsymbol A\boldsymbol B=\boldsymbol0$。这也说明实数中“乘积为零则至少一个因子为零”的规则不能直接推广到矩阵。

## 16. 
   任意列空间向量可写为
   $$
   (\boldsymbol A+\boldsymbol B)\boldsymbol x
   =\boldsymbol A\boldsymbol x+\boldsymbol B\boldsymbol x
   \in\mathcal C(\boldsymbol A)+\mathcal C(\boldsymbol B).
   $$
   因此
   $$
   \mathcal C(\boldsymbol A+\boldsymbol B)
   \subseteq\mathcal C(\boldsymbol A)+\mathcal C(\boldsymbol B),
   $$
   右端的维数不超过两个空间维数之和，故结论成立。若 $\boldsymbol B=\boldsymbol A$ 且 $\boldsymbol A\ne\boldsymbol0$，则 $\boldsymbol A+\boldsymbol B=2\boldsymbol A$，等号成立；单位矩阵与自身相加也是直接例子。

## 17. 
   若对某个 $\boldsymbol b$ 存在两个不同解 $\boldsymbol x_1,\boldsymbol x_2$，则
   $$
   \boldsymbol A(\boldsymbol x_1-\boldsymbol x_2)=\boldsymbol0,
   $$
   且差非零，故零空间非平凡。反之，若零空间含非零 $\boldsymbol z$，任取一个特解 $\boldsymbol x_p$，则 $\boldsymbol x_p$ 与 $\boldsymbol x_p+\boldsymbol z$ 是同一右端项的两个不同解。若尚未给定右端项，可取 $\boldsymbol b=\boldsymbol A\boldsymbol x_p$。核心结论是：解的唯一性只由核决定，与右端项无关。

## 18. 
   两式相加、相减分别得到
   $$
   w_1+w_3=\frac12,\qquad w_2+w_4=\frac12.
   $$
   令 $w_1=s,w_2=t$，则
   $$
   \boldsymbol w=
   \left(s,t,\frac12-s,\frac12-t\right)^\top
   =\left(0,0,\frac12,\frac12\right)^\top
   +s(1,0,-1,0)^\top+t(0,1,0,-1)^\top.
   $$
   两个约束矩阵的行不成比例，秩为 $2$，故自由维数为 $4-2=2$。

## 19. 
   因为 $\operatorname{rank}\boldsymbol B=k$，列空间是 $\mathbb R^k$ 的 $k$ 维子空间，故列空间就是整个 $\mathbb R^k$。任意 $\boldsymbol h\in\mathbb R^k$ 都可写成列向量的线性组合，所以必有解。由秩—零化度定理，
   $$
   \dim\mathcal N(\boldsymbol B)=n-k.
   $$
   任取特解 $\boldsymbol w_p$，全部解为 $\boldsymbol w_p+\mathcal N(\boldsymbol B)$，故自由维数为 $n-k$。满行秩保证总有解，但不保证解唯一。

## 20. 
   第三个约束恰为第二个约束的 $2$ 倍，因此不增加任何新信息。约束矩阵的秩为 $2$，而不是 $3$。由第一式 $w_1=1-w_2-w_3$，代入第二式得
   $$
   1+w_2+2w_3=0.
   $$
   令 $w_3=t$，则 $w_2=-1-2t,w_1=2+t$，所以
   $$
   \boldsymbol w=(2,-1,0)^\top+t(1,-2,1)^\top.
   $$
   自由维数为 $3-2=1$。三个约束中有一个冗余，独立约束只有两个；自由度由变量数减去约束矩阵的秩决定，而不是由写出的约束条数决定。
