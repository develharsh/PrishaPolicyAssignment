import { Request } from "express";
import { SchemaDefinitionProperty, Types } from "mongoose";

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

export interface IBook {
  _id?: string;
  title: string;
  addedBy: SchemaDefinitionProperty | Types.ObjectId;
  author: string;
  description: string;
  bookReadTime: number;
  coverFile: string;
  pdfFile: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExtendedRequest extends Request {
  user?: IUser;
  files?: any;
}
