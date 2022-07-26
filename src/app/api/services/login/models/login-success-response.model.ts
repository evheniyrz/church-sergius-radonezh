export interface UserLoginResponse {
  isExisting: boolean;
  userData: UserCredentials;
}

export interface UserCredentials {
  email: string;
  password: string;
  role: 'admin' | 'user'
  id: string;
  name: string;
}