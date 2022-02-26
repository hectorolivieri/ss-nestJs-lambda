import { NestFactory } from '@nestjs/core'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { AppModule } from './app/app.module'
import { AllExceptionsFilter } from './app/utils/exception/all-exception.filter'
import { ApiResponseInterceptor } from './app/utils/interceptors/api-response.interceptor'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({
    type: VersioningType.URI,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.useGlobalFilters(new AllExceptionsFilter(new ConfigService()))
  app.useGlobalInterceptors(new ApiResponseInterceptor())
  const configService = app.get(ConfigService)
  const PORT = configService.get<string>('API_PORT')

  const options = new DocumentBuilder()
    .setTitle('Customer profile service')
    .setDescription('The Customer profile service API description')
    .setVersion('1.0')
    .addServer(`http://localhost:${PORT}`)
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  logger.log(`App listening on the port ${PORT}`)
  await app.listen(+PORT)
}
bootstrap()
