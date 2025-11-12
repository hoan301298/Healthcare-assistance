import AppointmentDetail from "@/components/appointment/AppointmentDetail";
import Navbar from "@/components/Navbar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAppointment from "@/hooks/useAppointment";

const Appointment = () => {
    const {
        appointment,
        setReferenceId,
        setEmail,
        setAppointment
    } = useAppointment();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-20 pb-12 mt-5">
                <Card className="lg:col-span-2 space-y-3">
                    <CardHeader>
                        <CardTitle className="text-3xl">Appointment Detail</CardTitle>
                        <CardDescription className="text-base py-4">
                            Fill in your booking reference and email registered
                        </CardDescription>
                        <CardDescription className="flex gap-5">
                            <div className="flex-1">
                                <Label htmlFor="id" className="text-black pl-1">Reference Number *</Label>
                                <Input
                                    className="h-[3rem] mt-2"
                                    id="referenceId"
                                    value={appointment.referenceId}
                                    onChange={(e) => setReferenceId(e.target.value)}
                                    placeholder="24-characters"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="email" className="text-black pl-1">Booking Email *</Label>
                                <Input
                                    className="h-[3rem] mt-2"
                                    id="email"
                                    value={appointment.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your-email@gmail.com"
                                    required
                                />
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <AppointmentDetail appointment={appointment.fetchedAppointment} />
                </Card>
            </div>
        </div>
    )
}

export default Appointment;