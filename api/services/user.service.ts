import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import axiosInstance from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { ErrorResponse } from '../common';
import type { UpdateProfileRequest, UpdateProfileResponse, UserProfile } from '../types';

const USER_QUERY_KEYS = {
  base: ['user'] as const,
  profile: () => [...USER_QUERY_KEYS.base, 'profile'] as const,
};

const getProfile = async () => {
  const response = await axiosInstance.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
  return response.data;
};

const updateProfile = async (data: UpdateProfileRequest) => {
  const response = await axiosInstance.post<UpdateProfileResponse>(
    API_ENDPOINTS.USER.UPDATE_PROFILE,
    data
  );
  return response.data;
};

type UserProfileQueryOptions = UseQueryOptions<UserProfile, AxiosError<ErrorResponse>>;

type UpdateProfileMutationOptions = UseMutationOptions<
  UpdateProfileResponse,
  AxiosError<ErrorResponse>,
  UpdateProfileRequest
>;

export const userService = {
  getProfile,

  updateProfile,
};

export const useUserProfileQuery = (options?: UserProfileQueryOptions) =>
  useQuery<UserProfile, AxiosError<ErrorResponse>>({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: getProfile,
    ...(options ?? {}),
  });

export const useUpdateProfileMutation = (options?: UpdateProfileMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, AxiosError<ErrorResponse>, UpdateProfileRequest>({
    mutationFn: updateProfile,
    ...(options ?? {}),
    onSuccess: async (data, variables, context, mutation) => {
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context, mutation);
      }

      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.profile() });
    },
  });
};

export const userQueryKeys = USER_QUERY_KEYS;
