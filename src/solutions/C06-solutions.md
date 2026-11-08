# 第6章习题参考答案与解析

## 1. 

由特征值与特征向量的定义，标量 $\lambda$ 与非零向量 $\boldsymbol{x}$ 满足方程：
$$A\boldsymbol{x} = \lambda \boldsymbol{x}$$
对于 $\lambda + 3$，考虑矩阵 $A + 3I$，由矩阵乘法分配律得：
$$(A + 3I)\boldsymbol{x} = A\boldsymbol{x} + 3\boldsymbol{x} = \lambda \boldsymbol{x} + 3\boldsymbol{x} = (\lambda + 3)\boldsymbol{x}$$
因此 $\lambda + 3$ 是矩阵 $A + 3I$ 的特征值，对应特征向量仍为 $\boldsymbol{x}$。

对于 $2\lambda$，考虑数乘矩阵 $2A$，由数乘结合律得：
$$(2A)\boldsymbol{x} = 2(A\boldsymbol{x}) = 2(\lambda \boldsymbol{x}) = (2\lambda)\boldsymbol{x}$$
因此 $2\lambda$ 是矩阵 $2A$ 的特征值，对应特征向量仍为 $\boldsymbol{x}$。

对于 $\lambda^2$，考虑矩阵的平方 $A^2$，两边连续应用线性映射得：
$$A^2\boldsymbol{x} = A(A\boldsymbol{x}) = A(\lambda \boldsymbol{x}) = \lambda (A\boldsymbol{x}) = \lambda^2\boldsymbol{x}$$
因此 $\lambda^2$ 是矩阵 $A^2$ 的特征值，对应特征向量仍为 $\boldsymbol{x}$。

对于 $1/\lambda$（已知 $\lambda \ne 0$），由于 $\lambda$ 为非零特征值，故 $A$ 的零空间仅含零向量，矩阵 $A$ 可逆。在 $A\boldsymbol{x} = \lambda \boldsymbol{x}$ 两端左乘 $A^{-1}$ 并除以标量 $\lambda$，得到：
$$A^{-1}\boldsymbol{x} = \frac{1}{\lambda}\boldsymbol{x}$$
因此 $1/\lambda$ 是矩阵 $A^{-1}$ 的特征值，对应特征向量仍为 $\boldsymbol{x}$。

在特征向量定义中要求 $\boldsymbol{x} \ne \boldsymbol{0}$，是因为对任意方阵 $A$ 和任意标量 $c$，恒有 $A\boldsymbol{0} = c\boldsymbol{0}$。若允许特征向量为零向量，则任意标量都将成为特征值，特征值与特征子空间将失去对线性变换结构刻画与谱分解的数学意义。相反，特征值 $\lambda$ 完全可以为零：$\lambda = 0$ 意味着方程 $A\boldsymbol{x} = \boldsymbol{0}$ 存在非零解，即矩阵 $A$ 不可逆，其零空间维度大于零，这反映了线性变换存在降维投影的重要几何属性。

常见错误做法剖析：常见错误是将对特征向量的非零要求错误地加在特征值上，认为奇异矩阵不存在特征值；或者在推导逆矩阵特征值时直接将矩阵写在分母位置，忽视了矩阵除法的无定义性以及矩阵必须可逆的前提。

## 2. 

设待求特征值为 $\lambda$，对应的特征方程为：
$$\det(\lambda I - A) = 0$$
代入矩阵 $A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}$，计算行列式：
$$\det\begin{pmatrix} \lambda - 4 & -2 \\ -1 & \lambda - 3 \end{pmatrix} = (\lambda - 4)(\lambda - 3) - (-2)(-1) = \lambda^2 - 7\lambda + 10$$
令特征多项式为零，得到一元二次方程 $(\lambda - 5)(\lambda - 2) = 0$，解得全部特征值为：
$$\lambda_1 = 5,\quad \lambda_2 = 2$$

求解各特征值对应的特征向量：
当 $\lambda_1 = 5$ 时，求解齐次线性方程组 $(5I - A)\boldsymbol{x} = \boldsymbol{0}$，对应增广矩阵系数为：
$$\begin{pmatrix} 1 & -2 \\ -1 & 2 \end{pmatrix}$$
行化简得 $x_1 - 2x_2 = 0$，取自由未知量 $x_2 = 1$，得基础解系 $\boldsymbol{v}_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$。对应全部特征向量为 $c_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix}$，其中 $c_1 \ne 0$。

当 $\lambda_2 = 2$ 时，求解齐次线性方程组 $(2I - A)\boldsymbol{x} = \boldsymbol{0}$，对应增广矩阵系数为：
$$\begin{pmatrix} -2 & -2 \\ -1 & -1 \end{pmatrix}$$
行化简得 $x_1 + x_2 = 0$，取自由未知量 $x_2 = 1$，得基础解系 $\boldsymbol{v}_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$。对应全部特征向量为 $c_2 \begin{pmatrix} -1 \\ 1 \end{pmatrix}$，其中 $c_2 \ne 0$。

验证特征值之和与矩阵的迹：
$$\mathrm{tr} A = 4 + 3 = 7,\quad \lambda_1 + \lambda_2 = 5 + 2 = 7$$
两者严格相等。

验证特征值之积与矩阵的行列式：
$$\det A = 4 \times 3 - 2 \times 1 = 10,\quad \lambda_1 \lambda_2 = 5 \times 2 = 10$$
两者严格相等。

常见错误做法剖析：求解特征向量时仅给出一个特解向量，漏写任意非零常数倍；或在验证迹与行列式时记混公式，将非对称矩阵的特征向量误当成两两正交向量进行 Schmidt 正交化。

## 3. 

**证明**

设 $U = (u_{ij})_{n \times n}$ 为 $n$ 阶上三角矩阵，即当 $i > j$ 时满足 $u_{ij} = 0$。考虑其特征矩阵 $\lambda I - U$：
$$\lambda I - U = \begin{pmatrix} \lambda - u_{11} & -u_{12} & \cdots & -u_{1n} \\ 0 & \lambda - u_{22} & \cdots & -u_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda - u_{nn} \end{pmatrix}$$
易见 $\lambda I - U$ 仍为上三角矩阵。由行列式展开定理或上三角矩阵行列式性质，上三角矩阵的行列式等于其主对角线元素的连乘积，故其特征多项式为：
$$\det(\lambda I - U) = \prod_{i=1}^n (\lambda - u_{ii})$$
特征多项式的全部复根恰为对角元 $u_{11}, u_{22}, \dots, u_{nn}$。因此，上三角矩阵的全部特征值恰为其主对角线上的元素。

□

根据上述定理，对于矩阵 $\begin{pmatrix} 2 & 1 & 5 \\ 0 & -1 & 3 \\ 0 & 0 & 4 \end{pmatrix}$，其为主对角线元素为 $2, -1, 4$ 的三阶上三角矩阵。直接读出其三个特征值为：
$$\lambda_1 = 2,\quad \lambda_2 = -1,\quad \lambda_3 = 4$$

关于可对角化性的判断：该矩阵为三阶矩阵，且具有三个互不相同的特征值。根据线性代数基本定理，属于不同特征值的特征向量必线性无关，因此该矩阵存在三个线性无关的特征向量，构成了空间的一组基。所以该矩阵一定可以对角化。

