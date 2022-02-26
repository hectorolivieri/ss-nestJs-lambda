import { Injectable } from '@nestjs/common'
import { ZuoraToken } from 'src/app/repositories/zuora/dto/zuora-token'
import { ZuoraAPIClient } from 'src/app/repositories/zuora/zuora.repository'
@Injectable()
export class PaymentService {
  constructor(private readonly zuoraApiClient: ZuoraAPIClient) {}

  getToken(): Promise<ZuoraToken> {
    return this.zuoraApiClient.getZuoraToken()
  }
}
