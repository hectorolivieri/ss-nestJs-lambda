export const calculateExpirationTime = (expirationTime: number): number =>
  new Date().getTime() + expirationTime * 1000

export const getZuoraTokenRequestConfig = (
  clientId: string,
  clientSecret: string,
  objectToFormUrlencoded: (object: Record<string, string>) => URLSearchParams,
) => {
  const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }

  const bodyUrlencoded = objectToFormUrlencoded({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  })

  return {
    bodyUrlencoded,
    config,
  }
}

export const getTokenHeaderConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
})
