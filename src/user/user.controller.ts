import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service";

interface CreateUserRequest extends FastifyRequest {
  body: {
    name: string;
    surname: string;
    email: string;
  };
}

export const UserController = {
  async createUser(request: CreateUserRequest, reply: FastifyReply) {
    const { name, surname, email } = request.body;

    if (!name || !surname || !email) {
      return reply.code(401).send({
        success: false,
        message: "Campos não preenchidos corretamente.",
      });
    }

    const result = await UserService.createUser({ name, surname, email });

    return reply.code(result.code).send({
      success: result.success,
      message: result.message,
    });
  },
};
