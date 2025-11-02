import { Star } from "lucide-react"
import { capitalizeFirst } from "../helper/capitalizeFirst"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Place } from "../models/search/Place";
import clinicImage from '@/assets/clinic-interior.jpg';

const Description: React.FC<{ place: Place }> = ({ place }) => {
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
                            <span className="text-muted-foreground text-sm">({place.userRatingCount ?? 0} reviews)</span>
                        </div>
                    </div>
                    <CardTitle className="text-3xl">{place.displayName.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <img
                        src={clinicImage}
                        alt={place.displayName.text}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default Description;