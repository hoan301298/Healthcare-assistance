export class AppointmentController {
    constructor(AppointmentService) {
        if(!AppointmentService) {
            throw new Error("AppointmentService is required");
        }
        this.AppointmentService = AppointmentService;
    };

    async getAppointmentsByAuth(req, res) {
        const user = req.user;

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const response = await this.AppointmentService.getAppointments(user);

        if(!response.success) {
            return res.status(400).json({response});
        };

        return res.status(200).json({response});
    }
}