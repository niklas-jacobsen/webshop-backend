import { Secret, JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controller/AuthController";

export const SECRET_KEY: Secret =
  "lishöosfklghslofjdkughsfuesrjhtkugruetoiu7405934ot8e802745r8iehgosudhofis";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authController = new AuthController();
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = authController.verifyJWT(token);
    if (!decoded) {
      throw new Error();
    }

    next();
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Could not authenticate",
    });
  }
};