常见错误做法剖析：部分做法机械地套用三角矩阵对角元即特征值的结论，误认为任意三角矩阵都一定可对角化。实际上，当对角线上存在重根时，几何重数可能小于代数重数（例如非平凡 Jordan 块上三角矩阵不可对角化）；本题之所以一定可对角化，充要原因在于特征值互异使得代数重数与几何重数处处为 1。

## 4. 

设三阶矩阵 $A$ 的特征值为 $\lambda_1 = 1, \lambda_2 = -2, \lambda_3 = 3$。

由谱映射定理，若 $\lambda$ 是方阵 $A$ 的特征值，则对任意多项式 $p(t)$，$p(\lambda)$ 必为矩阵 $p(A)$ 的特征值。令多项式为：
$$p(t) = t^2 - 2t + 1 = (t - 1)^2$$
对应的矩阵多项式即为 $p(A) = A^2 - 2A + I$。分别代入 $A$ 的三个特征值：
$$p(\lambda_1) = (1 - 1)^2 = 0$$
$$p(\lambda_2) = (-2 - 1)^2 = 9$$
$$p(\lambda_3) = (3 - 1)^2 = 4$$
因此，$A^2 - 2A + I$ 的全部特征值为 $0, 9, 4$。

计算行列式 $\det A$：矩阵的行列式等于其全部特征值之乘积，故：
$$\det A = \lambda_1 \lambda_2 \lambda_3 = 1 \times (-2) \times 3 = -6$$

计算矩阵的迹 $\mathrm{tr} A$：矩阵的主对角线元素之和等于全部特征值之和，故：
$$\mathrm{tr} A = \lambda_1 + \lambda_2 + \lambda_3 = 1 + (-2) + 3 = 2$$

计算逆矩阵的行列式 $\det(A^{-1})$：由于 $\det A = -6 \ne 0$，$A$ 可逆。利用逆矩阵行列式性质可得：
$$\det(A^{-1}) = \frac{1}{\det A} = -\frac{1}{6}$$

常见错误做法剖析：计算 $p(\lambda_2)$ 时符号运算错误，将 $(-2)^2 - 2(-2) + 1$ 误算为 $4 - 4 + 1 = 1$；或在求解 $\det(A^{-1})$ 时试图先还原矩阵 $A$ 具体元素，忽略了特征值性质可直接得出全局行列式。

## 5. 

**证明**

设 $\lambda$ 为矩阵 $A$ 的任意一个特征值，$\boldsymbol{x}$ 为对应的特征向量，满足 $\boldsymbol{x} \ne \boldsymbol{0}$ 且：
$$A\boldsymbol{x} = \lambda \boldsymbol{x}$$
在上述方程两端左乘矩阵 $A$，利用矩阵乘法结合律与特征方程得：
$$A^2\boldsymbol{x} = A(A\boldsymbol{x}) = A(\lambda \boldsymbol{x}) = \lambda (A\boldsymbol{x}) = \lambda^2\boldsymbol{x}$$
另一方面，题目已知 $A^2 = A$，故直接有：
$$A^2\boldsymbol{x} = A\boldsymbol{x} = \lambda \boldsymbol{x}$$
结合两式整理可得：
$$(\lambda^2 - \lambda)\boldsymbol{x} = \boldsymbol{0}$$
由于特征向量定义要求 $\boldsymbol{x} \ne \boldsymbol{0}$，因此必有代数标量方程：
$$\lambda^2 - \lambda = 0 \implies \lambda(\lambda - 1) = 0$$
由此严格证明了 $A$ 的特征值只能是 $0$ 或 $1$。

□

关于 $\mathrm{tr} A$ 的几何含义：满足 $A^2 = A$ 的方阵称为投影矩阵（或幂等矩阵）。在线性空间中，它表示沿其零空间 $\ker A$ 向其像空间 $\operatorname{im} A$ 的投影变换。多项式 $t^2 - t = t(t - 1)$ 具有互异单根，故 $A$ 的极小多项式无重根，矩阵 $A$ 必然可以对角化。在对角化基下，对角元全为特征值 $1$ 或 $0$。矩阵的迹等于特征值之和，即特征值 $1$ 的代数重数。由于每个特征值的代数重数等于几何重数，特征值 $1$ 的重数恰好等于像空间 $\operatorname{im} A$ 的维数，即矩阵的秩 $\operatorname{rank} A$。因此，$\mathrm{tr} A$ 的几何含义为投影目标子空间的维数（即投影变换的秩）。

常见错误做法剖析：部分做法直接断言 $\lambda^2 = \lambda$ 便断定 $A$ 一定同时拥有特征值 $0$ 和 $1$，忽视了当 $A = I$ 时特征值全为 $1$、当 $A = O$ 时特征值全为 $0$ 的退化情形；另外，在解释几何含义时未指出可对角化性，导致迹等于秩的论证不够严密。

## 6. 

**证明**

设方阵 $A$ 与 $B$ 相似，即存在可逆矩阵 $P$，使得：
$$B = P^{-1}AP$$
考察矩阵 $B$ 的特征矩阵 $\lambda I - B$。注意单位矩阵满足 $\lambda I = P^{-1}(\lambda I)P$，代入可得：
$$\lambda I - B = P^{-1}(\lambda I)P - P^{-1}AP = P^{-1}(\lambda I - A)P$$
计算其特征多项式，并利用方阵乘积的行列式性质 $\det(XY) = \det X \det Y$ 与 $\det(P^{-1}) = (\det P)^{-1}$：
$$\det(\lambda I - B) = \det(P^{-1})\det(\lambda I - A)\det(P) = \det(\lambda I - A)$$
由此证明了相似矩阵具有完全相同的特征多项式。由于特征值是特征多项式的根，代数重数是根的重数，因此相似矩阵必具有相同的特征值及其代数重数。

□

反例说明：特征值完全相同并不能推出矩阵相似。考虑以下两个二阶实方阵：
$$A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I,\quad B = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$$
矩阵 $A$ 与 $B$ 的特征多项式均为 $(\lambda - 1)^2$，因而具有完全相同的特征值 $\lambda_1 = \lambda_2 = 1$。
然而，对任意可逆矩阵 $P$，根据单位矩阵与任意矩阵可交换的性质，恒有：
$$P^{-1}AP = P^{-1}IP = I \ne B$$
因此不存在可逆矩阵使得 $B = P^{-1}AP$。矩阵 $A$ 已经是对角矩阵，几何重数为 2；而矩阵 $B$ 对应的特征子空间维数为 $2 - \operatorname{rank}(B - I) = 1$，不可对角化，两者的 Jordan 标准形不同，因而二者不相似。

常见错误做法剖析：误认为“特征值相同”与“矩阵相似”是充要关系，忽略了矩阵的可对角化性以及几何重数（初等因子结构）对相似分类的决定性作用。

## 7. 

设 $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$。计算其特征多项式：
$$\det(\lambda I - A) = \det\begin{pmatrix} \lambda - 1 & -1 \\ 0 & \lambda - 1 \end{pmatrix} = (\lambda - 1)^2$$
令特征多项式为零，得到矩阵 $A$ 仅有唯一特征值 $\lambda = 1$。由根的重数可知，特征值 $\lambda = 1$ 的代数重数为：
$$m_a(1) = 2$$

