import { toast } from "@/components/ui/use-toast";
import { getBookingById } from "@/hooks/requests/booking";
import useAppointment from "@/hooks/appointment/useAppointment";

const useHandleAction = () => {
    const { 
        email,
        referenceId,
        setAppointment,
    } = useAppointment();

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

    const handleDelete = () => {
        
    }

    return { 
        handleSearch
    };
}

export default useHandleAction;