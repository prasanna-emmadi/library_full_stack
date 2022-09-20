import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
});
//              first   String is Name of the collection in database
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
