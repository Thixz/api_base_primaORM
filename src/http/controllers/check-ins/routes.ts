import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-authentication";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
