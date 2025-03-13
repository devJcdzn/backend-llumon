import { z } from "zod";

export const addGatewayRequest = z.object({
  gatewayName: z.string(),
  gatewayAPIKey: z.string(),
  gatewaySecretKey: z.string(),
});

export const processWebhookResponseSchema = {
  201: z.object({
    success: z.boolean().default(true),
    message: z.string().default("Gateway adicionado com sucesso."),
  }),
  400: z.object({
    success: z.boolean().default(false),
    message: z.string().default("Gateway não suportado."),
  }),
};
