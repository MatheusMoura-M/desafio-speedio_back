import { iGetUserResponse } from "../../interfaces/user";
import { allUsersResponseSchema } from "../../schemas/user";
import { userRepo } from "../../utils/repositories";

export const getAllUsersService = async (): Promise<iGetUserResponse[]> => {
  const users = await userRepo.find({
    relations: {
      links: true,
    },
  });

  const usersValidated = await allUsersResponseSchema.validate(users, {
    stripUnknown: true,
  });

  return usersValidated;
};
