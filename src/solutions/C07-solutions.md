# 第7章习题参考答案与解析

## 1. 

二次型 $f(x_1,x_2,x_3)=2x_1^{2}+3x_2^{2}-x_3^{2}+4x_1x_2-2x_1x_3+6x_2x_3$ 中，平方项系数分别对应对称矩阵的主对角线元素，交叉项系数由对称位置的两个相等元素平分。因此，二次型矩阵 $\boldsymbol{A}=(a_{ij})\in\mathbb R^{3\times 3}$ 满足：
$$
a_{11}=2,\quad a_{22}=3,\quad a_{33}=-1
$$
$$
a_{12}=a_{21}=\frac{4}{2}=2,\quad a_{13}=a_{31}=\frac{-2}{2}=-1,\quad a_{23}=a_{32}=\frac{6}{2}=3
$$
由此写出对应的实对称矩阵为：
$$
\boldsymbol{A}=\begin{bmatrix}2 & 2 & -1\\ 2 & 3 & 3\\ -1 & 3 & -1\end{bmatrix}
$$
设向量 $\boldsymbol{x}=[x_1,x_2,x_3]^{\top}$，展开二次型矩阵乘积验证：
$$
\boldsymbol{A}\boldsymbol{x}=\begin{bmatrix}2x_1+2x_2-x_3\\ 2x_1+3x_2+3x_3\\ -x_1+3x_2-x_3\end{bmatrix}
$$
进一步计算内积 $\boldsymbol{x}^{\top}(\boldsymbol{A}\boldsymbol{x})$：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=x_1(2x_1+2x_2-x_3)+x_2(2x_1+3x_2+3x_3)+x_3(-x_1+3x_2-x_3)
$$
逐项展开整理同类项：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=2x_1^{2}+3x_2^{2}-x_3^{2}+(2+2)x_1x_2+(-1-1)x_1x_3+(3+3)x_2x_3
$$
即：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=2x_1^{2}+3x_2^{2}-x_3^{2}+4x_1x_2-2x_1x_3+6x_2x_3=f(x_1,x_2,x_3)
$$
验证与原式完全一致。

**常见错误做法剖析**：本题常见错误在于处理交叉项时直接将交叉项系数填入矩阵单侧非对角元，而另一侧置零或填入不对称的数值。例如误写出非对称矩阵 $\begin{bmatrix}2 & 4 & -2\\ 0 & 3 & 6\\ 0 & 0 & -1\end{bmatrix}$。虽然该非对称矩阵计算 $\boldsymbol{x}^{\top}\boldsymbol{B}\boldsymbol{x}$ 数值上同样等于 $f$，但二次型的标准矩阵代数表示严格要求矩阵具有对称性，即 $\boldsymbol{A}=\frac{1}{2}(\boldsymbol{B}+\boldsymbol{B}^{\top})$，只有对称矩阵才能直接应用谱分解与正负惯性指数定理。

## 2. 

给定二次型 $f(x_1,x_2,x_3)=x_1^{2}+2x_2^{2}+5x_3^{2}+2x_1x_2+2x_1x_3-8x_2x_3$。

首先对含 $x_1$ 的项集中配方：
$$
x_1^{2}+2x_1(x_2+x_3)=(x_1+x_2+x_3)^{2}-(x_2+x_3)^{2}
$$
代入原式并整理剩余关于 $x_2,x_3$ 的二次项：
$$
f=(x_1+x_2+x_3)^{2}-(x_2^{2}+2x_2x_3+x_3^{2})+2x_2^{2}+5x_3^{2}-8x_2x_3
$$
合并同类项后得：
$$
f=(x_1+x_2+x_3)^{2}+x_2^{2}-10x_2x_3+4x_3^{2}
$$
继续对含 $x_2$ 的项配方：
$$
x_2^{2}-10x_2x_3=(x_2-5x_3)^{2}-25x_3^{2}
$$
代回整理得到平方和形式：
$$
f=(x_1+x_2+x_3)^{2}+(x_2-5x_3)^{2}-21x_3^{2}
$$
令线性坐标变换为：
$$
\begin{cases}y_1=x_1+x_2+x_3\\ y_2=x_2-5x_3\\ y_3=x_3\end{cases}
$$
写成矩阵形式 $\boldsymbol{y}=\boldsymbol{C}\boldsymbol{x}$，其中变换矩阵为：
$$
\boldsymbol{C}=\begin{bmatrix}1 & 1 & 1\\ 0 & 1 & -5\\ 0 & 0 & 1\end{bmatrix}
$$
由于 $\det\boldsymbol{C}=1\ne 0$，矩阵 $\boldsymbol{C}$ 可逆。根据 $\boldsymbol{x}=\boldsymbol{P}\boldsymbol{y}$，求其逆矩阵可得可逆线性替换矩阵 $\boldsymbol{P}=\boldsymbol{C}^{-1}$：
$$
\begin{cases}x_3=y_3\\ x_2=y_2+5y_3\\ x_1=y_1-(y_2+5y_3)-y_3=y_1-y_2-6y_3\end{cases}
$$
即：
$$
\boldsymbol{P}=\begin{bmatrix}1 & -1 & -6\\ 0 & 1 & 5\\ 0 & 0 & 1\end{bmatrix}
$$
在该可逆线性替换下，二次型化为标准形：
$$
f=y_1^{2}+y_2^{2}-21y_3^{2}
$$
标准形中正项系数个数为 $2$，负项系数个数为 $1$，故正惯性指数 $p=2$，负惯性指数 $q=1$，符号差为 $p-q=1$。

**常见错误做法剖析**：一是混淆坐标变换关系 $\boldsymbol{x}=\boldsymbol{P}\boldsymbol{y}$ 与过渡矩阵 $\boldsymbol{y}=\boldsymbol{C}\boldsymbol{x}$，误将上三角矩阵 $\boldsymbol{C}$ 直接写为坐标替换矩阵 $\boldsymbol{P}$；二是在配方提取负号或移项合并同类项时出现符号失误，例如误将 $-(x_2+x_3)^{2}$ 拆开时遗漏交叉项符号导致后续系数算错。

## 3. 

二次型 $f=2x_1x_2+2x_1x_3+2x_2x_3$ 的实对称矩阵为：
$$
\boldsymbol{A}=\begin{bmatrix}0 & 1 & 1\\ 1 & 0 & 1\\ 1 & 1 & 0\end{bmatrix}
$$
计算特征多项式：
$$
\det(\lambda\boldsymbol{I}-\boldsymbol{A})=\begin{vmatrix}\lambda & -1 & -1\\ -1 & \lambda & -1\\ -1 & -1 & \lambda\end{vmatrix}=(\lambda-2)(\lambda+1)^{2}
$$
特征值为 $\lambda_1=2$（单重）以及 $\lambda_2=\lambda_3=-1$（二重）。

针对 $\lambda_1=2$，解方程 $(2\boldsymbol{I}-\boldsymbol{A})\boldsymbol{v}=\boldsymbol{0}$，即：
$$
\begin{bmatrix}2 & -1 & -1\\ -1 & 2 & -1\\ -1 & -1 & 2\end{bmatrix}\boldsymbol{v}=\boldsymbol{0}
$$
得基础解系 $\boldsymbol{v}_1=[1,1,1]^{\top}$，单位化得到：
$$
\boldsymbol{q}_1=\frac{1}{\sqrt{3}}\begin{bmatrix}1\\ 1\\ 1\end{bmatrix}
$$
针对重特征值 $\lambda=-1$，解方程 $(-\boldsymbol{I}-\boldsymbol{A})\boldsymbol{v}=\boldsymbol{0}$，即：
$$
\begin{bmatrix}-1 & -1 & -1\\ -1 & -1 & -1\\ -1 & -1 & -1\end{bmatrix}\boldsymbol{v}=\boldsymbol{0}\implies v_1+v_2+v_3=0
$$
选取该平面内两个线性无关的基础解向量，例如 $\boldsymbol{u}_2=[1,-1,0]^{\top}$。再选取与 $\boldsymbol{u}_2$ 正交的解向量：
$$
\boldsymbol{u}_3=[1,1,-2]^{\top}
$$
验证内积 $\boldsymbol{u}_2^{\top}\boldsymbol{u}_3=1-1+0=0$。分别单位化得到：
$$
\boldsymbol{q}_2=\frac{1}{\sqrt{2}}\begin{bmatrix}1\\ -1\\ 0\end{bmatrix},\quad \boldsymbol{q}_3=\frac{1}{\sqrt{6}}\begin{bmatrix}1\\ 1\\ -2\end{bmatrix}
$$
由正交特征向量构造正交矩阵 $\boldsymbol{Q}=[\boldsymbol{q}_1,\boldsymbol{q}_2,\boldsymbol{q}_3]$：
$$
\boldsymbol{Q}=\begin{bmatrix}\frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}}\\ \frac{1}{\sqrt{3}} & -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}}\\ \frac{1}{\sqrt{3}} & 0 & -\frac{2}{\sqrt{6}}\end{bmatrix}
$$
验证 $\boldsymbol{Q}^{\top}\boldsymbol{A}\boldsymbol{Q}$：
$$
\boldsymbol{A}\boldsymbol{Q}=\begin{bmatrix}0 & 1 & 1\\ 1 & 0 & 1\\ 1 & 1 & 0\end{bmatrix}\begin{bmatrix}\frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}}\\ \frac{1}{\sqrt{3}} & -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}}\\ \frac{1}{\sqrt{3}} & 0 & -\frac{2}{\sqrt{6}}\end{bmatrix}=\begin{bmatrix}\frac{2}{\sqrt{3}} & -\frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}}\\ \frac{2}{\sqrt{3}} & \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}}\\ \frac{2}{\sqrt{3}} & 0 & \frac{2}{\sqrt{6}}\end{bmatrix}
$$
两边左乘 $\boldsymbol{Q}^{\top}$，逐块计算内积得到：
$$
\boldsymbol{Q}^{\top}\boldsymbol{A}\boldsymbol{Q}=\begin{bmatrix}2 & 0 & 0\\ 0 & -1 & 0\\ 0 & 0 & -1\end{bmatrix}=\operatorname{diag}(2,-1,-1)
$$
在正交替换 $\boldsymbol{x}=\boldsymbol{Q}\boldsymbol{y}$ 下，二次型化为标准形 $f=2y_1^{2}-y_2^{2}-y_3^{2}$。

**常见错误做法剖析**：处理重特征值的特征子空间时，若仅随意选取两个线性无关解（如 $[1,-1,0]^{\top}$ 与 $[1,0,-1]^{\top}$）并直接进行单位化，未执行 Gram-Schmidt 正交化，会导致构造出的 $\boldsymbol{Q}$ 满足可逆但非正交，使得 $\boldsymbol{Q}^{\top}\ne\boldsymbol{Q}^{-1}$，从而无法满足正交变换化二次型为标准形的要求。

