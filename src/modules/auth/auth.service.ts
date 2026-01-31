import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";

const signup = async (payload: User) => {
  const {
    name,
    email,
    gender,
    password: plainPass,
    photo,
    phone,
    status,
    role,
    address,
  } = payload;

  if ((plainPass as string).trim().length < 6) {
    throw new Error("Password at least be 6 characters long!");
  }

  const password = await bcrypt.hash(plainPass as string, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      gender,
      password,
      photo,
      phone,
      status,
      role,
      address,
    },
  });

  return newUser;
};

const signin = async (email: string, password: string) => {
  const getUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!getUser) {
    throw new Error("User Not Found!");
  }

  const match = await bcrypt.compare(password, getUser.password);
  if (!match) {
    throw new Error("Wrong credential!");
  }

  const token = jwt.sign(
    { email: getUser.email },
    config.jwt_secret as string,
    {
      expiresIn: "30d",
    },
  );

  const user = { ...getUser, password: undefined };

  return { user, token };
};

const getCurrentUser = async (id: string) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      photo: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
};

const updateCurrentUser = async (payload: User) => {
  const { id, name, photo, phone, address } = payload;

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      photo,
      phone,
      address,
    },
  });

  if (!updatedUser) {
    return null;
  }
  return updatedUser;
};
const updateCurrentUserPassword = async (payload: User) => {
  const { id, password: plainPass } = payload;

  const password = await bcrypt.hash(plainPass as string, 12);

  const updatedPass = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });

  if (!updatedPass) {
    return null;
  }
  return updatedPass;
};

export const authService = {
  signup,
  signin,
  updateCurrentUser,
  updateCurrentUserPassword,
  getCurrentUser,
};
