# T15 质量优化、首屏预算与性能审计验收报告

**验收日期**：2026-11-10  
**验收范围**：`web/src/App.tsx` 路由级懒加载拆分、`web/src/styles/` 打印与加载态、首屏包体积预算、可访问性（a11y）与数据安全

---

## 1. 路由级代码拆分与首屏体积对比

### 1.1 拆分策略
- **Eager 加载**：
  - `HomePage`（落地页）：快速呈现全书知识概览与统计
  - `SyllabusPage`（全书目录）：全书 34 章 219 节索引
  - `NotFoundPage`（404 兜底）
  - 全局布局与状态：`AppHeader`, `AppFooter`, `SkipLink`, `StoreProvider`, `ToastProvider`
- **Lazy 按需加载**（`React.lazy` + `Suspense`）：
  - `ReaderPage`（教材阅读页及长章节动态流式渲染）
  - `SearchPage`（MiniSearch 离线搜索引擎与别名索引）
  - `GraphPage`（知识关系图与拓扑链路）
  - `PathsPage` & `PathDetailPage`（学习路径 A/B/C/D 与周计划）
  - `PracticePage`, `PracticeSessionPage`, `WrongBookPage`（习题练习与错题本）
  - `ProgressPage`（学习进度、复习队列与数据备份导出）
  - `NotesPage`（全书纯文本学习笔记）
- **学术加载态**：
  - 路由切换时渲染轻量级 `<AcademicPageLoading />`，带有标准学术灰度微旋转指示器与“正在载入页面...”文案，避免页面白屏闪烁。

### 1.2 Bundle 体积与 gzip 对比

| 资源类别 | 拆分前 (T13 基线) | 拆分后 (T15) | 变化 / 降幅 | 预算目标 | 达成判定 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **首屏入口 JS** | 380.07 kB (gzip 111.86 kB) | **215.47 kB (gzip 69.68 kB)** | **-37.7% gzip** | **≤ 90 kB gzip** | **超额达标** |
| **首屏全局 CSS** | 43.99 kB (gzip 8.45 kB) | **33.30 kB (gzip 6.86 kB)** | **-18.8% gzip** | - | **达标** |
| **按需 ReaderPage chunk** | (打包在首屏) | 44.34 kB (gzip 12.75 kB) | 按需加载 | - | **达标** |
| **按需 SearchPage chunk** | (打包在首屏) | 33.69 kB (gzip 12.16 kB) + 5.64 kB CSS | 按需加载 | - | **达标** |
| **按需 ProgressPage chunk**| (打包在首屏) | 26.61 kB (gzip 6.72 kB) | 按需加载 | - | **达标** |
| **按需 PathDetailPage chunk**| (打包在首屏) | 15.72 kB (gzip 4.83 kB) | 按需加载 | - | **达标** |
| **按需 GraphPage chunk** | (打包在首屏) | 9.43 kB (gzip 3.31 kB) + 5.61 kB CSS | 按需加载 | - | **达标** |
| **按需 Practice / Notes 等** | (打包在首屏) | 各 6~8 kB (gzip 2~3 kB) | 按需加载 | - | **达标** |

---

## 2. 打印与排版优化 (`@media print`)

在 `web/src/styles/base.css` 与 `layout.css` 中补齐了学术打印规范：
1. **隐藏交互与干扰元素**：
   - 彻底隐藏 `.topbar`, `.mobile-drawer`, `.app-footer`, `.search-btn`, `.theme-toggle`, `.reader-top`, `.book-toc`, `.rail`, `.article-actions`, `.reader-bottom-bar`, `.mobile-bottom-bar`, `.toast-container`, `.reader-notes`, `.reader-exercises`, `.skip-link`, `[role="alert"]`。
2. **防跨页截断 (Avoid Page Break Inside)**：
   - 定理环境：`.theorem, .definition, .example, .proof, .lemma, .corollary, .proposition, .env-block, .exercise-card` 设置 `break-inside: avoid; page-break-inside: avoid;`，防止定理陈述或例题被纸质页面截成两半。
3. **公式排版防裁切**：
   - `.equation, .math-display` 设置 `overflow-x: visible !important; white-space: normal !important; break-inside: avoid;`，避免纸张打印时独立长公式被截断。
4. **纸质清晰度与对比度**：
   - `body` 强制 `#ffffff` 纯白背景、`#000000` 纯黑文字、`11pt` 适印字号；
   - 链接清除蓝色与下划线，不外露 URL 文本（`a::after { content: none !important; }`）。

---

## 3. 移动端与响应式无溢出保障

1. **断点覆盖**：
   - 390px（移动端竖屏）、768px（平板竖屏）、1024px（平板横屏/小笔记本）、1440px（标准桌面）。
2. **公式与表格溢出处理**：
   - 阅读页公式容器 `.equation` 采用 `overflow-x: auto`，移动端超长公式支持平滑水平滑动，不破坏整体视口宽度（`scrollWidth <= clientWidth`）；
   - 表格包裹器 `.table-wrap` 具备原生水平滚动，移动端不撑破页面布局。
3. **移动端交互安全**：
   - 移动端底部悬浮栏 `.mobile-bottom-bar`、抽屉菜单 `.mobile-drawer` 均配置 `z-index` 与安全区域留白（`env(safe-area-inset-bottom)`），不遮挡正文与关键操作。

---

## 4. 可访问性（a11y）与数据安全

1. **可访问性**：
   - 顶层配置 `<SkipLink />` 直达正文 `#main-content`；
   - 键盘 Tab 顺序连续，模态框（设置、快捷键说明、导入确认等）支持 Esc 关闭与焦点管理；
   - 所有交互按钮均配置语义化 `aria-label` 或 `role`；
   - 尊重用户动画偏好：`@media (prefers-reduced-motion: reduce)` 下强制所有动效与过渡时间降为 `0.01ms`。
2. **数据管理 Round-Trip**：
   - 导出为标准格式备份文件；
   - 支持空文件/非法 schemaVersion 防御拦截，不破坏既有 store；
   - 重置前强制要求输入“清空”确认防误触。

---

## 5. 自动化测试与构建结果

- **Web 自动化测试套件 (`npm --prefix web run test`)**：
  - **18 个测试文件全部通过** (18 passed, 0 failed)
  - **110 个用例全部通过** (110 passed, 0 failed)
  - 涵盖 Store（笔记/进度/练习/设置）、HomePage、SyllabusPage、ReaderPage、SearchPage、GraphPage、PathsPage、PathDetailPage、PracticePage、WrongBookPage、ProgressPage 等。
- **内容管道测试套件 (`npm run test:content`)**：
  - **58 个用例全部通过** (58 passed, 0 failed)
  - 涵盖知识关系图 (T09)、学习路径 (T11)、搜索索引 (T08)、渲染管线 (T03)、元数据校验 (T02)。
- **生产构建 (`npm --prefix web run build`)**：
  - TypeScript 类型检查 0 错误 (`tsc -b`)；
  - Vite 打包 0 警告，成功生成 12 个独立代码块。
