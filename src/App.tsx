import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import '@/styles/globals.css';
import '@/styles/map.css';

// Lazy-load page components for code splitting
const MapPage = lazy(() => import('@/pages/MapPage').then(m => ({ default: m.MapPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));
const WorkflowPage = lazy(() => import('@/pages/WorkflowPage').then(m => ({ default: m.WorkflowPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * Main application component that handles routing and layout
 * Provides the foundational navigation structure for the application
 * with routes for Map View, Admin Dashboard, and Workflow pages.
 * @component
 * @returns {JSX.Element} The complete application layout with routing
 */
function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Suspense fallback={<div className="page-placeholder"><div className="page-placeholder__icon">⏳</div><p>Loading...</p></div>}>
          <Routes>
            {/* Primary map view — renders map + layer controls */}
            <Route path="/map" element={<MapPage />} />

            {/* Admin dashboard — placeholder for future admin functionality */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Workflow management — placeholder for future workflow tools */}
            <Route path="/workflow" element={<WorkflowPage />} />

            {/* Root redirect to map */}
            <Route path="/" element={<Navigate to="/map" replace />} />

            {/* 404 fallback for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
