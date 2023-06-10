import { AppError } from "../../error";
import { iLinkResponse } from "../../interfaces/link";
import { specificLinkResponseSchema } from "../../schemas/link";
import { linkRepo } from "../../utils/repositories";

export const getSpecificLinkService = async (
  linkId: string
): Promise<iLinkResponse> => {
  const link = await linkRepo.findOne({
    where: {
      id: linkId,
    },
  });

  if (!link) {
    throw new AppError("Link not found!", 404);
  }

  const incrementVisits = linkRepo.create({
    ...link,
    visits: link.visits + 1,
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
