import express, { Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello there! The API is ready!",
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Invalid endpoint: ${req.originalUrl}`,
  });
});

export default app;
