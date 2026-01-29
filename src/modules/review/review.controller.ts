import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { User } from "../../../generated/prisma/client";

const createReview = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const review = await reviewService.createReview(user as User, req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;

    const reviews = await reviewService.getMedicineReviews(
      medicineId as string,
    );

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const reviewId = req.params.id;

    const review = await reviewService.updateReview(
      reviewId as string,
      user as User,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const reviewId = req.params.id;

    await reviewService.deleteReview(reviewId as string, user as User);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const reviewController = {
  createReview,
  getMedicineReviews,
  updateReview,
  deleteReview,
};
