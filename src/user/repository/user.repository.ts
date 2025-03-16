import type { User } from "../../entities/user";
import { drizzleRepository } from "./drizzle";
import type { IUserRepository } from "./interface";

export class UserRepository implements IUserRepository {
  async createUser(data: User): Promise<void> {
    const result = await drizzleRepository.createUser(data);

    if (!result.success) throw new Error("Erro ao criar usuário");
  }

  async checkUserByEmail(email: string) {
    const result = await drizzleRepository.checkUserByEmail(email);

    if (!result.success)
      return {
        code: result.code,
        success: false,
        data: result.data,
      };

    return {
      code: result.code,
      success: true,
      data: result.data,
    };
  }

  async updateData(id: string, userData: Partial<User>): Promise<void> {
    const result = await drizzleRepository.updateUser(id, userData);

    if (!result.success) throw new Error("Erro ao atualizar usuário");
  }
}
