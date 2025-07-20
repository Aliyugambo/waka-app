import { useState } from "react";
import type { Place } from "../../services/geoapify";




interface PlaceCardProps {
  place: Place;
  isAuthenticated: boolean;
}

const PlaceCard = ({ place, isAuthenticated }: PlaceCardProps) => {
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState("");
  const [bookmarking, setBookmarking] = useState(false);

  const handleReview = () => {
    // Review logic here
    setReviewing(true);
    // Add your review submission logic
    setTimeout(() => setReviewing(false), 1000); // Mock submission
  };

  const handleBookmark = () => {
    // Bookmark logic here
    setBookmarking(true);
    // Add your bookmark logic
    setTimeout(() => setBookmarking(false), 1000); // Mock submission
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-[300px]">
      <img src={place.image} alt={place.name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{place.name}</h3>
        <p className="text-sm text-gray-600">{place.address}</p>
        <p className="text-xs text-gray-400">{place.type}</p>
        {isAuthenticated && (
          <div className="flex gap-2 mt-2">
            <button
              className="text-orange-500 text-sm font-medium"
              onClick={() => setReviewing(r => !r)}
            >
              Add Review
            </button>
            <button
              className="text-blue-500 text-sm font-medium"
              onClick={handleBookmark}
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
              onChange={e => setReview(e.target.value)}
              placeholder="Write your review..."
            />
            <button
              className="mt-1 bg-orange-500 text-white px-3 py-1 rounded"
              onClick={handleReview}
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