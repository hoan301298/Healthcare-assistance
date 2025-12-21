import AppointmentModel from "../../model/Appointment.schema.js";
import { decrypt } from "../helper/cryptoFunctions.js";

export class AppointmentService {
    constructor(appointmentModel = AppointmentModel) {
        this.AppointmentModel = appointmentModel;
    }

    async getAppointments(user) {
        if (!user.hashedEmail) {
            return {
                success: false,
                message: "NOT FOUND"
            }
        };

        const appointments = await this.AppointmentModel
            .find({ hashedEmail: user.hashedEmail })
            .lean();

        if (!appointments) {
            return {
                success: false,
                message: "NOT FOUND"
            }
        };

        const result = appointments.map(app => ({
            ...app,
            email: decrypt(app.encryptedEmail),
        }));

        return {
            success: true,
            message: `Found ${result.length} appointments`,
            data: result,
        }
    }
}