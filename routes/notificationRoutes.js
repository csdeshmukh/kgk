const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/autho");

const NotificationController = require("../controllers/NotificationController");

router.post("/", NotificationController.CreateNotification);
router.get("/", NotificationController.getNotification);

module.exports = router;
