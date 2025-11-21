import { Appointment } from "@/components/models/appointment/Appointment";
import { setFilters } from "@/state/appointmentSlice";
import { RootState } from "@/state/store"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useAppointment = () => {
    const appointment = useSelector((state: RootState) => state.appointment);
    const dispatch = useDispatch();

    const setReferenceId = (id: string) => {
        dispatch(setFilters({ referenceId: id }));
    }

    const setEmail = (email: string) => {
        dispatch(setFilters({ email: email }));
    }

    const setAppointment = (appointment: Appointment) => {
        dispatch(setFilters({ fetchedAppointment: appointment }));
    }

    return {
        appointment,
        setReferenceId,
        setEmail,
        setAppointment
    }
}

export default useAppointment;