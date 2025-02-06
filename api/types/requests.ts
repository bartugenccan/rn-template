import { User, UserProfile } from './user';
import { BaseResponse, PaginatedResponse } from '../common';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phoneNumber?: string;
}

export interface UpdateProfileResponse extends BaseResponse {
  data: UserProfile;
}

// Add other API request/response types
