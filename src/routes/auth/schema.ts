import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const validateRequestSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z.string().min(6, "OTP inválido"),
});

export const loginResponseSchema = {
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
  404: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Erro na operação."),
    data: z.object({
      message: z.string(),
    }),
  }),
};

export const validateResponseSchema = {
  200: z.object({
    success: z.boolean().default(true),
    message: z.string().default("Operação realizada com sucesso."),
    data: z.object({
      accessToken: z.string(),
    }),
  }),
  400: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Erro na operação."),
    data: z.object({
      message: z.string(),
    }),
  }),
  404: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Erro na operação."),
    data: z.object({
      message: z.string(),
    }),
  }),
};
