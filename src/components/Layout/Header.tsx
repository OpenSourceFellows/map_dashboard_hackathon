import { type JSX, useContext } from 'react'
import { Box, Typography, IconButton } from '@mui/material';
import { ColorModeContext } from '@/main';


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Moon, Sun, Map, Settings, Workflow } from 'lucide-react';
import '@/styles/pages.css';

/**
 * Header component with the application logo, navigation links, and dark mode toggle
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding, navigation, and dark mode toggle
 */
export function Header(): JSX.Element {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const isDarkMode = mode === 'dark';


  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">
          <Globe size={18} />
        </div>
        <span>ProgramEarth</span>
      </div>

      {/* Navigation links */}
      <nav className="header-nav">
        <NavLink
          to="/map"
          className={({ isActive }) =>
            `header-nav__link ${isActive ? 'header-nav__link--active' : ''}`
          }
        >
          <Map size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Map
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `header-nav__link ${isActive ? 'header-nav__link--active' : ''}`
          }
        >
          <Settings size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Admin
        </NavLink>
        <NavLink
          to="/workflow"
          className={({ isActive }) =>
            `header-nav__link ${isActive ? 'header-nav__link--active' : ''}`
          }
        >
          <Workflow size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Workflow
        </NavLink>
      </nav>
      
      <div className="header-controls">
        <div className="dark-mode-container">
          <span className="dark-mode-label">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
          <IconButton
            id="theme-toggle"
            className={`dark-mode-toggle ${isDarkMode ? 'dark-mode-toggle--active' : ''}`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            role="switch"
            aria-checked={isDarkMode}
            disableRipple
            sx={{
              position: 'relative',
            }}
          >
            <Box
              className="toggle__slider"
              sx={{
                top: '2px',
                left: '2px',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box className="toggle__icon">
                <Moon size={18} />
              </Box>
            </Box>
          </IconButton>
        </div>
      </div>
    </header>
  );
}

