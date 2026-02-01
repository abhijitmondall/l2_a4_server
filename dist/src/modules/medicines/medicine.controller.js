import { medicineService } from "./medicine.service";
const getMedicines = async (req, res) => {
    try {
        const { search, categoryId, categoryName, sellerId, minPrice, maxPrice, inStock, minRating, } = req.query;
        const filters = {};
        if (search)
            filters.search = search;
        if (categoryId)
            filters.categoryId = categoryId;
        if (categoryName)
            filters.categoryName = categoryName;
        if (sellerId)
            filters.sellerId = sellerId;
        if (minPrice)
            filters.minPrice = Number(minPrice);
        if (maxPrice)
            filters.maxPrice = Number(maxPrice);
        if (minRating)
            filters.minRating = Number(minRating);
        if (inStock === "true") {
            filters.inStock = true;
        }
        if (inStock === "false") {
            filters.inStock = false;
        }
        const medicines = await medicineService.getMedicines(filters);
        res.status(200).json({
            success: true,
            message: "Medicines retrieved successfully",
            total: medicines.length,
            data: medicines,
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const getMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("Invalid ID");
        const medicine = await medicineService.getMedicine(id);
        if (!medicine) {
            throw new Error(`No Medicine Found with this ID: ${id}`);
        }
        res.status(200).json({
            success: true,
            message: "Medicine retrieved successfully",
            data: medicine,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const addMedicineCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await medicineService.addMedicineCategory(name);
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteMedicineCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error(`Invalid Medicine ID!: ${id}`);
        }
        const deletedCategory = await medicineService.deleteMedicineCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: deletedCategory,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const getMedicineCategories = async (req, res) => {
    try {
        const categories = await medicineService.getMedicineCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            total: categories?.length,
            data: categories,
        });
    }
    catch (err) {
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
    deleteMedicineCategory,
    getMedicineCategories,
};
//# sourceMappingURL=medicine.controller.js.map