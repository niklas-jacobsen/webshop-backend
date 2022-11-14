import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { SECRET_KEY } from "../middleware/auth";

const saltRounds = 10;
//Replace hardcoded secret with env variable later

//add try/catch to all functions later
export class AuthController {
  async hashPassword(plainPassword: string) {
    return bcrypt.hash(plainPassword, saltRounds);
  }

  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateJWT(userId: string) {
    const token = jwt.sign(
      {
        sub: userId,
      },
      SECRET_KEY,
      { expiresIn: "30 minutes" }
    );
    return token;
  }

  async verifyJWT(token: string) {
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      return payload.sub;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
