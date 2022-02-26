import { ApiProperty } from '@nestjs/swagger'

export class ApiErrorDTO {
  @ApiProperty({
    example: 404,
    type: Number,
  })
  public statusCode: number

  @ApiProperty({
    example: 'Not found',
    type: String,
  })
  public message: string

  @ApiProperty({
    example: '/v1/payment/123',
    type: String,
  })
  public path: string

  @ApiProperty({
    example: '2021-12-27T12:41:33.307Z',
    type: String,
  })
  public timestamp: string

  @ApiProperty({
    example: 'HttpError',
    type: String,
  })
  public errorName: string

  @ApiProperty({ type: [String, Object] })
  public details?: Record<string, unknown> | string
}
