export interface UserSignupRequest {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
