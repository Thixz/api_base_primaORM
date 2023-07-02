import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUserCheckInsUseCase } from "../../../modules/checkIns/use-cases/factories/make-fetch-user-check-ins-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1), // Coerce converte o valor para o tipo especificado depois. Default define um valor padrão caso o valor não seja especificado.
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInUseCase = makeFetchUserCheckInsUseCase();

  const { checkIns } = await fetchUserCheckInUseCase.execute({
    page,
    user_id: request.user.sub,
  });

  return reply.status(200).send({ checkIns });
}
