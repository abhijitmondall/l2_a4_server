import { reviewService } from "./review.service";
const createReview = async (req, res) => {
    try {
        const user = req.user;
        const review = await reviewService.createReview(user, req.body);
        res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            data: review,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getMedicineReviews = async (req, res) => {
    try {
        const { medicineId } = req.params;
        const reviews = await reviewService.getMedicineReviews(medicineId);
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            total: reviews.length,
            data: reviews,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const updateReview = async (req, res) => {
    try {
        const user = req.user;
        const reviewId = req.params.id;
        const review = await reviewService.updateReview(reviewId, user, req.body);
        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteReview = async (req, res) => {
    try {
        const user = req.user;
        const reviewId = req.params.id;
        const deletedReview = await reviewService.deleteReview(reviewId, user);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: deletedReview,
        });
    }
    catch (error) {
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
//# sourceMappingURL=review.controller.js.map