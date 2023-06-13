import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import { createUserService } from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";

describe("CREATE USER", () => {
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

  it("Criação de usuário - Sucesso", async () => {
    const response = await createUserService(createUserMock);

    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
    expect(response).not.toHaveProperty(expectResults.bodyNotHaveProperty);
  });
});