下面求解特征值 $\lambda = 1$ 对应的特征子空间，并确定其几何重数 $m_g(1)$：
考察齐次线性方程组 $(I - A)\boldsymbol{x} = \boldsymbol{0}$，对应系数矩阵为：
$$I - A = \begin{pmatrix} 0 & -1 \\ 0 & 0 \end{pmatrix}$$
该矩阵的非零行数为 1，故矩阵的秩为 $\operatorname{rank}(I - A) = 1$。
根据秩-零度定理，特征子空间 $\ker(I - A)$ 的维数（即几何重数）为：
$$m_g(1) = 2 - \operatorname{rank}(I - A) = 2 - 1 = 1$$

可对角化判定结论：矩阵可对角化的充要条件是其每个特征值的几何重数均等于其代数重数。在本题中，$m_g(1) = 1 < m_a(1) = 2$，即矩阵至多只能提供一个线性无关的特征向量，无法张成 $\mathbb R^2$ 空间。因此，矩阵 $A$ 不可对角化。

常见错误做法剖析：容易混淆矩阵的“可逆性”与“可对角化性”。因为 $\det A = 1 \ne 0$，矩阵明显可逆，初学者常误以为可逆矩阵即可对角化，从而忽略了重根特征向量缺失导致的亏损现象。
## 8. 

设 $A = \begin{pmatrix} 5 & 2 \\ 2 & 2 \end{pmatrix}$。求解其特征多项式：
$$\det(\lambda I - A) = \det\begin{pmatrix} \lambda - 5 & -2 \\ -2 & \lambda - 2 \end{pmatrix} = (\lambda - 5)(\lambda - 2) - (-2)(-2) = \lambda^2 - 7\lambda + 6$$
因式分解得 $(\lambda - 6)(\lambda - 1) = 0$，解得两个特征值为：
$$\lambda_1 = 6,\quad \lambda_2 = 1$$

分别求对应的特征向量：
当 $\lambda_1 = 6$ 时，求解方程组 $(6I - A)\boldsymbol{x} = \boldsymbol{0}$，即：
$$\begin{pmatrix} 1 & -2 \\ -2 & 4 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
得到 $x_1 - 2x_2 = 0$，取特征向量 $\boldsymbol{p}_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$。

当 $\lambda_2 = 1$ 时，求解方程组 $(I - A)\boldsymbol{x} = \boldsymbol{0}$，即：
$$\begin{pmatrix} -4 & -2 \\ -2 & -1 \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
得到 $2x_1 + x_2 = 0$，取特征向量 $\boldsymbol{p}_2 = \begin{pmatrix} -1 \\ 2 \end{pmatrix}$。

由特征向量构成可逆变换矩阵 $P$ 与对角矩阵 $\Lambda$：
$$P = (\boldsymbol{p}_1, \boldsymbol{p}_2) = \begin{pmatrix} 2 & -1 \\ 1 & 2 \end{pmatrix},\quad \Lambda = \begin{pmatrix} 6 & 0 \\ 0 & 1 \end{pmatrix}$$
计算 $P$ 的行列式 $\det P = 2 \times 2 - (-1) \times 1 = 5$，求得逆矩阵：
$$P^{-1} = \frac{1}{5}\begin{pmatrix} 2 & 1 \\ -1 & 2 \end{pmatrix}$$
由此满足相似对角化分解 $A = P\Lambda P^{-1}$。

利用相似对角化计算矩阵的高次幂 $A^{10}$：
$$A^{10} = P \Lambda^{10} P^{-1} = \begin{pmatrix} 2 & -1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 6^{10} & 0 \\ 0 & 1^{10} \end{pmatrix} \frac{1}{5}\begin{pmatrix} 2 & 1 \\ -1 & 2 \end{pmatrix}$$
分步进行矩阵乘法：
$$A^{10} = \frac{1}{5}\begin{pmatrix} 2 \cdot 6^{10} & -1 \\ 6^{10} & 2 \end{pmatrix}\begin{pmatrix} 2 & 1 \\ -1 & 2 \end{pmatrix} = \frac{1}{5}\begin{pmatrix} 4 \cdot 6^{10} + 1 & 2 \cdot 6^{10} - 2 \\ 2 \cdot 6^{10} - 2 & 6^{10} + 4 \end{pmatrix}$$

常见错误做法剖析：求逆矩阵 $P^{-1}$ 时遗漏除以行列式 $\det P = 5$；或者将矩阵 $P$ 中的列向量排列次序与对角矩阵 $\Lambda$ 上的特征值次序颠倒对应，导致乘积不等于原矩阵。

## 9. 

设实对称矩阵 $A = \begin{pmatrix} 3 & 1 & 1 \\ 1 & 3 & 1 \\ 1 & 1 & 3 \end{pmatrix}$。计算其特征多项式：
$$\det(\lambda I - A) = \det\begin{pmatrix} \lambda - 3 & -1 & -1 \\ -1 & \lambda - 3 & -1 \\ -1 & -1 & \lambda - 3 \end{pmatrix}$$
将第 2、3 行全部加到第 1 行，提取公因式 $(\lambda - 5)$，再进行初等行变换化为上三角行列式，可得：
$$\det(\lambda I - A) = (\lambda - 5)(\lambda - 2)^2$$
令行列式为零，得到全部特征值：
$$\lambda_1 = 5,\qquad \lambda_2 = \lambda_3 = 2$$
其中 $\lambda_1$ 的代数重数为 1，$\lambda_2=\lambda_3=2$ 的代数重数为 2。

求解特征向量并进行标准正交化：
当 $\lambda_1 = 5$ 时，解齐次方程 $(5I - A)\boldsymbol{x} = \boldsymbol{0}$，系数矩阵各行均等价于 $2x_1 - x_2 - x_3 = 0$，解得 $x_1 = x_2 = x_3$。基础解系为 $(1, 1, 1)^\top$，单位化得：
$$\boldsymbol{q}_1 = \frac{1}{\sqrt{3}}\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$$

当重特征值 $\lambda = 2$ 时，解齐次方程 $(2I - A)\boldsymbol{x} = \boldsymbol{0}$，系数矩阵行化简为单一平面方程：
$$x_1 + x_2 + x_3 = 0$$
选取两个线性无关的基础解：
$$\boldsymbol{u}_2 = \begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix},\quad \boldsymbol{u}_3 = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix}$$
利用 Gram-Schmidt 正交化方法构造正交基。取 $\boldsymbol{v}_2 = \boldsymbol{u}_2$，对 $\boldsymbol{u}_3$ 进行正交投影剥离：
$$\boldsymbol{v}_3 = \boldsymbol{u}_3 - \frac{\boldsymbol{u}_3^\top \boldsymbol{v}_2}{\boldsymbol{v}_2^\top \boldsymbol{v}_2}\boldsymbol{v}_2 = \begin{pmatrix} 1 \\ 0 \\ -1 \end{pmatrix} - \frac{1}{2}\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1/2 \\ 1/2 \\ -1 \end{pmatrix}$$
将 $\boldsymbol{v}_2, \boldsymbol{v}_3$ 分别单位化，得：
$$\boldsymbol{q}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix},\quad \boldsymbol{q}_3 = \frac{1}{\sqrt{6}}\begin{pmatrix} 1 \\ 1 \\ -2 \end{pmatrix}$$
容易验证 $\boldsymbol{q}_1, \boldsymbol{q}_2, \boldsymbol{q}_3$ 构成全空间 $\mathbb R^3$ 的一组标准正交特征向量。

常见错误做法剖析：对于重特征值 $\lambda = 2$ 对应的二维特征子空间，求出任意两个基础解后直接归一化，未进行 Gram-Schmidt 正交化，导致两个特征向量不互相垂直，破坏了正交矩阵的构造。

