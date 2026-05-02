import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import type { ProjectData } from '@/types/project';

/**
 * Props for the ProjectInfo component
 */
interface ProjectInfoProps {
  project: ProjectData;
}

/**
 * Status color mapping
 */
const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  Active: 'success',
  Planning: 'warning',
  Completed: 'info',
  'On Hold': 'default',
};

/**
 * A single metadata row with icon, label, and value
 */
const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', py: '8px' }}>
    <Box sx={{ color: '#667eea', display: 'flex', alignItems: 'center', minWidth: '24px' }}>
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 500, fontSize: '14px' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Typography>
    </Box>
  </Box>
);

/**
 * ProjectInfo component with two-column layout (left filters + right metadata).
 * Displays structured project data below the ProjectTitle.
 *
 * Left panel (300px): filter/layer info (watershed, acreage, project type)
 * Right panel (remaining): project metadata (status, partner, location, dates, funding)
 *
 * @component
 */
export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: '1188px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E8E8E8',
        boxSizing: 'border-box',
      }}
      data-testid="project-info"
    >
      {/* Left Panel — Filters / Layer Info */}
      <Box
        sx={{
          width: '300px',
          minWidth: '300px',
          borderRight: '1px solid #E8E8E8',
          padding: '20px 24px',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: '#64748b', fontWeight: 600, fontSize: '13px', mb: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          Project Filters
        </Typography>

        <InfoRow icon={<WaterDropIcon fontSize="small" />} label="Watershed" value={project.watershed} />
        <Divider sx={{ my: '4px' }} />
        <InfoRow icon={<LandscapeIcon fontSize="small" />} label="Acreage" value={`${project.acreage.toLocaleString()} acres`} />
        <Divider sx={{ my: '4px' }} />
        <InfoRow icon={<CategoryIcon fontSize="small" />} label="Project Type" value={project.projectType} />
      </Box>

      {/* Right Panel — Project Metadata */}
      <Box
        sx={{
          flex: 1,
          padding: '20px 24px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '16px' }}>
          <Typography
            variant="subtitle2"
            sx={{ color: '#64748b', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            Project Details
          </Typography>
          <Chip
            label={project.status}
            color={statusColors[project.status] ?? 'default'}
            size="small"
            sx={{ fontWeight: 600, fontSize: '12px' }}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
          <InfoRow icon={<GroupIcon fontSize="small" />} label="Partner" value={project.partner} />
          <InfoRow icon={<LocationOnIcon fontSize="small" />} label="Location" value={project.location} />
          <InfoRow icon={<CalendarMonthIcon fontSize="small" />} label="Start Date" value={project.startDate} />
          <InfoRow icon={<AccountBalanceIcon fontSize="small" />} label="Funding Source" value={project.fundingSource} />
        </Box>
      </Box>
    </Box>
  );
};
