import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import { createUserMock, userLoginMock } from "../../mocks/user.mocks";
import { userLoginService } from "../../../services/session/userLogin.service";
import { createUserService } from "../../../services/user";

describe("SESSION", () => {
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

  it("Logando usuário", async () => {
    await createUserService(createUserMock);
    const response = await userLoginService(userLoginMock);

    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        token: expect.any(String),
      }),
    };

    expect(response).toStrictEqual(expectResults.bodyStrictEqual);
  });
});
