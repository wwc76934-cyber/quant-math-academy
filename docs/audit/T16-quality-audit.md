# T16 质量审计验收：响应式、无障碍、打印与数据安全

- 验收人：DSH
- 日期：2026-11-10
- 状态：**通过（含 2 处 DSH 修复）**
- 范围：Phase 5 质量审计；不新增功能。

## 1. 响应式与运行时

在 1440×900、1024×768、768×1024、390×844 四个视口，逐页检查 13 条路由：

`/`、`/syllabus`、`/learn/c11#c11-s4`、`/learn/c32`、`/search?q=期望`、`/graph`、`/paths`、`/paths/internship`、`/practice`、`/practice/c11`、`/practice/wrong`、`/progress`、`/notes`。

结果：

- **0 条横向溢出**（`scrollWidth <= clientWidth + 1`）；
- **0 个运行时异常**；
- **0 个无标签按钮**；
- **0 张无 alt 图片**；
- 发现 1 个无标签输入：`/progress` 清空确认框；已补 `aria-label="输入“清空”以确认清空所有本机数据"`；
- 发现阅读页 skip link 指向 `#main-content` 但 `<main class="reader">` 缺少 id；已补 `id="main-content"`。

## 2. 打印

对 `/learn/c11#c11-s4` 使用 Chrome `Page.printToPDF`（A4、0.5in 边距）：

- 生成 `web/screenshots/reader-print.pdf`；
- 44 页，2.8MB；
- 打印 CSS 隐藏 topbar/subnav/rail/底部栏；黑白正文；公式 `overflow: visible`；定理/证明 `break-inside: avoid`。

## 3. 数据安全

- 110 Web 测试中已覆盖：导出 Blob、非法导入不覆盖、合法导入预览/确认、坏数据清洗、清空二次确认；
- 本轮未发现新的数据安全问题。

## 4. 内容抽查

- 全书 889 环境、698 习题/解析；
- 抽查前 40 个环境：ID 均存在于对应节 HTML；
- 抽查前 40 道习题：题干与解析均非空、长度正常；
- 0 结构性缺失；
- T03 覆盖率硬闸门仍为 0 error、4 个 >1MB 单节 warning。

## 5. 构建与测试

| 项 | 结果 |
|---|---|
| `npm --prefix web run build` | 0 error；主 JS gzip **69.68KB** |
| `npm --prefix web run test` | **110 / 110** |
| `npm run test:content` | **58 / 58** |
| 内容校验 | 0 error，4 warning（既有） |

## 6. 已知限制

1. 未安装 axe-core；无障碍为手工 + DOM 检查，未做完整屏幕阅读器实测。
2. 打印仅做 PDF smoke，未逐页核对分页/公式断行。
3. 内容抽查为结构性 40+40 项，非逐字语义校勘。
4. 4 个 >1MB 单节仍按节懒加载，未二次拆分。
5. T14 公式收藏、学习建议、搜索关联为 backlog。
6. 15 章 / 106 节 D/P 标注仍为 backlog。

## 7. 结论

Phase 5 核心质量门槛通过：响应式无溢出、打印可生成、数据操作可恢复、首屏预算达标、测试全绿。可以进行 Phase 6 开源准备，但**必须先获得用户对开源范围与许可的明确确认**；本轮不创建公开仓库、不部署。
