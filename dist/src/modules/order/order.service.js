import { prisma } from "../../lib/prisma";
const createOrder = async (customerId, data) => {
    if (!data.items || data.items.length === 0) {
        throw new Error("Order items are required");
    }
    const medicines = await prisma.medicine.findMany({
        where: {
            id: {
                in: data.items.map((i) => i.medicineId),
            },
        },
    });
    if (medicines.length !== data.items.length) {
        throw new Error("One or more medicines not found");
    }
    let totalAmount = 0;
    const orderItems = data.items.map((item) => {
        const medicine = medicines.find((m) => m.id === item.medicineId);
        totalAmount += medicine.price * item.quantity;
        return {
            medicineId: medicine.id,
            sellerId: medicine.sellerId,
            quantity: item.quantity,
            price: medicine.price,
        };
    });
    return prisma.order.create({
        data: {
            customerId,
            totalAmount,
            shippingName: data.shippingName,
            shippingPhone: data.shippingPhone,
            shippingAddr: data.shippingAddr,
            items: {
                create: orderItems,
            },
        },
        include: {
            items: {
                include: {
                    medicine: true,
                    seller: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
};
const getCustomerOrders = async (customerId, status) => {
    return prisma.order.findMany({
        where: {
            ...(status && status !== "all" && { status }),
            customerId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    medicine: true,
                },
            },
        },
    });
};
const getAllOrder = async () => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    medicine: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    seller: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return orders.map((order) => {
        const sellerSummaries = order.items.reduce((acc, item) => {
            const sId = item.sellerId;
            if (!acc[sId]) {
                acc[sId] = {
                    sellerId: sId,
                    sellerName: item.seller?.name,
                    sellerEmail: item.seller?.email,
                    payable: 0,
                };
            }
            acc[sId].payable += item.price * item.quantity;
            return acc;
        }, {});
        return {
            ...order,
            sellerBreakdown: Object.values(sellerSummaries),
        };
    });
};
const getOrderById = async (orderId, customerId) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
        include: {
            items: {
                include: {
                    medicine: true,
                    seller: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
};
const updateOrderStatus = async (orderId, status) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if (!order) {
        throw new Error("Order not found or unauthorized");
    }
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
export const orderService = {
    createOrder,
    getAllOrder,
    updateOrderStatus,
    getCustomerOrders,
    getOrderById,
};
//# sourceMappingURL=order.service.js.map