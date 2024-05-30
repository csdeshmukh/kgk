const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/autho");

const BidController = require("../controllers/BidController");

router.post("/", auth, auth2(["user"]), BidController.addBid);
router.get("/", BidController.getBid);

module.exports = router;
