import React, { useState, useMemo, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { createTheme, ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import '@/styles/reset.css';
import '@/styles/palette-layouts.css';


/* Create a context for color mode. */
interface ColorModeContextType {
  toggleMode: () => void;
  mode: 'light' | 'dark';
}


/* Defines default context shape for components NOT wrapped in <ColorModeContext.Provider>. */
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleMode: () => {},
  mode: 'light', // light mode default
});


/* Returns the active CSS variable value for <html> tag with a default fallback value. */
function getCSSVariableOrFallback(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}


/* Main component to wrap App. */
function Main() {


  /* 
   * Initializes state from localStorage and sets <html data-theme=""> immediately
   * mode: the active light/dark state applied (defaults to 'light' if nothing is saved)
   * setMode: React updater function used by toggleMode to switch themes dynamically
   */
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const storedPalette = localStorage.getItem('themePalette');
    const activePalette = storedPalette === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', activePalette);
    return activePalette;
  });


  /*
   * Computes next light/dark theme to save to React state.
   * Updates <html data-theme=""> and localStorage.
   */
  const toggleMode = () => {
    setMode((currentPalette) => {
      const nextPalette = currentPalette === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextPalette);
      localStorage.setItem('themePalette', nextPalette);
      return nextPalette;
    });
  };


  /* Memoized context shape for components wrapped in <ColorModeContext.Provider>. */
  const memoizedPalette = useMemo(
    () => ({ toggleMode, mode }), // computed value function
    [mode]                        // dependency array
  );


  /*
   * Memoized Material UI theme configuration object.
   * This is NOT a Provider — it is a plain theme object
   * derived from active CSS variables and the current mode.
   * It is later passed into <ThemeProvider>.
   */
  const theme = useMemo(
    () => {
      const primary = getCSSVariableOrFallback('--color-primary', '#667eea');
      const secondary = getCSSVariableOrFallback('--color-secondary', '#764ba2');
      const bgDefault = getCSSVariableOrFallback('--color-bg-default', '#f9f9f9');
      const bgPaper = getCSSVariableOrFallback('--color-bg-paper', 'transparent');
      const textPrimary = getCSSVariableOrFallback('--color-text-primary', '#2c3e50');
      const textSecondary = getCSSVariableOrFallback('--color-text-secondary', '#5a6c7d');

      return createTheme({
        palette: {
          mode,
          primary: { main: primary },
          secondary: { main: secondary },
          background: { default: bgDefault, paper: bgPaper },
          text: { primary: textPrimary, secondary: textSecondary },
        },
      });
    }, 
    [mode])
  ;


  /* Wrap App in context + ThemeProvider */
  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={memoizedPalette}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              body: {
                background:
                  theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                    : `linear-gradient(135deg, var(--body-bg-default) 0%, var(--body-bg-default) 100%)`,
                color: theme.palette.text.primary,
                transition: 'var(--app-transition)',
              },
            })}
          />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}


ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);

