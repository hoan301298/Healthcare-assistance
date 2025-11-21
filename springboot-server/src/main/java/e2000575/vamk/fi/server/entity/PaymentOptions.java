package e2000575.vamk.fi.server.entity;

import lombok.Data;

@Data
public class PaymentOptions {
    private Boolean acceptsCashOnly;
    private Boolean acceptsCreditCards;
    private Boolean acceptsDebitCards;
    private Boolean acceptsNfc;
}