import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/create";
import { authenticate } from "./controllers/users/authenticate";
import { getProfile } from "./controllers/users/getProfile";
import { verifyJWT } from "./middlewares/verify-authentication";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/users/authenticate", authenticate);

  // Authenticated
  app.get("/users/profile", { onRequest: [verifyJWT] }, getProfile);
}
