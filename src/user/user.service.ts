import { User } from "../entities/user";
import { UserRepository } from "./repository/user.repository";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

const userRepository = new UserRepository();

export const UserService = {
  async createUser(userData: UserData) {
    const user = new User({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
    });

    try {
      await userRepository.createUser(user);

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
