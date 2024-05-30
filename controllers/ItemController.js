const moment = require("moment");
const crypto = require("crypto");
const fs = require("fs");
const db = require("../models");

exports.addItem = async (req, res) => {
  try {
    const {
      name,
      description,
      starting_price,
      user_id,
      current_price,
      end_time,
    } = req.body;
    var Photo = "";
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedFile = req.files[i];
        const tmp_path = uploadedFile.path;
        const timeStamp = moment().valueOf();
        const randomString = crypto.randomBytes(10).toString("hex");
        const fileExtentsion = uploadedFile.originalname.split(".");
        const file_final_name = `${randomString}-${timeStamp}.${
          fileExtentsion[fileExtentsion.length - 1]
        }`;
        const final_path = "uploads/" + file_final_name;
        console.log(final_path);
        fs.renameSync(tmp_path, final_path, (err) => {
          if (err) {
            return uploadedFile.fieldname + " file linking failed";
          }
        });

        Photo = final_path;
      }
    }
    const Item = await db.Item.create({
      name,
      description,
      starting_price,
      user_id,
      image_url: Photo,
      current_price,
      end_time,
      created_at: new Date(),
    });

    return res.status(200).json({
      success: true,
      Items: Item,
      msg: "Item created successfully",
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllItems = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  const offset = (page - 1) * limit;

  try {
    const items = await db.Item.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      total: items.count,
      pages: Math.ceil(items.count / limit),
      items: items.rows,
      data: "You have Successfully retrieved Items"    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await db.Item.findByPk(req.query.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    var { userId } = req.body;
    const item = await db.Item.findByPk(req.query.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    userId = parseInt(userId);
    console.log(item.user_id, userId);

    if (item.user_id != userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, description, starting_price, current_price, end_time } =
      req.body;
    var Photo = item.image_url;
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedFile = req.files[i];
        const tmp_path = uploadedFile.path;
        const timeStamp = moment().valueOf();
        const randomString = crypto.randomBytes(10).toString("hex");
        const fileExtentsion = uploadedFile.originalname.split(".");
        const file_final_name = `${randomString}-${timeStamp}.${
          fileExtentsion[fileExtentsion.length - 1]
        }`;
        const final_path = "uploads/" + file_final_name;
        console.log(final_path);
        fs.renameSync(tmp_path, final_path, (err) => {
          if (err) {
            return uploadedFile.fieldname + " file linking failed";
          }
        });

        Photo = final_path;
      }
    }
    const image_url = Photo;

    await item.update({
      name,
      description,
      starting_price,
      current_price,
      end_time,
      image_url,
    });

    res.json({item:item ,message:"Item Updated successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await db.Item.findByPk(req.query.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user_id !== req.body.userId && req.body.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    await item.destroy();
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFilter = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    console.log("this is api", isAvailable);
    const items = await db.Item.findAll({
      where: {
        isAvailable,
      },
    });
    if (items.length > 0) {
      res.status(500).json({ items: items, message: "Item found" });
    } else {
      res.status(404).json({ message: "No items found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