## 4. 

考虑三阶实对称三对角矩阵：
$$
\boldsymbol{A}=\begin{bmatrix}3 & 1 & 0\\ 1 & 3 & 1\\ 0 & 1 & 3\end{bmatrix}
$$
分别采用三种方法判定其正定性：

第一，**顺序主子式判定法（Sylvester 准则）**。计算各阶顺序主子式：
一阶主子式：
$$
\Delta_1=|3|=3>0
$$
二阶顺序主子式：
$$
\Delta_2=\begin{vmatrix}3 & 1\\ 1 & 3\end{vmatrix}=3\times 3-1\times 1=8>0
$$
三阶顺序主子式即行列式：
$$
\Delta_3=\det\boldsymbol{A}=3\times(3\times 3-1\times 1)-1\times(1\times 3-0\times 1)=3\times 8-3=21>0
$$
由于所有顺序主子式皆严格大于零，由 Sylvester 准则判定 $\boldsymbol{A}$ 正定。

第二，**特征值判定法**。计算矩阵的特征多项式：
$$
\det(\lambda\boldsymbol{I}-\boldsymbol{A})=\begin{vmatrix}\lambda-3 & -1 & 0\\ -1 & \lambda-3 & -1\\ 0 & -1 & \lambda-3\end{vmatrix}
$$
按第一行展开：
$$
(\lambda-3)[(\lambda-3)^{2}-1]-(-1)[-(\lambda-3)]=(\lambda-3)[(\lambda-3)^{2}-2]=0
$$
解得三个特征值分别为：
$$
\lambda_1=3,\quad \lambda_2=3+\sqrt{2},\quad \lambda_3=3-\sqrt{2}
$$
因为 $\sqrt{2}\approx 1.414<3$，所以 $\lambda_3>0$，所有特征值均满足 $\lambda_i>0$。实对称矩阵的特征值全为正，故 $\boldsymbol{A}$ 正定。

第三，**定义法**。对任意非零向量 $\boldsymbol{x}=[x_1,x_2,x_3]^{\top}\ne\boldsymbol{0}$，二次型为：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=3x_1^{2}+3x_2^{2}+3x_3^{2}+2x_1x_2+2x_2x_3
$$
将其重写为非负平方项之和：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=2x_1^{2}+(x_1+x_2)^{2}+x_2^{2}+(x_2+x_3)^{2}+2x_3^{2}
$$
由于实数平方恒非负，式中每一项均为非负数，故 $\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}\ge 0$。若 $\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=0$，由平方和性质必须各项同时为零，即 $2x_1^{2}=0$、$x_2^{2}=0$、$2x_3^{2}=0$，直接推出 $x_1=x_2=x_3=0$，即 $\boldsymbol{x}=\boldsymbol{0}$。因此对所有非零向量均有 $\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}>0$，满足正定定义。

**常见错误做法剖析**：一是误将「所有对角元素大于零」当成正定的充分条件（对角元大于零仅为必要条件）；二是在定义法推导中，仅完成配方后指出「各项为平方和故大于等于零」，遗漏了论证「取等号时必有 $\boldsymbol{x}=\boldsymbol{0}$」这一核心充要判定步骤。

## 5. 

根据题设，所求对称三对角矩阵形如：
$$
\boldsymbol{A}=\begin{bmatrix}2 & t & 0\\ t & 2 & 1\\ 0 & 1 & 2\end{bmatrix}
$$
由实对称矩阵正定的 Sylvester 准则，矩阵正定当且仅当各阶顺序主子式全为正。依次计算其顺序主子式：
一阶主子式：
$$
\Delta_1=2>0
$$
恒成立。二阶顺序主子式：
$$
\Delta_2=\begin{vmatrix}2 & t\\ t & 2\end{vmatrix}=4-t^{2}
$$
要求 $\Delta_2>0$，解得：
$$
|t|<2\iff -2<t<2
$$
三阶顺序主子式即行列式，沿第一行展开：
$$
\Delta_3=\det\boldsymbol{A}=2\times\begin{vmatrix}2 & 1\\ 1 & 2\end{vmatrix}-t\times\begin{vmatrix}t & 1\\ 0 & 2\end{vmatrix}=2\times(4-1)-t\times(2t)=6-2t^{2}
$$
要求 $\Delta_3>0$，即：
$$
6-2t^{2}>0\iff t^{2}<3\iff -\sqrt{3}<t<\sqrt{3}
$$
求不等式组的交集：由于 $\sqrt{3}\approx 1.732<2$，因此综合限制为：
$$
-\sqrt{3}<t<\sqrt{3}
$$
即参数 $t$ 的取值范围为 $(-\sqrt{3},\sqrt{3})$。

**常见错误做法剖析**：本题常见失误在于忽视三阶主子式条件，仅依据二阶主子式得出 $|t|<2$；或者在计算行列式展开时将代数余子式的负号弄错，误算为 $6+2t^{2}>0$ 从而得出错误范围。

## 6. 

**证明**

设 $\boldsymbol{A}\succ 0$，即 $\boldsymbol{A}$ 为实对称正定矩阵。
首先，由对称性定义 $\boldsymbol{A}^{\top}=\boldsymbol{A}$，故 $\boldsymbol{A}^{\top}$ 为实对称矩阵。对任意非零向量 $\boldsymbol{x}\ne\boldsymbol{0}$，有 $\boldsymbol{x}^{\top}\boldsymbol{A}^{\top}\boldsymbol{x}=\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}>0$，因此 $\boldsymbol{A}^{\top}\succ 0$。

其次，对于逆矩阵 $\boldsymbol{A}^{-1}$，由于 $(\boldsymbol{A}^{-1})^{\top}=(\boldsymbol{A}^{\top})^{-1}=\boldsymbol{A}^{-1}$，故 $\boldsymbol{A}^{-1}$ 为实对称矩阵。对任意非零向量 $\boldsymbol{x}\ne\boldsymbol{0}$，令 $\boldsymbol{y}=\boldsymbol{A}^{-1}\boldsymbol{x}$。因为 $\boldsymbol{A}^{-1}$ 可逆且 $\boldsymbol{x}\ne\boldsymbol{0}$，必有 $\boldsymbol{y}\ne\boldsymbol{0}$，且 $\boldsymbol{x}=\boldsymbol{A}\boldsymbol{y}$。代入二次型得：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}^{-1}\boldsymbol{x}=(\boldsymbol{A}\boldsymbol{y})^{\top}\boldsymbol{A}^{-1}(\boldsymbol{A}\boldsymbol{y})=\boldsymbol{y}^{\top}\boldsymbol{A}^{\top}\boldsymbol{A}^{-1}\boldsymbol{A}\boldsymbol{y}=\boldsymbol{y}^{\top}\boldsymbol{A}\boldsymbol{y}
$$
由 $\boldsymbol{A}\succ 0$ 及 $\boldsymbol{y}\ne\boldsymbol{0}$ 可知 $\boldsymbol{y}^{\top}\boldsymbol{A}\boldsymbol{y}>0$，从而 $\boldsymbol{x}^{\top}\boldsymbol{A}^{-1}\boldsymbol{x}>0$，故 $\boldsymbol{A}^{-1}\succ 0$。

再次，对于幂矩阵 $\boldsymbol{A}^{k}$（$k\in\mathbb N^{+}$），由转置运算性质 $(\boldsymbol{A}^{k})^{\top}=(\boldsymbol{A}^{\top})^{k}=\boldsymbol{A}^{k}$，故对称。由谱定理，存在正交矩阵 $\boldsymbol{Q}$ 与对角矩阵 $\boldsymbol{\Lambda}=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ 使得 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^{\top}$，其中 $\lambda_i>0$。因此 $\boldsymbol{A}^{k}=\boldsymbol{Q}\boldsymbol{\Lambda}^{k}\boldsymbol{Q}^{\top}$，其特征值为 $\lambda_i^{k}$。由于 $\lambda_i>0$ 蕴含 $\lambda_i^{k}>0$，实对称矩阵的特征值全为正，故 $\boldsymbol{A}^{k}\succ 0$。

最后，设 $\boldsymbol{B}\succeq 0$。由转置性质，矩阵和 $\boldsymbol{A}+\boldsymbol{B}$ 满足 $(\boldsymbol{A}+\boldsymbol{B})^{\top}=\boldsymbol{A}^{\top}+\boldsymbol{B}^{\top}=\boldsymbol{A}+\boldsymbol{B}$，是对称矩阵。对任意非零向量 $\boldsymbol{x}\ne\boldsymbol{0}$：
$$
\boldsymbol{x}^{\top}(\boldsymbol{A}+\boldsymbol{B})\boldsymbol{x}=\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}+\boldsymbol{x}^{\top}\boldsymbol{B}\boldsymbol{x}
$$
由 $\boldsymbol{A}\succ 0$ 得 $\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}>0$，由 $\boldsymbol{B}\succeq 0$ 得 $\boldsymbol{x}^{\top}\boldsymbol{B}\boldsymbol{x}\ge 0$。二者相加严格大于零：
$$
\boldsymbol{x}^{\top}(\boldsymbol{A}+\boldsymbol{B})\boldsymbol{x}>0
$$
故 $\boldsymbol{A}+\boldsymbol{B}\succ 0$ 成立。

□

**常见错误做法剖析**：本题常见遗漏是未证明矩阵的对称性就直接讨论二次型或特征值（例如判定正定性必须建立在实对称矩阵框架内）；另一典型错误是在处理矩阵乘积时，误以为「若 $\boldsymbol{A}\succ 0,\boldsymbol{B}\succ 0$，则 $\boldsymbol{A}\boldsymbol{B}\succ 0$」，实际上矩阵乘积通常不满足对称性，正定锥在乘法下不封闭。
## 7. 

**证明**

必要性（$\implies$）：设实对称矩阵 $\boldsymbol{A}\succ 0$。根据实对称矩阵的谱定理，存在正交矩阵 $\boldsymbol{Q}$ 与对角矩阵 $\boldsymbol{\Lambda}=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ 使得 $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^{\top}$。因为 $\boldsymbol{A}$ 正定，其所有特征值 $\lambda_i>0$。定义对角矩阵 $\boldsymbol{\Lambda}^{1/2}=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})$，由所有特征值均为正可知 $\boldsymbol{\Lambda}^{1/2}$ 可逆。令矩阵 $\boldsymbol{P}=\boldsymbol{\Lambda}^{1/2}\boldsymbol{Q}^{\top}$。由于 $\boldsymbol{\Lambda}^{1/2}$ 与正交矩阵 $\boldsymbol{Q}^{\top}$ 均可逆，故 $\boldsymbol{P}$ 为可逆矩阵，且满足：
$$
\boldsymbol{P}^{\top}\boldsymbol{P}=(\boldsymbol{Q}\boldsymbol{\Lambda}^{1/2})(\boldsymbol{\Lambda}^{1/2}\boldsymbol{Q}^{\top})=\boldsymbol{Q}\boldsymbol{\Lambda}\boldsymbol{Q}^{\top}=\boldsymbol{A}
$$

