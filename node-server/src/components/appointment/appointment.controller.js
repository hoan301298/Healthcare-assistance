import { AppointmentService } from "./appointment.service.js";

export class AppointmentController {
    constructor() {
        this.appointmentService = new AppointmentService();

        this.getAppointmentsByAuth = this.getAppointmentsByAuth.bind(this);
    };

    async getAppointmentsByAuth(req, res) {
        const user = req.user;

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const response = await this.appointmentService.getAppointments(user);

        if(!response.success) {
            return res.status(400).json({response});
        };

        return res.status(200).json({response});
    }
}