import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./router/UserRouter.js";
import BookRouter from "./router/BookRouter.js";

const PORT = 3001;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mongodb
app.use((req, res, next) => {
  console.log(`METHOD: ${req.method}`);
  console.log(`PATH: ${req.path}`);
  console.log("BODY: ", req.body);
  console.log("QUERY: ", req.query);
  console.log("PARAMS:", req.params);
  next();
});

const connectMongoose = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/EasyBuyDB");
    console.log("connected to mongoose");
  } catch (e) {
    console.error(e);
  }
};
await connectMongoose();

app.use("/user", UserRouter);
app.use("/book", BookRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
