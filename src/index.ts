// import express = require("express");
import "reflect-metadata";
import express from "express";
import { userRouter } from "./user/user.routes";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { blogRouter } from "./blog/blog.routes";
import { likeRouter } from "./user_likes_blogs/like.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/users", userRouter);
app.use("/api/users", blogRouter);
app.use("/api/users", likeRouter);
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
