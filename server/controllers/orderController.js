const Order = require("../models/Order");

// @desc  Create new order (checkout)
// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, customerInfo, orderType, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const deliveryFee = orderType === "pickup" ? 0 : itemsPrice > 0 ? 2.5 : 0;
    const tax = Number((itemsPrice * 0.05).toFixed(2));
    const totalPrice = Number((itemsPrice + deliveryFee + tax).toFixed(2));

    const order = await Order.create({
      user: req.user._id,
      items,
      customerInfo,
      orderType,
      paymentMethod: paymentMethod || "Cash on Delivery",
      itemsPrice,
      deliveryFee,
      tax,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Unable to place your order. Please try again." });
  }
};

// @desc  Get logged in user's orders
// @route GET /api/orders/my-orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single order (owner or admin)
// @route GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all orders (admin)
// @route GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.orderStatus;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus };
