const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export type Place = {
  id: string;
  name: string;
  address: string;
  type: string;
  image?: string;
  lat: number;
  lon: number;
};

interface GeoapifyFeature {
  properties: {
    place_id: string;
    name?: string;
    street?: string;
    categories?: string[];
    formatted: string;
    datasource?: {
      raw?: {
        image?: string;
      };
    };
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
}

export async function fetchPlaces(
  lat: number,
  lon: number,
  type: string
): Promise<Place[]> {
  const radius = 10000;
  const url = `https://api.geoapify.com/v2/places?categories=${type}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch places');
  }

  const data = await res.json();

  return data.features.map((f: GeoapifyFeature): Place => {
    const name = f.properties.name || f.properties.street || 'Unknown';
    const imageQuery = name !== 'Unknown' ? name : type;

    return {
      id: f.properties.place_id,
      name,
      type: f.properties.categories?.[0] || '',
      address: f.properties.formatted,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      image: f.properties.datasource?.raw?.image || `https://source.unsplash.com/300x200/?${encodeURIComponent(imageQuery)}`,
    };
  });
}


export async function getRouteInfo(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
) {
  const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=walk&apiKey=${GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const summary = data?.features?.[0]?.properties?.summary;

  return {
    time: summary?.duration,
    distance: summary?.distance,
    steps: data?.features?.[0]?.properties?.legs?.[0]?.steps || [],
  };
}
