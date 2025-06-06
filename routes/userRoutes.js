import express from 'express';
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "helloworld";

const userRouter = express.Router();

// Register user
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashpassword = await bcrypt.hash(password,10);
  try {
    const result = await userModel.create({ name, email, password: hashpassword });
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await userModel.findOne({ email });
  if (!result) return res.json({ message: "Invalid user" });
  const matchPassword = await bcrypt.compare(password,result.password);
  if(!matchPassword){
    return res.status(400).json({message: "Invalid password"})
  }
  const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
  console.log(result);
  return res.json({user: result, token: token});
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
