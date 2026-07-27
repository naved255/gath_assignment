import { model } from "mongoose";
import userSchema from "../Schema/userSchema.js";

const userModel = model("User", userSchema);

export default userModel
