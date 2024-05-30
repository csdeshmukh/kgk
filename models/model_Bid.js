module.exports = (sequelize, DataTypes) => {
  const Item = require("./model_Item")(sequelize, DataTypes); // Ensure you pass sequelize and DataTypes
  const User = require("./model_User")(sequelize, DataTypes);

  const Bid = sequelize.define(
    "Bid",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Item,
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      bid_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"), // Use sequelize.literal for default value
      },
    },
    {
      tableName: "bids",
      timestamps: false,
    }
  );

  return Bid;
};
