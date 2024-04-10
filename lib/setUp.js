const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATBASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = pool;
