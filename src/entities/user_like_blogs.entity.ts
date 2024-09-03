import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Blog } from "./blog.entity";
import { User } from "./user.entity";

@Entity({ name: "likes" })
export class UserLikeBlogs extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  blogId!: string;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Blog, (blog) => blog.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "blogId" })
  blog!: Blog;
}
