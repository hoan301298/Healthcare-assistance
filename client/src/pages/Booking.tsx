import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Form from '@/components/booking/Form';
import SideBar from '@/components/place_detail/SideBar';
import useSearch from '@/hooks/useSearch';
import useBooking from '@/hooks/useBooking';
import { useEffect } from 'react';
import NotFound from './NotFound';

const Booking = () => {
  const { id } = useParams();
  const { formData, setFormData, clearFormData } = useBooking();
  const { search } = useSearch();
  
  const place = search?.places.find(p => p.id === id);
  if (!place) return <NotFound href='/search' label='Back to search page'/>
  
  useEffect(() => {
    setFormData({
      ...formData,
      place: place
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
              <CardTitle className="text-primary pt-3">Facility's name: {place?.displayName?.text || "Unknown"}</CardTitle>
              <CardDescription className="text-base pt-2">
                Fill in your details and select your preferred date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                formData={formData}
                setFormData={setFormData}
                clearFormData={clearFormData}
              />
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