const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS comments (
	id SERIAL PRIMARY KEY, 
	username character varying, 
	createdAt character varying DEFAULT CURRENT_DATE, 
	content character varying
);

CREATE TABLE IF NOT EXISTS replies (
	id SERIAL PRIMARY KEY, 
	username character varying, 
	createdAt character varying DEFAULT CURRENT_DATE, 
	content character varying,
	comment_id INT REFERENCES comments (id)
);
`;

//createdAtのdefaultにCURRENT_DATEを入れるようにしてください(4/24）

pool.connect(function (err, client, release) {
  if (err) return console.error("Error acquiring client", err.stack);
  client.query(createTableQuery, (err, result) => {
    release();
    if (err) return console.error("Error executing query", err.stack);
  });
  console.log("Database connected!");
});
module.exports = pool;
