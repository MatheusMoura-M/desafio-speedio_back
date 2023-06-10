import { iLinkResponse } from "../../interfaces/link";
import { allLinksResponseSchema } from "../../schemas/link";
import { linkRepo } from "../../utils/repositories";

export const getLinksService = async (): Promise<iLinkResponse[]> => {
  const links = await linkRepo.find();

  const linksValidated = await allLinksResponseSchema.validate(links, {
    stripUnknown: true,
  });

  return linksValidated;
};
