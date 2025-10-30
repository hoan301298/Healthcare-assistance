import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { MapPin, Phone, Star } from 'lucide-react';
import { Place } from '../models/search/Place';
import { capitalizeFirst } from '../helper/capitalizeFirst';
import { MedicalType } from '../models/search/MedicalType';

interface placesListProps {
    places: Place[];
}

const placesList: React.FC<placesListProps> = ({ places }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {places.map((place) => (
                <Card
                    key={place.id}
                    className="border-border flex flex-col transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                    <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{capitalizeFirst(place.primaryType)}</Badge>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span className="font-semibold">{place.rating}</span>
                            </div>
                        </div>
                        <CardTitle className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                            {place.detail.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{place.formattedAddress}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{place.detail.international_phone_number}</span>
                        </div>
                        <CardDescription className="text-sm">
                            Distance: {(place.distance / 1000).toFixed(2)} km
                        </CardDescription>
                        <Link className='mt-auto rounded' to={`/place/${place.id}`}>
                            <Button className="w-full bg-primary hover:bg-primary-dark mt-2 bottom-0">
                                View Details
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default placesList;