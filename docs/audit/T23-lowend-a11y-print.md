# T23 Phase 5 低端性能 / DOM 无障碍 / 打印复检

- 日期：2026-11-10
- 状态：**通过（有边界说明）**
- 范围：4 个 >1MB 单节、11 条路由 × 2 视口、最新打印 PDF
- 环境：本地 `vite preview`；Chrome CDP；CPU 4×；网络 1.6Mbps / 150ms latency

## 1. 超长节低端模拟

| 节 | DOM 节点 | 公式数 | DOMContentLoaded | FCP | 横向溢出 | h2 |
|---|---:|---:|---:|---:|---|---|
| c08-s3 | 80,225 | 115 | 462ms | 928ms | 无 | ✓ |
| c22-s1 | 73,311 | 142 | 1,704ms | 1,872ms | 无 | ✓ |
| c14-s2 | 88,353 | 113 | 1,338ms | 1,428ms | 无 | ✓ |
| c30-s1 | 75,105 | 107 | 1,266ms | 1,344ms | 无 | ✓ |

移动端 390（c08-s3，CPU 4×/1.6Mbps）：

- DOM 80,225；FCP 880ms；load 454ms；`scrollWidth = innerWidth = 390`；h2 存在。

`longtask` PerformanceObserver 未捕获条目；**不能据此宣称无长任务/无掉帧**，仍需真机。

## 2. DOM / 无障碍快检

11 条路由 × 1440/390：

`/`, `/syllabus`, `/learn/c11#c11-s4`, `/search?q=命题`, `/bookmarks`, `/progress`, `/practice`, `/graph`, `/paths`, `/notes`, `/practice/wrong`

检查结果：**0 问题命中**：

- 每页恰好 1 个 h1、至少 1 个 main；
- 0 重复 id；
- 0 无标签按钮；
- 0 无文本/标签链接；
- 0 无 alt 图片；
- 0 嵌套 `<a>`；
- 0 横向溢出。

新增功能（公式收藏、搜索 related chips、今日建议）均包含在检查内。

## 3. 打印

重新生成 `web/screenshots/reader-print.pdf`：

- 2,825,188 bytes；**47 页**；A4、0.5in 边距；
- 打印 CSS 仍有导航隐藏、黑白正文、公式/定理防截断。

## 4. 边界与未完成

- 仅 Chrome headless 模拟，不是真实低端手机；
- 未做完整屏幕阅读器（NVDA/VoiceOver）实测；
- 未安装 axe-core 做全量规则扫描；
- 打印是页数与生成 smoke，未逐页核对公式断行；
- 4 个超长节仍为 7.3–8.8 万 DOM，未拆分。

## 5. 结论

Phase 5 的低端/无障碍/打印**smoke 通过**，没有发现新的阻塞问题；真实设备与屏幕阅读器仍是发布后的持续质量项，不阻塞当前 RC1。
