# T06 验收记录：Phase 1 高质量阅读 MVP 总验收

- 验收人：DSH
- 日期：2026-11-08（Phase 1 收尾）
- 状态：**通过**
- 范围：4 个试点章（C01/C08/C11/C33）、219 节目录、阅读页、D/P 标注、学习状态、阅读位置、主题与响应式。

## 1. 最终命令与结果

| 命令 | 退出码 | 结果 |
|---|---|---|
| `npm run content:validate` | 0 | 34 章 / 219 节 / 889 环境 / 813 tagged 公式 / 698 对习题解析；0 error，4 个单节 >1MB warning |
| `npm run metadata:validate` | 0 | 25/25 试点节；D1–D4；P0 12 / P1 11 / P2 1 / P3 1；0 error |
| `npm run test:content` | 0 | 38 个测试全部通过 |
| `npm --prefix web run test` | 0 | 7 个测试文件、28 个测试全部通过 |
| `npm --prefix web run build` | 0 | tsc + Vite 成功；JS 243KB（gzip 76KB）、CSS 32.6KB（gzip 6.6KB） |
| `git status src scripts assets build` | 0 | 空；教材源未被修改 |

## 2. Phase 1 验收清单

| 验收项 | 结果 | 证据 |
|---|---|---|
| 4 个试点章正文完整、公式正确 | ✅ | T03 覆盖率 1,683 单元、0 mismatch；KaTeX 0 error |
| 习题与解析 1:1 | ✅ | 698/698；T01/T03 校验 |
| 完整目录 34 章 / 219 节 | ✅ | `book.json`；目录页截图 |
| 首页 3 次点击内到达任意试点节 | ✅ | 首页 → 目录 → 节；阅读页深链 |
| 三栏 / 两栏 / 单栏 | ✅ | 1440 三栏；1024 两栏；390 单栏；`scrollWidth == clientWidth` |
| 数学公式、定理、证明、例题排版 | ✅ | 阅读页截图；KaTeX 预渲染；`<details>` 证明 |
| D/P 标注与理由 | ✅ | 25 节 reviewed；右栏 D3/P0 + 理由折叠；syllabus D 范围 |
| 学习状态 5 态 | ✅ | ReaderPage 测试；状态菜单；首页/目录同步 |
| 阅读位置与继续阅读 | ✅ | 滚动保存 lastLocation；首页继续卡片 |
| 主题 / 字号 / 宽度 / 专注 / 证明默认 | ✅ | 28 项测试；深色截图 |
| 深链（节/环境） | ✅ | `#c11-s4` h2 在 134px；hash 保持；环境锚点 |
| 上一节/下一节、目录高亮 | ✅ | ReaderPage 测试；scrollspy |
| 习题懒加载、解析折叠 | ✅ | 测试；滚动后 20 题加载；首屏不请求 |
| 复制公式 LaTeX/环境链接 | ✅ | 测试；剪贴板 |
| 移动抽屉 / 底部栏 / 焦点回归 | ✅ | 测试；390 截图；修复初始抢焦点 |
| 非试点章诚实提示 | ✅ | “内容接入中”；不请求正文 |
| 视觉对照设计系统 | ✅ | 首页/目录/阅读/深色/移动端截图；无禁止项 |

## 3. 最终截图

- 阅读页（深链 11.4，1440）：`web/screenshots/reader-final-1440.png`
- 阅读页（390）：`web/screenshots/reader-final-390.png`
- 阅读页（深色，1440）：`web/screenshots/reader-final-dark-1440.png`
- 阅读页（1024）：`web/screenshots/reader-1024.png`
- 首页（1440）：`web/screenshots/home-final-1440.png`
- 目录（1440）：`web/screenshots/syllabus-final-1440.png`

## 4. 性能与体积

- 首屏（c01 manifest + c01-s1）：86.6KB 原始 / 9.8KB gzip（含元数据后重建）。
- 章 manifest 最大：84.7KB（c12，gzip 11.1KB）。
- 单节 HTML 最大：1.20MB（c08-s3，gzip 60.4KB）。
- 习题 JSON 最大：2.91MB（c12，gzip 148KB），懒加载。
- 首屏 JS：76KB gzip；CSS：6.6KB gzip。
- 阅读页：首节即时；其余节并行 ≤4 逐节追加；习题 sentinel 懒加载。

## 5. 已知问题（不阻塞 Phase 1）

1. 4 个单节 >1MB（c08-s3/c14-s2/c22-s1/c30-s1）：首屏不加载；Phase 5 真机长任务测试后再决定是否按 `###` 拆分。
2. 习题 `sectionId` 为 null：教材章末练习，按章展示；逐题分节归属是 Phase 3 可选元数据。
3. 阅读页首节后仍会预取本章全部节（≤4 并发）；首节可读不受影响，Phase 5 可改为严格视口触发。
4. 非试点 30 章显示“内容接入中”；Phase 2 接入。
5. 搜索、路径、练习状态、复习、笔记、导入导出尚未实现（Phase 2/3 占位）；不伪装可用。
6. T02/T05 的 AGY 会话有终态协议缺失/30 分钟超时记录；所有产物均由 DSH 独立 build/test/截图复核，按实际结果验收。

## 6. 验收结论

Phase 1 通过。产品已经具备“比 PDF 更好读、更好找、更知道该不该学”的核心体验：

- 4 章真实教材可读，公式与证明完整；
- 219 节目录与 D/P 标注可见；
- 阅读位置、状态、主题与移动端闭环成立；
- 首页/目录/阅读页视觉达到设计系统标准。

**Phase 2 开始条件已满足**：全书 34 章逐章 QA、全文搜索、先修/关联、全书标注分批、长章性能复核。

## 7. Phase 2 建议顺序

1. T07：全书 34 章逐章内容/公式/锚点/习题 QA；修复 `sectionId` 等数据契约遗留。
2. T08：全文搜索（MiniSearch + 中文分词/英文别名 + 深链）。
3. T09：先修/相关知识展示与跨章跳转；DAG 校验。
4. T10：全书 D/P 标注分批（每批 2–3 章，DSH 复核）。
5. T11：长章性能与移动端复核。
