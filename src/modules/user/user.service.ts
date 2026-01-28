import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";

const getUsers = async () => {
  const users = await prisma.user.findMany({
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

const getUserByEmail = async (email: string) => {
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

const getUserByID = async (id: string) => {
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

const updateUser = async (payload: User) => {
  const {
    id,
    name,
    email,
    password: plainPass,
    role,
    phone,
    address,
    status,
  } = payload;
  const password = await bcrypt.hash(plainPass as string, 12);

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
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

const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const userService = {
  getUsers,
  getUserByEmail,
  getUserByID,
  updateUser,
  deleteUser,
};
