import { Place } from "../search/Place";

export interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    time: string;
    date: string;
    reason: string;
    notes: string;
    createAt: string;
    place: Place;
}