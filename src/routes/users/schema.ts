import { z } from "zod";

export const createUserRequest = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email("Email inválido"),
});

export const createUserResponse = {
  201: z.object({
    success: z.boolean().default(true),
    message: z.string().default("Usuário criado com sucesso."),
  }),
  400: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Informações faltando."),
  }),
};
