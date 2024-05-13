const express = require("express");
const app = express();
const path = require("path");
const knex = require("./config/config.js");

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
    const comments = await knex("comments").select("*").orderBy("id", "desc");
    const commentIds = comments.map(comment => comment.id);
    const replies = await knex("replies")
      .select("*")
      .whereIn("comment_id", commentIds);

    const commentsWithReplies = comments.map(comment => {
      const commentReplies = replies.filter(
        reply => reply.comment_id === comment.id
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
    const comments = await knex("comments")
      .insert([{ username, content }])
      .returning("*");

    res.status(200).json({
      newComment: comments[0],
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

    const replies = await knex("replies")
      .insert([{ comment_id: commentId, username, content }])
      .returning("*");

    res.status(200).json({
      newReply: replies[0],
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
      const results = await knex("comments").select("*").orderBy("id", "desc");
      res.status(200).json({ results });
    } else {
      const searchTerm = `%${search}%`;
      const results = await knex("comments")
        .select("*")
        .where("content", "ILIKE", searchTerm)
        .orderBy("id");

      res.status(200).json({ results });
    }
  } catch (error) {
    console.error("Error executing search query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    await knex("replies").where("comment_id", "=", commentId).del();
    await knex("comments").where("id", "=", commentId).del();
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

    await knex("replies").where("id", "=", replyId).del();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
