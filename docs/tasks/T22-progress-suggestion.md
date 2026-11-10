# T22 — /progress 今日建议卡（Phase 4 小切片）

## 范围

**只改/新增 4 个文件**：

1. `web/src/routes/ProgressPage.tsx`
2. `web/src/styles/components.css`
3. 新增 `web/tests/ProgressSuggestion.test.tsx`
4. 任务书本身（不改其他）

**不要**改 store、路径数据、内容、发布配置；不要跑全量测试。

## 功能

在 `/progress` 顶部指标之后、复习队列之前，加“今日建议”卡：

规则按优先级取第一条命中：

1. `store.review` 中 `dueAt <= now` 且未掌握的数量 > 0：
   - 标题“先复习 N 道到期错题”
   - 理由“间隔复习到期”
   - 链接 `/practice/wrong`
2. 否则错题数（`store.exercises` 中 status=wrong）>0：
   - “重练 N 道错题” / 理由“错题优先”
   - 链接 `/practice/wrong`
3. 否则 `store.lastLocation` 存在：
   - “继续上次位置：{章/节标题}” / 理由“最近阅读”
   - 链接 `/learn/{chapterId}#{sectionId}`
4. 否则已学节数（progress status done/master）为 0：
   - “从第 1 章开始” / 理由“建立基础”
   - 链接 `/learn/c01`
5. 否则已学 >0 且无到期/错题：
   - “继续推进全书” / 理由“保持节奏”
   - 链接 `/syllabus`

每条只显示一个“开始 →”链接；不锁内容；数据来自现有 store/book；不新增请求。

## UI

- 学术列表式卡片，不用彩色渐变；顶部小标签“TODAY · 建议”。
- 含标题、理由、链接；`aria-labelledby`。
- 移动端换行不溢出。
- 放在页面顶部指标之后。

## 测试

- 到期复习分支；
- 错题分支（无到期）；
- lastLocation 分支；
- 零进度分支；
- 空/已学分支。
可 mock store localStorage 与 book fetch；只跑目标测试。

## 硬性执行约束

- 只跑 `npm --prefix web run build` 与 `npm --prefix web test -- tests/ProgressSuggestion.test.tsx`；
- 不要 `manage_task`/`schedule`/后台等待/sleep/轮询；
- 命令 >120 秒就停止并报告；
- 最后必须给终态：文件、build、目标测试、未完成项；不要让“等待测试”成为最后一句。
