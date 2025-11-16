import { Calendar, CircleCheckBig, Clock, FileText, Hash, Mail, Phone, StickyNote, User } from "lucide-react"
import { CardContent } from "../ui/card"
import { Separator } from "../ui/separator"
import { Appointment } from "../models/appointment/Appointment"
import { getFormatDate } from "../helper/formatDateTime"

const AppointmentContent: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
    return (
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
                                <p className="text-base text-foreground font-medium">{getFormatDate(appointment.date)}</p>
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
                        <p className="text-sm font-medium text-muted-foreground mb-1">Created At</p>
                        <p className="text-base text-foreground">{getFormatDate(appointment.createAt)}</p>
                    </div>
                </div>
            </div>
        </CardContent>
    )
}

export default AppointmentContent;