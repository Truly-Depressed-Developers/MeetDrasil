'use client';

import { Popup } from 'maplibre-gl';
import { useCallback, useEffect, useRef } from 'react';
import { Marker as MapMarker, useMap } from 'react-map-gl/maplibre';
import { renderToString } from 'react-dom/server';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

let currentOpenPopup: Popup | null = null;

const Marker = ({
  long,
  lat,
  content,
  eventId,
}: {
  long: number;
  lat: number;
  content: { name: string; date: string };
  eventId: string;
}) => {
  const { current: mapRef } = useMap();
  const popupRef = useRef<Popup | null>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!mapRef) return;

      try {
        if (currentOpenPopup && currentOpenPopup !== popupRef.current) {
          currentOpenPopup.remove();
          currentOpenPopup = null;
        }

        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
          currentOpenPopup = null;
          return;
        }

        const newPopup = new Popup({
          closeOnClick: true,
          closeButton: false,
          offset: [0, -20],
          className: 'marker-popup',
        })
          .setLngLat([long, lat])
          .setHTML(renderToString(<NewPopup {...content} eventId={eventId} />))
          .addTo(mapRef.getMap());

        popupRef.current = newPopup;
        currentOpenPopup = newPopup;

        newPopup.on('close', () => {
          if (popupRef.current === newPopup) {
            popupRef.current = null;
          }
          if (currentOpenPopup === newPopup) {
            currentOpenPopup = null;
          }
        });

        mapRef.getMap().once('click', () => {
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
            currentOpenPopup = null;
          }
        });
      } catch (error) {
        console.error('Error handling popup:', error);
        popupRef.current = null;
        currentOpenPopup = null;
      }
    },
    [mapRef, content, long, lat, eventId]
  );

  useEffect(() => {
    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
        if (currentOpenPopup === popupRef.current) {
          currentOpenPopup = null;
        }
      }
    };
  }, []);

  return (
    <MapMarker longitude={long} latitude={lat}>
      <div ref={markerRef} onClick={handleMarkerClick} style={{ cursor: 'pointer' }}>
        <Image src="/marker.svg" alt="marker" width={40} height={40} priority />
      </div>
    </MapMarker>
  );
};

export default Marker;

const NewPopup = ({ name, date, eventId }: { name: string; date: string; eventId: string }) => {
  return (
    <Link href={`/events/${eventId}`}>
      <div className="min-w-[180px] bg-background text-foreground">
        <h3 className="p-3 text-center text-base font-medium">{name}</h3>
        <p className="flex items-center justify-center pb-3">
          <Calendar className="mr-1 size-3.5 shrink-0" />
          {date}
        </p>
      </div>
    </Link>
  );
};
