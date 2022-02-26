export interface ZuoraListApiResponseDTO<T> {
  success: boolean
  reasons?: unknown
  [x: string]: T | boolean | unknown
}
