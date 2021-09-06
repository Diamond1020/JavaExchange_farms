import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    num: 10,
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'FAD',
    lpAddresses: {
      97: '',
      56: '0x0973E1923D1e8f84a46647FE503707a8A7bB32dD',
    },
    tokenSymbol: 'FAD',
    tokenAddresses: {
      97: '',
      56: '0x62b0d9ca11e1c6368ee8c3e914823926b99d498d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
  {
    num: 11,
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
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
  {
    num: 12,
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'ANFT',
    lpAddresses: {
      97: '',
      56: '0xa43CF0aCb7Caf9931221394E259bF68252F2c22b',
    },
    tokenSymbol: 'ANFT',
    tokenAddresses: {
      97: '',
      56: '0x4ad871d02415717f55adb23def23faec98e7bba8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
  {
    num: 13,
    pid: 3,
    risk: 5,
    lpSymbol: 'FAD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0973E1923D1e8f84a46647FE503707a8A7bB32dD',
    },
    tokenSymbol: 'FAD',
    tokenAddresses: {
      97: '',
      56: '0x62b0d9ca11e1c6368ee8c3e914823926b99d498d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
  {
    num: 14,
    pid: 4,
    risk: 5,
    lpSymbol: 'JAVA-BNB LP',
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
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
  {
    num: 15,
    pid: 5,
    risk: 5,
    lpSymbol: 'FAD-ANFT LP',
    lpAddresses: {
      97: '',
      56: '0xe4d87bc607bf98f6d07bcfd66ef0079a4ca5aa64',
    },
    tokenSymbol: 'FAD',
    tokenAddresses: {
      97: '',
      56: '0x62b0d9ca11e1c6368ee8c3e914823926b99d498d',
    },
    quoteTokenSymbol: QuoteToken.ANFT,
    quoteTokenAdresses: contracts.cake,
    earnToken: 'FAD',
    withDrawDelay: '0 day',
  },
]

export default farms
