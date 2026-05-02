import { useEffect, useState, type JSX } from 'react';
import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { LayerControls } from '@/components/Map/LayerControls';
import { Box } from '@mui/material';
import { GlobalStyles, useTheme } from '@mui/material';
import '@/styles/reset.css';
import '@/styles/palette-layouts.css';
import '@/styles/components.css';
import { FixtureReader } from './data/fixture-reader';
import type { LayerVisibilityMap } from './types/map';
import type { FeatureCollection } from './types/geometry';
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import '@/styles/globals.css';
import '@/styles/map.css';

// Lazy-load page components for code splitting
const MapPage = lazy(() => import('@/pages/MapPage').then(m => ({ default: m.MapPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));
const WorkflowPage = lazy(() => import('@/pages/WorkflowPage').then(m => ({ default: m.WorkflowPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));


/**
 * Main application component that composes the entire UI.
 * Manages the map state and renders the map with its controls.
 * Map uses GeoJSON (docs) => https://geojson.readthedocs.io/en/latest/
 * @component
 * @returns {JSX.Element} The complete application layout with header and map interface.
 */
function App(): JSX.Element {

  /*
   * layers: an array of map feature collections (initially empty)
   * - FeatureCollection items contain geo-spatial types (points, lines, polygons) with coordinates
   * setLayers: function to update the layers array, based on previous state
   */
  const [layers, setLayers] = useState<FeatureCollection[]>([])


  /*
   * layerVisibility: an object mapping each layer name to a boolean indicating whether it is visible on the map
   * - Keys are layer names (strings)
   * - Values are booleans (true = visible, false = hidden)
   * setLayerVisibility: function to update the visibility map, based on previous state
   */
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityMap>({})


  /* Access the current MUI theme (light/dark mode) */
  const theme = useTheme();


  /* Load map feature collections once on component mount */
  useEffect(() => {
    
    async function loadCollections() {
      
      /* Fetch feature collections and save layers to state */
      const collections: FeatureCollection[] = await FixtureReader.collections();
      const allLayers = [... collections];
      setLayers(allLayers);

      /* Extract layer names */
      const layerNames = allLayers.map((layer) => layer.name);

      /* Build initial visibility map */
      const initialVisibility: LayerVisibilityMap = layerNames.reduce(
        (map, name) => {
          map[name] = true;
          return map;
        },
        {} as LayerVisibilityMap
      );

      /* Save visibility map to state */
      setLayerVisibility(initialVisibility);
    }

    loadCollections();
    }, 
    [] // dependency array
  )

  /* Logic to only render layers with visibility of `true` */
  const layersToRender = layers.filter((layer) => layerVisibility[layer.name])

  return (
    <>
      <GlobalStyles
        styles={{
          '.app-wrapper': {
            background: theme.palette.background.paper,
            boxShadow: 'var(--box-shadow)',
          },
        }}
      />

      <Box 
        className="app-wrapper flex-column"
        sx={{
          height: 'calc(100vh - calc(var(--col-gutter) * 2))',
        }}
      >
        <Header />
        <Box
          component="main" 
          className="main-wrapper"
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <MapContainer layers={layersToRender} />
          {/*<MapLegend />*/}
          <Suspense fallback={<div className="page-placeholder"><div className="page-placeholder__icon">⏳</div><p>Loading...</p></div>}>
            <Routes>
                {/* Primary map view — renders map + layer controls */}
                <Route path="/map" element={<MapPage />} />

                {/* Admin dashboard — placeholder for future admin functionality */}
                <Route path="/admin" element={<AdminPage />} />

                {/* Workflow management — placeholder for future workflow tools */}
                <Route path="/workflow" element={<WorkflowPage />} />

                {/* Root redirect to map */}
                <Route path="/" element={<Navigate to="/map" replace />} />

                {/* 404 fallback for unknown routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <LayerControls
            visibilityMap={layerVisibility}
            onLayerChange={setLayerVisibility}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
