package e2000575.vamk.fi.server.entity;

import lombok.Data;

@Data
public class ReviewDetail {
    private AuthorAttribution authorAttribution;
    private ReviewText text;
    private Float rating;
    private String relativePublishTimeDescription;

    @Data
    public static class AuthorAttribution {
        private String displayName;
        private String photoUri;
        private String uri;
    }

    @Data
    public static class ReviewText {
        private String text;
    }
}
