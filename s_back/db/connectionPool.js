const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "fourleaf0309!!",
  database: "s_db",
  connectionLimit: 10,
});

module.exports = pool;
