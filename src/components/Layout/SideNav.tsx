import { JSX, useContext } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  Globe,
  FolderKanban,
  Map,
  Settings,
  User,
  Moon,
  Sun,
} from 'lucide-react';

import { ColorModeContext } from '@/main';

const DRAWER_WIDTH = 86;

export default function SideNav(): JSX.Element {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const isDarkMode = mode === 'dark';

  const navItems = [
    {
      icon: <FolderKanban size={22} />,
      path: '/',
      label: 'Projects',
    },
    {
      icon: <Map size={22} />,
      path: '/map',
      label: 'Map',
    },
    {
      icon: <Settings size={22} />,
      path: '/admin',
      label: 'Admin',
    },
  ];

  return (
    <Box
      component="aside"
      sx={{
        width: DRAWER_WIDTH,
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '2px solid #E8E8E8',
        boxShadow: '0px 20px 50px rgba(220,224,249,.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg,#6B73FF 0%, #8A63F6 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          mb: 4,
        }}
      >
        <Globe size={22} />
      </Box>

      {/* Menu */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          flex: 1,
        }}
      >
        {navItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.path}>
            <NavLink
              to={item.path}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <IconButton
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: '15px',
                    color: isActive
                      ? '#3B82F6'
                      : 'text.secondary',
                    bgcolor: isActive
                      ? '#EEF4FF'
                      : 'transparent',
                    transition: '0.2s',
                    '&:hover': {
                      bgcolor: '#EEF4FF',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </Box>

      {/* Dark Mode */}
      <Tooltip
        title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        placement="right"
      >
        <IconButton
          onClick={toggleMode}
          sx={{
            width: 54,
            height: 54,
            borderRadius: '15px',
            mb: 2,
          }}
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </IconButton>
      </Tooltip>

      {/* Profile */}
      <Tooltip title="Account Settings" placement="right">
        <NavLink
          to="/account"
          style={{ textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <IconButton
              sx={{
                width: 54,
                height: 54,
                borderRadius: '15px',
                bgcolor: isActive
                  ? '#82B1FF80'
                  : '#82B1FF40',
                color: '#1E40AF',
                '&:hover': {
                  bgcolor: '#82B1FF80',
                },
              }}
            >
              <User size={24} />
            </IconButton>
          )}
        </NavLink>
      </Tooltip>
    </Box>
  );
}
