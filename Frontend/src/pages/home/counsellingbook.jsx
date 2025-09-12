import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/inputs/input";

const COUNSELLORS = [
  { id: "c1", name: "Dr. Meena" },
  { id: "c2", name: "Dr. Sharma" },
  { id: "c3", name: "Dr. Khan" },
];

const SERVICES = [
  { id: "consult", name: "Consultation", durationMins: 30 },
  { id: "therapy", name: "Therapy Session", durationMins: 60 },
  { id: "followup", name: "Follow-up", durationMins: 20 },
];

const BUSINESS_HOURS = {
  start: "09:00",
  end: "18:00",
  breaks: [{ start: "13:00", end: "14:00" }],
  slotMins: 30,
};

const STORAGE_KEY = "multiuser_appointments";

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function pad2(n) {
  return String(n).padStart(2, "0");
}
function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${pad2(h)}:${pad2(m)}`;
}
function generateSlots({ start, end, slotMins, breaks = [] }) {
  const slots = [];
  let cur = toMinutes(start);
  const endMin = toMinutes(end);
  while (cur < endMin) {
    const t = minutesToTime(cur);
    const inBreak = breaks.some(
      (b) => toMinutes(b.start) <= cur && cur < toMinutes(b.end)
    );
    if (!inBreak) slots.push(t);
    cur += slotMins;
  }
  return slots;
}
function todayYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function loadAppointments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveAppointments(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// --- Field Component (label + spacing + error msg) ---
function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div>{children}</div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export default function AppointmentBooking() {
  const [step, setStep] = useState(1);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    serviceId: SERVICES[0].id,
    date: todayYMD(),
    time: "",
    notes: "",
  });
  const [appointments, setAppointments] = useState(loadAppointments());
  const [errors, setErrors] = useState({});
  const [filterDate, setFilterDate] = useState(todayYMD());

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const availableSlots = useMemo(() => {
    const base = generateSlots(BUSINESS_HOURS);
    const now = new Date();
    const isToday = form.date === todayYMD();
    return base.filter((t) => {
      if (!isToday) return true;
      const [h, m] = t.split(":").map(Number);
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      return slotDate.getTime() > now.getTime();
    });
  }, [form.date]);

  const bookedTimesForDate = useMemo(() => {
    return appointments
      .filter(
        (a) => a.date === form.date && a.counsellorId === selectedCounsellor?.id
      )
      .map((a) => a.time);
  }, [appointments, form.date, selectedCounsellor]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (a) => a.date === filterDate && a.counsellorId === selectedCounsellor?.id
    );
  }, [appointments, filterDate, selectedCounsellor]);

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!/^\+?[0-9\-()\s]{7,}$/.test(form.phone))
      e.phone = "Valid phone required";
    if (!form.date) e.date = "Pick a date";
    if (!form.time) e.time = "Pick a time";
    if (form.time && bookedTimesForDate.includes(form.time))
      e.time = "This slot is booked";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const service = SERVICES.find((s) => s.id === form.serviceId);
    const appt = {
      id: crypto.randomUUID(),
      ...form,
      counsellorId: selectedCounsellor.id,
      counsellorName: selectedCounsellor.name,
      serviceName: service?.name,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, appt]);
    setForm((f) => ({ ...f, time: "", notes: "" }));
    setStep(3);
  }

  function removeAppointment(id) {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="flex justify-center items-center">
    <div className="h-100 w-300 flex items-center justify-between bg-[rgb(86,5,125,0.3)] rounded-3xl  px-4 py-10">
      <div className="mx-auto flex justify-center items-center">
        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {COUNSELLORS.map((c) => (
              <div
                key={c.id}
                className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold mb-4">{c.name}</h2>
                <button
                  onClick={() => {
                    setSelectedCounsellor(c);
                    setStep(2);
                  }}
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white transition"
                >
                  Book with {c.name}
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && selectedCounsellor && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border max-w-2xl mx-auto"
          >
            <div className="p-8">
              <h1 className="text-2xl font-semibold text-indigo-700 mb-4">
                Book Appointment with {selectedCounsellor.name}
              </h1>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Field label="Username" error={errors.username}>
                  <Input
                    type="text"
                    className="input-box"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </Field>
                <Field label="Full Name" error={errors.name}>
                  <Input
                    type="text"
                    className="input-box"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <Input
                    type="email"
                    className="input-box"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <Input
                    type="tel"
                    className="input-box"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </Field>
                <Field label="Service">
                  <select
                    className="input-box"
                    value={form.serviceId}
                    onChange={(e) =>
                      setForm({ ...form, serviceId: e.target.value })
                    }
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date" error={errors.date}>
                  <Input
                    type="date"
                    className="input-box"
                    min={todayYMD()}
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value, time: "" })
                    }
                  />
                </Field>
                <Field label="Time" error={errors.time}>
                  <select
                    className="input-box"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  >
                    <option value="">Select</option>
                    {availableSlots.map((t) => (
                      <option
                        key={t}
                        value={t}
                        disabled={bookedTimesForDate.includes(t)}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Notes">
                  <textarea
                    className="input-box border border-black/10 min-h-[80px] resize-y"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />
                </Field>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg border border-indigo-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && selectedCounsellor && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border"
          >
            <div className="p-8">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                Schedule for {selectedCounsellor.name} ({filterDate})
              </h2>
              <Input
                type="date"
                className="input-box mt-3"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <div className="mt-5 space-y-3">
                {filteredAppointments.length === 0 && (
                  <p className="text-sm text-slate-500">No appointments</p>
                )}
                {filteredAppointments.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 bg-white rounded-lg border flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {a.time} — {a.serviceName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {a.username} ({a.name})
                      </p>
                    </div>
                    <button
                      onClick={() => removeAppointment(a.id)}
                      className="px-3 py-1 text-sm border border-rose-500 text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                >
                  Choose another counsellor
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-lg border border-indigo-700 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-90 transition"
                >
                  Book again
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </div>
  );
}
