import { AccessibilityOptions, DisplayName, Location, MedicalType, OpeningHours, PaymentOptions, PhotoDetail, ReviewDetail } from "./PlaceProperties";

export interface Place {
    id: string;
    displayName: DisplayName;
    internationalPhoneNumber?: string;
    primaryType: MedicalType;
    formattedAddress: string;
    rating?: number;
    distance: number;
    location: Location;
    websiteUri?: string;
    regularOpeningHours?: OpeningHours;
    userRatingCount?: number;
    reviews?: ReviewDetail[];
    paymentOptions?: PaymentOptions;
    accessibilityOptions?: AccessibilityOptions;
    photos?: PhotoDetail[];
    restroom: boolean;
}
