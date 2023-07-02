import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymsUseCase } from "../../../modules/gyms/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1), // Coerce converte o valor para o tipo especificado depois. Default define um valor padrão caso o valor não seja especificado.
  });

  const { query, page } = searchGymQuerySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  });

  return reply.status(200).send({ gyms });
}
