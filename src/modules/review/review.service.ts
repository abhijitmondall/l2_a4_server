import { Review, User } from "../../../generated/prisma/client";
import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface CreateReviewInput {
  medicineId: string;
  rating: number;
  comment: string;
}

const createReview = async (user: User, data: CreateReviewInput) => {
  if (user.role !== Role.customer) {
    throw new Error("Only customers can submit reviews");
  }

  const { medicineId, rating, comment } = data;

  if (!medicineId || !rating || !comment) {
    throw new Error("All fields are required");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      medicineId_userId: {
        medicineId,
        userId: user.id,
      },
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this medicine");
  }

  return prisma.review.create({
    data: {
      medicineId,
      userId: user.id,
      rating,
      comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const getMedicineReviews = async (medicineId: string) => {
  return prisma.review.findMany({
    where: { medicineId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const updateReview = async (
  reviewId: string,
  user: User,
  data: { rating?: number; comment?: string },
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.userId !== user.id) {
    throw new Error("You are not allowed to update this review");
  }

  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: data.rating,
      comment: data.comment,
    } as Review,
  });
};

const deleteReview = async (reviewId: string, user: User) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.userId !== user.id) {
    throw new Error("You are not allowed to delete this review");
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });
};

export const reviewService = {
  createReview,
  getMedicineReviews,
  updateReview,
  deleteReview,
};
