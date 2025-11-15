export const getAppointmentStatus = (appointment: { date: string; time: string }) => {
    if (!appointment.date || !appointment.time) return "unknown";

    const now = new Date();
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);

    if (appointmentDateTime > now) return "upcoming";
    if (appointmentDateTime <= now && appointmentDateTime > new Date(now.getTime() - 60 * 60 * 1000)) return "ongoing";
    return "completed";
}

export const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-yellow-100 text-yellow-800",
    completed: "bg-gray-100 text-gray-800",
    unknown: "bg-gray-200 text-gray-500",
};