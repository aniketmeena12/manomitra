const Appointment = require("../models/appointmentModel");

// ✅ Create appointment
const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      user: req.user._id, // link to logged in user
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get appointments for logged-in user
const getMyAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ user: req.user._id });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get counsellor’s schedule by date
const getCounsellorAppointments = async (req, res) => {
  try {
    const { counsellorId, date } = req.query;
    const appts = await Appointment.find({ counsellorId, date });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: "Not found" });

    if (appt.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await appt.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getCounsellorAppointments,
  deleteAppointment,
};
