import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { UserLikeBlogs } from "./user_like_blogs.entity";

@Entity({ name: "blogs" })
export class Blog extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  content!: string;

  @Column({ nullable: false })
  likeCount!: number;

  @Column({ nullable: false })
  userId!: string;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => UserLikeBlogs, (likes) => likes.blog)
  likes!: UserLikeBlogs[];
}
