import { JSX, useContext, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
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

const COLLAPSED_WIDTH = 86;
const EXPANDED_WIDTH = 220;

export default function SideNav(): JSX.Element {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const isDarkMode = mode === 'dark';

  const [expanded, setExpanded] = useState(false);

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
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        height: '100vh',
        backgroundColor: '#fff',
        borderRight: '2px solid #E8E8E8',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        transition: 'width .25s ease',
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: expanded ? 2 : 0,
          justifyContent: expanded ? 'flex-start' : 'center',
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg,#6B73FF,#8A63F6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <Globe size={22} />
        </Box>

        {expanded && (
          <Typography
            sx={{
              ml: 2,
              fontWeight: 700,
              fontSize: 18,
              color: '#334155',
              whiteSpace: 'nowrap',
            }}
          >
            ProgramEarth
          </Typography>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  mx: 1,
                  mb: 1,
                  height: 54,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  px: expanded ? 2 : 0,
                  justifyContent: expanded ? 'flex-start' : 'center',
                  color: isActive ? '#2563EB' : '#64748B',
                  backgroundColor: isActive
                    ? '#EEF4FF'
                    : 'transparent',
                  transition: '.2s',
                  cursor: 'pointer',

                  '&:hover': {
                    backgroundColor: '#F5F8FF',
                    color: '#2563EB',
                  },
                }}
              >
                {item.icon}

                {expanded && (
                  <Typography
                    sx={{
                      ml: 2,
                      fontWeight: isActive ? 600 : 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography>
                )}
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      {/* Theme Toggle */}
      <Box
        onClick={toggleMode}
        sx={{
          mx: 1,
          mb: 1,
          height: 54,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: expanded ? 'flex-start' : 'center',
          px: expanded ? 2 : 0,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor: '#F5F8FF',
          },
        }}
      >
        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}

        {expanded && (
          <Typography sx={{ ml: 2 }}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        )}
      </Box>

      {/* Profile */}
      <NavLink
        to="/account"
        style={{ textDecoration: 'none' }}
      >
        {({ isActive }) => (
          <Box
            sx={{
              mx: 1,
              height: 54,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: expanded ? 'flex-start' : 'center',
              px: expanded ? 2 : 0,
              color: '#2563EB',
              backgroundColor: isActive
                ? '#82B1FF80'
                : '#EEF4FF',

              '&:hover': {
                backgroundColor: '#DDEBFF',
              },
            }}
          >
            <User size={22} />

            {expanded && (
              <Typography sx={{ ml: 2 }}>
                Account
              </Typography>
            )}
          </Box>
        )}
      </NavLink>
    </Box>
  );
}
