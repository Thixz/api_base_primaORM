import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../helpers/test/create-and-authenticate-user";

describe("Search Nearby Gym (e2d)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to search nearby Gyms", async () => {
    const { token } = await createAndAuthenticateUser(app,true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        latitude: -23.5460803,
        longitude: -46.541531,
        description: null,
        phone: null,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        latitude: -23.9331804,
        longitude: -48.4249784,
        description: null,
        phone: null,
      });

    const gymResponse = await request(app.server)
      .get("/gyms/fetchNearby")
      .set("Authorization", `Bearer ${token}`)
      .query({
        latitude: -23.5460803,
        longitude: -46.541531,
      }).send()

    expect(gymResponse.statusCode).toEqual(200);
    expect(gymResponse.body.gyms).toHaveLength(1);
    expect(gymResponse.body.gyms).toEqual([
        expect.objectContaining({
            title: "Near Gym"
        })
    ]);
  });
});
