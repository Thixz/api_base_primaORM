import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Token (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to refresh a token", async () => {
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

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("token");
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
