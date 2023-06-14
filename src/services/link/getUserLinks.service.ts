import { linkRepo } from "../../utils/repositories";

export const getUserLinksService = async (userId: string) => {
  const links = await linkRepo.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  return links;
};
