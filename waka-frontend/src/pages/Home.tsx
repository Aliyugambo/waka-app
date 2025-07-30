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

const PLACES_PER_PAGE = 8;

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [type, setType] = useState(PLACE_TYPES[0].value);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('DEBUG: Home - Checking geolocation availability');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          console.log('DEBUG: Home - User location obtained:', userCoords);
          setCoords(userCoords);
        },
        (error) => {
          console.log('DEBUG: Home - Geolocation error, using fallback:', error.message);
          setCoords({ lat: 10.5236, lon: 7.4383 }); // Kaduna fallback
        }
      );
    } else {
      console.log('DEBUG: Home - Geolocation not available, using fallback');
      setCoords({ lat: 10.5236, lon: 7.4383 });
    }
  }, []);

  useEffect(() => {
    if (!coords) return;
    console.log("Fetching places with:", { lat: coords.lat, lon: coords.lon, type, search });
    setLoading(true);
    // Pass search to fetchPlaces
    fetchPlaces(coords.lat, coords.lon, type, search)
      .then(setPlaces)
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, [coords, type, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, search, coords]);

  const paginatedPlaces = places.slice(
    (currentPage - 1) * PLACES_PER_PAGE,
    currentPage * PLACES_PER_PAGE
  );
 
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        placeTypes={PLACE_TYPES}
      />
      <Hero coords={coords} />
      <div className="flex-1">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <>
            <PlacesGrid
              places={paginatedPlaces}
              isAuthenticated={isAuthenticated}
              userLocation={coords}
            />
            <div className="flex justify-center items-center gap-2 my-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              <span className="px-2 text-sm">
                Page {currentPage} of {Math.max(1, Math.ceil(places.length / PLACES_PER_PAGE))}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === Math.ceil(places.length / PLACES_PER_PAGE) || places.length === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    
      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Waka App. All rights reserved.</p>
          <p className="text-xs mt-1">Made with ❤️ by The code crew</p>
          <div className="flex justify-center gap-4 mt-3">
            <a href="https://linkedin.com/in/aliyu-gambo-aliyu-bb022a318" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-6 h-6 fill-current hover:text-blue-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.603 2.001 3.603 4.601v5.595z"/></svg>
            </a>
            <a href="https://github.com/Aliyugambo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="w-6 h-6 fill-current hover:text-gray-400" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://x.com/thinktwice72" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-6 h-6 fill-current hover:text-blue-300" viewBox="0 0 24 24"><path d="M17.53 3.5h3.47l-7.57 8.67 8.92 11.33h-7.02l-5.53-7.02-6.32 7.02h-3.48l8.09-9.26-8.67-10.74h7.13l5.02 6.39z"/></svg>
            </a>
            <a href="https://instagram.com/aliyu_al" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6 fill-current hover:text-pink-400" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.276.06-2.687.334-3.678 1.325-.991.991-1.265 2.402-1.325 3.678-.06 1.28-.072 1.688-.072 4.947s.012 3.667.072 4.947c.06 1.276.334 2.687 1.325 3.678.991.991 2.402 1.265 3.678 1.325 1.28.06 1.688.072 4.947.072s3.667-.012 4.947-.072c1.276-.06 2.687-.334 3.678-1.325.991-.991 1.265-2.402 1.325-3.678.06-1.28.072-1.688.072-4.947s-.012-3.667-.072-4.947c-.06-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.265-3.678-1.325-1.28-.06-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}