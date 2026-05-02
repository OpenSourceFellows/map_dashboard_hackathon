import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, Moon, Sun, Map, Settings, Workflow } from 'lucide-react';
import '@/styles/pages.css';

/**
 * Header component with the application logo, navigation links, and dark mode toggle
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding, navigation, and dark mode toggle
 */
export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
          <button
            className={`dark-mode-toggle ${isDarkMode ? 'dark-mode-toggle--active' : ''}`}
            onClick={toggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <div className="dark-mode-toggle__slider">
              <div className="dark-mode-toggle__icon">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
