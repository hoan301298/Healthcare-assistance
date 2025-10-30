import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import clinicImage from '@/assets/clinic-interior.jpg';
import { Place } from '@/components/models/search/Place';
import useSearch from '@/hooks/useSearch';
import { capitalizeFirst } from '@/components/helper/capitalizeFirst';

const PlacesDetail = () => {
  const { search } = useSearch();
  const { id } = useParams();

  const place: Place = search?.places?.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold">Facility not found</h1>
          <Link to="/search">
            <Button className="mt-4">Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/search">
          <Button variant="outline" className="mb-6">
            ← Back to Search
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="text-sm">{capitalizeFirst(place.primaryType)}</Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="text-xl font-bold">{place.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({place.detail.user_ratings_total} reviews)</span>
                  </div>
                </div>
                <CardTitle className="text-3xl">{place.detail.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <img
                  src={clinicImage}
                  alt={place.detail.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
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
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{place.detail.international_phone_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{`Opening: ${place.detail.opening_hours.open_now ? "" : "Closed"}`}</p>
                    {place.detail.opening_hours.weekday_text.map(wt =>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{wt}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Appointment */}
            <Card className="border-border bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book an Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule your visit with this facility
                </p>
                <Link to={`/booking/${place.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary-dark">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions? Chat with our support team
                </p>
                <Link to="/chat">
                  <Button variant="outline" className="w-full">
                    Chat with Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesDetail;
