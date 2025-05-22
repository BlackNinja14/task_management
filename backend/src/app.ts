import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./swagger";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
