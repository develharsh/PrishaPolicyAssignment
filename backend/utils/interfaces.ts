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

export interface IFavourite {
  _id?: string;
  user: SchemaDefinitionProperty | Types.ObjectId;
  book: SchemaDefinitionProperty | Types.ObjectId;
}

export interface IRating {
  _id?: string;
  user: SchemaDefinitionProperty | Types.ObjectId;
  book: SchemaDefinitionProperty | Types.ObjectId;
  rating: number;
}

export interface IRatingBody {
  _id?: string;
  user: Types.ObjectId | string | undefined;
  book: Types.ObjectId | string;
  rating: number;
}

export interface ExtendedRequest extends Request {
  user?: IUser;
  files?: any;
}
