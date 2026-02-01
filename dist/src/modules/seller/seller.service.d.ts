import { Medicine } from "../../../generated/prisma/client";
import { OrderStatus } from "../../../generated/prisma/enums";
import { IGetMedicinesParams } from "../medicines/medicine.service";
export declare const sellerService: {
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
    addMedicine: (sellerId: string, payload: Medicine) => Promise<{
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
    }>;
    updateMedicine: (sellerId: string, medicineId: string, payload: Medicine) => Promise<{
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
    } | null>;
    deleteMedicine: (sellerId: string, medicineId: string) => Promise<{
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
    } | null>;
    getSellerOrders: (sellerId: string, status?: OrderStatus) => Promise<{
        myItems: ({
            medicine: {
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
        otherSellerItems: ({
            medicine: {
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
        sellerPayout: number;
        otherPayout: number;
        items: undefined;
        customer: {
            name: string;
            email: string;
        };
        id: string;
        status: OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddr: string;
    }[]>;
    updateOrderStatus: (sellerId: string, orderId: string, status: OrderStatus) => Promise<{
        id: string;
        status: OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        paymentMethod: import("../../../generated/prisma/enums").PaymentMethod;
        totalAmount: number;
        shippingName: string;
        shippingPhone: string;
        shippingAddr: string;
    }>;
};
//# sourceMappingURL=seller.service.d.ts.map