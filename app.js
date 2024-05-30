const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes/index.routes");
const cors = require("cors");
const logger = require("./logger/logger");
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const users = [];
const socketToRoom = {};
const rooms = [];

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(limiter);
require("dotenv").config();
app.use(cors());
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("chat message", "Welcome to the Bid Item!");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`User ${userData._id} connected to room`);
    socket.emit("connected", "This user connected to the room");
  });

  socket.on("joinRoom", (room) => {
    console.log(`Client joined room: ${room}`);
    socket.join(room);
  });

  socket.on("addbid", async (bid, room) => {
    try {
      const item = await db.Item.findByPk(bid.ItemId);
      const newBid = await db.Bid.create({
        item_id: bid.ItemId,
        user_id: bid.UserId,
        bid_amount: bid.BidAmount,
        created_at: new Date(),
      });
      const notification = await db.Notification.create({
        user_id: item.user_id,
        message: `New bid of $${bid.BidAmount} on your item ${item.name}`,
        created_at: new Date(),
      });

      io.emit("notification", notification);

      await item.update({ current_price: bid.BidAmount });

      io.in(room).emit("bidAdd", newBid);
    } catch (err) {
      console.error(err);
      socket.emit("error", { err: 500, msg: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", "Getting data from server");
  });
});
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  res.on("finish", () => {
    logger.info(
      `Response: ${res.statusCode} ${res.statusMessage}; ${
        res.get("Content-Length") || 0
      }b sent`
    );
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);
db.sequelize.sync();
httpServer.listen(8054, () => {
  console.log(`Server is running on port ${8054}`);
});
