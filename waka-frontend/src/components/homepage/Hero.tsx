import { useEffect, useState } from "react";
import { fetchPlaces, type Place } from "../../services/geoapify";

interface Coordinates {
  lat: number;
  lon: number;
}

interface HeroProps {
  coords: Coordinates | null;
}

const SLIDE_INTERVAL = 4000; // 4 seconds

const Hero = ({ coords }: HeroProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!coords) return;

    fetchPlaces(coords.lat, coords.lon, "entertainment.nightclub")
      .then((places: Place[]) => {
        const validImages = places
          .map((p: Place) => p.image)
          .filter((img): img is string => Boolean(img))
          .slice(0, 5);
        console.log("Fetched images for Hero:", validImages); // Add this line
        setImages(validImages);
        setCurrentIndex(0);
      })
      .catch(() => setImages([]));
  }, [coords]);

  useEffect(() => {
    if (images.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [images]);

  const backgroundImage = images.length > 0 ? images[currentIndex] : "/default-hero.jpg";

  return (
    <div className="relative h-[250px] sm:h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default-hero.jpg";
        }}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-2 sm:px-4 z-10">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">Discover Top Places Near You</h1>
        <p className="text-base sm:text-lg mb-4">From Restaurants to Lounges, explore nightlife around you.</p>

        {/* Dot Indicators */}
        <div className="flex gap-2 mt-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;