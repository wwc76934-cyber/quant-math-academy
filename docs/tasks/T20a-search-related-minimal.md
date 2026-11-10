# T20a — 搜索结果相关 chips（AGY 最小闭环，禁止后台等待）

## 目标

在搜索结果卡片外，增加最多 2 个真实相关节 chips。**只改 3 个文件**：

1. `web/src/routes/SearchPage.tsx`
2. `web/src/styles/search.css`
3. `web/tests/SearchPage.test.tsx`

## 必须先从这些文件确认接口

- `web/src/features/graph/types.ts`：`GraphData`、`GraphNode`、`RelatedEdge {a,b}`
- `web/src/features/graph/loadGraph.ts`：`loadGraph()`
- `web/src/features/search/types.ts`：`SearchResult.sectionId`
- `web/src/routes/SearchPage.tsx`：结果卡片是外层 `<Link>`，**不能把 chip 链接嵌进去**

## 实现规格

1. `SearchPage` 增加：
   - `const [relatedById, setRelatedById] = useState<Record<string, GraphNode[]>>({});`
   - 当 `results.length > 0` 且尚未加载时，调用 `loadGraph()` 一次；失败静默，不设置 error。
   - 只对 `results[].sectionId` 建映射；最多 2 条，排除自身；用 `graph.nodeMap[b]` 解析。
2. 结果卡片结构调整：
   - 外层改为 `<div key={item.id} className="search-result-item">`；
   - 原来的 `<Link ... className="search-result-card">...</Link>` 保持不动；
   - 在 `</Link>` 之后渲染 chips（不能嵌套 `<a>`）：
     ```tsx
     {related.length > 0 && (
       <div className="search-related" aria-label="相关知识点">
         {related.map((n) => (
           <Link key={n.id} to={`/learn/${n.chapterId}#${n.id}`} className="search-related-chip">
             相关：{n.number} {n.title}
           </Link>
         ))}
       </div>
     )}
     ```
3. CSS：
   - `.search-result-item { display:flex; flex-direction:column; gap:8px; }`
   - `.search-related { display:flex; flex-wrap:wrap; gap:8px; padding:0 4px 4px; }`
   - `.search-related-chip { font-size:12px; color:var(--ink-secondary); border:1px solid var(--border); border-radius:3px; padding:3px 8px; text-decoration:none; }`
   - hover 用 accent；移动端不溢出。
4. 测试：mock `loadGraph` 或 graph fetch，覆盖：
   - 有相关边时出现 chips；
   - 点击 chip 路由到 `/learn/...`；
   - graph 失败时 chips 不出现、结果仍在。
   可复用现有 SearchPage 测试的 fetch mock。

## 硬性执行约束（针对此前超时）

- **不要**运行全量 `npm --prefix web run test`；只跑目标测试：
  `npm --prefix web test -- tests/SearchPage.test.tsx`
- **不要**使用 `manage_task`、`schedule`、后台 job、sleep、轮询。
- 命令超过 120 秒就停止，不要等待；报告“超时 + 已完成文件”。
- 最多读上述文件，不做全仓探索，不重构其他页面。
- 完成后必须给终态总结：改了哪些文件、build 结果、目标测试结果、未完成项。
- 不让测试/构建的等待成为最后一句话；先结束命令，再总结。

## 验收（DSH）

- build 0；目标测试通过；全量测试由 DSH 跑。
- chips 真实、最多 2、链接正确、graph 失败静默。
- 不嵌套 `<a>`，键盘可达。
