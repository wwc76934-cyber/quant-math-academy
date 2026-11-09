import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ReaderBookToc } from '../components/reader/ReaderBookToc';
import { ReaderExercises } from '../components/reader/ReaderExercises';
import { ReaderNotes } from '../components/reader/ReaderNotes';
import { ReaderPageToc } from '../components/reader/ReaderPageToc';
import { ReaderSectionInfo } from '../components/reader/ReaderSectionInfo';
import { ReaderSettingsModal } from '../components/reader/ReaderSettingsModal';
import { ReaderShortcutsModal } from '../components/reader/ReaderShortcutsModal';
import { ReaderStatusModal } from '../components/reader/ReaderStatusModal';
import { ReaderSubnav } from '../components/reader/ReaderSubnav';
import { useToast } from '../components/reader/Toast';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/ErrorState';
import { loadBook } from '../features/content/loadBook';
import { loadChapter, loadSection } from '../features/content/loadChapter';
import { Book, ChapterData, SectionData } from '../features/content/types';
import { useStore } from '../features/store/store';
import { formatDisplayTitle } from '../lib/format';
import { learnPath, syllabusPath } from '../lib/paths';

export const ReaderPage: React.FC = () => {
  const { chapterId = 'c01' } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    store,
    resolvedTheme,
    setTheme,
    setFocus,
    setLastLocation,
    updateSectionProgress,
    logActivity,
  } = useStore();

  const [book, setBook] = useState<Book | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Loaded section HTMLs: sectionId -> HTML string
  const [loadedSections, setLoadedSections] = useState<Record<string, string>>({});
  const [sectionErrors, setSectionErrors] = useState<Record<string, string>>({});
  const [loadingSections, setLoadingSections] = useState<Set<string>>(new Set());

  // Current active section (for rails and subnav)
  const [currentSectionId, setCurrentSectionId] = useState<string>('');

  // Modals & Drawers
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [tocDrawerOpen, setTocDrawerOpen] = useState(false);
  const [railDrawerOpen, setRailDrawerOpen] = useState(false);

  // Deep linking pending indicator
  const [isLocatingTarget, setIsLocatingTarget] = useState(false);

  // Study prompt for 30s dwell time
  const [showStudyPrompt, setShowStudyPrompt] = useState(false);
  const dwellTimerRef = useRef<number | null>(null);

  const articleContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  // Suppress scrollspy hash/lastLocation writes while a deep link is being
  // scrolled into place; otherwise the first smooth-scroll frame can replace
  // the requested hash with the top section before the target is reached.
  const deepLinkScrollingRef = useRef(false);
  // Keep scrollspy quiet until every section has been injected and the deep
  // link target has been aligned; otherwise late sections shift the page and
  // the spy rewrites the requested hash to the previous section.
  const deepLinkPendingRef = useRef(false);
  // Only let scrollspy rewrite the URL after an actual reader gesture. This
  // keeps deep links stable while late sections (and math layout) settle.
  const userScrolledRef = useRef(false);
  // Suppress the source page's pending scrollspy writes while React Router is
  // navigating to another chapter; otherwise a stale `#c11-s1` can be written
  // onto the new `/learn/c14` URL.
  const navigatingRef = useRef(false);

  // Global lightweight TOC lookup for prerequisite/related labels and jumps.
  const sectionLookup = useMemo(() => {
    const map: Record<string, { number: string; title: string }> = {};
    for (const chapter of book?.chapters || []) {
      for (const section of chapter.sections) {
        map[section.id] = { number: section.number, title: formatDisplayTitle(section.title) };
      }
    }
    return map;
  }, [book]);

  // Load Book and Chapter Manifest
  useEffect(() => {
    // Abort any ongoing fetches for prior chapter
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const ac = new AbortController();
    abortControllerRef.current = ac;

    setLoading(true);
    setError(null);
    setLoadedSections({});
    setSectionErrors({});
    setLoadingSections(new Set());
    setShowStudyPrompt(false);
    deepLinkPendingRef.current = Boolean(location.hash);
    userScrolledRef.current = false;

    (async () => {
      try {
        const bookData = await loadBook();
        if (ac.signal.aborted) return;
        setBook(bookData);

        const chapData = await loadChapter(chapterId, ac.signal);
        if (ac.signal.aborted) return;
        setChapterData(chapData);

        if (chapData.sections.length > 0) {
          // Identify target section from hash if any
          const rawHash = location.hash.replace('#', '');
          let targetSec = chapData.sections[0];

          if (rawHash) {
            const matched = chapData.sections.find(
              (s) =>
                s.id === rawHash ||
                s.anchor === rawHash ||
                rawHash.startsWith(s.id) ||
                (chapData.environmentIndex &&
                  chapData.environmentIndex.some(
                    (env) => env.id === rawHash && env.sectionId === s.id
                  ))
            );
            if (matched) {
              targetSec = matched;
              setIsLocatingTarget(true);
            }
          }

          setCurrentSectionId(targetSec.id);

          // 2. Load the target/first section immediately
          fetchSingleSection(chapterId, targetSec.id, ac.signal);

          // 3. Concurrently fetch remaining sections with concurrency limit <= 4
          const remaining = chapData.sections
            .filter((s) => s.id !== targetSec.id)
            .map((s) => s.id);

          queueRemainingSections(chapterId, remaining, ac.signal);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!ac.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      ac.abort();
    };
  }, [chapterId]);

  // Keep the navigation lock for one beat after a cross-chapter jump so a
  // pending source-page scrollspy write cannot stamp the old hash onto the new URL.
  useEffect(() => {
    if (!navigatingRef.current) return;
    const timer = window.setTimeout(() => {
      navigatingRef.current = false;
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [chapterId]);

  // Section loader with individual state
  const fetchSingleSection = async (
    chapId: string,
    secId: string,
    signal?: AbortSignal
  ) => {
    setLoadingSections((prev) => new Set(prev).add(secId));
    setSectionErrors((prev) => {
      const copy = { ...prev };
      delete copy[secId];
      return copy;
    });

    try {
      const html = await loadSection(chapId, secId, signal);
      setLoadedSections((prev) => ({ ...prev, [secId]: html }));
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setSectionErrors((prev) => ({
        ...prev,
        [secId]: err instanceof Error ? err.message : '加载本节失败',
      }));
    } finally {
      setLoadingSections((prev) => {
        const next = new Set(prev);
        next.delete(secId);
        return next;
      });
    }
  };

  // Concurrent queue (concurrency <= 4)
  const queueRemainingSections = async (
    chapId: string,
    sectionIds: string[],
    signal: AbortSignal
  ) => {
    const queue = [...sectionIds];
    const concurrency = 4;

    const worker = async () => {
      while (queue.length > 0 && !signal.aborted) {
        const nextSecId = queue.shift();
        if (nextSecId) {
          await fetchSingleSection(chapId, nextSecId, signal);
        }
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, queue.length) }, () => worker());
    await Promise.all(workers);
  };

  // Handle proof default open/closed whenever section HTML is injected
  useEffect(() => {
    if (!articleContainerRef.current) return;
    const proofElements = articleContainerRef.current.querySelectorAll<HTMLDetailsElement>(
      'details.proof'
    );
    const shouldOpen = store.settings.proofDefault === 'open';
    proofElements.forEach((el) => {
      if (shouldOpen) el.setAttribute('open', '');
      else el.removeAttribute('open');
    });
  }, [loadedSections, store.settings.proofDefault, loading, chapterData]);

  // Deep linking scroll to target element when loaded
  useEffect(() => {
    const rawHash = location.hash.replace('#', '');
    if (!rawHash) {
      deepLinkPendingRef.current = false;
      setIsLocatingTarget(false);
      return;
    }

    const allLoaded =
      !chapterData ||
      chapterData.sections.every(
        (s) => loadedSections[s.id] !== undefined || sectionErrors[s.id] !== undefined
      );

    const el = document.getElementById(rawHash);
    if (el) {
      deepLinkPendingRef.current = true;
      deepLinkScrollingRef.current = true;
      // The sticky global header (56px) + reader subnav (44px) occupy the top
      // ~100px. Use an explicit offset instead of relying on native hash
      // scrolling, and re-align once after late sections settle.
      const align = (behavior: ScrollBehavior) => {
        const top = el.getBoundingClientRect().top + window.scrollY - 170;
        window.scrollTo({ top: Math.max(0, top), behavior });
      };
      align('smooth');
      el.classList.add('is-target-highlight');
      const timer = window.setTimeout(() => {
        align('auto');
        el.classList.remove('is-target-highlight');
        deepLinkScrollingRef.current = false;
        if (allLoaded) {
          deepLinkPendingRef.current = false;
          setIsLocatingTarget(false);
        }
      }, 900);
      return () => window.clearTimeout(timer);
    }

    if (allLoaded) {
      deepLinkPendingRef.current = false;
      setIsLocatingTarget(false);
    }
  }, [location.hash, loadedSections, sectionErrors, chapterData]);

  // Mark real reader gestures; programmatic deep-link scrolling must not
  // trigger scrollspy hash rewrites.
  useEffect(() => {
    const mark = () => {
      userScrolledRef.current = true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(
          e.key
        )
      ) {
        mark();
      }
    };
    window.addEventListener('wheel', mark, { passive: true });
    window.addEventListener('touchmove', mark, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', mark);
      window.removeEventListener('touchmove', mark);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // ScrollSpy to update currentSectionId & store lastLocation
  useEffect(() => {
    if (!chapterData || chapterData.sections.length === 0) return;

    let throttleTimer: number | null = null;

    const handleScroll = () => {
      if (throttleTimer !== null) return;

      throttleTimer = window.setTimeout(() => {
        throttleTimer = null;
        if (
          !userScrolledRef.current ||
          deepLinkScrollingRef.current ||
          deepLinkPendingRef.current ||
          navigatingRef.current
        )
          return;

        const headings = Array.from(
          document.querySelectorAll<HTMLElement>('.section-heading[data-section-id]')
        );

        const scrollY = window.scrollY;
        const triggerPoint = scrollY + 160;

        let activeId = chapterData.sections[0].id;
        for (let i = headings.length - 1; i >= 0; i--) {
          const h = headings[i];
          const hTop = h.getBoundingClientRect().top + window.scrollY;
          if (hTop <= triggerPoint) {
            const secId = h.getAttribute('data-section-id');
            if (secId) {
              activeId = secId;
              break;
            }
          }
        }

        // Check exercises
        const exHeading = document.getElementById('exercises-heading');
        if (
          exHeading &&
          exHeading.getBoundingClientRect().top + window.scrollY <= triggerPoint
        ) {
          activeId = 'exercises';
        }

        setCurrentSectionId((prev) => {
          if (prev !== activeId) {
            window.history.replaceState(null, '', `#${activeId}`);
            setLastLocation({
              chapterId,
              sectionId: activeId,
              scrollOffset: window.scrollY,
            });
          }
          return activeId;
        });
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (throttleTimer) clearTimeout(throttleTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chapterData, chapterId, setLastLocation]);

  // 30s Dwell prompt
  useEffect(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
    }

    setShowStudyPrompt(false);
    if (!currentSectionId || currentSectionId === 'exercises' || currentSectionId === 'summary') {
      return;
    }

    const currentProg = store.progress[currentSectionId]?.status || 'empty';
    if (currentProg === 'empty') {
      dwellTimerRef.current = window.setTimeout(() => {
        setShowStudyPrompt(true);
      }, 30000);
    }

    return () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
    };
  }, [currentSectionId, store.progress]);

  // Global Event Delegation for Copy actions inside article
  useEffect(() => {
    const container = articleContainerRef.current;
    if (!container) return;

    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Copy Environment Anchor
      const anchorEl = target.closest<HTMLAnchorElement>('.env__anchor');
      if (anchorEl) {
        e.preventDefault();
        const href = anchorEl.getAttribute('href') || '';
        const envId = href.replace('#', '');
        const fullUrl = `${window.location.origin}${window.location.pathname}#${envId}`;
        try {
          await navigator.clipboard.writeText(fullUrl);
          showToast('已复制环境直达链接');
          logActivity({ type: 'copy', targetId: envId, detail: 'link' });
        } catch {
          showToast(`已定位链接：${fullUrl}`);
        }
        return;
      }

      // 2. Copy Formula LaTeX
      const copyBtn = target.closest<HTMLElement>('.equation__copy-btn');
      const eqContainer = target.closest<HTMLElement>('.equation');
      if (copyBtn || (eqContainer && (target.classList.contains('equation__number') || target.tagName === 'SPAN'))) {
        const eqEl = copyBtn ? copyBtn.closest<HTMLElement>('.equation') : eqContainer;
        if (eqEl) {
          const latex = eqEl.getAttribute('data-latex');
          if (latex) {
            try {
              await navigator.clipboard.writeText(latex);
              showToast('已复制公式 LaTeX 源码');
              logActivity({
                type: 'copy',
                targetId: eqEl.id || 'equation',
                detail: 'latex',
              });
            } catch {
              showToast('未能访问剪贴板');
            }
          }
        }
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [loading, chapterData, showToast, logActivity]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      if (e.key === '[') {
        e.preventDefault();
        navigateToPrevSection();
      } else if (e.key === ']') {
        e.preventDefault();
        navigateToNextSection();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setFocus(!store.settings.focus);
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      } else if (e.key === '/') {
        e.preventDefault();
        navigate('/search');
      } else if (e.key === '?') {
        e.preventDefault();
        setShortcutsModalOpen(true);
      } else if (e.key === 'Escape') {
        setStatusModalOpen(false);
        setSettingsModalOpen(false);
        setShortcutsModalOpen(false);
        setTocDrawerOpen(false);
        setRailDrawerOpen(false);
        if (store.settings.focus) {
          setFocus(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store.settings.focus, resolvedTheme, setFocus, setTheme, showToast]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 170;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
      setCurrentSectionId(id);
    }
  };

  const openSection = (id: string) => {
    if (!sectionLookup[id]) return;
    const targetChapter = book?.chapters.find((c) =>
      c.sections.some((s) => s.id === id)
    );
    if (targetChapter && targetChapter.id !== chapterId) {
      navigatingRef.current = true;
      navigate(learnPath(targetChapter.id, id));
      return;
    }
    scrollToId(id);
  };

  const navigateToPrevSection = () => {
    if (!chapterData) return;
    const idx = chapterData.sections.findIndex((s) => s.id === currentSectionId);
    if (idx > 0) {
      scrollToId(chapterData.sections[idx - 1].id);
    } else {
      showToast('已是本章第一节');
    }
  };

  const navigateToNextSection = () => {
    if (!chapterData) return;
    const idx = chapterData.sections.findIndex((s) => s.id === currentSectionId);
    if (idx >= 0 && idx < chapterData.sections.length - 1) {
      scrollToId(chapterData.sections[idx + 1].id);
    } else if (idx === chapterData.sections.length - 1) {
      scrollToId('exercises');
    } else {
      showToast('已到本章末尾');
    }
  };

  // Chapter progress calculation
  const chapterProgressPct = useMemo(() => {
    if (!chapterData || chapterData.sections.length === 0) return 0;
    let completed = 0;
    chapterData.sections.forEach((s) => {
      const st = store.progress[s.id]?.status;
      if (st === 'done' || st === 'master') completed++;
    });
    return Math.round((completed / chapterData.sections.length) * 100);
  }, [chapterData, store.progress]);

  // Current active section object
  const activeSection = useMemo(() => {
    if (!chapterData) return null;
    return chapterData.sections.find((s) => s.id === currentSectionId) || null;
  }, [chapterData, currentSectionId]);

  // Navigation: previous / next chapters
  const prevChapter = useMemo(() => {
    if (!book) return undefined;
    const idx = book.chapters.findIndex((c) => c.id === chapterId);
    return idx > 0 ? book.chapters[idx - 1] : undefined;
  }, [book, chapterId]);

  const nextChapter = useMemo(() => {
    if (!book) return undefined;
    const idx = book.chapters.findIndex((c) => c.id === chapterId);
    return idx >= 0 && idx < book.chapters.length - 1 ? book.chapters[idx + 1] : undefined;
  }, [book, chapterId]);

  if (loading) {
    return (
      <main className="shell" id="main-content" style={{ padding: '60px 32px' }}>
        <div className="kicker">QUANT MATH ACADEMY</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', margin: '16px 0' }}>
          正在加载章节正文...
        </h1>
        <p className="small muted">正在按需载入章节数据与切片...</p>
      </main>
    );
  }

  if (error || !chapterData || !book) {
    return (
      <main className="shell" id="main-content" style={{ padding: '60px 32px' }}>
        <ErrorState
          message={error || '加载章节失败'}
          onRetry={() => window.location.reload()}
          showReturnToSyllabus={true}
        />
      </main>
    );
  }

  const activeSectionTitle = activeSection
    ? `${activeSection.number} ${formatDisplayTitle(activeSection.title)}`
    : formatDisplayTitle(chapterData.title);

  return (
    <div className={`reader-wrapper ${store.settings.focus ? 'reader--focus' : ''}`}>
      {/* 1. Sticky Reader Subnav */}
      <ReaderSubnav
        chapterNumber={chapterData.number}
        chapterLabel={chapterData.label}
        chapterTitle={chapterData.title}
        progressPercentage={chapterProgressPct}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onToggleFocus={() => setFocus(!store.settings.focus)}
        isFocus={store.settings.focus}
        onToggleTocDrawer={() => setTocDrawerOpen(true)}
        onToggleRailDrawer={() => setRailDrawerOpen(true)}
        prevChapterId={prevChapter?.id}
        nextChapterId={nextChapter?.id}
      />

      {/* Target locating indicator */}
      {isLocatingTarget && (
        <div
          role="status"
          style={{
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--line)',
            padding: '6px 20px',
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--accent)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          正在定位目标内容...
        </div>
      )}

      {/* 2. Reader Three-column Grid */}
      <main className="reader" id="main-content">
        <div className="reader-grid">
          {/* Left Column: Full Book TOC */}
          <ReaderBookToc
            book={book}
            currentChapterId={chapterId}
            currentSectionId={currentSectionId}
            onSelectSection={(chapId, secId) => {
              if (chapId !== chapterId) {
                navigate(learnPath(chapId, secId));
              } else {
                scrollToId(secId);
              }
            }}
          />

          {/* Middle Column: Chapter Head & Sections */}
          <article className="article" ref={articleContainerRef}>
            {/* Chapter Header */}
            <header className="chapter-head">
              <div className="kicker">{chapterData.label}</div>
              <h1>{chapterData.title}</h1>
              {chapterData.introHtml && (
                <div
                  className="lede"
                  dangerouslySetInnerHTML={{ __html: chapterData.introHtml }}
                />
              )}
              <div className="meta">
                <span>{chapterData.sections.length} 节</span>
                <span>
                  {chapterData.stats.exercises ? `${chapterData.stats.exercises} 道习题` : '—'}
                </span>
                <span>
                  {book.parts.find((p) => p.chapterIds.includes(chapterId))?.title || '量化数学进阶'}
                </span>
                <button
                  type="button"
                  style={{
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                  }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      showToast('已复制本章链接');
                    } catch {
                      showToast('复制失败');
                    }
                  }}
                >
                  复制本章链接 ↗
                </button>
              </div>
            </header>

            {/* Dwell Prompt if reading > 30s without progress change */}
            {showStudyPrompt && (
              <div className="study-prompt" role="alert">
                <span>
                  你已在当前节阅读超过 30 秒，是否将其标记为「学习中」？
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      updateSectionProgress(currentSectionId, { status: 'learn' });
                      setShowStudyPrompt(false);
                      showToast('已更新状态为：学习中');
                    }}
                  >
                    标记为学习中
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStudyPrompt(false)}
                  >
                    暂不提示
                  </Button>
                </div>
              </div>
            )}

            {/* Render Each Section */}
            {chapterData.sections.map((section: SectionData) => {
              const htmlContent = loadedSections[section.id];
              const isSecLoading = loadingSections.has(section.id);
              const secError = sectionErrors[section.id];

              return (
                <section
                  key={section.id}
                  className="section-block"
                  id={section.id}
                  aria-labelledby={`heading-${section.id}`}
                >
                  <div
                    className="section-heading"
                    id={`heading-${section.id}`}
                    data-section-id={section.id}
                  >
                    <span className="num">{section.number}</span>
                    <h2>{formatDisplayTitle(section.title)}</h2>
                  </div>

                  {htmlContent ? (
                    <>
                      <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                      <ReaderNotes sectionId={section.id} />
                    </>
                  ) : isSecLoading ? (
                    <div
                      style={{
                        padding: '32px 0',
                        color: 'var(--ink-muted)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                      }}
                    >
                      正在加载本节内容...
                    </div>
                  ) : secError ? (
                    <div
                      style={{
                        padding: '20px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--accent)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <p style={{ margin: '0 0 10px', color: 'var(--accent)', fontSize: '13px' }}>
                        {secError}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => fetchSingleSection(chapterId, section.id)}
                      >
                        重试加载本节
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '24px 0',
                        color: 'var(--ink-muted)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                      }}
                    >
                      等待载入...
                    </div>
                  )}
                </section>
              );
            })}

            {/* Chapter Summary */}
            {chapterData.summaryHtml && (
              <section id="summary" style={{ marginTop: '64px' }}>
                <div className="section-heading">
                  <span className="kicker">小结</span>
                  <h2>本章小结</h2>
                </div>
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: chapterData.summaryHtml }}
                />
              </section>
            )}

            {/* Bottom Section Actions */}
            <div className="article-actions">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStatusModalOpen(true)}
              >
                学习状态设置 ▾
              </Button>
              <span className="status-note">
                当前节：{activeSection ? formatDisplayTitle(activeSection.title) : formatDisplayTitle(chapterData.title)}
              </span>
              <span className="spacer" />
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateToPrevSection}
              >
                上一节
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={navigateToNextSection}
              >
                下一节 →
              </Button>
            </div>

            {/* Chapter Exercises with lazy Sentinel */}
            <ReaderExercises
              chapterId={chapterId}
              exerciseCount={chapterData.exerciseCount || chapterData.stats.exercises}
            />

            {/* Chapter Navigation Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '64px',
                paddingTop: '28px',
                borderTop: '1px solid var(--line)',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {prevChapter ? (
                <Link to={learnPath(prevChapter.id)} className="btn btn--secondary">
                  ← 上一章：{prevChapter.label} {prevChapter.title}
                </Link>
              ) : (
                <div />
              )}

              {nextChapter ? (
                <Link to={learnPath(nextChapter.id)} className="btn btn--primary">
                  下一章：{nextChapter.label} {nextChapter.title} →
                </Link>
              ) : (
                <Link to={syllabusPath()} className="btn btn--primary">
                  完成全书阅读 · 返回教材目录
                </Link>
              )}
            </div>
          </article>

          {/* Right Column: Page TOC & Active Section Info */}
          <aside className="rail" aria-label="本节信息与大纲">
            <ReaderPageToc
              chapterData={chapterData}
              currentSectionId={currentSectionId}
              onScrollTo={scrollToId}
            />
            <ReaderSectionInfo
              section={activeSection}
              chapterTitle={chapterData.title}
              sectionLookup={sectionLookup}
              onOpenStatusModal={() => setStatusModalOpen(true)}
              onScrollToSection={scrollToId}
              onOpenSection={openSection}
            />
          </aside>
        </div>
      </main>

      {/* 3. Mobile Fixed Bottom Bar */}
      <div className="reader-bottom-bar" aria-label="移动端快速操作">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setStatusModalOpen(true)}
        >
          学习状态 ▾
        </Button>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="ghost" size="sm" onClick={navigateToPrevSection}>
            上一节
          </Button>
          <Button variant="primary" size="sm" onClick={navigateToNextSection}>
            下一节
          </Button>
        </div>
      </div>

      {/* 4. Left TOC Mobile Drawer */}
      {tocDrawerOpen && (
        <div
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="教材目录"
        >
          <div
            className="mobile-drawer__backdrop"
            onClick={() => setTocDrawerOpen(false)}
          />
          <div
            className="mobile-drawer__panel"
            style={{ width: '320px', maxWidth: '88vw', overflowY: 'auto' }}
          >
            <div className="mobile-drawer__head">
              <span className="brand__cn">教材全书目录</span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setTocDrawerOpen(false)}
                aria-label="关闭目录"
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '16px 0' }}>
              <ReaderBookToc
                book={book}
                currentChapterId={chapterId}
                currentSectionId={currentSectionId}
                onSelectSection={(chapId, secId) => {
                  setTocDrawerOpen(false);
                  if (chapId !== chapterId) {
                    navigate(learnPath(chapId, secId));
                  } else {
                    scrollToId(secId);
                  }
                }}
                onClose={() => setTocDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Right Rail Mobile Drawer */}
      {railDrawerOpen && (
        <div
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="本节信息与大纲"
        >
          <div
            className="mobile-drawer__backdrop"
            onClick={() => setRailDrawerOpen(false)}
          />
          <div
            className="mobile-drawer__panel"
            style={{ width: '320px', maxWidth: '88vw', overflowY: 'auto' }}
          >
            <div className="mobile-drawer__head">
              <span className="brand__cn">本节信息与大纲</span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setRailDrawerOpen(false)}
                aria-label="关闭"
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '16px 0' }}>
              <ReaderPageToc
                chapterData={chapterData}
                currentSectionId={currentSectionId}
                onScrollTo={(id) => {
                  setRailDrawerOpen(false);
                  scrollToId(id);
                }}
              />
              <ReaderSectionInfo
                section={activeSection}
                chapterTitle={chapterData.title}
                sectionLookup={sectionLookup}
                onOpenStatusModal={() => {
                  setRailDrawerOpen(false);
                  setStatusModalOpen(true);
                }}
                onScrollToSection={(id) => {
                  setRailDrawerOpen(false);
                  scrollToId(id);
                }}
                onOpenSection={(id) => {
                  setRailDrawerOpen(false);
                  openSection(id);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. Modals */}
      <ReaderStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        sectionId={currentSectionId}
        sectionTitle={activeSectionTitle}
      />

      <ReaderSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      <ReaderShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />
    </div>
  );
};
