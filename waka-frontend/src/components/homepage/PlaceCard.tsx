import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Place } from "../../services/geoapify";

interface PlaceCardProps {
  place: Place;
  isAuthenticated: boolean;
}

const PlaceCard = ({ place, isAuthenticated }: PlaceCardProps) => {
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState("");
  const [bookmarking, setBookmarking] = useState(false);
  const [showDirection, setShowDirection] = useState(false);
  const navigate = useNavigate();

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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-[300px] cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={place.image || `https://source.unsplash.com/300x200/?${place.type}`}
        alt={place.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{place.name}</h3>
        <p className="text-sm text-gray-600">{place.address}</p>
        <p className="text-xs text-gray-400 capitalize">{place.type}</p>

        {isAuthenticated && (
          <>
            {/* Estimated time placeholder */}
            <p className="text-green-600 text-sm mt-1">
              Estimated time: ~15 mins (from your location)
            </p>

            {/* Directions */}
            <button
              className="text-indigo-600 text-sm font-medium mt-1"
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
                className="block mt-2 text-blue-500 underline text-sm"
              >
                Open Directions in Google Maps
              </a>
            )}
          </>
        )}

        {/* Review and Bookmark */}
        {isAuthenticated && (
          <div className="flex gap-2 mt-3">
            <button
              className="text-orange-500 text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setReviewing((r) => !r);
              }}
            >
              Add Review
            </button>
            <button
              className="text-blue-500 text-sm font-medium"
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

        {/* Review input */}
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
