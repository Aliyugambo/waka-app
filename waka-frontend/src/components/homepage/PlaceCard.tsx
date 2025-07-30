import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Place } from "../../services/geoapify";
import { getRouteInfo } from "../../services/geoapify";

interface PlaceCardProps {
  place: Place;
  isAuthenticated: boolean;
  userLocation?: { lat: number; lon: number } | null;
}

const PlaceCard = ({ place, isAuthenticated, userLocation }: PlaceCardProps) => {
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState("");
  const [bookmarking, setBookmarking] = useState(false);
  const [showDirection, setShowDirection] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [loadingTime, setLoadingTime] = useState(false);
  const navigate = useNavigate();

  // Calculate estimated travel time when user location and place are available
  useEffect(() => {
    if (isAuthenticated && userLocation && place.lat && place.lon) {
      setLoadingTime(true);
      getRouteInfo(userLocation.lat, userLocation.lon, place.lat, place.lon)
        .then((routeInfo) => {
          if (routeInfo.time) {
            // Convert seconds to minutes and format
            const minutes = Math.round(routeInfo.time / 60);
            setEstimatedTime(`~${minutes} mins`);
          } else {
            setEstimatedTime("~15 mins"); // Fallback
          }
        })
        .catch((error) => {
          console.error('Error calculating route time:', error);
          setEstimatedTime("~15 mins"); // Fallback on error
        })
        .finally(() => {
          setLoadingTime(false);
        });
    }
  }, [isAuthenticated, userLocation, place.lat, place.lon]);

  const handleReview = () => {
    setReviewing(true);
    setTimeout(() => {
      setReviewing(false);
      setReview("");
      alert("Review submitted!");
    }, 1000);
  };

  const handleBookmark = () => {
    setBookmarking(true);
    setTimeout(() => setBookmarking(false), 1000);
  };

  const handleCardClick = () => {
    navigate(`/places/${place.id}`, { state: { place } });
  };

  const getGoogleMapsDirectionLink = () => {
    const lat = place.lat;
    const lon = place.lon;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full sm:w-[300px] cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={place.image || "/default-thumbnail.jpg"}
        alt={place.name}
        className="h-40 sm:h-48 w-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default-thumbnail.jpg";
        }}
      />
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg">{place.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{place.address}</p>
        <p className="text-xs text-gray-400 capitalize">{place.type}</p>

        {isAuthenticated && (
          <>
            <p className="text-green-600 text-xs sm:text-sm mt-1">
              {loadingTime ? (
                <span className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-green-600"></div>
                  Calculating time...
                </span>
              ) : (
                `Estimated time: ${estimatedTime || '~15 mins'} (from your location)`
              )}
            </p>
            <button
              className="text-indigo-600 text-xs sm:text-sm font-medium mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowDirection((prev) => !prev);
              }}
            >
              {showDirection ? "Hide Direction" : "View Direction"}
            </button>
            {showDirection && (
              <a
                href={getGoogleMapsDirectionLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block mt-2 text-blue-500 underline text-xs sm:text-sm"
              >
                Open Directions in Google Maps
              </a>
            )}
          </>
        )}

        {isAuthenticated && (
          <div className="flex gap-2 mt-3">
            <button
              className="text-orange-500 text-xs sm:text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setReviewing((r) => !r);
              }}
            >
              Add Review
            </button>
            <button
              className="text-blue-500 text-xs sm:text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark();
              }}
              disabled={bookmarking}
            >
              {bookmarking ? "Bookmarking..." : "Bookmark"}
            </button>
          </div>
        )}

        {isAuthenticated && reviewing && (
          <div className="mt-2">
            <textarea
              className="border rounded w-full p-1"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="mt-1 bg-orange-500 text-white px-3 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleReview();
              }}
              disabled={!review || reviewing}
            >
              {reviewing ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;