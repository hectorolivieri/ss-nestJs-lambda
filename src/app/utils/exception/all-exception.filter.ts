import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isObject } from 'class-validator'
import { Request, Response } from 'express'

import { ApiErrorDTO } from '../../../app/payment/dto/api-response-error.dto'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger()
  constructor(private configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const req: Request = ctx.getRequest<Request>()
    const res: Response = ctx.getResponse<Response>()
    const timestamp = new Date().toISOString()
    const path = req.url
    let stack: string
    let statusCode: HttpStatus
    let errorName: string
    let message: string
    let details: Record<string, string> | string

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      errorName = exception.constructor.name
      message = exception.message
      details = exception.getResponse() as Record<string, string> | string
      if (exception instanceof BadRequestException && isObject(details)) {
        details = details.message
      }
    } else if (exception instanceof Error) {
      errorName = exception.constructor.name
      message = exception.message
      stack = exception.stack
    }

    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR
    errorName = errorName || 'InternalException'
    message = message || 'Internal server error'
    details = details || exception.response?.data
    this.logger.log(`Error name: ${errorName}`)
    this.logger.log(`Messagge: ${message}`)
    this.logger.log(stack || details)

    const isProd = this.configService.get<string>('NODE_ENV') === 'prod'
    if (isProd && statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = 'Internal server error'
    }

    const responseBody: ApiErrorDTO = {
      details,
      errorName,
      message,
      path,
      statusCode,
      timestamp,
    }

    res.status(statusCode).json(responseBody)
  }
}
