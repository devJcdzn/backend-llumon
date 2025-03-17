import { and, eq } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { users } from "../../db/drizzle/schema";
import { ApiError } from "../../helpers/error";
import type { IAuthRepository } from "./interface";

export class DrizzleAuthRepository implements IAuthRepository {
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

  async setUserOtp(otp: string, email: string): Promise<void> {
    return db.transaction(async (tx) => {
      const user = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));

      if (!user.length) {
        throw ApiError.NotFound("Usuário não encontrado.");
      }

      const updated = await tx
        .update(users)
        .set({ otpCode: otp })
        .where(eq(users.id, user[0].id));

      if (!updated.rowCount) {
        throw ApiError.InternalError("Erro ao atualizar OTP.");
      }
    });
  }

  async validateUserOtp(userOtp: string, userEmail: string): Promise<void> {
    return db.transaction(async (tx) => {
      const user = await tx
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.email, userEmail), eq(users.otpCode, userOtp)));

      if (!user.length) {
        throw ApiError.Unauthorized();
      }

      const updated = await tx
        .update(users)
        .set({ otpCode: null })
        .where(eq(users.email, userEmail));

      if (!updated.rowCount) {
        throw ApiError.InternalError("Erro ao limpar OTP.");
      }
    });
  }
}
