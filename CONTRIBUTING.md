# Contributing

感谢参与 Quant Math Academy。提交前请先读本指南与 [CONTENT_NOTICE.md](CONTENT_NOTICE.md)。

## 许可边界

- **代码、工具链、前端**：MIT，见 [LICENSE](LICENSE)。
- **教材正文、解答、习题、生成内容**：All rights reserved。除非你有明确授权，不要向仓库提交第三方教材内容、习题或解析。
- 提交代码即表示你同意以 MIT 许可贡献该代码；提交内容不自动改变内容版权。

## 环境

- Node.js 20+
- npm（仓库含 `package-lock.json` 与 `web/package-lock.json`）

```bash
npm ci
npm run content:build
npm --prefix web ci
npm --prefix web run test
npm run test:content
npm --prefix web run build
```

## 内容管线

```bash
npm run content:build      # 解析/渲染/拆分/搜索/图/路径
npm run content:validate   # 结构硬闸门
npm run metadata:validate  # D/P 元数据
npm test --prefix web      # 前端测试
```

- 不要手改 `content/generated/` 或 `web/public/content/`；它们由构建生成。
- 修改 `src/` 正文前先确认你有权修改并公开该内容。
- Metadata 改动要保留 rationale、先修/公式 ID、reviewed 状态；`npm run metadata:validate` 必须 0 error。

## 代码约定

- TypeScript strict；不引入新的 UI 框架/状态库，除非有明确理由。
- 数学渲染仍在构建期完成，不在客户端跑 Markdown/KaTeX。
- 不新增后端；用户数据只存 localStorage。
- 新增交互需要键盘可达、移动端不溢出、暗色主题可用。
- 不提交密钥、Token、个人数据、`node_modules/`、`dist/`。

## 提交与 PR

- 提交信息用 `feat:`, `fix:`, `docs:`, `chore:`, `test:` 前缀。
- PR 请说明：改了什么、为什么、如何验证（命令/截图）、是否涉及内容版权。
- 涉及内容的 PR 必须说明来源与授权；无法说明的不会被合并。

## 测试基线

- Web：110 tests
- Content：58 tests
- Build：0 error
- `npm audit --omit=dev`：0 vulnerabilities（根/Web）

如测试数变化，请在 PR 中说明新增/删除了哪些用例。
