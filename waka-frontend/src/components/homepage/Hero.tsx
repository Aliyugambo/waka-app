import { useEffect, useState } from "react";
import { fetchPlaces, type Place } from "../../services/geoapify";

interface Coordinates {
  lat: number;
  lon: number;
}

interface HeroProps {
  coords: Coordinates | null;
}

const Hero = ({ coords }: HeroProps) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!coords) return;
    fetchPlaces(coords.lat, coords.lon, "entertainment.nightclub")
      .then((places: Place[]) => setImages(places.map((p: Place) => p.image).filter(Boolean).slice(0, 5)));
  }, [coords]);

  return (
    <div className="relative h-[400px] bg-cover bg-center" style={{
      backgroundImage: images[0] ? `url(${images[0]})` : 'url(/hero-image.jpg)'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-2">Discover Top Places Near You</h1>
        <p className="text-lg mb-4">From Restaurants to Lounges, explore it all.</p>
        <div className="flex gap-2 mt-4">
          {images.slice(1).map((img, idx) => (
            <img key={idx} src={img} alt="Place" className="h-16 w-16 object-cover rounded shadow" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;