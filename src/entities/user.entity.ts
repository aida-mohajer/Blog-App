import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Base } from "./base.entity";
import { Blog } from "./blog.entity";
import { UserLikeBlogs } from "./user_like_blogs.entity";

@Entity({ name: "users" })
export class User extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  userName!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  age!: number;

  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @OneToMany(() => Blog, (blogs) => blogs.user)
  blogs!: Blog[];

  @OneToMany(() => UserLikeBlogs, (likes) => likes.user)
  likes!: UserLikeBlogs[];
}
