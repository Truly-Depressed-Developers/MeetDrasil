'use client';

import { GeolocateControl, Map as MapComponent, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef } from 'react';
import Marker from './Marker';

const Map = ({
  long,
  lat,
  markers,
}: {
  long: number;
  lat: number;
  markers: { long: number; lat: number }[];
}) => {
  const geoControlRef = useRef<maplibregl.GeolocateControl>(null);
  const mapRef = useRef<MapRef>(null);

  return (
    <MapComponent
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 14,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={'/map-tiles.json'}
      ref={mapRef}
    >
      <GeolocateControl
        positionOptions={{
          enableHighAccuracy: true,
        }}
        trackUserLocation={true}
        ref={geoControlRef}
        // onGeolocate={handleGeolocate}
      />
      {markers.map((marker, index) => (
        <Marker key={index} long={marker.long} lat={marker.lat} />
      ))}
    </MapComponent>
  );
};

export default Map;
