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

// app.get("/api/replies", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM replies");
//     console.log(result);
//     res.status(200).json({
//       replies: result.rows,
//     });
//   } catch (error) {
//     console.error("Error executing query:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await pool.query("SELECT * FROM comments");

    const commentIds = comments.rows.map((comment) => comment.id);
    // console.log(commentIds);
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
    // console.log({
    //   comments: commentsWithReplies,
    // });

    // res.status(200).json({
    //   comments: [
    //     {
    //       id: 1,
    //       content:
    //         "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    //       createdAt: "1 month ago",
    //       score: 12,
    //       user: {
    //         image: {
    //           png: "../images/avatars/image-amyrobson.png",
    //           webp: "../images/avatars/image-amyrobson.webp",
    //         },
    //         username: "amyrobson",
    //       },
    //       replies: [],
    //     },
    //     {
    //       id: 2,
    //       content:
    //         "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    //       createdAt: "2 weeks ago",
    //       score: 5,
    //       user: {
    //         image: {
    //           png: "./images/avatars/image-maxblagun.png",
    //           webp: "./images/avatars/image-maxblagun.webp",
    //         },
    //         username: "maxblagun",
    //       },
    //       replies: [
    //         {
    //           id: 3,
    //           content:
    //             "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    //           createdAt: "1 week ago",
    //           score: 4,
    //           replyingTo: "maxblagun",
    //           user: {
    //             image: {
    //               png: "../images/avatars/image-ramsesmiron.png",
    //               webp: "./images/avatars/image-ramsesmiron.webp",
    //             },
    //             username: "ramsesmiron",
    //           },
    //         },
    //         {
    //           id: 4,
    //           content:
    //             "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    //           createdAt: "2 days ago",
    //           score: 2,
    //           replyingTo: "ramsesmiron",
    //           user: {
    //             image: {
    //               png: "../images/avatars/image-juliusomo.png",
    //               webp: "./images/avatars/image-juliusomo.webp",
    //             },
    //             username: "juliusomo",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // });
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
