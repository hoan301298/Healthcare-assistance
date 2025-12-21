import { model, Schema } from "mongoose";
import { Hospital } from "./Hospital.schema.js";

const appointmentSchema = new Schema({
    name: { type: String, required: true },
    hashedEmail: { type: String, required: true},
    encryptedEmail: { type: String, required: true},
    hospital: { type: Hospital, required: true},
    phone: { type: String, required: true},
    date: { type: String, required: true},
    time: { type: String, required: true},
    reason: { type: String, required: true},
    notes: { type: String, required: true},
}, { timestamps: true });

const AppointmentSchema = new model('appointments', appointmentSchema);

export default AppointmentSchema;