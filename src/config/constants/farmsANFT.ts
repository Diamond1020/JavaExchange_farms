import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    num: 0,
    pid: 0,
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
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  {
    num: 1,
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
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  {
    num: 3,
    pid: 3,
    risk: 0,
    lpSymbol: 'ANFT-BNB LP',
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
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  {
    num: 4,
    pid: 4,
    risk: 5,
    lpSymbol: 'ANFT-JAVA LP',
    lpAddresses: {
      97: '',
      56: '0x7B95f13bF12F18AF77DB37B6CBa4e761bEE5f665',
    },
    tokenSymbol: 'ANFT',
    tokenAddresses: {
      97: '',
      56: '0x4ad871d02415717f55adb23def23faec98e7bba8',
    },
    quoteTokenSymbol: QuoteToken.JAVA,
    quoteTokenAdresses: contracts.java,
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  {
    num: 5,
    pid: 5,
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
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  {
    num: 2,
    pid: 2,
    risk: 5,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
  // {
  //   pid: 6,
  //   risk: 5,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   tokenSymbol: 'BUSD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  {
    num: 7,
    pid: 7,
    risk: 5,
    lpSymbol: 'ANFT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3D9baD01fe1D7Bd827cdeE7dD8569F9C5291F74F',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0x4ad871d02415717f55adb23def23faec98e7bba8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    earnToken: 'ANFT',
    withDrawDelay: '0 day',
  },
]

export default farms
