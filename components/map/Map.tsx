'use client';

import { GeolocateControl, Map as MapComponent, MapRef } from 'react-map-gl/maplibre';
import { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef } from 'react';
import Marker from './Marker';

const Map = ({
  long,
  lat,
  markers,
  onClick,
}: {
  long: number;
  lat: number;
  markers?: {
    long: number;
    lat: number;
    content?: { name: string; date: string };
    eventId?: string;
    clickable?: boolean;
  }[];
  onClick?: (data: MapLayerMouseEvent) => void;
}) => {
  const geoControlRef = useRef<maplibregl.GeolocateControl>(null);
  const mapRef = useRef<MapRef>(null);

  return (
    <MapComponent
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 10,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={'/map-tiles.json'}
      ref={mapRef}
      onClick={onClick}
    >
      <GeolocateControl
        positionOptions={{
          enableHighAccuracy: true,
        }}
        trackUserLocation={true}
        ref={geoControlRef}
        // onGeolocate={handleGeolocate}
      />
      {markers &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            long={marker.long}
            lat={marker.lat}
            content={marker.content ?? { name: '', date: '' }}
            eventId={marker.eventId ?? ''}
            clickable={marker.clickable ?? true}
          />
        ))}
    </MapComponent>
  );
};

export default Map;
