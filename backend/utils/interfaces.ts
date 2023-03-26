import { Request } from "express";

export interface ResponseJSON {
  success: boolean;
  data?: Object | Array<any>;
  message?: string;
  detail?: string;
  token?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExtendedRequest extends Request {
  user?: IUser;
}
