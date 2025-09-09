import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Appointment booking with multiple counsellors
// Step 1: User selects a counsellor
// Step 2: User fills appointment form
// Step 3: Appointment schedule is shown

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
  const [h, m] = t.split(":" ).map(Number);
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
    const inBreak = breaks.some((b) => toMinutes(b.start) <= cur && cur < toMinutes(b.end));
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

function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export default function AppointmentBooking() {
  const [step, setStep] = useState(1); // 1: choose counsellor, 2: form, 3: schedule
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
  const [confirm, setConfirm] = useState(null);
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
      const [h, m] = t.split(":" ).map(Number);
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      return slotDate.getTime() > now.getTime();
    });
  }, [form.date]);

  const bookedTimesForDate = useMemo(() => {
    return appointments
      .filter((a) => a.date === form.date && a.counsellorId === selectedCounsellor?.id)
      .map((a) => a.time);
  }, [appointments, form.date, selectedCounsellor]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => a.date === filterDate && a.counsellorId === selectedCounsellor?.id);
  }, [appointments, filterDate, selectedCounsellor]);

  function validate() {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\+?[0-9\-()\s]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.date) e.date = "Pick a date";
    if (!form.time) e.time = "Pick a time";
    if (form.time && bookedTimesForDate.includes(form.time)) e.time = "This slot is booked";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
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
    setConfirm(appt);
    setForm((f) => ({ ...f, time: "", notes: "" }));
    setStep(3);
  }

  function removeAppointment(id) {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Step 1: Choose counsellor */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUNSELLORS.map((c) => (
              <div key={c.id} className="p-6 bg-white rounded-2xl shadow border flex flex-col justify-between">
                <h2 className="text-lg font-semibold mb-4">{c.name}</h2>
                <button onClick={() => { setSelectedCounsellor(c); setStep(2); }} className="px-4 py-2 bg-black text-white rounded-lg">Book with {c.name}</button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 2: Booking Form */}
        {step === 2 && selectedCounsellor && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl font-semibold">Book Appointment with {selectedCounsellor.name}</h1>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Field label="Username" error={errors.username}>
                  <input type="text" className="input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </Field>
                <Field label="Full Name" error={errors.name}>
                  <input type="text" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </Field>
                <Field label="Service">
                  <select className="input" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
                    {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </Field>
                <Field label="Date" error={errors.date}>
                  <input type="date" className="input" min={todayYMD()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })} />
                </Field>
                <Field label="Time" error={errors.time}>
                  <select className="input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                    <option value="">Select</option>
                    {availableSlots.map((t) => <option key={t} value={t} disabled={bookedTimesForDate.includes(t)}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Notes">
                  <textarea className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </Field>
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border">Back</button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-black text-white">Confirm Booking</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Step 3: Schedule View */}
        {step === 3 && selectedCounsellor && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold">Schedule for {selectedCounsellor.name} ({filterDate})</h2>
              <input type="date" className="input mt-2" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              <div className="mt-4 space-y-2">
                {filteredAppointments.length === 0 && <p className="text-sm text-slate-500">No appointments</p>}
                {filteredAppointments.map((a) => (
                  <div key={a.id} className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{a.time} — {a.serviceName}</p>
                      <p className="text-sm text-slate-600">{a.username} ({a.name})</p>
                    </div>
                    <button onClick={() => removeAppointment(a.id)} className="px-3 py-1 text-sm border rounded text-rose-600">Delete</button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border">Choose another counsellor</button>
                <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg bg-black text-white">Book again</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .input { @apply w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-black/10; }
      `}</style>
    </div>
  );
}
