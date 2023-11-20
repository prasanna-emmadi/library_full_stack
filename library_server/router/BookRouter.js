import express from "express";
import {
  getBooks,
  editBook,
  createBook,
  deleteBook,
} from "../controllers/BookController.js";
import { jwtVerify } from "../middleware/middleware.js";

const router = express.Router();

router.use("/", jwtVerify);

router.get("/", getBooks);
router.post("/", createBook);
router.put("/", editBook);
router.delete("/:title", deleteBook);

export default router;
