import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { MapPin, Phone, Star } from 'lucide-react';
import { Place } from '../models/place/Place';

interface placesListProps {
    filteredPlaces: Place[];
}

const placesList : React.FC<placesListProps> = ({ filteredPlaces }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
                <Card
                    key={place.id}
                    className="hover:shadow-md transition-shadow duration-300 border-border"
                >
                    <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{place.primaryType}</Badge>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span className="font-semibold">{place.rating}</span>
                            </div>
                        </div>
                        <CardTitle className="text-xl">{place.detail.name}</CardTitle>
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
                        {/* <div className="flex flex-wrap gap-1">
                            {place.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {specialty}
                                </Badge>
                            ))}
                        </div> */}
                        <CardDescription className="text-sm">
                            Distance: {place.distance}
                        </CardDescription>
                        <Link to={`/place/${place.id}`}>
                            <Button className="w-full bg-primary hover:bg-primary-dark">
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