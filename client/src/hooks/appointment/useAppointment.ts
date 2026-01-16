import { Appointment } from "@/components/models/appointment/Appointment";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";
import { setFilters } from "@/state/appointmentSlice";
import { AppDispatch, RootState } from "@/state/store"
import { getAllAppointmentByAuth } from "@/state/thunks/appointmentThunks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const useAppointment = () => {
    const appointmentState = useSelector((state: RootState) => state.appointment);
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const setReferenceId = (id: string) => {
        dispatch(setFilters({ referenceId: id }));
    }

    const setEmail = (email: string) => {
        dispatch(setFilters({ email: email }));
    }

    const setAppointment = (appointment: Appointment) => {
        dispatch(setFilters({ singleAppointment: appointment }));
    }

    const removeAppointmentById = useCallback((id: String) => {
        dispatch(setFilters({ 
            authAppointments: appointmentState
                .authAppointments
                .filter(app => app.id !== id)}))
    }, [dispatch, appointmentState.authAppointments]);

    const clearAuthAppointments = () => {
        dispatch(setFilters({ authAppointments: null }));
    }

    const getAllAppointments = async (): Promise<AppointmentsResponseDto> => {
        const result = await dispatch(getAllAppointmentByAuth());

        if (getAllAppointmentByAuth.fulfilled.match(result)) {
            return result.payload;
        } else {
            return {
                success: false,
                message: result.payload
            };
        }
    }

    return {
        singleAppointment: appointmentState.singleAppointment,
        authAppointments: appointmentState.authAppointments,
        email: appointmentState.email,
        referenceId: appointmentState.referenceId,

        getAllAppointments,
        setReferenceId,
        setEmail,
        setAppointment,
        removeAppointmentById,
        clearAuthAppointments
    }
}

export default useAppointment;