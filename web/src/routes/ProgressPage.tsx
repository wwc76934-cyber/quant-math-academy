import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { StudyTabs } from '../components/layout/StudyTabs';
import { useToast } from '../components/reader/Toast';
import { EmptyState } from '../components/ui/EmptyState';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { ImportStoreSummary, StoreV1 } from '../features/store/types';
import { formatDisplayTitle, formatPercentage } from '../lib/format';
import { learnPath, notesPath, practicePath } from '../lib/paths';

export interface TodaySuggestion {
  title: string;
  reason: string;
  link: string;
}

export function getTodaySuggestion(store: StoreV1, book: Book | null): TodaySuggestion {
  const nowIso = new Date().toISOString();

  // 1. store.review 中 dueAt <= now 且未掌握的数量 > 0：
  //    - 标题“先复习 N 道到期错题”
  //    - 理由“间隔复习到期”
  //    - 链接 /practice/wrong
  const wrongReviews = Object.values(store.review || {});
  const dueReviews = wrongReviews.filter(
    (r) => r.dueAt <= nowIso && (r.correctStreak === undefined || r.correctStreak < 3)
  );
  if (dueReviews.length > 0) {
    return {
      title: `先复习 ${dueReviews.length} 道到期错题`,
      reason: '间隔复习到期',
      link: '/practice/wrong',
    };
  }

  // 2. 否则错题数（store.exercises 中 status=wrong）>0：
  //    - “重练 N 道错题” / 理由“错题优先”
  //    - 链接 /practice/wrong
  const wrongExercises = Object.values(store.exercises || {}).filter(
    (ex) => ex.status === 'wrong'
  );
  if (wrongExercises.length > 0) {
    return {
      title: `重练 ${wrongExercises.length} 道错题`,
      reason: '错题优先',
      link: '/practice/wrong',
    };
  }

  // 3. 否则 store.lastLocation 存在：
  //    - “继续上次位置：{章/节标题}” / 理由“最近阅读”
  //    - 链接 /learn/{chapterId}#{sectionId}
  if (store.lastLocation && store.lastLocation.chapterId) {
    const chapter = book?.chapters.find((c) => c.id === store.lastLocation?.chapterId);
    const section = chapter?.sections.find((s) => s.id === store.lastLocation?.sectionId);
    const displayTitle = section
      ? formatDisplayTitle(section.title)
      : chapter
      ? formatDisplayTitle(chapter.title)
      : store.lastLocation.sectionId || store.lastLocation.chapterId;
    const hash = store.lastLocation.sectionId ? `#${store.lastLocation.sectionId}` : '';
    return {
      title: `继续上次位置：${displayTitle}`,
      reason: '最近阅读',
      link: `/learn/${store.lastLocation.chapterId}${hash}`,
    };
  }

  // 4. 否则已学节数（progress status done/master）为 0：
  //    - “从第 1 章开始” / 理由“建立基础”
  //    - 链接 /learn/c01
  const learnedCount = Object.values(store.progress || {}).filter(
    (p) => p.status === 'done' || p.status === 'master'
  ).length;
  if (learnedCount === 0) {
    return {
      title: '从第 1 章开始',
      reason: '建立基础',
      link: '/learn/c01',
    };
  }

  // 5. 否则已学 >0 且无到期/错题：
  //    - “继续推进全书” / 理由“保持节奏”
  //    - 链接 /syllabus
  return {
    title: '继续推进全书',
    reason: '保持节奏',
    link: '/syllabus',
  };
}

