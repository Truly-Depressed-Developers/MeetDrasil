import Image from 'next/image';
import { Marker as MapMarker } from 'react-map-gl/maplibre';

const Marker = ({ long, lat }: { long: number; lat: number }) => {
  return (
    <MapMarker longitude={long} latitude={lat}>
      <Image style={{ width: '40px' }} src="/marker.svg" alt="marker" width={40} height={40} />
    </MapMarker>
  );
};

export default Marker;