充分性（$\impliedby$）：设存在可逆实矩阵 $\boldsymbol{P}$ 满足 $\boldsymbol{A}=\boldsymbol{P}^{\top}\boldsymbol{P}$。首先转置满足 $\boldsymbol{A}^{\top}=(\boldsymbol{P}^{\top}\boldsymbol{P})^{\top}=\boldsymbol{P}^{\top}\boldsymbol{P}=\boldsymbol{A}$，即 $\boldsymbol{A}$ 是实对称矩阵。对任意非零向量 $\boldsymbol{x}\ne\boldsymbol{0}$，令 $\boldsymbol{y}=\boldsymbol{P}\boldsymbol{x}$。因为 $\boldsymbol{P}$ 可逆且 $\boldsymbol{x}\ne\boldsymbol{0}$，必有 $\boldsymbol{y}\ne\boldsymbol{0}$。从而二次型满足：
$$
\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}=\boldsymbol{x}^{\top}\boldsymbol{P}^{\top}\boldsymbol{P}\boldsymbol{x}=\|\boldsymbol{P}\boldsymbol{x}\|^{2}=\|\boldsymbol{y}\|^{2}>0
$$
由此证明 $\boldsymbol{A}\succ 0$。

进一步推出两项推论：
第一，由方阵乘积行列式性质：
$$
\det\boldsymbol{A}=\det(\boldsymbol{P}^{\top}\boldsymbol{P})=\det(\boldsymbol{P}^{\top})\det(\boldsymbol{P})=(\det\boldsymbol{P})^{2}
$$
因为 $\boldsymbol{P}$ 可逆，$\det\boldsymbol{P}\ne 0$，所以 $(\det\boldsymbol{P})^{2}>0$，即 $\det\boldsymbol{A}>0$。

第二，对任意对角元指标 $i\in\{1,\dots,n\}$，取标准基向量 $\boldsymbol{e}_i=[0,\dots,1,\dots,0]^{\top}$，则：
$$
A_{ii}=\boldsymbol{e}_i^{\top}\boldsymbol{A}\boldsymbol{e}_i=\|\boldsymbol{P}\boldsymbol{e}_i\|^{2}
$$
由于 $\boldsymbol{P}$ 可逆且 $\boldsymbol{e}_i\ne\boldsymbol{0}$，其第 $i$ 列向量 $\boldsymbol{P}\boldsymbol{e}_i\ne\boldsymbol{0}$，故其范数平方严格为正：
$$
A_{ii}=\|\boldsymbol{P}\boldsymbol{e}_i\|^{2}>0
$$
即主对角线元素全为正。

□

**常见错误做法剖析**：本题在充分性证明中容易遗漏验证 $\boldsymbol{A}$ 的对称性；另外在证明对角元为正时，有学生容易简单套用「特征值全正所以对角元全正」，该依据虽然正确（对角元之和为迹），但单凭迹大于零无法严格推导每个对角元单独为正，必须利用二次型在单位向量处的取值或者 Cholesky 分解列向量范数来严格证明。

## 8. 

**证明**

第一，证明半正定锥 $\mathcal{S}_{+}^{n}=\{\boldsymbol{X}\in\mathcal{S}^{n}:\boldsymbol{X}\succeq 0\}$ 是凸锥。
由定义，需证对任意 $\boldsymbol{X}_1,\boldsymbol{X}_2\in\mathcal{S}_{+}^{n}$ 及任意非负标量 $\alpha,\beta\ge 0$，有 $\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2\in\mathcal{S}_{+}^{n}$。
因为 $\boldsymbol{X}_1,\boldsymbol{X}_2$ 为对称矩阵，其线性组合满足 $(\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2)^{\top}=\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2$，仍为对称矩阵。对任意向量 $\boldsymbol{z}\in\mathbb R^{n}$：
$$
\boldsymbol{z}^{\top}(\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2)\boldsymbol{z}=\alpha\boldsymbol{z}^{\top}\boldsymbol{X}_1\boldsymbol{z}+\beta\boldsymbol{z}^{\top}\boldsymbol{X}_2\boldsymbol{z}
$$
由于 $\boldsymbol{X}_1,\boldsymbol{X}_2\succeq 0$，有 $\boldsymbol{z}^{\top}\boldsymbol{X}_1\boldsymbol{z}\ge 0$ 且 $\boldsymbol{z}^{\top}\boldsymbol{X}_2\boldsymbol{z}\ge 0$。由 $\alpha,\beta\ge 0$ 可得非负数之和非负：
$$
\boldsymbol{z}^{\top}(\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2)\boldsymbol{z}\ge 0
$$
故 $\alpha\boldsymbol{X}_1+\beta\boldsymbol{X}_2\in\mathcal{S}_{+}^{n}$，即 $\mathcal{S}_{+}^{n}$ 为凸锥。

第二，证明集合 $\mathcal{C}=\{\boldsymbol{X}\in\mathcal{S}^{n}:\boldsymbol{X}\succeq\boldsymbol{A}\}$ 是凸集。
任取 $\boldsymbol{X}_1,\boldsymbol{X}_2\in\mathcal{C}$ 及标量 $\theta\in[0,1]$。考查凸组合 $\boldsymbol{X}_\theta=\theta\boldsymbol{X}_1+(1-\theta)\boldsymbol{X}_2$：
$$
\boldsymbol{X}_\theta-\boldsymbol{A}=\theta(\boldsymbol{X}_1-\boldsymbol{A})+(1-\theta)(\boldsymbol{X}_2-\boldsymbol{A})
$$
由 $\boldsymbol{X}_1,\boldsymbol{X}_2\in\mathcal{C}$ 可知 $\boldsymbol{X}_1-\boldsymbol{A}\succeq 0$ 且 $\boldsymbol{X}_2-\boldsymbol{A}\succeq 0$。根据 $\mathcal{S}_{+}^{n}$ 的凸锥性质，由于 $\theta\ge 0$ 且 $1-\theta\ge 0$，两个半正定矩阵的非负线性组合必半正定：
$$
\boldsymbol{X}_\theta-\boldsymbol{A}\succeq 0\iff \boldsymbol{X}_\theta\succeq\boldsymbol{A}
$$
因此 $\boldsymbol{X}_\theta\in\mathcal{C}$，集合 $\mathcal{C}$ 为凸集。

第三，证明 $\boldsymbol{X}\succeq 0$ 蕴含 $X_{ii}\ge 0$ 且 $X_{ij}^{2}\le X_{ii}X_{jj}$。
取标准基向量 $\boldsymbol{e}_i$，则 $X_{ii}=\boldsymbol{e}_i^{\top}\boldsymbol{X}\boldsymbol{e}_i\ge 0$。
针对任意下标 $i,j$，考查向量 $\boldsymbol{z}=t\boldsymbol{e}_i+\boldsymbol{e}_j$（其中 $t\in\mathbb R$ 为实参数）。由半正定性：
$$
\boldsymbol{z}^{\top}\boldsymbol{X}\boldsymbol{z}=X_{ii}t^{2}+2X_{ij}t+X_{jj}\ge 0
$$
该一元二次不等式对所有实数 $t$ 恒成立。由一元二次多项式恒非负的判别式条件，其判别式必须非正：
$$
\Delta=(2X_{ij})^{2}-4X_{ii}X_{jj}\le 0\iff 4X_{ij}^{2}\le 4X_{ii}X_{jj}\iff X_{ij}^{2}\le X_{ii}X_{jj}
$$
证毕。

□

**常见错误做法剖析**：误将半正定矩阵的所有元素非负化（即误以为 $X_{ij}\ge 0$）。实际上半正定矩阵的非对角元完全可以为负数，例如 $\begin{bmatrix}1 & -1\\ -1 & 1\end{bmatrix}\succeq 0$；另外容易混淆判别式方向，将恒非负条件误写为判别式大于零。

## 9. 

给定三阶实对称矩阵：
$$
\boldsymbol{M}=\begin{bmatrix}2 & 1 & 1\\ 1 & 3 & 1\\ 1 & 1 & 4\end{bmatrix}
$$
进行 $1\times 1$ 与 $2\times 2$ 的分块：
$$
\boldsymbol{M}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{B}\\ \boldsymbol{B}^{\top} & \boldsymbol{C}\end{bmatrix}
$$
其中分块子矩阵为：
$$
\boldsymbol{A}=[2],\quad \boldsymbol{B}=\begin{bmatrix}1 & 1\end{bmatrix},\quad \boldsymbol{C}=\begin{bmatrix}3 & 1\\ 1 & 4\end{bmatrix}
$$
由于一阶主块 $\boldsymbol{A}=[2]\succ 0$，计算 $\boldsymbol{A}$ 在 $\boldsymbol{M}$ 中的 Schur 补：
$$
\boldsymbol{S}=\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}=\begin{bmatrix}3 & 1\\ 1 & 4\end{bmatrix}-\begin{bmatrix}1\\ 1\end{bmatrix}\left(\frac{1}{2}\right)\begin{bmatrix}1 & 1\end{bmatrix}
$$
计算第二项矩阵乘积：
$$
\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}=\frac{1}{2}\begin{bmatrix}1 & 1\\ 1 & 1\end{bmatrix}=\begin{bmatrix}0.5 & 0.5\\ 0.5 & 0.5\end{bmatrix}
$$
作差得到 Schur 补矩阵：
$$
\boldsymbol{S}=\begin{bmatrix}3-0.5 & 1-0.5\\ 1-0.5 & 4-0.5\end{bmatrix}=\begin{bmatrix}2.5 & 0.5\\ 0.5 & 3.5\end{bmatrix}=\begin{bmatrix}\frac{5}{2} & \frac{1}{2}\\ \frac{1}{2} & \frac{7}{2}\end{bmatrix}
$$
检验 $\boldsymbol{S}$ 的正定性：其一阶顺序主子式为 $5/2>0$；行列式为：
$$
\det\boldsymbol{S}=\left(\frac{5}{2}\right)\left(\frac{7}{2}\right)-\left(\frac{1}{2}\right)^{2}=\frac{35}{4}-\frac{1}{4}=\frac{34}{4}=\frac{17}{2}=8.5>0
$$
顺序主子式皆为正，因此 $\boldsymbol{S}\succ 0$。根据 Schur 补判定定理，当 $\boldsymbol{A}\succ 0$ 时，$\boldsymbol{M}\succ 0\iff\boldsymbol{S}\succ 0$，由此判定 $\boldsymbol{M}$ 正定。

