import { AppError } from "../../error";
import { iUserRequest, iUserResponse } from "../../interfaces/user";
import { userCreateAndUpdateResponseSchema } from "../../schemas/user";
import { userRepo } from "../../utils/repositories";

export const createUserService = async (
  userData: iUserRequest
): Promise<iUserResponse> => {
  const user = await userRepo.findOne({
    where: {
      email: userData.email,
    },
  });

  if (user) {
    throw new AppError("E-mail already registered", 409);
  }

  const newUser = userRepo.create(userData);

  await userRepo.save(newUser);

  const clientWithoutPassword =
    await userCreateAndUpdateResponseSchema.validate(newUser, {
      stripUnknown: true,
    });

  return clientWithoutPassword;
};
