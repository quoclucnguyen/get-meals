export interface ErrorDetails {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export class ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ErrorDetails | null;

  static success<T>(data: T): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.success = true;
    response.data = data;
    response.error = null;
    return response;
  }

  static error<T>(
    message: string,
    code: string,
    details?: Record<string, unknown>,
  ): ApiResponse<T> {
    const response = new ApiResponse<T>();
    response.success = false;
    response.data = null;
    response.error = { message, code, details };
    return response;
  }
}
