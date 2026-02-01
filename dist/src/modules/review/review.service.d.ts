import { User } from "../../../generated/prisma/client";
interface CreateReviewInput {
    medicineId: string;
    rating: number;
    comment: string;
}
export declare const reviewService: {
    createReview: (user: User, data: CreateReviewInput) => Promise<{
        user: {
            name: string;
            id: string;
        };
        medicine: {
            name: string;
            id: string;
            category: {
                name: string;
                id: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        rating: number;
        comment: string;
        medicineId: string;
    }>;
    getMedicineReviews: (medicineId: string) => Promise<({
        user: {
            name: string;
            id: string;
            photo: string | null;
        };
        medicine: {
            name: string;
            id: string;
            category: {
                name: string;
                id: string;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        rating: number;
        comment: string;
        medicineId: string;
    })[]>;
    updateReview: (reviewId: string, user: User, data: {
        rating?: number;
        comment?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        rating: number;
        comment: string;
        medicineId: string;
    }>;
    deleteReview: (reviewId: string, user: User) => Promise<void>;
};
export {};
//# sourceMappingURL=review.service.d.ts.map