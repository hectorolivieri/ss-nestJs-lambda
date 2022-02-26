export interface ZuoraApiResponse<T> {
  readonly success: boolean
  readonly data: T
}
