export interface IAuthRepository {
  checkUserByEmail(
    email: string
  ): Promise<{ code: number; success: boolean; data: string }>;
  setUserOtp(
    otp: string,
    email: string
  ): Promise<void | { code: number; success: boolean; data: string }>;
  validateUserOtp(
    userOtp: string,
    userEmail: string
  ): Promise<{ code: number; success: boolean; data: string }>;
}
