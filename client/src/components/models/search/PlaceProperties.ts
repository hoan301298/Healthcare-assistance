export enum RadiusType {
    R1000 = '1 km',
    R3000 = '3 km',
    R5000 = '5 km',
    R10000 = '10 km',
}

export interface OpeningHours {
    openNow?: boolean;
    periods?: OnpeningHoursPeriod[];
    weekdayDescriptions?: string[];
    nextCloseTime?: string;
}

interface OnpeningHoursPeriod {
    close: { day: number, time: number };
    open: { day: number, time: number };
}

export enum MedicalType {
    hospital = 'Hospital',
    dental_clinic = 'Dental Clinic',
    physiotherapist = 'Physiotherapist',
    drugstore = 'Drug Store',
    chiropractor = 'Chiropractor',
    pharmacy = 'Pharmacy',
}

export interface MapLocation {
    center: google.maps.LatLngLiteral,
    zoom: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface DisplayName {
    text: string;
    languageCode: string;
}

export interface ReviewDetail {
    authorAttribution: {
        displayName: string;
        photoUri: string;
        uri: string;
    };
    text: {
        text: string;
    };
    rating: number;
    relativePublishTimeDescription: string;
}

export interface AccessibilityOptions {
    wheelchairAccessibleEntrance: boolean;
    wheelchairAccessibleRestroom?: boolean;
    wheelchairAccessibleParking?: boolean;
    wheelchairAccessibleSeating?: boolean;
}

export interface PaymentOptions {
    acceptsCashOnly: boolean;
    acceptsCreditCards?: boolean;
    acceptsDebitCards?: boolean;
    acceptsNfc?: boolean;
}

export interface PhotoDetail {
    name: string;
    heightPx: string;
    widthPx: string;
}

export enum Filter {
    distance = "Distance",
    rating = "Rating",
    review = "Reviews"
}