## 10. 

**证明**

设 $A \in \mathbb R^{n \times n}$ 为实对称矩阵。由实对称矩阵的谱定理（定理 6.10），存在由 $n$ 个两两正交的实单位特征向量构成的正交矩阵 $Q = (\boldsymbol{q}_1, \boldsymbol{q}_2, \dots, \boldsymbol{q}_n)$，以及实对角矩阵 $\Lambda = \operatorname{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)$，使得：
$$Q^\top AQ = \Lambda$$
设 $\mu$ 为实对称矩阵 $A$ 的任意一个互异特征值，其代数重数记为 $m_a(\mu)$。由于正交相似变换不改变特征多项式，故有：
$$\det(\lambda I - A) = \det(\lambda I - \Lambda) = \prod_{i=1}^n (\lambda - \lambda_i)$$
由此可知，在对角矩阵 $\Lambda$ 的主对角线上，等于 $\mu$ 的对角元个数恰好为 $m_a(\mu)$。

不失一般性，设主对角线上等于 $\mu$ 的对角元对应的指标集为 $J \subset \{1, 2, \dots, n\}$，则其势满足 $|J| = m_a(\mu)$。对应地，正交矩阵 $Q$ 中以 $J$ 为下标的列向量组 $\{\boldsymbol{q}_j : j \in J\}$ 均满足特征方程：
$$A\boldsymbol{q}_j = \mu \boldsymbol{q}_j,\quad \forall j \in J$$
因此向量组 $\{\boldsymbol{q}_j : j \in J\}$ 均属于特征子空间 $\ker(\mu I - A)$。因为 $Q$ 为正交矩阵，其各列向量两两正交且为非零单位向量，所以这 $|J|$ 个向量必线性无关。

根据特征子空间的维数定义，几何重数 $m_g(\mu) = \dim\ker(\mu I - A)$，故有：
$$m_g(\mu) \ge |J| = m_a(\mu)$$
另一方面，根据线性代数一般理论，任意方阵特征值的几何重数恒不超过其代数重数，即：
$$m_g(\mu) \le m_a(\mu)$$
综合上述两方面不等式，必有：
$$m_g(\mu) = m_a(\mu)$$
由此严格证明了实对称矩阵的每个特征值的几何重数等于其代数重数。

□

常见错误做法剖析：误以为几何重数等于代数重数对任意方阵都成立，忽略了这是实对称（或正规）矩阵的独有优良性质；或在推导中仅说明特征向量线性无关，未能借助谱定理构造出个数精确达到代数重数的正交特征向量组。
## 11. 

由习题 9 的计算，实对称矩阵 $A = \begin{pmatrix} 3 & 1 & 1 \\ 1 & 3 & 1 \\ 1 & 1 & 3 \end{pmatrix}$ 对应的标准正交特征向量组为：
$$\boldsymbol{q}_1 = \frac{1}{\sqrt{3}}\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix},\quad \boldsymbol{q}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix},\quad \boldsymbol{q}_3 = \frac{1}{\sqrt{6}}\begin{pmatrix} 1 \\ 1 \\ -2 \end{pmatrix}$$
分别对应特征值 $\lambda_1 = 5, \lambda_2 = 2, \lambda_3 = 2$。

将三个标准正交特征向量按列拼成正交矩阵 $Q$：
$$Q = (\boldsymbol{q}_1, \boldsymbol{q}_2, \boldsymbol{q}_3) = \begin{pmatrix} \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\ \frac{1}{\sqrt{3}} & -\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\ \frac{1}{\sqrt{3}} & 0 & -\frac{2}{\sqrt{6}} \end{pmatrix}$$
满足正交相似对角化关系：
$$Q^\top AQ = \Lambda = \begin{pmatrix} 5 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{pmatrix}$$

利用谱分解定理展开 $A = \sum_{i=1}^3 \lambda_i \boldsymbol{q}_i \boldsymbol{q}_i^\top$：
计算三个秩一正交投影外积矩阵：
$$\boldsymbol{q}_1 \boldsymbol{q}_1^\top = \frac{1}{3}\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}\begin{pmatrix} 1 & 1 & 1 \end{pmatrix} = \frac{1}{3}\begin{pmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{pmatrix}$$
$$\boldsymbol{q}_2 \boldsymbol{q}_2^\top = \frac{1}{2}\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix}\begin{pmatrix} 1 & -1 & 0 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 1 & -1 & 0 \\ -1 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix}$$
$$\boldsymbol{q}_3 \boldsymbol{q}_3^\top = \frac{1}{6}\begin{pmatrix} 1 \\ 1 \\ -2 \end{pmatrix}\begin{pmatrix} 1 & 1 & -2 \end{pmatrix} = \frac{1}{6}\begin{pmatrix} 1 & 1 & -2 \\ 1 & 1 & -2 \\ -2 & -2 & 4 \end{pmatrix}$$

