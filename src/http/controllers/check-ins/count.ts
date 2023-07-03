import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserCheckInsUseCase } from "../../../modules/users/use-cases/factories/make-get-user-check-ins-use-case";

export async function count(request: FastifyRequest, reply: FastifyReply) {
  const getUserCheckInUseCase = makeGetUserCheckInsUseCase();

  const { checkInsCount } = await getUserCheckInUseCase.execute({
    user_id: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
