import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../helpers/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe("Count check-ins (e2d)", () => {
  beforeAll(async () => {
    await app.ready(); // Aguardar para que a aplicação esteja pronta para então iniciar os testes
  });

  afterAll(async () => {
    await app.close();
  });

  it("It Should be able to count user check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const createdGym = await prisma.gym.create({
      data: {
        title: "Academia",
        latitude: -23.5507307,
        longitude: -46.5501599,
      },
    });

    const checkIns = await prisma.checkIn.createMany({
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
      .get(`/check-ins/count`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(checkInResponse.statusCode).toEqual(200);
    expect(checkInResponse.body.checkInsCount).toEqual(2);
  });
});
