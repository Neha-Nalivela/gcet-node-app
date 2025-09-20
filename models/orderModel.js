import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  email: { type: String },
  orderValue: { type: Number },
  orderDate: {type: Date, default:Date.now}
,});

export default mongoose.model("Order", orderSchema);
