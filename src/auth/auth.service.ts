import { env } from "../env";
import { QueueJobs } from "../jobs";
import { generateOTP } from "../lib/utils";
import { DrizzleAuthRepository } from "./repository/drizzle.auth.repository";

const authRepository = new DrizzleAuthRepository();

export const AuthService = {
  async login(email: string) {
    try {
      const result = await authRepository.checkUserByEmail(email);

      if (!result.success) {
        return {
          code: result.code,
          success: result.success,
          message: result.data,
        };
      }

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
        success: true,
        code: 200,
        message: "Email para login enviado.",
      };
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao fazer login");
    }
  },

  async validate(otpCode: string, userEmail: string) {
    try {
      const result = await authRepository.validateUserOtp(otpCode, userEmail);

      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao validar código.");
    }
  },
};
