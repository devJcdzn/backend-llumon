import type { FastifyTypedInstance } from "@types";
import { AuthController } from "../../auth/auth.controller";

export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    "/login",
    {
      schema: {
        description: "Envia email com OTP.",
      },
    },
    (req, res) => AuthController.login(req, res)
  );
}
