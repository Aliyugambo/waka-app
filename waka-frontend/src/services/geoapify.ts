export type Place = {
  id: string;
  name: string;
  address: string;
  type: string;
  image?: string;
  lat: number;
  lon: number;
};

export async function fetchPlaces(
  lat: number,
  lon: number,
  type: string,
  search?: string
): Promise<Place[]> {
  // const baseUrl = 'http://localhost:3001';
  const baseUrl = 'https://waka-app-nfvt.onrender.com';
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    type,
  });
  if (search && search.trim()) {
    params.append('search', search.trim());
  }

  const res = await fetch(`${baseUrl}/place/google?${params.toString()}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch places from backend');
  }
  return await res.json();
}

// Keep your getRouteInfo as-is if you still use Geoapify for routing
export async function getRouteInfo(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
) {
  console.log('DEBUG: getRouteInfo - Starting route calculation from:', { startLat, startLon }, 'to:', { endLat, endLon });
  
  const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
  console.log('DEBUG: getRouteInfo - API Key available:', !!GEOAPIFY_API_KEY);
  
  const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=walk&apiKey=${GEOAPIFY_API_KEY}`;
  console.log('DEBUG: getRouteInfo - Request URL:', url.replace(GEOAPIFY_API_KEY || '', '[API_KEY]'));

  try {
    const res = await fetch(url);
    console.log('DEBUG: getRouteInfo - Response status:', res.status);
    
    if (!res.ok) {
      console.error('DEBUG: getRouteInfo - API request failed:', res.status, res.statusText);
      throw new Error(`API request failed: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('DEBUG: getRouteInfo - Response data:', data);

    const summary = data?.features?.[0]?.properties?.summary;
    console.log('DEBUG: getRouteInfo - Route summary:', summary);

    const result = {
      time: summary?.duration,
      distance: summary?.distance,
      steps: data?.features?.[0]?.properties?.legs?.[0]?.steps || [],
    };
    
    console.log('DEBUG: getRouteInfo - Final result:', result);
    return result;
  } catch (error) {
    console.error('DEBUG: getRouteInfo - Error occurred:', error);
    throw error;
  }
}