// const { Sequelize } = require("sequelize");

// // const sequelize = new Sequelize("biddingPlatform", "root", "manager", {
// //   host: "localhost",
// //   dialect: "mysql",
// //   port: 3306,
// //   logging: false,
// // });
// const sequelize = new Sequelize("biddingPlatform", "root", "manager", {
//   host: "localhost",
//   dialect: "mysql",
//   logging: false,
// });
// module.exports = {
//   sequelize,
// };
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

module.exports = sequelize;
