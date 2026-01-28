import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";

const signup = async (payload: User) => {
  const {
    name,
    email,
    password: plainPass,
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
    data: { name, email, password, phone, status, role, address },
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

export const authService = {
  signup,
  signin,
};
