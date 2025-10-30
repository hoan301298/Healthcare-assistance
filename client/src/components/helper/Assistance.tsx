import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

const Assistance = () => {
    return (
        <Card className="border-border">
            <CardHeader>
                <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Have questions? Chat with our support team
                </p>
                <Link to="/chat">
                    <Button variant="outline" className="w-full">
                        Chat with Us
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default Assistance;