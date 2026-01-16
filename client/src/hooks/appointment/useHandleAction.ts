import { toast } from "@/components/ui/use-toast";
import { getBookingById } from "@/hooks/requests/booking";
import useAppointment from "@/hooks/appointment/useAppointment";
import { AppointmentRequestDto } from "@/components/models/Dto/AppointmentDeleteRequestDto";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";
import useAuth from "../auth/useAuth";

const useHandleAction = () => {
    const { 
        email,
        referenceId,
        setAppointment,
        removeAppointmentById
    } = useAppointment();

    const {
        checkAuth,
    } = useAuth();

    const handleSearch = async (e: React.FormEvent, setIsLoading: (state: boolean) => void) => {
        e.preventDefault();
        
        if(!email || !referenceId) return;

        try {
            setIsLoading(true);
            const response = await getBookingById(referenceId, email);
            
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
                    variant: "destructive",
                })
                return null;
            }
        } catch (error) {
            console.error("Error to fetch appointment", error);
            toast({
                title: "Couldn't find your appointment!",
                description: "Please try again with *Reference Number* and *Email*. Make sure all the fields are correct.",
                variant: "destructive",
            })
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (appointmentDetail: AppointmentRequestDto) : Promise<void> => {
        if (!appointmentDetail.email || !appointmentDetail.id) {
            toast({
                title: "Appointment is not found",
                description: "Failed to delete the appointment!",
                variant: "destructive"
            });
            return null;
        }

        const response = await checkAuth();

        if (!response.success) {
            toast({
                title: "You have no right to delete!",
                description: "Failed to delete the appointment!",
                variant: "destructive"
            });
            return null;
        }

        if (response.data) {
            removeAppointmentById(appointmentDetail.id);
        }
    }

    return { 
        handleSearch,
        handleDelete
    };
}

export default useHandleAction;