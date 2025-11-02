import { Card, CardHeader, CardTitle } from "../ui/card";
import { Place } from "../models/search/Place";
import ContactInfo from "./content/ContactInfo";
import ServiceInfo from "./content/ServiceInfo";

const SideBar: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <Card className="border-border">
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <ContactInfo place={place}/>

            <CardHeader>
                <CardTitle>Services</CardTitle>
            </CardHeader>
            <ServiceInfo place={place}/>
        </Card>
    );
};

export default SideBar;