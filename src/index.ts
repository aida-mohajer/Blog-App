// import express = require("express");
import "reflect-metadata";
import express from "express";
import { userRouter } from "./user/user.routes";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { blogRouter } from "./blog/blog.routes";
import { likeRouter } from "./user_likes_blogs/like.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/likes", likeRouter);

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: [path.join(__dirname, "./swagger/*.ts")],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log("http://localhost:3000/api-docs/");

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
