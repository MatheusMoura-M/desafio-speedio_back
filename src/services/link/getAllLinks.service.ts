import { iLinkResponse } from "../../interfaces/link";
import { allLinksResponseSchema } from "../../schemas/link";
import { linkRepo } from "../../utils/repositories";

export const getAllLinksService = async (): Promise<iLinkResponse[]> => {
  const links = await linkRepo.find();

  links.sort((a, b) => {
    return b.visits - a.visits;
  });

  const linksValidated = await allLinksResponseSchema.validate(links, {
    stripUnknown: true,
  });

  return linksValidated;
};
