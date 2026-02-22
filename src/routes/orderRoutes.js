const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,     // ← new
  deleteOrder      // ← new
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Routes
router.post("/", protect, createOrder);                     // Create (any logged-in user)
router.get("/myorders", protect, getUserOrders);            // User's own orders
router.get("/", protect, authorize("admin"), getAllOrders); // All orders (admin only)

// NEW: Update order status (user can only update their own)
router.put("/:id", protect, updateOrder);

// NEW: Delete order (user can only delete their own)
router.delete("/:id", protect, deleteOrder);

module.exports = router;