import express from 'express';
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';

const SECRET_KEY = "helloworld";
const userRouter = express.Router();

userRouter.get("/all", auth, async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  res.json(user);
});

// Register user
userRouter.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      name,
      email,
      password: hashpassword,
      role
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const result = await userModel.findOne({ email });

  if (!result || !result.password) {
    return res.status(401).json({ message: "Invalid user or password not set" });
  }

  const matchPassword = await bcrypt.compare(password, result.password);
  if (!matchPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { email: result.email, id: result._id, role: result.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  const safeUser = {
    name: result.name,
    email: result.email,
    role: result.role
  };

  return res.json({ user: safeUser, token });
});

// Get user by email
userRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email });
  return res.json(result);
});

// Get only name by email
userRouter.get("/:id/name", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
  return res.json(result);
});

export default userRouter;
