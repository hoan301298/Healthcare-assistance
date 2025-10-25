import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { MapPin, Phone, Star } from 'lucide-react';
import { Facility } from '../models/Facility';

interface FacilitiesListProps {
    filteredFacilities: Facility[];
}

const FacilitiesList : React.FC<FacilitiesListProps> = ({ filteredFacilities }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
                <Card
                    key={facility.id}
                    className="hover:shadow-md transition-shadow duration-300 border-border"
                >
                    <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{facility.type}</Badge>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-accent text-accent" />
                                <span className="font-semibold">{facility.rating}</span>
                            </div>
                        </div>
                        <CardTitle className="text-xl">{facility.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{facility.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{facility.phone}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {facility.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {specialty}
                                </Badge>
                            ))}
                        </div>
                        <CardDescription className="text-sm">
                            Distance: {facility.distance}
                        </CardDescription>
                        <Link to={`/facility/${facility.id}`}>
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

export default FacilitiesList;