import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";
import { createLinkMock } from "../../mocks/link.mocks";
import {
  createLinkService,
  deleteLinkService,
  getAllLinksService,
} from "../../../services/link";

describe("DELETE LINK", () => {
  let conn: DataSource;
  let id = "";
  let linkId = "";

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        const userResp = await createUserService(createUserMock);
        const linkResp = await createLinkService(createLinkMock, userResp.id);
        id = userResp.id;
        linkId = linkResp.id;
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Deleção de link - Sucesso", async () => {
    const respPrimary = await getAllLinksService();

    const expectResults = {
      bodyStrictEqual: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          original_link: expect.any(String),
          shortened_link: expect.any(String),
          visits: expect.any(Number),
        }),
      ]),
    };

    expect(respPrimary).toStrictEqual(expectResults.bodyStrictEqual);

    await deleteLinkService(id, linkId);

    const respSecondary = await getAllLinksService();

    expect(respSecondary.length).toStrictEqual(0);
  });
});
