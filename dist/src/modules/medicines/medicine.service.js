import { prisma } from "../../lib/prisma";
const getMedicines = async (params) => {
    const { search, categoryId, categoryName, sellerId, minPrice, maxPrice, inStock, minRating, } = params;
    const where = {};
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
        if (minPrice !== undefined)
            where.price.gte = minPrice;
        if (maxPrice !== undefined)
            where.price.lte = maxPrice;
    }
    if (inStock === true) {
        where.stock = { gt: 0 };
    }
    if (inStock === false) {
        where.stock = { equals: 0 };
    }
    if (minRating !== undefined) {
        where.reviews = {
            some: { rating: { gte: minRating } },
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
const getMedicine = async (id) => {
    const medicine = await prisma.medicine.findUnique({
        where: {
            id,
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
            seller: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    phone: true,
                    address: true,
                },
            },
            reviews: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                        },
                    },
                },
            },
        },
    });
    if (!medicine) {
        return null;
    }
    return medicine;
};
const addMedicineCategory = async (name) => {
    const category = await prisma.category.create({
        data: {
            name,
        },
    });
    if (!category) {
        return null;
    }
    return category;
};
const deleteMedicineCategory = async (id) => {
    // 1. Check if any medicines are using this category
    const medicineCount = await prisma.medicine.count({
        where: { categoryId: id },
    });
    if (medicineCount > 0) {
        throw new Error("PROTOCOL_VIOLATION: Cannot delete category with active medicine records.");
    }
    // 2. Perform the delete
    try {
        const category = await prisma.category.delete({
            where: { id },
        });
        return category;
    }
    catch (error) {
        return null;
    }
};
const getMedicineCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    if (!categories) {
        return null;
    }
    return categories;
};
export const medicineService = {
    getMedicines,
    getMedicine,
    addMedicineCategory,
    deleteMedicineCategory,
    getMedicineCategories,
};
//# sourceMappingURL=medicine.service.js.map