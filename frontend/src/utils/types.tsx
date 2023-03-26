import { Dispatch, SetStateAction } from "react";

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
  addedBy: string;
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
  user: IUser;
  book: IBook;
}

export interface IRating {
  _id?: string;
  user: IUser;
  book: IBook;
  rating: number;
}

export interface IGlobalState {
  state?: any;
  dispatch?: Dispatch<SetStateAction<any>>;
  user?: IUser | null;
  loading?: boolean;
}

export interface IAction {
  type?: string;
  payload?: any;
  AUTH?: string;
  LOADING?: string;
  THEME?: string;
}
