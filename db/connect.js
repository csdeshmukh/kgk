// const mysql = require("mysql2");

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "manager",
//   database: "biddingPlatform",
//   port: 3306,
// });
// con.connect((err) => {
//   if (err) throw err;
//   console.log("connection created");
// });
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "biddingPlatform",
  port: 3306,
});
con.connect((err) => {
  if (err) throw err;
  console.log("connection created");
});
module.exports = {
  con,
};

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("biddingPlatform", "root", "manager", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
// });

// module.exports = {
//   sequelize,
// };
// const { DataTypes, Sequelize } = require("sequelize");
// const sequelize = new Sequelize("biddingPlatform", "root", "manager", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   logging: false,
// });

// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced!");
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// })();
