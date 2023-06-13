import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import { createUserService, getAllUsersService } from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";

describe("GET USER", () => {
  let conn: DataSource;

  beforeAll(async () => {
    await appDataSource
      .initialize()
      .then((dataSource) => {
        conn = dataSource;
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Listagem de todos os usuários", async () => {
    await createUserService(createUserMock);
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
});
