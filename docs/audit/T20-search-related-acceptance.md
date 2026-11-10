# T20a 搜索结果相关知识点 chips 验收

- 日期：2026-11-10
- 状态：**已上线**
- 实现：AGY（agy-phase4）在 3 个文件内完成；运行结束时仍因“CLI 工具缺少终态”未给总结，DSH 做验收性小修。

## 功能

- 搜索结果卡片外显示最多 2 个相关节 chips；
- 数据来自 `graph.json` 的 `relatedEdges`（无向，a/b）；
- 点击跳 `/learn/{chapterId}#{sectionId}`；
- graph 加载失败静默隐藏；
- 不把 `<a>` 嵌套进结果卡片。

## AGY 产出与 DSH 复核

AGY 改了：

- `web/src/routes/SearchPage.tsx`
- `web/src/styles/search.css`
- `web/tests/SearchPage.test.tsx`

DSH 只做验收性修正：

1. 删除两个未使用 ref（TS6133）；
2. 测试原本假设只有一个“相关知识点”容器，但多个结果都有 chips；改为取第一个容器/第一个匹配链接。

功能逻辑未改。

## 验证

| 项 | 结果 |
|---|---|
| 目标测试 | SearchPage 10/10 |
| 全量 Web | **113 / 113** |
| 内容 | **58 / 58** |
| build | 0 error；SearchPage chunk gzip 12.49KB |
| 本地/线上 | 1440/390 无溢出、无异常 |
| 线上 chips | 275 个 chips / 138 个结果容器；graph.json 200 |
| 嵌套链接 | 0 |

## 已知限制

- 每个有相关边结果都显示 chips，结果页可能较密集；单结果最多 2 条。
- 相关边是人工策展的 undirected related，不是“因果”或“推荐”。
- 未做移动端点击热区专门测试；chips 为普通链接。
