const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BLOGS",
  password: "5858",
  port: 5432,
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});
module.exports = pool;
