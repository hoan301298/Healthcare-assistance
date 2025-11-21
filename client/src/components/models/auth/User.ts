import { Appointment } from "../appointment/Appointment";

export interface User {
    id: string;
    email: string;
    username: string;
    phone: string;
    appointments: Appointment[] | null;
    token: string;
    tokenExpiredTime: number;
}