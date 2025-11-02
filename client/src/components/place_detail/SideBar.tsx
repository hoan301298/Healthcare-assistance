import { Clock, Link, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Place } from "../models/search/Place"

const SideBar: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <Card className="border-border" key={place.id}>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{place.formattedAddress}</p>
                        <p className="text-sm text-muted-foreground">{(place.distance / 1000).toFixed(2)} km</p>
                    </div>
                </div>
                {place.internationalPhoneNumber &&
                    <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{place.internationalPhoneNumber}</p>
                        </div>
                    </div>
                }
                {place.websiteUri &&
                    <div className="flex items-start gap-3 max-w-full">
                        <Link className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Website</p>
                            <a href={place.websiteUri} target="_blank" className="text-sm text-muted-foreground block truncate max-w-xs">{place.websiteUri}</a>
                        </div>
                    </div>
                }
                <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">{`Now: ${place.regularOpeningHours?.open_now === undefined ? "No Information" : `${place.regularOpeningHours.open_now ? "Opening" : "Closeed"}` }`}</p>
                        {place?.regularOpeningHours?.weekdayDescriptions && place.regularOpeningHours.weekdayDescriptions.map(wt =>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{wt}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SideBar;