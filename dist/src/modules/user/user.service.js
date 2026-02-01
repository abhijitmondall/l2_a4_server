import { prisma } from "../../lib/prisma";
const getUsers = async () => {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            phone: true,
            address: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!users) {
        throw new Error("No User Found!");
    }
    return users;
};
const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return null;
    }
    return user;
};
const getUserByID = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!user) {
        return null;
    }
    return user;
};
const updateUser = async (payload) => {
    const { id, name, email, role, phone, address, status } = payload;
    // const password = await bcrypt.hash(plainPass as string, 12);
    const updatedUser = await prisma.user.update({
        where: {
            id,
        },
        data: {
            name,
            email,
            role,
            phone,
            address,
            status,
        },
    });
    if (!updatedUser) {
        return null;
    }
    return updatedUser;
};
const deleteUser = async (id) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id,
        },
    });
    if (!deletedUser) {
        return null;
    }
    return deletedUser;
};
export const userService = {
    getUsers,
    getUserByEmail,
    getUserByID,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.service.js.map