import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { users } from "../../../db/drizzle/schema";
import type { User } from "../../../entities/user";

export const drizzleRepository = {
  async createUser(data: User) {
    try {
      await db.insert(users).values(data);

      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
      };
    }
  },

  async checkUserByEmail(email: string) {
    try {
      const result = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));

      if (!result || result.length === 0) {
        return {
          code: 404,
          success: false,
          data: "Usuário não encontrado",
        };
      }

      return {
        code: 200,
        success: true,
        data: result[0].id,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        data: (err as Error).message,
      };
    }
  },

  async updateUser(id: string, data: Partial<User>) {
    console.log(data);

    try {
      await db.update(users).set(data).where(eq(users.id, id));

      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
      };
    }
  },
};
