import { Schema, model, models, Types } from "mongoose";
import { IRating } from "../utils/interfaces";

const ratingSchema = new Schema<IRating>({
  user: { type: Types.ObjectId, required: true, index: true, ref: "User" },
  book: { type: Types.ObjectId, required: true, index: true, ref: "Book" },
  rating: { type: Number, required: true },
});

const Ratingmodel = models.Rating || model<IRating>("Rating", ratingSchema);
export default Ratingmodel;
