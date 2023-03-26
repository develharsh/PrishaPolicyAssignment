import { Schema, model, models, Types } from "mongoose";
import { IFavourite } from "../utils/interfaces";

const favSchema = new Schema<IFavourite>({
  user: { type: Types.ObjectId, required: true, index: true, ref: "User" },
  book: { type: Types.ObjectId, required: true, index: true, ref: "Book" },
});

const Favouritemodel =
  models.Favourite || model<IFavourite>("Favourite", favSchema);
export default Favouritemodel;
