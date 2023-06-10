import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../error";
import { userRepo } from "../../utils/repositories";
import { iUserLogin } from "../../interfaces/user";

export const userLoginService = async ({
  email,
  password,
}: iUserLogin): Promise<{ token: string }> => {
  const user = await userRepo.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const passwordCheck = await compare(password, user.password);

  if (!passwordCheck) {
    throw new AppError("Invalid User or password!", 403);
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return { token: token };
};
