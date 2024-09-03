import { Exclude } from "class-transformer";

export class ReadSignupDto {
  userName?: string;
  email?: string;
  age?: number;
  createdAt?: Date;
  error?: string;

  @Exclude()
  password?: string;
  @Exclude()
  updatedAt?: Date;
  @Exclude()
  id?: string;
}
