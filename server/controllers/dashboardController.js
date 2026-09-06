const Order = require("../models/Order");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Product = require("../models/Product");

// @desc  Admin dashboard summary stats
// @route GET /api/dashboard/stats
const getStats = async (req, res) => {
  try {
    const [totalOrders, totalUsers, totalReservations, orders] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: "customer" }),
      Reservation.countDocuments(),
      Order.find({ orderStatus: { $ne: "Cancelled" } }),
    ]);

    const totalRevenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // last 7 days revenue, grouped by day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const salesByDay = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo }, orderStatus: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const popularProducts = await Product.find().sort({ rating: -1 }).limit(5).select("name price rating image");

    res.json({
      totalOrders,
      totalUsers,
      totalReservations,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      recentOrders,
      salesByDay,
      popularProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
