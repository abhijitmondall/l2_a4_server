import { OrderItem, OrderStatus } from "../../../generated/prisma/client";
interface ICreateOrderInput {
    items: OrderItem[];
    shippingName: string;
    shippingPhone: string;
    shippingAddr: string;
}
export declare const orderService: {
    createOrder: (customerId: string, data: ICreateOrderInput) => Promise<{
        items: ({
            seller: {
                name: string;
                id: string;
            };
            medicine: {
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
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
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
    getAllOrder: () => Promise<{
        sellerBreakdown: unknown[];
        customer: {
            name: string;
            id: string;
            email: string;
        };
        items: ({
            seller: {
                name: string;
                id: string;
                email: string;
            };
            medicine: {
                name: string;
                id: string;
                price: number;
                category: {
                    name: string;
                    id: string;
                };
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
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
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
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
    getCustomerOrders: (customerId: string, status?: OrderStatus) => Promise<({
        items: ({
            medicine: {
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
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
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
    })[]>;
    getOrderById: (orderId: string, customerId: string) => Promise<{
        items: ({
            seller: {
                name: string;
                id: string;
            };
            medicine: {
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
            };
        } & {
            id: string;
            price: number;
            sellerId: string;
            medicineId: string;
            orderId: string;
            quantity: number;
        })[];
    } & {
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
export {};
//# sourceMappingURL=order.service.d.ts.map