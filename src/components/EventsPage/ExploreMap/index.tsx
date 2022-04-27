import 'mapbox-gl/dist/mapbox-gl.css';

import React, { useEffect, useRef, useState } from 'react';
import ReactMapGl, { Marker, Popup, GeolocateControl, MapRef } from 'react-map-gl';
import { getCenter } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';
import MarkerIcon from '../../Maps/MarkerIcon';
import { EventManyType } from '../../../lib/types';

import ExploreCardPopup from './ExploreCardPopup';
import NextImage from 'next/image';
import { Center, usePrevious } from '@chakra-ui/react';
import _ from 'lodash';
import { EventManyQuery, Event } from '../../../generated/graphql';
import { USER_LOCATION } from '../../../lib/utils/parseUserLocationFromStorage';
import { EventManyArray } from '../types';
import { areEqual } from '../../../lib/utils/areEqual';

type Props = {
  events: EventManyArray;
};

type SelectedEvent = Pick<Event, 'longitude' | 'latitude' | 'id' | 'title'> | null;

export default function ExploreMap({ events }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent>(null);
  // transform events to match {longitude: number, latitude: number}[]
  const coordinates: GeolibInputCoordinates[] = events
    ? events.map(({ longitude, latitude }) => ({
        longitude,
        latitude,
      }))
    : [];

  // get center of coordinates
  const center = getCenter(coordinates);
  const prevCenter = usePrevious(center);

  // set map to the current city
  useEffect(() => {
    if (mapRef && typeof center === 'object' && !areEqual(center, prevCenter)) {
      mapRef.current?.flyTo({
        center: [center.longitude, center.latitude],
        zoom: 11,
      });
    }
  }, [center, prevCenter]);

  const viewport = {
    width: '100%',
    height: '100%',
    zoom: 11,
    ...center,
  };

  if (!center) return null;

  const imgHeight = Math.floor(document.documentElement.clientHeight * 0.92);
  const imgWidth = Math.floor(document.documentElement.clientWidth * 0.35);

  return (
    <>
      {!mapLoaded && (
        <NextImage
          src={`https://api.mapbox.com/styles/v1/kazakovkirilliy/cl1ezg2vy003l15qsx7o78fjp/static/${center.longitude},${center.latitude},11,0/${imgWidth}x${imgHeight}?access_token=${process.env.MAPS}`}
          layout={'fill'}
          objectFit={'cover'}
        />
      )}
      <ReactMapGl
        ref={mapRef}
        mapStyle={'mapbox://styles/kazakovkirilliy/cl1ezg2vy003l15qsx7o78fjp'}
        mapboxAccessToken={process.env.MAPS}
        initialViewState={viewport}
        doubleClickZoom={false}
        maxZoom={16}
        onLoad={() => setMapLoaded(true)}
        style={{ visibility: mapLoaded ? 'visible' : 'hidden' }}
      >
        <GeolocateControl />
        {events?.map((event, i) => (
          <div key={event.longitude + `${i}`}>
            <Marker key={event.longitude} longitude={event.longitude} latitude={event.latitude} anchor={'top'}>
              <MarkerIcon category={event.category} onClick={() => setSelectedEvent(event)} />
            </Marker>

            {selectedEvent && selectedEvent.id === event.id ? (
              <Popup
                longitude={selectedEvent.longitude}
                latitude={selectedEvent.latitude}
                closeOnClick={false}
                closeOnMove={true}
                onClose={() => setSelectedEvent(null)}
                anchor="bottom"
                closeButton={false}
              >
                <ExploreCardPopup {...selectedEvent} />
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </ReactMapGl>
    </>
  );
}
