import { Location } from "../location/Location";
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