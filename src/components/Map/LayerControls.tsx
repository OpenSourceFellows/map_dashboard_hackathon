import { useState, type JSX } from 'react';
import { Box, Checkbox, useTheme, useMediaQuery, Fab, Drawer, IconButton } from '@mui/material';
import { Menu, X } from 'lucide-react';
import type { LayerVisibilityMap } from '@/types/map';


/**
 * Props contract for the LayerControls component.
 * Defines the visibility state for each map layer and
 * the callback used to toggle layer visibility.
 */
interface LayerControlsProps {
  visibilityMap: LayerVisibilityMap;
  onLayerChange: (visibilityMap: LayerVisibilityMap) => void;
}


/* Renders a control panel for toggling map data layers on and off. 
 * Adaptive design: Drawer/FAB on mobile (< 600px), absolute Box on desktop.
 */
export function LayerControls({
  visibilityMap,
  onLayerChange,
}: LayerControlsProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuContent = (
    <>
      <h3 id="layer-controls-title" className="gen-header controls-header" style={{ marginBottom: '16px' }}>
        Map Data Layers
      </h3>

      <ul role="group" aria-label="Map Data Layers" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {Object.entries(visibilityMap).map(([layerName, isVisible]) => (
          <Box
            component="li"
            key={layerName}
            className="controls-item"
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 'var(--row-gutter)',
              borderRadius: 'var(--row-gutter)',
              marginBottom: 'var(--row-gutter)',
              minHeight: '44px', // Mobile accessibility standard
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: '100%', minHeight: '44px' }}>
              <Checkbox
                checked={isVisible}
                onChange={() =>
                  onLayerChange({ ...visibilityMap, [layerName]: !isVisible })
                }
                slotProps={{
                  input: {
                    'aria-label': layerName,
                    'aria-checked': isVisible,
                  },
                }}
              />
              <span>{layerName}</span>
            </label>
          </Box>
        ))}
      </ul>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Fab
          color="primary"
          aria-label="layers"
          onClick={toggleDrawer(true)}
          sx={{
            position: 'absolute',
            bottom: 'var(--col-1)',
            right: 'var(--col-1)',
            zIndex: 1000,
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          }}
        >
          <Menu />
        </Fab>
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            className: 'gen-components',
            sx: {
              borderTopLeftRadius: 'var(--border-radius)',
              borderTopRightRadius: 'var(--border-radius)',
              padding: 'var(--col-1)',
              background: 'linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)',
              backgroundImage: 'none', // Remove MUI default overlay
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none',
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton 
              onClick={toggleDrawer(false)} 
              aria-label="close drawer"
              sx={{ minWidth: '44px', minHeight: '44px' }}
            >
              <X size={20} />
            </IconButton>
          </Box>
          {menuContent}
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component="section"
      className="gen-components controls-wrapper"
      aria-labelledby="layer-controls-title"
      role="region"
      sx={{
        position: 'absolute',
        top: 'var(--col-1)',
        right: 'var(--col-1)',
        minWidth: 'var(--width-controls)',
        padding: 'var(--col-1)',
        zIndex: 1000,
      }}
    >
      {menuContent}
    </Box>
  );
}
