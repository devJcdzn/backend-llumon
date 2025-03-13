import type { FastifyReply, FastifyRequest } from "fastify";
import { supportedGateways } from "../constants";

interface AddGatewayRequest extends FastifyRequest {
  body: {
    gatewayName: string;
    gatewayAPIKey: string;
    gatewaySecretKey: string;
  };
}

export const GatewayController = {
  async addUserGateway(request: AddGatewayRequest, reply: FastifyReply) {
    const { gatewayAPIKey, gatewayName, gatewaySecretKey } = request.body;

    if (!supportedGateways.includes(gatewayName)) {
      reply.code(400).send({
        success: false,
        message: "Gateway não suportado.",
      });
    }

    return reply.code(201).send({
      success: true,
      message: "Gateway adicionado com sucesso.",
    });
  },
};
