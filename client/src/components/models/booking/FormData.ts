import { Place } from "../search/Place";

export interface FormData {
    place: Place | null;
    name: string;
    email: string;
    phone: string;
    time: string;
    date: string;
    reason: string;
    notes: string;
}

export const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];