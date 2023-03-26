import { Schema, model, models } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Create a Model.
const Usermodel = models.User || model<IUser>("User", userSchema);
export default Usermodel;
