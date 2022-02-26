import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('health-check')
@Controller()
export class MainController {
  private readonly logger = new Logger(MainController.name)

  @Get('health-check')
  getHealthCheck() {
    return 'OK'
  }

  @Post('event-test')
  postEventTest(@Body() body: object): string {
    this.logger.log(body)
    return 'OK'
  }
}
