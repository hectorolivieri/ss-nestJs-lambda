import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import serverlessExpress from '@vendia/serverless-express'
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'

import { AppModule } from './app/app.module'
import { AllExceptionsFilter } from './app/utils/exception/all-exception.filter'
import { ApiResponseInterceptor } from './app/utils/interceptors/api-response.interceptor'

const API_PATH = 'api'

export async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({ type: VersioningType.URI })

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  )

  app.useGlobalFilters(new AllExceptionsFilter(new ConfigService()))
  app.useGlobalInterceptors(new ApiResponseInterceptor())

  const configService = app.get(ConfigService)

  const PORT: number = configService.get<number>('API_PORT')

  const expressApp = app.getHttpAdapter().getInstance()

  const config = new DocumentBuilder()
    .setTitle('Payment API')
    .setDescription('Payment api description')
    .addServer(`http://localhost:${PORT}/dev`)
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(API_PATH, app, swaggerDocument)

  await app.init()

  return serverlessExpress({ app: expressApp })
}

let server: Handler

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  server = server || (await bootstrap())

  return server(mutateEventForSwagger(event), context, callback)
}

const mutateEventForSwagger = (event: APIGatewayEvent): APIGatewayEvent => {
  if (!event.pathParameters) {
    return event
  }

  if (event.path.endsWith('/api')) {
    return {
      ...event,
      pathParameters: {
        ...event.pathParameters,
        proxy: API_PATH + '/',
      },
    }
  }

  if (event.path.includes('swagger-ui') || event.path.includes('favicon')) {
    return {
      ...event,
      pathParameters: {
        ...event.pathParameters,
        proxy: `${API_PATH}/${trimLeadingSlashes(
          event.pathParameters.proxy || '',
        )}`,
      },
    }
  }

  return event
}

const trimLeadingSlashes = (str: string): string => {
  return str.replace(/^\/+/g, '')
}
