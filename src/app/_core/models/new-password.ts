export interface NewPassword {
  userId: number;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
