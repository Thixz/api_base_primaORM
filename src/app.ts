import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "../env";
import { DefaultError } from "./helpers/DefaultError";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt,{
  secret: env.JWT_SECRET
})

app.register(appRoutes);

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
