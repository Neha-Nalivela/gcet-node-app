import express from 'express';
import cors from 'cors';
const app = express();

app.listen(8080,()=>{
    console.log("Server Started");
});
app.use(cors());
app.get("/",(req,res)=>{
    return res.send("Good Morning!");
})

app.get("/greet",(req,res)=>{
    res.send("Greetings")
})

app.get("/name",(req,res)=>{
    res.send("Neha");
})
app.get("/weather",(req,res)=>{
    res.send("32degree");
})

app.get("/products",(req,res)=>{
    const products=[
        {name: "Product1", price: "₹34"},
        {name: "Product2", price: "₹56"},
        {name: "Product3", price: "₹42"},
    ];
    res.json(products);
})