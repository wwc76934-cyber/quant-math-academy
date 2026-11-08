# T03 验收记录：内容 HTML 渲染管线与保真校验

- 验收人：DSH
- 日期：2026-11-08
- 状态：**通过（含 4 个已知体积提示）**
- 任务链：T03（渲染）→ T03b（按节/按习题拆分）→ T03c（全局轻量 TOC）

## 1. 产物

```
content/generated/site/
  book.json                 74,543 B；8 篇 / 34 章 / 219 节轻量 TOC
  chapters/cXX.json         34 个章 manifest；最大 84.7KB
  sections/cXX-sN.html      219 个按节预渲染 HTML
  exercises/cXX.json        34 个按章习题 JSON
  manifest.json             构建统计、体积、拆分信息
  validation.json           0 error / 4 warning
```

源码：

- `tools/content/render.mjs`
- `tools/content/build-content.mjs`
- `tools/content/validate-content.mjs`
- `tools/content/sync-web.mjs`
- `tools/content/render.test.mjs`
- `tools/content/coverage.test.mjs`
- `docs/audit/render-report.md`

## 2. 实际运行

| 命令 | 退出码 | 结果 |
|---|---|---|
| `npm run content:build` | 0 | 34 章渲染、219 节拆分、34 个习题 JSON；约 12 秒 |
| `npm run content:validate` | 0 | 34/219/889/698 全部通过；0 error，4 warning |
| `npm run test:content` | 0 | 28 个子测试全部通过（parse 9 + render 13 + coverage 6） |
| `npm run content:sync` | 0 | `site/` → `web/public/content`；book.json 含 219 节 |

## 3. 内容与保真

- 8 篇 / 34 章 / 219 一级节 / 339 二级节
- 889 个环境：199 定义、270 定理、12 引理、71 命题、9 推论、236 例题、91 注记、1 公理
- 3,276 个独立公式（813 个 tag）；41,303 个行内公式；KaTeX 构建期错误 0
- 698 道习题 / 698 份解析，1:1；习题 `sectionId` 为 `null`（章末练习，不伪造逐题归属）
- 覆盖率硬闸门：34 导言 + 34 小结 + 219 节 + 698 题干 + 698 解析 = **1,683 个文本单元，差异 0**
- 锚点：219 节 + 339 子节 + 889 环境 + 813 公式 + 698 习题，全局唯一
- 两次构建：章节 JSON / 节 HTML / 习题 JSON 逐字节一致
- `src/` 与 T01 chapter JSON 未修改

## 4. 体积与首屏

| 指标 | 实测 | 预算 | 结论 |
|---|---:|---:|---|
| book.json | 74.5KB（gzip 9.3KB） | <200KB | 通过 |
| 章 manifest 最大 | 84.7KB（c12，gzip 11.1KB） | ≤300KB | 通过 |
| 节 HTML 最大 | 1,228,313B（c08-s3，gzip 60.4KB） | ≤900KB（目标） | **4 节超 1MB，见下** |
| 习题 JSON 最大 | 2.91MB（c12，gzip 148KB） | ≤3MB | 通过 |
| 首屏（c01 manifest + c01-s1） | 79.4KB（gzip 7.9KB） | ≤100KB raw | 通过 |

原 T03 整章 JSON 最大 6.69MB；拆分后章 manifest 最大 84.7KB，首屏 79.4KB，问题已解决。

## 5. 已知提示（4 个）

`validation.json` 对 4 个单节 HTML >1MB 记 warning：

- `c08-s3` 1199.5KB（gzip 60.4KB）
- `c14-s2` 1066.1KB（gzip 52.0KB）
- `c22-s1` 1077.8KB（gzip 55.0KB）
- `c30-s1` 1060.1KB（gzip 54.0KB）

判定：**Phase 1 接受**。理由：

1. 首屏不加载这些节；阅读页逐节懒加载，且这 4 节不是章首。
2. gzip 传输仅 50–60KB；瓶颈在 DOM 插入，而非网络。
3. 单节插入 1.2MB 预计 8–15ms 文本解析，主流移动端可接受；Phase 5 用真机测长任务，如出现 >100ms 卡顿，再按 `###` 小节二次拆分。
4. 进一步按环境粉碎会破坏定理/证明连续性，不建议在 Phase 1 做。

## 6. 数据契约备注

- `book.json` 的 `chapter.sections` 只含轻量 TOC（id/number/title/anchor/difficulty/priority/minutes），不含 htmlPath/索引；用于首页、目录、左栏。
- 章 manifest 的 `sections` 含 `htmlPath/htmlBytes/meta/subsections/exerciseIds`；用于阅读页。
- 习题为章末练习，`sectionId: null` 是正确值；逐题分节归属是 Phase 3 可选元数据。
- `stats` 同时提供 `displayEquations` 与 `taggedEquations`；`equations` 保留为 tagged 别名，T04/T05 应使用明确字段。

## 7. 验收结论

T03/T03b/T03c 通过。内容可以直接进入 T04/T05；4 个 >1MB 节作为 Phase 5 的性能观察项，不阻塞 Phase 1。
