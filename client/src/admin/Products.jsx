import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiX } from "react-icons/hi";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const emptyForm = {
  name: "", description: "", price: "", image: "", category: "",
  ingredients: "", available: true, featured: false,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const load = async () => {
    setStatus("loading");
    try {
      const [p, c] = await Promise.all([api.get("/products"), api.get("/categories")]);
      setProducts(p.data);
      setCategories(c.data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, category: categories[0]?._id || "" });
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name, description: p.description, price: p.price, image: p.image,
      category: p.category?._id || p.category, ingredients: (p.ingredients || []).join(", "),
      available: p.available, featured: p.featured,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
      ingredients: form.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) await api.put(`/products/${editingId}`, payload);
      else await api.post("/products", payload);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save this item.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  if (status === "loading") return <Loading label="Loading menu items..." />;
  if (status === "error") return <ErrorState message="Unable to load menu items." onRetry={load} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-espresso-800">Menu Items</h1>
        <button onClick={openCreate} className="btn-primary !py-2 flex items-center gap-2 text-sm">
          <HiOutlinePlus /> Add Product
        </button>
      </div>

      <div className="bg-white border border-espresso-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 text-espresso-500 text-left">
            <tr>
              <th className="p-3">Item</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-espresso-50">
                <td className="p-3 flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />
                  <span className="font-medium text-espresso-800">{p.name}</span>
                </td>
                <td className="p-3 text-espresso-500">{p.category?.name || "—"}</td>
                <td className="p-3">Rs{p.price.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.available ? "Available" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-3 flex gap-3 text-espresso-500">
                  <button onClick={() => openEdit(p)} className="hover:text-cinnamon-600"><HiOutlinePencil /></button>
                  <button onClick={() => handleDelete(p._id)} className="hover:text-red-500"><HiOutlineTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-espresso-900/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-xl text-espresso-800">{editingId ? "Edit Item" : "Add New Item"}</h3>
              <button onClick={() => setShowForm(false)}><HiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              <textarea required placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  <option value="">Category</option>
                  {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <input required placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" />
              <input placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} className="input-field" />
              <div className="flex gap-6 text-sm text-espresso-600">
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} /> Available</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button className="btn-primary w-full">{editingId ? "Save Changes" : "Add Product"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
