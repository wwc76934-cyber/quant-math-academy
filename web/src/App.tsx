import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppFooter } from './components/layout/AppFooter';
import { AppHeader } from './components/layout/AppHeader';
import { SkipLink } from './components/layout/SkipLink';
import { StoreProvider, useStore } from './features/store/store';
import { ToastProvider } from './components/reader/Toast';

// Eager routes for fast initial landing and syllabus overview
import { HomePage } from './routes/HomePage';
import { SyllabusPage } from './routes/SyllabusPage';
import { NotFoundPage } from './routes/NotFoundPage';

// Lazy loaded routes for heavy features
const ReaderPage = React.lazy(() => import('./routes/ReaderPage').then((m) => ({ default: m.ReaderPage })));
const SearchPage = React.lazy(() => import('./routes/SearchPage').then((m) => ({ default: m.SearchPage })));
const GraphPage = React.lazy(() => import('./routes/GraphPage').then((m) => ({ default: m.GraphPage })));
const PathsPage = React.lazy(() => import('./routes/PathsPage').then((m) => ({ default: m.PathsPage })));
const PathDetailPage = React.lazy(() => import('./routes/PathDetailPage').then((m) => ({ default: m.PathDetailPage })));
const PracticePage = React.lazy(() => import('./routes/PracticePage').then((m) => ({ default: m.PracticePage })));
const PracticeSessionPage = React.lazy(() =>
  import('./routes/PracticeSessionPage').then((m) => ({ default: m.PracticeSessionPage }))
);
const WrongBookPage = React.lazy(() => import('./routes/WrongBookPage').then((m) => ({ default: m.WrongBookPage })));
const ProgressPage = React.lazy(() => import('./routes/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const NotesPage = React.lazy(() => import('./routes/NotesPage').then((m) => ({ default: m.NotesPage })));
const BookmarksPage = React.lazy(() =>
  import('./routes/BookmarksPage').then((m) => ({ default: m.BookmarksPage }))
);

const StorageAlerts: React.FC = () => {
  const { storageAvailable, storageCorrupted, clearCorruptedNotice } = useStore();

  if (!storageAvailable) {
    return (
      <div
        role="alert"
        style={{
          background: 'var(--accent)',
          color: '#ffffff',
          padding: '8px 20px',
          textAlign: 'center',
          fontSize: '12px',
          fontFamily: 'var(--font-sans)',
        }}
      >
        注意：浏览器本地存储不可用（可能处于无痕/隐私模式），当前阅读记录仅在当前会话中有效。
      </div>
    );
  }

  if (storageCorrupted) {
    return (
      <div
        role="alert"
        style={{
          background: 'var(--warning)',
          color: '#ffffff',
          padding: '8px 20px',
          textAlign: 'center',
          fontSize: '12px',
          fontFamily: 'var(--font-sans)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span>提示：检测到本地存储数据异常，已重置为默认值并备份旧记录。</span>
        <button
          type="button"
          onClick={clearCorruptedNotice}
          style={{
            textDecoration: 'underline',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          关闭提示
        </button>
      </div>
    );
  }

  return null;
};

const AcademicPageLoading: React.FC = () => (
  <main
    className="shell"
    role="status"
    aria-label="页面载入中"
    style={{
      padding: '48px 24px',
      maxWidth: '960px',
      margin: '0 auto',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink-secondary)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '16px',
          height: '16px',
          border: '2px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: '14px', letterSpacing: '0.02em' }}>正在载入页面...</span>
    </div>
  </main>
);

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isReader = location.pathname.startsWith('/learn');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SkipLink />
      <StorageAlerts />
      <AppHeader />
      <div style={{ flex: 1 }}>
        <Suspense fallback={<AcademicPageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/learn/:chapterId" element={<ReaderPage />} />
            <Route path="/paths" element={<PathsPage />} />
            <Route path="/paths/:mode" element={<PathDetailPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/wrong" element={<WrongBookPage />} />
            <Route path="/practice/:chapterId" element={<PracticeSessionPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      {!isReader && <AppFooter />}
    </div>
  );
};

export const App: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <StoreProvider>
      <ToastProvider>
        <BrowserRouter basename={baseUrl}>
          <MainLayout />
        </BrowserRouter>
      </ToastProvider>
    </StoreProvider>
  );
};

export default App;
