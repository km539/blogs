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

app.post("/api/comments", async (req, res) => {
  try {
    const { content } = req.body;
    const username = "John";
    //console.log("New comment content:", content);

    const query =
      "INSERT INTO comments(username, content) VALUES ($1, $2) RETURNING * ";

    const result = await pool.query(query, [username, content]);
    const newComment = result.rows[0];

    res.status(200).json({
      newComment: { ...newComment, replies: [] },
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

app.delete("/api/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    await pool.query("DELETE FROM replies WHERE comment_id = $1", [commentId]);

    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);

    res
      .status(200)
      .json({ message: "Comment and associated replies deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment and associated replies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/replies/:replyId", async (req, res) => {
  try {
    const replyId = req.params.replyId;

    await pool.query("DELETE FROM replies WHERE id = $1", [replyId]);

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;

    const query = "UPDATE comments SET content = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [content, commentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ updatedComment: result.rows[0] });
  } catch (error) {
    console.error("Error updating comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/replies/:replyId", async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const { content } = req.body;

    const query = "UPDATE replies SET content = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [content, replyId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reply not found" });
    }

    res.status(200).json({ updatedReply: result.rows[0] });
  } catch (error) {
    console.error("Error updating reply:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
