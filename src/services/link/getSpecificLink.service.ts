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
    relations: {
      user: true,
    },
  });

  if (!link) {
    throw new AppError("Link not found!", 404);
  }

  const linkValidated = await specificLinkResponseSchema.validate(link, {
    stripUnknown: true,
  });

  return linkValidated;
};
