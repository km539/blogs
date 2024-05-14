const Pool = require("pg").Pool;
require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATBASE,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATBASE,
    password: process.env.DB_PASS,
  },
});

knex
  .raw("SELECT 1+1 as result")
  .then(() => {
    console.log("Database connected!");
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });

module.exports = knex;
