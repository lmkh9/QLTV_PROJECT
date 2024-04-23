import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    numberphone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "customer" },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
