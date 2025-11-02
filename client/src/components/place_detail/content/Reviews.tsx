import { Place } from "@/components/models/search/Place";
import { CardContent } from "@/components/ui/card";

const Reviews: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <CardContent className="space-y-6">
            {place.reviews && place.reviews.length > 0 ? (
                place.reviews.map((review, index) => (
                    <div
                        key={index}
                        className="flex gap-4 p-4 border rounded-lg shadow-sm bg-gray-50"
                    >
                        <img
                            src={review.authorAttribution?.photoUri}
                            alt={review.authorAttribution?.displayName || "Reviewer"}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">
                                    {review.authorAttribution?.displayName || "Anonymous"}
                                </h4>
                                <span className="text-sm text-gray-500">
                                    {review.relativePublishTimeDescription}
                                </span>
                            </div>

                            <div className="flex items-center text-yellow-500 mt-1">
                                {"★".repeat(review.rating)}{" "}
                                <span className="text-gray-400 ml-1">
                                    ({review.rating})
                                </span>
                            </div>

                            {review.text && (
                                <p className="text-sm text-gray-700 mt-2">{review.text.text}</p>
                            )}

                            <a
                                href={review.authorAttribution?.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm mt-1 hover:underline"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 italic">No reviews available.</p>
            )}
        </CardContent>
    )
}

export default Reviews;