import { Schema } from "mongoose";

const ReviewDetail = {
  authorAttribution: {
    displayName: String,
    photoUri: String,
    uri: String,
  },
  text: {
    text: String,
  },
  rating: Number,
  relativePublishTimeDescription: String
}

const PhotoDetail = {
  name: String,
  heightPx: String,
  widthPx: String
}

export const HospitalSchema = new Schema({
  id: String,

  displayName: {
    text: String,
    languageCode: String
  },
  internationalPhoneNumber: String,
  primaryType: String,
  formattedAddress: String,
  websiteUri: String,
  rating: Number,
  distance: Number,
  userRatingCount: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  regularOpeningHours: {
    weekdayDescriptions: [String],
  },
  reviews: [ReviewDetail],
  paymentOptions: {
    acceptsCreditCards: Boolean,
    acceptsDebitCards: Boolean,
    acceptsCashOnly: Boolean,
    acceptsNfc: Boolean
  },

  accessibilityOptions: {
    wheelchairAccessibleEntrance: Boolean,
    wheelchairAccessibleRestroom: Boolean,
    wheelchairAccessibleParking: Boolean,
    wheelchairAccessibleSeating: Boolean
  },

  photos: [PhotoDetail],
  restroom: Boolean,
}, { _id: false });
