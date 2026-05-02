import React from 'react';
import Box from '@mui/material/Box';
import { ProjectTitle } from './ProjectTitle';
import { ProjectInfo } from './ProjectInfo';
import type { ProjectData } from '@/types/project';

/**
 * Props for the ProjectDetailView component
 */
interface ProjectDetailViewProps {
  project: ProjectData;
  onClose: () => void;
}

/**
 * Container component that orchestrates the project detail panels.
 * Rendered below the map when a marker is clicked. Combines
 * ProjectTitle (header bar) and ProjectInfo (left/right data panels).
 *
 * @component
 */
export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onClose }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #E8E8E8',
        animation: 'slideUp 0.3s ease-out',
        '@keyframes slideUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
      data-testid="project-detail-view"
    >
      <ProjectTitle
        title={project.title}
        onClose={onClose}
        onSave={() => console.log(`Bookmarked: ${project.title}`)}
      />
      <ProjectInfo project={project} />
    </Box>
  );
};
