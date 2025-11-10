import { CreateBookingDTO } from "@/components/models/DTO/CreateBookingDTO";
import axios from "axios";

export const createBooking = async (createBooking: CreateBookingDTO) : Promise<FormData | null> => {
    if(!createBooking) return null;
    
    try {
        const response = await axios.post('/v2/create', createBooking);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Failed to create appointment:", error);
        return null;
    }
}