利用推论 7.10 中的 Schur 补行列式分解公式 $\det\boldsymbol{M}=\det\boldsymbol{A}\cdot\det\boldsymbol{S}$：
$$
\det\boldsymbol{M}=\det\boldsymbol{A}\cdot\det\boldsymbol{S}=2\times\frac{17}{2}=17
$$
直接按三阶行列式公式展开复核：
$$
\det\boldsymbol{M}=2(12-1)-1(4-1)+1(1-3)=22-3-2=17
$$
两者结果一致。

**常见错误做法剖析**：本题常见错误包括在计算 Schur 补时矩阵乘法维度混乱，误将列向量乘行向量写为行向量乘列向量（得到标量）；或者将推论中的行列式连乘关系混淆为加法关系。
## 10. 

**证明**

设分块实对称矩阵：
$$
\boldsymbol{M}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{B}\\ \boldsymbol{B}^{\top} & \boldsymbol{C}\end{bmatrix}\succeq 0,\quad \boldsymbol{A}\succ 0
$$
构造分块初等变换可逆矩阵：
$$
\boldsymbol{X}=\begin{bmatrix}\boldsymbol{I} & -\boldsymbol{A}^{-1}\boldsymbol{B}\\ \boldsymbol{0} & \boldsymbol{I}\end{bmatrix}
$$
对 $\boldsymbol{M}$ 实施合同变换：
$$
\boldsymbol{X}^{\top}\boldsymbol{M}\boldsymbol{X}=\begin{bmatrix}\boldsymbol{I} & \boldsymbol{0}\\ -\boldsymbol{B}^{\top}\boldsymbol{A}^{-1} & \boldsymbol{I}\end{bmatrix}\begin{bmatrix}\boldsymbol{A} & \boldsymbol{B}\\ \boldsymbol{B}^{\top} & \boldsymbol{C}\end{bmatrix}\begin{bmatrix}\boldsymbol{I} & -\boldsymbol{A}^{-1}\boldsymbol{B}\\ \boldsymbol{0} & \boldsymbol{I}\end{bmatrix}
$$
先计算右侧两矩阵乘积：
$$
\boldsymbol{M}\boldsymbol{X}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{B}^{\top} & \boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\end{bmatrix}
$$
再左乘 $\boldsymbol{X}^{\top}$，得到块对角化结果：
$$
\boldsymbol{X}^{\top}\boldsymbol{M}\boldsymbol{X}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{0} & \boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\end{bmatrix}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{0} & \boldsymbol{S}\end{bmatrix}
$$
由于 $\boldsymbol{M}\succeq 0$，对任意分块向量 $\boldsymbol{v}=[\boldsymbol{u}^{\top},\boldsymbol{y}^{\top}]^{\top}$，均有：
$$
\boldsymbol{v}^{\top}(\boldsymbol{X}^{\top}\boldsymbol{M}\boldsymbol{X})\boldsymbol{v}=(\boldsymbol{X}\boldsymbol{v})^{\top}\boldsymbol{M}(\boldsymbol{X}\boldsymbol{v})\ge 0
$$
取特殊的测试向量 $\boldsymbol{u}=\boldsymbol{0}$，则：
$$
\begin{bmatrix}\boldsymbol{0}^{\top} & \boldsymbol{y}^{\top}\end{bmatrix}\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{0} & \boldsymbol{S}\end{bmatrix}\begin{bmatrix}\boldsymbol{0}\\ \boldsymbol{y}\end{bmatrix}=\boldsymbol{y}^{\top}\boldsymbol{S}\boldsymbol{y}\ge 0
$$
该不等式对任意向量 $\boldsymbol{y}$ 恒成立。又因为 $\boldsymbol{S}^{\top}=(\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B})^{\top}=\boldsymbol{S}$，所以 $\boldsymbol{S}$ 为实对称矩阵，由此证明 $\boldsymbol{S}=\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\succeq 0$。

反例说明当 $\boldsymbol{A}$ 奇异时定理 7.9 失效：
考虑实对称矩阵：
$$
\boldsymbol{M}=\begin{bmatrix}0 & 1\\ 1 & 1\end{bmatrix}
$$
将其分块为 $\boldsymbol{A}=[0]$，$\boldsymbol{B}=[1]$，$\boldsymbol{C}=[1]$。
此处 $\boldsymbol{A}=[0]\succeq 0$ 且半正定，但 $\boldsymbol{A}$ 奇异不可逆，无法定义经典的逆矩阵 $\boldsymbol{A}^{-1}$ 与 Schur 补 $\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}$。更本质的是，矩阵 $\boldsymbol{M}$ 的行列式为 $\det\boldsymbol{M}=0\times 1-1^{2}=-1<0$，其特征值为 $(1\pm\sqrt{5})/2$，一正一负，$\boldsymbol{M}$ 属于不定矩阵而非半正定矩阵。这表明一旦主块 $\boldsymbol{A}$ 奇异，仅凭主块非负与对角元非负根本无法保障整体的正定性或半正定性。

□

**常见错误做法剖析**：误在 $\boldsymbol{A}$ 奇异时仍生硬书写 $\boldsymbol{A}^{-1}$；或者混淆半正定与正定条件，误以为主对角线元素全非负即可保证矩阵半正定。

## 11. 

**证明**

设分块实对称矩阵：
$$
\boldsymbol{M}=\begin{bmatrix}\boldsymbol{A} & \boldsymbol{B}\\ \boldsymbol{B}^{\top} & \boldsymbol{C}\end{bmatrix},\quad \boldsymbol{A}\succ 0
$$
必要性（$\implies$）：若 $\boldsymbol{M}\succeq 0$，由第 10 题已证结论直接可得 Schur 补半正定：
$$
\boldsymbol{S}=\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\succeq 0\iff \boldsymbol{C}\succeq\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}
$$

充分性（$\impliedby$）：设 $\boldsymbol{C}\succeq\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}$，记 $\boldsymbol{S}=\boldsymbol{C}-\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\succeq 0$。
构造可逆矩阵：
$$
\boldsymbol{X}=\begin{bmatrix}\boldsymbol{I} & -\boldsymbol{A}^{-1}\boldsymbol{B}\\ \boldsymbol{0} & \boldsymbol{I}\end{bmatrix}
$$
其逆矩阵为：
$$
\boldsymbol{X}^{-1}=\begin{bmatrix}\boldsymbol{I} & \boldsymbol{A}^{-1}\boldsymbol{B}\\ \boldsymbol{0} & \boldsymbol{I}\end{bmatrix}
$$
原矩阵可分解为合同表达式：
$$
\boldsymbol{M}=(\boldsymbol{X}^{-1})^{\top}\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{0} & \boldsymbol{S}\end{bmatrix}\boldsymbol{X}^{-1}
$$
对任意向量 $\boldsymbol{z}=[\boldsymbol{u}^{\top},\boldsymbol{v}^{\top}]^{\top}\in\mathbb R^{n+m}$，令 $\boldsymbol{w}=\boldsymbol{X}^{-1}\boldsymbol{z}=[\boldsymbol{w}_1^{\top},\boldsymbol{w}_2^{\top}]^{\top}$。则：
$$
\boldsymbol{z}^{\top}\boldsymbol{M}\boldsymbol{z}=\boldsymbol{w}^{\top}\begin{bmatrix}\boldsymbol{A} & \boldsymbol{0}\\ \boldsymbol{0} & \boldsymbol{S}\end{bmatrix}\boldsymbol{w}=\boldsymbol{w}_1^{\top}\boldsymbol{A}\boldsymbol{w}_1+\boldsymbol{w}_2^{\top}\boldsymbol{S}\boldsymbol{w}_2
$$
因为 $\boldsymbol{A}\succ 0$，必有 $\boldsymbol{w}_1^{\top}\boldsymbol{A}\boldsymbol{w}_1\ge 0$；又 $\boldsymbol{S}\succeq 0$，必有 $\boldsymbol{w}_2^{\top}\boldsymbol{S}\boldsymbol{w}_2\ge 0$。非负数相加满足：
$$
\boldsymbol{z}^{\top}\boldsymbol{M}\boldsymbol{z}\ge 0
$$
由此证明 $\boldsymbol{M}\succeq 0$。

证明满足条件的 $\boldsymbol{C}$ 全体构成凸集：
记集合 $\mathcal{K}=\{\boldsymbol{C}\in\mathcal{S}^{m}:\boldsymbol{C}\succeq\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}\}$。记基准对称阵 $\boldsymbol{C}_0=\boldsymbol{B}^{\top}\boldsymbol{A}^{-1}\boldsymbol{B}$。
任取 $\boldsymbol{C}_1,\boldsymbol{C}_2\in\mathcal{K}$ 及标量 $\theta\in[0,1]$，考虑凸组合 $\boldsymbol{C}_\theta=\theta\boldsymbol{C}_1+(1-\theta)\boldsymbol{C}_2$：
$$
\boldsymbol{C}_\theta-\boldsymbol{C}_0=\theta(\boldsymbol{C}_1-\boldsymbol{C}_0)+(1-\theta)(\boldsymbol{C}_2-\boldsymbol{C}_0)
$$
由于 $\boldsymbol{C}_1-\boldsymbol{C}_0\succeq 0$ 且 $\boldsymbol{C}_2-\boldsymbol{C}_0\succeq 0$，根据半正定锥 $\mathcal{S}_{+}^{m}$ 的凸性及 $\theta\ge 0,1-\theta\ge 0$，半正定矩阵的非负线性组合必半正定，即：
$$
\boldsymbol{C}_\theta-\boldsymbol{C}_0\succeq 0\iff \boldsymbol{C}_\theta\succeq\boldsymbol{C}_0
$$
因此 $\boldsymbol{C}_\theta\in\mathcal{K}$，即这样的矩阵 $\boldsymbol{C}$ 全体构成实对称矩阵空间中的凸集。

□

**常见错误做法剖析**：证明充分性时忽视合同变换的可逆性，或者直接假设特征值具备可加性；在说明凸集时未严格利用凸组合的定义与半正定锥的非负闭包性质。

## 12. 

给定非对称二阶矩阵：
$$
\boldsymbol{A}=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix},\quad \boldsymbol{x}=\begin{bmatrix}x_1\\ x_2\end{bmatrix}
$$
标量函数 $f(\boldsymbol{x})=\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x}$。

