export interface BaseAxiosResponse<T> {
  data: T
  success: boolean
  reasons: unknown
}
