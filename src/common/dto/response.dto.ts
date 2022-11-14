import { HttpStatus } from '@nestjs/common';

export class HttpResponseDto {
    code: HttpStatus;
    message?: string | any;
}
