import { Location } from "./Location";
import { PlaceDetail } from "./PlaceDetail";

export interface Place {
    id: string;
    detail: PlaceDetail;
    primaryType: string;
    formattedAddress: string;
    rating?: number;
    distance: number;
    location: Location;
}