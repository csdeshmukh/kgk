const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
});
const fields = [{ name: "file" }];

router.post("/signup", userController.register);
router.get("/getProfile",auth, userController.getProfile);
router.post("/login", userController.login);

module.exports = router;
