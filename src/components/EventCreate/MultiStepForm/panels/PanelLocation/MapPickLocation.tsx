import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useCallback, useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { geocodeReverse } from '../../../../../lib/utils/geocodeReverse';
import React from 'react';
import { useCreateEventStore } from '../../../useCreateEventStore';
import { Box } from '@chakra-ui/react';

mapboxgl.accessToken = process.env.MAPS!;

export default function MapPickLocation() {
  const updatePayload = useCreateEventStore((state) => state.updatePayload);
  const longitude = useCreateEventStore((state) => state.payload.longitude);
  const latitude = useCreateEventStore((state) => state.payload.latitude);
  const isLocationFilled = useCreateEventStore(
    (state) => state.isLocationFilled
  );
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const placeMarker = useCallback(
    async (marker: mapboxgl.Marker, lngLat: mapboxgl.LngLat) => {
      if (!map.current) {
        return;
      }

      marker.setLngLat(lngLat).addTo(map.current);

      const { data } = await geocodeReverse(
        lngLat.lng,
        lngLat.lat,
        'address,place'
      );

      const address = data.features[0]
        ? data.features[0].place_name
        : undefined;

      const city = data.features[1] ? data.features[1].text : undefined;

      updatePayload({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        address,
        city,
      });
    },
    [updatePayload]
  );

  useEffect(() => {
    if (map && map.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      accessToken: process.env.MAPS!,
      container: mapContainer.current,
      style:
        'mapbox://styles/kazakovkirilliy/cl1ezg2vy003l15qsx7o78fjp?optimize=true',
      center: isLocationFilled() ? [longitude, latitude] : [14.4378, 50.0755],
      zoom: 12,
      trackResize: true,
      doubleClickZoom: false,
    });

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        // @ts-ignore:
        mapboxgl: mapboxgl,
        countries: 'cz',
        language: 'cs',
        reverseGeocode: true,
        marker: false,
      }),
      'top-left'
    );

    map.current.addControl(new mapboxgl.GeolocateControl({}), 'bottom-right');

    const marker = new mapboxgl.Marker({
      color: '#ED64A6',
    });

    if (isLocationFilled()) {
      marker.setLngLat([longitude, latitude]).addTo(map.current);
    }

    map.current.on('click', ({ lngLat }) => {
      placeMarker(marker, lngLat);
    });
  }, [isLocationFilled, latitude, longitude, placeMarker]);

  return (
    <Box
      ref={mapContainer}
      className="map-container"
      width={'100%'}
      height={{ base: '300px', md: '300px' }}
    />
  );
}
