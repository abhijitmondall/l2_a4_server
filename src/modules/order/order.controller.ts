import { Request, Response } from "express";
import { orderService } from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;

    const order = await orderService.createOrder(customerId, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    const statusQuery = req.query.status as string;

    const status =
      statusQuery === "all" ? undefined : (statusQuery as OrderStatus);

    const orders = await orderService.getCustomerOrders(customerId, status);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      total: orders.length,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrder();

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      total: orders.length,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    const orderId = req?.params?.id;

    const order = await orderService.getOrderById(
      orderId as string,
      customerId,
    );

    if (!order) {
      throw new Error("Order Not Found!");
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!id) {
      throw new Error("Invalid Order ID!");
    }

    if (userRole === "customer") {
      // 1. Ensure they only try to cancel
      if (status !== "cancelled") {
        throw new Error("Invalid action for customer role.");
      }

      // 2. Fetch order to check current status (Ownership + Business Logic)
      const order = await orderService.getOrderById(id as string, userId);

      if (!order) {
        throw new Error("Order not found or unauthorized access.");
      }

      // 3. Prevent cancellation if already processing/shipped
      if (order.status !== "placed") {
        throw new Error(`Cannot cancel order. It is already ${order.status}.`);
      }
    }

    // 4. Perform Update
    const order = await orderService.updateOrderStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
  updateOrderStatus,
  getOrderDetails,
  getMyOrders,
};
