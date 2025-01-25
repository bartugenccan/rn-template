export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ErrorResponse extends BaseResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
