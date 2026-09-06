import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import api from "../services/api";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

const steps = ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Delivered"];

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => { load(); }, [id]);

  if (status === "loading") return <Loading label="Loading order..." />;
  if (status === "error" || !order) return <ErrorState message="Order not found." onRetry={load} />;

  const currentStepIndex = order.orderStatus === "Cancelled" ? -1 : steps.indexOf(order.orderStatus);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-12">
      <Link to="/orders" className="text-sm text-cinnamon-600 hover:underline">← All orders</Link>

      <div className="mt-6 mb-8">
        <h1 className="font-display text-3xl text-espresso-800">Order #{order._id.slice(-6).toUpperCase()}</h1>
        <p className="text-espresso-500 text-sm">Placed on {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {order.orderStatus === "Cancelled" ? (
        <div className="bg-red-50 text-red-700 rounded-2xl p-5 mb-8">This order was cancelled.</div>
      ) : (
        <div className="bg-white border border-espresso-100 rounded-2xl p-6 mb-8">
          <div className="flex justify-between">
            {steps.map((s, idx) => (
              <div key={s} className="flex flex-col items-center flex-1 relative">
                {idx > 0 && (
                  <div className={`absolute top-3 right-1/2 w-full h-0.5 ${idx <= currentStepIndex ? "bg-cinnamon-500" : "bg-espresso-100"}`} style={{ zIndex: 0 }} />
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${idx <= currentStepIndex ? "bg-cinnamon-500 text-white" : "bg-espresso-100 text-espresso-400"}`}>
                  {idx <= currentStepIndex ? <HiCheckCircle className="w-5 h-5" /> : <span className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <p className="text-[10px] md:text-xs text-center mt-2 text-espresso-600 max-w-[70px]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-espresso-100 rounded-2xl p-6 mb-6">
        <h3 className="font-semibold text-espresso-800 mb-4">Items</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-medium text-espresso-800">{item.name}</p>
                <p className="text-xs text-espresso-500">Qty: {item.qty}</p>
              </div>
              <p className="font-medium text-espresso-700">Rs.{(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-espresso-100 mt-4 pt-4 space-y-1 text-sm text-espresso-600">
          <div className="flex justify-between"><span>Subtotal</span><span>Rs.{order.itemsPrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>Rs.{order.deliveryFee.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-espresso-800 text-base pt-1"><span>Total</span><span>${order.totalPrice.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="bg-white border border-espresso-100 rounded-2xl p-6">
        <h3 className="font-semibold text-espresso-800 mb-3">Delivery Details</h3>
        <p className="text-sm text-espresso-600">{order.customerInfo.fullName} · {order.customerInfo.phone}</p>
        <p className="text-sm text-espresso-600">
          {order.orderType === "pickup" ? "Pickup at the restaurant" : `${order.customerInfo.address}, ${order.customerInfo.city} ${order.customerInfo.postalCode}`}
        </p>
        <p className="text-sm text-espresso-600 mt-1">Payment: {order.paymentMethod}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
