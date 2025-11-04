import { clearFilters } from "@/state/bookingSlice";
import { setFilters } from "@/state/searchSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useBooking = () => {
    const booking = useSelector((state: RootState) => state.booking);
    const dispatch = useDispatch();

    const setBookingForm = (form: FormData) => {
        dispatch(setFilters({ formData: form }));
    }

    const clearData = () => {
        dispatch(clearFilters());
    }

    return {
        booking,
        setBookingForm,
        clearData,
    }
}

export default useBooking;