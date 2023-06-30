import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-authentication";
import { create } from "./create";
import { search } from "./searchGym";
import { nearbyGyms } from "./nearbyGyms";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", create);

  app.get("/gyms/search", search);
  app.get("/gyms/fetchNearby", nearbyGyms);
}
