const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },   // student’s username
    name: { type: String, required: true },       // student’s full name
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    counsellorId: { type: String, required: true },
    counsellorName: { type: String, required: true },
    date: { type: String, required: true },       // YYYY-MM-DD
    time: { type: String, required: true },       // HH:mm
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
