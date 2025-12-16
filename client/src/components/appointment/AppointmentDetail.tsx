import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText } from "lucide-react";
import { Appointment } from "../models/appointment/Appointment";
import SideBar from "../place_detail/SideBar";
import { getAppointmentStatus, statusColors } from "./appointmentStatus";
import AppointmentContent from "./AppointmentContent";

const AppointmentDetail: React.FC<{ appointment: Appointment | null }> = ({ appointment }) => {
    if (!appointment) {
        return (
            <div className="pb-[2rem]">
                <Card className="w-full max-w-3xl mx-auto">
                    <CardContent className="py-12 text-center">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground italic">
                            No appointment details available.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const status = getAppointmentStatus(appointment);

    return (
        <div className="w-full h-full shadow-lg flex justify-between px-6 pb-8">
            <Card className="w-full flex-[0.97] shadow-lg">
                <CardHeader className="space-y-4 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold text-foreground">
                                Appointment
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Complete information about your scheduled appointment
                            </p>
                        </div>
                        <Badge className={`${statusColors[status]} px-4 py-1.5 text-sm font-medium capitalize`}>
                            {status}
                        </Badge>
                    </div>
                </CardHeader>
                <AppointmentContent appointment={appointment}/>
            </Card>
            <SideBar place={appointment.place} />
        </div>
    );
};

export default AppointmentDetail;