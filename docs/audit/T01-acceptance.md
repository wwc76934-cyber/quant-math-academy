# T01 验收记录：教材资产审计与结构化解析器

- 验收人：DSH
- 日期：2026-11-08
- 状态：**通过**
- 产物：
  - `tools/content/parse-book.mjs`
  - `tools/content/parse-book.test.mjs`
  - `docs/audit/textbook-audit.md`
  - `content/generated/book.json`
  - `content/generated/inventory.json`
  - `content/generated/validation.json`
  - `content/generated/chapters/c01.json`–`c34.json`

## 1. 实际运行

| 命令 | 退出码 | 结果 |
|---|---|---|
| `npm run content:inventory` | 0 | 34 章解析成功；0 error；12 warning |
| `npm run test:content` | 0 | 9 个测试全部通过 |

统计：

- 8 篇 / 34 章 / **219 个一级节** / **339 个二级节**
- **889 个正式环境**：199 定义、270 定理、12 引理、71 命题、9 推论、236 例题、91 注记、1 公理
- 3,276 个独立公式（813 个编号）、29,000 个行内公式
- 698 道习题 / 698 份解析，0 缺失、0 多余、0 错配
- 1,574,815 字符；68 个源文件；3,846,525 字节

## 2. 独立复核（不依赖 AGY 报告）

### 2.1 切片保真

遍历 34 章全部数据，按空白归一化后检查每个切片是否为源文件子串：

| 检查项 | 数量 | 失败 |
|---|---:|---:|
| 节 markdown | 219 | 0 |
| 环境 markdown | 889 | 0 |
| 证明 markdown | — | 0 |
| 例题解 markdown | — | 0 |
| 习题题干 | 698 | 0 |
| 习题解析（非空） | 698 | 0 |

### 2.2 环境计数

用独立正则重新扫描 34 章源文件（支持同行标题与 BOM 归一化），按类型计数：

```
definition 199, theorem 270, lemma 12, proposition 71,
corollary 9, example 236, note 91, axiom 1
```

与解析器输出**逐类完全一致**，总数 889。

### 2.3 C32 修正

T01 首轮把 C32 的 `## 32.4` 误判为缺失。实际是源文件第 313 行行首有 U+FEFF（BOM）。T01b 已：

- 在行首剥离 BOM，并记录 `BOM_BEFORE_HEADING` warning；
- C32 恢复 7 节，32.4 及 32.4.1–32.4.5 归属正确；
- 全书 sections 由 218 修正为 219；
- 审计报告同步更正，删除“前端虚拟节点补节”的错误建议。

### 2.4 习题/解析

逐章比较题号序列：34 章全部为 `1..n` 连续；698 道题全部有非空解析；无重复、无缺号。`validation.summary.solutionsMatched = 698`、`mismatches = 0`。

### 2.5 源文件只读

`git status src/ scripts/ assets/ build/` 为空；`git diff src/` 为空。未修改任何教材正文。

## 3. 12 个警告的处理

| 类型 | 数量 | 判定 |
|---|---:|---|
| `BOM_BEFORE_HEADING`（C32） | 1 | 解析归一化记录；已修复结构误判，保留 warning 作为审计痕迹 |
| `UNNUMBERED_SUBSECTION`（C05/C07） | 2 | 源文件本身未编号；解析器保留标题与内容，不伪造编号 |
| `PROOF_WITHOUT_TARGET` | 9 | 证明/推导块承接前置段落或为多段式证明；正文完整保留在所属节，未丢失 |

结论：12 个 warning 均为**源文件格式特征**，不是内容丢失；T03 渲染时必须保留这些块并给出合理样式。

## 4. 已知限制（不影响 Phase 1）

1. 解析器只做结构切片，不做 HTML/KaTeX 渲染（T03）。
2. 表格只保留行级 Markdown，不做单元格 AST（T03 用 marked 渲染）。
3. 多段式证明（`**证明**（构造）`、`**证明**（唯一性）`）作为一个 proofMarkdown 连续块；阅读器可整体折叠。
4. 未编号二级节的 `number` 为空；前端显示标题，不显示编号。

## 5. 验收结论

T01 通过。内容模型、ID 规则、统计口径、C08 同行环境、公理、无编号注记、BOM、证明边界均已覆盖；可以作为 T03 内容渲染管线的输入。

遗留事项（不阻塞 T03）：

- 修复 `docs/audit/textbook-audit.md` 中残留的旧数字（如有）——已由 T01b 更新，DSH 复核为 219/889。
- 在 Phase 2 决定是否为 9 处 `PROOF_WITHOUT_TARGET` 补充“证明归属”元数据；不影响阅读。
