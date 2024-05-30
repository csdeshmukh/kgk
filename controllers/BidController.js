const db = require("../models");

exports.addBid = async (req, res) => {
  try {
    const { ItemId, UserId, BidAmount } = req.body;
    console.log(ItemId, UserId, BidAmount, "this is a bid");
    const item = await db.Item.findByPk(ItemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const user = await db.User.findByPk(UserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (BidAmount <= item.current_price) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than the current price" });
    }

    const newBid = await db.Bid.create({
      item_id: ItemId,
      user_id: UserId,
      bid_amount: BidAmount,
      created_at: new Date(),
    });

    await item.update({ current_price: BidAmount });

    res.status(201).json(newBid);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 500, msg: err.message });
  }
};

exports.getBid = async (req, res) => {
  try {
    const { ItemId } = req.body;

    const bids = await db.Bid.findAll({
      where: { item_id: ItemId },
      order: [["created_at", "DESC"]],
    });

    if (!bids || bids.length === 0) {
      return res.status(404).json({ message: "No bids found for the item" });
    }

    res.status(200).json(bids);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 500, msg: err.message });
  }
};

  

