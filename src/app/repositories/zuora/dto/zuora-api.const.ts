export const ZUORA_RESOURSES = {
  TOKEN: '/oauth/token',
  ACCOUNTS: '/v1/accounts',
  QUERY: '/v1/action/query',
}

export const EXPIRATION_TIME = 15

export const getZuoraQueryAccountNumberByUIDPayload = (uid: number) => ({
  queryString: `select AccountNumber, Id, ss_uid__c from Account where ss_uid__c = '${uid}'`,
})
