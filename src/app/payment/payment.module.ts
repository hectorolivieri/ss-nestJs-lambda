import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ZuoraAPIClient } from '../repositories/zuora/zuora.repository'

import { PaymentController } from './payment.controller'
import { PaymentService } from './services/payment.service'

@Module({
  controllers: [PaymentController],
  imports: [ConfigModule, HttpModule],
  providers: [ZuoraAPIClient, PaymentService],
})
export class PaymentModule {}
