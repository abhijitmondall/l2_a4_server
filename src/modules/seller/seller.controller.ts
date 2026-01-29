import { Request, Response } from "express";
import { sellerService } from "./seller.service";

const addMedicine = async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
    const result = await sellerService.addMedicine(sellerId, req.body);

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
    const { id } = req.params;

    const updatedMedicine = await sellerService.updateMedicine(
      sellerId,
      id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: updatedMedicine,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
    const { id } = req?.params;

    const deletedMedicine = await sellerService.deleteMedicine(
      sellerId,
      id as string,
    );

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: deletedMedicine,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
    const sellerOrders = await sellerService.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: sellerOrders,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
    const { id } = req.params;
    const { status } = req.body;

    const result = await sellerService.updateOrderStatus(
      sellerId,
      id as string,
      status,
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const sellerController = {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
};
