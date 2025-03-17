import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpResponse } from "../helpers/http-response";
import { UserService } from "./user.service";

interface CreateUserRequest extends FastifyRequest {
  body: {
    name: string;
    surname: string;
    email: string;
  };
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(request: CreateUserRequest, reply: FastifyReply) {
    const { name, surname, email } = request.body;

    if (!name || !surname || !email) {
      return HttpResponse.badRequest(reply, "Campos obrigatórios faltando.");
    }

    try {
      const result = await this.userService.createUser({
        name,
        surname,
        email,
      });

      return HttpResponse.success(reply, result);
    } catch (err) {
      return reply.send(err);
    }
  }
}
