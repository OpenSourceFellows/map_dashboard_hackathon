import React from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  GeoJSON,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from '@/types/geometry';
import type { LeafletEvent } from 'leaflet';
import type { Feature } from 'geojson';

/**
 * Props for the MapContainer component
 * @interface MapContainerProps
 * @property {FeatureCollection[]} layers - Array of feature collections to render
 * @property {(featureName: string) => void} [onFeatureClick] - Callback when a feature is clicked
 */
interface MapContainerProps {
  layers: FeatureCollection[];
  onFeatureClick?: (featureName: string) => void;
}

/**
 * The main map component that displays geographical data using react-leaflet.
 * Supports click interaction on GeoJSON features to trigger the project detail view.
 * @component
 */
export const MapContainer: React.FC<MapContainerProps> = ({
  layers,
  onFeatureClick,
}) => {
  /**
   * Attach click handler to each GeoJSON feature
   */
  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    // Use the feature's name property, or the layer collection name, as the label
    const name =
      feature.properties?.name ||
      feature.properties?.Name ||
      feature.properties?.title ||
      feature.id ||
      'Unknown Project';

    // Bind a popup with the feature name
    if ('bindPopup' in layer && typeof layer.bindPopup === 'function') {
      layer.bindPopup(`<strong>${name}</strong>`);
    }

    // Fire the click callback
    if ('on' in layer && typeof layer.on === 'function') {
      layer.on('click', (_e: LeafletEvent) => {
        onFeatureClick?.(String(name));
      });
    }
  };

  return (
    <div className="map-wrapper">
      <LeafletMapContainer
        center={[-3.1319, -60.0261]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="map-container"
        attributionControl={false}
      >
      {/* OpenStreetMap base layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {layers.map((layer, idx) => (
        <GeoJSON
          key={`${layer.name}-${idx}`}
          data={layer}
          onEachFeature={onEachFeature}
        />
      ))}
      </LeafletMapContainer>
    </div>
  );
};
