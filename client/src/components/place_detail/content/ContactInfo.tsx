import { Place } from "@/components/models/search/Place";
import { CardContent } from "@/components/ui/card";
import { Link, MapPin, Navigation, Phone } from "lucide-react";

const ContactInfo: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <CardContent className="space-y-4">
            <div className="flex items-start gap-3" key={`Header-${place.id}-address`}>
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                        {place.formattedAddress}
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3" key={`Header-${place.id}-distance`}>
                <Navigation className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-medium">Distance</p>
                    <p className="text-sm text-muted-foreground">
                        {(place.distance / 1000).toFixed(2)} km
                    </p>
                </div>
            </div>

            {place.internationalPhoneNumber && (
                <div className="flex items-start gap-3" key={place.id}>
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                            {place.internationalPhoneNumber}
                        </p>
                    </div>
                </div>
            )}

            {place.websiteUri && (
                <div className="flex items-start gap-3 max-w-full">
                    <Link className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Website</p>
                        <a
                            href={place.websiteUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground block truncate max-w-xs"
                        >
                            {place.websiteUri}
                        </a>
                    </div>
                </div>
            )}
        </CardContent>
    )
}

export default ContactInfo;