利用矩阵微分法求一阶导数：
$$
\mathrm{d} f=\mathrm{d}(\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x})=(\mathrm{d}\boldsymbol{x})^{\top}\boldsymbol{A}\boldsymbol{x}+\boldsymbol{x}^{\top}\boldsymbol{A}(\mathrm{d}\boldsymbol{x})
$$
由于标量的转置等于其自身，$(\mathrm{d}\boldsymbol{x})^{\top}\boldsymbol{A}\boldsymbol{x}=\boldsymbol{x}^{\top}\boldsymbol{A}^{\top}(\mathrm{d}\boldsymbol{x})$，合并可得：
$$
\mathrm{d} f=\boldsymbol{x}^{\top}(\boldsymbol{A}+\boldsymbol{A}^{\top})\mathrm{d}\boldsymbol{x}
$$
在梯度（列向量）记号约定下：
$$
\nabla_{\boldsymbol{x}} f=\frac{\partial(\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x})}{\partial\boldsymbol{x}}=(\boldsymbol{A}+\boldsymbol{A}^{\top})\boldsymbol{x}
$$
（在行向量导数约定下为 $\boldsymbol{x}^{\top}(\boldsymbol{A}+\boldsymbol{A}^{\top})$）。
计算对称化矩阵：
$$
\boldsymbol{A}+\boldsymbol{A}^{\top}=\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}+\begin{bmatrix}1 & 3\\ 2 & 4\end{bmatrix}=\begin{bmatrix}2 & 5\\ 5 & 8\end{bmatrix}
$$
因此导数向量为：
$$
\frac{\partial(\boldsymbol{x}^{\top}\boldsymbol{A}\boldsymbol{x})}{\partial\boldsymbol{x}}=\begin{bmatrix}2 & 5\\ 5 & 8\end{bmatrix}\begin{bmatrix}x_1\\ x_2\end{bmatrix}=\begin{bmatrix}2x_1+5x_2\\ 5x_1+8x_2\end{bmatrix}
$$
二阶导数矩阵（Hessian 矩阵）为：
$$
\nabla^{2}f=\frac{\partial^{2}f}{\partial\boldsymbol{x}\partial\boldsymbol{x}^{\top}}=\boldsymbol{A}+\boldsymbol{A}^{\top}=\begin{bmatrix}2 & 5\\ 5 & 8\end{bmatrix}
$$

分量展开验证：
计算矩阵乘积展开二次型表达式：
$$
f(x_1,x_2)=\begin{bmatrix}x_1 & x_2\end{bmatrix}\begin{bmatrix}x_1+2x_2\\ 3x_1+4x_2\end{bmatrix}=x_1(x_1+2x_2)+x_2(3x_1+4x_2)=x_1^{2}+5x_1x_2+4x_2^{2}
$$
对分量求一阶偏导数：
$$
\frac{\partial f}{\partial x_1}=2x_1+5x_2,\quad \frac{\partial f}{\partial x_2}=5x_1+8x_2
$$
写成梯度向量即为 $[2x_1+5x_2, 5x_1+8x_2]^{\top}$。
对分量求二阶偏导数：
$$
\frac{\partial^{2}f}{\partial x_1^{2}}=2,\quad \frac{\partial^{2}f}{\partial x_1\partial x_2}=5,\quad \frac{\partial^{2}f}{\partial x_2\partial x_1}=5,\quad \frac{\partial^{2}f}{\partial x_2^{2}}=8
$$
写出 Hessian 矩阵：
$$
\boldsymbol{H}=\begin{bmatrix}2 & 5\\ 5 & 8\end{bmatrix}
$$
分量微分结果与矩阵微分结果完全契合。

**常见错误做法剖析**：最典型的错误是套用对称矩阵公式，误将一阶导数写为 $2\boldsymbol{A}\boldsymbol{x}=\begin{bmatrix}2 & 4\\ 6 & 8\end{bmatrix}\boldsymbol{x}$，将 Hessian 矩阵误写为非对称矩阵 $2\boldsymbol{A}=\begin{bmatrix}2 & 4\\ 6 & 8\end{bmatrix}$。Hessian 矩阵由二阶偏导数的对称性决定，必须是对称矩阵，当 $\boldsymbol{A}$ 非对称时其二阶导数必然为 $\boldsymbol{A}+\boldsymbol{A}^{\top}$ 而非 $2\boldsymbol{A}$。
## 13. 

给定标量函数 $f(\boldsymbol{x})=\|\boldsymbol{x}\|^{2}+(\boldsymbol{a}^{\top}\boldsymbol{x})^{2}$，其中 $\boldsymbol{x},\boldsymbol{a}\in\mathbb R^{n}$。

将目标函数重写为矩阵二次型表示：
$$
f(\boldsymbol{x})=\boldsymbol{x}^{\top}\boldsymbol{x}+(\boldsymbol{x}^{\top}\boldsymbol{a})(\boldsymbol{a}^{\top}\boldsymbol{x})=\boldsymbol{x}^{\top}(\boldsymbol{I}+\boldsymbol{a}\boldsymbol{a}^{\top})\boldsymbol{x}
$$
记对称矩阵 $\boldsymbol{M}=\boldsymbol{I}+\boldsymbol{a}\boldsymbol{a}^{\top}$。计算微分：
$$
\mathrm{d} f=2\boldsymbol{x}^{\top}\mathrm{d}\boldsymbol{x}+2(\boldsymbol{a}^{\top}\boldsymbol{x})\boldsymbol{a}^{\top}\mathrm{d}\boldsymbol{x}=2\left[\boldsymbol{x}+(\boldsymbol{a}^{\top}\boldsymbol{x})\boldsymbol{a}\right]^{\top}\mathrm{d}\boldsymbol{x}
$$
由此求出一阶梯度向量：
$$
\nabla f(\boldsymbol{x})=2\boldsymbol{x}+2(\boldsymbol{a}^{\top}\boldsymbol{x})\boldsymbol{a}=2(\boldsymbol{I}+\boldsymbol{a}\boldsymbol{a}^{\top})\boldsymbol{x}
$$
对梯度关于 $\boldsymbol{x}$ 再次求导，得到 Hessian 矩阵：
$$
\nabla^{2}f(\boldsymbol{x})=\frac{\partial\nabla f}{\partial\boldsymbol{x}^{\top}}=2\boldsymbol{I}+2\boldsymbol{a}\boldsymbol{a}^{\top}
$$

**证明**

证明 Hessian 矩阵半正定。
首先验证对称性：
$$
(\nabla^{2}f)^{\top}=(2\boldsymbol{I}+2\boldsymbol{a}\boldsymbol{a}^{\top})^{\top}=2\boldsymbol{I}^{\top}+2(\boldsymbol{a}\boldsymbol{a}^{\top})^{\top}=2\boldsymbol{I}+2\boldsymbol{a}\boldsymbol{a}^{\top}=\nabla^{2}f
$$
因此 $\nabla^{2}f$ 为实对称矩阵。
对任意非零测试向量 $\boldsymbol{z}\in\mathbb R^{n}$，计算二次型：
$$
\boldsymbol{z}^{\top}(\nabla^{2}f)\boldsymbol{z}=\boldsymbol{z}^{\top}(2\boldsymbol{I}+2\boldsymbol{a}\boldsymbol{a}^{\top})\boldsymbol{z}=2\boldsymbol{z}^{\top}\boldsymbol{z}+2\boldsymbol{z}^{\top}\boldsymbol{a}\boldsymbol{a}^{\top}\boldsymbol{z}=2\|\boldsymbol{z}\|^{2}+2(\boldsymbol{a}^{\top}\boldsymbol{z})^{2}
$$
由于范数平方满足 $\|\boldsymbol{z}\|^{2}>0$，标量平方满足 $(\boldsymbol{a}^{\top}\boldsymbol{z})^{2}\ge 0$，因此两者之和严格满足：
$$
\boldsymbol{z}^{\top}(\nabla^{2}f)\boldsymbol{z}\ge 2\|\boldsymbol{z}\|^{2}>0
$$
由此证明 $\nabla^{2}f$ 不仅是半正定的，而且是严格正定的（$\nabla^{2}f\succ 0$）。

□

**常见错误做法剖析**：本题在微分复合项 $(\boldsymbol{a}^{\top}\boldsymbol{x})^{2}$ 时，容易混淆内积与外积，误将外积 $\boldsymbol{a}\boldsymbol{a}^{\top}$ 算作内积标量 $\boldsymbol{a}^{\top}\boldsymbol{a}$；或者在求二阶导数时漏掉恒等阵系数 $2$。

## 14. 

利用迹微分与矩阵微分的对应关系：若标量函数 $f$ 的全微分形如 $\mathrm{d} f=\operatorname{tr}(\boldsymbol{K}^{\top}\mathrm{d}\boldsymbol{X})$，则矩阵导数为 $\frac{\partial f}{\partial\boldsymbol{X}}=\boldsymbol{K}$；等价地，若 $\mathrm{d} f=\operatorname{tr}(\boldsymbol{M}\mathrm{d}\boldsymbol{X})$，则 $\frac{\partial f}{\partial\boldsymbol{X}}=\boldsymbol{M}^{\top}$。

第一，求 $\frac{\partial\operatorname{tr}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B})}{\partial\boldsymbol{X}}$。
利用微分算子与迹的线性性质：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B})=\operatorname{tr}(\mathrm{d}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B}))=\operatorname{tr}(\boldsymbol{A}(\mathrm{d}\boldsymbol{X})\boldsymbol{B})
$$
利用矩阵迹的循环置换性质 $\operatorname{tr}(\boldsymbol{U}\boldsymbol{V}\boldsymbol{W})=\operatorname{tr}(\boldsymbol{W}\boldsymbol{U}\boldsymbol{V})$，将 $\mathrm{d}\boldsymbol{X}$ 循环移至最右端：
$$
\operatorname{tr}(\boldsymbol{A}(\mathrm{d}\boldsymbol{X})\boldsymbol{B})=\operatorname{tr}(\boldsymbol{B}\boldsymbol{A}\mathrm{d}\boldsymbol{X})
$$
将其写为内积形式 $\operatorname{tr}(((\boldsymbol{B}\boldsymbol{A})^{\top})^{\top}\mathrm{d}\boldsymbol{X})$，因此矩阵导数为：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B})}{\partial\boldsymbol{X}}=(\boldsymbol{B}\boldsymbol{A})^{\top}=\boldsymbol{A}^{\top}\boldsymbol{B}^{\top}
$$

第二，求 $\frac{\partial\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}\boldsymbol{X})}{\partial\boldsymbol{X}}$（其中 $\boldsymbol{A}=\boldsymbol{A}^{\top}$ 对称）。
对二次迹项微分：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}\boldsymbol{X})=\operatorname{tr}\left((\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{A}\boldsymbol{X}+\boldsymbol{X}^{\top}\boldsymbol{A}(\mathrm{d}\boldsymbol{X})\right)
$$
拆分为两项之和：
$$
\operatorname{tr}((\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{A}\boldsymbol{X})+\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}\mathrm{d}\boldsymbol{X})
$$
由于标量迹的转置等于自身，对第一项取转置：
$$
\operatorname{tr}((\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{A}\boldsymbol{X})=\operatorname{tr}((\boldsymbol{A}\boldsymbol{X})^{\top}\mathrm{d}\boldsymbol{X})=\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}^{\top}\mathrm{d}\boldsymbol{X})
$$
由 $\boldsymbol{A}$ 的对称性知 $\boldsymbol{A}^{\top}=\boldsymbol{A}$，故两项完全相同并合并：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}\boldsymbol{X})=\operatorname{tr}\left(2\boldsymbol{X}^{\top}\boldsymbol{A}\mathrm{d}\boldsymbol{X}\right)=\operatorname{tr}\left((2\boldsymbol{A}\boldsymbol{X})^{\top}\mathrm{d}\boldsymbol{X}\right)
$$
对照矩阵微分基本形式，得出导数：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{\top}\boldsymbol{A}\boldsymbol{X})}{\partial\boldsymbol{X}}=2\boldsymbol{A}\boldsymbol{X}
$$

