import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { MainController } from './app.controller'
import { PaymentModule } from './payment/payment.module'
import { validate } from './utils/env.validation'

@Module({
  controllers: [MainController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PaymentModule,
  ],
  providers: [],
})
export class AppModule {}
