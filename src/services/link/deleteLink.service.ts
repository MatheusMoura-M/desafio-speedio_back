import { AppError } from "../../error";
import { linkRepo, userRepo } from "../../utils/repositories";

export const deleteLinkService = async (
  userId: string,
  linkId: string
): Promise<{}> => {
  const user = await userRepo.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const link = await linkRepo.findOne({
    where: {
      id: linkId,
    },
    relations: {
      user: true,
    },
  });

  if (!link) {
    throw new AppError("Link not found!", 404);
  }

  if (!link.user) {
    throw new AppError("You don't have permission to update", 403);
  }

  if (link.user.id !== user!.id) {
    throw new AppError("You don't have permission to delete this link", 403);
  }

  await linkRepo.delete(link.id);

  return {};
};
