import { PhotoDetail } from "@/components/models/search/Properties";
import { CardContent } from "@/components/ui/card";
import { useState } from "react";
import clinicImage from '@/assets/clinic-interior.jpg';
import { mapApiKey } from "@/constant";

const ShowImage: React.FC<{ photos: PhotoDetail[] }> = ({ photos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const currentPhoto = photos?.length > 0 ? photos[currentIndex] : null;

    return (
        <CardContent className="space-y-4 flex flex-col items-center">
            {currentPhoto ? (
                <img
                    src={`https://places.googleapis.com/v1/${currentPhoto.name}/media?maxHeightPx=500&maxWidthPx=1000&key=${mapApiKey}`}
                    alt={currentPhoto.name || "Place photo"}
                    className="w-full h-[500px] object-cover rounded-lg shadow-md"
                />
            ) : (
                <img
                    src={clinicImage}
                    alt={currentPhoto.name || "Default image"}
                    className="w-full h-[500px] object-cover rounded-lg shadow-md"
                />
            )}

            {photos.length > 1 && (
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handlePrev}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        ← Prev
                    </button>
                    <span className="text-sm text-gray-600">
                        {currentIndex + 1} / {photos.length}
                    </span>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Next →
                    </button>
                </div>
            )}
        </CardContent>
    );
};

export default ShowImage;