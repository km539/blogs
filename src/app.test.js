const request = require("supertest");
const app = require("./app");

const comment = {
  content: "This is a test",
};

let id = 0;
const updateCommentInfo = {
  content: "This is a test to update the comment",
};

describe("test case", () => {
  it("test case for getting all comments", async () => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
  });

  it("test case for creating a comment", async () => {
    const createComment = await request(app)
      .post("/api/comments")
      .send(comment);
    console.log(
      "response after creating comment",
      createComment.body.newComment
    );
    id = createComment.body.newComment.id;
    expect(createComment.status).toBe(200);
    expect(createComment.body.newComment.username).toBe("John");
  });

    it("test case to update the comment", async () => {
    const updateComment = await request(app)
      .put(`/api/comments/${id}`)
      .send(updateCommentInfo);
    expect(updateComment.status).toBe(200);
    expect(updateComment.body.updatedComment.content).toBe(
      updateCommentInfo.content
    );
  });

  it("test case for deleting the comment", async () => {
    const deleteComment = await request(app).delete(`/api/comments/${id}`);
    expect(deleteComment.status).toBe(200);
  });
});
