import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Place } from "../../services/geoapify";

const PlaceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const place: Place | undefined = location.state?.place;
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  // Get user's current location
  useEffect(() => {
    if (isAuthenticated && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to a default location (e.g., Lagos, Nigeria)
          setUserLocation({ lat: 6.5244, lon: 3.3792 });
        }
      );
    }
  }, [isAuthenticated]);

  if (!place) {
    return <div className="p-4 text-center">Loading place details...</div>;
  }

  // Construct Google Maps embed URL with directions from user location to the place
  const embedUrl = userLocation
    ? `https://www.google.com/maps/embed/v1/directions?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&origin=${userLocation.lat},${userLocation.lon}&destination=${place.lat},${place.lon}&mode=driving`
    : `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&q=${place.lat},${place.lon}`;

  return (
    <div className="p-8 space-y-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>
      <img
        src={place.image || "/default-thumbnail.jpg"}
        alt={place.name}
        className="w-full max-h-[400px] object-cover rounded-lg"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default-thumbnail.jpg";
        }}
      />
      <h2 className="text-3xl font-bold">{place.name}</h2>
      <p className="text-gray-700">{place.address}</p>
      <p className="text-gray-500">{place.type}</p>

      {/* Directions Section - Authentication Required */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Directions</h3>
        {isAuthenticated ? (
          userLocation ? (
            <iframe
              title="Google Directions"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src={embedUrl}
              allowFullScreen
            ></iframe>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Getting your location for directions...</p>
            </div>
          )
        ) : (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Login Required
            </h4>
            <p className="text-gray-600 mb-4">
              You need to login before you have access to place directions.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Login to View Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceDetail;
