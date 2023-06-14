import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
} from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";

describe("GET USERS", () => {
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

  it("Listagem de todos os usuários - Sucesso", async () => {
    const response = await getAllUsersService();

    const expectResults = {
      bodyStrictEqual: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          links: expect.arrayContaining([]),
        }),
      ]),
      bodyNotHaveProperty: "password",
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
    expect(response).not.toHaveProperty(expectResults.bodyNotHaveProperty);
  });

  it("Listagem de um usuário por id - Sucesso", async () => {
    const response = await getUserByIdService(id);

    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        links: expect.arrayContaining([]),
      }),
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });
});
