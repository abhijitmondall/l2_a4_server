import { Medicine, User } from "../../../generated/prisma/client";
import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const addMedicine = async (sellerId: string, payload: Medicine) => {
  return prisma.medicine.create({
    data: {
      ...payload,
      sellerId,
    },
  });
};

const updateMedicine = async (
  sellerId: string,
  medicineId: string,
  payload: Medicine,
) => {
  const updatedMedicine = await prisma.medicine.update({
    where: {
      id: medicineId,
      sellerId,
    },
    data: payload,
  });

  if (!updatedMedicine) {
    return null;
  }

  return updatedMedicine;
};

const deleteMedicine = async (sellerId: string, medicineId: string) => {
  const deletedMedicine = await prisma.medicine.delete({
    where: {
      id: medicineId,
      sellerId,
    },
  });

  if (!deletedMedicine) {
    return null;
  }

  return deletedMedicine;
};

const getSellerOrders = async (sellerId: string) => {
  const sellerOrders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          sellerId,
        },
      },
    },
    include: {
      items: {
        where: { sellerId },
        include: {
          medicine: true,
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

  return sellerOrders;
};

const updateOrderStatus = async (
  sellerId: string,
  orderId: string,
  status: OrderStatus,
) => {
  // seller can only update orders containing their items
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      items: {
        some: {
          sellerId,
        },
      },
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

export const sellerService = {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
};
