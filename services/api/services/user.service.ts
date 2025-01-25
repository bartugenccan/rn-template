import axiosInstance from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { UpdateProfileRequest, UpdateProfileResponse, UserProfile } from '@/types/api';

export const userService = {
  getProfile: () => axiosInstance.get<UserProfile>(API_ENDPOINTS.USER.PROFILE),

  updateProfile: (data: UpdateProfileRequest) =>
    axiosInstance.post<UpdateProfileResponse>(API_ENDPOINTS.USER.UPDATE_PROFILE, data),
};
