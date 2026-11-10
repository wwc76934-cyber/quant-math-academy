# Agent Handoff — Quant Math Academy RC1

- 日期：2026-11-10
- 当前提交：以 `git log -1` 为准
- 工作区：干净；`main` 与 `origin/main` 同步
- 站点：https://wwc76934-cyber.github.io/quant-math-academy/
- 仓库：https://github.com/wwc76934-cyber/quant-math-academy
- 代码许可：MIT；教材正文/解答：All rights reserved（`CONTENT_NOTICE.md`）

## 1. 项目是什么

把 1,964 页中文量化数学教材做成静态学习站：

- 34 章 / 219 节；889 环境；698 习题+解析；
- 2,504 个搜索文档；知识图谱 219 节点、558 先修、446 相关、0 环；
- D/P 人工标注：P0 124、P1 73、P2 21、P3 1；
- 学习路径 A/B/C/D、练习、错题、复习、进度、笔记、导入导出；
- 公式收藏、搜索相关 chips、今日建议；
- 公开 GitHub Pages 已上线。

## 2. 技术栈

- Vite + React 18 + TypeScript + React Router 7
- 构建期 `marked` + KaTeX 0.19.1；客户端不跑 Markdown/KaTeX
- 无后端；localStorage `qma:store:v1`
- 路由级 `React.lazy`；首屏 JS gzip 约 75.3KB
- 测试：Vitest + Testing Library；Node 20+

## 3. 目录

```
src/                 教材 Markdown（只有内容，不要改结构逻辑）
content/
  metadata/          D/P/先修/相关/公式人工标注
  paths/paths.json   学习路径
  search/aliases.json
  generated/         构建产物（gitignore，不要手改）
tools/content/       解析/渲染/拆分/搜索/图/路径/校验
web/                 React 前端
docs/                PRD/架构/设计/任务/验收
.github/workflows/   Pages 部署
```

## 4. 内容管线（重要）

```bash
npm ci
npm run content:inventory    # src -> content/generated/book.json
npm run content:build        # 渲染/拆分章节/习题/硬闸门
node tools/content/build-search-index.mjs
npm run content:graph
npm run content:paths
npm --prefix web ci
npm --prefix web run build
```

CI 必须按上面顺序跑；少 `inventory` 会因缺 book.json 失败，少 search/graph/paths 会导致 `/search`、`/graph`、`/paths` 线上 404/白屏。
`content/generated/` 与 `web/public/content/` 是产物，不要手改。

## 5. 前端路由

`/`, `/syllabus`, `/learn/:chapterId`, `/search`, `/graph`, `/paths`, `/paths/:mode`, `/practice`, `/practice/:chapterId`, `/practice/wrong`, `/progress`, `/notes`, `/bookmarks`。

`/bookmarks`、`/progress` 建议卡、搜索 related chips 是最近新增。

## 6. 数据模型

- `StoreV1`：settings / progress / lastLocation / exercises / review / notes / bookmarks / path / activity。
- 进度状态：`empty | learn | done | master | review`。
- 错题/复习：`ExerciseRecord`、`ReviewRecord`；错题 +1 天，重练答对 1/3/7 天，3 次或标记掌握移出。
- `bookmarks.formulaMeta`：`{id,latex,tag,chapterId,sectionId,bookmarkedAt}`。
- 导出/导入包含全部 store；导入前校验 schema。
- 数据只在本机，无账号/后端/遥测。

## 7. 测试与质量

```bash
npm run test:content          # 58
npm --prefix web run test     # 123
npm --prefix web run build    # 0 error
npm audit --omit=dev          # 0 vulnerabilities（根/Web）
```

- 内容校验：0 error，4 个 >1MB 单节 warning；
- 4 个超长节：c08-s3、c22-s1、c14-s2、c30-s1；
- T23：4× CPU/1.6Mbps 下 FCP 0.88–1.87s；11 路由 × 1440/390 DOM 检查通过；
- 打印 PDF 47 页 smoke。

## 8. 部署

- GitHub Actions `.github/workflows/deploy.yml`：
  inventory → build → search → graph → paths → web build → 404 copy → upload → deploy。
- `BASE_URL=/${{ github.event.repository.name }}/`，站点子路径 `/quant-math-academy/`。
- Pages Source = GitHub Actions；已启用。
- 深链由 `404.html`（index 副本）fallback；HTTP 状态仍为 404，但浏览器渲染正常。
- 本机凭证不得写入仓库/聊天。

## 9. 最近变更（避免重复/冲突）

- T14b/T14c：公式收藏 store + Reader 星标 + `/bookmarks`；
- T20：搜索结果相关 chips（最多 2）；
- T22：`/progress` 今日建议卡；
- T23：低端/DOM/打印复检；
- 测试从 110 → 123；
- 修复 Pages CI：补 inventory/search/graph/paths、`/paths` main landmark。

## 10. 已知 backlog（可选，不阻塞）

- 10–15 个证明的分步推导；
- 8 个可视化；
- 真实低端手机 / NVDA/VoiceOver / axe 全量；
- 打印逐页核对；
- P2/P3 从 10% 继续细化；
- 1,964 页逐字校勘。

## 11. 不要做

- 不要改 `CONTENT_NOTICE.md` 授权范围，除非用户明确授权；
- 不要把 `src/` 内容换成第三方教材文本；
- 不要手改 `content/generated/` 或 `web/public/content/`；
- 不要发布/改 Pages 设置/加密钥，除非用户明确要求；
- 不要删除 `content/inventory` 或 CI 的 search/graph/paths 步骤。

## 12. 接手先做

```bash
git status
npm run test:content
npm --prefix web run test
npm --prefix web run build
```

再打开线上 `/`、`/paths`、`/graph`、`/search?q=命题`、`/learn/c11#c11-s4`、`/bookmarks`、`/progress` 确认基线。