**常见错误做法剖析**：计算 $\operatorname{tr}(\boldsymbol{A}\boldsymbol{X}\boldsymbol{B})$ 导数时，容易忽略最后的转置步骤，直接写出 $\boldsymbol{B}\boldsymbol{A}$；而在第二问中若 $\boldsymbol{A}$ 不对称，结果应为 $(\boldsymbol{A}+\boldsymbol{A}^{\top})\boldsymbol{X}$，很多解答不假思索直接写 $2\boldsymbol{A}\boldsymbol{X}$，忽略了前提中对称性的依赖。

## 15. 

计算标量函数 $f(\boldsymbol{X})=\operatorname{tr}(\boldsymbol{X}^{2})$ 对矩阵 $\boldsymbol{X}$ 的导数。

首先进行微分运算：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{2})=\operatorname{tr}(\mathrm{d}(\boldsymbol{X}\boldsymbol{X}))=\operatorname{tr}((\mathrm{d}\boldsymbol{X})\boldsymbol{X}+\boldsymbol{X}(\mathrm{d}\boldsymbol{X}))
$$
利用迹的和差性质与循环性质 $\operatorname{tr}((\mathrm{d}\boldsymbol{X})\boldsymbol{X})=\operatorname{tr}(\boldsymbol{X}\mathrm{d}\boldsymbol{X})$：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{2})=\operatorname{tr}(\boldsymbol{X}\mathrm{d}\boldsymbol{X})+\operatorname{tr}(\boldsymbol{X}\mathrm{d}\boldsymbol{X})=2\operatorname{tr}(\boldsymbol{X}\mathrm{d}\boldsymbol{X})=\operatorname{tr}((2\boldsymbol{X}^{\top})^{\top}\mathrm{d}\boldsymbol{X})
$$
根据矩阵导数定义 $\mathrm{d} f=\operatorname{tr}\left(\left(\frac{\partial f}{\partial\boldsymbol{X}}\right)^{\top}\mathrm{d}\boldsymbol{X}\right)$，得到一般矩阵（非对称情形）下的导数：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial\boldsymbol{X}}=2\boldsymbol{X}^{\top}
$$
当 $\boldsymbol{X}$ 为对称矩阵时，满足 $\boldsymbol{X}^{\top}=\boldsymbol{X}$，此时导数退化为：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial\boldsymbol{X}}=2\boldsymbol{X}
$$

用二阶矩阵进行分量展开验证：
设一般二阶矩阵：
$$
\boldsymbol{X}=\begin{bmatrix}a & b\\ c & d\end{bmatrix}
$$
计算其平方矩阵：
$$
\boldsymbol{X}^{2}=\begin{bmatrix}a & b\\ c & d\end{bmatrix}\begin{bmatrix}a & b\\ c & d\end{bmatrix}=\begin{bmatrix}a^{2}+bc & ab+bd\\ ca+dc & bc+d^{2}\end{bmatrix}
$$
求主对角线元素之和（迹）：
$$
\operatorname{tr}(\boldsymbol{X}^{2})=(a^{2}+bc)+(bc+d^{2})=a^{2}+2bc+d^{2}
$$
分别对矩阵的 4 个独立分量求偏导：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial a}=2a,\quad \frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial b}=2c,\quad \frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial c}=2b,\quad \frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial d}=2d
$$
将各分量偏导数按矩阵位置排列成导数矩阵：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{2})}{\partial\boldsymbol{X}}=\begin{bmatrix}\frac{\partial\operatorname{tr}}{\partial a} & \frac{\partial\operatorname{tr}}{\partial b}\\ \frac{\partial\operatorname{tr}}{\partial c} & \frac{\partial\operatorname{tr}}{\partial d}\end{bmatrix}=\begin{bmatrix}2a & 2c\\ 2b & 2d\end{bmatrix}=2\begin{bmatrix}a & c\\ b & d\end{bmatrix}=2\boldsymbol{X}^{\top}
$$
分量结果严格验证了非对称时为 $2\boldsymbol{X}^{\top}$。若 $\boldsymbol{X}$ 对称，则 $b=c$，矩阵为 $2\begin{bmatrix}a & b\\ b & d\end{bmatrix}=2\boldsymbol{X}$。

**常见错误做法剖析**：本题极易将标量导数 $\frac{\mathrm{d}(x^{2})}{\mathrm{d}x}=2x$ 的直觉错误迁移到矩阵情形，脱口得出 $2\boldsymbol{X}$，完全忽略了非对称矩阵下迹微分必须转置为 $2\boldsymbol{X}^{\top}$ 这一本质差别。
## 16. 

设矩阵 $\boldsymbol{X}\in\mathbb R^{n\times p}$（$n\ge p$）列满秩，则 Gram 矩阵 $\boldsymbol{X}^{\top}\boldsymbol{X}\in\mathbb R^{p\times p}$ 为实对称正定矩阵，其行列式 $\det(\boldsymbol{X}^{\top}\boldsymbol{X})>0$。

