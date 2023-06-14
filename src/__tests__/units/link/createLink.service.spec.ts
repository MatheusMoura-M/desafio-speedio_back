import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import { createUserService, getAllUsersService } from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";
import { createLinkService } from "../../../services/link";
import { createLinkMock } from "../../mocks/link.mocks";

describe("CREATE LINK", () => {
  let conn: DataSource;
  let id = "";

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        const userResp = await createUserService(createUserMock);
        id = userResp.id;
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Criação de um link - Sucesso", async () => {
    const response = await createLinkService(createLinkMock, id);

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
