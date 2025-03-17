import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const loginResponseSchema = {
  201: z.object({
    success: z.boolean().default(true),
    message: z.string().default("Email para login enviado."),
  }),
  400: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Informações faltando."),
  }),
  404: z.object({
    success: z.boolean().default(false),
    message: z.string().default("usuário não encontrado."),
  }),
};
