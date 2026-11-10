# T22 /progress 今日建议卡验收

- 日期：2026-11-10
- 状态：**完成并上线**
- 执行：AGY（`agy-suggest`）SUCCESS；DSH 独立验收

## 功能

在 `/progress` 指标与复习队列之间增加“TODAY · 建议”卡，按规则取第一条：

| 优先级 | 条件 | 建议 | 链接 |
|---|---|---|---|
| 1 | 到期复习 >0 | 先复习 N 道到期错题 | `/practice/wrong` |
| 2 | 错题 >0 | 重练 N 道错题 | `/practice/wrong` |
| 3 | lastLocation 存在 | 继续上次位置 | `/learn/{chapter}#{section}` |
| 4 | 已学 0 节 | 从第 1 章开始 | `/learn/c01` |
| 5 | 已学 >0 | 继续推进全书 | `/syllabus` |

只改 `ProgressPage.tsx`、`components.css`，新增 `ProgressSuggestion.test.tsx`；不改 store/路径/内容/发布配置；无内容门禁。

## 验证

| 项 | 结果 |
|---|---|
| 目标测试 | 6/6 |
| 全量 Web | **123 / 123** |
| build | 0 error |
| 本地 `/progress` | “重练 1 道错题”/`/practice/wrong`；390 无溢出 |
| 线上 `/progress` | “从第 1 章开始”/`/learn/c01`；main landmark 正常 |
| 规则 | 五分支测试覆盖；A11y 基本检查 |

## 已知限制

- 建议只基于本地 store 与 lastLocation，不读取路径周计划（路径下一页仍由首页/路径页负责）。
- 没有“连续学习天数”或惩罚性提醒。
- 文案为规则式，不引入 AI/后端。
