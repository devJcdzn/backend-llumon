import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { users } from "../../db/drizzle/schema";
import type { User } from "../../entities/user";
import { ApiError } from "../../helpers/error";
import type { IUserRepository } from "./interface";

export class DrizzleUserRepository implements IUserRepository {
  async createUser(data: User): Promise<void> {
    const result = await db
      .insert(users)
      .values(data)
      .returning({ id: users.id });

    if (!result[0]) {
      throw ApiError.InternalError();
    }
  }

  async checkUserByEmail(email: string): Promise<string> {
    const result = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (!result.length) {
      throw ApiError.NotFound("Usuário não encontrado.");
    }

    return result[0].id;
  }

  async updateData(id: string, userData: Partial<User>): Promise<void> {
    return db.transaction(async (tx) => {
      const user = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, id));

      if (!user.length) {
        throw ApiError.NotFound("Usuário não encontrado.");
      }

      const updated = await tx
        .update(users)
        .set(userData)
        .where(eq(users.id, user[0].id));

      if (!updated.rowCount) {
        throw ApiError.InternalError("Erro ao atualizar usuário.");
      }
    });
  }
}
