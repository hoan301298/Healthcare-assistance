export const getAppointmentStatus = (appointment: { date: string; time: string }) : string => {
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

export const statusColors: Record<string, string> = {
    upcoming: "bg-success/10 text-success border-success/20",
    ongoing: "bg-warning/10 text-warning border-warning/20",
    completed: "bg-muted text-muted-foreground border-muted",
    unknown: "bg-destructive/10 text-destructive border-destructive/20",
};