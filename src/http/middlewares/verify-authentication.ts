import { FastifyRequest, FastifyReply } from "fastify";
import { DefaultError } from "../../helpers/DefaultError";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    throw new DefaultError("Unauthorized", 401);
  }
}
