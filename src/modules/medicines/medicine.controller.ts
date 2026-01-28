import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await medicineService.getMedicines();

    res.status(200).json({
      success: true,
      message: "Medicines retrieved successfully",
      total: medicines?.length,
      data: medicines,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Invalid ID");

    const medicine = await medicineService.getMedicine(id as string);

    if (!medicine) {
      throw new Error(`No Medicine Found with this ID: ${id}`);
    }

    res.status(200).json({
      success: true,
      message: "Medicine retrieved successfully",
      data: medicine,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const addMedicineCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log(name);
    const category = await medicineService.addMedicineCategory(name);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMedicineCategories = async (req: Request, res: Response) => {
  try {
    const categories = await medicineService.getMedicineCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      total: categories?.length,
      data: categories,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const medicineController = {
  getMedicines,
  getMedicine,
  addMedicineCategory,
  getMedicineCategories,
};
