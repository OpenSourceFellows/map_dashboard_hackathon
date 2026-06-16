import { type JSX } from 'react'
import { GeoJSON, Popup, Circle, Tooltip } from 'react-leaflet'
import type { FeatureCollection } from '@/types/geometry'
import { type Point } from 'geojson'
import { centroid } from '@turf/turf'


/*
 * 1 collection = 1 map layer
 * 1 collection = array of GeoJSON features
 * 1 feature = may be a point, line, polygon, etc.
 */
interface LayerProps {
  collection: FeatureCollection
}

/* 
  TODO: We need to define some generic params that will be returned in a FeatureCollection's
  properties. Then we can actually use the type capabilities in Typescript.
  Some ideas:
    - identifier
    - measurement
    - unitOfMeasure
    - partners (partnerships?) referring to Tribes, AdvocacyGroups, etc. with whom we work
    - ??? some ability to have adhoc fields
*/

/* Given a collection, returns an array of <GeoJSON> leaflet components for non-null features. */
export function Layer({ collection }: LayerProps): JSX.Element[] {
  return collection.features
    .filter((feature): feature is NonNullable<typeof feature> => Boolean(feature))
    .map((feature, idx) =>  {
       const geom = feature.geometry as any
       let coordinates: number[] = []
       if (geom?.type === 'Point' && Array.isArray(geom.coordinates) && typeof geom.coordinates[0] === 'number') {
         coordinates = geom.coordinates as number[]
       } else {
         try {
           const c = centroid(feature as any)
           coordinates = c?.geometry?.coordinates ?? []
         } catch {
           coordinates = []
         }
       }

       const center = coordinates.length >= 2 ? [coordinates[1], coordinates[0]] as [number, number] : undefined

       return (
        <GeoJSON
        key={`${collection.name}-${feature.id ?? idx}`} // falls back for null or undefined
        data={feature}
        
        >
        <Tooltip permanent>{feature.properties?.identifier ?? ''}</Tooltip>
        {/* Popup is a clickable element. */}
        <Popup>
          <p>{feature.properties?.identifier ?? ''}</p>
          <p>Land Partner(s): {(feature.properties?.partners ?? []).join(', ')}</p>
          <p>Current Acreage: {feature.properties?.measurement ?? ''}</p>
          <p>Restoration Services: {(feature.properties?.restorationServices ?? []).join(', ')}</p>
        </Popup>
        {center && (
          <Circle
            center={center}
            radius={Math.sqrt((feature.properties?.measurement ?? 0) * 4046.86)} // 1 acre = 4046.86 m^2
          />
        )}
        </GeoJSON>
       )  
      }
    );
}
