import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    num: 8,
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'JAVA',
    lpAddresses: {
      97: '',
      56: '0x46c0d1bdF73584E9F0a95d6f1449e74ce07130E6',
    },
    tokenSymbol: 'JAVA',
    tokenAddresses: {
      97: '',
      56: '0xce62f350cbd94397085cc42935eb108d2aa6beec',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    earnToken: 'JAVA',
    withDrawDelay: '30 days',
  },
  {
    num: 9,
    pid: 1,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'JAVA',
    lpAddresses: {
      97: '',
      56: '0x46c0d1bdF73584E9F0a95d6f1449e74ce07130E6',
    },
    tokenSymbol: 'JAVA',
    tokenAddresses: {
      97: '',
      56: '0xce62f350cbd94397085cc42935eb108d2aa6beec',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    earnToken: 'JAVA',
    withDrawDelay: '60 days',
  },
]

export default farms
