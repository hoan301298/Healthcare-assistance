import { Place } from "../search/Place";

export interface CreateBookingDTO {
    place: Place;
    name: string;
    email: string;
    phone: string;
    time: string;
    reason: string;
}