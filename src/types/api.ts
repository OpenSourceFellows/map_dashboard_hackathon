/**
 * Type definitions for Campaign and Dataset entities
 * returned by the dashboard_server backend.
 *
 * These types are derived from the backend's Sequelize models
 * and the expected API response shape. They will be refined
 * once the backend endpoints are finalized.
 */

/** A geographic coordinate pair */
export interface LatLng {
  lat: number;
  lng: number;
}

/** GeoJSON-compatible geometry for map rendering */
export interface CampaignGeometry {
  type: 'Point' | 'Polygon' | 'MultiPolygon' | 'LineString';
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

/**
 * A Campaign represents a conservation/land project.
 * Campaigns are the top-level entity that users see on the map.
 */
export interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed' | 'on_hold';
  partner: string;
  location: string;
  acreage: number;
  watershed: string;
  projectType: string;
  fundingSource: string;
  startDate: string;
  endDate?: string;
  geometry?: CampaignGeometry;
  center?: LatLng;
  createdAt: string;
  updatedAt: string;
}

/**
 * A Dataset is a data layer associated with a Campaign.
 * Datasets contain the actual geospatial features (GeoJSON)
 * that are rendered on the map.
 */
export interface Dataset {
  id: number;
  campaignId: number;
  name: string;
  description: string;
  type: 'species' | 'water' | 'soil' | 'events' | 'boundary';
  /** GeoJSON FeatureCollection as a raw object */
  geojson: GeoJSON.FeatureCollection;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Standard paginated API response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Standard API error response
 */
export interface ApiError {
  status: number;
  message: string;
  details?: string;
}
