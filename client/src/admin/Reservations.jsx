import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const statuses = ["Pending", "Confirmed", "Cancelled", "Completed"];

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get("/reservations");
      setReservations(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, newStatus) => {
    setReservations((prev) => prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
    try {
      await api.put(`/reservations/${id}/status`, { status: newStatus });
    } catch {
      load();
    }
  };

  if (status === "loading") return <Loading label="Loading reservations..." />;
  if (status === "error") return <ErrorState message="Unable to load reservations." onRetry={load} />;

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso-800 mb-6">Reservations</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {reservations.length === 0 && <p className="text-espresso-500">No reservations yet.</p>}
        {reservations.map((r) => (
          <div key={r._id} className="bg-white border border-espresso-100 rounded-2xl p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-espresso-800">{r.name}</p>
                <p className="text-xs text-espresso-500">{r.email} · {r.phone}</p>
              </div>
              <select
                value={r.status}
                onChange={(e) => changeStatus(r._id, e.target.value)}
                className="input-field !py-1.5 !px-3 text-xs w-auto"
              >
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="text-sm text-espresso-600">{r.date} at {r.time} · {r.guests} guest{r.guests > 1 ? "s" : ""}</p>
            {r.specialRequest && <p className="text-sm text-espresso-500 mt-1 italic">"{r.specialRequest}"</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
