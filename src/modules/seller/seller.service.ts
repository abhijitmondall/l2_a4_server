import { Medicine, Prisma, User } from "../../../generated/prisma/client";
import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IGetMedicinesParams } from "../medicines/medicine.service";

const getMedicines = async (params: IGetMedicinesParams) => {
  const {
    search,
    categoryId,
    categoryName,
    sellerId,
    minPrice,
    maxPrice,
    inStock,
    minRating,
  } = params;

  const where: Prisma.MedicineWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (categoryName) {
    where.category = { name: categoryName };
  }

  if (sellerId) {
    where.sellerId = sellerId;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (inStock === true) {
    where.stock = { gt: 0 };
  }

  if (inStock === false) {
    where.stock = { equals: 0 };
  }

  if (minRating !== undefined) {
    where.reviews = {
      some: { rating: { gte: minRating } }, // at least one review with rating >= minRating
    };
  }

  const medicines = await prisma.medicine.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      reviews: {
        select: {
          id: true,
          comment: true,
          rating: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return medicines;
};

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

const getSellerOrders = async (sellerId: string, status?: OrderStatus) => {
  const sellerOrders = await prisma.order.findMany({
    where: {
      ...(status && status !== ("all" as any) && { status }),
      items: { some: { sellerId } },
    },
    include: {
      items: {
        include: {
          medicine: { select: { name: true, image: true } },
        },
      },
      customer: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return sellerOrders.map((order) => {
    const myItems = order.items.filter((item) => item.sellerId === sellerId);
    const otherSellerItems = order.items.filter(
      (item) => item.sellerId !== sellerId,
    );

    // Calculate payouts
    const sellerPayout = myItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const otherPayout = otherSellerItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      ...order,
      myItems,
      otherSellerItems,
      sellerPayout,
      otherPayout,
      items: undefined,
    };
  });
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
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
};
