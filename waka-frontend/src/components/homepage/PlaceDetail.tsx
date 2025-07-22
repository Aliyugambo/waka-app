import { useLocation } from "react-router-dom";
import type { Place } from "../../services/geoapify";

const PlaceDetail = () => {
  const location = useLocation();
  const place: Place | undefined = location.state?.place;

  if (!place) {
    return <div className="p-4 text-center">Loading place details...</div>;
  }

  // Construct Google Maps embed URL with directions to the place
  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&destination=${place.lat},${place.lon}&mode=driving`;

  return (
    <div className="p-8 space-y-6">
      <img
        src={place.image}
        alt={place.name}
        className="w-full max-h-[400px] object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold">{place.name}</h2>
      <p className="text-gray-700">{place.address}</p>
      <p className="text-gray-500">{place.type}</p>

      {/* Embedded Google Maps Directions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Directions</h3>
        <iframe
          title="Google Directions"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PlaceDetail;
