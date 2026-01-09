import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return value instanceof ApiResponse;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: unknown) => {
        // If data is already an ApiResponse, return it as-is
        if (isApiResponse<T>(data)) {
          return data;
        }
        // Otherwise, wrap it in a success response
        return ApiResponse.success(data as T);
      }),
    );
  }
}
