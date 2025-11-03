export interface MapLocation {
    center: google.maps.LatLngLiteral,
    zoom: number;
}

export enum Filter {
    distance = "Distance",
    rating = "Rating",
    review = "Reviews"
}

export enum RadiusType {
    R1000 = '1 km',
    R3000 = '3 km',
    R5000 = '5 km',
    R10000 = '10 km',
}