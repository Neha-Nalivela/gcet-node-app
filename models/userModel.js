import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true},
  role: {type: String, default:"user"},
});
// const user = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);