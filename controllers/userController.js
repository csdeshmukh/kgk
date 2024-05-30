const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../models");
exports.register = async (req, res) => {
  try {
    const { username, password, email, isLogin } = req.body;
    let { role } = req.body;
    role = role || "user";

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      email,
      isLogin,
      role,
      created_at: new Date(),
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    await user.update({ isLogin: true });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ msg: "User Found", data: user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 500, msg: "Internal Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "User found successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 500, msg: "Internal Server Error" });
  }
};
