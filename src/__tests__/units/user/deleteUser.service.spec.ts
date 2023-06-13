import { DataSource } from "typeorm";
import appDataSource from "../../../data-source";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../../../services/user";
import { createUserMock } from "../../mocks/user.mocks";

describe("DELETE USER", () => {
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

  it("Deleção de usuário - Sucesso", async () => {
    const respPrimary = await getUserByIdService(id);

    const expectResults = {
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        links: expect.arrayContaining([]),
      }),
    };

    expect(respPrimary).toStrictEqual(expectResults.bodyStrictEqual);

    await deleteUserService(id);
    const respSecondary = await getAllUsersService();

    expect(respSecondary.length).toStrictEqual(0);
  });
});
