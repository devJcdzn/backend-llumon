import { app } from "../app";
import { env } from "../env";
import { QueueJobs } from "../jobs";
import { generateOTP } from "../lib/utils";
import { DrizzleAuthRepository } from "./repository/drizzle.auth.repository";

const authRepository = new DrizzleAuthRepository();

export const AuthService = {
  async login(email: string) {
    await authRepository.checkUserByEmail(email);

    const otpCode = generateOTP();

    await authRepository.setUserOtp(otpCode, email);

    const obj = {
      from: "delivered@resend.dev",
      to: ["lopesjean81@gmail.com"],
      subject: "Código de verificação llumon",
      otpCode,
    };

    const queue = new QueueJobs(env.REDIS_URL);

    queue.emailValidate(obj);

    return {
      message: "Email para login enviado.",
    };
  },

  async validate(otpCode: string, userEmail: string) {
    try {
      const result = await authRepository.validateUserOtp(otpCode, userEmail);

      const payload = { userEmail };
      const token = app.jwt.sign(payload, { expiresIn: "24h" });

      return {
        accessToken: token,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao validar código.");
    }
  },
};
