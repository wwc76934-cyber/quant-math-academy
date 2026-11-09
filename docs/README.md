# Quant Math Academy — 项目文档索引

- 项目：Quant Math Academy（量化数学学院）
- 内容底本：《量化数学进阶教材》（34 章 / 8 篇）
- 当前阶段：**Phase 1 已通过总验收**；下一阶段 Phase 2（全书接入、搜索、关联、全书标注）
- 最后更新：2026-11-08

## 文档

| 文档 | 内容 | 读者 |
|---|---|---|
| [产品需求文档](product/PRD.md) | 产品定位、用户、功能需求、指标、范围、风险 | 产品/开发 |
| [信息架构](product/INFORMATION_ARCHITECTURE.md) | 站点地图、路由、页面规格、状态与数据流、响应式 | 设计/前端 |
| [技术架构](architecture/TECH_ARCHITECTURE.md) | 技术栈、仓库结构、内容编译、前端架构、测试、部署、ADR | 工程 |
| [内容模型与标注规范](architecture/CONTENT_MODEL.md) | ID、数据结构、D/P 标注手册、校验、路径、开源边界 | 内容/工程 |
| [设计系统](design/DESIGN_SYSTEM.md) | 颜色、字体、布局、组件、页面蓝图、禁止项、验收 | 设计/前端 |
| [视觉原型](../design/prototype/index.html) | 首页、目录、阅读页、深色、移动端静态原型 | 设计/前端 |
| [实施路线图](ROADMAP.md) | Phase 0–6、任务拆解、验收标准、执行规范 | 全员 |
| [T01 任务书](tasks/T01-content-audit.md) | 教材审计与结构化解析器的具体交付要求 | AGY/验收 |
| [T02 任务书](tasks/T02-metadata-pilot.md) | 四个试点章的 D/P 标注与校验 | AGY/验收 |
| [T03 任务书](tasks/T03-render-pipeline.md) | Markdown → HTML/KaTeX 与保真校验 | AGY/验收 |
| [T04 任务书](tasks/T04-web-foundation.md) | Web 基座、首页、完整目录 | AGY/验收 |
| [T05 任务书](tasks/T05-reader.md) | 阅读页、标注、进度、响应式 | AGY/验收 |

## 教材源

- 正文：`src/chapters/C01..C34.md`
- 解析：`src/solutions/C01..C34.md`
- 写作规范：`STYLE_GUIDE.md`
- 现有构建状态：`tasks/current-status.md`

## 当前状态

- Phase 0：**已完成**；T01 解析器/审计与全部方案文档通过验收。
- T01：34 章 / 219 节 / 889 环境 / 698 对习题解析，0 error、12 条已解释 warning。
- T03：按节拆分 HTML/KaTeX 渲染 + 1,683 单元覆盖率硬校验；0 error，28 项测试通过。
- T02：C01/C08/C11/C33 共 25 节 D/P 标注；DSH 复核并校准 5 处优先级，P0 12 / P1 11 / P2 1 / P3 1。
- T04：Web 基座、设计系统、首页、完整目录；build 通过、19 项测试通过。
- T05：三栏阅读页、分节加载、深链、状态、阅读位置、主题/字号/宽度/专注、移动端；build 通过、28 项测试通过。
- 视觉原型与最终截图：`design/prototype/`、`web/screenshots/`。
- Phase 1 试点章：C01、C08、C11、C33。

## 关键决策

1. 纯静态站点，无后端；学习数据本地保存，支持导出/导入。
2. Vite + React + TypeScript；构建期 KaTeX 预渲染，客户端不跑 KaTeX。
3. 知识点粒度 = 一级节；环境作为锚点。
4. 难度（D1–D5）与必要性（P0–P3）分离，人工策展，保留理由。
5. 路径只改推荐顺序，不删减教材内容。
6. 代码与内容许可分离；未经作者确认不公开发布。

## 下一步

1. Phase 2：全书 34 章逐章 QA、全文搜索、先修/关联、全书标注。
2. Phase 3：路径、练习、错题、笔记、复习、导入导出。
3. Phase 4–5：体验增强与质量优化；Phase 6 开源准备需用户明确确认。
4. 未经用户明确确认，不创建公开仓库、不发布站点。

## Phase 1 验收

- 阅读页、状态、深链、主题、移动端通过；详见 [`docs/audit/T06-phase1-acceptance.md`](audit/T06-phase1-acceptance.md)。
- 已知：4 个单节 >1MB（懒加载）、习题按章展示、其余 30 章“内容接入中”。
