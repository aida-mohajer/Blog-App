import { AppDataSource } from "../data-source";
import { UserLikeBlogs } from "../entities/user_like_blogs.entity";
import { Blog } from "../entities/blog.entity";
import { ReadLikeDto } from "./dto/read-like.dto";

export class LikeService {
  constructor(
    private likesRepository = AppDataSource.getRepository(UserLikeBlogs),
    private blogRepository = AppDataSource.getRepository(Blog)
  ) {}

  async likeBlog(userId: string, blogId: string): Promise<ReadLikeDto> {
    try {
      const existingLike = await this.likesRepository.findOne({
        where: { userId, blogId },
      });

      const blog = await this.blogRepository.findOne({ where: { id: blogId } });

      if (!blog) {
        return { error: "Blog not found" };
      }

      if (!existingLike) {
        const newLike = this.likesRepository.create({ userId, blogId });
        await this.likesRepository.save(newLike);

        blog.likeCount += 1;
        await this.blogRepository.save(blog);

        return {
          message: "Blog liked successfully",
          likeCount: blog.likeCount,
        };
      } else {
        await this.likesRepository.delete(existingLike.id);

        blog.likeCount -= 1;
        await this.blogRepository.save(blog);

        return {
          message: "Blog unliked successfully",
          likeCount: blog.likeCount,
        };
      }
    } catch (error) {
      console.error("Error liking/unliking the blog:", error);
      return { error: "Internal server error" };
    }
  }
}
