import React from 'react';
import '@/styles/pages.css';

/**
 * Admin Dashboard placeholder page
 * This page will be expanded with admin functionality
 * such as user management and data oversight in future iterations.
 * @component
 * @returns {JSX.Element} The admin dashboard placeholder
 */
export const AdminPage: React.FC = () => {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__icon">🛠️</div>
      <h1 className="page-placeholder__title">Admin Dashboard</h1>
      <p className="page-placeholder__description">
        Administrative tools and user management will appear here.
      </p>
      <div className="page-placeholder__badge">Coming Soon</div>
    </div>
  );
};
