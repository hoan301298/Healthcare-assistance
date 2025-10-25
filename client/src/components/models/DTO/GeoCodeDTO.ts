export interface GeoCodeResponseDTO {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    formatted_address: string;
}