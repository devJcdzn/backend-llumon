import { z } from "zod";

export const createUserRequest = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("Email inválido"),
});

export const createUserResponse = {
  200: z.object({
    success: z.boolean().default(true),
    message: z.string().default("Operação realizada com sucesso."),
    data: z.object({
      message: z.string(),
    }),
  }),
  400: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Erro na operação."),
    data: z.object({
      message: z.string(),
    }),
  }),
};
