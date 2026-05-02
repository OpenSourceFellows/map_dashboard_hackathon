import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

/**
 * Props for the ProjectTitle component
 * @interface ProjectTitleProps
 * @property {string} title - The project title to display (from selected map marker)
 * @property {() => void} [onSave] - Optional callback when the bookmark/save icon is clicked
 */
interface ProjectTitleProps {
  title: string;
  onSave?: () => void;
}

/**
 * Reusable ProjectTitle component that appears when a user clicks on a map marker
 * and the project detail view is activated. Displays the project title dynamically
 * based on the clicked marker label, with a bookmark/save icon.
 *
 * Layout matches Figma design specs:
 * - Width: 100% (max 1188px)
 * - Height: 73px
 * - Gap: 12px
 * - Padding: 20px top/bottom, 24px left/right
 * - Border-bottom: 2px solid #E8E8E8
 * - Background: #FFFFFF
 * - Display: Flex (row, space-between)
 *
 * @component
 * @param {ProjectTitleProps} props - Component props
 * @returns {JSX.Element | null} The project title header bar, or null if no title
 */
export const ProjectTitle: React.FC<ProjectTitleProps> = ({ title, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  // Component should render only when a project is selected
  if (!title) {
    return null;
  }

  const handleBookmarkClick = () => {
    setIsSaved((prev) => !prev);
    onSave?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
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
        }}
      >
        {title}
      </Typography>

      <IconButton
        onClick={handleBookmarkClick}
        aria-label={isSaved ? 'Remove bookmark' : 'Bookmark project'}
        sx={{
          color: isSaved ? '#667eea' : '#94a3b8',
          transition: 'color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            color: '#667eea',
            transform: 'scale(1.1)',
          },
        }}
      >
        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Box>
  );
};
