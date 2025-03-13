import type { User } from "../../entities/user";

export interface IUserRepository {
  createUser(userDTO: User): Promise<void>;
  updateData(userData: Partial<User>): Promise<void>;
}
