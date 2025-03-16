import { User } from "../entities/user";
import { env } from "../env";
import { QueueJobs } from "../jobs";
import { generateOTP } from "../lib/utils";
import { UserRepository } from "./repository/user.repository";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

const userRepository = new UserRepository();

export const UserService = {
  async createUser(userData: UserData) {
    const otpCode = generateOTP();

    const user = new User({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      otpCode,
    });

    try {
      await userRepository.createUser(user);

      const queue = new QueueJobs(env.REDIS_URL);

      const obj = {
        from: "Team llumonpay<delivered@resend.dev>",
        to: ["lopesjean81@gmail.com"],
        subject: "Boas vindas! - Código de verificação llumon",
        otpCode,
      };

      queue.emailValidate(obj);

      return {
        code: 201,
        success: true,
        message: "Usuário criado.",
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        success: false,
        message: (err as Error).message,
      };
    }
  },
};
