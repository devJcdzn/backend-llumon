import { and, eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { users } from "../../db/drizzle/schema";
import type { IAuthRepository } from "./interface";

export class DrizzleAuthRepository implements IAuthRepository {
  async checkUserByEmail(
    email: string
  ): Promise<{ code: number; success: boolean; data: string }> {
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
  }

  async setUserOtp(
    otp: string,
    email: string
  ): Promise<void | { code: number; success: boolean; data: string }> {
    try {
      return await db.transaction(async (tx) => {
        const result = await tx
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, email));

        if (!result || result.length === 0) {
          return {
            code: 500,
            success: false,
            data: "User not found.",
          };
        }

        tx.update(users)
          .set({
            otpCode: otp,
          })
          .where(eq(users.id, result[0].id));
      });
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        success: false,
        data: (err as Error).message,
      };
    }
  }

  async validateUserOtp(
    userOtp: string,
    userEmail: string
  ): Promise<{ code: number; success: boolean; data: string }> {
    try {
      return await db.transaction(async (tx) => {
        const result = await tx
          .select({ id: users.id })
          .from(users)
          .where(and(eq(users.email, userEmail), eq(users.otpCode, userOtp)));

        if (!result || result.length === 0) {
          return {
            code: 500,
            success: false,
            data: "User not found.",
          };
        }

        tx.update(users)
          .set({
            otpCode: null,
          })
          .where(eq(users.email, userEmail));

        return {
          code: 200,
          success: true,
          data: "Otp verificado",
        };
      });
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        success: false,
        data: (err as Error).message,
      };
    }
  }
}
