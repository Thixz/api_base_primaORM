import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "../env";
import { DefaultError } from "./helpers/DefaultError";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we shouyld log to and external tool like DataDog/Sentry....
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (error instanceof DefaultError) {
    return reply
      .status(error.statusCode)
      .send({ message: "Handled error.", issues: error.issues });
  }

  return reply
    .status(500)
    .send({ message: "Internal server error", issues: error.message });
});
