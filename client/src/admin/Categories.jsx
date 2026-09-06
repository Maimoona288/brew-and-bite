import { useEffect, useState } from "react";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState({ name: "", icon: "☕", image: "" });
  const [error, setError] = useState("");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/categories", form);
      setForm({ name: "", icon: "☕", image: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create this category.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category? Products in it will not be deleted.")) return;
    await api.delete(`/categories/${id}`);
    load();
  };

  if (status === "loading") return <Loading label="Loading categories..." />;
  if (status === "error") return <ErrorState message="Unable to load categories." onRetry={load} />;

  return (
    <div>
      <h1 className="font-display text-3xl text-espresso-800 mb-6">Categories</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-espresso-100 rounded-2xl p-5 mb-6 grid sm:grid-cols-4 gap-3 items-end">
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
        <input placeholder="Emoji icon (e.g. ☕)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field" />
        <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" />
        <button className="btn-primary !py-3 flex items-center justify-center gap-2"><HiOutlinePlus /> Add</button>
      </form>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c._id} className="bg-white border border-espresso-100 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-medium text-espresso-800">{c.name}</span>
            </div>
            <button onClick={() => handleDelete(c._id)} className="text-espresso-400 hover:text-red-500"><HiOutlineTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
