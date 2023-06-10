import { AppError } from "../../error";
import { getSpecificUserSchema } from "../../schemas/user/getSpecificUser.schema";
import { userRepo } from "../../utils/repositories";

export const getUserByIdService = async (userId: string) => {
  const getUser = await userRepo.findOne({
    where: { id: userId },
    relations: {
      links: true,
    },
  });

  if (!getUser) {
    throw new AppError("User not found!", 404);
  }

  const clientWithoutPassword = await getSpecificUserSchema.validate(getUser, {
    stripUnknown: true,
  });

  return clientWithoutPassword;
};
