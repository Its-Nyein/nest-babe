import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './logger/logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponseObj = {
    statusCode: number
    timestamp: string
    path: string
    response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

  private readonly logger = new LoggerService(AllExceptionsFilter.name)
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        response: ''
    }

    if(exception instanceof HttpException) {
        myResponseObj.statusCode = exception.getStatus()
        myResponseObj.response = exception.getResponse()
    } else if(exception instanceof PrismaClientValidationError) {
        myResponseObj.statusCode = 422
        myResponseObj.response = exception.message.replaceAll(/\n/g, ' ')
    } 
    // {
    //     myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    //     myResponseObj.response = 'Internal Server Error'
    // }

    response
        .status(myResponseObj.statusCode)
        .json(myResponseObj)
    
    this.logger.error(
        typeof myResponseObj.response === 'string' ? myResponseObj.response : JSON.stringify(myResponseObj.response), 
        AllExceptionsFilter.name)
    super.catch(exception, host);
  }
}