import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../../modules/users/use-cases/create-user";
import { PrismaUsersRepository } from "../../../modules/users/repositories/prisma/prisma-users-repository";
import { makeCreateUserUseCase } from "../../../modules/users/use-cases/factories/make-create-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const createUserUseCase = makeCreateUserUseCase();

  await createUserUseCase.execute({ name, email, password });

  return reply.status(201).send();
}
