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
};
