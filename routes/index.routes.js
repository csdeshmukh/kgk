const router = require("express").Router();
const userRoutes = require("./userRoutes");
const itemRoutes = require("./itemRoutes");
const bidRoutes = require("./BidRoutes");
const notificationRoutes = require("./notificationRoutes");

// const forAllStudent = require("./forStudentClassRoutes");
router.use("/api/users", userRoutes);
router.use("/api/items", itemRoutes);
router.use("/api/bid", bidRoutes);
router.use("/api/notification", notificationRoutes);
module.exports = router;
