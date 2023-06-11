import { linkRepo } from "../../utils/repositories";

export const listUserLinksService = async (userId: string) => {
  const links = await linkRepo.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  return links;
};
