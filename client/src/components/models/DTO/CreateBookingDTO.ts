import { Place } from "../search/Place";

export interface CreateBookingDTO {
    hospital: Place;
    name: string;
    email: string;
    phone: string;
    time: string;
    date: string;
    reason: string;
    notes: string;
}