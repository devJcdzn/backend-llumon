export class ApiError extends Error {
  statusCode: number;
  success: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  static Unauthorized() {
    return new ApiError("Não autorizado.", 401);
  }

  static Forbidden() {
    return new ApiError("Acesso proibido.", 403);
  }

  static NotFound(message = "Recurso não encontrado.") {
    return new ApiError(message, 404);
  }

  static BadRequest(message = "Requisição inválida.") {
    return new ApiError(message, 400);
  }

  static InternalError(message = "Erro interno no servidor.") {
    return new ApiError(message, 500);
  }
}
