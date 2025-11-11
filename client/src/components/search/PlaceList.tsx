import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { MapPinned, Phone, Star, Link as LinkIcon, Navigation } from 'lucide-react';
import { Place } from '../models/search/Place';
import { getValue } from '../helper/KeyValue';
import { MedicalType } from '../models/search/PlaceProperties';

const PlaceList: React.FC<{ places: Place[] }> = ({ places }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {places.map((place) => (
                <Card
                    key={place.id}
                    className="border-border flex flex-col transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
                >
                    <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{getValue(MedicalType, place.primaryType)}</Badge>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span className="font-semibold">{place.rating}</span>
                            </div>
                        </div>
                        <CardTitle className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                            {place.displayName.text}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPinned className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                            <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{place.formattedAddress}</span>
                        </div>
                        {place.internationalPhoneNumber
                            ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                                    <span className="text-sm">{place.internationalPhoneNumber}</span>
                                </div>
                            ) : (
                                <div className='flex items-center gap-2 text-muted-foreground'>
                                    <LinkIcon className="h-4 w-4 flex-shrink-0 text-primary" />
                                    <a
                                        href={place.websiteUri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground block truncate max-w-xs"
                                    >
                                        {place.websiteUri}
                                    </a>
                                </div>
                            )}
                        <CardDescription className="text-sm mb-2 flex gap-2">
                            <Navigation className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                            <span>Distance: {(place.distance / 1000).toFixed(2)} km</span>
                        </CardDescription>
                        <Link className='rounded' to={`/place/${place.id}`}>
                            <Button className="w-full bg-primary hover:bg-primary-dark mt-5 bottom-0">
                                View Details
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default PlaceList;