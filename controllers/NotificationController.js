const db = require("../models");

exports.CreateNotification = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const newNotification = await db.Notification.create({
      user_id: userId,
      message: message,
      is_read: false,
      created_at: new Date(),
    });

    res.status(201).json({
      Notifiaction: newNotification,
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.body;
    const { notificationIds } = req.body; // Expecting an array of notification IDs

    await db.Notification.update(
      { is_read: true },
      {
        where: {
          user_id: userId,
          id: notificationIds,
        },
      }
    );

    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getNotification = async (req, res) => {
  try {
    const { userId } = req.body;
    const notifications = await db.Notification.findAll({
      where: {
        user_id: userId,
        is_read: false,
      },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      Notification: notifications,
      message: "All unread notifications",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
