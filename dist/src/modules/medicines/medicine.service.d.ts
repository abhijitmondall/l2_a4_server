export interface IGetMedicinesParams {
    search?: string;
    categoryId?: string;
    categoryName?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    minRating?: number;
}
export declare const medicineService: {
    getMedicines: (params: IGetMedicinesParams) => Promise<({
        seller: {
            name: string;
            id: string;
        };
        reviews: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            rating: number;
            comment: string;
        }[];
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        manufacturer: string;
        image: string | null;
        categoryId: string;
        sellerId: string;
    })[]>;
    getMedicine: (id: string) => Promise<({
        seller: {
            name: string;
            id: string;
            email: string;
            status: import("../../../generated/prisma/enums").UserStatus;
            phone: string | null;
            address: string | null;
        };
        reviews: ({
            user: {
                name: string;
                id: string;
                email: string;
                phone: string | null;
                address: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            rating: number;
            comment: string;
            medicineId: string;
        })[];
        category: {
            name: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        manufacturer: string;
        image: string | null;
        categoryId: string;
        sellerId: string;
    }) | null>;
    addMedicineCategory: (name: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    deleteMedicineCategory: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getMedicineCategories: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | null>;
};
//# sourceMappingURL=medicine.service.d.ts.map