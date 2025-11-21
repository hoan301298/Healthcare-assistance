import { FormData } from "@/components/models/booking/FormData";
import { clearBookingForm, setBookingForm } from "@/state/bookingSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useBooking = () => {
    const formData = useSelector((state: RootState) => state.booking.formData);
    const dispatch = useDispatch();

    const setFormData = (form: FormData) => {
        dispatch(setBookingForm(form));
    }

    const clearFormData = () => {
        dispatch(clearBookingForm());
    }

    return {
        formData,
        setFormData,
        clearFormData,
    }
}

export default useBooking;