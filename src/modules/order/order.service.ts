import { OrderItem } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

interface ICreateOrderInput {
  items: OrderItem[];
  shippingName: string;
  shippingPhone: string;
  shippingAddr: string;
}

const createOrder = async (customerId: string, data: ICreateOrderInput) => {
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
    const medicine = medicines.find((m) => m.id === item.medicineId)!;

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

const getCustomerOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: {
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

const getOrderById = async (orderId: string, customerId: string) => {
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

export const orderService = {
  createOrder,
  getCustomerOrders,
  getOrderById,
};
