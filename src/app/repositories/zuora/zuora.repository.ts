import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom, map } from 'rxjs'
import { objectToFormUrlencoded } from 'src/app/utils/api/api.utils'

import {
  calculateExpirationTime,
  getZuoraTokenRequestConfig,
} from '../../utils/api/token.utils'
import { ZuoraToken } from './dto/zuora-token'
import { EXPIRATION_TIME, ZUORA_RESOURSES } from './zuora.const'

@Injectable()
export class ZuoraAPIClient {
  protected readonly zuoraAPIURL: string
  protected readonly clientId: string
  protected readonly clientSecret: string
  protected token: ZuoraToken
  protected tokenExpirationTime: number

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.zuoraAPIURL = this.configService.get<string>('ZUORA_BASE_URL')
    this.clientId = this.configService.get<string>('ZUORA_OAUTH_CLIENT_ID')
    this.clientSecret = this.configService.get<string>(
      'ZUORA_OAUTH_CLIENT_SECRET',
    )
  }

  private hasTokenExpired(): boolean {
    if (!this.tokenExpirationTime) return true

    return this.tokenExpirationTime - new Date().getTime() <= EXPIRATION_TIME
  }

  async getZuoraToken(): Promise<ZuoraToken> {
    if (!this.hasTokenExpired()) return this.token
    const resource = ZUORA_RESOURSES.TOKEN
    const endpoint = `${this.zuoraAPIURL}${resource}`

    const { bodyUrlencoded, config } = getZuoraTokenRequestConfig(
      this.clientId,
      this.clientSecret,
      objectToFormUrlencoded,
    )

    await lastValueFrom(
      this.httpService.post(endpoint, bodyUrlencoded, config).pipe(
        map((response) => {
          this.token = response.data
          this.tokenExpirationTime = calculateExpirationTime(
            this.token.expires_in,
          )
        }),
      ),
    )

    return this.token
  }
}
