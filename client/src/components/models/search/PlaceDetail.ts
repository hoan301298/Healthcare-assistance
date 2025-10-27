import { OpeningHours } from "./OpeningHours";

export interface PlaceDetail {
    international_phone_number: string;
    name: string;
    opening_hours?: OpeningHours;
    user_ratings_total?: number;
    website?: string;
}