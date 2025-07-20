import {useLocation } from "react-router-dom";
import type { Place } from "../../services/geoapify";

const PlaceDetail = () => {
//   const { id } = useParams();
  const location = useLocation();
  const place: Place | undefined = location.state?.place;

  if (!place) {
    return <div className="p-4 text-center">Loading place details...</div>;
  }

  return (
    <div className="p-8">
      <img src={place.image} alt={place.name} className="w-full max-h-[400px] object-cover rounded-lg" />
      <h2 className="text-3xl font-bold mt-4">{place.name}</h2>
      <p className="text-gray-700 mt-2">{place.address}</p>
      <p className="text-gray-500 mt-1">{place.type}</p>
      {/* Add more fields like reviews, bookmarks etc */}
    </div>
  );
};

export default PlaceDetail;
