import express from 'express';
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Register user
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await userModel.create({ name, email, password });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await userModel.findOne({ email, password });
  if (!result) return res.json({ message: "Invalid user or password" });
  return res.json(result);
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
