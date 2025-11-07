import { Place } from "../search/Place";

export interface FormData {
    place: Place;
    name: string;
    email: string;
    phone: string;
    time: string;
    date: string;
    reason: string;
}