export const ProgressPage: React.FC = () => {
  const { store, importStore, resetStore } = useStore();
  const { showToast } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Data management state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingImport, setPendingImport] = useState<{
    raw: unknown;
    summary: ImportStoreSummary;
    filename: string;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetInput, setResetInput] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadBook()
      .then((data) => {
        if (!cancelled) {
          setBook(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Total sections across the whole book
  const totalSections = useMemo(() => {
    if (!book) return 219;
    return book.chapters.reduce((acc, c) => acc + (c.sectionCount || c.sections.length || 0), 0);
  }, [book]);

  const totalExercises = useMemo(() => {
    if (!book) return 698;
    return book.chapters.reduce((acc, c) => acc + (c.exerciseCount || 0), 0);
  }, [book]);

  // Overall KPIs
  const kpis = useMemo(() => {
    const progressValues = Object.values(store.progress);
    const learnedSections = progressValues.filter(
      (p) => p.status === 'done' || p.status === 'master'
    ).length;
    const masteredSections = progressValues.filter(
      (p) => p.status === 'master'
    ).length;

    const wrongReviews = Object.values(store.review);
    const wrongCount = wrongReviews.length;

    const nowIso = new Date().toISOString();
    const dueTodayCount = wrongReviews.filter((r) => r.dueAt <= nowIso).length;

    const learnedPct = totalSections > 0 ? (learnedSections / totalSections) * 100 : 0;

    return {
      learnedSections,
      masteredSections,
      wrongCount,
      dueTodayCount,
      learnedPct,
    };
  }, [store.progress, store.review, totalSections]);

  const todaySuggestion = useMemo(() => getTodaySuggestion(store, book), [store, book]);

  // Chapter mapping for reviews
  const chapterMap = useMemo(() => {
    const map = new Map<string, { label: string; title: string }>();
    if (!book) return map;
    for (const ch of book.chapters) {
      map.set(ch.id, { label: ch.label, title: ch.title });
    }
    return map;
  }, [book]);

  // Review Queue: sorted by dueAt asc, top 20
  const reviewQueue = useMemo(() => {
    const reviews = Object.values(store.review);
    reviews.sort((a, b) => a.dueAt.localeCompare(b.dueAt));
    return reviews.slice(0, 20);
  }, [store.review]);

  // Chapter table data
  const chapterTableData = useMemo(() => {
    if (!book) return [];

    return book.chapters.map((ch) => {
      let chLearned = 0;
      let chMastered = 0;
      for (const sec of ch.sections) {
        const item = store.progress[sec.id];
        if (item) {
          if (item.status === 'done' || item.status === 'master') chLearned++;
          if (item.status === 'master') chMastered++;
        }
      }

      let chPracticed = 0;
      for (const ex of Object.values(store.exercises)) {
        if (ex.chapterId === ch.id && ex.status !== 'unseen') {
          chPracticed++;
        }
      }

      let chWrong = 0;
      for (const rev of Object.values(store.review)) {
        if (rev.chapterId === ch.id) {
          chWrong++;
        }
      }

      const totalSecs = ch.sectionCount || ch.sections.length || 1;
      const sectionPct = Math.round((chLearned / totalSecs) * 100);

      return {
        id: ch.id,
        number: ch.number,
        label: ch.label,
        title: ch.title,
        sectionCount: totalSecs,
        learnedCount: chLearned,
        masteredCount: chMastered,
        sectionPct,
        exerciseCount: ch.exerciseCount || 0,
        practicedCount: chPracticed,
        wrongCount: chWrong,
      };
    });
  }, [book, store.progress, store.exercises, store.review]);

  const noteCount = useMemo(() => Object.keys(store.notes || {}).length, [store.notes]);

  const handleExport = () => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const d = new Date();
    const ts = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
    const filename = `qma-backup-${ts}.json`;
    const payload = {
      schemaVersion: 1,
      exportedAt: d.toISOString(),
      app: 'quant-math-academy',
      store,
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    showToast('学习数据已导出下载');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so re-selecting same file triggers change
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') {
          setImportError('读取文件内容失败');
          return;
        }
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          setImportError('导入文件必须为有效 JSON 格式');
          return;
        }

        let candidate: Record<string, unknown> = parsed;
        if (candidate.store && typeof candidate.store === 'object') {
          candidate = candidate.store as Record<string, unknown>;
        }

        if (candidate.schemaVersion !== 1) {
          setImportError(`版本不兼容 (schemaVersion: ${String(candidate?.schemaVersion)})，仅支持 v1 版本`);
          return;
        }

        if (!candidate.settings || typeof candidate.settings !== 'object') {
          setImportError('缺少 settings 配置或结构非法');
          return;
        }

        const progressCount =
          candidate.progress && typeof candidate.progress === 'object'
            ? Object.values(candidate.progress as Record<string, { status?: string }>).filter(
                (p) => p?.status === 'done' || p?.status === 'master'
              ).length
            : 0;

        const exerciseCount =
          candidate.exercises && typeof candidate.exercises === 'object'
            ? Object.values(candidate.exercises as Record<string, { status?: string }>).filter(
                (ex) => ex?.status && ex.status !== 'unseen'
              ).length
            : 0;

        const wrongCount =
          candidate.review && typeof candidate.review === 'object'
            ? Object.keys(candidate.review).length
            : 0;

        const nc =
          candidate.notes && typeof candidate.notes === 'object'
            ? Object.keys(candidate.notes).length
            : 0;

        const activePath =
          candidate.path &&
          typeof candidate.path === 'object' &&
          typeof (candidate.path as { active?: string }).active === 'string'
            ? (candidate.path as { active: string }).active
            : 'none';

        setPendingImport({
          raw: parsed,
          filename: file.name,
          summary: {
            progressCount,
            exerciseCount,
            wrongCount,
            noteCount: nc,
            activePath,
          },
        });
        setImportError(null);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : '文件解析失败，请检查是否为合法 JSON');
      }
    };
    reader.onerror = () => {
      setImportError('读取文件遇到错误');
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!pendingImport) return;
    const res = importStore(pendingImport.raw);
    if (res.success) {
      showToast('已从备份恢复');
      setPendingImport(null);
    } else {
      setImportError(res.error || '导入失败');
    }
  };

  const handleResetStore = () => {
    resetStore();
    setShowResetConfirm(false);
    setResetInput('');
    showToast('已清空学习数据并重置为初始状态');
  };

  if (loading) {
    return (
      <main className="page progress-page" id="main-content">
        <p className="page-loading" role="status">正在载入学习记录…</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="page progress-page" id="main-content">
        <div role="alert" className="notice notice--error">
          目录数据没有载入成功：{error || '缺少章节数据'}。请刷新页面重试。
        </div>
      </main>
    );
  }

  const nowIso = new Date().toISOString();

  return (
    <main className="page progress-page" id="main-content">
      <PageHeader
        title="学习进度"
        lede={`全书 ${totalSections} 节、${totalExercises} 道习题的阅读和练习记录。数据只存在这台设备的浏览器里，页面底部可以导出备份。`}
      />
      <StudyTabs />

      <section className="stat-row" aria-label="进度概况">
        <div className="stat" data-testid="kpi-learned">
          <span className="stat__label">已读完</span>
          <span className="stat__value">
            {kpis.learnedSections}{' '}
            <small>
              / {totalSections} 节 ({formatPercentage(kpis.learnedPct)})
            </small>
          </span>
          <span className="stat__hint">标为“已完成”或“已掌握”的小节</span>
        </div>
        <div className="stat" data-testid="kpi-mastered">
          <span className="stat__label">已掌握</span>
          <span className="stat__value">
            {kpis.masteredSections} <small>节</small>
          </span>
          <span className="stat__hint">能独立复述定理与推导</span>
        </div>
        <div className="stat" data-testid="kpi-wrong">
          <span className="stat__label">错题</span>
          <span className="stat__value">
            {kpis.wrongCount} <small>题</small>
          </span>
          <span className="stat__hint">
            <Link to="/practice/wrong">打开错题本</Link>
          </span>
        </div>
        <div className="stat" data-testid="kpi-due">
          <span className="stat__label">今天到期</span>
          <span className="stat__value">
            {kpis.dueTodayCount} <small>题</small>
          </span>
          <span className="stat__hint">到了该重做的时间</span>
        </div>
      </section>

      <section
        className="progress-suggestion-card"
        aria-labelledby="progress-suggestion-heading"
        data-testid="progress-suggestion-card"
      >
        <div className="progress-suggestion-card__body">
          <div className="progress-suggestion-card__tag">今天建议先做</div>
          <h2 id="progress-suggestion-heading" className="progress-suggestion-card__title">
            {todaySuggestion.title}
          </h2>
          <p className="progress-suggestion-card__reason">{todaySuggestion.reason}</p>
        </div>
        <div className="progress-suggestion-card__action">
          <Link to={todaySuggestion.link} className="btn btn--primary progress-suggestion-card__link">
            开始
          </Link>
        </div>
      </section>

      {/* Review queue */}
      <section className="progress-block" aria-labelledby="review-queue-heading">
        <div className="progress-block__head">
          <div>
            <h2 id="review-queue-heading">复习队列</h2>
            <p>按到期时间排序，最多显示 20 条。连续答对 3 次或标记掌握后移出。</p>
          </div>
          <Link to="/practice/wrong">全部错题</Link>
        </div>

        {reviewQueue.length === 0 ? (
          <div data-testid="review-queue-empty">
            <EmptyState
              title="复习队列是空的"
              description="练习中标为“做错”的题会进入这里，按 1、3、7 天的间隔提醒你重做。"
              action={
                <Link to={practicePath()} className="btn btn--secondary">
                  去做练习
                </Link>
              }
            />
          </div>
        ) : (
          <ul className="list">
            {reviewQueue.map((item) => {
              const ch = chapterMap.get(item.chapterId);
              const isDue = item.dueAt <= nowIso;
              const dueDate = new Date(item.dueAt);
              const dueText = isDue ? '今日待复习' : `${dueDate.getMonth() + 1} 月 ${dueDate.getDate()} 日复习`;

              return (
                <li key={item.exerciseId} className={`review-item${isDue ? ' is-due' : ''}`}>
                  <div className="review-item__main">
                    <strong>
                      {ch ? `${ch.label} 习题 ${item.number}` : `${item.chapterId.toUpperCase()} 习题 ${item.number}`}
                    </strong>
                    <span className={isDue ? 'review-item__due' : 'review-item__when'}>{dueText}</span>
                    <span className="review-item__meta">
                      {ch ? `${formatDisplayTitle(ch.title)} · ` : ''}连续答对 {item.correctStreak} / 3 次
                    </span>
                  </div>
                  <div className="review-item__actions">
                    <Link
                      to={`${practicePath(item.chapterId)}#${item.exerciseId}`}
                      className={`btn btn--sm ${isDue ? 'btn--primary' : 'btn--secondary'}`}
                    >
                      重做
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Chapter table */}
      <section className="progress-block" aria-labelledby="chapter-progress-heading">
        <div className="progress-block__head">
          <div>
            <h2 id="chapter-progress-heading">各章进度</h2>
            <p>
              已记笔记 {noteCount} 节 · <Link to={notesPath()}>查看笔记</Link>
            </p>
          </div>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">章</th>
                <th scope="col" className="data-table__bar-col">小节</th>
                <th scope="col">习题</th>
                <th scope="col">错题</th>
                <th scope="col" className="data-table__actions">
                  <span className="visually-hidden">操作</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {chapterTableData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Link to={learnPath(row.id)} className="data-table__title">
                      <span>{row.label}</span> {formatDisplayTitle(row.title)}
                    </Link>
                  </td>
                  <td className="data-table__bar-col">
                    <span className="data-table__bar">
                      <span className="list-row__bar">
                        <i
                          style={{ width: `${row.sectionPct}%` }}
                          className={row.sectionPct === 100 ? 'is-complete' : ''}
                        />
                      </span>
                      <span className="data-table__num">
                        {row.learnedCount}/{row.sectionCount}
                      </span>
                    </span>
                  </td>
                  <td className="data-table__num">
                    {row.practicedCount} / {row.exerciseCount} 题
                  </td>
                  <td className={`data-table__num${row.wrongCount > 0 ? ' is-warning' : ''}`}>
                    {row.wrongCount > 0 ? `${row.wrongCount} 题` : '—'}
                  </td>
                  <td className="data-table__actions">
                    <Link to={learnPath(row.id)}>阅读</Link>
                    <Link to={practicePath(row.id)}>练习</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Data management */}
      <section className="progress-block data-panel" aria-labelledby="data-management-heading">
        <div className="progress-block__head">
          <div>
            <h2 id="data-management-heading">备份与恢复</h2>
            <p>
              进度、练习记录、错题和笔记都只保存在当前浏览器里，不会上传。换设备或清理浏览器数据前，先导出一份备份。
            </p>
          </div>
        </div>

        <div className="data-panel__rows">
          <div className="data-panel__row">
            <div>
              <h3>导出备份</h3>
              <p>下载一个 JSON 文件，包含全部阅读进度、练习记录、错题和笔记。</p>
            </div>
            <button type="button" className="btn btn--primary" onClick={handleExport}>
              导出备份
            </button>
          </div>

          <div className="data-panel__row">
            <div>
              <h3>从备份恢复</h3>
              <p>选择之前导出的文件。导入前会先校验并显示摘要，确认后才会覆盖本机数据。</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="visually-hidden"
              onChange={handleFileSelect}
              data-testid="file-import-input"
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                setImportError(null);
                fileInputRef.current?.click();
              }}
            >
              选择备份文件
            </button>
          </div>

          <div className="data-panel__row">
            <div>
              <h3>清空本机记录</h3>
              <p>删除全部进度、练习记录、错题和笔记，并恢复默认阅读设置。无法撤销。</p>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--danger"
              onClick={() => {
                setShowResetConfirm(true);
                setResetInput('');
              }}
            >
              清空本机记录
            </button>
          </div>
        </div>

        {importError && (
          <div role="alert" data-testid="import-error-alert" className="notice notice--error">
            <strong>无法导入：</strong>
            {importError}
          </div>
        )}

        {pendingImport && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-preview-title"
            data-testid="import-preview-modal"
            className="confirm-panel"
          >
            <h3 id="import-preview-title">确认导入备份</h3>
            <p>
              文件 <code>{pendingImport.filename}</code> 格式正确。
              <strong>确认后将完全覆盖当前本机的学习记录与笔记，无法撤销。</strong>
            </p>
            <dl className="confirm-panel__summary">
              <div>
                <dt>已读小节</dt>
                <dd>{pendingImport.summary.progressCount} 节</dd>
              </div>
              <div>
                <dt>练习记录</dt>
                <dd>{pendingImport.summary.exerciseCount} 题</dd>
              </div>
              <div>
                <dt>错题</dt>
                <dd>{pendingImport.summary.wrongCount} 题</dd>
              </div>
              <div>
                <dt>笔记</dt>
                <dd>{pendingImport.summary.noteCount} 条</dd>
              </div>
              <div>
                <dt>学习路径</dt>
                <dd>{pendingImport.summary.activePath}</dd>
              </div>
            </dl>
            <div className="confirm-panel__actions">
              <button type="button" className="btn btn--ghost" onClick={() => setPendingImport(null)}>
                取消
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleConfirmImport}
                data-testid="confirm-import-btn"
              >
                覆盖并恢复
              </button>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
            data-testid="reset-confirm-modal"
            className="confirm-panel confirm-panel--danger"
          >
            <h3 id="reset-dialog-title">清空这台设备上的全部学习记录？</h3>
            <p>
              进度、练习记录、错题、笔记和阅读设置都会被删除，无法撤销。建议先导出备份。输入 <strong>清空</strong> 以确认。
            </p>
            <div className="confirm-panel__actions confirm-panel__actions--start">
              <input
                type="text"
                value={resetInput}
                onChange={(e) => setResetInput(e.target.value)}
                placeholder="输入 清空"
                aria-label="输入“清空”以确认清空所有本机数据"
                data-testid="reset-confirm-input"
              />
              <button
                type="button"
                className="btn btn--primary btn--danger-solid"
                onClick={handleResetStore}
                disabled={resetInput.trim() !== '清空'}
                data-testid="reset-confirm-btn"
              >
                确认清空
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setShowResetConfirm(false)}>
                取消
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
