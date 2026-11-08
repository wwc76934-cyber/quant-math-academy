# Quant Math Academy — 项目文档索引

- 项目：Quant Math Academy（量化数学学院）
- 内容底本：《量化数学进阶教材》（34 章 / 8 篇）
- 当前阶段：Phase 0（教材审计与方案定稿）
- 最后更新：2026-11-08

## 文档

| 文档 | 内容 | 读者 |
|---|---|---|
| [产品需求文档](product/PRD.md) | 产品定位、用户、功能需求、指标、范围、风险 | 产品/开发 |
| [信息架构](product/INFORMATION_ARCHITECTURE.md) | 站点地图、路由、页面规格、状态与数据流、响应式 | 设计/前端 |
| [技术架构](architecture/TECH_ARCHITECTURE.md) | 技术栈、仓库结构、内容编译、前端架构、测试、部署、ADR | 工程 |
| [内容模型与标注规范](architecture/CONTENT_MODEL.md) | ID、数据结构、D/P 标注手册、校验、路径、开源边界 | 内容/工程 |
| [设计系统](design/DESIGN_SYSTEM.md) | 颜色、字体、布局、组件、页面蓝图、禁止项、验收 | 设计/前端 |
| [实施路线图](ROADMAP.md) | Phase 0–6、任务拆解、验收标准、执行规范 | 全员 |
| [T01 任务书](tasks/T01-content-audit.md) | 教材审计与结构化解析器的具体交付要求 | AGY/验收 |

## 教材源

- 正文：`src/chapters/C01..C34.md`
- 解析：`src/solutions/C01..C34.md`
- 写作规范：`STYLE_GUIDE.md`
- 现有构建状态：`tasks/current-status.md`

## 当前状态

- Phase 0 方案文档：已完成初稿，待 T01 审计结果校准数字。
- T01（教材审计 + 解析器）：AGY 执行中。
- Phase 1 试点章：C01、C08、C11、C33。

## 关键决策

1. 纯静态站点，无后端；学习数据本地保存，支持导出/导入。
2. Vite + React + TypeScript；构建期 KaTeX 预渲染。
3. 知识点粒度 = 一级节；环境作为锚点。
4. 难度（D1–D5）与必要性（P0–P3）分离，人工策展，保留理由。
5. 路径只改推荐顺序，不删减教材内容。
6. 代码与内容许可分离；未经作者确认不公开发布。

## 下一步

1. 审查 T01 的解析器与审计报告。
2. 通过后派发 T02（4 章标注）与 T03（HTML 渲染管线）。
3. 再进入 T04/T05（阅读 MVP）。
