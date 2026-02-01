import { authService } from "./auth.service";
import { userService } from "../user/user.service";
const signup = async (req, res) => {
    try {
        const { role } = req.body;
        if (role && role === "admin") {
            throw new Error("You don't have permission to signup as Admin!");
        }
        const newUser = await authService.signup(req.body);
        // const user = { ...newUser, password: undefined };
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: newUser,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.signin(email, password);
        res.status(200).json({
            success: true,
            message: "User signin successful!",
            data: user,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please login!");
        }
        const currentUser = await authService.getCurrentUser(user.id);
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: currentUser,
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
const updateCurrentUser = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id)
            throw new Error("Invalid ID");
        const getUserByID = await userService.getUserByID(id);
        if (!getUserByID) {
            throw new Error(`No User Found with this id: ${id}`);
        }
        let { name, photo, phone, address } = req.body;
        const updatedUser = await authService.updateCurrentUser({
            name,
            phone,
            photo,
            address,
            id,
        });
        if (!updatedUser) {
            throw new Error(`No User Found with this id: ${id}`);
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
const updateCurrentUserPassword = async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id)
            throw new Error("Invalid ID");
        const getUserByID = await userService.getUserByID(id);
        if (!getUserByID) {
            throw new Error(`No User Found with this id: ${id}`);
        }
        let { password } = req.body;
        if (password?.trim().length < 6) {
            throw new Error("Password at least be 6 characters long!");
        }
        const updatedUser = await authService.updateCurrentUserPassword({
            password,
            id,
        });
        if (!updatedUser) {
            throw new Error(`No User Found with this id: ${id}`);
        }
        const user = { ...updatedUser, password: undefined };
        res.status(200).json({
            success: true,
            message: "Password Updated successfully",
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
export const authController = {
    signup,
    signin,
    updateCurrentUser,
    updateCurrentUserPassword,
    getCurrentUser,
};
//# sourceMappingURL=auth.controller.js.map