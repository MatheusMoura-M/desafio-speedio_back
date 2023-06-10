import appDataSource from "../../data-source";
import { Link, User } from "../../entities";

const userRepo = appDataSource.getRepository(User);
const linkRepo = appDataSource.getRepository(Link);

export { userRepo, linkRepo };
