export const LOCATION_DECLINED = 'location_declined';
export const USER_LOCATION = 'location';

export const parseUserLocationFromStorage = (): { latitude: number; longitude: number; city: string } | null => {
  if (typeof window !== 'object') {
    return null;
  }

  try {
    const userLocation = JSON.parse(localStorage.getItem(USER_LOCATION) || '');
    if (!userLocation) {
      return null;
    }
    return userLocation;
  } catch {
    return null;
  }
};
