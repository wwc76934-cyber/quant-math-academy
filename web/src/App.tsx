import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppFooter } from './components/layout/AppFooter';
import { AppHeader } from './components/layout/AppHeader';
import { SkipLink } from './components/layout/SkipLink';
import { StoreProvider, useStore } from './features/store/store';
import { FeaturePlaceholder } from './routes/FeaturePlaceholder';
import { GraphPage } from './routes/GraphPage';
import { HomePage } from './routes/HomePage';
import { NotFoundPage } from './routes/NotFoundPage';
import { PathDetailPage } from './routes/PathDetailPage';
import { PathsPage } from './routes/PathsPage';
import { ReaderPage } from './routes/ReaderPage';
import { SearchPage } from './routes/SearchPage';
import { SyllabusPage } from './routes/SyllabusPage';
import { ToastProvider } from './components/reader/Toast';

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

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isReader = location.pathname.startsWith('/learn');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SkipLink />
      <StorageAlerts />
      <AppHeader />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/learn/:chapterId" element={<ReaderPage />} />
          <Route path="/paths" element={<PathsPage />} />
          <Route path="/paths/:mode" element={<PathDetailPage />} />
          <Route
            path="/practice"
            element={
              <FeaturePlaceholder
                featureName="练习与题解"
                phase="Phase 3"
                description="全书 698 道精选练习题、分步解答与错题本即将在 Phase 3 开放。"
              />
            }
          />
          <Route
            path="/practice/:chapterId"
            element={
              <FeaturePlaceholder
                featureName="章节练习"
                phase="Phase 3"
                description="本章练习题与解答即将在 Phase 3 开放。"
              />
            }
          />
          <Route
            path="/progress"
            element={
              <FeaturePlaceholder
                featureName="学习进度与数据管理"
                phase="Phase 3"
                description="全书学习统计、知识点掌握度矩阵与本地 JSON 数据导入/导出即将在 Phase 3 开放。"
              />
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
