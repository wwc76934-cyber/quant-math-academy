import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/reader/Toast';
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
      showToast('数据恢复成功！');
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
      <main className="content progress-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载学习进度与统计...</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="content progress-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '16px', background: 'var(--bg-subtle)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
          <h3>数据载入失败</h3>
          <p>{error || '无法获取章节数据'}</p>
        </div>
      </main>
    );
  }

  const nowIso = new Date().toISOString();

  return (
    <main
      className="content progress-page shell"
      id="main-content"
      style={{ padding: '36px 24px 64px', maxWidth: '1040px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Page Header */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            PROGRESS & METRICS
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 12px', fontWeight: 600, color: 'var(--ink)' }}>
          学习进度与复习队列
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: '780px' }}>
          追踪全书 34 章 219 节知识点掌握情况、{totalExercises} 道习题练习记录与基于间隔遗忘模型的错题复习队列。
        </p>
      </header>

      {/* 2. Four Core KPIs */}
      <section
        aria-label="核心进度指标"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          data-testid="kpi-learned"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>已学节数 (done / master)</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {kpis.learnedSections} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>/ {totalSections} 节 ({formatPercentage(kpis.learnedPct)})</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>已标记完成或掌握的知识点</span>
        </div>

        <div
          data-testid="kpi-mastered"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>重点掌握 (master)</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {kpis.masteredSections} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>节</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>完全精通且可推导的核心节</span>
        </div>

        <div
          data-testid="kpi-wrong"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>错题本题目</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: kpis.wrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink)' }}>
            {kpis.wrongCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <Link
            to="/practice/wrong"
            style={{ fontSize: '11px', color: 'var(--accent, #1a56db)', textDecoration: 'none' }}
          >
            前往错题本管理 →
          </Link>
        </div>

        <div
          data-testid="kpi-due"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>今日待复习</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: kpis.dueTodayCount > 0 ? 'var(--accent, #1a56db)' : 'var(--ink)' }}>
            {kpis.dueTodayCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>到期等待重新练习检验</span>
        </div>
      </section>

      {/* 2.5 Today Suggestion Card */}
      <section
        className="progress-suggestion-card"
        aria-labelledby="progress-suggestion-heading"
        data-testid="progress-suggestion-card"
      >
        <div className="progress-suggestion-card__body">
          <div className="progress-suggestion-card__tag">TODAY · 建议</div>
          <h2 id="progress-suggestion-heading" className="progress-suggestion-card__title">
            {todaySuggestion.title}
          </h2>
          <p className="progress-suggestion-card__reason">
            {todaySuggestion.reason}
          </p>
        </div>
        <div className="progress-suggestion-card__action">
          <Link
            to={todaySuggestion.link}
            className="btn btn--primary progress-suggestion-card__link"
          >
            开始 →
          </Link>
        </div>
      </section>

      {/* 3. Review Queue Section */}
      <section aria-labelledby="review-queue-heading" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div>
            <h2 id="review-queue-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
              复习队列
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
              按到期时间排序，连续做对 3 次或标记掌握后移出队列（最多展示前 20 条）。
            </p>
          </div>
          <Link
            to="/practice/wrong"
            style={{ fontSize: '13px', color: 'var(--accent, #1a56db)', textDecoration: 'none', fontWeight: 500 }}
          >
            查看全部错题本 →
          </Link>
        </div>

        {reviewQueue.length === 0 ? (
          <div
            data-testid="review-queue-empty"
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px dashed var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '32px 20px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '0 0 8px', fontSize: '15px', color: 'var(--ink-secondary)', fontWeight: 500 }}>
              当前复习队列为空
            </p>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-muted)' }}>
              在阅读教材或章节练习中做错的题目会自动进入复习队列，并按 1 天 / 3 天 / 7 天提示复习。
            </p>
            <Link
              to="/practice"
              className="btn btn--secondary"
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                fontSize: '13px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                textDecoration: 'none',
                color: 'var(--ink)',
              }}
            >
              浏览章节练习题库
            </Link>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 2fr) 110px 140px 100px',
                padding: '10px 16px',
                background: 'var(--bg-subtle, #f6f6f4)',
                borderBottom: '1px solid var(--border, #e5e5e0)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink-muted)',
              }}
            >
              <span>题目</span>
              <span>连续正确</span>
              <span>复习状态</span>
              <span style={{ textAlign: 'right' }}>操作</span>
            </div>
            <div role="list">
              {reviewQueue.map((item) => {
                const ch = chapterMap.get(item.chapterId);
                const isDue = item.dueAt <= nowIso;
                const dueDate = new Date(item.dueAt);
                const dueText = isDue
                  ? '今日待复习'
                  : `${dueDate.getMonth() + 1}月${dueDate.getDate()}日到期`;

                return (
                  <div
                    role="listitem"
                    key={item.exerciseId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(220px, 2fr) 110px 140px 100px',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border, #e5e5e0)',
                      fontSize: '13px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                        {ch ? `${ch.label} 习题 ${item.number}` : `${item.chapterId.toUpperCase()} 习题 ${item.number}`}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                        {ch ? formatDisplayTitle(ch.title) : ''}
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: item.correctStreak > 0 ? '#e6f4ea' : 'var(--bg-subtle, #f0f0ee)',
                          color: item.correctStreak > 0 ? '#137333' : 'var(--ink-muted)',
                        }}
                      >
                        {item.correctStreak} / 3 次
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: isDue ? 600 : 400,
                          color: isDue ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                        }}
                      >
                        {dueText}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Link
                        to={`${practicePath(item.chapterId)}#ex-${item.number}`}
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--accent, #1a56db)',
                          textDecoration: 'none',
                        }}
                      >
                        练习 →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 4. My Notes Section */}
      <section aria-labelledby="notes-section-heading" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div>
            <h2 id="notes-section-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
              我的笔记
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
              已在 {noteCount} 节记录学习推导与心得，支持纯文本编辑与快速跳转。
            </p>
          </div>
          <Link
            to={notesPath()}
            style={{ fontSize: '13px', color: 'var(--accent, #1a56db)', textDecoration: 'none', fontWeight: 500 }}
          >
            查看全部笔记 ({noteCount}) →
          </Link>
        </div>

        {noteCount === 0 ? (
          <div
            data-testid="notes-empty-card"
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px dashed var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '0 0 8px', fontSize: '15px', color: 'var(--ink-secondary)', fontWeight: 500 }}>
              还没有记录任何笔记
            </p>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-muted)' }}>
              在阅读各章节知识点时，可在正文底部随时记录推导心得、考点备忘或疑问。
            </p>
            <Link
              to="/syllabus"
              className="btn btn--secondary"
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                fontSize: '13px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                textDecoration: 'none',
                color: 'var(--ink)',
              }}
            >
              浏览章节教材
            </Link>
          </div>
        ) : (
          <div
            data-testid="notes-summary-card"
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '16px 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                  已累计记录 {noteCount} 节笔记
                </span>
                <span style={{ marginLeft: '12px', fontSize: '12px', color: 'var(--ink-muted)' }}>
                  纯文本保存在本地，换设备前建议导出备份。
                </span>
              </div>
              <Link
                to={notesPath()}
                className="btn btn--secondary"
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                }}
              >
                前往笔记管理页 →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. Chapter Progress Table */}
      <section aria-labelledby="chapter-progress-heading">
        <div style={{ marginBottom: '16px' }}>
          <h2 id="chapter-progress-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
            章节明细
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
            全书 34 章节进度、习题完成度与错题一览表。
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card, #ffffff)',
            border: '1px solid var(--border, #e5e5e0)',
            borderRadius: '6px',
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'var(--bg-subtle, #f6f6f4)',
                  borderBottom: '1px solid var(--border, #e5e5e0)',
                  fontSize: '12px',
                  color: 'var(--ink-muted)',
                }}
              >
                <th style={{ padding: '10px 16px', fontWeight: 600 }}>章节</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '180px' }}>知识点进度</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '120px' }}>习题练习</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '90px' }}>错题</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '140px', textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {chapterTableData.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid var(--border, #e5e5e0)',
                  }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <Link
                      to={learnPath(row.id)}
                      style={{
                        color: 'var(--ink)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      {row.label} {formatDisplayTitle(row.title)}
                    </Link>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          flex: 1,
                          height: '6px',
                          background: 'var(--bg-subtle, #eee)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${row.sectionPct}%`,
                            height: '100%',
                            background: row.sectionPct === 100 ? '#137333' : 'var(--accent, #1a56db)',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)', minWidth: '45px' }}>
                        {row.learnedCount}/{row.sectionCount}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-secondary)' }}>
                    {row.practicedCount} / {row.exerciseCount} 题
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        color: row.wrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                        fontWeight: row.wrongCount > 0 ? 600 : 400,
                      }}
                    >
                      {row.wrongCount} 题
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link
                      to={learnPath(row.id)}
                      style={{
                        marginRight: '12px',
                        color: 'var(--ink-muted)',
                        textDecoration: 'none',
                        fontSize: '12px',
                      }}
                    >
                      阅读
                    </Link>
                    <Link
                      to={practicePath(row.id)}
                      style={{
                        color: 'var(--accent, #1a56db)',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      练习 →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Data Management & Backup */}
      <section
        aria-labelledby="data-management-heading"
        style={{
          marginTop: '48px',
          borderTop: '1px solid var(--border, #e5e5e0)',
          paddingTop: '32px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h2 id="data-management-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
            数据管理与备份
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
            所有学习记录保存在当前浏览器本地（LocalStorage），无云端存储。更换设备或清理浏览器缓存前请务必导出备份。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {/* Export Card */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>
                导出学习数据
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                导出包含阅读进度、习题答题、错题复习队列与笔记的完整 JSON 备份文件（schemaVersion: 1）。
              </p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'var(--accent, #1a56db)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              导出备份 (JSON)
            </button>
          </div>

          {/* Import Card */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>
                恢复/导入备份
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                从导出的 JSON 文件恢复进度。导入前会严格校验数据格式并展示摘要预览，确认后覆盖本机数据。
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                data-testid="file-import-input"
              />
              <button
                type="button"
                onClick={() => {
                  setImportError(null);
                  fileInputRef.current?.click();
                }}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  background: 'transparent',
                  color: 'var(--ink)',
                  border: '1px solid var(--border, #e5e5e0)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                选择备份文件导入...
              </button>
            </div>
          </div>

          {/* Reset / Clear Card */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 600, color: 'var(--warning, #c9510c)' }}>
                清空本机记录
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                重置阅读进度、练习错题与笔记，恢复至初始默认配置。操作不可逆，需二次确认。
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowResetConfirm(true);
                setResetInput('');
              }}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                color: 'var(--warning, #c9510c)',
                border: '1px solid var(--warning, #c9510c)',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              清空本机记录...
            </button>
          </div>
        </div>

        {/* Import Error Message */}
        {importError && (
          <div
            role="alert"
            data-testid="import-error-alert"
            style={{
              padding: '12px 16px',
              background: '#fdf2f2',
              border: '1px solid #f8b4b4',
              borderRadius: '6px',
              color: '#9b1c1c',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            <strong>导入校验失败：</strong>{importError}
          </div>
        )}

        {/* Import Preview Modal / Confirmation Box */}
        {pendingImport && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-preview-title"
            data-testid="import-preview-modal"
            style={{
              background: 'var(--bg-subtle, #f6f6f4)',
              border: '2px solid var(--accent, #1a56db)',
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            <h3 id="import-preview-title" style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--ink)' }}>
              确认导入备份数据
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-secondary)' }}>
              文件 <code>{pendingImport.filename}</code> 校验通过（schemaVersion: 1）。
              <strong style={{ color: 'var(--warning, #c9510c)', marginLeft: '4px' }}>
                确认后将完全覆盖当前本机的学习记录与笔记！
              </strong>
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                marginBottom: '16px',
                background: 'var(--bg-card, #ffffff)',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--border, #e5e5e0)',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>已学节数</span>
                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>{pendingImport.summary.progressCount} 节</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>已练习题</span>
                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>{pendingImport.summary.exerciseCount} 题</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>错题本</span>
                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>{pendingImport.summary.wrongCount} 题</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>节笔记</span>
                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>{pendingImport.summary.noteCount} 条</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>当前学习路径</span>
                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>{pendingImport.summary.activePath}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setPendingImport(null)}
                style={{
                  padding: '6px 14px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                data-testid="confirm-import-btn"
                style={{
                  padding: '6px 16px',
                  background: 'var(--accent, #1a56db)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                确认覆盖并恢复
              </button>
            </div>
          </div>
        )}

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
            data-testid="reset-confirm-modal"
            style={{
              background: '#fdf2f2',
              border: '2px solid var(--warning, #c9510c)',
              borderRadius: '6px',
              padding: '20px',
              marginBottom: '24px',
            }}
          >
            <h3 id="reset-dialog-title" style={{ margin: '0 0 8px', fontSize: '16px', color: 'var(--warning, #c9510c)' }}>
              高危操作：清空所有本机数据
            </h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5 }}>
              该操作将彻底清空当前浏览器的全部学习进度、习题作答历史、错题复习队列与所写笔记，并将排版设置重置为默认值。此操作无法撤销。
            </p>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--ink-secondary)' }}>
              请输入 <strong>清空</strong> 以确认操作：
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                value={resetInput}
                onChange={(e) => setResetInput(e.target.value)}
                placeholder="输入 清空"
                aria-label="输入“清空”以确认清空所有本机数据"
                data-testid="reset-confirm-input"
                style={{
                  padding: '6px 10px',
                  fontSize: '13px',
                  border: '1px solid var(--border, #ccc)',
                  borderRadius: '4px',
                  width: '160px',
                }}
              />
              <button
                type="button"
                onClick={handleResetStore}
                disabled={resetInput.trim() !== '清空'}
                data-testid="reset-confirm-btn"
                style={{
                  padding: '6px 16px',
                  background: resetInput.trim() === '清空' ? 'var(--warning, #c9510c)' : '#ccc',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: resetInput.trim() === '清空' ? 'pointer' : 'not-allowed',
                }}
              >
                确认清空
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                style={{
                  padding: '6px 12px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                取消
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 7. Storage Note */}
      <footer
        style={{
          marginTop: '40px',
          padding: '16px 20px',
          background: 'var(--bg-subtle, #f6f6f4)',
          borderRadius: '6px',
          fontSize: '12px',
          color: 'var(--ink-muted)',
          lineHeight: 1.6,
        }}
      >
        <strong>本地存储与数据隐私说明：</strong>
        全书 34 章的阅读标记、练习做题记录与错题复习队列完全保存在当前浏览器的 LocalStorage 中，不上传任何服务器。即使离线也可以正常记录与复习。
      </footer>
    </main>
  );
};
