require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    try {
        const selectedAppointment = req.body;

        let transporter = new nodemailer.createTransport({
            host: 'live.smtp.mailtrap.io',
            port: 587,
            secure: false,
            auth: {
                user: 'api',
                pass: process.env.NODEMAILER_API_KEY
            }
        })

        let info = await transporter.sendMail({
        from: 'mailtrap@demomailtrap.com',
        to: 'hoantran301298@gmail.com',
        subject: 'Reservation Successfully',
        html:  `<h5>Reservation Id: ${selectedAppointment.id}</h5>
                <p>Patient Name: ${selectedAppointment.patientName}</p>
                <p>Email: ${selectedAppointment.email}</p>
                <p>Phone: ${selectedAppointment.phone}</p>
                <p>Hospital: ${selectedAppointment.hospital.name}</p>
                <ul>
                    <li>Address: ${selectedAppointment.hospital.address}</li>
                    <li>Phone: ${selectedAppointment.hospital.phoneNumber}</li>
                    <li>Website: <a href=${selectedAppointment.hospital.website}>Visit Website</a></li>
                </ul>
                <p>Booking Time: Date ${selectedAppointment.date} Time: ${selectedAppointment.time}</p>
                <p>Created At: ${selectedAppointment.createdAt}</p>
            `
        });
        console.log(info)
        res.json("Sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = sendEmail;
    