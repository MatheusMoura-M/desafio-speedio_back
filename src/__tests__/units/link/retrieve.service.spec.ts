import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import {
  createLinkService,
  getAllLinksService,
  getSpecificLinkService,
  getUserLinksService,
} from "../../../services/link";
import { createUserService } from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";
import { createLinkMock } from "../../mocks/link.mocks";

describe("GET LINKS", () => {
  let conn: DataSource;
  let id = "";
  let shortenedLink = "";

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        const userResp = await createUserService(createUserMock);
        const linkResp = await createLinkService(createLinkMock, userResp.id);
        id = userResp.id;
        shortenedLink = linkResp.shortened_link;
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Listagem de todos os links - Sucesso", async () => {
    const response = await getAllLinksService();

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

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("Listagem de links de um usuário - Sucesso", async () => {
    const response = await getUserLinksService(id);

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

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("Listagem de link pelo link encurtado - Sucesso", async () => {
    const response = await getSpecificLinkService(shortenedLink);

    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        original_link: expect.any(String),
        shortened_link: expect.any(String),
        visits: expect.any(Number),
      }),
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });
});
