import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { createBooking, getBookingById } from "@/hooks/requests/booking";
import { CreateBookingDTO } from "../components/models/DTO/CreateBookingDTO";
import useBooking from "@/hooks/useBooking";
import useAppointment from "@/hooks/useAppointment";

export function useHandleBookingAction() {
    const navigate = useNavigate();
    const { formData, clearFormData } = useBooking();
    const { 
        appointment,
        setAppointment,
        setEmail,
        setReferenceId
    } = useAppointment();

    const handleCreateBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.date || !formData.time) {
            toast({
                title: "Missing Information",
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
                toast({
                    title: "Booking Confirmed!",
                    description:
                        "Your appointment has been successfully scheduled. Check your email for confirmation.",
                });
                clearFormData();

                setTimeout(() => navigate("/appointment-detail"), 1500);
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast({
                title: "Error",
                description:
                    "Something went wrong while booking your appointment. Please try again later.",
                variant: "destructive",
            });
        }
    };

    const handleSearchBooking = async (e: React.FormEvent, setIsLoading: (state: boolean) => void) => {
        e.preventDefault();
        
        if(!appointment.email || !appointment.referenceId) return;

        try {
            setIsLoading(true);
            const response = await getBookingById(appointment.referenceId, appointment.email);
            console.log(response);
            if (response) {
                setAppointment(response);
                toast({
                    title: "Appointment Found!",
                    description: "You can print out the appointment or update it."
                })
            } else {
                toast({
                    title: "Couldn't find your appointment!",
                    description: "Please try again with *Reference Number* and *Email*. Make sure all the fields are correct.",
                    variant: "destructive"
                })
                return null;
            }
        } catch (error) {
            console.error("Error to fetch appointment", error);
            toast({
                title: "Couldn't find your appointment!",
                description: "Please try again with *Reference Number* and *Email*. Make sure all the fields are correct.",
                variant: "destructive"
            })
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        handleCreateBooking,
        handleSearchBooking
    };
}