import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate User (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to authenticate an user", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "User Example",
        email: "example@gmail.com",
        password: "123456",
      })

      const response = await request(app.server)
      .post("/users/authenticate")
      .send({
        email: "example@gmail.com",
        password: "123456",
      })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toHaveProperty("token")
  });
});
