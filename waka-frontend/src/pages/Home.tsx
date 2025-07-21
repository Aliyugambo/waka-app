import { useEffect, useState } from "react";
import { fetchPlaces } from "../services/geoapify";
import PlacesGrid from "../components/homepage/PlacesGrid";
import Navbar from "../components/homepage/Navbar";
import Hero from "../components/homepage/Hero";
import { useAuth } from "../contexts/AuthContext";
import type { Place } from "../services/geoapify";

const PLACE_TYPES = [
  { label: "Food", value: "catering.restaurant" },
  { label: "Cafe", value: "catering.cafe" },
  { label: "Bar", value: "catering.bar" },
  { label: "Cinema", value: "entertainment.cinema" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [type, setType] = useState(PLACE_TYPES[0].value);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setCoords({ lat: 10.5236, lon: 7.4383 }) // Kaduna fallback
      );
    } else {
      setCoords({ lat: 10.5236, lon: 7.4383 });
    }
  }, []);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    fetchPlaces(coords.lat, coords.lon, type)
      .then(setPlaces)
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, [coords, type, search]);

  return (
    <div>
      <Navbar />
      <Hero coords={coords} />
      <div className="flex gap-4 p-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Search places"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          {PLACE_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : (
        <PlacesGrid places={places} isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
}