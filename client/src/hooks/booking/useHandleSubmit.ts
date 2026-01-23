import { CreateBookingDTO } from "@/components/models/Dto/CreateBookingDTO";
import { createBooking } from "../requests/booking";
import { useToast } from "../use-toast";
import useBooking from "./useBooking";
import useAppointment from "../appointment/useAppointment";
import { useNavigate } from "react-router-dom";

const useHandleSubmit = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { formData, clearFormData } = useBooking();
    const { setAppointment, setReferenceId, setEmail } = useAppointment();

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            toast({
                title: "Missing Information!",
                description: "Please select a date and time for your appointment.",
                variant: "destructive",
            });
            return;
        }
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast({
                title: "Invalid Phone Number",
                description: "Please enter a valid phone number (digits only, 7–15 characters).",
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await createBooking(formData as CreateBookingDTO);

            if (response) {
                setAppointment(response);
                setReferenceId(response.id);
                setEmail(response.email);
                
                toast({
                    title: "Booking Confirmed!",
                    description: "Your appointment has been successfully scheduled. Check your email for confirmation.",
                });
                clearFormData();

                setTimeout(() => navigate("/appointment"), 500);
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast({
                title: "Error",
                description: "Something went wrong while booking your appointment. Please try again later.",
                variant: "destructive",
            });
        }
    };

    return {
        handleCreateBooking
    }
}

export default useHandleSubmit;