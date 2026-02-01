import { userService } from "./user.service";
const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            total: users.length,
            data: users,
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
const updateUser = async (req, res) => {
    try {
        console.log(req.body);
        const { userId } = req.params;
        if (!userId)
            throw new Error("Invalid ID");
        // if (req.user?.role === "customer") {
        //   if (+req.user?.id !== +userId) {
        //     throw new Error("You do not have permission to update this user!");
        //   }
        // }
        const getUserByID = await userService.getUserByID(userId);
        if (!getUserByID) {
            throw new Error(`No User Found with this id: ${userId}`);
        }
        let { name, email, role, phone, address, status } = req.body;
        const updatedUser = await userService.updateUser({
            name,
            email,
            role,
            phone,
            address,
            status,
            id: userId,
        });
        if (!updatedUser) {
            throw new Error(`No User Found with this id: ${userId}`);
        }
        const user = { ...updatedUser, password: undefined };
        res.status(200).json({
            success: true,
            message: "User Updated successfully",
            data: user,
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
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
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
export const userController = {
    getUsers,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map