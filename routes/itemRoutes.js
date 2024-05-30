const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");
const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
});
const fields = [{ name: "file" }];
const ItemController = require("../controllers/ItemController");

router.post("/addItem",auth, upload.any(fields), ItemController.addItem);
router.get("/getallItems",auth, ItemController.getAllItems);
router.put("/", auth,upload.any(fields), ItemController.updateItem);
router.get("/", ItemController.getItemById);
router.delete("/",auth, ItemController.deleteItem);
router.get("/getfilter",auth, ItemController.getFilter);
module.exports = router;
