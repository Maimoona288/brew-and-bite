import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

const Reservation = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequest: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      await api.post("/reservations", form);
      setStatus("success");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to book your table. Please try again.");
      setStatus("idle");
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-espresso-800 mb-4">Reserve a Table</h1>
        <p className="text-espresso-500 mb-6">Please sign in to book a table with us.</p>
        <Link to="/login" state={{ from: { pathname: "/reservation" } }} className="btn-primary">Sign In</Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-espresso-800 mb-4">Table reserved!</h1>
        <p className="text-espresso-500 mb-6">
          We've received your request for {form.guests} guest{form.guests > 1 ? "s" : ""} on {form.date} at {form.time}. We'll confirm shortly.
        </p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl text-espresso-800 mb-2">Book a Table</h1>
      <p className="text-espresso-500 mb-8">Reserve your spot and we'll have it ready for you.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
        <div className="grid sm:grid-cols-2 gap-4">
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
          <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input-field" />
          <input required type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="input-field" placeholder="Guests" />
        </div>
        <textarea placeholder="Special request (optional)" rows={3} value={form.specialRequest} onChange={(e) => setForm({ ...form, specialRequest: e.target.value })} className="input-field" />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button disabled={status === "loading"} className="btn-primary w-full">
          {status === "loading" ? "Booking..." : "Reserve Table"}
        </button>
      </form>
    </div>
  );
};

export default Reservation;
