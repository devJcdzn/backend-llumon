import type { FastifyTypedInstance } from "@types";
import { GatewayController } from "../../gateway/gateway.controller";
import { addGatewayRequest, processWebhookResponseSchema } from "./schema";

export async function gatewayRoutes(app: FastifyTypedInstance) {
  app.post(
    "/add",
    {
      schema: {
        description: "Adiciona um gateway na plataforma para o usuário",
        body: addGatewayRequest,
        response: processWebhookResponseSchema,
      },
    },
    (req, res) => GatewayController.addUserGateway(req, res)
  );
}
