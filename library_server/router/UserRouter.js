import express from "express";
import {
  refreshToken,
  modifyUser,
  getUser,
} from "../controllers/UserController.js";
import { jwtVerify } from "../middleware/middleware.js";

const router = express.Router();

router.use("/", jwtVerify);

router.get("/refreshtoken", refreshToken);
router.put("/", modifyUser);
router.get("/", getUser);

export default router;
