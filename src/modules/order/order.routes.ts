import { Router } from "express";
import { auth } from "../../middleware/auth";
import { orderController } from "./order.controller";

const router = Router();

router.get(
  "/",
  auth.protect,
  auth.restrictTo("customer"),
  orderController.getMyOrders,
);
router.get(
  "/:id",
  auth.protect,
  auth.restrictTo("customer"),
  orderController.getOrderDetails,
);

router.post(
  "/",
  auth.protect,
  auth.restrictTo("customer"),
  orderController.createOrder,
);

export const orderRoutes = router;
