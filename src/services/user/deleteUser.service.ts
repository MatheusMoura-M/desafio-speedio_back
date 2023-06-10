import { AppError } from "../../error";
import { userRepo } from "../../utils/repositories";

export const deleteUserService = async (id: string) => {
  const userFound = await userRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!userFound) {
    throw new AppError("User not found!", 404);
  }

  await userRepo.delete(id);

  return {};
};
