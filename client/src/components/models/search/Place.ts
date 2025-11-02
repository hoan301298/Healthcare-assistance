import { AccessibilityOptions, DisplayName, Location, OpeningHours, PaymentOptions, PhotoDetail, ReviewDetail } from "./Properties";

export interface Place {
    id: string;
    displayName: DisplayName;
    internationalPhoneNumber?: string;
    primaryType: string;
    formattedAddress: string;
    rating?: number;
    distance: number;
    location: Location;
    websiteUri?: string;
    regularOpeningHours?: OpeningHours;
    userRatingCount?: number;
    reviews?: ReviewDetail[];
    paymentOptions: PaymentOptions;
    accessibilityOptions?: AccessibilityOptions;
    photos?: PhotoDetail[];
    restroom: boolean;
    iconBackgroundColor?: string;
}