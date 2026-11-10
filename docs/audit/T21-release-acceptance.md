# T21 公开发布验收（RC1 Live）

- 日期：2026-11-10
- 状态：**已公开发布；Phase 4 待决策**
- 仓库：https://github.com/wwc76934-cyber/quant-math-academy
- 站点：https://wwc76934-cyber.github.io/quant-math-academy/

## 1. 发布事实

| 项 | 值 |
|---|---|
| 代码许可 | MIT（`LICENSE`） |
| 内容许可 | All rights reserved（`CONTENT_NOTICE.md`） |
| 第三方 | `THIRD_PARTY_NOTICES.md`（React/React DOM/React Router/MiniSearch/KaTeX/marked） |
| Pages 源 | GitHub Actions（`workflow`） |
| 最近成功 run | `42774513187`（build + deploy success） |
| 公开仓库 | public |
| 站点根 | HTTP 200 |

## 2. 线上验收

在真实 Pages 站点用 Chrome 检查：

| 路由 | 结果 |
|---|---|
| `/` | h1 正常；2 个首屏 assets；无异常 |
| `/paths` | 正常；`#main-content` 存在 |
| `/graph` | 正常；graph chunk 加载 |
| `/search?q=期望` | 正常；搜索页加载 |
| `/learn/c11#c11-s4` | 阅读页、Reader chunk、深链正常 |
| `/practice` | 正常 |
| `/progress` | 正常 |
| 390px `/paths`、`/learn` | 无横向溢出 |

说明：GitHub Pages 对客户端路由返回 HTTP 404（SPA fallback 的 404.html），浏览器内页面正常渲染；根路径为 200。

## 3. CI 修复记录

首次部署失败两次，均已修复：

1. **`content:build` 缺前置解析**：CI 的 `content/generated` 为空，`build-content` 直接读 `book.json` 失败；增加 `content:inventory`。
2. **`paths.json`/`graph.json`/搜索索引缺失**：workflow 只跑 `content:build`，`/paths`、`/graph`、搜索数据 404；增加 `build-search-index`、`content:graph`、`content:paths`。
3. **Pages 未启用**：deploy-pages 404；通过 GitHub API 以现有 git 凭证启用 Pages（`build_type=workflow`），未输出 Token。
4. **`/paths` 缺 `#main-content`**：补齐 loading/error/主分支，skip link 正常。

## 4. 质量基线

| 项 | 结果 |
|---|---|
| Web 测试 | 110 / 110 |
| 内容测试 | 58 / 58 |
| 构建 | 0 error；主 JS gzip 75.29KB |
| audit | 根/Web 0 vulnerabilities |
| 内容 | 34/34 章、219/219 节；558 先修、446 相关、0 环 |
| D/P | P0 56.6%、P1 33.3%、P2 9.6%、P3 0.5% |

## 5. 未交付 / 已知限制

- **Phase 4**：T14 公式收藏、T20 搜索结果相关 chips 均多次派给 AGY，因 `CLI 工具缺少终态` 失败，未合并半成品。
- 4 个 >1MB 单节 DOM 8.7–9.5 万，未拆分，待低端真机。
- 打印仅 PDF smoke；无障碍未做完整屏幕阅读器实测。
- 未做 1,964 页逐字校勘。
- Pages 深链 HTTP 状态为 404（SPA fallback），浏览器可正常渲染。

## 6. Phase 4 决策点

需用户选择：

1. 允许 DSH 直接实现 T14/T20（最快，偏离纯指挥）；
2. 继续只派 AGY（可能再次超时）；
3. 裁剪 Phase 4，以当前 RC1 为最终产品。

在决策前，不再合并 AGY 的半成品，也不改发布配置。
