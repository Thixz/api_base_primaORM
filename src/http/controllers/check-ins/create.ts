import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateCheckInUseCase } from "../../../modules/checkIns/use-cases/factories/make-create-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const createCheckInUseCase = makeCreateCheckInUseCase();

  await createCheckInUseCase.execute({
    gym_id: gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    user_id: request.user.sub,
  });

  return reply.status(201).send();
}
