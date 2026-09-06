import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const statCards = (stats) => [
  { label: "Total Orders", value: stats.totalOrders, accent: "bg-espresso-700" },
  { label: "Total Revenue", value: `Rs. ${stats.totalRevenue?.toLocaleString()}`, accent: "bg-cinnamon-500" },
  { label: "Total Users", value: stats.totalUsers, accent: "bg-gold-500" },
  { label: "Reservations", value: stats.totalReservations, accent: "bg-espresso-500" },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get("/dashboard/stats");
      setStats(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  if (status === "loading") return <Loading label="Loading dashboard..." />;
  if (status === "error" || !stats) return <ErrorState message="Unable to load dashboard stats." onRetry={load} />;

  const maxRevenue = Math.max(...stats.salesByDay.map((d) => d.revenue), 1);

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso-800 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards(stats).map((c) => (
          <div key={c.label} className={`rounded-2xl p-5 text-cream-50 ${c.accent}`}>
            <p className="text-sm opacity-80">{c.label}</p>
            <p className="text-2xl font-display mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-espresso-100 rounded-2xl p-6">
          <h3 className="font-semibold text-espresso-800 mb-4">Revenue — last 7 days</h3>
          <div className="flex items-end gap-3 h-40">
            {stats.salesByDay.length === 0 && <p className="text-sm text-espresso-400">No orders yet this week.</p>}
            {stats.salesByDay.map((d) => (
              <div key={d._id} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-cinnamon-500 rounded-t-md"
                  style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 4)}%` }}
                  title={`$${d.revenue.toFixed(2)}`}
                />
                <span className="text-[10px] text-espresso-400">{d._id.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-espresso-100 rounded-2xl p-6">
          <h3 className="font-semibold text-espresso-800 mb-4">Popular Products</h3>
          <div className="space-y-3">
            {stats.popularProducts.map((p, i) => (
              <div key={p._id} className="flex items-center gap-3">
                <span className="text-espresso-400 text-sm w-4">{i + 1}</span>
                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-espresso-800">{p.name}</p>
                  <p className="text-xs text-espresso-400">★ {p.rating?.toFixed(1)}</p>
                </div>
                <span className="text-sm font-semibold text-cinnamon-600">Rs { p.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-espresso-100 rounded-2xl p-6">
        <h3 className="font-semibold text-espresso-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-espresso-400 border-b border-espresso-100">
                <th className="pb-2">Order</th><th className="pb-2">Customer</th><th className="pb-2">Total</th><th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((o) => (
                <tr key={o._id} className="border-b border-espresso-50">
                  <td className="py-2">#{o._id.slice(-6).toUpperCase()}</td>
                  <td className="py-2">{o.user?.name || "—"}</td>
                  <td className="py-2">Rs { o.totalPrice.toFixed(2)}</td>
                  <td className="py-2">{o.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
