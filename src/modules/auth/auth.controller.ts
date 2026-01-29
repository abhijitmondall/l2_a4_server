import { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    if (role && role === "admin") {
      throw new Error("You don't have permission to signup as a Admin!");
    }

    const newUser = await authService.signup(req.body);

    const user = { ...newUser, password: undefined };

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (err: any) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signin(email, password);

    res.status(200).json({
      success: true,
      message: "User signin successful!",
      data: user,
    });
  } catch (err: any) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
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
  } catch (err: any) {
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
  getCurrentUser,
};
