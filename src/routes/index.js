import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Lazy load the components
const HomePage = lazy(() => import('./home/HomePage'));
const CategoryPage = lazy(() => import('./category/CategoryPage'));
const NotFoundPage = lazy(() => import('./page-not-found/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Router>
      {/* Suspense component will show fallback until the lazy-loaded components are ready */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />

          {/* Dynamic route for any categories */}
          <Route path="/home/:category" element={<CategoryPage />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;