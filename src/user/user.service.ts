import { User } from "../entities/user";
import type { QueueJobs } from "../jobs/bull-mail-jobs";
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

    const obj = {
      from: "Team llumonpay<delivered@resend.dev>",
      to: ["lopesjean81@gmail.com"],
      subject: "Boas vindas! - Código de verificação llumon",
      otpCode,
    };

    this.mailQueue.emailValidate(obj);

    return {
      message: "Usuário criado.",
    };
  }
}
