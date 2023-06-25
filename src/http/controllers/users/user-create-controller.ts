import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { CreateUserUseCase } from "../../../modules/users/use-cases/create-user";
import { PrismaUsersRepository } from "../../../modules/users/repositories/prisma/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUserService = new CreateUserUseCase(prismaUsersRepository);

    await registerUserService.execute({ name, email, password });
  } catch (error: any) {
    throw new Error(error.message);
  }

  return reply.status(201).send();
}
