import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    avatar: {
      type:String,
      default: "https://prototyprio.gumlet.io/wp-content/uploads/2021/06/avatar-150x150.png?w=256&q=75&format=webp&compress=true&dpr=2"
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
