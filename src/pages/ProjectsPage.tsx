import React from 'react';
import '@/styles/pages.css';

/**
 * Workflow page placeholder
 * This page will be expanded with workflow management functionality
 * such as task tracking and process automation in future iterations.
 * @component
 * @returns {JSX.Element} The workflow page placeholder
 */
export const ProjectsPage: React.FC = () => {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__icon">⚡</div>
      <h1 className="page-placeholder__title">Projects</h1>
      <p className="page-placeholder__description">
        Projects will appear here.
      </p>
      <div className="page-placeholder__badge">Coming Soon</div>
    </div>
  );
};
