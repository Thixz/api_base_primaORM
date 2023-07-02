import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-authentication";
import { create } from "./create";
import { validate } from "./validate";
import { count } from "./count";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/check-ins/:gymId", create);

  app.patch("/check-ins/:checkInId/validate", validate);

  app.get("/check-ins/count", count);
  app.get("/check-ins/history", history);
}
