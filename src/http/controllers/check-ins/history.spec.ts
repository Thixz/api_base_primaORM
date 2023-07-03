import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../helpers/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe("History check-in (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to list the history of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const createdGym = await prisma.gym.create({
      data: {
        title: "Academia",
        latitude: -23.5507307,
        longitude: -46.5501599,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: createdGym.id,
          user_id: user.id,
        },
        {
          gym_id: createdGym.id,
          user_id: user.id,
        },
      ],
    });

    const checkInResponse = await request(app.server)
      .get(`/check-ins/history`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(checkInResponse.statusCode).toEqual(200);
    expect(checkInResponse.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: createdGym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: createdGym.id,
        user_id: user.id,
      }),
    ]);
  });
});
