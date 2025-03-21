import type { User } from "../../entities/user";

export interface IUserRepository {
  createUser(userDTO: User): Promise<void>;
  checkUserByEmail(email: string): Promise<string>;
  updateData(id: string, userData: Partial<User>): Promise<void>;
}
