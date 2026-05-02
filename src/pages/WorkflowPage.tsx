import React from 'react';
import '@/styles/pages.css';

/**
 * Workflow page placeholder
 * This page will be expanded with workflow management functionality
 * such as task tracking and process automation in future iterations.
 * @component
 * @returns {JSX.Element} The workflow page placeholder
 */
export const WorkflowPage: React.FC = () => {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__icon">⚡</div>
      <h1 className="page-placeholder__title">Workflow</h1>
      <p className="page-placeholder__description">
        Workflow management and task tracking will appear here.
      </p>
      <div className="page-placeholder__badge">Coming Soon</div>
    </div>
  );
};
