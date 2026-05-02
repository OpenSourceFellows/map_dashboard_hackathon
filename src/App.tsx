import { useEffect, useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { LayerControls } from '@/components/Map/LayerControls';
import { ProjectDetailView } from '@/components/Project/ProjectDetailView';
import '@/styles/globals.css';
import '@/styles/map.css';
import { FixtureReader } from './data/fixture-reader';
import { getProjectData } from './types/project';
import type { LayerVisibilityMap } from './types/map';
import type { FeatureCollection } from './types/geometry';
import type { ProjectData } from './types/project';

/**
 * Main application component that composes the entire UI
 * Manages the map state, layer visibility, and project detail view
 * @component
 * @returns {JSX.Element} The complete application layout
 */
function App() {
  const [layers, setLayers] = useState<FeatureCollection[]>([])
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityMap>({})
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  useEffect(() => {
    FixtureReader.collections()
      .then(collections => {
        setLayers([...collections])

        // Take the name property of each collection and set it's initial visibility to true
        const layerNames = collections.map((fc) => fc.name )
        const visibilityMap = layerNames.reduce((map, name) => { map[name] = true; return map }, {} as LayerVisibilityMap)
        setLayerVisibility({...visibilityMap})
      },)
  }, [])

  const layersToRender = layers.filter((fc) => layerVisibility[fc.name])

  /**
   * Handle map marker/feature click — opens the project detail view
   */
  const handleFeatureClick = (featureName: string) => {
    const projectData = getProjectData(featureName);
    setSelectedProject(projectData);
  };

  /**
   * Close the project detail view and restore full map
   */
  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="app-container">
      <Header />
      <main className={`main-content ${selectedProject ? 'main-content--detail-open' : ''}`}>
        <MapContainer
          layers={layersToRender}
          onFeatureClick={handleFeatureClick}
        />
        {/*<MapLegend />*/}
        <LayerControls
          visibilityMap={layerVisibility}
          onLayerChange={setLayerVisibility}
        />
      </main>
      {selectedProject && (
        <ProjectDetailView
          project={selectedProject}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
