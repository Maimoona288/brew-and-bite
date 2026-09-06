import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading");

  const load = async (q = "") => {
    setStatus("loading");
    try {
      const { data } = await api.get("/users", { params: q ? { search: q } : {} });
      setUsers(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  const toggleActive = async (id) => {
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isActive: !u.isActive } : u)));
    try {
      await api.put(`/users/${id}/toggle-active`);
    } catch {
      load(search);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this user account? This cannot be undone.")) return;
    await api.delete(`/users/${id}`);
    load(search);
  };

  if (status === "loading") return <Loading label="Loading users..." />;
  if (status === "error") return <ErrorState message="Unable to load users." onRetry={() => load(search)} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="font-display text-3xl text-espresso-800">Users</h1>
        <form onSubmit={(e) => { e.preventDefault(); load(search); }} className="relative">
          <HiOutlineSearch className="absolute  top-1/2 -translate-y-1/2 text-espresso-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="input-field pl-10 !py-2 text-sm" />
        </form>
      </div>

      <div className="bg-white border border-espresso-100 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-cream-100 text-espresso-500 text-left">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-espresso-50">
                <td className="p-3 font-medium text-espresso-800">{u.name}</td>
                <td className="p-3 text-espresso-600">{u.email}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {u.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button onClick={() => toggleActive(u._id)} className="text-cinnamon-600 text-xs font-medium hover:underline">
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => handleDelete(u._id)} className="text-red-500 text-xs font-medium hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
