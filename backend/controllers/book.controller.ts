import { Response } from "express";
import { isValidObjectId, Types } from "mongoose";
import Bookmodel from "../models/book.model";
import { ResponseJSON, IBook, ExtendedRequest } from "../utils/interfaces";

export const add = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  let response: ResponseJSON = { success: true };
  try {
    let body: IBook = req.body;

    if (!body.title)
      throw { implicit: true, code: 400, message: "Title is missing" };

    if (!body.author)
      throw { implicit: true, code: 400, message: "Author is missing" };

    if (!body.description)
      throw { implicit: true, code: 400, message: "Description is missing" };

    body.pdfFile = req.files?.pdfFile?.at(0)?.path;
    body.coverFile = req.files?.coverFile?.at(0)?.path;

    body.addedBy = new Types.ObjectId(req.user?._id);

    const Book = await Bookmodel.create(body);

    response.data = Book;
    response.message = "Added Successfully";
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

export const getAll = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  let response: ResponseJSON = { success: true };
  try {
    const Books = await Bookmodel.find().populate({
      path: "addedBy",
      select: "_id name email",
    });
    response.data = Books;
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

export const getSpecific = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  let response: ResponseJSON = { success: true };
  try {
    let bookId: string | Types.ObjectId = req.params._id;
    if (!isValidObjectId(bookId))
      throw { code: 400, message: "Invalid Book ID", implicit: true };
    bookId = new Types.ObjectId(bookId);
    const Book = await Bookmodel.findById(bookId).populate({
      path: "addedBy",
      select: "_id name email",
    });
    response.data = Book;
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
