import { Request, Response } from "express";
import Usermodel from "../models/user.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ResponseJSON, IUser, ExtendedRequest } from "../utils/interfaces";

export const signup = async (req: Request, res: Response): Promise<any> => {
  let response: ResponseJSON = { success: true };
  let emailValidate: RegExp = new RegExp(/^\S+@\S+\.\S+$/);
  try {
    let body: IUser = req.body;

    if (!body.name)
      throw { implicit: true, code: 400, message: "Name is missing" };

    if (!body.email || !emailValidate.test(body.email))
      throw { implicit: true, code: 400, message: "Email is invalid" };

    if (!body.password)
      throw { implicit: true, code: 400, message: "Password is missing" };

    let emailExists = await Usermodel.findOne({ email: body.email });

    if (emailExists) throw { code: 500, message: "Email already registered" };

    const rounds = 12;

    body.password = await hash(body.password, rounds);

    const User: IUser = await Usermodel.create(body);
    const jwtSecret: any = process.env.JWT_SECRET;
    const token: string = sign({ _id: User._id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    delete User.password;
    response.data = User;
    response.message = "Registered Successfully";
    response.token = token;
    res.status(201).json(response);
  } catch (error: any) {
    console.log(error);
    response = { success: false };
    error.code = error.implicit ? error.code : 500;
    response.message =
      error.implicit || error.message ? error.message : "Something went wrong";
    if (error.detail) response.detail = error.detail;
    res.status(error.code).json(response);
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  let response: ResponseJSON = { success: true };
  try {
    let body: IUser = req.body;

    if (!body.email)
      throw { implicit: true, code: 400, message: "Email is missing" };

    if (!body.password)
      throw { implicit: true, code: 400, message: "Password is missing" };

    let User = await Usermodel.findOne({ email: body.email }).lean();

    if (!User) throw { code: 500, message: "No such user found" };

    const matchedPassword = await compare(body.password, User.password);

    if (!matchedPassword) throw { code: 500, message: "No such user found" };

    const jwtSecret: any = process.env.JWT_SECRET;
    const token: string = sign({ _id: User._id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    delete User.password;
    response.data = User;
    response.message = "Logged In Successfully";
    response.token = token;
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    response = { success: false };
    error.code = error.implicit ? error.code : 500;
    response.message =
      error.implicit || error.message ? error.message : "Something went wrong";
    if (error.detail) response.detail = error.detail;
    res.status(error.code).json(response);
  }
};

export const session = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  let response: ResponseJSON = { success: true };
  try {
    const User: IUser | undefined = req.user;
    delete User?.password;

    res.status(200).json({ success: true, data: User });
  } catch (error: any) {
    console.log(error);
    response = { success: false };
    error.code = error.implicit ? error.code : 500;
    response.message =
      error.implicit || error.message ? error.message : "Something went wrong";
    if (error.detail) response.detail = error.detail;
    res.status(error.code).json(response);
  }
};

// export const signup = async (req: Request, res: Response): Promise<any> => {
//   let response: ResponseJSON = { success: true };
//   try {
//     res.status(200).json({ success: true, data: "yes" });
//   } catch (error: any) {
//     console.log(error);
//     response = { success: false };
//     error.code = error.implicit ? error.code : 500;
//     response.message =
//       error.implicit || error.message ? error.message : "Something went wrong";
//     if (error.detail) response.detail = error.detail;
//     res.status(error.code).json(response);
//   }
// };
