import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export class Encrypt {
  static async encryptpass(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  static comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
  static generateToken(payload: { id: string }): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the enviroment variables");
    }
    return jwt.sign(payload, secret, { expiresIn: "2h" });
  }
}
