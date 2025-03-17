export interface IAuthRepository {
  checkUserByEmail(email: string): Promise<string>;
  setUserOtp(otp: string, email: string): Promise<void>;
  validateUserOtp(userOtp: string, userEmail: string): Promise<void>;
}
