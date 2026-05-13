import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, college } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password: password,
      college,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      username: user.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const claims = {
      id: user._id,
      email: email
    }
    //it takes three parameters playload(custum claims).secretKey.options(expires,created at etc..)
    const token = jwt.sign(
      claims,
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); 
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};