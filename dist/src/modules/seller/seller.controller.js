import { sellerService } from "./seller.service";
const getMedicines = async (req, res) => {
    try {
        const { search, categoryId, categoryName, minPrice, maxPrice, inStock, minRating, } = req.query;
        const filters = {};
        filters.sellerId = req.user?.id;
        if (search)
            filters.search = search;
        if (categoryId)
            filters.categoryId = categoryId;
        if (categoryName)
            filters.categoryName = categoryName;
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
        const medicines = await sellerService.getMedicines(filters);
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
const addMedicine = async (req, res) => {
    try {
        const sellerId = req?.user?.id;
        const result = await sellerService.addMedicine(sellerId, req.body);
        res.status(201).json({
            success: true,
            message: "Medicine added successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const updateMedicine = async (req, res) => {
    try {
        const sellerId = req?.user?.id;
        const { id } = req.params;
        const updatedMedicine = await sellerService.updateMedicine(sellerId, id, req.body);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: updatedMedicine,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const deleteMedicine = async (req, res) => {
    try {
        const sellerId = req?.user?.id;
        const { id } = req?.params;
        const deletedMedicine = await sellerService.deleteMedicine(sellerId, id);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
            data: deletedMedicine,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req?.user?.id; // Assuming your auth middleware populates this
        const statusQuery = req.query.status;
        // Validate if the user is a seller (optional but recommended)
        if (req.user?.role !== "seller") {
            return res
                .status(403)
                .json({ success: false, message: "Access denied. Sellers only." });
        }
        // Convert "all" string to undefined for Prisma
        const status = statusQuery === "all" ? undefined : statusQuery;
        const sellerOrders = await sellerService.getSellerOrders(sellerId, status);
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            total: sellerOrders.length,
            data: sellerOrders,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "An error occurred while fetching orders",
        });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const sellerId = req?.user?.id;
        const { id } = req.params;
        const { status } = req.body;
        const result = await sellerService.updateOrderStatus(sellerId, id, status);
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
export const sellerController = {
    getMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    getSellerOrders,
    updateOrderStatus,
};
//# sourceMappingURL=seller.controller.js.map