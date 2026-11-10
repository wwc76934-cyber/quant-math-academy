# Phase 6 开源准备审计（未发布）

- 日期：2026-11-10
- 状态：**已发布**；仓库 `https://github.com/wwc76934-cyber/quant-math-academy`；站点 `https://wwc76934-cyber.github.io/quant-math-academy/`；Pages workflow 成功
- 前置：全书 34 章/219 节覆盖完成，D/P 主校准 P0 56.6%、P2+P3 10.0%；110 Web + 58 内容测试通过。

## 1. 技术就绪度

| 项 | 状态 | 说明 |
|---|---|---|
| 静态构建 | ✅ | `web/dist` 纯静态；无后端、无数据库 |
| 部署 | ✅ 可准备 | 需 SPA fallback；子路径需配 `base` |
| 数据 | ✅ 本地 | localStorage `qma:store:v1`；导出/导入/清空 |
| 隐私 | ✅ | 无账号、无遥测、无远程存储；仅构建资源请求 |
| 测试 | ✅ | Web 110、内容 58；build 0 |
| 性能 | ✅ | 首屏 JS gzip 69.68KB；路由级 chunk |
| 无障碍 | ⚠️ 基础 | 手工检查 + skip link/焦点/标签；未做完整屏幕阅读器实测 |
| 打印 | ✅ smoke | A4 PDF 44 页；未逐页人工核对 |
| 依赖清理 | ✅ | 移除未使用 `pagedjs`；新增根 `package-lock.json` |

## 2. 许可清单（代码）

### 直接依赖

| 包 | 版本 | 许可 | 用途 |
|---|---|---|---|
| katex | 0.19.1 | MIT | 构建期公式渲染（已升级修复 low 通告） |
| marked | 15.0.12 | MIT | Markdown 解析 |
| react / react-dom | 18.3.1 | MIT | UI |
| react-router-dom | 7.18.5 | MIT | 路由（已升级修复 moderate 通告） |
| minisearch | 7.2.0 | MIT | 搜索 |
| typescript（dev） | 5.9.3 | Apache-2.0 | 类型检查 |
| vite（dev） | 6.4.5 | MIT | 构建 |
| vitest / testing-library / jsdom（dev） | — | MIT | 测试 |

### 仍需做的事

- 生成 `THIRD_PARTY_NOTICES`（直接依赖 + 传递依赖），发布前人工复核；
- 为代码选择 LICENSE（MIT/Apache-2.0 等）——**需用户决定**；
- 根 `package.json` 仍为 `private: true`；公开前需确认包名/版本策略；
- `web/package.json` 依赖本地 `quant-math-textbook: file:..`，公开仓库需改为 workspace 或移除。

## 3. 内容版权（最大阻塞）

- `src/chapters`、`src/solutions` 是教材正文与解答；**版权归属/授权范围未确认**。
- 代码许可不能自动覆盖教材内容；必须代码/内容分离。
- 技术性来源审查：72 个 Markdown、0 图片、0 外部 URL、0 引用块/参考标记（见 `CONTENT_PROVENANCE.md`）；但无法证明原创/授权链。
- 在用户明确授权前：不公开内容、不部署含正文的站点、不把 `src/` 放入公开仓库。
- 若公开，需要独立的内容 LICENSE/版权声明，并确认是否允许再分发、修改、商用。

## 4. 安全通告（未自动修复）

`npm audit` 结果：

| 依赖 | 严重度 | 通告 | 现状/影响 | 决策 |
|---|---|---|---|---|
| katex | ✅ 已修复 | GHSA-238p-pmpm-9mq7 | 升级 0.19.1；全量公式渲染 0 error、58 内容测试/110 Web 测试通过 | 已完成 |
| react-router-dom | ✅ 已修复 | GHSA-wrjc-x8rr-h8h6、GHSA-337j-9hxr-rhxg | 升级 7.18.5；110 Web 测试、build 通过；首屏 gzip 69.68→75.28KB | 已完成 |

KaTeX 已升级到 0.19.1，React Router 已升级到 7.18.5；根与 Web 的 `npm audit --omit=dev` 均为 **0 vulnerabilities**。首屏 JS gzip 75.28KB，仍低于 90KB 预算。

## 5. 部署方案（待选）

### 静态托管
- GitHub Pages：需 `base: '/repo/'`；404.html SPA fallback；内容路径已相对。
- Cloudflare Pages / Netlify / Vercel：SPA rewrite 到 `index.html`；构建命令 `npm --prefix web run build`，产物 `web/dist`。
- 自托管 Nginx：`try_files $uri $uri/ /index.html;`；gzip/brotli；缓存 hash 资源。

### 不变量
- 无环境变量/密钥；
- 无服务端 API；
- 内容全部静态文件；
- 用户数据只在浏览器。

## 6. 发布前清单

- [ ] 用户确认代码许可与内容许可范围
- [ ] 用户确认公开仓库/私有仓库/不建仓库
- [ ] 用户确认是否部署及平台
- [x] 添加 `LICENSE`（MIT）与 `CONTENT_NOTICE.md`（All rights reserved）
- [x] 生成 `THIRD_PARTY_NOTICES.md`
- [x] KaTeX 升级 0.19.1 并回归
- [x] React Router 升级 7.18.5 并回归（110 测试通过）
- [x] 写公开 `README`（定位、截图、快速开始、架构、限制）
- [x] `CONTRIBUTING.md`、`SECURITY.md`、Issue/PR 模板
- [x] 确认 `src/` 随公开仓库（正文 All rights reserved，仅可浏览）
- [ ] 再跑 build、110+58 测试、4 视口截图、打印 PDF
- [ ] 确认无密钥/隐私数据/本地缓存进入仓库

## 7. 许可方案（已定）

用户已选择：**代码 MIT；教材正文/解答/生成内容 All rights reserved；公开仓库 + GitHub Pages**。文件见 `LICENSE`、`CONTENT_NOTICE.md`、`THIRD_PARTY_NOTICES.md`，部署见 `DEPLOY_GITHUB_PAGES.md`。

## 8. 需要用户决策

1. 代码许可：MIT / Apache-2.0 / 其他？
2. 教材内容许可：是否公开？允许再分发/修改/商用吗？
3. 仓库：公开 / 私有 / 暂不建？
4. 部署：GitHub Pages / Cloudflare Pages / Netlify / Vercel / 自托管 / 暂不部署？

在得到明确答复前，本轮只完成审计与依赖清理，**没有创建公开仓库、没有发布站点、没有选择许可证**。
