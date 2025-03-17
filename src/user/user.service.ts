import { User } from "../entities/user";
import { env } from "../env";
import { QueueJobs } from "../jobs";
import { generateOTP } from "../lib/utils";
import type { IUserRepository } from "./repository/interface";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mailQueue: QueueJobs
  ) {}

  async createUser(userData: UserData) {
    const otpCode = generateOTP();

    const user = new User({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      otpCode,
    });

    await this.userRepository.createUser(user);

    const queue = new QueueJobs(env.REDIS_URL);

    const obj = {
      from: "Team llumonpay<delivered@resend.dev>",
      to: ["lopesjean81@gmail.com"],
      subject: "Boas vindas! - Código de verificação llumon",
      otpCode,
    };

    queue.emailValidate(obj);

    return {
      message: "Usuário criado.",
    };
  }
}
