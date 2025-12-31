import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/navbar/Navbar';
import Form from '@/components/booking/Form';
import SideBar from '@/components/place_detail/SideBar';
import useSearch from '@/hooks/search/useSearch';
import useBooking from '@/hooks/booking/useBooking';
import { useEffect } from 'react';
import NotFound from './NotFound';
import { capitalizeFirst } from '@/components/helper/capitalizeFirst';

const Booking = () => {
  const { id } = useParams();
  const { formData, setFormData } = useBooking();
  const { search } = useSearch();
  
  const place = search?.places.find(p => p.id === id);
  if (!place) return <NotFound href='/search' label='Back to search page'/>
  
  useEffect(() => {
    setFormData({
      ...formData,
      hospital: place
    })
  }, [place])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to={`/place/${id}`}>
          <Button variant="outline" className="mb-6">
            ← Back to Facility
          </Button>
        </Link>
        <div className="mx-auto grid lg:grid-cols-3 gap-8 ">
          <Card className="lg:col-span-2 space-y-3">
            <CardHeader>
              <CardTitle className="text-3xl">Book an Appointment</CardTitle>
              <CardTitle className="text-primary pt-2">{capitalizeFirst(place?.primaryType)}: {place?.displayName?.text || "Unknown"}</CardTitle>
              <CardDescription className="text-base pt-5">
                Fill in your details and select your preferred date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form />
            </CardContent>
          </Card>
          <div className='space-y-6'>
            <SideBar place={place} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;