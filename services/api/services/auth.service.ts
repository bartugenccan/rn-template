import axiosInstance from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/api';

export const authService = {
  login: (data: LoginRequest) => axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

  register: (data: RegisterRequest) =>
    axiosInstance.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data),

  // Other auth-related requests
};
