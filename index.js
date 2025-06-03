import express from 'express';
import mongoose from 'mongoose';
import productModel from './models/productModel';
import cors from 'cors';
const app = express();

app.listen(8080,()=>{
    mongoose.connect("mongodb://localhost:27017/gcet");
    console.log("Server Started");
});

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    return res.send(`<h1>Good Morning!! Welcome to API Page</h1>
    <ol>
      <li><a href="/greet">/greet</a></li>
      <li><a href="/name">/name</a></li>
      <li><a href="/weather">/weather</a></li>
      <li><a href="/products">/products</a></li>
      <li><a href="/register">/register</a></li>
    </ol>`);
   
})

app.get("/greet",(req,res)=>{
    res.send("Greetings");
})

app.get("/name",(req,res)=>{
    res.send("Neha");
})
app.get("/weather",(req,res)=>{
    res.send("32degree");
})

app.get("/products",async (req,res)=>{
    const product = await productModel.find(); 
    res.json(product);
})
//get->post
app.post("/register",async(req,res)=>{
    const {name, email, pass} = req.body;

    const result = await userModel.insertOne({name, email, pass});
    return res.json(result);
})
//login
app.post("/login", async(req,res)=>{
    const {email, pass} = req.body;
    const result = await userModel.findOne({email, pass});
    if(result){
        return res.json(result);
    }
    else{
        return res.json({status: "Login failed"});
    }
})

