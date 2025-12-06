import { getDistance } from 'geolib';

export const fields = [
    "id",
    "displayName",
    "internationalPhoneNumber",
    "primaryType",
    "formattedAddress",
    "location",
    "websiteUri",
    "regularOpeningHours",
    "userRatingCount",
    "rating",
    "reviews",
    "paymentOptions",
    "accessibilityOptions",
    "photos",
    "restroom",
];

export const calculateDistance = (currentPosition, hospitalLocation) => {
    return getDistance(currentPosition, hospitalLocation);
}