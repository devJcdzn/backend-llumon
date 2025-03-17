import type { FastifyReply } from "fastify";

export class HttpResponse {
  static success<T>(
    reply: FastifyReply,
    data: T,
    message = "Operação realizada com sucesso",
    statusCode = 200
  ) {
    return reply.code(statusCode).send({
      success: true,
      message,
      data,
    });
  }

  static error(
    reply: FastifyReply,
    message = "Erro interno do servidor",
    statusCode = 500
  ) {
    return reply.code(statusCode).send({
      success: false,
      message,
    });
  }

  static unauthorized(reply: FastifyReply, message = "Não autorizado") {
    return this.error(reply, message, 401);
  }

  static badRequest(reply: FastifyReply, message = "Requisição inválida") {
    return this.error(reply, message, 400);
  }

  static notFound(reply: FastifyReply, message = "Recurso não encontrado") {
    return this.error(reply, message, 404);
  }

  static forbidden(reply: FastifyReply, message = "Acesso negado") {
    return this.error(reply, message, 403);
  }
}
