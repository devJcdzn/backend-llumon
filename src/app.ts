import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import jwt from "@fastify/jwt";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { env } from "./env";
import { routes } from "./routes";

const app = fastify().withTypeProvider();

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply
      .status(401)
      .send({ message: "Token inválido ou não fornecido" });
  }
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "llumon - API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(routes);

export { app };
