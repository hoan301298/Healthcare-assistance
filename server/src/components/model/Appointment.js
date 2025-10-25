const { Schema, model } = require('mongoose');

const AppointmentSchema = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    patientName: { type: String, require: true},
    email: { type: String, require: true},
    hospital: { type: Object, require: true},
    phone: { type: String, require: true},
    date: { type: String, require: true},
    time: { type: String, require: true},
    createdAt: { type: Date, default: Date.now()}
})

const AppointmentDetails = new model('appointment_details', AppointmentSchema);

module.exports = AppointmentDetails;