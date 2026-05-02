import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/pages.css';

/**
 * 404 Not Found page
 * Displayed when a user navigates to a route that doesn't exist.
 * Provides a link back to the map view.
 * @component
 * @returns {JSX.Element} The 404 page with navigation back to map
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__icon">🗺️</div>
      <h1 className="page-placeholder__title">Page Not Found</h1>
      <p className="page-placeholder__description">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/map" className="page-placeholder__link">
        ← Back to Map
      </Link>
    </div>
  );
};
