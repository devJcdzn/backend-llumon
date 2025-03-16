import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";

interface LoginRequest extends FastifyRequest {
  body: {
    email: string;
  };
}

export const AuthController = {
  async login(request: LoginRequest, reply: FastifyReply) {
    const { email } = request.body;

    if (!email) {
      return reply
        .code(401)
        .send({ success: false, message: "Email é obrigatório." });
    }

    const result = await AuthService.login(email);

    if (!result.success) {
      return reply.code(result.code).send({
        success: false,
        message: result.message,
      });
    }

    return reply.code(result.code).send({
      success: result.success,
      message: result.message,
    });
  },

  async validate(request: FastifyRequest, reply: FastifyReply) {
    try {
    } catch (err) {
      return reply.code(500).send({
        success: false,
        message: (err as Error).message,
      });
    }
  },
};
