import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import axiosInstance from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ErrorResponse } from '../common';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';

const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

const register = async (data: RegisterRequest) => {
  const response = await axiosInstance.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  AxiosError<ErrorResponse>,
  LoginRequest
>;

type RegisterMutationOptions = UseMutationOptions<
  RegisterResponse,
  AxiosError<ErrorResponse>,
  RegisterRequest
>;

export const authService = {
  login,

  register,

  // Other auth-related requests
};

export const useLoginMutation = (options?: LoginMutationOptions) =>
  useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: login,
    ...(options ?? {}),
  });

export const useRegisterMutation = (options?: RegisterMutationOptions) =>
  useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterRequest>({
    mutationFn: register,
    ...(options ?? {}),
  });
