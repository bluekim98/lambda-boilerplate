import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus() ?? HttpStatus.BAD_REQUEST;
        let message: string;
        if (exception?.['response']?.message) {
            const m = exception?.['response']?.message;
            if (typeof m === 'string') message = m;
            else if (Array.isArray(m)) message = m.join('\n');
            else message = JSON.stringify(exception?.['response']?.message);
        } else {
            message = exception.message;
        }

        response.status(status).json({
            code: status,
            message,
        });
    }
}
