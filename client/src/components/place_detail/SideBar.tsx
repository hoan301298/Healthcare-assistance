import { Clock, Link, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Place } from "../models/search/Place"

const SideBar: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <Card className="border-border">
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
                {place.detail.international_phone_number &&
                    <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{place.detail.international_phone_number}</p>
                        </div>
                    </div>
                }
                {place.detail.website &&
                    <div className="flex items-start gap-3 max-w-full">
                        <Link className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Website</p>
                            <a href={place.detail.website} target="_blank" className="text-sm text-muted-foreground block truncate max-w-xs">{place.detail.website}</a>
                        </div>
                    </div>
                }
                <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">{`Opening: ${place?.detail?.opening_hours?.open_now ? "Opened" : "Closed"}`}</p>
                        {place?.detail?.opening_hours?.weekday_text && place.detail.opening_hours.weekday_text.map(wt =>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{wt}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SideBar;