将各外积按特征值加权求和还原矩阵 $A$：
$$A = 5 \boldsymbol{q}_1 \boldsymbol{q}_1^\top + 2 \boldsymbol{q}_2 \boldsymbol{q}_2^\top + 2 \boldsymbol{q}_3 \boldsymbol{q}_3^\top$$
利用同一特征子空间单位投影和性质 $\boldsymbol{q}_2 \boldsymbol{q}_2^\top + \boldsymbol{q}_3 \boldsymbol{q}_3^\top = I - \boldsymbol{q}_1 \boldsymbol{q}_1^\top$，化简验证：
$$A = 5 \boldsymbol{q}_1 \boldsymbol{q}_1^\top + 2 (I - \boldsymbol{q}_1 \boldsymbol{q}_1^\top) = 2I + 3\boldsymbol{q}_1 \boldsymbol{q}_1^\top$$
$$A = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{pmatrix} + \begin{pmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{pmatrix} = \begin{pmatrix} 3 & 1 & 1 \\ 1 & 3 & 1 \\ 1 & 1 & 3 \end{pmatrix}$$
计算结果严格还原了原矩阵 $A$。

常见错误做法剖析：计算外积时将列向量乘以行向量误写为标量内积；或者重特征值对应的两个投影矩阵相加时出现通分符号错误。

## 12. 

本题依据实对称矩阵顺序主子式判别法（Sylvester 准则）及二次型定义进行判定，不求特征值。

对矩阵 $A_1 = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$：
矩阵为实对称矩阵。计算其各阶顺序主子式：
一阶顺序主子式：$\Delta_1 = 2 > 0$；
二阶顺序主子式：$\Delta_2 = \det A_1 = 2 \times 2 - 1 \times 1 = 3 > 0$。
因为各阶顺序主子式均严格大于零，由 Sylvester 判别法可知，$A_1$ 是正定矩阵。

对矩阵 $A_2 = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$：
矩阵为实对称矩阵。计算其二阶顺序主子式（行列式）：
$\det A_2 = 1 \times 1 - 2 \times 2 = -3 < 0$。
考察其对应的二次型 $q(\boldsymbol{x}) = x_1^2 + 4x_1 x_2 + x_2^2$：
取向量 $\boldsymbol{x} = (1, 0)^\top$ 时，二次型值为 $q(1, 0) = 1 > 0$；
取向量 $\boldsymbol{x} = (1, -1)^\top$ 时，二次型值为 $q(1, -1) = 1 - 4 + 1 = -2 < 0$。
二次型既能取正值又能取负值，因此 $A_2$ 是不定矩阵。

对矩阵 $A_3 = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$：
矩阵为实对称矩阵。对任意非零向量 $\boldsymbol{x} = (x_1, x_2)^\top \in \mathbb R^2$，计算二次型：
$$\boldsymbol{x}^\top A_3 \boldsymbol{x} = x_1^2 + 2x_1 x_2 + x_2^2 = (x_1 + x_2)^2 \ge 0$$
由此二次型恒非负。进一步选取非零向量 $\boldsymbol{x} = (1, -1)^\top \ne \boldsymbol{0}$，可得 $\boldsymbol{x}^\top A_3 \boldsymbol{x} = (1 - 1)^2 = 0$。因此二次型非负但并非严格大于零，故 $A_3$ 是半正定矩阵（非严格正定）。

常见错误做法剖析：忽视题目“不求特征值”的约束条件，直接求解特征多项式根；判定半正定时仅看顺序主子式 $\Delta_1 > 0, \Delta_2 = 0$，混淆了半正定需要全部主子式非负的充要条件，最稳妥的方法是直接考察二次型的完全平方式。

## 13. 

根据实对称矩阵特征值判别法（定理 6.11），对称矩阵的定性完全由其特征值的正负决定。
计算参数矩阵 $A(a) = \begin{pmatrix} a & 3 \\ 3 & a \end{pmatrix}$ 的特征方程：
$$\det(\lambda I - A(a)) = \det\begin{pmatrix} \lambda - a & -3 \\ -3 & \lambda - a \end{pmatrix} = (\lambda - a)^2 - 9 = 0$$
解得两个实特征值为：
$$\lambda_1 = a + 3,\quad \lambda_2 = a - 3$$

利用特征值符号判定：
1. 正定：要求全部特征值严格大于零，即 $\lambda_1 > 0$ 且 $\lambda_2 > 0$：
$$a + 3 > 0,\qquad a - 3 > 0 \implies a > 3$$
2. 半正定：要求全部特征值非负，即 $\lambda_1 \ge 0$ 且 $\lambda_2 \ge 0$：
$$a + 3 \ge 0,\qquad a - 3 \ge 0 \implies a \ge 3$$
3. 负定：要求全部特征值严格小于零，即 $\lambda_1 < 0$ 且 $\lambda_2 < 0$：
$$a + 3 < 0,\qquad a - 3 < 0 \implies a < -3$$

与顺序主子式判别法对照：
计算矩阵 $A(a)$ 的一阶与二阶顺序主子式：
$$\Delta_1 = a,\quad \Delta_2 = \det A(a) = a^2 - 9$$
1. 正定：Sylvester 准则要求所有顺序主子式严格为正：
$$\Delta_1 = a > 0,\qquad \Delta_2 = a^2 - 9 > 0 \implies a > 3$$
2. 负定：充要条件为顺序主子式符号正负交替，奇数阶为负、偶数阶为正：
$$\Delta_1 = a < 0,\qquad \Delta_2 = a^2 - 9 > 0 \implies a < -3$$
3. 半正定：充要条件为所有主子式非负，即主对角元非负且行列式非负：
$$a \ge 0,\qquad a^2 - 9 \ge 0 \implies a \ge 3$$
两种判别方法所得范围完全吻合。

常见错误做法剖析：判定负定时，误将条件记为“全部顺序主子式小于零”，忘记了二阶顺序主子式是由两个负特征值相乘得到，必须大于零。
## 14. 

**证明**

设 $A, B \in \mathbb R^{n \times n}$ 均为正定实对称矩阵。由定义，满足 $A^\top = A, B^\top = B$，且对任意非零向量 $\boldsymbol{x} \in \mathbb R^n$（$\boldsymbol{x} \ne \boldsymbol{0}$），均有：
$$\boldsymbol{x}^\top A \boldsymbol{x} > 0,\quad \boldsymbol{x}^\top B \boldsymbol{x} > 0$$

首先验证矩阵之和的对称性：由转置算子的线性分配性质，
$$(A + B)^\top = A^\top + B^\top = A + B$$
因此 $A + B$ 仍为实对称矩阵。

其次验证二次型的严格正定性：对任意非零向量 $\boldsymbol{x} \ne \boldsymbol{0}$，由矩阵运算的分配律得：
$$\boldsymbol{x}^\top (A + B) \boldsymbol{x} = \boldsymbol{x}^\top A \boldsymbol{x} + \boldsymbol{x}^\top B \boldsymbol{x}$$
由实数正数的加法封闭性，两正项相加必严格大于零，即：
$$\boldsymbol{x}^\top (A + B) \boldsymbol{x} > 0$$
综合对称性与二次型严格正性，证明了 $A + B$ 必然为正定矩阵。

□

反例说明（乘积 $AB$ 未必对称、从而未必正定）：
构造二阶正定对称矩阵如下：
$$A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix},\quad B = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$$
矩阵 $B$ 为主对角元全正的对角矩阵：其非对角元为零、各阶顺序主子式为对角元之积，全正，故对称正定；矩阵 $A$ 的一阶主子式 $2 > 0$、行列式 $2 \times 2 - 1 \times 1 = 3 > 0$，故对称正定。
计算两者的乘积矩阵 $AB$：
$$AB = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 2 & 2 \\ 1 & 4 \end{pmatrix}$$
考察其转置矩阵：
$$(AB)^\top = \begin{pmatrix} 2 & 1 \\ 2 & 4 \end{pmatrix} \ne AB$$
由于 $(AB)_{12} = 2 \ne 1 = (AB)_{21}$，乘积矩阵 $AB$ 连最基本的对称性都不满足。根据实对称正定矩阵的经典数学定义，实数域上的正定矩阵必须是对称的，因此 $AB$ 未必对称，从而未必正定。只有当两矩阵可交换（即 $AB = BA$）时，$AB$ 才保持对称性。

常见错误做法剖析：误将标量正数相乘仍为正数的直觉迁移到矩阵乘积上，忽略了矩阵乘法的非对易性；或者未证明加法矩阵是对称的就直接断定正定。

## 15. 

**证明**

设 $M \in \mathbb R^{m \times n}$ 为实矩阵。

首先证明对称性与半正定性：
考查矩阵 $M^\top M$ 的转置，由反乘法则：
$$(M^\top M)^\top = M^\top (M^\top)^\top = M^\top M$$
矩阵 $M^\top M$ 为 $n \times n$ 阶实对称矩阵。
对任意向量 $\boldsymbol{x} \in \mathbb R^n$，计算对应的二次型：
$$\boldsymbol{x}^\top (M^\top M) \boldsymbol{x} = (M\boldsymbol{x})^\top (M\boldsymbol{x}) = \|M\boldsymbol{x}\|_2^2$$
由实数空间 Euclidean 范数的非负性公理，对任意 $\boldsymbol{x} \in \mathbb R^n$，恒有：
$$\|M\boldsymbol{x}\|_2^2 \ge 0$$
因此 $M^\top M$ 必为实对称半正定矩阵。

