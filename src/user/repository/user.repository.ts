import type { User } from "../../entities/user";
import { drizzleRepository } from "./drizzle";
import type { IUserRepository } from "./interface";

export class UserRepository implements IUserRepository {
  async createUser(data: User): Promise<void> {
    const result = await drizzleRepository.createUser(data);

    if (!result.success) throw new Error("Erro ao criar usuário");
  }

  async updateData(userData: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
