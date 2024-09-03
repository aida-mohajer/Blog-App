import { ReadGetBlogDto } from "./read-get-blog.dto";

export class ReadGetAllBlogsResponse {
  blogDto?: ReadGetBlogDto[];
  totalPages?: number;
  totalBlogs?: number;
  error?: string;
}
