import { model, Schema } from "mongoose";
import { HospitalSchema } from "./Hospital.schema.js";

const AppointmentSchema = new Schema({
    name: { type: String, required: true },
    hashedEmail: { type: String, required: true},
    encryptedEmail: { type: String, required: true},
    hospital: { 
        type: HospitalSchema,
        required: true
    },
    phone: { type: String, required: true},
    date: { type: String, required: true},
    time: { type: String, required: true},
    reason: { type: String, required: true},
    notes: { type: String, required: true},
    createdAt: { type: Date, required: true},
}, { timestamps: true });

const AppointmentModel = new model('appointments', AppointmentSchema);

export default AppointmentModel;