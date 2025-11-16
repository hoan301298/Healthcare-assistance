import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { timeSlots } from "../models/booking/FormData"
import useBooking from "@/hooks/useBooking"
import { useHandleBookingAction } from "@/hooks/useHandleBookingAction"

const Form = () => {
    const {
        formData,
        setFormData,
    } = useBooking();
    const { handleCreateBooking } = useHandleBookingAction();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form onSubmit={handleCreateBooking} className="space-y-8">
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
                            placeholder="01234567"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Select Date</h3>
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={formData.date ? new Date(formData.date) : undefined}
                        onSelect={(selectedDate) => {
                            if(!selectedDate) {
                                setFormData({ ...formData, date: ""});
                                return;
                            }

                            const adjusted = new Date(selectedDate);
                            adjusted.setHours(adjusted.getHours() + 2); // only for UTC+2 (Finnish Time Zone)

                            setFormData({
                                ...formData,
                                date: adjusted.toISOString(),
                            });
                        }}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border border-border"
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Select Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                        <Button
                            key={time}
                            type="button"
                            variant={formData.time === time ? 'default' : 'outline'}
                            onClick={() => setFormData({ ...formData, time: time })}
                            className={formData.time === time ? 'bg-primary hover:bg-primary-dark' : ''}
                        >
                            {time}
                        </Button>
                    ))}
                </div>
            </div>

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
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Notes</h3>
                <div className="space-y-2">
                    <Label htmlFor="reason">Tell us your notes</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="What you need when visitting..."
                        rows={4}
                    />
                </div>
            </div>

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