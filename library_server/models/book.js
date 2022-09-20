import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: String,
  author: Number,
  description: String,
});
//  first String is Name of the collection in database
const BookModel = mongoose.model("Product", BookSchema);
export default BookModel;
