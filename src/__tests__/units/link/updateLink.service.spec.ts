import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";
import { createLinkMock, updateLinkMock } from "../../mocks/link.mocks";
import {
  createLinkService,
  deleteLinkService,
  getAllLinksService,
  getSpecificLinkService,
  updateLinkService,
} from "../../../services/link";

describe("UPDATE LINK", () => {
  let conn: DataSource;
  let id = "";
  let linkId = "";
  let shortenedLink = "";

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        const userResp = await createUserService(createUserMock);
        const linkResp = await createLinkService(createLinkMock, userResp.id);
        id = userResp.id;
        linkId = linkResp.id;
        shortenedLink = linkResp.shortened_link;
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Atualização de um link - Sucesso", async () => {
    await updateLinkService(updateLinkMock, id, linkId);

    const response = await getSpecificLinkService(shortenedLink);
    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        title: updateLinkMock.title,
      }),
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });
});
