package e2000575.vamk.fi.server.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Hospital {
    private String id;
    private DisplayName displayName;
    private String internationalPhoneNumber;
    private String primaryType;
    private String formattedAddress;
    private String websiteUri;
    private Float rating;
    private float distance;
    private Integer userRatingCount;
    private Location location;
    private OpeningHours regularOpeningHours;
    private List<ReviewDetail> reviews;
    private PaymentOptions paymentOptions;
    private AccessibilityOptions accessibilityOptions;
    private List<PhotoDetail> photos;
    private Boolean restroom;

    @Data
    public static class Location {
        private Double latitude;
        private Double longitude;
    }

    @Data
    public static class OpeningHours {
        private List<String> weekdayDescriptions;
    }

    @Data
    public static class DisplayName {
        private String text;
        private String languageCode;
    }
}