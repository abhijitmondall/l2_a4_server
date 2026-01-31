import express from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get("/me", auth.protect, authController.getCurrentUser);
router.put("/me", auth.protect, authController.updateCurrentUser);
router.put(
  "/me/change-password",
  auth.protect,
  authController.updateCurrentUserPassword,
);

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export const authRoutes = router;
