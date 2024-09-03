import { plainToClass } from "class-transformer";
import { AppDataSource } from "../data-source";
import { LoginDto } from "./dto/login.dto";
import { ReadLoginDto } from "./dto/read-login.dto";
import { ReadSignupDto } from "./dto/read-signup.dto";
import { SignupDto } from "./dto/signup.dto";
import { User } from "../entities/user.entity";
import { Encrypt } from "../helpers/encrypt";
import { UserLikeBlogs } from "../entities/user_like_blogs.entity";
import { Blog } from "../entities/blog.entity";

export class UserService {
  constructor(
    private userRepository = AppDataSource.getRepository(User),
    private blogRepository = AppDataSource.getRepository(Blog)
  ) {}

  async signup(data: SignupDto): Promise<ReadSignupDto> {
    try {
      const existEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }

      const existUsername = await this.userRepository.findOne({
        where: { userName: data.userName },
      });
      if (existUsername) {
        return { error: "Username already exists" };
      }

      const encryptedpassword = await Encrypt.encryptpass(data.password);

      const user = this.userRepository.create({
        userName: data.userName,
        email: data.email,
        age: data.age,
        password: encryptedpassword,
      });

      await this.userRepository.save(user);
      const userData = plainToClass(ReadSignupDto, user);

      return userData;
    } catch (error) {
      console.error("Error during signup:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async login(data: LoginDto): Promise<ReadLoginDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { userName: data.userName },
      });

      if (!user) {
        return { error: "User not found" };
      }

      const isPasswordValid = await Encrypt.comparePassword(
        data.password,
        user.password
      );

      const dto = new ReadLoginDto();
      if (isPasswordValid) {
        const token = Encrypt.generateToken({ id: user.id });
        dto.token = token;
        dto.success = true;
        return dto;
      } else {
        return { error: "password is incorrect" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async deleteUser(
    userId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found" };
      }

      const blog = await this.blogRepository.find({
        where: { userId: userId },
      });

      await this.blogRepository.remove(blog);
      await this.userRepository.remove(user);
      return { message: "User deleted successfully" };
    } catch (error) {
      console.error("Error during login:", error);
      return { error: "An unexpected error occurred." };
    }
  }
}
