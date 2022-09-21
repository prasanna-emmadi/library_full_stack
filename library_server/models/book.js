import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: String,
  author: String,
  description: String,
});
//  first String is Name of the collection in database
const BookModel = mongoose.model("book", BookSchema);
export default BookModel;