下面证明充分必要性条件：$M^\top M$ 正定当且仅当 $M$ 的列向量线性无关。
根据实对称矩阵正定的定义，$M^\top M$ 正定等价于对任意非零向量 $\boldsymbol{x} \ne \boldsymbol{0}$，均有：
$$\boldsymbol{x}^\top (M^\top M) \boldsymbol{x} > 0$$
结合二次型为范数平方的形式，有：
$$\boldsymbol{x}^\top (M^\top M) \boldsymbol{x} = 0 \iff \|M\boldsymbol{x}\|_2^2 = 0 \iff M\boldsymbol{x} = \boldsymbol{0}$$
因此，对所有 $\boldsymbol{x} \ne \boldsymbol{0}$ 均有 $\boldsymbol{x}^\top (M^\top M) \boldsymbol{x} > 0$ 等价于齐次线性方程组 $M\boldsymbol{x} = \boldsymbol{0}$ 仅存在平凡解 $\boldsymbol{x} = \boldsymbol{0}$，即矩阵的零空间为平凡空间 $\ker M = \{\boldsymbol{0}\}$。
将 $M$ 按列向量分块表示为 $M = (\boldsymbol{m}_1, \boldsymbol{m}_2, \dots, \boldsymbol{m}_n)$，则 $M\boldsymbol{x} = \sum_{j=1}^n x_j \boldsymbol{m}_j$。
线性方程组 $M\boldsymbol{x} = \boldsymbol{0}$ 仅有零解，恰好等价于列向量组 $\{\boldsymbol{m}_1, \boldsymbol{m}_2, \dots, \boldsymbol{m}_n\}$ 线性无关（即矩阵具有列满秩 $\operatorname{rank} M = n$）。
由此充分必要性完全得证。

□

常见错误做法剖析：只证明半正定而漏掉正定的充要条件分析；或误以为只要 $M$ 自身不为零矩阵 $M^\top M$ 就正定，忽略了当矩阵列线性相关时零空间存在非零向量导致二次型为零。

## 16. 

设 $A = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$，初值向量 $\boldsymbol{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$。

先求矩阵 $A$ 的特征值以确定理论收敛率：
计算特征方程 $\det(\lambda I - A) = (\lambda - 3)^2 - 1 = 0$，解得两个特征值为：
$$\lambda_1 = 4,\quad \lambda_2 = 2$$
主特征值为 $\lambda_1 = 4$，次特征值为 $\lambda_2 = 2$。因此幂法的理论渐近收敛率为：
$$\left|\frac{\lambda_2}{\lambda_1}\right| = \left|\frac{2}{4}\right| = 0.5$$

根据标准幂迭代格式 $\boldsymbol{y}_{k+1} = A\boldsymbol{x}_k$，$\boldsymbol{x}_{k+1} = \frac{\boldsymbol{y}_{k+1}}{\|\boldsymbol{y}_{k+1}\|_2}$，以及 Rayleigh 商公式 $R(A, \boldsymbol{x}) = \frac{\boldsymbol{x}^\top A \boldsymbol{x}}{\boldsymbol{x}^\top \boldsymbol{x}}$（对于单位向量为 $\boldsymbol{x}^\top A \boldsymbol{x}$）：

第 1 步迭代：
计算乘积向量：
$$\boldsymbol{y}_1 = A\boldsymbol{x}_0 = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$$
其 Euclidean 范数为 $\|\boldsymbol{y}_1\|_2 = \sqrt{3^2 + 1^2} = \sqrt{10}$。
归一化得到第 1 步向量：
$$\boldsymbol{x}_1 = \frac{1}{\sqrt{10}}\begin{pmatrix} 3 \\ 1 \end{pmatrix}$$
计算第 1 步的 Rayleigh 商：
$$R(A, \boldsymbol{x}_1) = \boldsymbol{x}_1^\top A \boldsymbol{x}_1 = \frac{1}{10}\begin{pmatrix} 3 & 1 \end{pmatrix}\begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \frac{1}{10}\begin{pmatrix} 3 & 1 \end{pmatrix}\begin{pmatrix} 10 \\ 6 \end{pmatrix} = \frac{36}{10} = 3.6$$

第 2 步迭代：
计算乘积向量：
$$\boldsymbol{y}_2 = A\boldsymbol{x}_1 = \frac{1}{\sqrt{10}}\begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{10}}\begin{pmatrix} 10 \\ 6 \end{pmatrix}$$
计算范数：
$$\|\boldsymbol{y}_2\|_2 = \frac{1}{\sqrt{10}}\sqrt{10^2 + 6^2} = \frac{\sqrt{136}}{\sqrt{10}} = \frac{2\sqrt{34}}{\sqrt{10}} = \sqrt{\frac{68}{5}}$$
归一化得到第 2 步向量：
$$\boldsymbol{x}_2 = \frac{1}{\sqrt{136}}\begin{pmatrix} 10 \\ 6 \end{pmatrix} = \frac{1}{\sqrt{34}}\begin{pmatrix} 5 \\ 3 \end{pmatrix}$$
计算第 2 步的 Rayleigh 商：
$$R(A, \boldsymbol{x}_2) = \boldsymbol{x}_2^\top A \boldsymbol{x}_2 = \frac{1}{34}\begin{pmatrix} 5 & 3 \end{pmatrix}\begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}\begin{pmatrix} 5 \\ 3 \end{pmatrix} = \frac{1}{34}\begin{pmatrix} 5 & 3 \end{pmatrix}\begin{pmatrix} 18 \\ 14 \end{pmatrix} = \frac{90 + 42}{34} = \frac{132}{34} = \frac{66}{17} \approx 3.8824$$
可见两步迭代后 Rayleigh 商迅速由 3.6 逼近主特征值 4。

常见错误做法剖析：迭代过程中省略归一化除以范数的步骤，导致数值逐步发散放大；或者在计算收敛率时颠倒了比值顺序得到大于 1 的发散比率。
## 17. 

设 $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$。求解特征方程：
$$\det(\lambda I - A) = \det\begin{pmatrix} \lambda & -1 \\ -1 & \lambda \end{pmatrix} = \lambda^2 - 1 = 0$$
解得矩阵的两个特征值为：
$$\lambda_1 = 1,\quad \lambda_2 = -1$$

求解特征向量：
当 $\lambda_1 = 1$ 时，解齐次方程 $(I - A)\boldsymbol{x} = \boldsymbol{0}$，得 $x_1 = x_2$，取单位特征向量：
$$\boldsymbol{v}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$$
当 $\lambda_2 = -1$ 时，解齐次方程 $(-I - A)\boldsymbol{x} = \boldsymbol{0}$，得 $x_1 = -x_2$，取单位特征向量：
$$\boldsymbol{v}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

