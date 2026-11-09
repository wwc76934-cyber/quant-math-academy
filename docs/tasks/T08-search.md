# T08 — 全文搜索：索引、中文分词、别名与搜索页

## 1. 前置

T07 已完成 34 章开放。Phase 1 的 `content/generated/site` 已有：
- `book.json`（8 篇/34 章/219 节轻量 TOC）
- `chapters/cXX.json`（manifest + environmentIndex/equationIndex）
- `sections/cXX-sN.html`（219 节 HTML）
- `exercises/cXX.json`（698 题/解析）
- `content/metadata/chapters/*.json`（目前 4 章 reviewed）

## 2. 目标

提供真正能定位千页教材的搜索：中英文术语、章节/节/定义定理/例题/习题/解析、深链、过滤与高亮。客户端静态索引，无后端。

## 3. 索引构建

新增 `tools/content/build-search-index.mjs`：

- 输入：`content/generated/site` + `content/metadata`。
- 输出：`content/generated/site/search/index.json` 与 `search/manifest.json`。
- 文档类型：
  - `section`：节标题 + 正文纯文本（去 Markdown/HTML/公式，保留可读数学术语）。
  - `definition/theorem/lemma/proposition/corollary/axiom/example/note`：环境标题 + 环境正文纯文本。
  - `exercise`：题干纯文本。
  - `solution`：解析纯文本（type=solution，关联题号）。
- 字段：
  ```json
  {
    "id": "c11-s4",
    "type": "section",
    "chapterId": "c11",
    "sectionId": "c11-s4",
    "title": "11.4 概率不等式",
    "text": "……",
    "tags": ["概率论","不等式"],
    "difficulty": "D3",
    "priority": "P0",
    "anchor": "c11-s4"
  }
  ```
- 文本截断：每文档 2,000 字；保留标题与首段；全文索引不存 HTML。
- 公式：保留 LaTeX 原文与去命令可读文本（如 `\operatorname{Var}` → “Var”），便于搜索 Var/方差。
- 去重：环境正文与节正文重复时，搜索文档仍保留类型入口；结果页按类型分组，避免重复展示。
- 中文分词：构建期不切词；客户端 MiniSearch 使用 `Intl.Segmenter('zh-CN',{granularity:'word'})` + CJK 2-gram 补充。英文转小写。
- 别名：`content/search/aliases.json`，人工维护，如：
  ```json
  {"期望":["expectation","mean","expected value"],"特征值":["eigenvalue","eigenvalues"],"协方差":["covariance"]}
  ```
  索引/查询时扩展；不得自动编造未核实别名。
- 索引分片：先单文件；若 gzip >1.5MB 或首屏加载 >300ms，再按篇分片（manifest 记录）。
- 构建校验：文档数 = 219 + 889 + 698（题干）+ 698（解析）≈ 2,504；每篇 34 章都有文档；ID 唯一；搜索深链 anchor 在对应页面可解析。

## 4. 前端搜索

- 路由 `/search?q=...&type=...&chapter=...`。
- 顶栏搜索按钮、首页搜索入口、阅读页 `/` 快捷键都进入搜索页并聚焦。
- MiniSearch 配置：
  - fields: `title`(3), `text`(1), `tags`(2), `terms`(2)
  - store: id/type/chapterId/sectionId/title/anchor/difficulty/priority
  - tokenize: 中文 Segmenter + 2-gram；英文小写
  - 查询：别名扩展；`combineWith:'AND'`；短查询（1 个汉字）回退子串扫描。
- 结果：
  - 类型徽标（知识点/定义/定理/例题/习题/解析）；
  - 章·节、标题、命中片段（高亮 `<mark>`，不用 `dangerouslySetInnerHTML` 拼接用户输入）；
  - D/P（有则显示）；
  - 点击深链到 `/learn/{chapterId}#{anchor}`。
- 过滤：全部/知识点/定义定理/例题/习题/解析；按篇/章；按 P0/P1；按 D。
- 搜索历史（localStorage，最多 10 条）；清空。
- 空结果：同义词建议、浏览目录。
- 加载态：索引加载 skeleton；错误：重试。
- 无障碍：输入 label、结果列表语义、键盘上下选择/Enter/Esc、`aria-live` 结果数。
- 性能：搜索页懒加载索引；首屏不加载索引；输入 250ms 防抖。

## 5. 别名与术语

- 建立 `content/search/aliases.json` 初始版，至少 20 组：
  期望/expectation/mean、方差/variance、协方差/covariance、相关系数/correlation、特征值/eigenvalue、特征向量/eigenvector、奇异值/SVD、正定/positive definite、投影/projection、最小二乘/least squares、凸函数/convex、对偶/dual、KKT、极大似然/MLE、置信区间/confidence interval、假设检验/hypothesis test、回归/regression、鞅/martingale、布朗运动/Brownian motion、伊藤/Itô、GARCH、卡尔曼/Kalman、夏普/Sharpe、回撤/drawdown、风险价值/VaR。
- 别名只用于查询扩展，不改变索引正文。
- 术语命中应能在结果标题/摘要中解释。

## 6. 测试

- 索引构建：文档数、ID 唯一、每章覆盖、锚点存在。
- 查询：`期望`、`协方差`、`SVD`、`Itô`、`GARCH`、`Black-Scholes`、`夏普`、`KKT`、`鞅`、`VaR` 至少各命中正确章节。
- 中文分词：单字、双字、英文、别名。
- 过滤/深链/高亮/XSS（查询含 `<script>` 不执行）。
- 键盘/空结果/历史。
- `npm --prefix web run build/test` 通过。

## 7. 约束

- 只改 `tools/content/`、`content/search/`、`web/`；不改 `src/` 教材正文，不改 T01 生成的 chapter JSON 语义。
- 不安装除 MiniSearch 外的新依赖；MiniSearch 版本固定并提交 lockfile。
- 不调用外部搜索服务/AI。
- 不把索引加载进首屏。
- 不伪造搜索结果或别名。

## 8. 验收

1. 搜索页可用；10 个代表查询命中正确章/节/环境。
2. 中文分词与英文别名有效；结果高亮正确；XSS 安全。
3. 索引覆盖 34 章/219 节/889 环境/698 题。
4. 索引加载不影响首页/阅读页首屏。
5. 构建/测试/截图；报告索引体积、查询延迟、已知限制。
