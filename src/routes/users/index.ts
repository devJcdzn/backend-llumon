import type { FastifyTypedInstance } from "@types";
import { env } from "../../env";
import { QueueJobs } from "../../jobs";
import { DrizzleUserRepository } from "../../user/repository/drizzle.user.repository";
import { UserController } from "../../user/user.controller";
import { UserService } from "../../user/user.service";
import { createUserRequest, createUserResponse } from "./schema";

export async function usersRoutes(app: FastifyTypedInstance) {
  const userRepository = new DrizzleUserRepository();
  const mailQueue = new QueueJobs(env.REDIS_URL);
  const userService = new UserService(userRepository, mailQueue);
  const userController = new UserController(userService);

  app.post(
    "/create",
    {
      schema: {
        description:
          "Cria um usuário e envia um email com OTP para ser validado.",
        body: createUserRequest,
        response: createUserResponse,
      },
    },
    (req, res) => userController.createUser(req, res)
  );
}
