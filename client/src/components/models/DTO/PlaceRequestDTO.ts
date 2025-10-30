import { Location } from "../search/Location";

export interface PlaceRequestDTO {
    location: Location,
    radius: number,
    primaryType: string,
}