import { Appointment } from "@/components/models/appointment/Appointment";
import { AppointmentsResponseDto } from "@/components/models/appointment/AppointmentsResponseDto";
import { AppointmentRequestDto } from "@/components/models/Dto/AppointmentDeleteRequestDto";
import { setFilters } from "@/state/appointmentSlice";
import { AppDispatch, RootState } from "@/state/store"
import { deleteAppointmentByAuth, getAllAppointmentByAuth } from "@/state/thunks/appointmentThunks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { toast } from "../use-toast";

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

    const deleteAppointment = async ({ 
        email, 
        id 
    }: AppointmentRequestDto): Promise<void> => {
        const result = await dispatch(deleteAppointmentByAuth({ email, id }));

        if (deleteAppointmentByAuth.fulfilled.match(result)) {
            removeAppointmentById(id);
            toast({
                title: `Delete appointment with ID ${id} successfully`,
                variant: "default"
            })
        } else {
            toast({
                title: `Fail to delete appointment with ID ${id}`,
                description: "Try again!",
                variant: "destructive"
            })
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
        deleteAppointment,
        clearAuthAppointments
    }
}

export default useAppointment;