import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("delivery");
  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" state={{ from: "/checkout" }} replace />;
  if (items.length === 0) return <Navigate to="/menu" replace />;

  const delivery = orderType === "pickup" ? 0 : 2.5;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + delivery + tax).toFixed(2));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const payload = {
        items: items.map((i) => ({ product: i._id, name: i.name, image: i.image, price: i.price, qty: i.qty })),
        customerInfo: form,
        orderType,
        paymentMethod: "Cash on Delivery",
      };
      const { data } = await api.post("/orders", payload);
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl text-espresso-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <form onSubmit={placeOrder} className="md:col-span-2 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input-field" />
            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input-field" />
          </div>
          <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input-field" />

          <div>
            <p className="text-sm font-semibold text-espresso-800 mb-2">Order Type</p>
            <div className="flex gap-4">
              <label className={`flex-1 border rounded-xl p-3 cursor-pointer text-center ${orderType === "delivery" ? "border-cinnamon-500 bg-cream-100" : "border-espresso-200"}`}>
                <input type="radio" className="hidden" checked={orderType === "delivery"} onChange={() => setOrderType("delivery")} />
                Delivery
              </label>
              <label className={`flex-1 border rounded-xl p-3 cursor-pointer text-center ${orderType === "pickup" ? "border-cinnamon-500 bg-cream-100" : "border-espresso-200"}`}>
                <input type="radio" className="hidden" checked={orderType === "pickup"} onChange={() => setOrderType("pickup")} />
                Pickup
              </label>
            </div>
          </div>

          {orderType === "delivery" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input required name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input-field sm:col-span-2" />
              <input required name="city" value={form.city} onChange={handleChange} placeholder="City" className="input-field" />
              <input required name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="input-field" />
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-espresso-800 mb-2">Payment</p>
            <div className="border border-cinnamon-500 bg-cream-100 rounded-xl p-3 text-espresso-700 text-sm">
              Cash on Delivery — pay when your order arrives.
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button disabled={placing} className="btn-primary w-full">
            {placing ? "Placing your order..." : "Place Order"}
          </button>
        </form>

        <div className="bg-cream-100 rounded-2xl p-6 h-fit">
          <h3 className="font-display text-xl text-espresso-800 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map((i) => (
              <div key={i._id} className="flex justify-between text-espresso-600">
                <span>{i.name} × {i.qty}</span>
                <span>Rs{(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-espresso-200 pt-3 space-y-2 text-sm text-espresso-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (5%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-espresso-800 text-base pt-2 border-t border-espresso-200"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
