import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

import * as dotenv from "dotenv";
// import { UserLikeBlogs } from "./entities/user_like_blogs.entity";
import { Blog } from "./entities/blog.entity";
import { UserLikeBlogs } from "./entities/user_like_blogs.entity";

dotenv.config();

const secret = process.env.JWT_SECRET;

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "mssql",
  host: DB_HOST,
  port: parseInt(DB_PORT || "1433"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  // synchronize: NODE_ENV === "dev",
  synchronize: true,
  logging: NODE_ENV === "dev",
  entities: [User, Blog, UserLikeBlogs],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  options: {
    encrypt: false, // Disable encryption
  },
  extra: {
    requestTimeout: 60000, // 60 seconds
  },
});
