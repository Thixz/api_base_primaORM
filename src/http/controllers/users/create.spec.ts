import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, it } from "vitest";

describe("Create User (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "User Example",
        email: "example@gmail.com",
        password: "123456",
      })
      .expect(201);
  });
});
