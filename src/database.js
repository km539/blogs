const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BLOGS",
  password: "5858",
  port: 5432,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS comments (
	id SERIAL PRIMARY KEY, 
	username character varying, 
	createdAt character varying, 
	content character varying
);

CREATE TABLE IF NOT EXISTS replies (
	id SERIAL PRIMARY KEY, 
	username character varying, 
	createdAt character varying, 
	content character varying,
	comment_id INT REFERENCES comments (id)
);
`;

pool.connect(function (err, client, release) {
  if (err) return console.error("Error acquiring client", err.stack);
  client.query(createTableQuery, (err, result) => {
    release();
    if (err) return console.error("Error executing query", err.stack);
  });
  console.log("Database connected!");
});
module.exports = pool;
