import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const BookingSection: React.FC<{ id: string }> = ({ id }) => {
    return (
        <Card className="border-border bg-gradient-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Book an Appointment
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Schedule your visit with this facility
                </p>
                <Link to={`/booking/${id}`}>
                    <Button className="w-full bg-primary hover:bg-primary-dark">
                        Book Now
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default BookingSection;