求标量函数 $f(\boldsymbol{X})=\log\det(\boldsymbol{X}^{\top}\boldsymbol{X})$ 对矩阵 $\boldsymbol{X}$ 的导数。
利用 Jacobi 行列式微分公式 $\mathrm{d}\log\det\boldsymbol{Y}=\operatorname{tr}(\boldsymbol{Y}^{-1}\mathrm{d}\boldsymbol{Y})$，令 $\boldsymbol{Y}=\boldsymbol{X}^{\top}\boldsymbol{X}$：
$$
\mathrm{d}\boldsymbol{Y}=\mathrm{d}(\boldsymbol{X}^{\top}\boldsymbol{X})=(\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{X}+\boldsymbol{X}^{\top}\mathrm{d}\boldsymbol{X}
$$
代入微分式中：
$$
\mathrm{d} f=\operatorname{tr}\left((\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\left((\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{X}+\boldsymbol{X}^{\top}\mathrm{d}\boldsymbol{X}\right)\right)
$$
拆项并利用迹对转置与乘积循环置换的不变性：
$$
\operatorname{tr}\left((\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}(\mathrm{d}\boldsymbol{X})^{\top}\boldsymbol{X}\right)=\operatorname{tr}\left(\boldsymbol{X}^{\top}\mathrm{d}\boldsymbol{X}(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\right)=\operatorname{tr}\left((\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\boldsymbol{X}^{\top}\mathrm{d}\boldsymbol{X}\right)
$$
因此两项合并为：
$$
\mathrm{d} f=2\operatorname{tr}\left((\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\boldsymbol{X}^{\top}\mathrm{d}\boldsymbol{X}\right)=\operatorname{tr}\left(\left(2\boldsymbol{X}(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\right)^{\top}\mathrm{d}\boldsymbol{X}\right)
$$
对照矩阵微分标准形式 $\mathrm{d} f=\operatorname{tr}\left(\left(\frac{\partial f}{\partial\boldsymbol{X}}\right)^{\top}\mathrm{d}\boldsymbol{X}\right)$，得到导数：
$$
\frac{\partial\log\det(\boldsymbol{X}^{\top}\boldsymbol{X})}{\partial\boldsymbol{X}}=2\boldsymbol{X}(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}
$$

当 $\boldsymbol{X}$ 为 $n\times n$ 可逆方阵时：
根据方阵逆的乘积性质，$(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}=\boldsymbol{X}^{-1}(\boldsymbol{X}^{\top})^{-1}=\boldsymbol{X}^{-1}\boldsymbol{X}^{-\top}$。代入上式化简：
$$
2\boldsymbol{X}(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}=2\boldsymbol{X}\boldsymbol{X}^{-1}\boldsymbol{X}^{-\top}=2\boldsymbol{I}\boldsymbol{X}^{-\top}=2\boldsymbol{X}^{-\top}
$$
退化验证：由行列式性质 $\log\det(\boldsymbol{X}^{\top}\boldsymbol{X})=\log((\det\boldsymbol{X})^{2})=2\log|\det\boldsymbol{X}|$，由基本导数公式 $\frac{\partial\log|\det\boldsymbol{X}|}{\partial\boldsymbol{X}}=\boldsymbol{X}^{-\top}$，直接微分得 $2\boldsymbol{X}^{-\top}$，两者严格一致。

**常见错误做法剖析**：本题极易混淆矩阵相乘的顺序，写成形如 $2(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}\boldsymbol{X}$ 的错误形式，此时矩阵维度根本无法匹配（$(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}$ 是 $p\times p$，$\boldsymbol{X}$ 是 $n\times p$）；此外在迹变换时容易忘记对第一项利用 $(\boldsymbol{X}^{\top}\boldsymbol{X})^{-1}$ 的对称性。

## 17. 

**证明**

式 (7.17) 为可逆方阵的逆矩阵微分公式：
$$
\mathrm{d}(\boldsymbol{X}^{-1})=-\boldsymbol{X}^{-1}(\mathrm{d}\boldsymbol{X})\boldsymbol{X}^{-1}
$$
对标量函数 $f(\boldsymbol{X})=\operatorname{tr}(\boldsymbol{X}^{-1})$ 计算全微分：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{-1})=\operatorname{tr}(\mathrm{d}(\boldsymbol{X}^{-1}))=\operatorname{tr}\left(-\boldsymbol{X}^{-1}(\mathrm{d}\boldsymbol{X})\boldsymbol{X}^{-1}\right)
$$
利用矩阵迹的循环性质 $\operatorname{tr}(\boldsymbol{A}\boldsymbol{B}\boldsymbol{C})=\operatorname{tr}(\boldsymbol{C}\boldsymbol{A}\boldsymbol{B})$：
$$
\operatorname{tr}\left(-\boldsymbol{X}^{-1}(\mathrm{d}\boldsymbol{X})\boldsymbol{X}^{-1}\right)=-\operatorname{tr}\left(\boldsymbol{X}^{-1}\boldsymbol{X}^{-1}\mathrm{d}\boldsymbol{X}\right)=\operatorname{tr}\left(\left(-(\boldsymbol{X}^{-1}\boldsymbol{X}^{-1})^{\top}\right)^{\top}\mathrm{d}\boldsymbol{X}\right)
$$
根据转置运算法则 $(\boldsymbol{A}\boldsymbol{B})^{\top}=\boldsymbol{B}^{\top}\boldsymbol{A}^{\top}$：
$$
(\boldsymbol{X}^{-1}\boldsymbol{X}^{-1})^{\top}=(\boldsymbol{X}^{-1})^{\top}(\boldsymbol{X}^{-1})^{\top}=\boldsymbol{X}^{-\top}\boldsymbol{X}^{-\top}
$$
因此全微分为：
$$
\mathrm{d}\operatorname{tr}(\boldsymbol{X}^{-1})=\operatorname{tr}\left(\left(-\boldsymbol{X}^{-\top}\boldsymbol{X}^{-\top}\right)^{\top}\mathrm{d}\boldsymbol{X}\right)
$$
由矩阵导数定义即得：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{-1})}{\partial\boldsymbol{X}}=-\boldsymbol{X}^{-\top}\boldsymbol{X}^{-\top}
$$

□

用二阶矩阵的分量微积分进行验证：
设一般二阶矩阵 $\boldsymbol{X}=\begin{bmatrix}a & b\\ e & c\end{bmatrix}$，其行列式 $D=ac-be\ne 0$。求逆矩阵：
$$
\boldsymbol{X}^{-1}=\frac{1}{ac-be}\begin{bmatrix}c & -b\\ -e & a\end{bmatrix}\implies \operatorname{tr}(\boldsymbol{X}^{-1})=\frac{a+c}{ac-be}
$$
对其各分量求一阶偏导数：
$$
\frac{\partial\operatorname{tr}}{\partial a}=\frac{1(ac-be)-(a+c)c}{(ac-be)^{2}}=\frac{-c^{2}-be}{(ac-be)^{2}}
$$
$$
\frac{\partial\operatorname{tr}}{\partial b}=\frac{0-(a+c)(-e)}{(ac-be)^{2}}=\frac{e(a+c)}{(ac-be)^{2}}
$$
$$
\frac{\partial\operatorname{tr}}{\partial e}=\frac{0-(a+c)(-b)}{(ac-be)^{2}}=\frac{b(a+c)}{(ac-be)^{2}}
$$
$$
\frac{\partial\operatorname{tr}}{\partial c}=\frac{1(ac-be)-(a+c)a}{(ac-be)^{2}}=\frac{-a^{2}-be}{(ac-be)^{2}}
$$
考虑上三角阵特例 $e=0$，此时 $D=ac$：
$$
\frac{\partial\operatorname{tr}}{\partial a}=-\frac{1}{a^{2}},\quad \frac{\partial\operatorname{tr}}{\partial b}=0,\quad \frac{\partial\operatorname{tr}}{\partial e}=\frac{b(a+c)}{a^{2}c^{2}},\quad \frac{\partial\operatorname{tr}}{\partial c}=-\frac{1}{c^{2}}
$$
导数矩阵为：
$$
\frac{\partial\operatorname{tr}(\boldsymbol{X}^{-1})}{\partial\boldsymbol{X}}=\begin{bmatrix}-a^{-2} & 0\\ \frac{b(a+c)}{a^{2}c^{2}} & -c^{-2}\end{bmatrix}
$$
另一方面，对 $e=0$ 时的逆矩阵求转置：
$$
\boldsymbol{X}^{-\top}=\left(\begin{bmatrix}1/a & -b/(ac)\\ 0 & 1/c\end{bmatrix}\right)^{\top}=\begin{bmatrix}1/a & 0\\ -b/(ac) & 1/c\end{bmatrix}
$$
计算矩阵乘积 $-\boldsymbol{X}^{-\top}\boldsymbol{X}^{-\top}$：
$$
-\begin{bmatrix}1/a & 0\\ -b/(ac) & 1/c\end{bmatrix}\begin{bmatrix}1/a & 0\\ -b/(ac) & 1/c\end{bmatrix}=-\begin{bmatrix}a^{-2} & 0\\ -\frac{b}{a^{2}c}-\frac{b}{ac^{2}} & c^{-2}\end{bmatrix}=\begin{bmatrix}-a^{-2} & 0\\ \frac{b(a+c)}{a^{2}c^{2}} & -c^{-2}\end{bmatrix}
$$
分量偏导矩阵与矩阵微分公式计算结果处处严格吻合。

**常见错误做法剖析**：本题在微分逆矩阵时极易生搬硬套标量倒数求导规则，误写成 $\frac{\partial\operatorname{tr}(\boldsymbol{X}^{-1})}{\partial\boldsymbol{X}}=-\boldsymbol{X}^{-2}$；当 $\boldsymbol{X}$ 非对称时，$-\boldsymbol{X}^{-2}$ 与 $-\boldsymbol{X}^{-\top}\boldsymbol{X}^{-\top}$ 存在本质差异，未转置将导致导数方向完全错误。
## 18. 

设三资产组合的波动率向量为 $\boldsymbol{\sigma}=[\sigma_1,\sigma_2,\sigma_3]^{\top}=[0.20,0.30,0.15]^{\top}$，等相关系数 $\rho=0.2$。

协方差矩阵元素为 $\Sigma_{ii}=\sigma_i^{2}$，$\Sigma_{ij}=\rho\sigma_i\sigma_j$（$i\ne j$）。计算各分量：
主对角元（方差）：
$$
\Sigma_{11}=0.20^{2}=0.04,\quad \Sigma_{22}=0.30^{2}=0.09,\quad \Sigma_{33}=0.15^{2}=0.0225
$$
非对角元（协方差）：
$$
\Sigma_{12}=\Sigma_{21}=0.2\times 0.20\times 0.30=0.012
$$
$$
\Sigma_{13}=\Sigma_{31}=0.2\times 0.20\times 0.15=0.006
$$
$$
\Sigma_{23}=\Sigma_{32}=0.2\times 0.30\times 0.15=0.009
$$
因此资产收益率的协方差矩阵为：
$$
\boldsymbol{\Sigma}=\begin{bmatrix}0.04 & 0.012 & 0.006\\ 0.012 & 0.09 & 0.009\\ 0.006 & 0.009 & 0.0225\end{bmatrix}
$$
组合方差公式为 $\sigma_p^{2}=\boldsymbol{w}^{\top}\boldsymbol{\Sigma}\boldsymbol{w}$。对其关于权重向量 $\boldsymbol{w}$ 求梯度：
$$
\nabla_{\boldsymbol{w}}\sigma_p^{2}=2\boldsymbol{\Sigma}\boldsymbol{w}
$$
在等权点 $\boldsymbol{w}_{\mathrm{ew}}=\left[\frac{1}{3},\frac{1}{3},\frac{1}{3}\right]^{\top}=\frac{1}{3}\boldsymbol{1}$ 处，代入计算矩阵乘积：
$$
\boldsymbol{\Sigma}\boldsymbol{1}=\begin{bmatrix}0.04+0.012+0.006\\ 0.012+0.09+0.009\\ 0.006+0.009+0.0225\end{bmatrix}=\begin{bmatrix}0.058\\ 0.111\\ 0.0375\end{bmatrix}
$$
因此梯度向量为：
$$
\nabla_{\boldsymbol{w}}\sigma_p^{2}=2\boldsymbol{\Sigma}\boldsymbol{w}_{\mathrm{ew}}=\frac{2}{3}\boldsymbol{\Sigma}\boldsymbol{1}=\frac{2}{3}\begin{bmatrix}0.058\\ 0.111\\ 0.0375\end{bmatrix}=\begin{bmatrix}\frac{0.116}{3}\\ 0.074\\ 0.025\end{bmatrix}=\begin{bmatrix}\frac{29}{750}\\ \frac{37}{500}\\ \frac{1}{40}\end{bmatrix}\approx\begin{bmatrix}0.03867\\ 0.07400\\ 0.02500\end{bmatrix}
$$
梯度各分量表示增加该资产边际权重时对组合总方差的边际贡献。第 2 种资产的边际方差贡献最高（约 $0.074$），第 3 种资产最低（$0.025$）。

**常见错误做法剖析**：本题最常见失误是在求标量关于向量导数时遗漏系数 $2$；或在组装协方差矩阵时误将标准差填入对角线而非方差 $\sigma_i^{2}$；另外在非对角线乘积中漏乘相关系数 $\rho$。

## 19. 

求解带全额投资约束的最小方差组合（GMVP）：
$$
\min_{\boldsymbol{w}}\quad \frac{1}{2}\boldsymbol{w}^{\top}\boldsymbol{\Sigma}\boldsymbol{w}\quad \text{s.t.}\quad \boldsymbol{1}^{\top}\boldsymbol{w}=1
$$
（若目标函数设为 $\boldsymbol{w}^{\top}\boldsymbol{\Sigma}\boldsymbol{w}$，则对应 Lagrange 乘子相差常数倍数，最优解相同）。引入 Lagrange 乘子 $\lambda$，构造辅助函数：
$$
\mathcal{L}(\boldsymbol{w},\lambda)=\frac{1}{2}\boldsymbol{w}^{\top}\boldsymbol{\Sigma}\boldsymbol{w}-\frac{\lambda}{2}(\boldsymbol{1}^{\top}\boldsymbol{w}-1)
$$
对 $\boldsymbol{w}$ 求一阶偏导并令其为零：
$$
\nabla_{\boldsymbol{w}}\mathcal{L}=\boldsymbol{\Sigma}\boldsymbol{w}-\frac{\lambda}{2}\boldsymbol{1}=\boldsymbol{0}\implies 2\boldsymbol{\Sigma}\boldsymbol{w}^{*}=\lambda\boldsymbol{1}
$$
由于 $\boldsymbol{\Sigma}\succ 0$，两边左乘 $\boldsymbol{\Sigma}^{-1}$：
$$
\boldsymbol{w}^{*}=\frac{\lambda}{2}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}
$$
利用全额投资约束 $\boldsymbol{1}^{\top}\boldsymbol{w}^{*}=1$：
$$
\boldsymbol{1}^{\top}\boldsymbol{w}^{*}=\frac{\lambda}{2}\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}=1\implies \frac{\lambda}{2}=\frac{1}{\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}
$$
代回可得最优权重向量封闭解：
$$
\boldsymbol{w}^{*}=\frac{\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}{\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}
$$
计算数值解：求解线性方程组 $\boldsymbol{\Sigma}\boldsymbol{u}=\boldsymbol{1}$，得到 $\boldsymbol{u}=\boldsymbol{\Sigma}^{-1}\boldsymbol{1}=\left[\frac{125}{7},\frac{625}{126},\frac{4750}{126}\right]^{\top}$。
对分量求和：$\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}=\frac{7625}{126}\approx 60.5159$。
因此最优权重精确为：
$$
\boldsymbol{w}^{*}=\left[\frac{18}{61},\frac{5}{61},\frac{38}{61}\right]^{\top}\approx [0.2951,0.0820,0.6230]^{\top}
$$
验证 $2\boldsymbol{\Sigma}\boldsymbol{w}^{*}=\lambda\boldsymbol{1}$：
$$
2\boldsymbol{\Sigma}\boldsymbol{w}^{*}=2\boldsymbol{\Sigma}\left(\frac{\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}{\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}\right)=\frac{2}{\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}\boldsymbol{1}=\frac{252}{7625}\boldsymbol{1}\approx 0.03305\boldsymbol{1}
$$
等式两边完全相等，各资产的边际方差贡献严格均等化。

最小方差组合的方差为：
$$
\sigma_{p*}^{2}=(\boldsymbol{w}^{*})^{\top}\boldsymbol{\Sigma}\boldsymbol{w}^{*}=\frac{1}{\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}}=\frac{126}{7625}\approx 0.016525
$$
其波动率为 $\sigma_{p*}=\sqrt{0.016525}\approx 12.85\%$。
对比等权组合（EW）：
$$
\sigma_{p,\mathrm{ew}}^{2}=\boldsymbol{w}_{\mathrm{ew}}^{\top}\boldsymbol{\Sigma}\boldsymbol{w}_{\mathrm{ew}}=\frac{1}{9}\boldsymbol{1}^{\top}\boldsymbol{\Sigma}\boldsymbol{1}=\frac{0.058+0.111+0.0375}{9}=\frac{0.2065}{9}=\frac{413}{18000}\approx 0.022944
$$
等权波动率为 $\sigma_{p,\mathrm{ew}}=\sqrt{0.022944}\approx 15.15\%$。
比较发现：$\sigma_{p*}^{2}<\sigma_{p,\mathrm{ew}}^{2}$，最小方差组合显著降低了组合风险。资产 3 波动率最低（$15\%$），在最优组合中获得了最大配置（$62.30\%$）；资产 2 波动率最高（$30\%$），仅获得最小配置（$8.20\%$）。

