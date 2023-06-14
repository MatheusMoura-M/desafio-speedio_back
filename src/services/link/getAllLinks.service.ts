import { iLinkResponse } from "../../interfaces/link";
import { allLinksResponseSchema } from "../../schemas/link";
import { linkRepo } from "../../utils/repositories";

export const getAllLinksService = async (): Promise<iLinkResponse[]> => {
  const links = await linkRepo.find({
    order: {
      visits: { direction: "DESC" },
      title: "ASC",
    },
    take: 100,
  });

  const linksValidated = await allLinksResponseSchema.validate(links, {
    stripUnknown: true,
  });

  return linksValidated;
};
