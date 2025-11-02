import { Place } from "@/components/models/search/Place"
import { CardContent } from "@/components/ui/card";
import { Accessibility, Clock, CreditCard } from "lucide-react";

const ServiceInfo: React.FC<{ place: Place }> = ({ place }) => {
    const payment = place.paymentOptions ?? null;
    const accessibility = place.accessibilityOptions ?? null;
    const openingHours = place.regularOpeningHours ?? null
    return (
        <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-medium mb-2">
                        Now:{" "}
                        {openingHours?.openNow === undefined
                            ? "No Information"
                            : place.regularOpeningHours.openNow
                                ? "Open"
                                : "Closed"}
                    </p>
                    {openingHours?.weekdayDescriptions?.map(
                        (desc, i) => (
                            <p
                                key={i}
                                className="text-sm text-muted-foreground whitespace-pre-line mb-1"
                            >
                                {desc}
                            </p>
                        )
                    )}
                </div>
            </div>
            {/* Accessibility */}
            {accessibility && (
                <div className="flex items-start gap-3">
                    <Accessibility className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium mb-2">Accessibility</p>
                        <p className="text-sm text-muted-foreground mb-1">
                            {accessibility?.wheelchairAccessibleEntrance === true
                                ? "✅ Wheelchair accessible entrance"
                                : accessibility?.wheelchairAccessibleEntrance === false
                                    ? "❌ No wheelchair accessible entrance"
                                    : ""}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                            {accessibility?.wheelchairAccessibleParking === true
                                ? "✅ Wheelchair accessible parking"
                                : accessibility?.wheelchairAccessibleParking === false
                                    ? "❌ No wheelchair accessible parking"
                                    : ""}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                            {accessibility?.wheelchairAccessibleRestroom === true
                                ? "✅ Wheelchair accessible restroom"
                                : accessibility?.wheelchairAccessibleRestroom === false
                                    ? "❌ No wheelchair accessible restroom"
                                    : ""}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {accessibility?.wheelchairAccessibleSeating === true
                                ? "✅ Wheelchair accessible seating"
                                : accessibility?.wheelchairAccessibleSeating === false
                                    ? "❌ No wheelchair accessible seating"
                                    : ""}
                        </p>
                    </div>
                </div>
            )}

            {/* Payment Options */}
            {payment && (
                <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium mb-2">Payment Options</p>

                        <p className="text-sm text-muted-foreground mb-1">
                            {payment?.acceptsCashOnly === true
                                ? "✅ Cash only"
                                : payment?.acceptsCashOnly === false
                                    ? "✅ Accepts multiple payment methods"
                                    : "ℹ️ Cash-only status unknown"}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                            {payment?.acceptsCreditCards === true
                                ? "✅ Accepts credit cards"
                                : payment?.acceptsCreditCards === false
                                    ? "❌ Does not accept credit cards"
                                    : ""}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                            {payment?.acceptsDebitCards === true
                                ? "✅ Accepts debit cards"
                                : payment?.acceptsDebitCards === false
                                    ? "❌ Does not accept debit cards"
                                    : ""}
                        </p>

                        <p className="text-sm text-muted-foreground mb-1">
                            {payment?.acceptsNfc === true
                                ? "✅ Accepts contactless (NFC) payments"
                                : payment?.acceptsNfc === false
                                    ? "❌ No contactless (NFC) payments"
                                    : ""}
                        </p>
                    </div>
                </div>
            )}
        </CardContent>
    )
}

export default ServiceInfo;