**常见错误做法剖析**：误将 Lagrange 乘子条件直接化简为 $\boldsymbol{w}\propto\boldsymbol{\Sigma}\boldsymbol{1}$（反用了协方差矩阵）；未进行归一化除以 $\boldsymbol{1}^{\top}\boldsymbol{\Sigma}^{-1}\boldsymbol{1}$；在对比方差时混淆了方差 $\sigma^{2}$ 与波动率 $\sigma$ 的数值。
## 20. 

设样本观测向量独立同分布于多元正态分布 $\boldsymbol{y}_t\sim N_p(\boldsymbol{\mu},\boldsymbol{\Sigma})$（$t=1,\dots,N$），其中 $\boldsymbol{\Sigma}\succ 0$。

单个样本的概率密度函数为：
$$
p(\boldsymbol{y}_t;\boldsymbol{\mu},\boldsymbol{\Sigma})=(2\pi)^{-p/2}|\det\boldsymbol{\Sigma}|^{-1/2}\exp\left(-\frac{1}{2}(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}(\boldsymbol{y}_t-\boldsymbol{\mu})\right)
$$
由独立性，样本联合对数似然函数为：
$$
\ell(\boldsymbol{\mu},\boldsymbol{\Sigma})=\sum_{t=1}^{N}\log p(\boldsymbol{y}_t;\boldsymbol{\mu},\boldsymbol{\Sigma})=-\frac{Np}{2}\log(2\pi)-\frac{N}{2}\log\det\boldsymbol{\Sigma}-\frac{1}{2}\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}(\boldsymbol{y}_t-\boldsymbol{\mu})
$$
利用二次型与迹的等价性 $\boldsymbol{z}^{\top}\boldsymbol{A}\boldsymbol{z}=\operatorname{tr}(\boldsymbol{A}\boldsymbol{z}\boldsymbol{z}^{\top})$，对数似然函数写为：
$$
\ell(\boldsymbol{\mu},\boldsymbol{\Sigma})=-\frac{Np}{2}\log(2\pi)-\frac{N}{2}\log\det\boldsymbol{\Sigma}-\frac{1}{2}\operatorname{tr}\left(\boldsymbol{\Sigma}^{-1}\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\right)
$$

**证明**

第一，求对均值向量 $\boldsymbol{\mu}$ 的导数并求极大似然估计。
对标量二次型项关于 $\boldsymbol{\mu}$ 求微分：
$$
\mathrm{d}_{\boldsymbol{\mu}}\left((\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}(\boldsymbol{y}_t-\boldsymbol{\mu})\right)=-2(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}\mathrm{d}\boldsymbol{\mu}
$$
代入对数似然微分：
$$
\mathrm{d}_{\boldsymbol{\mu}}\ell=-\frac{1}{2}\sum_{t=1}^{N}\left(-2(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}\mathrm{d}\boldsymbol{\mu}\right)=\left(\boldsymbol{\Sigma}^{-1}\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})\right)^{\top}\mathrm{d}\boldsymbol{\mu}
$$
因此一阶导数为：
$$
\frac{\partial\ell}{\partial\boldsymbol{\mu}}=\boldsymbol{\Sigma}^{-1}\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})
$$
令一阶导数为零向量：由于 $\boldsymbol{\Sigma}\succ 0$ 可逆，必须满足：
$$
\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})=\boldsymbol{0}\implies N\boldsymbol{\mu}=\sum_{t=1}^{N}\boldsymbol{y}_t
$$
解得极大似然估计量为样本均值向量：
$$
\hat{\boldsymbol{\mu}}=\frac{1}{N}\sum_{t=1}^{N}\boldsymbol{y}_t=\bar{\boldsymbol{y}}
$$

第二，求对协方差矩阵 $\boldsymbol{\Sigma}$ 的导数并求极大似然估计。
记散度矩阵 $\boldsymbol{S}_0=\sum_{t=1}^{N}(\boldsymbol{y}_t-\boldsymbol{\mu})(\boldsymbol{y}_t-\boldsymbol{\mu})^{\top}$。
利用 Jacobi 微分公式 (7.16) $\mathrm{d}\log\det\boldsymbol{\Sigma}=\operatorname{tr}(\boldsymbol{\Sigma}^{-1}\mathrm{d}\boldsymbol{\Sigma})$，以及逆矩阵微分公式 (7.17) $\mathrm{d}(\boldsymbol{\Sigma}^{-1})=-\boldsymbol{\Sigma}^{-1}(\mathrm{d}\boldsymbol{\Sigma})\boldsymbol{\Sigma}^{-1}$：
$$
\mathrm{d}_{\boldsymbol{\Sigma}}\ell=-\frac{N}{2}\operatorname{tr}(\boldsymbol{\Sigma}^{-1}\mathrm{d}\boldsymbol{\Sigma})-\frac{1}{2}\operatorname{tr}\left(\mathrm{d}(\boldsymbol{\Sigma}^{-1})\boldsymbol{S}_0\right)
$$
将公式 (7.17) 代入第二项并应用迹的循环性：
$$
\operatorname{tr}\left(-\boldsymbol{\Sigma}^{-1}(\mathrm{d}\boldsymbol{\Sigma})\boldsymbol{\Sigma}^{-1}\boldsymbol{S}_0\right)=-\operatorname{tr}\left(\boldsymbol{\Sigma}^{-1}\boldsymbol{S}_0\boldsymbol{\Sigma}^{-1}\mathrm{d}\boldsymbol{\Sigma}\right)
$$
因此全微分为：
$$
\mathrm{d}_{\boldsymbol{\Sigma}}\ell=\frac{1}{2}\operatorname{tr}\left(\left(\boldsymbol{\Sigma}^{-1}\boldsymbol{S}_0\boldsymbol{\Sigma}^{-1}-N\boldsymbol{\Sigma}^{-1}\right)\mathrm{d}\boldsymbol{\Sigma}\right)
$$
因为 $\boldsymbol{\Sigma}$ 与 $\boldsymbol{S}_0$ 均为实对称矩阵，括号内矩阵本身对称，令导数为零：
$$
\boldsymbol{\Sigma}^{-1}\boldsymbol{S}_0\boldsymbol{\Sigma}^{-1}-N\boldsymbol{\Sigma}^{-1}=\boldsymbol{0}
$$
两边分别左乘与右乘 $\boldsymbol{\Sigma}$：
$$
\boldsymbol{S}_0-N\boldsymbol{\Sigma}=\boldsymbol{0}\implies \boldsymbol{\Sigma}=\frac{1}{N}\boldsymbol{S}_0
$$
将已求得的 $\hat{\boldsymbol{\mu}}=\bar{\boldsymbol{y}}$ 代入 $\boldsymbol{S}_0$，得到协方差矩阵的极大似然估计：
$$
\hat{\boldsymbol{\Sigma}}=\frac{1}{N}\sum_{t=1}^{N}(\boldsymbol{y}_t-\bar{\boldsymbol{y}})(\boldsymbol{y}_t-\bar{\boldsymbol{y}})^{\top}
$$

□

当样本量 $N<p$ 时为何必须施加正定约束：
样本协方差矩阵 $\hat{\boldsymbol{\Sigma}}$ 是 $N$ 个秩为 $1$ 的外积矩阵之和，由于中心化损失 $1$ 个自由度，其矩阵的秩严格满足：
$$
\operatorname{rank}(\hat{\boldsymbol{\Sigma}})\le \min(N-1,p)\le N-1<p
$$
当 $N<p$ 时，$\hat{\boldsymbol{\Sigma}}$ 必定是奇异矩阵，存在至少 $p-(N-1)$ 个零特征值，此时行列式 $\det\hat{\boldsymbol{\Sigma}}=0$。
若不在参数空间上强加正定约束 $\boldsymbol{\Sigma}\succ 0$，当 $\boldsymbol{\Sigma}$ 在奇异子空间退化时，$-\frac{N}{2}\log\det\boldsymbol{\Sigma}\to +\infty$，对数似然函数出现无界发散，极大似然优化问题病态失效；同时逆矩阵 $\hat{\boldsymbol{\Sigma}}^{-1}$ 不存在，资产组合优化（如 Markowitz 最小方差组合）与风险度量无法进行。因此在小样本高维情境（$N<p$）下，必须引入正定约束或正则化（如 Ledoit-Wolf 收缩估计 $\hat{\boldsymbol{\Sigma}}_{\mathrm{shrink}}=(1-\alpha)\hat{\boldsymbol{\Sigma}}+\alpha\boldsymbol{I}$ 或对角加载），以确保协方差估计量严格正定可逆。

**常见错误做法剖析**：本题在微分逆矩阵时极易弄错复合微分的符号，将 $-\boldsymbol{\Sigma}^{-1}(\mathrm{d}\boldsymbol{\Sigma})\boldsymbol{\Sigma}^{-1}$ 误写为正号；在说明 $N<p$ 时，往往只说「不可逆」而未从外积秩之和的上限 $\operatorname{rank}\le N-1$ 与对数行列式发散这一根本机理进行严格数学剖析。