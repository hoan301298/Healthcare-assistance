import AppointmentList from "@/components/appointment/AppointmentList";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useHandleAction from "@/hooks/appointment/useHandleAction";
import { Search } from "lucide-react";
import { useState } from "react";
import useAppointment from "@/hooks/appointment/useAppointment";

const Appointment = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        email,
        referenceId,
        setReferenceId,
        setEmail,
    } = useAppointment();
    const { handleSearchBooking } = useHandleAction();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-[6rem] pb-[2rem]">
                <Card className="lg:col-span-2 space-y-3">
                    <CardHeader>
                        <CardTitle className="text-3xl">Find Appointment</CardTitle>
                        <CardDescription className="text-base py-4">
                            Fill in your booking reference and email registered
                        </CardDescription>
                        <form onSubmit={(e) => handleSearchBooking(e, setIsLoading)}>
                            <div className="flex gap-5">
                                <div className="flex-1">
                                    <Label htmlFor="id" className="text-black pl-1">Reference Number *</Label>
                                    <Input
                                        className="h-[3rem] mt-2"
                                        id="referenceId"
                                        value={referenceId}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your-email@gmail.com"
                                        required
                                    />
                                </div>
                                <Button
                                    className="self-end h-[3rem] flex-[0.1]"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    <Search />
                                    Search
                                </Button>
                            </div>
                        </form>
                    </CardHeader>
                    <AppointmentList/>
                </Card>
            </div>
        </div>
    )
}

export default Appointment;