import type { FastifyTypedInstance } from "../types";
import { authRoutes } from "./auth";
import { gatewayRoutes } from "./gateways";
import { usersRoutes } from "./users";

export async function routes(app: FastifyTypedInstance) {
  app.get("/hello-world", async (_req, res) => {
    return { hello: "world" };
  });
  app.register(gatewayRoutes, { prefix: "/gateways" });
  app.register(usersRoutes, { prefix: "/users" });
  app.register(authRoutes, { prefix: "/auth" });
}
