import { Location } from "../search/PlaceProperties";

export interface PlaceRequestDTO {
    location: Location,
    radius: number,
    primaryType: string,
}