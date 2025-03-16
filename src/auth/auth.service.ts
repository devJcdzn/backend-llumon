import { env } from "../env";
import { QueueJobs } from "../jobs";
import { generateOTP } from "../lib/utils";
import { UserRepository } from "../user/repository/user.repository";

const userRepository = new UserRepository();

export const AuthService = {
  async login(email: string) {
    try {
      const result = await userRepository.checkUserByEmail(email);

      if (!result.success) {
        return {
          code: result.code,
          success: result.success,
          message: result.data,
        };
      }

      const otpCode = generateOTP();

      await userRepository.updateData(result.data, { otpCode });

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
      return {
        success: false,
        code: 500,
        message: "Error interno ao fazer login",
      };
    }
  },
};
