import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQty, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  const delivery = items.length > 0 ? 2.5 : 0;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + delivery + tax).toFixed(2));

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-espresso-800 mb-3">Your cart is empty</h1>
        <p className="text-espresso-500 mb-8">Add something delicious from our menu to get started.</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl text-espresso-800 mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="flex gap-4 bg-white border border-espresso-100 rounded-2xl p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg text-espresso-800">{item.name}</h3>
                  <button onClick={() => removeFromCart(item._id)} className="text-espresso-400 hover:text-red-500">
                    <HiOutlineTrash />
                  </button>
                </div>
                <p className="text-cinnamon-600 font-semibold mb-3">Rs. { item.price.toFixed(2)}</p>
                <div className="flex items-center border border-espresso-200 rounded-full w-fit">
                  <button onClick={() => updateQty(item._id, item.qty - 1)} className="p-2 text-espresso-600"><HiOutlineMinus /></button>
                  <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} className="p-2 text-espresso-600"><HiOutlinePlus /></button>
                </div>
              </div>
              <p className="font-semibold text-espresso-800">Rs {( item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
          <Link to="/menu" className="inline-block text-cinnamon-600 hover:underline text-sm mt-2">← Continue shopping</Link>
        </div>

        <div className="bg-cream-100 rounded-2xl p-6 h-fit">
          <h3 className="font-display text-xl text-espresso-800 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-espresso-600">
            <div className="flex justify-between"><span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>Rs. {delivery.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (5%)</span><span>Rs. {tax.toFixed(2)}</span></div>
            <div className="border-t border-espresso-200 my-2" />
            <div className="flex justify-between font-semibold text-espresso-800 text-base"><span>Total</span><span>Rs. {total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => navigate("/checkout")} className="btn-primary w-full mt-6">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
