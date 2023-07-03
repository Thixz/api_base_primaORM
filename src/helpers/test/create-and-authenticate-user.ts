import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await request(app.server)
    .post("/users")
    .send({
      name: "User Example",
      email: "example@gmail.com",
      password: "123456",
      role: isAdmin ? "ADMIN" : "MEMBER",
    });

  const authResponse = await request(app.server)
    .post("/users/authenticate")
    .send({
      email: "example@gmail.com",
      password: "123456",
    });

  const { token } = authResponse.body;

  return { token };
}
