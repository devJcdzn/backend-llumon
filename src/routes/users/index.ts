import type { FastifyTypedInstance } from "@types";
import { UserController } from "../../user/user.controller";
import { createUserRequest, createUserResponse } from "./schema";

export async function usersRoutes(app: FastifyTypedInstance) {
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
    (req, res) => UserController.createUser(req, res)
  );
}
