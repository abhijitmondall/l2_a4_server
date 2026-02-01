import express from "express";
import { sellerController } from "./seller.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get(
  "/medicines",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.getMedicines,
);

router.post(
  "/medicines",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.addMedicine,
);

router.put(
  "/medicines/:id",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.updateMedicine,
);

router.delete(
  "/medicines/:id",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.deleteMedicine,
);

router.get(
  "/orders",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.getSellerOrders,
);

router.patch(
  "/orders/:id",
  auth.protect,
  auth.restrictTo("seller"),
  sellerController.updateOrderStatus,
);

export const sellerRoutes = router;
