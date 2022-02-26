export interface ApiResponse<T> {
  statusCode: number
  results: T | T[]
}
