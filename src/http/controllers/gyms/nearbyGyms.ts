import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNearbyGymsUseCase } from "../../../modules/gyms/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
      }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude : latitude,
    userLongitude : longitude,
  });

  return reply.status(200).send({ gyms });
}
