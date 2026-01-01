import { CalendarX } from "lucide-react";
import useAppointment from "@/hooks/appointment/useAppointment";
import AppointmentBar from "./AppointmentBar";
import { sortAppointmentDateTime } from "./appointmentStatus";

const AppointmentList = () => {
    const {
        singleAppointment,
        authAppointments
    } = useAppointment();

    if (!singleAppointment && !authAppointments) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <CalendarX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Appointments</h3>
                <p className="text-muted-foreground">
                    You don't have any scheduled appointments. Book one to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {singleAppointment &&
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 mx-6">Your Search:</h3>
                    <AppointmentBar
                        key={`${singleAppointment.id}-search`}
                        appointment={singleAppointment}
                    />
                </div>
            }
            {authAppointments && authAppointments.length > 0 &&
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 mx-6">History appointments:</h3>
                    {sortAppointmentDateTime(authAppointments).map((appointment) => (
                        <AppointmentBar
                            key={appointment.id}
                            appointment={appointment}
                        // onDelete={handleDelete}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default AppointmentList;