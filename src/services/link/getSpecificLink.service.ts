import { AppError } from "../../error";
import { iLinkResponse } from "../../interfaces/link";
import { specificLinkResponseSchema } from "../../schemas/link";
import { linkRepo } from "../../utils/repositories";

export const getSpecificLinkService = async (
  shortened_link: string
): Promise<iLinkResponse> => {
  const linkFound = await linkRepo.findOne({
    where: {
      shortened_link: shortened_link,
    },
  });

  if (!linkFound) {
    throw new AppError("Link not found!", 404);
  }

  const incrementVisits = linkRepo.create({
    ...linkFound,
    visits: linkFound.visits + 1,
  });

  await linkRepo.save(incrementVisits);

  const linkValidated = await specificLinkResponseSchema.validate(
    incrementVisits,
    {
      stripUnknown: true,
    }
  );

  return linkValidated;
};
