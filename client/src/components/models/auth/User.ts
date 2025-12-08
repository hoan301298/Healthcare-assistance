import { Appointment } from "../appointment/Appointment";

export interface User {
    id: string;
    email: string;
    name: string;
    appointments: Appointment[] | null;
}