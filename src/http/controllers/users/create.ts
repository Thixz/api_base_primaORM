import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUserUseCase } from "../../../modules/users/use-cases/factories/make-create-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
  });

  const { name, email, password,role } = registerBodySchema.parse(request.body);

  const createUserUseCase = makeCreateUserUseCase();

  await createUserUseCase.execute({ name, email, password,role });

  return reply.status(201).send();
}
