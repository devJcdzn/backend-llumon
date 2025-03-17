import { app } from "../app";
import type { QueueJobs } from "../jobs/bull-mail-jobs";
import { generateOTP } from "../lib/utils";
import type { IAuthRepository } from "./repository/interface";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly mailQueue: QueueJobs
  ) {}

  async login(email: string) {
    await this.authRepository.checkUserByEmail(email);

    const otpCode = generateOTP();

    await this.authRepository.setUserOtp(otpCode, email);

    const obj = {
      from: "delivered@resend.dev",
      to: ["lopesjean81@gmail.com"],
      subject: "Código de verificação llumon",
      otpCode,
    };

    this.mailQueue.emailValidate(obj);

    return {
      message: "Email para login enviado.",
    };
  }

  async validate(otpCode: string, userEmail: string) {
    try {
      await this.authRepository.validateUserOtp(otpCode, userEmail);

      const payload = { userEmail };
      const token = app.jwt.sign(payload, { expiresIn: "24h" });

      return {
        accessToken: token,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao validar código.");
    }
  }
}