从 $\boldsymbol{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ 出发进行幂迭代：
第 1 步乘积为 $A\boldsymbol{x}_0 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$，模长为 1，归一化得 $\boldsymbol{x}_1 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$；
第 2 步乘积为 $A\boldsymbol{x}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$，模长为 1，归一化得 $\boldsymbol{x}_2 = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \boldsymbol{x}_0$。
由此，迭代序列在两个正交单位向量之间不断周期震荡：当 $k$ 为偶数时 $\boldsymbol{x}_k = (1,0)^\top$，当 $k$ 为奇数时 $\boldsymbol{x}_k = (0,1)^\top$。
该序列根本不收敛于任何固定向量。

理论根源与命题 6.13 假设的对照：
命题 6.13 保证幂迭代收敛的核心前提是矩阵必须存在唯一的、模长严格占优的主特征值，即满足严格谱间隔条件：
$$|\lambda_1| > |\lambda_2| \ge \dots \ge |\lambda_n|$$
然而对本题矩阵，$|\lambda_1| = |1| = 1$ 且 $|\lambda_2| = |-1| = 1$，即两特征值的模长严格相等（$|\lambda_1| = |\lambda_2|$）。在特征基展开中，分量比值 $(\lambda_2/\lambda_1)^k = (-1)^k$ 无法衰减至零，导致次特征方向无法被有效压制，因而在两方向上持续翻转震荡。

归一化步骤不可省略的原因剖析：
若在幂迭代中省去每步除以范数的归一化操作，直接计算 $\boldsymbol{z}_k = A^k \boldsymbol{x}_0$。当矩阵的主特征值模长 $|\lambda_1| > 1$ 时，向量模长将以几何级数 $|\lambda_1|^k \to \infty$ 爆炸增长，在计算机浮点运算中迅速产生数值上溢（overflow）导致计算中断；反之，若 $|\lambda_1| < 1$，向量模长将迅速几何衰减至零（underflow），在截断精度下退化为全零向量而丢失全部方向信息。因此，归一化步骤不仅有效限制了数值的动态浮点范围，而且确保了迭代始终在单位超球面上进行，是算法数值稳定性的关键保障。

常见错误做法剖析：误以为初值选取不当是震荡的唯一原因，忽视了特征值模长相等是导致该算法结构性失效的根本机制；或把归一化仅仅看作形式上的修饰，未能从浮点数动态范围与上下溢防范的数值计算本质展开阐述。

## 18. 

设 $A = \begin{pmatrix} -2 & 1 \\ 1 & -2 \end{pmatrix}$，初始状态 $\boldsymbol{x}_0 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$。

先求实对称矩阵 $A$ 的特征值与正交特征向量：
计算特征方程 $\det(\lambda I - A) = (\lambda + 2)^2 - 1 = 0 \implies \lambda + 2 = \pm 1$，解得：
$$\lambda_1 = -1,\quad \lambda_2 = -3$$
对应单位特征向量分别为：
$$\boldsymbol{q}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix},\quad \boldsymbol{q}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$
构造正交矩阵 $Q = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$，满足 $Q^\top = Q^{-1} = Q$，对角阵 $\Lambda = \begin{pmatrix} -1 & 0 \\ 0 & -3 \end{pmatrix}$。

根据命题 6.14，利用谱分解求矩阵指数函数 $\mathrm{e}^{At} = Q \mathrm{e}^{\Lambda t} Q^\top$：
$$\mathrm{e}^{\Lambda t} = \begin{pmatrix} \mathrm{e}^{-t} & 0 \\ 0 & \mathrm{e}^{-3t} \end{pmatrix}$$
进行矩阵相乘：
$$\mathrm{e}^{At} = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} \mathrm{e}^{-t} & 0 \\ 0 & \mathrm{e}^{-3t} \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} \mathrm{e}^{-t} + \mathrm{e}^{-3t} & \mathrm{e}^{-t} - \mathrm{e}^{-3t} \\ \mathrm{e}^{-t} - \mathrm{e}^{-3t} & \mathrm{e}^{-t} + \mathrm{e}^{-3t} \end{pmatrix}$$

求解常微分方程系统状态轨迹 $\boldsymbol{x}(t) = \mathrm{e}^{At} \boldsymbol{x}_0$：
$$\boldsymbol{x}(t) = \frac{1}{2}\begin{pmatrix} \mathrm{e}^{-t} + \mathrm{e}^{-3t} & \mathrm{e}^{-t} - \mathrm{e}^{-3t} \\ \mathrm{e}^{-t} - \mathrm{e}^{-3t} & \mathrm{e}^{-t} + \mathrm{e}^{-3t} \end{pmatrix} \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} \mathrm{e}^{-t} - \mathrm{e}^{-3t} \\ \mathrm{e}^{-t} + \mathrm{e}^{-3t} \end{pmatrix}$$

求解两个极限：
1. 状态极限 $\lim_{t\to\infty}\boldsymbol{x}(t)$：
因为两个特征值均为严格负数（$\lambda_1 = -1 < 0, \lambda_2 = -3 < 0$），指数衰减项满足 $\lim_{t\to\infty}\mathrm{e}^{-t} = 0$ 且 $\lim_{t\to\infty}\mathrm{e}^{-3t} = 0$。因此：
$$\lim_{t\to\infty}\boldsymbol{x}(t) = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
该动态系统具有渐近稳定性，平衡点原点为渐近稳定吸收子。

2. 状态分量比值极限 $\lim_{t\to\infty}\frac{x_1(t)}{x_2(t)}$：
写出分量比值表达式，分子分母同时除以衰减最慢的主导模态 $\mathrm{e}^{-t}$：
$$\frac{x_1(t)}{x_2(t)} = \frac{\frac{1}{2}(\mathrm{e}^{-t} - \mathrm{e}^{-3t})}{\frac{1}{2}(\mathrm{e}^{-t} + \mathrm{e}^{-3t})} = \frac{1 - \mathrm{e}^{-2t}}{1 + \mathrm{e}^{-2t}}$$
当 $t \to \infty$ 时，$\lim_{t\to\infty}\mathrm{e}^{-2t} = 0$。因此：
$$\lim_{t\to\infty}\frac{x_1(t)}{x_2(t)} = \frac{1 - 0}{1 + 0} = 1$$
这一几何结果表明，尽管轨迹最终衰减至零点，但衰减速度较快的模态 $\mathrm{e}^{-3t}$ 首先消亡，系统轨迹在后期渐近沿着慢流形主导特征向量 $\boldsymbol{q}_1 = (1, 1)^\top$ 方向逼近原点。

常见错误做法剖析：计算矩阵指数时误对矩阵各个元素分别求指数；或在计算极限比值时直接将两个零代入误断言极限不存在或为未定式，忽略了利用主导特征值衰减模态进行渐近渐近阶分离的经典方法。
## 19. 

**证明**

设 $A \in \mathbb R^{n \times n}$ 为实对称矩阵，即满足 $A^\top = A$。由实对称矩阵谱定理，存在实正交矩阵 $Q$ 与实对角矩阵 $\Lambda = \operatorname{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)$，使得 $A = Q\Lambda Q^\top$。

根据矩阵指数函数的定义及其谱展开式：
$$\mathrm{e}^{At} = \sum_{k=0}^\infty \frac{(At)^k}{k!} = Q \mathrm{e}^{\Lambda t} Q^\top$$
其中对角矩阵指数为 $\mathrm{e}^{\Lambda t} = \operatorname{diag}(\mathrm{e}^{\lambda_1 t}, \mathrm{e}^{\lambda_2 t}, \dots, \mathrm{e}^{\lambda_n t})$。

1. 证明实对称性：
对 $\mathrm{e}^{At}$ 求转置，利用转置的反乘法则与对角矩阵的对称性：
$$(\mathrm{e}^{At})^\top = (Q \mathrm{e}^{\Lambda t} Q^\top)^\top = (Q^\top)^\top (\mathrm{e}^{\Lambda t})^\top Q^\top = Q \mathrm{e}^{\Lambda t} Q^\top = \mathrm{e}^{At}$$
因此对任意实数 $t$，$\mathrm{e}^{At}$ 恒为实对称矩阵。

2. 证明逆矩阵公式 $(\mathrm{e}^{At})^{-1} = \mathrm{e}^{-At}$：
考察矩阵 $At$ 与 $-At$ 的乘法交换性：
$$(At)(-At) = -A^2 t^2 = (-At)(At)$$
由于两矩阵乘法可交换，根据矩阵指数的乘积性质，有：
$$\mathrm{e}^{At} \mathrm{e}^{-At} = \mathrm{e}^{At + (-At)} = \mathrm{e}^O = I$$
同理 $\mathrm{e}^{-At} \mathrm{e}^{At} = I$。由方阵逆矩阵的定义与唯一性，必有：
$$(\mathrm{e}^{At})^{-1} = \mathrm{e}^{-At}$$

