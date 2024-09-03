import { plainToClass } from "class-transformer";
import { AppDataSource } from "../data-source";
import { Blog } from "../entities/blog.entity";
import { User } from "../entities/user.entity";
import { BlogDto } from "./dto/blog.dto";
import { ReadCreateBlogDto } from "./dto/read-create-blog.dto";
import { ReadGetBlogDto } from "./dto/read-get-blog.dto";
import { ReadUpdateBlogsDto } from "./dto/read-update-blog.dto";
import { Pagination } from "../middlewares/pagination";
import { ReadGetAllBlogsResponse } from "./dto/read-getAll-blogs.dto";

export class BlogService {
  constructor(
    private blogRepository = AppDataSource.getRepository(Blog),
    private userRepository = AppDataSource.getRepository(User)
  ) {}
  async createBlog(data: BlogDto, userId: string): Promise<ReadCreateBlogDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      const blog = this.blogRepository.create({
        userId: user?.id,
        title: data.title,
        content: data.content,
        likeCount: 0,
      });

      await this.blogRepository.save(blog);

      const blogData = plainToClass(ReadCreateBlogDto, blog);
      return blogData;
    } catch (error) {
      console.error("Error during create blog:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async getBlog(blogId: string): Promise<ReadGetBlogDto> {
    try {
      const blog = await this.blogRepository.findOne({
        where: { id: blogId },
      });

      if (!blog) {
        return { error: "Blog not found" };
      }
      const dto = new ReadGetBlogDto();
      dto.title = blog.title;
      dto.content = blog.content;
      dto.createdAt = blog.createdAt;
      dto.likeCount = blog.likeCount;

      return dto;
    } catch (error) {
      console.error("Error during retrieve blog:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getAllBlogs(pagination: Pagination): Promise<ReadGetAllBlogsResponse> {
    const { skip, limit } = pagination;
    try {
      const [allBlogs, totalBlogs] = await this.blogRepository
        .createQueryBuilder("blog")
        .select(["blog.title", "blog.content", "blog.likeCount"])
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const blogDto: ReadGetBlogDto[] = allBlogs.map((blog) => ({
        title: blog.title,
        content: blog.content,
        likeCount: blog.likeCount,
        createdAt: blog.createdAt,
      }));

      const totalPages = Math.ceil(totalBlogs / limit);

      return { blogDto, totalPages, totalBlogs };
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      return { error: "Internal server error" };
    }
  }

  async updateBlog(
    data: BlogDto,
    userId: string,
    blogId: string
  ): Promise<ReadUpdateBlogsDto> {
    try {
      const blog = await this.blogRepository.findOne({ where: { id: blogId } });

      if (!blog) {
        return { error: "Blog not found." };
      }

      if (blog.userId !== userId) {
        return { error: "You are not authorized to update this blog" };
      }

      blog.title = data.title;
      blog.content = data.content;

      await this.blogRepository.save(blog);
      return {
        title: data.title,
        content: data.content,
        updatedAt: blog.updatedAt,
      };
    } catch (error) {
      console.error("Error updating userBlog:", error);
      return { error: "Internal server error" };
    }
  }

  async deleteBlog(
    blogId: string,
    userId: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const blog = await this.blogRepository.findOne({ where: { id: blogId } });

      if (!blog) {
        return { error: "Blog not found" };
      }

      if (blog.userId !== userId) {
        return { error: "You are not authorized to update this blog" };
      }

      await this.blogRepository.remove(blog);

      return {
        message: "Blog deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting userBlog:", error);
      return { error: "Internal server error" };
    }
  }
}
