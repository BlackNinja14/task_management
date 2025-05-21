import express from "express";
import { getTasks, addTask } from "../controllers/task.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/")
  .get(protect, getTasks)
  .post(protect, addTask);

export default router;