3. 证明当 $t > 0$ 时矩阵正定：
由相似对角化分解 $\mathrm{e}^{At} = Q \operatorname{diag}(\mathrm{e}^{\lambda_1 t}, \dots, \mathrm{e}^{\lambda_n t}) Q^\top$ 可知，矩阵 $\mathrm{e}^{At}$ 的全部特征值为：
$$\mu_i = \mathrm{e}^{\lambda_i t},\quad i = 1, 2, \dots, n$$
因为 $A$ 为实对称矩阵，其特征值 $\lambda_i$ 全为实数。当 $t > 0$（以至对任意实数 $t$）时，指数项 $\lambda_i t$ 均为实数。
根据实数指数函数的性质，对任意实数 $y \in \mathbb R$，恒有 $\mathrm{e}^y > 0$。因此：
$$\mu_i = \mathrm{e}^{\lambda_i t} > 0,\quad \forall i = 1, 2, \dots, n$$
因为 $\mathrm{e}^{At}$ 为实对称矩阵且其全部特征值严格大于零，由实对称矩阵特征值判别法，当 $t > 0$ 时 $\mathrm{e}^{At}$ 严格正定。

□

常见错误做法剖析：对不可交换矩阵随意套用指数乘法公式，在本题中必须指出 $At$ 与 $-At$ 可交换；或在论证正定时忽略了对称性前提，直接以特征值为正断言正定。

## 20. 

设三资产协方差矩阵为 $\Sigma = \begin{pmatrix} 2 & 1 & 0 \\ 1 & 2 & 1 \\ 0 & 1 & 2 \end{pmatrix}$。

1. 计算特征值与各主成分方差解释比例：
求解特征多项式方程：
$$\det(\lambda I - \Sigma) = \det\begin{pmatrix} \lambda - 2 & -1 & 0 \\ -1 & \lambda - 2 & -1 \\ 0 & -1 & \lambda - 2 \end{pmatrix} = 0$$
按第 1 行展开行列式：
$$(\lambda - 2)\left((\lambda - 2)^2 - 1\right) - (-1)\left(-(\lambda - 2)\right) = (\lambda - 2)\left((\lambda - 2)^2 - 2\right) = 0$$
解得三个实特征值为：
$$\lambda_1 = 2 + \sqrt{2},\quad \lambda_2 = 2,\quad \lambda_3 = 2 - \sqrt{2}$$
数值约为 $\lambda_1 \approx 3.4142, \lambda_2 = 2.0000, \lambda_3 \approx 0.5858$。

计算资产系统总方差（矩阵的迹）：
$$\mathrm{tr} \Sigma = 2 + 2 + 2 = 6$$
三主成分的方差解释比例分别为：
第一主成分（PC1）：
$$\eta_1 = \frac{\lambda_1}{\mathrm{tr} \Sigma} = \frac{2 + \sqrt{2}}{6} \approx 56.90\%$$
第二主成分（PC2）：
$$\eta_2 = \frac{\lambda_2}{\mathrm{tr} \Sigma} = \frac{2}{6} \approx 33.33\%$$
第三主成分（PC3）：
$$\eta_3 = \frac{\lambda_3}{\mathrm{tr} \Sigma} = \frac{2 - \sqrt{2}}{6} \approx 9.76\%$$

2. 构造最大主成分的秩一近似 $\Sigma_1$：
求解对应 $\lambda_1 = 2 + \sqrt{2}$ 的特征向量 $(\lambda_1 I - \Sigma)\boldsymbol{x} = \boldsymbol{0}$，系数矩阵为：
$$\begin{pmatrix} \sqrt{2} & -1 & 0 \\ -1 & \sqrt{2} & -1 \\ 0 & -1 & \sqrt{2} \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
解得 $x_2 = \sqrt{2}x_1, x_3 = x_1$。基础解系为 $(1, \sqrt{2}, 1)^\top$。
计算模长 $\sqrt{1^2 + (\sqrt{2})^2 + 1^2} = 2$，得到单位主特征向量：
$$\boldsymbol{q}_1 = \frac{1}{2}\begin{pmatrix} 1 \\ \sqrt{2} \\ 1 \end{pmatrix}$$
由谱定理，最大主成分的秩一近似矩阵为：
$$\Sigma_1 = \lambda_1 \boldsymbol{q}_1 \boldsymbol{q}_1^\top = (2 + \sqrt{2}) \cdot \frac{1}{4}\begin{pmatrix} 1 & \sqrt{2} & 1 \\ \sqrt{2} & 2 & \sqrt{2} \\ 1 & \sqrt{2} & 1 \end{pmatrix} = \begin{pmatrix} \frac{2+\sqrt{2}}{4} & \frac{1+\sqrt{2}}{2} & \frac{2+\sqrt{2}}{4} \\ \frac{1+\sqrt{2}}{2} & \frac{2+\sqrt{2}}{2} & \frac{1+\sqrt{2}}{2} \\ \frac{2+\sqrt{2}}{4} & \frac{1+\sqrt{2}}{2} & \frac{2+\sqrt{2}}{4} \end{pmatrix}$$

3. 计算 Frobenius 逼近误差：
根据 Eckart-Young-Mirsky 定理，对称正定矩阵截断谱分解的 Frobenius 误差等于被截断剩余特征值的平方和的平方根：
$$\|\Sigma - \Sigma_1\|_F = \sqrt{\lambda_2^2 + \lambda_3^2}$$
代入特征值精确值：
$$\lambda_2^2 = 2^2 = 4$$
$$\lambda_3^2 = (2 - \sqrt{2})^2 = 4 - 4\sqrt{2} + 2 = 6 - 4\sqrt{2}$$
两项平方和为 $4 + 6 - 4\sqrt{2} = 10 - 4\sqrt{2}$。
因此 Frobenius 逼近误差为：
$$\|\Sigma - \Sigma_1\|_F = \sqrt{10 - 4\sqrt{2}} \approx \sqrt{10 - 5.6569} = \sqrt{4.3431} \approx 2.0840$$

4. 解释 $\mathrm{tr} \Sigma = \sum_i \lambda_i$ 在总风险分配上的意义：
在量化金融中，协方差矩阵对角线元素 $\Sigma_{ii} = \operatorname{Var}(R_i)$ 为各单独资产的方差，其迹 $\mathrm{tr} \Sigma$ 代表多资产投资组合系统未分散前的总体方差风险。
相似变换的保迹性质证明了 $\mathrm{tr} \Sigma = \sum_{i=1}^n \lambda_i$。在主成分分析视角下，每个特征值 $\lambda_i$ 对应第 $i$ 个互相正交的主成分因子所承载的方差贡献。这一等式表明：主成分分解在保持总体波动方差完全守恒（无信息损失）的前提下，将相互关联的各资产风险无损地解耦分配至各个互不相关的正交风险因子维度上。该性质构成了量化风险预算分解与降维因子对冲的理论基石。

常见错误做法剖析：计算 Frobenius 误差时展开整个矩阵逐项相减导致计算复杂且易错，忽视了正交不变性下误差直接等于截断特征值欧氏长度的优美性质；解释金融意义时仅复述代数定义，未阐明风险解耦与方差守恒在量化投资中的实际内涵。