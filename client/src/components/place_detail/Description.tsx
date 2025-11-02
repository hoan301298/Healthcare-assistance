import { Star } from "lucide-react"
import { capitalizeFirst } from "../helper/capitalizeFirst"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Place } from "../models/search/Place";
import clinicImage from '@/assets/clinic-interior.jpg';
import { mapApiKey } from "@/constant";
import { useState } from "react";

const Description: React.FC<{ place: Place }> = ({ place }) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    return (
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
                <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="text-sm">{capitalizeFirst(place.primaryType)}</Badge>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-accent text-accent" />
                                <span className="text-xl font-bold">{place.rating ?? 0}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">({place.reviews?.length ?? 0} reviews)</span>
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{place.displayName.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 flex flex-wrap justify-center gap-4">
                    {place.photos && place.photos.length > 0 ? (
                        <img
                            src={`https://places.googleapis.com/v1/${place.photos[imageIndex].name}/media?maxHeightPx=500&maxWidthPx=1000&key=${mapApiKey}`}
                            alt={place.displayName?.text || "Place photo"}
                            className="w-full h-[400px] object-cover rounded-lg shadow-md"
                        />
                    ) : (
                        <img
                            src={clinicImage}
                            alt={place.displayName?.text || "Default image"}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Description;