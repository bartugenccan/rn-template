import { BaseResponse } from '../common';
import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse extends BaseResponse {
  data: {
    user: User;
  };
}
