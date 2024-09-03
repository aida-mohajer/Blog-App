import { Exclude } from "class-transformer";

export class ReadCreateBlogDto {
  title?: string;
  content?: string;
  error?: string;

  @Exclude()
  userId?: string;
  @Exclude()
  id?: string;
  @Exclude()
  updatedAt?: Date;
}
