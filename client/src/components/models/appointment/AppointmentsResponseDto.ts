import { Appointment } from "./Appointment";

/**
 * description:
 * This interface is used for the Dto of get all Appointments
 * with auth from API v1
 */
export interface AppointmentsResponseDto {
    success: boolean;
    message: string;
    appointments?: Appointment[];
}