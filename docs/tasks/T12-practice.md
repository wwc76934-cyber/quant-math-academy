# T12 — 练习、错题本与学习进度（Phase 3 第二步）

## 1. 背景

- 阅读页章末习题已懒加载、解析可折叠；但“标记做对/加入错题”仍是 Phase 3 占位 toast。
- `/practice`、`/practice/:chapterId`、`/progress` 仍是占位页。
- store 已有 `exercises`/`review` 字段但类型为 `Record<string, unknown>`，未使用。

## 2. 目标

把章末习题接成真实练习系统：

1. **标记做对/加入错题**：写 store、持久化、按钮状态反馈；错题进入错题本与复习队列。
2. **练习页** `/practice`：按章进入练习；显示每章题数、已做/错题统计；错题本入口。
3. **练习会话** `/practice/:chapterId`：一次一题或列表模式；题干、展开解析、上一题/下一题、标记做对/加入错题、进度。
4. **错题本** `/practice/wrong`：跨章错题列表（按章分组）、重练入口、移除/标记掌握。
5. **进度页** `/progress`：真实统计（已学节/已掌握/错题/待复习），按章表格，复习队列。
6. 简单间隔复习：错题 due +1 天；连续答对 3 次或标记掌握后移出队列；不做复杂 SM-2。

## 3. 数据模型（schema v1 扩展，保持向后兼容）

```ts
export type ExerciseStatus = 'unseen' | 'correct' | 'wrong';

export interface ExerciseRecord {
  status: ExerciseStatus;
  chapterId: string;
  number: number;
  attempts: number;
  lastAt: string;
}

export interface ReviewRecord {
  kind: 'exercise';
  exerciseId: string;
  chapterId: string;
  number: number;
  dueAt: string;
  intervalDays: number;
  correctStreak: number;
  lastAt: string;
}
```

- `StoreV1.exercises: Record<string, ExerciseRecord>`；`review: Record<string, ReviewRecord>`。
- 读取旧 localStorage 时：若字段不是预期结构，忽略坏记录，不阻塞启动；不破坏 `progress/settings/path`。
- Actions：`markExercise(exerciseId, {chapterId, number, correct})`、`removeWrongExercise(id)`、`markExerciseMastered(id)`、`reviewWrongExercise(id, correct)`。
- 日志 activity 增加 `exercise` 类型。
- 任何 action 都写 localStorage（沿用 400ms 防抖）；刷新后保留。

## 4. 练习体验

- `/practice`：
  - 顶部总览：总题数 698、已做、正确、错题、待复习；
  - 章节列表：章号/标题、题数、已做/错题、进入练习；
  - 错题本入口；空态“还没有错题”。
- `/practice/:chapterId`：
  - 顶部章名、当前题号/总题数、进度；
  - 题干 HTML（构建期 KaTeX）；
  - 展开/收起解析；
  - 标记做对、加入错题（互斥状态，按钮显示当前状态）；
  - 上一题/下一题；完成后返回章末/错题本；
  - 键盘：←/→ 切题，1 做对，2 错题，Space 展开解析（输入框外）。
- `/practice/wrong`：
  - 按章分组；显示题号、最后错误时间、复习到期；
  - “重练”跳 `/practice/{chapterId}#{exerciseId}` 或打开该题；
  - “标记掌握”移出；空态。
- `/progress`：
  - 4 个核心指标：已学节 / 已掌握 / 错题 / 今日待复习；
  - 按章表格（节进度、题进度、错题）；
  - 复习队列（due 排序，最多 20 条，点击练习）；
  - 数据来自真实 store，不造假。
- 阅读页 ReaderExercises 接入同一 store；按钮不再是 Phase 3 toast。
- 首页“练习”统计可从 store 读取（可选）。

## 5. 复习规则（简单、可解释）

- 答错：`status='wrong'`，`dueAt=+1 天`，`intervalDays=1`，`correctStreak=0`。
- 错题重练答对：`correctStreak+1`，`dueAt=+[1,3,7][streak] 天`；达到 3 次或“标记掌握”移出错题/复习。
- 普通题答对：`status='correct'`，不进入复习队列。
- 已掌握/正确不重复计数；attempts 每次+1。

## 6. 测试

- store：mark correct/wrong 持久化、刷新恢复、旧坏数据容错、activity。
- ReaderExercises：点击标记后按钮状态变化、toast、store 写入。
- PracticePage：章列表统计、错题入口、空态。
- PracticeSession：切题、展开解析、标记、上一题/下一题。
- WrongBook：分组、重练、标记掌握。
- ProgressPage：真实统计、due 队列、空态。
- 既有 77 Web + 58 内容测试不回归；build 0。

## 7. 约束

- 只改 `web/`、必要 `tools/content/`（测试/校验）；不改 `src/` 教材、不改 metadata/paths。
- 不安装新依赖；不做后端；不发布。
- 不伪造练习数据/正确率；未做就是 0。
- 解析仍用构建期 HTML；不客户端跑 KaTeX。

## 8. 验收

1. 阅读页标记做对/错题真实写入并在刷新后保留。
2. `/practice`、`/practice/:chapterId`、`/practice/wrong`、`/progress` 可用。
3. 错题本与复习 due 规则符合第 5 节；可标记掌握移出。
4. 统计真实、空态诚实、移动端无溢出。
5. build/test/截图；报告已知限制。
