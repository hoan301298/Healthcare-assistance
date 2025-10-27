import { Location } from "./Location";
import { PlaceDetail } from "./PlaceDetail";

export interface Place {
    id: number;
    detail: PlaceDetail;
    primaryType: string;
    formattedAddress: string;
    rating?: number;
    distance: number;
    location: Location;
}