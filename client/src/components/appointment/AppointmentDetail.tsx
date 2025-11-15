import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    FileText,
    Hash,
    StickyNote,
    CircleCheckBig,
} from "lucide-react";
import { Appointment } from "../models/appointment/Appointment";
import SideBar from "../place_detail/SideBar";
import { getAppointmentStatus, statusColors } from "./appointmentStatus";

const AppointmentDetail: React.FC<{ appointment: Appointment | null }> = ({
    appointment,
}) => {
    if (!appointment) {
        return (
            <Card className="w-full max-w-3xl mx-auto">
                <CardContent className="py-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground italic">
                        No appointment details available.
                    </p>
                </CardContent>
            </Card>
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
                        <Badge
                            className={`${statusColors[status]} px-4 py-1.5 text-sm font-medium capitalize`}
                        >
                            {status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                        <div className="mt-0.5">
                            <Hash className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                                Reference Number
                            </p>
                            <p className="text-base font-mono text-foreground">
                                {appointment.id}
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex">
                        <div className="space-y-4 flex-1">
                            <h3 className="text-sm pl-3 font-semibold text-foreground uppercase tracking-wide">Personal Information</h3>
                            <div className="grid gap-4">
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
                                        <p className="text-base text-foreground">{appointment.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
                                        <p className="text-base text-foreground break-all">{appointment.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                                        <p className="text-base text-foreground">{appointment.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 flex-1">
                            <h3 className="text-sm pl-3 font-semibold text-foreground uppercase tracking-wide">Appointment Details</h3>
                            <div className="grid gap-4">
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <Calendar className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                                        <p className="text-base text-foreground font-medium">{appointment.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Time</p>
                                        <p className="text-base text-foreground font-medium">{appointment.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors">
                                    <div className="mt-0.5">
                                        <FileText className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Reason for Visit</p>
                                        <p className="text-base text-foreground">{appointment.reason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex">
                        <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors flex-1">
                            <div className="mt-0.5">
                                <StickyNote className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Additional Notes</p>
                                <p className="text-base text-foreground">{appointment.notes ?? "No Information"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-lg transition-colors flex-1">
                            <div className="mt-0.5">
                                <CircleCheckBig className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Create At</p>
                                <p className="text-base text-foreground">{appointment.createAt}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <SideBar place={appointment.place} />
        </div>
    );
};

export default AppointmentDetail;