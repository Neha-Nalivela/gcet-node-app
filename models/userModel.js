import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true},
});
// const user = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);