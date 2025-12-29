// API Error Types
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export type { ApiError };
