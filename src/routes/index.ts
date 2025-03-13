import type { FastifyTypedInstance } from "../types";
import { gatewayRoutes } from "./gateways";

export async function routes(app: FastifyTypedInstance) {
  app.get("/hello-world", async (_req, res) => {
    res.send({
      hello: "world",
    });
  });
  app.register(gatewayRoutes, { prefix: "/gateways" });
}
