const express = require("express");
const {
  createAppointment,
  getMyAppointments,
  getCounsellorAppointments,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ CRUD for appointments
router.post("/", protect, createAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/counsellor", protect, getCounsellorAppointments);
router.delete("/:id", protect, deleteAppointment);

module.exports = router;
