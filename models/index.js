// const sequelize = require("../config/database");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./model_User")(sequelize, Sequelize);
db.Item = require("./model_Item")(sequelize, Sequelize);
db.Bid = require("./model_Bid")(sequelize, Sequelize);
db.Notification = require("./model_Notification")(sequelize, Sequelize);

db.Item.hasMany(db.Bid, { foreignKey: "item_id" });
db.Bid.belongsTo(db.Item, { foreignKey: "item_id" });

db.User.hasMany(db.Item, { foreignKey: "user_id" });
db.Item.belongsTo(db.User, { foreignKey: "user_id" });

db.User.hasMany(db.Bid, { foreignKey: "user_id" });
db.Bid.belongsTo(db.User, { foreignKey: "user_id" });

db.User.hasMany(db.Notification, { foreignKey: "user_id" });
db.Notification.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
