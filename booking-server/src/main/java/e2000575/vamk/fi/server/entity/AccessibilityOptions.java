package e2000575.vamk.fi.server.entity;

import lombok.Data;

@Data
public class AccessibilityOptions {
    private Boolean wheelchairAccessibleEntrance;
    private Boolean wheelchairAccessibleRestroom;
    private Boolean wheelchairAccessibleParking;
    private Boolean wheelchairAccessibleSeating;
}
