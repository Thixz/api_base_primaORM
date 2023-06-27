import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../modules/users/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../../../modules/users/use-cases/authenticate-user";
import { makeAuthenticateUseCase } from "../../../modules/users/use-cases/factories/make-authenticate-user-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const authenticateUserUseCase = makeAuthenticateUseCase();

  await authenticateUserUseCase.execute({ email, password });

  return reply.status(200).send();
}
