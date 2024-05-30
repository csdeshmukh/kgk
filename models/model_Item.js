module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      starting_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      current_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: DataTypes.literal("0"),
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "items",
      timestamps: false,
    }
  );

  return Item;
};
