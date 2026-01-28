import { prisma } from "../../lib/prisma";

const getMedicines = async () => {
  const medicines = await prisma.medicine.findMany();

  if (!medicines) {
    return null;
  }

  return medicines;
};

const getMedicine = async (id: string) => {
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
    },
  });

  if (!medicine) {
    return null;
  }

  return medicine;
};

const addMedicineCategory = async (name: string) => {
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

const getMedicineCategories = async () => {
  const categories = await prisma.category.findMany();

  if (!categories) {
    return null;
  }

  return categories;
};

export const medicineService = {
  getMedicines,
  getMedicine,
  addMedicineCategory,
  getMedicineCategories,
};
