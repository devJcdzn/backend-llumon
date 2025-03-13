import type { FastifyTypedInstance } from "../types";

export async function routes(app: FastifyTypedInstance) {
  app.get("/hello-world", (_req, res) => {
    res.send({
      hello: "world",
    });
  });
}
