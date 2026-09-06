import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const statuses = ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, orderStatus) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, orderStatus } : o)));
    try {
      await api.put(`/orders/${id}/status`, { orderStatus });
    } catch {
      load();
    }
  };

  if (status === "loading") return <Loading label="Loading orders..." />;
  if (status === "error") return <ErrorState message="Unable to load orders." onRetry={load} />;

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso-800 mb-6">Orders</h1>

      <div className="bg-white border border-espresso-100 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-cream-100 text-espresso-500 text-left">
            <tr>
              <th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Total</th><th className="p-3">Date</th><th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t border-espresso-50">
                <td className="p-3 font-medium text-espresso-800">#{o._id.slice(-6).toUpperCase()}</td>
                <td className="p-3 text-espresso-600">{o.user?.name || "—"}</td>
                <td className="p-3">Rs. {o.totalPrice.toFixed(2)}</td>
                <td className="p-3 text-espresso-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={o.orderStatus}
                    onChange={(e) => changeStatus(o._id, e.target.value)}
                    className="input-field !py-1.5 !px-3 text-xs w-auto"
                  >
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
