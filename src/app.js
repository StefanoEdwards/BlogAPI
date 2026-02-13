// src/app.js
import express from "express";

import usersRoutes from "./routes/users.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

// ADD THIS - Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API - MongoDB Driver",
    endpoints: {
      users: "/api/users",
      posts: "/api/posts",
      comments: "/api/comments",
      postWithDetails: "/api/posts/:postId/full"
    }
  });
});

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

app.use(errorHandler);

export default app;