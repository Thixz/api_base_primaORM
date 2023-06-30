import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get User profile (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to consult an user profile", async () => {
    await request(app.server).post("/users").send({
      name: "User Example",
      email: "example@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server)
      .post("/users/authenticate")
      .send({
        email: "example@gmail.com",
        password: "123456",
      });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "example@gmail.com",
      })
    );
  });
});
