import { AppError } from "../../error";
import { iLinkRequest } from "../../interfaces/link";
import { linkResponseSchema } from "../../schemas/link";
import { createShortenedLink } from "../../utils";
import { linkRepo, userRepo } from "../../utils/repositories";

export const createLinkService = async (
  linkData: iLinkRequest,
  userId: string
) => {
  const userFound = await userRepo.findOneBy({
    id: userId,
  });

  if (!userFound) {
    throw new AppError("user not found", 404);
  }

  const shortenedLink = createShortenedLink();

  const link = {
    ...linkData,
    shortened_link: shortenedLink,
    user: userId ? userFound : null,
  };

  const newLink = linkRepo.create(link);
  await linkRepo.save(newLink);

  const returnLink = await linkResponseSchema.validate(newLink, {
    stripUnknown: true,
  });

  return returnLink;
};
