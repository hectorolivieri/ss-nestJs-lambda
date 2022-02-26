import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { PaymentController } from '../payment.controller'
import { PaymentService } from '../services/payment.service'

describe('PaymentController', () => {
  let paymentController: PaymentController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      imports: [ConfigModule, HttpModule],
      providers: [PaymentService],
    }).compile()

    paymentController = app.get<PaymentController>(PaymentController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(mainController.getHello()).toBe('Hello World!')
    })
  })
})
