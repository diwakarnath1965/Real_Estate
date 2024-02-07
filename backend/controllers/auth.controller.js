import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successfull",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Signup failed, Please try again!!",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.password = undefined;

    res.cookie("access_token", token, { httpOnly: true }).status(201).json({
      success: true,
      message: "Signin successfull",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Signin failed, Please try again!!",
    });
  }
};

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      user.password = undefined;
      res.cookie("access_token", token, { httpOnly: true }).status(201).json({
        success: true,
        message: "signin successfull",
        user,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      newUser.password = undefined;

      res.cookie("access_token", token, { httpOnly: true }).status(201).json({
        success: true,
        message: "signin successfull",
        newUser,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Signin failed, Please try again!!",
    });
  }
};