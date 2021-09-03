import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    // background-color: ${({ theme }) => theme.colors.background};
    background-image: url('/images/bgimage.png');
    background-attachment: fixed;
    
    img {
      height: auto;
      max-width: 100%;
    }
  }
  .responsive-bottom-image{
    display: flex;
  }
  .responsive-bottom-image img{
    margin: auto;
  }
`

export default GlobalStyle
