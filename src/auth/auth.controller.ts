import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpResponse } from "../helpers/http-response";
import { AuthService } from "./auth.service";

interface LoginRequest extends FastifyRequest {
  body: {
    email: string;
  };
}

interface ValidateCodeRequest extends FastifyRequest {
  query: {
    email?: string;
    code?: string;
  };
}

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(request: LoginRequest, reply: FastifyReply) {
    const { email } = request.body;

    if (!email) {
      return HttpResponse.badRequest(reply, "Email é obrigatório.");
    }

    try {
      const result = await this.authService.login(email);
      return HttpResponse.success(reply, result);
    } catch (err) {
      return reply.send(err);
    }
  }

  async validate(request: ValidateCodeRequest, reply: FastifyReply) {
    const { code, email } = request.query;

    if (!code || !email) {
      return HttpResponse.badRequest(reply, "Faltando campos obrigatórios.");
    }

    try {
      const result = await this.authService.validate(code, email);
      HttpResponse.success(reply, result);
    } catch (err) {
      return reply.send(err);
    }
  }
}
