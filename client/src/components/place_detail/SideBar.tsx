import { Card, CardHeader, CardTitle } from "../ui/card";
import { Place } from "../models/search/Place";
import ContactInfo from "./content/ContactInfo";
import ServiceInfo from "./content/ServiceInfo";

interface SideBarProps {
    place: Place;
    modal?: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ place, modal = false }) => {
    return (
        <Card className={`flex flex-col border-border ${modal ? "h-full max-h-[90vh] overflow-y-auto" : ""}`}>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <ContactInfo place={place} />

            <CardHeader>
                <CardTitle>Services</CardTitle>
            </CardHeader>
            <ServiceInfo place={place} />
        </Card>
    );
};

export default SideBar;