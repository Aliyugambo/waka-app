import PlaceCard from './PlaceCard';
import type { Place } from "../../services/geoapify";

interface PlacesGridProps {
  places: Place[];
  isAuthenticated: boolean;
  userLocation?: { lat: number; lon: number } | null;
}

const PlacesGrid = ({ places, isAuthenticated, userLocation }: PlacesGridProps) => (
  <div className="px-2 sm:px-6 py-4 sm:py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {places.map((place) => (
      <PlaceCard
        key={place.id}
        place={place}
        isAuthenticated={isAuthenticated}
        userLocation={userLocation}
      />
    ))}
  </div>
);

export default PlacesGrid;