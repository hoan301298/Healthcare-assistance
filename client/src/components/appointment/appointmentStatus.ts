import { Appointment } from "../models/appointment/Appointment";

export const getAppointmentStatus = (appointment: { date: string; time: string }): string => {
    if (!appointment.date || !appointment.time) return "unknown";

    const now = new Date();

    const date = new Date(appointment.date);

    const [time, modifier] = appointment.time.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    date.setHours(hours, minutes, 0, 0);

    const appointmentDateTime = date;

    if (appointmentDateTime > now) return "upcoming";

    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    if (appointmentDateTime <= now && appointmentDateTime > oneHourAgo) {
        return "ongoing";
    }

    return "completed";
};

export const sortAppointmentDateTime = (appointments: Appointment[]): Appointment[] => {
    return [...appointments].sort((a, b) => {
        const statusA = getAppointmentStatus(a);
        const statusB = getAppointmentStatus(b);

        const priority = {
            upcoming: 0,
            ongoing: 1,
            completed: 2,
            unknown: 3,
        };

        if (priority[statusA] !== priority[statusB]) {
            return priority[statusA] - priority[statusB];
        }

        const dateA = getAppointmentDateTime(a);
        const dateB = getAppointmentDateTime(b);

        if (!dateA || !dateB) return 0;

        if (statusA === "upcoming" || statusA === "ongoing") {
            return dateA.getTime() - dateB.getTime();
        }

        if (statusA === "completed") {
            return dateB.getTime() - dateA.getTime();
        }

        return 0;
    });
};

const getAppointmentDateTime = (appointment: Appointment): Date | null => {
    if (!appointment.date || !appointment.time) return null;

    const date = new Date(appointment.date);

    const [time, modifier] = appointment.time.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    date.setHours(hours, minutes, 0, 0);
    return date;
};

export const statusColors: Record<string, string> = {
    upcoming: "bg-success/10 text-success border-success/20",
    ongoing: "bg-warning/10 text-warning border-warning/20",
    completed: "bg-muted text-muted-foreground border-muted",
    unknown: "bg-destructive/10 text-destructive border-destructive/20",
};