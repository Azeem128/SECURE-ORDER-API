const Order = require("../models/Order");
const mongoose = require("mongoose");

// CREATE
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { product, quantity } = req.body;

    if (!product || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Product and valid quantity required" });
    }

    const [order] = await Order.create(
      [{ user: req.user.id, product, quantity }],
      { session }
    );

    await session.commitTransaction();

    req.io.to(req.user.id.toString()).emit("orderCreated", order);

    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// UPDATE
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "processing", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found or you don't own it" });
    }

    req.io.to(req.user.id.toString()).emit("orderUpdated", order);

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOneAndDelete({ _id: id, user: req.user.id });

    if (!order) {
      return res.status(404).json({ message: "Order not found or you don't own it" });
    }

    req.io.to(req.user.id.toString()).emit("orderDeleted", id);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};