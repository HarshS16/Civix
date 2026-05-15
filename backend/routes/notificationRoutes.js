const express = require("express");

const router = express.Router();

const {
  getUserNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getUserNotifications);

router.patch("/:id/read", authMiddleware, markAsRead);

module.exports = router;