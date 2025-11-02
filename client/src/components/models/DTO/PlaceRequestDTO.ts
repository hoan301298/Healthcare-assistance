import { Location } from "../search/Properties";

export interface PlaceRequestDTO {
    location: Location,
    radius: number,
    primaryType: string,
}