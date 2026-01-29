import { Request, Response } from "express";
import { userService } from "./user.service";
import { User } from "../../../generated/prisma/client";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      total: users.length,
      data: users,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) throw new Error("Invalid ID");

    // if (req.user?.role === "customer") {
    //   if (+req.user?.id !== +userId) {
    //     throw new Error("You do not have permission to update this user!");
    //   }
    // }

    const getUserByID = await userService.getUserByID(userId as string);

    if (!getUserByID) {
      throw new Error(`No User Found with this id: ${userId}`);
    }

    let { name, email, password, role, phone, address, status } = req.body;

    if (!name) name = getUserByID?.name;
    if (!email) email = getUserByID?.email;
    if (!password) password = getUserByID?.password;
    if (!role) role = getUserByID?.role;
    if (!phone) phone = getUserByID?.phone;
    if (!address) address = getUserByID?.address;
    if (!status) status = getUserByID?.status;

    if ((password as string).trim().length < 6) {
      throw new Error("Password at least be 6 characters long!");
    }

    const updatedUser = await userService.updateUser({
      name,
      email,
      password,
      role,
      phone,
      address,
      status,
      id: userId,
    } as User);

    if (!updatedUser) {
      throw new Error(`No User Found with this id: ${userId}`);
    }

    const user = { ...updatedUser, password: undefined };

    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: user,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await userService.deleteUser(userId as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err: any) {
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
