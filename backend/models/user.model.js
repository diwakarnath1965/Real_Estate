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
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnI4YL0VfEhtQfhkN34eOFdOem2SPqDHnM-ksB880GbQDepQ4ojdDO6vyvFw&s"
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
