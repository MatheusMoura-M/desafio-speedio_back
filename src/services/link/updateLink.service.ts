import { AppError } from "../../error";
import { iLinkUpdateResponse, iLinkUpdate } from "../../interfaces/link";
import { linkUpdateResponseSchema } from "../../schemas/link";
import { linkRepo, userRepo } from "../../utils/repositories";

export const updateLinkService = async (
  linkUpdateData: iLinkUpdate,
  userId: string,
  linkId: string
): Promise<iLinkUpdateResponse> => {
  if (linkUpdateData.title === "") {
    delete linkUpdateData["title"];
  }
  const user = await userRepo.findOneBy({
    id: userId,
  });

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
    throw new AppError("You don't have permission to update this link", 403);
  }

  const updatedLink = linkRepo.create({
    ...link,
    ...linkUpdateData,
  });

  await linkRepo.save(updatedLink);

  const returnLink = await linkUpdateResponseSchema.validate(updatedLink, {
    stripUnknown: true,
  });

  return returnLink;
};
