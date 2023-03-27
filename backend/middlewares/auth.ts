import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import Usermodel from "../models/user.model";
import { ExtendedRequest, IUser } from "../utils/interfaces";

export const isAuthenticated = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined = req.headers.authorization;
    if (token) {
      token = token.replace("Bearer ", "");
      const jwtSecret: any = process.env.JWT_SECRET;
      const payload: any = verify(token, jwtSecret);

      let User: IUser = await Usermodel.findById({ _id: payload._id }).lean();

      if (!User) throw { message: "Session expired, Please Log In Again" };
      req.user = User;
      next();
    } else throw { message: "Session expired, Please Log In Again" };
  } catch (error: any) {
    error.message = ["jwt expired", "invalid signature", "jwt malformed"].includes(
      error?.message
    )
      ? "Session Expired, Please Log In Again"
      : error.message;
    res.status(401).json({ success: false, message: error.message });
  }
};
