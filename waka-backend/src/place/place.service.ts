import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class PlaceService {
  async fetchGooglePlaces(
    lat: number,
    lon: number,
    type: string,
    search?: string,
  ) {
    const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const radius = 10000;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;
    if (search && search.trim()) {
      url += `&keyword=${encodeURIComponent(search.trim())}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch places from Google');
    const data = await res.json();
    return data.results.map((p: any) => ({
      id: p.place_id,
      name: p.name || 'Unknown',
      type,
      address: p.vicinity || p.formatted_address || 'Unknown',
      lat: p.geometry?.location?.lat,
      lon: p.geometry?.location?.lng,
      image:
        p.photos && p.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
          : '/default-thumbnail.jpg',
    }));
  }
}
