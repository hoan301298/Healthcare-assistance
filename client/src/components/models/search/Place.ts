import { AccessibilityOptions, DisplayName, Location, OpeningHours, ReviewDetail } from "./Properties";

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
    paymentOptions: any;
    accessibilityOptions?: AccessibilityOptions;
    photos?: any;
    restroom: boolean;
    iconBackgroundColor?: string;
}