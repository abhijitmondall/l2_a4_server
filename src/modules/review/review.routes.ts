import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/medicine/:medicineId", reviewController.getMedicineReviews);

router.post(
  "/",
  auth.protect,
  auth.restrictTo("customer"),
  reviewController.createReview,
);

router.put(
  "/:id",
  auth.protect,
  auth.restrictTo("customer"),
  reviewController.updateReview,
);

router.delete(
  "/:id",
  auth.protect,
  auth.restrictTo("customer"),
  reviewController.deleteReview,
);

export const reviewRoutes = router;
