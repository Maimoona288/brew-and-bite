const express = require("express");
const {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
} = require("../controllers/reservationController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.get("/", protect, admin, getAllReservations);
router.put("/:id/status", protect, admin, updateReservationStatus);

module.exports = router;
