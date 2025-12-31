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
            .find({ hashedEmail: user.hashedEmail });

        if (!appointments || appointments.length === 0) {
            return {
                success: false,
                message: "No appointments found",
                data: []
            };
        }

        const result = appointments.map(app => {
            const plainApp = app.toObject();
            plainApp.id = plainApp._id;

            delete plainApp._id;
            delete plainApp._class;
            delete plainApp.$__;
            delete plainApp.$isNew;
            try {
                plainApp.email = decrypt(plainApp.encryptedEmail);
            } catch (err) {
                plainApp.email = null;
            }
            delete plainApp.hashedEmail;
            delete plainApp.encryptedEmail;
            return plainApp;
        });

        return {
            success: true,
            message: `Found ${result.length} appointments`,
            data: result,
        }
    }
}