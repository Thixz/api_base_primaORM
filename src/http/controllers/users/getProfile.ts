import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../modules/users/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../../../modules/users/use-cases/authenticate-user";
import { makeAuthenticateUseCase } from "../../../modules/users/use-cases/factories/make-authenticate-user-use-case";
import { makeGetUserProfileUseCase } from "../../../modules/checkIns/use-cases/factories/make-get-user-profile-use-case";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({
    user_id: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
