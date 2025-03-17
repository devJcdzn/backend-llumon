import type { FastifyTypedInstance } from "@types";
import { AuthController } from "../../auth/auth.controller";
import { AuthService } from "../../auth/auth.service";
import { DrizzleAuthRepository } from "../../auth/repository/drizzle.auth.repository";
import { env } from "../../env";
import { QueueJobs } from "../../jobs/bull-mail-jobs";
import {
  loginRequestSchema,
  loginResponseSchema,
  validateRequestSchema,
  validateResponseSchema,
} from "./schema";

export async function authRoutes(app: FastifyTypedInstance) {
  const authRepository = new DrizzleAuthRepository();
  const mailQueue = new QueueJobs(env.REDIS_URL);
  const authService = new AuthService(authRepository, mailQueue);
  const authController = new AuthController(authService);

  app.post(
    "/login",
    {
      schema: {
        description: "Envia email com OTP.",
        body: loginRequestSchema,
        response: loginResponseSchema,
      },
    },
    (req, res) => authController.login(req, res)
  );

  app.get(
    "/validate",
    {
      schema: {
        description: "Envia email com OTP.",
        querystring: validateRequestSchema,
        response: validateResponseSchema,
      },
    },
    (req, res) => authController.validate(req, res)
  );
}
