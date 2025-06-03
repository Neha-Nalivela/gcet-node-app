import mongoose from "mongoose";
const prodSchema = mongoose.Schema({
    name: {type:String},
    des : {type:String},
    img_Url : {type:String},
    price:{type:Number},
})
//const products = mongoose.model("Products", prodSchema);
export default mongoose.model("Products", prodSchema)