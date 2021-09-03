import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'http://dex.javaexchange.finance/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'http://dex.javaexchange.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pool',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Launchpad',
    icon: 'NftIcon',
    href: '/jilo',
  },
  {
    label: 'Game',
    icon: 'TicketIcon',
    href: '/ComingSoon',
  },
  {
    label: 'NFT Marketplace',
    icon: 'InfoIcon',
    href: '/ComingSoon',
  },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'PancakeSwap',
  //       href: 'https://pancakeswap.info/token/0x65dc57A9e458211774c82cfFeB70f83939742A59',
  //     },
  //   ],
  // },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: "Whitepaper",
  //       href: "http://java.finance/uploads/Whitepaper.pdf",
  //     },
  //     {
  //       label: "Github",
  //       href: "https://github.com/",
  //     },
  //     {
  //       label: 'CoinGecko',
  //       href: 'https://www.coingecko.com/en/',
  //     },
  //     {
  //       label: 'CoinMarketCap',
  //       href: 'https://coinmarketcap.com/currencies/',
  //     },
  //   ],
  // },
]

export default config
