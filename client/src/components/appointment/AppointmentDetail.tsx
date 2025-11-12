import { Appointment } from "../models/appointment/Appointment";
import { CardContent } from "../ui/card";

const AppointmentDetail: React.FC<{ appointment: Appointment | null }> = ({ appointment }) => {
    if (!appointment) {
        return (
            <CardContent className="text-gray-500 italic">
                No appointment details available.
            </CardContent>
        );
    }

    return (
        <CardContent className="space-y-2 text-gray-800">
            <div>
                <span className="font-medium">Name: </span>
                {appointment.name}
            </div>
            <div>
                <span className="font-medium">Email: </span>
                {appointment.email}
            </div>
            <div>
                <span className="font-medium">Phone: </span>
                {appointment.phone}
            </div>
            <div>
                <span className="font-medium">Date: </span>
                {appointment.date}
            </div>
            <div>
                <span className="font-medium">Time: </span>
                {appointment.time}
            </div>
            <div>
                <span className="font-medium">Reason: </span>
                {appointment.reason}
            </div>
        </CardContent>
    );
};

export default AppointmentDetail;