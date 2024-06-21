import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException, 
  HttpStatus, 
  BadRequestException, 
  UnauthorizedException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { Response } from 'express';
import { format_json } from './env';

@Catch(BadRequestException, UnauthorizedException, InternalServerErrorException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let message = exceptionResponse.message || 'An error occurred';
    if (exception instanceof BadRequestException) {
      message = exceptionResponse.message || 'Validation error';
    } else if (exception instanceof UnauthorizedException) {
      message = exceptionResponse.message || 'Unauthorized';
    } else if (exception instanceof InternalServerErrorException) {
      message = exceptionResponse.message || 'Internal server error';
    }

    const formattedResponse = format_json(
      status,
      false,
      exceptionResponse.errors,
      null,
      message,
      null,
    );

    response.status(status).json(formattedResponse);
  }
}
