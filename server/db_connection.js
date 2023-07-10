const mysql = require("mysql2");
require("dotenv").config(); //Used for reading variables from .env

const connection = mysql.createConnection({
  host: "localhost",
  database: "hospital",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = connection;
