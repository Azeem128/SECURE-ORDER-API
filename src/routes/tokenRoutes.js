const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken || storedToken.expires < Date.now()) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },  // Include role if needed
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token verification failed" });
  }
});

module.exports = router;