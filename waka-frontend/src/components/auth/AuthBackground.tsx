import { useEffect, useState } from 'react';
import imgUrl0 from '@/assets/unsplash0.jpg';
import imgUrl1 from '@/assets/unsplash1.jpg';
import imgUrl2 from '@/assets/unsplash2.jpg';
import imgUrl3 from '@/assets/unsplash3.jpg';
import imgUrl4 from '@/assets/unsplash4.jpg';
import imgUrl5 from '@/assets/unsplash5.jpg';

const images = [imgUrl0, imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5];

export function AuthBackground() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={image}
                    className="absolute inset-0 transition-opacity duration-15000"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: index === currentImageIndex ? 1 : 0,
                        zIndex: 0,
                    }}
                />
            ))}
            <div 
                className="absolute inset-0" 
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }}
            />
        </div>
    );
}