import { plainToClass } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  readonly NODE_ENV!: Environment

  @IsNumber()
  readonly API_PORT!: number

  @IsString()
  readonly ZUORA_BASE_URL!: string

  @IsString()
  readonly ZUORA_OAUTH_CLIENT_ID!: string

  @IsString()
  readonly ZUORA_OAUTH_CLIENT_SECRET!: string
}

export const validate = (
  config: Record<string, unknown>,
): EnvironmentVariables => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
