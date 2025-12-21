export const getAppointmentStatus = (appointment: { date: string; time: string }) => {
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
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-yellow-100 text-yellow-800",
    completed: "bg-gray-100 text-gray-800",
    unknown: "bg-gray-200 text-gray-500",
};