import axios from 'axios';

export const getStaticMap = (
  lng: number,
  lat: number,
  width: number,
  height: number,
  zoom: number,
  markerColor: string
) => {
  const data = axios.get(
    `https://api.mapbox.com/styles/v1/kazakovkirilliy/cl1ezg2vy003l15qsx7o78fjp/static/pin-s+${markerColor}(${lng},${lat})/${lng},${lat},${zoom},0/${width}x${height}?access_token=${process.env.MAPS}`
  );

  return data;
};
