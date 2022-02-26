import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ZuoraToken } from '../repositories/zuora/dto/zuora-token'

import { PaymentService } from './services/payment.service'

@ApiTags('payments')
@Controller({ path: 'customers' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('health-check')
  getHealthCheck(): Promise<ZuoraToken> {
    return this.paymentService.getToken()
  }
}
