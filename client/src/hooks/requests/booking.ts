import { Appointment } from "@/components/models/appointment/Appointment";
import { CreateBookingDTO } from "@/components/models/DTO/CreateBookingDTO";
import axios from "axios";

export const createBooking = async (createBooking: CreateBookingDTO) : Promise<Appointment | null> => {
    if(!createBooking) return null;
    
    try {
        const response = await axios.post('/v2/create', createBooking);
        return response.data;
    } catch (error) {
        console.error("Failed to create appointment:", error);
        return null;
    }
}

export const getBookingById = async (id: string, email: string) : Promise<Appointment | null> => {
    if (!id || !email) return null;

    try {
        const response = await axios.get(`/v2/get-appointment/${email}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Fail to fetch appointment:", error);
        return null;
    }
}

export const getBookingByEmail = async (email: string) : Promise<Appointment[] | null> => {
    if (!email) return null;
    
    try {
        const response = await axios.get(`/v2/`)
    } catch (error) {
        
    }
}