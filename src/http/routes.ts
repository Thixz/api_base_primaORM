import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/create-user-controller";
import { authenticate } from "./controllers/users/authenticate-user-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/users/authenticate", authenticate);
}
