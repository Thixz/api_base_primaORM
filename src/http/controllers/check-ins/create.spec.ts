import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../helpers/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe("Create check-in (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createdGym = await prisma.gym.create({
        data:{
            title: "Academia",
            latitude: -23.5507307,
            longitude: -46.5501599,
        }
    });

    const checkInResponse = await request(app.server)
      .post(`/check-ins/${createdGym.id}`)
      .set("Authorization", `Bearer ${token}`).send({
        latitude: -23.5507307,
        longitude: -46.5501599,
      })

    expect(checkInResponse.statusCode).toEqual(201);
  });
});
