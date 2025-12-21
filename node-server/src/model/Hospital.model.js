export class Hospital {
    constructor(data = {}) {
        this.id = data.id ?? null;
        this.displayName = data.displayName ? new Hospital.DisplayName(data.displayName) : null;
        this.internationalPhoneNumber = data.internationalPhoneNumber ?? null;
        this.primaryType = data.primaryType ?? null;
        this.formattedAddress = data.formattedAddress ?? null;
        this.websiteUri = data.websiteUri ?? null;
        this.rating = data.rating ?? null;
        this.distance = data.distance ?? null;
        this.userRatingCount = data.userRatingCount ?? null;
        this.location = data.location ? new Hospital.Location(data.location) : null;
        this.regularOpeningHours = data.regularOpeningHours
            ? new Hospital.OpeningHours(data.regularOpeningHours)
            : null;
        this.reviews = data.reviews
            ? data.reviews.map(r => new Hospital.ReviewDetail(r))
            : [];
        this.paymentOptions = data.paymentOptions
            ? new Hospital.PaymentOptions(data.paymentOptions)
            : null;
        this.accessibilityOptions = data.accessibilityOptions
            ? new Hospital.AccessibilityOptions(data.accessibilityOptions)
            : null;
        this.photos = data.photos
            ? data.photos.map(p => new Hospital.PhotoDetail(p))
            : [];
        this.restroom = data.restroom ?? null;
    }
}

Hospital.Location = class {
    constructor(data = {}) {
        this.latitude = data.latitude ?? null;
        this.longitude = data.longitude ?? null;
    }
};

Hospital.OpeningHours = class {
    constructor(data = {}) {
        this.weekdayDescriptions = data.weekdayDescriptions ?? [];
    }
};

Hospital.DisplayName = class {
    constructor(data = {}) {
        this.text = data.text ?? null;
        this.languageCode = data.languageCode ?? null;
    }
};

Hospital.ReviewDetail = class {
    constructor(data = {}) {
        this.authorName = data.authorName ?? null;
        this.rating = data.rating ?? null;
        this.text = data.text ?? null;

        this.authorAttributions = Array.isArray(data.authorAttributions)
            ? data.authorAttributions.map(a => new Hospital.ReviewAuthorAttribution(a))
            : [];
    }
};

Hospital.PhotoDetail = class {
    constructor(data = {}) {
        this.name = data.name ?? null;
        this.widthPx = data.widthPx ?? null;
        this.heightPx = data.heightPx ?? null;
    }
};

Hospital.PaymentOptions = class {
    constructor(data = {}) {
        this.acceptsCreditCards = data.acceptsCreditCards ?? null;
        this.acceptsCashOnly = data.acceptsCashOnly ?? null;
        this.acceptsDebitCards = data.acceptsDebitCards ?? null;
        this.acceptsNfc = data.acceptsNfc ?? null;
    }
};

Hospital.AccessibilityOptions = class {
    constructor(data = {}) {
        this.wheelchairAccessibleEntrance = data.wheelchairAccessibleEntrance ?? null;
        this.wheelchairAccessibleRestroom = data.wheelchairAccessibleRestroom ?? null;
        this.wheelchairAccessibleParking = data.wheelchairAccessibleParking ?? null;
        this.wheelchairAccessibleSeating = data.wheelchairAccessibleSeating ?? null;
    }
};

Hospital.ReviewAuthorAttribution = class {
    constructor(data = {}) {
        this.displayName = data.displayName ?? null;
        this.photoUri = data.photoUri ?? null;
        this.uri = data.uri ?? null;
    }
};