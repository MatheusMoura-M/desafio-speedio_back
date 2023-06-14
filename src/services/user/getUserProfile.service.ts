import { AppError } from "../../error";
import { iGetUserResponse } from "../../interfaces/user";
import { getSpecificUserSchema } from "../../schemas/user/getSpecificUser.schema";
import { userRepo } from "../../utils/repositories";

export const userProfileService = async (
  id_user: string
): Promise<iGetUserResponse> => {
  const getUser = await userRepo.findOne({
    where: { id: id_user },
  });

  if (!getUser) {
    throw new AppError("User not found!", 404);
  }

  const clientWithoutPassword = await getSpecificUserSchema.validate(getUser, {
    stripUnknown: true,
  });

  return clientWithoutPassword;
};
