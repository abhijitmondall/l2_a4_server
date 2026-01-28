import express from "express";
import { auth } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = express.Router();

router.get("/", medicineController.getMedicines);
router.get("/categories", medicineController.getMedicineCategories);
router.get("/:id", medicineController.getMedicine);

router.post(
  "/category",
  auth.protect,
  auth.restrictTo("admin"),
  medicineController.addMedicineCategory,
);

export const medicineRoutes = router;
