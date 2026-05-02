import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Props for the ProjectTitle component
 */
interface ProjectTitleProps {
  title: string;
  onSave?: () => void;
  onClose?: () => void;
}

/**
 * Reusable ProjectTitle component — header bar for the project detail view.
 * Displays the project title with bookmark/save and close icons.
 *
 * Figma specs: max-width 1188px, height 73px, gap 12px,
 * padding 20px/24px, border-bottom 2px solid #E8E8E8, bg #FFFFFF
 *
 * @component
 */
export const ProjectTitle: React.FC<ProjectTitleProps> = ({ title, onSave, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);

  if (!title) return null;

  const handleBookmarkClick = () => {
    setIsSaved((prev) => !prev);
    onSave?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1188px',
        height: '73px',
        gap: '12px',
        padding: '20px 24px',
        borderBottom: '2px solid #E8E8E8',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
      }}
      data-testid="project-title"
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 600,
          fontSize: '18px',
          color: '#2c3e50',
          lineHeight: 1.4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <IconButton
          onClick={handleBookmarkClick}
          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark project'}
          sx={{
            color: isSaved ? '#667eea' : '#94a3b8',
            transition: 'color 0.2s ease, transform 0.2s ease',
            '&:hover': { color: '#667eea', transform: 'scale(1.1)' },
          }}
        >
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>

        <IconButton
          onClick={onClose}
          aria-label="Close project detail"
          sx={{
            color: '#94a3b8',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#e74c3c' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
