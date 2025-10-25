import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    time: '',
    reason: '',
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.time) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date and time for your appointment.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Booking Confirmed!',
      description: 'Your appointment has been successfully scheduled. Check your email for confirmation.',
    });

    setTimeout(() => {
      navigate('/search');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to={`/facility/${id}`}>
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
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Select Date</h3>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border border-border"
                    />
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Select Time</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={formData.time === time ? 'default' : 'outline'}
                        onClick={() => setFormData({ ...formData, time })}
                        className={formData.time === time ? 'bg-primary hover:bg-primary-dark' : ''}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reason for Visit */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Reason for Visit</h3>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Please describe your reason for visit</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Brief description of your symptoms or reason for appointment..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
