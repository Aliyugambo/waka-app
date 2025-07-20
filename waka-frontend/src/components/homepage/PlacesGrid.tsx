import PlaceCard from './PlaceCard';
import type { Place } from "../../services/geoapify";



interface PlacesGridProps {
  places: Place[];
  isAuthenticated: boolean;
}

const PlacesGrid = ({ places, isAuthenticated }: PlacesGridProps) => (
  <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {places.map((place) => (
      <PlaceCard key={place.id} place={place} isAuthenticated={isAuthenticated} />
    ))}
  </div>
);

export default PlacesGrid;