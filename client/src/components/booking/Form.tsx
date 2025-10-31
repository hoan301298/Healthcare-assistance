import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useNavigate } from "react-router-dom"
import { useToast } from '@/hooks/use-toast';
import { useState } from "react"
import { FormData } from "../models/booking/FormData"

const Form = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [formData, setFormData] = useState<FormData>({
        id: '',
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
                            onChange={e => (e)}
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
    )
}

export default Form;