import { useEffect, useState } from 'react';
import { MapContainer } from '@/components/Map/MapContainer';
import { LayerControls } from '@/components/Map/LayerControls';
import { FixtureReader } from '@/data/fixture-reader';
import type { LayerVisibilityMap } from '@/types/map';
import type { FeatureCollection } from '@/types/geometry';

/**
 * Map Page - renders the interactive map with layer controls
 * This is the primary view of the application, displaying
 * geospatial data via Leaflet and allowing users to toggle layers.
 * @component
 * @returns {JSX.Element} The map view with layer controls
 */
export const MapPage = () => {
  const [layers, setLayers] = useState<FeatureCollection[]>([]);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityMap>({});

  useEffect(() => {
    FixtureReader.collections()
      .then(collections => {
        setLayers([...collections]);

        // Take the name property of each collection and set it's initial visibility to true
        const layerNames = collections.map((fc) => fc.name);
        const visibilityMap = layerNames.reduce((map, name) => { map[name] = true; return map; }, {} as LayerVisibilityMap);
        setLayerVisibility({ ...visibilityMap });
      });
  }, []);

  const layersToRender = layers.filter((fc) => layerVisibility[fc.name]);

  return (
    <>
      <MapContainer layers={layersToRender} />
      {/*<MapLegend />*/}
      <LayerControls
        visibilityMap={layerVisibility}
        onLayerChange={setLayerVisibility}
      />
    </>
  );
};
