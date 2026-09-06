import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  Ready: "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  if (status === "loading") return <Loading label="Loading your orders..." />;
  if (status === "error") return <ErrorState message="Unable to load your orders." onRetry={load} />;

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl text-espresso-800 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-espresso-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link key={o._id} to={`/orders/${o._id}`} className="block bg-white border border-espresso-100 rounded-2xl p-5 hover:border-cinnamon-400 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-espresso-800">Order #{o._id.slice(-6).toUpperCase()}</p>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[o.orderStatus]}`}>{o.orderStatus}</span>
              </div>
              <p className="text-sm text-espresso-500 mb-1">{o.items.length} item{o.items.length > 1 ? "s" : ""} · {new Date(o.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold text-cinnamon-600">Rs. {o.totalPrice.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
