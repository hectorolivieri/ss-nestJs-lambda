import { ZuoraQueryResponse } from '../../../app/dto/zuora-query-response.dto'
import { BaseAxiosResponse } from '../../../app/dto/base-axios-response'
import { ZuoraListApiResponseDTO } from '../../../app/dto/zuora-list-api-response.dto'

export const objectToFormUrlencoded = (
  obj: Record<string, string>,
): URLSearchParams =>
  Object.keys(obj).reduce((previous, current) => {
    previous.append(current, obj[current])
    return previous
  }, new URLSearchParams())

export const handleListZuoraAPIResponse = <T>(
  response: ZuoraListApiResponseDTO<T>,
  property: string,
): BaseAxiosResponse<T> => ({
  data: <T>response[property],
  reasons: response.reasons,
  success: response.success,
})

export const handleZuoraAPIQueryResponse = <T>(
  response: ZuoraQueryResponse<T>,
): T[] => (!response?.done ? [] : response.records)
