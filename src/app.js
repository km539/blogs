const express = require("express");
const app = express();
const path = require("path");
const pool = require("./database.js");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/comments", async (req, res) => {
  try {
    const { content } = req.body;
    const username = "John";
    console.log("New comment content:", content);

    const query =
      "INSERT INTO comments(username, content) VALUES ($1, $2) RETURNING * ";

    const result = await pool.query(query, [username, content]);
    const newComment = result.rows[0];

    res.status(200).json({
      newComment: newComment,
    });
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/replies", async (req, res) => {
  try {
    const { content, commentId } = req.body;
    const username = "momo";

    const query =
      "INSERT INTO replies(comment_id, username, content) VALUES ($1, $2, $3) RETURNING *";

    const result = await pool.query(query, [commentId, username, content]);

    const newReply = result.rows[0];

    res.status(200).json({
      // success: true,
      newReply: newReply,
    });
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/comments/search", async (req, res) => {
  try {
    const { search } = req.body;

    if (search.trim() === "") {
      const comments = await pool.query("SELECT * FROM comments ORDER BY id");
      res.status(200).json({ results: comments.rows });
    } else {
     
      const comments = await pool.query(
        "SELECT * FROM comments WHERE content ILIKE $1 ORDER BY id",
        [`%${search}%`]
      );
      res.status(200).json({ results: comments.rows });
    }
  } catch (error) {
    console.error("Error executing search query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await pool.query("SELECT * FROM comments ORDER BY id");

    const commentIds = comments.rows.map((comment) => comment.id);
    const replies = await pool.query(
      "SELECT * FROM replies WHERE comment_id=ANY($1)",
      [commentIds]
    );

    const commentsWithReplies = comments.rows.map((comment) => {
      const commentReplies = replies.rows.filter(
        (reply) => reply.comment_id === comment.id
      );
      return {
        ...comment,
        replies: commentReplies,
      };
    });

    res.status(200).json({
      comments: commentsWithReplies,
    });
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
