export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserLoginState extends LoginPayload {
  role: 'user' | 'admin';
  id: string;
  expiredAt: number;
}

