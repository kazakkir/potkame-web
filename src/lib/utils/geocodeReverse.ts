import axios from 'axios';

export const geocodeReverse = async (
  lng: number,
  lat: number,
  type: string
) => {
  const data = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=${type}&access_token=${process.env.MAPS}`
  );

  return data;
};
