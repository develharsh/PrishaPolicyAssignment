import { Schema, model, models, Types } from "mongoose";
import { IBook } from "../utils/interfaces";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    addedBy: { type: Types.ObjectId, required: true, index: true, ref: "User" },
    author: { type: String, required: true },
    description: { type: String, required: true },
    bookReadTime: { type: Number, required: true },
    coverFile: { type: String, required: true },
    pdfFile: { type: String, required: true },
  },
  { timestamps: true }
);

const Bookmodel = models.Book || model<IBook>("Book", bookSchema);
export default Bookmodel;
