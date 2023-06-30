import { FastifyInstance } from "fastify";
import { register } from "./create";
import { authenticate } from "./authenticate";
import { getProfile } from "./getProfile";
import { verifyJWT } from "../../middlewares/verify-authentication";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/users/authenticate", authenticate);

  // Authenticated
  app.get("/users/profile", { onRequest: [verifyJWT] }, getProfile);
}
