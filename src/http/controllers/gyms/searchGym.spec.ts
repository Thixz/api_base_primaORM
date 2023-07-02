import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../helpers/test/create-and-authenticate-user";

describe("Search Gym (e2d)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search a Gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 1",
        latitude: -23.5507307,
        longitude: -46.5501599,
        description: null,
        phone: null,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 2",
        latitude: -23.5507307,
        longitude: -46.5501599,
        description: null,
        phone: null,
      });

      await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JS Gym",
        latitude: -23.5507307,
        longitude: -46.5501599,
        description: null,
        phone: null,
      });

    const gymResponse = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        query: "Academia",
      }).send()

    expect(gymResponse.statusCode).toEqual(200);
    expect(gymResponse.body.gyms).toHaveLength(2);
  });
});
