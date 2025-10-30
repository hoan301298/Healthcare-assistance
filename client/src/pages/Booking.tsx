import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Form from '@/components/booking/Form';

const Booking = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to={`/place/${id}`}>
          <Button variant="outline" className="mb-6">
            ← Back to Facility
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-3xl">Book an Appointment</CardTitle>
              <CardDescription className="text-base">
                Fill in your details and select your preferred date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;