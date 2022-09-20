import express from "express";
import dotenv from "dotenv";
import {
  addUser,
  loginUser,
  refreshToken,
  modifyUser,
  getUser,
} from "../controllers/UserController.js";
import auth from "../middleware/passportMiddleware.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/refreshToken", auth, refreshToken);
router.put("/", auth, modifyUser);
router.get("/", auth, getUser);

export default router;
