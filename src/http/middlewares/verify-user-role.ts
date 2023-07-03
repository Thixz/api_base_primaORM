import { FastifyReply, FastifyRequest } from "fastify";
import { DefaultError } from "../../helpers/DefaultError";

export function verifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
  return (request: FastifyRequest,reply :FastifyReply, next: () => void) => {
    const { role } = request.user;

    console.log("role",role)

    if (role !== roleToVerify) throw new DefaultError("Unauthorized user role", 401);

    next()
  };
}
