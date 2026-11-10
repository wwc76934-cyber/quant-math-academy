# GitHub Pages 发布步骤（待执行）

- 状态：已推送到 `https://github.com/wwc76934-cyber/quant-math-academy`；Actions build/upload 成功；deploy 因 **Pages 未启用** 返回 404
- 已确认：代码 MIT、正文保留所有权利、公开仓库 + Pages

## 1. 已准备的文件

- `LICENSE`：代码 MIT
- `CONTENT_NOTICE.md`：正文/解答/生成内容 All rights reserved，不属 MIT
- `THIRD_PARTY_NOTICES.md`：React/React DOM/React Router/MiniSearch/KaTeX/marked 的 MIT 文本
- `README.md`：功能、快速开始、许可、限制
- `.github/workflows/deploy.yml`：构建内容 → 构建 Web → 上传 Pages → 部署
- `web/vite.config.ts`：`BASE_URL` 控制子路径

## 2. 本地已验证

```bash
BASE_URL=/quant-math-academy/ npm --prefix web run build
# dist/index.html 引用 /quant-math-academy/assets 与 /quant-math-academy/katex
```

产物 gzip：主 JS 75.32KB；CSS 6.86KB。

## 3. 首次部署的 Pages 启用（必须）

首次运行 `deploy-pages` 报：

```
Failed to create deployment (status: 404) ... Ensure GitHub Pages has been enabled
```

请打开：

```
https://github.com/wwc76934-cyber/quant-math-academy/settings/pages
```

**Build and deployment → Source → GitHub Actions**，保存后：

1. 打开 Actions → “Deploy web to GitHub Pages” → 最近一次 run；
2. 点 **Re-run failed jobs**（或等下一次 push）；
3. 部署成功后站点为 `https://wwc76934-cyber.github.io/quant-math-academy/`。

构建已成功，不需要改代码；只缺 Pages 启用。

## 4. 需要你提供

1. **公开仓库 URL**（先创建空仓库，不要初始化 README）。
2. 本机 GitHub 凭证之一：
   - 首选：在本机安装 GitHub CLI 后 `gh auth login`；
   - 或配置 Git Credential Manager，使 `git push` 能完成认证；
   - **不要在聊天中粘贴 PAT**。

仓库已推送；若后续需要重新推送：

```bash
git remote add origin <repo-url>
git push -u origin main
```

然后你在仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
首次 workflow 成功后，站点地址形如：

```
https://<user>.github.io/<repo>/
```

## 4. 注意

- 公开仓库包含 `src/` 以便构建；正文虽公开可浏览，但 `CONTENT_NOTICE.md` 明确保留所有权利，不授予复用许可。
- 若你希望仓库不含正文，需要改为私有内容构建/仅发布产物，当前 workflow 不适用。
- Pages 的 `404.html` 由 workflow 从 `index.html` 复制，用于 SPA 深链。
- 若仓库名不是 `quant-math-academy`，workflow 使用 `github.event.repository.name` 自动设置 `BASE_URL`，无需改。
- 自定义域名时 `BASE_URL=/`，需改 workflow。
