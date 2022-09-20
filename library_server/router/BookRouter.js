import express from "express";
import {
  getBooks,
  editBook,
  createBook,
  deleteBook,
} from "../controllers/bookController";
import auth from "../middleware/passportMiddleware.js";

const router = express.Router();

router.get("/", auth, getBooks);
router.post("/", auth, createBook);
router.put("/", auth, editBook);
router.delete("/:title", auth, deleteBook);

export default router;
