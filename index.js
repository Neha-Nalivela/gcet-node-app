import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
//const user = encodeURIComponent(process.env.DBUser);
//const user = encodeURIComponent(process.env.DBPass); 
//const MONGODB_URI = `mongodb+srv://${DBUser}:${DBPass}@cluster0.fejtw9t.mongodb.net/gcet?retryWrites=true&w=majority&appName=Cluster0`

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
//mongoose.connect("mongodb://localhost:27017/gcet")
//  .then(() => console.log("MongoDB connected"))
//  .catch(err => console.error("MongoDB connection error", err));

// app.listen(8080, () => {
//   mongoose.connect(`${MONGODB_URI}`);
//   console.log("Server Started on port 8080");

// });

/*
// Optional: API Index Page
app.get("/", (req, res)=> {
  return res.send(`<h1>Welcome to the API Index</h1>
    <ol>
      <li><a href="/greet">/greet</a></li>
      <li><a href="/name">/name</a></li>
      <li><a href="/weather">/weather</a></li>
      <li><a href="/products/all">/products/all</a></li>
      <li><a href="/users/register">/users/register</a></li>
      <li><a href="/users/login">/users/login</a></li>
    </ol>
  `);
});

app.get("/greet", (req, res)=> res.send("Greetings!!"));
app.get("/name", (req, res)=> res.send("Shreeya"));
app.get("/weather", (req, res)=> res.send("29 degrees"));
*/
